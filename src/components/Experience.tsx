"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, Award, Building2, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Experience() {
  const { t, experienceData } = useLanguage();

  return (
    <section id="experience" className="py-16 sm:py-24 relative bg-white dark:bg-[#0a0d16] border-t border-slate-200 dark:border-slate-800/60 overflow-hidden scroll-mt-20">
      {/* Glow background */}
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800/60 text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{t.experience.sectionTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            {t.experience.sectionTitle}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg">
            {t.experience.subTitle}
          </p>
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto relative">
          
          {/* Vertical Glowing Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-500 transform -translate-x-1/2 rounded-full opacity-40" />

          <div className="space-y-12">
            {experienceData.map((exp, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  
                  {/* Circle Badge on Center Line */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-9 h-9 rounded-full bg-white dark:bg-[#0d121f] border-2 border-indigo-500 flex items-center justify-center text-indigo-600 dark:text-indigo-400 z-10 shadow-lg shadow-indigo-500/30">
                    <Briefcase className="w-4 h-4" />
                  </div>

                  {/* Content Card Container */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${isEven ? "md:pl-10" : "md:pr-10"} w-full`}>
                    <div className="glass-panel glass-panel-hover p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
                      
                      {/* Top Header */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
                            <Calendar className="w-3 h-3" />
                            {exp.period}
                          </span>
                          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                            {exp.type}
                          </span>
                        </div>

                        <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white pt-2">
                          {exp.position}
                        </h3>

                        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>{exp.organization}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className=" text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Tech Chips */}
                      {exp.technologies && (
                        <div className="pt-2 flex flex-wrap gap-1.5">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
