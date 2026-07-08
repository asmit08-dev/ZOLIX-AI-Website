import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getInternalLinks } from "@/lib/internal-links";

/**
 * Contextual internal links surfaced on the homepage, using the exact
 * audit-approved anchor text. Improves crawl depth into cornerstone content.
 */
export default function PopularTopics() {
  const links = getInternalLinks("/");
  if (links.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-white border-t border-zolix-dark/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zolix-dark/30 mb-8">
          Popular Topics
        </div>
        <div className="flex flex-wrap gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group inline-flex items-center gap-2 bg-zolix-beige px-6 py-3 rounded-full border border-zolix-dark/5 text-sm font-semibold text-zolix-dark hover:bg-zolix-dark hover:text-white transition-all"
            >
              {link.anchor}
              <ArrowUpRight
                size={14}
                className="text-zolix-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
