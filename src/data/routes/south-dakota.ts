// State-scoped route data. Keep entries in route-family and downstream order.
import type { River } from '../../lib/types';

export const southDakotaRoutes: River[] = [
  {
    "id": "skunk-creek-legacy-park-farm-field",
    "slug": "skunk-creek-legacy-park-farm-field",
    "name": "Skunk Creek",
    "reach": "Legacy Park to Farm Field Park",
    "state": "South Dakota",
    "region": "Sioux Falls",
    "summary": "Short Sioux Falls Skunk Creek paddle from Legacy Park to Farm Field Park, using city park access points and the direct USGS Skunk Creek gauge. This is an urban creek route with low-water, debris, and water-quality caveats.",
    "statusText": "Use the Skunk Creek at Sioux Falls gauge. Around 4.5 ft is the low-water marker; below that, expect shallow scraping, walking, and poor urban-creek conditions. Paddler reports will help tune the useful range.",
    "latitude": 43.5435603,
    "longitude": -96.8111739,
    "gaugeSource": {
      "id": "usgs-06481500",
      "provider": "usgs",
      "siteId": "06481500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Skunk Creek at Sioux Falls, SD",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06481500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 4.5,
      "thresholdSource": {
        "label": "Sioux Empire Paddlers Skunk Creek Sioux Falls route guidance",
        "url": "https://siouxempirepaddlers.org/rivers-and-creeks/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "Skunk Creek is an urban prairie creek that often needs spring water or recent rain to avoid dragging. Rain can improve depth but can also worsen bacteria, stormwater runoff, debris, and landing conditions.",
      "difficulty": "easy",
      "difficultyNotes": "This is a short urban flatwater-to-easy-current paddle between Sioux Falls parks. Treat it as easy only at ordinary levels; low water means scraping and walking, while high or rising water can hide debris, sharpen bridge approaches, and complicate the Farm Field take-out near the Big Sioux confluence.",
      "confidenceNotes": "Confidence is good for a conservative South Dakota add: Sioux Empire Paddlers names Skunk Creek from Legacy Park to Farm Field Park as a 5-mile route, ties it to the Skunk Creek Sioux Falls USGS flow link, and gives a 4.5 ft good-paddling floor. City of Sioux Falls confirms both Legacy Park and Farm Field Park as public parks with boat/canoe/kayak access and coordinates, and USGS 06481500 showed same-day May 26, 2026 discharge and gage-height observations during review. The app uses minimum-only scoring because the level support is local-community guidance rather than an official manager-published paddling band, and route copy keeps water-quality and urban-creek caveats prominent."
    },
    "evidenceNotes": [
      {
        "label": "Route-specific guide",
        "value": "Legacy Park to Farm Field Park, 5 mi",
        "note": "Sioux Empire Paddlers lists Skunk Creek at Legacy Park as point 1 on the Sioux Falls in-town map, says it flows into the Big Sioux River, and gives 5 miles to Farm Field Park.",
        "sourceUrl": "https://siouxempirepaddlers.org/rivers-and-creeks/"
      },
      {
        "label": "Low-water floor",
        "value": "4.5 ft minimum-only",
        "note": "Sioux Empire Paddlers says 4.5 ft and up is a good paddling level for the Skunk Creek Sioux Falls flow link. The app uses only that conservative floor and does not infer an ideal or high-water band.",
        "sourceUrl": "https://siouxempirepaddlers.org/rivers-and-creeks/"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 06481500",
        "note": "USGS operates Skunk Creek at Sioux Falls, SD. During the May 26, 2026 review, the legacy current-conditions page showed same-day discharge and gage-height observations.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=06481500"
      },
      {
        "label": "Public put-in",
        "value": "Legacy Park boat/canoe/kayak access",
        "note": "City of Sioux Falls lists Legacy Park with boat/canoe/kayak access, restrooms, public park hours, and coordinates at 7001 W. 12th St.",
        "sourceUrl": "https://www.siouxfalls.gov/activities-recreation/parks-trails/directory/parks/legacy"
      },
      {
        "label": "Public take-out",
        "value": "Farm Field Park kayak and canoe access",
        "note": "City of Sioux Falls lists Farm Field Park with kayak and canoe access, a boat-launch photo, public park hours, and coordinates at 4401 S Western Ave.",
        "sourceUrl": "https://www.siouxfalls.gov/activities-recreation/parks-trails/directory/parks/farm-field"
      },
      {
        "label": "Water quality",
        "value": "Weekly city monitoring May-Sep for E. coli",
        "note": "City of Sioux Falls monitors Big Sioux River and Skunk Creek water quality, including one Skunk Creek location and E. coli from May through September. Check the city dashboard and avoid contact after heavy rain or known poor results.",
        "sourceUrl": "https://www.siouxfalls.gov/resident-services/utilities-billing/water/water-quality/surface-water-quality"
      },
      {
        "label": "South Dakota stream hazard",
        "value": "Fence caution",
        "note": "South Dakota GFP warns that fences cross many navigable streams in the state. Scout any unexpected obstruction rather than forcing it.",
        "sourceUrl": "https://gfp.sd.gov/paddling/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Sioux Empire Paddlers rivers and creeks",
        "url": "https://siouxempirepaddlers.org/rivers-and-creeks/",
        "provider": "local"
      },
      {
        "label": "USGS 06481500 Skunk Creek at Sioux Falls",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06481500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 06481500 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=06481500",
        "provider": "usgs"
      },
      {
        "label": "City of Sioux Falls Legacy Park",
        "url": "https://www.siouxfalls.gov/activities-recreation/parks-trails/directory/parks/legacy",
        "provider": "local"
      },
      {
        "label": "City of Sioux Falls Farm Field Park",
        "url": "https://www.siouxfalls.gov/activities-recreation/parks-trails/directory/parks/farm-field",
        "provider": "local"
      },
      {
        "label": "City of Sioux Falls Big Sioux River water quality",
        "url": "https://www.siouxfalls.gov/resident-services/utilities-billing/water/water-quality/surface-water-quality",
        "provider": "local"
      },
      {
        "label": "South Dakota GFP paddling",
        "url": "https://gfp.sd.gov/paddling/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "big-sioux-river-farm-field-rotary",
    "slug": "big-sioux-river-farm-field-rotary",
    "name": "Big Sioux River",
    "reach": "Farm Field Park to Rotary Park",
    "state": "South Dakota",
    "region": "Sioux Falls",
    "summary": "Short Sioux Falls Big Sioux paddle from Farm Field Park to Rotary Park, using city-managed kayak/canoe accesses and the direct USGS Sioux Falls gauge at the put-in. This is an urban river route with water-quality and low-water caveats.",
    "statusText": "Use the Big Sioux River at Sioux Falls gauge. Around 250 cfs is the low-water marker; below that, expect dragging, shallow riffles, and poor urban-water conditions. Paddler reports will help tune the useful range.",
    "latitude": 43.5028832,
    "longitude": -96.749131,
    "gaugeSource": {
      "id": "usgs-06482000",
      "provider": "usgs",
      "siteId": "06482000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Big Sioux River at Sioux Falls, SD",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06482000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 250,
      "thresholdSource": {
        "label": "Sioux Empire Paddlers Big Sioux River Sioux Falls route guidance",
        "url": "https://siouxempirepaddlers.org/rivers-and-creeks/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "Sioux Empire Paddlers says the favored Lien Park-to-Newton Hills stretch can usually be paddled spring and summer. For this shorter city reach, recent rain can improve depth but can also worsen debris, bacteria, stormwater, and landing conditions.",
      "difficulty": "easy",
      "difficultyNotes": "This is a short urban flatwater-to-easy-current paddle between city park accesses. Treat it as easy only at ordinary levels; low water means scraping and walking, while high or rising water can hide debris, sharpen bridge approaches, and complicate landings.",
      "confidenceNotes": "Confidence is good for a conservative South Dakota add: City of Sioux Falls confirms Farm Field Park and Rotary Park both have kayak/canoe access with coordinates, Sioux Empire Paddlers names the exact Farm Field-to-Rotary segment and gives a 250 cfs low-water floor tied to the Big Sioux River Sioux Falls USGS flow link, and USGS 06482000 is located essentially at the put-in. The app uses minimum-only scoring because the level support is local-community guidance rather than an official manager-published paddling band, and route copy keeps the water-quality and urban-river caveats prominent."
    },
    "evidenceNotes": [
      {
        "label": "Route-specific guide",
        "value": "Farm Field Park to Rotary Park, 4.15 mi",
        "note": "Sioux Empire Paddlers lists Farm Field Park as point 2 on the Big Sioux in-town map, Rotary Park as point 3, and gives 4.15 miles between them.",
        "sourceUrl": "https://siouxempirepaddlers.org/rivers-and-creeks/"
      },
      {
        "label": "Low-water floor",
        "value": "250 cfs minimum-only",
        "note": "Sioux Empire Paddlers says 250 cfs and up is a good paddling level for the Big Sioux River Sioux Falls flow link used for the in-town Big Sioux access points.",
        "sourceUrl": "https://siouxempirepaddlers.org/rivers-and-creeks/"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 06482000",
        "note": "USGS operates Big Sioux River at Sioux Falls, SD. The gauge is the local Sioux Falls Big Sioux flow source linked by the paddling guide and sits next to the Farm Field Park put-in corridor.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06482000/"
      },
      {
        "label": "Public put-in",
        "value": "Farm Field Park kayak and canoe access",
        "note": "City of Sioux Falls lists Farm Field Park with kayak and canoe access, a boat-launch photo, public park hours, and coordinates at 4401 S Western Ave.",
        "sourceUrl": "https://www.siouxfalls.gov/activities-recreation/parks-trails/directory/parks/farm-field"
      },
      {
        "label": "Public take-out",
        "value": "Rotary Park kayak and canoe access",
        "note": "City of Sioux Falls lists Rotary Park on both sides of the Big Sioux River with kayak and canoe access, restrooms, public park hours, and coordinates.",
        "sourceUrl": "https://www.siouxfalls.gov/activities-recreation/parks-trails/directory/parks/rotary"
      },
      {
        "label": "Water quality",
        "value": "Weekly city monitoring May-Sep for E. coli",
        "note": "City of Sioux Falls monitors Big Sioux River and Skunk Creek water quality, including E. coli from May through September. Check the city dashboard and avoid contact after heavy rain or known poor results.",
        "sourceUrl": "https://www.siouxfalls.gov/resident-services/utilities-billing/water/water-quality/surface-water-quality"
      },
      {
        "label": "Broader trail context",
        "value": "Jay Heath water trail access network",
        "note": "South Dakota GFP identifies the Jay Heath Canoe and Kayak Trail as a Big Sioux River water trail with launch sites, campgrounds, and site information. This app route intentionally uses one short city segment rather than the full corridor.",
        "sourceUrl": "https://gfp.sd.gov/paddling/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Sioux Empire Paddlers rivers and creeks",
        "url": "https://siouxempirepaddlers.org/rivers-and-creeks/",
        "provider": "local"
      },
      {
        "label": "USGS 06482000 Big Sioux River at Sioux Falls",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06482000/",
        "provider": "usgs"
      },
      {
        "label": "City of Sioux Falls Farm Field Park",
        "url": "https://www.siouxfalls.gov/activities-recreation/parks-trails/directory/parks/farm-field",
        "provider": "local"
      },
      {
        "label": "City of Sioux Falls Rotary Park",
        "url": "https://www.siouxfalls.gov/activities-recreation/parks-trails/directory/parks/rotary",
        "provider": "local"
      },
      {
        "label": "City of Sioux Falls Big Sioux River water quality",
        "url": "https://www.siouxfalls.gov/resident-services/utilities-billing/water/water-quality/surface-water-quality",
        "provider": "local"
      },
      {
        "label": "South Dakota GFP paddling",
        "url": "https://gfp.sd.gov/paddling/",
        "provider": "local"
      },
      {
        "label": "South Dakota GFP Jay Heath Trail map PDF",
        "url": "https://gfp.sd.gov/userdocs/JayHeathTrail_85x11.pdf",
        "provider": "local"
      }
    ]
  },
  {
    "id": "split-rock-creek-split-rock-park-palisades",
    "slug": "split-rock-creek-split-rock-park-palisades",
    "name": "Split Rock Creek",
    "reach": "Split Rock Park to Palisades State Park",
    "state": "South Dakota",
    "region": "Southeast South Dakota",
    "summary": "Short, scenic Garretson run from Split Rock Park to Palisades State Park with quartzite walls, riffles, ledges, and a direct USGS Corson gauge. This is a moving-water creek route, not a casual lake paddle.",
    "statusText": "Use the Split Rock Creek at Corson gauge. Around 4.5 ft is the low-water marker; below that, expect shallow, scrapey creek conditions. Paddler reports will help tune the useful range.",
    "latitude": 43.713056,
    "longitude": -96.503056,
    "routeType": "whitewater",
    "gaugeSource": {
      "id": "usgs-06482610",
      "provider": "usgs",
      "siteId": "06482610",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Split Rock Creek at Corson, SD",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06482610/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 4.5,
      "thresholdSource": {
        "label": "Sioux Empire Paddlers Split Rock Creek gauge and route guidance",
        "url": "https://siouxempirepaddlers.org/split-rock-creek/",
        "provider": "local"
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
        10
      ],
      "seasonNotes": "Split Rock Creek is small and rain-sensitive. Spring and post-rain windows are the most reliable; summer can be too shallow, while high water quickly raises the consequence of ledges, fences, wood, and tight banks.",
      "difficulty": "moderate",
      "difficultyNotes": "Sioux Empire Paddlers describes this 2.8-mile route as Class I to II, with some Class III features around 1,000 cfs. The short mileage does not make it beginner water; scout ledges and avoid the route if fences, strainers, or high water exceed the group.",
      "confidenceNotes": "Confidence is good for a conservative first South Dakota add: local route guidance names the exact Split Rock Park to Palisades State Park run, ties it to the direct USGS Corson gauge, and gives a numeric 4.5 ft low-water floor; South Dakota GFP confirms Split Rock Creek as a canoeing/kayaking option at Palisades State Park, and Visit Garretson confirms Split Rock Park has a canoe/kayak launch below the dam. The app uses minimum-only scoring because the numeric guidance is local-community support rather than an official manager-published paddling band."
    },
    "evidenceNotes": [
      {
        "label": "Route-specific guide",
        "value": "2.8 mi; Split Rock Park to Palisades State Park",
        "note": "Sioux Empire Paddlers describes the standard 2.8-mile route from the city park to Palisades State Park and ties it to the Split Rock Creek at Corson gauge.",
        "sourceUrl": "https://siouxempirepaddlers.org/split-rock-creek/"
      },
      {
        "label": "Low-water floor",
        "value": "4.5 ft minimum-only",
        "note": "Sioux Empire Paddlers says 4.5 ft or up on the USGS Corson gauge is best for this route. The app uses only that conservative floor and does not infer an ideal or high-water band.",
        "sourceUrl": "https://siouxempirepaddlers.org/split-rock-creek/"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 06482610",
        "note": "USGS operates Split Rock Creek at Corson, SD, the gauge named by the local route guide for the Split Rock Creek run.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06482610/"
      },
      {
        "label": "Public put-in",
        "value": "Split Rock Park canoe/kayak launch",
        "note": "Visit Garretson describes Split Rock Park as a city park along Split Rock Creek and notes a canoe/kayak launch downstream from the dam.",
        "sourceUrl": "https://visitgarretsonsd.com/directory/split-rock-park/"
      },
      {
        "label": "Public take-out",
        "value": "Palisades State Park",
        "note": "South Dakota Game, Fish and Parks lists canoeing and kayaking on Split Rock Creek as an activity at Palisades State Park.",
        "sourceUrl": "https://gfp.sd.gov/parks/detail/palisades-state-park/"
      },
      {
        "label": "Hazards",
        "value": "Ledges, fences, wood, high-water wave",
        "note": "Local route guidance calls out ledges, possible fences across the creek, and stronger Class III behavior near 1,000 cfs; GFP also broadly warns that fences cross many navigable South Dakota streams.",
        "sourceUrl": "https://siouxempirepaddlers.org/split-rock-creek/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Sioux Empire Paddlers Split Rock Creek",
        "url": "https://siouxempirepaddlers.org/split-rock-creek/",
        "provider": "local"
      },
      {
        "label": "USGS 06482610 Split Rock Creek at Corson",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06482610/",
        "provider": "usgs"
      },
      {
        "label": "South Dakota GFP Palisades State Park",
        "url": "https://gfp.sd.gov/parks/detail/palisades-state-park/",
        "provider": "local"
      },
      {
        "label": "Visit Garretson Split Rock Park",
        "url": "https://visitgarretsonsd.com/directory/split-rock-park/",
        "provider": "local"
      },
      {
        "label": "South Dakota GFP paddling rules and hazards",
        "url": "https://gfp.sd.gov/paddling/",
        "provider": "local"
      }
    ]
  }
];
