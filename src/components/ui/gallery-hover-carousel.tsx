import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import qarauLogo from '@/assets/projects-logos/qarau.svg';
import kassimovaLogo from '@/assets/projects-logos/kassimova-design.png';
import abaiLogo from '@/assets/projects-logos/ab-ai.png';
import azharLogo from '@/assets/projects-logos/azhar-trading.png';
import thirdTimeLogo from '@/assets/projects-logos/3time.webp';
import breakfastLogo from '@/assets/projects-logos/the-breakfast.svg';

interface ProjectCard {
    id: string;
    url: string;
    logo: string;
    bg: string;
    tags: string[];
    /** Max logo width in px — for emblems that are taller than they are wide */
    logoMaxWidth?: number;
}

const projects: ProjectCard[] = [
    { id: 'qarau', url: 'https://qarau.kz', logo: qarauLogo, bg: '#0f1820', tags: ['AI', 'iiko', 'Telegram'] },
    { id: 'abai', url: 'https://www.ab-ai.kz', logo: abaiLogo, bg: '#121e36', tags: ['AI', 'WhatsApp', 'SaaS'] },
    { id: 'kassimova', url: 'https://kassimova.design', logo: kassimovaLogo, bg: '#fafaf9', tags: ['UI/UX', 'Branding', 'Design'] },
    { id: 'azhar', url: 'https://azhar-trading.com', logo: azharLogo, bg: '#020617', tags: ['EdTech', 'FinTech', 'Web'] },
    { id: 'thirdtime', url: 'https://3time.kz', logo: thirdTimeLogo, bg: '#0d2118', tags: ['QR Menu', 'React', 'Admin'], logoMaxWidth: 170 },
    { id: 'breakfast', url: 'https://thebreakfast.kz', logo: breakfastLogo, bg: '#faf5ec', tags: ['QR Menu', 'HoReCa', 'Node.js'] },
];

