import type { Metadata } from "next";
import CategoryHub from "@/components/CategoryHub";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("/technologies");

export default function TechnologiesPage() {
  return (
    <CategoryHub
      category="technologies"
      eyebrow="Technologies"
      title="Deep Integration with Modern Tech Stacks"
      intro="Explore the cutting-edge technologies behind Zolix. From Generative AI to GPU infrastructure, see how we power the next generation of cloud management."
      hubPath="/technologies"
      hubLabel="Technologies"
    />
  );
}
