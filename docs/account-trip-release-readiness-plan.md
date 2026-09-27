# Accounts and trips: clean-release completion plan

Assessed September 27, 2026 against PR #46. The findings table records the pre-implementation baseline; current progress and remaining release gates follow it.

## Release decision and scope

Keep the release candidate in draft while completing the blockers below. Ship the already agreed scope: Google and email accounts, web-to-mobile trip planning, personal paddling logs/photos, and shared itineraries/shuttles. Keep the welcome screen generic and introduce capabilities in context.

This is a completion plan, not a proposal to add more features. Apple/Facebook sign-in, chat, tracking, social feeds, and public profiles remain outside this release.

Verified during this assessment:

- PR #46 at `6a5f1314` passed the Operations gate (typechecks, workspace/unit tests, and production build): [run 36351301910](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/36351301910). It does not prove real provider sign-in or signed-device journeys.
- Firebase web registration, public build variables, private trip storage, and the maintenance setting were configured in the preceding work. Both production build workflows now receive the public Firebase variables in the PR.
- The public site's `/api/health/ready` returns 200; `/api/account` returns the expected unauthenticated 401; `/api/trips` still returns 404. The new trip implementation is not deployed.
- The local preview at `http://127.0.0.1:4321/trips/` was not listening. Browser automation also failed to initialize. This review therefore does not claim a fresh visual inspection or a successful live sign-in/device rehearsal.

## Baseline findings and implementation status

| Priority | Baseline finding | Current status |
| --- | --- | --- |
| P0 | Email callback failure could stop account initialization. | **Implemented, needs rehearsal.** Auth observation is registered before callback completion; invalid/expired-link errors stay on the page and preserve the email entry path. |
| P0 | Sign-out could discard an unfinished web editor without warning. | **Implemented, needs rehearsal.** Web sign-out names queued and unfinished edits before the user chooses to continue; sync status distinguishes editor drafts from saved changes. Native trip sync status now does the same. |
| P0 | Conflict recovery resubmitted the same stale revision and exposed operation JSON. | **Implemented, needs contention testing.** Recovery presents readable local/latest versions, merges only locally changed plan fields onto the latest version, and rebases later queued changes with fresh operation IDs. |
| P1 | Web users lacked account deletion controls. | **Implemented, needs provider/deletion rehearsal.** `/account/` supports Google/email sign-in, provider linking, recent-auth verification, deletion, and idempotent deletion-status recovery. |
| P1 | Email and editor save states were unclear. | **Implemented.** The email field is conditional, has a placeholder, and only offers callback completion when a link is present. Web/native status messages distinguish unsaved editor work. |
| P1 | Release checks missed trip routes and Firebase build configuration. | **Partly implemented.** Production builds fail when public Firebase settings are absent; API package/deployment smoke checks require `/api/trips` to exist and reject anonymous access. Authenticated journeys and built-bundle configuration still need proof. |
| P1 | Website and API could deploy independently. | **Partly implemented.** Frontend publication waits for account/trip auth routes and a versioned trip capability response, matching Firebase project IDs, valid Firebase Admin configuration, and private blob-list access. An authenticated user-data read/write smoke is still needed. |
| P1 | Maintenance work was unbounded and repeated completed deletions. | **Partly implemented.** Completed deletion tombstones stop repeated completed deletions. Periodic maintenance now advances in 100-blob pages with durable cursors and cleans expired uploads from small log metadata without downloading photo payloads. The synchronous account-deletion operation still scans all trips/logs/photos and needs a bounded resumable deletion job; alert verification remains. |
| P1 | Public privacy/deletion copy did not describe the account/trip behavior. | **Implemented, needs policy review.** Website account, personal logs/photos, shared-trip visibility, and deletion behavior are now described. |

P0 fixes prevent broken sessions or loss of user work. P1 items below are also required for the intended complete release, but should follow the reliability fixes.

## Implementation sequence and status

### 1. Make authentication recover reliably — implemented; rehearse

Primary files: `src/scripts/trips-page.ts`; extract a small web auth/session module so callback handling and trip rendering are not one initialization chain.

- Establish auth observation independently of email callback success. Handle invalid, expired, already-used, and mismatched email links locally, with a working way to request a fresh link or use Google.
- Use explicit loading, signed-out, sending, email-sent, callback, linking, signed-in, and error states. Show callback completion only when a callback is present; retain the entered email and show the resend countdown.
- Distinguish linking a provider from signing into a different account. Require an explicit account-switch decision when an email link would replace the current account; never implicitly attach another user's local changes.
- Preserve the trip/invitation destination through sign-in. Remove consumed callback data and completed invitation state without losing unresolved destinations.
- Handle unavailable browser storage without leaving the entire page stuck. Explain when local draft persistence is unavailable.
- Map provider errors to actionable messages, including popup cancellation/blocking, network failure, and an existing account using another provider.

