import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Contact, Briefcase, User, Globe, Monitor, PenTool, Shield } from 'lucide-react';
import { AppIcon } from '../components/AppIcon';
import { MacAlertModal } from '../components/MacAlertModal';
import { ProjectWindowContent } from '../components/ProjectWindowContent';
import { Dock } from '../components/Dock';
import { Scene3D } from '../components/Scene3D';
import { AboutContent } from '../components/AboutContent';
import { ProjectsContent } from '../components/ProjectsContent';
import { ContactContent } from '../components/ContactContent';
import { PrivacyPolicyContent } from '../components/PrivacyPolicyContent';
import { LanguageSelectorContent } from '../components/LanguageSelectorContent';
import { useLanguage } from '../../context/LanguageContext';

// Reusing content logic but adapted for mobile
export const MobileHome = () => {
    const { t } = useLanguage();
    const [openApp, setOpenApp] = useState<string | null>('about');
    const [systemAlert, setSystemAlert] = useState<{ isOpen: boolean; title: string; message: string }>({
        isOpen: false,
        title: '',
        message: ''
    });

    const apps = [
        { id: 'about', label: t('desktop.about'), icon: <User size={32} strokeWidth={1} />, background: 'linear-gradient(180deg, #30D5C8, #0EA5E9)' },
        { id: 'projects', label: t('desktop.projects'), icon: <Briefcase size={32} strokeWidth={1} />, background: 'linear-gradient(180deg, #F472B6, #9333EA)' },
        { id: 'contact', label: t('desktop.contact'), icon: <Contact size={32} strokeWidth={1} />, background: 'linear-gradient(180deg, #FF9500, #FF5E00)' },
        { id: 'privacy', label: t('desktop.privacy'), icon: <Shield size={32} strokeWidth={1} />, background: 'linear-gradient(180deg, #64748B, #475569)' },
        { id: 'settings', label: t('desktop.settings'), icon: <Globe size={32} strokeWidth={1} />, background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)' },
    ];

    const handleOpenApp = useCallback((appId: string) => {
        setOpenApp(appId);
    }, []);

    const handleCloseApp = useCallback(() => {
        setOpenApp(null);
    }, []);
    return (
        <div style={{
            width: '100vw',
            height: '100dvh', // Use dvh for stable height on mobile browsers
            overflow: 'hidden',
            position: 'relative',
            color: 'white',
            fontFamily: 'var(--font-body)',
            display: 'flex', // Use flex to organize main areas
            flexDirection: 'column'
        }}>
            <Scene3D />

            {/* Main Content Area */}
            <div style={{
                flex: 1,
                position: 'relative',
                zIndex: 10,
                paddingTop: 'calc(70px + env(safe-area-inset-top, 0px))', // Move grid higher
                paddingBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))', // Space for Dock
                paddingLeft: '16px',
                paddingRight: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start', // Apps at the top, like a real phone
                overflow: 'hidden',
                width: '100%'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', // Force strictly equal columns
                    rowGap: '24px',
                    columnGap: '8px', // Slightly narrower gap to gain space for long labels
                    justifyItems: 'center',
                    maxWidth: '360px',
                    width: '100%'
                }}>
                    {apps.map(app => (
                        <AppIcon
                            key={app.id}
                            icon={app.icon}
                            label={app.label}
                            background={app.background}
                            onClick={() => handleOpenApp(app.id)}
                        />
                    ))}
                </div>
            </div>

            {/* Dock */}
            <Dock onOpenApp={handleOpenApp} />

            {/* App Sheets (Modals) */}
            <AnimatePresence>
                {openApp && (
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 0 }}
                        dragElastic={{ top: 0, bottom: 0.5 }}
                        onDragEnd={(_, info) => {
                            if (info.offset.y > 100 || info.velocity.y > 500) {
                                handleCloseApp();
                            }
                        }}
                        className="glass-liquid"
                        style={{
                            position: 'fixed',
                            top: 'calc(55px + env(safe-area-inset-top, 0px))', // Positioned nicely below the status bar
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 2000,
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: '32px 32px 0 0', // iOS-like sheet
                            boxShadow: '0 -10px 40px rgba(0,0,0,0.5)',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Sheet Header */}
                        <div style={{
                            padding: '16px',
                            display: 'flex',
                            justifyContent: 'center', // Center the handle/done button nicely
                            alignItems: 'center',
                            background: 'rgba(255,255,255,0.05)',
                            borderBottom: '1px solid rgba(255,255,255,0.1)',
                            position: 'relative',
                            borderRadius: '32px 32px 0 0' // Fix for Safari background clipping
                        }}>
                            <div style={{ width: '36px', height: '5px', background: 'rgba(255,255,255,0.3)', borderRadius: '3px', position: 'absolute', top: '8px' }} />
                            <button onClick={handleCloseApp} style={{ color: '#007AFF', fontSize: '17px', fontWeight: 600, position: 'absolute', right: '16px' }}>{t('common.done') || 'Done'}</button>
                        </div>

                        {/* Sheet Content */}
                        <div style={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: '20px',
                            paddingBottom: 'calc(20px + env(safe-area-inset-bottom, 0px))' // Handle iOS safe area
                        }}>
                            {openApp === 'about' && (
                                <AboutContent isMobile />
                            )}

                            {openApp === 'projects' && (
                                <ProjectsContent isMobile />
                            )}

                            {openApp === 'contact' && (
                                <ContactContent isMobile />
                            )}

                            {openApp === 'privacy' && (
                                <PrivacyPolicyContent isMobile />
                            )}

                            {openApp === 'settings' && (
                                <LanguageSelectorContent isMobile />
                            )}

                            {openApp === 'alanya' && (
                                <ProjectWindowContent
                                    title={t('projects.items.alanya.title')}
                                    description={t('projects.items.alanya.desc')}
                                    technologies={['React', 'Next.js', 'Booking System', 'Stripe']}
                                    link="https://alanyaholidays.com"
                                    gradient="linear-gradient(135deg, #2dd4bf, #0ea5e9)"
                                    icon={<Globe size={32} strokeWidth={1.5} />}
                                />
                            )}

                            {openApp === 'iffa' && (
                                <ProjectWindowContent
                                    title={t('projects.items.iffa.title')}
                                    description={t('projects.items.iffa.desc')}
                                    technologies={['Software Development', 'Cloud Solutions', 'Enterprise Tech']}
                                    link="https://iffatech.com"
                                    gradient="linear-gradient(135deg, #818cf8, #6366f1)"
                                    icon={<Monitor size={32} strokeWidth={1.5} />}
                                />
                            )}

                            {openApp === 'kassimova' && (
                                <ProjectWindowContent
                                    title={t('projects.items.kassimova.title')}
                                    description={t('projects.items.kassimova.desc')}
                                    technologies={['UI/UX', 'Branding', 'Visual Identity']}
                                    link="https://kassimova.design"
                                    gradient="linear-gradient(135deg, #fb7185, #f43f5e)"
                                    icon={<PenTool size={32} strokeWidth={1.5} />}
                                />
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <MacAlertModal
                isOpen={systemAlert.isOpen}
                title={systemAlert.title}
                message={systemAlert.message}
                onClose={() => setSystemAlert(prev => ({ ...prev, isOpen: false }))}
            />
        </div>
    );
};
