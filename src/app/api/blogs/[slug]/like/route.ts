import { NextResponse } from "next/server";
import { incrementLikes } from "@/lib/blog";

export async function POST(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  try { const likes = await incrementLikes((await params).slug); return likes === undefined ? NextResponse.json({ error: "Blog not found." }, { status: 404 }) : NextResponse.json({ likes }); }
  catch { return NextResponse.json({ error: "Unable to add like." }, { status: 500 }); }
}
