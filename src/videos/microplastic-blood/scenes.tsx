import React from 'react';
import { interpolate } from 'remotion';
import {
  Bottle,
  Crumb,
  Fiber,
  Label,
  Macrophage,
  Mood,
  Organ,
  Shirt,
  Stage,
  bob,
  popIn,
} from './cast';
import { INK, STROKE } from './look';

const SceneFrame: React.FC<{
  frame: number;
  bg: string;
  glow: string;
  title: string;
  foot?: string;
  children?: React.ReactNode;
}> = (props) => <Stage {...props} />;

export const Pour: React.FC<{ frame: number }> = ({ frame }) => {
  const tilt = interpolate(frame, [0, 36], [-4, 36], { extrapolateRight: 'clamp' });
  return (
    <SceneFrame frame={frame} bg="#22148a" glow="#6a58ff" title="одно исследование">
      <Bottle x={390} y={980} frame={frame} tilt={tilt} s={1.15} mood="wow" />
      {Array.from({ length: 8 }, (_, i) => {
        const t = ((frame * 0.85 + i * 7) % 42) / 42;
        const x = 520 + t * 460;
        const y = 760 - Math.sin(t * Math.PI) * 220 + t * 120;
        return <Crumb key={i} x={x} y={y} s={0.42 + (i % 3) * 0.06} frame={frame} phase={i} mood="wow" />;
      })}
    </SceneFrame>
  );
};

export const Count: React.FC<{ frame: number }> = ({ frame }) => (
    <SceneFrame frame={frame} bg="#22148a" glow="#6a58ff" title="в литре воды">
    <Bottle x={250} y={1120} frame={frame} s={0.7} />
    {Array.from({ length: 6 }, (_, i) => (
      <Crumb
        key={i}
        x={620 + (i % 3) * 130}
        y={980 + Math.floor(i / 3) * 150}
        s={0.55}
        frame={frame}
        phase={i}
        mood="wow"
      />
    ))}
    <Label x={540} y={520} frame={frame} size={92} fill="#ffe14a">
      240 000
    </Label>
  </SceneFrame>
);

export const Nano: React.FC<{ frame: number }> = ({ frame }) => {
  const shrink = 1 - 0.42 * popIn(frame, 0);
  return (
    <SceneFrame frame={frame} bg="#22148a" glow="#6a58ff" title="9 из 10" foot="мельче микрометра">
      {Array.from({ length: 10 }, (_, i) => {
        const col = i % 5;
        const row = Math.floor(i / 5);
        const tiny = i < 9;
        return (
          <Crumb
            key={i}
            x={180 + col * 180}
            y={860 + row * 280}
            s={tiny ? 0.78 * shrink : 0.86}
            frame={frame}
            phase={i}
            color={tiny ? '#7dfff2' : '#ffe14a'}
            mood={tiny ? 'ok' : 'wow'}
          />
        );
      })}
    </SceneFrame>
  );
};

export const NoneScene: React.FC<{ frame: number }> = ({ frame }) => {
  const kick = frame > 34 ? Math.sin((frame - 34) * 0.55) * Math.exp(-(frame - 34) / 9) * 70 : 0;
  return (
    <SceneFrame frame={frame} bg="#22148a" glow="#6a58ff" title="почти никто">
      <g transform="translate(720 980)">
        <rect x={-110} y={-340} width={220} height={680} rx={110} fill="#ff4d6d" stroke={INK} strokeWidth={STROKE} />
        <rect x={-48} y={-250} width={96} height={500} rx={48} fill="#ffd0dc" />
      </g>
      {Array.from({ length: 7 }, (_, i) => {
        const passed = i === 6;
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = passed ? 720 : 150 + row * 170 - kick * 0.25;
        const y = passed ? 980 : 700 + col * 200;
        return (
          <Crumb
            key={i}
            x={x}
            y={y}
            s={passed ? 0.22 : 0.46}
            frame={frame}
            phase={i}
            mood={passed ? 'wow' : frame > 30 ? 'no' : 'ok'}
          />
        );
      })}
    </SceneFrame>
  );
};

