import { createContext, useContext } from 'react';
import type { Dictionary, Lang } from '.';
import type { Route } from '../routes';

export interface I18n {
    lang: Lang;
    /** typed dictionary of the current language */
    d: Dictionary;
    route: Route;
    /** this page's path in every language */
    alt: Record<Lang, string>;
}

export const I18nContext = createContext<I18n | null>(null);

export function useI18n(): I18n {
    const i18n = useContext(I18nContext);
    if (!i18n) throw new Error('useI18n must be used inside <I18nProvider>');
    return i18n;
}
