# Mobile Saved, comparison, and offline segment plan

Status: core implementation complete; focused mobile unit and browser validation passed. Native accessibility and device-offline QA remain.

## Outcome and scope

Make three existing mobile journeys easier: find a saved route, compare shortlisted routes, and reopen the selected trip segment without service. Deliver in three independently reviewable changes, in the order below. Estimated effort: 5–7 working days including focused regression testing; physical-device availability may extend the calendar schedule.

## Current implementation

- `apps/mobile/src/screens/saved-screen.tsx` now separates Routes, Trips, and Alerts. Offline trips and drafts live under Trips, while recent routes remain available after the route groups.
- `apps/mobile/src/components/route-comparison-sheet.tsx` now renders a grouped, horizontally scrollable fact table. Saved and `river-hub-screen.tsx` both use this component. Selection remains limited to three routes.
- `apps/mobile/src/lib/offline-trips.ts` reads version-1 packets and writes version-2 packets with selected-segment metadata alongside full-route geometry, full-route facts, and a draft snapshot. It stages and verifies a revision before switching the visible pointer.
- `apps/mobile/src/components/offline-trip-view.tsx` draws a full-route outline without a map SDK or network. It explicitly distinguishes saved reference material from current conditions.
- `prepare-trip-sheet.tsx` already derives selected distance from access-point mile positions and estimates duration with `@paddletoday/trip-pack`. `@paddletoday/geo` contains snapping and line-slicing primitives to evaluate for reuse.

## 1. Simplify Saved — 1–2 days

### Proposed experience

Use three tabs inside Saved: **Routes**, **Trips**, and **Alerts**. Default to Routes, while preserving existing links into Alerts.

- **Routes:** search and Compare control, compact condition counts, then the existing Paddle / Watch / Unavailable / Skip groups. Keep notes and condition-change messages with their route.
- **Trips:** Offline trips first, then Trip drafts. Use collapsible section headers with counts; expand Offline trips initially when downloads exist, otherwise expand drafts when available. Show concise summaries when collapsed. Preserve existing open, update/retry, resume, and remove actions.
- **Recently viewed:** a collapsed section after saved routes, rather than ahead of them. Keep it available in the no-saved-routes state.
- **Alerts:** retain the current alert management content and behavior.
- Remember selected tab and disclosure state while navigating away and back during the session. Avoid adding persisted preferences for this change.
- Search continues to cover saved routes and personal notes. Trip sections have their own empty states and are unaffected by route search.
- On Trips, avoid showing a live-summary loading/error banner that implies downloaded plans cannot be opened. Local storage errors remain visible, including when their section is collapsed.

### Implementation

Refactor `saved-screen.tsx` into smaller tab/section components. Adapt `SavedOfflineTrips`, `SavedTripDrafts`, and `RecentRoutes` to the new hierarchy without duplicating storage reads. Use locally loaded counts and distinguish loading/unreadable records from zero records. Keep tab and accordion controls accessible, with selected/expanded state, counts, and generous touch targets.

### Acceptance criteria

- At 390 × 844 with normal text and healthy data, the first saved route is visible without scrolling through trips or history.
- A downloaded plan is reachable from Saved in two taps: Trips, then Open.
- Trips work when the live summary fails or the live cache has expired, including when no route is favorited.
- Returning from route details preserves comparison selections, the active tab, and useful scroll context; switching tabs does not discard selections.
- Existing alert deep links, notes editing, search, removal feedback, and storage-recovery actions work.
- Large text and short screens do not place content beneath the comparison bar or bottom navigation.

## 2. Make comparison easier to scan — 1–2 days

### Proposed experience

Replace sequential route cards with a comparison organized by fact. Keep the existing two-to-three-route limit.

- Group rows into **Conditions** (call, score, confidence, capture time), **Trip effort** (paddle time, distance, difficulty, approximate drive), and **Access** (put-in and take-out).
- Keep compact river/reach headers visible during vertical scrolling. Each header retains Open and Remove actions.
- Align route values under the same headers. Use readable minimum column widths and horizontal scrolling when necessary; headers and values move together. Indicate when another route is offscreen.
- At large accessibility text sizes, use stacked values within each fact, repeating route names, instead of squeezing columns.
- Subtly emphasize rows whose meaningful values differ, with a text cue as well as styling. Do not label a route the winner or interpret missing data as an advantage.
- Retain unavailable/stale-call treatment, condition timestamps, and approximate-drive explanation. Conditions remain visible even when identical.

### Implementation

Extend `route-comparison.ts` to return stable fact IDs, group IDs, normalized comparison values, and display text. Compute differences from normalized values rather than locale-formatted strings. Update the shared sheet once, and verify both Saved and river hub callers. Continue using already-loaded summaries; opening comparison must not trigger a detail fetch for every route.

