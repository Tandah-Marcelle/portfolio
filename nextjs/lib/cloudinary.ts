import { v2 as cloudinary } from "cloudinary";

let configured = false;
function ensureConfig() {
  if (configured) return;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  configured = true;
}

type ResourceType = "image" | "video" | "raw" | "auto";

function uploadBuffer(
  buffer: Buffer,
  { folder, resourceType }: { folder: string; resourceType: ResourceType },
) {
  ensureConfig();
  return new Promise<{ secure_url: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Cloudinary upload returned no result"));
        resolve(result as { secure_url: string });
      },
    );
    stream.end(buffer);
  });
}

export async function uploadImage(file: File, folder = "portfolio") {
  const buffer = Buffer.from(await file.arrayBuffer());
  return uploadBuffer(buffer, { folder, resourceType: "image" });
}

export async function uploadVideo(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  return uploadBuffer(buffer, { folder: "portfolio/videos", resourceType: "video" });
}

/** PDFs, CVs, certificates. */
export async function uploadDoc(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  return uploadBuffer(buffer, { folder: "portfolio/docs", resourceType: "raw" });
}

/** Auto-detect image / video / raw. */
export async function uploadAuto(file: File, folder = "portfolio/docs") {
  const buffer = Buffer.from(await file.arrayBuffer());
  return uploadBuffer(buffer, { folder, resourceType: "auto" });
}
