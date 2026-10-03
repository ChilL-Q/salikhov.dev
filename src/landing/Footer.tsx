import { useLanguage } from '../context/LanguageContext';

export const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer style={{
            padding: '40px 24px',
            textAlign: 'center',
            maxWidth: '1168px',
            margin: '0 auto',
        }}>
            <div style={{
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12), transparent)',
                marginBottom: '32px',
            }} />
            <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', letterSpacing: '0.02em' }}>
                {t('footer.copyright')}
            </p>
        </footer>
    );
};