"use client";

import { Linkedin, Mail, Heart, Code2, Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#07090E] text-white py-16 border-t border-white/10 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF6B00] to-[#00C853] p-0.5 shadow-orange-glow">
                <div className="w-full h-full bg-[#07090E] rounded-[10px] flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-[#FF6B00]" />
                </div>
              </div>
              <h3 className="text-xl font-extrabold text-white tracking-wider uppercase">
                Tandah <span className="text-[#FF6B00]">Djimeli</span>
              </h3>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed">
              Full Stack Engineer & Tech for Good advocate specializing in reactive web applications, AI medical companions, and community safety platforms.
            </p>

            <div className="badge-emerald text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Available for Engineering Roles</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:justify-self-center">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4 border-b border-white/10 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {["about", "skills", "projects", "experience", "achievements", "contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    className="text-slate-400 hover:text-[#FF6B00] transition-colors capitalize flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 bg-[#00C853] rounded-full" />
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Social */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4 border-b border-white/10 pb-2">
              Connect & Networks
            </h4>

            <div className="flex space-x-3">
              <a
                href="https://www.linkedin.com/in/tandah-djimeli-marcelle-1b1701303?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#0F131D] border border-white/10 rounded-xl hover:border-[#FF6B00] hover:text-[#FF6B00] text-slate-300 transition-colors shadow-lg"
                title="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:tandahmarcelle2@gmail.com"
                className="p-3 bg-[#0F131D] border border-white/10 rounded-xl hover:border-[#00C853] hover:text-[#00C853] text-slate-300 transition-colors shadow-lg"
                title="Send Email"
              >
                <Mail size={18} />
              </a>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              Open to technical contracts, remote engineering positions, and collaborative open-source projects.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-mono gap-4">
          <p>© 2025 Tandah Djimeli Marcelle. All rights reserved.</p>
          <p className="flex items-center">
            Designed with <Heart size={14} className="text-[#FF6B00] mx-1 fill-[#FF6B00]" /> and Next.js 15
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;