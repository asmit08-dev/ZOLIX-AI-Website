import type { Metadata } from "next";
import AIFinOps from "@/components/products/AIFinOps";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { PRODUCT_SCHEMA } from "@/lib/schema";

export const metadata: Metadata = buildMetadata("/ai-finops");

export default function AIFinOpsPage() {
  return (
    <>
      <JsonLd data={PRODUCT_SCHEMA["/ai-finops"]} />
      <AIFinOps />
    </>
  );
}
