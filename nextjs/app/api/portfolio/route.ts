import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const [hero, about, experiences, volunteerings, projects, graphics, skills, achievements, certificates, contact] =
    await Promise.all([
      db.heroInfo.findUnique({ where: { id: "hero-info-id" } }),
      db.aboutInfo.findUnique({ where: { id: "about-info-id" } }),
      db.experience.findMany({ orderBy: { order: "asc" } }),
      db.volunteering.findMany({ orderBy: { order: "asc" } }),
      db.project.findMany({ orderBy: { order: "asc" } }),
      db.graphicDesign.findMany({ orderBy: { order: "asc" } }),
      db.skill.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] }),
      db.achievement.findMany({ orderBy: { order: "asc" } }),
      db.certificate.findMany({ orderBy: { order: "asc" } }),
      db.contactInfo.findUnique({ where: { id: "contact-info-id" } }),
    ]);

  return NextResponse.json({
    hero,
    about,
    experiences,
    volunteerings,
    projects,
    graphics,
    skills,
    achievements,
    certificates,
    contact,
  });
}
