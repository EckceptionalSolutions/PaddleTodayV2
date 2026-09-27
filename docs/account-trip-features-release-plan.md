# Account and trip features: first-release implementation plan

Status: implementation added September 26, 2026; production configuration and signed-device release rehearsal remain release gates. See [implementation and release checks](trip-features-release-setup.md) for the actual delivered behavior, configuration, and remaining verification. This document defines the target scope, not proof of deployment.

All three features below are required for the first release. The implementation stages are dependencies, not separate public releases. Where earlier account plans defer website accounts, photos, personal logs, or shared trips, this plan supersedes those scope exclusions. Google and email remain the sign-in methods in scope; this work does not reintroduce Apple or Facebook sign-in.

## Product experience

Build one connected experience: **plan a trip on the computer, coordinate with friends, open it on the phone, and record the paddle afterward.** Keep welcome and account screens generic. Introduce capabilities where people use them, without turning signup into a backup sales pitch.

| Feature | First-release outcome |
| --- | --- |
| Web-to-mobile planning | Create and edit an account-owned trip on the main website or phone. The same trip appears on both, with an Open on phone link and QR code on desktop. |
| Personal paddling log | Record completed outings, dates, water levels, photos, private notes, and whether the user would paddle again. View and edit the log on web and mobile. |
| Shared trip planning | Invite friends, collect attendance responses, coordinate shuttle seats and assignments, and maintain one itinerary that accepted participants can edit. Works on web and mobile. |

Use **My trips**, with **Upcoming** and **Past** views; put undated drafts in a small Drafts section. Add a visible Trips entry to mobile navigation and the website header/account menu. Keep Saved for route bookmarks. An invite joins the existing trip rather than creating a personal duplicate. Show organizer and participant roles in the trip detail.

Keep the first release focused on these outcomes. Live location tracking, emergency monitoring, group chat, public profiles/feed, automatic GPS recording, and live collaborative cursors are outside this plan. None is needed for the requested shared itinerary.

## Existing foundation and gaps

- `apps/mobile/src/components/prepare-trip-sheet.tsx` already has route/access selection, launch/return/check-in fields, group details, and sharing/export actions.
- `apps/mobile/src/lib/trip-drafts.ts` identifies drafts by route and access pair. It cannot represent two distinct outings on the same segment without a new trip identity.
- `packages/api-contract/src/account-sync.ts`, `apps/mobile/src/lib/account-backup.ts`, `src/server/routes/accounts.ts`, and `src/lib/account-sync-storage.ts` provide account identity, private synchronization, revisions, receipts, and Azure storage primitives to build on.
- `apps/mobile/app/account.web.tsx` explicitly presents a placeholder for web account access. Full account planning on the main Astro website still needs implementation; an Expo web preview alone will not satisfy this feature.
- The new `src/pages/share/trip.astro` and `packages/api-contract/src/shared-trip-plan.ts` provide a read-only snapshot encoded in a URL fragment. That snapshot cannot follow edits or be revoked. Shared planning therefore needs a separate server-backed trip and link model.
- Photos, completed outing records, memberships, invitations, and shuttle assignments need new contracts, persistence, permissions, and UI.

## 1. Establish trip identity and storage

Define shared contracts in `packages/api-contract`, API methods in `packages/api-client`, and a client-neutral trip synchronization layer with web and native storage adapters. Avoid copying mobile sync logic into Astro page scripts.

| Record | Essential fields and behavior |
| --- | --- |
| Trip | Stable opaque ID, owner UID, title, route/access IDs and display snapshots, planned date, optional launch/return time, IANA time zone, status, shared itinerary, revision, timestamps, deletion marker. |
| Membership | Trip ID, UID, role (owner or participant), RSVP (going/maybe/not going), joined time. Store with the trip so authorization and edits use one authoritative record. |
| Shuttle | Meeting place/time, vehicle label, driver member ID, passenger-seat capacity, passenger assignments, notes. No required plate or phone number. |
| Log entry | Stable ID, owner UID, optional source trip ID, actual date/time, route/access snapshot, water observations, private notes, would-paddle-again value (yes/no/unsure/unset), photo IDs, revision. |
| Water observation | Gauge ID/name, observed value, unit, measurement time, source, optional user-entered level/note. Preserve provenance rather than storing a bare number. |
| Photo | Owner UID, log-entry ID, private object reference, content type, dimensions, size, upload state, ordering, optional caption. |
| Invitation / view link | Random token hash, trip ID, purpose, expiry, usage limit, revocation state. Tokens never replace account membership for editing. |

