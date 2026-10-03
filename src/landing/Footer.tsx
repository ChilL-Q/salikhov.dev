import { useI18n } from '../i18n/useI18n';
import { CONTACTS } from '../site';
import { LangSwitch } from '../components/LangSwitch';
import { useModKey } from '../components/palette/useCommandPalette';

export function Footer() {
    const { d } = useI18n();
    const mod = useModKey();
    const [before, after] = d.footer.hint.split('{k}');

    return (
        <footer className="border-t border-tint/10">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-5 py-8 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between lg:px-10">
                <p>{d.footer.rights}</p>
                {/* the ⌘K menu is a quiet extra for keyboard users: only mentioned where there's a keyboard */}
                <p aria-hidden="true" className="hidden [@media(hover:hover)_and_(pointer:fine)]:block">
                    {before}
                    <kbd className="font-sans text-ink-2">{mod === '⌘' ? '⌘K' : 'Ctrl K'}</kbd>
                    {after}
                </p>
                <div className="flex items-center gap-6">
                    <a href={CONTACTS.github} target="_blank" rel="noopener noreferrer" className="py-2 transition-colors hover:text-ink">
                        GitHub
                    </a>
                    <LangSwitch />
                </div>
            </div>
        </footer>
    );
}
