import type { CSSProperties, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';
import { PROJECTS } from '../content/projects';

const techStack = ['React', 'TypeScript', 'Next.js', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'Three.js', 'Tailwind', 'AI/LLM'];

function Card({
    children,
    className,
    gridClassName = '',
    style,
    index,
}: {
    children: ReactNode;
    className?: string;
    gridClassName?: string;
    style?: CSSProperties;
    index: number;
}) {
    return (
        <div data-reveal className={gridClassName} style={{ '--reveal-delay': `${index * 80}ms` } as CSSProperties}>
            <div className={className} style={{ ...style, width: '100%', height: '100%' }}>
                {children}
            </div>
        </div>
    );
}

export const BentoSection = () => {
    const { t } = useI18n();

    return (
        <section id="about" className="bento-section">
            <div data-reveal className="bento-header">
                <p style={{ color: 'var(--accent-orange)', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '16px' }}>
                    {t('about.title')}
                </p>
                <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, letterSpacing: '-1.5px' }}>
                    <span className="gradient-text">{t('about.heading')}</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full bento-grid">
                <Card
                    index={0}
                    className="bento-card"
                    gridClassName="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 md:row-span-2 lg:row-span-2 bento-grid-item"
                >
                    <div className="bento-bio-container">
                        <div>
                            <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px', letterSpacing: '-0.5px' }}>{t('about.bioTitle')}</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '15px' }}>{t('about.bio')}</p>
                        </div>
                        <div className="bento-stats-container">
                            <div>
                                <div style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-1px' }}>
                                    <span className="gradient-text-accent">4+</span>
                                </div>
                                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>{t('about.statYears')}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-1px' }}>
                                    <span className="gradient-text-accent">{PROJECTS.length}</span>
                                </div>
                                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>{t('about.statProjects')}</div>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card
                    index={1}
                    className="bento-card"
                    gridClassName="col-span-1 md:col-span-2 lg:col-span-2 bento-grid-item"
                >
                    <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>{t('about.techStackTitle')}</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {techStack.map(tech => (
                            <span key={tech} className="tech-tag">{tech}</span>
                        ))}
                    </div>
                </Card>

                <Card
                    index={2}
                    className="bento-card bento-card-compact"
                    gridClassName="col-span-1 bento-grid-item"
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}
                >
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>📍</div>
                    <div style={{ fontSize: '15px', fontWeight: 600 }}>{t('about.location')}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px' }}>{t('about.remote')}</div>
                </Card>

                <Card
                    index={3}
                    className="bento-card bento-card-compact"
                    gridClassName="col-span-1 bento-grid-item"
                    style={{
                        background: 'linear-gradient(135deg, rgb(var(--accent-rgb) / 0.2), rgb(var(--accent-deep-rgb) / 0.07))',
                        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center',
                        border: '1px solid rgb(var(--accent-rgb) / 0.3)',
                    }}
                >
                    <div style={{ fontSize: '14px', color: 'var(--accent-orange)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{t('about.focusLabel')}</div>
                    <div style={{ fontSize: '18px', fontWeight: 700 }}>Full Stack & AI</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px' }}>{t('about.focusDesc')}</div>
                </Card>

                <Card
                    index={4}
                    className="bento-card"
                    gridClassName="col-span-1 md:col-span-2 lg:col-span-4 bento-grid-item"
                >
                    <div className="bento-ioai">
                        <div>
                            <div style={{ fontSize: '13px', color: 'var(--accent-orange)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>{t('about.ioaiLabel')}</div>
                            <div style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-1px', lineHeight: 1 }}>
                                <span className="gradient-text-accent">IOAI 2026</span>
                            </div>
                        </div>
                        <p className="bento-ioai-desc">{t('about.ioaiDesc')}</p>
                        <a
                            href="https://ioai-official.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bento-ioai-link"
                        >
                            ioai-official.org <ArrowUpRight size={14} />
                        </a>
                    </div>
                </Card>
            </div>

            <style>{`
                .bento-section {
                    padding: 80px 24px 40px;
                    max-width: 1168px; /* 1120 content + 2×24 padding */
                    margin: 0 auto;
                    transition: padding 0.3s ease;
                }
                .bento-header {
                    text-align: center;
                    margin-bottom: 56px;
                    transition: margin-bottom 0.3s ease;
                }
                .bento-grid {
                    grid-auto-rows: 1fr;
                }
                .bento-bio-container {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    justify-content: space-between;
                }
                .bento-stats-container {
                    display: flex;
                    gap: 32px;
                    margin-top: 32px;
                    flex-wrap: wrap;
                    transition: all 0.3s ease;
                }

                .bento-ioai {
                    display: flex;
                    align-items: center;
                    gap: 32px;
                    height: 100%;
                }
                .bento-ioai-desc {
                    flex: 1;
                    color: var(--text-secondary);
                    font-size: 15px;
                    line-height: 1.7;
                    max-width: 520px;
                }
                .bento-ioai-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    flex-shrink: 0;
                    padding: 9px 16px;
                    border-radius: 100px;
                    font-size: 13px;
                    font-weight: 500;
                    color: var(--accent-orange);
                    border: 1px solid rgb(var(--accent-rgb) / 0.35);
                    transition: background 0.25s, border-color 0.25s;
                }
                .bento-ioai-link:hover {
                    background: rgb(var(--accent-rgb) / 0.12);
                    border-color: rgb(var(--accent-rgb) / 0.6);
                }

                @media (max-width: 768px) {
                    .bento-section {
                        padding: 50px 24px 20px !important;
                    }
                    .bento-header {
                        margin-bottom: 32px !important;
                    }
                    .bento-grid {
                        grid-auto-rows: auto !important;
                    }
                    .bento-grid-item {
                        grid-row: span 1 !important;
                        grid-column: span 1 !important;
                        height: auto !important;
                    }
                    .bento-card {
                        height: auto !important;
                    }
                    .bento-bio-container {
                        height: auto !important;
                        justify-content: flex-start !important;
                    }
                    .bento-stats-container {
                        gap: 20px !important;
                        margin-top: 20px !important;
                    }
                    .bento-card-compact {
                        padding: 20px !important;
                    }
                    .bento-ioai {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 16px;
                    }
                }
            `}</style>
        </section>
    );
};