import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { parseBool, parseIntSafe, requireAdmin, str } from "@/lib/route-helpers";
import { uploadAuto } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await params;
  const existing = await db.certificate.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ message: "Certificate not found" }, { status: 404 });

  const form = await req.formData();
  const file = form.get("file");
  const data: Record<string, unknown> = {};
  if (str(form.get("name")) !== undefined) data.name = str(form.get("name"));
  if (str(form.get("displayName")) !== undefined) data.displayName = str(form.get("displayName"));
  if (str(form.get("path")) !== undefined) data.path = str(form.get("path"));
  if (str(form.get("type")) !== undefined) data.type = str(form.get("type"));
  if (form.get("order") !== null) data.order = parseIntSafe(form.get("order"));
  if (form.get("verified") !== null) data.verified = parseBool(form.get("verified"));
  if (file instanceof File && file.size > 0) {
    data.path = (await uploadAuto(file)).secure_url;
    data.type = file.type.startsWith("image/") ? "image" : "pdf";
  }
  const cert = await db.certificate.update({ where: { id }, data });
  return NextResponse.json(cert);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await params;
  await db.certificate.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
