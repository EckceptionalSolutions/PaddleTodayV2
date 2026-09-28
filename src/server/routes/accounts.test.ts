import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { createServer, type Server } from 'node:http';
import { handleAccountRoute } from './accounts';

const testState = vi.hoisted(() => ({
  deletionRequested: false,
  tripDeletionCalls: 0,
  firebaseUserExists: true,
  deletionCompleted: false,
}));

vi.mock('../account-auth', () => ({
  verifyAccountIdToken: async () => ({ uid: 'account-test-user', auth_time: Math.floor(Date.now() / 1000) }),
  deleteFirebaseUser: async () => { testState.firebaseUserExists = false; },
  firebaseUserExists: async () => testState.firebaseUserExists,
  FirebaseAuthUnavailableError: class extends Error {},
}));
vi.mock('../../lib/account-sync-storage', () => ({
  accountSyncStorage: () => ({
    isDeleted: async () => testState.deletionRequested,
    deleteAccount: async () => { testState.deletionRequested = true; },
    completeDeletion: async () => { testState.deletionCompleted = true; },
  }),
  AccountGoneError: class extends Error {},
  AccountSizeLimitError: class extends Error {},
  AccountStorageUnavailableError: class extends Error {},
  StaleSyncEpochError: class extends Error {},
}));
vi.mock('../../lib/trip-storage', () => ({
  tripStorage: () => ({ deleteAccount: async () => ++testState.tripDeletionCalls >= 2 }),
}));

let server: Server;
let origin: string;
beforeAll(async () => {
  server = createServer((request, response) => {
    void handleAccountRoute(request, response, new URL(request.url!, 'http://localhost').pathname, 'account-delete-test', true);
  });
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  origin = `http://127.0.0.1:${typeof address === 'object' ? address!.port : 0}`;
});
afterAll(async () => { await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve())); });
beforeEach(() => {
  testState.deletionRequested = false;
  testState.tripDeletionCalls = 0;
  testState.firebaseUserExists = true;
  testState.deletionCompleted = false;
});

describe('resumable account deletion endpoint', () => {
  it('accepts deletion, preserves Firebase identity while data cleanup is pending, then completes on poll', async () => {
    const first = await fetch(origin + '/api/account', { method: 'DELETE', headers: { authorization: 'Bearer test' } });
    expect(first.status).toBe(202);
    expect(await first.json()).toMatchObject({ deletionRequested: true, deletionComplete: false, deleted: false });
    expect(testState.firebaseUserExists).toBe(true);

    const resumed = await fetch(origin + '/api/account/deletion', { headers: { authorization: 'Bearer test' } });
    expect(resumed.status).toBe(200);
    expect(await resumed.json()).toMatchObject({ deletionRequested: true, deletionComplete: true });
    expect(testState.firebaseUserExists).toBe(false);
    expect(testState.deletionCompleted).toBe(true);
  });
});
