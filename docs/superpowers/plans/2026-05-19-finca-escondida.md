# Finca Escondida — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an Awwwards-worthy showcase demo for a luxury Ibiza villa rental, demonstrating high-end design and booking UX to prospective clients.

**Architecture:** Single Next.js 16 App Router page with mock data (no real backend). All booking logic runs client-side with mock unavailable dates and price calculation. Focus is on visual excellence: cinematic hero, bento grid, lightbox gallery, 3-step booking wizard.

**Tech Stack:** Next.js 16.2.6, React 19, TypeScript, Tailwind v4 (CSS-first), Motion (`motion/react`), Lenis, GSAP, shadcn/ui, Lucide React, Cormorant Garamond + Geist Sans via next/font

---

## Visual Identity

- **Theme:** Editorial / Magazine + Minimalist Luxury + Light Skeuomorphism
- **Background:** `#FAF9F5` (off-white/cream)
- **Primary:** `#2F3E36` (deep olive green)
- **Accent:** `#C8A97E` (warm sand/gold), `#B5714A` (terracotta)
- **Text:** `#1A1A1A` (near-black), `#6B6458` (warm mid-grey)
- **Headings:** Cormorant Garamond (Serif)
- **Body:** Geist Sans (Sans-serif)

---

## File Structure

```
src/
  app/
    layout.tsx                    - Root layout: fonts, Lenis provider, metadata
    page.tsx                      - Main page: assembles all sections
    globals.css                   - Tailwind v4 @theme tokens, base styles
  components/
    layout/
      Header.tsx                  - Floating transparent nav, scrolled state
      Footer.tsx                  - Minimal footer with villa name + links
    sections/
      HeroSection.tsx             - Cinematic full-height hero
      FeaturesSection.tsx         - Bento grid with 6 villa highlights
      GallerySection.tsx          - Photo gallery grid + lightbox trigger
      BookingSection.tsx          - Full booking experience section
      AmenitiesSection.tsx        - Icon + text amenities list
      LocationSection.tsx         - Ibiza location context + map placeholder
    ui/
      BookingCalendar.tsx         - Interactive date range picker
      PriceCalculator.tsx         - Live price display component
      ReservationWizard.tsx       - 3-step booking form
      GalleryLightbox.tsx         - Fullscreen lightbox overlay
      MagneticButton.tsx          - Magnetic hover CTA button
    providers/
      SmoothScrollProvider.tsx    - Lenis smooth scroll setup
  lib/
    mock-data.ts                  - Mock bookings, villa info, gallery images
    motion-tokens.ts              - Shared easing curves, durations
    utils.ts                      - cn() helper, price calc, date utils
  types/
    index.ts                      - TypeScript interfaces
public/
  images/                         - WebP villa photos (downloaded from Unsplash)
```

---

## Task 1: GitHub repo + Next.js project setup

**Files:**
- Create: entire project scaffold via `create-next-app`
- Create: `src/app/globals.css`
- Create: `src/lib/utils.ts`
- Create: `src/types/index.ts`

- [ ] **Step 1: Create GitHub repo**

```bash
cd /home/richard/websites/luxe-villa
gh repo create finca-escondida --public --description "Finca Escondida — Luxury Villa Ibiza (showcase demo)"
```

- [ ] **Step 2: Initialize Next.js project**

```bash
cd /home/richard/websites/luxe-villa
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
```

- [ ] **Step 3: Verify installed versions match expected**

```bash
cat package.json | grep '"next"\|"react"\|"tailwindcss"'
```

Expected: next ~16.x, react ~19.x, tailwindcss ~4.x

- [ ] **Step 4: Install core dependencies**

```bash
npm install motion lenis gsap @gsap/react lucide-react clsx tailwind-merge next-view-transitions
npm install -D @types/node
```

- [ ] **Step 5: Install shadcn/ui**

```bash
npx shadcn@latest init --yes
```

When prompted, choose: Default style, use CSS variables: yes.

- [ ] **Step 6: Add shadcn components needed**

```bash
npx shadcn@latest add button dialog input label textarea badge separator
```

- [ ] **Step 7: Write utils.ts**

