# Main site UI polish — September 7, 2026

Session paused September 8 at the user's request to preserve usage: 5% weekly
remaining, paid-credit balance unchanged. Local web/API server remains running.

Current usage guard: user updated the stop threshold to 1% remaining in either
reported window. The current account response has no shorter Codex window.
Pause if usage cannot be checked reliably. No resets, deployments, paid services,
or infrastructure changes are part of this work. Earlier batches retain their
original checkpoint history.

## Batch 1 — preferences and browsing

- Kept homepage preferences expanded and reduced nesting/spacing on phones.
  Four consistently labelled controls now cover difficulty, time, length, camping.
  Selects retain 44px touch targets; phone selects use 16px text.
- Homepage state links use a compact two-column phone directory with route counts.
- Mobile app promotion sits after the main content instead of covering controls.
  Its dismiss button and store links have 44px touch targets.
- State directory cards show river counts instead of unbounded region lists.
- Fixed Explore's GPS label overflowing the circular phone button.
- Browser screenshots inspected at 320/390/1280px; no page overflow on home.
  Nine focused preference/keyboard/table checks passed across desktop and phones.

## Batch 2 — navigation

- Added current-page styling and aria-current to primary navigation and Request.
- Phone navigation has a dedicated row with 13px labels and 44px targets.
- Reduced oversized desktop logo while preserving branding.
- Six shared-header checks pass, including saved links and overlap checks at
  320/360/390px. Screenshots checked at 320/390/760/1280px with no page overflow.
- Checkpoint: 18% weekly remaining; paid-credit balance unchanged.

All changes remain local alongside the pre-existing worktree changes.

## Batch 3 — actions and route navigation

- Request and photo-upload submit buttons now have a solid primary treatment;
  email fallback remains secondary. Mobile form inputs use 16px text.
- Saved-route empty state has a proper heading, map icon, and clear Browse action.
- Restored Explore on route-page phone headers. Section navigation has a visible
  track, 44px links, and keyboard focus styles; facts/access card contents align
  from the top rather than distributing whitespace unevenly.
- Thirteen request/saved recovery tests pass. Route overview navigation passes on
  all three browser projects. Screenshots inspected for forms and route pages.

## Batch 4 — homepage recovery

- Connected the existing board refresh controller to a visible home-page button
  and refresh status. Added the missing load-failure banner near recommendations.
- Failed initial fetch → successful retry verified on desktop, iPhone, Android
  emulation. Populated home-page screenshots inspected with fixture data.
- Local live feed returned errors during inspection; fixtures were used to inspect
  populated states. No live conditions or backend configuration were changed.

## Batch 5 — first visit, footer, and search

- Replaced the blurred desktop best-pick placeholder with a location prompt and
  action. Placeholder route content is hidden from keyboard/assistive technology.
  Balanced the desktop headline and removed a duplicated preferences reset.
- Footer state links now use a native disclosure; phone footer links have 44px
  targets. Keyboard open/close verified at 320/390/1280px.
- Search dialog remains inside short viewports while its results scroll. Mobile
  result badges sit above full-width route names. Added visible focus treatment
  and clarified that broad searches display the top ten matches.
- All 18 existing search checks pass. Screenshots inspected at 320/390px widths
  and 420px height, plus desktop. No dialog viewport overflow.

## Batch 6 — mobile controls and recovery clarity

- Standardized visible filter/search fields to 16px text and 44px minimum height
  on mobile. Radius slider now has a 44px hit area with a 22px thumb.
- State filters have visible labels and an aligned responsive grid, retaining
  single-column layout below 380px.
- Failed homepage initial loads hide blank map and misleading zero-count badges;
  a successful retry restores the map and counts.
- Six filter/radius checks passed, followed by six state/recovery checks after the
  final changes. Usage checkpoint: 15% weekly remaining, paid credits unchanged.

## Batch 7 — supporting pages and accessible status

- Guide index cards use a consistent responsive layout and clearer typography;
  informational text has readable line lengths and spacing.
- About's scoring table has a mobile scroll hint and keyboard focus treatment.
- Initial board failures now replace the indefinite freshness check with an
  unavailable message. Five loader unit tests and three recovery checks pass.
- Reduced-motion preference disables loading shimmer and marker-selection motion.

## Batch 8 — contributions and Weekend controls

- Photo inputs have a styled file button; consent checkboxes are larger with
  checked/focus treatment. Route report and photo submits use primary styling.
- Twelve upload/report checks pass, including preservation after failed uploads.
  Inspected forms at 320px and desktop, with no horizontal overflow.
- Weekend route-type controls use two mobile columns; range buttons and coverage
  disclosure have 44px targets. Clear location has a more explicit label.
- App promotion now follows content at all widths, avoiding covered route actions.
  Dismissal verified at 320/390/1280px. Store links remain unchanged.
- Six Weekend GPS/distance checks pass. The GPS test now triggers its simulated
  callback without awaiting it, then asserts the visible update.
- Checkpoint: 13% weekly remaining; paid credits unchanged.

## Batch 9 — Explore filters and failed-load recovery

- Refresh data now appears above the workspace with the existing refresh status.
- Initial failure hides the empty map/loading results and unavailable filter UI;
  location and state browsing remain accessible. Retry restores the workspace.
- Advanced filters have visible labels and an aligned responsive grid. Score and
  secondary action buttons have 44px minimum targets.
- Three failed-load/retry checks pass. Desktop and 390px advanced-filter screens
  inspected with fixture data; no horizontal overflow.
- Checkpoint: 12% weekly remaining; paid credits unchanged.

## Batch 10 — route hierarchy and keyboard destinations

- Enlarged route titles on phones and removed the clipped introduction.
- Section jumps now focus the destination and use a 22px offset when the action
  bar is in normal flow. Sticky/fixed action bars still contribute their height.
- Alert dialog has a clearer heading, bordered 44px Close button, and bounded
  scrolling for short viewports. Inspected at 320x420 and 390x844.
- Nine navigation/alert checks pass across all browser projects, including focus,
  settled scroll position, failed signup recovery, and closing the dialog.
- Checkpoint: 11% weekly remaining; paid credits unchanged.

## Batch 11 — unavailable scores and narrow condition cards

- Route failures explicitly show Unavailable, with an accessible score status.
  Retry now has a pending/disabled state; successful fetches restore the display.
- Missing or withheld scores hide their numerical breakdown and retain neutral
  styling rather than a Good/Strong color from an unusable score.
- Gauge source labels wrap inside their card. At 360px and narrower, gauge and
  weather cards stack so long unavailable/source labels remain readable.
- Standardized form control minimum heights and alert email text size on phones.
- Route recovery/withheld tests pass on three projects. Mobile fields inspected
  across eight page types; long route titles verified at 320px.

## Batch 12 — homepage decision path

- Moved the best-route action ahead of photography/maps. Longer supporting
  explanations are behind a native Why this route disclosure.
- Smaller desktop previews; compact radius value beside its label. Preferences
  stay expanded by default with unchanged filter behavior.
- Nine homepage hydration/radius/map checks pass. Disclosure keyboard open/close
  verified at 320/1280px. Primary desktop action is visible in the first screen.
- Repeated rapid scrolling did not reproduce the reported map artifact locally.
- Production build passed (2,429 pages). A broader set of 63 header, hidden-state,
  keyboard, and weather checks passed after the route and homepage updates.

## Batch 13 — Saved route clarity and desktop header

- Unavailable saved calls show their limitation with neutral styling, replacing
  contradictory favorable summaries. Current weather/confidence badges return
  with an available call. Static route facts and detailed source context remain.
- Personal-note Save now has a clear primary appearance and 44px target.
- Six saved-state/note interaction checks pass. Phone and desktop states reviewed.
- Wide desktop header keeps all actions on one row, with 44px targets. Checked
  with/without Saved routes at 1024/1181/1280/1440px; no page overflow.
- Route forecast placeholders also resolve to unavailable after an initial error.

## Batch 14 — tablet layout and interaction targets

- Fixed 30px route-page overflow from the hidden live-warning tooltip; it now
  aligns to the panel edge and remains visible on keyboard focus.
- Tablet headers keep navigation together and retain Explore/Request on routes.
  Checked 768–1180px with and without saved routes. No horizontal overflow.
- Route sharing, coordinate copying, and shorter-segment disclosure targets are
  at least 44px. Checked at 320/390/820/1280px.
- Stronger keyboard focus outlines, with a white outline on dark feedback notices.
- 54 header/sharing checks pass; runtime type check and 2,429-page build pass.
- Earlier combined integration run: 79 passed. Earlier responsive regression:
  63 passed across desktop and two phone projects.

## Batch 15 — Weekend connection errors

- A failed initial forecast hides misleading zero-count filters, empty results,
  and the dead shortlist link. Retry weekend forecast clearly names the action
  and stays visible/disabled while retrying; successful data restores the board.
- Retains an existing valid empty forecast after a failed background refresh.
- Weekend List/Map controls now have 44px minimum touch targets.
- 17 Weekend checks passed; four desktop-only cases skipped on phone projects.
- Checkpoint: 7% weekly remaining; shorter window unavailable; credits unchanged.

## Batch 16 — readability and populated phone controls

- About/Contact phone paragraphs use 15px text with more line spacing; lists
  match paragraph sizing. Fixed a missing space before the contact email link.
- Home location/preset controls, Home/Explore List/Map switches, and removable
  Explore filters have 44px phone targets. Map switch text is easier to read.
- 33 Home/Explore interaction checks passed; 24 desktop-only cases skipped on
  phone projects. Eleven page types checked at 320px without horizontal overflow.
- Board download time now says Last checked, distinct from data update time.
  Delayed-update messages use plain language instead of internal worker details.
- 20 presenter/status/loader unit checks passed; runtime type checking passed.

## Batch 17 — river comparison fallback

- Removed the premature Recommended today label from static initial markup.
- Failed initial comparisons resolve Loading scores to No data and retain static
  route links. Unavailable filters/map controls are hidden; retry restores them.
- Comparison-page phone filters, selects, Save controls, and List/Map switches
  have 44px targets; phone select text is 16px.
- Six comparison/recovery/duration browser checks passed across three projects.
  Runtime type checking passed after the behavior change.

## Stopped at the usage threshold

- Weekly remaining: **5%** (95% used). Shorter window remains unavailable.
- Paid-credit balance remained **2009.5977750000** throughout this run. No resets.
- Local review: http://localhost:4323/ remains running. Changes are uncommitted.
- Latest production build passed with 2,429 pages before the final wording and
  river-comparison batch; those final changes received focused checks above.
- API requests sometimes return 503 locally; populated/recovery checks used
  synthetic fixtures. The intermittent homepage map artifact was not reproduced.
- Next priorities: capture the intermittent map issue with a browser trace,
  review long populated river comparisons with real data, and consolidate the
  accumulated responsive CSS rules in a separate, carefully checked cleanup.

## Batch 18 — mobile app prompt placement

- Restored the dismissible app prompt as a floating bottom-right card on large
  screens, with the two store actions kept on the same compact panel.
- On phones it now stays in an obvious full-width bottom position above the
  safe-area inset. Store buttons are 48px tall and the dismiss control remains
  a clear 44px target.
- Re-enabled the prompt on Explore and river comparison pages. Route detail,
  privacy, terms, and dismissed states remain respected by the existing logic.
- Verified desktop at 1280/1024px and phone at 390px, including dismissal and
  local-storage persistence. The local preview remains at http://localhost:4323/.

## Resumed polish — stop at 1% remaining

User authorized using the remaining weekly allowance down to 1%. Starting
checkpoint: 5% remaining; shorter window unavailable; credits unchanged.

