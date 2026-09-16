import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/route-helpers";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const body = await req.json().catch(() => ({}));
  const data: Record<string, string | undefined> = {};
  for (const key of ["email", "phone", "location", "github", "linkedin", "whatsapp"]) {
    if (body[key] !== undefined) data[key] = body[key];
  }
  const contact = await db.contactInfo.upsert({
    where: { id: "contact-info-id" },
    create: { id: "contact-info-id", ...data },
    update: data,
  });
  return NextResponse.json(contact);
}
