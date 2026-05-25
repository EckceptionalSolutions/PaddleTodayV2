# Ohio Route Candidate Queue

Last reviewed: 2026-05-25

Purpose: early Ohio research queue only. These are not implementation-ready route records. Promote into `docs/route-candidate-ledger.json` only after endpoint coordinates, live-gauge wiring, and final threshold posture are confirmed.

## Supplemental Image Leads

- Grand River - Harpersfield to Hidden Valley: Wired the Wikimedia Commons file [The Harpersfield Covered Bridge and sea lamprey barrier in the Grand River, Ohio](https://commons.wikimedia.org/wiki/File:The_Harpersfield_Covered_Bridge_and_sea_lamprey_barrier_in_the_Grand_River,_Ohio_(16702400914).jpg) as `public/gallery/grand-river-harpersfield-hidden-valley/grand-river-harpersfield-covered-bridge.jpg`; credited to Joanna Gilkeson/USFWS and marked public domain as federal USFWS work. It is exact put-in context, not downstream paddling action. Secondary federal context: [USGS Grand River near Painesville downstream view](https://www.usgs.gov/media/images/grand-river-near-painesville-oh-downstream-view), useful gauge-area context but weaker route match.
- Great Miami River - Heritage/Blue Rock to Dravo Park: Route-relevant image leads exist on the [American Whitewater reach](https://www.americanwhitewater.org/content/River/view/river-detail/4554/main), [Great Miami Riverway Dravo Park access page](https://www.greatmiamiriverway.com/place.php?id=601), and Colerain/Dravo materials, but this pass did not find a rights-clean reusable route photo. Treat all as discovery-only until source rights are verified or a Commons/federal alternative appears.
- Vermilion River - Schoepfle Garden / Birmingham to Mill Hollow: Wired [Vermilion River Birmingham Ohio.jpg](https://commons.wikimedia.org/wiki/File:Vermilion_River_Birmingham_Ohio.jpg) as `public/gallery/vermilion-river-schoepfle-mill-hollow/vermilion-river-birmingham.jpg`; Commons describes it as the Vermilion River at Schoepfle Garden Metropark and licenses it CC BY-SA 2.5 by Tim Kiser.

## Highest-Priority Candidates

### Grand River - Harpersfield Covered Bridge to Hidden Valley Park

- Status: Added to V2 as `grand-river-harpersfield-hidden-valley` on 2026-05-25.
- Candidate route: Harpersfield Covered Bridge / Route 534 to Hidden Valley Park / Route 528, about 8.4 miles, Class I-II.
- Endpoint confidence: High. Lake Metroparks' Grand River Water Trail map names Harpersfield Covered Bridge, Hidden Valley Park, Blair Landing, Riverview Park, and other public access points with coordinates and river miles. American Whitewater names the same Harpersfield-to-Hidden Valley reach.
- Gauge notes: Direct/defensible USGS live gauge: Grand River near Painesville, OH, USGS `04212100`. It is downstream of the reach but on the same river; USGS confirms the site has gage height and discharge data, and Lake Metroparks ties its water-trail stage bands to this station.
- Threshold support: Mixed official/community support. Lake Metroparks publishes stage bands tied to USGS `04212100`: under 2 ft low/slow drag, 2-5 ft optimal, 5-8 ft high/fast, and above 8 ft flood-level dangerous. AW adds same-reach cfs guidance: about 100 cfs as boatable minimum, 100-1500 cfs as beginner/novice range, and 1500+ cfs as needing intermediate skills in wave-train sections.
- Character/hazards: Official/credible sources describe a designated Grand River water trail; AW flags Class I-II water, standing waves above roughly 4 ft, larger wave trains above 1500 cfs, and high-water skill escalation.
- Source links: [American Whitewater reach](https://www.americanwhitewater.org/content/River/view/river-detail/1468/main), [USGS Grand River near Painesville project page](https://www.usgs.gov/centers/ohio-kentucky-indiana-water-science-center/science/grand-river-near-painesville-oh), [Lake Metroparks Grand River Water Trail map PDF](https://www.lakemetroparks.com/KenticoTemplate/media/LakeMetroparks/Grand-River-Water-Trail-map_low-res.pdf).
- Next action: Keep searching for a downstream paddling-action image; the public-domain Harpersfield put-in photo is now wired.

### Great Miami River - Heritage Park or Blue Rock Road to Obergiesing Soccer Complex at Dravo Park

- Status: Added to V2 as `great-miami-river-heritage-dravo` on 2026-05-25, guarded as `routeType: 'whitewater'`.
- Candidate route: Heritage Park or Blue Rock Road to Obergiesing Soccer Complex at Dravo Park, about 6.1 miles, Class I-II.
- Endpoint confidence: Medium-high. AW names the exact reach and take-out. Colerain Township confirms the upstream canoe ramp is at Heritage Park and the downstream ramp is at Obergiesing Soccer Complex at Dravo Park; the Great Miami River Water Trail map names both access points. Ramp-level official GIS coordinates were not found in this pass, so the implementation uses named park coordinates with caveats.
- Gauge notes: Direct USGS live gauge: Great Miami River at Hamilton, OH, USGS `03274000`. AW identifies this gauge for the reach and AW gauge metadata ties the station to USGS `03274000`.
- Threshold support: Strong community support from AW for the same reach. AW says the section is commonly run from about 500 cfs to 5000+ cfs, lists a 5000 cfs cutoff because rapids flush out, warns around 8000 cfs paddlers should stay off due to wood/floating debris, and gives additional feature notes at 1000, 1500, 2000, 2500, 3000, 3500, 4500, and 5000+ cfs.
- Character/hazards: AW describes a dependable Cincinnati-area training run with several Class I rapids, Class II features, strainers, wood, wrapped boats, rescues at Denny's Run, and a "not for recreational kayakers" trip-report warning. Treat as whitewater/swiftwater discovery, not a casual flatwater route.
- Source links: [American Whitewater reach](https://www.americanwhitewater.org/content/River/view/river-detail/4554/main), [AW Great Miami Hamilton gauge metadata](https://www.americanwhitewater.org/content/Gauge2/detail/id/1529/), [USGS Great Miami River at Hamilton](https://waterdata.usgs.gov/monitoring-location/USGS-03274000/), [Colerain Township Dravo Park facility page](https://www.colerain.org/Facilities/Facility/Details/Obergiesing-Soccer-Complex-at-Dravo-Park-33), [Great Miami Riverway access map](https://greatmiamiriverway.com/maps?category=64-66).
- Next action: Improve ramp-level coordinates if official GIS appears, and keep searching for a rights-clean route photo.

### Little Miami River - Kelley Nature Preserve to Jim Terrell Park

- Status: Added to V2 as `little-miami-river-kelley-milford` on 2026-05-25, guarded as `routeType: 'whitewater'`.
- Candidate route: Kelley Nature Preserve to Jim Terrell Park in Milford, about 4.9 miles, Class I-II.
- Endpoint confidence: High. ODNR's Little Miami Scenic River map publishes Kelley Nature Preserve and Jim Terrell Park access coordinates; Clermont County Parks confirms Kelley has canoe/kayak access to the Little Miami.
- Gauge notes: Direct USGS live gauge: Little Miami River at Milford, OH, USGS `03245500`. AW uses this same Milford gauge for the Kelley-to-Milford reach.
- Threshold support: Strong community support from AW for the exact reach. AW publishes a stage ladder: below 4.60 ft way too low, 4.60-5.50 ft low with possible walking, 5.50-7.50 ft best boatable/play levels with about 6.5 ft prime, 7.50-9.00 ft fast/washy high runnable, and 9.00+ ft sketchy/possibly flooding.
- Character/hazards: AW describes Boathouse Rapid, old low-head-dam remnants, small holes, ledges, rock gardens, and pushier high water. ODNR gives broader scenic-river hazard guidance for swift water, lowhead dams, strainers, cold water, and flood levels.
- Source links: [American Whitewater reach](https://www.americanwhitewater.org/content/River/view/river-detail/10600/main), [AW gauge info](https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=10600), [USGS Little Miami at Milford](https://waterdata.usgs.gov/monitoring-location/USGS-03245500/), [ODNR Little Miami Scenic River map PDF](https://dam.assets.ohio.gov/image/upload/ohiodnr.gov/documents/parks/streammaps/LittleMiamiScenicRiver.pdf), [Clermont County Parks Kelley Nature Preserve](https://www.clermontparks.org/kelley-nature-preserve/).
- Next action: Find a rights-clean image and keep watching for official ODNR/local non-playboating threshold guidance.

### Vermilion River - Schoepfle Garden / Birmingham to Mill Hollow

- Status: Added to V2 as `vermilion-river-schoepfle-mill-hollow` on 2026-05-25.
- Candidate route: Schoepfle Garden / Birmingham at Edison Highway / US 20 to Mill Hollow Park in Vermilion River Reservation, about 8.1 miles, Class I(II).
- Endpoint confidence: High enough for V2. AW names Schoepfle Garden / Birmingham as the put-in and Mill Hollow Park as the take-out. ODNR's Vermilion River public-access guide publishes Schoepfle Garden / Birmingham and Mill Hollow / Vermilion River Reservation coordinates; Lorain County Metro Parks confirms the park/access context.
- Gauge notes: Direct USGS live gauge: Vermilion River near Vermilion, OH, USGS `04199500`. AW uses this same gauge for the reach.
- Threshold support: Strong community support from AW for the same reach. AW publishes a 2.55-6.00 ft range for barely runnable through high runnable Class I(II), and a route report recommends 3.5-4.25 ft for novice kayakers, with the middle of that range most fun.
- Character/hazards: AW describes mostly Class I/I+ pools and small drops with a couple light Class II sections after the 113 crossing and before Dean Hollow Bridge. Lorain County Metro Parks warns to check water levels because the Vermilion can sometimes be low.
- Image notes: Same-reach Commons image is wired from Schoepfle Garden: [Vermilion River Birmingham Ohio.jpg](https://commons.wikimedia.org/wiki/File:Vermilion_River_Birmingham_Ohio.jpg), CC BY-SA 2.5 by Tim Kiser.
- Source links: [American Whitewater reach](https://www.americanwhitewater.org/content/River/view/river-detail/3140/main), [AW gauge info](https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=3140), [USGS Vermilion River near Vermilion](https://waterdata.usgs.gov/monitoring-location/USGS-04199500/), [ODNR Vermilion River public-access guide](https://dam.assets.ohio.gov/image/upload/ohiodnr.gov/documents/coastal/public-access/pag-riv-06-VermilionRiver.pdf), [Lorain County Metro Parks Vermilion River Reservation](https://www.loraincountymetroparks.com/vermilion-river-reservation), [Lorain County Metro Parks activities/kayaking](https://www.loraincountymetroparks.com/activities), [ODNR Vermilion-Lorain Water Trail PDF](https://dam.assets.ohio.gov/image/upload/odnr/watertrails/VermilionLorainWaterTrail.pdf).
- Next action: Keep searching for a more exact Mill Hollow or paddling-action image; the same-reach Schoepfle image is now wired.

## Good Route Sources, Threshold Weak

### Cuyahoga River - Ira Road to Route 303 / Peninsula

- Status: Added to V2 as `cuyahoga-river-ira-lock-29` on 2026-05-25.
- Candidate route: Ira Road / Ira Trailhead corridor to Lock 29 / Route 303 in Peninsula, about 6.9 miles, Class I.
- Endpoint confidence: Medium-high. AW names Ira Road and Route 303/Peninsula. NPS confirms Ira Trailhead public parking and Lock 29 river access, while the Cuyahoga River Water Trail map publishes Lock 29 access coordinates. The Ira riverbank put-in remains less polished than Lock 29 and should be verified on arrival.
- Gauge notes: Direct USGS live gauge: Cuyahoga River at Old Portage, OH, USGS `04206000`. AW uses Old Portage for the exact Ira-to-303 route; USGS confirms the monitoring location.
- Threshold support: Strong community support from AW for the exact reach. AW gauge information for reach 3355 publishes `100 - 1000 cfs` as barely runnable through high runnable, and route text gives feature notes at 250, 300, and 700 cfs. V2 uses a guarded 250-700 cfs app target inside the AW range.
- Character/hazards: AW calls it a training reach with a few Class I rapids, flatwater sections, strainers, poor but improving water quality, and route-specific attainments. Cuyahoga River Water Trail describes the broader corridor as varied, with beginners better above Kent, intermediate paddlers between Kent and Cuyahoga Falls, and the Gorge for experienced paddlers only.
- Source links: [American Whitewater Ira-to-303 reach](https://www.americanwhitewater.org/content/River/view/river-detail/3355/main), [AW Ira-to-303 gauge info](https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=3355), [USGS Old Portage](https://waterdata.usgs.gov/monitoring-location/USGS-04206000/), [ODNR Cuyahoga River Water Trail PDF](https://dam.assets.ohio.gov/image/upload/odnr/watertrails/CuyahogaRiverWaterTrail.pdf), [NPS Ira Trailhead](https://home.nps.gov/places/000/ira-trailhead.htm), [NPS Lock 29 River Access](https://www.nps.gov/places/lock-29-river-access.htm).
- Next action: Improve the Ira put-in coordinate/source if an official water-trail GIS point appears, and watch current NPS closures before extending downstream.

### Cuyahoga River - Lock 29 Trailhead to Station Road Bridge Trailhead

- Status: `threshold_weak`.
- Candidate route: Lock 29 Trailhead to Station Road Bridge Trailhead in Cuyahoga Valley National Park, roughly 8 miles by river-mile markers, easy-to-moderate but hazard-sensitive.
- Endpoint confidence: High. NPS lists Lock 29 at river mile 29.0 and Station Road Bridge at river mile 21.0, with parking/restrooms and other amenities, and describes seven park access points.
- Gauge notes: Direct/proxy USGS gauge candidates are Cuyahoga River at Jaite, OH, USGS `04206425`, and Cuyahoga River at Independence, OH, USGS `04208000`; Old Portage may be useful upstream but is less direct for this park reach.
- Threshold support: Weak for shipping. NPS gives numeric hazard notes but not a full paddling range: large woody debris between Red Lock and Station Road has a navigable path at higher flows roughly above 700 cfs, and a fixed hazard near Lock 29 has better portage beach/eddy conditions below 2000 cfs. Those numbers are useful safety thresholds, not a complete runnable range tied to one selected gauge.
- Character/hazards: Official NPS guidance says the river is not maintained for recreation, paddlers are responsible for safety, and swift currents, log jams, strainers, and changing conditions are common serious hazards. As of the 2026-05-25 recheck, NPS also reports a river-wide closure near river mile 17 for bridge demolition/construction, so downstream CVNP route candidates should remain blocked until that closure is gone.
- Source links: [NPS paddling guidance](https://www.nps.gov/cuva/planyourvisit/paddling-the-river.htm), [Cuyahoga River Water Trail overview](https://cuyahogariverwatertrail.org/explore-the-cuyahoga/), [USGS Jaite](https://waterdata.usgs.gov/monitoring-location/USGS-04206425/), [USGS Independence](https://waterdata.usgs.gov/monitoring-location/USGS-04208000/).
- Next action: Keep as a Cuyahoga research lead, not a route add. Need the river-mile-17 closure cleared and a defensible numeric low/ideal/high model tied to Jaite or Independence before implementation.

### Mahoning River - Foster MetroPark to Packard Park

- Status: `threshold_weak`.
- Candidate route: Foster MetroPark to Packard Park, full 23-mile Mahoning River Water Trail in Trumbull County, Class I.
- Endpoint confidence: High. Trumbull County MetroParks names the route from Foster MetroPark in Newton Township to Packard Park in Warren and lists multiple launch points with coordinates, including Foster, Rotary Park, Canoe City, Thomas A. Swift, Burbank, and Packard Park.
- Gauge notes: Proxy/direct USGS candidate: Mahoning River at Pricetown, OH, USGS `03091500`. USGS confirms the monitoring location; route-to-gauge fit needs more work because Pricetown is downstream/outside the Trumbull water-trail corridor.
- Threshold support: Weak. ODNR/Trumbull materials say to check real-time USGS flow and warn against high/flood water, but they do not publish a route-specific numeric paddling range. RiverScout reports an optimal range of 150-450 cfs on USGS `03091500`, but that is not strong enough alone for the PaddleToday bar without independent corroboration.
- Character/hazards: ODNR brochure and Trumbull page describe a Class I, 23-mile water trail through forested, rural, suburban, and wetland settings, with lowhead-dam/high-water safety warnings.
- Source links: [Trumbull County MetroParks Mahoning River Water Trail](https://trumbullmetroparks.org/visit/mahoning-river-water-trail), [ODNR Mahoning River Water Trail PDF](https://dam.assets.ohio.gov/image/upload/ohiodnr.gov/documents/parks/watertrails/MahoningRiverWaterTrail.pdf), [USGS Mahoning River at Pricetown](https://waterdata.usgs.gov/monitoring-location/USGS-03091500/), [RiverScout Mahoning page](https://riverscout.app/rivers/ohio/mahoning-river).
- Next action: Search for local outfitter, park, race, or water-trail numeric guidance that independently ties the Trumbull corridor to Pricetown, Leavittsburg, or another live gauge.

### Little Beaver Creek - Beaver Creek State Park / Grimm's Bridge Corridor

- Status: `needs_specific_segment`.
- Candidate route: Likely Beaver Creek State Park / Lusk Lock / Middle Beaver Road / Fredericktown / Grimm's Bridge corridor. Do not implement until one exact public put-in and take-out pair is selected.
- Endpoint confidence: Medium. ODNR stream map material and state-park sources support Beaver Creek State Park, Lusk Lock, Teegarden, canoe-rental, and other access concepts, but the cleanest public point-to-point route still needs coordinate cleanup. Some sources describe difficult or informal access at Grimm's Bridge and private land along the corridor.
- Gauge notes: Direct USGS live gauge: Little Beaver Creek near East Liverpool, OH, USGS `03109500`. AW gauge metadata also identifies this station and links Little Beaver reaches to it.
- Threshold support: Promising but still incomplete. The federal Wild & Scenic River study says `300 cfs` average mean discharge at the East Liverpool gaging station is a reasonable amount for satisfactory main-stem canoeing, and notes scarcity of water is usually the limiting factor. Trumbull Canoe Trails/forum-style local guidance says to look for at least `400 cfs` on the same online gauge for the Middle Fork; older canoe guide material translates an historical phone/staff-gauge runnable window to roughly `172-957 cfs`. These are useful but not yet a clean low/ideal/high implementation ladder for a single selected route.
- Character/hazards: Sources describe Little Beaver as a wild/scenic creek with swift boulder water, challenging rapids, gorge scenery, seasonal scarcity of water, and access constraints. Treat as a guarded scenic/whitewater-adjacent candidate, not a casual tubing-style float.
- Source links: [USGS Little Beaver near East Liverpool](https://waterdata.usgs.gov/monitoring-location/USGS-03109500/), [AW Little Beaver gauge metadata](https://www.americanwhitewater.org/content/Gauge2/detail/?id=1368), [National Wild & Scenic River study PDF](https://www.rivers.gov/rivers/sites/rivers/files/2023-01/little-beaver-creek-study.pdf), [ODNR Little Beaver Creek stream map](https://dam.assets.ohio.gov/image/upload/ohiodnr.gov/documents/parks/streammaps/LittleBeaverCreek.pdf), [AW Lower Little Beaver Creek](https://www.americanwhitewater.org/content/River/view/river-detail/1471/main), [Trumbull Canoe Trails Middle Fork note](https://www.trumbullcanoetrails.org/forum/showthread.php?t=1170).
- Next action: Pick one exact public route, likely within/around Beaver Creek State Park, then verify endpoint coordinates and whether the 300/400 cfs evidence defensibly applies to that exact fork/main-stem segment.

### Tuscarawas River - Water Trail Access Segments

- Status: `threshold_weak` / cluster lead.
- Candidate route: TBD. ODNR/MWCD water-trail material has many public access points; likely first implementation target should be a shorter named segment downstream of Dover Dam or around Dover/New Philadelphia only after a route-level threshold package is found.
- Endpoint confidence: Medium-high for the water trail as a whole. ODNR/MWCD map names managed access points and public partners, including Summit Metro Parks, Stark Parks, Lawrence Township, Dover, Tuscarawas County, Coshocton, New Philadelphia, USACE, Tuscarawas, Gnadenhutten, ODNR Wildlife, and Rural Action. Some individual segment logistics still need cleanup.
- Gauge notes: Direct USGS live gauge candidates include Tuscarawas River below Dover Dam near Dover, OH, USGS `03122500`, plus other Tuscarawas gauges. The Dover Dam gauge is likely useful for Dover-area routes and race/course decisions.
- Threshold support: Weak for route add. ODNR says numerous streamgages exist and directs paddlers to USGS real-time data, but does not publish route-specific numeric thresholds. A 2026 Tuscarawas Canoe & Kayak Race flyer uses the Dover Dam gauge and cancels if it is higher than 3.5 ft; that is useful high-water evidence for a Dover loop/race course, not enough by itself for a normal point-to-point route.
- Character/hazards: ODNR describes a 130-mile river/water trail with urban-to-rural paddling, flood-control dams, lowhead dams, strainers, foot-entrapment risk, and high-water hazards.
- Source links: [ODNR Tuscarawas River Water Trail PDF](https://dam.assets.ohio.gov/image/upload/odnr/watertrails/TuscarawasRiverWaterTrail.pdf), [USGS Tuscarawas River below Dover Dam](https://waterdata.usgs.gov/monitoring-location/03122500/), [2026 Tuscarawas race flyer](https://www.ohiopaddler.com/wp-content/uploads/2026/03/2026_Tuscarawas-Race-Flyer.pdf), [MWCD kayaking and water trails](https://www.mwcd.org/visit-our-lakes/activities/kayaking-water-trails/).
- Next action: Do not promote until a specific named public put-in/take-out pair has a numeric low/ideal/high or conservative high-water model tied to the selected USGS gauge.

## Lower-Priority Leads

- Grand River downstream access chain: Lake Metroparks map has several named public points below Hidden Valley, but the strongest threshold package found in this pass was the AW Harpersfield-to-Hidden Valley reach.
- Great Miami River Dayton Playpark: AW has a direct USGS Dayton gauge and very detailed play-wave thresholds, but this is a 0.6-mile whitewater/play feature rather than a normal route. Keep as a possible future whitewater-feature record only if the product supports that use case.
- Mohican / Clear Fork: not reviewed deeply in this pass. Only pursue if a same-route numeric gauge package is available from AW, outfitter guidance, or official/credible paddling material.
