import { useState, useEffect, useSyncExternalStore, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { PORTRAIT } from '../content/portrait';
import { prefersReducedMotion } from '../lib/motion';

// three.js is ~500 kB — keep it out of the main bundle so the hero text paints first
const DottedSurface = lazy(() => import('../components/DottedSurface').then(m => ({ default: m.DottedSurface })));

/** Rendered portrait width, mirroring .hero-portrait below: 4:5 at min(72svh, 760px) tall, on phones --portrait-w. */
const PORTRAIT_SIZES = '(max-width: 900px) min(78vw, 340px), min(57.6vh, 608px)';

const noSubscribe = () => () => {};

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

export const HeroSection = () => {
    const { t } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    // the scroll hint bobs and blinks in a loop; with reduced motion it stands still
    const reduceMotion = useReducedMotion();
    const scrollHintLoop = reduceMotion ? { duration: 0 } : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' as const };
    // The wave is client-only: false in the prerendered HTML and while hydrating, true right after
    const mounted = useSyncExternalStore(noSubscribe, () => true, () => false);

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
        if (e.pointerType !== 'mouse' || prefersReducedMotion()) return;
        const rect = e.currentTarget.getBoundingClientRect();
        pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
        pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <section className="hero-section" onPointerMove={handlePointerMove}>
            {/* Layering: portrait (z0) → particle canvas (z1) → copy (z2).
                The dots drift over the shirt, so the figure sits *in* the wave. */}
            {mounted && (
                <Suspense fallback={null}>
                    <DottedSurface className="hero-dots" />
                </Suspense>
            )}

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
                    <motion.div style={{ x: portraitX, y: portraitY }}>
                        <picture>
                            <source type="image/avif" srcSet={PORTRAIT.avif} sizes={PORTRAIT_SIZES} />
                            <img
                                src={PORTRAIT.fallback}
                                srcSet={PORTRAIT.webp}
                                sizes={PORTRAIT_SIZES}
                                alt={t('hero.name')}
                                width={PORTRAIT.width}
                                height={PORTRAIT.height}
                                fetchPriority="high"
                                className="hero-portrait-img"
                                draggable={false}
                            />
                        </picture>
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
                            transition={scrollHintLoop}
                            style={{ width: '24px', height: '40px', border: '1.5px solid var(--text-tertiary)', borderRadius: '12px', position: 'relative' }}
                        >
                            <motion.div
                                animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
                                transition={scrollHintLoop}
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
                    padding: 88px 24px 0;
                    overflow: hidden;
                }
                .hero-dots { z-index: 1; }
                .hero-inner {
                    width: 100%;
                    max-width: 1120px; /* the navbar's column: the name lines up with the logo */
                    margin: 0 auto;
                    /* copy on the left; the portrait stands on the hero's bottom edge, head level with the name */
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) auto;
                    column-gap: clamp(32px, 5vw, 80px);
                }

                /* ── Copy ── */
                .hero-copy { position: relative; z-index: 2; align-self: center; padding-bottom: 88px; }
                .hero-greeting {
                    font-size: clamp(18px, 1.9vw, 26px);
                    font-weight: 600;
                    letter-spacing: -0.4px;
                    line-height: 1.3;
                    margin-bottom: 14px;
                    text-wrap: balance;
                }
                .hero-name {
                    font-size: clamp(36px, 7.4vw, 104px);
                    font-weight: 800;
                    letter-spacing: -0.035em;
                    line-height: 1.05;
                    margin-bottom: 20px;
                    text-wrap: balance;
                }
                .hero-role {
                    font-size: clamp(15px, 1.5vw, 19px);
                    color: var(--text-secondary);
                    line-height: 1.6;
                    margin-bottom: 36px;
                }
                .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
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
                    box-shadow: 0 0 40px -8px rgb(var(--accent-rgb) / 0.6), 0 8px 32px -8px rgb(0 0 0 / 0.5);
                }
                .hero-btn-primary:hover {
                    transform: translateY(-2px) scale(1.02);
                    box-shadow: 0 0 60px -8px rgb(var(--accent-rgb) / 0.75), 0 12px 40px -8px rgb(0 0 0 / 0.6);
                }
                .hero-btn-ghost {
                    background: rgb(var(--tint-rgb) / 0.08);
                    border: 1px solid rgb(var(--tint-rgb) / 0.26);
                    color: var(--text-primary);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                }
                .hero-btn-ghost:hover {
                    transform: translateY(-2px);
                    background: rgb(var(--tint-rgb) / 0.14);
                }
                @media (hover: hover) {
                    .hero-btn-ghost:hover { border-color: rgb(var(--accent-rgb)); }
                }

                /* ── Portrait ── */
                .hero-portrait {
                    position: relative;
                    z-index: 0;
                    align-self: end;
                    justify-self: end;
                    /* sized by height, so the whole figure fits short laptop screens too */
                    height: min(72svh, 760px);
                    aspect-ratio: 4 / 5;
                }
                /* colour grade, black point and the dissolve of the bottom and side edges are baked into the file */
                .hero-portrait-img {
                    display: block;
                    width: 100%;
                    height: auto;
                    user-select: none;
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
                    .hero-section { padding: 84px 20px 56px; }
                    /* one centred column: portrait on top, copy over its dissolving lower edge */
                    .hero-inner { display: flex; flex-direction: column; align-items: center; }
                    .hero-copy { text-align: center; padding-bottom: 0; }
                    .hero-actions { justify-content: center; }
                    .hero-portrait {
                        --portrait-w: min(78vw, 340px);
                        /* the face's centre in the image as a share of its width: the centroid of the skin
                           pixels between brow and chin in the 1200px file (0.488) */
                        --face-x: 0.49;
                        order: -1;
                        /* centred in the column (the desktop end-alignment pushed it right), then nudged so
                           the face, not the image frame, sits on the page's centre line */
                        align-self: center;
                        left: calc((0.5 - var(--face-x)) * var(--portrait-w));
                        width: var(--portrait-w);
                        height: auto;
                        margin-bottom: calc(var(--portrait-w) * -0.22);
                    }
                    /* the copy sits over the portrait's lower edge here: the forearm shows through at about half
                       strength under the first line and is gone under the name, so the text keeps its contrast */
                    .hero-portrait-img {
                        -webkit-mask-image: linear-gradient(to bottom, #000 74%, rgb(0 0 0 / 0.55) 84%, transparent 100%);
                        mask-image: linear-gradient(to bottom, #000 74%, rgb(0 0 0 / 0.55) 84%, transparent 100%);
                    }
                    .hero-greeting { margin-bottom: 12px; }
                    .hero-name { margin-bottom: 16px; }
                    .hero-role { margin-bottom: 28px; }
                    .hero-scroll { display: none; }
                }
            `}</style>
        </section>
    );
};
