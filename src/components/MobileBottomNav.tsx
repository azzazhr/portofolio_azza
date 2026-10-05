"use client";

import { useEffect, useState } from "react";
import { Home, User, Wrench, FolderGit2, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function MobileBottomNav() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState("home");

  const items = [
    { id: "home", label: t.nav.home, href: "#home", Icon: Home },
    { id: "about", label: t.nav.about, href: "#about", Icon: User },
    { id: "skills", label: t.nav.skills, href: "#skills", Icon: Wrench },
    { id: "projects", label: t.nav.projects, href: "#projects", Icon: FolderGit2 },
    { id: "contact", label: t.nav.contact, href: "#contact", Icon: Mail },
  ];

  useEffect(() => {
    const ids = ["home", "about", "skills", "projects", "experience", "education", "contact"];
    const onScroll = () => {
      const pos = window.scrollY + window.innerHeight / 3;
      let current = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= pos) current = id;
      }
      // Petakan experience/education ke projects/contact agar indikator tetap relevan
      if (current === "experience") current = "projects";
      if (current === "education") current = "contact";
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Navigasi bawah mobile"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 dark:border-slate-800/80 bg-white/92 dark:bg-[#0a0e1a]/92 backdrop-blur-xl"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="grid grid-cols-5 px-1 pt-1.5 pb-2">
        {items.map(({ id, label, href, Icon }) => {
          const active = activeSection === id;
          return (
            <a
              key={id}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-xl min-h-[56px] transition-colors active:scale-95 ${
                active
                  ? "text-indigo-600 dark:text-indigo-300"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              <span
                className={`flex items-center justify-center w-11 h-7 rounded-full transition-all ${
                  active
                    ? "bg-indigo-600/15 dark:bg-indigo-500/20"
                    : "bg-transparent"
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={active ? 2.4 : 2} />
              </span>
              <span
                className={`text-[10px] leading-none truncate max-w-full ${
                  active ? "font-bold" : "font-medium"
                }`}
              >
                {label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
