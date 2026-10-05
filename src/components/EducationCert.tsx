"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Award, CheckCircle2, Eye, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import CertificateModal from "./CertificateModal";
import { CertificationItem } from "@/types";

export default function EducationCert() {
  const { t, educationData, certificationData } = useLanguage();
  const [activeCert, setActiveCert] = useState<CertificationItem | null>(null);
  const [modalInitialImageIndex, setModalInitialImageIndex] = useState(0);

  // Ensure certificationData is always an array for safe mapping
  const certs = Array.isArray(certificationData) ? certificationData : [certificationData];

  const openModal = (cert: CertificationItem, imageIndex = 0) => {
    setActiveCert(cert);
    setModalInitialImageIndex(imageIndex);
  };

  return (
    <section id="education" className="py-16 sm:py-24 relative bg-slate-50 dark:bg-[#080b11] overflow-hidden scroll-mt-20">
      {/* Background glow */}
      <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800/60 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{t.education.sectionTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            {t.education.sectionTitle}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg">
            {t.education.subTitle}
          </p>
        </div>

        <div className="space-y-16">
          
          {/* Top Section: Education List */}
          <div className="space-y-6">
            <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
              <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <span>{t.education.educationTitle}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {educationData.map((edu, idx) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-panel glass-panel-hover p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4"
                >
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div>
                      <h4 className="text-xl font-display font-bold text-slate-900 dark:text-white">
                        {edu.institution}
                      </h4>
                      <span className="text-indigo-400 text-sm font-semibold">
                        {edu.degree}
                      </span>
                    </div>
                    <span className="px-3.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-medium">
                      {edu.period}
                    </span>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800/80">
                    {edu.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Section: Featured Certification Cards */}
          <div className="space-y-6">
            <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2 mb-8 text-center">
              <Award className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              <span>{t.education.certTitle}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certs.map((cert) => (
                <CertCard key={cert.id} cert={cert} onOpenModal={(imgIdx) => openModal(cert, imgIdx)} t={t} />
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Modal */}
      {activeCert && (
        <CertificateModal
          cert={activeCert}
          initialIndex={modalInitialImageIndex}
          onClose={() => setActiveCert(null)}
        />
      )}
    </section>
  );
}

function CertCard({ cert, onOpenModal, t }: { cert: CertificationItem, onOpenModal: (index: number) => void, t: any }) {
  const [cardIndex, setCardIndex] = useState(0);
  
  const certImages: string[] =
    cert.images && cert.images.length > 0
      ? cert.images
      : cert.image
        ? [cert.image]
        : [];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/40 bg-gradient-to-b from-indigo-100 to-white dark:from-indigo-950/30 dark:to-[#0d121f] space-y-6 flex-1 flex flex-col justify-between"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
            {cert.year}
          </span>
        </div>

        <div>
          <span className="text-xs uppercase font-semibold tracking-wider text-slate-500 dark:text-slate-400">
            {cert.issuer}
          </span>
          <h4 className="text-2xl font-display font-bold text-slate-900 dark:text-white mt-1">
            {cert.title}
          </h4>
        </div>

        {/* Mini slider preview */}
        {certImages.length > 0 && (
          <div className="space-y-2.5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 group">
              <button
                onClick={() => onOpenModal(cardIndex)}
                className="block w-full aspect-[4/3] bg-slate-950 cursor-zoom-in"
                aria-label="Buka pratinjau sertifikat"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={certImages[cardIndex]}
                    src={certImages[cardIndex]}
                    alt={`${cert.title} - foto ${cardIndex + 1}`}
                    initial={{ opacity: 0, x: 32 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -32 }}
                    transition={{ duration: 0.28 }}
                    className={`w-full h-full object-cover ${
                      certImages[cardIndex].includes("bnsp-moment")
                        ? "object-[50%_30%]"
                        : ""
                    }`}
                    draggable={false}
                  />
                </AnimatePresence>
              </button>

              {certImages.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setCardIndex((p) => (p - 1 + certImages.length) % certImages.length)
                    }
                    aria-label="Foto sebelumnya"
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/85 dark:bg-slate-950/70 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800 backdrop-blur"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setCardIndex((p) => (p + 1) % certImages.length)
                    }
                    aria-label="Foto berikutnya"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/85 dark:bg-slate-950/70 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800 backdrop-blur"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-white/85 dark:bg-slate-950/75 border border-slate-300 dark:border-slate-700/60 text-[11px] font-semibold text-slate-900 dark:text-white backdrop-blur">
                {cardIndex + 1} / {certImages.length}
              </div>
            </div>

            {certImages.length > 1 && (
              <div className="flex items-center justify-center gap-1.5">
                {certImages.map((src, idx) => (
                  <button
                    key={src + idx}
                    onClick={() => setCardIndex(idx)}
                    aria-label={`Ke foto ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === cardIndex
                        ? "w-6 bg-amber-400"
                        : "w-1.5 bg-slate-700 hover:bg-slate-500"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
          {cert.description}
        </p>

        <div className="space-y-2 pt-2">
          <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
            Kompetensi Teruji:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {cert.skillsValidated.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={() => onOpenModal(cardIndex)}
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40"
        >
          <Eye className="w-4 h-4" />
          <span>{t.education.viewCertificate}</span>
        </button>
      </div>
    </motion.div>
  );
}
