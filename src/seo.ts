import { dictionaries, LANGS } from './i18n';
import { alternates, pathFor, type Route } from './routes';
import { SITE_URL } from './site';

const OG_LOCALE = { en: 'en_US', ru: 'ru_RU' } as const;

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const url = (path: string) => SITE_URL + (path === '/' ? '/' : path);

/**
 * Font files (src/assets/fonts/<name>.woff2) preloaded per language: the headline's display face.
 * Body fonts are found early anyway, since the CSS is inlined. Cyrillic text still needs the
 * latin file for spaces, digits and punctuation.
 */
export function fontPreloads(route: Route): string[] {
    return route.lang === 'ru' ? ['geologica-cyr', 'geologica-lat'] : ['geologica-lat'];
}

/** <head> tags of a prerendered page. */
export function headTags(route: Route): string {
    const { meta, notFound } = dictionaries[route.lang];

    if (route.page === 'not-found') {
        return [
            `<title>${escape(notFound.title)} — salikhov.dev</title>`,
            '<meta name="robots" content="noindex">',
        ].join('\n    ');
    }

    const alt = alternates(route);
    const canonical = url(pathFor(route));
    return [
        `<title>${escape(meta.title)}</title>`,
        `<meta name="description" content="${escape(meta.description)}">`,
        `<link rel="canonical" href="${canonical}">`,
        ...LANGS.map(lang => `<link rel="alternate" hreflang="${lang}" href="${url(alt[lang])}">`),
        `<link rel="alternate" hreflang="x-default" href="${url(alt.en)}">`,
        '<meta property="og:type" content="website">',
        '<meta property="og:site_name" content="salikhov.dev">',
        `<meta property="og:url" content="${canonical}">`,
        `<meta property="og:title" content="${escape(meta.title)}">`,
        `<meta property="og:description" content="${escape(meta.description)}">`,
        `<meta property="og:locale" content="${OG_LOCALE[route.lang]}">`,
        ...LANGS.filter(lang => lang !== route.lang).map(lang => `<meta property="og:locale:alternate" content="${OG_LOCALE[lang]}">`),
    ].join('\n    ');
}
