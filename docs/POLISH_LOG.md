# App polish log

## 2026-09-06

Scope: small, verified local improvements; no infrastructure, deployment, paid
services, or publishing changes. One agent. Check account usage before and after
each batch; stop new improvements at 20% remaining and end by 15%, preserving a
buffer above the user's 10% reserve. Never redeem resets or switch billing.

### Completed: route-request reliability and accessibility

- Browser storage failures no longer block requests or misreport a received
  request as failed. An in-memory cooldown still works when storage is blocked.
- Concurrent submissions are ignored; the form exposes its busy state.
- Field errors are visible, linked to their inputs, and use valid ARIA values.
  Corrections clear field errors; submission focuses the first invalid field.
- Prefilled update details open automatically. Failed requests retain the draft
  and prepare the email alternative; successful requests clear that alternative.
- Validation: repository `npm run typecheck` passed. Ten Playwright cases passed
  across desktop and iPhone Chromium, covering field errors, blocked storage reads
  and writes, failure recovery, and duplicate submissions. Mobile screenshot
  inspected. API writes and analytics were intercepted in the browser tests.

### Next candidates

- Continue inspecting primary user flows for concrete usability or reliability
  problems after verifying the current batch.

### Completed: photo and condition-report submission recovery

- Shared a storage-tolerant cooldown across requests, photo uploads, and condition
  reports. It starts after receipt, works without storage, observes other tabs,
  and ignores corrupt or future timestamps.
- Photo and report forms reject duplicate pending submissions, expose busy state,
  and verify that the server actually stored the submission before clearing it.
- Fixed CSS overriding the hidden state of the selected-photo panel after upload.
- Validation: seven cooldown unit cases and eight contribution browser cases passed
  on desktop and iPhone Chromium. Request-form cases also passed after adopting
  the shared helper. Browser submissions were mocked; nothing was uploaded.

### Completed: recoverable site search and modal keyboard behavior

- Failed or malformed search downloads show an explicit error with retry and a
  browse-by-state alternative. A failed download no longer becomes a cached empty
  index. Slow requests time out after ten seconds. The typed query is preserved.
- Search announces its status, makes the underlying page inert while open,
  maintains trigger expansion state, and restores focus on Escape. Closing while
  loading cancels delayed focus. The slash shortcut respects editable content and
  modifier keys.
- Validation: eight browser cases passed on desktop and iPhone Chromium, covering
  retry, malformed responses, keyboard containment/restoration, and close during
  loading. Mobile error-state screenshot inspected.

### Completed: saved-route recovery on web and mobile

- Web: render cached calls immediately when available; add refresh/retry, a pending
  button state, bounded request time, and honest initial/failure status. Notes and
  the saved list remain usable when calls cannot load. Editing notes preserves the
  failed-refresh notice.
- Mobile: add pull-to-refresh and retry on initial errors, distinguish loading from
  missing calls, and allow opening/removing saved routes absent from the summary.
  The retry control reports busy state and has a 44-point minimum height.
- Validation: six web browser cases passed on desktop and iPhone Chromium. Expo web
  smoke verified initial-error retry and removal of an unavailable saved route;
  screenshot inspected. Mobile TypeScript check passed. Native iOS/Android gestures
  were not tested on a physical device.

### Completed: keyboard entry and narrow-layout containment

- Added a first-focusable Skip to content link to the shared layout.
- Contained the About scoring table in a named keyboard-scrollable region, allowing
  grid contents to shrink without widening the mobile viewport. Search also uses
  a constrained grid and scrolls on short screens.
- Validation: keyboard activation and page-width checks passed at 320, 390, and
  760 pixels. One development-server navigation interruption cleared on rerun.

### Completed: dependency initialization

- Moved hazard labels and their type to a leaf module, preserving package exports
  while removing the runtime cycle between the API contract barrel and saved-route
  changes flagged by Metro.
- The preceding full workspace test run passed 997 tests across 131 files.
- Dependency graph check passed with no runtime cycles (existing unresolved
  workspace-alias warnings remain); all 30 API-contract tests passed after the
  extraction. Production build passed for 2,428 pages.

### Completed: optional analytics and mobile request recovery

- Analytics failures, including rejected promises, cannot interrupt user actions
  or turn a successful submission into an apparent failure. Four desktop/mobile
  browser cases cover synchronous and asynchronous tracker failures.
- Mobile route requests now accept two-letter state abbreviations, focus missing
  fields, prevent duplicate submission and editing while sending, and retain the
  draft when the server did not store it. Status updates are announced.
- Expo web smoke passed validation focus, `MN` submission, draft preservation, and
  successful retry. Screenshot inspected. Mobile typecheck passed.
- Existing regression checks: 12 shared mobile-header cases passed; 37 desktop map
  interaction/performance cases passed. The real MapLibre renderer test initially
  could not load its CDN script in the sandbox and passed with approved network
  access. No app map changes were needed.

### Completed: bounded, ordered location searches

- Location searches cancel superseded requests and ignore outdated successes or
  failures. Clearing or directly setting a location invalidates any pending lookup.
- Geocoding query variants share a ten-second deadline; reverse lookup is bounded
  too. Invalid coordinates never reach distance calculations.
- Validation: 18 location unit cases and three existing Home/Explore browser
  location cases passed.

### Completed: API response-body timeout and test coverage

- The API client now retains its deadline and caller cancellation through the
  complete body download, preventing a stalled JSON body from hanging the mobile
  loading state after headers arrive.
- Added the existing API-client test suite to `test:workspaces`, so it is now run
  by `npm test` and `npm run verify` instead of being silently omitted.
- Validation: all eight API-client tests and its TypeScript check passed. New
  cases cover a stalled body, caller cancellation, and timer cleanup.

### Completed: explicit state matching and alert unsubscribe recovery

- Location searches that name a state cannot silently substitute a town in
  another state. Other query variants are tried before returning no match.
- All 21 location unit tests pass, including wrong-state result rejection.
- Unsubscribe now hides its completed button correctly, moves focus to the return
  link, exposes a busy state, and allows retry after a 15-second deadline.
- Unexpected API responses cannot falsely confirm that an alert is off.
- Ten desktop/mobile browser checks passed using mocked unsubscribe requests;
  no actual subscriptions were changed.

### Completed: mobile location persistence and compact empty header

- A resolved location stays usable when optional device storage rejects a save;
  clearing location also tolerates unavailable storage.
- Expo web check passed a mocked successful geocode with storage writes blocked.
  The location dialog closes and the chosen city appears in the nearby summary.
- The Today header becomes compact when there is no recommended route, bringing
  empty-state guidance and actions into view. Its background retains readable
  contrast while a photo is unavailable. Before/after screenshots inspected.
- Mobile TypeScript validation passed after both changes.

### Validation checkpoint and continuation

- Full workspace run: 1,012 tests passed across 132 files.
- Build, including typechecks and data audits: passed; 2,428 pages generated.
- Combined browser regression run: 50 desktop/iPhone cases passed.
- Later mobile-only persistence/header changes passed their smoke and typecheck.
- No publishing, deployment, pushes, billing changes, or real form submissions.
- Active thread follow-up: `paddletoday-app-polish-with-usage-reserve`, every
  15 minutes. It pauses at the usage guard, if monitoring fails, if useful work
  runs out, or at the original weekly reset (Unix 1789354065). This is polling,
  not an account-enforced spending cap.
- Next candidates: mobile manual location cancellation and bounded lookups;
  keyboard behavior in remaining dialogs; review the accumulated diff before
  expanding scope. Existing Astro server on 4323 belongs to the user session.

### Completed: mobile location request cancellation

- Device and manual lookups share a 30-second request lifetime. Closing manual
  search, starting another request, clearing location, or unmounting invalidates
  pending results. Late native readings cannot overwrite newer choices.
- Initial storage hydration cannot replace a location chosen while loading.
- Manual location input is read-only during lookup and exposes a busy state.
- Four lifetime unit cases passed, including stalled and late native operations;
  all 30 mobile unit tests and mobile TypeScript check passed.
- Expo web checks passed closing/reopening with an old city response pending,
  choosing a newer city, and successful lookup with storage unavailable.

### Completed: alert signup, mobile submission confirmation, feedback access

- Web alert signup requires an actual saved alert record before confirming,
  ignores duplicate pending submissions, locks the email while sending, and
  associates validation with the email input. Six desktop/mobile cases pass.
- Mobile mutation hooks consistently reject responses that did not store a
  submission, including feedback and community reports. Alert confirmation
  requires a server alert record. Four additional unit cases pass.
- Optional alert-preference storage cannot block reports or misreport a
  successfully created alert as failed.
- Mobile feedback fields have accessible names, focus invalid entries, announce
  progress, and remain read-only while sending. Expo web smoke verified draft
  preservation after an unsaved response and successful retry.
- Mobile request smoke passed after sharing response validation; mobile types
  and all 34 mobile unit tests passed.
- Search makes body-level Undo controls inactive too, restoring them on close.
  Ten search cases pass, including restoring a saved route after closing search.

### Completed: mobile navigation label clipping

- Tab labels were squeezed to nine pixels high. The bar now allocates a full
  text line and grows with device font scale; labels cannot shrink vertically.
