import { StyleSheet } from 'react-native';

// ── Shared color tokens ─────────────────────────────────
export const SCREEN_BG = '#0A0AF2';

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
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
});
