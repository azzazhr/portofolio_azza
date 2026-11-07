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
    <footer className="bg-[#F0EBE3] dark:bg-[#1D1C1A] border-t border-[#E8E1D7] dark:border-[#403B34] pt-16 pb-12 text-[#81776B] dark:text-[#B7ADA0] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
            <a href="#home" className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 shrink-0">
                <Image
                  src="/images/logo(1).jpg"
                  alt="Logo Azzahra Attaqina"
                  fill
                  sizes="32px"
                  className="object-contain"
                />
              </div>
              <span className="font-display font-semibold text-xl tracking-[0.01em] text-[#242321] dark:text-[#F5F1E9]">
                {personalInfo.name}
              </span>
            </a>
            <p className="font-body text-sm leading-[1.75] text-[#81776B] dark:text-[#B7ADA0] max-w-sm">
              {personalInfo.tagline}
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 font-ui text-[11px] sm:text-xs font-semibold tracking-[0.1em] uppercase text-[#81776B] dark:text-[#B7ADA0]">
            <a href="#about" className="hover:text-[#B59662] dark:hover:text-[#C6A878] transition-colors">{t.nav.about}</a>
            <a href="#skills" className="hover:text-[#B59662] dark:hover:text-[#C6A878] transition-colors">{t.nav.skills}</a>
            <a href="#projects" className="hover:text-[#B59662] dark:hover:text-[#C6A878] transition-colors">{t.nav.projects}</a>
            <a href="#experience" className="hover:text-[#B59662] dark:hover:text-[#C6A878] transition-colors">{t.nav.experience}</a>
            <a href="#education" className="hover:text-[#B59662] dark:hover:text-[#C6A878] transition-colors">{t.nav.education}</a>
            <a href="#contact" className="hover:text-[#B59662] dark:hover:text-[#C6A878] transition-colors">{t.nav.contact}</a>
          </div>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#FFFFFF] dark:bg-[#292724] border border-[#E8E1D7] dark:border-[#403B34] text-[#81776B] dark:text-[#B7ADA0] hover:text-[#B59662] dark:hover:text-[#C6A878] hover:border-[#B59662]/50 dark:hover:border-[#C6A878]/50 transition-colors shadow-sm"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#FFFFFF] dark:bg-[#292724] border border-[#E8E1D7] dark:border-[#403B34] text-[#81776B] dark:text-[#B7ADA0] hover:text-[#B59662] dark:hover:text-[#C6A878] hover:border-[#B59662]/50 dark:hover:border-[#C6A878]/50 transition-colors shadow-sm"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#FFFFFF] dark:bg-[#292724] border border-[#E8E1D7] dark:border-[#403B34] text-[#81776B] dark:text-[#B7ADA0] hover:text-[#B59662] dark:hover:text-[#C6A878] hover:border-[#B59662]/50 dark:hover:border-[#C6A878]/50 transition-colors shadow-sm"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-[#B59662]/15 hover:bg-[#B59662] dark:hover:bg-[#C6A878] border border-[#B59662]/30 text-[#B59662] dark:text-[#C6A878] hover:text-white dark:hover:text-[#1D1C1A] transition-colors"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 border-t border-[#E8E1D7] dark:border-[#403B34] flex flex-col sm:flex-row items-center justify-between gap-4 font-ui text-[11px] tracking-[0.04em] text-[#81776B] dark:text-[#B7ADA0]">
          <p>© {new Date().getFullYear()} Azzahra Attaqina. {t.footer.copyright}</p>
          <p className="flex items-center gap-1">
            {t.footer.builtWith}
          </p>
        </div>

      </div>
    </footer>
  );
}
