import Link from "next/link";
import { ArrowUpRight, Zap } from "lucide-react";
import LinkedinIcon from "./icons/LinkedinIcon";
import EmailComposeLink from "./EmailComposeLink";

const LINKEDIN_URL = "https://www.linkedin.com/company/zolix-ai-engine/?viewAsMember=true";

const productLinks = [
  { label: "AI FinOps", href: "/ai-finops" },
  { label: "Cloud FinOps", href: "/cloud-finops" },
  { label: "GPU Calculator", href: "/gpu-cost" },
];

const exploreLinks = [
  { label: "Industries", href: "/industries" },
  { label: "Technologies", href: "/technologies" },
];

export default function Footer() {
  return (
    <footer className="bg-zolix-dark px-6 py-10 text-white md:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-white/15 pb-10 lg:grid-cols-[1.1fr_.9fr_1fr] lg:gap-10">
          <div>
            <Link href="/" className="inline-block text-3xl font-extrabold tracking-[-0.08em] transition-colors hover:text-zolix-orange md:text-4xl">
              ZOLIX<span className="text-zolix-orange">.</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm font-medium leading-relaxed text-white/55">AI-powered cloud cost clarity for teams building, operating, and scaling modern infrastructure.</p>
            <EmailComposeLink className="mt-5 inline-flex items-center gap-2 text-sm font-bold tracking-tight text-white transition-colors hover:text-zolix-orange">
              support@zolix.ai <ArrowUpRight size={15} />
            </EmailComposeLink>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="Follow Zolix on LinkedIn" className="mt-5 grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white transition-all hover:border-zolix-orange hover:bg-zolix-orange hover:scale-105">
              <LinkedinIcon size={16} />
            </a>
          </div>

          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zolix-orange">Solutions</p>
            <ul className="space-y-3">
              {productLinks.map((link) => <li key={link.href}><Link href={link.href} className="text-base font-bold tracking-tight text-white/75 transition-colors hover:text-zolix-orange">{link.label}</Link></li>)}
              <li><Link href="/finops" className="inline-flex items-center gap-2 text-base font-bold tracking-tight text-zolix-orange transition-colors hover:text-white"><Zap size={14} fill="currentColor" />C2O Engine</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zolix-orange">Explore</p>
            <ul className="space-y-3">
              {exploreLinks.map((link) => <li key={link.href}><Link href={link.href} className="text-base font-bold tracking-tight text-white/75 transition-colors hover:text-zolix-orange">{link.label}</Link></li>)}
              <li className="flex items-center gap-3 pt-1"><span className="text-base font-bold tracking-tight text-white/30">Marketplace</span><span className="rounded-full bg-zolix-orange px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.15em] text-white">Soon</span></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">© 2026 ZOLIX AI. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-7 gap-y-3">
            <Link href="/privacy" className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/50 transition-colors hover:text-white">Privacy</Link>
            <Link href="/terms" className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/50 transition-colors hover:text-white">Terms</Link>
            <Link href="/cookies" className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/50 transition-colors hover:text-white">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
