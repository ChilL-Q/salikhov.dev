import React from 'react';
import { motion } from 'framer-motion';

interface AppIconProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    background?: string; // Gradient or solid color
}

const AppIconComponent: React.FC<AppIconProps> = ({ icon, label, onClick, background = 'linear-gradient(135deg, #1A1A1A, #2C3E50)' }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            width: '120px', // Fixed width ensures all icons align vertically in a column
        }}>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClick}
                style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '22px',
                    background: background,
                    border: '1px solid rgba(255,255,255,0.2)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white',
                    padding: 0,
                    position: 'relative',
                    backdropFilter: 'blur(4px)'
                }}
            >
                <div style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
                    {icon}
                </div>
            </motion.button>
            <span style={{
                display: 'block',
                marginTop: '6px',
                opacity: 1,
                fontSize: '13px',
                color: '#ffffff',
                textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                fontWeight: 600,
                textAlign: 'center',
                maxWidth: '100px', // Restrict width so long words wrap nicely
                lineHeight: '1.2',
                overflowWrap: 'break-word',
                hyphens: 'auto'
            }}>
                {label}
            </span>
        </div >
    );
};

export const AppIcon = React.memo(AppIconComponent);