export const Ruler: React.FC<{ frame: number }> = ({ frame }) => (
  <SceneFrame frame={frame} bg="#075a78" glow="#2ec8ef" title="короче 5 мм">
    <rect x={140} y={860} width={800} height={36} rx={18} fill="#ffe14a" stroke={INK} strokeWidth={STROKE} />
    {Array.from({ length: 9 }, (_, i) => (
      <rect key={i} x={180 + i * 80} y={848} width={8} height={i % 2 ? 28 : 48} rx={3} fill={INK} />
    ))}
    <Crumb x={300} y={1120} s={0.9} frame={frame} color="#ffb703" mood="ok" />
    <Crumb x={820} y={1040} s={0.22} frame={frame} mood="wow" phase={2} />
    <Label x={300} y={1320} frame={frame} size={40} fill="#ffffff">
      обломок
    </Label>
    <Label x={820} y={1200} frame={frame} at={8} size={40} fill="#3df0e0">
      нано
    </Label>
  </SceneFrame>
);

export const Wash: React.FC<{ frame: number }> = ({ frame }) => {
  const spin = frame * 4;
  return (
    <SceneFrame frame={frame} bg="#075a78" glow="#2ec8ef" title="одна стирка">
      <g transform="translate(540 1040)">
        <circle r={250} fill="#d7f7ff" stroke={INK} strokeWidth={STROKE} />
        <circle r={180} fill="#9be7ff" stroke={INK} strokeWidth={STROKE} />
        <g transform={`rotate(${spin})`}>
          <rect x={-16} y={-150} width={32} height={300} rx={16} fill="#fff" opacity={0.35} />
          <rect x={-150} y={-16} width={300} height={32} rx={16} fill="#fff" opacity={0.35} />
        </g>
      </g>
      <Shirt x={540} y={620} s={0.55} frame={frame} />
      {Array.from({ length: 5 }, (_, i) => {
        const t = ((frame * 0.7 + i * 9) % 36) / 36;
        return (
          <Fiber
            key={i}
            x={760 + t * 180}
            y={780 + i * 30}
            h={180}
            s={0.35}
            frame={frame}
            tilt={-20 - i * 8}
            mood="wow"
          />
        );
      })}
      <Label x={540} y={1460} frame={frame} at={62} size={64} fill="#ffe14a">
        {'> 700 000'}
      </Label>
    </SceneFrame>
  );
};

export const Length: React.FC<{ frame: number }> = ({ frame }) => (
  <SceneFrame frame={frame} bg="#075a78" glow="#2ec8ef" title="несколько мм" foot="для крови велики">
    <g transform="translate(780 1080) scale(0.48)">
      <rect x={-110} y={-340} width={220} height={680} rx={110} fill="#ff4d6d" stroke={INK} strokeWidth={STROKE} />
      <rect x={-42} y={-220} width={84} height={440} rx={42} fill="#ffd0dc" />
    </g>
    <Fiber x={360} y={1040} h={620} frame={frame} mood="wow" />
  </SceneFrame>
);

export const Giants: React.FC<{ frame: number }> = ({ frame }) => (
  <SceneFrame frame={frame} bg="#075a78" glow="#2ec8ef" title="великаны">
    <Fiber x={360} y={1000} h={560} frame={frame} mood="wow" />
    <Crumb x={720} y={1120} s={0.4} frame={frame} mood="wow" phase={4} />
  </SceneFrame>
);

export const Snap: React.FC<{ frame: number }> = ({ frame }) => {
  const p = Math.min(1, frame / 18);
  const gap = p * 120;
  return (
    <SceneFrame frame={frame} bg="#075a78" glow="#2ec8ef" title="дробится в крошку">
      <g opacity={1 - p}>
        <rect x={470 - gap} y={860} width={78} height={280} rx={36} fill="#ff4f93" stroke={INK} strokeWidth={STROKE} />
        <rect x={530 + gap} y={860} width={78} height={280} rx={36} fill="#ff4f93" stroke={INK} strokeWidth={STROKE} />
      </g>
      {p > 0.4
        ? [0, 1, 2, 3].map((i) => (
            <Crumb
              key={i}
              x={230 + i * 200}
              y={1040 + bob(frame, 0.2, 10, i)}
              s={0.72}
              frame={frame}
              phase={i}
              color={i % 2 ? '#ff4f93' : '#3df0e0'}
              mood="wow"
            />
          ))
        : null}
    </SceneFrame>
  );
};

