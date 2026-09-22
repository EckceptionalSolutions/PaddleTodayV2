# Mobile offline freshness, reconnection, and Saved performance

Status: core implementation complete. Native reconnect and large-list device profiling remain.

Deliver three independently reviewable changes, in this order: offline draft freshness, connection recovery, then measured Saved performance improvements. Estimate: 3–6 engineering days, with native device validation scheduled alongside implementation. Native builds and device availability may extend elapsed time.

## 1. Flag outdated offline plans — 1–2 days

### Current behavior

`apps/mobile/src/lib/offline-trips.ts` stores the selected route/access pair and a copy of all seven trip-draft fields. Version-1 and version-2 packets are readable; writes are queued, staged, verified, and committed by switching a revision pointer. `trip-drafts.ts` stores the editable draft separately for the same route/access pair. `PrepareOfflineTrip` offers an update action, but `SavedOfflineTrips` does not compare that packet with the latest draft. Geometry retries change the packet's saved timestamp without updating its draft, so timestamps alone cannot determine freshness.

### Experience and implementation

1. Add a pure comparison helper for a packet and its matching draft. Compare launch, expected return, check-in, group size, boat, vehicle, and note by field value. Use the route slug plus put-in and take-out IDs as identity. Ignore save timestamps and object property order; preserve meaningful user text differences.
2. Represent distinct states: checking, matches saved draft, draft differs, no matching draft, and comparison unavailable. A missing or deleted draft does not invalidate the existing packet. Unreadable storage must show an unavailable/retry state rather than claiming the packet is current. A different landing pair is a separate plan, not a replacement for another packet.
3. Read drafts once when loading Trips and build an identity lookup, rather than reading storage independently for every card. Refresh on screen focus and after successful local draft saves or packet updates. Reuse a small shared subscription/invalidation mechanism if necessary; avoid polling and avoid sending notes to analytics.
4. Show “Offline copy differs from your saved draft” on affected cards and inside the offline viewer. Summarize changed field labels, such as “Timing and notes changed,” without reproducing private notes in status messages. Keep “Open offline trip” available.
5. Add an explicit **Update offline copy** action that copies the latest successfully saved draft into the existing packet through the existing queued, verified commit path. This local update works without service and preserves geometry, reference facts, segment data, and their provenance. Clearly say that this action updates timing and notes; refreshing downloaded route reference data remains the existing full-download operation.
6. In Prepare trip, compare against the editor's current fields immediately, but require a successful draft save before updating. Capture the exact saved draft revision used by the update; if another edit arrives during the write, leave the card marked different afterward. A failed save must never produce a success label for an older snapshot.
7. Read the latest packet inside its queue before modifying it, so an update cannot revive a removed packet or overwrite a concurrent geometry retry. Recheck the matching draft before committing and recompute freshness afterward. Keep the previous packet usable on cancellation, read failure, size rejection, or write failure.
8. Support both existing packet versions without a migration merely for field comparison. Separate draft-match wording from packet completeness and route-reference age; “matches saved draft” does not mean current river conditions.

### Acceptance and validation

- Edit notes or timing after downloading: Trips and Prepare trip show the difference without another download or app restart.
- Restore the original field values: the warning clears even if save timestamps differ. Retrying geometry alone never clears a draft-difference warning.
- Update while offline: the reopened packet contains the latest saved draft and exactly the previous reference facts and geometry.
- Delete or corrupt a draft: the offline copy remains openable, with an accurate comparison state. Multiple landing pairs on the same route remain independent.
- Test version-1 and version-2 packets, edits during updates, failed draft saves, concurrent removal/retry, and failed verified writes.
- Extend offline-trip unit and browser flows with edit → detect → update → reopen after reload. Verify the same flow on a device in airplane mode.

Primary files: `src/lib/trip-drafts.ts`, `src/lib/offline-trips.ts`, `src/hooks/use-trip-draft.ts`, `src/components/offline-trip-actions.tsx`, `src/components/offline-trip-view.tsx`, and a small draft-comparison helper under `apps/mobile`.

