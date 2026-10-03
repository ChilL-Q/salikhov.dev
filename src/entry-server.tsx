import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';
import { fontPreloads, headTags } from './head';
import type { Route } from './routes';

export { PRERENDER_ROUTES, NOT_FOUND_ROUTE, pathFor } from './routes';
export { sitemapXml } from './head';

/** Used by scripts/prerender.mjs at build time only. */
export function render(route: Route) {
    return {
        html: renderToString(
            <StrictMode>
                <App route={route} />
            </StrictMode>,
        ),
        head: headTags(route),
        fonts: fontPreloads(route),
        lang: route.lang,
    };
}
