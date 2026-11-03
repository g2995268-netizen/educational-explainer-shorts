import React from 'react';
import { Composition } from 'remotion';
import { ExplainerShort } from './videos/microplastic-blood/Explainer';
import { DURATION, FPS, HEIGHT, WIDTH } from './videos/microplastic-blood/look';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MicroplasticBlood"
      component={ExplainerShort}
      durationInFrames={DURATION}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
