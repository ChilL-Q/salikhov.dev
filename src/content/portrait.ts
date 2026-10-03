import { groupVariants, type ResponsiveImage } from '../lib/responsive';

/** Hero portrait (4:5, transparent background) in several widths. */
const files = import.meta.glob<string>('../assets/portrait/portrait-*.{avif,webp}', { eager: true, import: 'default', query: '?url' });

export const PORTRAIT: ResponsiveImage = {
    ...groupVariants(files, () => 'portrait').get('portrait')!,
    width: 1200,
    height: 1500,
};
