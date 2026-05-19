"use client";

import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { ease, duration } from "@/lib/motion-tokens";

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
          <h2 className="font-heading text-5xl md:text-6xl leading-tight mb-6">
            Northern<br /><em className="italic">Ibiza</em>
          </h2>
          <p className="text-cream/70 text-lg leading-relaxed mb-10 max-w-md">
            Nestled in the secluded hills of San Carlos, Finca Escondida is 35 minutes from Ibiza Airport and 8 minutes from the pristine coves of the north.
          </p>
          <dl className="space-y-4">
            {[
              { label: "Address", value: "San Carlos, Ibiza, Spain" },
              { label: "Airport", value: "35 min — Ibiza Airport (IBZ)" },
              { label: "Nearest beach", value: "8 min — Cala Mastella" },
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
          className="aspect-video rounded-2xl overflow-hidden bg-olive-light/30 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: duration.macro, ease: ease.enter, delay: 0.15 }}
          aria-label="Kaartweergave — Finca Escondida locatie in Ibiza"
        >
          <div className="text-center">
            <MapPin size={48} className="text-cream/20 mx-auto mb-3" aria-hidden="true" />
            <p className="text-cream/30 text-sm tracking-widest uppercase">San Carlos, Ibiza</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
