import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { User, Briefcase, Contact, Globe, Monitor, PenTool, Shield } from 'lucide-react';
import { Dock } from '../components/Dock';
import { AppIcon } from '../components/AppIcon';
import { GlassWindow } from '../components/GlassWindow';
import { HeroWidget } from '../components/HeroWidget';
import { TopBar } from '../components/TopBar';
import { Scene3D } from '../components/Scene3D';
import { AboutMacModal } from '../components/AboutMacModal';
import { ProjectWindowContent } from '../components/ProjectWindowContent';
import { AboutContent } from '../components/AboutContent';
import { ProjectsContent } from '../components/ProjectsContent';
import { ContactContent } from '../components/ContactContent';
import { MacAlertModal } from '../components/MacAlertModal';
import { PrivacyPolicyContent } from '../components/PrivacyPolicyContent';
import { LanguageSelectorContent } from '../components/LanguageSelectorContent';
import { useLanguage } from '../../context/LanguageContext';

export const Desktop = () => {
    const { t } = useLanguage();

    type WindowState = {
        isOpen: boolean;
        isMinimized: boolean;
        isMaximized: boolean;
    };

    const [windowStates, setWindowStates] = useState<Record<string, WindowState>>({
        about: { isOpen: true, isMinimized: false, isMaximized: false },
        projects: { isOpen: false, isMinimized: false, isMaximized: false },
        contact: { isOpen: false, isMinimized: false, isMaximized: false },
        privacy: { isOpen: false, isMinimized: false, isMaximized: false },
        settings: { isOpen: false, isMinimized: false, isMaximized: false },
        terminal: { isOpen: false, isMinimized: false, isMaximized: false },
        alanya: { isOpen: false, isMinimized: false, isMaximized: false },
        iffa: { isOpen: false, isMinimized: false, isMaximized: false },
        kassimova: { isOpen: false, isMinimized: false, isMaximized: false }
    });

    const [windowOrder, setWindowOrder] = useState<string[]>(['about']);

    const focusWindow = useCallback((key: string) => {
        setWindowOrder(prev => {
            const newOrder = prev.filter(k => k !== key);
            newOrder.push(key);
            return newOrder;
        });
    }, []);

    const setWindowState = useCallback((key: string, newState: Partial<WindowState>) => {
        setWindowStates(prev => ({
            ...prev,
            [key]: { ...prev[key], ...newState }
        }));
    }, []);

    const toggleWindow = useCallback((key: string) => {
        setWindowStates(prev => {
            const current = prev[key];
            if (current.isMinimized) {
                focusWindow(key);
                return { ...prev, [key]: { ...current, isMinimized: false, isOpen: true } };
            }
            if (!current.isOpen) {
                focusWindow(key);
            }
            return {
                ...prev,
                [key]: { ...current, isOpen: !current.isOpen, isMinimized: false }
            };
        });
    }, [focusWindow]); // Added focusWindow to dependencies

    const closeWindow = useCallback((key: string) => setWindowState(key, { isOpen: false, isMaximized: false }), [setWindowState]);
    const minimizeWindow = useCallback((key: string) => setWindowState(key, { isMinimized: true }), [setWindowState]);
    const maximizeWindow = useCallback((key: string) => setWindowState(key, { isMaximized: !windowStates[key].isMaximized }), [windowStates, setWindowState]);

    const [isAboutMacOpen, setIsAboutMacOpen] = useState(false);
    const [systemAlert, setSystemAlert] = useState<{ isOpen: boolean; title: string; message: string }>({
        isOpen: false,
        title: '',
        message: ''
    });

    const triggerAlert = useCallback((title: string, message: string) => {
        setSystemAlert({ isOpen: true, title, message });
    }, []);

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            // background: 'black', // Removed to let Scene3D show through
            color: 'white',
            overflow: 'hidden',
            position: 'relative'
        }}>
            <Scene3D />

            {/* Top Status Bar */}
            <TopBar
                onAboutClick={() => setIsAboutMacOpen(true)}
                onToggleWindow={toggleWindow}
                onSystemAlert={triggerAlert}
            />

            <div className="noise-overlay" style={{ opacity: 0.03 }} />

            {/* Desktop Hero Widget */}
            <div style={{
                position: 'absolute',
                top: '5%', // Moved UP as requested by user
                width: '100%',
                zIndex: 5,
                pointerEvents: 'none',
                textAlign: 'center'
            }}>
                <HeroWidget />
            </div>

            {/* Desktop Icons Grid */}
            <div style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                alignItems: 'flex-start',
                position: 'relative',
                zIndex: 10,
                marginTop: '40px',
                marginLeft: '20px'
            }}>
                <AppIcon
                    icon={<User size={32} strokeWidth={1} />}
                    label={t('desktop.about')}
                    onClick={() => toggleWindow('about')}
                    background="linear-gradient(180deg, #30D5C8, #0EA5E9)"
                />
                <AppIcon
                    icon={<Briefcase size={32} strokeWidth={1} />}
                    label={t('desktop.projects')}
                    onClick={() => toggleWindow('projects')}
                    background="linear-gradient(180deg, #F472B6, #9333EA)"
                />
                <AppIcon
                    icon={<Contact size={32} strokeWidth={1} />}
                    label={t('desktop.contact')}
                    onClick={() => toggleWindow('contact')}
                    background="linear-gradient(180deg, #FF9500, #FF5E00)"
                />
                <AppIcon
                    icon={<Shield size={32} strokeWidth={1} />}
                    label={t('desktop.privacy')}
                    onClick={() => toggleWindow('privacy')}
                    background="linear-gradient(180deg, #64748B, #475569)"
                />
                <AppIcon
                    icon={<Globe size={32} strokeWidth={1} />}
                    label={t('desktop.settings')}
                    onClick={() => toggleWindow('settings')}
                    background="linear-gradient(135deg, #3B82F6, #1D4ED8)"
                />
            </div>

            {/* Windows Layer */}
            <AnimatePresence custom={windowStates.about.isMinimized}>
                {windowStates.about.isOpen && !windowStates.about.isMinimized && (
                    <GlassWindow
                        key="about-window-main"
                        title="About Me"
                        isOpen={true}
                        isMaximized={windowStates.about.isMaximized}
                        onClose={() => closeWindow('about')}
                        onMinimize={() => minimizeWindow('about')}
                        onMaximize={() => maximizeWindow('about')}
                        zIndex={100 + windowOrder.indexOf('about')}
                        onClick={() => focusWindow('about')}
                        initialPosition={{ top: 'calc(50% - 275px)', left: 'calc(50% - 500px)' }}
                        exitPosition={{ top: 60, left: 40, width: 90, height: 100, scale: 1, opacity: 0 }}
                        width={1000}
                        height={550}
                    >
                        <AboutContent />
                    </GlassWindow>
                )}
            </AnimatePresence>

            {/* Alanya Holidays Window */}
            <AnimatePresence custom={windowStates.alanya.isMinimized}>
                {windowStates.alanya.isOpen && !windowStates.alanya.isMinimized && (
                    <GlassWindow
                        key="alanya-window"
                        title="Alanya Holidays"
                        isOpen={true}
                        isMaximized={windowStates.alanya.isMaximized}
                        onClose={() => closeWindow('alanya')}
                        onMinimize={() => minimizeWindow('alanya')}
                        onMaximize={() => maximizeWindow('alanya')}
                        zIndex={100 + windowOrder.indexOf('alanya')}
                        onClick={() => focusWindow('alanya')}
                        initialPosition={{ top: 'calc(50% - 160px)', left: 'calc(50% - 375px)' }}
                        exitPosition={{ top: '100%', left: '50%', scale: 0, opacity: 0 }}
                        width={750}
                        height={320}
                    >
                        <ProjectWindowContent
                            title={t('projects.items.alanya.title')}
                            description={t('projects.items.alanya.desc')}
                            technologies={['React', 'Next.js', 'Booking System', 'Stripe']}
                            link="https://alanyaholidays.com"
                            gradient="linear-gradient(135deg, #2dd4bf, #0ea5e9)"
                            icon={<Globe size={32} strokeWidth={1.5} />}
                        />
                    </GlassWindow>
                )}
            </AnimatePresence>

            {/* Iffa Tech Window */}
            <AnimatePresence custom={windowStates.iffa.isMinimized}>
                {windowStates.iffa.isOpen && !windowStates.iffa.isMinimized && (
                    <GlassWindow
                        key="iffa-window"
                        title={t('projects.items.iffa.title')}
                        isOpen={true}
                        isMaximized={windowStates.iffa.isMaximized}
                        onClose={() => closeWindow('iffa')}
                        onMinimize={() => minimizeWindow('iffa')}
                        onMaximize={() => maximizeWindow('iffa')}
                        zIndex={100 + windowOrder.indexOf('iffa')}
                        onClick={() => focusWindow('iffa')}
                        initialPosition={{ top: 'calc(50% - 160px)', left: 'calc(50% - 375px)' }}
                        exitPosition={{ top: '100%', left: '50%', scale: 0, opacity: 0 }}
                        width={750}
                        height={320}
                    >
                        <ProjectWindowContent
                            title={t('projects.items.iffa.title')}
                            description={t('projects.items.iffa.desc')}
                            technologies={['Software Development', 'Cloud Solutions', 'Enterprise Tech']}
                            link="https://iffatech.com"
                            gradient="linear-gradient(135deg, #818cf8, #6366f1)"
                            icon={<Monitor size={32} strokeWidth={1.5} />}
                        />
                    </GlassWindow>
                )}
            </AnimatePresence>

            {/* Kassimova Design Window */}
            <AnimatePresence custom={windowStates.kassimova.isMinimized}>
                {windowStates.kassimova.isOpen && !windowStates.kassimova.isMinimized && (
                    <GlassWindow
                        key="kassimova-window"
                        title={t('projects.items.kassimova.title')}
                        isOpen={true}
                        isMaximized={windowStates.kassimova.isMaximized}
                        onClose={() => closeWindow('kassimova')}
                        onMinimize={() => minimizeWindow('kassimova')}
                        onMaximize={() => maximizeWindow('kassimova')}
                        zIndex={100 + windowOrder.indexOf('kassimova')}
                        onClick={() => focusWindow('kassimova')}
                        initialPosition={{ top: 'calc(50% - 160px)', left: 'calc(50% - 375px)' }}
                        exitPosition={{ top: '100%', left: '50%', scale: 0, opacity: 0 }}
                        width={750}
                        height={320}
                    >
                        <ProjectWindowContent
                            title={t('projects.items.kassimova.title')}
                            description={t('projects.items.kassimova.desc')}
                            technologies={['UI/UX', 'Branding', 'Visual Identity']}
                            link="https://kassimova.design"
                            gradient="linear-gradient(135deg, #fb7185, #f43f5e)"
                            icon={<PenTool size={32} strokeWidth={1.5} />}
                        />
                    </GlassWindow>
                )}
            </AnimatePresence>

            <AnimatePresence custom={windowStates.projects.isMinimized}>
                {windowStates.projects.isOpen && !windowStates.projects.isMinimized && (
                    <GlassWindow
                        key="projects-window-main"
                        title={t('projects.title')}
                        isOpen={true}
                        isMaximized={windowStates.projects.isMaximized}
                        onClose={() => closeWindow('projects')}
                        onMinimize={() => minimizeWindow('projects')}
                        onMaximize={() => maximizeWindow('projects')}
                        zIndex={100 + windowOrder.indexOf('projects')}
                        onClick={() => focusWindow('projects')}
                        initialPosition={{ top: 'calc(50% - 350px)', left: 'calc(50% - 450px)' }}
                        exitPosition={{ top: 184, left: 40, width: 90, height: 100, scale: 1, opacity: 0 }}
                        width={900}
                        height={700}
                    >
                        <ProjectsContent />
                    </GlassWindow>
                )}
            </AnimatePresence>

            <AnimatePresence custom={windowStates.contact.isMinimized}>
                {windowStates.contact.isOpen && !windowStates.contact.isMinimized && (
                    <GlassWindow
                        key="contact-window-main"
                        title="Contact"
                        isOpen={true}
                        isMaximized={windowStates.contact.isMaximized}
                        onClose={() => closeWindow('contact')}
                        onMinimize={() => minimizeWindow('contact')}
                        onMaximize={() => maximizeWindow('contact')}
                        zIndex={100 + windowOrder.indexOf('contact')}
                        onClick={() => focusWindow('contact')}
                        initialPosition={{ top: 'calc(50% - 250px)', left: 'calc(50% - 350px)' }}
                        exitPosition={{ top: 308, left: 40, width: 90, height: 100, scale: 1, opacity: 0 }}
                        width={700}
                        height={500}
                    >
                        <ContactContent />
                    </GlassWindow>
                )}
            </AnimatePresence>

            <AnimatePresence custom={windowStates.privacy.isMinimized}>
                {windowStates.privacy.isOpen && !windowStates.privacy.isMinimized && (
                    <GlassWindow
                        key="privacy-window-main"
                        title={t('desktop.privacy')}
                        isOpen={true}
                        isMaximized={windowStates.privacy.isMaximized}
                        onClose={() => closeWindow('privacy')}
                        onMinimize={() => minimizeWindow('privacy')}
                        onMaximize={() => maximizeWindow('privacy')}
                        zIndex={100 + windowOrder.indexOf('privacy')}
                        onClick={() => focusWindow('privacy')}
                        initialPosition={{ top: 'calc(50% - 250px)', left: 'calc(50% - 300px)' }}
                        exitPosition={{ top: 370, left: 40, width: 90, height: 100, scale: 1, opacity: 0 }}
                        width={600}
                        height={500}
                    >
                        <PrivacyPolicyContent />
                    </GlassWindow>
                )}
            </AnimatePresence>

            <AnimatePresence custom={windowStates.settings.isMinimized}>
                {windowStates.settings.isOpen && !windowStates.settings.isMinimized && (
                    <GlassWindow
                        key="settings-window-main"
                        title={t('desktop.settings')}
                        isOpen={true}
                        isMaximized={windowStates.settings.isMaximized}
                        onClose={() => closeWindow('settings')}
                        onMinimize={() => minimizeWindow('settings')}
                        onMaximize={() => maximizeWindow('settings')}
                        zIndex={100 + windowOrder.indexOf('settings')}
                        onClick={() => focusWindow('settings')}
                        initialPosition={{ top: 'calc(50% - 200px)', left: 'calc(50% - 250px)' }}
                        exitPosition={{ top: 20, left: 'calc(100vw - 100px)', width: 90, height: 100, scale: 1, opacity: 0 }}
                        width={500}
                        height={400}
                    >
                        <LanguageSelectorContent />
                    </GlassWindow>
                )}
            </AnimatePresence>

            {/* Dock */}
            <Dock onOpenApp={toggleWindow} />

            {/* System Modals */}
            <AboutMacModal isOpen={isAboutMacOpen} onClose={() => setIsAboutMacOpen(false)} />
            <MacAlertModal
                isOpen={systemAlert.isOpen}
                title={systemAlert.title}
                message={systemAlert.message}
                onClose={() => setSystemAlert(prev => ({ ...prev, isOpen: false }))}
            />
        </div >
    );
};
