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

## Goose Creek, Kentucky

The five-record lower Manchester Goose Creek family is a verified access-chain corridor with four ordered core access points: Jacks / Bowling Branch Bridge Access, Tobacco Road Bridge Access, Dump Hollow Ford, and Laurel Branch Road Access. KDFWR's Goose Creek page lists all four carry-down sites, and the individual access pages confirm the stored coordinates, year-round no-fee access, and no camping. USGS 03281100 at Manchester is the shared direct gauge; the route package preserves the KDFWR good-flow band of 175-514 cfs / 7.4-8.5 ft and the current low-water gating.

The corridor model preserves all five route cards. The 2.2-mile Jacks-to-Tobacco, 0.8-mile Tobacco-to-Dump, and 4.8-mile Dump-to-Laurel cards remain atomic choices; the 3.0-mile Jacks-to-Dump and 7.8-mile Jacks-to-Laurel cards remain composite choices with different ford, bailout, time, and shuttle commitments. The upper composite cards retain the upstream low-head-dam context while explicitly starting below Rawlings / Stinson; Dump Hollow remains a ford-style access with high-water inspection requirements.

The coordinate audit confirms all shared endpoints on Goose Creek. Laurel Branch is within the named Goose Creek waterbody and consistent across both cards, but the generated audit marks it `review` because the point is about 120 ft from the matched flowline; no coordinate was silently changed. No route was deleted, merged, retired, or rewritten.

## Little Fork River, Minnesota

The ten-record Little Fork family is two verified official map-sheet corridors rather than one undifferentiated family. Map 2 provides the ordered downstream chain Dentaybow (RM 57.9) → Fiedler (RM 44.8) → Devereaux (RM 37.1) → Lofgren Park (RM 20.8) → the Rainy River mouth → Kuttes Landing on the Rainy River. Map 1 separately provides Veterans Park (RM 142) → Highway 73 (RM 126.8) → Samuelson Park (RM 103.5) → Silverdale / Highway 65 (about RM 100). The Minnesota DNR segments page and Map 1/Map 2 PDFs support the two map-sheet boundaries, endpoint order, recommended trip shape, camping posture, and named hazards.

The registry records `mn-little-fork-fiedler-lofgren` for the six Map 2 cards and `mn-little-fork-map-1` for the four Map 1 cards. All ten route cards remain distinct: the cards use different endpoint pairs, two direct gauge reaches (`mn-dnr-294` / `mn-dnr-81` on Map 2 and `mn-dnr-88` / `mn-dnr-295` on Map 1), distances from 4.1 to about 21.8 miles, campground/bailout availability, Flat Rock/Highway 217/Hannine Falls context, and shuttle or Rainy River logistics.

Coordinate and access audits confirm the shared endpoint identities. Dentaybow is on the named Little Fork waterbody but retains the existing `review` severity because its stored point is about 55 ft from the matched waterbody and 111 ft from the named flowline; no coordinate was corrected. The safety audit reports zero issues, and canonical geometry coverage remains present for every card. No route was deleted, merged, retired, or silently rewritten.

## 2026-09-03 Follow-up: Maryland Potomac Dam 4 / Taylors-Snyders

The overlap auditor identified the 4.3-mile Taylors Landing to Snyders Landing card as a contained connector within the 11.6-mile Dam 4 downstream to Shepherdstown card. This is an intentional selectable access-chain variant, not a duplicate: the parent card starts below Dam 4 and finishes at Shepherdstown, while the shorter card avoids the Dam 4 launch commitment and carries its own endpoint, camping, shuttle, flow, and hazard guidance.

The corridor registry now models one verified `md-middle-potomac-dam-four-shepherdstown` family with ordered edges Dam 4 downstream → Taylors Landing → Snyders Landing → Shepherdstown. Both route slugs, trip-detail records, canonical geometries, and access evidence remain published. No route was deleted, merged, retired, or silently rewritten; the family model is the consolidation boundary and route-specific differences remain visible.
