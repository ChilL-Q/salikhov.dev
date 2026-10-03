import type { ReactNode } from 'react';
import { dictionaries, translate } from '.';
import { alternates, type Route } from '../routes';
import { I18nContext } from './useI18n';

/** The language comes from the URL (via the route), so server and client always render the same text. */
export function I18nProvider({ route, children }: { route: Route; children: ReactNode }) {
    const d = dictionaries[route.lang];
    const value = {
        lang: route.lang,
        d,
        t: (path: string) => translate(d, path),
        route,
        alt: alternates(route),
    };
    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
