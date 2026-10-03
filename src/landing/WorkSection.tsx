import { ArrowRight } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';
import { CASES, type CaseData } from '../content/cases';
import { pathFor } from '../routes';
import { SectionHeader } from '../components/SectionHeader';
import { CaseStage } from '../components/work/CaseStage';
import { CaseStatus } from '../components/work/CaseStatus';

// rendered widths: the visual takes 7 of 12 columns on desktop, the full column (100vw − 40px) on phones;
// inside it the browser is 80cqw and a phone 23–27cqw
const STAGE_SIZES = { browser: '(min-width: 1024px) 520px, calc(80vw - 32px)', phone: '(min-width: 1024px) 170px, calc(27vw - 11px)' };

export function WorkSection() {
    const { d } = useI18n();

    return (
        <section id="work" aria-labelledby="work-title" className="mx-auto max-w-[1200px] px-5 py-28 lg:px-10 lg:py-40">
            <SectionHeader id="work-title" title={d.work.title} intro={d.work.intro} />
            <ol className="mt-16 space-y-20 lg:mt-24 lg:space-y-32">
                {CASES.map((data, i) => (
                    <li key={data.slug} data-reveal>
                        <CaseRow data={data} flip={i % 2 === 1} />
                    </li>
                ))}
            </ol>
        </section>
    );
}

/** One case: a large visual and a few lines of text, sides alternating on desktop. */
function CaseRow({ data, flip }: { data: CaseData; flip: boolean }) {
    const { d, lang } = useI18n();
    const t = d.cases[data.slug];
    const href = pathFor({ page: 'case', lang, slug: data.slug });
    const demo = data.stage.kind === 'browser-phone' && data.stage.demo;

    return (
        <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
            {/* the visual is a second way into the case; the text link below is the one for keyboards and screen readers */}
            <a href={href} tabIndex={-1} aria-hidden="true" className={`group block overflow-hidden rounded-3xl lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
                <CaseStage stage={data.stage} sizes={STAGE_SIZES} />
            </a>

            <div className="lg:col-span-5">
                <p className="text-sm text-ink-3">{t.type}</p>
                <h3 className="mt-3 font-display text-[clamp(1.875rem,1.3rem+1.8vw,2.75rem)] leading-[1.08] tracking-[-0.03em]">{t.title}</h3>
                <p className="mt-5 text-[17px] leading-relaxed text-pretty text-ink-2">{t.summary}</p>
                {data.pilot && <CaseStatus status={t.status} className="mt-4" />}
                {demo && <p className="mt-4 text-sm text-ink-3">{d.work.demoData}</p>}
                <a href={href} className="link group mt-7 inline-flex items-center gap-2 text-[15px] font-medium">
                    {d.work.readCase}
                    <span className="sr-only">: {t.title}</span>
                    <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
            </div>
        </article>
    );
}
