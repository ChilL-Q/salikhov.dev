import React from 'react';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { languages, LanguageCode } from '../../i18n/dictionaries';

interface LanguageSelectorContentProps {
    isMobile?: boolean;
}

const LanguageSelectorContentComponent: React.FC<LanguageSelectorContentProps> = ({ isMobile }) => {
    const { language, setLanguage, t } = useLanguage();

    const handleSelect = (code: LanguageCode) => {
        setLanguage(code);
        // Optional dispatch or local event if we need to alert the desktop environment
        // Currently Desktop just reads from Context normally.
    };

    return (
        <div style={{
            padding: isMobile ? '0' : '20px',
            color: 'white',
            height: '100%',
            overflowY: 'auto'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
                <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Globe size={24} color="white" />
                </div>
                <div>
                    <h2 style={{ margin: 0, fontSize: isMobile ? '20px' : '24px', fontWeight: 600 }}>{t('desktop.settings')}</h2>
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Select your preferred language</span>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {languages.map((lang) => (
                    <div
                        key={lang.code}
                        onClick={() => handleSelect(lang.code)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '16px',
                            background: language === lang.code ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)',
                            border: `1px solid rgba(255,255,255,${language === lang.code ? '0.2' : '0.05'})`,
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            if (language !== lang.code) e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                        }}
                        onMouseLeave={(e) => {
                            if (language !== lang.code) e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                        }}
                    >
                        <span style={{ fontSize: '16px', fontWeight: language === lang.code ? 600 : 400 }}>
                            {lang.label}
                        </span>
                        {language === lang.code && <Check size={20} color="#60A5FA" />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export const LanguageSelectorContent = React.memo(LanguageSelectorContentComponent);
