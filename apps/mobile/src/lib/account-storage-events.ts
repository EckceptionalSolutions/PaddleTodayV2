import { DeviceEventEmitter } from 'react-native';

const SAVED_ROUTES_CHANGED = 'paddletoday:saved-routes-changed';

export function notifySavedRoutesChanged() {
  DeviceEventEmitter.emit(SAVED_ROUTES_CHANGED);
}

export function subscribeSavedRoutesChanged(listener: () => void) {
  const subscription = DeviceEventEmitter.addListener(SAVED_ROUTES_CHANGED, listener);
  return () => subscription.remove();
}
