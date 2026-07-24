// State-scoped route data. Keep entries in route-family and downstream order.
import type { RiverTripDetails } from '../../lib/types';

export const pennsylvaniaRiverTripDetails: Record<string, RiverTripDetails> = {
  "susquehanna-river-sayre-towanda": {
    "putIn": {
      "id": "sayre-pfbc",
      "name": "Sayre PFBC access",
      "latitude": 41.988333,
      "longitude": -76.611667
    },
    "takeOut": {
      "id": "towanda-riverfront",
      "name": "Towanda Riverfront Park ramp",
      "latitude": 41.768611,
      "longitude": -76.438611
    },
    "logistics": {
      "distanceLabel": "About 20 mi for the full corridor; choose a shorter segment in the access planner",
      "estimatedPaddleTime": "Long full-day corridor or a shorter access-planner pairing. Sayre-to-Ulster and Hornbrook-to-Towanda are more manageable day choices.",
      "shuttle": "Pick a put-in and take-out from the access planner, stage the downstream vehicle first, then inspect both landings before launching. Do not assume private banks, islands, or bars are legal backup exits.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current PFBC, municipal, campground, boating, and PFD rules.",
      "camping": "Harrigan Island, Hornbrook Park, and nearby campgrounds appear in the official corridor context. Use only currently open legal camping or managed access points, not arbitrary banks.",
      "campingClassification": "on_route_campsite",
      "summary": "Use this as the upper North Branch access-planner corridor. The default full corridor runs from Sayre to Towanda, but many users should choose a shorter segment such as Sayre to Ulster or Hornbrook to Towanda.",
      "accessCaveats": [
        "Use the access planner to choose a legal public or managed access pair before driving.",
        "The full corridor is a long-day planning envelope, not necessarily the recommended casual trip.",
        "Confirm same-day parking, launch, landing, and permit rules at the selected endpoints.",
        "Stay with named accesses and do not improvise on private banks or islands."
      ],
      "watchFor": [
        "Fast riffles, bridge-current zones, and possible strainers in the Section 1 caution miles.",
        "Towanda stages below about 0 to 1 ft, when riffles get scratchier and shallow lines tighten.",
        "Towanda stages above about 4 ft, when current speeds up; PFBC says novice paddlers should stay off above about 5 ft.",
        "Headwind, thunderstorms, floating wood, private shorelines, and overly ambitious segment choices."
      ]
    },
    "accessPoints": [
      {
        "id": "sayre-pfbc",
        "name": "Sayre PFBC access",
        "latitude": 41.988333,
        "longitude": -76.611667,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Upper corridor start and the default put-in."
      },
      {
        "id": "ulster-bridge",
        "name": "Ulster Bridge access",
        "latitude": 41.8525,
        "longitude": -76.497222,
        "mileFromStart": 11.7,
        "segmentKind": "creek",
        "note": "Useful shorter-day finish from Sayre or restart for the Towanda corridor."
      },
      {
        "id": "hornbrook-park",
        "name": "Larnard Hornbrook Park ramp",
        "latitude": 41.809444,
        "longitude": -76.486111,
        "mileFromStart": 15,
        "segmentKind": "creek",
        "note": "Park access for shorter trips around the Towanda corridor."
      },
      {
        "id": "towanda-riverfront",
        "name": "Towanda Riverfront Park ramp",
        "latitude": 41.768611,
        "longitude": -76.438611,
        "mileFromStart": 20,
        "segmentKind": "creek",
        "note": "Default corridor finish and practical split point for upper vs lower Section 1 days."
      }
    ]
  },
  "susquehanna-river-towanda-laceyville": {
    "putIn": {
      "id": "towanda-riverfront",
      "name": "Towanda Riverfront Park ramp",
      "latitude": 41.768611,
      "longitude": -76.438611
    },
    "takeOut": {
      "id": "laceyville-borough",
      "name": "Laceyville Borough access",
      "latitude": 41.648889,
      "longitude": -76.161111
    },
    "logistics": {
      "distanceLabel": "About 29 mi for the full corridor; choose a shorter segment in the access planner",
      "estimatedPaddleTime": "Long full-day corridor or a shorter access-planner pairing. Towanda-to-Terrytown and Terrytown-to-Laceyville are more manageable day choices.",
      "shuttle": "Pick a put-in and take-out from the access planner, stage the downstream vehicle first, then inspect both landings before launching. Do not assume private banks, islands, or bars are legal backup exits.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current PFBC, municipal, campground, boating, and PFD rules.",
      "camping": "Riverside Acres, French Azilum, and nearby campgrounds appear in the official corridor context. Use only currently open legal camping or managed access points, not arbitrary banks.",
      "campingClassification": "on_route_campsite",
      "summary": "Use this as the lower Section 1 North Branch access-planner corridor. The default full corridor runs from Towanda to Laceyville, but many users should choose a shorter segment such as Towanda to Terrytown or Terrytown to Laceyville.",
      "accessCaveats": [
        "Use the access planner to choose a legal public or managed access pair before driving.",
        "The full corridor is a long-day planning envelope, not necessarily the recommended casual trip.",
        "Confirm same-day parking, launch, landing, and permit rules at the selected endpoints.",
        "Stay with named accesses and do not improvise on private banks or islands."
      ],
      "watchFor": [
        "Fast riffles, bridge-current zones, and possible strainers in the lower Section 1 caution miles.",
        "Towanda stages below about 0 to 1 ft, when riffles get scratchier and shallow lines tighten.",
        "Towanda stages above about 4 ft, when current speeds up; PFBC says novice paddlers should stay off above about 5 ft.",
        "Headwind, thunderstorms, floating wood, private shorelines, and overly ambitious segment choices."
      ]
    },
    "accessPoints": [
      {
        "id": "towanda-riverfront",
        "name": "Towanda Riverfront Park ramp",
        "latitude": 41.768611,
        "longitude": -76.438611,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default corridor put-in and practical split point from the upper Section 1 route."
      },
      {
        "id": "wysox-township-park",
        "name": "Wysox Township Park access",
        "latitude": 41.770833,
        "longitude": -76.397778,
        "mileFromStart": 3,
        "segmentKind": "creek",
        "note": "Downstream park access for Towanda-area variants."
      },
      {
        "id": "terrytown-pfbc",
        "name": "Terrytown PFBC ramp",
        "latitude": 41.714167,
        "longitude": -76.281667,
        "mileFromStart": 16,
        "segmentKind": "creek",
        "note": "PFBC landing for lower Section 1 trips."
      },
      {
        "id": "laceyville-borough",
        "name": "Laceyville Borough access",
        "latitude": 41.648889,
        "longitude": -76.161111,
        "mileFromStart": 29,
        "segmentKind": "creek",
        "note": "Default corridor finish and handoff to the Section 2 corridor."
      }
    ]
  },
  "susquehanna-river-laceyville-west-falls": {
    "putIn": {
      "id": "laceyville-borough",
      "name": "Laceyville Borough access",
      "latitude": 41.648889,
      "longitude": -76.161111
    },
    "takeOut": {
      "id": "west-falls-pfbc",
      "name": "PFBC West Falls access",
      "latitude": 41.459444,
      "longitude": -75.853611
    },
    "logistics": {
      "distanceLabel": "About 33 mi for the full corridor; choose a shorter segment in the access planner",
      "estimatedPaddleTime": "Full corridor is a multi-day or staged-series route. Common day choices include Laceyville to Meshoppen, Tunkhannock to White's Ferry, and White's Ferry to West Falls.",
      "shuttle": "Pick a put-in and take-out from the access planner, stage the downstream vehicle first, then inspect both landings before launching. Do not assume private banks, islands, or bars are legal backup exits.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current PFBC, municipal, campground, boating, and PFD rules.",
      "camping": "Treat this as a staged day-trip corridor unless you have current legal campground or overnight arrangements. Do not treat islands or private banks as open camping.",
      "campingClassification": "nearby_basecamp",
      "summary": "Use this as the Wyoming County North Branch access-planner corridor. The default full corridor runs from Laceyville to West Falls, but most users should choose a shorter access pair around Meshoppen or Tunkhannock.",
      "accessCaveats": [
        "Use the access planner to choose a legal public or managed access pair before driving.",
        "The full corridor is a planning envelope, not necessarily the recommended one-day trip.",
        "Confirm same-day parking, launch, landing, and permit rules at the selected endpoints.",
        "Stay with named accesses and do not improvise on private banks or islands."
      ],
      "watchFor": [
        "Boulder fields and fast riffles around the Tunkhannock-to-West-Falls section.",
        "Meshoppen readings near the low edge, when shallow lines and exposed rocks become more consequential.",
        "Meshoppen readings around 12 ft and up, when this model turns conservative for novice paddlers.",
        "Broad-river wind, thunderstorms, floating wood, muddy landings, and overlong segment choices."
      ]
    },
    "accessPoints": [
      {
        "id": "laceyville-borough",
        "name": "Laceyville Borough access",
        "latitude": 41.648889,
        "longitude": -76.161111,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default corridor put-in and Section 1 handoff point."
      },
      {
        "id": "meshoppen",
        "name": "Meshoppen ramp",
        "latitude": 41.613333,
        "longitude": -76.046667,
        "mileFromStart": 8,
        "segmentKind": "creek",
        "note": "Shorter-day finish from Laceyville and the closest named access to the Meshoppen gauge model."
      },
      {
        "id": "tunkhannock-pfbc",
        "name": "PFBC Tunkhannock access",
        "latitude": 41.522222,
        "longitude": -75.941389,
        "mileFromStart": 23,
        "segmentKind": "creek",
        "note": "Primary restart for the lower Section 2 riffle corridor."
      },
      {
        "id": "whites-ferry-pfbc",
        "name": "PFBC White's Ferry access",
        "latitude": 41.475833,
        "longitude": -75.905,
        "mileFromStart": 29,
        "segmentKind": "creek",
        "note": "Shorter lower-corridor take-out or restart before West Falls."
      },
      {
        "id": "west-falls-pfbc",
        "name": "PFBC West Falls access",
        "latitude": 41.459444,
        "longitude": -75.853611,
        "mileFromStart": 33,
        "segmentKind": "creek",
        "note": "Default corridor finish."
      }
    ]
  },
  "susquehanna-river-canal-park-wetlands": {
    "putIn": {
      "name": "Canal Park access",
      "latitude": 41.22,
      "longitude": -76.018611
    },
    "takeOut": {
      "name": "Wetlands Nature Area access",
      "latitude": 41.089444,
      "longitude": -76.1225
    },
    "logistics": {
      "distanceLabel": "About 14 mi",
      "estimatedPaddleTime": "About 5 hr to 7 hr in ordinary conditions, longer with headwind, lower-water line picking, or extra care around the early rapid and the primitive Wetlands finish",
      "shuttle": "Stage the take-out at Wetlands Nature Area first, then drive back to Canal Park in West Nanticoke. Inspect both accesses before launching because broad-river mud, current, or same-day maintenance can change the practical landing feel.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current PFBC, park, boating, and PFD rules.",
      "camping": "Treat this as a day trip. The official PFBC Section 3 guide says camping on this river corridor is none, and banks away from the named public accesses may be private.",
      "campingClassification": "none",
      "summary": "Launch at Canal Park and take out at Wetlands Nature Area for a full upper Section 3 Susquehanna day. Use the Wilkes-Barre stage gauge, keep the easiest planning days around 2 to 4 feet there, and make the mile-180 rapid your first same-day hazard check.",
      "accessCaveats": [
        "PFBC Section 3 publishes both Canal Park and Wetlands Nature Area coordinates directly in the official access table.",
        "Canal Park is a primitive access on a gravel path and Wetlands is a primitive river-right finish. Confirm same-day footing, parking, and bank angle at both ends before leaving vehicles.",
        "This route has more committed mileage than the shorter Section 3 slugs. Once you leave the Nanticoke corridor, broad-river wind and a thin exit network can matter more than the flat profile suggests.",
        "Stay with the named public accesses rather than using islands or private banks as casual substitutes."
      ],
      "watchFor": [
        "A long class I-II rapid on river right about one-half mile downstream from the Nanticoke bridge, flagged by PFBC at mile 180.",
        "Wilkes-Barre stages below about -0.5 ft, when the broad channel gets scratchier and more technical around shallow bars and inside lines.",
        "Wilkes-Barre stages above about 4 feet, when current speeds up noticeably; PFBC says novice paddlers should stay off above about 5 feet.",
        "Headwind, thunderstorms, floating wood, private shorelines, and muddy footing at the primitive Wetlands finish after a long exposed day."
      ]
    }
  },
  "susquehanna-river-canal-park-test-track": {
    "putIn": {
      "id": "canal-park",
      "name": "Canal Park access",
      "latitude": 41.22,
      "longitude": -76.018611
    },
    "takeOut": {
      "id": "test-track-park",
      "name": "Test Track Park",
      "latitude": 41.04,
      "longitude": -76.261111
    },
    "logistics": {
      "distanceLabel": "About 22 mi for the full corridor; choose a shorter segment in the access planner",
      "estimatedPaddleTime": "Full corridor is a long exposed day for experienced groups. Shorter planner choices include Canal Park to Union Township, Union Township to Wetlands, and Wetlands to Test Track.",
      "shuttle": "Pick a put-in and take-out from the access planner, stage the downstream vehicle first, then inspect both landings before launching. Do not assume private banks, islands, or bars are legal backup exits.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current PFBC, municipal, campground, boating, and PFD rules.",
      "camping": "Treat this as a day-trip corridor. The official PFBC Section 3 guide says camping on this river corridor is none, and banks away from named public accesses may be private.",
      "campingClassification": "none",
      "summary": "Use this as the Section 3 North Branch access-planner corridor. The default full corridor runs from Canal Park to Test Track, but most users should choose a shorter access pair around Union Township or Wetlands Nature Area.",
      "accessCaveats": [
        "Use the access planner to choose a legal public or managed access pair before driving.",
        "The full corridor is a planning envelope, not necessarily the recommended one-day trip.",
        "Confirm same-day parking, launch, landing, and permit rules at the selected endpoints.",
        "Stay with named accesses and do not improvise on private banks or islands."
      ],
      "watchFor": [
        "The class I-II rapid below the Nanticoke bridge and the Berwick-Nescopeck low-water ledge warning.",
        "Wilkes-Barre stages below about 0 ft, when shallow lines get scratchier.",
        "Wilkes-Barre stages above about 4 ft, when current speeds up; PFBC says novices should stay off above about 5 ft.",
        "Headwind, thunderstorms, floating wood, private shorelines, and overlong segment choices."
      ]
    },
    "accessPoints": [
      {
        "id": "canal-park",
        "name": "Canal Park access",
        "latitude": 41.22,
        "longitude": -76.018611,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default corridor put-in and primitive upper Section 3 access."
      },
      {
        "id": "pfbc-union-township",
        "name": "PFBC Union Township ramp",
        "latitude": 41.177778,
        "longitude": -76.111389,
        "mileFromStart": 6,
        "segmentKind": "creek",
        "note": "Shorter-day take-out or restart below the Nanticoke rapid area."
      },
      {
        "id": "wetlands-nature-area",
        "name": "Wetlands Nature Area access",
        "latitude": 41.089444,
        "longitude": -76.1225,
        "mileFromStart": 14,
        "segmentKind": "creek",
        "note": "Mid-corridor access for the lower Berwick/Test Track segment."
      },
      {
        "id": "test-track-park",
        "name": "Test Track Park",
        "latitude": 41.04,
        "longitude": -76.261111,
        "mileFromStart": 22,
        "segmentKind": "creek",
        "note": "Default corridor finish and handoff to the Bloomsburg/Danville corridor."
      }
    ]
  },
  "susquehanna-river-test-track-danville": {
    "putIn": {
      "id": "test-track-park",
      "name": "Test Track Park",
      "latitude": 41.04,
      "longitude": -76.261111
    },
    "takeOut": {
      "id": "pfbc-danville",
      "name": "PFBC Danville Access",
      "latitude": 40.94349,
      "longitude": -76.598507
    },
    "logistics": {
      "distanceLabel": "About 20 mi for the full corridor; choose a shorter segment in the access planner",
      "estimatedPaddleTime": "Full corridor is a long exposed day. Common shorter choices include Test Track to Bloomsburg, Bloomsburg to Indian Head, and Indian Head to Danville.",
      "shuttle": "Pick a put-in and take-out from the access planner, stage the downstream vehicle first, then inspect both landings before launching. Do not assume private banks, islands, or bars are legal backup exits.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current PFBC, municipal, campground, boating, and PFD rules.",
      "camping": "Indian Head Campground can support legal overnight use with a reservation or permission, but this corridor should not imply open riverbank camping.",
      "campingClassification": "endpoint_campground",
      "summary": "Use this as the Section 4 North Branch access-planner corridor. The default full corridor runs from Test Track to Danville, but most users should choose a shorter access pair around Bloomsburg or Indian Head.",
      "accessCaveats": [
        "Use the access planner to choose a legal public or managed access pair before driving.",
        "The full corridor is a planning envelope, not necessarily the recommended one-day trip.",
        "Confirm same-day parking, launch, landing, and permit rules at the selected endpoints.",
        "Stay with named accesses and do not improvise on private banks or islands."
      ],
      "watchFor": [
        "The Berwick bridge ledge warning near low water and faster current above the calmer Bloomsburg band.",
        "Bloomsburg stages below about 1 ft, when low-water line picking becomes more important.",
        "Bloomsburg stages above about 4 to 5 ft, when current speeds up; PFBC says novices should stay off above about 6 ft.",
        "Headwind, thunderstorms, floating wood, managed campground rules, and overlong segment choices."
      ]
    },
    "accessPoints": [
      {
        "id": "test-track-park",
        "name": "Test Track Park",
        "latitude": 41.04,
        "longitude": -76.261111,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default corridor put-in and Section 3 handoff point."
      },
      {
        "id": "pfbc-bloomsburg",
        "name": "PFBC Bloomsburg Access",
        "latitude": 40.996944,
        "longitude": -76.432222,
        "mileFromStart": 9,
        "segmentKind": "creek",
        "note": "Primary split point for shorter Section 4 days."
      },
      {
        "id": "indian-head-campground",
        "name": "Indian Head Campground",
        "latitude": 40.956944,
        "longitude": -76.491389,
        "mileFromStart": 12,
        "segmentKind": "creek",
        "note": "Managed campground access; confirm current launch and parking expectations."
      },
      {
        "id": "pfbc-danville",
        "name": "PFBC Danville Access",
        "latitude": 40.94349,
        "longitude": -76.598507,
        "mileFromStart": 20,
        "segmentKind": "creek",
        "note": "Default corridor finish and handoff to the Shikellamy corridor."
      }
    ]
  },
  "susquehanna-river-pfbc-danville-wrays": {
    "putIn": {
      "name": "PFBC Danville Access",
      "latitude": 40.94349,
      "longitude": -76.598507
    },
    "takeOut": {
      "name": "Wray's Riverfront Campground",
      "latitude": 40.953143,
      "longitude": -76.664439
    },
    "logistics": {
      "distanceLabel": "About 4 mi",
      "estimatedPaddleTime": "About 1.5 hr to 3 hr in ordinary conditions, longer with headwind or a relaxed campground finish",
      "shuttle": "Stage the take-out at Wray's first, then drive back to the PFBC Danville ramp. Confirm same-day campground access expectations before launching if your group is using the site as a take-out without staying there.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current PFBC, campground, boating, and PFD rules.",
      "camping": "Wray's Riverfront Campground is a named endpoint campground in the current North Branch guide and can support a legal overnight finish if you have a reservation or permission.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at the PFBC Danville ramp and finish at Wray's Riverfront Campground for a short lower-Susquehanna link. Use the direct Danville stage gauge, keep the easiest planning days around 2 to 4 feet there, and treat the campground finish as managed private property rather than a casual public bank.",
      "accessCaveats": [
        "The current 2021 North Branch guide publishes both PFBC Danville and Wray's coordinates directly in the official access table.",
        "Wray's is a named water-trail access but still a private campground. Respect current staff instructions, parking rules, launch boundaries, and any reservation expectations.",
        "The river is broad and can feel slower than it is. Headwind can erase much of the short-mileage advantage on an exposed day.",
        "Stay with the named accesses and do not improvise on private banks or islands between Danville and the campground finish."
      ],
      "watchFor": [
        "Danville stages below about 2 feet, when the route becomes scratchier and less forgiving despite its short length.",
        "Danville stages above about 4 feet, when current speeds up and the simple campground finish becomes more time-sensitive for less experienced groups.",
        "Headwind, thunderstorms, floating wood, and managed-property expectations at the private campground take-out."
      ]
    }
  },
  "susquehanna-river-wrays-shikellamy-west": {
    "putIn": {
      "name": "Wray's Riverfront Campground",
      "latitude": 40.953143,
      "longitude": -76.664439
    },
    "takeOut": {
      "name": "Shikellamy State Park West",
      "latitude": 40.883406,
      "longitude": -76.79251
    },
    "logistics": {
      "distanceLabel": "About 9 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr in ordinary conditions, longer with wind on Lake Augusta or a busy state-park finish",
      "shuttle": "Stage the take-out at Shikellamy State Park West first, then drive back to Wray's. Confirm both the campground launch expectations and the state-park landing conditions before launching because the lower miles feel bigger when wind or boat traffic builds.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current PFBC, campground, state-park, boating, and PFD rules.",
      "camping": "Wray's can support an overnight start if you have a reservation or permission, but this route should still be planned as a same-day finish at Shikellamy rather than as open riverbank camping.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch from Wray's Riverfront Campground and finish at Shikellamy State Park West for a lower Section 14 Susquehanna day. Use the Danville gauge as the official same-section proxy, keep the easiest planning days around 2 to 4 feet there, and treat Lake Augusta wind plus Fabridam take-out discipline as the decisive safety checks.",
      "accessCaveats": [
        "The current guide publishes both Wray's and Shikellamy West coordinates directly in the access table.",
        "This route uses Danville as a same-section proxy because the current guide writes Section 14 thresholds around that gauge rather than around a lower-lake site.",
        "Wray's remains a managed private campground even though it is listed in the water-trail guide. Respect current launch and parking rules.",
        "Shikellamy West is the intended finish. Do not drift downstream toward Sunbury unless you have a separate portage and access plan for the Fabridam corridor."
      ],
      "watchFor": [
        "Danville stages below about 2 feet, when the lower pool loses current help and wind matters more.",
        "Danville stages above about 4 feet, when the broad river carries more speed and less experienced groups have less time to recover from missed landings.",
        "Lake Augusta wind and powerboat wakes, floating wood, private shorelines, and the downstream Sunbury Fabridam hazard if you miss the planned take-out."
      ]
    }
  },
  "susquehanna-river-pfbc-danville-shikellamy-west": {
    "putIn": {
      "id": "pfbc-danville",
      "name": "PFBC Danville Access",
      "latitude": 40.94349,
      "longitude": -76.598507
    },
    "takeOut": {
      "id": "shikellamy-west",
      "name": "Shikellamy State Park West",
      "latitude": 40.883406,
      "longitude": -76.79251
    },
    "logistics": {
      "distanceLabel": "About 13 mi for the full corridor; Wray's is an intermediate access-planner option",
      "estimatedPaddleTime": "About 4 hr to 6 hr for the full corridor in ordinary conditions. Shorter planner choices can use Wray's with current campground permission or reservation expectations.",
      "shuttle": "Pick a put-in and take-out from the access planner, stage the downstream vehicle first, then inspect both landings before launching. Do not assume private banks, islands, or bars are legal backup exits.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current PFBC, municipal, campground, boating, and PFD rules.",
      "camping": "Wray's Riverfront Campground can support legal overnight use with a reservation or permission, but the route should not imply open riverbank camping.",
      "campingClassification": "endpoint_campground",
      "summary": "Use this as the lower Danville-to-Shikellamy access-planner corridor. The default full route finishes at Shikellamy West; Wray's can shorten the day when current campground access rules support it.",
      "accessCaveats": [
        "Use the access planner to choose a legal public or managed access pair before driving.",
        "The full corridor is a planning envelope, not necessarily the recommended one-day trip.",
        "Confirm same-day parking, launch, landing, and permit rules at the selected endpoints.",
        "Stay with named accesses and do not improvise on private banks or islands."
      ],
      "watchFor": [
        "Danville stages below about 2 ft, when the lower corridor gets slower, scratchier, and more exposed to wind.",
        "Danville stages above about 4 ft, when current speeds up; the guide frames about 7 ft as the novice ceiling.",
        "Wind and motorboat wakes on Lake Augusta, floating wood, private shorelines, and drifting too far toward Sunbury Fabridam.",
        "Managed campground expectations at Wray's if using it as an alternate start or finish."
      ]
    },
    "accessPoints": [
      {
        "id": "pfbc-danville",
        "name": "PFBC Danville Access",
        "latitude": 40.94349,
        "longitude": -76.598507,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default corridor put-in."
      },
      {
        "id": "wrays-riverfront",
        "name": "Wray's Riverfront Campground",
        "latitude": 40.953143,
        "longitude": -76.664439,
        "mileFromStart": 4.3,
        "segmentKind": "creek",
        "note": "Managed campground access; confirm current launch or landing expectations."
      },
      {
        "id": "shikellamy-west",
        "name": "Shikellamy State Park West",
        "latitude": 40.883406,
        "longitude": -76.79251,
        "mileFromStart": 12.8,
        "segmentKind": "creek",
        "note": "Default corridor finish before the downstream Fabridam corridor."
      }
    ]
  },
  "youghiogheny-river-lower-yough-ohiopyle-bruner-run": {
    "putIn": {
      "id": "ohiopyle-state-park-lower-yough-launch",
      "name": "Ohiopyle State Park Lower Yough launch",
      "latitude": 39.866528,
      "longitude": -79.493395
    },
    "takeOut": {
      "id": "bruner-run-takeout",
      "name": "Bruner Run Take-out",
      "latitude": 39.926672,
      "longitude": -79.487236
    },
    "logistics": {
      "distanceLabel": "About 7 to 7.2 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr for qualified whitewater groups, longer with scouting, portages, crowds, or high-water spacing",
      "shuttle": "Stage the take-out plan around Bruner Run and Old Mitchell Place before launching. DCNR says the Bruner gate is open weekdays, while American Whitewater notes that during weekend permit season boaters commonly take out at Bruner Run and use the park shuttle to Old Mitchell Place. Confirm the current launch-ticket, shuttle, gate, and parking setup with Ohiopyle State Park before leaving vehicles.",
      "permits": "DCNR says Lower Yough boaters must obtain a launch ticket between the second weekend in April and Columbus Day. PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current DCNR, PFBC, park, PFD, helmet, and whitewater rules.",
      "camping": "Treat this as a managed daylight whitewater day run inside Ohiopyle State Park. Do not camp, stage, or park outside posted state-park areas, and leave enough daylight for the take-out shuttle or road access plan.",
      "summary": "Launch below Ohiopyle Falls at the state-park Lower Yough launch and take out at Bruner Run for the classic Lower Yough whitewater run. Use the Ohiopyle USGS stage gauge and current park rules, and skip the route when the water, weather, access status, or group skill is not clearly right.",
      "accessCaveats": [
        "This route starts below Ohiopyle Falls; running the falls has separate DCNR access rules and is not part of the normal route recommendation.",
        "Launch tickets are required during the DCNR managed season. Weekend and holiday launch tickets carry a fee, and current shuttle/gate operations can affect how you retrieve boats and vehicles.",
        "The put-in and take-out coordinates are American Whitewater feature coordinates cross-checked against DCNR route names, not a DCNR coordinate table. Use current state-park signs and staff instructions on arrival.",
        "Bruner Run access has had construction and closure history. Check current Ohiopyle State Park notices before assuming the take-out road, shuttle, or lower loading area is open.",
        "Only whitewater-suitable craft belong on this route. DCNR says inexperienced whitewater boaters should use qualified guides, and all boaters must follow DCNR whitewater rules."
      ],
      "watchFor": [
        "Class III-IV rapids, including Entrance, Cucumber, Railroad, Dimple, Swimmers, Schoolhouse, River End, and Bruner Run.",
        "Dimple Rock and other undercut or entrapment hazards, ledges, hydraulics, pin rocks, swift current, and cold swims.",
        "Low water near the bottom of the AW range, where rocks and pins become more exposed, and high water above about 4 ft where hydraulics and pushier current increase.",
        "Water at or above about 7 ft on the Ohiopyle gauge, which AW classifies as high to extremely high Class IV-V and outside this general recommendation.",
        "Crowded commercial/private traffic, limited eddies, group separation, bridge and trail spectators near Ohiopyle, storms, release changes, and missing the Bruner Run take-out."
      ]
    }
  },
  "yellow-breeches-creek-simpson-park-lower-allen-community-park": {
    "putIn": {
      "name": "Simpson Park launch",
      "latitude": 40.164151,
      "longitude": -76.976192
    },
    "takeOut": {
      "name": "Lower Allen Community Park launch",
      "latitude": 40.172373,
      "longitude": -76.913787
    },
    "logistics": {
      "distanceLabel": "About 4.7 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr 30 min depending on depth, wood, and how much scraping or scouting the creek needs that day",
      "shuttle": "Stage the take-out at Lower Allen Community Park before driving back to Simpson Park. Inspect both township launches first because low water, mud, or recent storm cleanup can change the easiest carry line.",
      "permits": "No route-specific paddling permit is known for these township-park launches. Follow current township, boating, and PFD rules. If you extend to PFBC launches on a different plan, those separate access points may require registration or a PFBC/state-park launch permit.",
      "camping": "Lower Allen Community Park offers camping by reservation at the take-out. Treat that as endpoint campground support only and not as permission to camp elsewhere on the creek corridor.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Simpson Park and take out at Lower Allen Community Park for a short-to-medium Yellow Breeches day. Use the Camp Hill gauge as the county-endorsed same-creek proxy and expect scraping or slower lines when it sits below the recommended 1.4-foot floor.",
      "accessCaveats": [
        "Cumberland County still publishes both endpoints as official Yellow Breeches access points with exact coordinates on the county story map.",
        "The county recommends boating when the Camp Hill gauge reads about 1.4 to 2.0 feet. This route was reviewed when the proxy gauge was 1.38 feet at 2026-07-10 08:13 EDT, so low-water dragging is a real possibility.",
        "The county currently warns of a full blockage above B7 and recommends B6 as the downstream finish there. Treat this route as a self-contained upper-middle segment rather than a casual continuation downstream.",
        "Trail use is limited to daylight hours and the county asks paddlers to respect private property not designated for public use."
      ],
      "watchFor": [
        "Scraping, shallow riffles, and slow progress when the Camp Hill gauge is near or below 1.4 ft.",
        "Fresh wood, strainers, overhanging limbs, and muddy banks after thunderstorms.",
        "Quicker current and more debris once the creek rises toward the 6 ft action stage, even if the short route still looks tame from shore.",
        "Private banks and limited legal bailout choices away from the named public launches."
      ]
    }
  },
  "yellow-breeches-creek-lower-allen-community-park-liberty-forge": {
    "putIn": {
      "name": "Lower Allen Community Park launch",
      "latitude": 40.172373,
      "longitude": -76.913787
    },
    "takeOut": {
      "name": "Liberty Forge bridge access",
      "latitude": 40.177495,
      "longitude": -76.924172
    },
    "logistics": {
      "distanceLabel": "About 0.8 mi",
      "estimatedPaddleTime": "About 20 min to 45 min depending on depth, wood, and how quickly you clear the bridge-side finish",
      "shuttle": "Stage the take-out at Liberty Forge before driving back to Lower Allen Community Park. Inspect the bridge-access pull-off first because parking is limited and same-day resort activity can affect the simplest finish.",
      "permits": "No route-specific paddling permit is known for this park-to-bridge connector. Follow current township, boating, and PFD rules, and obey any posted public-access instructions at Liberty Forge.",
      "camping": "Lower Allen Community Park offers camping by reservation at the put-in. Treat that as endpoint campground support only and not as permission to camp elsewhere on the creek corridor.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Lower Allen Community Park and take out at the public Liberty Forge bridge access for a short Yellow Breeches connector. Use the Camp Hill gauge as the county-endorsed same-creek proxy and keep the day conservative when the creek is below the recommended floor.",
      "accessCaveats": [
        "Cumberland County still publishes both endpoints as official Yellow Breeches access points with exact coordinates on the county story map.",
        "The county story map says the public may access the creek for boating at the Old Forge Road bridge at Liberty Forge and should follow posted access rules; it also asks paddlers to limit parking to individuals and small groups only.",
        "The county recommends boating when the Camp Hill gauge reads about 1.4 to 2.0 feet. This route was reviewed when the proxy gauge was 1.12 feet at 2026-07-14 00:45 EDT, so expect scrape-prone shallows and possible dragging.",
        "The current county advisory flags a full blockage above B7 farther downstream, so do not assume a safe continuation beyond the intended take-out."
      ],
      "watchFor": [
        "Scraping, shallow bends, and slower travel when the Camp Hill gauge is near or below 1.4 ft.",
        "Fresh wood, small strainers, slippery banks, and bridge-area current at the Liberty Forge finish.",
        "Fast rises and more debris after thunderstorms on a creek that can change quickly despite its short mileage.",
        "Private banks and limited legal bailout choices away from the named public launches."
      ]
    }
  },
  "yellow-breeches-creek-mccormick-park-liberty-forge": {
    "putIn": {
      "name": "McCormick Park launch",
      "latitude": 40.165436,
      "longitude": -76.95508
    },
    "takeOut": {
      "name": "Liberty Forge bridge access",
      "latitude": 40.177495,
      "longitude": -76.924172
    },
    "logistics": {
      "distanceLabel": "About 4.1 mi",
      "estimatedPaddleTime": "About 1 hr 45 min to 3 hr depending on depth, wood, and how careful the bridge-side finish feels on the day",
      "shuttle": "Stage the take-out at Liberty Forge before driving back to McCormick Park. Inspect the Old Forge Road bridge-access area first because parking is limited and same-day resort activity can affect the simplest finish.",
      "permits": "No route-specific paddling permit is known for this park-to-bridge segment. Follow current township, boating, and PFD rules, and obey any posted public-access instructions at Liberty Forge.",
      "camping": "Lower Allen Community Park sits on this official corridor and offers camping by reservation, but it is an on-route support option rather than part of the normal route finish.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at McCormick Park and take out at the public Liberty Forge bridge access for a short Yellow Breeches float. Use the Camp Hill gauge as the county-endorsed same-creek proxy and keep the day conservative when the creek is below the recommended floor.",
      "accessCaveats": [
        "Cumberland County still publishes both endpoints as official Yellow Breeches access points with exact coordinates on the county story map.",
        "The county story map says the public may access the creek for boating at the Old Forge Road bridge at Liberty Forge and should follow posted access rules; it also asks paddlers to limit parking to individuals and small groups only.",
        "The county recommends boating when the Camp Hill gauge reads about 1.4 to 2.0 feet. This route was reviewed when the proxy gauge was 1.38 feet at 2026-07-10 08:13 EDT, so expect scrape-prone shallows.",
        "The current county advisory flags a full blockage above B7 farther downstream, so do not assume a safe continuation beyond the intended take-out."
      ],
      "watchFor": [
        "Scraping, shallow bends, and slower travel when the Camp Hill gauge is near or below 1.4 ft.",
        "Fresh wood, small strainers, slippery banks, and bridge-area current at the Liberty Forge finish.",
        "Fast rises and more debris after thunderstorms on a creek that can change quickly despite its short mileage.",
        "Private banks and drifting past the intended bridge-side public finish into less clear access context."
      ]
    }
  },
  "yellow-breeches-creek-lower-allen-community-park-yellow-breeches-park": {
    "putIn": {
      "name": "Lower Allen Community Park launch",
      "latitude": 40.172373,
      "longitude": -76.913787
    },
    "takeOut": {
      "name": "Yellow Breeches Park launch",
      "latitude": 40.183811,
      "longitude": -76.912682
    },
    "logistics": {
      "distanceLabel": "About 2.4 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr depending on depth, wood, and how much low-water line picking is needed",
      "shuttle": "Stage the take-out at Yellow Breeches Park before driving back to Lower Allen Community Park. Inspect the Sheepford Road finish first because informal roadside parking and muddy footing can change the feel quickly after rain.",
      "permits": "No route-specific paddling permit is known for these township launches. Follow current township, boating, and PFD rules, and do not assume the route should continue downstream into the posted B7 hazard area.",
      "camping": "Lower Allen Community Park offers camping by reservation at the put-in. Treat that as endpoint campground support only and not as permission to camp elsewhere on the creek corridor.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Lower Allen Community Park and take out at Yellow Breeches Park for a short lower-middle Yellow Breeches float. This route intentionally ends at B6 because the county currently recommends B6 as the safe downstream finish above the posted blockage near B7.",
      "accessCaveats": [
        "Cumberland County still publishes both endpoints as official Yellow Breeches access points with exact coordinates on the county story map.",
        "The county currently warns that a large fallen tree and logjam completely block the creek upstream of Slate Hill Road and specifically recommends B6 Yellow Breeches Park to avoid the hazard.",
        "The county recommends boating when the Camp Hill gauge reads about 1.4 to 2.0 feet. This route was reviewed when the proxy gauge was 1.38 feet at 2026-07-10 08:13 EDT, so low-water scraping is likely.",
        "Trail use is limited to daylight hours and the county asks paddlers to respect private property not designated for public use."
      ],
      "watchFor": [
        "Scraping, shallow lines, and slower travel when the Camp Hill gauge is near or below 1.4 ft.",
        "Fresh wood, strainers, and muddy footing at the informal Yellow Breeches Park finish after storms.",
        "The posted downstream blockage and the B7 dam-portage area; do not drift past the intended B6 take-out assuming the lower trail is clear.",
        "Private banks and limited legal bailout choices away from the named public launches."
      ]
    }
  },
  "yellow-breeches-creek-simpson-park-liberty-forge": {
    "putIn": {
      "name": "Simpson Park launch",
      "latitude": 40.164151,
      "longitude": -76.976192
    },
    "takeOut": {
      "name": "Liberty Forge bridge access",
      "latitude": 40.177495,
      "longitude": -76.924172
    },
    "logistics": {
      "distanceLabel": "About 5.2 mi",
      "estimatedPaddleTime": "About 2 hr 15 min to 4 hr depending on depth, wood, and how much scraping or scouting the creek needs that day",
      "shuttle": "Stage the take-out at Liberty Forge before driving back to Simpson Park. Inspect the Old Forge Road bridge-access area first because parking is limited and same-day resort activity can affect the simplest finish.",
      "permits": "No route-specific paddling permit is known for this township-to-bridge route. Follow current township, boating, and PFD rules, and obey any posted public-access instructions at Liberty Forge.",
      "camping": "Lower Allen Community Park sits on the official corridor and offers camping by reservation, but it is an on-route support option rather than part of the normal route finish.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Simpson Park and take out at the public Liberty Forge bridge access for a longer upper-middle Yellow Breeches day. Use the Camp Hill gauge as the county-endorsed same-creek proxy and keep the day conservative when it sits below the recommended 1.4-foot floor.",
      "accessCaveats": [
        "Cumberland County still publishes both endpoints as official Yellow Breeches access points with exact coordinates on the county story map.",
        "The county story map says the public may access the creek for boating at the Old Forge Road bridge at Liberty Forge and should follow posted access rules; it also asks paddlers to limit parking to individuals and small groups only.",
        "The county recommends boating when the Camp Hill gauge reads about 1.4 to 2.0 feet. This route was reviewed when the proxy gauge was 1.26 feet at 2026-07-10 23:45 EDT, so expect repeated scraping and slower travel.",
        "The current county advisory flags a full blockage above B7 farther downstream, so do not assume a safe continuation beyond the intended take-out."
      ],
      "watchFor": [
        "Scraping, shallow bends, and slow progress when the Camp Hill gauge is near or below 1.4 ft.",
        "Fresh wood, small strainers, slippery banks, and bridge-area current at the Liberty Forge finish.",
        "Fast rises and more debris after thunderstorms on a creek that can change quickly despite its mellow appearance.",
        "Private banks and drifting past the intended bridge-side public finish into less clear access context."
      ]
    }
  },
  "yellow-breeches-creek-simpson-park-yellow-breeches-park": {
    "putIn": {
      "name": "Simpson Park launch",
      "latitude": 40.164151,
      "longitude": -76.976192
    },
    "takeOut": {
      "name": "Yellow Breeches Park launch",
      "latitude": 40.183811,
      "longitude": -76.912682
    },
    "logistics": {
      "distanceLabel": "About 7.1 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr depending on depth, wood, and how much low-water line picking or scouting the creek needs that day",
      "shuttle": "Stage the take-out at Yellow Breeches Park before driving back to Simpson Park. Inspect the Sheepford Road finish first because informal roadside parking and muddy footing can change the feel quickly after rain.",
      "permits": "No route-specific paddling permit is known for these township launches. Follow current township, boating, and PFD rules, and do not assume the route should continue downstream into the posted B7 hazard area.",
      "camping": "Lower Allen Community Park sits on the official corridor and offers camping by reservation, but it is an on-route support option rather than permission to camp elsewhere on the creek corridor.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Simpson Park and take out at Yellow Breeches Park for the longest current public Yellow Breeches day the county still frames cleanly above the posted downstream blockage. Use the Camp Hill gauge as the county-endorsed same-creek proxy and expect scraping when it sits below the recommended floor.",
      "accessCaveats": [
        "Cumberland County still publishes both endpoints as official Yellow Breeches access points with exact coordinates on the county story map.",
        "The county currently warns that a large fallen tree and logjam completely block the creek upstream of Slate Hill Road and specifically recommends B6 Yellow Breeches Park to avoid the hazard.",
        "The county recommends boating when the Camp Hill gauge reads about 1.4 to 2.0 feet. This route was reviewed when the proxy gauge was 1.26 feet at 2026-07-10 23:45 EDT, so low-water scraping is likely.",
        "Trail use is limited to daylight hours and the county asks paddlers to respect private property not designated for public use."
      ],
      "watchFor": [
        "Scraping, shallow riffles, and slower travel when the Camp Hill gauge is near or below 1.4 ft.",
        "Fresh wood, strainers, and muddy footing at the Yellow Breeches Park finish after storms.",
        "The posted downstream blockage and the B7 dam-portage area; do not drift past the intended B6 take-out assuming the lower trail is clear.",
        "Private banks and limited legal bailout choices away from the named public launches."
      ]
    }
  },
  "yellow-breeches-creek-mccormick-park-yellow-breeches-park": {
    "putIn": {
      "name": "McCormick Park launch",
      "latitude": 40.165436,
      "longitude": -76.95508
    },
    "takeOut": {
      "name": "Yellow Breeches Park launch",
      "latitude": 40.183811,
      "longitude": -76.912682
    },
    "logistics": {
      "distanceLabel": "About 6.0 mi",
      "estimatedPaddleTime": "About 2 hr 30 min to 4 hr 30 min depending on depth, wood, and how much low-water line picking the creek needs that day",
      "shuttle": "Stage the take-out at Yellow Breeches Park before driving back to McCormick Park. Inspect the Sheepford Road finish first because informal roadside parking and muddy footing can change quickly after rain.",
      "permits": "No route-specific paddling permit is known for this park-to-park route. Follow current township, boating, and PFD rules, and do not assume a downstream continuation beyond the posted B6 finish.",
      "camping": "Lower Allen Community Park sits on the official corridor and offers camping by reservation, but it is an on-route support option rather than part of the normal route finish.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at McCormick Park and take out at Yellow Breeches Park for a middle-lower Yellow Breeches day that still stays above the county’s current downstream blockage. Use the Camp Hill gauge as the county-endorsed same-creek proxy and keep the day conservative when it sits below the recommended floor.",
      "accessCaveats": [
        "Cumberland County still publishes both endpoints as official Yellow Breeches access points with exact coordinates on the county story map.",
        "The county story map says the public may access the creek for boating at the bridge at Old Forge Road at Liberty Forge while following posted access rules; the route passes that bridge before continuing to B6.",
        "The county recommends boating when the Camp Hill gauge reads about 1.4 to 2.0 feet. This route was reviewed when the proxy gauge was 1.26 feet at 2026-07-10 23:45 EDT, so expect scrape-prone shallows and slower travel.",
        "The county currently warns of a full blockage near B7 and specifically recommends B6 Yellow Breeches Park as the safer downstream finish."
      ],
      "watchFor": [
        "Scraping, shallow bends, and slower travel when the Camp Hill gauge is near or below 1.4 ft.",
        "Fresh wood, strainers, and muddy footing at Liberty Forge and Yellow Breeches Park after storms.",
        "Fast rises and more debris after thunderstorms on a creek that can change quickly despite modest mileage.",
        "The posted downstream blockage beyond B6, plus private banks and limited legal bailout choices away from the named public launches."
      ]
    }
  },
  "yellow-breeches-creek-simpson-park-mccormick-park": {
    "putIn": {
      "name": "Simpson Park launch",
      "latitude": 40.164151,
      "longitude": -76.976192
    },
    "takeOut": {
      "name": "McCormick Park launch",
      "latitude": 40.165436,
      "longitude": -76.95508
    },
    "logistics": {
      "distanceLabel": "About 1.1 mi",
      "estimatedPaddleTime": "About 35 min to 1 hr 30 min depending on depth, wood, and how much scraping the creek needs that day",
      "shuttle": "The shuttle is short, but stage the McCormick Park take-out first so you can inspect both township launches before committing. Low water, mud, and fresh wood matter more than the mileage suggests.",
      "permits": "No route-specific paddling permit is known for these township-park launches. Follow current township, boating, and PFD rules. If you extend to separate PFBC launches on another day, those accesses may require registration or a PFBC/state-park launch permit.",
      "camping": "Treat this as a short day float. Cumberland County verifies the launch access but does not document public overnight support for this exact Simpson-to-McCormick segment.",
      "campingClassification": "none",
      "summary": "Launch at Simpson Park and take out at McCormick Park for the shortest current Yellow Breeches public segment. Use the Camp Hill gauge as the county-endorsed same-creek proxy and expect scrape-prone shallow water when it sits below the 1.4-foot recommendation.",
      "accessCaveats": [
        "Cumberland County still publishes both endpoints as official Yellow Breeches access points with exact coordinates on the county story map.",
        "The county recommends boating when the Camp Hill gauge reads about 1.4 to 2.0 feet. This route was reviewed when the proxy gauge was 1.25 feet at 2026-07-11 00:45 EDT, so scraping is likely despite the short mileage.",
        "Trail use is limited to daylight hours and the county asks paddlers to respect private property not designated for public use."
      ],
      "watchFor": [
        "Scraping, shallow riffles, and slow progress when the Camp Hill gauge is near or below 1.4 ft.",
        "Fresh wood, strainers, overhanging limbs, and muddy banks after thunderstorms.",
        "Private banks and limited legal bailout choices away from the named public launches."
      ]
    }
  },
  "yellow-breeches-creek-mccormick-park-lower-allen-community-park": {
    "putIn": {
      "name": "McCormick Park launch",
      "latitude": 40.165436,
      "longitude": -76.95508
    },
    "takeOut": {
      "name": "Lower Allen Community Park launch",
      "latitude": 40.172373,
      "longitude": -76.913787
    },
    "logistics": {
      "distanceLabel": "About 3.6 mi",
      "estimatedPaddleTime": "About 1 hr 30 min to 3 hr depending on depth, wood, and how much scraping or scouting the creek needs that day",
      "shuttle": "Stage the Lower Allen Community Park take-out first, then drive back to McCormick Park. Inspect both launches because low water, mud, or same-day storm cleanup can change the easiest carry line.",
      "permits": "No route-specific paddling permit is known for these township-park launches. Follow current township, boating, and PFD rules. If you extend to separate PFBC launches on a different plan, those accesses may require registration or a PFBC/state-park launch permit.",
      "camping": "Lower Allen Community Park offers camping by reservation at the take-out. Treat that as endpoint campground support only and not as permission to camp elsewhere on the creek corridor.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at McCormick Park and take out at Lower Allen Community Park for a short-to-medium Yellow Breeches day. Use the Camp Hill gauge as the county-endorsed same-creek proxy and expect scraping or slower lines when it sits below the recommended 1.4-foot floor.",
      "accessCaveats": [
        "Cumberland County still publishes both endpoints as official Yellow Breeches access points with exact coordinates on the county story map.",
        "The county recommends boating when the Camp Hill gauge reads about 1.4 to 2.0 feet. This route was reviewed when the proxy gauge was 1.25 feet at 2026-07-11 00:45 EDT, so low-water dragging is a real possibility.",
        "The current county advisory flags a full blockage above B7 farther downstream, so treat this route as a self-contained middle segment rather than a casual continuation.",
        "Trail use is limited to daylight hours and the county asks paddlers to respect private property not designated for public use."
      ],
      "watchFor": [
        "Scraping, shallow riffles, and slow progress when the Camp Hill gauge is near or below 1.4 ft.",
        "Fresh wood, strainers, overhanging limbs, and muddy banks after thunderstorms.",
        "Quicker current and more debris once the creek rises toward the 6 ft action stage, even if the short route still looks mellow from shore.",
        "Private banks and limited legal bailout choices away from the named public launches."
      ]
    }
  },
  "yellow-breeches-creek-liberty-forge-yellow-breeches-park": {
    "putIn": {
      "name": "Liberty Forge bridge access",
      "latitude": 40.177495,
      "longitude": -76.924172
    },
    "takeOut": {
      "name": "Yellow Breeches Park launch",
      "latitude": 40.183811,
      "longitude": -76.912682
    },
    "logistics": {
      "distanceLabel": "About 1.9 mi",
      "estimatedPaddleTime": "About 45 min to 1 hr 45 min depending on depth, wood, and how much low-water line picking is needed",
      "shuttle": "Stage the Yellow Breeches Park take-out first, then inspect the Liberty Forge bridge access before driving the short shuttle. Parking is limited at Liberty Forge and muddy footing can change quickly after rain.",
      "permits": "No route-specific paddling permit is known for this bridge-to-park segment. Follow current township, boating, and PFD rules, obey any posted public-access instructions at Liberty Forge, and do not assume the route should continue downstream into the posted B7 hazard area.",
      "camping": "Treat this as a short day route. Cumberland County documents public launch access at Liberty Forge and Yellow Breeches Park, but it does not document public overnight support for this exact segment.",
      "campingClassification": "none",
      "summary": "Launch at the public Liberty Forge bridge access and take out at Yellow Breeches Park for a short lower-middle Yellow Breeches float. This route intentionally ends at B6 because the county currently recommends B6 as the safe downstream finish above the posted blockage near B7.",
      "accessCaveats": [
        "Cumberland County still publishes both endpoints as official Yellow Breeches access points with exact coordinates on the county story map.",
        "The county story map says the public may access the creek for boating at the Old Forge Road bridge at Liberty Forge and should follow posted access rules; it also asks paddlers to limit parking to individuals and small groups only.",
        "The county currently warns that a large fallen tree and logjam completely block the creek upstream of Slate Hill Road and specifically recommends B6 Yellow Breeches Park to avoid the hazard.",
        "The county recommends boating when the Camp Hill gauge reads about 1.4 to 2.0 feet. This route was reviewed when the proxy gauge was 1.25 feet at 2026-07-11 00:45 EDT, so low-water scraping is likely."
      ],
      "watchFor": [
        "Scraping, shallow lines, and slower travel when the Camp Hill gauge is near or below 1.4 ft.",
        "Fresh wood, strainers, and muddy footing at the bridge put-in or the Yellow Breeches Park finish after storms.",
        "The posted downstream blockage and the B7 dam-portage area; do not drift past the intended B6 take-out assuming the lower trail is clear.",
        "Private banks and limited legal bailout choices away from the named public launches."
      ]
    }
  },
  "conodoguinet-creek-willow-mill-good-hope": {
    "putIn": {
      "name": "Willow Mill Park launch",
      "latitude": 40.2567096,
      "longitude": -77.0411725
    },
    "takeOut": {
      "name": "Good Hope Access",
      "latitude": 40.2546304,
      "longitude": -76.9753045
    },
    "logistics": {
      "distanceLabel": "About 9.6 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr 30 min depending on depth, wood, bridge scouting, and how scrape-prone the creek feels on the day",
      "shuttle": "Stage the take-out at Good Hope Access before driving back to Willow Mill Park. Inspect Good Hope first because the county calls it a shallow PFBC launch with modest parking and a permit requirement.",
      "permits": "PFBC says unpowered boats using PFBC launches need boat registration, a PFBC launch permit, or a Pennsylvania state-park launch permit. Follow current PFBC, township-park, boating, and PFD rules.",
      "camping": "Treat this as a day trip. The current county and PFBC materials verify launch access and parking, not public overnight use or route camping for this exact segment.",
      "campingClassification": "none",
      "summary": "Launch at Willow Mill Park and take out at the PFBC Good Hope Access for a longer upper-middle Conodoguinet day. Use the direct Hogestown gauge and the county floor of 1.7 ft, then make a same-day call on wood, current, and whether the creek looks too scrape-prone to justify the mileage.",
      "accessCaveats": [
        "Cumberland County lists both endpoints as named public launches and gives them official street-address access, but the route coordinates in PaddleToday are derived from those official addresses because the county table does not publish launch lat/longs.",
        "Willow Mill is an improved concrete ramp with parking and portable toilets, while Good Hope is a shallower PFBC launch with matting and more limited parking.",
        "The county says boating should be above 1.7 ft at Hogestown. This route was reviewed when the direct gauge was only 1.71 ft at 2026-07-06 19:30 EDT, so expect low-water scraping rather than a generous margin."
      ],
      "watchFor": [
        "Dragging and shallow bridge or riffle lines when the Hogestown gauge is near the 1.7 ft floor.",
        "Fresh wood, overhanging limbs, bridge current, and narrow turns that can feel quicker after thunderstorms.",
        "Action-stage current and flooded edges once the gauge rises toward 6 ft, even if the launches remain open.",
        "Private banks and limited bailout options away from the named public launches."
      ]
    }
  },
  "conodoguinet-creek-vincent-difilippo-acri-meadow": {
    "putIn": {
      "name": "Vincent DiFilippo Nature Preserve launch",
      "latitude": 40.2576825,
      "longitude": -77.0209403
    },
    "takeOut": {
      "name": "Acri Meadow Park launch",
      "latitude": 40.2754696,
      "longitude": -76.9528854
    },
    "logistics": {
      "distanceLabel": "About 13 mi",
      "estimatedPaddleTime": "About 5 hr to 8 hr depending on depth, bridge scouting, strainers, and how quickly the lower creek is moving",
      "shuttle": "Stage the take-out at Acri Meadow Park before driving back to Vincent DiFilippo Nature Preserve. Inspect the unimproved slope at Acri Meadow on arrival because muddy footing can change the feel quickly after rain.",
      "permits": "No route-specific launch permit is known for the two chosen endpoints. Follow current township-park, boating, and PFD rules, and do not assume the public guide guarantees ideal same-day conditions.",
      "camping": "Treat this as a day trip. The current county materials confirm launch access and park amenities, but they do not verify public overnight use or route camping for this exact corridor.",
      "campingClassification": "none",
      "summary": "Launch at Vincent DiFilippo Nature Preserve and take out at Acri Meadow Park for a long middle-to-lower Conodoguinet day. Use the direct Hogestown gauge and the county floor of 1.7 ft, then make a same-day call on current, wood, and whether the creek has enough depth to justify the full mileage.",
      "accessCaveats": [
        "Cumberland County lists both endpoints as named public launches and gives them official street-address access, but the route coordinates in PaddleToday are derived from those official addresses because the county table does not publish launch lat/longs.",
        "Vincent DiFilippo is listed as a concrete launch, while Acri Meadow is a municipal park with an unimproved launch area and steeper slope to the water.",
        "The county says boating should be above 1.7 ft at Hogestown. This route was reviewed when the direct gauge was only 1.71 ft at 2026-07-06 19:30 EDT, so expect a slower low-water day if you go near the floor."
      ],
      "watchFor": [
        "Dragging, shallow bends, and slower travel when the Hogestown gauge is near or below 1.7 ft.",
        "Fresh wood, bridge-current acceleration, muddy banks, and slick unimproved take-out footing at Acri Meadow after rain.",
        "A faster pushy creek and floodplain spread once the gauge climbs toward the 6 ft action stage.",
        "Private banks and limited legal bailout choices away from the named public launches."
      ]
    }
  },
  "conodoguinet-creek-willow-mill-acri-meadow": {
    "putIn": {
      "name": "Willow Mill Park launch",
      "latitude": 40.2567096,
      "longitude": -77.0411725
    },
    "takeOut": {
      "name": "Acri Meadow Park launch",
      "latitude": 40.2754696,
      "longitude": -76.9528854
    },
    "logistics": {
      "distanceLabel": "About 17.4 mi",
      "estimatedPaddleTime": "About 7 hr to 10 hr depending on depth, wood, scouting stops, and whether low water turns the day into repeated scrape sections",
      "shuttle": "Stage the take-out at Acri Meadow Park before driving back to Willow Mill Park. Inspect both launches before committing because a full central-creek day gets much less attractive if the lower take-out is muddy or the creek is barely above the county floor.",
      "permits": "No route-specific launch permit is known for the two chosen endpoints. Follow current township-park, boating, and PFD rules, and skip the route if same-day conditions look too low, too woody, or too pushy.",
      "camping": "Treat this as a day trip. The current county materials confirm launch access and park amenities, but they do not verify public overnight use or route camping for this exact corridor.",
      "campingClassification": "none",
      "summary": "Launch at Willow Mill Park and take out at Acri Meadow Park for a full central Conodoguinet day. Use the direct Hogestown gauge and the county floor of 1.7 ft, then make a conservative same-day judgment on whether the creek has enough water and clear enough channels to justify the full 17.4-mile plan.",
      "accessCaveats": [
        "Cumberland County lists both endpoints as named public launches and gives them official street-address access, but the route coordinates in PaddleToday are derived from those official addresses because the county table does not publish launch lat/longs.",
        "Willow Mill is an improved concrete launch with parking, while Acri Meadow is a more basic municipal-park finish with an unimproved slope to the water.",
        "The county says boating should be above 1.7 ft at Hogestown. This route was reviewed when the direct gauge was only 1.71 ft at 2026-07-06 19:30 EDT, so the app treats it as a marginal low-water full day rather than a routine green-light recommendation."
      ],
      "watchFor": [
        "Repeated scraping, shallow bridge lines, and slow mileage whenever the Hogestown gauge is near the 1.7 ft floor.",
        "Fresh wood, overhanging limbs, bridge-current acceleration, and muddy banks after thunderstorms.",
        "A faster pushy creek, floodplain spread, and fewer forgiving eddies once the gauge rises toward the 6 ft action stage.",
        "Private banks and limited legal bailout choices away from the named public launches."
      ]
    }
  },
  "conodoguinet-creek-willow-mill-vincent-difilippo": {
    "putIn": {
      "name": "Willow Mill Park launch",
      "latitude": 40.2567096,
      "longitude": -77.0411725
    },
    "takeOut": {
      "name": "Vincent DiFilippo Nature Preserve launch",
      "latitude": 40.2576825,
      "longitude": -77.0209403
    },
    "logistics": {
      "distanceLabel": "About 4.4 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr 30 min depending on depth, wood, bridge scouting, and shuttle speed",
      "shuttle": "Stage the take-out at Vincent DiFilippo Nature Preserve before driving back to Willow Mill Park. Both are county-listed public launches, but inspect the access path and footing first because recent rain, mud, or treefall can change the feel quickly on this creek.",
      "permits": "No route-specific launch permit is known for this township-to-township segment. Follow current township-park, boating, and PFD rules, and make a same-day judgment instead of assuming the county guide guarantees ideal conditions.",
      "camping": "Treat this as a day trip. The current county access table documents park amenities at both ends but does not verify route camping or public overnight use for this exact corridor.",
      "campingClassification": "none",
      "summary": "Launch at Willow Mill Park and take out at Vincent DiFilippo Nature Preserve for a short Conodoguinet day. Use the direct Hogestown gauge and the county floor of 1.7 ft, then make a same-day visual call on wood, current, and bridge approaches.",
      "accessCaveats": [
        "Cumberland County lists both endpoints as named public launches and gives them official street-address access, but the route coordinates in PaddleToday are derived from those official addresses because the county table does not publish launch lat/longs.",
        "Willow Mill is an improved concrete ramp with parking and portable toilets, while Vincent DiFilippo is also listed as a concrete launch. Same-day mud, maintenance, and fallen trees can still change launch ease.",
        "The county says boating should be above 1.7 ft at Hogestown. Treat lower readings as a scrape-and-drag signal, not as a casual green light."
      ],
      "watchFor": [
        "Dragging and shallow turns when the Hogestown gauge is near or below 1.7 ft.",
        "Strainers, fresh flood wood, undercut banks, bridge-area current, and slick launch footing after rain.",
        "A faster, pushier creek once levels rise toward the 6 ft action stage, even though the route itself is short.",
        "Private banks away from the named public launches; do not assume ad hoc pull-offs are legitimate take-out options."
      ]
    }
  },
  "conodoguinet-creek-vincent-difilippo-good-hope": {
    "putIn": {
      "name": "Vincent DiFilippo Nature Preserve launch",
      "latitude": 40.2576825,
      "longitude": -77.0209403
    },
    "takeOut": {
      "name": "Good Hope Access",
      "latitude": 40.2546304,
      "longitude": -76.9753045
    },
    "logistics": {
      "distanceLabel": "About 5.2 mi",
      "estimatedPaddleTime": "About 2 hr 30 min to 4 hr depending on depth, bridge scouting, and how much wood has shifted since the last rain",
      "shuttle": "Stage the take-out at Good Hope Access before driving back to Vincent DiFilippo Nature Preserve. Inspect Good Hope on arrival because the county calls it a shallow PFBC launch with a permit requirement and modest parking.",
      "permits": "PFBC says unpowered boats using PFBC launches need boat registration, a PFBC launch permit, or a Pennsylvania state-park launch permit. Follow current PFBC, township-park, boating, and PFD rules.",
      "camping": "Treat this as a day trip. The current county and PFBC materials confirm access and parking, not public overnight use or route camping for this exact segment.",
      "campingClassification": "none",
      "summary": "Launch at Vincent DiFilippo Nature Preserve and take out at the PFBC Good Hope Access for a moderate-length Conodoguinet day. Use the direct Hogestown gauge and the county floor of 1.7 ft, then make a same-day call on wood, current, and the Good Hope ramp condition.",
      "accessCaveats": [
        "Cumberland County lists both endpoints as named public launches and gives them official street-address access, but the route coordinates in PaddleToday are derived from those official addresses because the county table does not publish launch lat/longs.",
        "Good Hope is a PFBC site with a shallow earthen ramp improved by matting and about ten parking spaces. It is more basic than a broad municipal park launch.",
        "The county says boating should be above 1.7 ft at Hogestown. Treat lower readings as a drag-and-scrape signal and much higher readings as a caution flag for stronger current and more debris."
      ],
      "watchFor": [
        "Dragging and shallow bridge or riffle lines when the Hogestown gauge is near or below 1.7 ft.",
        "Fresh wood, overhanging limbs, bridge current, and narrow turns that can feel quicker after thunderstorms.",
        "Action-stage current and flooded edges once the gauge rises toward 6 ft, even if the launches remain open.",
        "Private banks and limited bailout options away from the named public launches."
      ]
    }
  },
  "conodoguinet-creek-good-hope-acri-meadow": {
    "putIn": {
      "name": "Good Hope Access",
      "latitude": 40.2546304,
      "longitude": -76.9753045
    },
    "takeOut": {
      "name": "Acri Meadow Park launch",
      "latitude": 40.2754696,
      "longitude": -76.9528854
    },
    "logistics": {
      "distanceLabel": "About 7.8 mi",
      "estimatedPaddleTime": "About 3 hr 15 min to 5 hr depending on level, wood, scouting, and how quickly the downstream park launch is moving",
      "shuttle": "Stage the take-out at Acri Meadow Park before driving back to Good Hope Access. Good Hope is the more limited endpoint, so inspect the PFBC ramp and parking first before committing to the shuttle.",
      "permits": "PFBC says unpowered boats using PFBC launches need boat registration, a PFBC launch permit, or a Pennsylvania state-park launch permit. Follow current PFBC, township, boating, and PFD rules.",
      "camping": "Treat this as a day trip. The current county and PFBC materials confirm launch access and park amenities, but they do not verify public overnight use or route camping for this exact corridor.",
      "campingClassification": "none",
      "summary": "Launch at Good Hope Access and take out at Acri Meadow Park for a longer lower-central Conodoguinet day. Use the direct Hogestown gauge and the county floor of 1.7 ft, then make a same-day visual call on current, wood, and bridge approaches.",
      "accessCaveats": [
        "Cumberland County lists both endpoints as named public launches and gives them official street-address access, but the route coordinates in PaddleToday are derived from those official addresses because the county table does not publish launch lat/longs.",
        "Good Hope is a smaller PFBC launch with a permit requirement, while Acri Meadow is a municipal park with an unimproved launch area and steeper slope to the water.",
        "The county says boating should be above 1.7 ft at Hogestown. PaddleToday keeps this route minimum-only because the county publishes a floor and flood-context stages, not a route-specific ideal high-water band."
      ],
      "watchFor": [
        "Dragging, shallow bends, and slower travel when the Hogestown gauge is near or below 1.7 ft.",
        "Fresh wood, bridge-current acceleration, muddy banks, and slick unimproved take-out footing at Acri Meadow after rain.",
        "A faster pushy creek and floodplain spread once the gauge climbs toward the 6 ft action stage.",
        "Private banks and limited legal bailout choices away from the named public launches."
      ]
    }
  },
  "lehigh-river-white-haven-rockport": {
    "putIn": {
      "id": "white-haven-south-access",
      "name": "White Haven South Access Area",
      "latitude": 41.05527,
      "longitude": -75.771581
    },
    "takeOut": {
      "id": "rockport-access-area",
      "name": "Rockport Access Area",
      "latitude": 40.966616,
      "longitude": -75.755074
    },
    "logistics": {
      "distanceLabel": "About 8.7 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr for qualified whitewater groups, longer with low water, release crowds, scouting, or a conservative take-out plan",
      "shuttle": "Stage the take-out at Rockport, then drive back to the White Haven access. DCNR says release days can change parking and traffic patterns at White Haven, Rockport, and Glen Onoko, so confirm current Lehigh Gorge State Park alerts, posted signs, and access routing before leaving vehicles.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current DCNR/PFBC rules, posted Lehigh Gorge access rules, and whitewater equipment requirements.",
      "camping": "Treat this as a managed daylight state-park whitewater day. Do not camp, stage, or park outside posted Lehigh Gorge State Park areas, and leave enough daylight for the shuttle and any release-day traffic delays.",
      "summary": "Launch at White Haven and take out at Rockport for the upper Lehigh Gorge whitewater section. Use the USGS White Haven outflow gauge below Francis E. Walter Reservoir and DCNR flow bands, and skip the route when water, weather, access status, or group skill is not clearly right.",
      "accessCaveats": [
        "DCNR says private boaters must put on and take off only at designated Lehigh River access areas in the state park.",
        "White Haven access has had traffic and access routing changes; use current DCNR signs rather than stale directions.",
        "The Rockport coordinate is a cross-checked access-area coordinate because the DCNR Rockport page appears to publish an impossible latitude typo. Verify the exact take-out with current park signs on arrival.",
        "This is a whitewater route. DCNR says inexperienced boaters should not attempt the Lehigh River without qualified guides.",
        "Release weekends can be crowded with commercial rafts, clubs, private boaters, cyclists, and shuttle traffic."
      ],
      "watchFor": [
        "Class II-III rapids, ledges, rock outcrops, boulders, waterfalls, swift current, and cold-water swims in a steep-walled gorge.",
        "Very low water below about 250 cfs, when DCNR says many parts are not deep enough for boating.",
        "Flows above 1,000 cfs, when DCNR says difficulty progressively increases and better skill and equipment are needed.",
        "Flows above 5,000 cfs, which DCNR reserves for expert boaters in kayaks, closed canoes, or very large rafts.",
        "Dam-release timing, tributary rain, rising water, wood, strainer hazards, limited exits, release-day traffic changes, and missing the Rockport take-out."
      ]
    }
  },
  "lehigh-river-rockport-glen-onoko": {
    "putIn": {
      "id": "rockport-access-area",
      "name": "Rockport Access Area",
      "latitude": 40.966616,
      "longitude": -75.755074
    },
    "takeOut": {
      "id": "glen-onoko-access-area",
      "name": "Glen Onoko Access Area",
      "latitude": 40.8835,
      "longitude": -75.75914
    },
    "logistics": {
      "distanceLabel": "About 12.2 mi",
      "estimatedPaddleTime": "About 4 hr to 6.5 hr for qualified whitewater groups, longer with low water, release crowds, scouting, or a conservative take-out plan",
      "shuttle": "Stage the take-out at Glen Onoko, then drive back to Rockport. DCNR says release days can change parking and traffic patterns at White Haven, Rockport, and Glen Onoko, so confirm current Lehigh Gorge State Park alerts, posted signs, and access routing before leaving vehicles.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current DCNR/PFBC rules, posted Lehigh Gorge access rules, and whitewater equipment requirements.",
      "camping": "Treat this as a managed daylight state-park whitewater day. Do not camp, stage, or park outside posted Lehigh Gorge State Park areas, and leave enough daylight for the shuttle and any release-day traffic delays.",
      "campingClassification": "none",
      "summary": "Launch at Rockport and take out at Glen Onoko for the lower Lehigh Gorge whitewater section. Use the USGS White Haven outflow gauge below Francis E. Walter Reservoir and DCNR flow bands, and skip the route when water, weather, access status, or group skill is not clearly right.",
      "accessCaveats": [
        "DCNR says private boaters must put on and take off only at designated Lehigh River access areas in the state park.",
        "Rockport and Glen Onoko can both see parking and traffic changes on release weekends. Use current DCNR signs rather than stale directions.",
        "Glen Onoko GPS context is cross-checked to 40.8835, -75.75914 because the current state-park page appears to publish the correct longitude with a northing typo in the latitude.",
        "This is a whitewater route. DCNR says inexperienced boaters should not attempt the Lehigh River without qualified guides.",
        "Release weekends can be crowded with commercial rafts, clubs, private boaters, cyclists, and shuttle traffic."
      ],
      "watchFor": [
        "Class II-III rapids, ledges, rock outcrops, boulders, waterfalls, swift current, and cold-water swims in a steep-walled gorge.",
        "Very low water below about 250 cfs, when DCNR says many parts are not deep enough for boating.",
        "Flows above 1,000 cfs, when DCNR says difficulty progressively increases and better skill and equipment are needed.",
        "Flows above 5,000 cfs, which DCNR reserves for expert boaters in kayaks, closed canoes, or very large rafts.",
        "Dam-release timing, tributary rain, rising water, wood, strainer hazards, limited exits, release-day traffic changes, and missing the Glen Onoko take-out."
      ]
    }
  },
  "lehigh-river-white-haven-glen-onoko": {
    "putIn": {
      "id": "white-haven-south-access",
      "name": "White Haven South Access Area",
      "latitude": 41.05527,
      "longitude": -75.771581
    },
    "takeOut": {
      "id": "glen-onoko-access-area",
      "name": "Glen Onoko Access Area",
      "latitude": 40.8835,
      "longitude": -75.75914
    },
    "logistics": {
      "distanceLabel": "About 20.9 mi",
      "estimatedPaddleTime": "About 7 hr to 12 hr for qualified whitewater groups, longer with low water, release crowds, scouting, or any conservative pace through the full gorge",
      "shuttle": "Stage the take-out at Glen Onoko, then drive back to White Haven. DCNR says release days can change parking and traffic patterns at White Haven, Rockport, and Glen Onoko, so confirm current Lehigh Gorge State Park alerts, posted signs, and access routing before leaving vehicles.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current DCNR/PFBC rules, posted Lehigh Gorge access rules, and whitewater equipment requirements.",
      "camping": "Treat this as an all-day managed state-park whitewater trip. DCNR specifically warns the White Haven to Glen Onoko raft trip can take 10 to 12 hours at lower water levels, so build in daylight rather than assuming a midpoint overnight option.",
      "campingClassification": "none",
      "summary": "Launch at White Haven and take out at Glen Onoko for the full Lehigh Gorge whitewater corridor. Use the USGS White Haven outflow gauge below Francis E. Walter Reservoir and DCNR flow bands, and make a hard same-day call on water, weather, release timing, and total daylight before committing.",
      "accessCaveats": [
        "DCNR says private boaters must put on and take off only at designated Lehigh River access areas in the state park.",
        "This full-corridor route combines the White Haven-to-Rockport and Rockport-to-Glen-Onoko sections into one long commitment that should not be treated as a casual default trip.",
        "Glen Onoko GPS context is cross-checked to 40.8835, -75.75914 because the current state-park page appears to publish the correct longitude with a northing typo in the latitude.",
        "This is a whitewater route. DCNR says inexperienced boaters should not attempt the Lehigh River without qualified guides.",
        "Release weekends can be crowded with commercial rafts, clubs, private boaters, cyclists, and shuttle traffic."
      ],
      "watchFor": [
        "Class II-III rapids, ledges, rock outcrops, boulders, waterfalls, swift current, and cold-water swims in a steep-walled gorge.",
        "Very low water below about 250 cfs, when DCNR says many parts are not deep enough for boating and the full route can stretch toward a 10-12 hour day.",
        "Flows above 1,000 cfs, when DCNR says difficulty progressively increases and better skill and equipment are needed.",
        "Flows above 5,000 cfs, which DCNR reserves for expert boaters in kayaks, closed canoes, or very large rafts.",
        "Dam-release timing, tributary rain, rising water, wood, strainer hazards, limited exits, release-day traffic changes, fatigue, and missing the Glen Onoko take-out after a long day."
      ]
    }
  },
  "juniata-river-greenwood-amity-hall": {
    "putIn": {
      "id": "greenwood-pfbc-ramp",
      "name": "Greenwood PFBC ramp",
      "latitude": 40.530278,
      "longitude": -77.141944
    },
    "takeOut": {
      "id": "amity-hall-pfbc-ramp",
      "name": "Amity Hall PFBC ramp",
      "latitude": 40.430833,
      "longitude": -77.013333
    },
    "logistics": {
      "distanceLabel": "About 14 mi for the full corridor; choose a shorter segment in the access planner",
      "estimatedPaddleTime": "About 4.5 hr to 7 hr for the full corridor, shorter with Newport or Green Valley pairings.",
      "shuttle": "Choose a put-in and take-out from the planner, stage the downstream vehicle first, and inspect both landings.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current PFBC, boating, and PFD rules.",
      "camping": "Treat this as a day-trip corridor unless separate legal camping arrangements are confirmed.",
      "summary": "Use this as the Newport-area lower Juniata access-planner corridor from Greenwood to Amity Hall, with Newport, Howe Township, and Green Valley options.",
      "accessCaveats": [
        "Newport is the practical hub for shorter lower-Juniata plans.",
        "Howe Township and Green Valley options can shorten the day when wind, level, or daylight are marginal.",
        "Stay with public accesses rather than using private banks or islands as backup exits."
      ],
      "watchFor": [
        "Low-water bars and slow pools.",
        "Fresh wood after storms.",
        "Open-bend headwind and private shorelines."
      ]
    },
    "accessPoints": [
      {
        "id": "greenwood-pfbc-ramp",
        "name": "Greenwood PFBC ramp",
        "latitude": 40.530278,
        "longitude": -77.141944,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default corridor put-in."
      },
      {
        "id": "newport-primitive-access",
        "name": "Newport access",
        "latitude": 40.479167,
        "longitude": -77.129444,
        "mileFromStart": 4,
        "segmentKind": "creek",
        "note": "Newport hub access."
      },
      {
        "id": "howe-township-park-access",
        "name": "Howe Township Park access",
        "latitude": 40.490833,
        "longitude": -77.096389,
        "mileFromStart": 7,
        "segmentKind": "creek",
        "note": "Shorter Newport-area finish option."
      },
      {
        "id": "green-valley-ramp",
        "name": "Green Valley access",
        "latitude": 40.479167,
        "longitude": -77.054722,
        "mileFromStart": 10,
        "segmentKind": "creek",
        "note": "Green Valley access for shorter lower-corridor choices."
      },
      {
        "id": "amity-hall-pfbc-ramp",
        "name": "Amity Hall PFBC ramp",
        "latitude": 40.430833,
        "longitude": -77.013333,
        "mileFromStart": 14,
        "segmentKind": "creek",
        "note": "Default corridor finish."
      }
    ]
  },
  "susquehanna-river-sayre-wysox-township-park": {
    "putIn": {
      "name": "Sayre PFBC access",
      "latitude": 41.988333,
      "longitude": -76.611667
    },
    "takeOut": {
      "name": "Wysox Township Park access",
      "latitude": 41.770833,
      "longitude": -76.397778
    },
    "logistics": {
      "distanceLabel": "About 23 mi",
      "estimatedPaddleTime": "About 7 hr to 9.5 hr in ordinary conditions, longer with headwind, low-water scouting, or a deliberate legal overnight-style pace",
      "shuttle": "Stage the take-out at Wysox Township Park first, then drive back to the Sayre PFBC ramp. Inspect both accesses before launching because mud, broad-river current, storm cleanup, or local park activity can change the practical landing angle.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current PFBC, county-park, township-park, boating, and PFD rules.",
      "camping": "Harrigan Island, Hornbrook County Park, and Riverside Acres Campground all sit on this official corridor and can support legal overnight planning. Treat that as on-route camping support only and not as permission to camp on broad bars, islands, or private banks.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Sayre PFBC and take out at Wysox Township Park for a long upper-to-mid Section 1 Susquehanna continuation. Use the direct Towanda stage gauge, keep the easiest planning days around 2 to 4 feet there, and treat the Towanda bridge sequence plus long exposed mileage as real same-day factors.",
      "accessCaveats": [
        "PFBC Section 1 publishes both Sayre PFBC and Wysox Township Park coordinates directly in the official access tables.",
        "This is a long mainstem day for a nominally easy river. PFBC says 15 to 18 miles around the 2-foot Towanda level is already more of an experienced-paddler distance, so do not underrate a 23-mile continuation.",
        "Harrigan Island, Hornbrook County Park, and Riverside Acres are legal supports on the corridor, but the route still begins at Sayre PFBC and should finish at Wysox Township Park unless you have made a deliberate legal stop plan.",
        "Stay within the named public accesses, campgrounds, and support points rather than treating islands or private banks as casual options."
      ],
      "watchFor": [
        "Fast riffles at miles 286 and 277, the strainer-prone mile-274 area, current under bridge arches at mile 272, and more quick water at miles 270, 269, and 268 flagged by PFBC.",
        "Towanda stages below about 1 foot, when shallower broad-river spots get scratchier and can create class I to II style wave trains.",
        "Towanda stages above about 4 feet, when current moves faster and small errors cost more energy late in the day; PFBC says novice paddlers should stay off above about 5 feet.",
        "Headwind, thunderstorms, floating wood, fatigue, private shorelines, and drifting past the obvious Wysox finish after the bridge sequence is behind you."
      ]
    }
  },
  "susquehanna-river-ulster-bridge-towanda": {
    "putIn": {
      "name": "Ulster Bridge access",
      "latitude": 41.8525,
      "longitude": -76.497222
    },
    "takeOut": {
      "name": "Towanda Riverfront Park ramp",
      "latitude": 41.768611,
      "longitude": -76.438611
    },
    "logistics": {
      "distanceLabel": "About 8.8 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr in ordinary conditions, longer with low-water line picking, headwind, or a careful approach to the Towanda bridge corridor",
      "shuttle": "Stage the take-out at Towanda Riverfront Park first, then drive back to Ulster Bridge. Inspect both accesses before launching because mud, current angle, storm cleanup, or town-side activity can change the practical landing line.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current PFBC, borough, boating, and PFD rules.",
      "camping": "Hornbrook County Park is listed in the official North Branch corridor camping table and sits on this route. Treat that as legal on-route camping support only, not as permission to land on arbitrary islands or private banks.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Ulster Bridge and take out at Towanda Riverfront Park for a shorter Towanda-corridor Susquehanna day. Use the direct Towanda stage gauge, keep the easiest planning days around 2 to 4 feet there, and keep the strainer and bridge-current sequence on the same-day checklist.",
      "accessCaveats": [
        "PFBC Section 1 publishes both Ulster Bridge and Towanda Riverfront Park coordinates directly in the official access table.",
        "Hornbrook County Park is a legal support point on the corridor, but the slug itself still starts at Ulster and ends at Towanda Riverfront Park.",
        "Towanda is a stronger town landing than Ulster, but the current toward structure and the busier riverfront setting still require finish discipline.",
        "Stay within the named public accesses and do not assume islands, bars, or private banks are legitimate substitutes."
      ],
      "watchFor": [
        "Fast riffles at mile 277, the strainer-prone mile-274 area, current under bridge arches at mile 272, and more quick water before the bridge at mile 270 flagged by PFBC.",
        "Towanda stages below about 1 foot, when the shallow riffle lines get scratchier and more technical even on a broad channel.",
        "Towanda stages above about 4 feet, when current speeds up noticeably; PFBC says novice paddlers should stay off above about 5 feet.",
        "Headwind, thunderstorms, floating wood, private shorelines, and drifting past the obvious Towanda finish because the river feels easy early."
      ]
    }
  },
  "susquehanna-river-ulster-bridge-wysox-township-park": {
    "putIn": {
      "name": "Ulster Bridge access",
      "latitude": 41.8525,
      "longitude": -76.497222
    },
    "takeOut": {
      "name": "Wysox Township Park access",
      "latitude": 41.770833,
      "longitude": -76.397778
    },
    "logistics": {
      "distanceLabel": "About 11.3 mi",
      "estimatedPaddleTime": "About 3.5 hr to 5.5 hr in ordinary conditions, longer with low-water scouting, bridge-current caution, or a windy day across the Towanda corridor",
      "shuttle": "Stage the take-out at Wysox Township Park first, then drive back to Ulster Bridge. Inspect both accesses before launching because broad-river mud, storm cleanup, bridge-current push, or local activity can change the practical carry and landing line.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current PFBC, township-park, municipal, boating, and PFD rules.",
      "camping": "Larnard Hornbrook County Park and Riverside Acres Campground both sit on this official corridor and can support legal overnight use with current site rules or reservations. Treat that as on-route camping support rather than permission to stop on undeveloped banks.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Ulster Bridge and take out at Wysox Township Park for a route that carries you through the Towanda bridge corridor. Use the direct Towanda stage gauge, keep the easiest planning days around 2 to 4 feet there, and treat the mile-274 strainer and bridge-current sequence as real same-day hazards.",
      "accessCaveats": [
        "PFBC and the North Branch guide family publish both Ulster Bridge and Wysox Township Park coordinates directly in the official access tables.",
        "This route includes the Towanda bridge area and its current lines, so do not relax just because the river looks broad and mostly open.",
        "Wysox Township Park is a stronger park finish with parking and amenities, but it still requires a committed finish discipline rather than ad hoc take-outs on islands or private banks.",
        "Hornbrook Park and Riverside Acres are helpful legal support on the corridor, but the slug itself still starts at Ulster and ends at Wysox Township Park."
      ],
      "watchFor": [
        "Fast riffles at mile 277, the strainer-prone mile-274 area, fast current under bridge arches at mile 272, and more quick water at miles 270, 269, and 268 flagged by PFBC.",
        "Towanda stages below about 1 foot, when the bridge-adjacent riffles and shallower lines get more technical and scratchy.",
        "Towanda stages above about 4 feet, when current speeds up and mistakes near structure cost more time; PFBC says novice paddlers should stay off above about 5 feet.",
        "Headwind, thunderstorms, floating wood, private shorelines, and missing the obvious Wysox finish after the bridge sequence is behind you."
      ]
    }
  },
  "susquehanna-river-ulster-bridge-terrytown": {
    "putIn": {
      "name": "Ulster Bridge access",
      "latitude": 41.8525,
      "longitude": -76.497222
    },
    "takeOut": {
      "name": "Terrytown PFBC ramp",
      "latitude": 41.714167,
      "longitude": -76.281667
    },
    "logistics": {
      "distanceLabel": "About 24.9 mi",
      "estimatedPaddleTime": "About 7.5 hr to 10 hr in ordinary conditions, longer with headwind, low-water scouting, or a deliberate legal overnight-style pace",
      "shuttle": "Stage the take-out at Terrytown PFBC first, then drive back to Ulster Bridge. Inspect both landings before launching because mud, event traffic, flood cleanup, or local maintenance can change how straightforward the carry feels.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current PFBC, county-park, township-park, municipal, boating, and PFD rules.",
      "camping": "Hornbrook County Park and Riverside Acres Campground both sit on this official corridor and support legal overnight planning. Treat that as on-route camping support only and not as permission to camp on broad bars, islands, or private banks.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Ulster Bridge and take out at Terrytown PFBC for a long Section 1 Susquehanna continuation. Use the direct Towanda stage gauge, keep the easiest planning days around 2 to 4 feet there, and treat wind plus the repeated fast-water zones as real long-day factors.",
      "accessCaveats": [
        "PFBC Section 1 publishes both Ulster Bridge and Terrytown PFBC coordinates directly in the official access table.",
        "This route includes the Towanda bridge area and its current lines, so do not relax just because the river looks broad and mostly open.",
        "Hornbrook County Park and Riverside Acres are helpful legal overnight supports, but the route still starts at Ulster Bridge and should finish at the Terrytown PFBC landing unless you have made a deliberate legal stop plan.",
        "Stay within the named public accesses, campgrounds, and support points rather than treating islands or private banks as casual options."
      ],
      "watchFor": [
        "The mile-274 strainer area, current under bridge arches at mile 272, the Towanda bridge sequence, and the lower-section fast-water miles 267, 261, and 258 flagged by PFBC.",
        "Towanda stages below about 1 foot, when shallower lower-riverbed spots can create class I to II style wave trains and expose more rocks.",
        "Towanda stages above about 4 feet, when the current moves faster and small errors cost more energy late in the day; PFBC says novice paddlers should stay off above about 5 feet.",
        "Headwind, thunderstorms, floating wood, fatigue, private shorelines, and drifting past the Terrytown PFBC finish after settling into the long lower-corridor rhythm."
      ]
    }
  },
  "susquehanna-river-hornbrook-wysox-township-park": {
    "putIn": {
      "name": "Larnard Hornbrook Park ramp",
      "latitude": 41.809444,
      "longitude": -76.486111
    },
    "takeOut": {
      "name": "Wysox Township Park access",
      "latitude": 41.770833,
      "longitude": -76.397778
    },
    "logistics": {
      "distanceLabel": "About 8 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr in ordinary conditions, longer with low-water line picking, headwind, or a careful approach to the Towanda bridge corridor",
      "shuttle": "Stage the take-out at Wysox Township Park first, then drive back to Larnard Hornbrook Park. Inspect both accesses before launching because mud, bridge-current push, storm cleanup, or park activity can change the practical landing angle.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current PFBC, county-park, township-park, boating, and PFD rules.",
      "camping": "Hornbrook County Park sits directly at the put-in and is listed in the official North Branch corridor camping table. Treat that as endpoint campground support only, not as permission to stop on undeveloped islands, bars, or private banks.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Larnard Hornbrook Park and take out at Wysox Township Park for a shorter public-access Susquehanna day through the Towanda bridge corridor. Use the direct Towanda stage gauge, keep the easiest planning days around 2 to 4 feet there, and watch the bridge-current sequence closely.",
      "accessCaveats": [
        "PFBC Section 1 publishes both Larnard Hornbrook Park and Wysox Township Park coordinates directly in the official access table.",
        "Hornbrook is a park launch, not a giant ramp complex. Confirm same-day footing, parking, and launch angle before leaving the shuttle vehicle.",
        "Wysox Township Park is a stronger developed finish, but it still requires a committed finish discipline rather than ad hoc island or private-bank take-outs.",
        "Stay within the named public accesses and do not assume islands, bars, or private banks are legitimate substitutes."
      ],
      "watchFor": [
        "The strainer-prone mile-274 area, current under bridge arches at mile 272, and more quick water at miles 270, 269, and 268 flagged by PFBC.",
        "Towanda stages below about 1 foot, when the bridge-adjacent riffles and shallow lines get scratchier and more technical.",
        "Towanda stages above about 4 feet, when current speeds up noticeably; PFBC says novice paddlers should stay off above about 5 feet.",
        "Headwind, thunderstorms, floating wood, private shorelines, and missing the Wysox finish after the bridge sequence feels behind you."
      ]
    }
  },
  "susquehanna-river-hornbrook-terrytown": {
    "putIn": {
      "name": "Larnard Hornbrook Park ramp",
      "latitude": 41.809444,
      "longitude": -76.486111
    },
    "takeOut": {
      "name": "Terrytown PFBC ramp",
      "latitude": 41.714167,
      "longitude": -76.281667
    },
    "logistics": {
      "distanceLabel": "About 21.5 mi",
      "estimatedPaddleTime": "About 7 hr to 9 hr in ordinary conditions, longer with headwind, low-water scouting, or a deliberate overnight-style pace with legal support stops only",
      "shuttle": "Stage the take-out at Terrytown PFBC first, then drive back to Larnard Hornbrook Park. Inspect both landings before launching because mud, event traffic, flood cleanup, or local maintenance can change how straightforward the carry feels.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current PFBC, county-park, borough, boating, and PFD rules.",
      "camping": "Hornbrook County Park and Riverside Acres Campground both sit on this official corridor and support legal overnight planning. Treat that as on-route camping support only and not as permission to camp on broad bars, islands, or private banks.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Larnard Hornbrook Park and take out at Terrytown PFBC for a long Section 1 Susquehanna continuation. Use the direct Towanda stage gauge, keep the easiest planning days around 2 to 4 feet there, and treat wind plus the repeated fast-water zones as real long-day factors.",
      "accessCaveats": [
        "PFBC Section 1 publishes both Larnard Hornbrook Park and Terrytown PFBC coordinates directly in the official access table.",
        "This is a long mainstem day for a nominally easy river. The corridor is broad and mostly open, but the distance and weather exposure matter as much as the riffles.",
        "Hornbrook County Park and Riverside Acres are helpful legal overnight supports, but the route still begins at Hornbrook and should finish at the Terrytown PFBC landing unless you have made a deliberate legal stop plan.",
        "Stay within the named public accesses, campgrounds, and support points rather than treating islands or private banks as casual options."
      ],
      "watchFor": [
        "The mile-274 strainer area, current under bridge arches at mile 272, the Towanda bridge sequence, and the lower-section fast-water miles 267, 261, and 258 flagged by PFBC.",
        "Towanda stages below about 1 foot, when shallower lower-riverbed spots can create class I to II style wave trains and expose more rocks.",
        "Towanda stages above about 4 feet, when the current moves faster and small errors cost more energy late in the day; PFBC says novice paddlers should stay off above about 5 feet.",
        "Headwind, thunderstorms, floating wood, fatigue, private shorelines, and drifting past the Terrytown PFBC finish after settling into the long lower-corridor rhythm."
      ]
    }
  },
  "susquehanna-river-hornbrook-towanda": {
    "putIn": {
      "name": "Larnard Hornbrook Park ramp",
      "latitude": 41.809444,
      "longitude": -76.486111
    },
    "takeOut": {
      "name": "Towanda Riverfront Park ramp",
      "latitude": 41.768611,
      "longitude": -76.438611
    },
    "logistics": {
      "distanceLabel": "About 5 mi",
      "estimatedPaddleTime": "About 1.5 hr to 3 hr in ordinary conditions, longer with headwind, low-water line picking, or careful approach to the Towanda bridge area",
      "shuttle": "Stage the take-out at Towanda Riverfront Park first, then drive back to Larnard Hornbrook Park. Inspect both accesses before launching because mud, bridge-current push, storm cleanup, or local park activity can change the practical landing angle.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current PFBC, county-park, borough, boating, and PFD rules.",
      "camping": "Treat this as a day trip. Hornbrook Park can support a nearby basecamp-style stay, but the route should not imply open riverbank camping between the named accesses.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Larnard Hornbrook Park and take out at Towanda Riverfront Park for a short upper-Bradford-County Susquehanna day. Use the direct Towanda stage gauge, keep the easiest planning days around 2 to 4 feet there, and keep the mile-274 strainer area plus the Towanda bridge riffles on the same-day checklist.",
      "accessCaveats": [
        "PFBC Section 1 publishes both Larnard Hornbrook Park and Towanda Riverfront Park coordinates directly in the official access table.",
        "Hornbrook is a park access rather than a huge ramp complex. Confirm same-day footing, parking, and launch angle before leaving the shuttle vehicle.",
        "Towanda is a stronger town landing, but bridge current and riverfront activity can still complicate the finish if you arrive tired or in rising water.",
        "Stay within the named public accesses and do not assume islands, bars, or private banks are legitimate substitutes."
      ],
      "watchFor": [
        "Fast riffles with a strainer in the mile-274 area and fast riffles before the bridge at mile 270 flagged by PFBC.",
        "Towanda stages below about 0 to 1 foot, when the broad channel gets scratchier and more technical around shallow riffle lines.",
        "Towanda stages above about 4 feet, when current speeds up noticeably; PFBC says novice paddlers should stay off above about 5 feet.",
        "Headwind, thunderstorms, floating wood, private shorelines, and the risk of drifting past the obvious Towanda take-out near the bridge corridor."
      ]
    }
  },
  "susquehanna-river-towanda-terrytown": {
    "putIn": {
      "name": "Towanda Riverfront Park ramp",
      "latitude": 41.768611,
      "longitude": -76.438611
    },
    "takeOut": {
      "name": "Terrytown PFBC ramp",
      "latitude": 41.714167,
      "longitude": -76.281667
    },
    "logistics": {
      "distanceLabel": "About 16 mi",
      "estimatedPaddleTime": "About 5 hr to 7.5 hr in ordinary conditions, longer with headwind, low-water scouting, or a relaxed shuttle day",
      "shuttle": "Stage the take-out at Terrytown PFBC first, then drive back to Towanda Riverfront Park. Inspect both landings before launching because broad-river mud, event traffic, flood cleanup, or local maintenance can change how straightforward the carry feels.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current PFBC, borough, boating, and PFD rules.",
      "camping": "Treat this as a day float. Riverside Acres Campground is listed in the PFBC Section 1 corridor and can support a nearby basecamp stay, but the route itself should not imply open riverbank camping.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Towanda Riverfront Park and take out at Terrytown PFBC for a mid-corridor North Branch day. Use the direct Towanda stage gauge, keep the easiest planning days around 2 to 4 feet, and scout the fast-riffle miles downstream of Towanda before committing.",
      "accessCaveats": [
        "PFBC Section 1 publishes both Towanda Riverfront Park and Terrytown PFBC coordinates directly in the official access table.",
        "This route starts at a stronger town access but still finishes at a gravel PFBC landing. Confirm same-day footing, parking, and any local closures at both ends.",
        "PFBC treats 15 to 18 miles around the 2-foot Towanda level as more of an experienced-paddler day distance. Do not underrate the time commitment just because the river is broad and mostly open.",
        "Stay within the named public accesses and do not assume mid-route bars, islands, or informal pull-offs are legitimate take-out substitutes."
      ],
      "watchFor": [
        "Fast riffles before the bridge at mile 270, then more fast current at miles 269 and 268 flagged by PFBC.",
        "Towanda stages below about 1 foot, when the lower riverbed funnels current and can create class I to II style wave trains in shallow spots.",
        "Towanda stages above about 4 feet, when the corridor moves faster and small mistakes at the end of a long day cost more time; PFBC says novice paddlers should stay off above about 5 feet.",
        "Headwind, thunderstorms, floating wood, private shorelines, and missing the Terrytown PFBC take-out after relaxing into the long flatwater rhythm."
      ]
    }
  },
  "susquehanna-river-wysox-township-park-terrytown": {
    "putIn": {
      "name": "Wysox Township Park access",
      "latitude": 41.770833,
      "longitude": -76.397778
    },
    "takeOut": {
      "name": "Terrytown PFBC ramp",
      "latitude": 41.714167,
      "longitude": -76.281667
    },
    "logistics": {
      "distanceLabel": "About 13.6 mi",
      "estimatedPaddleTime": "About 4 hr to 6.5 hr in ordinary conditions, longer with headwind, low-water wave trains, or extra time checking the lower fast-riffle sections",
      "shuttle": "Stage the take-out at Terrytown PFBC first, then drive back to Wysox Township Park. Inspect both landings before launching because mud, flood cleanup, campground traffic, or local maintenance can change how straightforward the carry feels.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current PFBC, township-park, boating, and PFD rules.",
      "camping": "Riverside Acres Campground and the French Azilum Historical Site overnight stop are both listed on this official corridor. Treat that as on-route camping support only and not as permission to camp on broad gravel bars, islands, or private banks.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Wysox Township Park and take out at Terrytown PFBC for a lower Section 1 Susquehanna day with clean public endpoints. Use the direct Towanda stage gauge, keep the easiest planning days around 2 to 4 feet there, and watch the mile-267, mile-261, and mile-258 fast-water zones carefully.",
      "accessCaveats": [
        "PFBC and the North Branch guide family publish both Wysox Township Park and Terrytown PFBC coordinates directly in the official access tables.",
        "This is a public-access route, but French Azilum and Riverside Acres remain support points rather than the planned take-out. Stay committed to the Terrytown PFBC finish unless you have made a deliberate legal overnight plan.",
        "Terrytown is a gravel PFBC landing rather than a big municipal ramp. Confirm same-day footing, parking, and any local closure or maintenance issues before leaving the shuttle.",
        "The broad river still has private banks and islands away from the named accesses. Stay within the obvious public launch, campground, and finish zones only."
      ],
      "watchFor": [
        "A long fast-riffle section at mile 267, plus more fast riffles at miles 261 and 258 flagged by PFBC.",
        "Towanda stages below about 1 foot, when lower-riverbed shallows can create class I to II style wave trains and more exposed rocks.",
        "Towanda stages above about 4 feet, when current speeds up and the route stops feeling as forgiving; PFBC says novice paddlers should stay off above about 5 feet.",
        "Headwind, thunderstorms, floating wood, private shorelines, and drifting past the Terrytown PFBC finish after settling into the long lower-corridor rhythm."
      ]
    }
  },
  "susquehanna-river-wetlands-bloomsburg": {
    "putIn": {
      "name": "Wetlands Nature Area access",
      "latitude": 41.089444,
      "longitude": -76.1225
    },
    "takeOut": {
      "name": "PFBC Bloomsburg Access",
      "latitude": 40.996944,
      "longitude": -76.432222
    },
    "logistics": {
      "distanceLabel": "About 17 mi",
      "estimatedPaddleTime": "About 6 hr to 8.5 hr in ordinary conditions, longer with headwind, low-water scouting, or a slower shuttle into Bloomsburg",
      "shuttle": "Stage the take-out at the PFBC Bloomsburg ramp first, then drive back to Wetlands Nature Area. Inspect both accesses before launching because muddy footing, broad-river current, and same-day maintenance can change how practical the launch and finish feel.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current PFBC, park, boating, and PFD rules.",
      "camping": "Treat this as a day trip. The official PFBC Section 3 guide says camping on this corridor is none, and the route should not imply open riverbank camping between the named accesses.",
      "campingClassification": "none",
      "summary": "Launch at Wetlands Nature Area and take out at the PFBC Bloomsburg ramp for a long lower-corridor Susquehanna day. Use the direct Bloomsburg stage gauge, expect easier planning around 1 to 4 feet there, and keep the Berwick bridge ledge warning visible whenever the gauge is under 2 feet.",
      "accessCaveats": [
        "PFBC publishes the Wetlands Nature Area and PFBC Bloomsburg coordinates directly in the current North Branch section guides.",
        "Wetlands is a primitive river-right launch while Bloomsburg is a formal PFBC landing. Confirm same-day footing, parking, and carry angle before leaving vehicles at either end.",
        "This route crosses the Section 3 to Section 4 guide boundary but stays on one continuous public-access sequence and one direct lower-corridor stage gauge.",
        "Stay with the named public accesses rather than using islands or private banks as casual substitutes late in the day."
      ],
      "watchFor": [
        "About one-half mile before the Berwick-Nescopeck bridge, PFBC warns that the river drops over an exposed rock ledge when the Bloomsburg gauge is below 2 feet.",
        "Bloomsburg stages above about 4 to 5 feet, when current becomes faster and the long open-water miles feel less forgiving.",
        "Headwind, thunderstorms, floating wood, private shorelines, and fatigue from a longer exposed mainstem day.",
        "Any muddy or slippery footing at the primitive Wetlands launch or the Bloomsburg finish after rain or high water cleanup."
      ]
    }
  },
  "susquehanna-river-pfbc-bloomsburg-montgomery-park": {
    "putIn": {
      "name": "PFBC Bloomsburg Access",
      "latitude": 40.996681,
      "longitude": -76.432782
    },
    "takeOut": {
      "name": "Montgomery Park Municipal Access",
      "latitude": 40.959161,
      "longitude": -76.61964
    },
    "logistics": {
      "distanceLabel": "About 12.5 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr in ordinary conditions, longer with headwind, slower current, or extra time around the Danville finish",
      "shuttle": "Stage the take-out at Montgomery Park first, then drive back to the PFBC Bloomsburg ramp. Inspect both landings before launching because broad-river mud, ramp traffic, and same-day park conditions can change how easy the shuttle feels.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current PFBC, municipal, boating, and PFD rules.",
      "camping": "Indian Head Campground sits along this corridor and can support a legal overnight split if you have a current reservation or permission, but the standard Bloomsburg-to-Montgomery slug should still be planned as a day float.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at the PFBC Bloomsburg ramp and take out at Montgomery Park in Danville for a lower North Branch Susquehanna day. Use the direct Bloomsburg gauge, keep the easiest planning days around 1 to 4 feet there, and expect wind plus private-island discipline to matter more than the easy rating suggests.",
      "accessCaveats": [
        "Susquehanna Greenway publishes this exact public route and the current 2021 North Branch guide publishes the PFBC Bloomsburg and Montgomery Park coordinates directly in the access table.",
        "The route passes multiple private islands. Susquehanna Greenway says not to stop on the islands even when the water looks inviting or low.",
        "Montgomery Park is the intended finish, not just a backup carry. Do not assume the nearby PFBC Danville ramp or private banks make the route interchangeable on the fly.",
        "Broad-river wind can erase much of the easy-current feel, especially if you launch late or take a relaxed pace downstream."
      ],
      "watchFor": [
        "Bloomsburg stages above about 4 to 6 ft, when current gets faster and the longer open-water miles feel less forgiving for novice groups.",
        "Headwind, thunderstorms, floating wood, flooded trees after rain, and muddy footing at Montgomery Park after recent high water.",
        "Private islands and banks between Bloomsburg and Danville, plus the temptation to treat them as casual lunch or emergency stops.",
        "Fishing Creek hazards such as Boone's Dam stay off this main route, but do not mistake side-water or tributary mouths for usable exits."
      ]
    }
  },
  "susquehanna-river-test-track-indian-head": {
    "putIn": {
      "name": "Test Track Park",
      "latitude": 41.04,
      "longitude": -76.261111
    },
    "takeOut": {
      "name": "Indian Head Campground",
      "latitude": 40.975,
      "longitude": -76.469444
    },
    "logistics": {
      "distanceLabel": "About 12 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr in ordinary conditions, longer with headwind, low-water scouting, or a slower shuttle around the campground landing",
      "shuttle": "Stage the take-out at Indian Head Campground first, then drive back to Test Track Park. Confirm same-day campground access expectations before launching if your group is only using the site as a take-out rather than staying there.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current PFBC, campground, boating, and PFD rules.",
      "camping": "Indian Head Campground is the route endpoint and can work as a conservative overnight base if you have a legal reservation or permission. Treat the water-trail route itself as a day float rather than assuming open riverbank camping.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Test Track Park and take out at Indian Head Campground for a longer Section 4 North Branch day. Use the direct Bloomsburg gauge, expect easier big-river conditions around 1 to 4 feet, and pay attention to the Berwick bridge ledge warning when water is under 2 feet.",
      "accessCaveats": [
        "The PFBC Section 4 guide publishes both Test Track Park and Indian Head Campground coordinates directly in the official access table.",
        "The downstream take-out is tied to a private campground operation even though PFBC uses it as a water-trail access point. Respect current campground signs, parking rules, and any same-day staff instructions.",
        "This route is materially longer than either adjacent Section 4 slug. Wind, thunderstorms, and a slow campground shuttle can dominate the day more than the current number suggests.",
        "Stay within named public or customary access areas rather than improvising on nearby private banks or side landings."
      ],
      "watchFor": [
        "About one-half mile before the Berwick-Nescopeck bridge, PFBC warns that the river drops over an exposed rock ledge when the Bloomsburg gauge is below 2 ft.",
        "Bloomsburg stages above about 4 to 5 ft, when current becomes faster and the long open-water miles feel less forgiving.",
        "Broad-river wind, thunderstorms, floating wood, muddy or slippery footing at the campground landing after rain, and the risk of overshooting the Indian Head finish if you relax late in the run.",
        "Private shorelines and islands between the named endpoints and the need to keep enough daylight for the longer shuttle-and-finish day."
      ]
    }
  },
  "susquehanna-river-danville-montgomery-shikellamy-north": {
    "putIn": {
      "name": "Montgomery Park Municipal Access",
      "latitude": 40.959161,
      "longitude": -76.61964
    },
    "takeOut": {
      "name": "Shikellamy State Park North Access",
      "latitude": 40.880559,
      "longitude": -76.789685
    },
    "logistics": {
      "distanceLabel": "About 11.2 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr in ordinary conditions, longer with wind on Lake Augusta, slower pool current, or a busy state-park finish",
      "shuttle": "Stage the take-out at Shikellamy State Park North first, then drive back to Montgomery Park. Inspect both carries before launching because the lower miles can feel materially longer when wind, boat wakes, or slower pool current build.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current PFBC, state-park, municipal, boating, and PFD rules.",
      "camping": "Treat this as a day float. Wray's Riverfront Campground and Fantasy Island Campground are corridor support options, but the route itself should not imply open riverbank camping or a guaranteed mid-route overnight stop.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Montgomery Park in Danville and finish at Shikellamy State Park North for a lower Section 14 Susquehanna day. Use the Danville gauge as the official same-section reference, keep the easiest planning days around 2 to 4 feet there, and treat Lake Augusta wind plus Fabridam take-out discipline as the key same-day checks.",
      "accessCaveats": [
        "The current 2021 North Branch guide lists Montgomery Park to Shikellamy North as a favorite public day trip and publishes both endpoint coordinates in the access table.",
        "Shikellamy State Park North is primarily a canoe and kayak finish near the island. Stay alert for bridge current, motorboats, and other users as you approach.",
        "This route uses Danville as the official same-section gauge reference even though the lower miles flatten into Lake Augusta before the take-out.",
        "Keep the finish explicit before launching. The lower river feels forgiving when the current slows, but the wrong drift line can carry you past the intended state-park access zone."
      ],
      "watchFor": [
        "Danville stages below about 2 ft, when the lower pool gets slower and the route becomes more exposed to wind and shallow rock decisions.",
        "Danville stages above about 4 ft, when current speeds up and the lower finish becomes less forgiving for novice groups.",
        "Wind and motorboat wakes on Lake Augusta, floating wood, and bridge-approach congestion near the final Shikellamy North take-out.",
        "Missing the planned access and continuing downstream toward Sunbury Fabridam, which is not part of this route."
      ]
    }
  },
  "susquehanna-river-riverside-borough-shikellamy-north": {
    "putIn": {
      "name": "Riverside Borough Access",
      "latitude": 40.962389,
      "longitude": -76.633444
    },
    "takeOut": {
      "name": "Shikellamy State Park North Access",
      "latitude": 40.880559,
      "longitude": -76.789685
    },
    "logistics": {
      "distanceLabel": "About 10.2 mi",
      "estimatedPaddleTime": "About 5.5 hr in ordinary conditions, longer with low-water stone dodging, Lake Augusta wind, or a slow state-park finish",
      "shuttle": "Stage the take-out at Shikellamy State Park North first, then drive back to Riverside Borough Access. The Riverside launch has only brief unload space, so inspect both parking plans before committing to the shuttle.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current PFBC, state-park, borough, boating, and PFD rules.",
      "camping": "Treat this as a day trip. The Susquehanna Greenway route page points paddlers toward nearby Danville and Shikellamy-area services, but it does not advertise camping as part of the route plan.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Riverside Borough Access and finish at Shikellamy State Park North for a moderate lower North Branch day. Use the Danville gauge as the official route reference, keep the same-day call conservative near the 2 ft floor, and watch the lower islands, Packers Island split, and busy Shikellamy finish closely.",
      "accessCaveats": [
        "Susquehanna Greenway publishes this exact public route and says the Riverside launch is a carry-in with timed unloading before you move vehicles to the designated pull-off.",
        "The launch slope can be muddy or slippery, especially after rain or when the concrete slab does not stay fully in the water.",
        "Shikellamy State Park North is primarily for kayaks and canoes. Stay cautious around motorized traffic near the island and the final bridge approach.",
        "A state launch permit is required at the Shikellamy take-out, and the intended finish is upstream of Sunbury Fabridam."
      ],
      "watchFor": [
        "Island banks, ledges, and stones in low water, especially near river mile 133 and again near Packers Island in the lower miles.",
        "Motorized boat traffic and wind on seasonal Lake Augusta, which can flatten the current advantage and make the final miles feel longer.",
        "The lower split around Packers Island; keep right where the route page says to avoid wrong turns and extra shallow-water problems.",
        "Missing the Shikellamy North take-out and continuing downstream toward Sunbury Fabridam."
      ]
    }
  },
  "juniata-river-lewistown-narrows-newport": {
    "putIn": {
      "id": "lewistown-narrows-pfbc-ramp",
      "name": "Lewistown Narrows PFBC ramp",
      "latitude": 40.603889,
      "longitude": -77.487778
    },
    "takeOut": {
      "id": "newport-primitive-access",
      "name": "Newport access",
      "latitude": 40.479167,
      "longitude": -77.129444
    },
    "logistics": {
      "distanceLabel": "About 28 mi",
      "estimatedPaddleTime": "About 8 hr to 10.5 hr in ordinary conditions, longer with low-water scraping, broad-river headwind, or time spent easing through the mile-33 and mile-10.5 caution zones",
      "shuttle": "Stage the take-out at the Newport primitive access first, then drive back upstream to the Lewistown Narrows PFBC ramp. Confirm same-day parking and the intended final line into Newport before launching because the lower miles are broad and easy to drift past when tired.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current PFBC, boating, and PFD rules.",
      "camping": "Buttonwood Campground and River Rock Campground near Mexico plus Pittman's Riverside and Little Buffalo near Newport give this full corridor real legal overnight support if you want to split it conservatively.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Lewistown Narrows and take out at Newport for a full lower-Juniata corridor run. The app uses the Newport gauge conservatively as a downstream same-river reference and expects scratching whenever that corridor sits under PFBC's 3.5 ft minimum.",
      "accessCaveats": [
        "PFBC publishes both Lewistown Narrows and Newport coordinates directly in the official lower Juniata access table.",
        "The gauge story here stays conservative because Newport sits at the downstream end of this longer route, not near the put-in.",
        "Buttonwood, River Rock, Pittman's Riverside, and Little Buffalo are legal support points, but Newport remains the intended take-out for this slug.",
        "Use the named public accesses rather than islands, bars, or roadside guesses."
      ],
      "watchFor": [
        "Rapid current near mile 33 in the upper half of the route plus the lower ledge/current feature near mile 10.5 as the river approaches Newport.",
        "Newport stages below about 3.5 ft, when shallow bars, ledge lines, and broad lower pools become scratchier and slower.",
        "Fresh wood after storms, broad-river headwind on the open lower bends, and primitive landing footing at Newport.",
        "Private shorelines away from the named accesses and the chance of overshooting the Newport finish if you relax late in the run."
      ]
    },
    "accessPoints": [
      {
        "id": "lewistown-narrows-pfbc-ramp",
        "name": "Lewistown Narrows PFBC ramp",
        "latitude": 40.603889,
        "longitude": -77.487778,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default full-corridor put-in."
      },
      {
        "id": "mifflin-ramp",
        "name": "Mifflin ramp",
        "latitude": 40.569167,
        "longitude": -77.401111,
        "mileFromStart": 6,
        "segmentKind": "creek",
        "note": "Intermediate public access."
      },
      {
        "id": "walker-pfbc-ramp",
        "name": "Walker PFBC ramp",
        "latitude": 40.531944,
        "longitude": -77.357222,
        "mileFromStart": 10,
        "segmentKind": "creek",
        "note": "Intermediate public access."
      },
      {
        "id": "muskrat-springs-pfbc-ramp",
        "name": "Muskrat Springs PFBC ramp",
        "latitude": 40.535,
        "longitude": -77.299444,
        "mileFromStart": 14,
        "segmentKind": "creek",
        "note": "Intermediate public access."
      },
      {
        "id": "thompsontown-pfbc-ramp",
        "name": "Thompsontown PFBC ramp",
        "latitude": 40.554167,
        "longitude": -77.235833,
        "mileFromStart": 18,
        "segmentKind": "creek",
        "note": "Intermediate public access before the lower Newport reach."
      },
      {
        "id": "newport-primitive-access",
        "name": "Newport access",
        "latitude": 40.479167,
        "longitude": -77.129444,
        "mileFromStart": 28,
        "segmentKind": "creek",
        "note": "Default full-corridor take-out."
      }
    ]
  },
  "juniata-river-mifflintown-muskrat-springs": {
    "putIn": {
      "id": "mifflintown-pfbc-ramp",
      "name": "Mifflintown PFBC ramp",
      "latitude": 40.595,
      "longitude": -77.415278
    },
    "takeOut": {
      "id": "muskrat-springs-pfbc-ramp",
      "name": "Muskrat Springs PFBC ramp",
      "latitude": 40.535,
      "longitude": -77.299444
    },
    "logistics": {
      "distanceLabel": "About 10 mi",
      "estimatedPaddleTime": "About 4 hr to 5.5 hr in ordinary conditions, longer if low water forces scraping or if broad-river wind stalls progress through the Mexico bends",
      "shuttle": "Stage the take-out at Muskrat Springs PFBC first, then drive back upstream to the Mifflintown PFBC ramp. Check both ramp edges before leaving a vehicle because muddy approaches and river angle can change after rain.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current PFBC, boating, and PFD rules.",
      "camping": "Buttonwood Campground and River Rock Campground sit along the route near Mexico and are the clearest legal overnight support if you want to turn this longer link into a conservative camping-supported float.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Mifflintown and take out at Muskrat Springs PFBC for a fuller lower-Juniata day. The app uses the Lewistown gauge conservatively as an upstream same-river proxy and expects scraping whenever that corridor sits under PFBC's 3.1 ft minimum.",
      "accessCaveats": [
        "PFBC publishes both Mifflintown and Muskrat Springs coordinates directly in the official lower Juniata access table.",
        "The gauge story here stays conservative because Lewistown is upstream of this route, not on top of it.",
        "River Rock and Buttonwood are legal support points near Mexico, but Muskrat Springs is the intended finish for this slug.",
        "Use only the named public accesses rather than bars, private banks, or informal roadside pull-offs."
      ],
      "watchFor": [
        "Rapid current near mile 33, the main caution point PFBC flags in this corridor.",
        "Low water under the conservative Lewistown 3.1 ft proxy floor, when broad cobble bars and slower channels can force dragging.",
        "Fresh wood after storms, broad-river headwind through the exposed bends, and muddy landing edges at the PFBC ramps.",
        "Private shorelines away from the named public accesses and the temptation to stop early once the Mexico campground corridor comes into view."
      ]
    }
  },
  "juniata-river-millerstown-amity-hall": {
    "putIn": {
      "id": "millerstown-community-park-access",
      "name": "Millerstown Community Park access",
      "latitude": 40.54,
      "longitude": -77.149722
    },
    "takeOut": {
      "id": "amity-hall-pfbc-ramp",
      "name": "Amity Hall PFBC ramp",
      "latitude": 40.430833,
      "longitude": -77.013333
    },
    "logistics": {
      "distanceLabel": "About 15 mi",
      "estimatedPaddleTime": "About 5 hr to 7.5 hr in ordinary conditions, longer with low-water scraping, broad-river headwind, or time spent easing through the mile-10.5 and mile-5 caution zones",
      "shuttle": "Stage the take-out at the Amity Hall PFBC ramp first, then drive back upstream to Millerstown Community Park. Confirm the intended downstream finish before launching so you do not improvise on private shoreline once the lower river opens up.",
      "permits": "PFBC says unpowered boats using PFBC or Pennsylvania State Parks and Forests access areas need boat registration, a PFBC launch permit, or a DCNR State Parks launch permit. Follow current PFBC, boating, and PFD rules.",
      "camping": "Green Valley Campground sits on the route near mile 6 and is the clearest legal overnight support if you want to split this longer lower-Juniata corridor conservatively.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Millerstown Community Park and take out at Amity Hall PFBC for a full lower-Juniata corridor run. Use the direct Newport gauge and expect scraping whenever the river sits under PFBC's 3.5 ft minimum.",
      "accessCaveats": [
        "PFBC publishes both Millerstown and Amity Hall coordinates directly in the official lower Juniata access table.",
        "Green Valley is a legal mid-route campground/support point, not the intended finish for this slug.",
        "This is a longer broad-river day than the mileage can make it sound, especially if wind or low-water bars slow progress.",
        "Stay with the named public accesses rather than using private banks or islands as substitute stops."
      ],
      "watchFor": [
        "Rapid current falling over a ledge near mile 10.5 plus the lower outcrop-and-ledge zone near miles 5.5 and 5, all flagged by PFBC as potentially hazardous current areas.",
        "Newport stages below about 3.5 ft, when shallow bars and ledge lines become scratchier and slower.",
        "Broad-river headwind, fresh wood after storms, and the need to hold the correct line through the lower outcrop zone near the Amity Hall finish.",
        "Private shorelines away from the named accesses and the chance of taking out too early at Green Valley if you are aiming for the full run to Amity Hall."
      ]
    },
    "accessPoints": [
      {
        "id": "millerstown-community-park-access",
        "name": "Millerstown Community Park access",
        "latitude": 40.54,
        "longitude": -77.149722,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default full-corridor put-in."
      },
      {
        "id": "green-valley-ramp",
        "name": "Green Valley access",
        "latitude": 40.479167,
        "longitude": -77.054722,
        "mileFromStart": 11,
        "segmentKind": "creek",
        "note": "Intermediate campground-side access for shorter trips."
      },
      {
        "id": "amity-hall-pfbc-ramp",
        "name": "Amity Hall PFBC ramp",
        "latitude": 40.430833,
        "longitude": -77.013333,
        "mileFromStart": 15,
        "segmentKind": "creek",
        "note": "Default full-corridor take-out."
      }
    ]
  }
};
