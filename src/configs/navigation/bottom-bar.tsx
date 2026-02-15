import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '../styles/theme/colors';

import PlusButton from './plus/PlusButton';

import { ACTIVE_COLOR, ACTIVE_PILL_BG, ANIM_BOUNCE_IN, ANIM_BOUNCE_OUT, ANIM_DURATION, ANIM_EASING, BAR_BG, BAR_HEIGHT, ICON_SCALE_BOUNCE, ICON_SCALE_SHRINK, ICON_SIZE, INACTIVE_COLOR, LABEL_MAX_WIDTH, LABEL_SPACING, PILL_H, PILL_RADIUS, PILL_SCALE_ACTIVE_ADD, PILL_SCALE_INACTIVE, TabDef, TABS } from './config';

type RouteParams = Record<string, unknown> | undefined;

function normalizeRouteName(routeName: string): string {
  return routeName.endsWith('/index')
    ? routeName.replace('/index', '')
    : routeName;
}

function useTabPress({
  navigation,
  routeKey,
  routeName,
  routeParams,
  focused,
}: {
  navigation: BottomTabBarProps['navigation'];
  routeKey: string;
  routeName: string;
  routeParams: RouteParams;
  focused: boolean;
}) {
  return useCallback(() => {
    const event = navigation.emit({
      type: 'tabPress',
      target: routeKey,
      canPreventDefault: true,
    });

    if (!focused && !event.defaultPrevented) {
      navigation.navigate(routeName, routeParams);
    }
  }, [navigation, routeKey, routeName, routeParams, focused]);
}

const CenterTab = React.memo(function CenterTab({
  routeKey,
  routeName,
  routeParams,
  focused,
  navigation,
}: {
  routeKey: string;
  routeName: string;
  routeParams: RouteParams;
  focused: boolean;
  navigation: BottomTabBarProps['navigation'];
}) {
  const onPress = useTabPress({
    navigation,
    routeKey,
    routeName,
    routeParams,
    focused,
  });

  return <PlusButton onPress={onPress} />;
});

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
  routeParams: RouteParams;
  navigation: BottomTabBarProps['navigation'];
}) {
  const onPress = useTabPress({
    navigation,
    routeKey,
    routeName,
    routeParams,
    focused,
  });

  const pillOpacity = useSharedValue(focused ? 1 : 0);
  const labelWidth = useSharedValue(focused ? 1 : 0);
  const iconScale = useSharedValue(1);

  const isRight = tab.side === 'right';
  const isHome = tab.route === 'index';
  const isWallet = tab.route === 'wallet';

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
        <Animated.View style={[styles.activePill, pillStyle]} />

        <View
          style={[
            styles.tabContent,
            isRight && styles.tabContentReversed,
            isHome && styles.homeContentOffset,
            isWallet && styles.walletContentOffset,
          ]}
        >
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

export default function BottomBar({
  state,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const routesByName = useMemo(
    () =>
      new Map(
        state.routes.map((route, index) => [
          normalizeRouteName(route.name),
          { route, index },
        ]),
      ),
    [state.routes],
  );

  return (
    <View style={[styles.barOuter, { paddingBottom: insets.bottom }]}>
      <View style={styles.bar}>
        {TABS.map(tab => {
          const routeEntry = routesByName.get(tab.route);

          if (!routeEntry) return null;

          const { route, index: routeIndex } = routeEntry;
          const focused = state.index === routeIndex;

          // ── Render memoized center tab with PlusButton ──
          if (tab.side === 'center') {
            return (
              <CenterTab
                key={route.key}
                routeKey={route.key}
                routeName={route.name}
                routeParams={route.params as RouteParams}
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
              routeParams={route.params as RouteParams}
              navigation={navigation}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  barOuter: {
    backgroundColor: BAR_BG,
    zIndex: 10,
  },
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
  homeContentOffset: {
    transform: [{ translateX: 3 }],
  },
  walletContentOffset: {
    transform: [{ translateX: -5 }],
  },
  tabLabel: {
    color: ACTIVE_COLOR,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.2,
    overflow: 'hidden',
  },
});
