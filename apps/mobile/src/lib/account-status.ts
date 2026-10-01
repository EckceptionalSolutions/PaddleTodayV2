export type AccountStatus = {
  auth: 'loading' | 'signed-in' | 'signed-out' | 'unavailable';
  uid: string | null;
  backup: 'unknown' | 'pending' | 'complete' | 'attention' | 'paused';
};

let status: AccountStatus = { auth: 'loading', uid: null, backup: 'unknown' };
const listeners = new Set<() => void>();

export const accountStatusSnapshot = () => status;
export function subscribeAccountStatus(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}
function publish(next: AccountStatus) {
  if (next.auth === status.auth && next.uid === status.uid && next.backup === status.backup) return;
  status = next;
  listeners.forEach(listener => listener());
}
export function setAccountUser(uid: string | null) {
  publish({ auth: uid ? 'signed-in' : 'signed-out', uid, backup: uid === status.uid ? status.backup : 'unknown' });
}
export function setAccountUnavailable() {
  publish({ auth: 'unavailable', uid: null, backup: 'unknown' });
}
export function setAccountBackupStatus(uid: string, backup: AccountStatus['backup']) {
  // A late result from a previous account must not describe the current user.
  if (status.auth === 'signed-in' && status.uid === uid) publish({ ...status, backup });
}

export function accountSupportSubtitle(value: AccountStatus) {
  if (value.auth === 'loading') return 'Checking account status…';
  if (value.auth === 'unavailable') return 'Account sign-in is unavailable in this build.';
  if (value.auth === 'signed-out') return 'Sign in to back up saved routes and trip plans.';
  if (value.backup === 'attention') return 'Signed in · Backup needs attention.';
  if (value.backup === 'pending') return 'Signed in · Backup pending.';
  if (value.backup === 'complete') return 'Signed in · Saved routes and trip drafts backed up.';
  if (value.backup === 'paused') return 'Signed in · Backup paused.';
  return 'Signed in · Manage saved routes and trip plans.';
}
