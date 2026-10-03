# salikhov.dev

Personal site of Chingiz Salikhov. React 19 + Vite + TypeScript + Tailwind v4, prerendered to static HTML.

```bash
npm install
npm run dev       # http://localhost:5173 (also on the LAN)
npm run build     # type-check, client build, SSR build, prerender → dist/
npm run lint
```

## Structure

- `src/landing/` — the sections: hero, about (bento), projects (carousel in `components/ui/`), contact, footer.
- `src/i18n/dictionaries.ts` — all texts in Russian, English and Kazakh.
- `src/i18n/langs.ts` — one page per language: Russian at `/`, English at `/en`, Kazakh at `/kz`. The switcher
  changes the text in place and moves the address to that language's page; the choice is saved, and on `/` a saved
  English or Kazakh choice redirects before anything is drawn (inline script in `index.html`).
- `src/index.css` — the palette (the only place colours are defined) and shared components.

## Build

`npm run build` runs `vite build`, then `vite build --ssr src/entry-server.tsx`, then `scripts/prerender.mjs`,
which renders each language page into `dist/` (`index.html`, `en/index.html`, `kz/index.html`) with its `<head>`
from `src/head.ts`, inlines the stylesheet and preloads the fonts the first screen needs. The client hydrates
the HTML. Unknown addresses get `404.html` (the Russian page with a 404 status and `noindex`) plus `sitemap.xml`.

## Assets

- Inter is self-hosted in `src/assets/fonts` (the same variable files Google Fonts served: latin, latin-ext,
  cyrillic, cyrillic-ext for Kazakh letters), with an Arial fallback stretched to Inter's metrics.
- The hero portrait ships as AVIF + WebP in 480–1200w (`src/content/portrait.ts`, `src/lib/responsive.ts`).
- Project logos are WebP or SVG in `src/assets/projects-logos/`.
- The dot wave in the hero is three.js (`src/components/DottedSurface.tsx`), loaded as its own chunk after hydration.

## SEO

- `src/head.ts` (build time only): title and description per language, canonical, hreflang (ru, en, kk,
  x-default → `/`), Open Graph and Twitter cards, JSON-LD (Person, Organization for own products, WebSite)
  and `sitemap.xml`. `public/robots.txt` points to the sitemap.
- Open Graph cards `public/og/<lang>.jpg` are shots of the site's own hero; re-shoot them with
  `scripts/og/shoot.js` (instructions inside) when the hero changes.

## Deploy

Vercel, `vercel.json`: `npm run build` → `dist`, clean URLs without trailing slashes, immutable caching for `/assets/*`.
