import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import FinancialServices from "@/components/industries/FinancialServices";
import { FINANCIAL_SERVICES_FAQ } from "@/components/industries/faqs";
import { industryArticleSchema, industryBreadcrumbs, industryMetadata } from "@/lib/industries";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = industryMetadata("financial-services");

export default function FinancialServicesIndustryPage() {
  return (
    <>
      <JsonLd data={industryArticleSchema("financial-services")} />
      <JsonLd data={faqSchema(FINANCIAL_SERVICES_FAQ)} />
      <FinancialServices breadcrumbs={<Breadcrumbs items={industryBreadcrumbs("financial-services")} />} />
    </>
  );
}
