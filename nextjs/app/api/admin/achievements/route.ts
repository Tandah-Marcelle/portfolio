import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { parseIntSafe, requireAdmin } from "@/lib/route-helpers";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const body = await req.json().catch(() => ({}));
  const achievement = await db.achievement.create({
    data: {
      title: body.title ?? "",
      organization: body.organization ?? "",
      date: body.date ?? "",
      location: body.location || null,
      description: body.description ?? "",
      category: body.category || null,
      imageUrl: body.imageUrl || null,
      images: Array.isArray(body.images) ? body.images : [],
      order: parseIntSafe(body.order),
    },
  });
  return NextResponse.json(achievement, { status: 201 });
}
