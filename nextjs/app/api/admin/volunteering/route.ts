import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { parseIntSafe, requireAdmin } from "@/lib/route-helpers";

export const dynamic = "force-dynamic";

export async function GET() {
    const items = await db.volunteering.findMany({
        orderBy: { order: "asc" },
    });
    return NextResponse.json(items);
}

export async function POST(req: Request) {
    const denied = await requireAdmin();
    if (denied) return denied;
    const body = await req.json().catch(() => ({}));
    const item = await db.volunteering.create({
        data: {
            role: body.role ?? "",
            organization: body.organization ?? "",
            period: body.period ?? "",
            location: body.location || null,
            description: body.description ?? "",
            logoUrl: body.logoUrl || null,
            images: Array.isArray(body.images) ? body.images : [],
            order: parseIntSafe(body.order),
        },
    });
    return NextResponse.json(item, { status: 201 });
}
