"use client";

import { useState, useEffect } from "react";
import { useLockBody } from "../ui/useLockBody";
import Reveal from "../ui/Reveal";
import {
  ExternalLink,
  Star,
  X,
  Play,
  Code,
  Briefcase,
  Award,
  Users,
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Palette,
} from "lucide-react";

// Static assets served from /public
const Image1 = "/assets/images/tamo_secures.png";
const Image3 = "/assets/images/image0.png";
const Image4 = "/assets/images/galiomob.png";
const Image5 = "/assets/images/medassist.png";
const Image6 = "/assets/images/agrobuild.png";
const Image2 = "/assets/images/djnails.png";

const EventImg1 = "/assets/images/1.png";
const EventImg2 = "/assets/images/2.png";
const EventImg3 = "/assets/images/3.png";
const EventImg4 = "/assets/images/4.png";
const EventImg5 = "/assets/images/5.png";
const EventImg6 = "/assets/images/6.png";
const tamoSecuresVideo = "/assets/videos/tamo secures/tamo-secures.mp4";

interface ProjectDescription {
  id?: string;
  title: string;
  category?: string;
  image?: string;
  images?: string[];
  videoPath?: string;
  isPrivateApp?: boolean;
  isTestVersion?: boolean;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  hasDemo?: boolean;
  stars?: number;
  stats?: { stars: number };
  description?: string;
  summary?: string;
  background?: string;
  skillSet?: string[];
  contribution?: string;
  features?: string[] | Array<{ category: string; items: string[] }>;
}

interface ProjectsSectionProps {
  data?: ProjectDescription[];
  graphics?: Array<string | { id?: string; imageUrl: string; title?: string | null; category?: string | null }>;
}

