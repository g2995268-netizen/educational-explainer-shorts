#!/usr/bin/env python3
"""Side-by-side comparison sheet."""
import argparse
from pathlib import Path
from PIL import Image, ImageDraw

def make_sbs(ours, refs, out, height=960):
    pairs = []
    for o, r in zip(ours, refs):
        img_o = Image.open(o).convert('RGB')
        img_r = Image.open(r).convert('RGB')
        def scale(img):
            w = int(img.width * height / img.height)
            return img.resize((w, height), Image.Resampling.LANCZOS)
        pairs.append((scale(img_o), scale(img_r)))
    total_w = sum(o.width + r.width + 8 for o, r in pairs) + 8
    canvas = Image.new('RGB', (total_w, height + 40), (20, 20, 20))
    x = 8
    for o, r in pairs:
        canvas.paste(o, (x, 30))
        canvas.paste(r, (x + o.width + 4, 30))
        x += o.width + r.width + 12
    canvas.save(out)
    print(f'Saved {out}')

if __name__ == '__main__':
    p = argparse.ArgumentParser()
    p.add_argument('output')
    p.add_argument('--ours', nargs='+', required=True)
    p.add_argument('--ref', nargs='+', required=True)
    args = p.parse_args()
    make_sbs([Path(f) for f in args.ours], [Path(f) for f in args.ref], Path(args.output))
