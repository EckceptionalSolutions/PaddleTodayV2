# Little Fork River route-family review — October 7, 2026

## Finding

The public catalog has ten endpoint choices across the Minnesota DNR's two Little Fork State Water Trail maps. The DNR identifies two recommended day trips: Veterans Park to Highway 73 Bridge (15.2 miles, for paddlers experienced with Class II rapids) and Dentaybow to Fiedler (13.1 miles, a full-day trip). The remaining routes provide the adjacent access legs, three longer combinations within those chains, and the lower outlet to Kuttes Landing.

The catalog's composite choices repeat the same intermediate access and most of the same corridor and gauge context as their component legs. Three route pages combine directly adjoining legs: Highway 73–Silverdale, Dentaybow–Devereaux, and Fiedler–Lofgren Park. Their endpoints and trip details remain useful choices, but the composite pages add little distinct information beyond the individual legs and the river hub.

Conditions still vary across the route family. The route cards use reach-specific Minnesota DNR gauge stations. DNR says flows usually peak in late April and fall through summer, levels can change rapidly, and a reading of 3 feet or lower at its river-mile-21.6 gauge means most rapids are too shallow for easy passage. The map also documents the nearly inaccessible stretch between river miles 90 and 57, the Class II character of the recommended Map 1 day trip, and the Rainy River paddle from the Little Fork confluence to Kuttes Landing.

## Decision

Keep standalone route pages for the seven focused options:

- `little-fork-river-veterans-park-highway-73`
- `little-fork-river-highway-73-samuelson`
- `little-fork-river-samuelson-silverdale`
- `little-fork-river-dentaybow-fiedler`
- `little-fork-river-fiedler-devereaux`
- `little-fork-river-devereaux-lofgren-park`
- `little-fork-river-lofgren-kuttes`

Consolidate these three composite pages to their exact trip cards on `/rivers/by-river/little-fork-river/`:

- `little-fork-river-highway-73-silverdale`
- `little-fork-river-dentaybow-devereaux`
- `little-fork-river-fiedler-lofgren-park`

All ten trip choices remain in the selector with their own endpoints, distance, access, and gauge assignment. The hub guide groups them by DNR map and reach, highlights the two recommended day trips, and calls out the limited-access stretch and the Rainy River outlet. The exact gauge stays attached to each route card rather than being generalized across the river.

## Sources

- Minnesota DNR, [Little Fork River segments and maps](https://www.dnr.state.mn.us/state-water-trails/little-fork-river/segments-maps.html)
- Minnesota DNR, [Little Fork River State Water Trail](https://www.dnr.state.mn.us/state-water-trails/little-fork-river/index.html)
- Minnesota DNR, [Map 1: Sturgeon River State Forest to river mile 90](https://files.dnr.state.mn.us/maps/canoe_routes/littlefork1.pdf)
- Minnesota DNR, [Map 2: River mile 90 to Rainy River](https://files.dnr.state.mn.us/maps/canoe_routes/littlefork2.pdf)

This consolidation reduces the number of separate indexable pages for overlapping choices; it does not guarantee that Google will index the hub or improve rankings. No sitemap submission or URL Inspection indexing request was made.
