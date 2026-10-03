interface SectionHeaderProps {
    /** id of the heading, for the section's aria-labelledby */
    id: string;
    /** "01", "02"… — the order of the section on the home page */
    index: string;
    label: string;
    title: string;
    intro?: string;
}

/** Mono index + label, a large display heading and an optional intro to the right. */
export function SectionHeader({ id, index, label, title, intro }: SectionHeaderProps) {
    return (
        <header className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-12">
            <div data-reveal>
                <p className="font-mono text-[13px] text-accent">
                    {index} / {label}
                </p>
                <h2 id={id} className="mt-4 font-display text-[clamp(2.25rem,1.1rem+3.4vw,4rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance">
                    {title}
                </h2>
            </div>
            {intro && (
                <p data-reveal className="max-w-[46ch] text-[17px] leading-relaxed text-pretty text-ink-2">
                    {intro}
                </p>
            )}
        </header>
    );
}
