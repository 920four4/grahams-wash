# Graham's Wash

Modern, mobile-first marketing site for **Graham's Wash** (Rocklin, CA) — hot pressure washing, solar panel cleaning, garbage bin cleaning, and permanent Christmas lights.

**Stack:** Next.js 16 · Tailwind CSS 4 · Vercel  
**Domain:** [grahamswash.com](https://grahamswash.com)

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

Form posts to `/api/contact`. The page shows success only after Resend accepts the lead email. If `RESEND_API_KEY` is missing or that lead send fails, the API returns an error (not `ok`) and the form shows that error. A customer confirmation is sent when the visitor includes an email. If that confirmation fails after the lead email was sent, the API still returns `ok` with a short note, and the form stays on the success state. Valid requests are logged on the server either way, but a log line is not delivery.

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

## Google reviews

`npm run refresh:reviews` writes a committed snapshot to `src/data/google-reviews.json`. The site reads that file at build time. It does not call SerpAPI when a page is requested. The script needs `SERP_API_KEY` or `SERPAPI_API_KEY` (from the environment, `.env.local`, or `.env.serp`). Commit the updated JSON to publish new reviews.
