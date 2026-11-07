"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { IndonesiaFlag, UKFlag } from "@/components/FlagIcons";

export default function LanguageToggle({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const { language, setLanguage, toggleLanguage, t } = useLanguage();

  if (compact) {
    return (
      <button
        type="button"
        onClick={toggleLanguage}
        aria-label={language === "id" ? t.lang.switchToEn : t.lang.switchToId}
        title={language === "id" ? t.lang.switchToEn : t.lang.switchToId}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#FFFFFF] dark:bg-[#292724] border border-[#E8E1D7] dark:border-[#403B34] backdrop-blur-md shadow-sm hover:border-[#B59662]/50 dark:hover:border-[#C6A878]/50 text-[#242321] dark:text-[#F5F1E9] text-xs font-semibold transition-all duration-200 active:scale-95 shrink-0 ${className}`}
      >
        {language === "id" ? (
          <>
            <IndonesiaFlag className="w-3.5 h-2.5 sm:w-4 sm:h-3 rounded-[2px]" />
            <span className="text-[11px] font-bold tracking-wide">ID</span>
          </>
        ) : (
          <>
            <UKFlag className="w-3.5 h-2.5 sm:w-4 sm:h-3 rounded-[2px]" />
            <span className="text-[11px] font-bold tracking-wide">EN</span>
          </>
        )}
      </button>
    );
  }

  return (
    <div
      className={`inline-flex items-center p-1 rounded-full bg-[#FFFFFF]/90 dark:bg-[#292724]/90 border border-[#E8E1D7] dark:border-[#403B34] backdrop-blur-md shadow-sm shrink-0 ${className}`}
      role="group"
      aria-label="Language selector"
    >
      <button
        type="button"
        onClick={() => setLanguage("id")}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
          language === "id"
            ? "bg-gradient-to-r from-[#B59662] to-[#9E8050] dark:from-[#C6A878] dark:to-[#B59662] text-white shadow-sm shadow-[#B59662]/20"
            : "text-[#81776B] dark:text-[#B7ADA0] hover:text-[#242321] dark:hover:text-[#F5F1E9] hover:bg-[#F0EBE3] dark:hover:bg-[#24221F]"
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
            ? "bg-gradient-to-r from-[#B59662] to-[#9E8050] dark:from-[#C6A878] dark:to-[#B59662] text-white shadow-sm shadow-[#B59662]/20"
            : "text-[#81776B] dark:text-[#B7ADA0] hover:text-[#242321] dark:hover:text-[#F5F1E9] hover:bg-[#F0EBE3] dark:hover:bg-[#24221F]"
        }`}
        title="English"
      >
        <UKFlag className="w-4 h-3" />
        <span>ENG</span>
      </button>
    </div>
  );
}
