import { Platform } from 'react-native';
import { semanticColors, semanticRadii, semanticSpacing } from '@paddletoday/design-tokens';

export const lightColors = {
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
  good: '#4E703F',
  fair: '#7F6026',
  noGo: semanticColors.rating.noGo,
  live: semanticColors.status.live,
  degraded: '#7F6026',
  offline: semanticColors.status.offline,
  shadow: 'rgba(31, 42, 36, 0.08)',
  onAccent: '#FFFFFF',
  onImage: '#FFFFFF',
  strongSoft: '#E0EFE9',
  goodSoft: '#E8EFD9',
  fairSoft: '#F3E8CC',
  noGoSoft: '#F2DDD6',
  warningBorder: '#D8A45E',
  dangerBorder: '#D99A86',
  accentBorder: '#BFD6CC',
  surfaceOverlay: 'rgba(255, 255, 255, 0.96)',
  mapLand: '#E6ECDF',
  mapGrid: 'rgba(31, 42, 36, 0.09)',
  mapLabel: 'rgba(70, 86, 77, 0.58)',
  mapLabelSurface: 'rgba(250, 250, 244, 0.92)',
  mapWater: 'rgba(55, 133, 168, 0.28)',
  mapLandTint: 'rgba(205, 221, 193, 0.48)',
};

export type AppColors = { [Key in keyof typeof lightColors]: string };

export const darkColors: AppColors = {
  canvas: '#101A16',
  canvasMuted: '#1C2A23',
  surface: '#17231D',
  surfaceStrong: '#213128',
  border: '#43574A',
  text: '#F0F3EA',
  textMuted: '#B4C2B6',
  accent: '#83CFAE',
  accentSoft: '#233E31',
  accentDeep: '#A3DDC2',
  strong: '#8BD6B7',
  good: '#C0D889',
  fair: '#EAC77C',
  noGo: '#F0AA98',
  live: '#8BD6B7',
  degraded: '#EAC77C',
  offline: '#F0AA98',
  shadow: 'rgba(0, 0, 0, 0.32)',
  onAccent: '#10261D',
  onImage: '#FFFFFF',
  strongSoft: '#233E31',
  goodSoft: '#333D24',
  fairSoft: '#40351F',
  noGoSoft: '#432C26',
  warningBorder: '#97763E',
  dangerBorder: '#A16A58',
  accentBorder: '#476A56',
  surfaceOverlay: 'rgba(33, 49, 40, 0.96)',
  mapLand: '#1C3028',
  mapGrid: 'rgba(180, 194, 182, 0.12)',
  mapLabel: '#B4C2B6',
  mapLabelSurface: 'rgba(23, 35, 29, 0.92)',
  mapWater: 'rgba(55, 133, 168, 0.35)',
  mapLandTint: 'rgba(71, 106, 86, 0.3)',
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

// Shared roles for touched components; existing screens can migrate gradually.
export const typography = {
  title: { fontSize: 22, lineHeight: 28, fontWeight: '800' as const },
  section: { fontSize: 17, lineHeight: 23, fontWeight: '800' as const },
  body: { fontSize: 15, lineHeight: 22 },
  supporting: { fontSize: 13, lineHeight: 19 },
  label: { fontSize: 14, lineHeight: 20, fontWeight: '700' as const },
  caption: { fontSize: 12, lineHeight: 17 },
};

export const shadowForColors = (colors: AppColors) => Platform.select({
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
