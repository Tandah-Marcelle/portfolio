"use client";

import type { ComponentType } from "react";
import { Calendar, MapPin, Briefcase, Triangle, CheckCircle2, ArrowRight } from "lucide-react";

interface Experience {
  id?: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  logoUrl?: string | null;
}

interface ExperienceSectionProps {
  data?: Experience[];
}

interface CardExperience {
  title: string;
  company: string;
  logo: ComponentType;
  logoUrl?: string | null;
  location: string;
  period: string;
  type: string;
  color: string;
  description: string;
  highlights: string[];
  tags: string[];
}

// Custom Vector SVG Logo for IUC (Institut Universitaire de la Côte)
const IucLogo = () => (
  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#161C2A] to-[#0A0D14] border border-white/20 flex items-center justify-center shadow-md shrink-0">
    <svg viewBox="0 0 100 100" className="w-6 h-6 text-white fill-current">
      <path d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z" fill="none" stroke="currentColor" strokeWidth="6" />
      <path d="M50 25 L70 38 L70 62 L50 75 L30 62 L30 38 Z" fill="#FF6B00" opacity="0.8" />
      <text x="50" y="58" textAnchor="middle" fontSize="22" fontWeight="900" fill="#FFFFFF" fontFamily="sans-serif">
        IUC
      </text>
    </svg>
  </div>
);

// Custom Vector SVG Logo for Innovation Sarl
const InnovationLogo = () => (
  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#161C2A] to-[#0A0D14] border border-white/20 flex items-center justify-center shadow-md shrink-0">
    <svg viewBox="0 0 100 100" className="w-6 h-6 text-white">
      <circle cx="50" cy="50" r="38" fill="none" stroke="#00C853" strokeWidth="6" />
      <path d="M35 30 L65 50 L35 70 Z" fill="#FF6B00" />
      <path d="M65 30 L35 50 L65 70 Z" fill="#FFFFFF" opacity="0.9" />
    </svg>
  </div>
);

// Fallback logo for companies without a custom vector logo
const DefaultLogo = () => (
  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#161C2A] to-[#0A0D14] border border-white/20 flex items-center justify-center shadow-md shrink-0">
    <Briefcase className="w-5 h-5 text-[#FF6B00]" />
  </div>
);

const logoForCompany = (company: string) => {
  const c = company.toLowerCase();
  if (c.includes("iuc") || c.includes("universitaire")) return IucLogo;
  if (c.includes("innovation")) return InnovationLogo;
  return DefaultLogo;
};

const colorCycle = ["orange", "emerald", "purple", "blue"];

