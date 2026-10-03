/** The visitor asked their system for less motion (read on the client; false while prerendering). */
export const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
