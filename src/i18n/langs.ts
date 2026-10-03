import type { LanguageCode } from './dictionaries';

/**
 * Every language has its own prerendered page: Russian, the site's default, at the root; English and
 * Kazakh under a prefix. The language switcher swaps the text in place and keeps the address in step.
 */
export const LANGUAGES: LanguageCode[] = ['ru', 'en', 'kz'];
export const DEFAULT_LANGUAGE: LanguageCode = 'ru';

export const LANGUAGE_PATHS: Record<LanguageCode, string> = { ru: '/', en: '/en', kz: '/kz' };

/** BCP 47 tags for <html lang>, hreflang and og:locale: 'kz' is the country, the language is 'kk'. */
export const HTML_LANG: Record<LanguageCode, string> = { ru: 'ru', en: 'en', kz: 'kk' };

export const PAGE_TITLES: Record<LanguageCode, string> = {
    ru: 'Чингиз Салихов | Full Stack разработчик и AI',
    en: 'Chingiz Salikhov | Full Stack Developer & AI',
    kz: 'Чингиз Салихов | Full Stack әзірлеуші және AI',
};

/** '/en' → 'en'; the root and any unknown path (the 404 page is the Russian one) → 'ru'. */
export function languageFromPath(pathname: string): LanguageCode {
    const path = pathname.replace(/\/+$/, '') || '/';
    return LANGUAGES.find(lang => LANGUAGE_PATHS[lang] === path) ?? DEFAULT_LANGUAGE;
}
