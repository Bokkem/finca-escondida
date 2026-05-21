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
- Lenis voor smooth scroll (instantie exposed via LenisContext in SmoothScrollProvider)
- Embla Carousel 8.6.0 voor mobiele gallery
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
1. Header (floating, scroll-aware backdrop blur, logo = instant scroll-to-top)
2. Hero (cinematic parallax, Ibiza luchtfoto, `100dvh`)
3. Features (bento grid, 6 villa-highlights)
4. Gallery (horizontale scroll op desktop, Embla carousel op mobiel + fullscreen lightbox met swipe)
5. Amenities (icon cards)
6. Booking (3-staps wizard, mock kalender, live prijsberekening)
7. Location (OpenStreetMap, San Carlos Ibiza)
8. Footer (Rideko Webdesign credit + logo = instant scroll-to-top)
9. BackToTop knop (floating, verschijnt na 400px scroll, instant terug naar boven)

## Bestandspaden (key files)
- `src/app/page.tsx` — pagina-assembly
- `src/app/layout.tsx` — fonts, metadata, Lenis provider, Preloader, CustomCursor, GrainOverlay
- `src/app/globals.css` — Tailwind v4 @theme tokens + cross-browser fixes
- `src/lib/mock-data.ts` — alle villa-data, afbeeldingen, prijzen
- `src/lib/utils.ts` — cn(), prijsberekening, datumlogica
- `src/lib/motion-tokens.ts` — gedeelde easing/duration/stagger waarden
- `src/types/index.ts` — TypeScript interfaces
- `src/components/providers/SmoothScrollProvider.tsx` — Lenis + LenisContext (exporteert `useLenis` hook)
- `src/components/ui/MagneticButton.tsx` — magnetisch knop-effect via cursor tracking
- `src/components/ui/RevealText.tsx` — woord-voor-woord clip-path reveal animatie
- `src/components/ui/GrainOverlay.tsx` — subtiele SVG ruis-overlay
- `src/components/ui/Preloader.tsx` — intro-animatie bij eerste load
- `src/components/ui/CustomCursor.tsx` — custom cursor (desktop only)
- `src/components/ui/BackToTop.tsx` — floating back-to-top knop met glow hover
- `src/components/ui/GalleryLightbox.tsx` — fullscreen lightbox met keyboard + touch swipe nav
- `src/components/ui/FeLogo.tsx` — FE monogram SVG icoon (olijfgroen, gouden letters), gebruikt in header + footer
- `src/components/ui/ClipReveal.tsx` — herbruikbaar clip-path reveal component (bottom-up curtain wipe)
- `public/images/` — 9 WebP afbeeldingen (hero 1920x1080, rest 1200x800)
- `public/favicon.svg` + `src/app/favicon.ico` + `src/app/icon.svg` — FE monogram favicon (alle formaten)

## Deploy
- GitHub: `git@github.com:Bokkem/finca-escondida.git`
- Git config: `user.email = Bokkem@users.noreply.github.com` / `user.name = Bokkem`
- Vercel: automatisch via GitHub push naar `main`
- NOOIT `vercel` of `vercel --prod` gebruiken

## Taal
Engels (UK English) — toon: warm, onderkoel, Brits luxe vakantiegevoel

## Code kwaliteit
Code audit uitgevoerd (mei 2026). Alle critical en important issues opgelost:
- RAF memory leak gefixed in SmoothScrollProvider
- Alle aria-labels zijn Engels (lang="en")
- Nav-links gebruiken Lenis door de hele site
- Focus-visible op alle interactieve elementen
- Focus trap in mobiel menu
- Gallery animaties triggeren correct via whileInView
- Geen dode code, geen ongebruikte imports
- Design tokens consistent gebruikt (geen hardcoded hexcodes)

## Belangrijke technische aandachtspunten
- Tailwind v4: klassen zoals `bg-olive`, `text-cream` etc. komen uit `@theme` in globals.css
- Motion package: altijd importeren uit `motion/react`, nooit uit `framer-motion`
- Afbeeldingen: altijd `next/image` met `alt` tekst, nooit `<img>`
- Alle afbeeldingen zijn WebP, conversie via ImageMagick + cwebp (sharp werkt niet op dit systeem)
- Scroll-to-top: altijd via `lenis?.scrollTo(0, { immediate: true })` — nooit `window.scrollTo` (Lenis onderschept dat)
- Nav-links: altijd via `lenis?.scrollTo(el, { immediate: true })` — niet `scrollIntoView` (anders race je door de horizontale gallery)
- Favicon: custom FE-monogram staat in `src/app/favicon.ico` + `src/app/icon.svg` — NIET alleen in `public/`, anders pakt Next.js de default Vercel favicon
- Viewport hoogte: gebruik `100dvh` niet `100vh` (iOS Safari adresbalk)
- `metadataBase` ingesteld op `https://finca-escondida.vercel.app`
- OG-afbeelding: `public/og-image.webp` (1200x630, screenshot van de site)
