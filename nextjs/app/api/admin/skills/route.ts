import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { parseIntSafe, requireAdmin } from "@/lib/route-helpers";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const body = await req.json().catch(() => ({}));
  const skill = await db.skill.create({
    data: {
      category: body.category ?? "",
      name: body.name ?? "",
      level: parseIntSafe(body.level, 80),
      color: body.color || "from-blue-600 to-blue-800",
      order: parseIntSafe(body.order),
    },
  });
  return NextResponse.json(skill, { status: 201 });
}
