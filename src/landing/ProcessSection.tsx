import type { CSSProperties } from 'react';
import { useI18n } from '../i18n/useI18n';
import { SectionHeader } from '../components/SectionHeader';

export function ProcessSection() {
    const { d } = useI18n();
    const p = d.process;

    return (
        <section id="process" aria-labelledby="process-title" className="mx-auto max-w-[1200px] px-5 py-24 lg:px-10 lg:py-32">
            <SectionHeader id="process-title" index="03" label={p.label} title={p.title} intro={p.intro} />

            {/* 1px gaps over a tinted background draw the grid lines between the steps */}
            <ol className="mt-12 grid gap-px overflow-hidden rounded-[28px] border border-tint/10 bg-tint/10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
                {p.steps.map((step, i) => (
                    <li
                        key={step.title}
                        data-reveal
                        style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}
                        className="flex flex-col bg-bg p-6 sm:p-7 lg:min-h-[320px]"
                    >
                        <p className="flex items-center justify-between gap-4 font-mono text-xs">
                            <span className="text-accent">{String(i + 1).padStart(2, '0')}</span>
                            <span className="text-right text-ink-3">{step.meta}</span>
                        </p>
                        <h3 className="mt-10 font-display text-[26px] leading-tight font-bold tracking-[-0.03em] lg:mt-auto lg:pt-14">{step.title}</h3>
                        <p className="mt-3 text-[15.5px] leading-relaxed text-pretty text-ink-2">{step.text}</p>
                    </li>
                ))}
            </ol>
        </section>
    );
}
