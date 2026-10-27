# Mobile Store Privacy Worksheet

Draft worksheet for Apple App Privacy labels and Google Play Data Safety. This is not legal advice; review it against the final submitted build, privacy policy, analytics/diagnostics configuration, alert/report behavior, and any third-party SDK changes.

Primary references:

- Apple App Privacy Details: `https://developer.apple.com/app-store/app-privacy-details/`
- Google Play Data Safety form help: `https://support.google.com/googleplay/android-developer/answer/10787469`

Updated October 26, 2026 for the iOS 1.1.6 candidate. These are draft disclosure corrections, not confirmation that either store's published labels have been updated. Account/trip features and user-started GPS recording now require linked-data disclosures beyond the original MVP. See `docs/ios-release-1.1.6.md` for release blockers.

## Current App Data Flows

| Data | Source | Leaves Device? | Linked To User? | Purpose | Notes |
| --- | --- | --- | --- | --- | --- |
| Approximate/precise planning location | Device permission / planning selection | Yes for opted-in nearby notifications and scoped API discovery; otherwise used for on-device distance sorting | Subscription/request metadata may associate a location with a device; review separately from account-linked GPS tracks | App functionality / notifications | Do not claim that all location stays on device. Scoped nearby discovery sends a selected center to the API. |
| Precise GPS track | Signed-in user starts recording a paddle | Yes when the private recap is synced | Yes, Firebase account identity | App functionality | Recording may continue in the background or with the screen locked during the user-started session. Pause/finish stops it; interrupted sessions reopen paused. Tracks remain private. |
| Saved rivers and personal notes | User action | Yes when signed in with account backup; guest copies remain local | Yes when backed up | App functionality | Stored locally and in account backup. Offline downloaded packets are not included in account backup. |
| Account identity and email | Apple, Google, or email-link sign-in | Yes | Yes | App functionality | Firebase UID, provider identity and returned email, including Apple's private relay address when chosen. No display name is requested by the new Apple sign-in flow. Requested email sign-in links are delivered through Azure Communication Services, which processes the destination address and sign-in message. |
| Trip plans and shared-trip membership | User action | Yes when synchronized/shared | Yes | App functionality | Route, schedule, itinerary, member names/RSVPs and shuttle coordination are shared with authorized trip members or through explicitly enabled view links. |
| Personal paddle logs and recap photos | User entry / selected photos | Yes when synced | Yes | App functionality | Private logs, water observations, notes, photos and GPS tracks are separate from shared trip plans. |
| Alert email | User input | Yes, POST to `/api/alerts`; also stored locally for form reuse | Yes | App functionality / communications | Used to deliver threshold alert emails. Emails include unsubscribe links. |
| Route request reply email | User input, optional | Yes, POST to `/api/river-request` | Yes if provided | App functionality / support | Optional follow-up address for route requests. |
| App feedback text/category | User input | Yes, POST to `/api/feedback` | Could be linked through optional email and request metadata | App functionality / support / analytics | Stored in Azure Blob or local development storage. Feedback text is not sent to Firebase. |
| App feedback reply email | User input, optional | Yes, POST to `/api/feedback` | Yes if provided | Developer communications / support | Used only when follow-up is needed. |
| Feedback prompt eligibility | App opens and aggregate meaningful-action counts | No | No | App functionality | Stored locally in AsyncStorage to control prompt timing. No route history or feedback text is included. |
| Route report contributor name/email | User input | Yes, POST to `/api/route-photo-submissions` | Yes | App functionality / support / content moderation | Email used for follow-up. Public copy should not include private contact info. |
| Route report text/notes | User input | Yes, POST to `/api/route-photo-submissions` | Could be linked through submission metadata | App functionality / content moderation | Reviewed before publishing. |
| Route report photos | User-selected media | Yes, only if user adds photos | Could be linked through submission metadata | App functionality / content moderation | Photo access is requested only when the user taps Add. Rights confirmation required. |
| Crash/error diagnostics | Firebase Crashlytics in preview/production builds | Yes, to Firebase/Google | Not intentionally linked | Analytics / diagnostics | App code avoids sending email, names, report text, and photo contents to Firebase. Route slugs/status may appear. |
| Product events | Firebase Analytics in preview/production builds | Yes, to Firebase/Google | Not intentionally linked | Analytics / diagnostics | Includes app open, route open, save toggle, directions, report, route-alert and area-notification lifecycle events, diagnostic, feedback prompt/submission category, and store-review events. Feedback text, email, coordinates, and push tokens are excluded. Advertising-oriented collection is disabled in `apps/mobile/firebase.json`. |
| API request logs | Production API/hosting | Yes, server-side | Potentially via IP/request metadata | App functionality / security / diagnostics | Covered by web/API hosting operations. |

