import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { Search } from 'lucide-react';
import { useI18n } from '../../i18n/useI18n';
import { CASES } from '../../content/cases';
import { pathFor } from '../../routes';
import { CONTACTS } from '../../site';

type Group = 'go' | 'cases' | 'contact' | 'settings';
type Action =
    | { kind: 'section'; id: string }
    | { kind: 'href'; href: string }
    | { kind: 'external'; href: string }
    | { kind: 'copy'; text: string }
    | { kind: 'help' }
    | { kind: 'hire' };

interface Command {
    id: string;
    /** what the user types, shown in mono */
    cmd: string;
    label: string;
    group: Group;
    action: Action;
    /** only listed once the query starts with it (the easter egg) */
    hiddenUntil?: string;
}

const SECTIONS = ['work', 'services', 'process', 'stack', 'about', 'contact'] as const;
const GROUPS: Group[] = ['go', 'cases', 'contact', 'settings'];

/**
 * ⌘K quick navigation. Loaded on demand from the navbar; a native modal dialog gives focus trapping
 * and Esc. The input is a combobox driving the listbox with aria-activedescendant. Typing a command
 * ("email", "/lang ru", "help") works too — and one more that isn't listed.
 */
export default function CommandPalette({ onClose }: { onClose: () => void }) {
    const { d, lang, route, alt } = useI18n();
    const p = d.palette;
    const dialog = useRef<HTMLDialogElement>(null);
    const input = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState('');
    const [active, setActive] = useState(0);
    const [log, setLog] = useState<{ cmd: string; out: string; ok: boolean }[]>([]);

    const home = route.page === 'home' ? null : pathFor({ page: 'home', lang });

    const commands = useMemo<Command[]>(
        () => [
            ...SECTIONS.map(id => ({ id, cmd: `/${id}`, label: p.commands[id], group: 'go' as const, action: { kind: 'section', id } as const })),
            ...CASES.map(c => ({
                id: `case-${c.slug}`,
                cmd: `/work/${c.slug}`,
                label: d.cases[c.slug].title,
                group: 'cases' as const,
                action: { kind: 'href', href: pathFor({ page: 'case', lang, slug: c.slug }) } as const,
            })),
            { id: 'email', cmd: '/email', label: p.commands.email, group: 'contact', action: { kind: 'copy', text: CONTACTS.email } },
            { id: 'telegram', cmd: '/telegram', label: p.commands.telegram, group: 'contact', action: { kind: 'external', href: CONTACTS.telegram } },
            { id: 'whatsapp', cmd: '/whatsapp', label: p.commands.whatsapp, group: 'contact', action: { kind: 'external', href: CONTACTS.whatsapp } },
            { id: 'instagram', cmd: '/instagram', label: p.commands.instagram, group: 'contact', action: { kind: 'external', href: CONTACTS.instagram } },
            { id: 'github', cmd: '/github', label: p.commands.github, group: 'contact', action: { kind: 'external', href: CONTACTS.github } },
            { id: 'hire', cmd: 'sudo hire', label: p.commands.telegram, group: 'contact', action: { kind: 'hire' }, hiddenUntil: 'sudo' },
            { id: 'lang-en', cmd: '/lang en', label: p.commands.langEn, group: 'settings', action: { kind: 'href', href: alt.en } },
            { id: 'lang-ru', cmd: '/lang ru', label: p.commands.langRu, group: 'settings', action: { kind: 'href', href: alt.ru } },
            { id: 'help', cmd: 'help', label: p.commands.help, group: 'settings', action: { kind: 'help' } },
        ],
        [d, p, lang, alt],
    );

    const results = useMemo(() => {
        const q = query.trim().toLowerCase().replace(/^\//, '');
        return commands
            .map(c => {
                const name = c.cmd.toLowerCase().replace(/^\//, '');
                if (c.hiddenUntil && !q.startsWith(c.hiddenUntil)) return null;
                if (!q) return { c, score: 0 };
                const score = name === q ? 0 : name.startsWith(q) ? 1 : name.includes(q) ? 2 : c.label.toLowerCase().includes(q) ? 3 : -1;
                return score < 0 ? null : { c, score };
            })
            .filter((x): x is { c: Command; score: number } => x !== null)
            .sort((a, b) => a.score - b.score || GROUPS.indexOf(a.c.group) - GROUPS.indexOf(b.c.group))
            .map(x => x.c);
    }, [query, commands]);

    useEffect(() => {
        const el = dialog.current;
        if (!el) return;
        el.showModal();
        // on touch screens don't pop the keyboard over the list: focus the dialog, let people tap
        if (window.matchMedia('(pointer: fine)').matches) input.current?.focus();
        else el.focus();
        return () => el.close();
    }, []);

    useEffect(() => {
        document.getElementById(`cmdk-${results[active]?.id}`)?.scrollIntoView({ block: 'nearest' });
    }, [active, results]);

    const print = (cmd: string, out: string, ok = true) => setLog(lines => [...lines.slice(-2), { cmd, out, ok }]);

    const run = (command: Command | undefined) => {
        const typed = query.trim();
        if (!command) {
            if (typed) print(typed, `${p.out.notFound}: ${typed}`, false);
            setQuery('');
            return;
        }
        const action = command.action;
        switch (action.kind) {
            case 'section': {
                onClose();
                if (home) {
                    window.location.href = `${home}#${action.id}`;
                } else {
                    history.replaceState(null, '', `#${action.id}`);
                    document.getElementById(action.id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
                }
                return;
            }
            case 'href':
                onClose();
                window.location.href = action.href;
                return;
            case 'external':
                window.open(action.href, '_blank', 'noopener');
                print(command.cmd, `${p.out.opening} ${action.href.replace(/^https?:\/\//, '')}`);
                break;
            case 'copy':
                navigator.clipboard.writeText(action.text).then(
                    () => print(command.cmd, `${p.out.copied}: ${action.text}`),
                    () => print(command.cmd, action.text),
                );
                break;
            case 'help':
                print('help', p.out.help);
                break;
            case 'hire':
                // opened right away: a delayed window.open would be blocked as a popup
                window.open(CONTACTS.telegram, '_blank', 'noopener');
                print('sudo hire', p.out.hire);
                break;
        }
        setQuery('');
        setActive(0);
    };

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            const step = e.key === 'ArrowDown' ? 1 : -1;
            setActive(i => (results.length ? (i + step + results.length) % results.length : 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            run(results[active]);
        }
    };

    const activeId = results[active] ? `cmdk-${results[active].id}` : undefined;

    return (
        <dialog
            ref={dialog}
            aria-label={p.label}
            tabIndex={-1}
            onCancel={e => {
                e.preventDefault();
                onClose();
            }}
            onClick={e => e.target === e.currentTarget && onClose()}
            className="mx-auto mt-[12vh] mb-auto w-[min(600px,calc(100vw-24px))] overflow-hidden rounded-2xl border border-tint/12 bg-raised p-0 text-ink shadow-[0_32px_64px_-24px_rgb(0_0_0/0.8)] outline-none backdrop:bg-bg/75"
        >
            <label className="flex items-center gap-3 border-b border-tint/10 px-5 py-4">
                <Search size={18} aria-hidden="true" className="shrink-0 text-ink-3" />
                <input
                    ref={input}
                    value={query}
                    onChange={e => {
                        setQuery(e.target.value);
                        setActive(0);
                    }}
                    onKeyDown={onKeyDown}
                    role="combobox"
                    aria-expanded="true"
                    aria-controls="cmdk-list"
                    aria-activedescendant={activeId}
                    aria-autocomplete="list"
                    aria-label={p.label}
                    placeholder={p.placeholder}
                    spellCheck={false}
                    autoComplete="off"
                    autoCapitalize="none"
                    className="min-w-0 flex-1 bg-transparent text-base text-ink caret-accent outline-none placeholder:text-ink-3"
                />
                <kbd aria-hidden="true" className="font-mono text-[11px] text-ink-3">
                    esc
                </kbd>
            </label>

            {log.length > 0 && (
                <div aria-live="polite" className="space-y-1 border-b border-tint/10 px-5 py-3 text-sm">
                    {log.map((line, i) => (
                        <p key={i} className={line.ok ? 'text-ink-2' : 'text-ink-3'}>
                            {line.out}
                        </p>
                    ))}
                </div>
            )}

            <div id="cmdk-list" role="listbox" aria-label={p.label} className="max-h-[min(52vh,420px)] overflow-y-auto overscroll-contain py-2">
                {results.length === 0 && <p className="px-5 py-6 text-sm text-ink-3">{p.empty}</p>}
                {GROUPS.map(group => {
                    const items = results.filter(c => c.group === group);
                    if (!items.length) return null;
                    return (
                        <div key={group} role="group" aria-label={p.groups[group]}>
                            <p aria-hidden="true" className="px-5 pt-3 pb-1 text-xs text-ink-3">
                                {p.groups[group]}
                            </p>
                            {items.map(command => {
                                const index = results.indexOf(command);
                                const selected = index === active;
                                return (
                                    <div
                                        key={command.id}
                                        id={`cmdk-${command.id}`}
                                        role="option"
                                        aria-selected={selected}
                                        onMouseMove={() => setActive(index)}
                                        onClick={() => run(command)}
                                        className={`mx-2 flex cursor-pointer items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-[15px] ${selected ? 'bg-tint/[0.07] text-ink' : 'text-ink-2'}`}
                                    >
                                        <span className="truncate">{command.label}</span>
                                        <span className="shrink-0 font-mono text-xs text-ink-3">{command.cmd}</span>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>

            <p aria-hidden="true" className="border-t border-tint/10 px-5 py-2.5 text-xs text-ink-3">
                {p.out.help}
            </p>
        </dialog>
    );
}