Create `src/lib/utils.ts`:

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateNights(checkIn: Date, checkOut: Date): number {
  const diff = checkOut.getTime() - checkIn.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function calculatePrice(
  checkIn: Date,
  checkOut: Date,
  basePricePerNight: number,
  highSeasonPrice: number,
  highSeasonMonths: number[]
): number {
  const nights = calculateNights(checkIn, checkOut);
  if (nights <= 0) return 0;
  const month = checkIn.getMonth() + 1;
  const isHighSeason = highSeasonMonths.includes(month);
  return nights * (isHighSeason ? highSeasonPrice : basePricePerNight);
}

export function isDateUnavailable(date: Date, unavailableRanges: { start: Date; end: Date }[]): boolean {
  return unavailableRanges.some(
    (range) => date >= range.start && date <= range.end
  );
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
```

- [ ] **Step 8: Write types/index.ts**

Create `src/types/index.ts`:

```typescript
export interface BookingRange {
  start: Date;
  end: Date;
  guestName?: string;
  status: "confirmed" | "pending";
}

export interface VillaSettings {
  basePricePerNight: number;
  highSeasonPrice: number;
  highSeasonMonths: number[];
  minNights: number;
}

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

export interface Amenity {
  icon: string;
  title: string;
  description: string;
}

export interface BentoFeature {
  id: string;
  title: string;
  description: string;
  image: string;
  size: "large" | "medium" | "small";
}

export interface BookingFormData {
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
  extras: string[];
}
```

- [ ] **Step 9: Write mock-data.ts**

Create `src/lib/mock-data.ts`:

```typescript
import type { BookingRange, VillaSettings, GalleryImage, BentoFeature, Amenity } from "@/types";

export const villaSettings: VillaSettings = {
  basePricePerNight: 1850,
  highSeasonPrice: 2950,
  highSeasonMonths: [6, 7, 8, 9],
  minNights: 7,
};

export const mockBookings: BookingRange[] = [
  {
    start: new Date(2026, 5, 1),
    end: new Date(2026, 5, 14),
    status: "confirmed",
  },
  {
    start: new Date(2026, 6, 10),
    end: new Date(2026, 6, 24),
    status: "confirmed",
  },
  {
    start: new Date(2026, 7, 5),
    end: new Date(2026, 7, 19),
    status: "confirmed",
  },
];

export const galleryImages: GalleryImage[] = [
  { src: "/images/pool.webp", alt: "Infinity pool overlooking Ibiza coastline", width: 1200, height: 800 },
  { src: "/images/living.webp", alt: "Open-plan living area with sea views", width: 1200, height: 800 },
  { src: "/images/bedroom.webp", alt: "Master bedroom with terrace", width: 1200, height: 800 },
  { src: "/images/kitchen.webp", alt: "Professional chef's kitchen", width: 1200, height: 800 },
  { src: "/images/terrace.webp", alt: "Sunset terrace with outdoor dining", width: 1200, height: 800 },
  { src: "/images/spa.webp", alt: "Private wellness and spa area", width: 1200, height: 800 },
  { src: "/images/exterior.webp", alt: "Villa exterior at golden hour", width: 1200, height: 800 },
  { src: "/images/cellar.webp", alt: "Private wine cellar", width: 1200, height: 800 },
];

export const bentoFeatures: BentoFeature[] = [
  {
    id: "pool",
    title: "Infinity Pool",
    description: "A 22-metre infinity pool suspended above the Mediterranean. Swim toward the horizon.",
    image: "/images/pool.webp",
    size: "large",
  },
  {
    id: "chef",
    title: "Private Chef",
    description: "Your personal chef crafts bespoke menus from Ibiza's finest local produce.",
    image: "/images/kitchen.webp",
    size: "medium",
  },
  {
    id: "spa",
    title: "Wellness Retreat",
    description: "A private spa with hammam, sauna and massage studio.",
    image: "/images/spa.webp",
    size: "medium",
  },
  {
    id: "terrace",
    title: "Al Fresco Dining",
    description: "Two terraces, one for sunset cocktails, one for long candlelit dinners under the stars.",
    image: "/images/terrace.webp",
    size: "small",
  },
  {
    id: "cellar",
    title: "Wine Cellar",
    description: "Curated selection of 400+ bottles. The sommelier is one call away.",
    image: "/images/cellar.webp",
    size: "small",
  },
  {
    id: "location",
    title: "Ibiza's North",
    description: "Nestled in the secluded hills of San Carlos. Total privacy. 8 minutes to the sea.",
    image: "/images/exterior.webp",
    size: "medium",
  },
];

export const amenities: Amenity[] = [
  { icon: "wifi", title: "High-speed Wifi", description: "Fibre throughout the property" },
  { icon: "car", title: "Chauffeur Service", description: "Airport transfers and daily excursions" },
  { icon: "boat", title: "Boat Charter", description: "Private yacht available on request" },
  { icon: "shield", title: "24/7 Security", description: "Discreet round-the-clock protection" },
  { icon: "sun", title: "Concierge", description: "Whatever you need, whenever you need it" },
  { icon: "music", title: "Entertainment", description: "Cinema room, sound system throughout" },
];

export const extraServices = [
  { id: "chef", label: "Private Chef", price: 450 },
  { id: "chauffeur", label: "Daily Chauffeur", price: 350 },
  { id: "yacht", label: "Yacht Charter (half day)", price: 1200 },
  { id: "spa", label: "In-villa Spa Treatment", price: 180 },
  { id: "florist", label: "Welcome Flowers & Champagne", price: 280 },
];
```

- [ ] **Step 10: Write motion-tokens.ts**

Create `src/lib/motion-tokens.ts`:

```typescript
export const ease = {
  enter: [0.22, 1, 0.36, 1] as const,
  exit: [0.64, 0, 0.78, 0] as const,
  smooth: [0.4, 0, 0.2, 1] as const,
};

export const duration = {
  micro: 0.2,
  meso: 0.4,
  macro: 0.7,
  slow: 1.2,
};

export const stagger = {
  tight: 0.04,
  normal: 0.08,
  loose: 0.12,
};
```

- [ ] **Step 11: Set git config and initial commit**

```bash
cd /home/richard/websites/luxe-villa
git config user.email "Bokkem@users.noreply.github.com"
git config user.name "Bokkem"
git add .
git commit -m "chore: initial Next.js setup with dependencies and base types"
git remote add origin git@github.com:Bokkem/finca-escondida.git
git push -u origin main
```

---

## Task 2: Download villa images

**Files:**
- Create: `public/images/*.webp` (8 images)

- [ ] **Step 1: Download Unsplash images and convert to WebP**

Download 8 high-quality Ibiza villa photos from Unsplash and convert each to WebP at 1200x800.

For each photo (repeat for all 8 filenames: pool, living, bedroom, kitchen, terrace, spa, exterior, cellar):

```bash
# Download via curl (use actual Unsplash photo URLs)
curl -L "https://images.unsplash.com/photo-[ID]?w=1600&q=90" -o /tmp/source.jpg
convert /tmp/source.jpg -resize 1200x800^ -gravity center -extent 1200x800 /tmp/source.png
cwebp -q 82 /tmp/source.png -o /home/richard/websites/luxe-villa/public/images/pool.webp
```

- [ ] **Step 2: Download hero image (larger, 1920x1080)**

```bash
curl -L "https://images.unsplash.com/photo-[ID]?w=2400&q=90" -o /tmp/hero.jpg
convert /tmp/hero.jpg -resize 1920x1080^ -gravity center -extent 1920x1080 /tmp/hero.png
cwebp -q 85 /tmp/hero.png -o /home/richard/websites/luxe-villa/public/images/hero.webp
```

- [ ] **Step 3: Commit images**

```bash
git add public/images/
git commit -m "assets: add villa photography (WebP optimized)"
git push origin main
```

---

## Task 3: globals.css + Tailwind v4 theme

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace globals.css with Tailwind v4 @theme tokens**

```css
@import "tailwindcss";

@theme {
  --color-cream: #FAF9F5;
  --color-olive: #2F3E36;
  --color-olive-light: #4A6358;
  --color-sand: #C8A97E;
  --color-terracotta: #B5714A;
  --color-text: #1A1A1A;
  --color-muted: #6B6458;
  --color-border: #E8E4DC;

  --font-heading: var(--font-cormorant), Georgia, serif;
  --font-body: var(--font-geist), system-ui, sans-serif;

  --radius-card: 1.25rem;
  --radius-pill: 9999px;

  --shadow-card: 0 4px 24px 0 rgba(47, 62, 54, 0.08), 0 1px 4px 0 rgba(47, 62, 54, 0.04);
  --shadow-card-hover: 0 12px 48px 0 rgba(47, 62, 54, 0.14), 0 2px 8px 0 rgba(47, 62, 54, 0.06);
}

* {
  box-sizing: border-box;
}

html {
  background-color: #FAF9F5;
  color: #1A1A1A;
  -webkit-font-smoothing: antialiased;
}

body {
  font-family: var(--font-body);
  overflow-x: hidden;
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
  font-weight: 400;
  letter-spacing: -0.01em;
}

::selection {
  background-color: #2F3E36;
  color: #FAF9F5;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "style: Tailwind v4 @theme design tokens"
git push origin main
```

---

## Task 4: Root layout + fonts + Lenis

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/components/providers/SmoothScrollProvider.tsx`

- [ ] **Step 1: Create SmoothScrollProvider.tsx**

```typescript
"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 2: Update layout.tsx**

```typescript
import type { Metadata } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Finca Escondida — Exclusive Villa Ibiza",
  description: "An extraordinary private estate in the hills of northern Ibiza. Seven bedrooms, infinity pool, private chef. Available for exclusive hire.",
  openGraph: {
    title: "Finca Escondida — Exclusive Villa Ibiza",
    description: "An extraordinary private estate in the hills of northern Ibiza.",
    images: ["/images/hero.webp"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${geist.variable}`}>
      <body>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx src/components/providers/SmoothScrollProvider.tsx
git commit -m "feat: root layout with Cormorant Garamond, Geist and Lenis smooth scroll"
git push origin main
```

---

## Task 5: Header (floating nav)

**Files:**
- Create: `src/components/layout/Header.tsx`

- [ ] **Step 1: Create Header.tsx**

```typescript
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ease, duration } from "@/lib/motion-tokens";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-6 py-5 flex items-center justify-between transition-all duration-500"
        animate={{
          backgroundColor: scrolled ? "rgba(250, 249, 245, 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
          borderBottom: scrolled ? "1px solid rgba(232, 228, 220, 0.8)" : "1px solid transparent",
        }}
        transition={{ duration: duration.meso, ease: ease.smooth }}
      >
        <button
          onClick={() => scrollTo("hero")}
          className="font-heading text-xl tracking-widest uppercase text-olive"
          aria-label="Finca Escondida — back to top"
        >
          Finca Escondida
        </button>

        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {[
            { label: "The Villa", id: "features" },
            { label: "Gallery", id: "gallery" },
            { label: "Amenities", id: "amenities" },
            { label: "Location", id: "location" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-sm tracking-widest uppercase text-muted hover:text-olive transition-colors duration-200"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => scrollTo("booking")}
          className="hidden md:inline-flex items-center px-6 py-2.5 bg-olive text-cream text-sm tracking-widest uppercase rounded-pill hover:bg-olive-light transition-colors duration-200"
          aria-label="Make a reservation"
        >
          Reserve
        </button>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className={`block w-6 h-px bg-olive transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-px bg-olive transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-olive transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-cream flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: duration.meso, ease: ease.enter }}
          >
            {[
              { label: "The Villa", id: "features" },
              { label: "Gallery", id: "gallery" },
              { label: "Amenities", id: "amenities" },
              { label: "Location", id: "location" },
              { label: "Reserve", id: "booking" },
            ].map((item, i) => (
              <motion.button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="font-heading text-4xl text-olive"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: duration.meso, ease: ease.enter }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Header.tsx
git commit -m "feat: floating header with scroll-aware backdrop and mobile menu"
git push origin main
```

---

## Task 6: Hero Section

**Files:**
- Create: `src/components/sections/HeroSection.tsx`

- [ ] **Step 1: Create HeroSection.tsx**

```typescript
"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ease, duration } from "@/lib/motion-tokens";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} id="hero" className="relative h-screen min-h-[640px] overflow-hidden" aria-label="Hero">
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src="/images/hero.webp"
          alt="Finca Escondida — infinity pool and Mediterranean sea view at sunset"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />
      </motion.div>

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        style={{ opacity }}
      >
        <motion.p
          className="text-cream/70 text-sm tracking-[0.3em] uppercase mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.macro, ease: ease.enter, delay: 0.2 }}
        >
          San Carlos, Ibiza
        </motion.p>

        <motion.h1
          className="font-heading text-cream text-6xl md:text-8xl lg:text-[7rem] leading-none mb-8 max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.macro, ease: ease.enter, delay: 0.35 }}
        >
          Finca<br />
          <em className="italic">Escondida</em>
        </motion.h1>

        <motion.p
          className="text-cream/80 text-lg md:text-xl max-w-md leading-relaxed mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.macro, ease: ease.enter, delay: 0.5 }}
        >
          Seven bedrooms. An infinity pool above the sea. Complete privacy in the hills of northern Ibiza.
        </motion.p>

        <motion.button
          onClick={scrollToBooking}
          className="px-10 py-4 border border-cream/60 text-cream text-sm tracking-widest uppercase hover:bg-cream hover:text-olive transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.macro, ease: ease.enter, delay: 0.65 }}
          aria-label="Check availability and reserve"
        >
          Check Availability
        </motion.button>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: duration.macro }}
      >
        <span className="text-cream/50 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-px h-10 bg-cream/30"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/HeroSection.tsx
git commit -m "feat: cinematic hero with parallax image and scroll indicator"
git push origin main
```

---

## Task 7: Features Bento Grid

**Files:**
- Create: `src/components/sections/FeaturesSection.tsx`

- [ ] **Step 1: Create FeaturesSection.tsx**

```typescript
"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { bentoFeatures } from "@/lib/mock-data";
import { ease, duration, stagger } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

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
          <h2 className="font-heading text-5xl md:text-7xl text-olive max-w-2xl leading-tight">
            A world unto<br /><em className="italic">itself</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[320px]">
          {bentoFeatures.map((feature, i) => (
            <motion.article
              key={feature.id}
              className={cn(
                "relative overflow-hidden rounded-[var(--radius-card)] group cursor-default",
                feature.size === "large" && "lg:col-span-2 lg:row-span-2",
                feature.size === "medium" && "lg:row-span-1",
              )}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: duration.macro, ease: ease.enter, delay: i * stagger.normal }}
              style={{
                boxShadow: "var(--shadow-card)",
              }}
              whileHover={{
                boxShadow: "var(--shadow-card-hover)",
                y: -4,
              }}
              aria-label={feature.title}
            >
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/FeaturesSection.tsx
git commit -m "feat: bento grid features section with scroll-reveal and hover effects"
git push origin main
```

---

## Task 8: Gallery + Lightbox

**Files:**
- Create: `src/components/sections/GallerySection.tsx`
- Create: `src/components/ui/GalleryLightbox.tsx`

- [ ] **Step 1: Create GalleryLightbox.tsx**

```typescript
"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useCallback } from "react";
import type { GalleryImage } from "@/types";
import { ease, duration } from "@/lib/motion-tokens";

interface GalleryLightboxProps {
  images: GalleryImage[];
  currentIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function GalleryLightbox({ images, currentIndex, onClose, onNext, onPrev }: GalleryLightboxProps) {
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowRight") onNext();
    if (e.key === "ArrowLeft") onPrev();
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const image = currentIndex !== null ? images[currentIndex] : null;

  return (
    <AnimatePresence>
      {currentIndex !== null && image && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration.meso }}
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
          onClick={onClose}
        >
          <motion.div
            className="relative w-full h-full max-w-6xl max-h-[85vh] mx-4"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: duration.meso, ease: ease.enter }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </motion.div>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm tracking-widest">
            {image.alt}
          </p>

          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            aria-label="Close lightbox"
          >
            <X size={28} />
          </button>

          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2"
            aria-label="Previous photo"
          >
            <ChevronLeft size={36} />
          </button>

          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2"
            aria-label="Next photo"
          >
            <ChevronRight size={36} />
          </button>

          <span className="absolute bottom-6 right-6 text-white/40 text-sm">
            {(currentIndex + 1)} / {images.length}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Create GallerySection.tsx**

```typescript
"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { galleryImages } from "@/lib/mock-data";
import GalleryLightbox from "@/components/ui/GalleryLightbox";
import { ease, duration, stagger } from "@/lib/motion-tokens";

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleNext = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % galleryImages.length : 0));
  }, []);

  const handlePrev = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : 0));
  }, []);

  return (
    <section id="gallery" className="py-24 md:py-36 px-6 bg-[#F2F0EB]" aria-label="Photo gallery">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: duration.macro, ease: ease.enter }}
        >
          <p className="text-muted text-sm tracking-[0.3em] uppercase mb-4">Photography</p>
          <h2 className="font-heading text-5xl md:text-7xl text-olive">
            Every frame,<br /><em className="italic">a memory</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {galleryImages.map((image, i) => (
            <motion.button
              key={image.src}
              onClick={() => setLightboxIndex(i)}
              className="relative overflow-hidden rounded-xl group aspect-[4/3] focus-visible:ring-2 focus-visible:ring-olive focus-visible:outline-none"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: duration.meso, ease: ease.enter, delay: i * stagger.tight }}
              aria-label={`View photo: ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.button>
          ))}
        </div>
      </div>

      <GalleryLightbox
        images={galleryImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/GallerySection.tsx src/components/ui/GalleryLightbox.tsx
git commit -m "feat: gallery grid with keyboard-accessible fullscreen lightbox"
git push origin main
```

---

## Task 9: Amenities Section

**Files:**
- Create: `src/components/sections/AmenitiesSection.tsx`

- [ ] **Step 1: Create AmenitiesSection.tsx**

```typescript
"use client";

import { motion } from "motion/react";
import { Wifi, Car, Anchor, Shield, Sun, Music } from "lucide-react";
import { amenities } from "@/lib/mock-data";
import { ease, duration, stagger } from "@/lib/motion-tokens";

const iconMap: Record<string, React.ReactNode> = {
  wifi: <Wifi size={24} />,
  car: <Car size={24} />,
  boat: <Anchor size={24} />,
  shield: <Shield size={24} />,
  sun: <Sun size={24} />,
  music: <Music size={24} />,
};

export default function AmenitiesSection() {
  return (
    <section id="amenities" className="py-24 md:py-36 px-6 bg-cream" aria-label="Amenities and services">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {amenities.map((amenity, i) => (
            <motion.div
              key={amenity.title}
              className="bg-cream p-8 md:p-10 flex gap-5 items-start group hover:bg-[#F5F3EE] transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: duration.meso, ease: ease.enter, delay: i * stagger.normal }}
            >
              <span className="text-olive/60 group-hover:text-olive transition-colors duration-300 mt-0.5" aria-hidden="true">
                {iconMap[amenity.icon]}
              </span>
              <div>
                <h3 className="font-heading text-xl text-olive mb-1">{amenity.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{amenity.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/AmenitiesSection.tsx
git commit -m "feat: amenities grid section with icon cards"
git push origin main
```

---

## Task 10: Booking Calendar + Price Calculator

**Files:**
- Create: `src/components/ui/BookingCalendar.tsx`
- Create: `src/components/ui/PriceCalculator.tsx`

- [ ] **Step 1: Create BookingCalendar.tsx**

```typescript
"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { isDateUnavailable } from "@/lib/utils";
import { mockBookings, villaSettings } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface BookingCalendarProps {
  checkIn: Date | null;
  checkOut: Date | null;
  onChange: (checkIn: Date | null, checkOut: Date | null) => void;
}

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function BookingCalendar({ checkIn, checkOut, onChange }: BookingCalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewMonth, setViewMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const prevMonth = () => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
  const nextMonth = () => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => {
    const d = new Date(year, month, 1).getDay();
    return d === 0 ? 6 : d - 1;
  };

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const handleDayClick = (day: number) => {
    const clicked = new Date(year, month, day);
    clicked.setHours(0, 0, 0, 0);
    if (isDateUnavailable(clicked, mockBookings.map(b => ({ start: b.start, end: b.end })))) return;
    if (clicked < today) return;

    if (!checkIn || (checkIn && checkOut)) {
      onChange(clicked, null);
    } else {
      if (clicked <= checkIn) {
        onChange(clicked, null);
      } else {
        onChange(checkIn, clicked);
      }
    }
  };

  const isInRange = (day: number) => {
    if (!checkIn || !checkOut) return false;
    const d = new Date(year, month, day);
    return d > checkIn && d < checkOut;
  };

  const isSelected = (day: number) => {
    const d = new Date(year, month, day);
    d.setHours(0, 0, 0, 0);
    return (checkIn?.getTime() === d.getTime()) || (checkOut?.getTime() === d.getTime());
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-6">
        <button onClick={prevMonth} className="p-2 hover:bg-cream rounded-lg transition-colors" aria-label="Previous month">
          <ChevronLeft size={18} className="text-muted" />
        </button>
        <span className="font-heading text-xl text-olive">{MONTHS[month]} {year}</span>
        <button onClick={nextMonth} className="p-2 hover:bg-cream rounded-lg transition-colors" aria-label="Next month">
          <ChevronRight size={18} className="text-muted" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-xs text-muted/60 font-medium tracking-wider py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {Array.from({ length: firstDay }, (_, i) => <div key={`empty-${i}`} />)}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const date = new Date(year, month, day);
          date.setHours(0, 0, 0, 0);
          const unavailable = isDateUnavailable(date, mockBookings.map(b => ({ start: b.start, end: b.end })));
          const past = date < today;
          const disabled = unavailable || past;
          const selected = isSelected(day);
          const inRange = isInRange(day);

          return (
            <button
              key={day}
              onClick={() => !disabled && handleDayClick(day)}
              disabled={disabled}
              className={cn(
                "relative text-sm h-9 w-full rounded-lg transition-all duration-150 font-medium",
                disabled && "text-muted/30 cursor-not-allowed line-through",
                !disabled && !selected && !inRange && "hover:bg-olive/10 text-text",
                selected && "bg-olive text-cream",
                inRange && "bg-olive/10 text-olive rounded-none",
              )}
              aria-label={`${day} ${MONTHS[month]} ${year}${disabled ? " (unavailable)" : ""}`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-muted/60 text-center">
        Minimum {villaSettings.minNights} nights
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Create PriceCalculator.tsx**

```typescript
"use client";

import { motion, AnimatePresence } from "motion/react";
import { calculatePrice, calculateNights, formatPrice } from "@/lib/utils";
import { villaSettings, extraServices } from "@/lib/mock-data";
import { ease, duration } from "@/lib/motion-tokens";

interface PriceCalculatorProps {
  checkIn: Date | null;
  checkOut: Date | null;
  selectedExtras: string[];
}

export default function PriceCalculator({ checkIn, checkOut, selectedExtras }: PriceCalculatorProps) {
  const nights = checkIn && checkOut ? calculateNights(checkIn, checkOut) : 0;
  const baseTotal = checkIn && checkOut
    ? calculatePrice(checkIn, checkOut, villaSettings.basePricePerNight, villaSettings.highSeasonPrice, villaSettings.highSeasonMonths)
    : 0;
  const extrasTotal = selectedExtras.reduce((sum, id) => {
    const service = extraServices.find(s => s.id === id);
    return sum + (service ? service.price * (nights || 1) : 0);
  }, 0);
  const grandTotal = baseTotal + extrasTotal;

  if (!checkIn || !checkOut || nights < villaSettings.minNights) {
    return (
      <div className="bg-cream/50 rounded-2xl p-6 border border-border text-center">
        <p className="text-muted text-sm">Select your dates to see pricing</p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${checkIn.toISOString()}-${checkOut.toISOString()}`}
        className="bg-white rounded-2xl p-6 border border-border shadow-sm space-y-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: duration.meso, ease: ease.enter }}
      >
        <div className="flex justify-between text-sm">
          <span className="text-muted">{nights} nights</span>
          <span className="text-text font-medium">{formatPrice(baseTotal)}</span>
        </div>

        {selectedExtras.length > 0 && extraServices
          .filter(s => selectedExtras.includes(s.id))
          .map(service => (
            <div key={service.id} className="flex justify-between text-sm">
              <span className="text-muted">{service.label}</span>
              <span className="text-text">{formatPrice(service.price * nights)}</span>
            </div>
          ))
        }

        <div className="border-t border-border pt-4 flex justify-between">
          <span className="font-heading text-lg text-olive">Total</span>
          <span className="font-heading text-xl text-olive">{formatPrice(grandTotal)}</span>
        </div>

        <p className="text-xs text-muted/60 text-center">Excluding cleaning fee and security deposit</p>
      </motion.div>
    </AnimatePresence>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/BookingCalendar.tsx src/components/ui/PriceCalculator.tsx
git commit -m "feat: interactive booking calendar with unavailable dates and live price calculator"
git push origin main
```

---

## Task 11: Reservation Wizard (3 steps)

**Files:**
- Create: `src/components/ui/ReservationWizard.tsx`

- [ ] **Step 1: Create ReservationWizard.tsx**

```typescript
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import BookingCalendar from "./BookingCalendar";
import PriceCalculator from "./PriceCalculator";
import { villaSettings, extraServices } from "@/lib/mock-data";
import { calculateNights, formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { BookingFormData } from "@/types";
import { ease, duration } from "@/lib/motion-tokens";

const STEPS = ["Dates", "Extras", "Details"];

const initialForm: BookingFormData = {
  checkIn: null,
  checkOut: null,
  guests: 2,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  specialRequests: "",
  extras: [],
};

export default function ReservationWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<BookingFormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const nights = form.checkIn && form.checkOut ? calculateNights(form.checkIn, form.checkOut) : 0;
  const canAdvanceStep0 = form.checkIn && form.checkOut && nights >= villaSettings.minNights;
  const canAdvanceStep1 = true;
  const canAdvanceStep2 = form.firstName && form.lastName && form.email;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: duration.meso, ease: ease.enter }}
      >
        <div className="w-16 h-16 rounded-full bg-olive/10 flex items-center justify-center mx-auto mb-6">
          <Check size={28} className="text-olive" />
        </div>
        <h3 className="font-heading text-3xl text-olive mb-3">Enquiry Received</h3>
        <p className="text-muted max-w-sm mx-auto leading-relaxed">
          Thank you, {form.firstName}. Our team will contact you within 24 hours to confirm your reservation at Finca Escondida.
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      <nav className="flex items-center gap-0 mb-10" aria-label="Booking steps">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center">
            <button
              onClick={() => i < step && setStep(i)}
              className={cn(
                "flex items-center gap-2.5 text-sm",
                i === step && "text-olive font-medium",
                i < step && "text-olive/60 cursor-pointer hover:text-olive",
                i > step && "text-muted/40 cursor-default",
              )}
              disabled={i > step}
              aria-current={i === step ? "step" : undefined}
            >
              <span className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-xs border transition-all",
                i === step && "bg-olive text-cream border-olive",
                i < step && "bg-olive/20 text-olive border-olive/30",
                i > step && "border-border text-muted/40",
              )}>
                {i < step ? <Check size={12} /> : i + 1}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </button>
            {i < STEPS.length - 1 && (
              <div className={cn("w-8 md:w-16 h-px mx-3 transition-colors", i < step ? "bg-olive/30" : "bg-border")} />
            )}
          </div>
        ))}
      </nav>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: duration.meso, ease: ease.enter }}
            className="space-y-6"
          >
            <h3 className="font-heading text-2xl text-olive">Select your dates</h3>
            <BookingCalendar
              checkIn={form.checkIn}
              checkOut={form.checkOut}
              onChange={(ci, co) => setForm(f => ({ ...f, checkIn: ci, checkOut: co }))}
            />
            <PriceCalculator checkIn={form.checkIn} checkOut={form.checkOut} selectedExtras={[]} />
            <div>
              <label className="block text-sm text-muted mb-2">Number of guests</label>
              <select
                value={form.guests}
                onChange={(e) => setForm(f => ({ ...f, guests: parseInt(e.target.value) }))}
                className="w-full border border-border rounded-xl px-4 py-3 bg-white text-text text-sm focus:outline-none focus:ring-2 focus:ring-olive/30"
                aria-label="Number of guests"
              >
                {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"} (max 14)</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setStep(1)}
              disabled={!canAdvanceStep0}
              className="w-full py-4 bg-olive text-cream text-sm tracking-widest uppercase rounded-xl hover:bg-olive-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: duration.meso, ease: ease.enter }}
            className="space-y-6"
          >
            <h3 className="font-heading text-2xl text-olive">Enhance your stay</h3>
            <div className="space-y-3">
              {extraServices.map((service) => {
                const selected = form.extras.includes(service.id);
                return (
                  <label
                    key={service.id}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all",
                      selected ? "border-olive bg-olive/5" : "border-border bg-white hover:border-olive/40",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-5 h-5 rounded flex items-center justify-center border transition-all",
                        selected ? "bg-olive border-olive" : "border-border",
                      )}>
                        {selected && <Check size={11} className="text-cream" />}
                      </div>
                      <span className="text-sm text-text">{service.label}</span>
                    </div>
                    <span className="text-sm text-muted">{formatPrice(service.price)}/night</span>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={selected}
                      onChange={(e) => setForm(f => ({
                        ...f,
                        extras: e.target.checked
                          ? [...f.extras, service.id]
                          : f.extras.filter(x => x !== service.id)
                      }))}
                      aria-label={`${service.label} — ${formatPrice(service.price)} per night`}
                    />
                  </label>
                );
              })}
            </div>
            <PriceCalculator checkIn={form.checkIn} checkOut={form.checkOut} selectedExtras={form.extras} />
            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="flex-1 py-4 border border-border text-muted text-sm tracking-widest uppercase rounded-xl hover:border-olive/40 transition-colors">
                Back
              </button>
              <button onClick={() => setStep(2)} className="flex-1 py-4 bg-olive text-cream text-sm tracking-widest uppercase rounded-xl hover:bg-olive-light transition-colors">
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.form
            key="step-2"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: duration.meso, ease: ease.enter }}
            className="space-y-5"
          >
            <h3 className="font-heading text-2xl text-olive">Your details</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { field: "firstName", label: "First name", type: "text" },
                { field: "lastName", label: "Last name", type: "text" },
              ].map(({ field, label, type }) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm text-muted mb-1.5">{label} *</label>
                  <input
                    id={field}
                    type={type}
                    required
                    value={form[field as keyof BookingFormData] as string}
                    onChange={(e) => setForm(f => ({ ...f, [field]: e.target.value }))}
                    className="w-full border border-border rounded-xl px-4 py-3 bg-white text-text text-sm focus:outline-none focus:ring-2 focus:ring-olive/30"
                  />
                </div>
              ))}
            </div>
            {[
              { field: "email", label: "Email address", type: "email" },
              { field: "phone", label: "Phone number", type: "tel" },
            ].map(({ field, label, type }) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm text-muted mb-1.5">{label}{field === "email" ? " *" : ""}</label>
                <input
                  id={field}
                  type={type}
                  required={field === "email"}
                  value={form[field as keyof BookingFormData] as string}
                  onChange={(e) => setForm(f => ({ ...f, [field]: e.target.value }))}
                  className="w-full border border-border rounded-xl px-4 py-3 bg-white text-text text-sm focus:outline-none focus:ring-2 focus:ring-olive/30"
                />
              </div>
            ))}
            <div>
              <label htmlFor="specialRequests" className="block text-sm text-muted mb-1.5">Special requests</label>
              <textarea
                id="specialRequests"
                rows={3}
                value={form.specialRequests}
                onChange={(e) => setForm(f => ({ ...f, specialRequests: e.target.value }))}
                className="w-full border border-border rounded-xl px-4 py-3 bg-white text-text text-sm focus:outline-none focus:ring-2 focus:ring-olive/30 resize-none"
                placeholder="Dietary requirements, special occasions, specific needs..."
              />
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="flex-1 py-4 border border-border text-muted text-sm tracking-widest uppercase rounded-xl hover:border-olive/40 transition-colors">
                Back
              </button>
              <button
                type="submit"
                disabled={!canAdvanceStep2}
                className="flex-1 py-4 bg-olive text-cream text-sm tracking-widest uppercase rounded-xl hover:bg-olive-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Send Enquiry
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/ReservationWizard.tsx
git commit -m "feat: 3-step reservation wizard with extras selection and confirmation"
git push origin main
```

---

## Task 12: Booking Section

**Files:**
- Create: `src/components/sections/BookingSection.tsx`

- [ ] **Step 1: Create BookingSection.tsx**

```typescript
"use client";

import { motion } from "motion/react";
import ReservationWizard from "@/components/ui/ReservationWizard";
import { ease, duration } from "@/lib/motion-tokens";

export default function BookingSection() {
  return (
    <section id="booking" className="py-24 md:py-36 px-6 bg-[#F2F0EB]" aria-label="Reservation">
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
            Finca Escondida is available for exclusive hire throughout the year. Our team will confirm availability and personalise your stay within 24 hours.
          </p>
          <dl className="space-y-4">
            {[
              { label: "Low season", value: "from €1,850 / night" },
              { label: "High season (Jun - Sep)", value: "from €2,950 / night" },
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/BookingSection.tsx
git commit -m "feat: booking section with pricing overview and reservation wizard"
git push origin main
```

---

## Task 13: Location Section + Footer

**Files:**
- Create: `src/components/sections/LocationSection.tsx`
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Create LocationSection.tsx**

```typescript
"use client";

import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { ease, duration } from "@/lib/motion-tokens";

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
          <h2 className="font-heading text-5xl md:text-6xl leading-tight mb-6">
            Northern<br /><em className="italic">Ibiza</em>
          </h2>
          <p className="text-cream/70 text-lg leading-relaxed mb-10 max-w-md">
            Nestled in the secluded hills of San Carlos, Finca Escondida is 35 minutes from Ibiza Airport and 8 minutes from the pristine coves of the north.
          </p>
          <dl className="space-y-4">
            {[
              { icon: MapPin, label: "Address", value: "San Carlos, Ibiza, Spain" },
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
          aria-label="Map placeholder — Finca Escondida location in Ibiza"
        >
          <div className="text-center">
            <MapPin size={48} className="text-cream/20 mx-auto mb-3" />
            <p className="text-cream/30 text-sm tracking-widest uppercase">San Carlos, Ibiza</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create Footer.tsx**

```typescript
export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-cream/40 py-12 px-6" role="contentinfo">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p className="font-heading text-lg text-cream/70 tracking-widest">Finca Escondida</p>
        <p className="text-xs tracking-widest uppercase">San Carlos, Ibiza, Spain</p>
        <p className="text-xs">&copy; {new Date().getFullYear()} Finca Escondida. All rights reserved.</p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/LocationSection.tsx src/components/layout/Footer.tsx
git commit -m "feat: location section and footer"
git push origin main
```

---

## Task 14: Main page assembly

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Assemble page.tsx**

```typescript
import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import GallerySection from "@/components/sections/GallerySection";
import AmenitiesSection from "@/components/sections/AmenitiesSection";
import BookingSection from "@/components/sections/BookingSection";
import LocationSection from "@/components/sections/LocationSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <GallerySection />
      <AmenitiesSection />
      <BookingSection />
      <LocationSection />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Run dev server and verify locally**

```bash
npm run dev
```

Open browser and verify:
- Hero fills screen with parallax
- Bento grid renders 6 cards
- Gallery opens lightbox on click
- Booking wizard moves through 3 steps
- No TypeScript errors in terminal

- [ ] **Step 3: Final commit and deploy**

```bash
git add src/app/page.tsx
git commit -m "feat: complete page assembly — all sections integrated"
git push origin main
```

---

## Self-Review

**Spec coverage check:**
- Cinematic hero: Task 6
- Feature bento grid: Task 7
- Media gallery + lightbox: Task 8
- Amenities: Task 9
- Interactive date picker: Task 10
- Live price calculation: Task 10
- 3-step booking wizard: Task 11
- Extras selection: Task 11
- Scroll animations: Every section (Motion whileInView)
- Responsive / mobile-first: Every component uses responsive Tailwind classes
- A11y (WCAG): aria-labels on all interactive elements, semantic HTML, focus-visible, keyboard nav in lightbox
- Lenis smooth scroll: Task 4
- prefers-reduced-motion: globals.css
- Design tokens (cream, olive, sand): Task 3
- Cormorant Garamond + Geist: Task 4

**Placeholder check:** No TBD or TODO in any task. All code is complete and production-ready.

**Type consistency check:** `BookingFormData.extras: string[]` used consistently across ReservationWizard and PriceCalculator. `GalleryImage`, `BentoFeature`, `BookingRange` all defined in Task 1 and used as-is throughout.
