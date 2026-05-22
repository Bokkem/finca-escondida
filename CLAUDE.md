# CLAUDE.md - Finca Escondida

## Project
Ultra-luxe villa showcase website voor Rideko Webdesign. Demo om potentiele klanten te laten zien wat er gebouwd kan worden. Geen echte villa, geen echte boeking — alles is mock data.
Pad: `/home/richard/websites/luxe-villa`

## Stack
- Next.js 16 (App Router) + TypeScript
- Tailwind v4 (CSS-first, @theme tokens in globals.css — geen tailwind.config.ts)
- `motion/react` voor animaties — NOOIT `framer-motion`
- Lenis smooth scroll
- Embla Carousel (mobiele gallery)
- shadcn/ui (UI componenten)
- Geen backend, geen Supabase, geen Firebase — puur frontend met mock data

## Design identiteit
- Achtergrond: `#FAF9F5` (creme)
- Primair: `#2F3E36` (olijfgroen) — Tailwind: `olive`
- Accent: `#C8A97E` (goud/zand) — Tailwind: `sand`
- Koppen: Cormorant Garamond (Serif) via `--font-heading`
- Body: Geist Sans via `--font-body`
- Sfeer: editorial luxury, minimalist, light skeuomorphism

## Technische regels
- Animaties: altijd `motion/react`, nooit `framer-motion`
- Nav-links: `lenis?.scrollTo(el, { immediate: true })` — niet `scrollIntoView`
- Scroll-to-top: `lenis?.scrollTo(0, { immediate: true })`
- Afbeeldingen: altijd `next/image` met alt-tekst, nooit `<img>`
- Viewport hoogte: `100dvh`, niet `100vh`
- Tailwind v4 tokens: `bg-olive`, `text-cream`, `rounded-card` etc. komen uit `@theme` in globals.css
- Favicon staat in `src/app/favicon.ico` + `src/app/icon.svg` (niet alleen public/)

## Copy
- UK English door de hele site
- Geen em-dashes of en-dashes
- aria-labels altijd in het Engels (lang="en")

## Deploy
- Altijd via git: `git add .` + `git commit` + `git push origin main`
- Vercel deployt automatisch via GitHub
- Git-config: `user.email = Bokkem@users.noreply.github.com` | `user.name = Bokkem`
- Live: https://finca.rideko.nl

## Werkwijze
- NIET meteen bouwen — eerst bespreken en wachten op Richards akkoord
- Mobile-first (testen op 375px)
- A11y verplicht (alt-teksten, semantische HTML, toetsenbordnavigatie)