Separate shared itinerary content from private log notes and photos in both the API schema and storage. An owner's account backup must never become the shared-trip document.

Keep Firebase identity and the existing Node API. Use a private Azure document per trip, separate private log records and photo objects, and per-user trip/log indexes. Do not append every trip and photo to the current 2 MiB account-sync document. Retain that endpoint for bookmarks and legacy compatibility.

Use ETag conditional writes, server revisions, bounded mutation batches, and idempotency IDs. Trip mutations and their receipts commit together. Membership and invite consumption must be checked in that same authoritative trip write; per-user indexes are discoverability aids, never authorization. Persist repair work for index updates in the authoritative mutation and run a retry worker so a crash cannot permanently hide an accepted trip. Paginate lists and cap participants, text, photo counts, and upload bytes server-side.

Migrate the route/access-keyed drafts through a durable migration manifest. Assign a stable ID once, retain every original field, and let repeated migration or interrupted sync resume without duplicate trips. Preserve unreadable records and recovery copies. Reconcile existing remote drafts before marking migration complete; older clients must not overwrite migrated trips or recreate removed drafts. Keep the legacy sync protocol supported while making migrated trip editing require a compatible client version.

Date handling must support a planned date without requiring a time. When a time is supplied, save the trip's explicit time zone and resolve ambiguous/nonexistent daylight-saving times in the editor. Do not assume the computer's time zone is the river's time zone. Preserve route names and access snapshots if catalog records later change; flag unavailable access for review.

**Complete when:** two outings on the same route remain distinct; migration survives interruption; stale edits cannot resurrect deleted trips; existing bookmark sync still works.

## 2. Deliver web-to-mobile planning

Implement production website Google and email sign-in using the same Firebase project/UID as mobile. Use a web auth adapter with the Firebase web SDK; keep native auth separate. Handle provider collisions without silently creating a second account, and preserve the intended trip destination through sign-in and email completion.

Add website My trips, trip detail/editor, and a Plan trip action on route pages. Reuse contract validation and date/access logic with mobile. Let guests begin a local draft; prompt for sign-in when saving across devices or inviting people, then import the draft without repeating data entry or presenting an import-choice wizard. Preserve conflicting data rather than overwriting it.

Update mobile Prepare Trip and My trips to use the same stable trip ID and data model. Both clients autosave locally, show pending/saved/error status accurately, and synchronize on changes, foreground, reconnection, and refresh. Use foreground polling initially, targeting visible remote changes within 15 seconds under normal connectivity. Pause polling in the background; do not promise continuous background execution.

Desktop **Open on phone** shows a QR code and copyable canonical HTTPS trip link. That private trip URL grants no access itself: the same signed-in account or an accepted member can open it. Configure Android App Links and iOS Universal Links, cold/warm launch handling, sign-in return destinations, and website fallback. When the app is absent, the website remains usable; users can reopen the link after installation without a promise of automatic deferred routing.

Provide **Save for offline** from the trip on mobile using existing offline packets. Show the last synchronized itinerary and condition timestamps when offline. Downloads and maps stay device-specific. A denied/removed membership stops future access and clears the cached shared trip when the device next connects; already downloaded information cannot be remotely erased from an offline device.

**Complete when:** a user creates a trip on the main website, opens that exact ID on Android/iPhone, changes access/time on the phone, and sees the change back on desktop without losing unsynced edits.

## 3. Deliver the personal paddling log

Add **Log this paddle** on a planned trip and **Add past paddle** in Past. Require only route/location and actual date. Allow a manual location for outings absent from the catalog. Pre-fill known details while keeping photo, level, time, and notes optional.

