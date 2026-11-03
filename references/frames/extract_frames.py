#!/usr/bin/env python3
"""
Helper to extract frames from reference videos.
Usage:
  python extract_frames.py video.mp4 01_malaria --every 2
  python extract_frames.py video.mp4 05_ketamine --times 0 3.5 8 15 22
"""
import argparse
import subprocess
from pathlib import Path

def extract_every(video: Path, out_dir: Path, every_sec: float):
    out_dir.mkdir(parents=True, exist_ok=True)
    cmd = ["ffmpeg", "-y", "-i", str(video), "-vf", f"fps=1/{every_sec}", "-q:v", "2", str(out_dir / "frame_%03d.jpg")]
    subprocess.run(cmd, check=True)
    print(f"Extracted every {every_sec}s → {out_dir}")

def extract_times(video: Path, out_dir: Path, times: list[float]):
    out_dir.mkdir(parents=True, exist_ok=True)
    for t in times:
        out = out_dir / f"t_{t:05.1f}s.jpg"
        cmd = ["ffmpeg", "-y", "-ss", str(t), "-i", str(video), "-frames:v", "1", "-q:v", "2", str(out)]
        subprocess.run(cmd, check=True)
        print(f"  {t}s → {out.name}")

if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("video")
    p.add_argument("folder")
    p.add_argument("--every", type=float)
    p.add_argument("--times", type=float, nargs="+")
    args = p.parse_args()
    base = Path(__file__).parent
    out_dir = base / args.folder
    video = Path(args.video)
    if args.every:
        extract_every(video, out_dir, args.every)
    elif args.times:
        extract_times(video, out_dir, args.times)
    else:
        p.error("Provide --every or --times")
