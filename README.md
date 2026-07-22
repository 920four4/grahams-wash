# Graham's Wash

Modern, mobile-first marketing site for **Graham's Wash** (Rocklin, CA) — hot pressure washing, solar panel cleaning, garbage bin cleaning, and permanent Christmas lights.

**Stack:** Next.js 16 · Tailwind CSS 4 · Vercel  
**Domain:** [grahamswash.com](https://www.grahamswash.com)

## Features

- App-like mobile UX (bottom nav, large touch targets, safe-area insets)
- Dedicated service pages with real job photography
- Contact form with service picker (Resend-ready)
- Local SEO: metadata, sitemap, robots, LocalBusiness + FAQ + Service JSON-LD
- Trust bar + Google rating surface + testimonials
- Service area coverage for Greater Sacramento / Placer County

## Develop

```bash
npm install
npm run dev
```

## Contact form / Resend

Form posts to `/api/contact`. Without `RESEND_API_KEY`, leads are logged server-side and the UI still succeeds.

```bash
cp .env.example .env.local
# RESEND_API_KEY=re_...
# RESEND_FROM="Graham's Wash <hello@yourdomain.com>"
# CONTACT_TO=service@grahamswash.com
```

## Deploy

```bash
vercel --scope 920four
```

Git author for this project: `team@920four.com`
