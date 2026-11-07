import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Light mode tokens
        lux: {
          bg: "#F8F6F1",
          "bg-secondary": "#F0EBE3",
          surface: "#FFFFFF",
          text: "#242321",
          "text-secondary": "#81776B",
          accent: "#B59662",
          "accent-hover": "#9E8050",
          border: "#E8E1D7",
        },
        // Dark mode tokens
        dark: {
          bg: "#1D1C1A",
          "bg-secondary": "#24221F",
          surface: "#292724",
          text: "#F5F1E9",
          "text-secondary": "#B7ADA0",
          accent: "#C6A878",
          "accent-hover": "#D8BC8C",
          border: "#403B34",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      fontFamily: {
        // Secondary font — clean, modern body copy
        sans: ["'DM Sans'", "var(--font-dm-sans)", "system-ui", "sans-serif"],
        body: ["'DM Sans'", "var(--font-dm-sans)", "system-ui", "sans-serif"],
        // Primary display font — luxury editorial voice
        display: ["'Cormorant Garamond'", "var(--font-cormorant)", "'Playfair Display'", "Georgia", "serif"],
        serif: ["'Cormorant Garamond'", "var(--font-cormorant)", "'Playfair Display'", "Georgia", "serif"],
        // Navigation & interface font
        ui: ["'Manrope'", "var(--font-manrope)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
