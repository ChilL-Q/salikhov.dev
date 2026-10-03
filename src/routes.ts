import { LANGS, type Lang } from './i18n';
import { CASE_SLUGS, type CaseSlug } from './content/cases';

export type Route =
    | { page: 'home'; lang: Lang }
    | { page: 'case'; lang: Lang; slug: CaseSlug }
    | { page: 'not-found'; lang: Lang };

/** EN lives at the root, every other language under its own prefix. */
const PREFIX: Record<Lang, string> = { en: '', ru: '/ru' };

/** Canonical path of a route: no trailing slash, except the root itself. */
export function pathFor(route: Route): string {
    const prefix = PREFIX[route.lang];
    switch (route.page) {
        case 'home':
            return prefix || '/';
        case 'case':
            return `${prefix}/work/${route.slug}`;
        case 'not-found':
            return '/404';
    }
}

const isCaseSlug = (s: string): s is CaseSlug => (CASE_SLUGS as readonly string[]).includes(s);

export function resolveRoute(pathname: string): Route {
    let path = pathname.replace(/\/+$/, '') || '/';
    let lang: Lang = 'en';
    for (const code of LANGS) {
        const prefix = PREFIX[code];
        if (prefix && (path === prefix || path.startsWith(`${prefix}/`))) {
            lang = code;
            path = path.slice(prefix.length) || '/';
        }
    }
    if (path === '/') return { page: 'home', lang };
    const slug = path.match(/^\/work\/([^/]+)$/)?.[1];
    if (slug && isCaseSlug(slug)) return { page: 'case', lang, slug };
    // Vercel serves the single prerendered 404.html for every unknown URL, so it is always EN
    return { page: 'not-found', lang: 'en' };
}

/** The same page in every language, for the switcher and hreflang. */
export function alternates(route: Route): Record<Lang, string> {
    return Object.fromEntries(LANGS.map(lang => [lang, pathFor({ ...route, lang })])) as Record<Lang, string>;
}

/** Every page written to dist/ by scripts/prerender.mjs. */
export const PRERENDER_ROUTES: Route[] = LANGS.flatMap(lang => [
    { page: 'home', lang } as Route,
    ...CASE_SLUGS.map(slug => ({ page: 'case', lang, slug }) as Route),
]);
export const NOT_FOUND_ROUTE: Route = { page: 'not-found', lang: 'en' };
