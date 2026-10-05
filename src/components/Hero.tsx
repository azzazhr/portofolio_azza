"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Instagram, Mail, Code, BarChart3, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

export default function Hero() {
  const { t, personalInfo } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20 flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-100 dark:from-[#080b11] via-white dark:via-[#0d121f] to-slate-100 dark:to-[#080b11] scroll-mt-20"
    >
      {/* Ambient background glow objects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Decorative Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col gap-6 text-left"
          >

            {/* Big Headline */}
            <div className="space-y-2">
              <h1 className="text-[2rem] leading-[1.15] sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white sm:leading-[1.1]">
                {t.hero.headlineHi}{" "}
                <span className="bg-gradient-to-r from-indigo-500 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Azzahra Attaqina
                </span>
              </h1>
            </div>

            {/* Short Bio */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed">
              {personalInfo.bio}
            </p>

            {/* Skill tags quick highlight */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-100 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/50 text-xs font-medium text-indigo-700 dark:text-indigo-300">
                <Code className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                {t.hero.webDevTag}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/50 text-xs font-medium text-purple-700 dark:text-purple-300">
                <BarChart3 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                {t.hero.dataAnalyticsTag}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/50 text-xs font-medium text-cyan-700 dark:text-cyan-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                BNSP 2025
              </span>
            </div>

            {/* CTAs & Social Links */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-4">
              <a
                href="#projects"
                className="px-7 py-3.5 min-h-[48px] rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-base transition-all duration-300 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 text-center flex items-center justify-center gap-2 group"
              >
                <span>{t.hero.viewProjects}</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="px-7 py-3.5 min-h-[48px] rounded-full bg-white dark:bg-slate-900/90 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-semibold text-base transition-all duration-300 text-center flex items-center justify-center"
              >
                {t.hero.contactMe}
              </a>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs uppercase tracking-wider text-slate-600 dark:text-slate-300 font-semibold">{t.hero.connect}</span>
              <div className="flex items-center gap-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-indigo-500/50 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-indigo-500/50 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-sky-400" />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-indigo-500/50 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Card / Profile Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center relative"
          >
            {/* Outer Glow Halo */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/30 to-purple-600/30 rounded-3xl blur-2xl transform rotate-3 scale-95" />

            {/* Premium Card Frame */}
            <div className="relative w-full max-w-sm sm:max-w-md glass-panel p-4 sm:p-6 rounded-3xl border border-slate-300 dark:border-slate-700/60 shadow-2xl space-y-5 sm:space-y-6">
              
              {/* Profile Image & Avatar Showcase */}
              <div className="relative w-full aspect-[4/5] sm:aspect-[2/3] rounded-2xl overflow-hidden border border-indigo-500/20 bg-slate-100 dark:bg-slate-900 group">
                <Image
                  src="/images/profile.jpg"
                  alt={personalInfo.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                  priority
                />

              </div>

              {/* Name Caption */}
              <p className="font-display font-extrabold text-lg tracking-[0.2em] text-center text-slate-900 dark:text-white pt-1">
                AZZAHRA ATTAQINA
              </p>

              {/* Mini Highlights Grid */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex flex-col">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t.hero.focusMajor}</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">{t.hero.focusMajorDesc}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex flex-col">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t.hero.certBadge}</span>
                  <span className="text-sm font-semibold text-emerald-400 flex items-center gap-1">
                    {t.hero.certBadgeDesc}
                  </span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
