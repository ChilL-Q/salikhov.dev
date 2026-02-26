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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClick}
                style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '22px', // Very round, like iOS/macOS
                    // background: background, // We might want to keep the gradient but add glass over it? No, keeping background as is but adding effects.
                    background: background,
                    border: '1px solid rgba(255,255,255,0.2)', // Brighter border
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)', // "Wet" top shine
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white',
                    padding: 0,
                    position: 'relative',
                    backdropFilter: 'blur(4px)' // Subtle blur if background has transparency
                }}
            >
                {/* Icon Content */}
                <div style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
                    {icon}
                </div>
            </motion.button>
            <span style={{
                display: 'block',
                marginTop: '6px',
                opacity: 0.9,
                fontSize: '12px',
                color: '#ffffff',
                textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                fontWeight: 600,
                textAlign: 'center',
                maxWidth: '100px',
                lineHeight: '1.2',
                overflowWrap: 'anywhere'
            }}>
                {label}
            </span>
        </div >
    );
};

export const AppIcon = React.memo(AppIconComponent);
