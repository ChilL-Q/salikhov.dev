import manifest from '../assets/work/manifest.json';
import { groupVariants, type ResponsiveImage } from '../lib/responsive';

/**
 * Case-study screenshots: src/assets/work/<case>/<name>-<width>.{avif,webp}, sizes in manifest.json.
 * Captured from the live sites; menus are cropped so no guest Wi-Fi password is ever shown.
 */
export type WorkImageKey = keyof typeof manifest;

const files = import.meta.glob<string>('../assets/work/*/*.{avif,webp}', { eager: true, import: 'default', query: '?url' });
const variants = groupVariants(files, path => path.match(/\/work\/([^/]+\/.+)-\d+\.\w+$/)?.[1] ?? null);

export function workImage(key: WorkImageKey): ResponsiveImage {
    const [width, height] = manifest[key];
    return { ...variants.get(key)!, width, height };
}
