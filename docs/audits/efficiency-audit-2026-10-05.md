# Paddle Today codebase efficiency audit

Original audit: October 5, 2026. Implementation follow-up: October 6, 2026. The largest opportunities are resizing and isolating server caches, removing synchronous compression from large API responses, and reducing duplicated deployment and repository assets. The original measurements below include the existing staged and unstaged work. Findings 1 through 4 now have implemented improvements; the other findings remain recommendations under an active follow-up goal.

## Implemented improvements, October 6

| Measurement | Before | After |
| --- | ---: | ---: |
| Mocked provider loads on an immediate second scored catalog sweep | 1,759 | 0 |
| Warm Explore JSON serialization, median | 24.16 ms | 0.91 ms |
| Four concurrent Explore responses, p95 across eight requests | 377.36 ms | 88.57 ms |
| Maximum event loop delay during those requests | 373.03 ms | 13.10 ms |
| Search matching: river / rice creek / susquehanna | 20.53 / 16.77 / 19.68 ms | 1.01 / 1.20 / 0.81 ms |

These are local fixture measurements, not production latency predictions. The Explore fixture uses the current catalog and synthetic unavailable conditions. The response experiment consumes raw gzip bodies over loopback and excludes client JSON parsing. Repeated measurements run nine times; the HTTP experiment runs eight requests in two batches of four. Search results and serialized JSON match the original algorithms. Full measurements are in [implementation data](C:/Users/Yerff/source/repos/PaddleTodayV2/docs/audits/efficiency-improvements-2026-10-06.json).

- **Caches:** Gauge, weather, and snapshot buckets now have independent eviction and request coalescing. Hits update least-recently-used ordering, invalidation prevents old pending loads from repopulating the cache, and TTL starts when loading completes. Current defaults retain 612 gauge keys and 2,040 weather locations, including planning routes. `CANOE_GAUGE_CACHE_MAX_ENTRIES` and `CANOE_WEATHER_CACHE_MAX_ENTRIES` accept positive integer overrides, capped at 20,000 each. Snapshot capacity remains 96. This retains more readings in RAM in exchange for fewer provider calls; provider value sizes and production resident memory still need operational observation.
- **Responses:** Normalized summary/weekend arrays are reused by snapshot object and freshness state. Explore envelopes are reused while the score array is unchanged. Explicitly opted-in public arrays and coverage objects reuse serialized bytes, with a 128-entry / 64 MiB limit. Request IDs and age metadata are serialized on every response. Private and ordinary mutable payloads use ordinary serialization. Compressed complete bodies remain per request because IDs are present in their JSON. Asynchronous gzip uses two concurrent jobs, with at most 32 retained jobs and 64 MiB of input buffers. Saturation falls back to identity when allowed; gzip-only clients receive a non-cacheable 503 with Retry-After. Unsupported encoding combinations receive 406. Both representations vary on Accept-Encoding; HEAD keeps representation headers and omits the body.
- **Search:** Search text, title, and subtitle are normalized once when the index loads. This takes a measured 21.47 ms initially and retains additional normalized strings. Matching preserves accents, aliases, multiword queries, empty results, tie order, and the ten-result limit. Empty-query matching remains under 0.2 ms and showed no speed improvement.

Compression uses gzip level 4 rather than the previous default level 6: the fixture takes 39.21 ms asynchronously versus 49.61 ms synchronously, while its gzip size rises from 608,685 to 664,948 bytes (**9.2 percent**). This explicitly trades some transfer size for CPU and response latency. Serialization retains 7,883,711 bytes for the two reusable fixture fields; the queue is empty and retains zero input bytes after the run. These are buffer accounting measurements, not process RSS measurements.

Reproduce after building the search index with `node --import tsx scripts/benchmark-runtime-efficiency.ts docs/audits/efficiency-improvements-2026-10-06.json`. The [benchmark source](C:/Users/Yerff/source/repos/PaddleTodayV2/scripts/benchmark-runtime-efficiency.ts) uses no live provider calls. It expects `.local/efficiency-audit/build/search-index.json` from the isolated build command documented below.

### Geometry follow-up checkpoint

