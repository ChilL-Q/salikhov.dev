/**
 * WhatsApp Business cover (1920×1080, 16:9), shot from the built site like the OG cards: the hero's own dot wave,
 * Inter and the name's gradient; the portrait is hidden (the face is in the avatar). Two layouts: centred, left.
 *
 *   npm run build && npx vite preview --port 4173
 *   playwright-cli run-code --filename=scripts/whatsapp/cover.js     (from the repo root; writes exports/whatsapp/)
 *
 * Geometry measured on an iPhone in the WhatsApp Business app (profile edit screen), in 1920×1080 cover pixels:
 * - the upload crop is 16:9, but the profile shows the banner at ~2.27:1, so only y 119–961 (11–89 %) is visible;
 * - the round profile photo: centred, 32 % of the width across (radius 307), its top at y 456 (42 %);
 * - the camera button: centred at x 1766, y 793 (92 % / 80 % of the visible banner).
 * So all the text sits in y 130–400 (12–37 %), above the photo; the wave fills the lower part, where it shows on
 * both sides of the photo. "Full Stack Developer & AI Enthusiast" is left out: on one line with the slogan it would
 * be ~7 px tall on a phone.
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
                /* the text block in y 65–200 of 540 (12–37 %), centred in that band */
                .wa-cover { position: absolute; top: 69px; z-index: 2; display: flex; flex-direction: column; font-family: var(--font-display); }
                .wa-logo { font-size: 72px; font-weight: 800; letter-spacing: -0.035em; line-height: 1.05; color: var(--text-primary); }
                .wa-tag { margin-top: 12px; font-size: 30px; font-weight: 600; letter-spacing: -0.4px; line-height: 1.25; }
                /* the wave a little lower: its horizon below the text, its dots on both sides of the photo */
                .hero-dots { transform: translateY(22px); }
                ${layout}
            `,
        });
        await shot.evaluate(() => {
            const cover = document.createElement('div');
            cover.className = 'wa-cover';
            cover.innerHTML = '<div class="wa-logo">salikhov<span class="shimmer-text">.dev</span></div>'
                + '<p class="wa-tag"><span class="gradient-text">If you can imagine it, I can code it.</span></p>';
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
