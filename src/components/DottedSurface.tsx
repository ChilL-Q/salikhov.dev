import { useEffect, useRef } from 'react';

/** Mounts the WebGL dot wave once the browser is idle, so it never competes with the first paint. */
export function DottedSurface({ className }: { className?: string }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = ref.current;
        if (!container) return;
        let stop: (() => void) | undefined;
        let cancelled = false;

        const start = () => {
            import('../lib/dot-wave').then(({ startDotWave }) => {
                if (!cancelled) stop = startDotWave(container);
            });
        };
        const idle = 'requestIdleCallback' in window;
        const handle = idle ? window.requestIdleCallback(start, { timeout: 1500 }) : window.setTimeout(start, 400);

        return () => {
            cancelled = true;
            if (idle) window.cancelIdleCallback(handle);
            else window.clearTimeout(handle);
            stop?.();
        };
    }, []);

    return <div ref={ref} className={className} aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />;
}