### Batch 19 — unobstructed mobile app promotion

- Measured the fixed prompt and reserved enough phone scroll space for footer
  links. Keyboard scroll padding and feedback notices account for the prompt.
- Temporarily hide the prompt while typing in phone text fields; leaving the
  field restores it without changing the 30-day dismissal preference.
- Six browser checks passed across desktop/phone projects for footer reachability,
  typing, and persistent dismissal. Banner position remains as requested.

### Batch 20 — route directory navigation

- Larger View route and river-hub link targets on phones, checked at 320px.
- State directories collapse river/region groups by default with explicit +/-
  disclosure cues, reducing long repeated lists while keeping routes accessible.
- Added state route-name search that combines with existing filters and map
  visibility. A Find a route shortcut reaches the filters from the page header.
- Search is case-insensitive and matches river, reach, and area words; Reset
  clears it with the other filters. Runtime type checking passed.
- 19 state-page browser checks passed, two desktop-only checks skipped on phones.
  Production build passed with 2,429 pages.

### Batch 21 — trip guide recovery and navigation

- Added retry controls to both Minnesota guides. Missing and failed scores resolve
  to unavailable; withheld calls hide numerical badges and show their limitation.
- Weekend connection errors no longer claim there are no qualifying routes.
- Keyboard focus moves to the refreshed status after a successful retry.
- Added All trip ideas return links to long guide categories and a photo-error
  fallback that preserves the image link and its layout height.
- Six guide recovery browser checks passed; failed-image layout inspected at 390px.

### Batch 22 — readable and honest gauge charts

- Removed the sample trend line from initial markup. A failed request leaves no
  invented data line or endpoint; range controls enable only with sample history.
- Larger, higher-contrast chart labels and 44px range controls. The accessible
  chart description includes the current range and trend explanation.
- Three failed-load/retry checks passed across desktop and phone projects.
- Checkpoint: 3% weekly remaining; paid-credit balance unchanged.

### Batch 23 — platform actions and submission feedback

- The first available app-store button is primary: Android users now see a solid
  Android action, while desktop still offers primary iPhone / secondary Android.
- Nine app-prompt checks passed, including platform detection, typing visibility,
  footer clearance, and persistent dismissal. Desktop/Android screenshots reviewed.
- Route-request and photo-upload completion return keyboard focus to their status
  when the submit button loses focus. Existing focus in another field is preserved.
- Production build passed with 2,429 pages before this final focus adjustment;
  runtime type checking and whitespace checks passed.

## Resumed run completed at 1% remaining

- Weekly usage: **99% used / 1% remaining**. Shorter window unavailable.
- Paid-credit balance unchanged at **2009.5977750000**; no resets redeemed.
- Request/contribution checks: 30 passed initially; three failures came from an
  outdated unscoped details selector. Scoped it to the request form; all three
  affected checks passed on rerun.
- Final production build passed with 2,429 pages after the focus changes.
- Other focused checks: 19 state, 9 app-prompt, 6 guide, and 3 chart recovery
  checks passed. Desktop/mobile layouts and image failure states inspected.
- All changes remain local and uncommitted. http://localhost:4323/ remains running.
- Highest-value follow-ups: reproduce the intermittent map repaint with a trace,
  consolidate legacy responsive CSS, and inspect long populated route lists with
  current live data. This run used fixtures for unavailable local API responses.

## Map reliability and styling cleanup — September 7, 2026

### Batch 24 — recoverable map loading and simpler compositing

- Confirmed the user reset: weekly usage started at 0%; credit balance unchanged.
  Restarted the local frontend/API through the existing `dev:all` command.
- Failed or stalled MapLibre asset requests now release failed tags and cached
  promises. Later attempts retry only the failed asset; concurrent calls share
  downloads. Downloads time out after 15 seconds instead of hanging indefinitely.
- Home map failures retain route results and expose Retry map. Phones fall back
  to the list; a successful retry restores map view and a visible focus target.
  Superseded render failures cannot overwrite a newer render's status.
- Removed backdrop blur from shared map panels and home mobile map overlays.
  Real WebGL canvas dimensions matched their containers through repeated scrolling
  at 1280, 760, 390, 820, and 1280px. The original intermittent white rectangle has
  not been reproduced; removing unnecessary compositing is a mitigation, not a
  confirmed root-cause fix.
- Validation: 22 runtime tests, nine asset failure/timeout recovery checks, and
  three homepage failure/retry checks passed. Desktop and phone failure layouts
  reviewed. Populated data checks use clearly synthetic fixtures.

### Batch 25 — app-banner CSS consolidation

- Moved 42 scattered banner rules into one component stylesheet, preserving the
  desktop corner card, phone prominence, typing behavior, and dismissal clearance.
  Removed conflicting page-specific hide/show rules and unnecessary importance.
- Seven-width computed-style comparison preserved the banner's geometry and
  presentation. Desktop and phone before/after screenshots were pixel-identical;
  all nine app-banner interaction checks passed.
- Removed a pre-existing unmatched closing brace near the contribution sidebar
  rules. The full main stylesheet and extracted component now parse successfully.
- Broader map validation: all 45 desktop map interaction/performance checks passed.
- Usage checkpoint: 2% weekly used; paid-credit balance unchanged.

### Batch 26 — remove redundant map layout work

- Real MapLibre checks confirmed native container resize and hide/show handling
  preserves zoom and center. Removed the homepage's duplicate resize observer;
  retained the explicit resize before fitting result bounds.
- Removed 206 exact duplicate declarations and 282 superseded homepage map layout
  declarations. Each removal retains the later applicable selector/condition rule.
- All computed properties matched before/after across 12 map/list layouts at seven
  widths (360–1280px), including a short phone viewport. Real WebGL canvas sizes
  matched containers at all five resize checkpoints; desktop/phone screenshots reviewed.
- Interaction regression checks: 97 passed, 38 existing project-specific skips.

### Batch 27 — isolate homepage map styles and improve popup controls

- Moved 119 remaining homepage map rules into `public/styles/home-map.css`, loaded
  only for the homepage. Preserved all computed properties across the 12-layout
  comparison, including the final 44px mobile map/list targets. Removed empty
  sections and whitespace left by the extraction. Production build: 2,429 pages.
- Scoped popup styles so the later MapLibre CDN stylesheet cannot override the
  intended rounded card styling. Added 44px touch zoom/close controls and route
  actions, with space between popup headings and the close button.
- Marker popups now close with Escape and return focus on explicit dismissal.
  Opening a popup repeatedly no longer duplicates its click/keyboard listeners.
- Three desktop/phone keyboard, close-target, heading-clearance, and stylesheet
  precedence checks passed; 22 map runtime tests passed. Real MapLibre popups
  inspected at 390/1280px with the expected rounded styling and control dimensions.
- Usage checkpoint: 3% weekly used; paid-credit balance unchanged.

### Batch 28 — state-map recovery without losing filters

- Added a direct Retry map action while preserving static fallback markers, route
  links, and current filters. A successful retry restores focus to the map status.
- Map-layer operations wait until the candidate runtime is ready. A transient
  tile error can recover within the readiness deadline instead of immediately
  destroying the map. Explicit timeout/failure still cleans up the failed runtime.
- State-page suite: 25 passed, two existing desktop-only skips. Six additional
  focused retry/transient-error checks passed after the final adjustment. Desktop
  and phone fallback layouts reviewed; runtime type check and CSS parsing passed.
- Usage checkpoint: 5% weekly used / 95% remaining; paid-credit balance unchanged.

### Batch 29 — prevent superseded map renders from winning

- Featured maps ignore an older geometry failure after a newer route succeeds.
  The regression failed before the fix and passed afterward. Applied matching
  stale-failure guards to Explore and weekend maps.
- Route maps recheck the active render after asset/style readiness and before
  failure cleanup. Removed duplicate readiness waits and tolerate transient tile
  failures within the existing deadline. Selected landing markers follow the
  latest choice; the access-map camera still intentionally shows river context.
- Validation: 24 runtime/controller tests and 15 desktop/phone loader, popup, and
  route-selection checks passed.

### Batch 30 — saved-map recovery and a compact failure state

- Saved maps cancel obsolete renders when routes are removed or storage becomes
  unreadable, clean up failed runtimes, and allow transient tile errors to recover.
  Removing and undoing a saved route while tiles load keeps markers consistent.
- Added Retry map without refetching calls or losing notes. Failures replace the
  large blank map with a compact notice. Successful retry restores keyboard focus.
  Shared the existing map-destruction helper with route pages.
- Existing saved-page checks passed; six focused recovery/race checks passed after
  final adjustments. Desktop and phone failure screenshots reviewed; retry targets
  measure 44px. Runtime typecheck and a 2,429-page production build passed before
  the final failure-layout-only adjustment.
- Usage checkpoint: 8% weekly used / 92% remaining; paid-credit balance unchanged.

### Batch 31 — deferred route lines and consistent map calls

- Reproduced dropped homepage route lines when fitting the camera starts another
  tile load. Queue the latest geometry and apply it on map load/idle; discard
  queued geometry when a newer results render begins. Regression failed before
  the fix and passed at desktop and both phone sizes afterward.
- River comparisons ignore superseded renders, including their empty-results
  branch. Three filter-to-empty/restore checks passed without stale endpoints.
- Saved-map markers and popups now match neutral saved cards when the current call
  is unavailable. They retain route locations and source limitations, without
  presenting the withheld score as a current recommendation. Three checks passed.
- Real MapLibre desktop/phone checks found the route-line layer present and canvas
  dimensions matching the map container. Screenshots reviewed with synthetic data.

### Batch 32 — shared marker styles and weekend map recovery

- Moved 46 marker, legend, popup, and map-control rules into `map-markers.css`.
  Removed four obsolete result-badge declarations exposed by that extraction.
  Real desktop/phone marker and popup computed styles matched before/after;
  all 12 homepage layout comparisons also matched. Popup accessibility checks pass.
- Broader browser checks: 130 passed, 38 existing screen-specific skips.
- Weekend maps now offer map-only retry, tolerate transient tile errors within a
  seven-second deadline, and clean up failed runtimes. The route shortlist remains
  available; desktop failures use the map space for a two-column shortlist, while
  phones return to List. Three stalled-map/retry/focus checks passed, including
  44px retry targets. Failure screenshots reviewed.
- Production build: 2,429 pages, before the final weekend failure-layout change.
- Usage checkpoint: 10% weekly used / 90% remaining; paid-credit balance unchanged.

### Batch 33 — clearer Explore colors and smaller popup pans

- Explore's WebGL Good badges now use teal, distinct from Strong green and
  consistent with the legend. All three real-renderer collision, selection,
  style-reload, and touch checks passed with explicit color assertions.
- Reproduced excessive edge-popup panning: the old calculation moved a marker
  about 461px horizontally when 110px was sufficient. Calculate the new center
  from the viewport center, rather than the marker's position. The real-renderer
  regression failed before the fix and passed at desktop and both phone sizes.

### Batch 34 — Explore map failure keeps route links usable

- Added map-only retry with bounded style readiness and cleanup of map markers,
  cached marker modes, and hidden score controls. A failed map no longer replaces
  its results with an empty list.
- Found that phone list buttons depended on a functioning map. The failure state
  now shows normal route cards with direct links, with the recovery notice first.
  The normal map/list layout returns after retry.
- Six asset/style failure checks passed, preserving the search filter, visible
  route cards, a single canvas/control group, and focus after retry. Real badge
  cleanup checks passed at all three widths. Desktop/phone failure layouts reviewed.
- Runtime typecheck, stylesheet parsing, and a 2,429-page production build passed.
- A subsequent account check reported a new reset time and 1% weekly used; no
  reset was redeemed by this task, and paid-credit balance remained unchanged.

