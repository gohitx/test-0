import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  HomeOutline,
  HomeSolid,
  MessageOutline,
  MessageSolid,
  PlusIcon,
  UserOutline,
  UserSolid,
  WalletOutline,
  WalletSolid,
} from './icons/icons';

// ── Design tokens ───────────────────────────────────────
const BAR_BG = '#101014';
const ACTIVE_PILL_BG = '#8383837D';
const ACTIVE_COLOR = '#FFFFFF';
const INACTIVE_COLOR = '#6B6F80';
const ICON_SIZE = 22;
const BAR_HEIGHT = 60;
const PILL_H = 40;
const PILL_RADIUS = 20;
const ANIM_DURATION = 280;
const ANIM_EASING = Easing.bezier(0.4, 0, 0.2, 1);

// ── Tab config ──────────────────────────────────────────
type TabSide = 'left' | 'center' | 'right';

interface TabDef {
  route: string;
  label: string;
  hasLabel: boolean;
  side: TabSide;
  OutlineIcon: React.ComponentType<{ size?: number; color?: string }>;
  SolidIcon: React.ComponentType<{ size?: number; color?: string }>;
}

const TABS: TabDef[] = [
  {
    route: 'index',
    label: 'Home',
    hasLabel: true,
    side: 'left',
    OutlineIcon: HomeOutline,
    SolidIcon: HomeSolid,
  },
  {
    route: 'message',
    label: 'Chat',
    hasLabel: true,
    side: 'left',
    OutlineIcon: MessageOutline,
    SolidIcon: MessageSolid,
  },
  {
    route: 'plus',
    label: 'Create',
    hasLabel: false,
    side: 'center',
    OutlineIcon: PlusIcon,
    SolidIcon: PlusIcon,
  },
  {
    route: 'wallet',
    label: 'Wallet',
    hasLabel: true,
    side: 'right',
    OutlineIcon: WalletOutline,
    SolidIcon: WalletSolid,
  },
  {
    route: 'user',
    label: 'me',
    hasLabel: true,
    side: 'right',
    OutlineIcon: UserOutline,
    SolidIcon: UserSolid,
  },
];

// ── Animated Tab ────────────────────────────────────────
function TabButton({
  tab,
  focused,
  onPress,
}: {
  tab: TabDef;
  focused: boolean;
  onPress: () => void;
}) {
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
        1.1,
        { duration: 120, easing: ANIM_EASING },
        () => {
          iconScale.value = withTiming(1, {
            duration: 150,
            easing: ANIM_EASING,
          });
        },
      );
    }
  }, [focused]);

  const pillStyle = useAnimatedStyle(() => ({
    opacity: pillOpacity.value,
    transform: [{ scaleX: 0.7 + 0.3 * pillOpacity.value }],
  }));

  const labelStyle = useAnimatedStyle(() => {
    const spacing = labelWidth.value * 7;
    return {
      opacity: labelWidth.value,
      maxWidth: labelWidth.value * 70,
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
        color: 'rgba(255, 255, 255, 0.15)',
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
}

// ── Bottom Bar ──────────────────────────────────────────
export default function BottomBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.barOuter, { paddingBottom: insets.bottom }]}>
      {/* Subtle separator */}
      <View style={styles.separator} />

      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const tab = TABS.find(t => t.route === route.name);
          if (!tab) return null;

          const focused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <TabButton
              key={route.key}
              tab={tab}
              focused={focused}
              onPress={onPress}
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
    backgroundColor: BAR_BG,
  },
  separator: {
    height: 0.5,
    backgroundColor: '#76767665',
  },
  bar: {
    flexDirection: 'row',
    backgroundColor: BAR_BG,
    height: BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
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
