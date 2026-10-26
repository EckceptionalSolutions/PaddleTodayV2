import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  platform: { OS: 'ios' },
  configure: vi.fn(), hasPlayServices: vi.fn(), signIn: vi.fn(), getTokens: vi.fn(),
  googleCredential: vi.fn(), appleCredential: vi.fn(), appleSignIn: vi.fn(),
  randomUUID: vi.fn(), digest: vi.fn(),
}));
vi.mock('react-native', () => ({ Platform: mocks.platform }));
vi.mock('@react-native-firebase/auth', () => ({
  GoogleAuthProvider: { credential: mocks.googleCredential }, AppleAuthProvider: { credential: mocks.appleCredential },
}));
vi.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: { configure: mocks.configure, hasPlayServices: mocks.hasPlayServices, signIn: mocks.signIn, getTokens: mocks.getTokens },
  isCancelledResponse: (result: { type: string }) => result.type === 'cancelled',
}));
vi.mock('expo-apple-authentication', () => ({
  signInAsync: mocks.appleSignIn, AppleAuthenticationScope: { EMAIL: 0 },
}));
vi.mock('expo-crypto', () => ({ randomUUID: mocks.randomUUID, digestStringAsync: mocks.digest, CryptoDigestAlgorithm: { SHA256: 'SHA-256' } }));

import { appleSignInCredential, googleSignInCredential, nativeSignInMethods } from './native-sign-in';

beforeEach(() => {
  vi.resetAllMocks();
  mocks.platform.OS = 'ios';
  mocks.signIn.mockResolvedValue({ type: 'success' });
  mocks.getTokens.mockResolvedValue({ idToken: 'google-token' });
  mocks.googleCredential.mockReturnValue({ providerId: 'google.com' });
  mocks.randomUUID.mockReturnValue('raw-nonce');
  mocks.digest.mockResolvedValue('hashed-nonce');
  mocks.appleSignIn.mockResolvedValue({ identityToken: 'apple-token' });
  mocks.appleCredential.mockReturnValue({ providerId: 'apple.com' });
});

describe('native sign-in release methods', () => {
  it('offers Google on iOS only alongside the enabled Apple option', () => {
    expect(nativeSignInMethods('ios', 'client', true, true)).toEqual({ google: true, apple: true });
    expect(nativeSignInMethods('ios', 'client', true, false)).toEqual({ google: false, apple: false });
    expect(nativeSignInMethods('ios', 'client', false, true)).toEqual({ google: false, apple: true });
  });
  it('preserves Android Google sign-in and excludes native providers on web', () => {
    expect(nativeSignInMethods('android', 'client', false, false)).toEqual({ google: true, apple: false });
    expect(nativeSignInMethods('web', 'client', true, true)).toEqual({ google: false, apple: false });
    expect(nativeSignInMethods('android', ' ', true, true).google).toBe(false);
  });
  it('does not request Google Play services on iOS', async () => {
    await expect(googleSignInCredential('client')).resolves.toEqual({ providerId: 'google.com' });
    expect(mocks.hasPlayServices).not.toHaveBeenCalled();
    expect(mocks.googleCredential).toHaveBeenCalledWith('google-token');
    mocks.platform.OS = 'android';
    await googleSignInCredential('client');
    expect(mocks.hasPlayServices).toHaveBeenCalledOnce();
  });
  it('does not exchange a credential after Google cancellation', async () => {
    mocks.signIn.mockResolvedValue({ type: 'cancelled' });
    await expect(googleSignInCredential('client')).resolves.toBeNull();
    expect(mocks.getTokens).not.toHaveBeenCalled();
    expect(mocks.googleCredential).not.toHaveBeenCalled();
  });
  it('sends the hashed nonce to Apple and the matching raw nonce to Firebase', async () => {
    await expect(appleSignInCredential()).resolves.toEqual({ providerId: 'apple.com' });
    expect(mocks.digest).toHaveBeenCalledWith('SHA-256', 'raw-nonce');
    expect(mocks.appleSignIn).toHaveBeenCalledWith({ requestedScopes: [0], nonce: 'hashed-nonce' });
    expect(mocks.appleCredential).toHaveBeenCalledWith('apple-token', 'raw-nonce');
  });
  it('does not authenticate an Apple response without an identity token', async () => {
    mocks.appleSignIn.mockResolvedValue({ identityToken: null });
    await expect(appleSignInCredential()).rejects.toThrow('identity token');
    expect(mocks.appleCredential).not.toHaveBeenCalled();
  });
  it('propagates Apple cancellation without creating a Firebase credential', async () => {
    const cancelled = Object.assign(new Error('Canceled'), { code: 'ERR_REQUEST_CANCELED' });
    mocks.appleSignIn.mockRejectedValue(cancelled);
    await expect(appleSignInCredential()).rejects.toBe(cancelled);
    expect(mocks.appleCredential).not.toHaveBeenCalled();
  });
});
