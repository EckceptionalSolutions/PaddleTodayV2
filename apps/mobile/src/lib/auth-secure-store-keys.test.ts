import { describe, expect, it } from 'vitest';
import { PENDING_EMAIL, PENDING_EMAIL_ACTION, PENDING_EMAIL_RETURN_TO } from './auth-secure-store-keys';

describe('email sign-in SecureStore keys', () => {
  it('uses distinct keys accepted by Expo SecureStore', () => {
    const keys = [PENDING_EMAIL, PENDING_EMAIL_ACTION, PENDING_EMAIL_RETURN_TO];
    expect(new Set(keys).size).toBe(keys.length);
    for (const key of keys) expect(key).toMatch(/^[A-Za-z0-9._-]+$/);
  });
});
