import { execFileSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { cert, initializeApp, deleteApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { verifyAuthenticatedFrontend } from '../infra/verification/authenticated-frontend.mjs';
let app;
try {
  // Read only the existing API credential into this process's memory. Never
  // persist it, set a shell/environment variable, or print raw CLI/SDK errors.
  const credentialString = JSON.parse(execFileSync('az', ['webapp', 'config', 'appsettings', 'list',
    '--subscription', 'a2cc52c3-7f4e-4de7-bf59-9cc6f99bc8e2', '--resource-group', 'paddletoday', '--name', 'paddletodayapi',
    '--query', "[?name=='FIREBASE_SERVICE_ACCOUNT_JSON'].value | [0]", '--output', 'json'],
  { encoding: 'utf8', maxBuffer: 256000, stdio: ['ignore', 'pipe', 'pipe'] }));
  const credential = JSON.parse(credentialString);
  if (credential.project_id !== process.env.PUBLIC_FIREBASE_PROJECT_ID) throw new Error();
  app = initializeApp({ credential: cert(credential), projectId: credential.project_id }, 'hosting-verification');
  const report = await verifyAuthenticatedFrontend({ auth: getAuth(app), origin: process.env.FRONTEND_AUTH_ORIGIN,
    exchangeCustomToken: async token => {
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${encodeURIComponent(process.env.PUBLIC_FIREBASE_API_KEY || '')}`, {
        method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ token, returnSecureToken: true }), signal: AbortSignal.timeout(30000) });
      if (!response.ok) throw new Error('Token exchange unavailable.');
      return (await response.json()).idToken;
    } });
  await mkdir('.local/frontend-hosting', { recursive: true });
  await writeFile('.local/frontend-hosting/authenticated-verification.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  if (report.status !== 'passed' || report.cleanup !== 'deleted') process.exitCode = 1;
} catch {
  console.error('Authenticated frontend verification setup failed; credential details suppressed.'); process.exitCode = 1;
} finally {
  try { if (app) await deleteApp(app); }
  catch { console.error('Verification SDK cleanup failed; details suppressed.'); process.exitCode = 1; }
}
