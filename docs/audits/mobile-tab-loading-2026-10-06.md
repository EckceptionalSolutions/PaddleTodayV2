# Mobile tab loading audit

October 6, 2026. Scope: Today, Explore, Weekend, Saved, and My Trips in the Expo mobile app. The implementation and validation history below precede the production release; see the shipping record at the end for deployment status.

Large catalog responses increase first-load cost, and mounted screens continued doing work after a tab switch. The implementation reduces hidden-screen subscriptions, avoids route-segment work for excluded routes, and stabilizes derived board inputs. Dedicated mobile endpoints now scope initial responses geographically and separate reusable metadata from current conditions. Controlled Android list trials measured Explore's first visit at 1,315 ms versus 3,951 ms and Weekend at 2,440 ms versus 3,686 ms. Cached navigation results were mixed, as detailed below.

## Response sizes

Read-only requests to the public API returned these responses during the audit. Sizes are decoded UTF-8 JSON bytes, before parsing, rather than compressed transfer sizes. All three responses arrived with Brotli encoding.

| Screen | Endpoint | Paddle routes | Decoded JSON |
| --- | --- | ---: | ---: |
| Today | `/api/rivers/summary.json` | 1,743 | 6,850,097 bytes |
| Explore | `/api/rivers/explore.json` | 2,814 | 10,114,350 bytes |
| Weekend | `/api/weekend/summary.json` | 1,178 | 2,722,648 bytes |

The query keys are already shared across consumers. Today and Explore use a five-minute stale time; Weekend uses fifteen minutes. A quick return to a previously loaded tab normally reuses memory. Route volume contributes to first-load and refresh delays through parsing, freshness projection, filtering, and map-model construction; it does not imply that every tab press starts another full download.

The [file persister](../../apps/mobile/src/lib/query-persister.ts) excludes Explore and bounds persisted responses to 8 MiB. The measured Today and Weekend responses together exceed that limit. If Weekend is newer, it can fit while the larger Today response is skipped. This can make Today require another fetch after a restart even though it was previously visited.

## Changes implemented

- [Query hooks](../../apps/mobile/src/api/queries.ts) now stop query, freshness-clock, and connectivity subscriptions for disabled board consumers. The main board screens enable them while focused; Today and Trips enable full-catalog search while their search dialog is open and the screen is focused. Cached responses remain available on the next render. Stale responses still revalidate when the consumer becomes active.
- [Explore freshness projection](../../apps/mobile/src/lib/cached-snapshot.ts) preserves the original response and route identities when displayed conditions are unchanged. Planning routes retain their withheld decisions. Offline and expired responses still receive the existing presentation gates.
- [Explore filtering](../../apps/mobile/src/screens/explore-screen.tsx) applies search, state, call, difficulty, camping, and distance exclusions before building segment summaries. Segment generation considers pairs of access points, so processing thousands of excluded routes was unnecessarily expensive. List mode also skips construction of unused map points.
- [Weekend](../../apps/mobile/src/screens/weekend-screen.tsx) memoizes its shortlist, counts, map points, and map spans. Opening the location dialog or changing map interactivity no longer rebuilds these inputs when the underlying routes and preferences are unchanged. [Today](../../apps/mobile/src/screens/home-screen.tsx) memoizes its board snapshot.
- [Trips](../../apps/mobile/src/screens/trips-screen.tsx) stops its one-second display timer when blurred and skips three-second tracking polling while hidden and idle. Recording checkpoints and app-resume recovery remain available across tabs; native location-task recording is unchanged.

The first pass left API response shapes, freshness thresholds, manual refresh actions, and offline persistence limits unchanged. The follow-up below adds dedicated mobile endpoints while preserving existing public endpoints.

## Workload measurements

These are Node measurements on the development computer using the downloaded Explore response. Each comparison used five warmups and twenty samples; the table reports medians. They measure specific CPU work, not Android navigation latency.

| Workload | Before | After |
| --- | ---: | ---: |
| Fresh Explore projection plus TanStack structural sharing | 4.23 ms | 1.64 ms |
| Segment-summary generation for a Minnesota view | 38.71 ms across 2,814 routes | 2.22 ms across 230 routes |

