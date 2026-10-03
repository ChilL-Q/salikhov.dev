import { CONTACTS } from '../site';

/** "Let's talk" block: a short title and line, and the Telegram button. Quiet, no fills. */
export function CtaBanner({ title, text, button, heading: Heading = 'h3', className = '' }: { title: string; text: string; button: string; heading?: 'h2' | 'h3'; className?: string }) {
    return (
        <div data-reveal className={`flex flex-col gap-7 border-t border-tint/10 pt-10 lg:flex-row lg:items-end lg:justify-between ${className}`}>
            <div>
                <Heading className="font-display text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] leading-tight tracking-[-0.03em]">{title}</Heading>
                <p className="mt-3 max-w-[48ch] text-[17px] leading-relaxed text-pretty text-ink-2">{text}</p>
            </div>
            <a href={CONTACTS.telegram} target="_blank" rel="noopener noreferrer" className="btn btn-primary self-start lg:self-auto">
                {button}
            </a>
        </div>
    );
}