The active second goal begins with finding 3. Geometry results now retain at most 128 entries and 16 MiB of source-byte accounting, with a fifteen-minute TTL and least-recently-used eviction. Missing results retain at most 128 keys for one minute. Pending reads still coalesce separately. A file inventory refreshes each minute and rejects unknown slugs before file reads, while preserving assets retained for older clients and the existing dist-then-public fallback. Health diagnostics report geometry cache entries, source bytes, missing keys, and pending reads.

A sequential sweep of all 2,799 public route files previously retained all parsed results representing **39.98 MiB** of source JSON. The new cache retains **128 entries representing 1.44 MiB**, and an evicted route reloads successfully. Source-byte accounting is a proxy for retained geometry size, not a claim about process RSS or concurrent response buffers. The checkpoint passes 27 tests across geometry caching, file inventory, trip exports, and public response integration, plus runtime TypeScript. Tests also cover missing-key flooding without file reads, TTL expiry, oversized values, malformed/read-error retries, new files, and HEAD behavior. Browser gallery data, deployment packaging, release-bundle archival, binary photo storage, and existing catalog failures remain pending in the goal.

Reproduce with `node --import tsx scripts/benchmark-geometry-cache.ts docs/audits/geometry-cache-improvements-2026-10-06.json`. [Geometry measurement data](C:/Users/Yerff/source/repos/PaddleTodayV2/docs/audits/geometry-cache-improvements-2026-10-06.json) records the cache bounds and reload check.

## Measurements

| Area | Measured value | Interpretation |
| --- | ---: | --- |
| Public catalog | 2,814 routes | 1,750 scored and 1,064 planning routes |
| Fresh static build | 506.4 MiB across 6,559 files | Built successfully in 33.41 seconds |
| Generated HTML | 289.3 MiB across 3,263 pages | Median page is 94.4 KiB; total size is not a single visitor's download |
| Gallery and map assets in build | 207.4 MiB | Frontend workflow already externalizes these; API workflow copies them |
| Tracked files at current working sizes | 679.2 MiB | Includes two identical Android release bundles totaling 143.9 MiB |
| Tracked documentation | 268.7 MiB | Includes generated evidence and store assets |
| Local Git directory | About 1.81 GiB | Includes about 307.2 MiB of temporary objects reported as garbage |
| Gauge and weather cache keys | 1,732 distinct keys | Shared default cache limit is 256 entries |
| Explore response fixture | 7.52 MiB JSON, 594.4 KiB gzip | Current catalog with synthetic unavailable conditions; not a captured production response |

Detailed counts and timings are saved in [measurement data](C:/Users/Yerff/source/repos/PaddleTodayV2/docs/audits/efficiency-audit-2026-10-05.json). Sizes use MiB, where 1 MiB is 1,048,576 bytes. Savings below concern different resources and should not be added together.

## Recommended order

| Priority | Improvement | Expected benefit | Relative effort |
| --- | --- | --- | --- |
| Implemented | Separate and resize upstream caches | Zero additional mocked loads on the second sweep | Verified locally |
| Implemented | Reuse immutable response fields and compress asynchronously | Reduced serialization and event loop delay | Verified locally |
| Implemented | Bound geometry cache including missing slugs | Bounded retained geometry and missing keys; unknown slugs skip file reads | Verified locally |
| Implemented | Normalize search fields once | Measured 14 to 24 times faster matching in three follow-up queries | Verified locally |
| P2 | Split browser photo previews from editorial gallery data | Reduce the largest JavaScript chunk | Medium |
| P2 | Narrow the API deployment package | Reduce upload, unpacking, storage, and deployment work | Medium |
| P2 | Store release assets by individual content hash | Avoid recopying the complete asset collection for small changes | Medium |
| P2 | Remove release bundles from ordinary source tracking | Recover 143.9 MiB from the current checkout after archiving | Small; historical cleanup is separate |
| P2 | Store private photos as binary blobs | About 25 percent less photo object storage than base64 JSON | Medium |

P1 means address first because the current catalog already exposes the limitation. P2 means a concrete improvement whose urgency depends on traffic or storage growth. Effort is a relative implementation estimate, not a delivery commitment.

## 1 Upstream caches are much smaller than the catalog

