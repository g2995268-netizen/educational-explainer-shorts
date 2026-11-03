import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition } from '@remotion/renderer';
import path from 'path';
import fs from 'fs';

const [, , compositionId, outputPrefix, ...frameArgs] = process.argv;

if (!compositionId || !outputPrefix || frameArgs.length === 0) {
  console.error('Usage: node stills.mjs <compositionId> <outputPrefix> <frame1> [frame2...]');
  process.exit(1);
}

const frames = frameArgs.map(Number);
const entry = path.resolve(process.cwd(), 'src/index.ts');

async function main() {
  const bundled = await bundle({ entryPoint: entry });
  const composition = await selectComposition({ serveUrl: bundled, id: compositionId });
  fs.mkdirSync(path.dirname(outputPrefix), { recursive: true });
  for (const frame of frames) {
    const out = `${outputPrefix}${String(frame).padStart(4, '0')}.png`;
    console.log(`Rendering frame ${frame} → ${out}`);
    await renderStill({ composition, serveUrl: bundled, output: out, frame });
  }
  console.log('Done.');
}

main().catch((err) => { console.error(err); process.exit(1); });
