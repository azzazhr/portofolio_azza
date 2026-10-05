"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export default function FloatingWhatsApp() {
  const { personalInfo } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={`https://wa.me/${personalInfo.whatsapp}?text=${encodeURIComponent(personalInfo.whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat WhatsApp"
          title="Chat WhatsApp"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="group fixed bottom-[88px] md:bottom-6 right-4 md:right-6 z-40 flex items-center gap-0 rounded-full bg-green-500 hover:bg-green-400 text-white shadow-xl shadow-green-600/30 hover:shadow-green-500/50 transition-colors"
        >
          {/* Ping animasi */}
          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20 pointer-events-none" />
          <span className="hidden sm:block max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[140px] group-hover:ml-4">
            Chat WhatsApp
          </span>
          <span className="p-3.5 md:p-4 min-w-[52px] min-h-[52px] flex items-center justify-center">
            <WhatsAppIcon className="w-6 h-6" />
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
