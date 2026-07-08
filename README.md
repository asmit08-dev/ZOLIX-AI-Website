ZOLIX AI marketing site — a static Next.js (App Router) site migrated from a Vite + React SPA. See `docs/superpowers/specs/2026-07-06-nextjs-migration-design.md` for the migration design.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Produces a fully static export in `out/` (`output: "export"` in `next.config.ts`) — deployable to Netlify or any static host, no Node server required.

## Stack

- Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- `next/font/google` for Poppins
- Per-page Metadata API (`generateMetadata`) for SEO — titles, descriptions, canonical/hreflang
- Programmatic SEO pages (`/industries/*`, `/technologies/*`, `/resources/*`, `/blog/*`) driven by `src/lib/insights-data.ts` via `app/[...slug]/page.tsx` + `generateStaticParams`
- `app/sitemap.ts` generates a complete sitemap from the same data
