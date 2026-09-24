<<<<<<< HEAD
import AccountEntryScreen from '../../src/screens/account-entry-screen';
import AccountUnavailableScreen from '../../src/screens/account-unavailable-screen';

const accountAuthEnabled = process.env.EXPO_PUBLIC_ACCOUNT_AUTH_ENABLED === '1';

export default function AuthCallbackRoute() {
  return accountAuthEnabled ? <AccountEntryScreen defaultReturnTo="/account" /> : <AccountUnavailableScreen />;
}
