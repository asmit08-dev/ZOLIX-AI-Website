"use client";

import { motion } from "framer-motion";
import { ArrowRight, BarChart3, BrainCircuit, CalendarRange, CircleDollarSign, Eye, Gauge, Leaf, LineChart, RefreshCw, ServerCog, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import FAQ, { type FaqItem } from "@/components/FAQ";

const challenges = [
  ["Align Resource Provisioning With Your Needs", "Allocate cloud computing resources efficiently and prevent cloud waste through continuously observed usage, rather than static assumptions made at deployment time.", Gauge],
  ["Maximize Efficiency With Sustained Performance", "Maintain a high level of service while maximizing resource productivity and streamlining infrastructure expenditure through continuous, automated optimization.", Workflow],
  ["Control Your Cloud Costs", "Gain full visibility into cloud spending through advanced, real-time monitoring, tracking, and reporting—without agents or write access.", Eye],
  ["Design Resilient Cloud Infrastructure", "Use forecasting and safety margins to respond to changing demand without disruptive budget revisions.", ServerCog],
  ["Reallocate Budget Toward Innovation", "Recover spend lost to idle and over-provisioned infrastructure, freeing budget for initiatives that move the business forward.", Sparkles],
] as const;

const roadmap = [
  ["Evaluate Your Cloud Deployment", "Zolix performs a comprehensive, read-only assessment of your cloud infrastructure and systems to identify strengths, inefficiencies, and opportunities for improvement.", BarChart3],
  ["Assess Monitoring Capabilities", "We evaluate the tools, tagging practices, and visibility already present in your environment to see how well monitoring supports informed cost decisions.", Eye],
  ["Identify Optimization Opportunities", "Usage analysis produces a prioritized set of measures to reduce infrastructure costs without compromising performance.", BrainCircuit],
  ["Support Infrastructure Reconfiguration", "Detailed recommendations give your engineering team what it needs to implement configuration improvements consistently.", Workflow],
  ["Provide Ongoing Monitoring and Support", "Continuous monitoring keeps efficiency intact as your infrastructure and requirements evolve.", RefreshCw],
] as const;

const benefits = [
  ["Reduced Cloud Costs", "Achieve meaningful savings through flexible pricing models, appropriate Spot capacity, and demand-based provisioning instead of static, worst-case sizing.", CircleDollarSign],
  ["Improved Visibility and Observability", "Continuous automated monitoring surfaces opportunities that periodic, manual cost reviews leave invisible.", Eye],
  ["Optimized Cloud Resource Utilization", "Reduce cloud waste and maximize the efficiency of computing resources across operations.", Gauge],
  ["Enhanced Automation", "Zero-agent detection technology reduces manual review effort and shortens the time between finding waste and resolving it.", BrainCircuit],
  ["Consistent Cost Monitoring", "Real-time insight into resource consumption and cost supports informed decisions rather than retrospective ones.", LineChart],
  ["Effective Budget Forecasting", "A comprehensive view of spend enables more accurate prediction, planning, and proactive financial management.", CalendarRange],
  ["Enhanced Application Performance", "Optimized allocation supports availability and responsiveness alongside cost efficiency.", Workflow],
  ["Reduced Environmental Footprint", "Eliminating idle and over-provisioned infrastructure reduces unnecessary energy consumption.", Leaf],
] as const;

const reveal = { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.16 } };

