import { LANGS, type Lang } from './i18n';

export type Route =
    | { page: 'home'; lang: Lang }
    | { page: 'not-found'; lang: Lang };

/** EN lives at the root, every other language under its own prefix. */
const PREFIX: Record<Lang, string> = { en: '', ru: '/ru' };

/** Canonical path of a route: no trailing slash, except the root itself. */
export function pathFor(route: Route): string {
    const prefix = PREFIX[route.lang];
    switch (route.page) {
        case 'home':
            return prefix || '/';
        case 'not-found':
            return '/404';
    }
}

export function resolveRoute(pathname: string): Route {
    const path = pathname.replace(/\/+$/, '') || '/';
    for (const lang of LANGS) {
        const prefix = PREFIX[lang];
        if (!prefix) continue;
        if (path === prefix) return { page: 'home', lang };
        if (path.startsWith(`${prefix}/`)) return { page: 'not-found', lang: 'en' };
    }
    if (path === '/') return { page: 'home', lang: 'en' };
    // Vercel serves the single prerendered 404.html for every unknown URL, so it is always EN
    return { page: 'not-found', lang: 'en' };
}

/** The same page in every language, for the switcher and hreflang. */
export function alternates(route: Route): Record<Lang, string> {
    return Object.fromEntries(LANGS.map(lang => [lang, pathFor({ ...route, lang })])) as Record<Lang, string>;
}

/** Every page written to dist/ by scripts/prerender.mjs. */
export const PRERENDER_ROUTES: Route[] = LANGS.map(lang => ({ page: 'home', lang }));
export const NOT_FOUND_ROUTE: Route = { page: 'not-found', lang: 'en' };
