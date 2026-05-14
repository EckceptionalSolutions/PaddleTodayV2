import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const RIVER_ALERTS_CHANNEL_ID = 'river-alerts';

export interface NativeNotificationRegistration {
  ok: boolean;
  expoPushToken: string | null;
  message: string;
}

export function configureNativeNotifications() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}

export async function registerForRiverAlertPushNotifications(): Promise<NativeNotificationRegistration> {
  try {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync(RIVER_ALERTS_CHANNEL_ID, {
        name: 'River alerts',
        importance: Notifications.AndroidImportance.DEFAULT,
      });
    }

    const permission = await Notifications.getPermissionsAsync();
    const finalPermission = permission.granted ? permission : await Notifications.requestPermissionsAsync();
    if (!finalPermission.granted) {
      return {
        ok: false,
        expoPushToken: null,
        message: 'Notifications are off. Enable notifications in system settings to use native alerts.',
      };
    }

    const projectId = Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;
    if (!projectId) {
      return {
        ok: false,
        expoPushToken: null,
        message: 'Native alerts need an EAS project id before push tokens can be created.',
      };
    }

    const token = await Notifications.getExpoPushTokenAsync({ projectId });
    return {
      ok: true,
      expoPushToken: token.data,
      message: 'Native alert enabled.',
    };
  } catch (error) {
    return {
      ok: false,
      expoPushToken: null,
      message: error instanceof Error ? error.message : 'Native alerts could not be enabled on this device.',
    };
  }
}

export async function getLastNotificationResponse() {
  return Notifications.getLastNotificationResponse();
}

export function addNotificationResponseListener(listener: (response: Notifications.NotificationResponse) => void) {
  return Notifications.addNotificationResponseReceivedListener(listener);
}