**Evidence:** [server cache](C:/Users/Yerff/source/repos/PaddleTodayV2/src/lib/server-cache.ts:53) applies a default 256 entry limit. [Gauge and weather loaders](C:/Users/Yerff/source/repos/PaddleTodayV2/src/lib/rivers.ts:203) both use that default in the same global map. [Snapshot reads](C:/Users/Yerff/source/repos/PaddleTodayV2/src/lib/river-snapshots.ts:815) set a namespace limit of 96, but a later default cache write still prunes the entire map to 256. Thus namespace limits do not provide isolation from upstream writes.

Using the current scored catalog's real key sequence with mocked loaders, a sweep made 3,500 lookups and 1,759 loads. An immediate second sweep made **another 1,759 loads**, despite a five minute TTL. Both sweeps ended with 256 retained entries. This is a sequential cache simulation; actual provider traffic also depends on concurrency, route order, and upstream failures.

**Change:** Give gauge, weather, and snapshot data independent cache budgets. Size the upstream budgets from the actual catalog and observed value sizes, with a configurable ceiling. Preserve request coalescing and stale fallback. Use a single eviction pass rather than repeatedly rebuilding the key list during pruning, and consider retaining frequently reused entries instead of insertion order alone.

**Verify:** Repeat full catalog sweeps within TTL and confirm the second sweep makes no additional mocked loads when capacity covers the working set. Fill one namespace and confirm it cannot evict another. Measure provider request counts and resident memory during a snapshot refresh.

## 2 Large API responses block the event loop during compression

**Evidence:** [sendJson](C:/Users/Yerff/source/repos/PaddleTodayV2/src/server/http.ts:31) stringifies every payload, creates a buffer, and calls `gzipSync` for each qualifying response. It performs that work for HEAD requests as well. The snapshot read cache stores parsed data, so it does not eliminate serialization and compression work.

For the Explore fixture, median JSON serialization took **33.1 ms** and synchronous gzip took **60.8 ms**, or about **94 ms** of synchronous work before buffer allocation and response handling. Explore catalog construction added 56.2 ms without stored scores, or 32.1 ms with synthetic scored snapshots. [Explore generation](C:/Users/Yerff/source/repos/PaddleTodayV2/src/lib/explore-catalog.ts:10) still constructs planning route fallback envelopes on each request.

**Change:** Cache catalog metadata and planning fallback objects by catalog revision. Cache serialized response bodies and their compressed variants by snapshot generation and freshness state. Use asynchronous compression with bounded concurrency on a cache miss. Keep request IDs in response headers, or explicitly account for the current body request ID contract before sharing cached bodies. Do not cache stale readiness as fresh; preserve snapshot age and offline behavior.

**Verify:** Compare event loop delay and p95 response latency under concurrent large GET requests. Check gzip quality negotiation, HEAD headers, cache invalidation, request IDs, and the fresh to stale transition. These local fixture timings are not a production capacity estimate.

## 3 Geometry promises retain every successful and missing key

**Evidence:** [geometryPromises](C:/Users/Yerff/source/repos/PaddleTodayV2/src/server/routes/river-geometry.ts:18) has no size limit or expiry. [loadRouteGeometry](C:/Users/Yerff/source/repos/PaddleTodayV2/src/server/routes/river-geometry.ts:45) accepts every syntactically valid slug and retains a promise resolving to `null` when files are missing. Only rejected promises are removed. Normal browsing accumulates parsed coordinate arrays; requests for distinct nonexistent slugs accumulate indefinitely.

**Change:** Validate against an asset manifest before filesystem lookup. Separate pending request coalescing from a bounded result cache. Use a short, bounded negative cache and a byte budget for geometry results. Preserve access to assets required by existing clients.

**Verify:** Request many unique missing slugs and confirm retained entries stay bounded. Concurrent requests for one existing slug should still read the file once. Evicted geometries must reload correctly.

## 4 Search repeats normalization on every keystroke

**Evidence:** [searchMatches](C:/Users/Yerff/source/repos/PaddleTodayV2/src/scripts/site-shell.js:134) normalizes each record's search text on every input and normalizes title and subtitle again for matching terms. The generated index has 3,491 records, occupies 1.63 MiB, and contains about 816 KiB of search text.

Applying the same ranking algorithm to that index with normalized fields prepared once produced:

