"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface ClipRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  radius?: string;
  direction?: "up" | "right";
}

export default function ClipReveal({
  children,
  className = "",
  delay = 0,
  radius = "0px",
  direction = "up",
}: ClipRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const hidden =
    direction === "up"
      ? `inset(100% 0 0 0 round ${radius})`
      : `inset(0 100% 0 0 round ${radius})`;
  const visible = `inset(0% 0% 0% 0% round ${radius})`;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ clipPath: hidden }}
      animate={{ clipPath: inView ? visible : hidden }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
