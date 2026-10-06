# Mobile Firebase Setup

Use this to configure Firebase diagnostics and account sign-in for native builds.

## 1. Create Firebase Project

1. Open the Firebase Console.
2. Create or select a PaddleToday project.
3. Enable Google Analytics for the project.
4. Add Crashlytics from the Firebase project console.

## 2. Add Mobile Apps

Add an iOS app:

- Apple bundle ID: `com.paddletoday.mobile`
- App nickname: `PaddleToday iOS`
- Download `GoogleService-Info.plist`
- Save it to `apps/mobile/firebase/GoogleService-Info.plist`
- Confirm the plist `BUNDLE_ID` is exactly `com.paddletoday.mobile`.

Add an Android app:

- Android package name: `com.paddletoday.mobile`
- App nickname: `PaddleToday Android`
- Download `google-services.json`
- Save it to `apps/mobile/firebase/google-services.json`
- Confirm the Android config package name is exactly `com.paddletoday.mobile`.

The preview and production Expo config fails fast if either file is missing.

## 3. Enable Account Sign-in

In Firebase Console for `paddletoday-9933a`:

1. Under Authentication → Sign-in method, enable Google and email-link sign-in.
2. Add `paddletoday.com` and `paddletoday-9933a.firebaseapp.com` to the authorized domains used by email action links.
3. In Project settings → Android app, register the SHA-1 certificate fingerprint for each signing identity used to install the app. For Play releases, use the Play App Signing certificate from Play Console → App integrity. For directly installed EAS builds, also register the EAS Android keystore fingerprint.
4. Download a fresh `google-services.json` after adding fingerprints and replace `apps/mobile/firebase/google-services.json`.

The production EAS profile must set `EXPO_PUBLIC_ACCOUNT_AUTH_ENABLED=1`; `app/account.tsx` and the account session provider both use that build-time flag. The release check guards this setting. Google sign-in also needs the web OAuth client ID in the production profile; email-link sign-in uses `EXPO_PUBLIC_FIREBASE_AUTH_LINK_DOMAIN` and returns to `https://paddletoday.com/auth/callback`.

## 4. Build Behavior

Firebase diagnostics are enabled only when `EXPO_PUBLIC_APP_ENV` is:

- `preview`
- `production`

The native Firebase and Google Sign-In plugins are included for preview and production builds. Development builds can also enable account sign-in through `EXPO_PUBLIC_ACCOUNT_AUTH_ENABLED=1`; Expo Go cannot load these native modules.

## 5. Configured SDKs

The app uses:

- `@react-native-firebase/app`
- `@react-native-firebase/auth`
- `@react-native-firebase/analytics`
- `@react-native-firebase/crashlytics`
- `@react-native-google-signin/google-signin`

The Expo config plugin is added dynamically by `apps/mobile/app.config.js` only for preview and production.

## 6. Privacy Defaults

`apps/mobile/firebase.json` enables Analytics and Crashlytics while disabling advertising-oriented collection settings:

- Ad storage.
- Ad user data.
- Ad personalization signals.
- Android Advertising ID collection.
- iOS ad network registration.

Review store privacy forms before submitting any build with Firebase enabled.

## 7. Verify

1. Run `npm run mobile:release-check`.
2. Run `npm run mobile:typecheck`.
3. Create a preview EAS build.
4. Open the More tab and confirm Observability shows enabled.
5. Run the API diagnostic.
6. Confirm events appear in Firebase Analytics after processing delay.
7. Confirm non-fatal errors appear in Crashlytics after triggering a handled failure in QA.
8. On a Play-installed Android build, complete Google sign-in and email-link sign-in; confirm the email link returns to the app and the signed-in state survives an app restart.

Operational monitoring, event names, and triage rules live in `docs/firebase-diagnostics-ops.md`.
