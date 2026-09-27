/// <reference types="astro/client" />
import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const appName = 'paddletoday-web';

export function firebaseWebAuth() {
  const config = {
    apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
    authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
    appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
  };
  if (Object.values(config).some(value => typeof value !== 'string' || !value.trim())) {
    throw new Error('Website sign-in is not configured yet.');
  }
  const app = getApps().find(value => value.name === appName) || initializeApp(config, appName);
  return getAuth(app);
}
