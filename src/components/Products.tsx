"use client";

import { motion } from 'framer-motion';
import { Cloud, BrainCircuit, Cpu, ArrowUpRight, ShieldCheck, Database, Zap, ArrowRight, Radar, Gauge, BellRing } from 'lucide-react';
import Link from 'next/link';

// The three capabilities with a dedicated page link to it; the rest are
// platform features that have no standalone route, so they render as plain cards.
const productData = [
  {
    title: "Cloud FinOps",
    desc: "Unified cost visibility, allocation, and optimization across AWS, Azure, GCP, and OCI. Built for complex, multi-account architectures.",
    icon: Cloud,
    href: "/cloud-finops"
  },
  {
    title: "AI FinOps",
    desc: "Token-level cost attribution for LLM workloads, plus training vs. inference cost breakdowns your team can actually act on.",
    icon: BrainCircuit,
    href: "/ai-finops"
  },
  {
    title: "GPU Calculator",
    desc: "Real-time pricing and performance estimation for NVIDIA and AMD hardware across every major cloud and GPU provider.",
    icon: Cpu,
    href: "/gpu-cost"
  },
  {
    title: "Waste Detection",
    desc: "Continuous scanning against thousands of known waste patterns - idle instances, orphaned volumes, over-provisioned databases.",
    icon: Radar
  },
  {
    title: "Rightsizing Engine",
    desc: "Specific, sized recommendations based on your actual usage - not generic thresholds that don't hold up under real workloads.",
    icon: Gauge
  },
  {
    title: "Forecasting & Alerts",
    desc: "Budget forecasts built on historical usage trends, with real-time alerts before spend crosses your threshold.",
    icon: BellRing
  }
];

const Products = () => {
  return (
    <section id="products" data-nav-theme="light" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Core Capabilities</h2>
            <p className="text-gray-500 text-lg font-medium">Powerful tools designed to give you complete control over your infrastructure spending.</p>
          </div>
          <Link href="/products" className="group bg-black text-white pl-6 pr-2 py-2 rounded-full flex items-center gap-6 hover:bg-zolix-orange transition-all active:scale-95">
            <span className="text-[10px] font-bold uppercase tracking-widest">Explore All Features</span>
            <div className="bg-white text-black p-2 rounded-full group-hover:rotate-45 transition-transform">
              <ArrowRight size={14} />
            </div>
          </Link>
        </div>

        {/* Sovereign AI C2O Engine Highlight */}
        <div className="mb-24 p-10 md:p-16 bg-zolix-beige rounded-[60px] border border-black/5 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle 290px at 100% 0%, rgba(220, 106, 79, 0.06), transparent 70%)",
            }}
          />
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-zolix-orange text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8">
                <ShieldCheck size={14} /> Sovereign AI Technology
              </div>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8 leading-tight">
                Powered by the <br /> <span className="text-zolix-orange">C2O AI Engine</span>
              </h3>
              <p className="text-xl text-gray-600 font-medium leading-relaxed mb-10">
                Our Sovereign AI C2O engine provides precision recommendations based on a <span className="text-black font-bold">9 Billion Parameter model</span>, specifically trained on <span className="text-black font-bold">2M+ infrastructure data points</span> and <span className="text-black font-bold">10,000+ global best practices</span>.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-zolix-orange shadow-sm">
                    <Database size={20} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">9B</div>
                    <div className="text-[9px] font-bold uppercase tracking-widest opacity-40">Parameters</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-zolix-orange shadow-sm">
                    <Zap size={20} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">10k+</div>
                    <div className="text-[9px] font-bold uppercase tracking-widest opacity-40">Best Practices</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-black text-white p-12 rounded-[40px] shadow-2xl">
              <h4 className="text-xl font-bold mb-6">Why Sovereign AI?</h4>
              <ul className="space-y-6">
                {[
                  "Zero data leakage to public LLMs",
                  "Sub-second remediation latency",
                  "Context-aware infrastructure rightsizing",
                  "Enterprise-grade data sovereignty"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-zolix-orange" />
                    <span className="text-gray-400 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productData.map((product, idx) => {
            const body = (
              <>
                <div className="w-14 h-14 bg-zolix-orange rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform">
                  <product.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4 flex items-center justify-between gap-4">
                  {product.title}
                  {product.href && (
                    <ArrowUpRight size={20} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </h3>
                <p className="text-gray-500 group-hover:text-gray-400 leading-relaxed font-medium text-sm">
                  {product.desc}
                </p>
                {product.href && (
                  <span className="mt-8 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zolix-orange">
                    Learn More <ArrowRight size={13} />
                  </span>
                )}
              </>
            );

            const className = "group block p-10 rounded-[40px] bg-zolix-beige transition-all duration-500 h-full";

            return (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (idx % 3) * 0.1 }}
                viewport={{ once: true }}
              >
                {product.href ? (
                  <Link href={product.href} className={`${className} hover:bg-black hover:text-white cursor-pointer`}>
                    {body}
                  </Link>
                ) : (
                  <div className={className}>{body}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Products;
