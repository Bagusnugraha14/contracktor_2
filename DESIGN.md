# DESIGN.md - MAS WIS_bangun dan renovasi

## Brand Identity & Direction
- Business Name: MAS WIS_bangun dan renovasi
- Business Category: Jasa Bangun dan Renovasi Rumah
- Service Area: Banjarmasin dan sekitarnya (Kalimantan Selatan)
- Concept: Architectural Editorial with Modern Brutalism
- Purpose: Showcase real craftsmanship, authentic project documentation, and convert visitors into WhatsApp inquiries directly with Mas Wisnu.

## Dials (antislop Part 3)
Dial: ENERGY 3 / RHYTHM 3 / MOTION 2

- ENERGY 3: Bold, architectural editorial presentation with confident headline typography, construction yellow accent fields, and authentic construction imagery.
- RHYTHM 3: Asymmetrical layout with varied compositions across sections (cinematic full-screen video hero, 2-column editorial about section, magazine-style project index with varied aspect ratios, structured service list, and focused review cards).
- MOTION 2: Controlled scroll-reveals, responsive lightbox modal, subtle hover transitions on imagery and buttons, respecting `prefers-reduced-motion`.

## Color Palette
- Primary Yellow: `#F5C400`
- Deep Warm Yellow: `#E6B500`
- Foundation Light: `#FAF9F5` (Warm off-white)
- Pure White: `#FFFFFF`
- Deep Charcoal / Near-Black: `#191919`
- Secondary Text: `#595959`
- Architectural Dark (Dark Mode & Accents): `#141512`
- Muted Borders: `#E5E3DC` / `#2C2D29`

## Typography
- Display / Headlines: `Plus Jakarta Sans` (weights: 700, 800) with geometric structural presence
- Body / Navigation / Metadata: `Plus Jakarta Sans` / `Inter` (weights: 400, 500, 600) with clear readability
- Fluid typography using CSS `clamp()` for responsive headlines

## Layout & Structure
1. Navigation: Truly centered desktop links using CSS Grid (`1fr auto 1fr`), left wordmark, right WhatsApp action button, and accessible mobile menu.
2. Hero: Full viewport height (`100svh`), centered editorial headline and copy over muted looping construction video with fallback poster.
3. About: Editorial two-column composition humanizing Mas Wisnu and his approach to building and communication.
4. Projects (Pengalaman): Magazine-style project showcase with varied scales, category tags, and interactive lightbox.
5. Services (Layanan): Structured service overview with direct contextual WhatsApp inquiry triggers.
6. Customer Reviews (Ulasan): Verified Google Maps rating (4.7 / 5 from 23 reviews) and authentic quotes.
7. Final CTA: High-contrast contact block with verified WhatsApp number (`6282140000212`) and prefilled consultation message.
8. Footer: Minimal verified business metadata, navigation, service area, and dynamic copyright year.
