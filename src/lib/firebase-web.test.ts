import { afterEach, describe, expect, it, vi } from 'vitest';
import { deleteApp, getApps } from 'firebase/app';
import { firebaseWebAuth } from './firebase-web';

describe('Firebase web auth SDK wiring', () => {
  afterEach(async () => {
    await Promise.all(getApps().filter(app => app.name === 'paddletoday-web').map(deleteApp));
    vi.unstubAllEnvs();
  });

  it('creates Auth from the same registered Firebase app instance', () => {
    vi.stubEnv('PUBLIC_FIREBASE_API_KEY', 'test-api-key');
    vi.stubEnv('PUBLIC_FIREBASE_AUTH_DOMAIN', 'example.firebaseapp.com');
    vi.stubEnv('PUBLIC_FIREBASE_PROJECT_ID', 'paddletoday-test');
    vi.stubEnv('PUBLIC_FIREBASE_APP_ID', '1:123456789:web:test');

    const auth = firebaseWebAuth();

    expect(auth.app.name).toBe('paddletoday-web');
    expect(auth.app.options.projectId).toBe('paddletoday-test');
  });
});
