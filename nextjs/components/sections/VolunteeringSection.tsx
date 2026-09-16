"use client";

import { useState, useEffect } from "react";
import { HeartHandshake, Calendar, MapPin, ChevronLeft, ChevronRight, Sparkles, X, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLockBody } from "../ui/useLockBody";
import type { BackendVolunteering } from "../../lib/types";

interface VolunteeringSectionProps {
    data?: BackendVolunteering[];
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
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 mb-6 bg-[#0B0F17] group">
            <AnimatePresence mode="wait">
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`${title} photo ${currentIndex + 1}`}
                    onClick={() => onExpand?.(currentIndex)}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className={`w-full h-full object-cover ${onExpand ? "cursor-zoom-in" : ""}`}
                />
            </AnimatePresence>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {onExpand && (
                <div className="absolute top-3 left-3 px-2.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80 flex items-center gap-1.5 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <Maximize2 size={12} />
                    <span>Click to expand</span>
                </div>
            )}

            {images.length > 1 && (
                <>
                    {/* Controls */}
                    <button
                        onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 hover:bg-[#FF6B00] transition-all duration-300"
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 hover:bg-[#FF6B00] transition-all duration-300"
                        aria-label="Next image"
                    >
                        <ChevronRight size={18} />
                    </button>

                    {/* Dots Indicator */}
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

                    {/* Counter Badge */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/80">
                        {currentIndex + 1} / {images.length}
                    </div>
                </>
            )}
        </div>
    );
};

const VolunteeringSection = ({ data }: VolunteeringSectionProps) => {
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
    const fallback: BackendVolunteering[] = [
        {
            id: "fallback-1",
            role: "Tech Community Organizer & Lead",
            organization: "Google Women Techmakers & Developer Groups",
            period: "2023 - Present",
            location: "Douala, Cameroon",
            description:
                "Leading technical workshops, mentoring young women in software engineering, and organizing developer conferences to democratize tech skills.",
            images: [
                "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
            ],
            order: 1,
        },
        {
            id: "fallback-2",
            role: "STEM & Robotics Youth Mentor",
            organization: "AfricanWits Youth Initiative",
            period: "2024",
            location: "Douala, Cameroon",
            description:
                "Trained high school students in introductory web development, algorithmic logic, and collaborative project building for national hackathons.",
            images: [
                "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
            ],
            order: 2,
        },
    ];

    const items = data && data.length > 0 ? data : fallback;

    return (
        <section id="volunteering" className="py-12 relative overflow-hidden bg-[#07090E]">
            {/* Background Decorative Ambient Radial Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-r from-[#00C853]/10 via-transparent to-[#FF6B00]/10 rounded-full filter blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 space-y-4 max-w-3xl mx-auto">
                    <div className="inline-flex items-center space-x-2 badge-emerald px-4 py-1.5">
                        <HeartHandshake className="w-4 h-4 text-[#00C853]" />
                        <span className="font-semibold uppercase tracking-wider">Social Impact & Mentorship</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight uppercase">
                        COMMUNITY & <span className="text-gradient-orange">VOLUNTEERING</span>
                    </h2>

                    <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Giving back through tech leadership, empowering future engineers, and fostering inclusive tech ecosystems.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="glass-card p-8 rounded-3xl border border-white/10 hover:border-[#00C853]/40 transition-all duration-300 flex flex-col justify-between group"
                        >
                            <div>
                                {/* Header Badge */}
                                <div className="flex items-center justify-between mb-4">
                                    {item.logoUrl ? (
                                        <img
                                            src={item.logoUrl}
                                            alt={`${item.organization} logo`}
                                            className="w-12 h-12 rounded-xl object-cover border border-white/15 bg-white shadow-md"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-xl bg-[#00C853]/15 border border-[#00C853]/30 flex items-center justify-center text-[#00C853]">
                                            <HeartHandshake className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        </div>
                                    )}
                                    <span className="badge-orange text-[10px] uppercase font-bold tracking-wider">
                                        Volunteer Role
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00C853] transition-colors">
                                    {item.role}
                                </h3>

                                <h4 className="text-sm font-semibold text-[#FF6B00] mb-4">
                                    {item.organization}
                                </h4>

                                <div className="flex items-center space-x-4 text-xs font-mono text-slate-400 mb-6 pb-4 border-b border-white/10">
                                    <div className="flex items-center">
                                        <Calendar size={13} className="mr-1.5 text-[#00C853]" />
                                        <span>{item.period}</span>
                                    </div>
                                    {item.location && (
                                        <div className="flex items-center">
                                            <MapPin size={13} className="mr-1.5 text-[#FF6B00]" />
                                            <span>{item.location}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Multi-Image Auto-Slider (tap to maximize) */}
                                {item.images && item.images.length > 0 && (
                                    <ImageSlider
                                        images={item.images}
                                        title={item.role}
                                        onExpand={(idx) => setLightbox({ images: item.images, index: idx, title: item.role })}
                                    />
                                )}

                                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                                    {item.description}
                                </p>
                            </div>

                            <div className="mt-6 pt-2 flex items-center justify-end">
                                <Sparkles className="w-4 h-4 text-[#00C853] opacity-60 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    ))}
                </div>
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
                        className="max-w-full max-h-full object-contain rounded-2xl border border-white/15 shadow-2xl"
                    />
                </div>
            )}
        </section>
    );
};

export default VolunteeringSection;
