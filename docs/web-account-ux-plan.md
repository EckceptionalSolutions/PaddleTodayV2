# Web account usefulness and UX plan

Assessment date: September 29, 2026. Phases 1–4 and phase 5A implemented locally; not deployed. Staging/device/usability rehearsal and release remain. The initial evidence below describes the pre-implementation baseline; implementation notes and the remaining-work assessment record subsequent changes.

## Phase 1 implementation

- Dedicated header account dropdown outside discovery navigation, with My trips, Saved routes, Settings, and session-aware sign-in/sign-out. Request remains in the footer. The menu supports Escape, focus return, outside clicks, and narrow screens.
- New `/account/settings/` page for identity, connected sign-in methods, trip export, privacy, and account deletion help. It accurately describes browser-local saved routes; cross-device route sync remains phase 3.
- My trips now leads with planning, with next paddle, separate drafts and overdue plans, associated past logs, river-name search for larger collections, and distinct loading/error/empty states. Guest drafts can be resumed. Settings replaces the old account toolbar.
- Personal pages omit the floating app-download promotion and have a single main landmark. Selected trip views expose pressed state.
- Shared web auth initialization; the website bundler resolves one Firebase app instance even when native dependencies install another version. Public pages do not import trip rendering or its repository for the menu.
- Existing callback and invitation URLs are retained. Incomplete guest editors survive navigation into sign-in. Unfinished account edits are checked before sign-out.

Validation includes the full repository typecheck, a production Astro build, responsive browser checks, and isolated signed-in fixtures. Real Google/email provider interaction and signed native-device rehearsal remain release checks; no production account was changed.

The signed-in browser suite uses fake credentials and intercepted auth/account APIs. To reproduce, start the local build or development server with `PUBLIC_FIREBASE_API_KEY=account-ux-test-key` and `PUBLIC_FIREBASE_PROJECT_ID=account-ux-test`, then run `tests/visual/account-signed-in.spec.ts` with `PADDLETODAY_TEST_AUTH=1` and `PADDLETODAY_BASE_URL` pointing at that server. Never deploy the fixture build. Ordinary builds use the existing configured environment.

## Recommendation

Make the web account a persistent planning workspace: save promising routes, decide on a paddle, coordinate with friends, open the plan on a phone, and remember the outing afterward. Give personal navigation a dedicated account control in the header. Treat Settings as a small supporting page, and My trips as the useful destination.

Prioritize a coherent route-to-trip journey and account-backed saved routes before adding more account features. Desktop has a useful role in comparing routes, checking dates, and organizing a group; mobile carries the plan into the field and makes adding photos easier.

## Evidence and limits

- The live `https://paddletoday.com/trips/` page currently displays “Account and trip planning are paused.” Its header shows Today, Weekend, Explore, and Request. This review did not exercise a signed-in production account or a native build.
- Local browser inspection confirmed the signed-out layout: a large sign-in panel above My trips, search on an empty collection, and an app-download promotion overlapping the workspace. Local auth is unconfigured; sign-in success and populated states were assessed from source, not exercised.
- The checked-out `src/layouts/BaseLayout.astro` puts My trips directly in primary navigation. It differs from the live paused site; confirm the intended deployment branch and feature gate before implementation or release.
- `src/pages/account/web.astro` and `src/pages/trips/index.astro` mount the same trips script. The account entry is an authentication callback and trip interface, not a dedicated settings experience.
- `src/scripts/trips-page.ts` places Refresh, Export my trips, Connect Google/email, and Sign out above the trip content. Account maintenance competes with trip planning.
- Signed-out rendering stacks authentication, trip controls, search, and an empty collection. It does not give one clear starting action.
- The editor asks for a river/location plus a separate route choice and a manual “Load route access points” action. A route-page link supplies a slug and name, but does not automatically provide the access pair in the editor.
- Trip cards are text-only. Trip detail exposes editing, phone handoff, logging, repeating, conditions, participants, invitations, shuttle, and lifecycle actions in a long surface with little hierarchy.
- Upcoming is based on `status === 'planned'`, not whether the date is in the future. Past renders logs and non-planned trips separately, which can repeat an outing and mixes cancelled plans with paddles that happened. Search promises river or trip name but the trip filter only checks title.
- `public/styles/trips.css` defines its own hardcoded visual values. It does not build the trip experience from the existing semantic tokens and established route-page composition.
- `src/scripts/favorites-store.js` stores saved routes in localStorage; `src/pages/favorites.astro` explicitly describes browser-local storage. The mobile account sync contract already supports saved routes and notes, but the web favorites store is not connected to it.
- Mobile has separate account and trips screens plus backup/conflict controls. This is stronger structural separation, not evidence that native UX is already good. Both trip implementations have substantial forms and many actions.
- Existing code already provides stable trip identities, sync, guest drafts, invitations, RSVP, shuttle seats, phone links/QR, private logs/photos, and repeat-trip actions. These are foundations to improve and validate, rather than features to rebuild.

