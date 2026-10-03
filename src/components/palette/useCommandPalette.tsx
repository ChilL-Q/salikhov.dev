import { lazy, Suspense, useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';

const loadPalette = () => import('./CommandPalette');
const CommandPalette = lazy(loadPalette);

const noop = () => () => {};
const isMac = () => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

/** "⌘" on Apple devices, "Ctrl" elsewhere; prerendered as ⌘ and corrected after hydration. */
export function useModKey(): string {
    return useSyncExternalStore(noop, isMac, () => true) ? '⌘' : 'Ctrl';
}

/**
 * State, shortcut and lazy loading for the ⌘K menu — a quiet extra for keyboard people: ⌘K / Ctrl+K
 * toggles it, nothing on the page points at it except a hint in the footer. The palette's code loads
 * on idle, so the first open is instant, and focus goes back to where it was when the menu closes.
 */
export function useCommandPalette() {
    const [open, setOpen] = useState(false);
    const lastFocus = useRef<HTMLElement | null>(null);

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
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                if (open) hide();
                else show();
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

    return { show, palette };
}