export const Routes: React.FC<{ frame: number }> = ({ frame }) => {
  const gulp = popIn(frame, 6);
  const dust = popIn(frame, 40);
  return (
    <SceneFrame frame={frame} bg="#075a78" glow="#2ec8ef" title="два входа">
      <line x1={540} y1={460} x2={540} y2={1580} stroke="#fff" strokeWidth={6} opacity={0.35} />
      <g opacity={0.95}>
        <ellipse cx={270} cy={980} rx={120} ry={70} fill="#ff8fab" stroke={INK} strokeWidth={STROKE} />
        <ellipse cx={270} cy={1000} rx={70} ry={36} fill="#3a1028" />
      </g>
      <Crumb x={270} y={820 - gulp * 40} s={0.4 - gulp * 0.12} frame={frame} mood="ok" />
      <Shirt x={810} y={900} s={0.7} frame={frame} />
      {Array.from({ length: 6 }, (_, i) => (
        <circle
          key={i}
          cx={760 + (i % 3) * 36}
          cy={760 - dust * (40 + i * 28) - bob(frame, 0.3, 6, i)}
          r={8}
          fill="#ffe14a"
          stroke={INK}
          strokeWidth={4}
          opacity={dust}
        />
      ))}
      <Label x={270} y={1280} frame={frame} at={6} size={40} fill="#ffe14a">
        глотают
      </Label>
      <Label x={810} y={1280} frame={frame} at={40} size={40} fill="#ffe14a">
        вдыхают
      </Label>
    </SceneFrame>
  );
};

export const Size: React.FC<{ frame: number }> = ({ frame }) => {
  const pass = interpolate(frame, [8, 36], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <SceneFrame frame={frame} bg="#075a78" glow="#2ec8ef" title="решает размер">
      <Bottle x={220} y={1080} s={0.55} frame={frame} mood="no" />
      <Fiber x={220} y={1280} h={220} s={0.45} frame={frame} mood="no" />
      <g transform="translate(620 1040)">
        <rect x={-70} y={-220} width={28} height={440} rx={12} fill="#ffe14a" stroke={INK} strokeWidth={STROKE} />
        <rect x={70} y={-220} width={28} height={440} rx={12} fill="#ffe14a" stroke={INK} strokeWidth={STROKE} />
        <rect x={-46} y={-28} width={120} height={56} rx={16} fill="#3df0e0" stroke={INK} strokeWidth={STROKE} />
      </g>
      <Crumb x={430 + pass * 280} y={1040} s={0.32} frame={frame} mood="wow" phase={1} />
    </SceneFrame>
  );
};

export const Wall: React.FC<{ frame: number }> = ({ frame }) => {
  const hit = Math.min(1, frame / 26);
  const squash = frame > 30 ? Math.sin((frame - 30) * 0.7) * Math.exp(-(frame - 30) / 8) : 0;
  return (
    <SceneFrame frame={frame} bg="#0c3f46" glow="#1ec8b5" title="не решето">
      {Array.from({ length: 6 }, (_, i) => {
        const gap = i > 2 ? 70 : 0;
        return (
          <g key={i} transform={`translate(${130 + i * 145 + gap} ${1040 + bob(frame, 0.1, 3, i)})`}>
            <rect x={-58} y={-90} width={116} height={200} rx={40} fill="#ff8fa3" stroke={INK} strokeWidth={STROKE} />
            <ellipse cx={-16} cy={-16} rx={10} ry={12} fill="#fff" stroke={INK} strokeWidth={4} />
            <ellipse cx={16} cy={-16} rx={10} ry={12} fill="#fff" stroke={INK} strokeWidth={4} />
            <circle cx={-14} cy={-14} r={4} fill={INK} />
            <circle cx={18} cy={-14} r={4} fill={INK} />
          </g>
        );
      })}
      <Label x={560} y={1340} frame={frame} at={36} size={44} fill="#ffe14a">
        щель 1,5 нм
      </Label>
      <Crumb
        x={200 + hit * 280}
        y={760 + squash * 10}
        s={0.55 - squash * 0.05}
        frame={frame}
        mood={frame > 30 ? 'no' : 'wow'}
      />
    </SceneFrame>
  );
};

