import { beforeEach, describe, expect, it } from 'vitest';
import { accountStatusSnapshot, accountSupportSubtitle, setAccountBackupStatus, setAccountUser } from './account-status';

beforeEach(() => setAccountUser(null));
describe('account support status', () => {
  it('describes a signed-in account and its failed backup accurately', () => {
    setAccountUser('current');
    setAccountBackupStatus('current', 'attention');
    expect(accountSupportSubtitle(accountStatusSnapshot())).toBe('Signed in · Backup needs attention.');
  });
  it('ignores a late backup result from a different account', () => {
    setAccountUser('current');
    setAccountBackupStatus('previous', 'attention');
    expect(accountStatusSnapshot().backup).toBe('unknown');
  });
});
