"""
Previews for the WhatsApp Business cover and avatar (exports/whatsapp/):
- preview-<layout>.png: the cover and the avatar as a business profile shows them on a 390 px phone (dark theme):
  the cover across the width, the round photo over its lower edge, the camera button at its bottom right;
- safe-zones.png: the cover with the zones it's designed around (see scripts/whatsapp/cover.js).

    python3 scripts/whatsapp/preview.py      (after cover.js and avatar.py)

The profile's proportions are a schematic of the current app, not a spec (Meta publishes none): photo ≈ 31 % of
the screen width, centred on the cover's lower edge; camera button 40 px, 12 px from the corner.
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'exports/whatsapp'
INTER = ROOT / 'src/assets/fonts/inter-latin.woff2'
CAPTION = '/System/Library/Fonts/Supplemental/Arial Unicode.ttf'   # captions in Russian (the Inter file is latin only)
S = 3                                   # render at 3× a 390 px phone
W = 390 * S
BG = (11, 20, 26)                       # WhatsApp dark background
TEXT, MUTED = (233, 237, 239), (134, 150, 160)


def font(size, weight=400):
    try:
        f = ImageFont.truetype(str(INTER), size * S)
        f.set_variation_by_axes([weight])
        return f
    except Exception:
        return ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Unicode.ttf', size * S)


def circle(image, d):
    image = image.convert('RGB').resize((d, d), Image.LANCZOS)
    mask = Image.new('L', (d * 4, d * 4), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, d * 4 - 1, d * 4 - 1), fill=255)
    return image, mask.resize((d, d), Image.LANCZOS)


def camera_button(canvas, cx, cy):
    r = 20 * S
    d = ImageDraw.Draw(canvas)
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=(32, 44, 51), outline=(60, 75, 84), width=S)
    # a small camera glyph
    w, h = 18 * S, 13 * S
    d.rounded_rectangle((cx - w // 2, cy - h // 2 + S, cx + w // 2, cy + h // 2 + S), radius=3 * S, outline=TEXT, width=int(1.6 * S))
    d.rectangle((cx - 4 * S, cy - h // 2 - S, cx + 4 * S, cy - h // 2 + S), fill=TEXT)
    d.ellipse((cx - 4 * S, cy - 3 * S, cx + 4 * S, cy + 5 * S), outline=TEXT, width=int(1.6 * S))


def profile(cover, avatar, label):
    cover_h = round(W * 9 / 16)
    status_h = 44 * S
    H = status_h + cover_h + 420 * S
    canvas = Image.new('RGB', (W, H), BG)
    d = ImageDraw.Draw(canvas)
    d.text((20 * S, 14 * S), '9:41', fill=TEXT, font=font(15, 600))
    canvas.paste(cover.convert('RGB').resize((W, cover_h), Image.LANCZOS), (0, status_h))
    # back arrow over the cover, as the app draws it
    ax, ay = 22 * S, status_h + 22 * S
    d.line((ax, ay, ax + 16 * S, ay), fill=TEXT, width=2 * S)
    d.line((ax, ay, ax + 7 * S, ay - 7 * S), fill=TEXT, width=2 * S)
    d.line((ax, ay, ax + 7 * S, ay + 7 * S), fill=TEXT, width=2 * S)
    cover_bottom = status_h + cover_h
    camera_button(canvas, W - 32 * S, cover_bottom - 32 * S)
    # the round photo, centred on the cover's lower edge, with a ring in the page colour
    dia = round(W * 0.31)
    ring = 4 * S
    d.ellipse((W // 2 - dia // 2 - ring, cover_bottom - dia // 2 - ring, W // 2 + dia // 2 + ring, cover_bottom + dia // 2 + ring), fill=BG)
    photo, mask = circle(avatar, dia)
    canvas.paste(photo, (W // 2 - dia // 2, cover_bottom - dia // 2), mask)
    y = cover_bottom + dia // 2 + 16 * S
    for text, size, weight, colour in (('Chingiz Salikhov', 22, 600, TEXT), ('Business account', 14, 400, MUTED)):
        f = font(size, weight)
        tw = d.textlength(text, font=f)
        d.text(((W - tw) / 2, y), text, fill=colour, font=f)
        y += (size + 10) * S
    # action buttons row
    y += 14 * S
    for i, name in enumerate(('Message', 'Audio', 'Video', 'Search')):
        bw, gap = 80 * S, 10 * S
        x = (W - (4 * bw + 3 * gap)) // 2 + i * (bw + gap)
        d.rounded_rectangle((x, y, x + bw, y + 64 * S), radius=14 * S, outline=(42, 57, 66), width=S)
        f = font(12, 500)
        d.text((x + (bw - d.textlength(name, font=f)) / 2, y + 40 * S), name, fill=TEXT, font=f)
    y += 90 * S
    d.text((20 * S, y), 'salikhov.dev', fill=(83, 189, 235), font=font(15, 500))
    d.text((20 * S, y + 26 * S), 'Website', fill=MUTED, font=font(13))
    # caption above the phone
    sheet = Image.new('RGB', (W + 40 * S, H + 60 * S), (40, 40, 40))
    ImageDraw.Draw(sheet).text((20 * S, 14 * S), label, fill=(255, 255, 255), font=ImageFont.truetype(CAPTION, 15 * S))
    sheet.paste(canvas, (20 * S, 46 * S))
    return sheet


def safe_zones(cover):
    img = cover.convert('RGB').copy()
    w, h = img.size
    over = Image.new('RGBA', img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(over)
    red = (255, 70, 70, 90)
    # edges a phone may crop (8 %), top and bottom a 2:1 display may trim (8 %)
    m_x, m_y = round(w * 0.08), round(h * 0.08)
    for box in ((0, 0, m_x, h), (w - m_x, 0, w, h), (0, 0, w, m_y), (0, h - m_y, w, h)):
        d.rectangle(box, fill=red)
    # the round photo over the lower edge (≈31 % of the width), with a margin
    r = round(w * 0.31 / 2 * 1.12)
    d.ellipse((w // 2 - r, h - r, w // 2 + r, h + r), fill=(255, 70, 70, 130))
    # the camera button
    c = round(w * 40 / 390)
    off = round(w * 12 / 390)
    d.ellipse((w - off - c, h - off - c, w - off, h - off), fill=(255, 70, 70, 130))
    # 2:1 display: what's left visible
    trim = round((h - w / 2) / 2)
    d.line((0, trim, w, trim), fill=(255, 255, 255, 160), width=3)
    d.line((0, h - trim, w, h - trim), fill=(255, 255, 255, 160), width=3)
    out = Image.alpha_composite(img.convert('RGBA'), over)
    ImageDraw.Draw(out).text((m_x + 10, trim + 12), 'красное — может обрезаться или закрываться; белые линии — что остаётся при экране 2:1', fill=(255, 255, 255, 230), font=ImageFont.truetype(CAPTION, 30))
    return out.convert('RGB')


def main():
    avatar = Image.open(OUT / 'avatar.png')
    for layout, label in (('center', 'Обложка: текст по центру'), ('left', 'Обложка: текст слева')):
        cover = Image.open(OUT / f'cover-{layout}.png')
        profile(cover, avatar, label).save(OUT / f'preview-{layout}.png', optimize=True)
    safe_zones(Image.open(OUT / 'cover-center.png')).save(OUT / 'safe-zones-center.png', optimize=True)
    safe_zones(Image.open(OUT / 'cover-left.png')).save(OUT / 'safe-zones-left.png', optimize=True)
    print(f'→ {OUT}')


if __name__ == '__main__':
    main()
