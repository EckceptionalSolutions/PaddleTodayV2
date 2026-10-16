# Route accuracy QA

Run `npm run routes:qa` from the repository root. Open `tmp/route-qa/index.html`, or use **Open latest QA report** in `npm run routes:control:ui` at http://127.0.0.1:4399. The dashboard's **Check all routes** button starts a local run and displays its outcome.

```powershell
npm.cmd run routes:qa
npm.cmd run routes:qa -- --state=Wisconsin
npm.cmd run routes:qa -- --route=<slug-or-id>
npm.cmd run routes:qa -- --refresh-sources
npm.cmd run routes:qa -- --strict
```

The runner combines data validation, the existing safety audit function, cached endpoint hydrography checks, geometry assets, corridor definitions, gauge-ledger consistency, and overlap findings. It includes the full route inventory, planning routes, and withheld routes in the checklist. The report explicitly describes narrower coverage of existing audits. Global asset and ledger checks still run for a filtered report. Missing endpoint results, missing source reviews, deferrals, and failed audits are never treated as verified facts.

The default run uses cached hydrography. `--refresh-sources` checks HTTP HEAD availability with six workers and a 12-second timeout per URL. It does not re-download hydrography, read page content, or verify claims. Some working sites reject HEAD requests; review those manually. Refresh hydrography separately with the existing `routes:audit:coordinates -- --refresh --include-withheld` workflow when needed.

## Reviewing facts

Each route has eight fact groups: identity, access, distance/time/shuttle, difficulty, hazards/portages, permits/camping, seasonality, and gauges/thresholds. Inspect every displayed value in a group against the cited evidence before marking it supported. Record disagreement as `conflict`; do not silently fix production data from a heuristic finding.

```powershell
npm.cmd run routes:qa:review -- --route=<slug> --field=access --verdict=supported --source="https://official-source.example/map" --note="Map identifies both public launches and their coordinates; parking restrictions match the displayed caveats."
```

Reviews append to the tracked `docs/route-qa-evidence.json` ledger. Each review includes a timestamp, URL, explanation, verdict, and hash of the exact facts reviewed. Changes to those facts invalidate the review; supported reviews expire after 180 days. A source link in the route record alone does not count as verification. A conflict remains actionable until reviewed again. Rerun QA after recording evidence.

## Results and history

`tmp/route-qa/latest.json` contains the machine-readable result, and `tmp/route-qa/runs/<timestamp>/` retains raw audit artifacts and logs. Reports are local and ignored by Git. The overlap command also regenerates its standard reports in `tmp/`. Routes and production publication state are never edited.

The dashboard supports search and filters for state, population, route status, new findings, and high/critical findings. Route cards include endpoint map links, facts, evidence notes, source links, and coverage limitations. Safety findings flag language requiring review; they do not establish factual errors.

Comparisons use the same selected route IDs and source-refresh mode. New and remaining findings compare with the previous report, including reports with audit failures. Resolved findings require both reports to have completed without audit failures. Successful runs also save a baseline; failed runs cannot replace it. Audit execution/validation failures exit nonzero; `--strict` additionally exits nonzero for any high or critical review finding. A zero exit code means the audits completed successfully, not that every fact is verified. Skipped source availability checks are listed explicitly.

Concurrent runs are blocked by `tmp/route-qa/.lock`. After a process crash, confirm no QA process is running before removing that directory. The evidence writer separately prevents concurrent ledger writes. No recurring schedule is installed.

## Endpoint source refresh and review views

For bounded endpoint-local hydrography refresh, run `npm run routes:audit:coordinates -- --endpoint-local --include-withheld --concurrency=8 --request-timeout-ms=5000 --request-attempts=1`. This queries USGS 3DHP Flowline (50) and Waterbody (60) around each access coordinate and retains complete source responses in the local cache. The search radius is 0.005 degrees; geometry generalization is 0.00001 degrees. Water polygons establish mapped-water proximity, not a legal or usable launch. Named-line absence does not establish an erroneous coordinate.

Use `--offset=N --limit=N` to resume or inspect an inventory window. Window reports state their coverage and must not be presented as a full inventory audit. The `.progress.jsonl` companion retains completed route results during a long run. Network errors and incomplete responses remain explicit gaps. A full cached QA run uses endpoint-local evidence only when both source layers are available for every point on a route; otherwise it uses available legacy evidence and reports missing coverage.

The dashboard defaults to **Issues**. **Evidence gaps** shows missing reviews, unverified planning flow floors, and unresolved hydrography coverage. **Information** retains shared endpoints, documented overlaps, and unconfirmed access-chord crossings. **All records** shows the complete queue. These views classify findings without deleting them or marking route facts verified. High and critical findings always remain issues.
