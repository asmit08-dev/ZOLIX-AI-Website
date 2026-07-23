"use client";

import { Boxes, GitBranch, Layers, MoonStar, FlaskConical } from "lucide-react";
import FAQ from "@/components/FAQ";
import { TECHNOLOGY_FAQ } from "./faqs";
import { INDUSTRY_H1 } from "./headings";
import { CardGrid, CheckList, CTABanner, IndustryHero, Prose, type IndustryProps } from "@/components/PageSections";

export default function Technology({ breadcrumbs }: IndustryProps) {
  return (
    <>
      <IndustryHero
        breadcrumbs={breadcrumbs}
        eyebrow="Industries — Technology"
        h1={INDUSTRY_H1["technology"]}
        intro="Microservices, CI/CD pipelines, and always-on dev environments make cloud spend hard to track across the technology industry. Zolix gives engineering and finance teams at tech companies real-time visibility without slowing down releases."
        primary={{ label: "Start scanning for free", href: "https://lite.zolix.ai/signup" }}
        secondary={{ label: "Book a Demo", href: "/demo" }}
      />

      <CardGrid
        title="The Problem"
        columns={2}
        cards={[
          {
            title: "Always-on dev and staging",
            desc: "Dev, staging, and test environments often stay running around the clock, even though they're only used for a few hours a day.",
            icon: MoonStar,
          },
          {
            title: "Autoscaling without scale-down",
            desc: "Microservices handle traffic spikes well, but the scale-down side of that equation is where waste tends to hide.",
            icon: Layers,
          },
          {
            title: "CI/CD pipeline costs",
            desc: "Build and test runners get billed continuously across every team pushing code.",
            icon: GitBranch,
          },
          {
            title: "Unmonitored ML experimentation",
            desc: "Training jobs and notebooks are frequently left running long after the experiment itself has ended.",
            icon: FlaskConical,
          },
        ]}
      />

      <Prose
        title="What Zolix Tracks"
        theme="beige"
        paragraphs={[
          "For technology companies, Zolix gives engineering and finance teams visibility into exactly where infrastructure spend is going. Dev, staging, and production environments are tracked separately, so costs aren't blended into one number that hides where the real spend sits. Microservice-level cost attribution maps spend to individual services rather than entire clusters, so teams can see what their specific part of the architecture actually costs. CI/CD pipeline spend is tracked by team or repository, keeping build and test costs visible instead of buried in general compute. ML experiment tracking separates training jobs and notebooks from production infrastructure, and idle resource detection flags unused dev or staging environments automatically, before they quietly accumulate across billing cycles.",
        ]}
      />

      <CardGrid
        title="Core Capabilities"
        cards={[
          {
            title: "Environment Cost Visibility",
            desc: "See exactly what dev, staging, and production environments cost - instead of one blended number across your whole cloud bill.",
            icon: Boxes,
          },
          {
            title: "Microservice-Level Attribution",
            desc: "Cost mapped down to individual services, so teams can see what their part of the architecture actually costs to run.",
            icon: Layers,
          },
          {
            title: "CI/CD Pipeline Tracking",
            desc: "Build and test infrastructure spend tracked by team or repository, so pipeline costs don't get buried in general compute.",
            icon: GitBranch,
          },
          {
            title: "ML Experiment Tracking",
            desc: "Training jobs, notebooks, and experimentation environments tracked separately, so research spend doesn't quietly outgrow production spend.",
            icon: FlaskConical,
          },
          {
            title: "Automated Idle Detection",
            desc: "Dev and staging environments left running overnight or over weekends get flagged before they accumulate across billing cycles.",
            icon: MoonStar,
          },
        ]}
      />

      <CheckList
        title="Why This Matters"
        theme="beige"
        items={[
          "Dev and staging environments stop running unchecked after hours, since idle resources are flagged automatically",
          "Microservice costs are visible at the service level, not buried in a single cluster-wide number",
          "CI/CD pipeline spend is tracked by team or repository instead of disappearing into general compute",
          "ML experimentation costs are tracked separately from production, so research spend doesn't creep up unnoticed",
        ]}
      />

      <FAQ items={TECHNOLOGY_FAQ} />

      <CTABanner
        title="See Where Your Engineering Infrastructure Budget Actually Goes"
        intro="Connect your accounts and get visibility into environments, microservices, and pipeline costs - without changing how your team ships."
        primary={{ label: "Book a Demo", href: "/demo" }}
        secondary={{ label: "Start scanning for free", href: "https://lite.zolix.ai/signup" }}
      />
    </>
  );
}
