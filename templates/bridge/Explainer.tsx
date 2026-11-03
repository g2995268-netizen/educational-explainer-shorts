import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';
import { SHOTS } from './story';
import { COLORS, OUTLINE } from './look';

export const ExplainerShort: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {SHOTS.map((shot) => (
        <Sequence key={shot.id} from={shot.from} durationInFrames={shot.duration} name={shot.id}>
          <ShotRenderer shot={shot} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

const ShotRenderer: React.FC<{ shot: (typeof SHOTS)[number] }> = ({ shot }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: shot.bg ?? COLORS.bg, justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ fontSize: 48, fontWeight: 700, color: COLORS.text, textAlign: 'center', padding: 40, WebkitTextStroke: `${OUTLINE.width}px ${OUTLINE.color}` }}>
        {shot.label ?? shot.id}
        <div style={{ fontSize: 24, marginTop: 16, opacity: 0.7 }}>frame {frame}</div>
      </div>
    </AbsoluteFill>
  );
};
