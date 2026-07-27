import { Platform } from 'react-native';
import { semanticColors, semanticRadii, semanticSpacing } from '@paddletoday/design-tokens';

export const colors = {
  canvas: '#F4F1E8',
  canvasMuted: '#ECE6D7',
  surface: '#FBF8F1',
  surfaceStrong: '#FFFFFF',
  border: '#D8D0C0',
  text: '#1F2A24',
  textMuted: '#5E685F',
  accent: '#2F6B59',
  accentSoft: '#DDEAE3',
  accentDeep: '#224D40',
  strong: semanticColors.rating.strong,
  good: semanticColors.rating.good,
  fair: semanticColors.rating.fair,
  noGo: semanticColors.rating.noGo,
  live: semanticColors.status.live,
  degraded: semanticColors.status.degraded,
  offline: semanticColors.status.offline,
  shadow: 'rgba(31, 42, 36, 0.08)',
};

export const spacing = {
  xs: semanticSpacing.native.xs,
  sm: semanticSpacing.native.sm,
  md: semanticSpacing.native.md,
  lg: semanticSpacing.native.lg,
  xl: semanticSpacing.native.xl,
};

export const radius = {
  sm: semanticRadii.native.control,
  md: semanticRadii.native.card,
  lg: semanticRadii.native.panel,
  pill: semanticRadii.native.pill,
};

export const shadow = Platform.select({
  ios: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 18,
  },
  android: {
    elevation: 3,
  },
  default: {},
});
