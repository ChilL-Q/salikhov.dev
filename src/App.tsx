import { useEffect } from 'react';
import { I18nProvider } from './i18n/I18nProvider';
import { observeReveals } from './lib/reveal';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { dictionaries } from './i18n';
import type { Route } from './routes';

export function App({ route }: { route: Route }) {
    useEffect(() => {
        const html = document.documentElement;
        html.lang = route.lang;
        html.dataset.hydrated = '';
        // the prerendered <head> already has the title; this keeps it right in `vite dev`
        if (route.page === 'home') document.title = dictionaries[route.lang].meta.title;
        return observeReveals();
    }, [route]);

    return (
        <I18nProvider route={route}>
            {route.page === 'home' ? <HomePage /> : <NotFoundPage />}
        </I18nProvider>
    );
}
