import type { Metadata } from "next";
import InsightsHub from "@/components/InsightsHub";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("/insights");

export default function InsightsPage() {
  return <InsightsHub mode="insights" />;
}
