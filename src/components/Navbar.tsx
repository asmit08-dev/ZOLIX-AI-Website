"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ExternalLink } from "lucide-react";

type RGB = {
  r: number;
  g: number;
  b: number;
};

type RGBA = RGB & {
  a: number | null;
};

const FALLBACK_SURFACE_HOME = "rgb(237, 233, 223)";
const FALLBACK_SURFACE_DEFAULT = "rgb(255, 255, 255)";
const SAMPLE_POINTS = [0.2, 0.5, 0.8];
const SURFACE_SCOPE_SELECTOR =
  "[data-nav-surface-root], section, main, article, aside, footer, header";
const MIN_SOLID_ALPHA = 0.96;

const fallbackSurfaceForPath = (pathname: string) =>
  pathname === "/" ? FALLBACK_SURFACE_HOME : FALLBACK_SURFACE_DEFAULT;

const parseRgbColor = (color: string): RGBA | null => {
  const match = color.match(/rgba?\(([^)]+)\)/i);

  if (!match) {
    return null;
  }

  const channels = match[1]
    .trim()
    .replace(/\s*\/\s*/g, ",")
    .split(/[\s,]+/)
    .map((value) => Number.parseFloat(value.trim()))
    .filter((value) => !Number.isNaN(value));

  const [r, g, b, alpha] = channels;

  if ([r, g, b].some((value) => typeof value !== "number" || Number.isNaN(value))) {
    return null;
  }

  return {
    r,
    g,
    b,
    a: typeof alpha === "number" && !Number.isNaN(alpha) ? alpha : null,
  };
};

