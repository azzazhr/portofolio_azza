"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const profileImages = ["/images/profile(1).jpeg", "/images/profile(2).jpeg"];

interface ProfileSliderProps {
  alt: string;
  sizes: string;
  priority?: boolean;
  imageClassName?: string;
}

export default function ProfileSlider({
  alt,
  sizes,
  priority = false,
  imageClassName = "object-cover object-center",
}: ProfileSliderProps) {
  const [imageIndex, setImageIndex] = useState(0);

  const nextImage = () => setImageIndex((prev) => (prev + 1) % profileImages.length);
  const prevImage = () => setImageIndex((prev) => (prev - 1 + profileImages.length) % profileImages.length);

  return (
    <div className="relative w-full h-full group">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={imageIndex}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={profileImages[imageIndex]}
            alt={alt}
            fill
            sizes={sizes}
            className={`${imageClassName} transition-transform duration-700 group-hover:scale-[1.03]`}
            priority={priority}
          />
        </motion.div>
      </AnimatePresence>

      <button
        type="button"
        onClick={prevImage}
        aria-label="Previous photo"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-colors duration-300"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={nextImage}
        aria-label="Next photo"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-colors duration-300"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-3 left-0 right-0 z-10 flex items-center justify-center gap-2">
        {profileImages.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setImageIndex(index)}
            aria-label={`Go to photo ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === imageIndex ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