### Batch 35 — clean partial WebGL initialization before retry

- Reproduced a failed WebGL constructor leaving one canvas and two wrapper nodes;
  retry then created a second canvas. The shared map factory now cleans partial
  initialization while preserving pre-existing fallback content and classes.
- Three real-renderer failure/retry checks passed with zero leftover canvases
  after failure and exactly one ready canvas after retry. All 22 runtime tests pass.

### Batch 36 — remove the obsolete homepage mobile overlay

- Removed 56 rules styling an old bottom result overlay that Map mode no longer
  displays. Hide its empty copy container directly; List remains the route-results
  view. This also avoids retaining an unnecessary positioned layer over WebGL.
- Visible computed styles matched across 12 map/list states at seven widths
  (360–1280px). Home browser checks: 22 passed, eight existing screen-specific skips.
- Removed two superseded selected-marker declarations from the shared stylesheet.
- Usage checkpoint: 3% weekly used / 97% remaining; paid-credit balance unchanged.

### Batch 37 — homepage fallback routes are actual links

- The homepage's failed-map list now uses direct route/comparison links instead
  of buttons that require a map. The shared results renderer supports this
  fallback without map-selection click handlers or pressed-state semantics.
- Desktop failure uses a compact two-column route list instead of a blank map.
  Retry restores normal map buttons and reveals the container before fitting it.
- Three desktop/phone failure, link-semantics, retry, and focus checks passed;
  all nine shared map-controller tests passed. Production build: 2,429 pages.

### Batch 38 — keyboard exit from maps

- Added a focus-visible Skip map link to Home, Explore, and Weekend map panels.
  It moves focus past the map and its potentially long list of score controls.
  Nine desktop/phone checks verify that the next Tab continues outside the map.
- A real graphics-context loss/restore check, with an 800px-to-390px container
  resize during recovery, preserved the route layer and camera. Native MapLibre
  recovery handled this case without additional application code.
- Combined CSS is approximately 28KB smaller uncompressed than the original main
  stylesheet, accounting for the three new component stylesheets.

### Batch 39 — restored Explore camera survives map retry

- Reproduced retry reporting ready with no route score markers when returning
  to a saved Explore camera. The unchanged-results shortcut now requires a
  successfully rendered item signature before reusing map content.
- Both failed-asset and stalled-style regressions failed before the fix and
  passed afterward across desktop, iPhone, and Android (six checks).
- The preceding integrated browser run passed 200 checks, with 40 existing skips.
- Usage checkpoint: 5% weekly used / 95% remaining; paid-credit balance unchanged.

### Batch 40 — retry the route access map in place

- Added a direct access-map retry and compact failure layout. Retrying preserves
  the current put-in/take-out and returns keyboard focus to the map status.
- Six desktop/phone recovery and concurrent landing-change checks passed.
  Reviewed failure screenshots at desktop and phone widths; retry is at least 44px tall.

### Batch 41 — river comparison map recovery

- Stalled river-hub map loads now enter a real failure state after seven seconds,
  clean the runtime, and offer an in-place retry. Empty-filter transitions also
  release failed runtimes so clearing filters can rebuild the map.
- Twelve desktop/phone comparison, duration, empty-filter race, and retry checks
  passed. Failure screenshots show a compact status and 44px retry action.

### Batch 42 — consistent unavailable conditions on maps

- Shared condition-zone grouping no longer converts missing scores to zero or
  mixes withheld/offline readings with live scores. Reused the existing card
  availability rule through a small shared helper without changing scoring.
- Fixed river-hub normalization dropping readiness. Unavailable routes now keep
  planning links but lose recommendation claims and stale numeric badges; their
  map lines are neutral with a matching legend entry. Current calls sort first.
- Twenty-four focused unit checks passed. Combined Home/Explore, river-hub, and
  state browser checks passed 149 checks, with 40 existing skips. Corrected a
  live-marker test fixture that was explicitly marked withheld.
- Full build/type checks passed; 2,429 pages generated. Usage: 94% weekly remaining.

### Batch 43 — accessible short-map popups

- Access-map popups no longer call withheld measurements today's score; nine
  route access-map recovery, race, and availability checks pass.
- Reproduced long popup actions clipped outside a 250px-tall map. Popup content
  now scrolls within the map height, with a persistent close control and focused
  actions brought into the popup's scroll area without scrolling the page.
- Nine real/fake renderer popup checks and all 22 runtime unit tests passed.
  Reviewed short-map phone screenshots and verified desktop/iPhone/Android;
  custom test documents now explicitly use the device viewport.
- Open popups also recalculate their available space on map resize; the listener
  is removed on close. The regression covers shrinking a 420px map to 250px.

### Batch 44 — keep popups in the visible map area

- Reproduced a popup fitting its map while its action remained below the browser
  window. Placement and available height now use the visible map intersection
  when it is large enough for a readable popup.
- All 12 desktop/phone popup accessibility, resizing, partial-visibility, and
  edge-panning checks passed, including the native MapLibre renderer.
- Popup bounds also respect the page's existing scroll padding, including the
  mobile app banner reservation. All 15 popup checks pass with a reserved footer.

### Batch 45 — state cards match unavailable map calls

- State current-route cards now use neutral No call badges and availability
  explanations instead of retained numeric scores, confidence, and stale signals.
  Available calls sort first; route facts and links remain usable.
- Twenty-eight state browser checks passed, with two existing phone-specific
  skips. Desktop and phone card screenshots reviewed; runtime type check passed.
- Removed the repeated region from these cards and corrected the difficulty
  field lookup, so the facts line shows distance and difficulty. Three focused
  desktop/phone checks passed and the updated compact card was reviewed.

### Batch 46 — lighter homepage filter feedback

- Removed the forced layout read used to restart a border/shadow transition.
  Repeated filter changes now extend the existing highlight without removing
  and re-adding its class around an unnecessary synchronous layout flush.
- Twenty-two focused homepage browser checks passed, with eight existing skips.

### Batch 47 — stronger score-badge contrast

- Slightly darkened Explore's green and amber badge fills. White number contrast
  improved from 4.31:1 to 5.22:1 and from 3.92:1 to 5.17:1 respectively.
- Three native-renderer desktop/phone checks passed, covering measured contrast,
  collision handling, selection, late route layers, touch, style reset, and cleanup.
  Reviewed the phone badge rendering; device viewport metadata is explicit.

### Batch 48 — recover route geometry after network failures

- Failed state/route geometry promises no longer poison the session cache.
  Successful requests and confirmed missing route files remain cached.
- River comparisons retry failed geometry on refresh. State maps retry on later
  interaction after a 30-second cooldown; successful empty coverage is retained.
- Three cache/recovery unit checks passed (two failed before the fix), plus six
  desktop/phone checks verifying replacement lines and bounded retry requests.

### Batch 49 — overview and preview recovery

- Explore's page-level overview cache now releases failures and waits 30 seconds
  before a later interaction retries. Phone recovery/performance checks passed;
  an initial extra-request desktop failure did not recur in an isolated check
  and three repeat runs. Route anchors update when the overview recovers.
- Featured map previews now use one seven-second readiness wait and release
  failed runtimes before a later render retries. All 24 controller/runtime unit
  checks passed, including stale-render protection and fresh-map creation.

### Batch 50 — homepage stalled-style recovery

- Home now applies the same seven-second readiness deadline as the other maps.
  A stalled style preserves direct route links and releases markers, queued
  geometry, and the failed runtime before retrying.
- Six desktop/phone asset and style failure checks passed, including route links,
  restored selection buttons, focus, two route markers, and exactly one canvas.

### Batch 51 — popup selection follows its actual state

- Reproduced a second marker click closing its popup while leaving aria-pressed
  true and the selected highlight visible. Removed the redundant click selection;
  popup open/close events now own that state.
- Corrected Explore status copy that repeated “routes routes”.
- Map readiness waits now reject immediately when their runtime is removed,
  releasing readiness listeners and timers instead of waiting for the deadline.
- All 25 map runtime/featured controller unit checks passed. The preceding full
  build generated 2,429 pages successfully.
- Integrated browser checks passed 166 cases with 38 existing skips. Two earlier
  Explore failures (extra overview request and popup closing on zoom) did not
  reproduce in 27 focused, 54 cross-page, or this integrated run. Failure-only
  request/close diagnostics remain in place; those causes are not yet confirmed.
- Usage checkpoint: 15% weekly used / 85% remaining; paid-credit balance unchanged.

### Batch 52 — remove ineffective marker styling and simplify map status

- Removed marker opacity/transform rules overridden by MapLibre's inline styles,
  and consolidated the selected-marker rule. Real desktop and phone computed
  marker/popup styles matched before and after, with screenshots reviewed.
- Map status no longer counts unavailable reading groups as visible score zones;
  route counts and the action to select a route remain clear.
- All 15 popup checks passed after the selection correction, including pointer
  toggle, keyboard dismissal, clipping, resize, and reserved mobile footer space.
  A real MapLibre pointer/Enter/Escape check also passed.
- Explore/river comparison checks passed 27 cases. The overview request failure
  recurred once after batch 51, then 72 repeated cross-page and 12 focused checks
  passed. Diagnostics now persist across reloads and save a failure artifact.
- A native stalled-tile investigation confirmed the existing readiness deadline
  also bounds tile waits. No readiness semantics changed from that investigation.

### Batch 53 — river comparison popups and initial map framing

- Reproduced score popups closing immediately because the score click also
  selected a stretch and rebuilt its markers. Selection now uses the popup's
  explicit action, consistently for pointer and keyboard input.
- Retained unchanged score markers through geometry and viewport updates; stale
  or removed routes still replace or remove their markers. A delayed-response
  regression confirms popup and DOM identity survive a new river line.
- Real MapLibre exposed clicks activating both a score marker and the river line
  underneath. The line handler now ignores marker/popup control clicks.
- Reproduced a desktop map with every marker offscreen when a geometry response
  superseded the initial render. Fresh maps now fit once before preserving the
  viewport; initial fitting is immediate, with resizing done before fitting.
- Preserved descriptive accessible labels after MapLibre replaces them with its
  generic label. River markers now identify the stretch as well as the score.
- Simplified river popups: route name, call/score, labeled put-in/take-out rows,
  and one clear selection action. Real desktop/phone screenshots reviewed.
- 24 river comparison checks, six focused geometry timing checks, and 32 shared
  map/controller unit checks passed. Native pointer and keyboard coverage verifies
  one usable popup and explicit stretch selection at desktop and phone widths.
- Usage checkpoint: 18% weekly used / 82% remaining; paid-credit balance unchanged.

### Batch 54 — state score popup stability and readability

- Reproduced a state score popup being removed by the selection handler's marker
  rebuild. State markers now retain identity for unchanged route groups, while
  filtering and new score records still remove or replace the affected markers.
- Keyboard activation now selects the same river/route as pointer activation.
  River-line clicks ignore overlaid marker controls to prevent duplicate actions.
- State popups use the same compact call/score and labeled access-point layout
  as river comparisons; desktop/phone screenshots reviewed with real MapLibre.
- Six native/harness pointer and keyboard popup checks passed. The combined
  Explore, state, and river comparison run passed 76 checks with two existing skips.
- The preceding production build generated 2,429 pages successfully.

### Batch 55 — shared keyboard and sizing behavior for river-line popups

- Reproduced river-line popups ignoring Escape. Extracted the shared popup
  controls/sizing lifecycle from marker selection so line popups receive the
  same clipping protection, close controls, Escape behavior, and focus return.
- Opening river-line details on a phone now keeps Map view visible instead of
  switching to the list and hiding the newly opened popup.
