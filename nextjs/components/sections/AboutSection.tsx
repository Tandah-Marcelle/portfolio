"use client";

import { Sparkles, Play, Compass, ShieldCheck, Heart, Zap, Layers, Award } from "lucide-react";
import CanvasScrollSequence from "@/components/ui/CanvasScrollSequence";
import type { BackendAbout, BackendPillar } from "../../lib/types";

interface AboutSectionProps {
  data?: BackendAbout;
}

const fallbackPillars: Array<BackendPillar & { icon: typeof ShieldCheck; accent: "emerald" | "orange" | "purple" }> = [
  {
    kicker: "01 / Purposeful Impact",
    title: "Social Impact Engineering",
    text: "Bridging technical execution with social purpose across institutional applications (Mediatech, Lecturer Tools) and gender-based violence safety platforms (TAMO SECURES).",
    icon: ShieldCheck,
    accent: "emerald",
  },
  {
    kicker: "02 / Human Empathy",
    title: "User Psychology & Connection",
    text: "Grounding software design in human psychology, accessibility, and intuitive workflows to ensure digital products empower end users.",
    icon: Heart,
    accent: "orange",
  },
  {
    kicker: "03 / Certified Governance",
    title: "Agile Leadership & AI Research",
    text: "Combining PMP project governance with continuous AI research (MED ASSIST companion) for scalable, dependable, and forward-looking solution delivery.",
    icon: Zap,
    accent: "purple",
  },
  {
    kicker: "04 / Enterprise Systems",
    title: "Institutional Scalability",
    text: "Architecting robust backend services and modular frontends for large-scale institutional user workflows and multi-role operations.",
    icon: Layers,
    accent: "emerald",
  },
];

