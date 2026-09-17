# Arizona starter coverage

Campaign activated 2026-09-09. Initial public catalog count: 0.

## Work order

Follow [the campaign plan](../lower-48-starter-coverage-plan.md) and the live [campaign record](../operations/lower-48-starter-campaign.json). Targets: 3, then 6, then approximately 10 routes, rotating across all states between passes. Read the route addition and safety policies before qualification.

## Unreviewed corridor leads

- Lower Salt
- Verde Valley
- lower Verde
- Arizona-access Colorado reaches

These are discovery leads, not verified endpoint pairs. No route has been qualified by this initial record. Screen 15–20 concrete reaches if sources support that many; retain distinct day trips rather than every endpoint combination.

## Sources and state-specific review

- [USFS-hosted Verde River paddle trail guide](https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprd3818299.pdf)
- USGS current observations and station metadata. Confirm a station's actual reach relationship and stage datum before transferring guidance.
- Responsible local launch managers, trail organizations, and current closure notices.

How many distinct trips remain after checking releases, diversion hazards, access permissions, and overlap? Assess a possible shortfall early.

Verify actual water-entry coordinates, access rights and parking, distance, hazards, camping, conditions posture, and route geometry. Planning status does not excuse unresolved access or safety.

## Research state

The first scored pass is implemented locally and validated but not deployed on three Verde River day routes: Lower TAPCO to Tuzigoot Bridge (3.3 miles), Tuzigoot Bridge to Highway 89A Bridge (6.5 miles), and Highway 89A Bridge to Skidmore RAP (4 miles). Friends of the Verde River and the USFS paddle guide publish the access-point coordinates and river-mile sequence. USGS 09504000 is the direct Clarkdale gauge; RiverScout supplies a same-gauge community planning band of 300–2,000 cfs, which is modeled conservatively as a two-sided score cue. Published access pins were refined to NHD water-entry edges and all six endpoints now audit as ok. Private banks, diversions, shallow riffles and flash-flood conditions remain release checks. Evidence: `docs/operations/starter-evidence/arizona-verde.json`.

Continue screening the lower Verde, White Bridge/Beasley Flat, Lower Salt and other Arizona corridors. Do not transfer the Clarkdale band to a distant gauge reach without evidence.

## Second scored pass

The second Arizona pass adds three validated-not-deployed lower-Verde routes: White Bridge RAP to Clear Creek RAP (5.5 miles), Clear Creek RAP to Beasley Flat RAP (4.3 miles), and the full White Bridge to Beasley Flat day (9 miles). Friends of the Verde River and the USFS paddle guide publish the RAP sequence, river miles and coordinates. RiverBrain supplies a route-specific 150–1,000 cfs community planning band tied to direct USGS 09506000 near Camp Verde; the Clarkdale 09504000 band is not reused. All six endpoint audits are review-only within 155–181 feet of a topology-connected Verde River network, with no severe findings. Clear Creek’s short steep carry below a diversion, shallow riffles, strainers, private banks, flash rises and the Beasley Flat Wild and Scenic boundary remain release checks. Evidence: `docs/operations/starter-evidence/arizona-verde-lower.json`.

## Third scored pass

The third Arizona pass adds three validated-not-deployed Lower Salt routes: Water Users to Goldfield (6.5 miles), Goldfield to Phon D. Sutton (2.4 miles), and Phon D. Sutton to Granite Reef (3.1 miles). HikeArizona publishes the access sequence, section mileage and a 500 cfs minimum / 1,000 cfs desired band; Tonto National Forest confirms the public recreation sites and pass posture; USGS 09502000 below Stewart Mountain Dam is the direct gauge. Access-site pins were refined to mapped NHD water-entry edges, and all six endpoints audit OK. The early Class II riffle, shallow channels, dam exclusion zones, heat, heavy summer use, slower water near Granite Reef and closure notices remain release checks. Evidence: `docs/operations/starter-evidence/arizona-salt.json`.

Arizona now has nine scored starter routes in the campaign record. Keep them validated-not-deployed pending the production checks, then screen whether a distinct corridor can provide a tenth route without weakening the direct-gauge, public-access and threshold evidence bar.

## 20-route expansion pass

