// ── Centralized Color Palette ────────────────────────────
// Single source of truth for all colors across the app.
// Facilitates future theming (dark/light modes).

export const COLORS = {
  // Backgrounds
  screenBg: '#0D0D0F',
  barBg: '#101014',

  // Interactive states
  activePillBg: '#8383837D',
  active: '#FFFFFF',
  inactive: '#6B6F80',

  // Decorative
  waveStroke: 'rgba(255, 255, 255, 0.14)',
  ripple: 'rgba(255, 255, 255, 0.15)',
  rippleLight: 'rgba(255, 255, 255, 0.12)',
} as const;
