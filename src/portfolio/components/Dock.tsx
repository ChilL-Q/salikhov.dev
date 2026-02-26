import React from 'react';
import { motion } from 'framer-motion';
import { User, Send, Instagram, Mail, MessageCircle, Globe } from 'lucide-react';
import alanyaLogo from '../../assets/logos/alanya-logo.webp';
import iffaLogo from '../../assets/logos/iffa-logo.webp';
import kassimovaLogo from '../../assets/logos/kassimova-logo.webp';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useLanguage } from '../../context/LanguageContext';

interface DockItemProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    background?: string;
}

const DockItem: React.FC<DockItemProps> = ({ icon, label, onClick, background = 'linear-gradient(135deg, #1A1A1A, #2C3E50)' }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <motion.button
                whileHover={{ scale: 1.15, y: -10 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClick}
                style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '22px', // Very round, like iOS/macOS
                    background: background,
                    border: '1px solid rgba(255,255,255,0.2)', // Brighter border
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)', // "Wet" top shine
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white',
                    padding: 0,
                    backdropFilter: 'blur(10px)', // Inner blur for icons
                    WebkitBackdropFilter: 'blur(10px)',
                    overflow: 'hidden'
                }}
            >
                <div style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {icon}
                </div>
            </motion.button>
            <span style={{
                fontSize: '12px',
                color: 'white',
                background: 'rgba(0,0,0,0.6)',
                padding: '2px 8px',
                borderRadius: '10px',
                opacity: 0, // Hidden by default, could show on hover if needed
                position: 'absolute',
                pointerEvents: 'none'
            }}>
                {label}
            </span>
        </div>
    );
};

interface DockProps {
    onOpenApp: (appId: string) => void;
}

const Separator: React.FC = () => (
    <div style={{
        width: '1px',
        height: '40px',
        background: 'rgba(255, 255, 255, 0.15)',
        alignSelf: 'center',
        margin: '0 4px',
        borderRadius: '1px'
    }} />
);

export const Dock: React.FC<DockProps> = ({ onOpenApp }) => {
    const isMobile = useIsMobile();
    const { t } = useLanguage();

    return (
        <motion.div
            initial={{ y: 100, x: "-50%" }}
            animate={{ y: 0, x: "-50%" }}
            style={{
                position: 'fixed',
                bottom: isMobile ? 'calc(16px + env(safe-area-inset-bottom, 0px))' : '20px',
                left: '50%',
                display: 'flex',
                gap: isMobile ? '16px' : '20px',
                padding: isMobile ? '16px' : '20px 32px',
                background: 'rgba(255, 255, 255, 0.05)', // Even more transparent
                backdropFilter: 'blur(24px) saturate(180%)', // Liquid distortion
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.15)', // Crisp edge
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.05)', // Inner light ring
                zIndex: 1000,
                width: isMobile ? 'calc(100vw - 32px)' : 'auto',
                justifyContent: isMobile ? 'flex-start' : 'center',
                overflowX: isMobile ? 'auto' : 'visible',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
            }}
        >
            <style>
                {`
                ::-webkit-scrollbar {
                    display: none;
                }
                `}
            </style>
            <DockItem
                icon={<User size={32} strokeWidth={1.5} />}
                label="About"
                onClick={() => onOpenApp('about')}
                background="linear-gradient(135deg, #30D5C8, #0EA5E9)" // Cyan to Blue
            />
            <Separator />
            <DockItem
                icon={<img src={alanyaLogo} alt="Alanya" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px', borderRadius: '14px' }} />}
                label="Alanya"
                onClick={() => onOpenApp('alanya')}
                background="white" // Logo has its own background or fits poorly on gradient
            />
            <DockItem
                icon={<img src={iffaLogo} alt="Iffa" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }} />}
                label="Iffa Tech"
                onClick={() => onOpenApp('iffa')}
                background="#0F0F1A" // Dark background for Iffa logo
            />
            <DockItem
                icon={<img src={kassimovaLogo} alt="Kassimova" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }} />}
                label="Kassimova"
                onClick={() => onOpenApp('kassimova')}
                background="white" // Text logo needs white background
            />
            <Separator />
            <DockItem
                icon={<Send size={28} strokeWidth={1.5} />}
                label="Telegram"
                onClick={() => window.open('https://t.me/salikhov_dev', '_blank')}
                background="linear-gradient(135deg, #24A1DE, #33BEF0)" // Telegram Blue
            />
            <DockItem
                icon={<MessageCircle size={28} strokeWidth={1.5} />}
                label="WhatsApp"
                onClick={() => window.open('https://wa.me/77019813721', '_blank')}
                background="linear-gradient(135deg, #25D366, #40E0D0)" // WhatsApp Green
            />
            <DockItem
                icon={<Instagram size={28} strokeWidth={1.5} />}
                label="Instagram"
                onClick={() => window.open('https://instagram.com/salikhov.dev', '_blank')}
                background="linear-gradient(45deg, #F58529, #DD2A7B, #8134AF)" // Instagram Gradient
            />
            <DockItem
                icon={<Mail size={28} strokeWidth={1.5} />}
                label={t('topbar.email') || "Email"}
                onClick={() => window.open('mailto:salikhovchingiz@gmail.com', '_blank')}
                background="linear-gradient(135deg, #5AC8FA, #007AFF)" // Apple Mail Blue
            />
            <Separator />
            <DockItem
                icon={<Globe size={28} strokeWidth={1.5} />}
                label={t('desktop.settings') || "Language"}
                onClick={() => onOpenApp('settings')}
                background="linear-gradient(135deg, #3B82F6, #1D4ED8)" // Settings Blue
            />
        </motion.div>
    );
};
