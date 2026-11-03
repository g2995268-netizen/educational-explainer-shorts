# references/frames

Key frames from the 8 reference videos.
Used for visual comparison during stills review.

## Structure

```
frames/
├── 01_malaria/
├── 02_stress/
├── 03_cocaine/
├── 04_parachute/
├── 05_ketamine/
├── 06_antimatter/
├── 07_mpox/
└── 08_turing/
```

## How to populate

```bash
ffmpeg -i malaria.mp4 -vf "fps=1/2" -q:v 2 frames/01_malaria/frame_%03d.jpg
```

Or use extract_frames.py.
