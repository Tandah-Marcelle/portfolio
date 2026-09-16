import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

/** Returns null when authorized, otherwise a 401 JSON response. */
export async function requireAdmin(): Promise<NextResponse | null> {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export function parseBool(v: unknown): boolean {
  return v === true || v === "true";
}

export function parseIntSafe(v: unknown, fallback = 0): number {
  const n = typeof v === "string" ? parseInt(v, 10) : (v as number);
  return Number.isFinite(n) ? (n as number) : fallback;
}

/** Accepts an already-parsed value or a JSON string (multipart fields arrive as strings). */
export function parseJsonField(v: unknown, fallback: unknown = []) {
  if (v === undefined || v === null || v === "") return fallback;
  if (typeof v === "string") {
    try {
      return JSON.parse(v);
    } catch {
      return fallback;
    }
  }
  return v;
}

export function str(v: FormDataEntryValue | null): string | undefined {
  if (typeof v !== "string" || v === "") return undefined;
  return v;
}
