import { useEffect } from 'react';
import { I18nProvider } from './i18n/I18nProvider';
import { observeReveals } from './lib/reveal';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CasePage } from './pages/CasePage';
import { pageMeta } from './meta';
import type { Route } from './routes';
import type { Dictionary } from './i18n';

export function App({ route, dict }: { route: Route; dict: Dictionary }) {
    useEffect(() => {
        const html = document.documentElement;
        html.lang = route.lang;
        html.dataset.hydrated = '';
        // the prerendered <head> already has the title; this keeps it right in `vite dev`
        document.title = pageMeta(route, dict).title;
        return observeReveals();
    }, [route, dict]);

    return (
        <I18nProvider route={route} dict={dict}>
            {route.page === 'home' && <HomePage />}
            {route.page === 'case' && <CasePage slug={route.slug} />}
            {route.page === 'not-found' && <NotFoundPage />}
        </I18nProvider>
    );
}
