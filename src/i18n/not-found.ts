import type { Lang } from '.';

/** The single 404.html serves every unknown URL, so its few lines ship in both languages. */
export const NOT_FOUND: Record<Lang, { title: string; text: string; home: string }> = {
    en: { title: 'Page not found', text: 'This page does not exist or has moved.', home: 'Back to the home page' },
    ru: { title: 'Страница не найдена', text: 'Такой страницы нет или она переехала.', home: 'На главную' },
};
