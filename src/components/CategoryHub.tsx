import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { insightLinks } from "@/lib/insights-data";
import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";

function prettify(path: string) {
  const slug = path.split("/").pop() ?? "";
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * Server-rendered listing page that aggregates all real insight pages in a
 * given category into an on-brand card grid. Powers the /industries,
 * /technologies, and /finops-hub hubs and provides deep internal links.
 */
export default function CategoryHub({
  category,
  title,
  intro,
  hubPath,
  hubLabel,
  eyebrow,
}: {
  category: string;
  title: string;
  intro: string;
  hubPath: string;
  hubLabel: string;
  eyebrow: string;
}) {
  const items = insightLinks.filter((l) => l.category === category);
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: hubLabel, path: hubPath },
  ];

  return (
    <div className="pt-52 pb-32 px-6 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Breadcrumbs items={crumbs} />
        <div className="inline-block bg-zolix-orange text-white px-5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8">
          {eyebrow}
        </div>
        <h1 className="text-4xl md:text-7xl font-extrabold mb-8 leading-[0.95] text-zolix-dark tracking-tighter max-w-4xl">
          {title}
        </h1>
        <p className="text-lg md:text-2xl text-zolix-dark/40 font-bold tracking-tight max-w-3xl mb-16">
          {intro}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="group flex flex-col p-8 bg-zolix-beige rounded-[32px] border border-zolix-dark/5 hover:bg-zolix-dark transition-all"
            >
              <div className="text-[8px] font-bold uppercase tracking-widest text-zolix-orange mb-4">
                {category}
              </div>
              <h2 className="font-bold text-lg leading-tight text-zolix-dark group-hover:text-white mb-3">
                {prettify(item.path)}
              </h2>
              <p className="text-sm text-zolix-dark/50 group-hover:text-white/60 leading-relaxed flex-1">
                {item.metaDesc}
              </p>
              <div className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zolix-dark/40 group-hover:text-zolix-orange">
                Explore
                <ArrowUpRight
                  size={13}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
