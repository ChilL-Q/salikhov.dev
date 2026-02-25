import React from 'react';
import { Send, Mail } from 'lucide-react';
import avatar from '../../assets/avatar.webp';

interface AboutContentProps {
    isMobile?: boolean;
}

const AboutContentComponent: React.FC<AboutContentProps> = ({ isMobile }) => {
    const techStack = ['React', 'TypeScript', 'JavaScript', 'Python', 'Node.js', 'Docker', 'Three.js', 'Framer Motion', 'AI/LLM', 'Next.js', 'Tailwind', 'PostgreSQL'];

    if (isMobile) {
        return (
            <div style={{ textAlign: 'center', color: 'white' }}>
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', border: '3px solid rgba(255,255,255,0.1)' }}>
                        <img src={avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                </div>
                <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>Chingiz Salikhov</h2>
                <p style={{ opacity: 0.7, marginBottom: '24px' }}>Full Stack Developer & AI Enthusiast</p>
                <p style={{ lineHeight: '1.6', opacity: 0.8 }}>
                    Crafting digital experiences that merge aesthetics with functionality.
                    Currently focused on building next-gen AI interfaces and immersive web applications.
                    Exploring the boundaries of what's possible on the web with React, Three.js, and modern AI tools.
                </p>
                <div style={{ marginTop: '30px', display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                    {techStack.map(tag => (
                        <span key={tag} style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '12px', fontSize: '13px' }}>{tag}</span>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div style={{
            display: 'flex',
            height: '100%',
            gap: '24px',
            color: 'white',
            position: 'relative'
        }}>
            {/* Left Sidebar */}
            <div style={{
                width: '280px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                borderRight: '1px solid rgba(255,255,255,0.1)',
                paddingRight: '24px',
                overflowY: 'auto'
            }}>
                <div style={{
                    width: '140px',
                    height: '140px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
                    border: '4px solid rgba(255,255,255,0.1)',
                    marginBottom: '24px',
                    position: 'relative',
                    flexShrink: 0
                }}>
                    <img src={avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h2 style={{
                    margin: 0,
                    fontSize: '32px',
                    background: 'linear-gradient(to right, #fff, #aaa)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '8px'
                }}>
                    Chingiz Salikhov
                </h2>
                <p style={{ margin: 0, opacity: 0.8, fontSize: '16px', fontWeight: 400, marginBottom: '24px' }}>
                    Full Stack Developer<br />
                    AI Enthusiast
                </p>

                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button
                        onClick={() => window.open('https://t.me/salikhov_dev', '_blank')}
                        style={{
                            width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)',
                            borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)',
                            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                            cursor: 'pointer', transition: 'background 0.2s', fontSize: '14px'
                        }}
                    >
                        <Send size={16} /> Contact Telegram
                    </button>
                    <button
                        onClick={() => window.location.href = 'mailto:salikhovchingiz@gmail.com'}
                        style={{
                            width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)',
                            borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)',
                            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                            cursor: 'pointer', transition: 'background 0.2s', fontSize: '14px'
                        }}
                    >
                        <Mail size={16} /> Send Email
                    </button>
                </div>
            </div>

            {/* Right Content Area */}
            <div style={{ flex: 1, paddingRight: '16px', overflowY: 'auto' }}>
                <div style={{
                    background: 'rgba(255,255,255,0.03)',
                    padding: '24px',
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    marginBottom: '24px',
                    lineHeight: '1.6',
                    fontSize: '15px'
                }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>Bio</h3>
                    <p style={{ opacity: 0.9, margin: 0 }}>
                        Crafting digital experiences that merge aesthetics with functionality.
                        Currently focused on building next-gen AI interfaces and immersive web applications.
                        Exploring the boundaries of what's possible on the web with React, Three.js, and modern AI tools.
                    </p>
                </div>

                <div>
                    <h3 style={{ fontSize: '18px', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>Tech Stack</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '8px' }}>
                        {techStack.map(tech => (
                            <span key={tech} style={{
                                padding: '8px 12px',
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: '8px',
                                fontSize: '13px',
                                border: '1px solid rgba(255,255,255,0.08)',
                                textAlign: 'center',
                                cursor: 'default',
                                transition: 'all 0.2s'
                            }}>
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const AboutContent = React.memo(AboutContentComponent);
