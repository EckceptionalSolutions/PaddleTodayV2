# Google Play Release Plan

Status date: 2026-05-21.

Goal: prepare PaddleToday for a first Google Play release using the existing Expo/EAS mobile app at `apps/mobile`.

## Current Status

- App identity: `PaddleToday`, Android package `com.paddletoday.mobile`.
- Expo project: `@eckceptionalsolutions/paddletoday-mobile`.
- Release artifact type: production Android builds are configured as Android App Bundles (`.aab`).
- Production API: configured as `https://paddletoday.com`.
- Production EAS Maps key: `GOOGLE_MAPS_ANDROID_API_KEY` exists as a sensitive project variable.
- Local readiness: `npm run mobile:release-check`, `npm run mobile:typecheck`, `npm run mobile:api-smoke`, and `npm test` pass.
- Store copy draft: `docs/mobile-store-listing-draft.md`.
- Privacy/Data Safety draft: `docs/mobile-store-privacy-worksheet.md`.
- Category/content rating notes: `docs/mobile-store-category-content-rating.md`.
- Screenshot plan: `docs/mobile-store-screenshot-plan.md`.
- Android platform warning audit: `docs/google-play-android-platform-warnings.md`.

## Release Phases

1. Build readiness
   - Keep Android `versionCode` higher than any uploaded Play artifact.
   - Confirm production EAS secrets exist, especially `GOOGLE_MAPS_ANDROID_API_KEY`.
   - Confirm Firebase native configs are current for `com.paddletoday.mobile`.
   - Create a fresh production Android `.aab` after secrets are confirmed.

2. Internal testing
   - Upload the `.aab` to Google Play internal testing.
   - Install from Play, not from a side-loaded APK, before final signoff.
   - Run `docs/mobile-native-qa-plan.md` on at least one physical Android phone.
   - Confirm Today, Explore map, Weekend, Saved, route detail, route reports, alert flows, permissions, and More/API diagnostic.

3. Store listing
   - Use app name `PaddleToday`.
   - Use the short and full descriptions from `docs/mobile-store-listing-draft.md` after final owner/legal review.
   - Upload app icon, feature graphic, and at least four phone screenshots.
   - Add tablet screenshots only if tablet distribution remains enabled and the tablet UI passes QA.

4. Play Console declarations
   - Category: `Sports`, unless `Travel & Local` reads better in Play Console preview.
   - Ads: no ads for MVP.
   - Target audience: not designed for children; use the chosen 13+ or 16+ posture from `docs/mobile-store-category-content-rating.md`.
   - Data Safety: complete from `docs/mobile-store-privacy-worksheet.md`.
   - App access: no login required.
   - Content rating: complete questionnaire with no mature content, no purchases, no gambling, optional location, and private/reviewed route reports.
   - Privacy policy URL: `https://paddletoday.com/privacy/`.

5. Production submission
   - Resolve blocking Play Console warnings. Track non-blocking Android platform recommendations in `docs/google-play-android-platform-warnings.md`.
   - Promote the internal-tested artifact or create a fresh production release.
   - Use release notes from `docs/mobile-store-listing-draft.md`.
   - Submit for review only after Data Safety, privacy policy, support, and native QA agree with the exact build.

## Current Blockers

- Google Play Console access and app record status still need confirmation.
- Google Play upload/service account credentials are not configured in `apps/mobile/eas.json`, so EAS Submit may need manual console upload first.
- Store screenshots still need to be captured from a current build.

## Commands

Local gate:

```sh
npm run mobile:release-check
npm run mobile:typecheck
npm run mobile:api-smoke
npm test
```

Create production Android build after secrets are ready:

```sh
cd apps/mobile
npx eas-cli build --platform android --profile production
```

Check recent Android builds:

```sh
cd apps/mobile
npx eas-cli build:list --platform android --limit 5
```
