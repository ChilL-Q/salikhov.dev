import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import alanyaLogo from '@/assets/projects-logos/alanya-holidays.png';
import iffaLogo from '@/assets/projects-logos/iffatech.png';
import kassimovaLogo from '@/assets/projects-logos/kassimova-design.png';
import abaiLogo from '@/assets/projects-logos/ab-ai.png';
import azharLogo from '@/assets/projects-logos/azhar-trading.png';

interface ProjectCard {
    id: string;
    url: string;
    logo: string;
    bg: string;
    tags: string[];
}

const projects: ProjectCard[] = [
    { id: 'alanya', url: 'https://alanyaholidays.com', logo: alanyaLogo, bg: '#fcfcfc', tags: ['React', 'Next.js', 'PostgreSQL'] },
    { id: 'iffa', url: 'https://iffatech.com', logo: iffaLogo, bg: '#07080d', tags: ['TypeScript', 'Cloud', 'Node.js'] },
    { id: 'kassimova', url: 'https://kassimova.design', logo: kassimovaLogo, bg: '#fafaf9', tags: ['UI/UX', 'Branding', 'Design'] },
    { id: 'abai', url: 'https://www.ab-ai.kz', logo: abaiLogo, bg: '#121e36', tags: ['AI', 'WhatsApp', 'SaaS'] },
    { id: 'azhar', url: 'https://azhar-trading.com', logo: azharLogo, bg: '#020617', tags: ['EdTech', 'FinTech', 'Web'] },
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

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { 
            loop: true, 
            align: isMobile ? 'center' : 'start', 
            slidesToScroll: 1, 
            containScroll: false, 
            dragFree: false
        },
        [WheelGesturesPlugin()]
    );
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const updateButtons = useCallback(() => {
        if (!emblaApi) return;
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    // Force Embla reInit whenever options change dynamically (e.g. isMobile changes)
    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.reInit({
            loop: true,
            align: isMobile ? 'center' : 'start',
            slidesToScroll: 1,
            containScroll: false,
            dragFree: false
        });
        updateButtons();
    }, [emblaApi, isMobile, updateButtons]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('select', updateButtons);
        emblaApi.on('reInit', updateButtons);
        return () => {
            emblaApi.off('select', updateButtons);
            emblaApi.off('reInit', updateButtons);
        };
    }, [emblaApi, updateButtons]);

    return (
        <section id="projects" className="projects-section">
            <div className="projects-header">
                <p style={{ color: 'var(--accent-orange)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: 16 }}>
                    {t('projects.subtitle')}
                </p>
                <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, letterSpacing: '-1.5px' }}>
                    <span className="gradient-text">{t('projects.title')}</span>
                </h2>
            </div>

            <div style={{ position: 'relative' }}>
                <button
                    onClick={() => emblaApi?.scrollPrev()}
                    style={{
                        position: 'absolute', left: -20, top: '50%', transform: 'translateY(-50%)', zIndex: 10,
                        width: 40, height: 40, borderRadius: '50%',
                        border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(9,9,11,0.8)',
                        backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: canScrollPrev ? 'pointer' : 'default',
                        opacity: canScrollPrev ? 1 : 0,
                        transition: 'opacity 0.3s',
                    }}
                    aria-label="Previous"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button
                    onClick={() => emblaApi?.scrollNext()}
                    style={{
                        position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)', zIndex: 10,
                        width: 40, height: 40, borderRadius: '50%',
                        border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(9,9,11,0.8)',
                        backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: canScrollNext ? 'pointer' : 'default',
                        opacity: canScrollNext ? 1 : 0,
                        transition: 'opacity 0.3s',
                    }}
                    aria-label="Next"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                </button>

                <div ref={emblaRef} style={{ overflow: 'hidden' }}>
                    <div style={{ display: 'flex', gap: 20 }}>
                        {projects.map((project, index) => {
                            const isHovered = hoveredId === project.id;
                            const isActiveMobile = isMobile && selectedIndex === index;
                            return (
                                <div 
                                    key={project.id} 
                                    style={{ 
                                        flex: isMobile ? '0 0 75%' : '0 0 calc((100% - 40px) / 3)', 
                                        minWidth: isMobile ? 240 : 260,
                                        padding: isMobile ? '12px 0' : '0'
                                    }}
                                    className={`embla-slide ${isActiveMobile ? 'active-slide' : ''}`}
                                >
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onMouseEnter={() => setHoveredId(project.id)}
                                        onMouseLeave={() => setHoveredId(null)}
                                        className={`project-card ${isHovered ? 'hovered' : ''}`}
                                    >
                                        {/* Card background container */}
                                        <div className="project-card-bg" style={{ background: project.bg }} />

                                        {/* Logo — centered mathematically, shrinks and lifts on hover */}
                                        <div className="project-card-logo-container">
                                            <img
                                                src={project.logo}
                                                alt={t(`projects.items.${project.id}.title`)}
                                                className="project-card-logo"
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
                                                    <ArrowUpRight size={14} color="white" />
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <style>{`
                .projects-section {
                    padding: 80px 24px 40px;
                    max-width: 1200px;
                    margin: 0 auto;
                    transition: padding 0.3s ease;
                }
                .projects-header {
                    text-align: center;
                    margin-bottom: 56px;
                    transition: margin-bottom 0.3s ease;
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
                    border: 1px solid rgba(255,255,255,0.06);
                    transition: border-color 0.4s, box-shadow 0.4s;
                }

                .project-card:hover {
                    border-color: rgba(255, 255, 255, 0.15);
                    box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.7);
                }

                .project-card-bg {
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 100%;
                    z-index: 1;
                }

                .project-card-logo-container {
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2;
                }

                .project-card-logo {
                    width: 85%;
                    max-width: 320px;
                    height: auto;
                    object-fit: contain;
                    margin: auto;
                    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                    transform: scale(1) translateY(0);
                    will-change: transform;
                }

                .project-card-info {
                    position: absolute;
                    bottom: 0; left: 0; right: 0;
                    padding: 20px 24px;
                    height: 150px;
                    opacity: 0;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    background: rgba(9, 9, 11, 0.95);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border-top: 1px solid rgba(255,255,255,0.08);
                    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
                    transform: translateY(101%);
                    will-change: transform, opacity;
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
                    color: rgba(255,255,255,0.65);
                }

                .project-card-arrow {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    border: 1px solid rgba(255,255,255,0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    transform: rotate(0deg);
                }

                /* Hover Interaction on Desktop (Hover-capable devices) */
                @media (hover: hover) {
                    .project-card:hover .project-card-logo,
                    .project-card.hovered .project-card-logo {
                        transform: scale(0.8) translateY(-25px);
                    }
                    .project-card:hover .project-card-info,
                    .project-card.hovered .project-card-info {
                        transform: translateY(0);
                        opacity: 1;
                    }
                    .project-card:hover .project-card-arrow,
                    .project-card.hovered .project-card-arrow {
                        transform: rotate(-45deg);
                    }
                }

                /* Mobile/Touch screen fallback (pointer: coarse) or screen widths */
                @media (max-width: 768px) {
                    .embla-slide {
                        transition: opacity 0.4s ease !important;
                    }
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

                    .project-card-info {
                        height: 135px !important;
                        padding: 12px 16px !important;
                    }

                    /* Inactive card on mobile: full-screen logo, details fully collapsed */
                    .embla-slide:not(.active-slide) .project-card-logo {
                        transform: scale(1) translateY(0) !important;
                    }
                    .embla-slide:not(.active-slide) .project-card-info {
                        transform: translateY(101%) !important;
                        opacity: 0 !important;
                    }
                    .embla-slide:not(.active-slide) .project-card-arrow {
                        transform: rotate(0deg) !important;
                    }

                    /* Active card on mobile: details expanded, logo shrunk */
                    .embla-slide.active-slide .project-card-logo {
                        transform: scale(0.8) translateY(-25px) !important;
                    }
                    .embla-slide.active-slide .project-card-info {
                        transform: translateY(0) !important;
                        opacity: 1 !important;
                    }
                    .embla-slide.active-slide .project-card-arrow {
                        transform: rotate(-45deg) !important;
                    }
                    .embla-slide.active-slide .project-card {
                        border-color: rgba(255, 255, 255, 0.15) !important;
                        box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.8) !important;
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

                @media (max-width: 900px) {
                    .projects-section {
                        padding: 50px 24px 20px !important;
                    }
                    .projects-header {
                        margin-bottom: 32px !important;
                    }
                    #projects div[style*="calc((100% - 40px) / 3)"] {
                        flex: 0 0 calc((100% - 20px) / 2) !important;
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