The projection benchmark also compared the before and after output values for equality. The segment comparison isolates the cost eliminated by moving the state filter before summary generation; it excludes search, sorting, rendering, and network time.

## Initial installed-app baseline and first-pass validation

The connected device was a Samsung Galaxy A14, model SM-A146U1, running installed PaddleToday version 1.1.5. Eight tab switches across Today, Explore, Weekend, and Trips produced 178 measured native frames, nine janky frames (5.06%), and a native frame-duration 99th percentile of 250 ms. Android HWUI frame statistics do not capture all JavaScript stalls or measure request-to-content latency.

The checkout's mobile package version is 1.0.7, so this installed-app baseline is not a controlled before-and-after comparison of the patch. Expo Go 54.0.8 could bundle the checkout but could not run its Firebase native modules (`RNFBAppModule` missing). Subsequent validation used separate baseline and optimized native audit builds, described below. The installed production application and its user data were retained.

- Mobile TypeScript check and all 241 mobile unit tests passed, including freshness and recording-recovery tests.
- Twelve production-export browser checks passed: tab query lifecycle, duration filtering, empty-call recovery in map and list, normalized search, segment directions, four Saved decision scenarios, Weekend expiry/refresh, and Weekend range controls.
- The new [tab lifecycle regression](../../tests/mobile-web/tab-query-lifecycle.spec.ts) verifies cached navigation, absence of hidden-board revalidation after sixteen minutes and a visibility cycle, and revalidation of Today when revisited.
- An earlier broader selection failed four existing Home tests: three nearby-navigation scenarios expect `Best nearby` while the no-location screen shows initial location setup; planning-route-discovery expects route search before setting a location. The unchanged Home implementation also has this location gate. These failures remain outside this performance patch.
- Changed files passed `git diff --check`.

## Follow-up implementation

The interrupted edits were restored from this chat's original patch history after the user authorized restoration. The canonical source is `E:\codex-worktrees\paddletoday\mobile-loading-discovery`, on branch `codex/mobile-loading-and-discovery-2026-10-06`. A verified copy of all performance files and the tracked diff is stored outside the worktree at `E:\PaddleTodayMobileAudit-20261006`. The temporary copy in the SEO checkout was removed after verification; its unrelated SEO edits were preserved.

Release ordering: deploy the additive `/api/mobile/*` endpoints before releasing the updated mobile client. Existing web and older mobile endpoints continue to operate. The client intentionally rejects unavailable or mismatched metadata rather than attaching current scores to obsolete route access information.

The implementation adds `/api/mobile/catalog.json`, `/api/mobile/summary.json`, `/api/mobile/explore.json`, and `/api/mobile/weekend.json`. Catalog responses contain reusable access, safety, logistics and grouping metadata; condition responses reference routes by slug and retain readiness, source freshness, numeric score factors, and score caps. Detailed explanation prose remains on route detail responses. Catalog revisions include metadata content, so an access correction changes the revision even when route slugs are unchanged. The mobile loader refreshes mismatched metadata once and rejects a second mismatch.

Today and Explore initially request a 300-mile radius around the stored location. Explore retains explicit state selection and nationwide search, with an explicit nationwide control; a state filter is no longer silently applied to exclude nearby routes across a border. Weekend follows its selected range and separately retrieves up to four nearest clean alternatives outside that range. Saved requests only saved and alert slugs and batches collections above the request limit. Nationwide route-group counts remain available for loaded routes.

The file persister now serializes snapshot data once, reuses serialized data across unchanged query updates, and keeps its serialized-data cache within the existing 8 MiB budget. It prioritizes the latest Today and Weekend snapshots and remembers unchanged metadata that cannot fit, avoiding repeated serialization of that rejected data. Query state and timestamps are still serialized afresh. The public-query allowlist now includes reusable mobile catalog metadata; private account/trip records remain excluded. The persisted-query cache buster advances to schema 3 for scoped query keys.

