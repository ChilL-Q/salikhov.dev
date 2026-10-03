import { useRef } from 'react';
import { X } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';
import { CASES } from '../content/cases';
import { BADGE } from '../content/badge';
import { SectionHeader } from '../components/SectionHeader';
import { Picture } from '../components/Picture';

export function AboutSection() {
    const { d } = useI18n();
    const a = d.about;
    const dialog = useRef<HTMLDialogElement>(null);

    const stats = [
        { value: '4+', label: a.stats.years },
        { value: String(CASES.length), label: a.stats.cases },
        { value: String(CASES.filter(c => c.own).length), label: a.stats.products },
    ];

    return (
        <section id="about" aria-labelledby="about-title" className="mx-auto max-w-[1200px] px-5 py-28 lg:px-10 lg:py-40">
            <SectionHeader id="about-title" title={a.title} />

            <div className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-20">
                <div data-reveal>
                    {/* the main point of the section: business first, code second */}
                    <p className="font-display text-[clamp(1.5rem,1.1rem+1.1vw,2.125rem)] leading-snug tracking-[-0.02em] text-pretty text-ink">{a.thesis}</p>
                    <p className="mt-8 max-w-[58ch] text-[17px] leading-relaxed text-pretty text-ink-2">{a.bio}</p>

                    <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-tint/10 pt-7 sm:gap-8">
                        {stats.map(stat => (
                            // label first in the markup (dt before dd), value shown on top
                            <div key={stat.label} className="flex flex-col-reverse justify-end">
                                <dt className="mt-2 text-sm leading-snug text-ink-3">{stat.label}</dt>
                                <dd className="font-display text-[clamp(2.25rem,1.6rem+2vw,3.25rem)] leading-none tracking-[-0.04em] text-ink">{stat.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <figure data-reveal className="mx-auto w-full max-w-[300px] sm:max-w-[320px] lg:mt-2 lg:max-w-[340px]">
                    <button
                        type="button"
                        onClick={() => dialog.current?.showModal()}
                        aria-haspopup="dialog"
                        aria-label={a.badgeOpen}
                        className="block w-full cursor-zoom-in rounded-[24px] transition-transform duration-500 ease-out sm:-rotate-[3.5deg] sm:hover:-rotate-[1.5deg] sm:hover:scale-[1.02]"
                    >
                        <Picture
                            image={BADGE}
                            sizes="(min-width: 1024px) 340px, 320px"
                            alt={a.badgeAlt}
                            imgClassName="block h-auto w-full drop-shadow-[0_28px_36px_rgb(0_0_0/0.55)]"
                        />
                    </button>
                    <figcaption className="mt-7 text-sm leading-relaxed text-pretty text-ink-3">{a.badgeCaption}</figcaption>
                </figure>
            </div>

            {/* Native modal: Esc closes it, focus returns to the badge; a click on the backdrop closes too */}
            <dialog
                ref={dialog}
                aria-label={a.badgeAlt}
                onClick={e => e.target === e.currentTarget && dialog.current?.close()}
                className="m-auto overflow-visible bg-transparent p-0 backdrop:bg-bg/90"
            >
                <Picture
                    image={BADGE}
                    sizes="min(92vw, 560px)"
                    alt={a.badgeAlt}
                    imgClassName="block h-auto max-h-[86svh] w-auto max-w-[92vw]"
                />
                <button
                    type="button"
                    onClick={() => dialog.current?.close()}
                    aria-label={a.close}
                    className="absolute -top-4 -right-4 grid size-11 place-items-center rounded-full border border-tint/20 bg-raised text-ink transition-colors hover:border-tint/40 max-sm:top-2 max-sm:right-2"
                >
                    <X size={20} aria-hidden="true" />
                </button>
            </dialog>
        </section>
    );
}
