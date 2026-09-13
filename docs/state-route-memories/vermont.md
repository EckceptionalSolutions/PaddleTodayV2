# Vermont starter coverage

Campaign activated 2026-09-09. Initial public catalog count: 0.

## Work order

Follow [the campaign plan](../lower-48-starter-coverage-plan.md) and the live [campaign record](../operations/lower-48-starter-campaign.json). Targets: 3, then 6, then approximately 10 routes, rotating across all states between passes. Read the route addition and safety policies before qualification.

## Unreviewed corridor leads

- Missisquoi
- Lamoille
- Winooski
- Connecticut
- Otter Creek
- selected White River reaches

These are discovery leads, not verified endpoint pairs. No route has been qualified by this initial record. Screen 15–20 concrete reaches if sources support that many; retain distinct day trips rather than every endpoint combination.

## Sources and state-specific review

- [Northern Forest Canoe Trail](https://www.northernforestcanoetrail.org/)
- USGS current observations and station metadata. Confirm a station's actual reach relationship and stage datum before transferring guidance.
- Responsible local launch managers, trail organizations, and current closure notices.

Which trail and municipal sources establish usable day-trip segments, current launches, and verified dam boundaries?

Verify actual water-entry coordinates, access rights and parking, distance, hazards, camping, conditions posture, and route geometry. Planning status does not excuse unresolved access or safety.

## First batch qualified

The first scored batch covers three central Winooski reaches: Marshfield Old Schoolhouse Common to Montpelier Gateway Park, Winooski Street Bridge to Gateway Park, and Middlesex to Waterbury. American Whitewater identifies the first as Class II–III and the latter as Class I(II), with runnable readings around 470–575 cfs on the Winooski. Gateway Park, Middlesex and the Winooski access inventory document public canoe access and portage constraints. Endpoint audits returned two OK and four review results; the reviews are access-anchor or confluence cases, with no suspicious, failure or unknown results.

Qualified route IDs:

- `winooski-river-marshfield-gateway-park`
- `winooski-river-winooski-street-gateway-park`
- `winooski-river-middlesex-waterbury`

See [the batch evidence record](../operations/starter-evidence/vermont-winooski.json). Recheck municipal access, exact water-entry paths, hydro releases, dam portages, weather and live USGS 04286000 trend before deployment.

Pending: endpoint-pair discovery, current manager/closure review, gauge/threshold qualification, and overlap review. No exhausted-source or route-count-shortfall conclusion has been made. Record source attempts and exact retry conditions in the campaign candidate record; use the existing candidate ledger for qualified reach work.

## Second batch implemented — 2026-09-10

Added three scored Missisquoi routes: Lowell VT 100 to Lane Road, Lowell to River Road, and Lane Road to River Road. NFCT publishes the upper Missisquoi 180 cfs Troy-gauge floor and describes the quickwater/Class II character; UMATR publishes the access coordinates and explicitly marks River Road as an above-dam take-out. USGS 04293000 supplies direct telemetry. All six endpoints returned OK in the scoped coordinate audit, and Vermont now has six scored routes pending build and release verification. See [the Missisquoi evidence record](../operations/starter-evidence/vermont-missisquoi.json).

The Lamoille rotation adds `lamoille-river-upper-access-morrisville-oxbow` (8 miles), `lamoille-river-cadyville-waterman-brook` (5 miles), and `lamoille-river-dog-head-dorothy-smith` (12 miles), all recommended by the Lamoille River Paddlers Trail. The trail map marks rock gardens, Ten Bends, Morrisville Dam and a 0.4-mile Cadyville Falls portage; Vermont River Conservancy documents the protected paddlers-trail access and campsite network. All three routes use direct USGS 04292000 Johnson discharge data, carry explicit portage, cold-water, strainer and private-bank controls, and remain day-use only. Vermont now has 12 scored routes. See [the Lamoille evidence record](../operations/starter-evidence/vermont-lamoille.json).

The Lamoille rotation now also includes `lamoille-river-dorothy-smith-fairfax-falls` (13 miles) and `lamoille-river-fairfax-arrowhead` (8 miles), completing the documented Fairfax Falls-to-Arrowhead Lake reach. The Lamoille River Paddlers Trail describes the section as easy to moderate, with a mandatory 350-yard Fairfax Falls portage and Five Chutes that can reach Class III in high water; the Arrowhead Mountain Lake record supplies a public gravel boat ramp. Both routes use direct Johnson telemetry, retain day-use camping classification, and call out cold water, strainers, portages and reservoir wind. Vermont now has 14 scored routes. See [the Lamoille evidence record](../operations/starter-evidence/vermont-lamoille.json).

The lower-Winooski rotation adds six scored reaches—Bolton Dam to Bolton Canoe, Bolton Canoe to Jonesville, Bolton Canoe to Floodplain Preserve, Bolton Dam to Jonesville, Jonesville to Floodplain Preserve, and Bolton Dam to Floodplain Preserve—using the public access sequence documented by Richmond and the Winooski paddling guide. The approximately 10.5-mile Bolton-to-Richmond day paddle includes the rapid below Bolton Dam, a marked portage option and a sandy-bar Floodplain takeout; all routes use direct USGS 04290500 telemetry and the conservative 200–1,200 cfs planning band. No overnight camping is included, and private or informal access alternatives were excluded. Vermont now has 20 scored routes. See [docs/operations/starter-evidence/vermont-winooski-lower.json](../operations/starter-evidence/vermont-winooski-lower.json).

The Lamoille expansion adds ten scored access combinations across the documented Upper Lamoille, Morrisville Oxbow, Cadyville, Waterman Brook, Dog Head, Dorothy Smith, below-Fairfax and Arrowhead public water-entry points. The combinations preserve all marked falls and dam portages, retain direct USGS 04292000 Johnson telemetry and the trail’s conservative planning band, include no riverbank camping, and inherit the river-specific Lamoille gallery. The Upper-to-Fairfax route is clearly labeled as a staged multi-day itinerary. Vermont now has 30 scored routes. See [docs/operations/starter-evidence/vermont-lamoille.json](../operations/starter-evidence/vermont-lamoille.json).
