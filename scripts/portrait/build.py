"""
Hero portrait, from the original photo to the files the site ships:

    original.jpg + subject-mask.png → cut-out → shadow side lifted → near arm's skin matched to the far
    arm → 4:5 crop with dissolving edges → src/assets/portrait/portrait-{480,720,960,1200}.{avif,webp}

    python3 scripts/portrait/build.py [--shadows none|light|medium|strong] [--near-arm 0..1] [--out DIR]

Needs the versions in requirements.txt, avifenc (built with aom) and cwebp; other versions can round differently. subject-mask.png is Apple Vision's subject lift
for original.jpg (subject-mask.swift, macOS 14+); it's kept here so the build doesn't depend on the OS.

The flash comes from the right, so the left side of the figure falls into shadow. The lift works only
where the file has data: the shoulder, the sleeve and the left of the chest are 0–2 of 255 in this
export (clipped to black, about 38 % of the torso), there's nothing to bring back there and it stays
black. The skin of the upper arm (≈ 18, 9, 3) and the shirt's shadows next to the light are lifted with
a monotone shadows curve on the smoothed illumination, so folds keep their contrast and nothing swaps
light for dark. The lifted skin takes the hue of the lit forearm: at 2–3 of 255 in blue the shadow's own
colour is noise. Outside the lift (face, neck, the lit side) pixels stay exactly as in the original.

The near arm's skin then takes the far arm's colour and lightness: its large-scale shading is mapped
onto the far arm's by quantiles (monotone, so the arm keeps its form) as an offset in L*, which moves the
level without amplifying noise. The upper arm, which has tone but almost no texture in the file, gets a
soft inward contour and grain with the lit forearm's spectrum (upper_arm_finish). The bottom dissolve
starts below the near forearm, and the maroon armchair under it, which Vision counts as part of the
subject, is cut out.
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

# extra stops of light for the darkest shirt / skin areas on the shadow side
SHADOWS = {'none': (0.0, 0.0), 'light': (0.8, 2.0), 'medium': (1.4, 3.0), 'strong': (2.0, 4.0)}

# the 4:5 frame in source pixels: width, horizontal centre, air above the hair, row where the bottom
# dissolve starts, share of the width faded at the side edges
FRAME = dict(src_w=1411.0, center_x=692.0, air=0.09, fade_from=2030.0, side=0.04)
OUT_W, OUT_H = 1200, 1500

# the lit forearm, the reference for lifted skin: median CIE L*a*b* of original.jpg at x 600–950, y 1950–2100,
# before the grade
SKIN_REF = (44.0, 15.0, 17.4)


def smoothstep(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)


def to_linear(c):
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)


def to_srgb(c):
    c = np.clip(c, 0, 1)
    return np.where(c <= 0.0031308, c * 12.92, 1.055 * c ** (1 / 2.4) - 0.055)


def guided_filter(guide, src, radius, eps):
    k = (2 * radius + 1, 2 * radius + 1)
    mean_i, mean_p = cv2.boxFilter(guide, -1, k), cv2.boxFilter(src, -1, k)
    cov = cv2.boxFilter(guide * src, -1, k) - mean_i * mean_p
    var = cv2.boxFilter(guide * guide, -1, k) - mean_i * mean_i
    a = cov / (var + eps)
    b = mean_p - a * mean_i
    return cv2.boxFilter(a, -1, k) * guide + cv2.boxFilter(b, -1, k)


# the dark chair back behind the right shoulder is part of Vision's mask: cut along the arm line
CHAIR_CUT = [(0, 1340), (243, 1340), (226, 1420), (234, 1640), (252, 1700), (258, 1850), (258, 2576), (0, 2576)]
# the shadow side, below the collar (face, neck and the lit right side stay out), and the upper arm's skin
SHADOW_SIDE = [(0, 1240), (300, 1210), (470, 1250), (600, 1350), (720, 1390), (770, 1390), (770, 2576), (0, 2576)]
UPPER_ARM = [(230, 1630), (520, 1630), (570, 1760), (610, 1890), (560, 1990), (400, 2000), (230, 1960)]
# the near arm (upper arm to wrist) and the lit far arm, whose skin is the reference
NEAR_ARM = [(230, 1630), (520, 1630), (600, 1840), (760, 1930), (1080, 2120), (1080, 2420), (880, 2420), (470, 2090), (230, 1960)]
FAR_ARM = [(1020, 1500), (1180, 1480), (1500, 1880), (1600, 2200), (1350, 2200), (1060, 1800)]
# where the maroon armchair shows inside Vision's mask: under the near forearm and behind the far arm
CHAIR_AREAS = [[(470, 2030), (790, 2030), (790, 2300), (470, 2300)], [(1040, 1800), (1390, 1800), (1390, 2010), (1040, 2010)]]


def soft_polygon(points, shape, feather):
    canvas = Image.new('L', (shape[1], shape[0]), 0)
    ImageDraw.Draw(canvas).polygon(points, fill=255)
    return cv2.GaussianBlur(np.asarray(canvas).astype(np.float32) / 255, (0, 0), feather)


def subject_alpha(rgb, mask):
    """Vision's mask, minus the bar light behind the hair and the chair back, contour pulled in ~1 px and re-softened."""
    a = mask.astype(np.float32) / 255
    inner = np.asarray(Image.fromarray(mask).filter(ImageFilter.MinFilter(17))).astype(np.float32) / 255
    lum = rgb @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    leak = (a > 0.02) & (inner < 0.5) & (lum > 28)
    leak[:, :780] = False
    leak[650:] = False
    kill = Image.fromarray((leak * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.GaussianBlur(1.5))
    a = a * (1 - np.asarray(kill).astype(np.float32) / 255)
    am = Image.fromarray((a * 255).round().astype(np.uint8)).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.0))
    a = np.asarray(am).astype(np.float32) / 255
    # cut before the lift and the edge clean-up, so both see the final silhouette of the arm
    cut = Image.new('L', (a.shape[1], a.shape[0]), 0)
    ImageDraw.Draw(cut).polygon(CHAIR_CUT, fill=255)
    a = a * (1 - np.asarray(cut.filter(ImageFilter.GaussianBlur(2))).astype(np.float32) / 255)
    # the maroon armchair: hue 10–30° against skin's ~50°, only where the chair actually is
    lab = cv2.cvtColor(cv2.GaussianBlur(rgb / 255, (0, 0), 1.5), cv2.COLOR_RGB2Lab)
    hue = np.degrees(np.arctan2(lab[..., 2], lab[..., 1]))
    maroon = (np.hypot(lab[..., 1], lab[..., 2]) > 8) & (hue > -30) & (hue < 32) & (lab[..., 0] > 3) & (lab[..., 0] < 55)
    area = Image.new('L', (a.shape[1], a.shape[0]), 0)
    for points in CHAIR_AREAS:
        ImageDraw.Draw(area).polygon(points, fill=255)
    chair = (maroon & (np.asarray(area) > 0) & (a > 0.05)).astype(np.uint8) * 255
    chair = cv2.morphologyEx(chair, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
    chair = cv2.morphologyEx(chair, cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))
    chair = cv2.GaussianBlur(cv2.dilate(chair, np.ones((3, 3), np.uint8)).astype(np.float32) / 255, (0, 0), 1.2)
    return a * (1 - chair)


