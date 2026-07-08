"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Play } from 'lucide-react';
import JsonLd from '../JsonLd';
import { faqSchema } from '@/lib/schema';

const CloudFinOps = () => {
  const [spend, setSpend] = useState(10000);

  const faqs = [
    { q: "Do I really need to give IAM access?", a: "No. ZOLIX AI only needs your CUR (Cost & Usage Report) file. We never touch your live infrastructure or need IAM roles." },
    { q: "Which clouds are supported?", a: "We support AWS, Azure, GCP, and OCI natively with specialized C2O models for each." },
    { q: "Is it really free to start?", a: "Yes. Your first scan is free forever for small teams. No credit card required." },
    { q: "Is ZOLIX LITE secure?", a: "ZOLIX is SOC2 Type II compliant. Your data is encrypted at rest and in transit, and we never train public LLMs on your financial data." }
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <JsonLd data={faqSchema(faqs)} />
      {/* Hero Section - Image Based */}
      <section className="max-w-7xl mx-auto px-6 text-center mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-zolix-beige px-4 py-1 rounded-full mb-8 border border-black/5"
        >
          <span className="text-[8px] font-bold uppercase tracking-widest text-black/60">60-Second Scan • No IAM Access • SOC2 Compliant</span>
        </motion.div>
        
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-tight">
          Cloud cost optimization in <br />
          <span className="text-zolix-orange">under 60 seconds.</span>
        </h1>
        
        <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto mb-12">
          ZOLIX AI is the fastest FinOps platform on the market. Just upload your CUR file and see your savings — without outsourcing IAM access or pulling out a credit card.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-20">
          <a href="https://lite.zolix.ai/signup" className="bg-zolix-orange text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-black transition-all flex items-center gap-3">
            See your savings — free <ArrowRight size={14} />
          </a>
          <button className="bg-white text-black border border-black/10 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-zolix-beige transition-all flex items-center gap-3">
            <Play size={14} fill="currentColor" /> How it works
          </button>
        </div>

        {/* Dashboard Mockup Visual */}
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute -inset-4 bg-zolix-orange/5 blur-3xl rounded-full" />
          <div className="relative bg-white border border-black/5 rounded-[32px] shadow-2xl overflow-hidden">
            <div className="bg-zolix-beige/50 px-6 py-4 border-b border-black/5 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <div className="text-[8px] font-bold uppercase tracking-widest text-black/20">ZOLIX LITE DASHBOARD</div>
            </div>
            <div className="p-8 md:p-12 text-left">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Real-time Savings Analysis</div>
                  <div className="text-6xl font-bold mb-4 text-black">$48,720<span className="text-xl text-gray-400">/mo</span></div>
                  <div className="text-[10px] font-bold text-green-500 uppercase tracking-widest">~32% reduction vs current spend</div>
                  
                  <div className="mt-12 h-32 flex items-end gap-2">
                    {[40, 60, 45, 70, 55, 90, 85].map((h, i) => (
                      <div key={i} className={`flex-1 rounded-t-lg ${i === 6 ? 'bg-zolix-orange' : 'bg-zolix-beige'}`} style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Top Recommendations</div>
                  {[
                    { p: "AWS", t: "Compute instance rightsizing", s: "$12,420" },
                    { p: "Azure", t: "Unused disk termination", s: "$8,110" },
                    { p: "GCP", t: "BigQuery slot optimization", s: "$5,400" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-zolix-beige/30 rounded-2xl border border-black/5">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-zolix-orange font-bold text-[10px]">{item.p}</div>
                        <div className="text-xs font-bold">{item.t}</div>
                      </div>
                      <div className="text-xs font-bold text-zolix-orange">{item.s}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-24 bg-zolix-beige/30 border-y border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Fortune 500, PSUs & the <br /> world&apos;s <span className="text-zolix-orange italic">fastest-growing</span> teams.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: "$20M+", l: "Cloud spend optimized" },
              { v: "250+", l: "Teams onboarded" },
              { v: "100+", l: "Cloud regions managed" },
              { v: "SOC 2", l: "Type II Certified" }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-[32px] border border-black/5 text-center">
                <div className="text-3xl font-bold text-black mb-2">{stat.v}</div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{stat.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Savings Estimator Slider */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto bg-white p-12 md:p-20 rounded-[60px] border border-black/5 shadow-xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Estimate your savings <span className="text-zolix-orange">in 5 seconds.</span></h2>
            <p className="text-gray-500 font-medium">Move the slider to your monthly cloud spend. We&apos;ll project your savings.</p>
          </div>
          
          <div className="mb-16">
            <div className="flex justify-between mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Monthly Cloud Spend</span>
              <span className="text-2xl font-bold text-black">${spend.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="1000" 
              max="100000" 
              step="1000"
              value={spend}
              onChange={(e) => setSpend(parseInt(e.target.value))}
              className="w-full h-2 bg-zolix-beige rounded-lg appearance-none cursor-pointer accent-zolix-orange"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-zolix-beige/50 rounded-[32px] border border-black/5">
              <div className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-4">Projected Monthly Savings</div>
              <div className="text-4xl font-bold text-zolix-orange">${(spend * 0.32).toLocaleString()}</div>
              <p className="mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">That&apos;s ${(spend * 0.32 * 12).toLocaleString()} saved per year</p>
            </div>
            <div className="p-8 bg-black text-white rounded-[32px]">
              <div className="text-[9px] font-bold uppercase tracking-widest text-zolix-orange mb-4">ZOLIX AI Guarantee</div>
              <ul className="space-y-3">
                {["Avg. resource identified: 42%", "Recommendation accuracy: 99.2%", "Time to first insight: < 60 sec"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs font-bold">
                    <CheckCircle2 size={14} className="text-zolix-orange" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Three Steps Section */}
      <section className="py-32 bg-zolix-beige/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Three steps. <span className="text-zolix-orange">One coffee.</span></h2>
            <p className="text-gray-500 font-medium">No agents to install, no IAM roles to negotiate, no procurement costs.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { i: "i.", t: "Sign up — free", d: "Create your ZOLIX AI account in seconds. No credit card, no sales call, no waitlists — just an email and a password." },
              { i: "ii.", t: "Pick your cloud, upload your CUR", d: "Select AWS, Azure, GCP, or OCI — then drop in your Cost & Usage Report file. Read-only, no access required." },
              { i: "iii.", t: "Get recommendations in <60 sec", d: "Our C2O engine delivers a curated list of saving actions you can run with AI automation or step-by-step playbooks." }
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="text-4xl font-bold text-zolix-orange mb-6">{step.i}</div>
                <h3 className="text-2xl font-bold mb-4">{step.t}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-zolix-beige px-4 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest mb-4">Common Questions</div>
            <h2 className="text-4xl font-bold tracking-tight">The fast <span className="text-zolix-orange">FAQ.</span></h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-zolix-beige/30 rounded-3xl border border-black/5 overflow-hidden">
                <summary className="p-8 font-bold text-lg cursor-pointer flex items-center justify-between list-none">
                  {faq.q}
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-open:rotate-45 transition-transform">
                    <ArrowRight size={14} className="rotate-90" />
                  </div>
                </summary>
                <div className="px-8 pb-8 text-gray-500 font-medium leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-12">
            Your cloud bill, <span className="text-zolix-orange italic">cut</span>—by the time your coffee finishes brewing.
          </h2>
          <a href="https://lite.zolix.ai/signup" className="bg-zolix-orange text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black transition-all shadow-2xl shadow-zolix-orange/20">
            Start optimizing — free
          </a>
          <p className="mt-8 text-[9px] font-bold uppercase tracking-widest text-gray-400">Free forever for small teams. No credit card. No IAM. No demo call.</p>
        </div>
      </section>
    </div>
  );
};

export default CloudFinOps;
