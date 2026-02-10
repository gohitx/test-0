import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as Haptics from 'expo-haptics';
import React, { memo, useCallback, useEffect, useRef } from 'react';
import {
  Animated,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

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
} from '../components/icons/icons';

// Enable LayoutAnimation on Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Smooth transition config for LayoutAnimation
const TRANSITION_CONFIG = LayoutAnimation.create(
  220,
  LayoutAnimation.Types.easeInEaseOut,
  LayoutAnimation.Properties.opacity,
);

// ── Design tokens ───────────────────────────────────────
const BAR_BG = '#0A0A0F';
const BAR_SURFACE = '#111114';
const ACTIVE_PILL_BG = 'rgba(179, 179, 179, 0.24)';
const ACTIVE_COLOR = '#FFFFFF';
const INACTIVE_COLOR = '#4A4D5E';
const ACCENT_PRIMARY = '#FFFFFF';
const ACCENT_GLOW = 'rgba(255, 255, 255, 0.12)';
const PLUS_GRADIENT_START = '#6B6F80';
const PLUS_GRADIENT_END = '#FFFFFF';
const PLUS_BG = '#1A1A1F';
const ICON_SIZE = 21;
const BAR_HEIGHT = 64;
const PILL_H = 42;
const PILL_RADIUS = 21;
const PLUS_W = 52;
const PLUS_H = 38;
const PLUS_RADIUS = 12;
const RING_W = 56;
const RING_H = 42;
const RING_RADIUS = 14;

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

// ── Gradient Separator (static, renders once) ───────────
const GradientSeparator = memo(function GradientSeparator() {
  return (
    <View style={styles.separatorContainer}>
      <Svg width="100%" height={1}>
        <Defs>
          <LinearGradient id="sepGrad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="transparent" />
            <Stop offset="0.3" stopColor={ACCENT_PRIMARY} stopOpacity="0.4" />
            <Stop offset="0.5" stopColor={ACCENT_PRIMARY} stopOpacity="0.6" />
            <Stop offset="0.7" stopColor={ACCENT_PRIMARY} stopOpacity="0.4" />
            <Stop offset="1" stopColor="transparent" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height={1} fill="url(#sepGrad)" />
      </Svg>
    </View>
  );
});

// ── Center Plus Button ──────────────────────────────────
const CenterButton = memo(function CenterButton({
  focused,
  onPress,
}: {
  focused: boolean;
  onPress: () => void;
}) {
  const rotateAnim = useRef(new Animated.Value(focused ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: focused ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  const handlePress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  }, [onPress]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  return (
    <Pressable onPress={handlePress} style={styles.centerTouchable}>
      <View style={styles.centerContainer}>
        {/* Glow — only when focused */}
        {focused && <View style={styles.centerGlow} />}

        {/* Gradient ring */}
        <View style={styles.centerRing}>
          <Svg width={RING_W} height={RING_H}>
            <Defs>
              <LinearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor={PLUS_GRADIENT_START} />
                <Stop offset="1" stopColor={PLUS_GRADIENT_END} />
              </LinearGradient>
            </Defs>
            <Rect
              x={1}
              y={1}
              width={RING_W - 2}
              height={RING_H - 2}
              rx={RING_RADIUS}
              ry={RING_RADIUS}
              stroke="url(#ringGrad)"
              strokeWidth={1.5}
              fill="none"
            />
          </Svg>
        </View>

        {/* Button surface */}
        <View style={styles.centerButton}>
          <Animated.View style={{ transform: [{ rotate: rotation }] }}>
            <PlusIcon size={24} color={ACTIVE_COLOR} />
          </Animated.View>
        </View>
      </View>
    </Pressable>
  );
});

// ── Tab Button ──────────────────────────────────────────
const TabButton = memo(function TabButton({
  tab,
  focused,
  onPress,
}: {
  tab: TabDef;
  focused: boolean;
  onPress: () => void;
}) {
  const isRight = tab.side === 'right';
  const Icon = focused ? tab.SolidIcon : tab.OutlineIcon;

  return (
    <Pressable
      onPress={onPress}
      style={styles.tabTouchable}
      android_ripple={{
        color: 'rgba(255, 255, 255, 0.08)',
        borderless: true,
        radius: 30,
      }}
    >
      <View style={styles.tabInner}>
        {/* Pill — mounts/unmounts with LayoutAnimation */}
        {focused && <View style={styles.activePill} />}

        {/* Content */}
        <View style={[styles.tabContent, isRight && styles.tabContentReversed]}>
          <Icon
            size={ICON_SIZE}
            color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
          />

          {tab.hasLabel && focused && (
            <Text
              style={[
                styles.tabLabel,
                isRight ? styles.labelRight : styles.labelLeft,
              ]}
              numberOfLines={1}
            >
              {tab.label}
            </Text>
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
    <View
      style={[styles.barOuter, { paddingBottom: Math.max(insets.bottom, 4) }]}
    >
      <GradientSeparator />

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
              // Trigger smooth layout transition before navigation
              LayoutAnimation.configureNext(TRANSITION_CONFIG);
              Haptics.impactAsync(
                tab.side === 'center'
                  ? Haptics.ImpactFeedbackStyle.Medium
                  : Haptics.ImpactFeedbackStyle.Light,
              );
              navigation.navigate(route.name, route.params);
            }
          };

          if (tab.side === 'center') {
            return (
              <CenterButton
                key={route.key}
                focused={focused}
                onPress={onPress}
              />
            );
          }

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
  separatorContainer: {
    height: 1,
    overflow: 'hidden',
  },
  bar: {
    flexDirection: 'row',
    backgroundColor: BAR_SURFACE,
    height: BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 8,
    borderTopWidth: 0,
  },

  // ── Regular tab ─────────────────────────────────────
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
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
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
    fontSize: 11.5,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  labelLeft: {
    marginLeft: 6,
  },
  labelRight: {
    marginRight: 6,
  },

  // ── Center button ───────────────────────────────────
  centerTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: '100%',
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: RING_W,
    height: RING_H,
  },
  centerGlow: {
    position: 'absolute',
    width: RING_W + 20,
    height: RING_H + 16,
    borderRadius: RING_RADIUS + 4,
    backgroundColor: ACCENT_GLOW,
    opacity: 0.7,
  },
  centerRing: {
    position: 'absolute',
    width: RING_W,
    height: RING_H,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButton: {
    width: PLUS_W,
    height: PLUS_H,
    borderRadius: PLUS_RADIUS,
    backgroundColor: PLUS_BG,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: ACCENT_PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
});
