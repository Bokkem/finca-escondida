"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";
import { ease, duration } from "@/lib/motion-tokens";
import { useLenis } from "@/components/providers/SmoothScrollProvider";

export default function BackToTop() {
  const lenis = useLenis();
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handler = () => {
      const scrolled = window.scrollY > 400;
      const nearBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 80;
      setVisible(scrolled && !nearBottom);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollToTop = () => {
    lenis?.scrollTo(0, { immediate: true });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-olive flex items-center justify-center focus-visible:ring-2 focus-visible:ring-olive focus-visible:ring-offset-2 overflow-hidden"
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: hovered ? -5 : 0,
            boxShadow: hovered
              ? "0 8px 30px rgba(47,62,54,0.35), 0 0 60px rgba(47,62,54,0.15), 0 0 0 1px rgba(47,62,54,0.1)"
              : "0 4px 14px rgba(47,62,54,0.25)",
          }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: duration.meso, ease: ease.enter }}
          aria-label="Back to top"
          title="Back to top"
        >
          {/* glow radial achter de knop */}
          <motion.span
            className="absolute inset-0 rounded-full pointer-events-none"
            animate={{
              background: hovered
                ? "radial-gradient(circle at 50% 120%, rgba(200,169,126,0.45) 0%, rgba(47,62,54,0) 70%)"
                : "radial-gradient(circle at 50% 120%, rgba(200,169,126,0) 0%, rgba(47,62,54,0) 70%)",
            }}
            transition={{ duration: 0.3 }}
            aria-hidden="true"
          />
          <motion.span
            animate={{ color: hovered ? "#C8A97E" : "#FAF9F5" }}
            transition={{ duration: 0.25 }}
            className="relative z-10 flex items-center justify-center"
          >
            <ArrowUp size={20} aria-hidden="true" />
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
