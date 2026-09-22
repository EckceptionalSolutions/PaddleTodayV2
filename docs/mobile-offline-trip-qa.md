# Offline trip packet QA

The offline trip packet stores a versioned copy of the selected access points,
available route geometry, route logistics, timing and group notes. New downloads
also store a separate historical conditions snapshot with download, generated,
and observation timestamps. This includes the displayed call, eligible score,
confidence, gauge reading, weather, and the original 12-hour rain forecast.
Snapshots are always labeled non-current and never enter the live query cache.
Older packets remain readable without a snapshot; draft updates and geometry
retries preserve the original conditions. The packet is committed through a
staged revision and a pointer, so a failed or interrupted update leaves the last
visible packet intact.

## Automated evidence

September 22 integration: mobile type checking and all 180 mobile unit tests
pass. The offline packet and Saved flows pass in browser checks. The hub's
comparison/filter loss after route navigation and Back is now fixed and its
two comparison flows pass. See the [integration validation record](audits/push-readiness-2026-09-22.md)
for the complete check scope and remaining native-device limitations.

September 16 follow-up (downloaded conditions and comparison wrapping):

- Mobile typecheck and all 177 unit tests across 36 files passed in an isolated
  copy of the current mobile source. The working tree's deleted design-tokens
  package and incomplete dependencies prevented a normal in-place run; the
  validation copy used the committed tokens package and fresh dependencies.
- Offline download → edit draft → update offline copy → clear live cache →
  reopen passed at 320px and 390px. The route-page shortcut's download action
  was visible without scrolling the sheet. Historical labels, gauge/weather
  values, and the original snapshot survived reopening.
- Long comparison cells kept 190px columns and matched header positions and
  row heights at both widths. Stored hub comparison flows passed; the current
  hub flow passed those layout checks but lost selection after route navigation
  and Back. The same navigation failure reproduced with the committed component
  and original test in the validation environment.
- All 12 Prepare Trip and Saved comparison browser tests passed. Browser runs
  used Expo's client-rendered web mode in the isolated copy; native layout and
  production web export still need their normal release checks.
- Older version-1/version-2 packets without conditions remain readable. Draft
  updates and geometry retries preserve snapshot values and timestamps.

Earlier baseline evidence:

- `npm run mobile:typecheck` passes.
- `npm run test --workspace @paddletoday/mobile` passes with 168 tests across 34
  files, including packet persistence, partial geometry downloads, retry,
  previous-copy protection and draft-preserving removal.
- `npm run typecheck` passes, including shared packages and route/data checks.
- `npm run test:mobile:web -- tests/mobile-web/offline-trip.spec.ts` passes. The
  flow downloads a packet, removes the live query cache, reloads with API
  requests unavailable, reopens the exact access points, notes and geometry,
  then removes only the offline copy while retaining the normal trip draft.

The browser reload is the deterministic storage/recovery check. It does not
claim to reproduce native process termination or OS storage eviction.

## Native verification status

On September 12, 2026, `adb devices -l` returned an empty device list. No
physical Android device or emulator was available for a cold-start airplane-mode
check. An iOS simulator or physical iPhone was also unavailable. Native QA still
needs to verify force-close/reopen behavior, system insets, accessibility text
scaling, external map handoff, and storage behavior on both platforms before a
store release.

Background map tiles remain outside this packet; the saved route outline is
rendered locally without a map SDK or network request.
