import { afterEach, describe, expect, it, vi } from 'vitest';
import { accountBackupFailureMessage } from './account-backup-errors';

afterEach(() => vi.restoreAllMocks());

describe('account backup diagnostics', () => {
  it('identifies a local preparation failure without logging saved data or credentials', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const error = Object.assign(new Error('private@example.com token-secret saved-note'), {
      accountBackupStage: 'prepare_local_state', requestId: 'request-123',
      idToken: 'token-secret', savedData: 'saved-note',
    });
    expect(accountBackupFailureMessage(error)).toContain('prepare the saved data');
    expect(warn).toHaveBeenCalledWith('[PaddleToday] Account backup failed', {
      errorName: 'Error', status: null, code: null, requestId: 'request-123', stage: 'prepare_local_state',
    });
    expect(JSON.stringify(warn.mock.calls)).not.toMatch(/private@example|token-secret|saved-note/);
  });

  it('keeps authentication and timeout failures actionable instead of replacing them with stage copy', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(accountBackupFailureMessage({ status: 401, accountBackupStage: 'read_cloud_snapshot' })).toContain('verify your sign-in');
    expect(accountBackupFailureMessage({ code: 'request_timeout', accountBackupStage: 'read_cloud_snapshot' })).toContain('timed out');
  });

  it('distinguishes cloud reads and ignores an untrusted stage value', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(accountBackupFailureMessage({ accountBackupStage: 'read_cloud_snapshot' })).toContain('read your account backup');
    expect(accountBackupFailureMessage({ accountBackupStage: 'private@example.com' })).toBe('Backup could not finish. Your copies on this device were kept.');
    expect(warn.mock.lastCall?.[1].stage).toBeNull();
  });
});
