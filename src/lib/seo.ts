import type { Metadata } from "next";

export const SITE_URL = "https://zolix.ai";
export const SITE_NAME = "ZOLIX AI";
export const TWITTER_HANDLE = "@Zolix_AI";
export const LOGO_PATH = "/assets/logo.webp";

export const DEFAULT_TITLE =
  "AI-Powered Cloud Cost Optimization & Management Platform - ZOLIX AI";
export const DEFAULT_DESCRIPTION =
  "Optimize cloud spend with ZOLIX AI cloud cost management tools, monitoring, optimization services, and infrastructure performance solutions across AWS, Azure, and Google Cloud.";

/**
 * hreflang + canonical alternates.
 * Kept as a named export for backward compatibility with existing pages.
 */
export function pageAlternates(path: string) {
  return {
    canonical: path,
    languages: {
      "en-us": path,
      "en-in": path,
    },
  };
}

type PageSeo = { title: string; description: string };

/**
 * Per-page meta titles & descriptions.
 * Values for the main marketing pages are taken verbatim from the approved
 * "Copy Meta Title, Description & H1" audit sheet. Routes not covered by the
 * audit use production-quality, keyword-aligned copy composed here.
 */
export const PAGE_SEO: Record<string, PageSeo> = {
  "/": {
    title: "Cloud Cost Optimization Platform - Save Up to 60% - ZOLIX AI",
    description: DEFAULT_DESCRIPTION,
  },
  "/pricing": {
    title: "Pricing | ZOLIX AI",
    description:
      "Flexible pricing plans designed for every scale. Choose the right Zolix AI package to start saving on your cloud bills with transparent and ROI-driven costs.",
  },
  "/ai-finops": {
    title: "AI FinOps Overview | ZOLIX AI",
    description:
      "Revolutionize your financial operations with AI-FinOps. Automate budget tracking, anomaly detection, and cost allocation to drive sustainable cloud growth.",
  },
  "/blog": {
    title: "ZOLIX | Blog",
    description:
      "Stay updated with the latest trends in FinOps, cloud cost management, and AI infrastructure. Expert insights to help you navigate the evolving cloud landscape.",
  },
  "/finops": {
    title: "ZOLIX | Cloud Cost Optimization in 60 Seconds",
    description:
      "ZOLIX LITE is the fastest AI FinOps platform. Upload your CUR file and see your savings in under 60 seconds without surrendering IAM access.",
  },
  "/zolix-advance": {
    title: "ZOLIX Advance | Enterprise Cloud & AI FinOps",
    description:
      "Unlock enterprise-grade capabilities with Zolix Advance. Get dedicated support, custom AI models, and deep-tier cloud optimization for complex infrastructures.",
  },
  "/zolix-lite": {
    title: "ZOLIX Lite | Free Cloud FinOps & AI Planner",
    description:
      "Experience the power of the C2O Engine for free. ZOLIX Lite offers zero-agent discovery, CUR integration, and AI Planner.",
  },
  // Routes not covered by the audit sheet — production copy composed here.
  "/cloud-finops": {
    title: "Cloud FinOps Platform | ZOLIX AI Cloud Cost Optimization",
    description:
      "Master cloud financial management with the ZOLIX AI Cloud FinOps platform. Gain real-time visibility, automated optimization, and governance across AWS, Azure, GCP, and OCI.",
  },
  "/gpu-cost": {
    title: "GPU Cost Calculator & AI Infrastructure Optimization | ZOLIX AI",
    description:
      "Right-size GPU and AI infrastructure spend with the ZOLIX AI GPU cost calculator. Forecast H100, A100, and L4 requirements and compare TCO for managed vs self-hosted models.",
  },
  "/products": {
    title: "Products | ZOLIX AI Cloud FinOps Platform",
    description:
      "Explore the ZOLIX AI product suite — Lite, Advance, and AI FinOps — for cloud cost optimization, monitoring, and AI infrastructure management across every hyperscaler.",
  },
  "/insights": {
    title: "Insights & Resources | ZOLIX AI Cloud Cost Optimization",
    description:
      "Guides, best practices, and expert analysis on cloud cost optimization, FinOps, and AI infrastructure management from the ZOLIX AI team.",
  },
  // Pages defined by the audit's "Copy Meta" sheet — titles & descriptions verbatim.
  "/demo": {
    title: "ZOLIX | Demo",
    description:
      "Book a personalized demo of Zolix AI. See how our AI-powered engine automates cloud cost optimization and provides real-time visibility into your infrastructure.",
  },
  "/finops-hub": {
    title: "Cloud FinOps Hub | ZOLIX AI Cloud Cost Optimization",
    description:
      "Your ultimate resource for FinOps excellence. Access guides, best practices, and industry news to master cloud financial management and cost optimization.",
  },
  "/industries": {
    title: "Industries | ZOLIX AI Cloud Cost Optimization",
    description:
      "Tailored cloud optimization solutions for every sector. See how Zolix AI solves specific cost and performance challenges across diverse global industries.",
  },
  "/ai-engine": {
    title: "C2O AI Engine | ZOLIX AI",
    description:
      "Discover the core of Zolix: Our AI-Engine. Learn how machine learning automates complex cloud decisions to ensure efficiency and performance at scale.",
  },
  "/finops-2026": {
    title: "ZOLIX AI | FinOps 2026 Report",
    description:
      "A comprehensive analysis of $723 billion in global cloud spend, the $200+ billion waste crisis, and how AI-powered FinOps is transforming enterprise cost management.",
  },
  "/technologies": {
    title: "Technologies & Cloud Cost Management Tools | ZOLIX AI",
    description:
      "Explore the cutting-edge technologies behind Zolix. From Generative AI to GPU infrastructure, see how we power the next generation of cloud management.",
  },
  "/privacy": {
    title: "Privacy Policy | ZOLIX AI",
    description:
      "Read the ZOLIX AI privacy policy to learn how we collect, use, and protect your data.",
  },
  "/terms": {
    title: "Terms of Service | ZOLIX AI",
    description:
      "Review the terms of service governing your use of the ZOLIX AI cloud cost optimization platform.",
  },
  "/cookies": {
    title: "Cookie Policy | ZOLIX AI",
    description:
      "Learn how ZOLIX AI uses cookies and similar technologies to improve your experience.",
  },
};

/**
 * Builds a complete, production-grade Metadata object for a route: title,
 * description, canonical + hreflang alternates, Open Graph, and Twitter Card.
 * The site-wide OG/Twitter image is injected automatically by the
 * `opengraph-image` file convention, so it is not repeated here.
 */
export function buildMetadata(
  path: string,
  overrides: Partial<Metadata> = {},
): Metadata {
  const seo = PAGE_SEO[path] ?? {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  };
  const { title, description } = seo;

  return {
    title,
    description,
    alternates: pageAlternates(path),
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: TWITTER_HANDLE,
    },
    ...overrides,
  };
}
