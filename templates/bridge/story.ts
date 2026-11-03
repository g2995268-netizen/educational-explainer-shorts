export const FPS = 30;

export type Shot = {
  id: string;
  from: number;
  duration: number;
  label?: string;
  bg?: string;
};

export const SHOTS: Shot[] = [
  { id: 'hook', from: 0, duration: 90, label: 'HOOK', bg: '#1a1a2e' },
  { id: 'setup', from: 90, duration: 120, label: 'SETUP', bg: '#16213e' },
  { id: 'mechanism', from: 210, duration: 180, label: 'MECHANISM', bg: '#0f3460' },
  { id: 'payoff', from: 390, duration: 120, label: 'PAYOFF', bg: '#1a1a2e' },
];
