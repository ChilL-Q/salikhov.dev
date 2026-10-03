import type { ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';
import { CASES, caseBySlug, type CaseSlug, type Shot } from '../content/cases';
import { workImage } from '../content/work-images';
import { pathFor } from '../routes';
import { CONTACTS } from '../site';
import { Navbar } from '../landing/Navbar';
import { Footer } from '../landing/Footer';
import { CaseStage } from '../components/work/CaseStage';
import { CaseStatus } from '../components/work/CaseStatus';
import { BrowserFrame, PhoneFrame } from '../components/work/Frames';
import { Picture } from '../components/Picture';
import { CtaBanner } from '../components/CtaBanner';

const STAGE_SIZES = { browser: '(min-width: 1200px) 900px, calc(80vw - 32px)', phone: '(min-width: 1200px) 300px, calc(27vw - 11px)' };

export function CasePage({ slug }: { slug: CaseSlug }) {
    const { d, lang } = useI18n();
    const data = caseBySlug(slug);
    const t = d.cases[slug];
    const next = CASES[(CASES.indexOf(data) + 1) % CASES.length];
    const home = pathFor({ page: 'home', lang });
    const captions = t.shots as Record<string, string>;
    const demo = data.stage.kind === 'browser-phone' && data.stage.demo;

    return (
        <>
            <Navbar />
            <main id="main" tabIndex={-1} className="outline-none">
                <article>
                    <header className="mx-auto max-w-[1200px] px-5 pt-28 lg:px-10 lg:pt-40">
                        <a href={`${home}#work`} className="inline-flex items-center gap-2 py-1 text-[15px] text-ink-3 transition-colors hover:text-ink">
                            <ArrowLeft size={16} aria-hidden="true" />
                            {d.work.allWork}
                        </a>
                        <p className="mt-12 text-[15px] text-ink-3">{t.type}</p>
                        <h1 className="mt-3 font-display text-[clamp(2.75rem,1rem+5vw,6rem)] leading-[0.98] tracking-[-0.045em]">{t.title}</h1>
                        <p className="mt-7 max-w-[50ch] text-[clamp(1.125rem,1rem+0.45vw,1.375rem)] leading-relaxed text-pretty text-ink-2">{t.summary}</p>
                        {data.pilot && <CaseStatus status={t.status} className="mt-5" />}

                        <dl className="mt-12 grid gap-x-10 gap-y-6 border-t border-tint/10 pt-7 sm:grid-cols-3">
                            <Meta label={d.work.role}>{t.role}</Meta>
                            <Meta label={d.work.client}>{t.client}</Meta>
                            <Meta label={d.work.live}>
                                <span className="flex flex-wrap gap-x-4 gap-y-1">
                                    {data.links.map(link => (
                                        <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="link">
                                            {link.label}
                                        </a>
                                    ))}
                                </span>
                            </Meta>
                        </dl>
                    </header>

                    <figure className="mx-auto mt-12 max-w-[1200px] px-5 pb-14 lg:mt-16 lg:px-10 lg:pb-20">
                        <CaseStage stage={data.stage} sizes={STAGE_SIZES} alt={`${t.title} — ${data.links[0].label}`} priority className="rounded-3xl" />
                        {demo && <figcaption className="mt-3 text-sm text-ink-3">{d.work.demoData}</figcaption>}
                    </figure>

                    <CaseSection title={d.work.problem}>
                        <p className="font-display text-[clamp(1.375rem,1.1rem+0.8vw,1.875rem)] leading-snug tracking-[-0.015em] text-pretty text-ink">{t.problem}</p>
                    </CaseSection>

                    <CaseSection title={d.work.built}>
                        <ul className="space-y-4 text-[17px] leading-relaxed text-ink-2">
                            {t.built.map(item => (
                                <li key={item} className="text-pretty">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </CaseSection>

                    {data.shots.length > 0 && (
                        <section aria-labelledby="screens" className="mx-auto max-w-[1200px] px-5 py-14 lg:px-10 lg:py-20">
                            <h2 id="screens" data-reveal className="font-display text-2xl tracking-[-0.02em]">
                                {d.work.screens}
                            </h2>
                            <div className="mt-8 grid gap-6 lg:grid-cols-2">
                                {data.shots.map(shot => (
                                    <ShotFigure key={shot.image} shot={shot} caption={captions[shot.caption]} demoLabel={d.work.demoShort} />
                                ))}
                            </div>
                        </section>
                    )}

                    <CaseSection title={d.work.status}>
                        <p className="text-[17px] leading-relaxed text-ink-2">{t.result}</p>
                        {data.pilot && (
                            <div className="mt-10">
                                <h3 className="font-display text-[clamp(1.5rem,1.2rem+1vw,2rem)] leading-tight tracking-[-0.03em]">{d.work.pilotTitle}</h3>
                                <p className="mt-3 max-w-[52ch] text-[17px] leading-relaxed text-ink-2">{d.work.pilotText}</p>
                                <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
                                    <a href={CONTACTS.telegram} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                        {d.work.pilotButton}
                                    </a>
                                    <a href={data.links[0].url} target="_blank" rel="noopener noreferrer" className="link text-[15px]">
                                        {data.links[0].label}
                                    </a>
                                </div>
                            </div>
                        )}
                    </CaseSection>

                    <CaseSection title={d.work.stack}>
                        <dl className="grid gap-6 sm:grid-cols-2">
                            {data.stack.map(group => (
                                <div key={group.group}>
                                    <dt className="text-sm text-ink-3">{d.work.groups[group.group]}</dt>
                                    <dd className="mt-2 font-mono text-[13px] leading-relaxed text-ink-2">{group.items.join(' · ')}</dd>
                                </div>
                            ))}
                        </dl>
                    </CaseSection>

                    <section className="mx-auto max-w-[1200px] px-5 pt-10 pb-24 lg:px-10 lg:pb-32">
                        <CtaBanner title={d.work.ctaTitle} text={d.work.ctaText} button={d.work.ctaButton} heading="h2" />

                        <a href={pathFor({ page: 'case', lang, slug: next.slug })} className="group mt-16 flex items-center justify-between gap-6 border-t border-tint/10 pt-10">
                            <span>
                                <span className="block text-sm text-ink-3">{d.work.next}</span>
                                <span className="mt-2 block font-display text-[clamp(1.75rem,1.2rem+2vw,3rem)] leading-tight tracking-[-0.035em] transition-colors group-hover:text-ink-2">
                                    {d.cases[next.slug].title}
                                </span>
                                <span className="mt-1 block text-ink-2">{d.cases[next.slug].teaser}</span>
                            </span>
                            <ArrowRight size={28} aria-hidden="true" className="shrink-0 text-ink-3 transition-transform duration-300 group-hover:translate-x-1.5" />
                        </a>
                    </section>
                </article>
            </main>
            <Footer />
        </>
    );
}

function Meta({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div>
            <dt className="text-sm text-ink-3">{label}</dt>
            <dd className="mt-1.5 text-[16px] leading-snug text-ink">{children}</dd>
        </div>
    );
}

/** Heading in the narrow left column, content on the right (stacked on phones). */
function CaseSection({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section className="mx-auto max-w-[1200px] px-5 lg:px-10">
            <div data-reveal className="grid gap-5 border-t border-tint/10 py-14 lg:grid-cols-12 lg:gap-12 lg:py-20">
                <h2 className="font-display text-2xl tracking-[-0.02em] lg:col-span-4">{title}</h2>
                <div className="lg:col-span-8">{children}</div>
            </div>
        </section>
    );
}

function ShotFigure({ shot, caption, demoLabel }: { shot: Shot; caption: string; demoLabel: string }) {
    const image = workImage(shot.image);
    // the figure's padding (p-5) comes off the page column (100vw − 40px)
    const sizes = shot.wide ? '(min-width: 1200px) 1000px, calc(100vw - 80px)' : '(min-width: 1024px) 520px, calc(100vw - 80px)';

    return (
        <figure data-reveal className={`flex flex-col ${shot.wide ? 'lg:col-span-2' : ''}`}>
            <div className="@container relative grid flex-1 place-items-center overflow-hidden rounded-3xl bg-raised p-5 sm:p-8">
                {shot.frame === 'browser' && <BrowserFrame url={shot.url ?? ''} image={image} sizes={sizes} alt={caption} w="100cqw" />}
                {shot.frame === 'phone' && <PhoneFrame image={image} sizes="(min-width: 1024px) 260px, calc(52vw - 42px)" alt={caption} w="min(52cqw, 300px)" />}
                {shot.frame === 'plain' && (
                    <Picture image={image} sizes={sizes} alt={caption} className="block w-full" imgClassName="mx-auto block h-auto max-h-[680px] w-auto max-w-full rounded-xl" />
                )}
            </div>
            <figcaption className="mt-3 text-sm leading-relaxed text-ink-3">
                {shot.demo && <span className="text-ink-2">{demoLabel}. </span>}
                {caption}
            </figcaption>
        </figure>
    );
}
