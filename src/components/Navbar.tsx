"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { t, personalInfo } = useLanguage();

  const navLinks = [
    { id: "home", name: t.nav.home, href: "#home" },
    { id: "about", name: t.nav.about, href: "#about" },
    { id: "skills", name: t.nav.skills, href: "#skills" },
    { id: "projects", name: t.nav.projects, href: "#projects" },
    { id: "experience", name: t.nav.experience, href: "#experience" },
    { id: "education", name: t.nav.education, href: "#education" },
    { id: "contact", name: t.nav.contact, href: "#contact" },
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
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", onResize);
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? " bg-white/85 dark:bg-[#080b11]/85 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 py-3 shadow-lg shadow-indigo-950/20"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 xl:gap-8">
          
          {/* Left: Logo */}
          <div className="flex xl:flex-1 justify-start shrink-0">
            <a
              href="#home"
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <div className="relative w-10 h-10 shrink-0 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/logo.png"
                  alt="Logo Azzahra Attaqina"
                  fill
                  sizes="40px"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-slate-900 dark:text-white tracking-tight whitespace-nowrap group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                  {personalInfo.name}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap -mt-1">
                  Portofolio
                </span>
              </div>
            </a>
          </div>

          {/* Center: Desktop Nav Items */}
          <div className="hidden lg:flex shrink-0 overflow-hidden">
            <nav className="flex items-center gap-1 bg-white/70 dark:bg-[#111622]/60 border border-slate-200 dark:border-slate-800/80 rounded-full px-4 py-1.5 backdrop-blur-md shadow-inner">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    className={`px-3 py-1.5 text-xs lg:text-sm font-medium rounded-full transition-all duration-200 relative whitespace-nowrap ${
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
          <div className="flex xl:flex-1 justify-end shrink-0">
            
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <LanguageToggle />
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-xs lg:text-sm transition-all duration-300 shadow-md shadow-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 shrink-0 whitespace-nowrap"
              >
                <span>{t.nav.letsTalk}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <LanguageToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white focus:outline-none"
                aria-label="Toggle Menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 dark:bg-[#0a0e1a]/95 border-b border-slate-200 dark:border-slate-800 backdrop-blur-xl px-4 pt-3 pb-6 overflow-y-auto max-h-[calc(100dvh-64px)]"
          >
            <div className="flex flex-col gap-2 mt-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3.5 min-h-[52px] rounded-xl text-base font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800/60 transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-50" />
                </a>
              ))}
              <div className="pt-3 mt-2 border-t border-slate-200 dark:border-slate-800">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium text-center shadow-lg shadow-indigo-500/20"
                >
                  <span>{t.nav.letsTalk}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
