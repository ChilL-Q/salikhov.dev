/** Hero portrait (4:5, transparent background) in several widths, AVIF with a WebP fallback. */
const files = import.meta.glob<string>('../assets/portrait/portrait-*.{avif,webp}', { eager: true, import: 'default', query: '?url' });

function srcSet(ext: 'avif' | 'webp'): string {
    return Object.entries(files)
        .map(([path, url]) => ({ url, w: Number(path.match(/portrait-(\d+)\./)?.[1]), ext: path.split('.').pop() }))
        .filter(f => f.ext === ext)
        .sort((a, b) => a.w - b.w)
        .map(f => `${f.url} ${f.w}w`)
        .join(', ');
}

export const PORTRAIT = {
    width: 1200,
    height: 1500,
    avif: srcSet('avif'),
    webp: srcSet('webp'),
    /** largest WebP, for browsers without srcset support */
    fallback: files['../assets/portrait/portrait-1200.webp'],
};
