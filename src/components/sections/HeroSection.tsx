import { ArrowDown, Linkedin, Mail, Download } from 'lucide-react';
import Image1 from "../../assets/images/me.png";


const HeroSection = () => {
  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = '/src/assets/pdf/CV_TANDAH-DJIMELI-MARCELLE.pdf';
    link.download = 'CV_TANDAH-DJIMELI-MARCELLE.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-blue-900 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0">
        {/* Enhanced floating orbs with more variety */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-18 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-4000"></div>
        <div className="absolute top-60 left-1/2 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-12 animate-blob animation-delay-1000"></div>
        <div className="absolute bottom-40 right-1/3 w-88 h-88 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-16 animate-blob animation-delay-3000"></div>
        
        {/* Additional floating elements */}
        <div className="absolute top-1/3 left-1/4 w-56 h-56 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-12 animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-14 animate-float animation-delay-3000"></div>
        <div className="absolute top-1/2 right-1/3 w-40 h-40 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-18 animate-pulse-slow"></div>
        <div className="absolute top-1/4 left-2/3 w-48 h-48 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-16 animate-float animation-delay-4000"></div>
        <div className="absolute bottom-1/2 left-1/3 w-36 h-36 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-14 animate-pulse-slow animation-delay-2000"></div>
        
        {/* Enhanced geometric shapes */}
        <div className="absolute top-1/4 right-1/5 w-20 h-20 border-2 border-white/15 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-1/4 left-1/5 w-16 h-16 border-2 border-blue-300/25 rounded-full animate-bounce-gentle"></div>
        <div className="absolute top-3/4 right-1/6 w-12 h-12 bg-blue-400/30 rounded-full animate-ping-slow"></div>
        <div className="absolute top-1/6 left-1/2 w-14 h-14 border-2 border-blue-200/20 rotate-12 animate-spin-slow animation-delay-1000"></div>
        <div className="absolute bottom-1/6 right-1/2 w-10 h-10 bg-blue-300/25 rounded-full animate-bounce-gentle animation-delay-2000"></div>
        <div className="absolute top-2/3 left-1/6 w-18 h-18 border-2 border-white/12 rounded-full animate-pulse-slow animation-delay-3000"></div>
        
        {/* Enhanced particle-like dots */}
        <div className="absolute top-1/6 left-1/3 w-3 h-3 bg-white/35 rounded-full animate-twinkle"></div>
        <div className="absolute top-2/3 left-1/6 w-4 h-4 bg-blue-300/45 rounded-full animate-twinkle animation-delay-1000"></div>
        <div className="absolute bottom-1/6 right-1/4 w-3 h-3 bg-blue-300/55 rounded-full animate-twinkle animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/8 w-2 h-2 bg-blue-300/65 rounded-full animate-twinkle animation-delay-3000"></div>
        <div className="absolute top-1/8 right-1/3 w-2 h-2 bg-white/40 rounded-full animate-twinkle animation-delay-4000"></div>
        <div className="absolute bottom-1/8 left-1/4 w-3 h-3 bg-blue-400/50 rounded-full animate-twinkle animation-delay-1000"></div>
        <div className="absolute top-3/4 left-2/3 w-2 h-2 bg-blue-200/45 rounded-full animate-twinkle animation-delay-2000"></div>
        <div className="absolute bottom-2/3 right-1/6 w-4 h-4 bg-blue-500/40 rounded-full animate-twinkle animation-delay-3000"></div>
        
        {/* Moving lines/streaks */}
        <div className="absolute top-1/3 left-0 w-32 h-0.5 bg-blue-300/20 animate-float animation-delay-1000"></div>
        <div className="absolute bottom-1/3 right-0 w-24 h-0.5 bg-blue-400/25 animate-float animation-delay-2000"></div>
        <div className="absolute top-2/3 left-1/4 w-20 h-0.5 bg-white/15 animate-float animation-delay-3000"></div>
        
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-blue-800/25"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-transparent to-blue-800/15"></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-blue-600 p-1 animate-pulse-gentle">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <img 
                    src={Image1}
                    alt="Tandah Djimeli Marcelle" 
                    className="w-28 h-28 rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Hi, I'm <span className="text-blue-300">TANDAH DJIMELI MARCELLE</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-blue-200 mb-6 font-light">
              Full Stack Developer & GBV Advocate
            </h2>
            <p className="text-base md:text-lg text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Creating impactful technology solutions in healthcare and education while empowering women in technology.
            </p>
          </div>

          <div className="animate-slide-up flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a href="#projects" className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium transition-all duration-300 hover:bg-blue-700 hover:shadow-lg text-sm">
              View My Work
            </a>
            <button 
              onClick={downloadCV}
              className="bg-white text-blue-900 px-5 py-2 rounded-full font-medium transition-all duration-300 hover:bg-blue-50 hover:shadow-lg flex items-center space-x-2 text-sm"
            >
              <Download size={16} />
              <span>Download CV</span>
            </button>
            <a href="#contact" className="border-2 border-white/30 text-white px-5 py-2 rounded-full font-medium transition-all duration-300 hover:bg-white/10 text-sm">
              Get In Touch
            </a>
            <a href="#professional-project" className="border-2 border-blue-400/50 text-blue-300 px-5 py-2 rounded-full font-medium transition-all duration-300 hover:bg-blue-400/10 flex items-center text-sm">
              <Download size={18} className="mr-2" />
              Professional Project
            </a>
          </div>

          <div className="flex justify-center space-x-6 mb-16">
          
            <a
              href="https://www.linkedin.com/in/tandah-djimeli-marcelle-1b1701303?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 text-white"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="tandahmarcelle2@gmail.com"
              className="p-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 text-white"
            >
              <Mail size={24} />
            </a>
          </div>

          <div className="animate-bounce-slow">
            <a href="#about" className="inline-block text-white/70 hover:text-white transition-colors duration-300">
              <ArrowDown size={32} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;