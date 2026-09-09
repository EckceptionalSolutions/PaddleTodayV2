# Mobile polish — September 8, 2026

Scope: begin the mobile improvement plan using the remaining allowance. User
authorized continuing below the earlier 5% buffer; stop at 1% remaining, with room
for validation. No resets, deployments or paid builds. Website work is preserved.

The first session paused at 10:07 local with 1% weekly remaining, then resumed
after the user reset usage. See the final checkpoint below for the latest status.
No shorter Codex window was reported; paid credits were not used.

## Batch 1 — applied Explore search

- Separated immediate input from applied filters with a 250ms settling interval.
  Counts, route filtering, map input and camera context share the applied filters.
  Clear and keyboard Search apply immediately; opening filters also applies the
  current text. Map/List switching retains pending input.
- A small reducer rejects obsolete callbacks after typing, clearing or presets.
  Sorting preserves pending text. Four regression tests cover these transitions.
- Controlled web checks at 320/390px observed one preference write for an
  uninterrupted eleven-character search, and verified empty recovery, submit,
  clearing and query continuity. This measures shared behavior, not native FPS.

## Batch 2 — useful empty results

- Map and List share an empty-results component. A visible 44-point action clears
  only the route search, preserving the area and other filters. Without a query,
  the action opens filters instead.
- Reviewed the 320px screenshot and verified Map/List recovery at both widths.
- Updated the existing drawer regression's obsolete photo-button label to the
  current accessible name. The single-photo assertion remains intact; selection,
  expansion, marker identity/position, dismissal and view-switch checks pass.

## Batch 3 — manual location inside notification settings

- Extracted Today's existing location dialog into a shared component, preserving
  its styles and request cancellation handling. Notification settings can now
  choose or change a city/ZIP directly, with no GPS requirement or trip to Today.
- The alert card displays the saved subscription's actual area and travel radius.
  Dialog copy explains that active alerts follow the planning location.
- Investigation correction: `area-notification-onboarding.tsx` already synchronizes
  active subscriptions on planning-location changes. An early failing test was
  this existing synchronization, not click-through. Removed the speculative
  dismissal delay and duplicate move-area action before finalizing the change.
  The existing synchronization implementation and subscription toggles are intact.
- Browser subscription requests and geocoding are intercepted with synthetic data;
  no real alert subscriptions or notifications are changed by validation.

## Validation and local review

- TypeScript passes; 91 tests pass across 19 files (87 baseline plus four search
  state cases). Local iOS/Android Hermes and 20-route web exports validate bundling.
- Browser checks use the existing captured Minnesota catalog and the Expo web
  fallback map, not live conditions or native map gestures. Local images may be
  absent from the fixture server. Existing React hydration warning #418 can occur
  before recovery; it predates this batch.
- Export: `apps/mobile/.expo/mobile-polish-20260908` (ignored, fixture API, not a
  release artifact). Web preview: http://127.0.0.1:4391/. Main site remains on 4323.
- Metro initially retained an old local API URL in its transform cache. A clean
  export corrected it to 4391. No deployment or production configuration changed.
- Tracked browser regressions: `apps/mobile/tests/explore-search.mjs`,
  `explore-interactions.mjs`, and `notification-location.mjs`.
- Final checks pass at both 320px and 390px: search/recovery, drawer interactions,
  manual location and existing area synchronization. Final mobile unit run:
  91 passed across 19 files. TypeScript, all-platform exports and whitespace checks
  pass. Reviewed empty results and notification settings screenshots at 320px.

## Next work

1. Native device baseline and Map/List camera restoration remain outstanding.
   This pass preserves search input across views, not the native camera.
2. Verify native keyboard/safe-area behavior and screen readers before wider
   drawer/layout changes. Browser screenshots do not establish native accessibility.
3. Investigate recovery after an automatic alert-area synchronization failure:
   the existing onboarding component remembers an attempted location key. Keep
   failures visible and offer a deliberate retry without duplicate subscriptions.
4. Continue the plan's shared UI and persistent trip-draft work after reset.

## Batch 4 — resume after reset: map viewport lifecycle

- Reset confirmed at 100% remaining. Continue with the 1% stop threshold.
- Explore remembers the last settled native region outside the map component and
  restores it on remount only when applied filters/location match. Initial fits,
  new-location fits, explicit centering and selection behavior remain separate.
- Extracted the map-specific lifecycle into `explore-route-map.tsx`. Invalid
  regions are rejected; the web fallback does not pretend to have a native camera.
- React lifecycle checks with an instrumented adapter pass, including no extra
  fit on restoration. TypeScript, 93 units, all-platform exports, and existing
  search/drawer/location checks at 320/390px pass.
- Native validation remains blocked: Windows helper initialization fails with a
  missing kernel-assets path; automatic approval review rejected the localhost
  Expo development-server launch as "blocked by policy." Did not retry through
  another launcher. A read-only Android emulator booted, but no local Java runtime
  was found for a standalone build. Closed that test emulator without saving its
  snapshot. No device performance claims or infrastructure changes were made.

## Batch 5 — recover failed alert-area updates

- Show pending and failed automatic area updates while preserving the actual saved
  alert area. Offer a deliberate retry; prevent an automatic failure loop and
  competing edits while synchronization is pending.
- Keep local preference persistence errors separate from server-update failures.
- TypeScript, 93 unit checks and all-platform exports pass. Browser checks at
  320/390px cover a failed update, unchanged old area, retry, preserved toggles,
  reload persistence and horizontal overflow. Corrected an overflow found at 320px.

## Batch 6 — local trip drafts

- Save timing and personal group/vehicle notes locally per route and selected
  access pair. Untouched defaults are not written. Reopening restores the draft
  and explicitly asks users to review its dates; current conditions are not stored.
- Serialize writes, flush on close, retain edits after failed saves, and provide
  retry/discard controls. Failed reads cannot silently replace an existing draft;
  replacement requires the visible recovery action.
- TypeScript, 99 unit checks and all-platform exports pass. Browser checks at
  320/390px cover immediate-close saves, reload persistence, failed saves/retry,
  unreadable records and explicit replacement. Inspected the narrow error layout.
- Run continues after the user reset; latest check shows 97% remaining, with
  backup-credit balance unchanged. Native runtime limitations above still apply.

## Batch 7 — trip date/time controls

- Added system date/time selection on Android/iOS and browser date/time controls
  for web, with manual entry and validation-focus fallback. Optional check-in has
  a clear action. Date-only changes preserve the time, and time-only changes
  preserve the selected day, including overnight trips.
- Added keyboard avoidance and bottom safe-area spacing to the trip sheet;
  background transitions attempt to flush pending draft changes.
- Installed the Expo SDK 54 matched datetimepicker 8.4.4 and its config plugin.
  Native development clients need rebuilding for this new native dependency.
  Reference: https://docs.expo.dev/versions/v54.0.0/sdk/date-time-picker/ and the
  package's versioned 8.4.4 README. No SDK upgrade or cloud build was performed.
