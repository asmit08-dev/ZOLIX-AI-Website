"use client";

import { Activity, Cpu, CalendarClock, Globe2, Trash2 } from "lucide-react";
import FAQ from "@/components/FAQ";
import { GAMING_FAQ } from "./faqs";
import { INDUSTRY_H1 } from "./headings";
import { CardGrid, CheckList, CTABanner, DefinitionRows, IndustryHero, Prose, type IndustryProps } from "@/components/PageSections";

export default function Gaming({ breadcrumbs }: IndustryProps) {
  return (
    <>
      <IndustryHero
        breadcrumbs={breadcrumbs}
        eyebrow="Industries — Gaming"
        h1={INDUSTRY_H1["gaming"]}
        intro="Launch spikes, live-ops events, and unpredictable player traffic make gaming infrastructure some of the hardest to budget for. Zolix gives studios real-time cost visibility without touching performance."
        primary={{ label: "Start scanning for free", href: "https://lite.zolix.ai/signup" }}
        secondary={{ label: "Book a Demo", href: "/demo" }}
      />

      <CheckList
        title="Why Gaming Infrastructure Is Different"
        intro="Gaming workloads don't behave like typical SaaS traffic - and generic cost tools weren't built for that."
        items={[
          "Server demand can jump 10x overnight during launches and events",
          "Matchmaking requires low-latency servers spread across multiple regions",
          "GPU-backed AI systems now power NPCs, anti-cheat, and procedural content",
          "Staging and QA environments are often left running long after testing ends",
        ]}
      />

      <DefinitionRows
        title="What Zolix Tracks"
        columns={["Capability", "Details"]}
        rows={[
          { label: "Real-time traffic-based scaling insight", value: "Monitors usage continuously across regions" },
          { label: "GPU/AI cost separation", value: "Tracked separately from general compute spend" },
          { label: "Event-based forecasting", value: "Built around your launch and tournament calendar" },
          { label: "Regional cost breakdown", value: "Visibility into matchmaking and CDN spend by region" },
          { label: "Idle staging/QA detection", value: "Flagged automatically, no manual review needed" },
        ]}
      />

      <Prose
        title="Built For"
        paragraphs={[
          "Zolix is built for live-service studios running always-on multiplayer infrastructure with unpredictable daily load, mobile and PC publishers managing seasonal spikes around launches and events, studios running GPU-backed AI systems for gameplay, anti-cheat, or content generation, and teams managing infrastructure across multiple regions for latency-sensitive matchmaking.",
        ]}
      />

      <CardGrid
        title="Core Capabilities"
        theme="beige"
        cards={[
          {
            title: "Live Traffic Monitoring",
            desc: "Tracks server utilization across regions in real time, flagging capacity left running after a spike ends.",
            icon: Activity,
          },
          {
            title: "GPU & AI Workload Tracking",
            desc: "Separates anti-cheat, matchmaking, and procedural-generation costs from general compute.",
            icon: Cpu,
          },
          {
            title: "Automated Waste Cleanup",
            desc: "Flags idle staging environments and orphaned build servers before they pile up across billing cycles.",
            icon: Trash2,
          },
          {
            title: "Event-Based Forecasting",
            desc: "Builds budget forecasts around your launch and event calendar.",
            icon: CalendarClock,
          },
          {
            title: "Regional Cost Breakdown",
            desc: "Shows spend by region for matchmaking and CDN infrastructure.",
            icon: Globe2,
          },
        ]}
      />

      <Prose
        title="Why This Matters"
        paragraphs={[
          "With Zolix, usage is tracked in real time, so capacity stops getting billed the moment a launch spike ends. GPU and AI costs are broken down by the system driving them, instead of getting mixed into total compute spend. Forecasts are built around your actual event calendar, so budget surprises don't wait until the invoice arrives. And cost visibility is broken down region by region, so inefficiencies in any one location don't stay hidden.",
        ]}
      />

      <FAQ items={GAMING_FAQ} theme="beige" />

      <CTABanner
        title="See Where Your Infrastructure Budget Actually Goes"
        intro="Connect your accounts and get visibility into launch spikes, GPU costs, and idle infrastructure - without changing how your servers run."
        primary={{ label: "Start scanning for free", href: "https://lite.zolix.ai/signup" }}
        secondary={{ label: "Book a Demo", href: "/demo" }}
      />
    </>
  );
}
