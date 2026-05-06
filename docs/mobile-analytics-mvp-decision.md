# Mobile Analytics MVP Decision

Decision: use Sentry crash/error reporting plus privacy-safe breadcrumbs for MVP. Do not add a dedicated analytics product before the first App Store and Play Store release.

## Why

The launch need is operational confidence, not funnel optimization. For MVP, the important questions are:

- Did the app crash?
- Did the API fail?
- Which screen or route was involved?
- Did route reports, alerts, directions, saves, and diagnostics fail?

The current Sentry integration covers those questions without adding another SDK, another privacy disclosure surface, or another consent/support burden.

## Current Signals

Sentry currently captures:

- native crashes when configured,
- unhandled JavaScript errors,
- React Query query and mutation errors,
- API diagnostic failures,
- route report submission failures,
- route opens,
- saved river toggles,
- directions opens,
- route report starts/submissions,
- alert creation starts/successes/failures,
- API diagnostic starts/successes/failures,
- support link opens.

Those events are enough to debug launch stability and support user reports.

## What We Are Avoiding For MVP

Do not add a general analytics SDK yet for:

- screen view counts,
- retention cohorts,
- attribution,
- ad campaign analytics,
- identity stitching,
- push notification tracking,
- precise location analytics.

Those would create extra implementation, data safety, and privacy-policy work without being required for the first release.

## Post-Launch Revisit

Revisit dedicated analytics after TestFlight/internal testing or after public launch if we need to answer product questions such as:

- which routes users compare most,
- where users abandon alert signup,
- how often location permission improves route selection,
- whether Explore or Today is the stronger entry point,
- which saved-route flows are used repeatedly.

If analytics is added later, pick an SDK with minimal default collection, no advertising identifiers by default, clear data retention controls, and explicit store disclosure notes.