| Query | Current median | Prepared fields median | Same result URLs |
| --- | ---: | ---: | --- |
| river | 21.73 ms | 1.16 ms | Yes |
| rice creek | 19.91 ms | 1.02 ms | Yes |
| susquehanna | 16.80 ms | 0.55 ms | Yes |

**Change:** Prepare normalized search text, title, and subtitle in [parseSearchIndexPayload](C:/Users/Yerff/source/repos/PaddleTodayV2/src/scripts/site-shell.js:67). Retain only the result fields needed for display and matching. Deduplicate repeated aliases in generated river search text. Add a short debounce only if device profiling still shows input lag.

**Verify:** Preserve results for accents, aliases, multiword queries, empty queries, and tie ordering. Measure first index preparation as well as subsequent inputs; this moves normalization work to one initial pass and consumes some additional memory.

## 5 Browser boards import the complete gallery lookup module

**Evidence:** [home board](C:/Users/Yerff/source/repos/PaddleTodayV2/src/scripts/summary-board-home.js:112) and [weekend board](C:/Users/Yerff/source/repos/PaddleTodayV2/src/scripts/weekend-page.js:1) import `getRoutePreviewPhoto` from the large editorial [gallery module](C:/Users/Yerff/source/repos/PaddleTodayV2/src/data/route-gallery.ts:10457). The fresh build emits a **532.5 KiB** gallery JavaScript chunk, **87.1 KiB** gzipped, larger than any other browser chunk. Vite reports the chunk size warning.

**Change:** Generate a compact browser preview lookup containing the selected preview fields per route and only the fallback metadata the browser needs. Keep full galleries, credits, and editorial source metadata in build or server modules. Alternatively, return previews with the board data and fetch richer gallery content only when needed. A dynamic import alone changes loading time but retains the same total payload.

**Verify:** Compare home and weekend dependency graphs and transferred bytes after a fresh build. Check route, river, regional, state, and placeholder fallback choices and preserve attribution wherever photos are displayed.

## 6 The API deployment includes broad frontend and source trees

**Evidence:** The [API workflow](C:/Users/Yerff/source/repos/PaddleTodayV2/.github/workflows/azure-app-service-api.yml:67) copies all of `dist`, `src`, `packages`, `docs/operations`, and the control plane folder. The fresh `dist` alone is **506.4 MiB**, including **207.4 MiB** of gallery and map data. Operations reports add about **40.7 MiB**. Source copying also includes tests and the **15.1 MiB** generated access registry; the registry's identified consumers are generation, audit, and tests rather than request handlers.

The frontend already has [asset externalization](C:/Users/Yerff/source/repos/PaddleTodayV2/scripts/lib/static-assets.mjs:7). The API package installs production dependencies and also [enables the App Service deployment build](C:/Users/Yerff/source/repos/PaddleTodayV2/.github/workflows/azure-app-service-api.yml:78), allowing deployment installation work to repeat.

**Change:** Build an explicit deployment manifest or compiled server artifact. Retain route geometry used by the geometry API, required admin data, readiness files, and any intended static fallback pages. Point API-served gallery URLs at the asset release before removing local gallery files. Trim test and audit artifacts. Choose one dependency installation strategy and retain packaged startup verification, native image processing support, and shared package resolution.

**Verify:** Start from a clean packaged directory and exercise health, readiness, detail, geometry, photos, trips, and admin operations. Audit every dynamically imported module and filesystem dependency. The 207.4 MiB is an upper bound on asset trimming, not guaranteed safe deletion: some map files serve API endpoints.

## 7 Each asset collection change creates a complete release copy

**Evidence:** [prepareAssets](C:/Users/Yerff/source/repos/PaddleTodayV2/scripts/lib/static-assets.mjs:38) hashes the entire inventory to choose one release prefix. [Publishing](C:/Users/Yerff/source/repos/PaddleTodayV2/scripts/publish-static-assets.mjs:11) then uploads the full collection under that release and uploads it again under stable legacy paths. A small geometry change can therefore create another **207.4 MiB** release collection and reupload unchanged photos. Ten distinct collections would represent about 2.0 GiB of release data before legacy copies, assuming similar inventory sizes.

**Change:** Store assets under individual content hashes and use small release manifests to associate paths with those objects. Skip unchanged legacy uploads. Establish retention for unreferenced release data only after accounting for cached HTML, rollback releases, and supported mobile clients. Stable legacy names are intentionally retained in the current code.