def lift_shadows(src8, alpha, shirt_stops, skin_stops):
    if shirt_stops == 0 and skin_stops == 0:
        return src8.astype(np.float32)
    src = src8.astype(np.float32) / 255
    lin = to_linear(src)
    lum = lin @ np.array([0.2126, 0.7152, 0.0722], np.float32)

    # no data: the brightest channel at 0–2 of 255 over most of a neighbourhood; feathered, so the edge
    # of the clipped area gets no partial gain on its noise
    raw = (src8.max(axis=2) <= 2).astype(np.float32)
    clipped = cv2.GaussianBlur(smoothstep(0.3, 0.8, cv2.GaussianBlur(raw, (0, 0), 8)), (0, 0), 6)
    person = smoothstep(0.5, 0.95, alpha)
    side = soft_polygon(SHADOW_SIDE, alpha.shape, 45)
    # skin: warm and saturated on smoothed colour, and only on the upper arm (shirt and chair can be warm too)
    smooth = cv2.GaussianBlur(lin, (0, 0), 4)
    warm = smoothstep(0.42, 0.55, smooth[..., 0] / (smooth.sum(axis=2) + 1e-5))
    skin = warm * soft_polygon(UPPER_ARM, alpha.shape, 20)

    # illumination: log luminance smoothed along edges
    log_lum = np.log2(np.maximum(lum, 1e-4))
    base = 2 ** guided_filter(log_lum, log_lum, 24, 0.6)
    # a shadows curve, monotone by construction: dark surroundings get the full gain, bright ones none,
    # and a brighter pixel never comes out darker than a darker one next to it. The knee is per material:
    # the black shirt is ~0.5 % even where the flash hits it, so only its real shadows (well below) lift
    full = 2 ** (shirt_stops + skin * (skin_stops - shirt_stops))
    knee = np.float32(0.0015) + skin * np.float32(0.015 - 0.0015)
    gain = 1 + (full - 1) * knee / (knee + base)
    weight = side * person * (1 - clipped)
    gain = 1 + (gain - 1) * weight
    out8 = (to_srgb(lin * gain[..., None]) * 255).round().clip(0, 255).astype(np.uint8)

    # the gain lifts the noise too: denoise in proportion, luminance lightly (texture stays), colour strongly
    stops = np.log2(gain)
    amount = np.clip(stops / 3.0, 0, 1)
    denoised = cv2.fastNlMeansDenoisingColored(out8, None, 3, 14, 7, 21)
    lab = cv2.cvtColor(out8.astype(np.float32) / 255, cv2.COLOR_RGB2Lab)
    lab_d = cv2.cvtColor(denoised.astype(np.float32) / 255, cv2.COLOR_RGB2Lab)
    lab[..., 0] += (lab_d[..., 0] - lab[..., 0]) * amount
    w = person * (1 - clipped)
    norm = cv2.GaussianBlur(w, (0, 0), 6) + 1e-4
    for c in (1, 2):
        wide = cv2.GaussianBlur(lab_d[..., c] * w, (0, 0), 6) / norm
        lab[..., c] += (wide - lab[..., c]) * amount
    ref_l, ref_a, ref_b = SKIN_REF
    k = np.clip(lab[..., 0] / ref_l, 0, 1)
    lab[..., 1] += (ref_a * k - lab[..., 1]) * skin * amount
    lab[..., 2] += (ref_b * k - lab[..., 2]) * skin * amount
    lifted = np.clip(cv2.cvtColor(lab, cv2.COLOR_Lab2RGB), 0, 1) * 255
    # outside the lift the pixels stay exactly as they were (no colour-space round trip on the face)
    touched = smoothstep(0.0, 0.01, stops)[..., None]
    return src8.astype(np.float32) * (1 - touched) + lifted * touched


