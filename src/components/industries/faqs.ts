import type { FaqItem } from "@/components/FAQ";

/**
 * FAQ content for the industry pages. This module is deliberately free of
 * "use client" so the route files (server components) can import the real
 * arrays to build FAQPage structured data — a client module would hand them
 * an opaque client reference instead.
 */

export const GAMING_FAQ: FaqItem[] = [
  {
    q: "Does Zolix affect server performance during peak traffic?",
    a: "No. Zolix connects through read-only access and doesn't interact with live game servers.",
  },
  {
    q: "Can Zolix track GPU costs for specific systems?",
    a: "Yes. Anti-cheat, matchmaking, and procedural generation can be tracked separately.",
  },
  {
    q: "How does Zolix handle launch-day traffic spikes?",
    a: "Forecasting is built around your event calendar, not flattened historical averages.",
  },
  {
    q: "Does this work for globally distributed matchmaking servers?",
    a: "Yes. Cost and usage are broken down region by region.",
  },
];

export const TECHNOLOGY_FAQ: FaqItem[] = [
  {
    q: "Does Zolix slow down deployments or CI/CD pipelines?",
    a: "No. Zolix connects through read-only access and monitors usage without interacting with active pipelines or deployments.",
  },
  {
    q: "Can it track costs for individual microservices?",
    a: "Yes. Spend can be broken down by service, not just by cluster or environment.",
  },
  {
    q: "Does it separate ML experimentation costs from production?",
    a: "Yes. Training jobs, notebooks, and experimentation environments are tracked separately from production infrastructure.",
  },
  {
    q: "How does it handle multiple dev and staging environments?",
    a: "Each environment is tracked individually, so idle or over-provisioned dev and staging resources are flagged before they accumulate.",
  },
];

export const FINANCIAL_SERVICES_FAQ: FaqItem[] = [
  {
    q: "Does Zolix need write access to our environments?",
    a: "No - and it never will. Zolix runs zero-agent, read-only, full stop.",
  },
  {
    q: "Are we still PCI-DSS and SOC2 compliant if we connect Zolix?",
    a: "Yes. Zolix was built to operate inside those boundaries, not around them.",
  },
  {
    q: "Can we see costs by banking product, not just by account?",
    a: "Yes. Attribution goes down to the product and regulatory entity level.",
  },
  {
    q: "How much faster is audit prep, really?",
    a: "Customers see roughly 40% faster prep time, since the data's already structured the way auditors ask for it.",
  },
];

export const EDUCATION_FAQ: FaqItem[] = [
  {
    q: "Does Zolix affect LMS or platform performance?",
    a: "No. Zolix connects through read-only access and doesn't interact with live systems.",
  },
  {
    q: "Is Zolix compatible with FERPA and similar data regulations?",
    a: "Yes. The zero-agent model means no write access to environments holding student data.",
  },
  {
    q: "Can Zolix handle multi-campus or multi-department infrastructure?",
    a: "Yes. Spend is consolidated into a single view across departments and campuses.",
  },
  {
    q: "Does it account for enrollment and exam-season spikes?",
    a: "Yes. Forecasting is built around academic-calendar patterns rather than flat historical trends.",
  },
];

export const MANUFACTURING_LOGISTICS_FAQ: FaqItem[] = [
  {
    q: "Does Zolix interfere with live plant or warehouse systems?",
    a: "No. Zolix connects through read-only access and never touches production systems directly.",
  },
  {
    q: "Can it separate IoT telemetry costs from general infrastructure spend?",
    a: "Yes. Sensor and telemetry data is tracked and reported on separately, including which storage tiers it's sitting in.",
  },
  {
    q: "Does it handle seasonal capacity spikes, like holiday shipping volume?",
    a: "Yes. Forecasting accounts for seasonal patterns, and warehouse capacity that was scaled up for a peak gets flagged once that peak passes.",
  },
  {
    q: "Can Zolix consolidate spend across multiple plants or warehouses?",
    a: "Yes. Multi-facility infrastructure is pulled into a single dashboard instead of staying scattered across separate accounts.",
  },
];

export const HEALTHCARE_LIFE_SCIENCES_FAQ: FaqItem[] = [
  {
    q: "Does Zolix require write access to systems holding patient data?",
    a: "No. Zolix is read-only and zero-agent by design, and never requires write access to any environment, including those holding patient or clinical data.",
  },
  {
    q: "Can Zolix identify imaging data that could move to cheaper storage?",
    a: "Yes. Access patterns are tracked so infrequently accessed studies can be flagged for a lower-cost tier, without changing retention policy.",
  },
  {
    q: "Does this affect HIPAA compliance?",
    a: "No. Zolix operates within existing compliance boundaries and does not require new access grants, agents, or exceptions.",
  },
  {
    q: "Can genomics or research compute be tracked separately from clinical systems?",
    a: "Yes. Research and sequencing workloads are tracked apart from clinical production infrastructure, so a busy research week does not disappear inside the overall bill.",
  },
  {
    q: "How quickly can we see where healthcare cloud spend is going?",
    a: "Most teams get a first cost visibility report within 24 hours of connecting accounts, with no changes made to live systems.",
  },
];

export const GOVERNMENT_FAQ: FaqItem[] = [
  {
    q: "Does this require write access to our environments?",
    a: "No. The model is read-only and zero-agent by design. No new security exceptions are required.",
  },
  {
    q: "Can spend be attributed to a specific program or contractor team?",
    a: "Yes. Cost data is structured around systems, programs, and contractor teams rather than cloud accounts alone.",
  },
  {
    q: "Does forecasting reflect our budget cycle rather than a generic calendar month?",
    a: "Yes. Forecasts are built to align with fixed government budget cycles.",
  },
  {
    q: "How does this support an audit request?",
    a: "Cost breakdowns remain traceable to specific programs and funding sources on an ongoing basis, reducing the manual reconstruction typically required when a request arrives.",
  },
];

export const RETAIL_ECOMMERCE_FAQ: FaqItem[] = [
  {
    q: "What are the benefits of cost optimization on Zolix, and how does it help retailers respond to demand changes faster?",
    a: "Zolix replaces static, after-the-fact cost reports with real-time visibility mapped to channels and campaigns. During a flash sale, viral product moment, or holiday traffic spike, teams can see what is driving cost before the bill compounds.",
  },
  {
    q: "How does Zolix help retail businesses during peak seasons?",
    a: "Zolix tracks capacity provisioned for seasonal spikes and flags it once the spike has passed, so a sale-time scale-up does not quietly become weeks of capacity that was never scaled down. Forecasting follows your actual sales calendar rather than a flat monthly average.",
  },
  {
    q: "Can Zolix help optimize costs across a multi-channel retail stack?",
    a: "Yes. Spend is broken down by storefront, marketplace, mobile app, and in-store systems, so a promotion running across several channels shows up as one traceable number instead of scattered line items.",
  },
  {
    q: "Does Zolix require access to our payment or customer data systems?",
    a: "No. Zolix operates on a read-only, zero-agent model. Cost visibility is achieved without write access to any system, including those handling payment or customer data.",
  },
  {
    q: "How long does it take to get visibility into our retail cloud spend?",
    a: "Most teams connect their accounts and receive a first cost visibility report within 24 hours, with no changes required to existing storefront infrastructure.",
  },
  {
    q: "Does Zolix support multi-cloud retail environments?",
    a: "Yes. Zolix connects across AWS, Azure, GCP, and OCI, giving retailers with more than one provider a consolidated view instead of separate dashboards.",
  },
];