**Verify:** Change one asset and measure uploaded objects and bytes. Validate old cached pages, existing mobile releases, and rollback. Actual Azure retention or lifecycle settings were not inspected; this finding concerns the checked-in publishing design.

## 8 Release artifacts and generated evidence dominate repository space

**Evidence:** Both [root Android bundle](C:/Users/Yerff/source/repos/PaddleTodayV2/paddletoday-1.1.2.aab) and [mobile Android bundle](C:/Users/Yerff/source/repos/PaddleTodayV2/apps/mobile/paddletoday-1.1.2.aab) are tracked. Each is 75,460,463 bytes and has the same SHA256 digest. Together they occupy **143.9 MiB**. Neither `.gitignore` nor `.easignore` excludes AAB files, so they are also eligible for the mobile build archive.

The authoritative coordinate evidence JSON is **88.0 MiB**. A lossless compact representation is **69.3 MiB**, and gzip of that representation is **7.2 MiB**. The access registry drops from 15.1 to 11.0 MiB by removing formatting. These are file storage measurements; Git already compresses objects, so gzip savings do not translate directly into clone savings. Some evidence files are required inputs to auditing scripts.

**Change:** Archive release bundles in a release or artifact store, remove both tracked copies in an authorized cleanup change, and ignore future AAB/APK outputs in Git and EAS. Keep active evidence available to its consumers; archive superseded evidence and reports with checksums and provenance. Consider compressed archives or a generated compact index for large evidence. The local Git report identifies 48 temporary garbage objects totaling about **307.2 MiB**; inspect Git activity before maintenance. No Git cleanup or history rewriting was performed.

**Verify:** Confirm archived artifacts are retrievable before removal, rerun evidence consumers, and inspect the EAS archive. Removing tracked files reduces the current checkout and future uploads; shrinking existing Git history requires a separate coordinated decision.

## 9 Private photos use base64 JSON storage

**Evidence:** [photo persistence](C:/Users/Yerff/source/repos/PaddleTodayV2/src/lib/trip-storage.ts:266) stores processed JPEG bytes as a base64 string in a JSON document. [Photo reads](C:/Users/Yerff/source/repos/PaddleTodayV2/src/lib/trip-storage.ts:278) parse the complete document and decode another binary buffer. Base64 needs about four bytes for every three image bytes, so 100 MiB of accepted JPEG payload becomes roughly 133.3 MiB of JSON string data before metadata.

**Change:** Store JPEGs as private binary blobs and retain ownership and photo metadata separately. Stream authorized downloads or use an appropriately restricted delivery mechanism. Preserve quota accounting, upload reservations, delete handling, and compatibility with existing JSON photo objects. Moving mobile queued photos to binary files can also reduce local storage, but needs recovery and migration handling.

**Verify:** Upload, retry, delete during upload, retrieve after restart, and delete an account. Compare actual blob bytes and peak process memory. Binary storage saves approximately **25 percent of the current base64 photo representation**, while keeping the existing JPEG quality and dimensions.

## Smaller improvements and existing strengths

- **Global CSS:** Every page loads 266.1 KiB of global CSS, about 41.8 KiB gzip, including route and specialized page selectors, plus four CSS imports. Continue moving specialized styles into the existing page stylesheets and minify generated delivery assets. Check cascade and visual regressions before deleting selectors.
- **Static serving:** [sendStatic](C:/Users/Yerff/source/repos/PaddleTodayV2/src/server/static-route.ts:8) streams files correctly but does not implement content compression or conditional validators. For direct Node serving, precompressed text assets and ETag handling would help: the search index compresses from 1.63 MiB to about 233 KiB. Verify edge compression first for hosted delivery so savings are not counted twice.
- **Mobile memory and persistence:** The new route persister already limits disk output to 8 MiB and 20 queries. In-memory geometry queries remain eligible for seven days, while ordinary queries use a 24 hour garbage collection interval. Measure sessions that browse many routes before reducing those intervals. The full recording session is rewritten to AsyncStorage on updates; consider compact file checkpoints and append batches if device profiling shows cost. Preserve crash recovery and offline functionality. The desktop freshness transform benchmark was only 0.63 ms for 1,750 stale items, so it is lower priority than the server and search findings.
- **Dependency tooling:** Knip returned nine unused dependency flags, but all nine have imports or configuration usage. They are not established removal candidates. The custom route persister also makes the direct `@tanstack/query-async-storage-persister` dependency worth checking; no source import was found, and its allowlist entry masks scanner detection. Verify the workspace and native build before removal.
- **Good foundations:** Route lookup indexes are already cached, upstream and snapshot work uses bounded concurrency, in-flight cache requests coalesce, snapshots use compact JSON, and group snapshots derive from summaries instead of duplicating every family. Map overview simplification, on-demand detail loading, image resizing, and shared packages are already present. Improvements should preserve these behaviors.

