import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("/finops-2026");

const headlineStats = [
  { value: "$723B", label: "Global cloud spend analyzed" },
  { value: "$200B+", label: "Estimated annual cloud waste" },
  { value: "60%", label: "Bill reduction achievable with AI FinOps" },
];

const sections = [
  {
    heading: "The waste crisis",
    body: "Enterprises are on track to spend over $723 billion on cloud in 2026, yet more than $200 billion of that is wasted on idle, orphaned, and over-provisioned resources. Traditional, rule-based cost management can no longer keep pace with dynamic, AI-driven infrastructure.",
  },
  {
    heading: "AI as the inflection point",
    body: "The shift to GPU-heavy and LLM workloads has changed the cost equation. Optimizing VRAM utilization, GPU sizing, and token spend now requires autonomous, real-time decisioning — the domain of AI-powered FinOps rather than static thresholds.",
  },
  {
    heading: "What the leaders do differently",
    body: "High-performing organizations embed cost accountability across engineering and finance, automate remediation, and continuously right-size across every hyperscaler. The result is sustainable cloud growth instead of runaway bills.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The State of Cloud Cost Optimization 2026",
  description:
    "A comprehensive analysis of $723 billion in global cloud spend, the $200+ billion waste crisis, and how AI-powered FinOps is transforming enterprise cost management.",
  author: { "@type": "Organization", name: SITE_NAME },
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/assets/logo.webp` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/finops-2026` },
};

export default function FinOps2026Page() {
  return (
    <div className="pt-52 pb-32 px-6 bg-white min-h-screen">
      <JsonLd data={articleSchema} />
      <div className="max-w-5xl mx-auto">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "FinOps 2026 Report", path: "/finops-2026" }]} />

        <div className="inline-block bg-zolix-orange text-white px-5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8">
          FinOps 2026 Report
        </div>
        <h1 className="text-4xl md:text-7xl font-extrabold mb-8 leading-[0.95] text-zolix-dark tracking-tighter">
          The State of Cloud Cost Optimization 2026
        </h1>
        <p className="text-lg md:text-2xl text-zolix-dark/40 font-bold tracking-tight max-w-3xl mb-16">
          A comprehensive analysis of $723 billion in global cloud spend, the $200+ billion waste crisis,
          and how AI-powered FinOps is transforming enterprise cost management.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {headlineStats.map((s) => (
            <div key={s.label} className="bg-zolix-beige rounded-[28px] p-8 border border-zolix-dark/5">
              <div className="text-4xl md:text-5xl font-extrabold text-zolix-dark tracking-tighter mb-3">
                {s.value}
              </div>
              <div className="text-[11px] font-semibold text-zolix-dark/50 leading-snug">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="space-y-16">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-2xl md:text-3xl font-extrabold text-zolix-dark tracking-tight mb-4">
                {s.heading}
              </h2>
              <p className="text-lg text-zolix-dark/60 leading-relaxed max-w-3xl">{s.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-24 bg-zolix-dark rounded-[40px] p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tighter mb-6">
            Find your share of the $200B in waste.
          </h2>
          <p className="text-white/50 font-bold max-w-2xl mx-auto mb-10">
            Run a free, zero-agent scan and see how much of your cloud bill ZOLIX AI can eliminate.
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
              href="/finops-hub"
              className="text-white/70 px-8 py-4 rounded-full border border-white/15 text-[10px] font-bold uppercase tracking-[0.3em] hover:text-white hover:border-white/40 transition-colors"
            >
              Explore the FinOps Hub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
