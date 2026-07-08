"use client";

import { motion } from 'framer-motion';
import { BrainCircuit, Globe, Database, Binary } from 'lucide-react';

const usps = [
  {
    icon: BrainCircuit,
    title: "Sovereign AI C2O",
    desc: "The world's first autonomous engine built specifically for the massive overhead of AI infrastructure. 9B Parameters."
  },
  {
    icon: Globe,
    title: "100+ Cloud Services",
    desc: "Comprehensive visibility across AWS, Azure, GCP, OCI, and specialized GPU clouds with zero-agent discovery."
  },
  {
    icon: Database,
    title: "2M+ Private Data",
    desc: "Trained on millions of private infrastructure telemetry points for unmatched accuracy and enterprise security."
  },
  {
    icon: Binary,
    title: "Pseudo-Code Actions",
    desc: "World's first engine providing instant pseudo-code recommendations for sub-second remediation."
  }
];

const USP = () => {
  return (
    <section data-nav-theme="beige" className="py-32 px-6 bg-zolix-beige">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">Why ZOLIX?</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
            Traditional FinOps tools were built for VMs. We built ZOLIX for the AI-first enterprise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {usps.map((usp, i) => (
            <motion.div
              key={usp.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-10 bg-white rounded-[40px] border border-black/5 hover:shadow-2xl transition-all group"
            >
              <div className="w-16 h-16 rounded-3xl bg-zolix-beige flex items-center justify-center mb-8 group-hover:bg-zolix-orange group-hover:text-white transition-colors">
                <usp.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{usp.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed text-sm">{usp.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default USP;
