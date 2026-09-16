"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, MessageSquare, Sparkles } from "lucide-react";
import type { BackendContact } from "../../lib/types";

interface ContactSectionProps {
  data?: BackendContact | null;
}

const ContactSection = ({ data }: ContactSectionProps) => {
  const email = data?.email || "tandahmarcelle2@gmail.com";
  const phone = data?.phone || "+237 693450585 / +237 670418793";
  const location = data?.location || "Logbessou - Douala, Cameroon";
  const whatsapp = data?.whatsapp || "237693450585";
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const whatsappMessage =
      `*New Contact Form Submission*%0A%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Subject:* ${formData.subject}%0A%0A` +
      `*Message:*%0A${formData.message}`;
    window.open(`https://wa.me/${whatsapp}?text=${whatsappMessage}`, "_blank");
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-12 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 badge-orange">
            <MessageSquare className="w-4 h-4 text-[#FF6B00]" />
            <span>Direct Channels</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight uppercase">
            Get In <span className="text-gradient-emerald">Touch</span>
          </h2>

          <p className="text-slate-300 text-base md:text-lg max-w-xl mx-auto">
            Open for technical consultations, software development roles, and engineering collaborations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Details */}
          <div className="space-y-8 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-2xl font-extrabold text-white uppercase tracking-wider">
                Let's Build Together
              </h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Whether you have a platform to scale, an AI project to build, or want to discuss technical leadership, I'd love to connect. Reach out directly through any of these channels.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 glass-panel p-4 rounded-2xl border border-white/10 group hover:border-[#FF6B00]/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-[#FF6B00]" size={22} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Direct Email</h4>
                  <a href={`mailto:${email}`} className="text-sm font-semibold text-white hover:text-[#FF6B00] transition-colors">
                    {email}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4 glass-panel p-4 rounded-2xl border border-white/10 group hover:border-[#00C853]/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#00C853]/10 border border-[#00C853]/30 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-[#00C853]" size={22} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone & WhatsApp</h4>
                  <p className="text-sm font-semibold text-white">{phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 glass-panel p-4 rounded-2xl border border-white/10 group hover:border-[#FF6B00]/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-[#FF6B00]" size={22} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Primary Location</h4>
                  <p className="text-sm font-semibold text-white">{location}</p>
                </div>
              </div>
            </div>

            <div className="badge-emerald text-xs justify-start py-2">
              <Sparkles className="w-4 h-4" />
              <span>Typical Response Time: &lt; 2 Hours</span>
            </div>
          </div>

          {/* Form */}
          <div className="glass-card p-8 md:p-10 rounded-3xl border border-white/10 relative">
            {showSuccess && (
              <div className="mb-6 p-4 bg-[#00C853]/10 border border-[#00C853]/40 rounded-2xl flex items-center space-x-3 text-[#00C853]">
                <CheckCircle size={20} className="shrink-0" />
                <div className="text-xs">
                  <h4 className="font-bold uppercase tracking-wider">Message Transmitted!</h4>
                  <p className="mt-0.5 opacity-90">Opening WhatsApp channel with your inquiry details...</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#07090E] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#FF6B00] transition-colors placeholder:text-slate-600"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#07090E] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#FF6B00] transition-colors placeholder:text-slate-600"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#07090E] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#FF6B00] transition-colors placeholder:text-slate-600"
                  placeholder="Project Collaboration / Opportunity"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Message Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-[#07090E] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#FF6B00] transition-colors resize-none placeholder:text-slate-600"
                  placeholder="Tell me about your vision, technical requirements, or inquiry..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-tech-orange w-full py-3.5 justify-center text-sm font-bold uppercase tracking-wider ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message via WhatsApp</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
