# Access-point corrections — September 5, 2026

Corrected five physical launches, represented by six endpoint records across three routes. Each correction is supported by an official access identity and a visible water-side landing in aerial imagery. The independent NHD check ran **before** adding the new authoritative controls.

| Access | Previous latitude, longitude | Corrected latitude, longitude | Independent water check |
| --- | --- | --- | --- |
| Kreager Park / North River Road ramp (two routes) | 41.0892, -85.0407 | 41.0864828, -85.0486275 | On mapped water; 123–125 ft from river centerline |
| Pine River Port 1 / Bowen's Mill / County AA | 43.34677, -90.38865 | 43.373027, -90.384133 | On mapped water; 31 ft from centerline |
| Pine River Port 2 / Lions Park / Industrial Drive | 43.3423, -90.3834 | 43.359817, -90.389001 | On mapped water; 16 ft from centerline |
| Pine River Port 3 / North Park / Krouskop Park | 43.3498866, -90.3923001 | 43.346679, -90.388651 | On mapped water; 4 ft from centerline |
| Pine River Port 4 / Seminary Street | 43.3362, -90.3864 | 43.335268, -90.391478 | On mapped water; 46 ft from centerline |

## Evidence and decisions

**Kreager:** [Fort Wayne's public access inventory](https://www.cityoffortwayne.in.gov/1278/Rivergreenway) locates the ramp across North River Road from Kreager Park. [OSM slipway node 951074983](https://www.openstreetmap.org/node/951074983) coincides with the visible ramp toe and connected public parking area in Esri World Imagery. The old pin was approximately 2,395 feet northeast, inside the park. Updated both the Kreager-to-Moser put-in and Niagara-to-Kreager take-out, including duplicate source coordinates and evidence text.

**Pine River:** Page 2 of the [city's canoe-port brochure](https://www.richlandcenterwi.gov/sites/default/files/fileattachments/parks_amp_recreation/page/2520/the_pine_river-canoe_ports_trails.pdf) establishes the public access sequence. The [WRT route report and trip map](https://www.wisconsinrivertrips.com/segments/pine-river-richland-county/richland-center) independently identify the same crossings and park. Aerial imagery resolves each pin to the landing or pier. Port 1 was incorrectly placed at Port 3; this passed the old water-distance check because it was on the right river at the wrong launch. Corrected the Port 1 display name and the erroneous Krouskop Park association. Existing stable access IDs remain intact.

The guide distinguishes the main Seminary Street take-out **below** the former-dam rapids from a separate upstream pier used for portaging. Updated the safety and trip notes so the main take-out coordinate is no longer described as being above the rapids. Confirm the bypass and current landing conditions from land before using this route.

The imagery-derived locations carry a **30-foot uncertainty allowance**. They are not surveyed agency GPS coordinates; official maps establish access identity, and imagery establishes the water entry. Fetch dates do not establish imagery capture dates. Reproducible image bounds, approximate pixel anchors, source hashes, and before/after audit values are saved in [the evidence ledger](./route-coordinate-corrections-2026-09-05.json). The two new source-control providers preserve this distinction for future audits.

## Validation and remaining work

- Five coordinate failures resolved. The sixth correction fixes the wrong-launch identity at Port 1. All six corrected endpoint records are on NHD water polygons without relying on the new controls.
- Route source typecheck, route data audit, canonical geometry audit, and all 53 tests in the six targeted access/geometry/publication test files passed.
- Refreshed the access registry, suggestions, publication holds, public geometry, visual review queue, and workflow status. The hold-coverage check passes.
- Moser Park remains unresolved and withheld. The fresh audit's connected-network fallback downgraded its unchanged pin near Paul Trier Ditch to `review`; that does not verify a public water entry. Added an explicit reviewed-access hold, included in withholding generation and workflow coverage checks, so a subsequent automatic refresh cannot release this route. A regression test covers an empty automatic suggestion list.
- Fixed the existing coordinate-application script's route-boundary detection for Windows CRLF files. The final diff comparison caught two unintended coordinates on South Fork Flambeau; both were restored and its geometry regenerated. Regression tests cover LF and CRLF inputs with structured endpoints on the following route.
- Source edits outside the intended route blocks were restored. This batch does not establish access at the other suspicious locations or deploy the changes.
