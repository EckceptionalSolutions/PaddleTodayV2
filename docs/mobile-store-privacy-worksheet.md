# Mobile Store Privacy Worksheet

Draft worksheet for Apple App Privacy labels and Google Play Data Safety. This is not legal advice; review it against the final submitted build, privacy policy, analytics/diagnostics configuration, alert/report behavior, and any third-party SDK changes.

Primary references:

- Apple App Privacy Details: `https://developer.apple.com/app-store/app-privacy-details/`
- Google Play Data Safety form help: `https://support.google.com/googleplay/android-developer/answer/10787469`

## Current App Data Flows

| Data | Source | Leaves Device? | Linked To User? | Purpose | Notes |
| --- | --- | --- | --- | --- | --- |
| Approximate/precise location | Device permission | No direct app upload for current features; used locally for distance-aware sorting | No | App functionality | Location is requested only when the user chooses location/nearest features. Route distances are computed in app. |
| Saved rivers | User action | No | No | App functionality | Stored locally with AsyncStorage. No account sync. |
| Alert email | User input | Yes, POST to `/api/alerts`; also stored locally for form reuse | Yes | App functionality / communications | Used to deliver threshold alert emails. Emails include unsubscribe links. |
| Route request reply email | User input, optional | Yes, POST to `/api/river-request` | Yes if provided | App functionality / support | Optional follow-up address for route requests. |
| App feedback text/category | User input | Yes, POST to `/api/feedback` | Could be linked through optional email and request metadata | App functionality / support / analytics | Stored in Azure Blob or local development storage. Feedback text is not sent to Firebase. |
| App feedback reply email | User input, optional | Yes, POST to `/api/feedback` | Yes if provided | Developer communications / support | Used only when follow-up is needed. |
| Feedback prompt eligibility | App opens and aggregate meaningful-action counts | No | No | App functionality | Stored locally in AsyncStorage to control prompt timing. No route history or feedback text is included. |
| Route report contributor name/email | User input | Yes, POST to `/api/route-photo-submissions` | Yes | App functionality / support / content moderation | Email used for follow-up. Public copy should not include private contact info. |
| Route report text/notes | User input | Yes, POST to `/api/route-photo-submissions` | Could be linked through submission metadata | App functionality / content moderation | Reviewed before publishing. |
| Route report photos | User-selected media | Yes, only if user adds photos | Could be linked through submission metadata | App functionality / content moderation | Photo access is requested only when the user taps Add. Rights confirmation required. |
| Crash/error diagnostics | Firebase Crashlytics in preview/production builds | Yes, to Firebase/Google | Not intentionally linked | Analytics / diagnostics | App code avoids sending email, names, report text, and photo contents to Firebase. Route slugs/status may appear. |
| Product events | Firebase Analytics in preview/production builds | Yes, to Firebase/Google | Not intentionally linked | Analytics / diagnostics | Includes app open, route open, save toggle, directions, report, alert, diagnostic, feedback prompt/submission category, and store-review events. Feedback text and email are excluded. Advertising-oriented collection is disabled in `apps/mobile/firebase.json`. |
| API request logs | Production API/hosting | Yes, server-side | Potentially via IP/request metadata | App functionality / security / diagnostics | Covered by web/API hosting operations. |

## Apple App Privacy Draft

### Data Used To Track Users

Recommended draft answer: `No`.

Rationale: the app does not use third-party advertising or cross-app/site tracking. Reconfirm if any analytics/ad SDK is added later.

### Data Linked To The User

Likely disclose:

- Contact Info -> Email Address
  - Collected for alert emails, route request follow-up, route report follow-up, and optional app-feedback follow-up.
  - Purpose: App Functionality, Developer Communications.
- User Content -> Photos or Videos
  - Collected only when the user attaches route photos.
  - Purpose: App Functionality.
- User Content -> Other User Content
  - Route report text, route request notes, app feedback, corrections, access/hazard notes.
  - Purpose: App Functionality, Developer Communications.

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
  - Purpose: App Functionality.
  - Mark not linked if the app continues to use it only on-device for sorting/filtering and does not upload coordinates.

Question for final review: Apple may still consider permissioned location "collected" depending on how the form interprets on-device use. If no coordinates leave the device, document the rationale before submission.

### Data Not Collected

Recommended draft: no financial info, contacts, browsing history, search history, health/fitness, sensitive info, purchases, or identifiers are intentionally collected by PaddleToday mobile for MVP.

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
  - Processed ephemerally/on device for current app features; verify final answer in Play Console wording.
- Personal info -> Email address
  - Alert emails, route requests, route report follow-up.
  - Purpose: App functionality, Developer communications.
  - Required: No, only for optional alert/request/report flows.
- Personal info -> Name
  - Contributor name or paddling handle in route reports.
  - Purpose: App functionality/content moderation.
  - Required: Only if user submits a route report.
- Photos and videos -> Photos
  - Optional route report photos.
  - Purpose: App functionality/content moderation.
  - Required: No.
- App activity -> App interactions
  - Firebase Analytics product events.
  - Purpose: Analytics, App functionality, Diagnostics.
  - Required: No.
- App info and performance -> Crash logs / Diagnostics
  - Firebase Crashlytics.
  - Purpose: Analytics, App functionality.
  - Required: No.

### Data Security

Recommended draft:

- Data is encrypted in transit: `Yes` for HTTPS API calls.
- Users can request data deletion: `Yes`, via `hello@paddletoday.com`, for submitted route reports/photos/requests/alerts. Confirm operational process before submission.
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
- Saved rivers stored on device.
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
