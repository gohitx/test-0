import { StyleSheet } from 'react-native';

import { COLORS } from './colors';

// ── Re-export for convenience ───────────────────────────
export const SCREEN_BG = COLORS.screenBg;

// ── Shared screen styles ────────────────────────────────
export const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SCREEN_BG,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.active,
    letterSpacing: -0.5,
  },
});
