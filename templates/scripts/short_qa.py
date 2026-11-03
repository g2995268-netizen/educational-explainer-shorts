#!/usr/bin/env python3
"""Basic QA for a rendered short."""
import argparse
import subprocess
import json
from pathlib import Path

def qa(video: Path, out_dir: Path):
    out_dir.mkdir(parents=True, exist_ok=True)
    info = subprocess.check_output(f'ffprobe -v quiet -print_format json -show_format "{video}"', shell=True, text=True)
    duration = float(json.loads(info)["format"]["duration"])
    print(f"Duration: {duration:.2f}s")
    report = {"duration_sec": round(duration, 2), "issues": []}
    if duration < 50 or duration > 80:
        report["issues"].append(f"Duration {duration:.1f}s outside target")
    Path(out_dir / "qa_report.json").write_text(json.dumps(report, indent=2))
    print("Report written")

if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("video")
    p.add_argument("output_dir", nargs="?", default="out/qa")
    args = p.parse_args()
    qa(Path(args.video), Path(args.output_dir))
