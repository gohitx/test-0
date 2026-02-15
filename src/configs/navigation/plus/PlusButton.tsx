import React, { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { Easing, cancelAnimation, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

import { PlusIcon } from '../../../components/icons/icons';
import { COLORS } from '../../styles/theme/colors';
import { ANIM_EASING, PLUS_ICON_COLOR, PLUS_ICON_SIZE } from '../config';

// ── Animated Plus Button ────────────────────────────────
export default React.memo(function PlusButton({
  onPress,
}: {
  onPress: () => void;
}) {
  const breathScale = useSharedValue(1);
  const pressScale = useSharedValue(1);

  useEffect(() => {
    // Gentle breathing: 1.0 → 1.04 → 1.0, infinite
    breathScale.value = withRepeat(
      withSequence(
        withTiming(1.04, { duration: 2800, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 2800, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );

    return () => {
      cancelAnimation(breathScale);
      cancelAnimation(pressScale);
    };
  }, [breathScale]);

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
        color: COLORS.rippleLight,
        borderless: true,
        radius: 24,
      }}
    >
      <Animated.View style={iconAnimStyle}>
        <PlusIcon size={PLUS_ICON_SIZE} color={PLUS_ICON_COLOR} />
      </Animated.View>
    </Pressable>
  );
});

// ── Styles ──────────────────────────────────────────────
const styles = StyleSheet.create({
  plusTouchable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});
