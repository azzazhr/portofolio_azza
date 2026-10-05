"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowRight,
  MousePointerClick,
  SkipForward,
} from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

/* ---------- Starfield canvas (particles + shooting stars) ---------- */
function Starfield({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    type Star = { x: number; y: number; r: number; s: number; tw: number; ph: number };
    type Meteor = { x: number; y: number; vx: number; vy: number; life: number; max: number };
    let stars: Star[] = [];
    let meteors: Meteor[] = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const count = Math.min(180, Math.floor((w * h) / 9000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.3,
        s: Math.random() * 0.25 + 0.05,
        tw: Math.random() * 2 + 0.6,
        ph: Math.random() * Math.PI * 2,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    const spawnMeteor = () => {
      if (meteors.length < 3 && Math.random() < 0.012) {
        const sx = Math.random() * w * 0.7 + w * 0.2;
        meteors.push({
          x: sx,
          y: -20,
          vx: -(Math.random() * 4 + 5),
          vy: Math.random() * 2.5 + 3,
          life: 0,
          max: 60 + Math.random() * 40,
        });
      }
    };

    const tick = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      const px = (mouse.current.x - 0.5) * 18;
      const py = (mouse.current.y - 0.5) * 18;

      for (const st of stars) {
        st.y += st.s;
        if (st.y > h + 4) {
          st.y = -4;
          st.x = Math.random() * w;
        }
        const alpha = 0.35 + Math.abs(Math.sin(t * st.tw + st.ph)) * 0.65;
        ctx.beginPath();
        ctx.arc(st.x + px * st.r * 0.4, st.y + py * st.r * 0.4, st.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(165, 243, 252, ${alpha * 0.9})`;
        ctx.fill();
      }

      spawnMeteor();
      meteors = meteors.filter((m) => m.life < m.max);
      for (const m of meteors) {
        m.life++;
        m.x += m.vx;
        m.y += m.vy;
        const fade = 1 - m.life / m.max;
        const grad = ctx.createLinearGradient(m.x, m.y, m.x + 70, m.y - 35);
        grad.addColorStop(0, `rgba(255,255,255,${0.9 * fade})`);
        grad.addColorStop(0.3, `rgba(103,232,249,${0.5 * fade})`);
        grad.addColorStop(1, "rgba(103,232,249,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x + 70, m.y - 35);
        ctx.stroke();
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [mouse]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}

export default function IntroScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const { personalInfo, language } = useLanguage();
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const isID = language === "id";

  const loadingSteps = useMemo(
    () =>
      isID
        ? ["Menyiapkan kanvas…", "Memuat aset visual…", "Merangkai proyek…", "Mempoles detail…", "Siap dijelajahi!"]
        : ["Preparing canvas…", "Loading visual assets…", "Assembling projects…", "Polishing details…", "Ready to explore!"],
    [isID]
  );

  const stepLabel = useMemo(() => {
    const i = Math.min(Math.floor((progress / 100) * loadingSteps.length), loadingSteps.length - 1);
    return loadingSteps[i];
  }, [progress, loadingSteps]);

  /* lock scroll + mount */
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (isVisible) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isVisible, mounted]);

  /* loading simulation */
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoaded(true), 500);
          return 100;
        }
        const boost = prev > 82 ? 3 : Math.floor(Math.random() * 13) + 5;
        return Math.min(prev + boost, 100);
      });
    }, 150);
    return () => clearInterval(interval);
  }, [mounted]);

  const handleEnter = useCallback(() => {
    if (!isLoaded || leaving) return;
    setLeaving(true);
    // beri waktu animasi tirai sebelum unmount
    setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
    }, 950);
  }, [isLoaded, leaving]);

  /* Enter keyboard + klik di mana saja */
  useEffect(() => {
    if (!mounted || !isVisible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") handleEnter();
      if (e.key === "Escape") handleEnter();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mounted, isVisible, handleEnter]);

  const onMouseMove = (e: React.MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    mouse.current = { x: nx, y: ny };
    setParallax({ x: (nx - 0.5) * 22, y: (ny - 0.5) * 22 });
  };

  if (!mounted) return null;

  const nameChars = Array.from(personalInfo.name);
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.045, delayChildren: 0.35 } },
  };
  const charVariants: Variants = {
    hidden: { opacity: 0, y: 34, rotateX: -70, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 260, damping: 18 },
    },
  };

  const displayProgress = Math.min(Math.floor(progress), 100);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={leaving ? { opacity: 1 } : { opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden text-white"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 0%, #0b3a5e 0%, #07233f 28%, #040f22 58%, #01060f 100%)",
          }}
          onMouseMove={onMouseMove}
          onClick={handleEnter}
        >
          {/* ===== Aurora blobs (parallax) ===== */}
          <motion.div
            animate={{ x: parallax.x, y: parallax.y }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            className="absolute inset-0 pointer-events-none"
          >
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.25, 1] }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[15%] -left-[8%] w-[58vw] h-[58vw] rounded-full bg-cyan-400/20 blur-[110px]"
            />
            <motion.div
              animate={{ rotate: -360, scale: [1, 1.3, 1] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-[18%] -right-[8%] w-[52vw] h-[52vw] rounded-full bg-indigo-600/30 blur-[110px]"
            />
            <motion.div
              animate={{ x: [0, 70, 0], y: [0, -70, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[22%] right-[12%] w-[34vw] h-[34vw] rounded-full bg-fuchsia-500/15 blur-[90px]"
            />
            <motion.div
              animate={{ x: [0, -60, 0], y: [0, 60, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[18%] left-[8%] w-[30vw] h-[30vw] rounded-full bg-sky-500/15 blur-[80px]"
            />
          </motion.div>

          {/* stars + meteors */}
          <Starfield mouse={mouse} />

          {/* grid + vignette + noise */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_62%_at_50%_45%,#000_55%,transparent_100%)] pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,transparent_55%,rgba(0,0,0,0.55)_100%)]" />
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none intro-noise" />

          {/* ===== Top bar ===== */}
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
            className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-5 sm:px-8 py-4 text-[11px] sm:text-xs font-mono tracking-[0.25em] uppercase text-slate-300/80"
          >
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Portfolio © 2026
            </span>
            <span className="hidden sm:block">Malang — ID</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (isLoaded) handleEnter();
                else {
                  setProgress(100);
                  setIsLoaded(true);
                }
              }}
              className="group flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 backdrop-blur-md hover:bg-white/15 hover:border-white/30 transition-all"
            >
              <SkipForward className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              {isID ? "Lewati" : "Skip"}
            </button>
          </motion.div>

          {/* ===== Main card ===== */}
          <motion.div
            animate={{ x: parallax.x * -0.6, y: parallax.y * -0.6 }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
            className="relative z-10 flex w-full max-w-3xl flex-col items-center px-6 text-center"
          >
            {/* Logo + orbit */}
            <motion.div
              initial={{ scale: 0.4, opacity: 0, rotateY: -90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ duration: 1.1, type: "spring", bounce: 0.35 }}
              className="relative mb-7 h-24 w-24 sm:h-32 sm:w-32"
              style={{ width: 128, height: 128, position: "relative", flexShrink: 0 }}
            >
              {/* orbit ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0%, rgba(34,211,238,0.7) 12%, transparent 25%, transparent 50%, rgba(168,85,247,0.7) 62%, transparent 75%, transparent 100%)",
                  mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "xor",
                  padding: "2px",
                }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-8 rounded-full border border-dashed border-white/15"
              />
              {/* orbiting dots */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4"
              >
                <span className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4"
              >
                <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-fuchsia-400 shadow-[0_0_12px_rgba(232,121,249,0.9)]" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-[0_0_50px_rgba(34,211,238,0.35)] backdrop-blur-xl"
                style={{ position: "absolute", inset: 0 }}
              >
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={128}
                  height={128}
                  className="drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                  style={{ width: "100%", height: "100%", objectFit: "contain", padding: 8 }}
                  priority
                />
                {/* shine sweep */}
                <motion.div
                  animate={{ x: ["-120%", "220%"] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.2 }}
                  className="absolute inset-y-0 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </motion.div>
            </motion.div>

            {/* Name */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{ perspective: 600 }}
              className="flex flex-wrap justify-center overflow-visible min-h-[3.5rem] sm:min-h-[4.5rem]"
            >
              {nameChars.map((char, i) => (
                <motion.span
                  key={i}
                  variants={charVariants}
                  className={`text-4xl sm:text-6xl font-display font-extrabold tracking-tight ${
                    char === " " ? "w-3 sm:w-5" : ""
                  } ${
                    i > 7
                      ? "bg-gradient-to-r from-cyan-300 via-sky-300 to-teal-200 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(34,211,238,0.35)]"
                      : "text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.6)]"
                  }`}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>

            {/* Static role */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 1 }}
              className="mt-3 flex h-7 items-center justify-center gap-3 text-xs sm:text-base font-mono tracking-[0.25em] uppercase text-slate-300"
            >
              <span className="hidden sm:block h-px w-10 bg-gradient-to-r from-transparent to-slate-500" />
              <span className="text-cyan-200">Web Developer</span>
              <span className="hidden sm:block h-px w-10 bg-gradient-to-l from-transparent to-slate-500" />
            </motion.div>

            {/* Loader / Button */}
            <div className="mt-9 flex h-24 w-full items-center justify-center">
              <AnimatePresence mode="wait">
                {!isLoaded ? (
                  <motion.div
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.96 }}
                    className="flex w-60 sm:w-72 flex-col items-center"
                  >
                    {/* big counter */}
                    <div className="mb-3 flex items-end justify-between w-full">
                      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-slate-400">
                        {stepLabel}
                      </span>
                      <span className="font-display text-3xl font-extrabold tabular-nums bg-gradient-to-r from-cyan-200 to-white bg-clip-text text-transparent">
                        {displayProgress}
                        <span className="text-base">%</span>
                      </span>
                    </div>
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10 border border-white/10">
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-fuchsia-400 shadow-[0_0_18px_rgba(34,211,238,0.7)]"
                        initial={{ width: "0%" }}
                        animate={{ width: `${displayProgress}%` }}
                        transition={{ ease: "easeOut", duration: 0.3 }}
                      />
                      <motion.div
                        animate={{ x: ["-100%", "300%"] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                      />
                    </div>
                    {/* step dots */}
                    <div className="mt-3 flex items-center gap-1.5">
                      {loadingSteps.map((_, i) => {
                        const activeIdx = Math.floor((displayProgress / 100) * loadingSteps.length);
                        return (
                          <span
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-500 ${
                              i <= activeIdx
                                ? "w-6 bg-gradient-to-r from-cyan-400 to-fuchsia-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                                : "w-1.5 bg-white/20"
                            }`}
                          />
                        );
                      })}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="button"
                    initial={{ opacity: 0, scale: 0.85, y: 16 }}
                    animate={
                      leaving
                        ? { opacity: 0, scale: 1.4, filter: "blur(6px)" }
                        : { opacity: 1, scale: 1, y: 0 }
                    }
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <motion.button
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEnter();
                      }}
                      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-8 sm:px-10 py-4 font-bold text-sm sm:text-base text-slate-900 shadow-[0_0_50px_rgba(34,211,238,0.45)] transition-shadow hover:shadow-[0_0_70px_rgba(34,211,238,0.65)]"
                    >
                      {/* gradient border glow */}
                      <span className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-cyan-400 via-sky-400 to-fuchsia-400 opacity-100 [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [mask-composite:exclude]" />
                      {/* shine */}
                      <motion.span
                        animate={{ x: ["-150%", "350%"] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-y-0 w-1/4 rotate-12 bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent"
                      />
                      <span className="relative z-10">
                        {isID ? "Jelajahi Portofolio" : "Explore Portfolio"}
                      </span>
                      <span className="relative z-10 grid h-8 w-8 place-items-center rounded-full bg-slate-900 text-white transition-transform group-hover:translate-x-1">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                      {/* ping */}
                      <span className="absolute inset-0 rounded-full animate-ping bg-cyan-400/20" />
                    </motion.button>
                    <motion.p
                      animate={{ y: [0, 6, 0], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                      className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono tracking-widest uppercase text-slate-400"
                    >
                      <MousePointerClick className="h-3.5 w-3.5" />
                      {isID ? "Klik di mana saja / tekan Enter" : "Click anywhere / press Enter"}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ===== Bottom marquee ===== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-0 inset-x-0 z-10 overflow-hidden border-t border-white/10 bg-black/20 py-2.5 backdrop-blur-sm"
          >
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="flex w-max items-center gap-8 whitespace-nowrap font-mono text-[11px] tracking-[0.25em] uppercase text-slate-400"
            >
              {Array.from({ length: 2 }).map((_, k) => (
                <span key={k} className="flex items-center gap-8">
                  {Array.from({ length: 6 }).map((__, j) => (
                    <span key={j} className="flex items-center gap-8">
                      <span>Azzahra Attaqina</span>
                      <span className="h-1 w-1 rounded-full bg-cyan-400" />
                    </span>
                  ))}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ===== Curtain exit ===== */}
          <AnimatePresence>
            {leaving && (
              <>
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute inset-x-0 bottom-0 top-[8%] rounded-t-[2.5rem] bg-gradient-to-b from-[#0d1526] to-[#050a14] border-t border-cyan-300/20 shadow-[0_-20px_80px_rgba(0,0,0,0.6)]"
                />
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute inset-x-0 bottom-0 top-[14%] rounded-t-[2rem] bg-gradient-to-b from-cyan-500/20 to-transparent backdrop-blur-xl border-t border-white/20 flex items-start justify-center pt-10"
                >
                  <span className="font-mono text-xs tracking-[0.4em] uppercase text-cyan-200 animate-pulse">
                    {isID ? "Membuka…" : "Opening…"}
                  </span>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
