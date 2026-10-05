"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Mode terang" : "Mode gelap"}
      className="p-2.5 rounded-full bg-white border border-slate-300 text-slate-500 hover:text-amber-500 hover:border-amber-400 dark:bg-[#111622]/90 dark:border-slate-700/80 dark:text-slate-300 dark:hover:text-amber-300 dark:hover:border-amber-500/50 backdrop-blur-md shadow-md transition-all duration-200"
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
