"use client";

import { useLenis } from "@/components/providers/SmoothScrollProvider";
import FeLogo from "@/components/ui/FeLogo";
import { MessageCircle, Facebook, Instagram } from "lucide-react";

const socials = [
  { icon: MessageCircle, label: "WhatsApp" },
  { icon: Facebook,      label: "Facebook" },
  { icon: Instagram,     label: "Instagram" },
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
          {socials.map(({ icon: Icon, label }) => (
            <a
              key={label}
              href="https://www.rideko.nl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-9 h-9 rounded-lg border border-[#C8A97E]/40 grid place-items-center text-[#C8A97E]/60 hover:border-[#C8A97E] hover:text-[#C8A97E] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-cream"
            >
              <Icon size={16} />
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
