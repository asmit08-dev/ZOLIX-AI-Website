"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight, BarChart3, Boxes, Cpu, Database, Eye, Layers3, PiggyBank, Receipt, ShieldCheck, Tags, Target, TrendingUp, Users, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import FAQ, { type FaqItem } from "@/components/FAQ";

const waste = [
  ["Optimize Cloud Costs", "Zero-agent detection and automated recommendations cut waste immediately, without waiting on a tagging cleanup first.", Zap],
  ["Understand Cloud Spend", "Deep workload-level insight across compute, storage, containers, and data platforms - not just a top-line total.", Eye],
  ["Quantify Business Value", "Allocate cost with precision across teams, products, and customers, so spend can be measured against what it's producing.", Target],
  ["Manage Your FinOps Practice", "Drive governance, accountability, and cross-team alignment from one shared source of truth.", Users],
  ["Kubernetes-Aware Optimization", "Rightsizing recommendations that account for actual pod-level and node-level usage, not just cluster totals.", Boxes],
  ["Real-Time Anomaly Detection", "Cost spikes get flagged as they happen, against a rolling baseline - not discovered a month later on an invoice.", AlertTriangle],
] as const;

const practice = [
  ["Workload Optimization", "Contextualized insight across compute, containers, and data platforms, with automated recommendations ready to act on immediately.", Cpu],
  ["Rate Optimization", "Continuous management of Reserved Instance, Savings Plan, and commitment coverage, so discounted pricing gets captured without locking you into long-term risk.", PiggyBank],
  ["Allocation, Without a Tagging Prerequisite", "Cost mapped to teams, applications, or regions from real usage data - tagged resources and untagged ones alike - so allocation coverage doesn't quietly erode over time.", Tags],
  ["Budgeting & Forecasting", "Forecasts built from actual usage trends, with budgeting and alerting tied to your largest cost centers, not a flat historical average.", TrendingUp],
  ["Unit Economics", "Custom metrics tied to long-term business health, so the biggest cost drivers are visible in context, not buried in a blended total.", BarChart3],
  ["Data Ingestion", "Consolidated cost data from every connected provider and platform, with a consistent schema instead of five different formats to reconcile by hand.", Database],
  ["Architecture Visibility", "A full view of your cloud architecture, surfacing inefficiencies and performance issues that a cost dashboard alone would never reveal.", Layers3],
  ["Chargeback & Invoicing", "Cost data aligned to actual financial reporting requirements, so spend can be attributed to specific stakeholders with real accountability behind it.", Receipt],
] as const;

function Button({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  const className = `group inline-flex items-center gap-3 rounded-full px-7 py-4 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors ${light ? "bg-white text-zolix-dark hover:bg-zolix-orange hover:text-white" : "bg-zolix-dark text-white hover:bg-zolix-orange"}`;
  const content = <>{children}<ArrowRight size={15} strokeWidth={3} className="transition-transform duration-200 group-hover:translate-x-1" /></>;
  return href.startsWith("http") ? <a href={href} target="_blank" rel="noreferrer" className={className}>{content}</a> : <Link href={href} className={className}>{content}</Link>;
}

const reveal = { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.18 } };

