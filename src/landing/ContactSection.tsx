import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/useI18n';
import { CONTACTS, HANDLES } from '../site';

export function ContactSection() {
    const { d } = useI18n();
    const c = d.contact;

    const links = [
        { label: 'WhatsApp', value: HANDLES.whatsapp, href: CONTACTS.whatsapp },
        { label: 'Instagram', value: HANDLES.instagram, href: CONTACTS.instagram },
        { label: 'GitHub', value: HANDLES.github, href: CONTACTS.github },
    ];

    return (
        <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-[1200px] px-5 py-28 lg:px-10 lg:py-44">
            <h2 id="contact-title" data-reveal className="max-w-[14ch] font-display text-[clamp(2.75rem,1.2rem+5.6vw,6rem)] leading-[1] tracking-[-0.045em] text-balance">
                {c.title}
            </h2>
            <div data-reveal className="mt-8 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-end lg:justify-between">
                <p className="max-w-[44ch] text-lg leading-relaxed text-pretty text-ink-2">{c.text}</p>
                <a href={CONTACTS.telegram} target="_blank" rel="noopener noreferrer" className="btn btn-primary self-start max-sm:w-full lg:self-auto">
                    {c.telegram}
                </a>
            </div>

            <div data-reveal className="mt-16 border-t border-tint/10 pt-8 lg:mt-24">
                <h3 className="font-sans text-sm font-normal text-ink-3">{c.other}</h3>
                <dl className="mt-6 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <dt className="text-sm text-ink-3">{c.email}</dt>
                        <dd className="mt-1.5">
                            <CopyEmail />
                        </dd>
                    </div>
                    {links.map(link => (
                        <div key={link.label}>
                            <dt className="text-sm text-ink-3">{link.label}</dt>
                            <dd className="mt-1.5">
                                <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-[17px] text-ink transition-colors hover:text-accent">
                                    {link.value}
                                </a>
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}

/** The address, and one tap to copy it; the button confirms and a live region announces it. */
function CopyEmail() {
    const { d } = useI18n();
    const c = d.contact;
    const [copied, setCopied] = useState(false);
    const timer = useRef<number | undefined>(undefined);

    useEffect(() => () => window.clearTimeout(timer.current), []);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(CONTACTS.email);
            setCopied(true);
            window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => setCopied(false), 2400);
        } catch {
            // no clipboard access (insecure context, permissions): fall back to the mail app
            window.location.href = `mailto:${CONTACTS.email}`;
        }
    };

    return (
        <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <a href={`mailto:${CONTACTS.email}`} className="text-[17px] break-all text-ink transition-colors hover:text-accent">
                {CONTACTS.email}
            </a>
            <button type="button" onClick={copy} className={`py-1 text-sm transition-colors ${copied ? 'text-ink' : 'text-ink-3 hover:text-ink'}`}>
                {copied ? c.copied : c.copy}
            </button>
            <span aria-live="polite" className="sr-only">
                {copied ? c.emailCopied : ''}
            </span>
        </span>
    );
}
