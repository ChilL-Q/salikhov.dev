"""
Hero portrait, from the source photo to the files the site ships:

    source.jpg + subject-mask.png → cut-out (armchairs removed) → JPEG block seams evened out → 4:5 crop with
    dissolving edges, upscaled once with Lanczos → light sharpening
    → src/assets/portrait/portrait-{480,720,960,1200}.{avif,webp}

    python3 scripts/portrait/build.py [--out DIR]

Needs the versions in requirements.txt, avifenc (built with aom) and cwebp; other versions can round
differently. subject-mask.png is Apple Vision's subject lift for source.jpg (subject-mask.swift, macOS 14+);
it's kept here so the build doesn't depend on the OS.

source.jpg is the camera photo after an AI edit that lit the near arm and the shoulder, so nothing is lifted
or painted here (the camera export had them clipped to black; the lift for that version is in git history).
It is 843×1264, so the crop (~696 px wide) is upscaled ×1.73 to 1200×1500 in one Lanczos step: no ML upscaler,
those invent skin texture and make it plastic. Before that the JPEG's 8×8 block seams are evened out (colour
more than lightness) so the grid doesn't show once enlarged; after it a light unsharp mask on lightness brings
back about the camera file's crispness without halos.

Coordinates are source.jpg pixels. The frame is the one the site has used since the first portrait: mapped
from the camera export with the transform that aligns the two files (scale 2.0285, shift 1.1/5.1 px, from
background features), so the face sits where it did and the phone layout's face centring still holds.
"""
import argparse
import subprocess
import tempfile
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
WIDTHS = (480, 720, 960, 1200)

# the 4:5 frame: width, horizontal centre, air above the hair (share of the frame height), row where the bottom
# dissolve starts, share of the width faded at the side edges, columns searched for the top of the hair
FRAME = dict(src_w=695.6, center_x=340.6, air=0.09, fade_from=998.2, side=0.04, head_cols=(197, 492))
OUT_W, OUT_H = 1200, 1500

# where the maroon armchairs show inside Vision's mask: the chair back behind the near shoulder, the chair arm
# under the near forearm, the chair behind the far arm, the one in front at the bottom
CHAIR_AREAS = [
    [(55, 640), (135, 640), (135, 900), (55, 900)],
    [(225, 990), (390, 990), (390, 1180), (225, 1180)],
    [(500, 870), (725, 870), (725, 1000), (500, 1000)],
    [(470, 1140), (780, 1140), (780, 1264), (470, 1264)],
]


def subject_alpha(rgb, mask):
    """Vision's mask, minus the maroon armchairs, contour pulled in ~0.5 px and re-softened."""
    a = mask.astype(np.float32) / 255
    # the armchairs: hue 10–30° against skin's ~50° and the black shirt, only where the chairs actually are
    # (the lips and the collar's stripe are maroon too)
    lab = cv2.cvtColor(cv2.GaussianBlur(rgb / 255, (0, 0), 1.0), cv2.COLOR_RGB2Lab)
    hue = np.degrees(np.arctan2(lab[..., 2], lab[..., 1]))
    maroon = (np.hypot(lab[..., 1], lab[..., 2]) > 8) & (hue > -30) & (hue < 32) & (lab[..., 0] > 3) & (lab[..., 0] < 55)
    area = Image.new('L', (a.shape[1], a.shape[0]), 0)
    for points in CHAIR_AREAS:
        ImageDraw.Draw(area).polygon(points, fill=255)
    chair = (maroon & (np.asarray(area) > 0) & (a > 0.02)).astype(np.uint8) * 255
    chair = cv2.morphologyEx(chair, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
    chair = cv2.morphologyEx(chair, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
    chair = cv2.GaussianBlur(cv2.dilate(chair, np.ones((3, 3), np.uint8)).astype(np.float32) / 255, (0, 0), 0.8)
    a = a * (1 - chair)
    am = Image.fromarray((a * 255).round().astype(np.uint8)).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.6))
    return np.asarray(am).astype(np.float32) / 255


def soften_blocks(rgb, threshold=8.0):
    """JPEG 8×8 blocks and 16×16 colour blocks, softened before the enlargement.

    Colour: a 1.5 px blur of Cr/Cb (the eye reads detail from lightness). Lightness: only the seams between
    8×8 blocks, and only small steps across them (a real edge is left alone): the two pixels on each side move
    towards each other, like a video decoder's weak deblocking filter. Texture inside the blocks is untouched.
    """
    ycc = cv2.cvtColor(np.clip(rgb, 0, 255).astype(np.uint8), cv2.COLOR_RGB2YCrCb).astype(np.float32)
    for c in (1, 2):
        ycc[..., c] = cv2.GaussianBlur(ycc[..., c], (0, 0), 1.5)
    y = ycc[..., 0]
    for axis in (1, 0):
        y = np.moveaxis(y, axis, 1)
        seam = np.arange(7, y.shape[1] - 2, 8)          # last column of each block
        p1, p0, q0, q1 = (y[:, seam + k].copy() for k in (-1, 0, 1, 2))
        step = q0 - p0
        delta = step * np.clip(1 - np.abs(step) / threshold, 0, 1)
        y[:, seam] = p0 + delta / 3
        y[:, seam + 1] = q0 - delta / 3
        y[:, seam - 1] = p1 + delta / 6
        y[:, seam + 2] = q1 - delta / 6
        y = np.moveaxis(y, 1, axis)
    ycc[..., 0] = y
    return cv2.cvtColor(np.clip(ycc, 0, 255).round().astype(np.uint8), cv2.COLOR_YCrCb2RGB).astype(np.float32)


