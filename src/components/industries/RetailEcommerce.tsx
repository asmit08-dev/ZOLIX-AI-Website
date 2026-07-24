"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Boxes, CalendarRange, ChartNoAxesCombined, Check, LockKeyhole, ShoppingBag, Store, Tags, Zap } from "lucide-react";
import type { ReactNode } from "react";
import FAQ from "@/components/FAQ";
import EmailComposeLink from "@/components/EmailComposeLink";
import { RETAIL_ECOMMERCE_FAQ } from "./faqs";
import { INDUSTRY_H1 } from "./headings";
import type { IndustryProps } from "@/components/PageSections";

const outcomes = [
  ["Capture Unified Commerce Savings", "Retailers run infrastructure across storefronts, marketplaces, mobile apps, and in-store systems, and each channel tends to get billed and monitored separately. Zolix pulls all of it into a single view, so a promotion running across five channels shows up as one number instead of five disconnected ones. That single view is what lets a finance team catch a spend spike before it becomes a quarter-end surprise, not after.", Store],
  ["Turn Seasonal Spikes Into a Controlled Cost Curve", "Black Friday, festive-season sales, and flash promotions push retail infrastructure to scale hard for a short window, and then the capacity provisioned for that window often stays billed for weeks after the traffic has dropped back to normal. Zolix tracks usage against your actual sales calendar, so the scale-down happens as reliably as the scale-up did.", CalendarRange],
  ["Build the Cost-Efficient Storefront", "Product catalogs, recommendation engines, and checkout systems all draw on compute that scales with traffic, but not every part of that stack needs to scale the same way. Zolix breaks spend down by storefront component, so a team can see whether it’s the recommendation engine or the checkout flow that’s actually driving the bill up during a traffic spike.", Boxes],
  ["Drive Sustainable, Efficient Operations", "Idle compute, orphaned storage from last season’s product images, and over-provisioned databases add up quietly across a retail cloud environment. Zolix scans for these continuously and flags them before they turn into a pattern nobody’s watching.", Zap],
] as const;

const advantages = [
  ["Multi-Channel Cost Attribution", "Spend mapped to the specific channel, storefront, or campaign driving it - not just a single blended cloud bill. This is what makes it possible to answer ‘what did that promotion actually cost us’ in minutes instead of days.", Tags],
  ["A Deep Read on Seasonal Demand Patterns", "Zolix’s forecasting is built around retail’s actual demand cycle - the run-up to a sale, the peak, and the drop-off after - rather than a flat historical average that treats every week the same.", ChartNoAxesCombined],
  ["A Zero-Agent Platform With No Setup Overhead", "Connect your cloud accounts through read-only access and get a first cost visibility report within 24 hours. No agents installed on production systems, no changes to how your storefront runs.", LockKeyhole],
  ["A Partner Ecosystem Built for Retail-Specific Infrastructure", "Zolix works alongside the commerce platforms, CDNs, and inventory systems retailers already run on, rather than asking teams to restructure their stack around a monitoring tool.", ShoppingBag],
] as const;

const reveal = { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.16 } };

function Button({ href, children, outline = false }: { href: string; children: ReactNode; outline?: boolean }) {
  const className = `group inline-flex items-center gap-3 rounded-full px-7 py-4 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors ${outline ? "border border-zolix-dark/20 bg-white/70 text-zolix-dark hover:border-zolix-orange hover:bg-zolix-orange hover:text-white" : "bg-zolix-dark text-white hover:bg-zolix-orange"}`;
  const content = <>{children}<ArrowRight size={15} strokeWidth={3} className="transition-transform duration-200 group-hover:translate-x-1" /></>;
  // Use normal anchors for conversion CTAs. They remain dependable even while
  // a local dev server is refreshing its client-side router.
  return <a href={href} target={href.startsWith("https://") ? "_blank" : undefined} rel={href.startsWith("https://") ? "noreferrer" : undefined} className={className}>{content}</a>;
}

