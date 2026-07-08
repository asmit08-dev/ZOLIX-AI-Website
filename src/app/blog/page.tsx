import type { Metadata } from "next";
import InsightsHub from "@/components/InsightsHub";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("/blog");

export default function BlogPage() {
  return <InsightsHub mode="blog" />;
}
