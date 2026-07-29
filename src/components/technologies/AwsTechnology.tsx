"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, BarChart3, Boxes, Cpu, DollarSign, HardDrive, Layers3, PiggyBank, ShieldCheck, Timer, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import FAQ, { type FaqItem } from "@/components/FAQ";

const gaps = [
  ["Savings Plans and Reserved Instances vs. On-Demand Spend", "AWS lets you save up to 72% by committing to Savings Plans or Reserved Instances instead of running on-demand. Zolix continuously compares your actual usage against your current commitment coverage and flags the gap - instead of waiting for you to manually check Cost Explorer.", PiggyBank],
  ["Spot Instance Opportunities", "Fault-tolerant workloads can run at up to 90% off on EC2 Spot Instances, but figuring out which of your workloads are actually Spot-eligible takes manual review. Zolix identifies candidate workloads based on actual interruption tolerance, not a guess.", Zap],
  ["Rightsizing Across EC2, RDS, Lambda, and S3", "AWS Compute Optimizer gives generic sizing suggestions. Zolix goes further - cross-referencing EC2 instance types, RDS instance classes, Lambda memory allocation, and S3 storage tiers against your real workload behavior, so a rightsizing recommendation reflects how a resource is actually used, not just its category.", Layers3],
  ["Idle Resource Cleanup", "Unused EBS volumes, idle load balancers, and unassociated Elastic IPs quietly accumulate cost every month they go unnoticed. Zolix flags these automatically and continuously, rather than surfacing them once during an annual Trusted Advisor review.", HardDrive],
] as const;

const objectives = [
  ["01", "Precision Discovery", "Zero-agent scanning across EC2, RDS, Lambda, EBS, and S3 to find idle instances, unattached Elastic IPs, orphaned volumes, and over-provisioned databases - the same waste categories AWS Trusted Advisor flags, but tracked continuously instead of checked periodically."],
  ["02", "Architectural Rightsizing", "Matching EC2 instance families, RDS clusters, and Lambda memory allocations to actual demand patterns - not peak-provisioned guesses. Where AWS Compute Optimizer gives you a recommendation, Zolix evaluates and applies it against your live cost-performance tradeoffs."],
  ["03", "Commitment Optimization", "Modeling your real usage against Savings Plans, Reserved Instances, and Spot Instance eligibility to recommend the right purchase mix - capturing discounts up to 72% on committed usage and up to 90% on fault-tolerant workloads, without locking you into commitments that don't fit your growth curve."],
  ["04", "Continuous Governance", "Automated guardrails that keep AWS spend aligned with budget as your infrastructure scales, replacing one-time cleanup projects with an always-on control layer."],
] as const;

const useCases = [
  ["Reduce Cloud Costs", "Get the discount AWS already offers - Savings Plans and Reserved Instances across EC2, RDS, ElastiCache, OpenSearch, and DynamoDB - without manually building the commitment schedule. Zolix generates recommendations based on your actual historical usage and applies volume pricing logic automatically across linked accounts.", DollarSign],
  ["Pay Only for What You Use", "Stop paying for compute during hours nobody's using it. Where AWS gives you Instance Scheduler and Auto Scaling as tools you have to configure, Zolix identifies which EC2 and RDS instances are sitting idle outside business hours and which Load Balancers and Elastic IPs are unassociated - then hands you the specific list, ranked by savings.", Timer],
  ["Rightsize Workloads", "Get Graviton migration recommendations, EC2 and Lambda rightsizing, and S3 storage tier optimization - all cross-checked against your actual usage rather than AWS's generic instance-family guidance. Graviton-powered instances alone can deliver up to 40% better price performance over comparable x86 instances.", Cpu],
  ["Modernize Cloud Architecture", "Serverless and microservice architectures - Lambda, Fargate, Aurora Serverless - cut cost by scaling to zero when idle, but migrating to them is an architectural decision, not a switch you flip. Zolix highlights which of your current workloads would benefit most from a serverless or modular redesign.", Boxes],
] as const;