- Shortened the tab label to Saved while retaining the Saved routes screen title.
- Expo web checked all labels at 320, 390, and 760 pixels; screenshot inspected.
  Mobile TypeScript check passed. Native font scaling still needs device review.
- Latest full checkpoint before this tab-only change: 1,020 workspace tests and
  the 2,428-page build passed.

### Completed: web GPS ordering and early homepage interaction

- GPS and typed-location lookups invalidate each other on Home and Explore.
  Late readings, late reverse-geocoding results, and late permission results do
  not overwrite a newer choice. GPS timeout is not reported as permission denied.
- Four geolocation unit regressions pass; 18 combined controller cases pass.
- The initial homepage module now retains an early GPS click until the board
  initializes. Repeated early clicks run once; the latest location action wins.
- Seven Home/Explore browser cases passed across desktop and iPhone; the mobile
  Explore workspace variant was explicitly skipped because its controls differ.
- Mobile reverse lookup of a place name has a four-second fallback so an optional
  label cannot consume the entire location deadline.

### Visual baseline review

- Existing About/request screenshot checks failed. Inspected actual and expected
  images: About baselines predate current score wording and gauge-methodology
  content; dev toolbar/promo overlays also differ. Baselines were not replaced.
- The comparison exposed a skip-link compositor issue in long mobile screenshots.
  Replaced offscreen translation with clipped hiding. Verified the screenshot and
  passing desktop/mobile keyboard skip behavior afterward.
- Mobile feedback now ignores late UI updates after closing or returning to its
  choices, while still recording a submission confirmed by the server.

### Completed: notice focus and Weekend location progress

- Undo notices keep keyboard focus when their controls are replaced, and dismiss
  returns focus to the restored route control (or main content if removed).
- Six Saved-route browser cases passed across desktop and iPhone, including
  storage failure, exact Undo restoration, and personal notes.
- Weekend filters no longer reset a pending GPS lookup or enable duplicate
  requests. The busy state persists through rerenders and clears on completion.
- Reproduced the Weekend issue before fixing it; four desktop/mobile Weekend
  recovery and pending-location cases pass afterward.
- Mobile feedback close/reopen smoke passed: a late confirmation cannot replace
  a fresh form. All submissions in these checks were mocked.

### Completed: mobile support and onboarding recovery

- Support links and notification settings use guarded external actions with a
  useful fallback when the device cannot open the destination; four unit cases pass.
- Optional first-route analytics storage cannot block completion of the welcome
  guide. Obsolete preference cleanup and analytics reads tolerate storage errors.
  Replaying the guide remains available if clearing its old marker fails.
- Five onboarding unit cases pass. Browser smoke checks confirm optional storage
  failure still enters the app, and actual progress-save failure retains retry.
- Notification settings explain denied or failed GPS lookup and expose the busy
  button state to assistive technology. Reproduced the missing denial message and
  verified its recovery guidance in the browser afterward.
- All 43 mobile unit tests and the mobile TypeScript check pass. The broader web
  map interaction suite passed 59 cases, with 19 intentional variant skips.

- Nearby-alert controls remain busy through permission and persistence work,
  reject duplicate taps, and expose 44px touch targets. Switches now announce their
  checked state on web as well as native. A mocked browser check verifies failed
  updates preserve the selection, controls unlock, and retry changes the setting.

Latest combined checkpoint: 1,033 workspace tests pass, mobile typechecking
passes, and the production build generates all 2,428 pages successfully.

### Completed: mobile web selection controls

- Reproduced consent checkboxes changing visually without announcing their state,
  then fixed contribution and route-report consent state, nearby-alert switches,
  and Weekend range choices with explicit checked semantics.
- Added Space activation for checkbox/switch roles, which React Native Web's
  Pressable does not provide. Browser checks verify both contribution consent
  choices and a nearby-alert update by keyboard; pending alerts ignore activation.
- Weekend range is a labelled radio group with one tab stop and wrapping arrow
  navigation. Browser checks verify focus, selection, Space, and arrow wrapping.
- Reproduced unhandled errors from unavailable Weekend preference storage; range
  changes now remain usable without rejected background writes. Visual inspection
  confirmed the existing inset track calculation, which remains unchanged.
- Mobile TypeScript checking passes after these changes.

### Completed: photo contribution validation and reusable mobile browser tests

- Photo picking and submission have guards across their full async lifetime.
  Pending submissions lock fields, photo changes, and consent controls; invalid
  name/email fields receive focus and status updates are announced.
- The browser flow uses a one-pixel image with mocked API responses. It verifies
  validation focus, pending locks, retained image/text after an unsaved response,
  and clearing only after confirmed storage on retry.
- Added `npm run test:mobile:web`, an Expo browser test config, two repository
  regression tests, and usage documentation under `tests/mobile-web`.
- The reusable test exposed web auto-scroll dismissing the newly focused input.
  Kept native keyboard dismissal behavior and disabled that dismissal on web.
  Both repository browser cases and mobile typechecking pass afterward.

### Completed: route-report pending state and confirmation

- Route reports guard submission and photo picking across their full lifetimes.
  Sending locks draft fields, choices, attachments, and consent. Web automatic
  scrolling no longer dismisses an input while the user is editing it.
- Report choices and actions have explicit labels and state semantics. Success
  remains visible in the sheet instead of disappearing when it auto-closes.
- Added a repository browser regression with an isolated route snapshot. It
  verifies retained drafts after an unsaved response, pending close/reopen,
  disabled controls, retry, and visible confirmed success.
- All three mobile browser tests and the mobile TypeScript check pass.

- Report validation now returns the invalid field to its sheet, which focuses the
  name, email, or report input without duplicating validation rules. The repository
  browser test covers all three paths.
- Verified `test:mobile:web` from a stopped Expo server: it starts its own server,
  passes all three tests, and shuts the server down. The cold run took 51 seconds.
- Latest workspace suite passes 1,033 tests; the dependency graph has no circular
  dependencies. Mobile typechecking passes.

### Completed: durable recovery tests and diagnostic isolation

- The repository mobile browser suite now has seven cases, including onboarding
  storage failure/retry, alert update failure/retry, and Weekend keyboard/storage
  recovery. All seven pass with mocked requests and isolated browser state.
- Phone registration errors give update or retry guidance instead of SDK setup
  details; technical failures remain available to diagnostics. Three unit cases
  cover missing configuration, provider errors, and permission denial guidance.
- Optional analytics, crash reporting, and feedback-usage failures are contained
  rather than producing unhandled rejections. Three native-service mock tests
  exercise those failure paths.
- All 49 mobile unit tests, mobile typechecking, and the dependency graph pass.

### Completed: web sharing recovery and mobile menu layout

- Blocked float-plan sharing offers the complete plan in a labelled, selected
  text field. Clipboard fallback preserves focus; confirmed copy returns focus
  to the action or closed Share menu. Condition-copy fallback is labelled too.
- Browser tests exposed the phone Share menu behind later content and partly
  outside the viewport. Corrected the hero stacking context and mobile alignment;
  inspected the resulting screenshot and added viewport-boundary assertions.
- The native-share action respects its hidden state when browser sharing is
  unavailable. A CSS display rule had been making the unsupported action visible.
- Eight desktop/iPhone sharing cases pass. The two blocked-condition cases also
  pass after adding explicit coverage for the hidden native-share action.
- Full repository typechecking passes.
- The production build generated all 2,428 pages successfully.

### Completed: consistent web hidden states

- Audited seven pages at desktop and phone widths and reproduced layout rules
  exposing elements that application logic had hidden: empty location controls,
  map controls, comparison links, loading placeholders, and score details.
- Added a shared visibility rule that preserves `hidden` over layout overrides,
  while leaving the browser's `until-found` behavior available.
- Added 14 desktop/phone page regression cases. The combined map and visibility
  run passes 73 checks with 19 intentional map-variant skips; another 66 form,
  search, saved-route, alert, and sharing checks pass.
- Repeated the cross-page audit after the fix: no hidden elements render visibly
  on the reviewed pages. Existing interaction checks verify controls can still
  become visible when their state changes.

### Completed: mobile Explore and disclosure accessibility

- Route safety and score disclosures expose expanded state on web. Explore view
  tabs expose selection, filter choices expose pressed state, and search has a
  stable accessible name after text is entered.
- Filter presets and sheet actions have button semantics, including Space-key
  activation. Native state semantics remain in place.
- Two new repository browser cases pass: disclosure expansion/collapse, and the
  Explore search, map/list selection, preset, clear, and cancel keyboard flow.
  Mobile typechecking passes.

### Completed: mobile alert and refresh pending states

- Phone-alert setup locks all thresholds throughout registration, permission,
  saving, and preference updates, with a synchronous duplicate-action guard.
  Controls expose busy/disabled states; native permission prompts still require
  device validation.
- Today, Weekend, and both Explore views now pass pending state to refresh
  notices. Initial-load retry controls also receive the query's pending state.
- Successfully loaded empty route lists remain available when a later refresh
  fails, preserving filters and showing the refresh notice instead of replacing
  the screen with an initial-load error.
- Three browser regression cases cover persisted empty responses, failed refresh,
  pending retry, and successful recovery, including switching Explore views
  during the request. All 12 mobile browser cases and all 1,039 workspace tests
  pass. Mobile typechecking and whitespace checks pass.

### Completed: mobile view preference recovery

