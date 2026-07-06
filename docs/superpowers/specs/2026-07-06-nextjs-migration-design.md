# ZOLIX AI: Vite/React → Next.js Static Migration

## Goal

Migrate the existing Vite + React 19 SPA (source: `ZOLIX_3 July.zip`) into a new Next.js
(App Router) project, as a fully static, optimized frontend. Every page's visible content,
URL, and SEO metadata (title, meta description, canonical, hreflang, JSON-LD) must match the
original exactly — only the underlying implementation changes.

## Source project summary

- Vite + React 19 + TypeScript + Tailwind + `react-router-dom` v7, client-rendered SPA.
- Netlify-hosted with a SPA-fallback redirect (`/* → /index.html 200`).
- SEO handled at runtime: a `SEOManager` component sets `document.title`, meta description,
  canonical/hreflang `<link>` tags via `useEffect`; a `SchemaMarkup` component injects JSON-LD
  via a `<script>` tag added to `<head>` at runtime.
- ~13 static pages/components (home, product pages, pricing, legal pages, hubs).
- ~85 programmatic SEO landing pages defined in one data file (`src/data/insightsData.ts`)
  under `/industries/*`, `/technologies/*`, `/resources/*`, `/blog/*`, and a handful of
  single-segment paths (`/demo`, `/finops-hub`, `/ai-engine`, `/ai-planner`, `/ai-fit`,
  `/finops-2026`, `/partners`), all rendered by one catch-all `InsightDetail` component that
  looks up the current path in `insightLinks`.
- Google Fonts (Poppins) loaded via `<link>` tag in `index.html`; GTM loaded via a custom
  delayed/idle-triggered inline script (loads on scroll/click/touch or after a timeout).
- No usage of `useNavigate`, `useSearchParams`, `useParams`, or Helmet — router usage is
  limited to `Link`, `useLocation`.

## Target architecture

- **Next.js 15, App Router, TypeScript, Tailwind CSS.**
- **`output: 'export'`** in `next.config` — produces a pure static `out/` folder (HTML/CSS/JS),
  no Node server, matching "frontend static website."
- **Package manager: npm.**
- **Deployment: Netlify.** `netlify.toml` updated to build with `next build` and publish `out/`;
  the SPA-fallback `_redirects` rule is removed (every route becomes a real prerendered HTML
  file, so no fallback rewrite is needed).

### Route mapping

One-to-one with the current routes:

| Current SPA route | Next.js App Router path |
|---|---|
| `/` | `app/page.tsx` |
| `/products` | `app/products/page.tsx` |
| `/cloud-finops` | `app/cloud-finops/page.tsx` |
| `/ai-finops` | `app/ai-finops/page.tsx` |
| `/gpu-cost` | `app/gpu-cost/page.tsx` |
| `/zolix-lite` | `app/zolix-lite/page.tsx` |
| `/zolix-advance` | `app/zolix-advance/page.tsx` |
| `/finops` | `app/finops/page.tsx` |
| `/insights` | `app/insights/page.tsx` (renders hub in "insights" mode) |
| `/blog` | `app/blog/page.tsx` (renders hub in "blog" mode) |
| `/pricing` | `app/pricing/page.tsx` |
| `/privacy`, `/terms`, `/cookies` | `app/privacy/page.tsx`, `app/terms/page.tsx`, `app/cookies/page.tsx` |
| `/industries/*`, `/technologies/*`, `/resources/*`, `/blog/*`, and the single-segment misc SEO pages | `app/[...slug]/page.tsx` |

`app/[...slug]/page.tsx`:
- `generateStaticParams()` enumerates every `path` in `insightLinks` (split into segments),
  so all ~85 pages are prerendered at build time.
- Page body looks up the joined slug against `insightLinks` (same matching logic as today's
  `InsightDetail`) and renders the same generated detail content.
- Anything not found in `insightLinks` calls `notFound()` → a custom `not-found.tsx` styled
  like the current `NotFound` component.
- Because Next.js resolves static routes (e.g. `/blog`, `/pricing`) before catch-all segments,
  there's no conflict between the hub pages and the catch-all detail pages.

### SEO

- `SEOManager`/`SchemaMarkup` (runtime `useEffect` injection) are replaced by:
  - Per-page `metadata` export or `generateMetadata()` (static pages use a plain `metadata`
    object; the catch-all detail page uses `generateMetadata()` keyed off the resolved slug).
  - Canonical and hreflang (`en-us`, `en-in`) links produced via the `alternates` field of
    Next's Metadata API.
  - JSON-LD schema rendered as an inline `<script type="application/ld+json">` directly in
    each server component (no client JS needed, same behavior, better for crawlers since it's
    present in the initial HTML instead of injected after mount).
- Same title/description/canonical text as today — content is unchanged, only the rendering
  mechanism moves from client-side injection to build-time static HTML.
- `public/sitemap.xml` is replaced by `app/sitemap.ts`, generated from `insightsData.ts` so it
  lists every real page (~85+ URLs) instead of the current hand-maintained 16-URL file.
- `robots`/`llms.txt` and other static `public/` files are copied over unchanged.

### Fonts

- Poppins loaded via `next/font/google` (self-hosted at build time, same weights: 400/600/700/800),
  replacing the `<link>`-based Google Fonts load in `index.html`. Same visual font, no external
  runtime request, no font-related layout shift.

### Assets & favicon

- All files under `public/assets/*` (logo, team photos, WhatsApp QR, nvidia badge) copied
  verbatim into the new project's `public/assets/`.
- Favicon behavior preserved exactly as today (inline "Z" SVG data URI set as the site icon via
  Metadata API `icons` field). Other currently-unused public assets (`favicon.svg`,
  `assets/zolix_favicon.png`) are copied over as-is for parity, even though nothing references
  them today.

### GTM

- The existing custom lazy-load script (loads GTM on idle/timeout or first scroll/click/touch/
  touchstart interaction) is preserved verbatim inside a small client component mounted in the
  root layout, so load-timing behavior doesn't change.

### Client vs. server components

- Server components by default (all content-only pages/sections).
- `'use client'` only where the source already required interactivity/browser APIs:
  `Navbar` (scroll listener, mobile menu state), `InsightsHub` (search input, tab state),
  `LegalPage`, `FinOps`, `CloudFinOps` (whatever local state they hold).
- `useLocation`/`Link` from `react-router-dom` → `usePathname` from `next/navigation` and
  `Link` from `next/link`.

## Out of scope

- No visual/content changes to any page.
- No new pages, sections, or SEO fields beyond what exists today (aside from sitemap
  completeness, per explicit decision above).
- No CMS/backend integration — content stays hardcoded in a data file, same as today.
