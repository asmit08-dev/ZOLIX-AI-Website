import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import ManufacturingLogistics from "@/components/industries/ManufacturingLogistics";
import { MANUFACTURING_LOGISTICS_FAQ } from "@/components/industries/faqs";
import { industryArticleSchema, industryBreadcrumbs, industryMetadata } from "@/lib/industries";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = industryMetadata("manufacturing-logistics");

export default function ManufacturingLogisticsIndustryPage() {
  return (
    <>
      <JsonLd data={industryArticleSchema("manufacturing-logistics")} />
      <JsonLd data={faqSchema(MANUFACTURING_LOGISTICS_FAQ)} />
      <ManufacturingLogistics breadcrumbs={<Breadcrumbs items={industryBreadcrumbs("manufacturing-logistics")} />} />
    </>
  );
}