export default function CloudFinopsTechnology({ faqs, breadcrumbs }: { faqs: FaqItem[]; breadcrumbs: ReactNode }) {
  return <>
    <section data-nav-theme="beige" className="relative overflow-hidden bg-zolix-beige px-6 pb-20 pt-40 md:pb-28">
      <div className="absolute -right-24 top-10 h-[34rem] w-[34rem] rounded-full border border-zolix-orange/15" />
      <div className="absolute right-32 top-48 h-60 w-60 rounded-full bg-zolix-orange/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        {breadcrumbs}
        <div className="grid gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-7 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">Technology / Cloud FinOps</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="max-w-3xl text-5xl font-extrabold leading-[.94] tracking-[-0.06em] text-zolix-dark md:text-7xl">Cloud Cost Optimization Solutions for Cloud FinOps</motion.h1>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="mt-6 text-[11px] font-bold uppercase tracking-[0.2em] text-zolix-orange/80">From Blind Spend to Governed Practice</motion.p>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-zolix-dark/60 md:text-xl">Zero-agent detection, real-time anomaly alerts, and 100% spend allocation - tagged or not - in one platform. FinOps teams stop chasing spreadsheets and start acting on what the data actually shows.</motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-10 flex flex-wrap gap-4"><Button href="/demo">See a Demo</Button></motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, delay: 0.1 }} className="relative mx-auto w-full max-w-lg rounded-[2rem] border border-zolix-dark/10 bg-white/70 p-6 shadow-[0_24px_70px_rgba(26,26,26,0.08)] backdrop-blur-sm md:p-8">
            <div className="flex items-center justify-between border-b border-zolix-dark/10 pb-5 text-[9px] font-bold uppercase tracking-[0.18em]"><span className="text-zolix-dark/45">Governed practice</span><span className="flex items-center gap-2 text-zolix-orange"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zolix-orange" />Zero-agent</span></div>
            <div className="mt-7 space-y-3">
              {[["Workload spend", "Compute, containers, data platforms", Cpu], ["Rate coverage", "Reserved & Savings Plan tracking", PiggyBank], ["Allocation", "100% - tagged or not", Tags]].map(([title, label, Icon], index) => {
                const NodeIcon = Icon as typeof Cpu;
                return <motion.div key={title as string} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.32 + index * 0.1 }} className="relative flex items-center gap-4 rounded-2xl bg-zolix-beige/70 p-4"><span className="relative z-10 grid h-7 w-7 place-items-center rounded-full bg-zolix-dark text-white"><NodeIcon size={13} /></span><div><p className="text-sm font-bold text-zolix-dark">{title as string}</p><p className="mt-0.5 text-xs font-medium text-zolix-dark/45">{label as string}</p></div><span className="ml-auto text-[9px] font-bold uppercase tracking-wider text-zolix-orange">Governed</span></motion.div>;
              })}
            </div>
            <p className="mt-7 border-t border-zolix-dark/10 pt-5 text-sm font-medium leading-relaxed text-zolix-dark/50">FinOps teams stop chasing spreadsheets and start acting on what the data actually shows.</p>
          </motion.div>
        </div>
      </div>
    </section>

    <section data-nav-theme="light" className="bg-white px-6 py-24 md:py-32"><div className="mx-auto max-w-7xl"><div className="grid gap-12 lg:grid-cols-2 lg:items-start"><div><h2 className="text-4xl font-bold leading-[1.05] tracking-[-0.05em] text-zolix-dark md:text-6xl">Uncover Hidden Waste in Your Environment</h2><p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-zolix-dark/55">Zolix goes past surface-level cost alerts to find waste at every layer of your cloud architecture - and because allocation doesn&apos;t depend on tagging discipline, nothing gets left out of the picture.</p><div className="mt-8"><Button href="/demo">See a Demo</Button></div></div><motion.div {...reveal} className="relative min-h-[26rem] overflow-hidden rounded-2xl bg-zolix-dark shadow-[0_18px_45px_rgba(155,85,0,.16)]"><Image src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=85" alt="Data visualization representing cloud FinOps analysis" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-zolix-dark/90 via-zolix-dark/35 to-transparent" /><div className="absolute inset-x-5 bottom-5 flex items-end justify-between"><span className="rounded-full border border-white/20 bg-zolix-dark/55 px-3 py-2 text-[9px] font-bold uppercase tracking-[.16em] text-white backdrop-blur-md">Cloud FinOps intelligence</span><a href="https://unsplash.com/license" target="_blank" rel="noreferrer" className="text-[7px] font-medium text-white/60 underline-offset-2 hover:text-white hover:underline">Photo licensed via Unsplash</a></div></motion.div></div><div className="mt-20 grid gap-x-14 gap-y-2 md:mt-28 md:grid-cols-3">{waste.map(([title, desc, Icon], index) => <motion.article key={title} {...reveal} transition={{ delay: (index % 3) * 0.06 }} className="group flex items-start gap-5 rounded-2xl px-4 py-8 transition-all duration-300 hover:bg-zolix-beige/70"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-zolix-beige text-zolix-orange transition-transform duration-300 group-hover:-translate-y-0.5"><Icon size={20} /></span><div className="flex-1"><h3 className="text-lg font-bold tracking-tight text-zolix-dark">{title}</h3><p className="mt-3 text-sm font-medium leading-relaxed text-zolix-dark/55">{desc}</p></div></motion.article>)}</div><div className="mt-16 rounded-3xl bg-zolix-dark px-8 py-14 text-center text-white md:px-16 md:py-16"><h3 className="text-3xl font-bold leading-none tracking-[-0.05em] md:text-5xl">Ready to Find the Waste Hiding in Your Environment?</h3><div className="mt-8 flex flex-wrap justify-center gap-4"><Button href="/demo" light>Book a Demo</Button></div></div></div></section>

    <section data-nav-theme="beige" className="bg-zolix-beige px-6 py-24 md:py-32"><div className="mx-auto max-w-5xl"><p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">The Allocation Problem Most FinOps Platforms Never Actually Solve</p><p className="text-2xl font-medium leading-relaxed tracking-tight text-zolix-dark md:text-3xl">Every FinOps platform promises full cost allocation. Almost all of them quietly depend on your tagging discipline to deliver it - and tagging discipline degrades the moment nobody&apos;s actively enforcing it. Within a few months, a meaningful chunk of spend sits in an &quot;unallocated&quot; bucket that undermines the whole practice.</p><p className="mt-8 text-lg font-medium leading-relaxed text-zolix-dark/55">Zolix allocates 100% of cloud spend - tagged, untagged, and effectively untaggable - using a detection model that reads usage signals directly, instead of relying on a label someone had to remember to apply. This is the difference between a FinOps practice that works in theory and one that actually holds up as your environment grows and changes.</p></div></section>

    <section data-nav-theme="light" className="bg-white px-6 py-24 md:py-32"><div className="mx-auto max-w-7xl"><div className="max-w-3xl"><p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">End-to-End FinOps, Built as One Practice</p><h2 className="text-4xl font-bold leading-none tracking-[-0.05em] text-zolix-dark md:text-6xl">Every discipline, in one platform</h2></div><div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">{practice.map(([title, desc, Icon], index) => <motion.article key={title} {...reveal} transition={{ delay: (index % 4) * 0.05 }} className="group rounded-[28px] border border-zolix-dark/10 bg-zolix-beige p-6"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-zolix-orange transition-transform duration-300 group-hover:-translate-y-1"><Icon size={18} /></span><h3 className="mt-5 text-base font-bold leading-snug tracking-tight text-zolix-dark">{title}</h3><p className="mt-2.5 text-[13px] font-medium leading-relaxed text-zolix-dark/55">{desc}</p></motion.article>)}</div></div></section>

    <section data-nav-theme="beige" className="bg-zolix-beige px-6 py-24 md:py-32"><div className="mx-auto max-w-5xl"><p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">Look Past &quot;Fully Utilized&quot;</p><h2 className="text-4xl font-bold leading-none tracking-[-0.05em] text-zolix-dark md:text-6xl">Find What&apos;s Actually Wasteful</h2><p className="mt-8 text-lg font-medium leading-relaxed text-zolix-dark/55">Infrastructure that looks fully utilized on a dashboard often isn&apos;t, once you look closer - a Spark job processing lopsided data volumes across executors, an unindexed database query burning compute it shouldn&apos;t need, a GPU sitting at low inference utilization while still billed at full capacity. Zolix doesn&apos;t stop at instance rightsizing. It looks for workload-level inefficiency that a simple &quot;is this instance the right size&quot; check would miss entirely, because the waste isn&apos;t in the instance size - it&apos;s in how the workload is actually running.</p></div></section>

    <section data-nav-theme="dark" className="bg-zolix-dark px-6 py-20 text-white md:py-24"><div className="mx-auto max-w-7xl"><p className="mb-10 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">What teams see with Zolix</p><div className="grid gap-10 border-t border-white/15 pt-9 md:grid-cols-3"><div><p className="text-3xl font-extrabold tracking-[-0.06em] text-zolix-orange md:text-4xl">100% Allocated</p><p className="mt-4 text-sm font-medium leading-relaxed text-white/60">of spend - no unattributed or &quot;unallocated&quot; bucket sitting on the dashboard.</p></div><div><p className="text-3xl font-extrabold tracking-[-0.06em] text-zolix-orange md:text-4xl">24 Hours</p><p className="mt-4 text-sm font-medium leading-relaxed text-white/60">to a first cost visibility report across every connected environment.</p></div><div><p className="text-3xl font-extrabold tracking-[-0.06em] text-zolix-orange md:text-4xl">Full Coverage</p><p className="mt-4 text-sm font-medium leading-relaxed text-white/60">from container orchestration platforms to data warehouses, not just standard compute.</p></div></div></div></section>

    <FAQ items={faqs} theme="beige" />

    <section data-nav-theme="dark" className="bg-zolix-dark px-6 py-20 text-white md:py-28"><div className="mx-auto max-w-5xl text-center"><ShieldCheck size={28} className="mx-auto text-zolix-orange" /><h2 className="mt-8 text-4xl font-bold leading-none tracking-[-0.05em] md:text-6xl">Build a FinOps Practice That Doesn&apos;t Depend on Perfect Tagging</h2><p className="mx-auto mt-7 max-w-2xl text-lg font-medium leading-relaxed text-white/60">Connect your environment through read-only access and see 100% of your cloud spend allocated from day one - tagged or not.</p><div className="mt-10 flex flex-wrap justify-center gap-4"><Button href="/demo" light>Book a Demo</Button></div></div></section>
  </>;
}
