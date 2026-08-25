// State-scoped route data. Keep entries in route-family and downstream order.
import type { RiverTripDetails } from '../../lib/types';

export const texasRiverTripDetails: Record<string, RiverTripDetails> = {
  "brazos-river-hwy16-fm4-upper-middle": {
    "putIn": {
      "id": "brazos-hwy16-bra-area-7",
      "name": "BRA Brazos River Area #7 / Hwy 16 Bridge",
      "latitude": 32.8589959,
      "longitude": -98.4133234
    },
    "takeOut": {
      "id": "brazos-fm4-dark-valley-rochelles",
      "name": "FM 4 at Dark Valley Creek / Rochelle's Canoe Rental",
      "latitude": 32.8635157,
      "longitude": -98.3019558
    },
    "logistics": {
      "distanceLabel": "About 19.5 mi",
      "estimatedPaddleTime": "About 2 days depending on flow, wind, heat, shallow gravel, rapids, dam releases, and campsite scouting",
      "shuttle": "This is a point-to-point reach. Arrange the FM 4/Dark Valley take-out and vehicle/equipment shuttle with Rochelle's Canoe Rental before launch; do not assume the bridge is a free public ramp or that an unreserved outfitter landing is available.",
      "permits": "No separate route permit is identified in the TRPA/BRA package. Follow BRA/TPWD rules, Texas boating and PFD requirements, posted private-property boundaries, and the outfitter's current reservation and fee terms.",
      "camping": "TRPA describes gravel-bar and island campsites, especially after the first 12-13 miles. BRA says camping is allowed only when confined to the state-owned bed and banks; there are no public campgrounds or facilities along the reach, so carry all water, food, shelter, waste supplies, and emergency gear.",
      "campingClassification": "sandbar_or_gravel_bar",
      "summary": "Launch at the BRA Hwy 16 river access below Possum Kingdom Dam, paddle the 19.5-mile Upper-Middle Brazos reach, and take out at the arranged FM 4/Dark Valley Bridge outfitter endpoint. Check USGS 08089000, dam releases, rainfall, wind, water quality, and current reservation/access terms before committing.",
      "accessCaveats": [
        "The Hwy 16 coordinate is a BRA access anchor at the bridge-area river access, not a surveyed wetted-edge coordinate; follow the signed BRA access path and current parking rules.",
        "The FM 4 coordinate is the bridge/outfitter access anchor. Rochelle's current website describes the trip and shuttle but access is reservation-dependent; confirm the exact landing, fee, parking, and vehicle-staging terms before departure.",
        "Adjoining river banks are private even though the riverbed and banks are state-owned for lawful recreation. Stay within the bed and banks and do not cross fences, yards, ranch roads, or private campsites.",
        "The route is remote with limited cell service and no public campgrounds. Carry redundant navigation, water, repair equipment, and an emergency communication plan."
      ],
      "watchFor": [
        "USGS discharge at or below 150 cfs, falling flow, exposed gravel, repeated scraping, or shallow riffles; postpone if the actual reach is lower than the station suggests.",
        "Rapid rises or swift current from rainfall or Possum Kingdom releases; leave the river or reach a lawful high gravel bar before conditions deteriorate.",
        "Small rapids, cliffs, strainers, and private-bank hazards; never use a cliff, ranch, or unverified bridge bank as an emergency exit.",
        "Rochelle's reservation status, FM 4 parking/landing terms, and the availability of a confirmed vehicle/equipment shuttle."
      ]
    },
    "accessPoints": [
      {
        "id": "brazos-hwy16-bra-area-7",
        "name": "BRA Brazos River Area #7 / Hwy 16 Bridge",
        "latitude": 32.8589959,
        "longitude": -98.4133234,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "BRA documents small-boat river access by the Hwy 16 bridge, approximately ten campsites, restrooms, picnic areas, no fee, and year-round operation."
      },
      {
        "id": "brazos-fm4-dark-valley-rochelles",
        "name": "FM 4 at Dark Valley Creek / Rochelle's Canoe Rental",
        "latitude": 32.8635157,
        "longitude": -98.3019558,
        "mileFromStart": 19.5,
        "segmentKind": "creek",
        "note": "TRPA maps the FM 4/Dark Valley Bridge take-out; Rochelle's current trip and location pages describe the adjacent outfitter, reservation, and shuttle relationship. Confirm current terms before launch."
      }
    ],
    "corridorId": "tx-upper-middle-brazos-hwy16-fm4",
    "corridorLabel": "Upper-Middle Brazos / John Graves Scenic Riverway",
    "continuityStatus": "verified"
  },
  "brazos-river-brazos-park-east-bledsoe-miller": {
    "putIn": {
      "id": "brazos-park-east-kayak-ramp",
      "name": "Brazos Park East Kayak/Canoe Ramp",
      "latitude": 31.5879,
      "longitude": -97.1534
    },
    "takeOut": {
      "id": "bledsoe-miller-community-dock",
      "name": "Bledsoe-Miller Community Center Dock",
      "latitude": 31.5628,
      "longitude": -97.1293
    },
    "logistics": {
      "distanceLabel": "About 4.8 mi loop",
      "estimatedPaddleTime": "About 1 hr to 3 hr depending on water level, flow, wind, and time spent at the turnaround dock",
      "shuttle": "No shuttle is required for the official loop. Launch and return to Brazos Park East after using Bledsoe-Miller as the documented turnaround/access point; if paddling one-way only, arrange a separate vehicle before departure.",
      "permits": "No route-specific paddling permit is published. Follow City of Waco park hours and rules, Texas boating/PFD requirements, posted dock restrictions, and any current construction or event closures.",
      "camping": "No on-route camping is documented. Treat the route as a day-use Waco park paddle and arrange lodging or a separately verified campground as a nearby basecamp.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Brazos Park East, paddle the official Brazos Bridges corridor to the Bledsoe-Miller Community Center Dock, and return to the launch. Check USGS 08096500, BRA release information, rainfall, water quality, and same-day park access before leaving.",
      "accessCaveats": [
        "TPWD publishes the Brazos Park East ramp and Bledsoe-Miller dock as access points with coordinates; follow signed paths and current park instructions rather than treating coordinates as a surveyed wetted edge.",
        "The gauge is downstream of the Waco trail and is used as a same-river proxy. Near the 200 cfs minimum or after rain, inspect the actual trail water and snags rather than relying on the proxy alone.",
        "The route is in an urban park corridor. Events, maintenance, construction, flooding, and water-quality advisories can change access on the day of travel.",
        "The official trail is designed for novice paddlers, but carry a float plan, fitted PFD, whistle or horn, water, and a dry phone case; do not use private banks as an unplanned bailout."
      ],
      "watchFor": [
        "Discharge at or below 200 cfs, falling flow, exposed snags, or shallow areas; treat the route as below the conservative floor.",
        "Heavy rainfall, rising water, releases, strong wind, and temporary water-quality advisories.",
        "Dock or ramp closures, park events, changing hours, and restricted channel-side paths.",
        "Private-bank boundaries and the need to return to the named public access rather than improvising a landing."
      ]
    },
    "accessPoints": [
      {
        "id": "brazos-park-east-kayak-ramp",
        "name": "Brazos Park East Kayak/Canoe Ramp",
        "latitude": 31.5879,
        "longitude": -97.1534,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Official TPWD and City of Waco launch and return point for the Brazos Bridges loop."
      },
      {
        "id": "bledsoe-miller-community-dock",
        "name": "Bledsoe-Miller Community Center Dock",
        "latitude": 31.5628,
        "longitude": -97.1293,
        "mileFromStart": 2.4,
        "segmentKind": "creek",
        "note": "Official TPWD turnaround/access dock; return upstream to complete the 4.8-mile loop."
      },
      {
        "id": "mclennan-community-college-boat-ramp",
        "name": "McLennan Community College Boat Ramp",
        "latitude": 31.5929,
        "longitude": -97.1693,
        "mileFromStart": 1.2,
        "segmentKind": "creek",
        "note": "Official alternate access point on the connected Waco paddling-trail system; not required for the Brazos Bridges loop."
      }
    ],
    "corridorId": "tx-brazos-river-waco-brazos-bridges",
    "corridorLabel": "Waco Brazos Bridges Paddling Trail",
    "continuityStatus": "verified"
  },
  "brays-bayou-fonde-brays-greenway": {
    "putIn": {
      "id": "fonde-park-brays-launch",
      "name": "Fonde Park canoe/kayak launch",
      "latitude": 29.71247,
      "longitude": -95.3232
    },
    "takeOut": {
      "id": "brays-greenway-park-brays-launch",
      "name": "Brays Greenway Park canoe/kayak launch",
      "latitude": 29.7237,
      "longitude": -95.2835
    },
    "logistics": {
      "distanceLabel": "About 5.7 mi",
      "estimatedPaddleTime": "About 2 hr to 4 hr depending on current, portages, bridge/channel conditions, launch status, and construction",
      "shuttle": "Stage a vehicle at Brays Greenway Park only after confirming current park access and launch conditions, then drive to Fonde Park. Do not leave vehicles in restricted areas or within flood-control/construction zones.",
      "permits": "No route-specific paddling permit is published. Follow Houston Parks and Recreation hours, posted launch rules, Texas boating/PFD requirements, and any Harris County Flood Control closure or construction notice.",
      "camping": "No on-route camping is documented. Use urban lodging or separately verified nearby campgrounds; do not camp in parks, on bayou banks, or in the flood-control corridor.",
      "campingClassification": "nearby_basecamp",
      "summary": "A guarded urban day paddle linking the documented Fonde and Brays Greenway launches. Check the Gessner gauge, NOAA stage, rainfall, water-quality advisories, and same-day construction/access conditions before committing.",
      "accessCaveats": [
        "Launch status and park access can change with construction, events, maintenance, and flooding; verify before departure.",
        "The listed coordinates are public park/launch anchors, not survey-grade wetted-edge points; follow signed paths and use only the designated launch areas.",
        "The bayou banks and flood-control structures are not general public access; do not climb out except at the named launch areas or a clearly lawful emergency location."
      ],
      "watchFor": [
        "Rising water, rapidly increasing discharge, bridge turbulence, and NOAA action-stage or flood-stage warnings.",
        "Construction barriers, channel work, debris, fencing, culverts, and blocked or relocated launch paths.",
        "Urban runoff and bacteria exposure after rainfall; avoid contact and never drink untreated water.",
        "Heat, traffic, limited shade, and a take-out that may be difficult to recognize from the channel."
      ]
    },
    "accessPoints": [
      {
        "id": "fonde-park-brays-launch",
        "name": "Fonde Park canoe/kayak launch",
        "latitude": 29.71247,
        "longitude": -95.3232,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Named public launch documented by Houston District I at 2600 Lidstone Street; the coordinate identifies the visible path to the north bank rather than the interior park pin."
      },
      {
        "id": "brays-greenway-park-brays-launch",
        "name": "Brays Greenway Park canoe/kayak launch",
        "latitude": 29.7237,
        "longitude": -95.2835,
        "mileFromStart": 5.7,
        "segmentKind": "creek",
        "note": "Named public launch at 8001 Hockley Street; verify current opening and channel-side approach before launch."
      }
    ],
    "corridorId": "tx-brays-bayou-fonde-brays-greenway",
    "corridorLabel": "Brays Bayou urban paddling corridor",
    "continuityStatus": "verified"
  },
  "big-cypress-bayou-lake-o-pines-spillway-jefferson": {
    "putIn": {
      "id": "lake-o-pines-spillway-boat-ramp",
      "name": "Lake O' the Pines Spillway Boat Ramp",
      "latitude": 32.747756,
      "longitude": -94.499566
    },
    "takeOut": {
      "id": "jefferson-big-cypress-ramp",
      "name": "Jefferson Big Cypress Bayou Ramp",
      "latitude": 32.758287,
      "longitude": -94.340743
    },
    "logistics": {
      "distanceLabel": "About 16.5 mi",
      "estimatedPaddleTime": "About 6 hr to 9 hr at ordinary releases; plan a full day because of distance, wood, wind, and the absence of intermediate public access",
      "shuttle": "Stage the Jefferson take-out first, then drive to the USACE Lake O' the Pines spillway ramp. Do not plan an improvised bailout: TPWD reports no public access along the intervening 16.5-mile reach.",
      "permits": "No route-specific paddling permit is identified for the two public ramps. Follow USACE, City of Jefferson, Texas boating, PFD, hunting, and posted access rules; check for closures and release notices before launching.",
      "camping": "Treat this as a day trip. No designated overnight campsite is documented along the route; nearby Lake O' the Pines or Jefferson lodging/campgrounds are separate basecamp options and must not be represented as on-route camping.",
      "campingClassification": "nearby_basecamp",
      "summary": "Run from the Lake O' the Pines spillway to the Jefferson ramp only when USGS 07346000 is at or above the conservative 40 cfs minimum-only floor and the release trend is stable. The floor is based on TPWD's recommended October baseflow, not a safety guarantee.",
      "accessCaveats": [
        "TPWD's 2024 report lists the USACE spillway ramp as public and in good condition but shallow during low flow, and the Jefferson ramp as public and in good condition.",
        "TPWD reports no public access points between the spillway and Jefferson; carry navigation, repair, hydration, and emergency equipment for a committed reach.",
        "Lake O' the Pines releases control the reach and can change flow quickly. Check same-day USGS discharge/gage height and any USACE release information immediately before launching.",
        "The reach has riffles, pools, backwaters, variable depths, and common large woody debris. Scout hazards from shore where possible and do not assume the threshold clears strainers or release hazards.",
        "Keep to the navigable corridor and named public endpoints. Surrounding banks are private, and TPWD reports water-quality impairments and fish-consumption advisories in the lower Big Cypress/Caddo system.",
        "This package intentionally has no route-gallery image until a rights-clean, route-specific asset is verified."
      ],
      "watchFor": [
        "USGS discharge below 40 cfs, falling flow, or a shallow spillway ramp; treat the route as below the conservative floor.",
        "Rapid release-driven rises, high stage, or heavy rain upstream; leave the water and reassess rather than relying on the minimum-only score.",
        "Large woody debris, strainers, riffles, and changing channel depth through the long unbroken reach.",
        "Heat, thunderstorms, motorboat traffic downstream, alligators, hunting seasons, and limited cell/access options.",
        "Private-bank boundaries and the lack of intermediate public bailouts."
      ]
    },
    "accessPoints": [
      {
        "id": "lake-o-pines-spillway-boat-ramp",
        "name": "Lake O' the Pines Spillway Boat Ramp",
        "latitude": 32.747756,
        "longitude": -94.499566,
        "mileFromStart": 0,
        "segmentKind": "lake",
        "note": "USACE public ramp; TPWD reports good condition but shallow during low flow."
      },
      {
        "id": "jefferson-big-cypress-ramp",
        "name": "Jefferson Big Cypress Bayou Ramp",
        "latitude": 32.758287,
        "longitude": -94.340743,
        "mileFromStart": 16.5,
        "segmentKind": "creek",
        "note": "City of Jefferson public ramp and planned take-out."
      }
    ],
    "corridorId": "tx-big-cypress-bayou-lake-o-pines-jefferson",
    "corridorLabel": "Lower Big Cypress Bayou",
    "continuityStatus": "verified"
  },
  "village-creek-fm418-sh327": {
    "putIn": {
      "id": "fm-418-boat-launch",
      "name": "FM 418 Boat Launch",
      "latitude": 30.397794,
      "longitude": -94.265024
    },
    "takeOut": {
      "id": "tx-327-boat-launch",
      "name": "TX 327 Boat Launch",
      "latitude": 30.346944,
      "longitude": -94.239385
    },
    "logistics": {
      "distanceLabel": "About 8.6 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr at ordinary levels, slower near the floor or when sandbars, logjams, heat, or shuttle delays stack up",
      "shuttle": "Stage the TX 327 take-out first, then drive back north to FM 418. Inspect both launches before leaving vehicles because they are simple unpaved bridge-side access points rather than staffed ramps or park marinas.",
      "permits": "No route-specific paddling permit is known for this segment. Follow Texas boating and PFD rules, use only the named public launches, and obey current Big Thicket National Preserve regulations and any posted bridge-access signs.",
      "camping": "Treat the standard FM 418 to TX 327 run as a day trip. For longer multi-segment Village Creek trips, Big Thicket says overnight camping permits are free through the visitor center, and Village Creek State Park is a nearby base-camp option farther downstream.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at FM 418 and take out at TX 327 for the easiest upper Village Creek day in Big Thicket. Use USGS 08041500 near Kountze with a conservative 200 cfs floor, then make a same-day call on water level, wood, weather, and private-boundary discipline before committing.",
      "accessCaveats": [
        "NPS identifies both FM 418 and TX 327 as TxDOT-managed canoe/kayak/small-boat launches with auto and trailer parking, but both are still unpaved bridge accesses rather than improved ramps.",
        "The preserve does not provide boat rentals or shuttles. Arrange a self-shuttle or local outfitter plan before launching.",
        "TPWD says Village Creek water quality is variable and not recommended for drinking. Bring your own water even on a short family-style paddle.",
        "Big Thicket boundaries can sit just above the high-water line in places. Respect preserve boundary markers and do not treat private banks as casual picnic or bailout stops.",
        "This route uses a conservative minimum-only threshold, not a full ideal-range recommendation. If the gauge is below about 200 cfs, expect more shallow routing, sandbar scraping, and log avoidance."
      ],
      "watchFor": [
        "Flows near or below about 200 cfs, or stage below roughly 3 ft, when NPS says exposed sandbars and logs become more common.",
        "Stage around or above about 10 ft, rising water, or fresh heavy rain, when NPS warns the creek can become swift and hazardous despite the flatwater setting.",
        "Snags, logjams, overhanging limbs, sandbars, and short portages around obstructions, especially after storms or on low summer water.",
        "Summer heat, insects, thunderstorms, cold water outside the warm season, and a longer half-day than the calm scenery first suggests.",
        "Private banks between the launches and the temptation to wander above the ordinary high-water line instead of staying with the public access points and legal stream corridor."
      ]
    }
  },
  "guadalupe-river-fm766-sh72": {
    "putIn": {
      "id": "fm-766-hells-gate",
      "name": "FM 766 (Hell's Gate)",
      "latitude": 29.1472,
      "longitude": -97.3177
    },
    "takeOut": {
      "id": "sh-72-access-point",
      "name": "SH 72",
      "latitude": 29.0903,
      "longitude": -97.3296
    },
    "logistics": {
      "distanceLabel": "About 6.6 mi",
      "estimatedPaddleTime": "About 2 hr to 4 hr at ordinary levels, longer if low water, wood, weather, or the dam-remnant portage slows the day",
      "shuttle": "Stage the SH 72 take-out first, then drive back to FM 766. Inspect both bridge-side access points before leaving vehicles because they are simple highway accesses rather than staffed ramps or park marinas.",
      "permits": "No route-specific paddling permit is known for this segment. Follow Texas boating and PFD rules, use only the named public launches, and obey posted bridge-access signs and any current TPWD guidance.",
      "camping": "Treat this as a day trip. No established route camping or endpoint campground is documented in the current TPWD trail material for FM 766 to SH 72.",
      "campingClassification": "none",
      "summary": "Launch at Hell's Gate and take out at SH 72 for the shorter Cuero segment of the Guadalupe Valley Paddling Trail. Use USGS 08175800 at Cuero with a conservative 200 cfs floor, then make a same-day call on weather, current, wood, and the remnant-dam portage before committing.",
      "accessCaveats": [
        "TPWD identifies FM 766 and SH 72 as public access points with posted GPS coordinates, but both are still bridge-side highway accesses rather than improved park ramps.",
        "TPWD identifies Hwy 183 as an emergency take-out about 2.6 miles below SH 72 if the planned exit becomes unusable or the group continues only with a separate downstream plan.",
        "The Cuero Guadalupe can see rainfall-driven high flows and undesirable water-quality conditions. Bring your own drinking water and treat storm runoff conservatively.",
        "This route uses a conservative minimum-only threshold, not a full ideal-range recommendation. Even at moderate readings, the remnant-dam portage and low-water wood still require attention."
      ],
      "watchFor": [
        "Mandatory portage around the remnants of a dam about 2.5 miles below FM 766; scout early, land with margin, and do not run it blindly.",
        "Flows near or below about 200 cfs, when TPWD warns snags can be more prominent and the run can get scrape-prone.",
        "High or rising water after rainfall, when current speeds up, water quality can degrade, and the portage line becomes less forgiving.",
        "Faster riffles, floating wood, sweepers, strainers, and changing lines around bridge approaches and bends.",
        "Private banks outside the public launches and any narrow legal portage corridor around hazards."
      ]
    }
  },
  "guadalupe-river-sh72-fm236": {
    "putIn": {
      "id": "sh-72-access-point",
      "name": "SH 72",
      "latitude": 29.0903,
      "longitude": -97.3296
    },
    "takeOut": {
      "id": "fm-236-access-point",
      "name": "FM 236",
      "latitude": 29.0514,
      "longitude": -97.2647
    },
    "logistics": {
      "distanceLabel": "About 7.2 mi",
      "estimatedPaddleTime": "About 2 hr to 4 hr at ordinary levels, longer if low water, weather, or wood slows the day",
      "shuttle": "Stage FM 236 first, then drive back to SH 72. Inspect both bridge-side access points before leaving vehicles because they are simple highway accesses rather than staffed ramps or park marinas.",
      "permits": "No route-specific paddling permit is known for this segment. Follow Texas boating and PFD rules, use only the named public launches, and obey posted bridge-access signs and any current TPWD guidance.",
      "camping": "Treat this as a day trip. No established route camping or endpoint campground is documented in the current TPWD trail material for SH 72 to FM 236.",
      "campingClassification": "none",
      "summary": "Launch at SH 72 and take out at FM 236 for the lower official Guadalupe Valley segment. Use USGS 08175800 at Cuero with a conservative 200 cfs floor, then make a same-day call on weather, current, wood, and water quality before committing.",
      "accessCaveats": [
        "TPWD identifies SH 72 and FM 236 as public access points with posted GPS coordinates, but both are still bridge-side highway accesses rather than improved park ramps.",
        "TPWD identifies Hwy 183 as an emergency take-out about 2.6 miles below SH 72 if the planned exit becomes unusable or the group needs to shorten the trip.",
        "The Cuero Guadalupe can see rainfall-driven high flows and undesirable water-quality conditions. Bring your own drinking water and treat storm runoff conservatively.",
        "This route uses a conservative minimum-only threshold, not a full ideal-range recommendation. If the gauge is below about 200 cfs, expect more shallow routing, sandbar scraping, and log avoidance."
      ],
      "watchFor": [
        "Flows near or below about 200 cfs, when shallow riffles, exposed gravel, and wood become more likely.",
        "High or rising water after rainfall, when current speeds up, bridge-side landings get less forgiving, and water quality can degrade.",
        "Snags, floating wood, overhanging limbs, and changing lines around bends and bridge approaches.",
        "Heat, wind on open bends, private banks outside the public launches, and a longer downstream finish than the quiet scenery first suggests."
      ]
    }
  },
  "guadalupe-river-fm766-fm236": {
    "putIn": {
      "id": "fm-766-hells-gate",
      "name": "FM 766 (Hell's Gate)",
      "latitude": 29.1472,
      "longitude": -97.3177
    },
    "takeOut": {
      "id": "fm-236-access-point",
      "name": "FM 236",
      "latitude": 29.0514,
      "longitude": -97.2647
    },
    "logistics": {
      "distanceLabel": "About 13.8 mi",
      "estimatedPaddleTime": "About 4 hr to 8 hr depending on level, weather, the dam-remnant portage, and how efficiently the group moves",
      "shuttle": "Stage FM 236 first, then drive back to FM 766. Inspect both bridge-side access points before leaving vehicles because they are simple highway accesses rather than staffed ramps or park marinas.",
      "permits": "No route-specific paddling permit is known for this segment. Follow Texas boating and PFD rules, use only the named public launches, and obey posted bridge-access signs and any current TPWD guidance.",
      "camping": "Treat this as a long day trip. No established route camping or endpoint campground is documented in the current TPWD trail material for the full FM 766 to FM 236 run.",
      "campingClassification": "none",
      "summary": "Launch at Hell's Gate and take out at FM 236 for the full official Guadalupe Valley trail. Use USGS 08175800 at Cuero with a conservative 200 cfs floor, then make a same-day call on weather, current, wood, and the remnant-dam portage before committing to the full distance.",
      "accessCaveats": [
        "TPWD identifies FM 766, SH 72, and FM 236 as public access points with posted GPS coordinates, but all are still bridge-side highway accesses rather than improved park ramps.",
        "TPWD identifies Hwy 183 as an emergency take-out between SH 72 and FM 236 if the planned finish becomes impractical or the group needs to shorten the day.",
        "The Cuero Guadalupe can see rainfall-driven high flows and undesirable water-quality conditions. Bring your own drinking water and treat storm runoff conservatively.",
        "This route uses a conservative minimum-only threshold, not a full ideal-range recommendation. Even at moderate readings, the remnant-dam portage and long shuttle still require attention."
      ],
      "watchFor": [
        "Mandatory portage around the remnants of a dam about 2.5 miles below FM 766; scout early, land with margin, and do not run it blindly.",
        "Flows near or below about 200 cfs, when TPWD warns snags can be more prominent and the run can get scrape-prone.",
        "High or rising water after rainfall, when current speeds up, water quality can degrade, and the portage line becomes less forgiving.",
        "Faster riffles, floating wood, sweepers, strainers, and changing lines around bridge approaches and bends.",
        "Private banks outside the public launches and a long downstream finish that can punish a late start in heat or headwind."
      ]
    }
  },
  "guadalupe-river-kreutzberg-canyon-bergheim-campground": {
    "putIn": {
      "id": "kreutzberg-canyon-natural-area",
      "name": "Kreutzberg Canyon Natural Area",
      "latitude": 29.8998365,
      "longitude": -98.6420277
    },
    "takeOut": {
      "id": "bergheim-campground-landing",
      "name": "Bergheim Campground and River Outfitters landing",
      "latitude": 29.8928415,
      "longitude": -98.5582463
    },
    "logistics": {
      "distanceLabel": "About 12.2 mi",
      "estimatedPaddleTime": "About 5 hr to 8 hr depending on flow, low-water dragging, scouting, group speed, wind, and Bergheim landing or shuttle timing",
      "shuttle": "Stage Bergheim first only after confirming current private-boat landing, parking, and shuttle terms, then drive back to Kreutzberg Canyon Natural Area. Use the county park river frontage only during posted dawn-to-dusk hours and treat both coordinates as arrival anchors rather than exact water-entry survey points.",
      "permits": "No route-specific paddling permit is published. Bergheim landing, day-use, camping, or parking fees can apply at the take-out, and prior arrangements may be required for private boats. Follow Texas boating and PFD rules, posted county-park rules, and current Bergheim policies.",
      "camping": "Use Bergheim Campground as the endpoint campground only with current paid arrangements. Do not infer legal camping from Kreutzberg Canyon Natural Area, private banks, gravel bars, road crossings, or any unposted riverside stop along the 12.2-mile route.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Kreutzberg Canyon Natural Area and take out at Bergheim Campground for a long Upper Guadalupe day run. Use USGS 08167500 near Spring Branch with TRPA's conservative Upper Guadalupe range, then make a same-day call on flow trend, visible low-water crossings, private-bank limits, county-park hours, and Bergheim landing terms.",
      "accessCaveats": [
        "Kendall County confirms Kreutzberg Canyon Natural Area has 1,700 feet of Guadalupe River frontage suitable for kayaking and is open dawn to dusk, but it is still a natural-area access rather than a staffed paddling livery.",
        "Bergheim publishes paid private-boat landing fees and shuttle options. Confirm current fees, parking, check-out timing, and whether prior arrangements are required before depending on it as the take-out.",
        "TRPA's map links resolve access anchors, not exact wetted-edge launch points. Choose the actual water entry or exit only where current signs, river level, bank conditions, and staff or park rules allow.",
        "The Spring Branch gauge is downstream of this segment and is used as the product-supported Upper Guadalupe flow check; it does not replace visual scouting of the county-park access, crossings, or Bergheim landing."
      ],
      "watchFor": [
        "Low flows near or below TRPA's 100 cfs floor, when exposed limestone, scraping, dragging, and poor public stopping options become more likely.",
        "High or rising Hill Country water after storms, when the Guadalupe can rise quickly and low-water crossings, debris, trees, and bends can become consequential.",
        "Long no-exit stretches with mostly private banks; stop only at legal public or paid access points unless a direct safety portage is unavoidable.",
        "Rock gardens, ledges, shallow riffles, strainers, fences, and changing lines around bends and bridge or road-crossing approaches.",
        "Endpoint timing: Kreutzberg is dawn-to-dusk and Bergheim day-use check-out is sunset, so a late start can create a practical access problem."
      ]
    },
    "accessPoints": [
      {
        "id": "kreutzberg-canyon-natural-area",
        "name": "Kreutzberg Canyon Natural Area",
        "latitude": 29.8998365,
        "longitude": -98.6420277,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "TRPA map-link access anchor; Kendall County confirms public Guadalupe River frontage suitable for kayaking and dawn-to-dusk park hours."
      },
      {
        "id": "bergheim-campground-landing",
        "name": "Bergheim Campground and River Outfitters landing",
        "latitude": 29.8928415,
        "longitude": -98.5582463,
        "mileFromStart": 12.2,
        "segmentKind": "creek",
        "note": "TRPA map-link access anchor; Bergheim publishes paid private-boat landing and endpoint campground terms."
      }
    ]
  },
  "guadalupe-river-fm3351-state-park": {
    "putIn": {
      "id": "fm-3351-bergheim-crossing",
      "name": "FM 3351 Crossing (Bergheim)",
      "latitude": 29.8922,
      "longitude": -98.559
    },
    "takeOut": {
      "id": "guadalupe-river-state-park-aw-access",
      "name": "Guadalupe River State Park river access",
      "latitude": 29.876,
      "longitude": -98.4858
    },
    "logistics": {
      "distanceLabel": "About 7.8 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr at ordinary levels, longer if scouting, low-water dragging, Edge Falls Road debris, wind, or shuttle delays stack up",
      "shuttle": "Stage Guadalupe River State Park first, then drive back to FM 3351 / Bergheim. Confirm state-park day-use entry or camping reservations, inspect the park landing, and use only the AW-described FM 3351 public highway-easement access or a separately arranged Bergheim Campground access plan.",
      "permits": "No route-specific paddling permit is published. Normal Guadalupe River State Park entry or camping fees may apply at the take-out. Follow Texas boating and PFD rules, posted bridge and park rules, and current access signs.",
      "camping": "Use Guadalupe River State Park as the endpoint campground or basecamp if you have a valid reservation or day-use plan. Do not infer legal camping from private banks, gravel bars, Edge Falls Road, or the FM 3351 highway-easement access.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at FM 3351 / Bergheim and take out at Guadalupe River State Park for the upstream Upper Guadalupe day run. Use USGS 08167500 near Spring Branch with TRPA's conservative Upper Guadalupe range, then make a same-day call on visible level, Edge Falls Road debris, private-bank limits, and storm risk.",
      "accessCaveats": [
        "American Whitewater publishes FM 3351 and Guadalupe River State Park as access anchors. Treat these as arrival points, then follow current signs, traffic, parking, and safe-bank conditions for the exact water entry or exit.",
        "FM 3351 public access is described as river-left highway-easement access via a dirt or gravel road. If that access is posted, blocked, or unsafe, skip the route instead of inventing a private-bank launch.",
        "Guadalupe River State Park access is fee-controlled and can reach capacity. Reserve day-use or camping passes when needed and confirm current park river access before leaving the shuttle.",
        "The Spring Branch gauge is downstream of the state-park take-out and is used as an Upper Guadalupe flow check, not as a substitute for scouting the FM 3351 launch, Edge Falls Road, and the park landing."
      ],
      "watchFor": [
        "Rock Pile and Dog Leg Class II rock-garden rapids in the upper miles, especially when the gauge is near the low side or rising.",
        "Edge Falls Road low-water crossing around mile 3.6; American Whitewater says it can clog with debris and records an entrapment drowning history there.",
        "Flows near or below about 100 cfs, when the TRPA Upper Guadalupe minimum is not met and exposed limestone, dragging, or private-bank portage choices become more likely.",
        "High or rising water after storms, when Hill Country current, strainers, crossings, and low banks can change quickly.",
        "Private-property boundaries, limited exits, hot-weather exposure, crowded state-park access, and the temptation to continue below the state park without the separate TPWD route plan."
      ]
    },
    "accessPoints": [
      {
        "id": "fm-3351-bergheim-crossing",
        "name": "FM 3351 Crossing (Bergheim)",
        "latitude": 29.8922,
        "longitude": -98.559,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "American Whitewater access anchor; public highway-easement access is described at river left downstream of the bridge."
      },
      {
        "id": "guadalupe-river-state-park-aw-access",
        "name": "Guadalupe River State Park river access",
        "latitude": 29.876,
        "longitude": -98.4858,
        "mileFromStart": 7.8,
        "segmentKind": "creek",
        "note": "American Whitewater access anchor for the state-park take-out; state-park entry, hours, and capacity rules apply."
      }
    ]
  },
  "guadalupe-river-state-park-nichols-landing": {
    "putIn": {
      "id": "guadalupe-river-state-park-paddling-access",
      "name": "Guadalupe River State Park paddling access",
      "latitude": 29.872,
      "longitude": -98.49
    },
    "takeOut": {
      "id": "nichols-landing-spechts-crossing",
      "name": "Nichol's Landing (Specht's Crossing)",
      "latitude": 29.879,
      "longitude": -98.448
    },
    "logistics": {
      "distanceLabel": "About 5.0 mi",
      "estimatedPaddleTime": "About 2 hr to 4 hr at ordinary levels, longer if low-water dragging, the mandatory carry, scouting, wind, or shuttle delays stack up",
      "shuttle": "Stage Nichol's Landing first, then drive back to Guadalupe River State Park. Confirm state-park entry, river access, and any current Nichol's Landing parking or access fees before leaving vehicles.",
      "permits": "No route-specific paddling permit is published. Normal Guadalupe River State Park entrance or camping fees may apply at the put-in, and Nichol's Landing can have access or parking fees. Follow Texas boating/PFD rules and current posted access rules.",
      "camping": "Guadalupe River State Park has drive-up electric campsites, walk-in tent sites, and primitive sites at the put-in, so this route works as an endpoint-campground basecamp trip. Do not infer legal camping from private banks, gravel bars, or the low-water-crossing portage corridor.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Guadalupe River State Park and take out at Nichol's Landing for TPWD's five-mile state-park Upper Guadalupe trail. Use USGS 08167500 near Spring Branch with TRPA's conservative Upper Guadalupe range, then make a same-day call on low-water dragging, the mandatory carry, rising water, wood, and private-bank limits.",
      "accessCaveats": [
        "TPWD publishes both endpoint coordinates, but the state-park access is fee-controlled and Nichol's Landing is a simple river-access site rather than a staffed paddling center.",
        "The Spring Branch gauge is the product-supported Upper Guadalupe flow check used by this route family and the downstream Nichol's Landing trail. It sits just below this five-mile segment, so still scout the low-water crossing and visible level before launching.",
        "TPWD says private-property use outside portaging hazards can be trespassing. Keep stops to public access points or direct hazard-portage corridors.",
        "This route uses broad Upper Guadalupe TRPA flow guidance rather than a manager-published rapid-by-rapid band for the state-park reach. Downgrade the day if weather, gauge trend, or local access conditions are moving the wrong way."
      ],
      "watchFor": [
        "The mandatory exit and carry around the low-water crossing about 0.5 mile below the park boundary.",
        "Flows near or below 100 cfs, when TRPA's Upper Guadalupe minimum is not met and dragging or exposed limestone hazards become more likely.",
        "High or rising water after rain, when Hill Country current, strainers, and private-bank portage choices become more consequential.",
        "Wood, sweepers, slick limestone, hot-weather exposure, crowded access areas, and the temptation to continue below Nichol's Landing without the separate downstream route plan."
      ]
    },
    "accessPoints": [
      {
        "id": "guadalupe-river-state-park-paddling-access",
        "name": "Guadalupe River State Park paddling access",
        "latitude": 29.872,
        "longitude": -98.49,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default TPWD put-in at Guadalupe River State Park; state-park entry or camping fees may apply."
      },
      {
        "id": "nichols-landing-spechts-crossing",
        "name": "Nichol's Landing (Specht's Crossing)",
        "latitude": 29.879,
        "longitude": -98.448,
        "mileFromStart": 5,
        "segmentKind": "creek",
        "note": "Default TPWD take-out for the state-park paddling trail and put-in for the downstream Upper Guadalupe route."
      }
    ]
  },
  "guadalupe-river-nichols-landing-rebecca-creek": {
    "putIn": {
      "id": "nichols-landing-spechts-crossing",
      "name": "Nichol's Landing (Specht's Crossing)",
      "latitude": 29.8794,
      "longitude": -98.4483
    },
    "takeOut": {
      "id": "rebecca-creek-crossing",
      "name": "Rebecca Creek Crossing",
      "latitude": 29.8881,
      "longitude": -98.3685
    },
    "logistics": {
      "distanceLabel": "About 9.9 mi",
      "estimatedPaddleTime": "About 3 hr to 6 hr at ordinary levels, longer if scouting, low-water dragging, portages, or shuttle delays stack up",
      "shuttle": "Stage the Rebecca Creek Crossing take-out first, then drive back to Nichol's Landing. FM 311 is an official alternate access 5.4 miles below the put-in and can be used as a shorter take-out or bailout when the full reach is too much.",
      "permits": "No route-specific paddling permit is published. Nichol's Landing has seasonal/weekend parking fees, Rebecca Creek and FM 311 have uphill shuttle parking, and groups should follow Texas boating/PFD rules plus current posted access rules.",
      "camping": "Treat the route itself as a day trip. TPWD lists nearby outfitters and campgrounds in the Spring Branch corridor, but the route package does not treat private banks, portage areas, or visible gravel bars as legal on-route campsites.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Nichol's Landing and take out at Rebecca Creek Crossing for the official Upper Guadalupe whitewater trail. Use USGS 08167500 near Spring Branch with TRPA's conservative 100 cfs floor and 300-1,200 cfs ideal window, then make a same-day call on rapids, wood, weather, and group skill.",
      "accessCaveats": [
        "TPWD publishes all three access coordinates, but the parking areas are simple river-access and shuttle sites rather than staffed take-outs.",
        "Nichol's Landing can charge seasonal or weekend access/parking fees, while FM 311 and Rebecca Creek parking sit uphill from the water.",
        "Private shoreline is a major constraint on this navigable reach. Use public accesses and direct hazard portages only; do not treat banks as casual rest, scouting, or camping areas.",
        "This route uses TRPA's broad Upper Guadalupe guidance as a conservative two-sided model, not a manager-published rapid-by-rapid band. Scout visually and downgrade if the gauge trend or weather is moving the wrong way."
      ],
      "watchFor": [
        "Mueller Falls about 1.5 miles below FM 311 and Rust Falls about 5 miles below FM 311; inspect chutes and portage hazards with margin.",
        "Flows near or below 100 cfs, when TRPA's minimum is not met and TPWD's drought warning can mean dragging and exposed hazards.",
        "High or rising water after rain, which can make Hill Country rapids, strainers, and private-bank portage choices more consequential.",
        "Wood, sweepers, strainers, slick limestone shelves, hot-weather exposure, locked or crowded access areas, and the temptation to improvise a take-out before Rebecca Creek."
      ]
    },
    "accessPoints": [
      {
        "id": "nichols-landing-spechts-crossing",
        "name": "Nichol's Landing (Specht's Crossing)",
        "latitude": 29.8794,
        "longitude": -98.4483,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default TPWD put-in for the Upper Guadalupe Nichol's Landing trail."
      },
      {
        "id": "fm-311-crossing",
        "name": "FM 311 Crossing",
        "latitude": 29.8608,
        "longitude": -98.3839,
        "mileFromStart": 5.4,
        "segmentKind": "creek",
        "note": "Official alternate access and shorter take-out with uphill shuttle parking."
      },
      {
        "id": "rebecca-creek-crossing",
        "name": "Rebecca Creek Crossing",
        "latitude": 29.8881,
        "longitude": -98.3685,
        "mileFromStart": 9.9,
        "segmentKind": "creek",
        "note": "Default TPWD take-out for the full Nichol's Landing trail."
      }
    ]
  },
  "comal-river-hinman-island-last-public-exit": {
    "putIn": {
      "id": "hinman-island-park",
      "name": "Hinman Island Park",
      "latitude": 29.7011,
      "longitude": -98.1067
    },
    "takeOut": {
      "id": "last-public-exit-comal",
      "name": "Last Public Exit",
      "latitude": 29.7046,
      "longitude": -98.1161
    },
    "logistics": {
      "distanceLabel": "About 1.5 mi",
      "estimatedPaddleTime": "About 1 hr to 3 hr depending on crowding, chute handling, river rules, and whether the group stops or portages",
      "shuttle": "Stage the Last Public Exit first, then return to Hinman Island Park. The route is short, urban, and access-controlled, so parking, paid access, wristbands, outfitter shuttles, and seasonal crowd rules matter more than driving distance.",
      "permits": "No separate route permit was found, but New Braunfels manages river access rules, wristbands, parking, container restrictions, vessel limits, and temporary closures. Canoes and kayaks may not exceed 18 feet and may not use Last Tubers Exit on weekends or holidays.",
      "camping": "Treat this as a day-use urban river only. New Braunfels park rules prohibit camping and overnight lodging in all city parks, and the route does not infer legal camping from riverfront parks, outfitters, or private banks.",
      "campingClassification": "none",
      "summary": "Launch at Hinman Island Park and finish at the Last Public Exit for the Comal River Water Trail through New Braunfels. Use USGS 08169000 with the City's 100-500 cfs open recreation band, then check posted river status, crowd rules, Tube Chute operations, and exit restrictions before committing.",
      "accessCaveats": [
        "National Recreation Trails names Hinman Island Park as the start and the Last Public Exit as the finish; Paddle Today stores both as public access anchors rather than guessed wetted-edge launch points.",
        "New Braunfels requires river users to exit at the Last Public Exit on this route; do not continue into the lower Guadalupe or toward downstream dam hazards without a separate route plan.",
        "Canoes and kayaks cannot exceed 18 feet and the City says they may not use Last Tubers Exit on weekends or holidays, so hard-boat users need a weekday or locally approved take-out plan.",
        "Parking, river access fees, wristbands, disposable-container bans, and outfitter rules can change seasonally. Posted City rules control on arrival."
      ],
      "watchFor": [
        "Tube Chute and Clemens Dam handling; hard boats may need to portage when tubing or lifeguard operations are active.",
        "Two low-head dams and other short urban hydraulic features documented by American Whitewater; scout or portage rather than following tubes blindly.",
        "Flows at or above 500 cfs, when the City moves into extreme-caution conditions, and 600 cfs or above, when temporary closure applies.",
        "Crowded summer/weekend traffic, limited maneuvering room at chutes and exits, bridge-jumping violations, alcohol/container enforcement, and urban storm runoff."
      ]
    },
    "accessPoints": [
      {
        "id": "hinman-island-park",
        "name": "Hinman Island Park",
        "latitude": 29.7011,
        "longitude": -98.1067,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default National Recreation Trails upstream start and city-managed Comal River access area."
      },
      {
        "id": "last-public-exit-comal",
        "name": "Last Public Exit",
        "latitude": 29.7046,
        "longitude": -98.1161,
        "mileFromStart": 1.5,
        "segmentKind": "creek",
        "note": "Required public exit for the Comal route before the lower Guadalupe hazard corridor; stored as the S Union Avenue / W Lincoln Street access anchor rather than a guessed wetted-edge point."
      }
    ]
  },
  "san-antonio-river-mission-reach": {
    "putIn": {
      "id": "roosevelt-park-mission-reach",
      "name": "Roosevelt Park",
      "latitude": 29.4015,
      "longitude": -98.4883
    },
    "takeOut": {
      "id": "camino-coahuilteca-mission-espada",
      "name": "Camino Coahuilteca",
      "latitude": 29.3196,
      "longitude": -98.4489
    },
    "logistics": {
      "distanceLabel": "About 8.0 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr by TPWD's full-route estimate, or 2 hr to 8 hr in SARA's broader Mission Reach planning window depending on level, chutes, portage timing, heat, and group pace",
      "shuttle": "Stage the Camino Coahuilteca take-out near Mission Espada first, then drive back to Roosevelt Park near Lone Star Boulevard. Concepcion Park, VFW Boulevard, Padre Park, Espada Park, and Mission Parkway are official coordinate-backed access or bailout points if the group wants a shorter route.",
      "permits": "The City says no permit is required for non-motorized water recreation in the Mission Reach zone, but use is sunrise to sunset only. Follow Texas boating/PFD rules, stay inside the published boundaries, obey posted signs, avoid body contact with the water, and remove watercraft at the end of each day.",
      "camping": "Treat Mission Reach as a day-use urban paddling trail only. City rules require vessels to be removed at the end of each day and limit use to sunrise-to-sunset water recreation; nearby parks and missions are not evidence of legal route camping.",
      "campingClassification": "none",
      "summary": "Launch at Roosevelt Park and finish at Camino Coahuilteca for the full official Mission Reach route through San Antonio's restored river corridor. Use USGS 08178000 with a conservative 200 cfs San Antonio River floor, then check SARA current conditions, recent rain, bacteria context, and the Espada Dam portage before committing.",
      "accessCaveats": [
        "TPWD publishes Roosevelt Park, Concepcion Park, VFW Boulevard, Padre Park, Espada Park, Mission Parkway, and Camino Coahuilteca as access points with GPS coordinates; SARA says access points are marked by blue poles and may be steps or natural paths.",
        "The City defines the Mission Reach boundary from Lone Star Boulevard by Roosevelt Park to Camino Coahuilteca by Mission Espada and says boundaries may change, so posted local signs control on arrival.",
        "SARA and the City both require a portage around Espada Dam about 1,200 feet south of SE Military Drive, with reentry below Mission Parkway.",
        "The Mission Reach is urban and largely exposed. SARA explicitly says there is no shade, cell access is available, and paddlers should bring ample drinking water.",
        "This route uses conservative corridor-level TRPA flow guidance, not a manager-authored exact Mission Reach gauge table. When USGS 08178000 is below about 200 cfs, expect a below-floor score and verify chute/portage conditions visually."
      ],
      "watchFor": [
        "The mandatory Espada Dam portage around mile 5; land early, carry around the dam, and reenter below Mission Parkway.",
        "Flows near or below about 200 cfs, when the current implementation reading was below the conservative floor and chutes or riffles may be shallow or awkward.",
        "Rain in the previous 72 hours, rising water, or SARA current-condition warnings because TPWD links the Mission Reach to urban runoff, high flows, and undesirable water quality after storms.",
        "Canoe chutes, riffles, low bridges, crowded access points, no shade, heat, alcohol/body-contact restrictions, and the need to stay within the posted city paddling boundary.",
        "Daily-use limits: remove boats at the end of the day and do not treat parks, trails, missions, or visible banks as camping permission."
      ]
    },
    "accessPoints": [
      {
        "id": "roosevelt-park-mission-reach",
        "name": "Roosevelt Park",
        "latitude": 29.4015,
        "longitude": -98.4883,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default TPWD/SARA upstream Mission Reach launch near Lone Star Boulevard."
      },
      {
        "id": "concepcion-park",
        "name": "Concepcion Park",
        "latitude": 29.3907,
        "longitude": -98.4982,
        "mileFromStart": 1.2,
        "segmentKind": "creek",
        "note": "Official TPWD access at the dead end of Theo Parkway."
      },
      {
        "id": "vfw-boulevard",
        "name": "VFW Boulevard",
        "latitude": 29.3702,
        "longitude": -98.4761,
        "mileFromStart": 3.1,
        "segmentKind": "creek",
        "note": "Official TPWD access with parking at the northwest corner of VFW Boulevard and the San Antonio River."
      },
      {
        "id": "padre-park",
        "name": "Padre Park",
        "latitude": 29.3622,
        "longitude": -98.4698,
        "mileFromStart": 4,
        "segmentKind": "creek",
        "note": "Official TPWD access before the lower Mission Reach and Espada Dam area."
      },
      {
        "id": "espada-park",
        "name": "Espada Park",
        "latitude": 29.3477,
        "longitude": -98.4663,
        "mileFromStart": 5,
        "segmentKind": "creek",
        "note": "Official access near SE Military Drive; portage planning is required around Espada Dam."
      },
      {
        "id": "mission-parkway",
        "name": "Mission Parkway",
        "latitude": 29.3463,
        "longitude": -98.4633,
        "mileFromStart": 5.2,
        "segmentKind": "creek",
        "note": "Official TPWD access and reentry context below the Espada Dam portage."
      },
      {
        "id": "camino-coahuilteca-mission-espada",
        "name": "Camino Coahuilteca",
        "latitude": 29.3196,
        "longitude": -98.4489,
        "mileFromStart": 8,
        "segmentKind": "creek",
        "note": "Default TPWD/SARA take-out near Mission Espada and the southern Mission Reach boundary."
      }
    ]
  },
  "san-antonio-river-river-crossing-helton": {
    "putIn": {
      "id": "river-crossing-park-loop-1604",
      "name": "River Crossing Park / Loop 1604 River Access Site",
      "latitude": 29.222,
      "longitude": -98.3554
    },
    "takeOut": {
      "id": "helton-san-antonio-river-nature-park",
      "name": "John William Helton - San Antonio River Nature Park",
      "latitude": 29.2153,
      "longitude": -98.2628
    },
    "logistics": {
      "distanceLabel": "About 12.1 mi",
      "estimatedPaddleTime": "About 4 hr to 8 hr depending on water level, flow rate, wind, log jams, mud, and group pace",
      "shuttle": "Stage the Helton Nature Park take-out first, then drive back to River Crossing Park / Loop 1604. CR 125 is the coordinate-backed midpoint access around mile 5.63 if the group wants a shorter day or a bailout.",
      "permits": "No route-specific paddling permit is published. River Crossing Park is free and open dawn to dusk, Helton Nature Park has free day use, and campground reservations are separate. Follow Texas boating/PFD rules, use only the named public access sites, and check SARA current conditions before launching.",
      "camping": "Helton Nature Park has SARA-managed campgrounds at the take-out, with reservations and an overnight fee. Treat camping as an endpoint campground plan, not permission to camp on private banks, soft mud bars, or the closed downstream SASPAMCO section.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at River Crossing Park / Loop 1604 and take out at Helton Nature Park for the upper official SASPAMCO day route. Use USGS 08181800 near Elmendorf with a conservative 200 cfs floor, then make a same-day call on low water, log jams, rainfall, water quality, soft banks, and the firm Helton finish.",
      "accessCaveats": [
        "TPWD publishes the Loop 1604, CR 125, and Helton coordinates for the 12.1-mile SASPAMCO option, and SARA confirms River Crossing Park and Helton as public River Authority park accesses.",
        "SARA's current alert keeps the southern SASPAMCO section downstream of Helton temporarily closed because of large log jams. Do not continue past Helton toward CR 117 or Floresville until SARA lifts that closure.",
        "SARA says River Crossing Park is the first SASPAMCO access and is open daily from dawn to dusk; confirm posted hours and gate status before leaving a vehicle.",
        "Helton Nature Park has day-use amenities, river access, and campground reservations, but overnight use needs a separate campground booking rather than an informal riverbank plan.",
        "This route uses conservative corridor-level TRPA flow guidance, not a manager-authored exact-segment gauge table. If the Elmendorf gauge is below about 200 cfs, expect a slower, scrape-prone, debris-sensitive trip."
      ],
      "watchFor": [
        "Flows near or below about 200 cfs, when the current implementation reading was below the conservative floor and low-water snags or shallow lines are more likely.",
        "Fresh rain, rising water, or readings approaching TRPA's 2,000 cfs maximum cue, when the unrestrained lower San Antonio can produce temporary high flows and poorer water quality.",
        "Log jams, sweepers, strainers, soft mud banks, variable cell coverage, heat, limited bailouts, and long quiet pools that can stretch the day.",
        "The required Helton take-out boundary; do not drift into the temporarily closed downstream SASPAMCO section.",
        "Private banks outside the named public accesses and any direct hazard-portage corridor."
      ]
    },
    "accessPoints": [
      {
        "id": "river-crossing-park-loop-1604",
        "name": "River Crossing Park / Loop 1604 River Access Site",
        "latitude": 29.222,
        "longitude": -98.3554,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default TPWD/SARA put-in and first SASPAMCO access at River Crossing Park."
      },
      {
        "id": "cr-125-river-access-site",
        "name": "CR 125 River Access Site",
        "latitude": 29.2114,
        "longitude": -98.3126,
        "mileFromStart": 5.63,
        "segmentKind": "creek",
        "note": "TPWD alternate midpoint access for a shorter Loop 1604-to-CR 125 or CR 125-to-Helton trip."
      },
      {
        "id": "helton-san-antonio-river-nature-park",
        "name": "John William Helton - San Antonio River Nature Park",
        "latitude": 29.2153,
        "longitude": -98.2628,
        "mileFromStart": 12.1,
        "segmentKind": "creek",
        "note": "Default take-out and endpoint campground; do not continue into the currently closed downstream SASPAMCO section."
      }
    ]
  },
  "san-antonio-river-cr125-helton-nature-park": {
    "putIn": {
      "id": "cr-125-river-access-site",
      "name": "CR 125 River Access Site / Graytown Park",
      "latitude": 29.2114,
      "longitude": -98.3126
    },
    "takeOut": {
      "id": "helton-san-antonio-river-nature-park",
      "name": "John William Helton - San Antonio River Nature Park",
      "latitude": 29.2153,
      "longitude": -98.2628
    },
    "logistics": {
      "distanceLabel": "About 6.43 mi",
      "estimatedPaddleTime": "About 2 hr to 4 hr depending on water level, flow rate, wind, log jams, mud, and group pace",
      "shuttle": "Stage the Helton Nature Park take-out first, then drive back to the CR 125 River Access Site / Graytown Park. TPWD lists about 5.2 road miles between the midpoint access and Helton via FM 1303.",
      "permits": "No route-specific paddling permit is published. CR 125 / Graytown and Helton are public River Authority access points; Helton Nature Park has free day use, while campground reservations are separate. Follow Texas boating/PFD rules, use only named public access sites, and check SARA current conditions before launching.",
      "camping": "Helton Nature Park has SARA-managed campgrounds at the take-out, with reservations and an overnight fee. Treat camping as an endpoint campground plan, not permission to camp on private banks, soft mud bars, or the closed downstream SASPAMCO section.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch from the CR 125 / Graytown midpoint access and take out at Helton Nature Park for the shorter official SASPAMCO day route. Use USGS 08181800 near Elmendorf with a conservative 200 cfs floor, then make a same-day call on low water, log jams, rainfall, water quality, soft banks, and the firm Helton finish.",
      "accessCaveats": [
        "TPWD publishes CR 125 and Helton coordinates for the 6.43-mile SASPAMCO option, and SARA confirms Graytown Park and Helton as public River Authority access points.",
        "SARA's current alert keeps the southern SASPAMCO section downstream of Helton temporarily closed because of large log jams. Do not continue past Helton toward CR 117 or Floresville until SARA lifts that closure.",
        "Helton Nature Park has day-use amenities, river access, and campground reservations, but overnight use needs a separate campground booking rather than an informal riverbank plan.",
        "This route uses conservative corridor-level TRPA flow guidance and the upstream Elmendorf gauge, not a manager-authored exact-segment gauge table. If the gauge is below about 200 cfs, expect a slower, scrape-prone, debris-sensitive trip.",
        "Coordinates are access anchors from TPWD/SARA context. Follow posted launch paths and current site conditions on arrival rather than projecting mid-channel points."
      ],
      "watchFor": [
        "Flows near or below about 200 cfs, when the current implementation reading was below the conservative floor and low-water snags or shallow lines are more likely.",
        "Fresh rain, rising water, or readings approaching TRPA's 2,000 cfs maximum cue, when the unrestrained lower San Antonio can produce temporary high flows and poorer water quality.",
        "Log jams, sweepers, strainers, soft mud banks, variable cell coverage, heat, limited bailouts, and long quiet pools that can stretch the day.",
        "The required Helton take-out boundary; do not drift into the temporarily closed downstream SASPAMCO section.",
        "Private banks outside the named public accesses and any direct hazard-portage corridor."
      ]
    },
    "accessPoints": [
      {
        "id": "cr-125-river-access-site",
        "name": "CR 125 River Access Site / Graytown Park",
        "latitude": 29.2114,
        "longitude": -98.3126,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default TPWD/SARA put-in and SASPAMCO midpoint access for the shorter CR 125-to-Helton option."
      },
      {
        "id": "helton-san-antonio-river-nature-park",
        "name": "John William Helton - San Antonio River Nature Park",
        "latitude": 29.2153,
        "longitude": -98.2628,
        "mileFromStart": 6.43,
        "segmentKind": "creek",
        "note": "Default take-out and endpoint campground; do not continue into the currently closed downstream SASPAMCO section."
      }
    ]
  },
  "san-antonio-river-riverdale-goliad-state-park": {
    "putIn": {
      "id": "riverdale-lane-access",
      "name": "Riverdale Lane Access",
      "latitude": 28.67067,
      "longitude": -97.54198
    },
    "takeOut": {
      "id": "goliad-state-park-takeout",
      "name": "Goliad State Park",
      "latitude": 28.6527,
      "longitude": -97.3817
    },
    "logistics": {
      "distanceLabel": "About 18 mi",
      "estimatedPaddleTime": "About 8 hr to 9 hr at ordinary levels, longer if low flow, log jams, soft mud banks, heat, or a late shuttle slows the day",
      "shuttle": "Stage the Goliad State Park take-out first, pay or arrange required park day-use/camping access, then drive to Riverdale Lane. Ferry Street near Branch Nature Park is the documented midpoint take-out around mile 5 and is the only clean shorter exit in the current route package.",
      "permits": "No route-specific paddling permit is published, but SARA says users must pay the Goliad State Park day-use fee to take out there. Follow Texas boating/PFD rules, use only the named public landings, and check SARA alerts before launching.",
      "camping": "Goliad State Park is an endpoint basecamp with walk-in water sites, developed water/electric sites, full-hookup options, and shelters. Do not infer legal camping from soft mud banks, sandbars, or private shoreline along the 18-mile route.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Riverdale Lane and take out at Goliad State Park for the current full Goliad Paddling Trail. Use USGS 08188500 at Goliad with a conservative 200 cfs floor, then make a same-day call on route length, log jams, no cell service, heat, weather, and the required state-park finish.",
      "accessCaveats": [
        "SARA's current access page says the Hwy 59 landing is closed until further notice because of TxDOT bridge construction. Do not plan the older Hwy 59-to-state-park six-mile route unless that closure is officially lifted.",
        "The Riverdale coordinate is an access-address anchor for SARA's published 1777 N. Riverdale Lane trail start, cross-checked by Census and OSM public geocoding. Follow posted local signs to the actual ramp or launch point on arrival.",
        "SARA labels the Riverdale start available but says launching there requires a significant commitment of time and energy because the full trail is about 18 miles.",
        "SARA says there is no cell phone access, the landscape is rural, log jams may be present, banks are mostly soft mud, and paddlers should bring ample drinking water.",
        "Goliad State Park is the planned finish. Confirm current park hours, fee payment, and capacity before leaving vehicles, and do not continue downstream without a separate route plan because TPWD says no other downstream take-outs are documented from the park page context."
      ],
      "watchFor": [
        "Flows near or below about 200 cfs, when the conservative minimum is barely met and the long rural route can slow down around bars, wood, and soft banks.",
        "Readings approaching TRPA's 2,000 cfs maximum cue, rising water, or fresh rain, when log jams, current, and muddy landings become less forgiving.",
        "Log jams, floating wood, sweepers, strainers, soft mud banks, no cell service, long heat exposure, and limited bailout options between Riverdale, Ferry Street, and the state park.",
        "The required state-park take-out and fee-controlled access at the finish.",
        "Private banks outside the named public accesses and any direct hazard-portage corridor."
      ]
    },
    "accessPoints": [
      {
        "id": "riverdale-lane-access",
        "name": "Riverdale Lane Access",
        "latitude": 28.67067,
        "longitude": -97.54198,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Current SARA put-in address anchor at 1777 N. Riverdale Lane, where Riverdale Lane meets the San Antonio River."
      },
      {
        "id": "ferry-street-branch-nature-park",
        "name": "Ferry Street / Branch Nature Park",
        "latitude": 28.661,
        "longitude": -97.3927,
        "mileFromStart": 5,
        "segmentKind": "creek",
        "note": "SARA midpoint take-out near Branch Nature Park; TPWD describes limited parking."
      },
      {
        "id": "goliad-state-park-takeout",
        "name": "Goliad State Park",
        "latitude": 28.6527,
        "longitude": -97.3817,
        "mileFromStart": 18,
        "segmentKind": "creek",
        "note": "Planned state-park take-out; day-use fee applies and camping can be reserved separately."
      }
    ]
  },
  "blanco-river-fischer-store-john-knox-ranch": {
    "putIn": {
      "id": "fischer-store-road-bridge",
      "name": "Fischer Store Road Bridge",
      "latitude": 30.000583,
      "longitude": -98.200361
    },
    "takeOut": {
      "id": "john-knox-ranch-river-access",
      "name": "John Knox Ranch River Access",
      "latitude": 29.968451,
      "longitude": -98.192709
    },
    "logistics": {
      "distanceLabel": "About 3.6 mi",
      "estimatedPaddleTime": "Short half-day float when the Blanco has enough water, with extra time for John Knox gate-code logistics, shallow dragging near the floor, scouting, and a firm daylight take-out",
      "shuttle": "Reserve John Knox Ranch River Access at least 24 hours in advance and stage the take-out only after receiving confirmation and the gate code. Then use Fischer Store Road bridge as a drop-off put-in; TPWD says no parking is available at the bridge.",
      "permits": "No public river permit is published, but the take-out is a TPWD leased access with required advance email confirmation, gate-code use, daylight hours, limited parking, and pack-in/pack-out rules. Follow Texas boating and PFD rules and current site instructions.",
      "camping": "Treat this as a day route. TPWD documents daylight public river access, not public route camping; John Knox Ranch is a separate camp/program property, so any overnight stay requires separate arrangements and is not inferred from the paddle route.",
      "campingClassification": "none",
      "summary": "Launch by drop-off at Fischer Store Road bridge and take out at John Knox Ranch River Access for TPWD's 3.6-mile Blanco River float. Use USGS 08171000 at Wimberley with a conservative 800 cfs minimum floor, and verify the Fischer Store visual gauge, weather, and John Knox access confirmation before launch.",
      "accessCaveats": [
        "Fischer Store Road bridge is the route put-in, but TPWD says no parking is available there. Plan a drop-off or a legal off-route shuttle solution rather than leaving a vehicle at the bridge.",
        "John Knox Ranch is a private property participating in TPWD leased public access. Email 24 hours in advance for confirmation and gate code, stay inside posted daylight hours, and expect limited parking with no overflow parking.",
        "The John Knox coordinate is the TPWD access anchor. Final boat exit should follow current ranch instructions, river stage, and safe bank conditions on arrival.",
        "Do not substitute the longer TPWD FM 1492 alternate without separate planning; TPWD says the FM 1492 take-out is only a north-bank spot and no free parking is available there."
      ],
      "watchFor": [
        "Flash-flood potential and fast rises after Hill Country storms, especially if upstream weather changes after the shuttle is staged.",
        "Class I-II current, shallow ledges, low-water crossings, wood, root wads, and post-2015 flood changes documented by American Whitewater for the containing Blanco reach.",
        "Very low flow below the 800 cfs floor. Same-day readings during implementation were 11.0 cfs at Wimberley and 19.5 cfs at Fischer Store, both far below runnable guidance.",
        "Private banks and limited exits between the road bridge and John Knox Ranch."
      ]
    },
    "accessPoints": [
      {
        "id": "fischer-store-road-bridge",
        "name": "Fischer Store Road Bridge",
        "latitude": 30.000583,
        "longitude": -98.200361,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "USGS gage/bridge coordinate used as the source-backed put-in anchor; TPWD says this is drop-off only because no bridge parking is available."
      },
      {
        "id": "john-knox-ranch-river-access",
        "name": "John Knox Ranch River Access",
        "latitude": 29.968451,
        "longitude": -98.192709,
        "mileFromStart": 3.6,
        "segmentKind": "creek",
        "note": "TPWD leased-access take-out anchor at John Knox Ranch; confirm reservation, gate code, parking, daylight hours, and current bank condition before launch."
      }
    ]
  },
  "llano-river-james-river-martin-simonsville": {
    "putIn": {
      "id": "james-river-crossing-fr-2389",
      "name": "James River Crossing / FR-2389",
      "latitude": 30.650638,
      "longitude": -99.250613
    },
    "takeOut": {
      "id": "martin-simonsville-crossing",
      "name": "Martin / Simonsville Crossing",
      "latitude": 30.64065,
      "longitude": -99.167714
    },
    "logistics": {
      "distanceLabel": "About 6.0 mi",
      "estimatedPaddleTime": "Short-to-half-day Hill Country run; allow extra time for scouting, low-water ledges, wood, wind, and safe public-crossing carries",
      "shuttle": "Stage the Martin / Simonsville Crossing take-out first, then drive back to James River Crossing / FR-2389. Confirm current signs, parking, road conditions, and safe bank access before unloading at either crossing.",
      "permits": "No route-specific paddling permit is published. Use only public road-crossing access, obey posted no-trespassing or use-restriction signs, and follow Texas boating and PFD rules.",
      "camping": "Treat this as a day route with no public on-route camping selected. TRPA identifies the endpoints as public road crossings and tells paddlers to respect no-trespassing and use-restriction signs; do not infer legal camping from private banks, gravel bars, or nearby ranch roads.",
      "campingClassification": "none",
      "summary": "Launch at James River Crossing / FR-2389 and finish at Martin / Simonsville Crossing for a six-mile main Llano run. Use USGS 08151500 with TRPA's 65 cfs floor, 100-500 cfs preferred window, and 5,000 cfs high-water ceiling, then make a same-day call on weather, wood, and legal access.",
      "accessCaveats": [
        "Both endpoints are TRPA route-map access anchors at public road crossings, not guaranteed wetted-edge launch coordinates. Pick the actual water entry and landing from current signs, parking, bank condition, and safe carry paths.",
        "Do not use private roads, ranch gates, private banks, or posted areas as alternate access if either crossing is crowded, washed out, or signed against use.",
        "The Martin / Simonsville crossing is the selected take-out anchor for this six-mile route; continuing downstream enters the separate Martin/Simonsville-to-Keller's and Keller's-to-Castell route family.",
        "If either public crossing lacks legal parking or safe bank access on arrival, skip the route rather than inventing a private alternate."
      ],
      "watchFor": [
        "Class II-II+ Llano current, shallow limestone shelves, riffles, strainers, and blind swiftwater lines that need scouting.",
        "Fast rises after Hill Country storms. Recheck USGS 08151500, radar, and upstream rainfall before launch and during the shuttle.",
        "Low-water scraping near the 65 cfs floor and changing lines even inside the 100-500 cfs preferred range.",
        "Private banks and limited legal exits between the two public road crossings.",
        "Heat, sun exposure, wind, narrow road shoulders, muddy carries, snakes, and pack-in/pack-out discipline at undeveloped crossings."
      ]
    },
    "accessPoints": [
      {
        "id": "james-river-crossing-fr-2389",
        "name": "James River Crossing / FR-2389",
        "latitude": 30.650638,
        "longitude": -99.250613,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "TRPA map-link access anchor at the public road crossing; choose the actual launch from current signs, parking, bank condition, and safe carry path."
      },
      {
        "id": "martin-simonsville-crossing",
        "name": "Martin / Simonsville Crossing",
        "latitude": 30.64065,
        "longitude": -99.167714,
        "mileFromStart": 6,
        "segmentKind": "creek",
        "note": "TRPA map-link take-out anchor at the downstream public road crossing; verify current signs, parking, and bank condition before relying on it."
      }
    ]
  },
  "llano-river-martin-simonsville-kellers-landing": {
    "putIn": {
      "id": "martin-simonsville-crossing",
      "name": "Martin / Simonsville Crossing",
      "latitude": 30.64065,
      "longitude": -99.167714
    },
    "takeOut": {
      "id": "kellers-landing-us-87",
      "name": "Keller's Landing / US-87",
      "latitude": 30.660737,
      "longitude": -99.109219
    },
    "logistics": {
      "distanceLabel": "About 3.8 mi",
      "estimatedPaddleTime": "Short Hill Country connector; allow extra time for scouting, low-water ledges, wood, wind, and safe public-crossing carries",
      "shuttle": "Stage the Keller's Landing / US-87 take-out first, then drive back to Martin / Simonsville Crossing. Confirm current signs, parking, road conditions, and safe bank access before unloading at either access anchor.",
      "permits": "No route-specific paddling permit is published. Use only public or permission-backed access, obey posted no-trespassing or use-restriction signs, and follow Texas boating and PFD rules.",
      "camping": "Treat this as a day route with no public on-route camping selected. TRPA identifies the endpoints as access anchors and tells paddlers to respect no-trespassing and use-restriction signs; do not infer legal camping from private banks, gravel bars, or nearby ranch roads.",
      "campingClassification": "none",
      "summary": "Launch at Martin / Simonsville Crossing and finish at Keller's Landing / US-87 for a 3.8-mile main Llano connector. Use USGS 08151500 with TRPA's 65 cfs floor, 100-500 cfs preferred window, and 5,000 cfs high-water ceiling, then make a same-day call on weather, wood, and legal access.",
      "accessCaveats": [
        "Both endpoints are route-source access anchors, not guaranteed wetted-edge launch coordinates. Pick the actual water entry and landing from current signs, parking, bank condition, and safe carry paths.",
        "Keller's Landing / US-87 is also the put-in for the downstream Keller's-to-Castell route family, and TRPA describes the US-87 access as steep and muddy.",
        "Do not use private roads, ranch gates, private banks, or posted areas as alternate access if either crossing is crowded, washed out, or signed against use.",
        "If either endpoint lacks legal parking or safe bank access on arrival, skip the route rather than inventing a private alternate."
      ],
      "watchFor": [
        "Class II-II+ Llano current, shallow limestone shelves, riffles, strainers, and blind swiftwater lines that need scouting.",
        "Fast rises after Hill Country storms. Recheck USGS 08151500, radar, and upstream rainfall before launch and during the shuttle.",
        "Low-water scraping near the 65 cfs floor and changing lines even inside the 100-500 cfs preferred range.",
        "Private banks and limited legal exits between the two access anchors.",
        "Heat, sun exposure, wind, narrow road shoulders, muddy carries, snakes, and pack-in/pack-out discipline at undeveloped crossings."
      ]
    },
    "accessPoints": [
      {
        "id": "martin-simonsville-crossing",
        "name": "Martin / Simonsville Crossing",
        "latitude": 30.64065,
        "longitude": -99.167714,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "TRPA map-link access anchor at the upstream public crossing; choose the actual launch from current signs, parking, bank condition, and safe carry path."
      },
      {
        "id": "kellers-landing-us-87",
        "name": "Keller's Landing / US-87",
        "latitude": 30.660737,
        "longitude": -99.109219,
        "mileFromStart": 3.8,
        "segmentKind": "creek",
        "note": "US-87/Keller's Landing take-out anchor for this connector; TRPA describes this access as steep and muddy, so verify current signs, parking, and bank condition before relying on it."
      }
    ]
  },
  "llano-river-kellers-landing-castell-crossing": {
    "putIn": {
      "id": "kellers-landing-us-87",
      "name": "Keller's Landing / US-87",
      "latitude": 30.660737,
      "longitude": -99.109219
    },
    "takeOut": {
      "id": "castell-crossing",
      "name": "Castell Crossing",
      "latitude": 30.704516,
      "longitude": -98.958782
    },
    "logistics": {
      "distanceLabel": "About 12.0 mi",
      "estimatedPaddleTime": "Full Hill Country day run; allow extra time for steep US-87 access, scouting, low-water ledges, wind, and a firm daylight take-out at Castell",
      "shuttle": "Stage the take-out at TPWD's Castell Crossing lease first, then drive back to the US-87/Keller's Landing access. Confirm signs, parking, bank condition, and no-posted-access changes before unloading at US-87.",
      "permits": "No route-specific paddling permit is published. Castell Crossing is a TPWD leased public access with daylight use, designated parking, pack-in/pack-out rules, and no overnight camping. Follow Texas boating and PFD rules.",
      "camping": "Treat this as a day route with no public on-route camping selected. TPWD prohibits overnight camping at Castell Crossing, and no source-backed legal river camp was selected for the Keller's-to-Castell corridor.",
      "campingClassification": "none",
      "summary": "Launch at Keller's Landing / US-87 and finish at TPWD's Castell Crossing lease for a 12-mile main Llano run. Use USGS 08150700 near Mason with TRPA's 65 cfs floor, keep the route behind the whitewater filter, and skip the trip if access, weather, or wood conditions are unclear.",
      "accessCaveats": [
        "Keller's Landing / US-87 is a route-source access anchor, not a developed TPWD launch. TRPA says the easiest access is on the southeast side by a steep muddy bank, so final water entry depends on current signs, parking, and safe bank conditions.",
        "Castell Crossing is an active TPWD leased access through August 31, 2027, with daylight public use, designated parking, and no overnight camping.",
        "Do not infer legal access or camping from private banks, gravel bars, ranch roads, or low-water crossings between the named endpoints.",
        "If the US-87 access is posted, washed out, muddy beyond safe carry, or lacks legal parking, skip the route rather than inventing a private alternate."
      ],
      "watchFor": [
        "Class II-II+ Llano current, ledges, shallow limestone shelves, strainers, and blind swiftwater lines that need scouting.",
        "Fast rises after Hill Country storms. Recheck USGS 08150700, radar, and upstream rainfall before launch and during the shuttle.",
        "Low-water scraping near the 65 cfs floor and changing lines even inside the 100-500 cfs preferred range.",
        "Private banks and limited exits between US-87 and Castell Crossing.",
        "Heat, sun exposure, wind, muddy access, roadside parking constraints, and pack-in/pack-out requirements at the public take-out."
      ]
    },
    "accessPoints": [
      {
        "id": "kellers-landing-us-87",
        "name": "Keller's Landing / US-87",
        "latitude": 30.660737,
        "longitude": -99.109219,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "USGS/American Whitewater access and gauge anchor at US-87; TRPA says the route access is steep and muddy, so use current signs and safe bank conditions for the actual launch."
      },
      {
        "id": "castell-crossing",
        "name": "Castell Crossing",
        "latitude": 30.704516,
        "longitude": -98.958782,
        "mileFromStart": 12,
        "segmentKind": "creek",
        "note": "TPWD leased-access take-out anchor with daylight use, designated parking, and no overnight camping."
      }
    ]
  },
  "san-marcos-river-city-park-smrr": {
    "putIn": {
      "id": "san-marcos-city-park-access",
      "name": "City Park",
      "latitude": 29.8859203,
      "longitude": -97.9344384
    },
    "takeOut": {
      "id": "san-marcos-river-retreat-raca",
      "name": "San Marcos River Retreat",
      "latitude": 29.8592938,
      "longitude": -97.8886993
    },
    "logistics": {
      "distanceLabel": "About 6.0 mi",
      "estimatedPaddleTime": "About 3 hr to 6 hr depending on flow, dam portages, crowds, scouting, wood, and private-access timing",
      "shuttle": "Stage the San Marcos River Retreat take-out only after confirming day-use access, fee, parking, daylight hours, and no-alcohol rules. City Park is the public upstream put-in; Westerfield Crossing / CR 101 is the practical early take-out or portage point if Cummings Dam, flow, or group skill argues against continuing.",
      "permits": "No public river permit is published for the route, but San Marcos River Retreat is private/RACA access and requires fee/rule compliance. Follow Texas boating and PFD rules, City of San Marcos riverfront park rules, and posted closures or seasonal entry controls around City Park and Rio Vista.",
      "camping": "Treat the paddle itself as a day route. San Marcos River Retreat is a private campground and TPWD RACA site, so overnight use requires separate campground/group arrangements; do not infer legal camping from City Park, Rio Vista, John Stokes Park, Westerfield Crossing, or private banks.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at City Park and finish at San Marcos River Retreat for the upper San Marcos run through Rio Vista, Cape's Dam, Cummings Dam, and Westerfield Crossing. Use USGS 08170500 with TRPA's 60 cfs floor, 150 cfs target, and 500 cfs upper caution, then make a same-day call on portages, crowds, and access permissions.",
      "accessCaveats": [
        "City of San Marcos confirms City Park river access for kayaks and canoes, but parking, seasonal crowd controls, and nearby Rio Vista entry rules can change during high-use periods.",
        "San Marcos River Retreat is private property even though it participates as a TPWD River Access and Conservation Area site. Confirm day-use availability and rules before relying on it as the take-out.",
        "Westerfield Crossing is a route-supported access/portage anchor, but it should not be treated as unrestricted parking or private-bank permission beyond the actual public crossing access.",
        "The TRPA Google-map coordinates are access anchors, not promises that the exact wetted-edge launch or landing is at the coordinate. Follow signs, ramps, current bank conditions, and staff guidance on arrival.",
        "Below the city parks, private banks are common. Stop only at public or permission-backed accesses and direct hazard portages."
      ],
      "watchFor": [
        "Rio Vista Falls early in the route; most open-canoe and mixed-skill groups should portage uncertain drops rather than treating the playspot as mandatory.",
        "Cape's Dam / Thompson's Island route choices, where TRPA notes portage and channel decisions that can be confusing for novice groups.",
        "Cummings Dam around mile five; TRPA calls it very dangerous, warns not to shoot or surf it casually, and describes portage handling rather than a normal runnable feature.",
        "Flows below 100 cfs, when TRPA says conditions are low, and flows near or above 500 cfs, when upstream paddling, dam hydraulics, and portage margins become less forgiving.",
        "Blanco River runoff, flash-flood response, crowds, strainers, low bridges, slick dam tops, wrapped boats below drops, and limited legal exits away from the named access points."
      ]
    },
    "accessPoints": [
      {
        "id": "san-marcos-city-park-access",
        "name": "City Park",
        "latitude": 29.8859203,
        "longitude": -97.9344384,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Public City of San Marcos river access and default put-in."
      },
      {
        "id": "westerfield-crossing-cr101",
        "name": "Westerfield Crossing / CR 101",
        "latitude": 29.8569488,
        "longitude": -97.8968908,
        "mileFromStart": 5.5,
        "segmentKind": "creek",
        "note": "TRPA route-supported portage/access anchor just below Cummings Dam and practical early take-out."
      },
      {
        "id": "san-marcos-river-retreat-raca",
        "name": "San Marcos River Retreat",
        "latitude": 29.8592938,
        "longitude": -97.8886993,
        "mileFromStart": 6,
        "segmentKind": "creek",
        "note": "Private campground and TPWD RACA day-use access; confirm fees, daylight access, and rules before using."
      }
    ]
  },
  "san-marcos-river-retreat-scull-road": {
    "putIn": {
      "id": "san-marcos-river-retreat-aw-access",
      "name": "San Marcos River Retreat",
      "latitude": 29.8584,
      "longitude": -97.8876
    },
    "takeOut": {
      "id": "scull-road-bridge-aw-access",
      "name": "Scull Road Bridge",
      "latitude": 29.8496,
      "longitude": -97.8569
    },
    "logistics": {
      "distanceLabel": "About 3.0 mi",
      "estimatedPaddleTime": "About 2 hr at ordinary levels, longer if low water, Cottonseed scouting or portage, gate logistics, or bridge/take-out conditions slow the day",
      "shuttle": "Stage Scull Road first: TPWD says the bridge area is for loading and unloading only, no parking is allowed there, and paddlers should text the lease contact before arrival for the gate code and parking availability. Then confirm San Marcos River Retreat reservation, fee, no-alcohol rule, and daylight access before launching.",
      "permits": "No public river permit is published, but both endpoints are TPWD leased access sites with site-specific rules. San Marcos River Retreat requires reservations and a launch/take-out fee; Scull Road requires gate-code/parking coordination. Follow Texas boating and PFD rules and posted lease conditions.",
      "camping": "Treat this as a day route. The public lease access language is daylight use and does not create route camping rights; San Marcos River Retreat is a separate private campground, so any overnight stay requires separate campground arrangements and is not inferred from the paddle route.",
      "campingClassification": "none",
      "summary": "Launch at San Marcos River Retreat and take out at Scull Road for TPWD's 3-mile San Marcos float through Cottonseed Rapids. Use USGS 08172000 with a conservative 100 cfs floor, expect below-200 cfs readings to be scrapey, and make Scull Road the firm exit before the Martindale Dam reach.",
      "accessCaveats": [
        "San Marcos River Retreat is private property participating as a TPWD lease access. Confirm reservation, launch fee, daylight hours, and no-alcohol rules before relying on it.",
        "TPWD says the Scull Road parking area is 0.16 miles southwest of the bridge, while the immediate bridge area is only for loading and unloading. The route records American Whitewater's bridge/access-point coordinate as the water-entry anchor and TPWD's coordinate as the parking/access anchor.",
        "American Whitewater describes past private-bank conflict around the Scull Road take-out. Use the public road/right-of-way context, do not linger, and avoid private-bank stops except for immediate safety.",
        "Scull Road is the intended finish. Continuing downstream adds flatwater above Martindale Dam and a required dam portage that is outside this route package."
      ],
      "watchFor": [
        "Cottonseed Rapids, an old-dam-remnant Class II rapid with a river-left sieve. Stay right, scout, and portage river right unless the group is deliberately prepared to run it.",
        "Low water near the 100 cfs floor and below 200 cfs, when American Whitewater says this reach can be run but tends to be scrapey.",
        "High or rising water, debris, Blanco River runoff, and the low Scull Road bridge, which can become a hazard at higher flows.",
        "Gate-code, parking, daylight, fee, reservation, and no-alcohol restrictions at the two leased access sites."
      ]
    },
    "accessPoints": [
      {
        "id": "san-marcos-river-retreat-aw-access",
        "name": "San Marcos River Retreat",
        "latitude": 29.8584,
        "longitude": -97.8876,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "American Whitewater water-access anchor; TPWD lease access is nearby at 29.85725, -97.88874 with reservation, fee, daylight, and no-alcohol rules."
      },
      {
        "id": "scull-road-bridge-aw-access",
        "name": "Scull Road Bridge",
        "latitude": 29.8496,
        "longitude": -97.8569,
        "mileFromStart": 3,
        "segmentKind": "creek",
        "note": "American Whitewater Scull's Crossing take-out anchor upstream of the road; TPWD parking/access anchor is 0.16 miles southwest at 29.849542, -97.857083."
      }
    ]
  },
  "san-marcos-river-sh90-zedler-mill": {
    "putIn": {
      "id": "sh-90-river-crossing",
      "name": "SH 90 River Crossing",
      "latitude": 29.6679,
      "longitude": -97.6999
    },
    "takeOut": {
      "id": "zedler-mill-park",
      "name": "Zedler Mill Park",
      "latitude": 29.6671,
      "longitude": -97.6519
    },
    "logistics": {
      "distanceLabel": "About 6.0 mi",
      "estimatedPaddleTime": "About 2 hr to 4 hr at ordinary levels, longer if low water, snags, weather, or a slower group stretches the day",
      "shuttle": "Stage the Zedler Mill Park take-out first, then drive back to the SH 90 River Crossing west of Luling. TPWD says parking is available at both locations, but both should still be checked before leaving vehicles.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, use the named public access points, and obey posted park, parking, and bridge-access signs.",
      "camping": "Treat this as a day trip. Current TPWD Luling Zedler Mill trail material does not document established route camping or an endpoint campground as part of the six-mile trail.",
      "campingClassification": "none",
      "summary": "Launch at the SH 90 River Crossing and take out at Zedler Mill Park for the official Luling Zedler Mill Paddling Trail. Use USGS 08172000 at Luling with a conservative 100 cfs floor, then make a same-day call on wood, weather, private-bank discipline, and the mandatory Zedler Mill exit.",
      "accessCaveats": [
        "TPWD publishes both endpoint coordinates and says parking is available at both locations, but this remains a simple public trail access plan rather than a staffed livery take-out.",
        "Zedler Mill Park is the planned finish. TPWD warns that a dam lies beyond the mill, so do not drift past the take-out.",
        "The San Marcos River is navigable here, but TPWD says private-bank use outside direct hazard portages can be trespassing.",
        "This route uses a conservative minimum-only threshold, not a full ideal-range recommendation. If the Luling gauge is near or below 100 cfs, expect more shallow route-finding and wood avoidance."
      ],
      "watchFor": [
        "The firm Zedler Mill Park take-out above the downstream dam.",
        "Numerous snags and logjams, especially when water levels are low.",
        "Small Class I riffles, clear pools, overhanging trees, floating wood, and slick banks at access points.",
        "Private banks outside the named public accesses and any direct hazard-portage corridor."
      ]
    },
    "accessPoints": [
      {
        "id": "sh-90-river-crossing",
        "name": "SH 90 River Crossing",
        "latitude": 29.6679,
        "longitude": -97.6999,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default TPWD put-in for the Luling Zedler Mill trail."
      },
      {
        "id": "zedler-mill-park",
        "name": "Zedler Mill Park",
        "latitude": 29.6671,
        "longitude": -97.6519,
        "mileFromStart": 6,
        "segmentKind": "creek",
        "note": "Default take-out above the downstream dam warning."
      }
    ]
  },
  "colorado-river-texas-river-school-fm973": {
    "putIn": {
      "id": "texas-river-school-river-camp",
      "name": "Texas River School River Camp",
      "latitude": 30.256179,
      "longitude": -97.634178
    },
    "takeOut": {
      "id": "fm-973-del-valle-bridge",
      "name": "FM 973 / Del Valle Bridge",
      "latitude": 30.21,
      "longitude": -97.64
    },
    "logistics": {
      "distanceLabel": "About 5 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr at ordinary levels, longer if flow drops near the 200 cfs floor, headwind builds, heat slows the group, or the FM 973 carry takes extra time",
      "shuttle": "Stage the FM 973 / Del Valle Bridge take-out first, then drive back to Texas River School only after securing the required advance reservation and gate-code access. Scout the FM 973 access before unloading upstream because LCRA describes limited parking and an uneven carry from the bridge area to the river.",
      "permits": "No route-specific paddling permit is published, but Texas River School requires advance reservation and a gate code for vehicle access, and charges day-use and camping fees. Follow Texas boating and PFD rules, check USGS 08158000 / LCRA Hydromet and weather before launch, and obey current bridge-access signs at FM 973.",
      "camping": "Texas River School offers reserved primitive campsites at the put-in, with fee, gate-code, parking, fire, pet, and pack-in/pack-out rules. Treat the five-mile paddle as a day-use route: FM 973 / Del Valle Bridge is not a campground, and Paddle Today does not infer legal island, sandbar, or private-bank camping between endpoints.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch from Texas River School River Camp and paddle five lower-Colorado miles to FM 973 / Del Valle Bridge. Use the Colorado River at Austin gauge with a conservative 200 cfs floor, then make a same-day call on reservation access, release changes, heat, wind, shallow bars, the FM 973 carry, and private banks.",
      "accessCaveats": [
        "TPWD publishes Texas River School as an active leased-access river camp with a source-backed access anchor. Follow the current gate-code, parking, unloading, fee, and designated-area rules rather than treating the coordinate as a guessed water-entry point.",
        "TPWD states that River Camp is five miles upriver from the Hwy 973 take-out. LCRA publishes FM 973 / Del Valle Bridge as a TxDOT-managed access, but its coordinates are rounded access anchors; follow the current open route from the bridge area to the water on arrival.",
        "The Austin gauge is upstream of this selected reach and the threshold floor is broad Austin-to-Bastrop guidance. Treat the app score as conservative and verify visible level and current at Texas River School before launching.",
        "This route starts at Texas River School, downstream of the urban upstream access sequence where LCRA warns of a low-head dam between US 183 and FM 973. Do not extend the trip upstream without a separate dam-portage plan.",
        "Do not infer camping or casual private-bank stops from the short rural shoreline, mid-river bars, or islands. Only the Texas River School endpoint campground is included in the route package."
      ],
      "watchFor": [
        "Flows near or below about 200 cfs, when the Texas River Flows minimum is barely met and shallow bars, scraping, or a muddy landing can slow even a short day.",
        "High or rising water after rain or upstream release changes, when current, debris, water quality, and bank exits can change quickly below Austin.",
        "Headwind on the broad channel, summer heat, thunderstorms, motorboat traffic near access points, and the limited FM 973 parking/carry setup.",
        "Snags, overhanging limbs, island splits, soft banks, and private banks away from Texas River School and FM 973 / Del Valle Bridge.",
        "Arrival-point offsets: use the published access anchors for planning, then choose the actual wetted launch or landing only from signed, open, source-backed access paths on arrival."
      ]
    },
    "accessPoints": [
      {
        "id": "texas-river-school-river-camp",
        "name": "Texas River School River Camp",
        "latitude": 30.256179,
        "longitude": -97.634178,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream TPWD leased-access river-camp anchor; reserve in advance, use the gate code, and follow current unloading and parking rules."
      },
      {
        "id": "fm-973-del-valle-bridge",
        "name": "FM 973 / Del Valle Bridge",
        "latitude": 30.21,
        "longitude": -97.64,
        "mileFromStart": 5,
        "segmentKind": "creek",
        "note": "Default downstream LCRA-listed TxDOT bridge access anchor; scout limited parking and the uneven carry before committing."
      }
    ]
  },
  "colorado-river-texas-river-school-little-webberville": {
    "putIn": {
      "id": "texas-river-school-river-camp",
      "name": "Texas River School River Camp",
      "latitude": 30.256179,
      "longitude": -97.634178
    },
    "takeOut": {
      "id": "little-webberville-park-boat-ramp",
      "name": "Little Webberville Park",
      "latitude": 30.229665,
      "longitude": -97.518125
    },
    "logistics": {
      "distanceLabel": "About 17.5 mi",
      "estimatedPaddleTime": "About 6 hr to 9 hr at ordinary levels, longer if flow drops near the 200 cfs floor, headwind builds, heat slows the group, or scouting access takes time",
      "shuttle": "Stage Little Webberville Park first, then drive back to Texas River School only after securing the required advance reservation and gate-code access. Do not count on informal intermediate exits; treat the route as a long point-to-point day.",
      "permits": "No route-specific paddling permit is published, but Texas River School requires advance reservation and a gate code for vehicle access, and charges day-use and camping fees. Follow Texas boating and PFD rules, check USGS 08158000 / LCRA Hydromet and weather before launch, and obey current county-park rules at Little Webberville.",
      "camping": "Texas River School offers reserved primitive campsites at the put-in, with fee, parking, fire, pet, pack-in/pack-out, and designated-area rules. Treat the downstream paddle as a day-use route: Little Webberville Park prohibits camping, and Paddle Today does not infer legal island, sandbar, or private-bank camping between endpoints.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch from Texas River School River Camp and paddle 17.5 lower-Colorado miles to Little Webberville Park. Use the Colorado River at Austin gauge with a conservative 200 cfs floor, then make a same-day call on release changes, heat, wind, shallow bars, limited exits, and private banks.",
      "accessCaveats": [
        "TPWD publishes Texas River School as an active leased-access river camp with a source-backed access anchor. Follow the current gate-code, parking, unloading, fee, and designated-area rules rather than treating the coordinate as a guessed water-entry point.",
        "Texas River School and TPWD both state that River Camp is 17.5 miles upriver from Little Webberville Park. LCRA and Travis County publish Little Webberville as a public lower-Colorado access, but its coordinates are still access anchors; follow the current ramp path on arrival.",
        "The Austin gauge is upstream of this selected reach and the threshold floor is broad Austin-to-Bastrop guidance. Treat the app score as conservative and verify visible level and current at Texas River School before launching.",
        "Texas River School day-use access is by advance arrangement and Little Webberville has no electricity or drinking water. Bring water, sun protection, shuttle gear, lights for emergency delay, and a realistic bailout plan.",
        "Do not infer camping or casual private-bank stops from the long rural shoreline, mid-river bars, or islands. Only the Texas River School endpoint campground is included in the route package."
      ],
      "watchFor": [
        "Flows near or below about 200 cfs, when the Texas River Flows minimum is barely met and shallow bars or dragging can slow a 17.5-mile day.",
        "High or rising water after rain or upstream release changes, when current, debris, water quality, and bank exits can change quickly below Austin.",
        "Headwind on the broad channel, summer heat, thunderstorms, motorboat traffic near access points, and a trip length that leaves little daylight margin after a slow start.",
        "Snags, overhanging limbs, island splits, soft banks, and private banks away from Texas River School and Little Webberville Park.",
        "Arrival-point offsets: use the published access anchors for planning, then choose the actual wetted launch or landing only from signed, open, source-backed access paths on arrival."
      ]
    },
    "accessPoints": [
      {
        "id": "texas-river-school-river-camp",
        "name": "Texas River School River Camp",
        "latitude": 30.256179,
        "longitude": -97.634178,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream TPWD leased-access river-camp anchor; reserve in advance, use the gate code, and follow current unloading and parking rules."
      },
      {
        "id": "little-webberville-park-boat-ramp",
        "name": "Little Webberville Park",
        "latitude": 30.229665,
        "longitude": -97.518125,
        "mileFromStart": 17.5,
        "segmentKind": "creek",
        "note": "Default downstream Travis County park boat-ramp access; no camping, no drinking water, and no electricity."
      }
    ]
  },
  "colorado-river-fm973-little-webberville": {
    "putIn": {
      "id": "fm-973-del-valle-bridge",
      "name": "FM 973 / Del Valle Bridge",
      "latitude": 30.21,
      "longitude": -97.64
    },
    "takeOut": {
      "id": "little-webberville-park-boat-ramp",
      "name": "Little Webberville Park",
      "latitude": 30.23,
      "longitude": -97.52
    },
    "logistics": {
      "distanceLabel": "About 12 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr at ordinary levels, longer if the Austin gauge is near the 200 cfs floor, headwind builds, heat slows the group, or the FM 973 carry takes extra time",
      "shuttle": "Stage Little Webberville Park first, then drive back to FM 973 / Del Valle Bridge. Scout the FM 973 access before unloading because LCRA describes limited parking and an uneven carry from the bridge area to the river.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, use only the LCRA-listed public access points, check USGS 08158000 / LCRA Hydromet and weather before launch, and obey current bridge and county-park rules.",
      "camping": "Treat this as a day-use route with no route camping selected. Travis County prohibits camping at Little Webberville Park, and LCRA does not identify FM 973 / Del Valle Bridge as a campground, so do not infer legal overnight use from islands, sandbars, or private banks between endpoints.",
      "campingClassification": "none",
      "summary": "Launch at FM 973 / Del Valle Bridge and paddle 12 lower-Colorado miles to Little Webberville Park. Use the Colorado River at Austin gauge with a conservative 200 cfs floor, then make a same-day call on release changes, heat, wind, shallow bars, limited exits, and private banks.",
      "accessCaveats": [
        "LCRA publishes FM 973 / Del Valle Bridge as a TxDOT-managed access with limited parking alongside the bridge and boat launching that requires a carry over uneven ground.",
        "LCRA and Travis County publish Little Webberville as a public lower-Colorado access, but the stored coordinates are access anchors; follow the current ramp path and signs on arrival.",
        "The Austin gauge is upstream of this selected reach and the threshold floor is broad Austin-to-Bastrop guidance. Treat the app score as conservative and verify visible level and current at FM 973 before launching.",
        "Little Webberville has no electricity or drinking water, and Travis County Parks does not provide paddling equipment. Bring water, sun protection, shuttle gear, and a backup plan.",
        "Do not infer camping or casual private-bank stops from the rural shoreline, mid-river bars, or islands. This shorter public-access route has no selected overnight option."
      ],
      "watchFor": [
        "Flows near or below about 200 cfs, when the Texas River Flows minimum is barely met and shallow bars or dragging can slow a 12-mile day.",
        "High or rising water after rain or upstream release changes, when current, debris, water quality, and bank exits can change quickly below Austin.",
        "Headwind on the broad channel, summer heat, thunderstorms, motorboat traffic near access points, and a trip length that still needs daylight margin.",
        "Snags, overhanging limbs, island splits, soft banks, and private banks away from FM 973 and Little Webberville Park.",
        "Arrival-point offsets: use the published access anchors for planning, then choose the actual wetted launch or landing only from signed, open, source-backed access paths on arrival."
      ]
    },
    "accessPoints": [
      {
        "id": "fm-973-del-valle-bridge",
        "name": "FM 973 / Del Valle Bridge",
        "latitude": 30.21,
        "longitude": -97.64,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream LCRA-listed TxDOT bridge access anchor; scout limited parking and the uneven carry before unloading."
      },
      {
        "id": "little-webberville-park-boat-ramp",
        "name": "Little Webberville Park",
        "latitude": 30.23,
        "longitude": -97.52,
        "mileFromStart": 12,
        "segmentKind": "creek",
        "note": "Default downstream Travis County park boat-ramp access; camping is prohibited and there is no drinking water or electricity."
      }
    ]
  },
  "colorado-river-little-webberville-big-webberville": {
    "putIn": {
      "id": "little-webberville-park-boat-ramp",
      "name": "Little Webberville Park",
      "latitude": 30.229665,
      "longitude": -97.518125
    },
    "takeOut": {
      "id": "webberville-park-boat-ramp",
      "name": "Webberville Park",
      "latitude": 30.21587,
      "longitude": -97.494247
    },
    "logistics": {
      "distanceLabel": "About 5 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr at ordinary levels, longer if flow is near the floor, wind picks up, or the group stops on mid-river bars",
      "shuttle": "Stage Webberville Park first, then drive back to Little Webberville Park. Little Webberville boat-ramp access is open 24 hours, but Webberville Park boat-ramp hours are 8 a.m. to civil twilight, so do not start late or assume after-dark take-out access.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, use the Travis County park ramps, check LCRA Hydromet / USGS 08158000 and weather before launch, and obey current county park rules.",
      "camping": "Treat this as a day-use route. Travis County Parks lists camping as prohibited at both Little Webberville Park and Webberville Park, and Paddle Today does not infer legal overnight use from islands, sandbars, or private banks between the ramps.",
      "campingClassification": "none",
      "summary": "Launch at Little Webberville Park and paddle five lower-Colorado miles to Webberville Park. Use the Colorado River at Austin gauge with a conservative 200 cfs floor, then make a same-day call on shallow bars, releases, weather, wind, motorboat traffic, and park hours.",
      "accessCaveats": [
        "Travis County publishes both endpoint parks as boat-ramp Colorado River accesses, but the coordinates are access anchors; follow current ramp signs and the wetted launch path on arrival.",
        "LCRA lists Little Webberville and Big Webberville as consecutive lower-Colorado access points five river miles apart, with Little Webberville managed by Travis County Parks and Big Webberville / Webberville Park also county-managed.",
        "The Austin gauge is upstream of the Webberville reach and the threshold floor is broad Austin-to-Bastrop guidance. Treat the app score as conservative and verify visible level at the ramp before launching.",
        "Little Webberville has no electricity or drinking water, and Travis County Parks does not provide paddling equipment. Bring water, shuttle gear, and a backup plan.",
        "Do not infer camping or casual private-bank stops from the short distance, mid-river bars, or nearby rural land. Both endpoint parks prohibit camping."
      ],
      "watchFor": [
        "Flows near or below about 200 cfs, when the Texas River Flows minimum is barely met and shallow bars or scraping can slow the day.",
        "High or rising water after rain or upstream release changes, when current, debris, and bank exits can change quickly even on this easy reach.",
        "Motorboat traffic near the county ramps, headwind on the broad channel, summer heat, thunderstorms, and limited services at Little Webberville.",
        "Snags, overhanging limbs, soft banks, island splits, and private banks away from the two public park accesses.",
        "Webberville Park closing at civil twilight; missing the take-out window creates an avoidable access problem."
      ]
    },
    "accessPoints": [
      {
        "id": "little-webberville-park-boat-ramp",
        "name": "Little Webberville Park",
        "latitude": 30.229665,
        "longitude": -97.518125,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream Travis County park boat-ramp access; open 24 hours for the ramp, with no drinking water."
      },
      {
        "id": "webberville-park-boat-ramp",
        "name": "Webberville Park",
        "latitude": 30.21587,
        "longitude": -97.494247,
        "mileFromStart": 5,
        "segmentKind": "creek",
        "note": "Default downstream Travis County park boat-ramp access; ramp hours are 8 a.m. to civil twilight."
      }
    ]
  },
  "colorado-river-webberville-utley-bridge": {
    "putIn": {
      "id": "webberville-park-boat-ramp",
      "name": "Webberville Park",
      "latitude": 30.21587,
      "longitude": -97.494247
    },
    "takeOut": {
      "id": "utley-fm-969-bridge",
      "name": "Utley (FM 969) Bridge",
      "latitude": 30.1683,
      "longitude": -97.4023
    },
    "logistics": {
      "distanceLabel": "About 14 mi",
      "estimatedPaddleTime": "About 5 hr to 8 hr at ordinary levels, longer if flow is below the 200 cfs floor, wind picks up, heat slows the group, or scouting the take-out takes time",
      "shuttle": "Stage the FM 969 / Utley Bridge take-out first, then drive back to Webberville Park. Webberville Park boat-ramp hours are 8 a.m. to civil twilight, so start early enough to launch legally and finish with daylight margin.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, use the named public access points, check LCRA Hydromet / USGS 08158000 and weather before launch, and obey current county park and TxDOT bridge-access signs.",
      "camping": "Treat this as a long day-use route. Webberville Park is a county park with posted boat-ramp hours, FM 969 / Utley is a bridge access, and no LCRA, Travis County, TPWD, or TRPA source supports legal camping for this selected segment. Paddle Today does not infer overnight rights from sandbars, islands, or private banks.",
      "campingClassification": "none",
      "summary": "Launch at Webberville Park and paddle 14 lower-Colorado miles to FM 969 / Utley Bridge. Use the Colorado River at Austin gauge with a conservative 200 cfs floor, then make a same-day call on low-water dragging, heat, wind, regulated releases, debris, and the long shuttle.",
      "accessCaveats": [
        "Travis County publishes Webberville Park as a boat-ramp access with daily ramp hours; coordinates are access anchors, so follow current ramp signs and the wetted launch path on arrival.",
        "LCRA lists Big Webberville Park and FM 969 / Utley Bridge as consecutive lower-Colorado access points 14 miles apart, with FM 969 managed by TxDOT.",
        "TRPA lists Webberville Park to Utley FM-969 Bridge / Boat Ramp as a featured 14-mile Colorado River run.",
        "The Austin gauge is upstream of the selected reach and the threshold floor is broad Austin-to-Bastrop guidance. Treat the app score as conservative and verify visible level at Webberville before launching.",
        "Do not infer camping or casual private-bank stops from the long distance, mid-river bars, or rural shoreline. No route source supports legal camping for this segment."
      ],
      "watchFor": [
        "Flows near or below about 200 cfs, when the Texas River Flows minimum is not met and shallow bars, scraping, and slow travel can dominate the 14-mile day.",
        "High or rising water after rain or upstream release changes, when current, debris, water quality, and bank exits can change quickly.",
        "Headwind on the broad channel, summer heat, thunderstorms, limited services, motorboat traffic near access points, and a finish that can run late if the group starts slowly.",
        "Snags, overhanging limbs, island splits, soft banks, and private banks away from Webberville Park and the FM 969 / Utley access.",
        "Missing the FM 969 / Utley take-out or leaving vehicles in a way that conflicts with current bridge-access signs."
      ]
    },
    "accessPoints": [
      {
        "id": "webberville-park-boat-ramp",
        "name": "Webberville Park",
        "latitude": 30.21587,
        "longitude": -97.494247,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream Travis County park boat-ramp access; ramp hours are 8 a.m. to civil twilight."
      },
      {
        "id": "horseshoe-on-the-colorado",
        "name": "Horseshoe on the Colorado",
        "latitude": 30.179637,
        "longitude": -97.427311,
        "mileFromStart": 7.4,
        "segmentKind": "creek",
        "note": "TPWD leased-access midpoint and optional take-out from Webberville; text vehicle details at least 24 hours ahead, complete the waiver, and use the immediate river access area only for loading and unloading."
      },
      {
        "id": "utley-fm-969-bridge",
        "name": "Utley (FM 969) Bridge",
        "latitude": 30.1683,
        "longitude": -97.4023,
        "mileFromStart": 14,
        "segmentKind": "creek",
        "note": "Default downstream LCRA / TxDOT bridge access and upstream put-in for the Wilbarger route."
      }
    ]
  },
  "colorado-river-horseshoe-utley-bridge": {
    "putIn": {
      "id": "horseshoe-on-the-colorado",
      "name": "Horseshoe on the Colorado",
      "latitude": 30.179637,
      "longitude": -97.427311
    },
    "takeOut": {
      "id": "utley-fm-969-bridge",
      "name": "Utley (FM 969) Bridge",
      "latitude": 30.1683,
      "longitude": -97.4023
    },
    "logistics": {
      "distanceLabel": "About 6.8 mi",
      "estimatedPaddleTime": "About 2 hr to 4 hr at ordinary lower-Colorado levels, longer if the flow is near the 200 cfs floor, wind pushes upstream, heat slows the group, or access logistics take time",
      "shuttle": "Stage the FM 969 / Utley Bridge take-out first, then drive back to Horseshoe on the Colorado only after texting the landowner at least 24 hours ahead with vehicle make, model, and license plate information.",
      "permits": "No route-specific paddling permit is published, but Horseshoe is a TPWD leased-access property with required advance text, vehicle information, liability waiver, designated parking, daylight access, no firearms, and no alcohol. Follow Texas boating and PFD rules and current signs at both access points.",
      "camping": "Treat this as a day-use route. Horseshoe access is open from 30 minutes before sunrise to 30 minutes after sunset, the immediate river access area is for loading and unloading only, Utley is a bridge access, and no TPWD, LCRA, or route-manager source supports legal camping for this selected segment.",
      "campingClassification": "none",
      "summary": "Launch at Horseshoe on the Colorado and paddle 6.8 lower-Colorado miles to the FM 969 / Utley Bridge access. Use the Colorado River at Bastrop gauge with a conservative 200 cfs floor, then make a same-day call on low-water dragging, heat, wind, regulated releases, debris, and private-bank discipline.",
      "accessCaveats": [
        "TPWD publishes Horseshoe as an active leased-access site through August 31, 2026, with the coordinate at 30.179637, -97.427311. Treat it as an access anchor and follow the signed parking and river-entry path on arrival.",
        "Text the Horseshoe landowner at least 24 hours before arrival with vehicle make, model, and license plate information; complete the waiver before using the property.",
        "Horseshoe is open daily from 30 minutes before sunrise to 30 minutes after sunset for bank angling and launching non-motorized boats, canoes, or kayaks for paddling or fishing.",
        "The immediate Horseshoe river access area is for loading and unloading only, parking must stay in the designated area, and TPWD says no firearms or alcohol are allowed on the property.",
        "Do not infer camping or casual private-bank stops from the short distance, sandbars, islands, or rural shoreline. No route source supports legal camping for this segment."
      ],
      "watchFor": [
        "Flows near or below about 200 cfs, when the Texas River Flows minimum is not met and shallow bars, scraping, and slow travel can dominate even this shorter segment.",
        "High or rising water after rain or upstream release changes, when current, debris, water quality, and bank exits can change quickly.",
        "Headwind on open bends, summer heat, thunderstorms, limited public exits, motorboat traffic near access points, and a missed or crowded take-out at FM 969 / Utley.",
        "Snags, overhanging limbs, island splits, soft banks, and private banks away from the named access points."
      ]
    },
    "accessPoints": [
      {
        "id": "horseshoe-on-the-colorado",
        "name": "Horseshoe on the Colorado",
        "latitude": 30.179637,
        "longitude": -97.427311,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default TPWD leased-access put-in; text vehicle details at least 24 hours ahead, complete the waiver, park in the designated area, and use the immediate river access area only for loading and unloading."
      },
      {
        "id": "utley-fm-969-bridge",
        "name": "Utley (FM 969) Bridge",
        "latitude": 30.1683,
        "longitude": -97.4023,
        "mileFromStart": 6.8,
        "segmentKind": "creek",
        "note": "Default downstream FM 969 / Utley Bridge take-out and upstream put-in for the Wilbarger route."
      }
    ]
  },
  "colorado-river-utley-bridge-fishermans-park": {
    "putIn": {
      "id": "utley-fm-969-bridge",
      "name": "Utley (FM 969) Bridge",
      "latitude": 30.1683,
      "longitude": -97.4023
    },
    "takeOut": {
      "id": "fishermans-park-bastrop",
      "name": "Fisherman's Park",
      "latitude": 30.1119,
      "longitude": -97.325
    },
    "logistics": {
      "distanceLabel": "About 14 mi",
      "estimatedPaddleTime": "About 5 hr to 8 hr on the water depending on flow, wind, heat, stops, and low-water dragging",
      "shuttle": "Stage Fisherman's Park first, then drive upstream to the Utley / FM 969 Bridge access. This is a full-day shuttle; local outfitter service is common, but private groups should confirm parking, daylight, and weather before committing.",
      "permits": "No route-specific public paddling permit is published. Follow Texas boating and PFD rules, use the named public accesses, respect posted park and bridge-access signs, and make any outfitter camping or shuttle arrangements separately.",
      "camping": "Treat the normal Wilbarger route as a long day trip. Bastrop River Co. offers a primitive Wilbarger river-camping option near Scout Island by arrangement, but Paddle Today does not treat islands, sandbars, or private banks as generally legal public campsites. Bastrop State Park is a nearby basecamp option with developed campsites and cabins.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Utley / FM 969 and paddle 14 miles to Fisherman's Park for the official Wilbarger Paddling Trail. Use USGS 08159200 at Bastrop with a conservative 200 cfs lower-Colorado floor, then make a same-day call on low-water dragging, full-day pace, wood, heat, wind, and private-bank discipline.",
      "accessCaveats": [
        "TPWD publishes both endpoint coordinates, while LCRA identifies FM 969 / Utley Bridge as a TxDOT-managed access and Fisherman's Park as a City of Bastrop access.",
        "Bastrop River Co. calls Wilbarger a full-day trip and not for beginners. Do not launch late or assume the mostly calm water makes the distance casual.",
        "This route uses a conservative minimum-only threshold from broad lower-Colorado guidance. If the Bastrop gauge is near the floor, expect slower travel, shallow dragging, and harder-to-avoid wood.",
        "Do not infer legal public camping from Scout Island, sandbars, or visible banks. Use a nearby campground or a separately arranged outfitter/permission-based overnight plan.",
        "Rainfall runoff and upstream release changes can alter current, debris, water quality, and sandbar availability on this lower Colorado reach."
      ],
      "watchFor": [
        "Low-water shallows, sandbar scraping, and slow travel across a 14-mile day when the Bastrop gauge approaches the 200 cfs floor.",
        "High or rising water after rain or upstream release changes, especially where bends, islands, and side channels collect wood.",
        "Snags, overhanging limbs, hidden rocks, soft banks, summer heat, thunderstorms, headwinds on open bends, and fatigue from a long flatwater day.",
        "Private banks outside the named public accesses and any direct hazard-portage corridor."
      ]
    },
    "accessPoints": [
      {
        "id": "utley-fm-969-bridge",
        "name": "Utley (FM 969) Bridge",
        "latitude": 30.1683,
        "longitude": -97.4023,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default TPWD put-in for the Bastrop Wilbarger trail."
      },
      {
        "id": "fishermans-park-bastrop",
        "name": "Fisherman's Park",
        "latitude": 30.1119,
        "longitude": -97.325,
        "mileFromStart": 14,
        "segmentKind": "creek",
        "note": "Default TPWD take-out in downtown Bastrop."
      }
    ]
  },
  "colorado-river-fishermans-park-lost-pines": {
    "putIn": {
      "id": "fishermans-park-bastrop",
      "name": "Fisherman's Park",
      "latitude": 30.1119,
      "longitude": -97.325
    },
    "takeOut": {
      "id": "lost-pines-recreational-trails",
      "name": "Lost Pines Recreational Trails / Colorado River Refuge",
      "latitude": 30.0735,
      "longitude": -97.3106
    },
    "logistics": {
      "distanceLabel": "About 6.0 mi",
      "estimatedPaddleTime": "About 1.5 hr to 4 hr depending on flow, stops, shallow dragging, wind, and how much time the group spends on sandbars",
      "shuttle": "Stage the Lost Pines / Colorado River Refuge take-out first, then drive back to Fisherman's Park in downtown Bastrop. TPWD flags flood impacts at the take-out, so verify current access after recent rain before leaving vehicles.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, use the named public access points, respect posted park hours and signs, and check current flow and weather before launching.",
      "camping": "Treat this as a day trip. TPWD El Camino Real material does not document established route camping, and informal sandbar or bank camping is not used for Paddle Today filters. Bastrop State Park is a nearby basecamp option with developed campsites and cabins.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Fisherman's Park and take out at Lost Pines / Colorado River Refuge for the official Bastrop El Camino Real Paddling Trail. Use USGS 08159200 at Bastrop with a conservative 800 cfs practical floor, then make a same-day call on shallow water, wood, regulated releases, weather, and take-out access.",
      "accessCaveats": [
        "TPWD publishes both endpoint coordinates, but the downstream Lost Pines take-out can be affected by floods and should be checked after recent rain.",
        "The local take-out is also described as Colorado River Refuge, a public nature park, but route users should still follow current park hours, parking rules, and any posted access signs.",
        "This route uses a conservative minimum-only threshold from local route notes. If the Bastrop gauge is below about 800 cfs, expect shallow dragging and more route-finding around sandbars.",
        "TPWD says rainfall runoff and regulated flows from upstream Highland Lakes infrastructure can change current and water quality on this lower Colorado reach.",
        "Do not infer legal camping from visible sandbars or islands. Use nearby established campgrounds or a separately verified river-camping plan instead."
      ],
      "watchFor": [
        "Low-water shallows, sandbar scraping, and dragging when the Bastrop gauge is below the local 800 cfs floor.",
        "High or rising water after rain or upstream release changes, especially where side channels collect wood or logjams.",
        "Snags, overhanging limbs, hidden rocks, prop scars, soft banks, summer heat, thunderstorms, and headwinds on open bends.",
        "Private banks outside the named public accesses and any direct hazard-portage corridor."
      ]
    },
    "accessPoints": [
      {
        "id": "fishermans-park-bastrop",
        "name": "Fisherman's Park",
        "latitude": 30.1119,
        "longitude": -97.325,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default TPWD put-in for the Bastrop El Camino Real trail."
      },
      {
        "id": "lost-pines-recreational-trails",
        "name": "Lost Pines Recreational Trails / Colorado River Refuge",
        "latitude": 30.0735,
        "longitude": -97.3106,
        "mileFromStart": 6,
        "segmentKind": "creek",
        "note": "Default TPWD take-out; verify flood-sensitive access after recent rain."
      }
    ]
  },
  "colorado-river-lost-pines-riverbend-park": {
    "putIn": {
      "id": "lost-pines-recreational-trails",
      "name": "Lost Pines Recreational Trails / Colorado River Refuge",
      "latitude": 30.0735,
      "longitude": -97.3106
    },
    "takeOut": {
      "id": "riverbend-park-smithville",
      "name": "Vernon L. Richards Riverbend Park",
      "latitude": 30.02,
      "longitude": -97.14
    },
    "logistics": {
      "distanceLabel": "About 20 mi",
      "estimatedPaddleTime": "About 7 hr to 10 hr depending on flow, headwind, heat, stops, low-water shallows, and group pace",
      "shuttle": "Stage Riverbend Park first, scout the rough walk-in river access, and decide whether the Highway 95 / Loop 230 bridge access is a better take-out for the group. Then drive back to Lost Pines / Bastrop County Nature Park. This is a long one-way day with few public exits, so leave daylight and weather margin.",
      "permits": "No route-specific public paddling permit is published. Riverbend camping or RV use should be reserved through Smithville Parks and Recreation when needed; otherwise follow Texas boating and PFD rules, posted park rules, and same-day flow and weather checks.",
      "camping": "Riverbend Park has overnight campsites and RV pads at the take-out, so this route works as an endpoint-campground trip. Do not infer legal camping from islands, gravel bars, random riverbanks, or private land between Bastrop County and Smithville.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Lost Pines / Colorado River Refuge and paddle the long Bastrop-to-Smithville lower-Colorado reach to Vernon L. Richards Riverbend Park. Use USGS 08159200 at Bastrop with a conservative 200 cfs floor, then make a same-day call on distance, wind, heat, shallow lines, releases, debris, and private-bank limits.",
      "accessCaveats": [
        "LCRA publishes rounded access coordinates for Lost Pines, Loop 230, and Riverbend Park; treat them as access anchors, not survey-grade wetted-edge launch points.",
        "Visit Smithville describes Riverbend Park access as rough dirt/brush and walk-in for canoes and kayaks. Scout the take-out before launching, and consider the Highway 95 / Loop 230 bridge access if the planned landing is not appropriate.",
        "This route uses a conservative minimum-only threshold from Bastrop-to-Smithville community guidance. If the Bastrop gauge is near or below about 200 cfs, expect slower travel, shallow routing, and a harder 20-mile day.",
        "Riverbend camping requires a normal park reservation or manager handling. Paddle Today does not treat mid-river islands, gravel bars, or private banks as generally legal campsites.",
        "Rainfall runoff and upstream release changes can alter current, debris, water quality, and sandbar availability on this lower Colorado reach."
      ],
      "watchFor": [
        "Strong southeasterly headwinds, summer heat, limited shade, and long flatwater fatigue over the 20-mile day.",
        "Low-water shallows, sand/cobble bars, slow lines, and possible dragging when flow drops toward the 200 cfs floor.",
        "High or rising water after rain or upstream release changes, especially where bends, islands, and side channels collect wood.",
        "Minor ledges or rapids at higher flows, soft banks, hidden rocks, thunderstorms, and limited public exits between Bastrop County and Smithville.",
        "Private banks outside the named public accesses and any direct hazard-portage corridor."
      ]
    },
    "accessPoints": [
      {
        "id": "lost-pines-recreational-trails",
        "name": "Lost Pines Recreational Trails / Colorado River Refuge",
        "latitude": 30.0735,
        "longitude": -97.3106,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream LCRA / Bastrop County public access; verify flood-sensitive access after recent rain."
      },
      {
        "id": "loop-230-smithville-bridge",
        "name": "Loop 230 / Highway 95 Bridge access",
        "latitude": 30.01,
        "longitude": -97.16,
        "mileFromStart": 19,
        "segmentKind": "creek",
        "note": "LCRA-listed public access one river mile above Riverbend Park; Visit Smithville describes a larger concrete access under the Highway 95 / Loop 230 bridge."
      },
      {
        "id": "riverbend-park-smithville",
        "name": "Vernon L. Richards Riverbend Park",
        "latitude": 30.02,
        "longitude": -97.14,
        "mileFromStart": 20,
        "segmentKind": "creek",
        "note": "Default downstream take-out and endpoint campground; rounded LCRA coordinate stored as an access anchor and arrival-point offset."
      }
    ]
  },
  "colorado-river-fm960-hollywood-bottom": {
    "putIn": {
      "id": "fm-960-bridge-colorado",
      "name": "FM 960 Bridge",
      "latitude": 29.34,
      "longitude": -96.20
    },
    "takeOut": {
      "id": "hollywood-bottom-park-colorado",
      "name": "Hollywood Bottom Park",
      "latitude": 29.16,
      "longitude": -96.04
    },
    "logistics": {
      "distanceLabel": "About 19 mi",
      "estimatedPaddleTime": "About 6 hr to 10 hr depending on flow, wind, heat, low-water shallows, stops, and group pace",
      "shuttle": "Stage Hollywood Bottom Park first, then drive to the FM 960 Bridge access. FM 960 is a TxDOT pedestrian access down a dirt path to a steep river edge rather than a conventional boat ramp; inspect the carry and take-out before committing to the long one-way day.",
      "permits": "No route-specific public paddling permit is published. Follow Texas boating and PFD rules, use the named public access points, obey posted TxDOT/LCRA/park rules, and check same-day flow, weather, and access conditions before launching.",
      "camping": "Hollywood Bottom Park permits camping and is the only documented route-camp support in this package. Do not infer legal camping on islands, sandbars, or private banks between FM 960 and Hollywood Bottom.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at the official FM 960 Bridge access and paddle the distinct lower-Colorado reach to LCRA's Hollywood Bottom Park. Use USGS 08162000 at Wharton with a conservative 200 cfs floor, then make a same-day call on steep access, shallow lines, rising water, wind, heat, debris, and private-bank limits.",
      "accessCaveats": [
        "LCRA describes FM 960 as an unimproved dirt path to a steep river edge. Carry boats carefully and do not treat the shoulder or private banks as a vehicle ramp or parking entitlement.",
        "Hollywood Bottom Park is open 24 hours and camping is permitted, but confirm current park conditions and take-out logistics before launch.",
        "The 200 cfs floor is a conservative community estimate tied to the Wharton gauge, not a go/no-go authority. Below the floor expect shallow or bony lines; high or rising water can increase current and debris hazards.",
        "This is a long reach with few public exits. Stage the shuttle, leave daylight and weather margin, and do not continue toward downstream dams or private access without a separately verified plan.",
        "Respect private banks and use only the named public endpoints or lawful hazard exits."
      ],
      "watchFor": [
        "Steep, unimproved FM 960 launch bank and difficult boat carry.",
        "Low-water shallows, gravel, and scraping near the 200 cfs floor.",
        "Fast rises after storms or releases, strainers, floating wood, strong wind, heat, and limited shade.",
        "Private banks, unverified side landings, and any downstream dam or portage situation."
      ]
    },
    "accessPoints": [
      {
        "id": "fm-960-bridge-colorado",
        "name": "FM 960 Bridge",
        "latitude": 29.34,
        "longitude": -96.20,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream access anchor from LCRA; pedestrian dirt-path access to a steep river edge, not a conventional ramp."
      },
      {
        "id": "hollywood-bottom-park-colorado",
        "name": "Hollywood Bottom Park",
        "latitude": 29.16,
        "longitude": -96.04,
        "mileFromStart": 19,
        "segmentKind": "creek",
        "note": "Default LCRA downstream take-out; 24-hour access with camping permitted."
      }
    ]
  },
  "colorado-river-business-71-beasons-park": {
    "putIn": {
      "id": "business-71-crossing-columbus",
      "name": "71 Business Crossing",
      "latitude": 29.7128,
      "longitude": -96.5466
    },
    "takeOut": {
      "id": "beasons-park-columbus",
      "name": "Beason's Park",
      "latitude": 29.7055,
      "longitude": -96.536
    },
    "logistics": {
      "distanceLabel": "About 6.5 mi",
      "estimatedPaddleTime": "About 2 hr to 5 hr depending on flow, wind, island stops, shallow spots, heat, and group pace",
      "shuttle": "Stage Beason's Park first, then drive back to the 71 Business Crossing / North River Bridge put-in. TPWD describes Beason's Park as the improved take-out with parking, restrooms, picnic tables, and a pavilion, but the put-in is still a bridge-side boat-ramp access that should be checked before leaving vehicles.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, use the named public access points, respect park hours and posted signs, and check same-day flow and weather before launching.",
      "camping": "Treat this as a day trip. Current TPWD Columbus trail material does not document established route camping or an endpoint campground; use separately reserved Columbus-area campgrounds or lodging instead of inferring legal sandbar or private-bank camping from proximity to the river.",
      "campingClassification": "none",
      "summary": "Launch at the 71 Business Crossing and take out at Beason's Park for the official Columbus Paddling Trail around the Colorado River horseshoe. Use USGS 08161000 at Columbus with a conservative 200 cfs floor, then make a same-day call on shallow spots, wind, heat, private banks, and rising water.",
      "accessCaveats": [
        "TPWD publishes both endpoint coordinates, but the 71 Business Crossing put-in is a simple bridge-side boat-ramp access rather than a staffed livery launch.",
        "Beason's Park is the planned public finish and has parking, restrooms, picnic tables, and a pavilion. Do not drift past the take-out assuming downstream banks are public.",
        "This route uses a conservative minimum-only threshold from broad lower-Colorado guidance plus local same-gauge reports. If the Columbus gauge is near or below about 200 cfs, expect shallow route-finding around islands and sandy bars.",
        "TPWD says private-bank use outside direct hazard portages can be trespassing. Keep stops on clearly public access points or within the navigable streambed rules.",
        "Do not infer legal route camping from islands, sandbars, or historic Beason's Crossing camping references. The Paddle Today route package treats official Columbus trail use as day-only."
      ],
      "watchFor": [
        "Low-water shallows, sandy islands, and occasional scraping when the Columbus gauge falls toward the 200 cfs floor.",
        "High or rising water after rain, when broad calm-looking bends can gain current and make simple park or bridge landings less forgiving.",
        "Wind on open bends, summer heat, thunderstorms, soft banks, floating wood, and shifting lines around islands in the first third of the trail.",
        "Private banks outside the named public accesses and any direct hazard-portage corridor."
      ]
    },
    "accessPoints": [
      {
        "id": "business-71-crossing-columbus",
        "name": "71 Business Crossing",
        "latitude": 29.7128,
        "longitude": -96.5466,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default TPWD put-in under the North River Bridge."
      },
      {
        "id": "beasons-park-columbus",
        "name": "Beason's Park",
        "latitude": 29.7055,
        "longitude": -96.536,
        "mileFromStart": 6.5,
        "segmentKind": "creek",
        "note": "Default TPWD take-out with parking, restrooms, picnic tables, and pavilion."
      }
    ]
  },
  "colorado-river-plum-park-buffalo-trail": {
    "putIn": {
      "id": "plum-park-on-the-colorado",
      "name": "Plum Park on the Colorado",
      "latitude": 29.97,
      "longitude": -97
    },
    "takeOut": {
      "id": "buffalo-trail-park-la-grange",
      "name": "Buffalo Trail Park",
      "latitude": 29.9007004,
      "longitude": -96.8862568
    },
    "logistics": {
      "distanceLabel": "About 18 mi",
      "estimatedPaddleTime": "About 6 hr to 9 hr depending on flow, wind, heat, low-water rock gardens, stops, and group pace",
      "shuttle": "Stage Buffalo Trail Park in La Grange first, then drive upstream to Plum Park. This is a long one-way day with limited public exits, so confirm both access points, daylight, weather, and vehicle logistics before launching.",
      "permits": "No route-specific public paddling permit is published. Plum Park camping or special access should be arranged with LCRA when needed; otherwise follow Texas boating and PFD rules, posted park rules, and same-day flow and weather checks.",
      "camping": "Plum Park allows camping for parties arriving by river or by prior arrangement with LCRA parks, so overnight support is endpoint-campground only. Do not infer legal camping from islands, sandbars, gravel bars, or private banks between Plum Park and La Grange.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Plum Park and paddle the long lower-Colorado reach to Buffalo Trail Park in La Grange. Use USGS 08160400 above La Grange with a conservative 200 cfs floor, then make a same-day call on shallow rock gardens, wind, heat, releases, debris, and private-bank limits.",
      "accessCaveats": [
        "LCRA publishes rounded access coordinates for Plum Park, while the City of La Grange map resolves Buffalo Trail Park more precisely; treat both as access anchors, not exact wetted-edge launch coordinates.",
        "The City of La Grange says Buffalo Trail Park provides Colorado River access for canoe trips, but the park page also notes bridge construction context. Confirm the boat-ramp approach before committing to the shuttle.",
        "This route uses a conservative minimum-only threshold from lower-Colorado community guidance. If the La Grange gauge is near or below about 200 cfs, expect shallow route-finding, exposed cobble, and a slower long day.",
        "Plum Park camping requires river arrival or prior arrangement; Paddle Today does not treat mid-river islands, gravel bars, or private banks as generally legal campsites.",
        "Rainfall runoff and upstream release changes can alter current, debris, water quality, and sandbar availability on this lower Colorado reach."
      ],
      "watchFor": [
        "Low-water shallows, cobble bars, Buffalo Wallow Rapid, and the La Grange rock garden when the gauge is near or below the 200 cfs floor.",
        "High or rising water after rain or upstream release changes, especially where bends, islands, and side channels collect wood.",
        "Wind on open bends, summer heat, thunderstorms, long flatwater fatigue, soft banks, hidden rocks, and limited public exits over 18 miles.",
        "Private banks outside the named public accesses and any direct hazard-portage corridor."
      ]
    },
    "accessPoints": [
      {
        "id": "plum-park-on-the-colorado",
        "name": "Plum Park on the Colorado",
        "latitude": 29.97,
        "longitude": -97,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default LCRA put-in; rounded coordinate stored as an access anchor."
      },
      {
        "id": "buffalo-trail-park-la-grange",
        "name": "Buffalo Trail Park",
        "latitude": 29.9007004,
        "longitude": -96.8862568,
        "mileFromStart": 18,
        "segmentKind": "creek",
        "note": "Default City of La Grange take-out; City map coordinate stored as an access anchor."
      }
    ]
  },
  "colorado-river-riverbend-park-plum-park": {
    "putIn": {
      "id": "riverbend-park-smithville",
      "name": "Vernon L. Richards Riverbend Park",
      "latitude": 30.02,
      "longitude": -97.14
    },
    "takeOut": {
      "id": "plum-park-on-the-colorado",
      "name": "Plum Park on the Colorado",
      "latitude": 29.97,
      "longitude": -97
    },
    "logistics": {
      "distanceLabel": "About 17 mi",
      "estimatedPaddleTime": "About 6 hr to 9 hr depending on flow, wind, heat, low-water dragging, stops, and group pace",
      "shuttle": "Stage Plum Park first, then drive upstream to Smithville's Riverbend Park. This is a long one-way day with limited public exits, so verify both access roads, park rules, daylight, weather, and vehicle logistics before launching.",
      "permits": "No route-specific public paddling permit is published. Plum Park camping or special access should be arranged with LCRA when needed; otherwise follow Texas boating and PFD rules, posted park rules, and same-day flow and weather checks.",
      "camping": "Plum Park allows camping for parties arriving by river or by prior arrangement with LCRA parks, so overnight support is endpoint-campground only. Riverbend also has local camping context, but this route does not treat mid-river islands, gravel bars, or private banks as generally legal campsites.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Vernon L. Richards Riverbend Park in Smithville and paddle the long lower-Colorado reach to LCRA's Plum Park. Use USGS 08160400 above La Grange with a conservative 200 cfs floor, then make a same-day call on shallow lines, wind, heat, releases, debris, and private-bank limits.",
      "accessCaveats": [
        "LCRA publishes rounded access coordinates for both Riverbend Park and Plum Park; treat them as access anchors, not survey-grade wetted-edge launch coordinates.",
        "Visit Smithville describes the Riverbend access as rough dirt/brush and walk-in for canoes and kayaks. Scout the actual water-entry point before leaving a loaded vehicle or committing a group.",
        "This route uses the La Grange USGS gauge because it is product-live for the same Smithville-to-La Grange section. The discontinued Smithville gauge remains useful context only, not the selected product gauge.",
        "This route uses a conservative minimum-only threshold from lower-Colorado community guidance. If the La Grange gauge is below about 200 cfs, expect shallow route-finding, exposed bars, and a slower long day.",
        "Plum Park camping requires river arrival or prior arrangement. Do not infer legal camping from islands, gravel bars, or private banks between Smithville and Plum Park."
      ],
      "watchFor": [
        "Low-water shallows, sand/cobble bars, slow lines, and possible dragging when the gauge is near or below the 200 cfs floor.",
        "High or rising water after rain or upstream release changes, especially where bends, islands, and side channels collect wood.",
        "Strong headwinds, summer heat, limited shade, thunderstorms, long flatwater fatigue, soft banks, floating wood, and few public exits over 17 miles.",
        "Private banks outside the named public accesses and any direct hazard-portage corridor."
      ]
    },
    "accessPoints": [
      {
        "id": "riverbend-park-smithville",
        "name": "Vernon L. Richards Riverbend Park",
        "latitude": 30.02,
        "longitude": -97.14,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default LCRA / City of Smithville put-in; rounded coordinate stored as an access anchor and arrival-point offset."
      },
      {
        "id": "plum-park-on-the-colorado",
        "name": "Plum Park on the Colorado",
        "latitude": 29.97,
        "longitude": -97,
        "mileFromStart": 17,
        "segmentKind": "creek",
        "note": "Default LCRA take-out and river-arrival campground; rounded coordinate stored as an access anchor."
      }
    ]
  },
  "brazos-river-riverside-park-spivey-crossing": {
    "putIn": {
      "id": "riverside-park-whitney-dam",
      "name": "Riverside Park below Whitney Dam",
      "latitude": 31.866028,
      "longitude": -97.367336
    },
    "takeOut": {
      "id": "spivey-crossing-rv-park",
      "name": "Spivey Crossing RV Park",
      "latitude": 31.801114,
      "longitude": -97.307315
    },
    "logistics": {
      "distanceLabel": "About 9.6 mi",
      "estimatedPaddleTime": "Good half-day to long half-day when Whitney releases and the Aquilla gauge are comfortably above the floor; current below-floor readings can mean shallow bars, dragging, and no-go conditions",
      "shuttle": "Stage Spivey Crossing first only after calling ahead for availability, fee, liability paperwork, and any shuttle handling, then return to Riverside Park below Whitney Dam. Inspect Riverside's river access before leaving because USACE closes the gravel river-access road when floodwater is being released.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, use Riverside Park and Spivey Crossing only under current posted conditions, obey USACE park hours and closures, and follow TPWD leased-access rules at Spivey.",
      "camping": "Treat this as a day route with nearby or endpoint basecamp options only. USACE documents five Riverside camp/picnic sites, and TPWD notes RV hookups, a river cabin, and a cottage at the adjacent Spivey property, but those facilities are separate access or reservation services; do not infer legal camping from bars, private banks, or ranch land.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Riverside Park below Whitney Dam and take out at Spivey Crossing for TPWD RACA's Whitney-to-Spivey Brazos segment. Use the Aquilla gauge with BRA's Brazos flow chart, then confirm dam releases, Spivey access, current, weather, and private-bank limits before leaving a shuttle.",
      "accessCaveats": [
        "USACE documents Riverside Park on both sides of the Brazos below Whitney Dam. The stored put-in coordinate is a route-guide access anchor for Riverside Park; use current signs, park roads, and safe riverbank conditions for the actual water entry.",
        "USACE says the east-side gravel access road to the river closes when floodwater is being released. If that access is closed, skip the route instead of improvising a dam-tailwater launch.",
        "TPWD publishes Spivey as an active leased-access take-out through August 31, 2027. Call before arrival, confirm availability, pay the day-use fee, sign required liability paperwork, and prearrange shuttle handling when using it as the downstream exit.",
        "The route was implemented with USGS 08093100 at 55.3 cfs, far below BRA's 200 cfs paddling minimum. At similar readings, the app should rate the route below floor rather than encouraging a launch.",
        "Lake Whitney Dam releases can create rapid rises and swift current even if the day starts low. Recheck release conditions, weather, and the hydrograph before committing."
      ],
      "watchFor": [
        "Flows at or below about 200 cfs on USGS 08093100, when BRA says the Brazos is below the minimum needed for paddling.",
        "Hydropower peaking or flood releases from Whitney Dam, rising water, fresh basin rainfall, or flows above about 1,200 cfs, when BRA's chart moves into hazardous or worse categories.",
        "Closed Riverside river-access road, changed park access, Spivey availability limits, fee or liability-form requirements, and shuttle confusion at the leased take-out.",
        "Private banks, ranch roads, low-water bars, driftwood, strainers, possible fences or debris after releases, and rural cell-service gaps.",
        "Heat, sun exposure, wind on open bends, and the temptation to continue past Spivey without the separate Spivey-to-Brazos-River-Nature-Center package."
      ]
    },
    "accessPoints": [
      {
        "id": "riverside-park-whitney-dam",
        "name": "Riverside Park below Whitney Dam",
        "latitude": 31.866028,
        "longitude": -97.367336,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "USACE public park and Southwest Paddler access-anchor coordinate below Whitney Dam; use current park signs and open river-access roads for the actual launch."
      },
      {
        "id": "spivey-crossing-rv-park",
        "name": "Spivey Crossing RV Park",
        "latitude": 31.801114,
        "longitude": -97.307315,
        "mileFromStart": 9.59,
        "segmentKind": "creek",
        "note": "Default TPWD RACA / leased-access take-out anchor; call ahead for availability, fee, liability form, and shuttle handling."
      }
    ]
  },
  "brazos-river-spivey-crossing-brazos-river-nature-center": {
    "putIn": {
      "id": "spivey-crossing-rv-park",
      "name": "Spivey Crossing RV Park",
      "latitude": 31.801114,
      "longitude": -97.307315
    },
    "takeOut": {
      "id": "brazos-river-nature-center",
      "name": "Brazos River Nature Center",
      "latitude": 31.698655,
      "longitude": -97.279101
    },
    "logistics": {
      "distanceLabel": "About 10-11 mi",
      "estimatedPaddleTime": "Long half-day to full rural day when Whitney releases and the Aquilla gauge are comfortably above the floor; current below-floor readings can mean shallow bars, dragging, and no-go conditions",
      "shuttle": "Stage BRNC first only after making the required advance reservation, fee payment, and liability-form arrangements, then return to Spivey Crossing after confirming its call-ahead access, fee, waiver, and loading rules. The stored BRNC point follows TPWD's RACA GIS access geometry; the page's 31.69956, -97.26898 driving coordinate sits inland and should be treated as arrival context. Use current signs, designated trails, and safe banks for the actual entry and exit.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, use Spivey and BRNC only under current TPWD leased-access rules, make required advance arrangements at both properties, and obey all posted access restrictions.",
      "camping": "Treat this as a day route with nearby-basecamp support only. TPWD notes RV hookups, a river cabin, and a cottage at the adjacent Spivey property, but the public lease use is daylight access; BRNC is primitive with no restrooms or potable water. Do not infer legal camping from bars, private banks, ranch land, or BRNC trails.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Spivey Crossing and take out at Brazos River Nature Center for TPWD's downstream Brazos tailwater option below Lake Whitney. Use the Aquilla gauge with BRA's Brazos flow chart, then confirm Whitney releases, access reservations, current, weather, primitive BRNC logistics, and private-bank limits before leaving a shuttle.",
      "accessCaveats": [
        "TPWD publishes Spivey as an active leased access through August 31, 2027. Call before arrival, confirm availability, pay the day-use fee, sign required liability paperwork, and arrange any shuttle handling before using it as the put-in.",
        "The stored Spivey coordinate is TPWD's RACA GIS access anchor. TPWD's driving latitude/longitude and the route coordinate should both be treated as arrival context, not a surveyed wetted-edge launch point.",
        "TPWD publishes BRNC as an active leased access through August 31, 2027, but requires 24-hour advance contact, fee payment, and liability paperwork; access is restricted to designated trails and parking areas only.",
        "The stored BRNC take-out coordinate is TPWD's RACA GIS access point at 31.698655, -97.279101. TPWD's HTML page also lists 31.69956, -97.26898 for driving directions, about 0.6 mi east/inland of the GIS river-access point, so follow current site directions and posted trails rather than treating either point as a surveyed wetted-edge landing.",
        "BRNC is primitive: TPWD says there are currently no restrooms and no potable water. Carry enough water and do not plan on services at the take-out.",
        "The route was implemented with USGS 08093100 at 61.4 cfs / 6.13 ft at 2026-08-12 16:00 CDT, far below BRA's 200 cfs paddling minimum. At similar readings, the app should rate the route below floor rather than encouraging a launch."
      ],
      "watchFor": [
        "Flows at or below about 200 cfs on USGS 08093100, when BRA says the Brazos is below the minimum needed for paddling.",
        "Hydropower peaking or flood releases from Whitney Dam, rising water, fresh basin rainfall, or flows above about 1,200 cfs, when BRA's chart moves into hazardous or worse categories.",
        "Spivey and BRNC reservation, gate, fee, waiver, shuttle, trail-use, and parking rules; either endpoint can become unavailable if site conditions are too wet, muddy, or full.",
        "Private banks, ranch roads, low-water bars, driftwood, strainers, possible fences or debris after releases, and rural cell-service gaps.",
        "Heat, sun exposure, wind on open bends, no potable water or restrooms at BRNC, and the temptation to continue downstream toward Waco without a separate Bosque Bluffs route package."
      ]
    },
    "accessPoints": [
      {
        "id": "spivey-crossing-rv-park",
        "name": "Spivey Crossing RV Park",
        "latitude": 31.801114,
        "longitude": -97.307315,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Existing TPWD RACA / leased-access anchor; call ahead for availability, fee, liability form, and shuttle handling before using it as the put-in."
      },
      {
        "id": "brazos-river-nature-center",
        "name": "Brazos River Nature Center",
        "latitude": 31.698655,
        "longitude": -97.279101,
        "mileFromStart": 10.5,
        "segmentKind": "creek",
        "note": "TPWD RACA GIS leased-access take-out anchor for the downstream float from Spivey; the HTML page's driving coordinate is inland. Advance reservation, fee payment, liability paperwork, designated-trail use, and primitive-site planning are required."
      }
    ]
  },
  "brazos-river-fullers-folly-sandy-bottoms": {
    "putIn": {
      "id": "fullers-folly-river-ranch",
      "name": "Fuller's Folly River Ranch",
      "latitude": 32.61955,
      "longitude": -97.89381
    },
    "takeOut": {
      "id": "sandy-bottoms-river-trail-camp",
      "name": "Sandy Bottoms River Trail Camp",
      "latitude": 32.580406,
      "longitude": -97.892005
    },
    "logistics": {
      "distanceLabel": "About 4.1 mi",
      "estimatedPaddleTime": "Short half-day float when the Dennis gauge is comfortably above the floor; slower near 200 cfs or when shallow bars, heat, or bank conditions make access awkward",
      "shuttle": "Stage Sandy Bottoms River Trail Camp first after confirming access availability, then return to Fuller's Folly River Ranch. Both sites require advance contact and liability forms for TPWD leased-access users, so do not assume a drop-in shuttle will work.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, use the TPWD leased-access sites only during posted daylight windows, contact each property at least 24 hours ahead, and obey any current lease or property rules.",
      "camping": "Treat the paddle route as day-use only. TPWD describes private accommodations at Fuller's Folly and Sandy Bottoms, but those are separate reservation-based services and not public route camping rights; do not infer legal camps from bars, private banks, or ranch land.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Fuller's Folly and take out at Sandy Bottoms River Trail Camp for TPWD's short leased-access Brazos float upstream of Lake Granbury. Use the Dennis gauge with BRA's conservative Brazos flow chart, then confirm access, current, weather, and private-bank limits before driving the shuttle.",
      "accessCaveats": [
        "TPWD publishes both endpoint coordinates as leased-access site anchors. Final water entry and exit should follow current signs, property instructions, and safe bank conditions rather than a projected mid-channel point.",
        "Fuller's Folly access is open from 30 minutes before sunrise to 30 minutes after sunset and requires at least 24-hour advance contact by email or backup phone.",
        "Sandy Bottoms access is open from 30 minutes before sunrise to 30 minutes before sunset and requires at least 24-hour advance text contact, with a liability form before access.",
        "The current Dennis gauge reading during implementation was just above BRA's 200 cfs lower floor. At similar levels, expect more paddling, exposed gravel or sand, and possible dragging.",
        "BRA notes that upstream reservoir releases and storms can change Brazos flow. Recheck the hydrograph and weather before leaving a vehicle."
      ],
      "watchFor": [
        "Flows at or below about 200 cfs on USGS 08090800, when BRA says the Brazos is below the minimum needed for paddling.",
        "Flows above about 1,200 cfs, rising water, upstream releases, or fresh basin rainfall, when BRA's chart moves into hazardous or worse categories.",
        "Private banks, ranch roads, fences, livestock areas, muddy landings, low-water bars, driftwood, strainers, and wood moved by recent releases.",
        "Heat, sun exposure, wind on open bends, and rural cell-service gaps despite the short mileage.",
        "Access uncertainty if either leased site is unavailable, posted differently, or cannot accept the group that day; skip the trip rather than inventing an alternate private landing."
      ]
    },
    "accessPoints": [
      {
        "id": "fullers-folly-river-ranch",
        "name": "Fuller's Folly River Ranch",
        "latitude": 32.61955,
        "longitude": -97.89381,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default TPWD leased-access put-in and access anchor; contact Fuller's Folly at least 24 hours in advance and follow site instructions for the actual launch."
      },
      {
        "id": "sandy-bottoms-river-trail-camp",
        "name": "Sandy Bottoms River Trail Camp",
        "latitude": 32.580406,
        "longitude": -97.892005,
        "mileFromStart": 4.1,
        "segmentKind": "creek",
        "note": "Default TPWD leased-access take-out and access anchor; contact Sandy Bottoms in advance, sign required liability paperwork, and use current property directions for the actual landing."
      }
    ]
  },
  "brazos-river-sandy-bottoms-chavez-access": {
    "putIn": {
      "id": "sandy-bottoms-river-trail-camp",
      "name": "Sandy Bottoms River Trail Camp",
      "latitude": 32.580406,
      "longitude": -97.892005
    },
    "takeOut": {
      "id": "sandy-bottoms-chavez-access",
      "name": "Sandy Bottoms Chavez Access",
      "latitude": 32.563572,
      "longitude": -97.877014
    },
    "logistics": {
      "distanceLabel": "About 1.5 mi",
      "estimatedPaddleTime": "Very short downstream connector for a practice, fishing, or family shuttle when the Dennis gauge is comfortably above the floor; near 200 cfs, expect shallow bars and possible dragging even on the short mileage",
      "shuttle": "Stage Sandy Bottoms Chavez Access first after confirming access availability, then return to Sandy Bottoms River Trail Camp. TPWD requires at least 24-hour advance text contact and liability paperwork, so do not assume a same-day drop-in shuttle will work.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, use the TPWD leased-access sites only during posted daylight windows, contact Sandy Bottoms at least 24 hours ahead, and obey any current lease or property rules.",
      "camping": "Treat the paddle route as day-use only. TPWD describes private accommodations at Sandy Bottoms, but those are separate reservation-based services and not public route camping rights; do not infer legal camps from bars, private banks, or ranch land.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Sandy Bottoms River Trail Camp and take out at Sandy Bottoms Chavez Access for TPWD's very short leased-access Brazos connector upstream of Lake Granbury. Use the Dennis gauge with BRA's conservative Brazos flow chart, then confirm access, current, weather, and private-bank limits before driving the shuttle.",
      "accessCaveats": [
        "TPWD publishes both endpoint coordinates as leased-access site anchors. Final water entry and exit should follow current signs, property instructions, the Chavez dock or access directions, and safe bank conditions rather than a projected mid-channel point.",
        "Sandy Bottoms access is open from 30 minutes before sunrise to 30 minutes before sunset and requires at least 24-hour advance text contact, with a liability form before access.",
        "Chavez Access is a separate Sandy Bottoms downstream access with direct river access and a small dock for paddle craft and fishing; confirm it is available for take-out before launching upstream.",
        "The current Dennis gauge reading during implementation was just above BRA's 200 cfs lower floor. At similar levels, expect more paddling, exposed gravel or sand, and possible dragging.",
        "BRA notes that upstream reservoir releases and storms can change Brazos flow. Recheck the hydrograph and weather before leaving a vehicle."
      ],
      "watchFor": [
        "Flows at or below about 200 cfs on USGS 08090800, when BRA says the Brazos is below the minimum needed for paddling.",
        "Flows above about 1,200 cfs, rising water, upstream releases, or fresh basin rainfall, when BRA's chart moves into hazardous or worse categories.",
        "Private banks, ranch roads, fences, livestock areas, muddy landings, low-water bars, driftwood, strainers, and wood moved by recent releases.",
        "Heat, sun exposure, wind on open bends, and rural cell-service gaps despite the short mileage.",
        "Access uncertainty if either leased site is unavailable, posted differently, or cannot accept the group that day; skip the trip rather than inventing an alternate private landing."
      ]
    },
    "accessPoints": [
      {
        "id": "sandy-bottoms-river-trail-camp",
        "name": "Sandy Bottoms River Trail Camp",
        "latitude": 32.580406,
        "longitude": -97.892005,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default TPWD leased-access put-in and access anchor; contact Sandy Bottoms at least 24 hours in advance and follow site instructions for the actual launch."
      },
      {
        "id": "sandy-bottoms-chavez-access",
        "name": "Sandy Bottoms Chavez Access",
        "latitude": 32.563572,
        "longitude": -97.877014,
        "mileFromStart": 1.5,
        "segmentKind": "creek",
        "note": "Default TPWD leased-access take-out and access anchor; TPWD says the site is about 1.5 river miles downstream and has direct river access plus a small dock for paddle craft and fishing."
      }
    ]
  },
  "brazos-river-milam-county-area-1-area-2": {
    "putIn": {
      "id": "brazos-river-milam-county-area-1",
      "name": "Brazos River Milam County Area 1",
      "latitude": 30.977162,
      "longitude": -96.761887
    },
    "takeOut": {
      "id": "brazos-river-milam-county-area-2",
      "name": "Brazos River Milam County Area 2",
      "latitude": 30.919294,
      "longitude": -96.746588
    },
    "logistics": {
      "distanceLabel": "About 5 mi",
      "estimatedPaddleTime": "Short half-day float when the Highbank gauge is comfortably above the floor; slower near 200 cfs or when shallow bars, heat, bottomland mud, or the long Area 2 access path slows the take-out",
      "shuttle": "Stage Area 2 first only after contacting BRMC for gate codes, site conditions, and any shuttle-service details, then return to Area 1 at FM 979. TPWD says the Area 2 river access is about one mile from the designated parking area through Brazos River bottomland forest, so scout the finish path before committing.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, use the TPWD leased-access sites only during posted daylight windows, contact BRMC before arrival for gate codes and current site conditions, and obey any temporary wet-weather or flooding closure.",
      "camping": "Treat this as a day-use leased-access route with no public route camping selected. TPWD publishes daylight access, gate-code procedures, muddy-site closures, and pack-in/pack-out rules, but no route campsite or public overnight right for Area 1, Area 2, private banks, or bottomland forest.",
      "campingClassification": "none",
      "summary": "Launch at Brazos River Milam County Area 1 and take out at Area 2 for TPWD's 5-mile leased-access Brazos float downstream of FM 979. Use the Highbank gauge with BRA's conservative Brazos flow chart, then confirm access, weather, site mud, and private-bank limits before leaving a shuttle.",
      "accessCaveats": [
        "TPWD publishes Area 1 and Area 2 coordinates as leased-access anchors. Final water entry and exit should follow current signs, BRMC instructions, and safe bank conditions rather than projected mid-channel points.",
        "Area 1 is the TPWD-named put-in at 10794 FM 979 near Cameron; Area 2 is the TPWD-named take-out at 5988 County Road 259 near Cameron.",
        "TPWD requires prearrival contact for gate codes and site conditions. The access areas can temporarily close when wet or muddy from rain or flooding.",
        "Area 2's river access is about one mile from the parking area through bottomland forest. Prearrange any shuttle support and inspect the route out before paddling.",
        "USGS 08098290 was below BRA's 200 cfs paddling floor during implementation. At similar levels, expect shallow bars, more paddling, dragging, and a no-go rating until flows recover."
      ],
      "watchFor": [
        "Flows at or below about 200 cfs on USGS 08098290, when BRA says the Brazos is below the minimum needed for paddling.",
        "Flows above about 1,200 cfs, rising water, upstream reservoir releases, or fresh basin rainfall, when BRA's chart moves into hazardous or worse categories.",
        "Muddy leased-access roads or bottomland paths, temporary site closures, a long carry or shuttle transfer at Area 2, and any changed gate-code or landowner instructions.",
        "Private banks, fences, ranch roads, livestock areas, sand or gravel bars, driftwood, strainers, and wood moved by recent flow changes.",
        "Heat, sun exposure, wind on open bends, rural cell-service gaps, and the temptation to improvise a private landing if Area 2 is unavailable."
      ]
    },
    "accessPoints": [
      {
        "id": "brazos-river-milam-county-area-1",
        "name": "Brazos River Milam County Area 1",
        "latitude": 30.977162,
        "longitude": -96.761887,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default TPWD leased-access put-in and access anchor at FM 979; contact BRMC before arrival and follow current site instructions for the actual launch."
      },
      {
        "id": "brazos-river-milam-county-area-2",
        "name": "Brazos River Milam County Area 2",
        "latitude": 30.919294,
        "longitude": -96.746588,
        "mileFromStart": 5,
        "segmentKind": "creek",
        "note": "Default TPWD leased-access take-out and access anchor; TPWD says the river access is about one mile from designated parking through bottomland forest."
      }
    ]
  },
  "brazos-river-county-park-bells-landing": {
    "putIn": {
      "id": "brazos-river-county-park",
      "name": "Brazos River County Park",
      "latitude": 29.201,
      "longitude": -95.5642
    },
    "takeOut": {
      "id": "bells-landing",
      "name": "Bells Landing",
      "latitude": 29.1408,
      "longitude": -95.6153
    },
    "logistics": {
      "distanceLabel": "About 8.3 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr at ordinary levels, longer with headwind, tidal influence, low-water snags, heat, or slow bank access at Bells Landing",
      "shuttle": "Stage Bells Landing first, then drive back to Brazos River County Park. TPWD says the county-park access is near the pavilion and about 400 feet from parking, while Bells Landing is down the bank at the end of CR 300-F; scout both arrival paths before leaving vehicles.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, use the named public access points, respect Brazos River County Park hours and posted rules, and keep private-bank use limited to direct hazard portages within the navigable corridor.",
      "camping": "BRA says Brazos River sandbars can be used for camping because the riverbed is public up to the gradient boundary, but this short route is still planned as a day trip. Camp only on clearly exposed public sand or gravel bars, avoid quicksand-prone banks and private uplands, and skip camping when water is rising or high.",
      "campingClassification": "sandbar_or_gravel_bar",
      "summary": "Launch at Brazos River County Park and take out at Bells Landing for the official Columbia Bottomland Waterway segment of the Stephen F. Austin Paddling Trail. Use USGS 08116850 near West Columbia with BRA's Brazos flow chart, then make a same-day call on runoff, wind, tide, snags, quicksand banks, and private-property limits.",
      "accessCaveats": [
        "TPWD publishes both endpoint coordinates; Brazoria County separately confirms the county park has a canoe launch, paved parking, restrooms, and day-use amenities.",
        "The county-park GPS is an official access anchor near the pavilion, and TPWD says the access is about 400 feet from parking. Follow posted park paths to the actual water-entry point on arrival.",
        "Bells Landing is a simple bank take-out at the end of CR 300-F, not a staffed ramp. Identify the old bridge-abutment landmark and the right-bank exit before floating past it.",
        "This route uses a river-wide BRA flow chart rather than a route-specific local paddling band. Treat the gauge reading as a decision aid and still check wind, tide, rain, water quality, and visible bank conditions.",
        "TPWD says private-bank use outside direct hazard portages can be trespassing. Do not treat the Columbia Bottomlands shoreline as a casual picnic, bailout, or camping area above the public streambed."
      ],
      "watchFor": [
        "Flows at or below about 200 cfs, when BRA says the Brazos is below the minimum needed for paddling and TPWD warns snags can be more common.",
        "Flows above about 1,200 cfs, rising water, or basin-wide rainfall runoff, when BRA and TPWD both point to higher current, reduced water quality, and more consequential landings.",
        "Wind on broad bends, tidal lower-river effects, summer heat, thunderstorms, alligators, livestock near the bank, and soft or quicksand-prone landing areas.",
        "Low-water drift piles, strainers, floating wood, and the need to stay oriented for the Bells Landing right-bank take-out after passing under SH 35.",
        "Private banks outside named access points and any direct hazard-portage corridor."
      ]
    },
    "accessPoints": [
      {
        "id": "brazos-river-county-park",
        "name": "Brazos River County Park",
        "latitude": 29.201,
        "longitude": -95.5642,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default TPWD put-in; official access anchor near the pavilion, about 400 feet from parking."
      },
      {
        "id": "bells-landing",
        "name": "Bells Landing",
        "latitude": 29.1408,
        "longitude": -95.6153,
        "mileFromStart": 8.3,
        "segmentKind": "creek",
        "note": "Default TPWD take-out down the bank at the end of CR 300-F, marked after the SH 35 bridge by old bridge-abutment context."
      }
    ]
  },
  "brazos-river-fm2004-freeport-municipal-park": {
    "putIn": {
      "id": "fm-2004-boat-ramp",
      "name": "FM 2004 boat ramp",
      "latitude": 29.0316,
      "longitude": -95.4771
    },
    "takeOut": {
      "id": "freeport-municipal-park-boat-ramp",
      "name": "Freeport Municipal Park boat ramp",
      "latitude": 28.9646,
      "longitude": -95.3743
    },
    "logistics": {
      "distanceLabel": "About 9.8 mi",
      "estimatedPaddleTime": "About 4 hr to 5 hr at ordinary levels, longer with coastal headwind, tidal pushback, low-water snags, heat, or slow shell-road access at Freeport",
      "shuttle": "Stage the Freeport Municipal Park take-out first, then drive back to the FM 2004 boat ramp. TPWD says the Freeport ramp is reached by crossing the levee and following a shell road; scout that exit and current parking before leaving vehicles.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, use the named public boat ramps, respect any Freeport or FM 2004 parking signs, and keep private-bank use limited to direct hazard portages within the navigable corridor.",
      "camping": "Treat Gulf Prairie Run as a day trip. TPWD does not document route camping or an endpoint campground for the FM 2004-to-Freeport segment; do not infer legal camping from levee banks, visible bars, or private shoreline.",
      "campingClassification": "none",
      "summary": "Launch at the FM 2004 boat ramp and take out at Freeport Municipal Park for the official Gulf Prairie Run segment of the Stephen F. Austin Paddling Trail. Use USGS 08116850 near West Columbia with BRA's Brazos flow chart, then make a same-day call on runoff, wind, tide, snags, quicksand banks, and private-property limits.",
      "accessCaveats": [
        "TPWD publishes both endpoint coordinates and driving directions, but the downstream Freeport ramp is reached by a shell road behind the levee rather than a staffed paddling trail center.",
        "The product-supported gauge is USGS 08116850 upstream at West Columbia. The Freeport flood-gate gauge can show tidal or reverse-flow behavior, so this route uses the upstream lower-Brazos discharge check plus same-day visual, wind, tide, and weather judgment.",
        "This route uses a river-wide BRA flow chart rather than a route-specific local paddling band. Treat the gauge reading as a decision aid and still check wind, tide, rain, water quality, and visible bank conditions.",
        "TPWD says private-bank use outside direct hazard portages can be trespassing. Do not treat levee banks or Gulf Prairie shoreline as casual rest, bailout, or camping areas.",
        "Coastal heat, thunderstorms, and headwinds can make the last miles into Freeport slower than the 9.8-mile distance suggests."
      ],
      "watchFor": [
        "Flows at or below about 200 cfs, when BRA says the Brazos is below the minimum needed for paddling and TPWD warns snags can be more common.",
        "Flows above about 1,200 cfs, rising water, or basin-wide rainfall runoff, when BRA and TPWD both point to higher current, reduced water quality, and more consequential landings.",
        "Coastal headwinds, tide-influenced current, levee-bounded banks, summer heat, thunderstorms, alligators, and soft or quicksand-prone landing areas.",
        "Low-water drift piles, strainers, floating wood, and the need to identify the Freeport left-bank take-out before the river opens farther toward industrial and Gulf-adjacent water.",
        "Private banks outside named access points and any direct hazard-portage corridor."
      ]
    },
    "accessPoints": [
      {
        "id": "fm-2004-boat-ramp",
        "name": "FM 2004 boat ramp",
        "latitude": 29.0316,
        "longitude": -95.4771,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default TPWD put-in for Gulf Prairie Run at the FM 2004 / FM 2611 bridge access."
      },
      {
        "id": "freeport-municipal-park-boat-ramp",
        "name": "Freeport Municipal Park boat ramp",
        "latitude": 28.9646,
        "longitude": -95.3743,
        "mileFromStart": 9.8,
        "segmentKind": "creek",
        "note": "Default TPWD take-out reached by shell road after crossing the levee in Freeport."
      }
    ]
  },
  "village-creek-sh327-baby-galvez": {
    "putIn": {
      "id": "tx-327-boat-launch",
      "name": "TX 327 Boat Launch",
      "latitude": 30.346944,
      "longitude": -94.239385
    },
    "takeOut": {
      "id": "baby-galvez-road-boat-launch",
      "name": "Baby Galvez Road Boat Launch",
      "latitude": 30.3345,
      "longitude": -94.20391
    },
    "logistics": {
      "distanceLabel": "About 3.4 mi",
      "estimatedPaddleTime": "About 1 hr to 2.5 hr at ordinary levels, longer if the creek is low, woody, stormy, or the group wants a slower beginner outing",
      "shuttle": "Stage the Baby Galvez take-out first, then drive back to TX 327. Check both bridge-side launches before leaving vehicles because one is an unpaved highway launch and the other is a simple paved ramp at the end of a local road.",
      "permits": "No route-specific paddling permit is known for this segment. Follow Texas boating and PFD rules, use only the named public launches, and obey current Big Thicket National Preserve regulations and any posted access signs.",
      "camping": "Treat this short segment as a day trip. Big Thicket allows year-round sandbar camping on Village Creek for larger through-trips, and Village Creek State Park is a stronger downstream base-camp option if you want more than a quick paddle.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at TX 327 and take out at Baby Galvez for the shortest named Village Creek public segment. Use USGS 08041500 near Kountze with a conservative 200 cfs floor, then make a same-day call on wood, current, weather, and private-boundary discipline before launching.",
      "accessCaveats": [
        "NPS identifies TX 327 as a TxDOT-managed launch and Baby Galvez Road as a paved public boat ramp, but neither endpoint is a staffed park marina.",
        "This route is short enough to look casual, which makes it easy to underestimate rain-driven current or assume any bank stop is acceptable. Stay with the named public launches.",
        "TPWD says Village Creek water quality is variable and not recommended for drinking. Bring your own water even on a short paddle.",
        "Big Thicket boundary markers and private banks still matter on this middle segment. Do not plan casual picnics or bailouts above the ordinary high-water line.",
        "This route uses a conservative minimum-only threshold, not a full ideal-range recommendation. If the gauge is below about 200 cfs, expect more shallow weaving around sandbars and wood."
      ],
      "watchFor": [
        "Flows near or below about 200 cfs, or stage below roughly 3 ft, when sandbars, logs, and shallow route-finding become more common.",
        "Stage around or above about 10 ft, rising water, or fresh heavy rain, when the creek can become swift and hazardous despite the short mileage.",
        "Snags, logjams, overhanging limbs, sandbars, insects, thunderstorms, and muddy or slick footing at the launches.",
        "Private banks between the launches and the temptation to turn a short family paddle into an unsupported off-route stop."
      ]
    }
  },
  "village-creek-fm418-baby-galvez": {
    "putIn": {
      "id": "village-creek-fm-418-boat-launch",
      "name": "FM 418 Boat Launch",
      "latitude": 30.397794,
      "longitude": -94.265024
    },
    "takeOut": {
      "id": "baby-galvez-road-boat-launch",
      "name": "Baby Galvez Road Boat Launch",
      "latitude": 30.3345,
      "longitude": -94.20391
    },
    "logistics": {
      "distanceLabel": "About 12.0 mi",
      "estimatedPaddleTime": "About 4.5 hr to 7 hr at ordinary levels, longer near the floor or when heat, wood, or a slower group stretch out the day",
      "shuttle": "Stage the Baby Galvez take-out first, then drive back to FM 418. Inspect both launches before leaving vehicles because the trip starts at an unpaved bridge launch, crosses the TX 327 midpoint, and ends at a simpler paved road-end ramp.",
      "permits": "No route-specific paddling permit is known for this segment. Follow Texas boating and PFD rules, use only the named public launches, and obey current Big Thicket National Preserve regulations and any posted access signs.",
      "camping": "Treat this as a long day trip by default. Big Thicket allows year-round sandbar camping on Village Creek for larger through-trips, and Village Creek State Park is a stronger downstream base-camp option if you want legal campground support beyond the route itself.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at FM 418 and take out at Baby Galvez Road for a longer upper-to-middle Village Creek float with TX 327 as the midpoint bailout. Use USGS 08041500 near Kountze with a conservative 200 cfs floor, then make a same-day call on current, weather, wood, and heat before committing.",
      "accessCaveats": [
        "NPS identifies FM 418 as an unpaved bridge launch and Baby Galvez as a paved public boat ramp, but neither endpoint is a staffed park marina.",
        "TX 327 is the clean midpoint bailout. Reassess there instead of forcing the continuation if the gauge, weather, wood load, or group pace is not matching the plan.",
        "TPWD says Village Creek water quality is variable and not recommended for drinking. Carry enough water for a longer East Texas day.",
        "Big Thicket boundary markers and private banks still matter on this longer segment. Do not plan casual picnics or bailouts above the ordinary high-water line.",
        "This route uses a conservative minimum-only threshold, not a full ideal-range recommendation. If the gauge is below about 200 cfs, expect more dragging, shallow weaving, and wood dodging across a longer day."
      ],
      "watchFor": [
        "Flows near or below about 200 cfs, or stage below roughly 3 ft, when exposed sandbars, logs, and shallow route-finding become more common over the longer mileage.",
        "Stage around or above about 10 ft, rising water, or fresh heavy rain, when the creek can become swift and hazardous despite the flatwater character.",
        "Snags, logjams, overhanging limbs, sandbars, insects, thunderstorms, and muddy or slick footing at the FM 418 and TX 327 bridge launches.",
        "Private banks between the launches and the temptation to turn a long but easy-looking creek day into an unsupported off-route stop."
      ]
    },
    "accessPoints": [
      {
        "id": "village-creek-fm-418-boat-launch",
        "name": "FM 418 Boat Launch",
        "latitude": 30.397794,
        "longitude": -94.265024,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upper Village Creek put-in."
      },
      {
        "id": "tx-327-boat-launch",
        "name": "TX 327 Boat Launch",
        "latitude": 30.346944,
        "longitude": -94.239385,
        "mileFromStart": 8.6,
        "segmentKind": "creek",
        "note": "Primary midpoint bailout and the shortest official restart option."
      },
      {
        "id": "baby-galvez-road-boat-launch",
        "name": "Baby Galvez Road Boat Launch",
        "latitude": 30.3345,
        "longitude": -94.20391,
        "mileFromStart": 12,
        "segmentKind": "creek",
        "note": "Default longer upper-to-middle finish at the paved public ramp."
      }
    ]
  },
  "village-creek-baby-galvez-us-96": {
    "putIn": {
      "id": "baby-galvez-road-boat-launch",
      "name": "Baby Galvez Road Boat Launch",
      "latitude": 30.3345,
      "longitude": -94.20391
    },
    "takeOut": {
      "id": "us-96-boat-launch",
      "name": "US 96 Boat Launch",
      "latitude": 30.2857,
      "longitude": -94.19145
    },
    "logistics": {
      "distanceLabel": "About 7.1 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr at ordinary levels, longer near the floor or when heat, sandbars, wood, or a slow group stretch out the day",
      "shuttle": "Stage the US 96 take-out first, then drive back to Baby Galvez Road. Inspect both paved public ramps and parking areas before leaving vehicles because storms, mud, debris, or local maintenance can change how easy the access feels on arrival.",
      "permits": "No route-specific paddling permit is known for this segment. Follow Texas boating and PFD rules, use only the named public launches, and obey current Big Thicket National Preserve regulations and any posted county or preserve access notices.",
      "camping": "Treat this as a long day trip by default. Big Thicket says camping is allowed year-round on sandbars along Village Creek, and Village Creek State Park is a stronger downstream base-camp option if you want legal campground support instead of primitive sandbar choices.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Baby Galvez Road and take out at US 96 for a longer lower-middle Village Creek float with public launches at both ends. Use USGS 08041500 near Kountze with a conservative 200 cfs floor, then make a same-day call on current, weather, wood, and heat before committing.",
      "accessCaveats": [
        "NPS identifies Baby Galvez and US 96 as public boat ramps tied to the Village Creek trail; US 96 is managed by Hardin County and Baby Galvez is a local road-end launch in preserve country.",
        "The preserve does not provide boat rentals or shuttles. Arrange your own shuttle before launching.",
        "TPWD says Village Creek water quality is variable and not recommended for drinking. Carry enough water for a longer East Texas day.",
        "Big Thicket says sandbar camping is allowed on Village Creek, but this route still works best as a planned day float unless you have a clear overnight plan and are comfortable managing rising water risk.",
        "This route uses a conservative minimum-only threshold, not a full ideal-range recommendation. If the gauge is below about 200 cfs, expect more scraping, wood dodging, and slow travel."
      ],
      "watchFor": [
        "Flows near or below about 200 cfs, or stage below roughly 3 ft, when exposed sandbars and logs become more common and the longer mileage gets slower.",
        "Stage around or above about 10 ft, rising water, or fresh heavy rain, when the creek can become swift and hazardous on an otherwise mellow corridor.",
        "Snags, logjams, overhanging limbs, floating debris, insects, thunderstorms, sun exposure, and a longer self-supported shuttle than the short Village Creek links.",
        "Private banks between the launches and overconfidence from the route's generally calm flatwater character."
      ]
    }
  },
  "village-creek-sh327-us-96": {
    "putIn": {
      "id": "tx-327-boat-launch",
      "name": "TX 327 Boat Launch",
      "latitude": 30.346944,
      "longitude": -94.239385
    },
    "takeOut": {
      "id": "us-96-boat-launch",
      "name": "US 96 Boat Launch",
      "latitude": 30.2857,
      "longitude": -94.19145
    },
    "logistics": {
      "distanceLabel": "About 10.5 mi",
      "estimatedPaddleTime": "About 4 hr to 6.5 hr at ordinary levels, longer near the floor or when heat, wood, or a slow group stretch out the day",
      "shuttle": "Stage the US 96 take-out first, then drive back to TX 327. Inspect all three named public launches before committing because Baby Galvez is the key midpoint bailout if conditions change after launch.",
      "permits": "No route-specific paddling permit is known for this segment. Follow Texas boating and PFD rules, use only the named public launches, and obey current Big Thicket National Preserve regulations and any posted county or preserve access notices.",
      "camping": "Treat this as a long day trip by default. Big Thicket says camping is allowed year-round on sandbars along Village Creek, and Village Creek State Park is a stronger downstream base-camp option if you want legal campground support instead of primitive sandbar choices.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at TX 327 and take out at US 96 for a longer middle-corridor Village Creek float with Baby Galvez as the midpoint bailout. Use USGS 08041500 near Kountze with a conservative 200 cfs floor, then make a same-day call on current, weather, wood, and heat before committing.",
      "accessCaveats": [
        "NPS identifies TX 327 as a TxDOT-managed bridge launch, Baby Galvez as a paved public ramp, and US 96 as a paved Hardin County launch tied to the same public trail.",
        "Baby Galvez is the clean midpoint reassessment point. Do not force the continuation to US 96 just because the first miles felt calm.",
        "TPWD says Village Creek water quality is variable and not recommended for drinking. Carry enough water for a longer East Texas day.",
        "This route uses a conservative minimum-only threshold, not a full ideal-range recommendation. If the gauge is below about 200 cfs, expect more scraping, wood dodging, and slow travel."
      ],
      "watchFor": [
        "Flows near or below about 200 cfs, or stage below roughly 3 ft, when exposed sandbars and logs become more common and the longer mileage gets slower.",
        "Stage around or above about 10 ft, rising water, or fresh heavy rain, when the creek can become swift and hazardous on an otherwise mellow corridor.",
        "Snags, logjams, overhanging limbs, floating debris, insects, thunderstorms, sun exposure, and a longer self-supported shuttle than the short Village Creek links.",
        "Private banks between the launches and overconfidence from the route's generally calm flatwater character."
      ]
    },
    "accessPoints": [
      {
        "id": "tx-327-boat-launch",
        "name": "TX 327 Boat Launch",
        "latitude": 30.346944,
        "longitude": -94.239385,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default middle-corridor put-in below the highway bridge."
      },
      {
        "id": "baby-galvez-road-boat-launch",
        "name": "Baby Galvez Road Boat Launch",
        "latitude": 30.3345,
        "longitude": -94.20391,
        "mileFromStart": 3.4,
        "segmentKind": "creek",
        "note": "Primary midpoint bailout before the longer lower continuation."
      },
      {
        "id": "us-96-boat-launch",
        "name": "US 96 Boat Launch",
        "latitude": 30.2857,
        "longitude": -94.19145,
        "mileFromStart": 10.5,
        "segmentKind": "creek",
        "note": "Default longer middle-corridor finish near Lumberton."
      }
    ]
  },
  "village-creek-us-96-state-park": {
    "putIn": {
      "id": "us-96-boat-launch",
      "name": "US 96 Boat Launch",
      "latitude": 30.2857,
      "longitude": -94.19145
    },
    "takeOut": {
      "id": "village-creek-state-park-canoe-launch",
      "name": "Village Creek State Park canoe launch",
      "latitude": 30.2553,
      "longitude": -94.171
    },
    "logistics": {
      "distanceLabel": "About 3.2 mi",
      "estimatedPaddleTime": "About 1 hr to 3 hr at ordinary levels, longer if low water, flooding, wildlife delays, or family pacing slow the trip",
      "shuttle": "Stage the Village Creek State Park take-out first, then drive back to the US 96 launch. Confirm current state-park launch status, fees, and flooding impacts before leaving vehicles because the park access can change after high water.",
      "permits": "No route-specific private paddling permit is known for a same-day trip, but you may need to pay any current state-park entrance fee at the take-out. Follow Texas boating and PFD rules, use the named public launches, and obey current Big Thicket and TPWD park notices.",
      "camping": "This is the strongest lower Village Creek segment for legal campground support. Village Creek State Park has campsites, a cabin, and direct canoe-launch access at the take-out. Big Thicket also allows year-round sandbar camping on Village Creek for paddlers who have a more primitive overnight plan.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at the US 96 public ramp and finish at Village Creek State Park for the short downstream state-park segment. Use USGS 08041500 near Kountze with a conservative 200 cfs floor, then make a same-day call on current, flood impacts, wildlife, and launch conditions before committing.",
      "accessCaveats": [
        "NPS identifies the US 96 launch as a paved public ramp and says the next launch is Village Creek State Park 3.2 miles downstream; TPWD separately publishes the state-park canoe-launch coordinate and paddling access.",
        "Check with Village Creek State Park on the status of the canoe launch after flooding or storm damage. Do not assume the normal take-out path is usable on every visit.",
        "TPWD says alligators live in the area. Give wildlife space, keep pets and food controlled, and do not create shoreline conflicts at the park launch.",
        "TPWD says Village Creek water quality is variable and not recommended for drinking. Bring your own water even on this short segment.",
        "This route uses a conservative minimum-only threshold, not a full ideal-range recommendation. If the gauge is below about 200 cfs, expect more shallow sandbars and wood near the park finish."
      ],
      "watchFor": [
        "Flows near or below about 200 cfs, or stage below roughly 3 ft, when exposed sandbars, logs, and shallow routing become more common.",
        "Stage around or above about 10 ft, rising water, fresh heavy rain, or park-launch flood impacts that can turn an easy short float into a poor access decision.",
        "Snags, logjams, floating debris, insects, thunderstorms, muddy footing, alligators, and other wildlife near the lower corridor and park take-out.",
        "Private banks between the launches and the temptation to treat state-park access as proof that any stop along the way is equally public."
      ]
    }
  },
  "village-creek-baby-galvez-state-park": {
    "putIn": {
      "id": "baby-galvez-road-boat-launch",
      "name": "Baby Galvez Road Boat Launch",
      "latitude": 30.3345,
      "longitude": -94.20391
    },
    "takeOut": {
      "id": "village-creek-state-park-canoe-launch",
      "name": "Village Creek State Park canoe launch",
      "latitude": 30.2553,
      "longitude": -94.171
    },
    "logistics": {
      "distanceLabel": "About 10.3 mi",
      "estimatedPaddleTime": "About 4 hr to 6.5 hr at ordinary levels, longer near the floor or when heat, wildlife delays, or flooding-sensitive access stretch out the day",
      "shuttle": "Stage the Village Creek State Park take-out first, then drive back to Baby Galvez Road. Inspect the US 96 midpoint launch and the state-park finish before leaving vehicles because both are the clean contingency points if conditions or pace change.",
      "permits": "No route-specific private paddling permit is known for a same-day trip, but you may need to pay any current state-park entrance fee at the take-out. Follow Texas boating and PFD rules, use the named public launches, and obey current Big Thicket and TPWD park notices.",
      "camping": "This is the strongest longer lower Village Creek segment for legal campground support. Village Creek State Park has campsites, a cabin, and direct canoe-launch access at the take-out. Big Thicket also allows year-round sandbar camping on Village Creek for paddlers who have a more primitive overnight plan.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Baby Galvez Road and finish at Village Creek State Park for a longer lower Village Creek continuation with US 96 as the midpoint bailout. Use USGS 08041500 near Kountze with a conservative 200 cfs floor, then make a same-day call on current, flood impacts, weather, and wildlife before committing.",
      "accessCaveats": [
        "NPS identifies Baby Galvez and US 96 as public boat ramps tied to the Village Creek trail, and TPWD separately publishes the state-park canoe-launch coordinate and paddling access.",
        "Check with Village Creek State Park on the status of the canoe launch after flooding or storm damage. Do not assume the normal take-out path is usable on every visit.",
        "TPWD says alligators live in the area. Give wildlife space, keep pets and food controlled, and do not create shoreline conflicts at the park launch.",
        "TPWD says Village Creek water quality is variable and not recommended for drinking. Bring your own water even on a route that finishes inside the park.",
        "This route uses a conservative minimum-only threshold, not a full ideal-range recommendation. If the gauge is below about 200 cfs, expect more shallow sandbars and wood on the lower miles."
      ],
      "watchFor": [
        "Flows near or below about 200 cfs, or stage below roughly 3 ft, when exposed sandbars, logs, and shallow routing become more common.",
        "Stage around or above about 10 ft, rising water, fresh heavy rain, or park-launch flood impacts that can turn a scenic lower day into a poor access decision.",
        "Snags, logjams, floating debris, insects, thunderstorms, muddy footing, alligators, and other wildlife near the lower corridor and park take-out.",
        "Private banks between the launches and the temptation to treat state-park access as proof that any stop along the way is equally public."
      ]
    },
    "accessPoints": [
      {
        "id": "baby-galvez-road-boat-launch",
        "name": "Baby Galvez Road Boat Launch",
        "latitude": 30.3345,
        "longitude": -94.20391,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default lower-corridor put-in at the paved public ramp."
      },
      {
        "id": "us-96-boat-launch",
        "name": "US 96 Boat Launch",
        "latitude": 30.2857,
        "longitude": -94.19145,
        "mileFromStart": 7.1,
        "segmentKind": "creek",
        "note": "Primary midpoint bailout before the state-park finish."
      },
      {
        "id": "village-creek-state-park-canoe-launch",
        "name": "Village Creek State Park canoe launch",
        "latitude": 30.2553,
        "longitude": -94.171,
        "mileFromStart": 10.3,
        "segmentKind": "creek",
        "note": "Default longer lower finish with direct campground support."
      }
    ]
  },
  "village-creek-fm418-state-park": {
    "putIn": {
      "id": "village-creek-fm-418-boat-launch",
      "name": "FM 418 Boat Launch",
      "latitude": 30.3978,
      "longitude": -94.2647
    },
    "takeOut": {
      "id": "village-creek-state-park-canoe-launch",
      "name": "Village Creek State Park canoe launch",
      "latitude": 30.2553,
      "longitude": -94.171
    },
    "logistics": {
      "distanceLabel": "About 20.9 mi",
      "estimatedPaddleTime": "Too long for one day for most groups; plan a very strong all-day push or an overnight with a legal camping plan",
      "shuttle": "Stage the state-park take-out first, then drive back to FM 418. This is a long shuttle through the Big Thicket corridor, so verify park hours, preserve permit plans, launch conditions, and vehicle security before committing.",
      "permits": "TPWD says overnight camping permits for the preserve corridor are free and available at the Big Thicket National Preserve Visitor Center. Follow current Big Thicket, Texas boating, PFD, and state-park entry and camping rules.",
      "camping": "TPWD says the full trail is too long to paddle in one day and that free overnight camping permits are available through Big Thicket National Preserve; Village Creek State Park also has campsites and a cabin at the take-out.",
      "campingClassification": "overnight_capable",
      "summary": "Launch at FM 418 and finish at Village Creek State Park for the full public Village Creek trail. Use USGS 08041500 near Kountze with a conservative 200 cfs floor, then make a same-day call on water level, weather, wood, and whether the trip should be split overnight.",
      "accessCaveats": [
        "TPWD publishes five access points along this trail, so groups should not force the entire route into one day unless they have the pace, weather window, and shuttle discipline for it.",
        "TPWD says water quality is variable and not recommended for drinking. Bring your own water even if you plan to stop overnight.",
        "The entire corridor sits within Big Thicket National Preserve boundaries, but preserve limits can be just above the high-water line in places. Respect boundary markers and private-bank limits.",
        "The downstream Village Creek State Park canoe launch can be affected by flooding, and the lower corridor is where alligator awareness matters most even though sightings are uncommon."
      ],
      "watchFor": [
        "Flows near or below about 200 cfs, or stage below roughly 3 ft, when TPWD says snags, logjams, and sandbars become more prominent and low-water delays compound over a 20.9-mile route.",
        "High or rising water, especially around 10 ft or higher, when TPWD warns that the creek can become swift and hazardous despite the flatwater setting.",
        "Heat, thunderstorms, insects, private-bank discipline, and fatigue from treating an easy-looking creek like a casual short float.",
        "Snags, overhanging limbs, strainers, and the need to re-evaluate at SH 327, Baby Galvez, or US 96 instead of pressing on with a tired group."
      ]
    },
    "corridorId": "village-creek-paddling-trail",
    "corridorLabel": "Village Creek Paddling Trail — choose your in/out pair",
    "continuityStatus": "verified",
    "accessPoints": [
      {
        "id": "village-creek-fm-418-boat-launch",
        "name": "FM 418 Boat Launch",
        "latitude": 30.397794,
        "longitude": -94.265024,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Upper public launch and full-corridor start."
      },
      {
        "id": "tx-327-boat-launch",
        "name": "TX 327 Boat Launch",
        "latitude": 30.346944,
        "longitude": -94.239385,
        "mileFromStart": 8.6,
        "segmentKind": "creek",
        "note": "Public midpoint launch/take-out and shorter-day option."
      },
      {
        "id": "baby-galvez-road-boat-launch",
        "name": "Baby Galvez Road Boat Launch",
        "latitude": 30.3345,
        "longitude": -94.20391,
        "mileFromStart": 12,
        "segmentKind": "creek",
        "note": "Public middle-corridor launch/take-out."
      },
      {
        "id": "us-96-boat-launch",
        "name": "US 96 Boat Launch",
        "latitude": 30.2857,
        "longitude": -94.19145,
        "mileFromStart": 19.1,
        "segmentKind": "creek",
        "note": "Public lower-corridor bailout before the state-park finish."
      },
      {
        "id": "village-creek-state-park-canoe-launch",
        "name": "Village Creek State Park canoe launch",
        "latitude": 30.2553,
        "longitude": -94.171,
        "mileFromStart": 22.3,
        "segmentKind": "creek",
        "note": "Lower public finish with direct campground context."
      }
    ],
    "segmentEdges": [
      { "fromId": "village-creek-fm-418-boat-launch", "toId": "tx-327-boat-launch", "status": "verified" },
      { "fromId": "tx-327-boat-launch", "toId": "baby-galvez-road-boat-launch", "status": "verified" },
      { "fromId": "baby-galvez-road-boat-launch", "toId": "us-96-boat-launch", "status": "verified" },
      { "fromId": "us-96-boat-launch", "toId": "village-creek-state-park-canoe-launch", "status": "verified" }
    ]
  },
  "south-llano-river-cupgrass-state-park": {
    "putIn": {
      "name": "TPWD Cupgrass Access",
      "latitude": 30.393543,
      "longitude": -99.886693
    },
    "takeOut": {
      "name": "South Llano River State Park paddling access",
      "latitude": 30.4498,
      "longitude": -99.8128
    },
    "logistics": {
      "distanceLabel": "About 9.3 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr at a casual kayak or canoe pace, longer at lower water or with fishing stops",
      "shuttle": "Stage the take-out at South Llano River State Park first, then drive back to the gated Cupgrass lease site. Confirm Cupgrass parking by text before launch and reserve state-park entry or camping ahead of time during busy periods.",
      "permits": "No route-specific paddling permit is published. Cupgrass parking must be arranged with TPWD, and South Llano River State Park often recommends advance reservations for day use and camping.",
      "camping": "South Llano River State Park has developed campsites with hookups, walk-in sites, and primitive hike-in sites. This route can finish directly into that campground setting.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch through Bailey Creek at the TPWD Cupgrass access and paddle down to South Llano River State Park for a spring-fed Hill Country day with quiet pools, riffles, wildlife, and a campground finish.",
      "accessCaveats": [
        "TPWD says Cupgrass parking is by advance text reservation and that boats launch via Bailey Creek before entering the South Llano proper.",
        "South Llano River State Park is a popular destination that can reach capacity, so day-use or camping reservations are the cleanest way to secure the take-out plan.",
        "Use only the named public access points and direct river-portage paths because most of the shoreline between them remains private."
      ],
      "watchFor": [
        "Shallow riffles, scrape spots, and woody edges when the Flat Rock gauge is near the conservative 65 cfs floor.",
        "Fresh strainers after storms, plus faster current and murkier water when runoff reaches the corridor.",
        "Bright sun, long mileage for casual groups, and limited mid-route public exits compared with the short trail splits near Junction."
      ]
    }
  },
  "south-llano-river-state-park-flatrock-lane": {
    "putIn": {
      "name": "South Llano River State Park paddling access",
      "latitude": 30.4498,
      "longitude": -99.8128
    },
    "takeOut": {
      "name": "Flatrock Lane Crossing",
      "latitude": 30.4789,
      "longitude": -99.7778
    },
    "logistics": {
      "distanceLabel": "About 4.7 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr at an easy recreational pace",
      "shuttle": "Use a short Junction-area shuttle between South Llano River State Park and Flatrock Lane Crossing. If you are entering the park only to launch, reserve day use first during the busy season.",
      "permits": "No route-specific paddling permit is published. South Llano River State Park charges normal park entry and often recommends reservations for day use; follow current park and PFD rules.",
      "camping": "South Llano River State Park has developed and primitive campsites at the put-in, making this a simple campground-based half-day float.",
      "campingClassification": "endpoint_campground",
      "summary": "Put in at South Llano River State Park and float to Flatrock Lane for the upper split of the official paddling trail. This is a short spring-fed run with clear pools, easy riffles, and a required state-park bridge portage near the start.",
      "accessCaveats": [
        "TPWD says the damaged state-park bridge apron is closed and that paddlers must exit at the designated location, portage around the bridge, and reenter downstream.",
        "Use the marked state-park launch and the named Flatrock take-out rather than improvised bank stops.",
        "Private shoreline begins quickly outside the park corridor, so keep rests brief and at the named public access points."
      ],
      "watchFor": [
        "The required bridge portage at South Llano River State Park.",
        "Low-water scraping and minor route reading through shallow riffles when the gauge is near the conservative floor.",
        "Strainers, changing current after rain, and slippery rocks at either access."
      ]
    }
  },
  "south-llano-river-flatrock-lane-junction-city-park": {
    "putIn": {
      "name": "Flatrock Lane Crossing",
      "latitude": 30.4789,
      "longitude": -99.7778
    },
    "takeOut": {
      "name": "Junction City Park",
      "latitude": 30.4879,
      "longitude": -99.7617
    },
    "logistics": {
      "distanceLabel": "About 1.6 mi",
      "estimatedPaddleTime": "About 45 min to 1.5 hr",
      "shuttle": "This is a very short in-town shuttle between Flatrock Lane Crossing and Junction City Park. Many paddlers will prefer to stage one vehicle at Junction City Park and keep the second trip simple.",
      "permits": "No route-specific paddling permit is published. Use the named public accesses, follow local parking rules, and bring the normal Texas PFD and weather judgment even though the mileage is short.",
      "camping": "Treat this as a short day float. South Llano River State Park and Junction lodging work as nearby basecamps, but the route itself does not include an on-route campsite.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Flatrock Lane Crossing and drift down to Junction City Park for the lower split of the official South Llano paddling trail. This is the quickest Junction-area option, but it still deserves the same same-day wood and flow check as the longer segments.",
      "accessCaveats": [
        "TPWD publishes both access points and expects paddlers to stay off private banks except for direct hazard portages.",
        "Junction City Park is the intended public finish; do not improvise a take-out along nearby private or bridge-adjacent banks.",
        "Because the route is short, groups sometimes underestimate weather changes and same-day wood. Check the gauge anyway."
      ],
      "watchFor": [
        "Shallow riffles and scraping when the gauge falls toward the 65 cfs floor.",
        "Snags and fresh wood after rain.",
        "Faster current and murkier water during runoff pulses, even though the route normally feels gentle."
      ]
    }
  },
  "south-llano-river-state-park-junction-city-park": {
    "putIn": {
      "name": "South Llano River State Park paddling access",
      "latitude": 30.4498,
      "longitude": -99.8128
    },
    "takeOut": {
      "name": "Junction City Park",
      "latitude": 30.4879,
      "longitude": -99.7617
    },
    "logistics": {
      "distanceLabel": "About 6.3 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr at an easy recreational pace",
      "shuttle": "Use a short Junction-area shuttle between South Llano River State Park and Junction City Park. If you are entering the park only to launch, reserve day use first during busy periods and leave time for the required bridge portage near the start.",
      "permits": "No route-specific paddling permit is published. South Llano River State Park charges normal park entry and often recommends reservations for day use; follow current park, parking, and PFD rules.",
      "camping": "South Llano River State Park campsites sit directly at the put-in, so this route works well as a campground-based half-day float into town.",
      "campingClassification": "endpoint_campground",
      "summary": "Put in at South Llano River State Park and continue all the way to Junction City Park for the full official TPWD paddling trail. This is a simple state-park-to-town float with a required bridge portage near the start and the same same-day flow check as the shorter splits.",
      "accessCaveats": [
        "TPWD says the damaged state-park bridge apron is closed and that paddlers must exit at the designated location, portage around the bridge, and reenter downstream.",
        "Use the marked state-park launch and the named Junction City Park finish rather than improvised bank stops.",
        "Private shoreline begins quickly outside the park corridor, so keep rests brief and at the named public access points."
      ],
      "watchFor": [
        "The required bridge portage at South Llano River State Park.",
        "Low-water scraping and minor route reading through shallow riffles when the gauge is near the conservative floor.",
        "Strainers, changing current after rain, and slippery rocks at either access."
      ]
    },
    "accessPoints": [
      {
        "id": "south-llano-river-state-park",
        "name": "South Llano River State Park paddling access",
        "latitude": 30.4498,
        "longitude": -99.8128,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Canonical upstream launch for the full official TPWD trail."
      },
      {
        "id": "flatrock-lane-crossing",
        "name": "Flatrock Lane Crossing",
        "latitude": 30.4789,
        "longitude": -99.7778,
        "mileFromStart": 4.7,
        "segmentKind": "creek",
        "note": "Official midpoint access and former short-split take-out."
      },
      {
        "id": "junction-city-park",
        "name": "Junction City Park",
        "latitude": 30.4879,
        "longitude": -99.7617,
        "mileFromStart": 6.3,
        "segmentKind": "creek",
        "note": "Canonical downstream finish for the full TPWD trail."
      }
    ]
  },
  "south-llano-river-cupgrass-junction-city-park": {
    "putIn": {
      "name": "TPWD Cupgrass Access",
      "latitude": 30.393543,
      "longitude": -99.886693
    },
    "takeOut": {
      "name": "Junction City Park",
      "latitude": 30.4879,
      "longitude": -99.7617
    },
    "logistics": {
      "distanceLabel": "About 15.6 mi",
      "estimatedPaddleTime": "About 6 hr to 8.5 hr at a casual kayak or canoe pace, longer at lower water or with fishing stops",
      "shuttle": "Stage the take-out at Junction City Park first, then drive back to the gated Cupgrass lease site. This is the longest South Llano day route in the current app, so start early and leave real margin for the midpoint state-park bridge portage.",
      "permits": "No route-specific paddling permit is published. Cupgrass parking must be arranged with TPWD by text, and South Llano River State Park or Junction-area logistics still depend on current public-hours and normal Texas boating rules.",
      "camping": "South Llano River State Park sits directly on the route corridor with developed and primitive campsites, so this long continuation has real on-route overnight support even if most paddlers treat it as a big day float.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch through Bailey Creek at TPWD Cupgrass Access and continue to Junction City Park for the longest current public South Llano day route. The spring-fed water stays gentle overall, but the long mileage and midpoint state-park portage make this a real planning route rather than a casual hour float.",
      "accessCaveats": [
        "TPWD says Cupgrass parking is by advance text reservation and that boats launch via Bailey Creek before entering the South Llano proper.",
        "At South Llano River State Park, paddlers must exit at the designated location before the damaged bridge, portage around it, and reenter downstream.",
        "Use Junction City Park as the intended public finish and avoid treating nearby private or bridge-adjacent banks as alternate take-outs."
      ],
      "watchFor": [
        "The required bridge portage at South Llano River State Park.",
        "Long low-water scrape stretches, fresh wood after storms, and quicker current during runoff pulses.",
        "Heat, fatigue, and fewer convenient public exits than the short official trail splits."
      ]
    },
    "accessPoints": [
      {
        "id": "cupgrass-access",
        "name": "TPWD Cupgrass Access",
        "latitude": 30.393543,
        "longitude": -99.886693,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Canonical upstream start for the longest current South Llano route."
      },
      {
        "id": "south-llano-river-state-park",
        "name": "South Llano River State Park paddling access",
        "latitude": 30.4498,
        "longitude": -99.8128,
        "mileFromStart": 9.3,
        "segmentKind": "creek",
        "note": "Mid-route campground and mandatory bridge-portage access."
      },
      {
        "id": "flatrock-lane-crossing",
        "name": "Flatrock Lane Crossing",
        "latitude": 30.4789,
        "longitude": -99.7778,
        "mileFromStart": 14,
        "segmentKind": "creek",
        "note": "Official lower midpoint access and former chained-route finish."
      },
      {
        "id": "junction-city-park",
        "name": "Junction City Park",
        "latitude": 30.4879,
        "longitude": -99.7617,
        "mileFromStart": 15.6,
        "segmentKind": "creek",
        "note": "Canonical downstream finish for the full Cupgrass continuation."
      }
    ]
  },
  "buffalo-bayou-highway-6-west-sam-houston": {
    "putIn": {
      "id": "highway-6-buffalo-bayou-access",
      "name": "Highway 6",
      "latitude": 29.7694,
      "longitude": -95.6434
    },
    "takeOut": {
      "id": "west-sam-houston-parkway-access",
      "name": "West Sam Houston Parkway",
      "latitude": 29.7622,
      "longitude": -95.5583
    },
    "logistics": {
      "distanceLabel": "About 6 mi",
      "estimatedPaddleTime": "About 4 hr to 5 hr by TPWD segment estimates from Highway 6 through Terry Hershy Park and Dairy Ashford to West Sam Houston Parkway, longer if low water, mud, wood, heat, or a slow shuttle stacks up",
      "shuttle": "Stage the West Sam Houston Parkway / Beltway 8 take-out first, then drive back to the Highway 6 access in Terry Hershey Park. Dairy Ashford is an official coordinate-backed midpoint access and a practical shorter take-out when water or daylight is marginal.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, check USGS 08073500 and recent rainfall or reservoir-release context before launching, use only public access points or direct hazard portages, and obey current park rules and posted access signs.",
      "camping": "Treat this as a day-use urban route only. Houston Parks says city-park camping is permitted only at Lake Houston Wilderness Park, and Terry Hershey Park is published with daily hours and day-use amenities rather than river-camping support. Do not infer legal camping from wooded banks, sand, or trail-adjacent open space.",
      "campingClassification": "none",
      "summary": "Launch at Highway 6 and finish at West Sam Houston Parkway for the Terry Hershey Park section of the Buffalo Bayou Paddling Trail. Use USGS 08073500 near Addicks with a conservative 150 cfs base-flow floor, then make a same-day call on reservoir releases, urban runoff, water quality, strainers, and rough access.",
      "accessCaveats": [
        "TPWD publishes Highway 6, Terry Hershy Park, Dairy Ashford Road, and West Sam Houston Parkway as official access anchors, but the actual water-entry paths can be muddy, steep, or shifted by erosion.",
        "Save Buffalo Bayou confirms public parking at Highway 6, Dairy Ashford, and Beltway 8, but also warns that some access points require dragging or clambering.",
        "The stored coordinates are public access anchors, not projected mid-channel launch points. Follow the signed path, visible bank condition, and current park rules on arrival.",
        "The bayou is navigable, but TPWD says private-bank use outside direct hazard portages can be trespassing. Do not turn visible lawns, wooded banks, or trail edges into casual stops.",
        "This route uses a local minimum-only threshold source. Around 150 cfs is treated as the floor, while storm or release-driven flows above about 2,000 cfs require experienced paddlers and a separate high-water judgment."
      ],
      "watchFor": [
        "Flows near or below about 150 cfs, when Save Buffalo Bayou describes base flow as very low and slow and muddy launches, shallow bars, or downed trees can slow the day.",
        "Storm runoff, Addicks/Barker Reservoir releases, rising hydrographs, or flows over about 2,000 cfs, when the same local guidance says the bayou can be fast and dangerous.",
        "Log jams, strainers, pipelines, downed trees, low bridges, concrete or bank obstructions near access points, muddy banks, and the need to portage obstructions with private-bank discipline.",
        "Urban water quality: TPWD says Buffalo Bayou is generally unsuitable for swimming, so avoid body contact where possible, wash hands, and do not paddle after sewage, bacteria, or heavy-rain alerts.",
        "Heat, limited shade on open trail sections, bikes and pedestrians around launch carries, variable parking logistics, fishing lines, wildlife, and the temptation to continue past Beltway 8 without a separate downstream route plan."
      ]
    },
    "accessPoints": [
      {
        "id": "highway-6-buffalo-bayou-access",
        "name": "Highway 6",
        "latitude": 29.7694,
        "longitude": -95.6434,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream TPWD access anchor; Save Buffalo Bayou identifies public parking beside Highway 6 in Terry Hershey Park."
      },
      {
        "id": "terry-hershy-park-access",
        "name": "Terry Hershy Park",
        "latitude": 29.7733,
        "longitude": -95.6233,
        "mileFromStart": 1,
        "segmentKind": "creek",
        "note": "Official TPWD access about one hour below Highway 6; name preserved as TPWD spells it."
      },
      {
        "id": "dairy-ashford-road-access",
        "name": "Dairy Ashford Road",
        "latitude": 29.7617,
        "longitude": -95.6064,
        "mileFromStart": 2,
        "segmentKind": "creek",
        "note": "Official TPWD midpoint access and practical shorter take-out with public parking noted by Save Buffalo Bayou."
      },
      {
        "id": "west-sam-houston-parkway-access",
        "name": "West Sam Houston Parkway",
        "latitude": 29.7622,
        "longitude": -95.5583,
        "mileFromStart": 6,
        "segmentKind": "creek",
        "note": "Default downstream TPWD take-out at Beltway 8 / West Sam Houston Parkway."
      }
    ]
  },
  "buffalo-bayou-west-sam-houston-woodway": {
    "putIn": {
      "id": "west-sam-houston-parkway-access",
      "name": "West Sam Houston Parkway",
      "latitude": 29.7622,
      "longitude": -95.5583
    },
    "takeOut": {
      "id": "woodway-memorial-park",
      "name": "Woodway Memorial Park",
      "latitude": 29.7647,
      "longitude": -95.4569
    },
    "logistics": {
      "distanceLabel": "About 11 to 12 mi",
      "estimatedPaddleTime": "About 6.5 hr to 8.5 hr by TPWD segment estimates from West Sam Houston Parkway through Briar Bend Park to Woodway Memorial Park, longer if low water, mud, wood, heat, or portages slow the group",
      "shuttle": "Stage Woodway Memorial Park first, then drive back to West Sam Houston Parkway / Beltway 8. Briar Bend Park is an official coordinate-backed midpoint access and a practical shorter take-out if water, daylight, or group pace is marginal.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, check USGS 08073700 plus recent rainfall or reservoir-release context before launching, use only public access points or direct hazard portages, and obey current City of Houston and park rules.",
      "camping": "Treat this as a long day-use urban route only. Houston Parks says city-park camping is permitted only at Lake Houston Wilderness Park, so West Sam Houston Parkway, Briar Bend Park, Woodway Memorial Park, private banks, wooded banks, and gravel bars are not route-camping evidence.",
      "campingClassification": "none",
      "summary": "Launch at West Sam Houston Parkway and finish at Woodway Memorial Park for the middle Buffalo Bayou Paddling Trail connector. Use the Piney Point gauge with a conservative 150 cfs base-flow floor, and treat Briar Bend as the source-backed midpoint bailout.",
      "accessCaveats": [
        "TPWD publishes West Sam Houston Parkway, Briar Bend Park, and Woodway Memorial Park as official Buffalo Bayou Paddling Trail access anchors, but the actual water-entry paths can be muddy, steep, or shifted by erosion.",
        "Save Buffalo Bayou identifies parking under Beltway 8, street parking at Briar Bend Park, and public parking plus a sloped Woodway ramp, while warning that some Buffalo Bayou access points require dragging or clambering.",
        "The stored coordinates are public access anchors, not projected mid-channel launch points. Follow signed paths, visible bank condition, and current park rules on arrival.",
        "The bayou is navigable, but TPWD says private-bank use outside direct hazard portages can be trespassing. Do not turn lawns, wooded banks, trail edges, or golf-course banks into casual stops.",
        "This route uses a local minimum-only threshold source. Around 150 cfs is treated as the floor, while storm or release-driven flows above about 2,000 cfs require experienced paddlers and a separate high-water judgment.",
        "Because TPWD estimates this connector as a long two-segment day, use Briar Bend as the default bailout when daylight, heat, pace, or obstruction work starts stacking up."
      ],
      "watchFor": [
        "Flows near or below about 150 cfs, when Save Buffalo Bayou describes base flow as very low and slow and muddy launches, gravel bars, or downed trees can slow the day.",
        "Storm runoff, Addicks/Barker Reservoir releases, rising hydrographs, or flows over about 2,000 cfs, when the same local guidance says the bayou can be fast and dangerous.",
        "Log jams, strainers, pipelines, downed trees, gravel bars, low bridges, concrete or bank obstructions near access points, muddy banks, and the need to portage obstructions with private-bank discipline.",
        "Urban water quality: TPWD says Buffalo Bayou is generally unsuitable for swimming, so avoid body contact where possible, wash hands, and do not paddle after sewage, bacteria, or heavy-rain alerts.",
        "Heat, limited shade on access carries, bikes and pedestrians around launch paths, variable parking logistics, fishing lines, wildlife, and the temptation to continue below Woodway without the separate downstream route plan."
      ]
    },
    "accessPoints": [
      {
        "id": "west-sam-houston-parkway-access",
        "name": "West Sam Houston Parkway",
        "latitude": 29.7622,
        "longitude": -95.5583,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream TPWD access at Beltway 8 / West Sam Houston Parkway; Save Buffalo Bayou identifies parking under Beltway 8."
      },
      {
        "id": "briar-bend-park",
        "name": "Briar Bend Park",
        "latitude": 29.746,
        "longitude": -95.5072,
        "mileFromStart": 5.5,
        "segmentKind": "creek",
        "note": "Official TPWD midpoint access and practical bailout; Save Buffalo Bayou notes street parking and variable bank conditions."
      },
      {
        "id": "woodway-memorial-park",
        "name": "Woodway Memorial Park",
        "latitude": 29.7647,
        "longitude": -95.4569,
        "mileFromStart": 11.5,
        "segmentKind": "creek",
        "note": "Default downstream TPWD take-out and Save Buffalo Bayou's public Woodway launch with parking and a sloped ramp."
      }
    ]
  },
  "buffalo-bayou-woodway-sabine-street": {
    "putIn": {
      "id": "woodway-memorial-park",
      "name": "Woodway Memorial Park",
      "latitude": 29.7647,
      "longitude": -95.4569
    },
    "takeOut": {
      "id": "sabine-street-access",
      "name": "Sabine Street Access",
      "latitude": 29.7622,
      "longitude": -95.3736
    },
    "logistics": {
      "distanceLabel": "About 7.4 to 8.3 mi",
      "estimatedPaddleTime": "Several hours at ordinary base flow; TPWD's segment estimates from Woodway through Hogg Bird Sanctuary, Eleanor Tinsley Park, and Sabine Street add up to roughly 4.75 hr to 6.75 hr depending on water level, obstructions, mud, heat, and group pace",
      "shuttle": "Stage the Sabine Street take-out first, then drive back to Woodway Memorial Park by Loop 610. Hogg Bird Sanctuary and Eleanor Tinsley Park are official coordinate-backed downstream bailout points, but each has its own parking and bank-access constraints.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, check USGS 08074000 and recent rainfall or reservoir-release context before launching, use only public access points or direct hazard portages, and obey current City of Houston and park rules.",
      "camping": "Treat this as a day-use urban route only. Houston Parks says camping is permitted only at Lake Houston Wilderness Park in the city park system, so Memorial Park, Buffalo Bayou Park, and the Sabine Street corridor are not route-camping evidence.",
      "campingClassification": "none",
      "summary": "Launch at Woodway Memorial Park and finish at Sabine Street for the most practical downtown Buffalo Bayou paddling-trail segment. Use USGS 08074000 with a conservative 150 cfs base-flow floor, then make a same-day call on storm runoff, reservoir releases, water quality, strainers, and muddy access.",
      "accessCaveats": [
        "TPWD publishes Woodway Memorial Park, Hogg Bird Sanctuary, Eleanor Tinsley Park, Sabine Street, and Allen's Landing as official downstream access points with GPS coordinates, but access quality varies from ramps to steep or muddy banks.",
        "Save Buffalo Bayou says the Woodway launch has parking and a sloped concrete ramp, but also notes mud at the bottom; it identifies the take-out just below Sabine Bridge as the easiest parking-supported finish.",
        "The stored Woodway and Sabine coordinates are public access anchors, not projected mid-channel points. Coordinate audit found them within about 418 ft and 329 ft of the Buffalo Bayou hydrography, so follow the signed ramp or bank path to the actual water entry on arrival.",
        "The bayou is navigable, but TPWD says private-bank use outside direct hazard portages can be trespassing. Do not turn visible lawns or banks into casual stops.",
        "This route uses a local minimum-only threshold source. Around 150 cfs is treated as the floor, while flows above about 2,000 cfs require experienced paddlers and a separate high-water judgment.",
        "Check park access, parking limits, and any post-storm closures before leaving vehicles because Houston bayou access points can change after floods, erosion, or construction."
      ],
      "watchFor": [
        "Flows near or below about 150 cfs, when Save Buffalo Bayou describes base flow as very low and slow and muddy launches or shallow obstructions can slow the day.",
        "Storm runoff, Addicks/Barker Reservoir releases, rising hydrographs, or flows over about 2,000 cfs, when the same local guidance says the bayou can be fast and dangerous.",
        "Log jams, strainers, pipelines, downed trees, low bridges, muddy banks, steep take-outs, and the need to portage obstructions with private-bank discipline.",
        "Urban water quality: TPWD says Buffalo Bayou is generally unsuitable for swimming, so avoid body contact where possible, wash hands, and do not paddle after sewage, bacteria, or heavy-rain alerts.",
        "Heat, limited shade on park sections, variable cell/parking logistics, fishing lines, wildlife, and the temptation to continue below Sabine Street without a separate downtown/Allen's Landing take-out plan."
      ]
    },
    "accessPoints": [
      {
        "id": "woodway-memorial-park",
        "name": "Woodway Memorial Park",
        "latitude": 29.7647,
        "longitude": -95.4569,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default TPWD put-in and Save Buffalo Bayou's recommended Woodway launch."
      },
      {
        "id": "hogg-bird-sanctuary",
        "name": "Hogg Bird Sanctuary",
        "latitude": 29.7583,
        "longitude": -95.4217,
        "mileFromStart": 3.2,
        "segmentKind": "creek",
        "note": "Official TPWD midpoint access with parking-hours and steep-bank caveats."
      },
      {
        "id": "eleanor-tinsley-park",
        "name": "Eleanor Tinsley Park",
        "latitude": 29.7617,
        "longitude": -95.3783,
        "mileFromStart": 6.9,
        "segmentKind": "creek",
        "note": "Official TPWD access just upstream of the short final segment to Sabine Street."
      },
      {
        "id": "sabine-street-access",
        "name": "Sabine Street Access",
        "latitude": 29.7622,
        "longitude": -95.3736,
        "mileFromStart": 7.4,
        "segmentKind": "creek",
        "note": "Default TPWD take-out and Save Buffalo Bayou's practical parking-supported finish below Sabine Bridge."
      }
    ]
  },
  "buffalo-bayou-sabine-street-allens-landing": {
    "putIn": {
      "id": "sabine-street-access",
      "name": "Sabine Street Access",
      "latitude": 29.7622,
      "longitude": -95.3736
    },
    "takeOut": {
      "id": "allens-landing-park",
      "name": "Allen's Landing Park",
      "latitude": 29.7647,
      "longitude": -95.3592
    },
    "logistics": {
      "distanceLabel": "About 1 mi",
      "estimatedPaddleTime": "About 1 hr by TPWD segment estimate, longer if low water, mud, wind, obstruction portages, or downtown take-out handling slows the trip",
      "shuttle": "Stage Allen's Landing first, then return to Sabine Street. This is the final short downtown segment of the official Buffalo Bayou Paddling Trail; do not continue below Allen's Landing without a separate ship-channel and downstream-access plan.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, check USGS 08074000 and recent rainfall or reservoir-release context before launching, use only public access points or direct hazard portages, and obey current City of Houston and park rules.",
      "camping": "Treat this as a day-use urban route only. Houston Parks says camping is permitted only at Lake Houston Wilderness Park in the city park system, so Buffalo Bayou Park and downtown access points are not route-camping evidence.",
      "campingClassification": "none",
      "summary": "Launch at Sabine Street and finish at Allen's Landing for the short downtown Houston connector on the Buffalo Bayou Paddling Trail. Use USGS 08074000 with a conservative 150 cfs base-flow floor, then make a same-day call on storm runoff, reservoir releases, water quality, strainers, and bridge-area take-out handling.",
      "accessCaveats": [
        "TPWD publishes Sabine Street and Allen's Landing as official downstream access points with GPS coordinates, but access quality can change after floods, erosion, events, or construction.",
        "The stored coordinates are public access anchors, not projected mid-channel launch points. Follow signed ramps, visible banks, and current park rules on arrival.",
        "The route is short, but the Allen's Landing take-out is mandatory for this card. Do not drift into a longer downtown or ship-channel plan without a separate route package and current safety review.",
        "The bayou is navigable, but TPWD says private-bank use outside direct hazard portages can be trespassing. Do not use downtown banks, lawns, bridge embankments, or private edges as casual stops.",
        "This route uses a local minimum-only threshold source. Around 150 cfs is treated as the floor, while flows above about 2,000 cfs require experienced paddlers and a separate high-water judgment."
      ],
      "watchFor": [
        "Flows near or below about 150 cfs, when Save Buffalo Bayou describes base flow as very low and slow and muddy banks or shallow obstructions can slow even a short route.",
        "Storm runoff, Addicks/Barker Reservoir releases, rising hydrographs, or flows over about 2,000 cfs, when the same local guidance says the bayou can be fast and dangerous.",
        "Bridge approaches, low or floating debris, log jams, strainers, pipelines, downed trees, downtown walls, and the need to land cleanly at Allen's Landing.",
        "Urban water quality: TPWD says Buffalo Bayou is generally unsuitable for swimming, so avoid body contact where possible, wash hands, and do not paddle after sewage, bacteria, or heavy-rain alerts.",
        "Heat, limited shade, event closures, fishing lines, wildlife, variable parking, and the temptation to treat the short distance as a no-check outing when the gauge or weather is wrong."
      ]
    },
    "accessPoints": [
      {
        "id": "sabine-street-access",
        "name": "Sabine Street Access",
        "latitude": 29.7622,
        "longitude": -95.3736,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default TPWD put-in for the short downtown connector; also the take-out for the upstream Woodway-to-Sabine route."
      },
      {
        "id": "allens-landing-park",
        "name": "Allen's Landing Park",
        "latitude": 29.7647,
        "longitude": -95.3592,
        "mileFromStart": 1,
        "segmentKind": "creek",
        "note": "Default TPWD downstream take-out and official end of the Buffalo Bayou Paddling Trail."
      }
    ]
  },
  "greens-bayou-brock-adventure-thomas-bell-foster": {
    "putIn": {
      "id": "brock-adventure-park",
      "name": "Brock Adventure Park",
      "latitude": 29.8423,
      "longitude": -95.2317
    },
    "takeOut": {
      "id": "thomas-bell-foster-park",
      "name": "Thomas Bell Foster Park",
      "latitude": 29.7743,
      "longitude": -95.202
    },
    "logistics": {
      "distanceLabel": "About 7.7 mi",
      "estimatedPaddleTime": "About 2 hr to 3.5 hr for the full TPWD trail, longer when flow is low, the tide is wrong, wind builds, or launch handling slows the group",
      "shuttle": "Stage Thomas Bell Foster Park first, then drive to Brock Adventure Park. Strickland Park is the official middle launch if you need a shorter segment, but this route card assumes the full Brock-to-Thomas-Bell-Foster run.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, check USGS 08076000, tide, wind, weather, water-quality advisories, and current park hours before launching.",
      "camping": "Treat Greens Bayou as a day-use urban route. TPWD publishes park-hour windows for the three launches, and Houston Parks says camping in the city park system is permitted only at Lake Houston Wilderness Park; no bayou-bank, launch-park, or private-edge camping is inferred.",
      "campingClassification": "none",
      "summary": "Launch at Brock Adventure Park and take out at Thomas Bell Foster Park for the full official Greens Bayou Paddling Trail through northeast Houston. Use USGS 08076000 only as a conservative minimum-flow check, then make a separate same-day call on tide, wind, storm runoff, water quality, wood, and park access.",
      "accessCaveats": [
        "TPWD publishes Brock Adventure Park, Strickland Park, and Thomas Bell Foster Park as manicured launch sites with GPS coordinates; the stored points are public access anchors, not projected mid-channel water-entry points.",
        "TPWD says steep banks and heavy undergrowth make take-outs along the bayou difficult, so plan to use the public launches and do not treat private banks as casual stops.",
        "Brock Adventure Park has seasonal posted hours, while Strickland and Thomas Bell Foster parks are listed sunrise to sunset; verify current gates, parking, construction, and post-storm closures before staging vehicles.",
        "The downstream part of the trail is tidal, and the Thomas Bell Foster landing can be more awkward at low tide or low flow; inspect the actual water-entry and arrival point on site.",
        "The 25 cfs floor is a community minimum-only cue from a Houston Canoe Club trip report on the Greens Bayou near Houston gauge, not an agency ideal range or high-water cutoff."
      ],
      "watchFor": [
        "Readings near or below about 25 cfs on USGS 08076000, when Houston Canoe Club described the bayou as about as low as they would want to paddle and noted occasional light dragging.",
        "Tide and wind on the lower bayou, especially near Thomas Bell Foster Park, where timing can affect landing height, current feel, and trip duration.",
        "Storm runoff, fast rises, floating trash, strainers, downed trees, and undercut or steep banks that limit improvised exits.",
        "Urban water quality and the TPWD fish-consumption advisory; avoid unnecessary body contact and skip the route after sewage, bacteria, or heavy-rain alerts.",
        "Alligators, fishing lines, heat, insects, variable cell coverage, park-hour gates, and the need to stay within public launches or direct hazard portages."
      ]
    },
    "accessPoints": [
      {
        "id": "brock-adventure-park",
        "name": "Brock Adventure Park",
        "latitude": 29.8423,
        "longitude": -95.2317,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default TPWD upstream launch and public access anchor for the full Greens Bayou Paddling Trail."
      },
      {
        "id": "strickland-park",
        "name": "Strickland Park",
        "latitude": 29.7931,
        "longitude": -95.2068,
        "mileFromStart": 4.6,
        "segmentKind": "creek",
        "note": "Official TPWD middle launch for shorter segment options; mile is route-plan approximate from endpoint geometry, so verify current landing conditions on arrival."
      },
      {
        "id": "thomas-bell-foster-park",
        "name": "Thomas Bell Foster Park",
        "latitude": 29.7743,
        "longitude": -95.202,
        "mileFromStart": 7.7,
        "segmentKind": "creek",
        "note": "Default TPWD downstream take-out for the full Greens Bayou trail and the annual regatta route."
      }
    ]
  },
  "elm-fork-trinity-river-llela-hebron-parkway": {
    "putIn": {
      "id": "llela-lewisville-lake-dam-launch",
      "name": "LLELA / Lewisville Lake Dam launch",
      "latitude": 33.067109,
      "longitude": -96.964697
    },
    "takeOut": {
      "id": "hebron-parkway-kayak-launch",
      "name": "Hebron Parkway Kayak Launch",
      "latitude": 33.0126,
      "longitude": -96.950689
    },
    "logistics": {
      "distanceLabel": "About 6 mi",
      "estimatedPaddleTime": "About 2 hr to 4 hr for most recreational groups, with time varying by dam release, strainers, and shuttle pace",
      "shuttle": "Stage a vehicle at Hebron Parkway / Trinity Fork Park first, then drive to LLELA and launch early enough to retrieve any vehicle left inside LLELA before closing. LLELA specifically advises against trying to paddle back upstream to the put-in.",
      "permits": "No route-specific paddling permit is published. LLELA charges daily vehicle entry, requires vehicles to be picked up before closing, and tells paddlers to check current release and conditions before launching. Follow Texas PFD rules and all LLELA access restrictions.",
      "camping": "LLELA has primitive campsites near, but not along, the river. Treat the route as a campground-supported day paddle from the put-in area; camping is designated-only and LLELA says there are no longer river campsites because of flooding.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch from LLELA below Lewisville Lake Dam and run downstream to Hebron Parkway for the short official northern Elm Fork segment of the Trinity River National Water Trail. The live decision hinges on dam release, LLELA's current-conditions note, and whether the group has enough margin for strainers and a committed shuttle.",
      "accessCaveats": [
        "LLELA's launch is primitive: it uses a gravel/dirt parking area, a pipe fence or gate, and a 50-100 yard sandy carry to a gentle shoreline rather than a formal ramp.",
        "Hebron Parkway is the first public downstream take-out and has a kayak launch; do not treat private banks between the endpoints as casual stops.",
        "LLELA requires any vehicle left at its parking area to be retrieved before closing, and after-hours admission is not available for a missed shuttle.",
        "This route uses LLELA's conservative 80-600 cfs public guidance for scoring. Above 600 cfs is swift-water territory for experienced paddlers; above 3,000 cfs boating is closed."
      ],
      "watchFor": [
        "Strong dam-tailwater current just below LLELA, especially after release changes.",
        "The tree hazard past the trestle bridge flagged on LLELA's current-conditions page.",
        "Strainers, fallen trees, bank erosion, and fresh wood after storms.",
        "Low-water dragging or shallow bars below about 80 cfs, plus fast pushy current above the 600 cfs public caution point.",
        "Camping and access limits: campsites are designated-only, there are no riverbank campsites, and no swimming or wading is allowed at LLELA."
      ]
    },
    "accessPoints": [
      {
        "id": "llela-lewisville-lake-dam-launch",
        "name": "LLELA / Lewisville Lake Dam launch",
        "latitude": 33.067109,
        "longitude": -96.964697,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Public upstream access anchor from the Trinity Coalition launch map and LLELA route guidance."
      },
      {
        "id": "hebron-parkway-kayak-launch",
        "name": "Hebron Parkway Kayak Launch",
        "latitude": 33.0126,
        "longitude": -96.950689,
        "mileFromStart": 6,
        "segmentKind": "creek",
        "note": "Public downstream launch/take-out named by LLELA and coordinate-backed on the current-conditions page."
      }
    ]
  },
  "elm-fork-trinity-river-hebron-parkway-mcinnish-park": {
    "putIn": {
      "id": "hebron-parkway-kayak-launch",
      "name": "Hebron Parkway Kayak Launch",
      "latitude": 33.0126,
      "longitude": -96.950689
    },
    "takeOut": {
      "id": "mcinnish-park-launch",
      "name": "McInnish Park",
      "latitude": 32.96744,
      "longitude": -96.942685
    },
    "logistics": {
      "distanceLabel": "About 5.75 mi",
      "estimatedPaddleTime": "Short to half-day urban river run; pace depends on release, flow, wood, shallow water, wind, and shuttle timing",
      "shuttle": "Stage McInnish Park first, then drive back to Hebron Parkway / Trinity Fork Park. This fills the middle Elm Fork gap between the LLELA-to-Hebron and McInnish-to-California route cards.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, check the Trinity Coalition map, USGS 08055500, weather, runoff, and current access conditions before launching.",
      "camping": "Treat this as a day-use urban river route. The route starts below LLELA's designated primitive campsite area and ends at Carrollton park/open-space access; no reviewed source supports informal riverbank camping between Hebron and McInnish.",
      "campingClassification": "none",
      "summary": "Launch at Hebron Parkway / Trinity Fork Park and take out at McInnish Park for the missing middle Elm Fork segment of the Trinity River National Water Trail. Use USGS 08055500 with TRPA's 100 cfs floor, and cancel when release, wood, water quality, or shuttle conditions are not clean.",
      "accessCaveats": [
        "Trinity Coalition map coordinates are public access anchors; follow current launch paths, signs, and park rules rather than projecting a mid-channel water-entry point.",
        "LLELA names Hebron Parkway / Trinity Fork Park as the first public take-out below the dam and the next public downstream access in Carrollton; do not invent private-bank stops or unmanaged road-shoulder access.",
        "USGS 08055500 was product-live during implementation but below the 100 cfs floor; expect shallow, slow, or scrape-prone conditions at similar readings.",
        "This segment stays downstream of the strongest LLELA tailwater, but the whole Elm Fork corridor remains release-influenced and wood-prone after floods."
      ],
      "watchFor": [
        "Flows below about 100 cfs on USGS 08055500, which can turn this into a shallow scrape through an urban corridor.",
        "High or rising water after storms or release changes, especially near TRPA's 2,000 cfs maximum caution.",
        "Log jams, strainers, fallen trees, bank erosion, and fresh wood after flooding.",
        "Urban water quality, heat, limited shade, park hours, vehicle security, and private-bank boundaries.",
        "A missed McInnish take-out that commits the group to the separate McInnish-to-California Crossing card."
      ]
    },
    "accessPoints": [
      {
        "id": "hebron-parkway-kayak-launch",
        "name": "Hebron Parkway Kayak Launch",
        "latitude": 33.0126,
        "longitude": -96.950689,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Official Trinity Coalition public launch coordinate and upstream access anchor for the section."
      },
      {
        "id": "mcinnish-park-launch",
        "name": "McInnish Park",
        "latitude": 32.96744,
        "longitude": -96.942685,
        "mileFromStart": 5.75,
        "segmentKind": "creek",
        "note": "Official Trinity Coalition downstream launch coordinate at Carrollton's McInnish Park."
      }
    ]
  },
  "clear-fork-trinity-river-art-cowsen-bryant-irvin": {
    "putIn": {
      "id": "art-cowsen-trailhead",
      "name": "Art Cowsen Trailhead",
      "latitude": 32.6643568,
      "longitude": -97.4476423
    },
    "takeOut": {
      "id": "bryant-irvin-road-access",
      "name": "Bryant Irvin Road access",
      "latitude": 32.7045112,
      "longitude": -97.4115092
    },
    "logistics": {
      "distanceLabel": "About 4.8 mi",
      "estimatedPaddleTime": "Half-day wooded urban Clear Fork run; pace slows sharply near the 100 cfs floor or when wood, low water, runoff, or shuttle handling stacks up",
      "shuttle": "Stage Bryant Irvin Road first, then drive back to Art Cowsen Trailhead. This is the upstream Clear Fork leg below Benbrook Dam; do not continue downstream without a separate Bryant-Irvin-to-Rogers or Rogers-to-Trinity plan.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, check USGS 08047000, weather, runoff, TRPA route notes, and current Fort Worth access conditions before launching.",
      "camping": "Treat this as a day-use urban route. Fort Worth publishes city park hours of 5 a.m. to 10 p.m. unless posted otherwise, and no reviewed source supports overnight route camping between Art Cowsen Trailhead and Bryant Irvin Road.",
      "campingClassification": "none",
      "summary": "Launch at Art Cowsen Trailhead and finish at Bryant Irvin Road for TRPA's 4.8-mile Clear Fork Trinity run below Benbrook Dam. Use USGS 08047000 with TRPA's 100 cfs floor, 150-250 cfs ideal band, and 2,000 cfs high-water caution, and skip the trip when wood, runoff, or low-water dragging makes the line uncertain.",
      "accessCaveats": [
        "TRPA Google map coordinates are public access anchors; follow current signs, paths, and landing conditions rather than projecting a mid-channel water-entry point.",
        "USGS 08047000 is upstream near Benbrook Dam and product-live for this Clear Fork reach, but same-day visual scouting still matters for wood, banks, and usable water at the launch.",
        "USGS 08047000 returned 16.6 cfs during implementation, well below TRPA's 100 cfs Clear Fork floor; expect shallow, slow, or scrape-prone conditions at similar readings.",
        "Use named public access only. Do not substitute private banks, golf-course edges, road shoulders, or unmanaged crossings for the planned take-out."
      ],
      "watchFor": [
        "Flows below about 100 cfs on USGS 08047000, when TRPA's Clear Fork minimum is not met and dragging or exposed obstructions become more likely.",
        "High or rising water after storms or release changes, especially near TRPA's 2,000 cfs maximum caution.",
        "Log jams, fallen trees, strainers, overhanging limbs, and fresh wood in the wooded Benbrook-to-Loop-820 corridor.",
        "Urban runoff and water quality after medium or heavy rains; clean cuts promptly and avoid contact when water is suspect.",
        "Fort Worth park hours, heat, vehicle security, private-bank boundaries, and a missed Bryant Irvin take-out that commits the group to a separate downstream leg."
      ]
    },
    "accessPoints": [
      {
        "id": "art-cowsen-trailhead",
        "name": "Art Cowsen Trailhead",
        "latitude": 32.6643568,
        "longitude": -97.4476423,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "TRPA public access map-link anchor and upstream access point for the section; treat as an arrival anchor, not a surveyed wetted-edge coordinate."
      },
      {
        "id": "bryant-irvin-road-access",
        "name": "Bryant Irvin Road access",
        "latitude": 32.7045112,
        "longitude": -97.4115092,
        "mileFromStart": 4.8,
        "segmentKind": "creek",
        "note": "TRPA public access map-link anchor and downstream take-out for the section; verify the current path and landing before committing downstream."
      }
    ]
  },
  "clear-fork-trinity-river-bryant-irvin-rogers-road": {
    "putIn": {
      "id": "bryant-irvin-road-access",
      "name": "Bryant Irvin Road access",
      "latitude": 32.7045112,
      "longitude": -97.4115092
    },
    "takeOut": {
      "id": "rogers-road-launch",
      "name": "Rogers Road",
      "latitude": 32.723245,
      "longitude": -97.365564
    },
    "logistics": {
      "distanceLabel": "About 3.4 mi",
      "estimatedPaddleTime": "Short urban Clear Fork run; pace depends on Benbrook release/flow, shallow bars, wood, wind, and shuttle timing",
      "shuttle": "Stage Rogers Road first, then drive back to Bryant Irvin Road. This fills the middle Clear Fork leg between the upstream Art Cowsen route and the downstream Rogers-to-Trinity Park route.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, check USGS 08047000, TRPA's Clear Fork notes, weather, runoff, and current access conditions before launching.",
      "camping": "Treat this as a day-use urban route. Fort Worth publishes city park hours of 5 a.m. to 10 p.m. unless posted otherwise, and no reviewed source supports overnight route camping between Bryant Irvin Road and Rogers Road.",
      "campingClassification": "none",
      "summary": "Launch at Bryant Irvin Road and finish at Rogers Road for TRPA's 3.4-mile middle Clear Fork Trinity run. Use USGS 08047000 with TRPA's 100 cfs floor, 150-250 cfs ideal band, and 2,000 cfs high-water caution, and skip the trip when wood, runoff, or low-water dragging makes the line uncertain.",
      "accessCaveats": [
        "TRPA and Trinity Coalition coordinates are public access anchors; follow current signs, paths, and landing conditions rather than projecting a mid-channel water-entry point.",
        "USGS 08047000 is upstream near Benbrook Dam and product-live for this Clear Fork reach, but same-day visual scouting still matters for wood, banks, and usable water at the launch.",
        "USGS 08047000 returned 16.6 cfs during implementation, well below TRPA's 100 cfs Clear Fork floor; expect shallow, slow, or scrape-prone conditions at similar readings.",
        "Use named public access only. Do not substitute private banks, golf-course edges, road shoulders, or unmanaged crossings for the planned take-out."
      ],
      "watchFor": [
        "Flows below about 100 cfs on USGS 08047000, when TRPA's Clear Fork minimum is not met and dragging or exposed obstructions become more likely.",
        "High or rising water after storms or release changes, especially near TRPA's 2,000 cfs maximum caution.",
        "Log jams, fallen trees, strainers, overhanging limbs, and fresh wood in the wooded urban corridor.",
        "Urban runoff and water quality after medium or heavy rains; clean cuts promptly and avoid contact when water is suspect.",
        "Fort Worth park hours, heat, vehicle security, private-bank boundaries, and a missed Rogers Road take-out that commits the group to the separate Rogers-to-Trinity Park leg."
      ]
    },
    "accessPoints": [
      {
        "id": "bryant-irvin-road-access",
        "name": "Bryant Irvin Road access",
        "latitude": 32.7045112,
        "longitude": -97.4115092,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "TRPA public access map-link anchor and upstream access point for the section; treat as an arrival anchor, not a surveyed wetted-edge coordinate."
      },
      {
        "id": "rogers-road-launch",
        "name": "Rogers Road",
        "latitude": 32.723245,
        "longitude": -97.365564,
        "mileFromStart": 3.4,
        "segmentKind": "creek",
        "note": "Official Trinity Coalition downstream launch coordinate and take-out for the middle Clear Fork section."
      }
    ]
  },
  "clear-fork-trinity-river-rogers-road-trinity-park": {
    "putIn": {
      "id": "rogers-road-launch",
      "name": "Rogers Road",
      "latitude": 32.723245,
      "longitude": -97.365564
    },
    "takeOut": {
      "id": "trinity-park-kayak-launch",
      "name": "Trinity Park Kayak Launch",
      "latitude": 32.73993,
      "longitude": -97.356348
    },
    "logistics": {
      "distanceLabel": "About 1.5 mi",
      "estimatedPaddleTime": "Short urban paddle; pace depends on Clear Fork flow, wind, wood, current access paths, and shuttle handling",
      "shuttle": "Stage Trinity Park first, then drive back to Rogers Road. This is a short point-to-point Clear Fork leg; do not extend downstream into the Trinity Park chute sequence without a separate whitewater plan and current map review.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, check USGS 08047000, weather, runoff, and the current Trinity Coalition launch map before launching.",
      "camping": "Treat this as a day-use urban route. Fort Worth publishes city park hours of 5 a.m. to 10 p.m. unless posted otherwise, and no reviewed source supports overnight route camping between Rogers Road and Trinity Park.",
      "campingClassification": "none",
      "summary": "Launch at Rogers Road and finish at Trinity Park Kayak Launch for a short Clear Fork Trinity National Water Trail segment in Fort Worth. Use USGS 08047000 with TRPA's 100 cfs floor and skip the downstream Trinity Park chutes unless the group has a separate, current whitewater plan.",
      "accessCaveats": [
        "Trinity Coalition map coordinates are launch-site access anchors; follow current signs, paths, and landing conditions rather than projecting a mid-channel water-entry point.",
        "This route intentionally ends at Trinity Park Kayak Launch before the downstream chute and dam sequence. Do not miss the take-out or continue into the chutes by default.",
        "USGS 08047000 was product-live during implementation but below the 100 cfs floor; expect shallow, slow, or scrape-prone conditions at similar readings.",
        "Trinity Coalition says access sites, river conditions, infrastructure, and dam guidance can change; review the interactive map before launching."
      ],
      "watchFor": [
        "Flows below about 100 cfs on USGS 08047000, when TRPA's Clear Fork minimum is not met.",
        "High or rising water after storms, especially near TRPA's 2,000 cfs maximum caution and after local runoff.",
        "Wood, strainers, overhanging limbs, urban water quality, and limited exits away from mapped public launches.",
        "The Trinity Park chute and dam sequence downstream of the take-out; treat it as a separate whitewater feature and avoid every dam unless current manager guidance clearly supports the move.",
        "Fort Worth park hours, heat, vehicle security, trail events, and private-bank boundaries between public access points."
      ]
    },
    "accessPoints": [
      {
        "id": "rogers-road-launch",
        "name": "Rogers Road",
        "latitude": 32.723245,
        "longitude": -97.365564,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Official Trinity Coalition public launch coordinate and upstream access anchor for the section."
      },
      {
        "id": "trinity-park-kayak-launch",
        "name": "Trinity Park Kayak Launch",
        "latitude": 32.73993,
        "longitude": -97.356348,
        "mileFromStart": 1.5,
        "segmentKind": "creek",
        "note": "Official Trinity Coalition downstream launch coordinate; route ends here before the downstream Trinity Park chute and dam sequence."
      }
    ]
  },
  "elm-fork-trinity-river-mcinnish-california-crossing": {
    "putIn": {
      "id": "mcinnish-park-launch",
      "name": "McInnish Park",
      "latitude": 32.96744,
      "longitude": -96.942685
    },
    "takeOut": {
      "id": "california-crossing-park-launch",
      "name": "California Crossing Park",
      "latitude": 32.868524,
      "longitude": -96.923634
    },
    "logistics": {
      "distanceLabel": "About 9.25 mi",
      "estimatedPaddleTime": "Half-day to long urban day; pace depends on flow, wind, wood, shallow water, and shuttle timing",
      "shuttle": "Stage California Crossing Park first, then drive to McInnish Park. Elm Park and Bird's Fort Trail Park are mapped intermediate launch/take-out options for shorter trips or bailouts.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, check the Trinity Coalition map, USGS 08055500, weather, runoff, and current access conditions before launching.",
      "camping": "Treat this as a day-use urban river route. Carrollton posts park hours of 5 a.m. to 10:30 p.m., California Crossing is a Dallas community park with parking but no campground, and no reviewed source supports informal riverbank camping.",
      "campingClassification": "none",
      "summary": "Run the Elm Fork from McInnish Park through the official Trinity River National Water Trail access chain to California Crossing Park. This is a practical North Texas day trip when USGS 08055500 is above TRPA's 100 cfs floor, wood is clear, and the shuttle is staged before park-hour constraints become an issue.",
      "accessCaveats": [
        "Trinity Coalition map coordinates are public access anchors; follow current launch paths, signs, and park rules rather than projecting a mid-channel water-entry point.",
        "McInnish Park, Elm Park, Bird's Fort Trail Park, and California Crossing Park form the mapped access chain; do not invent private-bank stops or unmanaged road-shoulder access.",
        "USGS 08055500 was product-live during implementation but below the 100 cfs floor; expect slow/shallow travel and possible dragging at similar readings.",
        "Trinity Coalition says access, infrastructure, river conditions, and dams can change; review the interactive map before launching."
      ],
      "watchFor": [
        "Flows below about 100 cfs on USGS 08055500, which can turn this into a shallow scrape through an urban corridor.",
        "High or rising water after storms, especially near TRPA's 2,000 cfs maximum caution and after local runoff.",
        "Log jams, strainers, fallen trees, and fresh wood after flooding.",
        "Frazier Dam downstream of California Crossing; do not miss the take-out or continue without a separate current map and portage plan.",
        "Urban water quality, heat, limited shade, park hours, vehicle security, and private-bank boundaries."
      ]
    },
    "accessPoints": [
      {
        "id": "mcinnish-park-launch",
        "name": "McInnish Park",
        "latitude": 32.96744,
        "longitude": -96.942685,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Official Trinity Coalition public launch coordinate and upstream access anchor for the section."
      },
      {
        "id": "elm-park-launch",
        "name": "Elm Park",
        "latitude": 32.947578,
        "longitude": -96.93722,
        "mileFromStart": 1.5,
        "segmentKind": "creek",
        "note": "Mapped intermediate Trinity Coalition launch and practical short-trip option."
      },
      {
        "id": "birds-fort-trail-park-launch",
        "name": "Bird's Fort Trail Park",
        "latitude": 32.881723,
        "longitude": -96.930802,
        "mileFromStart": 7.75,
        "segmentKind": "creek",
        "note": "Mapped intermediate launch before the final leg to California Crossing Park."
      },
      {
        "id": "california-crossing-park-launch",
        "name": "California Crossing Park",
        "latitude": 32.868524,
        "longitude": -96.923634,
        "mileFromStart": 9.25,
        "segmentKind": "creek",
        "note": "Official Trinity Coalition downstream launch coordinate and Dallas Parks community-park take-out."
      }
    ]
  },
  "elm-fork-trinity-river-california-crossing-frasier-dam": {
    "putIn": {
      "id": "california-crossing-park-launch",
      "name": "California Crossing Park",
      "latitude": 32.868524,
      "longitude": -96.923634
    },
    "takeOut": {
      "id": "frasier-dam-recreation-area-launch",
      "name": "Frasier Dam Recreation Area",
      "latitude": 32.84498,
      "longitude": -96.878471
    },
    "logistics": {
      "distanceLabel": "About 5.5 mi",
      "estimatedPaddleTime": "Half-day urban run; pace depends on flow, wind, wood, shallow water, and shuttle timing",
      "shuttle": "Stage Frasier Dam Recreation Area first, then drive to California Crossing Park. Treat Frasier Dam as the mandatory take-out for this card unless you have a separate current portage plan from the Trinity Coalition map.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, check the Trinity Coalition map, USGS 08055500, weather, runoff, dam hazards, and current access conditions before launching.",
      "camping": "Treat this as a day-use urban river route. Dallas park rules close public parks from 11 p.m. to 5 a.m. and prohibit overnight camping on park property except by special permit; no reviewed source supports route camping.",
      "campingClassification": "none",
      "summary": "Run the Elm Fork from California Crossing Park to Frasier Dam Recreation Area on the Trinity River National Water Trail. This is a practical North Texas day trip when USGS 08055500 is above TRPA's 100 cfs floor, wood is clear, and the dam-area take-out is confirmed before launch.",
      "accessCaveats": [
        "Trinity Coalition map coordinates are public access anchors; follow current launch paths, signs, and park rules rather than projecting a mid-channel water-entry point.",
        "California Crossing Park and Frasier Dam Recreation Area form the mapped access pair for this segment; do not invent private-bank stops or unmanaged road-shoulder access.",
        "USGS 08055500 was product-live during implementation and just above the 100 cfs floor; expect slower/shallow travel and possible dragging at similar readings.",
        "Trinity Coalition says access, infrastructure, river conditions, and dams can change; review the interactive map before launching."
      ],
      "watchFor": [
        "Flows below about 100 cfs on USGS 08055500, which can turn this into a shallow scrape through an urban corridor.",
        "High or rising water after storms, especially near TRPA's 2,000 cfs maximum caution and after local runoff.",
        "Log jams, strainers, fallen trees, and fresh wood after flooding.",
        "Frasier Dam and nearby low-head-dam infrastructure; treat Frasier Dam Recreation Area as the take-out for this card and avoid every dam unless current manager guidance clearly supports a portage.",
        "Urban water quality, heat, limited shade, park hours, vehicle security, and private-bank boundaries."
      ]
    },
    "accessPoints": [
      {
        "id": "california-crossing-park-launch",
        "name": "California Crossing Park",
        "latitude": 32.868524,
        "longitude": -96.923634,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Official Trinity Coalition upstream launch coordinate and Dallas Parks community-park access anchor."
      },
      {
        "id": "frasier-dam-recreation-area-launch",
        "name": "Frasier Dam Recreation Area",
        "latitude": 32.84498,
        "longitude": -96.878471,
        "mileFromStart": 5.5,
        "segmentKind": "creek",
        "note": "Official Trinity Coalition downstream launch coordinate and mandatory take-out before continuing into dam-influenced water."
      }
    ]
  },
  "elm-fork-trinity-river-trinity-view-trammell-crow": {
    "putIn": {
      "id": "trinity-view-park-launch",
      "name": "Trinity View Park kayak launch",
      "latitude": 32.810622,
      "longitude": -96.906538
    },
    "takeOut": {
      "id": "trammell-crow-park-sylvan-boat-ramp",
      "name": "Trammell Crow Park / Sylvan Boat Ramp",
      "latitude": 32.789872,
      "longitude": -96.834669
    },
    "logistics": {
      "distanceLabel": "About 5 mi",
      "estimatedPaddleTime": "Short urban connector; pace depends on flow, wind, wood, shallow water, runoff, and shuttle timing",
      "shuttle": "Stage Trammell Crow Park / Sylvan Boat Ramp first during Dallas park hours, then drive to Trinity View Park in Irving. This route uses the new Trinity View launch as the upstream access and should not be treated as the older 24.75-mile River Legacy-to-Trammell Crow long-day card.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, check the Trinity Coalition map, USGS 08055500, weather, runoff, and current access conditions before launching.",
      "camping": "Treat this as a day-use urban river route with no route camping. Irving posts Trinity View Park hours as sunrise to sunset, Dallas parks close overnight, and Dallas city code prohibits overnight camping on park property except by special permit; do not infer legal riverbank or floodway camping.",
      "campingClassification": "none",
      "summary": "Launch at the new Trinity View Park kayak launch and finish at Trammell Crow Park for the short Irving-to-Dallas Elm Fork connector. Use USGS 08055500 with TRPA's 100 cfs floor, then make a same-day call on runoff, wood, access status, private-bank discipline, and the current National Water Trail dam map.",
      "accessCaveats": [
        "TRPA's Trinity View Park map link resolves to an access-anchor coordinate for the new Irving launch. Follow the actual park ramp, posted signs, gate, parking, and bank conditions on arrival rather than projecting a mid-channel water-entry point.",
        "Trinity Coalition says the completed Trinity View launch sits at the southeast edge of the park near parking. If that launch is posted closed, blocked, or unsafe, skip the route rather than substituting a levee road or private bank.",
        "Trammell Crow Park / Sylvan Boat Ramp is the downstream public take-out used by existing Trinity River National Water Trail routes and Dallas Parks lists the park as having a boat ramp and parking.",
        "USGS Water Services JSON returned a temporary 503 during implementation, while the same USGS site returned current legacy RDB data. Recheck the live gauge before launch instead of relying on stale values.",
        "Trinity Coalition says access sites, dams, infrastructure, and river conditions change. Review the current launch-site and dam-hazard map before launching."
      ],
      "watchFor": [
        "Flows below about 100 cfs on USGS 08055500, when TRPA's Elm Fork minimum is not met and the route can become slow, shallow, muddy, or scrape-prone.",
        "High or rising water after storms, especially near TRPA's 2,000 cfs maximum caution and after local runoff.",
        "Log jams, strainers, fallen trees, urban water quality, soft mud banks, and difficult exits away from the mapped public launches.",
        "Confluence and dam context on the broader Trinity River Paddling Trail; review the current interactive map before launching and avoid every dam unless current manager guidance clearly supports a portage.",
        "Park-hour limits at both endpoints, vehicle security, heat, limited shade, wind, and private-bank boundaries through the Irving and Dallas floodway corridor."
      ]
    },
    "accessPoints": [
      {
        "id": "trinity-view-park-launch",
        "name": "Trinity View Park kayak launch",
        "latitude": 32.810622,
        "longitude": -96.906538,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "TRPA map-link access anchor and Trinity Coalition-described completed Irving kayak launch; follow current park signs and ramp conditions for the actual water entry."
      },
      {
        "id": "trammell-crow-park-sylvan-boat-ramp",
        "name": "Trammell Crow Park / Sylvan Boat Ramp",
        "latitude": 32.789872,
        "longitude": -96.834669,
        "mileFromStart": 5,
        "segmentKind": "creek",
        "note": "Downstream public take-out from Trinity Coalition National Water Trail materials and Dallas Parks Trammell Crow Park boat-ramp listing."
      }
    ]
  },
  "west-fork-trinity-river-white-settlement-panther-island": {
    "putIn": {
      "id": "white-settlement-road-launch",
      "name": "White Settlement Road",
      "latitude": 32.760046,
      "longitude": -97.3871
    },
    "takeOut": {
      "id": "panther-island-launch",
      "name": "Panther Island",
      "latitude": 32.759716,
      "longitude": -97.338446
    },
    "logistics": {
      "distanceLabel": "About 4.5 mi",
      "estimatedPaddleTime": "Short urban connector; pace depends on flow, wind, mud, wood, event closures, and launch handling",
      "shuttle": "Stage Panther Island first, then drive back to White Settlement Road. This is the short upstream connector into the existing Panther-to-Handley West Fork route; do not continue downstream without the separate longer-route plan.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, check USGS 08048000 and same-day Trinity Trails or event closures before launching, and use only public launch sites or direct hazard portages.",
      "camping": "Treat this as a day-use urban river route. Fort Worth park code limits city park and recreation-area use to posted hours or permit contexts, and no reviewed Trinity Coalition, TRWD, Trinity Trails, or TRPA source supports informal overnight camping on this connector.",
      "campingClassification": "none",
      "summary": "Launch at White Settlement Road and finish at Panther Island for the short upstream Fort Worth connector on the Trinity River National Water Trail. Use USGS 08048000 with TRPA's conservative 100 cfs floor, then make a same-day call on mud, wood, water quality, dam awareness, and access closures.",
      "accessCaveats": [
        "The Trinity Coalition map publishes White Settlement Road and Panther Island coordinates as launch-site anchors. Follow current signs and launch paths on arrival rather than projecting mid-channel coordinates.",
        "The Trinity Trails launch guide describes White Settlement access from the Isbell Road parking lot down to a concrete platform and Panther Island access from the public beach or Henderson Street area.",
        "TRWD says White Settlement Trailhead and Panther Island Pavilion are part of the Fort Worth paddling access network, and local managers had to agree to maintain the improved access for National Recreation Trail status.",
        "Trinity Coalition says river conditions, access sites, infrastructure, and dams can change and that users must investigate current conditions while planning a trip.",
        "TRPA's 100 cfs minimum and 200 cfs ideal cue are broad West Fork guidance. At very low readings, expect scraping, mud, slow travel, and more effort than the short mileage suggests."
      ],
      "watchFor": [
        "Flows below about 100 cfs, when TRPA's minimum is not met and the short urban reach can become slow, muddy, or scrape-prone.",
        "High or rising water, urban runoff, poor water quality, and storm-driven debris after rain.",
        "Log jams, strainers, steep muddy banks, low bridges, narrow-channel current, and difficult exits away from the mapped public launches.",
        "Dam and low-head-dam context on the broader Trinity River Paddling Trail; review the current interactive map before launching and avoid every dam unless a manager-marked chute or portage is clearly appropriate.",
        "Heat, limited shade, trail or event closures around Panther Island, vehicle security, and private-bank discipline between public access points."
      ]
    },
    "accessPoints": [
      {
        "id": "white-settlement-road-launch",
        "name": "White Settlement Road",
        "latitude": 32.760046,
        "longitude": -97.3871,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream launch from the Trinity Coalition Clear and West Forks map and Trinity Trails launch guide."
      },
      {
        "id": "panther-island-launch",
        "name": "Panther Island",
        "latitude": 32.759716,
        "longitude": -97.338446,
        "mileFromStart": 4.5,
        "segmentKind": "creek",
        "note": "Default downstream take-out and the upstream launch for the existing Panther-to-Handley West Fork route."
      }
    ]
  },
  "west-fork-trinity-river-panther-island-handley-ederville": {
    "putIn": {
      "id": "panther-island-launch",
      "name": "Panther Island",
      "latitude": 32.759716,
      "longitude": -97.338446
    },
    "takeOut": {
      "id": "handley-ederville-road-launch",
      "name": "Handley Ederville Road",
      "latitude": 32.782252,
      "longitude": -97.221388
    },
    "logistics": {
      "distanceLabel": "About 13.75 mi",
      "estimatedPaddleTime": "Long urban day; expect several hours depending on flow, wind, wood, mud, heat, and shuttle pace",
      "shuttle": "Stage the Handley Ederville Road take-out first, then drive back to Panther Island. Beach Street is the mapped intermediate launch about seven miles downstream and can be used as a shorter take-out or bailout when the full Panther-to-Handley day is too much.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, check USGS 08048000 and same-day Trinity Trails or event closures before launching, and use only public launch sites or direct hazard portages.",
      "camping": "Treat this as a day-use urban river route. Fort Worth park code does not support informal camping in city parks or recreation areas, and the Trinity Trails material provides public-use hours rather than overnight river-camping support.",
      "campingClassification": "none",
      "summary": "Launch at Panther Island and finish at Handley Ederville Road for the Fort Worth West Fork segment of the Trinity River National Water Trail. Use USGS 08048000 with TRPA's conservative 100 cfs floor, then make a same-day call on mud, wood, water quality, dam awareness, and access closures.",
      "accessCaveats": [
        "The Trinity Coalition map publishes Panther Island, Beach Street, and Handley Ederville Road coordinates as launch-site anchors. Follow current signs and launch paths on arrival rather than projecting mid-channel coordinates.",
        "This is a long urban route. Beach Street is a legitimate midpoint public launch and should be treated as the practical shorter option if the Fort Worth gauge is low, the group starts late, or the weather is unstable.",
        "Trinity Coalition says river conditions, access sites, infrastructure, and dams can change and that users must investigate current conditions while planning a trip.",
        "TRWD and Trinity Trails tell paddlers to check USGS water conditions before launching; trail hours, parking, and event closures can vary by location.",
        "TRPA's 100 cfs minimum and 200 cfs ideal cue are broad West Fork guidance. At very low readings, expect scraping, mud, slow travel, and more effort than the mileage alone suggests."
      ],
      "watchFor": [
        "Flows below about 100 cfs, when TRPA's minimum is not met and the long urban reach can become slow, muddy, or scrape-prone.",
        "High or rising water, urban runoff, poor water quality, and storm-driven debris after rain.",
        "Log jams, strainers, steep muddy banks, low bridges, narrow-channel current, and difficult exits away from the mapped public launches.",
        "Dam and low-head-dam context on the broader Trinity River Paddling Trail; review the current interactive map before launching and avoid every dam unless a manager-marked chute or portage is clearly appropriate.",
        "Heat, limited shade in exposed floodway sections, trail or event closures around Panther Island, and private-bank discipline between public access points."
      ]
    },
    "accessPoints": [
      {
        "id": "panther-island-launch",
        "name": "Panther Island",
        "latitude": 32.759716,
        "longitude": -97.338446,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream launch from the Trinity Coalition Panther-to-Handley map."
      },
      {
        "id": "beach-street-launch",
        "name": "Beach Street",
        "latitude": 32.753179,
        "longitude": -97.287571,
        "mileFromStart": 7,
        "segmentKind": "creek",
        "note": "Mapped midpoint launch and practical shorter take-out for the first Panther-to-Beach Street half."
      },
      {
        "id": "handley-ederville-road-launch",
        "name": "Handley Ederville Road",
        "latitude": 32.782252,
        "longitude": -97.221388,
        "mileFromStart": 13.75,
        "segmentKind": "creek",
        "note": "Default downstream take-out from the Trinity Coalition Panther-to-Handley map."
      }
    ]
  },
  "west-fork-trinity-river-handley-ederville-river-legacy": {
    "putIn": {
      "id": "handley-ederville-road-launch",
      "name": "Handley Ederville Road",
      "latitude": 32.782252,
      "longitude": -97.221388
    },
    "takeOut": {
      "id": "river-legacy-park-access-site",
      "name": "River Legacy Park Access Site",
      "latitude": 32.788243,
      "longitude": -97.100328
    },
    "logistics": {
      "distanceLabel": "About 13.25 mi",
      "estimatedPaddleTime": "Long urban day; expect several hours depending on flow, wind, wood, mud, heat, and shuttle pace",
      "shuttle": "Stage River Legacy Park first during open park hours, then drive back to Handley Ederville Road. This is the downstream continuation of the Panther-to-Handley segment, not the shorter River Legacy out-and-back.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, check USGS 08048000 and same-day Trinity Coalition or River Legacy access conditions before launching, and use only public launch sites or direct hazard portages.",
      "camping": "Treat this as a day-use urban river route. River Legacy Park posts 5 a.m.-10 p.m. park hours, and no reviewed Trinity Coalition, TPWD, TRPA, or River Legacy source supports informal overnight camping along the route.",
      "campingClassification": "none",
      "summary": "Launch at Handley Ederville Road and finish at River Legacy Park for a distinct West Fork Trinity National Water Trail segment through the Mid-Cities corridor. Use USGS 08048000 with TRPA's conservative 100 cfs floor, then make a same-day call on mud, wood, water quality, dam awareness, park hours, and access status.",
      "accessCaveats": [
        "The Trinity Coalition map publishes Handley Ederville Road and River Legacy Park coordinates as launch-site anchors. Follow current signs and launch paths on arrival rather than projecting mid-channel coordinates.",
        "TPWD corroborates the River Legacy Park Access Site and says the launch is adjacent to the pedestrian bridge inside River Legacy Parks.",
        "This is a long point-to-point route with fewer normal exits than the River Legacy out-and-back. Do not substitute unmanaged road crossings or private banks for a planned take-out.",
        "Trinity Coalition says river conditions, access sites, infrastructure, and dams can change and that users must investigate current conditions while planning a trip.",
        "TRPA's 100 cfs minimum and 200 cfs ideal cue are broad West Fork guidance. At very low readings, expect scraping, mud, slow travel, and more effort than the mileage alone suggests."
      ],
      "watchFor": [
        "Flows below about 100 cfs, when TRPA's minimum is not met and the long urban reach can become slow, muddy, or scrape-prone.",
        "High or rising water, urban runoff, poor water quality, and storm-driven debris after rain.",
        "Log jams, strainers, steep muddy banks, low bridges, narrow-channel current, and difficult exits away from the mapped public launches.",
        "Dam and low-head-dam context on the broader Trinity River Paddling Trail; review the current interactive map before launching and avoid every dam unless a manager-marked chute or portage is clearly appropriate.",
        "River Legacy Park hours, heat, limited shade, vehicle security, and private-bank discipline between public access points."
      ]
    },
    "accessPoints": [
      {
        "id": "handley-ederville-road-launch",
        "name": "Handley Ederville Road",
        "latitude": 32.782252,
        "longitude": -97.221388,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream launch from the Trinity Coalition Handley-to-River-Legacy map."
      },
      {
        "id": "river-legacy-park-access-site",
        "name": "River Legacy Park Access Site",
        "latitude": 32.788243,
        "longitude": -97.100328,
        "mileFromStart": 13.25,
        "segmentKind": "creek",
        "note": "Default downstream take-out from the Trinity Coalition map and TPWD River Legacy Parks Paddling Trail page."
      }
    ]
  },
  "trinity-river-trammell-crow-loop-12": {
    "putIn": {
      "id": "trammell-crow-park-sylvan-boat-ramp",
      "name": "Trammell Crow Park / Sylvan Boat Ramp",
      "latitude": 32.789872,
      "longitude": -96.834669
    },
    "takeOut": {
      "id": "loop-12-boat-ramp",
      "name": "Loop 12 Boat Ramp",
      "latitude": 32.707197,
      "longitude": -96.735997
    },
    "logistics": {
      "distanceLabel": "About 10.2 mi",
      "estimatedPaddleTime": "About 4 hr to 8 hr for the full trail, or 2 hr to 4 hr per TPWD section, with pace depending on water level, wind, wood, Dallas Wave handling, heat, and shuttle time",
      "shuttle": "Stage the Loop 12 take-out first, then drive back to Trammell Crow Park / Sylvan Boat Ramp. Moore Park / Dallas Wave is the official midpoint access and a practical early take-out if the full urban-to-forest day is too much.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, use the named public accesses, scout or portage Dallas Wave unless prepared for it, and check the Trinity Coalition map plus Dallas park conditions before launching.",
      "camping": "Treat this as a day-use urban river route. Dallas city code prohibits overnight camping on park property except by special permit, and no TPWD, Trinity Coalition, or city source supports informal riverbank camping on the route.",
      "campingClassification": "none",
      "summary": "Launch from Trammell Crow Park and finish at Loop 12 for the official Dallas Trinity Paddling Trail through downtown floodway and Great Trinity Forest. Use the Dallas USGS gauge with a conservative 100 cfs floor, then make a same-day call on Dallas Wave, dam hazards, runoff, water quality, wood, and shuttle timing.",
      "accessCaveats": [
        "TPWD and Trinity Coalition both identify Trammell Crow Park, Dallas Wave / Moore Park, and Loop 12 as public access anchors. Follow current signs and launch paths on arrival rather than projecting mid-channel coordinates.",
        "TPWD's page still carries an old 2014 note about the Trammell Crow/Sylvan launch being temporarily out of service; this route relies on Trinity Coalition's current National Water Trail map and water-level tiles for the modern access chain.",
        "Moore Park / Dallas Wave is an official midpoint access and the normal place to scout or portage the whitewater feature. Do not continue through the feature just because the route card exists.",
        "Trinity Coalition says access sites, infrastructure, and dams can change. Check the current interactive launch-site map and dam icons before paddling.",
        "TRPA's 100 cfs minimum and 400 cfs ideal cue are broad Dallas main-stem guidance. Near the floor, expect shallow, slow, or muddy travel; near the 2,000 cfs maximum cue or on a rising hydrograph, treat the route as high-consequence urban water."
      ],
      "watchFor": [
        "Dallas Wave / Santa Fe Avenue: scout early, portage if there is any doubt, and avoid every dam or low-head-dam feature unless current manager guidance clearly supports the move.",
        "Urban runoff, poor water quality, fish-consumption advisory context, and rising water after storms or spills.",
        "Strainers, log jams, steep muddy banks, low bridges, channelized current in the first half, wood-lined meanders below Moore Park, and difficult exits away from mapped public launches.",
        "Heat, limited shade in the open floodway, wind, construction or event closures, and the long 10.2-mile commitment if the group misses the Moore Park midpoint option.",
        "Private-bank limits: TPWD says the navigable streambed is public but ordinary private-bank use away from direct hazard portages can be trespassing."
      ]
    },
    "accessPoints": [
      {
        "id": "trammell-crow-park-sylvan-boat-ramp",
        "name": "Trammell Crow Park / Sylvan Boat Ramp",
        "latitude": 32.789872,
        "longitude": -96.834669,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream public access from TPWD and the Trinity Coalition Trammell-to-Loop-12 map."
      },
      {
        "id": "moore-park-dallas-wave",
        "name": "Moore Park / Dallas Wave",
        "latitude": 32.753207,
        "longitude": -96.792298,
        "mileFromStart": 3.75,
        "segmentKind": "creek",
        "note": "Official midpoint access and scout/portage decision point for the Dallas Wave / Santa Fe Avenue feature."
      },
      {
        "id": "loop-12-boat-ramp",
        "name": "Loop 12 Boat Ramp",
        "latitude": 32.707197,
        "longitude": -96.735997,
        "mileFromStart": 10.2,
        "segmentKind": "creek",
        "note": "Default downstream public take-out from TPWD and Trinity Coalition."
      }
    ]
  },
  "west-fork-trinity-river-river-legacy-trammell-crow": {
    "putIn": {
      "id": "river-legacy-park-access-site",
      "name": "River Legacy Park Access Site",
      "latitude": 32.788243,
      "longitude": -97.100328
    },
    "takeOut": {
      "id": "trammell-crow-park-sylvan-boat-ramp",
      "name": "Trammell Crow Park / Sylvan Boat Ramp",
      "latitude": 32.789872,
      "longitude": -96.834669
    },
    "logistics": {
      "distanceLabel": "About 24.75 mi",
      "estimatedPaddleTime": "All-day urban river commitment; expect a long day even near the 200 cfs ideal cue, and much slower progress in low water, wind, heat, mud, or wood",
      "shuttle": "Stage Trammell Crow Park / Sylvan Boat Ramp first during Dallas park hours, then return to River Legacy Park. This is the long downstream continuation between two existing Paddle Today route families, not the short River Legacy out-and-back.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, check USGS 08049500, Trinity Coalition map/access notes, River Legacy and Dallas park hours, weather, and recent rain before launch, and use only public launches or direct hazard portages.",
      "camping": "Treat this as a day-use urban route with no on-route camping. River Legacy Park posts 5 a.m.-10 p.m. hours, Dallas parks close overnight, and Dallas city code prohibits overnight camping on park property except by special permit; do not infer legal riverbank or floodway camping from the long mileage.",
      "campingClassification": "none",
      "summary": "Launch at River Legacy Park and finish at Trammell Crow Park for the 24.75-mile Trinity National Water Trail link through Grand Prairie and Irving to Dallas. Use the Grand Prairie gauge with a conservative 100 cfs floor, then make a same-day call on mileage, storm runoff, wood, water quality, heat, park hours, and the current dam/portage map.",
      "accessCaveats": [
        "Trinity Coalition publishes both endpoints as launch-site anchors. Follow current signs, ramps, park access paths, and bank conditions on arrival rather than treating the coordinates as survey-grade wetted-edge points.",
        "This is a long point-to-point segment with few normal exits. The map shows Beltline Road only as an emergency exit, not a planned public split for inventing a shorter scored route.",
        "TRPA's 100 cfs minimum and 200 cfs ideal cue are broad West Fork guidance. Near or below the floor, expect scraping, muddy banks, slow travel, and more exposure than the route distance alone suggests.",
        "Trinity Coalition says access sites, dams, infrastructure, and river conditions change. Review the current launch-site and dam-hazard map before launching.",
        "Do not substitute private banks, golf-course edges, levee roads, unmanaged road crossings, or floodway service roads for the planned take-out unless there is an immediate safety need."
      ],
      "watchFor": [
        "Flows below about 100 cfs on USGS 08049500, when TRPA's West Fork minimum is not met and the long urban route can become slow, muddy, or scrape-prone.",
        "High or rising water, urban runoff, poor water quality, storm debris, and limited rescue options after rain.",
        "Log jams, strainers, steep muddy banks, low bridges, narrow-channel current, and difficult exits away from the mapped public launches.",
        "Dam and low-head-dam context on the broader Trinity River Paddling Trail; review the current interactive map before launching and avoid every dam unless manager-marked portage guidance is clear.",
        "Heat, sun exposure, headwind, vehicle security, park-hour limits at both endpoints, and the possibility that the group will need far more time than shorter Trinity route cards suggest."
      ]
    },
    "accessPoints": [
      {
        "id": "river-legacy-park-access-site",
        "name": "River Legacy Park Access Site",
        "latitude": 32.788243,
        "longitude": -97.100328,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream public launch from the Trinity Coalition River-Legacy-to-Trammell-Crow map."
      },
      {
        "id": "trammell-crow-park-sylvan-boat-ramp",
        "name": "Trammell Crow Park / Sylvan Boat Ramp",
        "latitude": 32.789872,
        "longitude": -96.834669,
        "mileFromStart": 24.75,
        "segmentKind": "creek",
        "note": "Default downstream public take-out from the Trinity Coalition map and the existing Dallas Trinity route family."
      }
    ]
  },
  "rio-grande-mariscal-canyon-talley-solis": {
    "putIn": {
      "id": "talley-river-access",
      "name": "Talley River Access",
      "latitude": 28.9832,
      "longitude": -103.184
    },
    "takeOut": {
      "id": "solis-river-access",
      "name": "Solis River Access",
      "latitude": 29.0443,
      "longitude": -103.106
    },
    "logistics": {
      "distanceLabel": "About 10.2 mi",
      "estimatedPaddleTime": "Often a long day or overnight because of rough access roads and shuttle time; NPS says the canyon can be floated in a day above about 300 cfs",
      "shuttle": "Stage Solis first and scout the take-out from the road so it is recognizable from the river, then drive the high-clearance River Road approach to Talley. NPS says Panther Junction-to-Talley can take two to two and a half hours and road conditions should be checked before final plans.",
      "permits": "An NPS backcountry use permit is required before placing watercraft on the Rio Grande in Big Bend, including day-use and overnight Mariscal trips. Parties must carry required PFDs, spare equipment, survival gear, and overnight waste and fire-pan systems where applicable.",
      "camping": "This is overnight-capable only with a valid NPS river permit and a legal camp plan. NPS advises river parties not to camp at vehicle-accessible river-road sites unless a separate permit for that car camp has been secured, and camps must be above the high-water mark and out of arroyos. Do not infer camping from random banks, the Mexican side, or road-accessible sites.",
      "campingClassification": "overnight_capable",
      "summary": "Launch at Talley and finish at Solis for the remote Mariscal Canyon run. Use the Rio Grande Village USGS gauge with a conservative 200 cfs floor and NPS 300 cfs day-float cue, then make a same-day call on permits, River Road access, low-water dragging, Rock Pile, Tight Squeeze, heat, and storms.",
      "accessCaveats": [
        "American Whitewater coordinates are access anchors, not guaranteed wetted-edge launch points. Follow NPS signs, current road and bank conditions, and ranger guidance on arrival.",
        "NPS says high-clearance vehicles are usually required for both Mariscal access locations and the river road is rarely passable to passenger cars. Loose sand near the Talley road end is specifically called out.",
        "The route is currently below the 200 cfs conservative floor. Low water can mean dragging, longer exposure, harder lining choices, and more consequential boulder moves in the canyon.",
        "Solis is the common take-out, but NPS warns not to overshoot it because the next access is far downstream. Scout the take-out before launching.",
        "The route is border-adjacent and remote. Use only lawful U.S.-side access, respect international/private-land limits, and carry reliable emergency communication and enough treated water capacity."
      ],
      "watchFor": [
        "Rock Pile rapid around mile 2.6 and Tight Squeeze around mile 3.3; scout, line, or portage when the line or group skill is not clearly appropriate.",
        "Flows below about 200 cfs, when American Whitewater's lowest recommended level is not met and shallow dragging can dominate the day.",
        "Open-boat caution above about 1000 cfs and NPS high-water equipment cautions around 2000 cfs, especially on a rising hydrograph or after upstream storms.",
        "Extreme heat, limited shade, dehydration, treated-water planning, summer thunderstorms, sudden rises, flash flooding, and camps placed too low or in arroyos.",
        "Long rough-road shuttle exposure, vehicle security at remote accesses, poor cell coverage, wind, water-quality changes, and the temptation to continue downstream after Solis without the separate Boquillas or Great Unknown route plan."
      ]
    },
    "accessPoints": [
      {
        "id": "talley-river-access",
        "name": "Talley River Access",
        "latitude": 28.9832,
        "longitude": -103.184,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream access from American Whitewater map data; NPS names Talley as the Mariscal Canyon put-in."
      },
      {
        "id": "solis-river-access",
        "name": "Solis River Access",
        "latitude": 29.0443,
        "longitude": -103.106,
        "mileFromStart": 10.2,
        "segmentKind": "creek",
        "note": "Default downstream access from American Whitewater map data; NPS names Solis as the common Mariscal Canyon take-out."
      }
    ]
  },
  "rio-grande-lajitas-santa-elena-canyon": {
    "putIn": {
      "id": "lajitas-river-access",
      "name": "Lajitas River Access",
      "latitude": 29.264526,
      "longitude": -103.78302
    },
    "takeOut": {
      "id": "santa-elena-canyon-river-access",
      "name": "Santa Elena Canyon River Access",
      "latitude": 29.15559,
      "longitude": -103.598946
    },
    "logistics": {
      "distanceLabel": "About 20.6 mi",
      "estimatedPaddleTime": "Usually an overnight or two- to three-day trip; only fast, skilled groups should treat it as a high-water day run",
      "shuttle": "Stage the Santa Elena Canyon River Access take-out first, then return to Lajitas. Confirm Big Bend road conditions, take-out access, vehicle security, shuttle timing, and current river level before leaving a vehicle in this remote corridor.",
      "permits": "An NPS backcountry river permit is required before placing watercraft on the Rio Grande in Big Bend, including day-use and overnight Santa Elena trips. Parties must carry required PFDs, spare equipment, fire pan, and overnight waste system where applicable.",
      "camping": "This is an overnight-capable canyon route only with a valid NPS river permit and a legal camp plan. NPS prohibits camping in named Santa Elena / Castolon closure zones and requires camps to be above the high-water mark and out of side canyons or arroyos. Do not infer camping from random banks, the Mexican side, or private/developed areas.",
      "campingClassification": "overnight_capable",
      "summary": "Launch at Lajitas and finish at Santa Elena Canyon River Access for Big Bend's classic canyon run. Use the Castolon USGS gauge with a conservative 150 cfs floor and NPS 300-600 cfs open-boat band, then make a same-day call on permits, Rock Slide, heat, storm risk, camping zones, and group skill.",
      "accessCaveats": [
        "American Whitewater coordinates are access anchors, not guaranteed wetted-edge launch points. Follow NPS signs, current bank conditions, and ranger guidance on arrival.",
        "NPS says the Lajitas put-in and Santa Elena take-out are accessible by car, but this remains a remote desert shuttle with limited services and little margin for missed logistics.",
        "The route is currently below the 150 cfs conservative canoe/kayak floor. Low water can mean dragging, longer exposure, and more consequential boulder moves at Rock Slide and other canyon features.",
        "High or rising water can quickly change Rock Slide, wall shots, eddies, and camps. NPS says novices should reconsider above 600 cfs and adds high-water equipment cautions around 2,000 cfs.",
        "The route is border-adjacent and remote. Use only lawful U.S.-side access, respect international/private-land limits, and carry reliable emergency communication and enough treated water capacity."
      ],
      "watchFor": [
        "Rock Slide about two miles into the canyon; scout early and portage from river right if the line, level, or group skill is not clearly appropriate.",
        "Matadero, False Sentinel, San Carlos, Entrance Rapid, wall-shot moves, undercut rocks, sieves, boulders, shallow dragging, and channel splits at low to moderate levels.",
        "Extreme heat, limited shade, dehydration, treated-water planning, summer thunderstorms, sudden rises, flash flooding, and camps placed too low or in arroyos.",
        "NPS camping restrictions from the upstream end of the Santa Elena Nature Trail to 0.75 mile downstream from Castolon, plus current permit, group-size, waste-system, fire-pan, and PFD rules.",
        "Long shuttle exposure, vehicle security, poor cell coverage, wind, water-quality changes, and the temptation to treat this as a casual day float when the gauge or weather is marginal."
      ]
    },
    "accessPoints": [
      {
        "id": "lajitas-river-access",
        "name": "Lajitas River Access",
        "latitude": 29.264526,
        "longitude": -103.78302,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream access from American Whitewater map data; NPS names Lajitas as the put-in for the downstream Santa Elena trip."
      },
      {
        "id": "entrance-camp",
        "name": "Entrance Camp",
        "latitude": 29.1852,
        "longitude": -103.709,
        "mileFromStart": 11.8,
        "segmentKind": "creek",
        "note": "American Whitewater identifies this popular overnight camp at the upper mouth of Santa Elena Canyon; camp only under the NPS river permit and current legal camp-zone rules."
      },
      {
        "id": "santa-elena-canyon-river-access",
        "name": "Santa Elena Canyon River Access",
        "latitude": 29.15559,
        "longitude": -103.598946,
        "mileFromStart": 20.3,
        "segmentKind": "creek",
        "note": "Default downstream take-out from American Whitewater map data; parking and composting toilets are noted at river left."
      }
    ]
  },
  "rio-grande-rio-grande-village-heath-canyon": {
    "putIn": {
      "id": "rio-grande-village-river-access",
      "name": "Rio Grande Village River Access",
      "latitude": 29.17984,
      "longitude": -102.96085
    },
    "takeOut": {
      "id": "heath-canyon-la-linda",
      "name": "Heath Canyon / La Linda take-out",
      "latitude": 29.45025,
      "longitude": -102.82346
    },
    "logistics": {
      "distanceLabel": "About 33 mi to 35 mi",
      "estimatedPaddleTime": "Usually 2 to 3 days, with NPS noting three days at most levels and a possible two-day pace above about 800 cfs",
      "shuttle": "Stage the Heath Canyon take-out on the U.S. side downstream from La Linda only after confirming current TPWD Black Gap / Heath Canyon Limited Use Permit requirements, road conditions, vehicle security, and border-area logistics. Then drive back to Rio Grande Village inside Big Bend National Park for launch.",
      "permits": "An NPS backcountry use permit is required before putting any watercraft on the Rio Grande, including day and overnight river trips. Heath Canyon take-out access is TPWD-operated and requires a Limited Use Permit with self-registration at Black Gap WMA headquarters.",
      "camping": "This is an overnight-capable canyon route only with the required NPS river permit and a legal camp plan. NPS prohibits or discourages camping in developed, private, vehicle-accessible, and sensitive areas, including the early Boquillas Canyon Trail vicinity, private Heath Canyon ranch areas without approval, Black Gap fish camps, and other inhabited or cultivated areas. Use legal river camps above the high-water mark; do not infer camping from any random bank.",
      "campingClassification": "overnight_capable",
      "summary": "Launch at Rio Grande Village and paddle the remote Boquillas Canyon corridor to Heath Canyon / La Linda. The route is Class I-II but high-commitment because of heat, permits, water logistics, sudden rises, limited exits, camping restrictions, and the long take-out shuttle.",
      "accessCaveats": [
        "American Whitewater coordinates are access anchors, not a promise that the current wetted launch line is at the coordinate. Follow NPS signs, current riverbank conditions, and ranger guidance on arrival.",
        "NPS says Rio Grande Village is the normal put-in for Boquillas Canyon; do not use private land, Mexican-bank landings, or informal roads as alternate access except for immediate safety needs.",
        "NPS says Heath Canyon is now owned and operated by TPWD and requires Limited Use Permit handling through Black Gap WMA. Confirm the access is open, drivable, and permitted before committing to the canyon.",
        "At low water below the 150 cfs recommendation, expect dragging, exposed boulders, slower travel, and higher risk at shallow rock gardens. At rising or storm-driven levels, treat camps, side canyons, and narrow canyon sections as flash-flood hazards.",
        "The route is remote and border-adjacent. Carry required safety gear, repair supplies, extra water treatment capacity, waste system, firepan when fires are allowed, and reliable emergency communication."
      ],
      "watchFor": [
        "Arroyo del Veinte, the lower-canyon Class II boulder feature American Whitewater flags as capable of flipping canoes at lower flows.",
        "Extreme heat, limited shade, dehydration, treated-water planning, sudden storms, and flash flooding during the summer rainy season.",
        "Strainers, boulders, rock gardens, shallow dragging, strong wind in open reaches, and difficult rescue due to limited road access.",
        "NPS camping restrictions near Boquillas Canyon Trail, developed or vehicle-accessible areas, private ranch lands, Heath Canyon, Black Gap fish camps, and cultivated or inhabited areas.",
        "Current NPS river regulations, private group size limits, required PFDs/spare gear, overnight waste-system rules, and water-quality concerns."
      ]
    },
    "accessPoints": [
      {
        "id": "rio-grande-village-river-access",
        "name": "Rio Grande Village River Access",
        "latitude": 29.17984,
        "longitude": -102.96085,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default NPS Boquillas Canyon put-in; American Whitewater publishes this river-left Rio Grande Village access anchor."
      },
      {
        "id": "heath-canyon-la-linda",
        "name": "Heath Canyon / La Linda take-out",
        "latitude": 29.45025,
        "longitude": -102.82346,
        "mileFromStart": 34.6,
        "segmentKind": "creek",
        "note": "Default downstream take-out below La Linda; American Whitewater publishes this access anchor and NPS notes TPWD Limited Use Permit requirements."
      }
    ]
  },
  "rio-grande-gravel-pit-rio-grande-village": {
    "putIn": {
      "id": "gravel-pit-river-access",
      "name": "Gravel Pit river access",
      "latitude": 29.151417,
      "longitude": -103.002417
    },
    "takeOut": {
      "id": "rio-grande-village-river-access",
      "name": "Rio Grande Village take-out",
      "latitude": 29.17984,
      "longitude": -102.96085
    },
    "logistics": {
      "distanceLabel": "About 5 mi",
      "estimatedPaddleTime": "Usually a half-day float, with the first couple miles slow at lower water",
      "shuttle": "Stage the Rio Grande Village take-out first, then use River Road East and the Gravel Pit access road only when current NPS road conditions support high-clearance travel. Bring two vehicles or arrange a local shuttle or guided trip.",
      "permits": "NPS requires a backcountry river permit before placing watercraft on the Rio Grande within Big Bend National Park. Day-use inner tubes are exempt, but this canoe/kayak route should still be treated as a permitted river trip.",
      "camping": "NPS says there is no overnight camping along the Hot Springs Canyon stretch, so the river trip is day-use only. Gravel Pit has permitted primitive roadside campsites at the put-in area, but they require a separate backcountry campsite permit and should not be treated as on-route camping.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch from the Gravel Pit river access and float through Hot Springs Canyon to Rio Grande Village. The route is gentle at most levels and currently just above the NPS 30 cfs canoe/kayak floor, but high-clearance access, heat, shallow water, and NPS permit requirements still matter.",
      "accessCaveats": [
        "The Gravel Pit coordinate is an access anchor for the river access/campsite road area, not a guaranteed wetted-edge launch point. Use the signed NPS river-bank access at the end of the road and current bank conditions.",
        "NPS says River Road East and Gravel Pit Road require high-clearance vehicles and can become extremely muddy or impassable after rain.",
        "NPS says no overnight camping is allowed along this stretch of river. Use only separately permitted primitive roadside campsite plans at Gravel Pit or normal developed campground plans away from the route.",
        "The same-day gauge reading is only barely above the 30 cfs NPS floor. Expect shallow riffles, slow travel, and possible dragging if the hydrograph drops.",
        "This is a border river trip. The NPS river permit does not authorize entering Mexico, and parties should follow all current park, private-land, and river-use rules."
      ],
      "watchFor": [
        "Slow first miles, shallow riffles below Hot Springs, low-water scraping, and missed take-out discipline at Rio Grande Village.",
        "Summer heat, limited shade, sun exposure, dehydration, and the need to carry enough water even on a short float.",
        "Thunderstorms, sudden rises, muddy access roads, and flash-flood response in side drainages.",
        "Required PFDs, extra paddle/spare gear expectations, and current NPS river regulations.",
        "Private-bank and international-boundary limits; do not land in Mexico or use informal access except for immediate safety."
      ]
    },
    "accessPoints": [
      {
        "id": "gravel-pit-river-access",
        "name": "Gravel Pit river access",
        "latitude": 29.151417,
        "longitude": -103.002417,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream Hot Springs Canyon put-in. NPS says the river bank at the end of Gravel Pit Road is easily accessed but can have deep sand and gravel."
      },
      {
        "id": "rio-grande-village-river-access",
        "name": "Rio Grande Village take-out",
        "latitude": 29.17984,
        "longitude": -102.96085,
        "mileFromStart": 5,
        "segmentKind": "creek",
        "note": "Default downstream take-out named by NPS for the Hot Springs Canyon day float and already used as the upstream access anchor for the Boquillas Canyon route."
      }
    ]
  },
  "north-prong-medina-river-3rd-crossing-freeman-crossing": {
    "putIn": {
      "id": "third-crossing-fr-2107",
      "name": "3rd Crossing of FR 2107",
      "latitude": 29.8763326,
      "longitude": -99.3483821
    },
    "takeOut": {
      "id": "freeman-crossing-sh-16",
      "name": "Freeman Crossing at SH 16",
      "latitude": 29.85418,
      "longitude": -99.2796359
    },
    "logistics": {
      "distanceLabel": "About 6.6 mi",
      "estimatedPaddleTime": "Half-day North Prong run when recent rain leaves enough water; near or below the 50 cfs floor, expect a slow scrape with dragging and exposed limestone",
      "shuttle": "Stage Freeman Crossing at SH 16 first, then return to 3rd Crossing of FR 2107. Use only the TRPA-named public road-crossing access anchors and current roadside conditions; do not rely on private banks for shuttle, bailout, or casual stops.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, use only public road crossings or named access points, check USGS 0817887350, weather, and recent rain before launching, and obey posted access restrictions.",
      "camping": "Treat this as a day-use route with no public on-route camping selected. TRPA says the only public camping along the Medina River is Pioneer River Resort in Bandera, downstream from this North Prong reach, so do not infer legal camps from gravel bars, private banks, road crossings, cabins, or nearby ranch land.",
      "campingClassification": "none",
      "summary": "Launch at 3rd Crossing of FR 2107 and take out at Freeman Crossing for a 6.6-mile North Prong Medina run. Use the Patterson Road gauge, treat 50 cfs as the North Prong floor, and skip the route if crossings, drops, wood, weather, or private-bank access make the plan ambiguous.",
      "accessCaveats": [
        "TRPA's Google map links resolve to exact access-anchor coordinates for 3rd Crossing and Freeman Crossing, but final water entry and exit should follow current signs, road-shoulder conditions, and safe banks rather than a projected mid-channel point.",
        "TRPA says almost all property adjacent to the Medina River is private. Use public road crossings for access and do not treat private banks, cabins, camps, or ranch roads as public stops.",
        "The route was implemented with USGS 0817887350 product-live at 47.4 cfs, just below TRPA's 50 cfs North Prong floor and far below the 300 cfs ideal cue. At similar or lower levels, expect exposed limestone, dragging, and slower travel.",
        "TRPA says all low-water crossings are potential hazards. If a crossing is posted, blocked, pushy, fenced, or unsafe, skip the route rather than inventing a private alternate."
      ],
      "watchFor": [
        "Flows below about 50 cfs on USGS 0817887350, when the TRPA North Prong minimum is not met and dragging over rock or gravel bars is likely.",
        "High or rising water after storms, especially above about 300 cfs where TRPA says stronger navigation skill is needed and near 2,000 cfs where the route should not be attempted.",
        "Chamblee Falls and other North Prong drops, ledges, low-water crossings, strainers, narrow channels, blind bends, fences or debris after floods, and limited exits between public crossings.",
        "Private-property boundaries, road-crossing traffic, roadside parking limits, heat, sun exposure, and lack of public riverbank camping.",
        "Class I-III rain-dependent whitewater character; casual flatwater groups should choose an easier Medina segment instead."
      ]
    },
    "accessPoints": [
      {
        "id": "third-crossing-fr-2107",
        "name": "3rd Crossing of FR 2107",
        "latitude": 29.8763326,
        "longitude": -99.3483821,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "TRPA map-link access anchor and upstream public-road-crossing route point; use current signs and safe bank conditions for the actual water entry."
      },
      {
        "id": "freeman-crossing-sh-16",
        "name": "Freeman Crossing at SH 16",
        "latitude": 29.85418,
        "longitude": -99.2796359,
        "mileFromStart": 6.6,
        "segmentKind": "creek",
        "note": "TRPA map-link access anchor and downstream public-road-crossing route point; confirm current road-shoulder, traffic, and bank conditions on arrival."
      }
    ]
  },
  "north-prong-medina-river-freeman-crossing-moffett-park": {
    "putIn": {
      "id": "freeman-crossing-sh-16",
      "name": "Freeman Crossing at SH 16",
      "latitude": 29.85418,
      "longitude": -99.2796359
    },
    "takeOut": {
      "id": "moffett-park-medina",
      "name": "Moffett Park, Medina",
      "latitude": 29.7945195,
      "longitude": -99.2490676
    },
    "logistics": {
      "distanceLabel": "About 6.3 mi",
      "estimatedPaddleTime": "Half-day North Prong run when recent rain leaves enough water; near or below the 50 cfs floor, expect a slow scrape with dragging and exposed limestone",
      "shuttle": "Stage Moffett Park first, then return to Freeman Crossing at SH 16. Use only the TRPA-named public road-crossing access anchors and current roadside conditions; do not rely on private banks for shuttle, bailout, or casual stops.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, use only public road crossings or named access points, check USGS 0817887350, weather, and recent rain before launching, and obey posted access restrictions.",
      "camping": "Treat this as a day-use route with no public on-route camping selected. TRPA says the only public camping along the Medina River is Pioneer River Resort in Bandera, downstream from this North Prong reach, so do not infer legal camps from gravel bars, private banks, road crossings, cabins, or nearby ranch land.",
      "campingClassification": "none",
      "summary": "Launch at Freeman Crossing and take out at Moffett Park for a 6.3-mile North Prong Medina run. Use the Patterson Road gauge, treat 50 cfs as the North Prong floor, and skip the route if crossings, wood, weather, or private-bank access make the plan ambiguous.",
      "accessCaveats": [
        "TRPA's Google map links resolve to exact access-anchor coordinates for Freeman Crossing and Moffett Park, but final water entry and exit should follow current signs, road-shoulder conditions, and safe banks rather than a projected mid-channel point.",
        "TRPA says almost all property adjacent to the Medina River is private. Use public road crossings for access and do not treat private banks, cabins, camps, or ranch roads as public stops.",
        "The route was implemented with USGS 0817887350 product-live at 48.5 cfs, just below TRPA's 50 cfs North Prong floor and far below the 300 cfs ideal cue. At similar or lower levels, expect exposed limestone, dragging, and slower travel.",
        "TRPA says all low-water crossings are potential hazards. If a crossing is posted, blocked, pushy, fenced, or unsafe, skip the route rather than inventing a private alternate."
      ],
      "watchFor": [
        "Flows below about 50 cfs on USGS 0817887350, when the TRPA North Prong minimum is not met and dragging over rock or gravel bars is likely.",
        "High or rising water after storms, especially above about 300 cfs where TRPA says stronger navigation skill is needed and near 2,000 cfs where the route should not be attempted.",
        "Low-water crossings, ledges, strainers, narrow channels, blind bends, fences or debris after floods, and limited exits between public crossings.",
        "Private-property boundaries, road-crossing traffic, roadside parking limits, heat, sun exposure, and lack of public riverbank camping.",
        "Class I-III rain-dependent whitewater character; casual flatwater groups should choose an easier Medina segment instead."
      ]
    },
    "accessPoints": [
      {
        "id": "freeman-crossing-sh-16",
        "name": "Freeman Crossing at SH 16",
        "latitude": 29.85418,
        "longitude": -99.2796359,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "TRPA map-link access anchor and upstream public-road-crossing route point; use current signs and safe bank conditions for the actual water entry."
      },
      {
        "id": "moffett-park-medina",
        "name": "Moffett Park, Medina",
        "latitude": 29.7945195,
        "longitude": -99.2490676,
        "mileFromStart": 6.3,
        "segmentKind": "creek",
        "note": "TRPA map-link access anchor and downstream Moffett Park take-out beside the Patterson Road gauge; confirm current park and bank conditions on arrival."
      }
    ]
  },
  "medina-river-moffett-park-bandina-camp-road": {
    "putIn": {
      "id": "moffett-park-medina",
      "name": "Moffett Park, Medina",
      "latitude": 29.7945195,
      "longitude": -99.2490676
    },
    "takeOut": {
      "id": "bandina-camp-road-crossing",
      "name": "Bandina Camp Road crossing",
      "latitude": 29.7677822,
      "longitude": -99.1882724
    },
    "logistics": {
      "distanceLabel": "About 6.7 mi",
      "estimatedPaddleTime": "Half-day Hill Country run when the Medina has enough water; low flows near the 30 cfs floor can turn this into a slow scrape with dragging",
      "shuttle": "Stage Bandina Camp Road first, then return to Moffett Park in Medina. Use only the TRPA-named public access anchors and current public road-crossing conditions; do not rely on private banks for shuttle, bailout, or casual stops.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, use only public road crossings or named access points, check USGS 0817887350, weather, and recent rain before launching, and obey any posted access restrictions.",
      "camping": "Treat this as a day-use route with no public on-route camping selected. TRPA says the only public camping along the Medina River is Pioneer River Resort in Bandera, downstream from this reach, so do not infer legal camps from gravel bars, private banks, Moffett Park, or the Bandina Camp Road crossing.",
      "campingClassification": "none",
      "summary": "Launch at Moffett Park in Medina and take out at Bandina Camp Road for a 6.7-mile upper Medina River day trip. Use the Patterson Road gauge, expect shallow dragging near the 30 cfs floor, and keep stops to lawful public access because most adjacent land is private.",
      "accessCaveats": [
        "TRPA's Google map links resolve to exact access-anchor coordinates for Moffett Park and Bandina Camp Road, but final water entry and exit should follow current signs, road-shoulder conditions, and safe banks rather than a projected mid-channel point.",
        "TRPA says almost all property adjacent to the Medina River is private. Use public road crossings for access and do not treat private banks, cabins, camps, or ranch roads as public stops.",
        "The route was implemented with USGS 0817887350 product-live at 49.6 cfs, above the 30 cfs lower-Medina floor but far below the 300 cfs ideal cue. At similar or lower levels, expect exposed gravel, dragging, and slower travel.",
        "Downstream Bandera-area water-quality cautions on the TRPA page are not used as route evidence for this upper reach, but paddlers should still avoid paddling after local runoff or visible contamination."
      ],
      "watchFor": [
        "Flows below about 30 cfs on USGS 0817887350, when the TRPA lower-Medina minimum is not met and dragging over rock or gravel bars is likely.",
        "High or rising water after storms, especially above about 300 cfs where TRPA says more navigation skill is needed and near 2,000 cfs where the route should not be attempted.",
        "Wood, strainers, narrow channels, blind bends, fences or debris after floods, and limited exits between public crossings.",
        "Private-property boundaries, road-crossing traffic, roadside parking limits, heat, sun exposure, and lack of public riverbank camping.",
        "Changing access conditions at small public crossings; if a crossing is posted, unsafe, or blocked, skip the trip rather than inventing a private alternate."
      ]
    },
    "accessPoints": [
      {
        "id": "moffett-park-medina",
        "name": "Moffett Park, Medina",
        "latitude": 29.7945195,
        "longitude": -99.2490676,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "TRPA map-link access anchor and upstream public route point; use current signs and safe bank conditions for the actual water entry."
      },
      {
        "id": "bandina-camp-road-crossing",
        "name": "Bandina Camp Road crossing",
        "latitude": 29.7677822,
        "longitude": -99.1882724,
        "mileFromStart": 6.7,
        "segmentKind": "creek",
        "note": "TRPA map-link access anchor and downstream public-road-crossing take-out; confirm current roadside parking and bank conditions on arrival."
      }
    ]
  },
  "medina-river-bandina-camp-road-peaceful-valley": {
    "putIn": {
      "id": "bandina-camp-road-crossing",
      "name": "Bandina Camp Road crossing",
      "latitude": 29.7677822,
      "longitude": -99.1882724
    },
    "takeOut": {
      "id": "peaceful-valley-road-crossing",
      "name": "Peaceful Valley Road Crossing",
      "latitude": 29.7439466,
      "longitude": -99.1487218
    },
    "logistics": {
      "distanceLabel": "About 3.5 mi",
      "estimatedPaddleTime": "Short Hill Country run when the Medina has enough water; low flows near the 30 cfs floor can turn this into a scrape-prone wade-and-float",
      "shuttle": "Stage Peaceful Valley Road first, then return to Bandina Camp Road. Use only the TRPA-named public road-crossing access anchors and current roadside conditions; do not rely on private banks for shuttle, bailout, or casual stops.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, use only public road crossings or named access points, check USGS 0817887350, downstream USGS 08178880, weather, and recent rain before launching, and obey posted access restrictions.",
      "camping": "Treat this as a day-use route with no public on-route camping selected. TRPA says the only public camping along the Medina River is Pioneer River Resort in Bandera, downstream from this reach, so do not infer legal camps from gravel bars, private banks, road crossings, cabins, or nearby ranch land.",
      "campingClassification": "none",
      "summary": "Launch at Bandina Camp Road and take out at Peaceful Valley Road for a 3.5-mile upper Medina River day trip. Use the Patterson Road gauge, cross-check the Bandera gauge, expect shallow dragging near the 30 cfs floor, and keep stops to lawful public access because most adjacent land is private.",
      "accessCaveats": [
        "TRPA's Google map links resolve to exact access-anchor coordinates for Bandina Camp Road and Peaceful Valley Road, but final water entry and exit should follow current signs, road-shoulder conditions, and safe banks rather than a projected mid-channel point.",
        "TRPA says almost all property adjacent to the Medina River is private. Use public road crossings for access and do not treat private banks, cabins, camps, or ranch roads as public stops.",
        "The route was implemented with USGS 0817887350 product-live at 49.6 cfs and downstream USGS 08178880 at 59.0 cfs, above the 30 cfs lower-Medina floor but far below the 300 cfs ideal cue. At similar or lower levels, expect exposed gravel, dragging, and slower travel.",
        "Downstream Bandera-area water-quality cautions on the TRPA page are not the primary evidence for this upper reach, but paddlers should still avoid paddling after local runoff or visible contamination."
      ],
      "watchFor": [
        "Flows below about 30 cfs on USGS 0817887350, when the TRPA lower-Medina minimum is not met and dragging over rock or gravel bars is likely.",
        "High or rising water after storms, especially above about 300 cfs where TRPA says more navigation skill is needed and near 2,000 cfs where the route should not be attempted.",
        "Wood, strainers, narrow channels, blind bends, fences or debris after floods, and limited exits between public crossings.",
        "Private-property boundaries, road-crossing traffic, roadside parking limits, heat, sun exposure, and lack of public riverbank camping.",
        "Changing access conditions at small public crossings; if a crossing is posted, unsafe, or blocked, skip the trip rather than inventing a private alternate."
      ]
    },
    "accessPoints": [
      {
        "id": "bandina-camp-road-crossing",
        "name": "Bandina Camp Road crossing",
        "latitude": 29.7677822,
        "longitude": -99.1882724,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "TRPA map-link access anchor and upstream public-road-crossing route point; use current signs and safe bank conditions for the actual water entry."
      },
      {
        "id": "peaceful-valley-road-crossing",
        "name": "Peaceful Valley Road Crossing",
        "latitude": 29.7439466,
        "longitude": -99.1487218,
        "mileFromStart": 3.5,
        "segmentKind": "creek",
        "note": "TRPA map-link access anchor and downstream public-road-crossing take-out; confirm current roadside parking and bank conditions on arrival."
      }
    ]
  },
  "medina-river-peaceful-valley-ranger-crossing": {
    "putIn": {
      "id": "peaceful-valley-road-crossing",
      "name": "Peaceful Valley Road Crossing",
      "latitude": 29.7439466,
      "longitude": -99.1487218
    },
    "takeOut": {
      "id": "ranger-crossing-highway-16",
      "name": "Ranger Crossing at Highway 16",
      "latitude": 29.7369976,
      "longitude": -99.1232512
    },
    "logistics": {
      "distanceLabel": "About 3.8 mi",
      "estimatedPaddleTime": "Short Hill Country run when the Medina has enough water; low flows near the 30 cfs floor can turn this into a scrape-prone wade-and-float",
      "shuttle": "Stage Ranger Crossing at Highway 16 first, then return to Peaceful Valley Road. Use only the TRPA-named public road-crossing access anchors and current roadside conditions; do not rely on private banks for shuttle, bailout, or casual stops.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, use only public road crossings or named access points, check USGS 0817887350, downstream USGS 08178880, weather, and recent rain before launching, and obey posted access restrictions.",
      "camping": "Treat this as a day-use route with no public on-route camping selected. TRPA says the only public camping along the Medina River is Pioneer River Resort in Bandera, downstream from this reach, so do not infer legal camps from gravel bars, private banks, road crossings, cabins, or nearby ranch land.",
      "campingClassification": "none",
      "summary": "Launch at Peaceful Valley Road and take out at Ranger Crossing for a 3.8-mile Medina River day trip. Use the Patterson Road gauge, cross-check the Bandera gauge, expect shallow dragging near the 30 cfs floor, and keep stops to lawful public access because most adjacent land is private.",
      "accessCaveats": [
        "TRPA's Google map links resolve to exact access-anchor coordinates for Peaceful Valley Road and Ranger Crossing, but final water entry and exit should follow current signs, road-shoulder conditions, and safe banks rather than a projected mid-channel point.",
        "TRPA says almost all property adjacent to the Medina River is private. Use public road crossings for access and do not treat private banks, cabins, camps, or ranch roads as public stops.",
        "The route was implemented with USGS 0817887350 product-live at 49.6 cfs and downstream USGS 08178880 at 59.0 cfs, above the 30 cfs lower-Medina floor but far below the 300 cfs ideal cue. At similar or lower levels, expect exposed gravel, dragging, and slower travel.",
        "Downstream Bandera-area water-quality cautions on the TRPA page are not the primary evidence for this short reach, but paddlers should still avoid paddling after local runoff or visible contamination."
      ],
      "watchFor": [
        "Flows below about 30 cfs on USGS 0817887350, when the TRPA lower-Medina minimum is not met and dragging over rock or gravel bars is likely.",
        "High or rising water after storms, especially above about 300 cfs where TRPA says more navigation skill is needed and near 2,000 cfs where the route should not be attempted.",
        "Wood, strainers, narrow channels, blind bends, fences or debris after floods, and limited exits between public crossings.",
        "Private-property boundaries, road-crossing traffic, roadside parking limits, heat, sun exposure, and lack of public riverbank camping.",
        "Changing access conditions at small public crossings; if a crossing is posted, unsafe, or blocked, skip the trip rather than inventing a private alternate."
      ]
    },
    "accessPoints": [
      {
        "id": "peaceful-valley-road-crossing",
        "name": "Peaceful Valley Road Crossing",
        "latitude": 29.7439466,
        "longitude": -99.1487218,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "TRPA map-link access anchor and upstream public-road-crossing route point; use current signs and safe bank conditions for the actual water entry."
      },
      {
        "id": "ranger-crossing-highway-16",
        "name": "Ranger Crossing at Highway 16",
        "latitude": 29.7369976,
        "longitude": -99.1232512,
        "mileFromStart": 3.8,
        "segmentKind": "creek",
        "note": "TRPA map-link access anchor and downstream public-road-crossing take-out; confirm current roadside parking and bank conditions on arrival."
      }
    ]
  },
  "medina-river-ranger-crossing-bandera-city-park": {
    "putIn": {
      "id": "ranger-crossing-highway-16",
      "name": "Ranger Crossing at Highway 16",
      "latitude": 29.7369976,
      "longitude": -99.1232512
    },
    "takeOut": {
      "id": "bandera-city-park",
      "name": "Bandera City Park",
      "latitude": 29.72254,
      "longitude": -99.06975
    },
    "logistics": {
      "distanceLabel": "About 5.9 mi",
      "estimatedPaddleTime": "Half-day Bandera-area float when the Medina has enough water; near the 30 cfs lower-Medina floor, expect shallow scraping, dragging, and slower travel",
      "shuttle": "Stage Bandera City Park first during posted park hours, then return to Ranger Crossing at Highway 16. Use the public access anchors and current signs for parking and bank entry, and make the city park the mandatory take-out rather than continuing toward the dam corridor.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, Bandera City Park hours and fee rules, posted access restrictions, USGS 08178880, local weather, recent rain, and Bandera-area water-quality notices before launching.",
      "camping": "No camping at Bandera City Park. Treat this as a day route with nearby-basecamp options only: TRPA says Pioneer River Resort in Bandera is the only public camping along the Medina River, and private banks, gravel bars, road crossings, city park grounds, and nearby ranch land are not legal route camps.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch from Ranger Crossing at Highway 16 and take out at Bandera City Park for a 5.9-mile Medina River day trip. Use the direct Bandera gauge, expect shallow dragging when flows are near today's 56 cfs level, and exit cleanly at the city park before the dam-restricted area.",
      "accessCaveats": [
        "The Ranger Crossing coordinate is a source-backed access anchor shared with the upstream Medina card and corroborated by American Whitewater's Ranger Crossing public-access page; it is not a guessed mid-channel water-entry point.",
        "American Whitewater publishes the Bandera City Park public access coordinate river left upstream of the SH 173 / Main Street bridge. Use posted city-park signs, bank conditions, and the open lower-level parking rules on arrival.",
        "Bandera City Park is open daily from 8 a.m. to 30 minutes before sundown, charges weekend and holiday entry fees, prohibits camping, prohibits swimming near or standing on the dam, and says water entry is from the river bank only.",
        "The route was implemented with USGS 08178880 product-live at 55.8 cfs / 4.26 ft at 2026-08-12 04:45 CDT, above the 30 cfs lower-Medina floor but far below the 300 cfs ideal cue and below American Whitewater's recommended display.",
        "TRPA says almost all adjacent Medina River property is private. Keep stops to lawful public access and do not treat private banks, cabins, ranch roads, or gravel bars as public bailout or camping options."
      ],
      "watchFor": [
        "Flows below about 30 cfs at USGS 08178880, when the TRPA lower-Medina minimum is not met and dragging over rock or gravel bars is likely.",
        "High or rising water after storms, especially above about 300 cfs where TRPA says more navigation skill is needed and near 2,000 cfs where the route should not be attempted.",
        "Low-water crossings, the 6th Street / Schmidtke Road low bridge, the 1st Street / Rugh Hill low bridge, wood, strainers, blind bends, fences, and flood debris.",
        "The mandatory Bandera City Park take-out, park hours, lower-level parking limits, entry fees, dam restrictions, and water-quality or closure notices.",
        "Private-property boundaries, road-crossing traffic, heat, sun exposure, and limited public exits between Ranger Crossing and Bandera City Park."
      ]
    },
    "accessPoints": [
      {
        "id": "ranger-crossing-highway-16",
        "name": "Ranger Crossing at Highway 16",
        "latitude": 29.7369976,
        "longitude": -99.1232512,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Existing Medina-chain access anchor corroborated by American Whitewater's public Ranger Crossing page; use current signs and safe bank conditions for the actual water entry."
      },
      {
        "id": "bandera-city-park",
        "name": "Bandera City Park",
        "latitude": 29.72254,
        "longitude": -99.06975,
        "mileFromStart": 5.9,
        "segmentKind": "creek",
        "note": "American Whitewater public access anchor upstream of the SH 173 / Main Street bridge; this is the mandatory route finish before the dam-restricted area, not permission to continue downstream."
      }
    ]
  },
  "medina-river-bandera-city-park-dam-english-crossing": {
    "putIn": {
      "id": "bandera-city-park-dam",
      "name": "Bandera City Park Dam",
      "latitude": 29.7222995,
      "longitude": -99.0702231
    },
    "takeOut": {
      "id": "english-crossing",
      "name": "English Crossing",
      "latitude": 29.6819834,
      "longitude": -98.9758513
    },
    "logistics": {
      "distanceLabel": "About 12.5 mi",
      "estimatedPaddleTime": "Full day Bandera-area float when the Medina has enough water; near the 30 cfs lower-Medina floor, expect shallow scraping, dragging, and slower travel",
      "shuttle": "Stage a legal take-out vehicle at English Crossing first, then return to Bandera City Park during posted park hours. Treat the Bandera City Park Dam coordinate as an access anchor only: start below the dam where current park rules, signs, and safe river-bank conditions permit, and do not run or stand on the dam.",
      "permits": "No route-specific paddling permit is published. Follow Texas boating and PFD rules, Bandera City Park hours and fee rules, posted access restrictions, USGS 08178880, local weather, recent rain, and Bandera-area water-quality notices before launching.",
      "camping": "Treat this as a long day route with nearby-basecamp options only. Bandera City Park rules prohibit camping, and TRPA says Pioneer River Resort in Bandera is the only public camping along the Medina River; private banks, gravel bars, road crossings, city park grounds, and nearby ranch land are not legal route camps.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch below the Bandera City Park Dam access area and take out at English Crossing for a 12.5-mile downstream Medina River day. Use the direct Bandera gauge, expect shallow dragging near today's 55 cfs level, and keep the city-park dam and private banks out of the paddling plan.",
      "accessCaveats": [
        "TRPA's Bandera City Park Dam and English Crossing map links resolve to source-backed access anchors; they are not guessed mid-channel water-entry points.",
        "Bandera City Park is open daily from 8 a.m. to 30 minutes before sundown, charges weekend and holiday entry fees, prohibits camping, prohibits swimming near or standing on the dam, and says water entry is from the river bank only.",
        "TRPA marks the upstream access with a do-not-run dam warning. Start below the dam only where current city-park rules, signs, and safe bank conditions allow.",
        "The route was implemented with USGS 08178880 product-live at 54.8 cfs / 4.25 ft at 2026-08-12 11:45 CDT, above the 30 cfs lower-Medina floor but far below the 300 cfs ideal cue.",
        "TRPA says almost all adjacent Medina River property is private. Keep stops to lawful public access and do not treat private banks, cabins, ranch roads, or gravel bars as public bailout or camping options."
      ],
      "watchFor": [
        "Flows below about 30 cfs at USGS 08178880, when the TRPA lower-Medina minimum is not met and dragging over rock or gravel bars is likely.",
        "High or rising water after storms, especially above about 300 cfs where TRPA says more navigation skill is needed and near 2,000 cfs where the route should not be attempted.",
        "The Bandera City Park dam, low-water crossings, low bridges, wood, strainers, blind bends, fences, and flood debris.",
        "Long-day pacing, heat, limited legal exits, private-property boundaries, road-crossing traffic, park hours, entry fees, and water-quality or closure notices."
      ]
    },
    "accessPoints": [
      {
        "id": "bandera-city-park-dam",
        "name": "Bandera City Park Dam",
        "latitude": 29.7222995,
        "longitude": -99.0702231,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "TRPA map-link access anchor at the city-park dam area; start only below the dam where posted rules and bank conditions permit, and do not run or stand on the dam."
      },
      {
        "id": "english-crossing",
        "name": "English Crossing",
        "latitude": 29.6819834,
        "longitude": -98.9758513,
        "mileFromStart": 12.5,
        "segmentKind": "creek",
        "note": "TRPA map-link access anchor for the downstream public-road-crossing take-out; confirm current roadside parking and bank conditions on arrival."
      }
    ]
  },
  "brushy-creek-chisholm-trail-red-bud": {
    "putIn": {"id": "brushy-chisholm-trail-crossing", "name": "Chisholm Trail Crossing Park", "latitude": 30.51307, "longitude": -97.68939},
    "takeOut": {"id": "brushy-red-bud-cr122", "name": "Red Bud Lane / CR 122 public access", "latitude": 30.53082, "longitude": -97.61374},
    "logistics": {
      "distanceLabel": "About 5.7 mi",
      "estimatedPaddleTime": "About 2 to 4 hours when the direct gauge is in the documented runnable band; allow extra time for scouting, shallow sections, portage decisions, and urban traffic.",
      "shuttle": "Stage a vehicle at the Red Bud Lane / CR 122 access only after verifying current construction, parking, and bank conditions, then return to Chisholm Trail Crossing Park. Do not use private low-water crossings or improvised shoreline exits.",
      "permits": "No route-specific paddling permit is published. Follow City of Round Rock park rules, Texas boating and PFD requirements, posted construction controls, and current access terms.",
      "camping": "No on-route camping is documented. Treat this as an urban day route and arrange lodging or a separately verified campground; do not camp in city parks, on private banks, or under road bridges.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch below the Chisholm Trail dam at the named city park and take out at the Red Bud Lane / CR 122 public access. Use direct USGS 08105888, recent rain, flash-flood warnings, debris reports, construction notices, and same-day endpoint checks before leaving.",
      "accessCaveats": [
        "Chisholm Trail Crossing Park is a public city park at 500 Chisholm Trail Road; put in below the dam only and do not run or approach the deadly hydraulic described by American Whitewater.",
        "The Red Bud / CR 122 access is a dirt/gravel public access documented by the Brushy Creek RUAA, but current road construction and bank conditions can change. Confirm legal parking and a safe carry before launch.",
        "American Whitewater and the RUAA identify private-property gaps, strainers, shallow riffles, tunnels, and low-water crossing hazards. Do not treat nearby banks, residences, or low-water crossings as public access.",
        "Round Rock and Williamson County trail/road projects may change access or traffic around the corridor; obey barricades and posted closures.",
        "Urban runoff and wastewater influences mean paddlers should avoid contact after heavy rain or any water-quality advisory."
      ],
      "watchFor": [
        "Discharge below about 200 cfs, falling flow, exposed bedrock, scraping, and walking; about 400 cfs is the local fun reference, not a safety guarantee.",
        "Dam hydraulics at Chisholm Trail Crossing, debris in tunnels, strainers, and rapidly rising water after thunderstorms.",
        "Construction, traffic, restricted parking, and a changed or blocked Red Bud Lane / CR 122 exit.",
        "Private banks and the low-water crossing near private property; use only the named endpoints or a clearly lawful emergency location."
      ]
    },
    "accessPoints": [
      {"id": "brushy-chisholm-trail-crossing", "name": "Chisholm Trail Crossing Park", "latitude": 30.51307, "longitude": -97.68939, "mileFromStart": 0, "segmentKind": "creek", "note": "City of Round Rock park and Brushy Creek RUAA access anchor; put in below the dam only."},
      {"id": "brushy-red-bud-cr122", "name": "Red Bud Lane / CR 122 public access", "latitude": 30.53082, "longitude": -97.61374, "mileFromStart": 5.7, "segmentKind": "creek", "note": "Brushy Creek RUAA public dirt/gravel access under Red Bud Lane; verify current construction and parking."}
    ],
    "corridorId": "tx-brushy-creek-chisholm-red-bud",
    "corridorLabel": "Brushy Creek Chisholm Trail to Red Bud",
    "continuityStatus": "verified"
  },
  "colorado-river-fm580-colorado-bend": {
    "putIn": {
      "id": "fm-580-colorado-river",
      "name": "FM 580 Colorado River access",
      "latitude": 31.1004,
      "longitude": -98.5147
    },
    "takeOut": {
      "id": "colorado-bend-state-park-river",
      "name": "Colorado Bend State Park river access",
      "latitude": 31.0183,
      "longitude": -98.4467
    },
    "logistics": {
      "distanceLabel": "About 14.9 mi",
      "estimatedPaddleTime": "About 5 to 9 hours depending on flow, wind, heat, shallow sections, stops, and group pace",
      "shuttle": "Stage the vehicle at Colorado Bend State Park first, then drive back to the FM 580 access near Bend. TPWD describes FM 580 as primitive access without a ramp; inspect the carry and confirm lawful parking before launch.",
      "permits": "Colorado Bend State Park requires the applicable day-use or camping reservation/fee. Follow Texas boating and PFD rules, posted county/park rules, and current access and closure notices before launching.",
      "camping": "Colorado Bend State Park is the documented endpoint campground and requires reservation/fee planning. Do not infer legal camping at private fishing camps, islands, sandbars, or other shoreline between FM 580 and the park.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at the TPWD-listed FM 580 access and paddle the distinct 14.9-mile Bend-to-Colorado Bend State Park reach. Use direct USGS 08147000 with a conservative 100 cfs minimum-only screen, then make a same-day call on weather, rising water, debris, shallow lines, primitive access, and park conditions.",
      "accessCaveats": [
        "TPWD lists FM 580 as primitive kayak/canoe access with no ramp; carry boats carefully and do not treat shoulders, fences, or private banks as public parking or access.",
        "Colorado Bend State Park provides the planned public take-out, launch facilities, camping, and day-use access, but reservations, fees, capacity, road flooding, and closures can change.",
        "The 100 cfs floor is a conservative community planning cue, not a safety certification. Below it expect shallow, rocky, or scrape-prone lines; above it, rising water, debris, and thunderstorms can still make the reach unsafe.",
        "American Whitewater identifies steep canyon banks, light rapids, private camps, and limited public exits. Leave daylight and weather margin and use only named public endpoints or clearly lawful emergency exits.",
        "Do not extend the route beyond Colorado Bend State Park or assume access at private camps and shoreline features."
      ],
      "watchFor": [
        "Flow below about 100 cfs, falling water, exposed rocks, shallow riffles, and scraping.",
        "Rapid rises after storms, debris, strainers, and stronger current around bends or canyon walls.",
        "Primitive FM 580 carry, park reservation/closure status, limited exits, heat, wind, and fading daylight.",
        "Private banks and unverified camps or shoreline landings."
      ]
    },
    "accessPoints": [
      {
        "id": "fm-580-colorado-river",
        "name": "FM 580 Colorado River access",
        "latitude": 31.1004,
        "longitude": -98.5147,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "TPWD-listed free primitive kayak/canoe launch; no ramp and carry required. Verify parking and the water-entry path before launch."
      },
      {
        "id": "colorado-bend-state-park-river",
        "name": "Colorado Bend State Park river access",
        "latitude": 31.0183,
        "longitude": -98.4467,
        "mileFromStart": 14.9,
        "segmentKind": "creek",
        "note": "TPWD-listed park access with easy launch, day-use fee, and camping; reserve and confirm current conditions."
      }
    ],
    "corridorId": "tx-colorado-fm580-colorado-bend",
    "corridorLabel": "Colorado River FM 580 to Colorado Bend State Park",
    "continuityStatus": "verified"
  }
};
