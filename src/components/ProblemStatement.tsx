"use client";

import { motion } from 'framer-motion';
import { TrendingDown, ZapOff, Radar, Activity, ShieldAlert } from 'lucide-react';

const ProblemStatement = () => {
  return (
    <section
      data-nav-theme="orange"
      className="py-32 px-6 bg-zolix-orange text-white overflow-hidden relative"
    >
      {/* Radar Scan Effect — a CSS keyframe animation rather than a framer-motion
          `repeat: Infinity` one. Both look identical, but the JS version drove a
          1000px element from the main thread for the entire session, on screen
          or not; the CSS transform runs on the compositor instead. */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] pointer-events-none">
        <div className="radar-spin w-full h-full border border-white/10 rounded-full relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1/2 bg-gradient-to-t from-transparent to-white/20 blur-sm origin-bottom" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 bg-white/10 px-6 py-2 rounded-full mb-10 border border-white/20"
            >
              <ShieldAlert size={18} className="text-white animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest">The 2026 Crisis Detected</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-12 leading-[0.95] text-white">
              Why Cloud Cost <br />
              Management Tools <br />
              <span className="text-zolix-dark italic">Fall Short</span>
            </h2>

            <p className="text-xl text-white/80 font-medium max-w-xl leading-relaxed mb-10">
              Traditional FinOps tools were built for virtual machines and static workloads. They weren&apos;t built for GPU clusters, LLM inference costs, or infrastructure that scales 10x overnight.
            </p>

            <p className="text-lg font-bold text-white max-w-xl leading-relaxed mb-12">
              Zolix was built to close these gaps - not patch around them.
            </p>

            <div className="grid grid-cols-2 gap-8">
              <div className="p-8 bg-white/10 rounded-3xl border border-white/10 group hover:bg-white/20 transition-all">
                <TrendingDown className="text-white mb-4" size={32} />
                <div className="text-3xl font-bold mb-2">$300Bn+</div>
                <div className="text-[9px] font-bold uppercase tracking-widest opacity-60">Annual Cloud Waste</div>
              </div>
              <div className="p-8 bg-white/10 rounded-3xl border border-white/10 group hover:bg-white/20 transition-all">
                <ZapOff className="text-white mb-4" size={32} />
                <div className="text-3xl font-bold mb-2">4.2x</div>
                <div className="text-[9px] font-bold uppercase tracking-widest opacity-60">AI Cost Multiplier</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-zolix-dark border border-white/10 rounded-[60px] p-12 overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-zolix-orange to-transparent animate-pulse" />
              
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <Activity size={16} className="text-zolix-orange" />
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 text-white">Live C2O Engine Analysis</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                </div>
              </div>

              <div className="space-y-8">
                {[
                  "Legacy tools flag problems. They don't fix them.",
                  "Threshold-based alerts miss AI-specific waste patterns.",
                  "Multi-cloud visibility is fragmented across separate dashboards.",
                  "GPU and inference costs get buried inside general computer spend."
                ].map((label) => (
                  <div key={label} className="flex items-center gap-6 group">
                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-zolix-orange transition-colors">
                      <Radar size={20} className="text-white/20 group-hover:text-white" />
                    </div>
                    <span className="text-base font-bold opacity-60 group-hover:opacity-100 transition-opacity text-white leading-snug">{label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-10 border-t border-white/5 text-center">
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-30 text-white mb-4">Scanning 10,000+ Best Practices...</div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="scan-sweep h-full w-1/3 bg-zolix-orange" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemStatement;
