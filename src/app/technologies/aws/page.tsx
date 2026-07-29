import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import AwsTechnology from "@/components/technologies/AwsTechnology";
import { technologyArticleSchema, technologyBreadcrumbs, technologyMetadata } from "@/lib/technologies";
import { faqSchema } from "@/lib/schema";

const H1 = "Cloud Cost Optimization Solutions for AWS";

export const metadata: Metadata = technologyMetadata("aws");

const faqs = [
  { q: "How is Zolix different from AWS Cost Explorer or Trusted Advisor?", a: "AWS's native tools require you to manually review recommendations and decide on commitments yourself. Zolix continuously monitors usage against every available discount mechanism - Savings Plans, Reserved Instances, Spot eligibility - and surfaces the gap automatically, without requiring a manual review cycle." },
  { q: "Does Zolix require write access to our AWS accounts?", a: "No. Zolix connects through read-only IAM roles, following AWS's recommended security practices, and never requires write access during setup or ongoing monitoring." },
  { q: "Can Zolix identify Spot Instance candidates automatically?", a: "Yes. Workloads are evaluated for actual fault tolerance and interruption sensitivity, so Spot recommendations reflect real workload behavior rather than a manual guess." },
  { q: "Does Zolix cover services beyond EC2?", a: "Yes. Rightsizing and cost analysis span EC2, RDS, Lambda, S3, and other core AWS services, not just compute." },
  { q: "How quickly can we see savings opportunities after connecting?", a: "Most teams receive a first cost visibility report within 24 hours, with prioritized recommendations following shortly after usage patterns are analyzed." },
];

export default function AwsTechnologyPage() {
  return (
    <>
      <JsonLd data={technologyArticleSchema("aws", H1)} />
      <JsonLd data={faqSchema(faqs)} />
      <AwsTechnology faqs={faqs} breadcrumbs={<Breadcrumbs items={technologyBreadcrumbs("aws", H1)} />} />
    </>
  );
}
