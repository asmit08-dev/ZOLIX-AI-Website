import type { Metadata } from "next";
import ProductDetail from "@/components/ProductDetail";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("/products");

export default function ProductsPage() {
  return <ProductDetail />;
}
