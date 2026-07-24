"use client";

import { motion } from "framer-motion";
import { ArrowRight, Database, Factory, HardDrive, Route, ShieldCheck, Warehouse, Wrench } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import FAQ from "@/components/FAQ";
import { MANUFACTURING_LOGISTICS_FAQ } from "./faqs";
import { INDUSTRY_H1 } from "./headings";
import type { IndustryProps } from "@/components/PageSections";

const challenges = [
  ["01", "Sensor data piling up with nowhere to go", "Factory floors generate a constant stream of telemetry from machines, sensors, and quality-control cameras. A lot of it gets stored and never looked at again, sitting in expensive storage tiers it never needed to be in.", HardDrive],
  ["02", "Route optimization compute running around the clock", "Fleet and route-planning tools often run on always-on compute, even during off-peak hours when there's barely any traffic to optimize for.", Route],
  ["03", "Warehouse systems provisioned for peak, running at peak pricing year-round", "Capacity gets sized for the holiday rush or a big seasonal order, and then nobody resizes it back down once the rush is over.", Warehouse],
  ["04", "No one person owns the cloud bill", "Between the plant's IT team, the logistics software vendor, and whoever set up the original cloud account, cost accountability tends to fall through the cracks.", Factory],
] as const;

const capabilities = [
  ["IoT Telemetry Cost Management", "Zolix tracks the volume and storage tier of sensor and machine telemetry data, and flags data sitting in high-cost storage that hasn't been accessed in months.", Database],
  ["Fleet and Route Compute Optimization", "Compute tied to route-planning and fleet-tracking tools gets right-sized based on actual usage patterns - busy shipping season versus a quiet Tuesday in February look nothing alike, and your infrastructure shouldn't either.", Route],
  ["Warehouse System Rightsizing", "Once a peak season ends, Zolix flags the capacity that was provisioned for it and never scaled back down.", Warehouse],
  ["Predictive Maintenance Workload Tracking", "Machine learning models used for predictive maintenance often run on GPU or high-memory instances. Zolix tracks these separately from general compute, so you know exactly what predictive maintenance is costing you.", Wrench],
  ["Multi-Facility Cost Consolidation", "For companies running infrastructure across multiple plants, warehouses, or distribution centers, Zolix pulls everything into a single view instead of a dozen disconnected dashboards.", Factory],
] as const;

const steps = [
  ["01", "Connect", "Link your cloud accounts through read-only access. Nothing changes on the factory floor or in the warehouse management system."],
  ["02", "Map the Spend", "Zolix maps cost to specific workloads - sensor telemetry, route planning, warehouse systems, predictive maintenance - instead of leaving it all as one lump sum."],
  ["03", "Flag and Fix", "You get specific, ranked recommendations. Not a 40-page report nobody has time to read - a prioritized list based on where the money actually is."],
] as const;

function Button({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  const className = `group inline-flex items-center gap-3 rounded-full px-7 py-4 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors ${light ? "bg-white text-zolix-dark hover:bg-zolix-orange hover:text-white" : "bg-zolix-dark text-white hover:bg-zolix-orange"}`;
  const content = <>{children}<ArrowRight size={15} strokeWidth={3} className="transition-transform duration-200 group-hover:translate-x-1" /></>;
  return href.startsWith("http") ? <a href={href} target="_blank" rel="noreferrer" className={className}>{content}</a> : <Link href={href} className={className}>{content}</Link>;
}

const reveal = { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.18 } };

