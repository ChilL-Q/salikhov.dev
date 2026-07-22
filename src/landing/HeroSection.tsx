import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { DottedSurface } from '../components/DottedSurface';
import avatar from '../assets/ava.webp';

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

    return (
        <section 
            className="hero-section"
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px 24px 80px',
                position: 'relative',
            }}
        >
            <DottedSurface />
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ textAlign: 'center', position: 'relative', zIndex: 2, maxWidth: '720px' }}
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.6, type: 'spring', stiffness: 200 }}
                    style={{
                        width: '128px',
                        height: '128px',
                        borderRadius: '36px',
                        overflow: 'hidden',
                        margin: '0 auto 24px',
                        border: '2px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 0 80px -20px rgba(245, 158, 11, 0.4), 0 0 40px -10px rgba(239, 68, 68, 0.2)',
                    }}
                    className="hero-avatar"
                >
                    <img src={avatar} alt="Chingiz Salikhov" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    style={{ fontSize: 'clamp(24px, 5vw, 48px)', fontWeight: 700, marginBottom: '12px', letterSpacing: '-1px', lineHeight: 1.1 }}
                >
                    <span className="gradient-text">{t('hero.greeting')}</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.7 }}
                    style={{ fontSize: 'clamp(36px, 8vw, 88px)', fontWeight: 800, marginBottom: '20px', letterSpacing: 'clamp(-1px, -0.3vw, -3px)', lineHeight: 1.05 }}
                    className="hero-name"
                >
                    <span className="shimmer-text">{t('hero.name')}</span>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                    style={{
                        fontSize: 'clamp(14px, 2.5vw, 20px)',
                        color: 'var(--text-secondary)',
                        maxWidth: '560px',
                        margin: '0 auto 40px',
                        lineHeight: 1.7,
                        padding: '0 16px',
                    }}
                    className="hero-role"
                >
                    {t('about.role2')}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                    style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}
                >
                    <a
                        href="#projects"
                        style={{
                            padding: '12px 28px',
                            background: 'linear-gradient(135deg, var(--accent-orange), var(--accent-red))',
                            color: 'white',
                            borderRadius: '100px',
                            fontWeight: 600,
                            fontSize: '14px',
                            boxShadow: '0 0 40px -8px rgba(245, 158, 11, 0.5), 0 8px 32px -8px rgba(239, 68, 68, 0.3)',
                            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                            e.currentTarget.style.boxShadow = '0 0 60px -8px rgba(245, 158, 11, 0.6), 0 12px 40px -8px rgba(239, 68, 68, 0.4)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = '0 0 40px -8px rgba(245, 158, 11, 0.5), 0 8px 32px -8px rgba(239, 68, 68, 0.3)';
                        }}
                    >
                        {t('desktop.projects')}
                    </a>
                    <a
                        href="#contact"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '12px 28px',
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: 'var(--text-primary)',
                            borderRadius: '100px',
                            fontWeight: 600,
                            fontSize: '14px',
                            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        {t('desktop.contact')}
                    </a>
                </motion.div>
            </motion.div>

            <AnimatePresence>
                {!scrolled && (
                    <motion.div
                        key="hero-scroll"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: 'absolute',
                            bottom: '40px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px',
                            color: 'var(--text-tertiary)',
                            fontSize: '11px',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            zIndex: 2,
                            pointerEvents: 'none',
                        }}
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
                                style={{ width: '3px', height: '6px', background: 'var(--text-tertiary)', borderRadius: '2px', position: 'absolute', top: '6px', left: '50%', transform: 'translateX(-50%)' }}
                            />
                        </motion.div>
                        Scroll
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @media (max-width: 768px) {
                    .hero-section {
                        justify-content: flex-start !important;
                        padding-top: clamp(120px, 16vh, 170px) !important;
                        padding-bottom: 40px !important;
                    }
                    .hero-scroll {
                        display: none !important;
                    }
                }
                @media (max-width: 480px) {
                    .hero-avatar { width: 104px !important; height: 104px !important; border-radius: 30px !important; margin-bottom: 20px !important; }
                    .hero-name { margin-bottom: 16px !important; }
                }
            `}</style>
        </section>
    );
};