The first expansion adds the full 14-mile Lower TAPCO-to-Skidmore access-chain day reach, joining the documented Tuzigoot and Highway 89A intermediate accesses. It uses the direct Clarkdale USGS 09504000 gauge and established 300–2,000 cfs planning band, with explicit diversion, flash-flood, shallow-water and private-bank controls. The route remains day-use with no roadside camping claim and uses approved same-river Verde context imagery. Evidence: `docs/operations/starter-evidence/arizona-verde-expansion.json`.

A fourth Arizona Salt addition, `salt-river-water-users-phon-d`, combines the documented 6.5-mile Water Users-to-Goldfield and 2.4-mile Goldfield-to-Phon D. segments into an 8.9-mile public-access day reach. A fifth, `salt-river-goldfield-granite-reef`, combines the 2.4-mile Goldfield-to-Phon D. and 3.1-mile Phon D.-to-Granite Reef sections into a 5.5-mile reach. Both retain HikeArizona's 500–1,000 cfs planning band, direct USGS 09502000 gauge, Tonto National Forest access/pass controls, dam exclusions, heat and shallow-water safety, day-use camping posture and the existing Salt River-specific gallery image. Arizona now has 13 routes (13 scored). Evidence: `docs/operations/starter-evidence/arizona-salt.json`.

A second Verde Valley combination, `verde-river-tuzigoot-skidmore`, adds the documented approximately 10.5-mile Tuzigoot Bridge to Skidmore RAP day reach through the Highway 89A intermediate access. It reuses the Friends of the Verde/USFS public access sequence, direct USGS 09504000 gauge and established 300–2,000 cfs planning band, with the existing Verde safety, camping and gallery controls. Arizona now has 14 routes (14 scored). Evidence: `docs/operations/starter-evidence/arizona-verde-expansion.json`.

A sixth Arizona Salt addition, `salt-river-water-users-granite-reef`, captures the full documented 12-mile Water Users through Goldfield and Phon D. Sutton to Granite Reef access chain. It keeps the direct USGS 09502000 gauge, HikeArizona's 500–1,000 cfs planning band, Tonto National Forest pass and dam controls, day-use camping posture, and the Salt River-specific gallery image. Its geometry is a reviewed stitched sample of the three approved segment centerlines because the single full-route NHD query did not return a usable match. Arizona now has 15 routes (15 scored). Evidence: `docs/operations/starter-evidence/arizona-salt.json`.

## Wild and Scenic Verde expansion

The next high-quality addition is `verde-river-beasley-flat-childs`, a remote approximately 17-mile Beasley Flat to Childs reach. RiverBrain and Southwest Paddler independently identify the Class III–IV+ corridor and tie overlapping flow guidance to direct USGS 09506000 near Camp Verde (150–3,000 cfs review band, 600–2,000 cfs preferred). FWS, USFS and Friends of the Verde materials document the named public access areas, Childs river-mile position, campground context and rough Forest Service road approach. The route carries explicit expert-only, whitewater, cold-water, flash-flood, remote and access-uncertain hazards, with endpoint campground camping classification. Because the catalog publication gate holds Class IV+ reaches to planning, this route is discoverable but not scored. Evidence: `docs/operations/starter-evidence/arizona-verde-wild.json`.

Arizona now has 16 routes (15 scored, 1 planning). Continue screening distinct Salt, Verde, Colorado and other public corridors for route-specific scored evidence; stop before 20 if additional candidates cannot meet the direct-gauge, public water-entry, safety and camping evidence bar.

The fourth 20-route expansion pass adds four scored Lower Salt sections keyed to the documented Pebble Beach / Blue Point Bridge access at river mile 2.5: Water Users to Blue Point (2.5 mi), Blue Point to Goldfield (4.0 mi), Blue Point to Phon D. Sutton (6.4 mi), and Blue Point to Granite Reef (9.5 mi). HikeArizona publishes the access sequence and mileposts; RiverBrain confirms Blue Point as a public river entry with parking and a gentle practice channel. All four retain the direct USGS 09502000 gauge, 500-1,000 cfs planning band, Tonto Pass and day-use controls, and the existing Salt River safety, camping and gallery treatment. Arizona now has 20 routes (19 scored, 1 planning). Evidence: `docs/operations/starter-evidence/arizona-salt.json`.

## 30-route expansion pass

