"use client";

import { motion } from "framer-motion";
import { Activity, AlertTriangle, ArrowRight, BarChart3, ClipboardList, Cpu, Eye, LayoutDashboard, Receipt, ShieldCheck, Sparkles, Tags, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import FAQ, { type FaqItem } from "@/components/FAQ";

const takeaways = [
  ["Unified AI FinOps Alignment", "Bring engineering, finance, and leadership together with one shared view of AI spend, instead of three teams working off three different numbers.", Users],
  ["Real-Time Attribution and Anomaly Detection", "Continuous monitoring flags a token cost spike or a runaway feature the day it happens, not the month it shows up on an invoice.", Activity],
  ["Governed, Explainable AI Spend", "Standardized attribution, unit economics, and showback-to-chargeback models turn AI cost from a mystery line item into something finance can actually govern.", ShieldCheck],
] as const;

const offerings = [
  ["Real-Time Spend Visibility", "Zolix pulls token-level and GPU spend data directly from your AI providers into one normalized view, so nobody's reconciling separate dashboards to understand a single number.", Eye],
  ["Attribution & Chargeback Modeling", "Spend gets mapped to model, team, feature, and prompt category from day one, with a showback foundation that's ready to graduate into formal chargeback whenever your organization is.", Tags],
  ["Continuous Anomaly Detection", "Zolix monitors spend against a rolling baseline around the clock, flagging cost spikes and unusual usage patterns while there's still time to act, not after the invoice confirms the damage.", AlertTriangle],
  ["Unit Economics & ROI Tracking", "Cost per inference, per token, and per business outcome - connected to the value that spend is actually producing, so AI investment gets evaluated the way any other investment would be.", BarChart3],
] as const;

const supporting = [
  {
    title: "AI FinOps Assessment & Onboarding", icon: ClipboardList,
    desc: "A full read on your current AI spend footprint - providers connected, models in use, existing attribution gaps - used to build a practical rollout plan for continuous visibility.",
    bullets: ["Map current AI provider and model footprint", "Identify existing attribution and tagging gaps", "Benchmark current spend against unit economics", "Establish a rollout plan for continuous monitoring", "Confirm read-only, zero-agent connection requirements"],
  },
  {
    title: "Token and GPU Spend Optimization", icon: Cpu,
    desc: "Ongoing analysis of token consumption, model routing, and shared GPU cluster usage to find where prompt changes, caching, or model swaps would cut cost without hurting output quality.",
    bullets: ["Identify prompt and caching optimization opportunities", "Flag model-routing candidates for cost-sensitive requests", "Separate training and inference GPU cost profiles", "Track Reserved and Spot coverage for AI compute", "Surface idle GPU capacity tied to AI workloads"],
  },
  {
    title: "Real-Time Dashboards & Reporting", icon: LayoutDashboard,
    desc: "Consolidated dashboards that bring together every connected provider's spend, broken down by team, model, and feature, so stakeholders get one place to check instead of five.",
    bullets: ["Unify spend across every connected AI provider", "Visualize cost by team, model, and feature", "Track spend trends against forecasted baselines", "Reduce time spent reconciling separate invoices", "Support both engineering and finance reporting needs"],
  },
  {
    title: "Governance & Budget Guardrails", icon: ShieldCheck,
    desc: "Defined spend thresholds per team or model, with alerts that fire the moment usage crosses a limit, so budget control doesn't rely on someone remembering to check a dashboard.",
    bullets: ["Set per-team and per-model budget thresholds", "Alert stakeholders automatically at defined limits", "Maintain audit-ready attribution records", "Support cross-team accountability without manual chasing", "Keep governance consistent as new models get added"],
  },
  {
    title: "Chargeback & Showback Models", icon: Receipt,
    desc: "Cost-allocation structures that assign AI spend to the business units generating it, without requiring a manual tagging effort from engineering before the data becomes usable.",
    bullets: ["Start with showback to build data trust", "Graduate to formal chargeback when ready", "Assign spend by team, feature, or business unit", "Improve budget ownership and accountability", "Remove ambiguity from AI budget conversations"],
  },
] as const;

const intelligence = [
  ["Continuous Anomaly Detection", "Detect unexpected spikes, investigate root causes, prevent runaway spend before it compounds, and alert the responsible team in real time.", AlertTriangle],
  ["Forecasting and Budget Accuracy", "Model spend trajectories against usage trends, improve budget accuracy, reduce unplanned overages, and give leadership a number they can actually plan around.", TrendingUp],
  ["Optimization Without Manual Effort", "Recommend prompt, caching, and routing changes, flag Reserved and Spot coverage gaps, surface idle GPU capacity, and keep optimization running continuously.", Sparkles],
] as const;

function Button({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  const className = `group inline-flex items-center gap-3 rounded-full px-7 py-4 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors ${light ? "bg-white text-zolix-dark hover:bg-zolix-orange hover:text-white" : "bg-zolix-dark text-white hover:bg-zolix-orange"}`;
  const content = <>{children}<ArrowRight size={15} strokeWidth={3} className="transition-transform duration-200 group-hover:translate-x-1" /></>;
  return href.startsWith("http") ? <a href={href} target="_blank" rel="noreferrer" className={className}>{content}</a> : <Link href={href} className={className}>{content}</Link>;
}

const reveal = { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.18 } };

export default function AiFinopsTechnology({ faqs, breadcrumbs }: { faqs: FaqItem[]; breadcrumbs: ReactNode }) {
  return <>
    <section data-nav-theme="beige" className="relative overflow-hidden bg-zolix-beige px-6 pb-20 pt-40 md:pb-28">
      <div className="absolute -right-24 top-10 h-[34rem] w-[34rem] rounded-full border border-zolix-orange/15" />
      <div className="absolute right-32 top-48 h-60 w-60 rounded-full bg-zolix-orange/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        {breadcrumbs}
        <div className="grid gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-7 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">Technology / AI FinOps</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="max-w-3xl text-4xl font-extrabold leading-[.98] tracking-[-0.05em] text-zolix-dark md:text-6xl">AI FinOps Solutions That Reduce Cloud Costs & Increase Financial Control, Automatically</motion.h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-zolix-dark/60 md:text-xl">Zolix unifies engineering, finance, and leadership into one AI FinOps practice - powered by zero-agent detection, continuous anomaly monitoring, and real-time unit economics. Turn unpredictable AI spend into a governed, explainable part of your budget, across every model and provider you run.</motion.p>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="mt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-zolix-orange">Read-Only by Design &nbsp;|&nbsp; Zero-Agent Architecture &nbsp;|&nbsp; 24-Hour First Report</motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} className="mt-10 flex flex-wrap gap-4"><Button href="https://lite.zolix.ai/signup">Get Started</Button><Button href="/demo" light>Book a Demo</Button></motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, delay: 0.1 }} className="relative mx-auto w-full max-w-lg rounded-[2rem] border border-zolix-dark/10 bg-white/70 p-6 shadow-[0_24px_70px_rgba(26,26,26,0.08)] backdrop-blur-sm md:p-8">
            <div className="flex items-center justify-between border-b border-zolix-dark/10 pb-5 text-[9px] font-bold uppercase tracking-[0.18em]"><span className="text-zolix-dark/45">One shared view</span><span className="flex items-center gap-2 text-zolix-orange"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zolix-orange" />Governed</span></div>
            <div className="mt-7 space-y-3">
              {[["Engineering", "Real-time usage & attribution", Activity], ["Finance", "Chargeback & showback", Receipt], ["Leadership", "Forecasts & guardrails", ShieldCheck]].map(([title, label, Icon], index) => {
                const NodeIcon = Icon as typeof Activity;
                return <motion.div key={title as string} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.32 + index * 0.1 }} className="relative flex items-center gap-4 rounded-2xl bg-zolix-beige/70 p-4"><span className="relative z-10 grid h-7 w-7 place-items-center rounded-full bg-zolix-dark text-white"><NodeIcon size={13} /></span><div><p className="text-sm font-bold text-zolix-dark">{title as string}</p><p className="mt-0.5 text-xs font-medium text-zolix-dark/45">{label as string}</p></div><span className="ml-auto text-[9px] font-bold uppercase tracking-wider text-zolix-orange">Aligned</span></motion.div>;
              })}
            </div>
            <p className="mt-7 border-t border-zolix-dark/10 pt-5 text-sm font-medium leading-relaxed text-zolix-dark/50">One shared view of AI spend, instead of three teams working off three different numbers.</p>
          </motion.div>
        </div>
      </div>
    </section>

    <section data-nav-theme="light" className="bg-white px-6 py-24 md:py-32"><div className="mx-auto max-w-7xl"><div className="max-w-3xl"><p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">Key Takeaways</p><h2 className="text-4xl font-bold leading-none tracking-[-0.05em] text-zolix-dark md:text-6xl">Turn AI Spend Into a Governed Practice, Not a Guessing Game</h2><p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-zolix-dark/55">Most teams don&apos;t have an AI cost problem - they have a visibility and attribution problem. Zolix helps connect engineering, finance, and leadership around the same numbers, so decisions about model choice, scaling, and budget stop being made in the dark.</p></div><div className="mt-3 grid gap-x-14 md:grid-cols-3">{takeaways.map(([title, desc, Icon], index) => <motion.article key={title} {...reveal} transition={{ delay: index * 0.06 }} className="group border-t border-zolix-dark/10 pt-8 md:pt-10"><span className="grid h-11 w-11 place-items-center rounded-xl bg-zolix-beige text-zolix-orange transition-transform group-hover:-translate-y-1"><Icon size={21} /></span><h3 className="mt-6 text-xl font-bold tracking-tight text-zolix-dark">{title}</h3><p className="mt-3 text-[15px] font-medium leading-relaxed text-zolix-dark/55">{desc}</p></motion.article>)}</div></div></section>

    <section data-nav-theme="beige" className="bg-zolix-beige px-6 py-24 md:py-32"><div className="mx-auto max-w-7xl"><div className="max-w-3xl"><p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">Core AI FinOps Offerings</p><h2 className="text-4xl font-bold leading-none tracking-[-0.05em] text-zolix-dark md:text-6xl">The four pillars of the practice</h2></div><div className="mt-16 grid gap-x-14 gap-y-10 md:grid-cols-2">{offerings.map(([title, desc, Icon], index) => <motion.article key={title} {...reveal} transition={{ delay: (index % 2) * 0.06 }} className="group border-t border-zolix-dark/15 pt-6"><div className="flex items-start gap-5"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-zolix-orange transition-transform duration-300 group-hover:-translate-y-1"><Icon size={21} /></span><div><h3 className="text-xl font-bold tracking-tight text-zolix-dark">{title}</h3><p className="mt-3 text-[15px] font-medium leading-relaxed text-zolix-dark/55">{desc}</p></div></div></motion.article>)}</div><div className="mt-14"><Button href="/demo">Talk to a Zolix Specialist</Button></div></div></section>

    <section data-nav-theme="light" className="bg-white px-6 py-24 md:py-32"><div className="mx-auto max-w-7xl"><div className="max-w-3xl"><p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">Supporting Capabilities</p><h2 className="text-4xl font-bold leading-none tracking-[-0.05em] text-zolix-dark md:text-6xl">Everything the practice runs on</h2></div><div className="mt-16 grid gap-8 md:grid-cols-2">{supporting.map((s, index) => { const Icon = s.icon; return <motion.article key={s.title} {...reveal} transition={{ delay: (index % 2) * 0.06 }} className="rounded-[28px] border border-zolix-dark/10 bg-zolix-beige p-8"><span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-zolix-orange"><Icon size={21} /></span><h3 className="mt-6 text-xl font-bold tracking-tight text-zolix-dark">{s.title}</h3><p className="mt-3 text-[15px] font-medium leading-relaxed text-zolix-dark/55">{s.desc}</p><ul className="mt-5 space-y-2.5">{s.bullets.map((b) => <li key={b} className="flex items-start gap-3 text-sm font-medium leading-relaxed text-zolix-dark/55"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zolix-orange" />{b}</li>)}</ul></motion.article>; })}</div></div></section>

    <section data-nav-theme="dark" className="bg-zolix-dark px-6 py-20 text-white md:py-28"><div className="mx-auto max-w-7xl"><p className="mb-10 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">AI-Powered Intelligence That Never Sleeps</p><div className="grid gap-10 border-t border-white/15 pt-9 md:grid-cols-3">{intelligence.map(([title, desc, Icon]) => <div key={title}><Icon size={22} className="text-zolix-orange" /><h3 className="mt-5 text-xl font-bold tracking-tight">{title}</h3><p className="mt-3 text-sm font-medium leading-relaxed text-white/60">{desc}</p></div>)}</div></div></section>

    <section data-nav-theme="beige" className="bg-zolix-beige px-6 py-20 md:py-24"><div className="mx-auto max-w-7xl"><p className="mb-10 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">What This Practice Delivers</p><div className="grid gap-10 border-t border-zolix-dark/10 pt-9 md:grid-cols-3"><div><p className="text-2xl font-extrabold tracking-[-0.05em] text-zolix-dark md:text-3xl">End-to-End AI FinOps, Built to Scale</p><p className="mt-4 text-sm font-medium leading-relaxed text-zolix-dark/55">Visibility, attribution, optimization, and governance in one continuous practice, not a one-time cleanup project.</p></div><div><p className="text-2xl font-extrabold tracking-[-0.05em] text-zolix-dark md:text-3xl">Native Provider Integrations</p><p className="mt-4 text-sm font-medium leading-relaxed text-zolix-dark/55">Direct connections to OpenAI, Anthropic, Amazon Bedrock, and Google Vertex, normalized into a single schema.</p></div><div><p className="text-2xl font-extrabold tracking-[-0.05em] text-zolix-dark md:text-3xl">Read-Only, Zero-Agent Access</p><p className="mt-4 text-sm font-medium leading-relaxed text-zolix-dark/55">No write access to any AI provider account or infrastructure, at any point, ever.</p></div></div></div></section>

    <FAQ items={faqs} theme="light" />

    <section data-nav-theme="dark" className="bg-zolix-dark px-6 py-20 text-white md:py-28"><div className="mx-auto max-w-5xl text-center"><ShieldCheck size={28} className="mx-auto text-zolix-orange" /><h2 className="mt-8 text-4xl font-bold leading-none tracking-[-0.05em] md:text-6xl">Let&apos;s Build Your AI FinOps Practice Together</h2><p className="mx-auto mt-7 max-w-2xl text-lg font-medium leading-relaxed text-white/60">Connect your AI providers through read-only access and see exactly where every dollar of AI spend is going - before the next invoice tells you after the fact.</p><div className="mt-10 flex flex-wrap justify-center gap-4"><Button href="/demo" light>Book a Free Consultation</Button></div></div></section>
  </>;
}