Logging a planned outing creates or opens that user's private log entry, keyed idempotently to the source trip. It does not create logs for friends or mark the group's trip complete. The organizer separately marks the shared plan completed/cancelled; each person controls their own record. Duplicate outings deliberately create new trip/log IDs.

Past entries show route, date, optional cover photo, and would-paddle-again response. Include date ordering, route search, edit/delete, and **Plan again**, which creates a new draft with route/access pre-filled and requires a new date. Never recycle the original trip or carry over its old condition readings.

Offer a gauge reading only when its timestamp makes sense for the actual outing. Historical lookup is best-effort using available provider/history data; show the source, unit, measurement time, and missing-data state. Current or forecast readings must never silently become recorded conditions for a past paddle. Users can add a manual observation when no suitable reading exists.

Support photo selection on web and native. Start with at most 10 photos per entry and a 10 MiB source-file limit per photo; resize accepted uploads to a bounded display size. Persist queued native photo files durably, survive restart/offline use, and retry uploads individually without blocking the text log. Verify supported image formats on actual devices, normalize orientation, strip location EXIF, and validate decoded content on the server.

Keep objects private. Issue narrowly scoped, short-lived upload access and authorize every download. Finalize upload metadata only after validation; account/entry deletion also removes photos. Clean up abandoned uploads with a scheduled worker. Add per-account storage quotas and a clear retry/remove-photo state. Do not promise browser background upload after a tab closes; persist queued bytes where supported and explicitly request reselection when browser storage is unavailable or evicted.

**Complete when:** a user logs a paddle offline, adds a photo, restarts the phone, reconnects, and sees the complete private entry on desktop. Other trip members and public-link viewers cannot read it.

## 4. Deliver shared trip planning

Add **Invite people** and **Share view-only link** as separate actions. Use an OS share sheet or copy link, with no contacts import or new email delivery service required for release.

- View-only links expose an explicit preview of route, access, planned date/time, and public itinerary items. Exclude member lists, shuttle details, personal notes, and photos. Set a 30-day default expiry, allow immediate revocation/rotation, and fetch current plan details on each open.
- Invitation links require sign-in and an explicit **Join trip** action before adding membership. Default expiry is seven days, with at most 20 total members per trip. Explain that anyone receiving the invitation can join until it expires, reaches the limit, or is revoked. Link-preview fetches must never consume invitations or join a trip.
- The owner manages invitations, members, cancellation/deletion, and ownership transfer. Accepted participants can edit route/date/shared itinerary, set their own RSVP, and coordinate their own shuttle participation. Show who last changed the plan. Members can leave; owners must transfer ownership or end the shared trip before leaving.
- Invite tokens grant only the stated join capability; public viewing tokens never permit membership or writes. Check current membership server-side on every trip read and mutation. A removed participant's queued edits must fail without resurrecting membership.

The shared itinerary contains launch/return plans plus ordered meeting stops with time, location, and a short note. Shuttle coordination records who is driving, available passenger seats, who rides with whom, and where cars will remain. Participants claim their own seats; owners can resolve assignments. Validate capacity and prevent double booking through a conditional server write. Show **Shuttle incomplete** when people still need a ride; avoid presenting a guessed assignment as settled.

Start with refresh-on-focus and foreground polling, plus a compact activity history and **Updated since you last viewed** indicator. Group chat and push/email change notifications are not prerequisites for the shared itinerary. Store last-viewed revision per member so important timing/access changes are visible on next open.

Use conditional field/section updates: non-overlapping changes may merge after the server verifies their baseline; competing changes to the same field preserve both versions and show a resolution prompt. Apply shuttle capacity changes as one validated operation. Offline shared edits remain pending and are re-authorized on reconnect. Provide copy/recovery of rejected local edits without publishing them.

Preserve already-generated fragment links as immutable snapshots and label that behavior clearly. Replace the primary share action for saved trips with the new server-backed view link. Old snapshots cannot be revoked retroactively or be presented as the latest itinerary.

