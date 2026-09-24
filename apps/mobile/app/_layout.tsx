import '../src/lib/suppress-web-font-timeout';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Stack, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePathname } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';
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
  savePendingLaunchTarget,
  completeWelcome,
  WELCOME_COMPLETED_STORAGE_KEY,
} from '../src/lib/onboarding';
import { FeedbackExperience } from '../src/components/feedback-experience';
import { AreaNotificationOnboarding } from '../src/components/area-notification-onboarding';

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
  const entryRoute = pathname === '/welcome' || pathname === '/sign-in' || pathname === '/tour' || pathname.startsWith('/auth/callback');
  const authEnabled = process.env.EXPO_PUBLIC_ACCOUNT_AUTH_ENABLED === '1' && Platform.OS !== 'web';
  const [authSessionReady, setAuthSessionReady] = useState(!authEnabled);
  const [hasSignedInUser, setHasSignedInUser] = useState(false);
  const [onboardingChecked, setOnboardingChecked] = useState(entryRoute);
  const routingState = useRef({ onboardingChecked, pathname });

  useEffect(() => { routingState.current = { onboardingChecked, pathname }; }, [onboardingChecked, pathname]);

  useEffect(() => {
    if (!authEnabled) return;
    let active = true;
    let unsubscribe: (() => void) | null = null;
    void import('@react-native-firebase/auth').then(({ getAuth, onAuthStateChanged }) => {
      if (!active) return;
      unsubscribe = onAuthStateChanged(getAuth(), user => {
        if (!active) return;
        setHasSignedInUser(Boolean(user));
        setAuthSessionReady(true);
      });
    }).catch(() => { if (active) setAuthSessionReady(true); });
    return () => { active = false; unsubscribe?.(); };
  }, [authEnabled]);

  useEffect(() => {
    void migrateOnboardingStorage();
  }, []);

  useEffect(() => {
    if (!authSessionReady) return;
    let active = true;
    void AsyncStorage.getItem(WELCOME_COMPLETED_STORAGE_KEY).then(async (completed) => {
      if (!active) return;
      if (completed === '1') {
        setOnboardingChecked(true);
        return;
      }
      if (hasSignedInUser && !entryRoute) {
        await completeWelcome({ choice: 'account' }).catch(() => {});
        if (active) setOnboardingChecked(true);
        return;
      }
      if (!entryRoute) {
        const returnTo = pathname.startsWith('/') && !pathname.startsWith('//') ? pathname : '/';
        if (returnTo !== '/') await savePendingLaunchTarget(returnTo).catch(() => {});
        router.replace({ pathname: '/welcome', params: { returnTo } } as never);
        return;
      }
      setOnboardingChecked(true);
    }).catch(() => {
      if (active) {
        setOnboardingChecked(true);
      }
    });

    return () => {
      active = false;
    };
  }, [authSessionReady, entryRoute, hasSignedInUser, pathname]);

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
      redirectFromNotification(response?.notification.request.content.data, routingState.current.onboardingChecked, routingState.current.pathname);
    });

    const subscription = addNotificationResponseListener((response) => {
      redirectFromNotification(response.notification.request.content.data, routingState.current.onboardingChecked, routingState.current.pathname);
    });

    return () => subscription.remove();
  }, []);

  return (
    <AppProviders>
      <AreaNotificationOnboarding active={onboardingChecked && !entryRoute} />
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
          <Stack.Screen name="sign-in" options={{ headerShown: false }} />
          <Stack.Screen name="tour" options={{ headerShown: false }} />
          <Stack.Screen name="river/[slug]" options={{ title: 'River detail' }} />
          <Stack.Screen name="river-hub/[riverId]" options={{ title: 'River hub' }} />
          <Stack.Screen name="contribute-photo/[slug]" options={{ title: 'Contribute photos' }} />
          <Stack.Screen name="request-route" options={{ title: 'Request route' }} />
          <Stack.Screen name="notifications" options={{ title: 'Notifications' }} />
          <Stack.Screen name="account" options={{ title: 'Account & backup' }} />
          <Stack.Screen name="auth/callback" options={{ title: 'Finish signing in' }} />
          <Stack.Screen name="privacy" options={{ title: 'Privacy' }} />
          <Stack.Screen name="terms" options={{ title: 'Terms' }} />
        </Stack>
        <FeedbackExperience pathname={pathname} />
        {!onboardingChecked && !entryRoute ? (
          <View style={styles.onboardingGate} accessibilityLabel="Loading Paddle Today">
            <ActivityIndicator color={colors.accent} />
          </View>
        ) : null}
      </ThemeProvider>
    </AppProviders>
  );
}

const styles = StyleSheet.create({
  onboardingGate: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.canvas,
    zIndex: 20,
  },
});

function redirectFromNotification(data: unknown, onboardingChecked: boolean, pathname: string) {
  const url = notificationUrl(data);
  if (url) {
    if (data && typeof data === 'object' && 'notificationType' in data) {
      const notificationType = (data as { notificationType?: unknown }).notificationType;
      if (notificationType === 'nearby_today' || notificationType === 'weekend_outlook') {
        trackAppEvent('area_notification_opened', { notification_type: notificationType });
      }
    }
    if (!onboardingChecked || pathname === '/welcome' || pathname === '/tour' || pathname === '/sign-in') {
      void savePendingLaunchTarget(url).catch(() => {});
    } else {
      router.push(url as never);
    }
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
