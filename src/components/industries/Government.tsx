"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileCheck2, Landmark, LockKeyhole, Network, Scale, Waypoints } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import FAQ from "@/components/FAQ";
import EmailComposeLink from "@/components/EmailComposeLink";
import { GOVERNMENT_FAQ } from "./faqs";
import { INDUSTRY_H1 } from "./headings";
import type { IndustryProps } from "@/components/PageSections";

const patterns = [
  ["01", "Initiatives that outlive their environments", "Development and testing environments are frequently provisioned for a specific initiative and left running well past its conclusion. Across government cloud accounts, this remains one of the most consistent sources of recoverable spend."],
  ["02", "Capacity without a shared baseline", "Where multiple contractor teams provision infrastructure independently, capacity is often sized conservatively at the outset and rarely revisited once actual usage patterns become clear."],
  ["03", "Forecasting that arrives after decisions", "Budget cycles in government are fixed, but most cost forecasting updates only at the end of a reporting period. This gap leaves budget owners with less room to act before funds are already committed."],
  ["04", "Accountability rebuilt by hand", "When a chargeback or accountability request arrives, the mapping between cloud spend and the responsible program or contractor team is often reconstructed manually, after the fact, rather than maintained continuously."],
] as const;

const responses = [
  ["Governance", "Cost accountability is structured around how agencies actually operate - by system, program, and contractor team - rather than by cloud account alone.", Landmark],
  ["Read-only monitoring", "Zolix requires no agents and no IAM write access. Monitoring operates entirely within existing security controls, without requesting new exceptions.", LockKeyhole],
  ["Forecasting", "Spend forecasts update continuously and are structured to align with fixed government budget cycles, rather than generic monthly reporting.", Waypoints],
] as const;

function Button({ href, children, outline = false }: { href: string; children: ReactNode; outline?: boolean }) {
  const className = `group inline-flex items-center gap-3 rounded-full px-7 py-4 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors ${outline ? "border border-white/25 text-white hover:border-zolix-orange hover:bg-zolix-orange" : "bg-white text-zolix-dark hover:bg-zolix-orange hover:text-white"}`;
  const content = <>{children}<ArrowRight size={15} strokeWidth={3} className="transition-transform group-hover:translate-x-1" /></>;
  return href.startsWith("mailto:") ? <EmailComposeLink className={className}>{content}</EmailComposeLink> : <Link href={href} className={className}>{content}</Link>;
}

const reveal = { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.18 } };

