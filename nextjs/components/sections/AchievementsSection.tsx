"use client";

import { useState, useEffect } from "react";
import { useLockBody } from "../ui/useLockBody";
import Reveal from "../ui/Reveal";
import { Trophy, Award, Calendar, MapPin, Sparkles, ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import type { BackendAchievement } from "../../lib/types";

interface AchievementsSectionProps {
  data?: BackendAchievement[];
}

const ImageSlider = ({ images, title, onExpand }: { images: string[]; title: string; onExpand?: (index: number) => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full mb-5 overflow-hidden rounded-lg border border-white/10 aspect-[16/9] bg-[#0B0F17] group/slider">
      {images.map((src, idx) => (
        <img
          key={`${src}-${idx}`}
          src={src}
          alt={`${title} photo ${idx + 1}`}
          onClick={() => onExpand?.(idx)}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${idx === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            } ${onExpand ? "cursor-zoom-in" : ""}`}
        />
      ))}

      <div className="absolute inset-0 bg-black/25 pointer-events-none" />

      {onExpand && (
        <div className="absolute top-3 left-3 px-2.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80 flex items-center gap-1.5 text-[10px] font-mono opacity-0 group-hover/slider:opacity-100 transition-opacity pointer-events-none">
          <Maximize2 size={12} />
          <span>Click to expand</span>
        </div>
      )}

      {images.length > 1 && (
        <>
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white backdrop-blur-md opacity-0 group-hover/slider:opacity-100 hover:bg-[#FF6B00] transition-all duration-300"
            aria-label="Previous image"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white backdrop-blur-md opacity-0 group-hover/slider:opacity-100 hover:bg-[#FF6B00] transition-all duration-300"
            aria-label="Next image"
          >
            <ChevronRight size={18} />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center space-x-2 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-6 bg-[#FF6B00]" : "w-1.5 bg-white/40 hover:bg-white/70"
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/80">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
};

const AchievementsSection = ({ data }: AchievementsSectionProps) => {
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number; title: string } | null>(null);
  useLockBody(lightbox !== null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((lb) => (lb ? { ...lb, index: (lb.index + 1) % lb.images.length } : lb));
      if (e.key === "ArrowLeft") setLightbox((lb) => (lb ? { ...lb, index: (lb.index - 1 + lb.images.length) % lb.images.length } : lb));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox !== null]);
  const fallback = [
    {
      title: "Girls in ICT Day Challenge — 2nd Place",
      organization: "African Women In Tech Startups (AFRICANWITS)",
      date: "2024",
      location: "Douala, Cameroon",
      description:
        "My team (UNITY HAVEN) won 2nd place for engineering TAMO SECURES, a mobile safety application for real-time tracking and gender-based violence prevention.",
      category: "Coding Competition",
      images: [] as string[],
      icon: Trophy,
    },
    {
      title: "CODE2CARE Datathon — International Finalist",
      organization: "Data Science Without Borders (DSWB)",
      date: "2025",
      location: "Douala, Cameroon",
      description:
        "Secured a place in the international finals out of 31 global teams for MED ASSIST, an AI medical companion providing predictive blood bank forecasting and multilingual education.",
      category: "Datathon & AI",
      images: [] as string[],
      icon: Award,
    },
  ];

  const achievements =
    data && data.length > 0
      ? data.map((a, i) => {
        const gallery = Array.isArray(a.images) ? a.images : [];
        const merged = [...gallery];
        if (a.imageUrl && !merged.includes(a.imageUrl)) merged.push(a.imageUrl);
        return {
          title: a.title,
          organization: a.organization,
          date: a.date,
          location: a.location || "",
          description: a.description,
          category: a.category || "Honors",
          images: merged,
          icon: i % 2 === 0 ? Trophy : Award,
        };
      })
      : fallback;

  return (
    <section id="achievements" className="py-12 relative overflow-hidden">
      <div className="w-full max-w-[1850px] mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight uppercase">
            Achievements & <span className="text-gradient-orange">Recognitions</span>
          </h2>

          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
            Competitive tech hackathons, international datathons, and community leadership awards.
          </p>
        </div>

        {/* Cards Grid — 5 per row, edge to edge */}
        <Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            return (
              <div
                key={index}
                className="glass-card p-6 rounded-xl border border-white/10 hover:border-[#FF6B00]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-lg bg-[#FF6B00] p-0.5 shadow-orange-glow">
                      <div className="w-full h-full bg-[#0F131D] rounded-[14px] flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-[#FF6B00] group-hover:scale-110 transition-transform" />
                      </div>
                    </div>

                    <span className="badge-orange text-[10px] uppercase font-bold tracking-wider">
                      {achievement.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FF6B00] transition-colors">
                    {achievement.title}
                  </h3>

                  <h4 className="text-sm font-semibold text-[#00C853] mb-4">
                    {achievement.organization}
                  </h4>

                  <div className="flex items-center space-x-4 text-xs font-mono text-slate-400 mb-4 pb-4 border-b border-white/10">
                    <div className="flex items-center">
                      <Calendar size={13} className="mr-1.5 text-[#FF6B00]" />
                      <span>{achievement.date}</span>
                    </div>
                    {achievement.location && (
                      <div className="flex items-center">
                        <MapPin size={13} className="mr-1.5 text-[#00C853]" />
                        <span>{achievement.location}</span>
                      </div>
                    )}
                  </div>

                  {achievement.images.length > 0 && (
                    <ImageSlider
                      images={achievement.images}
                      title={achievement.title}
                      onExpand={(idx) => setLightbox({ images: achievement.images, index: idx, title: achievement.title })}
                    />
                  )}

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {achievement.description}
                  </p>
                </div>

                <div className="mt-6 pt-2 flex items-center justify-end">
                  <Sparkles className="w-4 h-4 text-[#FF6B00] opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            );
          })}
        </div>
        </Reveal>
      </div>

      {/* Fullscreen Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-[90] p-4 md:p-10 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 p-3 rounded-full bg-white/10 hover:bg-[#FF6B00] text-white transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-black/60 border border-white/15 text-xs font-mono text-white/80">
            {lightbox.title} — {lightbox.index + 1} / {lightbox.images.length}
          </div>

          {lightbox.images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox({ ...lightbox, index: (lightbox.index - 1 + lightbox.images.length) % lightbox.images.length }); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-[#FF6B00] text-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox({ ...lightbox, index: (lightbox.index + 1) % lightbox.images.length }); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-[#FF6B00] text-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          <img
            src={lightbox.images[lightbox.index]}
            alt={`${lightbox.title} expanded view`}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-full object-contain rounded-lg border border-white/15 shadow-2xl"
          />
        </div>
      )}
    </section>
  );
};

export default AchievementsSection;
