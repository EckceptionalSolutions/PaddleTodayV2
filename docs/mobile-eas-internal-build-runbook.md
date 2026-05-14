# Mobile EAS Internal Build Runbook

Goal: produce one installable iOS internal build and one installable Android internal build for MVP QA.

This runbook assumes the mobile app is in `apps/mobile` and uses the Expo/EAS config already in the repo.

## 1. Local Preflight

Run from the repo root:

```sh
npm run mobile:typecheck
npm run mobile:release-check
npm run mobile:api-smoke
```

Expected:

- TypeScript passes.
- Release readiness checks pass.
- Production API smoke checks pass against `https://paddletoday.com`.

Regenerate icon assets only if the source brand mark changed:

```sh
npm run mobile:generate-icons
```

## 2. Install And Authenticate EAS

Run from the repo root:

```sh
npx eas-cli --version
npx eas-cli login
npx eas-cli whoami
```

Expected:

- `npx eas --version` satisfies `>= 16.0.0`.
- `npx eas whoami` shows the PaddleToday Expo account or a user with access to it.

If the app is not linked to an EAS project yet:

```sh
cd apps/mobile
npx eas-cli init
```

Use the PaddleToday account/project. Do not create the project under a personal account unless that is the intended long-term owner.

If you are using the repo-pinned EAS CLI, this root script verifies the same login state:

```sh
npm run mobile:eas:whoami
```

## 3. Configure EAS Secrets

Required before Android Explore map builds can render Google Maps:

```sh
cd apps/mobile
npx eas-cli env:create --scope project --name GOOGLE_MAPS_ANDROID_API_KEY --value "<Google Maps Android API key>" --visibility sensitive --environment preview
```

Use `--environment production` as well before production Android builds. Do not use secret visibility for this key because Expo needs to read it while resolving `android.config.googleMaps.apiKey`; the key is embedded in the Android app and should be protected with Google Cloud Android app restrictions.

Required before observability can work in preview/production builds:

```sh
cd apps/mobile
npx eas-cli secret:create --scope project --name EXPO_PUBLIC_SENTRY_DSN --value "<public mobile Sentry DSN>"
npx eas-cli secret:create --scope project --name SENTRY_AUTH_TOKEN --value "<Sentry auth token>"
```

Optional if Sentry project metadata is required by the build plugin in your setup:

```sh
npx eas-cli secret:create --scope project --name SENTRY_ORG --value "<sentry org slug>"
npx eas-cli secret:create --scope project --name SENTRY_PROJECT --value "<sentry project slug>"
```

Do not commit secret values to the repo.

Until those Sentry values exist, EAS builds set `SENTRY_DISABLE_AUTO_UPLOAD=true` so the app can still archive for TestFlight. Remove that flag after `SENTRY_ORG`, `SENTRY_PROJECT`, and `SENTRY_AUTH_TOKEN` are configured and you want source maps/debug symbols uploaded during builds.

## 4. Configure Credentials

Run:

```sh
cd apps/mobile
npx eas-cli credentials
```

Recommended MVP path:

- Let EAS manage Android keystore credentials.
- Let EAS manage iOS distribution credentials if the Apple Developer account is ready.
- Use bundle/package identifiers already in `apps/mobile/app.json`:
  - iOS: `com.paddletoday.mobile`
  - Android: `com.paddletoday.mobile`

Do not change bundle identifiers after the first store records/builds are created unless you intentionally want a different app identity.

## 5. Create Internal Builds

Android internal APK:

```sh
cd apps/mobile
npx eas-cli build --platform android --profile preview
```

iOS internal build:

```sh
cd apps/mobile
npx eas-cli build --platform ios --profile preview
```

Expected:

- Android preview produces an installable APK.
- iOS preview produces an internal distribution build. Device UDIDs may be required unless using TestFlight later.
- Both builds use `EXPO_PUBLIC_API_BASE_URL=https://paddletoday.com`.
- Both builds use `EXPO_PUBLIC_APP_ENV=preview`.

## 6. Install And Smoke Test

Use `docs/mobile-native-qa-plan.md` as the test script.

Minimum first-pass acceptance:

- App opens from a clean install.
- Today loads without local dev server configuration.
- Explore map loads, pans/zooms, marker taps work, drawer drags.
- Weekend loads.
- Saved empty state works.
- River detail opens from Today, Explore, Weekend, and Saved.
- More tab API diagnostic succeeds.
- Build details show API `https://paddletoday.com` and environment `preview`.
- Location denial does not block the app.
- Android safe areas work with gesture and three-button navigation.
- iOS safe areas work with notch/dynamic-island devices.

## 7. Promote To Store Internal Testing

After preview builds pass local install QA:

```sh
cd apps/mobile
npx eas-cli build --platform android --profile production
npx eas-cli build --platform ios --profile production
```

Then submit through the store consoles or EAS Submit after Apple App Store Connect and Google Play app records exist.

Production Android should produce an AAB because `apps/mobile/eas.json` sets `production.android.buildType` to `app-bundle`.

## 8. Upload iOS To TestFlight

Recommended friend-testing path:

```sh
npm run mobile:ios:testflight
```

This uses the production iOS profile and `--auto-submit`, so EAS builds the signed iOS archive and uploads it to App Store Connect for TestFlight.

Before running it, confirm:

- You are logged into the intended Expo account.
- The Apple Developer membership is active.
- App Store Connect has an app record for bundle ID `com.paddletoday.mobile`.
- EAS can manage or access the Apple distribution certificate and provisioning profile.

After upload processing finishes in App Store Connect, add testers in TestFlight. Internal testers are App Store Connect users on your team. External testers can use a public invite link after Apple beta review approves the build.

## 9. Evidence To Capture

For each internal build, record:

- EAS build URL.
- Platform and profile.
- Native app version/build number.
- Device or simulator used.
- API diagnostic result.
- Sentry status from More tab.
- Any failed QA item from `docs/mobile-native-qa-plan.md`.

Store the notes in the release checklist or a dated QA note before moving to public submission.
