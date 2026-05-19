"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ease, duration } from "@/lib/motion-tokens";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-6 py-5 flex items-center justify-between"
        animate={{
          backgroundColor: scrolled ? "rgba(250, 249, 245, 0.92)" : "rgba(250, 249, 245, 0)",
          backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
          borderBottomWidth: "1px",
          borderBottomColor: scrolled ? "rgba(232, 228, 220, 0.8)" : "rgba(232, 228, 220, 0)",
        }}
        transition={{ duration: duration.meso, ease: ease.smooth }}
      >
        <button
          onClick={() => scrollTo("hero")}
          className="font-heading text-xl tracking-widest uppercase text-olive"
          aria-label="Finca Escondida — terug naar boven"
        >
          Finca Escondida
        </button>

        <nav className="hidden md:flex items-center gap-8" aria-label="Hoofdnavigatie">
          {[
            { label: "The Villa", id: "features" },
            { label: "Gallery", id: "gallery" },
            { label: "Amenities", id: "amenities" },
            { label: "Location", id: "location" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-sm tracking-widest uppercase text-muted hover:text-olive transition-colors duration-200"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => scrollTo("booking")}
          className="hidden md:inline-flex items-center px-6 py-2.5 bg-olive text-cream text-sm tracking-widest uppercase rounded-full hover:bg-olive-light transition-colors duration-200"
          aria-label="Reservering maken"
        >
          Reserve
        </button>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Menu sluiten" : "Menu openen"}
          aria-expanded={menuOpen}
        >
          <span className={`block w-6 h-px bg-olive transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[10px]" : ""}`} />
          <span className={`block w-6 h-px bg-olive transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-olive transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[10px]" : ""}`} />
        </button>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-cream flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: duration.meso, ease: ease.enter }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigatiemenu"
          >
            {[
              { label: "The Villa", id: "features" },
              { label: "Gallery", id: "gallery" },
              { label: "Amenities", id: "amenities" },
              { label: "Location", id: "location" },
              { label: "Reserve", id: "booking" },
            ].map((item, i) => (
              <motion.button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="font-heading text-4xl text-olive hover:text-olive-light transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: duration.meso, ease: ease.enter }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
