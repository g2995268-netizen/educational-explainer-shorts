import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import { SHOTS } from './story';
import { COLORS, OUTLINE } from './look';

export const ExplainerShort: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {SHOTS.map((shot) => (
        <Sequence key={shot.id} from={shot.from} durationInFrames={shot.duration}>
          <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div style={{
              fontSize: 48,
              fontWeight: 700,
              color: COLORS.text,
              WebkitTextStroke: `${OUTLINE.width}px ${OUTLINE.color}`,
            }}>
              {shot.label ?? shot.id}
            </div>
          </AbsoluteFill>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
