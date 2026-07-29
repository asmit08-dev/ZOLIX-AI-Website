"use client";

import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Boxes, Database, Eye, LayoutDashboard, PiggyBank, ShieldCheck, Sparkles, Tags } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import FAQ, { type FaqItem } from "@/components/FAQ";

const solution = [
  ["GCP Cost Monitoring", "See your Google Cloud spend alongside every other cloud you run, inside a single unified cost view, with full confidence in tracking accuracy regardless of how complex or fragmented your GCP environment is.", BarChart3],
  ["100% Cost Allocation, Without Manual Tagging", "Where most platforms require you to manually tag every resource to get accurate allocation, Zolix's zero-agent detection engine reads usage patterns directly and allocates spend by team, environment, or region automatically - without relabeling a single original resource.", Tags],
  ["GCP Cost Governance", "Financial planning and anomaly detection built specifically for GCP, giving you the insights needed to control cloud costs, maintain accountability across teams, and keep spend optimized as your environment scales.", ShieldCheck],
  ["GCP FinOps Dashboards & Reporting", "Build custom dashboards with cost, usage, budget, and waste widgets tailored to any team or use case across your organization. Monitor GCP services and make infrastructure decisions based on current data, not a monthly export.", LayoutDashboard],
  ["GCP Saving Recommendations, Powered by Costguard", "Zolix's Costguard engine identifies savings through rightsizing, idle resource detection, and commitment recommendations - centralizing every optimization opportunity across tags, teams, and environments, so savings start showing up from the first week.", Sparkles],
] as const;

const pricingLevers = [
  ["Committed Use Discounts (CUDs)", "GCP's version of a reserved-capacity discount - commit to a usage level for one or three years and save significantly compared to on-demand. Zolix tracks your current CUD coverage against real usage and flags where additional commitment would pay off, the same way it evaluates Savings Plans on AWS.", PiggyBank],
  ["BigQuery Cost Optimization", "For most GCP-heavy organizations, BigQuery is one of the largest and least predictable line items on the bill - driven by query volume and data scanned rather than a fixed instance size. Zolix tracks BigQuery spend separately and flags queries or datasets driving disproportionate cost.", Database],
  ["GKE Idle Capacity Detection", "Google Kubernetes Engine clusters frequently run with node pools sized for peak load that sit underutilized the rest of the time. Zolix identifies idle GKE capacity and flags rightsizing opportunities at the node pool level, not just the cluster level.", Boxes],
  ["Sustained Use Discount Visibility", "GCP automatically applies Sustained Use Discounts based on how long a resource runs within a billing month - but most teams have no visibility into how much of that discount they're actually capturing. Zolix surfaces this automatically.", Eye],
] as const;

function Button({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  const className = `group inline-flex items-center gap-3 rounded-full px-7 py-4 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors ${light ? "bg-white text-zolix-dark hover:bg-zolix-orange hover:text-white" : "bg-zolix-dark text-white hover:bg-zolix-orange"}`;
  const content = <>{children}<ArrowRight size={15} strokeWidth={3} className="transition-transform duration-200 group-hover:translate-x-1" /></>;
  return href.startsWith("http") ? <a href={href} target="_blank" rel="noreferrer" className={className}>{content}</a> : <Link href={href} className={className}>{content}</Link>;
}

const reveal = { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.18 } };