The reproducible workload script is `npx tsx apps/mobile/tests/profile-loading.ts`. It uses the same downloaded public samples for both revisions and compares the original serializer from Git revision `71cc7c3b148313657dce940ed9578e33e9e8f918`. These are desktop workload measurements, not Android navigation measurements. The catalog used by this workload comes from the downloaded sample; deployed metadata corrections can change sizes slightly. Weekend alternatives are excluded from this workload.

| Workload or payload | Follow-up measurement |
| --- | ---: |
| Explore routes within 300 miles of 45.08, -93.2 | 530 of 2,814 |
| Scoped reusable metadata | 715,234 bytes |
| Scoped Explore condition update | 654,140 bytes |
| First Explore visit, metadata plus conditions | 1,369,374 bytes versus 10,114,350 bytes |
| Persisted Today, Weekend and metadata together | 2,316,417 bytes |
| Original cache serialization, desktop median | 64.89 ms |
| New first cache serialization, desktop median | 16.94 ms |
| New unchanged cache serialization, desktop median | 1.44 ms |

Serializer medians use three warmups and fifteen samples. The workload verifies that both boards are retained in the resulting cache. The reduction in initial Explore decoded bytes is approximately 86.5%; a subsequent conditions-only refresh is approximately 93.5% smaller than the original full response.

The nationwide workload retains Today and Weekend together in 7,651,820 bytes. Its first Explore visit is 7,864,091 decoded bytes, and a conditions-only refresh is 3,417,323 bytes. Metadata does not fit alongside both boards in this case. The first serialization can be slower than the old implementation because it retains both boards; subsequent unchanged serializations reuse the fitted JSON and skip the rejected metadata. This is a tradeoff, not a universal first-write speedup.

Final checks passed all 252 mobile tests across 51 files, 30 API-client tests, and the native marker-patch regression. The 15 targeted server/contract/catalog tests passed earlier; their source was unchanged by the final native work. Mobile and API-client TypeScript checks passed again after the final change; server-runtime TypeScript passed earlier. Changed files passed `git diff --check`. Fifteen production-export browser checks passed together after fixes for delayed preferences and server/client hydration: Explore preference recovery, cross-border and nationwide scope, Saved safety states, tab query lifecycle, Weekend freshness, and range persistence. A separate location-storage regression also passed. After the final rendering changes, ten focused production-export checks passed together: eight map decision scenarios, tab query lifecycle, and Weekend freshness. The intermediate board-view change also passed fourteen preference, scope, Saved, lifecycle, freshness and range checks.

The broad browser run stopped at 12 failures after 75 passes; it is not a clean full-suite result. Re-running the original Git revision independently reproduced six failures involving Home search/location setup, the Home initial-error view, the feedback dialog, and the saved-alert account prompt. Location choices passed in both the original and updated focused runs. A second baseline run reproduced five more failures in Saved keyboard/comparison behavior and Today/Explore refresh recovery; Explore was already excluded from persistence before this patch. Saved search passed after explicitly dismissing the unrelated backup invitation in its fixture. Comparison and welcome tests also contain selectors for older UI text; those failures are recorded rather than reported as passing. Browser fixtures now use the actual mobile wire format and scope helper.

## Native rendering changes

Today and Weekend now isolate their focus/query subscriptions from memoized board views. The selected query fields include refresh and error state, so those notices still update. Returning to a cached screen need not rebuild its entire card tree just because focus changed.

The original Android map froze during marker attachment. The captured input-dispatch ANR reported a 10,009 ms wait, with the main thread drawing a React marker subtree through `View.buildDrawingCache`, `MapMarker.createDrawable`, and a Fabric layout update. The original first-map attempt did not yield a valid cached-map timing series.

Ordinary Android score badges, dots, and the current-location marker now use static SDK image assets. Selected markers and unusual labels retain custom views. Custom Android markers redraw once after their appearance changes instead of repeatedly every 40 ms for 450 ms. The existing native marker patch removes a redundant drawing-cache pass while retaining manual drawing into the reusable bitmap. Android route markers begin attaching after the SDK's map-ready callback, in batches of 32 per animation-frame commit; additional attachment pauses while the tab is blurred. Selection remains available outside the initial batch, and every viewport marker is eventually retained. These changes preserve individual route markers, without count bubbles. iOS retains its existing marker rendering.

