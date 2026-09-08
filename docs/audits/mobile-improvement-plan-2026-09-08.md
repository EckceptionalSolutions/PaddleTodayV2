# Mobile app audit and improvement plan

September 8, 2026. Scope: the Expo mobile app, including Today, Explore, Weekend,
Saved, route details, river comparison, onboarding, notifications, trip preparation,
shared components, persistence, and tests. No app implementation changed in this
audit. Website work and unrelated operations changes remain intact.

## Recommendation

Make PaddleToday excellent at one complete journey: **find a suitable route,
understand the current call, prepare the trip, and retrieve the plan at the river**.
The next long run should start with Explore continuity and a consistent native UI,
then improve trip preparation. Add substantial new features after those foundations
are verified. Keep the five existing tabs initially; a new tab is not necessary to
make Saved a home for prepared trips.

## Evidence and limits

- Read current screens, components, providers, query policies, design tokens, and
  the September 4–5 Explore audits. No applicable AGENTS.md was found in the
  checked repository, app directories, or parent directories.
- Mobile TypeScript passes. All **87 tests across 18 files pass**. Logs:
  `tmp/mobile-audit-20260908-typecheck.log` and
  `tmp/mobile-audit-20260908-tests.log`.
- This is a source and existing-evidence audit, not a new native visual/device
  audit. No mobile server was listening on the checked usual ports. No emulator,
  physical-device interaction, new screenshot pass, or frame-time measurement was
  performed. Visual proposals below need native before/after captures.
- Prior Expo web tests use a projected fallback map. They validate some state and
  navigation behavior, not native geographic gestures, marker hit testing, or
  VoiceOver/TalkBack. Prior native exports demonstrate bundling, not device UX.
- Usage at the audit checkpoint: 5% weekly remaining; no shorter Codex window
  reported; paid-credit balance unchanged. This document does not start a future
  run, redeem a reset, or authorize a deployment.

## Preserve what already works

The app already has onboarding, optional location with a manual Today entry,
route and river-group browsing, condition explanations, saved notes with removal
undo, saved-condition change tracking, route and area alerts, reports/photos,
calendar/GPX exports, and float-plan sharing. Improve these instead of recreating
them. The older trip-intent proposal is not the current implementation:
`src/lib/onboarding.ts` now migrates away the legacy trip-intent storage key.

Explore already has viewport clustering, stable marker identities, selection that
preserves the camera, explicit centering, settled-selection prefetch, and duplicate
navigation protection. Preserve those improvements. Shared API contracts, query
keys, design tokens, and trip-pack utilities are useful existing boundaries.

## Ranked findings

Paths in this section are relative to `apps/mobile/`.