export default function GoogleCloudTechnology({ faqs, breadcrumbs }: { faqs: FaqItem[]; breadcrumbs: ReactNode }) {
  return <>
    <section data-nav-theme="beige" className="relative overflow-hidden bg-zolix-beige px-6 pb-20 pt-40 md:pb-28">
      <div className="absolute -right-24 top-10 h-[34rem] w-[34rem] rounded-full border border-zolix-orange/15" />
      <div className="absolute right-32 top-48 h-60 w-60 rounded-full bg-zolix-orange/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        {breadcrumbs}
        <div className="grid gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-7 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">Technology / Google Cloud</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="max-w-3xl text-5xl font-extrabold leading-[.94] tracking-[-0.06em] text-zolix-dark md:text-7xl">Cloud Cost Optimization Solutions for Google Cloud Platform</motion.h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-zolix-dark/60 md:text-xl">Get complete visibility into every dollar of GCP spend, allocated automatically - no manual tagging, no relabeling resources, no guesswork.</motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-10 flex flex-wrap gap-4"><Button href="/demo">Schedule a Demo</Button></motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, delay: 0.1 }} className="relative mx-auto w-full max-w-lg rounded-[2rem] border border-zolix-dark/10 bg-white/70 p-6 shadow-[0_24px_70px_rgba(26,26,26,0.08)] backdrop-blur-sm md:p-8">
            <div className="flex items-center justify-between border-b border-zolix-dark/10 pb-5 text-[9px] font-bold uppercase tracking-[0.18em]"><span className="text-zolix-dark/45">Allocation, without tagging</span><span className="flex items-center gap-2 text-zolix-orange"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zolix-orange" />Zero-agent</span></div>
            <div className="mt-7 space-y-3">
              {[["BigQuery", "Query volume & data scanned", Database], ["GKE clusters", "Node pool idle capacity", Boxes], ["CUDs & SUDs", "Commitment coverage tracking", PiggyBank]].map(([title, label, Icon], index) => {
                const NodeIcon = Icon as typeof Database;
                return <motion.div key={title as string} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.32 + index * 0.1 }} className="relative flex items-center gap-4 rounded-2xl bg-zolix-beige/70 p-4"><span className="relative z-10 grid h-7 w-7 place-items-center rounded-full bg-zolix-dark text-white"><NodeIcon size={13} /></span><div><p className="text-sm font-bold text-zolix-dark">{title as string}</p><p className="mt-0.5 text-xs font-medium text-zolix-dark/45">{label as string}</p></div><span className="ml-auto text-[9px] font-bold uppercase tracking-wider text-zolix-orange">Mapped</span></motion.div>;
              })}
            </div>
            <p className="mt-7 border-t border-zolix-dark/10 pt-5 text-sm font-medium leading-relaxed text-zolix-dark/50">100% of GCP spend allocated by team, environment, or region - without relabeling a single resource.</p>
          </motion.div>
        </div>
        <div className="mt-16 grid gap-3 border-t border-zolix-dark/10 pt-6 sm:grid-cols-3"><p className="flex items-center gap-3 text-xs font-bold text-zolix-dark/65"><ShieldCheck size={16} className="text-zolix-orange" />Read-only IAM roles</p><p className="flex items-center gap-3 text-xs font-bold text-zolix-dark/65"><Tags size={16} className="text-zolix-orange" />No manual tagging</p><p className="flex items-center gap-3 text-xs font-bold text-zolix-dark/65"><Sparkles size={16} className="text-zolix-orange" />Costguard recommendations</p></div>
      </div>
    </section>

    <section data-nav-theme="light" className="bg-white px-6 py-24 md:py-32"><div className="mx-auto max-w-7xl"><div className="max-w-3xl"><p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">Zolix&apos;s Google Cloud Solution</p><h2 className="text-4xl font-bold leading-none tracking-[-0.05em] text-zolix-dark md:text-6xl">A single, allocated view of GCP spend</h2></div><div className="mt-16 grid gap-x-14 gap-y-10 md:grid-cols-2">{solution.map(([title, desc, Icon], index) => <motion.article key={title} {...reveal} transition={{ delay: (index % 2) * 0.06 }} className="group border-t border-zolix-dark/15 pt-6"><div className="flex items-start gap-5"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-zolix-beige text-zolix-orange transition-transform duration-300 group-hover:-translate-y-1"><Icon size={21} /></span><div><h3 className="text-xl font-bold tracking-tight text-zolix-dark">{title}</h3><p className="mt-3 text-[15px] font-medium leading-relaxed text-zolix-dark/55">{desc}</p></div></div></motion.article>)}</div></div></section>

    <section data-nav-theme="beige" className="bg-zolix-beige px-6 py-24 md:py-32"><div className="mx-auto max-w-7xl"><div className="grid gap-12 lg:grid-cols-2 lg:items-start"><div><h2 className="text-4xl font-bold leading-[1.05] tracking-[-0.05em] text-zolix-dark md:text-6xl">Built for the Way GCP Actually Prices Things</h2><p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-zolix-dark/55">Google Cloud&apos;s pricing model has its own set of levers that don&apos;t map directly onto how AWS or Azure price compute - and a generic cost tool built primarily for one of those platforms tends to miss what matters most on GCP.</p><div className="mt-8"><Button href="/demo">Schedule a Demo</Button></div></div><motion.div {...reveal} className="relative min-h-[26rem] overflow-hidden rounded-2xl bg-zolix-dark shadow-[0_18px_45px_rgba(0,120,212,.16)]"><Image src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=85" alt="Digital infrastructure representing Google Cloud workloads" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-zolix-dark/90 via-zolix-dark/35 to-transparent" /><div className="absolute inset-x-5 bottom-5 flex items-end justify-between"><span className="rounded-full border border-white/20 bg-zolix-dark/55 px-3 py-2 text-[9px] font-bold uppercase tracking-[.16em] text-white backdrop-blur-md">GCP cost intelligence</span><a href="https://unsplash.com/license" target="_blank" rel="noreferrer" className="text-[7px] font-medium text-white/60 underline-offset-2 hover:text-white hover:underline">Photo licensed via Unsplash</a></div></motion.div></div><div className="mt-20 divide-y divide-zolix-dark/10 md:mt-28">{pricingLevers.map(([title, desc, Icon], index) => <motion.article key={title} {...reveal} transition={{ delay: index * 0.04 }} className="group flex items-center gap-6 rounded-2xl px-4 py-8 transition-all duration-300 hover:bg-white/70 md:gap-8 md:px-6 md:py-10"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-zolix-orange transition-transform duration-300 group-hover:-translate-y-0.5"><Icon size={20} /></span><div className="flex-1"><h3 className="text-xl font-bold tracking-tight text-zolix-dark md:text-2xl">{title}</h3><p className="mt-4 max-w-2xl text-[15px] font-medium leading-relaxed text-zolix-dark/55">{desc}</p></div><ArrowRight size={18} className="hidden shrink-0 text-zolix-orange opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 md:block" /></motion.article>)}</div><div className="mt-16 rounded-3xl bg-zolix-dark px-8 py-14 text-center text-white md:px-16 md:py-16"><h3 className="text-3xl font-bold leading-none tracking-[-0.05em] md:text-5xl">Ready to Bring This Level of Control to Your GCP Spend?</h3><div className="mt-8 flex flex-wrap justify-center gap-4"><Button href="/demo" light>Talk to Us</Button></div></div></div></section>

    <section data-nav-theme="dark" className="bg-zolix-dark px-6 py-20 text-white md:py-24"><div className="mx-auto max-w-7xl"><p className="mb-10 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">What teams see after connecting GCP to Zolix</p><div className="grid gap-10 border-t border-white/15 pt-9 md:grid-cols-3"><div><p className="text-3xl font-extrabold tracking-[-0.06em] text-zolix-orange md:text-4xl">100% Allocation</p><p className="mt-4 text-sm font-medium leading-relaxed text-white/60">Accuracy - every dollar of GCP spend mapped to a team, environment, or region, without manual tagging overhead.</p></div><div><p className="text-3xl font-extrabold tracking-[-0.06em] text-zolix-orange md:text-4xl">24 Hours</p><p className="mt-4 text-sm font-medium leading-relaxed text-white/60">to a first cost visibility report across every connected GCP project.</p></div><div><p className="text-3xl font-extrabold tracking-[-0.06em] text-zolix-orange md:text-4xl">Zero Agents</p><p className="mt-4 text-sm font-medium leading-relaxed text-white/60">Zero write access - Zolix connects through read-only IAM roles, following Google Cloud&apos;s own recommended security practices.</p></div></div></div></section>

    <FAQ items={faqs} theme="beige" />

    <section data-nav-theme="dark" className="bg-zolix-dark px-6 py-20 text-white md:py-28"><div className="mx-auto max-w-5xl text-center"><ShieldCheck size={28} className="mx-auto text-zolix-orange" /><h2 className="mt-8 text-4xl font-bold leading-none tracking-[-0.05em] md:text-6xl">Struggling to Adopt FinOps for Your GCP Environment?</h2><p className="mx-auto mt-7 max-w-2xl text-lg font-medium leading-relaxed text-white/60">Start managing and reducing GCP spend without adding a single line of code, relabeling a resource, or granting write access.</p><div className="mt-10 flex flex-wrap justify-center gap-4"><Button href="/demo" light>Talk to Us</Button></div></div></section>
  </>;
}
