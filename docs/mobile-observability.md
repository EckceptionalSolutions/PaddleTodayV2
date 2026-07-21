# Mobile Observability

PaddleToday mobile keeps observability calls behind a small app-level wrapper in `apps/mobile/src/lib/observability.ts`.

The wrapper sends events and handled errors to Firebase Analytics and Crashlytics only in preview and production native builds. Development builds and Expo Go stay no-op.

## Current Runtime Behavior

Configured today:

- `EXPO_PUBLIC_APP_ENV`: `development`, `preview`, or `production`.

Preview/production native builds require:

- `apps/mobile/firebase/GoogleService-Info.plist`
- `apps/mobile/firebase/google-services.json`

## Preserved Event Hooks

The app calls `trackAppEvent` for:

- Route opened.
- Explore filter applied, including paddle length.
- Route planner viewed, with default or deep-link source.
- Route planner opened from a filtered discovery card.
- Route segment selected manually.
- Saved river toggled.
- Directions opened.
- Route report started.
- Route report submitted.
- App opened.
- Alert create started, succeeded, or failed.
- API diagnostic started, succeeded, or failed.
- Support links opened.

The app calls `captureAppException` for:

- React Query query errors.
- React Query mutation errors.
- API diagnostic failures.
- Route report submission failures.

## Provider

Configured provider:

- Firebase Analytics for product events.
- Firebase Crashlytics for native crashes and handled JavaScript errors.

See `docs/mobile-firebase-setup.md` for setup and verification.
See `docs/firebase-diagnostics-ops.md` for event names, dashboard checks, and issue triage.

## Privacy Notes

Development builds do not send diagnostics or analytics to a third party. Preview and production builds send diagnostics/events to Firebase when the native config files are present.

Before store submission, make sure the privacy policy and store data safety forms reflect Firebase Analytics and Crashlytics in the submitted build.
