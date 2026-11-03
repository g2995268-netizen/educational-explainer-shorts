export const COLORS = {
  bg: '#0f0f1a',
  text: '#ffffff',
  accent: '#ff3b5c',
  secondary: '#4ecdc4',
  warning: '#ff6b35',
  calm: '#6c5ce7',
} as const;

export const OUTLINE = {
  color: '#0a0a0a',
  width: 4,
} as const;

export const TYPOGRAPHY = {
  title: 72,
  body: 36,
  caption: 28,
} as const;

export const PALETTES = {
  danger: ['#ff3b5c', '#6c5ce7', '#0a0a0a'],
  science: ['#4ecdc4', '#6c5ce7', '#ffffff'],
  body: ['#ffeaa7', '#55efc4', '#74b9ff'],
  cosmic: ['#6c5ce7', '#a29bfe', '#dfe6e9'],
} as const;
