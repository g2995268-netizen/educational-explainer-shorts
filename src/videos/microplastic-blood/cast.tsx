import React from 'react';
import { INK, STROKE } from './look';

export type Mood = 'ok' | 'wow' | 'no' | 'ask';

export const bob = (frame: number, speed = 0.16, amp = 7, phase = 0) =>
  Math.sin(frame * speed + phase) * amp;

export const popIn = (frame: number, at = 0) => {
  const t = frame - at;
  if (t < 0) return 0;
  const settle = 1 - Math.exp(-t / 4.2);
  const over = Math.sin(Math.min(t, 14) / 14 * Math.PI) * 0.1 * Math.exp(-t / 9);
  return settle + over;
};

export const Face: React.FC<{
  frame: number;
  y?: number;
  scale?: number;
  look?: number;
  mood?: Mood;
  seed?: number;
}> = ({ frame, y = 0, scale = 1, look = 0, mood = 'ok', seed = 0 }) => {
  const blink = (frame + seed * 13) % 92 < 4 ? 0.16 : 1;
  const eye = mood === 'wow' ? 1.18 : 1;
  const brow =
    mood === 'no' ? 8 : mood === 'wow' ? -8 : mood === 'ask' ? -4 : 0;
  const mouth =
    mood === 'no'
      ? 'M -16 34 Q 0 22 16 34'
      : mood === 'wow'
        ? 'M -12 28 Q 0 48 12 28'
        : mood === 'ask'
          ? 'M -10 34 Q 8 28 16 36'
          : 'M -16 32 Q 0 46 16 32';
  return (
    <g transform={`translate(${look} ${y}) scale(${scale})`}>
      <path d={`M -22 ${-18 + brow} L -6 ${-26 + brow}`} stroke={INK} strokeWidth={6} strokeLinecap="round" />
      <path d={`M 22 ${-18 + brow * (mood === 'ask' ? -0.2 : 1)} L 6 ${-26 + brow}`} stroke={INK} strokeWidth={6} strokeLinecap="round" />
      <ellipse cx={-20} cy={0} rx={15 * eye} ry={17 * eye * blink} fill="#fff" stroke={INK} strokeWidth={6} />
      <ellipse cx={20} cy={0} rx={15 * eye} ry={17 * eye * blink} fill="#fff" stroke={INK} strokeWidth={6} />
      <circle cx={-17} cy={2} r={6.5} fill={INK} />
      <circle cx={23} cy={2} r={6.5} fill={INK} />
      <circle cx={-14.5} cy={-2} r={2.4} fill="#fff" />
      <circle cx={25.5} cy={-2} r={2.4} fill="#fff" />
      <path d={mouth} fill="none" stroke={INK} strokeWidth={6} strokeLinecap="round" />
    </g>
  );
};

export const Shadow: React.FC<{ x: number; y: number; rx?: number }> = ({ x, y, rx = 70 }) => (
  <ellipse cx={x} cy={y} rx={rx} ry={rx * 0.22} fill="#000" opacity={0.28} />
);

export const Crumb: React.FC<{
  x: number;
  y: number;
  s?: number;
  frame: number;
  color?: string;
  mood?: Mood;
  look?: number;
  phase?: number;
}> = ({ x, y, s = 1, frame, color = '#3df0e0', mood = 'ok', look = 0, phase = 0 }) => (
  <g transform={`translate(${x} ${y + bob(frame, 0.18, 6, phase)}) scale(${s})`}>
    <Shadow x={0} y={78} rx={48} />
    <circle r={58} fill={color} stroke={INK} strokeWidth={STROKE} />
    <ellipse cx={-20} cy={-26} rx={16} ry={10} fill="#fff" opacity={0.45} />
    <Face frame={frame} scale={1} look={look} mood={mood} seed={phase} />
  </g>
);

export const Fiber: React.FC<{
  x: number;
  y: number;
  s?: number;
  h?: number;
  frame: number;
  mood?: Mood;
  tilt?: number;
}> = ({ x, y, s = 1, h = 460, frame, mood = 'ok', tilt = 0 }) => (
  <g transform={`translate(${x} ${y + bob(frame, 0.14, 5, 1)}) rotate(${tilt}) scale(${s})`}>
    <Shadow x={0} y={h / 2 + 8} rx={46} />
    <rect x={-36} y={-h / 2} width={72} height={h} rx={36} fill="#ff4f93" stroke={INK} strokeWidth={STROKE} />
    <ellipse cx={-12} cy={-h / 2 + 36} rx={12} ry={18} fill="#fff" opacity={0.35} />
    <Face frame={frame} y={-h * 0.18} scale={0.92} mood={mood} seed={3} />
  </g>
);

export const Bottle: React.FC<{
  x: number;
  y: number;
  s?: number;
  frame: number;
  tilt?: number;
  mood?: Mood;
}> = ({ x, y, s = 1, frame, tilt = 0, mood = 'ok' }) => (
  <g transform={`translate(${x} ${y + bob(frame, 0.13, 5, 0.4)}) rotate(${tilt}) scale(${s})`}>
    <Shadow x={0} y={168} rx={90} />
    <rect x={-22} y={-210} width={44} height={42} rx={10} fill="#ff5a3c" stroke={INK} strokeWidth={STROKE} />
    <rect x={-30} y={-176} width={60} height={48} rx={10} fill="#7ee7ff" stroke={INK} strokeWidth={STROKE} />
    <rect x={-78} y={-136} width={156} height={280} rx={40} fill="#7ee7ff" stroke={INK} strokeWidth={STROKE} />
    <rect x={-58} y={-70} width={22} height={120} rx={11} fill="#fff" opacity={0.38} />
    <Face frame={frame} y={10} scale={0.82} mood={mood} seed={2} />
  </g>
);

