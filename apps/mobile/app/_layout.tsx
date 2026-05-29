import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Stack, router } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';
import {
  addNotificationResponseListener,
  configureNativeNotifications,
  getLastNotificationResponse,
} from '../src/lib/native-notifications';
import { initObservability, withObservability } from '../src/lib/observability';
import { AppProviders } from '../src/providers/app-providers';
import { colors } from '../src/theme/tokens';

initObservability();
configureNativeNotifications();

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.canvas,
    card: colors.canvas,
    border: colors.border,
    text: colors.text,
    primary: colors.accent,
    notification: colors.accent,
  },
};

function RootLayout() {
  useEffect(() => {
    void getLastNotificationResponse().then((response) => {
      redirectFromNotification(response?.notification.request.content.data);
    });

    const subscription = addNotificationResponseListener((response) => {
      redirectFromNotification(response.notification.request.content.data);
    });

    return () => subscription.remove();
  }, []);

  return (
    <AppProviders>
      <ThemeProvider value={navigationTheme}>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShadowVisible: false,
            headerStyle: { backgroundColor: colors.canvas },
            headerTintColor: colors.text,
            headerTitleStyle: {
              color: colors.text,
              fontWeight: '700',
            },
            headerBackTitle: 'Back',
            contentStyle: { backgroundColor: colors.canvas },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="river/[slug]" options={{ title: 'River detail' }} />
          <Stack.Screen name="river-hub/[riverId]" options={{ title: 'River hub' }} />
          <Stack.Screen name="contribute-photo/[slug]" options={{ title: 'Contribute photos' }} />
          <Stack.Screen name="request-route" options={{ title: 'Request route' }} />
          <Stack.Screen name="privacy" options={{ title: 'Privacy' }} />
          <Stack.Screen name="terms" options={{ title: 'Terms' }} />
        </Stack>
      </ThemeProvider>
    </AppProviders>
  );
}

function redirectFromNotification(data: unknown) {
  const url = notificationUrl(data);
  if (url) {
    router.push(url as never);
  }
}

function notificationUrl(data: unknown) {
  if (!data || typeof data !== 'object' || !('url' in data)) {
    return null;
  }

  const url = (data as { url?: unknown }).url;
  return typeof url === 'string' && url.startsWith('/') ? url : null;
}

export default withObservability(RootLayout);
