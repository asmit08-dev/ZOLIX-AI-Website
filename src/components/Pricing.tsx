"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Zap, Shield, Globe, Mail } from 'lucide-react';
import LinkedinIcon from './icons/LinkedinIcon';
import TwitterIcon from './icons/TwitterIcon';

const tiers = [
  {
    name: "Cloud FinOps",
    price: "Custom",
    desc: "Enterprise-grade cloud cost management.",
    features: ["Multi-cloud visibility", "Automated rightsizing", "Anomaly detection", "Unit economics tracking"],
    icon: Globe,
    color: "bg-zolix-dark",
    textColor: "text-white"
  },
  {
    name: "AI FinOps",
    price: "Usage-based",
    desc: "Specialized financial ops for LLM workloads.",
    features: ["Token cost tracking", "Inference optimization", "GPU cluster management", "Model ROI analysis"],
    icon: Zap,
    color: "bg-zolix-orange",
    textColor: "text-white",
    popular: true
  },
  {
    name: "GPU Calculator",
    price: "Free",
    desc: "Precise estimation for GPU instances.",
    features: ["NVIDIA/AMD comparison", "TCO analysis", "Availability monitoring", "Performance benchmarking"],
    icon: Shield,
    color: "bg-white",
    textColor: "text-zolix-dark"
  }
];

const Pricing = () => {
  return (
    <div className="pt-40 pb-32 px-6 bg-zolix-beige min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">Transparent Pricing</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your scale. Contact <a href="mailto:info@zolix.ai" className="text-zolix-orange font-bold">info@zolix.ai</a> for custom quotes.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-24">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative p-10 rounded-[40px] border border-zolix-dark/5 shadow-2xl ${tier.color} ${tier.textColor} flex flex-col`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-zolix-orange border border-zolix-orange px-5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <tier.icon size={32} className="mb-6" />
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="text-4xl font-bold mb-4">{tier.price}</div>
                <p className="opacity-70 text-sm font-medium">{tier.desc}</p>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {tier.features.map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                      <Check size={12} className={tier.color === 'bg-white' ? 'text-zolix-orange' : 'text-white'} />
                    </div>
                    <span className="font-medium text-sm">{f}</span>
                  </div>
                ))}
              </div>

              <a href="https://lite.zolix.ai/signup" target="_blank" rel="noreferrer" className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 ${
                tier.color === 'bg-white' ? 'bg-zolix-dark text-white' : 'bg-white text-zolix-dark'
              }`}>
                Get Started <ArrowRight size={18} />
              </a>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-[50px] p-10 md:p-16 border border-zolix-dark/5 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex gap-4 mb-8">
                <a href="https://www.linkedin.com/company/zolix-ai-engine" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-zolix-beige flex items-center justify-center hover:bg-zolix-orange hover:text-white transition-all">
                  <LinkedinIcon size={20} />
                </a>
                <a href="https://x.com/Zolix_AI" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-zolix-beige flex items-center justify-center hover:bg-zolix-orange hover:text-white transition-all">
                  <TwitterIcon size={20} />
                </a>
              </div>
              
              <h3 className="text-4xl font-bold tracking-tighter mb-6">Request a Demo</h3>
              <p className="text-lg text-gray-500 font-medium mb-10">
                Ready to see ZOLIX AI in action? Choose your preferred way to connect with our team.
              </p>

              <div className="space-y-4">
                <a href="mailto:info@zolix.ai" className="flex items-center gap-5 p-5 bg-zolix-beige rounded-2xl hover:bg-zolix-dark hover:text-white transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center group-hover:bg-zolix-orange">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-60">Email Us</div>
                    <div className="text-lg font-bold">info@zolix.ai</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-zolix-beige p-10 rounded-[40px] text-center border border-zolix-dark/5">
              <div className="w-48 h-48 bg-white mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
                <Image
                  src="/assets/whatsapp-qr.webp"
                  alt="WhatsApp QR Code"
                  width={819}
                  height={819}
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <h4 className="text-xl font-bold mb-3">WhatsApp QR</h4>
              <p className="text-gray-500 text-sm font-medium mb-6">Scan to chat instantly with a <br /> FinOps expert on WhatsApp.</p>
              <a href="https://wa.me/your_number" target="_blank" rel="noreferrer" className="inline-block bg-zolix-dark text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-zolix-orange transition-colors">
                Open WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
