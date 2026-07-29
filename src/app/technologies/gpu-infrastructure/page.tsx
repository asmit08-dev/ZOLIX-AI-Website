import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import GpuInfrastructureTechnology from "@/components/technologies/GpuInfrastructureTechnology";
import { technologyArticleSchema, technologyBreadcrumbs, technologyMetadata } from "@/lib/technologies";
import { faqSchema } from "@/lib/schema";

const H1 = "Cloud Cost Optimization Solutions for GPU Infrastructure";

export const metadata: Metadata = technologyMetadata("gpu-infrastructure");

const faqs = [
  { q: "Can Zolix detect idle GPU instances automatically?", a: "Yes. Utilization is monitored continuously, and instances allocated but not actively computing for extended periods are flagged automatically." },
  { q: "Does Zolix separate training costs from inference costs?", a: "Yes. These workload types are tracked separately from the start, since their cost drivers and optimization strategies are fundamentally different." },
  { q: "Can Zolix recommend the right GPU type for a given workload?", a: "Yes. Zolix flags mismatches between hardware and workload pattern, such as training-grade GPUs running inference traffic that a smaller instance could handle." },
  { q: "Does Zolix support multi-cloud GPU pricing comparisons?", a: "Yes. The GPU Calculator provides real-time pricing across AWS, Azure, GCP, and specialized GPU cloud providers for the same hardware class." },
  { q: "Does Zolix require agents inside our training or inference environments?", a: "No. Zolix connects through read-only IAM roles, with no agents installed inside GPU-backed environments at any point." },
  { q: "How quickly can we see GPU cost visibility after connecting?", a: "Most teams receive a first cost visibility report within 24 hours of connecting their GPU infrastructure." },
];

export default function GpuInfrastructureTechnologyPage() {
  return (
    <>
      <JsonLd data={technologyArticleSchema("gpu-infrastructure", H1)} />
      <JsonLd data={faqSchema(faqs)} />
      <GpuInfrastructureTechnology faqs={faqs} breadcrumbs={<Breadcrumbs items={technologyBreadcrumbs("gpu-infrastructure", H1)} />} />
    </>
  );
}
