import type { CSSProperties } from 'react';
import { useI18n } from '../i18n/useI18n';
import { SectionHeader } from '../components/SectionHeader';

export function ProcessSection() {
    const { d } = useI18n();

    return (
        <section id="process" aria-labelledby="process-title" className="mx-auto max-w-[1200px] px-5 py-28 lg:px-10 lg:py-40">
            <SectionHeader id="process-title" title={d.process.title} />

            <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
                {d.process.steps.map((step, i) => (
                    <li key={step.title} data-reveal style={{ '--reveal-delay': `${i * 80}ms` } as CSSProperties} className="border-t border-tint/15 pt-6">
                        <p className="text-sm text-ink-3">{i + 1}</p>
                        <h3 className="mt-3 font-display text-2xl leading-tight tracking-[-0.025em]">{step.title}</h3>
                        <p className="mt-3 text-[16px] leading-relaxed text-pretty text-ink-2">{step.text}</p>
                    </li>
                ))}
            </ol>
        </section>
    );
}
