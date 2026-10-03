/**
 * Static prerender: renders every route of the SSR bundle into dist/, so each page ships its
 * content, <head> and font preloads as plain HTML; the client bundle then hydrates it.
 * Runs after `vite build` (client → dist/) and `vite build --ssr` (→ dist-ssr/).
 */
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'dist');
const ssrDir = join(root, 'dist-ssr');

const { render, PRERENDER_ROUTES, NOT_FOUND_ROUTE, pathFor } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href);

const assets = await readdir(join(dist, 'assets'));

// The whole stylesheet is ~5 KB gzipped: inline it instead of a render-blocking request.
const stylesheet = /<link rel="stylesheet" crossorigin href="\/assets\/([\w.-]+\.css)">/;
let template = await readFile(join(dist, 'index.html'), 'utf8');
const cssFile = template.match(stylesheet)?.[1];
if (!cssFile) throw new Error('prerender: stylesheet link not found in dist/index.html');
const css = await readFile(join(dist, 'assets', cssFile), 'utf8');
template = template.replace(stylesheet, () => `<style>${css}</style>`);

/** src/assets/fonts/onest-lat.woff2 → /assets/onest-lat-<hash>.woff2 */
function fontUrl(name) {
    const file = assets.find(a => new RegExp(`^${name}-[\\w-]{8}\\.woff2$`).test(a));
    if (!file) throw new Error(`prerender: no built font for "${name}"`);
    return `/assets/${file}`;
}

function page(route) {
    const { html, head, fonts, lang } = render(route);
    const preloads = fonts.map(name => `<link rel="preload" href="${fontUrl(name)}" as="font" type="font/woff2" crossorigin>`);
    return template
        .replace('<html lang="en">', `<html lang="${lang}">`)
        .replace('<!--app-head-->', [head, ...preloads].join('\n    '))
        .replace('<!--app-html-->', html);
}

async function write(file, content) {
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, content);
    console.log(`  prerendered ${file.slice(root.length + 1)}`);
}

for (const route of PRERENDER_ROUTES) {
    const path = pathFor(route);
    await write(join(dist, path === '/' ? 'index.html' : `${path.slice(1)}/index.html`), page(route));
}
await write(join(dist, '404.html'), page(NOT_FOUND_ROUTE));

await rm(ssrDir, { recursive: true, force: true });
