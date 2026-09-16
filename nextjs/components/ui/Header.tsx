"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sparkles, Sun, Moon } from "lucide-react";
import { useDarkModeContext } from "./ThemeContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { isDark, toggle } = useDarkModeContext();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Simple active section detection
      const sections = ["home", "about", "skills", "projects", "experience", "achievements", "certificates", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#home", id: "home", label: "Home" },
    { href: "#about", id: "about", label: "About" },
    { href: "#skills", id: "skills", label: "Skills" },
    { href: "#projects", id: "projects", label: "Projects" },
    { href: "#experience", id: "experience", label: "Experience" },
    { href: "#certificates", id: "certificates", label: "Certificates" },
    { href: "#contact", id: "contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-[#07090E]/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl"
          : "bg-transparent py-5"
        }`}
    >
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Tagline */}
          <a href="#home" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF6B00] to-[#00C853] p-0.5 shadow-orange-glow group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#07090E] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#FF6B00] group-hover:text-[#00C853] transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-wider text-white uppercase group-hover:text-[#FF6B00] transition-colors">
                TANDAH MARCELLE
              </span>
              <span className="text-[10px] font-mono text-[#00C853] tracking-widest uppercase">
                Passion • Consistency • Results
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 bg-[#0F131D]/80 backdrop-blur-lg px-4 py-1.5 rounded-full border border-white/10">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 ${isActive
                      ? "text-white bg-gradient-to-r from-[#FF6B00] to-[#E05A00] shadow-orange-glow"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Tech Status Pill + Theme Toggle */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={toggle}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2.5 rounded-full bg-[#0F131D]/80 backdrop-blur-lg border border-white/10 text-[#FF6B00] hover:border-[#FF6B00] hover:scale-105 transition-all duration-300 shadow-lg"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a
              href="#contact"
              className="btn-tech-orange text-xs px-4 py-2 font-medium"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={toggle}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2 rounded-full bg-[#0F131D]/80 backdrop-blur-lg border border-white/10 text-[#FF6B00] hover:border-[#FF6B00] transition-all duration-300"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className="p-2 text-[#FF6B00] hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-2 bg-[#0F131D]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive
                        ? "bg-gradient-to-r from-[#FF6B00] to-[#E05A00] text-white"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                );
              })}
              <div className="pt-2 border-t border-white/10">
                <a
                  href="#contact"
                  className="w-full btn-tech-orange text-xs text-center justify-center py-2.5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Let's Talk
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
