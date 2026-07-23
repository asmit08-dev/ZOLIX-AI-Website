import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { insightLinks, generateDetailedContent } from "@/lib/insights-data";
import { BUILT_INDUSTRY_PATHS } from "@/lib/industries";
import { getInternalLinks } from "@/lib/internal-links";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";
import { pageAlternates, SITE_URL, SITE_NAME } from "@/lib/seo";

function findInsight(slugParts: string[]) {
  const path = "/" + slugParts.join("/");
  return insightLinks.find((l) => l.path === path);
}

export function generateStaticParams() {
  // Blog articles have their own dedicated `/blog/[slug]` route backed by the
  // blog database. Including them here creates static catch-all pages for the
  // same URLs, which makes every article render the generic insight content.
  // The industry pages in BUILT_INDUSTRY_PATHS are excluded for the same
  // reason: each has a dedicated route with approved, hand-built content.
  return insightLinks
    .filter((link) => link.category !== "blog" && !BUILT_INDUSTRY_PATHS.includes(link.path))
    .map((link) => ({
      slug: link.path.split("/").filter(Boolean),
    }));
}

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = findInsight(slug);
  if (!insight) return {};

  const title = insight.metaTitle || `${insight.h1} | ZOLIX AI`;
  const description = insight.metaDesc;

  return {
    title,
    description,
    alternates: pageAlternates(insight.path),
    openGraph: {
      title,
      description,
      url: insight.path,
      siteName: SITE_NAME,
      type: "article",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@Zolix_AI",
    },
  };
}

export default async function InsightDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const insight = findInsight(slug);

  if (!insight) {
    notFound();
  }

  const pathParts = insight.path.split("/");
  const slugStr = pathParts[pathParts.length - 1];
  const content = generateDetailedContent(slugStr, insight.category);

  const HUBS: Record<string, { path: string; label: string }> = {
    blog: { path: "/blog", label: "Blog" },
    technologies: { path: "/technologies", label: "Technologies" },
    industries: { path: "/industries", label: "Industries" },
    resources: { path: "/finops-hub", label: "Cloud FinOps Hub" },
  };
  const hub = HUBS[insight.category] ?? { path: "/insights", label: "Insights" };
  const hubPath = hub.path;
  const hubLabel = hub.label;

  const breadcrumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: hubLabel, path: hubPath },
    { name: insight.h1, path: insight.path },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.h1,
    description: insight.metaDesc,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/assets/logo.webp` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${insight.path}`,
    },
  };

  // Specific, audit-approved contextual internal links (exact anchor text),
  // filtered to destinations that actually exist.
  const relatedLinks = getInternalLinks(insight.path);

  return (
    <div className="pt-52 pb-32 px-6 bg-white min-h-screen">
      <JsonLd data={articleSchema} />
      <div className="max-w-6xl mx-auto">
        <Breadcrumbs items={breadcrumbs} />
        <Link
          href={hubPath}
          className="flex items-center gap-2 text-zolix-orange font-bold uppercase text-[10px] mb-12 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back
        </Link>
        <h1 className="text-4xl md:text-7xl font-extrabold mb-12 leading-[0.9] text-zolix-dark tracking-tighter">{insight.h1}</h1>

        <div dangerouslySetInnerHTML={{ __html: content }} />

        {relatedLinks.length > 0 && (
          <div className="mt-24 pt-12 border-t border-zolix-dark/5">
            <h3 className="text-xl font-bold mb-8 uppercase tracking-widest text-zolix-dark/30">Related Guides</h3>
            <ul className="flex flex-wrap gap-x-8 gap-y-4">
              {relatedLinks.map((link) => (
                <li key={`${link.href}-${link.anchor}`}>
                  <Link
                    href={link.href}
                    className="text-zolix-dark font-semibold border-b-2 border-zolix-orange/30 hover:border-zolix-orange hover:text-zolix-orange transition-colors"
                  >
                    {link.anchor}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-24 pt-16 border-t border-zolix-dark/5">
          <h3 className="text-xl font-bold mb-10 uppercase tracking-widest text-zolix-dark/30">Recommended Reading</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {insightLinks
              .filter((l) => l.category === insight.category && l.path !== insight.path)
              .slice(0, 3)
              .map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="group p-8 bg-zolix-beige rounded-[32px] hover:bg-zolix-dark hover:text-white transition-all border border-zolix-dark/5"
                >
                  <div className="text-[8px] font-bold uppercase tracking-widest text-zolix-orange mb-4">{link.category}</div>
                  <h4 className="font-bold text-sm leading-tight group-hover:text-white">{link.h1}</h4>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