export const Block: React.FC<{ frame: number }> = ({ frame }) => {
  const bounce = Math.sin(frame * 0.45) * Math.exp(-frame / 18) * 26;
  return (
    <SceneFrame frame={frame} bg="#0c3f46" glow="#1ec8b5" title="100 нм не проходит">
      <line x1={180} y1={1040} x2={470} y2={1040} stroke={INK} strokeWidth={22} strokeLinecap="round" />
      <line x1={610} y1={1040} x2={900} y2={1040} stroke={INK} strokeWidth={22} strokeLinecap="round" />
      <line x1={180} y1={1040} x2={470} y2={1040} stroke="#ff8fa3" strokeWidth={10} strokeLinecap="round" />
      <line x1={610} y1={1040} x2={900} y2={1040} stroke="#ff8fa3" strokeWidth={10} strokeLinecap="round" />
      <Crumb x={540} y={820 + bounce} s={0.85} frame={frame} mood="no" />
    </SceneFrame>
  );
};

export const Efsa: React.FC<{ frame: number }> = ({ frame }) => (
  <SceneFrame frame={frame} bg="#0c3f46" glow="#1ec8b5" title="больше 150 мкм" foot="ЕФСА">
    <rect x={120} y={1080} width={840} height={48} rx={20} fill="#ff8fa3" stroke={INK} strokeWidth={STROKE} />
    {[0, 1, 2].map((i) => (
      <Crumb
        key={i}
        x={260 + i * 200 + bob(frame, 0.08, 10, i)}
        y={900}
        s={0.7}
        frame={frame}
        color="#ffb703"
        mood="no"
        phase={i}
      />
    ))}
  </SceneFrame>
);

export const Stool: React.FC<{ frame: number }> = ({ frame }) => {
  const drop = interpolate(frame, [0, 28], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <SceneFrame frame={frame} bg="#0c3f46" glow="#1ec8b5" title="остаётся в кишке" foot="выход">
      <path d="M 160 760 H 760 Q 900 760 900 980 V 1320" fill="none" stroke={INK} strokeWidth={70} strokeLinecap="round" />
      <path d="M 160 760 H 760 Q 900 760 900 980 V 1320" fill="none" stroke="#ffb4c2" strokeWidth={46} strokeLinecap="round" />
      <path d="M 860 1380 L 900 1480 L 940 1380" fill="none" stroke={INK} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" />
      {[0, 1, 2].map((i) => (
        <Crumb
          key={i}
          x={300 + i * 180 + drop * 80}
          y={700 + drop * (80 + i * 30)}
          s={0.4}
          frame={frame}
          color="#ffb703"
          mood="ok"
          phase={i}
        />
      ))}
    </SceneFrame>
  );
};

export const Swallow: React.FC<{ frame: number }> = ({ frame }) => {
  const t = interpolate(frame, [4, 28], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <SceneFrame frame={frame} bg="#0c3f46" glow="#1ec8b5" title="проглатывает клетка">
      <Macrophage x={620} y={1040} s={1.35} frame={frame} mood={t > 0.6 ? 'wow' : 'ok'} look={-8} />
      <Crumb x={280 + t * 250} y={1040 - Math.sin(t * Math.PI) * 80} s={0.55 - t * 0.28} frame={frame} mood="wow" />
    </SceneFrame>
  );
};

export const Percent: React.FC<{ frame: number }> = ({ frame }) => (
  <SceneFrame frame={frame} bg="#0c3f46" glow="#1ec8b5" title="≤ 0,3%" foot="опыты на животных">
    <Label x={540} y={560} frame={frame} size={120} fill="#ffe14a">
      3 из 1000
    </Label>
    {Array.from({ length: 80 }, (_, i) => {
      const col = i % 10;
      const row = Math.floor(i / 10);
      return <circle key={i} cx={180 + col * 78} cy={860 + row * 70} r={10} fill="#9be7d8" opacity={0.55} />;
    })}
    {[0, 1, 2].map((i) => (
      <Crumb key={i} x={300 + i * 180} y={1480} s={0.4} frame={frame} phase={i} mood="wow" />
    ))}
  </SceneFrame>
);

