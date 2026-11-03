# templates/audio

Sound pipeline for educational explainer shorts.

## Files
- cues.md — event list
- timeline.py — turns cues into events.json
- sfx_gen.py — generates basic synthesized SFX
- mix.py — mixes voice + SFX and normalizes

## Workflow
1. Lock picture timing (words.json)
2. Edit cues.md
3. python timeline.py
4. python sfx_gen.py
5. Place voice.wav
6. python mix.py

## Requirements
pip install numpy soundfile
ffmpeg in PATH
