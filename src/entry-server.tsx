/* eslint-disable react-refresh/only-export-components -- build-time entry, never hot-reloaded */
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import type { LanguageCode } from './i18n/dictionaries';

export { LANGUAGES, LANGUAGE_PATHS, HTML_LANG } from './i18n/langs';
export { headTags, fontPreloads, sitemapXml } from './head';

/** Used by scripts/prerender.mjs at build time only. */
export function render(lang: LanguageCode): string {
    return renderToString(
        <StrictMode>
            <App initialLanguage={lang} />
        </StrictMode>,
    );
}
