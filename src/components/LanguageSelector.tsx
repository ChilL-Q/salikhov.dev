import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { LanguageCode } from '../i18n/dictionaries';

const languages: { code: LanguageCode; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'kz', label: 'Қазақша', flag: '🇰🇿' },
];

export const LanguageSelector = () => {
    const { language, setLanguage } = useLanguage();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selected = languages.find(l => l.code === language) || languages[0];

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>         document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div style={{ position: 'relative', display: 'inline-block' }} ref={dropdownRef}>
            <button
                onClick={() => setOpen(o => !o)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 14px',
                    borderRadius: '100px',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--text-secondary)',
                    background: open ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${open ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.1)'}`,
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                }}
            >
                <span>{selected.flag}</span>
                <span>{selected.label}</span>
                <ChevronDown size={14} style={{ transition: 'transform 0.2s ease', transform: open ? 'rotate(180deg)' : 'rotate(0)' }} />
            </button>

            {open && (
                <div style={{
                    position: 'absolute',
                    right: 0,
                    top: '100%',
                    marginTop: '8px',
                    minWidth: '160px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: 'rgba(15, 15, 17, 0.95)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 16px 48px -12px rgba(0,0,0,0.5)',
                    zIndex: 9999,
                    animation: 'fadeIn 0.15s ease-out',
                }}>
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => {
                                setLanguage(lang.code);
                                setOpen(false);
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
                                background: lang.code === language ? 'rgba(245,158,11,0.08)' : 'transparent',
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
                            <span style={{ fontSize: '16px' }}>{lang.flag}</span>
                            <span style={{ flex: 1 }}>{lang.label}</span>
                            {lang.code === language && <Check size={14} style={{ color: 'var(--accent-orange)' }} />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};