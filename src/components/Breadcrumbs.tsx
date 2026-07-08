import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd from "./JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export type Crumb = { name: string; path: string };

/**
 * Renders an accessible breadcrumb trail and emits matching BreadcrumbList
 * structured data. The final crumb is treated as the current page (not linked).
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-10">
      <JsonLd data={breadcrumbSchema(items)} />
      <ol className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zolix-dark/40">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="text-zolix-dark/60">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="hover:text-zolix-orange transition-colors"
                >
                  {item.name}
                </Link>
              )}
              {!isLast && (
                <ChevronRight size={11} className="text-zolix-dark/20" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
