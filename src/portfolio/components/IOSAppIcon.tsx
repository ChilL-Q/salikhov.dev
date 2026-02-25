import React from 'react';
import { motion } from 'framer-motion';

interface IOSAppIconProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    color?: string;
}

export const IOSAppIcon: React.FC<IOSAppIconProps> = ({ icon, label, onClick, color = 'rgba(255,255,255,0.1)' }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClick}
                className="glass-liquid"
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '16px', // iOS Squircle approx
                    background: color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    cursor: 'pointer',
                    padding: 0
                }}
            >
                {icon}
            </motion.button>
            <span style={{
                fontSize: '12px',
                color: 'white',
                textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                fontWeight: 500
            }}>
                {label}
            </span>
        </div>
    );
};
