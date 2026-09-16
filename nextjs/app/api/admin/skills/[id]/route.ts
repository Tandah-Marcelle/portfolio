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
  if (body.category !== undefined) data.category = body.category;
  if (body.name !== undefined) data.name = body.name;
  if (body.level !== undefined) data.level = parseIntSafe(body.level, 80);
  if (body.color !== undefined) data.color = body.color;
  if (body.order !== undefined) data.order = parseIntSafe(body.order);
  const skill = await db.skill.update({ where: { id }, data });
  return NextResponse.json(skill);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await params;
  await db.skill.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
