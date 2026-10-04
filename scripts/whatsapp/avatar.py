"""
WhatsApp Business profile photo: 1024×1024, the site's portrait (same cut-out, grade and black point 0 as
scripts/portrait/build.py) on black, framed for WhatsApp's circle: the face in the centre of the circle, the
shoulders inside it. A second version adds a soft orange glow from below, the wave's light.

    python3 scripts/whatsapp/avatar.py        → exports/whatsapp/avatar.png, avatar-glow.png

Framing, in source.jpg pixels: the face's centre is the centre of Vision's face box (316, 445; the pupils at 406,
the mouth at 481), so the eyes land at ~43 % of the height; a 235 px radius keeps the hair with air above it and
the shoulders (x 126–526 at y 650) inside the circle.
"""
import sys
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
sys.path.insert(0, str(ROOT / 'scripts/portrait'))
import build as portrait  # noqa: E402

FACE = (316.0, 445.0)
RADIUS = 235.0
SIZE = 1024
ACCENT = np.array([255, 122, 26], np.float32)   # --accent-rgb


def render(glow):
    src = np.asarray(Image.open(portrait.HERE / 'source.jpg').convert('RGB')).astype(np.float32)
    alpha = portrait.subject_alpha(src, np.asarray(Image.open(portrait.HERE / 'subject-mask.png').convert('L')))
    rgb = portrait.decontaminate(portrait.soften_blocks(src), alpha)

    # the site's grade: saturation ×1.06, ×0.97, black point at 0 per channel
    lum = (rgb @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32))[..., None]
    graded = np.clip((lum + (rgb - lum) * 1.06) * 0.97, 0, 255)
    black = np.percentile(graded[alpha > 0.98], 0.5, axis=0)
    graded = np.clip((graded - black) / (255 - black) * 255, 0, 255)

    # one resampling: the square around the face straight to 1024×1024, premultiplied
    scale = SIZE / (2 * RADIUS)
    m = np.float32([[scale, 0, -(FACE[0] - RADIUS) * scale], [0, scale, -(FACE[1] - RADIUS) * scale]])
    premult = np.dstack([graded * alpha[..., None], alpha * 255]).astype(np.float32)
    out = cv2.warpAffine(premult, m, (SIZE, SIZE), flags=cv2.INTER_LANCZOS4, borderMode=cv2.BORDER_CONSTANT, borderValue=0)
    a = np.clip(out[..., 3] / 255, 0, 1)[..., None]
    figure = np.clip(out[..., :3], 0, 255)   # premultiplied: over black it is the final colour

    background = np.zeros((SIZE, SIZE, 3), np.float32)
    if glow:
        # warm light rising from below, behind the figure: strongest at the bottom edge, gone by the chin
        ys, xs = np.mgrid[0:SIZE, 0:SIZE].astype(np.float32)
        d = np.hypot((xs - SIZE / 2) / (SIZE * 0.62), (ys - SIZE * 1.12) / (SIZE * 0.62))
        strength = np.clip(1 - d, 0, 1) ** 1.8 * 0.55
        background = ACCENT * strength[..., None]
    image = figure + background * (1 - a)

    # light sharpening of lightness after the ×2 enlargement, like the site's portrait
    lab = cv2.cvtColor(np.clip(image, 0, 255).astype(np.float32) / 255, cv2.COLOR_RGB2Lab)
    L = lab[..., 0]
    lab[..., 0] = L + 0.5 * (L - cv2.GaussianBlur(L, (0, 0), 1.2))
    image = np.clip(cv2.cvtColor(lab, cv2.COLOR_Lab2RGB), 0, 1) * 255
    return Image.fromarray(image.round().astype(np.uint8), 'RGB')


def main():
    out = ROOT / 'exports/whatsapp'
    out.mkdir(parents=True, exist_ok=True)
    render(glow=False).save(out / 'avatar.png', optimize=True)
    render(glow=True).save(out / 'avatar-glow.png', optimize=True)
    print(f'→ {out}')


if __name__ == '__main__':
    main()
