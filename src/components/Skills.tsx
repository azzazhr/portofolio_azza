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
    <section id="skills" className="py-16 sm:py-24 relative bg-[#FFFFFF] dark:bg-[#1D1C1A] border-y border-[#E8E1D7] dark:border-[#403B34] overflow-hidden scroll-mt-20">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[#B59662]/4 dark:bg-[#C6A878]/4 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B59662]/10 dark:bg-[#C6A878]/10 border border-[#B59662]/30 dark:border-[#C6A878]/30 text-xs font-semibold uppercase tracking-wider text-[#B59662] dark:text-[#C6A878]">
            <Wrench className="w-3.5 h-3.5" />
            <span>{t.skills.sectionTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#242321] dark:text-[#F5F1E9] tracking-tight">
            {t.skills.sectionTitle}
          </h2>
          <p className="text-[#81776B] dark:text-[#B7ADA0] text-base sm:text-lg">
            {t.skills.subTitle}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-12 px-1">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === "all"
                ? "bg-gradient-to-r from-[#B59662] to-[#9E8050] dark:from-[#C6A878] dark:to-[#B59662] text-white shadow-md shadow-[#B59662]/20"
                : "bg-[#F0EBE3] dark:bg-[#292724] border border-[#E8E1D7] dark:border-[#403B34] text-[#81776B] dark:text-[#B7ADA0] hover:text-[#242321] dark:hover:text-[#F5F1E9]"
            }`}
          >
            {t.skills.filterAll}
          </button>
          {skillCategoriesData.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === idx
                  ? "bg-gradient-to-r from-[#B59662] to-[#9E8050] dark:from-[#C6A878] dark:to-[#B59662] text-white shadow-md shadow-[#B59662]/20"
                  : "bg-[#F0EBE3] dark:bg-[#292724] border border-[#E8E1D7] dark:border-[#403B34] text-[#81776B] dark:text-[#B7ADA0] hover:text-[#242321] dark:hover:text-[#F5F1E9]"
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
                className="glass-panel glass-panel-hover p-6 rounded-3xl border border-[#E8E1D7] dark:border-[#403B34] flex flex-col justify-between"
              >
                <div>
                  {/* Card Title */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 rounded-2xl bg-[#B59662]/10 dark:bg-[#C6A878]/10 border border-[#B59662]/30 dark:border-[#C6A878]/30 text-[#B59662] dark:text-[#C6A878]">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-[#242321] dark:text-[#F5F1E9]">
                      {cat.categoryName}
                    </h3>
                  </div>

                  <p className="text-[#81776B] dark:text-[#B7ADA0] text-sm mb-6 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Badges Grid */}
                  <div className="flex flex-wrap gap-2.5">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#F0EBE3] dark:bg-[#24221F] border border-[#E8E1D7] dark:border-[#403B34] text-[#242321] dark:text-[#F5F1E9] backdrop-blur-sm transition-transform hover:scale-105"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B59662] dark:text-[#C6A878]" />
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer status inside card */}
                <div className="mt-8 pt-4 border-t border-[#E8E1D7] dark:border-[#403B34] flex items-center justify-between text-xs text-[#81776B] dark:text-[#B7ADA0] font-medium">
                  <span>{cat.skills.length} {t.skills.competencies}</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#B59662] dark:text-[#C6A878]" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
