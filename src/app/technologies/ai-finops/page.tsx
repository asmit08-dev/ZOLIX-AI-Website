import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import AiFinopsTechnology from "@/components/technologies/AiFinopsTechnology";
import { technologyArticleSchema, technologyBreadcrumbs, technologyMetadata } from "@/lib/technologies";
import { faqSchema } from "@/lib/schema";

const H1 = "AI FinOps Solutions That Reduce Cloud Costs & Increase Financial Control, Automatically";

export const metadata: Metadata = technologyMetadata("ai-finops");

const faqs = [
  { q: "What is AI FinOps, and why does our organization need it?", a: "AI FinOps applies the same visibility, attribution, and governance discipline that cloud FinOps brings to infrastructure - but built for token-based billing, shared GPU clusters, and the volatility unique to AI spend. Without it, most teams can see a total but not what's driving it." },
  { q: "How quickly can we expect measurable results after connecting?", a: "Most teams get a first cost visibility report within 24 hours of connecting their AI providers, with anomaly detection and attribution active from day one." },
  { q: "Do we need to build a dedicated AI FinOps team to get started?", a: "No. Zolix's zero-agent model and automated attribution mean you can start with continuous visibility immediately, without standing up a dedicated team first." },
  { q: "Does Zolix require write access to our AI provider accounts?", a: "No. Zolix operates entirely on read-only access, across every connected provider, at setup and afterward." },
  { q: "Can we start with showback before moving to formal chargeback?", a: "Yes. Attribution is built in from the start, so showback data can graduate into chargeback whenever your organization is ready, without rebuilding anything." },
  { q: "Which AI providers does Zolix integrate with directly?", a: "OpenAI, Anthropic, Amazon Bedrock, and Google Vertex, with token-based and GPU spend normalized into one consistent view." },
];

export default function AiFinopsTechnologyPage() {
  return (
    <>
      <JsonLd data={technologyArticleSchema("ai-finops", H1)} />
      <JsonLd data={faqSchema(faqs)} />
      <AiFinopsTechnology faqs={faqs} breadcrumbs={<Breadcrumbs items={technologyBreadcrumbs("ai-finops", H1)} />} />
    </>
  );
}
