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
  for (const key of ["title", "company", "location", "period", "description", "logoUrl"]) {
    if (body[key] !== undefined) data[key] = body[key] || null;
  }
  if (body.order !== undefined) data.order = parseIntSafe(body.order);
  const exp = await db.experience.update({ where: { id }, data });
  return NextResponse.json(exp);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await params;
  await db.experience.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
