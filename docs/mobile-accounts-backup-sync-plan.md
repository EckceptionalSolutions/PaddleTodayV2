# Mobile accounts, backup, and sync

Date: 2026-09-23
Status: implementation in progress. Shared sync contracts, authenticated API routes, private account storage, mobile sign-in/linking, local backup/restore, deletion tombstones, a separate guest-data sign-in choice, and a private 30-day local recovery copy after guest import acknowledgement are in the repository. The account screen shows last-sync status and conflict copies with selectable text. Recent sync work adds a persistent client outbox and UID-scoped device data; interrupted local account switches and deletion requests can resume. When receipts reach their ceiling, the server now advances the epoch without applying the old batch, and the client preserves expired queued edits as reviewable conflicts. The deletion status endpoint retries a pending Firebase identity deletion when queried; an autonomous scheduled worker is still absent. Production launch depends on provider console setup, service secrets, platform callback files, and the release verification listed below.

## Product outcome

Let someone sign in with Apple, Google, Facebook, or a passwordless email link and recover their saved routes, personal notes, and trip drafts on another phone. The app remains useful without an account, and signed-in users can continue working offline.

The first release promises: **“Keep your saved routes, notes, and trip plans across devices.”** It does not promise that downloaded maps, live conditions, or phone notification permissions transfer automatically.

## 1. Scope and user experience

- Add **Account & backup** to More (`apps/mobile/src/screens/support-screen.tsx`) and a dismissible **Back up your saved routes** entry in Saved.
- Use one sign-in sheet for both account creation and returning users. No separate registration form, PaddleToday password, required username, or onboarding questionnaire.
- Show Apple on iOS, Google on iOS and Android, Facebook when configured, and **Continue with email** on both platforms. Apple sign-in on Android is not included in this release; users should connect email or Google while signed in on an Apple device to make that account recoverable on Android. Use the providers' approved button treatments.
- Email sign-in asks for an email address, sends a sign-in link, and returns the user to their original screen after verification. Show **Check your email**, **Resend link** with a cooldown, and **Use a different email**. No password is required.
- Include **Continue without an account**. Canceling a provider flow returns to the previous screen without an error alert or lost work.
- Explain before sign-in that backup sends saved routes, notes, and trip plans to the user's account. Request only the identity permissions needed for login; do not request friends, contacts, posting access, or tracking permission for login.
- Restore the session automatically on subsequent launches. Allow cached personal data to open while a session is being refreshed.
- Account screen: connected sign-in methods, backup status, last successful sync, **Sync now**, **Connect another sign-in method**, **Sign out**, and **Delete account**.
- Show clear states: **Backed up**, **Changes waiting to sync**, **Offline — changes saved on this phone**, **Sign in again to resume backup**, and **Review conflicting changes**. Say “Backed up” only after server acknowledgement and successful local persistence of that acknowledgement.
- Authentication failure must not block public river information or offline trip access. Never turn a failed read into an empty saved list.

| Data | First release behavior |
| --- | --- |
| Saved routes and personal notes | Sync membership, notes, and saved metadata |
| Trip drafts | Sync selected route/access pair and all existing planning fields |
| Offline trip packets, geometry, condition snapshots | Stay on the device; restored plans offer a fresh download |
| Route and area alerts | Keep existing behavior; explicitly show that alert setup is device/contact specific |
| Location, recent routes, query cache, UI preferences | Stay local |
| Photos, public profiles, trip log, memberships, shared trips | Future work |

Full website account/sync UI is a follow-up. The first release includes only the web authentication callbacks and account-deletion page required to support mobile accounts.

## 2. Recommended architecture

Use **Firebase Authentication for identity**, the existing **Node API for authorization and sync**, and a new private **Azure Blob container for account data**.

Why this fits this repository:

