import type { Metadata } from "next";
import FinOps from "@/components/FinOps";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("/finops");

export default function FinOpsPage() {
  return <FinOps />;
}