const ExperienceSection = ({ data }: ExperienceSectionProps) => {
  const fallbackExperiences = [
    {
      title: "Software Developer (Full-Time)",
      company: "Institut Universitaire de la Côte (IUC)",
      logo: IucLogo,
      location: "Douala, CM",
      period: "Aug 2025 - Present",
      type: "Full-Time Employee",
      color: "orange",
      description:
        "Architecting institutional Mediatech and lecturer self-service platforms. Serving as Group Leader ensuring seamless inter-departmental delivery and PMP governance.",
      highlights: [
        "Lecturer Self-Service System Architecture",
        "Institutional Mediatech Document Hub",
        "PMP Project Leadership & Governance",
      ],
      tags: ["Next.js 15", "TypeScript", "NestJS", "PMP"],
    },
    {
      title: "Software Developer & Group Lead",
      company: "Institut Universitaire de la Côte (IUC)",
      logo: IucLogo,
      location: "Douala, CM",
      period: "Feb 2025 - July 2025",
      type: "Leadership Track",
      color: "emerald",
      description:
        "Led full-stack feature engineering across academic management portals, coordinating agile sprint cycles and inter-departmental software execution.",
      highlights: [
        "Academic Management Portal Upgrades",
        "Cross-Departmental Sprint Facilitation",
        "Multi-Role Permission & Security Matrix",
      ],
      tags: ["React", "Prisma ORM", "PostgreSQL", "Agile"],
    },
    {
      title: "Mobile & Backend Developer",
      company: "Institut Universitaire de la Côte (IUC)",
      logo: IucLogo,
      location: "Douala, CM",
      period: "Sept 2024 - Jan 2025",
      type: "Mobile Lead",
      color: "purple",
      description:
        "Engineered the EDEN mobile application enabling healthcare professionals to track doctor referrals and automated commission calculations in real-time.",
      highlights: [
        "EDEN Doctor Referral Tracker",
        "Automated Commission Engine",
        "Healthcare Workflow Integration",
      ],
      tags: ["Flutter", "Dart", "REST API", "Healthcare"],
    },
    {
      title: "Junior Backend Developer & Designer",
      company: "Innovation Sarl",
      logo: InnovationLogo,
      location: "Douala, CM",
      period: "2022 - 2023",
      type: "Foundation Role",
      color: "blue",
      description:
        "Coded backend service modules for enterprise event management systems and crafted high-impact brand identity and graphic assets for corporate clients.",
      highlights: [
        "Event Management Backend APIs",
        "Corporate Graphic Identity & Branding",
        "Database Architecture & Optimization",
      ],
      tags: ["Node.js", "Express", "Graphic Design", "MySQL"],
    },
  ];

  // Backend data takes precedence — admin edits show up on the site.
  // Falls back to the curated static timeline when the DB is empty.
  const experiences: CardExperience[] =
    data && data.length > 0
      ? data.map((exp, i) => ({
          title: exp.title,
          company: exp.company,
          logo: logoForCompany(exp.company),
          logoUrl: exp.logoUrl || null,
          location: exp.location,
          period: exp.period,
          type: "Professional Experience",
          color: colorCycle[i % colorCycle.length],
          description: exp.description,
          highlights: [] as string[],
          tags: [] as string[],
        }))
      : fallbackExperiences;

  // Keep the 4-column rhythm for 4+ items, collapse gracefully for fewer.
  const gridCols =
    experiences.length <= 1
      ? "lg:grid-cols-1 max-w-2xl mx-auto w-full"
      : experiences.length === 2
        ? "lg:grid-cols-2"
        : experiences.length === 3
          ? "lg:grid-cols-3"
          : "lg:grid-cols-4";

  return (
    <section id="experience" className="py-12 relative overflow-hidden bg-[#07090E]">
      {/* Background Decorative Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-[#FF6B00]/10 via-transparent to-[#00C853]/10 rounded-full filter blur-[180px] pointer-events-none" />

      {/* FULL SCREEN WIDTH CONTAINER (Edge-to-Edge Utilization) */}
      <div className="w-full max-w-[1850px] mx-auto px-4 md:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16 space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2.5 badge-orange text-xs md:text-sm px-4 py-1.5">
            <Briefcase className="w-4 h-4 text-[#FF6B00]" />
            <span className="font-semibold uppercase tracking-wider font-mono">Horizontal Career Timeline</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase">
            WORK <span className="text-gradient-orange">EXPERIENCE</span>
          </h2>

          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            A continuous left-to-right chronicle of software engineering, institutional modernization, and certified project leadership.
          </p>
        </div>

        {/* HORIZONTAL TIMELINE SPATIAL CONTAINER */}
        <div className="relative pt-6 pb-12">

          {/* Central Horizontal Axis Line (Desktop Edge-to-Edge Spine) */}
          <div className="hidden lg:block absolute left-4 right-4 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-[#FF6B00]/40 via-white/30 to-[#00C853]/40 z-10" />

          {/* DYNAMIC GRID (adapts to number of backend entries) */}
          <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols} gap-6 lg:gap-8 items-stretch relative z-20`}>
            {experiences.map((exp, index) => {
              const LogoComp = exp.logo;
              const isEven = index % 2 === 1;

              // Top vs Bottom offset for dynamic horizontal wave rhythm on desktop
              const offsetClass = isEven ? "lg:mt-10" : "lg:-mt-6";

              const borderAccent =
                exp.color === "orange"
                  ? "hover:border-[#FF6B00]/70 border-t-4 border-t-[#FF6B00]"
                  : exp.color === "emerald"
                    ? "hover:border-[#00C853]/70 border-t-4 border-t-[#00C853]"
                    : exp.color === "purple"
                      ? "hover:border-purple-500/70 border-t-4 border-t-purple-500"
                      : "hover:border-blue-500/70 border-t-4 border-t-blue-500";

              return (
                <div
                  key={index}
                  className={`flex flex-col justify-between glass-panel p-6 md:p-7 rounded-3xl border border-white/15 bg-[#0F131D]/95 transition-all duration-300 shadow-2xl group hover:-translate-y-2 relative ${offsetClass} ${borderAccent}`}
                >
                  {/* Central Triangle Node Indicator (Sitting on top of card) */}
                  <div className="hidden lg:flex absolute -top-4 left-1/2 -translate-x-1/2 z-30">
                    <div className="w-8 h-8 rounded-xl bg-[#0F131D] border border-white/30 group-hover:border-[#FF6B00] transition-colors flex items-center justify-center shadow-lg">
                      <Triangle className="w-3.5 h-3.5 text-[#FF6B00] fill-[#FF6B00]/30" />
                    </div>
                  </div>

                  <div>
                    {/* Company Logo & Role Header */}
                    <div className="flex items-start justify-between gap-3 mb-4 pb-4 border-b border-white/10">
                      <div className="flex items-center space-x-3">
                        {exp.logoUrl ? (
                          <img
                            src={exp.logoUrl}
                            alt={`${exp.company} logo`}
                            className="w-10 h-10 rounded-xl object-cover border border-white/20 shadow-md shrink-0 bg-white"
                          />
                        ) : (
                          <LogoComp />
                        )}
                        <div>
                          <span className="text-[10px] font-mono text-[#00C853] bg-[#00C853]/10 px-2 py-0.5 rounded-md border border-[#00C853]/20 block w-max mb-1">
                            {exp.type}
                          </span>
                          <h3 className="text-base font-bold text-white group-hover:text-[#FF6B00] transition-colors leading-snug">
                            {exp.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Company Name & Location */}
                    <div className="mb-4">
                      <h4 className="text-xs md:text-sm font-semibold text-slate-200">
                        {exp.company}
                      </h4>
                      <div className="flex items-center space-x-3 text-xs font-mono text-slate-400 mt-1">
                        <span className="flex items-center text-[#FF6B00]">
                          <Calendar size={12} className="mr-1" />
                          {exp.period}
                        </span>
                        <span className="flex items-center text-slate-400">
                          <MapPin size={12} className="mr-1" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* Narrative Summary */}
                    <p className="text-slate-300 text-xs leading-relaxed mb-4 whitespace-pre-line">
                      {exp.description}
                    </p>

                    {/* Structured Key Highlights (backend entries have none) */}
                    {exp.highlights.length > 0 && (
                      <div className="space-y-2 mb-6">
                        {exp.highlights.map((item, hIdx) => (
                          <div key={hIdx} className="flex items-start text-[11px] text-slate-200 leading-snug">
                            <CheckCircle2 size={13} className="text-[#00C853] mr-2 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Tech Stack Pills at Card Bottom (backend entries have none) */}
                  {exp.tags.length > 0 && (
                    <div className="pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                      {exp.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono text-slate-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default ExperienceSection;
