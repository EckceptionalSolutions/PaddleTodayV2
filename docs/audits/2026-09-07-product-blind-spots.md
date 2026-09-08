# Paddle Today: product blind spots and candidate tasks

Assessed September 7, 2026, America/Chicago. Local HEAD: `c46f84bc`. The working tree already contained active application and operations changes. This assessment inspected those files, the live website, recent GitHub workflow results, and the latest available weekly product-report artifact. It changes no app behavior or existing task queue.

The strongest recurring gap is agreement between the product promise, the decision shown to a paddler, and the evidence used to judge success. The app has substantial route research, shared domain code, recovery tests, scoring safeguards, contribution tooling, and reporting. More features alone will not resolve the inconsistencies below.

## 1. A route can be both the best recommendation and a skip

**Confirmed live and reproduced locally. Priority: P1.**

On the live homepage, with Minneapolis, MN and a 50-mile radius, the featured Minnesota River route (Le Sueur to Henderson) showed all three of these at once:

- “Today's Best near you” and “Best fit based on your location.”
- Score 61, “Watch closely.”
- “Skip today,” with a storm-risk explanation.

The result mix showed 20 Skip routes, with Skip disabled, yet this route remained visible. This was a point-in-time observation; live conditions will change.

The local cause is concrete: `isViableRecommendationItem` checks numerical-rating classification but ignores readiness. The nearby recommendation pool also falls back to all items when none qualify. Rating visibility filters use `rating`, while displayed result counts use the combined readiness decision. The hero labels any selected item “Today's Best.”

