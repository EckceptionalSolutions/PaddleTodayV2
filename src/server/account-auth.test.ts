import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { verifyIdToken, initializeApp, getApps } = vi.hoisted(() => ({
  verifyIdToken: vi.fn(), initializeApp: vi.fn((options: unknown) => ({ options, name: 'paddletoday-local-account-auth' })),
  getApps: vi.fn(() => []),
}));
vi.mock('firebase-admin/app', () => ({ initializeApp, getApps, cert: vi.fn(v => v) }));
vi.mock('firebase-admin/auth', () => ({ getAuth: () => ({ verifyIdToken }) }));

import { FirebaseAuthUnavailableError, verifyAccountIdToken, assertFirebaseAuthConfigured, deleteFirebaseUser, firebaseUserExists } from './account-auth';

describe('local Firebase token verification', () => {
  afterEach(() => vi.unstubAllEnvs());
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('FIREBASE_SERVICE_ACCOUNT_JSON', '');
    vi.stubEnv('PUBLIC_FIREBASE_PROJECT_ID', 'local-web-project');
    vi.stubEnv('NODE_ENV', 'development');
    verifyIdToken.mockResolvedValue({ uid: 'alice', aud: 'local-web-project' });
  });

  it('verifies signed Firebase tokens without loading privileged credentials and skips revocation lookup', async () => {
    await expect(verifyAccountIdToken(`Bearer ${'a'.repeat(48)}`)).resolves.toMatchObject({ uid: 'alice' });
    expect(initializeApp).toHaveBeenCalledWith({ projectId: 'local-web-project' }, 'paddletoday-local-account-auth');
    expect(verifyIdToken).toHaveBeenCalledWith('a'.repeat(48), false);
  });

  it('requires the privileged service credential in production', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    await expect(verifyAccountIdToken(`Bearer ${'a'.repeat(48)}`)).rejects.toBeInstanceOf(FirebaseAuthUnavailableError);
    expect(verifyIdToken).not.toHaveBeenCalled();
  });

  it('keeps privileged readiness and account deletion unavailable with a public project only', async () => {
    await verifyAccountIdToken(`Bearer ${'a'.repeat(48)}`);
    expect(() => assertFirebaseAuthConfigured()).toThrow(FirebaseAuthUnavailableError);
    await expect(deleteFirebaseUser('alice')).rejects.toBeInstanceOf(FirebaseAuthUnavailableError);
    await expect(firebaseUserExists('alice')).rejects.toBeInstanceOf(FirebaseAuthUnavailableError);
  });

  it('rejects valid tokens issued for a different Firebase project', async () => {
    verifyIdToken.mockResolvedValue({ uid: 'alice', aud: 'another-project' });
    await expect(verifyAccountIdToken(`Bearer ${'a'.repeat(48)}`)).resolves.toBeNull();
  });
});
