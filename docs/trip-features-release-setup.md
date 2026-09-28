# Trips, paddling logs, and group planning

The implementation is being prepared for review. Firebase web app configuration is registered in project `paddletoday-9933a`, and the four `PUBLIC_FIREBASE_*` GitHub repository variables are set. The private `paddletoday-trips` Azure container, its API-only container SAS, and the maintenance switch are also configured. The production site still needs the code change merged and deployed before the trip page and API are available there.

## Delivered flows

- Main website `/trips/`: Google/email sign-in, guest draft capture, Upcoming/Past, trip editor, route/access choices, same-account phone link/QR, personal log, photo uploads, invitations, member names/RSVPs, itinerary, shuttle seats, and JSON export.
- Native app: Trips navigation and screen, Prepare Trip → Save to My trips, signed-in trip sync, guest import, invitations, logs and photos, itinerary/shuttle controls, native share sheets, and access to existing route/offline downloads.
- API: UID-authorized trip/log records; explicit public projections; seven-day invitation and 30-day view tokens; immediate revocation; membership authorization; conditional revisions and operation receipts; same-field conflict recovery; atomic seat claims; photo normalization; per-user quotas; deletion and index-repair jobs.
- Existing fragment-only share links remain immutable snapshots. New saved trips use current, revocable links. Public viewing does not require an account; joining/editing does.
- Logs remain personal when a trip is shared. Logging a paddle does not mark other members' logs complete. Personal logs survive deletion of another paddler's account or shared plan.

Local trip state and pending changes commit together. Native queued photo bytes and larger state use app document files with small AsyncStorage pointers, avoiding Android SQLite row/database limits. Browser state/uploads use IndexedDB. Editors retain local recovery drafts; use Save trip / Save paddle to publish an edit. Incompatible concurrent edits require review; copying a recovery version before selecting the latest preserves text for manual reconciliation.

Legacy route/access drafts migrate to stable trip IDs. Their original private details are retained as recovery data, outside shared itineraries. Legacy drafts have no time zone: their displayed zone must be reviewed before sharing. Migration markers prevent an old draft from recreating a deleted new trip. Legacy account backup continues to retain old draft edits; those edits do not overwrite a migrated trip.

Water levels can be entered manually. The editor can look for an archived snapshot on the actual paddle date. The existing history API provides limited samples; absence is shown explicitly. Snapshot capture time is identified separately from gauge measurement time, and no current reading is silently copied into a past outing.

## Configuration before release

### Website build

Use Firebase's web app configuration for project `paddletoday-9933a`:

| Build variable / GitHub repository variable | Value |
| --- | --- |
| `PUBLIC_FIREBASE_API_KEY` | Firebase web client API key; public configuration, not an Admin credential |
| `PUBLIC_FIREBASE_AUTH_DOMAIN` | Authorized Firebase auth domain, normally `paddletoday-9933a.firebaseapp.com` |
| `PUBLIC_FIREBASE_PROJECT_ID` | `paddletoday-9933a` |
| `PUBLIC_FIREBASE_APP_ID` | Registered Firebase web app ID |

The Azure deployment workflow forwards these repository variables into the website build. A rebuild is necessary after changing them. For local Astro development, use an ignored `.env.local` file with the four values. Do not copy `FIREBASE_SERVICE_ACCOUNT_JSON` into any `PUBLIC_*` variable. The production backend's `/api/account` endpoint now returns the expected 401 without a token. The production `/api/trips` endpoint still returns 404 until this code is deployed.

### Web-first rollout flags

The website build accepts two optional GitHub repository variables. Both default to `0` (off), including local builds where they are unset:

| Variable | `0` behavior | When to set to `1` |
| --- | --- | --- |
| `PUBLIC_FEATURE_TRIP_APP_HANDOFF` | Hides the trip detail's “Open on phone” control and QR handoff. Normal trip sharing and view links remain available. | After a signed mobile release supports `/trips` app links and the handoff has been verified. |
| `PUBLIC_FEATURE_SAVED_ROUTE_SYNC_CLAIM` | Privacy copy says mobile-backed saved routes sync through an account while website-saved routes remain in that browser. | Only after website saved-route sync is actually implemented and tested; this flag changes the claim, not the storage behavior. |

Change the GitHub repository variable and run the **Paddle Today Frontend** workflow with `deploy_frontend` enabled to rebuild and publish the flag state. Do not enable the saved-route-sync claim by itself as a substitute for implementing sync.

Confirm Google and email-link auth are enabled and the website origin is authorized in Firebase. Web email links return to `/account/web/`; mobile's existing `/auth/callback` remains separate. Test Google account collision recovery and same-device/cross-device email completion against the real configured project. A recipient can reopen the original invitation after signing in on a different browser/device.

### API and storage