## 1. Dedicated personal navigation

Desktop header: retain Today / Weekend / Explore as the discovery navigation. Put a distinct account utility at the far upper-right, outside that navigation group. Separate it with spacing and alignment rather than styling it as another navigation pill. Keep search convenient; move Request into a lower-priority utility/footer position if space is tight.

- Signed out: person icon with a visible “Sign in” label. Its popover offers sign-in, My trips, and Saved routes, including access to local guest work.
- Signed in: avatar or initials, optional short name, and chevron. Accessible name: “Open account menu.” Reserve stable space while authentication resolves to avoid header shifts or a false sign-out flash.
- Menu: identity summary, My trips, Saved routes, Settings, divider, Sign out. A future Alerts entry should appear only once a real account-owned management surface exists.
- Keep paddling history under My trips → Past; avoid two labels leading to the same list. Invitations belong in My trips, with a count only when action is pending.
- Mobile web: keep the compact account control in the top bar, independent of the discovery navigation. Use a viewport-safe popover or sheet. Do not copy the native tab bar blindly.
- Use click/tap and keyboard activation, Escape dismissal, focus return, and reliable outside-click behavior. No hover-only access.

The dropdown is a utility entry point, not the only route into personal work. Save and Plan actions remain visible on route pages, and returning signed-in users can see a compact “Continue your trip” link on Today when relevant.

## 2. My trips: useful at a glance

Use the existing brand typography, warm surfaces, green accents, and spacing tokens. Reduce repeated borders, nested cards, oversized empty containers, and equal-weight action rows. Prefer compact route previews and clear dates over a generic account dashboard.

Suggested desktop composition:

1. Page title and one primary action: Plan a trip.
2. Upcoming / Past views. Drafts appear as a compact section within Upcoming.
3. Pending invitations, only when present.
4. Next dated trip as the strongest item, followed by compact trip rows or cards.
5. Each item shows route/reach, readable date/time, put-in → take-out, group response summary, and one clear Open trip action. Use a route thumbnail or real geometry where available, with a graceful text fallback.
6. Search appears when the collection merits it; search both title and route name. Avoid controls that serve no purpose for an empty account.

State rules:

- Empty: “Choose a route for your first trip,” with Explore routes as the primary action and Create a custom trip as a secondary path. Saved routes can supply starting choices when available.
- Signed out: explain the specific benefit briefly and allow starting a draft. Request sign-in when saving to the account, joining, or sharing, preserving the exact draft and destination.
- Upcoming: dated future plans sorted soonest first; undated drafts separate. Older planned outings become “Needs an update,” not fictional upcoming trips or automatically completed paddles.
- Past: one display item per outing, associating a private log with its source trip. A completed trip without a log offers Add notes/photos; a log offers Open paddle and Plan again. Cancelled plans are archived distinctly and never counted as paddles.
- Loading, offline, empty, and failed are different states. Do not show an empty-account illustration while data is still loading.
- Suppress the floating app-download promotion during personal planning; place Open on phone inside the trip instead. When authentication is unavailable, explain that state and do not present sign-in controls that cannot work.
- Successful sync is quiet. Pending, failed, or conflicting work gets a contextual status and human-readable recovery, not a permanent management toolbar or raw JSON.

## 3. Make planning feel connected to discovery

The first planning interaction should require only a route and an optional date, with a generated editable title. Keep custom locations possible without forcing catalogue users to enter the same river twice.

