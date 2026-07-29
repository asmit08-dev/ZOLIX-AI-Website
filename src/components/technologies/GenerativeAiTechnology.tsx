"use client";

import { motion } from "framer-motion";
import { Activity, AlertTriangle, ArrowRight, BarChart3, Layers3, Plug, ShieldCheck, Tags, Target, TrendingUp, type LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import FAQ, { type FaqItem } from "@/components/FAQ";

type Section = { number: string; title: string; desc: string; icon: LucideIcon; bullets?: readonly string[] };

const sections: Section[] = [
  { number: "01", title: "GenAI Spend Is Rising Faster Than Most Teams Can Track It", desc: "GPUs cost 10 to 20 times more than standard compute, and token-based billing means the cost of a single feature can swing wildly depending on how a model is prompted, cached, or scaled that week. Most teams can tell you what their GenAI bill was last month. Few can tell you which model, which feature, or which customer actually drove it. Zolix closes that gap.", icon: TrendingUp },
  {
    number: "02", title: "Allocate 100% of AI Spend", desc: "Zolix's zero-agent allocation engine attributes GenAI spend to its actual source automatically - no manual tagging, no waiting on engineering to instrument a new model.", icon: Tags,
    bullets: ["Teams are accountable for the cost of the models and features they own", "Architectural decisions get made with real cost data, not a guess", "Savings opportunities and budget overruns get caught before the invoice, not after"],
  },
  { number: "03", title: "Analyze Cost Per Inference, Per Model, Per User", desc: "Zolix breaks GenAI spend down into the unit economics that actually explain it - cost per inference, cost per token, cost per model, and cost per user - rather than stopping at an “18% improvement” that doesn't tell you what changed or why. This shows exactly which model, feature, or customer segment is the most and least expensive part of your AI product, and how that's trending as usage scales.", icon: BarChart3 },
  { number: "04", title: "Connect AI Spend to Business Outcomes", desc: "Cost per inference only matters in context. Zolix connects unit cost metrics to the outcomes they're tied to - revenue per customer, engagement per feature, retention per cohort - so a rising GenAI bill can be evaluated against what it's actually producing, not treated as pure expense to be minimized at any cost.", icon: Target },
  { number: "05", title: "Catch Spend Spikes Before They Compound", desc: "When GenAI spend spikes - a prompt loop gone wrong, an uncapped batch job, a model serving far more traffic than expected - Zolix alerts the team responsible with hour-level detail on when the spike started, so root cause analysis takes minutes instead of a multi-day investigation after the bill arrives.", icon: AlertTriangle },
];

const billing = [
  ["Named Provider Integrations", "Zolix integrates directly with the providers actually driving GenAI cost - Anthropic and OpenAI among them - so token and API spend is visible at the source, not estimated from a downstream cloud bill.", Plug],
  ["Model-Level Cost Breakdown", "See spend broken down by model - which one is carrying the most traffic, which one is the most expensive per request, and which one might be a candidate for a cheaper alternative without a meaningful quality tradeoff.", Layers3],
  ["Token Volatility Tracking", "Because token consumption can swing sharply based on prompt design and caching, Zolix tracks token spend continuously rather than reporting it as a flat monthly average that hides the swings.", Activity],
] as const;

function Button({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  const className = `group inline-flex items-center gap-3 rounded-full px-7 py-4 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors ${light ? "bg-white text-zolix-dark hover:bg-zolix-orange hover:text-white" : "bg-zolix-dark text-white hover:bg-zolix-orange"}`;
  const content = <>{children}<ArrowRight size={15} strokeWidth={3} className="transition-transform duration-200 group-hover:translate-x-1" /></>;
  return href.startsWith("http") ? <a href={href} target="_blank" rel="noreferrer" className={className}>{content}</a> : <Link href={href} className={className}>{content}</Link>;
}

const reveal = { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.18 } };

export default function GenerativeAiTechnology({ faqs, breadcrumbs }: { faqs: FaqItem[]; breadcrumbs: ReactNode }) {
  return <>
    <section data-nav-theme="beige" className="relative overflow-hidden bg-zolix-beige px-6 pb-20 pt-40 md:pb-28">
      <div className="absolute -right-24 top-10 h-[34rem] w-[34rem] rounded-full border border-zolix-orange/15" />
      <div className="absolute right-32 top-48 h-60 w-60 rounded-full bg-zolix-orange/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        {breadcrumbs}
        <div className="grid gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-7 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">Technology / Generative AI</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="max-w-3xl text-5xl font-extrabold leading-[.94] tracking-[-0.06em] text-zolix-dark md:text-7xl">Cloud Cost Optimization Solutions for Generative AI</motion.h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-zolix-dark/60 md:text-xl">Complete visibility and real-time unit economics turn AI spend from an expense you monitor into an investment you can actually track a return on.</motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-10 flex flex-wrap gap-4"><Button href="https://lite.zolix.ai/signup">Get Started</Button><Button href="/demo" light>Book a Demo</Button></motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, delay: 0.1 }} className="relative mx-auto w-full max-w-lg rounded-[2rem] border border-zolix-dark/10 bg-white/70 p-6 shadow-[0_24px_70px_rgba(26,26,26,0.08)] backdrop-blur-sm md:p-8">
            <div className="flex items-center justify-between border-b border-zolix-dark/10 pb-5 text-[9px] font-bold uppercase tracking-[0.18em]"><span className="text-zolix-dark/45">Unit economics</span><span className="flex items-center gap-2 text-zolix-orange"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zolix-orange" />Live</span></div>
            <div className="mt-7 space-y-3">
              {[["Per inference", "Cost broken down by request", BarChart3], ["Per model", "Anthropic, OpenAI & more", Plug], ["Per user", "Attributed automatically", Tags]].map(([title, label, Icon], index) => {
                const NodeIcon = Icon as typeof BarChart3;
                return <motion.div key={title as string} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.32 + index * 0.1 }} className="relative flex items-center gap-4 rounded-2xl bg-zolix-beige/70 p-4"><span className="relative z-10 grid h-7 w-7 place-items-center rounded-full bg-zolix-dark text-white"><NodeIcon size={13} /></span><div><p className="text-sm font-bold text-zolix-dark">{title as string}</p><p className="mt-0.5 text-xs font-medium text-zolix-dark/45">{label as string}</p></div><span className="ml-auto text-[9px] font-bold uppercase tracking-wider text-zolix-orange">Tracked</span></motion.div>;
              })}
            </div>
            <p className="mt-7 border-t border-zolix-dark/10 pt-5 text-sm font-medium leading-relaxed text-zolix-dark/50">100% of GenAI spend allocated to a team, model, or feature automatically.</p>
          </motion.div>
        </div>
        <div className="mt-16 grid gap-3 border-t border-zolix-dark/10 pt-6 sm:grid-cols-3"><p className="flex items-center gap-3 text-xs font-bold text-zolix-dark/65"><ShieldCheck size={16} className="text-zolix-orange" />Read-only, zero-agent</p><p className="flex items-center gap-3 text-xs font-bold text-zolix-dark/65"><Activity size={16} className="text-zolix-orange" />Continuous token tracking</p><p className="flex items-center gap-3 text-xs font-bold text-zolix-dark/65"><Target size={16} className="text-zolix-orange" />Cost tied to outcomes</p></div>
      </div>
    </section>

    <section data-nav-theme="light" className="bg-white px-6 py-24 md:py-32"><div className="mx-auto max-w-7xl"><div className="divide-y divide-zolix-dark/10">{sections.map((s, index) => { const Icon = s.icon; return <motion.article key={s.number} {...reveal} transition={{ delay: index * 0.04 }} className="group grid gap-5 py-10 md:grid-cols-[4rem_1fr] md:items-start md:py-12"><span className="grid h-11 w-11 place-items-center rounded-xl bg-zolix-beige text-zolix-orange"><Icon size={20} /></span><div><p className="text-[10px] font-bold tracking-widest text-zolix-orange">{s.number}</p><h2 className="mt-2 text-2xl font-bold tracking-tight text-zolix-dark md:text-3xl">{s.title}</h2><p className="mt-4 max-w-3xl text-[15px] font-medium leading-relaxed text-zolix-dark/55">{s.desc}</p>{s.bullets && <ul className="mt-5 space-y-2.5">{s.bullets.map((b) => <li key={b} className="flex items-start gap-3 text-[15px] font-medium leading-relaxed text-zolix-dark/55"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zolix-orange" />{b}</li>)}</ul>}</div></motion.article>; })}</div></div></section>

    <section data-nav-theme="beige" className="bg-zolix-beige px-6 py-24 md:py-32"><div className="mx-auto max-w-7xl"><div className="grid gap-12 lg:grid-cols-2 lg:items-start"><div><h2 className="text-4xl font-bold leading-[1.05] tracking-[-0.05em] text-zolix-dark md:text-6xl">Built for How GenAI Actually Gets Billed</h2><p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-zolix-dark/55">Traditional infrastructure billing is predictable. GenAI billing isn&apos;t - token-based pricing means the same feature can cost dramatically more or less depending on prompt length, caching behavior, model choice, and traffic patterns, often changing week to week without anyone changing a single line of code.</p><div className="mt-8"><Button href="https://lite.zolix.ai/signup">Get Started</Button></div></div><motion.div {...reveal} className="relative min-h-[26rem] overflow-hidden rounded-2xl bg-zolix-dark shadow-[0_18px_45px_rgba(155,85,0,.16)]"><Image src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1400&q=85" alt="Analytics dashboard representing AI cost and usage metrics" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-zolix-dark/90 via-zolix-dark/35 to-transparent" /><div className="absolute inset-x-5 bottom-5 flex items-end justify-between"><span className="rounded-full border border-white/20 bg-zolix-dark/55 px-3 py-2 text-[9px] font-bold uppercase tracking-[.16em] text-white backdrop-blur-md">GenAI cost intelligence</span><a href="https://unsplash.com/license" target="_blank" rel="noreferrer" className="text-[7px] font-medium text-white/60 underline-offset-2 hover:text-white hover:underline">Photo licensed via Unsplash</a></div></motion.div></div><div className="mt-20 grid gap-x-14 gap-y-2 md:mt-28 md:grid-cols-3">{billing.map(([title, desc, Icon], index) => <motion.article key={title} {...reveal} transition={{ delay: index * 0.06 }} className="group flex items-start gap-5 rounded-2xl px-4 py-8 transition-all duration-300 hover:bg-white/70"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-zolix-orange transition-transform duration-300 group-hover:-translate-y-0.5"><Icon size={21} /></span><div className="flex-1"><h3 className="text-xl font-bold tracking-tight text-zolix-dark">{title}</h3><p className="mt-4 text-[15px] font-medium leading-relaxed text-zolix-dark/55">{desc}</p></div></motion.article>)}</div><div className="mt-16 rounded-3xl bg-zolix-dark px-8 py-14 text-center text-white md:px-16 md:py-16"><h3 className="text-3xl font-bold leading-none tracking-[-0.05em] md:text-5xl">Ready to Understand What Your GenAI Spend Actually Buys?</h3><div className="mt-8 flex flex-wrap justify-center gap-4"><Button href="https://lite.zolix.ai/signup" light>Get Started</Button><Button href="/demo" light>Book a Demo</Button></div></div></div></section>

    <section data-nav-theme="dark" className="bg-zolix-dark px-6 py-20 text-white md:py-24"><div className="mx-auto max-w-7xl"><p className="mb-10 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">What teams see after connecting GenAI workloads to Zolix</p><div className="grid gap-10 border-t border-white/15 pt-9 md:grid-cols-3"><div><p className="text-3xl font-extrabold tracking-[-0.06em] text-zolix-orange md:text-4xl">100% Allocation</p><p className="mt-4 text-sm font-medium leading-relaxed text-white/60">every dollar of GenAI cost mapped to a team, model, or feature automatically.</p></div><div><p className="text-3xl font-extrabold tracking-[-0.06em] text-zolix-orange md:text-4xl">24 Hours</p><p className="mt-4 text-sm font-medium leading-relaxed text-white/60">to a first cost visibility report across every connected AI workload.</p></div><div><p className="text-3xl font-extrabold tracking-[-0.06em] text-zolix-orange md:text-4xl">Zero Agents</p><p className="mt-4 text-sm font-medium leading-relaxed text-white/60">Zero write access - Zolix connects through read-only access, following each provider&apos;s recommended security practices.</p></div></div></div></section>

    <FAQ items={faqs} theme="beige" />

    <section data-nav-theme="dark" className="bg-zolix-dark px-6 py-20 text-white md:py-28"><div className="mx-auto max-w-5xl text-center"><ShieldCheck size={28} className="mx-auto text-zolix-orange" /><h2 className="mt-8 text-4xl font-bold leading-none tracking-[-0.05em] md:text-6xl">Financial Control and Predictability for Your AI Investment</h2><p className="mx-auto mt-7 max-w-2xl text-lg font-medium leading-relaxed text-white/60">Eliminate wasteful GenAI spend, understand what every model actually costs, and scale AI investment with the same discipline you&apos;d expect from any other part of the business.</p><div className="mt-10 flex flex-wrap justify-center gap-4"><Button href="https://lite.zolix.ai/signup" light>Get Started</Button><Button href="/demo" light>Book a Demo</Button></div></div></section>
  </>;
}
