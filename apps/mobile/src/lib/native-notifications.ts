import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const RIVER_ALERTS_CHANNEL_ID = 'river-alerts';
export const AREA_NOTIFICATIONS_CHANNEL_ID = 'nearby-opportunities';

export interface NativeNotificationRegistration {
  ok: boolean;
  expoPushToken: string | null;
  message: string;
}

export function configureNativeNotifications() {
  if (Platform.OS === 'web') {
    return;
  }

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
  return registerForPushNotifications(RIVER_ALERTS_CHANNEL_ID, 'River alerts');
}

export async function registerForAreaNotificationPushNotifications(): Promise<NativeNotificationRegistration> {
  return registerForPushNotifications(AREA_NOTIFICATIONS_CHANNEL_ID, 'Nearby paddle opportunities');
}

async function registerForPushNotifications(channelId: string, channelName: string): Promise<NativeNotificationRegistration> {
  try {
    if (Platform.OS === 'web') {
      return {
        ok: false,
        expoPushToken: null,
        message: 'Phone alerts are not available on web.',
      };
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync(channelId, {
        name: channelName,
        importance: Notifications.AndroidImportance.DEFAULT,
      });
    }

    const permission = await Notifications.getPermissionsAsync();
    const finalPermission = permission.granted ? permission : await Notifications.requestPermissionsAsync();
    if (!finalPermission.granted) {
      return {
        ok: false,
        expoPushToken: null,
        message: 'Notifications are off. Enable notifications in system settings to use phone alerts.',
      };
    }

    const projectId = Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;
    if (!projectId) {
      return {
        ok: false,
        expoPushToken: null,
        message: 'Phone alerts need an EAS project id before push tokens can be created.',
      };
    }

    const token = await Notifications.getExpoPushTokenAsync({ projectId });
    return {
      ok: true,
      expoPushToken: token.data,
      message: 'Phone alert enabled.',
    };
  } catch (error) {
    return {
      ok: false,
      expoPushToken: null,
      message: error instanceof Error ? error.message : 'Phone alerts could not be enabled on this device.',
    };
  }
}

export async function getLastNotificationResponse() {
  if (Platform.OS === 'web') {
    return null;
  }

  return Notifications.getLastNotificationResponse();
}

export function addNotificationResponseListener(listener: (response: Notifications.NotificationResponse) => void) {
  if (Platform.OS === 'web') {
    return { remove: () => undefined };
  }

  return Notifications.addNotificationResponseReceivedListener(listener);
}
