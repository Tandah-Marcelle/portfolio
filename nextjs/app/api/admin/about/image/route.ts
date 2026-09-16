import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/route-helpers";
import { uploadImage } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const form = await req.formData();
  const file = form.get("image");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ message: "No image file provided" }, { status: 400 });
  }
  const { secure_url } = await uploadImage(file);
  const about = await db.aboutInfo.upsert({
    where: { id: "about-info-id" },
    create: { id: "about-info-id", description: "", imageUrl: secure_url },
    update: { imageUrl: secure_url },
  });
  return NextResponse.json(about);
}
