/**
 * Only what actually runs in the case studies and their repositories (package.json, pyproject.toml,
 * Dockerfile, CI) — plus this site (WebGL). Names aren't translated.
 */
export const STACK: { dir: string; label: string; items: string[] }[] = [
    { dir: 'frontend', label: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Astro', 'Vite', 'Tailwind CSS', 'Framer Motion', 'WebGL'] },
    { dir: 'backend', label: 'Backend', items: ['Python', 'FastAPI', 'aiohttp', 'Node.js', 'Express', 'PostgreSQL', 'SQLAlchemy', 'Celery', 'Redis', 'iiko & 1C integrations'] },
    { dir: 'ai-bots', label: 'AI & bots', items: ['OpenAI API', 'aiogram', 'Telegram Bot API', 'Telegram Mini Apps', 'WhatsApp (Twilio)'] },
    { dir: 'infra', label: 'Infra', items: ['Docker', 'GitHub Actions', 'Vercel', 'Sentry'] },
];
