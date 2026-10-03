import { Fragment } from 'react';
import { useI18n } from '../i18n/useI18n';
import { SERVICES } from '../content/services';
import { pathFor } from '../routes';
import { SectionHeader } from '../components/SectionHeader';
import { CtaBanner } from '../components/CtaBanner';

export function ServicesSection() {
    const { d, lang } = useI18n();
    const s = d.services;

    return (
        <section id="services" aria-labelledby="services-title" className="mx-auto max-w-[1200px] px-5 py-28 lg:px-10 lg:py-40">
            <SectionHeader id="services-title" title={s.title} intro={s.intro} />

            <ul className="mt-14 border-b border-tint/10 lg:mt-20">
                {SERVICES.map(service => {
                    const item = s.items[service.id];
                    return (
                        <li key={service.id} data-reveal className="grid gap-4 border-t border-tint/10 py-10 lg:grid-cols-12 lg:gap-12 lg:py-12">
                            <h3 className="font-display text-[clamp(1.5rem,1.15rem+1vw,2rem)] leading-tight tracking-[-0.025em] lg:col-span-5">{item.title}</h3>
                            <div className="lg:col-span-7">
                                <p className="text-[17px] leading-relaxed text-pretty text-ink">{item.benefit}</p>
                                <ul className="mt-4 space-y-1.5 text-[15px] leading-relaxed text-ink-2">
                                    {item.includes.map(line => (
                                        <li key={line}>{line}</li>
                                    ))}
                                </ul>
                                <p className="mt-5 text-[15px] text-ink-3">
                                    {s.examples}:{' '}
                                    {service.cases.map((slug, i) => (
                                        <Fragment key={slug}>
                                            {i > 0 && ', '}
                                            <a href={pathFor({ page: 'case', lang, slug })} className="link">
                                                {d.cases[slug].title}
                                            </a>
                                        </Fragment>
                                    ))}
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ul>

            <CtaBanner title={s.unsureTitle} text={s.unsureText} button={s.unsureButton} className="mt-16 lg:mt-24" />
        </section>
    );
}