export const Lung: React.FC<{ frame: number }> = ({ frame }) => {
  const slam = popIn(frame, 0);
  return (
    <SceneFrame frame={frame} bg="#0c3f46" glow="#1ec8b5" title="не доказан" foot="из лёгких в кровь">
      <Organ x={300} y={980} rx={150} ry={190} frame={frame} color="#ff8fa3" lobe />
      <g transform={`translate(620 1000) scale(${slam || 0.01})`}>
        <rect x={-70} y={-56} width={140} height={112} rx={16} fill="#ffe14a" stroke={INK} strokeWidth={STROKE} />
        <path d="M -36 10 V -8 a 36 36 0 0 1 72 0 V 10" fill="none" stroke={INK} strokeWidth={12} strokeLinecap="round" />
      </g>
      <g transform="translate(860 1000)">
        <path d="M 0 90 C -70 40 -70 -20 0 -70 C 70 -20 70 40 0 90 Z" fill="#ff3b6b" stroke={INK} strokeWidth={STROKE} />
      </g>
    </SceneFrame>
  );
};

export const Ride: React.FC<{ frame: number }> = ({ frame }) => (
  <SceneFrame frame={frame} bg="#3a102c" glow="#e0246c" title="едет с кровью">
    {Array.from({ length: 9 }, (_, i) => {
      const x = ((i * 140 - frame * 3.2) % 1100 + 1100) % 1100 - 20;
      return <circle key={i} cx={x} cy={980 + (i % 3) * 50} r={34} fill="#ff4d6d" stroke={INK} strokeWidth={6} />;
    })}
    <Crumb x={540} y={860 + bob(frame, 0.2, 12)} s={0.85} frame={frame} mood="wow" />
  </SceneFrame>
);

export const Donors: React.FC<{ frame: number }> = ({ frame }) => (
  <SceneFrame frame={frame} bg="#3a102c" glow="#e0246c" title="17 / 22" foot="небольшая группа">
    {Array.from({ length: 22 }, (_, i) => {
      const row = Math.floor(i / 6);
      const col = i % 6;
      const n = row === 3 ? 4 : 6;
      const start = 540 - ((n - 1) * 140) / 2;
      const x = start + (row === 3 ? i - 18 : col) * 140;
      const y = 640 + row * 200;
      const on = i < 17 && frame > i;
      return (
        <g key={i} transform={`translate(${x} ${y + bob(frame, 0.15, 3, i)})`}>
          <circle r={48} fill={on ? '#3df0e0' : '#8d5d86'} stroke={INK} strokeWidth={STROKE} />
          <ellipse cx={-14} cy={-6} rx={8} ry={9} fill="#fff" stroke={INK} strokeWidth={3} />
          <ellipse cx={14} cy={-6} rx={8} ry={9} fill="#fff" stroke={INK} strokeWidth={3} />
          <circle cx={-12} cy={-4} r={3.5} fill={INK} />
          <circle cx={16} cy={-4} r={3.5} fill={INK} />
        </g>
      );
    })}
  </SceneFrame>
);

export const Polymers: React.FC<{ frame: number }> = ({ frame }) => {
  const chips: Array<{ t: string; at: number; x: number; fill: string }> = [
    { t: 'ПЭТ', at: 10, x: 250, fill: '#7ee7ff' },
    { t: 'стирол', at: 34, x: 540, fill: '#ffe14a' },
    { t: 'ПЭ', at: 48, x: 820, fill: '#ff8fa3' },
  ];
  return (
    <SceneFrame frame={frame} bg="#3a102c" glow="#e0246c" title="чаще всего">
      <Crumb x={540} y={1180} s={0.7} frame={frame} mood="wow" />
      {chips.map((c) => (
        <Label key={c.t} x={c.x} y={760} frame={frame} at={c.at} size={52} fill={c.fill}>
          {c.t}
        </Label>
      ))}
    </SceneFrame>
  );
};

export const Organs: React.FC<{ frame: number }> = ({ frame }) => {
  const caught = popIn(frame, 20);
  return (
    <SceneFrame frame={frame} bg="#3a102c" glow="#e0246c" title="печень и селезёнка">
      <Organ x={280} y={980} rx={200} ry={150} frame={frame} color="#ff5a7a" lobe mood="wow" />
      <Organ x={820} y={1040} rx={120} ry={150} frame={frame} color="#c084fc" mood="ok" />
      <Macrophage x={540} y={1240} s={0.7} frame={frame} mood="wow" />
      <Crumb x={540} y={980 - (1 - caught) * 220} s={0.36} frame={frame} mood="wow" phase={2} />
    </SceneFrame>
  );
};

