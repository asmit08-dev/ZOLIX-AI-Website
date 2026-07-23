"use client";

import { motion } from "framer-motion";
import { Calculator, Code2, LineChart } from "lucide-react";

const STAKEHOLDERS = [
  {
    title: "For FinOps Teams",
    desc: "Automated cost allocation and governance without slowing down engineering.",
    icon: Calculator,
  },
  {
    title: "For Engineers",
    desc: "Real-time usage data and rightsizing recommendations, without digging through four cloud consoles.",
    icon: Code2,
  },
  {
    title: "For Leadership",
    desc: "One consolidated view of total cloud and AI spend, with forecasts you can actually plan around.",
    icon: LineChart,
  },
];

const StakeholderAlignment = () => {
  return (
    <section data-nav-theme="beige" className="py-32 px-6 bg-zolix-beige">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mb-20">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-zolix-orange mb-6">
            One Platform, Every Stakeholder
          </div>
          <h2 className="text-3xl md:text-6xl font-bold tracking-tighter text-zolix-dark leading-[1.02] mb-8">
            Engineering, Finance, and Leadership - Aligned on the Same Numbers
          </h2>
          <p className="text-xl text-zolix-dark/50 font-medium leading-relaxed">
            No more reconciling three different dashboards before a budget meeting. Zolix gives every
            team the view they need, pulled from the same source of truth.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {STAKEHOLDERS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-10 bg-white rounded-[40px] border border-zolix-dark/5 h-full hover:bg-zolix-dark transition-all duration-500"
            >
              <div className="w-14 h-14 bg-zolix-orange rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform">
                <item.icon size={26} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-zolix-dark group-hover:text-white transition-colors">
                {item.title}
              </h3>
              <p className="text-zolix-dark/50 group-hover:text-white/50 leading-relaxed font-medium transition-colors">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StakeholderAlignment;