const capabilities = [
  ["Commitment Coverage Monitoring", "Continuous tracking of Savings Plan and Reserved Instance coverage against real usage, with automatic flagging when coverage drifts out of alignment.", BarChart3],
  ["Spot Eligibility Detection", "Automated identification of workloads suited to Spot capacity, based on actual fault tolerance rather than manual assessment.", Zap],
  ["Cross-Service Rightsizing", "Recommendations spanning EC2, RDS, Lambda, and S3, built from real utilization data rather than category-based defaults.", Layers3],
  ["Continuous Idle Resource Scanning", "Ongoing detection of unused EBS volumes, idle load balancers, and unassociated Elastic IPs, flagged as they occur.", HardDrive],
  ["Graviton Migration Scoring", "Workload-level scoring for Graviton migration candidates, based on actual compute characteristics.", Cpu],
] as const;

const roadmap = [
  "Zero-agent discovery & telemetry ingestion - Connect to AWS Cost and Usage Reports and CloudWatch without deploying agents on your infrastructure.",
  "AI-driven anomaly detection baseline - Establish a usage baseline across EC2, RDS, Lambda, and S3 to catch cost spikes before they hit the bill.",
  "Automated remediation policy rollout - Apply rightsizing, idle-resource cleanup, and commitment recommendations with policy-based guardrails.",
  "Continuous governance & reporting - Ongoing tracking as usage scales, with reporting that ties savings back to specific workloads and teams.",
] as const;

function Button({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  const className = `group inline-flex items-center gap-3 rounded-full px-7 py-4 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors ${light ? "bg-white text-zolix-dark hover:bg-zolix-orange hover:text-white" : "bg-zolix-dark text-white hover:bg-zolix-orange"}`;
  const content = <>{children}<ArrowRight size={15} strokeWidth={3} className="transition-transform duration-200 group-hover:translate-x-1" /></>;
  return href.startsWith("http") ? <a href={href} target="_blank" rel="noreferrer" className={className}>{content}</a> : <Link href={href} className={className}>{content}</Link>;
}

const reveal = { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.18 } };

