import { NextRequest, NextResponse } from "next/server";
import { getBlogImage } from "@/lib/blog-images";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const image = await getBlogImage((await params).id);
    if (!image) return NextResponse.json({ error: "Image not found." }, { status: 404 });
    return new NextResponse(new Uint8Array(image.data), {
      headers: {
        "Content-Type": image.mimeType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Image not found." }, { status: 404 });
  }
}
