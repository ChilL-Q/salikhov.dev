import type { WorkImageKey } from './work-images';

/** Order = order on the home page and of the "next case" links. Texts live in i18n (`cases.<slug>`). */
export const CASE_SLUGS = ['qarau', 'ab-ai', 'digital-menus', 'kassimova-design', 'azhar-trading'] as const;
export type CaseSlug = (typeof CASE_SLUGS)[number];

/** Key of a localized stack group label (`work.groups.<key>`). */
export type StackGroup = 'product' | 'backend' | 'ai' | 'integrations' | 'web' | 'landing' | 'thirdtime' | 'breakfast' | 'site';

/** The composition at the top of a card / case page. */
export type Stage =
    | { kind: 'browser-phone'; url: string; desktop: WorkImageKey; mobile: WorkImageKey; demo?: boolean }
    | { kind: 'phones'; phones: [WorkImageKey, WorkImageKey] };

export interface Shot {
    image: WorkImageKey;
    frame: 'browser' | 'phone' | 'plain';
    /** address shown in the browser frame */
    url?: string;
    /** key in `cases.<slug>.shots` */
    caption: string;
    /** the screen shows made-up numbers: labelled "demo data" */
    demo?: boolean;
    /** spans the full gallery width */
    wide?: boolean;
}

export interface CaseData {
    slug: CaseSlug;
    links: { label: string; url: string }[];
    /** taken from each project's repository (package.json / pyproject.toml), not from memory */
    stack: { group: StackGroup; items: string[] }[];
    stage: Stage;
    shots: Shot[];
    /** open for pilot clients: shows the pilot status and CTA */
    pilot?: boolean;
    /** my own product (counted in About) */
    own?: boolean;
}

export const CASES: CaseData[] = [
    {
        slug: 'qarau',
        own: true,
        pilot: true,
        links: [{ label: 'qarau.kz', url: 'https://qarau.kz' }],
        stack: [
            { group: 'product', items: ['Python 3.12', 'aiogram 3', 'Telegram Mini App', 'PostgreSQL 16', 'SQLAlchemy 2 (async)', 'Alembic', 'aiohttp'] },
            { group: 'integrations', items: ['iiko API (read-only)', 'Telegram Bot API'] },
            { group: 'landing', items: ['Astro', 'TypeScript'] },
        ],
        stage: { kind: 'browser-phone', url: 'qarau.kz', desktop: 'qarau/desktop', mobile: 'qarau/mobile' },
        shots: [
            { image: 'qarau/demo-chat', frame: 'plain', caption: 'chat', demo: true },
            { image: 'qarau/demo-dash', frame: 'plain', caption: 'dashboard', demo: true },
        ],
    },
    {
        slug: 'ab-ai',
        own: true,
        links: [{ label: 'ab-ai.kz', url: 'https://www.ab-ai.kz' }],
        stack: [
            { group: 'backend', items: ['Python 3.12', 'FastAPI', 'SQLAlchemy 2.0 (async)', 'PostgreSQL', 'Alembic', 'Celery', 'Redis'] },
            { group: 'ai', items: ['OpenAI gpt-4o-mini'] },
            { group: 'integrations', items: ['WhatsApp (Twilio)', 'Telegram Bot API', '1C / StoCRM / Excel import'] },
            { group: 'web', items: ['Next.js 15 (dashboard)', 'Next.js 16 (landing)', 'TypeScript', 'Tailwind CSS'] },
        ],
        // the dashboard card in the landing's first screen shows made-up numbers
        stage: { kind: 'browser-phone', url: 'ab-ai.kz', desktop: 'ab-ai/desktop', mobile: 'ab-ai/mobile', demo: true },
        shots: [{ image: 'ab-ai/how', frame: 'plain', caption: 'how', demo: true, wide: true }],
    },
    {
        slug: 'digital-menus',
        links: [
            { label: '3time.kz', url: 'https://3time.kz' },
            { label: 'thebreakfast.kz', url: 'https://thebreakfast.kz' },
        ],
        stack: [
            { group: 'thirdtime', items: ['React 18', 'TypeScript', 'Vite', 'React Router', 'Express', 'Vercel Functions', 'Vercel Blob'] },
            { group: 'breakfast', items: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Vercel Blob'] },
        ],
        stage: { kind: 'phones', phones: ['digital-menus/thirdtime', 'digital-menus/breakfast'] },
        shots: [
            { image: 'digital-menus/thirdtime-bar', frame: 'phone', caption: 'bar' },
            { image: 'digital-menus/breakfast-en', frame: 'phone', caption: 'english' },
        ],
    },
    {
        slug: 'kassimova-design',
        links: [{ label: 'kassimova.design', url: 'https://kassimova.design' }],
        stack: [{ group: 'site', items: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion'] }],
        stage: { kind: 'browser-phone', url: 'kassimova.design', desktop: 'kassimova-design/desktop', mobile: 'kassimova-design/mobile' },
        shots: [
            { image: 'kassimova-design/services', frame: 'browser', url: 'kassimova.design', caption: 'services' },
            { image: 'kassimova-design/portfolio', frame: 'browser', url: 'kassimova.design', caption: 'portfolio' },
        ],
    },
    {
        slug: 'azhar-trading',
        links: [{ label: 'azhar-trading.com', url: 'https://azhar-trading.com' }],
        stack: [{ group: 'site', items: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'Framer Motion', 'Embla Carousel'] }],
        stage: { kind: 'browser-phone', url: 'azhar-trading.com', desktop: 'azhar-trading/desktop', mobile: 'azhar-trading/mobile' },
        shots: [],
    },
];

export const caseBySlug = (slug: CaseSlug) => CASES.find(c => c.slug === slug)!;