| Runtime setting | Requirement |
| --- | --- |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Existing Firebase Admin identity verification configuration |
| `TRIP_DATA_CONTAINER_SAS_URL` | Configured in Azure for the private `paddletoday-trips` container with HTTPS read/write/create/delete/list permissions (`r`, `w`, `c`, `d`, `l`); SAS expiry 2027-09-27 |
| `TRIP_MAINTENANCE_ENABLED` | Enabled on the always-on API instance; it runs cleanup and repair every five minutes |
| `TRUSTED_PROXY_IPS` | Existing trusted reverse-proxy configuration for accurate public-link rate limiting |

If `TRIP_DATA_CONTAINER_SAS_URL` is absent, the API uses `ACCOUNT_DATA_CONTAINER_SAS_URL`, but it must also have list permission. Production fails closed if the required private storage configuration is missing. No client receives the container SAS.

Photos upload through the authenticated API, rather than client-side Azure SAS URLs. This reuses the private API authorization boundary and needs no public blob container or browser-to-Azure CORS. The API validates/decodes images, normalizes orientation, resizes to at most 1920 px, strips metadata, and stores a private JPEG payload in an individual storage object. Reads require the log owner's token. Configure reverse proxies to permit the bounded base64 JSON body (about 14 MiB) and a sufficient upload timeout.

Initial limits: 20 trip members, 30 itinerary stops, 20 shuttle vehicles, 10 photos per log, 10 MiB per source photo, 100 MiB normalized photo bytes per account, and 1,000 indexed trips/logs per collection. Failed uploads do not prevent saving the text log. Unattached uploaded objects are eligible for cleanup after 24 hours.

The maintenance task repairs interrupted indexes, cleans unattached photos, and retries trip-data deletion jobs. It must be enabled before release. Account deletion removes owned trips unless ownership was transferred first, membership in others' trips, personal logs, and photos. Other users retain their own logs.

The API emits `[trip-metrics]` minute counters for successful/rejected requests, authorization failures, conflicts, invitation joins, and photo failures, plus the maximum reported offline queue age. It excludes user IDs, tokens, route names, and content. `[trip-maintenance]` records successful cleanup duration; failures emit `Trip maintenance needs retry`. With the existing Azure monitoring enabled, configure alerts for repeated maintenance failures/no heartbeat for 15 minutes, sustained unavailable responses, and a rise in authorization failures. Queue ages are client-reported diagnostics, not trusted authorization data. Alert rules still need to be configured in the deployment environment.

### Android and iPhone

`/trips` is added to Android verified-link intent filters and the site's Apple association paths. Publish the association file and verify existing Android signing fingerprints and Apple team/app identity. Test installed-app and browser fallback behavior. Adding these link settings and the explicit file-system dependency warrants one new native development/preview build; ordinary subsequent UI/TypeScript changes use Metro/Fast Refresh.

## Verification and release rehearsal

Focused checks added:

- `npx vitest run src/lib/trip-storage.test.ts src/server/routes/trips.test.ts src/lib/blob-storage.test.ts`
- `npm run test --workspace @paddletoday/api-contract -- trips.test.ts`
- `npm run test --workspace @paddletoday/api-client -- trip-repository.test.ts`
- `npm run test --workspace @paddletoday/mobile -- incoming-route-link.test.ts`
- `npm run typecheck:runtime` and typechecks for mobile, api-contract, and api-client.
- `npm run build:app`
- `npx playwright test tests/visual/trips-page.spec.ts --project=desktop-chromium --project=mobile-android --workers=1`

Browser checks exercise guest draft entry, read-only links, and revoked-link recovery. Storage/API tests exercise account isolation, idempotency, member removal, conflicts, seat races, private photos, migration, and deletion. They do not substitute for real provider and device testing.

Local validation on September 26: runtime/mobile/client/contract typechecks and the production Astro build passed. Focused checks also cover recovery after a page reload, interrupted membership-index repair, deletion retry, expired photo reservations, removed-photo retries, and a failed photo not blocking text-log changes. There was no Android device connected during the final local checks.

Before marking the release ready, execute the plan's two-account desktop → phone → shared edit → offline recovery → private log/photo → revoke/delete rehearsal on signed Android and iPhone builds. Verify actual Google/email sign-in, QR/universal links, image formats from both photo libraries, app termination/restart during queued uploads, restored editor contents, removed-member offline edits, and storage cleanup after account deletion. Confirm a revoked invite cannot be used to rejoin and that turning a view link off does not claim to erase a recipient's already-downloaded information.

## Windows dependency note

This workstation's npm configuration reports `os=linux`. Use `npm ci --os=win32 --include=optional` on this Windows machine; this supplies Astro, Rolldown, and esbuild's Windows binaries without changing global npm configuration. Linux CI should continue using its normal Linux install. Avoid copying `node_modules` between platforms.
