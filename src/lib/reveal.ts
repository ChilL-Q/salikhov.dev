/**
 * Scroll reveal for elements marked `data-reveal`. They are hidden only under `html.js`
 * (set by an inline script in index.html), so the prerendered page reads fine without JS.
 * Revealed elements get `data-revealed`, an attribute React doesn't manage, so a re-render
 * can't hide them again.
 */
export function observeReveals(): () => void {
    const pending = document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed])');
    const reveal = (el: Element) => el.setAttribute('data-revealed', '');

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        pending.forEach(reveal);
        return () => {};
    }

    const observer = new IntersectionObserver(
        entries => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                reveal(entry.target);
                observer.unobserve(entry.target);
            }
        },
        { rootMargin: '0px 0px -8% 0px' },
    );
    pending.forEach(el => observer.observe(el));
    return () => observer.disconnect();
}
