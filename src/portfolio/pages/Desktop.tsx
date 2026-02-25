import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { User, Briefcase, Send, Globe, Monitor, PenTool } from 'lucide-react';
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

export const Desktop = () => {
    type WindowState = {
        isOpen: boolean;
        isMinimized: boolean;
        isMaximized: boolean;
    };

    const [windowStates, setWindowStates] = useState<Record<string, WindowState>>({
        about: { isOpen: true, isMinimized: false, isMaximized: false },
        projects: { isOpen: false, isMinimized: false, isMaximized: false },
        contact: { isOpen: false, isMinimized: false, isMaximized: false },
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
            <TopBar onAboutClick={() => setIsAboutMacOpen(true)} />

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
                    label="About Me"
                    onClick={() => toggleWindow('about')}
                    background="linear-gradient(180deg, #30D5C8, #0EA5E9)"
                />
                <AppIcon
                    icon={<Briefcase size={32} strokeWidth={1} />}
                    label="Projects"
                    onClick={() => toggleWindow('projects')}
                    background="linear-gradient(180deg, #F472B6, #9333EA)"
                />
                <AppIcon
                    icon={<Send size={32} strokeWidth={1} />}
                    label="Contact"
                    onClick={() => toggleWindow('contact')}
                    background="linear-gradient(180deg, #4ADE80, #16A34A)"
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
                        initialPosition={{ top: 'calc(52% - 325px)', left: 'calc(50% - 500px)' }}
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
                        initialPosition={{ top: '15%', left: '20%' }}
                        exitPosition={{ top: '100%', left: '50%', scale: 0, opacity: 0 }}
                        width={750}
                        height={320}
                    >
                        <ProjectWindowContent
                            title="Alanya Holidays"
                            description="Premium holiday rentals and experiences platform in Alanya. Features luxury villas, apartments, and yacht tours with a focus on authentic local experiences."
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
                        title="Iffa Tech"
                        isOpen={true}
                        isMaximized={windowStates.iffa.isMaximized}
                        onClose={() => closeWindow('iffa')}
                        onMinimize={() => minimizeWindow('iffa')}
                        onMaximize={() => maximizeWindow('iffa')}
                        zIndex={100 + windowOrder.indexOf('iffa')}
                        onClick={() => focusWindow('iffa')}
                        initialPosition={{ top: '20%', left: '25%' }}
                        exitPosition={{ top: '100%', left: '50%', scale: 0, opacity: 0 }}
                        width={750}
                        height={320}
                    >
                        <ProjectWindowContent
                            title="Iffa Tech"
                            description="Innovative technical solutions and custom software development. Delivering robust digital products for modern business needs."
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
                        title="Kassimova Design"
                        isOpen={true}
                        isMaximized={windowStates.kassimova.isMaximized}
                        onClose={() => closeWindow('kassimova')}
                        onMinimize={() => minimizeWindow('kassimova')}
                        onMaximize={() => maximizeWindow('kassimova')}
                        zIndex={100 + windowOrder.indexOf('kassimova')}
                        onClick={() => focusWindow('kassimova')}
                        initialPosition={{ top: '25%', left: '30%' }}
                        exitPosition={{ top: '100%', left: '50%', scale: 0, opacity: 0 }}
                        width={750}
                        height={320}
                    >
                        <ProjectWindowContent
                            title="Kassimova Design"
                            description="A portfolio showcasing exquisite design works, branding, and visual storytelling."
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
                        title="Projects"
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
                        initialPosition={{ top: 'calc(50% - 200px)', left: 'calc(50% - 300px)' }}
                        exitPosition={{ top: 308, left: 40, width: 90, height: 100, scale: 1, opacity: 0 }}
                        width={700}
                        height={500}
                    >
                        <ContactContent />
                    </GlassWindow>
                )}
            </AnimatePresence>


            {/* Dock */}
            <Dock onOpenApp={toggleWindow} />

            {/* System Modals */}
            <AboutMacModal isOpen={isAboutMacOpen} onClose={() => setIsAboutMacOpen(false)} />
        </div >
    );
};
