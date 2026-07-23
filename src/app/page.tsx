import type { Metadata } from "next";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import StakeholderAlignment from "@/components/StakeholderAlignment";
import ProblemStatement from "@/components/ProblemStatement";
import USP from "@/components/USP";
import Products from "@/components/Products";
import Leadership from "@/components/Leadership";
import Testimonials from "@/components/Testimonials";
import PopularTopics from "@/components/PopularTopics";
import JsonLd from "@/components/JsonLd";
import FAQ, { type FaqItem } from "@/components/FAQ";
import { CTABanner, StatsRow, Steps } from "@/components/PageSections";
import { buildMetadata } from "@/lib/seo";
import { faqSchema, organizationSchema, websiteSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata("/");

const HOME_FAQ: FaqItem[] = [
  {
    q: "How does Zolix connect to my cloud accounts?",
    a: "Through read-only IAM roles or service accounts, following each provider's recommended security practices.",
  },
  {
    q: "Does Zolix modify my infrastructure?",
    a: "No. Setup is read-only. Any optimization action requires your explicit approval.",
  },
  {
    q: "Which cloud providers does Zolix support?",
    a: "AWS, Azure, GCP, and OCI, along with specialized GPU cloud providers.",
  },
  {
    q: "How is Zolix different from traditional FinOps tools?",
    a: "Traditional tools were built around VM-era workloads and static thresholds. Zolix is built specifically for AI infrastructure - tracking GPU clusters, LLM inference, and training costs that other platforms lump into general compute spend.",
  },
  {
    q: "How long does setup take?",
    a: "Most teams get their first cost visibility report within 24 hours of connecting accounts.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={websiteSchema()} />
      <JsonLd data={faqSchema(HOME_FAQ)} />

      <Hero />
      <TrustBar />
      <StakeholderAlignment />
      <ProblemStatement />
      <Products />

      <StatsRow
        title="Results Teams See With Zolix"
        stats={[
          {
            value: "Up to 35%",
            label:
              "of the infrastructure budget is typically lost to idle and over-provisioned resources - Zolix finds it before it compounds.",
          },
          {
            value: "24 Hours",
            label: "average time to first cost visibility report after connecting your accounts.",
          },
          {
            value: "Read-Only Setup",
            label: "Connect in minutes. Nothing in your infrastructure gets modified during onboarding.",
          },
        ]}
      />

      <Steps
        title="How It Works"
        steps={[
          {
            title: "Connect",
            desc: "Link your cloud accounts with read-only access. No changes to your existing infrastructure.",
          },
          {
            title: "Scan",
            desc: "Zolix analyzes usage and billing data against known waste patterns and cost benchmarks.",
          },
          {
            title: "Act",
            desc: "Get specific, prioritized recommendations - ranked by potential savings, not alert volume.",
          },
        ]}
      />

      <USP />
      <Leadership />
      <PopularTopics />
      <Testimonials />

      <FAQ items={HOME_FAQ} />

      <CTABanner
        title="Stop Losing Budget to Infrastructure You Don't Track"
        intro="Connect your accounts in minutes. Get a clear picture of where every dollar is going - and a plan for what to do next."
        primary={{ label: "Start scanning for free", href: "https://lite.zolix.ai/signup" }}
        secondary={{ label: "Explore All Features", href: "/products" }}
      />
    </>
  );
}
