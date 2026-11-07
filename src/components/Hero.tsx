"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Code, BarChart3, CheckCircle2, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ProfileSlider from "@/components/ProfileSlider";

export default function Hero() {
  const { t, personalInfo } = useLanguage();

  // Staggered luxury entrance animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  const nameVariants: Variants = {
    hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.05,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] sm:min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24 flex items-center justify-center overflow-hidden bg-[#F8F6F1] dark:bg-[#1D1C1A] scroll-mt-20"
    >
      {/* Ambient background glow objects (subtle luxury champagne gold at 3-5%) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#B59662]/5 dark:bg-[#C6A878]/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[420px] h-[420px] bg-[#9E8050]/4 dark:bg-[#D8BC8C]/4 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[380px] h-[380px] bg-[#C6A878]/4 dark:bg-[#B59662]/4 rounded-full blur-[110px] pointer-events-none -z-10" />

      {/* Decorative Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#81776B10_1px,transparent_1px),linear-gradient(to_bottom,#81776B10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Typography, Narrative & CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col gap-6 text-left"
          >

            {/* Main Typography: Greeting & Grand Name */}
            <div className="space-y-3">

              {/* Elegant Greeting: "Hi, I'm" with champagne hairline accent */}
              <motion.div variants={itemVariants} className="flex items-center gap-3">
                <span className="h-px w-8 sm:w-12 bg-gradient-to-r from-[#B59662] to-transparent dark:from-[#C6A878]" />
                <span className="font-serif italic text-lg sm:text-2xl md:text-3xl text-[#81776B] dark:text-[#B7ADA0] font-normal tracking-wide">
                  {t.hero.headlineHi}
                </span>
              </motion.div>

              {/* Focal Point: AZZAHRA ATTAQINA */}
              <motion.h1
                variants={nameVariants}
                className="font-serif font-semibold text-[2.6rem] leading-[1.08] sm:text-6xl md:text-7xl lg:text-[4.75rem] xl:text-[5.25rem] tracking-tight sm:tracking-[-0.015em] text-[#242321] dark:text-[#F5F1E9]"
              >
                <span className="block sm:inline transition-colors duration-300 hover:text-[#B59662] dark:hover:text-[#D8BC8C]">
                  Azzahra{" "}
                </span>
                <span className="relative inline-block bg-gradient-to-r from-[#B59662] via-[#C6A878] to-[#9E8050] dark:from-[#D8BC8C] dark:via-[#C6A878] dark:to-[#B59662] bg-clip-text text-transparent drop-shadow-sm">
                  Attaqina
                  {/* Subtle underline accent */}
                  <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-[#B59662]/40 via-[#C6A878]/60 to-transparent dark:from-[#C6A878]/40 dark:via-[#D8BC8C]/60 rounded-full pointer-events-none" />
                </span>
              </motion.h1>

              {/* Sub-role banner with refined letter-spacing */}
              <motion.div variants={itemVariants} className="flex items-center gap-3 pt-1">
                <span className="font-sans text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-[#B59662] dark:text-[#C6A878]">
                  {personalInfo.role}
                </span>
                <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#B59662]/50 dark:bg-[#C6A878]/50" />
                <span className="hidden sm:inline-block text-xs font-medium text-[#81776B] dark:text-[#B7ADA0] tracking-wider uppercase">
                  Polinema
                </span>
              </motion.div>

            </div>

            {/* Short Bio */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-[#81776B] dark:text-[#B7ADA0] max-w-2xl font-normal leading-relaxed"
            >
              {personalInfo.bio}
            </motion.p>

            {/* Skill tags quick highlight */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2.5 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FFFFFF] dark:bg-[#292724] border border-[#B59662]/30 dark:border-[#C6A878]/30 text-xs font-medium text-[#B59662] dark:text-[#C6A878] shadow-sm transition-transform hover:scale-105">
                <Code className="w-3.5 h-3.5 text-[#B59662] dark:text-[#C6A878]" />
                {t.hero.webDevTag}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FFFFFF] dark:bg-[#292724] border border-[#B59662]/30 dark:border-[#C6A878]/30 text-xs font-medium text-[#B59662] dark:text-[#C6A878] shadow-sm transition-transform hover:scale-105">
                <BarChart3 className="w-3.5 h-3.5 text-[#B59662] dark:text-[#C6A878]" />
                {t.hero.dataAnalyticsTag}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FFFFFF] dark:bg-[#292724] border border-[#B59662]/30 dark:border-[#C6A878]/30 text-xs font-medium text-[#B59662] dark:text-[#C6A878] shadow-sm transition-transform hover:scale-105">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B59662] dark:text-[#C6A878]" />
                BNSP 2025
              </span>
            </motion.div>

            {/* CTAs & Social Links */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-3">
              <a
                href="#projects"
                className="px-8 py-3.5 min-h-[48px] rounded-full bg-gradient-to-r from-[#B59662] to-[#9E8050] hover:from-[#9E8050] hover:to-[#B59662] dark:from-[#C6A878] dark:to-[#B59662] dark:hover:from-[#D8BC8C] dark:hover:to-[#C6A878] text-white font-semibold text-base transition-all duration-300 shadow-lg shadow-[#B59662]/25 hover:shadow-[#B59662]/40 hover:-translate-y-0.5 text-center flex items-center justify-center gap-2 group"
              >
                <span>{t.hero.viewProjects}</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="px-8 py-3.5 min-h-[48px] rounded-full bg-[#FFFFFF] dark:bg-[#292724] hover:bg-[#F0EBE3] dark:hover:bg-[#24221F] border border-[#E8E1D7] dark:border-[#403B34] hover:border-[#B59662]/50 dark:hover:border-[#C6A878]/50 text-[#242321] dark:text-[#F5F1E9] font-semibold text-base transition-all duration-300 text-center flex items-center justify-center shadow-sm"
              >
                {t.hero.contactMe}
              </a>
            </motion.div>

            {/* Social Media Links */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 pt-2">
              <span className="text-xs uppercase tracking-wider text-[#81776B] dark:text-[#B7ADA0] font-semibold">{t.hero.connect}</span>
              <div className="flex items-center gap-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#FFFFFF] dark:bg-[#292724] border border-[#E8E1D7] dark:border-[#403B34] text-[#81776B] dark:text-[#B7ADA0] hover:text-[#B59662] dark:hover:text-[#C6A878] hover:border-[#B59662]/50 dark:hover:border-[#C6A878]/50 hover:bg-[#F0EBE3] dark:hover:bg-[#24221F] transition-all shadow-sm"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#FFFFFF] dark:bg-[#292724] border border-[#E8E1D7] dark:border-[#403B34] text-[#81776B] dark:text-[#B7ADA0] hover:text-[#B59662] dark:hover:text-[#C6A878] hover:border-[#B59662]/50 dark:hover:border-[#C6A878]/50 hover:bg-[#F0EBE3] dark:hover:bg-[#24221F] transition-all shadow-sm"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-2.5 rounded-xl bg-[#FFFFFF] dark:bg-[#292724] border border-[#E8E1D7] dark:border-[#403B34] text-[#81776B] dark:text-[#B7ADA0] hover:text-[#B59662] dark:hover:text-[#C6A878] hover:border-[#B59662]/50 dark:hover:border-[#C6A878]/50 hover:bg-[#F0EBE3] dark:hover:bg-[#24221F] transition-all shadow-sm"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5 text-[#B59662] dark:text-[#C6A878]" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Visual Card / Profile Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center relative"
          >
            {/* Outer Glow Halo */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#B59662]/15 to-[#C6A878]/10 rounded-3xl blur-2xl transform rotate-3 scale-95 pointer-events-none" />

            {/* Premium Card Frame */}
            <div className="relative w-full max-w-sm sm:max-w-md glass-panel p-4 sm:p-6 rounded-3xl border border-[#E8E1D7] dark:border-[#403B34] shadow-xl space-y-5 sm:space-y-6">

              {/* Profile Image & Avatar Showcase */}
              <div className="relative w-full aspect-[4/5] sm:aspect-[2/3] rounded-2xl overflow-hidden border border-[#B59662]/20 dark:border-[#C6A878]/20 bg-[#F0EBE3] dark:bg-[#1D1C1A]">
                <ProfileSlider
                  alt={personalInfo.name}
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
              </div>

              {/* Name Caption with Luxury Serif */}
              <div className="text-center pt-1">
                <p className="font-serif font-bold text-lg tracking-[0.18em] text-[#242321] dark:text-[#F5F1E9] uppercase">
                  Azzahra Attaqina
                </p>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="h-px w-6 bg-[#B59662]/40 dark:bg-[#C6A878]/40" />
                  <Sparkles className="w-3 h-3 text-[#B59662] dark:text-[#C6A878]" />
                  <span className="h-px w-6 bg-[#B59662]/40 dark:bg-[#C6A878]/40" />
                </div>
              </div>

              {/* Mini Highlights Grid */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-[#F0EBE3]/60 dark:bg-[#24221F] border border-[#E8E1D7] dark:border-[#403B34] flex flex-col">
                  <span className="text-xs text-[#81776B] dark:text-[#B7ADA0] font-medium">{t.hero.focusMajor}</span>
                  <span className="text-sm font-semibold text-[#242321] dark:text-[#F5F1E9]">{t.hero.focusMajorDesc}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F0EBE3]/60 dark:bg-[#24221F] border border-[#E8E1D7] dark:border-[#403B34] flex flex-col">
                  <span className="text-xs text-[#81776B] dark:text-[#B7ADA0] font-medium">{t.hero.certBadge}</span>
                  <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
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