- All 32 shared map/controller unit checks and 48 popup/river browser checks
  passed, plus three native line-popup keyboard-focus checks.
- Usage checkpoint: 20% weekly used / 80% remaining; paid-credit balance unchanged.

### Batch 56 — keep popup identity visible and close controls compact

- Reproduced the Saved popup's river name hidden behind the sticky close row
  after native focus moved to the final link. Popup controls now come first in
  reading/focus order, so opening starts at the route identity and Tab reaches
  the route action without losing access to the close control.
- A sticky close row now contains a normal circular button, replacing the wide
  button/focus rectangle. Native desktop/phone screenshots were reviewed.
- All 48 popup/Saved browser checks passed. A native deferred-content popup
  check also verifies initial close-button focus and Escape returning to the map.
- Saved map framing was verified with real MapLibre at desktop and phone widths;
  its single route centers correctly, so no camera change was needed there.

### Batch 57 — state directory links navigate normally

- Reproduced ordinary pointer and Enter activation staying on the state page:
  route anchors canceled navigation to update an offscreen map instead.
- Restored native route-link navigation while retaining hover/focus map previews
  and selection through map markers and river lines.
- Ten navigation checks passed, with two desktop-only modified-click cases
  skipped on phones. Coverage includes pointer, Enter, new-tab, and failed-map
  navigation. The preceding production build generated 2,429 pages successfully.

### Batch 58 — isolate controlled map tests from development reloads

- Captured the intermittent extra overview request: Astro/Vite reloaded the page
  after a source edit, and each of two documents made one initial request, 145ms
  apart. The production cooldown was not bypassed within one document.
- The map harness now isolates the local Vite WebSocket during controlled tests;
  the user's running development site is unchanged. The cold-after-edit check
  passed with isolation. Temporary request/popup diagnostics were removed; the
  captured evidence is retained in ignored tmp/explore-hmr-reload-diagnostic.json.
- The earlier intermittent zoom-popup failure has not recurred; its specific
  cause was not captured, so it is not attributed to live reload conclusively.
- Integrated run: 277 passed, 40 skipped, one canvas-startup assertion failed
  while the page still showed initial loading. All nine focused reruns passed;
  no production timing change was made without a reproducible cause.

### Batch 59 — consistent map keys with less duplicated markup

- Shared the score-legend items across Home/Explore/Weekend, Saved, and state
  pages. State keys now include Good conditions and use the same wording and
  representative scores as the main map. Saved explains neutral unavailable
  markers; sample scores are decorative for screen readers.
- Removed unused state difficulty-legend styles and the misleading pointer
  cursor on Saved's static Skip sample. Existing interactive filters remain.
- All 33 Explore score/Saved checks passed. State and Saved legend screenshots
  were reviewed at 390px and 1280px, with no horizontal page overflow.
- Usage checkpoint before this batch: 23% weekly used / 77% remaining;
  paid-credit balance unchanged.

### Batch 60 — keyboard shortcuts past dense maps

- Extended the existing focus-only Skip map link to Saved, state coverage,
  river comparisons, and route access maps. Keyboard users can bypass markers
  and controls without stepping through every route; normal layouts are unchanged.
- All 12 desktop/iPhone/Android checks passed, including focus transfer and the
  next Tab leaving the map region. Native state-map focus screenshots captured
  at 390px and 1280px for visual review.

### Batch 61 — remove superseded mobile home-map CSS

- Removed an obsolete set of mobile map sizing/layout rules and older viewport
  calculations already overridden by the current compact map styles.
- Native browser snapshots covered 12 map/list states at seven widths, including
  both sides of the desktop breakpoint. Computed layout properties matched;
  four color/shadow differences were intermediate button transition values.
- The preceding production build passed and generated 2,429 pages. Keyboard
  shortcut screenshots were reviewed and remain clear at desktop/phone widths.
- Usage checkpoint: 24% weekly used / 76% remaining; paid credits unchanged.

### Batch 62 — name map popups for assistive technology

- Native accessibility-tree inspection showed an unnamed popup starting at its
  Close button. Shared popups now expose a nonmodal dialog named by their visible
  heading, including content inserted when the popup opens.
- All 18 native/harness popup keyboard, label, and clipping checks passed.
  The public runtime mirror was synchronized.

### Batch 63 — make Open access map reveal the map

- Reproduced the overview link scrolling to the access-planning section while
  leaving its map collapsed on phones. It now targets the map, expands it,
  and supports direct fragment links without replacing native link navigation.
- All six desktop/phone link checks passed, and native desktop/phone screenshots
  confirmed the map opens. The other access checks passed except one transient
  browser ERR_NO_BUFFER_SPACE before navigation; its focused retry passed.
  No orphan test browsers were found, and no unrelated processes were stopped.

### Batch 64 — keep access markers clear of map controls

- Native phone inspection reproduced the attribution panel covering the take-out
  marker. Access framing now uses its mobile profile, leaves room for zoom controls,
  and measures attribution height to account for wrapping on narrow screens.
- All six native framing checks passed, including 320px across browser profiles.
  Ordinary-width and narrow screenshots were reviewed during the investigation.
- Usage checkpoint: 25% weekly used / 75% remaining; paid credits unchanged.

### Batch 65 — keep state-map styles on state pages

- Extracted the state coverage map, fallback markers, and key into a 3.4KB
  stylesheet loaded only on state detail pages. Shared selectors retain their
  other consumers in global.css; score popups remain in the shared map stylesheet.
- All computed properties matched across eight native loaded/fallback layouts
  at 390, 760, 761, and 1280px. This includes the responsive breakpoint and static
  fallback markers when MapLibre cannot download.
- The preceding full build passed and generated 2,429 pages with the access-map
  link and framing fixes.
- State interactions and map keyboard shortcuts passed 55 browser checks with
  two existing desktop-only modified-click cases skipped on phones.

### Batch 66 — give map canvases meaningful accessible names

- Shared initialization now carries the page's map label onto the actual native
  canvas, replacing its generic Map label. This distinguishes access, saved-route,
  and score maps when keyboard/screen-reader users enter their controls.
- All six popup/focus checks passed, including native canvas naming after Escape.
  The public runtime mirror was synchronized.

### Batch 67 — clearer home condition-zone popups

- Replaced the crowded bold IN/OUT block beside a score with a call label and
  compact labeled access rows. Single-route headings come first; multi-route
  popups retain their regional context. Existing route/comparison actions remain.
- Home condition markers now use the shared marker constructor, removing the
  last separate native marker setup and retaining accessible names and selection.
- Native phone/desktop before/after screenshots were reviewed with synthetic
  grouped-route data; the access rows are more legible and both actions fit.
- Ten focused Home popup, selection, and failure-recovery checks passed, with two
  existing desktop-only cases skipped on phones. Usage: 27% weekly used / 73%
  remaining; paid-credit balance unchanged.

### Batch 68 — show home scores before detailed geometry finishes

- Reproduced grouped score markers staying absent while a route-geometry request
  was held open. Base-map readiness no longer waits for detailed river lines:
  markers and their actions are available immediately, then lines update in the
  background. Version guards still discard geometry for superseded filters.
- Six grouped-popup/loading checks passed after the regression failed before
  the fix. Late geometry updates preserve an already open popup and its DOM node.
- The preceding build passed with 2,429 pages, and 34 shared map/controller unit
  checks passed before this loading change.
- Native desktop/phone popups were verified while geometry was held open. All
  three existing deferred-tile/route-line checks also passed.

### Batch 69 — load featured access locations independently of river detail

- Reproduced the featured preview withholding both access markers during a slow
  geometry request. It now shows and frames those known locations first, updates
  the line later, and retains the usable preview if optional geometry fails.
- Late geometry still waits for map readiness and checks the current render
  before drawing or reframing. Superseded failures cannot clear the current map.
- Six delayed-geometry browser checks and the featured controller unit checks
  passed after the new browser regression failed before the fix.

### Batch 70 — select only the chosen home score zone

- Reproduced selecting a second score zone highlighting both it and the first
  marker for that river. The first marker is a list lookup entry, not a second
  selected zone; popup state now owns each zone marker's selected appearance.
- Four Home selection checks passed after the regression failed before the fix,
  with two existing desktop-only cases skipped on phones.

### Batch 71 — one active popup per map for keyboard selection

- Native keyboard activation reproduced two popups remaining open on one map.
  The shared popup lifecycle now closes that map's previous popup when a new one
  opens, while preserving an independent popup on another map.
- All 54 popup/river-comparison checks passed after the native regression failed
  before the fix. Coverage includes selection state, deferred content, Escape,
  separate maps, clipping, and late geometry. The public mirror was synchronized.
- Integrated map/app-banner validation passed 314 checks with 40 existing skips
  and no failures (tmp/map-polish-integrated-71.log).

### Batch 72 — isolate river-picker styles and remove order dependencies

- Moved river comparison picker styles into river-picker.css, loaded only on
  river comparison pages. Other pages no longer load roughly 24KB of picker rules.
- Before/after comparisons caught obsolete Save-button sizing and an active-filter
  rule overriding shared hover styling. Removed the obsolete sizing and preserved
  the hover behavior explicitly; all checked styles now match across 16 native
  list/map/filter/empty layouts at 390, 760, 761, and 1280px.
- Consolidated adjacent identical media blocks, with an AST check confirming the
  same ordered selectors, declarations, and media conditions.
- Adjacent media blocks reduced from 54 to seven; the stylesheet is about 24KB.
- All 33 focused river comparison checks passed after extraction.

### Batch 73 — avoid a stale selected-river caption on the home map

- The ready caption named the initially selected river and its zone count, but
  did not change when another river was selected. It now consistently reports
  map readiness; the active popup and route list provide selection details.
- This also avoids counting unavailable score groups as visible score markers.
- Usage checkpoint: 30% weekly used / 70% remaining; paid credits unchanged.

### Batch 74 — size popups to narrow map containers

- A native narrow-map test reproduced a popup wider than the available map area.
  Shared popup sizing now considers the map container as well as the browser
  viewport, so its horizontal padding can be satisfied without clipping.
- All 15 native popup-visibility checks passed after the narrow case failed
  before the fix. Coverage includes short/partly visible maps, reserved footer
  space, horizontal bounds, and keyboard access to actions and close controls.
- The preceding production build generated 2,429 pages successfully. The public
  runtime mirror was synchronized after the width change.

### Batch 75 — bound stalled geometry downloads

- Manifest, state, and route geometry requests now have a 15-second deadline.
  Failed requests leave the promise cache so the next load can retry; successful
  geometry and confirmed missing routes retain their existing caching behavior.
- Ten focused unit checks passed, including abort/retry coverage for all three
  request scopes. Six desktop/phone browser checks confirmed Home and featured
  markers remain usable while detailed geometry is still downloading.
- Usage checkpoint: 32% weekly used / 68% remaining; paid credits unchanged.

### Batch 76 — keep enlarged popup text within its container

- A 200% text-size check reproduced horizontal scrolling in narrow popups.
  Popup text now wraps long words when needed, and scrollable popups no longer
  reserve heading space for a close button that occupies its own sticky row.
- All 18 native popup-visibility checks passed across desktop and phone profiles.
  Enlarged text, horizontal overflow, close/action reachability, short maps, and
  narrow containers are covered; the phone rendering was visually reviewed.

### Batch 77 — distinguish unselected map filters from disabled controls

- Unselected score filters previously faded their entire button, including the
  clickable label. Labels now retain the shared readable secondary text color;
  only the sample marker fades, while the unselected background stays clear.
- Native before/after checks at 761 and 1280px confirmed the labels remain fully
  opaque and enabled; screenshots were reviewed. Home hides this legend on
  phones, so its mobile layout is unaffected. No interaction logic changed.
