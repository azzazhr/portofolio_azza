"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2, ExternalLink, Github, Sparkles, Clock, CheckCircle2, ArrowUpRight, Info, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Project } from "@/types";
import Image from "next/image";

export default function Projects() {
  const { t, projectsData } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [animDoneIds, setAnimDoneIds] = useState<number[]>([]);

  const categories = ["All", ...Array.from(new Set(projectsData.map((p) => p.category)))];

  const filteredProjects =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-16 sm:py-24 relative bg-slate-50 dark:bg-[#080b11] overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800/60 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>{t.projects.sectionTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            {t.projects.sectionTitle}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg">
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
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30"
                  : " bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              {cat}
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
              onAnimationComplete={() => setAnimDoneIds((prev) => [...prev, idx])}
              onClick={() => setSelectedProject(project)}
              className="glass-panel glass-panel-hover rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col group cursor-pointer"
            >
              {/* Image Preview Container */}
              <div className="relative w-full aspect-video overflow-hidden bg-slate-100 dark:bg-slate-900">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0d121f] via-transparent to-transparent opacity-80" />

                {/* Badges on Image */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  {project.isOngoing ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/90 text-slate-950 font-bold text-xs shadow-md">
                      <Clock className="w-3 h-3" />
                      Ongoing
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/90 text-slate-950 font-bold text-[11px] shadow-md">
                      <CheckCircle2 className="w-3 h-3" />
                      Completed
                    </span>
                  )}
                </div>

                {/* Quick Info Button */}
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}
                  className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-white dark:bg-slate-900/90 hover:bg-indigo-600 border border-slate-300 dark:border-slate-700 hover:border-indigo-500 text-slate-700 hover:text-white dark:text-white transition-all shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                  aria-label="Detail Info"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-wider font-semibold text-indigo-600 dark:text-indigo-400">
                    {project.category}
                  </span>
                  <h3 className={`text-xl font-display font-bold ${animDoneIds.includes(idx) ? "text-indigo-800 dark:text-indigo-200" : "text-slate-900 dark:text-white"} group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors`}>
                    {project.title}
                  </h3>
                  <p className=" text-slate-600 dark:text-slate-300 text-xs font-medium">
                    {project.subtitle}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-medium text-slate-600 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Code</span>
                  </a>

                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}
                    className="inline-flex items-center justify-center p-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 transition-colors"
                    aria-label="Project Details"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-500/40 dark:bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#0d121f] border border-slate-300 dark:border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <span className="text-xs uppercase font-semibold tracking-wider text-indigo-600 dark:text-indigo-400">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mt-1">
                    {selectedProject.title} — {selectedProject.subtitle}
                  </h3>
                  <p className=" text-slate-600 dark:text-slate-300 text-sm mt-3 leading-relaxed">
                    {selectedProject.longDescription || selectedProject.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Teknologi Yang Penggunaannya Diterapkan:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center gap-4">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors shadow-lg shadow-indigo-600/30"
                  >
                    <Github className="w-4 h-4" />
                    <span>Lihat Repository GitHub</span>
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
