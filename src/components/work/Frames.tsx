import type { CSSProperties } from 'react';
import { Picture } from '../Picture';
import { useI18n } from '../../i18n/useI18n';
import type { ResponsiveImage } from '../../lib/responsive';

interface FrameProps {
    image: ResponsiveImage;
    sizes: string;
    /** frame width as a container-relative length (e.g. "80cqw"); every detail scales from it */
    w: string;
    alt?: string;
    className?: string;
    priority?: boolean;
}

const scaled = (w: string, style: CSSProperties = {}) => ({ '--w': w, width: 'var(--w)', ...style }) as CSSProperties;

/** Dark browser window with the site's address in the bar. */
export function BrowserFrame({ url, image, sizes, w, alt = '', className = '', priority }: FrameProps & { url: string }) {
    return (
        <div
            className={`overflow-hidden bg-[#0b0806] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.75)] ring-1 ring-tint/10 ${className}`}
            style={scaled(w, { borderRadius: 'calc(var(--w) * 0.016)' })}
        >
            <div
                aria-hidden="true"
                className="flex items-center border-b border-tint/[0.06] bg-[#120d09]"
                style={{ height: 'calc(var(--w) * 0.042)', gap: 'calc(var(--w) * 0.009)', paddingInline: 'calc(var(--w) * 0.017)' }}
            >
                {[0, 1, 2].map(i => (
                    <span key={i} className="shrink-0 rounded-full bg-tint/20" style={{ width: 'calc(var(--w) * 0.011)', height: 'calc(var(--w) * 0.011)' }} />
                ))}
                <span
                    className="truncate rounded-[4px] bg-tint/[0.07] font-mono text-ink-3"
                    style={{ marginLeft: 'calc(var(--w) * 0.016)', paddingInline: 'calc(var(--w) * 0.014)', fontSize: 'max(7px, calc(var(--w) * 0.017))', lineHeight: 'calc(var(--w) * 0.029)' }}
                >
                    {url}
                </span>
            </div>
            <Picture image={image} sizes={sizes} alt={alt} priority={priority} imgClassName="block h-auto w-full" />
        </div>
    );
}

/** Phone with a thin dark bezel; the screenshot is cropped to the first screen. */
export function PhoneFrame({ image, sizes, w, alt = '', className = '', priority }: FrameProps) {
    return (
        <div
            className={`aspect-[390/844] bg-[#0b0806] shadow-[0_30px_50px_-16px_rgb(0_0_0/0.8)] ring-1 ring-tint/[0.14] ${className}`}
            style={scaled(w, { borderRadius: 'calc(var(--w) * 0.15)', padding: 'calc(var(--w) * 0.025)' })}
        >
            {/* screen radius = outer radius minus the bezel */}
            <div className="h-full overflow-hidden" style={{ borderRadius: 'calc(var(--w) * 0.125)' }}>
                <Picture image={image} sizes={sizes} alt={alt} priority={priority} className="block h-full" imgClassName="h-full w-full object-cover object-top" />
            </div>
        </div>
    );
}

/** Marks a screen with made-up numbers. */
export function DemoBadge({ className = '' }: { className?: string }) {
    const { d } = useI18n();
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full border border-tint/15 bg-bg/85 px-2.5 py-1 font-mono text-[11px] leading-none text-ink-2 ${className}`}>
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            {d.work.demoData}
        </span>
    );
}
