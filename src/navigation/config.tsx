import React from 'react';
import { Easing } from 'react-native-reanimated';

import { HomeOutline, HomeSolid, MessageOutline, MessageSolid, PlusIcon, UserOutline, UserSolid, WalletOutline, WalletSolid, } from '../components/icons/icons';
import { COLORS } from '../styles/theme/colors';

// ── Design tokens ───────────────────────────────────────
export const BAR_BG = COLORS.barBg;
export const ACTIVE_PILL_BG = COLORS.activePillBg;
export const ACTIVE_COLOR = COLORS.active;
export const INACTIVE_COLOR = COLORS.inactive;
export const ICON_SIZE = 22;
export const BAR_HEIGHT = 60;
export const PILL_H = 40;
export const PILL_RADIUS = 20;
export const PILL_SCALE_INACTIVE = 0.7;
export const PILL_SCALE_ACTIVE_ADD = 0.3; // Adds up to 1.0 when active
export const LABEL_SPACING = 7;
export const LABEL_MAX_WIDTH = 70;
export const ICON_SCALE_BOUNCE = 1.1;
export const ICON_SCALE_SHRINK = 0.92;
export const ANIM_BOUNCE_IN = 120;
export const ANIM_BOUNCE_OUT = 150;
export const ANIM_DURATION = 280;
export const ANIM_EASING = Easing.bezier(0.4, 0, 0.2, 1);

// ── Wave / SVG tokens ───────────────────────────────────
export const WAVE_HEIGHT = 15;
export const WAVE_CURVE_SPREAD = 125; // Half-width of the curve opening
export const WAVE_CURVE_CP = 35;     // Control point offset for the Bézier

// ── Plus button tokens ──────────────────────────────────
export const PLUS_ICON_SIZE = 28;
export const PLUS_ICON_COLOR = COLORS.active;

// ── Tab config ──────────────────────────────────────────
export type TabSide = 'left' | 'center' | 'right';
export type TabRoute = 'index' | 'message' | 'plus' | 'wallet' | 'user';

export interface TabDef {
  route: TabRoute;
  label: string;
  hasLabel: boolean;
  side: TabSide;
  OutlineIcon: React.ComponentType<{ size?: number; color?: string }>;
  SolidIcon: React.ComponentType<{ size?: number; color?: string }>;
}

export const TABS: TabDef[] = [
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
    label: 'Me',
    hasLabel: true,
    side: 'right',
    OutlineIcon: UserOutline,
    SolidIcon: UserSolid,
  },
];

// Pre-computed map for O(1) tab lookups by route name
export const TABS_MAP = new Map<TabRoute, TabDef>(
  TABS.map(tab => [tab.route, tab]),
);
