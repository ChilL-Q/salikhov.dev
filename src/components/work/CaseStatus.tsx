/**
 * A case's live status: "Live at … · Taking the next cafés for a pilot". The part before " · "
 * gets the "live" dot, the rest reads as the call to action under it.
 */
export function CaseStatus({ status, className = '' }: { status: string; className?: string }) {
    const [live, ...rest] = status.split(' · ');

    return (
        <p className={`inline-flex flex-col gap-1 rounded-2xl border border-accent/35 bg-accent/10 px-3.5 py-2.5 font-mono text-xs leading-snug ${className}`}>
            <span className="flex items-start gap-2.5 text-ink">
                <span className="status-dot mt-[4px]" aria-hidden="true" />
                {live}
            </span>
            {rest.length > 0 && <span className="pl-[18px] text-accent-light">{rest.join(' · ')}</span>}
        </p>
    );
}
