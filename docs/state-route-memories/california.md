# California starter coverage

Campaign activated 2026-09-09. Initial public catalog count: 0.

## Work order

Follow [the campaign plan](../lower-48-starter-coverage-plan.md) and the live [campaign record](../operations/lower-48-starter-campaign.json). Targets: 3, then 6, then approximately 10 routes, rotating across all states between passes. Read the route addition and safety policies before qualification.

## Unreviewed corridor leads

- Lower American
- Russian
- Sacramento
- selected lower Feather and Kern reaches

These are discovery leads, not verified endpoint pairs. No route has been qualified by this initial record. Screen 15–20 concrete reaches if sources support that many; retain distinct day trips rather than every endpoint combination.

## Sources and state-specific review

- [California American River boating facilities](https://www.parks.ca.gov/BoatingFacilities/Body-of-Water/American%20River)
- USGS current observations and station metadata. Confirm a station's actual reach relationship and stage datum before transferring guidance.
- Responsible local launch managers, trail organizations, and current closure notices.

Can the set represent more than one population center while excluding technical reaches and unsupported release assumptions?

Verify actual water-entry coordinates, access rights and parking, distance, hazards, camping, conditions posture, and route geometry. Planning status does not excuse unresolved access or safety.

## Research state

The first scored pass is implemented locally and validated but not deployed on three Lower American River Parkway routes: Sailor Bar to Harrington (8.2 miles), Harrington to Watt Avenue (4.9 miles), and Watt Avenue to Howe Avenue (1.4 miles). California State Parks confirms the named facilities are public launches; the official boating-trail guide documents cold-water, current and Nimbus Dam exclusion safety; Wilderness Portal ties the American River at Fair Oaks gauge (USGS 11446500) to a 1,400–3,100 cfs comfortable window and 5,000 cfs maximum reference. That community-derived band is modeled as a conservative two-sided score cue. Published access pins were refined to NHD water-entry edges; all endpoints audit cleanly, with Sailor Bar retained as an access-anchor review. Evidence: `docs/operations/starter-evidence/california-american.json`.

Continue screening Russian, Sacramento, lower Feather and Kern corridors. Do not reuse the Fair Oaks flow band outside the Lower American reach.

## Second scored pass

The second California pass adds three validated-not-deployed South Fork American routes in the Coloma–Lotus Valley: Marshall Gold Discovery State Historic Park to Henningsen Lotus Park (2.1 miles), Henningsen to Greenwood Creek (3.5 miles), and the classic Coloma to Greenwood day (5.6 miles). BLM and El Dorado County identify the public access chain; Wilderness Portal and RiverBrain document the Class II corridor and tie a 600 cfs minimum, 1,200–1,800 cfs sweet spot and 5,000 cfs upper planning cue to the Chili Bar/USGS 11444500 gauge. All six endpoints now audit OK after refining the county and BLM area anchors to mapped river edges. Cold release water, feature scouting, quiet-zone/private-bank rules, parking/carry limits and the steeper Gorge downstream remain release checks. Evidence: `docs/operations/starter-evidence/california-south-fork-american.json`.

## Third scored pass

The third California pass adds three validated-not-deployed Russian River sections in Forestville: Forestville River Access to Steelhead Beach (2.4 miles), Steelhead to Sunset Beach (2.6 miles), and the combined Forestville to Sunset itinerary (4.8 miles). California State Parks and Sonoma County Regional Parks identify the public boating sites; California Creeks publishes a 300–1,500 cfs canoe/kayak band tied to direct USGS 11464000 near Healdsburg. All six endpoints have no suspicious or failed findings, with four expected waterbody-aware reviews. Seasonal dams, shallow bars, storm debris, cold water, heat, crowds, private banks and water-quality notices remain release checks. Evidence: `docs/operations/starter-evidence/california-russian.json`.

California now has nine scored starter routes in the campaign record. Keep them validated-not-deployed pending the production checks, then screen Sacramento, lower Feather or Kern only where they meet the same direct-gauge, route-specific threshold and public-endpoint evidence bar.

## 20-route expansion pass

The first expansion corridor adds Upper Sunrise Recreation Area to Harrington BTAF (7.8 miles), a popular Lower American Parkway pairing with public Sacramento County and State Parks launches. It retains the direct Fair Oaks USGS 11446500 gauge and established 1,400–3,100 cfs planning band, with the 5,000 cfs review ceiling, cold-water and Nimbus exclusion controls. The route remains day-use with no shoreline camping claim and uses the approved American River context image. Evidence: `docs/operations/starter-evidence/california-american-expansion.json`.

The American River expansion also adds the 14.5-mile Sailor Bar-to-Howe Parkway reach (`american-river-sailor-bar-howe`), using Harrington and Watt as intermediate bail-outs. It keeps the direct Fair Oaks gauge and established 1,400–3,100 cfs planning band with the Nimbus exclusion, cold-water, San Juan and park-access controls. California now has 12 routes (12 scored). Evidence: `docs/operations/starter-evidence/california-american-expansion.json`.

The American River expansion also adds the 14.5-mile Sailor Bar-to-Howe Parkway reach (`american-river-sailor-bar-howe`), using Harrington and Watt as intermediate bail-outs. It keeps the direct Fair Oaks gauge and established 1,400–3,100 cfs planning band with the Nimbus exclusion, cold-water, San Juan and park-access controls. California now has 12 routes (12 scored). Evidence: `docs/operations/starter-evidence/california-american-expansion.json`.

The next Lower American pass adds Harrington–Howe (6.3 miles), Upper Sunrise–Watt (12.7 miles) and Upper Sunrise–Howe (14.1 miles). State Parks and Sacramento County document the public access chain; the routes keep the direct Fair Oaks gauge, 1,400–3,100 cfs planning band, Nimbus exclusion, cold-water controls and intermediate bail-outs. California now has 15 routes (15 scored). Evidence: `docs/operations/starter-evidence/california-american-expansion.json`.

## Russian River Healdsburg expansion - 2026-09-12

Added two exact California Creeks variants on the high-demand Healdsburg-to-Forestville corridor:

- `russian-river-healdsburg-wohler` — 8.9 miles from the below-Healdsburg Avenue dam carry to the seasonal Wohler Bridge small-craft ramp.
- `russian-river-healdsburg-mirabel` — 10.1 miles from the same Healdsburg start to the alternate Mirabel Park take-out.

California Creeks publishes Class I character, the 300–1,500 cfs canoe/kayak band tied to the Healdsburg gauge, exact mileage and seasonal-dam guidance. Sonoma County documents Wohler’s permit/key, 4WD and short-portage requirements; the Mirabel endpoint remains subject to current landing and gate checks. California now has 17 routes (17 scored). Evidence: `docs/operations/starter-evidence/california-russian.json`.

The next Lower American addition is `american-river-sailor-bar-upper-sunrise`, an approximately two-mile practice reach between two public Parkway launches. California State Parks lists both Sailor Bar / Illinois and Upper Sunrise as public American River facilities, while local commercial float guidance identifies Sailor Bar to Sunrise as a recurring option. It keeps the direct Fair Oaks gauge, 1,400-3,100 cfs planning band, cold-water/current/Nimbus controls, day-use camping posture and American River gallery image. California now has 18 routes (18 scored). Evidence: `docs/operations/starter-evidence/california-american-expansion.json`.

The Russian River expansion adds `russian-river-healdsburg-steelhead`, an approximately eight-mile Class I day reach from the below-dam Healdsburg Memorial Beach carry to year-round Steelhead Beach. California Creeks supplies the direct Healdsburg gauge and corridor flow band; a local itinerary guide corroborates the six-mile pairing, while Sonoma County and State Parks document the public endpoints. The route retains seasonal-dam, shallow-bar, storm-debris, water-quality, cold-water and day-use camping controls. California now has 19 routes (19 scored). Evidence: `docs/operations/starter-evidence/california-russian.json`. The route audit required a conservative approximately eight-mile label because the stored endpoint coordinates are 7.5 miles apart in a straight line, despite a local guide’s six-mile estimate.

The Russian River pass adds `russian-river-wohler-steelhead`, an approximately two-mile downstream option from the seasonal Wohler Bridge small-craft ramp to year-round Steelhead Beach. Local itineraries describe the pairing as a roughly 45-minute continuation; Sonoma County documents Wohler’s seasonal permit/key, 4WD and short-portage requirements. The route keeps the direct Healdsburg gauge, 300-1,500 cfs planning band, seasonal-dam, shallow-bar, storm-debris, water-quality and day-use camping controls. California now has 20 routes (20 scored). Evidence: `docs/operations/starter-evidence/california-russian.json`.

The 2026-09-13 Russian River expansion adds eight scored combinations across the documented Healdsburg, Wohler, Mirabel, Steelhead, Forestville and Sunset public-access chain. A reversed Steelhead–Forestville proposal was rejected as a duplicate during audit. The retained itineraries use public intermediate beaches as bailouts and carry the California Creeks 300–1,500 cfs planning band tied to USGS 11464000, plus seasonal-dam, shallow-bar, storm-debris, water-quality, parking and day-use camping controls. Two additional scored lower-river routes now connect Steelhead and Forestville to Guerneville River Park, using direct USGS 11467000 and explicit downstream Johnson’s Beach dam controls. California now has 30 public scored routes. See the updated [Russian River evidence record](../operations/starter-evidence/california-russian.json).

## 40-route scored Russian River pass — 2026-09-13

Added four additional lower Russian River combinations to Guerneville River Park: Healdsburg–Guerneville, Wohler–Guerneville, Mirabel–Guerneville and Sunset–Guerneville. Each uses the documented public beach/park chain, direct USGS 11467000 telemetry, the existing conservative lower-river flow band, seasonal-structure and Johnson’s Beach dam boundary controls, explicit day-use camping guidance, and the Russian River gallery record. California now has 34 public scored routes; the remaining six slots require a new documented public access or a separate corridor review rather than padding existing pairs.
