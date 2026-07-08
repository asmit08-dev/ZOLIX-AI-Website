"use client";

import worldData from '../../public/data/countries-110m.json';
import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { geoOrthographic, geoPath, geoGraticule10, geoInterpolate, geoDistance } from 'd3-geo';
import { feature, mesh } from 'topojson-client';
import type { Topology, Objects } from 'topojson-specification';
import type { GeoPermissibleObjects } from 'd3-geo';

// Charcoal ink + theme accents on the beige hero field.
const INK = '26, 26, 26';
const ORANGE = '220, 106, 79';
const BEIGE = '237, 233, 223';

const SPIN_DEG_PER_S = 12;
const TILT = -16;
const ARC_LIFE_MS = 11800;
const ARC_GROW_FRAC = 0.55;  // fraction of life spent growing before the tail starts chasing
const ARC_SPAWN_CHANCE = 0.007;
const MAX_ARCS = 3;
const PARTICLES = 46;

// Smooth acceleration/deceleration so arcs glide instead of snapping.
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Network hubs the arcs travel between: [lng, lat].
const HUBS: [number, number][] = [
  [-122.4, 37.8], // San Francisco
  [-74.0, 40.7],  // New York
  [-46.6, -23.6], // São Paulo
  [-0.1, 51.5],   // London
  [8.7, 50.1],    // Frankfurt
  [55.3, 25.2],   // Dubai
  [72.9, 19.1],   // Mumbai
  [103.8, 1.35],  // Singapore
  [139.7, 35.7],  // Tokyo
  [151.2, -33.9], // Sydney
];

// Curated routes so every arc sweep looks intentional.
const ROUTES: [number, number][] = [
  [0, 8], [0, 1], [1, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8],
  [7, 9], [1, 2], [3, 6], [8, 9], [0, 7], [2, 3],
];

type Arc = { from: [number, number]; to: [number, number]; born: number };

type Particle = {
  angle: number;
  radius: number; // relative to globe radius
  phi: number;    // orbit tilt toward viewer
  psi: number;    // in-plane rotation of the orbit ellipse
  speed: number;
  size: number;
  trail: number;
};

// Draw synchronously before the browser's first paint (avoids a blank-frame
// flash on mount); falls back to a regular effect during SSR/static export.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const rnd = (a: number, b: number) => a + Math.random() * (b - a);
const WORLD = worldData as unknown as Topology<Objects>;
const COUNTRIES = WORLD.objects.countries;
const LAND = feature(WORLD, COUNTRIES) as GeoPermissibleObjects;
const BORDERS = mesh(WORLD, COUNTRIES, (a, b) => a !== b) as GeoPermissibleObjects;
const COAST = mesh(WORLD, COUNTRIES, (a, b) => a === b) as GeoPermissibleObjects;