export const Bile: React.FC<{ frame: number }> = ({ frame }) => {
  const t = interpolate(frame, [0, 50], [0, 1], { extrapolateRight: 'clamp' });
  const x = 300 + t * 420;
  const y = 620 + Math.sin(t * Math.PI) * 280;
  return (
    <SceneFrame frame={frame} bg="#3a102c" glow="#e0246c" title="назад в кишку" foot="у животных">
      <Organ x={300} y={640} rx={150} ry={110} frame={frame} color="#ff5a7a" />
      <path d="M 420 700 C 620 700 700 1100 860 1240" fill="none" stroke={INK} strokeWidth={28} strokeLinecap="round" />
      <path d="M 420 700 C 620 700 700 1100 860 1240" fill="none" stroke="#ffe14a" strokeWidth={14} strokeLinecap="round" />
      <ellipse cx={860} cy={1320} rx={120} ry={70} fill="#ffb4c2" stroke={INK} strokeWidth={STROKE} />
      <Crumb x={x} y={y} s={0.36} frame={frame} color="#ffe14a" mood="ok" />
    </SceneFrame>
  );
};

export const Plaque: React.FC<{ frame: number }> = ({ frame }) => {
  const pulse = 1 + Math.sin(frame * 0.25) * 0.04;
  return (
    <SceneFrame frame={frame} bg="#3a102c" glow="#e0246c" title="бляшка">
      <g transform={`translate(540 1020) scale(${pulse})`}>
        <rect x={-460} y={-130} width={920} height={260} rx={130} fill="#ff4d6d" stroke={INK} strokeWidth={STROKE} />
        <ellipse cx={30} cy={-10} rx={170} ry={100} fill="#ffe14a" stroke={INK} strokeWidth={STROKE} />
      </g>
      <Crumb x={560} y={990} s={0.42} frame={frame} mood="no" phase={3} />
    </SceneFrame>
  );
};

export const Worry: React.FC<{ frame: number }> = ({ frame }) => {
  const icons: Array<{ at: number; label: string; draw: React.ReactNode }> = [
    {
      at: 38,
      label: 'инфаркт',
      draw: <path d="M 0 28 C -40 -10 -10 -36 0 -16 C 10 -36 40 -10 0 28 Z" fill="#ff3b6b" stroke={INK} strokeWidth={6} />,
    },
    {
      at: 54,
      label: 'инсульт',
      draw: <path d="M -30 20 L -8 -20 L 6 10 L 30 -24" fill="none" stroke={INK} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />,
    },
    {
      at: 68,
      label: 'смерть',
      draw: <rect x={-22} y={-22} width={44} height={44} rx={8} fill="#141018" stroke="#fff" strokeWidth={6} />,
    },
  ];
  return (
    <SceneFrame frame={frame} bg="#3a102c" glow="#e0246c" title="там, где он был">
      <g transform="translate(540 620) scale(0.55)">
        <rect x={-420} y={-90} width={840} height={180} rx={90} fill="#ff4d6d" stroke={INK} strokeWidth={STROKE} />
        <path d="M -40 -90 C 20 -20 80 -10 160 -90" fill="#ffe14a" stroke={INK} strokeWidth={STROKE} />
      </g>
      {icons.map((icon, i) => {
        const s = popIn(frame, icon.at);
        return (
          <g key={icon.label} transform={`translate(${220 + i * 320} 980) scale(${s || 0.001})`}>
            <circle r={110} fill="#ffe14a" stroke={INK} strokeWidth={STROKE} />
            {icon.draw}
            <Label x={0} y={170} frame={frame} at={icon.at} size={32}>
              {icon.label}
            </Label>
          </g>
        );
      })}
    </SceneFrame>
  );
};

export const Risk: React.FC<{ frame: number }> = ({ frame }) => (
  <SceneFrame frame={frame} bg="#3a102c" glow="#e0246c" title="поправленный риск">
    <Label x={540} y={860} frame={frame} at={18} size={150} fill="#ffe14a">
      × 4,5
    </Label>
    <Label x={540} y={1120} frame={frame} at={58} size={64} fill="#ffffff">
      не причина
    </Label>
  </SceneFrame>
);

