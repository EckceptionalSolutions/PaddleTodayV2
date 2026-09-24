# Mobile account service setup

This is an operational checklist for the account API and native authentication foundation. The mobile sign-in screen and device-triggered backup/sync are implemented. Production storage access and Firebase Admin credentials are configured, but the account API code is not yet live in production and native build/release checks remain. Do not turn on customer sign-up before deployment and device QA are complete.

## Backend settings

Configure these on the Node API service, separately for development, preview, and production:

- `FIREBASE_SERVICE_ACCOUNT_JSON`: server-only JSON credentials from the Firebase project used by the mobile app. Restrict the service account to Firebase Authentication administration. Store it in the hosting provider's secret store.
- `ACCOUNT_DATA_CONTAINER_SAS_URL`: a dedicated private Azure Blob container SAS that can read, create, update, and delete blobs. Use HTTPS and store it only in the backend secret store; never put it in mobile app configuration or logs.

Production runs on Azure App Service `paddletodayapi`. The private `account-data` container is in the existing `paddletoday` storage account in Central US. `ACCOUNT_DATA_CONTAINER_SAS_URL` is configured in App Service with HTTPS-only access and read/create/write/delete permissions; its current SAS expires at **2026-12-22 11:29:59 UTC**. Rotate it before expiry. `FIREBASE_SERVICE_ACCOUNT_JSON` is now configured; its project ID was checked against `paddletoday-9933a`, and the App Service is running. However, `GET /api/account` currently returns HTTP 404 from both `https://paddletoday.com` and the App Service hostname, while the existing public river-summary endpoint returns HTTP 200. Deploy the account API code and verify the route before enabling production sign-in. In Azure Portal, open **App Services > paddletodayapi > Settings > Environment variables > App settings** to manage backend settings.

The six App Service container SAS settings (`ACCOUNT_DATA_CONTAINER_SAS_URL`, `RIVER_ALERTS_CONTAINER_SAS_URL`, `RIVER_SNAPSHOT_CONTAINER_SAS_URL`, `ROUTE_AUDITS_CONTAINER_SAS_URL`, `ROUTE_CONTRIBUTIONS_CONTAINER_SAS_URL`, and `ROUTE_REQUESTS_CONTAINER_SAS_URL`) have been reissued with storage account Key 2; none uses a stored access policy. The account-data SAS is scoped to `account-data` with `rcwd` permissions and expires 2026-12-22 11:29:59 UTC. The other five retain their existing container scopes and `racwdl` permissions and expire between 2027-07-22 10:26:14 and 10:27:06 UTC. Storage account Key 1 was regenerated on 2026-09-24, invalidating its old SAS tokens. The App Service remains running with the Key 2 replacements.

The dedicated `paddletoday-api-auth@paddletoday-9933a.iam.gserviceaccount.com` service account has the **Firebase Authentication Admin** role (`roles/firebaseauth.admin`), and its JSON key is configured in Azure's `FIREBASE_SERVICE_ACCOUNT_JSON` app setting. Keep the key only in Azure's secret-backed app settings; do not put it in GitHub Actions secrets, the repository, EAS, or chat. Delete the downloaded local key file after confirming the service is working, and rotate the Firebase key according to your chosen policy.

The API rejects requests without a valid Firebase ID token. Production fails closed if either setting is missing. Local development uses `.local/account-data` only when Firebase Admin credentials are configured. Never point development at the production account container.

Suggested Azure container policy:

- Private container access; no anonymous blob reads.
- SAS limited to the account-data container and the operations above.
- HTTPS-only, short rotation window, and alert on unusual reads/deletions.
- Separate account-data access from route intake, alert, and public snapshot containers.
- Enable protected operational backups and restrict restore access to designated operators.
- Set a defined recovery-copy retention window before launch and reflect that exact window in the published privacy policy and deletion help.

## Firebase project

