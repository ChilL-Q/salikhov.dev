import React from 'react';
import { Shield } from 'lucide-react';

interface PrivacyPolicyContentProps {
    isMobile?: boolean;
}

const PrivacyPolicyContentComponent: React.FC<PrivacyPolicyContentProps> = ({ isMobile }) => {
    return (
        <div style={{
            padding: isMobile ? '0' : '20px',
            color: 'white',
            lineHeight: 1.6,
            height: '100%',
            overflowY: 'auto'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
                <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #64748B, #475569)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Shield size={24} color="white" />
                </div>
                <div>
                    <h2 style={{ margin: 0, fontSize: isMobile ? '20px' : '24px', fontWeight: 600 }}>Privacy Policy</h2>
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Last updated: February 2026</span>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: isMobile ? '14px' : '15px', color: 'rgba(255,255,255,0.8)' }}>
                <section>
                    <h3 style={{ color: 'white', fontSize: '16px', marginBottom: '8px', fontWeight: 600 }}>1. Data Collection</h3>
                    <p style={{ margin: 0 }}>
                        This is a personal portfolio website. We do not use persistent tracking cookies, Google Analytics, or invasive ad trackers.
                        The only data collected is what you voluntarily provide through the Contact form (Name, Email, Message).
                    </p>
                </section>

                <section>
                    <h3 style={{ color: 'white', fontSize: '16px', marginBottom: '8px', fontWeight: 600 }}>2. How We Use Your Data</h3>
                    <p style={{ margin: 0 }}>
                        Any information submitted via the Contact form is securely transmitted and used exclusively for the purpose of communicating with you regarding your inquiry.
                        We do not sell, rent, or share your personal information with any third parties.
                    </p>
                </section>

                <section>
                    <h3 style={{ color: 'white', fontSize: '16px', marginBottom: '8px', fontWeight: 600 }}>3. Local Storage & Preferences</h3>
                    <p style={{ margin: 0 }}>
                        We may use standard browser technologies like <code>localStorage</code> or <code>sessionStorage</code> solely to remember your UI preferences
                        (such as window positions or theme settings) during your visit to provide a seamless "desktop-like" experience.
                        This data remains on your device and is not sent to any external servers.
                    </p>
                </section>

                <section>
                    <h3 style={{ color: 'white', fontSize: '16px', marginBottom: '8px', fontWeight: 600 }}>4. Your Rights</h3>
                    <p style={{ margin: 0 }}>
                        You have the right to request the deletion of any correspondence you have sent through this website.
                        To do so, please contact us directly using the provided email address in the Contact section.
                    </p>
                </section>
            </div>
        </div>
    );
};

export const PrivacyPolicyContent = React.memo(PrivacyPolicyContentComponent);
