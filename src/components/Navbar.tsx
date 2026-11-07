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
    { id: "home",       name: t.nav.home,       href: "#home",       Icon: Home },
    { id: "about",      name: t.nav.about,      href: "#about",      Icon: User },
    { id: "skills",     name: t.nav.skills,     href: "#skills",     Icon: Code2 },
    { id: "projects",   name: t.nav.projects,   href: "#projects",   Icon: FolderGit2 },
    { id: "experience", name: t.nav.experience, href: "#experience", Icon: Briefcase },
    { id: "education",  name: t.nav.education,  href: "#education",  Icon: GraduationCap },
    { id: "contact",    name: t.nav.contact,    href: "#contact",    Icon: Mail },
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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 dark:bg-[#080b11]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 py-2.5 sm:py-3 shadow-lg shadow-indigo-950/5 dark:shadow-indigo-950/25"
            : "bg-transparent py-3 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2">
            
            {/* Left: Logo */}
            <div className="flex items-center min-w-0">
              <a
                href="#home"
                className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer min-w-0"
              >
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/images/logo.png"
                    alt="Logo Azzahra Attaqina"
                    fill
                    sizes="(max-width: 640px) 32px, 40px"
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-display font-bold text-sm sm:text-base lg:text-lg text-slate-900 dark:text-white tracking-tight truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {personalInfo.name}
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium truncate -mt-0.5 sm:-mt-1">
                    Portofolio
                  </span>
                </div>
              </a>
            </div>

            {/* Center: Desktop Nav Items */}
            <div className="hidden lg:flex shrink-0 overflow-hidden flex-1 justify-center">
              <nav className="flex items-center gap-0.5 bg-white/70 dark:bg-[#111622]/60 border border-slate-200 dark:border-slate-800/80 rounded-full px-2.5 py-1 backdrop-blur-md shadow-inner">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      className={`px-2.5 py-1.5 text-[11px] xl:text-xs font-medium rounded-full transition-all duration-200 relative whitespace-nowrap ${
                        isActive
                          ? "text-slate-900 dark:text-white font-semibold"
                          : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800/40"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNavBackground"
                          className="absolute inset-0 bg-gradient-to-r from-indigo-600/80 to-purple-600/80 rounded-full -z-10 shadow-sm shadow-indigo-500/30"
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
                  className="inline-flex items-center gap-1.5 px-4 xl:px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-[11px] xl:text-xs transition-all duration-300 shadow-md shadow-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 shrink-0 whitespace-nowrap"
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
                  className="p-2 sm:p-2.5 rounded-full bg-white dark:bg-[#111622]/90 border border-slate-300 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-indigo-400 dark:hover:border-indigo-500 focus:outline-none transition-all duration-200 active:scale-95 flex items-center justify-center shrink-0 shadow-sm"
                  aria-label={mobileMenuOpen ? "Tutup Menu" : "Buka Menu"}
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
                  className="fixed inset-0 z-[80] bg-slate-950/60 backdrop-blur-sm"
                  onClick={() => setMobileMenuOpen(false)}
                />

                {/* Drawer panel — slides in from right */}
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 350, damping: 35 }}
                  className="fixed top-0 right-0 bottom-0 z-[90] w-[85vw] max-w-xs h-screen h-[100dvh] bg-white dark:bg-[#0a0e1a] border-l border-slate-200 dark:border-slate-800 flex flex-col shadow-2xl overflow-hidden"
                >
                  {/* Drawer Header */}
                  <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 shrink-0">
                    <a href="#home" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5 min-w-0">
                      <div className="relative w-8 h-8 shrink-0">
                        <Image src="/images/logo.png" alt="Logo" fill sizes="32px" className="object-contain" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-display font-bold text-sm text-slate-900 dark:text-white leading-tight truncate">
                          {personalInfo.name}
                        </span>
                        <span className="text-[9px] uppercase tracking-wider text-slate-400 font-medium">Portofolio</span>
                      </div>
                    </a>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-1.5 sm:p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors shrink-0 ml-2"
                      aria-label="Tutup Menu"
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
                          className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                            isActive
                              ? "bg-indigo-600/15 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-semibold"
                              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white"
                          }`}
                        >
                          <span className={`p-1.5 rounded-lg ${isActive ? "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"}`}>
                            <Icon className="w-4 h-4" strokeWidth={isActive ? 2.4 : 2} />
                          </span>
                          <span className="truncate">{name}</span>
                          {isActive && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                          )}
                        </a>
                      );
                    })}
                  </div>

                  {/* Drawer Footer */}
                  <div className="px-4 py-4 border-t border-slate-200 dark:border-slate-800 space-y-3.5 bg-slate-50/60 dark:bg-slate-900/40 shrink-0">
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
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-md shadow-indigo-500/25 active:scale-[0.98] transition-all"
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
