import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';
import { resolveRoute } from './routes';

const route = resolveRoute(window.location.pathname);
const container = document.getElementById('root')!;
const app = (
    <StrictMode>
        <App route={route} />
    </StrictMode>
);

// Built pages arrive prerendered (scripts/prerender.mjs); `vite dev` serves an empty root.
if (container.firstElementChild) hydrateRoot(container, app);
else createRoot(container).render(app);
