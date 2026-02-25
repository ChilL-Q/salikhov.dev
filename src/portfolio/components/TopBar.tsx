import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Battery, Wifi, Search, Volume2 } from 'lucide-react'; // Using Lucide icons where possible, text for Apple logo if needed

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
}

export const TopBar: React.FC<TopBarProps> = ({ onAboutClick }) => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const menuItems = {
        apple: ['About This Mac', 'System Settings...', 'App Store...', 'Sleep', 'Restart...', 'Shut Down...'],
        app: ['About Finder', 'Settings...', 'Empty Trash', 'Hide Finder', 'Hide Others', 'Quit Finder'],
        file: ['New Finder Window', 'New Folder', 'New Smart Folder', 'Close Window'],
        edit: ['Undo', 'Redo', 'Cut', 'Copy', 'Paste', 'Select All'],
        view: ['As Icons', 'As List', 'As Columns', 'As Gallery'],
        go: ['Back', 'Forward', 'Enclosing Folder', 'Recents', 'Documents', 'Desktop', 'Downloads'],
        window: ['Minimize', 'Zoom', 'Cycle Through Windows', 'Bring All to Front'],
        help: ['macOS Help', "See What's New"]
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
        if (item === 'About This Mac') {
            onAboutClick?.();
        } else if (item === 'Restart...') {
            window.location.reload();
        } else {
            console.log(`Menu action triggered: ${item}`);
            // Other actions could trigger toasts or default behaviors
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

                {/* App Name (Bold) */}
                <div style={{ position: 'relative', height: '100%' }}>
                    <div
                        onClick={(e) => { e.stopPropagation(); toggleMenu('app'); }}
                        onMouseEnter={() => handleMouseEnter('app')}
                        style={{
                            padding: '0 12px', height: '100%', display: 'flex', alignItems: 'center', fontWeight: 700,
                            cursor: 'pointer', background: activeMenu === 'app' ? 'rgba(255,255,255,0.1)' : 'transparent',
                            borderRadius: '4px'
                        }}
                    >
                        Finder
                    </div>
                    <AnimatePresence>
                        {activeMenu === 'app' && <MenuDropdown items={menuItems.app} setActiveMenu={setActiveMenu} onItemClick={handleMenuClick} />}
                    </AnimatePresence>
                </div>

                {/* Standard Menus */}
                {['File', 'Edit', 'View', 'Go', 'Window', 'Help'].map(menu => (
                    <div key={menu} style={{ position: 'relative', height: '100%' }}>
                        <div
                            onClick={(e) => { e.stopPropagation(); toggleMenu(menu.toLowerCase()); }}
                            onMouseEnter={() => handleMouseEnter(menu.toLowerCase())}
                            style={{
                                padding: '0 12px', height: '100%', display: 'flex', alignItems: 'center',
                                cursor: 'pointer', background: activeMenu === menu.toLowerCase() ? 'rgba(255,255,255,0.1)' : 'transparent',
                                borderRadius: '4px', opacity: 0.9
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Battery size={16} /> 100%
                </div>
                <Wifi size={16} />
                <Search size={14} />

                {/* Control Center Toggle */}
                <Volume2 size={16} />

                {/* Date & Time */}
                <div
                    style={{
                        marginLeft: '8px', cursor: 'default', fontWeight: 500,
                        display: 'flex', gap: '8px'
                    }}
                >
                    <span>{time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                    <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </div>
        </div>
    );
};
