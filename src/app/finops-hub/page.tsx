import type { Metadata } from "next";
import CategoryHub from "@/components/CategoryHub";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("/finops-hub");

export default function FinOpsHubPage() {
  return (
    <CategoryHub
      category="resources"
      eyebrow="Cloud FinOps Hub"
      title="Cloud FinOps"
      intro="Your ultimate resource for FinOps excellence. Access guides, best practices, and industry news to master cloud financial management and cost optimization."
      hubPath="/finops-hub"
      hubLabel="Cloud FinOps Hub"
    />
  );
}
