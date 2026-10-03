import { dictionaries } from './i18n';
import type { Route } from './routes';

/** Title and description of a page: the prerendered <head> (head.ts) and `vite dev` (App). */
export function pageMeta(route: Route): { title: string; description: string } {
    const d = dictionaries[route.lang];
    switch (route.page) {
        case 'home':
            return d.meta;
        case 'case': {
            const c = d.cases[route.slug];
            return { title: `${c.title} — ${d.work.caseStudy.toLowerCase()} · ${d.hero.name}`, description: c.summary };
        }
        case 'not-found':
            return { title: `${d.notFound.title} — salikhov.dev`, description: d.notFound.text };
    }
}
