import type { Metadata } from "next";
import ZolixLite from "@/components/products/ZolixLite";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { PRODUCT_SCHEMA } from "@/lib/schema";

export const metadata: Metadata = buildMetadata("/zolix-lite");

export default function ZolixLitePage() {
  return (
    <>
      <JsonLd data={PRODUCT_SCHEMA["/zolix-lite"]} />
      <ZolixLite />
    </>
  );
}
