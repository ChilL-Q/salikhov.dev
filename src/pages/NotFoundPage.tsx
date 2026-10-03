import { dictionaries } from '../i18n';

/** One static 404.html serves every unknown URL, so it speaks both languages. */
export function NotFoundPage() {
    const { en, ru } = dictionaries;

    return (
        <main className="mx-auto flex min-h-svh max-w-xl flex-col justify-center gap-8 px-6 py-24">
            <p className="font-mono text-sm text-accent">~/salikhov.dev $ 404</p>
            <div>
                <h1 className="text-4xl font-bold tracking-tight">{en.notFound.title}</h1>
                <p className="mt-3 text-ink-2">{en.notFound.text}</p>
                <a href="/" className="mt-4 inline-block font-medium text-accent-light underline underline-offset-4 hover:text-ink">
                    {en.notFound.home}
                </a>
            </div>
            <div lang="ru">
                <p className="text-xl font-semibold">{ru.notFound.title}</p>
                <p className="mt-2 text-ink-2">{ru.notFound.text}</p>
                <a href="/ru" className="mt-4 inline-block font-medium text-accent-light underline underline-offset-4 hover:text-ink">
                    {ru.notFound.home}
                </a>
            </div>
        </main>
    );
}