## Apple App Privacy - builds 39-41 SDK/source audit

Inspected the signed build 39 IPA on October 26, 2026: 29 privacy manifests plus application data flows. The packaged manifest paths and hashes match exactly in builds 40 and 41. The current App Store Connect page was read; these corrections have **not** been published. The detailed source mapping is in `docs/audits/ios-build39-privacy-review-2026-10-26.json`.

| Data type | Linked to identity | Purposes | Tracking |
| --- | --- | --- | --- |
| Fitness | Yes | AppFunctionality | No |
| CoarseLocation | Yes | AppFunctionality, ProductPersonalization | No |
| CrashData | No | Analytics, AppFunctionality | No |
| CustomerSupport | Yes | AppFunctionality | No |
| DeviceID | Yes | Analytics, AppFunctionality | No |
| EmailAddress | Yes | AppFunctionality | No |
| Name | Yes | AppFunctionality | No |
| OtherDataTypes | Yes | Analytics, AppFunctionality | No |
| OtherDiagnosticData | No | Analytics, AppFunctionality | No |
| OtherUsageData | Yes | Analytics | No |
| OtherUserContent | Yes | AppFunctionality | No |
| PhoneNumber | Yes | AppFunctionality | No |
| PhotosorVideos | Yes | AppFunctionality | No |
| PreciseLocation | Yes | AppFunctionality, ProductPersonalization | No |
| ProductInteraction | No | Analytics | No |
| UserID | Yes | Analytics, AppFunctionality | No |

The GoogleSignIn manifest in this exact IPA declares linked phone-related data, coarse location, device IDs, other usage data and other data types, even though the app only asks for basic Google sign-in scopes. Include SDK collection in addition to data exposed through the app UI. Firebase Authentication declares linked User ID for App Functionality; GoogleSignIn additionally declares User ID for Analytics. The app stores account-linked GPS recaps, so Precise Location is linked even though the maps SDK alone declares unlinked location.

Saved paddle-track distance and duration are physical-activity data and are included as linked Fitness. This does not assert collection of clinical health data.

In-app support/feedback may include a reply email and submitted content. Declare Customer Support for App Functionality; do not assume the optional-disclosure exemption applies to every submission. No advertising/tracking use was found in the inspected manifests or enabled configuration.

Firebase Analytics and Crashlytics are automatically enabled in production. The current app has no in-app diagnostics opt-out. Optional account/location features do not make automatic diagnostic collection optional.

