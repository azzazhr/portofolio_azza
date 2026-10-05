"use client";

import { motion } from "framer-motion";
import { Download, GraduationCap, UserCheck, CheckCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

export default function About() {
  const { t, personalInfo } = useLanguage();

  const handleDownloadCV = () => {
    alert("CV Azzahra Attaqina siap diunduh dalam format PDF. (Link dummy/placeholder CV diaktifkan)");
  };

  return (
    <section id="about" className="py-16 sm:py-24 relative bg-slate-50 dark:bg-[#080b11] overflow-hidden scroll-mt-20">
      {/* Glow backgrounds */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800/60 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <UserCheck className="w-3.5 h-3.5" />
            <span>{t.about.sectionTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            {t.about.sectionTitle} <span className="text-gradient-primary">Azzahra Attaqina</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
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
            <div className="relative rounded-3xl overflow-hidden glass-panel border border-slate-300 dark:border-slate-700/60 p-3 shadow-2xl">
              <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900">
                <Image
                  src="/images/profile.jpg"
                  alt="Azzahra Attaqina Profile"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover object-center transition-transform duration-500 hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#080b11] via-transparent to-transparent opacity-80" />
              </div>

              {/* Floating Badge */}
              <div className="absolute top-6 right-6 px-4 py-2 rounded-xl bg-white/90 dark:bg-[#080b11]/90 backdrop-blur-md border border-indigo-500/40 text-xs font-semibold text-indigo-700 dark:text-indigo-300 flex items-center gap-2 shadow-lg">
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
              <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white flex items-start gap-3">
                <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-400 shrink-0 mt-1" />
                <span>{t.about.fullBioHeader}</span>
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                {personalInfo.fullBio}
              </p>
            </div>

            {/* Highlights bullet list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {t.about.highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Key Statistics Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {personalInfo.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 hover:border-indigo-500/40 transition-all duration-300 text-center flex flex-col justify-center"
                >
                  <span className="text-2xl sm:text-3xl font-display font-extrabold text-gradient-primary">
                    {stat.value}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={handleDownloadCV}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-md shadow-indigo-600/30 hover:shadow-indigo-600/50"
              >
                <Download className="w-4 h-4" />
                <span>{t.hero.downloadCv}</span>
              </button>
              
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium text-sm transition-all"
              >
                <span>LinkedIn Profile</span>
              </a>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