- Today sorting and Explore view/filter preferences tolerate failed optional
  storage writes, keeping the current session usable without unhandled errors.
- Today's sort choices have button semantics, announce their selected state,
  and support Space-key activation.
- Two browser cases pass with preference writes deliberately failing: changing
  Today sorting and changing Explore view/search. Mobile typechecking passes.

### Completed: distinguish server updates from device storage failures

- Nearby alert settings show the confirmed server outcome even if remembering
  the updated preferences on the device fails. A separate persistent warning
  explains the local problem and offers a device-only retry.
- Retrying device storage preserves the received settings and management token
  in memory and does not repeat the server update. Background onboarding retains
  its existing rejection handling for failed persistence.
- Three alert browser cases pass, including both toggling a setting and turning
  alerts off with failed local storage, repeated local failure, and successful
  local retry. Assertions verify exactly one mocked server request. Mobile
  typechecking and whitespace checks pass.

### Completed: validate nearby-alert confirmations

- Creating or updating nearby alerts now requires explicit success and a complete
  subscription record, including the token needed to manage it later. Incomplete
  responses leave existing settings intact and explain that confirmation failed.
- Seven new unit cases cover valid responses and malformed confirmations. All 56
  mobile unit tests pass. Four alert browser cases pass, including an incomplete
  response followed by successful retry, with saved preferences checked directly.
- Mobile typechecking and whitespace checks pass.

### Completed: preserve trip drafts and clarify invalid timing

- Closing and reopening Prepare trip preserves entered times and group details
  for the current route. A different route starts a fresh draft.
- Invalid nonempty check-in times now produce a correction message instead of
  silently disappearing from the exported plan. Invalid launch, take-out,
  check-in, and group-size fields receive focus.
- Trip fields and action buttons have accessible names; status changes are
  announced. The browser regression covers draft reopening, an impossible date,
  reversed timing, invalid optional check-in, and noninteger group size without
  sending an export or share action. Mobile typechecking passes.

### Completed: GPX request lifetime and retry

- GPX availability checks prevent duplicate taps, expose pending state, and time
  out after 15 seconds. Closing the sheet or changing the route/access selection
  cancels the request; late responses cannot open the previous export.
- Failed checks restore the button and show a retryable error. External-opening
  failures also leave a visible message in the sheet.
- All three trip browser checks pass, including a real 15-second timeout and
  cancellation followed by late success and retry. The tests intercept exports
  and verify no stale external window opens. Mobile typechecking and whitespace
  checks pass.

### Completed: float-plan sharing fallback and cancellation

- A failed share sheet exposes the full plan in a focused, read-only copy field.
  Editing the draft clears the old copy. Successful retry removes the fallback.
- Pending sharing disables duplicate actions and locks the submitted fields.
  Cancellation preserves the draft without a failure warning, and late results
  from a closed sheet do not affect the reopened sheet.
- Four trip checks pass together, followed by two new pending-share checks for
  cancellation and closing/reopening. Sharing is mocked throughout. Mobile
  typechecking and whitespace checks pass.

### Completed: reliable connection diagnostics

- Connection checking requires an actual route list instead of reporting success
  for any JSON response. It counts the returned routes and explains timeouts.
- The check button exposes busy/disabled state, supports keyboard activation,
  and has a 44px target; result updates are announced.
- The expanded 23-case mobile browser suite passes together. Two additional
  connection cases pass for incomplete responses and a real 10-second timeout,
  followed by successful retry and a verified route count. Mobile typechecking
  and whitespace checks pass.

### Completed: accessible route and access selection

- Route section controls expose selected state on web. Put-in and take-out
  pickers have button labels with their current selection, expanded state,
  labelled options, and labelled close buttons.
- Three control-state browser cases pass. The new keyboard case selects a
  shorter route, checks downstream-only take-out options, verifies URL parameters,
  reopens the picker to confirm selected state, and verifies focus returns after
  closing. Mobile typechecking passes.

### Verified: Saved-route note durability

- Added a durable browser regression for the existing note recovery flow. A
  failed storage write preserves both the prior saved value and the edited
  draft; retry succeeds, Unicode and line breaks survive reload, and clearing
  then saving removes the note without removing the route.
- The check passes with mocked offline route requests and isolated browser
  storage. No application behavior change was needed for this flow.

### Completed: cancel outdated automatic prompts

- Automatic feedback eligibility now rechecks its screen context after async
  work. Navigation, backgrounding, unmounting, and manually opened feedback
  invalidate pending evaluations. Background timers cannot start new prompts.
- Native review availability checks also recheck context before requesting a
  review. Cancelled opportunities are not counted as review attempts.
- Eight new unit cases cover delayed eligibility, delayed bookkeeping, native
  availability, cancellation, and valid prompts. All 64 mobile unit tests pass;
  mobile typechecking and the dependency graph pass.
- A browser regression verifies an eligible prompt still opens, dismissal sets
  its snooze, and no submission occurs. Whitespace checks pass.

### Completed: feedback-sheet keyboard actions

- Feedback navigation and dismissal controls have button semantics. Submission
  has a stable accessible name and exposes pending state on web.
- The browser prompt regression now follows the choices, private draft, back,
  store chooser, draft return, and dismissal flow using Space-key activation.
  It confirms the draft remains intact and no submission occurs. Mobile
  typechecking and whitespace checks pass.

### Completed: store-review link recovery

- Failed store-review openings show an inline retry message. Review controls
  expose pending state and prevent duplicate openings.
- Consolidated link-opening recovery and guarded completion against a changed
  feedback view, so a late result cannot dismiss a newer private-feedback form.
- The feedback keyboard flow and failed-link retry pass together. A separate
  browser timing case switches views before the link-opening promise finishes
  and verifies the newer form stays open. Store openings are mocked throughout.
  Mobile typechecking and whitespace checks pass.

### Completed: website GPX export recovery

- Website GPX checks now prevent duplicate requests, expose busy/disabled state,
  and time out after 15 seconds. Checks capture the requested URL instead of
  reading a potentially changed selection when the response arrives.
- Selecting another segment or leaving the page cancels the old request. Late
  responses cannot start a stale or unchecked download; retry checks the newly
  selected segment.
- Four desktop/iPhone cases pass for segment changes and real timeouts, including
  duplicate clicks, late responses, and retry. Eight adjacent sharing cases pass.
  Full repository typechecking and whitespace checks pass.

### Completed: consistent website trip timing

- Float plans use the same segment-based launch and take-out times as calendar
  exports, replacing the unrelated fixed four-hour assumption. Sharing refreshes
  the calendar link and consumes that exact calculated timing.
- Ten desktop/iPhone sharing cases pass. The new cases compare both outputs for
  full and shortened routes and verify shortening the route reduces the planned
  duration. Full repository typechecking and whitespace checks pass.

### Completed: website sharing lifecycle

- Float-plan sharing exposes pending state and blocks duplicate actions. Changing
  the selected segment clears old manual copies and invalidates delayed share
  results. Cancelled native sharing restores the action with a clear status.
- Eighteen desktop/iPhone sharing and GPX cases pass, including delayed results,
  segment changes, cancellation, keyboard focus, and timeout recovery. Full
  repository typechecking and whitespace checks pass.

### Integrated verification checkpoint

- All 1,054 workspace tests and all 30 mobile browser scenarios pass together.
- Production build passes for 2,428 pages. Full repository typechecking and the
  18 website sharing/GPX cases passed immediately before this integrated run.
- Next identified item: serialize saved-route alert setup across permission and
  submission, and expose clear control labels and pending state.

### Completed: saved-route alert controls

- Saved-route alert setup now locks across permission, submission, and local
  preference recording. All threshold buttons disable while one setup runs.
- Buttons identify the route and threshold, expose current/pending state, and
  have 44-pixel minimum touch targets. Alert status updates are announced; the
  Saved/Alerts selectors have explicit accessible names and selected state.
- A browser regression passes for keyboard setup, unavailable-web recovery,
  preservation of the existing selection, and touch-target size. No alert API
  submissions occur in the test. Native permission dialogs need device testing;
  the browser test does not claim to exercise those dialogs. Mobile typechecking
  and whitespace checks pass.

### Completed: mobile tab keyboard navigation and names

- Saved route sections form a named tab group with one keyboard tab stop.
  Left/right arrows wrap between sections; Home/End move to the first/last
  section, keeping focus and selected state together.
- Bottom navigation has explicit destination names, preventing decorative icon
  glyphs from appearing in its accessible names on web.
- Browser checks pass for arrow wrapping, Home/End, focus, tab order, and all
  five navigation labels. The adjacent Weekend keyboard regression also passes.
  Mobile typechecking and whitespace checks pass.

### Completed: saved-list read failure recovery

- Failed device-storage reads no longer authorize writes from an empty saved
  list. A persistent retry action protects existing records until loading
  succeeds; retries are serialized and expose pending state.
- Saved does not claim there are no saved routes while the list is unavailable.
  Successful retry restores the original records without rewriting storage.
- Browser verification covers zero writes after a failed read/save attempt,
  repeated read failure, recovery from Saved, and removal/Undo preserving notes.
  The adjacent notes-storage regression passed as well. Mobile typechecking and
  whitespace checks pass.

### Completed: mobile route-summary sharing recovery

