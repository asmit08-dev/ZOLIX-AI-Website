import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import CloudInfrastructureOptimization from "@/components/technologies/CloudInfrastructureOptimization";
import { technologyArticleSchema, technologyBreadcrumbs, technologyMetadata } from "@/lib/technologies";
import { faqSchema } from "@/lib/schema";

const H1 = "Cloud Cost Optimization Solutions for Cloud Infrastructure";

export const metadata: Metadata = technologyMetadata("cloud-infrastructure-optimization");

const faqs = [
  { q: "Does Zolix only look at cost, or does it cover performance and security too?", a: "All three. Configuration drift, idle resources, and rightsizing gaps tend to affect cost, performance, and security simultaneously, so Zolix surfaces findings across all three rather than treating cost in isolation." },
  { q: "Is this a one-time assessment or an ongoing service?", a: "Ongoing. After the initial assessment and implementation phases, Zolix continues monitoring for new drift, waste, and risk as your infrastructure keeps changing." },
  { q: "How are recommendations prioritized?", a: "By impact and implementation risk. Low-risk, high-impact changes like idle resource cleanup are surfaced first, with architectural changes handled separately since they carry different timelines." },
  { q: "Does implementing a recommendation require giving Zolix write access?", a: "No. Zolix's model is read-only throughout. Recommendations come with enough detail for your team to implement directly." },
  { q: "How does Zolix identify resources with unclear ownership?", a: "By cross-referencing usage patterns, tagging, and account activity to flag infrastructure that doesn't map clearly to an active owner or team." },
  { q: "How long does the initial assessment take?", a: "Most teams receive a comprehensive first assessment within 24 hours of connecting their accounts." },
];

export default function CloudInfrastructureOptimizationPage() {
  return (
    <>
      <JsonLd data={technologyArticleSchema("cloud-infrastructure-optimization", H1)} />
      <JsonLd data={faqSchema(faqs)} />
      <CloudInfrastructureOptimization faqs={faqs} breadcrumbs={<Breadcrumbs items={technologyBreadcrumbs("cloud-infrastructure-optimization", H1)} />} />
    </>
  );
}
