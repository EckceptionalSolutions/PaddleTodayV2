# Mobile Firebase Setup

Use this when enabling analytics and crash reporting for preview and production native builds.

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

Add an Android app:

- Android package name: `com.paddletoday.mobile`
- App nickname: `PaddleToday Android`
- Download `google-services.json`
- Save it to `apps/mobile/firebase/google-services.json`

The preview and production Expo config fails fast if either file is missing.

## 3. Build Behavior

Firebase diagnostics are enabled only when `EXPO_PUBLIC_APP_ENV` is:

- `preview`
- `production`

Development builds and Expo Go keep the observability wrapper as a no-op.

## 4. Configured SDKs

The app uses:

- `@react-native-firebase/app`
- `@react-native-firebase/analytics`
- `@react-native-firebase/crashlytics`

The Expo config plugin is added dynamically by `apps/mobile/app.config.js` only for preview and production.

## 5. Privacy Defaults

`apps/mobile/firebase.json` enables Analytics and Crashlytics while disabling advertising-oriented collection settings:

- Ad storage.
- Ad user data.
- Ad personalization signals.
- Android Advertising ID collection.
- iOS ad network registration.

Review store privacy forms before submitting any build with Firebase enabled.

## 6. Verify

1. Run `npm run mobile:release-check`.
2. Run `npm run mobile:typecheck`.
3. Create a preview EAS build.
4. Open the More tab and confirm Observability shows enabled.
5. Run the API diagnostic.
6. Confirm events appear in Firebase Analytics after processing delay.
7. Confirm non-fatal errors appear in Crashlytics after triggering a handled failure in QA.