## Initial runtime checkpoint verification

The implementation passes **55 focused tests across nine files**, runtime and route-data TypeScript checks, and an isolated production Astro build of **3,263 pages in 34.72 seconds**. Regression coverage includes full-catalog provider reuse and namespace isolation, coalescing and stale fallback, invalidation of pending loads, snapshot generation/freshness changes, concurrent wire request IDs, gzip negotiation and pressure fallback, HEAD lengths, disconnected clients, compression bounds, and equivalent search ranking.

`npm run test:api` passed scoring sensitivity and both TypeScript checks, then recorded 1,036 passing tests and ten failures across 190 files. Nine failures concern existing catalog expectations in Idaho, New York, Pennsylvania, operations counts, and canonical geometry metadata. An isolated comparison substituted the original HEAD runtime sources through a Vitest transform while leaving user catalog changes intact: both original and updated runtime runs produced the **same nine failures and 290 passes** across those six affected test files. The tenth failure was the coordinate-correction boundary script's five-second timeout; it passes in both isolated runs with a twenty-second limit. These unrelated data discrepancies remain unresolved, so the full suite is not green. Local receipts are in `.local/efficiency-audit/api-tests.log`, `baseline-tests.log`, `current-catalog-tests.log`, and `baseline-transforms.log`.

Commands: focused `npx vitest run` for the nine changed-area test files with `--maxWorkers=2`; `npm run typecheck:runtime`; `npm run typecheck:routes`; and `node node_modules/astro/bin/astro.mjs build --outDir .local/efficiency-audit/build`. The build bypasses regeneration hooks to preserve the existing user work. Scoped `git diff --check` passes. No deployment, dependency upgrade, release artifact deletion, Git maintenance, or cloud retention change was performed. Native device performance, production traffic, cloud billing, and process RSS were not measured.

Automatic approval review rejected temporary build deletion with “blocked by policy.” The additional 506.4 MiB build remains at [temporary audit build](C:/Users/Yerff/source/repos/PaddleTodayV2/.local/efficiency-audit/build). The existing `dist` output was preserved.

## Follow-up goal checkpoints, October 6

The goal is complete. All six follow-up items are implemented and verified locally: geometry caches, browser preview delivery, the deployment package, release-bundle archival, binary private photos, and the nine catalog discrepancies. The user accepted the suggested local archive destination on October 6. Both release bundles were verified against the saved archive before their exact checkout copies were removed, and archive retrieval was verified again afterward. No deployment has occurred.

Geometry results now use independent pending coalescing, a 128-entry/16 MiB source-byte budget with a fifteen-minute TTL, and a 128-entry one-minute negative cache. Asset inventory validation rejects arbitrary unknown slugs before file reads and preserves existing file-backed routes. The final 2,801-file sweep reduced retained source bytes from 41,930,603 to 1,514,571; evicted routes reload. This byte accounting is a proxy for retained geometry size, not a measurement of heap or RSS. See [geometry measurements](C:/Users/Yerff/source/repos/PaddleTodayV2/docs/audits/geometry-cache-improvements-2026-10-06.json).

Browser boards now fetch one selected photo from the API. The existing editorial selector and full credit/license/caption fields are preserved for all 2,814 public routes. Selection changes invalidate delayed replies, fetches coalesce and time out, and failed images use the neutral fallback. A bounded 32-entry/32,768-character local cache supports seven-day offline recovery. The first uncached preview adds a request; its body is 578 bytes at the median and 837 bytes at the maximum, excluding image downloads. An uncached offline route displays the neutral fallback. Release the API endpoint before the updated frontend.

