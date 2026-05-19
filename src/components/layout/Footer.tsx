"use client";

import { useLenis } from "@/components/providers/SmoothScrollProvider";

export default function Footer() {
  const lenis = useLenis();
  const year = new Date().getFullYear();

  const scrollToTop = () => lenis?.scrollTo(0, { immediate: true });

  return (
    <footer className="bg-[#1A1A1A] text-cream/40 py-12 px-6" role="contentinfo">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
        <button
          onClick={scrollToTop}
          className="font-heading text-lg text-cream/70 tracking-widest hover:text-cream transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-cream"
          aria-label="Finca Escondida — back to top"
        >
          Finca Escondida
        </button>

        <p className="text-xs tracking-widest uppercase">San Carlos, Ibiza, Spain</p>

        <p className="text-xs text-center md:text-right">
          &copy; {year} Finca Escondida. All rights reserved.{" "}
          <span className="text-cream/20 mx-1">|</span>{" "}
          <a
            href="https://www.rideko.nl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream/40 hover:text-cream/70 transition-colors duration-200 underline underline-offset-2"
          >
            Rideko Webdesign
          </a>
        </p>
      </div>
    </footer>
  );
}
