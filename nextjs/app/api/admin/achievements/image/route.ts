import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/route-helpers";
import { uploadImage } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    const denied = await requireAdmin();
    if (denied) return denied;
    const form = await req.formData();
    const file = form.get("image");
    if (!(file instanceof File) || file.size === 0) {
        return NextResponse.json({ message: "No image file provided" }, { status: 400 });
    }
    const { secure_url } = await uploadImage(file);
    return NextResponse.json({ imageUrl: secure_url });
}
