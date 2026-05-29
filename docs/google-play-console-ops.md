# Google Play Console Operations

Use this once the `com.paddletoday.mobile` app record exists in Google Play Console.

## Current Repo Setup

Android identity:

- App name: `PaddleToday`
- Package name: `com.paddletoday.mobile`
- Production artifact: Android App Bundle (`.aab`)
- EAS production submit target: Google Play `internal` track, `draft` release status

Configured in:

- `apps/mobile/app.json`
- `apps/mobile/eas.json`
- `docs/google-play-release-plan.md`

## Access Needed

Required before automated submission:

1. Google Play Console access for the PaddleToday developer account.
2. App record for `com.paddletoday.mobile`.
3. Google Play service account with release/upload access if EAS Submit should upload builds.
4. Service account JSON stored outside git.

EAS supports `serviceAccountKeyPath` for Android submit profiles, but do not commit that JSON file. Keep it local or provide it through the secure EAS credential flow.

## Commands

Create a production Android build:

```sh
cd apps/mobile
npx eas-cli build --platform android --profile production
```

Submit latest Android build to the internal track:

```sh
cd apps/mobile
npx eas-cli submit --platform android --profile production --latest
```

If the service account key is not configured, EAS CLI will prompt for upload credentials.

## Console Checks

Before internal testing:

1. Confirm package name is exactly `com.paddletoday.mobile`.
2. Confirm Data Safety answers match `docs/mobile-store-privacy-worksheet.md`.
3. Confirm content rating answers match `docs/mobile-store-category-content-rating.md`.
4. Confirm privacy policy URL is `https://paddletoday.com/privacy/`.
5. Confirm support URL is `https://paddletoday.com/contact/`.
6. Confirm Firebase config files match this Android package.

After internal testing begins:

1. Watch Android vitals for crashes and ANRs.
2. Compare Play pre-launch warnings with `docs/google-play-android-platform-warnings.md`.
3. Check reviews and tester feedback daily during launch week.
4. Match any crash cluster against Firebase Crashlytics and Outlook support mail.

## Review Triage

For public reviews:

- Reply only to the user-visible issue.
- Do not mention internal diagnostics, private emails, or unreleased fixes.
- Ask for support email only when the review lacks enough detail to reproduce.
- Convert repeated complaints into GitHub issues.

Priority mapping:

- Crash, blank screen, broken route detail: P1.
- Unsafe or wrong route recommendation: P0 or P2 depending on severity.
- Missing route: P3.
- Confusing copy or layout: P4.

## API Options

Useful Google APIs once service account access is configured:

- Android Publisher API for reviews.
- Play Developer Reporting API for Android vitals and quality metrics.

Do not automate review replies until manual reply tone and escalation rules are proven during launch.

## Sources

- Expo EAS Submit config: https://docs.expo.dev/eas/json/
- Expo EAS Submit guide: https://docs.expo.dev/submit/eas-json/
- Google Play Android Developer API: https://developers.google.com/android-publisher/api-ref/rest
