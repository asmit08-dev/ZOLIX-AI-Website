import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import GenerativeAiTechnology from "@/components/technologies/GenerativeAiTechnology";
import { technologyArticleSchema, technologyBreadcrumbs, technologyMetadata } from "@/lib/technologies";
import { faqSchema } from "@/lib/schema";

const H1 = "Cloud Cost Optimization Solutions for Generative AI";

export const metadata: Metadata = technologyMetadata("generative-ai");

const faqs = [
  { q: "Can Zolix track cost per model, per inference, or per user?", a: "Yes. Spend is broken down into unit economics - cost per inference, per token, per model, and per user - instead of a single blended AI line item." },
  { q: "Does Zolix integrate directly with Anthropic and OpenAI?", a: "Yes. Zolix connects directly to these providers, so token and API spend is visible at the source rather than estimated after the fact." },
  { q: "How does Zolix handle the volatility of token-based billing?", a: "Token spend is tracked continuously, not reported as a flat monthly average, so swings driven by prompt design, caching, or traffic changes stay visible as they happen." },
  { q: "Does allocating AI spend require manual tagging?", a: "No. Zolix's zero-agent engine attributes spend to its source automatically, without requiring manual instrumentation from engineering." },
  { q: "Can this connect AI cost to business outcomes like revenue or retention?", a: "Yes. Unit cost metrics can be tied to outcomes such as revenue per customer or engagement per feature, so GenAI spend can be evaluated against what it's actually producing." },
  { q: "Does Zolix require write access to our AI infrastructure?", a: "No. Zolix connects through read-only access, following each provider's recommended security practices, with no write access required." },
];

export default function GenerativeAiTechnologyPage() {
  return (
    <>
      <JsonLd data={technologyArticleSchema("generative-ai", H1)} />
      <JsonLd data={faqSchema(faqs)} />
      <GenerativeAiTechnology faqs={faqs} breadcrumbs={<Breadcrumbs items={technologyBreadcrumbs("generative-ai", H1)} />} />
    </>
  );
}
