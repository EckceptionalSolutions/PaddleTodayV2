# Batch 67 — Spring Creek Campground Access

Reviewed 2026-09-18. The frozen candidate was suspicious because its stored coordinate, `45.39203, -114.25161`, sat about 478 feet from the matched Salmon River line and 422 feet from mapped water. The Forest Service Recreation Opportunities GIS places its Spring Creek Campground marker about 660 feet west of the route pin and describes the site as a Salmon River put-in. Idaho Fish and Game's corridor guide maps a Spring Creek USFS ramp, and American Whitewater describes the good ramp as co-located with the Forest Service campground.

Kept the route coordinate unchanged. The evidence confirms the named public access area, but does not georeference the ramp's exact wet toe, so the suspicious endpoint is downgraded to review rather than reported as a precise water-entry point. The official campground point's 700-foot match envelope describes the documented co-located access area, not positional accuracy. The updated route note preserves this limitation.

Evidence: [USFS recreation GIS feature](https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_RecreationOpportunities_01/MapServer/0/query?where=RECAREAID%3D76086&outFields=*&returnGeometry=true&outSR=4326&f=pjson), [Idaho Fish and Game Upper Salmon guide](https://idfg.idaho.gov/sites/default/files/upper-salmon-river-steelhead-angling-pocket-guide.pdf), and [American Whitewater access guide](https://www.americanwhitewater.org/content/River/view/river-detail/611/main). Targeted NHD measurement and full before/after audits are included in this folder.

The refreshed public audit covers 2,750 routes and 6,058 endpoints: 57 suspicious, down from 58; 3,875 review, 2,048 okay, and 78 unknown. The full inventory covers 2,998 routes and 6,641 endpoints: 111 suspicious, down from 112; 51 failure and 89 unknown classifications remain. Cache-only source issues are unchanged at 271 public and 314 inventory. The access registry now has 4,042 canonical entries, 1,201 repeated entries, zero conflicts, and 1,216 authoritative access controls.

See `selection.json`, `review.json`, and `source-metadata.json` for the frozen candidate, decision details, and source limits.