export default function Government({ breadcrumbs }: IndustryProps) {
  return <>
    <section data-nav-theme="dark" className="relative overflow-hidden bg-zolix-dark px-6 pb-24 pt-40 text-white md:pb-32">
      <div className="absolute -right-36 -top-40 h-[44rem] w-[44rem] rounded-full border border-white/[0.07]" />
      <div className="absolute -right-8 top-28 h-[31rem] w-[31rem] rounded-full border border-zolix-orange/20" />
      <div className="relative mx-auto max-w-7xl">
        {breadcrumbs}
        <div className="grid gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-7 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">Industry solutions / Government</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="max-w-3xl text-5xl font-extrabold leading-[.94] tracking-[-0.06em] md:text-7xl">{INDUSTRY_H1.government}</motion.h1>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="mt-9 max-w-2xl border-l border-zolix-orange pl-5"><p className="text-lg font-medium leading-relaxed text-white/65">Government agencies operate cloud infrastructure across multiple contractor teams, procurement cycles, and funding sources. As the number of these layers grows, so does the difficulty of tracing a dollar of cloud spend back to the program or system it belongs to. This brief outlines where that difficulty typically originates, and how Zolix addresses it without requiring new access to sensitive environments.</p></motion.div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-10 flex flex-wrap gap-4"><Button href="/demo">Book a Demo</Button><Button href="mailto:support@zolix.ai" outline>Contact Us</Button></motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.12 }} className="relative mx-auto w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-sm md:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-5"><p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/45">Accountability ledger</p><span className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-wider text-zolix-orange"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zolix-orange" />Verified</span></div>
            <div className="relative mt-7 space-y-3 before:absolute before:bottom-8 before:left-[1.45rem] before:top-8 before:w-px before:bg-zolix-orange/45">
              {[["Program", "Digital services", "A-104"], ["System", "Citizen platform", "SYS-268"], ["Contractor", "Operations team", "CTR-072"]].map(([label, name, reference], index) => <motion.div key={label} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + index * 0.1 }} className="relative flex items-center gap-4 rounded-xl border border-white/[0.07] bg-white/[0.035] p-4"><span className="relative z-10 h-3 w-3 rounded-full border-2 border-zolix-dark bg-zolix-orange" /><div><p className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/40">{label}</p><p className="mt-1 text-sm font-bold text-white">{name}</p></div><span className="ml-auto text-[10px] font-bold tracking-wider text-white/40">{reference}</span></motion.div>)}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-6"><div><p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/40">Access</p><p className="mt-2 text-sm font-bold">Read-only</p></div><div><p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/40">Traceability</p><p className="mt-2 text-sm font-bold">Continuous</p></div></div>
          </motion.div>
        </div>
      </div>
    </section>

    <section data-nav-theme="light" className="bg-white px-6 py-24 md:py-32"><div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[.75fr_1.25fr]"><div><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">The mandate</p><h2 className="mt-6 text-4xl font-bold leading-none tracking-[-0.05em] text-zolix-dark md:text-6xl">Cloud Spend Accountability</h2></div><p className="max-w-4xl text-2xl font-medium leading-relaxed tracking-tight text-zolix-dark/75 md:text-4xl">Government cloud spend must be explainable, auditable, and traceable to the program or system it serves.</p></div></section>

    <section data-nav-theme="beige" className="bg-zolix-beige px-6 py-24 md:py-32"><div className="mx-auto max-w-7xl"><div className="grid gap-8 border-b border-zolix-dark/10 pb-12 md:grid-cols-[.8fr_1.2fr] md:items-end"><h2 className="max-w-lg text-4xl font-bold leading-none tracking-[-0.05em] text-zolix-dark md:text-6xl">Observed Cost Patterns</h2><p className="max-w-2xl text-lg font-medium leading-relaxed text-zolix-dark/55">The issues tend to emerge at the seams: between teams, systems, reporting periods, and sources of funding.</p></div><div className="grid divide-y divide-zolix-dark/10 md:grid-cols-2 md:divide-x md:divide-y-0">{patterns.map(([number, title, desc], index) => <motion.article key={number} {...reveal} transition={{ delay: index * 0.05 }} className={`py-9 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}><p className="text-xs font-bold tracking-widest text-zolix-orange">{number}</p><h3 className="mt-8 text-2xl font-bold leading-tight tracking-tight text-zolix-dark">{title}</h3><p className="mt-4 text-[15px] font-medium leading-relaxed text-zolix-dark/55">{desc}</p></motion.article>)}</div></div></section>

    <section data-nav-theme="dark" className="bg-zolix-dark px-6 py-24 text-white md:py-32"><div className="mx-auto max-w-7xl"><div className="mb-16 max-w-3xl"><p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">Designed for public-sector accountability</p><h2 className="text-4xl font-bold leading-none tracking-[-0.05em] md:text-6xl">How Zolix Responds</h2></div><div className="grid gap-10 md:grid-cols-3">{responses.map(([title, desc, Icon], index) => <motion.article key={title} {...reveal} transition={{ delay: index * 0.08 }}><span className="grid h-12 w-12 place-items-center rounded-xl border border-white/15 text-zolix-orange"><Icon size={22} /></span><div className="my-7 h-px bg-white/15"><motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 0.75, delay: index * 0.12 }} className="h-px bg-zolix-orange" /></div><h3 className="text-2xl font-bold tracking-tight">{title}</h3><p className="mt-4 text-[15px] font-medium leading-relaxed text-white/55">{desc}</p></motion.article>)}</div></div></section>

    <section data-nav-theme="light" className="bg-white px-6 py-24 md:py-32"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2"><motion.div {...reveal} className="rounded-[2rem] bg-zolix-beige p-8 md:p-11"><Scale size={30} className="text-zolix-orange" /><p className="mt-12 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">Why This Approach</p><p className="mt-6 text-xl font-medium leading-relaxed tracking-tight text-zolix-dark md:text-2xl">Government cloud spend carries a standard of accountability that most commercial environments do not require. It must be explainable, auditable, and traceable to a specific program or funding source on request. Zolix is designed around that standard rather than adapting to it after the fact - cost data is structured the way audit and budget review processes already expect it.</p></motion.div><motion.div {...reveal} transition={{ delay: 0.08 }} className="border-t border-zolix-dark/15 pt-8 lg:mt-20"><Network size={30} className="text-zolix-orange" /><p className="mt-12 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">Applicability</p><p className="mt-6 text-xl font-medium leading-relaxed tracking-tight text-zolix-dark/65 md:text-2xl">This approach applies to federal, state, and local agencies managing infrastructure across multiple contractor teams; to defense and civilian agencies operating under strict compliance and procurement requirements; and to any government organization where cloud spend needs to be explainable down to the program or system level.</p></motion.div></div></section>

    <FAQ items={GOVERNMENT_FAQ} title="Questions on Implementation" />

    <section data-nav-theme="beige" className="bg-zolix-beige px-6 py-20 md:py-28"><div className="mx-auto max-w-5xl rounded-[2rem] bg-zolix-orange px-8 py-12 text-white md:px-14 md:py-16"><FileCheck2 size={30} /><div className="mt-10 grid gap-10 lg:grid-cols-[1.25fr_.75fr] lg:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">Next Step</p><h2 className="mt-6 text-4xl font-bold leading-none tracking-[-0.05em] md:text-6xl">A clear view of cloud spend, built for scrutiny.</h2><p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/80">Connect your accounts through a read-only, zero-exception setup. A clear, auditable view of current cloud spend is typically available within 24 hours.</p></div><div className="flex flex-wrap gap-4 lg:justify-end"><Button href="/demo">Book a Demo</Button><Button href="mailto:support@zolix.ai" outline>Contact Us</Button></div></div></div></section>
  </>;
}
