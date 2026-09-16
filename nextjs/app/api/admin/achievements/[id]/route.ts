import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { parseIntSafe, requireAdmin } from "@/lib/route-helpers";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const data: Record<string, unknown> = {};
  for (const key of ["title", "organization", "date", "location", "description", "category", "imageUrl"]) {
    if (body[key] !== undefined) data[key] = body[key] || null;
  }
  if (body.title !== undefined) data.title = body.title;
  if (body.organization !== undefined) data.organization = body.organization;
  if (body.date !== undefined) data.date = body.date;
  if (body.description !== undefined) data.description = body.description;
  if (Array.isArray(body.images)) data.images = body.images;
  if (body.order !== undefined) data.order = parseIntSafe(body.order);
  const achievement = await db.achievement.update({ where: { id }, data });
  return NextResponse.json(achievement);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await params;
  await db.achievement.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
