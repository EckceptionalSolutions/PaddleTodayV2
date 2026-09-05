# North Carolina Route Memory

Updated 2026-09-05 during the active North Carolina expansion goal.

## Current continuation window

- Added `hammocks-beach-huggins-island-loop`: the six-mile round-trip Huggins Island Paddle Trail from the designated Hammocks Beach State Park access. NC State Parks publishes the difficult route, official paddle map, designated kayak launch/landing context, barrier-island waters, ferry routes, and paddle-in camping posture; the NC Coastal Plain Paddle Trails GIS independently identifies the trail. The route is planning-only with USGS `02092760` at White Oak River near Swansboro as a nearby tidal proxy, no numeric cutoff, and explicit tide, wind, wave, weather, cold-water, protected-area, ferry, parking, and emergency-return checks.
- Added the three adjacent New River State Park planning sections `new-river-elk-shoals-wagoner`, `new-river-wagoner-us221`, and `new-river-us221-kings-creek`. NC State Parks’ current park page and official map identify the named access areas, section mileages, public paddling posture, seasonal hours, portage symbols, and paddle-in camping areas. All three use USGS `03161000` near Jefferson as a clearly labeled same-river proxy with no transferred numeric cutoff and remain planning-only.
- New River access posture: Elk Shoals is day-use only; Wagoner and U.S. 221 have vehicle-access facilities and camping context; Kings Creek has seasonal operating hours; Riverbend and Prather’s Creek are paddle-in camping areas and are not vehicle shuttle points. The new routes stop at named public access areas and do not promote bridge shoulders, private banks, or unmarked shoreline landings.
- New River geometry posture: route-scoped canonical geometry was requested for all three new sections, but the shared generator encountered a Windows file-lock race while another local geometry/Astro process was rewriting state bundles. Re-run the canonical geometry generation and state/manifest audit after the shared writer is idle; do not delete or overwrite the unrelated in-progress artifacts.
- Added `lumber-river-boardman-princess-ann`: an approximately 11.7-mile Boardman Boating Access Area to Princess Ann State Park reach. NC State Parks publishes the ordered access pair and mileage; NCWRC supplies the Boardman ramp coordinate and Princess Ann has a current park GPS. The direct USGS `02134500` Boardman station is context only, with no transferred numeric cutoff.
- Lumber River posture: keep the route planning-only because blackwater levels fluctuate and the route has long bends, wood/strainers, limited alternate exits, seasonal access hours, and endpoint camping/reservation terms. Princess Ann and the Boardman area must not be treated as interchangeable vehicle or paddle-in campsites.
- Added `south-fork-catawba-spencer-mcadenville`: the 5.5-mile Spencer Mountain to R.Y. McAden Blueway section. Spencer Mountain is pass-controlled, the source documents Class I/II features and a dam below the McAden take-out, and USGS `02145000` at Lowell is labeled a same-river proxy.
- Added `south-fork-catawba-mcadenville-cramerton`: the approximately 2.5-mile R.Y. McAden to Goat Island Park section. The Adam Springs portage decision below the McAdenville dam is explicit; no shoreline, island, or portage-area camping is promoted. Both South Fork routes use non-placeholder same-river context imagery and remain planning-only.
- Added five connected French Broad Paddle Trail planning sections: `french-broad-island-ford-hap-simpson`, `french-broad-penrose-blantyre`, `french-broad-blantyre-horse-shoe`, `french-broad-horse-shoe-lazy-otter`, and `french-broad-lazy-otter-westfeldt`. The official access list currently identifies the selected endpoint pairs at miles 11.5/21.5, 32/35, 35/41.5, 41.5/45, and 45/52.5. All five use direct USGS `03439000` only as same-river current context, transfer no numeric cutoff, and require current access/obstruction, post-storm debris, cold-water, strainer, daylight, shuttle, and named-take-out checks. No route-specific overnight camping is assumed; use nearby basecamp only unless separately verified.
- Added eight connected Haw River Paddle Trail sections: `haw-river-brooks-altamahaw`, `haw-river-altamahaw-shallow-ford`, `haw-river-shallow-ford-indian-valley`, `haw-river-indian-valley-great-bend`, `haw-river-glencoe-red-slide`, `haw-river-red-slide-graham`, `haw-river-graham-swepsonville`, and `haw-river-swepsonville-saxapahaw-lake`. The official Haw River Trail publishes the access system, section distances, relative difficulty, gauge guidance, seasonal hours, and dam/portage rules. The records use direct USGS `02096500` Haw River context except the Brooks/Altamahaw upper reach, which uses USGS `02094500` Reedy Fork proxy context; none transfers a numeric cutoff. Shallow Ford camping and the Glencoe/Puryear dam portages remain explicit rather than being treated as ordinary endpoints.
- Added `roanoke-river-williamston-astoria` from the official Roanoke River State Trail access chain. The state trail lists the named accesses and 12-mile spacing; NCWRC supplies the endpoint anchors. It remains planning-only with USGS `02080500` as upstream same-river proxy context, with wind, weather, broad-river navigation, and current access checks emphasized.
- Added three Mayo River State Park sections (`mayo-river-deshazo-anglin`, `mayo-river-anglin-hickory`, and `mayo-river-hickory-mayodan`) and seven consecutive Yadkin River sections (`yadkin-river-crater-burch`, `yadkin-river-burch-shore`, `yadkin-river-shore-shoals`, `yadkin-river-shoals-donnaha`, `yadkin-river-donnaha-old-421`, `yadkin-river-old-421-huntsville`, and `yadkin-river-huntsville-tanglewood`). Official park/county access pages provide current named endpoints and rules; the Yadkin chain explicitly carries mandatory-portage warnings and managed-access/camping caveats. All ten remain planning-only.