Evidence: [board-domain.js](../../src/scripts/board-domain.js:55), [summary-board-home.js](../../src/scripts/summary-board-home.js:1622), [live route](https://paddletoday.com/rivers/minnesota-river-le-sueur-henderson/).

**Candidate task: Make recommendation eligibility, filters, counts, and headline agree on the effective decision.**

Acceptance: a Fair/Good/Strong score with readiness `skip` cannot become an affirmative best-paddle recommendation or survive a disabled Skip filter. All-skip and all-withheld areas receive an honest no-recommended-paddle state, with planning options. Mixed-state fixtures exercise hero, counts, map, and list together. Audit the corresponding mobile path for parity. Estimate: 1–2 implementation days.

## 2. The reporting system can give you false confidence about demand

**Confirmed report inconsistency and parser defect. Priority: P1.**

The latest available weekly artifact, generated September 2 for August 23–29, reports zero active users and zero summary sessions, while its event table contains 30 `app_opened` users and its acquisition table contains 58 sessions. The code reads an absent `totals` array as zeros, creates named metric keys, then attempts a fallback only when there are no keys. That fallback cannot run for a normal response with metric headers.

Separately, the displayed corridor funnel is built from independent weekly event-user counts: five hub users, two selectors, eleven route-detail users. This is reach by event, not a verified sequential cohort. It cannot establish that those route opens came from the five hub users.

The September 7 adoption artifact says `no-export-available`. That means the operational prioritization input is missing; it does **not** mean nobody uses the app. The weekly Firebase report does have activity. Its observed 20% week-one retention is only 2 of 10 users, and the report period is historical, so it should not dictate broad roadmap decisions.

Evidence: [report parser](../../scripts/weekly-product-report.ts:436), [funnel construction](../../scripts/weekly-product-report.ts:302), [adoption report](../operations/adoption-report.json), [successful report run and artifact](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/33659366034). Google's [report API documentation](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runReport) distinguishes report rows and requested metric aggregations.

**Candidate task: Repair and validate the weekly decision report, then feed usable demand evidence into prioritization.**

Acceptance: absent totals use the single aggregate row when appropriate; missing data remains unavailable rather than zero; multirow distinct-user counts are not naively summed. Test real-shaped responses with and without aggregates. Label independent event counts as reach, or implement an actual cohort funnel. Reconcile one week against provider dashboards. Populate the privacy-safe adoption input, including native route-open events, and preserve source period/freshness. Estimate: 1–2 days plus dashboard verification.

## 3. Collecting trip reports is not yet reliable score validation

**Confirmed local behavior. Production outcome volume not inspected. Priority: P1 before tuning thresholds from these metrics.**

Both clients send the currently loaded route score alongside the user-entered trip date. A report about an earlier trip can therefore carry today's conditions. Calibration counts every approved report with an app rating as comparable, without aligning trip time and decision time.

The safety-error metric also ignores `appReadiness`: a Good score with readiness `skip` and an observed unsafe outcome is counted as an unsafe false negative, even though the app explicitly advised skipping. The mobile report path additionally omits policy revision and evidence age that the web path supplies.

A local probe using the actual functions confirmed that a September 1 trip paired with a September 7 score counts as comparable, and a `skip` decision counts as an unsafe false negative.

Evidence: [web report payload](../../src/scripts/river-detail-page.js:1251), [mobile report payload](../../apps/mobile/src/screens/river-detail-screen.tsx:602), [calibration logic](../../src/lib/scoring-calibration.ts:32).

**Candidate task: Bind outcomes to the decision actually seen before the trip.**

Acceptance: preserve a decision snapshot/reference with route, policy revision, observation age, and decision timestamp; align it with trip timing. Historical or unmatched reports remain useful community reports but are excluded from decision-accuracy metrics with a reason. Classify safety errors by effective readiness, separately from quality-score agreement. Add parity checks for web/mobile. Estimate: 2–3 days depending on snapshot storage scope.

## 4. “Saved” and “works at the river” need separate validation

**Code-backed product limitation and verification gap; no native device reproduction. Priority: P2.**

Saved records contain route identity and notes. The persisted query cache has a two-hour maximum age shared across successful query types, including route details and geometry. That is useful freshness protection, but it is not a durable offline trip pack. GPX/calendar/float-plan tools exist; exports alone do not establish that an ordinary user can reopen their access plan in-app without service.

Native-device cold start, background/resume, real permission prompts, notification delivery, and screen-reader journeys still lack sign-off in the inspected release evidence. The extensive mobile-web suite intercepts API traffic and explicitly excludes native-device verification. Existing checklists may be stale; missing sign-off is not proof that no one has manually tested the app.

Evidence: [cache policy](../../apps/mobile/src/providers/app-providers.tsx:73), [saved record](../../apps/mobile/src/providers/saved-rivers-provider.tsx:13), [native checklist](../mobile-store-release-checklist.md), [test scope](../../tests/mobile-web/README.md).

**Candidate task: Define the offline trip promise and run a real-device field acceptance pass.**

Acceptance: on a physical iPhone and Android, save/prepare a route, remove connectivity, force-close, reopen after more than two hours, and record which logistics remain available. Verify that old conditions cannot appear current. Include downloaded geometry/access details, failed export recovery, permission denial, app resume, large text, VoiceOver/TalkBack, and notification deep links. Record build/device/date. If durable in-app plans are the desired promise, persist static logistics separately from expiring conditions. Estimate: 1 day to define/run the matrix once devices are available; implementation follows observed gaps.

## 5. Precise-sounding travel claims exceed the underlying calculation

**Confirmed code/copy mismatch. Priority: P2, small fix.**

The homepage promises sorting by “real drive time.” The inspected calculation converts straight-line distance at a default 50 mph into a rounded time. It does not account for roads, river crossings, traffic, or staging the shuttle. That can distort which trip fits someone's available day.

Evidence: [homepage promise](../../src/pages/index.astro:735), [distance-to-time estimate](../../packages/api-contract/src/location.ts:22), [board usage](../../src/scripts/board-domain.js:303).

**Candidate task: State the travel estimate honestly and distinguish paddle time from total trip commitment.**

Acceptance: label the existing estimate clearly and explain that road travel/shuttle time may differ. Keep radius distance and drive estimates distinct. Verify representative routes with distant bridges or shuttle detours before deciding whether road routing is worth building. Estimate: half a day for copy/labels; road routing is a separate scope.

## 6. Operational reports are not the same as resolved operations

**Current CI status checked; deeper platform findings remain dated evidence. Priority: P1 for active failures.**

The latest sampled API deployment and snapshot-worker deployment failed; frontend, alerts, and history had successful runs. A failed deployment check does not establish a live outage.

The API smoke script still expects `geolocation=()` while the server deliberately emits `geolocation=(self)`. This is also documented in tonight's operations brief. The worker failure needs its own diagnosis; do not automatically reuse an older permission-failure explanation.

Existing platform evidence dated September 4–5 records broad, long-lived storage credentials and an unhealthy Azure `www` binding with a recorded October 1 certificate expiry. These were not reverified against Azure in this assessment. Contribution retention remains a proposed policy with automated expiry reporting explicitly deferred.

Evidence: [API run](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/34171997864), [worker run](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/34171997850), [smoke assertion](../../scripts/deployment-smoke.mjs:131), [server policy](../../src/server/http.ts:106), [platform evidence](../deployment-platform-verification.md), [retention policy](../contribution-retention-policy.md).

**Candidate task: Close the current release failures with explicit owners and verification.**

Acceptance: reconcile the intended geolocation header across runtime, static hosting, tests, and smoke; verify the deployed result. Diagnose the latest worker run and obtain a passing deployment. Recheck domain renewal and credential migration status, recording owners and dates. Keep retention approval/expiry reporting as a separate operational task. Estimate: half a day for header reconciliation; worker/platform effort depends on diagnosis.

## 7. The next product bet should be tested with paddlers

**Strategic inference, not a proven usability defect. Priority: P2 after measurement repair.**

The repo contains extensive expansion and polish work. The observed weekly sample is small, and its directions/alert/report conversions are zero; instrumentation and period limitations prevent concluding that users reject those features. There is not enough inspected evidence to know which missing feature would change actual trip decisions or repeat use.

**Candidate task: Run a bounded trip-planning pilot in one well-supported region.**

Acceptance: recruit 5–8 paddlers with varied experience for observed planning sessions. Ask each to find an appropriate route, explain the current call, identify launch/take-out and shuttle needs, and prepare for weak service. Record task completion, misunderstandings, and abandonment without coaching. Follow up after their next planned paddle, including trips they cancelled. Combine this evidence with repaired analytics to choose one measurable activation/return-use improvement. Do not interpret 30 outcome reports or one small pilot as national threshold validation. Estimate: two weekends of research rather than a new feature sprint.

## Suggested task order

1. Unify recommendation decisions and fix the all-skip experience.
2. Repair the weekly report and calibration comparability as separate tasks.
3. Resolve active deployment failures in the maintenance lane.
4. Correct travel wording, then conduct device/field validation and the paddler pilot.
5. Use those results to choose the next feature or coverage investment.

The short-term goal should be that a paddler can understand the recommendation, complete a suitable plan, and report back in a way that teaches the product something trustworthy.

## Verification limits

Three focused local probes reproduced recommendation/filter inconsistency, trip-date comparability, and readiness-based calibration misclassification. The reporting defect was traced in current source and matched against a downloaded historical workflow artifact. Live browsing covered homepage discovery and one route detail, not every route or native app. No full build/test suite, production admin-data review, device run, Azure reconfiguration, submissions, notifications, or deployments were performed. The candidate tasks above have not been created as Codex tasks or added to the shared operations board.
