import { Zap, ArrowRight, Lock, Users, BarChart } from 'lucide-react';
import EmailComposeLink from "@/components/EmailComposeLink";

const ZolixAdvance = () => {
  return (
    <div className="pt-40 pb-32 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-24">
          <div className="inline-flex items-center gap-2 bg-zolix-orange text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8">
            Advance Edition
          </div>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-tight text-zolix-dark">
            Zolix <span className="text-zolix-orange">Advance</span>
          </h1>
          <p className="text-xl text-zolix-dark/40 font-bold leading-relaxed mb-12">
            Unlock enterprise-grade capabilities with ZOLIX Advance — the complete Cloud FinOps operating system. Designed for enterprises spending over $25,000/month on cloud infrastructure.
          </p>
          <EmailComposeLink className="bg-zolix-dark text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-zolix-orange transition-all inline-flex items-center gap-3 shadow-xl shadow-zolix-dark/10">
            Request Enterprise Demo <ArrowRight size={16} />
          </EmailComposeLink>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-24">
          {[
            { icon: Lock, title: "Deep IAM Access", desc: "Continuous 24/7 real-time optimization with secure automation." },
            { icon: Users, title: "RBAC & SSO", desc: "Role-Based Access Control and SAML/SSO integration for large teams." },
            { icon: BarChart, title: "Custom Showback", desc: "Advanced chargeback dashboards and audit-ready PDF/CSV exports." }
          ].map((item, i) => (
            <div key={i} className="p-10 bg-zolix-beige rounded-[40px] border border-zolix-dark/5">
              <item.icon className="text-zolix-orange mb-6" size={32} />
              <h3 className="text-xl font-bold mb-4 text-zolix-dark">{item.title}</h3>
              <p className="text-zolix-dark/50 font-medium text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-zolix-dark text-white rounded-[60px] p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-zolix-orange/10 blur-[120px] -mr-48 -mt-48" />
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-12 relative z-10">Enterprise Feature List</h2>
          <div className="grid md:grid-cols-2 gap-16 relative z-10">
            <ul className="space-y-6">
              {[
                "AI FinOps included — real-time GPU and token tuning",
                "VRAM optimization to prevent GPU hoarding",
                "Automated Remediation integrated into CI/CD",
                "Unlimited daily scans for high-spend environments",
                "Dedicated FinOps Success Manager",
                "SOC 2 Type II, GDPR, ISO 27001 compliant",
                "Anomaly detection and instant alerts"
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-4">
                  <Zap size={18} className="text-zolix-orange mt-1 shrink-0" />
                  <span className="text-lg font-medium opacity-80">{f}</span>
                </li>
              ))}
            </ul>
            <div className="bg-white/5 rounded-3xl p-10 border border-white/10 flex flex-col justify-center">
              <h4 className="text-zolix-orange font-bold uppercase tracking-widest text-xs mb-6">Enterprise Support</h4>
              <p className="text-white/40 mb-8 leading-relaxed font-medium">Advance users receive dedicated support for Enterprise Agreement (EA) negotiations and custom governance workflows.</p>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">Priority Engineering Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZolixAdvance;
