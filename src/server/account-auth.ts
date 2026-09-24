import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth, type DecodedIdToken } from 'firebase-admin/auth';

let app: ReturnType<typeof initializeApp> | null = null;
export async function verifyAccountIdToken(authorization: string | undefined, options: { allowRevoked?: boolean } = {}): Promise<DecodedIdToken | null> {
  const match = authorization?.match(/^Bearer\s+([A-Za-z0-9._~-]{40,8192})$/i);
  if (!match) return null;
  const configured = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();
  if (!configured) {
    if (process.env.NODE_ENV === 'production') throw new FirebaseAuthUnavailableError();
    return null;
  }
  if (!app) {
    const credential = JSON.parse(configured) as { project_id?: string; client_email?: string; private_key?: string };
    if (!credential.project_id || !credential.client_email || !credential.private_key) throw new FirebaseAuthUnavailableError();
    app = getApps().find((value) => value.name === 'paddletoday-account-auth')
      ?? initializeApp({ credential: cert(credential as Parameters<typeof cert>[0]), projectId: credential.project_id }, 'paddletoday-account-auth');
  }
  try {
    const token = await getAuth(app).verifyIdToken(match[1]!, !options.allowRevoked);
    return token.uid && token.aud === app.options.projectId ? token : null;
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
