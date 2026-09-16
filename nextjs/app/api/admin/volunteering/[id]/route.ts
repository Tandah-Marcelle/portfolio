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
    for (const key of ["role", "organization", "period", "location", "description", "logoUrl"]) {
        if (body[key] !== undefined) data[key] = body[key] || null;
    }
    if (body.role !== undefined) data.role = body.role;
    if (body.organization !== undefined) data.organization = body.organization;
    if (body.period !== undefined) data.period = body.period;
    if (body.description !== undefined) data.description = body.description;
    if (Array.isArray(body.images)) data.images = body.images;
    if (body.order !== undefined) data.order = parseIntSafe(body.order);

    const updated = await db.volunteering.update({
        where: { id },
        data,
    });
    return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const denied = await requireAdmin();
    if (denied) return denied;
    const { id } = await params;
    await db.volunteering.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted" });
}
