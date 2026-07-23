"use client";

import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as topojson from 'topojson-client';
import { LAND_MASK_B64, MASK_W, MASK_H } from './globe-land-mask';

// SSR Layout Effect
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type Vec3 = [number, number, number];

// Spherical math mapping
const latLngToVec = (lat: number, lng: number): Vec3 => {
  const phi = (lat * Math.PI) / 180;
  const theta = (lng * Math.PI) / 180;
  return [Math.cos(phi) * Math.cos(theta), Math.sin(phi), Math.cos(phi) * Math.sin(theta)];
};

// Mask Decoder
const LAND_BITS = Uint8Array.from(atob(LAND_MASK_B64), (c) => c.charCodeAt(0));
const isLand = (lng: number, lat: number) => {
  let u = Math.floor(((lng + 180) / 360) * MASK_W);
  let v = Math.floor(((90 - lat) / 180) * MASK_H);
  if (u < 0) u = 0;
  else if (u >= MASK_W) u = MASK_W - 1;
  if (v < 0) v = 0;
  else if (v >= MASK_H) v = MASK_H - 1;
  const idx = v * MASK_W + u;
  return (LAND_BITS[idx >> 3] >> (idx & 7)) & 1;
};

const SPHERE_SAMPLES = 24000;
const SPIN_RAD_PER_S = 0.21;
const TILT = -0.28;
// This is a background treatment, so 30fps is visually indistinguishable at
// this slow rotation speed while avoiding duplicate work on 60/120Hz displays.
const FRAME_INTERVAL_MS = 1000 / 30;

// Architectural Palette from image
const COLORS = {
  background: '#f1efe8',
  graticule: 'rgba(120, 115, 105, 0.15)',
  borders: 'rgba(120, 115, 105, 0.4)',
  states: 'rgba(120, 115, 105, 0.2)',
  dots: 'rgba(100, 95, 85, 0.55)',
  outline: 'rgba(120, 115, 105, 0.2)',
};

