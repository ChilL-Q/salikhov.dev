"""
Previews for the WhatsApp Business cover and avatar (exports/whatsapp/):
- preview-<layout>.png: the cover and the avatar as a business profile shows them on a 390 px phone (dark theme):
  the cover across the width, the round photo over its lower edge, the camera button at its bottom right;
- safe-zones.png: the cover with the zones it's designed around (see scripts/whatsapp/cover.js).

    python3 scripts/whatsapp/preview.py      (after cover.js and avatar.py)

Geometry measured on an iPhone in the WhatsApp Business app (profile edit screen, 1170 px wide screenshot), as
shares of the 16:9 cover (the profile shows only its band 11–89 %, at ~2.27:1):
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

VISIBLE = (0.11, 0.89)          # the band of the cover's height the profile shows
PHOTO_D = 0.32                  # the round photo's diameter, share of the width
PHOTO_TOP = 0.42                # its top, share of the cover's height (40 % of the visible band)
CAMERA = (0.92, 0.80)           # the camera button's centre: share of the width, of the visible band's height
CAMERA_D = 0.104                # its diameter, share of the width
TEXT_BAND = (0.12, 0.37)        # where cover.js puts all the text


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


def camera_button(canvas, cx, cy, r=20 * S):
    d = ImageDraw.Draw(canvas)
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=(32, 44, 51), outline=(60, 75, 84), width=S)
    # a small camera glyph
    w, h = 18 * S, 13 * S
    d.rounded_rectangle((cx - w // 2, cy - h // 2 + S, cx + w // 2, cy + h // 2 + S), radius=3 * S, outline=TEXT, width=int(1.6 * S))
    d.rectangle((cx - 4 * S, cy - h // 2 - S, cx + 4 * S, cy - h // 2 + S), fill=TEXT)
    d.ellipse((cx - 4 * S, cy - 3 * S, cx + 4 * S, cy + 5 * S), outline=TEXT, width=int(1.6 * S))


def profile(cover, avatar, label):
    cover = cover.convert('RGB')
    cw, ch = cover.size
    band = cover.crop((0, round(ch * VISIBLE[0]), cw, round(ch * VISIBLE[1])))
    banner_h = round(W * band.height / band.width)              # ~2.27:1
    status_h, bar_h = 44 * S, 56 * S
    H = status_h + bar_h + banner_h + 420 * S
    canvas = Image.new('RGB', (W, H), BG)
    d = ImageDraw.Draw(canvas)
    d.text((20 * S, 14 * S), '9:41', fill=TEXT, font=font(15, 600))
    # the edit screen's top bar
    ax, ay = 26 * S, status_h + bar_h // 2
    d.line((ax, ay, ax + 16 * S, ay), fill=TEXT, width=2 * S)
    d.line((ax, ay, ax + 7 * S, ay - 7 * S), fill=TEXT, width=2 * S)
    d.line((ax, ay, ax + 7 * S, ay + 7 * S), fill=TEXT, width=2 * S)
    d.text((56 * S, ay - 11 * S), 'Edit profile', fill=TEXT, font=font(18, 600))
    top = status_h + bar_h
    canvas.paste(band.resize((W, banner_h), Image.LANCZOS), (0, top))
    # the camera button, where the app puts it
    camera_button(canvas, round(W * CAMERA[0]), top + round(banner_h * CAMERA[1]), round(W * CAMERA_D / 2))
    # the round photo: centred, its top at 42 % of the cover's height, i.e. 40 % of the visible banner
    dia = round(W * PHOTO_D)
    photo_top = top + round(banner_h * (PHOTO_TOP - VISIBLE[0]) / (VISIBLE[1] - VISIBLE[0]))
    ring = 3 * S
    d.ellipse((W // 2 - dia // 2 - ring, photo_top - ring, W // 2 + dia // 2 + ring, photo_top + dia + ring), fill=BG)
    photo, mask = circle(avatar, dia)
    canvas.paste(photo, (W // 2 - dia // 2, photo_top), mask)
    y = photo_top + dia + 18 * S
    for text, size, weight, colour in (('Edit', 15, 500, (37, 211, 102)), ('salikhov.dev', 22, 500, TEXT)):
        f = font(size, weight)
        d.text(((W - d.textlength(text, font=f)) / 2, y), text, fill=colour, font=f)
        y += (size + 18) * S
    d.text((20 * S, y + 6 * S), 'Business info', fill=TEXT, font=font(19, 700))
    # caption above the phone
    sheet = Image.new('RGB', (W + 40 * S, H + 60 * S), (40, 40, 40))
    ImageDraw.Draw(sheet).text((20 * S, 14 * S), label, fill=(255, 255, 255), font=ImageFont.truetype(CAPTION, 15 * S))
    sheet.paste(canvas, (20 * S, 46 * S))
    return sheet


def safe_zones(cover):
    img = cover.convert('RGBA')
    w, h = img.size
    over = Image.new('RGBA', img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(over)
    red, red_strong, green = (255, 70, 70, 95), (255, 70, 70, 140), (60, 220, 120, 70)
    # cut off in the profile: above 11 % and below 89 %
    d.rectangle((0, 0, w, round(h * VISIBLE[0])), fill=red)
    d.rectangle((0, round(h * VISIBLE[1]), w, h), fill=red)
    # the band for the text
    d.rectangle((0, round(h * TEXT_BAND[0]), w, round(h * TEXT_BAND[1])), outline=(60, 220, 120, 230), width=4, fill=green)
    # the round photo and the camera button, measured on the phone
    r = round(w * PHOTO_D / 2)
    top = round(h * PHOTO_TOP)
    d.ellipse((w // 2 - r, top, w // 2 + r, top + 2 * r), fill=red_strong, outline=(255, 255, 255, 200), width=3)
    visible_h = h * (VISIBLE[1] - VISIBLE[0])
    cx, cy, cr = round(w * CAMERA[0]), round(h * VISIBLE[0] + visible_h * CAMERA[1]), round(w * CAMERA_D / 2)
    d.ellipse((cx - cr, cy - cr, cx + cr, cy + cr), fill=red_strong, outline=(255, 255, 255, 200), width=3)
    out = Image.alpha_composite(img, over)
    f = ImageFont.truetype(CAPTION, 28)
    dd = ImageDraw.Draw(out)
    dd.text((24, round(h * VISIBLE[0]) + 8), 'видимая полоса профиля: 11–89 %', fill=(255, 255, 255, 230), font=f)
    dd.text((24, round(h * TEXT_BAND[1]) - 40), 'текст: 12–37 %', fill=(160, 255, 190, 255), font=f)
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
