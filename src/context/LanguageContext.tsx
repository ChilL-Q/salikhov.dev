/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { translations, isRTL } from '../i18n/dictionaries';
import type { LanguageCode } from '../i18n/dictionaries';

interface LanguageContextType {
    language: LanguageCode;
    setLanguage: (lang: LanguageCode) => void;
    t: (key: string) => string;
    isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<LanguageCode>(() => {
        if (typeof window === 'undefined') return 'ru';
        const savedLang = localStorage.getItem('app_language') as LanguageCode;
        if (savedLang && translations[savedLang]) return savedLang;
        return 'ru';
    });

    const setLanguage = (lang: LanguageCode) => {
        setLanguageState(lang);
        localStorage.setItem('app_language', lang);
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

    // Apply RTL font setting to document body for global effect if needed
    useEffect(() => {
        if (isRTL(language)) {
            document.documentElement.setAttribute('dir', 'rtl');
            // We keep the main font, but we might want a specific Arabic font in the future
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
        }
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, isRtl: isRTL(language) }}>
            <div dir={isRTL(language) ? 'rtl' : 'ltr'} style={{ width: '100%', height: '100%' }}>
                {children}
            </div>
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