- North Carolina route-quality audit: all 45 routes have reviewed safety hazards/notes, camping prose/classification, finite endpoints, and non-placeholder preview imagery. The gallery now promotes each approved same-river context image into the route gallery when a route-specific photo is unavailable, with an explicit “not necessarily this exact reach” caption. Exact endpoint-pair deduplication found no duplicate or reversed route pairs; shared access points are intentional boundaries in the French Broad, Haw, Mayo, New River, South Fork Catawba, and Yadkin chains. No route was removed or merged because the section pairs represent distinct public access choices rather than duplicate records.

- Added `new-river-todd-wagoner`: Todd Island Park to New River State Park Wagoner Access, a roughly 7-mile Class II South Fork New River day run.
- Access posture: NCWRC identifies Todd Island Park (`36.2784, -81.5703`) and Wagoner Access (`36.4165, -81.387`) as public bank/canoe entries. These are stored as public-access anchors with carry uncertainty; they are not asserted to be NHD flowline-center points.
- Gauge posture: USGS `03161000` South Fork New River near Jefferson is a same-river proxy for the route. CanWePaddle publishes a section-specific informational estimate of `100–2,500 cfs`; the record is planning-only and does not present the range as a go/no-go rule.
- Safety posture: retain Class II, shallow/low-water, fast-rise, strainer/wood, cold-water, bridge, post-storm debris, and endpoint carry/closure checks. New River State Park camping is nearby/basecamp context and does not authorize camping at Todd Island Park or an unlisted riverbank.
- Imagery posture: the existing rights-clean `new-river` river-context image remains approved; it is explicitly not represented as a Todd or Wagoner endpoint photograph.
- Geometry posture: route-scoped canonical NHD geometry was generated successfully; endpoint snap maximum is 133 feet. The coordinate audit treats both public access anchors as review-level waterbody-near points, which is expected for bank/canoe access anchors.
- Added `cape-fear-river-raven-rock-lillington`: Raven Rock State Park area to Lillington Boating Access Area, a roughly 10-mile Class I–II Cape Fear River day run for app planning. The local section guide says about 8 miles, but the authoritative endpoint anchors are 9.1 miles apart straight-line, so the discrepancy is retained explicitly rather than understating the trip.
- Cape Fear access posture: NCWRC identifies the Raven Rock area (`35.4692, -78.9095`) and Lillington Boating Access Area (`35.39751617, -78.77375061`). The upper point is an access-area anchor, not proof of a developed launch; Raven Rock State Park explicitly says no kayak/canoe launch is inside the park, so verify the carry, waterline, parking, and current rules before launch.
- Cape Fear gauge posture: USGS `02102500` at Lillington is stored as direct route telemetry. CanWePaddle publishes a section-specific informational estimate of `200–5,000 cfs`; the range is not a go/no-go rule.
- Cape Fear safety/camping posture: retain Lanier Rapids, Fish Traps Rapids, Northington Lock and Dam remains, ledges, strainers, cold water, fast-rise, and access uncertainty. Raven Rock’s six-site paddle-in Canoe Camp is nearby/basecamp context and does not authorize launching from an improvised bank or camping at an access anchor.
- Cape Fear imagery posture: the approved rights-clean Raven Rock State Park Cape Fear image is labeled same-river context and does not imply endpoint coverage.
- Added `tuckasegee-river-dillsboro-barkers-creek`: Dillsboro Access to Barker’s Creek Access, a roughly five-mile Class II Tuckasegee River day run.
- Tuckasegee access posture: NCWRC identifies C.J. Harris/Dillsboro (`35.36368769, -83.24683552`) and Barker’s Creek (`35.38902721, -83.29471806`) as public access points. They are stored as authoritative access anchors with carry and operating-rule checks.
- Tuckasegee gauge posture: USGS `03510577` at Barker’s Creek is stored as direct route telemetry. CanWePaddle publishes a section-specific informational estimate of `500–2,500 cfs`; regulated releases and the gauge trend must be checked immediately before launch.
- Tuckasegee safety/camping posture: retain Class II waves, Dillsboro dam/release and structure-portage hazards, shallow low water, strainers, cold water, and day-of access checks. No endpoint camping claim is made.
- Tuckasegee imagery posture: the rights-clean Dillsboro Commons image is labeled same-river context and does not imply endpoint coverage.

