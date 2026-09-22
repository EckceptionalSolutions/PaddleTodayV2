# Mayor's Riverfront Park access correction

This review continues the [access-point remediation runbook](../../access-point-remediation-runbook.md) using the full refreshed audit from `docs/access-point-quality-audit-refreshed.json`. It selected Mayor's Riverfront Park from the unheld review queue because the stored point was over 800 feet from mapped Kalamazoo River water and a current water-trail listing publishes a GPS coordinate for the named public carry-in access.

Michigan Water Trails identifies the site as a city park boat ramp and developed carry-in, gives GPS **42.29142, -85.56233**, and describes an access path shorter than 50 yards. The prior route endpoint, **42.29059, -85.56645**, was a park-entry/area pin. The route take-out now uses the published access anchor. The source does not claim its GPS is a surveyed wet-edge point, so the registry role remains `authoritative-access-anchor` and the route note asks paddlers to confirm the exact bank entry.

The route-only refreshed audit now places the access anchor 135 feet from the Kalamazoo River and returns `review` with `within-100ft`; its predecessor was 888 feet from the named river and classified `failure`. The published access is within the listed carry distance and remains the take-out. The change therefore replaces a bad park-area pin with the source-backed public access anchor without pretending to know the exact shoreline contact.

## Repeatable steps

1. Start from a full network-backed audit and check that route/endpoint coverage is complete.
2. Select an unheld review-queue location and preserve its old coordinates, reason, and dependent routes.
3. Read the current managing or water-trail source. Separate its access-area GPS from any exact ramp/wet-edge claim.
4. Change coordinates only to the source-published point. Add a role control so future audits treat a parking/carry anchor as an access anchor, not wet-edge consensus.
5. Refresh the affected route against NHD. Keep the source's carry and uncertainty in route copy.
6. Rebuild canonical geometry and the full access registry, then run the catalog and batch verification scripts.

`selection.json`, `review.json`, and `source-metadata.json` preserve the site decision and source trail. `verify.mjs` checks the correction and its refreshed route audit; the full geometry/catalog audit is recorded in `validation.json` when the rebuild finishes.

The Boundary Creek / Saddle Pass point at **49.005, -116.655** in the open map was also rechecked. It is already held in batch 02. Current [route guidance](https://www.northidahorivers.com/Boundary_Creek.htm) describes a primitive border crossing at the put-in and warns that crossing into or out of Canada there is unlawful; it does not identify an exact lawful U.S.-side staging or water-entry coordinate. The existing hold remains in place, and the point was not snapped to a nearby flowline.
