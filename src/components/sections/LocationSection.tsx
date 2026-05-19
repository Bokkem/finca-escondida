"use client";

import { motion } from "motion/react";
import { ease, duration } from "@/lib/motion-tokens";
import RevealText from "@/components/ui/RevealText";

export default function LocationSection() {
  return (
    <section id="location" className="py-24 md:py-36 px-6 bg-olive text-cream" aria-label="Locatie">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: duration.macro, ease: ease.enter }}
        >
          <p className="text-cream/50 text-sm tracking-[0.3em] uppercase mb-4">Getting Here</p>
          <RevealText as="h2" className="font-heading text-5xl md:text-6xl leading-tight mb-6" delay={0.1}>
            Northern Ibiza
          </RevealText>
          <p className="text-cream/70 text-lg leading-relaxed mb-10 max-w-md">
            Nestled in the secluded hills of San Carlos, Finca Escondida is 35 minutes from Ibiza Airport and just eight minutes from the pristine coves of the north coast.
          </p>
          <dl className="space-y-4">
            {[
              { label: "Address", value: "San Carlos, Ibiza, Spain" },
              { label: "Airport", value: "35 min, Ibiza Airport (IBZ)" },
              { label: "Nearest beach", value: "8 min, Cala Mastella" },
              { label: "Ibiza Town", value: "25 min" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between border-b border-cream/10 pb-4">
                <dt className="text-sm text-cream/50">{label}</dt>
                <dd className="text-sm text-cream font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          className="aspect-video rounded-2xl overflow-hidden bg-olive-light/20 flex items-center justify-center relative"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: duration.macro, ease: ease.enter, delay: 0.15 }}
          aria-label="Ibiza island map — San Carlos location marked"
        >
          <svg
            viewBox="0 0 500 340"
            className="w-full h-full p-8"
            aria-hidden="true"
          >
            {/* Ibiza island outline */}
            <path
              d="M 80 240 C 70 220 65 200 72 180 C 78 162 90 150 105 138 C 118 127 130 118 148 110 C 165 102 180 98 200 94 C 218 90 235 88 252 86 C 268 84 282 83 298 85 C 315 87 330 92 344 100 C 358 108 368 118 378 130 C 388 142 394 155 396 168 C 398 181 394 193 388 204 C 382 215 373 224 362 232 C 350 240 337 246 322 250 C 307 254 291 256 275 258 C 258 260 241 261 224 260 C 207 259 190 256 174 252 C 158 248 143 242 130 236 C 117 230 105 223 95 218 C 88 214 83 228 80 240 Z"
              fill="none"
              stroke="rgba(250,249,245,0.25)"
              strokeWidth="1.5"
            />
            {/* Island fill */}
            <path
              d="M 80 240 C 70 220 65 200 72 180 C 78 162 90 150 105 138 C 118 127 130 118 148 110 C 165 102 180 98 200 94 C 218 90 235 88 252 86 C 268 84 282 83 298 85 C 315 87 330 92 344 100 C 358 108 368 118 378 130 C 388 142 394 155 396 168 C 398 181 394 193 388 204 C 382 215 373 224 362 232 C 350 240 337 246 322 250 C 307 254 291 256 275 258 C 258 260 241 261 224 260 C 207 259 190 256 174 252 C 158 248 143 242 130 236 C 117 230 105 223 95 218 C 88 214 83 228 80 240 Z"
              fill="rgba(250,249,245,0.06)"
            />
            {/* Formentera (small island below) */}
            <ellipse cx="240" cy="295" rx="38" ry="10" fill="none" stroke="rgba(250,249,245,0.15)" strokeWidth="1" />
            <ellipse cx="240" cy="295" rx="38" ry="10" fill="rgba(250,249,245,0.04)" />

            {/* Ibiza Town label */}
            <text x="180" y="210" fill="rgba(250,249,245,0.3)" fontSize="9" fontFamily="system-ui" letterSpacing="2" textAnchor="middle">IBIZA TOWN</text>
            <circle cx="180" cy="218" r="2" fill="rgba(250,249,245,0.3)" />

            {/* San Carlos pin location (northeast, ~x=340 y=130) */}
            {/* Pulse ring */}
            <circle cx="338" cy="132" r="14" fill="none" stroke="rgba(200,169,126,0.3)" strokeWidth="1">
              <animate attributeName="r" values="10;20;10" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite" />
            </circle>
            {/* Pin dot */}
            <circle cx="338" cy="132" r="5" fill="#C8A97E" />
            <circle cx="338" cy="132" r="3" fill="#FAF9F5" />

            {/* San Carlos label */}
            <text x="338" y="118" fill="rgba(200,169,126,0.9)" fontSize="8" fontFamily="system-ui" letterSpacing="2" textAnchor="middle">SAN CARLOS</text>

            {/* Formentera label */}
            <text x="240" y="298" fill="rgba(250,249,245,0.2)" fontSize="7" fontFamily="system-ui" letterSpacing="1.5" textAnchor="middle">FORMENTERA</text>

            {/* Compass rose — bottom right */}
            <g transform="translate(455, 290)">
              <line x1="0" y1="-12" x2="0" y2="12" stroke="rgba(250,249,245,0.2)" strokeWidth="0.8" />
              <line x1="-12" y1="0" x2="12" y2="0" stroke="rgba(250,249,245,0.2)" strokeWidth="0.8" />
              <text x="0" y="-16" fill="rgba(250,249,245,0.35)" fontSize="7" fontFamily="system-ui" textAnchor="middle">N</text>
            </g>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