const GallerySlider = ({ images, title, onExpand }: { images: string[]; title: string; onExpand?: (index: number) => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="relative w-full rounded-lg overflow-hidden border border-white/10 bg-[#07090E] group/gallery">
      {images.map((src, idx) => (
        <img
          key={`${src}-${idx}`}
          src={src}
          alt={`${title} screenshot ${idx + 1}`}
          onClick={() => onExpand?.(idx)}
          className={`w-full h-auto object-cover max-h-[440px] transition-all duration-700 ${idx === currentIndex ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
            } ${onExpand ? "cursor-zoom-in" : ""}`}
        />
      ))}

      {images.length > 1 && (
        <>
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white backdrop-blur-md opacity-0 group-hover/gallery:opacity-100 hover:bg-[#FF6B00] transition-all duration-300"
            aria-label="Previous image"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white backdrop-blur-md opacity-0 group-hover/gallery:opacity-100 hover:bg-[#FF6B00] transition-all duration-300"
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

const ProjectsSection = ({ data, graphics }: ProjectsSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectDescription | null>(null);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [activeEventImg, setActiveEventImg] = useState(0);
  const [activeTab, setActiveTab] = useState<"development" | "graphics">("development");
  useLockBody(isModalOpen || isImagePreviewOpen);

  // Gallery for a project: uploaded slideshow, falling back to the cover image.
  // Treats empty/"null"/"undefined" strings as absent (legacy bad rows).
  const cleanUrl = (u: unknown): string | undefined =>
    typeof u === "string" && u.trim() !== "" && u !== "null" && u !== "undefined" ? u : undefined;

  const galleryOf = (project: ProjectDescription): string[] => {
    const raw = Array.isArray((project as { images?: unknown }).images)
      ? ((project as { images?: string[] }).images as string[])
      : [];
    const gallery = raw.map((u) => cleanUrl(u)).filter((u): u is string => !!u);
    if (gallery.length > 0) return gallery;
    const cover = cleanUrl(project.image);
    return cover ? [cover] : [];
  };

  const openModal = (project: ProjectDescription) => {
    // Backend rows may carry missing/legacy shapes — normalize so the
    // case-study view never crashes on newly added projects.
    const clean = (u: unknown): string | undefined =>
      typeof u === "string" && u.trim() !== "" && u !== "null" && u !== "undefined" ? u : undefined;
    setSelectedProject({
      ...project,
      image: clean(project.image),
      videoPath: clean(project.videoPath),
      skillSet: Array.isArray(project.skillSet) ? project.skillSet : [],
      features: Array.isArray(project.features) ? project.features : [],
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const openImagePreview = (imageSrc: string) => {
    setPreviewImage(imageSrc);
    setIsImagePreviewOpen(true);
  };

  const closeImagePreview = () => {
    setIsImagePreviewOpen(false);
    setPreviewImage("");
  };

  // Curated fallback catalog — every flyer titled + sorted into a collection
  // so the gallery reads instantly even before backend uploads exist.
  const fallbackCatalog: Array<{ file: string; title: string; category: string }> = [
    { file: "1.jpeg", title: "Aureus FX — Money Transfer Rates", category: "Corporate & Business" },
    { file: "2.jpeg", title: "TAMO Secures — Novembre Bonheur", category: "Events & Social" },
    { file: "3.jpeg", title: "Innovation Sarl — Services Offer", category: "Corporate & Business" },
    { file: "4.jpeg", title: "Lyly Beauty — Special Mai Promo", category: "Beauty, Salon & Training" },
    { file: "5.jpeg", title: "Thesis Defense Poster — Univ. of Dschang", category: "Events & Social" },
    { file: "6.jpeg", title: "Honor — Tri-fold Brochure Mockup", category: "Print & Brochures" },
    { file: "7.jpeg", title: "Innovation Sarl — Mission & Vision", category: "Corporate & Business" },
    { file: "8.jpeg", title: "Innopharma — Partners & Services", category: "Corporate & Business" },
    { file: "9.jpeg", title: "Lyly Beauty — Classic Haircuts", category: "Beauty, Salon & Training" },
    { file: "10.jpeg", title: "Lyly Beauty — Salon Services", category: "Beauty, Salon & Training" },
    { file: "11.jpeg", title: "Doctorate Celebration Invitation", category: "Events & Social" },
    { file: "12.jpeg", title: "Braids Training Academy", category: "Beauty, Salon & Training" },
    { file: "13.jpeg", title: "Makeup Masterclasses", category: "Beauty, Salon & Training" },
    { file: "14.jpeg", title: "Christmas Nail Promo", category: "Beauty, Salon & Training" },
    { file: "15.jpeg", title: "Men's Grooming Menu", category: "Beauty, Salon & Training" },
    { file: "16.jpeg", title: "Pharma Tri-fold Brochure Mockup", category: "Print & Brochures" },
    { file: "17.jpg", title: "Ceftriaxone Product Flyer", category: "Pharma & Healthcare" },
    { file: "18.jpeg", title: "Artemether Anti-Malaria Flyer", category: "Pharma & Healthcare" },
    { file: "19.jpg", title: "Albendazole Product Flyer", category: "Pharma & Healthcare" },
    { file: "20.jpg", title: "Azithromycine Product Flyer", category: "Pharma & Healthcare" },
    { file: "21.jpg", title: "Cefotaxime Product Flyer", category: "Pharma & Healthcare" },
    { file: "22.jpg", title: "Ciprofloxacin Product Flyer", category: "Pharma & Healthcare" },
    { file: "23.jpg", title: "Diclofenac Pain Relief Flyer", category: "Pharma & Healthcare" },
    { file: "24.jpg", title: "Ibuprofen Product Flyer", category: "Pharma & Healthcare" },
  ];

  const graphicDesigns = fallbackCatalog.map((c) => ({
    imageUrl: `/assets/images/flyers/${c.file}`,
    title: c.title,
    category: c.category,
  }));

  const agrobuildFullDescription: ProjectDescription = {
    title: "Agrobuild - Open-Source Agricultural Machinery",
    image: Image6,
    liveUrl: "https://agrobuild.netlify.app",
    summary: "An open hardware platform for sustainable agricultural machinery designed for local fabrication.",
    background: "Addressing import dependence and post-harvest losses in off-grid agricultural communities through open-source designs and local manufacturing empowerment.",
    skillSet: ["Full-stack Development", "CAD Integration", "UI/UX Design", "Sustainability Strategy", "Leadership"],
    contribution: "I developed the entire software ecosystem (front and back), from the machine documentation library to the multi-role community collaboration model. I spearheaded the 'Open by Design' philosophy for this project.",
    description: "Open agro-machines designed to be built, improved, and shared locally.",
    features: [
      "Machine Filter System (Crop type, Energy source, Status)",
      "Technical Documentation Library (CAD files, BOM, Build guides)",
      "Multi-role Registration (Farmer, Builder, Engineer, Trainer, Partner)",
      "Community Dashboard with contributor markers",
      "Interactive versioning for machine designs",
    ],
  };

  const medAssistFullDescription: ProjectDescription = {
    title: "MED ASSIST - Medical Health Companion",
    image: Image5,
    liveUrl: "https://medassit.onrender.com",
    isTestVersion: true,
    summary: "AI-powered medical assistant enhancing patient education and healthcare resource management.",
    background: "Bridge the gap in healthcare literacy and resource allocation (like blood supplies) in developing regions using conversational AI and predictive analytics.",
    skillSet: ["Conversational AI", "Natural Language Processing (NLP)", "Frontend Architecture", "Healthcare Tech", "Team Management"],
    contribution: "I led the development team and personally implemented all user interfaces and the Conversational AI Virtual Assistant. I focused on making the AI accessible to users of all literacy levels.",
    description: "MED ASSIST is a comprehensive AI-powered medical platform that enhances patient care through multilingual feedback capture, conversational AI assistance, and intelligent blood bank management.",
    features: [
      "Multilingual Patient Feedback System (Voice/Text)",
      "Conversational AI Virtual Assistant for patient education",
      "AI-driven Blood Bank Forecasting and Management",
      "NLP-powered sentiment analysis for healthcare feedback",
    ],
  };

  const tamoSecuresFullDescription: ProjectDescription = {
    title: "TAMO SECURES - GBV Prevention",
    description: "A comprehensive Gender-Based Violence prevention system with real-time tracking and community support.",
    videoPath: tamoSecuresVideo,
    summary: "A holistic safety ecosystem dedicated to preventing Gender-Based Violence (GBV) through victim-centric technology.",
    background: "Providing immediate emergency response and long-term community support for victims of GBV in high-risk environments.",
    skillSet: ["Geolocalization", "Mobile App Development", "Real-time Systems", "Crisis Management UI", "Team Leadership"],
    contribution: "Served as Group Leader. I designed the user wireframes, led the frontend implementation, and personally developed the critical real-time victim geolocalization and panic button systems.",
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
  };

  const edenFullDescription: ProjectDescription = {
    title: "EDEN - Doctor Companion App",
    image: Image3,
    isPrivateApp: true,
    summary: "A management tool for medical partnerships and commission tracking for imaging services.",
    background: "Enhancing the transparency and efficiency of medical referrals between private clinics and diagnostic platforms like PDMD.",
    skillSet: ["React Native", "API Orchestration", "Financial Tracking UI", "Professional User Research", "Leadership"],
    contribution: "As Group Leader, I managed the project lifecycle and developed the entire user interface. I integrated the complex backend APIs used for tracking doctor commissions and patient diagnostic referrals.",
    description: "Mobile app for PDMD to manage partnership overview, doctor info, and commission tracking for MRI, scanners, and laboratory services.",
    features: [
      "Dynamic Doctor Partnership Overview",
      "Secure Professional Information Management",
      "Transparent Commission Tracking for referrals",
      "Mobile access to diagnostic service lists",
    ],
  };

  const eventImages = [EventImg1, EventImg2, EventImg3, EventImg4, EventImg5, EventImg6];

  const eventMgmtFullDescription: ProjectDescription = {
    title: "Event Management System - Billetterie",
    isPrivateApp: true,
    image: EventImg1,
    liveUrl: "https://app.optiplaces.com",
    summary: "A full-featured event management platform with integrated ticketing for event organizers and attendees.",
    background: "Built to digitize event operations from ticket generation to attendee management reducing manual overhead and improving event experience.",
    skillSet: ["Mobile App Development", "Flutter", "Ticketing Systems", "UI/UX Design", "Backend Integration"],
    contribution: "Responsible for developing the mobile application.",
    description: "Mobile application for an event management system.",
    features: [
      "Integrated Billetterie (ticket purchase & QR code generation)",
      "Event Discovery and Listing",
      "Attendee Check-in via QR Code Scanning",
      "Organizer Dashboard for event and ticket management",
      "Secure Payment Integration",
    ],
  };

  const galioFullDescription: ProjectDescription = {
    title: "GALIO - Lecturer Companion",
    image: Image4,
    summary: "Institutional activity follow-up system for academic and administrative staff management.",
    background: "Digitizing institutional workflows in higher education to improve communication between lecturers and administrative departments.",
    skillSet: ["Software Engineering", "System Integration", "Mediatech Implementation", "Workflow Digitization", "Team Management"],
    contribution: "Group Leader. I led the development of the user interfaces and integrated the core activity management APIs. I also designed and implemented the 'Mediatech' module for institutional document control.",
    description: "Comprehensive mobile-based institutional activity follow-up system for course choices, schedules, and administrative requests.",
    features: [
      "Lecturer Profiling and Role Management",
      "Digital Course Selection with Finalization locks",
      "Automated Schedule and Validation Tracking",
      "Institutional Mediatech for document repositories",
      "Request Management Dashboard for academic queries",
    ],
  };

  const projects: ProjectDescription[] = [
    {
      title: "Agrobuild",
      description: "Open-source platform for sustainable agricultural machinery and local manufacturing",
      image: Image6,
      liveUrl: "https://agrobuild.djimstech.com",
      githubUrl: "#",
      featured: true,
      hasDemo: true,
      stats: { stars: 112 },
    },
    {
      title: "TAMO SECURES - GBV",
      description: "Safety ecosystem with geolocalization and emergency response for GBV prevention.",
      image: Image1,
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      hasDemo: true,
      stats: { stars: 24 },
    },
    {
      title: "Event Management System - OPTIPLACE",
      description: "Mobile app for event management with integrated ticketing system for organizers and attendees.",
      image: EventImg1,
      liveUrl: "https://app.optiplaces.com",
      githubUrl: "#",
      featured: false,
      hasDemo: true,
      stats: { stars: 42 },
    },
    {
      title: "EDEN - Doctor Companion",
      description: "Partnership management and referral tracking system for diagnostic medical facilities.",
      image: Image3,
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      hasDemo: true,
      stats: { stars: 89 },
    },
    {
      title: "GALIO - Lecturer Companion",
      description: "Institutional activity follow-up and document management system for academic staff.",
      image: Image4,
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      hasDemo: true,
      stats: { stars: 67 },
    },
    {
      title: "MED ASSIST - AI Companion",
      description: "AI-powered healthcare platform with conversational assistants and resource forecasting.",
      image: Image5,
      liveUrl: "https://medassit.onrender.com",
      githubUrl: "#",
      featured: true,
      hasDemo: true,
      stats: { stars: 15 },
    },
    {
      title: "DJ NailS website",
      description: "A website showing DJ Nails services and allowing clients to book appointments online.",
      image: Image2,
      liveUrl: "https://djnails.netlify.app",
      githubUrl: "#",
      featured: false,
      hasDemo: true,
      stats: { stars: 71 },
    },
  ];

  const projectsList = data && data.length > 0 ? data : projects;
  const flyersList = graphics && graphics.length > 0 ? graphics : graphicDesigns;

  // Project lanes (filter pills) derived from backend categories.
  const projectCategories = ["All", ...Array.from(new Set(projectsList.map((p) => p.category || "Web Development")))];
  const [activeCategory, setActiveCategory] = useState("All");
  const visibleProjects =
    activeCategory === "All" ? projectsList : projectsList.filter((p) => (p.category || "Web Development") === activeCategory);

  // Design gallery grouped by collection so visitors instantly see the structure.
  const galleryGroups = (() => {
    const map = new Map<string, Array<{ url: string; title: string }>>();
    flyersList.forEach((design, i) => {
      const item =
        typeof design === "string"
          ? { url: design, title: `Flyer ${i + 1}`, category: "Promotional Flyers" }
          : {
            url: design.imageUrl,
            title: design.title || "Untitled Design",
            category: design.category || "Promotional Flyers",
          };
      const list = map.get(item.category) ?? [];
      list.push({ url: item.url, title: item.title });
      map.set(item.category, list);
    });
    return [...map.entries()].map(([category, items]) => ({ category, items }));
  })();

  // Design collection filter (same round pills as the project lanes).
  const [activeDesignCategory, setActiveDesignCategory] = useState("All");
  const designCategories = ["All", ...galleryGroups.map((g) => g.category)];
  const visibleGroups =
    activeDesignCategory === "All" ? galleryGroups : galleryGroups.filter((g) => g.category === activeDesignCategory);

  return (
    <section id="projects" className="py-12 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight uppercase">
            Portfolio <span className="text-gradient-orange">Showcase</span>
          </h2>

          <p className="text-slate-300 text-base md:text-lg max-w-xl mx-auto">
            Engineering, data & AI builds with full case studies — plus a curated design gallery. Pick a lane below.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-14">
          <div className="bg-[#0F131D]/80 backdrop-blur-xl rounded-full p-1.5 border border-white/10 shadow-2xl flex items-center gap-2">
            <button
              onClick={() => setActiveTab("development")}
              className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center space-x-2 ${activeTab === "development"
                  ? "bg-[#FF6B00] text-white shadow-orange-glow"
                  : "text-slate-400 hover:text-white"
                }`}
            >
              <Cpu size={16} />
              <span>Engineering, Data & AI</span>
            </button>

            <button
              onClick={() => setActiveTab("graphics")}
              className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center space-x-2 ${activeTab === "graphics"
                  ? "bg-[#FF6B00] text-white shadow-orange-glow"
                  : "text-slate-400 hover:text-white"
                }`}
            >
              <Palette size={16} />
              <span>Graphic & Brand Design</span>
            </button>
          </div>
        </div>

        {/* Development Projects Grid */}
        {activeTab === "development" && (
          <Reveal key={`dev-${activeCategory}`}>
          <>
            {/* Category lanes */}
            {projectCategories.length > 2 && (
              <div className="flex flex-wrap justify-center gap-2.5 mb-10">
                {projectCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 border ${activeCategory === cat
                        ? "bg-[#FF6B00] text-white border-transparent shadow-orange-glow"
                        : "bg-[#0F131D]/80 text-slate-400 border-white/10 hover:text-white hover:border-[#FF6B00]/50"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleProjects.map((project, index) => (
              <div
                key={index}
                className="glass-card rounded-xl overflow-hidden border border-white/10 flex flex-col justify-between group hover:border-[#FF6B00]/40 transition-all duration-500"
              >
                <div>
                  {/* Thumbnail Image (first gallery image, else cover) */}
                  <div className="relative h-56 overflow-hidden bg-[#07090E]">
                    {galleryOf(project).length > 0 ? (
                      <img
                        src={galleryOf(project)[0]}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                        onClick={() => openImagePreview(galleryOf(project)[0])}
                      />
                    ) : (
                      <div className="w-full h-full bg-[#0F131D] flex items-center justify-center">
                        <Code size={48} className="text-[#FF6B00] opacity-40" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/30 opacity-80" />

                    {project.featured && (
                      <div className="absolute top-4 right-4 bg-[#FF6B00] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-orange-glow">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-[#00C853] bg-[#00C853]/10 border border-[#00C853]/25 px-2.5 py-1 rounded-full mb-3">
                      {project.category || "Web Development"}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FF6B00] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-300 text-sm mb-6 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-6 pt-0 flex items-center justify-between">
                  <button
                    onClick={() => {
                      if (project.title.includes("Agrobuild")) openModal(agrobuildFullDescription);
                      else if (project.title.includes("TAMO SECURES")) openModal(tamoSecuresFullDescription);
                      else if (project.title.includes("MED ASSIST")) openModal(medAssistFullDescription);
                      else if (project.title.includes("EDEN")) openModal(edenFullDescription);
                      else if (project.title.includes("GALIO")) openModal(galioFullDescription);
                      else if (project.title.includes("Event Management")) openModal(eventMgmtFullDescription);
                      else openModal(project);
                    }}
                    className="btn-tech-orange text-xs py-2 px-4 font-semibold"
                  >
                    <Play size={12} />
                    <span>Read Case Study</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-slate-400 hover:text-[#00C853] transition-colors"
                        title="View Live App"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                    <div className="flex items-center text-slate-400 text-xs font-mono">
                      <Star size={14} className="text-[#FF6B00] mr-1" />
                      <span>{project.stars !== undefined ? project.stars : project.stats?.stars || 0}</span>
                    </div>
                  </div>
                </div>
                </div>
              ))}
            </div>
          </>
          </Reveal>
        )}

        {/* Graphic Design Gallery — grouped by collection */}
        {activeTab === "graphics" && (
          <Reveal key={`gfx-${activeDesignCategory}`}>
          <div className="space-y-12 animate-fade-in">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-slate-300 text-sm italic">
                "Design is not just what it looks like and feels like. Design is how it works." — Browse by collection, click any piece to view it full-screen.
              </p>
            </div>

            {/* Collection filters */}
            {designCategories.length > 2 && (
              <div className="flex flex-wrap justify-center gap-2.5">
                {designCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveDesignCategory(cat)}
                    className={`px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 border ${activeDesignCategory === cat
                        ? "bg-[#FF6B00] text-white border-transparent shadow-orange-glow"
                        : "bg-[#0F131D]/80 text-slate-400 border-white/10 hover:text-white hover:border-[#FF6B00]/50"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {visibleGroups.map((group) => (
              <div key={group.category}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-2 h-2 rounded-full bg-[#FF6B00]" />
                  <h3 className="text-lg md:text-xl font-extrabold text-white uppercase tracking-wide">
                    {group.category}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                    {group.items.length} {group.items.length === 1 ? "piece" : "pieces"}
                  </span>
                      <div className="flex-1 h-px bg-white/15" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {group.items.map((design, index) => (
                    <div
                      key={`${group.category}-${index}`}
                      className="group relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer border border-white/10 shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:border-[#FF6B00]/40"
                      onClick={() => openImagePreview(design.url)}
                    >
                      <img
                        src={design.url}
                        alt={design.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div>
                          <p className="text-white text-xs font-bold leading-snug mb-1">{design.title}</p>
                          <span className="text-[#FF6B00] text-[11px] uppercase font-bold tracking-widest flex items-center gap-1">
                            <Sparkles size={12} /> View Full Design
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          </Reveal>
        )}

        {/* Modal Case Study Drawer */}
        {isModalOpen && selectedProject && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-[60] p-2 md:p-6 animate-fade-in">
            <div className="bg-[#0F131D] border border-white/15 rounded-xl max-w-[1720px] w-full max-h-[94vh] overflow-hidden relative shadow-2xl flex flex-col text-white">
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 text-slate-400 hover:text-white z-50 bg-white/10 rounded-full p-2.5 transition-colors border border-white/10"
              >
                <X size={20} />
              </button>

              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Left Column: Context & Overview */}
                  <div className="p-8 lg:p-10 space-y-6 bg-[#07090E]">
                    <div>
                      <div className="inline-flex items-center space-x-2 badge-emerald mb-3">
                        <Layers className="w-3.5 h-3.5" />
                        <span>Case Study Breakdown</span>
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-extrabold text-white leading-tight">
                        {selectedProject.title}
                      </h2>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {(selectedProject.skillSet ?? []).map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] text-[10px] font-bold rounded-full uppercase tracking-wider"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {selectedProject.summary ? (
                      <section>
                        <h4 className="flex items-center text-xs font-bold text-[#FF6B00] uppercase tracking-widest mb-2">
                          <Award size={14} className="mr-2" /> Project Summary
                        </h4>
                      <p className="text-base text-slate-300 italic leading-relaxed whitespace-pre-line">
                        "{selectedProject.summary}"
                      </p>
                      </section>
                    ) : null}

                    {selectedProject.background ? (
                      <section className="glass-panel p-5 rounded-lg border border-white/10">
                        <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-2">
                          Problem Statement & Context
                        </h4>
                        <p className="text-xs md:text-sm text-slate-300 leading-loose whitespace-pre-line">
                          {selectedProject.background}
                        </p>
                      </section>
                    ) : null}

                    {selectedProject.contribution ? (
                      <section className="p-5 rounded-lg bg-[#00C853]/10 border border-[#00C853]/30">
                        <h4 className="flex items-center text-xs font-bold text-[#00C853] uppercase tracking-widest mb-2">
                          <Users size={14} className="mr-2" /> Key Role & Engineering Contribution
                        </h4>
                        <p className="text-xs md:text-sm text-[#00C853] font-medium leading-loose whitespace-pre-line">
                          {selectedProject.contribution}
                        </p>
                      </section>
                    ) : null}
                  </div>

                  {/* Right Column: Media Preview & Technical Features */}
                  <div className="bg-[#0F131D] p-8 lg:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10">
                    <div className="space-y-6">
                      {/* Video demo (if any) */}
                      {selectedProject.videoPath && (
                        <div className="rounded-lg overflow-hidden border border-white/10 bg-[#07090E]">
                          <video controls className="w-full aspect-video" poster={selectedProject.image}>
                            <source src={selectedProject.videoPath} type="video/mp4" />
                          </video>
                        </div>
                      )}

                      {/* Sliding image gallery (if any), else single cover */}
                      {selectedProject.title.includes("Event Management") ? (
                        <div className="rounded-lg overflow-hidden border border-white/10 bg-[#07090E]">
                          <div className="p-4 bg-[#07090E]">
                            <div className="mb-3 rounded-xl overflow-hidden bg-[#0F131D] flex items-center justify-center h-64 border border-white/10">
                              <img
                                src={eventImages[activeEventImg]}
                                alt={`App screen ${activeEventImg + 1}`}
                                className="h-full w-auto object-contain cursor-pointer"
                                onClick={() => openImagePreview(eventImages[activeEventImg])}
                              />
                            </div>
                            <div className="grid grid-cols-6 gap-2">
                              {eventImages.map((img, i) => (
                                <div
                                  key={i}
                                  onClick={() => setActiveEventImg(i)}
                                  className={`rounded-lg overflow-hidden cursor-pointer border-2 transition-all h-12 flex items-center justify-center ${activeEventImg === i
                                      ? "border-[#FF6B00] scale-105"
                                      : "border-transparent opacity-60 hover:opacity-100"
                                    }`}
                                >
                                  <img src={img} alt={`thumb ${i + 1}`} className="h-full w-auto object-contain" />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : galleryOf(selectedProject).length > 0 ? (
                        <GallerySlider
                          key={selectedProject.id ?? selectedProject.title}
                          images={galleryOf(selectedProject)}
                          title={selectedProject.title}
                          onExpand={(idx) => openImagePreview(galleryOf(selectedProject)[idx])}
                        />
                      ) : !selectedProject.videoPath ? (
                        selectedProject.image ? (
                          <div className="rounded-lg overflow-hidden border border-white/10 bg-[#07090E]">
                            <img
                              src={selectedProject.image}
                              alt={selectedProject.title}
                              onClick={() => openImagePreview(selectedProject.image || "")}
                              className="w-full h-auto object-cover max-h-96 cursor-zoom-in hover:scale-[1.01] transition-transform"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-56 bg-[#0F131D] flex items-center justify-center rounded-lg border border-white/10">
                            <Code size={48} className="text-[#FF6B00] opacity-40" />
                          </div>
                        )
                      ) : null}

                      <section>
                        <h4 className="flex items-center text-xs font-bold text-[#00C853] uppercase tracking-widest mb-4">
                          <Briefcase size={14} className="mr-2" /> Core System Features
                        </h4>
                        <div className="space-y-3">
                          {Array.isArray(selectedProject.features) &&
                            selectedProject.features.length > 0 &&
                            typeof selectedProject.features[0] === "object"
                            ? (selectedProject.features as any[]).map((feature, i) => (
                              <div key={i} className="space-y-2">
                                <p className="text-xs font-bold text-slate-400 border-b border-white/10 pb-1">
                                  {feature.category}
                                </p>
                                {feature.items.map((item: string, j: number) => (
                                  <div key={j} className="flex items-start text-xs text-slate-300">
                                    <span className="w-1.5 h-1.5 bg-[#FF6B00] rounded-full mt-1.5 mr-2 shrink-0" />
                                    <span>{item}</span>
                                  </div>
                                ))}
                              </div>
                            ))
                            : ((selectedProject.features ?? []) as string[]).map((feature, i) => (
                              <div key={i} className="flex items-start text-xs text-slate-300">
                                <span className="w-1.5 h-1.5 bg-[#FF6B00] rounded-full mt-1.5 mr-2 shrink-0" />
                                <span>{feature}</span>
                              </div>
                            ))}
                        </div>
                      </section>
                    </div>

                    {selectedProject.liveUrl && selectedProject.liveUrl !== "#" && (
                      <div className="mt-8 pt-6 border-t border-white/10">
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener"
                          className="btn-tech-orange w-full text-center text-xs py-3 justify-center"
                        >
                          <ExternalLink size={16} />
                          <span>Explore Live Solution</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full Image Preview Modal */}
        {isImagePreviewOpen && (
          <div
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] p-4"
            onClick={closeImagePreview}
          >
            <div className="relative max-w-5xl max-h-screen">
              <button
                onClick={closeImagePreview}
                className="absolute -top-12 right-0 text-white hover:text-[#FF6B00]"
              >
                <X size={32} />
              </button>
              <img
                src={previewImage}
                alt="Preview"
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;