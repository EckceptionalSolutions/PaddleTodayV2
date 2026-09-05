# Paddle Today system audit — September 4, 2026

## Assessment

Paddle Today has useful foundations: explicit uncertainty, separate quality and readiness concepts, shared web/mobile domain packages, meaningful scoring invariants, bounded upstream concurrency, snapshot-based delivery, and operational evidence records. A rewrite would discard useful work without addressing the highest-risk problems.

The main weakness is inconsistent enforcement of policy between route authoring, runtime scoring, stored snapshots, presentation, and release checks. A route can be marked planning-only but become scored; a withheld route can survive in a cached response; a previously ready route can retain an affirmative decision after its observations become stale. These problems affect the product's central promise more directly than additional coverage or interface features.

Prioritize those policy boundaries, request containment, and release verification. Then address concurrent storage updates, mobile freshness, dependency reproducibility, and operational monitoring. Scoring formula changes should follow observed-outcome evidence rather than this code audit alone.

**Production observation:** normal read-only requests to the public readiness and summary endpoints both returned HTTP 200. The summary was marked fresh, generated at `2026-09-04T19:07:52.312Z`. This audit did not establish a current production outage. Local failure reproductions described below were performed against isolated audit processes or mocked storage.

## Scope, baseline, and limitations

- Repository: `C:/Users/Yerff/source/repos/PaddleTodayV2`.
- HEAD: `b3de92762114e4fb033f78a2e2922b05a146c2ed`; unchanged when rechecked during the audit.
- The working tree initially contained **328 changed/untracked paths**, including application code, dependencies, route data, generated geometry, and operations records. Other work continued changing files during the audit. Findings describe inspected working-tree behavior, not necessarily deployed behavior or a clean checkout of HEAD.
- A catalog probe found 1,902 inventory routes and 1,822 public routes across 30 states: 1,263 runtime-scored and 559 planning routes. Those are point-in-time local counts. Production readiness reported 1,686 routes and its scored summary contained 929; differing versions and populations prevent treating this difference alone as a defect.
- Local runtime: Node `v24.14.0`, Windows. Deployment workflows specify Node 22.12.0. Runtime-version parity was not established.
- Evidence, source hashes, sample routes, and diagnostic results are in `docs/audits/2026-09-04-system-audit-evidence.json`. Scratch logs and reproduction code are in `C:/Users/Yerff/AppData/Local/Temp/paddletoday-system-audit-2026-09-04/`.
- No applicable `AGENTS.md` was found in the repository search or checked ancestor locations.

### System map

| Surface | Inspected implementation and role |
| --- | --- |
| Web | Astro pages/layouts, browser controllers in `src/scripts`, generated browser assets, maps, discovery, route details, search, favorites, contribution and admin surfaces |
| Native mobile | Expo/React Native screens, React Query persistence, location, saved routes, alert preferences, diagnostics, release workflows |
| Shared behavior | `packages/api-contract`, `api-client`, `geo`, `trip-pack`, and `design-tokens` |
| API | `src/server/api-server.ts`, route handlers, request parsing, rate limits, static serving, readiness and telemetry |
| Conditions | Route publication, USGS/MN DNR adapters, weather/upstream fetch helpers, cache, scoring, confidence, readiness, outlooks, sensitivity and outcome calibration |
| Persistence/jobs | Blob/local repositories for snapshots, history, alerts, nearby notifications, submissions; Azure snapshot worker; GitHub history/alert jobs |
| Delivery/operations | Azure frontend/API deployment, worker Docker/Bicep, iOS/Android workflows, operations gatekeeper, route-control-plane locking/leases, ledgers, weekly product/cost reporting |

### Checks and outcomes

