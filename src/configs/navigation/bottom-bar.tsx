import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useCallback, useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '../styles/theme/colors';

import PlusButton from './plus/PlusButton';

import { ACTIVE_COLOR, ACTIVE_PILL_BG, ANIM_BOUNCE_IN, ANIM_BOUNCE_OUT, ANIM_DURATION, ANIM_EASING, BAR_BG, BAR_HEIGHT, ICON_SCALE_BOUNCE, ICON_SCALE_SHRINK, ICON_SIZE, INACTIVE_COLOR, LABEL_MAX_WIDTH, LABEL_SPACING, PILL_H, PILL_RADIUS, PILL_SCALE_ACTIVE_ADD, PILL_SCALE_INACTIVE, TabDef, TABS } from './config';

// ── Memoized Center Tab ─────────────────────────────────
// Prevents PlusButton re-renders on tab index changes
const CenterTab = React.memo(function CenterTab({
  routeKey,
  routeName,
  routeParams,
  focused,
  navigation,
}: {
  routeKey: string;
  routeName: string;
  routeParams: Record<string, unknown> | undefined;
  focused: boolean;
  navigation: BottomTabBarProps['navigation'];
}) {
  const onPress = useCallback(() => {
    const event = navigation.emit({
      type: 'tabPress',
      target: routeKey,
      canPreventDefault: true,
    });
    if (!focused && !event.defaultPrevented) {
      navigation.navigate(routeName, routeParams);
    }
  }, [navigation, routeKey, routeName, routeParams, focused]);

  return <PlusButton onPress={onPress} />;
});

// ── Animated Tab ────────────────────────────────────────
const TabButton = React.memo(function TabButton({
  tab,
  focused,
  routeKey,
  routeName,
  routeParams,
  navigation,
}: {
  tab: TabDef;
  focused: boolean;
  routeKey: string;
  routeName: string;
  routeParams: Record<string, unknown> | undefined;
  navigation: BottomTabBarProps['navigation'];
}) {
  const onPress = useCallback(() => {
    const event = navigation.emit({
      type: 'tabPress',
      target: routeKey,
      canPreventDefault: true,
    });
    if (!focused && !event.defaultPrevented) {
      navigation.navigate(routeName, routeParams);
    }
  }, [navigation, routeKey, routeName, routeParams, focused]);

  const pillOpacity = useSharedValue(focused ? 1 : 0);
  const labelWidth = useSharedValue(focused ? 1 : 0);
  const iconScale = useSharedValue(1);

  const isRight = tab.side === 'right';

  useEffect(() => {
    pillOpacity.value = withTiming(focused ? 1 : 0, {
      duration: ANIM_DURATION,
      easing: ANIM_EASING,
    });

    if (tab.hasLabel) {
      labelWidth.value = withTiming(focused ? 1 : 0, {
        duration: ANIM_DURATION,
        easing: ANIM_EASING,
      });
    }

    if (focused) {
      iconScale.value = withTiming(
        ICON_SCALE_BOUNCE,
        { duration: ANIM_BOUNCE_IN, easing: ANIM_EASING },
        () => {
          iconScale.value = withTiming(1, {
            duration: ANIM_BOUNCE_OUT,
            easing: ANIM_EASING,
          });
        },
      );
    } else {
      // Subtle shrink on deselect: 1 → 0.92 → 1
      iconScale.value = withTiming(
        ICON_SCALE_SHRINK,
        { duration: ANIM_BOUNCE_IN, easing: ANIM_EASING },
        () => {
          iconScale.value = withTiming(1, {
            duration: ANIM_BOUNCE_OUT,
            easing: ANIM_EASING,
          });
        },
      );
    }
  }, [focused, pillOpacity, labelWidth, iconScale, tab.hasLabel]);

  const pillStyle = useAnimatedStyle(() => ({
    opacity: pillOpacity.value,
    transform: [
      {
        scaleX: PILL_SCALE_INACTIVE + PILL_SCALE_ACTIVE_ADD * pillOpacity.value,
      },
    ],
  }));

  const labelStyle = useAnimatedStyle(() => {
    const spacing = labelWidth.value * LABEL_SPACING;
    return {
      opacity: labelWidth.value,
      maxWidth: labelWidth.value * LABEL_MAX_WIDTH,
      // Right-side tabs: margin on the right (label is before icon)
      // Left-side tabs: margin on the left (label is after icon)
      marginLeft: isRight ? 0 : spacing,
      marginRight: isRight ? spacing : 0,
    };
  });

  const iconAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  const Icon = focused ? tab.SolidIcon : tab.OutlineIcon;

  return (
    <Pressable
      onPress={onPress}
      style={styles.tabTouchable}
      android_ripple={{
        color: COLORS.ripple,
        borderless: true,
        radius: 28,
      }}
    >
      <View style={styles.tabInner}>
        {/* Background pill — only visible when active */}
        <Animated.View style={[styles.activePill, pillStyle]} />

        {/* Content — reversed for right-side tabs */}
        <View style={[styles.tabContent, isRight && styles.tabContentReversed]}>
          <Animated.View style={iconAnimStyle}>
            <Icon
              size={ICON_SIZE}
              color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
            />
          </Animated.View>

          {tab.hasLabel && (
            <Animated.Text
              style={[styles.tabLabel, labelStyle]}
              numberOfLines={1}
            >
              {tab.label}
            </Animated.Text>
          )}
        </View>
      </View>
    </Pressable>
  );
});

// ── Bottom Bar ──────────────────────────────────────────
export default function BottomBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.barOuter, { paddingBottom: insets.bottom }]}>
      <View style={styles.bar}>
        {TABS.map(tab => {
          const route = state.routes.find(routeItem => {
            const normalizedRouteName = routeItem.name.endsWith('/index')
              ? routeItem.name.replace('/index', '')
              : routeItem.name;
            return normalizedRouteName === tab.route;
          });

          if (!route) return null;

          const routeIndex = state.routes.findIndex(
            routeItem => routeItem.key === route.key,
          );
          const focused = state.index === routeIndex;

          // ── Render memoized center tab with PlusButton ──
          if (tab.side === 'center') {
            return (
              <CenterTab
                key={route.key}
                routeKey={route.key}
                routeName={route.name}
                routeParams={
                  route.params as Record<string, unknown> | undefined
                }
                focused={focused}
                navigation={navigation}
              />
            );
          }

          return (
            <TabButton
              key={route.key}
              tab={tab}
              focused={focused}
              routeKey={route.key}
              routeName={route.name}
              routeParams={route.params as Record<string, unknown> | undefined}
              navigation={navigation}
            />
          );
        })}
      </View>
    </View>
  );
}

// ── Styles ──────────────────────────────────────────────
const styles = StyleSheet.create({
  barOuter: {
    backgroundColor: BAR_BG, // Moved background color here to cover the safe area
    zIndex: 10,
  },
  // Removed waveContainer style
  bar: {
    flexDirection: 'row',
    backgroundColor: BAR_BG,
    height: BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
    zIndex: 20,
  },
  tabTouchable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  tabInner: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: PILL_H,
    paddingHorizontal: 2,
  },
  activePill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: ACTIVE_PILL_BG,
    borderRadius: PILL_RADIUS,
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    zIndex: 1,
  },
  tabContentReversed: {
    flexDirection: 'row-reverse',
  },
  tabLabel: {
    color: ACTIVE_COLOR,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.2,
    overflow: 'hidden',
  },
});
