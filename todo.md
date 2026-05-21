# Finca Escondida — Todo

## Openstaand

- [ ] Echte villa-foto's toevoegen als klant echte beelden aanlevert (nu Unsplash placeholders)
- [ ] Google Maps of Mapbox embed als alternatief voor OpenStreetMap (betere stijl mogelijk)
- [ ] Contactgegevens toevoegen (telefoonnummer, e-mailadres villa/beheerder)
- [ ] Privacybeleid / cookiebeleid pagina (minimaal vereist voor EU)
- [ ] Echte prijzen en seizoensdata aanpassen indien nodig
- [ ] living.webp en cellar.webp vervangen door betere Unsplash foto's
- [ ] **5. Stats sectie met animated counters** — "7 bedrooms · 22m pool · 14 guests" tellen op bij scroll

## Awwwards-verbeteringen (prioriteit)

- [x] **1. Custom cursor** — kleine dot die transformeert bij hover op links/knoppen
- [x] **2. Text reveal animaties** — koppen revealen woord voor woord via clip-path
- [x] **3. Grain / noise texture overlay** — subtiele noise-laag over secties
- [x] **4. Preloader / intro animatie** — elegante laadanimatie met villanaam
- [x] **6. Clip-path image reveals** — bento grid cards revealen van onder naar boven
- [x] **7. Magnetische knoppen** — Reserve-knop trekt lichtjes naar cursor bij hover
- [ ] **8. Video hero** — loopende ambiante villa-video als hero-achtergrond (zodra beeldmateriaal beschikbaar)

## Eventuele uitbreidingen (later bespreken)

- [ ] Supabase koppelen voor echte boekingslogica (real-time kalender, bevestigingsmails)
- [ ] Meerdere villa-pagina's (als het concept uitgebreid wordt naar meerdere objecten)
- [ ] Taalswitch toevoegen (NL/EN of ES/EN)
- [ ] Testimonials / guest reviews sectie
- [ ] Eigen domein koppelen aan Vercel

## Afgerond

- [x] Next.js project setup + GitHub repo (Bokkem/finca-escondida)
- [x] Tailwind v4 design tokens + Cormorant Garamond + Geist fonts
- [x] Lenis smooth scroll (met LenisContext voor instant scroll-to-top via `useLenis`)
- [x] Floating header met mobiel menu
- [x] Cinematic hero met parallax (`100dvh`)
- [x] Bento grid (6 villa-highlights)
- [x] Fotogalerij desktop: horizontale scroll (sticky pin + useScroll/useTransform)
- [x] Fotogalerij mobiel: Embla Carousel (momentum, peek-effect, pill dots)
- [x] Lightbox met toetsenbordnavigatie + touch swipe (links/rechts)
- [x] Amenities sectie
- [x] 3-staps boekingswizard met live prijsberekening
- [x] Location sectie met OpenStreetMap
- [x] Footer met Rideko Webdesign credit
- [x] Back-to-top knop (glow + lift hover, instant terug naar boven)
- [x] Logo header + footer klikbaar: instant terug naar boven
- [x] UK English copy
- [x] SEO titel en metabeschrijving
- [x] Alle afbeeldingen WebP met alt-teksten
- [x] OG-afbeelding (1200x630 WebP) voor social sharing — Facebook, LinkedIn etc.
- [x] `metadataBase` ingesteld op `https://finca-escondida.vercel.app`
- [x] Code audit uitgevoerd en alle issues gefixed (memory leak, aria-labels, locale, focus trap, dode code, em-dashes, consistentie)
- [x] Responsive (mobile-first, getest op 375px)
- [x] A11y (WCAG, aria-labels, focus-visible, semantische HTML)
- [x] Cross-browser fixes (dvh, webkit-backdrop-filter, iOS tap highlight, text-size-adjust)
- [x] FE monogram icoon in header en footer (FeLogo.tsx)
- [x] Favicon: favicon.svg + favicon.ico + apple-touch-icon.png (FE monogram)
- [x] Nav-links via lenis.scrollTo immediate — springt direct naar sectie zonder door gallery te scrollen
- [x] 6 gallery-afbeeldingen vervangen door Unsplash foto's (exterior, pool, spa, bedroom, kitchen, terrace)
