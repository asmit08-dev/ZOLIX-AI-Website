import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import EmailComposeLink from "@/components/EmailComposeLink";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("/demo");

const highlights = [
  "A live walkthrough of the C2O AI Engine on real cloud billing data",
  "Zero-agent discovery via your AWS CUR or Azure Billing Export — no IAM access required",
  "Instant detection of orphaned disks, idle load balancers, and over-provisioned instances",
  "AI Planner for GPU and LLM cost dimensioning across AWS, Azure, GCP, and OCI",
  "A tailored savings estimate and rightsizing roadmap for your infrastructure",
];

export default function DemoPage() {
  return (
    <div className="pt-52 pb-32 px-6 bg-white min-h-screen">
      <div className="max-w-5xl mx-auto">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Demo", path: "/demo" }]} />

        <div className="inline-block bg-zolix-orange text-white px-5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8">
          Book a Demo
        </div>
        <h1 className="text-4xl md:text-8xl font-extrabold mb-8 leading-[0.9] text-zolix-dark tracking-tighter">
          See ZOLIX in action.
        </h1>
        <p className="text-lg md:text-2xl text-zolix-dark/40 font-bold tracking-tight max-w-3xl mb-14">
          Book a personalized demo of Zolix AI. See how our AI-powered engine automates cloud cost
          optimization and provides real-time visibility into your infrastructure.
        </p>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-20">
          <a
            href="https://lite.zolix.ai/signup"
            target="_blank"
            rel="noreferrer"
            className="bg-zolix-dark text-white pl-10 pr-3 py-3 rounded-full flex items-center gap-8 group hover:bg-zolix-orange transition-all duration-500 shadow-2xl shadow-zolix-dark/20"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Start scanning for free</span>
            <div className="bg-white text-zolix-dark p-3 rounded-full group-hover:rotate-45 transition-transform">
              <ArrowRight size={20} strokeWidth={3} />
            </div>
          </a>
          <EmailComposeLink
            subject="ZOLIX AI Demo Request"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-zolix-dark/10 text-[10px] font-bold uppercase tracking-[0.3em] text-zolix-dark hover:border-zolix-orange hover:text-zolix-orange transition-colors"
          >
            Talk to sales
            <ArrowRight size={14} />
          </EmailComposeLink>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zolix-dark/30 mb-8">
              What you&apos;ll see
            </h2>
            <ul className="space-y-5">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-zolix-orange shrink-0 mt-0.5" />
                  <span className="text-zolix-dark/70 font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-zolix-beige rounded-[32px] p-10 border border-zolix-dark/5">
            <div className="flex items-center gap-3 mb-6">
              <Clock size={18} className="text-zolix-orange" />
              <span className="text-sm font-bold text-zolix-dark">Under 60 seconds to first insight</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck size={18} className="text-zolix-orange" />
              <span className="text-sm font-bold text-zolix-dark">SOC 2 Type II • ISO 27001 • GDPR • DPDPA</span>
            </div>
            <p className="text-sm text-zolix-dark/50 leading-relaxed mt-8">
              Prefer to explore first? Start with a free scan of your cloud bill — no credit card and no
              sales call required. Enterprise teams can{" "}
              <Link href="/pricing" className="text-zolix-orange font-semibold hover:underline">
                view pricing
              </Link>{" "}
              or reach us at{" "}
              <EmailComposeLink className="text-zolix-orange font-semibold hover:underline">support@zolix.ai</EmailComposeLink>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