- Route sharing blocks duplicates and exposes pending state. Cancellation has a
  distinct status; unavailable sharing offers a selected, read-only summary to
  copy. Route/access changes invalidate delayed results and outdated copies.
- Two browser cases pass for pending locks, cancellation, full-summary fallback,
  focus, and successful retry. Success accepts the browser's void result as well
  as native share outcomes. Mobile typechecking and whitespace checks pass.

### Completed: community feed retry

- Route community failures expose a labelled retry action and no longer claim
  the feed has no reports. Cached community content remains available with its
  last-update notice when a refresh fails.
- Initial-load retry keeps the notice visible through the query's transition
  from error to pending, disables the action, and prevents duplicate requests.
- The browser regression passes for unavailable versus empty, pending state,
  duplicate prevention, and successful retry. Mobile typechecking and whitespace
  checks pass.

### Completed: cached route-detail refresh recovery

- Failed background refreshes on cached detail pages now show a last-update
  notice and a labelled retry action. Existing details and access planning stay
  available while retry is pending.
- Browser verification passes using a persisted route response aged before
  hydration, a failed background request, and a deferred successful retry. Access
  planning remains usable throughout. Mobile typechecking and whitespace checks
  pass.

### Integrated mobile checkpoint

- All 36 mobile browser scenarios pass together after the saved-storage,
  navigation, route-sharing, community, and cached-detail recovery changes.
- Full repository typechecking and its associated audits pass.
- Next identified item: give score-history failures an explicit retry action and
  distinguish them from a successfully loaded empty history.

### Completed: history retry and chart description

- Score-history failures have an explicit retry action with duplicate prevention
  and pending state. Empty-history messaging appears only after a successful
  response; cached history remains visible when refreshing fails.
- History charts expose a descriptive label pairing full dates and daily average
  scores for assistive technology.
- Two browser cases pass for recovery into empty history and a populated chart,
  including pending state and accessible description. Mobile typechecking and
  whitespace checks pass.

### Completed: shuttle direction opening recovery

- Map-opening failures show inline retry guidance. Direction buttons expose
  pending state, prevent overlapping openings, and have 44-pixel touch targets.
  Endpoint changes clear outdated feedback and invalidate pending UI results.
- A browser case passes for failed Google Maps opening, enabled retry/alternative,
  successful retry, and unchanged origin/destination coordinates. Openings are
  mocked; the test does not launch a map app. Mobile typechecking and whitespace
  checks pass.

### Completed: sharing selection regression and cleanup

- Removed the unused legacy route-sharing function, leaving the current guarded
  flow as the screen's sole route-summary sharing implementation.
- All three route-sharing browser cases pass. The added deferred-result case
  changes the put-in before the old share fails, verifies stale feedback stays
  hidden, and verifies the next copy includes Baldwin Lake and its segment URL.
  Mobile typechecking and whitespace checks pass.

### Completed: route photo download fallback

- Route headers and photo-bearing route cards now use the established placeholder
  design when an image download fails, with “Photo unavailable” rather than the
  misleading “No photo yet.” Route and contribution actions remain usable.
- Failed state is tied to the image URI so a different route image can load.
- Two browser cases pass with gallery requests aborted, covering route details,
  saved cards, contribution navigation, and fallback/button non-overlap in the
  short header. Mobile typechecking and whitespace checks pass.

### Completed: community photo fallback and accessible names

- Failed community thumbnails use the existing fallback design while preserving
  captions, credits, and the full-photo action. Accessible button names now use
  each photo's supplied description instead of one repeated generic label.
- A browser regression passes with the thumbnail aborted and full-photo opening
  mocked, verifying the fallback, metadata, keyboard action, and destination.
  Mobile typechecking and whitespace checks pass.

### Completed: Best nearby location navigation

- Today's Best nearby action now retains and awaits the location promise instead
  of opening Explore immediately through a void callback. It navigates only on
  success and shows retry/city guidance on failure.
- Leaving Today invalidates the pending navigation intent, so a late location
  result cannot pull the user away from another screen. Planning chips have
  explicit button labels and pending semantics.
- Three browser cases pass for deferred success, failure, and leaving the screen,
  including duplicate prevention. Location calls are mocked. Mobile typechecking
  and whitespace checks pass.

### Completed: Today search keyboard flow and image backing

- Today route cards and search shortcut expose explicit button roles/names. The
  search field, state browsing, results, and empty-result actions are labelled.
- Web scroll events no longer dismiss search focus as the modal opens; native
  drag-to-dismiss behavior remains. Recommendation image cards have a dark
  backing so their white text remains legible when an image does not load.
- A browser regression passes with gallery requests blocked, covering Space to
  open search, initial focus, unmatched-query actions, clearing, and opening a
  matching route by keyboard. Mobile typechecking and whitespace checks pass.

### Completed: manual city-search lifecycle

- Manual location search guards each modal opening against old results, blocks
  duplicate submissions immediately, and owns dismissal only after its current
  lookup succeeds. The input and submit action have stable accessible labels and
  pending state; failed queries remain editable for retry.
- A browser regression passes for closing/reopening a pending lookup, ignoring
  its delayed response, preserving a failed query, and successfully saving the
  replacement location. Geocoding is mocked. Mobile typechecking and whitespace
  checks pass.

### Completed: location coordinate validation

- Stored locations, geocoder candidates, native geocoder results, and device
  readings now share finite latitude/longitude range checks. Invalid values
  cannot become the planning location; valid zero coordinates remain accepted.
- All 79 mobile unit tests pass, including 15 coordinate cases. Four browser
  location flows pass with invalid persisted coordinates and an out-of-range
  geocoder response, then recover with valid data. Mobile typechecking and
  whitespace checks pass.

### Integrated checkpoint and diagnostic test stabilization

- All 1,069 workspace tests and full repository typechecking pass.
- The integrated browser run passed 47 cases and exposed one connection-check
  setup race: its held request could capture initial feed loading before the
  diagnostic was activated. The test now awaits initial feed loading first.
- Both diagnostic cases pass after that correction, including the real ten-second
  timeout and successful retry. No application code changed for this test fix.
- Next review target: river-hub refresh and filter controls, which have not yet
  received the same browser recovery coverage as route detail.

### Completed: river-hub refresh and empty response

- Cached river hubs show a failed-refresh notice and explicit retry while route
  filtering remains available. Retry preserves the selected filter.
- Empty group responses no longer crash the header image lookup and display
  “No routes available” instead of incorrectly blaming active filters.
- Two browser cases pass for empty rendering and persisted-cache failure/retry,
  including filtering during the pending request and clearing afterward. Mobile
  typechecking and whitespace checks pass.

### Completed: river-hub controls and planning navigation

- Sort options support arrow keys and announce their selected state. Filter and
  score-detail controls expose pressed/expanded state and route cards have
  explicit accessible names.
- Planning-detail buttons now open the route instead of toggling a score panel
  that planning routes do not render.
- All four river-hub browser cases and mobile typechecking pass. The subsequent
  full mobile browser run passes all 52 cases, including diagnostic recovery.

### Completed: weekend category membership and keyboard selection

- Watch routes remain visible when Paddle choices exist. Camping filtering now
  includes eligible top picks instead of excluding routes already featured in
  another section. The unfiltered board still avoids duplicate route cards.
- Filter counts include nearby Watch routes and expanded-drive day trips. All
  counts unique displayed routes, including Skip routes, rather than adding
  overlapping category counts.
- Both weekend filter layouts now support Space, arrows, Home/End, selected
  state, and a named tab group using the shared keyboard helper.
- Four browser cases pass: category membership with/without a stored location,
  a Watch-only board, and range/storage recovery. Mobile typechecking and
  whitespace checks pass. Test setup was corrected for JSON import attributes,
  required difficulty data, and distinguishing route cards from map markers.
- The preceding integrated run passed all 52 mobile browser cases. Three new
  category cases bring the suite to 55; those additions passed in the targeted
  run above.
- Next review targets: empty weekend-category guidance and weekend photo failure
  rendering, which currently lack the detail/saved-card fallback behavior.

Last observed weekly allowance: 57% remaining. Paid credits are unchanged.
Threshold has not been reached.

### Completed: weekend photo fallback and empty-category guidance

- Failed weekend-card image downloads display Photo unavailable, preserving the
  score, save control, and route navigation. All three photo-failure cases pass
  across detail, Saved, and Weekend; the Weekend case verifies keyboard route
  navigation after the failure.
- Empty weekend categories explain how to return to All or expand a selected
  range. Returning to All removes the message and restores route cards.
- Removed the empty Watch-list panel that could contradict nearby Watch routes
  already shown above it.
- Six category/refresh browser cases, mobile typechecking, and whitespace checks
  pass. The mobile browser suite now contains 56 cases; the last full integrated
  run predates these additions and passed 52.
- Weekly allowance remains 57%; paid credits unchanged.

### Completed: weekend location feedback and keyboard access

- Weekend location use/clear actions have explicit button names and a 44-pixel
  minimum touch height. Pending requests announce busy state; failed or denied
  attempts explain retry and the manual city option on Today.
- A mocked browser flow passes keyboard activation, duplicate prevention while
  pending, failure guidance, successful retry, range controls appearing, and
  clearing both the location and persisted value. Native permissions are still
  outside browser coverage.
- Mobile typechecking and whitespace checks pass. Mobile browser suite: 57 cases.

### Completed: supported-river recovery and state tabs

