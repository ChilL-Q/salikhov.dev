/**
 * WhatsApp Business cover (1920×1080, 16:9), shot from the built site like the OG cards: the hero's own dot wave,
 * Inter and the name's gradient; the portrait is hidden (the face is in the avatar). Two layouts: centred, left.
 *
 *   npm run build && npx vite preview --port 4173
 *   playwright-cli run-code --filename=scripts/whatsapp/cover.js     (from the repo root; writes exports/whatsapp/)
 *
 * Safe zone (Meta publishes no spec, sources give 1211×681, 1125×600 or 1920×1080; designed for the strictest):
 * - sides: phones crop the edges, so nothing within 8 % of either side;
 * - top and bottom: a wider display (up to 2:1) trims ~5.5 % each, so nothing within 8 %;
 * - bottom centre: the round profile photo overlaps the cover's lower edge (≈31 % of the width across, centred on
 *   the edge), so nothing below y ≈ 700 in the middle third;
 * - bottom right: the camera button.
 * The text sits in y ≈ 180–560 (of 1080); the wave fills the bottom, where only decoration may be covered.
 */
async page => {
    const base = 'http://localhost:4173';
    // laid out at 960×540 and shot at 2×: crisp text at 1920×1080, while the wave's canvas renders at 1× and is
    // scaled up, so its dots are as big, relative to the cover, as the hero's on a phone (at 1920 wide they vanish
    // once WhatsApp shrinks the cover to a phone's width)
    const context = await page.context().browser().newContext({ viewport: { width: 960, height: 540 }, deviceScaleFactor: 2 });
    await context.addInitScript(() => Object.defineProperty(window, 'devicePixelRatio', { get: () => 1 }));
    const shot = await context.newPage();
    const layouts = {
        center: '.wa-cover { left: 0; right: 0; text-align: center; align-items: center; }',
        left: '.wa-cover { left: 80px; right: 80px; text-align: left; align-items: flex-start; }',
    };
    for (const [name, layout] of Object.entries(layouts)) {
        await shot.goto(base + '/en');
        await shot.addStyleTag({
            content: `
                nav, .hero-copy, .hero-portrait, .hero-scroll, .skip-link { display: none !important; }
                .hero-section { min-height: 540px !important; height: 540px; padding: 0 !important; }
                .wa-cover { position: absolute; top: 92px; z-index: 2; display: flex; flex-direction: column; font-family: var(--font-display); }
                .wa-logo { font-size: 82px; font-weight: 800; letter-spacing: -0.035em; line-height: 1.05; color: var(--text-primary); }
                .wa-tag { margin-top: 16px; font-size: 30px; font-weight: 600; letter-spacing: -0.4px; line-height: 1.25; }
                .wa-role { margin-top: 10px; font-size: 23px; color: var(--text-secondary); line-height: 1.4; }
                ${layout}
            `,
        });
        await shot.evaluate(() => {
            const cover = document.createElement('div');
            cover.className = 'wa-cover';
            cover.innerHTML = '<div class="wa-logo">salikhov<span class="shimmer-text">.dev</span></div>'
                + '<p class="wa-tag"><span class="gradient-text">If you can imagine it, I can code it.</span></p>'
                + '<p class="wa-role">Full Stack Developer &amp; AI Enthusiast</p>';
            document.querySelector('.hero-section').appendChild(cover);
        });
        await shot.evaluate(() => document.fonts.ready);
        await shot.waitForFunction(() => document.querySelector('canvas'));
        await shot.waitForTimeout(3200);
        await shot.screenshot({ path: `exports/whatsapp/cover-${name}.png` });
        await shot.screenshot({ path: `exports/whatsapp/cover-${name}.jpg`, type: 'jpeg', quality: 92 });
    }
    await context.close();
}
