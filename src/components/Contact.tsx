"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, MessageSquare, Github, Linkedin, Instagram, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export default function Contact() {
  const { t, personalInfo } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Contact form error:", err);
      setError(t.contact.sendError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 relative bg-[#FFFFFF] dark:bg-[#1D1C1A] border-t border-[#E8E1D7] dark:border-[#403B34] overflow-hidden">
      {/* Background ambient light (subtle gold) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B59662]/4 dark:bg-[#C6A878]/4 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B59662]/10 dark:bg-[#C6A878]/10 border border-[#B59662]/30 dark:border-[#C6A878]/30 text-xs font-semibold uppercase tracking-wider text-[#B59662] dark:text-[#C6A878]">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t.contact.sectionTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#242321] dark:text-[#F5F1E9] tracking-tight">
            {t.contact.sectionTitle}
          </h2>
          <p className="text-[#81776B] dark:text-[#B7ADA0] text-base sm:text-lg">
            {t.contact.subTitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Info Cards & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-display font-bold text-[#242321] dark:text-[#F5F1E9]">
                {t.contact.infoTitle}
              </h3>
              <p className="text-[#81776B] dark:text-[#B7ADA0] text-sm leading-relaxed">
                {t.contact.infoDesc}
              </p>
            </div>

            {/* Quick Cards */}
            <div className="space-y-4 pt-2">
              <a
                href={`mailto:${personalInfo.email}`}
                className="glass-panel glass-panel-hover p-4 rounded-2xl border border-[#E8E1D7] dark:border-[#403B34] flex items-center gap-4 group"
              >
                <div className="p-3 rounded-xl bg-[#B59662]/10 dark:bg-[#C6A878]/10 border border-[#B59662]/30 dark:border-[#C6A878]/30 text-[#B59662] dark:text-[#C6A878] group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[#81776B] dark:text-[#B7ADA0] block font-medium">{t.contact.emailLabel}</span>
                  <span className="text-sm font-semibold text-[#242321] dark:text-[#F5F1E9] group-hover:text-[#B59662] dark:group-hover:text-[#C6A878] transition-colors">
                    {personalInfo.email}
                  </span>
                </div>
              </a>

              <div className="glass-panel p-4 rounded-2xl border border-[#E8E1D7] dark:border-[#403B34] flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#B59662]/10 dark:bg-[#C6A878]/10 border border-[#B59662]/30 dark:border-[#C6A878]/30 text-[#B59662] dark:text-[#C6A878]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[#81776B] dark:text-[#B7ADA0] block font-medium">{t.contact.locationLabel}</span>
                  <span className="text-sm font-semibold text-[#242321] dark:text-[#F5F1E9]">
                    {personalInfo.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="space-y-3 pt-4">
              <span className="text-xs uppercase font-semibold tracking-wider text-[#81776B] dark:text-[#B7ADA0]">
                {t.contact.socialsLabel}:
              </span>
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#F0EBE3] dark:bg-[#292724] border border-[#E8E1D7] dark:border-[#403B34] text-[#81776B] dark:text-[#B7ADA0] hover:text-[#242321] dark:hover:text-[#F5F1E9] hover:border-[#B59662]/50 dark:hover:border-[#C6A878]/50 text-xs font-semibold transition-all shadow-sm"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#F0EBE3] dark:bg-[#292724] border border-[#E8E1D7] dark:border-[#403B34] text-[#81776B] dark:text-[#B7ADA0] hover:text-[#242321] dark:hover:text-[#F5F1E9] hover:border-[#B59662]/50 dark:hover:border-[#C6A878]/50 text-xs font-semibold transition-all shadow-sm"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={personalInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#F0EBE3] dark:bg-[#292724] border border-[#E8E1D7] dark:border-[#403B34] text-[#81776B] dark:text-[#B7ADA0] hover:text-[#242321] dark:hover:text-[#F5F1E9] hover:border-[#B59662]/50 dark:hover:border-[#C6A878]/50 text-xs font-semibold transition-all shadow-sm"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
                <a
                  href={`https://wa.me/${personalInfo.whatsapp}?text=${encodeURIComponent(personalInfo.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 border border-green-600 hover:border-green-500 text-white text-xs font-semibold transition-all shadow-md shadow-green-600/25"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#E8E1D7] dark:border-[#403B34] space-y-6 shadow-sm">
              <h3 className="text-xl font-display font-bold text-[#242321] dark:text-[#F5F1E9] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#B59662] dark:text-[#C6A878]" />
                <span>{t.contact.formTitle}</span>
              </h3>

              {isSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-[#242321] dark:text-[#F5F1E9]">{t.contact.successTitle}</h4>
                  <p className="text-[#81776B] dark:text-[#B7ADA0] text-xs sm:text-sm">
                    {t.contact.successDesc}
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-2 px-5 py-2 rounded-xl bg-[#F0EBE3] dark:bg-[#292724] hover:bg-[#E8E1D7] dark:hover:bg-[#403B34] text-xs font-semibold text-[#242321] dark:text-[#F5F1E9] border border-[#E8E1D7] dark:border-[#403B34]"
                  >
                    {t.contact.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-medium text-[#81776B] dark:text-[#B7ADA0]">
                        {t.contact.formName} <span className="text-[#B59662] dark:text-[#C6A878]">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t.contact.namePlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF] dark:bg-[#292724] border border-[#E8E1D7] dark:border-[#403B34] text-[#242321] dark:text-[#F5F1E9] placeholder-[#81776B]/60 dark:placeholder-[#B7ADA0]/60 text-sm focus:outline-none focus:border-[#B59662] dark:focus:border-[#C6A878] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-medium text-[#81776B] dark:text-[#B7ADA0]">
                        {t.contact.formEmail} <span className="text-[#B59662] dark:text-[#C6A878]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t.contact.emailPlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF] dark:bg-[#292724] border border-[#E8E1D7] dark:border-[#403B34] text-[#242321] dark:text-[#F5F1E9] placeholder-[#81776B]/60 dark:placeholder-[#B7ADA0]/60 text-sm focus:outline-none focus:border-[#B59662] dark:focus:border-[#C6A878] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-medium text-[#81776B] dark:text-[#B7ADA0]">
                      {t.contact.formSubject}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder={t.contact.subjectPlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF] dark:bg-[#292724] border border-[#E8E1D7] dark:border-[#403B34] text-[#242321] dark:text-[#F5F1E9] placeholder-[#81776B]/60 dark:placeholder-[#B7ADA0]/60 text-sm focus:outline-none focus:border-[#B59662] dark:focus:border-[#C6A878] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-medium text-[#81776B] dark:text-[#B7ADA0]">
                      {t.contact.formMessage} <span className="text-[#B59662] dark:text-[#C6A878]">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.contact.messagePlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF] dark:bg-[#292724] border border-[#E8E1D7] dark:border-[#403B34] text-[#242321] dark:text-[#F5F1E9] placeholder-[#81776B]/60 dark:placeholder-[#B7ADA0]/60 text-sm focus:outline-none focus:border-[#B59662] dark:focus:border-[#C6A878] transition-colors resize-none"
                    />
                  </div>

                  {error && (
                    <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-500/40 text-red-600 dark:text-red-400 text-xs sm:text-sm">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#B59662] to-[#9E8050] hover:from-[#9E8050] hover:to-[#B59662] dark:from-[#C6A878] dark:to-[#B59662] dark:hover:from-[#D8BC8C] dark:hover:to-[#C6A878] text-white font-semibold text-sm transition-all shadow-lg shadow-[#B59662]/25 hover:shadow-[#B59662]/40 disabled:opacity-50"
                  >
                    {loading ? (
                      <span>{t.contact.sending}</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{t.contact.sendButton}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
