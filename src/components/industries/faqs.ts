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