- 103 units pass. Web checks at 320/390px verify overnight local-time calendar
  parameters, optional clearing, manual correction and field focus. The existing
  eight sharing/export cases pass (the calendar case rerun after updating its
  manual-field selector). Native-adapter lifecycle tests cover duplicate opening,
  cancellation, errors, disabled/unmounted dismissal and stale callbacks; these
  are not native device UI tests. Final TypeScript and all-platform exports pass.
- Latest usage: 96% remaining. Continue with shared mobile UI cleanup.

## Batch 8 — shared actions and recovery layouts

- Introduced a small shared typography scale and button component with wrapping
  labels, visible press/disabled states, pending feedback and consistent semantics.
  Applied it to retry/refresh, shuttle directions and Today location actions.
- Recovery screens now scroll when enlarged copy exceeds the available height.
  Refresh notices and section headers wrap their accessories instead of squeezing
  the copy. Shuttle actions now say Apple Maps/Google Maps and show opening state.
- TypeScript and all-platform exports pass. Eight browser recovery cases pass,
  including initial service failure, retained cached data, duplicate retry guards
  and failed map opening. 320/390px browser text stress checks confirm the retry
  action remains reachable; these do not measure native Dynamic Type.

## Batch 9 — Today location continuity and narrow header

- A selected location previously removed the city/ZIP action from Today. Added a
  Change action beside the current planning area; it reuses the shared chooser.
- Fixed the route-count badge clipping at 320px, allowed the hero header to wrap,
  and gave the selected reach two lines instead of one.
- TypeScript/all-platform exports pass. 320/390px checks verify badge bounds,
  changing an existing location, persistence, reopening and cancellation. Existing
  manual-location recovery and route-sharing regressions also pass.

## Batch 10 — consistent calls and missing-photo layout

- Browser inspection showed “Watch closely” and “Good conditions” in the same
  Today hero. Secondary same-day badges now honor readiness gates, while forecast
  labels retain their separate scoring context. Removed redundant raw tier text
  from the hero, drawer and shared route summaries; scoring is unchanged.
- Verification/withheld/skip/ready browser cases pass, including shared text and
  unchanged numerical scores. Aligned hero icon/tone with the canonical call after
  inspection found a green checkmark beside an unavailable call.
- Missing-photo messages and contribution actions now occupy separate space.
  Photo failure/navigation tests pass at 320/390px on route details, Saved and
  Weekend. Inspected the corrected 320px layout and unavailable-call icon.
- TypeScript/all-platform exports and all four decision-state browser cases pass.
- Latest usage: 95% remaining; backup credits unchanged.

## Batch 11 — deliberate draft replacement

- Extracted draft status/recovery UI from the preparation form and reused shared
  buttons. A saved plan can now start fresh through an explicit replace/keep
  choice; cancellation preserves its fields. Resetting clears stale export feedback.
- TypeScript/all-platform exports and 320/390px draft browser checks pass,
  including reset cancellation/confirmation alongside persistence and recovery.
- Latest usage: 94% remaining; continue with resumable draft discovery in Saved.

## Batch 12 — find and resume trip drafts from Saved

- Saved lists device drafts with route/access names and planned/past launch dates.
  Resume preserves the access pair and opens preparation directly. Duplicate taps
  do not stack navigation. Missing access points show recovery guidance and retain
  the original draft rather than opening it against a different segment.
- Removal requires an explicit choice, preserves records on failure, and shares
  the same per-key queue as saves. Damaged records remain untouched and retryable.
- TypeScript/all-platform exports and 106 units pass. 320/390px browser checks
  cover creation, discovery, exact resume, Back, cancellation, failed removal,
  retry/persistence and missing-access protection. Inspected the 320px Saved layout.
- Latest usage: 93% remaining; backup credits unchanged.

## Batch 13 — cached route-call consistency

- The route screen already computed the shared freshness-aware readiness model,
  but its hero and shared summary ignored that result. They now use the same
  verdict, badge and icon state as the existing freshness model. No thresholds or
  scoring rules changed. TypeScript/all-platform exports and six browser cases
  (ready, verify, withheld, skip, stale telemetry, offline telemetry) pass, including
  shared text. Fresh data retains its affirmative call; old data uses the shared
  model's existing downgrade.

## Batch 14 — expire displayed snapshots using the shared policy

- Extracted the existing two-hour snapshot policy/readiness gate into the API
  contract; server behavior is unchanged and its six snapshot tests pass.
- Mobile query observers create freshness-adjusted display copies for boards,
  details and river groups. One clock rechecks while open and on app resume.
  Original cache objects, scores and forecasts are not mutated. Saved-condition
  change tracking does not record these stale display results as new conditions.
- Expired snapshots expose a refresh action; receiving the same old snapshot does
  not make it current. Historical explanation is explicitly disclosed, with prior
  cautions retained. Freshness and original negative gates remain canonical.
- 111 mobile units, mobile/API-contract/runtime typechecks and platform exports
  pass. Controlled browser time verifies expiry, no background request storm,
  immutable cache, old refresh and fresh recovery. Eight recovery checks pass;
  a ninth worked but hard-coded port 8082, corrected to assert the route path.
- Final browser pass after the historical-explanation adjustment passes, as does
  the corrected missing-hub navigation check. Older positive prose is collapsed
  behind “Show saved explanation”; prior caution text remains visible.
- Latest usage: 91% remaining; backup credits unchanged.

## Batch 15 — complete Today call counts and relevant recovery

- Added the missing No call category using the existing shared count and Explore
  intent. All four counts use a two-column phone grid and explicit button labels.
- A board with unavailable calls no longer implies the routes disappeared.
  No-Paddle actions lead to actual Watch, No call or Skip routes, and unavailable
  hero copy frames the route as something to review instead of a best-route claim.
- TypeScript/export and six browser scenarios at 320/390px pass, including actual
  filtered Explore results. The six-case current/stale/offline decision matrix
  also passes with the cache-expiry projection in place. Final one-line hero copy
  adjustment will be included in the next export.

## Batch 16 — portable browser checks and initial-render reliability

- Browser checks accept `MOBILE_WEB_BASE_URL` for an existing preview and
  `MOBILE_WEB_WIDTH` for phone sizes; default Expo development behavior remains.
  Navigation assertions now follow the configured origin.
- The broad checkpoint found two incomplete photo fixtures; they now use the
  complete stored route response. Consent and failed-upload recovery pass.
- Initial data screens now use pending state while cache restoration or the first
  request is outstanding, avoiding false empty results and web hydration errors.
  Welcome mounts its responsive carousel after web hydration; native remains
  immediate. Strict onboarding and preference error assertions now pass without
  filtering React errors. The speculative dimensions-only change was removed.
- Mobile typecheck and all-platform export pass. The Today hero copy from batch
  15 is included. All 86 browser checks pass at 390px; 13 targeted initial-load,
  onboarding, navigation and photo checks also pass at 320px. Usage: 87% remains.

## Batch 17 — distinguish saved Weekend forecasts

- Expired Weekend outlooks now label rankings, counts, route scores and map
  markers as historical. Favorable quality badges and green marker tones return
  only after a current response; prior explanations remain available as such.
- Native and web maps share their legend function and marker tone policy, with
  a separate Saved forecast category instead of treating stale points as Skip.
