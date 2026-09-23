"use client";

import { useState } from "react";
import { useLockBody } from "../ui/useLockBody";
import Reveal from "../ui/Reveal";
import { ArrowRight, Download, Linkedin, Github, Eye, X, CheckCircle2, Code2, Sparkles, Cpu, ShieldCheck } from "lucide-react";
import type { BackendHero, BackendCertificate } from "@/lib/types";

const PythonCertImage = "/assets/images/Cert python for data science.jpeg";
const MeImage = "/assets/images/me.jpeg";

interface HeroSectionProps {
  data?: BackendHero | null;
  certificates?: BackendCertificate[];
  githubUrl?: string | null;
}

const HeroSection = ({ data, certificates, githubUrl }: HeroSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<{
    name: string;
    path: string;
    type?: string;
  } | null>(null);
  useLockBody(isModalOpen);

  const name = data?.name || "Tandah Djimeli Marcelle";
  const bio =
    data?.subtitle ||
    "Full Stack Software Developer & Group Leader specializing in institutional applications (Mediatech, Lecturer Tools) and impact-driven solutions for gender-based violence prevention and AI healthcare.";
  const cvPath = data?.cvPath || "/assets/pdf/CV_TANDAH-DJIMELI-MARCELLE.pdf";
  const cvPath2 = data?.cvPath2 || null;
  const avatarUrl = data?.avatarUrl || MeImage;
  const roleBadge = data?.roleBadge || "Software Developer & Group Lead";
  const chipOne = data?.chipOne || "Full-Stack Dev";
  const chipTwo = data?.chipTwo || "Tech for Good";
  const linkedinUrl =
    data?.linkedinUrl ||
    "https://www.linkedin.com/in/tandah-djimeli-marcelle-1b1701303?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app";
  const streamHint = data?.streamHint || "Click to Preview";

  const verifiedCerts = (certificates ?? []).filter((c) => c.verified);
  const certificatesList =
    verifiedCerts.length > 0
      ? verifiedCerts.map((c) => ({
        name: c.name,
        displayName: c.displayName,
        path: c.path,
        type: c.type,
        issuer: "Verified Credential",
      }))
      : [
        {
          name: "IBM Data Science Certification",
          displayName: "IBM Data Science Certification",
          path: "/assets/pdf/IBM Data Science Certification.pdf",
          type: "pdf",
          issuer: "IBM Accredited",
        },
        {
          name: "Python for Data Science",
          displayName: "Python for Data Science",
          path: PythonCertImage,
          type: "image",
          issuer: "Data Science Institute",
        },
        {
          name: "Code2Care Certificate",
          displayName: "Code2Care Datathon Finalist",
          path: "/assets/pdf/Code2Care Certificate.pdf",
          type: "pdf",
          issuer: "Healthcare Datathon",
        },
        {
          name: "DevOps Certificate",
          displayName: "DevOps Engineering Certification",
          path: "/assets/pdf/DevOps 7238322_cert_3045.pdf",
          type: "pdf",
          issuer: "DevOps Academy",
        },
        {
          name: "Project Management Coursera",
          displayName: "Professional Project Management",
          path: "/assets/pdf/FINAL PM Coursera.pdf",
          type: "pdf",
          issuer: "Coursera & PMI",
        },
        {
          name: "YALI Leadership Certificate",
          displayName: "YALI Leadership Certification",
          path: "/assets/pdf/YALI Cert.pdf",
          type: "pdf",
          issuer: "YALI Network",
        },
      ];

  const col1Certs = [...certificatesList, ...certificatesList];
  const col2Certs = [...certificatesList.slice().reverse(), ...certificatesList.slice().reverse()];

  const openModal = (cert: { name: string; path: string; type?: string }) => {
    setSelectedPdf(cert);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPdf(null);
  };

  const downloadPdf = (path: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = path;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="hero" className="min-h-screen pt-28 pb-16 relative flex items-center overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#FF6B00]/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#00C853]/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Large Prominent me.jpeg Portrait with Floating Motion Micro-Illustrations */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Role Status Badge */}
            <div className="inline-flex items-center space-x-2.5 badge-emerald text-sm md:text-base px-4 py-1.5">
              <CheckCircle2 className="w-5 h-5 text-[#00C853]" />
              <span className="font-semibold">{roleBadge}</span>
            </div>

            {/* Large Portrait Frame & Motion Micro-Illustrations */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              
              {/* Prominent Large Portrait Showcase Frame */}
              <div className="relative shrink-0 group">
                {/* Ambient Glowing Gradient Halo */}
                <div className="absolute -inset-2 bg-[#FF6B00] rounded-xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Main Large Portrait Image Container */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-xl overflow-hidden border-2 border-white/20 shadow-2xl bg-[#07090E]">
                  <img
                    src={avatarUrl}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle Overlay */}
                  <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                </div>

                {/* Floating Motion Micro-Illustration #1 (Top Right) */}
                <div className="absolute -top-4 -right-4 bg-[#0F131D]/90 backdrop-blur-md border border-[#FF6B00]/40 px-3.5 py-2 rounded-lg flex items-center space-x-2 shadow-xl animate-float">
                  <div className="p-1.5 bg-[#FF6B00]/20 rounded-xl text-[#FF6B00]">
                    <Code2 size={16} />
                  </div>
                  <span className="text-xs font-mono font-bold text-white">{chipOne}</span>
                </div>

                {/* Floating Motion Micro-Illustration #2 (Bottom Left) */}
                <div className="absolute -bottom-4 -left-4 bg-[#0F131D]/90 backdrop-blur-md border border-[#00C853]/40 px-3.5 py-2 rounded-lg flex items-center space-x-2 shadow-xl animate-bounce-gentle">
                  <div className="p-1.5 bg-[#00C853]/20 rounded-xl text-[#00C853]">
                    <Sparkles size={16} />
                  </div>
                  <span className="text-xs font-mono font-bold text-white">{chipTwo}</span>
                </div>

                {/* Floating Decorative Spark Indicator */}
                <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-[#FF6B00] rounded-full border-4 border-[#07090E] flex items-center justify-center animate-pulse">
                  <Cpu size={12} className="text-white" />
                </div>
              </div>

              {/* Name Headline */}
              <div className="space-y-2 text-center md:text-left self-center">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                  {name.split(" ")[0]}{" "}
                  <span className="text-gradient-orange">
                    {name.split(" ").slice(1).join(" ")}
                  </span>
                </h1>
              </div>

            </div>

            {/* Narrative Bio */}
            <p className="text-slate-200 text-lg md:text-xl font-medium leading-relaxed max-w-2xl pt-1">
              {bio}
            </p>

            {/* CTAs & Social Networks */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#projects"
                className="btn-tech-orange text-sm md:text-base px-8 py-4 font-bold uppercase tracking-wider group shadow-xl"
              >
                <span>Explore Projects</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={cvPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2.5 bg-[#07090E] border-2 border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-lg text-sm md:text-base font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] shadow-xl"
              >
                <Download size={18} />
                <span>Download CV</span>
              </a>

              {/* Social Networks */}
              <div className="flex items-center space-x-3 sm:ml-auto">
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-[#0F131D] border border-white/15 hover:border-[#FF6B00] rounded-lg text-slate-300 hover:text-[#FF6B00] transition-colors shadow-lg"
                  title="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href={githubUrl || "https://github.com/Tandah-Marcelle"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-[#0F131D] border border-white/15 hover:border-[#00C853] rounded-lg text-slate-300 hover:text-[#00C853] transition-colors shadow-lg"
                  title="GitHub"
                >
                  <Github size={20} />
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Dynamic 3D Angled Certificate Marquee Showcase (Untouched) */}
          <div className="lg:col-span-5 relative perspective-tilt">
            {/* Header hint overlay */}
            <div className="flex items-center justify-end mb-4 px-2">
              <span className="text-[11px] font-mono text-slate-400">{streamHint}</span>
            </div>

              {/* 3D Angled Container */}
              <div className="relative h-[480px] md:h-[540px] overflow-hidden rounded-xl border border-white/10 bg-[#07090E]/80 backdrop-blur-md p-4 card-3d-tilt shadow-2xl">
              
              <div className="grid grid-cols-2 gap-4 h-full">
                
                {/* Column 1: Marquee Up */}
                <div className="marquee-vertical-up space-y-4">
                  {col1Certs.map((cert, idx) => (
                    <div
                      key={`col1-${cert.name}-${idx}`}
                      onClick={() => openModal(cert)}
                      className="glass-card p-4 rounded-lg border border-white/10 hover:border-[#FF6B00] cursor-pointer transition-all duration-300 group bg-[#0F131D]/90"
                    >
                      <h4 className="text-xs font-bold text-white group-hover:text-[#FF6B00] transition-colors line-clamp-2">
                        {cert.displayName}
                      </h4>
                      <div className="mt-2 flex items-center space-x-1 text-[10px] font-mono text-slate-400">
                        <Eye size={11} className="text-[#00C853]" />
                        <span>Inspect Document</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Column 2: Marquee Down */}
                <div className="marquee-vertical-down space-y-4">
                  {col2Certs.map((cert, idx) => (
                    <div
                      key={`col2-${cert.name}-${idx}`}
                      onClick={() => openModal(cert)}
                      className="glass-card p-4 rounded-lg border border-white/10 hover:border-[#00C853] cursor-pointer transition-all duration-300 group bg-[#0F131D]/90"
                    >
                      <h4 className="text-xs font-bold text-white group-hover:text-[#00C853] transition-colors line-clamp-2">
                        {cert.displayName}
                      </h4>
                      <div className="mt-2 flex items-center space-x-1 text-[10px] font-mono text-slate-400">
                        <Eye size={11} className="text-[#FF6B00]" />
                        <span>Inspect Document</span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>

        </div>

        </Reveal>
      </div>

      {/* PDF / Image Preview Drawer Modal */}
      {isModalOpen && selectedPdf && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-[80] p-4 animate-fade-in">
          <div className="bg-[#0F131D] border border-white/15 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden text-white">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-base font-bold text-white truncate pr-4">
                {selectedPdf.name}
              </h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => downloadPdf(selectedPdf.path, selectedPdf.name)}
                  className="btn-tech-orange text-xs py-2 px-4"
                >
                  <Download size={14} />
                  <span>Download Document</span>
                </button>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="flex-1 p-6 overflow-auto bg-[#07090E]">
              {selectedPdf.type === "image" ? (
                <img
                  src={selectedPdf.path}
                  alt={selectedPdf.name}
                  className="w-full h-auto rounded-lg max-h-[70vh] object-contain mx-auto"
                />
              ) : (
                <iframe
                  src={selectedPdf.path}
                  className="w-full h-[70vh] border border-white/10 rounded-lg bg-white"
                  title={selectedPdf.name}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;