import { PALETTE } from './look';

export type SceneId =
  | 'pour'
  | 'count'
  | 'nano'
  | 'none'
  | 'ruler'
  | 'wash'
  | 'length'
  | 'giants'
  | 'snap'
  | 'routes'
  | 'size'
  | 'wall'
  | 'block'
  | 'efsa'
  | 'stool'
  | 'swallow'
  | 'percent'
  | 'lung'
  | 'ride'
  | 'donors'
  | 'polymers'
  | 'organs'
  | 'bile'
  | 'plaque'
  | 'worry'
  | 'risk'
  | 'outside'
  | 'cell'
  | 'catch'
  | 'cost';

export type Shot = {
  id: SceneId;
  from: number;
  duration: number;
  bg: string;
  glow: string;
};

/**
 * Cuts lead the spoken word by 2 frames (30 fps).
 * Anchors come from words.json on the 72 s voice.
 */
const RAW: Array<{ id: SceneId; from: number; bg: string; glow: string }> = [
  { id: 'pour', from: 0, ...PALETTE.hook },
  { id: 'count', from: 69, ...PALETTE.hook },
  { id: 'nano', from: 138, ...PALETTE.hook },
  { id: 'none', from: 218, ...PALETTE.hook },
  { id: 'ruler', from: 281, ...PALETTE.setup },
  { id: 'wash', from: 347, ...PALETTE.setup },
  { id: 'length', from: 450, ...PALETTE.setup },
  { id: 'giants', from: 494, ...PALETTE.setup },
  { id: 'snap', from: 539, ...PALETTE.setup },
  { id: 'routes', from: 590, ...PALETTE.setup },
  { id: 'size', from: 657, ...PALETTE.setup },
  { id: 'wall', from: 714, ...PALETTE.gut },
  { id: 'block', from: 817, ...PALETTE.gut },
  { id: 'efsa', from: 872, ...PALETTE.gut },
  { id: 'stool', from: 954, ...PALETTE.gut },
  { id: 'swallow', from: 1014, ...PALETTE.gut },
  { id: 'percent', from: 1083, ...PALETTE.gut },
  { id: 'lung', from: 1163, ...PALETTE.gut },
  { id: 'ride', from: 1234, ...PALETTE.blood },
  { id: 'donors', from: 1280, ...PALETTE.blood },
  { id: 'polymers', from: 1367, ...PALETTE.blood },
  { id: 'organs', from: 1439, ...PALETTE.blood },
  { id: 'bile', from: 1509, ...PALETTE.blood },
  { id: 'plaque', from: 1598, ...PALETTE.blood },
  { id: 'worry', from: 1698, ...PALETTE.blood },
  { id: 'risk', from: 1781, ...PALETTE.blood },
  { id: 'outside', from: 1883, ...PALETTE.payoff },
  { id: 'cell', from: 1950, ...PALETTE.payoff },
  { id: 'catch', from: 2036, ...PALETTE.payoff },
  { id: 'cost', from: 2117, ...PALETTE.payoff },
];

const TOTAL = 2160;

export const SHOTS: Shot[] = RAW.map((shot, i) => {
  const next = RAW[i + 1]?.from ?? TOTAL;
  return { ...shot, duration: next - shot.from };
});
