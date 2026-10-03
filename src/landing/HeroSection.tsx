import type { CSSProperties } from 'react';
import { useI18n } from '../i18n/useI18n';
import { DottedSurface } from '../components/DottedSurface';
import { PORTRAIT } from '../content/portrait';
import { CONTACTS } from '../site';

/**
 * Rendered portrait width, mirroring the classes below: on desktop 4:5 at min(72svh, 760px) tall,
 * on phones --portrait-w.
 */
const PORTRAIT_SIZES = '(min-width: 1024px) min(58vh, 608px), min(88vw, 400px, 44vh)';

/** stagger for the CSS entrance (.rise in index.css) */
const delay = (seconds: number) => ({ '--delay': `${seconds}s` }) as CSSProperties;

/** Name, one line on what I do for a business, one way to reach me. */
export function HeroSection() {
    const { d } = useI18n();

    return (
        <section
            id="top"
            className="relative overflow-hidden px-5 pt-[72px] pb-16 [--portrait-w:min(88vw,400px,44svh)] lg:flex lg:min-h-svh lg:px-10 lg:pt-22 lg:pb-0"
        >
            {/* Layers: dot wave (back) → portrait → copy (front); the wave is dimmed under the copy */}
            <DottedSurface className="[mask-image:linear-gradient(180deg,#000_42%,rgb(0_0_0/0.2)_58%)] lg:[mask-image:linear-gradient(90deg,rgb(0_0_0/0.14)_0%,rgb(0_0_0/0.14)_42%,#000_66%)]" />

            <div className="relative mx-auto flex w-full max-w-[1120px] flex-col items-center lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-stretch lg:gap-x-[clamp(32px,5vw,80px)]">
                {/* Phones: the copy rides up over the portrait's dissolving lower edge.
                    Desktop: copy on the left, the name level with the head. */}
                <div className="relative z-[2] -mt-[calc(var(--portrait-w)*0.3)] flex flex-col items-center text-center lg:mt-0 lg:items-start lg:self-center lg:pb-20 lg:text-left">
                    {/* no entrance on the name and the portrait: they're the LCP candidates */}
                    <h1 className="font-display text-[clamp(3rem,1.2rem+5.2vw,6.5rem)] leading-[0.98] tracking-[-0.045em] text-balance">{d.hero.name}</h1>

                    <p className="rise mt-6 max-w-[34ch] text-[clamp(1.125rem,0.95rem+0.6vw,1.5rem)] leading-snug text-pretty text-ink-2 lg:mt-8" style={delay(0.15)}>
                        {d.hero.lead}
                    </p>

                    <div className="rise mt-9 lg:mt-11" style={delay(0.3)}>
                        <a href={CONTACTS.telegram} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            {d.hero.cta}
                        </a>
                    </div>
                </div>

                <div className="settle relative z-[1] order-first aspect-[4/5] w-(--portrait-w) lg:order-none lg:h-[min(72svh,760px)] lg:w-auto lg:self-end lg:justify-self-end">
                    <picture>
                        <source type="image/avif" srcSet={PORTRAIT.avif} sizes={PORTRAIT_SIZES} />
                        <img
                            src={PORTRAIT.fallback}
                            srcSet={PORTRAIT.webp}
                            sizes={PORTRAIT_SIZES}
                            alt={d.hero.name}
                            width={PORTRAIT.width}
                            height={PORTRAIT.height}
                            fetchPriority="high"
                            draggable={false}
                            className="block h-full w-full select-none"
                        />
                    </picture>
                </div>
            </div>
        </section>
    );
}