| Check | Result and interpretation |
| --- | --- |
| Root Vitest suite | Initial run: **95 files, 837 tests passed**. Later invocations encountered one geometry count failure: manifest 1,815 versus runtime 1,821. The working tree was changing; this is not evidence of a deterministic failure at the original baseline. |
| Workspace suites | API contract: 23 tests; API client: 5; geo: 8; trip pack: 7; mobile: 6; design tokens: 3. All passed when run with the correct workspace root. |
| Mobile TypeScript | Passed. This does not constitute native rendering/device validation. |
| Scoring sensitivity | 1,119 routes, 24,019 scenarios, zero invariant failures, no changed baseline scenarios, 334 added routes. Its eligibility population differs from runtime; see AUD-01. |
| Root `npm run typecheck` | Token synchronization, public-script synchronization, 33 DRY invariants across 314 files, route TypeScript, and route audit passed. The command stopped at the geometry count mismatch. Later steps were not reached. |
| Supplemental server TypeScript | A temporary config rooted at `src/server/api-server.ts`, with repository Node type roots, produced **87 TypeScript diagnostics**. These include a missing `River` import, incompatible planning-route callback, missing contract fields, and route-gallery shape errors. Initial scratch-config type-resolution errors were corrected before counting. |
| Fresh Astro startup | Blocked by missing installed `@astrojs/compiler-binding-win32-x64-msvc`. Dependencies were not repaired or replaced. A fresh build was therefore not verified. |
| Existing-build UI | Inspected `dist/index.html` dated September 4, 01:20 local time, served with the current API at `127.0.0.1:4433`. Desktop and a 390 × 844 mobile-sized viewport were exercised. Existing HTML/assets can differ from current source. |
| Production read-only checks | Readiness HTTP 200, approximately 582 ms. Summary HTTP 200, approximately 2,113 ms, 3,588,909 decoded bytes, 929 entries, fresh snapshot. Single observations, not latency benchmarks or wire-byte measurements. |
| Dependency registry audit | `npm audit --omit=dev --json`: 39 affected-package entries, 14 high and 25 moderate, zero critical. Transitive/metavulnerability counts are not 39 proven exploitable app defects. |
| GitHub Actions | Recent runs included successful alerts/history and a failed history run. A completed [operations gate run](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/33909611457) also enabled auto-merge. Its SHA differs from the local baseline. Branch-protection configuration was not inspected. |
| Targeted reproductions | Planning-to-scored promotion; withheld-route snapshot serving; stale affirmative readiness; planning weather numbers; lost concurrent alert updates; spoofable rate-limit identity; malformed Host process exit. |

The initial workspace-suite invocation mistakenly used workspace config paths from the repository root, which reran root tests rather than workspace tests. Those runs are not counted as workspace coverage; corrected runs used workspace working directories. The first design-token invocation also used an incorrect relative config path; its corrected run passed.

### User journeys and sampling

Inspected homepage discovery, preferences, list/map switching, route detail, safety/freshness presentation, desktop global search and its zero-result state, saving a route and viewing favorites. Search returned an explicit zero-match state. A saved route persisted, while the inspected favorites build displayed a current-board-unavailable fallback. That fallback needs rechecking after a clean rebuild before attributing it to current source.

The mobile-sized homepage exposed a freshness defect and an unnamed header search button. A mobile search interaction navigated home rather than opening search in the inspected build; the desktop control worked. Treat the navigation observation as follow-up reproduction work, not a separately confirmed current-source defect. Maps were observed in loading states; complete tile/geometry interaction and rendering were not established. No native emulator/device, screen reader, keyboard-only end-to-end audit, real location permission flow, or mobile network-transition test was completed.

Route sampling intentionally crossed both gauge providers, both threshold models, direct/proxy sources, scored/planning/withheld populations, and fresh/stale/unavailable states:

