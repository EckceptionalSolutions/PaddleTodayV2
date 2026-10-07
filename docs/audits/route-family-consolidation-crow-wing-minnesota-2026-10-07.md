# Crow Wing River route-family consolidation

Date: 2026-10-07

## Decision

Keep all 12 Crow Wing River trip choices on the river hub. Consolidate five overlapping endpoint combinations into their exact selected trip cards, leaving seven route-specific pages for the DNR-recommended day trips, the named rapids reach, a short intermediate option, the Wadena County park connector, and the distinct downstream gauge and dam-boundary reaches. This reduces the standalone route count from 12 to 7 without removing trip choices or treating the whole river as one condition zone.

The hub explains the Minnesota DNR Map 1 / Map 2 split at Nimrod and groups the seven retained route pages by reach. Route cards continue to show each trip's endpoints, distance, gauge context, access, and source notes.

## Consolidated combinations

These five trips remain in the hub picker and resolve to their matching selected cards:

- `crow-wing-river-mary-brown-cottingham`
- `crow-wing-river-mary-brown-frames-landing`
- `crow-wing-river-andersons-crossing-cottingham`
- `crow-wing-river-stigmans-mound-cottingham`
- `crow-wing-river-huntersville-stigmans-mound`

Each overlaps the adjacent sections and access points already available on the hub. They remain usable as trip plans; only their duplicate standalone pages are removed from the indexable catalog.

## Standalone sections retained

- Huntersville North–Mary Brown: DNR's 7.3-mile recommended Map 1 day trip.
- Mary Brown–Stigman's Mound: a distinct named rapids reach.
- Stigman's Mound–Little White Dog: a short intermediate option with its own start and take-out.
- Little White Dog–Cottingham: DNR's 9.8-mile recommended Map 2 day trip.
- Cottingham–Old Wadena: a separate county-park connector.
- Old Wadena–Green Oak: downstream access with the Sylvan Dam gauge context.
- Green Oak–Lake Placid: reservoir approach with a mandatory take-out above Pillager Dam.

## Gauge, access, and safety context

- The selected trip determines which gauge to check. Nimrod provides DNR-interpreted context for the Huntersville-to-Cottingham corridor; Old Wadena–Green Oak and Green Oak–Lake Placid use the separate Sylvan Dam station. These stations are not interchangeable and should not imply one threshold for the whole river.
- The hub keeps the route-specific access and gauge notes for all 12 choices, including the longer combinations.
- The Lake Placid section retains the marked take-out above Pillager Dam. Consolidation does not create a through-route across the dam.
- Evidence reviewed: Minnesota DNR, [Crow Wing River segments and maps](https://www.dnr.state.mn.us/state-water-trails/crow-wing-river/segments-maps.html), [Map 2 PDF](https://files.dnr.state.mn.us/maps/canoe_routes/crowwing2.pdf), and [river-level guidance](https://www.dnr.state.mn.us/river_levels/index.html).

## Rollout verification

Pending CI deployment and production checks. Confirm the five former route URLs resolve to the exact hub cards, all 12 trip choices remain selectable, and the five consolidated URLs are absent from the sitemap while the hub and seven retained sections remain listed.