// 1. PRE-COMPUTE DOTS (Run once)
const LAND_POINTS: Vec3[] = (() => {
  const ga = Math.PI * (3 - Math.sqrt(5));
  const pts: Vec3[] = [];
  for (let i = 0; i < SPHERE_SAMPLES; i++) {
    const y = 1 - (i / (SPHERE_SAMPLES - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const t = i * ga;
    const x = Math.cos(t) * r;
    const z = Math.sin(t) * r;
    const lat = (Math.asin(Math.max(-1, Math.min(1, y))) * 180) / Math.PI;
    const lng = (Math.atan2(z, x) * 180) / Math.PI;
    if (isLand(lng, lat)) pts.push([x, y, z]);
  }
  return pts;
})();

// 2. PRE-COMPUTE GRATICULES (Grid lines)
const GRATICULE_LINES: Vec3[][] = (() => {
  const lines: Vec3[][] = [];
  // Meridians
  for (let lng = -180; lng <= 180; lng += 10) {
    const line: Vec3[] = [];
    for (let lat = -90; lat <= 90; lat += 2) line.push(latLngToVec(lat, lng));
    lines.push(line);
  }
  // Parallels
  for (let lat = -80; lat <= 80; lat += 10) {
    const line: Vec3[] = [];
    for (let lng = -180; lng <= 180; lng += 2) line.push(latLngToVec(lat, lng));
    lines.push(line);
  }
  return lines;
})();

// Helper to deeply extract lines from complex GeoJSON geometries
const extractLinesFromGeoJSON = (geojson: any): Vec3[][] => {
  const lines: Vec3[][] = [];
  const traverse = (geom: any) => {
    if (!geom) return;
    if (geom.type === 'LineString') {
      lines.push(geom.coordinates.map((c: any) => latLngToVec(c[1], c[0])));
    } else if (geom.type === 'MultiLineString' || geom.type === 'Polygon') {
      geom.coordinates.forEach((ring: any) => traverse({ type: 'LineString', coordinates: ring }));
    } else if (geom.type === 'MultiPolygon') {
      geom.coordinates.forEach((poly: any) => traverse({ type: 'Polygon', coordinates: poly }));
    } else if (geom.type === 'GeometryCollection') {
      geom.geometries.forEach(traverse);
    } else if (geom.type === 'Feature') {
      traverse(geom.geometry);
    } else if (geom.type === 'FeatureCollection') {
      geom.features.forEach(traverse);
    }
  };
  traverse(geojson);
  return lines;
};

const GlobeBackground = ({ className = '' }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  // Storing pre-computed Map Vectors globally so we only compute them once per mount
  const mapLinesRef = useRef<{ world: Vec3[][]; us: Vec3[][] }>({ world: [], us: [] });

  useIsomorphicLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // Optimizes compositing
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;
    let R = 0;
    let spin = 0.6;
    let raf = 0;
    let hasValidSize = false;
    let tile = 2;

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.round(rect.width);
      height = Math.round(rect.height);
      if (width <= 0 || height <= 0) return false;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cx = width / 2;
      cy = height * 0.56;
      R = Math.min(width, height) * 0.42;
      tile = Math.max(1.5, R * 0.005);
      hasValidSize = R > 0;
      return hasValidSize;
    };

    // Project directly into the path. Returning a new `{ x, y, z }` for every
    // map segment and dot created tens of thousands of short-lived objects per
    // frame, which regularly triggered garbage collection while scrolling.
    const drawPaths = (
      lines: Vec3[][],
      cosS: number, sinS: number, cosT: number, sinT: number,
      color: string,
      lineWidth: number
    ) => {
      if (!lines.length) return;
      ctx.beginPath();
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let prevVisible = false;
        let prevX = 0;
        let prevY = 0;
        let prevZ = 0;
        let hasPrevious = false;

        for (let j = 0; j < line.length; j++) {
          const v = line[j];
          const x1 = v[0] * cosS + v[2] * sinS;
          const z1 = -v[0] * sinS + v[2] * cosS;
          const y2 = v[1] * cosT - z1 * sinT;
          const z2 = v[1] * sinT + z1 * cosT;
          const x = cx + x1 * R;
          const y = cy - y2 * R;
          
          if (z2 > 0) {
            if (!prevVisible) {
              if (hasPrevious) {
                // Calculates exact pixel it crosses the horizon to prevent gaps
                const t = z2 / (z2 - prevZ);
                ctx.moveTo(x + t * (prevX - x), y + t * (prevY - y));
              } else {
                ctx.moveTo(x, y);
              }
            }
            ctx.lineTo(x, y);
            prevVisible = true;
          } else if (prevVisible && hasPrevious) {
            const t = prevZ / (prevZ - z2);
            ctx.lineTo(prevX + t * (x - prevX), prevY + t * (y - prevY));
            prevVisible = false;
          }
          prevX = x;
          prevY = y;
          prevZ = z2;
          hasPrevious = true;
        }
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    };

    const draw = () => {
      if (!hasValidSize) return;

      // Fill background
      ctx.fillStyle = COLORS.background;
      ctx.fillRect(0, 0, width, height);

      const cosS = Math.cos(spin);
      const sinS = Math.sin(spin);
      const cosT = Math.cos(TILT);
      const sinT = Math.sin(TILT);

      // Draw Grid
      drawPaths(GRATICULE_LINES, cosS, sinS, cosT, sinT, COLORS.graticule, 0.4);
      
      // Draw Countries
      drawPaths(mapLinesRef.current.world, cosS, sinS, cosT, sinT, COLORS.borders, 0.6);
      
      // Draw States
      drawPaths(mapLinesRef.current.us, cosS, sinS, cosT, sinT, COLORS.states, 0.4);

      // Draw Dots
      const half = tile / 2;
      ctx.beginPath(); // Batched path mapping drastically speeds up rect rendering
      for (let i = 0; i < LAND_POINTS.length; i++) {
        const v = LAND_POINTS[i];
        const x1 = v[0] * cosS + v[2] * sinS;
        const z1 = -v[0] * sinS + v[2] * cosS;
        const z2 = v[1] * sinT + z1 * cosT;
        if (z2 > 0.01) {
          const y2 = v[1] * cosT - z1 * sinT;
          ctx.rect(cx + x1 * R - half, cy - y2 * R - half, tile, tile);
        }
      }
      ctx.fillStyle = COLORS.dots;
      ctx.fill();

      // Draw Outer Sphere Rim
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = COLORS.outline;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    let last = performance.now();
    const frame = (now: number) => {
      // Keep the globe's angular velocity time-based, even when a render is
      // skipped. This preserves its current motion while roughly halving CPU
      // and canvas work on common 60Hz screens.
      if (now - last < FRAME_INTERVAL_MS) {
        raf = requestAnimationFrame(frame);
        return;
      }
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      spin += SPIN_RAD_PER_S * dt;
      draw();
      raf = requestAnimationFrame(frame);
    };

    // The globe projects ~24k points plus every country and US state border per
    // frame. That is fine while it is on screen, but it used to keep running at
    // 60fps for the entire session — so scrolling down the rest of the page was
    // competing with a full canvas render of something nobody could see.
    // `onScreen` and `pageVisible` gate the loop; the drawing itself is
    // untouched, so the globe looks exactly the same whenever it is visible.
    let onScreen = true;
    let pageVisible = !document.hidden;
    let running = false;

    const shouldRun = () => onScreen && pageVisible && hasValidSize;

    const start = () => {
      if (running || !shouldRun()) return;
      running = true;
      last = performance.now(); // avoid a jump in spin after being paused
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    };

    const sync = () => (shouldRun() ? start() : stop());

    // Load geometries once, from our own origin. These were fetched from
    // unpkg.com on every page load: ~222KB behind a third-party DNS + TLS
    // handshake, uncacheable by us, on the critical path of the globe reveal.
    if (mapLinesRef.current.world.length === 0) {
      Promise.all([
        fetch('/data/countries-110m.json').then((r) => r.json()),
        fetch('/data/states-10m.json').then((r) => r.json()),
      ]).then(([world, us]) => {
        const worldGeo = topojson.feature(world, world.objects.countries);
        const usGeo = topojson.feature(us, us.objects.states);
        mapLinesRef.current.world = extractLinesFromGeoJSON(worldGeo);
        mapLinesRef.current.us = extractLinesFromGeoJSON(usGeo);
        setReady(true);
      });
    } else {
      setReady(true); // Already loaded
    }

    const ro = new ResizeObserver(() => {
      resize();
      sync();
    });
    ro.observe(canvas.parentElement!);

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { rootMargin: '100px' }
    );
    io.observe(canvas.parentElement!);

    const onVisibility = () => {
      pageVisible = !document.hidden;
      sync();
    };
    document.addEventListener('visibilitychange', onVisibility);

    resize();
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div
      className={`absolute inset-0 overflow-hidden transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'} ${className}`}
      aria-hidden="true"
      style={{ backgroundColor: COLORS.background }}
    >
      <div
        className="absolute inset-0"
        style={{
          maskImage: 'radial-gradient(ellipse 62% 58% at 50% 56%, black 40%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse 62% 58% at 50% 56%, black 40%, transparent 78%)',
        }}
      >
        <canvas ref={canvasRef} className="block h-full w-full" />
      </div>
      
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, transparent 46%, rgba(241, 239, 232, 0.55) 72%, ${COLORS.background} 94%)`,
        }}
      />
    </div>
  );
};

export default memo(GlobeBackground);