- Controlled browser cases at 320/390px verify old-response refresh remains
  historical and fresh-response refresh restores current presentation. Existing
  Weekend categories, range and photo fallback checks pass. Screenshots reviewed.
- Mobile typecheck, all-platform export and all 113 unit tests pass.

## Batch 18 — reachable, readable onboarding

- Welcome slides now scroll vertically on short displays, and only the active
  slide is exposed to assistive technology. Pagination and completion remain
  outside the scroll area. Next has a 44-point target.
- Feature descriptions wrap instead of truncating and use larger text. The main
  action uses the shared button's disabled/busy state while progress is saved.
- Mobile typecheck/export and onboarding recovery/layout checks pass at 320/390px,
  including 480px-high screens, all three slides, keyboard navigation, complete
  last-item visibility and retained completion access. Screenshots reviewed;
  native screen-reader and Dynamic Type verification remains outstanding.

## Batch 19 — honest onboarding examples

- Fallback scores and route facts are labeled illustrative, including accessible
  preview text. Sample factors total the sample score; failed data no longer
  leaves the explanation slide indefinitely loading. Readiness-gated routes do
  not become positive examples solely because their raw rating is favorable.
- Real route examples appear only with ready evidence. Sample disclaimers wrap.
- Mobile typecheck/export and offline/withheld/ready browser cases pass at both
  phone widths; onboarding recovery and short-layout checks remain passing.

## Batch 20 — recent route shortcuts in Saved

- Saved shows the last eight successfully viewed routes, initially limited to
  three rows with an accessible expand control. Opening details records only
  name, reach, slug and visit time; prefetching does not create a visit.
- History is local and separate from notes, saved routes, drafts and conditions.
  Serialized writes prevent old visits from recreating cleared history. Read
  failure preserves data; Clear history supports confirmation and retry.
- Added a factual in-app Privacy explanation of local planning data and removal.
- All 118 unit tests, mobile typecheck and platform exports pass. Browser checks
  at 320/390px cover reopen/reload, corrupt history, clear cancellation/failure/
  retry and keyboard expansion. Existing notes/storage recovery checks pass.

## Batch 21 — public calls control Explore and hub map markers

- Map tones, marker text and accessibility labels now use the canonical call;
  a withheld high raw score is a muted No call marker, not a green recommendation.
  Condition groups retain separate markers for different calls at the same score.
- Hub cards apply the same gate to their score badge, and Recommended today is
  reserved for a Paddle call. Planning-only routes do not receive a positive tone.
- All 125 mobile units and typecheck/export pass. Eight controlled map scenarios
  pass at each phone width; shortened-launch directions and six hub recovery/
  interaction checks pass. Marker/card screenshots reviewed. Native behavior
  uses the same presentation model but still needs device verification.
- The small “Tap a marker” copy correction is included in the next export.


## Batch 22 — recover from empty Explore calls

- Map controls show the selected call filter. Empty results offer a targeted
  Show all matching calls action when other calls match, retaining the search,
  state and other filters. The selection persists across reloads.
- Measured headers keep floating controls below stale notices. Empty map content
  scrolls below the header; location stays in that content, and map-only centering
  controls disappear when there is no map.
- Typecheck/platform exports pass. Map/list recovery and location tests pass at
  320/390px, with 480px-high screenshots reviewed and recovery clickability checked.
  Eight canonical map-call scenarios remain passing at 390px.


## Batch 23 — readable hub cards and historical explanations

- Expired hub snapshots label water, wind, confidence and score calculations as
  saved conditions. A fresh response restores current wording. Full route names
  and larger trip facts wrap below the thumbnail instead of being truncated.
- Saving is outside the open-route control and remains keyboard operable without
  navigating. Planning-only tie comparisons now return a consistent ordering.
- Typecheck/platform exports, 125 units, and focused checks at both widths pass.
  Broader checkpoint: 103/105 browser checks pass; two search/duration assertions
  still expected raw scores on withheld map markers. Their selectors are being
  updated to the canonical No call label while retaining the actual filter tests.


## Batch 24 — consistent scores through route previews

- Today, Explore list and selected-route drawer share the public-call score gate
  with maps. Unavailable/planning calls do not display an old positive score;
  unavailable list/drawer explanations use the reason for withholding the call.
- Known-route search uses call-aware colors. Fresh scores remain visible.
- Typecheck and all platform exports pass. Thirteen focused cases pass at 320px,
  and the full updated browser suite passes: 108/108 at 390px. This includes the
  corrected duration/accent search assertions and ready/withheld/expired previews.


## Batch 25 — respect reduced motion in onboarding and trip sheets

- A shared preference hook reads native accessibility settings or the browser
  media query, follows changes, cleans up subscriptions, and defaults to no motion
  until the setting is known. Late native reads cannot override a newer event.
- Onboarding skips animated transitions and cancels in-flight movement when the
  preference changes. Trip sheets use a nonanimated presentation when requested.
- Mobile typecheck and platform exports pass. Browser frame checks at 320/390px
  verify immediate slide positions, including a changed preference; short-screen
  onboarding and trip interaction checks pass. Native device QA remains pending.


## Batch 26 — recover local alert and contact preferences

- Replaced silent read/write failures with a small serialized preference store.
  Corrupt data stays untouched; pending choices merge with recovered records.
  Concurrent email/alert changes retain each other, and write retries stay local.
- Saved, route details and photo contribution surfaces expose readable retry
  notices. Unreadable alert preferences no longer imply that no alert was set.
- All 131 unit tests, typecheck and platform exports pass. Browser checks at both
  widths cover corrupt-data preservation and a successful mocked contribution
  followed by failed/successful local retries, with exactly one submission.
  Existing consent, photo, saved-data and area-alert recovery checks pass.


## Batch 27 — connected alert management

- Notification settings links directly to Saved's Alerts tab. That tab links back
  to nearby alerts, planning location and device delivery settings, including when
  no routes have been saved. Existing route/area subscription APIs are unchanged.
- Direct notification-settings loading exposed an icon/layout hydration mismatch.
  A small platform-specific ready boundary now serves Settings and Welcome; native
  content remains immediate, while web starts from a stable loading shell.
- Typecheck and platform exports pass. Deep links, reload, keyboard tab switching
  and navigation with/without saved routes pass at 320/390px with zero page errors
  or API writes. Recent routes, notes and onboarding checks remain passing.


## Batch 28 — direct static-screen startup checks

- Added cold-opening checks for notifications, route requests, Privacy, Terms,
  and More. More had the same browser-owned icon startup mismatch and now uses
  the shared web-ready boundary; native rendering remains unchanged.
- Typecheck/platform exports and five direct-opening cases pass at both widths.
  No page errors or horizontal document overflow; small-screen captures reviewed.
  Connection recovery and supported-river controls also remain passing.


## Batch 29 — compare a small shortlist within a river

- Hub cards offer Add to comparison, capped at three reaches. A measured bottom
  bar opens the shortlist and leaves scroll room for route actions. Filtering
  preserves selections; removing an item is idempotent; Clear resets the shortlist.
