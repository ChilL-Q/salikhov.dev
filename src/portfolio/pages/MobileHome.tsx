import { useState, useEffect, useCallback } from 'react';
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

// Reusing content logic but adapted for mobile
export const MobileHome = () => {
    const [openApp, setOpenApp] = useState<string | null>('about');
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Initial random battery level for browsers that don't support the API (like iOS Safari)
    // We use a ref or local storage to keep it somewhat stable across quick reloads if desired, 
    // but a random initial value between 45% and 89% is usually believable enough.
    const [batteryLevel, setBatteryLevel] = useState<number>(() => {
        const stored = sessionStorage.getItem('simulated_battery');
        if (stored) return parseInt(stored, 10);
        const randomInitial = Math.floor(Math.random() * (89 - 45 + 1)) + 45;
        sessionStorage.setItem('simulated_battery', randomInitial.toString());
        return randomInitial;
    });
    const [isCharging, setIsCharging] = useState<boolean>(false);
    const [systemAlert, setSystemAlert] = useState<{ isOpen: boolean; title: string; message: string }>({
        isOpen: false,
        title: '',
        message: ''
    });

    useEffect(() => {
        let batteryManager: any = null;
        let simulatedDrainInterval: ReturnType<typeof setInterval> | null = null;
        let isApiSupported = false;

        const updateBattery = (b: any) => {
            setBatteryLevel(Math.floor(b.level * 100));
            setIsCharging(b.charging);
        };

        if ('getBattery' in navigator) {
            (navigator as any).getBattery().then((b: any) => {
                isApiSupported = true;
                batteryManager = b;
                updateBattery(b);
                b.addEventListener('levelchange', () => updateBattery(b));
                b.addEventListener('chargingchange', () => updateBattery(b));
            }).catch(() => { isApiSupported = false; });
        }

        // Fallback for iOS Safari: Simulate battery drain
        if (!isApiSupported) {
            simulatedDrainInterval = setInterval(() => {
                setBatteryLevel(prev => {
                    const newLevel = Math.max(1, prev - 1);
                    sessionStorage.setItem('simulated_battery', newLevel.toString());
                    return newLevel;
                });
            }, 1000 * 60 * 3); // 1% drop every 3 minutes
        }

        return () => {
            if (batteryManager) {
                batteryManager.removeEventListener('levelchange', () => updateBattery(batteryManager));
                batteryManager.removeEventListener('chargingchange', () => updateBattery(batteryManager));
            }
            if (simulatedDrainInterval) {
                clearInterval(simulatedDrainInterval);
            }
        }
    }, []);

    const apps = [
        { id: 'about', label: 'About Me', icon: <User size={32} strokeWidth={1} />, background: 'linear-gradient(180deg, #30D5C8, #0EA5E9)' },
        { id: 'projects', label: 'Projects', icon: <Briefcase size={32} strokeWidth={1} />, background: 'linear-gradient(180deg, #F472B6, #9333EA)' },
        { id: 'contact', label: 'Contact', icon: <Contact size={32} strokeWidth={1} />, background: 'linear-gradient(180deg, #94A3B8, #475569)' },
        { id: 'privacy', label: 'Privacy', icon: <Shield size={32} strokeWidth={1} />, background: 'linear-gradient(180deg, #64748B, #475569)' },
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
            height: '100vh',
            overflow: 'hidden',
            position: 'relative',
            color: 'white',
            fontFamily: 'var(--font-body)'
        }}>
            <Scene3D />

            {/* iOS Status Bar Placeholder */}
            <div style={{
                height: 'calc(54px + env(safe-area-inset-top, 0px))', // Increased base height a bit for safety
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                padding: 'env(safe-area-inset-top, 0px) 24px 0',
                alignItems: 'center',
                fontSize: '14px',
                fontWeight: 600,
                position: 'fixed',
                top: 0,
                zIndex: 100
            }}>
                <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <div style={{ display: 'flex', gap: '8px', cursor: 'pointer', color: 'white', alignItems: 'center' }} onClick={() => setSystemAlert({ isOpen: true, title: 'Battery details', message: `${batteryLevel}% remaining. Power Source: ${isCharging ? 'Power Adapter' : 'Battery'}` })}>
                    <div className="signal" style={{ width: '18px', height: '12px', background: 'currentColor', clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%)' }} />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ width: '26px', height: '13px', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '4px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ position: 'absolute', left: '1px', top: '1px', bottom: '1px', width: `calc(${batteryLevel}% - 2px)`, background: isCharging ? '#4ade80' : 'white', borderRadius: '2px', transition: 'width 0.3s ease', zIndex: 1 }} />
                            <span style={{ position: 'relative', zIndex: 2, fontSize: '10px', fontWeight: 800, color: batteryLevel > 50 ? 'black' : 'white', letterSpacing: '-0.5px' }}>
                                {batteryLevel}
                            </span>
                        </div>
                        <div style={{ width: '2px', height: '4px', background: 'rgba(255,255,255,0.4)', borderRadius: '0 2px 2px 0', marginLeft: '1px' }} />
                    </div>
                </div>
            </div>



            {/* Main Grid */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                padding: 'calc(85px + env(safe-area-inset-top, 0px)) 32px 20px', // Increased padding to prevent overlap
                display: 'flex',
                justifyContent: 'space-between',
                maxWidth: '400px',
                margin: '0 auto'
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
                            <button onClick={handleCloseApp} style={{ color: '#007AFF', fontSize: '17px', fontWeight: 600, position: 'absolute', right: '16px' }}>Done</button>
                        </div>

                        {/* Sheet Content */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
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

                            {openApp === 'alanya' && (
                                <ProjectWindowContent
                                    title="Alanya Holidays"
                                    description="Premium holiday rentals and experiences platform in Alanya. Features luxury villas, apartments, and yacht tours with a focus on authentic local experiences."
                                    technologies={['React', 'Next.js', 'Booking System', 'Stripe']}
                                    link="https://alanyaholidays.com"
                                    gradient="linear-gradient(135deg, #2dd4bf, #0ea5e9)"
                                    icon={<Globe size={32} strokeWidth={1.5} />}
                                />
                            )}

                            {openApp === 'iffa' && (
                                <ProjectWindowContent
                                    title="Iffa Tech"
                                    description="Innovative technical solutions and custom software development. Delivering robust digital products for modern business needs."
                                    technologies={['Software Development', 'Cloud Solutions', 'Enterprise Tech']}
                                    link="https://iffatech.com"
                                    gradient="linear-gradient(135deg, #818cf8, #6366f1)"
                                    icon={<Monitor size={32} strokeWidth={1.5} />}
                                />
                            )}

                            {openApp === 'kassimova' && (
                                <ProjectWindowContent
                                    title="Kassimova Design"
                                    description="A portfolio showcasing exquisite design works, branding, and visual storytelling."
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
