import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';
import { resolveRoute } from './routes';
import { loadDictionary } from './i18n';

const route = resolveRoute(window.location.pathname);
const container = document.getElementById('root')!;

// the page's dictionary chunk is modulepreloaded, so this resolves without an extra round trip
loadDictionary(route.lang).then(dict => {
    const app = (
        <StrictMode>
            <App route={route} dict={dict} />
        </StrictMode>
    );
    // Built pages arrive prerendered (scripts/prerender.mjs); `vite dev` serves an empty root.
    if (container.firstElementChild) hydrateRoot(container, app);
    else createRoot(container).render(app);
});
