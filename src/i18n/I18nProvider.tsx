import type { ReactNode } from 'react';
import type { Dictionary } from '.';
import { alternates, type Route } from '../routes';
import { I18nContext } from './useI18n';

/** The language comes from the URL (via the route), so server and client always render the same text. */
export function I18nProvider({ route, dict, children }: { route: Route; dict: Dictionary; children: ReactNode }) {
    const value = { lang: route.lang, d: dict, route, alt: alternates(route) };
    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
