import type { Dictionary } from './i18n';
import { NOT_FOUND } from './i18n/not-found';
import type { Route } from './routes';

/** Title and description of a page: the prerendered <head> (head.ts) and `vite dev` (App). */
export function pageMeta(route: Route, d: Dictionary): { title: string; description: string } {
    switch (route.page) {
        case 'home':
            return d.meta;
        case 'case': {
            const c = d.cases[route.slug];
            return { title: `${c.title} — ${d.work.caseStudy.toLowerCase()} · ${d.hero.name}`, description: c.summary };
        }
        case 'not-found':
            return { title: `${NOT_FOUND[route.lang].title} — salikhov.dev`, description: NOT_FOUND[route.lang].text };
    }
}
