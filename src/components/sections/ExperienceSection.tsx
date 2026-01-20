import { Calendar, MapPin } from 'lucide-react';

const ExperienceSection = () => {
  const experiences = [
    {
      title: 'Junior Backend Developer & Graphic Designer',
      company: 'Innovation Sarl',
      location: 'Camp Yabassi, Douala',
      period: '2022 - 2023',
      description: 'Coded critical modules for an event management system and delivered professional graphic designs for the enterprise and its diverse clientele.',
    },
    {
      title: 'Mobile App Developer (Group Leader)',
      company: 'Plateforme de Diagnostic Medical de Douala (PDMD)',
      location: 'Sable - Bonamoussadi',
      period: 'Sept 2024 - Jan 2025',
      description: 'Led the development of the EDEN mobile application, enabling doctors to track patient referrals and commissions. My leadership efforts in coordinating this project inspired me to pursue professional Project Management training.',
    },
    {
      title: 'Frontend & Web Developer (Group Leader)',
      company: 'Institut Universitaire de la Cote (IUC)',
      location: 'Logbessou, Douala',
      period: 'Feb 2025 - Present',
      description: 'Driving the development of a lecturer self-service tool and an institutional Mediatech for document management. As a group leader, I ensure seamless communication between departments and project success, which led to my formal Project Management Certification.',
    },
  ];

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-900">
            Work Experience
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            My professional journey in tech, building solutions and growing as a developer.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <div key={index} className="relative">
              {/* Timeline line */}
              {index !== experiences.length - 1 && (
                <div className="absolute left-8 top-16 w-0.5 h-full bg-gradient-to-b from-primary-600 to-secondary-500"></div>
              )}

              <div className="flex items-start mb-12">
                {/* Timeline dot */}
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-500 rounded-full flex items-center justify-center mr-8">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>

                {/* Content */}
                <div className="flex-grow bg-white p-4 rounded shadow-lg card-hover">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1">
                    <div>
                      <h3 className="text-lg font-medium text-blue-600 mb-1">{exp.title}</h3>
                      <h4 className="text-base text-blue-600 font-semibold">{exp.company}</h4>
                    </div>
                    <div className="flex flex-col md:items-end mt-2 md:mt-0">
                      <div className="flex items-center text-gray-600 mb-1">
                        <Calendar size={16} className="mr-1" />
                        <span className="text-sm">{exp.period}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin size={16} className="mr-1" />
                        <span className="text-sm">{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed text-sm">{exp.description}</p>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;