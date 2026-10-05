"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { IndonesiaFlag, UKFlag } from "@/components/FlagIcons";

export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`inline-flex items-center p-1 rounded-full bg-white/90 dark:bg-[#111622]/90 border border-slate-300 dark:border-slate-700/80 backdrop-blur-md shadow-md ${className}`}
      role="group"
      aria-label="Language selector"
    >
      <button
        type="button"
        onClick={() => setLanguage("id")}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
          language === "id"
            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm shadow-indigo-500/30"
            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800/50"
        }`}
        title="Bahasa Indonesia"
      >
        <IndonesiaFlag className="w-4 h-3" />
        <span>IND</span>
      </button>

      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
          language === "en"
            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm shadow-indigo-500/30"
            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800/50"
        }`}
        title="English"
      >
        <UKFlag className="w-4 h-3" />
        <span>ENG</span>
      </button>
    </div>
  );
}
