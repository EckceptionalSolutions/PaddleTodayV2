import { incomingRouteLink } from '../src/lib/incoming-route-link';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function redirectSystemPath({ path }: { path: string; initial: boolean }) {
  const target = incomingRouteLink(path);
  if (target.startsWith('/trips?')) await AsyncStorage.setItem('paddletoday:trip-return', target).catch(() => {});
  return target;
}
