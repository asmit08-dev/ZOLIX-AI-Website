import Link from "next/link";
import Image from "next/image";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zolix-beige py-8 sm:py-10 lg:py-12 px-4 sm:px-6 border-t border-zolix-dark/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 sm:gap-8 mb-6 sm:mb-8 lg:mb-10">
          <Link href="/" className="flex items-center group shrink-0">
            <Image src="/assets/logo.webp" alt="ZOLIX" width={1536} height={1024} className="h-7 sm:h-8 w-auto group-hover:scale-105 transition-transform" />
          </Link>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 sm:gap-x-6 sm:gap-y-4 lg:gap-8">
            <Link href="/ai-finops" className="text-[clamp(0.5rem,2vw,0.5625rem)] font-black uppercase tracking-[0.2em] text-zolix-dark/60 hover:text-zolix-dark transition-colors whitespace-nowrap">AI FinOps</Link>
            <Link href="/cloud-finops" className="text-[clamp(0.5rem,2vw,0.5625rem)] font-black uppercase tracking-[0.2em] text-zolix-dark/60 hover:text-zolix-dark transition-colors whitespace-nowrap">Cloud FinOps</Link>
            <Link href="/gpu-cost" className="text-[clamp(0.5rem,2vw,0.5625rem)] font-black uppercase tracking-[0.2em] text-zolix-dark/60 hover:text-zolix-dark transition-colors whitespace-nowrap">GPU Calculator</Link>
            <Link href="/industries" className="text-[clamp(0.5rem,2vw,0.5625rem)] font-black uppercase tracking-[0.2em] text-zolix-dark/60 hover:text-zolix-dark transition-colors whitespace-nowrap">Industries</Link>
            <Link href="/technologies" className="text-[clamp(0.5rem,2vw,0.5625rem)] font-black uppercase tracking-[0.2em] text-zolix-dark/60 hover:text-zolix-dark transition-colors whitespace-nowrap">Technologies</Link>

            {/* C2O ENGINE LINK WITH ICON */}
            <Link href="/finops" className="flex items-center gap-2 text-[clamp(0.5rem,2vw,0.5625rem)] font-black uppercase tracking-[0.2em] text-zolix-orange hover:text-zolix-dark transition-colors group whitespace-nowrap">
              <Zap size={10} fill="currentColor" className="group-hover:animate-pulse shrink-0" />
              C2O Engine
            </Link>

            <div className="relative group">
              <span className="text-[clamp(0.5rem,2vw,0.5625rem)] font-black uppercase tracking-[0.2em] text-zolix-dark/20 cursor-default whitespace-nowrap">Marketplace</span>
              <span className="absolute -top-3 -right-5 bg-zolix-orange text-white text-[6px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-widest whitespace-nowrap">Soon</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 pt-6 sm:pt-8 lg:pt-10 border-t border-zolix-dark/5">
          <div className="text-[clamp(0.45rem,1.8vw,0.5rem)] font-bold uppercase tracking-[0.2em] text-zolix-dark/30 text-center whitespace-nowrap">
            © 2026 ZOLIX AI. ALL RIGHTS RESERVED.
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link href="/privacy" className="text-[clamp(0.45rem,1.8vw,0.5rem)] font-black uppercase tracking-[0.2em] text-zolix-dark/40 hover:text-zolix-dark transition-colors whitespace-nowrap">Privacy</Link>
            <Link href="/terms" className="text-[clamp(0.45rem,1.8vw,0.5rem)] font-black uppercase tracking-[0.2em] text-zolix-dark/40 hover:text-zolix-dark transition-colors whitespace-nowrap">Terms</Link>
            <Link href="/cookies" className="text-[clamp(0.45rem,1.8vw,0.5rem)] font-black uppercase tracking-[0.2em] text-zolix-dark/40 hover:text-zolix-dark transition-colors whitespace-nowrap">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
