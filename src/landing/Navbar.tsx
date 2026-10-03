import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';
import { LangSwitch } from '../components/LangSwitch';
import { pathFor } from '../routes';
import { CONTACTS } from '../site';
import { useCommandPalette } from '../components/palette/useCommandPalette';

const SECTIONS = ['work', 'services', 'process', 'about', 'contact'] as const;

export function Navbar() {
    const { d, lang, route } = useI18n();
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState<string | null>(null);
    const palette = useCommandPalette();

    // section links work from any page: on the home page they're plain anchors
    const home = route.page === 'home' ? '' : pathFor({ page: 'home', lang });

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 20);
            // the last section whose top has passed the upper third of the viewport
            const threshold = window.innerHeight * 0.35;
            let current: string | null = null;
            for (const id of SECTIONS) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= threshold) current = id;
            }
            const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
            setActive(atBottom ? SECTIONS[SECTIONS.length - 1] : current);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
        const onResize = () => window.innerWidth >= 1024 && setOpen(false);
        window.addEventListener('keydown', onKey);
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('keydown', onKey);
            window.removeEventListener('resize', onResize);
        };
    }, [open]);

    const solid = scrolled || open;
    // on a case page the "Work" section is where you are
    const current = route.page === 'case' ? 'work' : active;

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
                solid ? 'border-tint/10 bg-bg/95' : 'border-transparent'
            }`}
        >
            {/* first stop for keyboard users: past the navigation straight to the page */}
            <a
                href="#main"
                className="sr-only rounded-md bg-accent px-4 py-2 font-medium text-on-accent focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60]"
            >
                {d.nav.skip}
            </a>
            <nav aria-label={d.nav.main} className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-5 lg:px-10">
                <a href={home || '#top'} className="shrink-0 font-display text-[17px] font-semibold tracking-[-0.02em]">
                    Chingiz Salikhov
                </a>

                <div className="hidden items-center gap-10 lg:flex">
                    <ul className="flex gap-8 text-[15px]">
                        {SECTIONS.map(id => (
                            <li key={id}>
                                <a
                                    href={`${home}#${id}`}
                                    aria-current={current === id ? 'true' : undefined}
                                    className={`py-2 transition-colors ${current === id ? 'text-ink' : 'text-ink-2 hover:text-ink'}`}
                                >
                                    {d.nav[id]}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <LangSwitch />
                </div>

                <div className="flex items-center gap-3 lg:hidden">
                    <LangSwitch />
                    <button
                        type="button"
                        onClick={() => setOpen(o => !o)}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        aria-label={open ? d.nav.closeMenu : d.nav.openMenu}
                        className="-mr-2 grid size-11 place-items-center text-ink"
                    >
                        {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
                    </button>
                </div>
            </nav>

            {open && (
                <div id="mobile-menu" className="animate-[fadeIn_0.2s_ease-out] border-t border-tint/10 px-5 pt-3 pb-8 lg:hidden">
                    <ul className="flex flex-col">
                        {SECTIONS.map(id => (
                            <li key={id}>
                                <a
                                    href={`${home}#${id}`}
                                    onClick={() => setOpen(false)}
                                    className={`block py-3 font-display text-3xl tracking-[-0.03em] ${current === id ? 'text-ink' : 'text-ink-2'}`}
                                >
                                    {d.nav[id]}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <a href={CONTACTS.telegram} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-6 w-full">
                        {d.hero.cta}
                    </a>
                </div>
            )}
            {palette.palette}
        </header>
    );
}
