import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import portrait from '../assets/portrait.webp';

// three.js is ~500 kB — keep it out of the main bundle so the hero text paints first
const DottedSurface = lazy(() => import('../components/DottedSurface').then(m => ({ default: m.DottedSurface })));

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

export const HeroSection = () => {
    const { t } = useLanguage();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Subtle pointer parallax on the portrait
    const pointerX = useMotionValue(0);
    const pointerY = useMotionValue(0);
    const springX = useSpring(pointerX, { stiffness: 60, damping: 18 });
    const springY = useSpring(pointerY, { stiffness: 60, damping: 18 });
    const portraitX = useTransform(springX, v => v * -10);
    const portraitY = useTransform(springY, v => v * -6);

    const handlePointerMove = (e: React.PointerEvent) => {
        if (e.pointerType !== 'mouse') return;
        const rect = e.currentTarget.getBoundingClientRect();
        pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
        pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <section className="hero-section" onPointerMove={handlePointerMove}>
            {/* Layering: portrait (z0) → particle canvas (z1) → copy (z2).
                The dots drift over the jacket, so the figure sits *in* the wave. */}
            <Suspense fallback={null}>
                <DottedSurface className="hero-dots" />
            </Suspense>

            <div className="hero-inner">
                <div className="hero-copy">
                    <motion.p {...fadeUp(0.2)} className="hero-greeting">
                        <span className="gradient-text">{t('hero.greeting')}</span>
                    </motion.p>

                    <motion.h1 {...fadeUp(0.3)} className="hero-name">
                        <span className="shimmer-text">{t('hero.name')}</span>
                    </motion.h1>

                    <motion.p {...fadeUp(0.4)} className="hero-role">
                        {t('about.role')}
                    </motion.p>

                    <motion.div {...fadeUp(0.5)} className="hero-actions">
                        <a href="#projects" className="hero-btn hero-btn-primary">{t('nav.projects')}</a>
                        <a href="#contact" className="hero-btn hero-btn-ghost">{t('nav.contact')}</a>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.94, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                    className="hero-portrait"
                >
                    <motion.div className="hero-portrait-figure" style={{ x: portraitX, y: portraitY }}>
                        <img
                            src={portrait}
                            alt={t('hero.name')}
                            width={1200}
                            height={949}
                            className="hero-portrait-img"
                            draggable={false}
                        />
                        {/* Scene lighting: palette-coloured light cast onto the figure (clipped to its
                            silhouette) so the daylight photo shares the page's light instead of sitting on top of it */}
                        <div className="hero-portrait-light" style={{ '--portrait-url': `url(${portrait})` } as React.CSSProperties} />
                        <div className="hero-portrait-tone" style={{ '--portrait-url': `url(${portrait})` } as React.CSSProperties} />
                    </motion.div>
                </motion.div>
            </div>

            <AnimatePresence>
                {!scrolled && (
                    <motion.div
                        key="hero-scroll"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="hero-scroll"
                    >
                        <motion.div
                            animate={{ y: [0, 6, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                            style={{ width: '24px', height: '40px', border: '1.5px solid var(--text-tertiary)', borderRadius: '12px', position: 'relative' }}
                        >
                            <motion.div
                                animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
                                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                                style={{ width: '3px', height: '6px', background: 'var(--text-tertiary)', borderRadius: '2px', position: 'absolute', top: '6px', left: '50%', marginLeft: '-1.5px' }}
                            />
                        </motion.div>
                        {t('hero.scroll')}
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .hero-section {
                    min-height: 100svh;
                    position: relative;
                    display: flex;
                    align-items: center;
                    padding: 88px 24px 104px;
                    overflow: hidden;
                }
                .hero-dots { z-index: 1; }
                .hero-inner {
                    width: 100%;
                    max-width: 1120px;
                    margin: 0 auto;
                    /* one centred column: portrait on top, copy overlapping its dissolving lower edge */
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                /* ── Copy ── */
                .hero-copy { position: relative; z-index: 2; text-align: center; }
                .hero-greeting {
                    font-size: clamp(18px, 1.9vw, 26px);
                    font-weight: 600;
                    letter-spacing: -0.4px;
                    line-height: 1.3;
                    margin: 0 auto 14px;
                    text-wrap: balance;
                }
                .hero-name {
                    font-size: clamp(36px, 7.4vw, 104px);
                    font-weight: 800;
                    letter-spacing: -0.035em;
                    line-height: 1.05;
                    margin-bottom: 20px;
                }
                .hero-role {
                    font-size: clamp(15px, 1.5vw, 19px);
                    color: var(--text-secondary);
                    line-height: 1.6;
                    margin-bottom: 36px;
                }
                .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
                .hero-btn {
                    display: inline-flex;
                    align-items: center;
                    padding: 13px 30px;
                    border-radius: 100px;
                    font-weight: 600;
                    font-size: 14px;
                    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s, background 0.3s, border-color 0.3s;
                }
                .hero-btn-primary {
                    background: linear-gradient(135deg, rgb(var(--accent-light-rgb)), rgb(var(--accent-rgb)) 60%, rgb(var(--accent-mid-rgb)));
                    color: var(--on-accent);
                    box-shadow: 0 0 40px -8px rgb(var(--accent-rgb) / 0.6), 0 8px 32px -8px rgb(var(--accent-deep-rgb) / 0.4);
                }
                .hero-btn-primary:hover {
                    transform: translateY(-2px) scale(1.02);
                    box-shadow: 0 0 60px -8px rgb(var(--accent-rgb) / 0.75), 0 12px 40px -8px rgb(var(--accent-deep-rgb) / 0.5);
                }
                .hero-btn-ghost {
                    background: rgb(var(--tint-rgb) / 0.06);
                    border: 1px solid rgb(var(--tint-rgb) / 0.18);
                    color: var(--text-primary);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                }
                .hero-btn-ghost:hover {
                    transform: translateY(-2px);
                    background: rgb(var(--tint-rgb) / 0.12);
                    border-color: rgb(var(--accent-rgb) / 0.5);
                }

                /* ── Portrait ── */
                .hero-portrait {
                    position: relative;
                    z-index: 0;
                    order: -1;
                    /* sized by height too, so the whole hero still fits short laptop screens */
                    width: min(440px, 72vw, 44svh);
                    margin-bottom: clamp(-64px, -6svh, -28px);
                    aspect-ratio: 1200 / 949;
                }
                .hero-portrait-figure {
                    position: relative;
                    isolation: isolate;
                    /* the image height is fractional, and the mask leaves its last sub-pixel row
                       unmasked — a hairline under the portrait. Clip that row off. */
                    clip-path: inset(0 0 3px 0);
                    /* dissolve the photo's cut-off edges (bottom + both arms) into the background */
                    -webkit-mask-image: linear-gradient(to bottom, #000 45%, transparent 96%), linear-gradient(to right, transparent 0%, #000 15%, #000 85%, transparent 100%);
                    -webkit-mask-composite: source-in;
                    mask-image: linear-gradient(to bottom, #000 45%, transparent 96%), linear-gradient(to right, transparent 0%, #000 15%, #000 85%, transparent 100%);
                    mask-composite: intersect;
                }
                .hero-portrait-img {
                    position: relative;
                    display: block;
                    width: 100%;
                    height: auto;
                    user-select: none;
                    /* colour grade (white balance, black hair, vibrance) is baked into the file */
                    filter: brightness(0.97) saturate(1.06);
                }
                .hero-portrait-light,
                .hero-portrait-tone {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    /* silhouette ∩ vertical ramp: the hair (top of the frame) gets only a hint of the
                       coloured light, otherwise black hair picks up the accent hue */
                    -webkit-mask-image: var(--portrait-url), linear-gradient(to bottom, rgb(0 0 0 / 0.2) 10%, #000 38%);
                    -webkit-mask-size: 100% 100%;
                    -webkit-mask-repeat: no-repeat;
                    -webkit-mask-composite: source-in;
                    mask-image: var(--portrait-url), linear-gradient(to bottom, rgb(0 0 0 / 0.2) 10%, #000 38%);
                    mask-size: 100% 100%;
                    mask-repeat: no-repeat;
                    mask-composite: intersect;
                }
                /* key light: warm accent from the side of the headline/buttons, deep accent shadow on the far side */
                .hero-portrait-light {
                    background: linear-gradient(100deg, rgb(var(--accent-light-rgb) / 0.75) 0%, rgb(var(--accent-rgb) / 0.35) 38%, transparent 60%, rgb(var(--accent-deep-rgb) / 0.55) 100%);
                    mix-blend-mode: soft-light;
                }
                /* overall tone: nudge every hue a little toward the palette */
                .hero-portrait-tone {
                    background: rgb(var(--accent-mid-rgb));
                    mix-blend-mode: color;
                    opacity: 0.1;
                }
                .hero-scroll {
                    position: absolute;
                    bottom: 32px;
                    left: 0;
                    right: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    color: var(--text-tertiary);
                    font-size: 11px;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    z-index: 2;
                    pointer-events: none;
                }

                /* short laptop screens: the scroll hint would crowd the buttons */
                @media (max-height: 760px) {
                    .hero-scroll { display: none; }
                }
                @media (max-width: 900px) {
                    .hero-section {
                        align-items: flex-start;
                        padding: 84px 24px 56px;
                    }
                    .hero-portrait { width: min(70%, 290px); margin-bottom: -28px; }
                    .hero-greeting { margin-bottom: 12px; }
                    .hero-name { margin-bottom: 16px; }
                    .hero-role { margin-bottom: 28px; }
                    .hero-scroll { display: none; }
                }
            `}</style>
        </section>
    );
};
