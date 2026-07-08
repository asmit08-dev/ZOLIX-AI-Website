import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ProblemStatement from "@/components/ProblemStatement";
import USP from "@/components/USP";
import Products from "@/components/Products";
import Leadership from "@/components/Leadership";
import Testimonials from "@/components/Testimonials";
import PopularTopics from "@/components/PopularTopics";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { organizationSchema, websiteSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata("/");

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={websiteSchema()} />
      <Hero />
      <ProblemStatement />
      <USP />
      <Products />
      <Leadership />
      <PopularTopics />
      <Testimonials />
    </>
  );
}
