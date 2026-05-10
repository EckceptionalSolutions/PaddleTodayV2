import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Platform, StatusBar as NativeStatusBar } from 'react-native';
import 'react-native-reanimated';
import { initObservability, withObservability } from '../src/lib/observability';
import { AppProviders } from '../src/providers/app-providers';
import { colors } from '../src/theme/tokens';

initObservability();

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
    if (Platform.OS !== 'android') {
      return;
    }

    NativeStatusBar.setBackgroundColor(colors.canvas);
    NativeStatusBar.setTranslucent(false);
    NativeStatusBar.setBarStyle('dark-content');
  }, []);

  return (
    <AppProviders>
      <ThemeProvider value={navigationTheme}>
        <StatusBar style="dark" backgroundColor={colors.canvas} translucent={false} />
        <Stack
          screenOptions={{
            headerShadowVisible: false,
            headerStyle: { backgroundColor: colors.canvas },
            headerTintColor: colors.text,
            headerTitleStyle: {
              color: colors.text,
              fontWeight: '700',
            },
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

export default withObservability(RootLayout);
