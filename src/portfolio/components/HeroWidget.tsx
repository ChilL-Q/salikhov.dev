import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const HeroWidget = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{
                textAlign: 'center',
                color: 'white',
                pointerEvents: 'none'
            }}
        >
            <h1 style={{
                fontSize: '8rem',
                fontWeight: 200,
                lineHeight: 1,
                margin: 0,
                background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))'
            }}>
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </h1>
            <p style={{
                fontSize: '1.5rem',
                fontWeight: 300,
                opacity: 0.8,
                marginTop: '0.2rem',
                letterSpacing: '2px',
                textTransform: 'uppercase'
            }}>
                {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
        </motion.div>
    );
};