def weighted_quantiles(values, weights, qs):
    order = np.argsort(values)
    cdf = np.cumsum(weights[order]) / weights.sum()
    return np.interp(qs, cdf, values[order])


def match_near_arm(rgb, alpha, amount):
    """The near arm's skin in the far arm's colour and lightness (see the module notes)."""
    if amount == 0:
        return rgb
    lab = cv2.cvtColor(np.clip(rgb, 0, 255).astype(np.float32) / 255, cv2.COLOR_RGB2Lab)
    lin = to_linear(np.clip(rgb, 0, 255).astype(np.float32) / 255)
    smooth = cv2.GaussianBlur(lin, (0, 0), 1.5)
    warm = smoothstep(0.40, 0.52, smooth[..., 0] / (smooth.sum(axis=2) + 1e-5))
    L = lab[..., 0]
    # skin with data: warm and not black (the clipped sleeve above the arm stays out)
    near = warm * smoothstep(1.0, 4.0, L) * soft_polygon(NEAR_ARM, alpha.shape, 8) * smoothstep(0.5, 0.95, alpha)
    far = (warm > 0.6) & (soft_polygon(FAR_ARM, alpha.shape, 1) > 0.5) & (alpha > 0.95) & (L > 4)

    def shading(weights):
        return cv2.GaussianBlur(L * weights, (0, 0), 22) / (cv2.GaussianBlur(weights, (0, 0), 22) + 1e-4)

    base = shading(near)
    qs = np.linspace(0.02, 0.98, 49)
    inside = near > 0.5
    target = np.interp(base, weighted_quantiles(base[inside], near[inside], qs), np.quantile(shading(far.astype(np.float32))[far], qs))
    w = near * amount
    lab[..., 0] = L + (target - base) * w
    # colour: the far arm's at this lightness, keeping the pixel's own fine variation
    far_l, far_a, far_b = (np.median(lab[..., c][far]) for c in range(3))
    k = np.clip(lab[..., 0] / far_l, 0, 1.2)
    for c, ref in ((1, far_a), (2, far_b)):
        lab[..., c] += (ref * k - cv2.GaussianBlur(lab[..., c], (0, 0), 3)) * w
    matched = np.clip(cv2.cvtColor(lab, cv2.COLOR_Lab2RGB), 0, 1) * 255
    # everything off the arm stays exactly as it was
    touched = smoothstep(0.0, 0.01, w)[..., None]
    return rgb * (1 - touched) + matched * touched