- The phone sheet compares consistent shared route facts, default access points,
  approximate drive from the planning location, call confidence and capture time.
  Missing facts remain unknown; old snapshots do not show a current score. No new
  scoring system, backend or persistent tracking is involved.
- Typecheck, 134 unit tests and platform exports pass. Current/old snapshots,
  3-route cap, filters, removal, clearing, Escape, location estimates, route opening
  and Back retention pass at 320/390px. Screenshots reviewed; hub recovery and
  canonical-map checks pass. Native modal/device behavior still needs verification.


## Batch 30 — current-call clarity in details and sharing

- Unavailable Today previews use a clear review prompt instead of a favorable
  stored explanation. Detail headers and shared summaries withhold unavailable or
  expired current scores while preserving reference calculations in More.
- Old outlooks and hourly weather are labelled as saved information; forecast
  scores use a muted treatment. Fresh screens retain their current presentation.
- Shared app links now carry the same selected access IDs as the web link.
- Typecheck/platform exports and ready/withheld/expired preview/detail checks pass
  at both widths. Sharing cancellation, fallback, duplicate protection and access
  changes remain passing, including matching app/web access queries.


## Batch 31 — understandable GPX export recovery

- GPX checks distinguish missing access geometry, missing routes, rate limits,
  temporary service trouble and connection failures. Retry retains the draft and
  only opens an export after a successful check; selected access IDs stay intact.
- Export descriptions explain calendar timing and map-app use in plain language.
- Typecheck/platform exports pass. Phone checks cover timeout/close cancellation,
  five failure/retry states, retained notes and a single successful export opening.

## Batch 32 — reproducible production-export checks

- Added `npm run test:mobile:web:export`: build Expo web, serve it on an isolated
  loopback port, run Playwright, and clean up the server/lock on completion.
  The host serves only its export directory and rejects unmocked API writes.
- Documentation includes focused runs, phone widths, retained build output and
  stale-lock recovery. Existing review servers remain independent.
- Full run passes 123/123 checks, including host traversal/API guards, production
  hydration and all current mobile flows. The temporary port/lock close cleanly.
- Restored the website on :4323/:4322 after finding it stopped. Its required
  lightningcss Windows binding was missing; restored exact 1.32.0 from npm cache
  without changing dependency versions. Mobile review preview remains on :4391.

## Batch 33 — independent alert thresholds

- Saved shows all locally recorded phone and email thresholds instead of only
  the newest record. Good and Strong phone alerts each show their own On state.
- Alert rows wrap at narrow widths and retain complete route names.
- Typecheck and platform exports pass; Saved and preference recovery checks pass
  at 320px and 390px. Reviewed the narrow screenshot and reload persistence.

## Batch 34 — live reduced-motion support in Explore

- Drawer expansion, collapse and drag settling respect the live accessibility
  preference. Changing it stops motion or restores springs without restarting.
- Typecheck and all-platform exports pass. First-frame browser checks pass at
  320px and 390px; selected-segment directions and Welcome motion checks pass.
- Device gesture and native accessibility behavior still need native QA.

## Batch 35 — location picker in limited vertical space

- Added a scrolling, safe-area-aware location card with a tablet width cap,
  44px close control and reduced-motion support. The backdrop is excluded from
  keyboard/accessibility navigation; the explicit close button remains available.
- Typecheck and platform exports pass. Browser checks at 320px and 390px widths
  with a 320px height cover focus, reachable controls, failed lookup retention,
  successful retry and keyboard dismissal without runtime errors.

## Batch 36 — filter sheet controls and state search

- Cancel sits outside the filter drag responder; dragging begins only after
  movement. Reopening clears any drag offset and uses current callbacks.
- Filters and state picker honor reduced motion. State search labels its input,
  explains zero matches, and gives state options stable accessible names. The
  state-picker close button now has a 44px target.
- Typecheck, platform exports and 134 unit tests pass. Focused 320px browser
  checks verify state search, discarded draft changes and keyboard cancellation.
- Full production-export suite passes 127/127 at 390px; temporary host/lock
  cleanup verified.

## Batch 37 — reversible shuttle drives

- Access offers a reverse-shuttle action with explicit driving endpoints and
  direction. Both Apple and Google links follow that choice; Google explicitly
  requests driving. Paddle access selection and sharing are unchanged.
- Typecheck and platform exports pass. Browser checks at 320px and 390px cover
  opening failures/retry, both directions and map providers, plus route sharing.
  Reviewed the narrow layout screenshot.
- Restored the separate review preview after an in-progress export removed its
  index briefly. Its local-only server now returns a rebuilding response instead
  of crashing if output is temporarily absent. Main website remains running.

## Batch 38 — accurate Saved summary counts

- Current calls counts usable calls rather than downloaded route records. Saved
  grouping now uses the shared planning-only gate as well as readiness.
- Unreadable/unloaded alert preferences show Unknown. The empty alert view asks
  for route details, avoiding the false implication that a positive call is
  required to configure an alert. Overview tiles have combined accessible labels.
- Typecheck and platform exports pass. Focused checks cover ready, withheld,
  planning-only and expired records, alongside Saved alert and recovery flows.

## Batch 39 — manageable trip draft lists

- Saved initially shows three drafts with an accessible Show all / Show fewer
  control. Resume and remove controls identify the selected access pair, so
  multiple drafts for the same river have distinct names.
- Typecheck and platform exports pass. Browser checks at both phone widths cover
  expansion, targeted removal/cancellation, reload persistence and missing-access
  protection. The existing complete draft resume and failed-removal checks also
  pass at both widths.

## Batch 40 — protect unsaved personal notes

- Cancel and system-back requests offer Keep editing or Discard changes when
  the note differs from its saved value. Explicit discard preserves the previous
  saved note. The editor shows the reach and uses shared action styling and
  reduced-motion behavior.
- Typecheck and platform exports pass. Both phone widths cover cancellation,
  keyboard Escape, restored editing focus, explicit discard without a write,
  failed-save retry, reload persistence and note removal. Reviewed 320px layout.

## Batch 41 — choose among matching planning cities

- Ambiguous geocoding results offer explicit city/state choices rather than
  silently selecting the largest city. Searching/canceling retains the current
  location; a single match keeps the quick flow. Duplicate coordinates and
  malformed results are filtered, with county/coordinates distinguishing names.
- Shared location lookup and selection are separate; cancellation uses the latest
  location when restoring status. Today and notification settings share choices.
- Typecheck and platform exports pass; 137 unit tests pass. Both phone widths
  cover city selection/persistence, cancellation and existing location flows.
  Reviewed the settled 320px picker with reduced motion enabled.
- Full production-export suite passes 133/133 at 390px.

## Batch 42 — recover failed location persistence

- Failed location saves/clears now explain the session-only state and offer a
  local retry on Today, Explore, Weekend and notification settings. Only the
  focused screen announces the notice.
- Serialized persistence ensures a slow save cannot overwrite a newer clear;
  superseded queued writes are skipped. Retry uses the latest chosen location.
- Typecheck, platform exports and 140 unit tests pass. Both phone widths cover
  failed write/clear, local retry without another search, restart persistence,
  plus existing manual/GPS flows. Reviewed the narrow recovery notice.

