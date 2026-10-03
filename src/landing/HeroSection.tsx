import { useEffect, useState, type CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
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

export function HeroSection() {
    const { d, lang } = useI18n();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <section
            id="top"
            className="relative overflow-hidden px-5 pt-[72px] pb-14 [--portrait-w:min(88vw,400px,44svh)] lg:flex lg:min-h-svh lg:px-10 lg:pt-22 lg:pb-0"
        >
            {/* Layers: dot wave (back) → portrait → copy (front). The wave is dimmed under the copy so
                the dots don't flicker between the letters: the lower part on phones, the left column on desktop. */}
            <DottedSurface className="[mask-image:linear-gradient(180deg,#000_42%,rgb(0_0_0/0.3)_58%)] lg:[mask-image:linear-gradient(90deg,rgb(0_0_0/0.3)_0%,rgb(0_0_0/0.3)_40%,#000_62%)]" />

            <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-stretch lg:gap-x-[clamp(32px,5vw,80px)]">
                {/* Phones: the copy rides up over the portrait's dissolving lower edge.
                    Desktop: copy on the left, head level with the headline. */}
                <div className="relative z-[2] -mt-[calc(var(--portrait-w)*0.36)] flex flex-col items-center text-center lg:mt-0 lg:items-start lg:self-center lg:pb-16 lg:text-left">
                    <p
                        className="rise inline-flex items-center gap-2.5 rounded-full border border-tint/15 bg-bg/70 px-3.5 py-1.5 font-mono text-[11px] whitespace-nowrap text-ink-2 min-[400px]:text-xs sm:text-[13px]"
                        style={delay(0.1)}
                    >
                        <span className="status-dot" aria-hidden="true" />
                        {d.hero.status}
                    </p>

                    {/* no entrance on the headline and the portrait: they're the LCP candidates, and an
                        element that starts at opacity 0 delays (or drops out of) the LCP measurement */}
                    <h1
                        className={`mt-4 font-display leading-[0.98] font-bold tracking-[-0.04em] text-balance lg:mt-7 ${
                            lang === 'ru'
                                ? 'max-w-[16ch] text-[clamp(2.25rem,0.8rem+3.6vw,4.5rem)]'
                                : 'max-w-[13ch] text-[clamp(2.75rem,0.9rem+4.6vw,5.75rem)]'
                        }`}
                    >
                        {d.hero.titleLead} <span className="gradient-text-accent block">{d.hero.titleAccent}</span>
                    </h1>

                    <p
                        className="rise mt-4 font-display text-[clamp(1.25rem,0.95rem+0.8vw,1.75rem)] leading-tight font-semibold tracking-[-0.02em] lg:mt-7"
                        style={delay(0.3)}
                    >
                        {d.hero.name}
                        {/* the role joins the name line only where the column is wide enough not to break "AI-разработчик" */}
                        <span className="hidden font-normal text-ink-3 xl:inline"> — </span>
                        <span className="block text-base font-normal tracking-normal text-ink-3 xl:inline xl:text-[length:inherit] xl:tracking-[inherit]">{d.hero.role}</span>
                    </p>

                    <p className="rise mt-2 max-w-[44ch] text-[clamp(1rem,0.9rem+0.35vw,1.1875rem)] leading-relaxed text-pretty text-ink-2" style={delay(0.35)}>
                        {d.hero.lead}
                    </p>

                    <div className="rise mt-6 flex flex-wrap justify-center gap-3 lg:mt-9 lg:justify-start" style={delay(0.45)}>
                        <a href={CONTACTS.telegram} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            {d.hero.cta}
                            <ArrowUpRight size={18} aria-hidden="true" />
                        </a>
                        <a href="#work" className="btn btn-ghost">
                            {d.hero.ctaSecondary}
                        </a>
                    </div>

                    <a
                        href="#about"
                        className="rise mt-7 font-mono text-xs text-ink-3 transition-colors hover:text-ink lg:mt-9"
                        style={delay(0.55)}
                    >
                        <span className="text-accent" aria-hidden="true">◆ </span>
                        {d.hero.trust}
                    </a>
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

            {/* desktop with room to spare only */}
            <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-x-0 bottom-8 z-[2] hidden flex-col items-center gap-2 text-[11px] tracking-[1px] text-ink-3 uppercase transition-opacity duration-300 [@media(min-height:800px)]:lg:flex ${scrolled ? 'opacity-0' : 'opacity-80'}`}
            >
                <div className="relative h-10 w-6 animate-[scroll-bob_1.8s_ease-in-out_infinite] rounded-xl border-[1.5px] border-ink-3">
                    <div className="absolute top-1.5 left-1/2 -ml-[1.5px] h-1.5 w-[3px] animate-[scroll-wheel_1.8s_ease-in-out_infinite] rounded-sm bg-ink-3" />
                </div>
                {d.hero.scroll}
            </div>
        </section>
    );
}
