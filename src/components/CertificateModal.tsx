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
        className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/60 backdrop-blur-md"
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
          className="relative w-full max-w-xl m-auto bg-[#FFFFFF] dark:bg-[#292724] border border-[#B59662]/40 dark:border-[#C6A878]/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-[#F0EBE3] dark:bg-[#1D1C1A] border border-[#E8E1D7] dark:border-[#403B34] text-[#81776B] dark:text-[#B7ADA0] hover:text-[#242321] dark:hover:text-[#F5F1E9] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Certificate Badge Header */}
          <div className="flex items-center gap-4 border-b border-[#E8E1D7] dark:border-[#403B34] pb-5 pr-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#B59662] to-[#9E8050] dark:from-[#C6A878] dark:to-[#B59662] p-[1px] flex items-center justify-center shadow-lg shadow-[#B59662]/20 shrink-0">
              <div className="w-full h-full bg-[#FFFFFF] dark:bg-[#292724] rounded-[15px] flex items-center justify-center">
                <Award className="w-7 h-7 text-[#B59662] dark:text-[#C6A878]" />
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-bold text-[#B59662] dark:text-[#C6A878]">
                  {t.certificateModal.verifiedBadge}
                </span>
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-display font-bold text-[#242321] dark:text-[#F5F1E9] mt-0.5 leading-snug">
                {cert.title}
              </h3>
            </div>
          </div>

          {/* Image Slider */}
          {hasSlider && (
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden border border-[#E8E1D7] dark:border-[#403B34] bg-[#F8F6F1] dark:bg-[#1D1C1A] group">
                <div className="relative w-full aspect-[3/4] max-h-[480px] bg-[#E8E1D7]/50 dark:bg-[#1D1C1A]">
                  {isActiveFailed || !activeSrc ? (
                    <div className="w-full h-full min-h-[280px] flex flex-col items-center justify-center gap-3 p-6 text-center">
                      <div className="p-4 rounded-2xl bg-[#F0EBE3] dark:bg-[#292724] border border-[#E8E1D7] dark:border-[#403B34]">
                        <ImageOff className="w-8 h-8 text-[#81776B]" />
                      </div>
                      <p className="text-sm font-semibold text-[#242321] dark:text-[#F5F1E9]">
                        {t.certificateModal.photoNotFound}
                      </p>
                      <p className="text-[11px] text-[#81776B] dark:text-[#B7ADA0] leading-relaxed break-all">
                        {t.certificateModal.checkFile} <span className="text-[#B59662] dark:text-[#C6A878] font-mono">public{activeSrc ?? ""}</span>
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
                        aria-label={t.education.prevPhoto}
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#FFFFFF]/90 dark:bg-[#292724]/90 border border-[#E8E1D7] dark:border-[#403B34] text-[#242321] dark:text-[#F5F1E9] hover:bg-[#F0EBE3] dark:hover:bg-[#1D1C1A] opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all backdrop-blur"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={goNext}
                        aria-label={t.education.nextPhoto}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#FFFFFF]/90 dark:bg-[#292724]/90 border border-[#E8E1D7] dark:border-[#403B34] text-[#242321] dark:text-[#F5F1E9] hover:bg-[#F0EBE3] dark:hover:bg-[#1D1C1A] opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all backdrop-blur"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Counter + fullscreen */}
                  <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[#FFFFFF]/90 dark:bg-[#292724]/90 border border-[#E8E1D7] dark:border-[#403B34] text-[11px] font-semibold text-[#242321] dark:text-[#F5F1E9] backdrop-blur">
                    {activeIndex + 1} / {images.length}
                  </div>
                  <button
                    onClick={() => setIsFullscreen(true)}
                    aria-label="Perbesar"
                    className="absolute bottom-2.5 right-2.5 p-2 rounded-full bg-[#FFFFFF]/90 dark:bg-[#292724]/90 border border-[#E8E1D7] dark:border-[#403B34] text-[#242321] dark:text-[#F5F1E9] hover:bg-[#F0EBE3] dark:hover:bg-[#1D1C1A] backdrop-blur"
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
                            ? "w-7 bg-[#B59662] dark:bg-[#C6A878]"
                            : "w-1.5 bg-[#E8E1D7] dark:bg-[#403B34] hover:bg-[#B59662]/50"
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
                    className={`relative rounded-xl overflow-hidden border-2 transition-all aspect-[3/4] max-h-32 w-full bg-[#F0EBE3] dark:bg-[#1D1C1A] ${
                      idx === activeIndex
                        ? "border-[#B59662] dark:border-[#C6A878] shadow-md shadow-[#B59662]/20"
                        : "border-[#E8E1D7] dark:border-[#403B34] hover:border-[#B59662]/50 opacity-70 hover:opacity-100"
                    }`}
                  >
                    {isFailed ? (
                      <span className="w-full h-full flex flex-col items-center justify-center gap-1.5 p-2 text-center">
                        <ImageOff className="w-5 h-5 text-[#81776B]" />
                        <span className="text-[10px] text-[#81776B] leading-tight break-all">
                          {t.certificateModal.photoNotFound} ({idx + 1})
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

              <p className="text-center text-[11px] text-[#81776B] dark:text-[#B7ADA0]">
                {t.certificateModal.sliderHint}
              </p>
            </div>
          )}

          {/* Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-xs bg-[#F0EBE3] dark:bg-[#1D1C1A] p-4 rounded-2xl border border-[#E8E1D7] dark:border-[#403B34]">
              <div>
                <span className="text-[#81776B] dark:text-[#B7ADA0] block">{t.certificateModal.issuer}</span>
                <span className="text-[#242321] dark:text-[#F5F1E9] font-semibold">{cert.issuer}</span>
              </div>
              <div>
                <span className="text-[#81776B] dark:text-[#B7ADA0] block">{t.certificateModal.year}</span>
                <span className="text-[#242321] dark:text-[#F5F1E9] font-semibold">{cert.year}</span>
              </div>
            </div>

            <p className="text-[#81776B] dark:text-[#B7ADA0] text-xs sm:text-sm leading-relaxed">
              {cert.description}
            </p>

            {/* Validated Skills */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#B59662] dark:text-[#C6A878]">
                {t.certificateModal.skillsValidatedTitle}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {cert.skillsValidated.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#81776B] dark:text-[#B7ADA0]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-[#E8E1D7] dark:border-[#403B34] flex items-center justify-between gap-3">
            <span className="text-xs text-[#81776B] dark:text-[#B7ADA0]">
              {t.certificateModal.verifiedStatus} {cert.id === "bnsp-jwd-2025" && "BNSP"}
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-[#B59662] hover:bg-[#9E8050] dark:bg-[#C6A878] dark:hover:bg-[#D8BC8C] text-white font-medium text-xs transition-colors shrink-0 shadow-sm"
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
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur flex items-center justify-center p-4"
          >
            <button
              onClick={() => setIsFullscreen(false)}
              aria-label={t.certificateModal.closeFullscreen}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20"
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
                  aria-label={t.education.prevPhoto}
                  className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  aria-label={t.education.nextPhoto}
                  className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20"
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
                <ImageOff className="w-10 h-10 text-slate-400" />
                <p className="text-sm font-semibold text-white">{t.certificateModal.photoNotFound}</p>
                <p className="text-xs text-slate-400 break-all">{t.certificateModal.checkFile} public{activeSrc ?? ""}</p>
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
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold">
              {activeIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}
