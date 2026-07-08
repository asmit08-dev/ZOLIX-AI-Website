import { Cpu, CheckCircle2, Globe, Shield, BarChart3 } from 'lucide-react';

const GPUCost = () => {
  return (
    <div className="pt-40 pb-32 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center mb-32">
          <div>
            <div className="w-16 h-16 bg-zolix-orange rounded-[24px] flex items-center justify-center text-white mb-8 shadow-xl shadow-zolix-orange/20">
              <Cpu size={32} />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">GPU Calculator</h1>
            <p className="text-xl text-gray-500 font-medium mb-10 leading-relaxed">
              Stop guessing your AI infrastructure costs. Our GPU Calculator provides real-time pricing and performance estimation for NVIDIA and AMD hardware across all major providers. Compare before you buy.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://lite.zolix.ai/signup" target="_blank" rel="noreferrer" className="bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-zolix-orange transition-all">
                Calculate Now
              </a>
            </div>
          </div>
          <div className="bg-zolix-beige rounded-[48px] p-12 aspect-square flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-zolix-orange/10 to-transparent" />
            <Cpu size={200} className="text-zolix-orange/20" />
          </div>
        </div>

        {/* Marketplace Comparison Detail */}
        <div className="mb-32">
          <h2 className="text-3xl font-bold mb-12 border-b border-black/5 pb-6">Marketplace Comparison Engine</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-10 bg-zolix-beige rounded-[40px] border border-black/5">
              <h3 className="text-2xl font-bold mb-6">Hardware TCO Analysis</h3>
              <p className="text-gray-500 font-medium leading-relaxed mb-8">
                We compare the total cost of ownership for **NVIDIA H100, A100, L40S** and **AMD MI300** across hyperscalers (AWS, Azure, GCP) and specialized GPU clouds (CoreWeave, Lambda, Vultr).
              </p>
              <ul className="space-y-4">
                {["On-demand vs. Reserved pricing", "Interconnect costs (InfiniBand/Ethernet)", "Regional availability mapping", "Spot instance volatility tracking"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-black/60">
                    <div className="w-1.5 h-1.5 rounded-full bg-zolix-orange" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-10 bg-black text-white rounded-[40px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-zolix-orange/20 rounded-full blur-3xl" />
              <h3 className="text-2xl font-bold mb-6">Workload Matching</h3>
              <p className="text-gray-400 font-medium leading-relaxed mb-8">
                Don&apos;t overpay for hardware you don&apos;t need. Our engine recommends the optimal GPU based on your specific workload type.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-zolix-orange font-bold text-xs uppercase tracking-widest mb-2">LLM Training</div>
                  <div className="text-lg font-bold">H100 Clusters</div>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-zolix-orange font-bold text-xs uppercase tracking-widest mb-2">Inference</div>
                  <div className="text-lg font-bold">L4 / A10G</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-32">
          {[
            { icon: Globe, title: "Global Availability", desc: "Monitor H100 and A100 availability across 15+ cloud regions globally in real-time." },
            { icon: BarChart3, title: "TCO Analysis", desc: "Compare the total cost of ownership for on-prem vs. cloud GPU deployments including power and cooling." },
            { icon: Shield, title: "Spot Pricing", desc: "Real-time alerts for spot instance availability and price drops across all major providers." }
          ].map((item, i) => (
            <div key={i} className="p-10 bg-zolix-beige rounded-[40px] border border-black/5">
              <item.icon className="text-zolix-orange mb-6" size={32} />
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-black text-white rounded-[60px] p-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-12 text-center">Calculator Capabilities</h2>
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              {[
                "NVIDIA H100/A100 vs. AMD MI300 performance comparison",
                "Workload-specific hardware recommendations (LLM vs. CV)",
                "Performance-per-dollar benchmarking across 15+ providers",
                "Automated reservation planning for long-term clusters"
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="text-zolix-orange mt-1 shrink-0" size={20} />
                  <span className="text-lg font-medium opacity-80">{f}</span>
                </div>
              ))}
            </div>
            <div className="bg-white/5 rounded-3xl p-10 border border-white/10">
              <h4 className="text-zolix-orange font-bold uppercase tracking-widest text-xs mb-6">Hardware Intelligence</h4>
              <p className="text-gray-400 mb-8 leading-relaxed">Our calculator accounts for power, cooling, and interconnect costs (InfiniBand vs. Ethernet) to give you a true price.</p>
              <div className="text-4xl font-bold text-white mb-2">99.2%</div>
              <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">Pricing Accuracy Guarantee</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPUCost;
