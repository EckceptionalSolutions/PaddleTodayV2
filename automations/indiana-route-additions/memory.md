# Indiana Route Additions Automation Memory

Use this file to bootstrap Indiana route expansion with access-law and dam hazards kept explicit.

## Setup Notes

- Created 2026-05-30 as one of five next state automations.
- Start every run by reading this file, `src/data/rivers.ts`, `src/data/river-trip-details.ts`, `docs/midwest-route-automation-memory.md`, `docs/route-candidate-ledger.json`, `docs/route-addition-requirements.md`, and `docs/river-image-source-audit.csv`.
- Existing PaddleTodayV2 coverage has no Indiana routes as of creation. Reconcile inventory before adding any candidate.

## State Quirks

- Indiana DNR describes water trails as streams with at least two public access points.
- Indiana DNR river-rights guidance says navigable rivers and beds are held in trust by the state and can be used by the public, with the ordinary high-water mark as the practical boundary.
- Non-navigable or privately bordered routes need stronger endpoint/access proof; do not assume bridge launches are legal or normal.
- Indiana DNR maintains low-head-dam safety resources and maps public access sites, low-head dams, stream miles, public lands, and bridges. Check dam context before shipping any route.
- Indiana law can prohibit boating/wading/access within 50 feet of signed low-head dams. Treat signed dams, portages, and dam-adjacent take-outs as route blockers unless the safe route is clear.

## Source Stack

- Live gauge: USGS Water Services.
- Access/route authority: Indiana DNR water trails, DNR Where-to-Fish/public-access map, county/city park pages, official blueway/water-trail managers, NPS/USFS where relevant.
- Threshold support: AW exact reaches, official manager guidance, strong route-specific local/outfitter guidance only when tied to the selected gauge.

## Early Targets

- Gauge-first review of Blue River, Tippecanoe River, White River, Wildcat Creek, Sugar Creek, Driftwood/Flatrock/Big Blue, Eel River, and East Fork Whitewater River.
- Prefer official water trails and established public-access pairs over informal bridge-to-bridge floats.
- Mark candidates `threshold_weak` when access is good but numeric gauge support is generic.
- Mark candidates `research_later` or `rejected` where low-head dams, private access, or endpoint ambiguity cannot be resolved.

## Validation

- If app code changes, run `npm.cmd run typecheck`, `npm.cmd test` if viable, `npm.cmd run build` if available, and `git diff --check`.
- If only docs/ledger/memory changed, validate the ledger JSON and run `git diff --check`.
