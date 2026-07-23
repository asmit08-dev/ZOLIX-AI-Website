import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import Education from "@/components/industries/Education";
import { EDUCATION_FAQ } from "@/components/industries/faqs";
import { industryArticleSchema, industryBreadcrumbs, industryMetadata } from "@/lib/industries";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = industryMetadata("education");

export default function EducationIndustryPage() {
  return (
    <>
      <JsonLd data={industryArticleSchema("education")} />
      <JsonLd data={faqSchema(EDUCATION_FAQ)} />
      <Education breadcrumbs={<Breadcrumbs items={industryBreadcrumbs("education")} />} />
    </>
  );
}
