# iOS 1.1.6 release preparation

Prepared October 26, 2026. Status: **build 38 passed targeted iPhone map regression using a phone-specific signed copy of the compiled app. Its official TestFlight upload is queued. Apple provider setup and remaining account/GPS/iPad QA are pending.**

## Candidate identity

- App: PaddleToday: River Conditions, App Store Connect ID `6769542734`.
- Bundle ID: `com.paddletoday.mobile`; Apple Team `F73XS8FMPL`.
- Candidate: `1.1.6 (38)`, using shared mobile source from main at `22480da85` plus sign-in preparation and the map touch fix, compiled from `85a7107cdf6b7ef9a6b5d65c117757779831f3b6`.
- Confirmed live iOS release: `1.1.3 (36)`, Ready for Distribution, observed in App Store Connect on October 26.
- Successful replacement EAS build: [`1c95ec16-5d3e-4895-83d8-c1453eeac727`](https://expo.dev/accounts/eckceptionalsolutions/projects/paddletoday-mobile/builds/1c95ec16-5d3e-4895-83d8-c1453eeac727), version `1.1.6 (38)`, source commit `85a7107cdf6b7ef9a6b5d65c117757779831f3b6`.
- Prior failed iOS build: `12641381-fe85-4978-8d10-389053c4e5f0`, October 1. Its provisioning profile lacked Associated Domains and Sign in with Apple entitlements; those signing issues are now resolved.
- Android parity reference: version `1.1.6`, version code `30`, signed bundle from PR #73. The October 6 release record says this was a Play production **draft**, pending manual testing and a GPS foreground-service demonstration. This preparation does not establish Android publication.
- Build 38 TestFlight submission `97cabbf5-59c0-476d-bf03-fd81e2b8542b` is `IN_QUEUE`; Apple has not received it yet. Superseded build 37 remains in the existing internal Team (Expo) group, but failed the map regression. External beta review and App Review have not been submitted.
- Downloaded store IPA identity is `com.paddletoday.mobile`, `1.1.6 (38)`. SHA-256: `d5b4546db0a44da5897af9961376bb8f2df764db72f12de9bf803ec7483cf57f`. Apple sign-in, Associated Domains, Google callback configuration and production APNs are present.
- App Store draft `28b7f9c6-843c-4201-a1e4-2077cb46b550` remains `PREPARE_FOR_SUBMISSION` with saved release notes and `MANUAL` release. Failed build 37 was detached; the draft awaits build 38 after upload and remaining QA.

## Shared features included since iOS 1.1.3

| Area | Candidate behavior |
| --- | --- |
| Discovery | Faster scoped route metadata and condition responses; cached Today, Explore, Weekend, and Trips tabs. |
| Today and Explore | Focused route recommendations, nationwide search recovery, route filters and grouped reaches, location setup, retained tab state. |
| River details | Current gauge context, river camera cards when sources exist, practical route/access details. |
| Account | Optional account backup of saved routes, personal notes, and trip plans; background backup and conflict recovery. |
| Trips | Organized trip plans, shared itineraries/invitations, RSVPs and shuttle details, private paddle logs/photos, downloaded offline trip packets. |
| GPS | User-started paddle recording, including while the screen is locked; pause/finish controls and private recap tracks. Native device validation is required. |
| iOS sign-in | Google, native Sign in with Apple, and email link options. Apple uses a fresh hashed nonce, with the matching raw nonce passed to Firebase. |

This uses current shared main source, including common mobile fixes merged after the Android 1.1.6 bundle. It is feature parity with that prepared Android release plus those shared fixes; it is not a claim that every platform-specific behavior has been device tested.

## Account setup and device QA status

1. Resolved: the owner accepted the updated Apple Developer agreement, restoring API access. No agreement was accepted by the agent.
2. Resolved: Associated Domains and Apple sign-in were enabled on the bundle ID. New App Store profile `926U9QVB9M` uses the existing distribution certificate, expires May 14, 2027, and is configured in EAS. No new private signing certificate or API key was created.
3. Remaining blocker: Firebase project `paddletoday-9933a` has Google enabled but Apple returned `404 CONFIGURATION_NOT_FOUND`. Apple sign-in and its deletion/revocation flow cannot be signed off until the provider and code-flow credentials are configured.
4. Connected physical device: `iPhone14,5`, iOS `26.5.2`, paired over USB with Developer Mode and UI Automation enabled. The official Appium WebDriverAgent 16.15.3 runner was signed using the existing team certificate and a profile restricted to this phone, installed successfully, and launched through XCTest. Automated navigation, taps, swipes, screenshots, and accessibility inspection now work.
5. The owner installed `1.1.6 (37)` through TestFlight; the version was independently verified. The two exact Saved routes and count survived the upgrade from `1.1.3 (36)`. Today loaded production content and retained the planning location. Weekend loaded forecasts and responded to filtering and scrolling. Explore list navigation opened the river hub; its first request failed and Retry loaded 39 Mississippi routes. These are bounded checks, not completion of the full regression suite.
6. Build 37's marker failure was independently reproduced. React Native 0.81.5's `RCTViewManager.m` applies `pointerEvents="auto"` to a plain UIView by setting interaction on and immediately falling through to the `none` case. `MKMapView` is such a view. Build 38 moves pointer-event and accessibility gating to the React Native wrapper. On the phone, two distinct Explore markers opened matching drawers; route details and Back worked; a normal pan changed marker coordinates; the static Weekend map allowed page scrolling; enabling its interactive mode allowed a marker to open the correct route, then returned to static mode.
7. These build 38 checks used an ad hoc signed copy because EAS Submit was queued. The compiled JavaScript, native `__TEXT` sections of all four binaries, and Info.plist values were compared with the store IPA and are unchanged. Feature entitlements are preserved; only App Store-only `beta-reports-active` is omitted for the ad hoc profile. The installer accepted the corrected package. Both exact Saved route names and count 2 survived. TestFlight receipt/distribution behavior still needs verification on Apple's official build 38.
8. Build 37 additionally passed an offline cold-relaunch journey with Wi-Fi disabled and a downloaded trip packet reopened from Saved. Wi-Fi was restored, the temporary packet removed, and the Weekend filter restored. Google web-auth consent and native Apple sign-in introduction opened and cancelled cleanly; email entry opened. None of these checks establishes successful authentication, account sync/deletion, photo upload, notification delivery, or GPS/background recording.

### Required account setup

- Completed: Associated Domains and Sign in with Apple for `com.paddletoday.mobile` on team `F73XS8FMPL`.
- Configure Firebase Authentication's Apple provider, including the Apple Services ID and OAuth code-flow Team ID, Key ID, and private key. The complete code-flow configuration is needed for the existing account-deletion token revocation path, even when primary sign-in uses native identity tokens.
- Use return URL `https://paddletoday-9933a.firebaseapp.com/__/auth/handler` for the Apple Services ID.
- Configure Apple's private email relay for Firebase's actual sender (normally `noreply@paddletoday-9933a.firebaseapp.com`) and any customized email sender, so email recovery works for Hide My Email accounts.
- Retain the existing iOS Firebase OAuth client and `REVERSED_CLIENT_ID` URL scheme; inspect the prebuilt Info.plist and test the Google return path on the signed build.
- Completed: the App Store provisioning profile was regenerated with the required capabilities. Keep private keys in Apple/Firebase/EAS credential storage, never in git, release archives, or screenshots.

## What's New draft

```text
- Faster route discovery and smoother switching between Today, Explore, Weekend, and Trips.
- Back up saved routes, notes, and trip plans with an optional account. Sign in with Apple, Google, or an email link.
- Plan paddles with friends, organize shuttle details, and keep private paddle recaps with photos and optional GPS tracks.
- Improved offline trip planning, gauge context, and river camera information where available.
- Map, navigation, and reliability improvements.
```

Only use these notes once the named sign-in methods and GPS/offline journeys pass native QA. Existing screenshots predate the account/trip features; replace or verify them against this candidate on iPhone and iPad.

## App Review notes draft

```text
PaddleToday is useful without signing in. Choose Explore PaddleToday on the welcome screen to use Today, Explore, Weekend, river details, and local saved routes.

Optional account features include cloud backup, trip plans and invitations, and private paddle recaps. Sign in with Apple, Google, or an email link. Account settings allow connecting another sign-in method and deleting the account after recent authentication; Apple account deletion also revokes the Apple authorization.

GPS recording starts only when the signed-in user chooses to record a paddle. Location is used during that session, including while the screen is locked. Pause or finish stops recording. Tracks and recap photos remain private to the account. Nearby discovery location, notifications, and photo access are optional.

Test Today -> a river -> trip planning; Explore map -> route details; Weekend; saving a route; signing in and relaunching; a trip invitation; and a private paddle recap. For GPS, start recording outdoors, lock the screen briefly, reopen, pause/resume, then finish. Do not perform these tests while driving or paddling unsafely.

PaddleToday is a planning aid. Scores are not a safety guarantee; check official sources, conditions, access, hazards, and group ability before launching.
```

App Review access to account-only features must be agreed with the reviewer: provide a suitable test identity or a demonstrated review path. Do not assume that an email-link-only credential can be entered as a reusable review password. Do not put the owner's personal account credentials in the review notes.

## Privacy and metadata before review

Update App Privacy for account identifiers/email, saved routes/notes and trip/log content, private photos, and precise GPS tracks linked to the signed-in user. Nearby notification planning locations also leave the device when opted in. Retain the no-tracking declaration only while analytics/SDK behavior remains consistent. Current privacy worksheet corrections accompany this change; published Apple labels still require verification and update.

Retain existing support/marketing/privacy URLs, review contact details, and manual release. Add an iOS `1.1.6` draft after Apple account access is restored, save the new notes, attach only the verified `1.1.6 (37)` build, and update screenshots/disclosures as necessary. Do not submit for App Review or release publicly during preparation.

## Validation and build path

Verified locally on October 26: all 72 release readiness checks, mobile TypeScript, all 278 mobile tests across 55 files, all 8 public-production API smoke checks, and a production iOS Hermes export passed. The audit JSON records the bundle hash and generated configuration. The introspected APNs entitlement defaults to development; the signed distribution IPA must use production.

Run `npm run mobile:release-check`, `npm run mobile:typecheck`, `npm test --workspace @paddletoday/mobile`, and `npm run mobile:api-smoke`. Inspect Expo's generated iOS configuration for Apple Sign In, Associated Domains, Google URL scheme, location usage strings/background mode, and production API values. Export the production iOS JavaScript bundle before the native build.

After the account/provisioning blockers are resolved, run from `apps/mobile`:

```sh
npx eas-cli credentials:configure-build --platform ios --profile production
npx eas-cli build --platform ios --profile production --non-interactive
```

Record the resulting EAS build ID, source commit, signing identity, version/build and artifact checksum. Submit that explicit build ID to TestFlight with `eas submit --platform ios --profile production --id <verified-build-id> --non-interactive` after the build succeeds. TestFlight upload does not constitute App Review submission.

On a physical iPhone and iPad, verify upgrade from 1.1.3 without losing saved/offline data; clean install; guest navigation; Apple real/hidden email, Google, and email-link sign-in; cancellation; existing-account collisions; provider connection consent; relaunch/sync; account export/deletion and Apple revocation; cold/warm trip links; offline conflicts and photo retry; GPS with screen lock, permission denial, pause/resume/finish; maps/marker taps; notifications; and tablet layout. Record actual results, not assumptions from Android tests or a JavaScript export.

## References

- [Apple login-services rule](https://developer.apple.com/app-store/review/guidelines/#login-services)
- [Firebase Apple sign-in, relay, linking, and revocation configuration](https://firebase.google.com/docs/auth/ios/apple)
- [Expo Apple authentication configuration and native button](https://docs.expo.dev/versions/v54.0.0/sdk/apple-authentication/)
- [EAS iOS submission](https://docs.expo.dev/submit/ios/)
- Android release evidence: `docs/audits/mobile-tab-loading-2026-10-06.md`.
