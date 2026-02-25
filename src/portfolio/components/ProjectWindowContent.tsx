import React from 'react';
import { ExternalLink } from 'lucide-react';

interface ProjectWindowContentProps {
    title: string;
    description: string;
    technologies: string[];
    link: string;
    gradient: string;
    icon: React.ReactNode;
}

const ProjectWindowContentComponent: React.FC<ProjectWindowContentProps> = ({
    title,
    description,
    technologies,
    link,
    gradient,
    icon
}) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            color: 'white',
        }}>
            {/* Content Section */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            {/* Glassy Icon Container */}
                            <div style={{
                                background: gradient,
                                borderRadius: '16px',
                                padding: '16px',
                                boxShadow: '0 8px 16px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <div style={{ color: 'white', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))', display: 'flex' }}>
                                    {icon}
                                </div>
                            </div>

                            <h2 style={{
                                fontSize: '32px',
                                fontWeight: '700',
                                margin: 0,
                                background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.8) 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                letterSpacing: '-0.5px'
                            }}>
                                {title}
                            </h2>
                        </div>

                        <button
                            onClick={() => window.open(link, '_blank')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 20px',
                                background: '#007AFF', // classic macOS blue
                                color: 'white',
                                border: 'none',
                                borderRadius: '20px', // slightly pill-shaped
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(0, 122, 255, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                                transition: 'all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 122, 255, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 122, 255, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)';
                            }}
                        >
                            Visit Site <ExternalLink size={16} />
                        </button>
                    </div>

                    <p style={{
                        opacity: 0.85,
                        lineHeight: '1.6',
                        fontSize: '16px',
                        marginBottom: '16px',
                        color: '#E0E0E0'
                    }}>
                        {description}
                    </p>

                    <div style={{ marginTop: '0' }}>
                        <div style={{
                            fontSize: '12px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            opacity: 0.5,
                            fontWeight: 600,
                            marginBottom: '12px'
                        }}>
                            Technologies & Tools
                        </div>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {technologies.map(tech => (
                                <span key={tech} style={{
                                    padding: '6px 14px',
                                    background: 'rgba(255,255,255,0.06)',
                                    backdropFilter: 'blur(20px)',
                                    borderRadius: '8px',
                                    fontSize: '13px',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    color: 'rgba(255,255,255,0.9)',
                                    fontWeight: 500,
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                }}>
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export const ProjectWindowContent = React.memo(ProjectWindowContentComponent);
