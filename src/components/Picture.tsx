import type { ResponsiveImage } from '../lib/responsive';

interface PictureProps {
    image: ResponsiveImage;
    /** rendered width, for the browser to pick a srcset candidate */
    sizes: string;
    alt: string;
    className?: string;
    imgClassName?: string;
    /** above-the-fold images: eager + high priority (LCP) */
    priority?: boolean;
}

/** AVIF with a WebP fallback, in several widths. */
export function Picture({ image, sizes, alt, className, imgClassName, priority }: PictureProps) {
    return (
        <picture className={className}>
            <source type="image/avif" srcSet={image.avif} sizes={sizes} />
            <img
                src={image.fallback}
                srcSet={image.webp}
                sizes={sizes}
                alt={alt}
                width={image.width}
                height={image.height}
                loading={priority ? 'eager' : 'lazy'}
                fetchPriority={priority ? 'high' : undefined}
                decoding="async"
                draggable={false}
                className={imgClassName}
            />
        </picture>
    );
}