const GlobeBackground = ({ className = '' }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Canvas pixels are ready before first paint (see layout effect below), but
  // we hold opacity at 0 for one extra frame so the reveal is an intentional
  // fade instead of the globe just popping into existence.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useIsomorphicLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const projection = geoOrthographic().clipAngle(90);
    const path = geoPath(projection, ctx);
    const graticule = geoGraticule10();

    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;
    let R = 0;
    let hasValidSize = false;
    let spin = 30;
    let raf = 0;
    let visible = true;
    let lastRoute = -1;
    const arcs: Arc[] = [];

    const particles: Particle[] = Array.from({ length: PARTICLES }, () => ({
      angle: rnd(0, Math.PI * 2),
      radius: rnd(1.1, 1.6),
      phi: rnd(0.95, 1.32),
      psi: rnd(0, Math.PI * 2),
      speed: rnd(0.45, 0.95) * (reducedMotion ? 0 : 1),
      size: rnd(0.6, 1.9),
      trail: rnd(0.18, 0.42),
    }));

    // The shaded disc never changes frame to frame — rotating a sphere doesn't
    // change its orthographic silhouette. Bake it once per resize instead of
    // rebuilding gradients every frame.
    const base = document.createElement('canvas');
    const baseCtx = base.getContext('2d')!;
    const basePath = geoPath(projection, baseCtx);

    const renderBase = () => {
      base.width = canvas.width;
      base.height = canvas.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      baseCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      baseCtx.clearRect(0, 0, width, height);

      const g = baseCtx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.2, cx, cy, R);
      g.addColorStop(0, 'rgb(230, 225, 213)');
      g.addColorStop(1, 'rgb(216, 209, 194)');
      baseCtx.beginPath();
      basePath({ type: 'Sphere' });
      baseCtx.fillStyle = g;
      baseCtx.fill();
    };

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const nextWidth = Math.round(rect.width);
      const nextHeight = Math.round(rect.height);
      if (nextWidth <= 0 || nextHeight <= 0) {
        hasValidSize = false;
        return false;
      }

      width = nextWidth;
      height = nextHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = width / 2;
      cy = height * 0.56;
      R = Math.min(width, height) * 0.34;
      hasValidSize = R > 0;
      projection.scale(R).translate([cx, cy]);
      renderBase();
      return hasValidSize;
    };

    // 3D point on a particle's tilted, rotated orbit -> screen coords + depth.
    const orbitPoint = (p: Particle, angle: number) => {
      const r = p.radius * R;
      const x = r * Math.cos(angle);
      const yy = r * Math.sin(angle);
      const y = yy * Math.cos(p.phi);
      const z = yy * Math.sin(p.phi);
      const c = Math.cos(p.psi);
      const s = Math.sin(p.psi);
      return { x: cx + x * c - y * s, y: cy + x * s + y * c, z };
    };

    const drawParticle = (p: Particle, frontOnly: boolean) => {
      const head = orbitPoint(p, p.angle);
      const front = head.z >= 0;
      if (front !== frontOnly) return;

      const depth = head.z / (p.radius * R);
      const baseAlpha = front ? 0.2 + depth * 0.24 : 0.08 - depth * 0.07;
      const size = p.size * Math.min(2, Math.max(1, R / 220));

      const steps = 9;
      ctx.beginPath();
      for (let k = 0; k <= steps; k++) {
        const pt = orbitPoint(p, p.angle - (k / steps) * p.trail);
        if (k === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.lineCap = 'round';
      ctx.lineWidth = size;
      ctx.strokeStyle = `rgba(${INK}, ${Math.max(0, baseAlpha * 0.55).toFixed(3)})`;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(head.x, head.y, size * 0.95, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${INK}, ${Math.max(0, baseAlpha).toFixed(3)})`;
      ctx.fill();
    };

    const spawnArc = (now: number) => {
      let idx = Math.floor(Math.random() * ROUTES.length);
      if (idx === lastRoute) idx = (idx + 1) % ROUTES.length;
      lastRoute = idx;
      const [i, j] = ROUTES[idx];
      const flip = Math.random() < 0.5;
      arcs.push({ from: HUBS[flip ? j : i], to: HUBS[flip ? i : j], born: now });
    };

    // Angular closeness to the front of the globe: 1 at center, 0 at the limb.
    const facing = (lngLat: [number, number]) => {
      const [rl, rp] = projection.rotate();
      return Math.cos(geoDistance(lngLat, [-rl, -rp]));
    };

    const drawArcs = (now: number) => {
      for (let a = arcs.length - 1; a >= 0; a--) {
        const arc = arcs[a];
        const life = (now - arc.born) / ARC_LIFE_MS;
        if (life >= 1) {
          arcs.splice(a, 1);
          continue;
        }
        const rawHead = Math.min(1, life / ARC_GROW_FRAC);
        const rawTail = Math.max(0, (life - ARC_GROW_FRAC) / (1 - ARC_GROW_FRAC));
        const head = reducedMotion ? 1 : easeInOutCubic(rawHead);
        const tail = reducedMotion ? 0 : easeInOutCubic(rawTail);
        const fade = reducedMotion ? 0.8 : Math.sin(Math.PI * Math.min(1, life * 1.08));
        const interp = geoInterpolate(arc.from, arc.to);
        const span = geoDistance(arc.from, arc.to);
        const liftMax = R * (0.08 + 0.2 * (span / Math.PI));

        const project = (t: number) => {
          const g = interp(t);
          const p = projection(g);
          if (!p) return null;
          const dx = p[0] - cx;
          const dy = p[1] - cy;
          const len = Math.hypot(dx, dy) || 1;
          const lift = liftMax * Math.sin(Math.PI * t);
          return { x: p[0] + (dx / len) * lift, y: p[1] + (dy / len) * lift, z: facing(g) };
        };

        const steps = 34;
        let prev: { x: number; y: number; z: number } | null = null;
        for (let s = 0; s <= steps; s++) {
          const cur = project(tail + ((head - tail) * s) / steps);
          if (cur && prev && cur.z > -0.05 && prev.z > -0.05) {
            const zA = Math.max(0, Math.min(1, (cur.z + prev.z) / 2 + 0.2));
            ctx.beginPath();
            ctx.moveTo(prev.x, prev.y);
            ctx.lineTo(cur.x, cur.y);
            ctx.strokeStyle = `rgba(${ORANGE}, ${(0.78 * zA * fade).toFixed(3)})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
          prev = cur;
        }

        // Pulse at the head while it travels.
        if (!reducedMotion && head < 1) {
          const p = project(head);
          if (p && p.z > 0) {
            const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 7);
            glow.addColorStop(0, `rgba(${ORANGE}, ${(0.85 * p.z).toFixed(3)})`);
            glow.addColorStop(1, `rgba(${ORANGE}, 0)`);
            ctx.beginPath();
            ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
            ctx.fillStyle = glow;
            ctx.fill();
          }
        }

        // Landing ripple once the head arrives.
        if (!reducedMotion && head === 1 && tail < 0.35) {
          const z = facing(arc.to);
          const p = projection(arc.to);
          if (p && z > 0) {
            ctx.beginPath();
            ctx.arc(p[0], p[1], 3 + tail * 26, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${ORANGE}, ${(0.45 * (1 - tail / 0.35) * z).toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    const drawHubs = () => {
      for (const hub of HUBS) {
        const z = facing(hub);
        if (z <= 0.05) continue;
        const p = projection(hub);
        if (!p) continue;

        // Soft halo so each hub reads as a glowing node, not a flat dot.
        const glowR = 6 + z * 4;
        const glow = ctx.createRadialGradient(p[0], p[1], 0, p[0], p[1], glowR);
        glow.addColorStop(0, `rgba(${ORANGE}, ${(0.28 * z).toFixed(3)})`);
        glow.addColorStop(1, `rgba(${ORANGE}, 0)`);
        ctx.beginPath();
        ctx.arc(p[0], p[1], glowR, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p[0], p[1], 1.6 + z, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ORANGE}, ${(0.7 * z).toFixed(3)})`;
        ctx.fill();
      }
    };

    const draw = (now: number) => {
      if (!hasValidSize) return;
      ctx.clearRect(0, 0, width, height);
      projection.rotate([spin, TILT, 0]);

      // Whirl behind -> globe -> arcs -> whirl in front, for depth.
      for (const p of particles) drawParticle(p, false);

      // Shaded disc + rim: baked once in renderBase(), just blitted here.
      ctx.drawImage(base, 0, 0, width, height);

      // Clip globe internals to the sphere so coastlines and grid lines stay
      // visually stable at the limb instead of shimmering across transparent
      // pixels as the projection moves.
      ctx.save();
      ctx.beginPath();
      path({ type: 'Sphere' });
      ctx.clip();
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      // Graticule.
      ctx.beginPath();
      path(graticule);
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = `rgba(${INK}, 0.06)`;
      ctx.stroke();

      // Ghosted landmasses — slightly denser so the moving geometry does not
      // flicker against the patterned hero background.
      ctx.beginPath();
      path(LAND);
      ctx.fillStyle = `rgba(${INK}, 0.2)`;
      ctx.fill();

      // Interior country borders carved in the beige tone.
      ctx.beginPath();
      path(BORDERS);
      ctx.lineWidth = 0.45;
      ctx.strokeStyle = `rgba(${BEIGE}, 0.72)`;
      ctx.stroke();

      // Crisp coastline.
      ctx.beginPath();
      path(COAST);
      ctx.lineWidth = 0.65;
      ctx.strokeStyle = `rgba(${INK}, 0.32)`;
      ctx.stroke();

      drawHubs();
      drawArcs(now);
      ctx.restore();

      ctx.beginPath();
      path({ type: 'Sphere' });
      ctx.lineWidth = 0.75;
      ctx.strokeStyle = `rgba(${INK}, 0.2)`;
      ctx.stroke();

      for (const p of particles) drawParticle(p, true);
    };
    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (visible && hasValidSize) {
        spin = (spin + dt * SPIN_DEG_PER_S) % 360;
        for (const p of particles) p.angle += p.speed * dt;
        if (arcs.length < MAX_ARCS && Math.random() < ARC_SPAWN_CHANCE) spawnArc(now);
        draw(now);
      }
      raf = requestAnimationFrame(frame);
    };

    const staticTime = performance.now();
    const onResize = () => {
      const resized = resize();
      // Reassigning canvas.width/height (inside resize()) always clears the
      // bitmap and resets context state, even when the size is unchanged —
      // and ResizeObserver fires once right after observe() starts, moments
      // after the initial draw. Repaint immediately so the browser never
      // gets a chance to paint that cleared frame before the next rAF tick.
      if (resized) draw(reducedMotion ? staticTime : performance.now());
    };

    const initialResizeOk = resize();
    const ro = new ResizeObserver(onResize);
    ro.observe(canvas.parentElement!);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    if (reducedMotion) {
      // One static frame with a few arcs drawn in full.
      arcs.push(
        { from: HUBS[1], to: HUBS[3], born: staticTime },
        { from: HUBS[5], to: HUBS[6], born: staticTime },
        { from: HUBS[0], to: HUBS[8], born: staticTime },
      );
      if (initialResizeOk) draw(staticTime);
    } else {
      // Seed a couple of mid-flight arcs so the network reads immediately.
      const now = performance.now();
      arcs.push(
        { from: HUBS[1], to: HUBS[3], born: now - ARC_LIFE_MS * 0.3 },
        { from: HUBS[2], to: HUBS[1], born: now - ARC_LIFE_MS * 0.08 },
      );
      if (initialResizeOk) raf = requestAnimationFrame(frame);
    }

    // If the first layout pass reported zero size, retry on the next frame.
    if (!initialResizeOk) {
      raf = requestAnimationFrame((now) => {
        if (resize()) {
          if (reducedMotion) {
            draw(staticTime);
            return;
          }
          last = now;
          draw(now);
        }
        raf = requestAnimationFrame(frame);
      });
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div
      className={`absolute inset-0 overflow-hidden transition-opacity duration-700 ease-out ${ready ? 'opacity-100' : 'opacity-0'} ${className}`}
      aria-hidden="true"
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
      {/* Crisp on top, sinks into white toward the bottom of the hero. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, transparent 46%, rgba(255,255,255,0.55) 72%, #ffffff 94%)',
        }}
      />
    </div>
  );
};

export default memo(GlobeBackground);
