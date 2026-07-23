import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import Technology from "@/components/industries/Technology";
import { TECHNOLOGY_FAQ } from "@/components/industries/faqs";
import { industryArticleSchema, industryBreadcrumbs, industryMetadata } from "@/lib/industries";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = industryMetadata("technology");

export default function TechnologyIndustryPage() {
  return (
    <>
      <JsonLd data={industryArticleSchema("technology")} />
      <JsonLd data={faqSchema(TECHNOLOGY_FAQ)} />
      <Technology breadcrumbs={<Breadcrumbs items={industryBreadcrumbs("technology")} />} />
    </>
  );
}
