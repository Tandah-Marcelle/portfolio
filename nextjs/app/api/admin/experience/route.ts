import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { parseIntSafe, requireAdmin } from "@/lib/route-helpers";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const body = await req.json().catch(() => ({}));
  const exp = await db.experience.create({
    data: {
      title: body.title ?? "",
      company: body.company ?? "",
      location: body.location ?? "",
      period: body.period ?? "",
      description: body.description ?? "",
      logoUrl: body.logoUrl || null,
      order: parseIntSafe(body.order),
    },
  });
  return NextResponse.json(exp, { status: 201 });
}
