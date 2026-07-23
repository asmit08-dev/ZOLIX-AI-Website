"use client";

import { type CSSProperties, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ExternalLink } from "lucide-react";

const SURFACE_HOME = "rgb(237, 233, 223)";
const SURFACE_DEFAULT = "rgb(255, 255, 255)";

// The nav surface is decided purely by route at render time. It used to be
// sampled from whatever section sat under the bar on every scroll frame, which
// meant elementsFromPoint() + a getComputedStyle() walk up the DOM on each
// frame — a forced synchronous layout that dropped frames across the whole page.
const surfaceForPath = (pathname: string) =>
  pathname === "/" ? SURFACE_HOME : SURFACE_DEFAULT;

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

const Navbar = () => {
  const pathname = usePathname();
  const navSurface = surfaceForPath(pathname);
  const [isOpen, setIsOpen] = useState(false);

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
    <nav className="fixed inset-x-0 top-0 z-[100]" style={getNavStyle(navSurface)}>
      {/* NVIDIA Banner */}
      <div className="bg-zolix-dark text-white py-2 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex justify-center items-center text-[9px] font-bold uppercase tracking-[0.25em]">
          <a
            href={nvidiaLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 hover:text-zolix-orange transition-colors group"
          >
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-zolix-orange shrink-0"></span>
            <span className="hidden sm:inline">ZOLIX AI is proud to be part of the</span>
            <span>NVIDIA Inception Program</span>
            <ExternalLink size={10} className="opacity-40 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>

      {/* Main Header */}
      <div className="nav-shell py-3">
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
                className="h-11 w-auto group-hover:scale-105 transition-transform"
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
        <div className="nav-mobile-menu lg:hidden fixed inset-x-0 top-24 z-[110] p-6">
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
