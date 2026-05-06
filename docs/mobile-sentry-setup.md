# Mobile Sentry Setup

Use this when you are ready to turn on crash/error reporting for TestFlight, Google internal testing, or production.

## 1. Create Sentry Account and Project

1. Go to `https://sentry.io/` and sign in or create an account.
2. Create or choose the PaddleToday organization.
3. Create a new project for the mobile app.
4. Choose React Native as the platform.
5. Save these values:
   - Organization slug.
   - Project slug/name.
   - Client DSN.

Do not commit private auth tokens. The DSN is public and can be used as an Expo public env var.

## 2. Add EAS Secrets

From `apps/mobile`, set the public DSN for preview and production builds:

```sh
npx eas-cli secret:create --scope project --name EXPO_PUBLIC_SENTRY_DSN --value "YOUR_SENTRY_DSN"
```

Set the Sentry auth token for source-map upload:

```sh
npx eas-cli secret:create --scope project --name SENTRY_AUTH_TOKEN --value "YOUR_SENTRY_AUTH_TOKEN"
```

If you prefer account-level secrets, use `--scope account` instead of `--scope project`.

## 3. Create Sentry Auth Token

1. In Sentry, open Developer Settings.
2. Create an Organization Auth Token.
3. Use the scopes recommended by Sentry for React Native source-map upload and release creation.
4. Store it only in EAS secrets as `SENTRY_AUTH_TOKEN`.

## 4. Configure Build Environment

`apps/mobile/eas.json` already sets:

- `EXPO_PUBLIC_APP_ENV=development`, `preview`, or `production`.
- `EXPO_PUBLIC_SENTRY_TRACES_SAMPLE_RATE=0`.

Keep traces at `0` for MVP unless performance monitoring is intentionally enabled.

## 5. Link Sentry Plugin Config if Needed

The app already includes:

- `@sentry/react-native` in mobile dependencies.
- `@sentry/react-native` in `apps/mobile/app.json` plugins.
- `apps/mobile/metro.config.js` using `getSentryExpoConfig`.
- Runtime initialization in `apps/mobile/src/lib/observability.ts`.

During export/build, Sentry may warn that organization/project config is missing and it will use environment variables. That is acceptable if EAS secrets are set correctly. If source-map upload does not work, add the Sentry organization and project values using the official Sentry/Expo wizard or Sentry plugin configuration.

## 6. Verify in an Internal Build

1. Build a preview app with EAS.
2. Install it through TestFlight or Google internal testing.
3. Open the More tab and confirm Observability shows `Enabled`.
4. Run the API diagnostic.
5. Confirm breadcrumbs/errors appear in the Sentry project.
6. Confirm source maps are uploaded and stack traces are readable.

Optional temporary verification: add a local-only test button or throw statement in a branch, verify Sentry receives it, then remove it before release.

## 7. Store Disclosure Follow-Up

Before submission, update the App Store privacy labels and Google Play Data Safety form to match the submitted build:

- Crash/error diagnostics may be collected if Sentry is enabled.
- Route slugs, status codes, and non-identifying app state may be included in diagnostics.
- User email, contributor names, route report text, and photo contents should not be intentionally sent to Sentry by the app code.

Also review:

- `docs/mobile-observability.md`
- `docs/mobile-store-release-checklist.md`
