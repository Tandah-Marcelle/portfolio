import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/route-helpers";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const body = await req.json().catch(() => ({}));
  const data: Record<string, unknown> = {};
  for (const key of ["description", "secondaryDescription", "imageUrl", "badgeText", "titlePrefix", "titleAccent", "quote", "motionKicker", "motionTitle", "motionBadge", "interpretTitle", "interpretText"]) {
    if (body[key] !== undefined) data[key] = body[key] || null;
  }
  if (body.description !== undefined) data.description = body.description;
  if (Array.isArray(body.pillars)) data.pillars = body.pillars;
  const about = await db.aboutInfo.upsert({
    where: { id: "about-info-id" },
    create: { id: "about-info-id", description: (data.description as string) ?? "", ...data },
    update: data,
  });
  return NextResponse.json(about);
}
