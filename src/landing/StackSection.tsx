import { useI18n } from '../i18n/useI18n';
import { STACK } from '../content/stack';
import { SectionHeader } from '../components/SectionHeader';

/** Compact, in a terminal window: `ls stack/` lists one directory per area. */
export function StackSection() {
    const { d } = useI18n();

    return (
        <section id="stack" aria-labelledby="stack-title" className="mx-auto max-w-[1200px] px-5 py-20 lg:px-10 lg:py-28">
            <SectionHeader id="stack-title" index="04" label={d.stack.label} title={d.stack.title} intro={d.stack.intro} />

            <div data-reveal className="mt-10 overflow-hidden rounded-2xl border border-tint/12 bg-[#0b0806] font-mono lg:mt-14">
                <div aria-hidden="true" className="flex items-center gap-2 border-b border-tint/10 bg-[#120d09] px-4 py-2.5">
                    {[0, 1, 2].map(i => (
                        <span key={i} className="size-2.5 rounded-full bg-tint/15" />
                    ))}
                    <span className="ml-3 text-xs text-ink-3">stack — zsh</span>
                </div>
                <div className="p-5 sm:p-7">
                    <p aria-hidden="true" className="text-sm text-ink-3">
                        <span className="text-accent">~/salikhov.dev</span> $ ls stack/
                    </p>
                    <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-7 sm:gap-x-8 lg:grid-cols-4">
                        {STACK.map(group => (
                            <div key={group.dir}>
                                <h3 className="text-sm font-semibold text-accent-light">
                                    <span className="sr-only">{group.label}</span>
                                    <span aria-hidden="true">{group.dir}/</span>
                                </h3>
                                <ul className="mt-3 space-y-1.5 text-[13px] leading-snug text-ink-2 sm:text-sm">
                                    {group.items.map(item => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