### Acceptance criteria

- Users can compare a single fact across all selections without scrolling through complete route cards.
- Route identity remains clear through vertical/horizontal scrolling and route removal.
- Missing, withheld, and stale data retain explicit labels; stale scores are not presented as current.
- Removing a route recalculates differing rows and maintains useful focus/scroll position. With fewer than two routes, show the existing selection guidance.
- Close returns focus to the launcher; Open route and back navigation preserve the shortlist.
- Verify two and three routes at 320, 390, and 430-pixel widths, short screens, large text, reduced motion, and screen-reader reading order.

## 3. Show the selected segment offline — 2–3 days

### Proposed experience

Downloaded trips open with **Your selected segment**: selected landing names, supported distance and estimated paddle time, and an outline emphasizing the portion between those landings. Keep the full route available as muted context and retain full-route logistics under a clearly labeled reference section.

- Preserve A/B landing markers and their real coordinates. Do not silently move the actual access coordinates onto the river line.
- Frame the selected segment by default. Offer full-route context where necessary to understand the selection.
- Display distance from valid access-point mile positions; use full-route distance only when the selected endpoints are the full-route endpoints.
- Reuse the existing duration estimator when the required distance and full-route timing are supported. Label it as a planning range that excludes shuttle/staging time.
- If selection geometry or estimates cannot be established, show the available full-route reference with a specific explanation. Geometry availability and distance/time availability are separate decisions.

### Data and geometry implementation

1. Extract the existing selected-distance calculation into a tested mobile helper used by Prepare trip and offline download; reuse the trip-pack duration estimator.
2. Add a segment model recording endpoint IDs, distance and its basis, estimated duration range and its basis, clipped geometry when supported, and explicit unavailable reasons. Persist it at download time so reopening requires no live fetch.
3. Introduce a version-2 offline packet and continue reading version 1. Existing packets remain usable and deletable; offer an explicit update for segment-aware data. Do not overwrite or guess missing version-1 segment metadata during hydration.
4. Evaluate shared geo primitives against canonical route fixtures. Accept a clipped segment only when both endpoints can be matched within a documented distance tolerance and the path is connected and unambiguous. Test the tolerance against real access offsets before fixing its value.
5. Handle reversed geometry order and connected multiline geometry. Reject ambiguous branches, disconnected paths, unsupported access ordering, or implausible endpoint snaps; never draw a straight connector across a missing river section.
6. Preserve verified staged writes, cancellation, size limits, and the previous complete download on failed updates. Geometry retry must also recompute segment geometry consistently without replacing the saved draft.
7. Update the existing offline outline renderer to distinguish selected segment from full-route context. Retain the network-independent rendering approach and avoid duplicating large coordinate arrays unnecessarily.

### Acceptance criteria

- A supported shorter selection highlights exactly its intended river path and shows its supported distance/time, rather than labeling the full route as that segment.
- Prepare trip and the downloaded view agree on selected distance and estimated duration.
- Cold start in airplane mode works after live query data expires or is removed.
- Existing version-1 downloads still open. Successful updates preserve notes/timing; failed or cancelled updates leave the previous packet usable.
- Full-route selections, intermediate landings, reversed line order, connected/disconnected multiline geometry, loops/ambiguous snaps, missing mileage, and missing timing have explicit tested behavior.
- Scores, forecasts, and gauge readings are not introduced into the offline reference packet as current conditions.

## Delivery sequence and checks

| Change | Review focus | Verification |
| --- | --- | --- |
| 1. Saved hierarchy | Route-first screen, two-tap offline access, all existing actions reachable | Saved search, notes, alerts, drafts, offline access, comparison selection, storage recovery |
| 2. Shared comparison | Fact alignment, persistent route identity, data-state clarity | Comparison model tests; Saved and river-hub browser flows; responsive and accessibility checks |
| 3. Offline segment | Geometry validity, estimate provenance, backward compatibility | Geo/segment/packet tests; prepare/download/retry/remove flows; airplane-mode cold start |

For each change, run mobile type checking, relevant mobile unit tests, and focused existing mobile-web flows. Add behavior tests for new interactions and failure cases. Run shared geo/trip-pack suites if those packages change. At the integrated checkpoint, run the mobile unit suite and mobile-web suite, then verify the changed flows in release-like builds on physical iPhone and Android, including large text and VoiceOver/TalkBack.

Capture before/after screenshots using the same populated Saved fixture. For offline verification, record device/build, selected endpoints, expected distance, connectivity state, and the observed fallback behavior. Browser checks are not a substitute for native validation.

## Completion criteria

All three acceptance lists pass; existing saved routes, drafts, alert preferences, and offline packets remain readable; screenshots demonstrate the improved hierarchy/comparison; device results document offline cold-start behavior. Review each change separately before combining them into a mobile release.
