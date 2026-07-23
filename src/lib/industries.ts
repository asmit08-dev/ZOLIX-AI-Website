import type { Metadata } from "next";
import { insightLinks } from "./insights-data";
import { INDUSTRY_H1 } from "@/components/industries/headings";
import { pageAlternates, SITE_NAME, SITE_URL, TWITTER_HANDLE } from "./seo";
import type { Crumb } from "@/components/Breadcrumbs";

/**
 * Industry pages that have approved, hand-built content and therefore their own
 * route under /industries/<slug>. Everything else under /industries stays on the
 * generic `[...slug]` catch-all, so this list is also what that route excludes
 * from `generateStaticParams` to avoid two pages claiming the same URL.
 */
export const BUILT_INDUSTRY_SLUGS = [
  "gaming",
  "technology",
  "financial-services",
  "education",
  "manufacturing-logistics",
  "government",
] as const;

export type IndustrySlug = (typeof BUILT_INDUSTRY_SLUGS)[number];

export const BUILT_INDUSTRY_PATHS: string[] = BUILT_INDUSTRY_SLUGS.map(
  (slug) => `/industries/${slug}`,
);

function industryLink(slug: IndustrySlug) {
  const path = `/industries/${slug}`;
  const link = insightLinks.find((item) => item.path === path);
  if (!link) {
    throw new Error(`No insight entry for ${path}. Add it to insightLinks first.`);
  }
  return link;
}

/**
 * Metadata for an industry page, using the meta title and description from the
 * approved SEO sheet (already transcribed into `insightLinks`).
 */
export function industryMetadata(slug: IndustrySlug): Metadata {
  const { metaTitle, metaDesc, path } = industryLink(slug);

  return {
    title: metaTitle,
    description: metaDesc,
    alternates: pageAlternates(path),
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: path,
      siteName: SITE_NAME,
      type: "article",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDesc,
      site: TWITTER_HANDLE,
    },
  };
}

export function industryBreadcrumbs(slug: IndustrySlug): Crumb[] {
  const { h1, path } = industryLink(slug);
  return [
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
    { name: h1, path },
  ];
}

export function industryArticleSchema(slug: IndustrySlug) {
  const { metaDesc, path } = industryLink(slug);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    // Matches the H1 the visitor actually sees, not the shorter SEO-sheet title.
    headline: INDUSTRY_H1[slug],
    description: metaDesc,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/assets/logo.webp` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${path}` },
  };
}
