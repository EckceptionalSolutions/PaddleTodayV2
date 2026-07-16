import { Platform } from 'react-native';

export function androidBottomInset(bottomInset: number, minimum = 32) {
  if (Platform.OS !== 'android') {
    return bottomInset;
  }

  return Math.max(bottomInset, minimum);
}
