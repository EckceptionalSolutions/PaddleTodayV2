# Mobile Support Triage

Use this after TestFlight, Google internal testing, and public launch so user reports do not turn into an unstructured inbox.

## Intake Channels

- Primary support email: `hello@paddletoday.com`
- In-app support entry point: More tab -> Email support
- Public web contact page: `https://paddletoday.com/contact/`
- Route requests: app Request route flow or `https://paddletoday.com/request-river/`
- Route reports/photos: River detail -> Reports -> Report

## Triage Levels

### P0: Safety-Critical Route Issue

Examples:

- Reported access closure, legal restriction, or dangerous launch/takeout condition.
- Major new hazard such as low-head dam issue, strainer blockage, construction, or bridge obstruction.
- App recommends a route that multiple credible sources say is unsafe today.
- Incorrect directions that could send users to private land or unsafe access.

Response:

1. Acknowledge the report as soon as possible.
2. Verify against official or high-confidence sources.
3. If credible but not fully verified, add or update route caution before waiting for perfect certainty.
4. Re-run snapshots or route data generation if the score/explanation depends on stale route data.
5. Keep the reporter's private contact details out of public notes.
6. Add a follow-up item to review the route source model.

### P1: App or API Outage

Examples:

- Today, Explore, Weekend, or River detail cannot load in production.
- API diagnostic fails in the More tab.
- App crashes repeatedly on launch or route open.
- Alerts or route report submissions fail for multiple users.

Response:

1. Check `https://paddletoday.com/api/rivers/summary.json`.
2. Check production API logs and hosting status.
3. Check Sentry for crashes and handled API errors if configured.
4. Confirm whether the issue reproduces on web, iOS, Android, or only one platform.
5. If mobile-only, test the production API URL from a clean native build.
6. Update the release checklist if the issue blocks MVP release.

### P2: Wrong or Confusing River Call

Examples:

- User disagrees with score, rating, confidence, or summary.
- Gauge band feels too strict or too generous.
- Weather/staleness appears confusing.
- Route difficulty, distance, camping, or shuttle context seems wrong.

Response:

1. Capture route slug, date/time, score, rating, and user context.
2. Compare current API response with source data.
3. Review gauge threshold source and route logistics.
4. Decide whether this is a data bug, model/scoring bug, copy issue, or expected conservative behavior.
5. If changed, refresh snapshots and verify Today, Explore, Weekend, and River detail.

### P3: Route Request or Coverage Gap

Examples:

- User requests a missing route.
- User submits better put-in/take-out details.
- User provides source links, outfitter notes, or local paddle-club guidance.

Response:

1. Confirm the request has river name, state, likely put-in, likely take-out, and at least one credible source.
2. Add it to the route candidate ledger or route-addition workflow.
3. Prefer official access/gauge sources first, then reputable guide/community sources.
4. Do not promise a launch date unless the route is already in progress.

### P4: General Feedback or UX Issue

Examples:

- Confusing copy.
- Layout issue.
- User cannot find a feature.
- Store listing or screenshot feedback.

Response:

1. Reproduce on the smallest relevant device size.
2. Decide whether it blocks MVP, should be fixed in the next patch, or belongs in backlog.
3. If it affects onboarding, permissions, safety, or route decisions, treat as higher priority.

## Route Reports and Photo Moderation

Before approving route reports or photos:

1. Confirm the submission is about the selected route.
2. Remove private contact information from public copy.
3. Do not publish claims that imply guaranteed safety.
4. Avoid publishing exact private-property access instructions unless independently confirmed public.
5. Use submitted photos only if rights were confirmed.
6. Prefer captions that describe observable facts: access condition, obstruction, water clarity, launch state, or route context.

Reject or hold submissions when:

- The report appears spammy, abusive, promotional, or unrelated.
- The safety claim is serious but unverified.
- Photos include people prominently without clear permission.
- Photos reveal private property or sensitive location context that should not be public.
- The report contains medical, rescue, or legal claims that need careful review.

## Alert Support

Common alert questions:

- "I did not get an alert": confirm route, threshold, email, alert state, snapshot freshness, alert evaluator run, and email provider status.
- "I got too many alerts": confirm cooldown behavior and whether the route is crossing thresholds repeatedly.
- "I want to unsubscribe": use the unsubscribe link in the alert email or manually deactivate the alert if the user emails support.

Operational checks:

1. Confirm `/api/alerts` creates the alert.
2. Confirm alert storage contains the route/email/threshold.
3. Confirm `alerts:evaluate` runs on schedule.
4. Confirm email provider configuration is active in production.
5. Confirm unsubscribe links work.

## Sentry and Diagnostics

When Sentry is configured:

- Search by release, environment, route slug, and handled error name.
- Useful handled names include `query_error`, `mutation_error`, `api_diagnostic_failed`, `route_report_failed`, and `alert_create_failed`.
- Do not paste user email, route report text, or photo contents into Sentry comments.

When Sentry is not configured:

- Ask the tester to open More -> API diagnostic.
- Ask which screen failed and whether retry worked.
- Ask whether the issue happens on Wi-Fi and cellular.
- Capture device model, OS version, app build, and approximate time.

## Launch-Day Checklist

1. Confirm production summary API returns valid JSON.
2. Confirm route detail opens for a known route.
3. Confirm route report endpoint accepts OPTIONS/POST.
4. Confirm alerts endpoint accepts OPTIONS/POST.
5. Confirm support email is monitored.
6. Confirm route safety reports have a same-day review path.
7. Confirm Sentry project is monitored if enabled.
8. Confirm app store reviews and support mail are checked daily during launch week.
