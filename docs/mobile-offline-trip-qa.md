# Offline trip packet QA

The offline trip packet stores a versioned copy of the selected access points,
available route geometry, route logistics, timing and group notes. It does not
store scores, gauge readings or forecasts. The packet is committed through a
staged revision and a pointer, so a failed or interrupted update leaves the last
visible packet intact.

## Automated evidence

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