**Complete when:** two accounts join the same trip across desktop/phone, change its itinerary, coordinate a shuttle, and see updates. Public viewers cannot edit; revocation, expiry, member removal, and simultaneous seat claims behave correctly.

## 5. Complete lifecycle and release infrastructure

- Extend account export and deletion to trips, memberships, log entries, and photo objects. Durable deletion jobs retry partial failures. On account deletion, delete owned shared trips unless ownership was explicitly transferred first; remove memberships from others' trips. Other paddlers retain their independently owned private logs and photos. Redact deleted-user identity from retained activity metadata.
- Keep caches, upload queues, mutations, and pending invitation state isolated by account. Sign-out/account switching must not upload a photo or apply an edit to the next user's account.
- Keep private responses out of CDN/service-worker shared caches. Redact link tokens, trip content, locations, and photos from request logs/analytics. Shared-link pages use no-referrer behavior and generic social previews; analytics must not collect their token-bearing URLs.
- Configure Firebase web credentials/authorized domains, API origin policy, verified app-link association files for preview/production signing identities, private Azure containers, upload CORS/limits, quotas, and scheduled cleanup/index-repair/deletion jobs. Verify existing settings before requesting new configuration.
- Add content-free operational counters for failed syncs, invitation redemption, conflicts, photo failures, and queue age. Alert on stalled jobs and authorization failures without logging user content.
- Fix the local Astro compiler dependency issue reported during the earlier sharing work, then prove clean-install web builds and production routes work in CI. Verify the issue still exists before changing dependencies.

## Delivery order and release gates

| Stage | Deliverable | Required proof |
| --- | --- | --- |
| 1 | Contracts, stable IDs, storage, migration, sync adapters | Repeated migration, interrupted writes, stale/deleted records, repeated route outings, and old-client compatibility tests pass. |
| 2 | Main website auth/editor + mobile My trips + verified links | One account completes desktop-to-phone-to-desktop planning on real Android and iPhone. |
| 3 | Private logs, water observations, photo pipeline | Offline restart/retry works; units/timestamps are accurate; photos are inaccessible to other users. |
| 4 | Invitations, memberships, current view links, itinerary, shuttle | Two-user editing, conflicts, revoked links, expired invites, removed-member offline writes, and last-seat races pass. |
| 5 | Lifecycle jobs, export/deletion, configuration, accessibility | Deletion resumes after interruption; account switching leaks no data; keyboard/screen-reader flows work. |
| 6 | Full release rehearsal | Website/API deployment and signed native preview builds pass the complete connected journey below. |

Ship all six stages together. Feature flags may hide unfinished work in previews but cannot redefine an incomplete public release as complete.

Release rehearsal: existing user migrates drafts; creates two future outings on the same river on desktop; opens one on their phone; invites a second account; both update timing and shuttle seats; phone goes offline; owner changes access; phone reconnects and resolves the conflict without loss; both independently log the paddle and upload private photos; view-only recipient sees the updated shared plan but neither personal log; owner revokes the public link; account deletion cleans up owned content without deleting the other paddler's log.

Run focused contract/API tests for permissions, migration, conflicts, idempotency, uploads, and lifecycle jobs; browser end-to-end tests for real website flows; and real-device checks for Google/email auth, links, photo permissions, background/resume, and offline restart. Use the existing native development build/Metro workflow for routine iteration. Rebuild native binaries for new native modules, permissions, or link configuration, and always test signed preview builds before release.

## Platform references

These support implementation details, not evidence that our production configuration is already correct:

- [Firebase web email-link authentication](https://firebase.google.com/docs/auth/web/email-link-auth): web email completion, authorized domains, and identity handling.
- [Expo linking overview](https://docs.expo.dev/linking/overview/): app-link configuration and runtime handling.
- [Expo iOS Universal Links](https://docs.expo.dev/linking/ios-universal-links/): website/app association requirements.
- [Azure Blob concurrency](https://learn.microsoft.com/en-us/azure/storage/blobs/concurrency-manage): ETags and conditional writes for concurrent changes.
