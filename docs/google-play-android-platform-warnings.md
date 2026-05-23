# Google Play Android Platform Warnings

Status date: 2026-05-22.

Scope: PaddleToday Android app, Expo/React Native project in `apps/mobile`, package `com.paddletoday.mobile`.

## Android 15 Edge-to-Edge

Google Play reported deprecated Android 15 system bar and display cutout API calls, including `Window.setStatusBarColor`, `Window.getStatusBarColor`, `Window.setNavigationBarColor`, `Window.getNavigationBarColor`, and legacy cutout layout modes.

Current platform guidance:

- Android 15 makes apps targeting API 35 draw edge-to-edge by default. Status bar color APIs are deprecated and have no effect, and several navigation/status bar APIs are deprecated or disabled.
- React Native documents `StatusBar.backgroundColor` and `StatusBar.translucent` as deprecated/no-op on Android API 35 because of Android 15 edge-to-edge enforcement.
- Expo SDK 54 uses React Native 0.81 and targets Android 16/API 36. Expo's SDK 54 notes say edge-to-edge is enabled for Android apps and cannot be disabled.

Local changes made:

- `apps/mobile/app/_layout.tsx` now uses `<StatusBar style="dark" />` only. PaddleToday no longer calls `NativeStatusBar.setBackgroundColor`, `NativeStatusBar.setTranslucent`, or passes `backgroundColor`/`translucent` props.
- `apps/mobile/app.json` now sets `android.edgeToEdgeEnabled` to `true` so the app config matches Expo SDK 54 behavior.

Remaining warnings expected:

- Play may still report library-origin call sites from React Native, `react-native-screens`, Expo dev launcher, `expo-image-picker`, or Material/Google components. Those calls are not made directly by PaddleToday app code.
- `expo-dev-client` / Expo dev launcher call sites should not be present in a production EAS build unless the production profile includes development-client behavior.
- The supported follow-up is dependency maintenance: stay on current Expo SDK 54 patch releases, run `npx expo install --check`, and re-check after Expo SDK 55 / React Native updates. Avoid adding app-level native hacks for system bar colors because Android 15+ ignores those APIs.

Native QA needed:

- Install a production or preview EAS Android build on an Android 15+ device using gesture navigation and three-button navigation.
- Verify Today, Explore map, Weekend, Saved, River detail, route report sheets, image picker, notification permission, and alert flows do not place actionable controls under the status or navigation bars.
- Pay special attention to the Explore full-bleed map and bottom route drawer because those intentionally draw behind system bars and consume safe-area insets.

## Android 16 Large Screens

Google Play reported orientation restrictions:

- `com.paddletoday.mobile.MainActivity android:screenOrientation="PORTRAIT"`
- GMS barcode scanner internal activity `android:screenOrientation="PORTRAIT"`

Current platform guidance:

- Android 16/API 36 ignores orientation, resizability, and aspect-ratio restrictions on large-screen devices with smallest width at least 600 dp.
- Android's documented temporary strategy is to keep portrait behavior on small screens while supporting landscape on large screens after the app has adaptive layout coverage.

Local assessment:

- The source of PaddleToday `MainActivity` portrait mode is `apps/mobile/app.json` root `"orientation": "portrait"`.
- Removing that setting is not a safe scoped change yet. It would enable rotation on phones as well as large screens, and the main mobile screens are still primarily phone-column layouts.
- Today, Weekend, Saved, and River detail are mostly scroll-based and likely degrade acceptably on large screens, but they have not had native foldable/tablet landscape QA.
- Explore is a full-bleed map with absolute overlay controls and a bottom drawer. It already uses safe-area insets and window height, but it needs native landscape/tablet verification before the app removes its global portrait lock.

Decision for this PR:

- Keep `"orientation": "portrait"` for current production phone behavior.
- Do not modify the GMS/ML Kit barcode scanner activity. It is third-party-owned, and there is no clean PaddleToday app config path identified for changing that internal activity.
- Treat the Play large-screen item as a warning/follow-up, not a production blocker for the current release.

Follow-up options:

- Add tablet/foldable native QA to `docs/mobile-native-qa-plan.md`.
- If landscape support is desired, add adaptive layouts first, especially for Explore map overlays and route detail tab/header behavior.
- After large-screen QA passes, evaluate changing root `"orientation"` from `"portrait"` to `"default"` in `apps/mobile/app.json` and create a new Android build for Play testing.

References:

- Android 15 behavior changes: https://developer.android.com/about/versions/15/behavior-changes-15
- React Native StatusBar docs: https://reactnative.dev/docs/statusbar
- Expo SDK 54 changelog: https://expo.dev/changelog/sdk-54
- Android 16 behavior changes: https://developer.android.com/about/versions/16/behavior-changes-16
- Android large-screen orientation strategy: https://developer.android.com/develop/ui/compose/quick-guides/content/restrict-app-orientation-on-phones
