import { LANGS } from '../i18n';
import { useI18n } from '../i18n/useI18n';

/** EN · RU — plain links to this page in the other language, so it works before hydration too. */
export function LangSwitch() {
    const { lang, alt, d } = useI18n();

    return (
        <div role="group" aria-label={d.nav.language} className="flex items-center gap-1 text-sm">
            {LANGS.map((code, i) => (
                <span key={code} className="flex items-center gap-1">
                    {i > 0 && (
                        <span aria-hidden="true" className="text-ink-3">
                            ·
                        </span>
                    )}
                    <a
                        href={alt[code]}
                        hrefLang={code}
                        lang={code}
                        aria-current={code === lang ? 'page' : undefined}
                        className={`px-1 py-2 uppercase transition-colors ${code === lang ? 'text-ink' : 'text-ink-3 hover:text-ink'}`}
                    >
                        {code}
                    </a>
                </span>
            ))}
        </div>
    );
}
