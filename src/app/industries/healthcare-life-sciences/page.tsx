import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import HealthcareLifeSciences from "@/components/industries/HealthcareLifeSciences";
import { HEALTHCARE_LIFE_SCIENCES_FAQ } from "@/components/industries/faqs";
import { industryArticleSchema, industryBreadcrumbs, industryMetadata } from "@/lib/industries";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = industryMetadata("healthcare-life-sciences");

export default function HealthcareLifeSciencesIndustryPage() {
  return (
    <>
      <JsonLd data={industryArticleSchema("healthcare-life-sciences")} />
      <JsonLd data={faqSchema(HEALTHCARE_LIFE_SCIENCES_FAQ)} />
      <HealthcareLifeSciences breadcrumbs={<Breadcrumbs items={industryBreadcrumbs("healthcare-life-sciences")} />} />
    </>
  );
}
