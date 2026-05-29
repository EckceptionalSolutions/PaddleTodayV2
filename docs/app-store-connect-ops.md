# App Store Connect Operations

Use this once the App Store Connect app record is active for PaddleToday.

## Current Repo Setup

iOS identity:

- App name: `PaddleToday`
- Bundle ID: `com.paddletoday.mobile`
- App Store Connect app ID: `6769542734`
- Apple Team ID: `F73XS8FMPL`
- Production submit target: App Store Connect/TestFlight

Configured in:

- `apps/mobile/app.json`
- `apps/mobile/eas.json`
- `docs/apple-app-store-release-plan.md`

## Access Needed

Required for ongoing operations:

1. Apple Developer Program membership.
2. App Store Connect access to app ID `6769542734`.
3. EAS iOS signing credentials.
4. App Store Connect API key if automated review or metadata reads are needed later.

Do not commit App Store Connect API keys or `.p8` files.

## Commands

Create and auto-submit a production iOS build to TestFlight:

```sh
npm run mobile:ios:testflight
```

Submit the latest finished production iOS build:

```sh
cd apps/mobile
npx eas-cli submit --platform ios --profile production --latest
```

## TestFlight Checks

For each candidate build:

1. Confirm build number and version match `apps/mobile/app.json`.
2. Confirm Firebase shows the same release after the build is installed.
3. Attach the internal tester group.
4. Keep "What to Test" aligned with `docs/apple-app-store-release-plan.md`.
5. Run `docs/mobile-native-qa-plan.md` from a clean install.
6. Do not submit for App Review until the user explicitly confirms final submission.

## App Review Checks

Before submitting for review:

1. App Review contact information is saved.
2. Privacy labels match the actual build.
3. Screenshots match the released UI.
4. iPad screenshots exist if `ios.supportsTablet` remains enabled.
5. Reviewer notes clearly say no login is required.
6. Route reports, location, notifications, and photo permission flows are explainable from the notes.

## Review And Feedback Triage

Use App Store Connect for:

- TestFlight feedback.
- App Review messages.
- public App Store ratings and reviews.
- App Analytics version adoption.

Escalation:

- crash or launch failure: P1
- unsafe or wrong route recommendation: P0 or P2
- route coverage request: P3
- confusing copy/layout: P4

Cross-check App Store Connect feedback with:

- Firebase Crashlytics and Analytics.
- Outlook support mail.
- Cloudflare traffic and API health.
- GitHub issues.

## API Options

Useful once App Store Connect API access is configured:

- List apps and metadata.
- Read customer reviews.
- Read customer reviews by app version.
- Track review response status.

Do not automate customer-review replies until the public reply style is reviewed manually.

## Sources

- Expo iOS submit docs: https://docs.expo.dev/submit/ios/
- Expo EAS submit config: https://docs.expo.dev/eas/json/
- App Store Connect API customer reviews: https://developer.apple.com/documentation/appstoreconnectapi/customer-reviews