**Complete when:** after opening an expired link, the user can request a new link or use Google without reloading; Google and email resolve to the intended Firebase UID; same-browser and other-browser email completion preserve the trip destination.

### 2. Protect drafts and account boundaries — partly implemented; rehearse account transitions

Primary files: web trip controller/storage, `TripRepository`, native `trip-session.ts`, and native trip screen.

- Represent editor dirty state separately from locally saved and cloud-synced state. Use clear statuses such as “Draft saved on this device,” “Waiting to sync,” and “Saved to your account.”
- Flush editor persistence before navigation/sign-out, including the debounce window. Warn about unfinished edits as well as queued mutations; provide save/retry/cancel choices before an explicit discard.
- Make failed sign-out recoverable without leaving a signed-in user attached to a disposed repository.
- Continue reviewing asynchronous initialization, photo responses, imports, and editor restoration for stale completion after account changes. The web trip repo is UID-bound and disposed on account transitions; cross-tab and rapid account-switch scenarios still require targeted rehearsal.
- Cover explicit logout, logout from another browser tab, token expiry, account deletion from another device, and rapid A → B → A transitions. Keep pending data isolated by account while clearing visible private content immediately.
- Apply equivalent lifecycle checks to native draft/photo storage and cold starts. Preserve recoverable data when storage is full or malformed.

**Complete when:** a draft typed immediately before leaving/reloading survives; signing out cannot silently lose edits; switching accounts never displays, uploads, or imports the previous account's private work.

### 3. Finish recovery and shared-trip usability — partly implemented; rehearse contention and uploads

Primary files: `TripRepository`, web/native trip editors, and trip API contracts/storage where a resolved operation is required.

- Replace JSON recovery as the primary UI with readable local-versus-saved summaries; retain copying a readable recovery summary as a secondary action. An interactive field-by-field merge editor remains a follow-up.
- Conflict retries use the latest revision and new operation IDs, merge locally changed trip-plan fields, and rebase later queued edits. Add contention coverage before release.
- Recovery now records HTTP status and offers replay only for conflicts with a current account copy. Deleted/forbidden trip recovery into a new private draft is still missing.
- Use the existing invitation-preview endpoint to show the trip/route/date before Join. Expired/revoked and already-joined states now have visible copy; full trips return their server error. Rehearse these states and explicit joining.
- Web and mobile share copy now distinguishes view-only and invite access, details what recipients can see, and explains link replacement and expiry.
- Per-photo pending/error states, retry/removal through recovery, and remaining-slot checks are in place. Rehearse that a photo failure does not obscure a saved log and that each photo retry is independent.

**Complete when:** two users resolve competing edits through the UI without copying JSON or losing either version; denied members cannot keep editing; a failed photo can be retried independently.

### 4. Complete web account controls and essential UX — partly implemented

- Add an Account destination with identity, connected providers, export, sign-out, and Delete account. Reuse the existing account deletion endpoint, recent-authentication requirement, and deletion-status recovery protocol.
- Explain deletion's actual effect on owned trips, transferred/shared trips, personal logs/photos, and other users' retained logs. Confirm completion only after the server reports it; clean local data afterward.
- Update the privacy/deletion pages and relevant store disclosure checklist to match the shipped behavior. This is a product-description correction; any store-specific compliance assessment should use the current store requirements during submission.
- Keep generic welcome/sign-in copy. Separate account management from My trips; avoid making the account page a second trip dashboard.
- The trip app no longer marks the entire page as a live region; individual status messages announce changes. Keyboard/focus stability, inline validation, a usable time-zone selector, explicit tab semantics, and a full screen-reader review remain.
- Undated drafts are labeled. Review Upcoming/Past selected state and empty/loading/offline/error next actions during the web accessibility pass.

**Known scope boundary:** website Saved routes still live in browser storage (`src/pages/favorites.astro`). Trip synchronization does not make those bookmarks account-synced. Keep that existing limitation explicit for this release; a shared bookmark adapter should be a separately scoped follow-up unless full bookmark parity is made a launch requirement.

**Complete when:** a web-only user can manage and delete their account without installing the app; a keyboard user can complete sign-in, edit a trip, and recover an error; copy accurately distinguishes private logs from shared plans.

