import type { CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';
import { CASES, type CaseData } from '../content/cases';
import { pathFor } from '../routes';
import { SectionHeader } from '../components/SectionHeader';
import { CaseStage } from '../components/work/CaseStage';

// rendered widths (see CaseStage: browser 80cqw, phone 23cqw / 27cqw of the card or the visual column)
const CARD_SIZES = { browser: '(min-width: 1024px) 440px, 80vw', phone: '(min-width: 1024px) 150px, 27vw' };
const FEATURED_SIZES = { browser: '(min-width: 1024px) 520px, 80vw', phone: '(min-width: 1024px) 170px, 27vw' };

export function WorkSection() {
    const { d } = useI18n();

    return (
        <section id="work" aria-labelledby="work-title" className="mx-auto max-w-[1200px] px-5 py-24 lg:px-10 lg:py-32">
            <SectionHeader id="work-title" index="01" label={d.work.label} title={d.work.title} intro={d.work.intro} />
            <ul className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-2 lg:gap-6">
                {CASES.map((data, i) => (
                    <li key={data.slug} data-reveal className={i === 0 ? 'lg:col-span-2' : ''} style={{ '--reveal-delay': `${(i % 2) * 80}ms` } as CSSProperties}>
                        <CaseCard data={data} featured={i === 0} />
                    </li>
                ))}
            </ul>
        </section>
    );
}

function CaseCard({ data, featured }: { data: CaseData; featured: boolean }) {
    const { d, lang } = useI18n();
    const t = d.cases[data.slug];

    return (
        <a
            href={pathFor({ page: 'case', lang, slug: data.slug })}
            className={`group grid h-full overflow-hidden rounded-[28px] border border-tint/10 bg-raised transition-colors duration-300 hover:border-accent/45 ${
                featured ? 'lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]' : 'grid-rows-[auto_1fr]'
            }`}
        >
            <CaseStage stage={data.stage} sizes={featured ? FEATURED_SIZES : CARD_SIZES} className={featured ? 'lg:order-2 lg:h-full lg:aspect-auto lg:min-h-[420px]' : ''} />

            <div className={`flex flex-col p-6 sm:p-7 ${featured ? 'lg:justify-center lg:p-12' : ''}`}>
                {data.pilot && (
                    <p className="mb-5 inline-flex items-center gap-2.5 self-start rounded-full border border-accent/35 bg-accent/10 px-3 py-1.5 font-mono text-xs text-accent-light">
                        <span className="status-dot" aria-hidden="true" />
                        {t.status}
                    </p>
                )}
                <p className="font-mono text-xs text-ink-3">{t.type}</p>
                <h3 className={`mt-2 font-display leading-[1.05] font-bold tracking-[-0.03em] ${featured ? 'text-[clamp(2rem,1.2rem+2.4vw,3.25rem)]' : 'text-[26px]'}`}>
                    {t.title}
                </h3>
                <p className={`mt-3 leading-relaxed text-pretty text-ink-2 ${featured ? 'max-w-[44ch] text-[17px]' : 'text-[15.5px]'}`}>{featured ? t.summary : t.teaser}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5 font-mono text-xs text-ink-3">
                    {t.tags.map(tag => (
                        <li key={tag} className="rounded-full border border-tint/12 px-2.5 py-1">
                            {tag}
                        </li>
                    ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-ink transition-colors group-hover:text-accent-light">
                    {d.work.readCase}
                    <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
            </div>
        </a>
    );
}
