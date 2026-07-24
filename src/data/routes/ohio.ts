// State-scoped route data. Keep entries in route-family and downstream order.
import type { River } from '../../lib/types';

export const ohioRoutes: River[] = [
  {
    "id": "vermilion-river-schoepfle-mill-hollow",
    "slug": "vermilion-river-schoepfle-mill-hollow",
    "name": "Vermilion River",
    "reach": "Schoepfle Garden / Birmingham to Mill Hollow",
    "state": "Ohio",
    "region": "North Central Ohio",
    "summary": "Short north-flowing Vermilion day run with shale-valley scenery, pool-and-drop Class I water, and a couple light Class II riffle sections when the stage is right.",
    "statusText": "Use the Vermilion near Vermilion stage gauge. Treat about 3.5 to 4.25 ft as the best novice-friendly window, 2.55 ft as the bare runnable floor, and 6 ft as high runnable rather than a broad recreational recommendation.",
    "latitude": 41.326667,
    "longitude": -82.357333,
    "gaugeSource": {
      "id": "usgs-04199500",
      "provider": "usgs",
      "siteId": "04199500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Vermilion River near Vermilion, OH",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04199500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 3.5,
      "idealMax": 4.25,
      "tooLow": 2.55,
      "tooHigh": 6,
      "thresholdSource": {
        "label": "American Whitewater Vermilion middle reach gauge guidance",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/3140/main",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        9,
        10,
        11
      ],
      "seasonNotes": "Spring and rain-refreshed fall are the more likely windows. Summer can become too shallow; avoid quick rises after heavy rain and verify local access before staging.",
      "difficulty": "moderate",
      "difficultyNotes": "Mostly Class I pool-and-drop water, but American Whitewater notes light Class II sections after the SR 113 crossing and before Dean Hollow Bridge at the recommended novice range.",
      "confidenceNotes": "Confidence is good for a guarded community-threshold add: American Whitewater documents the exact 8.1-mile reach, same-river USGS gauge, gauge range, and route character. ODNR public-access materials provide coordinates for Schoepfle Garden / Birmingham and Vermilion River Reservation / Mill Hollow, while Lorain County Metro Parks supports the named park access context."
    },
    "evidenceNotes": [
      {
        "label": "Route and distance",
        "value": "8.1 miles, Class I(II)",
        "note": "American Whitewater lists the middle Vermilion reach from Edison Hwy / US 20 at Schoepfle Gardens to Mill Hollow Park as 8.1 miles with Class I(II) difficulty.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/3140/main"
      },
      {
        "label": "Published AW range",
        "value": "2.55 to 6.00 ft",
        "note": "American Whitewater ties the reach to USGS 04199500 and labels 2.55 to 6.00 ft as barely runnable through high runnable.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=3140"
      },
      {
        "label": "Novice target",
        "value": "3.5 to 4.25 ft",
        "note": "A same-reach American Whitewater trip report recommends 3.5 to 4.25 ft for novice kayakers, with the middle of that range most fun.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/3140/main"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 04199500",
        "note": "USGS operates the Vermilion River near Vermilion, OH monitoring location used by American Whitewater for this reach.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04199500/"
      },
      {
        "label": "Put-in coordinate support",
        "value": "Birmingham Community Center / Schoepfle Garden public-access coordinates",
        "note": "ODNR public-access materials list Schoepfle Garden as a Vermilion River access site and publish Birmingham-area coordinates, including the community-center point used here for the AW Birmingham put-in context.",
        "sourceUrl": "https://dam.assets.ohio.gov/image/upload/ohiodnr.gov/documents/coastal/public-access/pag-riv-06-VermilionRiver.pdf"
      },
      {
        "label": "Take-out coordinate support",
        "value": "Mill Hollow / Vermilion River Reservation coordinates",
        "note": "ODNR public-access materials and the Vermilion-Lorain Water Trail identify Mill Hollow / Vermilion River Reservation as the western trailhead area and publish coordinates for the Mill Hollow side.",
        "sourceUrl": "https://dam.assets.ohio.gov/image/upload/ohiodnr.gov/documents/coastal/public-access/pag-riv-06-VermilionRiver.pdf"
      },
      {
        "label": "Hazards",
        "value": "Low water, light Class II riffles, wood, bridge hydraulics downstream",
        "note": "AW notes the light Class II sections on this middle reach; ODNR water-trail materials warn the lower Vermilion can include log jams and bridge abutment hazards during high water.",
        "sourceUrl": "https://dam.assets.ohio.gov/image/upload/ohiodnr.gov/documents/parks/watertrails/VermilionLorainWaterTrail.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "American Whitewater Vermilion middle reach",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/3140/main",
        "provider": "american_whitewater"
      },
      {
        "label": "American Whitewater Vermilion gauge info",
        "url": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=3140",
        "provider": "american_whitewater"
      },
      {
        "label": "USGS 04199500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-04199500/",
        "provider": "usgs"
      },
      {
        "label": "ODNR Vermilion River public access guide",
        "url": "https://dam.assets.ohio.gov/image/upload/ohiodnr.gov/documents/coastal/public-access/pag-riv-06-VermilionRiver.pdf",
        "provider": "local"
      },
      {
        "label": "ODNR Vermilion-Lorain Water Trail PDF",
        "url": "https://dam.assets.ohio.gov/image/upload/ohiodnr.gov/documents/parks/watertrails/VermilionLorainWaterTrail.pdf",
        "provider": "local"
      },
      {
        "label": "Lorain County Metro Parks Schoepfle Garden",
        "url": "https://www.loraincountymetroparks.com/schoepfle-garden",
        "provider": "local"
      },
      {
        "label": "Lorain County Metro Parks Vermilion River Reservation",
        "url": "https://www.loraincountymetroparks.com/vermilion-river-reservation",
        "provider": "local"
      }
    ]
  },
  {
    "id": "vermilion-river-mill-hollow-vermilion-boat-ramp",
    "slug": "vermilion-river-mill-hollow-vermilion-boat-ramp",
    "name": "Vermilion River",
    "reach": "Mill Hollow to South Street Boat Ramp",
    "state": "Ohio",
    "region": "North Central Ohio",
    "summary": "Lower Vermilion split from the shale-rimmed Mill Hollow corridor into downtown Vermilion, with easy current, a flatter final approach, and direct same-river gauge guidance.",
    "statusText": "Use the Vermilion near Vermilion stage gauge. Treat about 3.0 to 4.25 ft as the best easy-run window, 2.6 ft as the bare runnable floor, and 6 ft as high runnable rather than a broad flatwater recommendation.",
    "latitude": 41.38278,
    "longitude": -82.315,
    "gaugeSource": {
      "id": "usgs-04199500",
      "provider": "usgs",
      "siteId": "04199500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Vermilion River near Vermilion, OH",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04199500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise"
      ],
      "safetyNotes": [
        "The lower river is easier than the Birmingham split, but high water can turn bridge abutments, outside bends, and wood into real hazards.",
        "The final miles flatten and pick up more boat traffic near town; stay alert for wakes and changing wind near the mouth.",
        "Do not continue into Lake Erie unless open-water conditions, landing options, and group skill all support it."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 3,
      "idealMax": 4.25,
      "tooLow": 2.6,
      "tooHigh": 6,
      "thresholdSource": {
        "label": "American Whitewater Vermilion lower reach gauge guidance",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/3141/main",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        9,
        10,
        11
      ],
      "seasonNotes": "Spring and rain-refreshed fall are the more dependable windows. Summer can get scratchy, and the lower miles are more exposed to flatwater wind and motorboat wakes as you approach town.",
      "difficulty": "easy",
      "difficultyNotes": "American Whitewater rates the reach Class I, but the last two miles become flatter and the route still needs normal river judgment around wood, bridges, and changing current after rain.",
      "confidenceNotes": "Confidence is good for a guarded add: American Whitewater documents the exact 5.3-mile lower reach, same-river USGS gauge, and numeric range. Lorain County Metro Parks confirms Mill Hollow as a kayak/canoe access point, while the City of Vermilion confirms the South Street public boat ramp and ADA kayak/canoe launch with exact location details."
    },
    "evidenceNotes": [
      {
        "label": "Route and difficulty",
        "value": "5.3 miles, Class I",
        "note": "American Whitewater lists Mill Hollow Park to Vermilion Boat Ramp as a 5.3-mile lower Vermilion reach with Class I difficulty.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/3141/main"
      },
      {
        "label": "Published AW range",
        "value": "2.6 to 6.0 ft",
        "note": "American Whitewater ties the reach to USGS 04199500 and labels 2.6 to 6.0 ft as barely runnable through high runnable.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/3141/main"
      },
      {
        "label": "Guarded app target",
        "value": "3.0 to 4.25 ft",
        "note": "The app keeps the preferred window above the bare AW floor because low-end conditions can get scrapier upstream and the flatter lower miles are more worthwhile once the river has some depth.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/3141/main"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 04199500",
        "note": "USGS operates the Vermilion River near Vermilion, OH monitoring location used by American Whitewater for this reach.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04199500/"
      },
      {
        "label": "Official put-in support",
        "value": "Mill Hollow / Vermilion River Reservation access",
        "note": "Lorain County Metro Parks lists Vermilion River Reservation at Mill Hollow and names a kayak and canoe river access point there.",
        "sourceUrl": "https://www.loraincountymetroparks.com/vermilion-river-reservation"
      },
      {
        "label": "Official take-out support",
        "value": "South Street Municipal Public Boat Ramp: 41.42019, -82.35665",
        "note": "The City of Vermilion says the South Street Municipal Public Boat Ramp is on the west side of the Vermilion River and includes an ADA kayak and canoe roller launch facility.",
        "sourceUrl": "https://www.cityofvermilionohio.gov/2025-Main-Menu-Folder/2025-Port-Authority/Public-Boat-Ramp/South-Street-Municipal-Public-Boat-Ramp"
      },
      {
        "label": "Hazards",
        "value": "Log jams, bridge abutments, motorboat traffic near town",
        "note": "ODNR water-trail materials warn about a log jam and Route 2 bridge abutments during high water, while the lower city stretch adds marinas, docks, and active boat traffic near the mouth.",
        "sourceUrl": "https://dam.assets.ohio.gov/image/upload/odnr/watertrails/VermilionLorainWaterTrail.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "American Whitewater Vermilion lower reach",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/3141/main",
        "provider": "american_whitewater"
      },
      {
        "label": "USGS 04199500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-04199500/",
        "provider": "usgs"
      },
      {
        "label": "ODNR Vermilion-Lorain Water Trail PDF",
        "url": "https://dam.assets.ohio.gov/image/upload/odnr/watertrails/VermilionLorainWaterTrail.pdf",
        "provider": "local"
      },
      {
        "label": "Lorain County Metro Parks Vermilion River Reservation",
        "url": "https://www.loraincountymetroparks.com/vermilion-river-reservation",
        "provider": "local"
      },
      {
        "label": "City of Vermilion South Street Municipal Public Boat Ramp",
        "url": "https://www.cityofvermilionohio.gov/2025-Main-Menu-Folder/2025-Port-Authority/Public-Boat-Ramp/South-Street-Municipal-Public-Boat-Ramp",
        "provider": "local"
      },
      {
        "label": "City of Vermilion Port Authority",
        "url": "https://www.cityofvermilionohio.gov/2025-Main-Menu-Folder/2025-Port-Authority",
        "provider": "local"
      }
    ]
  },
  {
    "id": "grand-river-harpersfield-hidden-valley",
    "slug": "grand-river-harpersfield-hidden-valley",
    "name": "Grand River",
    "reach": "Harpersfield Covered Bridge to Hidden Valley Park",
    "state": "Ohio",
    "region": "Northeast Ohio",
    "summary": "Wild and Scenic Grand River run from the Harpersfield covered bridge corridor to Hidden Valley, with a broad valley feel, bedrock ledges near the put-in, and Class I-II wave trains as water rises.",
    "statusText": "Use the Grand River near Painesville gauge. Lake Metroparks treats under 2 ft as low/draggy, 2 to 5 ft as optimal, 5 to 8 ft as high and fast, and above 8 ft as flood-level dangerous.",
    "latitude": 41.75649,
    "longitude": -80.946408,
    "gaugeSource": {
      "id": "usgs-04212100",
      "provider": "usgs",
      "siteId": "04212100",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Grand River near Painesville, OH",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04212100/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "cold_water",
        "fast_rise"
      ],
      "safetyNotes": [
        "Harpersfield ledge/drop features and standing waves become more consequential as levels rise above easy conditions.",
        "American Whitewater notes larger wave trains and stronger eddy lines at intermediate flows; match the route to group skill.",
        "Wood, fast current, cold water, and floodplain closure risk require current park and gauge checks."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 2,
      "idealMax": 5,
      "tooLow": 2,
      "tooHigh": 8,
      "thresholdSource": {
        "label": "Lake Metroparks Grand River Water Trail gauge bands",
        "url": "https://www.lakemetroparks.com/KenticoTemplate/media/LakeMetroparks/Grand-River-Water-Trail-map_low-res.pdf",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        9,
        10,
        11
      ],
      "seasonNotes": "Spring and fall rain windows are most reliable. Summer can be low and slow; higher rain-driven levels create fast current, wave trains, and stronger eddy lines.",
      "difficulty": "moderate",
      "difficultyNotes": "Usually approachable moving water in the optimal band, but the Harpersfield ledge/play spot, standing waves above 4 ft, and 1500+ cfs wave trains make this more than a flatwater float.",
      "confidenceNotes": "Confidence is strong for a guarded add: Lake Metroparks publishes public access coordinates, river miles, and official gauge-height bands for the Grand River Water Trail; American Whitewater documents the exact Harpersfield-to-Hidden Valley reach, same USGS gauge, distance, Class I-II character, and route-specific flow notes."
    },
    "evidenceNotes": [
      {
        "label": "Official gauge bands",
        "value": "2 to 5 ft optimal; >8 ft dangerous",
        "note": "Lake Metroparks tells paddlers to check USGS 04212100 and labels under 2 ft low/slow drag, 2 to 5 ft optimal, 5 to 8 ft high/fast, and above 8 ft flood-level dangerous.",
        "sourceUrl": "https://www.lakemetroparks.com/KenticoTemplate/media/LakeMetroparks/Grand-River-Water-Trail-map_low-res.pdf"
      },
      {
        "label": "AW route and distance",
        "value": "8.4 miles, Class I-II",
        "note": "American Whitewater lists Harpersfield Dam / Route 534 to Hidden Valley / Route 528 as an 8.4-mile Class I-II Grand River reach.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/1468/main"
      },
      {
        "label": "AW flow floor",
        "value": "About 100 cfs",
        "note": "AW trip-report guidance says boatable flows are about 100 cfs and that 90 cfs was too low in spots.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/1468/main"
      },
      {
        "label": "AW beginner range",
        "value": "100 to 1500 cfs",
        "note": "AW reports 100 to 1500 cfs as a safe beginner/novice range and warns that above 1500 cfs a few spots need intermediate skills.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/1468/main"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 04212100",
        "note": "USGS identifies Grand River near Painesville, OH as station 04212100 and reports both gage height and discharge.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04212100/"
      },
      {
        "label": "Put-in coordinate support",
        "value": "Harpersfield Covered Bridge: 41.75649, -80.946408",
        "note": "Lake Metroparks Grand River Water Trail map publishes the Harpersfield Covered Bridge access coordinate and address at 1122 Harpersfield Road.",
        "sourceUrl": "https://www.lakemetroparks.com/KenticoTemplate/media/LakeMetroparks/Grand-River-Water-Trail-map_low-res.pdf"
      },
      {
        "label": "Take-out coordinate support",
        "value": "Hidden Valley Park: 41.741864, -81.047837",
        "note": "Lake Metroparks Grand River Water Trail map publishes Hidden Valley Park as a paddle access with GIS coordinates and a short carry from drop-off to water.",
        "sourceUrl": "https://www.lakemetroparks.com/KenticoTemplate/media/LakeMetroparks/Grand-River-Water-Trail-map_low-res.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "Lake Metroparks Grand River Water Trail map",
        "url": "https://www.lakemetroparks.com/KenticoTemplate/media/LakeMetroparks/Grand-River-Water-Trail-map_low-res.pdf",
        "provider": "local"
      },
      {
        "label": "American Whitewater Grand Harpersfield to Hidden Valley",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/1468/main",
        "provider": "american_whitewater"
      },
      {
        "label": "USGS 04212100 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-04212100/",
        "provider": "usgs"
      },
      {
        "label": "USGS Grand River near Painesville project page",
        "url": "https://www.usgs.gov/centers/ohio-kentucky-indiana-water-science-center/science/grand-river-near-painesville-oh",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "great-miami-river-heritage-dravo",
    "slug": "great-miami-river-heritage-dravo",
    "name": "Great Miami River",
    "reach": "Heritage Park to Obergiesing Soccer Complex at Dravo Park",
    "state": "Ohio",
    "region": "Southwest Ohio",
    "summary": "Cincinnati-area Great Miami training run with Class I-II wave features, named play spots, real strainer history, and a strong Hamilton gauge story. This is a whitewater-skills route, not a casual recreational float.",
    "statusText": "Whitewater/swiftwater only. Use the Hamilton gauge; treat about 1000 to 3500 cfs as the guarded training window, 500 cfs as the rough runnable floor, 5000+ cfs as flushed/pushy, and around 8000 cfs as stay-off water because of wood and debris.",
    "latitude": 39.291548,
    "longitude": -84.661803,
    "routeType": "whitewater",
    "gaugeSource": {
      "id": "usgs-03274000",
      "provider": "usgs",
      "siteId": "03274000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Great Miami River at Hamilton, OH",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03274000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1000,
      "idealMax": 3500,
      "tooLow": 500,
      "tooHigh": 8000,
      "thresholdSource": {
        "label": "American Whitewater Great Miami Heritage to Dravo guidance",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/4554/main",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
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
      "seasonNotes": "Spring through fall is the normal local training window when the Hamilton gauge is in range. Avoid recent high-water debris, fast rises, and any uncertainty about strainers at Denny's Run or the Dravo take-out maze.",
      "difficulty": "hard",
      "difficultyNotes": "AW rates the reach Class I-II, but route reports and feature notes make it unsuitable for casual recreational kayakers: expect wave trains, eddyline practice, shallow ledges, rescues/strainer history at Denny's Run, and wood at the take-out.",
      "confidenceNotes": "The live gauge and threshold evidence are strong because American Whitewater ties this exact reach to USGS 03274000 and publishes detailed same-reach level notes. Official access confidence is also good: Colerain Township confirms canoe ramps at Heritage Park and Dravo Park, and the Great Miami River Water Trail map names both access points. Coordinate confidence is lower than Vermilion/Grand because the sources found in this pass give official names and addresses rather than ramp-level GIS points; the implementation uses named park coordinates with caveats."
    },
    "evidenceNotes": [
      {
        "label": "Route and gauge",
        "value": "6.1 miles, Class I-II, USGS 03274000",
        "note": "American Whitewater lists Heritage Park or Blue Rock Road to Obergiesing Soccer Complex at Dravo Park as a 6.1-mile Class I-II reach and ties it to the Great Miami River at Hamilton gauge.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/4554/main"
      },
      {
        "label": "Runnable range",
        "value": "500 to 5000+ cfs",
        "note": "AW says this section is run at a variety of levels from 500 cfs to 5000+ cfs, while also explaining that the 5000 cfs cutoff is partly because rapids generally flush out.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/4554/main"
      },
      {
        "label": "Stay-off level",
        "value": "Around 8000 cfs",
        "note": "AW warns that somewhere around 8000 cfs paddlers probably want to stay off the river because of wood and other floating debris.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/4554/main"
      },
      {
        "label": "Training window support",
        "value": "1000 to 3500 cfs guarded app target",
        "note": "AW feature notes identify usable/playable behavior around 1000, 1500, 2000, 2500, 3000, and 3500 cfs. The app target stays below the more pushy 4500-to-5000 cfs bands and above the marginal 500-to-650 cfs reports.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/4554/main"
      },
      {
        "label": "Direct gauge metadata",
        "value": "AW gauge 1529 / USGS 03274000",
        "note": "American Whitewater gauge metadata identifies the Great Miami River at Hamilton gauge as a direct USGS station, USGS 03274000.",
        "sourceUrl": "https://www.americanwhitewater.org/content/Gauge2/detail/id/1529/"
      },
      {
        "label": "Official ramp pair",
        "value": "Heritage Park and Dravo Park canoe ramps",
        "note": "Colerain Township says the upstream canoe ramp is at Heritage Park and the second ramp is just over four nautical miles downstream at Obergiesing Soccer Complex at Dravo Park.",
        "sourceUrl": "https://www.colerain.org/225/Canoe-Ramps"
      },
      {
        "label": "Take-out support",
        "value": "Obergiesing Soccer Complex at Dravo Park canoe ramp",
        "note": "Colerain Township lists Obergiesing Soccer Complex at Dravo Park with a canoe ramp, parking, picnic facilities, and ODNR boating-facility grant context.",
        "sourceUrl": "https://www.colerain.org/Facilities/Facility/Details/Obergiesing-Soccer-Complex-at-Dravo-Park-33"
      },
      {
        "label": "Hazard escalation",
        "value": "Denny's Run strainers and non-rec warning",
        "note": "AW describes rescues, wrapped boats, and persistent strainers at Denny's Run; a 2018 trip report explicitly warns the route is not for recreational kayakers.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/4554/main"
      }
    ],
    "sourceLinks": [
      {
        "label": "American Whitewater Great Miami Heritage to Dravo",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/4554/main",
        "provider": "american_whitewater"
      },
      {
        "label": "American Whitewater Hamilton gauge metadata",
        "url": "https://www.americanwhitewater.org/content/Gauge2/detail/id/1529/",
        "provider": "american_whitewater"
      },
      {
        "label": "USGS 03274000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03274000/",
        "provider": "usgs"
      },
      {
        "label": "Colerain Township canoe ramps",
        "url": "https://www.colerain.org/225/Canoe-Ramps",
        "provider": "local"
      },
      {
        "label": "Colerain Township Heritage Park",
        "url": "https://www.colerain.org/Facilities/Facility/Details/Heritage-Park-29",
        "provider": "local"
      },
      {
        "label": "Colerain Township Obergiesing Soccer Complex at Dravo Park",
        "url": "https://www.colerain.org/Facilities/Facility/Details/Obergiesing-Soccer-Complex-at-Dravo-Park-33",
        "provider": "local"
      },
      {
        "label": "Great Miami River Water Trail map",
        "url": "https://www.miamicountyparks.com/sites/default/files/media/mcpd/2022-Great-Miami-River-Water-Trail-Map.pdf",
        "provider": "local"
      }
    ]
  },
  {
    "id": "little-beaver-creek-pioneer-village-sprucevale",
    "slug": "little-beaver-creek-pioneer-village-sprucevale",
    "name": "Little Beaver Creek",
    "reach": "Pioneer Village Launch to Sprucevale Launch",
    "state": "Ohio",
    "region": "East Liverpool / Ohio-Pennsylvania border",
    "summary": "Short upper Little Beaver training float from Beaver Creek State Park to Sprucevale, with Class I-II current, a direct same-river USGS gauge, and state-park camping at the put-in.",
    "statusText": "Whitewater/swiftwater only. Treat 300 cfs on Little Beaver Creek near East Liverpool as the conservative floor. The official guide says the upper rapids clean up above that, with stronger play around 1000 cfs, but it does not publish a safe high-water ceiling.",
    "latitude": 40.727423,
    "longitude": -80.611394,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "cold_water",
        "private_banks"
      ],
      "safetyNotes": [
        "The official guide treats this as a beginner/intermediate whitewater training stretch, not a flatwater park float.",
        "Piano Rapid and Lock Ledge deserve a visual scout whenever the creek is rising or your group is new to current.",
        "Use only the named launches and stay off private banks except for true emergencies."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03109500",
      "provider": "usgs",
      "siteId": "03109500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Little Beaver Creek near East Liverpool, OH",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03109500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "Ohio River Water Trail / Little Beaver Creek minimum-flow guidance",
        "url": "https://pfbc.pa.gov/watertrails/ohio/Ohio-side1.pdf",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "Warm-season trips are most practical, but same-day rain matters more than the calendar because Little Beaver is flashy and can move wood quickly after storms.",
      "difficulty": "moderate",
      "difficultyNotes": "The guide calls the upper section Class I-II and suitable for beginner/intermediate paddlers, but it still includes real rapids, current-reading decisions, and changing wood.",
      "confidenceNotes": "Confidence is good for a conservative Ohio add: the official Ohio River Water Trail guide names Pioneer Village and Sprucevale as public launches with coordinates, ties the creek to the Grimms Bridge USGS gauge, and publishes the 300 cfs / 1-foot minimum plus route-character notes. The put-in camping story is also current and official through Beaver Creek State Park."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "About 3.2 river miles",
        "note": "The Ohio River Water Trail map places Pioneer Village Launch at river mile 14.3 and Sprucevale Launch at river mile 11.1, supporting a 3.2-mile upper Little Beaver segment.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/ohio/Ohio-side1.pdf"
      },
      {
        "label": "Official minimum flow",
        "value": "300 cfs or 1.0 ft on the wooden gauge",
        "note": "The guide says the best rapid on the upper section is surfable at a minimum of 1 foot on the Beaver Creek State Park wooden gauge or 300 cfs on the Grimms Bridge USGS gauge.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/ohio/Ohio-side1.pdf"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 03109500 at 383 cfs / 3.53 ft",
        "note": "USGS Water Services returned same-day June 26, 2026 values for Little Beaver Creek near East Liverpool at 3:00 PM EDT.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03109500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Public launch coordinates",
        "value": "Pioneer Village 40.727423, -80.611394; Sprucevale 40.704704, -80.585233",
        "note": "The official map prints both launch names, coordinates, and river-mile positions for the upper Little Beaver access pair.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/ohio/Ohio-side1.pdf"
      },
      {
        "label": "Camping support",
        "value": "Beaver Creek State Park Campground at the put-in",
        "note": "The official guide lists Beaver Creek State Park for camping on this corridor, and the current Ohio DNR campground page describes family camping and Sherman cabins above Little Beaver Creek.",
        "sourceUrl": "https://ohiodnr.gov/go-and-do/plan-a-visit/find-a-property/beaver-creek-state-park-campground"
      },
      {
        "label": "Route hazards",
        "value": "Lock Ledge, Piano Rapid, fast rises, wood",
        "note": "The guide highlights Lock Ledge and Piano Rapid on the upper section and gives standard paddling warnings about uncertainty in rapids, weather, and obstructions.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/ohio/Ohio-side1.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "Ohio River Water Trail map with Little Beaver Creek guide",
        "url": "https://pfbc.pa.gov/watertrails/ohio/Ohio-side1.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 03109500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03109500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03109500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03109500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "Ohio DNR Beaver Creek State Park",
        "url": "https://ohiodnr.gov/go-and-do/plan-a-visit/find-a-property/beaver-creek-state-park",
        "provider": "local"
      },
      {
        "label": "Ohio DNR Beaver Creek State Park Campground",
        "url": "https://ohiodnr.gov/go-and-do/plan-a-visit/find-a-property/beaver-creek-state-park-campground",
        "provider": "local"
      },
      {
        "label": "Wikimedia Commons Little Beaver corridor image",
        "url": "https://commons.wikimedia.org/wiki/File:Kayaking_on_the_Ohio_River_Water_Trail_at_Little_Beaver_Creek,_Ohioville_Pa_Photo_Credit_Dr._Vincent_Troia.jpg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "little-beaver-creek-sprucevale-lock-57-park",
    "slug": "little-beaver-creek-sprucevale-lock-57-park",
    "name": "Little Beaver Creek",
    "reach": "Sprucevale Launch to Lock 57 Park Launch",
    "state": "Ohio",
    "region": "East Liverpool / Ohio-Pennsylvania border",
    "summary": "Longer Little Beaver run from Sprucevale to the creek mouth at Lock 57 Park, with the official lower-section whitewater, Eagle Rapid, and a direct same-river USGS gauge.",
    "statusText": "Whitewater/swiftwater only. Treat 300 cfs on Little Beaver Creek near East Liverpool as the conservative floor. The official guide warns the lower section is intermediate/advanced and that Eagle Rapid approaches Class III at high water, so the app does not claim a casual high-side range.",
    "latitude": 40.704704,
    "longitude": -80.585233,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "cold_water",
        "private_banks"
      ],
      "safetyNotes": [
        "The official guide treats the Fredericktown-to-Lock-57 section as intermediate/advanced because Eagle Rapid gets stronger quickly as water rises.",
        "Lock 57 is the planned exit at the mouth. Do not drift into the Ohio River unless your group intentionally planned that larger-water finish and shuttle.",
        "Use the named launches only and expect wood, faster current, and rougher footing than the upper training stretch."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03109500",
      "provider": "usgs",
      "siteId": "03109500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Little Beaver Creek near East Liverpool, OH",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03109500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "Ohio River Water Trail / Little Beaver Creek minimum-flow guidance",
        "url": "https://pfbc.pa.gov/watertrails/ohio/Ohio-side1.pdf",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "Warm-weather runs are most practical, but the main decision is same-day flow and weather. Little Beaver is flashy, and the lower section gets less forgiving after rain.",
      "difficulty": "hard",
      "difficultyNotes": "The official guide explicitly upgrades the lower section to intermediate/advanced because Eagle Rapid becomes a stronger Class II to near-Class III feature at higher levels.",
      "confidenceNotes": "Confidence is good for a conservative add: the official map names Sprucevale and Lock 57 as public launches with printed coordinates, ties the creek to the Grimms Bridge USGS gauge, and documents the lower-section character and Eagle Rapid escalation. The threshold model stays minimum-only because the official source gives a floor and feature notes, not a complete safe high-water band."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "About 10.9 river miles",
        "note": "The Ohio River Water Trail map places Sprucevale Launch at river mile 11.1 and Lock 57 Park Launch at river mile 0.2, supporting a 10.9-mile lower Little Beaver segment.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/ohio/Ohio-side1.pdf"
      },
      {
        "label": "Official minimum flow",
        "value": "300 cfs or 1.0 ft on the wooden gauge",
        "note": "The guide uses the same Grimms Bridge / Beaver Creek State Park minimum for Little Beaver and does not publish a broader lower-section sweet spot or ceiling.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/ohio/Ohio-side1.pdf"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 03109500 at 383 cfs / 3.53 ft",
        "note": "USGS Water Services returned same-day June 26, 2026 values for Little Beaver Creek near East Liverpool at 3:00 PM EDT.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03109500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Public launch coordinates",
        "value": "Sprucevale 40.704704, -80.585233; Lock 57 Park 40.645913, -80.512518",
        "note": "The official map prints both launch names, coordinates, and river-mile positions for the lower Little Beaver access pair.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/ohio/Ohio-side1.pdf"
      },
      {
        "label": "Lower-section hazard",
        "value": "Eagle Rapid reaches Class II to near Class III at high water",
        "note": "The guide says the lower section is wider and deeper than the upper run, appropriate for intermediate/advanced paddlers, and includes Eagle Rapid just downstream of Fredericktown that approaches Class III at high water.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/ohio/Ohio-side1.pdf"
      },
      {
        "label": "Image reuse",
        "value": "Wikimedia Commons corridor photo at Little Beaver / Ohioville",
        "note": "A rights-clean Commons image exists for kayakers on the Ohio River Water Trail at Little Beaver Creek in Ohioville near the Lock 57 corridor.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:Kayaking_on_the_Ohio_River_Water_Trail_at_Little_Beaver_Creek,_Ohioville_Pa_Photo_Credit_Dr._Vincent_Troia.jpg"
      }
    ],
    "sourceLinks": [
      {
        "label": "Ohio River Water Trail map with Little Beaver Creek guide",
        "url": "https://pfbc.pa.gov/watertrails/ohio/Ohio-side1.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 03109500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03109500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03109500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03109500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "Ohio DNR Beaver Creek State Park",
        "url": "https://ohiodnr.gov/go-and-do/plan-a-visit/find-a-property/beaver-creek-state-park",
        "provider": "local"
      },
      {
        "label": "Wikimedia Commons Little Beaver corridor image",
        "url": "https://commons.wikimedia.org/wiki/File:Kayaking_on_the_Ohio_River_Water_Trail_at_Little_Beaver_Creek,_Ohioville_Pa_Photo_Credit_Dr._Vincent_Troia.jpg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "little-beaver-creek-pioneer-village-lock-57-park",
    "slug": "little-beaver-creek-pioneer-village-lock-57-park",
    "name": "Little Beaver Creek",
    "reach": "Pioneer Village Launch to Lock 57 Park Launch",
    "state": "Ohio",
    "region": "East Liverpool / Ohio-Pennsylvania border",
    "summary": "Full Little Beaver Creek whitewater day from Beaver Creek State Park to Lock 57 Park, combining the upper training section with the official lower run to the Ohio River mouth.",
    "statusText": "Whitewater/swiftwater only. Treat 300 cfs on Little Beaver Creek near East Liverpool as the conservative floor. The full route includes the upper Class I-II rapids plus Eagle Rapid downstream, so the app stays minimum-only and does not infer a broad high-water recommendation.",
    "latitude": 40.727423,
    "longitude": -80.611394,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "cold_water",
        "private_banks"
      ],
      "safetyNotes": [
        "This full-day route combines the upper training water with the lower intermediate/advanced section, so paddlers should be comfortable with repeated rapids and a long shuttle.",
        "Scout Piano Rapid, Lock Ledge, Eagle Rapid, and any fresh wood before committing to the full route.",
        "Take out at Lock 57 Park before drifting into the Ohio River unless your group intentionally planned that bigger-water continuation."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03109500",
      "provider": "usgs",
      "siteId": "03109500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Little Beaver Creek near East Liverpool, OH",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03109500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "Ohio River Water Trail / Little Beaver Creek minimum-flow guidance",
        "url": "https://pfbc.pa.gov/watertrails/ohio/Ohio-side1.pdf",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "This is a committed warm-season whitewater day when same-day rain, wood, and the long shuttle matter more than any generic seasonal assumption.",
      "difficulty": "hard",
      "difficultyNotes": "The full route combines the upper Class I-II training section with the lower intermediate/advanced run and is too consequential to treat as a casual scenic float.",
      "confidenceNotes": "Confidence is good for a conservative add: the official map names the full Pioneer-to-Lock-57 day, prints both endpoint coordinates, uses the Grimms Bridge gauge for Little Beaver, and documents both the upper minimum-flow cue and the lower Eagle-Rapid escalation. The route still stays minimum-only because the official source does not publish a complete high-side band."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "About 14.1 river miles",
        "note": "The Ohio River Water Trail map places Pioneer Village Launch at river mile 14.3 and Lock 57 Park Launch at river mile 0.2, supporting a 14.1-mile full Little Beaver day.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/ohio/Ohio-side1.pdf"
      },
      {
        "label": "Official minimum flow",
        "value": "300 cfs or 1.0 ft on the wooden gauge",
        "note": "The official guide says Little Beaver should have at least 1 foot on the state-park wooden gauge or 300 cfs on the Grimms Bridge USGS gauge before paddling.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/ohio/Ohio-side1.pdf"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 03109500 at 383 cfs / 3.53 ft",
        "note": "USGS Water Services returned same-day June 26, 2026 values for Little Beaver Creek near East Liverpool at 3:00 PM EDT.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03109500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Public launch coordinates",
        "value": "Pioneer Village 40.727423, -80.611394; Lock 57 Park 40.645913, -80.512518",
        "note": "The official map prints both endpoint names, coordinates, and river-mile positions for the full Little Beaver day route.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/ohio/Ohio-side1.pdf"
      },
      {
        "label": "Camping support",
        "value": "Beaver Creek State Park Campground at the put-in",
        "note": "The official guide lists Beaver Creek State Park for camping on this corridor, and the current Ohio DNR campground page describes family camping and Sherman cabins above Little Beaver Creek.",
        "sourceUrl": "https://ohiodnr.gov/go-and-do/plan-a-visit/find-a-property/beaver-creek-state-park-campground"
      },
      {
        "label": "Main hazards",
        "value": "Piano Rapid, Lock Ledge, Eagle Rapid, Ohio River mouth",
        "note": "The official guide highlights the upper rapids, then says Eagle Rapid on the lower section approaches Class III at high water before the creek reaches Lock 57 at the Ohio River mouth.",
        "sourceUrl": "https://pfbc.pa.gov/watertrails/ohio/Ohio-side1.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "Ohio River Water Trail map with Little Beaver Creek guide",
        "url": "https://pfbc.pa.gov/watertrails/ohio/Ohio-side1.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 03109500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03109500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03109500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03109500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "Ohio DNR Beaver Creek State Park",
        "url": "https://ohiodnr.gov/go-and-do/plan-a-visit/find-a-property/beaver-creek-state-park",
        "provider": "local"
      },
      {
        "label": "Ohio DNR Beaver Creek State Park Campground",
        "url": "https://ohiodnr.gov/go-and-do/plan-a-visit/find-a-property/beaver-creek-state-park-campground",
        "provider": "local"
      },
      {
        "label": "Wikimedia Commons Little Beaver corridor image",
        "url": "https://commons.wikimedia.org/wiki/File:Kayaking_on_the_Ohio_River_Water_Trail_at_Little_Beaver_Creek,_Ohioville_Pa_Photo_Credit_Dr._Vincent_Troia.jpg",
        "provider": "local"
      }
    ]
  },
  {
    "id": "little-miami-river-rogers-ballpark-carl-rahe",
    "slug": "little-miami-river-rogers-ballpark-carl-rahe",
    "name": "Little Miami River",
    "reach": "Roger's Ballpark to Carl A. Rahe Access",
    "state": "Ohio",
    "region": "Southwest Ohio",
    "summary": "Short Warren County scenic float from South Lebanon's Roger's Ballpark Access to the Carl A. Rahe Access at Foster, using the lower Little Miami's public access chain and a conservative Milford-gauge flow floor.",
    "statusText": "Use the Milford USGS flow as a downstream proxy. Treat 300 cfs as the conservative floor for a cleaner Class I float, and avoid high, muddy, rising, or debris-loaded water.",
    "latitude": 39.3676,
    "longitude": -84.215533,
    "gaugeSource": {
      "id": "usgs-03245500",
      "provider": "usgs",
      "siteId": "03245500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Little Miami River at Milford, OH",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03245500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks",
        "cold_water"
      ],
      "safetyNotes": [
        "This is a Class I scenic reach, but the Little Miami still rises quickly after storms and can carry fresh wood, strainers, and muddy pushy current.",
        "The app uses a broad lower-Little-Miami flow floor because no manager-published Roger's-to-Rahe gauge ladder was found.",
        "Stay with the named public accesses and avoid improvising on private banks or bridge-only emergency points."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "RiverScout Little Miami broad flow range",
        "url": "https://riverscout.app/rivers/ohio/little-miami-river",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "April through October is the normal recreational window. Spring and post-rain water can be pushy or muddy, while late-summer flows may get shallow enough for dragging; check the live gauge and recent rain before committing.",
      "difficulty": "easy",
      "difficultyNotes": "Short Class I scenic-river day with riffles and current but no shipped whitewater/play framing. It still needs basic moving-water judgment around wood, bridges, shallow bars, and fast post-storm water.",
      "confidenceNotes": "Confidence is acceptable for a conservative minimum-only add. Warren County Park District documents the exact public shuttle from South Lebanon Roger's Ballpark Access to Carl A. Rahe Access; Buckeye United Fly Fishers publishes river-mile and GPS support for both accesses; USGS operates the Milford gauge used by lower Little Miami paddling sources; and RiverScout / CanWePaddle provide numeric lower-Little-Miami community flow context. Because no official Roger's-to-Rahe threshold ladder surfaced, the app does not claim an ideal range or high cutoff."
    },
    "evidenceNotes": [
      {
        "label": "Requested public route",
        "value": "South Lebanon Roger's Ballpark to Carl A. Rahe",
        "note": "Warren County Park District used this exact shuttle pattern for a public Little Miami kayaking event, meeting at Carl A. Rahe and shuttling to South Lebanon Roger's Ballpark before floating back to Rahe.",
        "sourceUrl": "https://www.warrencountyparks.com/events/event/kayak-the-little-miami-with-warren-water-striders/"
      },
      {
        "label": "Route mileage",
        "value": "About 5.5 miles",
        "note": "Buckeye United Fly Fishers lists Roger's Ball Park at river mile 33.4 and Carl A. Rahe Access at river mile 27.9, supporting a 5.5-mile route.",
        "sourceUrl": "https://buckeyeflyfishers.com/local-waters/little-miami-river/"
      },
      {
        "label": "Put-in coordinates",
        "value": "Roger's Ball Park: 39.3676, -84.2155",
        "note": "The access list places Roger's Ball Park at Hobart and High in South Lebanon, river right just upstream of the Main Street bridge, with parking and picnicking.",
        "sourceUrl": "https://buckeyeflyfishers.com/local-waters/little-miami-river/"
      },
      {
        "label": "Take-out coordinates",
        "value": "Carl A. Rahe Access: 39.3182, -84.2526",
        "note": "Warren County Park District publishes Carl A. Rahe Access Park coordinates for the event meet/take-out, and the access list independently places Carl A. Rahe at river mile 27.9 with parking, restrooms, and picnicking.",
        "sourceUrl": "https://www.warrencountyparks.com/events/event/kayak-the-little-miami-with-warren-water-striders/"
      },
      {
        "label": "Live gauge",
        "value": "USGS 03245500 at Milford",
        "note": "USGS operates the Little Miami River at Milford monitoring location, and both RiverScout and CanWePaddle use station 03245500 for lower Little Miami flow context.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03245500/"
      },
      {
        "label": "Conservative flow floor",
        "value": "300 cfs",
        "note": "RiverScout lists the broader Little Miami optimal range as 300-2,000 cfs on USGS 03245500. CanWePaddle lists the adjacent upstream Morrow-to-South-Lebanon Class I reach as generally runnable from 100-2,000 cfs, so Paddle Today uses the more conservative 300 cfs floor and no ideal band.",
        "sourceUrl": "https://riverscout.app/rivers/ohio/little-miami-river"
      }
    ],
    "sourceLinks": [
      {
        "label": "Warren County Park District Roger's to Rahe kayaking event",
        "url": "https://www.warrencountyparks.com/events/event/kayak-the-little-miami-with-warren-water-striders/",
        "provider": "local"
      },
      {
        "label": "Buckeye United Fly Fishers Little Miami access list",
        "url": "https://buckeyeflyfishers.com/local-waters/little-miami-river/",
        "provider": "local"
      },
      {
        "label": "USGS 03245500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03245500/",
        "provider": "usgs"
      },
      {
        "label": "RiverScout Little Miami flow context",
        "url": "https://riverscout.app/rivers/ohio/little-miami-river",
        "provider": "local"
      },
      {
        "label": "CanWePaddle Morrow to South Lebanon gauge context",
        "url": "https://canwepaddle.com/rivers/ohio/little-miami-morrow-to-south-lebanon/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "little-miami-river-kelley-milford",
    "slug": "little-miami-river-kelley-milford",
    "name": "Little Miami River",
    "reach": "Kelley Nature Preserve to Jim Terrell Park",
    "state": "Ohio",
    "region": "Southwest Ohio",
    "summary": "Short lower Little Miami run from the public Kelley Nature Preserve launch to Milford, with scenic-river access, riffles, small ledges, and several Class I-II play features when the Milford gauge is high enough.",
    "statusText": "Guarded Class I-II play route. Use the Milford gauge; treat 5.5 to 7.5 ft as the best window, 4.6 ft as the low runnable floor, and 9 ft as the upper app ceiling before the run becomes sketchy or flood-prone.",
    "latitude": 39.20997,
    "longitude": -84.30608,
    "routeType": "whitewater",
    "gaugeSource": {
      "id": "usgs-03245500",
      "provider": "usgs",
      "siteId": "03245500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Little Miami River at Milford, OH",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03245500/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "low_head_dam",
        "whitewater",
        "strainers",
        "cold_water"
      ],
      "safetyNotes": [
        "Boathouse Rapid, old low-head-dam remnants, shallow ledges, holes, and possible rebar/manmade hazards require whitewater judgment.",
        "American Whitewater accident records include a near-drowning at Boathouse Rapid tied to the old low-head-dam hydraulic, no PFD, and inexperience.",
        "The app score follows American Whitewater feature guidance, not tubing/livery minimum-depth guidance.",
        "Avoid low-water walking, washed-out high water, post-rain debris, and cold-water conditions unless the group has appropriate skill and gear."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 5.5,
      "idealMax": 7.5,
      "tooLow": 4.6,
      "tooHigh": 9,
      "thresholdSource": {
        "label": "American Whitewater Little Miami Kelley-to-Milford gauge guidance",
        "url": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=10600",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
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
      "seasonNotes": "Spring and rain-refreshed periods are best for the AW play levels. Summer recreational floating may still occur below the app target, but this route score is calibrated to the Kelley-to-Milford Class I-II feature guidance rather than livery-style low-water floating.",
      "difficulty": "moderate",
      "difficultyNotes": "Mostly easy moving water, but the AW route includes Boathouse Rapid, old low-head-dam remnants, small holes, ledges, rock gardens, and pushier water above the preferred range.",
      "confidenceNotes": "Confidence is good for a guarded community-threshold add. AW documents the exact Kelley Nature Preserve to Jim Terrell Park run, the direct Milford gauge, a detailed stage ladder, and feature-level hazards. ODNR publishes both access points with coordinates on the Little Miami Scenic River map, and Clermont County Parks confirms Kelley has canoe/kayak access."
    },
    "evidenceNotes": [
      {
        "label": "Route and difficulty",
        "value": "4.9 miles, Class I-II",
        "note": "American Whitewater lists Kelley Nature Preserve to Milford / Jim Terrell Park as a 4.9-mile Little Miami reach with Class I-II difficulty.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/10600/main"
      },
      {
        "label": "Gauge ladder",
        "value": "4.6 to 9.0 ft runnable range",
        "note": "AW ties the reach to the Little Miami River at Milford gauge and publishes a 4.60-to-9.00 ft range, with 5.50-to-7.50 ft described as the best boatable play level and around 6.5 ft prime.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=10600"
      },
      {
        "label": "Low-water floor",
        "value": "4.6 ft",
        "note": "AW says below 4.6 ft is way too low and that 4.6-to-5.5 ft is low water with little play and possible walking in the shallows.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=10600"
      },
      {
        "label": "High-water ceiling",
        "value": "9 ft",
        "note": "AW treats 9-to-15 ft as sketchy and possibly flooding, with features washed out and other streams running.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=10600"
      },
      {
        "label": "Boathouse Rapid accident history",
        "value": "Near-drowning at 6.34 ft",
        "note": "AW accident records include an August 2021 near-drowning at Boathouse Rapid / the old low-head-dam hydraulic, with no PFD and inexperience cited as factors.",
        "sourceUrl": "https://www.americanwhitewater.org/accident/aug-2-2021-little-miami/"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 03245500",
        "note": "USGS operates the Little Miami River at Milford, OH monitoring location, which AW uses for this reach.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03245500/"
      },
      {
        "label": "Official put-in coordinates",
        "value": "Kelley Nature Preserve: 39.20997, -84.30608",
        "note": "ODNR Little Miami Scenic River map lists Kelley Nature Preserve, Clermont County Park District, as a river-left access with coordinates.",
        "sourceUrl": "https://dam.assets.ohio.gov/image/upload/ohiodnr.gov/documents/parks/streammaps/LittleMiamiScenicRiver.pdf"
      },
      {
        "label": "Official take-out coordinates",
        "value": "Jim Terrell Park: 39.17041, -84.29856",
        "note": "ODNR Little Miami Scenic River map lists the canoe launch at Jim Terrell Park in Milford as river-right access with coordinates.",
        "sourceUrl": "https://dam.assets.ohio.gov/image/upload/ohiodnr.gov/documents/parks/streammaps/LittleMiamiScenicRiver.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "American Whitewater Little Miami Kelley to Milford",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/10600/main",
        "provider": "american_whitewater"
      },
      {
        "label": "American Whitewater Little Miami gauge info",
        "url": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=10600",
        "provider": "american_whitewater"
      },
      {
        "label": "USGS 03245500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03245500/",
        "provider": "usgs"
      },
      {
        "label": "ODNR Little Miami Scenic River map",
        "url": "https://dam.assets.ohio.gov/image/upload/ohiodnr.gov/documents/parks/streammaps/LittleMiamiScenicRiver.pdf",
        "provider": "local"
      },
      {
        "label": "Clermont County Parks Kelley Nature Preserve",
        "url": "https://www.clermontparks.org/kelley-nature-preserve/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "east-fork-little-miami-river-williamsburg-tunnel-mill",
    "slug": "east-fork-little-miami-river-williamsburg-tunnel-mill",
    "name": "East Fork Little Miami River",
    "reach": "Williamsburg Community Park to Tunnel Mill Boat Ramp",
    "state": "Ohio",
    "region": "Southwest Ohio",
    "summary": "Short East Fork run above Harsha Lake with wooded park banks, Class I-II current, strainers, and a direct Williamsburg gauge. This is a moving-water day trip, not a flatwater lake paddle.",
    "statusText": "Use the Williamsburg gauge. Treat roughly 350 to 900 cfs as the most approachable moving-water window, 250 cfs as the bare runnable floor, and 4000 cfs as high runnable rather than a broad beginner recommendation.",
    "latitude": 39.0519,
    "longitude": -84.0504,
    "routeType": "whitewater",
    "gaugeSource": {
      "id": "usgs-03246500",
      "provider": "usgs",
      "siteId": "03246500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "East Fork Little Miami River at Williamsburg, OH",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03246500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise"
      ],
      "safetyNotes": [
        "This route is hidden from casual default discovery because American Whitewater is the threshold source and the reach has Class I-II rapids and strainers.",
        "American Whitewater describes several islands and about a half-dozen Class I-II rapids, so treat this as real moving water rather than a casual inner-tube float.",
        "Strainers are the main named hazard and can shift after storms or high water.",
        "The route finishes at the lake edge; avoid drifting past the planned launch into bigger open-water conditions or boat traffic without a separate plan."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 350,
      "idealMax": 900,
      "tooLow": 250,
      "tooHigh": 4000,
      "thresholdSource": {
        "label": "American Whitewater East Fork Williamsburg reach guidance",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/10632/main",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
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
      "seasonNotes": "Spring and rain-refreshed shoulder-season windows are the safest bet. Low summer water can get thin, while post-rain spikes quickly make the current pushier and can carry more wood.",
      "difficulty": "moderate",
      "difficultyNotes": "AW rates the route Class I-II with islands, rapids, and strainers. This is approachable for paddlers with current-reading basics, but it is not a lazy stillwater lap.",
      "confidenceNotes": "Confidence is acceptable for a guarded add: American Whitewater documents the exact Williamsburg-to-Twin-Bridges launch pair, same-river direct gauge, numeric range, and route character. USACE and ODNR support the public East Fork / William H. Harsha Lake recreation and campground context, though the exact river-launch coordinates remain community-sourced rather than park GIS."
    },
    "evidenceNotes": [
      {
        "label": "Route and difficulty",
        "value": "4.9 miles, Class I-II",
        "note": "American Whitewater lists Williamsburg Community Park to the Twin Bridges Road launch ramp above East Fork Lake as a 4.9-mile Class I-II reach.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/10632/main"
      },
      {
        "label": "Published AW range",
        "value": "250 to 4000 cfs",
        "note": "American Whitewater ties the reach to USGS 03246500 and labels 250 to 4000 cfs as barely runnable through high runnable.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/10632/main"
      },
      {
        "label": "Recent trip report",
        "value": "About 400 cfs described as a medium recreational level",
        "note": "A May 2026 AW trip report described roughly 400 cfs as fun and relaxing in recreational kayaks, with strainers and snags easily avoided and whitewater kayakers likely bored.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/10632/reports/bUbCgWcfDIWXvhqhjGBfp"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 03246500",
        "note": "USGS operates the East Fork Little Miami River at Williamsburg, OH monitoring location used by American Whitewater for this reach.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03246500/"
      },
      {
        "label": "Public recreation corridor",
        "value": "William H. Harsha Lake / East Fork State Park public boating and camping",
        "note": "USACE says William H. Harsha Lake and East Fork State Park on the East Fork offer boating, camping, and other public recreation, with Ohio DNR operating many of the recreation areas.",
        "sourceUrl": "https://www.lrd.usace.army.mil/Submit-ArticleCS/Recreation/Article/3641401/william-h-harsha-lake/"
      },
      {
        "label": "Camping support",
        "value": "East Fork State Park Campground nearby",
        "note": "USACE says East Fork State Park operates a 416-site class A campground and notes a boat ramp and beach for registered campers.",
        "sourceUrl": "https://www.lrd.usace.army.mil/Submit-ArticleCS/Recreation/Article/3641401/william-h-harsha-lake/"
      },
      {
        "label": "Hazards",
        "value": "Islands, Class I-II rapids, strainers, lake-finish exposure",
        "note": "AW describes several islands, about a half-dozen Class I-II rapids, and mostly avoidable strainers. The public lake and campground pages also show this is part of a larger boating area rather than an isolated creek run.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/10632/main"
      }
    ],
    "sourceLinks": [
      {
        "label": "American Whitewater East Fork Williamsburg to Twin Bridges",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/10632/main",
        "provider": "american_whitewater"
      },
      {
        "label": "USGS 03246500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03246500/",
        "provider": "usgs"
      },
      {
        "label": "Ohio DNR East Fork State Park",
        "url": "https://ohiodnr.gov/go-and-do/plan-a-visit/find-a-property/east-fork-state-park",
        "provider": "local"
      },
      {
        "label": "Ohio DNR East Fork State Park Campground",
        "url": "https://ohiodnr.gov/go-and-do/plan-a-visit/find-a-property/east-fork-state-park-campground",
        "provider": "local"
      },
      {
        "label": "USACE William H. Harsha Lake recreation page",
        "url": "https://www.lrd.usace.army.mil/Submit-ArticleCS/Recreation/Article/3641401/william-h-harsha-lake/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "cuyahoga-river-ira-lock-29",
    "slug": "cuyahoga-river-ira-lock-29",
    "name": "Cuyahoga River",
    "reach": "Ira Road to Lock 29 / Route 303",
    "state": "Ohio",
    "region": "Cuyahoga Valley",
    "summary": "Cuyahoga Valley training run from the Ira Road corridor to Peninsula, with mostly Class I current, flatwater stretches, strainers, and a few attainment/play features when the Old Portage gauge is in range.",
    "statusText": "Use the Cuyahoga at Old Portage gauge. Treat roughly 250 to 700 cfs as the guarded training window, 100 cfs as the bare runnable floor, and 1000 cfs as the upper app ceiling. Scout visually after rain or snowmelt.",
    "latitude": 41.184583,
    "longitude": -81.58335,
    "gaugeSource": {
      "id": "usgs-04206000",
      "provider": "usgs",
      "siteId": "04206000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Cuyahoga River at Old Portage, OH",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04206000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 250,
      "idealMax": 700,
      "tooLow": 100,
      "tooHigh": 1000,
      "thresholdSource": {
        "label": "American Whitewater Cuyahoga Ira-to-Route 303 gauge guidance",
        "url": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=3355",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
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
      "seasonNotes": "Spring through fall can work when Old Portage is in range. Treat recent rain, snowmelt, and fast rises as reasons to scout rather than trusting the gauge alone.",
      "difficulty": "moderate",
      "difficultyNotes": "AW rates the reach Class I and describes only a few rapids between flatwater stretches, but strainers, long-boat handling, training attainments, poor water quality, and changing post-storm wood keep this from being a simple beginner float.",
      "confidenceNotes": "Confidence is acceptable for a guarded community-threshold add: AW documents the exact E. Ira Road to Route 303 reach, distance, Class I character, Old Portage gauge, and 100-1000 cfs range. ODNR/Cuyahoga River Water Trail materials and NPS confirm Lock 29 at Route 303 as an official access with coordinates. The put-in is less polished: AW directs paddlers to park at the nearby Ira/Towpath Trail lot, and NPS confirms Ira Trailhead, but the actual riverbank put-in should be verified on arrival."
    },
    "evidenceNotes": [
      {
        "label": "Route and distance",
        "value": "6.9 miles, Class I",
        "note": "American Whitewater lists the Cuyahoga E. Ira Road to Route 303 reach as 6.9 miles with Class I difficulty.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/3355/main"
      },
      {
        "label": "Published AW range",
        "value": "100 to 1000 cfs",
        "note": "AW gauge information for reach 3355 ties the route to USGS 04206000 and lists 100 to 1000 cfs as barely runnable through high runnable.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=3355"
      },
      {
        "label": "Guarded app target",
        "value": "250 to 700 cfs",
        "note": "The app target is a conservative subset of the AW range: AW route text says one upstream training rapid is nearly impossible at 250 cfs and under but probably attainable around 700 cfs, while the rapid below Ira Road gets harder above 300 cfs.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/3355/main"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 04206000",
        "note": "USGS operates the Cuyahoga River at Old Portage, OH monitoring location used by AW for this reach.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04206000/"
      },
      {
        "label": "Put-in support",
        "value": "Ira Trailhead / Ira Road corridor",
        "note": "AW directs paddlers to the Ira Road put-in and nearby Towpath Trail parking; NPS confirms Ira Trailhead at 3801 Riverview Road with public parking and restrooms.",
        "sourceUrl": "https://home.nps.gov/places/000/ira-trailhead.htm"
      },
      {
        "label": "Take-out support",
        "value": "Lock 29 Trailhead / Route 303",
        "note": "The Cuyahoga River Water Trail map lists Lock 29 Trailhead at river mile 29 with coordinates, 50-foot carry, parking, and Cuyahoga Valley National Park management; it is the official access at Peninsula / Route 303.",
        "sourceUrl": "https://dam.assets.ohio.gov/image/upload/odnr/watertrails/CuyahogaRiverWaterTrail.pdf"
      },
      {
        "label": "Hazards",
        "value": "Strainers, water quality, lowhead-dam remnant nearby",
        "note": "AW identifies strainers as the main route hazard and notes poor but improving water quality. ODNR/NPS materials warn about lowhead dams, foot entrapment, swift water, and changing obstructions on the Cuyahoga River Water Trail.",
        "sourceUrl": "https://dam.assets.ohio.gov/image/upload/odnr/watertrails/CuyahogaRiverWaterTrail.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "American Whitewater Cuyahoga Ira to Route 303",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/3355/main",
        "provider": "american_whitewater"
      },
      {
        "label": "American Whitewater Cuyahoga Ira gauge info",
        "url": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=3355",
        "provider": "american_whitewater"
      },
      {
        "label": "USGS 04206000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-04206000/",
        "provider": "usgs"
      },
      {
        "label": "ODNR Cuyahoga River Water Trail PDF",
        "url": "https://dam.assets.ohio.gov/image/upload/odnr/watertrails/CuyahogaRiverWaterTrail.pdf",
        "provider": "local"
      },
      {
        "label": "NPS Ira Trailhead",
        "url": "https://home.nps.gov/places/000/ira-trailhead.htm",
        "provider": "local"
      },
      {
        "label": "NPS Lock 29 River Access",
        "url": "https://www.nps.gov/places/lock-29-river-access.htm",
        "provider": "local"
      }
    ]
  },
  {
    "id": "cuyahoga-river-lock-29-boston-store",
    "slug": "cuyahoga-river-lock-29-boston-store",
    "name": "Cuyahoga River",
    "reach": "Lock 29 to Boston Store Trailhead",
    "state": "Ohio",
    "region": "Cuyahoga Valley",
    "summary": "Short Cuyahoga Valley National Park run from Peninsula to Boston, with an initial Class II pulse that settles into mostly Class I current and an excellent shuttle/public-access story.",
    "statusText": "Use the Jaite gauge. Treat roughly 500 to 1200 cfs as the best beginner-friendly window, 300 cfs as the low runnable floor, and 5000 cfs as American Whitewater’s high runnable ceiling rather than a broad novice recommendation.",
    "latitude": 41.2428,
    "longitude": -81.55067,
    "gaugeSource": {
      "id": "usgs-04206425",
      "provider": "usgs",
      "siteId": "04206425",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Cuyahoga River at Jaite, OH",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04206425/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "low_head_dam",
        "whitewater",
        "strainers",
        "cold_water"
      ],
      "safetyNotes": [
        "The Lock 29 access is below the main hazard, but the upstream mill race, dam remnant, and waterfall area still matter if you scout or accidentally continue above the access.",
        "NPS says the initial Class II flow settles into Class I after about half a mile, so newer paddlers should not treat the first bend casually at higher water.",
        "Cold water, storm wood, and fast rises can quickly change a short park run into a rescue problem."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 500,
      "idealMax": 1200,
      "tooLow": 300,
      "tooHigh": 5000,
      "thresholdSource": {
        "label": "American Whitewater Cuyahoga Peninsula gauge guidance",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/2500/main",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
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
      "seasonNotes": "This is a short, flexible shoulder-season and summer route when the Jaite gauge is in range, but recent rain, snowmelt, or cold weather should push you toward more scouting and more conservative group choices.",
      "difficulty": "moderate",
      "difficultyNotes": "AW rates the run Class I-II and calls it a good novice/open-canoe section, but the first half-mile still has enough current, wave trains, and wood potential to require basic moving-water skills.",
      "confidenceNotes": "Confidence is strong for a guarded add: American Whitewater documents the exact Lock 29 to Boston Mills Road reach, direct Jaite gauge, and numeric range. NPS now maintains official river-access pages for both Lock 29 and Boston Store, each with current paddler logistics, while ODNR’s water-trail map corroborates the public CVNP access pair."
    },
    "evidenceNotes": [
      {
        "label": "Route and difficulty",
        "value": "2.4 miles, Class I-II",
        "note": "American Whitewater lists the Peninsula reach from OH 303 / Lock 29 to Boston Mills Road as a 2.4-mile Class I-II run.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/2500/main"
      },
      {
        "label": "Published AW range",
        "value": "300 to 5000 cfs",
        "note": "American Whitewater ties the reach to the Jaite gauge and labels 300 to 5000 cfs as barely runnable through high runnable.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/2500/main"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 04206425",
        "note": "USGS operates the Cuyahoga River at Jaite, OH monitoring location used by American Whitewater for this reach.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-04206425/"
      },
      {
        "label": "Official put-in support",
        "value": "Lock 29 Trailhead public river access",
        "note": "NPS says Lock 29 provides paddlers with access to the Cuyahoga River Water Trail and directs users to park at Lock 29 Trailhead and follow the marked path to the river.",
        "sourceUrl": "https://www.nps.gov/places/lock-29-river-access.htm"
      },
      {
        "label": "Official take-out support",
        "value": "Boston Store Trailhead public river access",
        "note": "NPS says Boston Store Trailhead provides access to the Cuyahoga River Water Trail, with a marked path to the river and nearby visitor information, food, and drinking water.",
        "sourceUrl": "https://www.nps.gov/places/boston-store-trailhead-river-access.htm"
      },
      {
        "label": "Hazards",
        "value": "Initial Class II current, upstream dam remnant, strainers",
        "note": "NPS says the initial Class II flow settles into Class I after half a mile and warns paddlers above the access to stay away from the mill race, waterfall, and dam remnant. AW also notes strainers and a manmade side-channel barrier hazard.",
        "sourceUrl": "https://www.nps.gov/places/lock-29-river-access.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "American Whitewater Cuyahoga Peninsula reach",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/2500/main",
        "provider": "american_whitewater"
      },
      {
        "label": "USGS 04206425 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-04206425/",
        "provider": "usgs"
      },
      {
        "label": "NPS Lock 29 River Access",
        "url": "https://www.nps.gov/places/lock-29-river-access.htm",
        "provider": "local"
      },
      {
        "label": "NPS Boston Store Trailhead River Access",
        "url": "https://www.nps.gov/places/boston-store-trailhead-river-access.htm",
        "provider": "local"
      },
      {
        "label": "NPS Paddling the River",
        "url": "https://www.nps.gov/cuva/planyourvisit/paddling-the-river.htm",
        "provider": "local"
      },
      {
        "label": "ODNR Cuyahoga River Water Trail PDF",
        "url": "https://dam.assets.ohio.gov/image/upload/odnr/watertrails/CuyahogaRiverWaterTrail.pdf",
        "provider": "local"
      }
    ]
  }
];
