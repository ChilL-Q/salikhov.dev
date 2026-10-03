import type { ReactNode } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';
import { CASES, caseBySlug, type CaseSlug, type Shot } from '../content/cases';
import { workImage } from '../content/work-images';
import { pathFor } from '../routes';
import { CONTACTS } from '../site';
import { Navbar } from '../landing/Navbar';
import { Footer } from '../landing/Footer';
import { CaseStage } from '../components/work/CaseStage';
import { CaseStatus } from '../components/work/CaseStatus';
import { BrowserFrame, DemoBadge, PhoneFrame } from '../components/work/Frames';
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

    return (
        <>
            <Navbar />
            <main>
                <article>
                    <header className="mx-auto max-w-[1200px] px-5 pt-28 lg:px-10 lg:pt-36">
                        <a href={`${home}#work`} className="inline-flex items-center gap-2 font-mono text-sm text-ink-3 transition-colors hover:text-ink">
                            <ArrowLeft size={15} aria-hidden="true" />
                            {d.work.allWork}
                        </a>
                        <p className="mt-10 font-mono text-[13px] text-accent">{t.type}</p>
                        <h1 className="mt-3 font-display text-[clamp(2.75rem,1rem+5vw,6rem)] leading-[0.95] font-bold tracking-[-0.045em]">{t.title}</h1>
                        <p className="mt-6 max-w-[52ch] text-[clamp(1.125rem,1rem+0.45vw,1.375rem)] leading-relaxed text-pretty text-ink-2">{t.summary}</p>
                        {data.pilot && <CaseStatus status={t.status} className="mt-6" />}

                        <dl className="mt-10 grid gap-x-10 gap-y-5 border-t border-tint/10 pt-6 sm:grid-cols-3">
                            <Meta label={d.work.role}>{t.role}</Meta>
                            <Meta label={d.work.client}>{t.client}</Meta>
                            <Meta label={d.work.live}>
                                <span className="flex flex-wrap gap-x-4 gap-y-1">
                                    {data.links.map(link => (
                                        <a
                                            key={link.url}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 underline decoration-tint/30 underline-offset-4 transition-colors hover:text-accent-light hover:decoration-accent"
                                        >
                                            {link.label}
                                            <ArrowUpRight size={14} aria-hidden="true" />
                                        </a>
                                    ))}
                                </span>
                            </Meta>
                        </dl>
                    </header>

                    <div className="mx-auto mt-10 max-w-[1200px] px-5 lg:mt-14 lg:px-10">
                        <CaseStage stage={data.stage} sizes={STAGE_SIZES} alt={`${t.title} — ${data.links[0].label}`} priority className="rounded-[28px] border border-tint/10" />
                    </div>

                    <CaseSection title={d.work.problem}>
                        <p className="text-[clamp(1.25rem,1.05rem+0.6vw,1.625rem)] leading-snug text-pretty text-ink">{t.problem}</p>
                    </CaseSection>

                    <CaseSection title={d.work.built}>
                        <ol className="divide-y divide-tint/10 border-y border-tint/10">
                            {t.built.map((item, i) => (
                                <li key={item} className="grid grid-cols-[2.75rem_1fr] gap-3 py-4 text-[17px] leading-relaxed text-ink-2">
                                    <span className="pt-0.5 font-mono text-sm text-accent">{String(i + 1).padStart(2, '0')}</span>
                                    <span className="text-pretty">{item}</span>
                                </li>
                            ))}
                        </ol>
                    </CaseSection>

                    {data.shots.length > 0 && (
                        <section aria-labelledby="screens" className="mx-auto max-w-[1200px] px-5 py-14 lg:px-10 lg:py-20">
                            <h2 id="screens" data-reveal className="font-display text-2xl font-semibold tracking-[-0.02em]">
                                {d.work.screens}
                            </h2>
                            <div className="mt-8 grid gap-5 lg:grid-cols-2 lg:gap-6">
                                {data.shots.map(shot => (
                                    <ShotFigure key={shot.image} shot={shot} caption={captions[shot.caption]} />
                                ))}
                            </div>
                        </section>
                    )}

                    <CaseSection title={d.work.status}>
                        <p className="text-[17px] leading-relaxed text-ink-2">{t.result}</p>
                        {data.pilot && (
                            <div className="mt-8 rounded-3xl border border-accent/35 bg-[radial-gradient(120%_120%_at_0%_0%,rgb(var(--accent-rgb)/0.14),transparent_60%)] p-6 sm:p-8">
                                <h3 className="font-display text-[clamp(1.5rem,1.2rem+1vw,2rem)] leading-tight font-bold tracking-[-0.03em]">{d.work.pilotTitle}</h3>
                                <p className="mt-3 max-w-[52ch] leading-relaxed text-ink-2">{d.work.pilotText}</p>
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <a href={CONTACTS.telegram} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                        {d.work.pilotButton}
                                        <ArrowUpRight size={18} aria-hidden="true" />
                                    </a>
                                    <a href={data.links[0].url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                                        {data.links[0].label}
                                        <ArrowUpRight size={18} aria-hidden="true" />
                                    </a>
                                </div>
                            </div>
                        )}
                    </CaseSection>

                    <CaseSection title={d.work.stack}>
                        <dl className="grid gap-5">
                            {data.stack.map(group => (
                                <div key={group.group} className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-6">
                                    <dt className="pt-1.5 font-mono text-xs text-ink-3">{d.work.groups[group.group]}</dt>
                                    <dd className="flex flex-wrap gap-1.5">
                                        {group.items.map(item => (
                                            <span key={item} className="rounded-full border border-tint/15 px-3 py-1 font-mono text-[13px] text-ink-2">
                                                {item}
                                            </span>
                                        ))}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </CaseSection>

                    <section className="mx-auto max-w-[1200px] px-5 pt-6 pb-20 lg:px-10 lg:pb-28">
                        <CtaBanner title={d.work.ctaTitle} text={d.work.ctaText} button={d.work.ctaButton} heading="h2" />

                        <a
                            href={pathFor({ page: 'case', lang, slug: next.slug })}
                            className="group mt-6 flex items-center justify-between gap-6 border-y border-tint/10 py-8 transition-colors hover:border-accent/40"
                        >
                            <span>
                                <span className="block font-mono text-xs text-ink-3">{d.work.next}</span>
                                <span className="mt-2 block font-display text-[clamp(1.75rem,1.2rem+2vw,3rem)] leading-tight font-bold tracking-[-0.035em] transition-colors group-hover:text-accent-light">
                                    {d.cases[next.slug].title}
                                </span>
                                <span className="mt-1 block text-ink-2">{d.cases[next.slug].teaser}</span>
                            </span>
                            <ArrowRight size={28} aria-hidden="true" className="shrink-0 text-ink-3 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-accent-light" />
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
            <dt className="font-mono text-xs text-ink-3">{label}</dt>
            <dd className="mt-1.5 text-[15px] leading-snug text-ink">{children}</dd>
        </div>
    );
}

/** Heading in the narrow left column, content on the right (stacked on phones). */
function CaseSection({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section className="mx-auto max-w-[1200px] px-5 lg:px-10">
            <div data-reveal className="grid gap-5 border-t border-tint/10 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12 lg:py-16">
                <h2 className="font-display text-2xl font-semibold tracking-[-0.02em]">{title}</h2>
                <div>{children}</div>
            </div>
        </section>
    );
}

function ShotFigure({ shot, caption }: { shot: Shot; caption: string }) {
    const image = workImage(shot.image);
    // the figure's padding (p-5) comes off the page column (100vw − 40px)
    const sizes = shot.wide ? '(min-width: 1200px) 1000px, calc(100vw - 80px)' : '(min-width: 1024px) 520px, calc(100vw - 80px)';

    return (
        <figure data-reveal className={`flex flex-col ${shot.wide ? 'lg:col-span-2' : ''}`}>
            <div className="@container relative grid flex-1 place-items-center overflow-hidden rounded-3xl border border-tint/10 bg-raised p-5 sm:p-8">
                {shot.frame === 'browser' && <BrowserFrame url={shot.url ?? ''} image={image} sizes={sizes} alt={caption} w="100cqw" />}
                {shot.frame === 'phone' && <PhoneFrame image={image} sizes="(min-width: 1024px) 260px, calc(52vw - 42px)" alt={caption} w="min(52cqw, 300px)" />}
                {shot.frame === 'plain' && (
                    <Picture
                        image={image}
                        sizes={sizes}
                        alt={caption}
                        className="block w-full"
                        imgClassName="mx-auto block h-auto max-h-[680px] w-auto max-w-full rounded-xl shadow-[0_30px_60px_-24px_rgb(0_0_0/0.7)]"
                    />
                )}
                {shot.demo && <DemoBadge className="absolute top-3 left-3" />}
            </div>
            <figcaption className="mt-3 font-mono text-xs leading-relaxed text-ink-3">{caption}</figcaption>
        </figure>
    );
}