- Batch 76's production build generated 2,429 pages successfully.

### Batch 78 — discard stale Weekend map resize callbacks

- Selecting an empty Weekend filter while the map was loading reproduced an
  uncaught null-resize error on all three browser profiles. The delayed resize
  now verifies that the same map still exists and Map view remains selected.
- Six focused browser checks passed after the regression failed before the fix.
  Switching back to all routes creates a ready map and restores both result rows;
  stalled-map retry behavior also remains covered.

### Batch 79 — respect reduced motion during map navigation

- Browser testing reproduced smooth page/list scrolling after a map selection
  despite reduced motion being enabled. Shared map navigation now chooses an
  immediate scroll for that preference, including Home, Explore, and river-picker
  selection/reveal actions. Default motion retains smooth scrolling.
- Six desktop/phone checks passed for both motion preferences; each verifies
  that a scroll actually occurred. Existing Home/Explore selection checks passed
  on desktop with their four established mobile skips. Public scripts synced.
- The preceding full repository type check passed, including shared invariants,
  token/public-script checks, image audit, and mobile TypeScript validation.

### Batch 80 — keep map popups beneath page dialogs

- Native state-map inspection reproduced a route popup painting over site search
  results. Each MapLibre container now establishes its own stacking context, so
  the map's elevated popups and markers remain beneath surrounding page dialogs.
- The regression failed in all three browser profiles before the fix. All 30
  native popup/layer/focus/visibility checks passed afterward. Native state-page
  search was rechecked at 390 and 1280px, with desktop before/after screenshots
  confirming the popup no longer covers search results.
- Shared map/controller unit verification after batch 79 passed all 34 tests.

### Batch 81 — distinguish access connections from mapped river paths

- Route-detail maps previously drew temporary access-point connections with the
  same solid stroke as the detailed river path. Connections now use dashes;
  loaded river geometry switches to a solid stroke and a matching short caption.
- All 24 access-map checks passed, including loading transitions, failed-map
  retry, changing landings during loading, popup content, and control clearance.
  Native ready/fallback views were checked at 390 and 1280px and phone screenshots
  reviewed. Dash styling uses fixed arrays supported by the existing MapLibre
  version; no library upgrade or data-driven dash expression was introduced.
- Search dismissal checks at 390 and 1280px preserved the existing page position;
  no search behavior change was needed.

### Batch 82 — carry access-line clarity into the featured map

- Featured maps now use the same dashed access connection / solid river path
  distinction as route-detail maps. A short caption appears for connections.
- An older mobile rule hid the entire map caption area. It now allows the useful
  connection explanation while keeping the redundant location label hidden.
- Three focused browser checks and both featured-controller unit tests passed.
  Native 390/1280px fallback maps were inspected; the phone screenshot confirms
  the dashed line, access markers, and caption remain compact and legible.

### Batch 83 — free stalled Explore geometry queue slots

- Explore's separate overview/detail loader now gives requests a 15-second
  deadline. A timed-out detail frees its concurrency slot and uses the existing
  30-second retry cooldown; viewport changes still cancel obsolete requests.
- Two new regressions failed before the fix. All seven loader unit checks and
  nine desktop/phone Explore performance checks passed afterward, covering
  request sharing, viewport cancellation, progressive detail, and overview reuse.
- The preceding production build generated 2,429 pages successfully.

### Batch 84 — match access-map focus styling to the site

- The route's access-map anchor now uses the brand-colored rounded focus outline
  and a little scroll margin, replacing the browser's black rectangular outline.
- Native access-map views were reviewed at 390 and 1280px. Keyboard canvas focus
  already had a visible indicator, so its existing behavior was retained.
- Full repository type checking after batch 83 passed.

### Batch 85 — reflow river comparison for larger text

- Doubled text made the fixed minimum list/map columns extend over 500px beyond
  the page. A container query now stacks the workspace when its text-sized
  columns no longer fit, preserving the usual desktop arrangement at normal size.
- Narrow route cards also stack their score below the copy, fixing a reproduced
  overlap between the score badge and route name/conditions at doubled text.
- All 36 river-picker browser checks passed. Native 390/1280px checks at normal
  and doubled text sizes found no page or card overflow after the fix; screenshots
  were reviewed. The remaining audit flags are intentionally clipped skip links.

### Batch 86 — keep Explore filters readable with larger text

- Removed oversized input minimum widths inside Explore's filter panels. Location
  controls now wrap when necessary, and score/quick-filter grids adapt to the
  space needed by their labels instead of forcing cramped fixed column counts.
- Removed obsolete location grid overrides while introducing the wrapping layout.
  Native normal/doubled text checks at 390 and 1280px found no page or location
  panel overflow; the formerly clipped Clear button and filter labels are visible.
- Twelve focused reflow/filter/score/location/recovery checks passed, with six
  existing desktop-only cases skipped on phones. Native screenshots were reviewed.

### Batch 87 — reflow weather information inside route cards

- Saved-route weather labels could extend beyond the card at doubled text size.
  Shared route score rows now wrap when needed, and weather badges can wrap their
  labels while keeping the icon legible. Normal-sized cards retain a compact row.
- The regression failed on both phone profiles before the fix and passed on all
  three profiles afterward. Native Saved views at 390/1280px and normal/doubled
  text sizes were reviewed; the previously clipped weather label is now readable.

### Batch 88 — avoid a sunny icon for unknown Saved-route weather

- Saved cards labeled missing weather as “Weather unclear” but paired it with
  the calm/sunny icon. That state now uses a neutral question-mark icon.
- Three browser checks verify the unknown-weather label and styling alongside
  the larger-text card layout. Existing weather classification labels are retained.

### Batch 89 — keep route maps and decisions within enlarged-text layouts

- Reproduced a 164px page overflow at 390px with doubled root text. The route
  content, access-plan body, and explanatory copy now use shrinkable grid tracks;
  warning and score-availability text can wrap instead of widening the page.
- The decision dashboard stacks score and conditions within a narrow available
  text width. Its heading and timestamps wrap, and freshness fields stack when
  needed. Normal desktop still shows the compact score/copy arrangement.
- Native MapLibre views at 390/1280px, normal/doubled text now have zero page
  overflow. Access-map and dashboard screenshots were reviewed with synthetic
  route data. Nine focused reflow/access-navigation checks passed before the
  final timestamp refinement; the integrated run covers that refinement below.

### Batch 90 — reflow state live-pick cards

- Reproduced an 18px state-page overflow at doubled text: score/copy columns
  left the live-pick text outside its card. These rows now wrap with readable
  text widths. Native state views at 390/1280px and normal/doubled text show
  zero page overflow; both phone and desktop screenshots were reviewed.
- The batch-89 integrated run passed 346 checks and skipped 40 existing cases,
  with one stalled-download retry failure. Ten focused repetitions of that
  download sequence passed; no speculative production loader change was made.

### Batch 91 — isolate retries from an asset request still in flight

- The download-retry failure recurred in the 84-passing/2-skipped focused run.
  Keeping the old request alive briefly after timeout reproduced it in all three
  desktop repetitions: the browser reused that pending URL for the new tag.
- Failed map assets now receive an attempt query parameter on retry. The initial
  URL and successful shared downloads stay unchanged; a late old-request failure
  cannot fail the new request. Public runtime mirror is synchronized.
- Fifteen loader checks pass across all profiles, including stalled script and
  stylesheet downloads, late aborts, concurrent callers, successful-asset reuse,
  and WebGL recovery. State-card reflow checks passed in the focused run above.

### Batch 92 — load route-map styles only on route pages

- Moved 79 route overview/access map rules from global.css into route-maps.css,
  loaded only for route-detail pages. Shared marker/popup styling stays shared.
- All computed styles matched before/after across eight native MapLibre layouts:
  ready/fallback maps at 390, 760, 761, and 1280px. Matching adjacent media
  blocks were combined, and empty blocks left by extraction were removed.
- The preceding full typecheck/build passed: 2,429 pages in 17.14 seconds.

### Batch 93 — isolate state browsing styles without changing layout

- Moved state directory/live-pick/browsing rules into state-pages.css, loaded on
  state index/detail pages. The small base card inset stays before shared
  responsive card rules; a superseded alignment declaration was removed.
- Native computed-style comparisons match exactly for state index and Minnesota
  pages at 390, 760, 761, and 1280px. These comparisons caught the two cascade
  dependencies before completion. Adjacent matching media blocks were combined.
- All 42 route-map/loader checks passed after batch 92. The integrated run below
  includes the state extraction and the deterministic stalled-download fix.

### Batch 94 — keep high-contrast map scores legible

- Native forced-colors mode removed score-marker gradients, leaving transparent
  circles and basemap labels visible through score text. System Canvas backgrounds
  now keep markers opaque, and selection/focus has a system-color outline.
- Before/after native Home views at 390/1280px were reviewed. The score is now
  separated from the basemap; regular color-mode styles are unchanged.
- The batch-93 integrated run passed 353 checks, skipped 40 existing cases, and
  had no failures, including the formerly intermittent stalled-download retry.

### Batch 95 — let Home scroll past its embedded map

- Reproduced normal wheel input changing Home-map zoom while page scroll stayed
  fixed. Home now enables MapLibre cooperative gestures: ordinary scroll continues
  through the page; Ctrl/Command-wheel, two-finger panning, and zoom buttons remain.
- Native before/after wheel checks changed from stationary page/changed zoom to
  300px page movement/unchanged zoom. Six repeated gesture checks passed across
  all profiles, including one-finger page scrolling, two-finger map panning, Ctrl
  wheel zoom, and zoom buttons. Touch checks let page momentum finish first.
- Checked the pinned MapLibre 5.3.0 gesture implementation and official options
  documentation. Other map surfaces retain their existing gesture configuration.

### Batch 96 — parse public stylesheets during normal validation

- Added styles:check to typecheck, parsing all public CSS so malformed blocks are
  reported before browser review. PostCSS 8.5.23 was already installed; it is now
  an explicit dev dependency with only a one-line lockfile change.
- All 10 stylesheets pass; an intentionally unclosed temporary stylesheet exits 1
  with its file/line. Full typecheck passes with the new check included.
- Corrected the extracted state-style URL match to include /states without a
  trailing slash. HTTP checks cover both index/detail URL forms and exclusion
  from Home. The preceding full build passed: 2,429 pages in 15.79 seconds.

### Batch 97 — stop shipping route-specific rules to every page

- Moved 475 explicitly route-scoped rules (about 73 KB of rule text) from the
  global stylesheet into route-page.css, loaded only for route-detail pages.
  Adjacent matching media blocks are combined; shared base styles remain shared.
- Native comparisons match all computed styles for 5,367 sampled elements across
  eight layouts: four widths and ready/withheld condition states, including the
  header, overview, planning controls, and lower sections. The phone overview map
  was settled and the same scroll position restored before the final comparison.
- All 11 public stylesheets pass syntax validation. Focused route checks follow.

### Batch 98 — preserve access-marker buttons in high contrast

- Access-specific gradients still overrode the shared forced-color fallback,
  leaving IN/OUT without a visible button boundary. The system-color rule now
  has the right specificity, with an opaque background and a 1px system border.
- Native phone/desktop before-and-after views confirm readable, distinct controls.
  All 11 stylesheet syntax checks pass; regular-color rendering is unchanged.
- Thirty route/access/gallery checks passed after the route-page extraction.

### Batch 99 — keep keyboard map focus visible after zooming

- Reproduced Tab focusing a marker outside the map without moving the camera;
  one native run briefly scrolled the canvas container 3,359px before MapLibre
  reset it. This is a separate reproduced keyboard issue, not confirmation of
  the original intermittent Home scrolling artifact.
