# Kansas Route Additions Automation Memory

Use this file to bootstrap Kansas route expansion with the state's narrow public-river rule front and center.

## Setup Notes

- Created 2026-05-30 as one of five next state automations.
- Start every run by reading this file, `src/data/rivers.ts`, `src/data/river-trip-details.ts`, `docs/midwest-route-automation-memory.md`, `docs/route-candidate-ledger.json`, `docs/route-addition-requirements.md`, and `docs/river-image-source-audit.csv`.
- Existing PaddleTodayV2 coverage has no Kansas routes as of creation. Reconcile inventory before adding any candidate.

## State Quirks

- Kansas official access guidance identifies the Kansas, Arkansas, and Missouri Rivers as public rivers. Other rivers and streams are generally private unless permission/access is secured.
- KDWP warns that when public rivers flow through private land, permission is still needed for adjacent-land activities such as access, picnicking, camping, and portaging.
- Kansas Riverkeeper states the Kansas, Arkansas, and Missouri Rivers can be paddled without a special river permit, but access should use public ramps and sandbar use needs careful current-law review.
- The Kansas River is a strong first target because it has an organized access map, multiple public ramps, and riverkeeper/community support. The Arkansas can be low, braided, or dry in stretches and needs extra flow scrutiny.
- Avoid private tributaries such as Wakarusa, Delaware, Rock Creek, or Cottonwood/Neosho day trips unless public access permission and legal route use are explicit.

## Source Stack

- Live gauge: USGS Water Services.
- Access/route authority: KDWP Rivers and Streams Access, Kansas Riverkeeper/Friends of the Kaw, city/county park access pages, USACE/state parks where relevant, official water-trail or blueway maps.
- Threshold support: official manager guidance if available, AW exact reaches, route-specific Kansas Riverkeeper/outfitter/local guidance tied to the selected USGS gauge.

## Early Targets

- Gauge-first review of Kansas River day trips between public ramps, starting with short segments around Manhattan/Junction City, Topeka, Lawrence, De Soto, and Kansas City.
- Review Arkansas River only where reliable current water, public ramps, and route-specific threshold support exist.
- Review Missouri River Kansas-side access only with big-river commercial traffic, wind, wing-dam, and current caveats.
- Do not add private-stream candidates from access maps unless route legality and endpoint permission are unambiguous.

## Validation

- If app code changes, run `npm.cmd run typecheck`, `npm.cmd test` if viable, `npm.cmd run build` if available, and `git diff --check`.
- If only docs/ledger/memory changed, validate the ledger JSON and run `git diff --check`.
