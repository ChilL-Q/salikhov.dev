import React, { useMemo } from 'react';
import { Send, Mail, Instagram, MessageCircle } from 'lucide-react';

interface ContactContentProps {
    isMobile?: boolean;
}

const ContactContentComponent: React.FC<ContactContentProps> = ({ isMobile }) => {
    const contactMethods = useMemo(() => [
        {
            name: 'Telegram',
            value: '@salikhov_dev',
            link: 'https://t.me/salikhov_dev',
            icon: <Send size={isMobile ? 24 : 28} strokeWidth={1.5} color="white" />,
            gradient: 'linear-gradient(135deg, #24A1DE, #33BEF0)',
            bgAlpha: 'rgba(36, 161, 222, 0.1)',
            borderAlpha: 'rgba(36, 161, 222, 0.2)'
        },
        {
            name: 'WhatsApp',
            value: '+7 701 981 37 21',
            link: 'https://wa.me/77019813721',
            icon: <MessageCircle size={isMobile ? 24 : 28} strokeWidth={1.5} color="white" />,
            gradient: 'linear-gradient(135deg, #25D366, #40E0D0)',
            bgAlpha: 'rgba(37, 211, 102, 0.1)',
            borderAlpha: 'rgba(37, 211, 102, 0.2)'
        },
        {
            name: 'Instagram',
            value: '@salikhov.dev',
            link: 'https://instagram.com/salikhov.dev',
            icon: <Instagram size={isMobile ? 24 : 28} strokeWidth={1.5} color="white" />,
            gradient: 'linear-gradient(45deg, #F58529, #DD2A7B, #8134AF)',
            bgAlpha: 'rgba(221, 42, 123, 0.1)',
            borderAlpha: 'rgba(221, 42, 123, 0.2)'
        },
        {
            name: 'Email',
            value: 'salikhovchingiz@gmail.com',
            link: 'mailto:salikhovchingiz@gmail.com',
            icon: <Mail size={isMobile ? 24 : 28} strokeWidth={1.5} color="white" />,
            gradient: 'linear-gradient(135deg, #5AC8FA, #007AFF)',
            bgAlpha: 'rgba(0, 122, 255, 0.1)',
            borderAlpha: 'rgba(0, 122, 255, 0.2)'
        }
    ], [isMobile]);

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: isMobile ? '12px' : '16px',
            padding: isMobile ? '0' : '8px'
        }}>
            {contactMethods.map((method) => (
                <a
                    key={method.name}
                    href={method.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '16px',
                        background: method.bgAlpha,
                        borderRadius: '20px',
                        border: `1px solid ${method.borderAlpha}`,
                        color: 'white',
                        textDecoration: 'none',
                        transition: 'all 0.2s',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.background = method.bgAlpha.replace('0.1', '0.15');
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.background = method.bgAlpha;
                    }}
                >
                    <div style={{
                        background: method.gradient,
                        width: isMobile ? '48px' : '56px',
                        height: isMobile ? '48px' : '56px',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                    }}>
                        {method.icon}
                    </div>
                    <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: isMobile ? '12px' : '13px', opacity: 0.7, marginBottom: '2px' }}>{method.name}</div>
                        <div style={{
                            fontSize: isMobile ? '14px' : '15px',
                            fontWeight: 600,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}>
                            {method.value}
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
};

export const ContactContent = React.memo(ContactContentComponent);
