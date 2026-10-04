/**
 * Static prerender: renders each language page of the SSR bundle into dist/ (plus 404.html and sitemap.xml),
 * so every page ships its content, <head> and font preloads as plain HTML; the client bundle then hydrates it.
 * Runs after `vite build` (client → dist/) and `vite build --ssr` (→ dist-ssr/).
 */
import { copyFile, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrDir = join(root, 'dist-ssr');

const { render, headTags, fontPreloads, sitemapXml, LANGUAGES, LANGUAGE_PATHS, HTML_LANG } = await import(
    pathToFileURL(join(ssrDir, 'entry-server.js')).href
);

const assets = await readdir(join(dist, 'assets'));

// The stylesheet is small: inline it instead of a render-blocking request.
const stylesheet = /<link rel="stylesheet" crossorigin href="\/assets\/([\w.-]+\.css)">/;
let template = await readFile(join(dist, 'index.html'), 'utf8');
const cssFile = template.match(stylesheet)?.[1];
if (!cssFile) throw new Error('prerender: stylesheet link not found in dist/index.html');
const css = await readFile(join(dist, 'assets', cssFile), 'utf8');
template = template.replace(stylesheet, () => `<style>${css}</style>`);

/** src/assets/fonts/inter-latin.woff2 → /assets/inter-latin-<hash>.woff2 */
function fontUrl(name) {
    const file = assets.find(a => new RegExp(`^${name}-[\\w-]{8}\\.woff2$`).test(a));
    if (!file) throw new Error(`prerender: no built font for "${name}"`);
    return `/assets/${file}`;
}

/**
 * Open Graph cards (public/og/<lang>.jpg, copied to dist/og/) get a copy named by their content hash,
 * dist/og/<lang>.<hash>.jpg, and the pages point to that: every re-shoot changes the URL, so link previews
 * that cache images by URL (Telegram) show the new card. The plain <lang>.jpg stays for old links.
 */
async function versionedOgImage(lang) {
    const file = join(dist, 'og', `${lang}.jpg`);
    const hash = createHash('sha256').update(await readFile(file)).digest('hex').slice(0, 10);
    const name = `${lang}.${hash}.jpg`;
    await copyFile(file, join(dist, 'og', name));
    return `/og/${name}`;
}

const ogImages = Object.fromEntries(await Promise.all(LANGUAGES.map(async lang => [lang, await versionedOgImage(lang)])));

function page(lang, options) {
    const preloads = fontPreloads(lang).map(name => `<link rel="preload" href="${fontUrl(name)}" as="font" type="font/woff2" crossorigin>`);
    return template
        .replace('<html lang="ru">', `<html lang="${HTML_LANG[lang]}">`)
        .replace('<!--app-head-->', () => [headTags(lang, { ogImage: ogImages[lang], ...options }), ...preloads].join('\n    '))
        .replace('<!--app-html-->', () => render(lang));
}

async function write(file, content) {
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, content);
    console.log(`  prerendered ${file.slice(root.length + 1)}`);
}

for (const lang of LANGUAGES) {
    const path = LANGUAGE_PATHS[lang];
    await write(join(dist, path === '/' ? 'index.html' : `${path.slice(1)}/index.html`), page(lang));
}
// Unknown addresses get the Russian page (as the old single-page site did), now with a 404 status and noindex
await write(join(dist, '404.html'), page('ru', { notFound: true }));
await write(join(dist, 'sitemap.xml'), sitemapXml(new Date().toISOString().slice(0, 10)));

await rm(ssrDir, { recursive: true, force: true });
