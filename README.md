# salikhov.dev

Personal site of Chingiz Salikhov — React 19 + Vite + TypeScript + Tailwind v4, prerendered to static HTML.

```sh
npm run dev      # vite dev server (client-side render)
npm run build    # typecheck → client build → SSR build → prerender into dist/
npm run preview  # serve dist/
npm run lint
```

## How pages are built

- `src/routes.ts` — every page and its URL. EN lives at `/`, RU at `/ru`; case studies at `/work/<slug>` and `/ru/work/<slug>`.
- `src/entry-server.tsx` renders a route to HTML; `scripts/prerender.mjs` writes it into
  `dist/<path>/index.html` together with its `<head>` (`src/head.ts`), font and dictionary preloads and the
  inlined CSS, plus a single bilingual `dist/404.html` and `dist/sitemap.xml`.
- `src/entry-client.tsx` loads the page's dictionary and hydrates the prerendered markup (or renders from
  scratch under `vite dev`).
- Home sections in order: Hero → Work → Services → Process → Stack → About → Contact (`src/pages/HomePage.tsx`).

## Content

- Texts: `src/i18n/en.ts` (source of the `Dictionary` type) and `ru.ts`; work and case studies in
  `work.en.ts` / `work.ru.ts`; the bilingual 404 lines in `not-found.ts`. The browser gets only its own
  language (`loadDictionary`); the build uses `i18n/all.ts`. `kz.ts` is kept for later and not wired up.
- Data that isn't text: `src/content/` — case studies (links, stack taken from each project's repository,
  visuals), services, stack, portrait and badge images.
- Contacts and the canonical origin: `src/site.ts`.
- Rule for case studies: no invented results. Screens with made-up numbers are captioned "demo data".

## Assets

- Fonts are self-hosted in `src/assets/fonts` (Geologica for display, Onest for text, JetBrains Mono), one woff2
  per script with `unicode-range`; variable axes are trimmed to the weights in use, the mono face is subset.
  Arial-based fallbacks with matched metrics keep the font swap from shifting the layout.
- Images ship as AVIF + WebP in several widths through `components/Picture` (`lib/responsive.ts` builds the srcsets).
- Case visuals in `src/assets/work/<case>/` (sizes in `manifest.json`) are captured from the live sites;
  menus are cropped so the guest Wi-Fi password never shows.
- The dot wave behind the hero is plain WebGL (`src/lib/dot-wave.ts`), loaded when the browser is idle.

## ⌘K

`src/components/palette/` — a quiet quick-jump menu for keyboard users: ⌘K / Ctrl+K on desktop, mentioned only in
the footer. Navigation, case studies, contacts, language, `help` and one easter egg. Loaded as its own chunk on idle.

## Look

Warm near-black background, cream text, warm greys, and one solid orange accent (`--accent-rgb` in `src/index.css`)
used only for the main button and links. No gradients, glows or eyebrow labels; mono only for stack lists and tiny
captions.

## SEO

- `src/head.ts` (build time only): title, description, canonical on the apex domain, hreflang en/ru/x-default,
  Open Graph + Twitter cards, JSON-LD (Person, Organization ×2, ProfessionalService with the services,
  WebSite; CreativeWork + BreadcrumbList on case pages) and `sitemap.xml`. `public/robots.txt` points to it.
- Open Graph cards are static JPEGs in `public/og/` (home + every case, EN/RU), rendered from
  `scripts/og/template.html` with the texts in `scripts/og/specs.json` — re-render them when a title changes.

## Deploy

Vercel, `vercel.json`: clean URLs without trailing slashes, immutable caching for `/assets/*`.
The primary domain is `salikhov.dev`; `www` should 308-redirect to it (Vercel → Settings → Domains).
