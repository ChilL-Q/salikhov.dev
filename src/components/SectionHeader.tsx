interface SectionHeaderProps {
    /** id of the heading, for the section's aria-labelledby */
    id: string;
    title: string;
    intro?: string;
}

/** A large, quiet heading and an optional line under it. */
export function SectionHeader({ id, title, intro }: SectionHeaderProps) {
    return (
        <header data-reveal className="max-w-[46rem]">
            <h2 id={id} className="font-display text-[clamp(2.25rem,1.3rem+3vw,3.75rem)] leading-[1.05] tracking-[-0.035em] text-balance">
                {title}
            </h2>
            {intro && <p className="mt-5 max-w-[40rem] text-lg leading-relaxed text-pretty text-ink-2">{intro}</p>}
        </header>
    );
}
