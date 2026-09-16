import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { parseBool, parseIntSafe, parseJsonField, requireAdmin, str } from "@/lib/route-helpers";
import { uploadImage, uploadVideo } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await params;
  const existing = await db.project.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ message: "Project not found" }, { status: 404 });

  const form = await req.formData();
  const imageFile = form.get("image");
  const videoFile = form.get("video");

  let imageUrl = existing.image;
  if (typeof form.get("imageUrl") === "string" && form.get("imageUrl") !== "") {
    imageUrl = form.get("imageUrl") as string;
  }
  if (imageFile instanceof File && imageFile.size > 0) {
    imageUrl = (await uploadImage(imageFile)).secure_url;
  }
  let videoPath = existing.videoPath;
  if (typeof form.get("videoPath") === "string") {
    videoPath = (form.get("videoPath") as string) || null;
  }
  if (videoFile instanceof File && videoFile.size > 0) {
    videoPath = (await uploadVideo(videoFile)).secure_url;
  }

  const data: Record<string, unknown> = { image: imageUrl, videoPath };
  const s = (k: string) => str(form.get(k));
  if (s("title") !== undefined) data.title = s("title");
  if (s("description") !== undefined) data.description = s("description");
  if (s("category") !== undefined) data.category = s("category");
  if (s("liveUrl") !== undefined) data.liveUrl = s("liveUrl");
  if (s("githubUrl") !== undefined) data.githubUrl = s("githubUrl");
  if (s("summary") !== undefined) data.summary = s("summary");
  if (s("background") !== undefined) data.background = s("background");
  if (s("contribution") !== undefined) data.contribution = s("contribution");
  if (form.has("isPrivateApp")) data.isPrivateApp = parseBool(form.get("isPrivateApp"));
  if (form.has("isTestVersion")) data.isTestVersion = parseBool(form.get("isTestVersion"));
  if (form.has("featured")) data.featured = parseBool(form.get("featured"));
  if (form.has("hasDemo")) data.hasDemo = parseBool(form.get("hasDemo"));
  if (form.has("stars")) data.stars = parseIntSafe(form.get("stars"));
  if (form.has("order")) data.order = parseIntSafe(form.get("order"));
  if (form.has("skillSet")) data.skillSet = parseJsonField(form.get("skillSet"));
  if (form.has("features")) data.features = parseJsonField(form.get("features"));
  // Gallery: client sends kept URLs in `images`, new `gallery` files append.
  if (form.has("images") || form.getAll("gallery").length > 0) {
    const kept = parseJsonField(form.get("images"), existing.images ?? []);
    const uploaded: string[] = [];
    for (const entry of form.getAll("gallery")) {
      if (entry instanceof File && entry.size > 0) {
        uploaded.push((await uploadImage(entry)).secure_url);
      }
    }
    data.images = [...(Array.isArray(kept) ? kept : []), ...uploaded];
  }

  const project = await db.project.update({ where: { id }, data });
  return NextResponse.json(project);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await params;
  await db.project.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
