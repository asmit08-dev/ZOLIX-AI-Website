import type { Metadata } from "next";
import LegalContent from "@/components/LegalContent";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("/privacy");

export default function PrivacyPage() {
  return <LegalContent type="privacy" />;
}