const AboutSection = ({ data }: AboutSectionProps) => {
  const description =
    data?.description ||
    "With over 3 years of experience in mobile and web development, I specialize in creating modern applications with a focus on sustainable social impact. As a certified project management professional and group leader, I bridge the gap between technical execution and community-driven innovation, ensuring that every line of code serves a greater societal purpose.";
  const badgeText = data?.badgeText || "Philosophy, Vision & Motion";
  const titlePrefix = data?.titlePrefix || "BEYOND THE";
  const titleAccent = data?.titleAccent || "CODE";
  const quote = data?.quote || "Where Engineering Discipline Meets Human Empathy & Continuous Motion";
  const motionKicker = data?.motionKicker || "Dynamic 3D Motion Portrait";
  const motionTitle = data?.motionTitle || "Symbol of Continuous Evolution & Purposeful Energy";
  const motionBadge = data?.motionBadge || "130 Frames";
  const interpretTitle = data?.interpretTitle || "The Motion Portrait: Symbol of Continuous Momentum";
  const interpretText =
    data?.interpretText ||
    "The 130-frame 3D motion animation above represents more than visual artwork—it is a visual metaphor for my personal journey and engineering mindset. Symbolizing forward momentum, adaptability, and the organic flow of creative energy, it reflects how I approach software engineering: with relentless curiosity, resilience, and an unwavering commitment to driving meaningful, sustainable societal change frame by frame.";

  // Backend pillars (managed in /admin) reuse the curated styling by position.
  const dbPillars = Array.isArray(data?.pillars) ? (data?.pillars as BackendPillar[]) : [];
  const pillars = [0, 1, 2, 3].map((i) => ({
    ...fallbackPillars[i],
    kicker: dbPillars[i]?.kicker || fallbackPillars[i].kicker,
    title: dbPillars[i]?.title || fallbackPillars[i].title,
    text: dbPillars[i]?.text || fallbackPillars[i].text,
  }));

  return (
    <section id="about" className="py-12 relative overflow-hidden bg-[#07090E]">
      {/* Background Decorative Ambient Radial Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#FF6B00]/10 via-transparent to-[#00C853]/10 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="w-full max-w-[1700px] mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER: "BEYOND THE CODE" */}
        <div className="text-center mb-16 space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 badge-emerald text-xs md:text-sm px-4 py-1.5">
            <Sparkles className="w-4 h-4 text-[#00C853]" />
            <span className="font-semibold uppercase tracking-wider">{badgeText}</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase">
            {titlePrefix} <span className="text-gradient-orange">{titleAccent}</span>
          </h2>

          <p className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed pt-1 italic">
            "{quote}"
          </p>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed pt-2 max-w-3xl mx-auto font-normal">
            {description}
          </p>
        </div>

        {/* 3-COLUMN SPATIAL LAYOUT: Left Pillars | Center Large Video & Narrative | Right Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT FLOATING PILLARS (Touching Left Edge) */}
          <div className="lg:col-span-3 space-y-6 order-2 lg:order-1">
            {/* Pillar 01 */}
            <div className="glass-card p-6 rounded-3xl border border-white/10 hover:border-[#00C853]/50 transition-all duration-300 group bg-[#0F131D]/90 shadow-2xl">
              <div className="w-12 h-12 rounded-2xl bg-[#00C853]/15 border border-[#00C853]/30 flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
                <ShieldCheck className="w-6 h-6 text-[#00C853]" />
              </div>
              <div className="text-xs font-mono text-[#00C853] uppercase tracking-wider mb-1">{pillars[0].kicker}</div>
              <h4 className="text-base font-bold text-white mb-2 group-hover:text-[#00C853] transition-colors">
                {pillars[0].title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {pillars[0].text}
              </p>
            </div>

            {/* Pillar 02 */}
            <div className="glass-card p-6 rounded-3xl border border-white/10 hover:border-[#FF6B00]/50 transition-all duration-300 group bg-[#0F131D]/90 shadow-2xl">
              <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/15 border border-[#FF6B00]/30 flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
                <Heart className="w-6 h-6 text-[#FF6B00]" />
              </div>
              <div className="text-xs font-mono text-[#FF6B00] uppercase tracking-wider mb-1">{pillars[1].kicker}</div>
              <h4 className="text-base font-bold text-white mb-2 group-hover:text-[#FF6B00] transition-colors">
                {pillars[1].title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {pillars[1].text}
              </p>
            </div>
          </div>

          {/* CENTER COLUMN: Large Unreduced Video Sequence & Professional Interpretation */}
          <div className="lg:col-span-6 space-y-8 order-1 lg:order-2">
            
            {/* Prominent Video Sequence Showcase Container */}
            <div className="relative group w-full">
              {/* Ambient Glowing Halo Backdrop */}
              <div className="absolute -inset-3 bg-gradient-to-r from-[#FF6B00] via-[#FF8038] to-[#00C853] rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />

              {/* Video Box */}
              <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden border border-white/20 bg-[#07090E] shadow-2xl">
                <CanvasScrollSequence
                  totalFrames={130}
                  isInline={true}
                  autoPlay={true}
                  opacity={1}
                  fps={28}
                />

                {/* Gradient Vignette Mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-transparent to-[#07090E]/30 pointer-events-none" />

                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#0F131D]/90 backdrop-blur-md border border-white/15 flex items-center justify-between shadow-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-[#FF6B00] animate-ping" />
                    <div>
                      <span className="text-[10px] text-[#00C853] font-mono tracking-widest uppercase block">
                        {motionKicker}
                      </span>
                      <span className="text-xs md:text-sm font-bold text-white">
                        {motionTitle}
                      </span>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center space-x-2 badge-orange text-[11px] font-mono">
                    <Play size={10} className="text-[#FF6B00]" />
                    <span>{motionBadge}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* DEDICATED PROFESSIONAL VIDEO INTERPRETATION PARAGRAPH */}
            <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/15 bg-[#0F131D]/95 shadow-2xl border-l-4 border-l-[#FF6B00]">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-[#FF6B00]/15 rounded-xl border border-[#FF6B00]/30 text-[#FF6B00]">
                  <Compass size={18} />
                </div>
                <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wider">
                  {interpretTitle}
                </h3>
              </div>

              <p className="text-slate-200 text-xs md:text-sm leading-relaxed whitespace-pre-line">
                {interpretText}
              </p>
            </div>

          </div>

          {/* RIGHT FLOATING PILLARS (Touching Right Edge) */}
          <div className="lg:col-span-3 space-y-6 order-3 lg:order-3">
            {/* Pillar 03 */}
            <div className="glass-card p-6 rounded-3xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 group bg-[#0F131D]/90 shadow-2xl">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-xs font-mono text-purple-400 uppercase tracking-wider mb-1">{pillars[2].kicker}</div>
              <h4 className="text-base font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                {pillars[2].title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {pillars[2].text}
              </p>
            </div>

            {/* Pillar 04: Institutional Systems */}
            <div className="glass-card p-6 rounded-3xl border border-white/10 hover:border-[#00C853]/50 transition-all duration-300 group bg-[#0F131D]/90 shadow-2xl">
              <div className="w-12 h-12 rounded-2xl bg-[#00C853]/15 border border-[#00C853]/30 flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
                <Layers className="w-6 h-6 text-[#00C853]" />
              </div>
              <div className="text-xs font-mono text-[#00C853] uppercase tracking-wider mb-1">{pillars[3].kicker}</div>
              <h4 className="text-base font-bold text-white mb-2 group-hover:text-[#00C853] transition-colors">
                {pillars[3].title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {pillars[3].text}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;
