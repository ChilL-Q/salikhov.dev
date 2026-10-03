import { en } from './en';
import { ru } from './ru';

export type Lang = 'en' | 'ru';
export type Dictionary = typeof en;

/** Order = order in the language switcher. EN is the default and lives at the site root. */
export const LANGS: Lang[] = ['en', 'ru'];

export const dictionaries: Record<Lang, Dictionary> = { en, ru };
