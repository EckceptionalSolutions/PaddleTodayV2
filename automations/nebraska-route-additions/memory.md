# Nebraska Route Additions Automation Memory

Use this file to bootstrap Nebraska route expansion while respecting private-bed and braided-river constraints.

## Setup Notes

- Created 2026-05-30 as one of five next state automations.
- Start every run by reading this file, `src/data/rivers.ts`, `src/data/river-trip-details.ts`, `docs/midwest-route-automation-memory.md`, `docs/route-candidate-ledger.json`, `docs/route-addition-requirements.md`, and `docs/river-image-source-audit.csv`.
- Existing PaddleTodayV2 coverage has no Nebraska routes as of creation. Reconcile inventory before adding any candidate.

## State Quirks

- Nebraska Game and Parks maintains designated water-trail maps and advises paddlers to check USGS Streamflow for high or low water before trips.
- Nebraska Game and Parks warns that land beneath Nebraska rivers and streams is considered private property, with an exception for portaging around fences or obstructions. Do not assume sandbar, dry-bed, or bank access is legal.
- Water-trail maps may include areas not controlled by Nebraska Game and Parks. Verify each endpoint's manager and public use.
- Platte and Loup-family rivers can be broad, braided, shallow, windy, and channel-shifting. Numeric thresholds must be route-specific enough to avoid misleading users.
- Niobrara routes can be outfitter/tubing-heavy, permit/park-fee influenced, and sensitive to private land and NPS/scenic-river rules.

## Source Stack

- Live gauge: USGS Water Services.
- Access/route authority: Nebraska Game and Parks water trails, NPS Niobrara National Scenic River, state parks/SRAs, NRDs, city/county parks, official water-trail maps.
- Threshold support: official manager guidance if available, AW for whitewater if exact, strong route-specific outfitter/local guidance only when tied to a product-fetchable USGS gauge.

## Early Targets

- Gauge-first review of Platte River Water Trail / Schramm Park corridor, Elkhorn River designated water trail segments, Niobrara day-trip reaches below Valentine, Dismal River, Loup River, and Republican/Blue River public corridors.
- Avoid lake/reservoir-only routes.
- Avoid long broad corridors unless one normal public endpoint pair, distance, hazards, and gauge relationship are clean.
- Treat private-bed/bank issues, fences, wind, sandbars, low water, and channel shifts as explicit caveats or blockers.

## Validation

- If app code changes, run `npm.cmd run typecheck`, `npm.cmd test` if viable, `npm.cmd run build` if available, and `git diff --check`.
- If only docs/ledger/memory changed, validate the ledger JSON and run `git diff --check`.
