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
  const hero = await db.heroInfo.upsert({
    where: { id: "hero-info-id" },
    create: { id: "hero-info-id", title: "", subtitle: "", description: "", avatarUrl: secure_url },
    update: { avatarUrl: secure_url },
  });
  return NextResponse.json(hero);
}
