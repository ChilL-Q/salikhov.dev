import React from 'react';
import { Shield } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface PrivacyPolicyContentProps {
    isMobile?: boolean;
}

const PrivacyPolicyContentComponent: React.FC<PrivacyPolicyContentProps> = ({ isMobile }) => {
    const { t } = useLanguage();

    return (
        <div style={{
            padding: isMobile ? '0' : '20px',
            color: 'white',
            lineHeight: 1.6,
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
                    background: 'linear-gradient(135deg, #64748B, #475569)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Shield size={24} color="white" />
                </div>
                <div>
                    <h2 style={{ margin: 0, fontSize: isMobile ? '20px' : '24px', fontWeight: 600 }}>{t('privacy.title')}</h2>
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>{t('privacy.updated')}</span>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: isMobile ? '14px' : '15px', color: 'rgba(255,255,255,0.8)' }}>
                <section>
                    <h3 style={{ color: 'white', fontSize: '16px', marginBottom: '8px', fontWeight: 600 }}>{t('privacy.s1Title')}</h3>
                    <p style={{ margin: 0 }}>
                        {t('privacy.s1Desc')}
                    </p>
                </section>

                <section>
                    <h3 style={{ color: 'white', fontSize: '16px', marginBottom: '8px', fontWeight: 600 }}>{t('privacy.s2Title')}</h3>
                    <p style={{ margin: 0 }}>
                        {t('privacy.s2Desc')}
                    </p>
                </section>

                <section>
                    <h3 style={{ color: 'white', fontSize: '16px', marginBottom: '8px', fontWeight: 600 }}>{t('privacy.s3Title')}</h3>
                    <p style={{ margin: 0 }}>
                        {t('privacy.s3Desc')}
                    </p>
                </section>

                <section>
                    <h3 style={{ color: 'white', fontSize: '16px', marginBottom: '8px', fontWeight: 600 }}>{t('privacy.s4Title')}</h3>
                    <p style={{ margin: 0 }}>
                        {t('privacy.s4Desc')}
                    </p>
                </section>
            </div>
        </div>
    );
};

export const PrivacyPolicyContent = React.memo(PrivacyPolicyContentComponent);
