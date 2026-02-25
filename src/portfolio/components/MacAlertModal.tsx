import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MacAlertModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onClose: () => void;
}

export const MacAlertModal: React.FC<MacAlertModalProps> = ({ isOpen, title, message, onClose }) => {
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
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.4)',
                            zIndex: 9998,
                        }}
                    />
                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            background: 'rgba(30, 30, 30, 0.95)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            padding: '24px',
                            width: '300px',
                            zIndex: 9999,
                            color: 'white',
                            textAlign: 'center',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                        }}
                    >
                        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600 }}>{title}</h3>
                        <p style={{ margin: '0 0 20px 0', fontSize: '13px', opacity: 0.8, lineHeight: 1.4 }}>{message}</p>

                        <button
                            onClick={onClose}
                            style={{
                                width: '100%',
                                padding: '8px 0',
                                background: '#007AFF',
                                border: 'none',
                                borderRadius: '6px',
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: 500,
                                cursor: 'pointer',
                            }}
                        >
                            OK
                        </button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