export default function ManufacturingLogistics({ breadcrumbs }: IndustryProps) {
  return <>
    <section data-nav-theme="beige" className="relative overflow-hidden bg-zolix-beige px-6 pb-20 pt-40 md:pb-28">
      <div className="absolute right-[-8rem] top-[6rem] h-[34rem] w-[34rem] rounded-full border border-zolix-orange/10" />
      <div className="absolute right-[4rem] top-[15rem] h-[20rem] w-[20rem] rounded-full border border-zolix-orange/10" />
      <div className="relative mx-auto max-w-7xl">
        {breadcrumbs}
        <div className="grid gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-7 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">Industry solutions / Manufacturing & Logistics</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="max-w-3xl text-5xl font-extrabold leading-[.94] tracking-[-0.06em] text-zolix-dark md:text-7xl">{INDUSTRY_H1["manufacturing-logistics"]}</motion.h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-zolix-dark/60 md:text-xl">Factory floors run on IoT sensors now, not just conveyor belts. Warehouses track every pallet through RFID and predictive routing software. All of that generates data - and data generates a cloud bill nobody planned for. Zolix helps manufacturing and logistics companies keep that spend under control without slowing down the sensors, the routes, or the production line.</motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-10 flex flex-wrap gap-4"><Button href="/products">Explore All Features</Button><Button href="/demo" light>Book a Demo</Button></motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, delay: 0.1 }} className="relative mx-auto w-full max-w-lg rounded-[2rem] border border-zolix-dark/10 bg-white/70 p-6 shadow-[0_24px_70px_rgba(26,26,26,0.08)] backdrop-blur-sm md:p-8">
            <div className="flex items-center justify-between border-b border-zolix-dark/10 pb-5 text-[9px] font-bold uppercase tracking-[0.18em]"><span className="text-zolix-dark/45">Cloud cost flow</span><span className="flex items-center gap-2 text-zolix-orange"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zolix-orange" />Continuous</span></div>
            <div className="relative mt-7 space-y-3 before:absolute before:bottom-8 before:left-7 before:top-8 before:w-px before:bg-zolix-orange/30">
              {[["Plant systems", "Telemetry & quality data", Factory], ["Distribution", "Compute & capacity", Warehouse], ["Fleet network", "Routes & tracking", Route]].map(([title, label, Icon], index) => {
                const NodeIcon = Icon as typeof Factory;
                return <motion.div key={title as string} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.32 + index * 0.1 }} className="relative flex items-center gap-4 rounded-2xl bg-zolix-beige/70 p-4"><span className="relative z-10 grid h-7 w-7 place-items-center rounded-full bg-zolix-dark text-white"><NodeIcon size={13} /></span><div><p className="text-sm font-bold text-zolix-dark">{title as string}</p><p className="mt-0.5 text-xs font-medium text-zolix-dark/45">{label as string}</p></div><span className="ml-auto text-[9px] font-bold uppercase tracking-wider text-zolix-orange">Mapped</span></motion.div>;
              })}
            </div>
            <p className="mt-7 border-t border-zolix-dark/10 pt-5 text-sm font-medium leading-relaxed text-zolix-dark/50">One clear cost picture across facilities, routes, and production systems.</p>
          </motion.div>
        </div>
        <div className="mt-16 grid gap-3 border-t border-zolix-dark/10 pt-6 sm:grid-cols-3"><p className="flex items-center gap-3 text-xs font-bold text-zolix-dark/65"><ShieldCheck size={16} className="text-zolix-orange" />Read-only access</p><p className="flex items-center gap-3 text-xs font-bold text-zolix-dark/65"><Database size={16} className="text-zolix-orange" />Multi-facility visibility</p><p className="flex items-center gap-3 text-xs font-bold text-zolix-dark/65"><Route size={16} className="text-zolix-orange" />Cost mapped to operations</p></div>
      </div>
    </section>

    <section data-nav-theme="light" className="bg-white px-6 py-24 md:py-32"><div className="mx-auto max-w-7xl"><div className="grid gap-8 border-b border-zolix-dark/10 pb-12 md:grid-cols-[.8fr_1.2fr] md:items-end"><h2 className="max-w-md text-4xl font-bold leading-none tracking-[-0.05em] text-zolix-dark md:text-6xl">Does This Sound Familiar?</h2><p className="max-w-2xl text-lg font-medium leading-relaxed text-zolix-dark/55">Most manufacturing and logistics companies run into the same handful of problems once IoT and analytics workloads move to the cloud. None of these are signs your team did something wrong - they&apos;re just what happens when infrastructure grows faster than anyone&apos;s watching it.</p></div><div className="divide-y divide-zolix-dark/10">{challenges.map(([number, title, desc, Icon], index) => <motion.article key={number} {...reveal} transition={{ delay: index * 0.04 }} className="group grid gap-5 py-8 md:grid-cols-[4rem_1fr_2rem] md:items-start md:py-10"><span className="text-xs font-bold tracking-widest text-zolix-orange">{number}</span><div><h3 className="text-xl font-bold tracking-tight text-zolix-dark md:text-2xl">{title}</h3><p className="mt-3 max-w-3xl text-[15px] font-medium leading-relaxed text-zolix-dark/55">{desc}</p></div><Icon size={22} className="hidden text-zolix-dark/30 transition-colors group-hover:text-zolix-orange md:block" /></motion.article>)}</div></div></section>

    <section data-nav-theme="beige" className="bg-zolix-beige px-6 py-24 md:py-32"><div className="mx-auto max-w-7xl"><div className="max-w-3xl"><p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">Clearer cost decisions</p><h2 className="text-4xl font-bold leading-none tracking-[-0.05em] text-zolix-dark md:text-6xl">What Zolix Does for Manufacturing & Logistics</h2></div><div className="mt-16 grid gap-x-14 gap-y-10 md:grid-cols-2">{capabilities.map(([title, desc, Icon], index) => <motion.article key={title} {...reveal} transition={{ delay: (index % 2) * 0.06 }} className="group border-t border-zolix-dark/15 pt-6"><div className="flex items-start gap-5"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-zolix-orange transition-transform duration-300 group-hover:-translate-y-1"><Icon size={21} /></span><div><h3 className="text-xl font-bold tracking-tight text-zolix-dark">{title}</h3><p className="mt-3 text-[15px] font-medium leading-relaxed text-zolix-dark/55">{desc}</p></div></div></motion.article>)}</div></div></section>

    <section data-nav-theme="dark" className="bg-zolix-dark px-6 py-20 text-white md:py-24"><div className="mx-auto max-w-7xl"><p className="mb-10 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">The Numbers</p><div className="grid gap-10 border-t border-white/15 pt-9 md:grid-cols-3"><div><p className="text-4xl font-extrabold tracking-[-0.06em] text-zolix-orange md:text-5xl">$300Bn+</p><p className="mt-4 max-w-xs text-sm font-medium leading-relaxed text-white/55">lost annually across enterprises to unused or over-provisioned cloud infrastructure.</p></div><div><p className="text-4xl font-extrabold tracking-[-0.06em] text-zolix-orange md:text-5xl">24 Hours</p><p className="mt-4 max-w-xs text-sm font-medium leading-relaxed text-white/55">average time to a first cost visibility report after connecting your accounts.</p></div><div><p className="text-4xl font-extrabold tracking-[-0.06em] text-zolix-orange md:text-5xl">Read-Only Setup</p><p className="mt-4 max-w-xs text-sm font-medium leading-relaxed text-white/55">No agents, no write access, no changes to live plant or warehouse systems during onboarding.</p></div></div></div></section>

    <section data-nav-theme="light" className="bg-white px-6 py-24 md:py-32"><div className="mx-auto max-w-7xl"><div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">A simple operating rhythm</p><h2 className="text-4xl font-bold leading-none tracking-[-0.05em] text-zolix-dark md:text-6xl">How We Approach It</h2></div><p className="max-w-sm text-base font-medium leading-relaxed text-zolix-dark/55">Visibility first, then a practical path to action.</p></div><div className="grid gap-10 md:grid-cols-3">{steps.map(([number, title, desc], index) => <motion.article key={number} {...reveal} transition={{ delay: index * 0.08 }}><p className="text-sm font-bold tracking-widest text-zolix-orange">{number}</p><div className="my-6 h-px bg-zolix-dark/15"><motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: index * 0.1 }} className="h-px bg-zolix-orange" /></div><h3 className="text-2xl font-bold tracking-tight text-zolix-dark">{title}</h3><p className="mt-4 text-[15px] font-medium leading-relaxed text-zolix-dark/55">{desc}</p></motion.article>)}</div></div></section>

    <section data-nav-theme="beige" className="bg-zolix-beige px-6 py-24 md:py-32"><div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[.75fr_1.25fr]"><div><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">Built For</p><Factory size={34} className="mt-8 text-zolix-orange" /></div><p className="max-w-4xl text-2xl font-medium leading-relaxed tracking-tight text-zolix-dark md:text-4xl">Manufacturers running IoT sensor networks across production lines, logistics companies managing fleet and route-optimization software, warehouse operators with seasonal capacity swings, and any multi-facility operation where nobody currently has one clear view of total cloud spend.</p></div></section>

    <FAQ items={MANUFACTURING_LOGISTICS_FAQ} theme="beige" />

    <section data-nav-theme="dark" className="bg-zolix-dark px-6 py-20 text-white md:py-28"><div className="mx-auto max-w-5xl text-center"><ShieldCheck size={28} className="mx-auto text-zolix-orange" /><h2 className="mt-8 text-4xl font-bold leading-none tracking-[-0.05em] md:text-6xl">Find Out What Your Sensors and Routes Are Actually Costing You</h2><p className="mx-auto mt-7 max-w-2xl text-lg font-medium leading-relaxed text-white/60">Connect your accounts and see exactly where manufacturing and logistics spend is going - without touching a single system on the floor.</p><div className="mt-10 flex flex-wrap justify-center gap-4"><Button href="/demo" light>Book a Demo</Button><Button href="https://lite.zolix.ai/signup" light>Start scanning for free</Button></div></div></section>
  </>;
}
