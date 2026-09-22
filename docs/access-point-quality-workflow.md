# Access point quality review

Run `npm run routes:audit:access-quality -- --cache-only` to audit the current catalog using local NHD evidence without making network requests. Outputs are `docs/access-point-quality-audit.json` and its Markdown summary. This leaves the coordinate-correction workflow's existing report untouched. Omit `--cache-only` to fetch missing or invalid evidence; add `--refresh` to request new source observations. `--route=<route-id> --output=<path.json>` supports focused investigations.

The audit covers put-ins, take-outs, and intermediate access coordinates across the full route inventory, including routes that are not public. Its existing `severity` describes route matching and access evidence. The separate `waterProximity` describes the closest returned named/connected flowline or water polygon: within 100 feet, within 300 feet, over 300 feet, over 800 feet, or unknown. Access citations and parking-anchor exceptions do not reduce this distance. Polygon holes are excluded from water containment.

`sourceIssues` lists failed, absent, invalid, or truncated query responses. The audit rejects these responses rather than caching them as successful observations. Incomplete evidence can demonstrate nearby mapped water, but cannot establish that an endpoint is far from all mapped water. Cached observations can be older than the report generation date.

`accessReviewQueue` groups exact coordinates, retains every route occurrence at that location, and sorts by distance to the closest observed water. Locations with the same name but different coordinates remain separate. An official property/area centroid also enters the queue, even if it is near water. This is a research queue, not a set of approved corrections.

For each queued location:

1. Confirm the intended named access using the managing agency's map or source record.
2. Inspect imagery and shoreline context to locate the actual launch or landing. Distinguish parking, road crossings, property centroids, and water-entry coordinates.
3. Check the river/reach and public-access identity. Near water alone does not establish either. NHD omissions, unnamed streams, seasonal channels, and generalized shorelines can create apparent offsets.
4. Record the evidence for a correction, check all affected route occurrences, and use the existing coordinate-correction workflow only after the candidate is verified.

This command does not move coordinates, change publication holds, or automatically snap points to water.

For research and remediation, follow the [operator runbook](access-point-remediation-runbook.md) and its [completed ten-site example](access-remediation/2026-09-17-batch-01/README.md). Refresh the access registry from this full report with `npm run routes:access-registry:generate -- --audit=docs/access-point-quality-audit.json`; the flag preserves the legacy correction workflow's separate audit snapshot.