export default function AwsTechnology({ faqs, breadcrumbs }: { faqs: FaqItem[]; breadcrumbs: ReactNode }) {
  return <>
    <section data-nav-theme="beige" className="relative overflow-hidden bg-zolix-beige px-6 pb-20 pt-40 md:pb-28">
      <div className="absolute -right-24 top-10 h-[34rem] w-[34rem] rounded-full border border-zolix-orange/15" />
      <div className="absolute right-32 top-48 h-60 w-60 rounded-full bg-zolix-orange/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        {breadcrumbs}
        <div className="grid gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-7 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">Technology / AWS</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="max-w-3xl text-5xl font-extrabold leading-[.94] tracking-[-0.06em] text-zolix-dark md:text-7xl">Cloud Cost Optimization Solutions for AWS</motion.h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-zolix-dark/60 md:text-xl">Get the most out of your AWS spend - without manually configuring Savings Plans, tracking Spot capacity, or building your own rightsizing spreadsheet.</motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-10 flex flex-wrap gap-4"><Button href="https://lite.zolix.ai/signup">Get Started</Button><Button href="/demo" light>See It In Action</Button></motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, delay: 0.1 }} className="relative mx-auto min-h-[31rem] w-full max-w-lg overflow-hidden rounded-[2rem] bg-zolix-dark shadow-[0_28px_80px_rgba(155,85,0,.24)]">
            <Image src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85" alt="Server infrastructure representing AWS cloud workloads" fill priority sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-zolix-dark via-zolix-dark/35 to-transparent" />
            <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-zolix-dark/65 px-3 py-2 text-[9px] font-bold uppercase tracking-[.16em] text-white backdrop-blur-md">AWS cloud optimization</div>
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-zolix-dark/85 p-5 backdrop-blur-md"><p className="text-[9px] font-bold uppercase tracking-[.16em] text-zolix-orange">Continuous control</p><p className="mt-3 max-w-sm text-sm font-medium leading-relaxed text-white/75">Turn changing infrastructure into a clearer, more disciplined cost picture.</p></div>
            <a href="https://unsplash.com/license" target="_blank" rel="noreferrer" className="absolute bottom-1.5 right-3 text-[7px] font-medium text-white/55 underline-offset-2 hover:text-white hover:underline">Photo licensed via Unsplash</a>
          </motion.div>
        </div>
        <div className="mt-16 grid gap-3 border-t border-zolix-dark/10 pt-6 sm:grid-cols-3"><p className="flex items-center gap-3 text-xs font-bold text-zolix-dark/65"><ShieldCheck size={16} className="text-zolix-orange" />Read-only IAM roles</p><p className="flex items-center gap-3 text-xs font-bold text-zolix-dark/65"><BarChart3 size={16} className="text-zolix-orange" />Cross-service telemetry</p><p className="flex items-center gap-3 text-xs font-bold text-zolix-dark/65"><Zap size={16} className="text-zolix-orange" />Automated remediation</p></div>
      </div>
    </section>

    <section data-nav-theme="light" className="bg-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">Executive Summary</p>
        <p className="text-2xl font-medium leading-relaxed tracking-tight text-zolix-dark md:text-3xl">Running workloads on AWS gives you flexibility, but that same flexibility makes overspending easy to miss. Between idle EC2 instances, underused Reserved Instances, unoptimized storage tiers, and Savings Plans that never quite match real usage, most AWS accounts carry 20-30% in avoidable waste. Zolix&apos;s C2O engine continuously analyzes your AWS telemetry - compute, storage, database, and networking - to surface savings AWS&apos;s own dashboards won&apos;t show you, and acts on them automatically instead of leaving it to manual review.</p>
        <div className="mt-10 flex items-center gap-5 border-t border-zolix-dark/10 pt-10">
          <p className="text-4xl font-extrabold tracking-[-0.06em] text-zolix-orange">18%</p>
          <p className="max-w-md text-sm font-medium leading-relaxed text-zolix-dark/55">average improvement in resource utilization density within the first optimization cycle - the economic impact of closing the gap between AWS&apos;s native tools.</p>
        </div>
      </div>
    </section>

    <section data-nav-theme="beige" className="bg-zolix-beige px-6 py-24 md:py-32"><div className="mx-auto max-w-7xl"><div className="grid gap-12 lg:grid-cols-2 lg:items-start"><div><h2 className="text-4xl font-bold leading-[1.05] tracking-[-0.05em] text-zolix-dark md:text-6xl">What Zolix Finds That Native AWS Tools Don&apos;t Flag Automatically</h2><p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-zolix-dark/55">AWS gives you an enormous range of pricing levers - Savings Plans, Reserved Instances, Spot Instances, Graviton, volume discounts. The catch is that using them well means someone has to manually track usage and keep revisiting the decision as workloads change. Zolix automates that entire loop.</p><div className="mt-8"><Button href="https://lite.zolix.ai/signup">Get Started</Button></div></div><motion.div {...reveal} className="relative min-h-[26rem] overflow-hidden rounded-2xl bg-zolix-dark shadow-[0_18px_45px_rgba(155,85,0,.16)]"><Image src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85" alt="Circuit board representing AWS cloud infrastructure" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-zolix-dark/90 via-zolix-dark/35 to-transparent" /><div className="absolute inset-x-5 bottom-5 flex items-end justify-between"><span className="rounded-full border border-white/20 bg-zolix-dark/55 px-3 py-2 text-[9px] font-bold uppercase tracking-[.16em] text-white backdrop-blur-md">AWS cost intelligence</span><a href="https://unsplash.com/license" target="_blank" rel="noreferrer" className="text-[7px] font-medium text-white/60 underline-offset-2 hover:text-white hover:underline">Photo licensed via Unsplash</a></div></motion.div></div><div className="mt-20 divide-y divide-zolix-dark/10 md:mt-28">{gaps.map(([title, desc, Icon], index) => <motion.article key={title} {...reveal} transition={{ delay: index * 0.04 }} className="group flex items-center gap-6 rounded-2xl px-4 py-8 transition-all duration-300 hover:bg-white/70 md:gap-8 md:px-6 md:py-10"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-zolix-orange transition-transform duration-300 group-hover:-translate-y-0.5"><Icon size={20} /></span><div className="flex-1"><h3 className="text-xl font-bold tracking-tight text-zolix-dark md:text-2xl">{title}</h3><p className="mt-4 max-w-2xl text-[15px] font-medium leading-relaxed text-zolix-dark/55">{desc}</p></div><ArrowRight size={18} className="hidden shrink-0 text-zolix-orange opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 md:block" /></motion.article>)}</div><div className="mt-16 rounded-3xl bg-zolix-dark px-8 py-14 text-center text-white md:px-16 md:py-16"><h3 className="text-3xl font-bold leading-none tracking-[-0.05em] md:text-5xl">Ready to Put These AWS Pricing Levers to Work?</h3><div className="mt-8 flex flex-wrap justify-center gap-4"><Button href="https://lite.zolix.ai/signup" light>Get Started</Button><Button href="/demo" light>Book a Demo</Button></div></div></div></section>

    <section data-nav-theme="light" className="bg-white px-6 py-24 md:py-32"><div className="mx-auto max-w-7xl"><div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">Strategic Objectives</p><h2 className="text-4xl font-bold leading-none tracking-[-0.05em] text-zolix-dark md:text-6xl">How Zolix approaches AWS spend</h2></div><p className="max-w-sm text-base font-medium leading-relaxed text-zolix-dark/55">Four objectives that replace one-time cleanup projects with an always-on control layer.</p></div><div className="grid gap-10 md:grid-cols-4">{objectives.map(([number, title, desc], index) => <motion.article key={number} {...reveal} transition={{ delay: index * 0.08 }}><p className="text-sm font-bold tracking-widest text-zolix-orange">{number}</p><div className="my-6 h-px bg-zolix-dark/15"><motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: index * 0.1 }} className="h-px bg-zolix-orange" /></div><h3 className="text-xl font-bold tracking-tight text-zolix-dark">{title}</h3><p className="mt-4 text-[15px] font-medium leading-relaxed text-zolix-dark/55">{desc}</p></motion.article>)}</div></div></section>

    <section data-nav-theme="dark" className="bg-zolix-dark px-6 py-20 text-white md:py-28">
      <div className="mx-auto max-w-7xl">
        <p className="mb-10 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">Technical Architecture</p>
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange/80">The Zolix Advantage</p>
            <p className="mt-5 text-lg font-medium leading-relaxed text-white/60">Sovereign C2O 9B Parameter Model - a specialized neural architecture trained on AWS billing and usage telemetry (Cost and Usage Reports, CloudWatch metrics, Compute Optimizer signals) to detect optimization opportunities AWS&apos;s native tools surface individually but never correlate. Where Cost Explorer, Trusted Advisor, and Compute Optimizer each solve one piece - visibility, rightsizing, or purchase planning - Zolix unifies all three into a single automated recommendation engine.</p>
            <div className="mt-10 inline-block rounded-3xl border border-white/10 bg-white/5 p-8"><p className="text-4xl font-bold text-white">18%+</p><p className="mt-2 text-[9px] font-bold uppercase tracking-widest text-white/40">Targeted improvement in resource utilization density, compounding further with Savings Plans and Spot automation</p></div>
          </div>
          <div className="space-y-4">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">Implementation Roadmap</p>
            {roadmap.map((step) => <div key={step} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"><span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-zolix-orange" /><span className="text-sm font-medium leading-relaxed text-white/75">{step}</span></div>)}
          </div>
        </div>
      </div>
    </section>

    <section data-nav-theme="beige" className="bg-zolix-beige px-6 py-24 md:py-32"><div className="mx-auto max-w-7xl"><div className="max-w-3xl"><p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">Use Cases</p><h2 className="text-4xl font-bold leading-none tracking-[-0.05em] text-zolix-dark md:text-6xl">Put AWS pricing levers to work automatically</h2></div><div className="mt-16 grid gap-x-14 gap-y-10 md:grid-cols-2">{useCases.map(([title, desc, Icon], index) => <motion.article key={title} {...reveal} transition={{ delay: (index % 2) * 0.06 }} className="group border-t border-zolix-dark/15 pt-6"><div className="flex items-start gap-5"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-zolix-orange transition-transform duration-300 group-hover:-translate-y-1"><Icon size={21} /></span><div><h3 className="text-xl font-bold tracking-tight text-zolix-dark">{title}</h3><p className="mt-3 text-[15px] font-medium leading-relaxed text-zolix-dark/55">{desc}</p></div></div></motion.article>)}</div></div></section>

    <section data-nav-theme="light" className="bg-white px-6 py-24 md:py-32"><div className="mx-auto max-w-7xl"><div className="max-w-3xl"><p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">Zolix Capabilities for AWS</p><h2 className="text-4xl font-bold leading-none tracking-[-0.05em] text-zolix-dark md:text-6xl">Purpose-built for how AWS actually prices things</h2></div><div className="mt-16 grid gap-x-14 gap-y-10 md:grid-cols-2">{capabilities.map(([title, desc, Icon], index) => <motion.article key={title} {...reveal} transition={{ delay: (index % 2) * 0.06 }} className="group border-t border-zolix-dark/15 pt-6"><div className="flex items-start gap-5"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-zolix-beige text-zolix-orange transition-transform duration-300 group-hover:-translate-y-1"><Icon size={21} /></span><div><h3 className="text-xl font-bold tracking-tight text-zolix-dark">{title}</h3><p className="mt-3 text-[15px] font-medium leading-relaxed text-zolix-dark/55">{desc}</p></div></div></motion.article>)}</div></div></section>

    <section data-nav-theme="dark" className="bg-zolix-dark px-6 py-20 text-white md:py-24"><div className="mx-auto max-w-7xl"><p className="mb-10 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">What teams see after connecting AWS to Zolix</p><div className="grid gap-10 border-t border-white/15 pt-9 md:grid-cols-3"><div><p className="text-3xl font-extrabold tracking-[-0.06em] text-zolix-orange md:text-4xl">24 Hours</p><p className="mt-4 text-sm font-medium leading-relaxed text-white/60">to a first cost visibility report across every linked account.</p></div><div><p className="text-3xl font-extrabold tracking-[-0.06em] text-zolix-orange md:text-4xl">Automated Detection</p><p className="mt-4 text-sm font-medium leading-relaxed text-white/60">where AWS&apos;s native tools require manual configuration - Savings Plans, Spot eligibility, and Reserved Instance commitments all get evaluated and recommended automatically.</p></div><div><p className="text-3xl font-extrabold tracking-[-0.06em] text-zolix-orange md:text-4xl">Zero Write Access</p><p className="mt-4 text-sm font-medium leading-relaxed text-white/60">during setup or ongoing monitoring. Zolix connects through read-only IAM roles, following AWS&apos;s own recommended security practices.</p></div></div></div></section>

    <FAQ items={faqs} theme="beige" />

    <section data-nav-theme="dark" className="bg-zolix-dark px-6 py-20 text-white md:py-28"><div className="mx-auto max-w-5xl text-center"><BadgeCheck size={28} className="mx-auto text-zolix-orange" /><h2 className="mt-8 text-4xl font-bold leading-none tracking-[-0.05em] md:text-6xl">Start Optimizing Your AWS Spend, Automatically</h2><p className="mx-auto mt-7 max-w-2xl text-lg font-medium leading-relaxed text-white/60">Connect your AWS account through read-only access and let Zolix find the Savings Plans, Spot opportunities, and idle resources AWS&apos;s native tools would otherwise leave for you to find manually.</p><div className="mt-10 flex flex-wrap justify-center gap-4"><Button href="https://lite.zolix.ai/signup" light>Get Started</Button><Button href="/demo" light>Book a Demo</Button></div></div></section>
  </>;
}
