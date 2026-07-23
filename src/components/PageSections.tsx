"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

/**
 * Shared building blocks for the industry pages. Each industry composes these
 * with its own approved copy, so every page picks up the same Zolix visual
 * language (beige/dark alternation, oversized radii, orange accents) without
 * repeating markup six times.
 */

/** Props every industry page component accepts, so routes can inject breadcrumbs. */
export type IndustryProps = { breadcrumbs?: ReactNode };

export type Card = { title: string; desc: string; icon?: LucideIcon };
export type Row = { label: string; value: string };
export type Stat = { value: string; label: string };
export type Step = { title: string; desc: string };

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export function IndustryHero({
  eyebrow,
  h1,
  h2,
  intro,
  primary,
  secondary,
  breadcrumbs,
}: {
  eyebrow: string;
  h1: string;
  h2?: string;
  intro?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  breadcrumbs?: ReactNode;
}) {
  return (
    <section data-nav-theme="beige" className="bg-zolix-beige px-6 pt-44 pb-28 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle 440px at 100% 0%, rgba(220, 106, 79, 0.06), transparent 70%)",
        }}
      />
      <div className="max-w-5xl mx-auto relative z-10">
        {breadcrumbs}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-white/70 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-10 border border-zolix-dark/5 text-zolix-dark"
        >
          {eyebrow}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-7xl font-extrabold tracking-tighter text-zolix-dark leading-[0.95] mb-8"
        >
          {h1}
        </motion.h1>

        {h2 && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-2xl md:text-4xl font-bold tracking-tight text-zolix-dark/40 mb-10"
          >
            {h2}
          </motion.h2>
        )}

        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-xl md:text-2xl text-zolix-dark/60 font-medium leading-relaxed max-w-3xl"
          >
            {intro}
          </motion.p>
        )}

        {(primary || secondary) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-5 mt-14"
          >
            {primary && <CTAButton {...primary} tone="dark" />}
            {secondary && <CTAButton {...secondary} tone="outline" />}
          </motion.div>
        )}
      </div>
    </section>
  );
}

function CTAButton({
  label,
  href,
  tone,
}: {
  label: string;
  href: string;
  tone: "dark" | "orange" | "outline" | "white";
}) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const styles = {
    dark: "bg-zolix-dark text-white hover:bg-zolix-orange",
    orange: "bg-zolix-orange text-white hover:bg-white hover:text-zolix-dark",
    outline: "border border-zolix-dark/15 text-zolix-dark hover:border-zolix-orange hover:text-zolix-orange",
    white: "bg-white text-zolix-dark hover:bg-zolix-orange hover:text-white",
  }[tone];

  const className = `inline-flex items-center justify-center gap-4 px-10 py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 group ${styles}`;
  const inner = (
    <>
      {label}
      <ArrowRight size={16} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
    </>
  );

  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}

export function SectionHeading({ title, intro, align = "left" }: { title: string; intro?: string; align?: "left" | "center" }) {
  return (
    <div className={`mb-16 ${align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl"}`}>
      <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-zolix-dark mb-6">{title}</h2>
      {intro && <p className="text-xl text-zolix-dark/50 font-medium leading-relaxed">{intro}</p>}
    </div>
  );
}