- Supported rivers now offers a direct list retry instead of directing users to
  a diagnostic that does not reload the list. Pending retry remains visible and
  blocks duplicates; cached data can retain its state tabs during recovery.
- Supported-state tabs have a named group, explicit selected state, and shared
  Space/arrow/Home/End navigation.
- Three browser cases pass: list recovery/state selection and both diagnostic
  failure/retry paths. Mobile typechecking and whitespace checks pass. Browser
  suite now contains 58 cases.

### Integrated checkpoint and alert preference read recovery

- Full mobile browser suite passed all 58 cases before this batch.
- Failed reads of saved alert preferences now show an explicit retry instead of
  treating an existing subscription as absent. The settings card withholds
  subscription controls until recovery; automatic permission/subscription work
  waits for a successful preference read.
- A browser regression recovers original enabled Today/Weekend preferences after
  repeated read failure, with no subscription writes. All seven alert/onboarding
  cases pass, along with mobile typechecking and whitespace checks.
- Browser suite now contains 59 cases. Native permission prompt behavior remains
  a device-verification item. Weekly allowance: 56%; paid credits unchanged.

### Completed: Explore planning-location focus and retry

- Focus nearest rivers centers/sorts using the existing planning location instead
  of starting GPS and replacing a manually selected city.
- Both map location actions disable and announce busy state during a request.
  Failed requests show a retry prompt; the floating action has a 44-pixel minimum
  touch height.
- Five browser cases pass, including saved-city preservation with zero GPS calls,
  duplicate prevention/pending recovery, and existing Explore/access controls.
  Mobile typechecking and whitespace checks pass. Browser suite: 61 cases.

### Completed: shortened Explore route directions

- Explore drawer directions use the selected segment's put-in when a short route
  is selected, rather than the full route's original launch. The accessible
  action name identifies that launch.
- A browser regression selects a three-mile segment of a thirteen-mile route and
  verifies the intercepted map URL targets its intermediate launch coordinates,
  not the original start. No external map opens. Mobile typechecking and
  whitespace checks pass. Browser suite: 62 cases.

### Completed: selected-plan drawer facts

- Expanded Explore drawers show selected-segment distance and paddle duration
  instead of full-route values. Time formatting is shared with route detail.
- Both expansion controls expose their expanded state.
- Seven drawer/trip-preparation browser cases pass, including the three-mile
  plan displaying About 1 hr to 1.5 hr and excluding the thirteen-mile/six-hour
  full-route facts. Mobile typechecking and whitespace checks pass.

### Repository verification checkpoint

- All 1,069 workspace tests and repository-wide typechecking pass after the
  accumulated mobile updates and shared time-format extraction.
- Handled the remaining fire-and-forget alert-onboarding pending-marker cleanup
  rejection through existing exception reporting. The existing subscription
  remains intact if optional marker cleanup fails. Mobile typechecking and
  whitespace checks pass after this small correction.

### Completed: website discovery copy and guide link names

- State/guide directories explain route browsing and access details instead of
  internal crawlability/rendering terminology. The live-conditions FAQ directs
  readers to update times, missing-data notices, and linked sources.
- Featured Open guide links have distinct accessible names that include the guide
  title while retaining their visible action text.
- Local Chromium checks verified rendered States/Guides content, both guide link
  names, and the expanded Minnesota freshness FAQ. Whitespace checks pass.
- Weekly allowance: 54%; paid credits unchanged.

### Completed: state directory zero-result map filtering

- Empty filter matches no longer fall back to every map route/score marker.
  Static markers, live markers, map lines, and selected-route state follow the
  filtered route set, including zero matches.
- Directory/map empty states explain resetting filters. Result counts announce
  changes, and filter form submission does not reload the page.
- Desktop and iPhone-size browser cases pass for zero matches, cleared map
  markers, status guidance, and keyboard reset restoring routes. Repository-wide
  typechecking and whitespace checks pass. Weekly allowance: 53%; credits unchanged.

### Completed: state route modified-click navigation

- State map-preview handlers preserve Ctrl/Cmd/Shift/Alt clicks, non-primary
  clicks, already-handled events, and normal links when no interactive map exists.
- Desktop browser regression verifies Ctrl-click opens the route in a separate
  tab while retaining the state page; the zero-result/reset check also passes.
  The test watches the browser context's new-tab event, since Ctrl-click creates
  a tab without a popup opener. Whitespace checks pass.

### Completed: state live-conditions retry

- Live conditions expose a direct retry after failed or empty responses. Pending
  requests disable duplicate actions; route-directory links remain usable.
- Empty data restores unscored fallback cards. Successful retry replaces them
  and returns focus to the status when the retry control disappears.
- Replaced internal hydration/API wording with plain update guidance.
- Five desktop/iPhone browser checks pass with one intentional desktop-only
  modified-click skip. Repository typechecking and whitespace checks pass.
- Weekly allowance: 52%; paid credits unchanged.

### Completed: state route-type filter values

- Flatwater / moving water now uses the route contract's recreational value;
  the previous flatwater value excluded recreational routes from that filter.
  Missing route-type fallbacks use the same value in directory and map data.
- Five desktop/iPhone browser cases pass with one intentional modified-click
  skip. The filter regression verifies Rice Creek appears under recreational
  routes and disappears under Whitewater, then checks zero-result/reset recovery.
  Whitespace checks pass.

### Production build and mobile integration checkpoint

- Production build passes and generates all 2,428 pages after website directory
  copy/filter/retry updates.
- All 62 mobile browser cases pass together, including alert-preference read
  recovery, preserved planning-city focus, selected-segment directions/facts,
  and the recent Weekend improvements.
- Whitespace checks pass. Weekly allowance: 51%; paid credits unchanged.

### Verified: route browsing when the state map fails

- Added desktop/iPhone regression blocking the map library and live API, then
  opening a directory route with Enter after the map-unavailable notice.
- All seven state-page browser cases pass with one intentional modified-click
  skip. Existing filter, retry, and new-tab behavior remains covered. Whitespace
  checks pass; no additional application change was needed for this verification.

### Completed: unit-aware paddling duration parsing

- Replaced three number-only parsers with one shared API-contract parser for
  hours, minutes, combined units, and ranges. Labels such as 2 hr 30 min to 4 hr
  no longer become a 2–30 hour range; 30–90 minutes remains a short paddle.
- Mobile segment estimates, route time filters, and trip-pack duration exports
  use the parser. Trip-pack declares its existing local API-contract dependency;
  no external dependency or infrastructure was added.
- Parser and filter coverage: 44 contract tests pass. All seven trip-pack tests
  pass, including mixed-unit/minute-based export durations. Workspace tests and
  repository typechecking passed before the final additional filter assertion.
- Seven mobile planning browser cases and four desktop/iPhone GPX recovery cases
  pass. Whitespace checks pass. Weekly allowance remains 50%; credits unchanged.

### Completed: duration-label data audit

- Audited 1,200 source time fields. Added parsing for bounded on-water/daylight
  hour ranges found in the route data; prose-only and open-ended estimates remain
  unconverted rather than acquiring an invented fixed duration.
- All 48 API-contract and seven trip-pack tests pass, including qualified ranges
  and an open-ended upper bound. Contract typechecking and whitespace checks pass.

### Verified: shared duration parser integration

- Reused compiled expressions across route filtering without changing parsing.
- All 1,087 workspace tests and repository typechecking pass after the final
  duration-label cases. Weekly allowance: 48%; paid credits unchanged.

### Completed: mobile heading navigation

- Shared section cards and screen/form titles expose native heading semantics.
  Today sections, Explore list, route details, planning panels, and modal titles
  now support heading navigation without changing layout or tab order.
- Browser inspection verifies Help section headings and the Weekend heading.
  All 62 mobile browser cases and mobile typechecking pass.

### Completed: partially loaded state-map recovery

- State maps require readiness within seven seconds. Failed initialization
  clears the map reference and removes its canvas/markers, preserving ordinary
  directory navigation and filters instead of intercepting links with a broken map.
- Nine desktop/iPhone state browser cases pass, with one intentional desktop-only
  modified-click skip. New timeout coverage checks canvas removal, filtering,
  and Enter navigation. Repository typechecking and whitespace checks pass.

### Completed: distinct state route link names

- Static/live route cards and map popups identify their river and reach in the
  accessible name of each View route link.
- Browser inspection verifies initial fallback links and hydrated live links.
  Weekly allowance remains 48%; paid credits unchanged.

### Production checkpoint after duration and accessibility updates

- Production build passes with all 2,428 pages. Shared duration parsing, mobile
  heading semantics, state-map timeout recovery, and route link names are included.
- Work remains local; the ongoing polishing goal and usage reserve guard remain active.

### Completed: website calendar duration units

- Website calendar and float-plan timing now use the shared duration parser.
  Minute ranges and mixed hour/minute labels use their actual upper duration,
  scaled for the selected segment, plus the existing one-hour planning buffer.
- Eighteen desktop/iPhone sharing browser checks pass, including 30–90 minutes
  producing 150 minutes total and 2 hr 30 min to 4 hr producing 300 minutes total.
  Repository typechecking and whitespace checks pass.

### Completed: river-card duration summaries and default calendar units

