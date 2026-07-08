import { BrainCircuit, CheckCircle2 } from 'lucide-react';

const AIFinOps = () => {
  return (
    <div className="pt-40 pb-32 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center mb-32">
          <div>
            <div className="w-16 h-16 bg-zolix-orange rounded-[24px] flex items-center justify-center text-white mb-8 shadow-xl shadow-zolix-orange/20">
              <BrainCircuit size={32} />
            </div>
            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 text-zolix-dark">AI FinOps</h1>
            <p className="text-xl text-zolix-dark/40 font-bold mb-10 leading-relaxed">
              The only platform built specifically for the massive financial overhead of AI infrastructure. Manage token costs, inference efficiency, and training ROI across the fragmented AI provider landscape.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://lite.zolix.ai/signup" target="_blank" rel="noreferrer" className="bg-zolix-dark text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-zolix-orange transition-all shadow-xl shadow-zolix-dark/10">
                Optimize AI Spend
              </a>
            </div>
          </div>
          <div className="bg-zolix-beige rounded-[48px] p-12 aspect-square flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-zolix-orange/10 to-transparent" />
            <BrainCircuit size={200} className="text-zolix-orange/20" />
          </div>
        </div>

        <div className="mb-32">
          <h2 className="text-3xl font-bold mb-12 border-b border-zolix-dark/5 pb-6 text-zolix-dark">AI Ecosystem Integration</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { provider: "OpenAI & Anthropic", focus: "Token Attribution", detail: "Granular tracking of prompt and completion tokens. Identifying high-cost users and optimizing model selection for Claude 3.5 and GPT-4o." },
              { provider: "AWS Bedrock", focus: "Model Orchestration", detail: "Managing provisioned throughput and optimizing costs for Llama, Titan, and Claude models within the AWS VPC." },
              { provider: "Azure OpenAI", focus: "Enterprise Quotas", detail: "Monitoring PTU (Provisioned Throughput Units) and managing shared capacity across global business units." },
              { provider: "GCP Vertex AI", focus: "MLOps Efficiency", detail: "Tracking costs for Gemini models and managing the financial overhead of custom training pipelines on Vertex." },
              { provider: "Oracle Data Science", focus: "GPU Clusters", detail: "Optimizing the cost of bare-metal GPU clusters for large-scale training and inference workloads." },
              { provider: "Private LLMs", focus: "Inference Density", detail: "Maximizing throughput per dollar for self-hosted models on Kubernetes clusters with H100/A100 support." }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-zolix-beige rounded-[32px] border border-zolix-dark/5 hover:bg-zolix-dark hover:text-white transition-all group">
                <div className="text-zolix-orange font-bold text-xl mb-2">{item.provider}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-4 opacity-60 group-hover:opacity-100">{item.focus}</div>
                <p className="text-zolix-dark/50 group-hover:text-white/60 text-sm font-bold leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zolix-dark text-white rounded-[60px] p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-zolix-orange/10 blur-[120px] -mr-48 -mt-48" />
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-12 text-center">AI-Native Features</h2>
          <div className="grid md:grid-cols-2 gap-16 relative z-10">
            <div className="space-y-8">
              {[
                "Token-level cost attribution for LLMs (OpenAI, Anthropic, Llama)",
                "Inference vs. Training cost analysis and forecasting",
                "Model efficiency benchmarking and performance tracking",
                "Automated scaling for inference clusters based on ROI",
                "Cross-provider model cost comparison engine"
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="text-zolix-orange mt-1 shrink-0" size={20} />
                  <span className="text-lg font-bold opacity-80">{f}</span>
                </div>
              ))}
            </div>
            <div className="bg-white/5 rounded-3xl p-10 border border-white/10 flex flex-col justify-center">
              <h4 className="text-zolix-orange font-bold uppercase tracking-widest text-[10px] mb-6">LLM Intelligence</h4>
              <p className="text-white/40 mb-8 leading-relaxed font-bold">ZOLIX identifies the most cost-effective model for your specific workload, balancing latency, accuracy, and cost.</p>
              <div className="text-5xl font-bold text-white mb-2">50%</div>
              <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">Reduction in Inference Costs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIFinOps;
