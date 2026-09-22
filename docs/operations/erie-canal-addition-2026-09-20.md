# Erie Canal route request — 2026-09-20

Added `erie-canal-little-falls-lock-e18-return`: the official Little Falls Rotary Park–Lock E18 round trip, approximately 6.2 miles with zero locks and no shuttle. It is public planning coverage, not a live-scored route. The Erie Canal group now has 30 non-withheld routes (29 before this addition). Fairport–Bushnell’s Basin, Brockport–Holley, and Cedar Bay–Chittenango Landing were already public locally; no duplicate cards were added for those trips. Deployment was not performed.

## Evidence and operating boundaries

- [Official Canalway day trips](https://eriecanalway.org/explore/watertrail/paddling-trips) identifies the 6.2-mile no-lock itinerary. The [Mohawk Valley itinerary](https://eriecanalway.org/explore/Plan-Visit/itineraries/battles-boats-big-views-mohawk-valley-journey) independently recommends it.
- [NYSDEC Herkimer County launches](https://dec.ny.gov/things-to-do/boating/launch-sites/herkimer-county) supplies Rotary Park ramp (43.033539, -74.866107; 25-car parking) and Little Falls Launch (43.025583, -74.882083; 20 cars/trailers). Rotary Park is both start and finish; Little Falls Launch is an optional vehicle-pickup bailout.
- [Canalway guide pages 172–175](https://eriecanalway.org/download_file/view/1555/547) establishes the harbor ramp, facilities, camping, and downstream dams/Guard Gate 4. Visually reviewed the map on page 174. The route heads upstream and does not enter that downstream control complex.
- [Guide page 171](https://eriecanalway.org/application/files/4816/6611/7527/4_WTGuide2E_Erie_Syracuse-to-LittleFalls_p133-171.pdf) prohibits mooring at E18’s eastern end and describes the bypass/confluence. Turn in open water short of the approach; no lock-wall landing, lock passage, portage, or bypass extension is included.
- [USGS 01347000](https://waterdata.usgs.gov/monitoring-location/USGS-01347000/) is a same-river downstream proxy. No numeric paddling thresholds are asserted.
- [Current canal notices](https://www.canals.ny.gov/Boating-Information/Canal-Alerts) remain a departure check. The notice detail fetch was unavailable during this review; this record does not assert that the route is open today.

## Geometry and overlap

The trace reuses the reviewed NHD channel from the existing German Flatts–St. Johnsville asset, starts at the DEC ramp, turns at -74.9142, 43.016427 (short of E18), and retraces to the ramp. Turnaround coordinates represent a route limit, not a public access. The published mileage is approximate and may shorten with launch choice or an earlier turn.

The existing one-way German Flatts–St. Johnsville and Herkimer–Little Falls routes share this water. This addition is the officially named no-lock, no-shuttle day trip with a different operating plan, not a concatenation of through-routes. The overlap command completed, but currently audits scored routes only; the planning overlap was reviewed manually.

The coordinate audit checked three distinct endpoint/access roles: all within 100 feet of mapped water, no failures, no access-review queue, and no source issues. It marks all three `review` because the combined canal/river name did not match a named flowline; DEC launch evidence supplies access identity. This is not a surveyed shoreline claim. No existing withheld route was released.

Verification found that endpoint snapping clipped same-launch traces to an intermediate bailout. The shared geo helper now preserves an explicitly closed trace only when both requested endpoints exactly equal its start. Ordinary point-to-point slicing remains unchanged. Regression tests cover both behaviors and the Little Falls route boundary.

## Validation

- Route data audit passed (3030 inventory routes); existing planning issues remain tracked.
- Shared geo tests and typecheck passed; route-publication and canonical-geometry tests passed after asset regeneration.
- Generated route geometry, state bundles, manifest, and Explore overview.
- Full route typecheck remains blocked by existing `accessPointRole` spec errors in other New York records and three unsupported Wisconsin source-provider values.
- Whole-catalog geometry budget audit remains blocked: route files total about 40.05 MiB against a 40 MiB cap. The new route asset is under 2 KiB; the cap was not raised.
