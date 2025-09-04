import { Heart, Lightbulb, Award, Zap } from 'lucide-react';
import Image1 from "../../assets/images/me.png";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-900">
            About Me
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed max-w-3xl mx-auto">
            With over 3 years of experience in mobile and web development, I specialize in creating modern applications using cutting-edge technologies. My passion focuses on building solutions that impacts the community.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute -inset-4  rounded-lg blur opacity-25"></div>
              <img 
                src={Image1}
                alt="Sarah Johnson working" 
                className="relative w-full h-96 object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-sm text-gray-700 leading-relaxed">
                Outside of coding, I enjoy attending tech conferences and meetups. I'm also an avid reader, especially on topics like psychology and what makes people connect.You can often find me trying out new coffee shops around the city and to recharge, I enjoy listening to music on my daily walk.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-lg border border-gray-200 transition-all duration-300 hover:bg-blue-700 group">
                <Award className="text-blue-600 mb-3 group-hover:text-white transition-colors duration-300" size={24} />
                <h3 className="font-bold text-gray-800 mb-2 group-hover:text-white transition-colors duration-300">5+ Competitions</h3>
                <p className="text-gray-600 text-sm group-hover:text-white transition-colors duration-300">Great experiences</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200 transition-all duration-300 hover:bg-blue-700 group">
                <Lightbulb className="text-blue-600 mb-3 group-hover:text-white transition-colors duration-300" size={24} />
                <h3 className="font-bold text-gray-800 mb-2 group-hover:text-white transition-colors duration-300">Lifelong Learner</h3>
                <p className="text-gray-600 text-sm group-hover:text-white transition-colors duration-300">Always asking 'why' and 'how'</p>
              </div>
            </div>

            <div className="grid gap-4">


              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-lg border border-gray-200 transition-all duration-300 hover:bg-blue-700 group">
                  <div className="flex items-center mb-4">
                    <Heart className="text-blue-600 mr-3 group-hover:text-white transition-colors duration-300" size={20} />
                    <h3 className="text-base font-semibold text-gray-800 group-hover:text-white transition-colors duration-300">User-Focused</h3>
                  </div>
                  <p className="text-gray-600 text-sm group-hover:text-white transition-colors duration-300">
                    Every project starts with understanding user needs and creating intuitive experiences.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 transition-all duration-300 hover:bg-blue-700 group">
                  <div className="flex items-center mb-4">
                    <Zap className="text-blue-600 mr-3 group-hover:text-white transition-colors duration-300" size={20} />
                    <h3 className="text-base font-semibold text-gray-800 group-hover:text-white transition-colors duration-300">Innovation</h3>
                  </div>
                  <p className="text-gray-600 text-sm group-hover:text-white transition-colors duration-300">
                    I love exploring new technologies and finding creative solutions to complex challenges.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;