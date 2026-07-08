import type { Metadata } from "next";
import ZolixAdvance from "@/components/products/ZolixAdvance";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { PRODUCT_SCHEMA } from "@/lib/schema";

export const metadata: Metadata = buildMetadata("/zolix-advance");

export default function ZolixAdvancePage() {
  return (
    <>
      <JsonLd data={PRODUCT_SCHEMA["/zolix-advance"]} />
      <ZolixAdvance />
    </>
  );
}
