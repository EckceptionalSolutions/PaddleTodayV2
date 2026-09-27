import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth, type DecodedIdToken } from 'firebase-admin/auth';

let app: ReturnType<typeof initializeApp> | null = null;
function firebaseAuthApp() {
  if (app) return app;
  const configured = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();
  if (!configured) throw new FirebaseAuthUnavailableError();
  try {
    const credential = JSON.parse(configured) as { project_id?: string; client_email?: string; private_key?: string };
    if (!credential.project_id || !credential.client_email || !credential.private_key) throw new FirebaseAuthUnavailableError();
    app = getApps().find(value => value.name === 'paddletoday-account-auth')
      ?? initializeApp({ credential: cert(credential as Parameters<typeof cert>[0]), projectId: credential.project_id }, 'paddletoday-account-auth');
    return app;
  } catch (error) {
    if (error instanceof FirebaseAuthUnavailableError) throw error;
    throw new FirebaseAuthUnavailableError();
  }
}
/** Validate the production credential and return its Firebase project ID. */
export function assertFirebaseAuthConfigured() {
  const projectId = firebaseAuthApp().options.projectId;
  if (!projectId) throw new FirebaseAuthUnavailableError();
  return projectId;
}
export async function verifyAccountIdToken(authorization: string | undefined, options: { allowRevoked?: boolean } = {}): Promise<DecodedIdToken | null> {
  const match = authorization?.match(/^Bearer\s+([A-Za-z0-9._~-]{40,8192})$/i);
  if (!match) return null;
  if (!process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim()) {
    if (process.env.NODE_ENV === 'production') throw new FirebaseAuthUnavailableError();
    return null;
  }
  const authApp = firebaseAuthApp();
  try {
    const token = await getAuth(authApp).verifyIdToken(match[1]!, !options.allowRevoked);
    return token.uid && token.aud === authApp.options.projectId ? token : null;
  } catch {
    return null;
  }
}

export async function deleteFirebaseUser(uid: string) {
  if (!app) throw new FirebaseAuthUnavailableError();
  await getAuth(app).deleteUser(uid);
}

export async function firebaseUserExists(uid: string) {
  if (!app) throw new FirebaseAuthUnavailableError();
  try { await getAuth(app).getUser(uid); return true; }
  catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'auth/user-not-found') return false;
    throw error;
  }
}

export class FirebaseAuthUnavailableError extends Error {}
