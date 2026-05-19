"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useCallback, useRef } from "react";
import type { GalleryImage } from "@/types";
import { ease, duration } from "@/lib/motion-tokens";

interface GalleryLightboxProps {
  images: GalleryImage[];
  currentIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function GalleryLightbox({ images, currentIndex, onClose, onNext, onPrev }: GalleryLightboxProps) {
  const touchStartX = useRef<number | null>(null);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowRight") onNext();
    if (e.key === "ArrowLeft") onPrev();
  }, [onClose, onNext, onPrev]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      delta < 0 ? onNext() : onPrev();
    }
    touchStartX.current = null;
  }, [onNext, onPrev]);

  useEffect(() => {
    if (currentIndex !== null) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [currentIndex, handleKey]);

  const image = currentIndex !== null ? images[currentIndex] : null;

  return (
    <AnimatePresence>
      {currentIndex !== null && image && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration.meso }}
          role="dialog"
          aria-modal="true"
          aria-label="Foto weergave"
          onClick={onClose}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            className="relative w-full h-full max-w-6xl max-h-[85vh] mx-4"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: duration.meso, ease: ease.enter }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </motion.div>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm tracking-widest text-center px-4 max-w-lg">
            {image.alt}
          </p>

          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 focus-visible:outline-2 focus-visible:outline-white rounded"
            aria-label="Lightbox sluiten"
          >
            <X size={28} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-3 focus-visible:outline-2 focus-visible:outline-white rounded"
            aria-label="Vorige foto"
          >
            <ChevronLeft size={36} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-3 focus-visible:outline-2 focus-visible:outline-white rounded"
            aria-label="Volgende foto"
          >
            <ChevronRight size={36} />
          </button>

          <span className="absolute bottom-6 right-6 text-white/40 text-sm" aria-live="polite">
            {(currentIndex + 1)} / {images.length}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
