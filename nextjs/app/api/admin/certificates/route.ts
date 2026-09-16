import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { parseBool, parseIntSafe, requireAdmin, str } from "@/lib/route-helpers";
import { uploadAuto } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const form = await req.formData();
  const file = form.get("file");

  let path = str(form.get("path"));
  let type = str(form.get("type")) || "pdf";
  if (file instanceof File && file.size > 0) {
    path = (await uploadAuto(file)).secure_url;
    type = file.type.startsWith("image/") ? "image" : "pdf";
  }
  if (!path) {
    return NextResponse.json({ message: "Provide a file or a path" }, { status: 400 });
  }
  const cert = await db.certificate.create({
    data: {
      name: str(form.get("name")) ?? "Certificate",
      displayName: str(form.get("displayName")) ?? str(form.get("name")) ?? "Certificate",
      path,
      type,
      verified: parseBool(form.get("verified")),
      order: parseIntSafe(form.get("order")),
    },
  });
  return NextResponse.json(cert, { status: 201 });
}