| Priority | Evidence | Impact and proposed work |
| --- | --- | --- |
| P1 | `src/screens/explore-screen.tsx:317` changes applied filters on each search keystroke; results depend on those filters, and the effect at line 232 writes them to AsyncStorage. | Keep input immediate, debounce one applied search value, coalesce persistence, and ensure counts, map, list, and camera use the same applied query. Measure before choosing the delay. |
| P1 | `src/screens/explore-screen.tsx:533` returns the list instead of the map; native viewport state is not preserved at this boundary. The previous audit records the same gap. | Preserve the last user viewport through Map/List, keyboard opening, and empty-result recovery. Restore without an animated reset. Test camera readiness on remount and distinguish explicit reset from routine rendering. |
| P1 | `src/components/explore-route-drawer.tsx:260` animates height; active dragging uses PanResponder on JavaScript. Snap sizes are capped at 268/430, with multiple single-line labels. | Profile native drag before replacing it. Make large-text content and primary actions reachable. If profiling confirms a bottleneck, use a fixed-height translated surface and native/UI-thread gestures. Keep explicit expand/collapse actions. |
| P1 | `src/components/prepare-trip-sheet.tsx` requests `YYYY-MM-DD HH:MM` text, stores the draft in component state, and has no explicit keyboard-avoidance or safe-area hook. | Use accessible date/time controls, preserve drafts across app restarts, and verify keyboard/system-inset behavior. Reconcile timing when the chosen access segment changes without silently overwriting edited values. |
| P1 | `src/providers/app-providers.tsx` expires persisted query hydration after two hours. Saved records retain names, reaches and notes, but not a complete prepared-trip packet. | Add an explicit offline trip packet separate from the live query cache. Retain selected access points, reference geometry, logistics, and user plan; clearly distinguish saved reference data from expired conditions. Do not extend live-score freshness to achieve offline availability. |
| P1 | Native interaction and accessibility verification remains missing from the September 4–5 audits. | Establish a repeatable native baseline before making more performance claims: slow network, gestures, app resume, deep links, larger text, screen readers, and navigation restoration. |
| P2 | `src/screens/home-screen.tsx` combines a featured route, recommendation carousel, four ranking modes, intent actions, and known-route search. | Evaluate first-screen hierarchy on device. Emphasize planning location, one clear recommendation and its reason, then alternatives. Keep search and changing location easy to find. Treat reduced density as a design hypothesis until captured and checked. |
| P2 | Route detail has Today, Access, Reports, More sections; trip preparation is inside Access. | Improve the progression from current call to access selection to preparation. Make the selected put-in/take-out and primary next action clear; keep evidence and caveats near the decision they explain. Avoid adding another competing action strip. |
| P2 | `src/screens/notification-settings-screen.tsx` sends manual city/ZIP users back to Today; area settings and route alerts live in different places. | Reuse the location chooser directly in settings. Present route/area alert links and permission/delivery states consistently while retaining the existing subscription implementation. |
| P2 | `src/theme/tokens.ts` centralizes colors/spacing/radii but not a typography or shared action-component system; screens contain many independent StyleSheets. | Establish a small type scale, button/icon-button states, field treatment, section headers, and sheet spacing. Migrate touched screens incrementally with before/after captures. |
| P2 | Route detail is 4,805 lines, Today 2,403, river hub 1,442, Explore 1,312, Weekend 1,258, including local styles/helpers. | Extract section UI and narrow controllers while changing their behavior. Separate access selection, report submission, alerts, and sharing from detail composition. Avoid a wholesale rewrite or file-size targets as a substitute for clearer ownership. |

Drawer save/close controls have 38-point visible boxes **with 8-point hitSlop**.
That is not evidence of a 38-point effective touch target. Verify adjacent target
overlap and clipping on device before adjusting them. Similarly, do not assume
an animation violates reduced-motion preferences without checking native behavior.

## Execution plan for the next reset

### Stage 1 — browsing that feels native

1. **Capture the baseline.** Use a small Android viewport and an iPhone-sized
   viewport; add a physical-device or suitable native build pass where available.
   Record version, device, build mode, fixture/live-data source and network state.
   Reuse current fixtures and local tooling. Do not trigger paid cloud builds.
2. **Fix Explore continuity.** Implement applied-search state and durable viewport
   restoration. Verify rapid typing/clearing, filters while typing, no matches,
   Map/List, Back from detail, and app background/resume. Keep selection and drawer
   state whenever the route remains valid.
3. **Polish the shared UI and Today.** Establish typography/action primitives, then
   apply them to Today, Explore controls/drawer, and route detail. Preserve the warm
   cream/green identity. Check large text, long names, absent photos and unavailable
   data instead of polishing only populated happy paths.
4. **Resolve measured native interaction issues.** Profile the drawer and map under
   dense data before any gesture/library changes. Refine obscured-marker handling
   only enough to reveal the selected route, preserving zoom and user intent.

Acceptance: typing remains responsive; only the latest applied search controls
results; Map/List restores the camera; repeated route opens do not duplicate the
navigation stack; no primary action clips at large text; screen-reader users can
select a route, read its call, and leave the drawer without relying on a drag.

### Stage 2 — a useful trip companion

