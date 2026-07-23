import { NextRequest, NextResponse } from "next/server";
import type { BlogStatus } from "@/lib/blog";

export function isAdmin(request: NextRequest) {
  const token = process.env.BLOG_ADMIN_TOKEN;
  return Boolean(token && request.headers.get("authorization") === `Bearer ${token}`);
}

export function unauthorized() {
  return NextResponse.json({ error: "Administrator authorization is required. Enter the exact BLOG_ADMIN_TOKEN value." }, { status: 401 });
}

export async function blogPayload(request: NextRequest) {
  const body = await request.json();
  const validStatus = body.status === "draft" || body.status === "published";
  if (!body.title?.trim() || !body.category?.trim() || !body.content?.trim() || !validStatus) throw new Error("Title, category, content, and a valid status are required.");
  const { sanitizeBlogContent } = await import("@/lib/sanitize-html");
  return {
    title: String(body.title), subtitle: typeof body.subtitle === "string" ? body.subtitle : null,
    content: sanitizeBlogContent(String(body.content)), category: String(body.category),
    tags: Array.isArray(body.tags) ? body.tags.filter((tag: unknown): tag is string => typeof tag === "string").slice(0, 20) : [],
    // Answers render as text in the accordion, so they stay plain strings rather than HTML.
    faqs: Array.isArray(body.faqs)
      ? body.faqs
          .filter((item: unknown): item is { q: string; a: string } =>
            Boolean(item) && typeof (item as { q?: unknown }).q === "string" && typeof (item as { a?: unknown }).a === "string")
          .map(({ q, a }: { q: string; a: string }) => ({ q: q.trim(), a: a.trim() }))
          .filter((item: { q: string; a: string }) => item.q && item.a)
          .slice(0, 25)
      : [],
    status: body.status as BlogStatus, featured: Boolean(body.featured),
    coverImage: { url: typeof body.coverImage?.url === "string" ? body.coverImage.url : "", alt: typeof body.coverImage?.alt === "string" ? body.coverImage.alt : "" },
  };
}