- Promote Plan this route near the existing route actions. Preserve selected put-in/take-out and any relevant date context from Weekend or the route planner.
- Load route details and access points automatically. Show a compact route summary and preview so users can verify the chosen reach.
- Default timezone from the route where reliable, otherwise the device with an explicit editable value. Preserve the trip's chosen zone across devices.
- Keep departure/return times, meeting stops, and shuttle setup optional and progressively revealed.
- After save, show the useful plan immediately. Offer Invite paddlers and Open on phone in context.
- Group trip detail into Overview, People & shuttle, and Notes/history as needed; private personal notes must remain separate from the shared itinerary. Keep the main overview visible rather than hiding all content behind tabs.
- Place current conditions beside the planned route, including timestamps and unavailable/stale states. Only show date-specific forecasts within supported coverage. Do not present today's conditions as a prediction for a later outing.
- Keep edit and share easy to find; put destructive and infrequent actions in a More menu. Clearly distinguish inviting someone to join/edit from sharing a view-only itinerary.
- Phone handoff offers a QR/link and a useful browser fallback. Real iOS/Android link behavior must pass before this benefit is advertised.

## 4. Make accounts useful even without a scheduled trip

Highest-value addition: account-backed Saved routes and private route notes across web and mobile. A user who only browses and bookmarks should benefit from signing in.

Reuse the existing account sync contract and reconcile it with browser favorites. Do not create a third independent saved-route model. Scope includes explicit guest import, slug-based deduplication, note conflicts, deletion tombstones, pending writes, account isolation, and sign-out behavior. A browser-only save remains available to guests. Explain “Saved on this device” versus “Saved to your account” accurately.

Saved routes should help users decide where to go: current condition summaries where available, private notes, and Plan this route. The web page already has a map foundation; improve its connection to planning rather than creating another dashboard.

Later opportunities, in priority order:

| Idea | User benefit | Dependency / decision |
| --- | --- | --- |
| Home area and preferred trip length | Start Today/Explore closer to the user's usual paddles | New preference persistence and real consumers; do not add inert settings |
| Compare two or three saved routes | Use desktop space to choose a weekend paddle | Shared route/conditions data and clear comparable fields; validate demand first |
| Add trip to calendar / print itinerary | Bring the plan into existing routines | Timezone-correct export; clarify exported snapshots do not update automatically |
| Account-owned condition alerts | Return when a saved route becomes relevant | Audit existing route-alert subscriptions, ownership, channels, and controls before integrating |
| Paddling history summaries | Remember routes and repeat enjoyable outings | Reliable completed logs; never infer paddled distance from planned trips |

Defer public profiles, social feeds, badges, chat, live tracking, and a separate generic account dashboard. They are not necessary for the core planning loop.

## 5. Settings should be small and dependable

Introduce a real Settings page with identity/sign-in methods, supported preferences, and data/privacy actions. Use a narrow readable layout with labeled sections and concise inline feedback. Show export, deletion, and sign-out in appropriate sections; retain confirmation and recovery for consequential actions.

Keep `/account/web/` working as the existing email callback. Successful authentication returns users to their draft, invitation, or requested page, not an unrelated settings screen. Keep existing trip and invitation URLs compatible.

Separate the shared auth/session layer from trip rendering so the header, Saved routes, Settings, and My trips have consistent identity. Avoid pulling the entire trip editor, QR generator, or trip catalogue into every public page just to draw an avatar.

## Delivery plan

| Phase | Scope | Acceptance gate |
| --- | --- | --- |
| 0. Confirm baseline and design | Resolve live/source discrepancy; inspect signed-in states in staging; create desktop and narrow-screen mockups for empty, populated, and editing states | One agreed route → draft → sign-in → saved trip journey, with deployment gates identified |
| 1. Repair navigation and page hierarchy | Dedicated account utility/menu; shared session; dedicated Settings; redesigned My trips and state handling; preserve callback/deep links | Account controls removed from primary navigation/content toolbar; empty/populated/error views coherent; keyboard and mobile web checks pass |
| 2. Deliver connected planning | Context-preserving route action, automatic access loading, shorter editor, clearer trip detail, phone handoff | A guest can start from a route, sign in without losing choices, save, reopen on another device, and return to edit |
| 3. Connect saved routes | Web/mobile account sync, explicit local import, isolation/recovery, plan from Saved | Save/note on web appears on phone and vice versa; switching accounts leaks nothing; interrupted import is repeatable |
| 4. Polish coordination and history | Invitation/RSVP clarity, shuttle hierarchy, single outing rows in Past, easier notes/photos, Plan again | Two accounts coordinate one trip; private logs remain private; repeat creates a new outing without overwriting history |
| 5. Validate and relaunch | Staging usability sessions, focused regression checks, signed-device rehearsal, monitored release | Core journeys pass and feature enablement is deliberate; no assumption that existing code is already production-ready |

