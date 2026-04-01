import { useState } from 'react';
import { ExternalLink, Star, X, Play, Code, Briefcase, Award, Users } from 'lucide-react';
import Image1 from "../../assets/images/tamo_secures.png";
import Image3 from "../../assets/images/image0.png";
import Image4 from "../../assets/images/galiomob.png";
import Image5 from "../../assets/images/medassist.png";
import Image6 from "../../assets/images/agrobuild.png";
import Image2 from "../../assets/images/djnails.png";

import EventImg1 from "../../assets/images/1.png";
import EventImg2 from "../../assets/images/2.png";
import EventImg3 from "../../assets/images/3.png";
import EventImg4 from "../../assets/images/4.png";
import EventImg5 from "../../assets/images/5.png";
import EventImg6 from "../../assets/images/6.png";
import tamoSecuresVideo from '../../assets/videos/tamo secures/tamo-secures.mp4';

interface ProjectDescription {
  title: string;
  image?: string;
  videoPath?: string;
  isPrivateApp?: boolean;
  isTestVersion?: boolean;
  liveUrl?: string;
  description: string;
  summary: string;
  background: string;
  skillSet: string[];
  contribution: string;
  features: string[] | Array<{ category: string; items: string[] }>;
}

const ProjectsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectDescription | null>(null);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [activeEventImg, setActiveEventImg] = useState(0);
  const [activeTab, setActiveTab] = useState<'development' | 'graphics'>('development');

  const openModal = (project: ProjectDescription) => {
    setSelectedProject(project);
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
    setPreviewImage('');
  };


  // Dynamic import of flyer images
  const flyerModules = import.meta.glob('../../assets/images/flyers/*.{jpeg,jpg,png,JPG,JPEG,PNG}', { eager: true });
  const graphicDesigns = Object.values(flyerModules).map((mod: any) => mod.default);

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
      "Interactive versioning for machine designs"
    ]
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
      "NLP-powered sentiment analysis for healthcare feedback"
    ]
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
          "Privacy-first Anonymity options for victim reporting"
        ]
      },
      {
        category: "Community Support",
        items: [
          "Integrated Support Communities for shared healing",
          "Educational Resource Center for safety and legal aid",
          "Direct communication channels with support providers"
        ]
      }
    ]
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
      "Mobile access to diagnostic service lists"
    ]
  };

  const eventImages = [EventImg1, EventImg2, EventImg3, EventImg4, EventImg5, EventImg6];

  const eventMgmtFullDescription: ProjectDescription = {
    title: "Event Management System - Billetterie",
    isPrivateApp: true,
    image: EventImg1,
    liveUrl: "https://app.optiplaces.com",
    summary: "A full-featured event management platform with integrated ticketing for event organizers and attendees.",
    background: "Built to digitize event operations from ticket generation to attendee management  reducing manual overhead and improving event experience.",
    skillSet: ["Mobile App Development", "Flutter", "Ticketing Systems", "UI/UX Design", "Backend Integration"],
    contribution: "Responsible for developing the mobile application.",
    description: "Mobile application for an event management system.",
    features: [
      "Integrated Billetterie (ticket purchase & QR code generation)",
      "Event Discovery and Listing",
      "Attendee Check-in via QR Code Scanning",
      "Organizer Dashboard for event and ticket management",
      "Secure Payment Integration"
    ]
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
      "Request Management Dashboard for academic queries"
    ]
  };

  const projects = [
    {
      title: 'Agrobuild',
      description: 'Open-source platform for sustainable agricultural machinery and local manufacturing.',
      image: Image6,
      liveUrl: 'https://agrobuild.netlify.app',
      githubUrl: '#',
      featured: true,
      hasDemo: true,
      stats: { stars: 112 }
    },
    {
      title: 'TAMO SECURES - GBV',
      description: 'Safety ecosystem with geolocalization and emergency response for GBV prevention.',
      image: Image1,
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      hasDemo: true,
      stats: { stars: 24 }
    },

    {
      title: 'Event Management System - OPTIPLACE ',
      description: 'Mobile app for event management with integrated ticketing system for organizers and attendees.',
      image: EventImg1,
      liveUrl: 'https://app.optiplaces.com',
      githubUrl: '#',
      featured: false,
      hasDemo: true,
      stats: { stars: 42 }
    },

    
    {
      title: 'EDEN - Doctor Companion',
      description: 'Partnership management and referral tracking system for diagnostic medical facilities.',
      image: Image3,
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      hasDemo: true,
      stats: { stars: 89 }
    },
    {
      title: 'GALIO - Lecturer Companion',
      description: 'Institutional activity follow-up and document management system for academic staff.',
      image: Image4,
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      hasDemo: true,
      stats: { stars: 67 }
    },
    
     {
      title: 'MED ASSIST - AI Companion',
      description: 'AI-powered healthcare platform with conversational assistants and resource forecasting.',
      image: Image5,
      liveUrl: 'https://medassit.onrender.com',
      githubUrl: '#',
      featured: true,
      hasDemo: true,
      stats: { stars: 15 }
    },


    {
      title: 'DJ NailS website ',
      description: 'A website showing DJ Nails services and allowing clients to book appointments online.',
      image: Image2,
      liveUrl: 'https://djnails.netlify.app',
      githubUrl: '#',
      featured: false,
      hasDemo: true,
      stats: { stars: 71 }
    },
    
  ];

  return (
    <section id="projects" className="py-20 bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-xl md:text-2xl font-bold mb-3 text-white">
            Portfolio <span className="text-blue-300">Showcase</span>
          </h2>
          <p className="text-sm text-blue-200 max-w-xl mx-auto">
            Selected works demonstrating technical skill, project leadership, and social impact.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-full p-1.5 border border-white/20 shadow-2xl">
            <button
              onClick={() => setActiveTab('development')}
              className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-500 flex items-center space-x-2 ${activeTab === 'development'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                : 'text-gray-300 hover:text-white'
                }`}
            >
              <Code size={18} />
              <span>Technical Projects</span>
            </button>
            <button
              onClick={() => setActiveTab('graphics')}
              className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-500 flex items-center space-x-2 ${activeTab === 'graphics'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                : 'text-gray-300 hover:text-white'
                }`}
            >
              <Award size={18} />
              <span>Graphic Design</span>
            </button>
          </div>
        </div>

        {/* Development Projects */}
        {activeTab === 'development' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2">
                <div className="relative h-56 overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-pointer"
                      onClick={() => openImagePreview(project.image || '')}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center">
                      <Code size={48} className="text-blue-400 opacity-50" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Featured
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => {
                          if (project.title.includes('Agrobuild')) openModal(agrobuildFullDescription);
                          else if (project.title.includes('TAMO SECURES')) openModal(tamoSecuresFullDescription);
                          else if (project.title.includes('MED ASSIST')) openModal(medAssistFullDescription);
                          else if (project.title.includes('EDEN')) openModal(edenFullDescription);
                          else if (project.title.includes('GALIO')) openModal(galioFullDescription);
                          else if (project.title.includes('Event Management')) openModal(eventMgmtFullDescription);
                        }}
                        className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white text-[10px] font-bold rounded-lg transition-all duration-300 flex items-center space-x-1.5 border border-blue-600/30"
                      >
                        <Play size={12} />
                        <span>Case Study</span>
                      </button>
                      {project.liveUrl && project.liveUrl !== '#' && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:text-blue-400 transition-colors duration-300"
                          title="View Live Site"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                    <div className="flex items-center text-gray-400 text-xs">
                      <Star size={14} className="text-yellow-500 mr-1" />
                      <span>{project.stats.stars}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Updated Graphic Design Gallery */}
        {activeTab === 'graphics' && (
          <div className="space-y-12 animate-fade-in">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-gray-300 italic text-sm mb-8">
                "Design is not just what it looks like and feels like. Design is how it works." — Selection of professional flyers and promotional materials.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {graphicDesigns.map((design, index) => (
                <div
                  key={index}
                  className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:scale-[1.03] hover:shadow-blue-900/20 border border-white/5"
                  onClick={() => openImagePreview(design)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <img
                    src={design}
                    alt={`Design ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-[10px] uppercase font-bold tracking-widest">View Detailed Design</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal for Project Case Studies */}
        {isModalOpen && selectedProject && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-fade-in">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl max-w-5xl w-full max-h-[95vh] overflow-hidden relative shadow-2xl flex flex-col">
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 z-50 bg-white/80 rounded-full p-2 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-8 lg:p-12 space-y-8 bg-white dark:bg-gray-900">
                    <div>
                      <h2 className="text-3xl font-black text-gray-900 dark:text-gray-100 mb-2 leading-tight">
                        {selectedProject.title}
                      </h2>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {selectedProject.skillSet.map((skill, i) => (
                          <span key={i} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 text-[10px] font-bold rounded-full uppercase tracking-wider">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <section>
                      <h4 className="flex items-center text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
                        <Award size={14} className="mr-2" /> Summary
                      </h4>
                      <p className="text-lg font-medium text-gray-800 dark:text-gray-200 leading-relaxed italic">
                        "{selectedProject.summary}"
                      </p>
                    </section>

                    <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                      <h4 className="flex items-center text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
                        Context & Background
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {selectedProject.background}
                      </p>
                    </section>

                    <section>
                      <h4 className="flex items-center text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">
                        <Users size={14} className="mr-2" /> Personal Contribution
                      </h4>
                      <div className="p-5 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800">
                        <p className="text-sm text-emerald-900 dark:text-emerald-300 font-medium leading-relaxed">
                          {selectedProject.contribution}
                        </p>
                      </div>
                    </section>
                  </div>

                  <div className="bg-gray-900 p-8 lg:p-12 text-white flex flex-col">
                    <div className="mb-8 rounded-2xl overflow-hidden border border-white/10 shadow-inner">
                      {selectedProject.videoPath ? (
                        <video controls className="w-full aspect-video" poster={selectedProject.image}>
                          <source src={selectedProject.videoPath} type="video/mp4" />
                        </video>
                      ) : selectedProject.title.includes('Event Management') ? (
                        <div className="bg-white rounded-2xl p-4">
                          {/* Main preview */}
                          <div className="mb-3 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center" style={{ height: '260px' }}>
                            <img
                              src={eventImages[activeEventImg]}
                              alt={`Event app screen ${activeEventImg + 1}`}
                              className="h-full w-auto object-contain cursor-pointer transition-all duration-300"
                              onClick={() => openImagePreview(eventImages[activeEventImg])}
                            />
                          </div>
                          {/* Thumbnails */}
                          <div className="grid grid-cols-6 gap-2">
                            {eventImages.map((img, i) => (
                              <div
                                key={i}
                                onClick={() => setActiveEventImg(i)}
                                className={`rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200 bg-gray-50 flex items-center justify-center ${
                                  activeEventImg === i ? 'border-blue-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                                }`}
                                style={{ height: '52px' }}
                              >
                                <img src={img} alt={`thumb ${i + 1}`} className="h-full w-auto object-contain" />
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-auto object-cover" />
                      )}
                    </div>

                    <section className="flex-1">
                      <h4 className="flex items-center text-xs font-bold text-blue-300 uppercase tracking-widest mb-4">
                        <Briefcase size={14} className="mr-2" /> Technical Highlights
                      </h4>
                      <div className="space-y-4">
                        {Array.isArray(selectedProject.features) &&
                          selectedProject.features.length > 0 &&
                          typeof selectedProject.features[0] === 'object' ? (
                          (selectedProject.features as any[]).map((feature, i) => (
                            <div key={i} className="space-y-2">
                              <p className="text-xs font-bold text-gray-400 border-b border-white/10 pb-1">{feature.category}</p>
                              {feature.items.map((item: string, j: number) => (
                                <div key={j} className="flex items-start text-sm text-gray-300 group">
                                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-3 group-hover:scale-125 transition-transform"></div>
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          ))
                        ) : (
                          (selectedProject.features as string[]).map((feature, i) => (
                            <div key={i} className="flex items-start text-sm text-gray-300 group">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-3 group-hover:scale-125 transition-transform"></div>
                              <span>{feature}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </section>

                    {selectedProject.liveUrl && selectedProject.liveUrl !== '#' && (
                      <div className="mt-8 pt-6 border-t border-white/10">
                        <a href={selectedProject.liveUrl} target="_blank" rel="noopener" className="flex items-center justify-center p-4 bg-white text-gray-900 rounded-xl font-bold hover:bg-blue-300 transition-colors">
                          <ExternalLink size={18} className="mr-2" /> Explore Live Solution
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Image Preview Modal */}
        {isImagePreviewOpen && (
          <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] p-4" onClick={closeImagePreview}>
            <div className="relative max-w-5xl max-h-screen">
              <button onClick={closeImagePreview} className="absolute -top-12 right-0 text-white hover:text-gray-400">
                <X size={32} />
              </button>
              <img src={previewImage} className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" onClick={e => e.stopPropagation()} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;