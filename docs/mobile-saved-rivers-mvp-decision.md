# Mobile Saved Rivers MVP Decision

Decision: keep Saved rivers device-local for the first App Store and Play Store MVP.

## Why

The current implementation stores saved rivers in React Native `AsyncStorage` under `paddletoday:saved-rivers`. That means the feature works without an account system, without authentication support, and without collecting extra personal data.

For MVP, device-local saves are enough because the core user need is quick repeat checks on the same phone:

- open the app,
- check today's board,
- save familiar routes,
- return to those routes quickly later.

Adding account sync before launch would expand the release surface into authentication, passwordless login or OAuth, account deletion, support tooling, privacy disclosures, recovery flows, backend sync conflicts, and cross-device QA. That is not required for a credible first release.

## Current UX Contract

The Saved tab already says:

> Saved rivers stay on this device for faster repeat checks.

That is the right MVP promise. The app should not imply account backup, cloud sync, or cross-device restore anywhere in store copy or onboarding.

## Store and Privacy Impact

Device-local Saved rivers should not require account/data collection disclosures beyond local app storage. The app still needs to disclose:

- optional location use,
- optional route report/contact information,
- optional route-report photos,
- alert signup contact details,
- Firebase Analytics and Crashlytics in preview/production builds.

Saved rivers become a bigger privacy item only if they are synced to PaddleToday servers or associated with a user identity.

## Follow-Up After MVP

Revisit account sync after the first release if users ask for:

- saved rivers across devices,
- saved alert thresholds,
- trip history,
- personalized recommendations,
- paid features,
- route report attribution.

If account sync is added later, add:

- sign in/sign out,
- account deletion,
- data export or clear-saved-data behavior,
- sync conflict handling,
- updated privacy policy and store data disclosures,
- support playbook updates.
