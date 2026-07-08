import { Quote } from 'lucide-react';

const clients = [
  "Bitcoin", "Hero", "Coal India", "Protean", "Meritech", "Tellius", "AuthMind", "Zenwork"
];

const testimonials = [
  { role: "VP of Infrastructure, Global FinTech" },
  { role: "Head of AI, HealthTech Systems" },
  { role: "CTO, Enterprise Logistics Corp" },
  { role: "Director of Engineering, SaaS Unicorn" },
  { role: "Cloud Architect, Fortune 100 Retailer" }
];

const Testimonials = () => {
  return (
    <section data-nav-theme="light" className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-zolix-dark">Trusted by Global Leaders</h2>
        <p className="text-gray-500 font-medium">Industry leaders optimizing their cloud economy with ZOLIX AI.</p>
      </div>

      {/* Client Names Marquee */}
      <div className="relative flex overflow-x-hidden border-y border-zolix-dark/5 py-12 mb-12">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-24 will-change-transform">
          {clients.concat(clients).map((name, i) => (
            <span key={i} className="text-3xl md:text-5xl font-black tracking-tighter text-zolix-dark/10 hover:text-zolix-orange transition-colors cursor-default uppercase">
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Role Testimonials Marquee */}
      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 py-10 will-change-transform" style={{ animationDirection: 'reverse' }}>
          {testimonials.concat(testimonials).map((t, i) => (
            <div
              key={i}
              className="inline-block bg-zolix-beige px-10 py-6 rounded-full border border-black/5 shadow-sm hover:shadow-xl transition-all whitespace-normal"
            >
              <div className="flex items-center gap-4">
                <Quote className="text-zolix-orange" size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-zolix-dark">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
