import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Zap, HardDrive, Monitor } from 'lucide-react';
import avatar from '../../assets/avatar.webp'; // Using avatar as the "OS Logo" or we could use an icon
import { useLanguage } from '../../context/LanguageContext';

interface AboutMacModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AboutMacModalComponent: React.FC<AboutMacModalProps> = ({ isOpen, onClose }) => {
    const { t } = useLanguage();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.2)',
                            zIndex: 2000,
                            backdropFilter: 'blur(2px)'
                        }}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: "-50%", x: "-50%" }}
                        animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
                        exit={{ opacity: 0, scale: 0.9, y: "-50%", x: "-50%" }}
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            width: '580px',
                            background: 'rgba(30, 30, 40, 0.6)',
                            backdropFilter: 'blur(40px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                            borderRadius: '24px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)',
                            zIndex: 2001,
                            overflow: 'hidden',
                            color: 'white',
                            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '16px',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            borderBottom: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            <button
                                onClick={onClose}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'rgba(255,255,255,0.5)',
                                    cursor: 'pointer',
                                    padding: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '50%',
                                    transition: 'background 0.2s, color 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                    e.currentTarget.style.color = 'white';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                                }}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Content */}
                        <div style={{ padding: '40px', display: 'flex', gap: '40px', alignItems: 'flex-start' }}>

                            {/* Left: Logo/Avatar */}
                            <div style={{
                                width: '140px',
                                height: '140px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                                border: '4px solid rgba(255,255,255,0.1)',
                                flexShrink: 0,
                                position: 'relative'
                            }}>
                                <img src={avatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(0,0,0,0.2))',
                                    pointerEvents: 'none'
                                }} />
                            </div>

                            {/* Right: Info */}
                            <div style={{ flex: 1 }}>
                                <h1 style={{
                                    margin: '0 0 4px 0',
                                    fontSize: '28px',
                                    fontWeight: 600,
                                    letterSpacing: '-0.5px'
                                }}>
                                    {t('aboutMac.title')}
                                </h1>
                                <p style={{
                                    margin: '0 0 24px 0',
                                    opacity: 0.6,
                                    fontSize: '14px',
                                    fontWeight: 500
                                }}>
                                    {t('aboutMac.version')}
                                </p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                        <Monitor size={16} style={{ opacity: 0.5 }} />
                                        <span style={{ fontSize: '13px' }}>
                                            <span style={{ opacity: 0.5, marginRight: '8px' }}>{t('aboutMac.display')}</span>
                                            {t('aboutMac.displayValue')}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                        <Cpu size={16} style={{ opacity: 0.5 }} />
                                        <span style={{ fontSize: '13px' }}>
                                            <span style={{ opacity: 0.5, marginRight: '8px' }}>{t('aboutMac.processor')}</span>
                                            {t('aboutMac.processorValue')}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                        <Zap size={16} style={{ opacity: 0.5 }} />
                                        <span style={{ fontSize: '13px' }}>
                                            <span style={{ opacity: 0.5, marginRight: '8px' }}>{t('aboutMac.memory')}</span>
                                            {t('aboutMac.memoryValue')}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                        <HardDrive size={16} style={{ opacity: 0.5 }} />
                                        <span style={{ fontSize: '13px' }}>
                                            <span style={{ opacity: 0.5, marginRight: '8px' }}>{t('aboutMac.startupDisk')}</span>
                                            {t('aboutMac.startupDiskValue')}
                                        </span>
                                    </div>
                                </div>

                                <div style={{ marginTop: '32px', display: 'flex', gap: '12px' }}>
                                    <button style={{
                                        padding: '6px 16px',
                                        background: 'rgba(255,255,255,0.1)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '6px',
                                        color: 'white',
                                        fontSize: '13px',
                                        cursor: 'pointer',
                                        transition: 'background 0.2s'
                                    }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                                        onClick={() => window.open('https://github.com/ChilL-Q', '_blank')}
                                    >
                                        GitHub
                                    </button>
                                    <button style={{
                                        padding: '6px 16px',
                                        background: 'rgba(255,255,255,0.1)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '6px',
                                        color: 'white',
                                        fontSize: '13px',
                                        cursor: 'pointer',
                                        transition: 'background 0.2s'
                                    }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                                        onClick={() => window.open('https://linkedin.com/in/chingiz-salikhov', '_blank')}
                                    >
                                        LinkedIn
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div style={{
                            padding: '12px',
                            textAlign: 'center',
                            borderTop: '1px solid rgba(255,255,255,0.05)',
                            fontSize: '11px',
                            opacity: 0.4
                        }}>
                            {t('aboutMac.footer')}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
export const AboutMacModal = React.memo(AboutMacModalComponent);
