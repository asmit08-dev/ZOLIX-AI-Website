"use client";

import { Landmark, Lock, LineChart } from "lucide-react";
import FAQ from "@/components/FAQ";
import { GOVERNMENT_FAQ } from "./faqs";
import { INDUSTRY_H1 } from "./headings";
import { CardGrid, CTABanner, IndustryHero, Prose, type IndustryProps } from "@/components/PageSections";

export default function Government({ breadcrumbs }: IndustryProps) {
  return (
    <>
      <IndustryHero
        breadcrumbs={breadcrumbs}
        eyebrow="Industries — Government"
        h1={INDUSTRY_H1["government"]}
        primary={{ label: "Book a Demo", href: "/demo" }}
        secondary={{ label: "Contact Us", href: "mailto:info@zolix.ai" }}
      />

      {/* The document heads this page's opening paragraph with its own title
          rather than stacking it under the H1, so it renders as a section. */}
      <Prose
        title="Cloud Spend Accountability"
        paragraphs={[
          "Government agencies operate cloud infrastructure across multiple contractor teams, procurement cycles, and funding sources. As the number of these layers grows, so does the difficulty of tracing a dollar of cloud spend back to the program or system it belongs to. This brief outlines where that difficulty typically originates, and how Zolix addresses it without requiring new access to sensitive environments.",
        ]}
      />

      {/* This page keeps the source document's formal briefing register, so the
          observed-patterns block stays as prose rather than sales-style cards. */}
      <Prose
        title="Observed Cost Patterns"
        paragraphs={[
          "Development and testing environments are frequently provisioned for a specific initiative and left running well past its conclusion. Across government cloud accounts, this remains one of the most consistent sources of recoverable spend.",
          "Where multiple contractor teams provision infrastructure independently, capacity is often sized conservatively at the outset and rarely revisited once actual usage patterns become clear.",
          "Budget cycles in government are fixed, but most cost forecasting updates only at the end of a reporting period. This gap leaves budget owners with less room to act before funds are already committed.",
          "When a chargeback or accountability request arrives, the mapping between cloud spend and the responsible program or contractor team is often reconstructed manually, after the fact, rather than maintained continuously.",
        ]}
      />

      <CardGrid
        title="How Zolix Responds"
        theme="beige"
        cards={[
          {
            title: "Governance",
            desc: "Cost accountability is structured around how agencies actually operate - by system, program, and contractor team - rather than by cloud account alone.",
            icon: Landmark,
          },
          {
            title: "Read-only monitoring",
            desc: "Zolix requires no agents and no IAM write access. Monitoring operates entirely within existing security controls, without requesting new exceptions.",
            icon: Lock,
          },
          {
            title: "Forecasting",
            desc: "Spend forecasts update continuously and are structured to align with fixed government budget cycles, rather than generic monthly reporting.",
            icon: LineChart,
          },
        ]}
      />

      <Prose
        title="Why This Approach"
        paragraphs={[
          "Government cloud spend carries a standard of accountability that most commercial environments do not require. It must be explainable, auditable, and traceable to a specific program or funding source on request. Zolix is designed around that standard rather than adapting to it after the fact - cost data is structured the way audit and budget review processes already expect it.",
        ]}
      />

      <Prose
        title="Applicability"
        theme="beige"
        paragraphs={[
          "This approach applies to federal, state, and local agencies managing infrastructure across multiple contractor teams; to defense and civilian agencies operating under strict compliance and procurement requirements; and to any government organization where cloud spend needs to be explainable down to the program or system level.",
        ]}
      />

      <FAQ items={GOVERNMENT_FAQ} title="Questions on Implementation" />

      <CTABanner
        title="Next Step"
        intro="Connect your accounts through a read-only, zero-exception setup. A clear, auditable view of current cloud spend is typically available within 24 hours."
        primary={{ label: "Book a Demo", href: "/demo" }}
        secondary={{ label: "Contact Us", href: "mailto:info@zolix.ai" }}
      />
    </>
  );
}
