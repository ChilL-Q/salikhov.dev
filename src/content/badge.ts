import { groupVariants, type ResponsiveImage } from '../lib/responsive';

/** IOAI 2026 accreditation badge, front side only (no QR code, no sponsor logos), rounded corners kept. */
const files = import.meta.glob<string>('../assets/badge/badge-*.{avif,webp}', { eager: true, import: 'default', query: '?url' });

export const BADGE: ResponsiveImage = {
    ...groupVariants(files, () => 'badge').get('badge')!,
    width: 1200,
    height: 1698,
};
