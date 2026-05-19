"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ease, duration } from "@/lib/motion-tokens";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} id="hero" className="relative h-screen min-h-[640px] overflow-hidden" aria-label="Villa introductie">
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src="/images/hero.webp"
          alt="Finca Escondida infinity pool overlooking the Mediterranean Sea at sunset"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" aria-hidden="true" />
      </motion.div>

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        style={{ opacity }}
      >
        <motion.p
          className="text-cream/70 text-sm tracking-[0.3em] uppercase mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.macro, ease: ease.enter, delay: 0.2 }}
        >
          San Carlos, Ibiza
        </motion.p>

        <motion.h1
          className="font-heading text-cream text-6xl md:text-8xl lg:text-[7rem] leading-none mb-8 max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.macro, ease: ease.enter, delay: 0.35 }}
        >
          Finca<br />
          <em className="italic">Escondida</em>
        </motion.h1>

        <motion.p
          className="text-cream/80 text-lg md:text-xl max-w-md leading-relaxed mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.macro, ease: ease.enter, delay: 0.5 }}
        >
          Seven bedrooms. A 22-metre infinity pool above the sea. Total seclusion in the hills of northern Ibiza.
        </motion.p>

        <motion.button
          onClick={scrollToBooking}
          className="px-10 py-4 border border-cream/60 text-cream text-sm tracking-widest uppercase hover:bg-cream hover:text-olive transition-all duration-300 focus-visible:outline-2 focus-visible:outline-cream focus-visible:outline-offset-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.macro, ease: ease.enter, delay: 0.65 }}
          aria-label="Beschikbaarheid controleren en reserveren"
        >
          Check Availability
        </motion.button>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: duration.macro }}
        aria-hidden="true"
      >
        <span className="text-cream/50 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-px h-10 bg-cream/30"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}