## 2. Recover automatically when service returns — 1–2 days

### Current behavior

`apps/mobile/src/providers/app-providers.tsx` connects `AppState` to TanStack Query's focus manager and refreshes the freshness clock on resume. It does not connect native network state to the query online manager, and the mobile dependency manifest has no native connectivity package. Queries have different stale periods and retry policies; the summary query explicitly disables retry. Existing connection-check browser tests exercise a manual action, not automatic native reconnection.

### Experience and implementation

1. Add a native connectivity adapter using an Expo-compatible version of `@react-native-community/netinfo`, selected and checked during implementation. Install through the project's Expo tooling and update the lockfile. Document the required new native build for testing and release.
2. Register a single native subscription in the app provider and connect it to TanStack Query's online manager. Keep the existing browser online/offline behavior on web. Remove subscriptions during teardown and prevent duplicate registration after remounts.
3. Define a tested state policy: a disconnected interface or explicitly unreachable internet means offline; connected with confirmed reachability means online. An unknown reachability result alone must not lock the app offline. Check initial state and request a fresh connectivity reading on foreground resume so changes made while backgrounded are observed.
4. Let the query manager resume paused reads and refetch eligible active stale/failed queries after recovery. Refresh the freshness clock at the same transition. Verify failed summaries recover despite `retry: false`; add narrowly targeted recovery only if the existing manager behavior proves insufficient. Avoid invalidating every cached route or eagerly fetching unobserved detail queries.
5. Deduplicate unchanged connectivity notifications and coordinate resume/reconnect events so they share in-flight reads. Respect existing freshness windows; fresh data need not refetch simply because the radio changed. Keep geometry's longer cache lifetime.
6. Audit views that treat `isPending` as an active download. Known-offline, paused queries must render useful cached/empty offline states instead of indefinite spinners. Keep downloaded trips, drafts, saved-route metadata, and their local update actions available.
7. Audit mutation behavior before enabling online-manager integration. User submissions and alert changes must not silently queue and later post when service returns. Choose explicit offline failure/feedback for those actions and test reconnect does not replay them. Automatic offline-pack updates and background downloads remain outside this feature.
8. Treat connectivity as a signal to try a request, not proof the API works. Preserve server-error feedback and bounded retries for captive portals or outages; avoid continuous reachability polling or request storms.

### Acceptance and validation

- Leave Today, Saved, Weekend, or a route detail screen visible, lose service, then restore it: eligible data refreshes without navigating or pressing Retry.
- Cold start offline with cached data, with expired cache, and with no cache: each state is usable and recovers automatically when connected.
- Lose/restore service in the background, then resume: freshness labels and visible query results recover correctly.
- Test duplicate events, unknown reachability, Wi-Fi/cellular changes, API failures, and quick connection changes. Verify listener cleanup and request counts.
- Use query-observer unit tests with a mocked connectivity adapter and browser offline/online tests. Confirm native behavior on iPhone and Android in release-like builds; browser events alone cannot validate the native listener.
- No network writes occur solely because connectivity returns, and reconnect never rewrites a downloaded packet.

Primary files: `apps/mobile/src/providers/app-providers.tsx`, `src/api/queries.ts`, freshness/refresh UI, a dedicated connectivity adapter and tests, `apps/mobile/package.json`, and the repository lockfile.

## 3. Keep large Saved lists smooth — 1–2 days

### Current behavior

`apps/mobile/src/screens/saved-screen.tsx` renders its content in a `ScrollView`; `SavedRouteGroup` maps every route to a mounted card. Lookups, search text, grouping, and several callbacks are rebuilt on screen renders. Actual cost has not yet been measured, so virtualization is a decision gate rather than an assumed fix.

### Measurement first

