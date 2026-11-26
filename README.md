# salikhov.dev

Personal site of Chingiz Salikhov. React 19 + Vite + TypeScript + Tailwind v4, prerendered to static HTML.

## Tech stack

Versions are the ranges from `package.json`; the exact installed ones are pinned in `package-lock.json`.

| Technology | Version | Used for |
| --- | --- | --- |
| React, React DOM | `^19.2.0` | UI, hydration of the prerendered pages |
| TypeScript | `~5.9.3` | types, checked by `tsc -b` in the build |
| Vite, `@vitejs/plugin-react` | `^7.3.1`, `^5.1.1` | dev server, client and SSR builds |
| Tailwind CSS, `@tailwindcss/vite` | `^4.3.0` | styles |
| Framer Motion | `^12.34.0` | animations |
| Embla Carousel (`embla-carousel-react`, `-autoplay`, `-wheel-gestures`) | `^8.6.0`, `^8.6.0`, `^8.1.0` | projects carousel |
| three.js | `^0.184.0` | dot wave in the hero |
| Lucide React | `^0.563.0` | icons |
| ESLint, `typescript-eslint` | `^9.39.1`, `^8.48.0` | linting |

## Run locally

Needs Node.js `^20.19.0` or `>=22.12.0` (required by Vite 7) and npm. Install the dependencies from
`package-lock.json` once:

```bash
npm install
```

The scripts from `package.json`:

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with hot reload at http://localhost:5173. It also listens on the LAN, so the site opens from a phone at the Network address Vite prints. Another port: `PORT=3000 npm run dev`. |
| `npm run build` | Production build into `dist/`: type-check (`tsc -b`), client build, SSR build into `dist-ssr/`, then `scripts/prerender.mjs` writes the static pages. Details in [Build](#build). |
| `npm run preview` | Serves the built `dist/` at http://localhost:4173 (also on the LAN). Run `npm run build` first. |
| `npm run lint` | ESLint over the whole project. |

In `npm run preview` the language pages open with a trailing slash: `/en/` and `/kz/`. Without it, and on
unknown addresses, Vite falls back to the Russian page with status 200. Clean URLs and the 404 page only work
on Vercel (see [Deploy](#deploy)).

## Structure

- `src/landing/` — the sections: hero, about (bento), projects (carousel in `components/ui/`), contact, footer.
- `src/i18n/dictionaries.ts` — all texts in Russian, English and Kazakh.
- `src/i18n/langs.ts` — one page per language: Russian at `/`, English at `/en`, Kazakh at `/kz`. The switcher
  changes the text in place and moves the address to that language's page; the choice is saved, and on `/` a saved
  English or Kazakh choice redirects before anything is drawn (inline script in `index.html`).
- `src/index.css` — the palette (the only place colours are defined) and shared components: true black,
  neutral greys and white for text, cards and borders, orange as the only warm colour. Orange is used bright
  (text, strong borders, glows): at low opacity on black it turns brown.

## Build

`npm run build` runs `vite build`, then `vite build --ssr src/entry-server.tsx`, then `scripts/prerender.mjs`,
which renders each language page into `dist/` (`index.html`, `en/index.html`, `kz/index.html`) with its `<head>`
from `src/head.ts`, inlines the stylesheet and preloads the fonts the first screen needs. The client hydrates
the HTML. Unknown addresses get `404.html` (the Russian page with a 404 status and `noindex`) plus `sitemap.xml`.

## Assets

- Inter is self-hosted in `src/assets/fonts` (the same variable files Google Fonts served: latin, latin-ext,
  cyrillic, cyrillic-ext for Kazakh letters), with an Arial fallback stretched to Inter's metrics.
- The hero portrait ships as AVIF + WebP in 480–1200w (`src/content/portrait.ts`, `src/lib/responsive.ts`), built
  by `scripts/portrait/build.py` from `scripts/portrait/source.jpg` (the photo after an AI edit that lit the near
  arm) and its subject mask: cut-out without the armchairs, JPEG block seams evened out, 4:5 crop with the
  dissolve below the forearm, one Lanczos upscale (the source is 843 px wide) and light sharpening, black point
  at the page's black. On phones a CSS mask fades the lower edge under the hero text.
- Project logos are WebP or SVG in `src/assets/projects-logos/`.
- The dot wave in the hero is three.js (`src/components/DottedSurface.tsx`), loaded as its own chunk after hydration.

## SEO

- `src/head.ts` (build time only): title and description per language, canonical, hreflang (ru, en, kk,
  x-default → `/`), Open Graph and Twitter cards, JSON-LD (Person, Organization for own products, WebSite)
  and `sitemap.xml`. `public/robots.txt` points to the sitemap.
- Open Graph cards `public/og/<lang>.jpg` are shots of the site's own hero; re-shoot them with
  `scripts/og/shoot.js` (instructions inside) when the hero changes. The build publishes each as
  `/og/<lang>.<content hash>.jpg` and points og:image / twitter:image there, so a re-shot card gets a new URL
  and link previews that cache by URL (Telegram) update; nothing to rename by hand.

## WhatsApp Business

`scripts/whatsapp/`: the cover (`cover.js`, shot from the built site like the OG cards, two layouts), the profile
photo (`avatar.py`, from the portrait pipeline) and phone previews with safe zones (`preview.py`). They write to
`exports/whatsapp/`, which is git-ignored and not part of the site.

## Deploy

Vercel, `vercel.json`: `npm run build` → `dist`, clean URLs without trailing slashes, immutable caching for `/assets/*`.

## Contacts

- Site: [salikhov.dev](https://salikhov.dev)
- Telegram: [@mr_vibecoder](https://t.me/mr_vibecoder)
