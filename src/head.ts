/**
 * Build-time only (entry-server → scripts/prerender.mjs): everything a prerendered page carries in
 * <head> — meta, Open Graph / Twitter cards, hreflang, JSON-LD — and the sitemap.
 */
import { LANGS, type Lang } from './i18n';
import { dictionaries } from './i18n/all';
import { alternates, pathFor, PRERENDER_ROUTES, type Route } from './routes';
import { pageMeta } from './meta';
import { CONTACTS, SITE_URL } from './site';
import { CASES } from './content/cases';
import { SERVICES } from './content/services';
import { STACK } from './content/stack';
import { PORTRAIT } from './content/portrait';

const OG_LOCALE: Record<Lang, string> = { en: 'en_US', ru: 'ru_RU' };

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

/** 1200×630 cards in public/og, rendered from the site's own type and colours. */
function ogImage(route: Route): string {
    const name = route.page === 'case' ? `case-${route.slug}-${route.lang}` : `home-${route.lang}`;
    return `${SITE_URL}/og/${name}.jpg`;
}

const PERSON_ID = `${SITE_URL}/#person`;

function jsonLd(route: Route): object {
    const d = dictionaries[route.lang];
    const canonical = url(pathFor(route));

    if (route.page === 'case') {
        const c = d.cases[route.slug];
        const home = url(pathFor({ page: 'home', lang: route.lang }));
        return {
            '@context': 'https://schema.org',
            '@graph': [
                {
                    '@type': 'CreativeWork',
                    '@id': `${canonical}#case`,
                    name: c.title,
                    description: c.summary,
                    url: canonical,
                    image: ogImage(route),
                    inLanguage: route.lang,
                    author: { '@id': PERSON_ID },
                },
                {
                    '@type': 'BreadcrumbList',
                    itemListElement: [
                        { '@type': 'ListItem', position: 1, name: 'salikhov.dev', item: home },
                        { '@type': 'ListItem', position: 2, name: d.work.label, item: `${home}#work` },
                        { '@type': 'ListItem', position: 3, name: c.title, item: canonical },
                    ],
                },
            ],
        };
    }

    const sameAs = [CONTACTS.telegram, CONTACTS.instagram, CONTACTS.github];
    const address = { '@type': 'PostalAddress', addressLocality: route.lang === 'ru' ? 'Астана' : 'Astana', addressCountry: 'KZ' };
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Person',
                '@id': PERSON_ID,
                name: dictionaries.en.hero.name,
                alternateName: dictionaries.ru.hero.name,
                url: `${SITE_URL}/`,
                image: url(PORTRAIT.fallback),
                jobTitle: d.hero.role,
                email: `mailto:${CONTACTS.email}`,
                address,
                sameAs,
                knowsAbout: STACK.flatMap(group => group.items),
            },
            ...CASES.filter(c => c.own).map(c => ({
                '@type': 'Organization',
                name: d.cases[c.slug].title,
                url: c.links[0].url,
                founder: { '@id': PERSON_ID },
            })),
            {
                '@type': 'ProfessionalService',
                '@id': `${SITE_URL}/#service`,
                name: `${d.hero.name} — ${d.hero.role}`,
                description: d.meta.description,
                url: canonical,
                image: ogImage(route),
                logo: `${SITE_URL}/icon-256.png`,
                email: CONTACTS.email,
                telephone: '+77019813721',
                address,
                areaServed: ['Kazakhstan', 'Türkiye', 'United Arab Emirates'].map(name => ({ '@type': 'Country', name })),
                founder: { '@id': PERSON_ID },
                sameAs,
                hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: d.services.title,
                    itemListElement: SERVICES.map(s => ({
                        '@type': 'Offer',
                        itemOffered: { '@type': 'Service', name: d.services.items[s.id].title, description: d.services.items[s.id].benefit },
                    })),
                },
            },
            {
                '@type': 'WebSite',
                '@id': `${SITE_URL}/#website`,
                url: `${SITE_URL}/`,
                name: 'salikhov.dev',
                inLanguage: LANGS,
                publisher: { '@id': PERSON_ID },
            },
        ],
    };
}

/** <head> tags of a prerendered page. */
export function headTags(route: Route): string {
    const { title, description } = pageMeta(route, dictionaries[route.lang]);

    if (route.page === 'not-found') {
        return [`<title>${escape(title)}</title>`, '<meta name="robots" content="noindex">'].join('\n    ');
    }

    const alt = alternates(route);
    const canonical = url(pathFor(route));
    const image = ogImage(route);
    // "</" can't appear inside the script element
    const ld = JSON.stringify(jsonLd(route)).replace(/</g, '\\u003c');

    return [
        `<title>${escape(title)}</title>`,
        `<meta name="description" content="${escape(description)}">`,
        '<meta name="author" content="Chingiz Salikhov">',
        `<link rel="canonical" href="${canonical}">`,
        ...LANGS.map(lang => `<link rel="alternate" hreflang="${lang}" href="${url(alt[lang])}">`),
        `<link rel="alternate" hreflang="x-default" href="${url(alt.en)}">`,
        `<meta property="og:type" content="${route.page === 'case' ? 'article' : 'website'}">`,
        '<meta property="og:site_name" content="salikhov.dev">',
        `<meta property="og:url" content="${canonical}">`,
        `<meta property="og:title" content="${escape(title)}">`,
        `<meta property="og:description" content="${escape(description)}">`,
        `<meta property="og:image" content="${image}">`,
        '<meta property="og:image:width" content="1200">',
        '<meta property="og:image:height" content="630">',
        `<meta property="og:image:alt" content="${escape(title)}">`,
        `<meta property="og:locale" content="${OG_LOCALE[route.lang]}">`,
        ...LANGS.filter(lang => lang !== route.lang).map(lang => `<meta property="og:locale:alternate" content="${OG_LOCALE[lang]}">`),
        '<meta name="twitter:card" content="summary_large_image">',
        `<meta name="twitter:title" content="${escape(title)}">`,
        `<meta name="twitter:description" content="${escape(description)}">`,
        `<meta name="twitter:image" content="${image}">`,
        `<meta name="twitter:image:alt" content="${escape(title)}">`,
        `<script type="application/ld+json">${ld}</script>`,
    ].join('\n    ');
}

/** sitemap.xml: every language version of every page, each with its hreflang alternates. */
export function sitemapXml(lastmod: string): string {
    const entries = PRERENDER_ROUTES.map(route => {
        const alt = alternates(route);
        const links = [
            ...LANGS.map(lang => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${url(alt[lang])}"/>`),
            `    <xhtml:link rel="alternate" hreflang="x-default" href="${url(alt.en)}"/>`,
        ];
        return [`  <url>`, `    <loc>${url(pathFor(route))}</loc>`, `    <lastmod>${lastmod}</lastmod>`, ...links, `  </url>`].join('\n');
    });
    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
        ...entries,
        '</urlset>',
        '',
    ].join('\n');
}
