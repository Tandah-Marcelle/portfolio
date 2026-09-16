import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { parseBool, parseIntSafe, parseJsonField, requireAdmin, str } from "@/lib/route-helpers";
import { uploadImage, uploadVideo } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

async function buildProjectData(form: FormData, existing?: { image: string | null; videoPath: string | null }) {
  const imageFile = form.get("image");
  const videoFile = form.get("video");

  let imageUrl = str(form.get("imageUrl")) ?? str(form.get("image")) ?? existing?.image ?? undefined;
  if (imageFile instanceof File && imageFile.size > 0) {
    imageUrl = (await uploadImage(imageFile)).secure_url;
  }
  let videoPath: string | null | undefined =
    str(form.get("videoPath")) ?? existing?.videoPath ?? null;
  if (videoFile instanceof File && videoFile.size > 0) {
    videoPath = (await uploadVideo(videoFile)).secure_url;
  }

  // Multi-image gallery: kept URLs from `images` JSON + newly uploaded `gallery` files.
  const keptImages = parseJsonField(form.get("images"), existing && "images" in existing ? (existing as { images: unknown }).images : []);
  const galleryUrls: string[] = [];
  for (const entry of form.getAll("gallery")) {
    if (entry instanceof File && entry.size > 0) {
      galleryUrls.push((await uploadImage(entry)).secure_url);
    }
  }
  const images = [...(Array.isArray(keptImages) ? keptImages : []), ...galleryUrls];

  return {
    title: str(form.get("title")),
    description: str(form.get("description")),
    category: str(form.get("category")),
    image: imageUrl,
    videoPath,
    isPrivateApp: form.has("isPrivateApp") ? parseBool(form.get("isPrivateApp")) : undefined,
    isTestVersion: form.has("isTestVersion") ? parseBool(form.get("isTestVersion")) : undefined,
    liveUrl: str(form.get("liveUrl")),
    githubUrl: str(form.get("githubUrl")),
    featured: form.has("featured") ? parseBool(form.get("featured")) : undefined,
    hasDemo: form.has("hasDemo") ? parseBool(form.get("hasDemo")) : undefined,
    stars: form.has("stars") ? parseIntSafe(form.get("stars")) : undefined,
    summary: str(form.get("summary")),
    background: str(form.get("background")),
    skillSet: form.has("skillSet") ? parseJsonField(form.get("skillSet")) : undefined,
    contribution: str(form.get("contribution")),
    features: form.has("features") ? parseJsonField(form.get("features")) : undefined,
    images,
    order: form.has("order") ? parseIntSafe(form.get("order")) : undefined,
  };
}

function stripUndefined<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as Partial<T>;
}

export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const form = await req.formData();
  const data = stripUndefined(await buildProjectData(form));
  const project = await db.project.create({
    data: {
      title: (data.title as string) ?? "",
      description: (data.description as string) ?? "",
      category: (data.category as string) ?? "Web Development",
      image: (data.image as string) ?? null,
      images: (data.images as object) ?? [],
      videoPath: (data.videoPath as string) ?? null,
      isPrivateApp: (data.isPrivateApp as boolean) ?? false,
      isTestVersion: (data.isTestVersion as boolean) ?? false,
      liveUrl: (data.liveUrl as string) ?? "#",
      githubUrl: (data.githubUrl as string) ?? "#",
      featured: (data.featured as boolean) ?? false,
      hasDemo: (data.hasDemo as boolean) ?? false,
      stars: (data.stars as number) ?? 0,
      summary: (data.summary as string) ?? "",
      background: (data.background as string) ?? "",
      skillSet: (data.skillSet as object) ?? [],
      contribution: (data.contribution as string) ?? "",
      features: (data.features as object) ?? [],
      order: (data.order as number) ?? 0,
    },
  });
  return NextResponse.json(project, { status: 201 });
}
