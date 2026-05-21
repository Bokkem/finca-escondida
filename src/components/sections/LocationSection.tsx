"use client";

import { motion } from "motion/react";
import { ease, duration } from "@/lib/motion-tokens";
import RevealText from "@/components/ui/RevealText";

export default function LocationSection() {
  return (
    <section id="location" className="py-24 md:py-36 px-6 bg-olive text-cream" aria-label="Location">
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
          className="aspect-video rounded-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: duration.macro, ease: ease.enter, delay: 0.15 }}
        >
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=1.1%2C38.8%2C1.9%2C39.2&layer=mapnik&marker=39.036%2C1.536"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "sepia(30%) saturate(80%) brightness(90%)" }}
            loading="lazy"
            title="Finca Escondida location — San Carlos, Ibiza"
            aria-label="Map showing Finca Escondida location in San Carlos, Ibiza"
          />
        </motion.div>
      </div>
    </section>
  );
}
