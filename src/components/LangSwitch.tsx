import { LANGS } from '../i18n';
import { useI18n } from '../i18n/useI18n';

/** EN / RU — plain links to this page in the other language, so it works before hydration too. */
export function LangSwitch() {
    const { lang, alt, d } = useI18n();

    return (
        <nav aria-label={d.nav.language} className="flex items-center rounded-full border border-tint/15 p-0.5 font-mono text-xs">
            {LANGS.map(code => (
                <a
                    key={code}
                    href={alt[code]}
                    hrefLang={code}
                    lang={code}
                    aria-current={code === lang ? 'page' : undefined}
                    className={`rounded-full px-2.5 py-1.5 uppercase transition-colors ${
                        code === lang ? 'bg-tint/10 text-ink' : 'text-ink-3 hover:text-ink'
                    }`}
                >
                    {code}
                </a>
            ))}
        </nav>
    );
}
