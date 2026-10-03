import { NOT_FOUND } from '../i18n/not-found';

/** One static 404.html serves every unknown URL, so it speaks both languages. */
export function NotFoundPage() {
    const { en, ru } = NOT_FOUND;

    return (
        <main className="mx-auto flex min-h-svh max-w-xl flex-col justify-center gap-12 px-6 py-24">
            <a href="/" className="font-display text-[17px] font-semibold tracking-[-0.01em]">
                Chingiz Salikhov
            </a>
            <div>
                <h1 className="font-display text-5xl leading-none tracking-[-0.04em]">{en.title}</h1>
                <p className="mt-4 text-lg text-ink-2">{en.text}</p>
                <a href="/" className="link mt-5 inline-block">
                    {en.home}
                </a>
            </div>
            <div lang="ru" className="border-t border-tint/10 pt-10">
                <p className="font-display text-2xl tracking-[-0.03em]">{ru.title}</p>
                <p className="mt-3 text-ink-2">{ru.text}</p>
                <a href="/ru" className="link mt-5 inline-block">
                    {ru.home}
                </a>
            </div>
        </main>
    );
}
