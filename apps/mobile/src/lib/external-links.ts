import { Alert, Linking } from 'react-native';

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
