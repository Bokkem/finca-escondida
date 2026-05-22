"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ease, duration } from "@/lib/motion-tokens";
import MagneticButton from "@/components/ui/MagneticButton";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import FeLogo from "@/components/ui/FeLogo";

export default function Header() {
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [menuOpen, lenis]);

  const scrollTo = (id: string) => {
    lenis?.start();
    document.body.style.overflow = "";
    setMenuOpen(false);
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) lenis?.scrollTo(el, { immediate: true });
    });
  };

  useEffect(() => {
    if (!menuOpen) return;
    const el = menuRef.current;
    if (!el) return;

    const focusables = Array.from(
      el.querySelectorAll<HTMLElement>("button:not([disabled]), [href], [tabindex]:not([tabindex='-1'])")
    );
    focusables[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

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
        style={{ WebkitBackdropFilter: scrolled ? "blur(12px)" : "blur(0px)" }}
      >
        <button
          onClick={() => lenis?.scrollTo(0, { immediate: true })}
          className="flex items-center gap-3"
          aria-label="Finca Escondida, back to top"
        >
          <FeLogo size={30} />
          <span className="font-heading text-xl tracking-widest uppercase text-olive">Finca Escondida</span>
        </button>

        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {[
            { label: "The Villa", id: "features" },
            { label: "Gallery", id: "gallery" },
            { label: "Amenities", id: "amenities" },
            { label: "Location", id: "location" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-sm tracking-widest uppercase text-muted hover:text-olive transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive rounded-sm"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <MagneticButton
            onClick={() => scrollTo("booking")}
            className="hidden md:inline-flex items-center px-6 py-2.5 border border-olive/40 text-olive text-sm tracking-widest uppercase rounded-full hover:border-olive hover:bg-olive/5 transition-colors duration-200"
            aria-label="Get in touch"
          >
            Get in Touch
          </MagneticButton>

          <MagneticButton
            onClick={() => scrollTo("booking")}
            className="hidden md:inline-flex items-center px-6 py-2.5 bg-olive text-cream text-sm tracking-widest uppercase rounded-full hover:bg-olive-light transition-colors duration-200"
            aria-label="Reserve the villa"
          >
            Reserve
          </MagneticButton>
        </div>

        <button
          ref={hamburgerRef}
          className="md:hidden flex flex-col gap-1.5 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive rounded-sm"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className={`block w-6 h-px bg-olive transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[10px]" : ""}`} />
          <span className={`block w-6 h-px bg-olive transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-olive transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[10px]" : ""}`} />
        </button>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            className="fixed inset-0 z-40 bg-cream flex flex-col items-center justify-center gap-8 touch-none overscroll-none"
            style={{ height: "var(--hero-height, 100dvh)" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: duration.meso, ease: ease.enter }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {[
              { label: "The Villa", id: "features", key: "features" },
              { label: "Gallery", id: "gallery", key: "gallery" },
              { label: "Amenities", id: "amenities", key: "amenities" },
              { label: "Location", id: "location", key: "location" },
              { label: "Get in Touch", id: "booking", key: "booking-contact" },
              { label: "Reserve", id: "booking", key: "booking-reserve" },
            ].map((item, i) => (
              <motion.button
                key={item.key}
                onClick={() => scrollTo(item.id)}
                className="font-heading text-4xl text-olive hover:text-olive-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive rounded-sm"
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
