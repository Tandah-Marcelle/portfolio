"use client";

import Reveal from "../ui/Reveal";
import type { BackendSkill } from "../../lib/types";

interface SkillsSectionProps {
  data?: BackendSkill[];
}

const SkillsSection = ({ data }: SkillsSectionProps) => {
  // Flat skill list in backend order (category-grouped then flattened).
  const skills: string[] = (() => {
    if (!data || data.length === 0) return [];
    const map = new Map<string, BackendSkill[]>();
    for (const skill of data.slice().sort((a, b) => a.order - b.order)) {
      const list = map.get(skill.category);
      if (list) list.push(skill);
      else map.set(skill.category, [skill]);
    }
    return [...map.values()].flat().map((s) => s.name.toUpperCase());
  })();

  // Tripled for a seamless slow loop.
  const loop = [...skills, ...skills, ...skills];

  return (
    <section id="skills" className="py-12 relative overflow-hidden bg-[#07090E]">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase">
            SKILLS & <span className="text-gradient-orange">TECHNOLOGIES</span>
          </h2>

          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            High-performance web, mobile, and backend architectures built for speed, reliability, and sustainable impact — zero fluff.
          </p>
        </div>

        {skills.length > 0 && (
          <Reveal>
            <div className="relative overflow-hidden py-6">
              <div className="marquee-ribbon-right items-center" style={{ animationDuration: "100s" }}>
                {loop.map((name, idx) => (
                  <span key={`${name}-${idx}`} className="inline-flex items-center shrink-0">
                    <span className="skill-word text-xl md:text-2xl font-bold tracking-wider font-mono px-8">
                      {name}
                    </span>
                    <span className="skill-dot text-lg select-none">•</span>
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
