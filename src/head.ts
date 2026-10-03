/**
 * Build-time only (entry-server → scripts/prerender.mjs): what each prerendered page carries in <head> —
 * title, description, canonical, hreflang, Open Graph / Twitter cards, JSON-LD — and the sitemap.
 */
import { translations, type LanguageCode } from './i18n/dictionaries';
import { HTML_LANG, LANGUAGE_PATHS, LANGUAGES, DEFAULT_LANGUAGE, PAGE_TITLES } from './i18n/langs';
import { PORTRAIT } from './content/portrait';

export const SITE_URL = 'https://salikhov.dev';

const CONTACTS = {
    telegram: 'https://t.me/mr_vibecoder',
    instagram: 'https://instagram.com/salikhov.dev',
    github: 'https://github.com/ChilL-Q',
    email: 'salikhovchingiz@gmail.com',
};

const DESCRIPTIONS: Record<LanguageCode, string> = {
    ru: 'Чингиз Салихов — Full Stack разработчик и AI-энтузиаст из Астаны. Веб-продукты, AI-агенты и дизайн: Qarau AI, AB AI, Kassimova Design, Azhar Trading.',
    en: 'Chingiz Salikhov — Full Stack developer and AI enthusiast from Astana. Web products, AI agents and design: Qarau AI, AB AI, Kassimova Design, Azhar Trading.',
    kz: 'Чингиз Салихов — Астанадағы Full Stack әзірлеуші және ИИ әуесқойы. Веб-өнімдер, ИИ-агенттер және дизайн: Qarau AI, AB AI, Kassimova Design, Azhar Trading.',
};

/** the card text under the title: the hero line, then what I do */
const OG_DESCRIPTIONS: Record<LanguageCode, string> = {
    ru: `${translations.ru.hero.greeting} Full Stack разработка и AI-решения.`,
    en: `${translations.en.hero.greeting} Full Stack development and AI solutions.`,
    kz: `${translations.kz.hero.greeting} Full Stack әзірлеу және ИИ шешімдері.`,
};

const OG_LOCALE: Record<LanguageCode, string> = { ru: 'ru_RU', en: 'en_US', kz: 'kk_KZ' };

/** Projects that are my own products, for the Person's "founder of" links. */
const OWN_PRODUCTS = [
    { name: 'Qarau AI', url: 'https://qarau.kz' },
    { name: 'AB AI', url: 'https://www.ab-ai.kz' },
];

const KNOWS_ABOUT = ['React', 'TypeScript', 'Next.js', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'Three.js', 'Tailwind CSS', 'AI agents', 'LLM'];

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const url = (path: string) => SITE_URL + path;

/**
 * Inter files (src/assets/fonts/<name>.woff2) the first screen needs: latin always (digits, spaces,
 * punctuation), plus Cyrillic for Russian and Kazakh, plus the extended Cyrillic for Kazakh letters.
 */
export function fontPreloads(lang: LanguageCode): string[] {
    if (lang === 'en') return ['inter-latin'];
    if (lang === 'kz') return ['inter-latin', 'inter-cyrillic', 'inter-cyrillic-ext'];
    return ['inter-latin', 'inter-cyrillic'];
}

const PERSON_ID = `${SITE_URL}/#person`;

function jsonLd(lang: LanguageCode): object {
    const t = translations[lang];
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Person',
                '@id': PERSON_ID,
                name: translations.en.hero.name,
                alternateName: translations.ru.hero.name,
                url: `${SITE_URL}/`,
                image: url(PORTRAIT.fallback),
                jobTitle: t.about.role,
                description: DESCRIPTIONS[lang],
                email: `mailto:${CONTACTS.email}`,
                address: { '@type': 'PostalAddress', addressLocality: lang === 'en' ? 'Astana' : 'Астана', addressCountry: 'KZ' },
                sameAs: [CONTACTS.telegram, CONTACTS.instagram, CONTACTS.github],
                knowsAbout: KNOWS_ABOUT,
            },
            ...OWN_PRODUCTS.map(p => ({ '@type': 'Organization', name: p.name, url: p.url, founder: { '@id': PERSON_ID } })),
            {
                '@type': 'WebSite',
                '@id': `${SITE_URL}/#website`,
                url: `${SITE_URL}/`,
                name: 'salikhov.dev',
                inLanguage: LANGUAGES.map(l => HTML_LANG[l]),
                publisher: { '@id': PERSON_ID },
            },
        ],
    };
}

/** <head> tags of a prerendered page; the 404 page is the Russian page, kept out of the index. */
export function headTags(lang: LanguageCode, { notFound = false } = {}): string {
    const title = PAGE_TITLES[lang];
    if (notFound) return [`<title>${escape(title)}</title>`, '<meta name="robots" content="noindex">'].join('\n    ');

    const canonical = url(LANGUAGE_PATHS[lang]);
    const description = DESCRIPTIONS[lang];
    const ogDescription = OG_DESCRIPTIONS[lang];
    const image = `${SITE_URL}/og/${lang}.jpg`;
    // "</" can't appear inside the script element
    const ld = JSON.stringify(jsonLd(lang)).replace(/</g, '\\u003c');

    return [
        `<title>${escape(title)}</title>`,
        `<meta name="description" content="${escape(description)}">`,
        '<meta name="author" content="Chingiz Salikhov">',
        `<link rel="canonical" href="${canonical}">`,
        ...LANGUAGES.map(l => `<link rel="alternate" hreflang="${HTML_LANG[l]}" href="${url(LANGUAGE_PATHS[l])}">`),
        `<link rel="alternate" hreflang="x-default" href="${url(LANGUAGE_PATHS[DEFAULT_LANGUAGE])}">`,
        '<meta property="og:type" content="website">',
        '<meta property="og:site_name" content="salikhov.dev">',
        `<meta property="og:url" content="${canonical}">`,
        `<meta property="og:title" content="${escape(title)}">`,
        `<meta property="og:description" content="${escape(ogDescription)}">`,
        `<meta property="og:image" content="${image}">`,
        '<meta property="og:image:width" content="1200">',
        '<meta property="og:image:height" content="630">',
        `<meta property="og:image:alt" content="${escape(title)}">`,
        `<meta property="og:locale" content="${OG_LOCALE[lang]}">`,
        ...LANGUAGES.filter(l => l !== lang).map(l => `<meta property="og:locale:alternate" content="${OG_LOCALE[l]}">`),
        '<meta name="twitter:card" content="summary_large_image">',
        `<meta name="twitter:title" content="${escape(title)}">`,
        `<meta name="twitter:description" content="${escape(ogDescription)}">`,
        `<meta name="twitter:image" content="${image}">`,
        `<meta name="twitter:image:alt" content="${escape(title)}">`,
        `<script type="application/ld+json">${ld}</script>`,
    ].join('\n    ');
}

/** sitemap.xml: the three language pages, each listing the others as hreflang alternates. */
export function sitemapXml(lastmod: string): string {
    const links = [
        ...LANGUAGES.map(l => `    <xhtml:link rel="alternate" hreflang="${HTML_LANG[l]}" href="${url(LANGUAGE_PATHS[l])}"/>`),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${url(LANGUAGE_PATHS[DEFAULT_LANGUAGE])}"/>`,
    ];
    const entries = LANGUAGES.map(l =>
        ['  <url>', `    <loc>${url(LANGUAGE_PATHS[l])}</loc>`, `    <lastmod>${lastmod}</lastmod>`, ...links, '  </url>'].join('\n'),
    );
    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
        ...entries,
        '</urlset>',
        '',
    ].join('\n');
}
