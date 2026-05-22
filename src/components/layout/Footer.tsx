"use client";

import { useLenis } from "@/components/providers/SmoothScrollProvider";
import FeLogo from "@/components/ui/FeLogo";
const socials = [
  {
    label: "WhatsApp",
    svg: <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />,
  },
  {
    label: "Facebook",
    svg: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />,
  },
  {
    label: "Instagram",
    svg: (<><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>),
  },
];

export default function Footer() {
  const lenis = useLenis();
  const year = new Date().getFullYear();

  const scrollToTop = () => lenis?.scrollTo(0, { immediate: true });

  return (
    <footer className="bg-[#1A1A1A] text-cream/40 py-12 px-6" role="contentinfo">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
        <button
          onClick={scrollToTop}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200 focus-visible:outline-2 focus-visible:outline-cream"
          aria-label="Finca Escondida, back to top"
        >
          <FeLogo size={28} />
          <span className="font-heading text-lg text-cream/70 tracking-widest">Finca Escondida</span>
        </button>

        <p className="text-xs tracking-widest uppercase">San Carlos, Ibiza, Spain</p>

        <div className="flex items-center gap-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href="https://www.rideko.nl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-9 h-9 rounded-lg border border-[#C8A97E]/40 grid place-items-center text-[#C8A97E]/60 hover:border-[#C8A97E] hover:text-[#C8A97E] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-cream"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {s.svg}
              </svg>
            </a>
          ))}
        </div>

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