1. Use one dedicated Firebase project per environment, separate from analytics where practical.
2. Register iOS bundle ID `com.paddletoday.mobile` and Android package `com.paddletoday.mobile`.
3. Google and email-link sign-in are enabled in Firebase Authentication. Apple Sign in and Facebook are deferred. Keep provider secrets and signing keys in a secret manager.
4. Add the matching `GoogleService-Info.plist` and `google-services.json` to `apps/mobile/firebase/` for native builds. Do not commit these files unless the repository's existing Firebase config policy explicitly permits it.
5. Firebase Hosting now serves the app-link association files from `https://paddletoday-9933a.web.app` and the Firebase Auth domain alias. The root `firebase.json` and `.firebaserc` deploy only `firebase-auth-hosting/`. To redeploy after changing the files, run from the repository root:

   ```sh
   npx firebase-tools deploy --only hosting --project paddletoday-9933a
   ```

   This serves only the Firebase Hosting app-link association files on `paddletoday-9933a.firebaseapp.com`; it does not replace the PaddleToday website, whose custom domain is hosted elsewhere. The app's current build profiles use this default Firebase Hosting link domain. `paddletoday.com` is authorized for the continue URL and its existing `/auth/callback` association.
6. Configure email-link sender name, verified sending domain, SPF/DKIM, neutral sign-in copy, and delivery monitoring. Set a service-side quota and abuse controls. Verify that mobile links use the Firebase Hosting link domain and current Firebase Auth SDKs; older email-link implementations based on Firebase Dynamic Links stopped working after 2025-08-25.
7. Configure Google OAuth IDs and Play signing SHA fingerprints. Google and email-link providers are enabled, but confirm OAuth client IDs and Play signing SHA fingerprints against release builds. Apple Sign in and Facebook/Meta provider setup are deferred.
8. Confirm `FIREBASE_SERVICE_ACCOUNT_JSON` remains configured and its project ID matches the client Firebase project. After deploying the account API, verify the public `/api/account` route returns an authentication-required response to requests without a token rather than 404 or 503.

The Firebase Web API key used by native Firebase configuration is an app identifier, not an Admin secret. It must never be used as proof of identity; the Node API authorizes requests using verified ID tokens.

## Mobile build settings

Set `EXPO_PUBLIC_ACCOUNT_AUTH_ENABLED=1` to expose account sign-in and sync in development or preview builds. Production intentionally leaves this unset until provider setup, backend secrets, Hosting links, and physical-device release checks are complete. Add Firebase native configuration before creating the build. Expo Go cannot exercise native Google or Firebase Auth flows.

Set `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` and `EXPO_PUBLIC_FIREBASE_AUTH_LINK_DOMAIN` for the native build. Google sign-in is enabled on Android and on development/preview iOS builds; the current iOS Firebase plist contains the `com.paddletoday.mobile` Google client ID and reversed client ID. Production account sign-in remains gated until the launch checks and backend secrets are complete. Facebook variables are not required while Facebook is deferred. Never put Firebase Admin credentials in `EXPO_PUBLIC_*` variables or the mobile bundle.

Create fresh iOS and Android development builds after changing native plugins, entitlements, URL schemes, associated domains, or Facebook configuration. Expo hot reload does not apply native changes.

Email links use Firebase Hosting's `/__/auth/links` path to open the mobile app and return through `https://paddletoday.com/auth/callback`. Publish valid association files for both domains and configure the Firebase Auth link domain. The Firebase provider requires the Email/Password provider switch to remain enabled alongside the email-link switch, but the app only offers passwordless links (no password form, password reset, or password support flow).

## Launch checks

- Confirm Firebase Auth and API use the same project and provider identities.
- Verify the backend denies missing, malformed, expired, revoked, and wrong-project tokens.
- Verify that account container access is private and the production SAS permits deletion.
- Test account deletion after recent authentication and confirm both the Firebase user and cloud document are removed.
- Confirm provider callbacks open the app from both a cold start and an already-running app.
- Confirm passwordless email links expire safely, are single-use, and do not expose action codes or email addresses in logs.
- Confirm no account endpoint response is stored by a CDN or shared HTTP cache.
- Complete the physical-device two-account and two-device migration/sync tests before production sign-up.
