import React, { useEffect, useState } from 'react';
import { AbsoluteFill, Audio, continueRender, delayRender, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { SCENES } from './scenes';
import { SHOTS } from './story';

const SFX: Array<{ frame: number; file: string; volume: number }> = [
  { frame: 0, file: 'whoosh.wav', volume: 0.2 },
  { frame: 69, file: 'pop.wav', volume: 0.22 },
  { frame: 138, file: 'pop.wav', volume: 0.18 },
  { frame: 257, file: 'thud.wav', volume: 0.2 },
  { frame: 347, file: 'whoosh.wav', volume: 0.16 },
  { frame: 539, file: 'pop.wav', volume: 0.2 },
  { frame: 817, file: 'thud.wav', volume: 0.18 },
  { frame: 1014, file: 'gulp.wav', volume: 0.2 },
  { frame: 1163, file: 'latch.wav', volume: 0.2 },
  { frame: 1234, file: 'whoosh.wav', volume: 0.14 },
  { frame: 1598, file: 'thud.wav', volume: 0.16 },
  { frame: 1803, file: 'pop.wav', volume: 0.22 },
  { frame: 1843, file: 'stamp.wav', volume: 0.2 },
  { frame: 2117, file: 'chime.wav', volume: 0.16 },
];

export const ExplainerShort: React.FC = () => {
  const [handle] = useState(() => delayRender('Inter'));

  useEffect(() => {
    const face = new FontFace('Inter', `url(${staticFile('fonts/Inter-Bold.ttf')})`, { weight: '700' });
    face
      .load()
      .then((loaded) => {
        (document.fonts as unknown as { add: (font: FontFace) => void }).add(loaded);
        continueRender(handle);
      })
      .catch(() => continueRender(handle));
  }, [handle]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#141018' }}>
      <Audio src={staticFile('microplastic-blood/voice.wav')} />
      {SHOTS.map((shot) => {
        const Cmp = SCENES[shot.id];
        return (
          <Sequence key={shot.id} from={shot.from} durationInFrames={shot.duration} name={shot.id}>
            <ShotView Cmp={Cmp} />
          </Sequence>
        );
      })}
      {SFX.map((sfx) => (
        <Sequence key={`${sfx.file}-${sfx.frame}`} from={sfx.frame} durationInFrames={40}>
          <Audio src={staticFile(`microplastic-blood/sfx/${sfx.file}`)} volume={sfx.volume} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

const ShotView: React.FC<{ Cmp: React.FC<{ frame: number }> }> = ({ Cmp }) => {
  const frame = useCurrentFrame();
  return <Cmp frame={frame} />;
};