- Keyboard focus now pans an offscreen marker into view without opening a popup.
  Pointer focus does not trigger that pan. Map containers use overflow: clip to
  prevent programmatic scrolling of the canvas within its frame.
- The native regression failed on all profiles before the fix and passes after.
  Thirty-three popup/focus/visibility checks and 23 shared-runtime unit tests pass.
  Native before/after inspection confirms visible focus and zero internal scroll.

### Batch 100 — remove unused board-controller imports

- Removed 46 unreferenced imports from Home, Explore, and river-group controllers,
  using identifier-aware inspection. All remaining imports and module side
  effects are retained; this is a source cleanup without a behavior change.
- Home, Explore, and river-group adapter initialization checks pass. Native Home
  keyboard checks also confirm visible focus and zero horizontal scroll in every
  map ancestor at 390/1280px; the edge-marker pointer check passes on all profiles.
- The preceding full typecheck/build passed: 2,429 pages in 15.73 seconds.

### Batch 101 — avoid a dry-weather claim when weather is missing

- Reproduced the shared presenter classifying explicit stale/unavailable weather
  as “Mostly dry.” Those states now receive “Weather unclear” and a neutral
  question-mark icon. Existing valid-weather classifications remain unchanged.
- Twenty-one presenter/markup unit checks pass, including both reproduced cases.
  Four browser checks pass at desktop/mobile and 200% text; two Explore mobile
  cases are intentionally skipped because that layout uses compact map results.
- Native 390/1280px Home screenshots confirm the label and icon fit the featured
  card. These checks use synthetic weather fixtures, not live conditions.

### Batch 102 — isolate Explore styling without changing its layout

- Moved 142 explicitly Explore-scoped rules (about 22KB) out of the shared
  stylesheet into a stylesheet loaded only by Explore. Removed obsolete input
  size and panel-padding declarations exposed by the changed cascade order.
- All computed styles match for 2,308 sampled elements across eight native
  browser layouts: 390/760/761/1280px with default and expanded filters.
- Forty-eight focused Explore/weather/performance checks pass, with 18 intended
  profile skips. All 12 public stylesheets pass the CSS syntax check.

### Batch 103 — discard stale shared map-view callbacks

- Reproduced an application resize running after a quick mobile Map-to-List
  switch. The shared controller now coalesces delayed view updates and checks
  the current map identity and visibility before resizing. A superseded map
  scroll is cancelled too.
- The regression fails before the fix and all nine controller unit checks pass
  after, including replacement-map, repeated-update, and cancelled-scroll cases.
- Native inspection confirms no application resize runs on the hidden map and
  reopening restores its 321x270 canvas. MapLibre's own ResizeObserver still
  resizes hidden containers; that normal library behavior is unchanged.
- Nineteen focused map interaction checks pass, with 20 intended profile skips.
  This timing fix does not establish the cause of the original scroll artifact.

### Batch 104 — isolate Home styling and preserve shared rules

- Moved 220 Home-specific rules into a Home-only stylesheet, retaining the 16
  rules for other pages in the shared stylesheet. Removed an obsolete mobile
  input-height override so shared 44px sizing remains in effect.
- All computed styles match for 2,648 sampled Home elements across eight layouts
  (390/760/761/1280px, with/without location). Rechecked 2,308 Explore elements;
  all still match. All 13 stylesheets pass syntax validation.
- Seventy Home/banner/keyboard/map-gesture checks pass, with eight intended skips.
- Refined batch 103's scroll guard: a routine same-view refresh preserves a
  requested scroll, while selecting List cancels it. The additional regression
  failed before the refinement and all nine controller unit checks pass after.
- Full build preceding this batch passed: 2,429 pages in 16.72 seconds.

### Batch 105 — isolate Weekend styles and remove obsolete grid selectors

- Extracted Weekend-scoped styling into its own stylesheet and removed 33
  selectors targeting card grids absent from all current templates and renderers.
- All computed styles match for 1,792 sampled elements across eight native
  Weekend layouts, covering 390/760/761/1280px with/without saved location.
- Twenty-six focused Weekend interaction checks pass, with four profile skips.
- Additional native browser-back checks on Explore at 390/1280px preserve the
  exact camera, zoom, scroll position, and canvas dimensions after a route visit.

### Batch 106 — label the compact list accurately

- The shared map panel now shows “List view” in its mobile list layout instead
  of retaining a map-only eyebrow. Map/desktop layouts retain their original
  label; the compact Explore map still hides the introductory block as before.
- The reproduced Explore label regression passes on both phone profiles. Native
  390/1280px screenshots and accessibility snapshots confirm exactly one label:
  List view on mobile and Map view on desktop.
- The preceding integrated run passed 363 checks, with 42 intended skips and no
  failures, across shared map, recovery, popup, filter, banner, and gesture suites.

### Batch 107 — restore detailed tiles after offline panning

- Reproduced loss of detailed roads/lakes after reconnecting: offline tile
  failures stayed cached while only coarse parent tiles returned. An always-
  online run at the identical camera showed the missing detail.
- Shared map creation now remembers vector sources that fail while offline and
  reloads those sources through public MapLibre setUrl/setTiles APIs on reconnect.
  GeoJSON route overlays, camera, and marker selection remain intact. Maps with
  no offline failures do no recovery work; removed maps release their listeners.
- Twenty-five runtime unit checks pass. Native recovery passes on all three
  profiles, requiring the failed detailed tile URLs to return successfully and
  checking the original route source/layer, selected marker, and exact camera.
- Desktop before/after screenshots confirm restored roads, lakes, and labels.
  This is a separate reproduced connectivity issue, not confirmation of the
  original intermittent Home compositing artifact.

### Batch 108 — recover from a brief tile-server failure

- Reproduced the same missing detailed tiles after transient HTTP 503 responses
  while the browser remained online. A loaded map now coalesces network/timeout/
  server failures into one retry per vector source in a 30-second window.
- Retries wait 1.5 seconds and never run as a repeating loop. Initial map-load
  failures retain their existing explicit retry path; permanent HTTP errors are
  not retried automatically. Removal cancels pending work, and reconnecting
  recovers sources whose pending retry encountered an offline browser.
- The new runtime regression failed before the fix; all 26 runtime checks pass.
  Six native offline/503 recovery checks pass across desktop and both phones,
  verifying successful detailed-tile reloads and retained camera/route overlays.
- Desktop screenshots confirm roads, lakes, and labels return without navigation.
  The preceding full build passed: 2,429 pages in 16.74 seconds.

### Batch 109 — keep route structure out of unrelated pages

- Moved 142 route-detail/launch-plan structural rules (about 19KB) into a
  route-only base stylesheet. Shared FAQ chapter headings remain global for
  state, river-group, and guide pages.
- All computed styles match for 5,360 sampled route elements across eight
  settled native layouts. Eight state detail/index captures also still match.
- All 15 public stylesheets pass syntax validation. The preceding full build
  passed with 2,429 pages in 15.17 seconds.

### Batch 110 — remove unreferenced page-controller functions

- Removed 25 private functions (409 lines) from Home, Explore, river-group, and
  Weekend controllers, including obsolete card renderers and their isolated
  helper chains. No function had a reference outside its definition; exports
  and any textual references were retained. Removed two newly unused imports.
- Compared all remaining non-import statements against the pre-cleanup source:
  all 973 statements are unchanged. Module imports retain their side effects.
- Fifty-two focused initialization, selection, river-group, and viewport checks
  pass, with 20 intentional profile skips. Batch 109's route/state run also
  passed 73 checks with two intentional skips.

### Batch 111 — keep local map QA out of live analytics

- Network traces showed local browser checks posting visits to the live analytics
  endpoint. The shared layout now includes the tracker only in production builds.
- Local HTML changed from one tracker tag to zero. The production build retains
  exactly one configured tracker and passed with 2,429 pages in 15.78 seconds.
  Existing event tracking already treats an absent provider as optional.
- The preceding full typecheck/build passed with 2,429 pages in 16.25 seconds.

### Batch 112 — retain a requested chapter while route data loads

- Reproduced Route overview moving below its intended scroll position and the
  navigation reverting to Today when initial route data arrived after a click.
- Keep the requested chapter active and realign it after that initial render.
  Wheel, touch, pointer, or keyboard input cancels the pending adjustment, so
  loading never pulls a visitor back after they move elsewhere.
- Six new delayed-data checks pass across desktop and both phone profiles;
  the three uninterrupted cases failed before the fix. Forty-eight focused
  navigation, sharing, and keyboard-layout checks pass. Native desktop/mobile
  checks also settle the requested heading at the intended 22px offset.

### Batch 113 — recover rendered graphics after WebGL restoration

- Reproduced a fully white canvas after a simulated graphics-context loss on
  native desktop and mobile maps, despite the renderer reporting loaded again.
  Reloading tiles alone restored labels but left the background/roads missing.
- Rebuild the current style on graphics restoration, retaining route sources,
  camera, DOM markers, and open popups. Explore re-registers generated score
  badge images when that style loads. Recovery listeners detach on removal.
- Three native regressions failed before the fix and now pass through two
  interruption cycles, checking painted pixels, route lines, badges, selection,
  and popup state. Twelve native graphics/tile/badge checks and 27 runtime unit
  checks pass. The actual Explore page also recovers at 390px and 1280px with
  camera, canvas dimensions, and page scroll unchanged.
- Full typecheck/build passed: 2,429 pages in 15.61 seconds. Whitespace check
  passes. This is a distinct reproduced failure, not proof of the original
  screenshot's cause.

### Batch 114 — announce preview-map status without repeated messages

- Home and route preview-map status elements now expose polite status updates,
  matching the larger interactive maps when loading succeeds or fails.
- The shared status controller leaves identical text untouched, preventing
  redundant live-region text mutations during repeated renders.
- Twenty-eight runtime unit checks and 27 browser loader/keyboard checks pass.

### Batch 115 — retain updates during graphics recovery

- A targeted timing check reproduced score and route updates throwing while
  the rebuilt style was still loading. Queue shared overlay additions/removals
  until style load, preserving their order; discard pending work on map removal.
- Pause generated badge synchronization during the graphics interruption and
  render its latest state on style load. State route/label updates now use the
  same shared overlay path instead of bypassing recovery handling.
- Native regressions now include route updates during each recovery cycle.
  Twenty-nine runtime unit checks, 33 focused graphics/render checks, and 50
  state checks pass, with four intentional state-profile skips.

### Batch 116 — consolidate shared list/map panel styling

- Moved 100 shared panel rules (about 13KB) out of the global stylesheet into
  map-panels.css, loaded only on Home, Explore, Weekend, and Saved. Moved the
  small Home preview-map rule into its existing Home map stylesheet.
- Removed an obsolete back-button height and made previously implicit mobile
  typography overrides explicit. Retained Saved spacing and Home map corners.
- Compared 7,436 sampled elements across 28 desktop/mobile layouts. All styles
  match except four hidden Home back-button instances now correctly use none
  instead of flex. All 16 stylesheets pass syntax validation.
- 172 interaction/Saved checks pass, with 41 intentional profile skips. Full
  typecheck/build passed: 2,429 pages in 16.06 seconds.

### Batch 117 — show when map graphics are recovering

- Added a compact map status message during a graphics interruption, placed
  clear of zoom controls. It clears after the restored map reaches idle and
  leaves markers, popups, and keyboard focus usable.
- A late idle event while the context is still lost cannot clear the message.
  The status element and listeners are removed with their owning map.
- Three native desktop/phone checks pass through repeated loss/recovery cycles,
  including an explicit late idle event. Screenshots confirm the placement.
  Twenty-nine runtime unit checks and all 16 stylesheet syntax checks pass.
