# Mobile Store Release Checklist

Goal: ship an MVP PaddleToday mobile app to the Apple App Store and Google Play Store.

Production API note: the desktop web app already uses the production PaddleToday origin. Mobile release builds should target `https://paddletoday.com` unless the API is split to a dedicated host later.

## Release Configuration

- [x] Add EAS build profiles for development, preview, and production in `apps/mobile/eas.json`.
- [x] Use the production API URL in EAS build environments.
- [x] Add a non-dev production API fallback in `apps/mobile/src/lib/api-base-url.ts`.
- [x] Add `npm run mobile:api-smoke` for production API contract checks.
- [x] Add iOS `buildNumber` and Android `versionCode` to `apps/mobile/app.json`.
- [x] Document local vs production API setup in `apps/mobile/.env.example`.
- [x] Add `npm run mobile:release-check` for repo-side EAS readiness validation.
- [x] Document EAS internal build workflow in `docs/mobile-eas-internal-build-runbook.md`.
- [ ] Create or confirm the Expo/EAS project under the correct PaddleToday account.
- [ ] Confirm app identifiers before first store submission: iOS `com.paddletoday.mobile`, Android `com.paddletoday.mobile`.
- [x] Decide public app name and store URLs in `docs/mobile-store-metadata-decisions.md`.

## Store Metadata and Assets

- [x] Replace default Expo placeholder icon/splash assets with PaddleToday brand assets.
- [x] Add reusable `npm run mobile:generate-icons` script for regenerating mobile icon assets.
- [ ] Final app icon review at required iOS and Android sizes.
- [ ] Final splash screen review on iPhone, iPad, Android phone, and Android tablet.
- [x] Create store screenshot capture plan in `docs/mobile-store-screenshot-plan.md`.
- [ ] Capture store screenshots for iPhone, Android phone, and any required tablet form factors.
- [x] Draft short description, full description, keywords, promotional text, and release notes in `docs/mobile-store-listing-draft.md`.
- [ ] Finalize store listing copy after product/legal review.
- [x] Draft store category, target audience, and content rating notes in `docs/mobile-store-category-content-rating.md`.
- [ ] Confirm final store categories and content rating answers in App Store Connect and Play Console.
- [x] Prepare support, marketing, privacy, and terms URLs in `docs/mobile-store-metadata-decisions.md`.

## Privacy, Terms, and Safety

- [x] Add public privacy page at `/privacy/`.
- [x] Add public terms and safety page at `/terms/`.
- [x] Link privacy and terms pages from the site footer.
- [x] Add iOS and Android permission copy for location and photo selection.
- [ ] Owner/legal review of `/privacy/` and `/terms/` before submission.
- [x] Draft Apple privacy nutrition label and Google Play Data Safety worksheet in `docs/mobile-store-privacy-worksheet.md`.
- [ ] Complete Apple privacy nutrition labels in App Store Connect after owner/legal review.
- [ ] Complete Google Play Data Safety form after owner/legal review.
- [x] Confirm alert creation API is live in production and represented in privacy copy.
- [x] Add crash/error reporting hooks for native builds.
- [x] Add privacy-safe product breadcrumbs for the core release funnels.
- [x] Document Sentry signup, auth token, EAS secrets, and verification steps in `docs/mobile-sentry-setup.md`.
- [x] Confirm route reports and optional photo uploads are live in production and represented in privacy/terms copy.
- [x] Add in-app build/API/observability details for TestFlight and Play internal testing.

## Permissions

- [x] Location permission copy explains nearby paddling recommendations.
- [x] Photo permission copy explains optional route report photos.
- [x] Verify the app only asks for location at the point of need.
- [x] Verify the app still works when location permission is denied.
- [x] Verify photo/report flows are backed by production and graceful when photo access is denied.

## Native QA Matrix

- [x] Add a concrete native QA script in `docs/mobile-native-qa-plan.md`.
- [ ] iOS simulator smoke test: Today, Explore, Weekend, Saved, River detail, River hub, Request route.
- [ ] Android emulator smoke test: Today, Explore, Weekend, Saved, River detail, River hub, Request route.
- [ ] Physical iPhone smoke test.
- [ ] Physical Android smoke test with gesture navigation and three-button navigation.
- [ ] Verify status bar and safe-area behavior across Android and iOS.
- [ ] Verify Explore map gestures, drawer dragging, waypoint tapping, and route opening.
- [ ] Verify deep links and back navigation from river pages.
- [ ] Verify app cold start, background/resume, and poor-network states.

## Product MVP Gaps

- [x] Add a simple in-app About/Safety/Contact surface or links from settings/profile if no settings screen exists.
- [x] Decide Saved remains device-local for MVP in `docs/mobile-saved-rivers-mvp-decision.md`.
- [x] Decide whether alerts are MVP-ready or should be clearly scoped as local preferences until backend delivery is complete.
- [ ] Confirm alert email delivery with production email provider in a real preview build.
- [ ] Confirm route report submission behavior with a real TestFlight/Play internal build.
- [x] Confirm route report API availability and image attachment contract for MVP.
- [x] Review empty states for no saved rivers and filtered route views.
- [x] Review API failure states so the app never stalls on generic board-loading screens.

## Observability and Operations

- [x] Add crash/error reporting for native builds.
- [x] Add privacy-compatible breadcrumbs for core funnels: app open, route open, save, directions, report started/submitted, alert creation, API diagnostic.
- [x] Decide Sentry breadcrumbs are enough for MVP analytics in `docs/mobile-analytics-mvp-decision.md`.
- [ ] Create Sentry organization/project and configure `EXPO_PUBLIC_SENTRY_DSN` plus `SENTRY_AUTH_TOKEN` in EAS.
- [x] Add a production API health check that mobile QA can verify quickly.
- [x] Document support triage: where app feedback goes, who reviews it, and how urgent river safety corrections are handled.

## Store Console Tasks

- [ ] Enroll or confirm Apple Developer account access.
- [ ] Enroll or confirm Google Play Console access.
- [ ] Create Apple App Store Connect app record.
- [ ] Create Google Play app record.
- [ ] Configure bundle signing and credentials through EAS.
- [ ] Upload internal test builds to TestFlight and Google internal testing.
- [ ] Run store review checks before production submission.

## Final MVP Release Gate

- [ ] Production API returns valid JSON from a clean native install.
- [x] Production API contract can be checked from the repo with `npm run mobile:api-smoke`.
- [ ] All top-level tabs load without manual dev-server configuration.
- [ ] River detail pages load from Today, Explore, Weekend, and Saved.
- [ ] Explore map is usable with touch gestures and does not obscure core actions.
- [ ] Permissions are understandable, optional where possible, and match store disclosures.
- [ ] Privacy policy, terms, support URL, and store data forms are consistent with actual app behavior.
- [ ] One complete iOS TestFlight pass and one complete Android internal testing pass are signed off.