Sources: [Apple definitions](https://developer.apple.com/app-store/app-privacy-details/), [GoogleSignIn manifest](https://github.com/google/GoogleSignIn-iOS/blob/main/GoogleSignIn/Sources/Resources/PrivacyInfo.xcprivacy), [Firebase disclosure guidance](https://firebase.google.com/docs/ios/app-store-data-collection).

Publication steps: finish each new data-type questionnaire, set the linkage and purposes above, review the resulting product-page preview, and coordinate publication with the new release/privacy-policy deployment. No App Review submission or public release is implied.

## Google Play Data Safety Draft

### Does The App Collect Or Share User Data?

Recommended draft answer: `Yes, collects user data`.

Do not mark shared for PaddleToday-owned backend processing unless Google definitions require a third-party disclosure for analytics, diagnostics, or hosting providers. Review the final SDK/provider list.

### Data Types To Disclose

Likely disclose:

- Location
  - Approximate location and/or precise location.
  - Collected: only when permission is granted.
  - Purpose: App functionality.
  - Required: No, user can use app without location.
- The app can record precise location during an explicitly started paddle, including while backgrounded or screen locked, and sync that track with the user's private account log. Declare this flow separately from nearby notifications and planning-location use. Validate the actual signed build's behavior and permissions before submission.
- Personal info -> Email address
  - Optional account sign-in/recovery, alert emails, route requests, route report follow-up.
  - Purpose: App functionality, Developer communications.
  - Required: No, only for optional alert/request/report flows.
- Personal info -> Name
  - Contributor name or paddling handle in route reports.
  - Purpose: App functionality/content moderation.
  - Required: Only if user submits a route report.
- Photos and videos -> Photos
  - Optional route report and private paddle recap photos.
  - Purpose: App functionality/content moderation.
  - Required: No.
- App activity -> App interactions
  - Firebase Analytics product events are automatically enabled in production; there is no in-app opt-out.
  - Purpose: Analytics, App functionality, Diagnostics.
  - Treat automatic collection as required unless the submitted Android build provides a verified opt-out.
- Personal info -> User IDs; App activity -> Other user-generated content
  - Account identifiers, backed-up saved routes/notes, trip membership/plans and private paddle logs.
  - Purpose: App functionality; optional account features.
- App info and performance -> Crash logs / Diagnostics
  - Firebase Crashlytics is automatically enabled in production; there is no in-app opt-out.
  - Purpose: Analytics, App functionality.
  - Treat automatic collection as required unless the submitted Android build provides a verified opt-out.

### Data Security

Recommended draft:

- Data is encrypted in transit: `Yes` for HTTPS API calls.
- Users can initiate account deletion in Account & backup after recent authentication; Apple-linked accounts revoke Apple authorization before deletion. Deletion includes account-backed routes/notes, owned trips, memberships, private logs/photos/GPS tracks. Other paddlers' owned trips and personal logs remain. Web help is `/account/delete/`; support can handle submitted report/request/alert deletion requests.
- Users can delete local saved rivers by unsaving them in app.
- Alerts can be unsubscribed through alert email links. Manual support deletion should also be available.

### Optional Versus Required

Mark these optional where the form allows it:

- Location.
- Alert email.
- Route request email.
- Route report name/email/report/photos.
Automatic diagnostics/analytics cannot be marked optional merely because they are not essential to core navigation. Verify the submitted Android artifact and available collection controls independently from the iOS SDK audit.

## Privacy Policy Follow-Up

Current policy page: `/privacy/`.

Before submission, verify it explicitly covers:

- Location permission and on-device nearby sorting.
- Selected planning location and travel range stored for opted-in nearby notifications.
- Nearby notification controls, push-token handling, and notification analytics without precise coordinates in events.
- Guest saved rivers stored on device and signed-in account backup of routes/notes.
- Private logs, photos and GPS tracks; user-started background recording and pause/finish controls.
- Account identity, shared-trip visibility, in-app deletion, and provider linking/Apple private relay handling.
- Alert emails and unsubscribe.
- Route requests and route reports.
- Optional route photos.
- Firebase Crashlytics and Analytics.
- Support email data deletion requests.

## Open Decisions Before Submission

- Resolved for iOS build 39: Analytics and Crashlytics are enabled automatically; product events use Analytics.
- Resolved: scoped discovery, opted-in nearby notifications and synced GPS recaps send location off device. GPS recaps are linked to the account.
- Pending: publish the reviewed Apple labels and deploy the matching privacy-policy copy after final review. The User ID questionnaire is staged but incomplete; published labels remain unchanged.
- Are alerts fully production-email backed for MVP?
- Is route report/photo moderation operational before public launch?
- Who handles deletion requests sent to `hello@paddletoday.com`?
