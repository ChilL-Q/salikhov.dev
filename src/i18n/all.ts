import { en } from './en';
import { ru } from './ru';
import type { Dictionary, Lang } from '.';

/** Every dictionary at once — build time only (prerender, <head>, sitemap). */
export const dictionaries: Record<Lang, Dictionary> = { en, ru };