1. Replace typed date/time formatting with native-friendly controls and retain
   accessible/manual fallback where appropriate. Validate overnight trips, local
   time changes, expected take-out order, and changed access segments.
2. Save a local draft keyed to the route and selected access points, with explicit
   resume/discard behavior. Keep personal group/vehicle notes local by default.
3. Add **Prepare for offline use** to the existing preparation flow, with size,
   timestamp, completeness, remove, and retry states. Start with reference details
   and available route geometry; downloadable background map tiles are a separate
   scope because provider rights, storage and native-map capabilities need review.
4. Surface upcoming/resumable plans within Saved. Provide fast access to chosen
   landings, directions, saved logistics and the existing float-plan share action.

Acceptance: prepare online, kill the app, enter airplane mode, reopen the exact
plan and access information; expired calls are unmistakably unavailable as live
conditions; partial downloads are never labelled complete; interrupted writes
preserve prior drafts; sharing accurately reflects the selected segment. A float
plan remains a shared plan, not a monitored emergency/check-in service.

### Stage 3 — help people choose and return

These are new feature proposals, not confirmed bugs. Implement in this order if
the preceding stages are stable:

1. **A two- or three-route shortlist.** Compare drive estimate, paddle duration,
   difficulty, access logistics, current-call confidence and data age using a
   vertically readable phone layout. Build on river-hub comparison and shared
   route facts; do not introduce a second scoring model. Start within one river,
   then permit cross-river comparison if the interaction remains simple.
2. **Recent routes and resume planning.** Local history and saved drafts reduce
   repeated search. Include clear/remove controls; avoid making tracking/account
   creation a requirement.
3. **Unified alert management.** Make permission, subscription and delivery states
   understandable; offer the manual location chooser in context. Reuse current
   APIs. Any missing server cancellation/pause capability must be investigated
   before showing a control that implies it works.
4. **Saved collections or lightweight trip history**, only if actual Saved usage
   warrants more organization. Do not add social feeds, accounts, gamification,
   live tracking or a new backend just to enlarge the feature list.

## Code and verification work alongside each stage

- Keep canonical scoring/freshness rules in shared contracts. Presentation cleanup
  must not turn degraded or unscored routes into positive recommendations.
- Extract a shared location selector and small action/field primitives where the
  existing behavior is genuinely common. Keep native and web map implementations
  separate where their capabilities differ.
- Add behavior tests around search timing, map restoration, draft persistence and
  offline freshness. Keep the current 87-test baseline green. Add native screen
  interactions for changed flows; do not mistake mocked library tests for native QA.
- Test cold/warm starts, denied location, offline without cache, old cache,
  interrupted refresh, storage failure, removed route, empty search, long names,
  keyboard dismissal, Android Back, and deep links. Exercise both Android system
  navigation modes and iOS safe areas when devices are available.
- Measure search input-to-results, marker-to-preview, route-open latency, native
  frame timing, network request counts and map mount counts with the same fixture
  and device before/after. Set performance budgets after the baseline; do not
  invent device speedups from model microbenchmarks.
- Maintain concise screenshots/measurements and a batch log. Run focused checks
  after each batch and the mobile typecheck/test suite at stage boundaries. Build
  the affected platforms before calling a stage ready for native review.

## Suggested first independent task

Complete **Stage 1**, then proceed to the date/time and persistent-draft portions
of Stage 2. That produces visible improvements and fixes concrete friction while
limiting the first run's storage/feature scope. Continue to offline packets only
after the native baseline and data-freshness boundaries are verified.

The user has authorized ambitious mobile improvements, but this audit is planning
only. For the next implementation run, preserve unrelated work, retain reviewable
local builds, avoid releases/paid services/infrastructure changes without explicit
authorization, and check account usage at the start and between batches. Honor
the then-current stop threshold; if none is restated, use a conservative 5% buffer
and disclose it before work. Pause when usage cannot be checked reliably; never
redeem a reset or intentionally spend backup credits.
