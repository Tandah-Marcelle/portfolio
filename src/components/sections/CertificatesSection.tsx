import { useState } from 'react';
import { X, Download, FileText, Eye } from 'lucide-react';

const CertificatesSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<{ name: string; path: string } | null>(null);

  const certificates = [
    {
      name: "CV - TANDAH DJIMELI MARCELLE",
      path: "/src/assets/pdf/CV_TANDAH-DJIMELI-MARCELLE.pdf",
      displayName: "Professional CV"
    },
    {
      name: "Certificate of Completion - Digital Basics & Collaboration",
      path: "/src/assets/pdf/CertificateOfCompletion_Parcours dapprentissage sur les bases du numerique et sur la collaboration.pdf",
      displayName: "Digital Collaboration Certificate"
    },
    {
      name: "Code2Care Certificate",
      path: "/src/assets/pdf/Code2Care Certificate.pdf",
      displayName: "Code2Care Datathon"
    },
    {
      name: "Data Science Module 1",
      path: "/src/assets/pdf/Data Science MOD1.pdf",
      displayName: "Data Science Certification"
    },
    {
      name: "DevOps Certificate",
      path: "/src/assets/pdf/DevOps 7238322_cert_3045.pdf",
      displayName: "DevOps Certification"
    },
    {
      name: "Project Management Coursera",
      path: "/src/assets/pdf/FINAL PM Coursera.pdf",
      displayName: "Project Management"
    },
    {
      name: "YALI Certificate",
      path: "/src/assets/pdf/YALI Cert.pdf",
      displayName: "YALI Leadership"
    }
  ];

  const openModal = (certificate: { name: string; path: string }) => {
    setSelectedPdf(certificate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPdf(null);
  };

  const downloadPdf = (path: string, name: string) => {
    const link = document.createElement('a');
    link.href = path;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Duplicate certificates for seamless animation
  const duplicatedCertificates = [...certificates, ...certificates];

  return (
    <section className="py-2 bg-gradient-to-r from-blue-600 via-blue-800 to-violet-600 overflow-hidden">
      <div className="container mx-auto px-6">


        {/* Animated Certificates Band */}
        <div className="relative">
          <div className="certificates-scroll flex space-x-4 py-1">
            {duplicatedCertificates.map((certificate, index) => (
              <div
                key={`${certificate.name}-${index}`}
                className="flex-shrink-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-6 cursor-pointer transition-all duration-300 hover:bg-white/20 hover:scale-105 min-w-[280px]"
                onClick={() => openModal(certificate)}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <FileText className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                      {certificate.displayName}
                    </h3>
                    <div className="flex items-center space-x-2 text-blue-100 text-xs">
                      <Eye size={14} />
                      <span>Click to preview</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PDF Preview Modal */}
      {isModalOpen && selectedPdf && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {selectedPdf.name}
              </h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => downloadPdf(selectedPdf.path, selectedPdf.name)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download size={16} />
                  <span>Download</span>
                </button>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 p-6">
              <iframe
                src={selectedPdf.path}
                className="w-full h-[70vh] border border-gray-200 rounded-lg"
                title={selectedPdf.name}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CertificatesSection;