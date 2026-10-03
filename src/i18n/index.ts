import type { en } from './en';

export type Lang = 'en' | 'ru';
export type Dictionary = typeof en;

/** Order = order in the language switcher. EN is the default and lives at the site root. */
export const LANGS: Lang[] = ['en', 'ru'];

/**
 * The browser only downloads its own language: each dictionary is a separate chunk
 * (preloaded by scripts/prerender.mjs). The build-time renderer uses ./all instead.
 */
export function loadDictionary(lang: Lang): Promise<Dictionary> {
    return lang === 'ru' ? import('./ru').then(m => m.ru) : import('./en').then(m => m.en);
}
