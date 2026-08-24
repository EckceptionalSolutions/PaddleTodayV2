// State-scoped route data. Keep entries in route-family and downstream order.
import type { River } from '../../lib/types';

export const utahRoutes: River[] = [
  {
    "id": "ogden-river-lorin-farr-crystal-wave",
    "slug": "ogden-river-lorin-farr-crystal-wave",
    "name": "Ogden River",
    "reach": "Lorin Farr Park to Crystal Wave Kayak Park",
    "aliases": [
      "Ogden River town section",
      "Lorin Farr to Crystal Wave",
      "Ogden urban section"
    ],
    "state": "Utah",
    "region": "Ogden / Wasatch Front",
    "routeType": "whitewater",
    "summary": "Short urban Class II+ Ogden River section from Lorin Farr Park to Crystal Wave. American Whitewater documents the 1.3-mile town reach, access coordinates, hazards, and a direct runnable band on USGS 10140700; Ogden City confirms Lorin Farr Park and the Crystal Wave Kayak Park corridor.",
    "statusText": "Use the Ogden River near Gibson Avenue gauge as the direct town-section check. AW's embedded gauge band starts at 150 cfs and ends at 650 cfs; Paddle Today treats 150-520 cfs as the preferred window because AW calls out the Lincoln Avenue bridge/portage issue above 520 cfs.",
    "latitude": 41.236,
    "longitude": -111.96,
    "gaugeSource": {
      "id": "usgs-10140700",
      "provider": "usgs",
      "siteId": "10140700",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Ogden River NR Gibson Avenue at Ogden, UT",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-10140700/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "mandatory_takeout",
        "strainers",
        "dam",
        "urban_water_quality"
      ],
      "safetyNotes": [
        "Treat this as an urban Class II+ whitewater run, not a casual flatwater float; scout the Crystal Wave finish and any bridges before launching.",
        "American Whitewater warns that the Lincoln Avenue bridge becomes a portage issue above about 520 cfs and has limited clearance around 550 cfs.",
        "Finish at Crystal Wave unless the group has already scouted downstream wood, brushy meanders, the Weber confluence, and the diversion dam farther downstream."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 150,
      "idealMax": 520,
      "tooLow": 150,
      "tooHigh": 650,
      "thresholdSource": {
        "label": "American Whitewater Ogden River Lorin Farr-to-Crystal Wave gauge band",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/10903/main",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "The Ogden town section is most useful during irrigation/snowmelt-supported and storm-boosted periods. Because it is urban and bridge-constrained, check the latest gauge trend, weather, and visible wood before putting on.",
      "difficulty": "moderate",
      "difficultyNotes": "American Whitewater rates the section Class II+. It can be a learning run at low-to-medium flows, but the route is still filtered as whitewater because it has surf features, bridge-clearance concerns, fishhooks/wood, and a mandatory urban take-out.",
      "confidenceNotes": "Confidence is high for a conservative whitewater add: American Whitewater names the Lorin Farr-to-Crystal Wave town section, embeds a 150-650 cfs runnable band tied to USGS 10140700, publishes put-in and take-out coordinates, and includes bridge/wood/downstream-dam warnings. Ogden City confirms Lorin Farr Park amenities and publishes a Crystal Wave Kayak Park map, while Weber State corroborates the 1.5-mile Lorin Farr-to-Crystal Wave paddling/tubing section. Camping confidence is high for none because Ogden public-property camping is prohibited outside approved campgrounds."
    },
    "evidenceNotes": [
      {
        "label": "Live gauge",
        "value": "USGS 10140700 at 326 cfs / 7.26 ft",
        "note": "USGS Water Services returned Ogden River near Gibson Avenue discharge and gage height at 01:45 MDT on 2026-08-09.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-10140700/"
      },
      {
        "label": "Route shape",
        "value": "Lorin Farr to Crystal Wave, 1.3 miles",
        "note": "American Whitewater names the town-section reach, rates it Class II+, and describes Crystal Wave as the normal end of the section.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/10903/main"
      },
      {
        "label": "Endpoint coordinates",
        "value": "41.23600, -111.96000 to 41.23300, -111.98200",
        "note": "American Whitewater publishes exact access-point coordinates for the put-in and take-out; Ogden City separately confirms Lorin Farr Park and the Crystal Wave Kayak Park corridor.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/111972"
      },
      {
        "label": "Threshold posture",
        "value": "150-520 cfs preferred; 650 cfs high cutoff",
        "note": "AW embeds a 150-650 cfs runnable band for the direct Gibson Avenue gauge. Paddle Today caps the preferred range at 520 cfs because AW warns the Lincoln Avenue bridge becomes a portage issue above that level.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/10903/main"
      },
      {
        "label": "Camping",
        "value": "No route camping",
        "note": "Ogden City code prohibits camping on public property outside approved campgrounds, and this short urban route is framed as a same-day parkway run.",
        "sourceUrl": "https://codelibrary.amlegal.com/codes/ogdencityut/latest/ogdencity_ut/0-0-0-11411"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded Ogden City, AW, Weber State, Commons, and same-route web review found route context but no clearly rights-clean exact Lorin-Farr-to-Crystal-Wave paddling asset selected for local reuse.",
        "sourceUrl": "https://www.ogdencity.gov/DocumentCenter/View/6665/Crystal-Wave-Kayak-Park"
      }
    ],
    "sourceLinks": [
      {
        "label": "American Whitewater Ogden Lorin Farr to Crystal Wave",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/10903/main",
        "provider": "american_whitewater"
      },
      {
        "label": "USGS 10140700 Ogden River near Gibson Avenue",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-10140700/",
        "provider": "usgs"
      },
      {
        "label": "Ogden City Lorin Farr Park",
        "url": "https://www.ogdencity.gov/3289/Lorin-Farr-Park-Reservable",
        "provider": "local"
      },
      {
        "label": "Ogden City Crystal Wave Kayak Park map",
        "url": "https://www.ogdencity.gov/DocumentCenter/View/6665/Crystal-Wave-Kayak-Park",
        "provider": "local"
      },
      {
        "label": "Weber State Ogden River urban section",
        "url": "https://www.weber.edu/outdoor/aquatic-rec.html",
        "provider": "local"
      },
      {
        "label": "Ogden City camping and related activities code",
        "url": "https://codelibrary.amlegal.com/codes/ogdencityut/latest/ogdencity_ut/0-0-0-11411",
        "provider": "local"
      }
    ]
  },
  {
    "id": "south-fork-ogden-river-willows-magpie",
    "slug": "south-fork-ogden-river-willows-magpie",
    "name": "South Fork Ogden River",
    "reach": "Willows Campground to Magpie Campground",
    "aliases": [
      "South Fork Ogden campground float",
      "Willows to Magpie",
      "Causey to Huntsville upper public complex"
    ],
    "state": "Utah",
    "region": "Ogden Valley / Uinta-Wasatch-Cache National Forest",
    "routeType": "whitewater",
    "summary": "Public South Fork Ogden River campground-complex run from Willows Campground downstream to Magpie Campground. The Forest Service publishes both campground coordinates, states the river flows through or adjacent to the campgrounds, and requires life jackets for South Fork floating/tubing; American Whitewater documents the broader Causey Reservoir-to-Huntsville Class II-III(IV) reach on direct USGS 10137500.",
    "statusText": "Use South Fork Ogden River near Huntsville as the direct gauge. Today's 50.4 cfs reading is below the conservative 175 cfs minimum from AW trip-report evidence, so expect a no-go/too-low result until releases or runoff improve.",
    "latitude": 41.292013,
    "longitude": -111.634697,
    "gaugeSource": {
      "id": "usgs-10137500",
      "provider": "usgs",
      "siteId": "10137500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "South Fork Ogden River Near Huntsville, UT",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-10137500/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "low_water",
        "cold_water",
        "private_banks"
      ],
      "safetyNotes": [
        "Treat this as a narrow mountain whitewater/swiftwater run, not a casual tube float; the app intentionally keeps it behind whitewater filtering.",
        "American Whitewater reports Class II-III(IV) character on the broader reach, with strainers, low bridges, a log-jam/bridge-portage history, and a private-sensitive lower take-out.",
        "Stay within the public Forest Service campground complex from Willows to Magpie and do not continue downstream toward private Huntsville Hollow take-outs unless separately scouted and legally confirmed."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 175,
      "thresholdSource": {
        "label": "American Whitewater South Fork Ogden trip-report minimum context",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/1862/main",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        4,
        5,
        6,
        7
      ],
      "seasonNotes": "The South Fork Ogden is most plausible during spring runoff, reservoir-supported releases, or short-lived rain boosts. Summer base flow can be far below the practical floor, so check the live gauge trend, weather, and Forest Service access status before staging.",
      "difficulty": "hard",
      "difficultyNotes": "American Whitewater rates the broader Causey Reservoir-to-Huntsville run Class II-III(IV). This campground-to-campground card avoids the private-sensitive lower finish but still has swift current, cold water, strainers, low bridges, and low-water scraping risk.",
      "confidenceNotes": "Confidence is high for public endpoints, live gauge identity, camping status, and safety posture because the Forest Service publishes Willows and Magpie coordinates and river-floating context, USGS 10137500 returned same-day discharge/stage, and American Whitewater documents the broader reach and direct gauge. Threshold confidence is intentionally conservative: the app uses a 175 cfs minimum-only floor from AW trip-report evidence and withholds ideal/high bands."
    },
    "evidenceNotes": [
      {
        "label": "Live gauge",
        "value": "USGS 10137500 at 50.4 cfs / 1.42 ft",
        "note": "USGS Water Services returned South Fork Ogden River near Huntsville discharge and gage height at 00:15 MDT on 2026-08-14.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-10137500/"
      },
      {
        "label": "Route shape",
        "value": "Willows Campground to Magpie Campground",
        "note": "Forest Service pages place the South Fork complex campgrounds in west-to-east order and state the river flows through or adjacent to the endpoints; AW separately documents the broader 7.5-mile Causey-to-Huntsville whitewater reach.",
        "sourceUrl": "https://www.fs.usda.gov/r04/uinta-wasatch-cache/recreation/willows-campground"
      },
      {
        "label": "Endpoint coordinates",
        "value": "41.292013, -111.634697 to 41.270264, -111.667206",
        "note": "Forest Service publishes latitude/longitude for Willows Campground and Magpie Campground. Stored points are arrival/access anchors; use signed campground river access and current host or posted guidance for the actual water-entry and landing paths.",
        "sourceUrl": "https://www.fs.usda.gov/r04/uinta-wasatch-cache/recreation/magpie-campground"
      },
      {
        "label": "Camping",
        "value": "Endpoint campgrounds, reservation/fee rules, 7-day limits",
        "note": "Forest Service pages list seasonal campground operations, reservations, fees/current-availability referral, potable water/vault toilets where available, gate/quiet-hour rules, and a 7-day stay limit at Willows.",
        "sourceUrl": "https://www.fs.usda.gov/r04/uinta-wasatch-cache/recreation/willows-campground"
      },
      {
        "label": "Safety",
        "value": "PFD-required South Fork floating plus AW whitewater hazards",
        "note": "Forest Service South Fork pages require life jackets for floating/tubing, while AW reports Class II-III(IV) character, strainers, low bridges, and private-sensitive lower take-out history on the broader reach.",
        "sourceUrl": "https://www.fs.usda.gov/r04/uinta-wasatch-cache/recreation/south-fork-ogden-river"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded Forest Service, AW, Commons, and same-route web review found route/context photos but no clearly rights-clean exact Willows-to-Magpie paddling asset selected for local reuse.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=South+Fork+Ogden+River+kayak"
      }
    ],
    "sourceLinks": [
      {
        "label": "American Whitewater South Fork Ogden Causey to Huntsville",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/1862/main",
        "provider": "american_whitewater"
      },
      {
        "label": "USGS 10137500 South Fork Ogden River near Huntsville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-10137500/",
        "provider": "usgs"
      },
      {
        "label": "Forest Service South Fork Ogden River",
        "url": "https://www.fs.usda.gov/r04/uinta-wasatch-cache/recreation/south-fork-ogden-river",
        "provider": "local"
      },
      {
        "label": "Forest Service Willows Campground",
        "url": "https://www.fs.usda.gov/r04/uinta-wasatch-cache/recreation/willows-campground",
        "provider": "local"
      },
      {
        "label": "Forest Service Magpie Campground",
        "url": "https://www.fs.usda.gov/r04/uinta-wasatch-cache/recreation/magpie-campground",
        "provider": "local"
      }
    ]
  },
  {
    "id": "colorado-river-hittle-bottom-takeout-beach",
    "slug": "colorado-river-hittle-bottom-takeout-beach",
    "name": "Colorado River",
    "reach": "Hittle Bottom to Takeout Beach",
    "aliases": [
      "Moab Daily",
      "Fisher Towers section",
      "Hittle Bottom to Take-Out Beach"
    ],
    "state": "Utah",
    "region": "Moab / Professor Valley",
    "routeType": "whitewater",
    "summary": "Classic Moab Daily run through Professor Valley. BLM documents the 13-mile Hittle Bottom-to-Takeout Beach section, its Class I-III rapids, camping rules, and managed public access facilities; USGS 09180500 near Cisco is the product-supported upstream Colorado River gauge.",
    "statusText": "Use Colorado River near Cisco as the upstream same-river flow check. Published Moab Daily guidance treats about 2,000 cfs as the recommended floor; Paddle Today uses that as a conservative minimum-only threshold and withholds ideal/high confidence.",
    "latitude": 38.7607,
    "longitude": -109.326,
    "gaugeSource": {
      "id": "usgs-09180500",
      "provider": "usgs",
      "siteId": "09180500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Colorado River near Cisco, UT",
      "detailUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=09180500"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "fast_rise",
        "remote"
      ],
      "safetyNotes": [
        "BLM says the Moab Daily can range from Class I to Class III depending on season and water level; treat it as a whitewater route even when flows are low.",
        "Wear life jackets at all times, carry spare propulsion, repair/bailing gear, and a first-aid kit as listed on the BLM river-runner map.",
        "The Cisco gauge is upstream of the route and the river can change with tributary inflow, wind, heat, storms, and commercial traffic. Make a same-day visual call at Hittle Bottom and confirm BLM access conditions."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 2000,
      "thresholdSource": {
        "label": "Published Moab Daily recommended-flow context paired with BLM route map",
        "url": "https://www.whitewaterguidebook.com/utah/moab-daily/",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "seasonNotes": "The Moab Daily is commonly run spring through fall, with snowmelt and storm pulses changing character. Low summer/fall water can expose rocks and sandbars; higher water makes the rapids faster and more consequential.",
      "difficulty": "moderate",
      "difficultyNotes": "This is a popular first-river-trip corridor, but BLM documents Class I-III rapids and whitewater safety gear. The card is marked whitewater so casual discovery does not flatten the route into a simple scenic float.",
      "confidenceNotes": "Confidence is high for route shape, public access, camping rules, and live-gauge availability: BLM maps Hittle Bottom to Takeout Beach as the 13-mile Moab Daily and lists managed facilities along the entire stretch, American Whitewater provides endpoint coordinates and ties the Professor Valley corridor to USGS 09180500, and USGS Water Services returned same-day 2026-08-06 discharge/stage. Threshold confidence stays mixed because the numeric 2,000 cfs floor comes from published guide context rather than an official BLM flow ladder."
    },
    "evidenceNotes": [
      {
        "label": "Live gauge",
        "value": "USGS 09180500 at 1,140 cfs / 1.50 ft",
        "note": "USGS Water Services returned Colorado River near Cisco values at 17:00 MDT on 2026-08-06. The gauge is upstream of the Hittle-to-Takeout split but inside the AW Professor Valley corridor that contains the Moab Daily.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=09180500"
      },
      {
        "label": "Route shape",
        "value": "Moab Daily, 13 miles",
        "note": "The BLM river-runner map says the Moab Daily, also called the Fisher Towers section, runs from Hittle Bottom to Takeout Beach and is Utah's most popular river trip.",
        "sourceUrl": "https://www.blm.gov/sites/default/files/documents/files/MoabDailyMap.pdf"
      },
      {
        "label": "Endpoint coordinates",
        "value": "38.76070, -109.32600 to 38.66174, -109.50074",
        "note": "American Whitewater publishes Hittle Bottoms access and Take-Out Beach access coordinates; BLM separately confirms both as maintained access facilities on the Moab Daily. Coordinate audit placed Hittle Bottom 23 ft from the matched Colorado River flowline and Takeout Beach 111 ft from the matched flowline but within 50 ft of the NHD waterbody.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/1841/main"
      },
      {
        "label": "Camping",
        "value": "Designated river camps, sandbars, and developed campgrounds only",
        "note": "BLM restricts river-right camping to designated sites and sandbars, river-left camping to developed campgrounds, requires firepans and toilet systems for overnight trips, and limits trips to 14 days.",
        "sourceUrl": "https://www.blm.gov/sites/default/files/documents/files/MoabDailyMap.pdf"
      },
      {
        "label": "Threshold posture",
        "value": "Minimum-only at 2,000 cfs",
        "note": "Published Moab Daily guide context gives 2,000 cfs as the recommended low end. The app uses that as a floor only because BLM does not publish a formal scoring ladder.",
        "sourceUrl": "https://www.whitewaterguidebook.com/utah/moab-daily/"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded BLM, AW, Commons, and same-route web review found useful context photos but no clearly rights-clean exact Hittle-Bottom-to-Takeout-Beach paddling asset selected for local reuse.",
        "sourceUrl": "https://www.blm.gov/sites/default/files/documents/files/MoabDailyMap.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "USGS 09180500 Colorado River near Cisco current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=09180500",
        "provider": "usgs"
      },
      {
        "label": "BLM Moab Daily river-runner map",
        "url": "https://www.blm.gov/sites/default/files/documents/files/MoabDailyMap.pdf",
        "provider": "local"
      },
      {
        "label": "BLM Hittle Bottom Recreation Site",
        "url": "https://www.blm.gov/visit/hittle-bottom-recreation-site",
        "provider": "local"
      },
      {
        "label": "American Whitewater Professor Valley / Moab Daily corridor",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/1841/main",
        "provider": "american_whitewater"
      },
      {
        "label": "Whitewater Guidebook Moab Daily level guidance",
        "url": "https://www.whitewaterguidebook.com/utah/moab-daily/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "green-river-flaming-gorge-dam-little-hole",
    "slug": "green-river-flaming-gorge-dam-little-hole",
    "name": "Green River",
    "reach": "Flaming Gorge Dam / Spillway Boat Launch to Little Hole",
    "aliases": [
      "Green River A Section",
      "Spillway Boat Launch to Little Hole"
    ],
    "state": "Utah",
    "region": "Northeastern Utah",
    "routeType": "whitewater",
    "summary": "Cold, clear tailwater day float on the Green River A Section below Flaming Gorge Dam. Ashley National Forest and Recreation.gov document the exact 7-mile Spillway-to-Little-Hole route, and the Greendale USGS gauge is immediately below the dam.",
    "statusText": "Use the Green River near Greendale gauge as the direct tailwater check. American Whitewater showed this reach runnable around 1,000 cfs; Paddle Today treats 1,000 cfs as a conservative minimum and does not claim an ideal or high-water band.",
    "latitude": 40.90885,
    "longitude": -109.422256,
    "gaugeSource": {
      "id": "usgs-09234500",
      "provider": "usgs",
      "siteId": "09234500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Green River near Greendale, UT",
      "detailUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=09234500"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "dam_release",
        "whitewater",
        "fast_rise",
        "cold_water"
      ],
      "safetyNotes": [
        "Treat Section A as cold, swift Class I-II tailwater rather than a casual float; Recreation.gov requires a worn life jacket plus a bail bucket, throw line, and spare oar or paddle for launching.",
        "Check USGS 09234500 and the current Flaming Gorge release schedule immediately before launching. Reclamation says the 2026 release plan can fluctuate hourly and change with river conditions or forecasts.",
        "The 1,000 cfs value is only a conservative runnable minimum, not an ideal range or high-water clearance. During elevated releases, Reclamation warns that the below-dam river can run colder, higher, and swifter."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 1000,
      "thresholdSource": {
        "label": "American Whitewater Flaming Gorge-to-Lodore runnable-flow context on the Greendale gauge",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/1852/main",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "low",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "Flaming Gorge Dam gives this tailwater year-round release support, but daily release changes can raise the river quickly. Check current dam-release/gauge conditions, weather, and cold-water gear even in summer.",
      "difficulty": "moderate",
      "difficultyNotes": "Section A is generally Class I-II, but it is cold, swift dam-release water with required safety gear, heavy commercial dory traffic, busy ramps, and limited quick exits. It is hidden from default casual discovery because American Whitewater is the numeric threshold source and the route is swift tailwater rather than a simple flatwater float.",
      "confidenceNotes": "Confidence is high for a guarded Section A add: Ashley National Forest publishes coordinates for Spillway Boat Launch and Little Hole Boat Launch, Recreation.gov and Forest Service pages describe the exact 7-mile Flaming Gorge Dam-to-Little-Hole Section A route, USGS 09234500 is a direct gauge just below the dam with same-day May 30, 2026 discharge and stage on the legacy current-conditions page, and American Whitewater ties the broader Flaming Gorge reach to the same Greendale gauge. Threshold confidence is intentionally conservative because the source package supports a runnable minimum, not a full ideal/high band for this exact 7-mile app route."
    },
    "evidenceNotes": [
      {
        "label": "Live gauge",
        "value": "USGS 09234500 at 1,520 cfs / 9.01 ft",
        "note": "USGS legacy current conditions showed discharge and gage height at 07:30 MDT on May 30, 2026 for Green River near Greendale, UT, operated immediately below Flaming Gorge Dam.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=09234500"
      },
      {
        "label": "Route shape",
        "value": "Section A, 7 miles",
        "note": "Recreation.gov describes Section A as beginning just below Flaming Gorge Dam and proceeding seven miles through a narrow canyon to Little Hole, with Class I-II rapids.",
        "sourceUrl": "https://www.recreation.gov/camping/campgrounds/250036"
      },
      {
        "label": "Endpoint coordinates",
        "value": "40.90885, -109.422256 to 40.910719, -109.315144",
        "note": "Ashley National Forest publishes latitude/longitude for both Spillway Boat Launch Area and Little Hole Boat Launch Area.",
        "sourceUrl": "https://www.fs.usda.gov/r04/ashley/recreation/spillway-boat-launch-area"
      },
      {
        "label": "Access and fees",
        "value": "Flaming Gorge recreation use pass",
        "note": "The BLM/Forest Service Green River brochure says a Flaming Gorge Use Pass is required at Spillway and Little Hole, while Recreation.gov lists the route as non-motorized river running with required launch gear.",
        "sourceUrl": "https://www.blm.gov/sites/default/files/documents/files/floating_the_green_river_brochure.pdf"
      },
      {
        "label": "Safety rules",
        "value": "PFD, bailer, throw rope, spare oar/paddle",
        "note": "The BLM/Forest Service brochure and Recreation.gov warn that the river can rise without warning and require or recommend river-running safety equipment; inflatable PFDs are not allowed where PFD wear is required.",
        "sourceUrl": "https://www.blm.gov/sites/default/files/documents/files/floating_the_green_river_brochure.pdf"
      },
      {
        "label": "Current dam-release caution",
        "value": "2026 hourly release fluctuations",
        "note": "The Bureau of Reclamation says Flaming Gorge releases can fluctuate hourly, the release plan can change with conditions or forecasts, and elevated releases can make the Green River below the dam colder, higher, and swifter.",
        "sourceUrl": "https://www.usbr.gov/uc/water/crsp/cs/fgd.html"
      },
      {
        "label": "No camping",
        "value": "No camping on Section A",
        "note": "The BLM/Forest Service brochure states that River Section A has no camping, and the Little Hole trail guidance also prohibits camping and fires along the Spillway-to-Little-Hole trail section.",
        "sourceUrl": "https://www.blm.gov/sites/default/files/documents/files/floating_the_green_river_brochure.pdf"
      },
      {
        "label": "Threshold posture",
        "value": "Minimum-only at 1,000 cfs",
        "note": "American Whitewater tied the reach to the Greendale gauge and showed the broader Flaming Gorge-to-Lodore reach runnable at 1,000 cfs during review. The app uses that as a conservative floor and does not infer an ideal range.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/1852/main"
      }
    ],
    "sourceLinks": [
      {
        "label": "USGS 09234500 Green River near Greendale current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=09234500",
        "provider": "usgs"
      },
      {
        "label": "Ashley National Forest Spillway Boat Launch Area",
        "url": "https://www.fs.usda.gov/r04/ashley/recreation/spillway-boat-launch-area",
        "provider": "local"
      },
      {
        "label": "Ashley National Forest Little Hole Boat Launch Area",
        "url": "https://www.fs.usda.gov/r04/ashley/recreation/little-hole-boat-launch-area",
        "provider": "local"
      },
      {
        "label": "Recreation.gov Green River Float-In Campsites",
        "url": "https://www.recreation.gov/camping/campgrounds/250036",
        "provider": "local"
      },
      {
        "label": "BLM / Forest Service Floating the Green River brochure",
        "url": "https://www.blm.gov/sites/default/files/documents/files/floating_the_green_river_brochure.pdf",
        "provider": "local"
      },
      {
        "label": "American Whitewater Green River Flaming Gorge to Lodore",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/1852/main",
        "provider": "american_whitewater"
      },
      {
        "label": "Bureau of Reclamation Flaming Gorge water operations",
        "url": "https://www.usbr.gov/uc/water/crsp/cs/fgd.html",
        "provider": "local"
      },
      {
        "label": "Utah DWR stream access guidance",
        "url": "https://wildlife.utah.gov/streamaccess",
        "provider": "local"
      }
    ]
  },
  {
    "id": "green-river-little-hole-indian-crossing",
    "slug": "green-river-little-hole-indian-crossing",
    "name": "Green River",
    "reach": "Little Hole to Indian Crossing",
    "aliases": [
      "Green River Section B",
      "Little Hole to Browns Park",
      "Little Hole to Indian Crossing"
    ],
    "state": "Utah",
    "region": "Northeastern Utah",
    "routeType": "whitewater",
    "summary": "Remote Section B tailwater run from Little Hole to Indian Crossing in Browns Park. Ashley National Forest publishes the Little Hole boat-launch coordinates, BLM publishes Indian Crossing campground coordinates and river-use rules, and USGS 09234500 is the direct below-dam Green River gauge.",
    "statusText": "Use the Green River near Greendale gauge as the direct tailwater check. American Whitewater ties the broader Flaming Gorge-to-Lodore reach to the Greendale gauge and shows a 200-5,000 cfs range; Paddle Today treats 1,000 cfs as a conservative Section B minimum because Red Creek and daily dam-release swings make a full ideal band inappropriate.",
    "latitude": 40.910719,
    "longitude": -109.315144,
    "gaugeSource": {
      "id": "usgs-09234500",
      "provider": "usgs",
      "siteId": "09234500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Green River near Greendale, UT",
      "detailUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=09234500"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "dam_release",
        "whitewater",
        "fast_rise",
        "cold_water",
        "remote"
      ],
      "safetyNotes": [
        "Treat Section B as remote cold-water moving water, not a casual roadside float; the take-out is down a long Browns Park road and missed logistics carry real consequence.",
        "Check USGS 09234500 and the current Flaming Gorge release schedule immediately before launching. Reclamation says 2026 releases can fluctuate hourly and elevated releases can make the below-dam river colder, higher, and swifter.",
        "Visit Utah warns that Red Creek creates the largest rapid on this Green River reach and can be difficult at low water because of multiple large boulders. Scout conditions and use an experienced rower/paddler judgment call."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 1000,
      "thresholdSource": {
        "label": "American Whitewater Flaming Gorge-to-Lodore runnable-flow context on the Greendale gauge",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/1852/main",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "low",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "Flaming Gorge Dam gives this tailwater year-round release support, but Section B is remote and still changes with hourly dam releases, Red Creek sediment pulses, wind, storms, and cold water. Check the gauge, release schedule, weather, shuttle roads, and camp reservations before committing.",
      "difficulty": "hard",
      "difficultyNotes": "Section B is commonly described as a slower remote float, but Red Creek can be a serious boulder rapid and the route has cold dam-release water, limited road access, and overnight logistics. It is hidden from default casual discovery as whitewater/swiftwater.",
      "confidenceNotes": "Confidence is high for route shape, endpoints, live gauge, camping rules, and a conservative floor: Ashley National Forest identifies Little Hole as the Section B boat launch with coordinates; BLM publishes Indian Crossing campground coordinates, river-use rules, PFD requirements, and no private-use permit requirement through Ladore Canyon; Recreation.gov and Visit Utah describe Section B as Little Hole to Indian Crossing/Browns Park with float-in camps; USGS 09234500 returned same-day discharge and stage on 2026-08-13. Threshold confidence remains conservative because AW supports the broader Flaming Gorge-to-Lodore gauge range, while Paddle Today does not infer an ideal or high-water band for this exact 9-mile card."
    },
    "evidenceNotes": [
      {
        "label": "Live gauge",
        "value": "USGS 09234500 at 2,150 cfs / 9.63 ft",
        "note": "USGS Water Services returned Green River near Greendale discharge and gage height at 07:30 MDT on 2026-08-13.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=09234500"
      },
      {
        "label": "Route shape",
        "value": "Section B, about 9 miles",
        "note": "Visit Utah identifies Section B as Little Hole to Indian Crossing in Browns Park, and Flaming Gorge Country describes the Little Hole-to-Indian-Crossing section as a 9-mile float.",
        "sourceUrl": "https://www.visitutah.com/articles/green-river-fly-fishing"
      },
      {
        "label": "Endpoint coordinates",
        "value": "40.910719, -109.315144 to 40.898831, -109.183372",
        "note": "Ashley National Forest publishes Little Hole Boat Launch coordinates; BLM publishes Indian Crossing Campground geographic coordinates.",
        "sourceUrl": "https://www.fs.usda.gov/r04/ashley/recreation/little-hole-boat-launch-area"
      },
      {
        "label": "Camping",
        "value": "Reservable float-in campsites on Section B",
        "note": "Recreation.gov lists 17 river camps in Section B, accessible only by hiking or floating in. BLM also documents developed camping at Indian Crossing and Bridge Hollow.",
        "sourceUrl": "https://www.recreation.gov/camping/campgrounds/250036"
      },
      {
        "label": "Safety rules",
        "value": "Life jackets required; private-use permit not required",
        "note": "BLM says life jackets are required on the Green River and that permits are required for commercial float boating only, with no permit required for personal use from Flaming Gorge Dam to Dinosaur National Monument at Ladore Canyon.",
        "sourceUrl": "https://www.blm.gov/visit/indian-crossing-campground"
      },
      {
        "label": "Current dam-release caution",
        "value": "2026 hourly release fluctuations",
        "note": "The Bureau of Reclamation says Flaming Gorge releases can fluctuate hourly and that elevated releases can make the Green River below the dam colder, higher, and swifter.",
        "sourceUrl": "https://www.usbr.gov/uc/water/crsp/cs/fgd.html"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "Bounded Forest Service, BLM, Recreation.gov, Commons, and same-route web review found public-agency context images but no exact Section B paddling asset selected for local reuse in this pass.",
        "sourceUrl": "https://www.blm.gov/visit/indian-crossing-campground"
      }
    ],
    "sourceLinks": [
      {
        "label": "USGS 09234500 Green River near Greendale current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=09234500",
        "provider": "usgs"
      },
      {
        "label": "Ashley National Forest Little Hole Boat Launch Area",
        "url": "https://www.fs.usda.gov/r04/ashley/recreation/little-hole-boat-launch-area",
        "provider": "local"
      },
      {
        "label": "BLM Indian Crossing Campground",
        "url": "https://www.blm.gov/visit/indian-crossing-campground",
        "provider": "local"
      },
      {
        "label": "Recreation.gov Green River Float-In Campsites",
        "url": "https://www.recreation.gov/camping/campgrounds/250036",
        "provider": "local"
      },
      {
        "label": "Visit Utah Green River Sections Explained",
        "url": "https://www.visitutah.com/articles/green-river-fly-fishing",
        "provider": "local"
      },
      {
        "label": "American Whitewater Green River Flaming Gorge to Lodore",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/1852/main",
        "provider": "american_whitewater"
      },
      {
        "label": "Bureau of Reclamation Flaming Gorge water operations",
        "url": "https://www.usbr.gov/uc/water/crsp/cs/fgd.html",
        "provider": "local"
      }
    ]
  },
  {
    "id": "clear-creek-fish-creek-confluence-clear-creek-road",
    "slug": "clear-creek-fish-creek-confluence-clear-creek-road",
    "name": "Clear Creek",
    "reach": "Fish Creek Confluence to Clear Creek Road",
    "aliases": [
      "Clear Creek near Sevier",
      "Clear Creek canyon run",
      "Fish Creek Confluence to I-70 valley"
    ],
    "state": "Utah",
    "region": "Sevier / Fishlake country",
    "routeType": "whitewater",
    "summary": "Short, steep Clear Creek Class III- run from the Fish Creek confluence to the Clear Creek Road valley access near I-70. RiverBrain documents the named access pair, coordinates, 2.3-mile length, seasonal window, and a direct 10194200 gauge model.",
    "statusText": "Use USGS 10194200 at Clear Creek above diversions. RiverBrain lists 200 cfs as the minimum, 300 cfs average, and 600 cfs maximum; the creek is shallow, rocky, fast, and not appropriate for casual low-water paddling.",
    "latitude": 38.58368158,
    "longitude": -112.40917126,
    "gaugeSource": {
      "id": "usgs-10194200",
      "provider": "usgs",
      "siteId": "10194200",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Clear Creek above diversions, near Sevier, UT",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-10194200/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "low_water",
        "strainers",
        "cold_water",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "RiverBrain describes this as Class III- to III with a 96.9 ft/mile gradient; it is a creek-run whitewater route, not a beginner float.",
        "Use the 200 cfs minimum-only gate from the route source and scout current wood, fences, diversion structures, and bridge clearances before committing.",
        "The dirt-lot access points are roadside anchors with no ramp, water, or camping. Confirm current road condition and legal parking, stay on the road corridor, and do not cross private land.",
        "Clear Creek can become dangerous during snowmelt or heavy rain; cold water and limited eddies make a swim consequential."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "RiverBrain Clear Creek recommended minimum flow",
        "url": "https://www.riverbrain.com/runs/139",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        5,
        6
      ],
      "seasonNotes": "The documented season is May to June, with snowmelt and rain driving the short runnable window. Check the live gauge trend and road conditions immediately before launch.",
      "difficulty": "hard",
      "difficultyNotes": "RiverBrain rates the reach Class III- to III with a steep gradient, shallow rocky bed, quick current, and limited recovery margin.",
      "confidenceNotes": "Confidence is moderate for a conservative whitewater add: RiverBrain publishes the exact 2.3-mile reach, named access pair, coordinates, vehicle-access notes, seasonal window, and a 200/300/600 cfs gauge model tied to USGS 10194200. Public-agency land confirmation is limited, so the route requires explicit roadside parking and no-trespass caveats."
    },
    "evidenceNotes": [
      {
        "label": "Live gauge",
        "value": "USGS 10194200 Clear Creek above diversions",
        "note": "USGS provides continuous discharge and gage-height data for the direct gauge used by the route source.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-10194200/"
      },
      {
        "label": "Route and endpoints",
        "value": "Fish Creek Confluence to Clear Creek Road, 2.3 mi",
        "note": "RiverBrain publishes the named access pair, coordinates, elevations, and all-vehicle roadside descriptions.",
        "sourceUrl": "https://www.riverbrain.com/runs/139"
      },
      {
        "label": "Threshold",
        "value": "Minimum 200 cfs; average 300 cfs; maximum 600 cfs",
        "note": "RiverBrain publishes the route-specific recommended levels tied to USGS 10194200. Treat this as community guidance and require same-day scouting.",
        "sourceUrl": "https://www.riverbrain.com/runs/139"
      },
      {
        "label": "Access coordinates",
        "value": "38.58368158, -112.40917126 to 38.58062666, -112.36557195",
        "note": "RiverBrain publishes both access coordinates; each is a small dirt roadside lot with no ramp, water, or camping.",
        "sourceUrl": "https://www.riverbrain.com/accesses/209"
      },
      {
        "label": "Access and legal caveat",
        "value": "Roadside access only; no trespass",
        "note": "Utah DWR warns that public-water recreation does not authorize walking on private streambeds or crossing posted private land. Confirm parking and road status before launch.",
        "sourceUrl": "https://wildlife.utah.gov/streamaccess"
      },
      {
        "label": "Image decision",
        "value": "No route-gallery image selected",
        "note": "No clearly rights-clean exact-run image was selected during the bounded review.",
        "sourceUrl": "https://www.riverbrain.com/runs/139"
      }
    ],
    "sourceLinks": [
        {
          "label": "RiverBrain Clear Creek run",
          "url": "https://www.riverbrain.com/runs/139",
          "provider": "local"
        },
        {
          "label": "RiverBrain Fish Creek Confluence access",
          "url": "https://www.riverbrain.com/accesses/209",
          "provider": "local"
        },
        {
          "label": "RiverBrain Clear Creek Road access",
          "url": "https://www.riverbrain.com/accesses/210",
          "provider": "local"
        },
        {
          "label": "USGS 10194200 monitoring location",
          "url": "https://waterdata.usgs.gov/monitoring-location/USGS-10194200/",
          "provider": "usgs"
        },
        {
          "label": "Utah DWR stream access guidance",
          "url": "https://wildlife.utah.gov/streamaccess",
          "provider": "local"
        },
        {
          "label": "Fremont Indian State Park guide",
          "url": "https://stateparks.utah.gov/wp-content/uploads/sites/13/2020/04/Newspaper-Fremont-Park-Guidewebspread.pdf",
          "provider": "local"
        }
      ]
  }
];
