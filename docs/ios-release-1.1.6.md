# iOS 1.1.6 release preparation

Prepared October 26, 2026. Status: **official TestFlight 1.1.6 (42) is installed and selected in the manual App Store draft. Foreground/background/cold notification destinations and single-route navigation pass; the main account and both original Saved routes are retained. All 308 mobile tests, TypeScript, 72 release checks and functional-commit GitHub gates pass. Blaze activation is verified, but new native/control email delivery remains unverified. A blank More-tab occurrence after Google return needs investigation; Apple relay/revocation, iPad and other device/store gates remain open. The release is not ready for App Review.**

## Historical regression baseline: build 38

- App: PaddleToday: River Conditions, App Store Connect ID `6769542734`.
- Bundle ID: `com.paddletoday.mobile`; Apple Team `F73XS8FMPL`.
- Candidate: `1.1.6 (38)`, using shared mobile source from main at `22480da85` plus sign-in preparation and the map touch fix, compiled from `85a7107cdf6b7ef9a6b5d65c117757779831f3b6`.
- Confirmed live iOS release: `1.1.3 (36)`, Ready for Distribution, observed in App Store Connect on October 26.
- Successful replacement EAS build: [`1c95ec16-5d3e-4895-83d8-c1453eeac727`](https://expo.dev/accounts/eckceptionalsolutions/projects/paddletoday-mobile/builds/1c95ec16-5d3e-4895-83d8-c1453eeac727), version `1.1.6 (38)`, source commit `85a7107cdf6b7ef9a6b5d65c117757779831f3b6`.
- Prior failed iOS build: `12641381-fe85-4978-8d10-389053c4e5f0`, October 1. Its provisioning profile lacked Associated Domains and Sign in with Apple entitlements; those signing issues are now resolved.
- Android parity reference: version `1.1.6`, version code `30`, signed bundle from PR #73. The October 6 release record says this was a Play production **draft**, pending manual testing and a GPS foreground-service demonstration. This preparation does not establish Android publication.
- Build 38 TestFlight submission `97cabbf5-59c0-476d-bf03-fd81e2b8542b` is `FINISHED`; Apple build `70f95de2-6841-4271-98c0-60fbaeb1ee39` is `VALID` and `IN_BETA_TESTING`. The official build is installed on the connected iPhone and reports `TestFlight Beta Distribution`. Superseded build 37 remains in the existing internal Team (Expo) group, but failed the map regression. External beta review and App Review have not been submitted.
- Downloaded store IPA identity is `com.paddletoday.mobile`, `1.1.6 (38)`. SHA-256: `d5b4546db0a44da5897af9961376bb8f2df764db72f12de9bf803ec7483cf57f`. Apple sign-in, Associated Domains, Google callback configuration and production APNs are present.
- App Store draft `28b7f9c6-843c-4201-a1e4-2077cb46b550` remains `PREPARE_FOR_SUBMISSION` with saved release notes and `MANUAL` release. Failed build 37 was detached; build 38 was attached and subsequently replaced in the draft by build 39, pending remaining QA.

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
2. Resolved: Associated Domains and Apple sign-in were enabled on the bundle ID. New App Store profile `926U9QVB9M` uses the existing distribution certificate, expires May 14, 2027, and is configured in EAS. No new distribution certificate or App Store Connect API key was created. A dedicated Sign in with Apple key was subsequently created with explicit owner approval.
3. Resolved configuration: owner-approved Apple key `9KFZDTX239` is restricted to Sign in with Apple for PaddleToday. Services ID `com.paddletoday.mobile.signin` is linked to the primary native app and Firebase callback. Firebase `paddletoday-9933a` now has both Apple and Google enabled; readback verified the team, key ID, private code-flow key and native bundle ID. Apple Hide My Email authentication now passes on the official build; deletion/revocation and the other sign-in methods still need end-to-end testing.
4. Connected physical device: `iPhone14,5`, iOS `26.5.2`, paired over USB with Developer Mode and UI Automation enabled. The official Appium WebDriverAgent 16.15.3 runner was signed using the existing team certificate and a profile restricted to this phone, installed successfully, and launched through XCTest. Automated navigation, taps, swipes, screenshots, and accessibility inspection now work.
5. The owner installed `1.1.6 (37)` through TestFlight; the version was independently verified. The two exact Saved routes and count survived the upgrade from `1.1.3 (36)`. Today loaded production content and retained the planning location. Weekend loaded forecasts and responded to filtering and scrolling. Explore list navigation opened the river hub; its first request failed and Retry loaded 39 Mississippi routes. These are bounded checks, not completion of the full regression suite.
6. Build 37's marker failure was independently reproduced. React Native 0.81.5's `RCTViewManager.m` applies `pointerEvents="auto"` to a plain UIView by setting interaction on and immediately falling through to the `none` case. `MKMapView` is such a view. Build 38 moves pointer-event and accessibility gating to the React Native wrapper. On the phone, two distinct Explore markers opened matching drawers; route details and Back worked; a normal pan changed marker coordinates; the static Weekend map allowed page scrolling; enabling its interactive mode allowed a marker to open the correct route, then returned to static mode.
7. These build 38 checks used an ad hoc signed copy because EAS Submit was queued. The compiled JavaScript, native `__TEXT` sections of all four binaries, and Info.plist values were compared with the store IPA and are unchanged. Feature entitlements are preserved; only App Store-only `beta-reports-active` is omitted for the ad hoc profile. The installer accepted the corrected package. Both exact Saved route names and count 2 survived. Official TestFlight build 38 subsequently replaced the ad hoc copy after the owner approved the data-loss warning. Installation Proxy confirms version/build and TestFlight distribution. Saved count 2, marker selection, matching route details/Back, and normal pan passed on that official copy. Both original Saved names remain in the UI hierarchy.
8. Build 37 additionally passed an offline cold-relaunch journey with Wi-Fi disabled and a downloaded trip packet reopened from Saved. Wi-Fi was restored, the temporary packet removed, and the Weekend filter restored. Google web-auth consent and native Apple sign-in introduction opened and cancelled cleanly; email entry opened. None of these checks establishes successful authentication, account sync/deletion, photo upload, notification delivery, or GPS/background recording.

9. Official TestFlight build 38: the owner completed Apple Hide My Email authentication with the device passcode. Account & backup showed the private relay identity, both saved routes fully synced, and backup success; Sync now passed. Force-quit/relaunch retained the session and backup success. Both exact original Saved names and count remained. A clearly named temporary plan was created through route search, synced, reopened after another cold relaunch, and removed through Trip options; the synced empty Trips state returned. No invitation was sent. This is single-device evidence, not a cross-device restore/conflict or account-deletion/revocation test.
10. The owner approved a local-only stationary GPS test and Google provider linking. Recording started after the approved Always location permission change. Settings was activated and independent app-state lookup confirmed PaddleToday running in the background; returning after at least 21 seconds retained active recording. Pause held the timer steady for 7.9 seconds and Resume restarted it. The owner performed a 30-second physical lock/unlock and active recording survived. The local track and temporary editor were discarded; nothing was uploaded. This does not validate moving-track accuracy or saving a recap. Location permission was restored to the prior While Using setting. Google OAuth return and approved linking succeeded; after relaunch, the same private relay account showed both providers connected and two routes backed up. Fresh Google sign-in also passed: after verified backup and sign-out, Saved was empty; Google restored both exact original routes. This tests same-device restoration after local clearing, not a second device.

### Required account setup

- Completed: Associated Domains and Sign in with Apple for `com.paddletoday.mobile` on team `F73XS8FMPL`.
- Completed and verified: Firebase Authentication's Apple provider, including the Apple Services ID and OAuth code-flow Team ID, Key ID, and private key. The complete code-flow configuration is needed for the existing account-deletion token revocation path, even when primary sign-in uses native identity tokens.
- Configured and verified return URL `https://paddletoday-9933a.firebaseapp.com/__/auth/handler` for the Apple Services ID.
- Completed: registered the exact Firebase default sender `noreply@paddletoday-9933a.firebaseapp.com` with Apple's private email relay; Apple shows green SPF. Actual Hide My Email delivery remains untested. Firebase templates use the default sender; no custom sender was found.
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

Retain existing support/marketing/privacy URLs, review contact details, and manual release. Retain the existing iOS `1.1.6` draft and saved notes. Build 41 is now attached after signed-package and official device verification. Update screenshots/disclosures as necessary. Do not submit for App Review or release publicly during preparation.

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

## Build 39 account-state fix and device findings

Build 38 successfully linked Google but kept its Connect Google control visible until relaunch. React Native Firebase replaces `auth().currentUser` after `linkWithCredential` without an auth-identity change event. Build 39 refreshes the account User state after native actions and uses the returned User after email linking. It compiled from `11280b0a46a9d6a399920418f5ac4ed5f6ea8eab`; EAS build `a417a15f-e8c7-4faa-83b1-401b2f1cfc97` and submission `0089ceb2-72a8-471f-a3eb-27033b1c8c79` are FINISHED. Apple build `2dfda37b-eabf-4c2d-b83a-d6ceb3ad37de` is VALID. IPA SHA-256: `065e9bf2b18a3910d910fdee0cb463c39f7c9324e7d6d4d576e28d87829ee150`.

Official 39 upgrade preserved the main linked account, both exact Saved routes and full backup (2 routes, 0 plans). Connected Apple/Google controls correctly reflect the already-linked account; a newly linked provider's immediate refresh still needs a fresh link test. Account deletion confirmation/cancel and nearby notification settings opened. After a verified backup, the main account was signed out for an owner-approved disposable email QA identity. The exact alias was asserted before native send; Firebase accepted it. Scoped Gmail inbox/spam search did not confirm receipt, so mail delivery remains unverified. A controlled Firebase-admin-generated link was then used strictly for callback diagnosis; it opened native Page not found. A diagnostic URL rewrite also did not establish login. No QA account, private log, or photo upload was created. The main Google session was restored, both exact original Saved names were asserted, and full sync returned 2 routes and 0 plans.

## Build 40 email callback and photo/deletion evidence

Firebase Hosting issues mobile email links at `/__/auth/links?link=...`; the native intent mapper handled river/trip links but omitted this path. Build 40 maps only this project's trusted HTTPS Hosting/action URLs for sign-in to `/auth/callback`, preserving the complete action in callback parameters. The callback consumes that value even during a warm navigation, when the original initial URL may be unrelated. Both account entry and account settings normalize the Hosting wrapper before Firebase validation. Other email actions, malformed links, other hosts and HTTP are excluded from this mapping. Firebase still validates the one-time action and matching email.

Source: `4af499a57`. EAS build `5fe81759-bc8b-4644-8119-298d153baf7e`, TestFlight submission `5fda582f-316a-46cd-853b-b982d638d6e3`. The native build and submission are FINISHED; Apple build `84847de4-3671-46c1-9336-dfd953828a8a` is VALID. Signed-package inspection passed. A temporary phone-signed copy used the same compiled JavaScript, all four native binaries, Info.plist and feature entitlements; only App Store reporting/distribution signing differed. These are ad hoc device results, not an official TestFlight install. Local validation passed TypeScript, all 290 mobile tests across 56 files, and 72 release checks. The controlled failing link was also recognized by the new parser without printing its action code. The unmodified controlled Hosting link passed warm authentication. After sign-out, the runner verified the app was not running before opening a new link; the cold callback required the matching email and authenticated. Its Back button returned to Today. A generated private custom-route recap and the public PaddleToday logo were saved/synced, then restored after sign-out and cold email sign-in with one photo visible. This is same-device restoration after local clearing, not a second device. Actual mail delivery remains unverified; Firebase-admin-generated links test the callback independently.

The disposable email-only account was verified distinct from the protected main Apple/Google account before native deletion. Firebase readback confirmed it absent; narrowly scoped QA storage reads confirmed server deletion complete and zero remaining logs, photo metadata or photo bytes. The main Google session was restored with full sync and both original Saved route names asserted after cold relaunch. No GPS track or personal media was uploaded.

Two additional UI defects were recorded: Back after a warm link could expose the earlier sign-in Preparing screen, and sign-out/deletion could re-read the consumed initial link. Build 41 resolves their duplicate-handler/navigation cause.

## Build 41 email regression baseline

Source `0c6767ebbf786af14bb504aade973e1708cdc5de`; EAS build `4c07027b-8edb-4d7f-b041-916f5cbeb25c`, TestFlight submission `5a20a29b-c0d4-49d6-b121-fbae4a60ad44`. Compilation and TestFlight submission are FINISHED. Apple build `8bda044f-d380-4a1a-89a5-605121376c1b` is VALID and IN_BETA_TESTING in the existing internal Team (Expo) group. The physical phone reports 1.1.6 (41), TestFlight Beta Distribution. TypeScript, 290 mobile tests across 56 files, 72 release checks and functional operations run `40408700053` passed. Store IPA SHA-256: `f39416707adf50986a52139667edf1856c38cfcfb817da9fced70cdb132b4063`.

Verified Hosting email actions now enter the existing sign-in route with an explicit return target. That route alone consumes the action parameter; account settings no longer listen to raw URL events or replay `getInitialURL`. Successful completion dismisses to the target instead of leaving an old sign-in screen below it. A link without matching pending consent cannot switch an already signed-in account; a visible guard directs the user back to Account & Backup. On the verified phone-signed 41 package, warm/cold sign-in, Back, sign-out/deletion freshness and the already-signed-in main-account guard passed. After the official TestFlight replacement, the main linked account retained its two-route/zero-plan backup. A new disposable email-only QA identity then passed warm and cold Hosting-link authentication with matching-email confirmation. The runner independently verified process state before the cold launch. Back returned to More, sign-out showed fresh choices, and native account deletion returned to fresh choices without replaying the consumed link. Firebase readback confirmed the QA identity absent; QA-only storage verification showed deletion complete with zero logs, photo metadata and bytes. The main Google session was restored with full sync and both exact Saved names asserted after cold relaunch. The phone runner was stopped and the app left on Saved.

At that callback-only checkpoint, actual mail/Apple-relay and push delivery were unverified. Controlled Firebase-admin-generated one-time links establish callback behavior independently. The build-42 follow-up below records subsequent delivery results. Apple-linked deletion/revocation still needs a disposable Apple identity; the main Apple/Google account was not deleted or revoked. Cross-device/conflict/invitation, moving-track/cloud-save and native iPad journeys remain open. No App Review or external beta review was submitted.

## Current candidate: build 42 notification startup correction

Official TestFlight 41 received targeted nearby-alert pushes on the connected iPhone. The recipient was identified by matching a controlled Today preference off/on transition to exactly one server subscription; original Today and Weekend preferences were restored. Production push code sent only to that device, without writing scheduler delivery history or changing cooldowns. Expo receipts were `ok`, and the notifications were independently visible in native Notification Center. Opening a background notification with the iOS swipe gesture reached Weekend. After the app process was independently verified not running, opening a new Weekend notification launched the app on Today instead: the startup handler stored the destination before onboarding readiness, but the completed-user startup path never consumed it.

Build 42 retains that response until authentication/onboarding readiness, then opens its destination. Entry screens still use the existing persisted handoff. Duplicate startup/listener responses are handled once, and a consumed native response is cleared only if it is still the latest response. Regression cases cover startup ordering, warm handling, duplicate delivery, entry handoff, failed persistence, and unsafe destinations. The official TestFlight replacement now passes foreground Today, background Weekend, cold Weekend (process state independently verified as not running immediately before opening), and single-route detail navigation. A later normal cold launch does not replay the handled response. Main account backup remains complete with both original Saved routes; Today and Weekend preferences were verified restored. The runner was stopped after testing.

Actual email delivery is partially verified: a client REST `EMAIL_SIGNIN` request delivered a message from the configured Firebase sender to the owner-approved QA alias, confirmed in Gmail with sender and recipient details. The official native app accepted its request, but a separate native-origin delivery was not confirmed. Later requests exhausted the project's daily sign-in email quota (`QUOTA_EXCEEDED`); further sends were stopped. The owner was asked to review Firebase plan/usage. This does not establish a particular billing plan, native end-to-end email completion, or Apple private-relay delivery.

## Screenshot and privacy preparation

Six refreshed 1290x2796 iPhone composition drafts use complete native build-41 captures from the verified phone-signed package. They retain source hashes and their build-41 provenance; the Access and Weekend frames are clean native views. Existing planning labels and Saved selections require publication/demo-data review. Native iPad captures remain open. Apple lists this output size as accepted; no iPad captures were fabricated. These review images were not uploaded to App Store Connect.

The exact signed build 39 IPA contained 29 privacy manifests. The worksheet and `ios-build39-privacy-review-2026-10-26.json` map 16 proposed data types, including account-linked GPS/Fitness and GoogleSignIn SDK declarations. The web privacy-policy source now describes background recording, Firebase diagnostics, provider linking/private relay and Apple deletion authorization. Local desktop/mobile renders passed content and overflow checks. The 29 packaged privacy manifests match exactly across builds 39, 40, 41 and 42, so the audit also applies to the final candidate. No policy deployment occurred. Published Apple labels remain unchanged; a User ID setup is staged but incomplete. Complete review before publishing those labels, which affect the live product page independently of release submission.

Build 42 source `da8768d04b3b3b6f7cb8c6157037ff52ea15431b`; EAS `2130cbc4-34df-4b64-8211-01060114d16d`; TestFlight submission `e4d77fcf-037a-4c8e-8fa0-9f6a92d7c6c6` FINISHED; Apple build `7f1e69fc-b9a1-448e-8727-b322f246f10d` VALID. Official installation independently reports 1.1.6 (42), TestFlight Beta Distribution. IPA SHA-256 `2784e32bfb0084ba4b232b2460bd20618af03528d59df5795143b8875e938c0f`. Local TypeScript, 308 tests across 57 files, 72 release checks and functional operations run `40420062813` passed. Earlier email/photo/GPS evidence retains its actual build and distribution.

## October 27 billing activation and email follow-up

The owner explicitly approved linking the existing billing account and an alert budget. Firebase console readback confirms Blaze active; Google Cloud console confirms a monthly project-only alert budget. Billing account identifiers and financial details remain outside public release audits. Identity Platform was not enabled and no new payment instrument or account was created.

Official TestFlight 42 accepted one native email-link request to the previously approved disposable QA alias at 12:01 UTC. It was not observed in the owner mailbox. A later single direct client REST control at 12:10 UTC was accepted with HTTP 200, without the earlier daily-quota rejection. A fresh, exact-recipient Gmail search including Spam and Trash still showed only the prior October 26 23:00 UTC control message at 12:19 UTC. No new message or mail-to-app completion is claimed; both delivery paths remain unverified. No admin-generated link was used in this follow-up, and further sends stopped.

No QA identity was created; admin lookup confirmed it absent and the protected main identity retained both Apple and Google. Fresh Google sign-in restored the main account and complete two-route/zero-plan backup; all five original route-identity UI labels matched the prior baseline. One additional native observation needs investigation: after Google return, selecting More left a blank content area with the tab bar visible across repeated snapshots. A cold relaunch restored More and Account & Backup. This is one observed occurrence, not an established root cause or a fixed defect. The app was left on Saved and the runner was stopped.
