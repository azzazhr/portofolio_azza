"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t.theme.switchToLight : t.theme.switchToDark}
      title={isDark ? t.theme.light : t.theme.dark}
      className={`p-2 sm:p-2.5 rounded-full bg-[#FFFFFF] dark:bg-[#292724] border border-[#E8E1D7] dark:border-[#403B34] text-[#81776B] dark:text-[#B7ADA0] hover:text-[#B59662] dark:hover:text-[#C6A878] hover:border-[#B59662]/50 dark:hover:border-[#C6A878]/50 backdrop-blur-md shadow-sm transition-all duration-200 active:scale-95 flex items-center justify-center shrink-0 ${className}`}
    >
      {isDark ? <Sun className="w-4 h-4 text-[#C6A878]" /> : <Moon className="w-4 h-4 text-[#81776B]" />}
    </button>
  );
}
