# salikhov.dev

Personal site of Chingiz Salikhov — React 19 + Vite + TypeScript + Tailwind v4, prerendered to static HTML.

```sh
npm run dev      # vite dev server (client-side render)
npm run build    # typecheck → client build → SSR build → prerender into dist/
npm run preview  # serve dist/
npm run lint
```

## How pages are built

- `src/routes.ts` — every page and its URL. EN lives at `/`, RU at `/ru`.
- `src/entry-server.tsx` renders a route to HTML; `scripts/prerender.mjs` writes it into
  `dist/<path>/index.html` together with its `<head>` (`src/seo.ts`), font preloads and the inlined CSS,
  plus a single bilingual `dist/404.html`.
- `src/entry-client.tsx` hydrates the prerendered markup (or renders from scratch under `vite dev`).
- Texts: `src/i18n/en.ts` (source of the `Dictionary` type) and `ru.ts`. `kz.ts` is kept for later and not wired up.
- Contacts and the canonical origin: `src/site.ts`.

## Assets

- Fonts are self-hosted in `src/assets/fonts` (Onest, JetBrains Mono), one woff2 per script with `unicode-range`.
- The hero portrait ships as AVIF + WebP in 480/720/960/1200 widths (`src/content/portrait.ts`).
- The dot wave behind the hero is plain WebGL (`src/lib/dot-wave.ts`), loaded when the browser is idle.

## Deploy

Vercel, `vercel.json`: clean URLs without trailing slashes, immutable caching for `/assets/*`.
