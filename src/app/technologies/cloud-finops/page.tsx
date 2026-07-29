import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import CloudFinopsTechnology from "@/components/technologies/CloudFinopsTechnology";
import { technologyArticleSchema, technologyBreadcrumbs, technologyMetadata } from "@/lib/technologies";
import { faqSchema } from "@/lib/schema";

const H1 = "Cloud Cost Optimization Solutions for Cloud FinOps";

export const metadata: Metadata = technologyMetadata("cloud-finops");

const faqs = [
  { q: "Does Zolix's allocation depend on our tagging coverage being complete?", a: "No. Zolix allocates 100% of spend using usage-based detection, including untagged and effectively untaggable resources, so allocation doesn't erode as tagging discipline drifts." },
  { q: "Can Zolix detect waste beyond simple instance rightsizing?", a: "Yes. Zolix looks at workload-level behavior - data processing patterns, query efficiency, GPU inference utilization - to find waste that an \"is this the right instance size\" check alone would miss." },
  { q: "Does Zolix cover Kubernetes and data platform costs, not just compute?", a: "Yes. Coverage spans container orchestration, data platforms, and standard compute, all attributed within the same platform." },
  { q: "How does Zolix handle Reserved Instance and Savings Plan management?", a: "Coverage is monitored continuously against actual usage, with recommendations that capture discount pricing without committing to risk your usage patterns don't support." },
  { q: "How quickly do we see a cost spike after it happens?", a: "Anomalies are flagged against a rolling baseline in real time, rather than waiting for the spike to show up on a monthly invoice." },
  { q: "Does Zolix require write access to our cloud environment?", a: "No. Zolix connects through read-only access, following each provider's recommended security practices, with no write access required at any point." },
];

export default function CloudFinopsTechnologyPage() {
  return (
    <>
      <JsonLd data={technologyArticleSchema("cloud-finops", H1)} />
      <JsonLd data={faqSchema(faqs)} />
      <CloudFinopsTechnology faqs={faqs} breadcrumbs={<Breadcrumbs items={technologyBreadcrumbs("cloud-finops", H1)} />} />
    </>
  );
}
