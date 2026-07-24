import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import RetailEcommerce from "@/components/industries/RetailEcommerce";
import { RETAIL_ECOMMERCE_FAQ } from "@/components/industries/faqs";
import { industryArticleSchema, industryMetadata } from "@/lib/industries";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = industryMetadata("retail-ecommerce");

export default function RetailEcommerceIndustryPage() {
  return (
    <>
      <JsonLd data={industryArticleSchema("retail-ecommerce")} />
      <JsonLd data={faqSchema(RETAIL_ECOMMERCE_FAQ)} />
      <RetailEcommerce
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Industries", path: "/industries" },
              { name: "Retail & eCommerce", path: "/industries/retail-ecommerce" },
            ]}
          />
        }
      />
    </>
  );
}
