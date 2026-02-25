import React from 'react';
import { motion, useDragControls } from 'framer-motion';
import { X } from 'lucide-react';

interface GlassWindowProps {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    initialPosition?: any;
    width?: string | number;
    height?: string | number;
    isMaximized?: boolean;
    onMinimize?: () => void;
    onMaximize?: () => void;
    exitPosition?: any;
    zIndex?: number;
    onClick?: () => void;
}

const GlassWindowComponent: React.FC<GlassWindowProps> = ({
    title,
    children,
    isOpen,
    onClose,
    initialPosition = { x: 0, y: 0 },
    width = '600px',
    height = 'auto',
    isMaximized = false,
    onMinimize,
    onMaximize,
    exitPosition,
    zIndex = 100,
    onClick
}) => {
    const dragControls = useDragControls();

    if (!isOpen) return null;

    const maximizeStyle = isMaximized ? {
        top: '32px',
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 32px)',
        x: 0,
        y: 0,
        borderRadius: 0
    } : {};

    const currentWidth = isMaximized ? '100vw' : width;
    const currentHeight = isMaximized ? 'calc(100vh - 32px)' : height;

    const variants = {
        initial: { opacity: 0, scale: 0.9, ...initialPosition },
        animate: {
            opacity: 1,
            scale: 1,
            width: isMaximized ? '100vw' : width,
            height: isMaximized ? 'calc(100vh - 32px)' : height,
            ...maximizeStyle
        },
        exit: (isMinimized: boolean) => {
            // Genie effect if minimized
            if (isMinimized && exitPosition) {
                return {
                    opacity: 0,
                    scale: 0,
                    ...exitPosition,
                    transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] }
                };
            }
            // Standard fade out if closed
            return {
                opacity: 0,
                scale: 0.9,
                transition: { duration: 0.2 }
            };
        }
    };

    return (
        <motion.div
            drag={!isMaximized}
            dragListener={false}
            dragControls={dragControls}
            dragMomentum={false}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="glass-panel glass-liquid"
            onPointerDownCapture={onClick}
            style={{
                position: 'absolute',
                width: currentWidth,
                height: currentHeight,
                zIndex: zIndex,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                background: 'rgba(20, 20, 30, 0.4)', // Darker tint for windows
                backdropFilter: 'blur(30px) saturate(180%)', // Deep blur
                WebkitBackdropFilter: 'blur(34px) saturate(180%)',
                borderRadius: isMaximized ? 0 : '20px',
                border: isMaximized ? 'none' : '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: isMaximized ? 'none' : '0 10px 40px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
                ...(!isMaximized ? initialPosition : {}) // Apply initial pos if not maximized
            }}
        >
            {/* Title Bar */}
            <div
                className="window-header"
                onPointerDown={(e) => !isMaximized && dragControls.start(e)}
                onDoubleClick={onMaximize}
                style={{
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: 'var(--glass-border)',
                    cursor: isMaximized ? 'default' : 'grab',
                    background: 'rgba(255,255,255,0.02)'
                }}
            >
                <div style={{ display: 'flex', gap: '8px' }} className="window-controls">
                    {/* Close (Red) */}
                    <button
                        onClick={(e) => { e.stopPropagation(); onClose(); }}
                        className="control-btn close"
                    >
                        <X size={8} className="icon" />
                    </button>

                    {/* Minimize (Yellow) */}
                    <button
                        onClick={(e) => { e.stopPropagation(); onMinimize?.(); }}
                        className="control-btn minimize"
                    >
                        <div className="icon minus-icon" />
                    </button>

                    {/* Maximize (Green) */}
                    <button
                        onClick={(e) => { e.stopPropagation(); onMaximize?.(); }}
                        className="control-btn maximize"
                    >
                        <div className="icon plus-icon" />
                    </button>
                </div>
                <span style={{ fontSize: '13px', fontWeight: 500, opacity: 0.8 }}>{title}</span>
                <div style={{ width: '52px' }} /> {/* Spacer */}
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
                {children}
            </div>

            <style>{`
                .control-btn {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    display: flex;
                    alignItems: center;
                    justifyContent: center;
                    padding: 0;
                    border: none;
                    cursor: pointer;
                    position: relative;
                }
                .control-btn .icon {
                    opacity: 0;
                    transition: opacity 0.2s;
                    color: rgba(0,0,0,0.5);
                }
                .window-controls:hover .control-btn .icon {
                    opacity: 1;
                }
                
                .close { background: #FF5F56; border: 1px solid #E0443E; }
                .minimize { background: #FFBD2E; border: 1px solid #D89E24; }
                .maximize { background: #27C93F; border: 1px solid #1AAB29; }

                .minus-icon { width: 8px; height: 1px; background: rgba(0,0,0,0.5); }
                .plus-icon { width: 8px; height: 8px; position: relative; }
                .plus-icon::before, .plus-icon::after {
                    content: ''; position: absolute; background: rgba(0,0,0,0.5);
                    top: 50%; left: 50%; transform: translate(-50%, -50%);
                }
                .plus-icon::before { width: 8px; height: 1px; }
                .plus-icon::after { width: 1px; height: 8px; }
            `}</style>
        </motion.div>
    );
};

export const GlassWindow = React.memo(GlassWindowComponent);
