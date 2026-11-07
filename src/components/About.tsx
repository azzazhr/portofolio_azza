"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Eye, X, GraduationCap, UserCheck, CheckCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ProfileSlider from "@/components/ProfileSlider";

const CV_PATH = "/CV_Azzahra_Attaqina.pdf";

export default function About() {
  const { t, personalInfo } = useLanguage();
  const [showCv, setShowCv] = useState(false);

  return (
    <section id="about" className="py-16 sm:py-24 relative bg-[#F0EBE3] dark:bg-[#24221F] overflow-hidden scroll-mt-20">
      {/* Glow backgrounds (subtle gold) */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-[#B59662]/5 dark:bg-[#C6A878]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="type-eyebrow inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B59662]/10 dark:bg-[#C6A878]/10 border border-[#B59662]/30 dark:border-[#C6A878]/30">
            <UserCheck className="w-3.5 h-3.5" />
            <span>{t.about.sectionTag}</span>
          </div>
          <h2 className="type-section-title text-[2.2rem] sm:text-5xl lg:text-[3.5rem]">
            {t.about.sectionTitle} <span className="text-gradient-gold italic">Azzahra Attaqina</span>
          </h2>
          <p className="type-section-subtitle">
            {t.about.subTitle}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden glass-panel border border-[#E8E1D7] dark:border-[#403B34] p-3 shadow-xl">
              <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-[#F8F6F1] dark:bg-[#1D1C1A]">
                <ProfileSlider
                  alt="Azzahra Attaqina Profile"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F0EBE3] dark:from-[#24221F] via-transparent to-transparent opacity-80 pointer-events-none" />
              </div>

              {/* Floating Badge */}
              <div className="absolute top-6 right-6 px-4 py-2 rounded-xl bg-[#FFFFFF]/95 dark:bg-[#292724]/95 backdrop-blur-md border border-[#B59662]/40 font-ui text-[11px] font-semibold uppercase tracking-[0.1em] text-[#B59662] dark:text-[#C6A878] flex items-center gap-2 shadow-lg">
                <span>{t.about.bnspBadge}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-4">
              <h3 className="type-card-title text-2xl sm:text-3xl flex items-start gap-3">
                <GraduationCap className="w-6 h-6 text-[#B59662] dark:text-[#C6A878] shrink-0 mt-1" />
                <span>{t.about.fullBioHeader}</span>
              </h3>
              <p className="type-body">
                {personalInfo.fullBio}
              </p>
            </div>

            {/* Highlights bullet list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {t.about.highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 font-body text-sm leading-relaxed text-[#81776B] dark:text-[#B7ADA0]">
                  <CheckCircle className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Key Statistics Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {personalInfo.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#292724] border border-[#E8E1D7] dark:border-[#403B34] hover:border-[#B59662]/40 dark:hover:border-[#C6A878]/40 transition-all duration-300 text-center flex flex-col justify-center shadow-sm"
                >
                  <span className="font-display font-semibold text-3xl sm:text-4xl tracking-tight text-gradient-gold">
                    {stat.value}
                  </span>
                  <span className="font-ui text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-[#81776B] dark:text-[#B7ADA0] font-semibold mt-1.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setShowCv(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#B59662] hover:bg-[#9E8050] dark:bg-[#C6A878] dark:hover:bg-[#D8BC8C] text-white font-ui font-semibold text-sm tracking-[0.02em] transition-all shadow-md shadow-[#B59662]/25"
              >
                <Eye className="w-4 h-4" />
                <span>{t.hero.viewCv}</span>
              </button>
              
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFFFFF] dark:bg-[#292724] border border-[#E8E1D7] dark:border-[#403B34] hover:border-[#B59662]/50 dark:hover:border-[#C6A878]/50 text-[#81776B] dark:text-[#B7ADA0] hover:text-[#242321] dark:hover:text-[#F5F1E9] font-ui font-semibold text-sm tracking-[0.02em] transition-all shadow-sm"
              >
                <span>LinkedIn Profile</span>
              </a>
            </div>

          </motion.div>

        </div>
      </div>

      {/* CV Preview Modal */}
      <AnimatePresence>
        {showCv && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCv(false)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl h-[90vh] bg-[#FFFFFF] dark:bg-[#292724] border border-[#E8E1D7] dark:border-[#403B34] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between gap-3 p-3 sm:p-4 border-b border-[#E8E1D7] dark:border-[#403B34]">
                <h3 className="font-display font-semibold text-base sm:text-lg tracking-[0.01em] text-[#242321] dark:text-[#F5F1E9] truncate">
                  CV Azzahra Attaqina
                </h3>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={CV_PATH}
                    download="CV_Azzahra_Attaqina.pdf"
                    className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-[#B59662] hover:bg-[#9E8050] text-white font-ui text-xs sm:text-sm font-semibold tracking-[0.02em] transition-colors shadow-md shadow-[#B59662]/25"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t.hero.downloadCv}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setShowCv(false)}
                    aria-label="Close CV preview"
                    className="p-2 rounded-xl bg-[#F0EBE3] dark:bg-[#1D1C1A] border border-[#E8E1D7] dark:border-[#403B34] text-[#81776B] dark:text-[#B7ADA0] hover:text-[#242321] dark:hover:text-[#F5F1E9] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <iframe
                src={CV_PATH}
                title="CV Azzahra Attaqina"
                className="w-full flex-1 bg-[#F8F6F1] dark:bg-[#1D1C1A]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