Phase 1 produces a visible improvement, but phases 2–3 establish the reason to use accounts. Reuse and refine existing coordination/logging features throughout; phase 4 is polish, not removal of current capabilities.

## Technical work boundaries

- Header and shared components: `src/layouts/BaseLayout.astro` plus a new focused account-menu component and session module.
- Personal pages: `src/pages/trips/index.astro`, `src/pages/account/web.astro`, new Settings route, `src/pages/favorites.astro`.
- Split `src/scripts/trips-page.ts` by page/view concerns while retaining `TripRepository`, auth semantics, draft recovery, and shared API contracts. Preserve focus and entered text during background sync.
- Styles: reuse tokens and established web components; replace isolated hardcoded trip styling with scoped components, responsive layouts, and meaningful selected states.
- Saved-route integration: browser favorites adapter plus existing account API/contracts, with an explicit migration/import design before writes.
- Preserve private-page indexing/analytics policies and avoid recording user notes, route plans, tokens, or invitation details in telemetry.
- Fix duplicate/nested `main` landmarks in the personal page wrappers and give Upcoming/Past real selected semantics.

## Validation and success

Use behavioral and visual checks for the changed flows, not just a build:

- Header menu signed out/loading/signed in; keyboard, Escape, focus return, narrow screens.
- Guest route context through Google/email login, including callback recovery and unavailable auth.
- Empty versus loading/error collections; drafts; overdue plans; cancelled plans; associated trip/log deduplication; river-name search.
- Local import interruption, multiple devices, account switch, pending writes, sign-out, deletion, and conflicts.
- Invite versus view-only links; revoked/expired links; member permissions; private logs/photos.
- Real phone link/QR fallback and desktop → phone → desktop edits.
- Focused existing storage/API/repository suites plus updated web journey tests and screenshot review. No application tests were run for this planning-only assessment.

Establish baselines before choosing numerical targets. Measure route-to-draft and draft-to-account-save completion, time to first saved trip, abandonment at sign-in, successful reopen on a second device, saved-route sync success, invitation acceptance, and meaningful return visits. Use content-free telemetry consistent with existing privacy policy, or staging usability observations where private-page analytics are disabled. Evaluate utility by completed planning tasks rather than raw signups or account-page visits.

Recommended first usability task: “Find a route for Saturday, save a plan, invite a friend, and find that plan on your phone.” If people cannot complete this comfortably, adding more account features should wait.


## Phase 2 implementation — 2026-09-29

Implemented locally:
- “Plan this route” in the route overview and trip actions. Both follow selected access points and explicit date/time context. Weekend has no selected day to carry; dates remain optional.
- Automatic route/access loading with retry, preserved non-default IDs, generated editable titles, a route summary, and expandable access, time/time-zone, and meeting-stop fields. The route API has no reliable time zone, so the editor explicitly uses the device setting for review.
- Draft restoration through sign-in, including both unfinished editors and saved guest drafts. Saved trips get a stable URL.
- Saved-trip sections for Overview, People & shuttle, and private logs; history and less-used organizer actions are expandable. Route links preserve access selections. Route information shows its update time or an unavailable/stale state, with current readings distinguished from a future forecast.
- Sync-gated phone QR links, explicit same-account language, and an app/browser landing fallback. Invite and view-only panels explain their different access and expiration.

Validation: full typecheck and production build passed; route-context/storage unit checks passed; desktop, Android-sized Chromium, and iPhone-sized Chromium browser journeys covered context, drafts, sign-in transitions, save, handoff, and failure recovery. Screenshots were reviewed. Authentication tests use intercepted local fixtures; real provider sign-in and installed-app universal links still require staging/device rehearsal. No deployment was performed.


## Phase 3 implementation — 2026-09-29