def upper_arm_finish(rgb, src8, alpha, seed=7):
    """The upper arm keeps the far arm's colour and lightness, without the cut-out look.

    The file has the upper arm's tone but almost no skin texture, so matched it read as a flat fill with a
    hard edge. Two fixes, neither changes its level or colour:
    - its contour fades over ~12 px into the original's own shadow, inward only: outside the arm (the black
      sleeve, the shirt band the skin lift had lit at the hem) the original comes back, so no rim or halo;
    - light zero-mean grain, scaled with lightness, is added to L* inside the arm: mostly the finest band, as on
      the lit forearm, where the texture is fine detail on smooth skin (stronger or coarser noise reads as
      blotches, not skin).
    """
    src = src8.astype(np.float32)
    lab = cv2.cvtColor(np.clip(rgb, 0, 255).astype(np.float32) / 255, cv2.COLOR_RGB2Lab)
    smooth = cv2.GaussianBlur(to_linear(np.clip(rgb, 0, 255) / 255), (0, 0), 1.5)
    warm = smoothstep(0.40, 0.52, smooth[..., 0] / (smooth.sum(axis=2) + 1e-5))
    skin = (warm * smoothstep(1.0, 4.0, lab[..., 0]) * smoothstep(0.5, 0.95, alpha) > 0.5).astype(np.uint8)
    core = cv2.erode(skin, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9)))
    core = cv2.GaussianBlur(core.astype(np.float32), (0, 0), 4.5) * skin
    upper = soft_polygon(UPPER_ARM, alpha.shape, 20)
    keep = (1 - upper * (1 - core))[..., None]
    out = src + (rgb - src) * keep

    rng = np.random.default_rng(seed)
    noise = rng.standard_normal(alpha.shape).astype(np.float32)
    b1, b3 = (cv2.GaussianBlur(noise, (0, 0), s) for s in (1.0, 3.0))
    grain = 0.0
    for band, level in ((noise - b1, 0.75), (b1 - b3, 0.3)):   # light: the forearm's look is fine detail on smooth skin
        grain = grain + band / band.std() * level
    lab = cv2.cvtColor(np.clip(out, 0, 255).astype(np.float32) / 255, cv2.COLOR_RGB2Lab)
    inside = upper * core
    lab[..., 0] += grain * inside * np.clip(lab[..., 0] / 35.0, 0, 1.5)
    finished = np.clip(cv2.cvtColor(lab, cv2.COLOR_Lab2RGB), 0, 1) * 255
    # off the upper arm everything stays as it was
    touched = smoothstep(0.0, 0.01, upper)[..., None]
    return rgb * (1 - touched) + finished * touched


