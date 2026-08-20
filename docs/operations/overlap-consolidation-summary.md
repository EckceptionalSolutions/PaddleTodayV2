# Route overlap and corridor consolidation

Latest bounded audit: `npm run routes:audit:overlap`

- 782 route spans reviewed
- 2,265 findings: 179 access-chain containment, 258 contained connectors, 127 crossing segments, 631 near-collinear overlaps, and 1,070 shared endpoints
- Findings are review signals, not deletion instructions.

## Village Creek, Texas

The eight-record Village Creek family is a canonical corridor with five validated access points: FM 418, TX 327, Baby Galvez, US 96, and the Village Creek State Park canoe launch. The audit finds the expected atomic segments plus composite reaches containing those segments. The recommended model is one corridor family with selectable in/out pairs and explicit access-point continuity, while retaining separate route cards where distance, safety, or logistics differ materially.

No route was deleted, merged, or silently rewritten. Any consolidation must preserve the individual segment URLs, route-specific evidence, and safety/access distinctions, then pass the normal route gates.

## Wabash River, Indiana

The four-record Wells County Wabash family is a verified access-chain corridor with five ordered public access points: Linn Grove Park, Vera Cruz Paddlesports Launch, White Bridge Picnic Area, Kehoe Park, and Hale Street access. The consolidation model is one corridor registry entry with explicit segment edges while retaining each route card because the 6.0, 6.6, 9.5, and 11.9 mile trips differ in distance, take-out handling, daylight commitment, and shuttle/logistics.

Independent review confirmed the shared USGS 03323000 Bluffton gauge reach and the local 1.5 to 3 ft stage band. The route-level freshness report still flags metadata packaging because endpoint, camping, and logistics fields are stored in the trip-details package rather than duplicated into the raw route record; this review did not delete, merge, retire, or silently rewrite any route record.

## Shell Rock River, Iowa

The Heery Woods-to-Renning and Renning-to-Shell Rock cards are not eligible for consolidation yet. Butler County confirms that Renning Landing is the take-out after the roughly four-mile Heery Woods float and the put-in for the five-mile Shell Rock float, but the stored route packages use two different Renning's Landing coordinates about 19,764 feet apart: the Heery card points near Shell Rock City Park, while the downstream card points to the county Renning Landing location. The generated access registry classifies the name as `distinct-locations` / `ambiguous-name`.

The review also retains the Heery low-head-dam access caveat: county materials confirm boat/canoe access and the dam, but do not establish the exact below-dam launch line required by the route. No corridor registry model was recorded, and both route cards, their trip details, geometries, and safety packages were preserved unchanged. Reopen only after route-specific endpoint identity, below-dam access, and geometry evidence are reconciled.

## Beaver Dam River, Wisconsin

The two-record Beaver Dam family is a verified access-chain corridor with four ordered core access points: Cotton Mill Park, County Road S / Leipsig, County Road J, and River Street Dam / Lowell. Dodge County documents the 5.8-mile Beaver Dam waterway and notes that the rapids fade after Highway J; Miles Paddled and Wisconsin River Trips independently place County Road S upstream of County Road J and document the downstream Lowell dam boundary.

The corridor model preserves both route cards. Cotton Mill-to-County-J remains the short guarded moving-water route with dam-release, strainer, bridge, and Class I-II hazards; County-S-to-Lowell remains the longer flatwater/impoundment route with wind, fatigue, low-water, and mandatory dam take-out handling. Both use direct USGS 05425912 and the same 30-140 cfs guarded window. Meadow Road is retained as a route-specific alternate in trip details but excluded from verified corridor edges because its stored coordinate is 2,490 ft from the matched river and no authoritative access candidate cleared the coordinate/access audit.
