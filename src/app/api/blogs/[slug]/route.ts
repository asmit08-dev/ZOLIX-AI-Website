import { NextRequest, NextResponse } from "next/server";
import { deleteBlog, updateBlog } from "@/lib/blog";
import { blogPayload, isAdmin, unauthorized } from "@/lib/blog-api";

type Props = { params: Promise<{ slug: string }> };

export async function PUT(request: NextRequest, { params }: Props) {
  if (!isAdmin(request)) return unauthorized();
  try {
    const blog = await updateBlog((await params).slug, await blogPayload(request));
    return blog ? NextResponse.json(blog) : NextResponse.json({ error: "Blog not found." }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to update blog." }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  if (!isAdmin(request)) return unauthorized();
  try {
    return (await deleteBlog((await params).slug))
      ? new NextResponse(null, { status: 204 })
      : NextResponse.json({ error: "Blog not found." }, { status: 404 });
  } catch {
    return NextResponse.json({ error: "Unable to delete blog." }, { status: 500 });
  }
}