def decontaminate(rgb, alpha):
    """Partly transparent edge pixels take the colour of the solid interior next to them."""
    solid = alpha > 0.97
    pre = Image.fromarray((rgb * solid[..., None]).astype(np.uint8)).filter(ImageFilter.GaussianBlur(5))
    den = np.asarray(Image.fromarray((solid * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(5))).astype(np.float32) / 255
    interior = np.asarray(pre).astype(np.float32) / np.maximum(den, 1e-3)[..., None]
    interior = np.where(den[..., None] > 0.02, np.clip(interior, 0, 255), rgb)
    w = (np.clip((0.97 - alpha) / 0.97, 0, 1) * (alpha > 0.002))[..., None]
    return rgb * (1 - w) + interior * w


def frame(rgb, alpha):
    """The 4:5 crop: bottom and sides dissolving, the old CSS grade baked in, black at 0."""
    rgba = np.dstack([np.clip(rgb, 0, 255), alpha * 255]).round()
    rgba[rgba[..., 3] == 0] = 0
    full = Image.fromarray(rgba.astype(np.uint8), 'RGBA')
    height, width = alpha.shape
    rows = np.where((np.asarray(full)[:, 400:1000, 3] > 128).any(axis=1))[0]
    head_top = int(rows.min())

    rgba = np.asarray(full).astype(np.float32)

    src_w, src_h = FRAME['src_w'], FRAME['src_w'] * OUT_H / OUT_W
    top = head_top - FRAME['air'] * src_h
    x0 = FRAME['center_x'] - src_w / 2
    box = (round(x0), round(top), round(x0 + src_w), round(top + src_h))
    t = np.clip((np.arange(height, dtype=np.float32) - FRAME['fade_from']) / max(box[3] - FRAME['fade_from'], 1), 0, 1)
    vertical = 1 - t * t * (3 - 2 * t)
    xs = np.arange(width, dtype=np.float32)
    fade_w = FRAME['side'] * src_w
    left, right = np.clip((xs - box[0]) / fade_w, 0, 1), np.clip((box[2] - xs) / fade_w, 0, 1)
    horizontal = np.minimum(left * left * (3 - 2 * left), right * right * (3 - 2 * right))
    rgba[:, :, 3] *= vertical[:, None] * horizontal[None, :]

    c = rgba[:, :, :3]
    lum = (c @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32))[..., None]
    rgba[:, :, :3] = np.clip((lum + (c - lum) * 1.06) * 0.97, 0, 255)

    img = Image.fromarray(rgba.round().astype(np.uint8), 'RGBA')
    canvas = Image.new('RGBA', (box[2] - box[0], box[3] - box[1]), (0, 0, 0, 0))
    src_box = (max(box[0], 0), max(box[1], 0), min(box[2], width), min(box[3], height))
    canvas.paste(img.crop(src_box), (src_box[0] - box[0], src_box[1] - box[1]))
    out = np.asarray(canvas.resize((OUT_W, OUT_H), Image.LANCZOS)).copy()
    out[out[:, :, 3] < 2] = 0  # nothing hidden under transparency
    return Image.fromarray(out, 'RGBA')


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--shadows', choices=SHADOWS, default='medium')
    parser.add_argument('--near-arm', type=float, default=1.0, help="how far the near arm's skin goes to the far arm's (0–1)")
    parser.add_argument('--out', type=Path, default=ROOT / 'src/assets/portrait')
    args = parser.parse_args()

    src8 = np.asarray(Image.open(HERE / 'original.jpg').convert('RGB'))
    mask = np.asarray(Image.open(HERE / 'subject-mask.png').convert('L'))
    alpha = subject_alpha(src8.astype(np.float32), mask)
    rgb = match_near_arm(lift_shadows(src8, alpha, *SHADOWS[args.shadows]), alpha, args.near_arm)
    rgb = upper_arm_finish(rgb, src8, alpha)
    portrait = frame(decontaminate(rgb, alpha), alpha)

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
    print(f'shadows: {args.shadows}, near arm: {args.near_arm} → {args.out}')


if __name__ == '__main__':
    main()
