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

    const [activeSection, setActiveSection] = useState<string | null>(null);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 20);

            // Highlight the last section whose top has passed the upper third of the viewport
            const threshold = window.innerHeight * 0.35;
            let current: string | null = null;
            for (const link of navLinks) {
                const el = document.getElementById(link.key);
                if (el && el.getBoundingClientRect().top <= threshold) current = link.key;
            }
            const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
            setActiveSection(atBottom ? navLinks[navLinks.length - 1].key : current);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
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
                // same 1120px column as the page content, so the logo lines up with the hero text
                padding: '0 max(24px, calc((100% - 1120px) / 2))',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: scrolled ? 'rgb(var(--bg-rgb) / 0.7)' : 'transparent',
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
                                transition: 'color var(--transition-fast)',
                                fontWeight: 500,
                            }}
                            className={`nav-link ${activeSection === link.key ? 'active' : ''}`}
                            aria-current={activeSection === link.key ? 'true' : undefined}
                        >
                            {t(`nav.${link.key}`)}
                        </a>
                    ))}
                </div>
                <LanguageSelector />
            </div>

            <button
                className="nav-mobile-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
                aria-expanded={mobileMenuOpen}
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
                            background: 'rgb(var(--bg-rgb) / 0.95)',
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
                                    color: activeSection === link.key ? 'var(--accent-orange)' : 'var(--text-secondary)',
                                    fontWeight: 500,
                                }}
                            >
                                {t(`nav.${link.key}`)}
                            </a>
                        ))}
                        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                            <a href="https://t.me/salikhov_dev" target="_blank" rel="noopener noreferrer" aria-label="Telegram" style={{ padding: '8px', color: 'var(--text-secondary)' }}><Send size={20} /></a>
                            <a href="https://wa.me/77019813721" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style={{ padding: '8px', color: 'var(--text-secondary)' }}><MessageCircle size={20} /></a>
                            <a href="https://instagram.com/salikhov.dev" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ padding: '8px', color: 'var(--text-secondary)' }}><Instagram size={20} /></a>
                            <a href="mailto:salikhovchingiz@gmail.com" aria-label="Email" style={{ padding: '8px', color: 'var(--text-secondary)' }}><Mail size={20} /></a>
                        </div>
                        <div style={{ marginTop: '8px' }}>
                            <LanguageSelector />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .nav-link { color: var(--text-secondary); position: relative; }
                .nav-link:hover { color: var(--text-primary); }
                .nav-link.active { color: var(--accent-orange); }
                .nav-link::after {
                    content: '';
                    position: absolute;
                    left: 0; right: 0; bottom: -6px;
                    height: 2px;
                    border-radius: 2px;
                    background: var(--accent-orange);
                    transform: scaleX(0);
                    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .nav-link.active::after { transform: scaleX(1); }
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