#!/usr/bin/env python3
import json
from pathlib import Path

EVENTS = [
    {"t": 0.0, "name": "whoosh", "gain": -6},
    {"t": 2.4, "name": "soft_click", "gain": -10},
    {"t": 5.1, "name": "pulse", "gain": -8},
]

if __name__ == "__main__":
    Path("events.json").write_text(json.dumps(EVENTS, indent=2))
    print("Wrote events.json")
