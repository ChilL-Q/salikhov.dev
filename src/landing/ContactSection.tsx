import { useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';
import { CONTACTS, HANDLES } from '../site';
import { GitHubIcon, InstagramIcon, MailIcon, TelegramIcon, WhatsAppIcon } from '../components/icons';

export function ContactSection() {
    const { d } = useI18n();
    const c = d.contact;

    return (
        <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-[1200px] px-5 py-24 lg:px-10 lg:py-36">
            <p data-reveal className="font-mono text-[13px] text-accent">
                06 / {c.label}
            </p>
            <h2 id="contact-title" data-reveal className="mt-5 font-display text-[clamp(3rem,1rem+7.4vw,8.5rem)] leading-[0.92] font-bold tracking-[-0.05em] text-balance">
                {c.titleLead} <span className="gradient-text-accent block">{c.titleAccent}</span>
            </h2>

            <div data-reveal className="mt-10 flex flex-col gap-8 lg:mt-12 lg:flex-row lg:items-end lg:justify-between">
                <p className="max-w-[44ch] text-lg leading-relaxed text-pretty text-ink-2">{c.text}</p>
                <div className="flex flex-col items-start gap-2.5">
                    <a href={CONTACTS.telegram} target="_blank" rel="noopener noreferrer" className="btn btn-primary min-h-[60px] px-8 text-base">
                        <TelegramIcon size={20} />
                        {c.telegram}
                        <ArrowUpRight size={18} aria-hidden="true" />
                    </a>
                    <span className="pl-1 font-mono text-xs text-ink-3">{HANDLES.telegram}</span>
                </div>
            </div>

            <h3 className="sr-only">{c.other}</h3>
            {/* 1px gaps over a tinted background draw the dividers between the cells */}
            <ul data-reveal className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-tint/10 bg-tint/10 sm:grid-cols-2 lg:mt-20">
                <li className="bg-bg">
                    <ContactLink href={CONTACTS.whatsapp} icon={WhatsAppIcon} label="WhatsApp" value={HANDLES.whatsapp} />
                </li>
                <li className="bg-bg">
                    <CopyEmail />
                </li>
                <li className="bg-bg">
                    <ContactLink href={CONTACTS.instagram} icon={InstagramIcon} label="Instagram" value={HANDLES.instagram} />
                </li>
                <li className="bg-bg">
                    <ContactLink href={CONTACTS.github} icon={GitHubIcon} label="GitHub" value={HANDLES.github} />
                </li>
            </ul>
        </section>
    );
}

const ROW = 'group flex w-full items-center gap-4 px-5 py-5 text-left transition-colors hover:bg-tint/[0.03] sm:px-6 sm:py-6';

function RowBody({ icon: Icon, label, value, trailing }: { icon: ComponentType<{ size?: number }>; label: string; value: ReactNode; trailing: ReactNode }) {
    return (
        <>
            <span className="grid size-11 shrink-0 place-items-center rounded-full border border-tint/15 text-ink-2 transition-colors group-hover:border-accent/60 group-hover:text-accent-light">
                <Icon size={20} />
            </span>
            <span className="min-w-0 flex-1">
                <span className="block font-mono text-xs text-ink-3">{label}</span>
                <span className="mt-0.5 block truncate text-[15px] text-ink">{value}</span>
            </span>
            {trailing}
        </>
    );
}

function ContactLink({ href, icon, label, value }: { href: string; icon: ComponentType<{ size?: number }>; label: string; value: string }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={ROW}>
            <RowBody
                icon={icon}
                label={label}
                value={value}
                trailing={<ArrowUpRight size={18} aria-hidden="true" className="shrink-0 text-ink-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-light" />}
            />
        </a>
    );
}

/** One tap copies the address; the row confirms, and a live region announces it. */
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
        <>
            <button type="button" onClick={copy} className={ROW}>
                <RowBody
                    icon={MailIcon}
                    label={c.email}
                    // the confirmation takes the address's place, so it's visible on the narrowest screen
                    value={copied ? <span className="text-accent-light">{c.copied}</span> : CONTACTS.email}
                    trailing={
                        <span className={`inline-flex shrink-0 items-center gap-1.5 font-mono text-xs transition-colors ${copied ? 'text-accent-light' : 'text-ink-3 group-hover:text-ink'}`}>
                            {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                            <span className="max-sm:sr-only">{copied ? c.copied : c.copy}</span>
                        </span>
                    }
                />
            </button>
            <span aria-live="polite" className="sr-only">
                {copied ? c.emailCopied : ''}
            </span>
        </>
    );
}
