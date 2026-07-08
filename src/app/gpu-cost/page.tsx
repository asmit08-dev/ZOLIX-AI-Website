import type { Metadata } from "next";
import GPUCost from "@/components/products/GPUCost";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("/gpu-cost");

export default function GPUCostPage() {
  return <GPUCost />;
}