## Reviewed but not yet implemented

- New River State Park’s other access pairs remain separate candidates. The park map documents the ordered canoe-access chain and paddle-in campsites, but each additional card needs its own duplicate-scope, current facility, endpoint, and station-linked operating review.
- Lumber River State Park remains retryable but threshold-weak until a defensible station-tied paddling band is found.
- Cape Fear’s other access pairs, Deep River sections, Smith River, and lower Neuse/Lumber candidates remain separate review items; do not add them without distinct public endpoint and flow packages.
- Smith River remains a blocked/review candidate because Eden’s public landings and the current flow station do not yet form a single route-specific access/threshold package; lower Neuse/Lumber and additional Tuckasegee pairs remain separate review items.
- Added `valley-river-andrews-tomotla`: Andrews Public Access to the Tomotla Gauge/Murphy Area, a roughly eleven-mile Class I Valley River day run for app planning. The local section guide says about 8 miles, but authoritative endpoint anchors are 10.5 miles apart straight-line, so the discrepancy is explicit.
- Valley River access posture: NCWRC lists the Andrews/Valley River canoe access (`35.206, -83.8158`); the lower anchor is USGS `03550000` at Tomotla (`35.13888889, -83.9805556`) and requires separate legal-landing confirmation.
- Valley River gauge posture: USGS `03550000` is stored as direct route telemetry; CanWePaddle publishes an informational `60–1,000 cfs` range. Retain the rain-dependent low-water, strainer, wire/fence, cold-water, private-bank, and lower take-out caveats.
- Valley River imagery posture: the approved Murphy Commons image is labeled same-river context and does not imply endpoint coverage.
- New River Park and Watauga/Ashe public-access networks remain useful discovery sources; do not turn road bridges or private-bank points into endpoints without a current public-carry record.

## Source set

