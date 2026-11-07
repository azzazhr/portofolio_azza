"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2, Github, Clock, CheckCircle2, ArrowUpRight, Info, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Project } from "@/types";
import Image from "next/image";

export default function Projects() {
  const { t, projectsData } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(projectsData.map((p) => p.category)))];

  const filteredProjects =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-16 sm:py-24 relative bg-[#F8F6F1] dark:bg-[#24221F] overflow-hidden scroll-mt-20">
      {/* Glow background (subtle gold) */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#B59662]/4 dark:bg-[#C6A878]/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B59662]/10 dark:bg-[#C6A878]/10 border border-[#B59662]/30 dark:border-[#C6A878]/30 text-xs font-semibold uppercase tracking-wider text-[#B59662] dark:text-[#C6A878]">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>{t.projects.sectionTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#242321] dark:text-[#F5F1E9] tracking-tight">
            {t.projects.sectionTitle}
          </h2>
          <p className="text-[#81776B] dark:text-[#B7ADA0] text-base sm:text-lg">
            {t.projects.subTitle}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-12 px-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 min-h-[40px] ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-[#B59662] to-[#9E8050] dark:from-[#C6A878] dark:to-[#B59662] text-white shadow-md shadow-[#B59662]/20"
                  : "bg-[#FFFFFF] dark:bg-[#292724] border border-[#E8E1D7] dark:border-[#403B34] text-[#81776B] dark:text-[#B7ADA0] hover:text-[#242321] dark:hover:text-[#F5F1E9]"
              }`}
            >
              {cat === "All" ? t.projects.filterAll : cat}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="glass-panel glass-panel-hover rounded-3xl overflow-hidden border border-[#E8E1D7] dark:border-[#403B34] flex flex-col group cursor-pointer shadow-sm"
            >
              {/* Image Preview Container */}
              <div className="relative w-full aspect-video overflow-hidden bg-[#F0EBE3] dark:bg-[#1D1C1A]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF] dark:from-[#292724] via-transparent to-transparent opacity-80" />

                {/* Badges on Image */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  {project.isOngoing ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/90 text-slate-950 font-bold text-xs shadow-md">
                      <Clock className="w-3 h-3" />
                      {t.projects.ongoingBadge}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/90 text-slate-950 font-bold text-[11px] shadow-md">
                      <CheckCircle2 className="w-3 h-3" />
                      {t.projects.completedBadge}
                    </span>
                  )}
                </div>

                {/* Quick Info Button */}
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}
                  className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-[#FFFFFF] dark:bg-[#292724] hover:bg-[#B59662] dark:hover:bg-[#C6A878] border border-[#E8E1D7] dark:border-[#403B34] hover:border-[#B59662] text-[#242321] hover:text-white dark:text-[#F5F1E9] dark:hover:text-[#1D1C1A] transition-all shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                  aria-label={t.projects.viewDetails}
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#B59662] dark:text-[#C6A878]">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-display font-bold text-[#242321] dark:text-[#F5F1E9] group-hover:text-[#B59662] dark:group-hover:text-[#C6A878] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[#81776B] dark:text-[#B7ADA0] text-xs font-medium">
                    {project.subtitle}
                  </p>
                  <p className="text-[#81776B]/80 dark:text-[#B7ADA0]/80 text-xs leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-[#F0EBE3] dark:bg-[#1D1C1A] border border-[#E8E1D7] dark:border-[#403B34] text-[11px] font-medium text-[#81776B] dark:text-[#B7ADA0]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 border-t border-[#E8E1D7] dark:border-[#403B34] flex items-center justify-between gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#F0EBE3] dark:bg-[#1D1C1A] hover:bg-[#E8E1D7] dark:hover:bg-[#24221F] border border-[#E8E1D7] dark:border-[#403B34] text-[#242321] dark:text-[#F5F1E9] text-xs font-semibold transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>{t.projects.viewCode}</span>
                  </a>

                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}
                    className="inline-flex items-center justify-center p-2.5 rounded-xl bg-[#B59662]/15 hover:bg-[#B59662] text-[#B59662] dark:text-[#C6A878] hover:text-white dark:hover:text-white border border-[#B59662]/30 transition-colors"
                    aria-label={t.projects.viewDetails}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-[#FFFFFF] dark:bg-[#292724] border border-[#E8E1D7] dark:border-[#403B34] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-[#F0EBE3] dark:bg-[#1D1C1A] border border-[#E8E1D7] dark:border-[#403B34] text-[#81776B] dark:text-[#B7ADA0] hover:text-[#242321] dark:hover:text-[#F5F1E9]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#F0EBE3] dark:bg-[#1D1C1A] border border-[#E8E1D7] dark:border-[#403B34]">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <span className="text-xs uppercase font-semibold tracking-wider text-[#B59662] dark:text-[#C6A878]">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl font-display font-bold text-[#242321] dark:text-[#F5F1E9] mt-1">
                    {selectedProject.title} — {selectedProject.subtitle}
                  </h3>
                  <p className="text-[#81776B] dark:text-[#B7ADA0] text-sm mt-3 leading-relaxed">
                    {selectedProject.longDescription || selectedProject.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-[#81776B] dark:text-[#B7ADA0] uppercase tracking-wider mb-2">
                    {t.projects.technologiesUsed}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg bg-[#B59662]/10 dark:bg-[#C6A878]/10 border border-[#B59662]/30 dark:border-[#C6A878]/30 text-[#B59662] dark:text-[#C6A878] text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8E1D7] dark:border-[#403B34] flex items-center gap-4">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#B59662] hover:bg-[#9E8050] dark:bg-[#C6A878] dark:hover:bg-[#D8BC8C] text-white font-medium text-sm transition-colors shadow-lg shadow-[#B59662]/25"
                  >
                    <Github className="w-4 h-4" />
                    <span>{t.projects.viewGithub}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