The deterministic asset generator adds 1,239 PNGs across three densities, approximately 2.9 MB of source images and 1.95 MB of compressed Android resource entries in the audit APK. Web/iOS use a platform stub and do not bundle these assets. This resource cost trades package size for avoiding repeated native React-view snapshots. Incrementally rebuilt audit APKs contain stale ZIP gaps, so their physical file-size growth is not a release-package-size measurement.

Device testing also caught a native compatibility bug: React Native's `URLSearchParams` lacks the `.size` getter available in browsers. Testing that getter silently discarded every scope parameter, including empty Saved slugs. The API client now checks the serialized query string, with a regression simulating the missing getter. Final device logs confirmed the 300-mile scope and empty Saved `?slugs=` requests. All earlier optimized trials without the `scoped-` label are excluded from the geographic improvement measurements.

## Controlled Android results

The separate baseline checkout, fixture service, build tools, raw logs, screenshots and `native-measurements.json` are under `E:\PaddleTodayMobileAudit-20261006`. `native-measurements.mjs` regenerates the comparison from those logs. The C: volume filled during validation, so subsequent output and temporary files use E:. The baseline uses Git revision `71cc7c3b148313657dce940ed9578e33e9e8f918`; the optimized build uses the restored implementation in the canonical worktree. Both use the same native debug configuration, Hermes, the new architecture, embedded optimized JavaScript, location 45.08/-93.2, and instrumentation. The separate application ID is `com.paddletoday.mobile.perfaudit`; no audit build replaced production or used its private data.

The fixture service replays the same downloaded historical condition samples over USB forwarding and re-stamps their envelope for the test. Optimized endpoints run the actual new server handler against current static metadata. That metadata includes later catalog corrections: 2,831 nationwide planning routes versus 2,814 in the historical sample, and 539 nearby routes versus the desktop workload's 530. Gallery requests uniformly returned 503 in both builds. These tests exclude WAN latency, live GPS acquisition, and successful image loading. They measure native debug builds with optimized JS, not production release latency.

Each content marker fires after the focused screen has its query data and two animation frames have elapsed. Timing starts before the ADB input tap or cold activity launch. This is a content-ready commit proxy, not final pixel presentation or fully loaded map tiles. First-visit medians use three independently cleared audit-package launches per build. Cached medians use three revisits per tab in one 16-switch run per build, after a two-second settle between switches. The sample is small and does not establish a statistical guarantee.

| List-mode content timing | Original median | Optimized median | Samples per build |
| --- | ---: | ---: | ---: |
| Cold launch to Today | 5,036 ms | 4,564 ms | 3 |
| First Explore visit | 3,951 ms | 1,315 ms | 3 |
| First Weekend visit | 3,686 ms | 2,440 ms | 3 |
| First Trips visit | 460 ms | 223 ms | 3 |
| Cached Today revisit | 211 ms | 168 ms | 3 |
| Cached Explore revisit | 253 ms | 305 ms | 3 |
| Cached Weekend revisit | 453 ms | 380 ms | 3 |
| Cached Trips revisit | 276 ms | 151 ms | 3 |

The measured first Explore visit improved by approximately 67% and Weekend by 34%. Cached Today, Weekend and Trips improved, but cached Explore list switching was 52 ms slower in this run. Cold Today changed much less than first Explore. These results support the smaller-response and hidden-screen changes, without establishing uniformly faster switching.

One optimized map-mode run completed all sixteen switches without an ANR. First Explore content was ready in 1,705 ms, its SDK map-ready event arrived in 1,714 ms, and all 539 viewport markers completed attachment in 4,880 ms. Weekend content was ready in 2,203 ms, map-ready in 2,007 ms, and all 23 markers attached in 2,850 ms. Cached map-mode medians were Today 169 ms, Explore 215 ms, Weekend 278 ms and Trips 142 ms, each over three revisits. These have no valid original map-mode latency counterpart because that build froze; do not compare them against original list-mode medians as a map speedup.

