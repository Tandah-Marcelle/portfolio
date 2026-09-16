import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });
loadEnv();
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

async function main() {
  console.log("Seeding portfolio database...");

  await prisma.admin.deleteMany({});
  await prisma.heroInfo.deleteMany({});
  await prisma.aboutInfo.deleteMany({});
  await prisma.experience.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.graphicDesign.deleteMany({});
  await prisma.skill.deleteMany({});
  await prisma.achievement.deleteMany({});
  await prisma.certificate.deleteMany({});
  await prisma.contactInfo.deleteMany({});

  // 1. Admin (login: Djimeli / Djimeli1234 — change after first login)
  const adminHash = await bcrypt.hash("Djimeli1234", 10);
  const admin = await prisma.admin.create({
    data: { username: "Djimeli", password: adminHash },
  });
  console.log("seeded admin:", admin.username);

  // 2. Hero
  await prisma.heroInfo.create({
    data: {
      id: "hero-info-id",
      title: "Hi, I'm TANDAH DJIMELI MARCELLE",
      subtitle: "Full Stack Developer & Social Impact Lead",
      description:
        "Bridging artificial intelligence and professional project management to build sustainable technology solutions for healthcare, education, and community safety.",
      cvPath: "/assets/pdf/CV_TANDAH-DJIMELI-MARCELLE.pdf",
    },
  });

  // 3. About
  await prisma.aboutInfo.create({
    data: {
      id: "about-info-id",
      description:
        "With over 3 years of experience in mobile and web development, I specialize in creating modern applications with a focus on sustainable social impact. As a certified project management professional and group leader, I bridge the gap between technical execution and community-driven innovation, ensuring that every line of code serves a greater societal purpose.",
    },
  });

  // 4. Experiences
  await prisma.experience.createMany({
    data: [
      {
        title: "Software Developer(full-time employee)",
        company: "Institut Universitaire de la Cote (IUC)",
        location: "Logbessou, Douala",
        period: "August 2025 - Present",
        description:
          "Driving the development of a lecturer self-service tool and an institutional Mediatech for document management. As a group leader, I ensure seamless communication between departments and project success, which led to my formal Project Management Certification.",
        order: 0,
      },
      {
        title: "Software Developer(Intern)",
        company: "Institut Universitaire de la Cote (IUC)",
        location: "Logbessou, Douala",
        period: "Feb 2025 - July 2025",
        description:
          "Driving the development of a lecturer self-service tool and an institutional Mediatech for document management. As a group leader, I ensure seamless communication between departments and project success, which led to my formal Project Management Certification.",
        order: 1,
      },
      {
        title: "Software Developer (Intern)",
        company: "Institut Universitaire de la Cote (IUC)",
        location: "Logbessou, Douala",
        period: "Sept 2024 - Jan 2025",
        description:
          "Led the development of the EDEN mobile application, enabling doctors to track patient referrals and commissions. My leadership efforts in coordinating this project inspired me to pursue professional Project Management training.",
        order: 2,
      },
      {
        title: "Junior Backend Developer & Graphic Designer",
        company: "Innovation Sarl",
        location: "Camp Yabassi, Douala",
        period: "2022 - 2023",
        description:
          "Coded critical modules for an event management system and delivered professional graphic designs for the enterprise and its diverse clientele.",
        order: 3,
      },
    ],
  });

  // 5. Projects
  await prisma.project.create({
    data: {
      title: "Agrobuild",
      description: "Open-source platform for sustainable agricultural machinery and local manufacturing.",
      image: "/assets/images/agrobuild.png",
      liveUrl: "https://agrobuild.netlify.app",
      githubUrl: "#",
      featured: true,
      hasDemo: true,
      stars: 112,
      summary: "An open hardware platform for sustainable agricultural machinery designed for local fabrication.",
      background:
        "Addressing import dependence and post-harvest losses in off-grid agricultural communities through open-source designs and local manufacturing empowerment.",
      skillSet: ["Full-stack Development", "CAD Integration", "UI/UX Design", "Sustainability Strategy", "Leadership"],
      contribution:
        "I developed the entire software ecosystem (front and back), from the machine documentation library to the multi-role community collaboration model. I spearheaded the 'Open by Design' philosophy for this project.",
      features: [
        "Machine Filter System (Crop type, Energy source, Status)",
        "Technical Documentation Library (CAD files, BOM, Build guides)",
        "Multi-role Registration (Farmer, Builder, Engineer, Trainer, Partner)",
        "Community Dashboard with contributor markers",
        "Interactive versioning for machine designs",
      ],
      order: 0,
    },
  });

  await prisma.project.create({
    data: {
      title: "TAMO SECURES - GBV",
      description: "Safety ecosystem with geolocalization and emergency response for GBV prevention.",
      image: "/assets/images/tamo_secures.png",
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      hasDemo: true,
      stars: 24,
      summary: "A holistic safety ecosystem dedicated to preventing Gender-Based Violence (GBV) through victim-centric technology.",
      background: "Providing immediate emergency response and long-term community support for victims of GBV in high-risk environments.",
      skillSet: ["Geolocalization", "Mobile App Development", "Real-time Systems", "Crisis Management UI", "Team Leadership"],
      contribution:
        "Served as Group Leader. I designed the user wireframes, led the frontend implementation, and personally developed the critical real-time victim geolocalization and panic button systems.",
      features: [
        {
          category: "Safety Ecosystem",
          items: [
            "Real-time Victim Geolocalization for emergency response",
            "One-tap Panic Button for immediate distress signaling",
            "Secure Incident Reporting with evidence attachment",
            "Privacy-first Anonymity options for victim reporting",
          ],
        },
        {
          category: "Community Support",
          items: [
            "Integrated Support Communities for shared healing",
            "Educational Resource Center for safety and legal aid",
            "Direct communication channels with support providers",
          ],
        },
      ],
      order: 1,
    },
  });

  await prisma.project.create({
    data: {
      title: "MED ASSIST - AI Companion",
      description: "AI-powered healthcare platform with conversational assistants and resource forecasting.",
      image: "/assets/images/medassist.png",
      liveUrl: "https://medassit.onrender.com",
      githubUrl: "#",
      featured: true,
      hasDemo: true,
      stars: 15,
      summary: "AI-powered medical assistant enhancing patient education and healthcare resource management.",
      background:
        "Bridge the gap in healthcare literacy and resource allocation (like blood supplies) in developing regions using conversational AI and predictive analytics.",
      skillSet: ["Conversational AI", "Natural Language Processing (NLP)", "Frontend Architecture", "Healthcare Tech", "Team Management"],
      contribution:
        "I led the development team and personally implemented all user interfaces and the Conversational AI Virtual Assistant. I focused on making the AI accessible to users of all literacy levels.",
      features: [
        "Multilingual Patient Feedback System (Voice/Text)",
        "Conversational AI Virtual Assistant for patient education",
        "AI-driven Blood Bank Forecasting and Management",
        "NLP-powered sentiment analysis for healthcare feedback",
      ],
      order: 2,
    },
  });

  await prisma.project.create({
    data: {
      title: "EDEN - Doctor Companion",
      description: "Partnership management and referral tracking system for diagnostic medical facilities.",
      image: "/assets/images/image0.png",
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      hasDemo: true,
      stars: 89,
      summary: "A management tool for medical partnerships and commission tracking for imaging services.",
      background: "Enhancing the transparency and efficiency of medical referrals between private clinics and diagnostic platforms like PDMD.",
      skillSet: ["React Native", "API Orchestration", "Financial Tracking UI", "Professional User Research", "Leadership"],
      contribution:
        "As Group Leader, I managed the project lifecycle and developed the entire user interface. I integrated the complex backend APIs used for tracking doctor commissions and patient diagnostic referrals.",
      features: [
        "Dynamic Doctor Partnership Overview",
        "Secure Professional Information Management",
        "Transparent Commission Tracking for referrals",
        "Mobile access to diagnostic service lists",
      ],
      order: 3,
    },
  });

  await prisma.project.create({
    data: {
      title: "GALIO - Lecturer Companion",
      description: "Institutional activity follow-up and document management system for academic staff.",
      image: "/assets/images/galiomob.png",
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      hasDemo: true,
      stars: 67,
      summary: "Institutional activity follow-up system for academic and administrative staff management.",
      background: "Digitizing institutional workflows in higher education to improve communication between lecturers and administrative departments.",
      skillSet: ["Software Engineering", "System Integration", "Mediatech Implementation", "Workflow Digitization", "Team Management"],
      contribution:
        "Group Leader. I led the development of the user interfaces and integrated the core activity management APIs. I also designed and implemented the 'Mediatech' module for institutional document control.",
      features: [
        "Lecturer Profiling and Role Management",
        "Digital Course Selection with Finalization locks",
        "Automated Schedule and Validation Tracking",
        "Institutional Mediatech for document repositories",
        "Request Management Dashboard for academic queries",
      ],
      order: 4,
    },
  });

  // 6. Skills
  await prisma.skill.createMany({
    data: [
      { category: "Frontend", name: "React JS", level: 92, order: 0 },
      { category: "Frontend", name: "TypeScript", level: 82, order: 1 },
      { category: "Frontend", name: "Flutter", level: 97, order: 2 },
      { category: "Frontend", name: "Tailwind CSS", level: 92, order: 3 },
      { category: "Backend", name: "Laravel", level: 88, order: 0 },
      { category: "Backend", name: "Python", level: 50, order: 1 },
      { category: "Backend", name: "PostgreSQL", level: 83, order: 2 },
      { category: "Backend", name: "Mysql", level: 90, order: 3 },
      { category: "Backend", name: "NestJS", level: 70, order: 4 },
      { category: "Tools & Others", name: "Git", level: 90, order: 0 },
      { category: "Tools & Others", name: "Docker", level: 65, order: 1 },
      { category: "Tools & Others", name: "Figma", level: 85, order: 2 },
    ],
  });

  // 7. Achievements
  await prisma.achievement.createMany({
    data: [
      {
        title: "Girls in ICT day challenge",
        organization: "African Women In Tech Startups-AFRICANWITS",
        date: "2024",
        location: "Douala, Cameroon",
        description:
          "My team (UNITY HAVEN) and I won the second place for developing a mobile health application that helps track and prevent gender-based violence in our community.",
        category: "Coding challenge",
        order: 0,
      },
      {
        title: "CODE2CARE - Finalist",
        organization: "Data Science without Borders (DSWB)",
        date: "2025",
        location: "Douala, Cameroon",
        description:
          "My team and I secured a place at the finals, out of 31 teams from different countries.",
        category: "Datathon",
        order: 1,
      },
    ],
  });

  // 8. Contact
  await prisma.contactInfo.upsert({
    where: { id: "contact-info-id" },
    create: {
      id: "contact-info-id",
      email: "tandahmarcelle2@gmail.com",
      phone: "+237 693450585 / +237 670418793",
      location: "Logbessou - Douala",
      github: "https://github.com",
      linkedin: "https://www.linkedin.com/in/tandah-djimeli-marcelle-1b1701303",
      whatsapp: "237693450585",
    },
    update: {},
  });

  console.log("Seeding portfolio completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
