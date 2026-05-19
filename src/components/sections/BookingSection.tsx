"use client";

import { motion } from "motion/react";
import ReservationWizard from "@/components/ui/ReservationWizard";
import { ease, duration } from "@/lib/motion-tokens";

export default function BookingSection() {
  return (
    <section id="booking" className="py-24 md:py-36 px-6 bg-[#F2F0EB]" aria-label="Reservering">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: duration.macro, ease: ease.enter }}
        >
          <p className="text-muted text-sm tracking-[0.3em] uppercase mb-4">Reservations</p>
          <h2 className="font-heading text-5xl md:text-6xl text-olive leading-tight mb-6">
            Begin your<br /><em className="italic">escape</em>
          </h2>
          <p className="text-muted text-lg leading-relaxed mb-8 max-w-md">
            Finca Escondida is available for exclusive hire throughout the year. Our team will confirm availability and tailor your stay within 24 hours.
          </p>
          <dl className="space-y-4">
            {[
              { label: "Low season", value: "from €1,850 per night" },
              { label: "High season (Jun to Sep)", value: "from €2,950 per night" },
              { label: "Minimum stay", value: "7 nights" },
              { label: "Capacity", value: "Up to 14 guests" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between border-b border-border pb-4">
                <dt className="text-sm text-muted">{label}</dt>
                <dd className="text-sm text-olive font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: duration.macro, ease: ease.enter, delay: 0.15 }}
        >
          <ReservationWizard />
        </motion.div>
      </div>
    </section>
  );
}