1. Build deterministic local fixtures for 10, 50, 200, and 500 saved routes. Include long names, notes, all condition groups, missing summaries, and some alert records. Keep the data local to QA.
2. Establish baseline measurements on a named representative Android device and an iPhone, using the same build, fixtures, and settings before and after changes. Use a profiling build for React render timing and a release-like build for perceived scrolling; record device, OS, build, and collection size.
3. Measure five repetitions of opening Saved, searching, selecting a comparison route, editing a note, removing a route, and returning from details. Record median/worst visible response times, render counts, mounted-card count, memory trend, and frame stalls during a fixed scroll gesture. Separate local rendering from network/cache hydration time.
4. Use initial investigation triggers of repeated visible interaction delays over 100 ms, list work causing frames longer than 50 ms, or approximately linear growth in mounted views/memory that becomes problematic at 200–500 routes. These are proposed budgets, not measured claims; record any device-specific adjustment before evaluating the result.

### Conditional implementation

5. First remove measured repeated work: memoize route lookups/searchable records and derived sections by their true inputs, and stabilize expensive card props where profiling shows unnecessary renders. Verify that memoization does not hide note, alert, freshness, or comparison changes.
6. If long-list costs remain material, replace the Routes tab's vertical scroller with one `SectionList`. Flatten each status group into individual route items so virtualization reaches the cards; placing entire mapped groups in a list header would retain the original problem. Include missing-summary routes as individual items too.
7. Put search, controls, notices, and counts in list headers, and recently viewed content in a footer. Keep comparison controls and editors outside virtualized rows. Use route slugs as stable item keys and keep selection, edit state, and pending actions in screen/provider state so scrolling a row out of view does not discard them.
8. Preserve pull-to-refresh, existing section order, tab state, alert deep links, notes editing, search, comparison, empty/error states, and bottom safe-area padding. Avoid nesting a vertical virtualized list inside a vertical `ScrollView`. Keep Trips and Alerts on their existing layouts unless profiling identifies a separate problem there.
9. Tune rendering windows from measurements. Cards have variable heights and support larger text, so do not invent fixed-height offsets. Verify that search/filter changes, group changes after refresh, route removal, and navigation back preserve a sensible scroll position and keyboard/screen-reader focus.
10. Repeat the same measurements. If the baseline already meets the budgets, retain the current list and deliver the profiling results plus only justified optimizations. If virtualization is introduced, demonstrate bounded mounted-card growth and a useful improvement at 200–500 routes without worsening the 10-route case beyond normal run variation.

### Acceptance and validation

- Large collections can be searched, selected, edited, and scrolled without repeated long UI stalls on the measured devices; before/after results are attached.
- Scrolling away and back preserves comparison selection and edits; filtering and removing a route affect the intended record.
- No missing, duplicated, or blank cards during scrolling, refresh, or condition-group changes.
- Existing Saved search, comparison, recent routes, alerts, notes, and offline/draft navigation tests pass. Add a large-list regression flow that scrolls to and acts on a distant route.
- Verify narrow screens, large text, VoiceOver/TalkBack, keyboard focus on web, reduced motion, and content clearance above the comparison bar and bottom navigation.

Primary files: `apps/mobile/src/screens/saved-screen.tsx`, route-card components and derived-data helpers only as measurements justify, plus local QA fixtures and a performance report.

## Delivery and completion

| Change | Deliverable | Estimate |
| --- | --- | --- |
| Offline draft freshness | Local difference detection, explicit local update, failure/race coverage | 1–2 days |
| Reconnection | Native connectivity adapter, automatic query recovery, mutation safeguards | 1–2 days |
| Saved performance | Baseline/report and measured optimization; SectionList if warranted | 1–2 days |

Ship these as separate reviewable changes. Reconnection is not required for local draft-to-packet updates, and neither feature should depend on Saved virtualization. Run mobile type checking, relevant unit tests, and the affected mobile-web flows for each change; run the combined mobile unit suite at integration. Use the current earlier Saved/comparison/offline changes as the baseline and record unrelated failures separately.

Completion requires explicit evidence for each acceptance list: automated results, native offline/reconnect observations, and the Saved performance decision with measurements. Record physical-device checks as pending until performed. These changes do not substitute for outstanding accessibility and offline QA from the preceding mobile plan.
