import type { Metadata } from "next";
import CategoryHub from "@/components/CategoryHub";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("/industries");

export default function IndustriesPage() {
  return (
    <CategoryHub
      category="industries"
      eyebrow="Industries"
      title="Engineered for Every Industry."
      intro="Tailored cloud optimization solutions for every sector. See how Zolix AI solves specific cost and performance challenges across diverse global industries."
      hubPath="/industries"
      hubLabel="Industries"
    />
  );
}
