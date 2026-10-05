"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Award,
  CheckCircle2,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Expand,
  ImageOff,
} from "lucide-react";
import { CertificationItem } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  cert: CertificationItem | null;
  onClose: () => void;
  initialIndex?: number;
}

export default function CertificateModal({ cert, onClose, initialIndex = 0 }: Props) {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const overlayRef = useRef<HTMLDivElement>(null);

  const images: string[] = cert
    ? cert.images && cert.images.length > 0
      ? cert.images
      : cert.image
        ? [cert.image]
        : []
    : [];

  const hasSlider = images.length > 0;

  // Reset index setiap modal dibuka / cert berganti + scroll ke atas + reset error gambar
  useEffect(() => {
    const safeIndex =
      images.length > 0
        ? Math.min(Math.max(initialIndex, 0), images.length - 1)
        : 0;
    setActiveIndex(safeIndex);
    setIsFullscreen(false);
    setFailedImages(new Set());
    // Pastikan overlay scroll ke paling atas agar tombol X selalu terlihat
    overlayRef.current?.scrollTo({ top: 0 });
  }, [cert, initialIndex]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handleImageError = useCallback((src: string) => {
    setFailedImages((prev) => {
      if (prev.has(src)) return prev;
      const next = new Set(prev);
      next.add(src);
      return next;
    });
  }, []);

  const activeSrc = images.length > 0 ? images[activeIndex] : null;
  const isActiveFailed = activeSrc ? failedImages.has(activeSrc) : false;

  // Keyboard: Esc tutup, panah kiri/kanan geser
  useEffect(() => {
    if (!cert) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isFullscreen) setIsFullscreen(false);
        else onClose();
      }
      if (!hasSlider) return;
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cert, hasSlider, goPrev, goNext, onClose, isFullscreen]);

  // Lock scroll saat modal terbuka
  useEffect(() => {
    if (!cert) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cert]);

  if (!cert) return null;

  return (
    <AnimatePresence>
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-slate-500/40 dark:bg-slate-950/80 backdrop-blur-md"
        onClick={onClose}
      >
        {/* Wrapper min-h-full + m-auto: tetap ter-center saat konten pendek,
            tapi bisa di-scroll ke atas (tombol X) saat konten tinggi */}
        <div className="min-h-full w-full flex p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-xl m-auto bg-white dark:bg-[#0d121f] border border-indigo-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Certificate Badge Header */}
          <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-5 pr-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-600 p-[1px] flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0">
              <div className="w-full h-full bg-white dark:bg-[#0d121f] rounded-[15px] flex items-center justify-center">
                <Award className="w-7 h-7 text-amber-600 dark:text-amber-400" />
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-bold text-amber-600 dark:text-amber-400">
                  {t.certificateModal.verifiedBadge}
                </span>
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mt-0.5 leading-snug">
                {cert.title}
              </h3>
            </div>
          </div>

          {/* Image Slider */}
          {hasSlider && (
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 group">
                <div className="relative w-full aspect-[3/4] max-h-[480px] bg-slate-200 dark:bg-slate-950">
                  {isActiveFailed || !activeSrc ? (
                    <div className="w-full h-full min-h-[280px] flex flex-col items-center justify-center gap-3 p-6 text-center">
                      <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <ImageOff className="w-8 h-8 text-slate-500" />
                      </div>
                      <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                        Foto tidak ditemukan
                      </p>
                      <p className="text-[11px] text-slate-500 leading-relaxed break-all">
                        Pastikan file ada di <span className="text-slate-500 dark:text-slate-400 font-mono">public{activeSrc ?? ""}</span>
                        <br />
                        (cek nama file & huruf besar/kecil, lalu restart dev server)
                      </p>
                    </div>
                  ) : (
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeSrc}
                      src={activeSrc}
                      alt={`${cert.title} - foto ${activeIndex + 1}`}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.3 }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.6}
                      onDragEnd={(_, info) => {
                        if (info.offset.x < -60) goNext();
                        else if (info.offset.x > 60) goPrev();
                      }}
                      onClick={() => setIsFullscreen(true)}
                      onError={() => activeSrc && handleImageError(activeSrc)}
                      className="w-full h-full object-contain cursor-zoom-in select-none"
                      draggable={false}
                    />
                  </AnimatePresence>
                  )}

                  {/* Prev / Next */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={goPrev}
                        aria-label="Foto sebelumnya"
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/85 dark:bg-slate-950/70 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all backdrop-blur"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={goNext}
                        aria-label="Foto berikutnya"
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/85 dark:bg-slate-950/70 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all backdrop-blur"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Counter + fullscreen */}
                  <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/85 dark:bg-slate-950/75 border border-slate-300 dark:border-slate-700/60 text-[11px] font-semibold text-slate-900 dark:text-white backdrop-blur">
                    {activeIndex + 1} / {images.length}
                  </div>
                  <button
                    onClick={() => setIsFullscreen(true)}
                    aria-label="Perbesar"
                    className="absolute bottom-2.5 right-2.5 p-2 rounded-full bg-white/85 dark:bg-slate-950/75 border border-slate-300 dark:border-slate-700/60 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800 backdrop-blur"
                  >
                    <Expand className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Dots + thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center justify-center gap-3">
                  <div className="flex items-center gap-1.5">
                    {images.map((src, idx) => (
                      <button
                        key={src + idx}
                        onClick={() => setActiveIndex(idx)}
                        aria-label={`Ke foto ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all ${
                          idx === activeIndex
                            ? "w-7 bg-amber-400"
                            : "w-1.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-500"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                {images.map((src, idx) => {
                  const isFailed = failedImages.has(src);
                  return (
                  <button
                    key={src + idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all aspect-[3/4] max-h-32 w-full bg-slate-100 dark:bg-slate-900 ${
                      idx === activeIndex
                        ? "border-amber-400 shadow-lg shadow-amber-500/20"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 opacity-70 hover:opacity-100"
                    }`}
                  >
                    {isFailed ? (
                      <span className="w-full h-full flex flex-col items-center justify-center gap-1.5 p-2 text-center">
                        <ImageOff className="w-5 h-5 text-slate-600" />
                        <span className="text-[10px] text-slate-500 leading-tight break-all">
                          Foto {idx + 1} tidak ditemukan
                        </span>
                      </span>
                    ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={src}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={() => handleImageError(src)}
                    />
                    )}
                  </button>
                  );
                })}
              </div>

              <p className="text-center text-[11px] text-slate-500">
                Geser / klik panah / klik thumbnail untuk melihat foto lainnya
              </p>
            </div>
          )}

          {/* Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-100 dark:bg-slate-900/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">{t.certificateModal.issuer}</span>
                <span className="text-slate-900 dark:text-white font-semibold">{cert.issuer}</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">{t.certificateModal.year}</span>
                <span className="text-slate-900 dark:text-white font-semibold">{cert.year}</span>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              {cert.description}
            </p>

            {/* Validated Skills */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                {t.certificateModal.skillsValidatedTitle}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {cert.skillsValidated.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Status: Valid & Terverifikasi {cert.id === "bnsp-jwd-2025" && "BNSP"}
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-colors shrink-0"
            >
              {t.certificateModal.closeButton}
            </button>
          </div>
        </motion.div>
        </div>
      </div>

      {/* Fullscreen viewer */}
      <AnimatePresence>
        {isFullscreen && hasSlider && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFullscreen(false)}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur dark flex items-center justify-center p-4"
          >
            <button
              onClick={() => setIsFullscreen(false)}
              aria-label="Tutup fullscreen"
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 border border-white/20 text-slate-900 dark:text-white hover:bg-white/20"
            >
              <X className="w-6 h-6" />
            </button>
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  aria-label="Foto sebelumnya"
                  className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 border border-white/20 text-slate-900 dark:text-white hover:bg-white/20"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  aria-label="Foto berikutnya"
                  className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 border border-white/20 text-slate-900 dark:text-white hover:bg-white/20"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
            {isActiveFailed || !activeSrc ? (
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col items-center justify-center gap-3 p-8 text-center max-w-sm rounded-2xl border border-white/10 bg-white/5"
              >
                <ImageOff className="w-10 h-10 text-slate-500 dark:text-slate-400" />
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Foto tidak ditemukan</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 break-all">public{activeSrc ?? ""}</p>
              </div>
            ) : (
            <motion.img
              key={activeSrc}
              src={activeSrc}
              alt={`${cert.title} fullscreen ${activeIndex + 1}`}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              onError={() => activeSrc && handleImageError(activeSrc)}
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
              draggable={false}
            />
            )}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-slate-900 dark:text-white text-xs font-semibold">
              {activeIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}
