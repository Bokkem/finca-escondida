"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { galleryImages } from "@/lib/mock-data";
import GalleryLightbox from "@/components/ui/GalleryLightbox";
import { ease, duration, stagger } from "@/lib/motion-tokens";
import RevealText from "@/components/ui/RevealText";

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleNext = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % galleryImages.length : 0));
  }, []);

  const handlePrev = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : 0));
  }, []);

  return (
    <section id="gallery" className="py-24 md:py-36 px-6 bg-[#F2F0EB]" aria-label="Fotogalerij">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: duration.macro, ease: ease.enter }}
        >
          <p className="text-muted text-sm tracking-[0.3em] uppercase mb-4">Photography</p>
          <RevealText as="h2" className="font-heading text-5xl md:text-7xl text-olive" delay={0.1}>
            Every frame, a memory
          </RevealText>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4" role="list">
          {galleryImages.map((image, i) => (
            <motion.button
              key={image.src}
              onClick={() => setLightboxIndex(i)}
              className="relative overflow-hidden rounded-xl group aspect-[4/3] focus-visible:ring-2 focus-visible:ring-olive focus-visible:outline-none"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: duration.meso, ease: ease.enter, delay: i * stagger.tight }}
              aria-label={`Foto bekijken: ${image.alt}`}
              role="listitem"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" aria-hidden="true" />
            </motion.button>
          ))}
        </div>
      </div>

      <GalleryLightbox
        images={galleryImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
}
