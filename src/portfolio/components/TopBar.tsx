import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Battery, BatteryCharging, Wifi, Search, Volume2 } from 'lucide-react'; // Using Lucide icons where possible, text for Apple logo if needed
import { useLanguage } from '../../context/LanguageContext';

const MenuDropdown = ({ items, setActiveMenu, onItemClick }: { items: string[], setActiveMenu: (menu: string | null) => void, onItemClick?: (item: string) => void }) => (
    <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.1 }}
        style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            background: 'rgba(30, 30, 30, 0.95)', // Dark mode menu
            backdropFilter: 'blur(20px)',
            borderRadius: '0 0 8px 8px',
            padding: '6px',
            minWidth: '220px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            zIndex: 2000
        }}
        onClick={(e) => e.stopPropagation()}
    >
        {items.map((item, index) => {
            if (item === '---') {
                return <div key={index} style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '4px 0' }} />;
            }
            return (
                <div
                    key={index}
                    className="menu-item"
                    onClick={() => {
                        setActiveMenu(null);
                        onItemClick?.(item);
                    }}
                    style={{
                        padding: '6px 12px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        color: 'white',
                        transition: 'background 0.1s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#007AFF'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                    {item}
                </div>
            )
        })}
    </motion.div>
);

interface TopBarProps {
    onAboutClick?: () => void;
    onToggleWindow?: (key: string) => void;
    onSystemAlert?: (title: string, message: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onAboutClick, onToggleWindow, onSystemAlert }) => {
    const { t } = useLanguage();
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [time, setTime] = useState(new Date());
    const [wifiEnabled, setWifiEnabled] = useState(true);
    const [volumeMuted, setVolumeMuted] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [batteryLevel, setBatteryLevel] = useState<number>(100);
    const [isCharging, setIsCharging] = useState<boolean>(false);

    useEffect(() => {
        // Battery Status API (Only works on some browsers like Chrome)
        let batteryManager: any = null;

        const updateBattery = (b: any) => {
            setBatteryLevel(Math.floor(b.level * 100));
            setIsCharging(b.charging);
        };

        if ('getBattery' in navigator) {
            (navigator as any).getBattery().then((b: any) => {
                batteryManager = b;
                updateBattery(b);
                b.addEventListener('levelchange', () => updateBattery(b));
                b.addEventListener('chargingchange', () => updateBattery(b));
            }).catch(() => {
                // Ignore errors, default to 100%
            });
        }

        return () => {
            if (batteryManager) {
                batteryManager.removeEventListener('levelchange', () => updateBattery(batteryManager));
                batteryManager.removeEventListener('chargingchange', () => updateBattery(batteryManager));
            }
        }
    }, []);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const menuItems = {
        apple: ['About This Mac', '---', 'Restart...', 'Shut Down...'],
        about: [t('about.title')],
        projects: [t('projects.title'), '---', t('projects.items.alanya.title'), t('projects.items.iffa.title'), t('projects.items.kassimova.title')],
        contact: [t('contact.title'), '---', t('topbar.email'), t('topbar.phone')],
        socials: ['Telegram', 'Instagram', 'WhatsApp']
    };

    const topLevelMenus = [
        { key: 'about', label: t('topbar.about') },
        { key: 'projects', label: t('topbar.projects') },
        { key: 'contact', label: t('topbar.contact') },
        { key: 'socials', label: t('topbar.socials') }
    ];

    const toggleMenu = (menu: string) => {
        setActiveMenu(activeMenu === menu ? null : menu);
    };

    const handleMouseEnter = (menuName: string) => {
        if (activeMenu && activeMenu !== menuName) {
            setActiveMenu(menuName);
        }
    };

    const handleMenuClick = (item: string) => {
        if (item === 'About This Mac') onAboutClick?.();
        else if (item === 'Restart...') window.location.reload();
        else if (item === 'Shut Down...') document.body.style.filter = 'brightness(0)';
        else if (item === t('about.title')) onToggleWindow?.('about');
        else if (item === t('projects.title')) onToggleWindow?.('projects');
        else if (item === t('projects.items.alanya.title')) onToggleWindow?.('alanya');
        else if (item === t('projects.items.iffa.title')) onToggleWindow?.('iffa');
        else if (item === t('projects.items.kassimova.title')) onToggleWindow?.('kassimova');
        else if (item === t('contact.title')) onToggleWindow?.('contact');
        else if (item === t('topbar.email')) {
            navigator.clipboard.writeText('salikhovchingiz@gmail.com');
            onSystemAlert?.(t('topbar.copied'), 'Email address has been copied to your clipboard.');
        } else if (item === t('topbar.phone')) {
            navigator.clipboard.writeText('+7 701 981 37 21');
            onSystemAlert?.(t('topbar.copied'), 'Phone number has been copied to your clipboard.');
        } else if (item === 'Telegram') window.open('https://t.me/salikhov_dev', '_blank');
        else if (item === 'Instagram') window.open('https://instagram.com/salikhov.dev', '_blank');
        else if (item === 'WhatsApp') window.open('https://wa.me/77019813721', '_blank');
        else onSystemAlert?.('Feature Not Implemented', `The "${item}" action is a placeholder and not fully functional in this web simulation.`);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = () => setActiveMenu(null);
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);


    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '32px',
                background: 'rgba(0, 0, 0, 0.2)', // Darker, more distinct
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 16px',
                zIndex: 1000,
                fontSize: '13px',
                fontWeight: 500,
                userSelect: 'none',
                color: 'white'
            }}
            onClick={(e) => e.stopPropagation()}
        >
            {/* Left Menu */}
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center', height: '100%' }}>
                {/* Apple Logo */}
                <div style={{ position: 'relative', height: '100%' }}>
                    <div
                        onClick={(e) => { e.stopPropagation(); toggleMenu('apple'); }}
                        onMouseEnter={() => handleMouseEnter('apple')}
                        style={{
                            padding: '0 12px', height: '100%', display: 'flex', alignItems: 'center',
                            cursor: 'pointer', background: activeMenu === 'apple' ? 'rgba(255,255,255,0.1)' : 'transparent',
                            borderRadius: '4px'
                        }}
                    >
                        
                    </div>
                    <AnimatePresence>
                        {activeMenu === 'apple' && <MenuDropdown items={menuItems.apple} setActiveMenu={setActiveMenu} onItemClick={handleMenuClick} />}
                    </AnimatePresence>
                </div>

                {/* New Useful Menus */}
                {topLevelMenus.map(menu => (
                    <div key={menu.key} style={{ position: 'relative', height: '100%' }}>
                        <div
                            onClick={(e) => { e.stopPropagation(); toggleMenu(menu.key); }}
                            onMouseEnter={() => handleMouseEnter(menu.key)}
                            style={{
                                padding: '0 12px', height: '100%', display: 'flex', alignItems: 'center',
                                cursor: 'pointer', background: activeMenu === menu.key ? 'rgba(255,255,255,0.1)' : 'transparent',
                                borderRadius: '4px', opacity: 0.9, fontWeight: 500
                            }}
                        >
                            {menu.label}
                        </div>
                        <AnimatePresence>
                            {activeMenu === menu.key && <MenuDropdown items={menuItems[menu.key as keyof typeof menuItems]} setActiveMenu={setActiveMenu} onItemClick={handleMenuClick} />}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            {/* Right Status Area */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', height: '100%' }}>
                <div
                    title={`Battery: ${batteryLevel}%${isCharging ? ' (Charging)' : ''}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: isCharging ? '#4ade80' : 'inherit' }}
                    onClick={() => onSystemAlert?.('Battery details', `${batteryLevel}% remaining. ${isCharging ? 'Power Source: Power Adapter' : 'Power Source: Battery'}`)}
                >
                    {isCharging ? <BatteryCharging size={16} /> : <Battery size={16} />}
                    <span style={{ fontSize: '12px' }}>{batteryLevel}%</span>
                </div>

                <div
                    title={wifiEnabled ? "Wi-Fi: Connected" : "Wi-Fi: Off"}
                    style={{ cursor: 'pointer', opacity: wifiEnabled ? 1 : 0.5, transition: 'opacity 0.2s' }}
                    onClick={() => setWifiEnabled(!wifiEnabled)}
                >
                    <Wifi size={16} />
                </div>

                <div
                    title="Spotlight Search"
                    style={{ cursor: 'pointer', color: isSearching ? '#007AFF' : 'inherit', transition: 'color 0.2s' }}
                    onClick={() => {
                        setIsSearching(true);
                        setTimeout(() => setIsSearching(false), 3000); // Mock search pulse
                    }}
                >
                    <Search size={14} />
                </div>

                {/* Control Center Toggle */}
                <div
                    title={volumeMuted ? "Volume: Muted" : "Volume: On"}
                    style={{ cursor: 'pointer', opacity: volumeMuted ? 0.5 : 1, transition: 'opacity 0.2s' }}
                    onClick={() => setVolumeMuted(!volumeMuted)}
                >
                    <Volume2 size={16} />
                </div>

                {/* Date & Time */}
                <div
                    style={{
                        marginLeft: '8px', cursor: 'pointer', fontWeight: 500,
                        display: 'flex', gap: '8px', padding: '0 8px', borderRadius: '4px',
                        transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    onClick={() => console.log('Open notification center')}
                >
                    <span>{time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                    <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </div>
        </div>
    );
};
