"use client";

import { motion } from 'framer-motion';
import { Cloud, BrainCircuit, Cpu, ArrowRight, ShieldCheck, Database, Binary, CpuIcon } from 'lucide-react';
import Link from 'next/link';

const products = [
  {
    id: "ai-finops",
    title: "AI FinOps",
    icon: BrainCircuit,
    path: "/ai-finops",
    tagline: "Financial ops for LLM workloads.",
    desc: "The only platform built specifically for the massive financial overhead of AI infrastructure. Manage token costs, inference efficiency, and training ROI."
  },
  {
    id: "cloud-finops",
    title: "Cloud FinOps",
    icon: Cloud,
    path: "/cloud-finops",
    tagline: "Enterprise cloud cost management.",
    desc: "Automated cost allocation, visibility, and optimization across multi-cloud environments. Built for complex enterprise architectures and global scale."
  },
  {
    id: "gpu-calculator",
    title: "GPU Calculator",
    icon: Cpu,
    path: "/gpu-cost",
    tagline: "Precise estimation for GPU workloads.",
    desc: "Stop guessing your AI infrastructure costs. Real-time pricing and performance estimation for NVIDIA and AMD hardware across all major clouds."
  }
];

const ProductDetail = () => {
  return (
    <div className="pt-40 pb-32 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-zolix-beige px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8 border border-zolix-dark/5"
          >
            Sovereign C2O Engine • 9B Parameters
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter mb-8 leading-[0.9] text-zolix-dark">Our Core Products.</h1>
          <p className="text-xl text-zolix-dark/40 font-bold max-w-2xl mx-auto leading-relaxed">
            Powerful tools designed to give you complete control over your infrastructure spending in the AI-first economy.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {products.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group bg-zolix-beige p-12 rounded-[50px] border border-zolix-dark/5 hover:bg-zolix-dark transition-all duration-500 flex flex-col h-full shadow-sm hover:shadow-2xl"
            >
              <div className="w-16 h-16 bg-zolix-orange rounded-[24px] flex items-center justify-center text-white mb-10 group-hover:scale-110 transition-transform shadow-lg shadow-zolix-orange/20">
                <product.icon size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-3 group-hover:text-white transition-colors">{product.title}</h2>
              <p className="text-zolix-orange font-bold uppercase tracking-widest text-[10px] mb-8">{product.tagline}</p>
              <p className="text-zolix-dark/5 group-hover:text-white/40 text-base leading-relaxed mb-12 font-medium flex-grow">{product.desc}</p>
              
              <Link href={product.path} className="inline-flex items-center gap-4 font-bold uppercase tracking-widest text-[10px] group-hover:text-zolix-orange transition-colors">
                Explore Deep-Dive <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* C2O Engine Science Section */}
        <div className="p-10 md:p-24 bg-zolix-dark text-white rounded-[80px] relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(220,106,79,0.1),transparent)] pointer-events-none" />
          
          <div className="max-w-4xl relative z-10">
            <div className="inline-flex items-center gap-2 bg-zolix-orange px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest mb-10">
              <ShieldCheck size={16} /> The Science of Sovereign AI
            </div>
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-10 leading-[0.9]">
              Inside the <span className="text-zolix-orange italic">C2O Engine</span>
            </h2>
            <p className="text-2xl text-white/40 font-bold leading-relaxed mb-20">
              ZOLIX AI is built on a proprietary Sovereign AI architecture. Unlike legacy FinOps tools that rely on simple threshold rules, C2O uses deep neural networks to predict and remediate cloud waste before it happens.
            </p>

            <div className="grid md:grid-cols-3 gap-16">
              <div className="space-y-8">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-zolix-orange border border-white/10">
                  <Binary size={32} />
                </div>
                <div>
                  <div className="text-5xl font-extrabold mb-3">9B</div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/30">Model Parameters</div>
                  <p className="mt-6 text-sm text-white/40 leading-relaxed font-medium">
                    A massive parameter space allows the engine to understand complex multi-cloud dependencies and inference patterns.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-zolix-orange border border-white/10">
                  <Database size={32} />
                </div>
                <div>
                  <div className="text-5xl font-extrabold mb-3">2M+</div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/30">Data Points</div>
                  <p className="mt-6 text-sm text-white/40 leading-relaxed font-medium">
                    Trained on real-world infrastructure telemetry, scaling events, and billing anomalies across global hyperscalers.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-zolix-orange border border-white/10">
                  <CpuIcon size={32} />
                </div>
                <div>
                  <div className="text-5xl font-extrabold mb-3">10K+</div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/30">Best Practices</div>
                  <p className="mt-6 text-sm text-white/40 leading-relaxed font-medium">
                    Embedded knowledge from global FinOps standards, ensuring every recommendation is compliant and performant.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
