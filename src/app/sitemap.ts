import type { MetadataRoute } from "next";
import { insightLinks } from "@/lib/insights-data";

export const dynamic = "force-static";

const BASE_URL = "https://zolix.ai";

const STATIC_PAGES: { path: string; priority: number }[] = [
  { path: "/", priority: 1.0 },
  { path: "/products", priority: 0.9 },
  { path: "/cloud-finops", priority: 0.9 },
  { path: "/ai-finops", priority: 0.9 },
  { path: "/gpu-cost", priority: 0.9 },
  { path: "/ai-engine", priority: 0.9 },
  { path: "/industries", priority: 0.9 },
  { path: "/technologies", priority: 0.9 },
  { path: "/zolix-lite", priority: 0.8 },
  { path: "/zolix-advance", priority: 0.8 },
  { path: "/finops", priority: 0.8 },
  { path: "/pricing", priority: 0.8 },
  { path: "/demo", priority: 0.8 },
  { path: "/finops-hub", priority: 0.7 },
  { path: "/finops-2026", priority: 0.7 },
  { path: "/insights", priority: 0.7 },
  { path: "/blog", priority: 0.7 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
  { path: "/cookies", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_PAGES.map(({ path, priority }) => ({
    url: `${BASE_URL}${path}`,
    priority,
  }));

  const insightEntries = insightLinks.map((link) => ({
    url: `${BASE_URL}${link.path}`,
    priority: 0.6,
  }));

  return [...staticEntries, ...insightEntries];
}
