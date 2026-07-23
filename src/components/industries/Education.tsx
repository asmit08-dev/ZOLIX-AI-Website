"use client";

import {
  TrendingUp,
  Video,
  MonitorCheck,
  Building,
  ShieldCheck,
  PiggyBank,
  Eye,
  Trash2,
  Lock,
  CalendarRange,
  LayoutDashboard,
} from "lucide-react";
import FAQ from "@/components/FAQ";
import { EDUCATION_FAQ } from "./faqs";
import { INDUSTRY_H1 } from "./headings";
import { CardGrid, CheckList, CTABanner, IndustryHero, type IndustryProps } from "@/components/PageSections";

export default function Education({ breadcrumbs }: IndustryProps) {
  return (
    <>
      <IndustryHero
        breadcrumbs={breadcrumbs}
        eyebrow="Industries — Education"
        h1={INDUSTRY_H1["education"]}
        intro="Education has moved online faster than most infrastructure budgets can keep up with. Learning management systems, video lecture storage, and exam-season traffic spikes all put pressure on cloud spend - often without anyone watching closely until the bill arrives. Here's how Zolix simplifies cloud cost management for education institutions:"
        primary={{ label: "Book a Demo", href: "/demo" }}
        secondary={{ label: "Explore Platform", href: "/products" }}
      />

      {/* The hero intro ends on a colon that introduces these six cards, so this
          grid intentionally carries no heading of its own. */}
      <CardGrid
        cards={[
          {
            title: "Scaling Through Enrollment and Exam Season",
            desc: "Traffic spikes hard during enrollment windows and exam periods. Zolix tracks usage in real time, so capacity provisioned for a surge doesn't stay billed long after it.",
            icon: TrendingUp,
          },
          {
            title: "Managing Growing Video and Course Libraries",
            desc: "Lecture recordings, course materials, and media libraries grow fast and rarely get cleaned up. Zolix flags stale or duplicate storage before it quietly inflates your bill.",
            icon: Video,
          },
          {
            title: "Protecting LMS and Platform Uptime",
            desc: "Learning management systems need to stay responsive during peak usage. Zolix's monitoring runs on read-only access, so cost optimization never puts platform uptime at risk.",
            icon: MonitorCheck,
          },
          {
            title: "Unifying Multi-Campus Cost Visibility",
            desc: "Institutions running infrastructure across multiple campuses or departments often lack one consolidated view. Zolix consolidates spend across departments into a single, clear picture.",
            icon: Building,
          },
          {
            title: "Safeguarding Student Data",
            desc: "Education platforms manage sensitive student data under FERPA and similar regulations. Zolix's zero-agent model means cost visibility without write access to systems holding that data.",
            icon: ShieldCheck,
          },
          {
            title: "Optimizing Cloud Spend for Growth",
            desc: "As digital offerings expand, Zolix helps institutions manage and reduce cloud expenses - so budget goes toward better learning tools, not idle infrastructure.",
            icon: PiggyBank,
          },
        ]}
      />

      <CardGrid
        title="How Zolix Supports Education Institutions"
        theme="beige"
        cards={[
          {
            title: "Visibility From Day One",
            desc: "Connect your accounts and get a clear picture of where cloud spend is going, without weeks of setup.",
            icon: Eye,
          },
          {
            title: "Automated Waste Detection",
            desc: "Continuous scanning for idle instances, stale storage, and over-provisioned resources - flagged before they accumulate.",
            icon: Trash2,
          },
          {
            title: "Read-Only, Zero-Agent Setup",
            desc: "No write access to sensitive environments. Nothing about your infrastructure changes during onboarding.",
            icon: Lock,
          },
          {
            title: "Forecasting Built Around Academic Calendars",
            desc: "Budget forecasts that account for enrollment periods and exam-season spikes, not flat historical averages.",
            icon: CalendarRange,
          },
          {
            title: "Consolidated Multi-Department Reporting",
            desc: "One dashboard across departments and campuses, instead of separate views nobody has time to reconcile.",
            icon: LayoutDashboard,
          },
        ]}
      />

      <CheckList
        title="Why Institutions Choose Zolix"
        items={[
          "Cost visibility without compromising student data security",
          "Forecasting that accounts for academic-calendar traffic patterns",
          "Waste detection that catches storage and compute left running after peak periods",
          "One consolidated view across departments, campuses, and platforms",
        ]}
      />

      <FAQ items={EDUCATION_FAQ} theme="beige" />

      <CTABanner
        title="Give Your Institution's Cloud Budget the Same Structure as Your Academic Calendar"
        intro="Connect your accounts and get visibility into enrollment spikes, storage growth, and idle infrastructure - without touching student data."
        primary={{ label: "Book a Demo", href: "/demo" }}
        secondary={{ label: "Explore Platform", href: "/products" }}
      />
    </>
  );
}
