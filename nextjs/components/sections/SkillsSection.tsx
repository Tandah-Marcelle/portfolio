"use client";

import { Cpu, Code, Database, Wrench, Sparkles, Terminal, Layers } from "lucide-react";
import type { BackendSkill } from "../../lib/types";

interface SkillsSectionProps {
  data?: BackendSkill[];
}

const SkillsSection = ({ data }: SkillsSectionProps) => {
  // Ribbon icon: matched by skill name, falling back to the category icon.
  const iconForSkill = (name: string, category: string) => {
    const n = name.toLowerCase();
    if (n.includes("python") || n.includes("data") || n.includes("sql") || n.includes("postgres") || n.includes("mysql")) return Database;
    if (n.includes("docker") || n.includes("git") || n.includes("ci") || n.includes("figma") || n.includes("design")) return Wrench;
    if (n.includes("ai") || n.includes("motion") || n.includes("gsap") || n.includes("pmp") || n.includes("agile")) return Sparkles;
    if (n.includes("terminal") || n.includes("script") || n.includes("node") || n.includes("express") || n.includes("nest")) return Terminal;
    if (n.includes("prisma") || n.includes("redux") || n.includes("zustand") || n.includes("layer")) return Layers;
    const c = category.toLowerCase();
    if (c.includes("back")) return Database;
    if (c.includes("tool") || c.includes("devops") || c.includes("other")) return Wrench;
    if (c.includes("front")) return Code;
    return Cpu;
  };

  // Backend skills (managed in /admin) drive the ribbons; static lists are fallback.
  const dbRibbons =
    data && data.length > 0
      ? data
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((s) => ({ name: s.name.toUpperCase(), category: s.category, icon: iconForSkill(s.name, s.category) }))
      : null;
  const half = dbRibbons ? Math.ceil(dbRibbons.length / 2) : 0;
  // Ribbon 1 Tech Stack (Left-Scrolling Angled Ribbon)
  const ribbon1Tech = [
    { name: "NEXT.JS 15", category: "Framework", icon: Code },
    { name: "TYPESCRIPT", category: "Language", icon: Terminal },
    { name: "FRAMER MOTION", category: "Animation", icon: Sparkles },
    { name: "NESTJS", category: "Backend", icon: Database },
    { name: "PRISMA ORM", category: "Database", icon: Layers },
    { name: "TAILWIND CSS", category: "Styling", icon: Code },
    { name: "REACT 19", category: "Frontend", icon: Code },
    { name: "FIGMA", category: "Design", icon: Wrench },
    { name: "GSAP", category: "Motion", icon: Sparkles },
    { name: "SHADCN/UI", category: "UI Library", icon: Layers },
    { name: "AI HEALTHCARE", category: "Domain", icon: Cpu },
    { name: "REST & GRAPHQL", category: "API", icon: Terminal },
  ];

  // Ribbon 2 Tech Stack (Right-Scrolling Crossing Angled Ribbon)
  const ribbon2Tech = [
    { name: "PYTHON", category: "AI & Data", icon: Terminal },
    { name: "DATA SCIENCE", category: "Analytics", icon: Cpu },
    { name: "PMP METHODOLOGY", category: "Agile Lead", icon: Sparkles },
    { name: "DOCKER", category: "DevOps", icon: Wrench },
    { name: "SQLITE & POSTGRES", category: "Database", icon: Database },
    { name: "NODE.JS", category: "Runtime", icon: Terminal },
    { name: "EXPRESS.JS", category: "Backend", icon: Code },
    { name: "VERCEL", category: "Deployment", icon: Layers },
    { name: "GITHUB CI/CD", category: "DevOps", icon: Wrench },
    { name: "REDUX & ZUSTAND", category: "State", icon: Layers },
    { name: "GBV SAFETY TECH", category: "Impact", icon: Cpu },
    { name: "FLUTTER & DART", category: "Mobile", icon: Code },
  ];

  // Duplicate arrays for smooth seamless infinite loop marquee
  const ribbon1 = dbRibbons ? dbRibbons.slice(0, half) : ribbon1Tech;
  const ribbon2 = dbRibbons ? dbRibbons.slice(half) : ribbon2Tech;
  const loopRibbon1 = [...ribbon1, ...ribbon1, ...ribbon1];
  const loopRibbon2 = [...ribbon2, ...ribbon2, ...ribbon2];

  // Backend skills (managed in /admin) grouped by category, preserving order.
  // (Level-bar grid removed: the animated ribbons above are the live backend view.)

  return (
    <section id="skills" className="py-12 relative overflow-hidden bg-[#07090E]">
      {/* Background Decorative Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-[#FF6B00]/15 via-transparent to-[#00C853]/15 rounded-full filter blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 mb-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2.5 badge-orange text-sm px-4 py-1.5">
            <Cpu className="w-4 h-4 text-[#FF6B00]" />
            <span className="font-semibold uppercase tracking-wider">Tech Stack & Power Tools</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase">
            SKILLS & <span className="text-gradient-orange">TECHNOLOGIES</span>
          </h2>

          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            High-performance web, mobile, and backend architectures built for speed, reliability, and sustainable impact — zero fluff.
          </p>
        </div>
      </div>

      {/* DUAL CROSSING RIBBON MARQUEE SHOWCASE (Enlarged, Slower 65s Motion & High Contrast) */}
      <div className="relative py-20 overflow-hidden min-h-[380px] flex flex-col justify-center gap-6">

        {/* Top & Bottom Fade Gradients */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#07090E] to-transparent z-20 pointer-events-none soft-fade-top" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#07090E] to-transparent z-20 pointer-events-none soft-fade-bottom" />

        {/* RIBBON 1 (Angled -rotate-2, Left Scrolling, Tech Orange Accent) */}
        <div className="relative w-[120vw] left-[-10vw] -rotate-2 z-10">
          <div className="bg-[#0F131D]/95 border-y-2 border-[#FF6B00]/60 backdrop-blur-2xl py-5 overflow-hidden skills-ribbon">
            <div className="marquee-ribbon-left space-x-8 items-center">
              {loopRibbon1.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={`r1-${item.name}-${idx}`}
                    className="inline-flex items-center space-x-4 px-6 py-3.5 rounded-2xl bg-[#161C2A] border-2 border-[#FF6B00]/40 hover:border-[#FF6B00] transition-colors shrink-0 group skill-chip"
                  >
                    <div className="p-2 bg-[#FF6B00]/25 rounded-xl text-[#FF6B00] group-hover:scale-110 transition-transform">
                      <IconComp size={20} />
                    </div>
                    <span className="text-base md:text-lg font-black text-white tracking-wider font-mono">
                      {item.name}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#00C853] bg-[#00C853]/20 px-2.5 py-1 rounded-md border border-[#00C853]/30">
                      {item.category}
                    </span>
                    <span className="text-[#FF6B00] text-sm font-bold">//</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIBBON 2 (Angled rotate-2, Right Scrolling, Deep Emerald Accent, Fully Visible) */}
        <div className="relative w-[120vw] left-[-10vw] rotate-2 z-15">
          <div className="bg-[#0B111E]/95 border-y-2 border-[#00C853]/60 backdrop-blur-2xl py-5 overflow-hidden skills-ribbon">
            <div className="marquee-ribbon-right space-x-8 items-center">
              {loopRibbon2.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={`r2-${item.name}-${idx}`}
                    className="inline-flex items-center space-x-4 px-6 py-3.5 rounded-2xl bg-[#161C2A] border-2 border-[#00C853]/40 hover:border-[#00C853] transition-colors shrink-0 group skill-chip"
                  >
                    <div className="p-2 bg-[#00C853]/25 rounded-xl text-[#00C853] group-hover:scale-110 transition-transform">
                      <IconComp size={20} />
                    </div>
                    <span className="text-base md:text-lg font-black text-white tracking-wider font-mono">
                      {item.name}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/20 px-2.5 py-1 rounded-md border border-[#FF6B00]/30">
                      {item.category}
                    </span>
                    <span className="text-[#00C853] text-sm font-bold">//</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SkillsSection;
