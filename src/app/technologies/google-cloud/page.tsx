import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import GoogleCloudTechnology from "@/components/technologies/GoogleCloudTechnology";
import { technologyArticleSchema, technologyBreadcrumbs, technologyMetadata } from "@/lib/technologies";
import { faqSchema } from "@/lib/schema";

const H1 = "Cloud Cost Optimization Solutions for Google Cloud Platform";

export const metadata: Metadata = technologyMetadata("google-cloud");

const faqs = [
  { q: "Does Zolix require manual tagging to allocate GCP costs accurately?", a: "No. Zolix's zero-agent detection engine reads usage patterns directly and allocates spend automatically, without requiring resources to be relabeled or manually tagged." },
  { q: "Can Zolix track Committed Use Discount coverage?", a: "Yes. CUD coverage is compared against actual usage, with recommendations on where additional commitment would reduce cost." },
  { q: "Does Zolix optimize BigQuery spend specifically?", a: "Yes. BigQuery cost is tracked separately from general compute, with flags on queries and datasets driving disproportionate spend." },
  { q: "Can Zolix detect idle capacity in GKE clusters?", a: "Yes. Idle capacity is identified at the node pool level, not just the overall cluster, so rightsizing recommendations are specific enough to act on." },
  { q: "Does Zolix require write access to our GCP projects?", a: "No. Zolix connects through read-only IAM roles, following Google Cloud's recommended security practices, with no write access required at any point." },
  { q: "How long does it take to see GCP cost visibility after connecting?", a: "Most teams receive a first cost visibility report within 24 hours of connecting a GCP project." },
];

export default function GoogleCloudTechnologyPage() {
  return (
    <>
      <JsonLd data={technologyArticleSchema("google-cloud", H1)} />
      <JsonLd data={faqSchema(faqs)} />
      <GoogleCloudTechnology faqs={faqs} breadcrumbs={<Breadcrumbs items={technologyBreadcrumbs("google-cloud", H1)} />} />
    </>
  );
}
