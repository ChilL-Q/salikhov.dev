import { NOT_FOUND } from '../i18n/not-found';

/** One static 404.html serves every unknown URL, so it speaks both languages. */
export function NotFoundPage() {
    const { en, ru } = NOT_FOUND;

    return (
        <main className="mx-auto flex min-h-svh max-w-xl flex-col justify-center gap-8 px-6 py-24">
            <p className="font-mono text-sm text-accent">~/salikhov.dev $ 404</p>
            <div>
                <h1 className="text-4xl font-bold tracking-tight">{en.title}</h1>
                <p className="mt-3 text-ink-2">{en.text}</p>
                <a href="/" className="mt-4 inline-block font-medium text-accent-light underline underline-offset-4 hover:text-ink">
                    {en.home}
                </a>
            </div>
            <div lang="ru">
                <p className="text-xl font-semibold">{ru.title}</p>
                <p className="mt-2 text-ink-2">{ru.text}</p>
                <a href="/ru" className="mt-4 inline-block font-medium text-accent-light underline underline-offset-4 hover:text-ink">
                    {ru.home}
                </a>
            </div>
        </main>
    );
}
