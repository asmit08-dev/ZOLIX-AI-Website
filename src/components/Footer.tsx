import Link from "next/link";
import Image from "next/image";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zolix-beige py-12 px-6 border-t border-zolix-dark/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
          <Link href="/" className="flex items-center group">
            <Image src="/assets/logo.webp" alt="ZOLIX" width={1536} height={1024} className="h-8 w-auto group-hover:scale-105 transition-transform" />
          </Link>

          <div className="flex flex-wrap justify-center gap-8">
            <Link href="/ai-finops" className="text-[9px] font-black uppercase tracking-[0.2em] text-zolix-dark/60 hover:text-zolix-dark transition-colors">AI FinOps</Link>
            <Link href="/cloud-finops" className="text-[9px] font-black uppercase tracking-[0.2em] text-zolix-dark/60 hover:text-zolix-dark transition-colors">Cloud FinOps</Link>
            <Link href="/gpu-cost" className="text-[9px] font-black uppercase tracking-[0.2em] text-zolix-dark/60 hover:text-zolix-dark transition-colors">GPU Calculator</Link>
            <Link href="/industries" className="text-[9px] font-black uppercase tracking-[0.2em] text-zolix-dark/60 hover:text-zolix-dark transition-colors">Industries</Link>
            <Link href="/technologies" className="text-[9px] font-black uppercase tracking-[0.2em] text-zolix-dark/60 hover:text-zolix-dark transition-colors">Technologies</Link>

            {/* C2O ENGINE LINK WITH ICON */}
            <Link href="/finops" className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-zolix-orange hover:text-zolix-dark transition-colors group">
              <Zap size={10} fill="currentColor" className="group-hover:animate-pulse" />
              C2O Engine
            </Link>

            <div className="relative group">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zolix-dark/20 cursor-default">Marketplace</span>
              <span className="absolute -top-3 -right-5 bg-zolix-orange text-white text-[6px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-widest">Soon</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-zolix-dark/5">
          <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-zolix-dark/30">
            © 2026 ZOLIX AI. ALL RIGHTS RESERVED.
          </div>

          <div className="flex gap-6">
            <Link href="/privacy" className="text-[8px] font-black uppercase tracking-[0.2em] text-zolix-dark/40 hover:text-zolix-dark transition-colors">Privacy</Link>
            <Link href="/terms" className="text-[8px] font-black uppercase tracking-[0.2em] text-zolix-dark/40 hover:text-zolix-dark transition-colors">Terms</Link>
            <Link href="/cookies" className="text-[8px] font-black uppercase tracking-[0.2em] text-zolix-dark/40 hover:text-zolix-dark transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
