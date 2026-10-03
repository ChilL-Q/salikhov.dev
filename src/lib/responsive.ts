/** An image prepared in several widths, AVIF with a WebP fallback (see components/Picture). */
export interface ResponsiveImage {
    avif: string;
    webp: string;
    /** largest WebP, for browsers without srcset */
    fallback: string;
    width: number;
    height: number;
}

/**
 * Groups `<name>-<width>.<avif|webp>` URLs (from import.meta.glob) by the name that `nameOf`
 * extracts from each path, and builds the srcset strings.
 */
export function groupVariants(files: Record<string, string>, nameOf: (path: string) => string | null): Map<string, Omit<ResponsiveImage, 'width' | 'height'>> {
    const groups = new Map<string, { avif: [number, string][]; webp: [number, string][] }>();
    for (const [path, url] of Object.entries(files)) {
        const name = nameOf(path);
        const match = path.match(/-(\d+)\.(avif|webp)$/);
        if (!name || !match) continue;
        const group = groups.get(name) ?? { avif: [], webp: [] };
        group[match[2] as 'avif' | 'webp'].push([Number(match[1]), url]);
        groups.set(name, group);
    }

    const srcSet = (variants: [number, string][]) =>
        variants
            .sort((a, b) => a[0] - b[0])
            .map(([w, url]) => `${url} ${w}w`)
            .join(', ');

    return new Map(
        [...groups].map(([name, { avif, webp }]) => [
            name,
            { avif: srcSet(avif), webp: srcSet(webp), fallback: webp.sort((a, b) => b[0] - a[0])[0]?.[1] ?? '' },
        ]),
    );
}
