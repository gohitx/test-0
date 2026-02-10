import React, { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

import { PlusIcon } from '../../components/icons/icons';

// ── Plus button tokens ──────────────────────────────────
const PLUS_ICON_SIZE = 28;
const PLUS_ICON_COLOR = '#FFFFFF';
const ANIM_EASING = Easing.bezier(0.4, 0, 0.2, 1);

// ── Animated Plus Button ────────────────────────────────
export default function PlusButton({ onPress }: { onPress: () => void }) {
  const breathScale = useSharedValue(1);
  const pressScale = useSharedValue(1);

  useEffect(() => {
    // Gentle breathing: 1.0 → 1.08 → 1.0, infinite
    breathScale.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: 2200, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 2200, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );
  }, []);

  const iconAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: breathScale.value * pressScale.value }],
  }));

  const handlePressIn = () => {
    pressScale.value = withTiming(0.82, { duration: 100, easing: ANIM_EASING });
  };

  const handlePressOut = () => {
    pressScale.value = withTiming(1, { duration: 200, easing: ANIM_EASING });
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.plusTouchable}
      android_ripple={{
        color: 'rgba(255, 255, 255, 0.12)',
        borderless: true,
        radius: 24,
      }}
    >
      <Animated.View style={iconAnimStyle}>
        <PlusIcon size={PLUS_ICON_SIZE} color={PLUS_ICON_COLOR} />
      </Animated.View>
    </Pressable>
  );
}

// ── Styles ──────────────────────────────────────────────
const styles = StyleSheet.create({
  plusTouchable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});
