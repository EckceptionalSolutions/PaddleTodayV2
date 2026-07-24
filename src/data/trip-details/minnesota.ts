// State-scoped route data. Keep entries in route-family and downstream order.
import type { RiverTripDetails } from '../../lib/types';

export const minnesotaRiverTripDetails: Record<string, RiverTripDetails> = {
  "big-fork-river-highway-6-south-north": {
    "putIn": {
      "name": "Highway 6 South / State Hwy 6 Bridge carry-in access",
      "latitude": 47.953023,
      "longitude": -93.754988
    },
    "takeOut": {
      "name": "Bill Counter Landing / Highway 6 North carry-in access",
      "latitude": 48.034694214683626,
      "longitude": -93.74155634703675
    },
    "logistics": {
      "distanceLabel": "15.7 mi",
      "estimatedPaddleTime": "Long day, roughly 6 hr to 8 hr depending on level and stops",
      "shuttle": "Plan a remote two-car shuttle on Highway 6. Treat the route as a full-day commitment, or use the first-come watercraft campsite about halfway through for an overnight plan.",
      "permits": "No route-specific paddling permit is known. Follow DNR water-trail rules and posted access or state-forest rules at both Highway 6 landings and any campsite.",
      "camping": "DNR Map 1 names Easy Half watercraft campsite at river mile 81.7, about halfway through the trip, and describes it as a grassy tree-lined clearing with picnic tables. It is first-come, first-served, so bring a backup plan.",
      "summary": "Launch at the southern Highway 6 carry-in near the Craigsville gauge and take out at the northern Highway 6 access. This is DNR's 15.7-mile recommended Big Fork day trip through remote Koochiching State Forest.",
      "accessCaveats": [
        "Both endpoints are official public-water-access sites, but they are remote carry-in landings with limited services.",
        "The DNR access layer labels the upstream put-in as State Hwy 6 Bridge and the downstream take-out as State Hwy 6 (S), while the DNR route page uses Highway 6 (S) to Highway 6 (N). Use river miles and coordinates to avoid confusion.",
        "This route is long enough that daylight, weather, and a realistic bailout plan matter more than on short metro routes."
      ],
      "watchFor": [
        "Rocky or impassable rapids when Big Fork levels fall toward the scrapable/low band.",
        "A Class I rapid immediately below the put-in, plus additional Class I-II rapids, cold water, sweepers, beaver-dam potential, and remote shoreline with limited quick exits.",
        "Do not continue into Big Falls or Little American Falls sections without separate whitewater and portage planning."
      ]
    }
  },
  "big-fork-river-johnson-big-falls-east": {
    "putIn": {
      "name": "Johnson Landing carry-in access",
      "latitude": 48.0886284,
      "longitude": -93.6816927
    },
    "takeOut": {
      "name": "Big Falls East Landing trailer access",
      "latitude": 48.1950345,
      "longitude": -93.7958517
    },
    "logistics": {
      "distanceLabel": "14.5 mi",
      "estimatedPaddleTime": "About 6 hr to 8 hr",
      "shuttle": "Stage the take-out at Big Falls East first, then drive back to Johnson Landing. DNR recommends budgeting a full day, and checking the take-out in advance matters because this route ends directly above Big Falls.",
      "permits": "No route-specific paddling permit is known. Follow posted public-water-access, watercraft-registration, state-forest, and city-park rules at Johnson and Big Falls.",
      "camping": "Johnson Landing has a watercraft campsite and Big Falls City Park provides campground support by the take-out, making this one of the cleaner northern camp-before-or-after paddles in the app.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Johnson Landing and finish at Big Falls East for MN DNR's recommended Big Fork Map 2 day trip. Expect a long, mostly lazy wooded paddle that still ends with a strict mandatory take-out above serious whitewater.",
      "accessCaveats": [
        "Big Falls East is the intended river-left finish before the falls. Do not drift downstream into the Big Falls portage/falls zone by accident.",
        "DNR explicitly identifies Grunwald as the shortening point for this corridor, which also serves as the cleanest mid-route bailout if the day is moving slower than expected.",
        "Johnson has a campsite and rest area, but this is still a remote forest route between named public accesses rather than a corridor with easy roadside exits."
      ],
      "watchFor": [
        "The mandatory take-out above Big Falls and the Class IV whitewater immediately downstream.",
        "Wood, strainers, and outside-bend snags on a northern river that can change after storms.",
        "Long-day fatigue, scraping and slower travel when the gauge is near the floor, and faster current after rain."
      ]
    },
    "accessPoints": [
      {
        "id": "johnson",
        "name": "Johnson Landing carry-in access",
        "latitude": 48.0886284,
        "longitude": -93.6816927,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Public upstream start with a nearby watercraft campsite."
      },
      {
        "id": "grunwald",
        "name": "Grunwald Landing",
        "latitude": 48.1349931,
        "longitude": -93.7224805,
        "mileFromStart": 6.5,
        "segmentKind": "creek",
        "note": "Official mid-route shortening point for this recommended DNR day."
      },
      {
        "id": "big-falls-east",
        "name": "Big Falls East Landing trailer access",
        "latitude": 48.1950345,
        "longitude": -93.7958517,
        "mileFromStart": 14.5,
        "segmentKind": "creek",
        "note": "Required river-left finish before Big Falls."
      }
    ]
  },
  "big-fork-river-highway-6-north-johnson": {
    "putIn": {
      "id": "big-fork-highway-6-north",
      "name": "Big Fork River, State Hwy 6 (S) / Highway 6 North Public Water Access Site",
      "latitude": 48.034694214683626,
      "longitude": -93.74155634703675
    },
    "takeOut": {
      "id": "big-fork-johnson",
      "name": "Big Fork River, Johnson Public Water Access Site",
      "latitude": 48.0886283542472,
      "longitude": -93.68169266740433
    },
    "logistics": {
      "distanceLabel": "About 8.3 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr, longer with low-water scraping or campsite stops",
      "shuttle": "Stage Johnson Landing first, then drive back to the Highway 6 North carry-in. Confirm the Johnson landing from land before launching because public exits are sparse in this remote forest corridor.",
      "permits": "No route-specific paddling permit is known. Follow DNR water-trail, state-forest, public-access, watercraft-registration, and PFD rules at both landings and any campsite.",
      "camping": "Johnson Landing has a DNR-mapped watercraft campsite and rest area at the take-out. Treat camping as designated-site only; do not assume private-bank or informal island camping between accesses.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Highway 6 North and paddle the upper part of Big Fork Map 2 to Johnson Landing. This fills the public-access gap above the existing Johnson-to-Big-Falls route without adding the downstream falls take-out consequence.",
      "accessCaveats": [
        "Minnesota public-water-access GIS labels the put-in as State Hwy 6 (S), while DNR route/map copy calls it Highway 6 North; use the river-mile 75.8 record and coordinates to avoid confusing it with the upstream Highway 6 South access.",
        "The Craigsville gauge is upstream of the route, so check actual depth and wood at Highway 6 North before committing.",
        "Do not casually continue below Johnson toward Big Falls unless the group planned the separate full-day Johnson-to-Big-Falls route and mandatory take-out above the falls."
      ],
      "watchFor": [
        "Low-water rock, shallow riffles, and possible scraping when the upstream gauge is near the floor.",
        "Strainers, fresh storm wood, cold water, private banks, and limited rescue exposure on a remote northern river.",
        "Reilly Brook and Reilly Creek confluence current, beaver activity, and long gaps between public road crossings."
      ]
    },
    "accessPoints": [
      {
        "id": "big-fork-highway-6-north",
        "name": "Big Fork River, State Hwy 6 (S) / Highway 6 North Public Water Access Site",
        "latitude": 48.034694214683626,
        "longitude": -93.74155634703675,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at DNR/public-access GIS river mile 75.8; DNR map labels this Highway 6 North."
      },
      {
        "id": "big-fork-johnson",
        "name": "Big Fork River, Johnson Public Water Access Site",
        "latitude": 48.0886283542472,
        "longitude": -93.68169266740433,
        "mileFromStart": 8.3,
        "segmentKind": "creek",
        "note": "Default take-out and DNR-mapped watercraft campsite/rest area at river mile 67.5."
      }
    ]
  },
  "big-fork-river-big-falls-west-kueffners": {
    "putIn": {
      "name": "Big Falls West / Cody Landing Public Water Access Site",
      "latitude": 48.1974059,
      "longitude": -93.804955
    },
    "takeOut": {
      "name": "Kueffners Public Water Access Site",
      "latitude": 48.3387433532423,
      "longitude": -93.81704382878402
    },
    "logistics": {
      "distanceLabel": "22.2 mi",
      "estimatedPaddleTime": "Very long day, roughly 8 hr to 10 hr depending on level and stops",
      "shuttle": "Stage the take-out at Kueffners before driving to Big Falls West / Cody Landing. This route begins below the Big Falls portage and commits you to a long remote forest run, so build in daylight and backup-driver margin.",
      "permits": "No route-specific paddling permit is known. Follow posted public-water-access, portage, county, and state-forest rules at Big Falls, Sturgeon, Ben Linn, Gowdy, and Kueffners.",
      "camping": "Sturgeon, Ben Linn, and Gowdy all have documented watercraft campsites, and Kueffners adds toilets plus another watercraft campsite, so this route has real on-route overnight or bailout support instead of only a day-trip finish.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch below Big Falls at Cody Landing / Big Falls West and finish at Kueffners for the longest current lower-Big-Fork continuation in the app. It adds the full rapid-stretch corridor plus a lower campsite finish with toilets.",
      "accessCaveats": [
        "Big Falls West is the downstream put-in reached after the documented Big Falls portage. Do not start above the falls unless you have separately planned that upstream route and portage.",
        "Sturgeon, Ben Linn, and Gowdy are the clearest named bailout or overnight options before the Kueffners finish.",
        "Stay with the named public accesses and campsites rather than improvising on brushy or private banks."
      ],
      "watchFor": [
        "The mapped Class I rapid stretch between river miles 41.3 and 39.8 on the lower half of the route.",
        "Outside-bend strainers, fresh storm wood, and quicker current after rain.",
        "Long-day fatigue plus scraping and slower travel when the Big Falls gauge falls toward the 1.5 ft floor."
      ]
    },
    "accessPoints": [
      {
        "id": "big-falls-west",
        "name": "Big Falls West / Cody Landing Public Water Access Site",
        "latitude": 48.1974059,
        "longitude": -93.804955,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Downstream launch reached after the documented Big Falls portage."
      },
      {
        "id": "sturgeon",
        "name": "Sturgeon Public Water Access Site",
        "latitude": 48.2118788,
        "longitude": -93.8834227,
        "mileFromStart": 5.1,
        "segmentKind": "creek",
        "note": "First named bailout with a watercraft campsite."
      },
      {
        "id": "ben-linn",
        "name": "Ben Linn Public Water Access Site",
        "latitude": 48.2500692,
        "longitude": -93.8861103,
        "mileFromStart": 9.6,
        "segmentKind": "creek",
        "note": "Mid-route campsite and second bailout before the lower rapid stretch."
      },
      {
        "id": "gowdy",
        "name": "Gowdy Public Water Access Site",
        "latitude": 48.2991378,
        "longitude": -93.820383,
        "mileFromStart": 18.4,
        "segmentKind": "creek",
        "note": "Carry-in access with a watercraft campsite near the downstream end of the rapid-stretch corridor."
      },
      {
        "id": "kueffners",
        "name": "Kueffners Public Water Access Site",
        "latitude": 48.3387433532423,
        "longitude": -93.81704382878402,
        "mileFromStart": 22.2,
        "segmentKind": "creek",
        "note": "Carry-in access with toilets and a watercraft campsite at the lower finish."
      }
    ]
  },
  "big-fork-river-ben-linn-ivan-crawford": {
    "putIn": {
      "name": "Ben Linn Public Water Access Site",
      "latitude": 48.2500692,
      "longitude": -93.8861103
    },
    "takeOut": {
      "name": "Ivan Crawford Public Water Access Site",
      "latitude": 48.45526062827152,
      "longitude": -93.71955474703496
    },
    "logistics": {
      "distanceLabel": "34.0 mi",
      "estimatedPaddleTime": "Very long day or overnight, roughly 11 hr to 14 hr depending on level, wind, and camp strategy",
      "shuttle": "Stage the take-out at Ivan Crawford before driving to Ben Linn. This is a full lower-river shuttle with a real chance of turning into an overnight, so build in daylight, weather, and backup-driver margin.",
      "permits": "No route-specific paddling permit is known. Follow posted public-water-access and state-forest rules at Ben Linn, Gowdy, Kueffners, and Ivan Crawford.",
      "camping": "Ben Linn and Gowdy both have documented watercraft campsites, and Kueffners adds toilets plus another campsite, so this route has real on-route overnight structure before the simpler Ivan Crawford finish.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Ben Linn and finish at Ivan Crawford for a full lower Big Fork continuation. It starts with the rapid stretch, then turns into a committed lower-corridor run where distance and sparse exits dominate the day.",
      "accessCaveats": [
        "Kueffners is the last named campsite-and-toilet checkpoint before the final push to Ivan Crawford and should be treated as a real decision point if weather or light deteriorates.",
        "Ivan Crawford is the intended finish before the final Reedy Flats / Rainy River approach; do not treat it as a casual optional stop if you keep drifting.",
        "Use only the named public accesses and campsites because surrounding shoreline remains private or undeveloped."
      ],
      "watchFor": [
        "The mapped Class I rapid stretch between river miles 41.3 and 39.8 near the start of the route.",
        "Long-day fatigue, cold shoulder-season water, and broad exposed bends on the lower corridor.",
        "Fresh storm wood, undercut outside bends, and slow travel when the Big Falls gauge falls toward the 1.5 ft floor."
      ]
    },
    "accessPoints": [
      {
        "id": "ben-linn",
        "name": "Ben Linn Public Water Access Site",
        "latitude": 48.2500692,
        "longitude": -93.8861103,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Carry-in access with a grassy clearing and watercraft campsite at the upstream end of the route."
      },
      {
        "id": "gowdy",
        "name": "Gowdy Public Water Access Site",
        "latitude": 48.2991378,
        "longitude": -93.820383,
        "mileFromStart": 8.8,
        "segmentKind": "creek",
        "note": "Carry-in access with a watercraft campsite and the clearest early bailout before Kueffners."
      },
      {
        "id": "kueffners",
        "name": "Kueffners Public Water Access Site",
        "latitude": 48.3387433532423,
        "longitude": -93.81704382878402,
        "mileFromStart": 12.6,
        "segmentKind": "creek",
        "note": "Carry-in access with toilets and a watercraft campsite at the last major lower-river checkpoint."
      },
      {
        "id": "ivan-crawford",
        "name": "Ivan Crawford Public Water Access Site",
        "latitude": 48.45526062827152,
        "longitude": -93.71955474703496,
        "mileFromStart": 34,
        "segmentKind": "creek",
        "note": "County landing near the Bear River confluence and the intended lower finish before Reedy Flats."
      }
    ]
  },
  "big-fork-river-gowdy-reedy-flats": {
    "putIn": {
      "name": "Gowdy Public Water Access Site",
      "latitude": 48.2991378,
      "longitude": -93.820383
    },
    "takeOut": {
      "name": "Reedy Flats Public Water Access Site",
      "latitude": 48.512209474305244,
      "longitude": -93.71277845257251
    },
    "logistics": {
      "distanceLabel": "33.7 mi",
      "estimatedPaddleTime": "Very long day or overnight, roughly 11 hr to 14 hr depending on level, wind, and camp strategy",
      "shuttle": "Stage the take-out at Reedy Flats before driving to Gowdy. This is a full lower-river shuttle with only Kueffners and Ivan Crawford as named checkpoints before the Rainy River approach.",
      "permits": "No route-specific paddling permit is known. Follow posted public-water-access rules at Gowdy, Kueffners, Ivan Crawford, and Reedy Flats.",
      "camping": "Gowdy has a watercraft campsite, Kueffners adds toilets plus another campsite, and Reedy Flats has a toilet and watercraft campsite just above Highway 11, so this route has real overnight structure instead of only a distant finish.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Gowdy and finish at Reedy Flats for the full lower Big Fork continuation above the Rainy River. The current is usually gentler than the upper routes, but the mileage and finish demand real planning discipline.",
      "accessCaveats": [
        "Kueffners and Ivan Crawford are the only major named checkpoints before the final Reedy Flats finish.",
        "Reedy Flats is the intended final public take-out above the Rainy River confluence. Do not assume a safe or public continuation beyond it.",
        "Use only the named public accesses and campsites because surrounding shoreline remains private or undeveloped."
      ],
      "watchFor": [
        "Long-day fatigue, cold shoulder-season water, and broad exposed bends.",
        "Fresh storm wood, undercut outside bends, and few easy exit points after Gowdy.",
        "Slow travel and shallow bends when the Big Falls gauge falls toward the 1.5 ft floor."
      ]
    },
    "accessPoints": [
      {
        "id": "gowdy",
        "name": "Gowdy Public Water Access Site",
        "latitude": 48.2991378,
        "longitude": -93.820383,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Carry-in access with a watercraft campsite at the upstream end of this full lower continuation."
      },
      {
        "id": "kueffners",
        "name": "Kueffners Public Water Access Site",
        "latitude": 48.3387433532423,
        "longitude": -93.81704382878402,
        "mileFromStart": 3.8,
        "segmentKind": "creek",
        "note": "Carry-in access with toilets and a watercraft campsite at the first major lower-river checkpoint."
      },
      {
        "id": "ivan-crawford",
        "name": "Ivan Crawford Public Water Access Site",
        "latitude": 48.45526062827152,
        "longitude": -93.71955474703496,
        "mileFromStart": 25.2,
        "segmentKind": "creek",
        "note": "County landing near the lower Big Fork / Bear River area and the last named checkpoint before Reedy Flats."
      },
      {
        "id": "reedy-flats",
        "name": "Reedy Flats Public Water Access Site",
        "latitude": 48.512209474305244,
        "longitude": -93.71277845257251,
        "mileFromStart": 33.7,
        "segmentKind": "creek",
        "note": "Trailer access with a watercraft campsite just above Highway 11 and the Rainy River confluence."
      }
    ]
  },
  "little-fork-river-veterans-park-highway-73": {
    "putIn": {
      "name": "Veterans Park carry-in access, Cook",
      "latitude": 47.854286,
      "longitude": -92.688289
    },
    "takeOut": {
      "name": "Highway 73 bridge carry-in access",
      "latitude": 47.858288,
      "longitude": -92.870024
    },
    "logistics": {
      "distanceLabel": "15.2 mi",
      "estimatedPaddleTime": "Long day, roughly 6 hr to 8 hr depending on level and scouting",
      "shuttle": "Plan a rural two-car shuttle from Veterans Park in Cook to the Highway 73 bridge near Linden Grove. The take-out is next to the DNR gauge and bridge parking, but services are limited.",
      "permits": "No route-specific paddling permit is known. Follow posted access, city park, and bridge-area parking rules.",
      "camping": "Do not assume an on-route campsite for this day trip. Nearby state forests may have separate camping options, but this route should be planned as a committed day paddle unless camping is confirmed separately.",
      "summary": "Launch at Veterans Park in Cook and take out at the Highway 73 bridge. MN DNR recommends this 15.2-mile Little Fork route for paddlers with experience running Class II rapids.",
      "accessCaveats": [
        "Veterans Park is the practical town-side put-in, while the downstream Highway 73 bridge access is a bridge/gauge-area carry-in rather than a developed park.",
        "The route is remote enough that weather, daylight, and shuttle reliability should be checked before launch.",
        "Some Little Fork portages can be brushy; do not rely on an easy roadside exit between the endpoints."
      ],
      "watchFor": [
        "Multiple rock riffles and Class I-II rapids; scout larger rapids before committing.",
        "Scrapable or too-shallow rapids when the Highway 73/Linden Grove flow falls toward the low band.",
        "Downed trees, sweepers, cold water, and limited quick exits on a long northern route."
      ]
    }
  },
  "little-fork-river-dentaybow-fiedler": {
    "putIn": {
      "name": "Dentaybow Public Water Access Site",
      "latitude": 48.2140198,
      "longitude": -93.4818504
    },
    "takeOut": {
      "name": "Fiedler Public Water Access Site",
      "latitude": 48.2920545,
      "longitude": -93.4416055
    },
    "logistics": {
      "distanceLabel": "13.1 mi",
      "estimatedPaddleTime": "Full day, roughly 5 hr to 7 hr depending on level and scouting",
      "shuttle": "Plan a remote Koochiching County shuttle between the Dentaybow and Fiedler accesses north of Littlefork. Cell coverage, backup riders, and a realistic turnaround plan matter more here than on in-town routes.",
      "permits": "No route-specific paddling permit is known. Follow posted public-water-access rules and any county or state-forest restrictions in the corridor.",
      "camping": "This is one of the cleaner northern camping routes in Minnesota: the DNR map notes dispersed state-forest camping opportunities along the corridor, and Lofgren Park farther downstream on the same map sheet is a city campground if you want to turn the area into a weekend basecamp.",
      "summary": "Launch at Dentaybow and take out at Fiedler for MN DNR's 13.1-mile Little Fork day trip. Expect a remote wooded river with riffles, light rapids, and a direct gauge at the MN 65 bridge upstream of the put-in.",
      "accessCaveats": [
        "Both endpoints are official public-water-access sites, but neither is a town park with built-in services.",
        "The gauge is at the MN 65 bridge upstream of the put-in, so check the reading before driving farther into the route corridor.",
        "State-forest camping exists in the broader corridor, but do not assume every pull-off is legal or practical for overnight use."
      ],
      "watchFor": [
        "Class I to II rapids, rocky riffles, and scout-first drops that get more consequential when the river pushes into the high band.",
        "Cold water, sweepers, and remote shoreline with long stretches between easy exits.",
        "Scraping or boat damage risk when flows fall toward the 350 cfs scrapable floor."
      ]
    }
  },
  "little-fork-river-dentaybow-devereaux": {
    "putIn": {
      "name": "Dentaybow Public Water Access Site",
      "latitude": 48.2140198,
      "longitude": -93.4818504
    },
    "takeOut": {
      "name": "Devereaux Public Water Access Site",
      "latitude": 48.331078,
      "longitude": -93.4851298
    },
    "logistics": {
      "distanceLabel": "20.8 mi",
      "estimatedPaddleTime": "Very long day, roughly 7 hr to 9 hr depending on level and scouting",
      "shuttle": "Plan a remote Koochiching County shuttle between Dentaybow and Devereaux and do not treat the extra mileage like a trivial add-on to the shorter Fiedler split. Backup drivers, daylight, and road-condition margin matter here.",
      "permits": "No route-specific paddling permit is known. Follow posted public-water-access rules and any county or state-forest restrictions in the corridor.",
      "camping": "Treat this as a committed day trip. The DNR map notes state-forest camping opportunities on the broader map sheet, but it does not name a designated campsite between Dentaybow and Devereaux, so this route should not be sold as a camping-filter yes.",
      "summary": "Launch at Dentaybow and take out at Devereaux for a longer continuation on Little Fork Map 2. This combines the upper wooded rapids with a much longer remote commitment before the lower Flat Rock corridor.",
      "accessCaveats": [
        "Both endpoints are official public-water-access sites, but neither is a staffed park or campground finish.",
        "The direct gauge is at the MN 65 bridge just upstream of the put-in, so check the reading before driving farther into the corridor.",
        "Most of the shoreland remains private or undeveloped. Use named accesses and legal public-land camping only."
      ],
      "watchFor": [
        "Class I to II rapids, rocky riffles, and scout-first drops that get more consequential when the river pushes into the high band.",
        "Cold water, sweepers, and fatigue compounding across more than 20 river miles with limited easy exits.",
        "Scraping and more boat damage risk when flows fall toward the 350 cfs scrapable floor."
      ]
    },
    "accessPoints": [
      {
        "id": "fiedler",
        "name": "Fiedler Public Water Access Site",
        "latitude": 48.2920545,
        "longitude": -93.4416055,
        "mileFromStart": 13.1,
        "segmentKind": "creek",
        "note": "Best named mid-route bailout before committing to the final miles toward Devereaux."
      }
    ]
  },
  "little-fork-river-fiedler-devereaux": {
    "putIn": {
      "name": "Fiedler Public Water Access Site",
      "latitude": 48.2920545,
      "longitude": -93.4416055
    },
    "takeOut": {
      "name": "Devereaux Public Water Access Site",
      "latitude": 48.331078,
      "longitude": -93.4851298
    },
    "logistics": {
      "distanceLabel": "7.7 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr depending on level and wood",
      "shuttle": "Use a short but still rural shuttle between the Fiedler and Devereaux accesses north of Littlefork. Check road conditions and leave extra time because both endpoints are quiet forest-edge landings, not town parks.",
      "permits": "No route-specific paddling permit is known. Follow posted public-water-access rules and any state-forest or county restrictions in the corridor.",
      "camping": "Treat this as a remote day trip. The DNR map says state forests on this sheet can allow camping in the broader corridor, but it does not name a designated campsite between Fiedler and Devereaux, so this route should not be treated as a camping-filter yes.",
      "summary": "Launch at Fiedler and take out at Devereaux for a shorter lower-Little-Fork split above Flat Rock Rapids. This is a quieter wooded day than the full run into Littlefork, but it still needs normal northern-river judgment.",
      "accessCaveats": [
        "Both endpoints are official public-water-access sites, but neither is a staffed park or campground finish.",
        "This split stays above Flat Rock Rapids, which makes it cleaner than the lower route, but it is still remote enough that a missed shuttle or bad weather will feel expensive.",
        "Much of the shoreland on this map sheet is private property; stop only at designated sites or legal public-land camping areas."
      ],
      "watchFor": [
        "Storm wood, sweepers, and brushy banks on a narrow wooded river with limited quick exits.",
        "Scraping and slow travel when the Littlefork gauge falls toward the 400 cfs scrapable floor.",
        "Cold water and changing current after rain even though this shortened split avoids the named downstream rapids."
      ]
    }
  },
  "little-fork-river-highway-73-samuelson": {
    "putIn": {
      "name": "Highway 73 bridge carry-in access",
      "latitude": 47.858288,
      "longitude": -92.870024
    },
    "takeOut": {
      "name": "Samuelson Park Public Water Access Site",
      "latitude": 47.9485284,
      "longitude": -93.0992707
    },
    "logistics": {
      "distanceLabel": "22.8 mi",
      "estimatedPaddleTime": "Very long day, roughly 7 hr to 9 hr depending on level and scouting",
      "shuttle": "Stage the take-out at Samuelson Park before driving to the Highway 73 bridge. This is a long rural shuttle with limited services at the put-in, so handle daylight and backup-driver planning conservatively.",
      "permits": "No route-specific paddling permit is known. Follow posted public-water-access, county-park, and bridge-area parking rules.",
      "camping": "Samuelson Park makes this a legitimate endpoint-campground route. DNR Map 1 says the park has a carry-in access, picnic table, toilet, drinking water, and tent sites.",
      "summary": "Launch at the Highway 73 bridge and finish at Samuelson Park for a long Little Fork continuation below the Linden Grove gauge. Expect repeated rapids, remote wooded miles, and a county-park finish with real services.",
      "accessCaveats": [
        "The Highway 73 bridge access is a bridge/gauge-area carry-in rather than a developed park.",
        "Samuelson Park is the intended finish. Do not casually continue toward Silverdale unless you have planned the extra mileage and checked the lower access story.",
        "Most of the route remains remote despite the campground finish, so missed-shuttle or weather problems still feel expensive."
      ],
      "watchFor": [
        "Class I to II rapids, rock riffles, and scout-first drops with brushy or undeveloped portage options.",
        "Scraping and stalled progress when the Silverdale gauge falls toward the 400 cfs floor.",
        "Cold water, wood hazards, and fatigue over a long northern day with few easy exits before Samuelson."
      ]
    }
  },
  "little-fork-river-highway-73-silverdale": {
    "putIn": {
      "name": "Highway 73 bridge carry-in access",
      "latitude": 47.858288,
      "longitude": -92.870024
    },
    "takeOut": {
      "name": "Silverdale Public Water Access Site",
      "latitude": 47.9768919,
      "longitude": -93.1445789
    },
    "logistics": {
      "distanceLabel": "26.9 mi",
      "estimatedPaddleTime": "Full-commitment day, roughly 8 hr to 10 hr depending on level and scouting",
      "shuttle": "Use a conservative two-car shuttle from the Highway 73 bridge to Silverdale and treat the route like a full-day remote commitment. The longer downstream finish means late starts and marginal weather are bad bets.",
      "permits": "No route-specific paddling permit is known. Follow posted public-water-access, bridge-area parking, and county-park rules along the corridor.",
      "camping": "This route has real on-route camping support rather than a campground take-out. DNR Map 1 says Samuelson Park has drinking water and tent sites, which makes it the clearest legal overnight or bailout support before the Silverdale finish.",
      "summary": "Launch at the Highway 73 bridge and continue past Samuelson to finish at Silverdale for one of the longest official Little Fork corridor options currently in the app. This is a remote northern run with repeated rapids and a useful named bailout at Samuelson Park.",
      "accessCaveats": [
        "Samuelson Park is the best intermediate bailout and should be treated as a real decision point, not just a landmark.",
        "Silverdale is a simpler public access finish than Samuelson, so do not expect campground services at the take-out.",
        "Long mileage plus rural roads make the shuttle more consequential than the access names alone suggest."
      ],
      "watchFor": [
        "Class I to II rapids, rocky riffles, and fatigue stacking across nearly 27 river miles.",
        "Scraping, boat-banging, and slower-than-expected travel when the Silverdale gauge is below the 400 cfs floor.",
        "Cold water, sweepers, and route-length commitment in a corridor with limited quick roadside exits."
      ]
    },
    "accessPoints": [
      {
        "id": "samuelson",
        "name": "Samuelson Park Public Water Access Site",
        "latitude": 47.9485284,
        "longitude": -93.0992707,
        "mileFromStart": 22.8,
        "segmentKind": "creek",
        "note": "Best named bailout and only campground-supported stop before the final Silverdale miles."
      }
    ]
  },
  "little-fork-river-samuelson-silverdale": {
    "putIn": {
      "name": "Samuelson Park Public Water Access Site",
      "latitude": 47.9485284,
      "longitude": -93.0992707
    },
    "takeOut": {
      "name": "Silverdale Public Water Access Site",
      "latitude": 47.9768919,
      "longitude": -93.1445789
    },
    "logistics": {
      "distanceLabel": "4.1 mi",
      "estimatedPaddleTime": "About 2 hr to 3.5 hr depending on level, wood, and scouting",
      "shuttle": "Use a short two-car shuttle from Samuelson Park to Silverdale and still check both accesses before launching. The miles are modest, but this is not a casual roadside float when wood or low-water rapids complicate progress.",
      "permits": "No route-specific paddling permit is known. Follow posted public-water-access and county-park rules at Samuelson and Silverdale.",
      "camping": "Samuelson Park gives this route real endpoint-campground support at the put-in. DNR Map 1 says the park has a carry-in access, picnic table, toilet, drinking water, and tent sites.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Samuelson Park and finish at Silverdale for the shortest official Little Fork Map 1 continuation currently in the app. The mileage is approachable, but the route still carries the same rapid-and-wood story as the longer Highway 73 starts.",
      "accessCaveats": [
        "Samuelson Park is the developed endpoint with campground services; Silverdale is a simpler public access finish.",
        "Use only the named public accesses rather than improvised roadside stops or private banks along the wooded corridor.",
        "Short mileage does not remove the need to scout wood or read the ledges carefully when the channel is high or obstructed."
      ],
      "watchFor": [
        "Class I to II rapids, rocky riffles, and wood hazards on a narrow remote northern channel.",
        "Scraping and slower-than-expected progress when the Silverdale gauge is below the 400 cfs floor.",
        "Cold water, brushy banks, and limited quick exits between the named public accesses."
      ]
    }
  },
  "little-fork-river-devereaux-lofgren-park": {
    "putIn": {
      "name": "Devereaux Public Water Access Site",
      "latitude": 48.331078,
      "longitude": -93.4851298
    },
    "takeOut": {
      "name": "Lofgren Park Public Water Access Site",
      "latitude": 48.4002431,
      "longitude": -93.564833
    },
    "logistics": {
      "distanceLabel": "16.1 mi",
      "estimatedPaddleTime": "Long day, roughly 6 hr to 8 hr depending on level and scouting",
      "shuttle": "Stage the take-out at Lofgren Park in Littlefork before driving to Devereaux. The finish is easier to manage because it has campground services, but the put-in remains a remote access with limited backup options.",
      "permits": "No route-specific paddling permit is known. Follow posted public-water-access rules, city campground rules at Lofgren Park, and any state-forest restrictions in the upstream corridor.",
      "camping": "Lofgren Park is a real endpoint-campground finish. The DNR map says it has a city campground, trailer access, toilets, drinking water, picnic shelter, and a camping fee, so this route can honestly finish into a legal overnight base.",
      "summary": "Launch at Devereaux and finish at Lofgren Park for a longer lower-Little-Fork route into town. This route combines remote wooded miles with Flat Rock Rapids and the rapids around Highway 217 near the finish.",
      "accessCaveats": [
        "The route starts remote and finishes in a city park, so treat the shuttle like two different worlds rather than assume town support exists upstream.",
        "Lofgren Park is the intended finish. Do not continue toward the Rainy River unless you have separately checked the remaining lower-river access story.",
        "Riverbed camping next to private property is not permitted on this map sheet, even if a gravel stop looks tempting late in the day."
      ],
      "watchFor": [
        "Flat Rock Rapids at river mile 29.8, marked as Class II with no developed portage on the DNR map.",
        "Rapids above and below Highway 217 near Littlefork, where high water shortens recovery windows.",
        "Scraping, stalled progress, and more boat-banging than expected when the Littlefork gauge is below the 400 cfs floor."
      ]
    }
  },
  "little-fork-river-fiedler-lofgren-park": {
    "putIn": {
      "name": "Fiedler Public Water Access Site",
      "latitude": 48.2920545,
      "longitude": -93.4416055
    },
    "takeOut": {
      "name": "Lofgren Park Public Water Access Site",
      "latitude": 48.4002431,
      "longitude": -93.564833
    },
    "logistics": {
      "distanceLabel": "23.8 mi",
      "estimatedPaddleTime": "Very long day, roughly 8 hr to 10 hr depending on level and scouting",
      "shuttle": "Stage the take-out at Lofgren Park before driving to Fiedler, and do not treat the long mileage like a casual add-on to the shorter split. This is a full-commitment northern shuttle with a safer in-town finish.",
      "permits": "No route-specific paddling permit is known. Follow posted public-water-access rules and Littlefork city campground rules at the take-out.",
      "camping": "Lofgren Park makes this a clean endpoint-campground route. The finish has campground support, but the route itself should still be planned as a long single-day paddle unless you have separately verified legal public-land camping in the corridor.",
      "summary": "Launch at Fiedler and finish at Lofgren Park for the full downstream continuation on Little Fork Map 2. This combines the quieter upper half with the Flat Rock and Highway 217 rapids on the way into Littlefork.",
      "accessCaveats": [
        "Devereaux is the clearest intermediate bailout if the long day is slipping, and should be treated as a real contingency plan rather than a theoretical midpoint.",
        "Most of the shoreland remains private or undeveloped. Use named accesses and designated campsites only.",
        "This route ends with better services than most northern river runs, but those services do not reduce the seriousness of the long upstream commitment."
      ],
      "watchFor": [
        "Storm wood, cold water, and wind or fatigue compounding across nearly 24 river miles.",
        "Flat Rock Rapids plus the lower rapids around Highway 217 near the finish.",
        "Very slow scraping travel when the Littlefork gauge is below the 400 cfs floor."
      ]
    },
    "accessPoints": [
      {
        "id": "devereaux",
        "name": "Devereaux Public Water Access Site",
        "latitude": 48.331078,
        "longitude": -93.4851298,
        "mileFromStart": 7.7,
        "segmentKind": "creek",
        "note": "Best named bailout and route-shortening point on the full downstream continuation."
      }
    ]
  },
  "red-lake-river-smiley-bridge-centennial-park": {
    "putIn": {
      "name": "Smiley Bridge public water access",
      "latitude": 48.077331,
      "longitude": -96.034388
    },
    "takeOut": {
      "name": "Centennial Park / Highway 1 trailer access",
      "latitude": 48.124,
      "longitude": -96.168056
    },
    "logistics": {
      "distanceLabel": "12.3 mi",
      "estimatedPaddleTime": "About 4 hr to 5.5 hr",
      "shuttle": "Use a straightforward Thief River Falls-area shuttle from Smiley Bridge to Centennial Park. Stage the take-out at Centennial Park before launching from the quieter upstream bridge access.",
      "permits": "No route-specific paddling permit is known. Follow posted public-water-access and city park rules at Smiley Bridge and Centennial Park.",
      "camping": "Treat this as a day trip. Centennial Park has park amenities, but no on-route overnight plan is assumed.",
      "summary": "Put in at Smiley Bridge and take out at Centennial Park for MN DNR's 12.3-mile beginner-friendly Red Lake River trip into Thief River Falls.",
      "accessCaveats": [
        "Smiley Bridge is a public access at County Road 7, while Centennial Park is a trailer access at Highway 1 with city-park amenities.",
        "The route ends near Thief River Falls; know downstream dam and access locations before continuing past Centennial Park.",
        "Upstream Red Lake Reservation waters have separate restrictions; this route starts downstream at Smiley Bridge."
      ],
      "watchFor": [
        "Several dams exist elsewhere on the Red Lake River; stay with the planned Centennial Park take-out.",
        "Higher water can increase current and debris even on this generally gentle segment.",
        "Wind exposure on open farmland bends and low grassy banks."
      ]
    }
  },
  "red-lake-river-sportsmans-huot": {
    "putIn": {
      "name": "Sportsman's Park trailer access",
      "latitude": 47.8939989,
      "longitude": -96.2820976
    },
    "takeOut": {
      "name": "Huot Park trailer access",
      "latitude": 47.8610626,
      "longitude": -96.4249999
    },
    "logistics": {
      "distanceLabel": "13.5 mi",
      "estimatedPaddleTime": "About 4.5 hr to 6 hr",
      "shuttle": "Use a Red Lake Falls-area shuttle from Sportsman's Park to Huot Park. Camping at the put-in makes it practical to stage vehicles the night before and launch early.",
      "permits": "No route-specific paddling permit is known. Follow posted public-access, campground, and county-park rules at Sportsman's Park and Huot Park.",
      "camping": "Sportsman's Park is a real perk here: the DNR map says the put-in has campsites and drinking water. That makes this route easier to turn into a camp-and-paddle weekend than most Minnesota day trips in the app.",
      "summary": "Put in at Sportsman's Park and take out at Huot Park for MN DNR's 13.5-mile Red Lake River trip. The corridor is generally manageable, but paddlers should be comfortable maneuvering around boulders and riffles.",
      "accessCaveats": [
        "Sportsman's Park sits at the Red Lake Falls confluence area and is better treated as a developed campground/access complex than a minimalist bridge landing.",
        "Huot Park is the planned finish. Do not continue farther downstream unless you have separately checked dam locations and exit options.",
        "This route shares a watershed with Red Lake Reservation upstream, but this specific trip starts downstream in public access water-trail country."
      ],
      "watchFor": [
        "Boulder-bed riffles and rapids that become scrapy near the 5 ft floor.",
        "Debris, outside-bend wood, and faster recovery windows after storms or when the gauge moves into the high band.",
        "Downstream dam awareness if anyone in the group wants to paddle past Huot Park."
      ]
    }
  },
  "chippewa-river-lentz-watson-lions-park": {
    "putIn": {
      "name": "Lentz Landing Public Water Access Site",
      "latitude": 45.107814,
      "longitude": -95.7987081
    },
    "takeOut": {
      "name": "Watson Lions Park / Watson Sag Dam Public Water Access Site",
      "latitude": 45.0234918,
      "longitude": -95.7902702
    },
    "logistics": {
      "distanceLabel": "8.4 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr",
      "shuttle": "Set a short Watson-area shuttle between Lentz Landing and the Watson Lions Park access. The route is manageable as a half-day or relaxed full-day outing if you leave time for wind and lunch stops.",
      "permits": "No route-specific paddling permit is known. Follow posted public-water-access and city-park rules at Lentz Landing and Watson.",
      "camping": "Nearby Watson camping is better than average for a short prairie route. MN DNR points paddlers to Watson Lions Park and Lagoon Park, where fee camping and toilets make a simple overnight or shuttle base practical.",
      "summary": "Launch at Lentz Landing and take out in Watson for MN DNR's 8.4-mile Chippewa River day trip. This is one of the cleaner family-friendly west-central Minnesota additions because the route now has direct official gauges at both ends of the corridor.",
      "accessCaveats": [
        "The take-out is best treated as the Watson Lions Park / Watson Sag public-access area, since the DNR route naming and the public-water-access GIS use slightly different labels for the same downstream finish zone.",
        "The river is broader and more wind-exposed than a wooded creek float, so a breezy day can feel slower than the mileage suggests.",
        "Gauge support is unusually strong for this route family now that the Watson and Milan MN DNR sites are confirmed on the corridor."
      ],
      "watchFor": [
        "Scattered boulders, occasional Class I riffles, and bridge-pier current shifts even though this is mostly a flatwater day.",
        "Dragging and channel-picking when the Watson gauge falls toward the 200 cfs floor.",
        "Wind exposure across open grassland bends and limited shade on hot afternoons."
      ]
    }
  },
  "otter-tail-river-wannigan-riverside": {
    "putIn": {
      "name": "Wannigan Road carry-in access",
      "latitude": 46.7847573,
      "longitude": -95.6962111
    },
    "takeOut": {
      "name": "Riverside Park carry-in access",
      "latitude": 46.7256798,
      "longitude": -95.696997
    },
    "logistics": {
      "distanceLabel": "8.4 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr depending on level and channel-finding",
      "shuttle": "Use a short two-car shuttle between Wannigan Road north of Frazee and Riverside Park in Frazee. Both endpoints are official public-water-access records, but parking is limited.",
      "permits": "No route-specific paddling permit is known. Follow posted public-access and city park rules at Wannigan Road and Riverside Park.",
      "camping": "No established watercraft campsite is documented for this short day trip. Plan it as a day paddle.",
      "summary": "Launch at Wannigan Road and take out at Riverside Park in Frazee. MN DNR recommends this as an 8.4-mile scenic, slow-flowing trip with little development, best when late spring water keeps enough flow in the main channel.",
      "accessCaveats": [
        "Wannigan Road is an official DNR-administered carry-in access, but the access record does not show a developed parking lot or restroom.",
        "Riverside Park is a City of Frazee access with a small parking lot and no restroom listed in the public-access record.",
        "The public-access record places Riverside Park at river mile 145.0, while the DNR route page lists the take-out at river mile 144.5; use the named access and coordinates for navigation."
      ],
      "watchFor": [
        "Shallow main-channel picking or walking when levels are low.",
        "Old bridge remnants, rock weirs, and faster moving water as you approach Riverside Park.",
        "A low utility pipe just past the take-out, plus the broader Otter Tail hazards of culverts, bridge obstructions, and possible dams under bridges."
      ]
    }
  },
  "cannon-river-welch": {
    "putIn": {
      "name": "Riverside Park canoe launch (Cannon Falls)",
      "latitude": 44.5148835,
      "longitude": -92.8990298
    },
    "takeOut": {
      "name": "Welch Mill Canoeing, Tubing & Kayaking (Welch)",
      "latitude": 44.5679337,
      "longitude": -92.7385579
    },
    "logistics": {
      "distanceLabel": "11.75 mi",
      "estimatedPaddleTime": "About 4 hr to 5 hr 15 min",
      "shuttle": "MilesPaddled describes a bike shuttle using the Cannon Valley Trail. Car shuttle is simplest.",
      "permits": "No state water-trail permit required. Confirm local parking rules and any Welch Mill landing fee before you go.",
      "camping": "No established camping documented for this segment.",
      "summary": "Put in at Riverside Park in Cannon Falls and take out at Welch Mill. Confirm access rules and any fees at both endpoints before staging a shuttle.",
      "accessCaveats": [
        "Riverside Park has an official canoe launch, but local parking or day-use rules can still change.",
        "Welch Mill is a private take-out. Confirm landing rules and any take-out fee before leaving a vehicle there."
      ],
      "watchFor": [
        "Wood or debris after storms, especially on outside bends and blind corners.",
        "Heavy tuber traffic in summer can slow the day and complicate landing space.",
        "Cold-water risk outside summer."
      ]
    }
  },
  "straight-river-faribault": {
    "putIn": {
      "name": "Krogh's Landing",
      "latitude": 44.24285,
      "longitude": -93.24006
    },
    "takeOut": {
      "name": "Two Rivers Landing/Park (Faribault)",
      "latitude": 44.31065,
      "longitude": -93.27092
    },
    "logistics": {
      "distanceLabel": "10 mi",
      "estimatedPaddleTime": "About 3 hr 15 min to 4 hr 30 min",
      "shuttle": "Car shuttle is straightforward. A bike shuttle may be possible using the Straight River Trail for part of the route.",
      "permits": "No special paddling permit noted. Follow posted rules at each access.",
      "camping": "Treat this as a day trip unless you have independently confirmed legal camping.",
      "summary": "Put in at Krogh's Landing and take out at Two Rivers Landing/Park in Faribault. Use the Faribault gauge as a starting point, but verify access and parking locally.",
      "accessCaveats": [
        "The DNR map does explicitly name Krogh's Landing as a carry-in access, but it still lacks a clean standalone parking page, so verify conditions locally.",
        "Two Rivers Park is city-managed and the official Faribault park amenities sheet marks it with public access and a canoe landing, but park rules and parking details should still be checked on arrival."
      ],
      "watchFor": [
        "Shallow riffles and scrape risk when the river is low.",
        "Downed trees and snags on blind corners.",
        "Cold-water risk outside midsummer."
      ]
    }
  },
  "root-river-lanesboro-peterson": {
    "putIn": {
      "name": "Highway 16 / Lanesboro access",
      "latitude": 43.7368,
      "longitude": -91.9468
    },
    "takeOut": {
      "name": "Highway 16 / Peterson access",
      "latitude": 43.78648,
      "longitude": -91.82735
    },
    "logistics": {
      "distanceLabel": "13.5 mi",
      "estimatedPaddleTime": "About 4 hr 30 min to 6 hr 15 min",
      "shuttle": "Bike shuttle on the Root River State Trail is a strong option. Two-car shuttle on local roads is straightforward if you want a simpler setup.",
      "permits": "No special paddling permit is known for this state water-trail day trip. Confirm any local parking rules at both Hwy 16 accesses.",
      "camping": "Official trail-town guidance says both Lanesboro and Peterson offer campground support, so this can work as either a straight day trip or a lower-friction overnight base.",
      "summary": "Put in at the Hwy 16 access in Lanesboro and take out at the Hwy 16 access in Peterson. This is one of the cleaner Root River shuttle days, but low-water riffles and changing access details still deserve a same-day check.",
      "accessCaveats": [
        "Both endpoints are supported by MN DNR public water access records, and trail-town guidance adds parking and restroom support in both Lanesboro and Peterson, but same-day signage still deserves a check.",
        "Do not assume every roadside pull-off near the bridge is valid long-term parking without checking signage."
      ],
      "watchFor": [
        "Shallow riffles and scrape risk when the gauge is near the low end.",
        "Fresh wood or strainers after rain, especially on blind bends.",
        "Cold-water exposure outside midsummer, even on an easy-current day."
      ]
    }
  },
  "root-river-rushford-houston": {
    "putIn": {
      "name": "Rushford carry-in access (Historic Depot area)",
      "latitude": 43.78358,
      "longitude": -91.83403
    },
    "takeOut": {
      "name": "Houston carry-in access (Houston Nature Center area)",
      "latitude": 43.7645,
      "longitude": -91.57037
    },
    "logistics": {
      "distanceLabel": "15.1 mi",
      "estimatedPaddleTime": "About 5 hr to 6 hr 45 min",
      "shuttle": "Two-car shuttle is simplest. A bike shuttle on the Root River State Trail is realistic if your group wants it, with parking guidance at the Rushford Historic Depot and Houston Nature Center lots.",
      "permits": "No route-specific paddling permit is known. State-trail use is straightforward for walking or biking the shuttle, but still follow posted local parking and trail rules.",
      "camping": "Houston Nature Center / Trailhead Park offers tent camping and hot showers, and official trail-town guidance also points to campground support in both Rushford and Houston. Otherwise treat this as a long day trip.",
      "summary": "Launch at the Rushford carry-in and finish at the Houston carry-in near the Houston Nature Center. The route is friendly at workable flow, but it is long enough that low-water slowdowns and fresh wood can change the day substantially.",
      "accessCaveats": [
        "The best-known parking is at the Rushford Historic Depot lot and the Houston Nature Center lot, so expect a short walk or carry rather than a pure drive-to-water launch at both ends.",
        "Houston Nature Center confirms ample parking at the trailhead, but still check local event activity before counting on the lot feeling empty.",
        "Look at the Houston exit before launching if you have not used it before, because town-side trail and parking landmarks are easier to recognize from shore than from mid-river."
      ],
      "watchFor": [
        "Low-water riffles and slower progress when the Houston gauge is near the floor.",
        "Fresh sweepers, strainers, or debris after rain.",
        "Long-mileage fatigue and cold-water exposure outside midsummer."
      ]
    }
  },
  "root-river-houston-mound-prairie": {
    "putIn": {
      "name": "Root River, Houston Public Water Access Site",
      "latitude": 43.769008,
      "longitude": -91.571222
    },
    "takeOut": {
      "name": "Root River, Mound Prairie Public Water Access Site",
      "latitude": 43.781541,
      "longitude": -91.446585
    },
    "logistics": {
      "distanceLabel": "6.7 mi",
      "estimatedPaddleTime": "About 2 hr 15 min to 3 hr 30 min",
      "shuttle": "Simple two-car shuttle east of Houston. Stage the take-out at Mound Prairie first and check the ramp/parking area because the DNR gauge is effectively at the finish.",
      "permits": "No route-specific paddling permit is known. Follow posted DNR public-access rules at Houston and Mound Prairie and any wildlife-management-area restrictions near the lower endpoint.",
      "camping": "No on-route campsite is assumed. Houston-area camping and trail-town lodging can support a base-camp trip, but this segment should be planned as a day route.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch from the Houston public access and finish at Mound Prairie for a lower Root day with the interpreted DNR gauge at the take-out. Expect riffles, private banks, and rainfall-sensitive Driftless conditions.",
      "accessCaveats": [
        "Houston and Mound Prairie are official Minnesota public-water-access sites with parking in the public-access record, but neither record lists a restroom.",
        "This exact segment is official-map supported rather than a highlighted DNR recommended day trip, so confirm the take-out and shuttle plan before launching.",
        "Do not extend downstream toward the Mississippi or stop on private banks without a separate legal access plan."
      ],
      "watchFor": [
        "Shallow riffles and scraping as the Mound Prairie gauge falls toward the low band.",
        "Fresh wood and fast current after bluff-country rain.",
        "Cold-water exposure outside midsummer and private shoreland throughout the short lower segment."
      ]
    }
  },
  "root-river-parsley-moens": {
    "putIn": {
      "name": "Parsley Bridge carry-in access",
      "latitude": 43.81641,
      "longitude": -92.13924
    },
    "takeOut": {
      "name": "Moen's Bridge carry-in access",
      "latitude": 43.78218,
      "longitude": -92.03188
    },
    "logistics": {
      "distanceLabel": "13.25 mi",
      "estimatedPaddleTime": "About 4 hr 30 min to 6 hr",
      "shuttle": "Two-car shuttle is simplest. The road shuttle is around 10 miles on hillier Driftless roads, so it is less bike-friendly than the lower Root corridor.",
      "permits": "No route-specific paddling permit is known. Follow posted bridge-access and parking rules at both carry-in points.",
      "camping": "DNR-mapped campsites along the Root River corridor, including Pilot Mound on this stretch, make this overnight-capable if you intentionally plan campsite availability and rules; most paddlers will still treat it as a full scenic day trip.",
      "summary": "Launch at Parsley Bridge and finish at Moen's Bridge for an upper-North-Branch Root day with riffles, bluffs, and a more secluded feel than the bigger lower Root routes.",
      "accessCaveats": [
        "Both endpoints are bridge carry-ins rather than polished ramp launches, so expect a short carry and verify where parking is actually acceptable before unloading boats.",
        "Moen's Bridge is the cleaner endpoint and the DNR map notes a toilet facility there, but it is still best to look at the take-out before launching.",
        "Do not assume shoulder parking at Parsley is generous or obvious without checking the site in person."
      ],
      "watchFor": [
        "Shallow riffles and scrape risk when Pilot Mound is near the floor.",
        "Fresh wood or sweepers on blind bends after rain.",
        "Longer shuttle friction and cold-water exposure outside midsummer."
      ]
    }
  },
  "root-river-moens-whalan": {
    "putIn": {
      "name": "Moen's Bridge carry-in access",
      "latitude": 43.782576,
      "longitude": -92.0317899
    },
    "takeOut": {
      "name": "Whalan carry-in access",
      "latitude": 43.7558,
      "longitude": -91.9179
    },
    "logistics": {
      "distanceLabel": "15.8 mi",
      "estimatedPaddleTime": "About 5 hr 15 min to 7 hr 15 min",
      "shuttle": "Two-car shuttle is simplest. A bike shuttle is more realistic here than on the upper Chatfield reach because the Root River State Trail and local roads help, but it is still a real full-day setup.",
      "permits": "No route-specific paddling permit is known. Follow posted parking and access rules at Moen's Bridge and in Whalan.",
      "camping": "DNR-mapped campsites along the Root River corridor, including Power Plant on this reach, make this overnight-capable if you intentionally plan campsite availability and rules; otherwise treat it as a long day trip.",
      "summary": "Put in at Moen's Bridge and take out at Whalan for one of the cleaner long Root River shuttles: scenic bluff country, approachable current, and enough mileage that low water or fresh debris can still change the day substantially.",
      "accessCaveats": [
        "Moen's Bridge is a carry-in access, not a drive-to-water ramp, so expect a short carry and verify parking before unloading.",
        "The DNR Root map says Whalan parking is 500 feet from the carry-in access, and state-trail guidance says town parking is on city streets, so settle the vehicle plan before you launch.",
        "Look at the Whalan finish before launching if you have not used it before, because the take-out is easy to treat like a casual town stop when it is really a specific carry-in access."
      ],
      "watchFor": [
        "Shallow riffles and slower pace when Lanesboro is near the floor.",
        "Old bridge debris near Whalan and fresh wood after storms.",
        "Long-mileage fatigue on a route that stays easy but not short."
      ]
    }
  },
  "st-croix-river-interstate-osceola": {
    "putIn": {
      "name": "Minnesota Interstate State Park landing",
      "latitude": 45.401,
      "longitude": -92.651
    },
    "takeOut": {
      "name": "Osceola Landing",
      "latitude": 45.31996700000001,
      "longitude": -92.71514719999999
    },
    "logistics": {
      "distanceLabel": "6.6 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr",
      "shuttle": "Straightforward two-car shuttle between Taylors Falls and Osceola. Stage the take-out first if you want the easiest finish, especially on summer weekends when Osceola can be busier.",
      "permits": "No route-specific paddling permit is known, but a Minnesota state park vehicle permit is required for the Interstate landing and Riverway rules still govern camping and shoreline use.",
      "camping": "Designated riverside campsites are possible only under St. Croix National Scenic Riverway rules, and a camping permit is required below Highway 8. Do not assume the landings themselves are overnight staging sites.",
      "summary": "Launch from the Minnesota Interstate landing in Taylors Falls and finish at Osceola Landing for the cleanest lower St. Croix day-trip add. This is the classic easy gorge-to-bluff run, but lower water pushes you toward the main channel and away from side slough exploring.",
      "accessCaveats": [
        "Minnesota Interstate State Park is open 8 a.m. to 10 p.m. daily and requires a vehicle permit; same-day ranger-station, kiosk, or traffic conditions still win over any saved note.",
        "Osceola is a high-use Riverway landing with separate motorized and nonmotorized launch flow, paved parking, restrooms, and drinking water, but it can still feel busy on hot weekends."
      ],
      "watchFor": [
        "Sandbars and side-slough dead ends when flow at St. Croix Falls falls below about 3,000 cfs.",
        "Strainers, wingdams, rocks, and submerged logs even though the route has no rapids.",
        "Motorboats, anglers, and wake exposure on the broader lower-river stretches."
      ]
    }
  },
  "st-croix-river-osceola-william-obrien": {
    "putIn": {
      "name": "Osceola Landing",
      "latitude": 45.31996700000001,
      "longitude": -92.71514719999999
    },
    "takeOut": {
      "name": "William O'Brien State Park landing",
      "latitude": 45.2181259,
      "longitude": -92.7806336
    },
    "logistics": {
      "distanceLabel": "8.8 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr 30 min",
      "shuttle": "Standard lower-river car shuttle. Stage the take-out at William O'Brien before launching because the landing status can change with water and sediment conditions.",
      "permits": "No special paddling permit is known for a day run, but Riverway rules still apply and a Minnesota state park vehicle permit can matter at William O'Brien.",
      "camping": "Treat this as a day trip unless you separately verify a legal Riverway or park camping plan. William O'Brien State Park is a nearby campground/base-camp option, but the lower St. Croix has real overnight rules that are not simple enough to infer from the landing names alone.",
      "summary": "Put in at Osceola and finish at William O'Brien for a broad lower St. Croix float that feels simpler than the Dalles but still asks for wind and motorboat judgment. The big operational check is whether the William O'Brien take-out is usable that day.",
      "accessCaveats": [
        "William O'Brien's river landing is a legitimate public take-out, but DNR has said it is open as water levels allow through 2026. Check same-day park updates before you commit.",
        "William O'Brien also rents canoes and kayaks and gives weekend shuttle information in season, which is useful backup logistics but also a sign that the landing area may be busier than a quiet roadside take-out.",
        "Osceola is better documented than many lower-river launches, but it is still a busy shared-use landing rather than a quiet paddle-only access."
      ],
      "watchFor": [
        "Wind and wake exposure on the wider lower-river stretches.",
        "Shallow bars and slower side-channel options if the upstream gauge slips toward the 2,500 cfs floor.",
        "Finding the William O'Brien side-channel take-out cleanly if you have not used it before.",
        "A changed or limited take-out setup at William O'Brien after low water, sediment movement, or maintenance."
      ]
    }
  },
  "rum-river-martins-north-county-park": {
    "putIn": {
      "name": "Martin's Landing trailer access",
      "latitude": 45.488325,
      "longitude": -93.266746
    },
    "takeOut": {
      "name": "Rum River North County Park access",
      "latitude": 45.394587,
      "longitude": -93.353557
    },
    "logistics": {
      "distanceLabel": "10.9 mi",
      "estimatedPaddleTime": "About 3 hr 45 min to 5 hr",
      "shuttle": "Standard two-car shuttle. Confirm parking rules at Martin's Landing and at Rum River North County Park before leaving vehicles.",
      "permits": "No route-specific paddling permit is known. Follow posted access, parking, and boating rules at both public landings.",
      "camping": "No route camping is indicated for this day trip. Corridor camping rules vary by ownership and are not simple enough to assume from the landings alone.",
      "summary": "Put in at Martin's Landing and take out at Rum River North County Park. This is a straightforward scenic shuttle day when the St. Francis gauge is comfortably above scrape level.",
      "accessCaveats": [
        "The take-out is a county park, so local park hours or parking rules can matter more than on a roadside access.",
        "Do not assume flood-stage debris cleanup has already happened after recent storms just because the route is usually easy."
      ],
      "watchFor": [
        "Low-water scraping and slower pace when the gauge falls toward the 600 cfs floor.",
        "Fresh strainers and debris after heavy rain or spring runoff.",
        "Cold-water exposure outside midsummer, even on a mellow current day."
      ]
    }
  },
  "rum-river-north-county-central": {
    "putIn": {
      "name": "Rum River North County Park access",
      "latitude": 45.394587,
      "longitude": -93.353557
    },
    "takeOut": {
      "name": "Rum River Central Regional Park access",
      "latitude": 45.2961635,
      "longitude": -93.3860982
    },
    "logistics": {
      "distanceLabel": "9.4 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr 30 min",
      "shuttle": "Standard two-car shuttle is simplest. Both ends are managed county parks, so confirm vehicle-entry and parking expectations before leaving cars.",
      "permits": "No route-specific paddling permit is known. Follow posted county park, access, and boating rules at both landings.",
      "camping": "Watercraft campsites exist at both North County Park and Central Regional Park, so this corridor can support a short overnight plan if you intentionally reserve around current rules; many paddlers will still treat it as a half-day or relaxed day trip.",
      "summary": "Launch at Rum River North County Park and finish at Rum River Central Regional Park for a shorter lower-Rum county-corridor day. The official St. Francis gauge sits right on this corridor, so the level call is cleaner than on many metro-adjacent rivers.",
      "accessCaveats": [
        "Both endpoints are managed county parks, so park hours, parking rules, and seasonal vehicle-permit expectations deserve a same-day check.",
        "Do not assume low-hazard character means zero cleanup issues; flood debris and fresh wood can still change the route after storms."
      ],
      "watchFor": [
        "Low-water scraping when the gauge falls toward the 600 cfs floor.",
        "Fresh strainers or snags after heavy rain or spring runoff.",
        "Cold-water exposure outside midsummer even on an otherwise easy-feeling river day."
      ]
    }
  },
  "rum-river-north-county-germanium": {
    "putIn": {
      "name": "Rum River North County Park access",
      "latitude": 45.394587,
      "longitude": -93.353557
    },
    "takeOut": {
      "name": "Germanium carry-in access at Brookview Park",
      "latitude": 45.2826032,
      "longitude": -93.4079762
    },
    "logistics": {
      "distanceLabel": "14.2 mi",
      "estimatedPaddleTime": "About 4 hr 45 min to 6 hr 30 min",
      "shuttle": "Standard two-car shuttle is the realistic plan. The route is long enough that daylight, pace, and wind deserve more thought than on the shorter county-park option.",
      "permits": "No route-specific paddling permit is known. Follow posted county-park and city-park access, parking, and boating rules at both endpoints.",
      "camping": "This corridor passes official watercraft campsites at North County Park and Rum River Central Regional Park, but the Germanium finish is a simple city-park carry-in rather than an overnight endpoint. Treat camping as a separate plan, not as part of the normal day shuttle.",
      "summary": "Put in at Rum River North County Park and take out at the Germanium / Brookview Park access in Ramsey for a fuller lower-Rum day. This keeps the official St. Francis gauge in the route story while extending the mileage well past the casual park-to-park float.",
      "accessCaveats": [
        "The Ramsey finish is a city-park carry-in access, not a large trailer-ramp complex, so confirm the landing and parking layout before launching.",
        "Because the route is longer than it first looks on the map, low water or debris can turn a casual plan into a slower all-day effort."
      ],
      "watchFor": [
        "Long-day fatigue on a route that remains easy but not short.",
        "Downed trees, snags, or debris after storms.",
        "Slow progress or occasional dragging when the gauge is near the low-water floor."
      ]
    }
  },
  "rum-river-germanium-south-county-park": {
    "putIn": {
      "name": "Germanium carry-in access at Brookview Park",
      "latitude": 45.2826032,
      "longitude": -93.4079762
    },
    "takeOut": {
      "name": "Rum River South County Park access",
      "latitude": 45.2121606,
      "longitude": -93.3907042
    },
    "logistics": {
      "distanceLabel": "7.1 mi",
      "estimatedPaddleTime": "About 2 hr 30 min to 3 hr 30 min",
      "shuttle": "Standard two-car shuttle is simplest. The finish is straightforward if you know South County Park, but it is worth looking at before launching because the dam lies farther downstream in Anoka.",
      "permits": "No route-specific paddling permit is known. Follow posted city-park and county-park access, parking, and boating rules at both public landings.",
      "camping": "No simple route camping plan is indicated for this lower corridor. Treat it as a day trip and do not assume camping is available at the South County finish.",
      "summary": "Launch at the Germanium / Brookview Park access and finish at Rum River South County Park for a shorter lower-Rum continuation above the Anoka dam. The live level check comes from the upstream St. Francis gauge, so stay conservative when that proxy is near scrape territory.",
      "accessCaveats": [
        "South County Park has posted park hours, so settle the vehicle plan before launching if your day could run late.",
        "South County Park is the required take-out for this route. Identify the landing before launch and do not drift past it toward the Rum River dam corridor.",
        "Do not over-read the St. Francis gauge. It is a useful same-river proxy, but it is still upstream of this lower route."
      ],
      "watchFor": [
        "Missing the South County take-out and carrying on toward the downstream dam corridor.",
        "Low-water dragging or slow current when the proxy gauge is near the floor.",
        "Fresh debris or strainers after storms, especially along lower banks and bends."
      ]
    }
  },
  "rum-river-walbo-cambridge-west": {
    "putIn": {
      "name": "Walbo carry-in access",
      "latitude": 45.579123,
      "longitude": -93.322856
    },
    "takeOut": {
      "name": "Cambridge West Park carry-in access",
      "latitude": 45.572343,
      "longitude": -93.235711
    },
    "logistics": {
      "distanceLabel": "15.8 mi",
      "estimatedPaddleTime": "About 5 hr 15 min to 7 hr 15 min",
      "shuttle": "Standard two-car shuttle is simplest. The route can also be shortened at Highway 14 if your group wants a shorter day.",
      "permits": "No route-specific paddling permit is known. Follow posted access, park, and parking rules at Walbo and Cambridge West Park.",
      "camping": "Watercraft campsites are listed along this reach, including Dayton, High Meadows, and Cambridge West Park. Treat overnight use as separate trip planning and confirm current rules before relying on it.",
      "summary": "Put in at Walbo and take out at Cambridge West Park for a long but friendly middle-Rum day. This is one of the cleaner beginner/intermediate river shuttles in central Minnesota when the downstream proxy gauge is clearly above scrape territory.",
      "accessCaveats": [
        "Cambridge West Park is a managed park endpoint, and the official Cambridge park map shows a 5 a.m. to 10 p.m. park-hours window, so plan vehicle timing accordingly.",
        "Becklin Homestead WMA / County Park can work as a mid-route stop or alternate logistics point, but seasonal managed-hunt restrictions still deserve a same-day check.",
        "Do not over-read the St. Francis gauge. It is a useful same-river proxy, but it is still downstream of this reach rather than on it."
      ],
      "watchFor": [
        "Downed trees, snags, and occasional log jams after storms.",
        "Low-water dragging or slower pace when the proxy gauge is near the floor.",
        "Long-day fatigue on a route that looks mellow on paper but still covers nearly 16 river miles."
      ]
    }
  },
  "sauk-river-eagle-miller-landing": {
    "putIn": {
      "name": "Eagle Park carry-in access",
      "latitude": 45.4754595,
      "longitude": -94.3502588
    },
    "takeOut": {
      "name": "Miller Landing carry-in access",
      "latitude": 45.5517091,
      "longitude": -94.2647146
    },
    "logistics": {
      "distanceLabel": "8.6 mi",
      "estimatedPaddleTime": "About 2 hr 45 min to 4 hr",
      "shuttle": "Standard self-shuttle works best. Miller Landing has posted county-park hours, so confirm you can leave and retrieve vehicles inside that window.",
      "permits": "No special paddling permit is known for this Minnesota DNR day trip. Follow posted local rules at Eagle Park and Miller Landing.",
      "camping": "Treat this as a day trip unless you separately confirm legal overnight options away from the landing parks.",
      "summary": "Use Eagle Park in Rockville as the put-in and Miller Landing in Waite Park as the take-out. This is a clean lower-Sauk shuttle when the gauge is not stuck in the late-summer low band.",
      "accessCaveats": [
        "Miller Landing is a managed county park with posted hours and local rules that still deserve a same-day check.",
        "Low water and summer vegetation can make an easy route feel much longer and less fun than the score alone suggests."
      ],
      "watchFor": [
        "Shallow stretches and thick vegetation when the gauge slides toward 14 ft.",
        "Storm debris and strainers after recent rain.",
        "Cold-water risk outside midsummer, even on an otherwise easy route."
      ]
    }
  },
  "sauk-river-eagle-knights-of-columbus": {
    "putIn": {
      "name": "Eagle Park carry-in access",
      "latitude": 45.4754595,
      "longitude": -94.3502588
    },
    "takeOut": {
      "name": "Knights of Columbus Park carry-in access",
      "latitude": 45.5670560130672,
      "longitude": -94.2286380074072
    },
    "logistics": {
      "distanceLabel": "11.7 mi",
      "estimatedPaddleTime": "About 3 hr 45 min to 5 hr 30 min",
      "shuttle": "Standard Rockville-to-St. Cloud self-shuttle. Leave the take-out vehicle at Knights of Columbus Park so the longer drive happens before the paddle, not after it.",
      "permits": "No special paddling permit is known for this Minnesota DNR water-trail segment. Follow posted city and county access rules.",
      "camping": "Treat this as a day trip. Rockville County Park is nearby staging support, but this exact Eagle-to-Knights route does not need an overnight plan.",
      "summary": "Launch at Eagle Park in Rockville and finish at Knights of Columbus Park in St. Cloud. This is the medium lower-Sauk card for paddlers who want a fuller day than Eagle-to-Miller without adding the Heims rapid finish.",
      "accessCaveats": [
        "Eagle Park is a popular local launch and fishing area, so scout the exact landing and parking flow before leaving vehicles.",
        "Knights of Columbus Park is a defined city endpoint, but it is still worth identifying the exact carry-out path before launching if you have not used it before."
      ],
      "watchFor": [
        "Vegetation and slower current when the St. Martin gauge slides toward 14 ft.",
        "Fresh wood and strainers after storms in this tree-lined lower corridor.",
        "Longer-day fatigue and changing weather on an otherwise easy river."
      ]
    }
  },
  "sauk-river-eagle-heims-mill": {
    "putIn": {
      "name": "Eagle Park carry-in access",
      "latitude": 45.4754595,
      "longitude": -94.3502588
    },
    "takeOut": {
      "name": "Heims Mill Canoe Access",
      "latitude": 45.5936215,
      "longitude": -94.1813947
    },
    "logistics": {
      "distanceLabel": "16.2 mi",
      "estimatedPaddleTime": "About 5 hr to 7 hr",
      "shuttle": "Full Rockville-to-Heims self-shuttle. Put the take-out vehicle at Heims before you launch because the Mississippi-confluence finish is not where you want to improvise tired logistics.",
      "permits": "No special paddling permit is known for this Minnesota DNR water-trail segment. Follow posted city and county access rules at both ends.",
      "camping": "Treat this as a day trip unless you intentionally stage from Rockville County Park. Heims Mill is a carry-in access with amenities, not a campground.",
      "summary": "Use Eagle Park as the put-in and Heims Mill as the take-out for the full lower-Sauk finish into the Mississippi corridor. This is the one-card choice when you want the easy middle miles plus the final Class I-II section.",
      "accessCaveats": [
        "Eagle Park is a popular local launch and fishing area, so scout the exact landing and parking flow before leaving vehicles.",
        "Heims Mill is a defined county carry-in with restroom and picnic amenities, but it is still a simple riverside access rather than a broad launch ramp.",
        "Because the route is long and the technical section comes late, it is worth scouting the take-out before you launch."
      ],
      "watchFor": [
        "Boulder-filled Class I-II rapids in the final 2.5 miles, especially if the river is low.",
        "Shallow rock dodging or partial walk-downs if the St. Martin gauge falls toward or below 14 ft.",
        "Wood, fatigue, and cold-water consequences near the Mississippi confluence."
      ]
    }
  },
  "sauk-river-frogtown-rockville": {
    "putIn": {
      "name": "Frogtown Park canoe landing",
      "latitude": 45.45775,
      "longitude": -94.421
    },
    "takeOut": {
      "name": "Rockville County Park carry-in access",
      "latitude": 45.4755294,
      "longitude": -94.3507888
    },
    "logistics": {
      "distanceLabel": "5.0 mi",
      "estimatedPaddleTime": "About 1 hr 45 min to 2 hr 45 min",
      "shuttle": "Short Cold Spring to Rockville self-shuttle. Rockville County Park is the easier place to leave a vehicle for a quick out-and-back day.",
      "permits": "No special paddling permit is known for this Minnesota DNR water-trail segment. Follow posted city-park and county-park rules.",
      "camping": "Rockville County Park has a watercraft campsite, but treat this route as a day trip unless you separately confirm current county camping rules and fees.",
      "summary": "Use Frogtown Park in Cold Spring as the put-in and Rockville County Park as the take-out. This is the short lower-Sauk option when you want a quick trip without committing to Miller Landing or the St. Cloud finish.",
      "accessCaveats": [
        "Frogtown Park launches just below the Cold Spring dam area, so make sure you are starting at the signed downstream canoe landing rather than anywhere above the obstruction.",
        "Rockville County Park has posted hours and county rules that still deserve a same-day check before you leave a shuttle vehicle."
      ],
      "watchFor": [
        "Fresh wood and strainers after storms.",
        "Scrapier water and slower progress when the St. Martin gauge falls toward 14 ft.",
        "Cold-water exposure outside midsummer, even on this shorter easy segment."
      ]
    }
  },
  "sauk-river-frogtown-eagle-park": {
    "putIn": {
      "name": "Frogtown Park canoe landing",
      "latitude": 45.45775,
      "longitude": -94.421
    },
    "takeOut": {
      "name": "Eagle Park carry-in access",
      "latitude": 45.4754595,
      "longitude": -94.3502588
    },
    "logistics": {
      "distanceLabel": "5.6 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr 15 min",
      "shuttle": "Short Cold Spring to Rockville self-shuttle. Eagle Park is a straightforward lower-Sauk finish when you want to keep the day simple and avoid the Miller or St. Cloud retrievals.",
      "permits": "No special paddling permit is known for this Minnesota DNR water-trail segment. Follow posted city-park rules at Frogtown and Eagle Park.",
      "camping": "Treat this as a day trip. Eagle Park is a launch/landing park, and any Rockville County Park camping nearby should be treated as separate staging rather than route-included overnight support.",
      "summary": "Launch at Frogtown Park in Cold Spring and take out at Eagle Park in Rockville. This is the short lower-Sauk extension that gives you more mileage than the Frogtown-to-Rockville split without committing to the full Miller day.",
      "accessCaveats": [
        "Frogtown Park launches just below the Cold Spring dam area, so make sure you are using the signed downstream canoe landing rather than any upstream water near the obstruction.",
        "Eagle Park is a popular local landing and fishing spot, so it is worth scouting the exact carry-out and parking flow before you launch."
      ],
      "watchFor": [
        "Fresh wood and strainers after storms.",
        "Scrapier water and thicker vegetation when the St. Martin gauge falls toward 14 ft.",
        "Cold-water exposure outside midsummer, even on this shorter easy segment."
      ]
    }
  },
  "sauk-river-frogtown-miller-landing": {
    "putIn": {
      "name": "Frogtown Park canoe landing",
      "latitude": 45.45775,
      "longitude": -94.421
    },
    "takeOut": {
      "name": "Miller Landing carry-in access",
      "latitude": 45.5504544,
      "longitude": -94.2641031
    },
    "logistics": {
      "distanceLabel": "14.2 mi",
      "estimatedPaddleTime": "About 4 hr 30 min to 6 hr 30 min",
      "shuttle": "Standard lower-Sauk self-shuttle from Cold Spring to Waite Park. Keep the take-out vehicle at Miller Landing so you are not solving the longest drive after a full paddling day.",
      "permits": "No special paddling permit is known for this Minnesota DNR water-trail segment. Follow posted city, county-park, and landing rules.",
      "camping": "Rockville County Park sits mid-route with a watercraft campsite if you want a bailout or staged split, but treat this as a day route unless you separately confirm current county camping rules and fees.",
      "summary": "Use Frogtown Park as the put-in and Miller Landing as the take-out for the full lower-Sauk day. This is the route to pick when you want DNR’s recommended Eagle-to-Miller float plus the extra five miles that DNR says you can add from Frogtown.",
      "accessCaveats": [
        "Frogtown Park is the downstream-of-dam start; do not improvise a put-in above the Cold Spring obstruction.",
        "Miller Landing is a managed county access with posted hours, so do not assume unlimited late-night retrieval if the day runs long.",
        "Rockville County Park is the cleanest mid-route bailout or split because it is the documented watercraft-campsite stop on this corridor."
      ],
      "watchFor": [
        "Vegetation and shallow stretches when the St. Martin gauge slides toward 14 ft.",
        "Downed trees or fresh strainers after storms.",
        "Longer-day fatigue on a route that stays easy in character but still covers over 14 river miles."
      ]
    }
  },
  "sauk-river-frogtown-knights-of-columbus": {
    "putIn": {
      "name": "Frogtown Park canoe landing",
      "latitude": 45.45775,
      "longitude": -94.421
    },
    "takeOut": {
      "name": "Knights of Columbus Park carry-in access",
      "latitude": 45.5670560130672,
      "longitude": -94.2286380074072
    },
    "logistics": {
      "distanceLabel": "17.3 mi",
      "estimatedPaddleTime": "About 5 hr 15 min to 7 hr 15 min",
      "shuttle": "Full lower-Sauk self-shuttle from Cold Spring to St. Cloud. Leave the take-out vehicle at Knights of Columbus Park so the longest drive happens before the long paddling day, not after it.",
      "permits": "No special paddling permit is known for this Minnesota DNR water-trail segment. Follow posted city, county-park, and access rules along the corridor.",
      "camping": "Rockville County Park sits mid-route with a watercraft campsite and is the cleanest bailout or intentional split. Otherwise treat this as a long day and do not assume informal shoreline camping is legal.",
      "summary": "Launch at Frogtown Park in Cold Spring and finish at Knights of Columbus Park in St. Cloud for the full easy lower-Sauk day that still stops before the Heims rapid finish.",
      "accessCaveats": [
        "Frogtown Park is the downstream-of-dam start, so do not improvise a put-in above the Cold Spring obstruction.",
        "Knights of Columbus Park is a defined city endpoint with parking and restrooms, but it is still worth scouting the exact carry-out before you launch if you have not used it before.",
        "Rockville County Park remains the cleanest mid-route bailout or deliberate overnight split because it is the documented watercraft-campsite stop on this corridor."
      ],
      "watchFor": [
        "Vegetation and shallow stretches when the St. Martin gauge slides toward 14 ft.",
        "Downed trees or fresh strainers after storms.",
        "Longer-day fatigue and weather exposure on a route that stays easy in character but covers over 17 river miles."
      ]
    }
  },
  "sauk-river-rockville-miller-landing": {
    "putIn": {
      "name": "Rockville County Park carry-in access",
      "latitude": 45.4755294,
      "longitude": -94.3507888
    },
    "takeOut": {
      "name": "Miller Landing carry-in access",
      "latitude": 45.5504544,
      "longitude": -94.2641031
    },
    "logistics": {
      "distanceLabel": "9.2 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr 30 min",
      "shuttle": "Standard Stearns County self-shuttle between Rockville County Park and Miller Landing. Confirm county-park hours before leaving vehicles overnight or late into the day.",
      "permits": "No special paddling permit is known for this Minnesota DNR water-trail segment. Follow posted county-park and landing rules.",
      "camping": "Rockville County Park has a watercraft campsite and is the cleaner overnight hook if you want to stage this route, but treat the paddle itself as a day trip unless you separately confirm current camping rules and fees.",
      "summary": "Put in at Rockville County Park and take out at Miller Landing. This is the straightforward full lower-Sauk day when the river is in the DNR medium band and you want more mileage than the Frogtown split.",
      "accessCaveats": [
        "Rockville County Park has drinking water and a watercraft campsite, but local rules still win over any stale online assumptions.",
        "Miller Landing is a managed county access with posted hours rather than an always-open informal pull-off."
      ],
      "watchFor": [
        "Vegetation and shallow stretches when the St. Martin gauge slides toward 14 ft.",
        "Downed trees or fresh strainers after summer storms.",
        "Fatigue creep on a route that stays mostly easy but still covers a full lower-Sauk day."
      ]
    }
  },
  "sauk-river-rockville-knights-of-columbus": {
    "putIn": {
      "name": "Rockville County Park carry-in access",
      "latitude": 45.4755294,
      "longitude": -94.3507888
    },
    "takeOut": {
      "name": "Knights of Columbus Park carry-in access",
      "latitude": 45.5670560130672,
      "longitude": -94.2286380074072
    },
    "logistics": {
      "distanceLabel": "12.3 mi",
      "estimatedPaddleTime": "About 4 hr to 5 hr 45 min",
      "shuttle": "Standard Stearns County to St. Cloud self-shuttle between Rockville County Park and Knights of Columbus Park. Confirm local park hours before leaving vehicles late into the day.",
      "permits": "No special paddling permit is known for this Minnesota DNR water-trail segment. Follow posted county-park and city-park rules.",
      "camping": "Rockville County Park has the clean campsite-and-drinking-water staging story, so this can work as an endpoint-campground start. The paddle itself still reads best as a day trip unless you intentionally stage it from Rockville.",
      "summary": "Put in at Rockville County Park and take out at Knights of Columbus Park for a medium lower-Sauk day that keeps the campsite-backed put-in but exits before the Heims rapid finish.",
      "accessCaveats": [
        "Rockville County Park has posted hours, drinking water, and a watercraft campsite, but local rules still override any stale assumptions when you arrive.",
        "Knights of Columbus Park is a popular St. Cloud park, so it is smarter to identify the exact carry-out and parking flow before launching than to treat it as a generic stop."
      ],
      "watchFor": [
        "Vegetation and shallow stretches when the St. Martin gauge slides toward 14 ft.",
        "Storm debris and strainers after recent rain.",
        "Fatigue creep on a route that stays mostly easy but still covers a solid lower-Sauk day."
      ]
    }
  },
  "sauk-river-rockville-heims-mill": {
    "putIn": {
      "name": "Rockville County Park carry-in access",
      "latitude": 45.4755294,
      "longitude": -94.3507888
    },
    "takeOut": {
      "name": "Heims Mill Canoe Access",
      "latitude": 45.5936215,
      "longitude": -94.1813947
    },
    "logistics": {
      "distanceLabel": "16.8 mi",
      "estimatedPaddleTime": "About 5 hr 30 min to 7 hr 30 min",
      "shuttle": "Full lower-Sauk self-shuttle from Rockville County Park to Heims Mill. Put the take-out vehicle at Heims because the Mississippi-confluence finish is not where you want to improvise tired logistics.",
      "permits": "No special paddling permit is known for this Minnesota DNR water-trail segment. Follow posted county-park and city/county access rules at both ends.",
      "camping": "Rockville County Park has the cleaner campsite-and-drinking-water staging story, but this still works best as a long day unless you deliberately plan a county-approved overnight split.",
      "summary": "Launch at Rockville County Park and finish at Heims Mill for the longest lower-Sauk day route that still fits the product’s normal day-trip ceiling. This is the one-card choice when you want the full lower corridor plus the DNR-noted Class I-II mouth section.",
      "accessCaveats": [
        "Rockville County Park has posted hours, drinking water, and a watercraft campsite, but local rules still override any stale assumptions when you arrive.",
        "Heims Mill is a managed carry-in with restroom and picnic amenities, not a broad paved ramp or a place to sort out a casual shuttle plan.",
        "Because the route is long and the technical section comes late, it is worth scouting the take-out before you launch."
      ],
      "watchFor": [
        "Vegetation, shallow stretches, and extra drag when the St. Martin gauge trends toward 14 ft.",
        "Boulder-filled Class I-II rapids in the final 2.5 miles, especially at lower water.",
        "Fatigue, wood, and cold-water consequences near the Mississippi confluence finish."
      ]
    }
  },
  "sauk-river-pineview-heims-mill": {
    "putIn": {
      "name": "Pineview Park carry-in access",
      "latitude": 45.5600406,
      "longitude": -94.2446825
    },
    "takeOut": {
      "name": "Heims Mill Canoe Access",
      "latitude": 45.5936215,
      "longitude": -94.1813947
    },
    "logistics": {
      "distanceLabel": "6.2 mi",
      "estimatedPaddleTime": "About 2 hr 15 min to 3 hr 30 min",
      "shuttle": "Short St. Cloud-area self-shuttle between Pineview Park and Heims Mill. Keep the take-out vehicle at Heims because the Mississippi confluence and rapid finish are not a place to improvise exhausted logistics.",
      "permits": "No special paddling permit is known for this Minnesota DNR water-trail segment. Follow posted county and city access rules.",
      "camping": "Treat this as a day trip. Heims Mill is a carry-in county access with picnic amenities, not a campground.",
      "summary": "Use Pineview Park as the put-in and Heims Mill as the take-out for the St. Cloud finish of the Sauk. This is the lower family member that adds the final Class I-II rapid section before the Mississippi.",
      "accessCaveats": [
        "The official DNR StoryMap lists Pineview carry-in access on Saukview Drive, while St. Cloud park inventory material uses a nearby Pineview Park address; follow the signed carry-in on arrival rather than over-trusting one address string.",
        "Heims Mill is a defined county carry-in with restroom and picnic amenities, but it is still a simple riverside access rather than a broad launch ramp."
      ],
      "watchFor": [
        "Boulder-filled Class I-II rapids in the final 2.5 miles, especially if the river is low.",
        "Shallow rock dodging or partial walk-downs if the St. Martin gauge falls toward or below 14 ft.",
        "Wood, tight lines, and cold-water consequences near the Mississippi confluence."
      ]
    }
  },
  "sauk-river-spring-hill-st-martin": {
    "putIn": {
      "name": "Spring Hill County Park carry-in access",
      "latitude": 45.529026,
      "longitude": -94.776531
    },
    "takeOut": {
      "name": "St. Martin Public Water Access / County Road 12",
      "latitude": 45.520241,
      "longitude": -94.67885
    },
    "logistics": {
      "distanceLabel": "About 9.1 river mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr 30 min",
      "shuttle": "Short Stearns County self-shuttle between Spring Hill County Park and the St. Martin carry-in near County Road 12. Check county park rules before leaving a vehicle.",
      "permits": "No special paddling permit is known for this Minnesota DNR water-trail segment. Follow posted county-park and access rules.",
      "camping": "Spring Hill County Park has DNR-noted watercraft campsite context. Treat this as a day route unless you separately confirm current Stearns County camping rules and fees.",
      "summary": "Use Spring Hill County Park as the put-in and the St. Martin carry-in as the take-out. This creates a cleaner gauge-backed Sauk day than the older Spring Hill-to-Rockville multi-day draft.",
      "accessCaveats": [
        "Stearns County confirms St. Martin Canoe Access as a one-acre county site retained as access to the Sauk River, but it is still a simple carry-in rather than a full-service park landing.",
        "Low water and summer vegetation can make this short route slower and less pleasant than the mileage suggests."
      ],
      "watchFor": [
        "Shallow riffles and vegetation as the St. Martin gauge falls toward 14 ft.",
        "Fresh wood and strainers after storms.",
        "Cold-water exposure in spring and fall."
      ]
    }
  },
  "sauk-river-spring-hill-frogtown": {
    "putIn": {
      "name": "Spring Hill County Park carry-in access",
      "latitude": 45.529026,
      "longitude": -94.776531
    },
    "takeOut": {
      "name": "Frogtown Park canoe landing",
      "latitude": 45.45775,
      "longitude": -94.421
    },
    "logistics": {
      "distanceLabel": "34.4 mi",
      "estimatedPaddleTime": "About 11 hr to 14 hr, or split overnight",
      "shuttle": "Use a long Stearns County to Cold Spring shuttle and inspect both ends before launching. This is not a casual same-town mover, and most groups should settle the Rockville bailout plan before they leave the put-in.",
      "permits": "No special paddling permit is known for this Minnesota DNR water-trail segment. Follow posted county and city access rules at Spring Hill, Frogtown, and intermediate parks.",
      "camping": "Rockville County Park sits mid-route and has a watercraft campsite, making this a defensible overnight split or bailout. Otherwise treat it as a very long day and do not assume informal shoreline camping is legal.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Spring Hill County Park and finish at Frogtown Park for a long upper-to-central Sauk day into Cold Spring. This is the additive family planner when the St. Martin gauge is solid and you want the full upper corridor without extending into the St. Cloud finish.",
      "accessCaveats": [
        "Spring Hill County Park is a cleaner park launch than the simple St. Martin carry-in, but you still need to check same-day county parking and staging rules before leaving a vehicle.",
        "Frogtown launches and lands below the Cold Spring dam area, so make sure you are using the signed downstream canoe landing rather than any upstream obstruction-adjacent spot.",
        "Rockville County Park is the cleanest intentional overnight split because it is the documented watercraft-campsite stop on this corridor."
      ],
      "watchFor": [
        "Long-mileage fatigue and weather exposure on a route that is easy in character but not short.",
        "Shallow riffles, slow vegetation-choked miles, and extra drag if the St. Martin gauge trends toward 14 ft.",
        "Fresh wood, strainers, and cold-water consequences far from your planned take-out."
      ]
    }
  },
  "sauk-river-frogtown-heims-mill": {
    "putIn": {
      "name": "Frogtown Park canoe landing",
      "latitude": 45.45775,
      "longitude": -94.421
    },
    "takeOut": {
      "name": "Heims Mill Canoe Access",
      "latitude": 45.5936215,
      "longitude": -94.1813947
    },
    "logistics": {
      "distanceLabel": "21.8 mi",
      "estimatedPaddleTime": "About 7 hr to 9 hr 30 min, or split overnight",
      "shuttle": "Use a Cold Spring to St. Cloud-area shuttle and inspect both endpoints before launching. The Heims finish is farther and more committed than Miller or Knights, so identify the take-out before leaving Frogtown.",
      "permits": "No special paddling permit is known for this Minnesota DNR water-trail segment. Follow posted city and county access rules at Frogtown, Heims, and intermediate parks.",
      "camping": "Rockville County Park sits mid-route and has a watercraft campsite, making this a defensible overnight split or bailout. Otherwise treat it as a committed day and do not assume informal shoreline camping is legal.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Frogtown Park and finish at Heims Mill for the full lower Sauk route into the Mississippi confluence corridor. This is the additive card to choose when you want to carry the lower river past Eagle and Miller all the way through the final mouth section.",
      "accessCaveats": [
        "Frogtown launches below the Cold Spring dam area, so make sure you are using the signed downstream canoe landing rather than any upstream obstruction-adjacent spot.",
        "Heims Mill is the intended finish and the final 2.5 miles before it carry the DNR-signaled Class I-II mouth section, so identify the take-out before launching and do not drift toward the Mississippi confluence by accident.",
        "Rockville County Park is the cleanest intentional overnight split because it is the documented watercraft-campsite stop on this corridor."
      ],
      "watchFor": [
        "Longer-day fatigue and changing weather on an otherwise easy river.",
        "Vegetation, shallow riffles, and slower current when the St. Martin gauge slides toward 14 ft.",
        "Fresh wood, strainers, and the boulder-filled Class I-II finish in the final miles before Heims Mill."
      ]
    }
  },
  "sauk-river-st-martin-frogtown": {
    "putIn": {
      "name": "St. Martin Public Water Access / County Road 12",
      "latitude": 45.520241,
      "longitude": -94.67885
    },
    "takeOut": {
      "name": "Frogtown Park canoe landing",
      "latitude": 45.45775,
      "longitude": -94.421
    },
    "logistics": {
      "distanceLabel": "25.3 mi",
      "estimatedPaddleTime": "About 8 hr to 10 hr 30 min, or split overnight",
      "shuttle": "Use a standard vehicle shuttle between St. Martin and Cold Spring. Because this is a long corridor, most groups should inspect both ends before launching rather than assuming a quick in-town shuttle.",
      "permits": "No special paddling permit is known for this Minnesota DNR water-trail segment. Follow posted county and city access rules at St. Martin, Frogtown, and intermediate parks.",
      "camping": "Rockville County Park sits mid-route and has a watercraft campsite, making this a defensible overnight split or bailout. Otherwise treat it as a long day and do not assume informal shoreline camping is legal.",
      "summary": "Launch at St. Martin Canoe Access and finish at Frogtown Park for a full central-Sauk day into Cold Spring. This is the long family member to choose when the St. Martin gauge is solid and you want more commitment than the short lower routes without extending to Eagle or St. Cloud.",
      "accessCaveats": [
        "St. Martin is a simple county carry-in rather than a full-service landing, so settle your staging and parking plan before unloading boats.",
        "Frogtown is below the Cold Spring dam area, so make sure you are taking out at the signed park canoe landing rather than drifting into upstream obstruction confusion.",
        "Rockville County Park is the cleanest intentional overnight split because it is the documented watercraft-campsite stop on this corridor."
      ],
      "watchFor": [
        "Long-mileage fatigue and weather exposure on a route that is easy in character but not short.",
        "Shallow riffles, slow vegetation-choked miles, and extra drag if the St. Martin gauge trends toward 14 ft.",
        "Fresh wood, strainers, and cold-water consequences far from your planned take-out."
      ]
    }
  },
  "sauk-river-st-martin-rockville": {
    "putIn": {
      "name": "St. Martin Public Water Access / County Road 12",
      "latitude": 45.520241,
      "longitude": -94.67885
    },
    "takeOut": {
      "name": "Rockville County Park carry-in access",
      "latitude": 45.4755294,
      "longitude": -94.3507888
    },
    "logistics": {
      "distanceLabel": "30.3 mi",
      "estimatedPaddleTime": "About 9 hr to 12 hr, or split overnight",
      "shuttle": "Use a standard vehicle shuttle between St. Martin and Rockville. Because this is a long corridor, most groups should inspect both ends before launching rather than assuming a quick county-road shuttle day.",
      "permits": "No special paddling permit is known for this Minnesota DNR water-trail segment. Follow posted county access and campground rules at St. Martin, Rockville, and intermediate parks.",
      "camping": "Rockville County Park has a documented watercraft campsite at the take-out, which gives this route a legitimate endpoint campground finish or conservative overnight split.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at St. Martin Canoe Access and finish at Rockville County Park for the long central Sauk corridor. This is the cleaner middle-family planner when the St. Martin gauge is solid and you want the Rockville campground finish instead of extending to Frogtown or Eagle Park.",
      "accessCaveats": [
        "St. Martin is a simple county carry-in rather than a full-service landing, so settle your staging and parking plan before unloading boats.",
        "Rockville County Park is the intended finish and campground checkpoint. Confirm current campsite rules, park hours, and vehicle placement before launching.",
        "This route passes multiple intermediate accesses, which is useful for bailout planning but also makes it easy to underestimate how long the full St. Martin-to-Rockville commitment really is."
      ],
      "watchFor": [
        "Long-mileage fatigue and weather exposure on a route that is easy in character but not short.",
        "Shallow riffles, slow vegetation-choked miles, and extra drag if the St. Martin gauge trends toward 14 ft.",
        "Fresh wood, strainers, and cold-water consequences far from your planned take-out."
      ]
    }
  },
  "sauk-river-st-martin-eagle-park": {
    "putIn": {
      "name": "St. Martin Public Water Access / County Road 12",
      "latitude": 45.520241,
      "longitude": -94.67885
    },
    "takeOut": {
      "name": "Eagle Park carry-in access",
      "latitude": 45.4754595,
      "longitude": -94.3502588
    },
    "logistics": {
      "distanceLabel": "30.9 mi",
      "estimatedPaddleTime": "About 9 hr to 12 hr, or split overnight",
      "shuttle": "Use a standard vehicle shuttle between St. Martin and Eagle Park. Because this is a long corridor, most groups should inspect both ends before launching rather than assuming a simple quick-shuttle day.",
      "permits": "No special paddling permit is known for this Minnesota DNR water-trail segment. Follow posted county and city access rules at St. Martin, intermediate parks, and Eagle Park.",
      "camping": "Rockville County Park sits mid-route and has a watercraft campsite, making this a defensible overnight split. Otherwise treat it as a very long day and do not assume informal shoreline camping is legal.",
      "summary": "Launch at St. Martin Canoe Access and finish at Eagle Park for the central Sauk corridor. This is the long family member to choose when the St. Martin gauge is solid and you want more commitment than the short lower routes.",
      "accessCaveats": [
        "St. Martin is a simple county carry-in rather than a full-service landing, so settle your staging and parking plan before unloading boats.",
        "This route passes multiple intermediate accesses, which is useful for bailout planning but also makes it easy to underestimate how long the full St. Martin-to-Eagle commitment really is.",
        "Rockville County Park is the cleanest intentional overnight split because it is the documented watercraft-campsite stop on this corridor."
      ],
      "watchFor": [
        "Long-mileage fatigue and weather exposure on a route that is easy in character but not short.",
        "Shallow riffles, slow vegetation-choked miles, and extra drag if the St. Martin gauge trends toward 14 ft.",
        "Fresh wood, strainers, and cold-water consequences far from your planned take-out."
      ]
    }
  },
  "sauk-river-miller-landing-knights-of-columbus": {
    "putIn": {
      "name": "Miller Landing carry-in access",
      "latitude": 45.5504544,
      "longitude": -94.2641031
    },
    "takeOut": {
      "name": "Knights of Columbus Park carry-in access",
      "latitude": 45.5670560130672,
      "longitude": -94.2286380074072
    },
    "logistics": {
      "distanceLabel": "3.1 mi",
      "estimatedPaddleTime": "About 1 hr 15 min to 2 hr",
      "shuttle": "Short lower-Sauk self-shuttle between Miller Landing and Knights of Columbus Park. This is one of the easier St. Cloud-area setups when you want a quick route and simple retrieval.",
      "permits": "No special paddling permit is known for this Minnesota DNR water-trail segment. Follow posted local rules at Miller Landing and Knights of Columbus Park.",
      "camping": "Treat this as a day trip. Both endpoints are managed access parks rather than overnight river camps.",
      "summary": "Use Miller Landing as the put-in and Knights of Columbus Park as the take-out for a short urban lower-Sauk paddle that ends before the Heims rapid finish.",
      "accessCaveats": [
        "Miller Landing is a managed county access with posted hours, so do not assume unlimited late retrieval.",
        "Knights of Columbus Park is a city park with parking and restrooms, but it is still smarter to scout the exact carry-out before launching if you have not used it before.",
        "Because the route is short, wind, weeds, or a head-scratching take-out can distort the day more than the mileage suggests."
      ],
      "watchFor": [
        "Vegetation and slower current when the St. Martin gauge slides toward 14 ft.",
        "Fresh wood or strainers after storms in this tree-lined lower corridor.",
        "Cold-water exposure outside midsummer, even on a short easy shuttle."
      ]
    }
  },
  "sauk-river-miller-landing-heims-mill": {
    "putIn": {
      "name": "Miller Landing carry-in access",
      "latitude": 45.5504544,
      "longitude": -94.2641031
    },
    "takeOut": {
      "name": "Heims Mill Canoe Access",
      "latitude": 45.5936215,
      "longitude": -94.1813947
    },
    "logistics": {
      "distanceLabel": "7.6 mi",
      "estimatedPaddleTime": "About 2 hr 30 min to 4 hr",
      "shuttle": "Lower-Sauk self-shuttle from Waite Park to Heims Mill. Keep the take-out vehicle at Heims because the confluence finish is not where you want to improvise tired logistics after the rapid section.",
      "permits": "No special paddling permit is known for this Minnesota DNR water-trail segment. Follow posted county access rules at Miller Landing and Heims Mill.",
      "camping": "Treat this as a day trip. Miller Landing and Heims Mill are managed access parks rather than overnight river camps.",
      "summary": "Use Miller Landing as the put-in and Heims Mill as the take-out for the full Waite Park-to-confluence lower-Sauk finish that includes the DNR-noted Class I-II section near the mouth.",
      "accessCaveats": [
        "Miller Landing is a managed county access with posted hours, so do not assume unlimited late retrieval if the day runs long.",
        "Heims Mill is a simple carry-in county access with restroom and picnic amenities, not a broad ramp or a place to sort out a casual shuttle plan.",
        "Do not let the moderate mileage hide the fact that the lower 2.5 miles are the technical part of the Sauk family."
      ],
      "watchFor": [
        "Boulder-filled Class I-II rapids in the final 2.5 miles, especially if the gauge trends low.",
        "Shallow rock dodging or partial walk-downs if the St. Martin gauge falls toward or below 14 ft.",
        "Wood, tight lines, and cold-water consequences near the Mississippi confluence."
      ]
    }
  },
  "sauk-river-knights-of-columbus-heims-mill": {
    "putIn": {
      "name": "Knights of Columbus Park carry-in access",
      "latitude": 45.5670560130672,
      "longitude": -94.2286380074072
    },
    "takeOut": {
      "name": "Heims Mill Canoe Access",
      "latitude": 45.5936215,
      "longitude": -94.1813947
    },
    "logistics": {
      "distanceLabel": "4.5 mi",
      "estimatedPaddleTime": "About 1 hr 45 min to 2 hr 45 min",
      "shuttle": "Short St. Cloud-area self-shuttle between Knights of Columbus Park and Heims Mill. Keep the take-out vehicle at Heims because the confluence finish is not where you want to improvise when tired.",
      "permits": "No special paddling permit is known for this Minnesota DNR water-trail segment. Follow posted city and county access rules.",
      "camping": "Treat this as a day trip. Heims Mill has picnic and restroom amenities but is not a campground.",
      "campingClassification": "none",
      "summary": "Put in at Knights of Columbus Park and finish at Heims Mill for the short lower-Sauk route that includes the DNR-noted Class I-II finish into the Mississippi corridor.",
      "accessCaveats": [
        "Knights of Columbus Park is a defined city park endpoint, but you should still identify the carry-out path before launching because it is easy to think of it as a generic park stop rather than a specific river exit.",
        "Heims Mill is a simple carry-in county access with amenities, not a broad paved ramp or a place to loiter while sorting out a shuttle plan.",
        "Do not let the short mileage hide the fact that the lower 2.5 miles are the technical part of the Sauk family."
      ],
      "watchFor": [
        "Boulder-filled Class I-II rapids in the final 2.5 miles, especially if the gauge trends low.",
        "Shallow rock dodging or partial walk-downs if the St. Martin gauge falls toward or below 14 ft.",
        "Wood, tight lines, and cold-water consequences near the Mississippi confluence."
      ]
    }
  },
  "snake-river-canary-cross-lake": {
    "putIn": {
      "name": "Snake River #1 / Canary Road public water access",
      "latitude": 45.7959352,
      "longitude": -93.0796766
    },
    "takeOut": {
      "name": "Snake River / Cross Lake public water access (Pine City)",
      "latitude": 45.8405577,
      "longitude": -92.9418935
    },
    "logistics": {
      "distanceLabel": "10.2 mi",
      "estimatedPaddleTime": "About 3 hr 30 min to 4 hr 45 min",
      "shuttle": "Short Pine City-area car shuttle. A bike shuttle is possible, but only if you are comfortable with the roads and have already checked parking at both ends.",
      "permits": "No special permit is known for this Minnesota DNR water-trail segment. Follow posted public-water-access and local parking rules at both landings.",
      "camping": "Treat this as a day trip, but Snake River Campground in Chengwatana State Forest is a useful nearby campground/base-camp option if you want to stage the trip.",
      "summary": "Put in at the Canary Road carry-in and take out at the Cross Lake / Pine City landing. This is the DNR-recommended lower Snake day, and the Pine City gauge gives it one of the cleaner official go-no-go stories in the app.",
      "accessCaveats": [
        "Both endpoints are now backed by Minnesota public-water-access records, which is a much better trust story than the earlier approximate-coordinate version.",
        "Pine City recreation materials are useful for parking context at the take-out, but same-day signage still wins if anything looks different on arrival."
      ],
      "watchFor": [
        "Fast fluctuations after rain or snowmelt.",
        "Low-water trouble below Cross Lake when the Pine City gauge sinks toward 2.3 ft.",
        "Fresh wood or strainers after storms, especially on bends and in faster current."
      ]
    }
  },
  "snake-river-county-road-9-snake-bit": {
    "putIn": {
      "name": "County Road 9 bridge carry-in access",
      "latitude": 45.8395826,
      "longitude": -92.9363969
    },
    "takeOut": {
      "name": "Snake Bit Access (near St. Croix/Snake River public water access)",
      "latitude": 45.8230834,
      "longitude": -92.7645675
    },
    "logistics": {
      "distanceLabel": "11.7 mi",
      "estimatedPaddleTime": "About 4 hr to 5 hr 30 min",
      "shuttle": "Longer Pine City-to-Chengwatana shuttle. A two-car shuttle is the practical choice because the finish sits near the St. Croix confluence rather than back in town.",
      "permits": "No special permit is known for this Minnesota DNR water-trail segment. Follow posted public-access, state-forest, and parking rules at both ends.",
      "camping": "Treat this as a day trip. Snake River Campground and River's End Campground are nearby options if you want to stay close to the shuttle.",
      "summary": "Put in at County Road 9 and finish near Snake Bit at the Snake/St. Croix confluence. This lower Snake route has a strong official low-water warning, so use the Pine City gauge first and do not expect a worthwhile run when it is hugging the floor.",
      "accessCaveats": [
        "MN DNR marks County Road 9 as a carry-in access and puts the gauge on the bridge. Expect a simple bridge access, not a developed park launch.",
        "MN DNR maps Snake Bit at the St. Croix confluence. Before launching, confirm the finish using the nearby official Snake/St. Croix public access and any posted signs at the landing."
      ],
      "watchFor": [
        "A manmade dam/drop immediately below County Road 9 after leaving Cross Lake. A July 18, 2026 paddler report described a large center grate in the drop, rocky current below it, and a portage around the feature; scout first and portage or skip if the line is not clearly safe.",
        "Fresh wood, strainers, and debris after storms or rapid snowmelt.",
        "Wind and wave exposure as you approach the St. Croix confluence."
      ]
    }
  },
  "crow-wing-river-mary-brown-cottingham": {
    "putIn": {
      "name": "Mary Brown Rest Area #5 carry-in access",
      "latitude": 46.71758222409383,
      "longitude": -94.92898508221442
    },
    "takeOut": {
      "name": "Cottingham County Park #11 carry-in access",
      "latitude": 46.505529851247346,
      "longitude": -94.80738952007682
    },
    "logistics": {
      "distanceLabel": "25.8 mi",
      "estimatedPaddleTime": "About 8 hr 30 min to 11 hr",
      "shuttle": "Long Wadena County shuttle from Mary Brown to Cottingham. Stage the Cottingham take-out first because it is the busiest landing in this chain and the full route is long enough that finish logistics and daylight matter.",
      "permits": "No special paddling permit is known for this Minnesota DNR water-trail segment. Follow posted public-access, county-campground, day-use, and parking rules at the named landings.",
      "camping": "This is the strongest Crow Wing route in this pass for a legal split trip. Anderson's Crossing, Little White Dog, and Knob Hill all provide documented county campground support before the Cottingham finish.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Mary Brown and finish at Cottingham for the full upper-to-lower Crow Wing county-chain continuation. The route stays gauge-consistent, but the Nimrod-area rapids, low-water pace, and busy downstream finish make it a deliberate all-day plan.",
      "accessCaveats": [
        "Mary Brown is a remote carry-in access with few frills, so inspect the launch and parking setup before leaving a vehicle.",
        "Anderson's Crossing is the natural early split point, and Stigman's Mound, Little White Dog, and Knob Hill remain the clearest later bailout or overnight options.",
        "Cottingham is a county park with heavier summer use for swimming and tubing, so expect a busier and less secluded take-out than the upstream landings."
      ],
      "watchFor": [
        "Walkin's Rapids, Burrows Rapids, and Westra Rapids on the upper half of the route.",
        "Fresh wood, sweepers, and stronger current after storms.",
        "Long low-water dragging plus tubing and swimmer traffic near Knob Hill and Cottingham on summer weekends."
      ]
    },
    "accessPoints": [
      {
        "id": "mary-brown-rest-area",
        "name": "Mary Brown Rest Area #5 carry-in access",
        "latitude": 46.71758222409383,
        "longitude": -94.92898508221442,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Full upstream start for the longest Mary Brown continuation."
      },
      {
        "id": "andersons-crossing",
        "name": "Anderson's Crossing #6 carry-in access",
        "latitude": 46.69942260942251,
        "longitude": -94.88188569131617,
        "mileFromStart": 4.5,
        "segmentKind": "creek",
        "note": "Primary early campground, bailout, and logical first split point."
      },
      {
        "id": "stigmans-mound",
        "name": "Stigman's Mound #7 carry-in access",
        "latitude": 46.64045859179894,
        "longitude": -94.87970389700178,
        "mileFromStart": 9.6,
        "segmentKind": "creek",
        "note": "Lower-corridor checkpoint after the main rapids-bearing stretch."
      },
      {
        "id": "frames-landing",
        "name": "Frame's Landing public water access",
        "latitude": 46.629663080692076,
        "longitude": -94.86925421200144,
        "mileFromStart": 10.9,
        "segmentKind": "creek",
        "note": "Early lower-corridor campground access before the county-park chain widens out."
      },
      {
        "id": "little-white-dog",
        "name": "Little White Dog County Park #9 carry-in access",
        "latitude": 46.586984884675736,
        "longitude": -94.82261571200662,
        "mileFromStart": 16,
        "segmentKind": "creek",
        "note": "County campground midpoint and the cleanest lower-corridor overnight split."
      },
      {
        "id": "knob-hill",
        "name": "Knob Hill Landing #10 carry-in access",
        "latitude": 46.533855996511825,
        "longitude": -94.81849257299048,
        "mileFromStart": 22.3,
        "segmentKind": "creek",
        "note": "Busy downstream campground and tubing access before the final miles."
      },
      {
        "id": "cottingham-county-park",
        "name": "Cottingham County Park #11 carry-in access",
        "latitude": 46.505529851247346,
        "longitude": -94.80738952007682,
        "mileFromStart": 25.8,
        "segmentKind": "creek",
        "note": "Default downstream finish for the full Mary Brown corridor route."
      }
    ]
  },
  "crow-wing-river-mary-brown-frames-landing": {
    "putIn": {
      "name": "Mary Brown Rest Area #5 carry-in access",
      "latitude": 46.71758222409383,
      "longitude": -94.92898508221442
    },
    "takeOut": {
      "name": "Frame's Landing public water access",
      "latitude": 46.629663080692076,
      "longitude": -94.86925421200144
    },
    "logistics": {
      "distanceLabel": "10.9 mi",
      "estimatedPaddleTime": "About 4 hr to 5.5 hr",
      "shuttle": "Moderate Wadena County shuttle from Mary Brown to Frame's Landing. Stage the Frame's take-out first so the county-campground landing and parking setup are clear before committing to the longer upstream miles.",
      "permits": "No special paddling permit is known for this Minnesota DNR water-trail segment. Follow posted public-access, county-campground, and parking rules at the named landings.",
      "camping": "This route has both a real midpoint bailout at Anderson's Crossing and a campground finish at Frame's Landing, so it works as an endpoint-campground paddle without implying informal shoreline camping.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Mary Brown and finish at Frame's Landing for a longer Crow Wing continuation that carries the Nimrod-area rapids and then settles into the calmer county-campground corridor below Stigman's Mound.",
      "accessCaveats": [
        "Mary Brown is a remote carry-in access with few frills, so inspect the launch and parking setup before leaving a vehicle.",
        "Anderson's Crossing is the natural midpoint bailout and only clearly documented intermediate overnight stop if the group does not want the full Frame's finish.",
        "Frame's Landing is county-managed campground access rather than a polished city-park ramp, so identify the landing and any fee or parking expectations before launching."
      ],
      "watchFor": [
        "Walkin's Rapids, Burrows Rapids, and Westra Rapids on the Nimrod half of the route.",
        "Fresh wood, sweepers, and stronger current after storms.",
        "Exposed sandbars and slower travel on the downstream half when the Nimrod gauge is near or below 300 cfs."
      ]
    },
    "accessPoints": [
      {
        "id": "mary-brown-rest-area",
        "name": "Mary Brown Rest Area #5 carry-in access",
        "latitude": 46.71758222409383,
        "longitude": -94.92898508221442,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Full upstream start for the Mary Brown to Frame's continuation."
      },
      {
        "id": "andersons-crossing",
        "name": "Anderson's Crossing #6 carry-in access",
        "latitude": 46.69942260942251,
        "longitude": -94.88188569131617,
        "mileFromStart": 4.5,
        "segmentKind": "creek",
        "note": "Primary midpoint campground, bailout, and logical split point."
      },
      {
        "id": "stigmans-mound",
        "name": "Stigman's Mound #7 carry-in access",
        "latitude": 46.64045859179894,
        "longitude": -94.87970389700178,
        "mileFromStart": 9.6,
        "segmentKind": "creek",
        "note": "Lower-corridor checkpoint after the main rapids-bearing stretch."
      },
      {
        "id": "frames-landing",
        "name": "Frame's Landing public water access",
        "latitude": 46.629663080692076,
        "longitude": -94.86925421200144,
        "mileFromStart": 10.9,
        "segmentKind": "creek",
        "note": "Campground-supported downstream finish before the busier county chain."
      }
    ]
  },
  "crow-wing-river-mary-brown-stigmans-mound": {
    "putIn": {
      "name": "Mary Brown Rest Area #5 carry-in access",
      "latitude": 46.71758222409383,
      "longitude": -94.92898508221442
    },
    "takeOut": {
      "name": "Stigman's Mound #7 carry-in access",
      "latitude": 46.64045859179894,
      "longitude": -94.87970389700178
    },
    "logistics": {
      "distanceLabel": "9.6 mi",
      "estimatedPaddleTime": "About 3 hr 30 min to 5 hr",
      "shuttle": "Moderate Wadena County shuttle from Mary Brown to Nimrod. Stage the Stigman's take-out first so the bridge-side landing and parking expectations are familiar before you launch.",
      "permits": "No special paddling permit is known for this Minnesota DNR water-trail segment. Follow posted public-access, county-campground, and park rules at the named landings.",
      "camping": "This longer route passes Anderson's Crossing campground about midway, so it is the cleanest on-route overnight option in this Map 1 corridor if you confirm county rules, fees, and seasonal availability before planning a split trip.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Mary Brown and finish at Stigman's Mound for the full lower-Map-1 Crow Wing continuation into Nimrod. It stays level-friendly by using the same official DNR gauge as the lower corridor, but the downstream rapids cluster means you should not treat it like a mindless campground float.",
      "accessCaveats": [
        "Mary Brown is a remote carry-in access with few frills, so inspect the launch and parking setup before leaving a vehicle.",
        "Anderson's Crossing is the natural midpoint stop and only clearly documented overnight support on this route.",
        "Wadena County says Stigman's Mound park amenities are reached after landing across the river and walking over the bridge, so have the finish identified before the last mile."
      ],
      "watchFor": [
        "Walkin's Rapids, Burrows Rapids, and Westra Rapids on the downstream half of the route.",
        "Fresh wood, sweepers, and stronger current after storms.",
        "Exposed sandbars and slower travel when the Nimrod gauge is near or below 300 cfs."
      ]
    },
    "accessPoints": [
      {
        "id": "mary-brown-rest-area",
        "name": "Mary Brown Rest Area #5 carry-in access",
        "latitude": 46.71758222409383,
        "longitude": -94.92898508221442,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Full upstream start for the canonical Map 1 corridor route."
      },
      {
        "id": "andersons-crossing",
        "name": "Anderson's Crossing #6 carry-in access",
        "latitude": 46.69942260942251,
        "longitude": -94.88188569131617,
        "mileFromStart": 4.5,
        "segmentKind": "creek",
        "note": "Primary midpoint campground, bailout, and the former short-split take-out."
      },
      {
        "id": "stigmans-mound",
        "name": "Stigman's Mound #7 carry-in access",
        "latitude": 46.64045859179894,
        "longitude": -94.87970389700178,
        "mileFromStart": 9.6,
        "segmentKind": "creek",
        "note": "Canonical downstream finish for the full Map 1 route."
      }
    ]
  },
  "crow-wing-river-andersons-crossing-cottingham": {
    "putIn": {
      "name": "Anderson's Crossing #6 carry-in access",
      "latitude": 46.69942260942251,
      "longitude": -94.88188569131617
    },
    "takeOut": {
      "name": "Cottingham County Park #11 carry-in access",
      "latitude": 46.505529851247346,
      "longitude": -94.80738952007682
    },
    "logistics": {
      "distanceLabel": "21.3 mi",
      "estimatedPaddleTime": "About 7 hr to 9 hr 30 min",
      "shuttle": "Long Wadena County shuttle from Anderson's Crossing to Cottingham. Stage the Cottingham take-out first because it is the busiest landing in this chain and the full route takes enough time that finish logistics matter.",
      "permits": "No special paddling permit is known for this Minnesota DNR water-trail segment. Follow posted county campground, day-use, and parking rules at the named access sites.",
      "camping": "This longer route passes Little White Dog and Knob Hill before finishing at Cottingham, so it has clean documented on-route overnight support if you confirm current Wadena County rules, fees, and seasonal availability before splitting the trip.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Anderson's Crossing and finish at Cottingham for the longest Anderson's-start Crow Wing continuation. The upper half carries the Nimrod-area rapids and the lower half ends in a busier tubing and swimming corridor.",
      "accessCaveats": [
        "Anderson's Crossing is a county campground and simple carry-in launch rather than a polished city-park ramp.",
        "Stigman's Mound, Little White Dog, and Knob Hill are the clearest midpoint bailout or overnight options if the group does not want to commit to the full Cottingham finish.",
        "Cottingham is a county park with heavier summer use for swimming and tubing, so expect a busier and less secluded take-out than the upstream landings."
      ],
      "watchFor": [
        "Walkin's Rapids, Burrows Rapids, and Westra Rapids on the upper half of the route.",
        "Fresh wood, strainers, and stronger current after storms.",
        "Long low-water dragging plus tubing and swimmer traffic near Knob Hill and Cottingham on summer weekends."
      ]
    },
    "accessPoints": [
      {
        "id": "andersons-crossing",
        "name": "Anderson's Crossing #6 carry-in access",
        "latitude": 46.69942260942251,
        "longitude": -94.88188569131617,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Canonical upstream start for the longest Anderson's-to-Cottingham route."
      },
      {
        "id": "stigmans-mound",
        "name": "Stigman's Mound #7 carry-in access",
        "latitude": 46.64045859179894,
        "longitude": -94.87970389700178,
        "mileFromStart": 5.1,
        "segmentKind": "creek",
        "note": "Primary midpoint bailout after the upper rapids-bearing stretch."
      },
      {
        "id": "little-white-dog",
        "name": "Little White Dog County Park #9 carry-in access",
        "latitude": 46.586984884675736,
        "longitude": -94.82261571200662,
        "mileFromStart": 11.5,
        "segmentKind": "creek",
        "note": "County campground midpoint and former shorter canonical finish."
      },
      {
        "id": "knob-hill",
        "name": "Knob Hill Landing #10 carry-in access",
        "latitude": 46.533855996511825,
        "longitude": -94.81849257299048,
        "mileFromStart": 17.8,
        "segmentKind": "creek",
        "note": "Busy downstream campground/tubing access before the final miles."
      },
      {
        "id": "cottingham-county-park",
        "name": "Cottingham County Park #11 carry-in access",
        "latitude": 46.505529851247346,
        "longitude": -94.80738952007682,
        "mileFromStart": 21.3,
        "segmentKind": "creek",
        "note": "Canonical downstream finish for the full Anderson's corridor route."
      }
    ]
  },
  "crow-wing-river-stigmans-mound-little-white-dog": {
    "putIn": {
      "name": "Stigman's Mound #7 carry-in access",
      "latitude": 46.64045859179894,
      "longitude": -94.87970389700178
    },
    "takeOut": {
      "name": "Little White Dog County Park #9 carry-in access",
      "latitude": 46.586984884675736,
      "longitude": -94.82261571200662
    },
    "logistics": {
      "distanceLabel": "6.4 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr 15 min",
      "shuttle": "Short Wadena County car shuttle from Stigman's Mound to Little White Dog. Stage the Little White Dog take-out first because it is the cleaner campground finish and easiest place to sort parking before a half-day paddle.",
      "permits": "No special paddling permit is known for this Minnesota DNR water-trail segment. Follow posted county campground, day-use, and parking rules at Stigman's Mound and Little White Dog.",
      "camping": "Little White Dog is a real endpoint campground with documented county support, while Stigman's Mound is better treated as a launch access and day-use park.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Stigman's Mound and finish at Little White Dog for the shortest cleanly supported Crow Wing county-chain route now in the app. The route is approachable, but it is still a moving sandy river rather than a no-thinking float.",
      "accessCaveats": [
        "Wadena County says Stigman's Mound amenities are reached after landing across the river and walking over the bridge, so have the launch and parking plan clear before leaving a vehicle.",
        "Little White Dog is the cleaner campground finish and best overnight base if you want to stage the shuttle around a short paddle.",
        "Private shoreland dominates outside the designated county landings and campsites."
      ],
      "watchFor": [
        "Exposed sandbars and slower travel when the Nimrod gauge is near or below 300 cfs.",
        "Fresh wood, sweepers, and stronger current after storms.",
        "Blind bends and summer recreation traffic as you approach Little White Dog."
      ]
    },
    "accessPoints": [
      {
        "id": "stigmans-mound",
        "name": "Stigman's Mound #7 carry-in access",
        "latitude": 46.64045859179894,
        "longitude": -94.87970389700178,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Upstream start just below the main Nimrod-area rapids cluster."
      },
      {
        "id": "frames-landing",
        "name": "Frame's Landing public water access",
        "latitude": 46.629663080692076,
        "longitude": -94.86925421200144,
        "mileFromStart": 1.3,
        "segmentKind": "creek",
        "note": "Early bailout and county-campground access on the lower corridor."
      },
      {
        "id": "little-white-dog",
        "name": "Little White Dog County Park #9 carry-in access",
        "latitude": 46.586984884675736,
        "longitude": -94.82261571200662,
        "mileFromStart": 6.4,
        "segmentKind": "creek",
        "note": "Campground-supported downstream finish for the shortest lower-corridor route."
      }
    ]
  },
  "crow-wing-river-stigmans-mound-cottingham": {
    "putIn": {
      "name": "Stigman's Mound #7 carry-in access",
      "latitude": 46.64045859179894,
      "longitude": -94.87970389700178
    },
    "takeOut": {
      "name": "Cottingham County Park #11 carry-in access",
      "latitude": 46.505529851247346,
      "longitude": -94.80738952007682
    },
    "logistics": {
      "distanceLabel": "16.2 mi",
      "estimatedPaddleTime": "About 5 hr 30 min to 7 hr 30 min",
      "shuttle": "Longer Wadena County shuttle from Nimrod to Cottingham. Stage the Cottingham take-out first because it is the busiest landing in this chain and the full route takes enough time that finish logistics matter.",
      "permits": "No special paddling permit is known for this Minnesota DNR water-trail segment. Follow posted county campground, day-use, and parking rules at the named access sites.",
      "camping": "Little White Dog and Knob Hill are clean midpoint campground options before the Cottingham finish, so this route has documented on-route overnight support if you confirm current county rules, fees, and seasonal availability before splitting the trip.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Stigman's Mound and finish at Cottingham for the full Nimrod-downstream county-park chain. The river is straightforward in character, but the mileage, low-water pace, and busier final miles make it a deliberate day.",
      "accessCaveats": [
        "Wadena County says Stigman's Mound amenities are reached after landing across the river and walking over the bridge, so have the launch and parking plan clear before leaving a vehicle.",
        "Little White Dog and Knob Hill are the clearest midpoint bailout or overnight options if the group does not want to commit to the full Cottingham finish.",
        "Cottingham is a county park with heavier summer use for swimming and tubing, so expect a busier and less secluded take-out than the upstream landings."
      ],
      "watchFor": [
        "Long low-water dragging and slower pacing when the Nimrod gauge is near or below 300 cfs.",
        "Fresh wood, strainers, and stronger current after storms.",
        "Tubing, swimmers, and crowded take-out conditions near Knob Hill and Cottingham on summer weekends."
      ]
    },
    "accessPoints": [
      {
        "id": "stigmans-mound",
        "name": "Stigman's Mound #7 carry-in access",
        "latitude": 46.64045859179894,
        "longitude": -94.87970389700178,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Canonical start for the lower Crow Wing county-park chain."
      },
      {
        "id": "frames-landing",
        "name": "Frame's Landing public water access",
        "latitude": 46.629663080692076,
        "longitude": -94.86925421200144,
        "mileFromStart": 1.1,
        "segmentKind": "creek",
        "note": "Short lower-chain public access and former split put-in."
      },
      {
        "id": "little-white-dog",
        "name": "Little White Dog County Park #9 carry-in access",
        "latitude": 46.586984884675736,
        "longitude": -94.82261571200662,
        "mileFromStart": 6.2,
        "segmentKind": "creek",
        "note": "County campground midpoint and easiest lower-chain bailout."
      },
      {
        "id": "knob-hill",
        "name": "Knob Hill Landing #10 carry-in access",
        "latitude": 46.533855996511825,
        "longitude": -94.81849257299048,
        "mileFromStart": 12.7,
        "segmentKind": "creek",
        "note": "Downstream campground/tubing access before the final stretch."
      },
      {
        "id": "cottingham-county-park",
        "name": "Cottingham County Park #11 carry-in access",
        "latitude": 46.505529851247346,
        "longitude": -94.80738952007682,
        "mileFromStart": 16.2,
        "segmentKind": "creek",
        "note": "Canonical downstream finish for the full lower-chain route."
      }
    ]
  },
  "cottonwood-river-juenemann-springfield": {
    "putIn": {
      "name": "Juenemann Landing / County Road 2 public water access",
      "latitude": 44.2034723,
      "longitude": -95.0485134
    },
    "takeOut": {
      "name": "Springfield Public Water Access / Riverside Park canoe landing",
      "latitude": 44.2377827,
      "longitude": -94.9740406
    },
    "logistics": {
      "distanceLabel": "6.4 mi",
      "estimatedPaddleTime": "About 2 hr 15 min to 3 hr 15 min",
      "shuttle": "Plan a short two-car shuttle from County Road 2 / Juenemann Landing to Springfield Riverside Park. This is a compact route, but rural landing conditions can still slow loading and unloading.",
      "permits": "No route-specific paddling permit is known. Brown County lists its Cottonwood canoe landings as day-use April 15 through October 15; follow posted county and city access rules.",
      "camping": "No on-route camping is assumed for this short segment. Treat it as a day trip unless you separately confirm a legal overnight option.",
      "summary": "Launch at Juenemann Landing on County Road 2 and take out at Springfield Riverside Park. This short Cottonwood reach has the gauge at the put-in, so the level call is unusually direct.",
      "accessCaveats": [
        "Juenemann is a Brown County canoe landing on County Road 2 with vehicle parking; the DNR access record does not list a restroom.",
        "Springfield is a carry-in access in Riverside Park with restroom support in the public-access record.",
        "DNR supports the access points and river-level ladder, but this exact short segment is not presented as a highlighted recommended day trip."
      ],
      "watchFor": [
        "Scraping and slow travel when the County Road 2 gauge drops toward the scrapable band.",
        "Deadfall, overhanging trees, and muddy banks after higher water.",
        "Private shoreland; stop only at public accesses or clearly legal sites."
      ]
    }
  },
  "pine-river-rock-dam-harvey-drake": {
    "putIn": {
      "name": "Pine River Rock Dam public water access",
      "latitude": 46.635762,
      "longitude": -94.092075
    },
    "takeOut": {
      "name": "Harvey Drake Public Water Access",
      "latitude": 46.57168,
      "longitude": -94.02806
    },
    "logistics": {
      "distanceLabel": "14.4 mi",
      "estimatedPaddleTime": "About 5 hr to 6 hr 45 min",
      "shuttle": "Plan a full-day two-car shuttle from Rock Dam near Crosslake to Harvey Drake Public Water Access near County Road 11. Confirm rural landing and parking conditions before staging vehicles.",
      "permits": "No route-specific paddling permit is known. Follow posted public-water-access rules at Rock Dam and Harvey Drake.",
      "camping": "Treat this as a day trip unless you separately confirm a legal overnight option. The DNR route is long enough that daylight planning matters.",
      "summary": "Launch at Pine River Rock Dam and take out at Harvey Drake Public Water Access for the DNR lower Pine day trip. The Jenkins DNR gauge gives this wooded route an official level ladder.",
      "accessCaveats": [
        "Rock Dam and Harvey Drake are official Minnesota public-water-access sites, but both are rural landings where parking, mud, and loading space should be checked on arrival.",
        "The route begins at the Rock Dam area; review the DNR map and avoid improvising around dam or rock-riffle infrastructure.",
        "Harvey Drake sits near a bridge crossing and is easier to identify on the map than from the road at speed."
      ],
      "watchFor": [
        "Low-water scraping when the Jenkins gauge falls toward the 35 cfs scrapable floor.",
        "Wood, sweepers, and narrow-channel debris on wooded bends after storms.",
        "Long-route fatigue and cold-water exposure outside midsummer."
      ]
    }
  },
  "pine-river-cross-lake-rock-dam": {
    "putIn": {
      "name": "Pine River, Cross Lake Public Water Access Site",
      "latitude": 46.668515,
      "longitude": -94.112831
    },
    "takeOut": {
      "name": "Pine River, Rock Dam Public Water Access Site",
      "latitude": 46.635762,
      "longitude": -94.092075
    },
    "logistics": {
      "distanceLabel": "4.5 mi",
      "estimatedPaddleTime": "About 1 hr 30 min to 2 hr 30 min",
      "shuttle": "Short two-car shuttle between the USACE Cross Lake access and Rock Dam. Check the Cross Lake dam/outflow area before launching because the gauge is upstream of the reservoir system.",
      "permits": "No route-specific paddling permit is known. Follow posted USACE rules at Cross Lake and DNR Forestry public-access rules at Rock Dam.",
      "camping": "Treat this as a short day route, not an overnight plan. Nearby Crosslake-area campgrounds are separate base-camp decisions and are not on-route river campsites.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at the Cross Lake public access and finish at Rock Dam for the short below-Cross-Lake Pine River connector. The app uses DNR Jenkins bands as an official same-water-trail proxy and flags very low readings conservatively.",
      "accessCaveats": [
        "Cross Lake is an official public-water-access site administered by the U.S. Army Corps of Engineers; Rock Dam is an official DNR Forestry public-water-access site.",
        "The route begins below the Cross Lake dam system, so do not treat the upstream Jenkins gauge as a perfect launch-depth reading.",
        "Rock Dam has parking but no restroom in the public-access record; check take-out conditions before staging a vehicle."
      ],
      "watchFor": [
        "Scraping and exposed rock when Jenkins is below the 35 cfs scrapable floor.",
        "Dam, spillway, or rock-control infrastructure around Cross Lake and Rock Dam.",
        "Wood, strainers, and private banks on the wooded river channel."
      ]
    }
  },
  "minnesota-river-judson-land-of-memories": {
    "putIn": {
      "name": "Judson public water access",
      "latitude": 44.2010236,
      "longitude": -94.1947673
    },
    "takeOut": {
      "name": "Land of Memories Park public water access",
      "latitude": 44.1624934,
      "longitude": -94.0414558
    },
    "logistics": {
      "distanceLabel": "11.1 mi",
      "estimatedPaddleTime": "About 3 hr 45 min to 5 hr",
      "shuttle": "Car shuttle is the practical choice. Stage the take-out vehicle at Land of Memories Park before launching so you are not finishing a long windy day with extra logistics.",
      "permits": "No special paddling permit is known. Follow posted access and parking rules at the Judson landing and at Land of Memories Park.",
      "camping": "Land of Memories Park campground makes this an easy overnight staging option even though the route itself is a day trip.",
      "summary": "Launch at Judson and finish at Land of Memories Park for the DNR-recommended Mankato-area Minnesota River day. The gauge gives a real official flow ladder, but wind and sandbars still matter a lot on this bigger river.",
      "accessCaveats": [
        "Both endpoints now have state-backed public-water-access records, which is the main thing this route was missing before.",
        "Land of Memories is a city park with a real boat landing, but same-day parking and ramp conditions should still be checked before you commit to the shuttle."
      ],
      "watchFor": [
        "Wind and waves on the wider open reaches.",
        "Sandbars and shallower braided sections when flow falls toward the low band.",
        "Floating debris, muddy banks, and busier landing activity near the Mankato finish."
      ]
    }
  },
  "minnesota-river-franklin-mack-lake": {
    "putIn": {
      "name": "Franklin trailer access / city boat landing",
      "latitude": 44.5177553,
      "longitude": -94.8845377
    },
    "takeOut": {
      "name": "Mack Lake Park boat landing",
      "latitude": 44.4585896,
      "longitude": -94.7930696
    },
    "logistics": {
      "distanceLabel": "10.1 mi",
      "estimatedPaddleTime": "About 3 hr 30 min to 5 hr",
      "shuttle": "Plan a two-car shuttle between Franklin and Mack Lake Park. This is short for the Minnesota River, but still a rural big-river shuttle with limited intermediate public exits.",
      "permits": "No route-specific paddling permit is known. Follow City of Franklin rules at the put-in and Renville County park rules at Mack Lake.",
      "camping": "Franklin has free primitive camping by the river access, and Mack Lake Park has rustic county campsites by reservation. Treat either as a separate camping decision, not an assumed part of the day trip.",
      "summary": "Launch at the Franklin city boat landing and take out at Mack Lake Park. DNR recommends this as an easy, winding 10.1-mile Minnesota River day with camping available at both ends.",
      "accessCaveats": [
        "Franklin and Mack Lake are real named public access points, but both are rural landings where same-day parking, mud, and flood debris should be checked before unloading.",
        "The Morton gauge is upstream of Franklin, so use it as a conservative corridor read rather than a perfect at-the-ramp measurement.",
        "Do not casually extend downstream past Mack Lake toward the more difficult Fort Ridgely/Minnesota Falls corridor without separate planning."
      ],
      "watchFor": [
        "Wind and heat exposure on open bends even when the river is technically easy.",
        "Flood debris, muddy landings, and changing sand or bank conditions after high water.",
        "Private shoreland; stop only at public accesses or clearly legal sites."
      ]
    }
  },
  "minnesota-river-henderson-belle-plaine": {
    "putIn": {
      "name": "Henderson Station public water access",
      "latitude": 44.5244176,
      "longitude": -93.8862799
    },
    "takeOut": {
      "name": "Belle Plaine public water access",
      "latitude": 44.6340972,
      "longitude": -93.7653127
    },
    "logistics": {
      "distanceLabel": "17.4 mi",
      "estimatedPaddleTime": "About 5 hr 45 min to 8 hr",
      "shuttle": "Long two-car shuttle. Stage the take-out vehicle at Belle Plaine before launching because this is already a full lower-river day without adding end-of-day driving stress.",
      "permits": "No route-specific paddling permit is known. Follow posted public-water-access and parking rules at Henderson Station and Belle Plaine.",
      "camping": "Treat this as a day trip unless you separately confirm a legal overnight plan. Much of the shoreland is private, and the DNR map explicitly tells paddlers to stop only at designated sites.",
      "summary": "Launch at Henderson Station and finish at Belle Plaine for the DNR lower Minnesota day trip. The Jordan gauge gives this route a real official ladder, but wind, pace, and big-river judgment still matter.",
      "accessCaveats": [
        "Henderson Station is a carry-in with a walk from the gate to the river, not a drive-to-ramp launch.",
        "Belle Plaine is a proper trailer access at County Road 25, but same-day ramp and parking conditions should still be checked before you commit to a long shuttle."
      ],
      "watchFor": [
        "Wind and wave exposure on open lower-river reaches.",
        "A slower-than-expected pace on a 17.4-mile day if the Jordan gauge slips toward the low band.",
        "Floating debris, overhanging trees, and muddy or sandy banks at landings and breaks."
      ]
    }
  },
  "minnesota-river-henderson-station-thompson-ferry": {
    "putIn": {
      "name": "Henderson Station public water access",
      "latitude": 44.5244176,
      "longitude": -93.8862799
    },
    "takeOut": {
      "name": "Thompson Ferry trailer access",
      "latitude": 44.692386,
      "longitude": -93.641157
    },
    "logistics": {
      "distanceLabel": "27.9 mi",
      "estimatedPaddleTime": "About 9 hr to 12 hr",
      "shuttle": "Long two-car shuttle. Stage the Thompson Ferry take-out before launching because this is a full lower-Minnesota commitment day even in favorable wind.",
      "permits": "No route-specific paddling permit is known. Follow posted public-water-access and parking rules at Henderson Station and Thompson Ferry.",
      "camping": "Treat this as a long day trip unless you separately confirm a legal overnight plan. Much of the shoreland is private, and the DNR map tells paddlers to stop only at designated sites.",
      "summary": "Launch at Henderson Station and finish at Thompson Ferry for a full lower Minnesota continuation. The official Jordan ladder is useful, but this route is really about pace, weather, and big-river judgment.",
      "accessCaveats": [
        "Henderson Station is a carry-in with a walk from the gate to the river, not a drive-to-ramp launch.",
        "Thompson Ferry is an official trailer access, but same-day parking, mud, and flood debris should still be checked before committing to the long shuttle.",
        "There are few attractive public exits in the middle of this corridor, so treat the route as a genuine commitment once you launch."
      ],
      "watchFor": [
        "Headwinds and wave exposure on broad lower-river bends.",
        "A slower-than-expected pace on a nearly 28-mile day if the Jordan gauge slips toward the low band.",
        "Floating debris, overhanging trees, and muddy or sandy banks at landings and breaks."
      ]
    }
  },
  "minnesota-river-belle-plaine-thompson-ferry": {
    "putIn": {
      "name": "Belle Plaine public water access",
      "latitude": 44.6340972,
      "longitude": -93.7653127
    },
    "takeOut": {
      "name": "Thompson Ferry trailer access",
      "latitude": 44.692386,
      "longitude": -93.641157
    },
    "logistics": {
      "distanceLabel": "10.5 mi",
      "estimatedPaddleTime": "About 3 hr 30 min to 5 hr 30 min",
      "shuttle": "Moderate lower Minnesota River car shuttle between Belle Plaine and Thompson Ferry. Stage the take-out first so wind or slower current does not complicate pickup.",
      "permits": "No route-specific paddling permit is known. Follow posted public-water-access and parking rules at Belle Plaine and Thompson Ferry.",
      "camping": "No on-route camping is assumed for this lower-river segment. Treat it as a day trip.",
      "summary": "Put in at Belle Plaine and finish at Thompson Ferry for a shorter lower Minnesota continuation. It uses the same official Jordan ladder as the adjacent downstream route.",
      "accessCaveats": [
        "Belle Plaine is a proper trailer access at County Road 25, but same-day ramp and parking conditions should still be checked before launch.",
        "Thompson Ferry is an official public-water-access site near the Jordan gauge, but riverbank mud and flood debris can still vary after high water."
      ],
      "watchFor": [
        "Wind and wave exposure on open bends.",
        "Muddy landings and changing sandbars after high water.",
        "Private shoreland; stop only at public landings or clearly legal sites."
      ]
    }
  },
  "minnesota-river-belle-plaine-carver": {
    "putIn": {
      "name": "Belle Plaine public water access",
      "latitude": 44.6340972,
      "longitude": -93.7653127
    },
    "takeOut": {
      "name": "Carver Riverfront Park / Minnesota River public water access",
      "latitude": 44.766777,
      "longitude": -93.616717
    },
    "logistics": {
      "distanceLabel": "18.6 mi",
      "estimatedPaddleTime": "About 6 hr to 8 hr 30 min",
      "shuttle": "Longer lower Minnesota River car shuttle from Belle Plaine to Carver. Stage the take-out in town before launching so wind or a slower pace does not complicate the finish.",
      "permits": "No route-specific paddling permit is known. Follow posted public-water-access, city park, and parking rules at Belle Plaine and Carver.",
      "camping": "No on-route camping is assumed for this lower-river segment. Treat it as a day trip unless you intentionally stage a separate overnight nearby.",
      "summary": "Put in at Belle Plaine and take out at Carver Riverfront Park for a longer lower Minnesota continuation. It extends the official Thompson-Ferry-to-Carver day while keeping the same Jordan gauge ladder.",
      "accessCaveats": [
        "Belle Plaine is a proper trailer access, but same-day ramp and parking conditions should still be checked before launch.",
        "Carver is an official Minnesota River public-water-access site on the riverfront; use the named access and posted parking rules rather than assuming every nearby riverfront space is a landing.",
        "The lower Minnesota River is broad and exposed enough that wind can matter even when the current itself feels easy."
      ],
      "watchFor": [
        "Wind and wave exposure on open bends.",
        "Flood debris, muddy landings, and changing sandbars after high water.",
        "Private shoreland; stop only at public landings or clearly legal sites."
      ]
    }
  },
  "minnesota-river-thompson-ferry-carver": {
    "putIn": {
      "name": "Thompson Ferry trailer access",
      "latitude": 44.692386,
      "longitude": -93.641157
    },
    "takeOut": {
      "name": "Carver Riverfront Park / Minnesota River public water access",
      "latitude": 44.766777,
      "longitude": -93.616717
    },
    "logistics": {
      "distanceLabel": "8.1 mi",
      "estimatedPaddleTime": "About 2 hr 45 min to 4 hr",
      "shuttle": "Short lower Minnesota River car shuttle from Thompson Ferry north of Jordan to Carver. Stage the take-out in town before launching so wind or a slow current does not complicate pickup.",
      "permits": "No route-specific paddling permit is known. Follow posted public-water-access, city park, and parking rules at Thompson Ferry and Carver.",
      "camping": "No on-route camping is assumed for this short lower-river segment. Treat it as a day trip.",
      "summary": "Put in at Thompson Ferry and take out at Carver Riverfront Park for the DNR Map 6 recommended lower Minnesota day trip. It is shorter than the Henderson-to-Belle Plaine route while using the same official Jordan gauge ladder.",
      "accessCaveats": [
        "Thompson Ferry is an official public-water-access site near the Jordan gauge, but same-day riverbank mud and parking conditions can still vary after high water.",
        "Carver is an official Minnesota River public-water-access site on the riverfront; use the named access and posted parking rules rather than assuming every nearby riverfront space is a landing.",
        "The lower Minnesota River is broad and exposed enough that wind can matter even on an 8-mile route."
      ],
      "watchFor": [
        "Wind and wave exposure on open bends.",
        "Flood debris, muddy landings, and changing sandbars after high water.",
        "Private shoreland; stop only at public landings or clearly legal sites."
      ]
    }
  },
  "mississippi-river-norin-babcock": {
    "putIn": {
      "name": "Mississippi River, Norin Landing Public Water Access Site",
      "latitude": 45.3042771,
      "longitude": -93.683881
    },
    "takeOut": {
      "name": "Mississippi River, Babcock Public Water Access Site",
      "latitude": 45.2897452,
      "longitude": -93.5580094
    },
    "logistics": {
      "distanceLabel": "About 7.6 mi",
      "estimatedPaddleTime": "About 2 hr 15 min to 3.5 hr depending on wind and current",
      "shuttle": "Stage the take-out at Babcock, then drive upstream to Norin Landing. To paddle the full MR 20-style day, continue from Babcock onto the separate Babcock-to-Peninsula Point route.",
      "permits": "No route-specific paddling permit is known. Use the named public-water-access sites and follow posted DNR, City of Otsego, and rest-area rules.",
      "camping": "No camping is assumed for this split. Treat it as a day route or the first leg of a longer MR 20-style paddle.",
      "summary": "Launch at Norin Landing and take out at Babcock for the upper split of the Two Paddles MR 20 course. It is a shorter big-river leg that connects cleanly to the existing Babcock-to-Anoka route.",
      "accessCaveats": [
        "Norin Landing is a City of Otsego public water access on Kadler Avenue with a DNR GIS record, but same-day parking and ramp conditions should still be checked before leaving a vehicle.",
        "Babcock is a DNR-listed Mississippi access at the Babcock Highway Rest Area with limited trailer parking and no restroom in the GIS record.",
        "The Hwy 610 gauge is far downstream of this split and below the Coon Rapids Dam corridor. Use it as a conservative mainstem proxy and make a visual call at Norin before launching."
      ],
      "watchFor": [
        "Low-water gravel, exposed rocks, and slow current when the Hwy 610 gauge is in the low band or falling.",
        "Wind on open bends and slower pools.",
        "Islands, split channels, bridge approaches, and motorboat wakes.",
        "Fresh wood, floating debris, and bank snags after storms or rising water.",
        "Do not commit to the full MR 20 distance unless the group has time, daylight, and a take-out plan for Peninsula Point."
      ]
    }
  },
  "mississippi-river-babcock-peninsula-point": {
    "putIn": {
      "name": "Mississippi River, Babcock Public Water Access Site",
      "latitude": 45.2897452,
      "longitude": -93.5580094
    },
    "takeOut": {
      "name": "Peninsula Point Park / Rum-Mississippi River access",
      "latitude": 45.1924006,
      "longitude": -93.3902433
    },
    "logistics": {
      "distanceLabel": "About 12 mi",
      "estimatedPaddleTime": "About 3.5 hr to 5 hr depending on wind, current, and stops",
      "shuttle": "Set the take-out in Anoka first, then drive upstream to Babcock. This is a longer northwest-metro shuttle, so leave room for traffic near Elk River, Ramsey, Champlin, and downtown Anoka.",
      "permits": "No route-specific paddling permit is known. Use the named public-water-access sites and follow posted DNR, city, county, and park rules at both ends.",
      "camping": "No camping is assumed for this day route. Use public access points and legal public stops rather than treating islands or private banks as overnight options.",
      "summary": "Launch at Babcock and finish at Peninsula Point Park in Anoka for the 12-mile MR 12 Mississippi course. It is a free-flowing big-river day with official access support and a useful downstream Hwy 610 level ladder.",
      "accessCaveats": [
        "Babcock is a DNR-listed Mississippi public water access at the Babcock Highway Rest Area with limited trailer parking and no restroom in the GIS record.",
        "The Anoka finish uses the City of Anoka Rum/Mississippi public water access near Peninsula Point and the Rum River confluence. Confirm the exact landing and event/park conditions before launching.",
        "The Hwy 610 gauge is downstream of the Anoka finish and below the Coon Rapids Dam corridor, so use it as a conservative mainstem proxy and still make a same-day visual call at Babcock."
      ],
      "watchFor": [
        "Low-water slowdowns and exposed bars when the Hwy 610 gauge is in the low band or falling toward scrapable.",
        "Wind across wider bends, especially if the river turns into a headwind.",
        "Motorboat wakes, bridge piers, islands, split channels, and floating debris.",
        "Busy landing traffic near Anoka and the Rum River confluence.",
        "High or rising water above the DNR medium band, which can make strainers, eddies, and ferry angles less forgiving."
      ]
    }
  },
  "mississippi-river-east-river-flats-hidden-falls": {
    "putIn": {
      "name": "East River Flats Park",
      "latitude": 44.9703514,
      "longitude": -93.2350599
    },
    "takeOut": {
      "name": "Hidden Falls Regional Park boat launch",
      "latitude": 44.9040285,
      "longitude": -93.1907475
    },
    "logistics": {
      "distanceLabel": "5 mi",
      "estimatedPaddleTime": "About 1 hr 45 min to 2 hr 15 min",
      "shuttle": "Short Twin Cities car shuttle. Stage the take-out vehicle at Hidden Falls first so the day does not end with lock logistics, city traffic, and a second vehicle problem all at once.",
      "permits": "No route-specific paddling permit is known, but you need to follow posted park rules and current lock or portage guidance. Check same-day closures before committing.",
      "camping": "Not an overnight route. Treat this as a skill-forward urban day trip, not a camp float.",
      "summary": "Launch at East River Flats and finish at Hidden Falls for the official DNR Twin Cities Mississippi trip. The route is short on paper, but the real decisions are current, wakes, wind, and Lock and Dam 1 handling.",
      "accessCaveats": [
        "DNR explicitly names East River Flats Park as the launch, but the launch logistics there are still less clearly documented than the Hidden Falls take-out. Check the access on arrival instead of assuming a trailer-style ramp.",
        "Hidden Falls has posted park hours and can close roads or amenities during flooding, restoration, or other conditions.",
        "Lock and Dam 1 is not a full-time recreational lock. USACE lists recreation lockage for Saturdays, Sundays, major holidays, and Monday/Friday afternoons, says weekday hours can change, and tells boaters to contact lock staff on VHF channel 14, by the pull cord, or at 651-290-5919."
      ],
      "watchFor": [
        "Swift current and large wakes from larger river traffic.",
        "Lock and Dam 1 procedure when the lock is operating; be at the lock at least 30 minutes before posted closure.",
        "A 1.40-mile unsigned Lock and Dam 1 portage if the lock is unavailable. NPS places the take-out on river right about one-third mile upstream of the Ford Bridge and the put-in at the Minnehaha Creek mouth.",
        "Do not use Minnehaha Creek itself as a shortcut around the dam; NPS warns of down trees, rapids, and hazards in the creek.",
        "Wind, floating debris, and muddy landings after recent weather."
      ]
    }
  },
  "mississippi-river-hidden-falls-harriet-island": {
    "putIn": {
      "name": "Hidden Falls Regional Park Mississippi River boat ramp",
      "latitude": 44.904029,
      "longitude": -93.190748
    },
    "takeOut": {
      "name": "Kelley's Landing / Harriet Island",
      "latitude": 44.935466,
      "longitude": -93.100314
    },
    "logistics": {
      "distanceLabel": "6.5 mi",
      "estimatedPaddleTime": "About 2.5 hr to 3.5 hr depending on wind and current",
      "shuttle": "Short Saint Paul shuttle from Hidden Falls to Harriet Island. Confirm the take-out at Kelley's Landing rather than Lambert's Landing, which is farther north on the downtown side.",
      "permits": "No route-specific paddling permit is known. Follow Saint Paul park, dock, and posted landing rules at Hidden Falls and Harriet Island.",
      "camping": "No camping is assumed. This is an urban day trip through Saint Paul.",
      "summary": "Launch at Hidden Falls and take out at Kelley's Landing on Harriet Island for MN DNR's 6.5-mile downstream Twin Cities Mississippi trip.",
      "accessCaveats": [
        "Hidden Falls is the confirmed public boat-ramp put-in; use current park access and flood-closure information before launch.",
        "Kelley's Landing is the Harriet Island-side take-out. Lambert's Landing is not the endpoint for this route.",
        "Saint Paul public dock and park rules may limit docking, tie-up duration, and event-area use."
      ],
      "watchFor": [
        "Swift current, commercial traffic, and large boat wakes through the metro Mississippi corridor.",
        "Changing water color and converging current near the Minnesota River confluence.",
        "Urban debris, bridge piers, wind exposure, and limited casual landing options between official access points."
      ]
    }
  },
  "snake-river-county-road-3-mora": {
    "putIn": {
      "name": "County Road 3 Public Water Access",
      "latitude": 46.0238677,
      "longitude": -93.2319185
    },
    "takeOut": {
      "name": "Canoe Park / Mora Public Water Access",
      "latitude": 45.8820387,
      "longitude": -93.3097238
    },
    "logistics": {
      "distanceLabel": "15 mi",
      "estimatedPaddleTime": "About 5 hr to 6 hr 45 min",
      "shuttle": "Simple two-car shuttle between County Road 3 and Canoe Park in Mora. This is a longer rural Snake day, so leave extra time for shuttle setup and wood scouting.",
      "permits": "No route-specific permit is known. Follow posted local parking and access rules at both public water accesses.",
      "camping": "No simple on-route camping assumption is safe here. Treat this as a day trip unless you separately confirm legal overnight options.",
      "summary": "Launch at County Road 3 and take out at Canoe Park in Mora. This is a full Mora-area Snake day, so both level and weather matter more than on a short park-to-park float.",
      "accessCaveats": [
        "This segment is more local-knowledge driven than the lower state-water-trail park-to-park Snake routes, so access and wood conditions should be confirmed before you commit.",
        "Do not assume storm cleanup has happened after recent high water. This river can pick up new wood quickly."
      ],
      "watchFor": [
        "Low-water dragging when the Pine City gauge falls toward 2.3 ft.",
        "Fresh strainers and obstructions after storms.",
        "Fatigue and weather exposure over a 15-mile day if the pace slows."
      ]
    }
  },
  "north-fork-crow-river-betty-mason-wildlife": {
    "putIn": {
      "name": "Betty T. Mason County Park carry-in access",
      "latitude": 45.189062,
      "longitude": -94.1900403
    },
    "takeOut": {
      "name": "Wildlife County Park carry-in access",
      "latitude": 45.1402417,
      "longitude": -94.1752588
    },
    "logistics": {
      "distanceLabel": "10.2 mi",
      "estimatedPaddleTime": "About 3 hr 30 min to 5 hr",
      "shuttle": "Plan a simple two-car shuttle between the Wright County parks. Wildlife County Park also has a reservable canoe campsite if you are turning this into a longer North Fork plan.",
      "permits": "No route-specific paddling permit is known. Wildlife County Park backcountry canoe camping requires a reservation and fee if used.",
      "camping": "Wildlife County Park offers a backcountry canoe campsite by reservation. Treat this route as a day trip unless that campsite is booked separately.",
      "summary": "Launch at Betty T. Mason County Park and take out at Wildlife County Park. This is a narrow upper North Fork Crow day where the gauge matters, but wood and tight bends still drive the practical decision.",
      "accessCaveats": [
        "Betty T. Mason is an improved but steep carry-in access, so scout the carry before unloading.",
        "Both endpoints are Wright County public river accesses, but park hours and camping rules still apply.",
        "This upper reach is more obstruction-prone than the lower North Fork Crow route already in the app."
      ],
      "watchFor": [
        "Underwater snags, overhanging trees, and strainers on sharp bends.",
        "Possible unlawful fences across the river; DNR asks paddlers to report them.",
        "Low-water scraping below the Cokato medium band and faster current above it."
      ]
    }
  },
  "north-fork-crow-river-rockford-riverside": {
    "putIn": {
      "name": "Rockford Boat Launch / Rockford public water access",
      "latitude": 45.0927624,
      "longitude": -93.7294189
    },
    "takeOut": {
      "name": "Riverside County Park / Riverside Park public water access",
      "latitude": 45.1650523,
      "longitude": -93.6400414
    },
    "logistics": {
      "distanceLabel": "8.5 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr 30 min",
      "shuttle": "Plan a straightforward two-car shuttle from Rockford to Riverside County Park. This is the shorter, cleaner setup upstream of the longer Riverside-to-Dayton route.",
      "permits": "No route-specific paddling permit is known. Follow posted Rockford access rules and Wright County park rules at Riverside County Park.",
      "camping": "Riverside County Park has a primitive canoe campsite by reservation. Treat camping as a separate booking, not an assumed part of this day trip.",
      "summary": "Launch at the Rockford public water access and take out at Riverside County Park near Hanover. DNR describes this as an 8.5-mile possible day trip on a straight, shallow lower North Fork Crow reach.",
      "accessCaveats": [
        "The Rockford access is a small-watercraft launch with moderate bank height and a fishing pier nearby.",
        "Riverside County Park is a real Wright County river-access park. The DNR Riverside guide describes the access as somewhat steep but usable for small boats and canoes.",
        "This route overlaps the same lower-river gauge family as Riverside-to-Dayton; choose this if you want a shorter day."
      ],
      "watchFor": [
        "Shallow gravel, cobble, and boulder sections when the Rockford gauge falls toward the low band.",
        "Fresh wood or debris after high water, even though the DNR guide notes few downed trees during its survey.",
        "Changing landing mud and bank conditions at both accesses after rain."
      ]
    }
  },
  "north-fork-crow-river-riverside-dayton": {
    "putIn": {
      "name": "Riverside County Park carry-in access",
      "latitude": 45.1644165,
      "longitude": -93.6413049
    },
    "takeOut": {
      "name": "Mississippi/Crow rivers trailer access",
      "latitude": 45.2453021,
      "longitude": -93.5212957
    },
    "logistics": {
      "distanceLabel": "15.3 mi",
      "estimatedPaddleTime": "About 5 hr to 7 hr",
      "shuttle": "Standard two-car shuttle. Confirm any county-park or landing parking rules before leaving vehicles for a full day or overnight.",
      "permits": "No route-specific paddling permit is known. Follow posted park, landing, and boating rules at both ends.",
      "camping": "Riverside County Park has a reservable backcountry canoe campsite, but do not assume the trip needs or includes camping unless you book it separately.",
      "summary": "Launch at Riverside County Park near Hanover and take out at the Dayton-area Crow/Mississippi access. This is a long lower-river shuttle day where level still matters because low water drags the pace down quickly.",
      "accessCaveats": [
        "This route is long enough that shuttle timing, parking rules, and daylight matter more than on a quick half-day paddle.",
        "Use posted rules at both landings rather than assuming old forum or trip-report parking details are still current."
      ],
      "watchFor": [
        "Low-water dragging and a slower-than-expected pace when the river falls toward 345 cfs.",
        "Fresh wood, strainers, and debris after storms or rising water.",
        "Fatigue, cold-water exposure, and wind on a 15-mile day even if the gauge looks okay."
      ]
    }
  },
  "south-fork-crow-river-rick-johnson-lake-rebecca": {
    "putIn": {
      "name": "South Fork Crow River boat landing / Rick Johnson Park trailer access",
      "latitude": 44.965047,
      "longitude": -93.845448
    },
    "takeOut": {
      "name": "Lake Rebecca Park Reserve Crow River carry-in access",
      "latitude": 45.079117,
      "longitude": -93.754431
    },
    "logistics": {
      "distanceLabel": "14.3 mi",
      "estimatedPaddleTime": "About 5 hr to 7 hr",
      "shuttle": "Plan a full-day two-car shuttle from Watertown to Lake Rebecca Park Reserve. The take-out is on the North Fork side near the confluence, so review the DNR map before launching.",
      "permits": "No route-specific paddling permit is known. Follow posted Watertown park rules and Three Rivers Park District rules at Lake Rebecca.",
      "camping": "Lake Rebecca has group camping elsewhere in the park reserve, but no route-specific river camping is assumed. Treat this as a day trip unless you book camping separately.",
      "summary": "Start below the Watertown dam at Rick Johnson Park and finish at the Lake Rebecca Crow River carry-in. This is the DNR-recommended full-day South Fork Crow trip through Delano.",
      "accessCaveats": [
        "The put-in is below the Watertown dam; do not launch upstream of the dam or improvise around dam infrastructure.",
        "Lake Rebecca is a large park reserve, so identify the Crow River carry-in and parking area before committing to the shuttle.",
        "The route starts on the South Fork and finishes on the North Fork near the confluence, which can be confusing if you only skim the map."
      ],
      "watchFor": [
        "Fallen trees, submerged snags, and overhanging branches on wooded bends.",
        "Faster current after significant rainfall even when the river is usually gentle.",
        "Private shoreland; stop only at public landings or clearly legal sites."
      ]
    }
  },
  "south-fork-crow-river-otter-lake-masonic": {
    "putIn": {
      "name": "Otter Lake West public water access",
      "latitude": 44.878408,
      "longitude": -94.413719
    },
    "takeOut": {
      "name": "Otter Lake East / Western-Masonic City Park public water access",
      "latitude": 44.892686,
      "longitude": -94.389966
    },
    "logistics": {
      "distanceLabel": "1.6 mi",
      "estimatedPaddleTime": "About 45 min to 1 hr 30 min",
      "shuttle": "Use a short city shuttle or arrange a pickup at Western / Masonic City Park. Scout the take-out before launch because the DNR map places the Hutchinson dam just downstream.",
      "permits": "No route-specific paddling permit is known. Follow City of Hutchinson public-access and park rules, and check any posted parking or event restrictions.",
      "camping": "Western / Masonic City Park has DNR-mapped camping and restroom/drinking-water context, but this route is too short to assume as an on-river overnight. Treat camping as a separate endpoint decision.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Otter Lake West and take out at Western / Masonic City Park for the short Hutchinson South Fork Crow segment. The route is compact, but the dam below the take-out makes the endpoint non-negotiable.",
      "accessCaveats": [
        "Both endpoints are official Minnesota public-water-access sites administered by the City of Hutchinson.",
        "The Otter Lake West access has restroom support in the public-access record; Otter Lake East / Western-Masonic has parking but no restroom listed in that record.",
        "The Hutchinson gauge is downstream of the route and below the dam boundary, so use it as a same-corridor reading and still inspect local depth and current."
      ],
      "watchFor": [
        "Mandatory take-out discipline above the dam at river mile 66.7.",
        "Logjams, submerged snags, overhanging trees, and faster current after significant rainfall.",
        "Wind, shallow lake margins, and local access traffic around Otter Lake."
      ]
    }
  },
  "minnehaha-creek-grays-bay-longfellow-lagoon": {
    "putIn": {
      "id": "headwaters",
      "name": "Gray's Bay headwaters",
      "latitude": 44.953252,
      "longitude": -93.487488
    },
    "takeOut": {
      "id": "longfellow-lagoon",
      "name": "Longfellow Lagoon",
      "latitude": 44.961125473,
      "longitude": -93.215049079
    },
    "logistics": {
      "distanceLabel": "21.3 mi",
      "estimatedPaddleTime": "About 7 hr to 9 hr 45 min",
      "shuttle": "Use the official access list to build a shorter one-way segment or run the whole creek with a long urban shuttle. The planner is the right way to use this corridor.",
      "permits": "No route-specific paddling permit is known. Follow local park, trail, and landing rules anywhere you stage vehicles along the creek.",
      "camping": "No camping is part of this route. Treat Minnehaha as a day-trip corridor with many shorter segment options.",
      "summary": "The official MCWD access list turns Minnehaha into a choose-your-segment corridor. Use the planner below instead of assuming one default put-in and take-out.",
      "accessCaveats": [
        "Several official access points are parks or roadside landings rather than formal ramps. Confirm parking, legal access, and any current closures on the ground.",
        "Required portages around dams and lake transitions matter as much as the gauge on this creek."
      ],
      "watchFor": [
        "Low bridges, wood, rocks, and fast current after rain, especially when flows rise toward or above 150 cfs.",
        "Required portages around the Edina Mills dam, the 54th Street dam, and the Lake Nokomis transition.",
        "Urban access complexity. Use only the designated MCWD landing points rather than random bank openings."
      ]
    },
    "accessPoints": [
      {
        "id": "headwaters",
        "name": "Gray's Bay headwaters",
        "latitude": 44.953252,
        "longitude": -93.487488,
        "mileFromStart": 0,
        "segmentKind": "lake",
        "note": "Official creek start below Gray's Bay Dam."
      },
      {
        "id": "jidana-park",
        "name": "Jidana Park",
        "latitude": 44.941860141,
        "longitude": -93.477039156,
        "mileFromStart": 0.8,
        "segmentKind": "lake",
        "note": "Small early access if you want to skip the first headwaters mile."
      },
      {
        "id": "minnetonka-civic-center",
        "name": "Minnetonka Civic Center",
        "mileFromStart": 1.6,
        "segmentKind": "lake",
        "note": "Official civic-center access on the upper creek."
      },
      {
        "id": "burwell-park",
        "name": "Burwell Park",
        "mileFromStart": 2.4,
        "segmentKind": "lake",
        "note": "Official upper-creek park access."
      },
      {
        "id": "big-willow-park",
        "name": "Big Willow Park",
        "mileFromStart": 3.2,
        "segmentKind": "lake",
        "note": "Upper-creek park access before the more road-adjacent segment options."
      },
      {
        "id": "hopkins-crossroad",
        "name": "Hopkins Crossroad",
        "mileFromStart": 4.2,
        "segmentKind": "lake",
        "note": "Useful upper-creek split point if you want a shorter western segment."
      },
      {
        "id": "minnetonka-boulevard-bridge",
        "name": "Minnetonka Boulevard Bridge",
        "latitude": 44.9452789,
        "longitude": -93.4055478,
        "mileFromStart": 5.4,
        "segmentKind": "lake",
        "note": "Roadside access as the creek starts to feel less like the upper headwaters lakes."
      },
      {
        "id": "knollwood-target",
        "name": "Knollwood Target",
        "latitude": 44.9473441,
        "longitude": -93.389443823,
        "mileFromStart": 6.8,
        "segmentKind": "transition",
        "note": "Official parking access, but less clean as a landing than Creekside Park farther downstream."
      },
      {
        "id": "creekside-park",
        "name": "Creekside Park",
        "latitude": 44.930522365,
        "longitude": -93.373441764,
        "mileFromStart": 8,
        "segmentKind": "transition",
        "note": "Cleaner designated park take-out than the retail Knollwood lot."
      },
      {
        "id": "louisiana-avenue",
        "name": "Louisiana Avenue",
        "latitude": 44.92872352,
        "longitude": -93.364853081,
        "mileFromStart": 8.9,
        "segmentKind": "transition",
        "note": "Shorter-day option just downstream of Creekside Park."
      },
      {
        "id": "browndale-avenue",
        "name": "Browndale Avenue",
        "mileFromStart": 11.6,
        "segmentKind": "transition",
        "note": "Official access near the required Edina Mills dam portage."
      },
      {
        "id": "utley-park",
        "name": "Utley Park",
        "mileFromStart": 11.7,
        "segmentKind": "transition",
        "note": "Useful mid-creek access immediately below the Edina Mills portage area."
      },
      {
        "id": "arden-park",
        "name": "Arden Park / W 54th Street",
        "latitude": 44.905593159,
        "longitude": -93.333884296,
        "mileFromStart": 12.7,
        "segmentKind": "transition",
        "note": "Official access near another required portage around the 54th Street dam."
      },
      {
        "id": "lynnhurst-park",
        "name": "Lynnhurst Park",
        "latitude": 44.911466826,
        "longitude": -93.29882246,
        "mileFromStart": 15.7,
        "segmentKind": "transition",
        "note": "Popular middle-to-lower creek park access."
      },
      {
        "id": "lake-nokomis",
        "name": "Lake Nokomis",
        "latitude": 44.915882352,
        "longitude": -93.242957411,
        "mileFromStart": 19.4,
        "segmentKind": "creek",
        "note": "A portage is required to enter Lake Nokomis."
      },
      {
        "id": "lake-hiawatha",
        "name": "Lake Hiawatha",
        "latitude": 44.918693381,
        "longitude": -93.232164201,
        "mileFromStart": 20.1,
        "segmentKind": "creek",
        "note": "Lower-creek access after the Nokomis transition."
      },
      {
        "id": "longfellow-lagoon",
        "name": "Longfellow Lagoon",
        "latitude": 44.961125473,
        "longitude": -93.215049079,
        "mileFromStart": 21.3,
        "segmentKind": "creek",
        "note": "Official route end before Minnehaha Falls."
      }
    ]
  },
  "cloquet-river-island-lake-bachelor-road": {
    "putIn": {
      "name": "Island Lake Dam carry-in access",
      "latitude": 46.9912948,
      "longitude": -92.225418
    },
    "takeOut": {
      "name": "Bachelor Road trailer access",
      "latitude": 46.9521455,
      "longitude": -92.3270784
    },
    "logistics": {
      "distanceLabel": "8.1 mi",
      "estimatedPaddleTime": "About 2 hr 30 min to 4 hr 30 min",
      "shuttle": "Standard two-car shuttle below Island Lake. Stage the take-out first because cell coverage can be spotty and the dam launch is the less convenient place to solve a shuttle mistake.",
      "permits": "No route-specific paddling permit is known. Follow posted DNR access and camping rules, and respect any same-day release or site notices.",
      "camping": "MN DNR says this section has numerous primitive first-come watercraft campsites, but most parties will treat Island Lake Dam to Bachelor Road as a day trip.",
      "summary": "Launch below Island Lake Dam and finish at Bachelor Road for the DNR-recommended lower Cloquet day. Use the direct gauge to avoid scrape-level releases, then make the on-river call based on rapids, scouting comfort, and same-day conditions.",
      "accessCaveats": [
        "The official DNR map clearly names both endpoints, but the saved coordinates are still arrival guidance rather than a substitute for same-day signage and map checks.",
        "Bachelor Road is a real public trailer access on the official Cloquet water-trail map, but it is not backed here by a richer standalone facility page with parking rules and amenities.",
        "The put-in is below a dam and the segment depends on releases, so same-day conditions can differ more than the raw number suggests."
      ],
      "watchFor": [
        "Class I-II rapids that deserve scouting and occasional portaging.",
        "Scraping and short river walks when releases hover near the 175 cfs floor.",
        "Fresh wood, cold water, and fast current changes after storms or release shifts."
      ]
    }
  },
  "zumbro-river-falls": {
    "putIn": {
      "name": "Green Bridge (Zumbro River)",
      "latitude": 44.2335481,
      "longitude": -92.4820266
    },
    "takeOut": {
      "name": "Zumbro Falls access",
      "latitude": 44.2833001,
      "longitude": -92.4221257
    },
    "logistics": {
      "distanceLabel": "9.7 mi",
      "estimatedPaddleTime": "About 3 hr 15 min to 4 hr 30 min",
      "shuttle": "Two-car shuttle works best. If you use a paid shuttle, confirm pickup and parking rules locally.",
      "permits": "No general paddling permit indicated. Follow posted access and parking rules.",
      "camping": "Treat this as a day trip unless you have explicit campsite confirmation or landowner permission.",
      "summary": "Use Green Bridge as the put-in and Zumbro Falls as the take-out. Plan a two-car shuttle and verify access or parking rules locally before you commit.",
      "accessCaveats": [
        "Green Bridge is a simple carry-in access, so confirm where to park before staging vehicles.",
        "Take-out details at Zumbro Falls are best confirmed on the ground before you leave a car."
      ],
      "watchFor": [
        "Flash flooding after heavy rain can turn this lively reach into a no-go quickly.",
        "Logs, sweepers, and fresh strainers after storms.",
        "Cold-water risk in shoulder seasons."
      ]
    }
  },
  "rice-creek-peltier-to-long-lake": {
    "putIn": {
      "id": "peltier-lake",
      "name": "Peltier Lake public boat launch (Lino Lakes)",
      "latitude": 45.175054,
      "longitude": -93.0701588
    },
    "takeOut": {
      "id": "long-lake",
      "name": "Long Lake Regional Park / Long Lake (New Brighton)",
      "latitude": 45.0805227,
      "longitude": -93.1994956
    },
    "logistics": {
      "distanceLabel": "15.2 mi",
      "estimatedPaddleTime": "About 5 hr to 7 hr",
      "shuttle": "Self-shuttle is typical, and multiple intermediate landings make shorter one-way options possible.",
      "permits": "No paddling permit noted. Check local park rules at launch and take-out.",
      "camping": "No camping noted for this day-use water trail.",
      "summary": "The upper miles are mostly lake crossings before the creek narrows. Fish-barrier status, lake wind, and intermediate exits matter almost as much as the gauge.",
      "accessCaveats": [
        "Multiple intermediate landings make it easy to shorten the route if wind or time becomes a problem.",
        "An electric fish barrier near Long Lake may require a marked portage depending on posted conditions."
      ],
      "watchFor": [
        "Wind and chop on the opening lake chain.",
        "High-water or low-water culvert issues, especially between Baldwin Lake and I-35W.",
        "Fallen trees and the Long Lake fish-barrier portage decision."
      ]
    },
    "accessPoints": [
      {
        "id": "peltier-lake",
        "name": "Peltier Lake boat launch",
        "latitude": 45.175054,
        "longitude": -93.0701588,
        "mileFromStart": 0,
        "segmentKind": "lake",
        "note": "Full trail start just below the Peltier Lake dam."
      },
      {
        "id": "george-watch-lake",
        "name": "George Watch Lake carry-in",
        "latitude": 45.1747078,
        "longitude": -93.0902356,
        "mileFromStart": 1.4,
        "segmentKind": "lake",
        "note": "Skips the first lake mile and keeps the route in the open-water chain."
      },
      {
        "id": "reshanau-lake",
        "name": "Reshanau Lake carry-in",
        "latitude": 45.1529228,
        "longitude": -93.0978098,
        "mileFromStart": 3.6,
        "segmentKind": "lake",
        "note": "Mid-lakes access for a shorter chain-of-lakes start."
      },
      {
        "id": "aqua-lane",
        "name": "Aqua Lane canoe launch",
        "latitude": 45.163501,
        "longitude": -93.1154659,
        "mileFromStart": 4.8,
        "segmentKind": "transition",
        "note": "Useful early take-out or downstream restart after the upper lake chain."
      },
      {
        "id": "baldwin-lake",
        "name": "Baldwin Lake carry-in",
        "latitude": 45.1383968,
        "longitude": -93.1359875,
        "mileFromStart": 5.7,
        "segmentKind": "transition",
        "note": "Best split point between the upper lake chain and the narrower downstream creek miles."
      },
      {
        "id": "east-golden-lake-lane",
        "name": "East Golden Lake Lane access",
        "latitude": 45.1348215,
        "longitude": -93.1471925,
        "mileFromStart": 6.8,
        "segmentKind": "creek",
        "note": "Convenient shorter-day access once the route leaves the lake-focused miles behind."
      },
      {
        "id": "lexington-avenue",
        "name": "Lexington Avenue access",
        "latitude": 45.1196142,
        "longitude": -93.1647156,
        "mileFromStart": 9.1,
        "segmentKind": "creek",
        "note": "Mid-creek landing for a shorter downstream option or bailout before the final miles."
      },
      {
        "id": "county-road-i",
        "name": "County Road I access",
        "latitude": 45.1088417,
        "longitude": -93.1840952,
        "mileFromStart": 11,
        "segmentKind": "creek",
        "note": "Common shorter-day take-out. High water can force a portage here."
      },
      {
        "id": "old-highway-8",
        "name": "Old Highway 8 access",
        "latitude": 45.0936178,
        "longitude": -93.1922582,
        "mileFromStart": 13.5,
        "segmentKind": "creek",
        "note": "Late-route access if you want to skip the final stretch into Long Lake."
      },
      {
        "id": "long-lake",
        "name": "Long Lake Regional Park",
        "latitude": 45.0805227,
        "longitude": -93.1994956,
        "mileFromStart": 15.2,
        "segmentKind": "creek",
        "note": "Full downstream finish. Watch fish-barrier status near Long Lake."
      }
    ]
  },
  "kettle-river-lower-kettle-5-to-6": {
    "putIn": {
      "name": "#5 trailer access (Kettle River State Water Trail - Map 2)",
      "latitude": 46.0107725,
      "longitude": -92.8407339
    },
    "takeOut": {
      "name": "#6 trailer access (Kettle River State Water Trail - Map 2)",
      "latitude": 45.9451305,
      "longitude": -92.7769513
    },
    "logistics": {
      "distanceLabel": "7.2 river mi",
      "estimatedPaddleTime": "About 2 hr 30 min to 3 hr 15 min",
      "shuttle": "Plan a car shuttle. Exact driving distance varies by route taken, so confirm your pickup plan before launching.",
      "permits": "No permit for general day paddling is noted. Follow any posted landing or parking rules at the trailer accesses.",
      "camping": "No route camping is indicated for this exact day-trip segment. Verify state-park or water-trail options separately before planning an overnight.",
      "summary": "The official Map 2 reach is a mostly-flatwater day trip with one Class I rapid around river mile 11. Use the Sandstone gauge as a trend check and stay conservative after rain.",
      "accessCaveats": [
        "The route pair and mileage are backed by MN DNR Map 2, but landing amenities and seasonal closures still need on-site confirmation.",
        "Verify parking and launch conditions at both trailer accesses before you leave a shuttle vehicle."
      ],
      "watchFor": [
        "Debris or strainers after storms and in high water.",
        "The Class I rapid around river mile 11.",
        "Cold-water risk in shoulder seasons."
      ]
    }
  },
  "whitewater-river-elba-highway-74": {
    "putIn": {
      "name": "Elba / Highway 26 and Center Street access",
      "latitude": 44.09185,
      "longitude": -92.01381
    },
    "takeOut": {
      "name": "Highway 74 roadside take-out near Whitewater WMA",
      "latitude": 44.14973,
      "longitude": -92.00558
    },
    "logistics": {
      "distanceLabel": "About 10.4 river mi",
      "estimatedPaddleTime": "About 3 hr 30 min to 5 hr",
      "shuttle": "Short road shuttle between Elba and the Highway 74 take-out. Because these are less polished roadside-style accesses, confirm legal parking and the exact take-out before launching.",
      "permits": "No special paddling permit is known for the Minnesota DNR Whitewater River State Water Trail. Follow posted WMA, roadside parking, and boating rules.",
      "camping": "MN DNR says there are no campsites or rest areas on the Whitewater River State Water Trail. Whitewater State Park is an off-river nearby campground/base-camp option if you need an overnight base.",
      "summary": "Put in at Elba and take out where the river comes back to Highway 74. This is a narrow, wood-sensitive creek route, so the DNR gauge is only the first screen; current strainers and logjams still decide the day.",
      "accessCaveats": [
        "The access story is still less polished than named park landings. MilesPaddled and Post Bulletin reports support the same access pair, but verify legal parking and the exact take-out before committing to the shuttle.",
        "MN DNR notes ecological sensitivity in the Whitewater WMA, so stay on legal accesses and avoid creating informal stops."
      ],
      "watchFor": [
        "Deadfall, strainers, and occasional logjam portages.",
        "Fast current and fewer recovery options when the Beaver gauge rises into high water.",
        "Scraping and extra dragging when the gauge drops below the medium band."
      ]
    }
  },
  "south-fork-zumbro-lake-zumbro": {
    "putIn": {
      "name": "90th Street NW footbridge access",
      "latitude": 44.12967,
      "longitude": -92.46227
    },
    "takeOut": {
      "name": "Lake Zumbro County Park canoe/kayak launch",
      "latitude": 44.17933,
      "longitude": -92.46266
    },
    "logistics": {
      "distanceLabel": "5 mi",
      "estimatedPaddleTime": "About 1 hr 45 min to 2 hr 15 min",
      "shuttle": "Two-car shuttle is simplest. A bike shuttle is possible, but expect a mix of gravel and pavement.",
      "permits": "No permit noted for this reach.",
      "camping": "No camping noted for this reach.",
      "summary": "Use the 90th Street NW access as the put-in and Lake Zumbro County Park as the take-out. The route is short, but wind on the reservoir finish still changes the day.",
      "accessCaveats": [
        "The 90th Street NW put-in is still based on bridge/location context rather than a clearly documented public canoe launch listing, but MnDOT does at least anchor the exact footbridge location as Frank's Ford Bridge.",
        "Lake Zumbro County Park has a county-documented separate canoe/kayak launch, but confirm day-use parking rules on arrival."
      ],
      "watchFor": [
        "Rapid rises after rain on the Zumbro system.",
        "Snags or wood that change after storms.",
        "Wind exposure on Lake Zumbro near the finish."
      ]
    }
  },
  "zumbro-river-theilman-kruger": {
    "putIn": {
      "name": "Theilman Access (off Hwy 4)",
      "latitude": 44.28675,
      "longitude": -92.1867
    },
    "takeOut": {
      "name": "Kruger Access (off Hwy 81)",
      "latitude": 44.33728,
      "longitude": -92.07724
    },
    "logistics": {
      "distanceLabel": "10.75 mi",
      "estimatedPaddleTime": "About 3 hr 30 min to 5 hr",
      "shuttle": "Car shuttle is recommended. A bike shuttle is possible, but it is longer and rougher than the more polished river-town shuttles upstream.",
      "permits": "No state water-trail permit is required. Confirm parking, fees, and any posted access rules before leaving a vehicle.",
      "camping": "Nearby Dorer and Kruger camping options exist, but confirm them separately. Treat this segment as a day trip by default.",
      "summary": "Put in at Theilman and take out at Kruger for a quieter lower-Zumbro day. The same Zumbro Falls gauge still matters here, but the route feels more remote and storm-changed wood matters more.",
      "accessCaveats": [
        "Both accesses are supported by MN DNR route materials, but same-day parking and landing conditions should still be checked on arrival.",
        "Kruger is the cleaner downstream landing, but this reach is still remote enough that shuttle timing and backup plans matter."
      ],
      "watchFor": [
        "Fast rises after rain and fresh debris on blind bends.",
        "Muddy or poor intermediate stopovers if you need to get off early.",
        "Cold-water exposure and limited bailout options compared with the upper Zumbro reaches."
      ]
    }
  },
  "zumbro-river-kruger-west-newton": {
    "putIn": {
      "name": "Kruger Access (off Hwy 81)",
      "latitude": 44.3372,
      "longitude": -92.07725
    },
    "takeOut": {
      "name": "West Newton Public Boat Launch",
      "latitude": 44.28408,
      "longitude": -91.92677
    },
    "logistics": {
      "distanceLabel": "12 mi",
      "estimatedPaddleTime": "About 4 hr to 5 hr 30 min",
      "shuttle": "Two-car shuttle is the practical choice. Do not assume a bike shuttle is pleasant on these rural roads without checking shoulders and traffic first.",
      "permits": "No general paddling permit is known for this reach. Confirm parking and launch rules at West Newton before you commit to the shuttle.",
      "camping": "No on-route camping is confirmed for this segment. Plan it as a day trip unless you have a separate Mississippi overnight plan.",
      "summary": "Put in at Kruger and take out at West Newton where the Zumbro meets the Mississippi corridor. The lower river is still mostly easy, but the finish is less sheltered and more exposed to wind and bigger-water traffic.",
      "accessCaveats": [
        "Kruger is straightforward, but the West Newton take-out deserves a same-day parking and landing check because it is part of a larger river environment.",
        "Do not treat the Mississippi finish like a small-river landing if wind or boat traffic looks active."
      ],
      "watchFor": [
        "Snags and storm-changed wood on the lower Zumbro.",
        "Wind-driven chop or motorboat traffic near the Mississippi take-out.",
        "Cold water and quick level changes in spring or after heavy rain."
      ]
    }
  },
  "cannon-river-faribault-dundas": {
    "putIn": {
      "name": "Two Rivers Park canoe landing",
      "latitude": 44.31067,
      "longitude": -93.27087
    },
    "takeOut": {
      "name": "Highway 1 Canoe Landing (Dundas)",
      "latitude": 44.43033,
      "longitude": -93.20531
    },
    "logistics": {
      "distanceLabel": "13.75 mi",
      "estimatedPaddleTime": "About 4 hr 30 min to 6 hr 15 min",
      "shuttle": "Car shuttle is simplest. A bike shuttle is possible when trail conditions line up, but confirm routing before you commit to highway shoulders.",
      "permits": "No route-specific paddling permit is known. Follow posted parking or landing rules at Two Rivers Park and the Highway 1 landing.",
      "camping": "Treat this as a day trip unless you have already confirmed a legal overnight option elsewhere on the Cannon corridor.",
      "summary": "Launch at Two Rivers Park in Faribault and finish at the Highway 1 Canoe Landing in Dundas. The reach is friendly at workable flow, but it is long enough that low-water riffles and post-rain debris still change the decision.",
      "accessCaveats": [
        "The Two Rivers landing is more hidden and less polished than the park lot suggests, so walk it before unloading boats.",
        "The Highway 1 take-out below the bridge is marked but easy to miss from upstream if you have not looked at it first.",
        "Parking at the Dundas take-out is limited, so settle the shuttle plan before launching."
      ],
      "watchFor": [
        "Low-water riffles and occasional scraping near the floor.",
        "Snags, log piles, and fresh debris after higher water.",
        "Longer-mileage fatigue on hot or windy days."
      ]
    }
  },
  "pomme-de-terre-river-larson-appleton": {
    "putIn": {
      "name": "Larson Landing public water access",
      "latitude": 45.239322,
      "longitude": -95.98509
    },
    "takeOut": {
      "name": "Appleton public water access",
      "latitude": 45.203137,
      "longitude": -96.020898
    },
    "logistics": {
      "distanceLabel": "6 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr",
      "shuttle": "Short Appleton-area car shuttle. This is an easy logistics day, so most groups will just stage the take-out first and keep it simple.",
      "permits": "No special paddling permit is known. Follow posted public-water-access and local parking rules at both landings.",
      "camping": "Treat this as a day trip unless you separately confirm legal overnight options nearby.",
      "summary": "Launch at Larson Landing and finish at Appleton for the clearest short beginner trip on the lower Pomme de Terre. The gauge decision is straightforward, but low water, wood, and wind can still change the feel of the day.",
      "accessCaveats": [
        "Both endpoints are backed by Minnesota public-water-access records, which is the main trust reason this route clears the bar cleanly.",
        "Appleton is the stronger landmarked finish because the live gauge and route town line up there, but same-day landing and parking signage should still win over any saved note."
      ],
      "watchFor": [
        "Dragging and scrape-heavy shallow spots when Appleton drops toward 3.5 ft.",
        "Fresh wood or strainers after storms or fast rises.",
        "Wind exposure on the more open lower-river bends approaching Appleton."
      ]
    }
  },
  "long-prairie-river-long-prairie-browerville": {
    "putIn": {
      "name": "Long Prairie public water access",
      "latitude": 45.975537,
      "longitude": -94.865877
    },
    "takeOut": {
      "name": "Browerville public water access",
      "latitude": 46.076399,
      "longitude": -94.858487
    },
    "logistics": {
      "distanceLabel": "13.3 mi",
      "estimatedPaddleTime": "About 4 hr 30 min to 6 hr 30 min",
      "shuttle": "Simple two-town car shuttle on local roads. Most groups should look at the Browerville exit first, leave a car there, and keep the rest of the day uncomplicated.",
      "permits": "No special paddling permit is known. Follow posted public-water-access and local parking rules at both city carry-ins.",
      "camping": "Treat this as a day trip unless you separately confirm legal camping nearby.",
      "summary": "Launch in Long Prairie and finish in Browerville for a full meandering day between two clear city accesses. Gauge level is the main call; low summer water and fresh wood are the main quality changers.",
      "accessCaveats": [
        "Both endpoints are backed by Minnesota public-water-access records, which is the key reason this route clears the endpoint bar cleanly.",
        "These are carry-in city accesses rather than deluxe ramp facilities, so verify parking layout and carry path on arrival instead of assuming the shoreline setup from a map pin alone."
      ],
      "watchFor": [
        "Dragging and scrape-heavy shallow spots when Long Prairie drops toward 53 cfs.",
        "Tight bends, fresh wood, and blind-corner strainers after storms or fast rises.",
        "A longer full-day pace than the shorter beginner routes in the app, especially if the current is soft."
      ]
    }
  },
  "big-fork-river-highway-1-highway-6-south": {
    "putIn": {
      "name": "State Highway 1 carry-in access",
      "latitude": 47.84043782419257,
      "longitude": -93.50349149920625
    },
    "takeOut": {
      "name": "Highway 6 South / State Hwy 6 Bridge carry-in access",
      "latitude": 47.95302296444459,
      "longitude": -93.75498797729725
    },
    "logistics": {
      "distanceLabel": "32.3 mi",
      "estimatedPaddleTime": "Overnight or very long advanced day; roughly 12 hr to 16 hr of moving-water time",
      "shuttle": "Stage the take-out at Highway 6 South / Craigsville before driving to the Highway 1 carry-in. This is a remote northern shuttle and should normally be planned as an overnight with daylight margin for portages.",
      "permits": "No route-specific paddling permit is known. Follow DNR water-trail rules, posted public-access rules, and state/county forest camping and firewood rules.",
      "camping": "DNR Map 1 names Busticogan, Muldoon, Little American Falls, and Old Hudson Bay Farm watercraft campsites along this route. Treat them as first-come and carry a backup plan because the corridor is remote.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Highway 1 and finish at Highway 6 South for the upstream Big Fork section above the existing Highway 6 South-to-North card. The route includes remote campsites, Muldoon Rapids, and the mandatory Little American Falls portage.",
      "accessCaveats": [
        "Highway 1 and Highway 6 South are official public accesses, but both are remote carry-in landings; inspect parking, mud, and launch condition before leaving a vehicle.",
        "Little American Falls is not an optional casual feature. General paddlers should portage left and budget time for a steep or brushy carry. A county campground and picnic area are nearby but require a climb from river level.",
        "This route is too long to improvise late in the day. If campsites are occupied, weather changes, or water is lower than expected, shorten the plan rather than forcing the full distance."
      ],
      "watchFor": [
        "Muldoon Rapids, a bouldery Class II reach with a mapped river-right half-mile portage and larger waves in high water.",
        "Little American Falls, a Class IV-V six-foot ledge that DNR says should be portaged by all but the most experienced paddlers.",
        "Rocky low-water rapids, brushy portages, cold water, fresh strainers, limited cell service, and long rescue exposure.",
        "High or rising water that makes rapids, portage landings, and loaded-boat handling much more consequential."
      ]
    },
    "accessPoints": [
      {
        "id": "highway-1-carry-in",
        "name": "State Highway 1 carry-in access",
        "latitude": 47.84043782419257,
        "longitude": -93.50349149920625,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at DNR Map 1 river mile 123.8."
      },
      {
        "id": "busticogan-campsite",
        "name": "Busticogan watercraft campsite",
        "latitude": 47.8412,
        "longitude": -93.5192,
        "mileFromStart": 0.8,
        "segmentKind": "creek",
        "note": "Mapped watercraft campsite shortly below Highway 1; approximate coordinates from DNR river-mile context."
      },
      {
        "id": "muldoon-rapids-portage",
        "name": "Muldoon Rapids portage",
        "latitude": 47.8788,
        "longitude": -93.5965,
        "mileFromStart": 8.8,
        "segmentKind": "transition",
        "note": "Class II rapid zone with mapped river-right half-mile portage; approximate coordinates from DNR river-mile context."
      },
      {
        "id": "little-american-falls-portage",
        "name": "Little American Falls portage",
        "latitude": 47.9306,
        "longitude": -93.6368,
        "mileFromStart": 19,
        "segmentKind": "transition",
        "note": "Mandatory Class IV-V falls portage for general paddlers; approximate coordinates from DNR river-mile context."
      },
      {
        "id": "highway-6-south",
        "name": "Highway 6 South / State Hwy 6 Bridge carry-in access",
        "latitude": 47.95302296444459,
        "longitude": -93.75498797729725,
        "mileFromStart": 32.3,
        "segmentKind": "creek",
        "note": "Default take-out beside the Craigsville / Highway 6 South DNR gauge."
      }
    ]
  },
  "chippewa-river-swift-county-norby": {
    "putIn": {
      "name": "Chippewa River, Swift County Public Water Access Site",
      "latitude": 45.3218192,
      "longitude": -95.6174738
    },
    "takeOut": {
      "name": "Chippewa River, Norby Landing Public Water Access Site",
      "latitude": 45.2047915,
      "longitude": -95.6643308
    },
    "logistics": {
      "distanceLabel": "11.9 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr depending on level, wind, and wood",
      "shuttle": "Set a rural two-car shuttle from Norby Landing back to the Benson-area Swift County access. Inspect Norby first because the take-out is a dedicated public access but the surrounding banks are private.",
      "permits": "No route-specific paddling permit is known. Use the named public accesses, follow posted MN DNR / local access rules, and check Minnesota boating and PFD requirements.",
      "camping": "No established watercraft campsite is documented for this public-access gap. Plan it as a day trip and do not use private banks for informal camping.",
      "campingClassification": "none",
      "summary": "Launch at the Swift County public access and take out at Norby Landing for an 11.9-mile upper-Chippewa day above the existing Lentz-to-Watson route. The Benson DNR gauge is directly on this reach and publishes official paddling bands.",
      "accessCaveats": [
        "Minnesota public-water-access GIS resolves the Swift County access as WAS01373 near Chippewa River mile 52.0 and Norby Landing as WAS01651 near river mile 40.1.",
        "This is a rural access-to-access day with limited public bailout. Keep stops to clearly public landings unless you have permission.",
        "The route is not a campground route; camping must be arranged separately off-route."
      ],
      "watchFor": [
        "Low-water scraping and shallow riffles when Benson is below the official medium band.",
        "Snags, fallen trees, and outside-bend wood, especially after rain or wind.",
        "Open prairie wind, muddy banks, limited shade, and private shoreland."
      ]
    },
    "accessPoints": [
      {
        "id": "swift-county-public-water-access",
        "name": "Chippewa River, Swift County Public Water Access Site",
        "latitude": 45.3218192,
        "longitude": -95.6174738,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; public-water-access GIS resolves WAS01373 near Chippewa River mile 52.0."
      },
      {
        "id": "norby-landing-public-water-access",
        "name": "Chippewa River, Norby Landing Public Water Access Site",
        "latitude": 45.2047915,
        "longitude": -95.6643308,
        "mileFromStart": 11.9,
        "segmentKind": "creek",
        "note": "Default take-out; public-water-access GIS resolves WAS01651 near Chippewa River mile 40.1."
      }
    ]
  },
  "chippewa-river-norby-lentz": {
    "putIn": {
      "name": "Chippewa River, Norby Landing Public Water Access Site",
      "latitude": 45.2047915,
      "longitude": -95.6643308
    },
    "takeOut": {
      "name": "Lentz Landing Public Water Access Site",
      "latitude": 45.107814,
      "longitude": -95.7987081
    },
    "logistics": {
      "distanceLabel": "19.1 mi",
      "estimatedPaddleTime": "About 7 hr to 10 hr; shorter only with strong current and an efficient group",
      "shuttle": "Stage the take-out at Lentz Landing, then drive upstream to Norby Landing. Start early and bring enough daylight margin for wood, wind, shallow riffles, and the long rural shuttle.",
      "permits": "No route-specific paddling permit is known. Use the named public accesses, follow posted MN DNR access rules, and check Minnesota boating and PFD requirements.",
      "camping": "No established watercraft campsite is documented for this 19.1-mile gap. Treat it as a long day route unless your group has separately arranged legal off-route lodging or camping.",
      "campingClassification": "none",
      "summary": "Launch at Norby Landing and take out at Lentz Landing for the long missing public-access connector above the established Lentz-to-Watson Chippewa day trip. The Milan / MN 40 DNR gauge sits at the Lentz end of the reach and has official stage bands.",
      "accessCaveats": [
        "Minnesota public-water-access GIS resolves Norby Landing as WAS01651 near river mile 40.1 and Lentz Landing as WAS01687 near river mile 21.0.",
        "This mileage is high for a casual day. Avoid starting late, paddling against strong wind, or committing when the gauge is high or rising.",
        "Private banks and limited public exits make bailout planning more important than on the shorter DNR highlighted Lentz-to-Watson segment."
      ],
      "watchFor": [
        "Snags, fallen trees, and light rapids called out by the Milan DNR river-level site.",
        "Low-water channel picking when the Milan gauge falls toward the 1 ft scrapable floor.",
        "Rural rescue spacing, fatigue, open-wind bends, muddy banks, and private shoreland."
      ]
    },
    "accessPoints": [
      {
        "id": "norby-landing-public-water-access",
        "name": "Chippewa River, Norby Landing Public Water Access Site",
        "latitude": 45.2047915,
        "longitude": -95.6643308,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; public-water-access GIS resolves WAS01651 near Chippewa River mile 40.1."
      },
      {
        "id": "lentz-landing-public-water-access-site",
        "name": "Lentz Landing Public Water Access Site",
        "latitude": 45.107814,
        "longitude": -95.7987081,
        "mileFromStart": 19.1,
        "segmentKind": "creek",
        "note": "Default take-out; public-water-access GIS resolves WAS01687 near Chippewa River mile 21.0."
      }
    ]
  },
  "chippewa-river-watson-lagoon": {
    "putIn": {
      "name": "Watson Sag Dam Public Water Access Site",
      "latitude": 45.0234918,
      "longitude": -95.7902702
    },
    "takeOut": {
      "name": "Montevideo Chippewa / Lagoon Park Public Water Access Site",
      "latitude": 44.950253,
      "longitude": -95.7291569
    },
    "logistics": {
      "distanceLabel": "11.5 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr depending on level, wind, and lower-river current",
      "shuttle": "Stage the take-out at Lagoon Park in Montevideo, then drive upstream to the Watson Sag Dam access. Inspect the put-in carefully and launch only from the safe public-access side of the dam area.",
      "permits": "No route-specific paddling permit is known. Follow posted Watson, City of Montevideo, public-access, and Minnesota boating/PFD rules.",
      "camping": "Lagoon Park has DNR-documented fee camping, toilets, and 10 campsites. Treat camping as an endpoint/basecamp plan under current city rules, not as informal riverbank camping.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Watson Sag Dam and take out at Lagoon Park for the lower-Chippewa connector between the existing Lentz-to-Watson and Lagoon-to-Prien's cards. The Watson DNR gauge is direct at the put-in corridor and publishes official discharge bands.",
      "accessCaveats": [
        "Minnesota public-water-access GIS resolves Watson Sag Dam as WAS01688 near river mile 12.7 and Lagoon Park / Montevideo Chippewa as WAS02654 near river mile 1.2.",
        "Start only from a safe public launch position below or away from dam hydraulics. This route does not include dam play, dam portage, or any unplanned upstream/downstream dam maneuver.",
        "Lagoon Park is the intended take-out. Continuing to Prien's Landing is a separate short connector with its own confluence and Minnesota River caveats."
      ],
      "watchFor": [
        "Dam-area current and hydraulics at Watson; stay away from structures and scout before launching.",
        "Low-water scraping when Watson is below the official medium band, plus muddy lower-bank exits.",
        "Faster lower-river current, wind, strainers, private banks, and limited legal bailout as the river approaches Montevideo."
      ]
    },
    "accessPoints": [
      {
        "id": "watson-sag-dam-public-water-access-site",
        "name": "Watson Sag Dam Public Water Access Site",
        "latitude": 45.0234918,
        "longitude": -95.7902702,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; public-water-access GIS resolves WAS01688 near Chippewa River mile 12.7."
      },
      {
        "id": "lagoon-park-montevideo",
        "name": "Montevideo Chippewa / Lagoon Park Public Water Access Site",
        "latitude": 44.950253,
        "longitude": -95.7291569,
        "mileFromStart": 11.5,
        "segmentKind": "creek",
        "note": "Default take-out; public-water-access GIS resolves WAS02654 near Chippewa River mile 1.2 and DNR identifies Lagoon Park camping/toilets."
      }
    ]
  },
  "st-croix-river-wild-river-lions-park": {
    "putIn": {
      "name": "St. Croix River, Wild River State Park Public Water Access Site",
      "latitude": 45.522759,
      "longitude": -92.72902
    },
    "takeOut": {
      "name": "Taylors Falls Lion's Park dam portage take-out",
      "latitude": 45.42645,
      "longitude": -92.6515
    },
    "logistics": {
      "distanceLabel": "About 8.5 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr on the water, plus portage time if continuing downstream",
      "shuttle": "Stage Lion's Park first and identify the dam take-out before driving to Wild River State Park. If continuing to Minnesota Interstate State Park, plan the official Taylors Falls town portage as a separate carry that can take several hours.",
      "permits": "No day-use paddling permit is known, but Wild River State Park requires a Minnesota state park vehicle permit for vehicles using the landing. Follow Riverway rules, posted dam/portage signs, and Minnesota boating/PFD requirements.",
      "camping": "Treat the selected route as a day trip ending above the dam. Wild River State Park and Riverway designated campsites may support separate overnight planning, but only under current reservation, permit, and posted-site rules.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Wild River State Park and take out at Taylors Falls Lion's Park above the St. Croix Falls hydroelectric dam. The St. Croix Falls DNR gauge is the official same-corridor check, but the route's real gate is the mandatory dam take-out and portage plan.",
      "accessCaveats": [
        "Wild River State Park resolves in Minnesota public-water-access GIS as WAS00298 at St. Croix river mile 63.0.",
        "NPS Map 8 identifies Taylors Falls Lion's Park at S54.5 as the required portage take-out, but it is not represented in the Minnesota public-water-access GIS records reviewed for this run.",
        "Do not continue below the hydroelectric dam by water. NPS says the river just below the dam lacks public access and has unpredictable water levels."
      ],
      "watchFor": [
        "Missing or delaying the Lion's Park take-out above the dam.",
        "Wind, motorboat wake, and lake-like travel through the Indian Head Flowage.",
        "Summer sandbars, side-channel shallows, cold water, private banks, and fresh wood after storms.",
        "Extra time, traffic, and physical effort if carrying through Taylors Falls to Minnesota Interstate State Park."
      ]
    },
    "accessPoints": [
      {
        "id": "wild-river-state-park-public-water-access",
        "name": "St. Croix River, Wild River State Park Public Water Access Site",
        "latitude": 45.522759,
        "longitude": -92.72902,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; DNR public-access record WAS00298 at St. Croix river mile 63.0."
      },
      {
        "id": "taylors-falls-lions-park",
        "name": "Taylors Falls Lion's Park dam portage take-out",
        "latitude": 45.42645,
        "longitude": -92.6515,
        "mileFromStart": 8.5,
        "segmentKind": "creek",
        "note": "Mandatory take-out above the hydroelectric dam; NPS labels this portage point S54.5."
      }
    ]
  },
  "rum-river-princeton-highway-7": {
    "putIn": {
      "id": "rum-river-princeton-public-water-access-site",
      "name": "Rum River, Princeton Public Water Access Site",
      "latitude": 45.572793312220064,
      "longitude": -93.5786234028956
    },
    "takeOut": {
      "id": "rum-river-highway-7-public-water-access-site",
      "name": "Rum River, Highway 7 Public Water Access Site",
      "latitude": 45.52976957804125,
      "longitude": -93.43923657162249
    },
    "logistics": {
      "distanceLabel": "About 16.6 mi",
      "estimatedPaddleTime": "Long day; plan 6 hr to 8 hr plus wood scouting and low-water delays",
      "shuttle": "Stage the Highway 7 take-out first, then drive back to Princeton Riverside Municipal Park. Confirm both landings and the St. Francis gauge trend before launching because the first miles below Princeton are wood-prone.",
      "permits": "No route-specific paddling permit is known. Follow DNR water-trail rules, City of Princeton and public-access parking rules, Minnesota boating/PFD requirements, and invasive-species rules.",
      "camping": "DNR Map 2 maps two Cook watercraft campsites at river mile 76.6 between Princeton and Highway 7. Treat camping as designated-site only, first-come where applicable, and do not camp on private banks.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Princeton and paddle downstream to the Highway 7 access. This fills the middle-Rum gap above the existing Highway-7-to-Walbo card while staying downstream of the current RM 101-98 tree-alert reach.",
      "accessCaveats": [
        "Princeton resolves in Minnesota public-water-access GIS as WAS00459 at Riverside Municipal Park near river mile 87.8. DNR Map 2 also notes an old rock dam at river mile 87.8; use caution immediately after launch.",
        "Highway 7 resolves as WAS00318 at river mile 71.2 near the confluence with Spencer Brook.",
        "The St. Francis gauge is far downstream, so do not treat it as a substitute for visual checks at Princeton, logjam scouting, and recent-storm review."
      ],
      "watchFor": [
        "Numerous logjams in the DNR-mapped river-mile 95-to-85 zone near Princeton, including the first miles of this route.",
        "Old Rock Dam caution at Princeton, downed trees, snags, cold water, private banks, and long mileage.",
        "The active DNR large-tree alert between river miles 101 and 98 is upstream of this route; do not extend upstream toward County Road 12 unless that alert has cleared."
      ]
    },
    "accessPoints": [
      {
        "id": "rum-river-princeton-public-water-access-site",
        "name": "Rum River, Princeton Public Water Access Site",
        "latitude": 45.572793312220064,
        "longitude": -93.5786234028956,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at Princeton Riverside Municipal Park; public-water-access GIS lists WAS00459 at river mile 87.8."
      },
      {
        "id": "rum-river-highway-7-public-water-access-site",
        "name": "Rum River, Highway 7 Public Water Access Site",
        "latitude": 45.52976957804125,
        "longitude": -93.43923657162249,
        "mileFromStart": 16.6,
        "segmentKind": "creek",
        "note": "Default take-out near Spencer Brook; public-water-access GIS lists WAS00318 at river mile 71.2."
      }
    ]
  },
  "rum-river-highway-7-walbo": {
    "putIn": {
      "name": "Rum River, Highway 7 Public Water Access Site",
      "latitude": 45.5297696,
      "longitude": -93.4392366
    },
    "takeOut": {
      "name": "Rum River, Walbo Public Water Access Site",
      "latitude": 45.5791303,
      "longitude": -93.3228614
    },
    "logistics": {
      "distanceLabel": "About 14.4 mi",
      "estimatedPaddleTime": "About 4.5 hr to 6.5 hr, longer with low water, wood, or headwind",
      "shuttle": "Stage the take-out at Walbo first, then drive back to the Highway 7 carry-in. This is a rural middle-Rum shuttle with limited clean public exits between the endpoints.",
      "permits": "No route-specific paddling permit is known. Follow DNR public-access rules, Minnesota boating/PFD requirements, and all posted local parking signs.",
      "camping": "Treat this as a day route. No on-route campsite is assumed for the Highway-7-to-Walbo connector, and private banks are not legal overnight stops.",
      "campingClassification": "none",
      "summary": "Launch at Highway 7 and take out at Walbo for a middle-Rum connector below the current Princeton-area tree alert and above the already-live Walbo-to-Cambridge route.",
      "accessCaveats": [
        "Highway 7 resolves as WAS00318 at Rum River mile 71.2, and Walbo resolves as WAS00274 at river mile 56.8 in Minnesota public-water-access GIS.",
        "The St. Francis gauge is far downstream. Use it as an official same-river proxy, then make visual checks for actual depth and wood at Highway 7.",
        "The current DNR tree alert is upstream between river miles 101 and 98. Do not extend this route upstream toward Princeton unless current DNR notices and local obstruction checks are clear."
      ],
      "watchFor": [
        "Downed trees, snags, sweepers, and blind wooded bends.",
        "Low-water scraping and slow travel while the St. Francis gauge is in the official low band.",
        "Private banks, muddy exits, cold water, storm debris, and limited bailout options."
      ]
    },
    "accessPoints": [
      {
        "id": "highway-7",
        "name": "Rum River, Highway 7 Public Water Access Site",
        "latitude": 45.5297696,
        "longitude": -93.4392366,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; resolves as WAS00318 at Rum River mile 71.2."
      },
      {
        "id": "walbo",
        "name": "Rum River, Walbo Public Water Access Site",
        "latitude": 45.5791303,
        "longitude": -93.3228614,
        "mileFromStart": 14.4,
        "segmentKind": "creek",
        "note": "Default take-out; resolves as WAS00274 at Rum River mile 56.8."
      }
    ]
  },
  "sauk-river-horseshoe-lions-park": {
    "putIn": {
      "name": "Horseshoe Lake Public Water Access Site",
      "latitude": 45.44278,
      "longitude": -94.5226614
    },
    "takeOut": {
      "name": "Sauk River, Lions Park Public Water Access Site",
      "latitude": 45.4526002,
      "longitude": -94.4238972
    },
    "logistics": {
      "distanceLabel": "About 7.6 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, longer with lake wind, vegetation, or low water",
      "shuttle": "Stage Lions Park in Cold Spring first and identify the take-out above Cold Spring Dam. Then drive back to the Horseshoe Lake access and make a wind and boat-traffic call before launching.",
      "permits": "No route-specific paddling permit is known. Use the named public accesses, follow Minnesota boating/PFD rules, and obey DNR, City of Cold Spring, and posted park rules.",
      "camping": "Treat this as a day route. DNR Map 2 does not document an on-route camping plan between Horseshoe Lake and Lions Park.",
      "campingClassification": "none",
      "summary": "Launch at Horseshoe Lake and take out at Lions Park for the Chain of Lakes continuation below Richmond. The route ends above Cold Spring Dam, so the take-out is part of the safety plan.",
      "accessCaveats": [
        "Horseshoe Lake resolves as WAS01770 at river mile 29.9 and Lions Park resolves as WAS00438 at river mile 22.3 in Minnesota public-water-access GIS.",
        "The St. Martin gauge is upstream of this route and should be treated as a same-map proxy. Local lake-chain wind, vegetation, and access depth can override a favorable reading.",
        "Lions Park is the planned take-out before Cold Spring Dam. Do not drift into the dam or portage corridor unintentionally."
      ],
      "watchFor": [
        "Cold Spring Dam just downstream of Lions Park; identify the take-out from shore before launching.",
        "Wind, boat wakes, aquatic vegetation, snags, bridge approaches, and private shoreline through the Chain of Lakes.",
        "High or rising water, storm debris, cold water, and low-water dragging near the DNR scrapable band."
      ]
    },
    "accessPoints": [
      {
        "id": "horseshoe-lake-access",
        "name": "Horseshoe Lake Public Water Access Site",
        "latitude": 45.44278,
        "longitude": -94.5226614,
        "mileFromStart": 0,
        "segmentKind": "lake",
        "note": "Default put-in; public-water-access GIS resolves the DNR-administered access as WAS01770 at DNR river mile 29.9."
      },
      {
        "id": "lions-park-cold-spring",
        "name": "Sauk River, Lions Park Public Water Access Site",
        "latitude": 45.4526002,
        "longitude": -94.4238972,
        "mileFromStart": 7.6,
        "segmentKind": "creek",
        "note": "Default take-out above Cold Spring Dam; public-water-access GIS resolves it as WAS00438 at DNR river mile 22.3."
      }
    ]
  },
  "crow-wing-river-little-white-dog-cottingham": {
    "putIn": {
      "name": "Little White Dog County Park #9 carry-in access",
      "latitude": 46.586984884675736,
      "longitude": -94.82261571200662
    },
    "takeOut": {
      "name": "Cottingham County Park #11 carry-in access",
      "latitude": 46.505529851247346,
      "longitude": -94.80738952007682
    },
    "logistics": {
      "distanceLabel": "9.8 mi",
      "estimatedPaddleTime": "About 3.5 hr to 5 hr, longer at low water",
      "shuttle": "Stage Cottingham County Park first, then drive back to Little White Dog. This is the DNR-highlighted Map 2 day trip, but both landings are county-park facilities with posted-use and camping rules.",
      "permits": "No special paddling permit is known. Follow Minnesota boating/PFD requirements and posted Wadena County campground, day-use, and parking rules.",
      "camping": "Little White Dog, Knob Hill, and Cottingham have mapped primitive campground context. Treat overnight use as posted county-campground use only, not informal shoreline camping.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Little White Dog and finish at Cottingham for the official DNR Map 2 lower Crow Wing day trip through forested bends, islands, and busier summer recreation near the lower parks.",
      "accessCaveats": [
        "The Nimrod DNR gauge is upstream of the route; use it as an official corridor check and make a same-day visual call at Little White Dog.",
        "Knob Hill is the cleanest midpoint public access and campground option if the group needs an exit or planned overnight split.",
        "Cottingham can be busy with tubing, swimming, and county-park use during summer weekends."
      ],
      "watchFor": [
        "Low-water scraping and slow travel while Nimrod is below 300 cfs.",
        "Fresh wood, sweepers, and outside-bend strainers after storms.",
        "Private banks and designated-site-only camping rules along the corridor."
      ]
    },
    "accessPoints": [
      {
        "id": "little-white-dog",
        "name": "Little White Dog County Park #9 carry-in access",
        "latitude": 46.586984884675736,
        "longitude": -94.82261571200662,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "DNR Map 2 recommended-route put-in at river mile 59.3."
      },
      {
        "id": "knob-hill",
        "name": "Knob Hill County Park #10 carry-in access",
        "latitude": 46.533855996511825,
        "longitude": -94.81849257299048,
        "mileFromStart": 6.3,
        "segmentKind": "creek",
        "note": "Intermediate Wadena County campground, rest area, and public access."
      },
      {
        "id": "cottingham-county-park",
        "name": "Cottingham County Park #11 carry-in access",
        "latitude": 46.505529851247346,
        "longitude": -94.80738952007682,
        "mileFromStart": 9.8,
        "segmentKind": "creek",
        "note": "DNR Map 2 recommended-route take-out at river mile 49.5."
      }
    ]
  },
  "crow-wing-river-cottingham-old-wadena": {
    "putIn": {
      "name": "Cottingham County Park #11 carry-in access",
      "latitude": 46.505529851247346,
      "longitude": -94.80738952007682
    },
    "takeOut": {
      "name": "Old Wadena County Park #13 carry-in access",
      "latitude": 46.42190905939157,
      "longitude": -94.82559695181752
    },
    "logistics": {
      "distanceLabel": "10.6 mi",
      "estimatedPaddleTime": "About 4 hr to 5.5 hr, longer at low water",
      "shuttle": "Stage Old Wadena first, then drive back to Cottingham. Bullard Bluff is the clean midpoint access if the group needs a shorter plan or a bail-out.",
      "permits": "No special paddling permit is known. Follow Minnesota boating/PFD requirements and posted Wadena County park, camping, and parking rules.",
      "camping": "Cottingham, Bullard Bluff, and Old Wadena have primitive campground context on DNR Map 2. Use only posted county campsites and do not assume informal riverbank camping.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Cottingham, pass Bullard Bluff, and finish at Old Wadena for the consolidated lower Crow Wing county-park connector. The Nimrod gauge is upstream, so local depth checks matter.",
      "accessCaveats": [
        "Cottingham is a busy county-park access in warm weather; confirm parking and the signed launch before leaving a vehicle.",
        "The Nimrod gauge is upstream and does not remove the need for local checks at Cottingham, Bullard Bluff, and Old Wadena.",
        "Old Wadena is the selected take-out. Continuing downstream changes the trip plan and adds more remote county-park and dam/reservoir considerations."
      ],
      "watchFor": [
        "Shallow sandbars and slow current when the upstream Nimrod gauge is below 300 cfs.",
        "Fresh wood, strainers, and Leaf River confluence debris after local rain.",
        "Private banks and rural rescue spacing between the county parks."
      ]
    },
    "accessPoints": [
      {
        "id": "cottingham-county-park",
        "name": "Cottingham County Park #11 carry-in access",
        "latitude": 46.505529851247346,
        "longitude": -94.80738952007682,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Wadena County campground-supported put-in at river mile 49.5."
      },
      {
        "id": "bullard-bluff",
        "name": "Bullard Bluff County Park #12 carry-in access",
        "latitude": 46.45665763343061,
        "longitude": -94.8014182279455,
        "mileFromStart": 6.7,
        "segmentKind": "creek",
        "note": "Intermediate Wadena County campground-supported access at river mile 42.8."
      },
      {
        "id": "old-wadena",
        "name": "Old Wadena County Park #13 carry-in access",
        "latitude": 46.42190905939157,
        "longitude": -94.82559695181752,
        "mileFromStart": 10.6,
        "segmentKind": "creek",
        "note": "Wadena County campground-supported take-out at river mile 38.9."
      }
    ]
  },
  "crow-wing-river-old-wadena-green-oak": {
    "putIn": {
      "name": "Old Wadena County Park #13 carry-in access",
      "latitude": 46.42190905939157,
      "longitude": -94.82559695181752
    },
    "takeOut": {
      "name": "Green Oak Landing carry-in access",
      "latitude": 46.35203578493438,
      "longitude": -94.71513976221165
    },
    "logistics": {
      "distanceLabel": "12.5 mi",
      "estimatedPaddleTime": "About 4.5 hr to 6.5 hr, longer at low water",
      "shuttle": "Stage Green Oak first, then drive back to Old Wadena. McGivern and Marsh are useful intermediate access checks or bailout points if the river is shallow, windy, or woodier than expected.",
      "permits": "No special paddling permit is known. Follow Minnesota boating/PFD requirements and posted Wadena County park, camping, parking, and public-access rules.",
      "camping": "Old Wadena and McGivern have campground context, and DNR Map 2 names additional watercraft campsite support downstream. Use designated sites only and do not assume informal riverbank camping is legal.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Old Wadena and finish at Green Oak for the lower Crow Wing access chain below the existing Cottingham-to-Old-Wadena card. This is gentle water, but the Sylvan Dam gauge is downstream and local conditions still control.",
      "accessCaveats": [
        "Old Wadena, McGivern, Marsh, and Green Oak are official public-access records, but county-park parking, campsite rules, and landing condition should be checked before launch.",
        "The Sylvan Dam gauge is downstream of this segment. Use the official bands as a lower-river signal, then verify depth and obstructions locally at the accesses.",
        "Green Oak is the selected take-out. Continuing downstream changes the trip into a longer Lake Placid / Pillager Dam approach plan."
      ],
      "watchFor": [
        "Shallow sandbars and slow current when the lower-Crow-Wing gauge is near the scrapable or low bands.",
        "Fresh strainers, outside-bend wood, cold water, and rural rescue spacing between named landings.",
        "Private banks away from public accesses and designated campsites."
      ]
    },
    "accessPoints": [
      {
        "id": "old-wadena",
        "name": "Old Wadena County Park #13 carry-in access",
        "latitude": 46.42190905939157,
        "longitude": -94.82559695181752,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at DNR Map 2 river mile 38.9."
      },
      {
        "id": "mcgivern-county-park",
        "name": "McGivern County Park #15 trailer access",
        "latitude": 46.41446285675237,
        "longitude": -94.79928330362061,
        "mileFromStart": 5.2,
        "segmentKind": "creek",
        "note": "Intermediate Wadena County park access with mapped campsite support."
      },
      {
        "id": "marsh-landing",
        "name": "Marsh's Landing #16 carry-in access",
        "latitude": 46.38215640501823,
        "longitude": -94.73689977147652,
        "mileFromStart": 9.4,
        "segmentKind": "creek",
        "note": "Intermediate public access at DNR Map 2 river mile 29.5."
      },
      {
        "id": "green-oak-landing",
        "name": "Green Oak Landing carry-in access",
        "latitude": 46.35203578493438,
        "longitude": -94.71513976221165,
        "mileFromStart": 12.5,
        "segmentKind": "creek",
        "note": "Default take-out at DNR Map 2 river mile 26.4."
      }
    ]
  },
  "crow-wing-river-green-oak-lake-placid": {
    "putIn": {
      "name": "Green Oak Landing carry-in access",
      "latitude": 46.35203578493438,
      "longitude": -94.71513976221165
    },
    "takeOut": {
      "name": "Lake Placid Reservoir Landing #3 public water access",
      "latitude": 46.31660556485295,
      "longitude": -94.48654607229267
    },
    "logistics": {
      "distanceLabel": "14.6 mi",
      "estimatedPaddleTime": "About 5 hr to 7 hr, longer with reservoir wind or low water",
      "shuttle": "Stage Lake Placid Reservoir Landing #3 first and confirm the dam-adjacent take-out is obvious from the water, then drive back to Green Oak. Truck Station and Al Vah are the clearest intermediate access checks.",
      "permits": "No special paddling permit is known. Follow posted public-access rules at Green Oak, Truck Station, Al Vah, and Lake Placid, plus Minnesota boating/PFD requirements.",
      "camping": "DNR Map 2 names Spud Oak and Placid Lake watercraft campsites on this corridor, so the route can support a planned overnight. Treat sites as first-come and keep a backup because private shoreline limits informal stops.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Green Oak, pass Truck Station and Al Vah, and finish at Lake Placid Reservoir Landing #3. The finish is immediately above Pillager Dam, so this card is only appropriate when the take-out is confirmed and conditions are controlled.",
      "accessCaveats": [
        "Lake Placid Reservoir Landing #3 is the mandatory finish. DNR Map 2 places Pillager Dam just downstream, so do not miss the landing or continue casually.",
        "The route transitions from river bends into Lake Placid Reservoir; wind, waves, boat traffic, and slower current can dominate the final miles.",
        "The Sylvan Dam gauge is downstream of the route and below the dam corridor. Use the official bands as a lower-river guide, then make a local visual call before launching."
      ],
      "watchFor": [
        "Pillager Dam immediately below the take-out and the consequences of drifting past Lake Placid Reservoir Landing #3.",
        "Reservoir wind, waves, fishing or motor traffic, and fatigue near the end of a long route.",
        "Sandbars, strainers, private banks, and faster current after rain in the upper half of the segment."
      ]
    },
    "accessPoints": [
      {
        "id": "green-oak-landing",
        "name": "Green Oak Landing carry-in access",
        "latitude": 46.35203578493438,
        "longitude": -94.71513976221165,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at DNR Map 2 river mile 26.4."
      },
      {
        "id": "truck-station-landing",
        "name": "Truck Station Landing carry-in access",
        "latitude": 46.34283457823239,
        "longitude": -94.64694751544003,
        "mileFromStart": 4.8,
        "segmentKind": "creek",
        "note": "Intermediate public access at DNR Map 2 river mile 21.6."
      },
      {
        "id": "al-vah-landing",
        "name": "Al Vah's Landing carry-in access",
        "latitude": 46.30516549574981,
        "longitude": -94.54772116750775,
        "mileFromStart": 11,
        "segmentKind": "transition",
        "note": "Intermediate access near the beginning of Lake Placid Reservoir."
      },
      {
        "id": "lake-placid-reservoir-3",
        "name": "Lake Placid Reservoir Landing #3",
        "latitude": 46.31660556485295,
        "longitude": -94.48654607229267,
        "mileFromStart": 14.6,
        "segmentKind": "lake",
        "note": "Default and mandatory take-out immediately above Pillager Dam."
      }
    ]
  },
  "minnesota-river-riverfront-seven-mile": {
    "putIn": {
      "name": "Minnesota River, Riverfront Park Public Water Access Site",
      "latitude": 44.1750525,
      "longitude": -94.001449
    },
    "takeOut": {
      "name": "Seven Mile Creek, County Park Public Water Access Site",
      "latitude": 44.2629698,
      "longitude": -94.0205424
    },
    "logistics": {
      "distanceLabel": "About 7.8 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr depending on wind, level, and stops",
      "shuttle": "Stage the Seven Mile Creek County Park river-side landing first, then drive back to Riverfront Park in Mankato. Confirm park hours, river-side parking, and landing conditions before launching.",
      "permits": "No route-specific paddling permit is known. Follow Minnesota boating/PFD rules, City of Mankato park rules, Nicollet County park rules, and posted access or parking restrictions.",
      "camping": "Treat this as a day route. Seven Mile Creek Park is a daylight-use park rather than an on-route campground; Land of Memories Park or other Mankato-area camping is a separate basecamp plan upstream of this route.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Mankato Riverfront Park and take out at Seven Mile Creek County Park for the short DNR Map 5 easy stretch below Mankato. The Mankato gauge is direct at the put-in corridor, but the current reading was low just below medium during review.",
      "accessCaveats": [
        "Riverfront Park resolves as WAS01018 and Seven Mile Creek County Park resolves as WAS00211 in Minnesota public-water-access GIS with coordinates and river-mile records.",
        "Explore Minnesota describes Seven Mile Creek Park as daylight-use with a large river-side parking lot and public boat landing; confirm same-day county rules before staging a vehicle.",
        "Do not extend downstream toward St. Peter or Henderson without a separate plan, daylight, and access checks."
      ],
      "watchFor": [
        "Wind, motorboat wake, bridge current, sandbars, muddy banks, cold water, and floating debris after rain.",
        "Private banks and limited legal stopping options away from named city/county parks.",
        "Low-water scraping when Mankato sits below the official medium band and stronger current above the preferred range."
      ]
    },
    "accessPoints": [
      {
        "id": "riverfront-park-mankato",
        "name": "Minnesota River, Riverfront Park Public Water Access Site",
        "latitude": 44.1750525,
        "longitude": -94.001449,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at DNR Map 5 river mile 102.5; resolves as WAS01018."
      },
      {
        "id": "seven-mile-creek-county-park",
        "name": "Seven Mile Creek, County Park Public Water Access Site",
        "latitude": 44.2629698,
        "longitude": -94.0205424,
        "mileFromStart": 7.8,
        "segmentKind": "creek",
        "note": "Default take-out at DNR Map 5 river mile 94.7; resolves as WAS00211 with Nicollet County administration."
      }
    ]
  },
  "cottonwood-river-highway-15-courtland": {
    "putIn": {
      "name": "Highway 15 / Cottonwood Street Bridge public water access",
      "latitude": 44.2826599,
      "longitude": -94.4360667
    },
    "takeOut": {
      "name": "Minnesota River, Courtland public water access",
      "latitude": 44.256539,
      "longitude": -94.3395693
    },
    "logistics": {
      "distanceLabel": "About 10 mi",
      "estimatedPaddleTime": "About 3.5 hr to 5.5 hr, longer with low water, wind, or confluence scouting",
      "shuttle": "Stage the Courtland take-out first, then drive back to the Highway 15 / Cottonwood Street bridge access in New Ulm. Inspect Courtland for mud, flood debris, and wind exposure before committing to the confluence finish.",
      "permits": "No route-specific paddling permit is known. Use the named DNR public accesses, follow Minnesota boating/PFD rules, and obey posted access, park, and private-bank signs.",
      "camping": "Treat this as a day route. Flandrau State Park camping is upstream of the selected put-in; do not assume Cottonwood or Minnesota River banks near the confluence are legal overnight stops.",
      "campingClassification": "none",
      "summary": "Launch at Highway 15 in New Ulm, paddle the final lower Cottonwood mile to the Minnesota River, and finish at Courtland. The New Ulm DNR gauge is just upstream and currently reads low, so same-day depth and wind checks matter.",
      "accessCaveats": [
        "Highway 15 resolves as DNR access WAS01419 at Cottonwood river mile 1.6, and Courtland resolves as DNR access WAS00794 on the Minnesota River at river mile 128.0.",
        "The selected gauge is upstream of the put-in, not on the Minnesota River finish; use it as a near-put-in Cottonwood check and inspect the Courtland take-out separately.",
        "The route changes character at the Cottonwood-Minnesota confluence. Do not count on informal confluence banks or private land for bailout."
      ],
      "watchFor": [
        "Low-water scraping and possible dragging while the New Ulm gauge is below the official medium band.",
        "Confluence current, floating debris, muddy banks, and wind on the broader Minnesota River finish.",
        "Snags, strainers, undercut banks, agricultural debris, private shoreland, and fast rises after rain."
      ]
    },
    "accessPoints": [
      {
        "id": "highway-15-cottonwood-street-bridge-public-water-access",
        "name": "Highway 15 / Cottonwood Street Bridge public water access",
        "latitude": 44.2826599,
        "longitude": -94.4360667,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; resolves as WAS01419 at Cottonwood river mile 1.6."
      },
      {
        "id": "courtland-public-water-access",
        "name": "Minnesota River, Courtland public water access",
        "latitude": 44.256539,
        "longitude": -94.3395693,
        "mileFromStart": 10,
        "segmentKind": "creek",
        "note": "Default take-out; resolves as WAS00794 on the Minnesota River at river mile 128.0."
      }
    ]
  },
  "mississippi-river-little-falls-pike-creek": {
    "putIn": {
      "id": "little-falls-dam-public-water-access-site",
      "name": "Mississippi River, Little Falls Dam Public Water Access Site",
      "latitude": 45.974272,
      "longitude": -94.365486
    },
    "takeOut": {
      "id": "pike-creek-landing",
      "name": "Mississippi River, Pike Creek Public Water Access Site",
      "latitude": 45.9527854,
      "longitude": -94.3914773
    },
    "logistics": {
      "distanceLabel": "About 1.8 mi",
      "estimatedPaddleTime": "About 45 min to 1.5 hr, longer with low water or scouting",
      "shuttle": "Stage Pike Creek Landing first, then drive back to the Little Falls Dam public access below the dam. Keep this as a short staged route; continuing past Pike Creek enters the separate Blanchard Dam portage corridor.",
      "permits": "No route-specific paddling permit is known. Follow posted City of Little Falls, Morrison County, and MN DNR public-water-access rules.",
      "camping": "Pike Creek has mapped watercraft-campsite context nearby, but this short card should be treated as a day trip unless a specific public campsite plan is separately confirmed. Do not camp on private banks.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch below Little Falls Dam and take out at Pike Creek for the short Map 7 connector above the existing Pike-Creek-to-Royalton route. The downstream Royalton DNR gauge is official but proxy-framed; dam-boundary and visual checks matter.",
      "accessCaveats": [
        "Use only the public access below Little Falls Dam for this route. Do not launch upstream of the dam or improvise around dam structures.",
        "Pike Creek resolves in Minnesota public-water-access GIS as WAS01279 at DNR river mile 963.3.",
        "The Royalton gauge is downstream of Pike Creek and below the Blanchard Dam corridor, so local water at Little Falls and Pike Creek can override the gauge band."
      ],
      "watchFor": [
        "Dam-influenced current below Little Falls, cold water, floating debris, and faster current when Royalton is high or rising.",
        "A firm Pike Creek finish. Continuing downstream requires the separate Blanchard Dam portage route and scouting plan.",
        "Private banks, limited legal bailout, and access rules near Lindbergh State Park and Pike Creek."
      ]
    },
    "accessPoints": [
      {
        "id": "little-falls-dam-public-water-access-site",
        "name": "Mississippi River, Little Falls Dam Public Water Access Site",
        "latitude": 45.974272,
        "longitude": -94.365486,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in below Little Falls Dam; DNR public-water-access GIS resolves WAS01280 at river mile 965.1."
      },
      {
        "id": "pike-creek-landing",
        "name": "Mississippi River, Pike Creek Public Water Access Site",
        "latitude": 45.9527854,
        "longitude": -94.3914773,
        "mileFromStart": 1.8,
        "segmentKind": "creek",
        "note": "Default take-out before the separate Blanchard Dam portage corridor; DNR public-water-access GIS resolves WAS01279 at river mile 963.3."
      }
    ]
  },
  "mississippi-river-pike-creek-royalton": {
    "putIn": {
      "name": "Mississippi River, Pike Creek Public Water Access Site",
      "latitude": 45.9527854,
      "longitude": -94.3914773
    },
    "takeOut": {
      "name": "Mississippi River, Royalton Sportsman's Club Public Water Access Site",
      "latitude": 45.8297201,
      "longitude": -94.3506845
    },
    "logistics": {
      "distanceLabel": "About 9.7 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr including the Blanchard Dam portage",
      "shuttle": "Stage Royalton Sportsman's Club first, then inspect the Blanchard Dam portage and below-dam carry-in before launching from Pike Creek. Do not commit unless the group can find and complete the left-bank portage.",
      "permits": "No route-specific paddling permit is known. Use the named public accesses, follow Minnesota boating/PFD rules, obey posted dam restrictions, and confirm any Royalton Sportsman's Club fee or parking rules.",
      "camping": "Pike Creek has a DNR-mapped watercraft campsite at the launch corridor, but the selected route is best treated as a day trip with a dam portage. Do not camp on private banks or islands.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Pike Creek Landing and finish at Royalton Sportsman's Club for the missing Mississippi Map 7 connector. The route requires a mandatory Blanchard Dam portage on the left bank before continuing to the direct Royalton gauge corridor.",
      "accessCaveats": [
        "Pike Creek, Blanchard Dam, and Royalton resolve in Minnesota public-water-access GIS with river-mile and coordinate records.",
        "Blanchard Dam is not optional. DNR Map 7 marks a 600-yard left-bank portage; identify the exit before you are committed to dam current.",
        "Royalton Sportsman's Club may charge a fee and is the planned finish. Do not continue into the longer Royalton-to-Sartell route unless the group has daylight, water, and shuttle planning for that separate card."
      ],
      "watchFor": [
        "Dam approach current, portage footing, and the below-dam relaunch at Blanchard.",
        "Rocky riffles, shallow margins, floating wood, and colder water when Royalton is near the low band.",
        "Private banks and limited legal bailout between Pike Creek, Blanchard, and Royalton."
      ]
    },
    "accessPoints": [
      {
        "id": "pike-creek-landing",
        "name": "Mississippi River, Pike Creek Public Water Access Site",
        "latitude": 45.9527854,
        "longitude": -94.3914773,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at DNR river mile 963.3; resolves as WAS01279."
      },
      {
        "id": "blanchard-dam-landing",
        "name": "Mississippi River, Blanchard Dam Landing / Zebulon Pike Lake Public Water Access Site",
        "latitude": 45.8651398,
        "longitude": -94.355031,
        "mileFromStart": 6.6,
        "segmentKind": "creek",
        "note": "Last trailer access above Blanchard Dam; use as the portage staging reference."
      },
      {
        "id": "blanchard-dam-carry-in",
        "name": "Mississippi River, Blanchard Dam Public Water Access Site",
        "latitude": 45.8600499,
        "longitude": -94.3579586,
        "mileFromStart": 7.1,
        "segmentKind": "creek",
        "note": "Below-dam carry-in after the mapped 600-yard left-bank portage; resolves as WAS01282."
      },
      {
        "id": "royalton-sportsmans-club",
        "name": "Mississippi River, Royalton Sportsman's Club Public Water Access Site",
        "latitude": 45.8297201,
        "longitude": -94.3506845,
        "mileFromStart": 9.7,
        "segmentKind": "creek",
        "note": "Default take-out at DNR river mile 953.6 and direct Royalton gauge corridor."
      }
    ]
  },
  "vermilion-river-twomile-eightmile": {
    "putIn": {
      "id": "twomile-creek-access",
      "name": "Two Mile Creek Public Water Access Site",
      "latitude": 47.9885552,
      "longitude": -92.4675615
    },
    "takeOut": {
      "id": "eightmile-creek-access",
      "name": "Vermilion River, 8 Mile Creek Public Water Access Site",
      "latitude": 48.0546146,
      "longitude": -92.4809237
    },
    "logistics": {
      "distanceLabel": "About 7 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr depending on wind, level, and route-finding",
      "shuttle": "Stage the remote Eightmile Creek take-out first, then drive to Two Mile Creek. Confirm both access roads, daylight, weather, and the creek exit before launching.",
      "permits": "No route-specific paddling permit is known. Follow DNR public-access rules, Kabetogama State Forest rules, Superior National Forest rules where applicable, and Minnesota boating/PFD requirements.",
      "camping": "DNR Map 1 marks designated watercraft campsites in the broader corridor. Use only mapped/designated sites or separately verified public-land camping rules; do not assume private-bank or riverbed camping.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Two Mile Creek for DNR’s easier Vermilion recommended day through the Chain of Lakes reach, then take out by paddling up Eightmile Creek before Table Rock Falls. The Buyck gauge is downstream and must be paired with local visual checks.",
      "accessCaveats": [
        "Two Mile Creek and Eightmile Creek are remote carry-in access sites, not full-service ramps.",
        "Eightmile Creek is the planned exit. Missing it commits the group toward Table Rock Falls and a much more serious downstream hazard zone.",
        "The Buyck gauge is downstream of the route. Pair it with DNR map guidance, local visual checks, and wind conditions on wider water."
      ],
      "watchFor": [
        "Wind on wider Chain of Lakes water, low-band scraping, cold water, fresh wood, and remote rescue exposure.",
        "Private-bank limits and designated-campsite-only assumptions.",
        "The mandatory Eightmile Creek exit before Table Rock Falls and the County Road 24 whitewater/portage corridor."
      ]
    },
    "accessPoints": [
      {
        "id": "twomile-creek-access",
        "name": "Two Mile Creek Public Water Access Site",
        "latitude": 47.9885552,
        "longitude": -92.4675615,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; DNR public-water-access GIS resolves Two Mile Creek as WAS02075."
      },
      {
        "id": "eightmile-creek-access",
        "name": "Vermilion River, 8 Mile Creek Public Water Access Site",
        "latitude": 48.0546146,
        "longitude": -92.4809237,
        "mileFromStart": 7,
        "segmentKind": "creek",
        "note": "Default take-out; paddle up Eightmile Creek and exit before Table Rock Falls."
      }
    ]
  },
  "vermilion-river-shively-eightmile": {
    "putIn": {
      "name": "Vermilion River, Shively Falls Public Water Access Site",
      "latitude": 47.9698841,
      "longitude": -92.4661064
    },
    "takeOut": {
      "name": "Vermilion River, 8 Mile Creek Public Water Access Site",
      "latitude": 48.0546146,
      "longitude": -92.4809237
    },
    "logistics": {
      "distanceLabel": "9.6 mi",
      "estimatedPaddleTime": "About 4 hr to 6.5 hr depending on scouting, portages, wind, and level",
      "shuttle": "Stage the remote Eightmile Creek take-out first, then drive to Shively Falls. Confirm road access, parking, daylight, and portage appetite before launching because there is no casual mid-route exit plan.",
      "permits": "No route-specific paddling permit is known. Follow DNR public-access rules, Kabetogama State Forest rules, Superior National Forest rules where applicable, and Minnesota boating/PFD requirements.",
      "camping": "DNR Map 1 marks designated watercraft campsites near river miles 41.0, 39.3, and 36.1. Use only those mapped/designated sites or separately verified public-land camping rules; do not assume private-bank or riverbed camping.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Shively Falls, work through the upper falls-and-portage sequence, continue into the Chain of Lakes reach, and take out by paddling up Eightmile Creek. This is the advanced upstream extension of the easier Twomile-to-Eightmile day route.",
      "accessCaveats": [
        "Shively Falls and Eightmile Creek are remote carry-in access sites, not full-service ramps.",
        "The Buyck gauge is downstream of the route. Pair it with DNR map guidance, local visual checks, and scouting at each rapid.",
        "Eightmile Creek is the planned exit. Missing it commits the group toward Table Rock Falls and a much more serious downstream hazard zone."
      ],
      "watchFor": [
        "Shively Falls Class III, Liftover Falls Class II, Everett Rapids Class I-II, and long portages.",
        "Low-band water that can make rocky approaches scrapey and slow.",
        "Remote cold-water exposure, wind on wider water, fresh wood, and private-bank limits."
      ]
    },
    "accessPoints": [
      {
        "id": "shively-falls-access",
        "name": "Vermilion River, Shively Falls Public Water Access Site",
        "latitude": 47.9698841,
        "longitude": -92.4661064,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at the DNR carry-in access above the Shively Falls rapid/portage sequence."
      },
      {
        "id": "twomile-creek-reference",
        "name": "Two Mile Creek Public Water Access Site",
        "latitude": 47.9885552,
        "longitude": -92.4675615,
        "mileFromStart": 3.8,
        "segmentKind": "creek",
        "note": "Intermediate access and split point where the easier already-live Twomile-to-Eightmile route begins."
      },
      {
        "id": "eightmile-creek-access",
        "name": "Vermilion River, 8 Mile Creek Public Water Access Site",
        "latitude": 48.0546146,
        "longitude": -92.4809237,
        "mileFromStart": 9.6,
        "segmentKind": "creek",
        "note": "Default take-out; paddle up Eightmile Creek on river left and exit before Table Rock Falls."
      }
    ]
  },
  "vermilion-river-eightmile-county-road-24": {
    "putIn": {
      "name": "Vermilion River, 8 Mile Creek Public Water Access Site",
      "latitude": 48.0546146,
      "longitude": -92.4809237
    },
    "takeOut": {
      "name": "Vermilion River, Co Rd 24 Public Water Access Site",
      "latitude": 48.0720504,
      "longitude": -92.4858626
    },
    "logistics": {
      "distanceLabel": "1.3 mi",
      "estimatedPaddleTime": "Variable; plan around scout-and-portage time rather than mileage",
      "shuttle": "Stage at County Road 24 / CCC campsite before launching from Eightmile Creek. This is a short-distance but high-consequence shuttle, so inspect the take-out and portage options from land first.",
      "permits": "No route-specific paddling permit is known. Follow DNR public-access, watercraft-campsite, Kabetogama State Forest, Superior National Forest where applicable, and Minnesota boating/PFD rules.",
      "camping": "DNR Map 1 marks watercraft campsites near Eightmile Creek and at County Road 24. Use only mapped/designated public sites with current confirmation; do not improvise on private banks or riverbed areas.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch from Eightmile Creek and descend only with a deliberate Table Rock Falls plan, then take out at County Road 24 / CCC campsite. For most paddlers, this card is a portage-and-scout segment rather than a runnable float.",
      "accessCaveats": [
        "The Eightmile Creek launch requires creek access and a remote road approach.",
        "County Road 24 / CCC campsite is the mandatory finish for this card. Scout it before launch so the group does not continue into unplanned lower-river rapids.",
        "The Buyck gauge is downstream of the route and cannot substitute for scouting Table Rock Falls, portage landings, or canyon conditions."
      ],
      "watchFor": [
        "Table Rock Falls Class IV-VI, a 1,900-yard portage, vertical ledges, and continuous canyon rapids.",
        "Remote rescue exposure, slippery portage footing, cold water, and limited communication.",
        "High water increasing consequence around the falls and low water making rocky approaches slow or hazardous."
      ]
    },
    "accessPoints": [
      {
        "id": "eightmile-creek-access",
        "name": "Vermilion River, 8 Mile Creek Public Water Access Site",
        "latitude": 48.0546146,
        "longitude": -92.4809237,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in just upstream of Table Rock Falls and its portage/canyon hazard zone."
      },
      {
        "id": "county-road-24-access",
        "name": "Vermilion River, Co Rd 24 Public Water Access Site",
        "latitude": 48.0720504,
        "longitude": -92.4858626,
        "mileFromStart": 1.3,
        "segmentKind": "creek",
        "note": "Default take-out at the DNR County Road 24 / CCC campsite access below Table Rock Falls."
      }
    ]
  },
  "mississippi-river-leech-lake-schoolcraft": {
    "putIn": {
      "name": "Mississippi River, #2 Public Water Access Site",
      "latitude": 47.3020891,
      "longitude": -93.9033943
    },
    "takeOut": {
      "name": "Mississippi River, Schoolcraft SPK Public Water Access Site",
      "latitude": 47.225074,
      "longitude": -93.8021304
    },
    "logistics": {
      "distanceLabel": "About 14.7 mi",
      "estimatedPaddleTime": "About 5 hr to 7 hr depending on level, wind, and stops",
      "shuttle": "Stage a vehicle at the Schoolcraft State Park access, then drive upstream to the #2 access near the Leech Lake River corridor. Confirm state-park parking, camping, and day-use rules before relying on the endpoint.",
      "permits": "No route-specific paddling permit is known. Use the named DNR public accesses, follow Minnesota boating/PFD rules, and obey Schoolcraft State Park and watercraft-campsite rules.",
      "camping": "DNR Map 2 marks watercraft campsite context near the Leech Lake River/#2 area and Gambler's Point, and Schoolcraft State Park provides endpoint camping/drinking-water context. Use only designated, currently open campsites and confirm reservations or rules before an overnight plan.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at the #2 access and take out at Schoolcraft State Park for a 14.7-mile Mississippi headwaters connector. Days High Landing is the direct DNR level reference for this map section, but the current low-band reading makes same-day visual checks important.",
      "accessCaveats": [
        "The #2 access resolves in Minnesota public-water-access GIS as WAS02462 at DNR river mile 1213.6.",
        "Schoolcraft SPK resolves in Minnesota public-water-access GIS as WAS01351 in the state-park corridor.",
        "Do not assume informal shoreline camping or bank access; use mapped public accesses and designated campsites only."
      ],
      "watchFor": [
        "Low-water dragging, vegetation, hidden wood, and slow marsh current when the Days High Landing gauge is low.",
        "Wind on broad bends and near the Leech Lake River confluence. Carry cold-water layers and daylight margin.",
        "Private banks, limited intermediate exits, and campsite availability or rule changes."
      ]
    },
    "accessPoints": [
      {
        "id": "mississippi-river-number-2-access",
        "name": "Mississippi River, #2 Public Water Access Site",
        "latitude": 47.3020891,
        "longitude": -93.9033943,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; DNR public-water-access GIS resolves WAS02462 at river mile 1213.6."
      },
      {
        "id": "mississippi-river-schoolcraft-spk-access",
        "name": "Mississippi River, Schoolcraft SPK Public Water Access Site",
        "latitude": 47.225074,
        "longitude": -93.8021304,
        "mileFromStart": 14.7,
        "segmentKind": "creek",
        "note": "Default take-out at the Schoolcraft State Park corridor; confirm current park access and campground status if using it as an overnight endpoint."
      }
    ]
  },
  "mississippi-river-snuffies-montissippi": {
    "putIn": {
      "name": "Mississippi River, Snuffie's Landing Public Water Access Site",
      "latitude": 45.3837473,
      "longitude": -93.9148507
    },
    "takeOut": {
      "name": "Mississippi River, Montissippi Park Public Water Access Site",
      "latitude": 45.3259685,
      "longitude": -93.8236798
    },
    "logistics": {
      "distanceLabel": "About 6.7 mi",
      "estimatedPaddleTime": "About 2 hr to 3.5 hr, longer with wind, low water, or a campsite stop",
      "shuttle": "Stage Montissippi County Park first, then drive back to Snuffie's Landing. Inspect the Montissippi landing before launch because it is the planned exit before the Monticello / Norin continuation.",
      "permits": "No route-specific paddling permit is known. Use the named public accesses, follow Minnesota boating/PFD rules, and obey city, county, DNR, camping, and fishing rules.",
      "camping": "DNR Map 8 identifies a no-fee watercraft campsite at Montissippi County Park. Treat it as a managed endpoint campsite only; do not assume private island or bank camping elsewhere.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Snuffie's Landing and take out at Montissippi County Park for the next Map 8 Mississippi connector below Clearwater. The St. Cloud gauge is upstream, so pair its official bands with local wind, riffle, and access checks.",
      "accessCaveats": [
        "Snuffie's Landing resolves as WAS01297 at river mile 905.5 and Montissippi Park resolves as WAS01292 near river mile 898.8 in Minnesota public-water-access GIS.",
        "The St. Cloud gauge is upstream of this route and should be treated as a same-map proxy, not an exact local measurement.",
        "Take out at Montissippi for this card. Continuing toward Ellison, Norin, or Babcock needs a separate downstream shuttle plan."
      ],
      "watchFor": [
        "Low-water riffles, shallow side channels, and slower progress when the upstream St. Cloud gauge is near the low band.",
        "Fast current, floating wood, bridge approaches, wind on open bends, motorboats, anglers, cold water, and private banks.",
        "Montissippi campsite and park rules if using the take-out as an overnight endpoint."
      ]
    },
    "accessPoints": [
      {
        "id": "snuffies-landing",
        "name": "Mississippi River, Snuffie's Landing Public Water Access Site",
        "latitude": 45.3837473,
        "longitude": -93.9148507,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; resolves as WAS01297 at DNR river mile 905.5."
      },
      {
        "id": "montissippi-park",
        "name": "Mississippi River, Montissippi Park Public Water Access Site",
        "latitude": 45.3259685,
        "longitude": -93.8236798,
        "mileFromStart": 6.7,
        "segmentKind": "creek",
        "note": "Default take-out with park and watercraft-campsite context; resolves as WAS01292 near DNR river mile 898.8."
      }
    ]
  },
  "mississippi-river-montissippi-norin": {
    "putIn": {
      "name": "Mississippi River, Montissippi Park Public Water Access Site",
      "latitude": 45.3259685,
      "longitude": -93.8236798
    },
    "takeOut": {
      "name": "Mississippi River, Norin Landing Public Water Access Site",
      "latitude": 45.3042771,
      "longitude": -93.683881
    },
    "logistics": {
      "distanceLabel": "About 7.8 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, longer with wind, island routing, or low water",
      "shuttle": "Stage Norin Landing first, then drive back to Montissippi County Park. Ellison Park is the clearest public mid-route bailout if the wind, weather, or group pace changes.",
      "permits": "No route-specific paddling permit is known. Use the named public accesses, follow Minnesota boating/PFD rules, and obey city, county, DNR, SNA, and fishing rules.",
      "camping": "Treat this as a day route. Bridgeview Park camping is by permission only and Dimmick Island campsite is downstream of the Norin take-out, so this card does not assume on-route camping.",
      "campingClassification": "none",
      "summary": "Launch at Montissippi County Park and take out at Norin Landing for the missing Map 8 connector above the already-live Norin-to-Babcock route. Use the St. Cloud gauge as an upstream same-map proxy.",
      "accessCaveats": [
        "Montissippi Park resolves as WAS01292, Ellison Park resolves as WAS01310, and Norin Landing resolves as WAS02427 in Minnesota public-water-access GIS.",
        "The St. Cloud gauge is upstream of this route and should be treated as a same-map proxy. Make a local visual check for island-channel depth and wind before launching.",
        "Norin is the planned take-out for this card. The Norin-to-Babcock continuation is already modeled as a separate route."
      ],
      "watchFor": [
        "Island channels, shallow bars, riffles, sweepers, and floating wood through the Mississippi River Islands corridor.",
        "Wind on open bends, motorboat wake, anglers, bridge current, cold water, and private banks.",
        "SNA and park rules. Use public accesses and legal public stops rather than improvising on islands or private shoreline."
      ]
    },
    "accessPoints": [
      {
        "id": "montissippi-park",
        "name": "Mississippi River, Montissippi Park Public Water Access Site",
        "latitude": 45.3259685,
        "longitude": -93.8236798,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; resolves as WAS01292 near DNR river mile 898.8."
      },
      {
        "id": "ellison-park",
        "name": "Mississippi River, Ellison Park Public Water Access Site",
        "latitude": 45.3035233,
        "longitude": -93.7820461,
        "mileFromStart": 2.6,
        "segmentKind": "transition",
        "note": "Public mid-route access at DNR river mile 896.2; resolves as WAS01310."
      },
      {
        "id": "norin-landing",
        "name": "Mississippi River, Norin Landing Public Water Access Site",
        "latitude": 45.3042771,
        "longitude": -93.683881,
        "mileFromStart": 7.8,
        "segmentKind": "creek",
        "note": "Default take-out; resolves as WAS02427 at DNR river mile 891.0."
      }
    ]
  },
  "kettle-river-musclewood-1": {
    "putIn": {
      "name": "Musclewood Lake Public Water Access Site",
      "latitude": 46.3612199,
      "longitude": -92.8437237
    },
    "takeOut": {
      "name": "Kettle River #1 Public Water Access Site",
      "latitude": 46.1802972,
      "longitude": -92.832115
    },
    "logistics": {
      "distanceLabel": "About 16.5 mi",
      "estimatedPaddleTime": "About 6 hr to 9 hr depending on level, scouting, and low-water dragging",
      "shuttle": "Stage the #1 take-out west of Askov first, then drive upstream to Musclewood Lake. This is a full-day one-way; start early and do not continue into Banning State Park whitewater unless that separate plan is intentional.",
      "permits": "No route-specific paddling permit is known. Follow DNR public-water-access rules, Minnesota boating/PFD requirements, and posted parking or public-land rules.",
      "camping": "DNR Kettle maps support watercraft camping and public-land camping rules on the broader trail, but this card should be planned as a long day unless a legal designated or public-land overnight stop is separately confirmed.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Musclewood Lake and take out at Kettle River #1 for the official DNR 16.5-mile day trip. The Willow River / Long Lake Road gauge was below the official scrapable floor during this run, so low-water dragging is the default assumption today.",
      "accessCaveats": [
        "Musclewood Lake resolves in Minnesota public-water-access GIS as WAS00898 at DNR river mile 46.2. DNR route text places the put-in at river mile 46.3.",
        "#1 resolves in Minnesota public-water-access GIS as WAS00904 near river mile 29.8 west of Askov.",
        "The Kettle is runoff-driven and can change quickly. Confirm the gauge and visually inspect the put-in before committing to the full-day distance."
      ],
      "watchFor": [
        "Class I-II rapids between river miles 33.5 and 32, plus shallow rocks and scraping below the official 78 ft scrapable floor.",
        "Fresh wood, fast rain-driven rises, cold water, private banks, and limited road exits over a long day.",
        "Accidentally extending downstream into Banning State Park whitewater without helmets, portage scouting, and rescue planning."
      ]
    },
    "accessPoints": [
      {
        "id": "kettle-musclewood",
        "name": "Musclewood Lake Public Water Access Site",
        "latitude": 46.3612199,
        "longitude": -92.8437237,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; resolves as WAS00898 at DNR river mile 46.2."
      },
      {
        "id": "kettle-number-one",
        "name": "Kettle River #1 Public Water Access Site",
        "latitude": 46.1802972,
        "longitude": -92.832115,
        "mileFromStart": 16.5,
        "segmentKind": "creek",
        "note": "Default take-out; resolves as WAS00904 near DNR river mile 29.8."
      }
    ]
  },
  "red-river-highway-25-halstad": {
    "putIn": {
      "name": "Red River, Hendrum Public Water Access Site",
      "latitude": 47.2669747,
      "longitude": -96.8338196
    },
    "takeOut": {
      "name": "Red River, Halstad Landing Public Water Access Site",
      "latitude": 47.3532666,
      "longitude": -96.8401799
    },
    "logistics": {
      "distanceLabel": "About 11.2 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr depending on current, wind, and landing conditions",
      "shuttle": "Stage Halstad Landing first, then drive south to the Highway 25 / Hendrum public access. Check both muddy banks before unloading, because very low water can make either landing awkward even when access is public.",
      "permits": "No route-specific paddling permit is known. Follow Minnesota boating/PFD rules, Red River state-water-trail guidance, and all posted local access rules.",
      "camping": "Treat this as a day trip. No on-route watercraft campsite was confirmed for the County Road 25-to-Halstad reach, and private banks should not be used for informal camping.",
      "campingClassification": "none",
      "summary": "Launch at the Highway 25 / Hendrum public access and take out at Halstad Landing for the official DNR 11.2-mile Map 3 day trip. The Halstad gauge was below the official scrapable floor during this run, so this is not a good low-water call today.",
      "accessCaveats": [
        "The Hendrum public access resolves in Minnesota public-water-access GIS as WAS00548 at DNR river mile 392.7, matching the DNR County Road 25 / Canning Landing trip start.",
        "Halstad Landing resolves as WAS00536 at DNR river mile 381.5 near the Halstad DNR gauge.",
        "The Red River is a border river with muddy banks and limited mid-route exits. Use public landings and confirm parking, slope, and water depth at both ends."
      ],
      "watchFor": [
        "Low-water mud, shallow bars, snags, hidden wood, and poor underwater visibility.",
        "Flooding, fast rises, strong current, wind on open bends, motorboats, and cold water.",
        "Private shoreline and long rural response times if a boat pins, capsizes, or misses the take-out."
      ]
    },
    "accessPoints": [
      {
        "id": "red-river-hendrum-highway-25",
        "name": "Red River, Hendrum Public Water Access Site",
        "latitude": 47.2669747,
        "longitude": -96.8338196,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; resolves as WAS00548 at DNR river mile 392.7."
      },
      {
        "id": "red-river-halstad-landing",
        "name": "Red River, Halstad Landing Public Water Access Site",
        "latitude": 47.3532666,
        "longitude": -96.8401799,
        "mileFromStart": 11.2,
        "segmentKind": "creek",
        "note": "Default take-out; resolves as WAS00536 at DNR river mile 381.5."
      }
    ]
  },
  "kettle-river-number-4-number-5": {
    "putIn": {
      "name": "Kettle River #4 Public Water Access Site",
      "latitude": 46.1079205,
      "longitude": -92.863723
    },
    "takeOut": {
      "name": "Kettle River #5 Public Water Access Site",
      "latitude": 46.0108726,
      "longitude": -92.8400816
    },
    "logistics": {
      "distanceLabel": "About 8.5 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr depending on level, scouting, and low-water dragging",
      "shuttle": "Stage #5 first, then drive upstream to #4. Do not move the put-in upstream to Sandstone, #2, or #1 unless the group is intentionally running the advanced Banning whitewater card.",
      "permits": "No route-specific paddling permit is known. Follow DNR public-water-access rules, Banning State Park rules where applicable, Minnesota boating/PFD requirements, and posted parking limits.",
      "camping": "Treat this as a day trip. Banning State Park and mapped watercraft campsites provide nearby planning context upstream, but this connector should not rely on informal bank camping.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Kettle River #4 and take out at #5 for the lower-Banning connector below the hardest Sandstone rapids. The Sandstone DNR gauge is direct to the put-in corridor and was far below the official scrapable floor during this run.",
      "accessCaveats": [
        "#4 and #5 both resolve in Minnesota public-water-access GIS with Kettle River mile records and coordinates.",
        "#4 is the intended upstream boundary. Starting above #4 adds Big Spring Falls / Sandstone Rapids, undercut walls, and advanced portage decisions.",
        "The Kettle is runoff-sensitive; access may be physically public even when the channel is too low or too pushy for the selected group."
      ],
      "watchFor": [
        "Shallow rocks, scraping, and dragging when the Sandstone gauge is below the official 800 cfs scrapable floor.",
        "Fresh wood, fast rain-driven rises, cold water, and limited road access between #4 and #5.",
        "Accidentally treating this as an extension of the upstream Banning whitewater route without helmets, rescue gear, or portage planning."
      ]
    },
    "accessPoints": [
      {
        "id": "kettle-river-four",
        "name": "Kettle River #4 Public Water Access Site",
        "latitude": 46.1079205,
        "longitude": -92.863723,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in below the main Banning rapids corridor; resolves as WAS02573 at DNR river mile 23.6."
      },
      {
        "id": "kettle-river-five",
        "name": "Kettle River #5 Public Water Access Site",
        "latitude": 46.0108726,
        "longitude": -92.8400816,
        "mileFromStart": 8.5,
        "segmentKind": "creek",
        "note": "Default take-out at DNR river mile 15.1; resolves as WAS00910."
      }
    ]
  },
  "st-louis-river-county-road-4-95": {
    "putIn": {
      "name": "County Road 4 bridge carry-in",
      "latitude": 47.429,
      "longitude": -92.255
    },
    "takeOut": {
      "name": "St. Louis River, County Rd 95 Public Water Access Site",
      "latitude": 47.4009308,
      "longitude": -92.3775989
    },
    "logistics": {
      "distanceLabel": "About 7.3 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr depending on level, scouting, and shallow sections",
      "shuttle": "Stage County Road 95 first, then drive upstream to the County Road 4 bridge. Confirm legal roadside parking and carry in on the downstream side of the bridge before unloading.",
      "permits": "No route-specific paddling permit is known. Use legal public right-of-way or DNR public access only, follow Minnesota boating/PFD rules, and check current St. Louis River water-trail alerts.",
      "camping": "Treat this as a day trip. DNR discusses dispersed camping rules for the broader Superior National Forest corridor, but no designated on-route campsite was confirmed between County Road 4 and County Road 95.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch from the undeveloped County Road 4 bridge carry-in and take out at the County Road 95 public access for the official DNR 7.3-mile upper St. Louis day trip. The downstream Forbes gauge was below the official scrapable floor during this run, so visual low-water checks are essential.",
      "accessCaveats": [
        "County Road 4 is a DNR-recommended undeveloped bridge carry-in at river mile 151.9, not a formal public-water-access-layer record.",
        "County Road 95 resolves in Minnesota public-water-access GIS as WAS02152 at DNR river mile 144.5 / 144.6.",
        "The Forbes gauge is downstream of this trip. Use it as a conservative corridor proxy and confirm depth at both endpoints before launching."
      ],
      "watchFor": [
        "Shallow sandy sections on the recommended route and difficult boulder-bed conditions nearby at medium-low water.",
        "Wood, strainers, cold water, remote banks, limited services, and the logjam-prone upper-river context shown upstream on DNR Map 1.",
        "Private shoreland and unclear roadside parking at the undeveloped County Road 4 bridge put-in."
      ]
    },
    "accessPoints": [
      {
        "id": "st-louis-county-road-4-bridge",
        "name": "County Road 4 bridge carry-in",
        "latitude": 47.429,
        "longitude": -92.255,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "DNR-recommended undeveloped put-in at river mile 151.9; coordinate is map/bridge-derived and requires same-day legal launch confirmation."
      },
      {
        "id": "st-louis-county-road-95",
        "name": "St. Louis River, County Rd 95 Public Water Access Site",
        "latitude": 47.4009308,
        "longitude": -92.3775989,
        "mileFromStart": 7.3,
        "segmentKind": "creek",
        "note": "Default take-out; public-water-access GIS resolves WAS02152 at river mile 144.5."
      }
    ]
  },
  "st-louis-river-county-road-95-forbes": {
    "putIn": {
      "name": "St. Louis River, County Rd 95 Public Water Access Site",
      "latitude": 47.4009308,
      "longitude": -92.3775989
    },
    "takeOut": {
      "name": "St. Louis River, Forbes Public Water Access Site",
      "latitude": 47.3621657,
      "longitude": -92.6007601
    },
    "logistics": {
      "distanceLabel": "About 18.6 mi",
      "estimatedPaddleTime": "About 7 hr to 10 hr depending on level, scouting, and wood",
      "shuttle": "Stage the Forbes take-out first, then drive upstream to the County Road 95 DNR access. Identify the Forbes access and downstream dam boundary before launch so the day ends at the public access, not at dam structures.",
      "permits": "No route-specific paddling permit is known. Use the named DNR public accesses, follow Minnesota boating/PFD rules, and check current St. Louis River water-trail alerts before committing.",
      "camping": "No designated on-route watercraft campsite was confirmed for this 18.6-mile split. Treat it as a long day trip or use legal nearby basecamp options only if separately reserved or confirmed.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at County Road 95 and take out at Forbes for the downstream upper St. Louis section below the existing County-Road-4-to-95 card. The Forbes DNR gauge is direct at the take-out corridor, but low-water scraping, boulder beds, wood, and Forbes Dam discipline drive the trip call.",
      "accessCaveats": [
        "County Road 95 resolves in Minnesota public-water-access GIS as WAS02152 at DNR river mile 144.5.",
        "Forbes resolves in Minnesota public-water-access GIS as WAS00614 near DNR river mile 125.9.",
        "Forbes Dam is downstream of the take-out corridor. Do not miss the public access or continue without a separate portage and dam plan."
      ],
      "watchFor": [
        "Boulder beds, shallow ledges, Class I-III context on the DNR map, and long scraping at low Forbes readings.",
        "Wood, strainers, cold water, limited exits, and remote rescue exposure over an 18.6-mile day.",
        "Dam, portage, and Highway 53 corridor hazards if extending or if the take-out is missed."
      ]
    },
    "accessPoints": [
      {
        "id": "county-road-95",
        "name": "St. Louis River, County Rd 95 Public Water Access Site",
        "latitude": 47.4009308,
        "longitude": -92.3775989,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; public-water-access GIS resolves WAS02152 at river mile 144.5."
      },
      {
        "id": "forbes-st-louis-access",
        "name": "St. Louis River, Forbes Public Water Access Site",
        "latitude": 47.3621657,
        "longitude": -92.6007601,
        "mileFromStart": 18.6,
        "segmentKind": "creek",
        "note": "Default take-out; public-water-access GIS resolves WAS00614 at river mile 125.9 upstream of Forbes Dam context."
      }
    ]
  },
  "cedar-river-lansing-ramsey-mill-pond": {
    "putIn": {
      "name": "Lansing / County Road 2 bridge gauge access",
      "latitude": 43.746416,
      "longitude": -92.958145
    },
    "takeOut": {
      "name": "Cedar River, Ramsey Mill Pond Public Water Access Site",
      "latitude": 43.7064812,
      "longitude": -92.9595181
    },
    "logistics": {
      "distanceLabel": "About 3.8 mi",
      "estimatedPaddleTime": "About 1.5 hr to 2.5 hr, longer with low water, wood, or dam-area scouting",
      "shuttle": "Stage Ramsey Mill Pond first, then drive north to the Lansing / County Road 2 bridge. Confirm that the bridge launch is legal and practical before unloading, and identify the Ramsey take-out above the low-head dam before launch.",
      "permits": "No route-specific paddling permit is known. Use legal public right-of-way or public access only, follow Minnesota boating/PFD rules, and obey posted dam, park, WMA, and private-bank signs.",
      "camping": "Treat this as a short day trip. DNR does not document an on-route campsite between Lansing and Ramsey Mill Pond, and riverbed camping next to private property is not permitted.",
      "campingClassification": "none",
      "summary": "Launch near the Lansing / County Road 2 DNR gauge and take out at Ramsey Mill Pond for the short upper-Cedar approach to the existing Ramsey-to-Austin route. The Lansing gauge is direct and was in the official medium band during this run.",
      "accessCaveats": [
        "The Lansing put-in is anchored to the DNR river-level gauge and County Road 2 bridge at river mile 25.0, not to a public-water-access-layer record. Confirm same-day legal launch and parking before using it.",
        "Ramsey Mill Pond resolves as DNR access WAS01376 at river mile 21.2 with public-water-access coordinates.",
        "Take out at Ramsey above the low-head dam unless you have separately planned the Ramsey-to-Austin route and portage/dam context."
      ],
      "watchFor": [
        "The Ramsey Mill Pond low-head dam and portage context; this route ends before the dam.",
        "Snags, overhanging trees, shallow spots, private banks, and occasional flood conditions.",
        "Fast rises after rain and low-water scraping as the Lansing gauge falls toward the official low and scrapable bands."
      ]
    },
    "accessPoints": [
      {
        "id": "lansing-county-road-2-gauge",
        "name": "Lansing / County Road 2 bridge gauge access",
        "latitude": 43.746416,
        "longitude": -92.958145,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "DNR-mapped river-level gauge at river mile 25.0; confirm legal launch and parking before using."
      },
      {
        "id": "ramsey-mill-pond",
        "name": "Cedar River, Ramsey Mill Pond Public Water Access Site",
        "latitude": 43.7064812,
        "longitude": -92.9595181,
        "mileFromStart": 3.8,
        "segmentKind": "creek",
        "note": "Default take-out above Ramsey Mill Pond dam; resolves as WAS01376 at river mile 21.2."
      }
    ]
  },
  "st-louis-river-zim-toivola": {
    "putIn": {
      "name": "St. Louis River, Zim Public Water Access Site",
      "latitude": 47.3059388,
      "longitude": -92.6595318
    },
    "takeOut": {
      "name": "St. Louis River, Toivola Public Water Access Site",
      "latitude": 47.1672586,
      "longitude": -92.7792689
    },
    "logistics": {
      "distanceLabel": "About 18.8 mi",
      "estimatedPaddleTime": "About 7 hr to 10 hr, longer with low-water dragging, scouting, or an overnight stop",
      "shuttle": "Stage Toivola first, then drive back to Zim. Confirm both remote carry-in accesses, the low-water condition, and whether the group is treating Stony Creek as an emergency stop, a legal campsite stop, or no stop at all.",
      "permits": "No route-specific paddling permit is known. Use the DNR public accesses, follow Minnesota boating/PFD rules, and obey state water-trail and campsite rules.",
      "camping": "DNR Map 1 marks the Stony Creek watercraft campsite at river mile 99.0 between Zim and Toivola. Use only designated or otherwise legal public-land sites, and do not camp on private riverbed or private banks.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Zim and take out at Toivola for the upper-St. Louis connector below the existing Forbes-to-Zim route. The Forbes DNR gauge is an upstream proxy and was below the official scrapable floor during this run, so low-water dragging is the default assumption.",
      "accessCaveats": [
        "Minnesota public-water-access GIS resolves Zim as WAS00613 at river mile 113.0 and Toivola as WAS00615 at river mile 94.2.",
        "The Forbes gauge is upstream of Zim. It has official DNR interpretation bands, but it is still a corridor proxy and should be paired with launch-side depth checks.",
        "Do not continue below Toivola into the longer Toivola-to-County-Road-29 route unless that separate plan, campsite posture, and downstream gauge caveat are already accepted."
      ],
      "watchFor": [
        "Below-scrapable Forbes readings, exposed boulder beds, shallow riffles, and possible dragging.",
        "Class I rapids near river mile 99, cold water, fresh wood, strainers, remote banks, and limited services.",
        "Private shoreland away from DNR accesses or designated/legal public campsites."
      ]
    },
    "accessPoints": [
      {
        "id": "st-louis-zim",
        "name": "St. Louis River, Zim Public Water Access Site",
        "latitude": 47.3059388,
        "longitude": -92.6595318,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; resolves as WAS00613 at DNR river mile 113.0."
      },
      {
        "id": "stony-creek-watercraft-campsite",
        "name": "Stony Creek watercraft campsite",
        "latitude": 47.208,
        "longitude": -92.729,
        "mileFromStart": 14,
        "segmentKind": "creek",
        "note": "DNR Map 1 marks this watercraft campsite at river mile 99.0; coordinates are approximate from the mapped river-mile location."
      },
      {
        "id": "st-louis-toivola",
        "name": "St. Louis River, Toivola Public Water Access Site",
        "latitude": 47.1672586,
        "longitude": -92.7792689,
        "mileFromStart": 18.8,
        "segmentKind": "creek",
        "note": "Default take-out; resolves as WAS00615 at DNR river mile 94.2."
      }
    ]
  },
  "st-louis-river-toivola-county-road-29": {
    "putIn": {
      "name": "St. Louis River, Toivola Public Water Access Site",
      "latitude": 47.1672586,
      "longitude": -92.7792689
    },
    "takeOut": {
      "name": "St. Louis River, Co Rd 29 Public Water Access Site",
      "latitude": 46.9713542,
      "longitude": -92.8258324
    },
    "logistics": {
      "distanceLabel": "About 15.7 mi",
      "estimatedPaddleTime": "About 6 hr to 9 hr, longer with low-water dragging, scouting, or a campsite stop",
      "shuttle": "Stage County Road 29 first, then drive back to Toivola. Confirm both DNR carry-in accesses, the Floodwood gauge, and whether the river mile 90.8 campsite is part of the plan before unloading.",
      "permits": "No route-specific paddling permit is known. Use DNR public accesses, follow Minnesota boating/PFD rules, and obey state water-trail, forest, campsite, and private-bank rules.",
      "camping": "DNR Map 1 marks a watercraft campsite near river mile 90.8 between Toivola and County Road 29. Use only designated or otherwise legal public-land sites, and do not camp on private banks or riverbed next to private property.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Toivola and take out at County Road 29 for a long St. Louis Map 1/2 connector. The Floodwood gauge is downstream and below the official scrapable floor during this run, so make visual depth checks before committing.",
      "accessCaveats": [
        "Minnesota public-water-access GIS resolves Toivola as WAS00615 at river mile 94.2 and County Road 29 as WAS02129 at river mile 78.5.",
        "The Floodwood gauge is downstream of the take-out. Treat it as a same-corridor proxy and check local depth at Toivola and County Road 29 before launching.",
        "County Road 29 is the planned finish. Do not continue toward Floodwood without a separate shuttle, daylight, and low/high-water plan."
      ],
      "watchFor": [
        "Low-water dragging and exposed rocks when the Floodwood gauge is below the official 24.4 ft scrapable floor.",
        "Cold water, fresh wood, strainers, remote banks, and limited road access between bridges.",
        "Private shoreland away from DNR accesses and designated/legal public campsites."
      ]
    },
    "accessPoints": [
      {
        "id": "st-louis-toivola",
        "name": "St. Louis River, Toivola Public Water Access Site",
        "latitude": 47.1672586,
        "longitude": -92.7792689,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; resolves as WAS00615 at DNR river mile 94.2."
      },
      {
        "id": "st-louis-county-road-29",
        "name": "St. Louis River, Co Rd 29 Public Water Access Site",
        "latitude": 46.9713542,
        "longitude": -92.8258324,
        "mileFromStart": 15.7,
        "segmentKind": "creek",
        "note": "Default take-out; resolves as WAS02129 at DNR river mile 78.5."
      }
    ]
  },
  "st-louis-river-county-road-29-floodwood": {
    "putIn": {
      "name": "St. Louis River, Co Rd 29 Public Water Access Site",
      "latitude": 46.9713542,
      "longitude": -92.8258324
    },
    "takeOut": {
      "name": "Floodwood River Public Water Access Site",
      "latitude": 46.9291846,
      "longitude": -92.9170726
    },
    "logistics": {
      "distanceLabel": "About 6.4 mi including the Floodwood River take-out approach",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, longer with low-water scraping or a difficult Floodwood River turn",
      "shuttle": "Stage the Floodwood city access first, then drive to County Road 29. Confirm the short upstream or side-channel approach on the Floodwood River before launching from County Road 29.",
      "permits": "No route-specific paddling permit is known. Use the DNR and city public accesses, follow Minnesota boating/PFD rules, and obey posted city, DNR, and private-bank rules.",
      "camping": "Treat this as a day trip. DNR Map 2 marks a watercraft campsite just below County Road 29, but this short connector should not be used as an informal overnight unless the site and rules are confirmed for the specific plan.",
      "campingClassification": "none",
      "summary": "Launch at County Road 29 and finish at the Floodwood public access for the short above-town St. Louis connector. The direct Floodwood DNR gauge was below the official scrapable floor during this run.",
      "accessCaveats": [
        "County Road 29 resolves as WAS02129 at DNR river mile 78.5.",
        "Floodwood River access resolves as WAS01940. DNR Map 2 places the St. Louis/Floodwood River confluence at river mile 72.6 and notes the trailer access is about one-half mile up the Floodwood River.",
        "Identify the Floodwood River turn and city access before launching so the take-out is not missed in low light or high current."
      ],
      "watchFor": [
        "Low-water scraping and shallow riffles when the Floodwood gauge is below the official scrapable floor.",
        "Wood, strainers, private banks, cold water, and changing current near the Floodwood River confluence.",
        "Short-mile complacency; this is still a remote-feeling St. Louis reach with limited bailouts."
      ]
    },
    "accessPoints": [
      {
        "id": "st-louis-county-road-29",
        "name": "St. Louis River, Co Rd 29 Public Water Access Site",
        "latitude": 46.9713542,
        "longitude": -92.8258324,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; resolves as WAS02129 at DNR river mile 78.5."
      },
      {
        "id": "floodwood-river-public-access",
        "name": "Floodwood River Public Water Access Site",
        "latitude": 46.9291846,
        "longitude": -92.9170726,
        "mileFromStart": 6.4,
        "segmentKind": "creek",
        "note": "Default take-out; resolves as WAS01940 on the Floodwood River about one-half mile from the St. Louis confluence."
      }
    ]
  },
  "st-louis-river-floodwood-paupores": {
    "putIn": {
      "name": "Floodwood River Public Water Access Site",
      "latitude": 46.9291846,
      "longitude": -92.9170726
    },
    "takeOut": {
      "name": "St. Louis River, Paupores Public Water Access Site",
      "latitude": 46.8741117,
      "longitude": -92.7652286
    },
    "logistics": {
      "distanceLabel": "About 11.3 mi including the Floodwood River access approach",
      "estimatedPaddleTime": "About 4.5 hr to 7 hr, longer with rapid scouting, low water, or wind",
      "shuttle": "Stage Paupores first, then drive to the Floodwood city access. Confirm the Floodwood River route back to the St. Louis mainstem and the Paupores take-out before launching.",
      "permits": "No route-specific paddling permit is known. Use the city and DNR public accesses, follow Minnesota boating/PFD rules, and obey DNR water-trail, AMA, and private-bank rules.",
      "camping": "Treat this as a day trip. DNR Map 2 shows the watercraft-campsite cluster beginning below Paupores on the separate Paupores-to-Brookston route, not on this Floodwood-to-Paupores split.",
      "campingClassification": "none",
      "summary": "Launch from Floodwood, rejoin the St. Louis, and take out at Paupores for the rapid-marked lower Map 2 connector. The Floodwood gauge is direct at the launch corridor and was below scrapable during this run.",
      "accessCaveats": [
        "Floodwood River access resolves as WAS01940; DNR Map 2 places the St. Louis confluence about one-half mile downstream from the city access.",
        "Paupores resolves as WAS00609 at DNR river mile 61.8.",
        "Paupores is the planned finish. Continuing to Brookston is a separate route with its own campsite and railroad-bridge finish context."
      ],
      "watchFor": [
        "Class I-II rapid sections below Floodwood, including rapids DNR says can be dangerous in high water.",
        "Large-island channel decisions, cold water, wood, strainers, private banks, and limited access between Floodwood and Paupores.",
        "Low-water rocks and shoals when the Floodwood gauge is below 24.4 ft; high or rising water can remove recovery time in the rapid sections."
      ]
    },
    "accessPoints": [
      {
        "id": "floodwood-river-public-access",
        "name": "Floodwood River Public Water Access Site",
        "latitude": 46.9291846,
        "longitude": -92.9170726,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; resolves as WAS01940 on the Floodwood River about one-half mile from the St. Louis confluence."
      },
      {
        "id": "st-louis-paupores",
        "name": "St. Louis River, Paupores Public Water Access Site",
        "latitude": 46.8741117,
        "longitude": -92.7652286,
        "mileFromStart": 11.3,
        "segmentKind": "creek",
        "note": "Default take-out; resolves as WAS00609 at DNR river mile 61.8."
      }
    ]
  },
  "minnesota-river-skalbekken-morton": {
    "putIn": {
      "name": "Minnesota River, Skalbekken Public Water Access Site",
      "latitude": 44.7317349,
      "longitude": -95.4194534
    },
    "takeOut": {
      "name": "Minnesota River, Morton Access Public Water Access Site",
      "latitude": 44.5427019,
      "longitude": -95.002258
    },
    "logistics": {
      "distanceLabel": "About 34.5 mi",
      "estimatedPaddleTime": "Best planned as an efficient all-day paddle or a supported overnight; roughly 11 hr to 15 hr total paddling time depending on current, wind, and scouting",
      "shuttle": "Stage Morton Access first, then drive back to Skalbekken County Park. Confirm campsite rules, daylight, road access, and a conservative split plan before launching because public exits are widely spaced.",
      "permits": "No route-specific paddling permit is known. Use the named public accesses, follow Minnesota boating/PFD rules, and obey county-park, DNR water-trail, campsite, WMA/AMA, and posted access rules.",
      "camping": "This route is overnight-capable only through mapped/designated options such as Vicksburg County Park watercraft campsite/rest area and the lower Map 3 watercraft campsite near river mile 195.6. Confirm current rules and do not camp on private banks or unposted riverbed areas.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Skalbekken County Park and take out at Morton Access for the long lower half of MN DNR Map 3. The Morton gauge sits at the take-out corridor and gives this route direct official bands, but distance, campsites, and Class I rapid scouting make it a planning route.",
      "accessCaveats": [
        "Skalbekken resolves as WAS00685 and Morton Access resolves as WAS00670 in Minnesota public-water-access GIS with coordinates and water-trail mile records.",
        "Vicksburg County Park and North Redwood are mapped intermediate access/campsite contexts, but only use them if current public access, parking, and campsite rules are confirmed.",
        "Do not rely on private banks, farm lanes, WMA/AMA edges, or informal bars for bailout or camping. Treat public exits as sparse."
      ],
      "watchFor": [
        "Long-mile fatigue, rural rescue spacing, wind on open bends, muddy banks, floating debris, strainers, and fast rises after rain.",
        "Class I rapids near Vicksburg and Patterson Rapids, rock ledges, bluffs, and low-water shoals. Scout or portage when local conditions exceed the group.",
        "Private-bank limits and campsite availability. Have a legal overnight plan before treating this as more than a long day route."
      ]
    },
    "accessPoints": [
      {
        "id": "skalbekken",
        "name": "Minnesota River, Skalbekken Public Water Access Site",
        "latitude": 44.7317349,
        "longitude": -95.4194534,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at DNR Map 3 river mile 224.5; resolves as WAS00685."
      },
      {
        "id": "morton-access",
        "name": "Minnesota River, Morton Access Public Water Access Site",
        "latitude": 44.5427019,
        "longitude": -95.002258,
        "mileFromStart": 34.5,
        "segmentKind": "creek",
        "note": "Default take-out at DNR Map 3 river mile 189.9 / GIS river mile 189.7; resolves as WAS00670 near the Morton gauge."
      }
    ]
  },
  "mississippi-river-schoolcraft-number-10": {
    "putIn": {
      "name": "Mississippi River, Schoolcraft SPK Public Water Access Site",
      "latitude": 47.225074,
      "longitude": -93.8021304
    },
    "takeOut": {
      "name": "Mississippi River, #10 Public Water Access Site",
      "latitude": 47.2253901,
      "longitude": -93.7611191
    },
    "logistics": {
      "distanceLabel": "4.1 mi",
      "estimatedPaddleTime": "About 1.5 hr to 2.5 hr depending on level, wood, and stops",
      "shuttle": "Stage the vehicle at #10 Access first, then drive back to Schoolcraft State Park. Confirm the #10 road approach and parking before launch because it is the planned take-out, not just a bailout.",
      "permits": "No route-specific paddling permit is known. Use DNR public accesses, follow Minnesota boating/PFD rules, and confirm Schoolcraft State Park vehicle fees, parking, and camping rules if using the park as a basecamp.",
      "camping": "Schoolcraft State Park supports an endpoint/basecamp overnight plan with fee camping and drinking water. The 4.1-mile route itself should be treated as a day trip unless a separate legal overnight plan is confirmed.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Schoolcraft State Park and take out at #10 Access for the official 4.1-mile DNR short option on the upper Mississippi. This keeps the easy access pair separate from the longer Schoolcraft-to-Sylvan commitment.",
      "accessCaveats": [
        "Schoolcraft State Park and #10 both resolve as public Mississippi River access sites in the Minnesota public-water-access GIS.",
        "The Days High Landing gauge is just upstream of the short reach and should be paired with a visual check for low-water shallows and fresh wood.",
        "Continuing below #10 becomes the longer Schoolcraft-to-Sylvan corridor and needs a separate shuttle, daylight, and stamina plan."
      ],
      "watchFor": [
        "Low-water scraping, shallow bars, riffles, sweepers, and fresh strainers.",
        "Cold water outside summer and limited informal exits even on a short route.",
        "Private banks and state-park rules around stops, parking, and camping."
      ]
    },
    "accessPoints": [
      {
        "id": "schoolcraft-state-park",
        "name": "Mississippi River, Schoolcraft SPK Public Water Access Site",
        "latitude": 47.225074,
        "longitude": -93.8021304,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at DNR river mile 1198.8 with Schoolcraft State Park support nearby."
      },
      {
        "id": "number-10-access",
        "name": "Mississippi River, #10 Public Water Access Site",
        "latitude": 47.2253901,
        "longitude": -93.7611191,
        "mileFromStart": 4.1,
        "segmentKind": "creek",
        "note": "Default take-out at the official short-route endpoint."
      }
    ]
  },
  "mississippi-river-crow-wing-state-park-fort-ripley": {
    "putIn": {
      "name": "Mississippi River, Crow Wing State Park Public Water Access Site",
      "latitude": 46.26826999422346,
      "longitude": -94.34310794944992
    },
    "takeOut": {
      "name": "Mississippi River, Fort Ripley Landing Public Water Access Site",
      "latitude": 46.1794923,
      "longitude": -94.3648683
    },
    "logistics": {
      "distanceLabel": "About 8.1 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr depending on wind, current, and stops",
      "shuttle": "Stage Fort Ripley Landing first, then drive back to Crow Wing State Park. Confirm state-park vehicle, launch, and parking rules before leaving a vehicle at the put-in.",
      "permits": "No route-specific paddling permit is known. Follow Minnesota boating/PFD rules, Crow Wing State Park entry and access rules, DNR public-water-access rules at Fort Ripley, and all Camp Ripley shoreline restrictions.",
      "camping": "Crow Wing State Park can support endpoint base-camping when separately reserved or allowed under current park rules. No on-route campsite is assumed on the short Fort Ripley connector, and Camp Ripley shoreline is not a camping option.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Crow Wing State Park and take out at Fort Ripley Landing for the short Mississippi Map 6 gap below the Crow Wing confluence. The route uses the upstream Brainerd DNR gauge but keeps Camp Ripley and private-bank restrictions front and center.",
      "accessCaveats": [
        "Crow Wing State Park is the planned put-in, using the same state-park Mississippi access coordinates already used by the adjacent Kiwanis-to-Crow-Wing route.",
        "Fort Ripley Landing resolves in Minnesota public-water-access GIS as WAS01026 with DNR administration, coordinates, and river-mile context.",
        "DNR Map 6 says access to Camp Ripley Training Center is not allowed from the Mississippi or Crow Wing rivers. Use mapped public accesses and signed state-park or DNR facilities only."
      ],
      "watchFor": [
        "Wind and motorboat wake on broad mainstem water, cold water, fast rises, floating debris, and harder landings after rain.",
        "Camp Ripley shoreline restrictions, private banks, and limited legal exits between Crow Wing State Park and Fort Ripley. Islands may have public recreation context, but do not treat them as guaranteed bailout or camping sites.",
        "Low-water bars if Brainerd drops toward the official scrapable floor and stronger current above the medium band."
      ]
    },
    "accessPoints": [
      {
        "id": "crow-wing-state-park",
        "name": "Mississippi River, Crow Wing State Park Public Water Access Site",
        "latitude": 46.26826999422346,
        "longitude": -94.34310794944992,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default state-park put-in near DNR Map 6 river mile 990.4; confirm current park access and parking rules."
      },
      {
        "id": "fort-ripley-landing",
        "name": "Mississippi River, Fort Ripley Landing Public Water Access Site",
        "latitude": 46.1794923,
        "longitude": -94.3648683,
        "mileFromStart": 8.1,
        "segmentKind": "creek",
        "note": "Default take-out at DNR Map 6 river mile 982.3; resolves as WAS01026 in public-water-access GIS."
      }
    ]
  },
  "sauk-river-mill-pond-oak-township": {
    "putIn": {
      "name": "Sauk River, Mill Pond Public Water Access Site",
      "latitude": 45.6792109,
      "longitude": -94.8191468
    },
    "takeOut": {
      "name": "Oak Township County Park canoe access",
      "latitude": 45.60927,
      "longitude": -94.75344
    },
    "logistics": {
      "distanceLabel": "About 12 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr, plus time for the Melrose Dam portage",
      "shuttle": "Use a Melrose-to-Oak Township County Park shuttle. Walk the Mill Pond launch, Melrose Dam portage, and Oak take-out plan before committing because the dam comes almost immediately after launch.",
      "permits": "No route-specific paddling permit is known. Follow DNR water-trail guidance, Stearns County park rules, Minnesota boating/PFD requirements, and posted parking rules.",
      "camping": "DNR Map 1 marks camping/picnic context at Sauk River Park near Melrose and watercraft campsite context at Oak Township County Park. Use only designated county or mapped sites and confirm current rules before planning an overnight.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Mill Pond, portage left around Melrose Dam, and take out at Oak Township County Park for the upper-Sauk access gap above the existing Oak-to-Spring-Hill card.",
      "accessCaveats": [
        "Mill Pond resolves as WAS02216 at Sauk River mile 78.8 in Minnesota public-water-access GIS.",
        "Oak Township is the same Stearns County park endpoint used by the adjacent Oak-to-Spring-Hill route; DNR Map 1 places it at river mile 67.0 with watercraft campsite/rest/toilet context.",
        "The St. Martin gauge is downstream of this route, so use it as a corridor check and make visual calls for upper-river depth, weeds, wood, and dam-portage safety."
      ],
      "watchFor": [
        "Melrose Dam immediately below the start; portage left and do not run the dam.",
        "Shallow riffles, aquatic vegetation, downed trees, sweepers, and low-water dragging.",
        "Private banks, cold water, storm debris, and rural rescue spacing between the named public/county sites."
      ]
    },
    "accessPoints": [
      {
        "id": "mill-pond",
        "name": "Sauk River, Mill Pond Public Water Access Site",
        "latitude": 45.6792109,
        "longitude": -94.8191468,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; resolves as WAS02216 at Sauk River mile 78.8."
      },
      {
        "id": "melrose-dam-portage",
        "name": "Melrose Dam portage",
        "latitude": 45.67646,
        "longitude": -94.80843,
        "mileFromStart": 0.4,
        "segmentKind": "creek",
        "note": "DNR Map 1 marks Melrose Dam at river mile 78.5 with portage left."
      },
      {
        "id": "oak-township-county-park",
        "name": "Oak Township County Park canoe access",
        "latitude": 45.60927,
        "longitude": -94.75344,
        "mileFromStart": 12,
        "segmentKind": "creek",
        "note": "Default take-out at DNR Map 1 river mile 67.0; county park access with watercraft campsite context."
      }
    ]
  },
  "des-moines-river-ashley-park-petersburg": {
    "putIn": {
      "name": "Des Moines River, Ashley Park Public Water Access Site",
      "latitude": 43.6253796,
      "longitude": -94.9872012
    },
    "takeOut": {
      "name": "Des Moines River, Petersburg Public Water Access Site",
      "latitude": 43.5263871,
      "longitude": -94.9189653
    },
    "logistics": {
      "distanceLabel": "About 9.7 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr, longer with low water, wood, or wire-hazard scouting",
      "shuttle": "Stage Petersburg first, then drive back to Ashley Park. This is the shorter lower-Des-Moines option below Jackson, so do not assume you are committed to the full Christianna-to-Petersburg day.",
      "permits": "No route-specific paddling permit is known. Use the named DNR public accesses, follow Minnesota boating/PFD rules, and obey posted access and private-bank rules.",
      "camping": "Treat this as a day route. Kilen Woods and Belmont camping context is upstream of this selected split; do not assume informal camping on private lower-river banks.",
      "campingClassification": "none",
      "summary": "Launch at Ashley Park and take out at Petersburg for the short lower-Des-Moines split around the direct Jackson gauge and the DNR-mapped wire hazard.",
      "accessCaveats": [
        "Ashley Park resolves as WAS02771 at Des Moines River mile 12.8, and Petersburg resolves as WAS01443 at river mile 3.1.",
        "The Jackson DNR gauge sits inside the route near river mile 12.3, just below Ashley Park and the former Jackson Dam / high Class I rapid context.",
        "DNR Map 1 marks a wire hazard near river mile 6.1 that may be impassable at high water. Confirm the hazard before launching if water is high, rising, or debris-laden."
      ],
      "watchFor": [
        "Former Jackson Dam / high Class I rapid area, small riffles, and changing lines around debris.",
        "Wire across the river near river mile 6.1, especially at high water.",
        "Snags, fallen trees, muddy banks, private shoreline, fast rises after heavy rain, and limited public exits."
      ]
    },
    "accessPoints": [
      {
        "id": "ashley-park",
        "name": "Des Moines River, Ashley Park Public Water Access Site",
        "latitude": 43.6253796,
        "longitude": -94.9872012,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; resolves as WAS02771 at Des Moines River mile 12.8."
      },
      {
        "id": "jackson-gauge-former-dam",
        "name": "Jackson River Street gauge / former dam rapid",
        "latitude": 43.619376,
        "longitude": -94.984308,
        "mileFromStart": 0.5,
        "segmentKind": "creek",
        "note": "MN DNR site 259 sits at river mile 12.3 near the former Jackson Dam / high Class I rapid context."
      },
      {
        "id": "petersburg",
        "name": "Des Moines River, Petersburg Public Water Access Site",
        "latitude": 43.5263871,
        "longitude": -94.9189653,
        "mileFromStart": 9.7,
        "segmentKind": "creek",
        "note": "Default take-out; resolves as WAS01443 at Des Moines River mile 3.1."
      }
    ]
  },
  "mississippi-river-blackberry-bridge-county-road-72": {
    "putIn": {
      "id": "mississippi-river-blackberry-bridge-public-water-access-site",
      "name": "Mississippi River, Blackberry Bridge Public Water Access Site",
      "latitude": 47.1736507,
      "longitude": -93.4186453
    },
    "takeOut": {
      "id": "mississippi-river-co-rd-72-public-water-access-site",
      "name": "Mississippi River, Co Rd 72 Public Water Access Site",
      "latitude": 47.1084087,
      "longitude": -93.3903507
    },
    "logistics": {
      "distanceLabel": "About 9.5 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr depending on wind, level, and stops",
      "shuttle": "Stage the take-out at the County Road 72 DNR access south of Blackberry, then drive upstream to Blackberry Bridge. This is the missing lower half of the DNR Steamboat-to-County-Road-72 planner outing, not a new full-corridor overlap.",
      "permits": "No route-specific paddling permit is known. Follow posted MN DNR public-water-access rules at Blackberry Bridge and County Road 72.",
      "camping": "No established watercraft campsite is documented on this short split. Plan it as a day trip unless a legal off-route campground is independently reserved.",
      "campingClassification": "none",
      "summary": "Launch at Blackberry Bridge and take out at County Road 72 for a 9.5-mile upper-Mississippi day section below Grand Rapids. Use the upstream Grand Rapids DNR gauge as a corridor check and make a same-day wind, debris, and shallow-riffle call.",
      "accessCaveats": [
        "Blackberry Bridge is a DNR public access already used as the downstream endpoint of the existing Steamboat-to-Blackberry card.",
        "County Road 72 resolves in the DNR public-water-access layer as a DNR-managed Mississippi River access at river mile 1161.4 with no restroom listed.",
        "The Grand Rapids gauge is upstream of this split. It is official and same-corridor, but not a take-out reading."
      ],
      "watchFor": [
        "Small riffles, exposed bars, and slower travel when the Grand Rapids gauge is near the low band.",
        "Wind on open bends, floating debris, and cold-water exposure.",
        "Private banks and limited clean intermediate exits between the two DNR accesses."
      ]
    },
    "accessPoints": [
      {
        "id": "mississippi-river-blackberry-bridge-public-water-access-site",
        "name": "Mississippi River, Blackberry Bridge Public Water Access Site",
        "latitude": 47.1736507,
        "longitude": -93.4186453,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; DNR public access at river mile 1170.9."
      },
      {
        "id": "mississippi-river-co-rd-72-public-water-access-site",
        "name": "Mississippi River, Co Rd 72 Public Water Access Site",
        "latitude": 47.1084087,
        "longitude": -93.3903507,
        "mileFromStart": 9.5,
        "segmentKind": "creek",
        "note": "Default take-out; DNR public access at river mile 1161.4."
      }
    ]
  },
  "mississippi-river-county-road-72-county-line": {
    "putIn": {
      "id": "mississippi-river-co-rd-72-public-water-access-site",
      "name": "Mississippi River, Co Rd 72 Public Water Access Site",
      "latitude": 47.1084087,
      "longitude": -93.3903507
    },
    "takeOut": {
      "id": "mississippi-river-county-line-public-water-access-site",
      "name": "Mississippi River, County Line Public Water Access Site",
      "latitude": 47.0343553,
      "longitude": -93.3229605
    },
    "logistics": {
      "distanceLabel": "About 15.9 mi",
      "estimatedPaddleTime": "About 5.5 hr to 8 hr depending on wind, level, and stops",
      "shuttle": "Stage the County Line take-out first, then drive upstream to the County Road 72 DNR access. This card intentionally ends at County Line to connect with the already-live County-Line-to-Jacobson route without duplicating it.",
      "permits": "No route-specific paddling permit is known. Follow posted MN DNR public-water-access rules at County Road 72 and County Line.",
      "camping": "DNR Map 3 marks watercraft-camping context on this corridor, including Swimming Bear downstream of County Road 72. Treat any overnight as a designated-site plan only, confirm current rules, and do not camp on private banks.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at County Road 72 and take out at County Line for the 15.9-mile Map 3 connector above the existing Jacobson route. Use the upstream Grand Rapids DNR gauge as an official corridor check, then make the final call from local depth, wind, and debris.",
      "accessCaveats": [
        "County Road 72 resolves in Minnesota public-water-access GIS as WAS01345 at DNR river mile 1161.4.",
        "County Line resolves in Minnesota public-water-access GIS as WAS01336 at DNR river mile 1145.5.",
        "The Grand Rapids gauge is upstream of this split. It is official same-corridor evidence, not a take-out reading."
      ],
      "watchFor": [
        "Low-water riffles, exposed bars, floating debris, and slower current below Grand Rapids.",
        "Wind, cold water, and limited exits over a 15.9-mile day.",
        "Private banks and campsite assumptions; use mapped public accesses or designated campsites only."
      ]
    },
    "accessPoints": [
      {
        "id": "mississippi-river-co-rd-72-public-water-access-site",
        "name": "Mississippi River, Co Rd 72 Public Water Access Site",
        "latitude": 47.1084087,
        "longitude": -93.3903507,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; DNR public-water-access GIS resolves WAS01345 at river mile 1161.4."
      },
      {
        "id": "mississippi-river-county-line-public-water-access-site",
        "name": "Mississippi River, County Line Public Water Access Site",
        "latitude": 47.0343553,
        "longitude": -93.3229605,
        "mileFromStart": 15.9,
        "segmentKind": "creek",
        "note": "Default take-out; DNR public-water-access GIS resolves WAS01336 at river mile 1145.5."
      }
    ]
  },
  "mississippi-river-county-line-jacobson": {
    "putIn": {
      "id": "mississippi-river-county-line-public-water-access-site",
      "name": "Mississippi River, County Line Public Water Access Site",
      "latitude": 47.0343553,
      "longitude": -93.3229605
    },
    "takeOut": {
      "id": "mississippi-river-jacobson-campground-public-water-access-site",
      "name": "Mississippi River, Jacobson Campground Public Water Access Site",
      "latitude": 47.0236587,
      "longitude": -93.2762605
    },
    "logistics": {
      "distanceLabel": "About 4.9 mi",
      "estimatedPaddleTime": "About 1.5 hr to 3 hr depending on wind, level, and campground stops",
      "shuttle": "Stage Jacobson Campground first, then drive back to County Line. Confirm campground access, parking, and any current Aitkin County rules before counting on the endpoint as more than a take-out.",
      "permits": "No route-specific paddling permit is known. Follow posted MN DNR public-water-access rules at County Line and Aitkin County campground/access rules at Jacobson.",
      "camping": "Jacobson Campground is endpoint-campground support, not permission to camp on private banks along the route. Confirm current county campground rules, fees, and availability before planning an overnight.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at County Line and take out at Jacobson Campground for DNR recommended Map 3/4 short trip. Use the upstream Grand Rapids DNR gauge as an official corridor check, then make the same-day call from local depth, wind, and debris.",
      "accessCaveats": [
        "County Line resolves in Minnesota public-water-access GIS as WAS01336 at DNR river mile 1145.5.",
        "Jacobson Campground resolves in Minnesota public-water-access GIS as WAS02564 at DNR river mile 1140.6 with Aitkin County administration.",
        "The Grand Rapids gauge is upstream of this split. It is official same-corridor evidence, not a take-out reading at Jacobson."
      ],
      "watchFor": [
        "Low-water riffles, shallow bars, floating debris, and slow current below the Grand Rapids gauge.",
        "Cold water, private banks, and limited bailout options even on a short 4.9-mile trip.",
        "Campground and access rules at Jacobson; use the endpoint campground only under current posted rules."
      ]
    },
    "accessPoints": [
      {
        "id": "mississippi-river-county-line-public-water-access-site",
        "name": "Mississippi River, County Line Public Water Access Site",
        "latitude": 47.0343553,
        "longitude": -93.3229605,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; DNR public-water-access GIS resolves WAS01336 at river mile 1145.5."
      },
      {
        "id": "mississippi-river-jacobson-campground-public-water-access-site",
        "name": "Mississippi River, Jacobson Campground Public Water Access Site",
        "latitude": 47.0236587,
        "longitude": -93.2762605,
        "mileFromStart": 4.9,
        "segmentKind": "creek",
        "note": "Default take-out and endpoint campground access; DNR public-water-access GIS resolves WAS02564 at river mile 1140.6."
      }
    ]
  },
  "otter-tail-river-phelps-mill-west-lost-lake": {
    "putIn": {
      "id": "otter-tail-river-phelps-mill-public-water-access-site",
      "name": "Otter Tail River, Phelps Mill Public Water Access Site",
      "latitude": 46.3821667,
      "longitude": -95.8210176
    },
    "takeOut": {
      "id": "west-lost-lake-public-water-access-site",
      "name": "West Lost Lake Public Water Access Site",
      "latitude": 46.3814506,
      "longitude": -95.8622708
    },
    "logistics": {
      "distanceLabel": "About 3.5 mi",
      "estimatedPaddleTime": "About 1.5 hr to 2.5 hr depending on wind and level",
      "shuttle": "Use the short Otter Tail County shuttle between Phelps Mill County Park and the West Lost Lake DNR access. This card intentionally ends at West Lost Lake for a shorter official outing than the longer Phelps-Mill-to-West-Red-River-Lake route.",
      "permits": "No route-specific paddling permit is known. Follow posted Otter Tail County park rules at Phelps Mill and MN DNR public-water-access rules at West Lost Lake.",
      "camping": "No on-route watercraft campsite is documented for this short section. Treat it as a day trip; use legal nearby park or campground options only if separately confirmed.",
      "campingClassification": "none",
      "summary": "Launch from Phelps Mill County Park and take out at West Lost Lake for DNR Map 2's short Otter Tail section. The route is gentle, but dam-portage context, low-water obstructions, and lake wind still need same-day checks.",
      "accessCaveats": [
        "Phelps Mill is a county-administered public access below the Phelps Mill dam/portage context; do not run the dam or improvise above-dam launch choices.",
        "West Lost Lake resolves as DNR access WAS02421 at river mile 81.4 with no restroom listed in the public-water-access record.",
        "The Elizabeth gauge is downstream of this short route, so it is a corridor indicator rather than a direct reading at West Lost Lake."
      ],
      "watchFor": [
        "Wind and boat wake on West Lost Lake near the take-out.",
        "Low-water dragging, vegetation, shallow riffles, and bridge or culvert obstructions.",
        "Private shorelines, cold water, and slower travel if the downstream gauge is near the low band."
      ]
    },
    "accessPoints": [
      {
        "id": "otter-tail-river-phelps-mill-public-water-access-site",
        "name": "Otter Tail River, Phelps Mill Public Water Access Site",
        "latitude": 46.3821667,
        "longitude": -95.8210176,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at Phelps Mill County Park and dam/portage area."
      },
      {
        "id": "west-lost-lake-public-water-access-site",
        "name": "West Lost Lake Public Water Access Site",
        "latitude": 46.3814506,
        "longitude": -95.8622708,
        "mileFromStart": 3.5,
        "segmentKind": "lake",
        "note": "Default take-out; DNR public access at the West Lost Lake / Otter Tail River corridor."
      }
    ]
  },
  "sauk-river-sauk-centre-dam-mill-pond": {
    "putIn": {
      "id": "sauk-river-sauk-centre-dam-public-water-access-site",
      "name": "Sauk River, Sauk Centre Dam Public Water Access Site",
      "latitude": 45.7403785,
      "longitude": -94.9495541
    },
    "takeOut": {
      "id": "sauk-river-mill-pond-public-water-access-site",
      "name": "Sauk River, Mill Pond Public Water Access Site",
      "latitude": 45.6792109,
      "longitude": -94.8191468
    },
    "logistics": {
      "distanceLabel": "About 16.6 mi",
      "estimatedPaddleTime": "About 5.5 hr to 8 hr; longer with low water, wind, or bridge-work delays",
      "shuttle": "Run a full-day rural shuttle from Mill Pond in Melrose to the carry-in below Sauk Centre Dam. Confirm current DNR water-trail alerts before committing because the 2026 I-94 bridge work is inside this corridor.",
      "permits": "No route-specific paddling permit is known. Follow posted City of Sauk Centre, City of Melrose, and MN DNR water-trail rules at the public accesses.",
      "camping": "No on-route watercraft campsite is documented for this day trip. Plan it as a long day paddle; use legal city or private campground options only if independently confirmed.",
      "campingClassification": "none",
      "summary": "Launch below Sauk Centre Dam and take out at Mill Pond for DNR’s long, easy upper-Sauk day trip to Melrose. The St. Martin gauge is an official downstream corridor check, but the route needs visual level, bridge-work, and mandatory-takeout confirmation.",
      "accessCaveats": [
        "Use the carry-in below Sauk Centre Dam; do not run or approach the dam from upstream.",
        "DNR posted a 2026 I-94 bridge-construction caution for this Sauk Centre-to-Melrose corridor. Check the current DNR alert and be prepared to cancel if work conditions make passage unsafe.",
        "Mill Pond is the planned take-out before the Melrose dam/portage area. Continuing downstream requires a separate confirmed portage and route plan.",
        "The St. Martin gauge is far downstream from this segment, so local rain, lake storage, and visual conditions at Sauk Centre and Melrose can override the gauge band."
      ],
      "watchFor": [
        "Bridge construction zones, low bridges, and posted restrictions.",
        "Shallow water, weeds, fallen trees, sweepers, and slow current through wetland and open-lowland bends.",
        "Private banks, cold water, long-mile fatigue, and limited clean bailout points between cities."
      ]
    },
    "accessPoints": [
      {
        "id": "sauk-river-sauk-centre-dam-public-water-access-site",
        "name": "Sauk River, Sauk Centre Dam Public Water Access Site",
        "latitude": 45.7403785,
        "longitude": -94.9495541,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; DNR public access/carry-in below Sauk Centre Dam at about river mile 95.6."
      },
      {
        "id": "sauk-river-mill-pond-public-water-access-site",
        "name": "Sauk River, Mill Pond Public Water Access Site",
        "latitude": 45.6792109,
        "longitude": -94.8191468,
        "mileFromStart": 16.6,
        "segmentKind": "creek",
        "note": "Default take-out; DNR public access near river mile 79.0 before the downstream Melrose dam/portage boundary."
      }
    ]
  },
  "minnesota-river-camp-release-priens": {
    "putIn": {
      "name": "Minnesota River, Camp Release Public Water Access Site",
      "latitude": 44.9600387,
      "longitude": -95.8112619
    },
    "takeOut": {
      "name": "Minnesota River, Prien's Landing Public Water Access Site",
      "latitude": 44.9296663,
      "longitude": -95.7267761
    },
    "logistics": {
      "distanceLabel": "About 8.0 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr depending on level, wind, and campsite stops",
      "shuttle": "Stage Prien's Landing south of Montevideo first, then drive back to Camp Release. Check both ramps for mud, debris, and high-water cleanup before committing.",
      "permits": "No route-specific paddling permit is known. Use the named DNR public accesses, follow Minnesota boating/PFD rules, and obey DNR watercraft-campsite and access rules.",
      "camping": "DNR Map 2 marks a watercraft campsite around river mile 261.1 inside this reach. Treat overnight use as designated-site only; do not camp on private banks or unmarked riverbed areas next to private property.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Camp Release and take out at Prien's Landing for a short upper Minnesota River connector with the Montevideo gauge inside the selected reach. The route has a mapped watercraft campsite and a Class I feature, but it is not a highlighted DNR recommended one-way.",
      "accessCaveats": [
        "Camp Release resolves as WAS01022 at public-access river mile 265.6, and Prien resolves as WAS01053 at river mile 257.3 in the Minnesota public-water-access service.",
        "DNR Map 2 places the Montevideo river-level gauge near river mile 258.5 and Prien near river mile 257.6, so same-day gauge and landing checks are unusually close to the take-out.",
        "End at Prien's Landing unless you have a separate lower-corridor plan. Do not casually extend toward Granite Falls dam and rapids context."
      ],
      "watchFor": [
        "Class I riffle current, floating wood, muddy banks, railroad-bridge context, and debris around the Montevideo corridor.",
        "Low-water scraping below the official medium band and pushier current after rain.",
        "Private banks and designated-campsite limits; stop only where access and camping are clearly legal."
      ]
    },
    "accessPoints": [
      {
        "id": "camp-release",
        "name": "Minnesota River, Camp Release Public Water Access Site",
        "latitude": 44.9600387,
        "longitude": -95.8112619,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; resolves as WAS01022 at GIS river mile 265.6."
      },
      {
        "id": "priens-landing",
        "name": "Minnesota River, Prien's Landing Public Water Access Site",
        "latitude": 44.9296663,
        "longitude": -95.7267761,
        "mileFromStart": 8,
        "segmentKind": "creek",
        "note": "Default take-out; resolves as WAS01053 at GIS river mile 257.3."
      }
    ]
  },
  "minnesota-river-highway-4-harkin-store": {
    "putIn": {
      "name": "Minnesota River, Highway 4 Public Water Access Site",
      "latitude": 44.4340345,
      "longitude": -94.7166648
    },
    "takeOut": {
      "name": "Minnesota River, Harkin Store Public Water Access Site",
      "latitude": 44.3862362,
      "longitude": -94.5992038
    },
    "logistics": {
      "distanceLabel": "About 11.3 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr depending on wind, current, and mud",
      "shuttle": "Stage Harkin Store first, then drive back to the Highway 4 access south of Fairfax. This is a rural big-river shuttle with limited intermediate public exits.",
      "permits": "No route-specific paddling permit is known. Use the named public accesses, follow Minnesota boating/PFD rules, and respect DNR, historical-site, WMA, and posted access rules.",
      "camping": "Treat this as a day trip. No legal on-route watercraft campsite was confirmed between Highway 4 and Harkin Store during this run; use separate legal campgrounds or parks only after checking current rules.",
      "campingClassification": "none",
      "summary": "Launch at Highway 4 and take out at Harkin Store for a Map 4 public-access connector below the existing Morton-to-Highway-4 card. The Morton gauge is an upstream same-map proxy, so visual landing checks matter.",
      "accessCaveats": [
        "Highway 4 resolves as WAS00644 at GIS river mile 163.3, and Harkin Store resolves as WAS02302 at GIS river mile 152.0.",
        "DNR Map 4 documents the larger Highway-4-to-Buessman corridor; Harkin Store is supported by the official public-access GIS, not by the recommended-one-way PDF.",
        "Do not rely on private banks, farm lanes, sandbars, or wildlife-management-area frontage for bailout or camping."
      ],
      "watchFor": [
        "Wind on broad bends, muddy banks, floating wood, debris, and strainers after rain.",
        "Low-water shoals and slow bends if the Morton gauge falls toward the official scrapable band.",
        "Limited legal exits between access points and rural rescue spacing."
      ]
    },
    "accessPoints": [
      {
        "id": "highway-4-minnesota-river",
        "name": "Minnesota River, Highway 4 Public Water Access Site",
        "latitude": 44.4340345,
        "longitude": -94.7166648,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; resolves as WAS00644 at GIS river mile 163.3."
      },
      {
        "id": "harkin-store",
        "name": "Minnesota River, Harkin Store Public Water Access Site",
        "latitude": 44.3862362,
        "longitude": -94.5992038,
        "mileFromStart": 11.3,
        "segmentKind": "creek",
        "note": "Default take-out; resolves as WAS02302 at GIS river mile 152.0."
      }
    ]
  },
  "minnesota-river-harkin-store-buessman": {
    "putIn": {
      "name": "Minnesota River, Harkin Store Public Water Access Site",
      "latitude": 44.3862362,
      "longitude": -94.5992038
    },
    "takeOut": {
      "name": "Minnesota River, Buessman Bridge / County Road 14 Public Water Access Site",
      "latitude": 44.3620467,
      "longitude": -94.4979132
    },
    "logistics": {
      "distanceLabel": "About 9.0 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr depending on level, wind, and landing conditions",
      "shuttle": "Stage Buessman Bridge first, then drive back to Harkin Store. Inspect Buessman before launch because the next existing PaddleToday card starts there and downstream continuation should be deliberate.",
      "permits": "No route-specific paddling permit is known. Use the named public accesses, follow Minnesota boating/PFD rules, and obey DNR, historical-site, county-road, and posted access rules.",
      "camping": "Treat this as a day trip. No on-route watercraft campsite was confirmed between Harkin Store and Buessman Bridge; plan any overnight separately at legal public or private campgrounds.",
      "campingClassification": "none",
      "summary": "Launch at Harkin Store and take out at Buessman Bridge for a short Map 4 connector that ends where the existing Buessman-to-Riverside card begins. The Mankato gauge is downstream, so same-day visual checks are required.",
      "accessCaveats": [
        "Harkin Store resolves as WAS02302 at GIS river mile 152.0, and Buessman Bridge resolves as WAS00804 at GIS river mile 143.0.",
        "DNR Map 4 documents the lower part of this split and the Buessman Bridge access; Harkin Store is supported by the official public-access GIS.",
        "Do not assume private banks, WMA edges, or field roads are legal exits, rest stops, or campsites."
      ],
      "watchFor": [
        "Wind exposure, muddy approaches, floating debris, overhanging trees, and strainers.",
        "A downstream proxy gauge that may lag local conditions; postpone if the route has fresh rain, rising water, or poor landing visibility.",
        "The planned take-out is Buessman Bridge. Continue downstream only if you intentionally join the separate Buessman-to-Riverside route plan."
      ]
    },
    "accessPoints": [
      {
        "id": "harkin-store",
        "name": "Minnesota River, Harkin Store Public Water Access Site",
        "latitude": 44.3862362,
        "longitude": -94.5992038,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; resolves as WAS02302 at GIS river mile 152.0."
      },
      {
        "id": "buessman-bridge",
        "name": "Minnesota River, Buessman Bridge / County Road 14 Public Water Access Site",
        "latitude": 44.3620467,
        "longitude": -94.4979132,
        "mileFromStart": 9,
        "segmentKind": "creek",
        "note": "Default take-out; resolves as WAS00804 at GIS river mile 143.0."
      }
    ]
  },
  "north-fork-crow-river-highway-4-manannah": {
    "putIn": {
      "name": "North Fork Crow River, Highway 4 Public Water Access Site",
      "latitude": 45.2936548,
      "longitude": -94.6716136
    },
    "takeOut": {
      "name": "North Fork Crow River, Manannah Public Water Access Site",
      "latitude": 45.2538082,
      "longitude": -94.6146809
    },
    "logistics": {
      "distanceLabel": "About 5.7 mi",
      "estimatedPaddleTime": "About 2 hr to 3.5 hr, longer with shallow water or wood scouting",
      "shuttle": "Stage Manannah first, then drive back to the Highway 4 access. Inspect both landings before committing because the narrow upper North Fork Crow can collect fresh wood after storms.",
      "permits": "No route-specific paddling permit is known. Use the named public accesses, follow Minnesota boating/PFD rules, and obey posted DNR and local access rules.",
      "camping": "Treat this as a day route. DNR Map 1 shows designated campsites elsewhere on the upper river, but this Highway-4-to-Manannah split does not assume an on-route overnight stop.",
      "campingClassification": "none",
      "summary": "Launch at Highway 4 and take out at Manannah for a short upper North Fork Crow gap above the current Manannah-to-Highway-22 tree-alert reach. Use the downstream Highway 22 gauge as a conservative corridor check and make a same-day wood/bridge-clearance call.",
      "accessCaveats": [
        "Minnesota public-water-access GIS resolves Highway 4 as WAS02280 at river mile 128.5 and Manannah as WAS00681 at river mile 122.8.",
        "The DNR alert says to avoid the downstream section between Manannah and Highway 22 until a large tree is cleared; take out at Manannah for this route.",
        "The Highway 22 gauge is downstream of the selected reach and does not publish a separate very-high cutoff, so high or rising water should be treated conservatively."
      ],
      "watchFor": [
        "Easy rapids, low bridge clearance, shallow gravel, underwater branches, overhanging trees, and strainers.",
        "Private banks and limited public exits between Highway 4 and Manannah.",
        "Fast rises after rain and cold water in shoulder seasons."
      ]
    },
    "accessPoints": [
      {
        "id": "highway-4-north-fork-crow",
        "name": "North Fork Crow River, Highway 4 Public Water Access Site",
        "latitude": 45.2936548,
        "longitude": -94.6716136,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at DNR river mile 128.5; resolves as WAS02280."
      },
      {
        "id": "manannah-north-fork-crow",
        "name": "North Fork Crow River, Manannah Public Water Access Site",
        "latitude": 45.2538082,
        "longitude": -94.6146809,
        "mileFromStart": 5.7,
        "segmentKind": "creek",
        "note": "Default take-out at DNR river mile 122.8; resolves as WAS00681."
      }
    ]
  },
  "red-lake-river-highway-1-st-hilaire": {
    "putIn": {
      "name": "Red Lake River, Highway 1 Public Water Access Site",
      "latitude": 48.1238659,
      "longitude": -96.1681105
    },
    "takeOut": {
      "name": "Red Lake River, St. Hilaire City Park Public Water Access Site",
      "latitude": 48.0092108,
      "longitude": -96.2088527
    },
    "logistics": {
      "distanceLabel": "About 13.8 mi",
      "estimatedPaddleTime": "About 5 hr to 7 hr, longer with low water, headwind, or wood scouting",
      "shuttle": "Stage St. Hilaire City Park first, then drive upstream to the Highway 1 access in Thief River Falls. Check both endpoints before launching because the route uses a downstream proxy gauge.",
      "permits": "No route-specific paddling permit is known. Follow Minnesota boating/PFD rules and posted city, park, and public-access rules at both endpoints.",
      "camping": "St. Hilaire City Park is mapped with camping/rest-area services on DNR Map 2. Treat camping as managed endpoint/basecamp use only; do not camp on private riverbanks.",
      "campingClassification": "endpoint_campground",
      "summary": "Put in at Highway 1 / Centennial Park and take out at St. Hilaire for the upper Red Lake River gap above the existing St. Hilaire-to-Sportsman's card. The Red Lake Falls gauge is current and official, but it is downstream of the route, so local visual checks matter.",
      "accessCaveats": [
        "Minnesota public-water-access GIS resolves Highway 1 as WAS02414 at river mile 128.6 and St. Hilaire City Park as WAS00808 at river mile 114.8.",
        "The nearby Thief River Falls gauge is stale in the current DNR feed; this card uses the downstream Red Lake Falls CR 13 gauge only as an official corridor proxy.",
        "Intermediate farm crossings and private banks should not be treated as exits unless separately confirmed legal and public."
      ],
      "watchFor": [
        "Low-water scraping, bouldery shoals, wood, strainers, and long rural spacing between public accesses.",
        "Higher or rising water after storms, which can hide wood and increase recovery difficulty.",
        "Cold water, private banks, and fatigue on a longer day."
      ]
    },
    "accessPoints": [
      {
        "id": "highway-1-red-lake-river",
        "name": "Red Lake River, Highway 1 Public Water Access Site",
        "latitude": 48.1238659,
        "longitude": -96.1681105,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at DNR river mile 128.6; resolves as WAS02414."
      },
      {
        "id": "st-hilaire-city-park-red-lake",
        "name": "Red Lake River, St. Hilaire City Park Public Water Access Site",
        "latitude": 48.0092108,
        "longitude": -96.2088527,
        "mileFromStart": 13.8,
        "segmentKind": "creek",
        "note": "Default take-out at DNR river mile 114.8; resolves as WAS00808."
      }
    ]
  },
  "mississippi-river-aitkin-highway-6": {
    "putIn": {
      "name": "Mississippi River, Aitkin Public Water Access Site / Aitkin Campground",
      "latitude": 46.5423989,
      "longitude": -93.713071
    },
    "takeOut": {
      "name": "Mississippi River, Hwy 6 Public Water Access Site",
      "latitude": 46.5435051,
      "longitude": -93.9564174
    },
    "logistics": {
      "distanceLabel": "About 25.7 mi",
      "estimatedPaddleTime": "About 8 hr to 11 hr, longer with wind, low water, fishing stops, or fatigue",
      "shuttle": "Stage the Highway 6 take-out north of Crosby, then drive back to Aitkin Campground. This is a long day; start early, carry lights, and consider shortening or postponing if the Aitkin gauge is low or wind is building.",
      "permits": "No route-specific paddling permit is known. Use signed public accesses, follow Minnesota boating/PFD rules, and obey Aitkin County campground, parking, and boat-landing rules.",
      "camping": "Aitkin County documents campground facilities at the put-in, including campsites, showers, drinking water, picnic tables, and boat access. Treat camping as managed endpoint/basecamp support, not an assumed on-route overnight stop.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Aitkin Campground and take out at Highway 6 for the missing Mississippi Map 5 connector above the existing Highway-6-to-Trommald card. The Aitkin gauge is direct at the put-in corridor and is currently below the preferred medium band.",
      "accessCaveats": [
        "Aitkin resolves as WAS01042 at river mile 1055.7, and Highway 6 resolves as WAS00999 at river mile 1030.0 in Minnesota public-water-access GIS.",
        "Aitkin County campground rules, fees, parking, and overnight use should be checked before relying on the put-in as a basecamp.",
        "Public exits are limited for such a long reach; do not assume private banks or informal roads are legal bailouts."
      ],
      "watchFor": [
        "Long mileage, fatigue, wind, motorboat wake, and fishing traffic on wider Mississippi bends.",
        "Shallow bars and slow progress when the Aitkin gauge is in the low band.",
        "Downed trees, floating debris, cold water, private banks, storms, and rising water after rain."
      ]
    },
    "accessPoints": [
      {
        "id": "aitkin-campground-mississippi",
        "name": "Mississippi River, Aitkin Public Water Access Site / Aitkin Campground",
        "latitude": 46.5423989,
        "longitude": -93.713071,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at public-water-access GIS river mile 1055.7; resolves as WAS01042."
      },
      {
        "id": "highway-6-mississippi",
        "name": "Mississippi River, Hwy 6 Public Water Access Site",
        "latitude": 46.5435051,
        "longitude": -93.9564174,
        "mileFromStart": 25.7,
        "segmentKind": "creek",
        "note": "Default take-out at public-water-access GIS river mile 1030.0; resolves as WAS00999."
      }
    ]
  },
  "mississippi-river-palisade-waldeck": {
    "putIn": {
      "name": "Mississippi River, Palisade Public Water Access Site",
      "latitude": 46.709611,
      "longitude": -93.485152
    },
    "takeOut": {
      "name": "Mississippi River, Hwy 169 / Waldeck Public Water Access Site",
      "latitude": 46.651684,
      "longitude": -93.61233
    },
    "logistics": {
      "distanceLabel": "12.3 mi",
      "estimatedPaddleTime": "About 4 hr, longer with low water, wind, wood, or long breaks",
      "shuttle": "Stage the Hwy 169 / Waldeck take-out first, then drive back to Palisade. Confirm the signed Aitkin County access, parking, and river level before unloading because public exits are limited between endpoints.",
      "permits": "No route-specific paddling permit is known. Use signed public accesses, follow Minnesota boating/PFD rules, and obey posted Aitkin County, DNR water-trail, and campsite rules.",
      "camping": "MHB / Aitkin County route mapping shows campground and watercraft-campsite context on this corridor, but treat overnight use as planned and rule-checked rather than a guaranteed stop.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Palisade and take out at the Hwy 169 / Waldeck access for a signed MHB/Aitkin County Mississippi River day trip. Use the Aitkin DNR gauge as the official downstream same-corridor check and make a visual call at Palisade.",
      "accessCaveats": [
        "Palisade resolves as WAS01038 at river mile 1086.4, and Hwy 169 / Waldeck resolves as WAS02311 at river mile 1074.1 in the Minnesota public-water-access GIS.",
        "The Aitkin DNR gauge is downstream of this reach. Pair its official bands with a visual check for depth, wood, and landing conditions at Palisade.",
        "The route is signed as a Mississippi Headwaters Board / Aitkin County excursion, but intervening banks are not assumed public. Stay with mapped public accesses, public land, or confirmed campsite stops."
      ],
      "watchFor": [
        "Snags, downed trees, oxbows, dead-end side channels, and shallow inside bars in the floodplain corridor.",
        "Private banks and limited bailout options between Palisade and Waldeck.",
        "Cold water, storms, rising water, and debris after rain or upstream flow changes."
      ]
    },
    "accessPoints": [
      {
        "id": "palisade-access",
        "name": "Mississippi River, Palisade Public Water Access Site",
        "latitude": 46.709611,
        "longitude": -93.485152,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at public-water-access GIS river mile 1086.4; resolves as WAS01038."
      },
      {
        "id": "hwy-169-waldeck-access",
        "name": "Mississippi River, Hwy 169 / Waldeck Public Water Access Site",
        "latitude": 46.651684,
        "longitude": -93.61233,
        "mileFromStart": 12.3,
        "segmentKind": "creek",
        "note": "Default take-out at public-water-access GIS river mile 1074.1; resolves as WAS02311 and matches MHB Waldeck directions."
      }
    ]
  },
  "mississippi-river-waldeck-kimball": {
    "putIn": {
      "name": "Mississippi River, Hwy 169 / Waldeck Public Water Access Site",
      "latitude": 46.651684,
      "longitude": -93.61233
    },
    "takeOut": {
      "name": "Mississippi River, Kimball Public Water Access Site",
      "latitude": 46.57967,
      "longitude": -93.660697
    },
    "logistics": {
      "distanceLabel": "About 11.5 mi",
      "estimatedPaddleTime": "About 3.5 hr to 5 hr depending on current, wood, wind, and stops",
      "shuttle": "Stage Kimball first, then drive back to the Hwy 169 / Waldeck access. Inspect both Aitkin County landings because river height, mud, and wood can change usable landing angles.",
      "permits": "No route-specific paddling permit is known. Use signed public accesses, follow Minnesota boating/PFD rules, and obey Aitkin County and DNR water-trail rules.",
      "camping": "Treat this as a day route unless a specific watercraft campsite or public-land overnight stop is confirmed for the date of travel. Do not assume private floodplain banks are available for camping.",
      "campingClassification": "none",
      "summary": "Launch at the Hwy 169 / Waldeck access and finish at Kimball for the signed MHB/Aitkin County Map 4 excursion. The Aitkin DNR gauge is downstream but direct to the same corridor.",
      "accessCaveats": [
        "Hwy 169 / Waldeck and Kimball both resolve in Minnesota public-water-access GIS with Aitkin County administration, directions, river-mile records, and coordinates.",
        "MHB publishes this as a signed excursion, but the route still depends on same-day access visibility and a clean take-out at Kimball.",
        "The Aitkin gauge is downstream of the route; do not use it as a substitute for checking local wood, bars, and landing conditions at Waldeck."
      ],
      "watchFor": [
        "Long meanders, oxbows, sweepers, floodplain wood, shallow bars, and slow progress at lower flows.",
        "Limited public exits between Waldeck and Kimball; commit only with daylight and weather margin.",
        "Private banks, cold water, fishing traffic, storms, and faster current after rain."
      ]
    },
    "accessPoints": [
      {
        "id": "hwy-169-waldeck-access",
        "name": "Mississippi River, Hwy 169 / Waldeck Public Water Access Site",
        "latitude": 46.651684,
        "longitude": -93.61233,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at public-water-access GIS river mile 1074.1; resolves as WAS02311."
      },
      {
        "id": "kimball-access",
        "name": "Mississippi River, Kimball Public Water Access Site",
        "latitude": 46.57967,
        "longitude": -93.660697,
        "mileFromStart": 11.5,
        "segmentKind": "creek",
        "note": "Default take-out at public-water-access GIS river mile 1062.6; resolves as WAS01037."
      }
    ]
  },
  "mississippi-river-kimball-aitkin-campground": {
    "putIn": {
      "name": "Mississippi River, Kimball Public Water Access Site",
      "latitude": 46.57967,
      "longitude": -93.660697
    },
    "takeOut": {
      "name": "Mississippi River, Aitkin Public Water Access Site / Aitkin Campground",
      "latitude": 46.542399,
      "longitude": -93.713071
    },
    "logistics": {
      "distanceLabel": "About 6.9 mi",
      "estimatedPaddleTime": "About 2.5 hr to 3.5 hr depending on level, wood, and take-out traffic",
      "shuttle": "Stage the Aitkin Campground / Mississippi River boat access first, then drive back to Kimball. Confirm campground parking, access, camping, fee, and one-way traffic rules before relying on the finish.",
      "permits": "No route-specific paddling permit is known. Use signed public accesses, follow Minnesota boating/PFD rules, and obey Aitkin County campground, parking, and boat-landing rules.",
      "camping": "Aitkin County documents campground facilities at the take-out, including campsites, showers, drinking water, picnic tables, and boat access. Treat camping as a managed endpoint reservation or fee-based plan.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Kimball and take out at the Aitkin Campground / Mississippi River boat access for the short signed MHB/Aitkin County excursion. The Aitkin DNR gauge is near the finish and has official DNR interpretation bands.",
      "accessCaveats": [
        "Kimball resolves as WAS01037 at river mile 1062.6, and Aitkin resolves as WAS01042 at river mile 1055.7 in Minnesota public-water-access GIS.",
        "Aitkin County lists the campground at 814 4th Ave NW with Mississippi River boat access and campground amenities; check current fees and rules before counting on camping or overnight parking.",
        "DNR Map 4 warns about the Rice River diversion channel and diversion dam near Aitkin during high flow. Stay with the signed Mississippi route and planned campground take-out."
      ],
      "watchFor": [
        "Rice River diversion-channel and dam context near Aitkin, especially at high water.",
        "Snags, downed trees, private banks, shallow bars, fishing traffic, and campground landing congestion.",
        "Cold water, storms, rising water, and debris after rain."
      ]
    },
    "accessPoints": [
      {
        "id": "kimball-access",
        "name": "Mississippi River, Kimball Public Water Access Site",
        "latitude": 46.57967,
        "longitude": -93.660697,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at public-water-access GIS river mile 1062.6; resolves as WAS01037."
      },
      {
        "id": "aitkin-campground-access",
        "name": "Mississippi River, Aitkin Public Water Access Site / Aitkin Campground",
        "latitude": 46.542399,
        "longitude": -93.713071,
        "mileFromStart": 6.9,
        "segmentKind": "creek",
        "note": "Default take-out at public-water-access GIS river mile 1055.7; resolves as WAS01042 and matches the Aitkin campground/boat-access corridor."
      }
    ]
  },
  "mississippi-river-highway-6-trommald": {
    "putIn": {
      "name": "Mississippi River, Hwy 6 Public Water Access Site",
      "latitude": 46.5435051,
      "longitude": -93.9564174
    },
    "takeOut": {
      "name": "Mississippi River, Trommald Public Water Access Site",
      "latitude": 46.5149237,
      "longitude": -94.0696772
    },
    "logistics": {
      "distanceLabel": "11.7 mi",
      "estimatedPaddleTime": "About 4 hr to 5.5 hr, longer with wind, fishing stops, or strong current",
      "shuttle": "Stage the take-out at Trommald, then drive back to the Highway 6 access north of Crosby. Inspect both ramps before leaving the shuttle vehicle because broad-river wind, high-water cleanup, and launch crowding can change same-day usability.",
      "permits": "No route-specific paddling permit is known. Use the DNR public accesses, follow Minnesota boating/PFD requirements, and respect posted parking, fishing, and access rules.",
      "camping": "Treat this as a day route. DNR Map 5 marks Lone Pine watercraft campsite upstream of the put-in and points to Crow Wing State Park camping farther downstream, but neither is part of the normal Highway-6-to-Trommald plan.",
      "campingClassification": "none",
      "summary": "Launch at Highway 6 and take out at Trommald for MN DNR / MHB recommended broad Mississippi water above Brainerd. Use the Brainerd DNR gauge as the official downstream corridor proxy and make visual checks at both ramps.",
      "accessCaveats": [
        "Highway 6 resolves as WAS00999 at river mile 1030.0, and Trommald resolves as WAS02294 at river mile 1018.3 in Minnesota public-water-access GIS.",
        "The Brainerd gauge is downstream of the take-out and below the Pine River confluence, so it is a conservative corridor proxy rather than an exact put-in reading.",
        "Finish at Trommald for this route. Do not drift toward Brainerd, French Rapids, Potlatch Dam, or any portage corridor without a separate plan."
      ],
      "watchFor": [
        "Stronger current after rain, especially with Pine River inflow midway through the trip.",
        "Motorboats, fishing traffic, wind, and wake on the wide river.",
        "Floating wood, cold water, private banks, and downstream dam-corridor complacency after an easy first half."
      ]
    },
    "accessPoints": [
      {
        "id": "hwy-6-mississippi",
        "name": "Mississippi River, Hwy 6 Public Water Access Site",
        "latitude": 46.5435051,
        "longitude": -93.9564174,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at public-water-access GIS river mile 1030.0; resolves as WAS00999."
      },
      {
        "id": "trommald-access",
        "name": "Mississippi River, Trommald Public Water Access Site",
        "latitude": 46.5149237,
        "longitude": -94.0696772,
        "mileFromStart": 11.7,
        "segmentKind": "creek",
        "note": "Default take-out at public-water-access GIS river mile 1018.3; resolves as WAS02294."
      }
    ]
  },
  "mississippi-river-kiwanis-crow-wing-state-park": {
    "putIn": {
      "name": "Mississippi River, Kiwanis Park Public Water Access Site",
      "latitude": 46.3465461,
      "longitude": -94.2072231
    },
    "takeOut": {
      "name": "Mississippi River, Crow Wing State Park Public Water Access Site",
      "latitude": 46.26827,
      "longitude": -94.3431079
    },
    "logistics": {
      "distanceLabel": "10.7 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr depending on wind, stops, and current",
      "shuttle": "Stage the Crow Wing State Park take-out first, then drive back to Kiwanis Park in Brainerd. Confirm current state-park entry, parking, launch, and vehicle rules before leaving a car.",
      "permits": "No route-specific paddling permit is known. Follow Minnesota boating/PFD rules, City of Brainerd park rules, DNR public-access rules, and Crow Wing State Park entry, parking, and camping rules.",
      "camping": "Crow Wing State Park can support endpoint base-camping when separately reserved or allowed under current park rules. Do not assume informal riverbank camping between Kiwanis and the state park.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Kiwanis Park and take out at Crow Wing State Park for the Mississippi Headwaters Board / DNR-linked Brainerd day route. Use the Brainerd DNR gauge as the official near-upstream corridor check.",
      "accessCaveats": [
        "Kiwanis Park resolves in Minnesota public-water-access GIS as a Brainerd city access at river mile 1001.1.",
        "Use the Crow Wing State Park Mississippi River access as the planned finish; the nearby Crow Wing public access is a different record and should not replace the state-park plan without checking signs.",
        "The Brainerd gauge is upstream of the put-in, so pair the official bands with visual checks for wind, landing condition, and post-rain debris."
      ],
      "watchFor": [
        "Wind and motorboat wake on broad Mississippi bends.",
        "Faster current, floating debris, cold water, and harder landings after rain or rising water.",
        "Private banks, state-park rules, and extending downstream without a separate longer-route plan."
      ]
    },
    "accessPoints": [
      {
        "id": "kiwanis-park",
        "name": "Mississippi River, Kiwanis Park Public Water Access Site",
        "latitude": 46.3465461,
        "longitude": -94.2072231,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default city put-in at public-water-access GIS river mile 1001.1; resolves as WAS01003."
      },
      {
        "id": "riverview-park",
        "name": "Mississippi River, Riverview Park Public Water Access Site",
        "latitude": 46.317285,
        "longitude": -94.260598,
        "mileFromStart": 4.1,
        "segmentKind": "creek",
        "note": "Intermediate public access at river mile 997.3; useful bailout if wind, wake, or current slows the trip."
      },
      {
        "id": "crow-wing-public-access",
        "name": "Mississippi River, Crow Wing Public Water Access Site",
        "latitude": 46.2792155,
        "longitude": -94.3322834,
        "mileFromStart": 8.8,
        "segmentKind": "creek",
        "note": "Nearby downstream access record before the state-park finish; use signs and current rules to avoid confusing access points."
      },
      {
        "id": "crow-wing-state-park",
        "name": "Mississippi River, Crow Wing State Park Public Water Access Site",
        "latitude": 46.26827,
        "longitude": -94.3431079,
        "mileFromStart": 10.7,
        "segmentKind": "creek",
        "note": "MHB/DNR-linked downstream finish at Crow Wing State Park; confirm state-park parking and access rules."
      }
    ]
  },
  "mississippi-river-royalton-stearns-county-park": {
    "putIn": {
      "name": "Mississippi River, Royalton Sportsman's Club Public Water Access Site",
      "latitude": 45.8297201,
      "longitude": -94.3506845
    },
    "takeOut": {
      "name": "Mississippi River County Park / Stearns County Park Public Water Access Site",
      "latitude": 45.7265772,
      "longitude": -94.2228602
    },
    "logistics": {
      "distanceLabel": "11.4 mi",
      "estimatedPaddleTime": "About 3 hr 45 min to 5 hr 30 min depending on level, wind, and stops",
      "shuttle": "Stage the take-out at Mississippi River County Park / Stearns County Park first, then drive upstream to the Royalton Sportsman's Club access. The put-in is club-administered and may require a fee.",
      "permits": "No route-specific paddling permit is known. Follow Royalton Sportsman's Club access rules, Stearns County park rules, Minnesota boating requirements, and any posted fee or parking instructions.",
      "camping": "DNR identifies Seven Islands Campsite as a possible overnight or picnic stop if unoccupied, and notes a private campground halfway through the route. Treat camping as first-come or separately arranged rather than guaranteed.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at the Royalton Sportsman's Club and take out at Mississippi River County Park for MN DNR's 11.4-mile central-Mississippi day trip. The Royalton gauge is direct and officially interpreted, but the route still needs a same-day low-water and private-bank check.",
      "accessCaveats": [
        "Royalton Sportsman's Club resolves as WAS00463 at river mile 953.6 and is administered by the club; confirm fee and parking conditions before staging.",
        "Mississippi River County Park / Stearns County Park resolves as WAS01283 at river mile 942.3 in Minnesota public-water-access GIS.",
        "This route is upstream of Sartell Dam; do not extend downstream toward Walleye Road or Sartell without a separate plan and dam-portage awareness."
      ],
      "watchFor": [
        "Rocky riffles and channel picking when the Royalton gauge is in the low band.",
        "Private islands and shorelines; use only legal public stops or the DNR-noted campsite when available.",
        "Wind on open bends, floating wood after storms, anglers, cold water, and changing island channels."
      ]
    },
    "accessPoints": [
      {
        "id": "royalton-sportsmans-club",
        "name": "Mississippi River, Royalton Sportsman's Club Public Water Access Site",
        "latitude": 45.8297201,
        "longitude": -94.3506845,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at DNR Map 7 river mile 953.6; resolves as WAS00463 and may require a club fee."
      },
      {
        "id": "mississippi-county-park",
        "name": "Mississippi River County Park / Stearns County Park Public Water Access Site",
        "latitude": 45.7265772,
        "longitude": -94.2228602,
        "mileFromStart": 11.4,
        "segmentKind": "creek",
        "note": "Default take-out at DNR Map 7 river mile 942.2 / GIS river mile 942.3; resolves as WAS01283."
      }
    ]
  },
  "zumbro-river-hammond-theilman": {
    "putIn": {
      "name": "Zumbro River, Hammond Village Park Public Water Access Site",
      "latitude": 44.2212366,
      "longitude": -92.3690609
    },
    "takeOut": {
      "name": "Zumbro River, Theilman Public Water Access Site",
      "latitude": 44.2867032,
      "longitude": -92.1868526
    },
    "logistics": {
      "distanceLabel": "About 16.0 mi",
      "estimatedPaddleTime": "About 5 hr to 7 hr, longer with low water, wood scouting, or campsite stops",
      "shuttle": "Stage the Theilman take-out first, then drive back to Hammond Village Park. This is a long enough southeast Minnesota day that low water, recent storms, and daylight should be checked before launching.",
      "permits": "No route-specific paddling permit is known. Follow Minnesota boating/PFD rules, posted access rules, and current DNR watercraft-campsite or public-land restrictions.",
      "camping": "DNR Map 2 identifies watercraft campsite support on this corridor. Treat camping as designated-site use only; verify current availability and do not camp on private banks.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Hammond Village Park and take out at Theilman for the missing Zumbro Map 2 connector above the existing Theilman-to-Kruger card. The Zumbro Falls DNR gauge is current and official, but today it is below the preferred medium band.",
      "accessCaveats": [
        "Hammond Village Park resolves as WAS00253 at river mile 38.2 in public-water-access GIS, while DNR Map 2 labels the Hammond/Village Park access at about river mile 39.0.",
        "Theilman resolves as WAS02185 at river mile 23.0 and is the planned finish; do not drift downstream into the existing Theilman-to-Kruger reach unless that extra route is staged.",
        "Use mapped public accesses and designated campsites only. Private banks, farm crossings, and unmanaged roads are not assumed legal exits."
      ],
      "watchFor": [
        "Hammond Rapids, lively current, snags, logs, and fresh strainers after storms.",
        "Flash-flood response after heavy rain; a stable gauge trend and local visual check matter more than the number alone.",
        "Low-water scraping when the Zumbro Falls gauge is in the official low band, cold water in shoulder seasons, and limited mid-route services."
      ]
    },
    "accessPoints": [
      {
        "id": "hammond-village-park-zumbro",
        "name": "Zumbro River, Hammond Village Park Public Water Access Site",
        "latitude": 44.2212366,
        "longitude": -92.3690609,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; resolves as WAS00253 in Minnesota public-water-access GIS."
      },
      {
        "id": "theilman-zumbro",
        "name": "Zumbro River, Theilman Public Water Access Site",
        "latitude": 44.2867032,
        "longitude": -92.1868526,
        "mileFromStart": 16,
        "segmentKind": "creek",
        "note": "Default take-out at DNR Map 2 river mile 23.0; resolves as WAS02185."
      }
    ]
  },
  "red-lake-river-st-hilaire-sportsmans": {
    "putIn": {
      "name": "Red Lake River, St. Hilaire City Park Public Water Access Site",
      "latitude": 48.0092108,
      "longitude": -96.2088527
    },
    "takeOut": {
      "name": "Red Lake River, Sportsman's Park / Red Lake Falls trailer access",
      "latitude": 47.8939989,
      "longitude": -96.2820976
    },
    "logistics": {
      "distanceLabel": "About 21.8 mi",
      "estimatedPaddleTime": "About 7 hr to 10 hr, longer with low water, tuber traffic, or wood scouting",
      "shuttle": "Stage Sportsman's Park in Red Lake Falls first, then drive upstream to St. Hilaire City Park. This is a long rural shuttle and should be shortened or postponed if the group cannot launch early.",
      "permits": "No route-specific paddling permit is known. Follow Minnesota boating/PFD rules plus posted St. Hilaire, Red Lake Falls, access, campground, and parking rules.",
      "camping": "DNR Map 2 maps camping/rest-area support at St. Hilaire and campsites/drinking water at Sportsman's Park. Treat this as endpoint campground support, not permission to camp on private riverbanks.",
      "campingClassification": "endpoint_campground",
      "summary": "Put in at St. Hilaire City Park and take out at Sportsman's Park for the missing Red Lake River connector between the existing Highway-1-to-St.-Hilaire and Sportsman's-to-Huot cards. The Red Lake Falls gauge is current and in the official medium band.",
      "accessCaveats": [
        "St. Hilaire City Park resolves as WAS00808 at river mile 114.8 in Minnesota public-water-access GIS.",
        "The Sportsman's Park access is represented in public-water-access GIS by the Clearwater River / Sportsman Park record at the confluence area; DNR Map 2 names it as the Red Lake River trailer access at river mile 93.0.",
        "The CR 13 gauge is near the lower end of the route. Make a visual check at St. Hilaire before committing the upstream miles to that reading."
      ],
      "watchFor": [
        "Intermittent Class I-II rapids, boulder fields, riffles, low-water scraping, and strainers between St. Hilaire and Red Lake Falls.",
        "High tuber frequency around river miles 96.5 to 93.9 near Red Lake Falls in season.",
        "Long mileage, private banks, cold water, limited exits, and faster current after rain."
      ]
    },
    "accessPoints": [
      {
        "id": "st-hilaire-red-lake",
        "name": "Red Lake River, St. Hilaire City Park Public Water Access Site",
        "latitude": 48.0092108,
        "longitude": -96.2088527,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at DNR Map 2 river mile 114.8; resolves as WAS00808."
      },
      {
        "id": "voyageurs-view-red-lake",
        "name": "Voyageur's View / County Road 13 carry-in access",
        "latitude": 47.8977123,
        "longitude": -96.2741376,
        "mileFromStart": 20.9,
        "segmentKind": "creek",
        "note": "DNR Map 2 maps this carry-in access and river-level gauge at river mile 93.9; resolves as WAS00552."
      },
      {
        "id": "sportsmans-park-red-lake",
        "name": "Red Lake River, Sportsman's Park / Red Lake Falls trailer access",
        "latitude": 47.8939989,
        "longitude": -96.2820976,
        "mileFromStart": 21.8,
        "segmentKind": "creek",
        "note": "Default take-out at DNR Map 2 river mile 93.0; public-access GIS resolves the confluence-area Sportsman Park access as WAS01943."
      }
    ]
  },
  "red-lake-river-huot-crookston": {
    "putIn": {
      "name": "Red Lake River, Huot Park Public Water Access Site",
      "latitude": 47.8610626,
      "longitude": -96.4249999
    },
    "takeOut": {
      "name": "Red Lake River, Central Park Public Water Access Site",
      "latitude": 47.7728904,
      "longitude": -96.6013775
    },
    "logistics": {
      "distanceLabel": "About 24.0 mi",
      "estimatedPaddleTime": "About 8 hr to 11 hr, longer with low water, wind, or wood scouting",
      "shuttle": "Stage Central Park in Crookston first, then drive upstream to Huot Park. This is a long lower-river day; launch early and keep a hard daylight cutoff.",
      "permits": "No route-specific paddling permit is known. Follow Minnesota boating/PFD rules, Huot Park access rules, City of Crookston park/campground rules, and posted parking instructions.",
      "camping": "DNR Map 2 identifies Central Park with trailer access, rest area, and campsites. Treat camping as endpoint campground support controlled by current City of Crookston rules.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Huot Park and take out at Crookston Central Park for a long lower Red Lake River connector. The Crookston DNR gauge is nearby and official but downstream of the take-out, and today it is only in the low band.",
      "accessCaveats": [
        "Huot Park resolves as WAS02137 at river mile 79.5 and Central Park resolves as WAS00549 at river mile 55.5 in Minnesota public-water-access GIS.",
        "The Crookston DNR gauge is downstream of Central Park and below additional bridge/rapid context, so use it as a near-downstream proxy and make visual checks at both endpoints.",
        "Take out at Central Park for this card. DNR Map 2 maps constructed rock rapids downstream in Crookston; do not continue without a separate scouted plan."
      ],
      "watchFor": [
        "Long mileage, low-water scraping, boulder fields, shallow bends, wood, and private banks.",
        "Constructed rapids downstream of the planned Central Park finish; missing the take-out changes the hazard profile.",
        "Wind across open farmland bends, cold water, farm runoff after storms, rising water, and sparse rescue access."
      ]
    },
    "accessPoints": [
      {
        "id": "huot-park-red-lake",
        "name": "Red Lake River, Huot Park Public Water Access Site",
        "latitude": 47.8610626,
        "longitude": -96.4249999,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at DNR Map 2 river mile 79.5; resolves as WAS02137."
      },
      {
        "id": "crookston-red-lake",
        "name": "Red Lake River, Crookston carry-in access",
        "latitude": 47.7598975,
        "longitude": -96.5671255,
        "mileFromStart": 20.4,
        "segmentKind": "creek",
        "note": "DNR Map 2 maps a Crookston carry-in access at river mile 59.1; GIS resolves Crookston access as WAS03055."
      },
      {
        "id": "central-park-crookston-red-lake",
        "name": "Red Lake River, Central Park Public Water Access Site",
        "latitude": 47.7728904,
        "longitude": -96.6013775,
        "mileFromStart": 24,
        "segmentKind": "creek",
        "note": "Default take-out at DNR Map 2 river mile 55.5; resolves as WAS00549 and keeps this card above the downstream constructed rapids."
      }
    ]
  },
  "des-moines-river-christiania-ashley-park": {
    "putIn": {
      "id": "christiania-bridge",
      "name": "Des Moines River, Christiania Bridge / Chris Public Water Access Site",
      "latitude": 43.7928244,
      "longitude": -95.0919226
    },
    "takeOut": {
      "id": "ashley-park",
      "name": "Des Moines River, Ashley Park Public Water Access Site",
      "latitude": 43.6253796,
      "longitude": -94.9872012
    },
    "logistics": {
      "distanceLabel": "About 16.3 mi",
      "estimatedPaddleTime": "About 5.5 hr to 8 hr, longer with low water, wood, or campsite stops",
      "shuttle": "Stage Ashley Park in Jackson first, then drive back to Christiania Bridge. This route ends just above the Jackson former-dam rapid area, so confirm the Ashley take-out before launching.",
      "permits": "No route-specific paddling permit is known. Use the named DNR public accesses, follow Minnesota boating/PFD rules, and obey posted county, state park, watercraft campsite, and private-bank rules.",
      "camping": "Kilen Woods State Park, the Kilen Woods watercraft campsite, and Belmont County Park watercraft campsite are mapped in this corridor. Use only designated campsites and current park rules; do not camp on private riverbanks or riverbed areas.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Christiania Bridge and take out at Ashley Park for a 16.3-mile Des Moines River connector through Kilen Woods and Belmont. The Jackson gauge is just downstream of the finish, so use it with same-day visual checks at both endpoints.",
      "accessCaveats": [
        "Christiania / Chris resolves as WAS01445 at river mile 29.1, and Ashley Park resolves as WAS02771 at river mile 12.8.",
        "The Jackson DNR gauge sits just downstream of Ashley near the former Jackson Dam / high Class I rapid. Do not miss Ashley or casually continue downstream without a scouted plan.",
        "Kilen Woods State Park and Belmont County Park camping access depends on current posted rules, fees, reservations, and campsite availability."
      ],
      "watchFor": [
        "Small Class I rapids near Kilen Woods, Belmont, and Jackson; lines can change with low water or debris.",
        "Snags, fallen trees, fast rises after rain, cold water, and muddy banks.",
        "Private shoreline and designated-campsite-only overnight rules."
      ]
    },
    "accessPoints": [
      {
        "id": "christiania-bridge",
        "name": "Des Moines River, Christiania Bridge / Chris Public Water Access Site",
        "latitude": 43.7928244,
        "longitude": -95.0919226,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; resolves as WAS01445 at Des Moines River mile 29.1."
      },
      {
        "id": "kilen-woods-county-road-19",
        "name": "Kilen Woods State Park / County Road 19 access",
        "latitude": 43.7243078,
        "longitude": -95.0547436,
        "mileFromStart": 6.3,
        "segmentKind": "creek",
        "note": "DNR Map 1 marks the County Road 19 bridge/trailer access near Kilen Woods at river mile 22.8; public-access GIS resolves WAS01444."
      },
      {
        "id": "ashley-park",
        "name": "Des Moines River, Ashley Park Public Water Access Site",
        "latitude": 43.6253796,
        "longitude": -94.9872012,
        "mileFromStart": 16.3,
        "segmentKind": "creek",
        "note": "Default take-out; resolves as WAS02771 at Des Moines River mile 12.8, just upstream of the Jackson gauge/former dam rapid context."
      }
    ]
  },
  "red-lake-river-highway-75-bypass-fisher": {
    "putIn": {
      "id": "red-lake-highway-75-bypass",
      "name": "Red Lake River, Highway 75 Bypass Public Water Access Site",
      "latitude": 47.7783856,
      "longitude": -96.6308629
    },
    "takeOut": {
      "id": "fisher-landing-red-lake",
      "name": "Red Lake River, Fisher Landing Public Water Access Site",
      "latitude": 47.8007512,
      "longitude": -96.8090097
    },
    "logistics": {
      "distanceLabel": "About 23.1 mi",
      "estimatedPaddleTime": "About 7.5 hr to 10.5 hr, longer with low water, wind, or wood scouting",
      "shuttle": "Stage Fisher Landing first, then drive back to the Highway 75 Bypass access west of Crookston. Start below the Crookston constructed-rapid and portage zone rather than improvising an upstream launch.",
      "permits": "No route-specific paddling permit is known. Follow Minnesota boating/PFD rules plus posted Crookston, Fisher, DNR access, and parking rules.",
      "camping": "No on-route campsite is documented for this lower Red Lake River day. Treat it as a long day trip and use only legal town or campground options if separately confirmed.",
      "campingClassification": "none",
      "summary": "Put in at the Highway 75 Bypass access below Crookston and take out at Fisher Landing. The Fisher gauge is direct at the finish and barely in the official medium band during this run.",
      "accessCaveats": [
        "Highway 75 Bypass resolves as WAS00550 at river mile 51.0, below the DNR-mapped Crookston constructed rock rapids and portage zone.",
        "Fisher Landing resolves as WAS02138 at river mile 27.9 beside the County Road 15 bridge and the Fisher river-level gauge.",
        "This is a long lower-river reach with sparse public exits; do not assume private banks or road crossings are legal bailout points."
      ],
      "watchFor": [
        "Low-water scraping, shallow bends, strainers, fresh flood debris, and slow travel if the gauge falls back below medium.",
        "Wind across open farmland bends, storms, cold water, private banks, and limited rescue exposure.",
        "Starting upstream of Highway 75 Bypass would reintroduce Crookston rapids and portage hazards that this card intentionally avoids."
      ]
    },
    "accessPoints": [
      {
        "id": "red-lake-highway-75-bypass",
        "name": "Red Lake River, Highway 75 Bypass Public Water Access Site",
        "latitude": 47.7783856,
        "longitude": -96.6308629,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at DNR Map 2 river mile 51.0, below the Crookston constructed-rapid zone."
      },
      {
        "id": "fisher-landing-red-lake",
        "name": "Red Lake River, Fisher Landing Public Water Access Site",
        "latitude": 47.8007512,
        "longitude": -96.8090097,
        "mileFromStart": 23.1,
        "segmentKind": "creek",
        "note": "Default take-out at DNR Map 2 river mile 27.9; resolves as WAS02138 and shares the Fisher gauge corridor."
      }
    ]
  },
  "otter-tail-river-phelps-mill-west-red-river-lake": {
    "putIn": {
      "id": "otter-tail-river-phelps-mill-public-water-access-site",
      "name": "Otter Tail River, Phelps Mill Public Water Access Site",
      "latitude": 46.3821667,
      "longitude": -95.8210176
    },
    "takeOut": {
      "id": "west-red-river-lake-public-water-access-site",
      "name": "West Red River Lake Public Water Access Site",
      "latitude": 46.3886343,
      "longitude": -95.9911976
    },
    "logistics": {
      "distanceLabel": "About 11.8 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr, longer with wind, low water, or lake traffic",
      "shuttle": "Stage West Red River Lake first, then drive back to Phelps Mill County Park. This is the longer official Phelps Mill day; groups wanting the shorter outing should use the West Lost Lake card instead.",
      "permits": "No route-specific paddling permit is known. Follow posted Otter Tail County park rules at Phelps Mill and MN DNR public-water-access rules at West Lost Lake and West Red River Lake.",
      "camping": "No on-route watercraft campsite is documented for this lake-influenced section. Treat it as a day trip; use legal nearby campground or park options only if separately confirmed.",
      "campingClassification": "none",
      "summary": "Launch from Phelps Mill County Park and take out at West Red River Lake for the official 11.8-mile Otter Tail River day trip. The Elizabeth gauge is downstream, so wind, lake conditions, and visual level checks remain part of the decision.",
      "accessCaveats": [
        "Phelps Mill is a county-administered public access below the Phelps Mill dam/portage context; do not run the dam or improvise above-dam launch choices.",
        "West Lost Lake is the midpoint public access and shorter-route take-out; West Red River Lake resolves as WAS00822 near river mile 73.3 for the longer day.",
        "The Elizabeth gauge is downstream of this route, so it is a corridor indicator rather than a direct reading at West Red River Lake."
      ],
      "watchFor": [
        "Wind and boat wake on West Lost Lake and West Red River Lake near the access points.",
        "Low-water dragging, vegetation, shallow riffles, culvert/bridge obstructions, and low headroom.",
        "Private shorelines, cold water, and slower travel if the downstream gauge falls toward the low band."
      ]
    },
    "accessPoints": [
      {
        "id": "otter-tail-river-phelps-mill-public-water-access-site",
        "name": "Otter Tail River, Phelps Mill Public Water Access Site",
        "latitude": 46.3821667,
        "longitude": -95.8210176,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at Phelps Mill County Park and dam/portage area."
      },
      {
        "id": "west-lost-lake-public-water-access-site",
        "name": "West Lost Lake Public Water Access Site",
        "latitude": 46.3814506,
        "longitude": -95.8622708,
        "mileFromStart": 3.5,
        "segmentKind": "lake",
        "note": "Mid-route public access and the finish for the existing shorter Phelps Mill-to-West-Lost-Lake card."
      },
      {
        "id": "west-red-river-lake-public-water-access-site",
        "name": "West Red River Lake Public Water Access Site",
        "latitude": 46.3886343,
        "longitude": -95.9911976,
        "mileFromStart": 11.8,
        "segmentKind": "lake",
        "note": "Default take-out; DNR public access at the official longer-route finish."
      }
    ]
  },
  "mississippi-river-steamboat-blackberry-bridge": {
    "putIn": {
      "id": "mississippi-river-steamboat-landing-public-water-access-site",
      "name": "Mississippi River, Steamboat Landing Public Water Access Site",
      "latitude": 47.2325351,
      "longitude": -93.522906
    },
    "takeOut": {
      "id": "mississippi-river-blackberry-bridge-public-water-access-site",
      "name": "Mississippi River, Blackberry Bridge Public Water Access Site",
      "latitude": 47.1736507,
      "longitude": -93.4186453
    },
    "logistics": {
      "distanceLabel": "About 8.0 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr, longer with low water, wind, or a campsite stop",
      "shuttle": "Stage Blackberry Bridge first, then drive back to Steamboat Landing in Grand Rapids. This route starts below the Blandin dam corridor and should be treated as the upper half of the DNR Steamboat-to-County-Road-72 Map 3 trip chain, not as a reason to continue past the planned take-out.",
      "permits": "No route-specific paddling permit is known. Use the named MN DNR public-water-access sites, follow posted city and access rules, and check Minnesota PFD, invasive-species, and boating requirements before launch.",
      "camping": "DNR Map 3 shows Sucher's watercraft campsite between Steamboat and Blackberry Bridge. Treat it as a designated water-trail campsite only; do not assume private banks, gravel bars, or developed access parking are legal overnight sites.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Steamboat Landing in Grand Rapids and take out at Blackberry Bridge for DNR's 8-mile upper Map 3 day trip. The Grand Rapids DNR river-level site is in the launch corridor and provides official interpreted bands for the route.",
      "accessCaveats": [
        "Steamboat Landing resolves as WAS00984 at river mile 1178.9; Blackberry Bridge resolves as WAS02539 at river mile 1170.9.",
        "Start below the Blandin dam/Grand Rapids control corridor and do not improvise launch choices at the dam or mill area.",
        "Sucher's campsite is the only documented on-route overnight option in this short reach; confirm availability, water-trail rules, and weather before planning an overnight.",
        "The DNR trip description calls the reach easy but notes small riffles during low water, so make a same-day visual call at Steamboat even when the gauge is above the scrapable floor."
      ],
      "watchFor": [
        "Shallow riffles and scraping when Grand Rapids flow falls toward the low band.",
        "Wind on broader bends, cold water, floating wood, strainers, and bank debris below Grand Rapids.",
        "Private banks and homes; stay with public accesses and designated water-trail campsite use.",
        "Fast current, debris, and reduced rescue margin when the DNR site pushes into high or very-high bands."
      ]
    },
    "accessPoints": [
      {
        "id": "mississippi-river-steamboat-landing-public-water-access-site",
        "name": "Mississippi River, Steamboat Landing Public Water Access Site",
        "latitude": 47.2325351,
        "longitude": -93.522906,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; MN public-water-access GIS lists this as WAS00984 at river mile 1178.9 behind River Grand Senior Living Community."
      },
      {
        "id": "mississippi-river-blackberry-bridge-public-water-access-site",
        "name": "Mississippi River, Blackberry Bridge Public Water Access Site",
        "latitude": 47.1736507,
        "longitude": -93.4186453,
        "mileFromStart": 8,
        "segmentKind": "creek",
        "note": "Default take-out; MN public-water-access GIS lists this as WAS02539 at river mile 1170.9."
      }
    ]
  },
  "mississippi-river-trommald-lum-park": {
    "putIn": {
      "id": "mississippi-river-trommald-public-water-access-site",
      "name": "Mississippi River, Trommald Public Water Access Site",
      "latitude": 46.5149237,
      "longitude": -94.0696772
    },
    "takeOut": {
      "id": "rice-lake-lum-park-public-water-access-site",
      "name": "Rice Lake / Lum Park Public Water Access Site",
      "latitude": 46.370838,
      "longitude": -94.1659805
    },
    "logistics": {
      "distanceLabel": "About 13.6 mi",
      "estimatedPaddleTime": "About 4.5 hr to 7 hr, longer with low water, wind, or campsite scouting",
      "shuttle": "Stage Lum Park in Brainerd first, then drive back to Trommald. This route intentionally stops above Potlatch Dam; do not continue downstream toward Kiwanis Park unless you have a separate current portage and dam plan.",
      "permits": "No route-specific paddling permit is known. Use the named MN DNR public-water-access sites, follow City of Brainerd park rules at Lum Park, and check Minnesota PFD, invasive-species, and boating requirements.",
      "camping": "DNR Map 5 shows Half-Moon watercraft campsite shortly below Trommald. Treat it as the documented water-trail overnight option and confirm current DNR campsite rules before building an overnight itinerary.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Trommald and take out at Lum Park on Rice Lake for a 13.6-mile Brainerd-lakes reach above Potlatch Dam. The app uses the DNR Brainerd interpreted site at Potlatch Dam because it is the same Map 5 corridor gauge just below the planned finish.",
      "accessCaveats": [
        "Trommald resolves as WAS02294 at river mile 1018.3; Lum Park / Rice Lake resolves as WAS00357 at river mile 1004.7.",
        "Lum Park is the required finish for this route. Potlatch Dam and the Brainerd gauge are just downstream; do not drift past the park into dam approach water.",
        "Half-Moon campsite is mapped near river mile 1017.0, but campsite conditions and occupancy must be checked before assuming an overnight.",
        "The Brainerd gauge is slightly downstream of the route and below Rice Lake influence, so verify flow, wind, and lake approach conditions at Lum Park before launching."
      ],
      "watchFor": [
        "French Rapids area current, shallow riffles, and rocky/gravel bars when the Brainerd site is in the low band.",
        "Wind and boat traffic on the Rice Lake / Lum Park approach.",
        "Floating wood, strainers, cold water, private banks, and limited mid-route exits.",
        "Potlatch Dam downstream of Lum Park; missing the planned take-out changes the risk profile immediately."
      ]
    },
    "accessPoints": [
      {
        "id": "mississippi-river-trommald-public-water-access-site",
        "name": "Mississippi River, Trommald Public Water Access Site",
        "latitude": 46.5149237,
        "longitude": -94.0696772,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; MN public-water-access GIS lists this as WAS02294 at river mile 1018.3."
      },
      {
        "id": "mississippi-river-french-rapids-public-water-access-site",
        "name": "Mississippi River, French Rapids Public Water Access Site",
        "latitude": 46.4037437,
        "longitude": -94.1586897,
        "mileFromStart": 11.8,
        "segmentKind": "transition",
        "note": "Intermediate public access near river mile 1006.5; useful bailout/scout context before the Lum Park finish."
      },
      {
        "id": "rice-lake-lum-park-public-water-access-site",
        "name": "Rice Lake / Lum Park Public Water Access Site",
        "latitude": 46.370838,
        "longitude": -94.1659805,
        "mileFromStart": 13.6,
        "segmentKind": "lake",
        "note": "Default take-out above Potlatch Dam; MN public-water-access GIS lists this as WAS00357 at river mile 1004.7."
      }
    ]
  },
  "mississippi-river-lum-park-kiwanis": {
    "putIn": {
      "id": "rice-lake-lum-park-public-water-access-site",
      "name": "Rice Lake / Lum Park Public Water Access Site",
      "latitude": 46.3708379856475,
      "longitude": -94.16598052360733
    },
    "takeOut": {
      "id": "mississippi-river-kiwanis-park-public-water-access-site",
      "name": "Mississippi River, Kiwanis Park Public Water Access Site",
      "latitude": 46.346546055567686,
      "longitude": -94.20722309254398
    },
    "logistics": {
      "distanceLabel": "About 3.5 mi plus 201-yard portage",
      "estimatedPaddleTime": "About 1.5 hr to 3 hr including the dam carry",
      "shuttle": "Stage Kiwanis Park first, then launch at Lum Park. Walk or scout the Potlatch Dam portage before committing; if the carry or landing is not clearly usable, do not launch this connector.",
      "permits": "No route-specific paddling permit is known. Follow City of Brainerd park rules, DNR public-access rules, portage signage, Minnesota boating/PFD requirements, and invasive-species rules.",
      "camping": "Lum Park has RV camping only per the DNR map; this short connector has no on-route campsite. Do not treat Kiwanis, Evergreen, Lyman P. White, or private banks as overnight sites.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Lum Park, portage Potlatch Dam on river right, and finish at Kiwanis Park. This is a short Brainerd connector for groups that intentionally want the dam carry, not a casual no-portage float.",
      "accessCaveats": [
        "Potlatch Dam is the central hazard. Portage river right for 201 yards exactly as mapped by DNR and stay out of restricted or unsafe dam water.",
        "Lum Park resolves in public-water-access GIS as a Rice Lake access at river mile 1004.7, immediately above the dam corridor.",
        "Kiwanis Park resolves as WAS01003 at river mile 1001.1. Confirm city park parking and landing condition before leaving the take-out vehicle."
      ],
      "watchFor": [
        "Dam hydraulics and any posted restrictions at the Potlatch Dam portage.",
        "Low-water scraping and awkward landings while the Brainerd gauge is below the official scrapable floor.",
        "Urban bridges, cold water, floating debris, wind, boat wake, private banks, and short-route complacency."
      ]
    },
    "accessPoints": [
      {
        "id": "rice-lake-lum-park-public-water-access-site",
        "name": "Rice Lake / Lum Park Public Water Access Site",
        "latitude": 46.3708379856475,
        "longitude": -94.16598052360733,
        "mileFromStart": 0,
        "segmentKind": "lake",
        "note": "Default put-in above Potlatch Dam; MN public-water-access GIS lists this as WAS00357 at river mile 1004.7."
      },
      {
        "id": "mississippi-river-kiwanis-park-public-water-access-site",
        "name": "Mississippi River, Kiwanis Park Public Water Access Site",
        "latitude": 46.346546055567686,
        "longitude": -94.20722309254398,
        "mileFromStart": 3.5,
        "segmentKind": "creek",
        "note": "Default take-out; MN public-water-access GIS lists this as WAS01003 at river mile 1001.1."
      }
    ]
  },
  "mississippi-river-beaver-island-clearwater": {
    "putIn": {
      "id": "mississippi-river-beaver-island-trail-public-water-access-site",
      "name": "Mississippi River, Beaver Island Trail Public Water Access Site",
      "latitude": 45.5441689,
      "longitude": -94.1488508
    },
    "takeOut": {
      "id": "mississippi-river-clearwater-public-water-access-site",
      "name": "Mississippi River, Clearwater Public Water Access Site",
      "latitude": 45.4194636,
      "longitude": -94.0423392
    },
    "logistics": {
      "distanceLabel": "About 12.1 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr, longer with island-channel scouting or low water",
      "shuttle": "Stage Clearwater first, then drive back to Beaver Island Trail Access in St. Cloud. Pick a main-channel plan before launching because side channels, islands, and private land can make informal exits confusing.",
      "permits": "No route-specific paddling permit is known. Use the named MN DNR public-water-access sites, follow local park and access rules, and check Minnesota PFD, invasive-species, and boating requirements.",
      "camping": "DNR Map 8 shows primitive watercraft campsites in the island corridor and farther downstream, but public and private islands are intermixed. Use only mapped/public campsites and confirm current DNR water-trail rules before relying on an overnight.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Beaver Island Trail Access and take out at Clearwater for DNR's 12.1-mile Map 8 day trip. The St. Cloud DNR river-level site is at the launch corridor and provides official interpreted bands for this island-channel reach.",
      "accessCaveats": [
        "Beaver Island Trail Access resolves as WAS01281 at river mile 925.8; Clearwater resolves as WAS01309 at river mile 913.7.",
        "The DNR map notes both public and private islands in this reach. Confirm campsite identity before landing or camping.",
        "The St. Cloud gauge is just upstream in the launch corridor; use it for flow screening, then make a visual call at Beaver Island before committing to side channels."
      ],
      "watchFor": [
        "Riffles and exposed gravel when the St. Cloud site is in the low band.",
        "Fast-moving water, debris, and stronger eddies around islands when the DNR site is high or rising.",
        "Private islands and banks, confusing side channels, cold water, strainers, fishing traffic, and weather exposure on wider bends.",
        "Longer rescue time if a group splits channels or misses the Clearwater landing."
      ]
    },
    "accessPoints": [
      {
        "id": "mississippi-river-beaver-island-trail-public-water-access-site",
        "name": "Mississippi River, Beaver Island Trail Public Water Access Site",
        "latitude": 45.5441689,
        "longitude": -94.1488508,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; MN public-water-access GIS lists this as WAS01281 at river mile 925.8."
      },
      {
        "id": "mississippi-river-clearwater-public-water-access-site",
        "name": "Mississippi River, Clearwater Public Water Access Site",
        "latitude": 45.4194636,
        "longitude": -94.0423392,
        "mileFromStart": 12.1,
        "segmentKind": "creek",
        "note": "Default take-out; MN public-water-access GIS lists this as WAS01309 at river mile 913.7."
      }
    ]
  },
  "red-river-kidder-brushvale": {
    "putIn": {
      "name": "Kidder Recreation Area",
      "latitude": 46.28799,
      "longitude": -96.5982
    },
    "takeOut": {
      "name": "Brushvale Bridge Recreation Area",
      "latitude": 46.36874,
      "longitude": -96.65589
    },
    "logistics": {
      "distanceLabel": "10.4 mi",
      "estimatedPaddleTime": "About 3.5 hr to 5 hr, longer with wind, low water, fishing stops, or muddy launches",
      "shuttle": "Stage the take-out at Brushvale Bridge Recreation Area, then drive back to Kidder Recreation Area. Confirm both ramps before launching because they are border-river accesses outside the Minnesota public-water-access GIS layer used for many other MN routes.",
      "permits": "No route-specific paddling permit is known. This is a Minnesota DNR water-trail route on a border river, so confirm Minnesota and North Dakota boating/PFD, fishing, access, and shore-use rules before launch.",
      "camping": "Treat this as a day trip. Do not assume island, mudbank, or private-bank camping is legal; use established public parks or campgrounds off-route if making a base-camp weekend.",
      "campingClassification": "none",
      "summary": "Launch at Kidder Recreation Area and take out at Brushvale Bridge Recreation Area for MN DNR’s 10.4-mile Red River day trip. The RR1 gauge is at the take-out river mile and has official DNR bands.",
      "accessCaveats": [
        "DNR says there are boat ramps at both the Kidder put-in and Brushvale take-out, but the route is on the Minnesota/North Dakota border and the access records are not in the Minnesota public-water-access GIS layer.",
        "Use the RR1 gauge as the primary same-day level check, then inspect both ramps for mud, debris, closure signs, bank condition, and current.",
        "The Red touches two states. Avoid private banks, farm approaches, and unmarked shore stops unless current public access is clear."
      ],
      "watchFor": [
        "Low water below 3.8 ft at RR1, when mud, bars, and poor boat control can make the route unsuitable.",
        "High or rising water above 9.5 ft at RR1, floodplain debris, fast current, and harder recovery in a broad muddy channel.",
        "Snags, islands, bridge current, fishing lines, motorboats, wind exposure, storms, and limited quick exits."
      ]
    },
    "accessPoints": [
      {
        "id": "kidder-recreation-area",
        "name": "Kidder Recreation Area",
        "latitude": 46.28799,
        "longitude": -96.5982,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; MN DNR lists Kidder Recreation Area at river mile 555.5 with a boat ramp."
      },
      {
        "id": "brushvale-bridge-recreation-area",
        "name": "Brushvale Bridge Recreation Area",
        "latitude": 46.36874,
        "longitude": -96.65589,
        "mileFromStart": 10.4,
        "segmentKind": "creek",
        "note": "Default take-out; MN DNR lists Brushvale Bridge Recreation Area at river mile 545.1 with a boat ramp and the RR1 gauge at the same river mile."
      }
    ]
  },
  "st-louis-river-paupores-brookston": {
    "putIn": {
      "name": "St. Louis River, Paupores Public Water Access Site",
      "latitude": 46.8741117,
      "longitude": -92.7652286
    },
    "takeOut": {
      "name": "St. Louis River, Brookston Public Water Access Site",
      "latitude": 46.8693332,
      "longitude": -92.6040058
    },
    "logistics": {
      "distanceLabel": "7.9 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr, longer with low water, rapid scouting, fishing, or campsite stops",
      "shuttle": "Stage Brookston first, then drive back to Paupores. Inspect both small trailer accesses before launching because low water, mud, downed trees, or local parking conditions can change the day.",
      "permits": "No route-specific paddling permit is known. Use the named DNR public accesses, follow Minnesota boating/PFD rules, and obey watercraft-campsite, fire, trash, and posted access rules.",
      "camping": "DNR identifies watercraft campsites on St. Louis River Map 2, making this segment overnight-capable only if the group has a confirmed legal campsite plan. Do not camp on private banks or informal railroad-side stops.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Paupores and take out at Brookston for the official 7.9-mile MN DNR Map 2 day trip. Use the upstream Floodwood gauge conservatively and make a same-day visual call for shallow rapids and wood.",
      "accessCaveats": [
        "Paupores and Brookston resolve as DNR Division of Parks and Trails public access sites in Minnesota public-water-access GIS.",
        "The Floodwood gauge is upstream of this route. It is the official same-map gauge used for scoring, but local depth and wood at the launch still control.",
        "Railroad tracks follow parts of the river corridor. Do not use rail property, private banks, or unmarked landings as routine exits."
      ],
      "watchFor": [
        "Class I-II rapids, some dangerous in high water, plus shallow rocky lines when the Floodwood gauge is below the official low band.",
        "Downed trees, strainers, cold water, fast rises after rain, muddy banks, and rural rescue spacing.",
        "Watercraft-campsite availability and rules if planning more than a day trip."
      ]
    },
    "accessPoints": [
      {
        "id": "st-louis-paupores",
        "name": "St. Louis River, Paupores Public Water Access Site",
        "latitude": 46.8741117,
        "longitude": -92.7652286,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at DNR Map 2 river mile 61.8; resolves as WAS00609."
      },
      {
        "id": "st-louis-brookston",
        "name": "St. Louis River, Brookston Public Water Access Site",
        "latitude": 46.8693332,
        "longitude": -92.6040058,
        "mileFromStart": 7.9,
        "segmentKind": "creek",
        "note": "Default take-out at DNR Map 2 river mile 53.9; resolves as WAS02081."
      }
    ]
  },
  "watonwan-river-county-road-32-garden-city": {
    "putIn": {
      "name": "Watonwan River, Co Rd 32 Public Water Access Site",
      "latitude": 44.0041578,
      "longitude": -94.2886309
    },
    "takeOut": {
      "name": "Watonwan River, Garden City Public Water Access Site",
      "latitude": 44.0461054,
      "longitude": -94.157931
    },
    "logistics": {
      "distanceLabel": "About 14.6 mi",
      "estimatedPaddleTime": "About 5 hr to 7 hr, longer with low water, wood, wind, or fishing stops",
      "shuttle": "Stage Garden City first, then drive back to the County Road 32 access. Check the County Road 20 and Highway 169 accesses during shuttle if the group may need a shorter bailout.",
      "permits": "No route-specific paddling permit is known. Use Blue Earth County and DNR public accesses, follow Minnesota boating/PFD rules, and obey WMA/WPA, county, and posted access rules.",
      "camping": "Treat this as a day trip. DNR identifies nearby wildlife areas along the Watonwan corridor, but this selected access pair has no documented on-route watercraft campsite; do not camp on private farmland banks.",
      "campingClassification": "none",
      "summary": "Launch at County Road 32 and take out at Garden City for a lower Watonwan access-pair day inside the broader MN DNR Madelia-to-Garden-City paddling corridor. The Garden City gauge provides official bands, but this exact split is product-selected rather than a named DNR day trip.",
      "accessCaveats": [
        "County Road 32, County Road 20, Highway 169, and Garden City all resolve as public Watonwan River access sites in Minnesota public-water-access GIS.",
        "The Garden City gauge is the lower-corridor level check. Pair it with a visual inspection at County Road 32 because low-water depth and fresh wood can vary upstream.",
        "Most banks are private agricultural land. Use public accesses for launch, landing, and bailouts rather than farm banks or field roads."
      ],
      "watchFor": [
        "Snags and fallen trees on bends; DNR says an unwary paddler can be tipped by wood.",
        "Low water below 2.0 ft at Garden City, muddy landings, shallow riffles, and slow progress.",
        "Fast current after rain, floating debris, storms, wind on open farmland bends, and limited public exits between mapped accesses."
      ]
    },
    "accessPoints": [
      {
        "id": "watonwan-county-road-32",
        "name": "Watonwan River, Co Rd 32 Public Water Access Site",
        "latitude": 44.0041578,
        "longitude": -94.2886309,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at public-water-access river mile 35.0; resolves as WAS00214."
      },
      {
        "id": "watonwan-county-road-20",
        "name": "Watonwan River, Co Rd 20 Public Water Access Site",
        "latitude": 44.0252735,
        "longitude": -94.2290481,
        "mileFromStart": 5.5,
        "segmentKind": "creek",
        "note": "Intermediate public access and practical bailout at river mile 29.5; resolves as WAS00213."
      },
      {
        "id": "watonwan-highway-169",
        "name": "Watonwan River, Hwy #169 Public Water Access Site",
        "latitude": 44.0491569,
        "longitude": -94.1714393,
        "mileFromStart": 13.8,
        "segmentKind": "creek",
        "note": "Late-route public access near the northwest edge of Garden City at river mile 21.2; resolves as WAS02056."
      },
      {
        "id": "watonwan-garden-city",
        "name": "Watonwan River, Garden City Public Water Access Site",
        "latitude": 44.0461054,
        "longitude": -94.157931,
        "mileFromStart": 14.6,
        "segmentKind": "creek",
        "note": "Default take-out near the Blue Earth County Fairgrounds at river mile 20.4; resolves as WAS02055."
      }
    ]
  },
  "st-louis-river-forbes-zim": {
    "putIn": {
      "id": "st-louis-forbes",
      "name": "St. Louis River, Forbes Public Water Access Site",
      "latitude": 47.362165673829445,
      "longitude": -92.6007600922704
    },
    "takeOut": {
      "id": "st-louis-zim",
      "name": "St. Louis River, Zim Public Water Access Site",
      "latitude": 47.30593877598574,
      "longitude": -92.65953182883595
    },
    "logistics": {
      "distanceLabel": "12.9 mi",
      "estimatedPaddleTime": "About 5 hr to 7 hr, longer with low-water dragging, scouting, or wood",
      "shuttle": "Stage Zim first, then drive back to Forbes. Check the Forbes DNR gauge and walk both carry-in accesses before launching because the current run-start reading was below the official scrapable floor.",
      "permits": "No route-specific paddling permit is known. Use the DNR public accesses, follow Minnesota boating/PFD rules, and check current St. Louis River water-trail alerts.",
      "camping": "Treat this as a day trip. No designated on-route campsite was verified between Forbes and Zim; use only separately confirmed public or private campground options off route.",
      "campingClassification": "none",
      "summary": "Launch at the Forbes DNR public access and take out at Zim for the missing upper-St. Louis connector between the County-Road-95-to-Forbes and Zim-to-Toivola cards. The route uses the direct Forbes DNR gauge and carries low-water, dam, cold-water, and remote-rescue caveats.",
      "accessCaveats": [
        "Forbes resolves in Minnesota public-water-access GIS as WAS00614 near DNR river mile 125.9.",
        "Zim resolves in Minnesota public-water-access GIS as WAS00613 near DNR river mile 113.0.",
        "Keep the trip framed from public access to public access. Do not use private banks or dam infrastructure for routine stops."
      ],
      "watchFor": [
        "Below-scrapable Forbes readings, exposed boulder beds, rocky shallows, and possible dragging.",
        "Class I-II current, fresh wood, strainers, cold water, remote banks, and limited services.",
        "Forbes dam/portage context at the upstream boundary and private-property limits throughout the corridor."
      ]
    },
    "accessPoints": [
      {
        "id": "st-louis-forbes",
        "name": "St. Louis River, Forbes Public Water Access Site",
        "latitude": 47.362165673829445,
        "longitude": -92.6007600922704,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; public-water-access GIS resolves WAS00614 at river mile 125.9."
      },
      {
        "id": "st-louis-zim",
        "name": "St. Louis River, Zim Public Water Access Site",
        "latitude": 47.30593877598574,
        "longitude": -92.65953182883595,
        "mileFromStart": 12.9,
        "segmentKind": "creek",
        "note": "Default take-out; public-water-access GIS resolves WAS00613 at river mile 113.0."
      }
    ]
  },
  "cannon-river-riverside-miesville": {
    "putIn": {
      "id": "cannon-riverside-park",
      "name": "Cannon River, Riverside Park Public Water Access Site",
      "latitude": 44.51191316068156,
      "longitude": -92.90681548046199
    },
    "takeOut": {
      "id": "cannon-miesville-ravine",
      "name": "Cannon River, Miesville Ravine County Park Public Water Access Site",
      "latitude": 44.54305655093129,
      "longitude": -92.80084157065109
    },
    "logistics": {
      "distanceLabel": "About 6.9 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, longer with fishing stops, low water, or wood",
      "shuttle": "Stage Miesville Ravine County Park first, then launch from Riverside Park in Cannon Falls. Check the Welch DNR gauge trend and inspect both park landings before committing.",
      "permits": "No route-specific paddling permit is known. Follow Minnesota boating/PFD rules and obey Cannon Falls, Dakota County park, DNR water-trail, and private-property postings.",
      "camping": "Treat this as a day trip. No on-route campsite was verified between Riverside Park and Miesville Ravine; use nearby campgrounds or park lodging only if separately confirmed.",
      "campingClassification": "none",
      "summary": "Launch at Cannon Falls Riverside Park and take out at Miesville Ravine County Park for a short lower-Cannon public-access day. The downstream Welch DNR gauge was in the official medium band during this run, but wood, riffles, and private banks still need same-day judgment.",
      "accessCaveats": [
        "Riverside Park resolves in Minnesota public-water-access GIS as WAS01692 at DNR river mile 25.5.",
        "Miesville Ravine County Park resolves in Minnesota public-water-access GIS as WAS01694 at DNR river mile 18.5.",
        "Welch is downstream of this pair. Use the official bands as lower-Cannon context and confirm local depth at launch."
      ],
      "watchFor": [
        "Strainers, downed trees, bridge current, shallow riffles, cold water, and faster current after rain.",
        "Private banks and limited legal stopping options outside the public park accesses.",
        "Wind and fatigue are minor compared with wood and current, but still matter for novice groups."
      ]
    },
    "accessPoints": [
      {
        "id": "cannon-riverside-park",
        "name": "Cannon River, Riverside Park Public Water Access Site",
        "latitude": 44.51191316068156,
        "longitude": -92.90681548046199,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at Cannon Falls; public-water-access GIS resolves WAS01692 at river mile 25.5."
      },
      {
        "id": "cannon-miesville-ravine",
        "name": "Cannon River, Miesville Ravine County Park Public Water Access Site",
        "latitude": 44.54305655093129,
        "longitude": -92.80084157065109,
        "mileFromStart": 6.9,
        "segmentKind": "creek",
        "note": "Default take-out; public-water-access GIS resolves WAS01694 at river mile 18.5."
      }
    ]
  },
  "cedar-river-ramsey-austin-mill-pond": {
    "putIn": {
      "id": "cedar-river-ramsey-mill-pond",
      "name": "Cedar River, Ramsey Mill Pond Public Water Access Site",
      "latitude": 43.70648117215681,
      "longitude": -92.95951811749727
    },
    "takeOut": {
      "id": "cedar-river-austin-mill-pond",
      "name": "Austin Mill Pond Public Water Access Site",
      "latitude": 43.674039181636296,
      "longitude": -92.97327961720995
    },
    "logistics": {
      "distanceLabel": "About 3.7 mi",
      "estimatedPaddleTime": "About 1.5 hr to 2.5 hr, longer with low water, debris, or dam-area scouting",
      "shuttle": "Stage Austin Mill Pond first, then drive back to Ramsey Mill Pond. Walk the Austin landing before launch so the short city finish is clear.",
      "permits": "No route-specific paddling permit is known. Use the public accesses, follow Minnesota boating/PFD rules, and obey posted city, DNR, dam, and private-property restrictions.",
      "camping": "Treat this as a short day route. DNR does not document an on-route campsite between Ramsey and Austin Mill Pond, and private-bank camping should not be assumed.",
      "campingClassification": "none",
      "summary": "Launch at Ramsey Mill Pond and take out at Austin Mill Pond for the short Cedar River connector above the existing Riverwood-to-State-Line card. Dam boundaries, snags, and the upstream Lansing proxy gauge are the main planning caveats.",
      "accessCaveats": [
        "Ramsey Mill Pond resolves in Minnesota public-water-access GIS as WAS01376 at DNR river mile 21.2.",
        "Austin Mill Pond resolves in Minnesota public-water-access GIS as WAS01390 at DNR river mile 17.5.",
        "The Lansing gauge is upstream of the route. Pair it with local visual checks and avoid extending through dam or mill-pond structures unless separately planned."
      ],
      "watchFor": [
        "Low-head dam and mill-pond boundary hazards at the route edges.",
        "Snags, overhanging trees, bridge current, urban debris, private banks, and fast rises after rain.",
        "Low-water scraping or dragging when the Lansing gauge falls toward the official low and scrapable bands."
      ]
    },
    "accessPoints": [
      {
        "id": "cedar-river-ramsey-mill-pond",
        "name": "Cedar River, Ramsey Mill Pond Public Water Access Site",
        "latitude": 43.70648117215681,
        "longitude": -92.95951811749727,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; public-water-access GIS resolves WAS01376 at river mile 21.2."
      },
      {
        "id": "cedar-river-austin-mill-pond",
        "name": "Austin Mill Pond Public Water Access Site",
        "latitude": 43.674039181636296,
        "longitude": -92.97327961720995,
        "mileFromStart": 3.7,
        "segmentKind": "creek",
        "note": "Default take-out; public-water-access GIS resolves WAS01390 at river mile 17.5."
      }
    ]
  },
  "cloquet-river-bachelor-road-highway-53": {
    "putIn": {
      "id": "bachelor-road-cloquet",
      "name": "Cloquet River, Bachelor Road Public Water Access Site",
      "latitude": 46.9524154,
      "longitude": -92.327051
    },
    "takeOut": {
      "id": "highway-53-wayside-cloquet",
      "name": "Cloquet River, Highway 53 Wayside Rest Public Water Access Site",
      "latitude": 46.9595303,
      "longitude": -92.4600367
    },
    "logistics": {
      "distanceLabel": "About 10.3 mi",
      "estimatedPaddleTime": "About 3.5 hr to 5.5 hr, longer with low water, scouting, or campsite stops",
      "shuttle": "Stage the Highway 53 wayside first, then drive back to Bachelor Road. Inspect both landings before launch because low release levels can make this connector slower than the mileage suggests.",
      "permits": "No route-specific paddling permit is known. Use the named DNR public accesses, follow Minnesota boating/PFD rules, and obey posted watercraft-campsite and access rules.",
      "camping": "DNR Map 1 shows designated watercraft campsites between Bachelor Road and Highway 53, including MCC, Old Mule, and Three Island. Treat them as rustic first-come sites and do not use private banks or informal riverbed camps.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Bachelor Road and take out at the Highway 53 wayside for the middle lower-Cloquet connector. The downstream Burnett gauge is the official interpreted screen, but same-day depth, dam releases, and visible rock at Bachelor Road still decide marginal days.",
      "accessCaveats": [
        "Bachelor Road resolves as WAS01627 at river mile 20.5; Highway 53 Wayside Rest resolves as WAS02744 at river mile 10.2 in Minnesota public-water-access GIS.",
        "The Burnett gauge is downstream of this route near Highway 7, so it is a conservative corridor proxy rather than an exact route gauge.",
        "This card ends at Highway 53. Any continuation toward Burnett or Highway 7 needs a separate downstream route plan."
      ],
      "watchFor": [
        "Repeated Class I rapid reaches, shallow rock, and possible scraping when Burnett is in the official low band.",
        "Dam-release changes from Island Lake, fast rises after rain, fresh strainers, bridge approaches, cold water, and private banks.",
        "No casual continuation below Highway 53 unless the group deliberately chooses a downstream plan and conditions fit."
      ]
    },
    "accessPoints": [
      {
        "id": "bachelor-road-cloquet",
        "name": "Bachelor Road Public Water Access Site",
        "latitude": 46.9524154,
        "longitude": -92.327051,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; resolves as WAS01627 at DNR river mile 20.5."
      },
      {
        "id": "highway-53-wayside-cloquet",
        "name": "Cloquet River, Highway 53 Wayside Rest Public Water Access Site",
        "latitude": 46.9595303,
        "longitude": -92.4600367,
        "mileFromStart": 10.3,
        "segmentKind": "creek",
        "note": "Default take-out; resolves as WAS02744 at DNR river mile 10.2."
      }
    ]
  },
  "whitewater-river-highway-74-us-61": {
    "putIn": {
      "id": "whitewater-beaver-highway-74",
      "name": "Whitewater River, Beaver Public Water Access Site",
      "latitude": 44.1496762,
      "longitude": -92.005621
    },
    "takeOut": {
      "id": "whitewater-highway-61",
      "name": "Whitewater River, Highway 61 Public Water Access Site",
      "latitude": 44.2083885,
      "longitude": -91.9230759
    },
    "logistics": {
      "distanceLabel": "About 9.8 mi",
      "estimatedPaddleTime": "About 3.5 hr to 5.5 hr, longer with wood, scouting, or low water",
      "shuttle": "Stage the Highway 61 access first, then drive back to the Beaver / Highway 74 access. Confirm both small parking areas and the exact take-out before launch because this lower WMA reach has few friendly exit options.",
      "permits": "No special paddling permit is known for the Minnesota DNR Whitewater River State Water Trail. Use the named public accesses, follow Minnesota boating/PFD rules, and obey WMA and parking rules.",
      "camping": "No camping is assumed on this route. MN DNR says there are no campsites or rest areas in the ecologically sensitive Whitewater Wildlife Management Area.",
      "campingClassification": "none",
      "summary": "Launch at the Beaver / Highway 74 access and take out at Highway 61 near Weaver. The Beaver gauge is direct and currently in the official medium band, but DNR warns this lower corridor is not novice-friendly because trees and occasional log jams can block the channel.",
      "accessCaveats": [
        "Beaver resolves as WAS02183 at river mile 10.3 and Highway 61 resolves as WAS00260 at river mile 0.5 in Minnesota public-water-access GIS.",
        "These are small carry-in accesses with limited parking and no restroom listed in the public-water-access records.",
        "Do not use informal WMA banks, private banks, or agricultural edges as routine stops; plan the shuttle around the two named public accesses."
      ],
      "watchFor": [
        "Many trees, occasional log jams, deadfall, strainers, and tight maneuvering below Beaver.",
        "Constructed rock rapids at and below Beaver, including drops shown on DNR Map 2 near river miles 10.2, 6.4, and 4.2.",
        "Flashy rain response, cold water, poor summer visibility, soft banks, and scraping if the Beaver gauge drops below the medium band."
      ]
    },
    "accessPoints": [
      {
        "id": "whitewater-beaver-highway-74",
        "name": "Whitewater River, Beaver Public Water Access Site",
        "latitude": 44.1496762,
        "longitude": -92.005621,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; resolves as WAS02183 at DNR river mile 10.3."
      },
      {
        "id": "whitewater-highway-61",
        "name": "Whitewater River, Highway 61 Public Water Access Site",
        "latitude": 44.2083885,
        "longitude": -91.9230759,
        "mileFromStart": 9.8,
        "segmentKind": "creek",
        "note": "Default take-out; resolves as WAS00260 at DNR river mile 0.5."
      }
    ]
  },
  "mississippi-river-clearwater-snuffies": {
    "putIn": {
      "id": "clearwater-mississippi",
      "name": "Mississippi River, Clearwater Public Water Access Site",
      "latitude": 45.4194636,
      "longitude": -94.0423392
    },
    "takeOut": {
      "id": "snuffies-landing",
      "name": "Mississippi River, Snuffie's Landing Public Water Access Site",
      "latitude": 45.3837473,
      "longitude": -93.9148507
    },
    "logistics": {
      "distanceLabel": "About 8.2 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, longer with wind, low water, or campsite stops",
      "shuttle": "Stage Snuffie's Landing first, then drive back to Clearwater. Inspect the take-out before launch because the landing is tucked into the lower end of the route and the river continues into the Norin / Babcock corridor.",
      "permits": "No route-specific paddling permit is known. Use the named public accesses, follow Minnesota boating/PFD rules, and obey city, DNR, camping, and fishing rules.",
      "camping": "DNR Map 8 identifies Oak Island at river mile 906 as a no-fee watercraft campsite. Treat camping as designated-site only; do not assume private island, sandbar, or bank camping elsewhere.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Clearwater and finish at Snuffie's Landing for a shorter Map 8 Mississippi connector below the existing Beaver-Island-to-Clearwater route. The St. Cloud gauge is upstream, so pair the official bands with local wind, riffle, and access checks.",
      "accessCaveats": [
        "Clearwater resolves as WAS01309 at river mile 913.7 and Snuffie's Landing resolves as WAS01297 at river mile 905.5 in Minnesota public-water-access GIS.",
        "The St. Cloud gauge is upstream of this route and should be treated as a same-map proxy, not an exact local measurement.",
        "Take out at Snuffie's for this card. Do not drift into the downstream Norin and Babcock corridor without a separate shuttle plan."
      ],
      "watchFor": [
        "Low-water riffles, shallow side channels, and slower progress when the upstream St. Cloud gauge is near the low band.",
        "Fast current, floating wood, bridge approaches, wind on open bends, motorboats, anglers, cold water, and private banks.",
        "Finding Snuffie's Landing from the water before the final bends and avoiding unplanned downstream continuation."
      ]
    },
    "accessPoints": [
      {
        "id": "clearwater-mississippi",
        "name": "Mississippi River, Clearwater Public Water Access Site",
        "latitude": 45.4194636,
        "longitude": -94.0423392,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; resolves as WAS01309 at DNR river mile 913.7."
      },
      {
        "id": "snuffies-landing",
        "name": "Snuffie's Landing Public Water Access Site",
        "latitude": 45.3837473,
        "longitude": -93.9148507,
        "mileFromStart": 8.2,
        "segmentKind": "creek",
        "note": "Default take-out; resolves as WAS01297 at DNR river mile 905.5."
      }
    ]
  },
  "pomme-de-terre-river-koosman-larson": {
    "putIn": {
      "id": "pomme-de-terre-koosman",
      "name": "Pomme de Terre River, Koosman Public Water Access Site",
      "latitude": 45.3399435,
      "longitude": -95.9737205
    },
    "takeOut": {
      "id": "pomme-de-terre-larson",
      "name": "Pomme de Terre River, Larson Landing Public Water Access Site",
      "latitude": 45.2393301,
      "longitude": -95.9850983
    },
    "logistics": {
      "distanceLabel": "About 12.7 mi",
      "estimatedPaddleTime": "About 4.5 hr to 6.5 hr, longer with low water, wood, or campsite stops",
      "shuttle": "Stage Larson Landing first, then drive back to Koosman. Check the Pomme #1 access/campsite and Larson take-out from land because the Appleton gauge is downstream of this split.",
      "permits": "No route-specific paddling permit is known. Use the named DNR public accesses, follow Minnesota boating/PFD rules, and obey posted campsite, access, and private-bank rules.",
      "camping": "DNR Map 1 identifies Pomme de Terre #1 as a rest area and watercraft campsite at river mile 19.1. Use only legal designated camping and current posted rules; do not camp on private farm banks.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Koosman and paddle downstream past the Pomme de Terre #1 campsite to Larson Landing. This fills the upper public-access half above the existing Larson-to-Appleton card while keeping the Appleton DNR gauge caveat explicit.",
      "accessCaveats": [
        "Koosman, Pomme #1, and Larson resolve in Minnesota public-water-access GIS with official coordinates and water-trail river miles.",
        "Koosman and Larson are carry-in accesses, not full-service ramps. Confirm parking, mud, and bank condition before unloading.",
        "The Appleton gauge is downstream of Larson and cannot show local fences, woody debris, or low-water riffles on this upstream split."
      ],
      "watchFor": [
        "Fallen trees, farm fences, shallow sandy riffles, and strainers on blind bends.",
        "Fast rises after rain, cold water outside midsummer, and private farm banks.",
        "Campsite availability and current posted rules at Pomme #1 if using this as an overnight-capable connector."
      ]
    },
    "accessPoints": [
      {
        "id": "pomme-de-terre-koosman",
        "name": "Pomme de Terre River, Koosman Public Water Access Site",
        "latitude": 45.3399435,
        "longitude": -95.9737205,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; public-water-access GIS resolves WAS00180 near DNR Map 1 river mile 27.3/27.5."
      },
      {
        "id": "pomme-de-terre-number-1",
        "name": "Pomme de Terre River, #1 / Highway 12 Public Water Access Site",
        "latitude": 45.283686,
        "longitude": -95.9793669,
        "mileFromStart": 8.2,
        "segmentKind": "creek",
        "note": "DNR-mapped rest area and watercraft campsite; public-water-access GIS resolves WAS02176 at river mile 19.1."
      },
      {
        "id": "pomme-de-terre-larson",
        "name": "Pomme de Terre River, Larson Landing Public Water Access Site",
        "latitude": 45.2393301,
        "longitude": -95.9850983,
        "mileFromStart": 12.7,
        "segmentKind": "creek",
        "note": "Default take-out; public-water-access GIS resolves WAS00046 at river mile 14.8."
      }
    ]
  },
  "red-lake-river-crookston-highway-75-bypass": {
    "putIn": {
      "id": "red-lake-crookston-carry-in",
      "name": "Red Lake River, Crookston Public Water Access Site",
      "latitude": 47.7598975,
      "longitude": -96.5671255
    },
    "takeOut": {
      "id": "red-lake-highway-75-bypass",
      "name": "Red Lake River, Highway 75 Bypass Public Water Access Site",
      "latitude": 47.7783856,
      "longitude": -96.6308629
    },
    "logistics": {
      "distanceLabel": "About 8.1 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, plus scouting or portaging the constructed rapid zone",
      "shuttle": "Stage Highway 75 Bypass first, then launch at the Crookston carry-in. Walk the Central Park and constructed-rapid area before committing, and be ready to use the DNR-mapped right-bank portage.",
      "permits": "No route-specific paddling permit is known. Follow Minnesota boating/PFD rules plus posted City of Crookston, DNR access, portage, and parking rules.",
      "camping": "DNR Map 2 identifies Central Park with campsites, rest area, and trailer access inside the route corridor. Use only current city-managed camping and park rules; this short card does not assume informal river camping.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Crookston and finish at Highway 75 Bypass for the short city gap upstream of the already-live Highway-75-to-Fisher route. The main decision is whether to portage or avoid the constructed rock rapid zone.",
      "accessCaveats": [
        "Crookston and Highway 75 Bypass resolve as public-water-access sites, and Central Park is a mapped public access/camping stop inside the city corridor.",
        "The constructed rock rapids are not optional background scenery. Scout from shore and use the mapped 160-yard right-bank portage unless the group is prepared for the current level and feature.",
        "Take out at Highway 75 Bypass if following this card. Continuing to Fisher is a separate long lower-river route already represented in the app."
      ],
      "watchFor": [
        "Constructed rock rapids that DNR maps as Class I-III depending on flow, with a right-bank 160-yard portage.",
        "Urban debris, bridge current, strainers, cold water, and stormwater or water-quality concerns after rain.",
        "Low-water scraping while the Crookston gauge is below medium, and pushier consequences if the gauge rises toward high water."
      ]
    },
    "accessPoints": [
      {
        "id": "red-lake-crookston-carry-in",
        "name": "Red Lake River, Crookston Public Water Access Site",
        "latitude": 47.7598975,
        "longitude": -96.5671255,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; public-water-access GIS resolves WAS03055, and DNR Map 2 places Crookston carry-in at river mile 59.1."
      },
      {
        "id": "central-park-crookston-red-lake",
        "name": "Red Lake River, Central Park Public Water Access Site",
        "latitude": 47.7728904,
        "longitude": -96.6013775,
        "mileFromStart": 3.6,
        "segmentKind": "creek",
        "note": "Mapped trailer access, rest area, and campsite zone in Crookston before the constructed rapid/portage area."
      },
      {
        "id": "red-lake-highway-75-bypass",
        "name": "Red Lake River, Highway 75 Bypass Public Water Access Site",
        "latitude": 47.7783856,
        "longitude": -96.6308629,
        "mileFromStart": 8.1,
        "segmentKind": "creek",
        "note": "Default take-out; public-water-access GIS resolves WAS00550 at DNR Map 2 river mile 51.0, below the Crookston constructed-rapid zone."
      }
    ]
  },
  "root-river-peterson-rushford": {
    "putIn": {
      "id": "root-river-peterson-access",
      "name": "Root River, Peterson Public Water Access Site",
      "latitude": 43.7864446,
      "longitude": -91.8274722
    },
    "takeOut": {
      "id": "root-river-rushford-access",
      "name": "Root River, Rushford Public Water Access Site",
      "latitude": 43.8030062,
      "longitude": -91.7603553
    },
    "logistics": {
      "distanceLabel": "About 5.1 mi by DNR Map 1",
      "estimatedPaddleTime": "About 1.75 hr to 3 hr, longer with low-water riffles or wood checks",
      "shuttle": "Stage Rushford first, then drive back to Peterson. This is a short town-to-town connector; bike shuttle may be practical when road and trail conditions line up, but confirm the actual river access and parking first.",
      "permits": "No route-specific paddling permit is known. Follow DNR public-access rules, Minnesota boating/PFD requirements, and posted Peterson/Rushford parking rules.",
      "camping": "Treat this as a day route. DNR notes Root River trail towns including Peterson and Rushford have lodging and amenities; use only separately confirmed campgrounds or lodging and do not camp on private banks.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Peterson and take out at Rushford to fill the short Root River access-chain gap between the existing Lanesboro-Peterson and Rushford-Houston cards. The Houston gauge is downstream, so local visual checks remain important.",
      "accessCaveats": [
        "Peterson and Rushford both resolve in Minnesota public-water-access GIS, but DNR Map 1 and the access GIS differ slightly on Rushford river-mile metadata. The route mileage follows DNR Map 1.",
        "Peterson is currently subject to a DNR state-water-trail alert for Mill Street Bridge reconstruction and portage needs once overhead work begins; confirm the access is usable before launching.",
        "Use only the named public accesses and legal trail-town parking. Do not assume private or trail-adjacent banks are routine exits."
      ],
      "watchFor": [
        "Submerged-dam caution areas mapped upstream of Rushford, bridge current, and old structure debris.",
        "Fresh wood, strainers, and fast rises after bluff-country rain.",
        "Cold water outside midsummer, low-water riffles, and private shoreland."
      ]
    },
    "accessPoints": [
      {
        "id": "root-river-peterson-access",
        "name": "Root River, Peterson Public Water Access Site",
        "latitude": 43.7864446,
        "longitude": -91.8274722,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; public-water-access GIS resolves WAS00265 at Peterson, and DNR Map 1 places Peterson carry-in at river mile 38.9."
      },
      {
        "id": "root-river-rushford-access",
        "name": "Root River, Rushford Public Water Access Site",
        "latitude": 43.8030062,
        "longitude": -91.7603553,
        "mileFromStart": 5.1,
        "segmentKind": "creek",
        "note": "Default take-out; public-water-access GIS resolves WAS00264, while DNR Map 1 places Rushford carry-in downstream of Peterson near river mile 33.8."
      }
    ]
  },
  "straight-river-county-road-45-medford": {
    "putIn": {
      "id": "county-road-45-straight-river",
      "name": "Straight River, County Road 45 Public Water Access Site",
      "latitude": 44.1484502,
      "longitude": -93.2438302
    },
    "takeOut": {
      "id": "medford-city-park-straight-river",
      "name": "Straight River, Medford Public Water Access Site",
      "latitude": 44.1775975,
      "longitude": -93.2490711
    },
    "logistics": {
      "distanceLabel": "About 3.7 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr, longer with low water or wood",
      "shuttle": "Stage Medford City Park first, then drive back to the County Road 45 access. This is a short shuttle, but inspect both landings because narrow-river wood or low water can quickly decide whether the route is worth running.",
      "permits": "No route-specific paddling permit is known. Use the named public accesses, follow Minnesota boating/PFD rules, and obey posted Steele County, City of Medford, and DNR access rules.",
      "camping": "No on-route camping is documented for this short Straight River connector. Treat it as a day paddle and use separate lodging or campground plans.",
      "campingClassification": "none",
      "summary": "Launch at County Road 45 and take out at Medford City Park for the short Straight River split below Clinton Falls. Use the downstream Faribault DNR gauge as a conservative proxy and make a visual call at the put-in.",
      "accessCaveats": [
        "County Road 45 resolves as WAS02043 at river mile 20.8 and Medford resolves as WAS02042 at river mile 17.2 in Minnesota public-water-access GIS.",
        "This card starts below the Clinton Falls portage area and ends before the downstream former Walcott Mill Dam / Kroghs route. Do not stretch either direction without a separate plan.",
        "The Faribault gauge is downstream of the selected reach, so local shallow spots or wood at County Road 45 can make the route unsuitable even when the gauge is in the official medium band."
      ],
      "watchFor": [
        "Fresh strainers, narrow bends, shallow riffles, and cold water in shoulder seasons.",
        "Fast rises and pushier current after rain on a small, responsive watershed.",
        "Private banks and road-adjacent access constraints; use only legal public access points."
      ]
    },
    "accessPoints": [
      {
        "id": "county-road-45-straight-river",
        "name": "Straight River, County Road 45 Public Water Access Site",
        "latitude": 44.1484502,
        "longitude": -93.2438302,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; resolves as WAS02043 at river mile 20.8."
      },
      {
        "id": "medford-city-park-straight-river",
        "name": "Straight River, Medford Public Water Access Site",
        "latitude": 44.1775975,
        "longitude": -93.2490711,
        "mileFromStart": 3.7,
        "segmentKind": "creek",
        "note": "Default take-out; resolves as WAS02042 at river mile 17.2."
      }
    ]
  },
  "watonwan-river-madelia-county-road-32": {
    "putIn": {
      "id": "madelia-watonwan",
      "name": "Watonwan River, Madelia Public Water Access Site",
      "latitude": 44.0393631,
      "longitude": -94.4224647
    },
    "takeOut": {
      "id": "county-road-32-watonwan",
      "name": "Watonwan River, County Road 32 Public Water Access Site",
      "latitude": 44.0041578,
      "longitude": -94.2886309
    },
    "logistics": {
      "distanceLabel": "About 12.6 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr, longer in low water",
      "shuttle": "Stage County Road 32 first, then drive back to the Madelia public access. Because the Garden City gauge is downstream and currently below the scrapable floor, inspect the Madelia landing and first riffles before leaving a vehicle.",
      "permits": "No route-specific paddling permit is known. Use the named public accesses, follow Minnesota boating/PFD rules, and obey posted city, county, and DNR access rules.",
      "camping": "No on-route camping is documented for Madelia to County Road 32. Treat this as a day route; the downstream Blue Earth County Fair campground is not part of this selected segment.",
      "campingClassification": "none",
      "summary": "Launch at Madelia and take out at County Road 32 for the upstream Watonwan split above the existing CR32-to-Garden-City cards. Use the downstream Garden City gauge conservatively and expect shallow conditions below the DNR scrapable floor.",
      "accessCaveats": [
        "Madelia resolves as WAS00009 at river mile 47.6 and County Road 32 resolves as WAS00214 at river mile 35.0 in Minnesota public-water-access GIS.",
        "The Garden City gauge is downstream of this route, so it must be paired with visual checks at the Madelia put-in and County Road 32 take-out.",
        "This card ends at County Road 32. Downstream CR32-to-Garden-City route cards are separate plans, and the lower river below Garden City remains affected by the Rapidan Dam failure warning."
      ],
      "watchFor": [
        "Low-water scraping, shallow riffles, muddy banks, and possible dragging when Garden City is below the official scrapable floor.",
        "Occasional snags, fresh farm-country wood, and faster post-rain current even though the Watonwan has no major rapids.",
        "Private banks and limited public exits between Madelia and County Road 32."
      ]
    },
    "accessPoints": [
      {
        "id": "madelia-watonwan",
        "name": "Watonwan River, Madelia Public Water Access Site",
        "latitude": 44.0393631,
        "longitude": -94.4224647,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; resolves as WAS00009 at river mile 47.6."
      },
      {
        "id": "county-road-32-watonwan",
        "name": "Watonwan River, County Road 32 Public Water Access Site",
        "latitude": 44.0041578,
        "longitude": -94.2886309,
        "mileFromStart": 12.6,
        "segmentKind": "creek",
        "note": "Default take-out; resolves as WAS00214 at river mile 35.0."
      }
    ]
  },
  "root-river-preston-lanesboro": {
    "putIn": {
      "id": "root-river-preston-pwa",
      "name": "Root River, Preston Public Water Access Site",
      "latitude": 43.6700585,
      "longitude": -92.0888915
    },
    "takeOut": {
      "id": "root-river-lanesboro-shorefishing-pwa",
      "name": "Root River, Lanesboro Shorefishing Public Water Access Site",
      "latitude": 43.7175077,
      "longitude": -91.9781076
    },
    "logistics": {
      "distanceLabel": "About 14.1 mi",
      "estimatedPaddleTime": "About 5 hr to 7 hr, longer with low water, wood, or campsite stops",
      "shuttle": "Stage the Lanesboro vehicle first, then drive to Preston. Walk the Lanesboro finish and dam-portage area before launching so the group knows where to land and where not to drift.",
      "permits": "No route-specific paddling permit is known. Use the named public accesses, follow Minnesota boating/PFD rules, and obey posted city, DNR, campground, and parking rules.",
      "camping": "DNR Map 1 labels Riverview Campground watercraft campsite above Lanesboro and Sylvan Park watercraft campsite just below the Lanesboro dam portage. Treat camping as a deliberate campsite or town-basecamp plan, not informal private-bank camping.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Preston and finish in Lanesboro for the missing South Branch Root River route above the existing Lanesboro-to-Peterson card. The Lanesboro DNR gauge is inside the take-out corridor and was in the official medium band during this run.",
      "accessCaveats": [
        "Preston and Lanesboro both resolve in Minnesota public-water-access GIS with Root River water-trail mile records and coordinates.",
        "The Lanesboro dam is part of the finish corridor. Identify the access, portage signs, and safe landing before launching.",
        "The gauge is near the lower end of the route; still make a same-day visual depth and wood check at Preston."
      ],
      "watchFor": [
        "Shallow riffles and scrape risk when Lanesboro drops below the medium band.",
        "Fresh sweepers, strainers, and debris after thunderstorms in the smaller South Branch channel.",
        "The Lanesboro dam and portage corridor, especially if the group is tired late in the day.",
        "Private banks and limited rural bailouts outside named public sites and mapped campsites."
      ]
    },
    "accessPoints": [
      {
        "id": "root-river-preston-pwa",
        "name": "Root River, Preston Public Water Access Site",
        "latitude": 43.6700585,
        "longitude": -92.0888915,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; public-water-access GIS resolves WAS00267 at DNR river mile 70.1."
      },
      {
        "id": "riverview-campground-campsite",
        "name": "Riverview Campground watercraft campsite",
        "latitude": 43.7168,
        "longitude": -91.9822,
        "mileFromStart": 13.6,
        "segmentKind": "creek",
        "note": "DNR Map 1 campsite support near river mile 56.5 above the Lanesboro access and dam corridor."
      },
      {
        "id": "root-river-lanesboro-shorefishing-pwa",
        "name": "Root River, Lanesboro Shorefishing Public Water Access Site",
        "latitude": 43.7175077,
        "longitude": -91.9781076,
        "mileFromStart": 14.1,
        "segmentKind": "creek",
        "note": "Default take-out; public-water-access GIS resolves WAS00266 and DNR Map 1 places the Lanesboro access/dam corridor near river mile 56.2."
      }
    ]
  },
  "mississippi-river-iron-bridge-county-road-12-dam": {
    "putIn": {
      "id": "mississippi-river-iron-bridge",
      "name": "Mississippi River, Iron Bridge Public Water Access Site",
      "latitude": 47.43547995293871,
      "longitude": -94.99941150842695
    },
    "takeOut": {
      "id": "mississippi-river-county-road-12-dam",
      "name": "Mississippi River, County Road 12 Public Water Access Site",
      "latitude": 47.48371925901912,
      "longitude": -94.72834186733037
    },
    "logistics": {
      "distanceLabel": "About 22.9 mi",
      "estimatedPaddleTime": "Full day or overnight; add time for lake wind, city bridges, and access checks",
      "shuttle": "Stage County Road 12 first and inspect the dam/portage boundary from shore, then drive back to Iron Bridge. This is a long shuttle and a long paddle; confirm wind, daylight, Wilton, and Stump Lake readings before unloading.",
      "permits": "No route-specific paddling permit is known. Follow Minnesota boating/PFD rules, use DNR public accesses, and obey posted water-trail, dam, portage, city, and campsite rules.",
      "camping": "DNR Map 1 includes watercraft-campsite and broader water-trail camping rules for this headwaters corridor. Treat overnight use as designated/legal campsite use only; do not assume private-bank or riverbed camping.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Iron Bridge and finish at the County Road 12 access beside the Stump Lake gauge and dam/portage boundary. This fills the Map 1 gap between the Iron Bridge card and the existing County-Road-12-to-25 card, but the long lake-transition mileage makes it a serious plan.",
      "accessCaveats": [
        "Iron Bridge resolves in Minnesota public-water-access GIS as WAS00519 at river mile 1300.6 beside the Wilton gauge.",
        "County Road 12 resolves as WAS00096 at river mile 1277.7 beside the Stump Lake gauge and dam/portage boundary.",
        "The route uses Stump Lake as the primary direct finish gauge and Wilton as an upstream same-map context check. If the two readings disagree, make the more conservative same-day call.",
        "County Road 12 is the selected finish. Do not drift into the dam approach or turn this into the downstream County-Road-12-to-25 route unless that separate shuttle and hazard plan is intentional."
      ],
      "watchFor": [
        "Wind and waves on Lake Irving, Lake Bemidji, and Stump Lake; stay close to shore where practical and do not cross big open water in unsafe wind.",
        "Long-route fatigue, city bridges, motorboat wakes, cold water, strainers, floating debris, and private banks.",
        "Low Stump Lake readings below 1.8 ft, or high/rising water above the official medium band when the dam finish and bridge current become less forgiving."
      ]
    },
    "accessPoints": [
      {
        "id": "mississippi-river-iron-bridge",
        "name": "Mississippi River, Iron Bridge Public Water Access Site",
        "latitude": 47.43547995293871,
        "longitude": -94.99941150842695,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at DNR river mile 1300.6 beside the Wilton gauge."
      },
      {
        "id": "mississippi-river-county-road-12-dam",
        "name": "Mississippi River, County Road 12 Public Water Access Site",
        "latitude": 47.48371925901912,
        "longitude": -94.72834186733037,
        "mileFromStart": 22.9,
        "segmentKind": "creek",
        "note": "Default take-out at the Stump Lake gauge and County Road 12 dam/portage boundary."
      }
    ]
  },
  "kettle-river-number-1-number-4": {
    "putIn": {
      "id": "kettle-number-one",
      "name": "Kettle River, #1 Public Water Access Site",
      "latitude": 46.180297166482895,
      "longitude": -92.83211495888368
    },
    "takeOut": {
      "id": "kettle-river-four",
      "name": "Kettle River, #4 Public Water Access Site",
      "latitude": 46.10792047828404,
      "longitude": -92.8637229545714
    },
    "logistics": {
      "distanceLabel": "About 6.2 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr for skilled groups; longer with portages or low water",
      "shuttle": "Stage #4 first, then drive back to the Highway 23 #1 access. Walk the #4 take-out and review the Banning portage plan before launching because this route is intentionally whitewater-filtered.",
      "permits": "No route-specific paddling permit is known. Banning State Park vehicle permits and posted park rules may apply at park accesses; follow Minnesota boating/PFD rules and current DNR access signs.",
      "camping": "Banning State Park and DNR Map 1 document canoe-in/watercraft campsite context in this corridor. Use only legal reservable or designated sites and do not treat informal banks or ledges as campsites.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Kettle River #1 and take out at #4 for the advanced Banning / Sandstone corridor. The Sandstone DNR gauge was far below the official scrapable floor during this run, so this is not a current broad-audience go call.",
      "accessCaveats": [
        "#1, #2, Sandstone, and #4 all resolve in Minnesota public-water-access GIS with DNR river-mile records.",
        "The Sandstone gauge is in the downstream half of the route near the main hazard corridor. It cannot replace scouting the portages, falls, ledges, and wood.",
        "Use #4 as the planned finish below the main Banning hazard corridor. Do not continue downstream unless intentionally using the separate #4-to-#5 card."
      ],
      "watchFor": [
        "Banning Rapids, Big Spring Falls, Sandstone Rapids, undercut-wall current, ledges, cold water, and difficult rescue terrain.",
        "Low water below 800 cfs at Sandstone, when rock contact and dragging dominate and DNR bands score the route below scrapable.",
        "High or rising runoff, when holes, eddies, portage landings, and rescue margins can change quickly."
      ]
    },
    "accessPoints": [
      {
        "id": "kettle-number-one",
        "name": "Kettle River, #1 Public Water Access Site",
        "latitude": 46.180297166482895,
        "longitude": -92.83211495888368,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at Highway 23 and DNR river mile 29.8."
      },
      {
        "id": "kettle-number-two",
        "name": "Kettle River, #2 Public Water Access Site",
        "latitude": 46.16449698847569,
        "longitude": -92.83430247537184,
        "mileFromStart": 1.4,
        "segmentKind": "creek",
        "note": "Banning State Park access and portage/campsite context at DNR river mile 28.4."
      },
      {
        "id": "kettle-sandstone",
        "name": "Kettle River, Sandstone Public Water Access Site",
        "latitude": 46.13311270792839,
        "longitude": -92.85737935445832,
        "mileFromStart": 4.3,
        "segmentKind": "creek",
        "note": "Intermediate access in Sandstone above the Big Spring Falls / Sandstone hazard context."
      },
      {
        "id": "kettle-river-four",
        "name": "Kettle River, #4 Public Water Access Site",
        "latitude": 46.10792047828404,
        "longitude": -92.8637229545714,
        "mileFromStart": 6.2,
        "segmentKind": "creek",
        "note": "Default take-out below the main Banning / Sandstone rapids corridor at DNR river mile 23.6."
      }
    ]
  },
  "mississippi-river-coon-rapids-riverfront": {
    "putIn": {
      "id": "mississippi-river-coon-rapids-dam-access",
      "name": "Mississippi River, Coon Rapids Dam Public Water Access Site",
      "latitude": 45.14702279327111,
      "longitude": -93.31072313786683
    },
    "takeOut": {
      "id": "mississippi-river-riverfront-regional-park",
      "name": "Mississippi River, Anoka County Riverfront Regional Park Public Water Access Site",
      "latitude": 45.06766074908424,
      "longitude": -93.28104994120092
    },
    "logistics": {
      "distanceLabel": "6.1 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr, longer with low water, wind, or island scouting",
      "shuttle": "Stage Riverfront Regional Park first, then drive back to Coon Rapids Dam Regional Park. Confirm the below-dam launch, Hwy 610 reading, and Riverfront take-out before putting on.",
      "permits": "No route-specific paddling permit is known. Follow Minnesota boating/PFD rules and posted Anoka County park, dam, launch, parking, and river-use rules.",
      "camping": "Treat this as a day route. No on-route camping plan is assumed between Coon Rapids Dam Regional Park and Riverfront Regional Park.",
      "campingClassification": "none",
      "summary": "Launch below Coon Rapids Dam and take out at Anoka County Riverfront Regional Park for the official DNR Map 9 metro Mississippi day trip. The Hwy 610 DNR gauge is inside the reach and was in the official low band during this run.",
      "accessCaveats": [
        "Coon Rapids Dam resolves in Minnesota public-water-access GIS as WAS02630 at river mile 863.0. Launch below the dam and obey posted dam-area restrictions.",
        "Riverfront Regional Park resolves as WAS01210 at river mile 860.3 and is the planned take-out before the downstream North Mississippi / Minneapolis corridor.",
        "The Hwy 610 gauge is direct for this reach, but it cannot show same-day debris, bridge turbulence, wake traffic, or water quality after storms."
      ],
      "watchFor": [
        "Swift current below Coon Rapids Dam, bridge approaches, motorboat wakes, floating debris, and urban stormwater after rain.",
        "Durnam Island Rapids Class I near the lower end of the route, especially at low or high water.",
        "Private banks, fishing lines, cold water, and complacency on a short but still pushy metro river reach."
      ]
    },
    "accessPoints": [
      {
        "id": "mississippi-river-coon-rapids-dam-access",
        "name": "Mississippi River, Coon Rapids Dam Public Water Access Site",
        "latitude": 45.14702279327111,
        "longitude": -93.31072313786683,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default below-dam put-in; Minnesota public-water-access GIS resolves WAS02630 at river mile 863.0."
      },
      {
        "id": "mississippi-river-riverfront-regional-park",
        "name": "Mississippi River, Anoka County Riverfront Regional Park Public Water Access Site",
        "latitude": 45.06766074908424,
        "longitude": -93.28104994120092,
        "mileFromStart": 6.1,
        "segmentKind": "creek",
        "note": "Default take-out; Minnesota public-water-access GIS resolves WAS01210 at river mile 860.3."
      }
    ]
  },
  "cloquet-river-indian-lake-bear-lake-road": {
    "putIn": {
      "id": "cloquet-river-indian-lake-access",
      "name": "Cloquet River, Indian Lake Public Water Access Site",
      "latitude": 47.2713978,
      "longitude": -91.8507597
    },
    "takeOut": {
      "id": "cloquet-river-bear-lake-road",
      "name": "Cloquet River, Severson Landing / Bear Lake Road Public Water Access Site",
      "latitude": 47.2079219,
      "longitude": -91.9398991
    },
    "logistics": {
      "distanceLabel": "About 10.3 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr, longer with scouting, portaging, low water, or campsite stops",
      "shuttle": "Stage Bear Lake Road first, then drive back to Indian Lake Access. Confirm the Brimson DNR gauge, Camp G Rapids scouting comfort, and any campsite plan before unloading.",
      "permits": "No route-specific paddling permit is known. Use DNR public accesses, follow Minnesota boating/PFD rules, and obey state water-trail, forest, campsite, and posted access rules.",
      "camping": "DNR Map 2 and the Cloquet segments page identify primitive first-come watercraft campsites on this corridor. Use only designated/legal public sites and do not assume private-bank camping.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Indian Lake and take out at Bear Lake Road for the official DNR Map 2 day trip. The Brimson DNR gauge was in the official low band during this run, below preferred medium water, so expect shallow rock in places.",
      "accessCaveats": [
        "Indian Lake resolves in Minnesota public-water-access GIS as WAS01629 at DNR river mile 71.8.",
        "Severson Landing / Bear Lake Road resolves as WAS01633 at DNR river mile 61.5.",
        "Camp G Rapids is mapped as Class II with a portage option; inspect from shore and portage if the line, wood, or level is not appropriate for the group."
      ],
      "watchFor": [
        "Class I-II rapids, Camp G Rapids, portages, exposed rocks, and shallow riffles at low Brimson stages.",
        "Fast rises after rain, fresh wood, strainers, cold water, and limited road access between landings.",
        "Private shoreland away from DNR accesses and designated/legal watercraft campsites."
      ]
    },
    "accessPoints": [
      {
        "id": "cloquet-river-indian-lake-access",
        "name": "Cloquet River, Indian Lake Public Water Access Site",
        "latitude": 47.2713978,
        "longitude": -91.8507597,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; resolves as WAS01629 at DNR river mile 71.8."
      },
      {
        "id": "cloquet-river-bear-lake-road",
        "name": "Cloquet River, Severson Landing / Bear Lake Road Public Water Access Site",
        "latitude": 47.2079219,
        "longitude": -91.9398991,
        "mileFromStart": 10.3,
        "segmentKind": "creek",
        "note": "Default take-out; resolves as WAS01633 at DNR river mile 61.5."
      }
    ]
  },
  "mississippi-river-itasca-coffee-pot-landing": {
    "putIn": {
      "id": "lake-itasca-public-water-access",
      "name": "Lake Itasca Public Water Access Site",
      "latitude": 47.2337901,
      "longitude": -95.1983589
    },
    "takeOut": {
      "id": "mississippi-river-coffee-pot-landing",
      "name": "Mississippi River, Coffee Pot Landing Public Water Access Site",
      "latitude": 47.3492223,
      "longitude": -95.1830624
    },
    "logistics": {
      "distanceLabel": "About 15.4 mi",
      "estimatedPaddleTime": "About 5 hr to 8 hr depending on current, wind, wood, and headwaters obstacles",
      "shuttle": "Stage Coffee Pot Landing first, then return to Lake Itasca. Decide before launch whether Gulsvig Landing is an early alternate start or bailout, and inspect low bridge, culvert, and wood conditions when water is high or storm-driven.",
      "permits": "No route-specific paddling permit is known. Follow Itasca State Park, MN DNR public-water-access, and Minnesota boating/PFD rules, including any park vehicle or launch requirements.",
      "camping": "Treat this as a long day route with nearby basecamp options, not an assumed on-route overnight. Itasca State Park camping can support a trip plan if separately reserved or permitted; do not camp on private banks or rest stops unless current rules explicitly allow it.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Lake Itasca and take out at Coffee Pot Landing for the official DNR headwaters day. The Vern gauge sits inside the route and was in the official medium band during this run.",
      "accessCaveats": [
        "Lake Itasca resolves in Minnesota public-water-access GIS as WAS02379 at DNR river mile 1341.6.",
        "Gulsvig Landing resolves as WAS02375 at river mile 1340.4 and can be a practical early access check, but this card follows the DNR Lake Itasca-to-Coffee-Pot recommendation.",
        "Coffee Pot Landing resolves as WAS00730 at DNR river mile 1326.2; confirm parking and landing conditions before committing to the long headwaters shuttle."
      ],
      "watchFor": [
        "Log jams, beaver dams, shallow riffles, and route-finding in the narrow headwaters channel.",
        "Road culverts at high water, Vekin's Dam, County Road Two Class I challenge points, and cold-water exposure.",
        "Private banks and limited bailout options between public accesses."
      ]
    },
    "accessPoints": [
      {
        "id": "lake-itasca-public-water-access",
        "name": "Lake Itasca Public Water Access Site",
        "latitude": 47.2337901,
        "longitude": -95.1983589,
        "mileFromStart": 0,
        "segmentKind": "lake",
        "note": "Default put-in; resolves as WAS02379 at DNR river mile 1341.6."
      },
      {
        "id": "mississippi-river-gulsvig-landing",
        "name": "Mississippi River, Gulsvig Landing Public Water Access Site",
        "latitude": 47.2537044,
        "longitude": -95.2252208,
        "mileFromStart": 1.2,
        "segmentKind": "creek",
        "note": "Optional early access; resolves as WAS02375 at DNR river mile 1340.4."
      },
      {
        "id": "mississippi-river-coffee-pot-landing",
        "name": "Mississippi River, Coffee Pot Landing Public Water Access Site",
        "latitude": 47.3492223,
        "longitude": -95.1830624,
        "mileFromStart": 15.4,
        "segmentKind": "creek",
        "note": "Default take-out; resolves as WAS00730 at DNR river mile 1326.2."
      }
    ]
  },
  "red-river-golden-grain-hilltop": {
    "putIn": {
      "id": "red-river-golden-grain",
      "name": "Red River, Golden Grain Public Water Access Site",
      "latitude": 48.7878739,
      "longitude": -97.1570258
    },
    "takeOut": {
      "id": "red-river-hilltop",
      "name": "Red River, Hilltop Public Water Access Site",
      "latitude": 48.8427795,
      "longitude": -97.1738549
    },
    "logistics": {
      "distanceLabel": "About 9 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr depending on current, wind, and muddy landing conditions",
      "shuttle": "Stage Hilltop first, then drive south to Golden Grain. Confirm both trailer accesses and the Drayton DNR gauge before unloading, because low water can make the Red too shallow and high water can make banks difficult.",
      "permits": "No route-specific paddling permit is known. Follow Minnesota boating/PFD rules, Red River state-water-trail guidance, posted local access rules, and current border-river regulations.",
      "camping": "Treat this as a day trip. DNR notes nearby camping and picnic options on the broader Map 6 corridor, but no on-route public overnight site was selected for Golden Grain to Hilltop.",
      "campingClassification": "none",
      "summary": "Launch at Golden Grain and take out at Hilltop for the official DNR 9-mile Map 6 day trip. The upstream Drayton DNR gauge was in the official medium band during this run.",
      "accessCaveats": [
        "Golden Grain resolves in Minnesota public-water-access GIS as WAS00531 at DNR river mile 180.2.",
        "Hilltop resolves as WAS03009 near DNR river mile 171.2; DNR web guidance lists Hilltop as the take-out for the 9-mile trip.",
        "The Drayton gauge is upstream of the route. Treat it as same-map official guidance, then verify muddy bank slope, wind, and landing depth at both endpoints."
      ],
      "watchFor": [
        "Snags, muddy banks, poor underwater visibility, shallow bars at low water, and difficult landings during high water.",
        "Flooding, fast rises, strong current around outside bends, wind exposure, and cold water.",
        "Private shoreline, rural rescue exposure, and border-river rules if plans extend beyond the mapped day route."
      ]
    },
    "accessPoints": [
      {
        "id": "red-river-golden-grain",
        "name": "Red River, Golden Grain Public Water Access Site",
        "latitude": 48.7878739,
        "longitude": -97.1570258,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; resolves as WAS00531 at DNR river mile 180.2."
      },
      {
        "id": "red-river-hilltop",
        "name": "Red River, Hilltop Public Water Access Site",
        "latitude": 48.8427795,
        "longitude": -97.1738549,
        "mileFromStart": 9,
        "segmentKind": "creek",
        "note": "Default take-out; resolves as WAS03009 near DNR river mile 171.2."
      }
    ]
  },
  "zumbro-river-zumbro-falls-hammond": {
    "putIn": {
      "id": "zumbro-falls-access",
      "name": "Zumbro River, Zumbro Falls Public Water Access Site",
      "latitude": 44.27977688739134,
      "longitude": -92.42343276302006
    },
    "takeOut": {
      "id": "hammond-village-park",
      "name": "Zumbro River, Hammond Village Park Public Water Access Site",
      "latitude": 44.22123656225855,
      "longitude": -92.36906091069403
    },
    "logistics": {
      "distanceLabel": "7.0 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, longer with low water or wood scouting",
      "shuttle": "Stage Hammond Village Park first, then drive back to the Zumbro Falls public access. The highway parallels the route, but use only signed public accesses or legal stops.",
      "permits": "No route-specific paddling permit is known. Use the MN DNR water-trail accesses, follow Minnesota boating/PFD rules, and obey posted city or DNR access rules.",
      "camping": "Treat this as a day trip. DNR points to Kruger and Zumbro Bottoms campground units farther downstream, but this Zumbro Falls-to-Hammond split does not include an on-route campsite.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Zumbro Falls and finish at Hammond Village Park for the missing upper half of the DNR Map 2 Zumbro day-trip chain. The direct Zumbro Falls DNR gauge is current, but today is below the preferred medium band.",
      "accessCaveats": [
        "Zumbro Falls and Hammond are both source-backed public accesses, but same-day parking, ramp, and storm-cleanup conditions still matter.",
        "Do not use roadside shoulders, farm banks, or private crossings as assumed exits just because the highway follows the river.",
        "This is upstream of the existing Hammond-to-Theilman card; do not continue downstream without daylight, shuttle, and gauge margin for the longer route."
      ],
      "watchFor": [
        "Low-water scraping below the official medium band on the Zumbro Falls gauge.",
        "Fast rises, fresh strainers, logs, snags, and pushier riffles after thunderstorms.",
        "Cold water in shoulder seasons and private banks between the named public accesses."
      ]
    },
    "accessPoints": [
      {
        "id": "zumbro-falls-access",
        "name": "Zumbro River, Zumbro Falls Public Water Access Site",
        "latitude": 44.27977688739134,
        "longitude": -92.42343276302006,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; Minnesota public-water-access GIS resolves WAS02916 at DNR river mile 46.1."
      },
      {
        "id": "hammond-village-park",
        "name": "Zumbro River, Hammond Village Park Public Water Access Site",
        "latitude": 44.22123656225855,
        "longitude": -92.36906091069403,
        "mileFromStart": 7,
        "segmentKind": "creek",
        "note": "Default take-out; Minnesota public-water-access GIS resolves WAS00253 at DNR river mile 38.2."
      }
    ]
  },
  "mississippi-river-fort-ripley-fletcher-creek": {
    "putIn": {
      "id": "fort-ripley-landing",
      "name": "Mississippi River, Fort Ripley Landing Public Water Access Site",
      "latitude": 46.1794922958068,
      "longitude": -94.36486833176791
    },
    "takeOut": {
      "id": "fletcher-creek-trailer-access",
      "name": "Fletcher Creek Trailer Access",
      "latitude": 46.0651,
      "longitude": -94.3363
    },
    "logistics": {
      "distanceLabel": "9.6 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr, longer with low water, wind, or island-channel checks",
      "shuttle": "Stage Fletcher Creek first and confirm the take-out before driving back to Fort Ripley Landing. Do not launch if the Fletcher Creek landing, parking, or signage cannot be verified on arrival.",
      "permits": "No route-specific paddling permit is known. Use the DNR-supported public accesses, follow Minnesota boating/PFD rules, and respect Camp Ripley, private-bank, and posted access restrictions.",
      "camping": "Treat this as a day trip. Crow Wing State Park and other nearby campgrounds can support a basecamp, but no on-route camping is assumed between Fort Ripley and Fletcher Creek.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Fort Ripley and take out at Fletcher Creek for MN DNR Map 6 recommended central-Mississippi mileage below Camp Ripley. The route uses the Brainerd interpreted gauge as an upstream same-corridor proxy plus same-day landing checks.",
      "accessCaveats": [
        "Fort Ripley resolves in Minnesota public-water-access GIS. Fletcher Creek is named by DNR water-trail and county public-access materials, but the coordinate used here is from a paddling-access directory rather than the current GIS feature-service query.",
        "Camp Ripley Training Center access is not allowed from the Mississippi or Crow Wing rivers; do not treat military shoreline as a bailout or stop.",
        "Do not extend toward Little Falls without a separate route plan and dam review."
      ],
      "watchFor": [
        "Late-summer shallows and slow riffles when the Brainerd gauge is low.",
        "Islands, backwaters, wind, floating wood, storm debris, cold water, and private banks.",
        "Proxy-gauge mismatch from local rain, tributary inflow, or access changes between Brainerd, Fort Ripley, and Fletcher Creek."
      ]
    },
    "accessPoints": [
      {
        "id": "fort-ripley-landing",
        "name": "Mississippi River, Fort Ripley Landing Public Water Access Site",
        "latitude": 46.1794922958068,
        "longitude": -94.36486833176791,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; Minnesota public-water-access GIS resolves WAS01026 at DNR river mile 982.3."
      },
      {
        "id": "fletcher-creek-trailer-access",
        "name": "Fletcher Creek Trailer Access",
        "latitude": 46.0651,
        "longitude": -94.3363,
        "mileFromStart": 9.6,
        "segmentKind": "creek",
        "note": "Default take-out named by MN DNR Map 6; verify signage and parking because coordinates are from a paddling-access directory."
      }
    ]
  },
  "mississippi-river-sandy-lake-wolds-ferry": {
    "putIn": {
      "id": "sandy-river-dam-access",
      "name": "Sandy River Dam / Sandy Lake Recreation Area Public Water Access Site",
      "latitude": 46.78631874695744,
      "longitude": -93.32156252290518
    },
    "takeOut": {
      "id": "wolds-ferry-crossing",
      "name": "Mississippi River, Wold's Ferry Crossing Public Water Access Site",
      "latitude": 46.74673080617531,
      "longitude": -93.39734256533568
    },
    "logistics": {
      "distanceLabel": "9.5 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr, longer with low water, wind, or campsite stops",
      "shuttle": "Stage Wold's Ferry Crossing first, then drive back to Sandy Lake Recreation Area / Sandy River Dam. Expect about one mile from the launch to the Mississippi before the main river mileage begins.",
      "permits": "No route-specific paddling permit is known. Follow Minnesota boating/PFD rules, Sandy Lake Recreation Area rules, DNR water-trail access rules, and any posted camping or day-use requirements.",
      "camping": "Sandy Lake Recreation Area offers fee camping, and DNR identifies Scott's Rapid Campsite on the route if unoccupied. Use only legal designated sites and do not camp on private banks or riverbed areas next to private property.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch from Sandy River Dam / Sandy Lake Recreation Area and take out at Wold's Ferry for the DNR Map 4 recommended headwaters day trip. Current Aitkin-gauge scoring is below scrapable, so same-day visual checks should control.",
      "accessCaveats": [
        "The put-in is on the Sandy River at Sandy Lake Recreation Area, not directly on the Mississippi mainstem.",
        "Wold's Ferry is the planned finish. Do not continue toward downstream diversion-channel or Aitkin hazards unless using a separate, reviewed route.",
        "Scott's Rapid Campsite is first-come / availability-dependent context, not a guarantee that an overnight plan will work."
      ],
      "watchFor": [
        "Very low water below the Aitkin scrapable floor, especially in the Sandy River lead-in and riffle zones.",
        "Snags, downed trees, private banks, floating debris, high or rising water, cold water, and wind on wider bends.",
        "Campground and launch crowding at Sandy Lake Recreation Area during peak summer weekends."
      ]
    },
    "accessPoints": [
      {
        "id": "sandy-river-dam-access",
        "name": "Sandy River Dam / Sandy Lake Recreation Area Public Water Access Site",
        "latitude": 46.78631874695744,
        "longitude": -93.32156252290518,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; Minnesota public-water-access GIS resolves WAS02110 at DNR Mississippi river mile 1105.3."
      },
      {
        "id": "wolds-ferry-crossing",
        "name": "Mississippi River, Wold's Ferry Crossing Public Water Access Site",
        "latitude": 46.74673080617531,
        "longitude": -93.39734256533568,
        "mileFromStart": 9.5,
        "segmentKind": "creek",
        "note": "Default take-out; Minnesota public-water-access GIS resolves WAS02563 at DNR river mile 1096.0."
      }
    ]
  },
  "mississippi-river-coffee-pot-bear-den": {
    "putIn": {
      "id": "mississippi-river-coffee-pot-landing",
      "name": "Mississippi River, Coffee Pot Landing Public Water Access Site",
      "latitude": 47.34922231604911,
      "longitude": -95.18306240194006
    },
    "takeOut": {
      "id": "mississippi-river-bear-den",
      "name": "Mississippi River, Bear Den Public Water Access Site",
      "latitude": 47.42347904252798,
      "longitude": -95.10360401440907
    },
    "logistics": {
      "distanceLabel": "14.8 mi",
      "estimatedPaddleTime": "About 5 hr to 7 hr, longer with low water, vegetation, or campsite stops",
      "shuttle": "Stage Bear Den first, then drive back to Coffee Pot Landing. Identify Bear Den from the DNR access road before launching because public exits are sparse between the named landings.",
      "permits": "No route-specific paddling permit is known. Follow Minnesota boating/PFD rules, use MN DNR water-trail accesses, and obey posted campsite and access rules.",
      "camping": "Coffee Pot Landing and Brownie are mapped DNR watercraft campsite options in this corridor. Use only legal designated sites, confirm availability, and do not camp on riverbed areas next to private property.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Coffee Pot Landing and finish at Bear Den for a long upper-Mississippi headwaters day through wetland channels and Stumphges Rapids. Use Wilton as a downstream same-map DNR gauge proxy and make same-day vegetation and wood checks.",
      "accessCaveats": [
        "Coffee Pot and Bear Den are both DNR-administered public accesses in the Minnesota public-water-access layer, but the landings are rural and should be checked before the shuttle is committed.",
        "The reach passes through a large wetland area where vegetation can obscure the best channel. Do not shortcut across private banks or side channels just because the river looks braided.",
        "Bear Den is the planned finish. Continuing to Iron Bridge is a separate route with a different shuttle and gauge relationship."
      ],
      "watchFor": [
        "Aquatic vegetation obstructions, log jams, dense wetland channels, cold water, and private shoreland.",
        "Stumphges Rapids Class I in low or wood-affected conditions.",
        "High or rising water, when finding the main channel and landing cleanly can become harder."
      ]
    },
    "accessPoints": [
      {
        "id": "mississippi-river-coffee-pot-landing",
        "name": "Mississippi River, Coffee Pot Landing Public Water Access Site",
        "latitude": 47.34922231604911,
        "longitude": -95.18306240194006,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; Minnesota public-water-access GIS resolves WAS00730 at DNR river mile 1326.2."
      },
      {
        "id": "mississippi-river-bear-den",
        "name": "Mississippi River, Bear Den Public Water Access Site",
        "latitude": 47.42347904252798,
        "longitude": -95.10360401440907,
        "mileFromStart": 14.8,
        "segmentKind": "creek",
        "note": "Default take-out; Minnesota public-water-access GIS resolves WAS02254 at DNR river mile 1311.4."
      }
    ]
  },
  "mississippi-river-bear-den-iron-bridge": {
    "putIn": {
      "id": "mississippi-river-bear-den",
      "name": "Mississippi River, Bear Den Public Water Access Site",
      "latitude": 47.42347904252798,
      "longitude": -95.10360401440907
    },
    "takeOut": {
      "id": "mississippi-river-iron-bridge",
      "name": "Mississippi River, Iron Bridge Public Water Access Site",
      "latitude": 47.43547995293871,
      "longitude": -94.99941150842695
    },
    "logistics": {
      "distanceLabel": "10.8 mi",
      "estimatedPaddleTime": "About 3.5 hr to 5.5 hr, longer with wind, low water, or campsite stops",
      "shuttle": "Stage Iron Bridge first, then drive back to Bear Den. Confirm the bridge/gauge take-out and parking before committing because downstream continuation enters different Bemidji-area water-trail planning.",
      "permits": "No route-specific paddling permit is known. Follow Minnesota boating/PFD rules, use MN DNR public accesses, and obey posted access and watercraft-campsite rules.",
      "camping": "Fox Trap, Pine Point, and Iron Bridge are mapped watercraft campsite contexts on or near this connector. Use only legal designated sites if available, and keep the normal plan as a day trip unless camping is confirmed.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Bear Den and take out at Iron Bridge for the lower Map 1 headwaters connector to the Wilton DNR gauge. This is mostly easy water, but wetland vegetation, wood, private banks, and the mandatory bridge take-out still matter.",
      "accessCaveats": [
        "Bear Den and Iron Bridge are DNR-administered public accesses in the Minnesota public-water-access layer.",
        "Pine Point is a mapped intermediate carry-in/campsite access, but use it only if current signs, landing condition, and site availability are clear.",
        "Iron Bridge is the planned finish at the gauge. Do not turn this into a lake-transition or Bemidji route without separate route review."
      ],
      "watchFor": [
        "Aquatic vegetation obstructions from the lower wetland reach into Iron Bridge.",
        "Fresh strainers, cold water, bridge current, and private shoreland outside named public access or campsite areas.",
        "High water above the official Wilton medium band, when landing and wood avoidance become less forgiving."
      ]
    },
    "accessPoints": [
      {
        "id": "mississippi-river-bear-den",
        "name": "Mississippi River, Bear Den Public Water Access Site",
        "latitude": 47.42347904252798,
        "longitude": -95.10360401440907,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; Minnesota public-water-access GIS resolves WAS02254 at DNR river mile 1311.4."
      },
      {
        "id": "mississippi-river-pine-point",
        "name": "Mississippi River, Pine Point Landing Public Water Access Site",
        "latitude": 47.42846977411731,
        "longitude": -95.06990663377715,
        "mileFromStart": 3.6,
        "segmentKind": "creek",
        "note": "Mapped DNR carry-in and watercraft campsite area near river mile 1307.8."
      },
      {
        "id": "mississippi-river-iron-bridge",
        "name": "Mississippi River, Iron Bridge Public Water Access Site",
        "latitude": 47.43547995293871,
        "longitude": -94.99941150842695,
        "mileFromStart": 10.8,
        "segmentKind": "creek",
        "note": "Default take-out; Minnesota public-water-access GIS resolves WAS00519 at DNR river mile 1300.6 beside the Wilton gauge."
      }
    ]
  },
  "mississippi-river-county-road-12-dam-county-road-25": {
    "putIn": {
      "id": "mississippi-river-county-road-12-dam",
      "name": "Mississippi River, County Road 12 Public Water Access Site",
      "latitude": 47.48371925901912,
      "longitude": -94.72834186733037
    },
    "takeOut": {
      "id": "mississippi-river-county-road-25",
      "name": "Mississippi River, County Road 25 Public Water Access Site",
      "latitude": 47.44696630535304,
      "longitude": -94.71763994813507
    },
    "logistics": {
      "distanceLabel": "3.8 mi",
      "estimatedPaddleTime": "About 1.5 hr to 2.5 hr, longer with scouting, low water, or campsite use",
      "shuttle": "Stage County Road 25 first, then return to the County Road 12 access. Launch below the dam/portage boundary and confirm the short take-out before putting on.",
      "permits": "No route-specific paddling permit is known. Follow Minnesota boating/PFD rules, use MN DNR public accesses, and obey posted dam, portage, and campsite rules.",
      "camping": "Island Point is a mapped watercraft campsite inside this short reach, but this should usually be treated as a short day trip. Use the campsite only if legal, available, and appropriate for a confirmed overnight plan.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch below the County Road 12 Dam and take out at County Road 25 for a compact Map 1 Mississippi headwaters route. The direct Stump Lake gauge is current and in medium, but dam discipline and Island Point Rapids scouting are the go/no-go details.",
      "accessCaveats": [
        "The put-in is at the County Road 12 Dam access and gauge. Do not launch upstream of the dam or treat the portage approach as casual water.",
        "County Road 25 is the required take-out for this card. Missing it changes the route into a separate downstream lake/river transition plan.",
        "Both endpoints resolve as DNR-administered public accesses, but parking and landing condition should still be checked before leaving the shuttle vehicle."
      ],
      "watchFor": [
        "Dam-adjacent current and wrong-side launch choices at County Road 12.",
        "Island Point Rapids Class I, shallow rock at low water, bridge current, fresh wood, cold water, and private banks.",
        "High or rising Stump Lake readings, when the dam boundary and short take-out become less forgiving."
      ]
    },
    "accessPoints": [
      {
        "id": "mississippi-river-county-road-12-dam",
        "name": "Mississippi River, County Road 12 Public Water Access Site",
        "latitude": 47.48371925901912,
        "longitude": -94.72834186733037,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at the DNR access, gauge, and dam portage boundary; launch below the hazard."
      },
      {
        "id": "mississippi-river-county-road-25",
        "name": "Mississippi River, County Road 25 Public Water Access Site",
        "latitude": 47.44696630535304,
        "longitude": -94.71763994813507,
        "mileFromStart": 3.8,
        "segmentKind": "creek",
        "note": "Default take-out; Minnesota public-water-access GIS resolves WAS00729 at DNR river mile 1273.9."
      }
    ]
  },
  "red-river-north-dam-mb-johnson": {
    "putIn": {
      "id": "red-river-north-dam-carry-in",
      "name": "North Dam carry-in access / re-entry",
      "latitude": 46.8919,
      "longitude": -96.785
    },
    "takeOut": {
      "id": "red-river-mb-johnson-park",
      "name": "M.B. Johnson Park trailer access",
      "latitude": 46.91389,
      "longitude": -96.7577
    },
    "logistics": {
      "distanceLabel": "3.1 mi",
      "estimatedPaddleTime": "About 1.5 hr to 3 hr, depending on current, wind, and dam-area launch discipline",
      "shuttle": "Stage M.B. Johnson Park first, then return to the North Dam carry-in/re-entry. Confirm the Fargo DNR gauge and walk the launch area before unloading because the route begins around a dam/constructed-rock-rapids context.",
      "permits": "No route-specific paddling permit is known. Follow Minnesota and North Dakota boating/PFD rules, posted Fargo-Moorhead park and launch rules, and current border-river regulations.",
      "camping": "Treat this as a day route. M.B. Johnson Park provides route support, but no on-route public overnight campsite is selected for this short Fargo-Moorhead segment.",
      "campingClassification": "none",
      "summary": "Launch below the Fargo North Dam carry-in/re-entry and take out at M.B. Johnson Park for the official short DNR Map 2 Red River trip. The direct Fargo DNR gauge was in the official medium band during this run.",
      "accessCaveats": [
        "North Dam is a DNR-mapped carry-in/re-entry by river mile rather than a Minnesota public-water-access GIS record; use posted signs and the legal launch path on arrival.",
        "M.B. Johnson Park is the planned finish. Do not continue casually toward downstream dams or private banks without a separate route plan.",
        "The Fargo gauge is direct for the metro reach, but it cannot show same-day snags, muddy landing slope, urban stormwater, or dam-area turbulence."
      ],
      "watchFor": [
        "The North Dam / constructed rock-slopeway context; portage or avoid dam hydraulics unless the group has appropriate whitewater skill and current local guidance.",
        "Snags, muddy banks, poor underwater visibility, bridge current, and faster water after rain or flood releases.",
        "Border-river rules, private banks, cold water, and urban water quality after storms."
      ]
    },
    "accessPoints": [
      {
        "id": "red-river-north-dam-carry-in",
        "name": "North Dam carry-in access / re-entry",
        "latitude": 46.8919,
        "longitude": -96.785,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "DNR Map 2 names the carry-in/re-entry at river mile 455.2; coordinate is a practical map anchor for the named access."
      },
      {
        "id": "red-river-mb-johnson-park",
        "name": "M.B. Johnson Park trailer access",
        "latitude": 46.91389,
        "longitude": -96.7577,
        "mileFromStart": 3.1,
        "segmentKind": "creek",
        "note": "Default take-out at DNR Map 2 river mile 452.1 with public park boat-ramp context."
      }
    ]
  },
  "red-river-lincoln-drive-lafave": {
    "putIn": {
      "id": "red-river-lincoln-drive-park-landing",
      "name": "Lincoln Drive Park Landing",
      "latitude": 47.9137,
      "longitude": -97.0497
    },
    "takeOut": {
      "id": "red-river-lafave-park",
      "name": "Red River, LaFave Park Public Water Access Site",
      "latitude": 47.92502184090726,
      "longitude": -97.02456598825147
    },
    "logistics": {
      "distanceLabel": "2.0 mi",
      "estimatedPaddleTime": "About 45 min to 2 hr, depending on current, wind, and landing conditions",
      "shuttle": "Stage LaFave Park in East Grand Forks first, then return to Lincoln Drive Park Landing. Because this is short, inspect both muddy-bank exits and the Grand Forks DNR gauge before putting on.",
      "permits": "No route-specific paddling permit is known. Follow Minnesota and North Dakota boating/PFD rules plus posted Grand Forks, East Grand Forks, Greenway, and launch rules.",
      "camping": "Treat this as a day route. Red River State Recreation Area and nearby campgrounds can support a separate basecamp plan, but this two-mile card does not assume an on-route overnight.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Lincoln Drive Park Landing and take out at LaFave Park for the official DNR Map 4 Grand Forks / East Grand Forks connector. The direct Grand Forks DNR gauge was in the official medium band during this run.",
      "accessCaveats": [
        "Lincoln Drive Park Landing is DNR-mapped and corroborated by Grand Forks park/visitor sources, but it is on the North Dakota bank and not represented in Minnesota public-water-access GIS.",
        "LaFave Park resolves in Minnesota public-water-access GIS as WAS00545 and is the selected downstream finish.",
        "Do not substitute steep Greenway banks or private edges for the planned take-out, especially when the Red is high, muddy, or recently flooded."
      ],
      "watchFor": [
        "Snags, flood debris, muddy bank footing, poor underwater visibility, bridge current, and fast rises after rain.",
        "Urban water quality after storms and colder-than-expected big-river water in shoulder seasons.",
        "Border-river rules and the need to keep the short route from turning into an unplanned downstream extension."
      ]
    },
    "accessPoints": [
      {
        "id": "red-river-lincoln-drive-park-landing",
        "name": "Lincoln Drive Park Landing",
        "latitude": 47.9137,
        "longitude": -97.0497,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "DNR Map 4 names the trailer access at river mile 304.1; local park/visitor sources corroborate the boat-ramp context."
      },
      {
        "id": "red-river-lafave-park",
        "name": "Red River, LaFave Park Public Water Access Site",
        "latitude": 47.92502184090726,
        "longitude": -97.02456598825147,
        "mileFromStart": 2,
        "segmentKind": "creek",
        "note": "Default take-out; Minnesota public-water-access GIS resolves WAS00545 at LaFave Park."
      }
    ]
  },
  "minnesota-river-kinney-skalbekken": {
    "putIn": {
      "id": "minnesota-river-kinney-access",
      "name": "Minnesota River, Kinney Public Water Access Site",
      "latitude": 44.77412842638547,
      "longitude": -95.53125591590408
    },
    "takeOut": {
      "id": "minnesota-river-skalbekken-access",
      "name": "Minnesota River, Skalbekken Public Water Access Site",
      "latitude": 44.73173490904201,
      "longitude": -95.41945341268442
    },
    "logistics": {
      "distanceLabel": "9.2 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr, longer with low water, wind, campsite stops, or wood scouting",
      "shuttle": "Stage Skalbekken County Park first, then drive back to Kinney Access. Confirm the Morton DNR gauge, walk the Skalbekken take-out, and decide whether Fredrickson is a bailout before launching.",
      "permits": "No route-specific paddling permit is known. Use DNR public accesses, follow Minnesota boating/PFD rules, and obey county park, water-trail, and campsite rules.",
      "camping": "DNR Map 3 identifies Knutson Island watercraft campsite on the route and rustic camping at Skalbekken County Park. Use only legal designated or currently allowed sites and do not assume private-bank camping.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Kinney and take out at Skalbekken County Park for MN DNR Map 3 recommended mileage above the Vicksburg rapid sequence. The downstream Morton DNR gauge was in the official low band, just below medium, during this run.",
      "accessCaveats": [
        "Kinney, Fredrickson, and Skalbekken all resolve in Minnesota public-water-access GIS with source-backed coordinates and river-mile records.",
        "The Morton gauge is downstream of the selected route. It is the official interpreted same-map gauge, but local tributary inflow, mud, wind, and wood still need same-day checks.",
        "Skalbekken is the selected finish. Do not continue toward Vicksburg or Morton without a separate rapid/campsite/distance plan."
      ],
      "watchFor": [
        "Low-water shoals and muddy exits when the Morton gauge is low or near the scrapable floor.",
        "Floating wood, strainers, faster current around the Yellow Medicine River and Hawk Creek confluences, private banks, and rural rescue spacing.",
        "Occupied or unavailable designated campsites; keep an overnight backup rather than camping informally on private shore."
      ]
    },
    "accessPoints": [
      {
        "id": "minnesota-river-kinney-access",
        "name": "Minnesota River, Kinney Public Water Access Site",
        "latitude": 44.77412842638547,
        "longitude": -95.53125591590408,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; Minnesota public-water-access GIS resolves WAS00694 at DNR river mile 233.7."
      },
      {
        "id": "minnesota-river-fredrickson-access",
        "name": "Minnesota River, Fredrickson Public Water Access Site",
        "latitude": 44.768186746779094,
        "longitude": -95.49319939569725,
        "mileFromStart": 3.1,
        "segmentKind": "creek",
        "note": "Intermediate public access and bailout; Minnesota public-water-access GIS resolves WAS01021 near DNR river mile 230.6."
      },
      {
        "id": "minnesota-river-skalbekken-access",
        "name": "Minnesota River, Skalbekken Public Water Access Site",
        "latitude": 44.73173490904201,
        "longitude": -95.41945341268442,
        "mileFromStart": 9.2,
        "segmentKind": "creek",
        "note": "Default take-out at Skalbekken County Park; Minnesota public-water-access GIS resolves WAS00685 near DNR river mile 224.4."
      }
    ]
  },
  "mississippi-river-knutson-dam-west-winnie": {
    "putIn": {
      "id": "mississippi-knutson-dam-access",
      "name": "Mississippi River, Knutson Dam Public Water Access Site",
      "latitude": 47.449798598206435,
      "longitude": -94.48297431425372
    },
    "takeOut": {
      "id": "lake-winnibigoshish-west-access",
      "name": "Lake Winnibigoshish (W) Public Water Access Site / West Winnie Campground",
      "latitude": 47.42741895314589,
      "longitude": -94.3153374059751
    },
    "logistics": {
      "distanceLabel": "11.8 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr, longer with wind, shoreline holds, or campsite stops",
      "shuttle": "Stage West Winnie first, then drive to Bimijiwan / Knutson Dam Recreation Area. Check the Days High Landing DNR gauge and the same-day wind forecast before launching because the finish includes a Lake Winnibigoshish shoreline leg.",
      "permits": "No route-specific paddling permit is known. Use the DNR public accesses, follow Minnesota boating/PFD rules, and obey Chippewa National Forest / campground / water-trail signage.",
      "camping": "DNR Map 2 shows West Winnie Campground and nearby designated camping context. Use only designated or otherwise legal sites and do not assume private-bank or lakeshore camping.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch below Bimijiwan / Knutson Dam and paddle the official DNR day trip through Mississippi Meadows to West Winnie Campground. The route links quiet headwaters channel with big-lake edge exposure, so wind and dam context matter as much as gauge height.",
      "accessCaveats": [
        "Knutson Dam resolves in Minnesota public-water-access GIS as WAS02961 at DNR river mile 1258.1.",
        "Big Fish access is an optional intermediate / bailout point, not the default take-out.",
        "West Winnie resolves in Minnesota public-water-access GIS as WAS00969 at river mile 1246.4 and is the planned finish."
      ],
      "watchFor": [
        "Dam and former-dam / short-rapid context around the upstream recreation areas.",
        "Wind, waves, cold water, and poor visibility on Lake Winnibigoshish; stay close to shore and avoid crossings.",
        "Strainers, private shoreline, occupied campsites, and remote rescue spacing."
      ]
    },
    "accessPoints": [
      {
        "id": "mississippi-knutson-dam-access",
        "name": "Mississippi River, Knutson Dam Public Water Access Site",
        "latitude": 47.449798598206435,
        "longitude": -94.48297431425372,
        "mileFromStart": 0,
        "segmentKind": "transition",
        "note": "Default put-in at the DNR/USFS Bimijiwan-Knutson Dam access area below the dam context."
      },
      {
        "id": "mississippi-big-fish-access",
        "name": "Mississippi River, Big Fish Public Water Access Site",
        "latitude": 47.44394111320414,
        "longitude": -94.42536631657191,
        "mileFromStart": 3.4,
        "segmentKind": "creek",
        "note": "Optional intermediate access and bailout shown in Minnesota public-water-access GIS at river mile 1254.7."
      },
      {
        "id": "lake-winnibigoshish-west-access",
        "name": "Lake Winnibigoshish (W) Public Water Access Site / West Winnie Campground",
        "latitude": 47.42741895314589,
        "longitude": -94.3153374059751,
        "mileFromStart": 11.8,
        "segmentKind": "lake",
        "note": "Default take-out at West Winnie Campground / public access on the west shore of Lake Winnibigoshish."
      }
    ]
  },
  "rum-river-wayside-milaca": {
    "putIn": {
      "id": "rum-river-wayside-landing",
      "name": "Rum River, Wayside Landing Public Water Access Site",
      "latitude": 45.925791078659124,
      "longitude": -93.66458446097236
    },
    "takeOut": {
      "id": "rum-river-milaca-dam-site",
      "name": "Rum River, Milaca Dam Site Public Water Access Site",
      "latitude": 45.75443967001732,
      "longitude": -93.66018017081554
    },
    "logistics": {
      "distanceLabel": "16.2 mi",
      "estimatedPaddleTime": "Full day; plan 6 hr to 8 hr plus scouting and low-water delays",
      "shuttle": "Stage Milaca Dam Site first, then drive to the Highway 169 Wayside Landing north of Milaca. Check the Onamia DNR gauge and identify the Milaca take-out from land because the route must end above the dam.",
      "permits": "No route-specific paddling permit is known. Use the named public accesses, follow Minnesota boating/PFD rules, and obey posted rest-area, city-park, dam, and private-property signs.",
      "camping": "No on-route campsite is selected for this day trip. Use separate legal lodging or campground plans rather than camping on private banks or islands.",
      "campingClassification": "none",
      "summary": "Launch at Wayside Landing and paddle the official DNR full-day Rum River trip to Milaca Dam Site. This upper-Rum section can be narrow, shallow, and rocky, with Old Whitney Log Dam and the Milaca Dam boundary driving the safety plan.",
      "accessCaveats": [
        "Wayside Landing resolves in Minnesota public-water-access GIS as WAS00462 inside the Highway 169 wayside rest area about 10 miles north of Milaca.",
        "Milaca Dam Site resolves as WAS00461 above Milaca Dam and is the mandatory take-out for this card.",
        "The Onamia gauge is upstream of the trip. Pair it with a visual check for local rocks, strainers, and enough depth at the launch."
      ],
      "watchFor": [
        "Old Whitney Log Dam roughly halfway through the DNR day trip.",
        "Shallow rocky water, pilings, rock weirs, dams, strainers, and low-water dragging.",
        "Fast rises after rain, private banks, cold water, and the mandatory Milaca Dam finish."
      ]
    },
    "accessPoints": [
      {
        "id": "rum-river-wayside-landing",
        "name": "Rum River, Wayside Landing Public Water Access Site",
        "latitude": 45.925791078659124,
        "longitude": -93.66458446097236,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; public-water-access GIS resolves WAS00462 at DNR river mile 128.7."
      },
      {
        "id": "rum-river-old-whitney-log-dam",
        "name": "Old Whitney Log Dam area",
        "latitude": 45.842,
        "longitude": -93.665,
        "mileFromStart": 8,
        "segmentKind": "creek",
        "note": "Approximate mid-route hazard landmark from the DNR recommended-trip warning; scout/portage as conditions require."
      },
      {
        "id": "rum-river-milaca-dam-site",
        "name": "Rum River, Milaca Dam Site Public Water Access Site",
        "latitude": 45.75443967001732,
        "longitude": -93.66018017081554,
        "mileFromStart": 16.2,
        "segmentKind": "creek",
        "note": "Default take-out above Milaca Dam; public-water-access GIS resolves WAS00461 at DNR river mile 112.4."
      }
    ]
  },
  "cedar-river-riverwood-state-line": {
    "putIn": {
      "id": "cedar-river-riverwood-landing",
      "name": "Cedar River, Riverwood Landing Public Water Access Site",
      "latitude": 43.61597195224321,
      "longitude": -92.97826759705886
    },
    "takeOut": {
      "id": "cedar-river-state-line-road",
      "name": "State Line Road carry-in access",
      "latitude": 43.5002,
      "longitude": -92.9424
    },
    "logistics": {
      "distanceLabel": "11.8 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr, longer with low water, strainers, or shuttle delays",
      "shuttle": "Stage a legal driver pickup for State Line Road before launching because DNR says the take-out has no parking lot. Launch from Riverwood Landing after checking the Austin DNR gauge and current flood/debris conditions.",
      "permits": "No route-specific paddling permit is known. Use DNR-mapped access points, follow Minnesota boating/PFD rules, and respect WMA, road-right-of-way, and private-property limits.",
      "camping": "Treat this as a day route. DNR does not document an on-route watercraft campsite on the Riverwood-to-State-Line trip, and the State Line Road finish has no parking lot.",
      "campingClassification": "none",
      "summary": "Launch at Riverwood Landing and paddle the official DNR 11.8-mile Cedar River day trip to State Line Road. The route is moderate-flow beginner water in normal conditions, but the no-parking take-out, private banks, snags, and fast rises need a deliberate shuttle plan.",
      "accessCaveats": [
        "Riverwood Landing resolves in Minnesota public-water-access GIS as WAS02650 at DNR river mile 11.8.",
        "State Line Road is an official DNR carry-in access at river mile 0, river right, but DNR says there is no parking at this location.",
        "The State Line Road coordinate is an approximate map anchor for the named DNR access at the Minnesota/Iowa border; confirm the legal pickup spot before launching."
      ],
      "watchFor": [
        "Snags, overhanging trees, and fast rises after rain or during spring flood conditions.",
        "Private farm banks, WMA boundaries, and limited bailout options below Orchard Creek.",
        "The no-parking State Line Road finish; do not start without a practical legal shuttle solution."
      ]
    },
    "accessPoints": [
      {
        "id": "cedar-river-riverwood-landing",
        "name": "Cedar River, Riverwood Landing Public Water Access Site",
        "latitude": 43.61597195224321,
        "longitude": -92.97826759705886,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; public-water-access GIS resolves WAS02650 at DNR river mile 11.8."
      },
      {
        "id": "cedar-river-orchard-creek-access",
        "name": "Orchard Creek trailer access",
        "latitude": 43.578,
        "longitude": -92.963,
        "mileFromStart": 3.9,
        "segmentKind": "creek",
        "note": "DNR-mapped intermediate access at river mile 7.9; use only if current access and parking are legal."
      },
      {
        "id": "cedar-river-state-line-road",
        "name": "State Line Road carry-in access",
        "latitude": 43.5002,
        "longitude": -92.9424,
        "mileFromStart": 11.8,
        "segmentKind": "creek",
        "note": "Official DNR take-out at river mile 0, river right, with no parking at the access."
      }
    ]
  },
  "cottonwood-river-highway-4-county-road-10": {
    "putIn": {
      "id": "cottonwood-highway-4-pwa",
      "name": "Cottonwood River, Hwy 4 Public Water Access Site",
      "latitude": 44.2352134,
      "longitude": -94.7256361
    },
    "takeOut": {
      "id": "cottonwood-county-road-10-pwa",
      "name": "Cottonwood River, Co Rd 10 Public Water Access Site",
      "latitude": 44.282165,
      "longitude": -94.679581
    },
    "logistics": {
      "distanceLabel": "About 8.1 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr, longer with low water, fishing, or wood scouting",
      "shuttle": "Stage County Road 10 / Marti Landing first, then drive back to the Highway 4 access south of Sleepy Eye. Theden’s landing is a useful intermediate check but not the selected take-out.",
      "permits": "No route-specific paddling permit is known. Use the named public accesses, follow Minnesota boating/PFD rules, and obey DNR, county, and private-property postings.",
      "camping": "Treat this as a day route. DNR trip-planning guidance says to camp only in designated campsites, and no designated campsite is selected on the Highway 4-to-County Road 10 reach.",
      "campingClassification": "none",
      "summary": "Launch at Highway 4 and take out at County Road 10 / Marti Landing for an official lower Cottonwood River water-trail day inside DNR’s maintained focal corridor. The Leavenworth DNR gauge was just inside the official medium band during this run, but local depth and wood checks still matter.",
      "accessCaveats": [
        "MN DNR Map 4 places Highway 4 at river mile 31.6, Theden’s at river mile 29.0, and County Road 10 at river mile 23.5.",
        "Minnesota public-water-access GIS resolves Highway 4 as WAS02675 and County Road 10 as WAS01423, both carry-in natural launches with parking and no restroom.",
        "The selected Leavenworth / County Road 8 gauge is upstream of the reach. Use it as an official interpreted same-river proxy, not a substitute for visual checks at the put-in and take-out."
      ],
      "watchFor": [
        "Low-water scraping below the DNR medium band, especially through inside bars and shallow bends.",
        "Strainers, fresh wood, muddy banks, bridge debris, fast rises after rain, and cold-water exposure outside summer.",
        "Private banks away from public accesses; do not assume informal field edges or gravel bars are legal landing or camping spots."
      ]
    },
    "accessPoints": [
      {
        "id": "cottonwood-highway-4-pwa",
        "name": "Cottonwood River, Hwy 4 Public Water Access Site",
        "latitude": 44.2352134,
        "longitude": -94.7256361,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; Minnesota public-water-access GIS lists WAS02675 at Cottonwood river mile 31.4 with carry-in launch and parking."
      },
      {
        "id": "cottonwood-thedens-landing",
        "name": "Theden's Landing",
        "latitude": 44.2432332,
        "longitude": -94.6970342,
        "mileFromStart": 2.6,
        "segmentKind": "creek",
        "note": "Intermediate public landing shown by MN DNR Map 4 at river mile 29.0 and listed by Brown County."
      },
      {
        "id": "cottonwood-county-road-10-pwa",
        "name": "Cottonwood River, Co Rd 10 Public Water Access Site",
        "latitude": 44.282165,
        "longitude": -94.679581,
        "mileFromStart": 8.1,
        "segmentKind": "creek",
        "note": "Default take-out; Minnesota public-water-access GIS lists WAS01423 at river mile 23.5 with carry-in launch and parking."
      }
    ]
  },
  "cottonwood-river-county-road-10-county-road-11": {
    "putIn": {
      "id": "cottonwood-county-road-10-pwa",
      "name": "Cottonwood River, Co Rd 10 Public Water Access Site",
      "latitude": 44.282165,
      "longitude": -94.679581
    },
    "takeOut": {
      "id": "cottonwood-county-road-11-pwa",
      "name": "Cottonwood River, Co Rd 11 Public Water Access Site",
      "latitude": 44.2788449,
      "longitude": -94.592992
    },
    "logistics": {
      "distanceLabel": "About 6.7 mi",
      "estimatedPaddleTime": "About 2 hr to 3.5 hr, longer with low water, fishing, or strainers",
      "shuttle": "Stage the County Road 11 take-out first, then launch from County Road 10 / Marti Landing. This is a short rural shuttle but still needs a take-out scout because muddy banks and wood can change after high water.",
      "permits": "No route-specific paddling permit is known. Use the named public accesses, follow Minnesota boating/PFD rules, and respect Brown County, DNR, and private-property postings.",
      "camping": "Treat this as a day route. DNR trip-planning guidance says to camp only in designated campsites, and no designated campsite is selected between County Road 10 and County Road 11.",
      "campingClassification": "none",
      "summary": "Launch at County Road 10 / Marti Landing and take out at County Road 11 for a short maintained-corridor Cottonwood River connector. The route is straightforward at official medium levels, but low water, fresh wood, and private banks are the main constraints.",
      "accessCaveats": [
        "MN DNR Map 4 places County Road 10 at river mile 23.5 and County Road 11 at river mile 16.8.",
        "Minnesota public-water-access GIS resolves County Road 10 as WAS01423 and County Road 11 as WAS01424, both carry-in natural launches with parking and no restroom.",
        "Brown County lists both County Road 10 / Marti Landing and County Road 11 as public canoe landings with put-in areas and parking."
      ],
      "watchFor": [
        "Scraping and dragging if the Leavenworth DNR gauge falls below the official medium band or approaches the scrapable floor.",
        "Strainers, fresh wood, bridge debris, muddy banks, and quick rises after rain.",
        "Private shoreland and limited legal bailout options away from the two public endpoints."
      ]
    },
    "accessPoints": [
      {
        "id": "cottonwood-county-road-10-pwa",
        "name": "Cottonwood River, Co Rd 10 Public Water Access Site",
        "latitude": 44.282165,
        "longitude": -94.679581,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; Minnesota public-water-access GIS lists WAS01423 at river mile 23.5 with carry-in launch and parking."
      },
      {
        "id": "cottonwood-county-road-11-pwa",
        "name": "Cottonwood River, Co Rd 11 Public Water Access Site",
        "latitude": 44.2788449,
        "longitude": -94.592992,
        "mileFromStart": 6.7,
        "segmentKind": "creek",
        "note": "Default take-out; Minnesota public-water-access GIS lists WAS01424 at river mile 16.8 with carry-in launch and parking."
      }
    ]
  },
  "cottonwood-river-county-road-11-flandrau": {
    "putIn": {
      "id": "cottonwood-county-road-11-pwa",
      "name": "Cottonwood River, Co Rd 11 Public Water Access Site",
      "latitude": 44.2788449,
      "longitude": -94.592992
    },
    "takeOut": {
      "id": "cottonwood-flandrau-state-park-pwa",
      "name": "Cottonwood River, Flandrau State Park Public Water Access Site",
      "latitude": 44.2914246,
      "longitude": -94.4690871
    },
    "logistics": {
      "distanceLabel": "About 11.1 mi",
      "estimatedPaddleTime": "About 4 hr to 5.5 hr, longer with low water, wood scouting, fishing, or park access delays",
      "shuttle": "Stage the Flandrau State Park access first, confirm current park entry and parking rules, then launch from County Road 11. Set a conservative turn-back decision at the put-in because formal exits are sparse before the park.",
      "permits": "No route-specific paddling permit is known. Follow Minnesota boating/PFD rules and obey all Flandrau State Park permits, camping reservations, watercraft-campsite rules, and posted closures.",
      "camping": "Flandrau State Park is the selected overnight support. MN DNR Map 4 shows park camping, water, toilets, and a watercraft campsite at river mile 5.7; use designated sites only and confirm current park availability before counting on an overnight.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at County Road 11 and finish at Flandrau State Park for the lower Cottonwood reach immediately above New Ulm. The New Ulm DNR gauge was below the official scrapable floor during this run, so current conditions may require waiting for rain-fed recovery.",
      "accessCaveats": [
        "MN DNR Map 4 places County Road 11 at river mile 16.8 and Flandrau State Park camping/access context from river mile 6.5 to 4.0, with a watercraft campsite at river mile 5.7.",
        "Minnesota public-water-access GIS resolves County Road 11 as WAS01424 and Flandrau State Park as WAS02651; the Flandrau access lists carry-in launch, parking, and restroom context.",
        "The New Ulm DNR gauge is downstream near the lower Cottonwood corridor. Use it as the closest official interpreted lower-river check, then verify depth and access footing at County Road 11 and Flandrau."
      ],
      "watchFor": [
        "Scrapable low water when the New Ulm gauge is below 150 cfs, plus shallow bars and possible dragging before the park.",
        "Strainers, fresh wood, muddy banks, private shoreland, and fast rises after thunderstorms.",
        "State-park rule changes, campsite availability, high-water closures, and limited legal bailout options before the Flandrau access."
      ]
    },
    "accessPoints": [
      {
        "id": "cottonwood-county-road-11-pwa",
        "name": "Cottonwood River, Co Rd 11 Public Water Access Site",
        "latitude": 44.2788449,
        "longitude": -94.592992,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; Minnesota public-water-access GIS lists WAS01424 at river mile 16.8 with carry-in launch and parking."
      },
      {
        "id": "cottonwood-flandrau-state-park-pwa",
        "name": "Cottonwood River, Flandrau State Park Public Water Access Site",
        "latitude": 44.2914246,
        "longitude": -94.4690871,
        "mileFromStart": 11.1,
        "segmentKind": "creek",
        "note": "Default take-out; Minnesota public-water-access GIS lists WAS02651 near the Flandrau State Park watercraft campsite with carry-in launch, parking, and restroom context."
      }
    ]
  },
  "cannon-river-wilderness-northfield": {
    "putIn": {
      "id": "cannon-river-wilderness-area-access",
      "name": "Cannon River Wilderness Area carry-in",
      "latitude": 44.3690392,
      "longitude": -93.231922
    },
    "takeOut": {
      "id": "cannon-river-riverside-city-park-northfield",
      "name": "Riverside City Park / Highway 3 access",
      "latitude": 44.4531293,
      "longitude": -93.1647835
    },
    "logistics": {
      "distanceLabel": "About 8.5 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr, longer with low-water scraping or fishing stops",
      "shuttle": "Stage at Riverside City Park in Northfield, then launch from the Cannon River Wilderness Area carry-in. Confirm the take-out before launch because the Northfield dam is immediately downstream of the park.",
      "permits": "No route-specific paddling permit is known. Use the named public accesses, follow Minnesota boating/PFD rules, and obey city, county, DNR, and private-property postings.",
      "camping": "DNR maps show Wilderness-area watercraft campsites and amenities, but camping must stay in designated sites. Do not use private banks or riverbed bars next to private property for informal overnight stops.",
      "campingClassification": "on_route_campsite",
      "summary": "Paddle the DNR-recommended Wilderness Area to Northfield day trip with a direct interpreted gauge at the take-out. The trip must end at Riverside City Park before the 10-foot Northfield dam, which DNR maps as having no developed portage.",
      "accessCaveats": [
        "Minnesota public-water-access GIS resolves the Wilderness Area carry-in and Riverside City Park / Highway 3 access with river-mile records.",
        "The route ends just above the Northfield dam. Treat Riverside City Park as the mandatory take-out, not an optional stop.",
        "DNR warns that public route maps do not imply permission to use private banks; stay on public accesses and designated campsites."
      ],
      "watchFor": [
        "Shallow rocky water in dry periods, especially below the official medium band.",
        "Flooding, fast current, and new trees or snags after heavy rain.",
        "The Northfield dam corridor immediately below the take-out."
      ]
    },
    "accessPoints": [
      {
        "id": "cannon-river-wilderness-area-access",
        "name": "Cannon River Wilderness Area carry-in",
        "latitude": 44.3690392,
        "longitude": -93.231922,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; DNR recommends this access for the 8.5-mile one-way to Northfield and public-water-access GIS resolves the site as WAS01381."
      },
      {
        "id": "cannon-river-riverside-city-park-northfield",
        "name": "Riverside City Park / Highway 3 access",
        "latitude": 44.4531293,
        "longitude": -93.1647835,
        "mileFromStart": 8.5,
        "segmentKind": "creek",
        "note": "Default take-out; DNR maps the Northfield gauge and Riverside City Park access just upstream of the Northfield dam."
      }
    ]
  },
  "straight-river-medford-kroghs": {
    "putIn": {
      "id": "straight-river-medford-city-park",
      "name": "Medford City Park access",
      "latitude": 44.1775975,
      "longitude": -93.2490711
    },
    "takeOut": {
      "id": "straight-river-kroghs-landing",
      "name": "Kroghs Landing",
      "latitude": 44.2427413,
      "longitude": -93.2401518
    },
    "logistics": {
      "distanceLabel": "About 7.0 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, longer with low water or scouting",
      "shuttle": "Stage at Kroghs Landing, then launch from Medford City Park. This selected route starts below Clinton Falls, but the former Walcott Mill Dam rapid sits just above the take-out and should be scouted before committing.",
      "permits": "No route-specific paddling permit is known. Use the named public accesses, follow Minnesota boating/PFD rules, and obey city, DNR, road-shoulder, and private-property postings.",
      "camping": "Treat this as a day trip. No designated campsite is selected between Medford and Kroghs Landing; use separate campground or lodging plans rather than informal private-bank camping.",
      "campingClassification": "none",
      "summary": "Run the DNR-recommended Medford-to-Kroghs section of the Straight River with a nearby downstream interpreted gauge. Expect a narrow rocky channel, changing wood, and a Class I-II former dam feature near the finish.",
      "accessCaveats": [
        "Minnesota public-water-access GIS resolves Medford and Kroghs Landing with river-mile records and source-backed coordinates.",
        "The Faribault gauge is downstream of the take-out, so pair it with a same-day depth and obstruction check at Medford.",
        "Do not count on informal exits through private banks or farm fields between the two public accesses."
      ],
      "watchFor": [
        "Former Walcott Mill Dam Class I-II ledge hydraulics just above Kroghs Landing.",
        "Rocky shallows, narrow bends, and trees or snags, especially after high water.",
        "Very low July flows; DNR says the Straight is often too low by midsummer."
      ]
    },
    "accessPoints": [
      {
        "id": "straight-river-medford-city-park",
        "name": "Medford City Park access",
        "latitude": 44.1775975,
        "longitude": -93.2490711,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; DNR recommends Medford City Park to Kroghs Landing and public-water-access GIS resolves Medford as WAS02042."
      },
      {
        "id": "straight-river-kroghs-landing",
        "name": "Kroghs Landing",
        "latitude": 44.2427413,
        "longitude": -93.2401518,
        "mileFromStart": 7,
        "segmentKind": "creek",
        "note": "Default take-out; public-water-access GIS resolves Kroghs Landing as WAS00186, just upstream of the Faribault gauge corridor."
      }
    ]
  },
  "minnesota-river-le-sueur-henderson": {
    "putIn": {
      "id": "minnesota-river-le-sueur-access",
      "name": "Le Sueur public access",
      "latitude": 44.4632749,
      "longitude": -93.9176049
    },
    "takeOut": {
      "id": "minnesota-river-henderson-access",
      "name": "Henderson public access",
      "latitude": 44.5299631,
      "longitude": -93.9019182
    },
    "logistics": {
      "distanceLabel": "About 7.1 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, longer with wind, fishing, or low exposed bars",
      "shuttle": "Stage at Henderson, then launch from Le Sueur. Henderson Station is a useful final-mile landmark, but the planned take-out is the Henderson trailer access by the DNR gauge.",
      "permits": "No route-specific paddling permit is known. Use the named public accesses, follow Minnesota boating/PFD rules, and check city, county, DNR, and campsite permit postings before overnight use.",
      "camping": "DNR Map 5 shows a watercraft campsite at Le Sueur with a permit required. Treat it as endpoint support only; use designated sites and do not camp on riverbeds next to private property.",
      "campingClassification": "endpoint_campground",
      "summary": "Paddle the short DNR-recommended Le Sueur-to-Henderson Minnesota River section with the direct Henderson interpreted gauge. The reach is generally gentle and wide, but wind, floodplain current, floating debris, and private banks require conservative go/no-go judgment.",
      "accessCaveats": [
        "Minnesota public-water-access GIS resolves Le Sueur, Henderson Station, and Henderson with river-mile records and coordinates.",
        "The Henderson gauge is at the take-out, so high or rising readings should be treated as route-local warnings.",
        "DNR says designated campsites only; do not treat exposed bars by private property as legal camps."
      ],
      "watchFor": [
        "Wind and small waves on a wide open river valley.",
        "Floating trees, snags, muddy banks, and stronger current after rain or during high water.",
        "Private-bank constraints and limited practical exits between mapped public accesses."
      ]
    },
    "accessPoints": [
      {
        "id": "minnesota-river-le-sueur-access",
        "name": "Le Sueur public access",
        "latitude": 44.4632749,
        "longitude": -93.9176049,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; DNR recommends Le Sueur to Henderson and Map 5 lists Le Sueur with watercraft-campsite and rest-area context."
      },
      {
        "id": "minnesota-river-henderson-station-access",
        "name": "Henderson Station access",
        "latitude": 44.5244255,
        "longitude": -93.8862878,
        "mileFromStart": 6.2,
        "segmentKind": "creek",
        "note": "Intermediate landmark and possible access; DNR Map 5 and public-water-access GIS place Henderson Station upstream of the Henderson trailer access."
      },
      {
        "id": "minnesota-river-henderson-access",
        "name": "Henderson public access",
        "latitude": 44.5299631,
        "longitude": -93.9019182,
        "mileFromStart": 7.1,
        "segmentKind": "creek",
        "note": "Default take-out; DNR recommended one-way list identifies Henderson trailer access as the downstream endpoint, and the interpreted gauge is at Henderson."
      }
    ]
  },
  "sauk-river-oak-township-spring-hill": {
    "putIn": {
      "id": "sauk-river-oak-township-county-park",
      "name": "Oak Township County Park carry-in access",
      "latitude": 45.60927,
      "longitude": -94.75344
    },
    "takeOut": {
      "id": "sauk-river-spring-hill-county-park",
      "name": "Spring Hill County Park carry-in access",
      "latitude": 45.529026,
      "longitude": -94.776531
    },
    "logistics": {
      "distanceLabel": "About 10.8 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr, longer with low water, vegetation, or fishing stops",
      "shuttle": "Stage Spring Hill County Park first, then launch from Oak Township County Park. Check the St. Martin DNR gauge and inspect both county-park accesses because the gauge is downstream of this route.",
      "permits": "No route-specific paddling permit is known. Use the county-park and DNR water-trail accesses, follow Minnesota boating/PFD rules, and obey posted county-park, campsite, and private-property rules.",
      "camping": "DNR maps watercraft campsites at both Oak Township County Park and Spring Hill County Park. Treat camping as designated-site or county-park-rule dependent only; do not camp on riverbeds next to private property.",
      "campingClassification": "endpoint_campground",
      "summary": "Paddle the DNR-recommended Oak Township-to-Spring Hill Sauk River day through open lowlands and wooded bends. It is generally easy at normal water, but current low-band readings can make it slow, shallow, or weedy.",
      "accessCaveats": [
        "DNR Map 1 places Oak Township County Park at river mile 67.0 and Spring Hill County Park at river mile 56.2/56.1 with campsite and restroom context.",
        "The St. Martin gauge is downstream of the take-out. Use it as the official interpreted corridor check, not a substitute for same-day depth and wood inspection.",
        "Most shoreland away from public accesses and designated campsites should be treated as private or not available for casual stops."
      ],
      "watchFor": [
        "Shallow, weedy, or slow travel when the St. Martin gauge is below the official medium band.",
        "Fallen trees, bridge debris, and fresh strainers after storm rises.",
        "Private banks, occupied campsites, and county-park rules at both endpoints."
      ]
    },
    "accessPoints": [
      {
        "id": "sauk-river-oak-township-county-park",
        "name": "Oak Township County Park carry-in access",
        "latitude": 45.60927,
        "longitude": -94.75344,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; DNR Map 1 lists Oak Township County Park at Sauk river mile 67.0 with carry-in access, watercraft campsite, rest area, and toilets."
      },
      {
        "id": "sauk-river-spring-hill-county-park",
        "name": "Spring Hill County Park carry-in access",
        "latitude": 45.529026,
        "longitude": -94.776531,
        "mileFromStart": 10.8,
        "segmentKind": "creek",
        "note": "Default take-out; DNR Map 1 lists Spring Hill County Park at river mile 56.2/56.1 with carry-in access, watercraft campsite, toilet, rest area, and drinking water."
      }
    ]
  },
  "otter-tail-river-friberg-hwy-210": {
    "putIn": {
      "id": "otter-tail-river-friberg-taplin-gorge-dam",
      "name": "Taplin Gorge / Friberg Dam public access",
      "latitude": 46.3826273,
      "longitude": -96.0206276
    },
    "takeOut": {
      "id": "otter-tail-river-highway-210-access",
      "name": "Highway 210 public access",
      "latitude": 46.2807577,
      "longitude": -95.9809894
    },
    "logistics": {
      "distanceLabel": "About 15.5 mi",
      "estimatedPaddleTime": "About 5 hr to 7.5 hr, longer with portage checks, wind, or low-water scraping",
      "shuttle": "Stage the Highway 210 take-out first, then launch from the Taplin Gorge / Friberg Dam public access. Walk the dam-access area and confirm any posted portage or closed-area signs before unloading.",
      "permits": "No route-specific paddling permit is known. Use the named public accesses, follow Minnesota boating/PFD rules, and obey Otter Tail Power, DNR, road-right-of-way, and private-property postings.",
      "camping": "Treat this as a committed day route. No designated on-route campsite was verified between Taplin Gorge / Friberg Dam and Highway 210; use separate legal campground or lodging plans.",
      "campingClassification": "none",
      "summary": "Run the DNR-recommended Otter Tail section from Taplin Gorge / Friberg Dam to Highway 210 with the Elizabeth gauge inside the route corridor. Dam discipline and limited public exits matter as much as flow.",
      "accessCaveats": [
        "Minnesota public-water-access GIS resolves Taplin Gorge / Friberg Dam, Highway 1, and Highway 210 with source-backed coordinates.",
        "The Highway 210 coordinate is the official DNR public-access parking/launch anchor, not a river-centerline point. Keep it as published even though a centerline-only NHD audit places the access several miles from the named flowline.",
        "The Elizabeth gauge is inside the route corridor and gives an official DNR band, but it cannot show local dam signage, culvert clearance, or new wood.",
        "Highway 210 is the selected finish. Continuing downstream changes the dam, rapid, and shuttle plan."
      ],
      "watchFor": [
        "Dam works, diversion channels, mandatory portages, and posted closed areas near the put-in or downstream structures.",
        "Rocky or scrape-heavy travel near the official low band and pushier current above the medium band.",
        "Culverts, low-clearance bridges, strainers, private banks, and cold water."
      ]
    },
    "accessPoints": [
      {
        "id": "otter-tail-river-friberg-taplin-gorge-dam",
        "name": "Taplin Gorge / Friberg Dam public access",
        "latitude": 46.3826273,
        "longitude": -96.0206276,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; public-water-access GIS resolves WAS00558 at the Taplin Gorge / Friberg Dam parking area near DNR river mile 71.3."
      },
      {
        "id": "otter-tail-river-highway-1-access",
        "name": "Highway 1 public access",
        "latitude": 46.3099103,
        "longitude": -96.0096102,
        "mileFromStart": 9.1,
        "segmentKind": "creek",
        "note": "Intermediate public access and possible bailout; public-water-access GIS resolves WAS01317 near Otter Tail river mile 62.4."
      },
      {
        "id": "otter-tail-river-highway-210-access",
        "name": "Highway 210 public access",
        "latitude": 46.2807577,
        "longitude": -95.9809894,
        "mileFromStart": 15.5,
        "segmentKind": "creek",
        "note": "Default take-out; DNR recommended one-way data identifies Highway 210 as the downstream endpoint and public-water-access GIS resolves WAS01465 at river mile 56.0."
      }
    ]
  },
  "shell-rock-river-frank-hall-st-nicholas": {
    "putIn": {
      "id": "shell-rock-river-frank-hall-park",
      "name": "Frank Hall Park public access",
      "latitude": 43.6428912,
      "longitude": -93.3595382
    },
    "takeOut": {
      "id": "shell-rock-river-st-nicholas-landing",
      "name": "St. Nicholas Landing public access",
      "latitude": 43.6122566,
      "longitude": -93.3130901
    },
    "logistics": {
      "distanceLabel": "About 3.2 lake mi",
      "estimatedPaddleTime": "About 1.5 hr to 3 hr, longer with wind, fishing, or state-park stops",
      "shuttle": "Stage at St. Nicholas Landing, then launch from Frank Hall Park. Because this route is on Albert Lea Lake, check wind, thunderstorms, and water quality in addition to the downstream Shell Rock gauge.",
      "permits": "No route-specific paddling permit is known. Use the public trailer accesses, follow Minnesota boating/PFD rules, and obey Albert Lea city, Myre-Big Island State Park, DNR, and private-shoreline postings.",
      "camping": "Myre-Big Island State Park sits on the route corridor and DNR Shell Rock materials identify park camping and amenities. Use reserved or currently open designated state-park campsites only; do not treat private shoreline as camping.",
      "campingClassification": "nearby_basecamp",
      "summary": "Use Frank Hall Park and St. Nicholas Landing for the DNR-recommended Albert Lea Lake option on the Shell Rock water trail. This is a lake paddle, so wind and weather can override the gauge score.",
      "accessCaveats": [
        "Minnesota public-water-access GIS resolves Frank Hall Park and St. Nicholas Landing with coordinates, launch type, parking, and water-trail metadata.",
        "The Gordonsville gauge is downstream on the Shell Rock corridor, so treat it as a proxy for water-trail level context rather than a lake-wave forecast.",
        "Do not continue upstream into the Bridge Avenue Dam portage or downstream past St. Nicholas without separate route planning."
      ],
      "watchFor": [
        "Open-water wind, waves, thunderstorms, cold water, and algae or water-quality concerns on Albert Lea Lake.",
        "Bridge Avenue Dam upstream of Frank Hall and low-bridge / constructed-rapid hazards downstream of St. Nicholas on the river trail.",
        "Private shoreline and state-park rules around Myre-Big Island."
      ]
    },
    "accessPoints": [
      {
        "id": "shell-rock-river-frank-hall-park",
        "name": "Frank Hall Park public access",
        "latitude": 43.6428912,
        "longitude": -93.3595382,
        "mileFromStart": 0,
        "segmentKind": "lake",
        "note": "Default put-in; DNR map labels Frank Hall Park at river mile 16.8 and public-water-access GIS resolves WAS01395."
      },
      {
        "id": "shell-rock-river-st-nicholas-landing",
        "name": "St. Nicholas Landing public access",
        "latitude": 43.6122566,
        "longitude": -93.3130901,
        "mileFromStart": 3.2,
        "segmentKind": "lake",
        "note": "Default take-out; DNR map labels St. Nicholas Landing at river mile 13.6 and public-water-access GIS resolves WAS01392."
      }
    ]
  },
  "cannon-river-byllesby-highway-61": {
    "putIn": {
      "id": "lake-byllesby-east-cannon",
      "name": "Cannon River, Lake Byllesby (E) Public Water Access Site",
      "latitude": 44.5092447,
      "longitude": -92.9424047
    },
    "takeOut": {
      "id": "highway-61-cannon",
      "name": "Cannon River, Highway 61 Public Water Access Site",
      "latitude": 44.5811188,
      "longitude": -92.6553127
    },
    "logistics": {
      "distanceLabel": "About 20.8 mi",
      "estimatedPaddleTime": "About 7 hr to 10 hr, longer with wind, low water, or bailout stops",
      "shuttle": "Stage Highway 61 first, then drive back to the Lake Byllesby east carry-in below the dam. Treat Riverside Park and Miesville Ravine as public intermediate exits if the full lower-Cannon day is too long.",
      "permits": "No route-specific paddling permit is known. Use the named public accesses, follow Minnesota boating/PFD rules, and obey Lake Byllesby, county park, and DNR water-trail rules.",
      "camping": "No on-route watercraft campsite is assumed for this long lower-Cannon day. Use nearby county/state/private campground lodging separately, and do not camp on private banks or gravel bars.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch below Lake Byllesby Dam and paddle the full DNR-recommended lower-Cannon section to Highway 61. The Welch gauge is direct for the lower corridor, but dam releases, daylight, and public bailout timing matter.",
      "accessCaveats": [
        "Byllesby East resolves as WAS02800 and Highway 61 resolves as WAS01112 in Minnesota public-water-access GIS.",
        "Riverside Park and Miesville Ravine are public intermediate exits; confirm parking and park hours before relying on them.",
        "Do not approach dam infrastructure or use private banks as routine stops."
      ],
      "watchFor": [
        "Lake Byllesby Dam release effects, riffles, strainers, bridge current, and cold water.",
        "Long mileage, changing daylight, storms, and fatigue between public exits.",
        "Very high water above the official Welch high band and shallow scraping below the low floor."
      ]
    },
    "accessPoints": [
      {
        "id": "lake-byllesby-east-cannon",
        "name": "Cannon River, Lake Byllesby (E) Public Water Access Site",
        "latitude": 44.5092447,
        "longitude": -92.9424047,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in below Lake Byllesby Dam; resolves as WAS02800 at DNR river mile 27.9."
      },
      {
        "id": "cannon-riverside-park",
        "name": "Cannon River, Riverside Park Public Water Access Site",
        "latitude": 44.5119132,
        "longitude": -92.9068155,
        "mileFromStart": 2.4,
        "segmentKind": "creek",
        "note": "Public intermediate access at Cannon Falls for bailout or shorter-trip planning."
      },
      {
        "id": "cannon-miesville-ravine",
        "name": "Cannon River, Miesville Ravine County Park Public Water Access Site",
        "latitude": 44.5430566,
        "longitude": -92.8008416,
        "mileFromStart": 9.4,
        "segmentKind": "creek",
        "note": "Public intermediate access before committing to the final Highway 61 leg."
      },
      {
        "id": "highway-61-cannon",
        "name": "Cannon River, Highway 61 Public Water Access Site",
        "latitude": 44.5811188,
        "longitude": -92.6553127,
        "mileFromStart": 20.8,
        "segmentKind": "creek",
        "note": "Default take-out; resolves as WAS01112 near DNR river mile 6.8."
      }
    ]
  },
  "north-fork-crow-river-forest-city-kingston": {
    "putIn": {
      "id": "forest-city-north-fork-crow",
      "name": "North Fork Crow River, Forest City Public Water Access Site",
      "latitude": 45.2095748,
      "longitude": -94.4657051
    },
    "takeOut": {
      "id": "kingston-north-fork-crow",
      "name": "North Fork Crow River, Kingston Public Water Access Site",
      "latitude": 45.1950363,
      "longitude": -94.3272284
    },
    "logistics": {
      "distanceLabel": "About 12.0 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr, longer with low water, wood, or scouting",
      "shuttle": "Stage Kingston first, then drive back to Forest City. Confirm both accesses from land because the Highway 22 DNR gauge is upstream and cannot show local tree or low-bridge conditions.",
      "permits": "No route-specific paddling permit is known. Use the named DNR public accesses, follow Minnesota boating/PFD rules, and respect private banks and posted local rules.",
      "camping": "No on-route public watercraft campsite is documented for this Forest City-to-Kingston section. Plan it as a day trip or reserve lodging/camping away from the river.",
      "campingClassification": "none",
      "summary": "Launch at Forest City and take out at Kingston for the DNR-recommended 12-mile upper North Fork Crow section. Use the Highway 22 gauge as a conservative floor, then make local visual checks for wood, low bridges, and depth.",
      "accessCaveats": [
        "Forest City resolves as WAS02367 at river mile 106.2 and Kingston resolves as WAS00687 at river mile 94.2 in Minnesota public-water-access GIS.",
        "The selected gauge is upstream of the route and has no separate DNR very-high cutoff, so avoid high or rising water even if the card can only model a low-water floor.",
        "Use only named public accesses or confirmed public land for stops."
      ],
      "watchFor": [
        "Easy rapids, shallow gravel, underwater branches, overhanging trees, and low bridge clearance.",
        "Fallen trees, possible farm fences, private banks, cold water, and fresh obstruction after storms.",
        "Low water when the Highway 22 gauge drops below the official 80.5 ft floor."
      ]
    },
    "accessPoints": [
      {
        "id": "forest-city-north-fork-crow",
        "name": "North Fork Crow River, Forest City Public Water Access Site",
        "latitude": 45.2095748,
        "longitude": -94.4657051,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; resolves as WAS02367 at DNR river mile 106.2."
      },
      {
        "id": "kingston-north-fork-crow",
        "name": "North Fork Crow River, Kingston Public Water Access Site",
        "latitude": 45.1950363,
        "longitude": -94.3272284,
        "mileFromStart": 12,
        "segmentKind": "creek",
        "note": "Default take-out; resolves as WAS00687 at DNR river mile 94.2."
      }
    ]
  },
  "pomme-de-terre-river-pomme-1-appleton": {
    "putIn": {
      "id": "pomme-de-terre-pomme-1",
      "name": "Pomme De Terre River, Pomme De Terre #1 Public Water Access Site",
      "latitude": 45.283686,
      "longitude": -95.9793669
    },
    "takeOut": {
      "id": "appleton-pomme-de-terre",
      "name": "Pomme De Terre River, Appleton Public Water Access Site",
      "latitude": 45.203145,
      "longitude": -96.0209066
    },
    "logistics": {
      "distanceLabel": "About 10.3 mi",
      "estimatedPaddleTime": "About 3.5 hr to 5.5 hr, longer with low water, wood, or campsite use",
      "shuttle": "Stage Appleton first, then drive back to Pomme de Terre #1 / Highway 12. Larson Landing is an intermediate public access and a shorter alternate take-out if conditions deteriorate.",
      "permits": "No route-specific paddling permit is known. Use the named DNR public accesses, follow Minnesota boating/PFD rules, and obey any posted campsite, park, and access rules.",
      "camping": "DNR Map 1 identifies Pomme de Terre #1 as a rest area and watercraft campsite. Treat overnight use as designated-site only, and do not camp on private farm banks.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Pomme de Terre #1 and paddle past Larson Landing to Appleton for the DNR-recommended lower Pomme day. The Appleton gauge is direct for the finish, but wood, farm fences, and low-water scraping still need visual checks.",
      "accessCaveats": [
        "Pomme #1, Larson, and Appleton resolve in Minnesota public-water-access GIS with official coordinates and water-trail river miles.",
        "The route overlaps the already-live Larson-to-Appleton split; Larson is included here as an intermediate exit, not a duplicate endpoint.",
        "Confirm the Appleton landing and man-made rapid context before launch."
      ],
      "watchFor": [
        "Fallen trees, farm fences, strainers, sandy shallows, and low-water scraping.",
        "Fast rises after rain, cold water outside midsummer, private banks, and agricultural-edge hazards.",
        "Campsite availability and current posted rules at Pomme #1."
      ]
    },
    "accessPoints": [
      {
        "id": "pomme-de-terre-pomme-1",
        "name": "Pomme De Terre River, Pomme De Terre #1 Public Water Access Site",
        "latitude": 45.283686,
        "longitude": -95.9793669,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in and DNR-mapped watercraft campsite/rest area; resolves as WAS02176 at river mile 19.1."
      },
      {
        "id": "pomme-de-terre-larson",
        "name": "Pomme de Terre River, Larson Landing Public Water Access Site",
        "latitude": 45.2393301,
        "longitude": -95.9850983,
        "mileFromStart": 4.3,
        "segmentKind": "creek",
        "note": "Intermediate public access and shorter-route exit; resolves as WAS00046 at DNR river mile 14.8."
      },
      {
        "id": "appleton-pomme-de-terre",
        "name": "Pomme De Terre River, Appleton Public Water Access Site",
        "latitude": 45.203145,
        "longitude": -96.0209066,
        "mileFromStart": 10.3,
        "segmentKind": "creek",
        "note": "Default take-out near the Appleton DNR gauge; resolves as WAS00050 at river mile 8.8."
      }
    ]
  },
  "cedar-river-marcusen-riverwood": {
    "putIn": {
      "id": "marcusen-park-cedar",
      "name": "Cedar River, Marcusen Park Public Water Access Site",
      "latitude": 43.6569447,
      "longitude": -92.9743545
    },
    "takeOut": {
      "id": "riverwood-landing-cedar",
      "name": "Cedar River, Riverwood Landing Public Water Access Site",
      "latitude": 43.615972,
      "longitude": -92.9782676
    },
    "logistics": {
      "distanceLabel": "About 3.8 mi",
      "estimatedPaddleTime": "About 1.5 hr to 2.5 hr, longer with low water or wood scouting",
      "shuttle": "Stage Riverwood Landing first, then drive back to Marcusen Park in Austin. Walk both landings and check the County Road 28 gauge bridge area before launching.",
      "permits": "No route-specific paddling permit is known. Use the named public accesses, follow Minnesota boating/PFD rules, and obey posted City of Austin and DNR water-trail rules.",
      "camping": "No on-route public watercraft campsite is documented for this short Austin connector. Plan it as a day trip and do not camp on private banks or bars.",
      "campingClassification": "none",
      "summary": "Launch from Marcusen Park and take out at Riverwood Landing for a short Cedar River section with an on-route DNR gauge, no major rapids, and recurring snag/overhanging-tree caveats.",
      "accessCaveats": [
        "Marcusen Park resolves as WAS03076 at DNR river mile 15.6 and Riverwood Landing resolves as WAS02650 at river mile 11.8 in Minnesota public-water-access GIS.",
        "The County Road 28 bridge and river-level gauge sit inside the route at about river mile 13.4.",
        "Do not continue past Riverwood Landing unless the downstream state-line route and access limits are separately staged."
      ],
      "watchFor": [
        "Austin dam context upstream, bridge current, strainers, snags, and overhanging trees.",
        "Scraping below the official 50 cfs floor and powerful current or new wood above the high band.",
        "Private banks and limited routine exits between the two public accesses."
      ]
    },
    "accessPoints": [
      {
        "id": "marcusen-park-cedar",
        "name": "Cedar River, Marcusen Park Public Water Access Site",
        "latitude": 43.6569447,
        "longitude": -92.9743545,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; resolves as WAS03076 at DNR river mile 15.6 behind Marcusen Stadium in Austin."
      },
      {
        "id": "riverwood-landing-cedar",
        "name": "Cedar River, Riverwood Landing Public Water Access Site",
        "latitude": 43.615972,
        "longitude": -92.9782676,
        "mileFromStart": 3.8,
        "segmentKind": "creek",
        "note": "Default take-out; resolves as WAS02650 at DNR river mile 11.8."
      }
    ]
  },
  "little-fork-river-lofgren-kuttes": {
    "putIn": {
      "id": "lofgren-park-little-fork",
      "name": "Little Fork River, Lofgren Park Public Water Access Site",
      "latitude": 48.4002431,
      "longitude": -93.564833
    },
    "takeOut": {
      "id": "kuttes-rainy-river",
      "name": "Rainy River, Kuttes Public Water Access Site",
      "latitude": 48.5268734,
      "longitude": -93.5702231
    },
    "logistics": {
      "distanceLabel": "About 21.8 mi",
      "estimatedPaddleTime": "About 7 hr to 10 hr, longer with low water, wind, scouting, or overnight gear",
      "shuttle": "Stage Kuttes Landing near Pelland first, then drive back to Lofgren Park in Littlefork. Build in time for the Rainy River finish and for checking Highway 217 rapids before committing.",
      "permits": "No route-specific paddling permit is known. Follow Minnesota boating/PFD rules, use only public or permissioned stops, and obey City of Littlefork campground rules if camping at Lofgren Park.",
      "camping": "Lofgren Park is documented by DNR as a city campground with trailer access, toilets, drinking water, picnic shelter, and a camping fee. No intermediate public campsite is assumed on the lower run.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch from Lofgren Park and paddle the lower Little Fork to the Rainy River confluence, then finish at Kuttes Landing. This is a long, remote-feeling route that depends on the direct Little Fork DNR gauge and local rapid checks.",
      "accessCaveats": [
        "Lofgren Park resolves as WAS02245 near DNR river mile 21 and Kuttes resolves as WAS02155 on the Rainy River in Pelland.",
        "DNR Map 2 places rapids and the river-level gauge near the Highway 217 bridge just upstream of the main lower route commitment.",
        "The take-out is not at the Little Fork mouth itself; plan the extra Rainy River travel to Kuttes Landing and account for wind or motorboat traffic."
      ],
      "watchFor": [
        "Rapids near Highway 217, rapidly changing levels, strainers, cold water, and remote rescue exposure.",
        "Scrapable conditions below the official 400 cfs floor; DNR notes summer rapids may be impassable without recent rain.",
        "Rainy River wind, current, motor traffic, border-water exposure, and long mileage fatigue."
      ]
    },
    "accessPoints": [
      {
        "id": "lofgren-park-little-fork",
        "name": "Little Fork River, Lofgren Park Public Water Access Site",
        "latitude": 48.4002431,
        "longitude": -93.564833,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at the City of Littlefork park and campground; resolves as WAS02245 near DNR river mile 21."
      },
      {
        "id": "kuttes-rainy-river",
        "name": "Rainy River, Kuttes Public Water Access Site",
        "latitude": 48.5268734,
        "longitude": -93.5702231,
        "mileFromStart": 21.8,
        "segmentKind": "creek",
        "note": "Default take-out about one mile east of the Little Fork confluence on the Rainy River; resolves as WAS02155 in Pelland."
      }
    ]
  },
  "rum-river-cambridge-martins": {
    "putIn": {
      "id": "cambridge-west-park-rum",
      "name": "Rum River, Cambridge Public Water Access Site",
      "latitude": 45.5723504,
      "longitude": -93.2357162
    },
    "takeOut": {
      "id": "martins-landing-rum",
      "name": "Rum River, Martin's Public Water Access Site",
      "latitude": 45.4883322,
      "longitude": -93.2667511
    },
    "logistics": {
      "distanceLabel": "About 7.7 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, longer with low water, wood, or wind",
      "shuttle": "Stage Martin's Landing first, then drive back to Cambridge West Park. Check local depth and wood at Cambridge because the DNR gauge is downstream at St. Francis.",
      "permits": "No route-specific paddling permit is known. Use the named public accesses, follow Minnesota boating/PFD rules, and obey posted city, county, and DNR water-trail rules.",
      "camping": "No campsite is assumed for this short connector. DNR notes some Rum River parks may offer watercraft campsites, but none was selected as a verified on-route campsite for Cambridge-to-Martin's.",
      "campingClassification": "none",
      "summary": "Launch at Cambridge West Park and take out at Martin's Landing for the missing Rum River connector between established upstream and downstream routes, using St. Francis as a conservative downstream gauge proxy.",
      "accessCaveats": [
        "Cambridge resolves as WAS00285 at DNR river mile 42.4 and Martin's resolves as WAS02197 at river mile 34.7 in Minnesota public-water-access GIS.",
        "The St. Francis gauge is downstream of this reach, so use it for broad water-level posture and still inspect the actual Cambridge launch.",
        "Do not continue below Martin's Landing unless the downstream Isanti/North County Park mileage, dams, and shuttle are separately planned."
      ],
      "watchFor": [
        "Downed trees, snags, possible log jams, bridge current, cold water, and private banks.",
        "Low water when the St. Francis proxy drops below the official 600 cfs floor.",
        "Current DNR alerts elsewhere on the Rum River, even if a listed obstruction is outside this exact reach."
      ]
    },
    "accessPoints": [
      {
        "id": "cambridge-west-park-rum",
        "name": "Rum River, Cambridge Public Water Access Site",
        "latitude": 45.5723504,
        "longitude": -93.2357162,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at Cambridge West Park; resolves as WAS00285 at DNR river mile 42.4."
      },
      {
        "id": "martins-landing-rum",
        "name": "Rum River, Martin's Public Water Access Site",
        "latitude": 45.4883322,
        "longitude": -93.2667511,
        "mileFromStart": 7.7,
        "segmentKind": "creek",
        "note": "Default take-out on the east bank near Isanti; resolves as WAS02197 at DNR river mile 34.7."
      }
    ]
  },
  "snake-river-mora-canary": {
    "putIn": {
      "id": "snake-river-mora",
      "name": "Snake River, Mora Public Water Access Site",
      "latitude": 45.88230816510179,
      "longitude": -93.30997169539015
    },
    "takeOut": {
      "id": "snake-river-canary-road",
      "name": "Snake River, #1, Canary Rd Public Water Access Site",
      "latitude": 45.795943278557345,
      "longitude": -93.07968444314102
    },
    "logistics": {
      "distanceLabel": "About 19.8 mi",
      "estimatedPaddleTime": "Long day, roughly 7 hr to 9 hr depending on level, wood, and breaks",
      "shuttle": "Stage Canary Road first, then drive back to Mora. Walk both landings and check the Mora gauge bridge area because the current DNR reading was below the scrapable floor during this run.",
      "permits": "No route-specific paddling permit is known. Use the named public accesses, follow Minnesota boating/PFD rules, and obey posted City of Mora and DNR public-access rules.",
      "camping": "No on-route public watercraft campsite is documented for the Mora-to-Canary connector. Plan it as a long day route and do not camp on private banks or informal bars.",
      "campingClassification": "none",
      "summary": "Launch at Mora and take out at Canary Road for the middle Snake River connector above the existing Canary-to-Cross-Lake route. The direct Mora gauge is the primary level check, but local wood and depth still decide the day.",
      "accessCaveats": [
        "Mora resolves as WAS02112 at river mile 41.9 and Canary Road resolves as WAS00232 at river mile 22.1 in Minnesota public-water-access GIS.",
        "The route is a long upstream connector to the existing Canary-to-Cross-Lake card; do not casually continue downstream unless the separate lower route is staged.",
        "Private banks and limited formal exits make this a commitment even though the river is not remote wilderness."
      ],
      "watchFor": [
        "Current below the official scrapable floor at Mora, which can mean dragging and stalled progress.",
        "Class I-II maneuvering context at the Mora gauge, bridge current, strainers, fresh storm wood, and quick rises after rain.",
        "Cold water, private banks, long-day fatigue, and slow emergency response between public road crossings."
      ]
    },
    "accessPoints": [
      {
        "id": "snake-river-mora",
        "name": "Snake River, Mora Public Water Access Site",
        "latitude": 45.88230816510179,
        "longitude": -93.30997169539015,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at the city access and Mora gauge; public-water-access GIS resolves WAS02112 at river mile 41.9."
      },
      {
        "id": "snake-river-canary-road",
        "name": "Snake River, #1, Canary Rd Public Water Access Site",
        "latitude": 45.795943278557345,
        "longitude": -93.07968444314102,
        "mileFromStart": 19.8,
        "segmentKind": "creek",
        "note": "Default take-out and upstream endpoint for the existing Canary-to-Cross-Lake route; resolves as WAS00232 at river mile 22.1."
      }
    ]
  },
  "sauk-river-richmond-horseshoe-lake": {
    "putIn": {
      "id": "sauk-river-richmond",
      "name": "Sauk River, Richmond Public Water Access Site",
      "latitude": 45.4574855816426,
      "longitude": -94.53454276890497
    },
    "takeOut": {
      "id": "sauk-river-horseshoe-lake",
      "name": "Horseshoe Lake Public Water Access Site",
      "latitude": 45.44277995491589,
      "longitude": -94.5226614261946
    },
    "logistics": {
      "distanceLabel": "About 1.6 mi",
      "estimatedPaddleTime": "About 45 min to 1.5 hr, longer with wind, weeds, or fishing traffic",
      "shuttle": "Use a short Chain of Lakes shuttle between Horseshoe Lake and Richmond City Park. Check wind and boat traffic before leaving the take-out vehicle.",
      "permits": "No route-specific paddling permit is known. Use the named public accesses, follow Minnesota boating/PFD rules, and obey posted city, lake, and DNR public-access rules.",
      "camping": "No on-route campsite is assumed for this short Richmond-to-Horseshoe connector. Use separate local campground or lodging plans if needed.",
      "campingClassification": "none",
      "summary": "Launch at Richmond City Park and finish at Horseshoe Lake for the short upstream Chain of Lakes connector. It links cleanly into the existing Horseshoe-to-Lions-Park card without duplicating the downstream dam-boundary route.",
      "accessCaveats": [
        "Richmond resolves as WAS00328 at river mile 31.5 and Horseshoe Lake resolves as WAS01770 at river mile 29.9 in Minnesota public-water-access GIS.",
        "The St. Martin gauge is upstream of the route, so make a local visual check for channel depth, weeds, and bridge clearance.",
        "Do not drift into the downstream Lions Park / Cold Spring Dam plan unless that separate card and take-out are staged."
      ],
      "watchFor": [
        "Wind and boat traffic on the Chain of Lakes.",
        "Low-water channels, weeds, bridge approaches, cold water, and private shoreline.",
        "Downstream dam and portage context if the group decides to continue beyond Horseshoe Lake."
      ]
    },
    "accessPoints": [
      {
        "id": "sauk-river-richmond",
        "name": "Sauk River, Richmond Public Water Access Site",
        "latitude": 45.4574855816426,
        "longitude": -94.53454276890497,
        "mileFromStart": 0,
        "segmentKind": "lake",
        "note": "Default put-in; Minnesota public-water-access GIS resolves WAS00328 at river mile 31.5."
      },
      {
        "id": "sauk-river-horseshoe-lake",
        "name": "Horseshoe Lake Public Water Access Site",
        "latitude": 45.44277995491589,
        "longitude": -94.5226614261946,
        "mileFromStart": 1.6,
        "segmentKind": "lake",
        "note": "Default take-out and upstream endpoint of the existing Horseshoe-to-Lions-Park card; resolves as WAS01770 at river mile 29.9."
      }
    ]
  },
  "long-prairie-river-lake-carlos-highway-29": {
    "putIn": {
      "id": "lake-carlos-state-park-access",
      "name": "Lake Carlos, Lake Carlos SPK Public Water Access Site",
      "latitude": 45.99689394611036,
      "longitude": -95.33532617557997
    },
    "takeOut": {
      "id": "long-prairie-highway-29",
      "name": "Long Prairie River, Hwy 29 Public Water Access Site",
      "latitude": 45.98009025562508,
      "longitude": -95.312126053025
    },
    "logistics": {
      "distanceLabel": "About 1.8 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr, longer if scouting or portaging the constructed rock rapids",
      "shuttle": "Stage Highway 29 first, then launch from the Lake Carlos State Park access. Confirm state-park parking rules, outlet depth, the portage-right route, and the Highway 29 landing before loading boats.",
      "permits": "No route-specific paddling permit is known. A state-park vehicle permit may be required at Lake Carlos State Park. Follow posted park, DNR public-access, boating, and PFD rules.",
      "camping": "Lake Carlos State Park has campground support at the put-in, but this short route has no assumed on-route campsite. Treat camping as endpoint basecamp only under current state-park rules.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch from Lake Carlos State Park and finish at the Highway 29 public access for the short Long Prairie headwaters connector. The route is short, but the constructed-rock-rapids portage and downstream proxy gauge make local inspection mandatory.",
      "accessCaveats": [
        "DNR Map Long Prairie places Lake Carlos State Park and the lake outlet at river mile 93.7, constructed rock rapids at 93.4, and the Highway 29 carry-in near river mile 91.9.",
        "Public-water-access GIS resolves Lake Carlos State Park and Highway 29 with coordinates; Highway 29's public-access river mile is listed as 91.0, so use the mapped access and coordinates rather than mileage alone.",
        "The Long Prairie gauge is far downstream in town and should not replace same-day checks at the Lake Carlos outlet and Highway 29 landing."
      ],
      "watchFor": [
        "Constructed rock rapids below Lake Carlos State Park with portage right.",
        "Low water, slow shallow channels, low bridges and culverts, strainers, and private banks.",
        "State-park rules, parking/vehicle permits, and lake wind at the put-in."
      ]
    },
    "accessPoints": [
      {
        "id": "lake-carlos-state-park-access",
        "name": "Lake Carlos, Lake Carlos SPK Public Water Access Site",
        "latitude": 45.99689394611036,
        "longitude": -95.33532617557997,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in at Lake Carlos State Park; DNR map places Lake Carlos State Park and the lake outlet at river mile 93.7."
      },
      {
        "id": "long-prairie-highway-29",
        "name": "Long Prairie River, Hwy 29 Public Water Access Site",
        "latitude": 45.98009025562508,
        "longitude": -95.312126053025,
        "mileFromStart": 1.8,
        "segmentKind": "creek",
        "note": "Default take-out; Minnesota public-water-access GIS resolves WAS02510 at river mile 91.0 and DNR Map Long Prairie labels the Highway 29 carry-in near river mile 91.9."
      }
    ]
  }
};
