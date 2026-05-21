"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { bentoFeatures } from "@/lib/mock-data";
import { ease, duration, stagger } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";
import RevealText from "@/components/ui/RevealText";

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 md:py-36 px-6 bg-cream" aria-label="Villa features">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: duration.macro, ease: ease.enter }}
        >
          <p className="text-muted text-sm tracking-[0.3em] uppercase mb-4">The Experience</p>
          <RevealText as="h2" className="font-heading text-5xl md:text-7xl text-olive max-w-2xl leading-tight" delay={0.1}>
            A world unto itself
          </RevealText>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:auto-rows-[320px]">
          {bentoFeatures.map((feature, i) => (
            <motion.article
              key={feature.id}
              className={cn(
                "relative overflow-hidden rounded-card group min-h-[280px]",
                feature.size === "large" && "lg:col-span-2 lg:row-span-2",
              )}
              initial={{ clipPath: "inset(100% 0 0 0 round 1.25rem)" }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0% round 1.25rem)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: i * stagger.loose }}
              style={{ boxShadow: "var(--shadow-card)" }}
              whileHover={{ boxShadow: "var(--shadow-card-hover)", y: -4 }}
              aria-label={feature.title}
            >
              <Image
                src={feature.image}
                alt={`${feature.title}: ${feature.description}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="font-heading text-cream text-2xl md:text-3xl mb-2">{feature.title}</h3>
                <p className="text-cream/75 text-sm leading-relaxed max-w-sm">{feature.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
