"use client";

import { useState } from "react";
import { useLockBody } from "../ui/useLockBody";
import { X, Download, FileText, Eye, Image as ImageIcon, Award, Sparkles } from "lucide-react";
const PythonCertImage = "/assets/images/Cert python for data science.jpeg";
import type { BackendCertificate } from "../../lib/types";

interface CertificatesSectionProps {
  data?: BackendCertificate[];
}

const CertificatesSection = ({ data }: CertificatesSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<{
    name: string;
    path: string;
    type?: string;
  } | null>(null);
  useLockBody(isModalOpen);

  const fallbackCertificates = [
    {
      name: "CV - TANDAH DJIMELI MARCELLE",
      path: "/assets/pdf/CV_TANDAH-DJIMELI-MARCELLE.pdf",
      displayName: "Professional CV",
      type: "pdf",
    },
    {
      name: "Digital Basics & Collaboration",
      path: "/assets/pdf/CertificateOfCompletion_Parcours dapprentissage sur les bases du numerique et sur la collaboration.pdf",
      displayName: "Digital Collaboration Certificate",
      type: "pdf",
    },
    {
      name: "Code2Care Certificate",
      path: "/assets/pdf/Code2Care Certificate.pdf",
      displayName: "Code2Care Datathon Finalist",
      type: "pdf",
    },
    {
      name: "Python for Data Science",
      path: PythonCertImage,
      displayName: "Python for Data Science",
      type: "image",
    },
    {
      name: "IBM Data Science Certification",
      path: "/assets/pdf/IBM Data Science Certification.pdf",
      displayName: "IBM Data Science Certification",
      type: "pdf",
    },
    {
      name: "DevOps Certificate",
      path: "/assets/pdf/DevOps 7238322_cert_3045.pdf",
      displayName: "DevOps Engineering Certification",
      type: "pdf",
    },
    {
      name: "Project Management Coursera",
      path: "/assets/pdf/FINAL PM Coursera.pdf",
      displayName: "Professional Project Management",
      type: "pdf",
    },
    {
      name: "YALI Leadership Certificate",
      path: "/assets/pdf/YALI Cert.pdf",
      displayName: "YALI Leadership Certification",
      type: "pdf",
    },
  ];

  const certificates =
    data && data.length > 0
      ? data.map((c) => ({
        name: c.name,
        path: c.path,
        displayName: c.displayName,
        type: c.type,
      }))
      : fallbackCertificates;

  const openModal = (certificate: { name: string; path: string; type?: string }) => {
    setSelectedPdf(certificate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPdf(null);
  };

  const downloadPdf = (path: string, name: string) => {
    const link = document.createElement("a");
    link.href = path;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const duplicatedCertificates = [...certificates, ...certificates, ...certificates];

  return (
    <section id="certificates" className="py-16 relative overflow-hidden bg-[#07090E]/90 border-y border-white/10">
      <div className="container mx-auto px-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF6B00] to-[#00C853] p-0.5 shadow-orange-glow">
            <div className="w-full h-full bg-[#07090E] rounded-[10px] flex items-center justify-center">
              <Award className="w-4 h-4 text-[#FF6B00]" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">
              Verified Certificates & Credentials
            </h3>
            <p className="text-xs text-slate-400">
              Interactive marquee — click any card to preview or download credentials.
            </p>
          </div>
        </div>

        <div className="badge-emerald text-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Industry Accredited</span>
        </div>
      </div>

      {/* Infinite Scroll Marquee */}
      <div className="certificates-scroll flex space-x-5 py-2 will-change-transform">
        {duplicatedCertificates.map((certificate, index) => (
          <div
            key={`${certificate.name}-${index}`}
            className="flex-shrink-0 glass-card p-4 rounded-2xl cursor-pointer border border-white/10 hover:border-[#FF6B00]/40 transition-all duration-300 w-[220px] md:w-[280px] group"
            onClick={() => openModal(certificate)}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-[#FF6B00]/10 border border-[#FF6B00]/30 rounded-xl flex-shrink-0 group-hover:scale-105 transition-transform">
                {certificate.type === "image" ? (
                  <ImageIcon className="text-[#FF6B00]" size={18} />
                ) : (
                  <FileText className="text-[#00C853]" size={18} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold text-xs md:text-sm mb-1 truncate group-hover:text-[#FF6B00] transition-colors">
                  {certificate.displayName}
                </h4>
                <div className="flex items-center space-x-1 text-[#00C853] text-[11px] font-mono">
                  <Eye size={12} />
                  <span>Preview PDF</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PDF / Image Preview Modal */}
      {isModalOpen && selectedPdf && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-[70] p-4 animate-fade-in">
          <div className="bg-[#0F131D] border border-white/15 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden text-white">
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
                  className="w-full h-auto rounded-2xl max-h-[70vh] object-contain mx-auto"
                />
              ) : (
                <iframe
                  src={selectedPdf.path}
                  className="w-full h-[70vh] border border-white/10 rounded-2xl bg-white"
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

export default CertificatesSection;