/** Card grid — the workhorse layout for "what Zolix tracks / core capabilities" blocks. */
export function CardGrid({
  title,
  intro,
  cards,
  columns = 3,
  theme = "light",
}: {
  title?: string;
  intro?: string;
  cards: Card[];
  columns?: 2 | 3;
  theme?: "light" | "beige";
}) {
  return (
    <section
      data-nav-theme={theme === "beige" ? "beige" : "light"}
      className={`py-32 px-6 ${theme === "beige" ? "bg-zolix-beige" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto">
        {title && <SectionHeading title={title} intro={intro} />}
        <div className={`grid gap-8 ${columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`}>
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              {...fadeUp}
              transition={{ delay: (i % 3) * 0.08 }}
              className={`group p-10 rounded-[40px] border border-zolix-dark/5 h-full transition-all duration-500 hover:bg-zolix-dark ${
                theme === "beige" ? "bg-white" : "bg-zolix-beige"
              }`}
            >
              {card.icon && (
                <div className="w-14 h-14 bg-zolix-orange rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform">
                  <card.icon size={26} />
                </div>
              )}
              <h3 className="text-xl font-bold mb-4 text-zolix-dark group-hover:text-white transition-colors">
                {card.title}
              </h3>
              <p className="text-zolix-dark/50 group-hover:text-white/50 leading-relaxed font-medium text-base transition-colors">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Two-column capability/detail table, rendered as rows rather than a raw <table>. */
export function DefinitionRows({
  title,
  intro,
  columns,
  rows,
  theme = "beige",
}: {
  title: string;
  intro?: string;
  columns: [string, string];
  rows: Row[];
  theme?: "light" | "beige";
}) {
  return (
    <section
      data-nav-theme={theme === "beige" ? "beige" : "light"}
      className={`py-32 px-6 ${theme === "beige" ? "bg-zolix-beige" : "bg-white"}`}
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeading title={title} intro={intro} />
        <div className="rounded-[40px] overflow-hidden border border-zolix-dark/5 bg-white">
          <div className="grid grid-cols-3 gap-6 px-8 md:px-12 py-6 bg-zolix-dark text-white">
            <div className="col-span-1 text-[10px] font-bold uppercase tracking-widest opacity-50">{columns[0]}</div>
            <div className="col-span-2 text-[10px] font-bold uppercase tracking-widest opacity-50">{columns[1]}</div>
          </div>
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 px-8 md:px-12 py-8 border-t border-zolix-dark/5 hover:bg-zolix-beige/60 transition-colors"
            >
              <div className="md:col-span-1 font-bold text-zolix-dark">{row.label}</div>
              <div className="md:col-span-2 text-zolix-dark/55 font-medium leading-relaxed">{row.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Checklist block for "why this matters" / "why teams choose Zolix" sections. */
export function CheckList({
  title,
  intro,
  items,
  theme = "light",
}: {
  title: string;
  intro?: string;
  items: string[];
  theme?: "light" | "beige" | "dark";
}) {
  const dark = theme === "dark";
  return (
    <section
      data-nav-theme={dark ? "dark" : theme === "beige" ? "beige" : "light"}
      className={`py-32 px-6 ${dark ? "bg-zolix-dark" : theme === "beige" ? "bg-zolix-beige" : "bg-white"}`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 max-w-3xl">
          <h2
            className={`text-3xl md:text-5xl font-bold tracking-tighter mb-6 ${dark ? "text-white" : "text-zolix-dark"}`}
          >
            {title}
          </h2>
          {intro && (
            <p className={`text-xl font-medium leading-relaxed ${dark ? "text-white/50" : "text-zolix-dark/50"}`}>
              {intro}
            </p>
          )}
        </div>
        <ul className="space-y-5">
          {items.map((item, i) => (
            <motion.li
              key={item}
              {...fadeUp}
              transition={{ delay: i * 0.06 }}
              className={`flex items-start gap-5 p-7 rounded-3xl border transition-colors ${
                dark
                  ? "bg-white/5 border-white/10 hover:bg-white/10"
                  : "bg-zolix-beige border-zolix-dark/5 hover:border-zolix-orange/30"
              }`}
            >
              <span className="shrink-0 w-7 h-7 rounded-full bg-zolix-orange flex items-center justify-center text-white mt-0.5">
                <Check size={15} strokeWidth={3} />
              </span>
              <span className={`text-lg font-medium leading-relaxed ${dark ? "text-white/70" : "text-zolix-dark/70"}`}>
                {item}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Free-form prose block for the longer narrative sections. */
export function Prose({
  title,
  paragraphs,
  theme = "light",
}: {
  title: string;
  paragraphs: string[];
  theme?: "light" | "beige";
}) {
  return (
    <section
      data-nav-theme={theme === "beige" ? "beige" : "light"}
      className={`py-32 px-6 ${theme === "beige" ? "bg-zolix-beige" : "bg-white"}`}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-zolix-dark mb-10">{title}</h2>
        <div className="space-y-7">
          {paragraphs.map((p) => (
            <p key={p} className="text-xl text-zolix-dark/60 font-medium leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StatsRow({ title, intro, stats }: { title?: string; intro?: string; stats: Stat[] }) {
  return (
    <section data-nav-theme="light" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {title && <SectionHeading title={title} intro={intro} />}
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              {...fadeUp}
              transition={{ delay: i * 0.1 }}
              className="p-12 bg-zolix-beige rounded-[40px] border border-zolix-dark/5 text-center"
            >
              <div className="text-4xl md:text-5xl font-extrabold tracking-tighter text-zolix-orange mb-5">
                {stat.value}
              </div>
              <div className="text-base text-zolix-dark/55 font-medium leading-relaxed">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Steps({ title, steps, theme = "beige" }: { title: string; steps: Step[]; theme?: "light" | "beige" }) {
  return (
    <section
      data-nav-theme={theme === "beige" ? "beige" : "light"}
      className={`py-32 px-6 ${theme === "beige" ? "bg-zolix-beige" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading title={title} align="center" />
        <div className="relative grid gap-5 md:grid-cols-3 md:gap-6">
          <div className="pointer-events-none absolute left-[17%] right-[17%] top-10 hidden border-t border-dashed border-zolix-orange/35 md:block" aria-hidden="true" />
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              {...fadeUp}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-[30px] border border-zolix-dark/7 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-zolix-orange/25 hover:shadow-xl hover:shadow-zolix-dark/[0.06] md:p-8"
            >
              <div className="mb-12 flex items-start justify-between">
                <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-[24px] border border-zolix-orange/15 bg-zolix-orange/10 text-2xl font-black tracking-tighter text-zolix-orange transition-colors duration-500 group-hover:bg-zolix-orange group-hover:text-white">
                  {`0${i + 1}`}
                </div>
                <span className="pt-2 text-[10px] font-black uppercase tracking-[0.2em] text-zolix-dark/25">Step {i + 1}</span>
              </div>
              <h3 className="mb-3 text-2xl font-bold tracking-tight text-zolix-dark">{step.title}</h3>
              <p className="text-base font-medium leading-relaxed text-zolix-dark/55">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Closing conversion block — dark panel, matching the wireframed CTA. */
export function CTABanner({
  title,
  intro,
  primary,
  secondary,
}: {
  title: string;
  intro: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section data-nav-theme="light" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden bg-zolix-dark text-white rounded-[60px] px-8 md:px-20 py-24 text-center shadow-2xl">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle 320px at 100% 0%, rgba(220, 106, 79, 0.22), transparent 70%)",
            }}
          />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-6xl font-bold tracking-tighter leading-[0.95] mb-8">{title}</h2>
            <p className="text-lg md:text-xl text-white/50 font-medium leading-relaxed mb-14">{intro}</p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <CTAButton {...primary} tone="orange" />
              {secondary && <CTAButton {...secondary} tone="white" />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
