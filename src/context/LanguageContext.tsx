/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { translations } from '../i18n/dictionaries';
import type { LanguageCode } from '../i18n/dictionaries';
import { HTML_LANG, LANGUAGE_PATHS, PAGE_TITLES } from '../i18n/langs';

interface LanguageContextType {
    language: LanguageCode;
    setLanguage: (lang: LanguageCode) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * The page's language comes from its address (src/i18n/langs.ts), so the prerendered HTML and the
 * hydrating app agree. A saved choice still wins on the root page: index.html redirects before paint.
 */
export const LanguageProvider: React.FC<{ initialLanguage: LanguageCode; children: ReactNode }> = ({ initialLanguage, children }) => {
    const [language, setLanguageState] = useState<LanguageCode>(initialLanguage);

    const setLanguage = (lang: LanguageCode) => {
        setLanguageState(lang);
        localStorage.setItem('app_language', lang);
        // switch in place as before, and move the address to that language's page (the hash stays)
        const path = LANGUAGE_PATHS[lang];
        if (window.location.pathname !== path) {
            window.history.replaceState(null, '', path + window.location.search + window.location.hash);
        }
    };

    const t = (path: string): string => {
        const keys = path.split('.');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let current: any = translations[language];

        for (const key of keys) {
            if (!current || typeof current !== 'object' || current[key] === undefined) {
                console.warn(`Translation key not found: ${path} for language: ${language}`);
                // Fallback to English if translation is missing
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                let englishFallback: any = translations['en'];
                for (const k of keys) {
                    if (!englishFallback || typeof englishFallback !== 'object' || englishFallback[k] === undefined) return path;
                    englishFallback = englishFallback[k];
                }
                return typeof englishFallback === 'string' ? englishFallback : path;
            }
            current = current[key];
        }
        return typeof current === 'string' ? current : path;
    };

    useEffect(() => {
        document.documentElement.setAttribute('lang', HTML_LANG[language]);
        document.title = PAGE_TITLES[language];
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
