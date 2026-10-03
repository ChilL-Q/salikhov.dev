import { useEffect } from 'react';
import { I18nProvider } from './i18n/I18nProvider';
import { observeReveals } from './lib/reveal';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CasePage } from './pages/CasePage';
import { pageMeta } from './seo';
import type { Route } from './routes';

export function App({ route }: { route: Route }) {
    useEffect(() => {
        const html = document.documentElement;
        html.lang = route.lang;
        html.dataset.hydrated = '';
        // the prerendered <head> already has the title; this keeps it right in `vite dev`
        document.title = pageMeta(route).title;
        return observeReveals();
    }, [route]);

    return (
        <I18nProvider route={route}>
            {route.page === 'home' && <HomePage />}
            {route.page === 'case' && <CasePage slug={route.slug} />}
            {route.page === 'not-found' && <NotFoundPage />}
        </I18nProvider>
    );
}