## Batch 43 — consistent planning-only previews

- Today, route cards and Explore drawer use one public-call gate for labels,
  quality badges, colors and scores. Planning-only summary projections also
  withhold current calls before counts/ranking, retaining original cached data
  and existing cautions without marking fresh reference data stale.
- Typecheck, platform exports and 142 unit tests pass. Phone checks cover
  planning-only Today counts, drawer/list labels, normal ready/withheld/expired
  behavior, Saved counts and map decisions.

## Batch 44 — Explore drawer on short screens

- Reproduced expanded facts extending behind bottom navigation at 320px height.
  Drawer height now uses the measured map area; marker focus and floating-control
  offsets use the same limit. Short layouts move the photo into scrollable details.
- Typecheck and platform exports pass. Both phone widths at 320px height verify
  route actions and facts remain above navigation, plus normal-height expansion,
  reduced motion and selected-segment directions. Reviewed compact screenshots.

## Batch 45 — readable collapsed drawer

- Collapsed height reserves room for the route summary and optional Compare
  action. Map focus and control offsets follow the same height calculation.
- Close/save and primary controls use 44px targets; detail/condition labels use
  11px text instead of 9px. Short layouts remain bounded by the measured map area.
- Typecheck and platform exports pass. Both widths verify one/two-route summaries
  above navigation, short-screen facts, motion preferences and segment directions.
  Reviewed the 320px two-route drawer.
- Full production-export suite passes 138/138 at 390px.

## Batch 46 — distinguish notes for different reaches

- Personal-note controls include the river reach in their accessible name.
- Platform exports and both phone-width checks pass. The notes scenario now
  saves two reaches of the same river and verifies editing/removing one note
  preserves the other, alongside discard and storage-recovery behavior.

## Batch 47 — weather timing respects source and forecast age

- Tablet inspection found historical hourly values labelled Now and an old
  forecast offering an Open / Good weather window. Weather now uses dated,
  neutral reference presentation when its source or current-hour coverage is
  unavailable. Saved snapshots label the Today conditions section accordingly.
- Live timelines drop elapsed hours and recompute hour labels; reference cards
  offer Refresh weather with concurrent requests deduplicated. Planning weather
  context also avoids reusing a stale rain-timing recommendation.
- Typecheck, platform exports and 145 unit tests pass. Both widths cover old
  snapshots, fresh responses containing old hours, unavailable sources, successful
  refresh, true zero/missing readings and broader storm caution. Reviewed 320px.
- Read-only tablet inspection found Today/Saved usable at 768px; device QA remains
  separate from these web-rendered checks.

## Batch 48 — recover an empty hourly forecast

- Missing weather or hourly payloads now keep a clear unavailable card and Refresh weather action.
- Typecheck, all-platform exports and five weather-reference checks pass at both phone widths.

## Batch 49 — saved-route pending feedback

- All shared save controls and the Explore drawer expose per-route pending state, show a spinner and disable repeat taps. Removal labels explain the ongoing operation; Undo shows Restoring until persistence completes.
- Typecheck and all-platform exports pass. Both phone widths cover delayed removal, duplicate taps, failed-write recovery, Undo and preservation of personal notes.

- Full production-export checkpoint after batch 49: 144/144 browser checks pass at 390px.

## Batch 50 — explicit nearby-alert states

- Today/Weekend switches show On/Off in text and expose busy state. Updates show saving feedback; when both are off, guidance explains how to resume delivery.
- Typecheck, platform exports and nine alert-settings scenarios pass at each phone width. Reviewed narrow-screen layout.

## Batch 51 — feedback sheet on short screens

- Reproduced a mostly clipped rating action at 320px height. The whole sheet now scrolls, including choices, form and success; Back/Close use 44-point targets and transitions respect reduced motion.
- Typecheck/platform exports pass. Four feedback checks pass at each width, including store recovery and short-screen reachability. Reviewed the 320px screenshot.

## Batch 52 — protect feedback drafts

- Dismissing a written feedback draft offers Keep editing/Discard draft, including system Back and dismissal from the choices view. Sending prevents dismissal until completion; failed requests retain message/email, while confirmed submissions close normally.
- Typecheck/platform exports and five feedback scenarios pass at both widths. Tests intercept submissions locally.

## Batch 53 — report date picker

- Reused the trip picker in date-only mode for optional report dates, retaining manual entry and adding Clear. Report/photo actions now have distinct accessible button names. Hidden trip/report sheets disable their pickers to dismiss pending native selections.
- Typecheck/platform exports pass. Nine report/trip scenarios pass at both widths; reviewed the narrow report form. Native picker interaction still requires device QA.

## Batch 54 — actionable controls for keyboard and screen readers

- Added button roles/names to Today recovery/list actions, Weekend alternate routes, river comparison, gauge evidence and route-alert entry points. Decorative backdrops remain separate.
- Typecheck/platform exports pass. Both widths verify keyboard opening of source/graph links and the More alert sheet; external links are intercepted.

## Batch 55 — access chooser ownership and layout

- Extracted AccessPointSelector and its styles from route detail. Backdrop dismissal no longer wraps the whole sheet in a touch target. The chooser respects safe-area padding/reduced motion, uses a 44-point close control, and shows complete long access names.
- Typecheck/platform exports and four access/control checks pass at both widths, including selection, keyboard dismissal and short-screen layout. Reviewed 320px.

- Full production-export checkpoint after batch 55: 150/150 browser checks pass at 390px.

## Batch 56 — remove obsolete detail styling

- Removed 38 unused private route-detail styles after checking syntax-tree references and ruling out dynamic style access. Report choice groups now set native selected/disabled state, and focus scrolling honors reduced motion.
- Mobile typecheck passes; platform/browser verification continues with the adjacent sheet batch.

## Batch 57 — route-alert sheet layout

- Route-alert actions measured 41px; they and Close now meet 44 points. Extracted AlertSetupSheet, added whole-sheet scrolling, removed truncated reach text and respected reduced motion.
- Typecheck/platform exports and four focused checks pass at both widths, including long names, status messages, keyboard evidence links and report dates. Reviewed 320px; this export also verifies the batch 56 cleanup.

## Batch 58 — remaining small action targets

- Gauge evidence, report Close and notification location actions now meet a 44-point minimum. The legacy View all list received the same adjustment during review and was subsequently identified as unused.
- Typecheck/platform exports and eleven focused scenarios pass at both widths, including measured source/report controls.

## Batch 59 — compiler-enforced unused-code cleanup

- Removed unused private list/checklist components, helper chains, imports and an obsolete ranking table. Removed 35 newly unused style entries from the touched screens. Simplified the route explanation helper’s unused argument.
- Enabled noUnusedLocals/noUnusedParameters for the mobile project. The stricter typecheck, 145 unit tests and all-platform export pass.

- Full production-export checkpoint after batch 59: 152/152 browser checks pass at 390px.

## Batch 60 — saved phone alerts in context

- Route-alert setup shows saved phone thresholds separately from email subscriptions and allows confirming a saved alert again. Local preference recovery now appears inside the sheet.
- Stricter typecheck/platform exports and five phone-width cases pass, including mixed delivery methods, both thresholds, corrupt local data and long layouts. Six tablet-width sheet checks pass; reviewed saved-state and report captures.