Native marker selection opened the correct Des Moines River planning drawer, with score withheld and access/water/hazard verification text preserved. Android's UI accessibility tree exposed marker titles; full accessibility descriptions were not independently verified. Source handlers and accessibility props remain present. The full map run observed five mobile API requests: one nearby catalog, Today conditions, Explore conditions, Weekend conditions, and metadata for four outside-radius alternatives. Cached revisits added no API calls. A separate empty Saved visit sent only `?slugs=` catalog and summary requests, with zero routes rather than nationwide data.

HWUI reported 26/550 janky frames for the original list run, 40/380 for the optimized map run; these are different workloads and frame counts. Batching adds frames, and HWUI misses JavaScript stalls. Neither these percentages nor the original installed-app frame statistics establish a universal frame-jank improvement. The actionable native result is successful map attachment and navigation without the reproduced drawing-cache ANR.

Validation cleanup completed: the fixture service was stopped, USB forwarding on port 4324 was removed, the separate audit package was uninstalled, and its temporary device files were removed. The production package remained installed at version 1.1.5, version code 29; it was never cleared, replaced or uninstalled. Source, audit APKs, logs and verified backups remain on E:. The implementation goal is complete locally; deploy the additive server endpoints before releasing the updated mobile client.

## Opportunity measurements before follow-up implementation

The follow-up investigation found two larger costs than the first pass's small CPU savings. The estimates below informed the implementation above and are retained to distinguish the original design estimates from measured follow-up workloads.

| Explore representation | Routes | Decoded JSON | Locally recompressed Brotli |
| --- | ---: | ---: | ---: |
| Current nationwide response | 2,814 | 10,114,350 bytes | 552,021 bytes |
| Same response filtered to Minnesota | 230 | 770,166 bytes | 47,052 bytes |
| Minnesota with shortened explanation and omitted breakdown | 230 | 585,237 bytes | 36,626 bytes |

The Minnesota example reduces decoded size by 92.4%. The compressed values are local recompression estimates, not measured server transfer bytes. The examples retain the existing envelope only to estimate size; production scope metadata and counts would need correction. A location scope should include nearby routes across state borders and support widening the area and nationwide search. The shortened representation is a design estimate, not a safe drop-in response for every existing consumer.

Using the downloaded responses, the current cache serializer took a median 107.7 ms on the development computer (three warmups, ten samples). It stringifies candidate queries to measure their UTF-8 size, scans the strings, then stringifies selected queries again. The deferred write runs after one second, but serialization still runs synchronously on the JavaScript thread. With Today fetched before Weekend, only Weekend fit in the 8 MiB cache. Explore parsing alone took a median 38.6 ms in the same sampling setup. Neither measurement establishes Android tap-to-content latency.

Reduce persistence work by avoiding repeated serialization of unchanged snapshots and scheduling or dividing work around interaction; smaller board responses would also let both Today and Weekend fit within the existing budget. Keep the public-query allowlist, byte limit, atomic file replacement, and freshness checks intact.

For cached tab revisits, separately profile native map attachment and rendering. Explore already uses a virtualized list, the board cards are bounded, and concurrent Trips sync calls are coalesced by the repository; replacing these without a device trace is not a justified first target. Geography and metadata changes primarily improve first visits, refreshes, and startup restoration. They should not be presented as proof of faster cached switches.

1. Add a mobile discovery representation that omits detailed score explanations and breakdown prose. In the measured Explore response, the full `explanation` values occupied about 1.34 MB and `scoreBreakdown` values about 1.26 MB, excluding their field names. Route detail and river-hub responses can continue serving full explanations. The welcome preview currently uses numeric breakdown values, so it needs retained numeric factors or an individual preview-detail request. Preserve readiness reasons, source freshness, access information, and safety gates.
2. Support a state or geographic scope for initial discovery and board responses. Preserve nationwide search, out-of-range recovery, planning-route availability, and full river-group counts through explicit response metadata or separate requests. Filtering the current catalog to Minnesota leaves 230 of 2,814 routes before other exclusions.
3. Separate slowly changing route metadata from current conditions. Cache metadata by catalog revision and merge smaller condition updates by slug. Keep snapshot timestamps and the two-hour offline freshness gate attached to conditions. Revisit persistence after the response split so Today and Weekend can both fit without increasing the existing byte budget.

