"use client";

import { motion } from "framer-motion";
import { Activity, ArrowRight, BadgeCheck, Dna, HardDrive, HeartPulse, LockKeyhole, ScanLine, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import FAQ from "@/components/FAQ";
import type { IndustryProps } from "@/components/PageSections";
import { HEALTHCARE_LIFE_SCIENCES_FAQ } from "./faqs";
import { INDUSTRY_H1 } from "./headings";

const challenges = [
  ["01", "Imaging archives frozen in high-cost storage", "Radiology departments keep years of MRI, CT, and X-ray studies in expensive storage tiers, even when most have not been accessed in months.", HardDrive],
  ["02", "Genomics compute with no separate line item", "A sequencing run can trigger a burst of compute for hours or days. Without workload-level tracking, that spend simply becomes an unexplained spike.", Dna],
  ["03", "EHR-adjacent infrastructure that resists change", "Strict controls are essential around clinical systems, but many cost tools assume the write access and new agents that healthcare IT cannot grant.", LockKeyhole],
  ["04", "Research data that outlives the grant", "Clinical trial and study data often needs long-term retention after active work ends, quietly collecting storage cost without a clear owner.", ScanLine],
] as const;

const capabilities = [
  ["Access-Aware Imaging Tiering", "Track real access patterns and surface studies that qualify for colder, lower-cost storage, while keeping retention policies untouched.", ScanLine],
  ["Separated Research & Clinical Tracking", "Give genomics, research, and clinical production infrastructure their own cost view so heavy sequencing weeks are easy to explain.", Dna],
  ["Zero-Agent, Read-Only by Design", "Get visibility without deploying a new agent or requesting write access to systems operating within sensitive clinical environments.", ShieldCheck],
  ["Retention-Compliant Cold Data Detection", "Identify long-tail research data that has not been accessed in a defined window, with an audit-friendly path to lower-cost storage.", BadgeCheck],
] as const;

const steps = [
  ["01", "Connect safely", "Link cloud accounts through read-only access. No agent, write permission, or change to a clinical system is required."],
  ["02", "Separate the signal", "Map costs to imaging, genomics, research, and clinical workloads instead of leaving every charge in one opaque total."],
  ["03", "Prioritize with confidence", "Receive clear, ranked opportunities that respect retention policies and existing compliance controls."],
] as const;

function Button({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  const className = `group inline-flex items-center gap-3 rounded-full px-7 py-4 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors ${light ? "bg-white text-zolix-dark hover:bg-zolix-orange hover:text-white" : "bg-zolix-dark text-white hover:bg-zolix-orange"}`;
  const content = <>{children}<ArrowRight size={15} strokeWidth={3} className="transition-transform duration-200 group-hover:translate-x-1" /></>;
  return href.startsWith("http") ? <a href={href} target="_blank" rel="noreferrer" className={className}>{content}</a> : <Link href={href} className={className}>{content}</Link>;
}

const reveal = { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.18 } };

function HealthcareSignal() {
  return <div className="relative min-h-[32rem] overflow-hidden rounded-[2rem] bg-[#142e35] shadow-[0_28px_80px_rgba(12,37,43,.28)]">
    <Image src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85" alt="Healthcare professional reviewing digital clinical information" fill priority sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#102a31] via-[#102a31]/35 to-transparent" />
    <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/25 bg-[#102a31]/60 px-3 py-2 text-[9px] font-bold uppercase tracking-[.16em] text-white backdrop-blur-md"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-200" />Care infrastructure / Read-only</div>
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3 }} className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-[#102a31]/90 p-4 shadow-xl backdrop-blur-md sm:p-5">
      <div className="flex items-center justify-between border-b border-white/10 pb-3 text-[9px] font-bold uppercase tracking-[.16em] text-white/55"><span>Cost visibility</span><span className="text-cyan-200">Live</span></div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center"><div><p className="text-lg font-extrabold text-white">62%</p><p className="mt-1 text-[8px] font-bold uppercase tracking-wider text-white/50">Cold studies</p></div><div className="border-x border-white/10"><p className="text-lg font-extrabold text-white">3–5×</p><p className="mt-1 text-[8px] font-bold uppercase tracking-wider text-white/50">Compute swing</p></div><div><p className="text-lg font-extrabold text-cyan-200">Safe</p><p className="mt-1 text-[8px] font-bold uppercase tracking-wider text-white/50">Read-only</p></div></div>
    </motion.div>
    <a href="https://unsplash.com/license" target="_blank" rel="noreferrer" className="absolute bottom-1.5 right-3 text-[7px] font-medium text-white/55 underline-offset-2 hover:text-white hover:underline">Photo licensed via Unsplash</a>
  </div>;
}

export default function HealthcareLifeSciences({ breadcrumbs }: IndustryProps) {
  return <>
    <section data-nav-theme="beige" className="relative overflow-hidden bg-zolix-beige px-6 pb-20 pt-40 md:pb-28">
      <div className="absolute -right-24 top-16 h-[32rem] w-[32rem] rounded-full border border-cyan-600/10" />
      <div className="absolute right-28 top-40 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        {breadcrumbs}
        <div className="grid gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-7 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">Industry solutions / Healthcare &amp; life sciences</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }} className="max-w-3xl text-5xl font-extrabold leading-[.94] tracking-[-.06em] text-zolix-dark md:text-7xl">{INDUSTRY_H1["healthcare-life-sciences"]}</motion.h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12 }} className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-zolix-dark/60 md:text-xl">Imaging archives, genomics pipelines, and EHR-adjacent systems run some of healthcare&apos;s most sensitive cloud workloads. Zolix makes their costs clear without asking teams to compromise the controls that protect them.</motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }} className="mt-10 flex flex-wrap gap-4"><Button href="/demo">Talk to an expert</Button><Button href="https://lite.zolix.ai/signup" light>Start scanning for free</Button></motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .65, delay: .1 }} className="mx-auto w-full max-w-lg"><HealthcareSignal /></motion.div>
        </div>
        <div className="mt-16 grid gap-3 border-t border-zolix-dark/10 pt-6 sm:grid-cols-3"><p className="flex items-center gap-3 text-xs font-bold text-zolix-dark/65"><ShieldCheck size={16} className="text-zolix-orange" />Zero-agent setup</p><p className="flex items-center gap-3 text-xs font-bold text-zolix-dark/65"><LockKeyhole size={16} className="text-zolix-orange" />Existing controls respected</p><p className="flex items-center gap-3 text-xs font-bold text-zolix-dark/65"><Activity size={16} className="text-zolix-orange" />24-hour first visibility</p></div>
      </div>
    </section>

    <section data-nav-theme="dark" className="bg-[#102a31] px-6 py-20 text-white md:py-24"><div className="mx-auto max-w-7xl"><p className="mb-10 text-[10px] font-bold uppercase tracking-[.22em] text-cyan-200">The numbers behind the problem</p><div className="grid gap-10 border-t border-white/15 pt-9 md:grid-cols-3"><div><p className="text-4xl font-extrabold tracking-[-.06em] text-cyan-200 md:text-5xl">60–80%</p><p className="mt-4 max-w-xs text-sm font-medium leading-relaxed text-white/60">of clinical imaging data goes unaccessed after the first 90 days, while remaining in its original storage tier.</p></div><div><p className="text-4xl font-extrabold tracking-[-.06em] text-cyan-200 md:text-5xl">3–5×</p><p className="mt-4 max-w-xs text-sm font-medium leading-relaxed text-white/60">cost variance between a quiet week and a heavy sequencing week in many genomics pipelines.</p></div><div><p className="text-4xl font-extrabold tracking-[-.06em] text-cyan-200 md:text-5xl">24 hours</p><p className="mt-4 max-w-xs text-sm font-medium leading-relaxed text-white/60">to a first cost visibility report after accounts are connected through read-only access.</p></div></div></div></section>

    <section data-nav-theme="light" className="bg-white px-6 py-24 md:py-32"><div className="mx-auto max-w-7xl"><div className="grid gap-8 border-b border-zolix-dark/10 pb-12 md:grid-cols-[.8fr_1.2fr] md:items-end"><h2 className="max-w-md text-4xl font-bold leading-none tracking-[-.05em] text-zolix-dark md:text-6xl">Where the spend actually hides</h2><p className="max-w-2xl text-lg font-medium leading-relaxed text-zolix-dark/55">Healthcare cloud cost problems rarely live in one obvious place. They emerge where high-volume data, variable compute, and careful access boundaries overlap.</p></div><div className="divide-y divide-zolix-dark/10">{challenges.map(([number, title, desc, Icon], index) => <motion.article key={number} {...reveal} transition={{ delay: index * .04 }} className="group grid gap-5 py-8 md:grid-cols-[4rem_1fr_2rem] md:items-start md:py-10"><span className="text-xs font-bold tracking-widest text-zolix-orange">{number}</span><div><h3 className="text-xl font-bold tracking-tight text-zolix-dark md:text-2xl">{title}</h3><p className="mt-3 max-w-3xl text-[15px] font-medium leading-relaxed text-zolix-dark/55">{desc}</p></div><Icon size={22} className="hidden text-zolix-dark/30 transition-colors group-hover:text-zolix-orange md:block" /></motion.article>)}</div></div></section>

    <section data-nav-theme="beige" className="bg-zolix-beige px-6 py-24 md:py-32"><div className="mx-auto max-w-7xl"><div className="max-w-3xl"><p className="mb-5 text-[10px] font-bold uppercase tracking-[.22em] text-zolix-orange">Clearer cost decisions</p><h2 className="text-4xl font-bold leading-none tracking-[-.05em] text-zolix-dark md:text-6xl">How Zolix responds</h2></div><div className="mt-16 grid gap-x-14 gap-y-10 md:grid-cols-2">{capabilities.map(([title, desc, Icon], index) => <motion.article key={title} {...reveal} transition={{ delay: (index % 2) * .06 }} className="group border-t border-zolix-dark/15 pt-6"><div className="flex items-start gap-5"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-zolix-orange transition-transform duration-300 group-hover:-translate-y-1"><Icon size={21} /></span><div><h3 className="text-xl font-bold tracking-tight text-zolix-dark">{title}</h3><p className="mt-3 text-[15px] font-medium leading-relaxed text-zolix-dark/55">{desc}</p></div></div></motion.article>)}</div></div></section>

    <section data-nav-theme="light" className="bg-white px-6 py-24 md:py-32"><div className="mx-auto max-w-7xl"><div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="mb-5 text-[10px] font-bold uppercase tracking-[.22em] text-zolix-orange">A safe path to clarity</p><h2 className="text-4xl font-bold leading-none tracking-[-.05em] text-zolix-dark md:text-6xl">How we approach it</h2></div><p className="max-w-sm text-base font-medium leading-relaxed text-zolix-dark/55">Visibility first, then a practical path to action within the safeguards your environment already has.</p></div><div className="grid gap-10 md:grid-cols-3">{steps.map(([number, title, desc], index) => <motion.article key={number} {...reveal} transition={{ delay: index * .08 }}><p className="text-sm font-bold tracking-widest text-zolix-orange">{number}</p><div className="my-6 h-px bg-zolix-dark/15"><motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: .8, delay: index * .1 }} className="h-px bg-zolix-orange" /></div><h3 className="text-2xl font-bold tracking-tight text-zolix-dark">{title}</h3><p className="mt-4 text-[15px] font-medium leading-relaxed text-zolix-dark/55">{desc}</p></motion.article>)}</div></div></section>

    <section data-nav-theme="beige" className="bg-zolix-beige px-6 py-24 md:py-32"><div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[.75fr_1.25fr]"><div><p className="text-[10px] font-bold uppercase tracking-[.22em] text-zolix-orange">Built for</p><HeartPulse size={34} className="mt-8 text-zolix-orange" /></div><p className="max-w-4xl text-2xl font-medium leading-relaxed tracking-tight text-zolix-dark md:text-4xl">Hospital systems and health networks managing imaging at scale; life sciences and biotech companies running genomics or drug-discovery compute; health-tech platforms operating alongside EHR systems; and research institutions holding long-tail clinical study data.</p></div></section>

    <FAQ items={HEALTHCARE_LIFE_SCIENCES_FAQ} theme="beige" />

    <section data-nav-theme="dark" className="bg-zolix-dark px-6 py-20 text-white md:py-28"><div className="mx-auto max-w-5xl text-center"><ShieldCheck size={28} className="mx-auto text-zolix-orange" /><h2 className="mt-8 text-4xl font-bold leading-none tracking-[-.05em] md:text-6xl">See where healthcare infrastructure spend is actually going</h2><p className="mx-auto mt-7 max-w-2xl text-lg font-medium leading-relaxed text-white/60">Connect through a read-only, zero-agent setup and see imaging storage, research compute, and clinical infrastructure in one clear view.</p><div className="mt-10 flex flex-wrap justify-center gap-4"><Button href="/demo" light>Book a demo</Button><Button href="https://lite.zolix.ai/signup" light>Start scanning for free</Button></div></div></section>
  </>;
}