### 5. Make deployment and cleanup observable and recoverable — partly implemented; owner setup remains

Primary files: both Azure deployment workflows, deployment configuration/smoke scripts, trip maintenance/storage, and setup runbooks.

- Validate all required public Firebase build variables for production instead of allowing a successful build that silently disables sign-in. Keep ordinary test builds independent of production credentials.
- A versioned capability endpoint checks the Firebase Admin credential and project ID and verifies that API trip storage can list the private container before web publication; the API and post-deploy smoke workflows require that capability. An authenticated trip read/write smoke is still needed.
- Frontend publication waits for the API account/trip paths and storage capability. For a stricter staged rollout, tie the frontend workflow to the exact intended API deployment revision.
- Completed deletion state is durable and prevents repeated completed account-deletion scans while retaining tombstones. Periodic maintenance uses bounded pages and persists its cursors; cleanup eligibility comes from small log upload records instead of reading photo payloads. The user-requested deletion endpoint still performs an unbounded full-container scan, so replace that synchronous scan with a bounded resumable job before high-volume launch; keep retries idempotent across API instances.
- Configure and exercise alerts for repeated sync/5xx failures, maintenance failures or missing heartbeat, and storage/auth credential expiry. Use existing monitoring and the owner's existing alert destination.
- Check actual proxy limits/timeouts with supported large photos. Verify logs/telemetry omit invitation tokens, email-link codes, and private content.
- Document rollback: hide new entry points or revert client assets while retaining a compatible API and stored data for clients already using trips. Do not treat reverting backend code below the new client contract as a complete rollback.

**Complete when:** an API or configuration failure blocks website activation; cleanup resumes after interruption without endless completed-deletion scans; operational failures produce a useful alert.

### 6. Prove the release journey and ship — CI gate passed; authenticated/device rehearsal remains

Automate focused regressions for stages 1–3 as each fix lands. Add authenticated browser coverage with isolated test identities/storage; do not use a developer's personal production account or data in CI. Keep the existing unit/API authorization and persistence suites.

Then run this end-to-end rehearsal on desktop web and signed Android/iPhone previews:

1. Fresh and existing accounts: Google/email sign-in, provider collision/linking, expired email link, sign-out, relaunch, and return to an invited trip.
2. Guest draft and legacy migration: preserve all fields, create two outings on the same route, reopen after a killed app/page, and avoid duplicate imports.
3. Web → phone → web: open the exact trip ID using a QR/App Link/Universal Link, edit on the phone, and see the change on desktop. Exercise installed/uninstalled, cold/warm, signed-out, and wrong-account cases.
4. Two participants: join explicitly, edit the itinerary, contend for the last shuttle seat, edit offline, reconnect, and resolve a true conflict.
5. Private logs/photos: save text offline, queue a photo, terminate/reopen, retry upload, test actual Android/iPhone image formats, and deny another member/public viewer access.
6. Revoke/remove/delete: revoke a link, remove a participant with queued edits, transfer ownership, delete the original account, and verify cleanup while the other paddler's personal log survives.

Use Metro/Fast Refresh for normal UI/TypeScript iterations. Generate a fresh native preview for the link/native configuration already added, and test the actual signed release candidates before publishing. Confirm the configured sign-in methods on each target platform; Apple/Facebook remain excluded from this plan.

PR #46 must stay draft until release activation is intentional: this repository's Operations workflow enables auto-merge for successful non-draft PRs. Promote/merge only once the required completion evidence is recorded, then deploy in the order from stage 5 and run the public-domain smoke checks.

## Delivery breakdown and exit criteria

Keep implementation reviewable in PR #46. Do not activate partial public releases; the three agreed trip features remain one first-release scope.

- [ ] Auth callbacks recover without reload; account identity remains intentional in real Google/email sign-in.
- [ ] Editor/pending/photo state survives interruption and stays isolated by UID on web, Android, and iPhone.
- [ ] True concurrent conflicts can be resolved without losing either paddler's changes.
- [ ] Web account management/deletion and public documentation are rehearsed and policy-reviewed.
- [ ] Authenticated API/storage smoke, capability gate, bounded cleanup, alerts, and rollback are verified.
- [ ] Authenticated browser coverage and signed-device rehearsal pass for the release revision.
- [ ] Live website/API checks pass after deployment; record deployed revision and known limitations.

No additional Firebase account or app registration is presently identified as necessary. Remaining human participation is expected for real Google/email verification and physical-device/store testing; implementation, CI coverage, and deployment preparation can proceed without adding new product scope.
