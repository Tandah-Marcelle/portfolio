"use client";

import { Sparkles, ArrowRight } from "lucide-react";

const ReadyToCollaborateSection = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto glass-card p-10 md:p-14 rounded-3xl border border-white/10 text-center relative overflow-hidden group hover:border-[#FF6B00]/40 transition-all duration-500 shadow-orange-glow">
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B00]/10 rounded-full filter blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00C853]/10 rounded-full filter blur-3xl pointer-events-none" />

          <div className="inline-flex items-center space-x-2 badge-emerald mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>High Impact Engineering</span>
          </div>

          <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-4 uppercase tracking-tight">
            Ready to <span className="text-gradient-orange">Collaborate?</span>
          </h3>

          <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            I'm always excited to partner on innovative, high-impact projects across AI, healthcare, education, and community safety. Let's build something exceptional together!
          </p>

          <a href="#contact" className="btn-tech-orange text-sm px-8 py-3.5 group">
            <span>Get In Touch Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReadyToCollaborateSection;