## Batch 61 — readable form widths on tablets

- Report, prepared-trip and personal-note forms now center within a 640-point maximum width while retaining phone widths.
- Stricter typecheck/platform exports pass. Three existing report/draft/note workflows pass at 320px and 768px; reviewed the tablet report before/after.

## Batch 62 — persistent report field labels

- Name/email now retain visible labels and required-field guidance after typing. Trip experience, narrative and optional notes have clearer labels; existing focus offsets remain intact.
- Stricter typecheck/platform exports and report/date workflows pass at 320px and 768px. Reviewed the phone form.

## Batch 63 — compare saved routes across rivers

- Saved now has an explicit comparison mode for up to three routes. Selection controls appear only in that mode, with a measured action bar above navigation. Removing a saved route prunes its selection; opening a route and returning preserves the comparison.
- Reused the comparison facts/sheet for summary and detail data, added river names to distinguish identical reaches, and retained current/stored/planning score gates. No additional detail request is needed just to compare.
- Stricter typecheck, 146 unit tests and all-platform export pass. Phone/tablet checks cover limits, mixed planning/current calls, old snapshots, navigation return, removal, cancellation focus and existing river-hub comparison. Reviewed the 390px selection and comparison layouts.

- Full production-export checkpoint after batch 63: 157/157 browser checks pass at 390px.

## Batch 64 — find a saved route locally

- Added search by river, reach, area and personal notes with accent/case normalization, result counts, clear and no-match recovery. Records without fetched conditions remain searchable; comparison selections survive filtering.
- Search stays local and temporarily hides unrelated overview/history/drafts. Added keyboard avoidance for native layouts (device keyboard behavior remains unverified).
- Stricter typecheck and all-platform export pass. Search/comparison checks pass at 320px and 390px, including offline fallback, hidden selections, no extra requests and clear-button focus. Reviewed the narrow search layout.

## Batch 65 — supported-river directory clarity

- More's directory now shows a neutral river icon, area and route count instead of a raw score/rating from one representative reach. Long river/area names wrap, and accessible actions describe browsing one or multiple routes. Removed the duplicate score palette.
- Typecheck/all-platform export and directory recovery, keyboard tabs, long-name and river-hub navigation checks pass at 320px and 768px. Reviewed the narrow directory; corrected singular count wording afterward.

## Batch 66 — request-route validation in context

- Added inline river/area/email errors, required/invalid accessibility states and automatic clearing as fields become valid. Reused the shared busy button and centered the form within 640 points on tablets.
- Typecheck/all-platform export pass. Phone/tablet checks exercise first-invalid focus, visible error explanations, pending submission, failure preserving entries, retry and confirmed success clearing errors. Reviewed the phone form; directory checks also pass after count-copy corrections.

- Full production-export checkpoint after batch 66: 160/160 browser checks pass at 390px.

## Batch 67 — Today search layout and ownership

- Reproduced the search Close button with only 30% inside a 320px viewport. Reserved header space, made Close/Clear/state targets 44 points, wrapped route labels/facts, and capped tablet width. Clear restores input focus; reduced motion controls presentation.
- Extracted the modal and its private styles/helpers from Today. Empty results reuse shared buttons; route facts no longer show empty pills or a raw “Ideal window” gauge label alongside an unavailable call.
- Stricter typecheck, 146 unit tests, all-platform exports and search/layout checks pass at 320px and 768px. Reviewed the narrow result layout.

## Batch 68 — search across rivers with many reaches

- Moved the Today search cap after river grouping so many matches from one river do not crowd out other rivers. Shared accent/case normalization now applies to matching and text ranking.
- Typecheck/all-platform export and search checks pass at 320px and 390px, including 22 matching reaches plus another river and an unaccented query matching “Rivière.”

## Batch 69 — photo form labels and target sizes

- Photo contribution now retains caption/name/email labels, marks required contact fields, uses a 640-point tablet width and larger input text. Upload/camera, removal and consent controls have at least 44-point targets; submission also exposes native busy/disabled state.
- Typecheck/all-platform export and mocked upload/retry/consent checks pass at 320px and 768px. Reviewed the phone form. The capture also exposed stale validation feedback after correcting an email, which is the next follow-up.

## Batch 70 — photo validation follows corrected entries

- Separated photo-form validation from submission feedback. Name/email errors appear inline and clear when corrected; photo/consent feedback also reflects the current form instead of retaining an obsolete error. Consent exposes native disabled state.
- Typecheck/all-platform export and phone/tablet upload/retry/consent checks pass, including invalid states clearing before submission. Network failure still preserves entered data and attached photos.

## Batch 71 — remove obsolete style definitions

- Removed 15 unused private styles across Explore, Saved, Weekend, Welcome and two cards/drawers. Checked property references and excluded dynamic style lookups before removal.
- Stricter typecheck and the full production-export checkpoint pass: 162/162 browser checks at 390px.

## Batch 72 — calendar export availability and cancellation

- Calendar export now checks the existing endpoint before opening it, with actionable access/timing, missing-route, rate-limit, server and connection errors. Checks time out and are cancelled on sheet close or access changes; timing controls stay fixed while checking.
- Typecheck/all-platform export and 11 trip/export cases pass at 320px and 768px. Coverage includes late results after close, timeout, failed native-link opening, duplicate activation, preserved timing and successful retry. All network submissions/exports in these browser checks are mocked.
- User requested wrapping up this feature, pausing and pushing. Work is on `codex/mobile-polish-20260908`; `main` has an automatic website deployment workflow, so the review branch preserves the prior deployment boundary.

## Final pause checkpoint

- Completed the calendar feature and stopped starting new improvements at the user's request.
- `npm test` passes across the repository, including typechecks, shared-behavior/scoring checks and all workspace tests. The final production-export browser suite passes 165/165 checks at 390px; the final trip/export feature also passes all 11 targeted cases at 320px and 768px. All-platform Expo exports pass.
- Main website (4323) and mobile reference preview (4391) both respond successfully and remain running. The mobile preview uses recorded responses, not current conditions.
- Native device QA remains unverified because automatic approval review blocked the local Expo development server. The added native date/time picker requires rebuilding the app; offline trip packets remain deferred under the implementation plan.
- Usage at the final checkpoint: 43% weekly remaining, no shorter Codex window reported, paid-credit balance unchanged at 2009.5977750000. No reset redeemed or deployment started.

## Batch 73 — resume: cancel exports before a slow close

- Resumed at the user's request with 42% weekly remaining and unchanged paid credits. The prior checkpoint is committed/pushed as `d7965a57` on the review branch.
- Reproduced both export checks remaining active while Close waited for slow draft storage. Close now invalidates pending share results and aborts GPX/calendar checks immediately, while still waiting to save the draft before dismissal.
- Typecheck/all-platform export and regressions at 320px and 768px pass. Slow storage failure keeps the note and sheet available, a late export response opens nothing, and a deliberate export/save retry succeeds.

## Batch 74 — trip validation beside the field

