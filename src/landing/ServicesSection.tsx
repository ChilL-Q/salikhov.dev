import type { CSSProperties } from 'react';
import { useI18n } from '../i18n/useI18n';
import { SERVICES } from '../content/services';
import { pathFor } from '../routes';
import { SectionHeader } from '../components/SectionHeader';
import { CtaBanner } from '../components/CtaBanner';

export function ServicesSection() {
    const { d, lang } = useI18n();
    const s = d.services;

    return (
        <section id="services" aria-labelledby="services-title" className="mx-auto max-w-[1200px] px-5 py-24 lg:px-10 lg:py-32">
            <SectionHeader id="services-title" index="02" label={s.label} title={s.title} intro={s.intro} />

            <ol className="mt-12 border-b border-tint/10 lg:mt-16">
                {SERVICES.map((service, i) => {
                    const item = s.items[service.id];
                    return (
                        <li
                            key={service.id}
                            data-reveal
                            style={{ '--reveal-delay': '40ms' } as CSSProperties}
                            className="grid gap-5 border-t border-tint/10 py-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12 lg:py-11"
                        >
                            <div className="flex items-baseline gap-4">
                                <span className="font-mono text-sm text-accent" aria-hidden="true">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <h3 className="font-display text-[clamp(1.625rem,1.2rem+1.3vw,2.375rem)] leading-[1.08] font-bold tracking-[-0.03em] text-balance">
                                    {item.title}
                                </h3>
                            </div>

                            <div>
                                <p className="text-[17px] leading-relaxed text-pretty text-ink">{item.benefit}</p>
                                <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                                    {item.includes.map(line => (
                                        <li key={line} className="flex gap-2.5 text-[15px] leading-snug text-ink-2">
                                            <span className="font-mono text-accent" aria-hidden="true">
                                                →
                                            </span>
                                            {line}
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-6 flex flex-wrap items-center gap-2 font-mono text-xs text-ink-3">
                                    <span className="mr-1">{s.inPractice}:</span>
                                    {service.cases.map(slug => (
                                        <a
                                            key={slug}
                                            href={pathFor({ page: 'case', lang, slug })}
                                            className="rounded-full border border-tint/15 px-3 py-1.5 text-ink-2 transition-colors hover:border-accent/50 hover:text-accent-light"
                                        >
                                            {d.cases[slug].title}
                                        </a>
                                    ))}
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ol>

            <CtaBanner title={s.unsureTitle} text={s.unsureText} button={s.unsureButton} className="mt-12 lg:mt-16" />
        </section>
    );
}
