/**
 * Open Graph cards (public/og/<lang>.jpg, 1200×630): the site's own hero, shot from the built pages.
 * Navigation links, buttons and the scroll hint are hidden; the salikhov.dev logo, copy, portrait and dot wave stay.
 *
 *   npm run build && npx vite preview --port 4173
 *   playwright-cli run-code --filename=scripts/og/shoot.js   (from the repo root)
 */
async page => {
    const base = 'http://localhost:4173';
    const pages = { ru: '/', en: '/en', kz: '/kz' };
    await page.setViewportSize({ width: 1200, height: 630 });
    for (const [lang, path] of Object.entries(pages)) {
        await page.goto(base + path);
        await page.evaluate(() => localStorage.removeItem('app_language'));
        await page.goto(base + path);
        await page.addStyleTag({
            content: `
                .nav-desktop, .nav-mobile-btn, .hero-actions, .hero-scroll { display: none !important; }
                /* the desktop hero composition, scaled to fill the card: portrait full height, name on two lines */
                .hero-section { min-height: 630px !important; padding: 0 40px !important; }
                .hero-inner { max-width: 1120px !important; }
                .hero-copy { padding: 40px 0 0 !important; }
                .hero-portrait { height: 600px !important; }
                .hero-greeting { font-size: 26px !important; }
                .hero-name { font-size: 96px !important; }
                .hero-role { font-size: 21px !important; margin-bottom: 0 !important; }
            `,
        });
        await page.evaluate(() => document.fonts.ready);
        await page.waitForFunction(() => document.querySelector('canvas') && [...document.images].every(i => i.complete || i.loading === 'lazy'));
        // entrance animations done, the wave a little way into its motion
        await page.waitForTimeout(3200);
        await page.screenshot({ path: `public/og/${lang}.jpg`, type: 'jpeg', quality: 88 });
    }
}