export default function RetailEcommerce({ breadcrumbs }: IndustryProps) {
  return <>
    <section data-nav-theme="beige" className="relative overflow-hidden bg-zolix-beige px-6 pb-20 pt-40 md:pb-28">
      <div className="absolute -left-32 top-28 h-96 w-96 rounded-full border border-zolix-orange/15" />
      <div className="absolute right-[8%] top-16 h-64 w-64 rounded-full bg-zolix-orange/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-fit [&_nav]:mb-12 [&_ol]:rounded-full [&_ol]:border [&_ol]:border-zolix-dark/10 [&_ol]:bg-white/65 [&_ol]:px-4 [&_ol]:py-2.5 [&_ol]:shadow-[0_10px_30px_rgba(26,26,26,.05)] [&_ol]:backdrop-blur-sm [&_ol]:sm:px-5 [&_ol_li:last-child_span]:text-zolix-dark">
          {breadcrumbs}
        </motion.div>
        <div className="grid gap-14 lg:grid-cols-[1.04fr_.96fr] lg:items-center">
          <div>
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-7 text-[10px] font-bold uppercase tracking-[0.22em] text-zolix-orange">Industry solutions / Retail & eCommerce</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="max-w-3xl text-5xl font-extrabold leading-[.94] tracking-[-0.06em] text-zolix-dark md:text-7xl">{INDUSTRY_H1["retail-ecommerce"]}</motion.h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-zolix-dark/60 md:text-xl">Reimagine the entire retail cost stack with real-time visibility and Zolix&apos;s zero-agent approach to cloud spend.</motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-10 flex flex-wrap gap-4"><EmailComposeLink subject="Retail & eCommerce Cloud Cost Optimization" className="group inline-flex items-center gap-3 rounded-full bg-zolix-dark px-7 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-zolix-orange">Talk to an Expert<ArrowRight size={15} strokeWidth={3} className="transition-transform group-hover:translate-x-1" /></EmailComposeLink><Button href="/demo?intent=book">Book a Demo</Button></motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, delay: 0.1 }} className="relative mx-auto w-full max-w-lg">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-zolix-dark shadow-[0_26px_80px_rgba(26,26,26,.16)]">
              <Image src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85" alt="Customer making a digital retail purchase" fill priority sizes="(max-width: 1024px) 100vw, 520px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-zolix-dark via-zolix-dark/15 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/15 bg-zolix-dark/75 p-5 text-white backdrop-blur-md">
                <div className="flex items-center justify-between"><p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/55">Promotion visibility</p><span className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-wider text-zolix-orange"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zolix-orange" />Live</span></div>
                <div className="mt-5 grid grid-cols-3 gap-2 text-center"><div className="rounded-lg bg-white/10 p-2"><p className="text-[8px] font-bold uppercase tracking-wider text-white/45">Storefront</p><Check className="mx-auto mt-2 text-zolix-orange" size={15} /></div><div className="rounded-lg bg-white/10 p-2"><p className="text-[8px] font-bold uppercase tracking-wider text-white/45">Mobile</p><Check className="mx-auto mt-2 text-zolix-orange" size={15} /></div><div className="rounded-lg bg-white/10 p-2"><p className="text-[8px] font-bold uppercase tracking-wider text-white/45">Marketplaces</p><Check className="mx-auto mt-2 text-zolix-orange" size={15} /></div></div>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="absolute -bottom-5 -left-5 rounded-2xl border border-zolix-dark/10 bg-white px-5 py-4 shadow-lg"><p className="text-[9px] font-bold uppercase tracking-[.16em] text-zolix-dark/45">Cost mapping</p><p className="mt-1 text-sm font-bold text-zolix-dark">Campaign → channel → spend</p></motion.div>
          </motion.div>
        </div>
      </div>
    </section>

    <section data-nav-theme="light" className="bg-white px-6 py-24 md:py-32"><div className="mx-auto max-w-7xl"><div className="grid gap-8 border-b border-zolix-dark/10 pb-12 md:grid-cols-[.8fr_1.2fr] md:items-end"><div><p className="mb-5 text-[10px] font-bold uppercase tracking-[.22em] text-zolix-orange">Retail, on your terms</p><h2 className="text-4xl font-bold leading-none tracking-[-.05em] text-zolix-dark md:text-6xl">What Cloud Cost Optimization Looks Like for Retail & eCommerce</h2></div><p className="max-w-2xl text-lg font-medium leading-relaxed text-zolix-dark/55">A single operational view, tailored to the moments and systems that make retail infrastructure move.</p></div><div className="divide-y divide-zolix-dark/10">{outcomes.map(([title, description, Icon], index) => <motion.article key={title} {...reveal} transition={{ delay: index * .04 }} className="group grid gap-5 py-9 md:grid-cols-[4rem_1fr_2rem] md:py-11"><span className="grid h-10 w-10 place-items-center rounded-xl bg-zolix-beige text-zolix-orange transition-transform duration-300 group-hover:-translate-y-1"><Icon size={20} /></span><div><h3 className="text-2xl font-bold tracking-tight text-zolix-dark">{title}</h3><p className="mt-3 max-w-3xl text-[15px] font-medium leading-relaxed text-zolix-dark/55">{description}</p></div><span className="hidden pt-1 text-sm font-bold text-zolix-orange md:block">0{index + 1}</span></motion.article>)}</div></div></section>

    <section data-nav-theme="dark" className="bg-zolix-dark px-6 py-24 text-white md:py-32"><div className="mx-auto max-w-7xl"><div className="mb-16 max-w-3xl"><p className="mb-5 text-[10px] font-bold uppercase tracking-[.22em] text-zolix-orange">The Zolix difference</p><h2 className="text-4xl font-bold leading-none tracking-[-.05em] md:text-6xl">Why Zolix Is the Right Cloud Cost Optimization Partner for Retail & eCommerce</h2></div><div className="grid gap-x-12 gap-y-12 md:grid-cols-2">{advantages.map(([title, description, Icon], index) => <motion.article key={title} {...reveal} transition={{ delay: (index % 2) * .08 }} className="border-t border-white/15 pt-7"><span className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 text-zolix-orange"><Icon size={20} /></span><h3 className="mt-7 text-2xl font-bold tracking-tight">{title}</h3><p className="mt-4 text-[15px] font-medium leading-relaxed text-white/55">{description}</p></motion.article>)}</div></div></section>

    <section data-nav-theme="beige" className="bg-zolix-beige px-6 py-24 md:py-32"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.78fr_1.22fr]"><div className="rounded-[2rem] bg-zolix-orange p-8 text-white md:p-10"><LockKeyhole size={29} /><p className="mt-16 text-[10px] font-bold uppercase tracking-[.22em] text-white/70">Security retailers trust</p><p className="mt-5 text-2xl font-bold leading-tight tracking-tight md:text-3xl">Cost visibility that does not add a new security exception.</p></div><div className="flex flex-col justify-center"><p className="max-w-4xl text-2xl font-medium leading-relaxed tracking-tight text-zolix-dark md:text-4xl">For a retailer, protecting customer and transaction data isn&apos;t optional - it&apos;s the foundation of the relationship with every shopper. Zolix&apos;s read-only, zero-agent model means cost visibility never requires write access to systems handling payment or customer data, so security posture stays exactly where your team set it.</p><div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-bold text-zolix-dark/65"><span className="flex items-center gap-2"><Check size={16} className="text-zolix-orange" />Read-only access</span><span className="flex items-center gap-2"><Check size={16} className="text-zolix-orange" />Zero agents</span><span className="flex items-center gap-2"><Check size={16} className="text-zolix-orange" />No payment-system changes</span></div></div></div></section>

    <FAQ items={RETAIL_ECOMMERCE_FAQ} title="FAQ: Cloud Cost Optimization for Retail & eCommerce" theme="light" />

    <section data-nav-theme="dark" className="bg-zolix-dark px-6 py-20 text-white md:py-28"><div className="mx-auto max-w-5xl text-center"><ShoppingBag size={29} className="mx-auto text-zolix-orange" /><p className="mt-7 text-[10px] font-bold uppercase tracking-[.22em] text-zolix-orange">Start today</p><h2 className="mt-6 text-4xl font-bold leading-none tracking-[-.05em] md:text-6xl">Start Your Retail & eCommerce Cloud Cost Optimization, Today</h2><p className="mx-auto mt-7 max-w-2xl text-lg font-medium leading-relaxed text-white/60">Tell us what&apos;s driving your retail cloud spend. A Zolix specialist will help you find where the recoverable budget actually is.</p><div className="mt-10 flex flex-wrap justify-center gap-4"><EmailComposeLink subject="Retail & eCommerce Cloud Cost Optimization" className="group inline-flex items-center gap-3 rounded-full border border-white/25 px-7 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:border-zolix-orange hover:bg-zolix-orange">Talk to an Expert<ArrowRight size={15} strokeWidth={3} className="transition-transform group-hover:translate-x-1" /></EmailComposeLink><Button href="/demo?intent=book" outline>Book a Demo</Button></div></div></section>
  </>;
}
