import { ShieldCheck } from "lucide-react";

/**
 * Slim reassurance strip between the hero and the first content section.
 * "Trust Bar" is the section's name in the content doc, not on-page copy, so
 * only the statement itself renders.
 */
const TrustBar = () => {
  return (
    <section data-nav-theme="light" className="bg-white px-6 py-7 md:py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-4 text-center sm:flex-row sm:text-left">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zolix-orange/10 text-zolix-orange">
            <ShieldCheck size={21} strokeWidth={2.5} />
          </div>
          <div>
            <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-zolix-orange">
              Built for accountable cloud growth
            </p>
            <p className="text-base font-bold leading-snug tracking-tight text-zolix-dark/75 md:text-lg">
              Trusted by <span className="text-zolix-dark">engineering &amp; finance teams</span> managing multi-cloud and AI infrastructure spend.
            </p>
          </div>
      </div>
    </section>
  );
};

export default TrustBar;
