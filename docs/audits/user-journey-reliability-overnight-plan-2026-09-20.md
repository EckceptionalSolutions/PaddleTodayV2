# User-journey reliability overnight plan

Prepared September 20, 2026. Planning only; this document does not start or schedule a run.

**Objective:** A user can discover a route, understand its current conditions, save it, prepare a trip, and retrieve that same plan after leaving and reopening the app. Failures must preserve prior user data, explain what happened, and offer a working recovery action.

**Suggested run:** One eight-hour session, with the last 90 minutes reserved for verification and handoff. Time allocations are planning estimates. Prioritize data loss, misleading success/current-condition states, blocked journeys, then navigation continuity. Complete fewer fixes thoroughly if investigation takes longer.

1. **Establish a reproducible baseline — 45 minutes.**

   Record the starting revision, current working-tree changes, runtime versions, and test commands. The checkout contains extensive existing edits: preserve them and distinguish baseline failures from new regressions. If isolation is needed, create a reproducible copy of the current source, including relevant uncommitted and untracked files; a worktree at HEAD alone would miss the current app. Exclude credentials, generated output, and dependency directories from copied source.

   Check local tooling with `npm run doctor`. Run the existing unit/type checks and the focused journey tests below. Record failures with their exact command and evidence; do not infer current failures from older audit documents. Establish which mobile production-export and website previews can run. Any baseline blocker outside the journey scope gets a precise handoff entry unless a small prerequisite repair is necessary.

2. **Map and exercise the connected journeys — 75 minutes.**

   Use existing fixtures and user-visible interactions. Test real transitions instead of seeding storage at every step. Seed only the starting prerequisites, such as completed onboarding and API fixtures.

   | Journey | Required behavior |
   | --- | --- |
   | Today → route → Save → Saved → route | The same route is saved once; its identity and user notes remain correct after reload. |
   | Explore search/filter → map/list selection → route → Back | Applied search, filters, view, and valid selection survive; viewport restoration is checked where the harness supports it. Rapid route switching cannot display an earlier route's late response. |
   | Weekend → route → select access points → Prepare Trip | The selected route and access pair reach the draft; timing and edited notes remain attached to the correct segment. |
   | Prepare Trip → close/reopen → Saved → resume | Saved values survive navigation and a new browser page using the same persisted storage. Failed writes never report success or silently replace the last valid draft. |
   | Download trip → reopen without live API → restore connection | A previously saved packet remains available; historical conditions are labeled non-current; recovery does not overwrite the user's plan. |
   | Direct route link → navigate away/back; unavailable route | Links open the correct route, and missing/removed routes offer a usable exit while retaining existing saved information. |

   Lead with the Expo mobile app at 390px. Check important actions at 320px and website equivalents at desktop and phone widths. Trip preparation is tested only on surfaces that implement it. Native maps, permission dialogs, app termination/resume, and operating-system Back require a suitable device or emulator and are reported separately.

3. **Inject failures and repair confirmed defects — 4 hours.**

   Apply each failure where it matters, rather than multiplying every journey by every possible state:

   - Delay and reorder requests during search, route switching, and refresh. Only the latest relevant result may update the screen.
   - Fail the initial load and a later refresh; exercise Retry. Previously usable content remains available when appropriate, and pending controls recover.
   - Deny location, then choose a manual location. Discovery and saving remain usable without location permission.
   - Reopen with no cache and with expired cache; interrupt a trip download. Empty, stale, and incomplete states must be distinct, with no false current-condition or completed-download claim.
   - Fail a storage read/write while saving or editing. Preserve the previous valid record and the user's recoverable input; never turn unreadable storage into a silently persisted empty collection.
   - Activate Save, navigation, and preparation actions rapidly. Prevent duplicate records, duplicated navigation, and crossed route/access-point state.

   Capture reproduction steps and a failing assertion before each fix. Make the smallest change that resolves the underlying behavior, extend the closest existing test, and run the affected checks immediately. Add a shared helper only when it serves several real scenarios. Use controlled responses and observable state instead of arbitrary sleeps.

   Keep all writes and API fixtures local. This pass covers existing behavior; catalog expansion, scoring-model changes, broad redesign, infrastructure changes, releases, and real notification delivery are separate work.

4. **Verify the final changes — 60 minutes.**

   Existing starting points include `prepare-trip`, `saved-trip-drafts`, `offline-trip`, `explore-preference-recovery`, `initial-load-recovery`, and `refresh-recovery` in `tests/mobile-web`, plus `route-navigation-loading` and `favorites-recovery` in `tests/visual`. Inspect their current coverage before adding tests; many individual recovery cases already exist.

   Run focused checks after fixes, then the mobile browser suite, relevant website journeys, and `npm run verify` for final type/unit/build validation. Use `npm run test:mobile:web:export -- <affected spec paths>` to check changed mobile journeys against the production export. Recheck critical controls at 320px. Reuse compatible running previews without changing another task's server. Repeat timing-sensitive reproductions only when needed to verify the race is resolved.

   Do not relax assertions or update snapshots simply to conceal a failure. Record any pre-existing build/test failures and distinguish them from checks that passed on the final source. If verification exceeds the time allocation, stop taking new fixes and report unfinished checks explicitly.

5. **Prepare the morning handoff — 30 minutes.**

   Deliver a concise report linking each confirmed issue to its reproduction, fix, regression test, and any useful screenshot/trace. Include the exact validation commands and outcomes, the reviewed change list, remaining issues in priority order, and the native-device checklist. Mark every planned scenario as passed, failed, blocked, or not run.

**Completion criteria:** All six applicable journeys have recorded outcomes. Every shipped fix passes its regression test and related checks. There are no new data-loss, wrong-route, false-success, or stale-as-current regressions in the exercised flows. Baseline failures and unverified native behavior are disclosed; browser results are never presented as native certification. At the session boundary, unfinished fixes are clearly identified and the changes remain reviewable.

**Evidence used for this plan:** Current mobile and website Playwright configurations, `tests/mobile-web/README.md`, existing trip/navigation/recovery tests, the production-export runner, and `docs/mobile-offline-trip-qa.md`. Older audit findings are investigation leads, not assumed current defects. No tests were executed while preparing this plan.

## Execution checkpoint

The first bounded pass ran September 20, 2026 against the existing working tree.

- The initial focused recovery run covered 29 mobile-web scenarios. Twenty-eight passed; the Explore cached-refresh case failed because the test still targeted the retired summary query and endpoint.
- The recovery test now targets `river-explore-catalog` and `/api/rivers/explore.json`, and reapplies the stale timestamp before reload so the persisted-cache scenario is deterministic.
- The saved-trip-drafts test now opens the user-visible Saved → Trips tab before checking drafts and after reload. The UI intentionally moved drafts out of the default Saved routes tab.
- The corrected refresh recovery file passes all 3 route variants. The corrected saved-trip-drafts file passes its full remove, collapse, reload, and unavailable-access flow.
- The broader selected journey run reached 23 passing scenarios before the outdated saved-trip-drafts selector failed; that failure was the tab mismatch above. The focused rerun then passed.
- The mobile unit suite passes 179 tests across 36 files.

The repository-wide API baseline remains blocked by pre-existing route-data type errors in New York and Wisconsin. `npm run doctor` also reports the optional `@bruits/satteri-win32-x64-msvc` binding missing. Native device, production-export, and full `npm run verify` checks remain for a follow-up run after those environment/baseline blockers are resolved.
