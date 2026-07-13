import { NextRequest, NextResponse } from "next/server";
import { createBlog, getBlogs } from "@/lib/blog";
import { blogPayload, isAdmin, unauthorized } from "@/lib/blog-api";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (request.nextUrl.searchParams.get("admin") === "1" && !isAdmin(request)) return unauthorized();
  try { return NextResponse.json(await getBlogs(!isAdmin(request))); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to load blogs." }, { status: 500 }); }
}

export async function POST(request: NextRequest) {
  if (!isAdmin(request)) return unauthorized();
  try { return NextResponse.json(await createBlog(await blogPayload(request)), { status: 201 }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create blog." }, { status: 400 }); }
}
