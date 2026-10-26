import { AppleAuthProvider, GoogleAuthProvider } from '@react-native-firebase/auth';
import { Platform } from 'react-native';

export function nativeSignInMethods(platform: string, googleClientId: string | undefined, googleIosEnabled: boolean, appleEnabled: boolean) {
  return {
    google: Boolean(googleClientId?.trim()) && (platform === 'android' || (platform === 'ios' && googleIosEnabled && appleEnabled)),
    apple: platform === 'ios' && appleEnabled,
  };
}

export async function googleSignInCredential(webClientId: string) {
  const { GoogleSignin, isCancelledResponse } = await import('@react-native-google-signin/google-signin');
  GoogleSignin.configure({ webClientId });
  if (Platform.OS === 'android') await GoogleSignin.hasPlayServices();
  const result = await GoogleSignin.signIn();
  if (isCancelledResponse(result)) return null;
  const { idToken } = await GoogleSignin.getTokens();
  if (!idToken) throw new Error('Google did not return an ID token.');
  return GoogleAuthProvider.credential(idToken);
}

export async function appleSignInCredential() {
  if (Platform.OS !== 'ios') throw new Error('Sign in with Apple is available on iPhone and iPad.');
  const AppleAuthentication = await import('expo-apple-authentication');
  const Crypto = await import('expo-crypto');
  const nonce = Crypto.randomUUID();
  const hashedNonce = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, nonce);
  const result = await AppleAuthentication.signInAsync({
    requestedScopes: [AppleAuthentication.AppleAuthenticationScope.EMAIL],
    nonce: hashedNonce,
  });
  if (!result.identityToken) throw new Error('Apple did not return an identity token.');
  return AppleAuthProvider.credential(result.identityToken, nonce);
}
