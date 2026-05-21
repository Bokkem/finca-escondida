"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 40 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40 });

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleEnter = () => setHovering(true);
    const handleLeave = () => setHovering(false);

    window.addEventListener("mousemove", move);

    const interactives = document.querySelectorAll("a, button, [role='button'], input, select, textarea, label");
    interactives.forEach(el => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      interactives.forEach(el => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [cursorX, cursorY, visible]);

  if (!visible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[999] pointer-events-none rounded-full bg-olive mix-blend-multiply hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovering ? 40 : 10,
          height: hovering ? 40 : 10,
          opacity: hovering ? 0.25 : 0.7,
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />
      <motion.div
        className="fixed top-0 left-0 z-[999] pointer-events-none rounded-full border border-olive hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovering ? 56 : 32,
          height: hovering ? 56 : 32,
          opacity: hovering ? 0.6 : 0.3,
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />
    </>
  );
}
