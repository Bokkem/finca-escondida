# CLAUDE.md - Luxe Villa Website

## Project
Ultra-luxe single-property landingpage/webapp voor verhuur van één exclusieve villa.
Pad: `/home/richard/websites/luxe-villa`

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Supabase (database + realtime kalender)
- Vercel (hosting via GitHub)
- Framer Motion (animaties)
- shadcn/ui (UI componenten)

## Design identiteit
- Achtergrond: off-white/creme `#FAF9F5`
- Primaire kleur: diep olijfgroen `#2F3E36`
- Accenten: zand/terracotta tinten
- Koppen: Cormorant Garamond of Playfair Display (Serif)
- Body: Geist Sans of Inter (Sans-serif)
- Sfeer: high-end architectuurmagazine, Resonant Stark + Light Skeuomorphism

## Kernfunctionaliteiten
1. Realtime beschikbaarheidskalender (Supabase bookings tabel)
2. Live prijsberekening op basis van datums
3. Luxe boekingswizard (3 stappen)
4. Cinematic hero-sectie
5. Feature Bento Grid met hover-effecten
6. Media lightbox galerij

## Database (Supabase)
- Tabel `bookings`: id, start_date, end_date, guest_name, guest_email, total_price, status
- Tabel `settings`: base_price_per_night, high_season_price

## Deploy
- Altijd via git: `git add .` + `git commit` + `git push origin main`
- Vercel deployt automatisch via GitHub
- Git-config: `user.email = Bokkem@users.noreply.github.com` | `user.name = Bokkem`

## Werkwijze
- NIET meteen bouwen -- eerst bespreken en wachten op Richards akkoord
- Mobile-first (testen op 375px)
- A11y verplicht (alt-teksten, semantische HTML, toetsenbordnavigatie)
- Geen em-dashes of en-dashes in tekst of code