export const Outside: React.FC<{ frame: number }> = ({ frame }) => {
  const wag = Math.sin(frame * 0.7) * 5;
  return (
    <SceneFrame frame={frame} bg="#22148a" glow="#6a58ff" title="не вливают в вену">
      <g transform="translate(540 1180)">
        <path d="M 0 160 C -120 60 -120 -40 0 -120 C 120 -40 120 60 0 160 Z" fill="none" stroke={INK} strokeWidth={28} />
        <path d="M 0 160 C -120 60 -120 -40 0 -120 C 120 -40 120 60 0 160 Z" fill="none" stroke="#ff4d6d" strokeWidth={12} />
      </g>
      <g transform={`rotate(${wag} 280 1000)`}>
        <Bottle x={280} y={1000} s={0.7} frame={frame} mood="no" />
      </g>
      <g transform={`rotate(${-wag} 820 1040)`}>
        <Shirt x={820} y={980} s={0.75} frame={frame} />
      </g>
    </SceneFrame>
  );
};

export const Cell: React.FC<{ frame: number }> = ({ frame }) => (
  <SceneFrame frame={frame} bg="#22148a" glow="#6a58ff" title="через клетку" foot="не сквозь щель">
    <g transform="translate(280 1000)">
      <line x1={-120} y1={0} x2={-20} y2={0} stroke={INK} strokeWidth={18} strokeLinecap="round" />
      <line x1={20} y1={0} x2={120} y2={0} stroke={INK} strokeWidth={18} strokeLinecap="round" />
      <path d="M -40 70 L 0 20 L 40 70" fill="none" stroke="#ff3b6b" strokeWidth={14} strokeLinecap="round" />
      <path d="M -40 -70 L 0 -20 L 40 -70" fill="none" stroke="#ff3b6b" strokeWidth={14} strokeLinecap="round" />
    </g>
    <Macrophage x={780} y={1040} s={1.05} frame={frame} mood="wow" />
    <Crumb x={780} y={1000} s={0.28} frame={frame} mood="ok" phase={1} />
    <Label x={280} y={1280} frame={frame} size={40} fill="#ff8fa3">
      щель
    </Label>
  </SceneFrame>
);

const Tableau: React.FC<{ frame: number; mood: Mood; title: string; foot?: string; footAt?: number }> = ({
  frame,
  mood,
  title,
  foot,
  footAt = 4,
}) => (
  <SceneFrame frame={frame} bg="#22148a" glow="#6a58ff" title={title}>
    <Bottle x={230} y={1080} s={0.48} frame={frame} />
    <Shirt x={850} y={1080} s={0.5} frame={frame} />
    <Macrophage x={540} y={1040} s={1.2} frame={frame} mood={mood} />
    <Crumb x={540} y={1140} s={0.38} frame={frame} mood={mood === 'ask' ? 'ask' : 'ok'} phase={2} />
    {foot ? (
      <Label x={540} y={1500} frame={frame} at={footAt} size={48} fill="#3df0e0">
        {foot}
      </Label>
    ) : null}
  </SceneFrame>
);

export const Catch: React.FC<{ frame: number }> = ({ frame }) => (
  <Tableau frame={frame} mood="wow" title="тело ловит" foot="измерили" footAt={36} />
);

export const Cost: React.FC<{ frame: number }> = ({ frame }) => (
  <Tableau frame={frame} mood="ask" title="цену не знаем" />
);

export const SCENES: Record<string, React.FC<{ frame: number }>> = {
  pour: Pour,
  count: Count,
  nano: Nano,
  none: NoneScene,
  ruler: Ruler,
  wash: Wash,
  length: Length,
  giants: Giants,
  snap: Snap,
  routes: Routes,
  size: Size,
  wall: Wall,
  block: Block,
  efsa: Efsa,
  stool: Stool,
  swallow: Swallow,
  percent: Percent,
  lung: Lung,
  ride: Ride,
  donors: Donors,
  polymers: Polymers,
  organs: Organs,
  bile: Bile,
  plaque: Plaque,
  worry: Worry,
  risk: Risk,
  outside: Outside,
  cell: Cell,
  catch: Catch,
  cost: Cost,
};
