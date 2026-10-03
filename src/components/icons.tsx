import type { SVGProps } from 'react';

/**
 * Contact icons: line style to match the rest of the UI (24-unit grid, 1.75 stroke, currentColor).
 * Brand icons were dropped from lucide, so they live here.
 */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 20, children, ...props }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
            {...props}
        >
            {children}
        </svg>
    );
}

export const TelegramIcon = (props: IconProps) => (
    <Svg {...props}>
        <path d="M21.2 4.2 2.9 11.3c-.9.4-.9 1.6 0 1.9l4.6 1.6 1.7 5.4c.3.8 1.3 1 1.9.4l2.6-2.5 4.8 3.5c.7.5 1.7.1 1.9-.7L23 5.6c.2-1-.8-1.8-1.8-1.4Z" />
        <path d="m7.6 14.8 10-6.3-7.4 7.3" />
    </Svg>
);

export const WhatsAppIcon = (props: IconProps) => (
    <Svg {...props}>
        <path d="M3.5 20.5 4.7 16A8.6 8.6 0 1 1 8 19.3Z" />
        <path d="M9.2 8.3c.2-.4.6-.5.9-.3l1 .9c.3.3.3.7.1 1l-.5.7a5.6 5.6 0 0 0 2.7 2.7l.7-.5c.3-.2.7-.2 1 .1l.9 1c.2.3.1.7-.3.9-1 .6-2.2.7-3.2.2a8.2 8.2 0 0 1-3.6-3.6c-.5-1-.4-2.2.3-3.1Z" />
    </Svg>
);

export const InstagramIcon = (props: IconProps) => (
    <Svg {...props}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
    </Svg>
);

export const GitHubIcon = (props: IconProps) => (
    <Svg {...props}>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </Svg>
);

export const MailIcon = (props: IconProps) => (
    <Svg {...props}>
        <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
        <path d="m3 7 7.9 5.5a2 2 0 0 0 2.2 0L21 7" />
    </Svg>
);
