/** Where a product stands right now, as a plain line of text. */
export function CaseStatus({ status, className = '' }: { status: string; className?: string }) {
    return <p className={`text-[15px] leading-relaxed text-ink ${className}`}>{status}</p>;
}
