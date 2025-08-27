import React from 'react';
import { Trophy, Award, Medal, Star, Calendar, MapPin } from 'lucide-react';

const AchievementsSection = () => {
  const achievements = [
    {
      title: 'Girls in ICT day challenge',
      organization: 'African Women In Tech Startups-AFRICANWITS',
      date: '2024',
      location: 'Douala, Cameroon',
      description: 'My team (UNITY HAVEN) and I won the second place for developing a mobile health application that helps track and prevent gender-based violence in our community.',
      category: 'Coding challenge',
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50',
      borderColor: 'border-yellow-200'
    },
    {
      title: 'CODE2CARE - Finalist',
      organization: 'Data Science without Borders (DSWB)',
      date: '2025',
      location: 'Douala, Cameroon',
      description: 'My team and I secured a place at the finals , out of 31 teams from different countries. Teams were challenged to build solutions ranging from multilingual patient reminder systems and AI-powered chatbots for health education, to intelligent systems for forecasting blood bank inventory.',
      category: 'Datathon',
      icon: Award,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-200'
    },


  ];

 
  return (
    <section id="achievements" className=" bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-blue-900">
            Achievements & Certificates
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            My journey in tech competitions, certificates, and making a positive impact through technology.
          </p>
        </div>

        {/* Stats Section */}


        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <div key={index} className="group relative">
              <div className="bg-white p-6 rounded border border-gray-200 transition-all duration-300 ">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-blue-600 rounded-lg text-white">
                    <achievement.icon size={24} />
                  </div>
                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full ">
                    {achievement.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 mb-2 ">{achievement.title}</h3>
                <h4 className="text-base font-semibold text-blue-600 mb-3 group-hover:text-purple-600 transition-colors duration-300">{achievement.organization}</h4>
                
                <div className="flex items-center text-gray-600 mb-3 space-x-4 group-hover:text-blue-700 transition-colors duration-300">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    <span className="text-sm">{achievement.date}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-1" />
                    <span className="text-sm">{achievement.location}</span>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed ">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;