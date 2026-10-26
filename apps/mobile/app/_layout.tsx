import '../src/lib/suppress-web-font-timeout';
import '../src/lib/paddle-tracking';
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
  clearNotificationResponse,
} from '../src/lib/native-notifications';
import { captureAppException, initObservability, trackAppEvent, withObservability } from '../src/lib/observability';
import { createNotificationRouter } from '../src/lib/notification-routing';
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
import { useReducedMotion } from '../src/hooks/use-reduced-motion';
import { ConnectivityNotice } from '../src/components/connectivity-notice';

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
  const reducedMotion = useReducedMotion();
  const pathname = usePathname();
  const entryRoute = pathname === '/welcome' || pathname === '/sign-in' || pathname === '/tour' || pathname.startsWith('/auth/callback');
  const authEnabled = process.env.EXPO_PUBLIC_ACCOUNT_AUTH_ENABLED === '1' && Platform.OS !== 'web';
  const [authSessionReady, setAuthSessionReady] = useState(!authEnabled);
  const [hasSignedInUser, setHasSignedInUser] = useState(false);
  const [onboardingChecked, setOnboardingChecked] = useState(entryRoute);
  const routingState = useRef({ ready: authSessionReady && onboardingChecked, pathname });
  const notificationRouter = useRef<ReturnType<typeof createNotificationRouter> | null>(null);
  if (!notificationRouter.current) notificationRouter.current = createNotificationRouter({
    getState: () => routingState.current,
    navigate: url => router.push(url as never),
    savePending: savePendingLaunchTarget,
    clearResponse: clearNotificationResponse,
    trackOpen: type => trackAppEvent('area_notification_opened', { notification_type: type }),
  });

  useEffect(() => {
    routingState.current = { ready: authSessionReady && onboardingChecked, pathname };
    void notificationRouter.current?.flush().catch(reportNotificationRoutingError);
  }, [authSessionReady, onboardingChecked, pathname]);

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
      if (completed === '1' && pathname === '/') {
        void AsyncStorage.getItem('paddletoday:trip-return').then(async target => {
          if (active && target?.startsWith('/trips?')) { await AsyncStorage.removeItem('paddletoday:trip-return'); router.replace(target as '/trips'); }
        });
      }
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
    let active = true;
    let receivedLiveResponse = false;
    const subscription = addNotificationResponseListener((response) => {
      receivedLiveResponse = true;
      void notificationRouter.current?.receive(response).catch(reportNotificationRoutingError);
    });
    void getLastNotificationResponse().then(response => {
      if (active && !receivedLiveResponse) return notificationRouter.current?.receive(response);
    }).catch(reportNotificationRoutingError);

    return () => { active = false; subscription.remove(); };
  }, []);

  return (
    <AppProviders>
      <AreaNotificationOnboarding active={onboardingChecked && !entryRoute} />
      <ThemeProvider value={navigationTheme}>
        <StatusBar style="dark" />
        <View style={{ flex: 1 }}>
        <ConnectivityNotice />
        <Stack
          screenOptions={{
            animation: reducedMotion ? 'none' : 'default',
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
          <Stack.Screen name="trips/index" options={{ title: 'My trips' }} />
          <Stack.Screen name="auth/callback" options={{ title: 'Finish signing in' }} />
          <Stack.Screen name="privacy" options={{ title: 'Privacy' }} />
          <Stack.Screen name="terms" options={{ title: 'Terms' }} />
        </Stack>
        </View>
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

function reportNotificationRoutingError(error: unknown) {
  captureAppException(error, { name: 'notification_routing_failed' });
}

export default withObservability(RootLayout);