Implemented locally:
- Web save buttons and private route notes now use the existing mobile `/api/account/sync` protocol when signed in. Guests continue to use the original browser store. No server schema or mobile migration is required.
- Saved routes offers an explicit import/keep-separate choice. Import deduplicates by slug, retains the original browser copies, records completed imports per account, and preserves differing notes for review. Retrying a partially recorded import does not duplicate operations.
- Account caches and pending edits are namespaced by UID. Account transitions immediately switch the displayed data and close private note editors. Sign-out retains pending edits for that same account without putting them in guest storage.
- Durable operations use stable IDs and base revisions. Response-loss retries are idempotent; deletion revisions prevent accidental resurrection; concurrent edits and expired epochs remain available for conflict review. Recovery download includes raw account-local data even if it cannot be parsed.
- Saved routes distinguishes loading, synced, pending, unavailable, and conflicting states. It refreshes on sign-in, reconnect, returning to the page, and periodically while visible. Saving/note feedback differentiates browser persistence from completed account sync.
- Each saved card has Plan this route. Saved-route sign-in callbacks return to Saved. The page excludes private-content analytics and the app-download overlay.
- Regression fixes keep the account popover above animated page sections and prevent a new trip from being started before the initial account transition finishes.

Validation: full project typecheck, focused runtime checks, production build, 18 repository/store unit tests against the real server sync implementation, and browser journeys at desktop/Android/iPhone widths. Cases include mobile-protocol data, web notes, public-page saves, removal/undo, offline reload, explicit import, conflicts, sign-out isolation, and callback recovery; existing favorites map/storage checks also passed after fixes. Browser auth uses local intercepted fixtures. Real provider sign-in and a signed physical phone remain staging verification steps. Nothing was deployed.

Saved-route sync follows the shared route-level contract (route identity and private notes). Browser-only URL/access-point context stays in the preserved browser copies; shared trips retain their own selected access points. Pending account edits remain on the browser until synced or explicitly resolved.

## Phase 4 implementation — 2026-09-29

Implemented locally:
- Invitation previews show the trip title/date, membership permissions, and retry guidance for unavailable links. Successful joins clear the saved invitation.
- Selected RSVPs, response counts, and a readable roster replace raw status labels. Organizer member controls are expandable.
- Shuttle cards identify drivers, passengers, available seats, full vehicles, and the current rider's vehicle. Paddlers still needing rides are named; full vehicles and driver assignments cannot offer an invalid seat action.
- Past groups plans with their linked logs into one outing, retains additional/imported logs, and offers notes/photos directly from completed plans. Cancelled plans remain separate when no actual paddle was logged.
- Private logs put date and notes first, with route/times and water observations expandable. Photo batches validate capacity and file size before queueing. Existing observation metadata is preserved.
- Opening a trip's log resolves its source-trip association, including imported IDs. Plan again resets editor identity, date, and stale log state, creating a distinct outing while preserving history.

Validation: full project typecheck and production build passed; 21 focused unit/server tests include two-account RSVP/shuttle coordination, private notes/photos, and repeat outings. Twelve browser checks passed across desktop, Android-sized Chromium, and iPhone-sized Chromium; ten existing signed-in account journeys also passed. Screenshots reviewed. Browser authentication is intercepted locally; live provider/device verification remains a staging step. Nothing deployed.

## Remaining work assessment — after phase 4

Recommendation: complete phase 5 in the following order. Additional account features should wait until the core journey has been exercised by real users.

### 5A. Harden the current journey before staging

Source review identified these follow-ups; this assessment did not reproduce them in a browser or change application behavior:

1. Restore unfinished edits on trip deep links. Account editor restoration currently requires no URL `id` and no selected trip. Editing an existing trip, reloading its URL, or repeating a trip from that URL can therefore leave the stored draft inaccessible in that view. Match drafts to their trip identity, preserve new-outing identity, and define Back/discard behavior explicitly. Test reload and navigation for both plans and private logs.
2. Make guest save match its label. “Save and sign in” currently saves locally and returns to the list with a notice. Present the sign-in step immediately with the draft preserved, or accurately label the action and expose an obvious continuation.
3. Replace trip/log conflict JSON with a readable comparison and recovery actions. The current recovery view prints mutation JSON and offers copy/retry/discard. A stale revision needs a deliberate merge or reapplication path, not repeated retries. Keep raw export as an advanced fallback.
4. Complete interaction resilience checks: keyboard focus after switching views, typing during slow saves/uploads, Back followed by reopening a draft, photo upload interruption, and current RSVP/shuttle changes from a second session. Existing tests cover substantial behavior but do not establish all of these cases.

### 5B. Rehearse against staging with real accounts and devices

