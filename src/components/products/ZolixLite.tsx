import { ShieldCheck, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

const ZolixLite = () => {
  return (
    <div className="pt-40 pb-32 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mb-24">
          <div className="inline-flex items-center gap-2 bg-zolix-orange text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8">
            Lite Edition — Free Forever
          </div>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-tight text-zolix-dark">
            ZOLIX <span className="text-zolix-orange">Lite</span>
          </h1>
          <p className="text-xl text-zolix-dark/40 font-bold leading-relaxed mb-12">
            Experience the power of the C2O Engine for free. ZOLIX Lite offers zero-agent discovery, CUR integration, and AI Planner. Perfect for startups and mid-market teams with cloud spend under $25,000/month.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <a href="https://lite.zolix.ai/signup" className="bg-zolix-dark text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-zolix-orange transition-all inline-flex items-center justify-center gap-3 shadow-xl shadow-zolix-dark/10">
              Get Started Free <ArrowRight size={16} />
            </a>
            <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-zolix-beige/50 border border-zolix-dark/5">
              <ShieldCheck className="text-zolix-orange" size={20} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zolix-dark/60">No Credit Card Required</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-32">
          <div className="bg-zolix-beige/40 p-12 md:p-16 rounded-[60px] border border-zolix-dark/5">
            <h2 className="text-2xl font-bold mb-10 text-zolix-dark">Core Capabilities</h2>
            <ul className="space-y-8">
              {[
                { t: "Zero-Agent Discovery", d: "Connect via AWS CUR or Azure Billing Export in under 60 seconds." },
                { t: "AI Planner", d: "Precise GPU and model cost dimensioning for AI workloads." },
                { t: "100% Read-Only", d: "We only ingest billing metadata. No IAM roles or write access needed." },
                { t: "Instant Audit", d: "Detection of orphaned disks, idle balancers, and over-provisioned nodes." },
                { t: "Multi-Cloud View", d: "Unified visibility across AWS, Azure, GCP, and OCI." }
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-6 group">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-zolix-orange shadow-sm group-hover:bg-zolix-orange group-hover:text-white transition-colors">
                    <Zap size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-zolix-dark mb-1">{f.t}</div>
                    <div className="text-sm text-zolix-dark/50 font-medium leading-relaxed">{f.d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-col gap-8">
            <div className="p-12 bg-zolix-dark text-white rounded-[50px] shadow-2xl relative overflow-hidden flex-grow">
              <div className="absolute top-0 right-0 w-64 h-64 bg-zolix-orange/10 blur-[100px] -mr-32 -mt-32" />
              <h3 className="text-3xl font-bold mb-8 relative z-10">Why Lite?</h3>
              <p className="text-white/60 leading-relaxed mb-12 text-lg font-medium relative z-10">
                We believe every team deserves visibility. ZOLIX Lite provides a comprehensive audit and actionable rightsizing recommendations instantly, helping you stop cloud waste before it scales.
              </p>
              <div className="grid grid-cols-2 gap-8 relative z-10">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                  <div className="text-4xl font-bold text-zolix-orange mb-2">Day-1</div>
                  <div className="text-[9px] font-bold uppercase tracking-widest opacity-40">ROI Guaranteed</div>
                </div>
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                  <div className="text-4xl font-bold text-zolix-orange mb-2">&lt;60s</div>
                  <div className="text-[9px] font-bold uppercase tracking-widest opacity-40">Onboarding Time</div>
                </div>
              </div>
            </div>
            
            <div className="p-10 bg-zolix-orange text-white rounded-[40px] flex items-center justify-between group cursor-pointer hover:bg-zolix-dark transition-colors">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">Scaling beyond $25k/mo?</div>
                <div className="text-xl font-bold">Explore ZOLIX Advance</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-45 transition-transform">
                <ArrowRight size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Section */}
        <div className="py-24 border-t border-zolix-dark/5">
          <h2 className="text-3xl font-bold mb-16 text-center">Lite vs. Advance</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 rounded-3xl bg-zolix-beige/30 border border-zolix-dark/5">
              <h3 className="font-bold text-xl mb-6">ZOLIX Lite</h3>
              <ul className="space-y-4">
                {["CUR/Billing Export Only", "Read-Only Discovery", "AI Planner Included", "Community Support"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-zolix-dark/60 font-medium">
                    <CheckCircle2 size={16} className="text-zolix-orange" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 rounded-3xl bg-zolix-dark text-white">
              <h3 className="font-bold text-xl mb-6">ZOLIX Advance</h3>
              <ul className="space-y-4">
                {["Full IAM Automation", "Real-time Remediation", "Custom Chargebacks", "24/7 Priority Support"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/60 font-medium">
                    <CheckCircle2 size={16} className="text-zolix-orange" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZolixLite;