- Mobile already depends on React Native Firebase for analytics and Crashlytics, but has no Firebase Auth dependency yet.
- The app already has shared API contracts and a client in `packages/api-contract` and `packages/api-client`.
- `src/lib/blob-storage.ts` already exposes ETag reads, conditional writes, and a retrying `mutateJson` helper. Extend and test that foundation for private account storage.
- Saved routes currently use one AsyncStorage document; drafts use one key per route/access pair. Preserve the current screens through storage adapters rather than putting network requests inside UI components.

For the first release, store a small versioned document per Firebase UID containing account lifecycle state, routes, drafts, deletion markers, conflict records, and retry receipts. Derive a safe internal blob key from the verified UID; never use an email address or client-supplied path. Use a dedicated private container with server-only credentials and Hot access tier.

Conditional writes protect a whole account document across API instances. Process-local locks alone are insufficient. Start with a 2 MiB account-document ceiling, 64 KiB mutation-request ceiling, and 100 operations per batch; bound individual text fields and total record count. Return actionable limits while preserving unsynced local data. Measure document sizes and write contention during beta; move the repository implementation to a database before those limits constrain normal users.

Firebase provides identity, not this sync protocol. Keep auth, local persistence, conflict handling, and cloud storage behind separate interfaces. Do not introduce Firestore alongside Azure for this first slice.

## 3. Sign-in providers and setup

Implement all four launch options: Apple, Google, Facebook, and passwordless email. Stage Apple and Google first during development, then Facebook and email before the full planned release. Do not show a sign-in option until it is configured and tested for the current platform.

| Provider | Integration and setup |
| --- | --- |
| Apple | Native iOS flow only in this release. Android users can connect Google or email while signed in on an Apple device. Configure Sign in with Apple capability and Firebase provider. Use a fresh cryptographic nonce. Support Hide My Email and missing name/email on subsequent logins. |
| Google | Native account selection on both platforms. Configure Firebase provider, OAuth client IDs, iOS URL scheme, Android package/certificate fingerprints for development, EAS builds, and Play App Signing. Prefer a maintained Android Credential Manager integration. |
| Facebook | Configure Meta application, platform IDs/key hashes, valid redirects, privacy policy and data-deletion callback, and live-mode access for ordinary users. Use iOS Limited Login with a fresh nonce; test login with and without the Facebook app installed. Disable unrelated SDK advertising and automatic event collection. |
| Email magic link | Enable Firebase email-link authentication; configure the authorized domain, Firebase Hosting link domain, iOS Universal Links, Android App Links, and branded sender/template. Verify actual native Auth SDK versions support the current Hosting-based flow. Do not use retired Firebase Dynamic Links. |

Email flow requirements:

- Use Firebase's email-link APIs for issuing and consuming links. Treat links as single-use credentials, handle expired/used/invalid links with a clear resend path, and never log action codes or full authentication URLs.
- Remember the pending email and intended action locally for same-device completion; clear them after completion or cancellation. If the link opens on another device, ask the user to enter the email again. Never embed the email in the redirect URL or trust an email supplied by a URL as proof of ownership.
- Allowlist callback destinations. Handle cold-start and already-open-app links, and provide a useful browser fallback when the app is absent without promising deferred deep linking after installation.
- Use a neutral send confirmation that does not reveal whether an account exists. Configure service-side abuse protection and sending quotas; a UI resend cooldown alone is insufficient. Test delivery and spam-folder behavior with major email services.
- Distinguish signing in, connecting email to the current account, and reauthentication. Connecting email requires a verified email-link credential and must retain the existing UID; a link intended for connection or deletion must not silently create or switch accounts.
- Permit email users to reauthenticate with a fresh link before account deletion, including on the public deletion page. Linking email to an existing social account follows the same collision and ownership rules below.

Use Firebase's current Hosting-based mobile email-link flow and confirm installed SDK compatibility during the build spike. [Firebase email-link authentication](https://firebase.google.com/docs/auth/android/email-link-auth) and [Dynamic Links migration guidance](https://firebase.google.com/support/dynamic-links-faq).

