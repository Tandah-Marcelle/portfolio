import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/route-helpers";
import { uploadDoc } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ message: "No CV file provided" }, { status: 400 });
  }
  const { secure_url } = await uploadDoc(file);
  const slot = form.get("slot") === "2" ? "cvPath2" : "cvPath";
  const hero = await db.heroInfo.upsert({
    where: { id: "hero-info-id" },
    create: { id: "hero-info-id", title: "", subtitle: "", description: "", [slot]: secure_url },
    update: { [slot]: secure_url },
  });
  return NextResponse.json(hero);
}
