import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import Government from "@/components/industries/Government";
import { GOVERNMENT_FAQ } from "@/components/industries/faqs";
import { industryArticleSchema, industryBreadcrumbs, industryMetadata } from "@/lib/industries";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = industryMetadata("government");

export default function GovernmentIndustryPage() {
  return (
    <>
      <JsonLd data={industryArticleSchema("government")} />
      <JsonLd data={faqSchema(GOVERNMENT_FAQ)} />
      <Government breadcrumbs={<Breadcrumbs items={industryBreadcrumbs("government")} />} />
    </>
  );
}
