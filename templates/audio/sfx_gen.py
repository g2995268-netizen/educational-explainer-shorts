#!/usr/bin/env python3
"""Generate simple synthesized SFX."""
import numpy as np
import soundfile as sf
from pathlib import Path

SR = 48000

def whoosh(duration=0.4):
    t = np.linspace(0, duration, int(SR * duration))
    noise = np.random.randn(len(t)) * 0.3
    env = np.linspace(1, 0, len(t)) ** 1.5
    return noise * env

def generate_all(out_dir: Path):
    out_dir.mkdir(parents=True, exist_ok=True)
    sf.write(out_dir / "whoosh.wav", whoosh(), SR)
    print("Generated sfx/")

if __name__ == "__main__":
    generate_all(Path("sfx"))
