"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { galleryImages } from "@/lib/mock-data";
import GalleryLightbox from "@/components/ui/GalleryLightbox";
import RevealText from "@/components/ui/RevealText";
import { ease, duration, stagger } from "@/lib/motion-tokens";

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const measure = () => {
      setViewportWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 768);
      if (trackRef.current) {
        setTrackWidth(trackRef.current.scrollWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const travel = Math.max(0, trackWidth - viewportWidth + 160);
  const sectionHeight = !isMobile && trackWidth > 0
    ? `calc(100vh + ${travel}px)`
    : "auto";

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  const handleNext = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % galleryImages.length : 0));
  }, []);

  const handlePrev = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : 0));
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      style={{ height: sectionHeight }}
      aria-label="Photo gallery"
    >
      {/* Desktop: sticky horizontal scroll */}
      <div className="hidden md:block sticky top-0 h-screen overflow-hidden bg-[#F2F0EB]">

        {/* Section header — top left, stays fixed */}
        <div className="absolute top-0 left-0 z-10 px-16 pt-20 pointer-events-none">
          <motion.p
            className="text-muted text-sm tracking-[0.3em] uppercase mb-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.macro, ease: ease.enter, delay: 0.1 }}
          >
            Photography
          </motion.p>
          <RevealText
            as="h2"
            className="font-heading text-5xl md:text-6xl text-olive"
            delay={0.15}
          >
            Every frame, a memory
          </RevealText>
        </div>

        {/* Scroll hint — bottom left */}
        <motion.p
          className="absolute bottom-10 left-16 text-xs tracking-[0.25em] uppercase text-muted/50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          aria-hidden="true"
        >
          Scroll to explore
        </motion.p>

        {/* Horizontal photo track */}
        <motion.div
          ref={trackRef}
          className="absolute top-0 left-0 h-full flex items-center gap-5 pl-[10vw] pr-[10vw]"
          style={{ x }}
          aria-label="Gallery photos"
        >
          {galleryImages.map((image, i) => (
            <motion.button
              key={image.src}
              onClick={() => setLightboxIndex(i)}
              className="relative shrink-0 overflow-hidden rounded-2xl group focus-visible:ring-2 focus-visible:ring-olive focus-visible:outline-none"
              style={{
                width: i % 3 === 0 ? "38vw" : "28vw",
                height: i % 3 === 0 ? "70vh" : "55vh",
              }}
              aria-label={`View photo: ${image.alt}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration.macro, ease: ease.enter, delay: 0.2 + i * stagger.normal }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="38vw"
              />
              {/* Hover overlay with caption */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" aria-hidden="true" />
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                aria-hidden="true"
              >
                <p className="text-cream/90 text-sm tracking-wide leading-relaxed">{image.alt}</p>
              </motion.div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Mobile: simple 2-column grid */}
      <div className="md:hidden py-24 px-6 bg-[#F2F0EB]">
        <div className="mb-12">
          <p className="text-muted text-sm tracking-[0.3em] uppercase mb-3">Photography</p>
          <RevealText as="h2" className="font-heading text-5xl text-olive" delay={0.1}>
            Every frame, a memory
          </RevealText>
        </div>
        <div className="grid grid-cols-2 gap-3" role="list">
          {galleryImages.map((image, i) => (
            <motion.button
              key={image.src}
              onClick={() => setLightboxIndex(i)}
              className="relative overflow-hidden rounded-xl aspect-[3/4] focus-visible:ring-2 focus-visible:ring-olive focus-visible:outline-none"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: duration.meso, ease: ease.enter, delay: i * stagger.tight }}
              aria-label={`View photo: ${image.alt}`}
              role="listitem"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="50vw"
              />
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
