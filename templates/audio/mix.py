#!/usr/bin/env python3
"""Mix voice + SFX."""
import json
from pathlib import Path
import numpy as np
import soundfile as sf

SR = 48000

def mix(voice_path, events_path, sfx_dir, out_path):
    voice, _ = sf.read(voice_path)
    if voice.ndim > 1:
        voice = voice.mean(axis=1)
    events = json.loads(Path(events_path).read_text())
    mixed = voice.copy()
    for ev in events:
        sfx_file = Path(sfx_dir) / f"{ev['name']}.wav"
        if sfx_file.exists():
            sfx, _ = sf.read(sfx_file)
            start = int(ev['t'] * SR)
            end = min(start + len(sfx), len(mixed))
            mixed[start:end] += sfx[:end-start] * 0.3
    sf.write(out_path, mixed, SR)
    print(f"Mixed → {out_path}")

if __name__ == "__main__":
    mix("voice.wav", "events.json", "sfx", "mix.wav")
