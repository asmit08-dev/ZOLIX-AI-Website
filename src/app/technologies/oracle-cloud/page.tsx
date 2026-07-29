import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import OracleCloudTechnology from "@/components/technologies/OracleCloudTechnology";
import { technologyArticleSchema, technologyBreadcrumbs, technologyMetadata } from "@/lib/technologies";
import { faqSchema } from "@/lib/schema";

const H1 = "Cloud Cost Optimization Solutions for Oracle Cloud";

export const metadata: Metadata = technologyMetadata("oracle-cloud");

const faqs = [
  { q: "Does Zolix understand OCI-specific pricing like OCPUs and flexible shapes?", a: "Yes. Zolix analyzes OCPU-based compute and flexible shape configurations directly, rather than applying rightsizing logic built for fixed-instance pricing models." },
  { q: "Can Zolix track our Universal Credits commitment against actual usage?", a: "Yes. Consumption is tracked continuously against your committed amount, flagging both underuse and potential overage." },
  { q: "Does Zolix separate Autonomous Database and Exadata costs from general compute?", a: "Yes. These workloads are tracked on their own, since their cost profile differs meaningfully from standard compute infrastructure." },
  { q: "How does Zolix handle OCI's compartment structure?", a: "Cost is mapped directly to compartments, matching how OCI tenancies are actually organized, rather than relying on a separate tagging scheme." },
  { q: "Does Zolix require write access to our OCI tenancy?", a: "No. Zolix connects through read-only access, following Oracle's recommended IAM practices, with no write access required." },
  { q: "How quickly can we see OCI cost visibility after connecting?", a: "Most teams receive a first cost visibility report within 24 hours of connecting their OCI tenancy." },
];

export default function OracleCloudTechnologyPage() {
  return (
    <>
      <JsonLd data={technologyArticleSchema("oracle-cloud", H1)} />
      <JsonLd data={faqSchema(faqs)} />
      <OracleCloudTechnology faqs={faqs} breadcrumbs={<Breadcrumbs items={technologyBreadcrumbs("oracle-cloud", H1)} />} />
    </>
  );
}