| Built browser dependency graph | Before | After |
| --- | ---: | ---: |
| Weekend JavaScript | 802,706 bytes | 259,846 bytes |
| Weekend JavaScript, gzip | 171,704 bytes | 83,665 bytes |
| Complete gallery browser chunk | 545,259 bytes | Absent |

The home bootstrap remains approximately 178 KiB because its board already hydrates dynamically; its hydrated board no longer imports the gallery chunk. Measurements follow static ESM imports and exclude runtime requests and images. See [before](C:/Users/Yerff/source/repos/PaddleTodayV2/docs/audits/browser-preview-bundles-before-2026-10-06.json), [after](C:/Users/Yerff/source/repos/PaddleTodayV2/docs/audits/browser-preview-bundles-after-2026-10-06.json), and [preview bodies](C:/Users/Yerff/source/repos/PaddleTodayV2/docs/audits/photo-preview-responses-2026-10-06.json).

The API packager compiles 255 reachable server inputs and copies eight explicit runtime JSON resources. It preserves the complete one-origin static fallback, geometry, gallery images, exact locked external dependency versions, and root dependency overrides. Lossless build-time gzip reduces the final 3,263 HTML pages from 303,302,948 to 63,102,678 bytes. Clients requesting gzip receive stored files directly; identity clients receive streaming decompression with correct HEAD lengths, cache policy, and disconnect handling.

