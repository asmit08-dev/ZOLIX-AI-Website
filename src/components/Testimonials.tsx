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
    <section data-nav-theme="light" className="bg-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.25em] text-zolix-orange">Enterprise confidence</p>
          <h2 className="mb-5 text-3xl font-bold tracking-tight text-zolix-dark md:text-5xl">Trusted by Global Leaders</h2>
          <p className="font-medium leading-relaxed text-zolix-dark/50">Industry leaders optimizing their cloud economy with ZOLIX AI.</p>
        </div>

        <div className="grid overflow-hidden rounded-[36px] border border-zolix-dark/10 lg:grid-cols-[0.9fr_1.35fr]">
          <div className="relative overflow-hidden bg-zolix-dark px-7 py-10 text-white md:px-10 md:py-12">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-zolix-orange/20 blur-3xl" aria-hidden="true" />
            <div className="relative">
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-zolix-orange text-white">
                <Quote size={22} strokeWidth={2.5} />
              </div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.22em] text-zolix-orange">Built for serious cloud operators</p>
              <h3 className="max-w-sm text-3xl font-bold tracking-tight md:text-4xl">Cloud intelligence for teams that need answers.</h3>
              <p className="mt-5 max-w-md text-base font-medium leading-relaxed text-white/55">From AI workloads to global cloud estates, Zolix helps technical and financial leaders make every infrastructure decision count.</p>

              <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-white/10 pt-7">
                {clients.map((name) => (
                  <span key={name} className="text-xs font-bold tracking-tight text-white/60">{name}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-zolix-beige/65 p-4 md:p-6">
            <div className="mb-4 flex items-center justify-between px-2 pt-2">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zolix-dark/40">Leadership perspectives</p>
              <span className="text-[10px] font-bold text-zolix-orange">01—05</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {testimonials.map((t, i) => (
                <div
                  key={t.role}
                  className="group rounded-2xl border border-zolix-dark/7 bg-white px-5 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-zolix-orange/30 hover:shadow-lg hover:shadow-zolix-dark/[0.06] last:sm:col-span-2"
                >
                  <span className="mb-7 block text-[10px] font-black tracking-[0.2em] text-zolix-orange">{`0${i + 1}`}</span>
                  <p className="max-w-xs text-sm font-bold leading-snug tracking-tight text-zolix-dark md:text-[15px]">{t.role}</p>
                  <div className="mt-5 h-px w-8 bg-zolix-dark/10 transition-all duration-300 group-hover:w-16 group-hover:bg-zolix-orange" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
