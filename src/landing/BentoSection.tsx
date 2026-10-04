import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { prefersReducedMotion } from '../lib/motion';
import { BADGE } from '../content/badge';

const techStack = ['React', 'TypeScript', 'Next.js', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'Three.js', 'Tailwind', 'AI/LLM'];

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }),
};

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: '-50px' });
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        if (inView) {
            const controls = animate(count, value, {
                duration: 2.0,
                ease: [0.16, 1, 0.3, 1],
            });
            return controls.stop;
        }
    }, [inView, count, value]);

    useEffect(() => {
        const unsubscribe = rounded.on('change', (latest) => {
            if (ref.current) {
                ref.current.textContent = `${latest}${suffix}`;
            }
        });
        return unsubscribe;
    }, [rounded, suffix]);

    return (
        <span ref={ref} className="gradient-text-accent">
            0{suffix}
        </span>
    );
}

function TiltCard({
    children,
    className,
    gridClassName = '',
    style,
    custom,
}: {
    children: React.ReactNode;
    className?: string;
    gridClassName?: string;
    style?: React.CSSProperties;
    custom: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [touch, setTouch] = useState({ x: 0, y: 0, active: false });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current || prefersReducedMotion()) return;
        const rect = ref.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: y * -10, y: x * 10 });
    };

    const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

    const handleTouchStart = (e: React.TouchEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const touchObj = e.touches[0];
        const x = ((touchObj.clientX - rect.left) / rect.width) * 100;
        const y = ((touchObj.clientY - rect.top) / rect.height) * 100;
        setTouch({ x, y, active: true });
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const touchObj = e.touches[0];
        const x = ((touchObj.clientX - rect.left) / rect.width) * 100;
        const y = ((touchObj.clientY - rect.top) / rect.height) * 100;
        
        if (x >= 0 && x <= 100 && y >= 0 && y <= 100) {
            setTouch({ x, y, active: true });
        } else {
            setTouch({ x, y, active: false });
        }
    };

    const handleTouchEnd = () => {
        setTouch(prev => ({ ...prev, active: false }));
    };

    return (
        <motion.div
            custom={custom}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={gridClassName}
            style={{
                width: '100%',
                height: '100%',
            }}
        >
            <div
                ref={ref}
                className={className}
                style={{
                    ...style,
                    width: '100%',
                    height: '100%',
                    transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transition: 'transform 0.15s ease-out',
                    transformStyle: 'preserve-3d',
                    '--touch-x': `${touch.x}%`,
                    '--touch-y': `${touch.y}%`,
                    '--touch-opacity': touch.active ? 1 : 0,
                } as React.CSSProperties}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div className="touch-glow-beam" />
                {children}
            </div>
        </motion.div>
    );
}

/** The badge's rendered width (.bento-ioai-badge below), for its srcset. */
const BADGE_SIZES = '(max-width: 768px) 150px, 140px';

