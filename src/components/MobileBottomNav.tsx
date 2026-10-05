"use client";

import { useEffect, useState } from "react";
import { Home, User, Wrench, FolderGit2, Briefcase, GraduationCap, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function MobileBottomNav() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState("home");

  // Semua section yang ada di halaman
  const ALL_SECTIONS = ["home", "about", "skills", "projects", "experience", "education", "contact"];

  // 5 item tetap di bottom bar (yang paling sering diakses)
  const items = [
    { id: "home",       label: t.nav.home,     href: "#home",       Icon: Home },
    { id: "about",      label: t.nav.about,    href: "#about",      Icon: User },
    { id: "skills",     label: t.nav.skills,   href: "#skills",     Icon: Wrench },
    { id: "projects",   label: t.nav.projects, href: "#projects",   Icon: FolderGit2 },
    { id: "contact",    label: t.nav.contact,  href: "#contact",    Icon: Mail },
  ];

  // Petakan section "experience" & "education" ke item bottom-bar terdekat
  const sectionMap: Record<string, string> = {
    experience: "projects",
    education:  "contact",
  };

  useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY + window.innerHeight / 3;
      let current = "home";
      for (const id of ALL_SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= pos) current = id;
      }
      setActiveSection(sectionMap[current] ?? current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav
      aria-label="Navigasi bawah mobile"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 dark:border-slate-800/80 bg-white/95 dark:bg-[#0a0e1a]/95 backdrop-blur-xl shadow-[0_-4px_24px_-8px_rgba(0,0,0,0.15)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-5 px-1 pt-1.5 pb-2">
        {items.map(({ id, label, href, Icon }) => {
          const active = activeSection === id;
          return (
            <a
              key={id}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex flex-col items-center justify-center gap-0.5 py-2 px-1 rounded-xl min-h-[56px] transition-all active:scale-95 ${
                active
                  ? "text-indigo-600 dark:text-indigo-300"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              <span
                className={`flex items-center justify-center w-10 h-6 rounded-full transition-all ${
                  active
                    ? "bg-indigo-600/15 dark:bg-indigo-500/20"
                    : "bg-transparent"
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={active ? 2.4 : 2} />
              </span>
              <span
                className={`text-[9px] leading-none truncate max-w-full ${
                  active ? "font-bold" : "font-medium"
                }`}
              >
                {label}
              </span>
              {active && (
                <span className="w-1 h-1 rounded-full bg-indigo-500 mt-0.5" />
              )}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
