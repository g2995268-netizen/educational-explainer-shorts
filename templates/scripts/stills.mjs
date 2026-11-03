// Render stills at specific frames
// Usage: node stills.mjs <compositionId> <outputPrefix> <frames...>
import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition } from '@remotion/renderer';
import path from 'path';

const [, , compositionId, outputPrefix, ...frameArgs] = process.argv;
const frames = frameArgs.map(Number);

async function main() {
  const bundled = await bundle({ entryPoint: path.resolve('src/index.ts') });
  const composition = await selectComposition({ serveUrl: bundled, id: compositionId });
  for (const frame of frames) {
    const out = `${outputPrefix}${String(frame).padStart(4, '0')}.png`;
    await renderStill({ composition, serveUrl: bundled, output: out, frame });
    console.log(out);
  }
}
main();
