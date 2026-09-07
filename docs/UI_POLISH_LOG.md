# Main site UI polish — September 7, 2026

Usage guard: user authorized continuous local UI work using the reported weekly
window, stopping at 5% remaining. The shorter window is unavailable. No resets,
deployments, paid services, or infrastructure changes are part of this work.

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
