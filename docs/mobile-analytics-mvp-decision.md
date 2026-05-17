# Mobile Analytics MVP Decision

Decision: use Firebase Analytics plus Crashlytics for preview and production native builds. Keep development builds and Expo Go as no-op.

## Why

The launch need is operational confidence without a recurring vendor bill. At current scale, paid crash reporting is not worth the monthly minimum.

For MVP, the important questions remain:

- Did the app crash?
- Did the API fail?
- Which screen or route was involved?
- Did route reports, alerts, directions, saves, and diagnostics fail?

Firebase Analytics and Crashlytics cover mobile usage events and crash reporting without the paid subscription floor.

## Current State

The app records no third-party analytics or crash data in development. Preview and production builds initialize Firebase through `apps/mobile/app.config.js` when these files are present:

- `apps/mobile/firebase/GoogleService-Info.plist`
- `apps/mobile/firebase/google-services.json`

## Deferred Signals

Firebase receives:

- native crashes through Crashlytics,
- handled React Query query and mutation errors,
- handled API diagnostic failures,
- handled route report submission failures,
- route opens,
- saved river toggles,
- directions opens,
- route report starts/submissions,
- alert creation starts/successes/failures,
- API diagnostic starts/successes/failures,
- support link opens.

## What We Are Avoiding For MVP

Do not add paid or higher-disclosure analytics features yet:

- session replay,
- attribution,
- ad campaign analytics,
- identity stitching,
- push notification tracking,
- precise location analytics.

Those would create extra implementation, data safety, and privacy-policy work without being required for the first release.
