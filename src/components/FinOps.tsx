"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle2, Plus } from 'lucide-react';
import JsonLd from './JsonLd';
import { faqSchema } from '@/lib/schema';

const FinOps = () => {
  const [spend, setSpend] = useState(10000);

  const faqs = [
    { q: "Do I really need to give IAM access?", a: "No. ZOLIX AI only needs your CUR (Cost & Usage Report) file. We never touch your live infrastructure or need IAM roles for discovery." },
    { q: "Which clouds are supported?", a: "We support AWS, Azure, GCP, and OCI natively with specialized C2O models for each hyperscaler." },
    { q: "Is it really free to start?", a: "Yes. Your first scan is free forever for small teams. No credit card required. No sales call needed." },
    { q: "Is ZOLIX LITE secure?", a: "ZOLIX is SOC2 Type II compliant. Your data is encrypted at rest and in transit, and we never train public LLMs on your financial metadata." }
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <JsonLd data={faqSchema(faqs)} />
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 text-center mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-zolix-beige/50 px-4 py-1.5 rounded-full mb-8 border border-zolix-dark/5"
        >
          <span className="text-[9px] font-bold uppercase tracking-widest text-zolix-dark/60">60-Second Scan • No IAM Access • SOC2 Compliant</span>
        </motion.div>
        
        <h1 className="text-6xl md:text-[100px] font-extrabold tracking-tighter mb-8 leading-[0.9] text-zolix-dark">
          Cloud cost <br className="hidden md:block" /> optimization in <br />
          <span className="text-zolix-orange italic">under 60 seconds.</span>
        </h1>
        
        <p className="text-xl text-zolix-dark/40 font-bold max-w-2xl mx-auto mb-12">
          ZOLIX AI is the fastest FinOps platform on the market. Just upload your CUR file and see your savings — without surrendering IAM access or pulling out a credit card.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-24">
          <a href="https://lite.zolix.ai/signup" className="bg-zolix-orange text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-zolix-dark transition-all flex items-center gap-4 shadow-xl shadow-zolix-orange/20 group">
            See your savings — free <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <button className="bg-white text-zolix-dark border border-zolix-dark/10 px-10 py-5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-zolix-beige transition-all flex items-center gap-4">
            <Play size={16} fill="currentColor" /> How it works
          </button>
        </div>

        {/* Dashboard Mockup */}
        <div className="relative max-w-6xl mx-auto">
          <div className="absolute -inset-10 bg-zolix-orange/5 blur-[120px] rounded-full" />
          <div className="relative bg-white border border-zolix-dark/5 rounded-[48px] shadow-[0_40px_100px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="bg-zolix-beige/30 px-8 py-5 border-b border-zolix-dark/5 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-zolix-dark/20">ZOLIX LITE DASHBOARD</div>
            </div>
            <div className="p-10 md:p-16 text-left">
              <div className="grid lg:grid-cols-2 gap-20">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-zolix-dark/30 mb-4">Real-time Savings Analysis</div>
                  <div className="text-7xl font-extrabold mb-4 text-zolix-dark">$48,720<span className="text-2xl text-zolix-dark/20">/mo</span></div>
                  <div className="text-[11px] font-bold text-zolix-orange uppercase tracking-widest bg-zolix-orange/5 inline-block px-4 py-1 rounded-full">~32% reduction vs current spend</div>
                  
                  <div className="mt-16 h-48 flex items-end gap-3">
                    {[40, 60, 45, 70, 55, 90, 85].map((h, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.1, duration: 1 }}
                        className={`flex-1 rounded-t-2xl ${i === 6 ? 'bg-zolix-orange' : 'bg-zolix-beige'}`} 
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-zolix-dark/30">Top Recommendations</div>
                    <div className="text-[10px] font-bold text-zolix-orange uppercase tracking-widest">View All</div>
                  </div>
                  {[
                    { p: "AWS", t: "Compute instance rightsizing", s: "$12,420" },
                    { p: "Azure", t: "Unused disk termination", s: "$8,110" },
                    { p: "GCP", t: "BigQuery slot optimization", s: "$5,400" },
                    { p: "OCI", t: "Flexible shape tuning", s: "$3,180" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-6 bg-zolix-beige/20 rounded-[32px] border border-zolix-dark/5 hover:border-zolix-orange/20 transition-all group">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-zolix-orange font-bold text-xs shadow-sm group-hover:bg-zolix-orange group-hover:text-white transition-colors">{item.p}</div>
                        <div className="text-sm font-bold text-zolix-dark">{item.t}</div>
                      </div>
                      <div className="text-sm font-bold text-zolix-orange">{item.s}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-32 bg-zolix-beige/20 border-y border-zolix-dark/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 text-zolix-dark">
              Fortune 500, PSUs & the <br /> world&apos;s <span className="text-zolix-orange italic">fastest-growing</span> teams.
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { v: "$20M+", l: "Cloud spend optimized" },
              { v: "250+", l: "Teams onboarded" },
              { v: "100+", l: "Cloud regions managed" },
              { v: "SOC 2", l: "Type II Certified" }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-10 rounded-[40px] border border-zolix-dark/5 text-center shadow-sm hover:shadow-xl transition-all">
                <div className="text-4xl font-extrabold text-zolix-dark mb-3">{stat.v}</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-zolix-dark/30">{stat.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Savings Estimator */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-white p-12 md:p-24 rounded-[80px] border border-zolix-dark/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-zolix-orange/5 blur-[100px] -mr-32 -mt-32" />
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extrabold tracking-tighter mb-6">Estimate your savings <span className="text-zolix-orange italic">in 5 seconds.</span></h2>
            <p className="text-xl text-zolix-dark/40 font-bold">Move the slider to your monthly cloud spend.</p>
          </div>
          
          <div className="mb-20">
            <div className="flex justify-between items-end mb-8">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-zolix-dark/30">Monthly Cloud Spend</span>
              <span className="text-4xl font-extrabold text-zolix-dark">${spend.toLocaleString()}</span>
            </div>
            <div className="relative h-4 bg-zolix-beige rounded-full">
              <input 
                type="range" 
                min="1000" 
                max="100000" 
                step="1000"
                value={spend}
                onChange={(e) => setSpend(parseInt(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div 
                className="absolute top-0 left-0 h-full bg-zolix-orange rounded-full" 
                style={{ width: `${(spend / 100000) * 100}%` }} 
              />
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white border-4 border-zolix-orange rounded-full shadow-lg"
                style={{ left: `calc(${(spend / 100000) * 100}% - 16px)` }}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="p-12 bg-zolix-beige/40 rounded-[48px] border border-zolix-dark/5">
              <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-zolix-dark/30 mb-6">Projected Monthly Savings</div>
              <div className="text-5xl font-extrabold text-zolix-orange">${(spend * 0.32).toLocaleString()}</div>
              <p className="mt-6 text-[10px] font-bold text-zolix-dark/40 uppercase tracking-widest">That&apos;s ${(spend * 0.32 * 12).toLocaleString()} saved per year</p>
            </div>
            <div className="p-12 bg-zolix-dark text-white rounded-[48px] flex flex-col justify-center">
              <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-zolix-orange mb-8">ZOLIX AI Guarantee</div>
              <ul className="space-y-5">
                {["Avg. resource identified: 42%", "Recommendation accuracy: 99.2%", "Time to first insight: < 60 sec"].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-sm font-bold">
                    <CheckCircle2 size={18} className="text-zolix-orange" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Built for Engineers */}
      <section className="py-32 px-6 bg-zolix-beige/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8">
              Built for engineers who&apos;d <br /> rather <span className="text-zolix-orange italic">ship</span> than spreadsheet.
            </h2>
            <p className="text-xl text-zolix-dark/40 font-bold max-w-3xl mx-auto">
              Cloud FinOps shouldn&apos;t take a quarter to roll out. ZOLIX LITE replaces clunky dashboards and weeks of audit prep with a fast, AI-driven view of your spend.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { t: "< 60 SEC.", l: "Time to first insight", d: "From signup to a ranked list of savings opportunities in less than a minute. No demo calls, no waitlists — just a release." },
              { t: "0 IAM", l: "Roles & Access", d: "Read-only billing data only. We never touch your infrastructure, your network, or your production logs. Security teams approve in minutes." },
              { t: "~30%", l: "Typical Bill Reduction", d: "Across our customer base, teams starting on ZOLIX LITE identify over 30% of savings using AI-prioritized recommendations." }
            ].map((card, i) => (
              <div key={i} className="bg-white p-12 rounded-[50px] border border-zolix-dark/5 shadow-sm hover:shadow-2xl transition-all">
                <div className="text-4xl font-extrabold text-zolix-dark mb-4">{card.t}</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-zolix-orange mb-8">{card.l}</div>
                <p className="text-zolix-dark/50 font-bold leading-relaxed text-sm">{card.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Steps */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8">Three steps. <span className="text-zolix-orange italic">One coffee.</span></h2>
            <p className="text-xl text-zolix-dark/40 font-bold">No agents to install, no IAM roles to negotiate, no procurement costs.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-20">
            {[
              { i: "i.", t: "Sign up — free", d: "Create your ZOLIX AI account in seconds. No credit card, no sales call, no waitlists — just an email and a password." },
              { i: "ii.", t: "Pick your cloud, upload your CUR", d: "Select AWS, Azure, GCP, or OCI — then drop in your Cost & Usage Report file. Read-only, no access required." },
              { i: "iii.", t: "Get recommendations in <60 sec", d: "Our C2O engine delivers a curated list of saving actions you can run with AI automation or step-by-step playbooks." }
            ].map((step, i) => (
              <div key={i}>
                <div className="text-5xl font-extrabold text-zolix-orange mb-8">{step.i}</div>
                <h3 className="text-2xl font-bold mb-6 text-zolix-dark">{step.t}</h3>
                <p className="text-zolix-dark/50 font-bold leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-6 bg-zolix-beige/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block bg-zolix-orange text-white px-5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">Common Questions</div>
            <h2 className="text-5xl font-extrabold tracking-tighter">The fast <span className="text-zolix-orange">FAQ.</span></h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white rounded-[32px] border border-zolix-dark/5 overflow-hidden">
                <summary className="p-10 font-bold text-xl cursor-pointer flex items-center justify-between list-none">
                  {faq.q}
                  <div className="w-10 h-10 rounded-full bg-zolix-beige flex items-center justify-center group-open:rotate-45 transition-transform">
                    <Plus size={18} className="text-zolix-dark" />
                  </div>
                </summary>
                <div className="px-10 pb-10 text-zolix-dark/50 font-bold leading-relaxed text-lg">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-6 text-center bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-6xl md:text-[110px] font-extrabold tracking-tighter mb-16 leading-[0.85]">
            Your cloud bill, <span className="text-zolix-orange italic">cut</span>—by the time your coffee finishes brewing.
          </h2>
          <a href="https://lite.zolix.ai/signup" className="bg-zolix-orange text-white px-16 py-6 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-zolix-dark transition-all shadow-2xl shadow-zolix-orange/30 group">
            Start optimizing — free <ArrowRight size={18} className="inline-block ml-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="mt-12 text-[10px] font-bold uppercase tracking-[0.3em] text-zolix-dark/30">Free forever for small teams. No credit card. No IAM. No demo call.</p>
        </div>
      </section>
    </div>
  );
};

export default FinOps;
