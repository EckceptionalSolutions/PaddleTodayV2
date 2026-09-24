import { lazy, Suspense } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { colors } from '../../src/theme/tokens';

const AccountScreen = lazy(() => import('../../src/screens/account-screen'));
const AccountUnavailableScreen = lazy(() => import('../../src/screens/account-unavailable-screen'));
const accountAuthEnabled = process.env.EXPO_PUBLIC_ACCOUNT_AUTH_ENABLED === '1';

export default function AuthCallbackRoute() {
  return <Suspense fallback={<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.canvas }}><ActivityIndicator color={colors.accent} /></View>}>
    {accountAuthEnabled ? <AccountScreen /> : <AccountUnavailableScreen />}
  </Suspense>;
}
