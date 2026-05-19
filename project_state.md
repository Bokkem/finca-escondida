# Finca Escondida — Project State

## Wat is dit
Showcase / demo website voor Rideko Webdesign om aan klanten te laten zien wat er gebouwd kan worden. Geen echte villa, geen echte boeking — alles is mock data. Stijl: ultra-luxe Awwwards-waardig, editorial magazine gevoel.

## Doel
Potentiele klanten laten zien wat Rideko kan bouwen op het gebied van premium websites met boekingslogica, animaties en UI/UX.

## Stack
- Next.js 16.2.6 (App Router, TypeScript)
- React 19
- Tailwind v4 (CSS-first, geen tailwind.config.ts, configuratie via @theme in globals.css)
- Motion (`motion/react`) voor animaties — NIET framer-motion
- Lenis voor smooth scroll
- shadcn/ui voor basis UI-componenten
- Lucide React voor iconen
- Geen backend, geen Supabase, geen Firebase — puur frontend met mock data

## Design identiteit
- Achtergrond: `#FAF9F5` (creme/off-white)
- Primair: `#2F3E36` (diep olijfgroen)
- Accent: `#C8A97E` (zand/goud), `#B5714A` (terracotta)
- Koppen: Cormorant Garamond (Serif, via next/font)
- Body: Geist Sans (via next/font)
- Thema: Editorial / Minimalist Luxury / Light Skeuomorphism

## Structuur
Onepager met deze secties (top naar bottom):
1. Header (floating, scroll-aware backdrop)
2. Hero (cinematic parallax, Ibiza luchtfoto)
3. Features (bento grid, 6 villa-highlights)
4. Gallery (fotogrid + fullscreen lightbox)
5. Amenities (icon cards)
6. Booking (3-staps wizard, mock kalender, live prijsberekening)
7. Location (OpenStreetMap, San Carlos Ibiza)
8. Footer (Rideko Webdesign credit + back-to-top logo)
9. BackToTop knop (floating, verschijnt na 400px scroll)

## Bestandspaden (key files)
- `src/app/page.tsx` — pagina-assembly
- `src/app/layout.tsx` — fonts, metadata, Lenis provider
- `src/app/globals.css` — Tailwind v4 @theme tokens
- `src/lib/mock-data.ts` — alle villa-data, afbeeldingen, prijzen
- `src/lib/utils.ts` — cn(), prijsberekening, datumlogica
- `src/lib/motion-tokens.ts` — gedeelde easing/duration/stagger waarden
- `src/types/index.ts` — TypeScript interfaces
- `public/images/` — 9 WebP afbeeldingen (hero 1920x1080, rest 1200x800)

## Deploy
- GitHub: `git@github.com:Bokkem/finca-escondida.git`
- Git config: `user.email = Bokkem@users.noreply.github.com` / `user.name = Bokkem`
- Vercel: automatisch via GitHub push naar `main`
- NOOIT `vercel` of `vercel --prod` gebruiken

## Taal
Engels (UK English) — toon: warm, onderkoel, Brits luxe vakantiegevoel

## Belangrijke technische aandachtspunten
- Tailwind v4: klassen zoals `bg-olive`, `text-cream` etc. komen uit `@theme` in globals.css
- Motion package: altijd importeren uit `motion/react`, nooit uit `framer-motion`
- Afbeeldingen: altijd `next/image` met `alt` tekst, nooit `<img>`
- Alle afbeeldingen zijn WebP, conversie via ImageMagick + cwebp (sharp werkt niet op dit systeem)
- `metadataBase` is nog niet ingesteld (kleine warning bij build) — instellen zodra productiedomein bekend is
