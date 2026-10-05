"use client";

import { ArrowUp, Github, Linkedin, Instagram } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

export default function Footer() {
  const { t, personalInfo } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-100 dark:bg-[#06080d] border-t border-slate-200 dark:border-slate-800/80 pt-16 pb-12 text-slate-500 dark:text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
            <a href="#home" className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Logo Azzahra Attaqina"
                  fill
                  sizes="32px"
                  className="object-contain"
                />
              </div>
              <span className="font-display font-bold text-lg text-slate-900 dark:text-white">
                {personalInfo.name}
              </span>
            </a>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
              {personalInfo.tagline}
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-600 dark:text-slate-300">
            <a href="#about" className="hover:text-indigo-400 transition-colors">{t.nav.about}</a>
            <a href="#skills" className="hover:text-indigo-400 transition-colors">{t.nav.skills}</a>
            <a href="#projects" className="hover:text-indigo-400 transition-colors">{t.nav.projects}</a>
            <a href="#experience" className="hover:text-indigo-400 transition-colors">{t.nav.experience}</a>
            <a href="#education" className="hover:text-indigo-400 transition-colors">{t.nav.education}</a>
            <a href="#contact" className="hover:text-indigo-400 transition-colors">{t.nav.contact}</a>
          </div>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-indigo-500/50 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-indigo-500/50 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-indigo-500/50 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300 hover:text-white transition-colors"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Azzahra Attaqina. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with Next.js & Tailwind CSS
          </p>
        </div>

      </div>
    </footer>
  );
}
