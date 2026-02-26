import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Battery, BatteryCharging, Wifi, Search, Volume2 } from 'lucide-react'; // Using Lucide icons where possible, text for Apple logo if needed

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
        about: ['About Me', '---', 'View Resume'],
        projects: ['All Projects', '---', 'Alanya Holidays', 'Iffa Tech', 'Kassimova Design'],
        contact: ['Contact Form', '---', 'Copy Email', 'Copy Phone'],
        socials: ['GitHub', 'LinkedIn', 'Telegram', 'Instagram']
    };

    const toggleMenu = (menu: string) => {
        setActiveMenu(activeMenu === menu ? null : menu);
    };

    const handleMouseEnter = (menuName: string) => {
        if (activeMenu && activeMenu !== menuName) {
            setActiveMenu(menuName);
        }
    };


    const handleMenuClick = (item: string) => {
        switch (item) {
            case 'About This Mac':
                onAboutClick?.();
                break;
            case 'Restart...':
                window.location.reload();
                break;
            case 'Shut Down...':
                document.body.style.filter = 'brightness(0)';
                break;
            case 'About Me':
                onToggleWindow?.('about');
                break;
            case 'View Resume':
                window.open('https://docs.google.com/document/d/your-resume-id/preview', '_blank'); // Update with actual link if needed
                break;
            case 'All Projects':
                onToggleWindow?.('projects');
                break;
            case 'Alanya Holidays':
                onToggleWindow?.('alanya');
                break;
            case 'Iffa Tech':
                onToggleWindow?.('iffa');
                break;
            case 'Kassimova Design':
                onToggleWindow?.('kassimova');
                break;
            case 'Contact Form':
                onToggleWindow?.('contact');
                break;
            case 'Copy Email':
                navigator.clipboard.writeText('chingiz.salikhov@gmail.com');
                onSystemAlert?.('Copied to Clipboard', 'Email address has been copied to your clipboard.');
                break;
            case 'Copy Phone':
                navigator.clipboard.writeText('+90 555 555 55 55'); // Replace with actual number
                onSystemAlert?.('Copied to Clipboard', 'Phone number has been copied to your clipboard.');
                break;
            case 'GitHub':
                window.open('https://github.com/ChilL-Q', '_blank');
                break;
            case 'LinkedIn':
                window.open('https://linkedin.com/in/chingiz-salikhov', '_blank');
                break;
            case 'Telegram':
                window.open('https://t.me/kachevn1k', '_blank');
                break;
            case 'Instagram':
                window.open('https://instagram.com/kachevn1k', '_blank');
                break;
            default:
                onSystemAlert?.('Feature Not Implemented', `The "${item}" action is a placeholder and not fully functional in this web simulation.`);
                break;
        }
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
                {['About', 'Projects', 'Contact', 'Socials'].map(menu => (
                    <div key={menu} style={{ position: 'relative', height: '100%' }}>
                        <div
                            onClick={(e) => { e.stopPropagation(); toggleMenu(menu.toLowerCase()); }}
                            onMouseEnter={() => handleMouseEnter(menu.toLowerCase())}
                            style={{
                                padding: '0 12px', height: '100%', display: 'flex', alignItems: 'center',
                                cursor: 'pointer', background: activeMenu === menu.toLowerCase() ? 'rgba(255,255,255,0.1)' : 'transparent',
                                borderRadius: '4px', opacity: 0.9, fontWeight: 500
                            }}
                        >
                            {menu}
                        </div>
                        <AnimatePresence>
                            {activeMenu === menu.toLowerCase() && <MenuDropdown items={menuItems[menu.toLowerCase() as keyof typeof menuItems]} setActiveMenu={setActiveMenu} onItemClick={handleMenuClick} />}
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
