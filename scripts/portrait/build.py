"""
Hero portrait: scripts/portrait/portrait-master.png (1200×1500, cut out, colour-graded, edges dissolving
to transparent) → src/assets/portrait/portrait-{480,720,960,1200}.{avif,webp}.

The master's blacks sit a little above zero and lean brown (≈ 8, 6, 4). The page is true black
(--bg-rgb in src/index.css), so each channel's black point is pulled to 0: the shirt and hair go to the
page's black and the warm cast in the shadows goes with it; skin and highlights barely move.

    python3 scripts/portrait/build.py      (needs Pillow, numpy, avifenc and cwebp)
"""
import subprocess
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
MASTER = ROOT / 'scripts/portrait/portrait-master.png'
OUT = ROOT / 'src/assets/portrait'
WIDTHS = (480, 720, 960, 1200)

pixels = np.asarray(Image.open(MASTER).convert('RGBA')).astype(np.float32)
rgb, alpha = pixels[..., :3], pixels[..., 3]
black = np.percentile(rgb[alpha > 250], 0.5, axis=0)
graded = np.clip((rgb - black) / (255 - black) * 255, 0, 255)
master = Image.fromarray(np.dstack([graded, alpha]).round().astype(np.uint8), 'RGBA')
print('black point per channel', black)

with tempfile.TemporaryDirectory() as tmp:
    for width in WIDTHS:
        height = round(width * master.height / master.width)
        # resample with premultiplied alpha, so the dissolving edges don't pick up dark fringes
        image = master if width == master.width else master.convert('RGBa').resize((width, height), Image.LANCZOS).convert('RGBA')
        png = Path(tmp) / f'portrait-{width}.png'
        image.save(png)
        subprocess.run(['avifenc', '-q', '60', '--qalpha', '80', '-s', '4', '-j', 'all', str(png), str(OUT / f'portrait-{width}.avif')], check=True, capture_output=True)
        subprocess.run(['cwebp', '-quiet', '-q', '80', '-m', '6', '-sharp_yuv', '-alpha_q', '90', str(png), '-o', str(OUT / f'portrait-{width}.webp')], check=True)
        print(width, 'done')
