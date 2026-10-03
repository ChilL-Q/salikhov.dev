import { useState, useRef, useEffect, useId } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { LanguageCode } from '../i18n/dictionaries';
import { HTML_LANG } from '../i18n/langs';

const languages: { code: LanguageCode; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'kz', label: 'Қазақша', flag: '🇰🇿' },
];

/** A disclosure: the button opens a list of language buttons; the current one is marked with aria-current. */
export const LanguageSelector = () => {
    const { language, setLanguage, t } = useLanguage();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const listId = useId();

    const selected = languages.find(l => l.code === language) || languages[0];

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key !== 'Escape') return;
            // focus goes back to the button only if it was inside the menu (a mouse click may not focus at all)
            if (dropdownRef.current?.contains(document.activeElement)) toggleRef.current?.focus();
            setOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    return (
        <div style={{ position: 'relative', display: 'inline-block' }} ref={dropdownRef}>
            <button
                ref={toggleRef}
                onClick={() => setOpen(o => !o)}
                aria-expanded={open}
                aria-controls={listId}
                aria-label={`${t('a11y.language')}: ${selected.label}`}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 14px',
                    borderRadius: '100px',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--text-secondary)',
                    background: open ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)',
                    border: `1px solid ${open ? 'rgba(255,255,255,0.26)' : 'rgba(255,255,255,0.16)'}`,
                    transition: 'background 0.2s ease, border-color 0.2s ease',
                    cursor: 'pointer',
                }}
            >
                <span aria-hidden="true">{selected.flag}</span>
                <span>{selected.label}</span>
                <ChevronDown size={14} aria-hidden="true" style={{ transition: 'transform 0.2s ease', transform: open ? 'rotate(180deg)' : 'rotate(0)' }} />
            </button>

            {open && (
                <ul id={listId} role="list" style={{
                    listStyle: 'none',
                    padding: 0,
                    position: 'absolute',
                    right: 0,
                    top: '100%',
                    marginTop: '8px',
                    minWidth: '160px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: 'rgb(var(--bg-raised-rgb) / 0.95)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.16)',
                    boxShadow: '0 16px 48px -12px rgba(0,0,0,0.5)',
                    zIndex: 9999,
                    animation: 'fadeIn 0.15s ease-out',
                }}>
                    {languages.map((lang) => (
                        <li key={lang.code}>
                        <button
                            lang={HTML_LANG[lang.code]}
                            aria-current={lang.code === language ? 'true' : undefined}
                            onClick={() => {
                                setLanguage(lang.code);
                                setOpen(false);
                                toggleRef.current?.focus();
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                width: '100%',
                                padding: '10px 16px',
                                fontSize: '14px',
                                fontWeight: lang.code === language ? 600 : 400,
                                color: lang.code === language ? 'var(--accent-orange)' : 'var(--text-secondary)',
                                background: lang.code === language ? 'rgba(255,255,255,0.08)' : 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'background 0.15s ease',
                            }}
                            onMouseEnter={e => {
                                if (lang.code !== language) e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                            }}
                            onMouseLeave={e => {
                                if (lang.code !== language) e.currentTarget.style.background = 'transparent';
                            }}
                        >
                            <span aria-hidden="true" style={{ fontSize: '16px' }}>{lang.flag}</span>
                            <span style={{ flex: 1 }}>{lang.label}</span>
                            {lang.code === language && <Check size={14} aria-hidden="true" style={{ color: 'var(--accent-orange)' }} />}
                        </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};