- Time and group-size validation now appears beside the affected field and clears as the form is corrected. Manual fields expose invalid state. Reopening the sheet clears prior operational feedback and share fallback, retaining the saved draft.
- Typecheck/all-platform export and four focused trip/report-date/slow-close cases pass at 320px and 768px. Reviewed the narrow invalid-timing layout; the report date picker remains unchanged.

## Batch 75 — consistent postal state search

- Replaced Today's ten-state lookup with a shared mobile alias helper covering all states and DC. Today, Saved, Explore text search and the state picker accept postal aliases while retaining full source labels. Unknown area names are preserved.
- Typecheck, 148 unit tests and all-platform export pass. Five browser cases pass at 320px and 390px, covering an “NJ” search across the four entry points plus existing grouped/clear/filter search behavior.

- Full production-export checkpoint after batch 75: 168/168 browser checks pass at 390px.

## Batch 76 — request context and visible limits

- Request a Route from an empty Today search carries the query into the editable name field. Direct links hydrate safely, and the prefill does not return after confirmed submission or replace edited values.
- Form inputs now match the server's existing limits and show counts near the limit, avoiding silent server truncation. No requests are sent just by opening the form.
- Typecheck/all-platform export and three form/prefill/recovery cases pass at 320px and 768px, including long pasted notes, direct links and exact submitted content.

## Batch 77 — protect route requests on Back

- Edited route requests now offer Keep editing/Discard changes before leaving. Untouched forms leave normally. A pending submission explains that it is still sending; a failed request retains the form, while confirmed success completes the waiting Back action.
- Typecheck/all-platform export and five form/navigation cases pass at 320px and 768px. Reviewed the narrow confirmation layout. Native Back/gestures remain device-QA work; these checks cover the exported app's navigation.

## Batch 78 — protect photo contributions on Back

- The shared exit guard also protects photo attachments, contact edits, captions and consent choices. Stored email autofill is not treated as an edit; confirmed submission resets the baseline. The pending action offers Stay on this form while sending.
- Typecheck/all-platform export and six navigation/photo/local-storage recovery checks pass at 320px and 768px. Photo-only drafts survive Keep editing, explicit discard leaves, failed uploads retain attachments, and successful uploads allow normal Back navigation.

- Full production-export checkpoint after batch 78: 173/173 browser checks pass at 390px.

## Batch 79 — contribution text limits

- Photo captions, names, email, route reports and extra notes now match the existing contribution API limits. A shared near-limit counter also serves route requests, and clears when shortened or successfully submitted.
- Typecheck/all-platform export and seven contribution/request cases pass at 320px and 768px. Verified exact long report/note payloads and reviewed the narrow counter layout; no server behavior changed.

## Batch 80 — route report validation in context

- Report validation identifies the exact missing choice or entry, shows feedback beside it, and scrolls missing choice groups into view. Correcting a value removes its message without leaving obsolete validation text in the submission status.
- Typecheck, 151 unit tests, all-platform export and four report/date/limit browser cases pass at 320px and 768px. Reviewed narrow choice feedback; text-only and photo-only report requirements are preserved.

## Batch 81 — discover and protect closed report drafts

- The Reports section offers Continue for an unsent report and View while sending. Leaving the route protects the draft with Keep report/Discard choices, including after the report sheet has closed. Confirmed success resets the contact baseline while retaining contact convenience for another report.
- Typecheck/all-platform export and seven form/navigation checks pass at 320px and 768px. Verified stored-email startup, close/resume, explicit discard and normal Back after successful submission; reviewed the narrow confirmation.

## Batch 82 — uncertain submission confirmation

- Route requests, photo contributions and reports explain timeout/unreadable success responses without showing API timing details or asserting that the server definitely rejected the submission. Entries remain available; retry is deliberate. Actionable server errors keep their existing messages.
- Typecheck, 153 unit tests, all-platform export and six form/recovery cases pass at 320px and 768px, including a real client timeout deadline, unreadable response, retained fields, no automatic resend, and successful retry.

## Batch 83 — partial photo-processing recovery

- Reproduced one encoding failure dropping an entire selection in both contribution flows. Shared sequential batch processing now skips only failed/unsupported photos and retains the others, with the existing partial-add notice.
- Typecheck/all-platform export and five photo/report cases pass at 320px and 768px. Verified failed first encode, preserved second photo, retry, four-photo cap and freeing a slot after removal. No upload/API behavior changed.

## Batch 84 — valid optional report dates

- Manual report dates reject impossible dates and ambiguous formats, focus the date field and offer the existing picker/clear controls. Blank dates remain optional and valid leap days are accepted. The report submit action also exposes native busy state during submission/photo preparation.
- Typecheck, 154 unit tests, all-platform export and four date/report/photo cases pass at 320px and 768px, including correction from February 30 to a valid leap day and clearing afterward.

- Full production-export checkpoint after batch 84: 180/180 browser checks pass at 390px. Batches 73–84 saved as a local review-branch checkpoint; no deployment or paid credits used.

## Batch 85 — compact supported-state chooser

- Measured More's 22-state chip group at 305px high with 32px targets on a 320px screen. Replaced it with a compact selected-state control and a searchable chooser with 56px rows, counts and selection feedback. Postal codes match exactly, including a clear unsupported-state result.
- Typecheck/all-platform export and three directory checks pass at 320px and 768px. Verified keyboard selection/focus return, close without changing selection, search/clear, no extra feed requests and reachable choices/Close at 320px height. Reviewed before/after and short-sheet captures.

## Batch 86 — recorded alerts independent of bookmarks

- Reproduced alerts disappearing from Saved → Alerts without a bookmark or when route details were unavailable. The tab now includes recorded alert routes alongside bookmarks, retains readable threshold/delivery records for missing routes, and offers route-opening recovery. Its empty state explains alert setup; trip drafts and bookmark-only summaries stay on the routes tab.
- Typecheck/all-platform export and focused alert/navigation/draft checks pass at 320px and 768px. Verified partial/missing feeds, no bookmarks, unchanged alert storage, no subscription writes and existing saved-alert controls. Reviewed narrow layout.

## Pause requested after batch 86

- Stopped new work at the user's request. Since last push `d7965a57`, batches 73–84 are saved locally in `5cdfc60a`; batches 85–86 remain uncommitted. No new push or deployment.
- Latest full checkpoint: 180/180 exported-app browser checks through batch 84; batches 85–86 have focused checks at 320px and 768px. Latest mobile unit checkpoint: 154 passing. All-platform export includes batch 86.
- 33% weekly usage remains; no shorter Codex window reported. Paid-credit balance unchanged at 2009.5977750000. Main site and mobile preview remain running. Native device QA remains blocked as previously documented.

## Batch 87 — resumed: readable connection checks

- Resumed at the user's request with 33% weekly remaining and unchanged paid credits. More's connection check now explains server, unreadable-response, timeout and network failures in user-facing terms while retaining diagnostic details in telemetry. Success reports the actual returned route count.
- Added an immediate in-flight guard and unmount cancellation to avoid duplicate checks and stale updates. Typecheck/all-platform export and six connection/chooser checks pass at 320px and 768px, including retry after each failure type.

