import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

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
        if (!ref.current) return;
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
                    ['--touch-x' as any]: `${touch.x}%`,
                    ['--touch-y' as any]: `${touch.y}%`,
                    ['--touch-opacity' as any]: touch.active ? 1 : 0,
                }}
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

export const BentoSection = () => {
    const { t } = useLanguage();

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
                    <span className="gradient-text">{t('about.bioTitle')}</span>
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
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '15px' }}>{t('about.bio3')}</p>
                        </div>
                        <div className="bento-stats-container">
                            <div>
                                <div style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-1px' }}>
                                    <AnimatedCounter value={6} suffix="+" />
                                </div>
                                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Years Experience</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-1px' }}>
                                    <AnimatedCounter value={20} suffix="+" />
                                </div>
                                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Projects Delivered</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-1px' }} className="gradient-text-accent">∞</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Cups of Coffee</div>
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
                    <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px' }}>Open to remote</div>
                </TiltCard>

                <TiltCard
                    custom={3}
                    className="bento-card bento-card-compact"
                    gridClassName="col-span-1 bento-grid-item"
                    style={{
                        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(239, 68, 68, 0.08))',
                        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center',
                        border: '1px solid rgba(245, 158, 11, 0.1)',
                    }}
                >
                    <div style={{ fontSize: '14px', color: 'var(--accent-orange)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Focus</div>
                    <div style={{ fontSize: '18px', fontWeight: 700 }}>Full Stack & AI</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px' }}>Building the future of the web</div>
                </TiltCard>
            </div>

            <style>{`
                .bento-section {
                    padding: 80px 24px 40px;
                    max-width: 1120px;
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

                /* Haptic/Tactile Active Tap Feedback */
                .bento-card {
                    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, border-color 0.2s ease !important;
                }
                .bento-card:active {
                    transform: scale(0.97) !important;
                    background: rgba(255, 255, 255, 0.08) !important;
                }

                /* Bento Touch Glow Beam */
                .touch-glow-beam {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    background: radial-gradient(
                        140px circle at var(--touch-x, 50%) var(--touch-y, 50%),
                        rgba(245, 158, 11, 0.12),
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
                }
            `}</style>
        </section>
    );
};