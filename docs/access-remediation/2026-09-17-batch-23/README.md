# Access point remediation batch 23

Reviewed September 17, 2026 using the [access-point remediation runbook](../../access-point-remediation-runbook.md). The ten sites in [selection.json](selection.json) are frozen from the cache-only queue; rank is prioritization, not evidence.

## Result

Ten physical sites affecting 20 currently public routes were reviewed. Peacock Slough’s shared State Parks camp coordinate was corrected from 30.1015,-83.136167 to 30.1015,-83.137167, the published camp GPS. The point is labeled as an access-area anchor rather than a surveyed river landing. Rock Hill River Park was also relabeled from a water-entry edge to a park/access-area anchor because the City confirms a canoe/kayak launch but does not publish an exact launch-edge coordinate. Ramcat, Payne Memorial, Auger Falls, Bunker Hill, and Germanium remain access-area or carry-in anchors with the scope reflected in route notes.

Four site decisions require route holds covering 12 routes: Concrete CCC Bridge, all nine Peacock Slough routes, Meadow Creek Campground, and Johnson Creek Airport. Their current lawful public carry or exact safe river-entry points could not be established from the available manager sources. The other six sites and eight routes remain eligible. No records were deleted.

## Decisions

| Rank | Site | Decision |
|---:|---|---|
| 258 | Ramcat Launch | retain official access-area anchor; about 324 ft mapped-water offset, not an exact water edge |
| 259 | Concrete CCC Bridge | hold; foot-only Fall River facility is not tied to this bridge or boat carry |
| 260 | Payne Memorial Park | retain current NYSDEC launch coordinate |
| 261 | Auger Falls Heritage Park | retain park access anchor and foot-shuttle constraints |
| 263 | Bunker Hill Road | retain public parking/access anchor; confirm bank/carry |
| 264 | Rock Hill River Park | relabel as access-area anchor; launch-edge GPS not published |
| 265 | Peacock Slough River Camp | correct GPS; hold nine dependent routes until geometry and landing are verified |
| 266 | Germanium carry-in | retain Minnesota DNR carry-in anchor |
| 268 | Meadow Creek Campground | hold; current day-use landing permission and location unverified |
| 269 | Johnson Creek Airport | hold; airfield directory does not establish public river carry |

## Validation limits

The selected sites and source findings are recorded in [review.json](review.json) and [source-metadata.json](source-metadata.json). A fresh route audit and geometry regeneration remain unavailable because `@paddletoday/geo` is missing. The route registry generator completed against the cached audit with zero conflicts, but consumes the separate authoritative-evidence file last generated September 5; it does not read the new provider controls directly. The evidence gatherer has no cached statewide inventories and would download them, so that generated artifact was left unchanged. See [validation.json](validation.json) and [registry-control-snapshot.json](registry-control-snapshot.json).
