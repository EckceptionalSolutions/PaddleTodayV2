# Verde River, Arizona route-family review

Date: 2026-10-07  
Corridor: `az-verde-river-reach-family`  
Status: candidate reviewed; production and Search Console unchanged until deployment

## Decision

Keep four source-backed standalone guides:

- Lower TAPCO–Tuzigoot (3 mi), the Town of Clarkdale's named day-use section.
- Tuzigoot–Highway 89A Bridge (6.5 mi), a dedicated Friends of the Verde paddle-map reach.
- White Bridge–Beasley Flat (9 mi), a named Class II run with route-specific community flow references.
- Beasley Flat–Childs (about 16–17 planning mi), a separate remote Class III–IV+ Wild and Scenic trip.

Consolidate the other 28 public endpoint combinations to their exact trip choices on the Verde River hub. The public picker still keeps all 32 currently available trips. Seven routes involving Sheep Crossing remain withheld because the Friends map identifies a difficult, long boat haul but does not locate the exact water-entry edge; their legacy paths point to the hub's access-review note.

The family is a condition grouping, not a claim that all sections form one continuous route with shared flow or access conditions.

## Flow and access corrections

- Removed the RiverScout 300–2,000 cfs river-wide band from route profiles and source links. That source describes the Verde generally; it does not support route-specific thresholds across the Clarkdale, Greenway, and Wild and Scenic sections.
- Kept the 150–1,000 cfs community references and Camp Verde gauge on the exact White Bridge–Beasley Flat trip. This is the only Verde route left eligible for a live score.
- Kept RiverBrain's 150 cfs minimum, roughly 800 cfs average, and 2,000 cfs maximum only as planning context on the exact Beasley Flat–Childs trip. Its minimum describes extreme-low-flow boating; the source says hard-shell paddlers may prefer about 300 cfs. The trip remains planning-only.
- Removed numeric flow bands from the White Bridge/Clear Creek composites and other Greenway combinations. A source for one endpoint pair should not create a threshold for another pair.
- Applied the Town of Clarkdale's 300+ cfs boating discouragement and 1,000+ cfs launch-area closure only to Lower TAPCO–Tuzigoot. This upper access cutoff cannot be represented as a two-sided score band, so the trip is planning-only.
- Retained USGS 09504000 near Clarkdale and USGS 09506000 near Camp Verde as local context. Neither gauge is presented as a whole-river recommendation.

## Sources

- [Town of Clarkdale: Verde River at Clarkdale](https://www.clarkdale.az.gov/214/Verde-River-Clarkdale) — 3-mile Lower TAPCO–Tuzigoot section, day-use access, and high-flow restrictions.
- [Friends of the Verde River: Paddle Guides](https://verderiver.org/get-involved/paddle-guides/) — named Greenway maps and warning that flows, obstacles, and hazards vary by stretch and day.
- [Friends of the Verde River: River Access Points map](https://verderiver.org/wp-content/uploads/2022/03/river-access-points.pdf) — access sequence and Sheep Crossing carry note.
- [RiverBrain: White Bridge to Beasley Flat](https://www.riverbrain.com/runs/483) — exact 9-mile Class II run and 150/500/1,000 cfs minimum/average/maximum references tied to the Camp Verde gauge.
- [RiverBrain: Beasley Flat to Childs](https://www.riverbrain.com/runs/486) — exact Class III–IV+ run and 150/800/2,000 cfs minimum/average/maximum references tied to the Camp Verde gauge.
- [U.S. Fish and Wildlife Service: Verde River](https://www.fws.gov/rivers/river/verde) — public access and Wild and Scenic reach context.

## Candidate verification

- `.local/seo-candidate-2026-10-07-verde-final` built 2,938 static pages and produced 2,926 sitemap URLs.
- The built-page audit checked 2,865 route links and found zero orphaned public pages, zero routes missing state-page or river-hub inlinks, no duplicate route H1s or descriptions, and no errors or warnings.
- The full site candidate contains 2,486 standalone route pages and 374 generated consolidation redirects. The Verde family has four standalone route URLs, 28 public exact-trip redirects, and seven held access-review redirects.
- A focused path check confirmed all four retained Verde routes are in the sitemap, all 28 public consolidated trip cards have matching hub anchors, all seven held routes point to the access-review anchor, and no consolidated Verde route URL remains in the sitemap.
- Route-data typecheck, route audit, corridor audit, and deprecation audit passed. The 39-record family still has 32 public picker choices and seven withheld routes; only White Bridge–Beasley Flat is scored.

This is candidate-build evidence only. Production and Search Console remain unchanged until deployment and Google recrawls the affected pages.
