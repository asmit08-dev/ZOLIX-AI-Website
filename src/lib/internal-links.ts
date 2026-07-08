import { insightLinks } from "./insights-data";

// AUTO-GENERATED from the approved "Internal Linking" audit sheet.
// Maps each source page to its suggested contextual outbound links with exact
// anchor text. Destinations are validated against real routes before rendering.

export type InternalLink = { href: string; anchor: string };

export const INTERNAL_LINKS: Record<string, InternalLink[]> = {
  "/": [
    { href: "/technologies/cloud-cost-optimization", anchor: "cloud cost optimization" },
    { href: "/technologies/aws", anchor: "AWS cost management" },
    { href: "/technologies/azure", anchor: "Azure cost optimization" },
    { href: "/technologies/cloud-finops", anchor: "cloud FinOps platform" },
    { href: "/technologies/best-finops-tools", anchor: "best FinOps tools" },
  ],
  "/technologies/aws": [
    { href: "/technologies/cloud-cost-optimization", anchor: "cloud cost optimization" },
    { href: "/resources/aws-cost-optimization", anchor: "AWS cost optimization guide" },
    { href: "/resources/best-aws-cost-optimization-tools", anchor: "best AWS cost optimization tools" },
    { href: "/technologies/cloud-cost-monitoring", anchor: "cloud cost monitoring" },
    { href: "/technologies/best-finops-tools", anchor: "best FinOps tools" },
  ],
  "/technologies/azure": [
    { href: "/technologies/cloud-cost-optimization", anchor: "cloud cost optimization" },
    { href: "/resources/azure-cost-optimization", anchor: "Azure cost optimization strategies" },
    { href: "/resources/best-azure-cost-management-tools", anchor: "best Azure cost management tools" },
    { href: "/technologies/cloud-cost-monitoring-tools", anchor: "cloud cost monitoring tools" },
    { href: "/technologies/cloud-cost-management-platform", anchor: "cloud cost management platform" },
  ],
  "/technologies/google-cloud": [
    { href: "/technologies/cloud-cost-optimization", anchor: "GCP cost optimization" },
    { href: "/resources/best-gcp-cost-optimization-tools", anchor: "best GCP cost optimization tools" },
    { href: "/technologies/cloud-cost-monitoring", anchor: "cloud cost monitoring" },
    { href: "/technologies/cloud-finops", anchor: "cloud FinOps" },
  ],
  "/technologies/oracle-cloud": [
    { href: "/technologies/cloud-cost-management", anchor: "cloud cost management" },
    { href: "/technologies/cloud-cost-optimization", anchor: "cloud cost optimization" },
  ],
  "/technologies/generative-ai": [
    { href: "/technologies/gpu-infrastructure", anchor: "GPU infrastructure optimization" },
    { href: "/technologies/ai-finops", anchor: "AI FinOps" },
    { href: "/technologies/cloud-cost-optimization", anchor: "cloud cost optimization" },
  ],
  "/technologies/gpu-infrastructure": [
    { href: "/technologies/generative-ai", anchor: "generative AI cost management" },
    { href: "/technologies/ai-finops", anchor: "AI FinOps platform" },
  ],
  "/technologies/ai-finops": [
    { href: "/technologies/cloud-finops", anchor: "cloud FinOps" },
    { href: "/technologies/best-finops-tools", anchor: "best FinOps tools" },
  ],
  "/technologies/cloud-cost-optimization": [
    { href: "/technologies/cloud-cost-management", anchor: "cloud cost management" },
    { href: "/technologies/cloud-cost-monitoring", anchor: "cloud cost monitoring" },
    { href: "/resources/cloud-cost-optimization", anchor: "cloud cost optimization guide" },
    { href: "/technologies/cloud-cost-reduction", anchor: "cloud cost reduction" },
    { href: "/technologies/cloud-infrastructure-optimization", anchor: "cloud infrastructure optimization" },
  ],
  "/technologies/cloud-cost-management": [
    { href: "/technologies/cloud-cost-management-platform", anchor: "cloud cost management platform" },
    { href: "/technologies/cloud-cost-management-solutions", anchor: "cloud cost management solutions" },
    { href: "/resources/cloud-cost-management", anchor: "cloud cost management best practices" },
  ],
  "/technologies/cloud-cost-management-platform": [
    { href: "/technologies/cloud-cost-monitoring-tools", anchor: "cloud cost monitoring tools" },
    { href: "/technologies/cloud-cost-management-software", anchor: "cloud cost management software" },
  ],
  "/technologies/cloud-cost-monitoring": [
    { href: "/technologies/cloud-cost-monitoring-tools", anchor: "cloud cost monitoring tools" },
    { href: "/technologies/cloud-cost-management", anchor: "cloud cost management" },
  ],
  "/technologies/cloud-finops": [
    { href: "/technologies/best-finops-tools", anchor: "best FinOps tools" },
    { href: "/technologies/cloud-cost-optimization", anchor: "cloud cost optimization" },
    { href: "/resources/finops-an-intro-to-the-basics-of-finops", anchor: "intro to FinOps basics" },
  ],
  "/technologies/best-finops-tools": [
    { href: "/technologies/cloud-finops", anchor: "cloud FinOps practices" },
    { href: "/resources/best-finops-tools", anchor: "best FinOps tools comparison" },
  ],
  "/technologies/cloud-cost-optimization-tools": [
    { href: "/technologies/best-cloud-cost-optimization-tools", anchor: "best cloud cost optimization tools" },
    { href: "/resources/cloud-cost-optimization-tools", anchor: "cloud cost optimization tools guide" },
  ],
  "/technologies/cloud-infrastructure-optimization": [
    { href: "/technologies/cloud-performance-optimization", anchor: "cloud performance optimization" },
    { href: "/technologies/cloud-cost-reduction", anchor: "cloud cost reduction" },
  ],
  "/technologies/cloud-cost-reduction": [
    { href: "/technologies/cloud-cost-optimization", anchor: "cloud cost optimization" },
    { href: "/resources/the-ultimate-guide-to-cost-efficient-cloud-spending", anchor: "guide to cost-efficient cloud spending" },
  ],
  "/technologies/cloud-optimization-platform": [
    { href: "/technologies/cloud-optimization-software", anchor: "cloud optimization software" },
    { href: "/technologies/cloud-cost-management-platform", anchor: "cloud cost management platform" },
  ],
  "/resources/cloud-cost-optimization": [
    { href: "/resources/cloud-cost-optimization-101", anchor: "cloud cost optimization 101" },
    { href: "/technologies/cloud-cost-optimization-tools", anchor: "cloud cost optimization tools" },
    { href: "/resources/the-cloud-cost-playbook", anchor: "cloud cost playbook" },
  ],
  "/resources/aws-cost-optimization": [
    { href: "/technologies/aws", anchor: "AWS cloud solutions" },
    { href: "/resources/best-aws-cost-optimization-tools", anchor: "best AWS cost optimization tools" },
    { href: "/resources/best-aws-monitoring-tools", anchor: "best AWS monitoring tools" },
  ],
  "/resources/azure-cost-optimization": [
    { href: "/technologies/azure", anchor: "Azure cost management" },
    { href: "/resources/best-azure-cost-management-tools", anchor: "best Azure cost management tools" },
  ],
  "/resources/best-cloud-cost-management-tools": [
    { href: "/technologies/cloud-cost-management-platform", anchor: "cloud cost management platform" },
    { href: "/technologies/best-finops-tools", anchor: "best FinOps tools" },
    { href: "/resources/best-cloud-cost-tools", anchor: "best cloud cost tools" },
  ],
  "/resources/best-finops-tools": [
    { href: "/technologies/cloud-finops", anchor: "cloud FinOps" },
    { href: "/resources/finops-an-intro-to-the-basics-of-finops", anchor: "FinOps basics" },
  ],
  "/resources/cloud-cost-management": [
    { href: "/technologies/cloud-cost-management-solutions", anchor: "cloud cost management solutions" },
    { href: "/resources/the-modern-guide-to-managing-cloud-costs", anchor: "modern guide to managing cloud costs" },
  ],
  "/resources/cloud-cost-optimization-101": [
    { href: "/resources/cloud-cost-optimization", anchor: "cloud cost optimization strategies" },
    { href: "/technologies/cloud-cost-monitoring", anchor: "cloud cost monitoring" },
  ],
  "/resources/the-cloud-cost-playbook": [
    { href: "/technologies/cloud-finops", anchor: "cloud FinOps framework" },
    { href: "/technologies/cloud-cost-optimization", anchor: "cloud cost optimization" },
  ],
  "/resources/best-aws-monitoring-tools": [
    { href: "/resources/best-aws-cost-optimization-tools", anchor: "best AWS cost optimization tools" },
    { href: "/technologies/cloud-cost-monitoring-tools", anchor: "cloud cost monitoring tools" },
  ],
  "/resources/best-cloud-monitoring-tools": [
    { href: "/technologies/best-cloud-monitoring-tools", anchor: "best cloud monitoring tools" },
    { href: "/technologies/cloud-cost-monitoring", anchor: "cloud cost monitoring" },
  ],
  "/resources/best-gcp-cost-optimization-tools": [
    { href: "/technologies/google-cloud", anchor: "Google Cloud cost management" },
    { href: "/technologies/cloud-cost-optimization-tools", anchor: "cloud cost optimization tools" },
  ],
  "/resources/best-azure-cost-management-tools": [
    { href: "/technologies/azure", anchor: "Azure cost optimization" },
    { href: "/technologies/cloud-cost-management-platform", anchor: "cloud cost management platform" },
  ],
  "/resources/finops-an-intro-to-the-basics-of-finops": [
    { href: "/technologies/cloud-finops", anchor: "cloud FinOps platform" },
    { href: "/resources/best-finops-tools", anchor: "best FinOps tools" },
  ],
  "/resources/the-modern-guide-to-managing-cloud-costs": [
    { href: "/resources/the-ultimate-guide-to-cost-efficient-cloud-spending", anchor: "guide to cost-efficient cloud spending" },
    { href: "/technologies/cloud-cost-management-solutions", anchor: "cloud cost management solutions" },
  ],
  "/resources/cloud-storage-pricing-comparison": [
    { href: "/technologies/cloud-cost-reduction", anchor: "cloud cost reduction" },
    { href: "/technologies/cloud-cost-optimization", anchor: "cloud cost optimization" },
  ],
  "/resources/best-multi-cloud-management-tools": [
    { href: "/technologies/cloud-cost-management-platform", anchor: "cloud cost management platform" },
    { href: "/technologies/cloud-optimization-platform", anchor: "cloud optimization platform" },
  ],
  "/industries/gaming": [
    { href: "/technologies/cloud-cost-optimization", anchor: "cloud cost optimization" },
    { href: "/technologies/gpu-infrastructure", anchor: "GPU infrastructure optimization" },
  ],
  "/industries/technology": [
    { href: "/technologies/cloud-finops", anchor: "cloud FinOps" },
    { href: "/technologies/cloud-cost-optimization", anchor: "cloud cost optimization" },
  ],
  "/industries/financial-services": [
    { href: "/technologies/cloud-cost-management-platform", anchor: "cloud cost management platform" },
    { href: "/technologies/cloud-cost-monitoring", anchor: "cloud cost monitoring" },
  ],
  "/industries/healthcare-life-sciences": [
    { href: "/technologies/cloud-cost-management", anchor: "cloud cost management" },
    { href: "/technologies/cloud-cost-optimization", anchor: "cloud cost optimization" },
  ],
  "/industries/retail-ecommerce": [
    { href: "/technologies/cloud-cost-optimization", anchor: "cloud cost optimization" },
    { href: "/technologies/cloud-cost-monitoring-tools", anchor: "cloud cost monitoring tools" },
  ],
  "/industries/government": [
    { href: "/technologies/cloud-cost-management-solutions", anchor: "cloud cost management solutions" },
  ],
  "/industries/education": [
    { href: "/technologies/cloud-cost-reduction", anchor: "cloud cost reduction" },
  ],
};

const STATIC_ROUTES = [
  "/", "/products", "/cloud-finops", "/ai-finops", "/gpu-cost", "/zolix-lite",
  "/zolix-advance", "/finops", "/pricing", "/insights", "/blog", "/privacy",
  "/terms", "/cookies", "/demo", "/finops-hub", "/industries", "/ai-engine",
  "/finops-2026", "/technologies",
];

const VALID_PATHS = new Set<string>([
  ...STATIC_ROUTES,
  ...insightLinks.map((l) => l.path),
]);

/** Returns the suggested internal links for a source page, filtered to routes that actually exist. */
export function getInternalLinks(sourcePath: string): InternalLink[] {
  return (INTERNAL_LINKS[sourcePath] ?? []).filter((l) => VALID_PATHS.has(l.href));
}
