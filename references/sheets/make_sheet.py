#!/usr/bin/env python3
"""Generate contact sheets from frames."""
import argparse
from pathlib import Path
from PIL import Image, ImageDraw

def make_sheet(src_dir, out_path, cols=6, thumb_h=180):
    images = sorted(p for p in Path(src_dir).iterdir() if p.suffix.lower() in {'.jpg', '.jpeg', '.png'})
    if not images:
        return
    thumbs = []
    for p in images:
        img = Image.open(p).convert('RGB')
        w = int(img.width * thumb_h / img.height)
        thumbs.append(img.resize((w, thumb_h), Image.Resampling.LANCZOS))
    rows = (len(thumbs) + cols - 1) // cols
    thumb_w = thumbs[0].width
    margin = 8
    sheet = Image.new('RGB', (cols * thumb_w + (cols+1)*margin, rows * (thumb_h+30) + (rows+1)*margin), (18,18,18))
    for i, thumb in enumerate(thumbs):
        r, c = divmod(i, cols)
        x = margin + c * (thumb_w + margin)
        y = margin + r * (thumb_h + 30 + margin)
        sheet.paste(thumb, (x, y))
    sheet.save(out_path)
    print(f'Sheet → {out_path}')

if __name__ == '__main__':
    p = argparse.ArgumentParser()
    p.add_argument('src_dir')
    p.add_argument('output')
    p.add_argument('--cols', type=int, default=6)
    args = p.parse_args()
    make_sheet(args.src_dir, args.output, args.cols)
