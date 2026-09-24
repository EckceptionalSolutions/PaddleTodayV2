import AccountScreen from '../src/screens/account-screen';
import AccountUnavailableScreen from '../src/screens/account-unavailable-screen';

const accountAuthEnabled = process.env.EXPO_PUBLIC_ACCOUNT_AUTH_ENABLED === '1';

export default function AccountRoute() {
  return accountAuthEnabled ? <AccountScreen /> : <AccountUnavailableScreen />;
}
