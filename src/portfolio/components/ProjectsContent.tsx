import React, { useMemo } from 'react';
import { ExternalLink, Globe, Monitor, PenTool } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface Project {
    title: string;
    description: string;
    tags: string[];
    link: string;
    gradient: string;
    icon: React.ReactNode;
}

interface ProjectsContentProps {
    isMobile?: boolean;
}

const ProjectsContentComponent: React.FC<ProjectsContentProps> = ({ isMobile }) => {
    const { t } = useLanguage();

    const projects: Project[] = useMemo(() => [
        {
            title: t('projects.items.alanya.title'),
            description: t('projects.items.alanya.desc'),
            tags: ['React', 'Next.js', 'PostgreSQL'],
            link: 'https://alanyaholidays.com',
            gradient: 'linear-gradient(135deg, #2dd4bf, #0ea5e9)',
            icon: <Globe size={24} />
        },
        {
            title: t('projects.items.iffa.title'),
            description: t('projects.items.iffa.desc'),
            tags: ['TypeScript', 'Cloud', 'Node.js'],
            link: 'https://iffatech.com',
            gradient: 'linear-gradient(135deg, #818cf8, #6366f1)',
            icon: <Monitor size={24} />
        },
        {
            title: t('projects.items.kassimova.title'),
            description: t('projects.items.kassimova.desc'),
            tags: ['UI/UX', 'Branding', 'Photography'],
            link: 'https://kassimova.design',
            gradient: 'linear-gradient(135deg, #fb7185, #f43f5e)',
            icon: <PenTool size={24} />
        }
    ], [t]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '16px' : '20px' }}>
            {projects.map((project, index) => (
                <div
                    key={index}
                    onClick={() => window.open(project.link, '_blank')}
                    style={{
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: '16px',
                        border: '1px solid rgba(255,255,255,0.05)',
                        padding: isMobile ? '16px' : '20px',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, background 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '12px',
                        background: project.gradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                    }}>
                        {project.icon}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <h3 style={{ margin: 0, fontSize: '18px', color: 'white' }}>{project.title}</h3>
                            <ExternalLink size={14} style={{ opacity: 0.5 }} />
                        </div>
                        <p style={{ margin: 0, fontSize: '14px', opacity: 0.7, marginBottom: '12px', lineHeight: '1.4' }}>
                            {project.description}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {project.tags.map(tag => (
                                <span key={tag} style={{
                                    fontSize: '11px',
                                    padding: '2px 8px',
                                    background: 'rgba(255,255,255,0.05)',
                                    borderRadius: '4px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'rgba(255,255,255,0.8)'
                                }}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export const ProjectsContent = React.memo(ProjectsContentComponent);
