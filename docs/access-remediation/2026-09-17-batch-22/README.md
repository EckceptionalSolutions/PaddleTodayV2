# Access point remediation batch 22

Reviewed September 17, 2026 using the [access-point remediation runbook](../../access-point-remediation-runbook.md). The ten physical sites in [selection.json](selection.json) are frozen from a cache-only queue; ranks are research priorities, not evidence.

## Result

Ten physical sites affecting 13 currently public routes were reviewed. No coordinates were moved. Five official access-area controls were added, and the shared Nissequogue provider was reclassified from an exact water-entry claim to access-area anchors. The Chief Looking Glass point is no longer mislabeled as a water-entry edge.

Three routes are withheld pending access proof: the 2750 E bridge river-right egress on the Teton River, the exact below-dam launch at Heery Woods, and the Portneuf endpoint identified as a public park by the route despite only having a diversion/monitoring anchor in official control data. The other seven sites and ten routes remain available. Withholding preserves each route record for later review.

## Decisions

| Rank | Site | Decision |
|---:|---|---|
| 247 | Sunken Meadow Field 3 | keep official access anchor; tide and carry dependent |
| 248 | Guadalupe River State Park | keep TPWD paddling-trail anchor |
| 249 | Willow Creek Campground | keep campground access-area anchor |
| 250 | SD Hwy 42 / Mary Jo Wegner | keep parking/park access anchor; follow signed launch |
| 252 | Twin Falls Park | keep official Murtaugh take-out area anchor |
| 253 | 2750 E Bridge | hold; current designated public take-out not verified |
| 254 | Chief Looking Glass FAS | reclassify to FWP access-area anchor |
| 255 | Heery Woods | hold; above-dam and separate below-dam ramps were conflated |
| 256 | PVC diversion | hold; current public landing at stored point not verified |
| 257 | Brice Park | keep NJDEP public access-area anchor |

## Validation limits

The selected sites and source findings are recorded in [review.json](review.json) and [source-metadata.json](source-metadata.json). A fresh cache-only audit cannot run because the `@paddletoday/geo` package is missing. The registry generator completed against the cached audit with zero conflicts, but it reads a separate authoritative-evidence artifact last generated September 5; it does not yet include the five new controls or Sunken Meadow reclassification. The control gatherer has no cached statewide inventories and would fetch full configured inventories, so that derived artifact was left untouched. No coordinate changed in this batch, so no geometry endpoint refresh is required for these edits. See [validation.json](validation.json) and [registry-control-snapshot.json](registry-control-snapshot.json) for exact results and limits.
