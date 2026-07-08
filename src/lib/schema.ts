import { SITE_URL, SITE_NAME } from "./seo";

const LOGO_URL = `${SITE_URL}/assets/logo.webp`;

/**
 * Full Organization schema for the homepage.
 * Transcribed from the approved "Organization Schema Markup" audit sheet;
 * logo/image paths point to the real deployed asset (/assets/logo.webp).
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: "ZOLIX CLOUD INFRA SERVICES",
    legalName: "ZOLIX CLOUD INFRA SERVICES LLC",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
      width: 512,
      height: 512,
    },
    image: LOGO_URL,
    description:
      "The #1 Private AI-Powered Cloud FinOps Platform. ZOLIX AI helps enterprises cut cloud bills by up to 60% instantly using the proprietary C2O AI Engine — trained on 2M+ data points and 10,000+ global best practices. Fully compliant with ISO 27001, SOC 2 Type II, GDPR, and DPDPA.",
    foundingDate: "2024",
    email: "info@zolix.ai",
    slogan: "Cut AI & Cloud Costs Instantly",
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "info@zolix.ai",
        contactType: "customer support",
        areaServed: "Worldwide",
        availableLanguage: ["English"],
      },
      {
        "@type": "ContactPoint",
        email: "info@zolix.ai",
        contactType: "sales",
        areaServed: "Worldwide",
        availableLanguage: ["English"],
      },
    ],
    address: [
      {
        "@type": "PostalAddress",
        addressLocality: "Texas",
        addressRegion: "Texas",
        addressCountry: "US",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
    ],
    areaServed: "Worldwide",
    sameAs: [
      "https://www.linkedin.com/company/zolix-ai-engine/",
      "https://x.com/Zolix_AI",
    ],
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
      slogan: "Cut AI & Cloud Costs Instantly",
      logo: LOGO_URL,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "ZOLIX Cloud FinOps Products",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "SoftwareApplication",
            name: "ZOLIX Lite",
            url: `${SITE_URL}/zolix-lite`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "SoftwareApplication",
            name: "ZOLIX Advance",
            url: `${SITE_URL}/zolix-advance`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "SoftwareApplication",
            name: "ZOLIX AI FinOps",
            url: `${SITE_URL}/ai-finops`,
          },
        },
      ],
    },
    knowsAbout: [
      "Cloud Cost Optimization",
      "FinOps",
      "AI Infrastructure Cost Management",
      "AWS Cost Optimization",
      "Azure Cost Management",
      "Google Cloud Cost Optimization",
      "GPU Cost Optimization",
      "LLM Token Optimization",
      "Multi-Cloud Management",
    ],
    award: [
      "4.9 Stars on G2",
      "5.0 Stars on Clutch",
      "4.9 Stars on Product Hunt",
    ],
    member: [
      {
        "@type": "OrganizationRole",
        member: {
          "@type": "Person",
          name: "Raghuveer Sakuru",
          jobTitle: "Chief",
          sameAs: "https://www.linkedin.com/in/raghuveer-sakuru-4435a2140/",
        },
        roleName: "Chief",
      },
      {
        "@type": "OrganizationRole",
        member: {
          "@type": "Person",
          name: "Suraj Singh",
          jobTitle: "Product Head",
          sameAs: "https://www.linkedin.com/in/suraj-singh-61445522/",
        },
        roleName: "Product Head",
      },
      {
        "@type": "OrganizationRole",
        member: {
          "@type": "Person",
          name: "Ramesh Kasver",
          jobTitle: "Operation Head",
          sameAs: "https://www.linkedin.com/in/ramesh-kasver-1bb8b9a8/",
        },
        roleName: "Operation Head",
      },
      {
        "@type": "OrganizationRole",
        member: {
          "@type": "Person",
          name: "Neeraj Rastogi",
          jobTitle: "Business Head",
          sameAs: "https://www.linkedin.com/in/neeraj-rastogi-83a4561b1/",
        },
        roleName: "Business Head",
      },
      {
        "@type": "OrganizationRole",
        member: {
          "@type": "Person",
          name: "Vikas Koul",
          jobTitle: "Growth & Partnerships",
          sameAs: "https://www.linkedin.com/in/vikas-koul-544476155/",
        },
        roleName: "Growth & Partnerships",
      },
    ],
  };
}

/** WebSite schema for the homepage (enables sitelinks/brand recognition). */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}

/**
 * SoftwareApplication (Product) schemas for the three product pages.
 * Transcribed from the approved "Product Schema Markup" audit sheet;
 * image/logo paths point to the real deployed asset.
 */
