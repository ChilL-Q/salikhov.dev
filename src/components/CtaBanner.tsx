import { ArrowUpRight } from 'lucide-react';
import { CONTACTS } from '../site';

/** "Let's talk" card: a short title and line on the left, the Telegram button on the right. */
export function CtaBanner({ title, text, button, heading: Heading = 'h3', className = '' }: { title: string; text: string; button: string; heading?: 'h2' | 'h3'; className?: string }) {
    return (
        <div
            data-reveal
            className={`flex flex-col gap-6 rounded-[28px] border border-tint/10 bg-raised p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between ${className}`}
        >
            <div>
                <Heading className="font-display text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] leading-tight font-bold tracking-[-0.03em]">{title}</Heading>
                <p className="mt-2 max-w-[52ch] leading-relaxed text-pretty text-ink-2">{text}</p>
            </div>
            <a href={CONTACTS.telegram} target="_blank" rel="noopener noreferrer" className="btn btn-primary self-start lg:self-auto">
                {button}
                <ArrowUpRight size={18} aria-hidden="true" />
            </a>
        </div>
    );
}