export default function GalleryHoverCarousel() {
    const { t } = useLanguage();
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 768 : false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const [plugins] = useState(() => [
        WheelGesturesPlugin(),
        Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
    ]);

    // Looping carousel on every screen size: 3 cards per view on desktop (2 on
    // tablets), one centred card on mobile. Slide spacing is done with padding,
    // not flex `gap` — Embla's loop seam is only gap-free that way.
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: isMobile ? 'center' : 'start',
            slidesToScroll: 1,
            containScroll: false,
            dragFree: false,
        },
        plugins
    );

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
            emblaApi.off('reInit', onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <section id="projects" className="projects-section">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
                className="projects-header"
            >
                <p style={{ color: 'var(--accent-orange)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: 16 }}>
                    {t('projects.subtitle')}
                </p>
                <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, letterSpacing: '-1.5px' }}>
                    <span className="gradient-text">{t('projects.title')}</span>
                </h2>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
                <div ref={emblaRef} className="projects-viewport">
                    <div className="projects-track">
                        {projects.map((project, index) => {
                            const isActiveMobile = isMobile && selectedIndex === index;
                            return (
                                <div
                                    key={project.id}
                                    className={`embla-slide ${isActiveMobile ? 'active-slide' : ''}`}
                                >
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="project-card"
                                        draggable={false}
                                    >
                                        {/* Card background container */}
                                        <div className="project-card-bg" style={{ background: project.bg }} />

                                        {/* Logo — centered mathematically, shrinks and lifts on hover */}
                                        <div className="project-card-logo-container">
                                            <img
                                                src={project.logo}
                                                alt={t(`projects.items.${project.id}.title`)}
                                                className="project-card-logo"
                                                style={project.logoMaxWidth ? { '--logo-max': `${project.logoMaxWidth}px` } as React.CSSProperties : undefined}
                                                loading="lazy"
                                                draggable={false}
                                            />
                                        </div>

                                        {/* Info panel slides up from bottom on hover */}
                                        <div className="project-card-info">
                                            <h3 className="project-card-info-title">
                                                {t(`projects.items.${project.id}.title`)}
                                            </h3>
                                            <p className="project-card-info-desc">
                                                {t(`projects.items.${project.id}.desc`)}
                                            </p>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                                    {project.tags.map((tag) => (
                                                        <span key={tag} className="tech-tag">{tag}</span>
                                                    ))}
                                                </div>
                                                <div className="project-card-arrow">
                                                    <ArrowUpRight size={14} color="currentColor" />
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="projects-controls">
                    <button className="projects-arrow" onClick={() => emblaApi?.scrollPrev()} aria-label="Previous">
                        <ChevronLeft size={18} />
                    </button>
                    <div className="projects-dots">
                        {projects.map((project, index) => (
                            <button
                                key={project.id}
                                onClick={() => emblaApi?.scrollTo(index)}
                                className={`projects-dot ${selectedIndex === index ? 'active' : ''}`}
                                aria-label={t(`projects.items.${project.id}.title`)}
                                aria-current={selectedIndex === index ? 'true' : undefined}
                            />
                        ))}
                    </div>
                    <button className="projects-arrow" onClick={() => emblaApi?.scrollNext()} aria-label="Next">
                        <ChevronRight size={18} />
                    </button>
                </div>
            </motion.div>

            <style>{`
                .projects-section {
                    padding: 80px 24px 40px;
                    max-width: 1168px; /* 1120 content + 2×24 padding, same column as the other sections */
                    margin: 0 auto;
                    transition: padding 0.3s ease;
                }
                .projects-header {
                    text-align: center;
                    margin-bottom: 56px;
                    transition: margin-bottom 0.3s ease;
                }

                /* Carousel. The viewport is 10px wider than the content column on each side so the
                   slides' 10px side padding lines the outer cards up with the column; vertical
                   padding leaves room for the hover lift and shadow inside overflow:hidden. */
                .projects-viewport {
                    overflow: hidden;
                    margin: -16px -10px -24px;
                    padding: 16px 0 40px;
                    cursor: grab;
                }
                .projects-viewport:active { cursor: grabbing; }
                .projects-track {
                    display: flex;
                    touch-action: pan-y pinch-zoom;
                }
                .embla-slide {
                    flex: 0 0 33.3333%;
                    min-width: 0;
                    padding: 0 10px;
                }
                .projects-controls {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 20px;
                    margin-top: 28px;
                }
                .projects-arrow {
                    width: 42px;
                    height: 42px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-primary);
                    background: rgb(var(--tint-rgb) / 0.06);
                    border: 1px solid rgb(var(--tint-rgb) / 0.22);
                    transition: background 0.25s, border-color 0.25s, color 0.25s, transform 0.25s;
                }
                .projects-arrow:hover {
                    background: rgb(var(--accent-rgb) / 0.14);
                    border-color: rgb(var(--accent-rgb) / 0.55);
                    color: var(--accent-orange);
                }
                .projects-arrow:active { transform: scale(0.94); }
                .projects-dots {
                    display: flex;
                    justify-content: center;
                    gap: 8px;
                }
                .projects-dot {
                    width: 8px;
                    height: 8px;
                    padding: 0;
                    border: none;
                    border-radius: 100px;
                    background: rgb(var(--tint-rgb) / 0.28);
                    transition: width 0.3s ease, background 0.3s ease;
                }
                .projects-dot.active {
                    width: 24px;
                    background: var(--accent-orange);
                }

                /* Project Card Layout */
                .project-card {
                    display: block;
                    position: relative;
                    height: 340px;
                    border-radius: 20px;
                    overflow: hidden;
                    text-decoration: none;
                    color: inherit;
                    background: transparent;
                    border: 1px solid rgb(var(--tint-rgb) / 0.16);
                    transition: border-color 0.4s, box-shadow 0.4s, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .project-card:hover {
                    border-color: rgb(var(--accent-rgb) / 0.45);
                    box-shadow: 0 24px 50px -18px rgba(0, 0, 0, 0.7), 0 0 60px -18px rgb(var(--accent-rgb) / 0.35);
                    transform: translateY(-4px);
                }

                .project-card-bg {
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 100%;
                    transition: height 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                    z-index: 1;
                }

                .project-card-logo-container {
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: height 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                    z-index: 2;
                }

                .project-card-logo {
                    width: 85%;
                    max-width: var(--logo-max, 320px);
                    height: auto;
                    object-fit: contain;
                    margin: auto;
                    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                    transform: scale(1);
                }

                .project-card-info {
                    position: absolute;
                    bottom: 0; left: 0; right: 0;
                    padding: 24px 28px;
                    height: 0;
                    opacity: 0;
                    visibility: hidden;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    background: rgb(var(--bg-rgb) / 0.95);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border-top: 1px solid rgba(255,255,255,0.12);
                    transition: height 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, visibility 0.3s ease;
                    z-index: 3;
                }

                .project-card-info-title {
                    font-size: 17px;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 4px;
                    letter-spacing: -0.3px;
                    line-height: 1.2;
                }

                .project-card-info-desc {
                    font-size: 13px;
                    line-height: 1.6;
                    margin-bottom: 14px;
                    color: rgba(255,255,255,0.75);
                }

                .project-card-arrow {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    border: 1px solid rgb(var(--accent-rgb) / 0.4);
                    color: var(--accent-orange);
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }

                /* Hover Interaction on Desktop (Hover-capable devices) */
                @media (hover: hover) {
                    .project-card:hover .project-card-bg {
                        height: 56%;
                    }
                    .project-card:hover .project-card-logo-container {
                        height: 55%;
                    }
                    .project-card:hover .project-card-logo {
                        transform: scale(0.8);
                    }
                    .project-card:hover .project-card-info {
                        height: 45%;
                        opacity: 1;
                        visibility: visible;
                    }
                    .project-card:hover .project-card-arrow {
                        transform: translate(2px, -2px);
                    }
                }

                /* Touch devices wider than the mobile carousel (tablets): no hover, so keep details visible */
                @media (hover: none) and (min-width: 769px) {
                    .project-card .project-card-bg { height: 56%; }
                    .project-card .project-card-logo-container { height: 55%; }
                    .project-card .project-card-logo { transform: scale(0.8); }
                    .project-card .project-card-info {
                        height: 45%;
                        opacity: 1;
                        visibility: visible;
                    }
                }

                /* Mobile/Touch screen fallback (pointer: coarse) or screen widths */
                @media (max-width: 768px) {
                    .projects-viewport {
                        margin: 0 -24px;
                        padding: 0;
                    }
                    .embla-slide {
                        flex: 0 0 78%;
                        padding: 12px 8px;
                        transition: opacity 0.4s ease !important;
                    }
                    .projects-controls { margin-top: 16px; }
                    /* the info panel is taller on mobile — keep tall emblems clear of it */
                    .project-card-logo { max-width: calc(var(--logo-max, 320px) * 0.7); }
                    .projects-arrow { display: none; } /* swipe on touch screens */
                    .embla-slide:not(.active-slide) {
                        opacity: 0.5 !important;
                    }
                    .embla-slide.active-slide {
                        opacity: 1 !important;
                    }
                    .embla-slide .project-card {
                        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s, box-shadow 0.4s !important;
                    }
                    .embla-slide:not(.active-slide) .project-card {
                        transform: scale(0.92) !important;
                    }
                    .embla-slide.active-slide .project-card {
                        transform: scale(1.03) !important;
                    }

                    /* Inactive card on mobile: full-screen logo, details fully collapsed */
                    .embla-slide:not(.active-slide) .project-card-bg {
                        height: 100% !important;
                    }
                    .embla-slide:not(.active-slide) .project-card-logo-container {
                        height: 100% !important;
                    }
                    .embla-slide:not(.active-slide) .project-card-logo {
                        transform: scale(1) !important;
                    }
                    .embla-slide:not(.active-slide) .project-card-info {
                        height: 0 !important;
                        min-height: 0 !important;
                        opacity: 0 !important;
                        visibility: hidden !important;
                        padding: 0 16px !important;
                        border-top-color: transparent !important;
                    }

                    /* Active card on mobile: details expanded, logo shrunk */
                    .embla-slide.active-slide .project-card-bg {
                        height: 56% !important;
                    }
                    .embla-slide.active-slide .project-card-logo-container {
                        height: 55% !important;
                    }
                    .embla-slide.active-slide .project-card-logo {
                        transform: scale(0.8) !important;
                    }
                    .embla-slide.active-slide .project-card-info {
                        height: auto !important;
                        min-height: 44% !important;
                        opacity: 1 !important;
                        visibility: visible !important;
                        padding: 14px 16px !important;
                    }
                    .embla-slide.active-slide .project-card {
                        border-color: rgb(var(--accent-rgb) / 0.4) !important;
                        box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.8) !important;
                    }
                    
                    /* Optimization: Disable heavy backdrop-filter blur on mobile screens */
                    .project-card-info {
                        backdrop-filter: none !important;
                        -webkit-backdrop-filter: none !important;
                        background: rgb(var(--bg-rgb) / 0.98) !important;
                    }
                    
                    .project-card-info-title {
                        font-size: 15px !important;
                    }
                    .project-card-info-desc {
                        font-size: 12px !important;
                        line-height: 1.4 !important;
                        margin-bottom: 10px !important;
                    }
                }

                @media (min-width: 769px) and (max-width: 1023px) {
                    .embla-slide { flex-basis: 50%; }
                }
                @media (max-width: 900px) {
                    .projects-section {
                        padding: 50px 24px 20px !important;
                    }
                    .projects-header {
                        margin-bottom: 32px !important;
                    }
                }
                @media (max-width: 600px) {
                    .project-card {
                        height: 300px !important;
                    }
                }
            `}</style>
        </section>
    );
}