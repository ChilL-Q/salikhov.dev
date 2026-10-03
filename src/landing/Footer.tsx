import { useI18n } from '../i18n/useI18n';
import { CONTACTS } from '../site';
import { LangSwitch } from '../components/LangSwitch';
import { GitHubIcon } from '../components/icons';

export function Footer() {
    const { d } = useI18n();

    return (
        <footer className="border-t border-tint/10">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-10">
                <p className="font-mono text-xs text-ink-3">{d.footer.rights}</p>
                <div className="flex items-center gap-5">
                    <a
                        href={CONTACTS.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 py-2 font-mono text-xs text-ink-2 transition-colors hover:text-ink"
                    >
                        <GitHubIcon size={16} />
                        GitHub
                    </a>
                    <LangSwitch />
                </div>
            </div>
        </footer>
    );
}
