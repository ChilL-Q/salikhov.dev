import { useI18n } from '../i18n/useI18n';
import { STACK } from '../content/stack';
import { SectionHeader } from '../components/SectionHeader';

/** Compact: four short columns, tools in mono. */
export function StackSection() {
    const { d } = useI18n();

    return (
        <section id="stack" aria-labelledby="stack-title" className="mx-auto max-w-[1200px] px-5 py-24 lg:px-10 lg:py-32">
            <SectionHeader id="stack-title" title={d.stack.title} intro={d.stack.intro} />

            <div data-reveal className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:mt-16 lg:grid-cols-4 lg:gap-x-10">
                {STACK.map(group => (
                    <div key={group.dir} className="border-t border-tint/15 pt-5">
                        <h3 className="font-sans text-[15px] font-medium text-ink">{group.label}</h3>
                        <ul className="mt-4 space-y-2 font-mono text-[13px] leading-snug text-ink-2">
                            {group.items.map(item => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}