Add `@react-native-firebase/auth` and Firebase Admin on the backend. Select and pin provider adapters during the initial native-build spike: Apple authentication adapter, Google sign-in adapter, and `react-native-fbsdk-next`. Confirm compatibility with the repository's Expo 54, React Native 0.81, and Firebase 24 versions before making any unrelated framework upgrade. The current React Native Firebase social-auth guide documents provider credential exchange and Facebook Limited Login; the exact Google adapter must be chosen against current Credential Manager support and licensing. [Social authentication](https://rnfirebase.io/auth/social-auth)

Use native development builds for provider QA. Expo Go and mocked mobile-web tests are not proof that native login works. Keep a web/mock auth adapter so the existing browser suite and guest web preview continue to run. [Expo Google authentication guidance](https://docs.expo.dev/guides/google-authentication/)

Separate Firebase core/auth configuration from diagnostics: `apps/mobile/app.config.js` currently enables Firebase only for preview and production diagnostics. Add explicit development-auth configuration and isolated nonproduction credentials without enabling analytics as a side effect. Store provider secrets only in secret management; public client IDs are configuration, while Apple signing keys, Meta app secrets, and Admin credentials must never enter the app bundle.

Account identity and linking:

- Use Firebase UID as the stable owner. An email address is neither an authorization credential nor a reliable cross-provider identifier.
- Configure and test Firebase's provider-linking/account-collision behavior. Preserve the same UID when linking a new provider from an authenticated account.
- Reauthenticate before linking/unlinking; never allow removal of the last usable sign-in method. Never merge data solely because two providers return the same email.
- On a collision, explain how to sign in with the existing method and connect the other method from Account. Do not disclose a list of accounts for an arbitrary email.
- If a credential already belongs to a separate UID, preserve both accounts and provide a clear recovery path. Automated merging of two established accounts is outside v1; any later merge must authenticate ownership of both accounts.
- Passwordless email is included in v1 as an alternative to social login. No phone/SMS or custom-password login in v1.

Firebase supports linking providers to a single UID; verify linking against the selected native SDK and the configured project during the spike, including current documented issues. [Firebase account linking](https://firebase.google.com/docs/auth/web/account-linking)

## 4. Account API and data contract

Add shared schemas in `packages/api-contract/src/account-sync.ts` and token-aware methods in `packages/api-client/src/index.ts`.

Proposed endpoints:

| Endpoint | Purpose |
| --- | --- |
| `POST /api/account` | Idempotently create account metadata for a verified identity |
| `GET /api/account` | Read account status and supported sync version |
| `GET /api/account/sync` | Read the bounded account snapshot, epoch, and revision; unchanged responses may use a private ETag |
| `POST /api/account/sync` | Apply operations conditionally and return acknowledgements, conflicts, and resulting revision |
| `DELETE /api/account` | Start a durable, idempotent deletion job after recent authentication |
| `GET /api/account/deletion` | Report deletion status using a restricted receipt issued at deletion initiation |

The API verifies Firebase ID tokens and derives ownership only from the verified token. Check project, issuer, expiry, revoked/disabled users, and account lifecycle state. Public scoring endpoints stay public. Send account responses with `Cache-Control: no-store`; exclude these paths from shared caches and general persisted React Query state. Never log tokens, notes, draft content, or raw email. [Firebase token verification](https://firebase.google.com/docs/auth/admin/verify-id-tokens)

Each operation carries `operationId`, `deviceId`, `accountEpoch`, `entityType`, `entityId`, `baseRevision`, operation kind, and validated payload. The server assigns revisions and timestamps. Device identifiers organize retries; they do not authorize access.

- Route identity: existing stable route slug, retaining river grouping and display metadata. Missing/retired catalog routes remain visible as unavailable rather than disappearing from backup.
- Draft identity: canonical encoding of `[routeSlug, putInId, takeOutId]`, matching the existing single-draft-per-pair model. Retain route/access names for display without the catalog.
- Draft payload: `launch`, `expected`, `checkIn`, `groupSize`, `boat`, `vehicle`, and `note` from `apps/mobile/src/lib/trip-drafts.ts`.
- Keep route notes capped at the existing 2,000 characters; define explicit bounds and schema validation for every draft field before implementation.
- Enforce per-UID and per-IP request limits, timeouts, payload limits, and a supported schema/version check.

## 5. Offline sync and conflict rules

Use local state as the immediate UI source and a durable outbox for pending work. A save must atomically persist the edited state and its operation in the same per-account local document, or through a staged write with an atomic head-pointer switch. Do not use independent, uncoordinated AsyncStorage writes for data and outbox.

1. Persist a local edit before displaying it as saved.
2. Sync after sign-in, app foreground, regained connectivity, a short debounce after edits, and manual refresh. While a signed-in user is viewing Saved, a trip draft, or Account in the foreground, check for remote revisions every 15 seconds; suspend polling when backgrounded, offline, or unauthenticated. Do not promise continuous background execution.
3. Fetch the current cloud snapshot, overlay pending local work for display, and send operations against their original base revisions.
4. Apply independent valid operations using an ETag-protected read/modify/write. Commit operation receipts with the changed entities in that same document so a retry after a lost response cannot double-apply a change.
5. Persist acknowledgements and the new local baseline before removing outbox entries. Never clear newer local edits because an older request finished.
6. Retry temporary failures with bounded exponential backoff and jitter. Pause for expired authentication; refresh once, then ask the user to sign in again. Keep the outbox intact.

Conflict policy is conservative and explicit:

- Different entities sync independently.
- Identical saves converge without asking the user.
- Concurrent edits to the same note or trip draft preserve both versions in a durable conflict record. Show a simple comparison with **Keep this phone's version**, **Keep backed-up version**, and **Copy text**. Resolution is itself a conditional operation.
- A stale edit cannot silently overwrite a newer edit or resurrect a deleted route/draft. Preserve the stale content as a recoverable conflict.
- Explicitly re-saving a deleted route is allowed only against the current deletion revision.
- Use server revisions, not phone timestamps, for ordering.
- Retain tombstones and operation receipts within a sync epoch. When bounded compaction is needed, atomically increment the epoch. Reject old-epoch mutations and require a full reconciliation that preserves pending edits for review; never rebase and upload an old device snapshot automatically.

Azure's ETag/If-Match mechanism is the storage concurrency primitive; entity revisions implement the user-facing conflict policy. [Azure Blob concurrency](https://learn.microsoft.com/en-us/azure/storage/blobs/concurrency-manage)

## 6. Migrate existing users without losing their data

1. Read and validate existing saved routes and draft records. Preserve unreadable records and report partial recovery; do not upload an empty replacement.
2. Save a verified local recovery copy and a migration manifest before changing storage namespaces.
3. On first sign-in, show **Add this phone's saved routes and trips to your account** with counts, **Keep separate**, and **Cancel sign-in** choices. The separate path archives guest routes, drafts, and personal offline packets under the guest namespace, activates only the selected account's copy, and restores the guest copy after sign-out.
4. Import using deterministic migration operation IDs. Union route membership; preserve differing notes and drafts as conflicts. Never replace the entire cloud account with the local list.
5. Record completed migration IDs and ownership so interrupted migration is resumable and the same guest data is not automatically imported into a different account. Interrupted namespace transitions resume, operation IDs are now deterministic for identical account/epoch/revision/content mutations, and guest import is removed from the active guest namespace after staging its recovery copy. A separate migration manifest remains outstanding.
6. Keep original recovery data until all intended imports are acknowledged. Retire it from normal guest display after successful import; the mobile client now keeps the imported guest namespace in an account-scoped recovery copy, starts its 30-day retention after sync has no pending operations or conflicts, and removes it during account deletion.
7. Offline packets containing personal draft snapshots inherit the imported account's ownership. Public geometry may stay shared, but personal packet content must not appear for a different user.

Namespace all account-local state, outboxes, conflicts, and personal offline packets by UID. Guest storage remains separate. Switching accounts must cancel requests and subscriptions, clear personal in-memory/query state, and ignore late responses from the previous session. The mobile client now persists the local-state transition before switching namespaces and resumes an interrupted transition on the next activation.

Sign-out normally syncs pending changes, then removes that account's private local state and returns to guest mode. If offline or sync fails, offer **Stay signed in** or **Discard unsynced changes and sign out**, with an explicit count and confirmation. Never silently discard edits or expose an old account's data as guest data. Unimported guest data remains separate.

## 7. Account deletion and backup recovery

Account deletion is part of the release, not later cleanup:

- Require recent provider authentication, explain the consequence, and confirm once.
- Atomically mark the account as deleting before accepting any further sync writes. Create a durable deletion job and a narrowly scoped status receipt.
- Revoke sign-in sessions and provider grants where required, remove account blobs and owned private records, and delete the Firebase identity. Persist job progress so provider/network failure can be retried without leaving an active writable account.
- Revoke Apple tokens as part of deletion. Implement and authenticate Meta's deletion callback as well as the in-app flow.
- Delete local private state on the initiating device. Other devices clear private state when they reconnect and learn the account was deleted; an offline device cannot be remotely wiped immediately.
- Do not claim existing anonymous alert subscriptions belong to an account just because their email matches. V1 account data excludes those subscriptions; expose their existing unsubscribe controls and accurately explain this in the deletion flow.
- Add a public `/account/delete` page with a working authenticated deletion/request path, usable without reinstalling the app. Support the same identities and a documented ownership-verification recovery path.

Apple's login-services and account-deletion rules must be met in the release, including an equivalent privacy-preserving login option and in-app deletion. [Apple review guidelines, 4.8 and 5.1.1](https://developer.apple.com/app-store/review/guidelines/)

Google Play also requires an in-app deletion path and an external web resource for deletion requests. Update the Play deletion URL, Data safety answers, App Store privacy disclosures, in-app privacy copy, and `docs/mobile-store-privacy-worksheet.md`. [Google Play account deletion](https://support.google.com/googleplay/android-developer/answer/13327111)

Cloud sync is not historical backup: deletion propagates. Configure 30-day restricted operational recovery for accidental server corruption, document retention, and test recovery of one account without restoring unrelated accounts. Use a dedicated deletion ledger outside restored snapshots so recovery cannot reactivate deleted accounts. Routine clients cannot read historical copies. Purge personal backup material according to the documented deletion/retention policy; explain any delayed expiry precisely. This is an operational restore facility, not a v1 user-facing version-history feature.

## 8. Implementation sequence

Estimate: **20–31 engineering days, roughly 4–7 weeks for one engineer**, plus provider setup/review and store-review elapsed time. This includes 1–2 additional days for email-link configuration, UI, and verification. This is a planning estimate, not a delivery commitment. Native adapter compatibility and conflict UX are the largest uncertainties.

| Stage | Work and likely files | Exit criteria | Effort |
| --- | --- | --- | --- |
| 1. Provider/build spike | `apps/mobile/app.config.js`, mobile dependencies, provider console setup, email sender/link-domain setup, nonproduction Firebase environment | Apple works on iOS; Google and configured Facebook/email work on supported platforms; email callbacks and linking paths are proven on signed iOS/Android builds; exact packages are pinned | 4–6 days |
| 2. Private API and cloud repository | New `src/server/account-auth.ts`, `src/server/routes/accounts.ts`, `src/lib/account-storage.ts`; extend Blob helper with deletion/restore support; shared contracts/client | Cross-user isolation, conditional writes, idempotent retries, schema limits, lifecycle gates, deletion primitives tested | 3–4 days |
| 3. Local migration and sync | New account provider, account-local repository, outbox/sync engine; adapt saved-rivers provider, trip-drafts, offline-trip ownership, app providers | Existing guest data survives; two devices converge; offline edits survive restart; conflicting content is preserved | 5–7 days |
| 4. Account screens and lifecycle | Sign-in sheet and email send/resend/return flow, Account screen, Saved/More entry points, conflict review, provider linking, sign-out, deletion worker and web page | A person can back up, reinstall, restore, link another login, sign out safely, and delete their account end to end with any supported method | 4–7 days |
| 5. Release readiness | Focused tests, native QA, privacy/store metadata, operations runbook, restore drill, beta rollout | Acceptance matrix below passes and deletion/rollback drills succeed | 4–7 days |

Stages can land as small reviewable changes behind disabled feature flags. Do not enable production sign-up before deletion, safe migration, and sync recovery are ready. Stage 1 requires access to the Firebase project and Hosting/link-domain configuration, email sender configuration, Apple developer configuration, Google OAuth configuration, Meta app configuration, and native signing/build credentials; missing console access is a setup dependency, not a reason to stub a production button.

## 9. Acceptance and verification

- Provider matrix: first sign-in, returning sign-in, cancellation, failure, session expiry/revocation, missing email, Apple relay email, Facebook Limited Login, supported-platform availability, app-not-installed flows, release signing certificates, and connected-provider collisions.
- Email matrix: same-device and cross-device completion, cold/warm app start, expired/reused/malformed links, wrong email, resend cooldown and service limits, email delivery failure, browser fallback, interrupted flow, email/social collisions, linking without changing UID, and fresh-link reauthentication for deletion. Verify no passwords, email addresses in callback URLs, or action codes in logs.
- Guest regression: browsing, saving, notes, drafts, alerts, and offline trips remain usable without signing in or a working auth service.
- Migration: existing data, corrupt individual records, interrupted writes, repeated imports, partially acknowledged batches, remote data already present, and shared-device account switching.
- Sync: two physical devices, concurrent edits, deletion versus stale edits, skewed clocks, lost server response, duplicate/out-of-order requests, app kill at each persistence boundary, expired epoch, and failed local acknowledgement persistence.
- Authorization: invalid/expired/revoked token, wrong Firebase project, attempted foreign UID/path, oversized payload, deleted account, old app schema, and cached-response leakage.
- Lifecycle: offline sign-out with pending work, late response after account switch, interrupted deletion, provider revocation failure, public deletion page, and restore after account deletion.
- Run focused unit suites for new contracts/auth/storage/sync and extend mobile-web flows using a deterministic auth adapter. Then run `npm run test:workspaces`, `npm run mobile:typecheck`, `npm run test:mobile:web`, `npm run mobile:release-check`, and the backend/runtime checks appropriate to touched files. These commands are planned validation, not checks completed by this document.
- Finish with signed iOS and Android preview builds and a two-device restore drill: save offline, reconnect, confirm acknowledgement, reinstall on a second device, and verify routes, exact note text, draft access points, and timings.

## 10. Rollout and follow-up

- Separate flags for provider availability, account sign-up, guest import, and sync writes; deletion remains available for existing accounts even when sign-up is disabled.
- Deploy backend/contracts first, run internal beta, then a small opt-in cohort before broad release.
- Record provider success/cancellation/failure, migration completion, time to first backup, pending-operation age, conflicts, storage size, and deletion completion. Log sanitized codes/counts only. Add cost budgets and alerts for identity usage and Azure operations without assuming the feature is free.
- Beta target: routine online edits appear on another foregrounded device within 30 seconds; all retry/isolation/deletion acceptance cases pass; no unexplained data loss. Treat data loss or cross-account exposure as a release blocker.
- Rollback disables new sign-up/import and cloud writes while preserving local editing and queued changes. Keep compatible read/deletion endpoints; do not roll back to code that ignores migrated storage. Recover with forward migrations and the operational restore runbook.

Follow-up: account-owned alert preferences and device registrations. Claim existing subscriptions only with their valid management credentials or verified contact ownership; keep push tokens and OS permission state per installation, support token rotation and sign-out detachment, and avoid duplicate deliveries. Never sync the current area-alert management token as ordinary profile data. Full website sync, trip history, and shared trips can then reuse this account foundation.
