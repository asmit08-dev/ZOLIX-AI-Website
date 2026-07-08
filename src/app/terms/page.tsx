import type { Metadata } from "next";
import LegalContent from "@/components/LegalContent";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("/terms");

export default function TermsPage() {
  return <LegalContent type="terms" />;
}