const formatRgbColor = ({ r, g, b }: RGB) =>
  `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;

const normalizeColor = (color: string | null | undefined) => {
  if (!color || color === "transparent") {
    return null;
  }

  const rgb = parseRgbColor(color);

  if (!rgb) {
    return null;
  }

  if (rgb.a !== null && rgb.a < MIN_SOLID_ALPHA) {
    return null;
  }

  return formatRgbColor(rgb);
};

const getNavStyle = (surface: string): CSSProperties => {
  return {
    "--nav-surface": surface,
    "--nav-mobile-surface": surface,
    "--nav-link": "rgba(26, 26, 26, 0.72)",
    "--nav-link-strong": "#1a1a1a",
    "--nav-link-active": "#1a1a1a",
    "--nav-button-bg": "#1a1a1a",
    "--nav-button-text": "#ffffff",
    "--nav-button-hover": "#1a1a1a",
    "--nav-button-hover-text": "#ffffff",
  } as CSSProperties;
};

const getNodeBackground = (node: HTMLElement | null) =>
  node ? normalizeColor(window.getComputedStyle(node).backgroundColor) : null;

const resolveSurfaceColor = (element: Element | null, defaultSurface: string) => {
  let node = element instanceof HTMLElement ? element : null;
  const scopeNode = node?.closest<HTMLElement>(SURFACE_SCOPE_SELECTOR) ?? null;

  if (scopeNode) {
    let scopedAncestor: HTMLElement | null = scopeNode;

    while (scopedAncestor && scopedAncestor.tagName !== "BODY") {
      const background = getNodeBackground(scopedAncestor);

      if (background) {
        return background;
      }

      scopedAncestor = scopedAncestor.parentElement;
    }
  }

  let lastBackground: string | null = null;

  while (node) {
    const background = getNodeBackground(node);

    if (background) {
      lastBackground = background;
    }

    if (node.tagName === "BODY") {
      break;
    }

    node = node.parentElement;
  }

  return lastBackground ?? defaultSurface;
};

const getTouchingSurface = (navElement: HTMLElement, defaultSurface: string) => {
  const probeY = Math.min(window.innerHeight - 1, navElement.getBoundingClientRect().bottom + 1);
  const sampledColors = SAMPLE_POINTS.map((point) => {
    const probeX = Math.round(window.innerWidth * point);
    const stack = document
      .elementsFromPoint(probeX, probeY)
      .filter((element) => !navElement.contains(element));

    return resolveSurfaceColor(stack[0] ?? null, defaultSurface);
  });

  const counts = new Map<string, number>();

  sampledColors.forEach((color) => {
    counts.set(color, (counts.get(color) ?? 0) + 1);
  });

  return sampledColors.reduce((selected, color, index) => {
    const selectedCount = counts.get(selected) ?? 0;
    const currentCount = counts.get(color) ?? 0;

    if (currentCount > selectedCount) {
      return color;
    }

    if (currentCount === selectedCount && index === 1) {
      return color;
    }

    return selected;
  }, sampledColors[1] ?? defaultSurface);
};

const Navbar = () => {
  const pathname = usePathname();
  const defaultSurface = fallbackSurfaceForPath(pathname);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navSurface, setNavSurface] = useState(defaultSurface);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let frame = 0;

    const syncNavbar = () => {
      const nextScrolled = window.scrollY > 20;

      setScrolled((current) => (current === nextScrolled ? current : nextScrolled));

      if (!navRef.current) {
        return;
      }

      const nextSurface = getTouchingSurface(navRef.current, defaultSurface);

      setNavSurface((current) => (current === nextSurface ? current : nextSurface));
    };

    const requestSync = () => {
      cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(syncNavbar);
    };

    requestSync();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
    };
  }, [defaultSurface]);

  const logoPath = "/assets/logo.webp";
  const nvidiaLink =
    "https://www.linkedin.com/posts/nvidiainception-nvidiainception-nvidia-share-7476253289840300033-oIdK/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAASxijABW_7AUlIHWla-7bLDy1ile3fe1tU";

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Product", href: "/products" },
    { name: "Insight Hub", href: "/insights" },
    { name: "Blog", href: "/blog" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed inset-x-0 top-0 z-[100]"
      style={getNavStyle(navSurface)}
    >
      {/* Blinking NVIDIA Banner */}
      <div className="bg-zolix-dark text-white py-2 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-zolix-orange/5 animate-pulse pointer-events-none" />
        <div className="max-w-7xl mx-auto flex justify-center items-center text-[9px] font-bold uppercase tracking-[0.25em]">
          <a
            href={nvidiaLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 hover:text-zolix-orange transition-colors group"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zolix-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-zolix-orange"></span>
            </span>
            <span className="hidden sm:inline">ZOLIX AI is proud to be part of the</span>
            <span>NVIDIA Inception Program</span>
            <ExternalLink size={10} className="opacity-40 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>

      {/* Main Header */}
      <div className={`nav-shell ${scrolled ? "py-3" : "py-5"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="nav-shell-content flex justify-between items-center">
            {/* Logo Icon Only */}
            <Link
              href="/"
              className="flex items-center group"
            >
              <Image
                src={logoPath}
                alt="ZOLIX"
                width={1536}
                height={1024}
                priority
                className="h-9 w-auto group-hover:scale-105 transition-transform"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/40x40?text=Z";
                }}
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`nav-link text-[10px] font-bold uppercase tracking-[0.2em] ${
                    pathname === link.href ? "nav-link-active" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="https://lite.zolix.ai/signup"
                target="_blank"
                rel="noreferrer"
                className="nav-cta px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest active:scale-95"
              >
                Sign Up
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              className="nav-icon-button lg:hidden p-2 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="nav-mobile-menu lg:hidden fixed inset-x-0 top-[5.75rem] z-[110] p-6">
          <div className="mb-6 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] opacity-60">
              Navigation
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="nav-icon-button p-2 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`nav-mobile-link px-0 py-3 text-2xl font-bold tracking-tighter ${
                  pathname === link.href ? "nav-mobile-link-active" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://lite.zolix.ai/signup"
              target="_blank"
              rel="noreferrer"
              className="nav-cta mt-4 inline-flex w-fit rounded-full px-6 py-3 text-center font-bold uppercase tracking-widest text-xs"
            >
              Get Started Free
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