| Sample | Purpose |
| --- | --- |
| Snake River, County Road 9–Snake Bit, Minnesota | MN DNR stage, direct gauge, minimum-only model, official-source attribution |
| Chattahoochee, Powers Island–Paces Mill, Georgia | USGS discharge, direct gauge, minimum-only community guidance |
| Chattahoochee, GA 115–Duncan Bridge, Georgia | USGS stage, two-sided thresholds and documented sensor-limit caveat |
| Brazos, Brazos Park East–Bledsoe Miller, Texas | Proxy-gauge planning route with official-source threshold attribution |
| Lower Colorado, Two Rivers–South Canyon; South Fork Snake, Lorenzo–Menan | Explicit planning status compared with runtime policy |
| Baltimore Blueway group, Maryland | Multiple planning routes serialized through a real local API response |
| Shell Rock, Renning–Shell Rock, Iowa | Withholding compared with cached public detail |
| Pomme de Terre, Outlet Park–Cross Timbers, Missouri | Existing-build detail, old conditions, maps, safety copy and saving |

The route profiles and provider/scoring paths were examined, but this is not a national coordinate survey or independent certification of runnable thresholds. The [MN DNR source page](https://www.dnr.state.mn.us/river_levels/index.html) was reachable but did not expose enough detail in the fetched content to validate the sampled numeric threshold; the sampled American Whitewater page failed retrieval. Do not interpret source attribution or passing invariants as independently verified domain validity.

Not inspected: production admin data/credentials, Azure IAM/SAS scopes, actual invoice details, deployed dependency tree, store-console configuration, push/email delivery to real recipients, complete rollback execution, or all external provider failure modes. No emails, push notifications, deployments, dependency changes, or operational-queue updates were initiated.

## Prioritized findings

Priority combines user impact, exposure, and urgency. **P1** means address before further expansion/release where applicable; **P2** means the next reliability cycle. Confidence describes the evidence, not severity. Exploitability and deployment exposure remain separate from locally proven behavior.

### AUD-01 — Explicit planning routes become scored at runtime

**Confirmed defect · P1 · High confidence.**

Evidence: `src/data/route-publication.ts:13` checks direct gauge/site availability but ignores explicit `scoreEligibility`; `src/lib/rivers.ts:260` overwrites eligibility using that predicate; `src/lib/rivers.ts:59` and `:88` use it for scoring. In contrast, `src/lib/scoring-sensitivity.ts:107` excludes explicitly planning routes.

The probe found **168 explicitly planning routes promoted to scored**, including 19 with two-sided thresholds, across eight states. Examples include `lower-colorado-two-rivers-south-canyon` and `south-fork-snake-lorenzo-menan`. This both defeats authoring intent and leaves a different population under safety-invariant testing.

**Smallest improvement:** define one effective publication/scoring policy that honors explicit planning restrictions; use it in indexing, snapshots, API serialization and audits. Gauge presence should be an input, not the entire eligibility decision. Existing minimum-only score caps help but do not restore the promised planning-only behavior.

**Effort/dependencies:** 1–2 days plus regeneration/review of affected artifacts; precedes AUD-12. **Acceptance:** zero explicit-planning-to-scored promotions; planning routes remain discoverable without same-day scores; runtime and sensitivity route sets match under documented inclusion/exclusion rules.

### AUD-02 — Cached responses bypass current route withholding

**Confirmed defect · P1 · High confidence.**

Evidence: `src/lib/river-snapshots.ts:180` normalizes stored summary items without filtering by current publication eligibility; detail lookup at `:215` also accepts stored entries. `src/server/routes/public-rivers.ts:143` looks up the route but does not reject an absent public route before reading its snapshot.

An earlier local probe found **16 currently withheld slugs still listed in the 936-entry fallback summary**. `getRiverBySlug('shell-rock-river-renning-shell-rock')` returned no public route, but its local detail endpoint returned **HTTP 200 with that route**. The generated withholding list continued changing; the evidence file records its later captured intersection separately.

**Smallest improvement:** enforce publication eligibility at every read boundary, filter summaries/weekend/groups, and reject withheld detail before reading snapshots. Carry a catalog/policy revision in snapshot metadata so obsolete source/access policy can be identified. Do not rely solely on the next scheduled refresh or deleting blobs.

**Effort/dependencies:** 1–2 days, shares the policy from AUD-01. **Acceptance:** with a pre-withholding snapshot present, withheld slugs disappear from all public collections and detail returns the chosen unavailable response; approved unaffected routes continue working.

### AUD-03 — Stale data can retain “Paddle today” readiness

**Confirmed defect · P1 · High confidence.**

Evidence: `src/lib/river-snapshots.ts:584`, `:600`, and `:616` mark live-data fields stale but preserve readiness/outlooks. `packages/api-contract/src/river-detail-readiness-view-model.ts:157` returns the stored readiness before checking effective live-data state; `:199` similarly retains stored status for the label.

A seven-hour-old fixture with previously ready/Good conditions produced `effectiveLiveData.overall = degraded`, stale gauge/weather, **`verdict = go`**, **“Paddle today”**, and **“Conditions look good right now.”** The same stale fixture without stored readiness produced `watch`; the fresh control produced `go`. The shared model is consumed by both detail clients. Mobile persists successful queries for up to 24 hours (`apps/mobile/src/providers/app-providers.tsx:79`), increasing the importance of render-time age checks.

**Smallest improvement:** apply freshness and unavailable-evidence restrictions before accepting stored readiness; keep label, reason, score context and outlook availability consistent. Use provider-aware freshness policy rather than an independent six-hour client default that differs from server rules.

**Effort/dependencies:** 1–2 days; coordinate with AUD-08. **Acceptance:** advance time past provider/snapshot limits without a successful refresh and verify that neither client displays affirmative readiness or current-looking forecast guidance; fresh controls remain unchanged.

### AUD-04 — Malformed Host input terminates the API process

**Confirmed local defect · P1 · High confidence in failure; production exposure unverified.**

Evidence: `src/server/api-server.ts:55` constructs a URL using the incoming Host before the `try` at `:68`. An audit-only server returned health 200; one request with Host `[` caused `ERR_INVALID_URL`, connection reset, process exit 1, and connection refused on the next health request.

The failure mechanism is an exception escaping an async Node request callback. Whether production proxies reject or normalize such input first was not tested. This was not sent to production.

**Smallest improvement:** put parsing inside the request error boundary and use a trusted base for relative request targets; return 400 for malformed targets/authority. Ensure the outer callback contains rejected promises.

**Effort/dependencies:** half a day, independent. **Acceptance:** malformed Host/target tests receive bounded 4xx responses and subsequent health checks succeed in the same process; normal origin/proxy requests remain valid.

### AUD-05 — Release gates overstate type, test and safety verification

**Confirmed process defect · P1 · High confidence.**

Evidence: `scripts/typecheck.mjs:6` starts with a route-only TS project and then data/image/mobile checks; `tsconfig.route-data.json:9` defines the narrow entry set. `package.json:88` runs root tests and API-contract tests, omitting the other workspace suites. `vitest.config.ts:5` includes only root `src` tests. `scripts/operations-verify.ts:24` sets safety true unconditionally; `:25` tests the gate implementation; `:26` runs typecheck/build but not the full application test command. The operations workflow then enables auto-merge.

A supplemental server-entry typecheck found 87 diagnostics, including the executable defect in AUD-07. Build success cannot stand in for type checking: [Astro documents that its build command does not perform type checking](https://docs.astro.build/en/guides/typescript/). Existing post-push frontend/API workflows do run `npm test`; they do not establish comprehensive pre-merge coverage.

**Smallest improvement:** add explicit server/shared/Astro checks and an enumerated workspace test matrix; run actual applicable safety and scoring checks before merge. Report skipped checks honestly. Keep gate-policy tests, but separate them from tests of the product. Verify required branch checks through repository settings before relying on auto-merge.

**Effort/dependencies:** 2–4 days plus fixing exposed errors. **Acceptance:** a deliberate server type error, workspace regression, stale-readiness regression, and safety-policy violation each fail the appropriate pre-merge gate; a gate record lists commands, exit results and skipped scopes.

### AUD-06 — Concurrent updates silently overwrite subscriptions

**Confirmed defect · P2 · High confidence.**

Evidence: `src/lib/alerts.ts:152` reads the entire alerts document and `:210` writes it back; updates repeat the pattern at `:224`. `src/lib/blob-storage.ts:80` writes without an ETag condition. Similar whole-document updates occur in `src/lib/area-notifications.ts:90` and `src/lib/route-contributions.ts:235`.

Two simultaneous creates against a mocked Blob transport both completed successfully, but only **one subscription persisted**. This is a deterministic interleaving of the actual repository code, not an observed production loss. Concurrent subscribe/unsubscribe/evaluator updates and contribution-index changes have the same underlying risk. Workflow concurrency does not serialize web requests with jobs.

**Smallest improvement:** implement ETag-based compare-and-retry mutations or partition independent records. [Azure documents conditional ETag writes and 412 conflicts](https://learn.microsoft.com/en-us/azure/storage/blobs/concurrency-manage). A process-local mutex alone does not protect multiple app instances/jobs. Protect local writes from partial-file reads too.

**Effort/dependencies:** 2–3 days, shared storage primitive first. **Acceptance:** simultaneous creates preserve every acknowledged record; unsubscribe survives evaluator updates; conflict retries are bounded and observable; moderation retains concurrent submissions.

### AUD-07 — Planning route weather contains array indexes

**Confirmed defect · P2 · High confidence.**

Evidence: `src/lib/api-contract.ts:289` passes `serializePlanningRoute` directly to `map`; its second parameter at `:294` is weather. JavaScript supplies the array index there. The local Baltimore Blueway API returned HTTP 200 with weather values **0, 1, 2**, marking the latter two as live (`:358`).

This violates the shared contract and can produce bogus weather presentation or consumer failures; a native crash was not reproduced.

**Smallest improvement:** use an explicit one-argument wrapper, supplying null or actual weather intentionally, and validate serialized weather shape at the contract boundary.

**Effort/dependencies:** a few hours; caught automatically once AUD-05 is implemented. **Acceptance:** zero-, one-, and multiple-planning-route groups return only null or valid weather objects; no absent weather is marked live.

### AUD-08 — Mobile homepage hides the working freshness indicator

**Confirmed defect · P2 · High confidence.**

Evidence: `src/layouts/BaseLayout.astro:203` and `src/pages/index.astro:55` both provide `data-home-freshness`. `src/scripts/summary-board-home.js:262` selects only the first; `:1073` updates that one element. At the mobile breakpoint, the updated header copy was hidden while the visible hero still said **“Checking latest refresh…”**. The hidden text said **“Updated 40d ago. Showing latest available data.”**

This obscures the age of the conditions at the point of choosing a route. Existing desktop checks would not catch it. The same viewport also exposed a nameless search button: `src/layouts/BaseLayout.astro:169` lacks a stable aria-label and mobile CSS hides its text.

**Smallest improvement:** update all freshness instances or render one responsive status component; label the search button independently of visible text.

**Effort/dependencies:** half a day. **Acceptance:** at desktop and 390px width, fresh/loading/stale/error states update the visible label; mobile search has an accessible name and opens the search dialog via keyboard and pointer. Reverify using a clean build.

### AUD-09 — Abuse controls depend on an unverified proxy boundary

**Risk · P2 · High confidence in code paths; deployment mitigations unknown.**

Evidence: `src/server/rate-limit.ts:25` trusts the first `x-forwarded-for` value, then `x-client-ip`, without checking the connecting proxy. A pure probe exhausted five requests with one header value, then obtained a fresh bucket by changing it. `src/server/routes/admin.ts:40` has no application login limiter. Admin cookies at `src/lib/route-contributions.ts:432` have HttpOnly/SameSite but no Secure attribute.

If attacker-controlled forwarding headers reach the origin, submission throttles can be bypassed. The single-password admin surface permits repeated guesses at the application layer. Edge filtering, origin restrictions, TLS/HSTS, and credential strength were not inspected, so no successful attack is claimed.

**Smallest improvement:** define trusted proxy handling, derive client identity only from the trusted boundary, add login throttling and production Secure cookies, and verify direct-origin access restrictions. Preserve the existing timing-safe signature/password comparisons.

**Effort/dependencies:** 1 day plus deployment inspection. **Acceptance:** spoofed forwarding values cannot reset a test client's allowance; repeated failed admin logins get bounded 429 responses; production cookies are Secure; legitimate proxied clients remain distinct.

### AUD-10 — Photo ingestion trusts MIME labels and retains submitted bytes

**Risk · P2 · High confidence in processing path; no actual privacy leak observed.**

Evidence: `src/server/routes/route-contributions.ts:141` decodes data URLs; `:309` validates a MIME/base64 pattern, not decoded image structure or dimensions. `src/lib/route-contributions.ts:240` stores supplied buffers and the approval path republishes photo bytes. No server-side decode/re-encode or metadata stripping was found in that path.

A correctly labeled payload can be invalid or resource-intensive image data. Genuine photos can carry EXIF location/device metadata that visual moderation does not reveal. Client resizing and moderator approval are useful but cannot enforce server invariants.

**Smallest improvement:** decode supported images server-side, cap pixel count and encoded size, strip metadata, and publish normalized derivatives. Specify removal/retention procedures for originals, rejected submissions, indexes and public copies; the privacy page already offers deletion by email (`src/pages/privacy.astro:65`).

**Effort/dependencies:** 1–2 days plus a short operational retention decision. **Acceptance:** malformed bytes and oversized dimensions are rejected; published fixtures contain no GPS/EXIF metadata; deleting a synthetic submission removes its associated copies/index references. No legal-compliance conclusion is made here.

### AUD-11 — Deployed dependencies are not the locked, audited tree

**Risk · P2 · High confidence.**

Evidence: `.github/workflows/azure-app-service-api.yml:49` creates a reduced manifest without the root overrides and resolves dependencies with `npm install --no-package-lock`. Its generated startup command can install again. `infra/azure/snapshot-worker/Dockerfile:9` similarly installs without a lockfile. Root overrides are in `package.json:130`.

The same source commit can resolve different transitive packages in CI, the worker and startup. The registry audit returned 39 affected-package entries; many belong to Expo/build tooling, so `--omit=dev` does not prove they ship in the API or native runtime. Installed Astro also could not start on this Windows environment because its compiler binding was missing. These are separate observations, not proof that an advisory caused the startup failure.

**Smallest improvement:** create locked deploy manifests preserving intentional overrides, install with reproducible commands, and deploy the tested artifact without startup installation. Triage each advisory against the actual API/worker/mobile-build/native bundle; avoid forced broad upgrades based only on scanner suggestions. Repair the local installation separately when implementation is authorized.

**Effort/dependencies:** 1–3 days for packaging/triage; platform upgrades require separate estimates. **Acceptance:** two builds of the same commit resolve the same dependency versions; production has no install-at-start path; each high advisory has an exposure assessment and fix or documented exclusion.

### AUD-12 — General route audits skip public planning routes

**Risk / verified coverage gap · P2 · High confidence.**

Evidence: `scripts/audit-route-data.ts:1` imports the direct-gauge `rivers` population and its audit loop starts at `:119`; `src/data/rivers.ts:1937` defines that population. The runtime sample contained 559 public planning routes. Coordinate/geometry checks cover broader populations, so this is not an assertion that planning routes receive no validation.

Duplicate IDs/slugs, enrichment, logistics and profile checks in this particular general audit do not cover the whole publicly presented inventory. Success messages lack a clear excluded-population count. The authoring/runtime/sensitivity differences in AUD-01 demonstrate the practical danger of inconsistent populations.

**Smallest improvement:** run universal identity/access/logistics checks over the full inventory/public set, then score-specific checks over the effective scored set. Print totals for inventory, public planning, public scored, withheld and excluded routes.

**Effort/dependencies:** 1 day after AUD-01. **Acceptance:** an invalid planning-route ID/access/logistics fixture fails the relevant gate; all population counts reconcile from the same policy and catalog revision.

### AUD-13 — Declared monitoring can miss a scheduler that stops running

**Risk · P2 · High confidence in declared checks; other deployed monitors unverified.**

Evidence: `infra/azure/container-apps-job.bicep:167` alarms when the latest two observed executions both failed; it does not make absence of executions an alert condition. `src/server/routes/public-rivers.ts:60` readiness primarily verifies the static index, not successful snapshot age. Healthy HTTP service and fresh decision data are different requirements.

The worker has timeout/retry controls, and manual snapshot verification checks freshness; preserve those. A disabled/missed scheduler or missing completion telemetry can nonetheless evade the specific declared failure alarm while old snapshots keep serving.

**Smallest improvement:** add an independent last-success/snapshot-age check with explicit no-data handling and an actionable runbook. Also bound push HTTP waits (`src/lib/alert-push.ts:36`) and verify delivery-state recovery across a crash after send but before state persistence (`src/lib/alert-evaluator.ts:122`). The deterministic email operation ID is an existing useful mitigation; equivalent exactly-once push behavior was not established.

**Effort/dependencies:** 1–2 days; storage recovery builds on AUD-06. **Acceptance:** in a test environment, no completed runs, old snapshots, and a hanging push transport each produce a bounded failure and meaningful alert; healthy scheduled runs remain quiet.

### AUD-14 — Snapshot growth needs a measured capacity budget

**Improvement opportunity · P2 · Medium confidence in future impact.**

Evidence: the observed production summary decoded to **3,588,909 bytes for 929 entries**. `src/lib/river-snapshots.ts:43` imposes a **4 MiB** summary limit, checked at `:163` before publication. The exact producer serialization differs from the HTTP envelope, so this is a headroom warning, not a proven current limit breach. Local runtime coverage was larger than the deployed summary population.

Clients load the whole summary, and `src/server/http.ts:30` performs synchronous compression. A single 2.1-second request does not isolate network, server, parsing or rendering costs. Raising the size limit alone would postpone the constraint while retaining client cost.

**Smallest improvement:** measure producer bytes, compressed transfer size, parse/render time and refresh duration on the intended next catalog. Set growth gates and remove unused fields before choosing geographic partitioning or pagination. Relate costs to useful outcomes using the existing weekly report (`scripts/weekly-product-report.ts:755`), rather than building another dashboard.

**Effort/dependencies:** 1 day for measurements/budgets; payload changes sized from results. **Acceptance:** the next intended catalog refresh stays within an explicit budget and the slowest supported client meets an agreed load target. Weekly reporting shows resource cost per successful refresh and per route-planning session where data is available. No dollar savings are claimed without billing evidence.

## Improvement roadmap

### Immediate: policy and containment

1. Implement AUD-01/02 as one publication-policy change, with explicit planning and withheld-route fixtures through runtime, snapshots, summaries, groups and detail.
2. Fix AUD-03 and AUD-08 together: stale evidence must alter the decision and its visible freshness copy on both clients.
3. Contain malformed requests (AUD-04) and fix the small planning serializer defect (AUD-07).
4. Establish actual server/shared checks and full workspace tests (AUD-05) before further release automation relies on passing gates.

These are sequencing recommendations, not a claim that all can be completed in one day. No implementation was performed by this audit.

### Next one to three weeks: reliable writes and repeatable delivery

- Add conflict-safe storage mutations (AUD-06), then notification crash-recovery tests and no-data monitoring (AUD-13).
- Review proxy/admin controls (AUD-09), normalize uploaded images and document removal (AUD-10).
- Produce and test locked API/worker artifacts; triage advisories by deployment surface (AUD-11).
- Expand universal route validation (AUD-12). Generate and verify catalog, withholding and geometry artifacts from one stable checkout. The changing working-tree counts observed here support using isolated worktrees for independent route work and a single integration/regeneration step; they do not establish which process caused the changes.
- Rebuild the web app after repairing the environment. Recheck mobile search hit targets, favorites refresh, map readiness, empty/error states, and screen-reader names. Run native-device offline/resume, denied-location, map and alert journeys before treating web emulation as mobile QA.

### Longer-term investments, conditional on evidence

- Use the existing outcome-calibration model (`src/lib/scoring-calibration.ts:29`) to review false reassuring decisions by threshold model and source quality. Preserve its small-sample warning. Add captured readiness, evidence age and policy revision to outcome review if absent, so a score disagreement can be separated from stale presentation. Acceptance: an approved synthetic unsafe outcome can be traced to the exact decision context; real sparse samples remain labeled directional.
- Measure discovery → route view → save/directions/report separately for scored/planning and fresh/degraded experiences. The weekly product report already includes retention and conversion events (`scripts/weekly-product-report.ts:13`, `:735`); add only dimensions needed to answer whether users reached a trustworthy plan. Do not collect precise location solely for this analysis.
- Update `docs/cost-audit.md` against actual Azure/ACR/logging/EAS usage and current operating configuration. The document's May review and generic estimates are not current invoices. Reuse the weekly report's existing Azure-cost integration and expose unavailable data rather than estimating savings. Acceptance: reviewed resource inventory, measured month-to-date totals when accessible, and an owner/budget for recurring jobs.
- Use the payload measurements in AUD-14 to decide whether partitioning is necessary. Refactor large modules only around verified shared policy seams; file length alone is not a justification for a redesign.

## Preserve, simplify, and defer

**Preserve:** app-owned API/provider boundary; shared contract/client/geo packages; direct-versus-proxy distinction; minimum-only score limits; explicit readiness and uncertainty; source evidence and withholding intent; 837-test root suite and sensitivity invariants; snapshot-last publication order; request IDs; bounded upstream work; signed alert management; email operation IDs; route-control-plane exclusive locking, atomic state-file replacement and assignment leases; native cache versioning; existing analytics/calibration/cost reports.

**Simplify:** one eligibility policy, one freshness/readiness policy, explicit test populations, one conflict-safe storage mutation primitive, and locked deployment artifacts. Replace repeated assurances in operational documentation with links to commands and recorded results. Refresh README claims about stack/scope against current manifests and shipped contribution features.

**Defer:** framework migration, microservices, a new database chosen solely for scale, a new analytics platform, broad scoring-weight changes, and further feature/coverage expansion before policy mismatches are resolved. Blob storage can remain appropriate if its mutation semantics are fixed. Do not accept scanner-proposed major upgrades automatically.

## Five actions I would take first

1. **Honor planning and withholding everywhere (AUD-01/02).** This restores the boundary between researched coverage and a published same-day recommendation.
2. **Make stale evidence control readiness and visible freshness (AUD-03/08).** Warning banners cannot compensate for a contradictory affirmative decision.
3. **Contain request-parser failures (AUD-04).** The isolated reproduction showed a single malformed request can terminate the process.
4. **Make pre-merge verification test the actual product (AUD-05/07/12).** The current gates miss executable contract errors and differ from runtime eligibility.
5. **Make persisted user updates conflict-safe (AUD-06).** A successful subscription response must mean the subscription survives concurrent work.

## Audit artifacts and changes

The audit intentionally added only this report and `docs/audits/2026-09-04-system-audit-evidence.json`. Temporary diagnostics/logs/configurations were written under the system temporary directory; tool-generated caches may have been updated by test/startup tooling. The failed fresh startup did not repair dependencies. Existing route/application/operational changes were not reverted, regenerated, committed or deployed. A disposable localhost browser origin was used for the saved-route interaction; it does not alter production preferences.
