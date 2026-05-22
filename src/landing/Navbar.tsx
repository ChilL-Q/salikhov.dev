import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Instagram, MessageCircle, Mail, Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from '../components/LanguageSelector';

const navLinks = [
    { key: 'about', href: '#about' },
    { key: 'projects', href: '#projects' },
    { key: 'contact', href: '#contact' },
];

export const Navbar = () => {
    const { t } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: '0 24px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: scrolled ? 'rgba(9, 9, 11, 0.7)' : 'transparent',
                backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
                WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
                transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
            }}
        >
            <a href="#" style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, letterSpacing: '-0.5px' }}>
                <span className="gradient-text-accent">CS</span>
            </a>

            <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                <div style={{ display: 'flex', gap: '32px' }}>
                    {navLinks.map(link => (
                        <a
                            key={link.key}
                            href={link.href}
                            style={{
                                fontSize: '14px',
                                color: 'var(--text-secondary)',
                                transition: 'color var(--transition-fast)',
                                fontWeight: 500,
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                        >
                            {t(`desktop.${link.key}`)}
                        </a>
                    ))}
                </div>
                <LanguageSelector />
            </div>

            <button
                className="nav-mobile-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{ display: 'none', padding: '8px', color: 'var(--text-primary)' }}
            >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="nav-mobile-menu"
                        style={{
                            position: 'absolute',
                            top: '64px',
                            left: 0,
                            right: 0,
                            background: 'rgba(9, 9, 11, 0.95)',
                            backdropFilter: 'blur(20px)',
                            borderBottom: '1px solid var(--border-subtle)',
                            padding: '16px 24px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                        }}
                    >
                        {navLinks.map(link => (
                            <a
                                key={link.key}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                style={{
                                    padding: '12px 0',
                                    fontSize: '16px',
                                    color: 'var(--text-secondary)',
                                    fontWeight: 500,
                                }}
                            >
                                {t(`desktop.${link.key}`)}
                            </a>
                        ))}
                        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                            <a href="https://t.me/salikhov_dev" target="_blank" rel="noopener noreferrer" style={{ padding: '8px', color: 'var(--text-secondary)' }}><Send size={20} /></a>
                            <a href="https://wa.me/77019813721" target="_blank" rel="noopener noreferrer" style={{ padding: '8px', color: 'var(--text-secondary)' }}><MessageCircle size={20} /></a>
                            <a href="https://instagram.com/salikhov.dev" target="_blank" rel="noopener noreferrer" style={{ padding: '8px', color: 'var(--text-secondary)' }}><Instagram size={20} /></a>
                            <a href="mailto:salikhovchingiz@gmail.com" style={{ padding: '8px', color: 'var(--text-secondary)' }}><Mail size={20} /></a>
                        </div>
                        <div style={{ marginTop: '8px' }}>
                            <LanguageSelector />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @media (max-width: 768px) {
                    .nav-desktop { display: none !important; }
                    .nav-mobile-btn { display: flex !important; }
                }
                @media (min-width: 769px) {
                    .nav-mobile-menu { display: none !important; }
                    .nav-mobile-btn { display: none !important; }
                }
            `}</style>
        </motion.nav>
    );
};