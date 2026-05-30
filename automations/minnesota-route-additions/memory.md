# Minnesota Route Additions Automation Memory

Use this file to keep Minnesota expansion disciplined. Existing PaddleTodayV2 coverage is already strongest in Minnesota, so this automation should add only routes that materially improve the catalog rather than duplicating saturated rivers.

## Setup Notes

- Created 2026-05-30 as one of five next state automations.
- Start every run by reading this file, `src/data/rivers.ts`, `src/data/river-trip-details.ts`, `docs/midwest-route-automation-memory.md`, `docs/route-candidate-ledger.json`, `docs/route-addition-requirements.md`, and `docs/river-image-source-audit.csv`.
- Build the current Minnesota inventory first and reconcile obvious duplicates as `added`.
- Minnesota is a first-class DNR gauge state. Prefer Minnesota DNR river-level interpretations when they exist for a state water trail, and preserve the app's current rule that DNR gauges may be current-only if chart samples are not available.

## State Quirks

- Minnesota DNR publishes real-time river levels for state water trails and interprets many gauges as `Scrapable`, `Low`, `Medium`, `High`, or `Very High`.
- DNR says very high or very low water can be dangerous, and the interpretation bands are based on paddler/DNR experience rather than a universal hydrologic standard.
- State water trail maps are strong for official access, river miles, portages, rapids, dams, campsites, and hazards. Use them before blogs or outfitter pages.
- Some northern routes are remote or multi-day and should not be forced into same-day route scoring without clean access spacing and level guidance.
- Flood debris, strainers, cold water, rapids, dams, and seasonal shuttle/access limits should be treated as first-class caveats.

## Source Stack

- Live gauge: Minnesota DNR river-level pages when interpreted for the route; USGS Water Services when direct and product-fetchable.
- Access/route authority: Minnesota DNR state water trail maps, county/city park pages, NPS/USFS where relevant, local watershed/water-trail managers.
- Threshold support: official DNR interpreted bands first; AW for whitewater reaches; credible route-specific local guidance only as supplemental.

## Early Targets

- Reconcile existing Minnesota saturation before researching new corridors.
- Prefer gaps on state water trails with DNR interpreted gauges and official public endpoint pairs.
- Review Zumbro, Straight, Sauk, Crow, Vermilion, Rainy, Minnesota River secondary segments, and underrepresented northern state water trails only when they have a clean same-day route shape.
- Avoid adding another route on already dense corridors unless the new route has a distinct put-in/take-out use case and stronger gauge/access evidence than existing records.

## Validation

- If app code changes, run `npm.cmd run typecheck`, `npm.cmd test` if viable, `npm.cmd run build` if available, and `git diff --check`.
- If only docs/ledger/memory changed, validate the ledger JSON and run `git diff --check`.