- River hub cards use the shared duration parser for compact labels. Mixed units,
  decimal hours, minute ranges, and open-ended estimates retain their meaning;
  truncation no longer cuts decimals or discards part of a time range.
- Two desktop/iPhone browser cases verify four representative labels.
- Server calendar defaults also use the shared parser instead of reading the
  last number as hours. Nine endpoint tests pass, including three duration-unit
  regressions against the generated calendar timestamps.
- Repository typechecking and whitespace checks pass. Weekly allowance: 47%;
  paid credits unchanged. The polishing goal remains active.

### Completed: default calendar timing for shortened routes

- Direct calendar exports scale the parsed full-route duration by the selected
  distance. The one-hour buffer remains fixed; explicit start/end dates remain
  authoritative. Distance-based fallback estimates already use selected mileage.
- All 12 endpoint tests pass, including full-route, half-route, and explicit-date
  schedules. Repository typechecking and whitespace checks pass.

### Completed: calendar notes match selected distance

- Calendar notes show the selected segment's estimated paddling minutes alongside
  its distance. Full-route exports retain their source label; unconvertible labels
  for shorter selections are explicitly identified as full-route estimates.
- All 1,094 workspace tests pass, including 13 trip endpoint tests covering notes,
  full/partial route timing, explicit dates, and unconvertible-label fallback.
  Repository typechecking and whitespace checks pass.
- Weekly allowance: 46%; paid credits unchanged. The polishing goal remains active.

### Completed: stale access selections in trip exports

- Explicit unknown put-in/take-out IDs return invalid_access_selection instead
  of silently substituting full-route endpoints. Omitted selections still default
  to the full route. The response explains how to choose a valid pair.
- Website and mobile GPX controls explain that the route needs refreshing and
  access points need reselection after an invalid selection response.
- Nineteen endpoint tests, four desktop/iPhone GPX browser cases, and six mobile
  planning cases pass. Repository typechecking and whitespace checks pass.
- Weekly allowance: 46%; paid credits unchanged. The polishing goal remains active.

### Completed: full-route planning without measured access mileage

- Mobile trip preparation uses the known route distance when the selected full
  route has no measured access-point mileage. Shorter unmeasured selections keep
  distance unknown, so the full distance is not applied to a partial route.
- Seven mobile planning browser cases pass, including restored 15.2-mile facts,
  300–420-minute source estimate, and the corresponding buffered default schedule.
  Mobile typechecking and whitespace checks pass.
- Production build passes for all 2,428 pages after the prior export changes.
  Weekly allowance: 45%; paid credits unchanged. The polishing goal remains active.

### Completed: calendar-open recovery in mobile preparation

- Calendar actions share the pending/disabled behavior of other exports. A request
  identity blocks duplicate activation and ignores completion for a closed or
  changed trip. Failed opening shows inline retry guidance while preserving dates.
- All eight mobile planning browser tests pass, including synchronous double
  activation, failed-open recovery, retained launch time, and valid retry URL dates.
  Mobile typechecking and whitespace checks pass. Opening was mocked; native
  calendar application behavior was not exercised.

### Completed: Save toggle semantics and touch targets

- Shared Save buttons expose pressed state on web and retain native selected
  state. Compact buttons are 44 by 44; regular buttons have a 44-pixel minimum
  height. Photo-contribution buttons also have a 44-pixel minimum height.
- Four saved/photo browser cases pass. The saved-storage regression additionally
  verifies pressed state across recovery/undo and the regular button's minimum
  height. Mobile typechecking and whitespace checks pass.
- Weekly allowance: 44%; paid credits unchanged. The polishing goal remains active.

### Completed: state route photo fallback

- Failed state route-card photos show Photo unavailable in the existing media
  area. The route link retains its accessible river/reach name and keyboard action.
  Already-failed images are handled when the page script initializes.
- Eleven desktop/iPhone state browser cases pass, with one intentional desktop-only
  modified-click skip. Repository typechecking and whitespace checks pass.
- Weekly allowance: 44%; paid credits unchanged. The polishing goal remains active.

### Completed: route-gallery image failure recovery

- The selected gallery photo has a clear unavailable state that retains its
  caption and credit. Selecting a working photo clears the fallback and updates
  its alt text, caption, credit, and selected thumbnail state.
- Two desktop/iPhone browser regressions pass with mocked failing and working
  images. Repository typechecking and whitespace checks pass.
- Weekly allowance: 43%; paid credits unchanged. The polishing goal remains active.

### Completed: gallery thumbnail recovery and keyboard browsing

- Failed thumbnail images keep their layout space and caption without a broken
  image icon. Thumbnail buttons stay usable.
- Left/right arrows wrap between photos; Home/End select the first/last photo and
  move focus. Browser modifier shortcuts remain untouched.
- Two desktop/iPhone regressions pass for failed previews, restored images,
  selected state, focus, and keyboard wrapping. Typechecking and whitespace pass.
- Weekly allowance: 43%; paid credits unchanged. The polishing goal remains active.

### Completed: reduced-motion route browsing and integration checkpoint

- Gallery thumbnail scrolling and route-section navigation honor reduced-motion
  preferences instead of forcing smooth movement.
- Two desktop/iPhone gallery cases pass with reduced motion enabled, including
  inspection of the requested scroll behavior. Repository typechecking passes.
- All 64 mobile browser cases pass together after calendar recovery, full-route
  mileage fallback, and shared Save/photo touch-target changes.
- Production build passes with 2,428 pages after state/gallery photo recovery and
  gallery keyboard updates. Whitespace checks pass. Weekly allowance: 42%; paid
  credits unchanged. The polishing goal remains active.

### Completed: useful website 404 recovery

- Missing website pages requested as HTML now show a noindex recovery page with
  Today, Explore, and state-directory links. The production server preserves 404
  status and uses no-store; API and JSON requests retain JSON error responses.
- Verified against an isolated local production server: HTML GET, bodyless HEAD
  with content length, API/JSON behavior, and desktop/mobile keyboard navigation
  back to States without horizontal overflow. The temporary server was stopped.
- Production build and repository typechecking pass; whitespace checks pass.

### Completed: 404 negotiation regression coverage

- HTML recovery excludes both the API root and API subpaths. Explicit HTML
  rejection (q=0) retains the JSON fallback; accepted HTML is case-insensitive.
- Eighteen response-helper tests pass, covering route/Accept combinations, missing
  recovery files, and bodyless 404 responses with no-store and correct length.
  Repository typechecking and whitespace checks pass.
- Weekly allowance: 41%; paid credits unchanged. The polishing goal remains active.

### Completed: mobile missing-screen recovery

- Missing-screen copy explains outdated links and offers Today, Explore, and
  Saved destinations. The title has heading semantics and links have larger targets.
- Recovery replaces the missing route in history instead of pushing another entry.
  All three keyboard navigation regressions pass and verify unchanged history
  length. Mobile typechecking and whitespace checks pass.

### Completed: missing-route recovery in mobile detail

- Confirmed route 404s show Route not found with an Explore action instead of
  connection guidance and repeated automatic requests. Temporary failures retain
  one retry, and cached route data remains available during failed refreshes.
- Shared loading/error titles expose heading semantics. Error buttons have explicit
  accessible labels so decorative icon glyphs do not enter their spoken names.
- All 81 mobile unit tests and five missing-page/detail-refresh browser cases pass.
  Mobile typechecking and whitespace checks pass. Weekly allowance: 39%; paid
  credits unchanged. The polishing goal remains active.

### Completed: missing river-group recovery

- Missing river groups offer an Explore recovery action and avoid automatic 404
  retries. Route and group queries share the same retry rule; temporary failures
  retain one retry and cached data remains usable.
- Five river-group browser cases and all 81 mobile unit tests pass. Mobile
  typechecking and whitespace checks pass.

### Completed: workspace dependency graph coverage

- The dependency checker derives local package aliases from their manifests and
  follows application imports into workspace source. A direct graph check confirms
  trip-pack reaches the shared api-contract duration implementation.
- All application/package roots resolve without skipped imports or runtime cycles.
  The existing checker still skips three script-only imports (astro, sharp, and
  design-tokens from an .mjs script); these remain visible as warnings.
- All 1,114 workspace tests pass after the recent recovery changes. Weekly
  allowance: 38%; paid credits unchanged. The polishing goal remains active.

### Completed: consistent duration filtering and sorting

- Mobile Explore's Full day filter uses the shared unit-aware duration parser,
  excluding minute-based and mixed-unit short trips. Its browser regression passes.
- Website board duration sorting and buckets now support decimal hours, hours
  written in full, and minute-only ranges. Unbounded estimates stay unknown.
- All 24 board-domain tests, repository typechecking, generated-script checks, and
  whitespace checks pass. The integrated mobile browser suite passed all 69 cases
  before this duration change; the added duration browser case also passes.

### Completed: production location permissions

- The production response policy now allows geolocation for same-origin pages,
  restoring website nearby-route controls. Browser permission is still required;
  camera and microphone remain disabled by this policy.
- Desktop and mobile Chromium tests use synthetic coordinates to verify the
  permission prompt, granted lookup, and permission reset. Both pass. Eighteen
  response/static-page unit tests and repository typechecking pass.

### Completed: static transfer cleanup

- Static file transfers now close both streams on read failure or client
  disconnect, avoiding unhandled read errors and abandoned file reads. Unexpected
  failures are logged; ordinary disconnects do not produce warning noise.
