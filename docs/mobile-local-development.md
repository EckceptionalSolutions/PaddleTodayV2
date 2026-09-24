# Fast Local Mobile Testing

Use the Android development build with Expo’s local dev server. Install that build once; ordinary JavaScript and UI edits then load over Wi-Fi with Fast Refresh, without making another APK. Expo Go does not include this app’s native Firebase and Google sign-in modules.

## One-time Android setup

1. Confirm `apps/mobile/firebase/google-services.json` and `apps/mobile/firebase/GoogleService-Info.plist` are present.
2. From the repository root, install dependencies if needed: `npm ci`.
3. Build the development client from `apps/mobile`:

   ```powershell
   cd apps/mobile
   npx eas-cli build --platform android --profile development
   ```

4. Install the resulting Android APK from the EAS build page on the phone. This is the development client; a `preview` APK cannot load JavaScript from the local dev server.

Rebuild this client only after changing native dependencies, app config/plugins, Firebase native files, permissions, or other native settings.

## Daily edit and test loop

1. Put the phone and development PC on the same Wi-Fi network.
2. In `apps/mobile/.env.local` (ignored by Git), copy the development values from `apps/mobile/eas.json`. In particular, set `EXPO_PUBLIC_APP_ENV=development`, `EXPO_PUBLIC_ACCOUNT_AUTH_ENABLED=1`, `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`, and `EXPO_PUBLIC_FIREBASE_AUTH_LINK_DOMAIN`. Add `EXPO_PUBLIC_GOOGLE_IOS_SIGN_IN_ENABLED=1` when testing Google sign-in on iOS.
3. Start Metro from `apps/mobile`:

   ```powershell
   npm start -- --dev-client --lan
   ```

4. Open the installed PaddleToday development build and connect it to the server shown by Metro (scan its QR code if prompted).
5. Edit and save `.tsx`, `.ts`, or other JavaScript files. Fast Refresh sends the change to the open app. Press `r` in the Metro terminal to reload manually.

If the phone cannot reach Metro over Wi-Fi, stop the server and restart it with `npm start -- --dev-client --tunnel`. If Metro serves stale code, restart with `npm start -- --dev-client --lan --clear`.

## Copyable instruction for ChatGPT

Paste this at the start of a mobile UI task:

> This repo has an Expo development build installed on my Android phone. For JavaScript, TypeScript, and UI changes, use the local Expo dev server and Fast Refresh instead of building a new APK. Make the code change, run `npm run mobile:typecheck` and relevant mobile tests, then start or reuse Metro from `apps/mobile` with `npm start -- --dev-client --lan`. Tell me when Metro is ready so I can open PaddleToday’s development build on the phone. The phone and PC are on the same Wi-Fi. Do not start an EAS build for JavaScript-only changes. Rebuild with `npx eas-cli build --platform android --profile development` only if the change affects native dependencies, app config/plugins, Firebase native files, permissions, or other native settings. The development profile uses the live API unless configured otherwise; account backup tests can change my real cloud data.

## API choice

The development EAS profile points at `https://paddletoday.com`. Setting `EXPO_PUBLIC_API_BASE_URL=https://paddletoday.com` in `.env.local` keeps that behavior; account backup tests then use the live API and the signed-in account’s cloud data.

For a local API instead, remove `EXPO_PUBLIC_API_BASE_URL` from `.env.local`, then run `npm run api` from the repository root in a second terminal. The mobile app resolves the local API through Metro on port `4322`. Local account sync also needs the API’s Firebase Admin credentials configured; without them, sign-in UI can still be tested, but sync requests will fail closed.

For the full workflow, see [Mobile EAS Internal Build Runbook](mobile-eas-internal-build-runbook.md). Expo’s [development build guide](https://docs.expo.dev/develop/development-builds/introduction/) explains the dev client, and the [Expo CLI guide](https://docs.expo.dev/more/expo-cli/) documents `--dev-client`, LAN, and tunnel modes.
