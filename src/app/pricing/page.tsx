import type { Metadata } from "next";
import Pricing from "@/components/Pricing";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("/pricing");

export default function PricingPage() {
  return <Pricing />;
}
