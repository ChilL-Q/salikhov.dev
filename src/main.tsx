import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { languageFromPath } from './i18n/langs'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App initialLanguage={languageFromPath(window.location.pathname)} />
  </StrictMode>
)

// Built pages arrive prerendered (scripts/prerender.mjs) and are hydrated; the dev server sends an empty root.
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
