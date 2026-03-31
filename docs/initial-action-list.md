# Initial Action List

## Priority order

1. Slim the detail payload further and make per-source degraded states even more explicit.
2. Expand only to additional direct-gauge rivers with defensible thresholds and notes, including explicit `minimum-only` handling where only a low-water floor is supportable.
3. Add proxy-gauge support only after direct-gauge calibration remains stable across more rivers.
4. Move from in-memory caching to a persistent snapshot/cache layer only when real deploy behavior justifies it.

## Recently completed

- Added explicit `live`, `degraded`, and `offline` live-data states.
- Added gauge and weather freshness details to the result model and river detail page.
- Differentiated missing live gauge data from ordinary low-confidence scoring.
- Reordered the summary page by live river score so the best current option rises to the top.
- Refined ideal-band scoring so the middle of the target window scores better than its edges.
- Added explicit flow-band calls plus target-band and hard-bound rows on river detail pages.
- Expanded the seed set from 5 to 7 rivers by porting Kettle River and South Fork Zumbro from PaddleToday only where direct gauges and numeric ranges already existed.
- Calibrated the first 7 river profiles against stronger mixed-source or official threshold evidence and documented the working ranges in `docs/seed-river-calibration.md`.
- Added explicit threshold-evidence factors and a confidence-basis section so trust level is visible, not implied.
- Added river-specific regression tests to protect the calibrated Cannon, Straight, Zumbro, Black Hawk, Rice Creek, Kettle, and South Fork Zumbro thresholds.
- Added a thin Node API/cache layer and switched the browser to app-owned `/api` endpoints instead of direct third-party fetches.
- Added a one-origin preview path so the built static app and `/api` can run from the same Node process instead of depending only on the dev proxy.
- Added a summary-page current-read status strip so users can see when the backend last scored the river slate and whether any rivers are degraded or offline.
- Added a river-detail last-scored timestamp and HEAD support in the lightweight API server so preview/runtime probes behave like a deployable app surface.
- Added explicit `minimum-only` threshold support so rivers with only a defendable low-water floor do not get scored like fully calibrated two-sided bands.
- Expanded the seed set from 7 to 9 rivers by porting Upper Iowa River and Sugar River reaches from PaddleToday only where a direct gauge plus a low-water floor already existed.
- Added regression coverage for the new `minimum-only` threshold model and the two added rivers.
- Added lightweight request logging plus `/health` and `/health/ready` endpoints to the Node runtime.
- Added `npm run preview:local` so the one-origin preview can run on `4323` without colliding with the Astro dev server on `4321`.
- Rebranded the app shell to Paddle Today using the existing logo assets.
- Added a compact summary-page midpoint map with score markers so location context returns without bringing back browse-first map UX.
- Added river-detail gauge trend and weather visual panels so users can see the recent gauge shape and current weather signals without parsing raw source pages.
- Added a river-detail midpoint map with direct map links so each reach now has compact geographic context without turning the app back into a route browser.
- Ported old-route access points, shuttle notes, permit/camping notes, and hazard caveats into the new detail pages so each reach now carries trip-day logistics instead of only score logic.
- Added homepage search plus state, region, and chip filters so the river board stays usable as the seed set grows.
- Added evidence badges on summary and detail pages so users can see `USGS`, threshold quality, and `minimum-only` posture without digging into notes.
- Added detail-page Go / Watch / Skip checklists driven by score, trend, weather, and access realities.
- Added cautious tomorrow and weekend outlooks, with explicit withholding when source confidence is too weak.
- Expanded the seed set from 9 to 11 rivers by porting the downstream Black Hawk Creek reach and Bark River IV from the old repo.
- Added a deployment-readiness doc plus `npm run start`, and taught the Node runtime to respect `PORT` for standalone deployment.
- Slimmed the summary and detail API contracts so the homepage no longer downloads full river/editorial objects just to render the board.
- Added per-request IDs and cache stats to the Node runtime so production-style debugging is easier.
- Added a detail-page launch-readiness block that compresses the live score into a 5-second go / watch / skip read.
- Added explicit board and river reliability banners so degraded or offline calls no longer read like ordinary scores.
- Expanded the seed set from 11 to 13 rivers by adding Kickapoo River (Ontario to Rockton) and Upper Iowa River (Trout Run Park to Lower Dam) as cautious direct-gauge, minimum-only calls.
- Backed the summary-card source badges with live API payload data and strengthened the new Kickapoo and Trout Run logistics blocks using the carried-over PaddleToday route notes.

## Current boundary

- No route catalog.
- No map-first browse flow. The map stays secondary to the score board.
- No user accounts, reviews, or social features.
- No proxy-gauge rivers until the direct-gauge model is credible.
- No heavy backend framework or database yet.
