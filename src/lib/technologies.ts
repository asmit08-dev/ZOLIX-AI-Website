import type { Metadata } from "next";
import { insightLinks } from "./insights-data";
import { pageAlternates, SITE_NAME, SITE_URL, TWITTER_HANDLE } from "./seo";
import type { Crumb } from "@/components/Breadcrumbs";

/**
 * Technology pages that have approved, hand-built content and therefore their own
 * route under /technologies/<slug>. Everything else under /technologies stays on
 * the generic `[...slug]` catch-all, so this list is also what that route excludes
 * from `generateStaticParams` to avoid two pages claiming the same URL.
 */
export const BUILT_TECH_SLUGS = [
  "azure",
  "aws",
  "google-cloud",
  "oracle-cloud",
  "generative-ai",
  "gpu-infrastructure",
  "learning-model",
  "ai-finops",
  "cloud-cost-management-software",
  "cloud-finops",
  "cloud-infrastructure-optimization",
  "cloud-cost-optimization-services",
] as const;

export type TechSlug = (typeof BUILT_TECH_SLUGS)[number];

export const BUILT_TECH_PATHS: string[] = BUILT_TECH_SLUGS.map(
  (slug) => `/technologies/${slug}`,
);

function techLink(slug: TechSlug) {
  const path = `/technologies/${slug}`;
  const link = insightLinks.find((item) => item.path === path);
  if (!link) {
    throw new Error(`No insight entry for ${path}. Add it to insightLinks first.`);
  }
  return link;
}

/**
 * Metadata for a technology page, using the meta title and description from the
 * approved SEO sheet (already transcribed into `insightLinks`).
 */
export function technologyMetadata(slug: TechSlug): Metadata {
  const { metaTitle, metaDesc, path } = techLink(slug);

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

export function technologyBreadcrumbs(slug: TechSlug, h1: string): Crumb[] {
  const { path } = techLink(slug);
  return [
    { name: "Home", path: "/" },
    { name: "Technologies", path: "/technologies" },
    { name: h1, path },
  ];
}

export function technologyArticleSchema(slug: TechSlug, h1: string) {
  const { metaDesc, path } = techLink(slug);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    // Matches the H1 the visitor actually sees, which may differ from the
    // shorter SEO-sheet title used for metadata.
    headline: h1,
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