- Fifteen static-response and transfer lifecycle tests pass, covering successful
  bodies, failed reads, client disconnects, and HEAD recovery. Repository
  typechecking and whitespace checks pass.
- Weekly allowance: 37%; paid credits unchanged. The polishing goal remains active.

### Completed: gallery data coverage and request typing

- Moved the upper West Canada Creek route-photo assignment into the route lookup
  where it is used. Removed a shadowed Dan River entry while preserving the
  previously effective photo, and removed redundant license fields while retaining
  displayed attribution. The route-photo regression passes.
- Added typecheck:gallery to the normal typecheck command; gallery source and
  imported photo collections now receive TypeScript checking. The integrated
  command and whitespace checks pass.
- A separate audit of runtime TypeScript found 98 diagnostics outside the existing
  standard check's coverage. Gallery corrections removed four; correcting the API
  dispatcher's request type removed 48. The remaining 46 diagnostics are recorded
  in .local/polish-runtime-types-followup.log for continued review. The broad audit
  is not yet a passing gate.
- Weekly allowance: 36%; paid credits unchanged. The polishing goal remains active.

### Completed: runtime route contracts and cached forecast recovery

- Route types now describe the corridor and segment fields already produced by
  enrichment. The enriched route type records its guaranteed river ID; operations
  ranking uses an explicit tuple and gauge-readiness checks narrow older records.
- Stale Weekend recovery no longer dereferences a summary-only readiness field.
  Cached river groups read difficulty from the route profile and retain gauge
  metrics when rebuilding detail records from summary data.
- Thirty-seven related tests passed, followed by six snapshot tests after adding
  group/metric coverage. The standard typecheck and whitespace checks pass.
- The broader runtime audit is down from 46 to 11 diagnostics, listed in
  .local/polish-runtime-types-stage3.log. It remains a failing audit pending the
  remaining storage, request-list, opportunity, and scoring corrections.
- Weekly allowance: 36%; paid credits unchanged. The polishing goal remains active.

### Completed: runtime TypeScript verification

- The broad runtime audit now passes. Contribution adapters expose the full JSON
  storage contract and use a typed byte view for uploads; request lists narrow
  missing records correctly. Generated opportunity tasks no longer claim an
  arbitrary caller subtype, and the recorded no-add disposition is represented.
- Forecasts without a start date are withheld instead of throwing while current
  conditions remain available. Redundant temperature-branch comparisons were
  simplified without changing their scores.
- The standard typecheck now checks all runtime TypeScript under src, including
  gallery data, using typecheck:runtime. The standalone gallery check remains
  available. JavaScript/Astro templates and tests are outside this runtime config.
- All 1,125 workspace tests pass, including the missing-date and stale-snapshot
  regressions. The integrated typecheck and whitespace checks pass.
- Weekly allowance: 35%; paid credits unchanged. The polishing goal remains active.

### Completed: display-error reload controls

- The mobile render-error screen now exposes a heading, explains app reload, and
  labels its recovery action consistently. Pending state disables repeated resets
  and announces that reloading is in progress.
- Browser regressions inject malformed route display data, then verify keyboard
  recovery and duplicate-click protection. Both recover to Today with exactly one
  query-cache reset. Mobile typechecking and whitespace checks pass.
- The production build after the runtime/gallery corrections passed (2,429 pages).
- Weekly allowance: 34%; paid credits unchanged. The polishing goal remains active.

### Completed: initial request failure guidance

- Today, Explore, and Weekend now show concise recovery guidance for timeouts,
  rate limits, service outages, and other connection failures. Raw server addresses
  and exception text no longer appear in these primary error screens.
- Shared guidance replaces three duplicate diagnostic formatters. Support's
  connection diagnostics remain available for troubleshooting.
- All three initial-load browser regressions pass, including keyboard retry.
  All 85 mobile unit tests, mobile typechecking, and whitespace checks pass.

### Completed: Explore view keyboard navigation

- Map/List tabs now have a named group, a single tab stop, and Arrow/Home/End
  navigation. Focus follows the selected view when switching layouts replaces
  the tab group; an already focused control elsewhere is left alone.
- Five browser checks pass across Explore view switching, existing control states,
  and Weekend range navigation. Mobile typechecking and whitespace checks pass.
- Weekly allowance: 33%; paid credits unchanged. The polishing goal remains active.

### Completed: malformed request target recovery

- Invalid percent-encoding is rejected before route-specific decoding, producing
  a noncached 400 invalid_request_target response instead of a live-data outage.
  Valid encoded segments remain encoded for routing and query values are preserved.
- Fifteen parser/response tests and runtime typechecking pass. An isolated API
  instance verified malformed GET/HEAD responses and a subsequent healthy request;
  that instance was stopped afterward. Whitespace checks pass.
- The full mobile browser suite passes all 76 cases after the shared keyboard and
  recent recovery changes. Weekly allowance: 32%; paid credits unchanged. The
  polishing goal remains active.

### Completed: malformed form-body responses

- JSON parsing failures now have a dedicated error and a noncached 400 response.
  Shared request-body handling preserves 413 for oversized input and leaves
  unrelated storage errors to existing handlers. Nearby-alert create/update and
  unsubscribe also use this handling.
- Sixteen parser/response/handler tests pass, including malformed input for route
  requests, feedback, alerts, unsubscribe, nearby alerts, photo contributions, and
  nearby-alert updates. Tests stop before storage or external notification work.
  Runtime typechecking and whitespace checks pass.
- Weekly allowance: 32%; paid credits unchanged. The polishing goal remains active.

### Completed: browser metadata content types

- Production static responses now identify robots.txt as UTF-8 plain text and
  generated sitemap XML as UTF-8 XML instead of generic binary downloads.
- Verified the actual built robots and both sitemap files against the resolver.
  All 15 static-response/stream tests and whitespace checks pass.

### Completed: forgiving route search text

- Website board search, site-wide search, and mobile Explore share normalization
  for accents, curly apostrophes, case, and repeated spaces. Displayed names and
  the user's typed query are preserved; matching remains a substring search.
- Twelve desktop/mobile website search checks and the mobile Explore regression
  pass. All 52 contract tests, 25 board-domain tests, integrated typechecking,
  generated-script checks, and whitespace checks pass.
- Weekly allowance: 29%; paid credits unchanged. The polishing goal remains active.

### Completed: unreadable saved-data preservation

- Malformed JSON, unexpected containers, and invalid saved records now trigger the
  existing load-error state. Save actions cannot overwrite that stored value as
  though it were an empty list; retry re-reads it without discarding data.
- Four browser regressions pass, covering storage read failure and three malformed
  values. The tests restore valid storage explicitly, then verify retry and notes
  preservation. Mobile typechecking and whitespace checks pass.
- Weekly allowance: 28%; paid credits unchanged. The polishing goal remains active.

### Verified: integrated polishing checks

- All 1,153 workspace tests and all 80 mobile browser tests pass together.
- Integrated typechecking, whitespace checks, and the production build pass;
  the build produces 2,429 pages.

### Completed: personal-note save activation guard

- A synchronous guard prevents rapid repeated activation from queuing duplicate
  note writes and prevents dismissal during a pending save. Retry clears stale
  error text, and unexpected failures preserve the draft and release the controls.
- The browser regression reproduced duplicate writes before the fix and passes
  afterward with exactly one attempt. It also verifies failed-save draft retention,
  successful retry, persistence after reload, and note removal.
- Mobile typechecking and whitespace checks pass after the change.
- Weekly allowance: 28%; paid credits unchanged. The polishing goal remains active.

### Completed: unreadable nearby-alert settings recovery

- Malformed stored preferences and empty subscription identifiers or management
  tokens now enter the existing load-error state instead of offering subscription
  setup again. Stored data stays intact for retry.
- Eight alert-settings browser tests pass, including three new malformed-data
  cases. Retry restores controls after valid preferences are explicitly restored;
  no subscription writes occur during recovery.
- Mobile typechecking and whitespace checks pass. Weekly allowance remains 28%,
  paid credits are unchanged, and the polishing goal remains active.

### Completed: identifiable save controls

- Mobile save and remove buttons now announce the river name and reach, allowing
  screen-reader users to distinguish routes in Today, Explore, Weekend, river hubs,
  route details, and Saved. Visible button text and compact layouts stay the same.
- The shared component requires a route label, and mobile typechecking confirms
  every caller supplies one. Five saved-route browser checks pass, including exact
  accessible labels, pressed state, remove/undo, notes, and storage recovery.
- Whitespace checks pass. Weekly allowance: 27%; paid credits unchanged.
  The polishing goal remains active.

### Completed: website saved-data write protection

- Save, restore, and personal-note updates now require a successful read of the
  existing saved list. Malformed JSON, unsupported containers, invalid entries,
  and failed storage reads cannot authorize replacing the list with an empty one.
- Seven storage tests and eight desktop/mobile browser checks pass. Browser checks
  verify the failure message, unchanged malformed storage, and remove/undo recovery
  with the original personal note after valid storage is explicitly restored.
- Generated scripts are synchronized and whitespace checks pass. Weekly allowance:
  27%; paid credits unchanged. The polishing goal remains active.

### Completed: website saved-list load recovery

