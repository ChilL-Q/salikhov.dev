import { en } from './en';
import { ru } from './ru';

export type Lang = 'en' | 'ru';
export type Dictionary = typeof en;

/** Order = order in the language switcher. EN is the default and lives at the site root. */
export const LANGS: Lang[] = ['en', 'ru'];

export const dictionaries: Record<Lang, Dictionary> = { en, ru };

/** Dotted-path lookup ("hero.name"); returns the path itself when the key is missing. */
export function translate(dict: Dictionary, path: string): string {
    let node: unknown = dict;
    for (const key of path.split('.')) {
        if (!node || typeof node !== 'object') return path;
        node = (node as Record<string, unknown>)[key];
    }
    return typeof node === 'string' ? node : path;
}
