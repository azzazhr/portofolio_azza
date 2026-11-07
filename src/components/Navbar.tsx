"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Home, User, Code2, FolderGit2, Briefcase, GraduationCap, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mounted, setMounted] = useState(false);
  const { t, personalInfo } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { id: "home", name: t.nav.home, href: "#home", Icon: Home },
    { id: "about", name: t.nav.about, href: "#about", Icon: User },
    { id: "skills", name: t.nav.skills, href: "#skills", Icon: Code2 },
    { id: "projects", name: t.nav.projects, href: "#projects", Icon: FolderGit2 },
    { id: "experience", name: t.nav.experience, href: "#experience", Icon: Briefcase },
    { id: "education", name: t.nav.education, href: "#education", Icon: GraduationCap },
    { id: "contact", name: t.nav.contact, href: "#contact", Icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((link) => link.id);
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Kunci scroll body saat drawer mobile terbuka + tutup saat resize ke desktop
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", onResize);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 transition-all duration-300 ${mobileMenuOpen ? "z-[85]" : "z-40"
          } ${scrolled
            ? "bg-[#F8F6F1]/90 dark:bg-[#1D1C1A]/90 backdrop-blur-md border-b border-[#E8E1D7] dark:border-[#403B34] py-2.5 sm:py-3 shadow-md shadow-[#242321]/5 dark:shadow-black/20"
            : "bg-transparent py-3 sm:py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2">

            {/* Left: Logo — hidden on mobile when drawer is open */}
            <div className={`flex items-center min-w-0 transition-opacity duration-200 ${mobileMenuOpen ? "opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto" : "opacity-100"}`}>
              <a
                href="#home"
                className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer min-w-0"
              >
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/images/logo(1).jpg"
                    alt="Logo Azzahra Attaqina"
                    fill
                    sizes="(max-width: 640px) 32px, 40px"
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-display font-semibold text-base sm:text-lg lg:text-xl text-[#242321] dark:text-[#F5F1E9] tracking-[0.01em] truncate group-hover:text-[#B59662] dark:group-hover:text-[#C6A878] transition-colors">
                    {personalInfo.name}
                  </span>
                  <span className="font-ui text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-[#81776B] dark:text-[#B7ADA0] font-semibold truncate -mt-0.5 sm:-mt-1">
                    {t.nav.portfolioSubtitle}
                  </span>
                </div>
              </a>
            </div>

            {/* Center: Desktop Nav Items */}
            <div className="hidden lg:flex shrink-0 overflow-hidden flex-1 justify-center">
              <nav className="flex items-center gap-0.5 bg-[#FFFFFF]/80 dark:bg-[#292724]/80 border border-[#E8E1D7] dark:border-[#403B34] rounded-full px-2.5 py-1 backdrop-blur-md shadow-inner">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      className={`px-2.5 py-1.5 font-ui text-[11px] xl:text-xs font-semibold tracking-[0.04em] rounded-full transition-all duration-200 relative whitespace-nowrap ${isActive
                          ? "text-white font-semibold"
                          : "text-[#81776B] dark:text-[#B7ADA0] hover:text-[#242321] dark:hover:text-[#F5F1E9] hover:bg-[#F0EBE3] dark:hover:bg-[#24221F]/60"
                        }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNavBackground"
                          className="absolute inset-0 bg-gradient-to-r from-[#B59662] to-[#9E8050] dark:from-[#C6A878] dark:to-[#B59662] rounded-full -z-10 shadow-sm shadow-[#B59662]/25"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      {link.name}
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Right: Actions */}
            <div className="flex shrink-0 items-center justify-end">

              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center gap-2">
                <ThemeToggle />
                <LanguageToggle />
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 px-4 xl:px-5 py-2 rounded-full bg-gradient-to-r from-[#B59662] to-[#9E8050] hover:from-[#9E8050] hover:to-[#B59662] dark:from-[#C6A878] dark:to-[#B59662] dark:hover:from-[#D8BC8C] dark:hover:to-[#C6A878] text-white font-ui font-semibold text-[11px] xl:text-xs tracking-[0.05em] transition-all duration-300 shadow-md shadow-[#B59662]/25 hover:shadow-lg hover:shadow-[#B59662]/40 hover:-translate-y-0.5 active:translate-y-0 shrink-0 whitespace-nowrap"
                >
                  <span>{t.nav.letsTalk}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Mobile Actions */}
              <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
                <ThemeToggle />
                <LanguageToggle compact />
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 sm:p-2.5 rounded-full bg-[#FFFFFF] dark:bg-[#292724] border border-[#E8E1D7] dark:border-[#403B34] text-[#242321] dark:text-[#F5F1E9] hover:text-[#B59662] dark:hover:text-[#C6A878] hover:border-[#B59662] dark:hover:border-[#C6A878] focus:outline-none transition-all duration-200 active:scale-95 flex items-center justify-center shrink-0 shadow-sm"
                  aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu — dirender via Portal ke document.body agar tidak terkungkung oleh backdrop-blur header */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <div className="lg:hidden">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
                  onClick={() => setMobileMenuOpen(false)}
                />

                {/* Drawer panel — slides in from right */}
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 350, damping: 35 }}
                  className="fixed top-0 right-0 bottom-0 z-[90] w-[85vw] max-w-xs h-screen h-[100dvh] bg-[#FFFFFF] dark:bg-[#1D1C1A] border-l border-[#E8E1D7] dark:border-[#403B34] flex flex-col shadow-2xl overflow-hidden"
                >
                  {/* Drawer Header */}
                  <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#E8E1D7] dark:border-[#403B34] shrink-0">
                    <a href="#home" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5 min-w-0">
                      <div className="relative w-8 h-8 shrink-0">
                        <Image src="/images/logo(1).jpg" alt="Logo" fill sizes="32px" className="object-contain" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-display font-semibold text-base text-[#242321] dark:text-[#F5F1E9] leading-tight tracking-[0.01em] truncate">
                          {personalInfo.name}
                        </span>
                        <span className="font-ui text-[9px] uppercase tracking-[0.22em] text-[#81776B] dark:text-[#B7ADA0] font-semibold">{t.nav.portfolioSubtitle}</span>
                      </div>
                    </a>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-1.5 sm:p-2 rounded-xl bg-[#F0EBE3] dark:bg-[#292724] border border-[#E8E1D7] dark:border-[#403B34] text-[#81776B] dark:text-[#B7ADA0] hover:text-[#242321] dark:hover:text-[#F5F1E9] transition-colors shrink-0 ml-2"
                      aria-label={t.nav.closeMenu}
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>

                  {/* Nav Links */}
                  <div className="flex flex-col gap-1 px-3 py-3 flex-1 overflow-y-auto overscroll-contain">
                    {navLinks.map(({ id, name, href, Icon }) => {
                      const isActive = activeSection === id;
                      return (
                        <a
                          key={id}
                          href={href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-3.5 py-3 rounded-xl font-ui text-sm font-medium tracking-[0.01em] transition-all ${isActive
                              ? "bg-[#B59662]/15 dark:bg-[#C6A878]/15 text-[#B59662] dark:text-[#C6A878] font-semibold"
                              : "text-[#81776B] dark:text-[#B7ADA0] hover:bg-[#F0EBE3] dark:hover:bg-[#292724] hover:text-[#242321] dark:hover:text-[#F5F1E9]"
                            }`}
                        >
                          <span className={`p-1.5 rounded-lg ${isActive ? "bg-[#B59662]/20 dark:bg-[#C6A878]/20 text-[#B59662] dark:text-[#C6A878]" : "bg-[#F0EBE3] dark:bg-[#292724] text-[#81776B] dark:text-[#B7ADA0]"}`}>
                            <Icon className="w-4 h-4" strokeWidth={isActive ? 2.4 : 2} />
                          </span>
                          <span className="truncate">{name}</span>
                          {isActive && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#B59662] dark:bg-[#C6A878] shrink-0" />
                          )}
                        </a>
                      );
                    })}
                  </div>

                  {/* Drawer Footer */}
                  <div className="px-4 py-4 border-t border-[#E8E1D7] dark:border-[#403B34] space-y-3.5 bg-[#F8F6F1] dark:bg-[#24221F] shrink-0">
                    {/* Theme + Language */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <LanguageToggle />
                      </div>
                    </div>

                    {/* CTA Button */}
                    <a
                      href="#contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#B59662] to-[#9E8050] hover:from-[#9E8050] hover:to-[#B59662] dark:from-[#C6A878] dark:to-[#B59662] text-white font-ui font-semibold text-sm tracking-[0.04em] shadow-md shadow-[#B59662]/25 active:scale-[0.98] transition-all"
                    >
                      <span>{t.nav.letsTalk}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