- Pixel checks use the repository's existing Sharp dependency.

### Batch 118 — keep Explore scores visible without remote fonts

- Reproduced a font-service failure hiding the entire Explore score source,
  including its dots, while the renderer still reported loaded.
- Draw numbers into the existing generated badge images, preserving colors,
  size, selection, collision handling, and keyboard controls. Score rendering
  now makes no glyph request. Cached badge images are released on destruction.
- Three blocked-font regressions failed before and now pass. Eighteen native
  badge/graphics and Explore performance checks pass, including score changes,
  style restoration, crowded-map selection, and readable painted numbers.
- Desktop/mobile before-and-after screenshots retain the badge appearance.
  A 101-score stress sample used 2,094,336 bytes of image data; first generation
  took about 22ms here, and unchanged synchronization measured under 1ms.
- The preceding integrated run passed 380 checks with 43 intentional skips.

### Batch 119 — recover cached basemap and route-label font failures

- A one-time 503 from the map font service left basemap roads/labels absent
  after connectivity and service recovered. Failed font promises stayed cached.
- Recognize failures from the configured glyph URL, clear that cache through
  MapLibre's public glyph API, and reload only affected vector/label sources.
  The existing coalesced retry/cooldown also covers initial font loading and
  reconnects; unrelated GeoJSON failures and permanent errors are excluded.
- Six native vector/GeoJSON regressions failed before the fix and now pass.
  Thirty-one runtime unit checks and 27 combined font/tile/loader checks pass.
  Camera, selected marker, and unrelated route sources remain intact.
- Full typecheck/build passed: 2,429 pages in 15.03 seconds.

### Batch 120 — retain keyboard position through automatic map-list refresh

- Reproduced automatic refresh moving focus from Home, mobile Explore, and
  Weekend result rows to the page body. Preserve the matching route and action
  when that row remains in the refreshed results, without scrolling the page.
- The shared helper preserves both selection buttons and Weekend route links,
  and respects focus a caller deliberately moves elsewhere during rendering.
- Eleven regressions failed before the fix and now pass across desktop and both
  phone profiles, with one intentional desktop-Explore skip (it uses cards).

### Batch 121 — keep focus outlines visible inside scrolling results

- Native screenshots showed the first Home result's outside focus outline
  clipped at its scroll container. Use an inset outline for map-result controls
  and Weekend row actions so the complete boundary remains visible.
- Eleven keyboard/refresh checks pass, with one intentional skip. Native Home
  and Weekend checks at 390px and 1280px retain focus and exact scroll position;
  screenshots confirm complete outlines. Forty shared runtime/controller unit
  checks also pass after Batch 120.

### Batch 122 — clearer Weekend actions and enlarged-text reflow

- Replaced the visually understated 10.72px route link with a bordered action,
  readable type, and a minimum 44px size. Its previous hit area was already large;
  this change improves recognition rather than fixing a tiny target.
- Narrow result containers stack the action and route details instead of letting
  the details collapse to zero width with 200% text. Featured scores, overview
  counts, weather, and photo actions also reflow in narrow text-sized containers.
- Native Chromium reviewed at 320px, 390px, and 1280px with 100%/200% text.
  Forty focused browser checks passed, five intentionally skipped. Three new
  regressions cover readable result widths, action size, containment, and navigation.
- Sixteen CSS stylesheets passed syntax checks. Full typecheck/build passed with
  2,429 pages in 16.46 seconds before the final scoped large-text CSS refinements;
  those refinements are included in the next integrated verification.

### Batch 123 — finish isolating Weekend base styling

- Moved 54 Weekend-only base rules (about 10 KB) out of global.css and into the
  existing Weekend stylesheet, ahead of its page refinements. Guide empty-state
  rules remain shared. No stylesheet requests or dependencies were added.
- All 3,424 compared elements across 16 native layouts retained identical computed
  styles: four viewport widths, normal/enlarged text, with/without a location.
- The integrated Batch 122 run passed 403 browser checks with 44 intentional
  skips and no failures; 40 shared runtime/controller unit checks also passed.

### Batch 124 — explain map initialization inside the visible map

- A throttled native Home check with 140 synthetic route records showed an empty
  map area during initialization, with its status below the viewport. Add a small,
  non-interactive loading label inside shared maps. The existing live region stays
  authoritative; the visual label is hidden from assistive technology.
- The label follows the existing loading state, disappears for ready/failure/empty,
  and does not add a full-panel overlay, animation, or JavaScript lifecycle.
- Native delayed-library checks passed for Home, Explore, Weekend, and Saved at
  390px and 1280px. Six Home failure/retry browser checks passed. Throttled scroll
  captures had no page errors; the original large white rectangle is still not
  reproduced and this loading clarification is not claimed as its root-cause fix.
- Batch 123 also passed 35 focused Weekend checks (four intentional skips) and
  syntax validation for all 16 public stylesheets.

### Batch 125 — make crowded Explore routes easier to tap

- Increased the invisible dot target from 22px to 44px diameter for coarse-pointer
  devices. Visible markers, collision placement, and mouse targets are unchanged;
  overlapping targets still choose the nearest route, with visible badges taking
  precedence.
- Four native phone regressions failed before the change when tapping 18px from
  a dot center. All now pass, including the unavailable-font scenario. Eighteen
  combined badge, graphics-recovery, and Explore performance checks passed.

### Batch 126 — isolate Saved-page styling without changing its appearance

- Moved 50 Saved-only rules into a conditional 6 KB page stylesheet. Shared save
  toggles remain global. Removed three superseded mobile rules and preserved the
  effective desktop spacing instead of reviving older overrides.
- All 3,496 compared elements across 24 native layouts match exactly: four widths,
  normal/enlarged text, populated/empty lists, and the note editor.
- Fifty-three focused browser checks passed with four intentional skips. All 17
  public stylesheets passed syntax validation. Batch 125's full typecheck/build
  passed with 2,429 pages in 16.42 seconds.

### Batch 127 — preserve Saved map position while editing and refreshing

- Note saves reused unchanged route data but rebuilt all map markers and fitted
  the camera again. Skip that redundant map work, preserving its marker nodes,
  selected route, and open popup. Changed calls still update their markers.
- Fit bounds only for a newly created map or changed saved-route locations, so
  refreshing scores retains the user's chosen map position.
- Six regressions failed before the fix and now pass. Fifty-nine focused Saved
  and note checks passed (four intentional skips). Native checks at 390px and
  1280px retained the exact center/zoom through both actions and kept the original
  marker/popup connected through note saves. Whitespace validation also passed.

### Batch 128 — show Weekend markers before optional river geometry

- Reproduced Weekend withholding every marker while canonical river geometry was
  pending. Publish markers, selection, and ready status first, then add route lines
  asynchronously. Clear obsolete lines when the route set changes and discard late
  results from superseded renders; line failures leave the usable map in place.
- Three regressions failed before the fix and now pass. Thirty-eight focused
  Weekend checks passed (four intentional skips). Native 390px/1280px checks with
  held geometry requests kept both markers, the open popup, and exact camera
  position before/after the delayed response, with no page errors.

### Batch 129 — distinguish Weekend river paths from access connections

- Weekend's fallback access-point connections previously used the same solid
  treatment as traced river geometry. Give fallback lines (including their white
  casing) a dashed treatment and keep traced paths solid.
- Add a short map key describing the two line types. A native renderer regression
  with both types verifies they render in separate layers with the correct feature
  classification. All three desktop/phone profiles passed; screenshots reviewed.

### Batch 130 — keep Weekend's camera through automatic score refreshes

- Automatic refresh previously fitted the same route locations again. Compare a
  stable, order-independent location set and only fit a new map or changed routes.
  Clear that set for empty filters so returning results receive a useful fit.
- Six existing focus regressions now also verify unchanged fit counts; all six
  failed before this fix. Forty-six focused checks passed, five intentionally
  skipped. Native 390px/1280px refreshes retained exact center and zoom.
- Batch 129 full typecheck/build passed: 2,429 pages in 15.63 seconds.

### Batch 131 — keep the personal-note editor usable with enlarged text

- At 320px with 200% text, the browser's implicit dialog width limit and a grid
  minimum pushed the textarea/actions outside the note editor. Set explicit width
  containment, allow the form column to shrink, and stack actions when necessary.
- Note text now scales with the user's font size while retaining a 16px minimum.
  Formatted the extracted Saved stylesheet without changing its rule signatures.
- Native overflow and save checks passed at 320px, 390px, and 1280px with normal
  and enlarged text; screenshots include reachable Save/Cancel actions. Twelve
  focused note checks and syntax validation for all 17 stylesheets passed.

### Batch 132 — keep State-map line meaning consistent

- State fallback reaches now use dashed lines/casing; traced reaches stay solid.
  The map key names access-point connections, and both line types retain selection
  handlers. Existing detailed status text continues to explain the source.
- A native regression holds canonical geometry, verifies the dashed fallback is
  drawn and tappable, then verifies the solid traced layer replaces it when data
  arrives. Forty-nine State checks passed, two intentionally skipped.

### Batch 133 — retain list focus when a refreshed route disappears

- When the focused route drops out of a nonempty refreshed list, focus now moves
  to the nearest remaining row/action instead of the page body. Matching routes
  still retain their own controls, and deliberately moved focus is respected.
- Nine new Home/Weekend regressions failed before the fix. Twenty combined
  refresh/focus checks now pass, with one intentional desktop-Explore skip.
- The integrated Batch 132 run passed 418 browser checks, with 44 intentional
  skips and no failures.

### Batch 134 — cancel delayed work after leaving the river map

- Guard deferred List/Map resize/render work with a view version and captured
  runtime. Switching back to List cannot later redraw a hidden/replaced map.
- Two phone regressions failed before the fix; 50 focused checks now pass, with
  one intentional desktop skip. Native rapid toggles and a 390px-to-1280px
  transition retained matching map/canvas widths without page errors.

### Batch 135 — remove the obsolete river-map collapse control

- Removed the hidden legacy Hide Map button, unreachable collapse branch, and
  its unused styles. The current responsive List/Map control owns this behavior.
- All 2,188 remaining elements across 16 comparison layouts retained identical
  captured styles. Fifty focused checks passed with one intentional skip;
  native rapid toggles and desktop resizing also passed.

### Batch 136 — retain saved-map selections when conditions refresh

- Reconcile saved markers by route slug, updating labels, tones, coordinates,
  and popup fields without replacing their controls. Removed routes still lose
  their markers; closed popups receive current fields when opened again.
- Keep MapLibre positioning classes, popup heading IDs, and focused links.
  Skip redundant resizing when locations are unchanged to prevent popup-induced
  camera movement during refresh.
- Three refresh regressions failed before this change. Sixty-six focused checks
  passed; the expanded 36-check Saved run also verifies repeated refresh, Escape,
  and reopening. Native 390px/1280px checks retained exact center/zoom and focus.
- Batch 135 full typecheck/build passed: 2,429 pages in 15.97 seconds.

### Batch 137 — isolate river-comparison page styling

- Moved 125 comparison-only rules (about 18 KB) out of global.css and into the
  existing conditional river-picker stylesheet. Shared State/Explore rules remain
  global. Removed a superseded mobile status-font override exposed by the move.
- All 10,744 elements across 32 layouts retained identical captured styles:
  390/760/761/1280px, normal/enlarged text, default/filters/map/empty states.
- The integrated Batch 136 run passed 429 checks, with 45 intentional skips.

### Batch 138 — move focus from a selected map stretch to its list control

