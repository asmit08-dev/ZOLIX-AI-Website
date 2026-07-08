import type { Metadata } from "next";
import CloudFinOps from "@/components/products/CloudFinOps";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("/cloud-finops");

export default function CloudFinOpsPage() {
  return <CloudFinOps />;
}
