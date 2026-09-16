import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { createSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { username, password } = await req.json().catch(() => ({}));
  if (!username || !password) {
    return NextResponse.json({ message: "Username and password required" }, { status: 400 });
  }
  const admin = await db.admin.findUnique({ where: { username } });
  if (!admin) {
    return NextResponse.json({ message: "Invalid administrative credentials" }, { status: 401 });
  }
  const ok = await bcrypt.compare(password, admin.password);
  if (!ok) {
    return NextResponse.json({ message: "Invalid administrative credentials" }, { status: 401 });
  }
  await createSession(admin.username, admin.id);
  return NextResponse.json({ ok: true });
}
