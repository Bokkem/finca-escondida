"use client";

import { motion } from "motion/react";
import { Wifi, Car, Anchor, Shield, Sun, Music } from "lucide-react";
import { amenities } from "@/lib/mock-data";
import { ease, duration, stagger } from "@/lib/motion-tokens";

const iconMap: Record<string, React.ReactNode> = {
  wifi: <Wifi size={24} aria-hidden="true" />,
  car: <Car size={24} aria-hidden="true" />,
  boat: <Anchor size={24} aria-hidden="true" />,
  shield: <Shield size={24} aria-hidden="true" />,
  sun: <Sun size={24} aria-hidden="true" />,
  music: <Music size={24} aria-hidden="true" />,
};

export default function AmenitiesSection() {
  return (
    <section id="amenities" className="py-24 md:py-36 px-6 bg-cream" aria-label="Voorzieningen en diensten">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: duration.macro, ease: ease.enter }}
        >
          <p className="text-muted text-sm tracking-[0.3em] uppercase mb-4">Services</p>
          <h2 className="font-heading text-5xl md:text-7xl text-olive max-w-xl leading-tight">
            Nothing left<br />to <em className="italic">chance</em>
          </h2>
        </motion.div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {amenities.map((amenity, i) => (
            <motion.div
              key={amenity.title}
              className="bg-cream p-8 md:p-10 flex gap-5 items-start group hover:bg-[#F5F3EE] transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: duration.meso, ease: ease.enter, delay: i * stagger.normal }}
            >
              <span className="text-olive/60 group-hover:text-olive transition-colors duration-300 mt-0.5 shrink-0">
                {iconMap[amenity.icon]}
              </span>
              <div>
                <dt className="font-heading text-xl text-olive mb-1">{amenity.title}</dt>
                <dd className="text-muted text-sm leading-relaxed">{amenity.description}</dd>
              </div>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
