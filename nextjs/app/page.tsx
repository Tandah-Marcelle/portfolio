import { db } from "@/lib/db";
import { ThemeProvider } from "@/components/ui/ThemeContext";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import VolunteeringSection from "@/components/sections/VolunteeringSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import CertificatesSection from "@/components/sections/CertificatesSection";
import ContactSection from "@/components/sections/ContactSection";

export const dynamic = "force-dynamic";

export default async function Home() {
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

  // Prisma returns Date objects — serialize to plain JSON for client components.
  const data = JSON.parse(
    JSON.stringify({ hero, about, experiences, volunteerings, projects, graphics, skills, achievements, certificates, contact }),
  );

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#07090E] text-white relative font-sans selection:bg-[#FF6B00] selection:text-white">
        {/* Floating Navbar */}
        <Header />

        {/* Main Content Sections */}
        <main className="relative z-10 space-y-4">
          <HeroSection data={data.hero} certificates={data.certificates} githubUrl={data.contact?.github} />
          <SkillsSection data={data.skills} />
          <AboutSection data={data.about} />
          <ProjectsSection data={data.projects} graphics={data.graphics} />
          <ExperienceSection data={data.experiences} />
          <VolunteeringSection data={data.volunteerings} />
          <AchievementsSection data={data.achievements} />
          <CertificatesSection data={data.certificates} />
          <ContactSection data={data.contact} />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
