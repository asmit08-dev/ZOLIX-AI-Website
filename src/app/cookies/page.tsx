import type { Metadata } from "next";
import LegalContent from "@/components/LegalContent";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("/cookies");

export default function CookiesPage() {
  return <LegalContent type="cookies" />;
}