export const BentoSection = () => {
    const { t } = useLanguage();
    const badgeDialog = useRef<HTMLDialogElement>(null);
    const badgeButton = useRef<HTMLButtonElement>(null);

    return (
        <section id="about" className="bento-section">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
                className="bento-header"
            >
                <p style={{ color: 'var(--accent-orange)', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '16px' }}>
                    {t('about.title')}
                </p>
                <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, letterSpacing: '-1.5px' }}>
                    <span className="gradient-text">{t('about.heading')}</span>
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full bento-grid">
                <TiltCard
                    custom={0}
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
                                    <AnimatedCounter value={6} suffix="+" />
                                </div>
                                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>{t('about.statYears')}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-1px' }}>
                                    <AnimatedCounter value={20} suffix="+" />
                                </div>
                                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>{t('about.statProjects')}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-1px' }} className="gradient-text-accent">∞</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>{t('about.statCoffee')}</div>
                            </div>
                        </div>
                    </div>
                </TiltCard>

                <TiltCard
                    custom={1}
                    className="bento-card"
                    gridClassName="col-span-1 md:col-span-2 lg:col-span-2 bento-grid-item"
                >
                    <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>{t('about.techStackTitle')}</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {techStack.map(tech => (
                            <span key={tech} className="tech-tag">{tech}</span>
                        ))}
                    </div>
                </TiltCard>

                <TiltCard
                    custom={2}
                    className="bento-card bento-card-compact"
                    gridClassName="col-span-1 bento-grid-item"
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}
                >
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>📍</div>
                    <div style={{ fontSize: '15px', fontWeight: 600 }}>{t('about.location')}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px' }}>{t('about.remote')}</div>
                </TiltCard>

                <TiltCard
                    custom={3}
                    className="bento-card bento-card-compact"
                    gridClassName="col-span-1 bento-grid-item"
                    style={{
                        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center',
                    }}
                >
                    <div style={{ fontSize: '14px', color: 'var(--accent-orange)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{t('about.focusLabel')}</div>
                    <div style={{ fontSize: '18px', fontWeight: 700 }}>Full Stack & AI</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px' }}>{t('about.focusDesc')}</div>
                </TiltCard>

                <TiltCard
                    custom={4}
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
                        <button
                            ref={badgeButton}
                            type="button"
                            className="bento-ioai-badge"
                            onClick={() => badgeDialog.current?.showModal()}
                            aria-haspopup="dialog"
                            aria-label={t('about.badgeOpen')}
                        >
                            <picture>
                                <source type="image/avif" srcSet={BADGE.avif} sizes={BADGE_SIZES} />
                                <img
                                    src={BADGE.fallback}
                                    srcSet={BADGE.webp}
                                    sizes={BADGE_SIZES}
                                    alt={t('about.badgeAlt')}
                                    width={BADGE.width}
                                    height={BADGE.height}
                                    loading="lazy"
                                    decoding="async"
                                    draggable={false}
                                />
                            </picture>
                        </button>
                    </div>
                </TiltCard>
            </div>

            {/* The badge, larger: a native modal (Esc closes it, so does a click on the backdrop); focus goes back to the badge */}
            <dialog
                ref={badgeDialog}
                className="badge-dialog"
                aria-label={t('about.badgeAlt')}
                onClick={e => e.target === e.currentTarget && badgeDialog.current?.close()}
                onClose={() => badgeButton.current?.focus()}
            >
                <picture>
                    <source type="image/avif" srcSet={BADGE.avif} sizes="min(92vw, 560px)" />
                    <img
                        src={BADGE.fallback}
                        srcSet={BADGE.webp}
                        sizes="min(92vw, 560px)"
                        alt={t('about.badgeAlt')}
                        width={BADGE.width}
                        height={BADGE.height}
                        loading="lazy"
                        decoding="async"
                        className="badge-dialog-img"
                    />
                </picture>
                <button type="button" className="badge-dialog-close" onClick={() => badgeDialog.current?.close()} aria-label={t('about.close')}>
                    <X size={20} aria-hidden="true" />
                </button>
            </dialog>

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
                /* the IOAI row takes the badge's height; the rows above stay equal, as before */
                @media (min-width: 769px) and (max-width: 1023px) {
                    .bento-grid { grid-template-rows: repeat(4, 1fr) auto; }
                }
                @media (min-width: 1024px) {
                    .bento-grid { grid-template-rows: repeat(2, 1fr) auto; }
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
                    transition: gap 0.3s ease, margin-top 0.3s ease;
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
                    border: 1px solid rgb(var(--tint-rgb) / 0.2);
                    transition: background 0.25s, border-color 0.25s;
                    position: relative;
                    z-index: 6; /* above the touch-glow overlay so it stays clickable */
                }
                .bento-ioai-link:hover {
                    background: rgb(var(--tint-rgb) / 0.08);
                }
                /* the accreditation badge: on the right, a little tilted, as if pinned to the card */
                .bento-ioai-badge {
                    position: relative;
                    z-index: 6; /* above the touch-glow overlay so it stays clickable */
                    flex-shrink: 0;
                    width: 140px;
                    padding: 0;
                    border: none;
                    background: none;
                    border-radius: 12px;
                    cursor: zoom-in;
                    transform: rotate(-3.5deg);
                    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .bento-ioai-badge img {
                    display: block;
                    width: 100%;
                    height: auto;
                    filter: drop-shadow(0 16px 22px rgb(0 0 0 / 0.55));
                    user-select: none;
                }
                @media (hover: hover) {
                    .bento-ioai-badge:hover { transform: rotate(-1.5deg) scale(1.03); }
                }
                .badge-dialog {
                    margin: auto;
                    padding: 0;
                    border: none;
                    background: transparent;
                    overflow: visible;
                    max-width: none;
                    max-height: none;
                    overscroll-behavior: contain;
                }
                .badge-dialog::backdrop { background: rgb(0 0 0 / 0.88); }
                .badge-dialog-img {
                    display: block;
                    width: auto;
                    height: auto;
                    max-width: 92vw;
                    max-height: 86svh;
                }
                .badge-dialog-close {
                    position: absolute;
                    top: -16px;
                    right: -16px;
                    width: 44px;
                    height: 44px;
                    display: grid;
                    place-items: center;
                    border-radius: 50%;
                    color: var(--text-primary);
                    background: rgb(var(--bg-raised-rgb));
                    border: 1px solid rgb(var(--tint-rgb) / 0.2);
                    transition: border-color 0.25s;
                }
                @media (hover: hover) {
                    .badge-dialog-close:hover { border-color: rgb(var(--tint-rgb) / 0.45); }
                }
                @media (max-width: 600px) {
                    .badge-dialog-close { top: 8px; right: 8px; }
                }
                @media (hover: hover) {
                    .bento-ioai-link:hover { border-color: rgb(var(--accent-rgb)); }
                }

                /* Haptic/Tactile Active Tap Feedback */
                .bento-card {
                    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, border-color 0.2s ease !important;
                }
                .bento-card:active {
                    transform: scale(0.97) !important;
                    background: var(--bg-card-hover) !important;
                }

                /* Bento Touch Glow Beam */
                .touch-glow-beam {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    background: radial-gradient(
                        140px circle at var(--touch-x, 50%) var(--touch-y, 50%),
                        rgb(var(--accent-rgb) / 0.18),
                        transparent 80%
                    );
                    opacity: var(--touch-opacity, 0);
                    transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                    z-index: 5;
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
                    /* under the text on phones, straight */
                    .bento-ioai-badge { width: 150px; transform: none; }
                }
            `}</style>
        </section>
    );
};