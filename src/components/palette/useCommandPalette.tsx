import { lazy, Suspense, useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';

const loadPalette = () => import('./CommandPalette');
const CommandPalette = lazy(loadPalette);

const noop = () => () => {};
const isMac = () => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

/**
 * State, shortcuts and lazy loading for the ⌘K menu: ⌘K / Ctrl+K toggles it, "/" opens it when
 * you're not typing somewhere. The palette's code loads on idle, so the first open is instant,
 * and focus goes back to where it was when the menu closes.
 */
export function useCommandPalette() {
    const [open, setOpen] = useState(false);
    const lastFocus = useRef<HTMLElement | null>(null);
    // prerendered as ⌘; the client switches to Ctrl after hydration where that's the key
    const mac = useSyncExternalStore(noop, isMac, () => true);

    const show = useCallback(() => {
        lastFocus.current = document.activeElement as HTMLElement | null;
        setOpen(true);
    }, []);

    const hide = useCallback(() => {
        setOpen(false);
        const previous = lastFocus.current;
        requestAnimationFrame(() => previous?.focus?.());
    }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const typing = (e.target as HTMLElement | null)?.closest?.('input, textarea, select, [contenteditable="true"]');
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                if (open) hide();
                else show();
            } else if (e.key === '/' && !open && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
                e.preventDefault();
                show();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, show, hide]);

    useEffect(() => {
        const warm = () => void loadPalette();
        const idle = 'requestIdleCallback' in window;
        const handle = idle ? window.requestIdleCallback(warm, { timeout: 5000 }) : window.setTimeout(warm, 3000);
        return () => (idle ? window.cancelIdleCallback(handle) : window.clearTimeout(handle));
    }, []);

    const palette = open ? (
        <Suspense fallback={null}>
            <CommandPalette onClose={hide} />
        </Suspense>
    ) : null;

    return { show, palette, shortcut: mac ? '⌘' : 'Ctrl' };
}