function Button({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  const className = `group inline-flex items-center gap-3 rounded-full px-7 py-4 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors ${light ? "bg-white text-zolix-dark hover:bg-zolix-orange hover:text-white" : "bg-zolix-dark text-white hover:bg-zolix-orange"}`;
  const content = <>{children}<ArrowRight size={15} strokeWidth={3} className="transition-transform duration-200 group-hover:translate-x-1" /></>;
  return href.startsWith("http") ? <a href={href} target="_blank" rel="noreferrer" className={className}>{content}</a> : <Link href={href} className={className}>{content}</Link>;
}

export default function CloudCostOptimizationServices({ faqs, breadcrumbs }: { faqs: FaqItem[]; breadcrumbs: ReactNode }) {
  return <>
    <section data-nav-theme="beige" className="relative overflow-hidden bg-zolix-beige px-6 pb-20 pt-40 md:pb-28">
      <div className="absolute -right-24 top-8 h-[35rem] w-[35rem] rounded-full border border-zolix-orange/20" /><div className="absolute right-20 top-36 h-72 w-72 rounded-full bg-zolix-orange/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">{breadcrumbs}<div className="grid gap-14 lg:grid-cols-[1.08fr_.92fr] lg:items-center"><div><motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-7 text-[10px] font-bold uppercase tracking-[.22em] text-zolix-orange">Technology / Cloud Cost Optimization Services</motion.p><motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }} className="max-w-4xl text-4xl font-extrabold leading-[.96] tracking-[-.055em] text-zolix-dark md:text-6xl">Maximize the Efficiency of Your Cloud Environment With a Custom Cost Optimization Strategy</motion.h1><motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12 }} className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-zolix-dark/60 md:text-xl">Secure complete transparency into cloud infrastructure costs while maximizing the return on your cloud investment. Zolix delivers a custom, continuous optimization strategy built around your organization&apos;s actual usage.</motion.p><motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }} className="mt-10"><Button href="/demo">Book a Demo</Button></motion.div></div>
        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .65, delay: .1 }} className="mx-auto w-full max-w-lg rounded-[2rem] border border-zolix-dark/10 bg-white/75 p-6 shadow-[0_24px_70px_rgba(26,26,26,.08)] backdrop-blur-sm md:p-8"><div className="flex items-center justify-between border-b border-zolix-dark/10 pb-5 text-[9px] font-bold uppercase tracking-[.18em]"><span className="text-zolix-dark/45">Optimization engine</span><span className="flex items-center gap-2 text-zolix-orange"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zolix-orange" />Read-only</span></div><div className="mt-7 space-y-4">{[["Usage-based provisioning", "Continuously observed demand", "92%"], ["Idle resource detection", "Waste surfaced automatically", "Live"], ["Cost governance", "No agent or write access", "Safe"]].map(([label, detail, value], index) => <motion.div key={label} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .3 + index * .1 }} className="rounded-2xl bg-zolix-beige/70 p-4"><div className="flex justify-between gap-4"><div><p className="text-sm font-bold text-zolix-dark">{label}</p><p className="mt-1 text-xs font-medium text-zolix-dark/45">{detail}</p></div><span className="text-xs font-bold text-zolix-orange">{value}</span></div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-zolix-dark/10"><div className="h-full rounded-full bg-zolix-orange" style={{ width: `${72 + index * 10}%` }} /></div></motion.div>)}</div><p className="mt-6 text-sm font-medium leading-relaxed text-zolix-dark/50">Continuous, automated optimization keeps infrastructure available, responsive, and functional while reducing waste.</p></motion.div></div></div>
    </section>

    <section data-nav-theme="light" className="bg-white px-6 py-24 md:py-32"><div className="mx-auto max-w-5xl"><p className="mb-5 text-[10px] font-bold uppercase tracking-[.22em] text-zolix-orange">Cloud cost optimization, tailored to you</p><p className="text-2xl font-medium leading-relaxed tracking-tight text-zolix-dark md:text-3xl">Zolix creates a complete view of cloud spending and reveals opportunities to improve the efficiency and performance of your infrastructure. Our zero-agent architecture supports rational, usage-based provisioning at scale—not one-time recommendations based on yesterday&apos;s environment.</p></div></section>

    <section data-nav-theme="beige" className="bg-zolix-beige px-6 py-24 md:py-32"><div className="mx-auto max-w-7xl"><div className="max-w-3xl"><p className="mb-5 text-[10px] font-bold uppercase tracking-[.22em] text-zolix-orange">Challenges we solve</p><h2 className="text-4xl font-bold leading-none tracking-[-.05em] text-zolix-dark md:text-6xl">Make every cloud resource earn its place</h2></div><div className="mt-16 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">{challenges.map(([title, description, Icon], index) => <motion.article key={title} {...reveal} transition={{ delay: index * .06 }} className="border-t border-zolix-dark/15 pt-6"><span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-zolix-orange"><Icon size={21} /></span><h3 className="mt-6 text-xl font-bold tracking-tight text-zolix-dark">{title}</h3><p className="mt-3 text-[15px] font-medium leading-relaxed text-zolix-dark/55">{description}</p></motion.article>)}</div></div></section>

    <section data-nav-theme="light" className="bg-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <header className="max-w-3xl">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[.22em] text-zolix-orange">Your Cloud Cost Optimization Roadmap</p>
          <h2 className="text-4xl font-bold leading-none tracking-[-.05em] text-zolix-dark md:text-6xl">Clear action from first assessment to continuous improvement</h2>
        </header>

        <ol className="mt-14 grid gap-4 lg:grid-cols-5">
          {roadmap.map(([title, description, Icon], index) => (
            <motion.li key={title} {...reveal} transition={{ delay: index * .06 }} className="group relative flex min-h-72 flex-col rounded-2xl border border-zolix-dark/10 bg-zolix-beige/45 p-6 transition-colors hover:border-zolix-orange/40 hover:bg-zolix-beige md:min-h-80">
              <div className="flex items-start justify-between gap-4">
                <span className="text-3xl font-extrabold tracking-[-.06em] text-zolix-orange">0{index + 1}</span>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-zolix-orange shadow-sm"><Icon size={19} /></span>
              </div>
              <div className="mt-auto pt-10">
                <h3 className="text-xl font-bold leading-tight tracking-tight text-zolix-dark">{title}</h3>
                <p className="mt-4 text-sm font-medium leading-relaxed text-zolix-dark/55">{description}</p>
              </div>
            </motion.li>
          ))}
        </ol>

        <div className="mt-12 border-t border-zolix-dark/10 pt-8"><Button href="/demo">Get Your Personalized Cost Re-Evaluation Plan</Button></div>
      </div>
    </section>

    <section data-nav-theme="dark" className="bg-zolix-dark px-6 py-24 text-white md:py-32"><div className="mx-auto max-w-7xl"><div className="max-w-3xl"><p className="mb-5 text-[10px] font-bold uppercase tracking-[.22em] text-zolix-orange">Benefits of Zolix</p><h2 className="text-4xl font-bold leading-none tracking-[-.05em] md:text-6xl">More value from every cloud decision</h2><p className="mt-7 text-lg font-medium leading-relaxed text-white/60">Accelerate innovation and stay competitive with continuous automated optimization that improves resource provisioning and decision-making across engineering and finance.</p></div><div className="mt-16 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-4">{benefits.map(([title, description, Icon], index) => <motion.article key={title} {...reveal} transition={{ delay: index * .04 }} className="border-t border-white/15 pt-6"><Icon size={21} className="text-zolix-orange" /><h3 className="mt-5 text-lg font-bold tracking-tight">{title}</h3><p className="mt-3 text-sm font-medium leading-relaxed text-white/55">{description}</p></motion.article>)}</div></div></section>

    <FAQ items={faqs} theme="beige" />

    <section data-nav-theme="dark" className="bg-zolix-dark px-6 py-20 text-white md:py-28"><div className="mx-auto max-w-5xl text-center"><ShieldCheck size={28} className="mx-auto text-zolix-orange" /><h2 className="mt-8 text-4xl font-bold leading-none tracking-[-.05em] md:text-6xl">Discover your cloud cost optimization opportunities</h2><p className="mx-auto mt-7 max-w-2xl text-lg font-medium leading-relaxed text-white/60">Get a personalized cloud re-evaluation plan from Zolix&apos;s cost optimization engine—read-only, zero-agent, and built to keep your infrastructure running exactly as it does today.</p><div className="mt-10"><Button href="/demo" light>Book a Demo</Button></div></div></section>
  </>;
}
