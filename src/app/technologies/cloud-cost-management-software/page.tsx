import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import CloudCostManagementSoftware from "@/components/technologies/CloudCostManagementSoftware";
import { technologyArticleSchema, technologyBreadcrumbs, technologyMetadata } from "@/lib/technologies";
import { faqSchema } from "@/lib/schema";

const H1 = "Cloud Cost Management Software Built for How Your Infrastructure Actually Looks";

export const metadata: Metadata = technologyMetadata("cloud-cost-management-software");

const faqs = [
  { q: "Do we need complete tagging coverage before Zolix becomes useful?", a: "No. Zolix allocates 100% of spend from day one, including untagged and effectively untaggable resources, using usage-based detection rather than relying on manually applied tags." },
  { q: "How is this different from cost tools that just flag \"untagged spend\" as a bucket?", a: "Most tools report an untagged bucket as an unexplained gap. Zolix attributes that spend directly to its actual source using detection logic, rather than leaving it as a line item nobody can explain." },
  { q: "Can we slice cost by dimensions other than our existing tagging schema?", a: "Yes. Spend can be viewed by team, product, customer, feature, or environment, independent of whatever tagging structure exists today." },
  { q: "Is this a dashboard we use ourselves, or a service delivered to us?", a: "Zolix is self-serve software. Your team gets a live dashboard populated with real data, not a periodic report delivered by a services team." },
  { q: "How long does it take to see accurate cost attribution after connecting?", a: "Most teams see a fully populated, accurately attributed dashboard within 24 hours of connecting their first cloud account." },
  { q: "Does this require write access to our cloud environment?", a: "No. Zolix connects through read-only access, following each provider's recommended security practices, with no write access required at any point." },
];

export default function CloudCostManagementSoftwarePage() {
  return (
    <>
      <JsonLd data={technologyArticleSchema("cloud-cost-management-software", H1)} />
      <JsonLd data={faqSchema(faqs)} />
      <CloudCostManagementSoftware faqs={faqs} breadcrumbs={<Breadcrumbs items={technologyBreadcrumbs("cloud-cost-management-software", H1)} />} />
    </>
  );
}
