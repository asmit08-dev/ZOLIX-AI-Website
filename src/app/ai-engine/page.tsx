import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BrainCircuit, ShieldCheck, Cpu, Gauge, Lock, Layers } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("/ai-engine");

const stats = [
  { value: "9B", label: "Parameters in the sovereign C2O model" },
  { value: "2M+", label: "Data points used for training" },
  { value: "10,000+", label: "Global best practices encoded" },
  { value: "4", label: "Hyperscalers supported: AWS, Azure, GCP, OCI" },
];

const capabilities = [
  {
    icon: BrainCircuit,
    title: "Autonomous decisioning",
    body: "Machine learning automates complex rightsizing, scheduling, and remediation decisions that rule-based tools miss.",
  },
  {
    icon: Cpu,
    title: "GPU & LLM intelligence",
    body: "Purpose-built models for VRAM optimization, GPU sizing, and token-cost tuning across modern AI workloads.",
  },
  {
    icon: Gauge,
    title: "Real-time optimization",
    body: "Continuous analysis of billing and usage signals to prevent waste before it lands on your invoice.",
  },
  {
    icon: Lock,
    title: "Sovereign & private",
    body: "A 100% proprietary standard — your financial metadata is never used to train public LLMs.",
  },
  {
    icon: Layers,
    title: "Multi-cloud by design",
    body: "Specialized C2O models for each hyperscaler, unified into a single pane of glass.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise compliance",
    body: "Built to SOC 2 Type II, ISO 27001, GDPR, and DPDPA standards from day one.",
  },
];

export default function AIEnginePage() {
  return (
    <div className="pt-52 pb-32 px-6 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "C2O AI Engine", path: "/ai-engine" }]} />

        <div className="inline-block bg-zolix-orange text-white px-5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8">
          100% Proprietary Standard
        </div>
        <h1 className="text-4xl md:text-7xl font-extrabold mb-8 leading-[0.95] text-zolix-dark tracking-tighter max-w-4xl">
          C2O AI Engine <span className="text-zolix-orange">(100% Proprietary Standard)</span>
        </h1>
        <p className="text-lg md:text-2xl text-zolix-dark/40 font-bold tracking-tight max-w-3xl mb-16">
          Discover the core of Zolix: Our AI-Engine. Learn how machine learning automates complex cloud
          decisions to ensure efficiency and performance at scale.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {stats.map((s) => (
            <div key={s.label} className="bg-zolix-beige rounded-[28px] p-8 border border-zolix-dark/5">
              <div className="text-4xl md:text-5xl font-extrabold text-zolix-dark tracking-tighter mb-3">
                {s.value}
              </div>
              <div className="text-[11px] font-semibold text-zolix-dark/50 leading-snug">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {capabilities.map((c) => (
            <div key={c.title} className="p-8 rounded-[32px] border border-zolix-dark/5 bg-white hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-zolix-beige flex items-center justify-center mb-6">
                <c.icon size={20} className="text-zolix-orange" />
              </div>
              <h2 className="font-bold text-lg text-zolix-dark mb-3">{c.title}</h2>
              <p className="text-sm text-zolix-dark/50 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>

        <div className="bg-zolix-dark rounded-[40px] p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tighter mb-6">
            See the C2O Engine on your own cloud bill.
          </h2>
          <p className="text-white/50 font-bold max-w-2xl mx-auto mb-10">
            Run a free, zero-agent scan or book a guided walkthrough with our team.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-5">
            <a
              href="https://lite.zolix.ai/signup"
              target="_blank"
              rel="noreferrer"
              className="bg-white text-zolix-dark px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-zolix-orange hover:text-white transition-colors inline-flex items-center gap-3"
            >
              Start free scan <ArrowRight size={14} />
            </a>
            <Link
              href="/demo"
              className="text-white/70 px-8 py-4 rounded-full border border-white/15 text-[10px] font-bold uppercase tracking-[0.3em] hover:text-white hover:border-white/40 transition-colors"
            >
              Book a demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
