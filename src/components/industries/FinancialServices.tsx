"use client";

import { Building2, Lock, ArrowLeftRight, FileCheck } from "lucide-react";
import FAQ from "@/components/FAQ";
import { FINANCIAL_SERVICES_FAQ } from "./faqs";
import { INDUSTRY_H1 } from "./headings";
import { CardGrid, CheckList, CTABanner, IndustryHero, Prose, StatsRow, type IndustryProps } from "@/components/PageSections";

export default function FinancialServices({ breadcrumbs }: IndustryProps) {
  return (
    <>
      <IndustryHero
        breadcrumbs={breadcrumbs}
        eyebrow="Industries — Financial Services"
        h1={INDUSTRY_H1["financial-services"]}
        intro="Financial institutions can't run just any monitoring tool through a system bound by PCI-DSS and SOC2. Zolix gives banks, fintechs, and insurers full cost visibility across every regulated environment - zero agents, zero write access, zero exceptions."
        primary={{ label: "Book a Demo", href: "/demo" }}
        secondary={{ label: "Explore Platform", href: "/products" }}
      />

      <CheckList
        title="Where Financial Services Spend Actually Goes"
        items={[
          "Retail banking, cards, lending, and trading run on separate accounts - nobody at the institution has one number for total spend.",
          "Every cost tool you've tried wants IAM write access. Your compliance team says no. Every time.",
          "Regulators and auditors ask for a spend breakdown by entity. You spend three days pulling it from billing exports.",
          "Your private-to-public cloud egress bill keeps creeping up, and nobody's watching it closely enough.",
        ]}
      />

      <CardGrid
        title="What Financial Services Teams Get"
        theme="beige"
        columns={2}
        cards={[
          {
            title: "Spend, mapped to the business - not just the account.",
            desc: "See cost by banking product, by regulatory entity, by whatever unit actually matters to your institution's P&L.",
            icon: Building2,
          },
          {
            title: "Full visibility, zero write access.",
            desc: "Zolix reads. It never writes. Nothing changes in your PCI-DSS or SOC2-bound environments, ever.",
            icon: Lock,
          },
          {
            title: "Egress costs, tracked before they surprise you.",
            desc: "Data moving between private and public cloud gets flagged the moment it runs hot.",
            icon: ArrowLeftRight,
          },
          {
            title: "Audit prep that starts pre-built.",
            desc: "Reports structured the way your financial services compliance team already needs them - not reverse-engineered from a CSV the week before the audit.",
            icon: FileCheck,
          },
        ]}
      />

      <Prose
        title="Built for Teams Who Can't Cut Corners on Compliance"
        paragraphs={[
          "Banks, credit unions, and payment processors running regulated workloads. Fintechs operating under PCI-DSS or SOC2. Insurers with cost buried across siloed product lines. Compliance and finance teams tired of chasing engineering for numbers that should already exist.",
        ]}
      />

      <StatsRow
        title="Why Financial Services Teams Switch to Zolix"
        intro="Don't just cut cloud costs - cut them without opening a compliance exception request. Zolix works inside the access model your bank, fintech, or insurer's security team already approved, and gives finance the breakdowns they need without a single engineering ticket."
        stats={[
          { value: "40%", label: "faster compliance audit prep for cloud spend" },
          { value: "Zero", label: "IAM write access required, ever" },
          { value: "Real-time", label: "egress cost tracking across private and public cloud" },
        ]}
      />

      <FAQ items={FINANCIAL_SERVICES_FAQ} theme="beige" />

      <CTABanner
        title="Get the Numbers Your Auditors Are Going to Ask For - Before They Ask"
        intro="Connect in minutes. Read-only. Zero compliance exceptions required."
        primary={{ label: "Book a Demo", href: "/demo" }}
        secondary={{ label: "Explore Platform", href: "/products" }}
      />
    </>
  );
}
