"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Wrench, Code2, Database, Palette, CheckCircle2, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Skills() {
  const { t, skillCategoriesData } = useLanguage();
  const [activeTab, setActiveTab] = useState<number | "all">("all");

  const categoriesToDisplay =
    activeTab === "all"
      ? skillCategoriesData
      : [skillCategoriesData[activeTab]];

  return (
    <section id="skills" className="py-16 sm:py-24 relative bg-white dark:bg-[#0a0d16] border-y border-slate-200 dark:border-slate-800/60 overflow-hidden scroll-mt-20">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800/60 text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            <Wrench className="w-3.5 h-3.5" />
            <span>{t.skills.sectionTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            {t.skills.sectionTitle}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg">
            {t.skills.subTitle}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-12 px-1">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === "all"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30"
                : " bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            {t.projects.filterAll}
          </button>
          {skillCategoriesData.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === idx
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30"
                  : " bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              {cat.categoryName.split("(")[0].trim()}
            </button>
          ))}
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoriesToDisplay.map((cat, catIdx) => {
            const icons = [Code2, Database, Palette];
            const IconComponent = icons[catIdx % icons.length];

            return (
              <motion.div
                key={cat.categoryName}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                className="glass-panel glass-panel-hover p-6 rounded-3xl border border-slate-200 dark:border-slate-800/80 flex flex-col justify-between"
              >
                <div>
                  {/* Card Title */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800/50 text-indigo-600 dark:text-indigo-400">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">
                      {cat.categoryName}
                    </h3>
                  </div>

                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Badges Grid */}
                  <div className="flex flex-wrap gap-2.5">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-200 backdrop-blur-sm transition-transform hover:scale-105"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer status inside card */}
                <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <span>{cat.skills.length} Competencies</span>
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
