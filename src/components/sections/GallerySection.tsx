"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
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

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center", containScroll: false });
  const [selectedSlide, setSelectedSlide] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedSlide(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

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
      <div className="hidden md:block sticky top-0 h-[100dvh] overflow-hidden bg-[#F2F0EB]">

        {/* Horizontal photo track — heading is first card */}
        <motion.div
          ref={trackRef}
          className="absolute top-0 left-0 h-full flex items-center gap-5 pl-[10vw] pr-[10vw]"
          style={{ x }}
          aria-label="Gallery photos"
        >
          {/* Title card — first item in track */}
          <div className="shrink-0 w-[30vw] flex flex-col justify-center gap-4 pr-8">
            <motion.p
              className="text-muted text-sm tracking-[0.3em] uppercase"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration.macro, ease: ease.enter, delay: 0.1 }}
            >
              Photography
            </motion.p>
            <RevealText
              as="h2"
              className="font-heading text-5xl md:text-6xl text-olive leading-tight"
              delay={0.15}
            >
              Every frame, a memory
            </RevealText>
            <motion.p
              className="text-xs tracking-[0.25em] uppercase text-muted/50 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
              aria-hidden="true"
            >
              Scroll to explore
            </motion.p>
          </div>

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

      {/* Mobile: Embla Carousel */}
      <div className="md:hidden py-24 bg-[#F2F0EB]">
        <div className="mb-10 px-6">
          <p className="text-muted text-sm tracking-[0.3em] uppercase mb-3">Photography</p>
          <RevealText as="h2" className="font-heading text-5xl text-olive" delay={0.1}>
            Every frame, a memory
          </RevealText>
        </div>

        <div ref={emblaRef} className="overflow-hidden" aria-label="Gallery photos">
          <div className="flex -ml-3">
            {galleryImages.map((image, i) => (
              <div key={image.src} className="relative shrink-0 pl-3" style={{ flex: "0 0 82vw" }}>
                <button
                  onClick={() => setLightboxIndex(i)}
                  className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden focus-visible:ring-2 focus-visible:ring-olive focus-visible:outline-none block"
                  aria-label={`View photo: ${image.alt}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="82vw"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Animated pill dots */}
        <div className="flex justify-center items-center gap-1.5 mt-6 px-6" aria-hidden="true">
          {galleryImages.map((_, i) => (
            <motion.div
              key={i}
              className="h-[3px] rounded-full bg-muted"
              animate={{
                width: i === selectedSlide ? 20 : 4,
                opacity: i === selectedSlide ? 0.75 : 0.2,
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
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