export const Shirt: React.FC<{ x: number; y: number; s?: number; frame: number }> = ({ x, y, s = 1, frame }) => (
  <g transform={`translate(${x} ${y + bob(frame, 0.15, 5, 2)}) scale(${s})`}>
    <Shadow x={0} y={150} rx={100} />
    <path
      d="M -8 -20 L -78 -4 L -118 48 L -78 78 L -48 36 L -48 150 L 48 150 L 48 36 L 78 78 L 118 48 L 78 -4 L 8 -20 L 0 -4 Z"
      fill="#ffe14a"
      stroke={INK}
      strokeWidth={STROKE}
      strokeLinejoin="round"
    />
  </g>
);

export const Macrophage: React.FC<{
  x: number;
  y: number;
  s?: number;
  frame: number;
  mood?: Mood;
  look?: number;
}> = ({ x, y, s = 1, frame, mood = 'ok', look = 0 }) => (
  <g transform={`translate(${x} ${y + bob(frame, 0.17, 6, 1.2)}) scale(${s})`}>
    <Shadow x={0} y={108} rx={80} />
    <circle cx={-86} cy={62} r={28} fill="#ffe14a" stroke={INK} strokeWidth={STROKE} />
    <circle cx={86} cy={58} r={26} fill="#ffe14a" stroke={INK} strokeWidth={STROKE} />
    <circle r={96} fill="#ffe14a" stroke={INK} strokeWidth={STROKE} />
    <ellipse cx={-30} cy={-48} rx={22} ry={12} fill="#fff" opacity={0.4} />
    <Face frame={frame} scale={1.2} look={look} mood={mood} seed={5} />
  </g>
);

export const Organ: React.FC<{
  x: number;
  y: number;
  rx: number;
  ry: number;
  frame: number;
  color: string;
  mood?: Mood;
  lobe?: boolean;
}> = ({ x, y, rx, ry, frame, color, mood = 'ok', lobe = false }) => (
  <g transform={`translate(${x} ${y + bob(frame, 0.12, 5, rx)})`}>
    <Shadow x={0} y={ry * 0.85} rx={rx * 0.7} />
    {lobe ? <circle cx={-rx * 0.45} cy={-ry * 0.15} r={ry * 0.55} fill={color} stroke={INK} strokeWidth={STROKE} /> : null}
    <ellipse rx={rx} ry={ry} fill={color} stroke={INK} strokeWidth={STROKE} />
    <ellipse cx={-rx * 0.25} cy={-ry * 0.35} rx={rx * 0.18} ry={ry * 0.12} fill="#fff" opacity={0.35} />
    <Face frame={frame} scale={Math.min(rx, ry) / 70} mood={mood} seed={rx} />
  </g>
);

export const Label: React.FC<{
  x?: number;
  y: number;
  children: string;
  frame: number;
  at?: number;
  size?: number;
  fill?: string;
  color?: string;
}> = ({ x = 540, y, children, frame, at = 0, size = 64, fill, color = '#ffffff' }) => {
  const s = popIn(frame, at);
  if (s <= 0) return null;
  const w = Math.max(180, children.length * size * 0.62 + 56);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {fill ? (
        <rect x={-w / 2} y={-size * 0.78} width={w} height={size * 1.35} rx={28} fill={fill} stroke={INK} strokeWidth={STROKE} />
      ) : null}
      <text
        textAnchor="middle"
        fontFamily="Inter"
        fontWeight={700}
        fontSize={size}
        fill={fill ? INK : color}
        stroke={fill ? '#ffffff' : INK}
        strokeWidth={fill ? 0 : 12}
        paintOrder="stroke fill"
        strokeLinejoin="round"
      >
        {children}
      </text>
    </g>
  );
};

export const Stage: React.FC<{
  frame: number;
  bg: string;
  glow: string;
  title: string;
  foot?: string;
  titleAt?: number;
  children?: React.ReactNode;
}> = ({ frame, bg, glow, title, foot, titleAt = 0, children }) => {
  const specks = [0, 1, 2, 3, 4, 5].map((i) => {
    const x = ((i * 190 + frame * (0.55 + i * 0.12)) % 980) + 50;
    const y = ((i * 260 + frame * (0.35 + i * 0.08)) % 1400) + 280;
    return <circle key={i} cx={x} cy={y} r={10 + (i % 3) * 6} fill="#ffffff" opacity={0.09} />;
  });
  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <defs>
        <radialGradient id="sky" cx="50%" cy="38%" r="68%">
          <stop offset="0%" stopColor={glow} />
          <stop offset="72%" stopColor={bg} />
        </radialGradient>
      </defs>
      <rect width={1080} height={1920} fill="url(#sky)" />
      {specks}
      <g transform="translate(540 1040) scale(1.16) translate(-540 -980)">{children}</g>
      <Label y={210} frame={frame} at={titleAt} size={60}>
        {title}
      </Label>
      {foot ? (
        <Label y={1740} frame={frame} at={4} size={42} fill="#ffe14a">
          {foot}
        </Label>
      ) : null}
    </svg>
  );
};
