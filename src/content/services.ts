import type { CaseSlug } from './cases';

/** Order on the page. Texts: `services.items.<id>`; `cases` are the case studies that prove the service. */
export const SERVICES: { id: 'websites' | 'apps' | 'ai' | 'automation' | 'design'; cases: CaseSlug[] }[] = [
    { id: 'websites', cases: ['kassimova-design', 'azhar-trading'] },
    { id: 'apps', cases: ['digital-menus', 'ab-ai'] },
    { id: 'ai', cases: ['ab-ai', 'qarau'] },
    { id: 'automation', cases: ['qarau', 'ab-ai'] },
    { id: 'design', cases: ['kassimova-design', 'digital-menus'] },
];
