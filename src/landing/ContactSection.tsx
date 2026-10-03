import { useLanguage } from '@/context/LanguageContext';

const links = [
    { label: 'Instagram', href: 'https://instagram.com/salikhov.dev' },
    { label: 'WhatsApp', href: 'https://wa.me/77019813721' },
    { label: 'Telegram', href: 'https://t.me/mr_vibecoder' },
    { label: 'Email', href: 'mailto:salikhovchingiz@gmail.com' },
];

const FlipLink = ({ children, href }: { children: string; href: string }) => {
    // mailto: opened with target="_blank" leaves an empty tab behind
    const isExternal = href.startsWith('http');

    return (
        <a
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            aria-label={children}
            className="group relative block overflow-hidden whitespace-nowrap text-3xl font-black uppercase sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ lineHeight: 0.85, color: 'inherit', textDecoration: 'none' }}
        >
            <div className="flex" aria-hidden="true">
                {children.split('').map((letter, i) => (
                    <span
                        key={i}
                        className="inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-[110%] mobile-flip-top"
                        style={{
                            transitionDelay: `${i * 25}ms`,
                            '--letter-index': i,
                        } as React.CSSProperties}
                    >
                        {letter === ' ' ? '\u00A0' : letter}
                    </span>
                ))}
            </div>
            <div className="absolute inset-0 flex" aria-hidden="true">
                {children.split('').map((letter, i) => (
                    <span
                        key={i}
                        className="inline-block translate-y-[110%] transition-transform duration-300 ease-in-out group-hover:translate-y-0 mobile-flip-bottom"
                        style={{
                            transitionDelay: `${i * 25}ms`,
                            color: 'var(--accent-orange)',
                            '--letter-index': i,
                        } as React.CSSProperties}
                    >
                        {letter === ' ' ? '\u00A0' : letter}
                    </span>
                ))}
            </div>
        </a>
    );
};

export const ContactSection = () => {
    const { t } = useLanguage();

    return (
        <section id="contact" className="contact-section">
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                <p style={{ color: 'var(--accent-orange)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: 16 }}>
                    {t('nav.contact')}
                </p>
                <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: 16 }}>
                    <span className="gradient-text">{t('contact.getInTouch')}</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto', fontSize: 15, lineHeight: 1.7 }}>{t('contact.description')}</p>
            </div>

            <div className="flex flex-col items-center gap-2">
                {links.map((link) => (
                    <FlipLink key={link.label} href={link.href}>
                        {link.label}
                    </FlipLink>
                ))}
            </div>

            <style>{`
                .contact-section {
                    padding: 80px 24px 120px;
                    max-width: 1168px; /* 1120 content + 2×24 padding */
                    margin: 0 auto;
                    transition: padding 0.3s ease;
                }
                
                @media (max-width: 768px) {
                    .contact-section {
                        padding: 50px 24px 60px !important;
                    }
                    .mobile-flip-top {
                        animation: letter-flip-top 4.5s cubic-bezier(0.76, 0, 0.24, 1) infinite;
                        animation-delay: calc(var(--letter-index) * 35ms);
                        translate: none !important;
                    }
                    .mobile-flip-bottom {
                        animation: letter-flip-bottom 4.5s cubic-bezier(0.76, 0, 0.24, 1) infinite;
                        animation-delay: calc(var(--letter-index) * 35ms);
                        translate: none !important;
                    }
                }

                @keyframes letter-flip-top {
                    0%, 20%, 80%, 100% {
                        transform: translateY(0);
                    }
                    35%, 65% {
                        transform: translateY(-110%);
                    }
                }

                @keyframes letter-flip-bottom {
                    0%, 20%, 80%, 100% {
                        transform: translateY(110%);
                    }
                    35%, 65% {
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
    );
};