The next Verde pass adds two longer, route-specific Childs combinations: `verde-river-white-bridge-childs` (about 26 miles) and `verde-river-clear-creek-childs` (about 21 miles). Both follow the published White Bridge/Clear Creek/Beasley Flat access sequence into the remote Wild and Scenic reach and finish at the named Childs River Access / Childs Campground. They retain direct USGS 09506000 telemetry and the overlapping RiverBrain/Southwest Paddler review band, with expert-only whitewater, cold-water, flash-flood, remote-road and limited-exit controls, endpoint campground camping, and explicit intermediate bailout/access checks. Compact curated traces were sampled from the generated NHD centerlines. Arizona now has 22 routes (21 scored, 1 planning); further additions should continue screening distinct public corridors rather than duplicating the same endpoint set. Evidence: `docs/operations/starter-evidence/arizona-verde-wild.json`.
## Gila Box expansion — 2026-09-13

Added the scored `gila-river-old-safford-dry-canyon` overnight reach in the Gila Box Riparian National Conservation Area. BLM identifies Old Safford Bridge and Dry Canyon as public water-entry sites on the 23-mile corridor; American Whitewater documents the 22-mile Class II+ reach, direct USGS 09442000 relationship, 60 cfs small-craft floor, 200 cfs navigation cue, high-flow channel warning and sparse exits. The route carries explicit PFD, strainer/fence, monsoon, private-land, shuttle and dispersed-camping controls plus a river-specific Gila Box Commons image. Evidence: `docs/operations/starter-evidence/arizona-gila-box.json`.

The 30-route review now records a documented Arizona shortfall: 23 routes (20 scored, 3 planning) cover the verified Verde, Lower Salt and Gila Box corridors. Remaining Lake Havasu/lower-Colorado and downstream Gila leads have public boating access but lack a route-specific scored flow package or carry unresolved fence/steep-bank/limited-exit hazards, so no unsupported duplicates are being added. See `docs/operations/lower-48-expansion-30-shortfalls.md`.

## 50-route expansion — Verde access-chain pass (2026-09-16)

The next pass adds ten distinct forward Verde River reaches from the Friends of the Verde access map: Tuzigoot–Dead Horse Ranch, Dead Horse–89A, Skidmore–Black Canyon, Black Canyon–Bignotti, Bignotti–Sheep Crossing, Sheep Crossing–Newton, Newton–Parsons, Parsons–Black Bridge, Black Bridge–White Bridge, and a combined Skidmore–Sheep Crossing itinerary. Each card uses named public RAP coordinates, direct Clarkdale or Camp Verde USGS telemetry, the existing conservative 300–2,000 cfs Verde planning band, reviewed moving-water and flash-flood safety controls, day-use camping classification, curated geometry and the existing Verde-specific gallery treatment. Arizona now has 33 public routes (30 scored, 3 planning); seventeen routes remain toward 50. Evidence: `docs/operations/starter-evidence/arizona-verde-expansion.json`.
## Verde forward-pair gap-fill — 2026-09-16

Added ten scored lower-Verde routes from the Friends of the Verde and USFS access sequence: Skidmore–Bignotti, Skidmore–Newton, Skidmore–Parsons, Skidmore–Black Bridge, Skidmore–White, Black Canyon–Sheep Crossing, Bignotti–Newton, Bignotti–Parsons, Sheep Crossing–Parsons and Newton–Black Bridge. The direct Camp Verde gauge (USGS 09506000) and the established 300–2,000 cfs community planning band remain in place. Each card carries mapped RAP water-entry coordinates, reviewed safety, no-riverbank-camping guidance, curated geometry, river-specific gallery context and forward-pair duplicate review. Arizona now has 43 routes (40 scored, 3 planning). Evidence: `docs/operations/starter-evidence/arizona-verde-expansion-2.json`.

The completion pass adds seven scored forward pairs: Tuzigoot–Black Canyon, Tuzigoot–Bignotti, Tuzigoot–Sheep Crossing, Highway 89A–Black Canyon, Highway 89A–Bignotti, Highway 89A–Sheep Crossing and Highway 89A–Parsons. They use the same Friends of the Verde access sequence, direct Camp Verde telemetry and reviewed 300–2,000 cfs band, with named intermediate RAP bailouts and the existing safety, camping, geometry, gallery and duplicate controls. Arizona now has 50 routes (47 scored, 3 planning). Evidence: `docs/operations/starter-evidence/arizona-verde-expansion-3.json`.
