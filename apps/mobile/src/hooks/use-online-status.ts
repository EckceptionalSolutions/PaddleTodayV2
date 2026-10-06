import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';
import { useSyncExternalStore } from 'react';
import { connectionIsUsable } from '../lib/connectivity';
import { refreshFreshnessClock } from './use-freshness-clock';

const subscribe = (listener: () => void) => onlineManager.subscribe(() => listener());
const snapshot = () => onlineManager.isOnline();
const serverSnapshot = () => true;

const skipSubscription = () => () => {};

export function useOnlineStatus(enabled = true) {
  return useSyncExternalStore(enabled ? subscribe : skipSubscription, snapshot, serverSnapshot);
}

// A retry must check the device again rather than reuse a paused query's
// previous connectivity state. This also wakes TanStack's paused requests.
export async function refreshDeviceConnectivity() {
  const state = await NetInfo.refresh();
  const online = connectionIsUsable(state);
  onlineManager.setOnline(online);
  refreshFreshnessClock();
  return online;
}
