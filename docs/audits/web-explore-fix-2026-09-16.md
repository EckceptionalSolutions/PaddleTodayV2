# Explore fixes and production data diagnosis

Implemented locally on September 16, 2026. Production has not been changed.

## Confirmed cause of missing production data

The Azure job `paddletoday-river-snapshots` is running image revision `09d9510dbd1a79beee8ba3b9d6a44714344157d4`, from August 29. It still runs twice an hour, so its old catalog produces snapshots with recent timestamps.

The [September 16 worker deployment](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/35103716155) failed at **Validate job and monitoring permissions before building**. Its identity lacks `Microsoft.Insights/actionGroups/write` and `Microsoft.Insights/scheduledQueryRules/write`. The six most recent worker deployments inspected all failed. The Azure job's image confirms that successful API/catalog updates have outpaced the worker.

At audit time, production catalog coverage was 2,704 routes / 48 states, while the fresh scoring snapshot contained 901 routes / 22 states. Arizona and Alabama routes missing from that snapshot returned scored results through individual detail endpoints. This establishes a deployment mismatch in addition to the deliberate exclusion of planning routes from scoring.

No snapshot alert action groups or scheduled-query rules were found in the resource group during the audit. Monitoring provisioning therefore remains separate outstanding infrastructure work; this change does not grant new permissions or delete/disable alerts.

## Changes

- Added `/api/rivers/explore.json`, which starts from the current public catalog and overlays existing snapshot scores. Missing scores cannot remove published routes. Planning routes and temporarily unavailable scores remain unscored in the interface; publication/withholding gates still apply.
- The response reports catalog revision, public/scored/planning counts, missing score count and affected states, plus the producing snapshot's catalog metadata when available.
- Explore defaults to all published routes. Geography is explicit: Anywhere, Near a location, or In a state. Only nearby scope applies a radius. State selection is visible outside More filters.
- Trip presets retain state/search and clear conflicting trip-length/time choices. Clear trip filters preserves geography. Browse all routes resets to unrestricted national browsing. Scope is included in saved/shared searches. New preference storage avoids silently reapplying the old restrictive defaults.
- Conditions use “Paddle today” and “All conditions.” Planning cards say “Planning route” / “Not scored”; unavailable cards do not repeat stale positive paddling recommendations.
- A lightweight map coverage layer includes every matching route, independently of the limited detailed labels. Map bounds use the full matching geography. National zoom can fit the whole country. The load-more-labels control is visible on desktop and mobile.
- Result counts distinguish routes and rivers. Empty states explain that existing routes may be excluded by conditions or trip filters. Presets update in place instead of moving the page while the user is choosing filters.
- Worker deployment now separates routine image/job updates from optional monitoring provisioning. ARM deployment explicitly uses Incremental mode. The Bicep template still provisions monitoring by default for independent infrastructure setup; the restricted CI workflow skips it unless explicitly requested.
- New worker snapshots record source/catalog revision and expected route counts. The worker rejects missing/duplicate/substituted scored slugs before publishing.
- Added `scripts/check-explore-coverage.mjs` to compare deployed catalog and Explore slugs and fail on missing score coverage after rollout.

## Validation

### Follow-up UI pass

- Stacked the controls into numbered steps: choose an area first, then optionally expand trip refinements. Saved trip filters open the second step automatically; its summary reports active filters when collapsed.
- Search and sort remain visible above results. Clearing trip filters preserves these controls and the chosen area; Browse all routes still resets the entire search.
- Conditions and the Explore map legend use Paddle today, Watch closely, and Skip, with All conditions including unscored routes. Older Strong/Good searches migrate to Paddle today.
- Removed the nearby shortcuts from trip choices because they changed geography. Trip choices now only narrow trip attributes.
- Verified desktop and 390px layouts, accordion interaction, condition selection, clearing filters, and no horizontal overflow. The focused filter/URL tests and CSS syntax checks pass.

### Initial implementation

- Local API: all 2,869 published routes / 48 states returned, including 50 Arizona routes. Local inventory is newer than production; these counts are intentionally different.
- Browser: desktop national coverage includes the Southeast and Southwest; Arizona appears; Full day retains its state; nearby scope shows its city and 50-mile radius; switching to Florida removes the nearby restriction; Clear trip filters retains Florida and restores its 50 routes.
- Phone-width browser check at 390px: state and location controls remain usable with no horizontal overflow. Browser console reported no errors in the inspected session.
- Targeted domain, catalog, snapshot, loader, presenter, map, and API-client tests passed. Runtime TypeScript, CSS syntax, JavaScript syntax, and Bicep compilation passed.
- Production Astro build succeeded: 3,316 pages generated into an isolated local build directory.
- The full `npm run typecheck` wrapper stops at the pre-existing deletion of `packages/design-tokens`, which is still referenced by the token-check script. That unrelated package was not restored. Missing external validation dependencies were installed under ignored `.local/explore-runtime`; the repository lockfile was not changed by this work.

## Rollout

Deploy the worker, API, and web changes from the same catalog revision. Wait for a successful worker execution and snapshot readback. Then run:

```powershell
node scripts/check-explore-coverage.mjs
```

For a different environment, set `DEPLOYMENT_BASE_URL` first. The command must report identical catalog/Explore slugs and zero missing scored routes. Inspect `snapshotCatalog.sourceRevision` and both catalog revisions if completeness fails. No live-score value should be invented to make this check pass.

Monitoring resources can be provisioned separately by an authorized infrastructure identity using `provisionMonitoring=true`; routine worker refreshes no longer depend on those additional write privileges. This does not fix the currently running production job until the workflow changes and a new worker image are deployed.
