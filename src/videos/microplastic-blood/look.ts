export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const DURATION = 2160;

export const INK = '#141018';
export const STROKE = 8;

/** Grain stays off. Flat fills only. */
export const GRAIN = false;

export const PALETTE = {
  hook: { bg: '#22148a', glow: '#6a58ff' },
  setup: { bg: '#075a78', glow: '#2ec8ef' },
  gut: { bg: '#0c3f46', glow: '#1ec8b5' },
  blood: { bg: '#3a102c', glow: '#e0246c' },
  payoff: { bg: '#22148a', glow: '#6a58ff' },
} as const;

export type Palette = { bg: string; glow: string };
