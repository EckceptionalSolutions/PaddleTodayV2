import { useSyncExternalStore } from 'react';
import { accountStatusSnapshot, subscribeAccountStatus } from '../lib/account-status';

export function useAccountStatus() {
  return useSyncExternalStore(subscribeAccountStatus, accountStatusSnapshot, accountStatusSnapshot);
}