The conservative application-file comparison drops from 615,975,156 to 338,733,503 bytes: **264.4 MiB saved, 45.0 percent**. This comparison excludes installed dependencies, vendor tarballs, manifests, and lockfiles; it is not a compressed deployment ZIP or cloud billing measurement. See [package measurements](C:/Users/Yerff/source/repos/PaddleTodayV2/docs/audits/api-package-improvements-2026-10-06.json). The prepared package disables repeated deployment build work through the documented [Kudu setting](https://github.com/projectkudu/kudu/wiki/Configurable-settings), and the workflow supplies the supported [deployment action startup input](https://github.com/Azure/webapps-deploy/blob/v3/action.yml). No live App Service configuration was changed or verified.

Final verification: `npm run test:api -- --maxWorkers=2` passed **1,076 tests across 196 files**, route/runtime TypeScript, and scoring safety invariants for 1,831 routes and 39,977 scenarios. Seventeen additional package/gallery/lifecycle tests passed across five files. The final isolated Astro build produced **3,263 pages in 37.05 seconds**. Gallery browser checks passed eight cases with four expected skips across three projects. The refreshed compiled package passed **21 runtime/resource checks** with external network access disabled, including native JPEG processing, authenticated admin operations, geometry/photo delivery, exports, readiness, and byte-for-byte recovery of **all 6,561 final static resources**. This local package check used Windows and Node 24.14.0; the workflow's Linux/Node 22.12 environment still needs its CI run. Scoped diff checks passed. The prior nine catalog failures and coordinate-boundary timeout are resolved locally.

Private-photo storage is now implemented locally. New processed JPEGs use private binary objects; ownership, captions, dimensions, reservations, and quota accounting remain in the authorized log/index. Legacy base64 JSON photos remain readable and deletable without a bulk migration. Upload and mobile queue contracts retain base64 so existing offline uploads can retry. Late writes after deletion are removed immediately; maintenance expires interrupted reservations and collects old unfinalized binary objects using modification timestamps. Azure request and listing fields follow the documented [Put Blob](https://learn.microsoft.com/en-us/rest/api/storageservices/put-blob) and [List Blobs](https://learn.microsoft.com/en-us/rest/api/storageservices/list-blobs) contracts; cloud storage was not contacted or modified.

Two deterministic JPEG fixtures save 25.01–25.05 percent of their former photo-object bytes. The 1,318,276-byte fixture replaces 1,757,873 bytes of legacy JSON. Separate read workers observed process peak RSS of 62,435,328 bytes for legacy read/parse/decode and 48,594,944 bytes for binary reads. These workers perform forty local reads with explicit garbage collection and exclude authentication, HTTP and upload preprocessing; the observations are not production peak-memory measurements. See [photo measurements](C:/Users/Yerff/source/repos/PaddleTodayV2/docs/audits/private-photo-improvements-2026-10-06.json).

The photo checkpoint passes 48 server/storage tests across five files, runtime TypeScript, and 13 offline repository tests, including restart/retry recovery, ownership, quotas, legacy reads, all three delete/upload races, orphan cleanup, interrupted account deletion, Azure request headers/pagination/body timeouts, and the unchanged HTTP upload contract. No mobile photo-queue format or existing object was migrated. A backend rollback must support the binary format to read newly uploaded photos; deploy compatible readers across instances before accepting new-format uploads.

Future AAB/APK outputs are excluded from Git and EAS archives. Both previously tracked release bundles are now removed from the checkout as reviewable unstaged deletions; the existing staged changes were preserved. The two removals recover **150,920,926 bytes (143.9 MiB)** of checkout space. Keeping one archived copy outside the checkout yields approximately **75,460,463 bytes (72.0 MiB)** of net local disk savings, excluding the small manifest. Git history still retains the original files.

The verified [release archive](C:/Users/Yerff/Documents/PaddleTodayReleaseArchives/paddletoday-1.1.2-3a4a0f38e6b9/paddletoday-1.1.2.aab) and [provenance manifest](C:/Users/Yerff/Documents/PaddleTodayReleaseArchives/paddletoday-1.1.2-3a4a0f38e6b9/archive-manifest.json) are saved in the user-approved Documents directory. The archive is 75,460,463 bytes with SHA256 `3a4a0f38e6b9074e5148251b8e502ad4f130b699077a4ff482226110149cdea1`, matching both original copies. Independent PowerShell hash/length checks verified all three files before cleanup and the archive after cleanup. The local cleanup receipt is `.local/efficiency-audit/android-release-archive.json`; completion was recorded at `2026-10-06T15:38:54.6633931Z`.

[The archival command](C:/Users/Yerff/source/repos/PaddleTodayV2/scripts/archive-android-release.mjs) requires a destination outside the checkout, streams SHA256 verification in bounded chunks, refuses differing source copies or conflicting archives, records provenance, and verifies retrieval from the saved manifest. It archives only; exact checkout copies were removed separately after verification. The manifest's `checkoutCopiesRemoved: false` records the archive-time state, while the cleanup receipt and this checkpoint record the subsequent removal. Five fixture tests passed, including a junction resolving into the checkout. No automatic archive expiry, cloud retention change, or Git-history rewrite was configured.

Catalog corrections preserve the user's reviewed consolidations and planning-only choices. New York's exact ID list already contains 302 routes; tests now retain that list and reject the withdrawn Mohawk duplicate. Rotterdam's eight-access canal corridor uses the direct, regulated Lock 8 gauge, while Mays Point keeps its Seneca proxy. All existing safety hazard assertions remain, with urban water quality retained on the replacement corridor. Idaho's revised BLM Class III–IV Staircase card adds one high-consequence route; a landing-specific safety note restores the existing three-note coverage requirement. Minnesota operations counts reflect 137 scored/121 planning routes and explicitly keep both guarded sections in planning. Pennsylvania's documented Canal Park–Wetlands consolidation keeps 62 cards and the Wetlands access in its parent planner.

The geometry coverage refresh inventories actual current route files and rebuilds state bundles from those same coordinates, retaining three legacy route files. It reports **2,798 matched routes and 16 unmatched routes out of 2,814 public routes**. It preserves the original generation fingerprint and records the current catalog fingerprint separately: coverage refresh does not claim all traces were regenerated against current endpoints. Two additional file-backed traces were produced from available evidence. A full generation attempt waited on remote requests; its incomplete offline output was restored before the coverage refresh. Missing geometry remains explicit, including Big Fork Johnson–Big Falls East, Namekagon Springbrook–Big Bend, the renamed Penobscot Winn–Greenbush route, and thirteen lake routes. Integrity coverage checks every state feature against its route file, requires actual missing-file lists, and retains all original geometry safety checks. Full regeneration now has a bounded request timeout, and the npm generation command retains legacy files.

The coordinate hold test keeps its original assertions and now allows twenty seconds for its separate Node process under parallel suite load. No safety or publication assertion was removed. Local receipts are `followup-api-tests.log`, `followup-build.log`, `package-gallery-final-tests.log`, `api-package-verification.log`, and `geometry-coverage-refresh.log` under `.local/efficiency-audit`.
