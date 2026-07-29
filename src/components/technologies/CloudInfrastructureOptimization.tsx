"use client";

import { motion } from "framer-motion";
import { ArrowRight, ClipboardList, Gauge, GitCompare, HardDrive, ListChecks, Map, RefreshCw, ShieldAlert, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import FAQ, { type FaqItem } from "@/components/FAQ";

const approach = [
  ["01", "Assessment - A Complete, Honest Inventory", "Zolix starts with a full read of what's actually running: every resource across every connected account, spend broken down by service and workload, utilization patterns over time, and where configuration has drifted from what was originally intended. Nothing gets touched during this phase.", ClipboardList],
  ["02", "Optimization Roadmap - Prioritized, Not Overwhelming", "Findings get organized by impact and implementation risk, with cost recommendations kept separate from architectural ones, since they carry different timelines and different levels of risk.", Map],
  ["03", "Phased Implementation - Low-Risk First", "Execution starts with changes that carry effectively no downside - idle resource cleanup, Reserved Instance and Savings Plan coverage, unattached storage - before moving into rightsizing and architectural adjustments.", ListChecks],
  ["04", "Continuous Optimization - Because Drift Never Stops", "Once the initial cleanup is done, infrastructure keeps changing, and optimization has to keep pace with it. Zolix continues monitoring usage, spend, and configuration drift on an ongoing basis.", RefreshCw],
] as const;

const findings = [
  ["Configuration Drift", "The gradual gap between what your infrastructure was intended to look like and what it's actually become - accounts, subscriptions, and services that have quietly diverged from their original setup over time.", GitCompare],
  ["Idle and Orphaned Resources", "Unused compute, unattached storage volumes, and services nobody remembers provisioning, all still generating a bill every month regardless of whether anyone's using them.", HardDrive],
  ["Rightsizing Opportunities", "Resources sized for a load they no longer carry - either over-provisioned well past actual need, or under-provisioned in a way that's quietly hurting performance under peak conditions.", Gauge],
  ["Ownership Gaps", "Infrastructure with no clear owner tends to be the infrastructure nobody optimizes, because there's no one whose job it is to notice. Zolix surfaces these ownership gaps directly.", Users],
  ["Security Posture Weaknesses", "The same drift that creates cost waste often creates security exposure - permissions that outlived their purpose, resources exposed more broadly than intended. Zolix flags these alongside cost findings.", ShieldAlert],
] as const;

function Button({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  const className = `group inline-flex items-center gap-3 rounded-full px-7 py-4 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors ${light ? "bg-white text-zolix-dark hover:bg-zolix-orange hover:text-white" : "bg-zolix-dark text-white hover:bg-zolix-orange"}`;
  const content = <>{children}<ArrowRight size={15} strokeWidth={3} className="transition-transform duration-200 group-hover:translate-x-1" /></>;
  return href.startsWith("http") ? <a href={href} target="_blank" rel="noreferrer" className={className}>{content}</a> : <Link href={href} className={className}>{content}</Link>;
}

const reveal = { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.18 } };

export default function CloudInfrastructureOptimization({ faqs, breadcrumbs }: { faqs: FaqItem[]; breadcrumbs: ReactNode }) {
  return <>
    <section data-nav-theme="beige" className="relative overflow-hidden bg-zolix-beige px-6 pb-20 pt-40 md:pb-28">
      <div className="absolute -right-24 top-10 h-[34rem] w-[34rem] rounded-full border border-zolix-orange/15" />
      <div className="absolute right-32 top-48 h-60 w-60 rounded-full bg-zolix-orange/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        {breadcrumbs}
        <div className="grid gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-7 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">Technology / Cloud Infrastructure Optimization</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="max-w-3xl text-5xl font-extrabold leading-[.94] tracking-[-0.06em] text-zolix-dark md:text-7xl">Cloud Cost Optimization Solutions for Cloud Infrastructure</motion.h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-zolix-dark/60 md:text-xl">An Azure subscription here, an AWS account there, a service someone spun up two years ago that&apos;s still running and nobody&apos;s quite sure who owns it anymore. Zolix exists to find exactly where that gap is - and unlike most infrastructure optimization services, it does it continuously, not as a one-time engagement.</motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-10 flex flex-wrap gap-4"><Button href="/demo">Book a Demo</Button></motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, delay: 0.1 }} className="relative mx-auto w-full max-w-lg rounded-[2rem] border border-zolix-dark/10 bg-white/70 p-6 shadow-[0_24px_70px_rgba(26,26,26,0.08)] backdrop-blur-sm md:p-8">
            <div className="flex items-center justify-between border-b border-zolix-dark/10 pb-5 text-[9px] font-bold uppercase tracking-[0.18em]"><span className="text-zolix-dark/45">Configuration drift</span><span className="flex items-center gap-2 text-zolix-orange"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zolix-orange" />Continuous</span></div>
            <div className="mt-7 space-y-3">
              {[["Idle resources", "Orphaned & unattached storage", HardDrive], ["Rightsizing gaps", "Over- and under-provisioned", Gauge], ["Ownership gaps", "No clear owner assigned", Users]].map(([title, label, Icon], index) => {
                const NodeIcon = Icon as typeof HardDrive;
                return <motion.div key={title as string} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.32 + index * 0.1 }} className="relative flex items-center gap-4 rounded-2xl bg-zolix-beige/70 p-4"><span className="relative z-10 grid h-7 w-7 place-items-center rounded-full bg-zolix-dark text-white"><NodeIcon size={13} /></span><div><p className="text-sm font-bold text-zolix-dark">{title as string}</p><p className="mt-0.5 text-xs font-medium text-zolix-dark/45">{label as string}</p></div><span className="ml-auto text-[9px] font-bold uppercase tracking-wider text-zolix-orange">Flagged</span></motion.div>;
              })}
            </div>
            <p className="mt-7 border-t border-zolix-dark/10 pt-5 text-sm font-medium leading-relaxed text-zolix-dark/50">Roughly a quarter to a third of cloud spend typically goes toward unused or oversized resources.</p>
          </motion.div>
        </div>
      </div>
    </section>

    <section data-nav-theme="light" className="bg-white px-6 py-24 md:py-32"><div className="mx-auto max-w-5xl"><p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">The Cost of Infrastructure Nobody&apos;s Watching Closely</p><p className="text-2xl font-medium leading-relaxed tracking-tight text-zolix-dark md:text-3xl">Industry cost-benchmarking research consistently points to roughly a quarter to a third of cloud spend going toward unused or oversized resources - for a team spending $10,000 a month on infrastructure, that&apos;s on the order of $2,500 to $3,000 evaporating monthly, or upward of $30,000 a year that could otherwise be funding actual growth.</p><p className="mt-8 text-lg font-medium leading-relaxed text-zolix-dark/55">And that&apos;s just the cost dimension. The same drift that wastes budget also tends to degrade performance and quietly widen security gaps, because all three problems usually come from the same root cause: infrastructure that changes faster than anyone&apos;s actively reviewing it.</p></div></section>

    <section data-nav-theme="beige" className="bg-zolix-beige px-6 py-24 md:py-32"><div className="mx-auto max-w-7xl"><div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">How Zolix Approaches Infrastructure Optimization</p><h2 className="text-4xl font-bold leading-none tracking-[-0.05em] text-zolix-dark md:text-6xl">A practical path to lasting control</h2></div></div><div className="grid gap-10 md:grid-cols-4">{approach.map(([number, title, desc, Icon], index) => <motion.article key={number} {...reveal} transition={{ delay: index * 0.08 }}><span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-zolix-orange"><Icon size={20} /></span><p className="mt-6 text-sm font-bold tracking-widest text-zolix-orange">{number}</p><div className="my-4 h-px bg-zolix-dark/15"><motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: index * 0.1 }} className="h-px bg-zolix-orange" /></div><h3 className="text-xl font-bold tracking-tight text-zolix-dark">{title}</h3><p className="mt-4 text-[15px] font-medium leading-relaxed text-zolix-dark/55">{desc}</p></motion.article>)}</div></div></section>

    <section data-nav-theme="light" className="bg-white px-6 py-24 md:py-32"><div className="mx-auto max-w-7xl"><div className="max-w-3xl"><p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">What Zolix Actually Looks For</p><h2 className="text-4xl font-bold leading-none tracking-[-0.05em] text-zolix-dark md:text-6xl">Cost, performance, and security - together</h2></div><div className="mt-16 grid gap-x-14 gap-y-10 md:grid-cols-2">{findings.map(([title, desc, Icon], index) => <motion.article key={title} {...reveal} transition={{ delay: (index % 2) * 0.06 }} className="group border-t border-zolix-dark/15 pt-6"><div className="flex items-start gap-5"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-zolix-beige text-zolix-orange transition-transform duration-300 group-hover:-translate-y-1"><Icon size={21} /></span><div><h3 className="text-xl font-bold tracking-tight text-zolix-dark">{title}</h3><p className="mt-3 text-[15px] font-medium leading-relaxed text-zolix-dark/55">{desc}</p></div></div></motion.article>)}</div></div></section>

    <section data-nav-theme="beige" className="bg-zolix-beige px-6 py-24 md:py-32"><div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[.75fr_1.25fr]"><div><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">Built to Keep Pace</p><RefreshCw size={34} className="mt-8 text-zolix-orange" /></div><p className="max-w-4xl text-2xl font-medium leading-relaxed tracking-tight text-zolix-dark md:text-4xl">Most infrastructure optimization engagements are structured as a project - an assessment, a report, an implementation phase, and then a return to business as usual until someone remembers to schedule the next review. Zolix is built as a continuous practice instead. Read-only monitoring runs in the background permanently, so new drift, new waste, and new risk get caught as they emerge, not discovered eighteen months later during the next scheduled audit.</p></div></section>

    <section data-nav-theme="dark" className="bg-zolix-dark px-6 py-20 text-white md:py-24"><div className="mx-auto max-w-7xl"><p className="mb-10 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">What teams see after connecting to Zolix</p><div className="grid gap-10 border-t border-white/15 pt-9 md:grid-cols-3"><div><p className="text-3xl font-extrabold tracking-[-0.06em] text-zolix-orange md:text-4xl">24 Hours</p><p className="mt-4 text-sm font-medium leading-relaxed text-white/60">to a first comprehensive infrastructure assessment across every connected account.</p></div><div><p className="text-3xl font-extrabold tracking-[-0.06em] text-zolix-orange md:text-4xl">Phased Recommendations</p><p className="mt-4 text-sm font-medium leading-relaxed text-white/60">ranked by impact and risk, so teams know what to act on first without being overwhelmed by a single massive list.</p></div><div><p className="text-3xl font-extrabold tracking-[-0.06em] text-zolix-orange md:text-4xl">Zero Write Access</p><p className="mt-4 text-sm font-medium leading-relaxed text-white/60">Zolix operates entirely read-only, with no changes made to your infrastructure without explicit approval.</p></div></div></div></section>

    <FAQ items={faqs} theme="beige" />

    <section data-nav-theme="dark" className="bg-zolix-dark px-6 py-20 text-white md:py-28"><div className="mx-auto max-w-5xl text-center"><ShieldCheck size={28} className="mx-auto text-zolix-orange" /><h2 className="mt-8 text-4xl font-bold leading-none tracking-[-0.05em] md:text-6xl">Find Out What Your Infrastructure Is Actually Costing You</h2><p className="mx-auto mt-7 max-w-2xl text-lg font-medium leading-relaxed text-white/60">Connect your accounts through read-only access and get a complete assessment of cost, performance, and security gaps - with a roadmap that starts with the changes that carry the least risk.</p><div className="mt-10 flex flex-wrap justify-center gap-4"><Button href="/demo" light>Book a Demo</Button></div></div></section>
  </>;
}
