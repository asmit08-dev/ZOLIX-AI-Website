import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import Gaming from "@/components/industries/Gaming";
import { GAMING_FAQ } from "@/components/industries/faqs";
import { industryArticleSchema, industryBreadcrumbs, industryMetadata } from "@/lib/industries";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = industryMetadata("gaming");

export default function GamingIndustryPage() {
  return (
    <>
      <JsonLd data={industryArticleSchema("gaming")} />
      <JsonLd data={faqSchema(GAMING_FAQ)} />
      <Gaming breadcrumbs={<Breadcrumbs items={industryBreadcrumbs("gaming")} />} />
    </>
  );
}
