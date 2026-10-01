import Constants from 'expo-constants';
import { Alert, Linking, Platform } from 'react-native';

export async function openExternalUrl(url: string, label = 'Link') {
  try {
    if (!(await Linking.canOpenURL(url))) {
      throw new Error(`Cannot open ${url}`);
    }

    await Linking.openURL(url);
    return true;
  } catch {
    Alert.alert(`${label} unavailable`, 'This link could not be opened on the device.');
    return false;
  }
}

export async function openDeviceSettings() {
  try {
    await Linking.openSettings();
    return true;
  } catch {
    Alert.alert('Settings unavailable', 'Open your device settings and choose PaddleToday to manage permissions.');
    return false;
  }
}

/** Open Android notification controls directly; App info is the fallback. */
export async function openNotificationSettings() {
  const appPackage = Constants.expoConfig?.android?.package;
  if (Platform.OS === 'android' && appPackage) {
    try {
      await Linking.sendIntent('android.settings.APP_NOTIFICATION_SETTINGS', [
        { key: 'android.provider.extra.APP_PACKAGE', value: appPackage },
      ]);
      return true;
    } catch { /* Older devices may only offer App info. */ }
  }
  return openDeviceSettings();
}
