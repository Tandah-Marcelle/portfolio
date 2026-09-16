import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/route-helpers";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const body = await req.json().catch(() => ({}));
  const data: Record<string, string | undefined> = {};
  for (const key of ["title", "subtitle", "description", "cvPath", "cvPath2", "avatarUrl", "name", "roleBadge", "chipOne", "chipTwo", "linkedinUrl", "streamTitle", "streamHint"]) {
    if (body[key] !== undefined) data[key] = body[key] || null;
  }
  if (body.title !== undefined) data.title = body.title;
  if (body.subtitle !== undefined) data.subtitle = body.subtitle;
  if (body.description !== undefined) data.description = body.description;
  const hero = await db.heroInfo.upsert({
    where: { id: "hero-info-id" },
    create: {
      id: "hero-info-id",
      title: data.title ?? "",
      subtitle: data.subtitle ?? "",
      description: data.description ?? "",
      cvPath: data.cvPath,
      avatarUrl: data.avatarUrl,
    },
    update: data,
  });
  return NextResponse.json(hero);
}