- Google and email sign-in, email opened in another browser, provider linking, and return to the original draft/invitation/Saved destination.
- Web save/note → native mobile → web edits, deletion, account switching, offline reconnect, and conflicting changes.
- Two people join one trip, RSVP, arrange a shuttle, and verify that each person's logs/photos stay private.
- Actual iOS Safari and Android browsers, plus installed and uninstalled native-app handoff. Chromium phone viewports do not cover these platform behaviors.
- Verify the deployed frontend build, Firebase authorized domains/configuration, API authentication/storage, and intended rollout controls together. The initial live/source mismatch remains historical evidence, not a fresh production check.

### 5C. Validate usefulness and prepare release

Observe a small set of users complete: find a Saturday route → save a plan → invite a friend → reopen on a phone → add a private memory. Record where they hesitate or need help, and fix those points before adding features.

Prepare a focused change set for phases 1–4 plus hardening, excluding unrelated workspace changes. Document feature enablement and rollback, run the release regression suite on the candidate build, and monitor existing content-free auth/sync/invitation/photo error signals after deliberate deployment. Keep notes, tokens, and itinerary contents out of telemetry.

### Follow-up polish, after the release gate

- Compact route thumbnails or geometry previews in My trips and the editor.
- A contextual “Continue your trip” entry on Today for returning users.
- Clear per-photo queued/uploading/failed feedback rather than only the aggregate sync notice.
- Split the large trips-page controller by view and editor concerns as those areas are touched.

Calendar export and printable itineraries are candidates after usability feedback. Preferences, comparisons, alerts, profiles, and social features are not required to finish this rollout.

## Phase 5A implementation — September 29

- Existing-trip and private-log editors restore on matching deep links. Back durably keeps a draft and exposes Resume editing. Plan again clears the old trip URL and persists the new outing independently.
- Guest Save and sign in opens a focused sign-in step while retaining the local draft and a return-to-planning path.
- Trip/log recovery compares differing fields against a freshly fetched server record. Explicit local selections merge into that record; matching fields remain unchanged. The repository atomically replaces the reviewed operation with a new ID and the latest revision/baseline. Failed writes preserve the original conflict; additional queued edits prevent silent replacement. Unavailable records retain download/technical recovery options.
- Inputs lock during saves/uploads, view transitions receive keyboard focus, and background refresh does not reset conflict-review choices.
- The staging matrix, candidate procedure, rollback approach, and existing monitoring signals are recorded in `trip-features-release-setup.md`. No deployment, alert configuration, provider sign-in, physical-device check, or usability session was performed.

Validation: full project typecheck passed; 25 api-client tests and the recovery helper test passed; 21 desktop regression journeys and 15 hardening checks across desktop/Android/iPhone-sized Chromium passed. The first hardening run revealed a test that reloaded before the asynchronous Back save finished; it now waits for the visible Resume editing confirmation. Production build passed. Real staging URL and test devices/accounts remain required for phases 5B–5C.

## Visual UX reassessment — 2026-09-30

Reviewed the running local desktop experience in the signed-out state: `/account/web/?next=saved`, `/trips/`, `/favorites/`, and `/account/settings/`. This is a visual review of the current local build, not a live production check. Authenticated/personalized content was not exercised in this pass; use the fixture journey described above for that review. Ignore the Astro developer toolbar visible only in local development.

### What is working

- Account access is now clearly separated from Today / Weekend / Explore and has a visible “Sign in” label.
- The warm palette, typography, header, and personal-page width feel consistent with PaddleToday.
- The primary concepts are understandable: trips are plans and history; saved routes are candidates; Settings describes sign-in and data behavior.
- Empty states offer ways back into route discovery, rather than dead-ending.

### Main UX problems seen

- The signed-out account page says “Sign in” in the page heading and repeats “Bring your plans with you” with another explanation and the same provider actions. The value proposition and action are duplicated, with substantial unused space.
- `?next=saved` still offers “Continue with a draft” to My trips. That secondary path can lose the destination the person originally requested after sign-in. Return destination should be honored consistently, including when provider sign-in is unavailable.
- My trips gives an empty account a large framed blank state, while planning appears in more than one place (header/menu and page actions). The intended first step should read as one focused invitation to choose a route or start a custom plan.
- Saved routes repeats its empty message between the page intro and empty-state panel. Its sign-in/sync explanation and browsing prompts should be composed as one useful empty state. Browser-local saves must remain visibly available and distinct from account sync.
- Signed-out Settings is mostly two wide text rows; one is another sign-in prompt. The page promises managing personal data but offers little settings until authenticated. Clarify which controls are unavailable while signed out and make the remaining browser-local options directly actionable.
- Account entry, account landing/sign-in, and Settings currently compete to explain cross-device benefits. Explain the benefit once, where the user is choosing whether to sign in, and keep destination pages task-focused.