- The Saved page now distinguishes unavailable or malformed browser storage from
  an empty list, explains that stored data has not changed, and exposes a keyboard
  accessible retry. It avoids summary requests until the saved list can be read.
- Ten desktop/mobile recovery checks and seven saved-storage unit tests pass.
  Recovery restores the existing personal note without a page reload, while a
  separate current-call failure remains clearly reported.
- Generated scripts are synchronized and whitespace checks pass. Weekly allowance:
  27%; paid credits unchanged. The polishing goal remains active.

### Completed: saved-list cross-tab clearing and listener cleanup

- Saved-list subscribers now handle browser storage-clear events, so clearing data
  in another tab updates an already-open Saved page. Unbinding favorite buttons
  also releases their saved-list subscription.
- Twelve desktop/mobile browser checks pass, including an actual second-tab clear
  and first-tab empty-state update. Seven saved-storage unit tests pass.
- Generated scripts are synchronized and whitespace checks pass. Weekly allowance:
  27%; paid credits unchanged. The polishing goal remains active.

### Completed: honest unknown freshness labels

- Missing or invalid update times now display Update time unavailable instead of
  Updated recently, including the Weekend page fallback. Cache reads reject numeric
  timestamps outside the valid date range.
- Sixteen cache and board-presenter tests pass, covering invalid timestamps and
  valid cache round trips with elapsed-age labels. Generated scripts are synced
  and whitespace checks pass.
- Weekly allowance: 26%; paid credits unchanged. The polishing goal remains active.

### Verified: integrated checks after saved-data and freshness polish

- All 1,160 workspace tests and 83 mobile browser tests pass. Integrated typechecking
  and the production build pass; the build produces 2,429 pages.
- README verification guidance now documents unit, runtime TypeScript, and browser
  commands, their local ports, and the remaining native-device verification scope.
- Whitespace checks pass. Weekly allowance: 26%; paid credits unchanged.
  The polishing goal remains active.

### Completed: JSON compression negotiation

- JSON responses now respect explicit gzip refusal, quality values, and wildcard
  acceptance instead of matching the word gzip anywhere in the header. Large plain
  responses also vary by Accept-Encoding so caches distinguish representations.
- Twenty-five response/body tests and runtime typechecking pass. Coverage includes
  plain-body readability, wildcard overrides, mixed-case headers, and compressed
  HEAD responses without a body. Whitespace checks pass.
- Weekly allowance: 26%; paid credits unchanged. The polishing goal remains active.

### Completed: missing hourly weather readings

- Mobile hourly weather cards and the paddle-window timeline no longer display
  missing rain or wind readings as zero. They identify unavailable readings while
  preserving actual zero values.
- Two browser regressions pass for missing and real-zero hourly readings, alongside
  mobile typechecking and whitespace checks.
- Weekly allowance: 25%; paid credits unchanged. The polishing goal remains active.

### Completed: incomplete forecast presentation

- Shared weather summaries preserve missing rain/wind values instead of substituting
  zero. The mobile timing model identifies unknown hourly readings and presents an
  incomplete-forecast caution instead of an open weather window. Known severe risks
  remain prominent, with unknown timeline cells using a question icon.
- All 54 contract tests, both missing/zero weather browser cases, and integrated
  typechecking pass. Generated scripts are synchronized and whitespace checks pass.
- Weekly allowance: 25%; paid credits unchanged. The polishing goal remains active.

### Completed: storm timing consistency

- An overall storm flag now remains visible when the displayed hourly readings
  cannot identify its timing, instead of producing a Good weather window label.
  Hourly storm codes are recognized when the descriptive condition label is absent.
- All 55 contract tests, three mobile weather browser cases, and mobile typechecking
  pass. Generated scripts are synchronized and whitespace checks pass.
- Weekly allowance: 24%; paid credits unchanged. The polishing goal remains active.

### Completed: website incomplete weather windows

- Website short-route window selection excludes hours missing rain, wind, or
  temperature readings. When no complete window is available, both window summaries
  explain that forecast readings are incomplete instead of suggesting steady weather.
- Four desktop/mobile browser checks pass. Incomplete hours receive no best-window
  highlight; actual zero rain/wind values still support a complete window.
- Generated scripts are synchronized and whitespace checks pass. Weekly allowance:
  24%; paid credits unchanged. The polishing goal remains active.

### Completed: severe-weather window exclusions

- Website best-window selection now excludes hours meeting its existing severe
  storm, rain, and wind thresholds. An overall storm flag also prevents a best-window
  highlight. When no eligible window remains, the copy calls attention to risks.
- Removed redundant severe-risk score adjustments after those candidates are excluded.
  Twelve desktop/mobile browser checks pass across missing data, calm zero readings,
  strong wind, heavy rain, hourly storms, and an overall storm flag.
- Generated scripts are synchronized and whitespace checks pass. Weekly allowance:
  24%; paid credits unchanged. The polishing goal remains active.

### Verified: combined website interaction suite

- All newly added website interaction suites ran together on desktop and iPhone
  Chromium: 131 passed, with one intentional mobile skip for the desktop modifier-click
  new-tab interaction. Forms, search, saved routes, maps, sharing, exports, galleries,
  keyboard behavior, location policy, and weather checks remain compatible.
- Reviewed shared request deadline handling and confirmed cleanup remains active
  through the response body download. Whitespace checks pass.
- Weekly allowance: 23%; paid credits unchanged. The polishing goal remains active.

### Completed: standard API header inputs

- The shared API client now handles plain objects, header tuples, and Headers
  instances consistently. Request-level overrides are case-insensitive and do not
  mutate shared headers; JSON defaults remain intact.
- Eleven API-client tests, browser-adapter tests, and API-client typechecking pass.
  Generated scripts are synchronized and whitespace checks pass.
- Weekly allowance: 23%; paid credits unchanged. The polishing goal remains active.

### Completed: readable unexpected-response guidance

- Shared API errors no longer include raw HTML or malformed response bodies in
  messages shown by forms. Unexpected responses provide concise retry guidance;
  status codes and structured server messages remain available.
- Fourteen API-client tests, fourteen desktop/mobile request-form checks, and client
  typechecking pass. Generated scripts are synchronized and whitespace checks pass.
- Weekly allowance: 23%; paid credits unchanged. The polishing goal remains active.

### Completed: duplicate saved-route activation guard

- Repeated activation for a route with a pending saved-list change no longer queues
  an immediate reversal. Different routes retain the existing serialized write queue.
- Five saved-route browser checks and mobile typechecking pass. The regression
  verifies two rapid removal activations plus Undo cause exactly two writes total,
  preserving the original notes. Whitespace checks pass.
- Weekly allowance: 22%; paid credits unchanged. The polishing goal remains active.

### Verification correction: public request header options

- The combined check exposed that request-level headers were accepted at runtime
  but absent from the API client's public RequestOptions type. Added the property
  to that public interface and removed the duplicate private declaration.
- Earlier client-typecheck pass statements were incorrect: a later command in the
  same shell sequence masked the failure. The separately observed integrated
  typecheck now passes, including the new header tests and all downstream workspaces.
- Added docs/POLISH_REVIEW.md to group the changes and explain review commands and
  verification limits. The production build passes with 2,429 pages.

### Verified: review checkpoint

- All 1,178 workspace tests and 86 mobile browser tests pass. Integrated typechecking
  passes after correcting the public header-options type. The production build
  produces 2,429 pages, and whitespace checks pass.
- Weekly allowance: 21%; paid credits unchanged. Final review is next; the polishing
  goal remains active until the reserve guard is reached and closeout is verified.

### Completed: invalid paddle-duration fallback

- Mobile duration formatting now identifies nonfinite, nonpositive, or reversed
  estimates as unavailable instead of displaying About 30 min. Valid short-trip
  minimums, exact hours, and hour ranges retain their existing labels.
- All 87 mobile unit tests, mobile typechecking, and whitespace checks pass.
- Final local HTTP checks passed for gzip refusal, gzip decoding, cache variation,
  content length, and HEAD parity. The original development server remains running.
- The review guide now records verification scope and evidence. Weekly allowance:
  21%; paid credits unchanged. The polishing goal remains active.

### Verified: unavailable-weather label layout

- Inspected the mobile screenshot of missing hourly rain/wind readings at 390px
  width. Labels wrap within the card without clipping and remain readable alongside
  temperature and conditions. All three weather browser cases pass.
- The regression now captures that layout for future review. No extra product
  changes were needed after visual inspection.

### Closed: usage reserve reached

- Stopped new work when the weekly allowance reached 20% remaining. Paid credits
  stayed at their starting balance. No resets or billing changes were used.
- Paused the PaddleToday app polish with usage reserve heartbeat so it cannot
  restart polishing after this closeout. All owned test runs and temporary HTTP
  checks finished; the original Astro development server remains running.
- Changes remain local and uncommitted. No deployment, push, merge, infrastructure
  change, or external message was performed. Review docs/POLISH_REVIEW.md for the
  grouped improvements, evidence, and native-device/baseline verification limits.
- Final evidence: 1,178 workspace tests at the combined checkpoint; all 87 mobile
  unit tests after the duration correction; 86 mobile browser checks plus the final
  three weather checks; 131 website checks with one intentional mobile skip, followed
  by 14 request-form checks after client updates. Integrated typechecking, production
  build (2,429 pages), real local HTTP checks, and whitespace verification passed.