export const PRODUCT_SCHEMA: Record<string, object> = {
  "/zolix-lite": {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ZOLIX Lite",
    alternateName: "Zolix Lite Free Cloud FinOps",
    description:
      "Experience the power of the C2O Engine for free. ZOLIX Lite offers zero-agent discovery, CUR integration, and AI Planner. Perfect for startups and mid-market teams with cloud spend under $25,000/month. Get a comprehensive audit and actionable rightsizing recommendations instantly.",
    url: `${SITE_URL}/zolix-lite`,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Cloud Cost Optimization",
    operatingSystem: "Web",
    image: LOGO_URL,
    screenshot: LOGO_URL,
    softwareVersion: "Lite Edition",
    keywords:
      "free cloud scan, cloud cost optimization, FinOps, AWS CUR, cloud audit, AI planner, GPU sizing, cloud savings",
    inLanguage: "en-US",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://lite.zolix.ai/login",
      seller: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    },
    featureList: [
      "Zero-Agent Discovery via AWS Cost and Usage Report (CUR) or Azure Billing Export",
      "AI Planner for GPU and model cost dimensioning",
      "100% Read-Only integration — billing metadata only",
      "Day-1 ROI Guaranteed",
      "Instant orphaned disk, idle load balancer, and over-provisioned instance detection",
      "Onboarding in under 60 seconds",
      "No credit card required",
      "Multi-cloud visibility: AWS, Azure, GCP, OCI",
    ],
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: LOGO_URL },
      email: "info@zolix.ai",
      sameAs: [
        "https://www.linkedin.com/company/zolix-ai-engine/",
        "https://x.com/Zolix_AI",
      ],
      address: {
        "@type": "PostalAddress",
        addressRegion: "Texas",
        addressCountry: "US",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "ZOLIX CLOUD INFRA SERVICES LLC",
      url: SITE_URL,
    },
  },
  "/zolix-advance": {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ZOLIX Advance",
    alternateName: "Zolix Advance Enterprise Cloud FinOps",
    description:
      "Unlock enterprise-grade capabilities with ZOLIX Advance — the complete Cloud FinOps operating system. Deep continuous optimization via secure IAM integration, combined with real-time AI operational tuning for maximum ROI. Designed for enterprises spending over $25,000/month on cloud infrastructure across AWS, Azure, GCP, and OCI.",
    url: `${SITE_URL}/zolix-advance`,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Enterprise Cloud Cost Optimization",
    operatingSystem: "Web",
    image: LOGO_URL,
    screenshot: LOGO_URL,
    softwareVersion: "Advance Edition",
    keywords:
      "enterprise cloud cost optimization, cloud FinOps, IAM integration, automated remediation, GPU optimization, multi-cloud management, cloud governance, CI/CD cost management, chargeback reporting, SSO RBAC",
    inLanguage: "en-US",
    isAccessibleForFree: false,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/demo`,
      price: "0",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "PriceSpecification",
        name: "Enterprise — Contact for Pricing",
        description:
          "Custom enterprise pricing. Contact info@zolix.ai for a tailored quote.",
      },
      seller: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    },
    featureList: [
      "Deep IAM Access for continuous 24/7 real-time optimization",
      "AI FinOps included — real-time GPU and LLM token tuning",
      "VRAM optimization to prevent GPU hoarding",
      "Automated Remediation integrated into CI/CD pipelines",
      "Unlimited daily scans for cloud spend above $25,000/month",
      "Role-Based Access Control (RBAC) and SAML/SSO integration",
      "Custom showback and chargeback dashboards",
      "Audit-ready PDF and CSV export for finance teams",
      "Dedicated FinOps Success Manager",
      "Multi-cloud: AWS, Azure, GCP, OCI",
      "SOC 2 Type II, GDPR, ISO 27001, DPDPA compliant",
      "Anomaly detection and instant alerts",
      "Enterprise Agreement (EA) negotiation support",
    ],
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: LOGO_URL },
      email: "info@zolix.ai",
      sameAs: [
        "https://www.linkedin.com/company/zolix-ai-engine/",
        "https://x.com/Zolix_AI",
      ],
      address: {
        "@type": "PostalAddress",
        addressRegion: "Texas",
        addressCountry: "US",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "ZOLIX CLOUD INFRA SERVICES LLC",
      url: SITE_URL,
    },
  },
  "/ai-finops": {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ZOLIX AI FinOps",
    alternateName: "AI FinOps by ZOLIX",
    description:
      "Revolutionize your financial operations with ZOLIX AI FinOps. Navigate the complexities of AI infrastructure costs — from initial GPU dimensioning with AI Planner to deep operational tuning. Automate budget tracking, anomaly detection, and cost allocation. Compare TCO between managed APIs and self-hosted models to drive sustainable cloud growth.",
    url: `${SITE_URL}/ai-finops`,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "AI Infrastructure Cost Optimization",
    operatingSystem: "Web",
    image: LOGO_URL,
    screenshot: LOGO_URL,
    softwareVersion: "AI FinOps Edition",
    keywords:
      "AI FinOps, GPU cost optimization, LLM cost management, AI infrastructure optimization, VRAM optimization, TCO modeling, AI Planner, vector database rightsizing, token cost optimization, GPU sizing, RAG pipeline cost, OpenAI cost management, Anthropic cost management",
    inLanguage: "en-US",
    isAccessibleForFree: false,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/demo`,
      seller: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    },
    featureList: [
      "AI Planner: GPU sizing — forecast H100, A100, or L4 requirements for your workload",
      "TCO Modeling: compare managed APIs (OpenAI, Anthropic) vs self-hosted open-source models",
      "Real-time VRAM and GPU utilization monitoring to prevent hoarding",
      "KV cache hit rate tracking for semantic caching implementation",
      "LLM token usage optimization",
      "Vector DB rightsizing — memory vs disk tiering for RAG pipelines",
      "AI infrastructure cost allocation and chargeback",
      "Automated budget tracking and anomaly detection for AI workloads",
      "Supports OpenAI, Anthropic, Meta, xAI workloads",
    ],
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: LOGO_URL },
      email: "info@zolix.ai",
      sameAs: [
        "https://www.linkedin.com/company/zolix-ai-engine/",
        "https://x.com/Zolix_AI",
      ],
      address: {
        "@type": "PostalAddress",
        addressRegion: "Texas",
        addressCountry: "US",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "ZOLIX CLOUD INFRA SERVICES LLC",
      url: SITE_URL,
    },
  },
};

/** FAQPage schema from a list of question/answer pairs. */
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/** BreadcrumbList schema from an ordered list of crumbs. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
