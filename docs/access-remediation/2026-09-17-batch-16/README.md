# Access point remediation batch 16

Reviewed September 17, 2026 under the [access point remediation runbook](../../access-point-remediation-runbook.md). The ten physical sites at cached audit ranks 184–193 were frozen in [selection.json](selection.json) before research. Queue ranks and water-offset distances are prioritization hints only: the full access audit is stale because `@paddletoday/geo` is missing.

## Result

One coordinate was corrected: Spring Hill County Park on the Sauk River. Minnesota’s public-water-access GIS feature **OBJECTID 2500 / WAS00338** gives **45.529866726150793, -94.775652824582878** (WGS84; ArcGIS `y` is latitude and `x` is longitude), administered by Stearns County at RM 56.1. The old point was about 120 m away. The official DNR trail map also lists a separate Spring Hill carry-in at RM 56.2 on the left bank; the correction standardizes the route references on the named RM 56.1 GIS access feature and records that bank/site distinction. This coordinate is an access-site anchor, not a surveyed ramp toe. All route and trip-detail copies were searched and updated, including the Spring Hill-to-Frogtown route that the stale queue did not list.

Two sites remain unverified for publication. Reese Avenue in Greenwood has no current managing-agency evidence for the named roadside carry and parking; Greenwood’s canoe-access page identifies the separate Clark County Park. Sac City’s current pages conflict: its water-trail page says the Riverview access is in use, while the City Projects page still says the new access is under construction and does not confirm it is open. The Reese route and both Riverview-dependent routes are withheld while their records remain in the source data.

The other seven coordinates were retained. Six new official access-anchor controls document the BLM Island Bar site, Burwell Riverside Park, Obergiesing/Dravo Park, the Michigan DNR Croton Dam access, Norwood Island campsite, and Minnesota’s Spring Hill GIS feature. Existing controls already distinguish the Outer Gooley parking/carry anchor from the route-side river landing and classify Sparks Bank as an access-area anchor. The saved controls explain why several good public sites can be hundreds of feet from hydrography without being bad coordinates.

## Repeatable review for a weaker model

1. Read `selection.json` first and keep its ten physical locations in order. It is a frozen cached list; do not quietly swap a difficult candidate for an easier one.
2. For each site, check the current managing-agency or operator page and existing controls. Write down what the published coordinate represents: launch, park, parking area, campsite, carry trailhead, or exact water entry.
3. Follow official map links into GIS when available. Save the complete query response, date, feature ID, attributes, geometry, and SHA-256. For ArcGIS points, `x` means longitude and `y` means latitude. Do not call a facility coordinate a surveyed ramp toe.
4. Check bank, dam side, carry, parking, hours, and route continuity. If a source describes a carry or the landing differs from parking, preserve the separate roles rather than snapping a pin to water.
5. Search the entire route and trip-detail source for every exact coordinate before editing. A site can be shared by routes that the cached audit did not show.
6. Keep a supported area anchor, correct it only to a defensible point for the same intended access, and reject/withhold if current public entry is unverified or official sources conflict. Keep the route and site records; write the missing evidence needed to reopen a hold.
7. Back up every source file before editing and snapshot existing controls. Add access controls with source hashes for verified anchors. Add holds only to dependent routes and preserve their existing source data.
8. Regenerate the withholding manifest, run the batch verifier and route typecheck, run a fresh audit and tests, and regenerate every changed public route geometry before rebuilding served artifacts. If a dependency blocks those checks, record the failure and do not assemble stale artifacts.

## Site decisions

| Rank | Site | Decision | Evidence-based action |
|---:|---|---|---|
| 184 | Island Bar Recreation Site, Idaho | Keep coordinate; add control | BLM’s coordinate matches within one foot and the page confirms a frequent Lower Salmon put-in. The pin remains a recreation-site anchor, not a beach toe. |
| 185 | Outer Gooley Hudson River take-out, New York | Keep route-side landing; retain separate carry anchor | NYSDEC confirms a 0.1-mile carry from the parking coordinate. Existing route controls preserve the distinct river-side take-out. |
| 186 | Reese Avenue canoe launch, Wisconsin | Reject as unverified; hold route | City confirms canoe access at Clark County Park, not this separate Reese Avenue approach. DNR map query was unavailable. |
| 187 | Burwell Riverside Park, Nebraska | Keep park-area coordinate; add control | NGPC names Riverside Park as the North Loup trail start; the city plan places it on the west bank. Neither publishes an exact landing coordinate. |
| 188 | Obergiesing Soccer Complex at Dravo Park, Ohio | Keep facility anchor; add control | Colerain Township confirms its public canoe ramp, parking, address, and dawn-to-dusk access; no ramp-toe coordinate is published. |
| 189 | Charles Besemer Muskegon River Park, Michigan | Keep exact DNR coordinate; add control | Michigan DNR publishes the stored coordinate for the paved boat launch below Croton Dam. |
| 190 | Riverview / Lions Park, Iowa | Reject as unverified; hold two routes | City water-trail and project pages conflict on whether the new entry is complete/open. Await a current site-status and exact-entry confirmation. |
| 191 | Norwood Island, Oregon | Keep official site coordinate; add control | Willamette Water Trail publishes the island coordinate and downstream mainstem campsite; it is not a single landing point. |
| 192 | Spring Hill County Park, Minnesota | Fix coordinate | Replace the park-side pin with official DNR feature WAS00338 at RM 56.1; propagate through every route and trip-detail copy. |
| 193 | Sparks Road / Sparks Bank Nature Center, Maryland | Keep existing anchor and control | DNR confirms the park/address and limited parking. Existing control correctly treats it as an access-area anchor. |

## Validation and limits

The batch verifier checks the frozen ranks, decisions, route coverage, coordinate propagation, new controls, source/backup hashes, holds, manifest count, and TypeScript syntax. Three route records use the corrected Spring Hill access coordinate. The three newly withheld routes bring the manifest from 149 to 152.

See [review.json](review.json), [source-metadata.json](source-metadata.json), [registry-control-snapshot.json](registry-control-snapshot.json), and [validation.json](validation.json) for the complete record. Generated route geometry and served catalog/registry artifacts must remain untouched until the missing workspace packages allow the route geometry, full audit, registry, and catalog checks to run.
