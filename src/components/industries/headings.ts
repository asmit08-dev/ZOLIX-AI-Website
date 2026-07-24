import type { IndustrySlug } from "@/lib/industries";

/**
 * The visible H1 for each industry page, taken from the content document.
 * These replace the shorter "Cloud Cost Optimization Solutions for X" headings
 * that were already live — those remain the meta titles (per the SEO sheet) but
 * are no longer repeated on the page itself.
 *
 * Single source of truth: the page components render these, and the Article
 * structured data uses them so the schema headline matches what visitors see.
 */
export const INDUSTRY_H1: Record<IndustrySlug, string> = {
  gaming: "Cloud Cost Control for Gaming That Can't Afford to Slow Down",
  technology: "Cloud Cost Optimization Solutions for the Technology Industry",
  // The document opens this page with the intro paragraph and gives no
  // alternative heading, so the approved SEO-sheet H1 stands.
  "financial-services": "Cloud Cost Optimization Solutions for Financial Services",
  education: "Supporting Cost-Efficient Growth for Education Institutions",
  "healthcare-life-sciences": "Cloud Cost Visibility for Healthcare & Life Sciences",
  "manufacturing-logistics": "Cloud Cost Optimization Solutions for Manufacturing & Logistics",
  "retail-ecommerce": "Cloud Cost Optimization Solutions for Retail & eCommerce",
  government: "Cloud Cost Optimization Solutions for Government Agencies",
};
