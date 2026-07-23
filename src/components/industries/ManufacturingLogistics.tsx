"use client";

import { Database, Route, Warehouse, Wrench, Factory, HardDrive } from "lucide-react";
import FAQ from "@/components/FAQ";
import { MANUFACTURING_LOGISTICS_FAQ } from "./faqs";
import { INDUSTRY_H1 } from "./headings";
import { CardGrid, CTABanner, IndustryHero, Prose, StatsRow, Steps, type IndustryProps } from "@/components/PageSections";

export default function ManufacturingLogistics({ breadcrumbs }: IndustryProps) {
  return (
    <>
      <IndustryHero
        breadcrumbs={breadcrumbs}
        eyebrow="Industries — Manufacturing & Logistics"
        h1={INDUSTRY_H1["manufacturing-logistics"]}
        intro="Factory floors run on IoT sensors now, not just conveyor belts. Warehouses track every pallet through RFID and predictive routing software. All of that generates data - and data generates a cloud bill nobody planned for. Zolix helps manufacturing and logistics companies keep that spend under control without slowing down the sensors, the routes, or the production line."
        primary={{ label: "Explore All Features", href: "/products" }}
        secondary={{ label: "Book a Demo", href: "/demo" }}
      />

      <CardGrid
        title="Does This Sound Familiar?"
        intro="Most manufacturing and logistics companies run into the same handful of problems once IoT and analytics workloads move to the cloud. None of these are signs your team did something wrong - they're just what happens when infrastructure grows faster than anyone's watching it."
        columns={2}
        cards={[
          {
            title: "Sensor data piling up with nowhere to go",
            desc: "Factory floors generate a constant stream of telemetry from machines, sensors, and quality-control cameras. A lot of it gets stored and never looked at again, sitting in expensive storage tiers it never needed to be in.",
            icon: HardDrive,
          },
          {
            title: "Route optimization compute running around the clock",
            desc: "Fleet and route-planning tools often run on always-on compute, even during off-peak hours when there's barely any traffic to optimize for.",
            icon: Route,
          },
          {
            title: "Warehouse systems provisioned for peak, running at peak pricing year-round",
            desc: "Capacity gets sized for the holiday rush or a big seasonal order, and then nobody resizes it back down once the rush is over.",
            icon: Warehouse,
          },
          {
            title: "No one person owns the cloud bill",
            desc: "Between the plant's IT team, the logistics software vendor, and whoever set up the original cloud account, cost accountability tends to fall through the cracks.",
            icon: Factory,
          },
        ]}
      />

      <CardGrid
        title="What Zolix Does for Manufacturing & Logistics"
        theme="beige"
        cards={[
          {
            title: "IoT Telemetry Cost Management",
            desc: "Zolix tracks the volume and storage tier of sensor and machine telemetry data, and flags data sitting in high-cost storage that hasn't been accessed in months.",
            icon: Database,
          },
          {
            title: "Fleet and Route Compute Optimization",
            desc: "Compute tied to route-planning and fleet-tracking tools gets right-sized based on actual usage patterns - busy shipping season versus a quiet Tuesday in February look nothing alike, and your infrastructure shouldn't either.",
            icon: Route,
          },
          {
            title: "Warehouse System Rightsizing",
            desc: "Once a peak season ends, Zolix flags the capacity that was provisioned for it and never scaled back down.",
            icon: Warehouse,
          },
          {
            title: "Predictive Maintenance Workload Tracking",
            desc: "Machine learning models used for predictive maintenance often run on GPU or high-memory instances. Zolix tracks these separately from general compute, so you know exactly what predictive maintenance is costing you.",
            icon: Wrench,
          },
          {
            title: "Multi-Facility Cost Consolidation",
            desc: "For companies running infrastructure across multiple plants, warehouses, or distribution centers, Zolix pulls everything into a single view instead of a dozen disconnected dashboards.",
            icon: Factory,
          },
        ]}
      />

      <StatsRow
        title="The Numbers"
        stats={[
          { value: "$300Bn+", label: "lost annually across enterprises to unused or over-provisioned cloud infrastructure." },
          { value: "24 Hours", label: "average time to a first cost visibility report after connecting your accounts." },
          { value: "Read-Only Setup", label: "No agents, no write access, no changes to live plant or warehouse systems during onboarding." },
        ]}
      />

      <Steps
        title="How We Approach It"
        steps={[
          {
            title: "Connect",
            desc: "Link your cloud accounts through read-only access. Nothing changes on the factory floor or in the warehouse management system.",
          },
          {
            title: "Map the Spend",
            desc: "Zolix maps cost to specific workloads - sensor telemetry, route planning, warehouse systems, predictive maintenance - instead of leaving it all as one lump sum.",
          },
          {
            title: "Flag and Fix",
            desc: "You get specific, ranked recommendations. Not a 40-page report nobody has time to read - a prioritized list based on where the money actually is.",
          },
        ]}
      />

      <Prose
        title="Built For"
        paragraphs={[
          "Manufacturers running IoT sensor networks across production lines, logistics companies managing fleet and route-optimization software, warehouse operators with seasonal capacity swings, and any multi-facility operation where nobody currently has one clear view of total cloud spend.",
        ]}
      />

      <FAQ items={MANUFACTURING_LOGISTICS_FAQ} theme="beige" />

      <CTABanner
        title="Find Out What Your Sensors and Routes Are Actually Costing You"
        intro="Connect your accounts and see exactly where manufacturing and logistics spend is going - without touching a single system on the floor."
        primary={{ label: "Book a Demo", href: "/demo" }}
        secondary={{ label: "Start scanning for free", href: "https://lite.zolix.ai/signup" }}
      />
    </>
  );
}
