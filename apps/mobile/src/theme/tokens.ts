import { Platform } from 'react-native';

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
  strong: '#2F6B59',
  good: '#567B46',
  fair: '#8A6A2A',
  noGo: '#8C4A36',
  live: '#2F6B59',
  degraded: '#8A6A2A',
  offline: '#8C4A36',
  shadow: 'rgba(31, 42, 36, 0.08)',
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 20,
  xl: 28,
};

export const radius = {
  sm: 10,
  md: 16,
  lg: 22,
  pill: 999,
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