## Batch 88 — compact personal-note previews

- Long/multiline saved notes now show a bounded excerpt with Show full note/Show less controls. Short notes stay fully visible. Full text remains searchable and editable; expanding/collapsing does not write storage.
- Typecheck/all-platform export and three note/search/recovery cases pass at 320px and 768px. Verified hidden-tail search, full editor contents, unchanged storage and existing failed-save/cancel behavior; reviewed the narrow preview.

## Batch 89 — river-card scroll recovery

- River-hub View card scrolling follows live reduced-motion preferences. Pending measurement retries are cancelled when routes, motion preferences or the screen change, and superseded requests cannot scroll a different selection.
- Typecheck/all-platform export and six hub navigation/recovery checks pass at 320px and 768px. Browser instrumentation verifies actual scroll behavior through preference changes; native scrolling still needs device QA.


- Full production-export checkpoint after batch 89: 189/189 browser checks pass at 390px.

## Batch 90 — calmer section and form navigation

- Route-section jumps and photo-field scrolling respect reduced motion. Rapid focus changes cancel the prior photo-field scroll; unmount and preference changes also clear pending timers.
- Typecheck/all-platform export and seven form/section checks pass at 320px and 768px, including live motion changes, rapid focus, field validation and existing submission recovery.

## Batch 91 — easier Explore touch controls

- Filter choices and search clearing now have 44px targets. Clear returns focus to the search input; search text uses 16px sizing and can shrink within narrow rows. Fixed singular route counts found during visual review.
- Typecheck/all-platform export and five focused filter/search/keyboard checks pass at 320px and 768px; final wording checked at 320px. Reviewed map search and filter-sheet captures at 320px.

## Batch 92 — durable Weekend range choices

- Weekend range selections survive late hydration and serialize device writes. Opening the screen no longer rewrites the stored preference. Failed saves keep the applied range and expose a local Retry saving range action.
- Typecheck/all-platform export and six range/category checks pass at 320px and 768px. Verified delayed initial reads, overlapping writes, failed-save preservation and retry of the latest choice; reviewed narrow recovery layout.

- Full checkpoint after batch 92: 193/193 exported-app browser checks and 154 mobile unit tests pass. Saving batches 85–92 locally on the review branch; no push or deployment.

## Batch 93 — preserve active Explore preferences

- Late preference reads no longer replace active search, view changes or an open filter draft. Preference writes serialize, and unreadable stored settings remain untouched until an explicit choice. Hydration ignores results after unmount.
- Typecheck/all-platform export and seven search/view/recovery checks pass at 320px and 768px, covering delayed reads/writes and existing saved-filter restoration.

## Batch 94 — choose a Weekend planning city in place

- Weekend now reuses the city/ZIP chooser, including after GPS denial, with Change planning city and existing Clear controls. Location names wrap instead of truncating.
- Typecheck/all-platform export and four location/range checks pass at 320px and 768px: denied GPS recovery, city selection, cancel preserving the previous city, reload and range persistence.
- User reported shared app-link failure, removed photo fallbacks and returning map-bubble clipping. Prioritizing these regressions over further autonomous polish.

## Batch 95 — user-reported mobile regressions

- Restored scenic placeholder photos in route, Saved and Weekend cards, labeled Illustrative photo. Failed assigned photos try the scenic fallback before the offline/unavailable panel. Six photo scenarios pass at 320px and 768px; reviewed restored imagery and action spacing.
- Shared Open in app text now uses the existing HTTPS route URL with openApp=1. The web route offers an explicit custom-scheme Open PaddleToday link, store links and Continue on the website; access choices survive both paths. No automatic app launch or new URL route is required. Main-site deployment is needed for the handoff panel; older deployed pages still open as a valid web fallback.
- Found an untracked local modification in installed react-native-maps 1.20.1 that expanded Android marker snapshot bounds. Added a reproducible postinstall patch, EAS archive inclusion and release checks. Compared against the original offline npm tarball; verified pristine and legacy inputs converge, repeat application is unchanged, and unexpected upstream source is rejected. No library upgrade.
- Root typecheck, all-platform Expo export, 2,429-page Astro build and two desktop/mobile web-handoff checks pass. Native clipping and actual OS app-link opening remain unverified: automatic approval review previously blocked the Expo development server. The marker fix requires a new native build; no deployment/build service was triggered.


- Full production-export checkpoint after batch 95: 200/200 mobile browser checks pass. Focused sharing/photo checks: 9/9 at both widths. Release readiness: 59/59. User clarification about platform and clipping shape remains pending.

## Batch 96 — escape an empty Today sort

- Reproduced Nearest removing all sort controls after GPS denial. The carousel now retains its sort controls when empty, with guidance to choose another sort or city. Browser pending state preserves focus while ignoring repeat GPS actions.
- Typecheck/all-platform export and four Today/search checks pass at 320px and 768px. Additional pending-permission check at 320px verifies one request and retained focus after denial, then recovery to Recommended and Evidence first.

## Batch 97 — current coverage and alert copy

- Removed outdated Midwest-only coverage wording. Notification settings now describe route alerts without requiring bookmarks. Today labels its confidence-based ordering as evidence strength instead of implying route reliability.
- Typecheck/all-platform export and six alert/nearby/Today navigation checks pass at 320px and 768px.

## Batch 98 — durable Today sort preferences

- Today keeps a newly chosen sort when an earlier preference read finishes, serializes device saves, and offers Retry saving sort after a failure. Opening Today no longer overwrites an unreadable stored choice with defaults.
- Typecheck/all-platform export and three sort/recovery checks pass at 320px and 768px, including overlapping saves, late reads, current-choice retry and GPS-denial escape.

## Batch 99 — visible Explore save recovery

- Explore offers a compact local-save retry in both Map and List. Applied filters remain active, writes stay ordered, and simply opening the screen no longer rewrites preferences. Stale failures cannot replace the latest save result.
- Typecheck/all-platform export and focused preference/short-layout checks pass at 320px and 768px, including save failure, retry, reload and current Map/List choice. Reviewed the short phone layout.

- Full checkpoint after batch 99: 205/205 production-export browser checks and 154 mobile unit tests pass. Account usage is 21% remaining; paid credit balance is unchanged. Changes remain local and native regression verification still requires a rebuilt app.

## September 9 — simpler call controls and complete route directory

- Removed Today's No call count tile. Explore now offers Any call, Paddle, Watch closely, and Skip; legacy links remain supported and Any call keeps unavailable routes discoverable.
- More now reads a public metadata-only catalog endpoint instead of the conditions snapshot. The current published catalog includes 2,065 routes across 31 states, including New York; the production conditions feed contained only 22 states. Grouping within each state also preserves rivers sharing IDs across state boundaries.
- Validation: root/mobile typechecks, catalog endpoint regression test, 14 API-client tests, four focused browser checks at 320px and five at 768px pass. Reviewed narrow state chooser screenshot. No native device verification or deployment performed.
- Release dependency: deploy the API catalog endpoint before distributing the updated mobile build. Changes are on codex/mobile-directory-call-filters; unrelated operations reports are untouched.
