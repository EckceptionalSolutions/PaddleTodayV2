# Firebase Diagnostics Operations

Use this after Firebase Analytics and Crashlytics are enabled for preview or production native builds.

## Current Integration

PaddleToday mobile sends diagnostics through `apps/mobile/src/lib/observability.ts`.

Enabled only when:

- `EXPO_PUBLIC_APP_ENV` is `preview` or `production`
- the app is not running in Expo Go
- the native Firebase config files exist

Required files:

- `apps/mobile/firebase/GoogleService-Info.plist`
- `apps/mobile/firebase/google-services.json`

Release check:

```sh
npm run mobile:release-check
npm run mobile:typecheck
```

## Firebase Products

Configured:

- Firebase Analytics for product events.
- Firebase Crashlytics for native crashes and handled JavaScript errors.

Not configured as part of this setup:

- Ads or ad attribution.
- Remote Config.
- Performance Monitoring.
- A/B Testing.

## Event Registry

Product events currently emitted by the mobile app:

- `app_opened`
- `route_opened`
- `saved_river_toggled`
- `directions_opened`
- `gauge_source_opened`
- `route_share_started`
- `route_share_completed`
- `route_report_started`
- `route_report_submitted`
- `route_photo_contribution_started`
- `route_photo_contribution_submitted`
- `route_alert_sheet_opened`
- `alert_create_started`
- `alert_create_succeeded`
- `native_alert_create_started`
- `native_alert_create_succeeded`
- `api_diagnostic_started`
- `api_diagnostic_succeeded`
- `api_diagnostic_failed`
- `support_link_opened`

Handled error names currently recorded:

- `query_error`
- `mutation_error`
- `api_diagnostic_failed`
- `route_report_failed`
- `native_alert_create_failed`
- `route_share_failed`
- `route_photo_contribution_failed`

## Dashboard Checks

Weekly checks after launch:

1. Crash-free users and sessions.
2. New Crashlytics issues by app version.
3. `api_diagnostic_failed` count by version and environment.
4. Route-report failure events.
5. Alert creation failure events.
6. Support-link opens after failed diagnostics.

Launch-day checks:

1. Confirm first production events are arriving for the released version.
2. Confirm Crashlytics shows the production app version.
3. Confirm no new crash cluster appears after install/open/route detail.
4. Compare support emails against Firebase failures before opening a bug.

## Issue Triage

Escalate immediately when:

- a crash affects launch, route detail, Explore, Saved, or Weekend flows
- `api_diagnostic_failed` spikes for production users
- route report or alert creation fails for multiple users
- a support email and Crashlytics issue point to the same app version

Add a GitHub issue when:

- the issue has a stable reproduction path
- the issue affects a submitted store build
- the issue needs route-data or API changes

Keep private support details out of Firebase notes and public GitHub issues.

## Privacy Notes

Do not log:

- email addresses
- free-text route report bodies
- photo contents or filenames
- exact user location
- health, rescue, legal, or private-property claims

Preferred event properties:

- route slug
- source screen
- app environment
- status code
- elapsed milliseconds
- coarse success or failure state

