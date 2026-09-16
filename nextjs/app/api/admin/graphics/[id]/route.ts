import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { parseIntSafe, requireAdmin, str } from "@/lib/route-helpers";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const data: Record<string, unknown> = {};
  if (body.title !== undefined) data.title = body.title || "Untitled Design";
  if (body.category !== undefined) data.category = body.category || "Promotional Flyers";
  if (body.order !== undefined) data.order = parseIntSafe(body.order);
  const graphic = await db.graphicDesign.update({ where: { id }, data });
  return NextResponse.json(graphic);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await params;
  await db.graphicDesign.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