def decontaminate(rgb, alpha):
    """Partly transparent edge pixels take the colour of the solid interior next to them."""
    solid = alpha > 0.97
    pre = Image.fromarray((rgb * solid[..., None]).astype(np.uint8)).filter(ImageFilter.GaussianBlur(2.5))
    den = np.asarray(Image.fromarray((solid * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(2.5))).astype(np.float32) / 255
    interior = np.asarray(pre).astype(np.float32) / np.maximum(den, 1e-3)[..., None]
    interior = np.where(den[..., None] > 0.02, np.clip(interior, 0, 255), rgb)
    w = (np.clip((0.97 - alpha) / 0.97, 0, 1) * (alpha > 0.002))[..., None]
    return rgb * (1 - w) + interior * w


def frame(rgb, alpha):
    """The 4:5 crop: bottom and sides dissolving, the old CSS grade baked in, black at 0, upscaled once."""
    height, width = alpha.shape
    c0, c1 = FRAME['head_cols']
    rows = np.where((alpha[:, c0:c1] > 0.5).any(axis=1))[0]
    head_top = int(rows.min())
    src_w, src_h = FRAME['src_w'], FRAME['src_w'] * OUT_H / OUT_W
    top = head_top - FRAME['air'] * src_h
    x0 = FRAME['center_x'] - src_w / 2
    box = (x0, top, x0 + src_w, top + src_h)

    a = alpha.copy()
    t = np.clip((np.arange(height, dtype=np.float32) - FRAME['fade_from']) / max(box[3] - FRAME['fade_from'], 1), 0, 1)
    a *= (1 - t * t * (3 - 2 * t))[:, None]
    xs = np.arange(width, dtype=np.float32)
    fade_w = FRAME['side'] * src_w
    left, right = np.clip((xs - box[0]) / fade_w, 0, 1), np.clip((box[2] - xs) / fade_w, 0, 1)
    a *= np.minimum(left * left * (3 - 2 * left), right * right * (3 - 2 * right))[None, :]

    # the grade the site has always had (saturation ×1.06, ×0.97), and the black point at 0 per channel
    lum = (rgb @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32))[..., None]
    graded = np.clip((lum + (rgb - lum) * 1.06) * 0.97, 0, 255)
    black = np.percentile(graded[alpha > 0.98], 0.5, axis=0)
    graded = np.clip((graded - black) / (255 - black) * 255, 0, 255)

    # one resampling: the fractional crop box straight to 1200×1500, premultiplied so edges don't darken
    premult = np.dstack([graded * a[..., None], a * 255]).astype(np.float32)
    scale_x, scale_y = OUT_W / src_w, OUT_H / src_h
    m = np.float32([[scale_x, 0, -box[0] * scale_x], [0, scale_y, -box[1] * scale_y]])
    out = cv2.warpAffine(premult, m, (OUT_W, OUT_H), flags=cv2.INTER_LANCZOS4, borderMode=cv2.BORDER_CONSTANT, borderValue=0)
    alpha_out = np.clip(out[..., 3], 0, 255)
    rgb_out = np.clip(out[..., :3] / np.maximum(alpha_out[..., None] / 255, 1e-3), 0, 255)
    rgba = np.dstack([rgb_out, alpha_out]).round().astype(np.uint8)
    rgba[rgba[..., 3] < 2] = 0  # nothing hidden under transparency
    return Image.fromarray(rgba, 'RGBA')


def sharpen(portrait, amount=0.5, radius=1.2):
    """Light unsharp mask on lightness after the ×1.73 enlargement, about what the camera file had.

    The blur is weighted by alpha, so the transparent surround (stored as black) doesn't pull the edge and
    draw a light rim on the silhouette. Colour isn't sharpened.
    """
    rgba = np.asarray(portrait).astype(np.float32)
    a = rgba[..., 3] / 255
    lab = cv2.cvtColor(rgba[..., :3] / 255, cv2.COLOR_RGB2Lab)
    L = lab[..., 0]
    blur = cv2.GaussianBlur(L * a, (0, 0), radius) / np.maximum(cv2.GaussianBlur(a, (0, 0), radius), 1e-3)
    lab[..., 0] = np.where(a > 0, L + amount * (L - blur), L)
    rgb = np.clip(cv2.cvtColor(lab, cv2.COLOR_Lab2RGB), 0, 1) * 255
    out = np.dstack([rgb, rgba[..., 3]]).round().astype(np.uint8)
    out[out[..., 3] < 2] = 0
    return Image.fromarray(out, 'RGBA')


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--out', type=Path, default=ROOT / 'src/assets/portrait')
    args = parser.parse_args()

    src = np.asarray(Image.open(HERE / 'source.jpg').convert('RGB')).astype(np.float32)
    mask = np.asarray(Image.open(HERE / 'subject-mask.png').convert('L'))
    alpha = subject_alpha(src, mask)
    portrait = sharpen(frame(decontaminate(soften_blocks(src), alpha), alpha))

    args.out.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        for width in WIDTHS:
            height = round(width * OUT_H / OUT_W)
            # resample with premultiplied alpha, so the dissolving edges don't pick up dark fringes
            image = portrait if width == OUT_W else portrait.convert('RGBa').resize((width, height), Image.LANCZOS).convert('RGBA')
            png = Path(tmp) / f'portrait-{width}.png'
            image.save(png)
            subprocess.run(['avifenc', '-c', 'aom', '-q', '60', '--qalpha', '80', '-s', '4', '-j', 'all', str(png), str(args.out / f'portrait-{width}.avif')], check=True, capture_output=True)
            subprocess.run(['cwebp', '-quiet', '-q', '80', '-m', '6', '-sharp_yuv', '-alpha_q', '90', str(png), '-o', str(args.out / f'portrait-{width}.webp')], check=True)
    print(f'→ {args.out}')


if __name__ == '__main__':
    main()