### Improvement plan

**1. Remove repetition and honor intent (first).** Make the sign-in page one compact, focused panel: a clear heading/value statement, Google/email choices, and a genuinely secondary “Continue without signing in” link. Preserve the requested return target (`saved`, trip draft, invitation, etc.) through the whole auth flow; make the guest link return to that same task. Do not imply sign-in works when local auth is unavailable; provide a clear unavailable state and keep guest functionality available.

**2. Tighten the three page states.**
- **My trips:** keep Plan a trip as the single page-level primary action; remove competing duplicate plan actions. For a new account use a compact, warm empty state with “Choose a route” as primary, “Create a custom trip” as secondary, and “Saved routes” only when it has content. Don’t show collection search until there is enough content to search. For populated accounts, lead with the next trip and make date, route/reach, and next action scannable.
- **Saved routes:** use a single heading and one empty-state explanation. Make “Explore routes” the primary empty-state action; describe browser-only saving and account sync as a short status/context, without repeating the sign-in pitch. Show import/sync controls only in the relevant state. Saved cards should lead with a useful route preview and a direct Plan action.
- **Settings:** organize real settings into compact labeled groups (account/sign-in, saved-route storage/sync, privacy/data). Signed-out view should state that account controls appear after sign-in, while exposing browser-local save management/import where supported. Avoid presenting a second full sign-in hero.

**3. Use one clear visual hierarchy.** Keep the existing brand surfaces, but reduce large empty card height, repeated borders, excess vertical gaps, and full-width horizontal rows on account pages. Align page titles, content columns, and action edges. Use one strong green primary action per view; make sign-in and destructive/maintenance actions quieter. Check mobile stacking so controls wrap in a clear order rather than creating wide empty rows.

**4. Make account navigation predictable.** Keep the dedicated account control outside discovery navigation. Its menu should expose the same destinations and labels everywhere, indicate the current signed-in/signed-out state, and close with keyboard/touch interactions. Ensure deep-link return destinations survive navigation through My trips, Saved routes, and Settings.

**5. Validate the redesign against real tasks.** In desktop and phone-sized layouts, test: signed-out visitor saves a route then signs in and returns to Saved; visitor continues as guest and resumes a draft; empty and populated My trips; empty and populated Saved routes; account with pending sync/error; Settings before and after sign-in. Ask a few paddlers to find a route, save it, make a plan, then reopen it. Track where they pause, and revise before adding profile, alerts, or social features.

**Suggested delivery order:** 1) return-target and repeated sign-in cleanup, 2) My trips and Saved routes empty/populated compositions, 3) Settings content hierarchy, 4) responsive/accessibility and end-to-end task rehearsal. Keep broader new account features out of scope until these core tasks feel obvious.

## Visual UX improvements implemented — 2026-09-30

- Sign-in now uses one concise value statement and a single provider-choice group. Guest continuation honors `next=saved` and `next=settings`; unavailable website sign-in explains that local saves and notes remain available.
- Empty My trips uses Explore routes as the primary action and custom planning as a quiet secondary link. The redundant page-level Plan action is suppressed when the upcoming list is empty.
- Saved routes has one empty-state prompt/action and hides irrelevant call-refresh status. Its empty state is rendered safely before account/local storage initializes and then hidden for loading, error, or populated states.
- Signed-out Settings now separates account access from browser-local saved routes and offers a direct path to those saves without duplicating the sign-in hero. Account controls are described as available after sign-in.
- Reduced oversized empty-state padding and removed duplicated Saved routes header tagline.

Validation: `npm run typecheck` passed. The desktop account-navigation visual suite passed all 8 checks, covering guest return targets, empty states, draft continuation, and account-menu breakpoints. The larger saved-route account suite was not run to completion because its preview-server setup timed out; core sync journeys still rely on the existing fixture suite and previous validation.
