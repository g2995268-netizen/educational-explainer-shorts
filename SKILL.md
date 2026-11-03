---
name: educational-explainer-short
description: Make a ~55-75 s vertical educational explainer short in the flat vector / bold-outline cartoon style (saturated colors, large-eyed characters, metaphorical visualizations, infographics), rendered with Remotion. Use when the user asks for a short in the style of the reference explainers or says use the explainer short skill.
---

# Educational Explainer Short (Flat Vector Style)

Style research is in `references/` (STYLE_BIBLE.md + reports/frames/sheets).

**Rules that always apply**
- Story, facts, characters and voice are ALWAYS original. References are for visual style only.
- Never copy scripts, specific characters or shots from reference videos.
- Vertical 9:16 only.
- Duration target: 55–75 seconds.
- One clear educational idea per short.
- Save after every major step.
- Once the script is approved → execute without further questions.

## Pipeline

1. **Topic and facts** — Pick one clear visual concept. Write facts + sources in SCRIPT.md.
2. **Script** (~3.5–4 words/s) — Hook, Setup, Mechanism, Escalation, Payoff. Never describe what the viewer already sees.
3. **Voice** — Generate voice.wav + words.json. Visual events land 0–3 frames before the word.
4. **Shot plan** — Copy templates/bridge/ to src/videos/<name>/. Define SHOTS in story.ts.
5. **Visual construction** — Large eyes, bold outlines, infographics, metaphorical visualizations. Follow STYLE_BIBLE.
6. **Post and look** — Use look.ts values. Grain off by default. Export 1080×1920 H.264.
7. **Sound** — Synthesized SFX ducked under voice. Lock timing before final mix.
8. **Review** — Render stills. Compare against references/frames/ and reports.
9. **Final render** — Render, mux audio, deliver.

## Core style constraints
- Bold dark outlines on almost everything.
- High saturation, limited palette per scene.
- Large expressive eyes.
- Metaphorical and diagrammatic thinking over literal realism.
- Clean, readable compositions.
- Subtle internal motion preferred over heavy camera movement.

## Notes
- Start every new short from templates/bridge/.
- Style lives in the template + STYLE_BIBLE. Story lives in the script and shot plan.
- Heavy rendering expected in Cursor Cloud Agents or remote environment.
