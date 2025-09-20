import { useState } from 'react';
import { ExternalLink, Star, X, Play, Code, ChevronLeft, ChevronRight } from 'lucide-react';
import Image1 from "../../assets/images/tamo_secures.png";
import Image2 from "../../assets/images/djnails.png";
import Image3 from "../../assets/images/image0.png";
import Image4 from "../../assets/images/galiomob.png";
import Image5 from "../../assets/images/medassist.png";
import tamoSecuresVideo from '../../assets/videos/tamo secures/tamo-secures.mp4';



interface ProjectDescription {
  title: string;
  image?: string;
  videoPath?: string;
  isPrivateApp?: boolean;
  isTestVersion?: boolean;
  liveUrl?: string;
  description: string;
  features: string[] | Array<{ category: string; items: string[] }>;
}

const ProjectsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectDescription | null>(null);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [activeTab, setActiveTab] = useState<'development' | 'graphics'>('development');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  // Placeholder graphic design images - replace with your actual images
  const graphicDesigns = [
    // Add your 30 graphic design images here
    // Example: '/src/assets/images/graphics/design1.jpg',
    // For now, using placeholders
    ...Array.from({ length: 30 }, (_, i) => `https://picsum.photos/400/300?random=${i + 1}`)
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % graphicDesigns.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + graphicDesigns.length) % graphicDesigns.length);
  };

  const edenFullDescription = {
    title: "EDEN - Doctor Companion App for PDMD",
    image: Image3,
    isPrivateApp: true,
    description: "The EDEN mobile app for the PDMD (Plateforme de Diagnostic Médical de Douala) helps first of all to have an overall view of the number of doctors with which the medical structure is in partnership with, helps to get their professional and personal information, helps the doctors to see the commissions they have on each patient they send to the PDMD for diagnostic services, including medical imaging (MRI, scanner), advanced laboratory analyses, and specialized screening tests.",
    features: [
      "Doctor partnership management and overview",
      "Professional and personal information of doctors",
      "Commission tracking for patient referrals"
    ]
  };

  const galioFullDescription = {
    title: "GALIO - Lecturer Companion App",
    image: Image4,
    description: "GALIO is a comprehensive mobile-based institutional activity follow-up system designed for teachers and administrative staff to manage their academic responsibilities, course selections, schedules, and institutional requests efficiently.",
    features: [
      "Profiling Update: Allows teachers and administrative staff to manage their personal and professional information within the Galio mobile app. Users can view their current profile details, including their role at the university (full-time lecturer, part-time lecturer, administrative staff, or support staff), department, and legal or financial identification documents. The system enables users to edit and update their contact information, banking details for payment processing, and other relevant personal data. Any changes made are securely synchronized with the university's central database, ensuring that records remain accurate and up to date. Additionally, users can upload supporting documents, such as identification cards or bank account verification, directly through the app.",
      "Course Choice Sessions: Lecturers can initiate a new course selection session, browse available courses within their department or field of expertise, and formally submit their preferred teaching choices. Once selections are made and finalized, the lecturer has the ability to close the session, at which point the choices become binding and irreversible ensuring commitment to the assigned courses for the planned academic period. If needed, lecturers can also add or remove course choices before finalizing their selection.",
      "Schedule and Validation Management: Teachers can efficiently access and review their teaching schedules in a user-friendly format. The app displays their weekly or monthly timetable, including class timings, locations, and validation status (indicating whether a session has been approved and billed). Lecturers can quickly identify any discrepancies, such as missing validations or scheduling errors, and report them directly through the app. This functionality ensures that teachers have real-time visibility into their workload and payment status, minimizing confusion and improving time management.",
      "Activity Management: Lecturers can access a dashboard displaying monthly statistics on their requests, categorized by status: validated, rejected, closed, or registered enabling them to track progress.",
      "Request Management: Allows users to submit, track, and receive updates on various types of requests, such as payment inquiries, personal information updates, or scheduling conflicts. Teachers and staff can select the appropriate request category, provide necessary details, and attach supporting documents if needed. The app displays the real-time status of each request (e.g., approved, pending, or rejected), along with any comments from administrators. Additionally, the system generates monthly statistics on submitted requests, offering insights into resolution times and common issues."
    ]
  };

  const djNailsFullDescription = {
    title: "DJ Nails - Beauty Services Website",
    image: Image2,
    liveUrl: "https://djnails.netlify.app",
    description: "A website done by me showing the different services that DJ Nails offers and permitting a client to be able to book a rendez-vous.",
    features: [
      "Display of various nail and beauty services",
      "Online appointment booking system",
      "Service gallery and portfolio",
      "Contact information and location",
      "Responsive design for all devices",
      "User-friendly booking interface"
    ]
  };

  const medAssistFullDescription = {
    title: "MED ASSIST - Medical Health Companion",
    image: Image5,
    liveUrl: "https://medassit.onrender.com",
    isTestVersion: true,
    description: "MED ASSIST is a comprehensive AI-powered medical platform that enhances patient care through multilingual feedback capture, conversational AI assistance, and intelligent blood bank management for healthcare facilities.",
    features: [
      "Multilingual Patient Feedback Platform: Captures patient feedback through text, voice, or visual ratings in multiple languages (French, English, local languages). Uses NLP-powered analysis to classify feedback sentiment and automatically sends personalized appointment and medication reminders via SMS or voice calls.",
      "Conversational AI Virtual Assistant: Provides patient education through a natural language chatbot that answers questions at all literacy levels. Interprets and clarifies existing clinician diagnoses and treatment plans without generating new medical diagnoses.",
      "AI Blood Bank Management System: Monitors and forecasts blood bank needs using historical data analysis to predict demand patterns by seasons, departments, and timeframes. Suggests optimal ordering quantities to prevent shortages while minimizing waste and costs."
    ]
  };

  const tamoSecuresFullDescription = {
    title: "TAMO SECURES - Gender-Based Violence Prevention System (Version1)",
    description: "A comprehensive Gender-Based Violence prevention system with mobile app, panic button, community support, and real-time location tracking for victim safety and support.",
    videoPath: tamoSecuresVideo,
    features: [
      {
        category: "For Victims",
        items: [
          "Report Incident: Victims can report incidents of violence, providing details such as date, time, location, and a description of the incident. They can also attach supporting evidence, such as photos or videos, to the incident report.",
          "Panic Button: In emergency situations, victims can use the panic button within the mobile app to trigger a distress signal. This notifies the system and sends alerts to designated contacts or authorities.",
          "Access Support Resources: Victims can access educational resources, helpline numbers, nearby support centers, and legal aid information through the mobile app.",
          "Ensure Anonymity and Privacy: Victims have the option to report incidents anonymously, and the system securely stores sensitive data to protect privacy.",
          "Join Communities: Users can join communities based on their interests, or specific needs. This allows them to connect with like-minded individuals and access support tailored to their requirements."
        ]
      },
      {
        category: "For Support Providers & Authorities",
        items: [
          "Receive Alerts: Support providers receive alerts about new incident reports, updates on ongoing cases, or important system announcements to stay informed and provide timely support.",
          "Two-Way Communication: Support providers can engage in two-way communication with victims through the mobile app. This allows them to understand the needs, concerns, or emergency situations of victims and provide appropriate assistance.",
          "Receive Distress Signal: Authorities receive distress signals triggered by victims through the mobile app. This provides them with immediate information about the victim's location and the need for assistance.",
          "Resource Sharing: Community members can connect with each other through forums, chat rooms, or support groups. They can share experiences, provide emotional support, and exchange information regarding violence prevention and support.",
          "Create and Join Communities: Can create and add communities based on their interests, specific needs."
        ]
      },
      {
        category: "System Features",
        items: [
          "Incident Reporting: The system allows victims to report incidents of violence, attach supporting evidence, and store incident details securely.",
          "Panic Button Functionality: The system receives distress signals triggered by victims and sends alerts to designated contacts or authorities, providing real-time location information.",
          "Location Tracking: The system tracks the real-time location of victims using the GPS capabilities of the wearable device, enabling quick response and assistance.",
          "Access Resources: The system provides access to educational resources, helpline numbers, nearby support centers, and legal aid information.",
          "Anonymity and Privacy: The system ensures anonymity options for victims who wish to report anonymously and securely stores sensitive data.",
          "Notifications and Alerts: The system sends notifications and alerts to victims about support resources, upcoming events, or relevant news related to violence prevention and support. It also sends alerts to support providers about new incident reports, updates on ongoing cases, or important system announcements."
        ]
      }
    ]
  };
  const projects = [
    {
      title: 'TAMO SECURES - GBV',
      description: 'A comprehensive Gender-Based Violence prevention system with mobile app, panic button, community support, and real-time location tracking for victim safety and support.',
      image: Image1,
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      hasDemo: true,
      stats: { stars: 24}
    },
    {
      title: 'EDEN - Doctor Companion',
      description: 'EDEN mobile app for PDMD (Plateforme de Diagnostic Médical de Douala) - Doctor partnership management and commission tracking system.',
      image: Image3,
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      hasDemo: true,
      stats: { stars: 89, }
    },
    {
      title: 'GALIO - Lecturer Companion',
      description: 'A mobile-based institutional activity follow-up system for teachers and administrative staff to manage academic responsibilities and course selections.',
      image: Image4,
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      hasDemo: true,
      stats: { stars: 67}
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

    // {
    //   title: 'GALIO MEDIA - An Administrative Mediatech',
    //   description: 'A comprehensive analytics dashboard for social media metrics with data visualization and automated reporting features.',
    //   image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
    //   liveUrl: '#',
    //   githubUrl: '#',
    //   featured: false,
    //   stats: { stars: 10 }
    // },


        {
      title: 'MED ASSIST - Medical Health Companion',
      description: 'AI-powered medical platform with multilingual patient feedback, conversational AI assistance, and intelligent blood bank management.',
      image: Image5,
      liveUrl: 'https://medassit.onrender.com',
      githubUrl: '#',
      featured: false,
      hasDemo: true,
      stats: { stars: 15}
    },
  ];

  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-xl md:text-2xl font-bold mb-3 text-white">
            Featured <span className="text-blue-300">Projects</span>
          </h2>
          <p className="text-sm text-blue-200 max-w-xl mx-auto">
            Recent projects showcasing my development and design skills.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20">
            <button
              onClick={() => setActiveTab('development')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'development'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Code size={16} />
              <span>Development</span>
            </button>
            {/* <button
              onClick={() => setActiveTab('graphics')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'graphics'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Palette size={16} />
              <span>Graphic Design</span>
            </button> */}
          </div>
        </div>

        {/* Development Projects */}
        {activeTab === 'development' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="group relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden border border-white/20">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                    onClick={() => openImagePreview(project.image)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-white">{project.title}</h3>
                    <div className="flex items-center space-x-4 text-gray-300">
                      <div className="flex items-center space-x-1">
                        <Star size={12} />
                        <span className="text-xs">{project.stats.stars}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-3 leading-relaxed text-xs">{project.description}</p>
                  
   
                  
                  <div className="flex space-x-3">
                    {project.hasDemo ? (
                      <button
                        onClick={() => {
                          if (project.title.includes('TAMO SECURES')) {
                            openModal(tamoSecuresFullDescription);
                          } else if (project.title.includes('EDEN')) {
                            openModal(edenFullDescription);
                          } else if (project.title.includes('GALIO - Lecturer')) {
                            openModal(galioFullDescription);
                          } else if (project.title.includes('MED ASSIST')) {
                            openModal(medAssistFullDescription);
                          } else if (project.title.includes('DJ NailS')) {
                            openModal(djNailsFullDescription);
                          }
                        }}
                        className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300 font-medium text-xs"
                      >
                        <Play size={12} className="mr-1" />
                        Demo
                      </button>
                    ) : (
                      <a
                        href={project.liveUrl}
                        className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300 font-medium text-xs"
                      >
                        <ExternalLink size={12} className="mr-1" />
                        {project.liveUrl !== '#' ? 'Live Demo' : 'Demo'}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}

        {/* Graphic Design Gallery */}
        {activeTab === 'graphics' && (
          <div className="space-y-8">
            {/* Featured Design with Navigation */}
            <div className="relative bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden border border-white/20 max-w-2xl mx-auto">
              <div className="relative">
                <img
                  src={graphicDesigns[currentImageIndex]}
                  alt={`Graphic Design ${currentImageIndex + 1}`}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
                >
                  <ChevronRight size={20} />
                </button>
                
                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {graphicDesigns.length}
                </div>
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {graphicDesigns.map((design, index) => (
                <div
                  key={index}
                  className={`relative cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
                    index === currentImageIndex
                      ? 'ring-2 ring-blue-400 scale-105'
                      : 'hover:scale-105'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img
                    src={design}
                    alt={`Design ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-all duration-300"></div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <button
                onClick={() => openImagePreview(graphicDesigns[currentImageIndex])}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 mx-auto"
              >
                <ExternalLink size={16} />
                <span>View Full Size</span>
              </button>
            </div>
          </div>
        )}

        {/* Modal for Project Demos */}
        {isModalOpen && selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
              >
                <X size={24} />
              </button>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">{selectedProject.title}</h2>
                
                {/* Private App Notice for EDEN */}
                {selectedProject.isPrivateApp && (
                  <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> Due to the fact that the app is private to an organization, the APK could not be given for you to test, but I could at least create a test doctor with my name to show you some images about the app.
                    </p>
                  </div>
                )}
                
                {/* Test Version Notice for MED ASSIST */}
                {selectedProject.isTestVersion && (
                  <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> For the moment, the project is at 40% completion and is still a test version. Currently working on further development and improvements.
                    </p>
                  </div>
                )}
                
                {/* Video Player for TAMO SECURES */}
                {selectedProject.videoPath && (
                  <div className="mb-6">
                    <video
                      controls
                      preload="none"
                      className="w-full max-h-80 rounded-lg"
                      poster="/assets/images/tamo_secures.png"
                      onLoadStart={() => console.log('Video loading started')}
                      onError={(e) => console.error('Video error:', e)}
                    >
                      <source src={selectedProject.videoPath} type="video/mp4" />
                      <source src="/assets/videos/tamo_secures.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <p className="text-xs text-gray-500 mt-2">Click play to watch the demo video</p>
                  </div>
                )}
                
                {/* Image Display for EDEN and DJ Nails */}
                {selectedProject.image && !selectedProject.videoPath && (
                  <div className="mb-6">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full max-h-80 object-cover rounded-lg cursor-pointer"
                      onClick={() => selectedProject.image && openImagePreview(selectedProject.image)}
                    />
                    <p className="text-xs text-gray-500 mt-2">Click image to view in full size</p>
                  </div>
                )}
                
                {/* Project Description */}
                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed">{selectedProject.description}</p>
                </div>
                
                {/* Features List */}
                {selectedProject.features && (
                  <div className="space-y-6">
                    {Array.isArray(selectedProject.features) && 
                     selectedProject.features.length > 0 && 
                     typeof selectedProject.features[0] === 'object' && 
                     'category' in selectedProject.features[0] ? (
                      /* TAMO SECURES format with categories */
                      (selectedProject.features as Array<{ category: string; items: string[] }>).map((section, index) => (
                        <div key={index}>
                          <h3 className="text-lg font-semibold mb-3 text-blue-600">{section.category}</h3>
                          <ul className="space-y-2">
                            {section.items.map((item: string, itemIndex: number) => (
                              <li key={itemIndex} className="flex items-start">
                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))
                    ) : (
                      /* EDEN and DJ Nails format with simple list */
                      <div>
                        <h3 className="text-lg font-semibold mb-3 text-blue-600">Key Features</h3>
                        <ul className="space-y-2">
                          {(selectedProject.features as string[]).map((feature: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Live URL for DJ Nails */}
                {selectedProject.liveUrl && selectedProject.liveUrl !== '#' && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      Visit Live Website
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Image Preview Modal */}
        {isImagePreviewOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
            onClick={closeImagePreview}
          >
            <div className="relative max-w-4xl max-h-[90vh]">
              <button
                onClick={closeImagePreview}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/50 rounded-full p-2"
              >
                <X size={24} />
              </button>
              <img
                src={previewImage}
                alt="Project preview"
                className="max-w-full max-h-full object-contain rounded-lg"
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