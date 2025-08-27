import React from 'react';

const SkillsSection = () => {
  const skillCategories = [
    {
      title: 'Frontend',
  
      skills: [
        { name: 'React JS', level: 87, color: 'from-blue-600 to-blue-800' },
        { name: 'TypeScript', level: 82, color: 'from-blue-600 to-blue-800' },
        { name: 'Flutter', level: 90, color: 'from-blue-600 to-blue-800' },
        { name: 'Tailwind CSS', level: 92, color: 'from-blue-600 to-blue-800' },

      ],
    },
    {
      title: 'Backend',
 
      skills: [
        { name: 'Laravel', level: 88, color: 'from-blue-600 to-blue-800' },
        { name: 'Python', level: 50, color: 'from-blue-600 to-blue-800' },
        { name: 'PostgreSQL', level: 63, color: 'from-blue-600 to-blue-800' },
        { name: 'Mysql', level: 78, color: 'from-blue-600 to-blue-8000' },
        { name: 'NestJS', level: 60, color: 'from-blue-600 to-blue-800' },
      ],
    },
    {
      title: 'Tools & Others',

      skills: [
        { name: 'Git', level: 90, color: 'from-blue-600 to-blue-800' },
        { name: 'Adobe XD', level: 75, color: 'from-blue-600 to-blue-800' },
        { name: 'Figma', level: 85, color: 'from-blue-600 to-blue-800' },
      ],
    },
  ];

  return (
    <section id="skills" className="py-0 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-3xl font-bold mb-4 text-blue-900">
            Skills & Technologies
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Technologies and tools I use to build solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-l card-hover border border-white/50">
              <div className="text-center mb-2">
                <h3 className="text-l font-bold text-gray-800">
                  {category.title}
                </h3>
              </div>
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="group">
                    <div className="flex justify-between mb-3">
                      <span className="text-gray-700 ">{skill.name}</span>
                      <span className="text-gray-900 font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded h-2 overflow-hidden">
                      <div
                        className={`bg-gradient-to-r ${skill.color} h-3 rounded-full transition-all duration-1000 ease-out transform group-hover:scale-105`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-white/80 backdrop-blur-sm px-8 py-6 rounded-2xl shadow-lg">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">2+</div>
              <div className="text-gray-600 text-sm">Years Experience</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">4+</div>
              <div className="text-gray-600 text-sm">Projects Completed</div>
            </div>
    
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;