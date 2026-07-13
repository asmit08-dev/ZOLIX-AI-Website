import { NextRequest, NextResponse } from "next/server";
import { exceedsMaxImageSize, isAllowedImageType, saveBlogImage } from "@/lib/blog-images";
import { isAdmin, unauthorized } from "@/lib/blog-api";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!isAdmin(request)) return unauthorized();

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No image file was provided." }, { status: 400 });
  }
  if (!isAllowedImageType(file.type)) {
    return NextResponse.json({ error: "Only JPEG, PNG, WebP, and GIF images are supported." }, { status: 400 });
  }
  if (exceedsMaxImageSize(file.size)) {
    return NextResponse.json({ error: "Images must be 5MB or smaller." }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const id = await saveBlogImage(file.type, buffer);
    return NextResponse.json({ url: `/api/blog-images/${id}` }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to upload image." }, { status: 500 });
  }
}
