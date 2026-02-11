import React from 'react';
import { Easing } from 'react-native-reanimated';

import { HomeOutline, HomeSolid, MessageOutline, MessageSolid, PlusIcon, UserOutline, UserSolid, WalletOutline, WalletSolid, } from '../components/icons/icons';

// ── Design tokens ───────────────────────────────────────
export const BAR_BG = '#101014';
export const ACTIVE_PILL_BG = '#8383837D';
export const ACTIVE_COLOR = '#FFFFFF';
export const INACTIVE_COLOR = '#6B6F80';
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
