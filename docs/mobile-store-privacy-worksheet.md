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
| Account identity and email | Apple, Google, or email-link sign-in | Yes | Yes | App functionality | Firebase UID, provider identity and returned email, including Apple's private relay address when chosen. No display name is requested by the new Apple sign-in flow. |
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

## Apple App Privacy Draft

### Data Used To Track Users

Recommended draft answer: `No`.

Rationale: the app does not use third-party advertising or cross-app/site tracking. Reconfirm if any analytics/ad SDK is added later.

### Data Linked To The User

Likely disclose:

- Contact Info -> Email Address
  - Collected for optional account sign-in/recovery, alert emails, route request follow-up, route report follow-up, and optional app-feedback follow-up.
  - Purpose: App Functionality, Developer Communications.
- User Content -> Photos or Videos
  - Collected when the user attaches route report photos or private paddle recap photos.
  - Purpose: App Functionality.
- User Content -> Other User Content
  - Backed-up saved routes/notes, trip plans and membership/RSVP/shuttle details, private paddle logs, route report text, route request notes, app feedback, corrections, access/hazard notes.
  - Purpose: App Functionality, Developer Communications.
- Identifiers -> User ID
  - Firebase account UID and linked provider identity for authentication, backup, trip membership, and deletion.
  - Purpose: App Functionality.
- Location -> Precise Location
  - User-started GPS tracks saved with the private account recap.
  - Purpose: App Functionality; optional.

Review whether these should be marked linked to identity because submissions include email/name and are stored together for moderation.

### Data Not Linked To The User

Likely disclose for Firebase-enabled preview/production builds:

- Diagnostics -> Crash Data
  - Purpose: App Functionality / Analytics.
- Diagnostics -> Performance Data or Other Diagnostic Data
  - Purpose: App Functionality / Analytics.
- Usage Data -> Product Interaction
  - Purpose: Analytics, if product events are uploaded.

Likely disclose:

- Location -> Precise Location or Coarse Location
  - Purpose: App Functionality and notifications.
  - Required: No. Planning location may leave the device for scoped discovery or opted-in nearby notifications. This row excludes account-linked GPS recap tracks, disclosed above.

Question for final review: Apple may still consider permissioned location "collected" depending on how the form interprets on-device use. If no coordinates leave the device, document the rationale before submission.

### Data Not Collected

Recommended draft: no financial info, contacts, browsing history, search history, health/fitness metrics, sensitive info, or purchases are intentionally collected by this candidate. Account identifiers and Firebase app-instance/installation identifiers are collected and must not be marked absent. Review paddling logs and GPS routes under the appropriate user-content and location categories.

Reconfirm third-party SDK behavior, especially Firebase, Expo, maps, and hosting logs.

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
  - Firebase Analytics product events.
  - Purpose: Analytics, App functionality, Diagnostics.
  - Required: No.
- Personal info -> User IDs; App activity -> Other user-generated content
  - Account identifiers, backed-up saved routes/notes, trip membership/plans and private paddle logs.
  - Purpose: App functionality; optional account features.
- App info and performance -> Crash logs / Diagnostics
  - Firebase Crashlytics.
  - Purpose: Analytics, App functionality.
  - Required: No.

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
- Diagnostics/analytics if not required for app functionality.

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

- Are Firebase Analytics and Crashlytics enabled in the submitted build?
- Are product events considered analytics for store forms?
- Does the final build upload device coordinates anywhere, or only compute locally?
- Are alerts fully production-email backed for MVP?
- Is route report/photo moderation operational before public launch?
- Who handles deletion requests sent to `hello@paddletoday.com`?