These design notes informed the controlled comparison above, which separates first visits from cached revisits and records request counts and native map attachment events. A future release-build field comparison can measure WAN, image and tile loading under real network conditions.

## Production shipping record

The user authorized shipping and explicitly deferred Apple. [PR #73](https://github.com/EckceptionalSolutions/PaddleTodayV2/pull/73) merged the mobile changes and version 1.1.6 (Android version code 30). Its [clean CI gate](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37548096064) passed 1,716 workspace unit tests, type checks, safety/scoring checks, the production build and search indexability audit. The [signed Android production build](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37547815135) also passed release readiness, mobile type checking and 252 mobile tests. The 79,936,786-byte AAB is retained at `E:\PaddleTodayMobileAudit-20261006\release-1.1.6\build-1791330999873.aab`; its SHA-256 is `E6D9143289851CD337A981E61FAD3C1E40D140E2DC9A4DCEBBBB6E33FBBA432A`.

The additive API [deployment](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37548454224) succeeded, but the old Node process initially continued serving existing endpoints. An explicit App Service restart loaded the new application. The workflow's existing account/trip readiness and legacy smoke checks alone did not detect this stale-process condition; successful upload is insufficient evidence that new mobile endpoints are serving.

At 7:02 p.m. CDT on October 6 (00:02 UTC October 7), separate live checks passed against the Azure API origin and `https://paddletoday.com`. Each checked scoped catalog, Today, Explore and Weekend assembly using the actual API contract, outside-radius alternative metadata, nationwide availability, cross-border coverage, empty Saved responses, invalid scope rejection, revision mismatch rejection, HEAD behavior and current condition timestamps. All 11 HTTP checks passed on each host, followed by all eight existing mobile API smoke checks. Nearby discovery returned 539 routes, versus 2,831 nationwide, with matching catalog revision `bb6226a913c4b23dd4bac32d`. Current live decoded bytes were 1,073,570 for nearby metadata and 662,219 for Explore conditions; current metadata differs from the historical benchmark, so the earlier response-size percentages must not be treated as measurements of this live release. Raw verification results are retained under `E:\PaddleTodayMobileAudit-20261006\live-mobile-smoke-*.json`.

Azure rejected the first website deployment because an existing Minnehaha redirect appeared in both trailing-slash forms. An initial validation relaxation did not fix Azure's rejection. [PR #74](https://github.com/EckceptionalSolutions/PaddleTodayV2/pull/74) removed the duplicate, restored strict normalized duplicate detection and added deployed checks for both URL forms. Its [clean gate](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37549077476) passed, including 1,717 workspace unit tests. These follow-up changes do not alter the mobile app in the signed bundle.

The [frontend retry](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37549456129) completed successfully. All 14 deployed search-serving checks passed against the Azure frontend origin and, separately, the public domain, including both Minnehaha hub forms redirecting to the guide. The additive mobile API and website are deployed; the mobile store release is separate.

Google Play accepted and processed the signed bundle as **30 (1.1.6)** in production release draft 19, retaining support for all devices supported by the previous production release. Review submission requires the existing GPS paddle recorder's `FOREGROUND_SERVICE_LOCATION` declaration and a publicly accessible demonstration video. No existing video was found; the user confirmed that it still needs to be created and instructed that Google Play publication wait for manual testing. The recording service is user initiated, shows an ongoing notification, and supports pause/resume/finish; it is not needed for page loading. No private account or location data was published to manufacture review evidence. The draft and release notes are retained, with no declaration changes saved. This Android release has **not been submitted for review or published**. Apple/iOS remains deferred at the user's request, with no build or submission started.

A separate [installable APK build](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37550376109) was requested from the same merged mobile source for manual testing. It uses the existing internal preview profile and the production API. The connected phone's production application and private data were not replaced or cleared. Before store submission, manually check cold Today/Explore/Weekend loads, repeated list and map tab switches, marker selection, cross-border nearby discovery, nationwide search, Saved scope, and cached/offline restoration. The GPS-recorder video and manual acceptance remain outstanding.