- [NCWRC public access listing](https://www.ncpaws.org/RsReports/IMAP/FishingAreasPDF.aspx?BoatRamp=0&CanoeAccess=0&FishingPier=0&ShorelineAccess=0&SpeciesGroupID=11&TLP=0&Universal=0)
- [Watauga County public New River access list](https://www.wataugacounty.org/App_Pages/Dept/ParksRec/PublicRiverAccess/newriver.aspx)
- [New River State Park](https://www.ncparks.gov/state-parks/new-river-state-park)
- [New River State Park map](https://www.ncparks.gov/maps/new-river-state-park-map/open)
- [CanWePaddle Todd-to-Wagoner flow page](https://canwepaddle.com/rivers/north-carolina/new-river-south-fork-todd-wagoner/)
- [USGS 03161000](https://waterdata.usgs.gov/monitoring-location/USGS-03161000/)
- [CanWePaddle Raven Rock to Lillington flow page](https://canwepaddle.com/rivers/north-carolina/cape-fear-raven-rock-lillington/)
- [Raven Rock State Park](https://www.ncparks.gov/state-parks/raven-rock-state-park)
- [Raven Rock State Park camping](https://www.ncparks.gov/state-parks/raven-rock-state-park/camping)
- [NCWRC public access listing](https://www.ncpaws.org/RsReports/IMAP/FishingAreasPDF.aspx)
- [USGS 02102500](https://waterdata.usgs.gov/monitoring-location/USGS-02102500/)
- [CanWePaddle Dillsboro to Barker’s Creek flow page](https://canwepaddle.com/rivers/north-carolina/tuckasegee-dillsboro-barkers-creek/)
- [Tuckasegee River Blue Trail map](https://cdn.discoverjacksonnc.com/wp-content/uploads/2019/01/Tuckasegee-River-Blue-Trail-Map-by-American-Rivers.pdf)
- [USGS 03510577](https://waterdata.usgs.gov/monitoring-location/USGS-03510577/)
- [CanWePaddle Andrews to Murphy flow page](https://canwepaddle.com/rivers/north-carolina/valley-river-andrews-murphy/)
- [Valley River trip planning and hazard notes](https://www.paddlehiwassee.com/valleyriver.htm)
- [USGS 03550000](https://waterdata.usgs.gov/monitoring-location/USGS-03550000/)
- [Hammocks Beach State Park](https://www.ncparks.gov/state-parks/hammocks-beach-state-park)
- [Hammocks Beach paddle trail map](https://www.ncparks.gov/media/166/open)
- [Hammocks Beach current facility and paddling guidance](https://www.ncparks.gov/state-parks/hammocks-beach-state-park/news/status-facilities)
- [NC Coastal Plain Paddle Trails GIS](https://services.gis.nc.gov/secure/rest/services/NC1Map_Recreation/MapServer)
- [USGS 02092760](https://waterdata.usgs.gov/monitoring-location/USGS-02092760/)
- [French Broad Paddle Trail access points](https://frenchbroadpaddle.com/en/access-points)
- [French Broad Paddle Trail flows and gauges](https://frenchbroadpaddle.com/en/flows-gauges)
- [French Broad Paddle Trail obstruction map](https://frenchbroadpaddle.com/en/webmap-obstructions)
- [NCDOT French Broad river-user safety package](https://xfer.services.ncdot.gov/PDEA/I-2513/I-2513%20B%20and%20D%20Integrated%20Plan%20for%20Communications%20Construction%20and%20Demo%20and%20River%20User%20Safety.pdf)
- [USGS 03439000](https://waterdata.usgs.gov/monitoring-location/USGS-03439000/)
- [Haw River Trail paddle-trail overview](https://www.hawrivertrail.org/paddle-trail-overview)
- [Haw River Trail gauge guidance](https://www.hawrivertrail.org/river-gauge)
- [Haw River Trail Brooks Bridge to Altamahaw](https://www.hawrivertrail.org/brooks-bridge-to-altamahaw)
- [Haw River Trail Altamahaw to Shallow Ford](https://www.hawrivertrail.org/brooks-bridge-to-altamahaw-2)
- [Haw River Trail Indian Valley to Great Bend](https://www.hawrivertrail.org/the-valley-to-great-bend-park)
- [Haw River Trail Glencoe to Red Slide](https://www.hawrivertrail.org/glencoe-to-red-slide-park)
- [Haw River Trail Red Slide to Swepsonville](https://www.hawrivertrail.org/red-slide-park-to-swepsonville-river-park)
- [Haw River Trail Swepsonville to Saxapahaw Lake](https://www.hawrivertrail.org/swepsonville-river-park-to-saxapahaw-lake)
- [USGS 02096500](https://waterdata.usgs.gov/monitoring-location/USGS-02096500/)
- [USGS 02094500](https://waterdata.usgs.gov/monitoring-location/USGS-02094500/)
