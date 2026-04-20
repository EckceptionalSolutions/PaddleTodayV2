# Midwest Route Automation Memory

Use this file to avoid retrying the same blocked routes unless new evidence directly fixes the prior blocker.

## Added

- 2026-04-20: `Snake River - County Road 9 carry-in access to Snake Bit Access`
  - Added to PaddleTodayV2 with an official-source-backed `minimum-only` model on `USGS 05338500`.
  - Remaining caveat: Snake Bit is clearly named on the DNR map, but the best exact access anchor today is the nearby official Snake/St. Croix public-water-access record rather than a standalone Snake Bit facility page.

- 2026-04-20: `Cloquet River - Island Lake Dam Carry-in Access to Bachelor Road Access`
  - Added to PaddleTodayV2 with an official-source-backed `minimum-only` model on `USGS 04021960`.
  - Remaining caveat: MN DNR provides a strong low-flow floor and a better May-June release target, but no published upper threshold band for this exact route.

- 2026-04-18: `Iowa River - Sturgis Ferry Park to Hills Access`
  - Added to PaddleTodayV2 with a conservative `minimum-only` model on `USGS 05454500`.
  - Remaining caveat: no official paddling ladder for the Iowa City gauge.

## Rejected

- 2026-04-20: `Snake River - Rush City Public Access to Bridgeview Park (Pine City)`
  - Old PaddleToday route exists, and the Pine City gauge ladder on `USGS 05338500` is strong.
  - Blocker: official support is strong for nearby Snake routes, but this exact reach still lacks a clean official trust trail naming both endpoints with enough specificity to clear the current bar.
  - Retry only if: MN DNR map/PDF extract, county access map, or city/agency access page clearly names both the Rush City and Bridgeview/Pine City landings for this exact route.

- 2026-04-20: `Root River - Lanesboro to Rushford`
  - Old PaddleToday route exists, but current official Root River materials support adjacent recommended trips instead of this combined corridor.
  - Blocker: the route is not presented as a single official recommended trip, so the access and threshold story would still be a stitched composite.
  - Retry only if: official route or access documentation clearly supports this exact combined segment and provides a defensible gauge story for the corridor.

- 2026-04-20: `Cedar River - Riverwood Landing to State Line Road`
  - Official Cedar River route support and direct `USGS 05457000` gauge support look promising.
  - Blocker: no non-guessy numeric threshold model was found, and the official flow guidance stayed qualitative or seasonal rather than route-calibration-ready.
  - Retry only if: official river-level interpretation or strong same-route numeric evidence supports at least a conservative minimum-only model.

- 2026-04-18: `Cannon River - Cannon Falls to Miesville Ravine County Park`
  - Strong official route support, but thresholding is still too weak.
  - Blocker: only a nearby Welch gauge story exists; porting Welch thresholds upstream would be guesswork.
  - Retry only if: new official or mixed-source evidence establishes a defensible route-specific model for this shorter upstream segment.

- 2026-04-18: `Cannon River - Welch to Highway 61`
  - Blocker: endpoint authority gaps, especially around the Welch / Highway 61 public-access story.
  - Retry only if: official access pages, GIS records, or manager documentation resolve both endpoints cleanly.

- 2026-04-18: `Cannon River - Highway 61 to Bay Point`
  - Blocker: endpoint authority gaps and weak trust trail on public access.
  - Retry only if: official access documentation resolves both endpoints cleanly.

- 2026-04-18: `Chippewa River - Dunnville to Durand`
  - Direct USGS gauge and public-land context exist, but threshold support is still too weak.
  - Retry only if: official or mixed-source evidence supports a defensible low floor or route range without guesswork.

- 2026-04-18: `Apple River - County Highway E to Apple River County Park`
  - Blocker: no usable live-gauge model at current V2 standard.
  - Retry only if: a defensible live USGS pairing or clearly supportable proxy model is found.

- 2026-04-19: `Rum River - Wayside Landing to Milaca City Park`
  - Official route and direct gauge exist.
  - Blocker: no defensible published paddling ladder or same-route numeric evidence tied to `USGS 05284660`.
  - Retry only if: DNR, USGS-adjacent manager guidance, or strong mixed-source numeric evidence supports a route-level low floor or range.

- 2026-04-19: `Sauk River - Spring Hill County Park to Rockville County Park`
  - Official endpoints exist.
  - Blocker: only a looser downstream same-river gauge story for a long upstream reach.
  - Retry only if: a defensible direct or near-direct threshold model is found for this exact corridor.

- 2026-04-19: `Minnesota River - Kinney Access to Skalbekken County Park`
  - Official day-trip listing exists.
  - Blocker: threshold support is still weak and endpoint detail is still thinner than the current bar.
  - Retry only if: endpoint authority improves and a defendable gauge model is found.

- 2026-04-19: `Cedar River - Janesville 183 to Winegar Park`
  - Direct gauge exists.
  - Blocker: 47-mile corridor is too broad and portage-heavy for a clean route-level threshold model.
  - Retry only if: broken into smaller route units with clear endpoint and threshold support.

- 2026-04-20: `Rice Creek - Peltier Lake to County Road I`
  - Blocker: duplicate coverage. The existing `Rice Creek - Peltier Lake to Long Lake` route already carries the same official `USGS 05288580` gauge story and includes `County Road I access` as the 11-mile intermediate official exit.
  - Retry only if: product policy changes to explicitly split already-covered routes into separately listed official subsegments instead of keeping them as intermediate exits on the parent route.

- 2026-04-20: `Des Moines River - Austin Park to Keosauqua Boat Ramp`
  - Official route support is strong: Iowa DNR names this exact 5.8-mile Segment #4, Van Buren County Conservation runs an official `Austin Park to Keosauqua Paddle`, Austin Park has an official county launch page, and Villages of Van Buren clearly treats Keosauqua Boat Ramp as a public named access.
  - Blocker: threshold support is still too qualitative. The official route materials say the segment is beginner-friendly when water levels are normal and warn about low/high water and Red Rock release effects, but they do not provide a non-guessy numeric paddling floor or range for `USGS 05490450` or `USGS 05490500`.
  - Retry only if: Iowa DNR, Van Buren County, USGS-adjacent manager guidance, or strong same-route mixed evidence ties this exact Austin-to-Keosauqua segment to a defensible numeric minimum or range.

## Blocked Until Date

- Through 2026-11-30: `Cannon River - Cannon Falls to Miesville Ravine County Park`
  - Dakota County reported Miesville access closure through November 2026.
  - Do not retry before 2026-12-01 unless an updated official access notice says the closure ended earlier.

## Rules

- Do not retry a route listed here unless new evidence directly addresses the blocker.
- Prefer genuinely new candidates over rechecking old rejected ones.
- If a route is added to PaddleTodayV2, move it to `Added`.
- If a route remains blocked, keep the exact blocker explicit and actionable.
- Treat the live V2 inventory in `src/data/rivers.ts` as the route source of truth if this file lags behind added routes.
