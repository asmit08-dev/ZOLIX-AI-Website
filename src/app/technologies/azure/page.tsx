import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import AzureTechnology from "@/components/technologies/AzureTechnology";
import { faqSchema } from "@/lib/schema";
import { pageAlternates, SITE_NAME, SITE_URL, TWITTER_HANDLE } from "@/lib/seo";

const title = "Azure Cost Optimization Solutions | ZOLIX AI";
const description = "Optimize Azure cloud costs with AI-powered cloud cost management, monitoring, and optimization solutions from ZOLIX.";

export const metadata: Metadata = {
  title,
  description,
  alternates: pageAlternates("/technologies/azure"),
  openGraph: { title, description, url: "/technologies/azure", siteName: SITE_NAME, type: "article", locale: "en_US" },
  twitter: { card: "summary_large_image", title, description, site: TWITTER_HANDLE },
};

const faqs = [
  { q: "Does Zolix need any agents installed inside our Azure subscriptions?", a: "No. Zolix connects through read-only IAM roles. No agents are deployed inside your environment." },
  { q: "Can Zolix track Azure OpenAI and Azure Machine Learning costs on their own?", a: "Yes. AI workload spend is tracked separately from general compute, so token and inference costs have their own clear line of visibility." },
  { q: "Does Zolix check our Reserved Instance and Savings Plan coverage?", a: "Yes. Coverage is compared against actual usage patterns, with specific recommendations on where additional coverage could reduce cost." },
  { q: "How long does it take to see results after connecting an Azure subscription?", a: "Most teams receive a first cost visibility report within 24 hours of connecting, followed by prioritized recommendations as patterns are analyzed." },
  { q: "Can Zolix handle multiple Azure subscriptions and management groups at once?", a: "Yes. Cost across connected subscriptions and management groups is consolidated into a single dashboard." },
  { q: "Does applying a recommendation require giving Zolix write access?", a: "No. Recommendations are detailed enough for your team to apply directly. Zolix remains read-only throughout." },
];

export default function AzureTechnologyPage() {
  const article = { "@context": "https://schema.org", "@type": "Article", headline: "Cloud Cost Optimization Solutions for Microsoft Azure", description, author: { "@type": "Organization", name: SITE_NAME }, publisher: { "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: `${SITE_URL}/assets/logo.webp` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/technologies/azure` } };
  return <><JsonLd data={article} /><JsonLd data={faqSchema(faqs)} /><AzureTechnology faqs={faqs} breadcrumbs={<Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Technologies", path: "/technologies" }, { name: "Cloud Cost Optimization Solutions for Microsoft Azure", path: "/technologies/azure" }]} />} /></>;
}
