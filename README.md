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
  `dist/<path>/index.html` together with its `<head>` (`src/seo.ts`), font preloads and the inlined CSS,
  plus a single bilingual `dist/404.html`.
- `src/entry-client.tsx` hydrates the prerendered markup (or renders from scratch under `vite dev`).
- Texts: `src/i18n/en.ts` (source of the `Dictionary` type) and `ru.ts`; work and case studies in `work.en.ts` / `work.ru.ts`.
  `kz.ts` is kept for later and not wired up.
- Case data that isn't text (links, stack from each project's repo, visuals): `src/content/cases.ts`.
- Contacts and the canonical origin: `src/site.ts`.

## Assets

- Fonts are self-hosted in `src/assets/fonts` (Geologica for display, Onest for text, JetBrains Mono), one woff2
  per script with `unicode-range`; variable axes are trimmed to the weights in use, the mono face is subset.
- The hero portrait ships as AVIF + WebP in 480/720/960/1200 widths (`src/content/portrait.ts`).
- Case visuals in `src/assets/work/<case>/` (AVIF + WebP, sizes in `manifest.json`) are captured from the live sites;
  menus are cropped so the guest Wi-Fi password never shows. Screens with made-up numbers are labelled as demo data.
- The dot wave behind the hero is plain WebGL (`src/lib/dot-wave.ts`), loaded when the browser is idle.

## SEO

- `src/head.ts` (build time only): title, description, canonical on the apex domain, hreflang en/ru/x-default,
  Open Graph + Twitter cards, JSON-LD (Person, Organization ×2, ProfessionalService with the services,
  WebSite; CreativeWork + BreadcrumbList on case pages) and `sitemap.xml`. `public/robots.txt` points to it.
- Open Graph cards are static JPEGs in `public/og/` (home + every case, EN/RU), rendered from
  `scripts/og/template.html` with the texts in `scripts/og/specs.json` — re-render them when a title changes.

## Deploy

Vercel, `vercel.json`: clean URLs without trailing slashes, immutable caching for `/assets/*`.
