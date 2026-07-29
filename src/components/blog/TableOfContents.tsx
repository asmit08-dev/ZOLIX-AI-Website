"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, BookOpen, ChevronDown, ListTree } from "lucide-react";
import type { TocItem } from "@/lib/toc";

const HEADER_CLEARANCE = 120;

function toRoman(value: number) {
  const numerals: [number, string][] = [[1000, "m"], [900, "cm"], [500, "d"], [400, "cd"], [100, "c"], [90, "xc"], [50, "l"], [40, "xl"], [10, "x"], [9, "ix"], [5, "v"], [4, "iv"], [1, "i"]];
  return numerals.reduce((result, [number, symbol]) => {
    const repeats = Math.floor(value / number);
    value %= number;
    return result + symbol.repeat(repeats);
  }, "");
}

function hierarchyLabels(items: TocItem[]) {
  let section = 0;
  let subsection = 0;
  return items.map((item) => {
    if (item.level === 2) {
      section += 1;
      subsection = 0;
      return String(section);
    }
    subsection += 1;
    return toRoman(subsection);
  });
}

function useActiveHeading(ids: string[]) {
  const idsKey = ids.join(",");
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    if (!ids.length) return;
    let frame: number | null = null;
    const update = () => {
      frame = null;
      const headings = ids.map((id) => document.getElementById(id)).filter((node): node is HTMLElement => node !== null);
      // A section is active when its content reaches the reader's focal point,
      // rather than when its heading merely touches the top of the viewport.
      const readingCenter = window.innerHeight / 2;
      const passed = headings.filter((heading) => heading.getBoundingClientRect().top <= readingCenter).at(-1);
      const next = passed?.id ?? headings[0]?.id ?? null;
      setActiveId((current) => current === next ? current : next);
    };
    const requestUpdate = () => { if (frame === null) frame = requestAnimationFrame(update); };
    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => { window.removeEventListener("scroll", requestUpdate); window.removeEventListener("resize", requestUpdate); if (frame !== null) cancelAnimationFrame(frame); };
  }, [idsKey, ids]);

  return activeId;
}

function TocList({ items, activeId, onNavigate }: { items: TocItem[]; activeId: string | null; onNavigate?: () => void }) {
  const labels = useMemo(() => hierarchyLabels(items), [items]);
  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const targetCenter = window.scrollY + target.getBoundingClientRect().top + target.offsetHeight / 2;
      window.scrollTo({ top: Math.max(0, targetCenter - window.innerHeight / 2 + HEADER_CLEARANCE / 2), behavior: "smooth" });
    }
    window.history.replaceState(null, "", `#${id}`);
    onNavigate?.();
  };

  return <ol className="space-y-1.5">{items.map((item, index) => {
    const isActive = item.id === activeId;
    return <li key={item.id} className={item.level === 3 ? "ml-3" : ""}><motion.a data-toc-id={item.id} href={`#${item.id}`} onClick={(event) => navigate(event, item.id)} aria-current={isActive ? "location" : undefined} animate={{ x: isActive ? 0 : -2 }} transition={{ type: "spring", stiffness: 380, damping: 28 }} className={`group relative flex items-start gap-3 rounded-xl px-3 py-2.5 text-sm leading-snug focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zolix-orange ${isActive ? "text-white shadow-[0_8px_18px_rgba(220,106,79,.2)]" : "text-zolix-dark/60 hover:bg-zolix-beige hover:text-zolix-dark"}`}><AnimatePresence initial={false}>{isActive && <motion.span initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .98 }} transition={{ duration: .2, ease: [0.16, 1, .3, 1] }} className="absolute inset-0 rounded-xl bg-zolix-orange" />}</AnimatePresence><motion.span animate={{ opacity: isActive ? .72 : 1 }} transition={{ duration: .18 }} className={`relative z-10 mt-0.5 min-w-4 text-[10px] font-extrabold ${isActive ? "text-white" : "text-zolix-orange"}`}>{labels[index]}</motion.span><span className={`relative z-10 flex-1 font-semibold ${item.level === 3 ? "text-[13px] font-medium" : ""}`}>{item.text}</span><AnimatePresence initial={false}>{isActive && <motion.span initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 3 }} transition={{ duration: .18 }} className="relative z-10 mt-0.5 shrink-0"><ArrowUpRight size={14} strokeWidth={2.5} /></motion.span>}</AnimatePresence></motion.a></li>;
  })}</ol>;
}

export function TocSidebar({ items }: { items: TocItem[] }) {
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const activeId = useActiveHeading(ids);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeId || !scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const activeLink = container.querySelector<HTMLElement>(`[data-toc-id="${CSS.escape(activeId)}"]`);
    if (!activeLink) return;

    const containerBounds = container.getBoundingClientRect();
    const activeBounds = activeLink.getBoundingClientRect();
    const targetTop = container.scrollTop + activeBounds.top - containerBounds.top - (container.clientHeight - activeBounds.height) / 2;
    container.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
  }, [activeId]);

  if (items.length < 2) return null;
  return <nav aria-label="Table of contents" className="hidden lg:col-start-1 lg:row-start-1 lg:block"><div ref={scrollContainerRef} className="toc-scrollbar sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-1"><div className="overflow-hidden rounded-2xl border border-zolix-dark/10 bg-white shadow-[0_16px_45px_rgba(26,26,26,.07)]"><div className="relative overflow-hidden bg-zolix-dark px-5 py-5 text-white"><div className="absolute -right-7 -top-9 h-28 w-28 rounded-full border-[18px] border-zolix-orange/40" /><div className="relative flex items-center gap-2.5"><span className="grid h-8 w-8 place-items-center rounded-lg bg-zolix-orange text-white"><BookOpen size={15} /></span><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-zolix-orange">Reading guide</p><h2 className="mt-0.5 text-base font-bold">On this page</h2></div></div></div><div className="p-3"><TocList items={items} activeId={activeId} /></div></div></div></nav>;
}

export function TocMobile({ items }: { items: TocItem[] }) {
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const activeId = useActiveHeading(ids);
  const [open, setOpen] = useState(false);
  const activeItem = items.find((item) => item.id === activeId);
  if (items.length < 2) return null;
  return <nav aria-label="Table of contents" className="mb-10 overflow-hidden rounded-2xl border border-zolix-dark/10 bg-white shadow-[0_12px_30px_rgba(26,26,26,.06)] lg:hidden"><button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="blog-toc-mobile-panel" className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-zolix-orange"><span className="flex min-w-0 items-center gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-zolix-dark text-zolix-orange"><ListTree size={17} /></span><span className="min-w-0"><span className="block text-[10px] font-bold uppercase tracking-[.18em] text-zolix-orange">In this article</span><span className="mt-0.5 block truncate text-sm font-bold text-zolix-dark">{activeItem?.text ?? "Table of contents"}</span></span></span><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-zolix-beige text-zolix-dark/60 transition-transform duration-300 ${open ? "rotate-180" : ""}`}><ChevronDown size={17} /></span></button><motion.div id="blog-toc-mobile-panel" initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: .25, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden"><div className="border-t border-zolix-dark/10 p-3"><TocList items={items} activeId={activeId} onNavigate={() => setOpen(false)} /></div></motion.div></nav>;
}