- Selecting a stretch now focuses the matching visible route control and reveals
  it in the list. View/selection changes or deliberately moved focus cancel the
  delayed handoff, preventing a later hidden-list jump.
- Six native/harness desktop/phone checks failed before the fix. Fifty focused
  checks passed with one intentional skip; all six handoff cases passed again
  after adding the deliberate-focus guard.
- Batch 137's Group/State checks passed 84 cases, with three intentional skips.

### Batch 139 — remove unused legacy river-summary panel styles

- Removed 12 rules (about 1.6 KB) for former group-call summary, weather, signal,
  reliability, and inline-action elements. Repository searches found no remaining
  template or script references; shared active panel styles remain.

### Batch 140 — isolate and simplify shared route cards

- Moved 75 shared route-card rules into route-choices.css, loaded only on State
  detail and river-comparison pages. Kept State's base padding reset before the
  responsive rules; retained shared mobile link sizes and Save-button sizing by
  removing superseded local overrides.
- Removed 31 unused former expanded-card rules from the shared/comparison styles
  (about 3.3 KB), preserving dynamically generated compact-score tone classes.
- Captured comparisons retained all 10,744 river-comparison elements and 992
  representative State elements across normal/enlarged text and responsive widths.
  Eighty-four Group/State checks passed with three intentional skips; all 18
  stylesheet syntax checks passed. Batch 139's full build passed 2,429 pages.

### Batch 141 — keep coordinate-copy feedback attached to the current request

- A clipboard completion/reset can no longer replace feedback for a newer copy
  attempt or a changed access landing. Landing updates invalidate pending copy
  feedback while preserving the actual requested clipboard operation.
- Six browser regressions failed before the fix. Thirty-nine focused access-map
  and route-navigation checks now pass across desktop and phone profiles.

### Batch 142 — keep Saved maps usable while background tiles are pending

- Native tests reproduced a usable parsed style being discarded after seven
  seconds solely because a background tile was delayed. Added an opt-in
  style-ready path to waitForMapReady; its default full-readiness contract stays.
- Saved routes use that path, show markers immediately, and explain that the
  background is loading. The initial load event clears that note without replacing
  the map, popup, or marker. Invalid/missing styles still use strict timeout/retry.
- Thirty-two runtime units and 54 browser checks passed. Native phone/desktop
  regressions held tiles beyond the previous timeout, opened a popup, then
  released valid tiles and verified painted pixels and the same connected canvas.
- Source review: MapLibre 5.3 style loading/serialization and loaded() behavior:
  https://github.com/maplibre/maplibre-gl-js/blob/v5.3.0/src/style/style.ts

### Batch 143 — share initial-background loading feedback

- Moved Saved's initial-background feedback into the shared map status controller.
  It tracks the initial map load, clears the note on completion, and cancels stale
  listeners when a newer status replaces it or the map is removed. Later panning
  or route-source updates do not falsely reintroduce initial-loading feedback.
- Removed the corresponding Saved-only tracking state and callback. Thirty-four
  runtime units and 54 browser checks, including delayed native tiles, passed.
- Batch 142 full typecheck/build passed: 2,429 pages in 15.56 seconds.

### Batch 144 — keep Home and Explore results usable through slow tiles

- Both result maps now accept a parsed style without waiting for background tiles,
  using the shared initial-loading note. Route-overlay updates can use the parsed
  style; broad automatic style refreshes still wait for full readiness.
- Six native Home/Explore tests failed before the change and now pass. Each holds
  tiles past seven seconds, opens a marker popup, retains the canvas/popup, and
  clears loading feedback after the tile response arrives.

### Batch 145 — stabilize departure-position verification

- The integrated run passed 443 checks and skipped 45, with one scroll-restoration
  test racing a queued viewport update/font layout. History stored the actual
  departure position and the app restored it exactly; the test captured too early.
- Waited for that queued layout before setting the test departure position. Kept
  the exact restoration assertion. All 15 repeated desktop/phone runs passed.

### Batch 146 — tolerate slow backgrounds in featured and route maps

- Featured previews and route overview/access maps now place route information as
  soon as the style is parsed, with shared background-loading feedback. The strict
  seven-second deadline remains for a style that never becomes usable.
- Native tests exercise a location-enabled Home preview and both lazy route maps,
  including changing the launch point while tiles are pending. Nine desktop/phone
  checks pass with tiles held beyond the old deadline, then released. The route
  regression failed before the change. Thirty-six runtime/controller units pass.
- Extracted the blocked-tile fixture for reuse; corrected test setup to actually
  reveal the location-dependent preview and scroll the lazy overview into view.

### Batch 147 — reserve room for late map attribution

- Earlier style readiness exposed a 320-pixel access-map overlap: source credits
  arrived after the initial fit and wrapped over the take-out marker. Reserved
  compact attribution space in the shared access viewport profile, so the map
  does not need to jump again when source metadata arrives.
- All 36 route race/native background checks now pass, including the three
  previously failing narrow-control checks. Simplified initial access loading copy
  to distinguish route preparation from the separate background-loading note.

### Batch 148 — complete slow-background behavior across public maps

- Weekend, river comparison, and state maps now accept parsed styles and retain
  route selection while background tiles load. State filter and selected-reach
  messages use the same cancellable initial-background feedback.
- Nine new native checks failed at readiness before the change. All now pass with
  tiles held beyond seven seconds, usable selections/popups, and the same canvas
  after recovery. The comparison fixture explicitly supplies a current score.
- Focused browser validation: 102 passed, three desktop-only behavior skips.

### Batch 149 — keep Explore selection feedback consistent

- Selection and traced-route messages now use the shared status controller,
  preserving initial-background feedback and canceling stale completion messages.
  Selection does not announce ready while the map is pending or unavailable.
- Three native immediate-event assertions reproduced the loading-note flash before
  the fix. The complete interaction suite passes: 174 checks, 42 intentional skips.
- Batch 148 typecheck/build passed: 2,429 pages in 20.91 seconds.

### Batch 150 — synchronize overlay styling through graphics recovery

- Added an opt-in layer-style update to the shared GeoJSON operation, so paint,
  layout, and selection filters follow data through the recovery queue. Default
  source updates do not rewrite existing layer styling.
- Featured, detail, and river-comparison overlays use this path. Removed their
  separate paint/filter calls and an unnecessary constant-color Explore setter.
- Three native recovery checks failed with stale colors/filters before the change.
  All 86 focused browser checks now pass (one skip), including two native context
  restoration cycles, route changes, comparison selection, and delayed tiles.
  Thirty-seven runtime/controller units also pass.

### Batch 151 — remove superseded Home map declarations

- Removed 23 declarations whose later, equally or more specific rules cover all
  the same viewport widths. This removes the obsolete hidden mobile switch and
  overwritten switch sizing without weakening current styles.
- All computed styles matched across 2,242 elements in 38 map/list/unavailable
  layouts: 320, 390, 540, 541, 760, 761, and 1,280 pixels, normal and doubled text.
  Reviewed desktop/phone layout captures; all 18 stylesheets pass syntax checks.

### Batch 152 — visible and accessible background-loading feedback

- Shared result maps keep a small nonblocking label until background tiles arrive,
  including Home mobile Map view, where the visual footer is condensed. It uses
  a separate status attribute with cleanup on completion, replacement, and removal.
- Home mobile retains its live status for screen readers while visually hiding
  that footer text and the legend. The loading label itself avoids duplicate
  announcements. Six visual checks and two accessible-status checks failed before.
- Twenty-one native background checks now pass across all map surfaces; 57 focused
  loader/retry checks and 35 runtime units also passed. Reviewed the phone label
  against real MapLibre controls and markers with synthetic delayed tiles.

### Batch 153 — bind river-line interaction once per map

- River comparison now tracks delegated line handlers by map instance, rather
  than inferring their existence from a source that can be rebuilt. Refreshing
  replaced route sources no longer doubles popup creation from a single click.
- Three regression checks reproduced two popup constructions before the fix.
  All 44 comparison/graphics checks pass afterward (one desktop-only skip).

### Batch 154 — keep retry focus on a visible mobile control

- The combined 504-case run passed 455 and skipped 45, exposing four mobile retry
  focus failures after making the status screen-reader-accessible. A nonempty
  client rectangle no longer meant that this clipped status was visually useful.
- Home retry now prefers the visible mobile Map button and retains the desktop
  status target. All nine focused retry/background/accessible-status checks pass.

### Batch 155 — remove retired component styles

- Removed 78 selectors (7.7 KB) for retired summary metrics, the former history
  chart, mobile jump controls, and other obsolete Home/route components. Confirmed
  no references in current source or generated HTML; preserved live selectors in
  mixed selector lists and retained dynamic/library-generated classes.
- Full typecheck, stylesheet checks, and build pass: 2,429 pages in 16.59 seconds.

### Batch 156 — document maintenance boundaries

- Added `web-map-maintenance.md`, linked from the DRY roadmap. It records public
  map ownership, parsed-style versus background readiness, recovery-safe overlay
  updates, focus preservation, stylesheet inclusion, and focused native tests.
- Explicitly records that synthetic fixtures do not validate current conditions
  and that the original Home white rectangle still lacks a confirmed reproduction.

### Batch 157 — keep Saved markers clear of controls

- Increased Saved-map padding on the control and attribution sides. Two native
  phone checks reproduced zoom-control overlap; the opposite diagonal also
  exposed a desktop attribution overlap. Both are fixed without changing the
  existing camera-preservation behavior for automatic refresh or note edits.
- Six native diagonal checks and the Saved recovery suite pass: 45 checks total.
  Thirty-five runtime units pass; reviewed the native phone marker layout.

### Batch 158 — characterize other result-map corners

- Added native diagonal checks for Home and Weekend. Cleared the controlled
  fixture cache between initial viewport measurement and the next load, and
  asserted the new fixture score to avoid checking an older cached map.
- All 12 checks pass at desktop and phone widths. Their existing viewport profiles
  remain unchanged because this investigation did not reproduce an overlap there.

### Batch 159 — isolate remaining private Home base styling

- Moved the independent Home hero, featured-pick, and recommendation rules plus
  two keyframes to `home-base.css`, loaded before shared map panels and the Home
  refinements. About 22 KB no longer loads on other pages.
- Retained seven padding declarations in their original global positions because
  later shared wide-hero rules override them. Documented that cascade boundary.
- All 6,666 computed element styles match across 20 Home layouts: 320/390/760/761/
  1280 pixels, with/without location, normal/doubled text. Reference captures use
  the original stylesheet and settle the temporary refresh class first.
- The in-app browser tool still fails to initialize (missing kernel asset path).
  Native Chromium verification remains available; original-renderer reproduction
  is still unconfirmed.

### Batch 160 — final validation and user-requested stop

- Stopped new improvements at the user's request, preserving 5% weekly usage.
  No shorter Codex window is reported. Paid credits remain 2009.5977750000;
  no reset redeemed and no deployment performed.
- Final combined browser run: 476 passed, 45 skipped, one Android State-map line
  tap failure (popup did not open). That case passed all three isolated repeats
  without code changes. Keep its intermittent interaction/timing failure open;
  do not describe the combined run as fully green.
- Latest build passes: 2,429 pages in 15.32 seconds. Runtime/controller units:
  37 passed. Git whitespace check passes. Local Home responds HTTP 200.
- Reduced-motion investigation found that native MapLibre already suppresses
  nonessential easeTo animation; no redundant app override was added.
- Next priorities: reproduce the State-line tap failure under combined load;
  reproduce the original scrolling artifact in the in-app renderer when its
  browser tool is available; continue evidence-backed shared CSS cleanup.
- All app work is saved locally and uncommitted. Unrelated operations files were
  preserved. Review at http://localhost:4323/.
