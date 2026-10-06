/// <reference types="astro/client" />
import { firebaseWebAuth } from './firebase-web';
import { webFeatureFlags } from './web-feature-flags';
import { getAuth, signOut } from 'firebase/auth';

const config = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
};

export function getWebAuth() {
  if (!webFeatureFlags.webAccountExperience || !config.apiKey || !config.projectId) return null;
  try {
    return firebaseWebAuth();
  } catch (error) {
    console.error('Website account sign-in could not be initialized.', error instanceof Error ? error.message : 'Unknown initialization error');
    return null;
  }
}

/** Public pages don't load the trip repository just to display account identity. */
export async function signOutWebAccount() {
  const auth = getWebAuth();
  await auth?.authStateReady();
  const uid = auth?.currentUser?.uid;
  if (!auth || !uid) return;
  const { tripBrowserStorage: storage } = await import('./trip-browser-storage');
  const raw = await storage.getItem(`paddletoday:trips:v1:${uid}`);
  const editor = await storage.getItem(`trip-editor:${uid}`);
  if ((raw && JSON.parse(raw).pending?.length) || editor) {
    throw new Error('You have unfinished trip changes on this device. Open My trips to save or review them before signing out.');
  }
  await signOut(auth);
  await storage.clearAccount(uid);
}
