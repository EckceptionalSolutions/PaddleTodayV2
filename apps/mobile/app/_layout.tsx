import '../src/lib/suppress-web-font-timeout';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Stack, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePathname } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';
import {
  addNotificationResponseListener,
  configureNativeNotifications,
  getLastNotificationResponse,
} from '../src/lib/native-notifications';
import { initObservability, trackAppEvent, withObservability } from '../src/lib/observability';
import { AppProviders } from '../src/providers/app-providers';
import { colors } from '../src/theme/tokens';
import {
  consumeFirstRouteOpenPending,
  migrateOnboardingStorage,
  WELCOME_COMPLETED_STORAGE_KEY,
} from '../src/lib/onboarding';
import { FeedbackExperience } from '../src/components/feedback-experience';

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
  const pathname = usePathname();

  useEffect(() => {
    void migrateOnboardingStorage();
  }, []);

  useEffect(() => {
    let active = true;
    void AsyncStorage.getItem(WELCOME_COMPLETED_STORAGE_KEY).then((completed) => {
      if (active && completed !== '1' && pathname !== '/welcome') {
        router.replace('/welcome');
      }
    });

    return () => {
      active = false;
    };
  }, [pathname]);

  useEffect(() => {
    const isRiverDetail = pathname.startsWith('/river/');
    const isRiverHub = pathname.startsWith('/river-hub/');
    if (!isRiverDetail && !isRiverHub) {
      return;
    }

    void consumeFirstRouteOpenPending().then((pending) => {
      if (pending) {
        trackAppEvent('first_route_opened_after_welcome', {
          destination: isRiverHub ? 'river_hub' : 'river_detail',
        });
      }
    });
  }, [pathname]);

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
          <Stack.Screen name="welcome" options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="river/[slug]" options={{ title: 'River detail' }} />
          <Stack.Screen name="river-hub/[riverId]" options={{ title: 'River hub' }} />
          <Stack.Screen name="contribute-photo/[slug]" options={{ title: 'Contribute photos' }} />
          <Stack.Screen name="request-route" options={{ title: 'Request route' }} />
          <Stack.Screen name="privacy" options={{ title: 'Privacy' }} />
          <Stack.Screen name="terms" options={{ title: 'Terms' }} />
        </Stack>
        <FeedbackExperience pathname={pathname} />
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
