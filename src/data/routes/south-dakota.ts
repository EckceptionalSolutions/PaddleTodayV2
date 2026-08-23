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
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "urban_water_quality"
      ],
      "safetyNotes": [
        "Use the 4.5 ft community floor as a minimum-only screen, then inspect bridges and tight bends for storm debris, strainers, or fences before committing.",
        "Treat Skunk Creek as limited-contact urban water: check the City of Sioux Falls monitoring dashboard, avoid immersion when results are poor, and remember E. coli is monitored May through September.",
        "Take out at Farm Field Park as planned; do not continue onto the Big Sioux or toward downstream dam areas without separate route-specific planning."
      ],
      "reviewStatus": "reviewed"
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
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "dam",
        "strainers",
        "urban_water_quality"
      ],
      "safetyNotes": [
        "Use the 250 cfs community floor as a minimum-only screen, then check current weather and inspect bridges and landings for storm debris or strainers before launching.",
        "Treat the Big Sioux as limited-contact urban water: check the City of Sioux Falls monitoring dashboard, avoid immersion when results are poor, and remember E. coli is monitored May through September.",
        "Take out at Rotary Park as planned. The local guide warns of dangerous low-head dams on the broader Big Sioux; do not continue downtown without a separately verified route and portage plan."
      ],
      "reviewStatus": "reviewed"
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
    "id": "big-sioux-river-rec-area-south-highway-42",
    "slug": "big-sioux-river-rec-area-south-highway-42",
    "name": "Big Sioux River",
    "reach": "Big Sioux Recreation Area South to SD Highway 42",
    "aliases": [
      "Jay Heath Canoe and Kayak Trail Big Sioux Rec Area South to SD Hwy 42",
      "Big Sioux Recreation Area to Mary Jo Wegner Arboretum"
    ],
    "state": "South Dakota",
    "region": "Brandon / East Sioux Falls",
    "summary": "Short Jay Heath Canoe and Kayak Trail segment from the SD GFP-managed Big Sioux Recreation Area South canoe site to the SD Highway 42 / Mary Jo Wegner Arboretum access. Use it as a day paddle with a same-river upstream gauge check, private-bank awareness, and ordinary prairie-river wood and water-quality caveats.",
    "statusText": "Use the Big Sioux River at North Cliff Avenue gauge as the direct same-river corridor check. Around 300 cfs is the community low-water marker for the Cliff Avenue south-of-Sioux-Falls Big Sioux corridor; below that, expect shallow bars, slow current, and scraping.",
    "latitude": 43.573140888085128,
    "longitude": -96.600475153291086,
    "gaugeSource": {
      "id": "usgs-06482020",
      "provider": "usgs",
      "siteId": "06482020",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Big Sioux River at North Cliff Avenue at Sioux Falls, SD",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06482020/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "urban_water_quality"
      ],
      "safetyNotes": [
        "Use the 300 cfs community floor as a minimum-only screen, then make the final call from local visibility, wind, recent rain, and the actual water depth at both accesses.",
        "South Dakota GFP warns that fences cross many navigable streams. Scout any unexpected obstruction, wire, wood, or bridge debris rather than forcing it.",
        "This card intentionally starts below the Sioux Falls diversion and Falls Park hazards and ends at SD Highway 42. Do not substitute upstream downtown Jay Heath segments or continue into a longer corridor without separate low-head-dam and access planning."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "Sioux Empire Paddlers Big Sioux River Cliff Avenue south-of-Sioux-Falls flow guidance",
        "url": "https://siouxempirepaddlers.org/river-flow-rates/",
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
      "seasonNotes": "The lower Sioux Falls / Brandon Big Sioux corridor is most practical with spring water or recent rain, but rain can also worsen water quality, debris, bank mud, and bridge approaches. Confirm park and arboretum access status before driving.",
      "difficulty": "easy",
      "difficultyNotes": "This is a short public water-trail segment with easy current at ordinary levels. Treat it as easy only after checking the proxy gauge and current conditions; low water means scraping, and high or rising water can hide wood and sharpen bridge approaches.",
      "confidenceNotes": "Confidence is good for a conservative South Dakota add: South Dakota GFP's Jay Heath Canoe and Kayak Trail PDF names Big Sioux Recreation Area South to SD Hwy 42 as a 4.8-mile segment, the GFP ArcGIS access layer identifies Big Sioux Rec Area South as a parking/launch/camping canoe site and SD Hwy 42 as a parking canoe site, and Mary Jo Wegner Arboretum documents kayak/canoe launch access next to the Highway 42 bridge. Sioux Empire Paddlers gives a 300 cfs Big Sioux Cliff Avenue south-of-Sioux-Falls floor, and USGS 06482020 is a product-supported direct same-river corridor gauge for that named flow context. The app uses minimum-only scoring and route copy carries upstream-gauge, access-anchor, private-bank, fence, wood, water-quality, and no-image caveats."
    },
    "evidenceNotes": [
      {
        "label": "Route-specific guide",
        "value": "Big Sioux Rec. Area (South) to SD Hwy 42, 4.8 mi",
        "note": "South Dakota GFP's Jay Heath Canoe and Kayak Trail map names this exact Big Sioux segment and gives the mileage.",
        "sourceUrl": "https://gfp.sd.gov/userdocs/JayHeathTrail_85x11.pdf"
      },
      {
        "label": "Public put-in",
        "value": "Big Sioux Recreation Area South canoe site",
        "note": "The GFP Jay Heath ArcGIS launch-site layer marks Big Sioux Rec Area South as Parking Yes, Launch Yes, Camping Yes, rock launch surface, and SD GFP owned/managed.",
        "sourceUrl": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0"
      },
      {
        "label": "Public take-out",
        "value": "SD Hwy 42 / Mary Jo Wegner Arboretum access",
        "note": "The GFP layer marks SD Hwy 42 as a canoe site with parking, while Mary Jo Wegner Arboretum says to launch a kayak or canoe on the eastern edge of the park next to the Highway 42 bridge. Treat the stored coordinate as an access anchor and choose the signed water-entry point on arrival.",
        "sourceUrl": "https://www.maryjowegnerarboretum.com/activities/canoe-launch.html"
      },
      {
        "label": "Direct same-river corridor gauge",
        "value": "USGS 06482020",
        "note": "USGS operates the Big Sioux River at North Cliff Avenue at Sioux Falls, upstream on the same Big Sioux corridor covered by the local Cliff Avenue south-of-Sioux-Falls flow guidance. During implementation review, Water Services returned 254 cfs and 5.61 ft at 2026-08-07 08:30 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06482020/"
      },
      {
        "label": "Low-water floor",
        "value": "300 cfs minimum-only",
        "note": "Sioux Empire Paddlers lists Big Sioux River Cliff Ave South of Sioux Falls as ideal above 300 cfs. The app uses that direct same-river corridor guidance as a minimum-only floor and does not infer an upper cutoff.",
        "sourceUrl": "https://siouxempirepaddlers.org/river-flow-rates/"
      },
      {
        "label": "Camping status",
        "value": "Endpoint-basecamp only",
        "note": "GFP's access layer marks Big Sioux Rec Area South as Camping Yes and SD Hwy 42 as Camping No. Canoe-in campsites elsewhere in the Jay Heath corridor require separate reservations and are not assumed for this day route.",
        "sourceUrl": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0"
      },
      {
        "label": "Safety context",
        "value": "Fence, wood, water-quality, and low-head-dam context",
        "note": "GFP warns that fences cross many navigable streams, and South Dakota DANR warns low-head dams can be hard to spot and should be portaged well before the structure. No mapped Jay Heath hazard point was found in this selected segment, but the route should not be converted into a longer corridor without fresh hazard review.",
        "sourceUrl": "https://danr.sd.gov/OfficeOfWater/WaterRights/Dams/LowHeadDams.aspx"
      },
      {
        "label": "Gallery image",
        "value": "No image selected",
        "note": "Bounded review of GFP, Mary Jo Wegner, local, Commons, and same-route image leads did not find a clearly rights-clean exact-route reusable gallery asset.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Big%20Sioux%20River%20Big%20Sioux%20Recreation%20Area%20Highway%2042%20canoe%20South%20Dakota"
      }
    ],
    "sourceLinks": [
      {
        "label": "South Dakota GFP Jay Heath Trail map PDF",
        "url": "https://gfp.sd.gov/userdocs/JayHeathTrail_85x11.pdf",
        "provider": "local"
      },
      {
        "label": "South Dakota GFP paddling",
        "url": "https://gfp.sd.gov/paddling/",
        "provider": "local"
      },
      {
        "label": "Jay Heath canoe trail launch sites FeatureServer",
        "url": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0",
        "provider": "local"
      },
      {
        "label": "Mary Jo Wegner Arboretum kayak and canoe launch",
        "url": "https://www.maryjowegnerarboretum.com/activities/canoe-launch.html",
        "provider": "local"
      },
      {
        "label": "USGS 06482020 Big Sioux River at North Cliff Avenue",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06482020/",
        "provider": "usgs"
      },
      {
        "label": "Sioux Empire Paddlers river flow rates",
        "url": "https://siouxempirepaddlers.org/river-flow-rates/",
        "provider": "local"
      },
      {
        "label": "South Dakota DANR low-head dam safety",
        "url": "https://danr.sd.gov/OfficeOfWater/WaterRights/Dams/LowHeadDams.aspx",
        "provider": "local"
      }
    ]
  },
  {
    "id": "big-sioux-river-highway-42-grandview",
    "slug": "big-sioux-river-highway-42-grandview",
    "name": "Big Sioux River",
    "reach": "SD Highway 42 to Grandview",
    "aliases": [
      "Jay Heath Canoe and Kayak Trail SD Hwy 42 to Grandview",
      "Mary Jo Wegner Arboretum to Grandview"
    ],
    "state": "South Dakota",
    "region": "East Sioux Falls / Lincoln County",
    "summary": "Jay Heath Canoe and Kayak Trail day segment from the SD Highway 42 / Mary Jo Wegner Arboretum launch corridor to the SD GFP-managed Grandview canoe site. Use it as a longer prairie-river day paddle with same-river gauge checks, a source-backed canoe-in campsite note, private-bank awareness, and ordinary wood, fence, and water-quality caveats.",
    "statusText": "Use the Big Sioux River at North Cliff Avenue gauge as the same-river corridor check. Around 300 cfs is the local low-water marker for the Cliff Avenue south-of-Sioux-Falls Big Sioux corridor; below that, expect shallow bars, slow current, and scraping.",
    "latitude": 43.524737736047783,
    "longitude": -96.600618160195765,
    "gaugeSource": {
      "id": "usgs-06482020",
      "provider": "usgs",
      "siteId": "06482020",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Big Sioux River at North Cliff Avenue at Sioux Falls, SD",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06482020/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "urban_water_quality"
      ],
      "safetyNotes": [
        "Use the 300 cfs community floor as a minimum-only screen, then make the final call from local visibility, wind, recent rain, and the actual water depth at Highway 42 and Grandview.",
        "South Dakota GFP warns that fences cross many navigable streams. Scout any unexpected obstruction, wire, wood, or bridge debris rather than forcing it.",
        "The SD Highway 42 coordinate is an access anchor supported by GFP parking data and Mary Jo Wegner launch guidance. Identify the signed water-entry point on arrival and do not substitute nearby private banks or no-launch access points."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "Sioux Empire Paddlers Big Sioux River Cliff Avenue south-of-Sioux-Falls flow guidance",
        "url": "https://siouxempirepaddlers.org/river-flow-rates/",
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
      "seasonNotes": "The south-of-Sioux-Falls Big Sioux corridor is most practical with spring water or recent rain, but rain can also worsen water quality, debris, bank mud, and bridge approaches. Confirm access status before driving.",
      "difficulty": "moderate",
      "difficultyNotes": "This is a longer public water-trail day segment with easy current at ordinary levels. Treat it as moderate because of mileage, limited intermediate public egress, private-bank exposure, possible fences or wood, and water-quality sensitivity after rain.",
      "confidenceNotes": "Confidence is good for a conservative South Dakota add: South Dakota GFP's Jay Heath Canoe and Kayak Trail access layer gives the SD Hwy 42-to-Gitchie Manitou and Gitchie Manitou-to-Grandview segment mileages, identifies Grandview as Parking Yes / Launch Yes / Camping No, and identifies the Good Earth canoe-in campsite in the corridor. Mary Jo Wegner Arboretum documents kayak/canoe launch access next to the Highway 42 bridge, Sioux Empire Paddlers gives a 300 cfs Big Sioux Cliff Avenue south-of-Sioux-Falls floor, and USGS 06482020 is a product-supported same-river corridor gauge for that named flow context. The app uses minimum-only scoring and route copy carries upstream-gauge, access-anchor, private-bank, fence, wood, water-quality, camping-reservation, and no-image caveats."
    },
    "evidenceNotes": [
      {
        "label": "Route-specific guide",
        "value": "SD Hwy 42 to Grandview, about 8.7 mi",
        "note": "South Dakota GFP's Jay Heath access layer lists SD Hwy 42 with a 3.8-mile downstream segment, Gitchie Manitou State Preserve with a 4.9-mile downstream segment, and Grandview as the next launch-supported canoe site.",
        "sourceUrl": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0"
      },
      {
        "label": "Public put-in",
        "value": "SD Highway 42 / Mary Jo Wegner Arboretum access",
        "note": "GFP marks SD Hwy 42 as a canoe-site parking anchor, and Mary Jo Wegner Arboretum says to launch a kayak or canoe on the eastern edge of the park next to the Highway 42 bridge. Treat the stored coordinate as an access anchor and choose the signed water-entry point on arrival.",
        "sourceUrl": "https://www.maryjowegnerarboretum.com/activities/canoe-launch.html"
      },
      {
        "label": "Public take-out",
        "value": "Grandview canoe site",
        "note": "The GFP Jay Heath ArcGIS launch-site layer marks Grandview as Parking Yes, Launch Yes, Camping No, concrete launch surface, and SD GFP owned/managed.",
        "sourceUrl": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0"
      },
      {
        "label": "Same-river corridor gauge",
        "value": "USGS 06482020",
        "note": "USGS operates the Big Sioux River at North Cliff Avenue at Sioux Falls, upstream on the same Big Sioux corridor covered by the local Cliff Avenue south-of-Sioux-Falls flow guidance. During implementation review, Water Services returned 258 cfs and 5.62 ft at 2026-08-07 12:30 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06482020/"
      },
      {
        "label": "Low-water floor",
        "value": "300 cfs minimum-only",
        "note": "Sioux Empire Paddlers lists Big Sioux River Cliff Ave South of Sioux Falls as ideal above 300 cfs. The app uses that same-river corridor guidance as a conservative minimum-only floor and does not infer an upper cutoff.",
        "sourceUrl": "https://siouxempirepaddlers.org/river-flow-rates/"
      },
      {
        "label": "Camping status",
        "value": "On-route canoe-in campsite, reservation-limited",
        "note": "GFP's access layer marks the Good Earth State Park canoe-in campsite as Camping Yes with no parking and reservation instructions, while the public Good Earth park page says the park itself is day-use with no regular campground. Treat overnight use as campsite-reservation dependent, not informal river camping.",
        "sourceUrl": "https://gfp.sd.gov/parks/detail/good-earth-state-park/"
      },
      {
        "label": "Safety context",
        "value": "Fence, wood, water-quality, private-bank, and low-head-dam context",
        "note": "GFP warns that fences cross many navigable streams, and South Dakota DANR warns low-head dams can be hard to spot and should be portaged well before the structure. No mapped Jay Heath hazard point was found inside this selected segment, but the route should not be extended or shortened without fresh hazard review.",
        "sourceUrl": "https://danr.sd.gov/OfficeOfWater/WaterRights/Dams/LowHeadDams.aspx"
      },
      {
        "label": "Gallery image",
        "value": "No image selected",
        "note": "Bounded review of GFP, Mary Jo Wegner, Good Earth, Sioux Empire Paddlers, Wikimedia Commons, and same-route image leads did not find a clearly rights-clean exact-route reusable gallery asset.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Big%20Sioux%20River%20Highway%2042%20Grandview%20canoe%20South%20Dakota"
      }
    ],
    "sourceLinks": [
      {
        "label": "South Dakota GFP Jay Heath Trail map PDF",
        "url": "https://gfp.sd.gov/userdocs/JayHeathTrail_85x11.pdf",
        "provider": "local"
      },
      {
        "label": "South Dakota GFP paddling",
        "url": "https://gfp.sd.gov/paddling/",
        "provider": "local"
      },
      {
        "label": "Jay Heath canoe trail launch sites FeatureServer",
        "url": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0",
        "provider": "local"
      },
      {
        "label": "Mary Jo Wegner Arboretum kayak and canoe launch",
        "url": "https://www.maryjowegnerarboretum.com/activities/canoe-launch.html",
        "provider": "local"
      },
      {
        "label": "Good Earth State Park",
        "url": "https://gfp.sd.gov/parks/detail/good-earth-state-park/",
        "provider": "local"
      },
      {
        "label": "USGS 06482020 Big Sioux River at North Cliff Avenue",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06482020/",
        "provider": "usgs"
      },
      {
        "label": "Sioux Empire Paddlers river flow rates",
        "url": "https://siouxempirepaddlers.org/river-flow-rates/",
        "provider": "local"
      },
      {
        "label": "South Dakota DANR low-head dam safety",
        "url": "https://danr.sd.gov/OfficeOfWater/WaterRights/Dams/LowHeadDams.aspx",
        "provider": "local"
      }
    ]
  },
  {
    "id": "big-sioux-river-grandview-klondike-south",
    "slug": "big-sioux-river-grandview-klondike-south",
    "name": "Big Sioux River",
    "reach": "Grandview to Klondike South",
    "aliases": [
      "Jay Heath Canoe and Kayak Trail Grandview to Klondike",
      "Big Sioux River Grandview to Klondike"
    ],
    "state": "South Dakota",
    "region": "Lincoln County / Canton",
    "summary": "Jay Heath Canoe and Kayak Trail day segment from the SD GFP-managed Grandview access to Klondike South. Use it as a public-access prairie-river paddle with same-river gauge checks, private-bank awareness, rock-crossing caution, and ordinary wood and water-quality caveats.",
    "statusText": "Use the Big Sioux River at North Cliff Avenue gauge as the same-river corridor check. Around 300 cfs is the local low-water marker for the south-of-Sioux-Falls Big Sioux corridor; below that, expect shallow bars, slow current, and scraping.",
    "latitude": 43.4484919862431,
    "longitude": -96.6024966707481,
    "gaugeSource": {
      "id": "usgs-06482020",
      "provider": "usgs",
      "siteId": "06482020",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Big Sioux River at North Cliff Avenue at Sioux Falls, SD",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06482020/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "urban_water_quality"
      ],
      "safetyNotes": [
        "Use the 300 cfs community floor as a minimum-only screen, then make the final call from local visibility, wind, recent rain, and the actual water depth at Grandview and Klondike South.",
        "South Dakota GFP warns that fences cross many navigable streams. Scout any unexpected obstruction, wire, wood, or bridge debris rather than forcing it.",
        "Take out at Klondike South as planned and do not substitute Klondike North or Klondike East without checking current access, rock-crossing, and landing conditions."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 300,
      "thresholdSource": {
        "label": "Sioux Empire Paddlers Big Sioux River Cliff Avenue south-of-Sioux-Falls flow guidance",
        "url": "https://siouxempirepaddlers.org/river-flow-rates/",
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
      "seasonNotes": "The south-of-Sioux-Falls Big Sioux corridor is most practical with spring water or recent rain, but rain can also worsen water quality, debris, bank mud, and bridge approaches. Confirm access status before driving.",
      "difficulty": "easy",
      "difficultyNotes": "This is a public water-trail day segment with easy current at ordinary levels. Treat it as easy only after checking the gauge and current conditions; low water means scraping, and high or rising water can hide wood, fences, and rock crossings.",
      "confidenceNotes": "Confidence is good for a conservative South Dakota add: South Dakota GFP's Jay Heath Canoe and Kayak Trail map names Grandview to Klondike as a 7.8-mile segment, the GFP ArcGIS access layer marks Grandview and Klondike South as parking-supported launch sites owned or managed by SD GFP, and Sioux Empire Paddlers gives a 300 cfs Big Sioux Cliff Avenue south-of-Sioux-Falls floor. USGS 06482020 is a product-supported same-river corridor gauge for that named flow context. The app uses minimum-only scoring and route copy carries upstream-gauge, private-bank, fence, wood, water-quality, rock-crossing, and no-image caveats."
    },
    "evidenceNotes": [
      {
        "label": "Route-specific guide",
        "value": "Grandview to Klondike, 7.8 mi",
        "note": "South Dakota GFP's Jay Heath Canoe and Kayak Trail map names this Big Sioux segment and gives the mileage.",
        "sourceUrl": "https://gfp.sd.gov/userdocs/JayHeathTrail_85x11.pdf"
      },
      {
        "label": "Public put-in",
        "value": "Grandview canoe site",
        "note": "The GFP Jay Heath ArcGIS launch-site layer marks Grandview as Parking Yes, Launch Yes, Camping No, and SD GFP owned/managed.",
        "sourceUrl": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0"
      },
      {
        "label": "Public take-out",
        "value": "Klondike South canoe site",
        "note": "The GFP Jay Heath ArcGIS launch-site layer marks Klondike South as Parking Yes, Launch Yes, Camping No, and SD GFP owned/managed.",
        "sourceUrl": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0"
      },
      {
        "label": "Same-river corridor gauge",
        "value": "USGS 06482020",
        "note": "USGS operates the Big Sioux River at North Cliff Avenue at Sioux Falls, upstream on the same Big Sioux corridor covered by the local Cliff Avenue south-of-Sioux-Falls flow guidance. During implementation review, Water Services returned 254 cfs and 5.61 ft at 2026-08-07 10:30 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06482020/"
      },
      {
        "label": "Low-water floor",
        "value": "300 cfs minimum-only",
        "note": "Sioux Empire Paddlers lists Big Sioux River Cliff Ave South of Sioux Falls as ideal above 300 cfs. The app uses that same-river corridor guidance as a minimum-only floor and does not infer an upper cutoff.",
        "sourceUrl": "https://siouxempirepaddlers.org/river-flow-rates/"
      },
      {
        "label": "Camping status",
        "value": "No route camping",
        "note": "GFP's access layer marks both Grandview and Klondike South as Camping No. Nearby or upstream canoe-in campsites are not inferred for this day route.",
        "sourceUrl": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0"
      },
      {
        "label": "Safety context",
        "value": "Fence, wood, water-quality, and rock-crossing context",
        "note": "GFP warns that fences cross many navigable streams, and the Jay Heath map marks rock-crossing context in the broader Klondike corridor. Treat Klondike South as the planned take-out and check landing conditions on arrival.",
        "sourceUrl": "https://gfp.sd.gov/paddling/"
      },
      {
        "label": "Gallery image",
        "value": "No image selected",
        "note": "Bounded review of SD GFP, Sioux Empire Paddlers, Wikimedia Commons, and same-route image leads did not find a clearly rights-clean exact-route reusable gallery asset.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Big%20Sioux%20River%20Grandview%20Klondike%20canoe%20South%20Dakota"
      }
    ],
    "sourceLinks": [
      {
        "label": "South Dakota GFP Jay Heath Trail map PDF",
        "url": "https://gfp.sd.gov/userdocs/JayHeathTrail_85x11.pdf",
        "provider": "local"
      },
      {
        "label": "South Dakota GFP paddling",
        "url": "https://gfp.sd.gov/paddling/",
        "provider": "local"
      },
      {
        "label": "Jay Heath canoe trail launch sites FeatureServer",
        "url": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0",
        "provider": "local"
      },
      {
        "label": "USGS 06482020 Big Sioux River at North Cliff Avenue",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06482020/",
        "provider": "usgs"
      },
      {
        "label": "Sioux Empire Paddlers river flow rates",
        "url": "https://siouxempirepaddlers.org/river-flow-rates/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "big-sioux-river-oak-ridge-oak-grove",
    "slug": "big-sioux-river-oak-ridge-oak-grove",
    "name": "Big Sioux River",
    "reach": "Oak Ridge Public Water Access to Oak Grove County Park",
    "aliases": [
      "Jay Heath Canoe and Kayak Trail Oak Ridge PWA to Oak Grove County Park",
      "Big Sioux River Hudson to Hawarden"
    ],
    "state": "South Dakota",
    "region": "Hudson / Hawarden Border",
    "summary": "Lower Jay Heath Canoe and Kayak Trail day segment from Oak Ridge Public Water Access near Hudson to Oak Grove County Park near Hawarden. Use it as a public-access Big Sioux border paddle with the Akron gauge, private-bank awareness, and ordinary prairie-river wood, fence, wind, and water-quality caveats.",
    "statusText": "Use the Big Sioux River at Akron gauge as the lower-corridor check. Around 400 cfs is the local Akron low-water marker; below that, expect shallow bars, slow current, and scraping.",
    "latitude": 43.1706166664578,
    "longitude": -96.4694000002021,
    "gaugeSource": {
      "id": "usgs-06485500",
      "provider": "usgs",
      "siteId": "06485500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Big Sioux River at Akron, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06485500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "urban_water_quality"
      ],
      "safetyNotes": [
        "Use the 400 cfs Akron community floor as a minimum-only screen, then make the final call from local visibility, wind, recent rain, and the actual water depth at both ramps.",
        "South Dakota GFP warns that fences cross many navigable streams. Scout any unexpected wire, wood, bridge debris, or bank obstruction rather than forcing it.",
        "Treat Oak Ridge to Oak Grove as the committed day segment. Do not extend toward Carr's Landing, Big Sioux County Park, Akron, or Sioux City without separate distance, access, and hazard planning."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 400,
      "thresholdSource": {
        "label": "Sioux Empire Paddlers Big Sioux River Akron flow guidance",
        "url": "https://siouxempirepaddlers.org/river-flow-rates/",
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
      "seasonNotes": "The lower Big Sioux border corridor is most practical with spring water or recent rain, but rain can also worsen water quality, debris, bank mud, and bridge approaches. Confirm public access status before driving.",
      "difficulty": "easy",
      "difficultyNotes": "This is a public water-trail day segment with easy current at ordinary levels. Treat it as easy only after checking the Akron gauge and current conditions; low water means scraping, and high or rising water can hide wood, fences, and private-bank hazards.",
      "confidenceNotes": "Confidence is good for a conservative South Dakota add: South Dakota GFP's Jay Heath Canoe and Kayak Trail materials identify the lower Big Sioux trail and the access layer marks Oak Ridge Public Water Access and Oak Grove County Park as parking-supported concrete launches. Sioux Empire Paddlers lists Oak Ridge PWA to Oak Grove County Park as a Big Sioux Circuit route and publishes Big Sioux River Akron as ideal above 400 cfs. USGS 06485500 is the product-supported downstream lower-corridor gauge for that named Akron flow context. The app uses minimum-only scoring and route copy carries downstream-gauge, private-bank, fence, wood, water-quality, endpoint-camping, and no-image caveats."
    },
    "evidenceNotes": [
      {
        "label": "Route-specific guide",
        "value": "Oak Ridge PWA to Oak Grove County Park; 11.1 mi",
        "note": "Sioux Empire Paddlers lists Oak Ridge PWA to Oak Grove County Park in its Big Sioux Circuit, and the GFP Jay Heath access layer stores Oak Ridge's next segment mileage as 11.1 water miles.",
        "sourceUrl": "https://siouxempirepaddlers.org/big-sioux-circuit/"
      },
      {
        "label": "Public put-in",
        "value": "Oak Ridge Public Water Access concrete launch",
        "note": "The GFP Jay Heath access layer marks Oak Ridge Public Water Access as Parking Yes, Launch Yes, Camping No, concrete launch surface, and SD GFP-owned/managed.",
        "sourceUrl": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0"
      },
      {
        "label": "Public take-out",
        "value": "Oak Grove County Park concrete launch",
        "note": "The GFP Jay Heath access layer marks Oak Grove County Park as Parking Yes, Launch Yes, Camping Yes, concrete launch surface, and Sioux County Conservation-managed. MyCountyParks separately says paddlers may launch from the park boat ramp into the Big Sioux River.",
        "sourceUrl": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0"
      },
      {
        "label": "Lower-corridor gauge",
        "value": "USGS 06485500",
        "note": "USGS operates the Big Sioux River at Akron, IA, downstream on the same lower Big Sioux corridor named by the local Akron flow guidance. During implementation review, Water Services returned 521 cfs and 4.99 ft at 2026-08-07 15:00 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06485500/"
      },
      {
        "label": "Low-water floor",
        "value": "400 cfs minimum-only",
        "note": "Sioux Empire Paddlers lists Big Sioux River Akron Iowa as ideal above 400 cfs. The app uses that lower-corridor guidance as a minimum-only floor and does not infer an upper cutoff.",
        "sourceUrl": "https://siouxempirepaddlers.org/river-flow-rates/"
      },
      {
        "label": "Camping status",
        "value": "Endpoint campground at Oak Grove",
        "note": "The GFP access layer marks Oak Ridge Public Water Access as Camping No and Oak Grove County Park as Camping Yes. MyCountyParks documents fee camping at Oak Grove / Big Sioux Park; route copy treats camping as separate campground use, not informal river camping.",
        "sourceUrl": "https://www.mycountyparks.com/county/sioux/Park/Oak-Grove-Big-Sioux-Park"
      },
      {
        "label": "Safety context",
        "value": "Fence, wood, water-quality, private-bank, wind, and non-extension context",
        "note": "GFP warns that fences cross many navigable South Dakota streams, and Friends of the Big Sioux points paddlers toward current river access and water-quality resources. Treat the route as a defined Oak Ridge-to-Oak Grove day segment.",
        "sourceUrl": "https://gfp.sd.gov/paddling/"
      },
      {
        "label": "Coordinate audit",
        "value": "Access anchors reviewed",
        "note": "The generated coordinate audit measures Oak Ridge 189 ft from the named Big Sioux flowline / 135 ft from NHD waterbody and Oak Grove 215 ft from the named Big Sioux flowline / 131 ft from NHD waterbody. Both are GFP-published concrete-launch access anchors, so route copy tells paddlers to follow signed on-site water-entry and landing conditions.",
        "sourceUrl": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0"
      },
      {
        "label": "Gallery image",
        "value": "No image selected",
        "note": "Bounded review of SD GFP, Sioux Empire Paddlers, Sioux County/Oak Grove park pages, Wikimedia Commons, and same-route image leads did not find a clearly rights-clean exact-route reusable gallery asset.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Big%20Sioux%20River%20Oak%20Ridge%20Oak%20Grove%20canoe"
      }
    ],
    "sourceLinks": [
      {
        "label": "South Dakota GFP Jay Heath Trail map PDF",
        "url": "https://gfp.sd.gov/userdocs/JayHeathTrail_85x11.pdf",
        "provider": "local"
      },
      {
        "label": "South Dakota GFP paddling",
        "url": "https://gfp.sd.gov/paddling/",
        "provider": "local"
      },
      {
        "label": "Jay Heath canoe trail launch sites FeatureServer",
        "url": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0",
        "provider": "local"
      },
      {
        "label": "Sioux Empire Paddlers Big Sioux Circuit",
        "url": "https://siouxempirepaddlers.org/big-sioux-circuit/",
        "provider": "local"
      },
      {
        "label": "Sioux Empire Paddlers river flow rates",
        "url": "https://siouxempirepaddlers.org/river-flow-rates/",
        "provider": "local"
      },
      {
        "label": "Oak Grove / Big Sioux Park",
        "url": "https://www.mycountyparks.com/county/sioux/Park/Oak-Grove-Big-Sioux-Park",
        "provider": "local"
      },
      {
        "label": "USGS 06485500 Big Sioux River at Akron",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06485500/",
        "provider": "usgs"
      },
      {
        "label": "Friends of the Big Sioux maps and resources",
        "url": "https://www.friendsofthebigsiouxriver.org/maps-resources",
        "provider": "local"
      }
    ]
  },
  {
    "id": "big-sioux-river-oak-grove-carrs-landing",
    "slug": "big-sioux-river-oak-grove-carrs-landing",
    "name": "Big Sioux River",
    "reach": "Oak Grove County Park to Carr's Landing",
    "aliases": [
      "Jay Heath Canoe and Kayak Trail Oak Grove to Carr's Landing",
      "Big Sioux River Hawarden Oak Grove to Carr's Landing"
    ],
    "state": "South Dakota",
    "region": "Hawarden / Akron Border",
    "summary": "Lower Jay Heath Canoe and Kayak Trail day segment from Oak Grove County Park to Carr's Landing near Hawarden. Use it as a public-access Big Sioux border paddle with the Akron gauge, private-bank awareness, and ordinary prairie-river wood, fence, wind, and water-quality caveats.",
    "statusText": "Use the Big Sioux River at Akron gauge as the lower-corridor check. Around 400 cfs is the local Akron low-water marker; below that, expect shallow bars, slow current, and scraping.",
    "latitude": 43.0618556830408,
    "longitude": -96.4709710186444,
    "gaugeSource": {
      "id": "usgs-06485500",
      "provider": "usgs",
      "siteId": "06485500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Big Sioux River at Akron, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06485500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "urban_water_quality"
      ],
      "safetyNotes": [
        "Use the 400 cfs Akron community floor as a minimum-only screen, then make the final call from local visibility, wind, recent rain, and the actual water depth at both ramps.",
        "South Dakota GFP warns that fences cross many navigable streams. Scout any unexpected wire, wood, bridge debris, or bank obstruction rather than forcing it.",
        "Take out at Carr's Landing as planned. Do not stretch this card toward Big Sioux County Park, Akron, or Sioux City without separate distance, access, and hazard planning."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 400,
      "thresholdSource": {
        "label": "Sioux Empire Paddlers Big Sioux River Akron flow guidance",
        "url": "https://siouxempirepaddlers.org/river-flow-rates/",
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
      "seasonNotes": "The lower Big Sioux border corridor is most practical with spring water or recent rain, but rain can also worsen water quality, debris, bank mud, and bridge approaches. Confirm county/city access status before driving.",
      "difficulty": "easy",
      "difficultyNotes": "This is a public water-trail day segment with easy current at ordinary levels. Treat it as easy only after checking the Akron gauge and current conditions; low water means scraping, and high or rising water can hide wood, fences, and private-bank hazards.",
      "confidenceNotes": "Confidence is good for a conservative South Dakota add: South Dakota GFP's Jay Heath Canoe and Kayak Trail materials identify the lower Big Sioux trail and the access layer marks Oak Grove County Park and Carr's Landing as parking-supported concrete launches. Sioux Empire Paddlers lists Oak Grove County Park to Carr's Landing as a Big Sioux Circuit route and publishes Big Sioux River Akron as ideal above 400 cfs. USGS 06485500 is the product-supported downstream lower-corridor gauge for that named Akron flow context. The app uses minimum-only scoring and route copy carries downstream-gauge, private-bank, fence, wood, water-quality, camping, and no-image caveats."
    },
    "evidenceNotes": [
      {
        "label": "Route-specific guide",
        "value": "Oak Grove County Park to Carr's Landing; 6.2 mi",
        "note": "Sioux Empire Paddlers lists Oak Grove County Park to Carr's Landing in its Big Sioux Circuit, and the GFP Jay Heath access layer stores Oak Grove's next segment mileage as 6.2 water miles.",
        "sourceUrl": "https://siouxempirepaddlers.org/big-sioux-circuit/"
      },
      {
        "label": "Public put-in",
        "value": "Oak Grove County Park concrete launch",
        "note": "The GFP Jay Heath access layer marks Oak Grove County Park as Parking Yes, Launch Yes, Camping Yes, concrete launch surface, and Sioux County Conservation-managed. MyCountyParks separately says paddlers may launch from the park boat ramp into the Big Sioux River.",
        "sourceUrl": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0"
      },
      {
        "label": "Public take-out",
        "value": "Carr's Landing concrete launch",
        "note": "The GFP Jay Heath access layer marks Carr's Landing as Parking Yes, Launch Yes, Camping No, concrete launch surface, and City of Hawarden-managed.",
        "sourceUrl": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0"
      },
      {
        "label": "Lower-corridor gauge",
        "value": "USGS 06485500",
        "note": "USGS operates the Big Sioux River at Akron, IA, downstream on the same lower Big Sioux corridor named by the local Akron flow guidance. During implementation review, Water Services returned 521 cfs and 4.99 ft at 2026-08-07 13:00 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06485500/"
      },
      {
        "label": "Low-water floor",
        "value": "400 cfs minimum-only",
        "note": "Sioux Empire Paddlers lists Big Sioux River Akron Iowa as ideal above 400 cfs. The app uses that lower-corridor guidance as a minimum-only floor and does not infer an upper cutoff.",
        "sourceUrl": "https://siouxempirepaddlers.org/river-flow-rates/"
      },
      {
        "label": "Camping status",
        "value": "Endpoint campground at Oak Grove",
        "note": "The GFP access layer marks Oak Grove County Park as Camping Yes and Carr's Landing as Camping No. MyCountyParks documents fee campgrounds at Oak Grove / Big Sioux Park; route copy treats camping as separate campground use, not informal river camping.",
        "sourceUrl": "https://www.mycountyparks.com/county/sioux/Park/Oak-Grove-Big-Sioux-Park/Activity/Canoeing-Kayaking"
      },
      {
        "label": "Safety context",
        "value": "Fence, wood, water-quality, private-bank, wind, and non-extension context",
        "note": "GFP warns that fences cross many navigable South Dakota streams, and Friends of the Big Sioux points paddlers toward current river access and water-quality resources. Treat the route as a defined Oak Grove-to-Carr's day segment.",
        "sourceUrl": "https://gfp.sd.gov/paddling/"
      },
      {
        "label": "Coordinate audit",
        "value": "Access anchors reviewed",
        "note": "The generated coordinate audit measures Oak Grove 215 ft from the named Big Sioux flowline / 131 ft from NHD waterbody and Carr's Landing 235 ft from the named Big Sioux flowline. Both are GFP-published concrete-launch access anchors, so route copy tells paddlers to follow signed on-site water-entry and landing conditions.",
        "sourceUrl": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0"
      },
      {
        "label": "Gallery image",
        "value": "No image selected",
        "note": "Bounded review of SD GFP, Sioux Empire Paddlers, Sioux County/Plymouth County park pages, Wikimedia Commons, and same-route image leads did not find a clearly rights-clean exact-route reusable gallery asset.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Big%20Sioux%20River%20Oak%20Grove%20Carr%27s%20Landing%20canoe"
      }
    ],
    "sourceLinks": [
      {
        "label": "South Dakota GFP Jay Heath Trail map PDF",
        "url": "https://gfp.sd.gov/userdocs/JayHeathTrail_85x11.pdf",
        "provider": "local"
      },
      {
        "label": "South Dakota GFP paddling",
        "url": "https://gfp.sd.gov/paddling/",
        "provider": "local"
      },
      {
        "label": "Jay Heath canoe trail launch sites FeatureServer",
        "url": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0",
        "provider": "local"
      },
      {
        "label": "Sioux Empire Paddlers Big Sioux Circuit",
        "url": "https://siouxempirepaddlers.org/big-sioux-circuit/",
        "provider": "local"
      },
      {
        "label": "Sioux Empire Paddlers river flow rates",
        "url": "https://siouxempirepaddlers.org/river-flow-rates/",
        "provider": "local"
      },
      {
        "label": "Oak Grove / Big Sioux Park canoeing and kayaking",
        "url": "https://www.mycountyparks.com/county/sioux/Park/Oak-Grove-Big-Sioux-Park/Activity/Canoeing-Kayaking",
        "provider": "local"
      },
      {
        "label": "USGS 06485500 Big Sioux River at Akron",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06485500/",
        "provider": "usgs"
      },
      {
        "label": "Friends of the Big Sioux maps and resources",
        "url": "https://www.friendsofthebigsiouxriver.org/maps-resources",
        "provider": "local"
      }
    ]
  },
  {
    "id": "big-sioux-river-carrs-landing-big-sioux-county-park",
    "slug": "big-sioux-river-carrs-landing-big-sioux-county-park",
    "name": "Big Sioux River",
    "reach": "Carr's Landing to Big Sioux County Park",
    "aliases": [
      "Jay Heath Canoe and Kayak Trail Carr's Landing to Big Sioux County Park",
      "Big Sioux Circuit Carr's Landing to Big Sioux County Park by Akron"
    ],
    "state": "South Dakota",
    "region": "Hawarden / Akron Border",
    "summary": "Long lower Jay Heath Canoe and Kayak Trail day segment from Carr's Landing near Hawarden to Big Sioux County Park near Akron. Use it only with a solid Akron gauge reading, an early start, private-bank awareness, and careful checks for wood, fences, wind, mud, and water quality.",
    "statusText": "Use the Big Sioux River at Akron gauge as the lower-corridor check. Around 400 cfs is the local Akron low-water marker; below that, expect shallow bars, slow current, long dragging sections, and a harder 19-mile day.",
    "latitude": 43.0108833331488,
    "longitude": -96.4913666666382,
    "gaugeSource": {
      "id": "usgs-06485500",
      "provider": "usgs",
      "siteId": "06485500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Big Sioux River at Akron, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06485500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "urban_water_quality"
      ],
      "safetyNotes": [
        "Use the 400 cfs Akron community floor as a minimum-only screen, then make the final call from local visibility, wind, recent rain, and the actual water depth at both concrete ramps.",
        "South Dakota GFP warns that fences cross many navigable streams. Scout any unexpected wire, wood, bridge debris, or bank obstruction rather than forcing it.",
        "This is a long 19-mile border-river day route with limited public egress. Take out at Big Sioux County Park as planned and do not extend toward Akron, IA-3, Sioux City, or private banks without separate access and hazard planning."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 400,
      "thresholdSource": {
        "label": "Sioux Empire Paddlers Big Sioux River Akron flow guidance",
        "url": "https://siouxempirepaddlers.org/river-flow-rates/",
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
      "seasonNotes": "The lower Big Sioux border corridor is most practical with spring water or recent rain, but rain can also worsen water quality, debris, bank mud, road access, and bridge approaches. Confirm county/city access status and flood closures before driving.",
      "difficulty": "moderate",
      "difficultyNotes": "The current is generally easy at ordinary levels, but the 19-mile distance, sparse public exits, open wind exposure, muddy banks, and possible fences or wood make this a committed moderate day. Low water can turn it into a long scrape-and-drag outing.",
      "confidenceNotes": "Confidence is good for a conservative South Dakota add: South Dakota GFP's Jay Heath access layer marks Carr's Landing and Big Sioux County Park as parking-supported concrete launches, and Sioux Empire Paddlers lists Carr's Landing to Big Sioux County Park by Akron as a Big Sioux Circuit route. The GFP Jay Heath map/PDF stores the Carr's Landing downstream segment as 19 water miles, Sioux Empire Paddlers publishes Big Sioux River Akron as ideal above 400 cfs, and USGS 06485500 is the product-supported Akron gauge for that named lower-corridor flow context. The app uses minimum-only scoring and route copy carries distance, downstream-gauge, private-bank, fence, wood, water-quality, nearby-basecamp, flood-access, and no-image caveats."
    },
    "evidenceNotes": [
      {
        "label": "Route-specific guide",
        "value": "Carr's Landing to Big Sioux County Park by Akron; 19 mi",
        "note": "Sioux Empire Paddlers lists Carr's Landing to Big Sioux County Park by Akron in its Big Sioux Circuit, and the GFP Jay Heath access layer stores Carr's Landing's next segment mileage as 19 water miles.",
        "sourceUrl": "https://siouxempirepaddlers.org/big-sioux-circuit/"
      },
      {
        "label": "Public put-in",
        "value": "Carr's Landing concrete launch",
        "note": "The GFP Jay Heath access layer marks Carr's Landing as Parking Yes, Launch Yes, Camping No, concrete launch surface, and City of Hawarden-managed.",
        "sourceUrl": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0"
      },
      {
        "label": "Public take-out",
        "value": "Big Sioux County Park concrete launch",
        "note": "The GFP Jay Heath access layer marks Big Sioux County Park as Parking Yes, Launch Yes, Camping No, concrete launch surface, and Plymouth County Conservation Board-managed. MyCountyParks separately says Big Sioux Park provides paddling and boating opportunities, a concrete boat ramp, and a gravel parking lot.",
        "sourceUrl": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0"
      },
      {
        "label": "Lower-corridor gauge",
        "value": "USGS 06485500",
        "note": "USGS operates the Big Sioux River at Akron, IA, the lower-corridor gauge named by the local Akron flow guidance. During implementation review, Water Services returned 524 cfs and 5.00 ft at 2026-08-07 14:00 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06485500/"
      },
      {
        "label": "Low-water floor",
        "value": "400 cfs minimum-only",
        "note": "Sioux Empire Paddlers lists Big Sioux River Akron Iowa as ideal above 400 cfs. The app uses that lower-corridor guidance as a minimum-only floor and does not infer an upper cutoff.",
        "sourceUrl": "https://siouxempirepaddlers.org/river-flow-rates/"
      },
      {
        "label": "Camping status",
        "value": "Nearby basecamp only",
        "note": "GFP's access layer marks both Carr's Landing and Big Sioux County Park as Camping No. Nearby River's Bend Wildlife Area and Akron City Park campground records support separate basecamp options, but route copy does not infer informal river camping or endpoint camping.",
        "sourceUrl": "https://www.mycountyparks.com/county/plymouth/Park/Rivers-Bend-Wildlife-Area"
      },
      {
        "label": "Access and flood caveat",
        "value": "Big Sioux Park ramp open; road may close",
        "note": "MyCountyParks says Big Sioux Park's ramp is always open but the road can close during some hunting seasons and floods. Check current county conditions before using this as the take-out.",
        "sourceUrl": "https://www.mycountyparks.com/county/plymouth/Park/Big-Sioux-Park/Activity/Boating"
      },
      {
        "label": "Safety context",
        "value": "Fence, wood, water-quality, wind, private-bank, and distance context",
        "note": "GFP warns that fences cross many navigable South Dakota streams, and Friends of the Big Sioux points paddlers toward current river access and water-quality resources. Treat the route as a committed Carr's-to-Big-Sioux-County-Park day segment.",
        "sourceUrl": "https://gfp.sd.gov/paddling/"
      },
      {
        "label": "Gallery image",
        "value": "No image selected",
        "note": "Bounded review of SD GFP, Sioux Empire Paddlers, Plymouth County/MyCountyParks, Wikimedia Commons, and same-route image leads did not find a clearly rights-clean exact-route reusable gallery asset.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Big%20Sioux%20River%20Carr%27s%20Landing%20Big%20Sioux%20County%20Park%20canoe"
      }
    ],
    "sourceLinks": [
      {
        "label": "South Dakota GFP Jay Heath Trail map PDF",
        "url": "https://gfp.sd.gov/userdocs/JayHeathTrail_85x11.pdf",
        "provider": "local"
      },
      {
        "label": "South Dakota GFP paddling",
        "url": "https://gfp.sd.gov/paddling/",
        "provider": "local"
      },
      {
        "label": "Jay Heath canoe trail launch sites FeatureServer",
        "url": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0",
        "provider": "local"
      },
      {
        "label": "Sioux Empire Paddlers Big Sioux Circuit",
        "url": "https://siouxempirepaddlers.org/big-sioux-circuit/",
        "provider": "local"
      },
      {
        "label": "Sioux Empire Paddlers river flow rates",
        "url": "https://siouxempirepaddlers.org/river-flow-rates/",
        "provider": "local"
      },
      {
        "label": "Big Sioux Park boating",
        "url": "https://www.mycountyparks.com/county/plymouth/Park/Big-Sioux-Park/Activity/Boating",
        "provider": "local"
      },
      {
        "label": "River's Bend Wildlife Area",
        "url": "https://www.mycountyparks.com/county/plymouth/Park/Rivers-Bend-Wildlife-Area",
        "provider": "local"
      },
      {
        "label": "USGS 06485500 Big Sioux River at Akron",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06485500/",
        "provider": "usgs"
      },
      {
        "label": "Friends of the Big Sioux maps and resources",
        "url": "https://www.friendsofthebigsiouxriver.org/maps-resources",
        "provider": "local"
      }
    ]
  },
  {
    "id": "big-sioux-river-big-sioux-county-park-akron",
    "slug": "big-sioux-river-big-sioux-county-park-akron",
    "name": "Big Sioux River",
    "reach": "Big Sioux County Park to Akron",
    "aliases": [
      "Jay Heath Canoe and Kayak Trail Big Sioux County Park to Akron",
      "Big Sioux River Akron short segment"
    ],
    "state": "South Dakota",
    "region": "Akron Border",
    "summary": "Short lower Jay Heath Canoe and Kayak Trail segment from Big Sioux County Park to the City of Akron concrete launch. Use it as a compact Akron-area day paddle with a same-reach gauge check, private-bank awareness, and ordinary lower Big Sioux wood, fence, mud, and water-quality caveats.",
    "statusText": "Use the Big Sioux River at Akron gauge, which sits inside this short reach. Around 400 cfs is the local Akron low-water marker; below that, expect shallow bars, scraping, slow current, and muddy landings.",
    "latitude": 42.85107412010523,
    "longitude": -96.54369171079088,
    "gaugeSource": {
      "id": "usgs-06485500",
      "provider": "usgs",
      "siteId": "06485500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Big Sioux River at Akron, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06485500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "urban_water_quality"
      ],
      "safetyNotes": [
        "Use the 400 cfs Akron community floor as a minimum-only screen, then make the final call from local visibility, wind, recent rain, and the actual water depth at both concrete ramps.",
        "South Dakota GFP warns that fences cross many navigable streams. Scout any unexpected wire, wood, bridge debris, or bank obstruction rather than forcing it.",
        "This card intentionally stops at the City of Akron launch. Do not extend toward River's Bend, IA-3, Sioux City, private banks, or fee/private accesses without separate access and hazard planning."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 400,
      "thresholdSource": {
        "label": "Sioux Empire Paddlers Big Sioux River Akron flow guidance",
        "url": "https://siouxempirepaddlers.org/river-flow-rates/",
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
      "seasonNotes": "The lower Big Sioux border corridor is most practical with spring water or recent rain, but rain can also worsen water quality, debris, bank mud, road access, and bridge approaches. Confirm county/city access status and flood closures before driving.",
      "difficulty": "easy",
      "difficultyNotes": "This is a short lower Big Sioux segment with generally easy current at ordinary levels. Treat it as easy only after checking the Akron gauge and current conditions; low water can mean scraping and walking, while high or rising water can hide wood, fences, and muddy bank hazards.",
      "confidenceNotes": "Confidence is good for a conservative South Dakota add: South Dakota GFP's Jay Heath access layer marks Big Sioux County Park and Akron as parking-supported concrete launches, stores the Big Sioux County Park downstream segment as 3.2 miles, and identifies both sites as Jay Heath Canoe and Kayak Trail access points. Sioux Empire Paddlers publishes Big Sioux River Akron as ideal above 400 cfs, and USGS 06485500 sits inside the selected reach with current discharge and stage observations. The app uses minimum-only scoring and route copy carries downstream-gauge, private-bank, fence, wood, water-quality, nearby-basecamp, flood-access, and no-image caveats."
    },
    "evidenceNotes": [
      {
        "label": "Official water-trail segment",
        "value": "Big Sioux County Park to Akron; 3.2 mi",
        "note": "South Dakota GFP's Jay Heath Canoe and Kayak Trail access layer marks Big Sioux County Park as the upstream concrete launch and stores the downstream segment to Akron as 3.2 water miles.",
        "sourceUrl": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0"
      },
      {
        "label": "Public put-in",
        "value": "Big Sioux County Park concrete launch",
        "note": "The GFP Jay Heath access layer marks Big Sioux County Park as Parking Yes, Launch Yes, Camping No, concrete launch surface, and Plymouth County Conservation Board-managed. MyCountyParks separately says Big Sioux Park has a concrete boat ramp and gravel parking lot.",
        "sourceUrl": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0"
      },
      {
        "label": "Public take-out",
        "value": "Akron concrete launch",
        "note": "The GFP Jay Heath access layer marks Akron as Parking Yes, Launch Yes, Camping No, concrete launch surface, and City of Akron-managed.",
        "sourceUrl": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0"
      },
      {
        "label": "Direct reach gauge",
        "value": "USGS 06485500",
        "note": "USGS operates the Big Sioux River at Akron, IA, inside the selected Big Sioux County Park-to-Akron reach. During implementation review, Water Services returned 518 cfs and 4.98 ft at 2026-08-07 16:00 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06485500/"
      },
      {
        "label": "Low-water floor",
        "value": "400 cfs minimum-only",
        "note": "Sioux Empire Paddlers lists Big Sioux River Akron Iowa as ideal above 400 cfs. The app uses that lower-corridor guidance as a minimum-only floor and does not infer an upper cutoff.",
        "sourceUrl": "https://siouxempirepaddlers.org/river-flow-rates/"
      },
      {
        "label": "Camping status",
        "value": "Nearby basecamp only",
        "note": "GFP's access layer marks the selected Big Sioux County Park and Akron launch records as Camping No. Nearby River's Bend Wildlife Area and Akron City Park campground records support separate basecamp options, but route copy does not infer endpoint, informal, or private-bank camping.",
        "sourceUrl": "https://www.mycountyparks.com/county/plymouth/Park/Rivers-Bend-Wildlife-Area"
      },
      {
        "label": "Access and flood caveat",
        "value": "Big Sioux Park ramp open; road may close",
        "note": "MyCountyParks says Big Sioux Park's ramp is always open but the road can close during some hunting seasons and floods. Check current county conditions before using this as the put-in.",
        "sourceUrl": "https://www.mycountyparks.com/county/plymouth/Park/Big-Sioux-Park/Activity/Boating"
      },
      {
        "label": "Safety context",
        "value": "Fence, wood, water-quality, wind, private-bank, and non-extension context",
        "note": "GFP warns that fences cross many navigable South Dakota streams, and Friends of the Big Sioux points paddlers toward current river access and water-quality resources. Treat this as a bounded Big-Sioux-County-Park-to-Akron day segment.",
        "sourceUrl": "https://gfp.sd.gov/paddling/"
      },
      {
        "label": "Gallery image",
        "value": "No image selected",
        "note": "Bounded review of SD GFP, Sioux Empire Paddlers, Plymouth County/MyCountyParks, Wikimedia Commons, and same-route image leads did not find a clearly rights-clean exact-route reusable gallery asset.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Big%20Sioux%20River%20Big%20Sioux%20County%20Park%20Akron%20canoe"
      }
    ],
    "sourceLinks": [
      {
        "label": "South Dakota GFP Jay Heath Trail map PDF",
        "url": "https://gfp.sd.gov/userdocs/JayHeathTrail_85x11.pdf",
        "provider": "local"
      },
      {
        "label": "South Dakota GFP paddling",
        "url": "https://gfp.sd.gov/paddling/",
        "provider": "local"
      },
      {
        "label": "Jay Heath canoe trail launch sites FeatureServer",
        "url": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0",
        "provider": "local"
      },
      {
        "label": "Sioux Empire Paddlers Big Sioux Circuit",
        "url": "https://siouxempirepaddlers.org/big-sioux-circuit/",
        "provider": "local"
      },
      {
        "label": "Sioux Empire Paddlers river flow rates",
        "url": "https://siouxempirepaddlers.org/river-flow-rates/",
        "provider": "local"
      },
      {
        "label": "Big Sioux Park boating",
        "url": "https://www.mycountyparks.com/county/plymouth/Park/Big-Sioux-Park/Activity/Boating",
        "provider": "local"
      },
      {
        "label": "River's Bend Wildlife Area",
        "url": "https://www.mycountyparks.com/county/plymouth/Park/Rivers-Bend-Wildlife-Area",
        "provider": "local"
      },
      {
        "label": "USGS 06485500 Big Sioux River at Akron",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06485500/",
        "provider": "usgs"
      },
      {
        "label": "Friends of the Big Sioux maps and resources",
        "url": "https://www.friendsofthebigsiouxriver.org/maps-resources",
        "provider": "local"
      }
    ]
  },
  {
    "id": "big-sioux-river-akron-ron-wilmot",
    "slug": "big-sioux-river-akron-ron-wilmot",
    "name": "Big Sioux River",
    "reach": "Akron to Ron Wilmot River Access",
    "aliases": [
      "Jay Heath Canoe and Kayak Trail Akron to Ron Wilmot",
      "Big Sioux River Akron to Ron Wilmot"
    ],
    "state": "South Dakota",
    "region": "Akron Border",
    "summary": "Lower Jay Heath Canoe and Kayak Trail segment from the City of Akron concrete launch to Ron Wilmot River Access. Use it as a border-river day paddle with the Akron gauge, private-bank awareness, and ordinary lower Big Sioux wood, fence, mud, wind, and water-quality caveats.",
    "statusText": "Use the Big Sioux River at Akron gauge near the put-in. Around 400 cfs is the local Akron low-water marker; below that, expect shallow bars, scraping, slow current, and muddy landings.",
    "latitude": 42.829938010040166,
    "longitude": -96.56098008136513,
    "gaugeSource": {
      "id": "usgs-06485500",
      "provider": "usgs",
      "siteId": "06485500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Big Sioux River at Akron, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06485500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "urban_water_quality"
      ],
      "safetyNotes": [
        "Use the 400 cfs Akron community floor as a minimum-only screen, then make the final call from local visibility, wind, recent rain, and the actual water depth at both concrete ramps.",
        "South Dakota GFP warns that fences cross many navigable streams. Scout any unexpected wire, wood, bridge debris, or bank obstruction rather than forcing it.",
        "This card intentionally stops at Ron Wilmot River Access. Do not substitute River's Bend, SD Highway 48, IA-3/SD 50, Sioux City, private banks, or fee/private accesses without separate access and hazard planning."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 400,
      "thresholdSource": {
        "label": "Sioux Empire Paddlers Big Sioux River Akron flow guidance",
        "url": "https://siouxempirepaddlers.org/river-flow-rates/",
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
      "seasonNotes": "The lower Big Sioux border corridor is most practical with spring water or recent rain, but rain can also worsen water quality, debris, bank mud, road access, and bridge approaches. Confirm county/city access status and flood closures before driving.",
      "difficulty": "easy",
      "difficultyNotes": "This is a lower Big Sioux segment with generally easy current at ordinary levels. Treat it as easy only after checking the Akron gauge and current conditions; low water can mean scraping and walking, while high or rising water can hide wood, fences, and muddy bank hazards.",
      "confidenceNotes": "Confidence is good for a conservative South Dakota add: South Dakota GFP's Jay Heath access layer marks Akron and Ron Wilmot as parking-supported concrete launches, stores the Akron downstream segment as 7.5 miles, and identifies both sites as Jay Heath Canoe and Kayak Trail access points. MyCountyParks independently confirms Ron Wilmot River Access has a boat ramp and parking for Big Sioux River access. Sioux Empire Paddlers publishes Big Sioux River Akron as ideal above 400 cfs, and USGS 06485500 returned current discharge and stage observations near the selected put-in. The app uses minimum-only scoring and route copy carries private-bank, fence, wood, water-quality, nearby-basecamp, no-extension, and no-image caveats."
    },
    "evidenceNotes": [
      {
        "label": "Official water-trail segment",
        "value": "Akron to Ron Wilmot; 7.5 mi",
        "note": "South Dakota GFP's Jay Heath Canoe and Kayak Trail access layer marks Akron as the upstream concrete launch and stores the downstream segment as 7.5 water miles toward the next launch-supported Ron Wilmot access.",
        "sourceUrl": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0"
      },
      {
        "label": "Public put-in",
        "value": "Akron concrete launch",
        "note": "The GFP Jay Heath access layer marks Akron as Parking Yes, Launch Yes, Camping No, concrete launch surface, and City of Akron-managed.",
        "sourceUrl": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0"
      },
      {
        "label": "Public take-out",
        "value": "Ron Wilmot River Access concrete launch",
        "note": "The GFP Jay Heath access layer marks Ron Wilmot as Parking Yes, Launch Yes, Camping No, concrete launch surface, and Plymouth County Conservation Board-managed. MyCountyParks independently says Ron Wilmot River Access has a boat ramp and parking for Big Sioux River access.",
        "sourceUrl": "https://www.mycountyparks.com/county/plymouth/Park/Ron-Wilmot-River-Access"
      },
      {
        "label": "Direct put-in gauge",
        "value": "USGS 06485500",
        "note": "USGS operates the Big Sioux River at Akron, IA, near the selected put-in. During implementation review, Water Services returned 521 cfs and 4.99 ft at 2026-08-07 17:00 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06485500/"
      },
      {
        "label": "Low-water floor",
        "value": "400 cfs minimum-only",
        "note": "Sioux Empire Paddlers lists Big Sioux River Akron Iowa as ideal above 400 cfs. The app uses that lower-corridor guidance as a minimum-only floor and does not infer an upper cutoff.",
        "sourceUrl": "https://siouxempirepaddlers.org/river-flow-rates/"
      },
      {
        "label": "Camping status",
        "value": "Nearby basecamp only",
        "note": "GFP's access layer marks the selected Akron and Ron Wilmot launch records as Camping No. Nearby River's Bend Wildlife Area and Akron City Park campground records support separate basecamp options, but route copy does not infer endpoint, informal, or private-bank camping.",
        "sourceUrl": "https://www.mycountyparks.com/county/plymouth/Park/Rivers-Bend-Wildlife-Area"
      },
      {
        "label": "Access distinction",
        "value": "River's Bend is not the route take-out",
        "note": "GFP maps River's Bend Wildlife Area as a campground record rather than a launch-supported Big Sioux river access. Ron Wilmot is the selected downstream take-out, and River's Bend is treated only as separate nearby camping support.",
        "sourceUrl": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0"
      },
      {
        "label": "Safety context",
        "value": "Fence, wood, water-quality, wind, private-bank, and non-extension context",
        "note": "GFP warns that fences cross many navigable South Dakota streams, and Friends of the Big Sioux points paddlers toward current river access and water-quality resources. Treat this as a bounded Akron-to-Ron-Wilmot day segment.",
        "sourceUrl": "https://gfp.sd.gov/paddling/"
      },
      {
        "label": "Gallery image",
        "value": "No image selected",
        "note": "Bounded review of SD GFP, Sioux Empire Paddlers, Plymouth County/MyCountyParks, Wikimedia Commons, and same-route image leads did not find a clearly rights-clean exact-route reusable gallery asset.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Big%20Sioux%20River%20Akron%20Ron%20Wilmot%20canoe"
      }
    ],
    "sourceLinks": [
      {
        "label": "South Dakota GFP Jay Heath Trail map PDF",
        "url": "https://gfp.sd.gov/userdocs/JayHeathTrail_85x11.pdf",
        "provider": "local"
      },
      {
        "label": "South Dakota GFP paddling",
        "url": "https://gfp.sd.gov/paddling/",
        "provider": "local"
      },
      {
        "label": "Jay Heath canoe trail launch sites FeatureServer",
        "url": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0",
        "provider": "local"
      },
      {
        "label": "Sioux Empire Paddlers river flow rates",
        "url": "https://siouxempirepaddlers.org/river-flow-rates/",
        "provider": "local"
      },
      {
        "label": "Ron Wilmot River Access",
        "url": "https://www.mycountyparks.com/county/plymouth/Park/Ron-Wilmot-River-Access",
        "provider": "local"
      },
      {
        "label": "River's Bend Wildlife Area",
        "url": "https://www.mycountyparks.com/county/plymouth/Park/Rivers-Bend-Wildlife-Area",
        "provider": "local"
      },
      {
        "label": "USGS 06485500 Big Sioux River at Akron",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06485500/",
        "provider": "usgs"
      },
      {
        "label": "Friends of the Big Sioux maps and resources",
        "url": "https://www.friendsofthebigsiouxriver.org/maps-resources",
        "provider": "local"
      }
    ]
  },
  {
    "id": "big-sioux-river-ron-wilmot-ia-3-sd-50",
    "slug": "big-sioux-river-ron-wilmot-ia-3-sd-50",
    "name": "Big Sioux River",
    "reach": "Ron Wilmot River Access to IA-3 / SD Hwy 50",
    "aliases": [
      "Jay Heath Canoe and Kayak Trail Ron Wilmot to IA-3 SD Hwy 50",
      "Big Sioux River Ron Wilmot to Westfield"
    ],
    "state": "South Dakota",
    "region": "Akron / Westfield Border",
    "summary": "Lower Jay Heath Canoe and Kayak Trail segment from Ron Wilmot River Access to the IA-3 / SD Hwy 50 concrete launch near Westfield. Use it as a short border-river day paddle with the upstream Akron gauge, private-bank awareness, and ordinary lower Big Sioux wood, fence, mud, wind, and water-quality caveats.",
    "statusText": "Use the Big Sioux River at Akron gauge just upstream of this segment. Around 400 cfs is the local Akron low-water marker; below that, expect shallow bars, scraping, slow current, and muddy landings.",
    "latitude": 42.793412144267485,
    "longitude": -96.59396920107712,
    "gaugeSource": {
      "id": "usgs-06485500",
      "provider": "usgs",
      "siteId": "06485500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Big Sioux River at Akron, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06485500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "urban_water_quality"
      ],
      "safetyNotes": [
        "Use the 400 cfs Akron community floor as a minimum-only screen, then make the final call from local visibility, wind, recent rain, and the actual water depth at both concrete launches.",
        "South Dakota GFP warns that fences cross many navigable streams. Scout any unexpected wire, wood, bridge debris, or bank obstruction rather than forcing it.",
        "This card intentionally stops at IA-3 / SD Hwy 50. Do not continue toward IA-12, Sioux City, the private Missouri River Boat Club, the Missouri confluence, private banks, or fee/private accesses without separate access and hazard planning."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 400,
      "thresholdSource": {
        "label": "Sioux Empire Paddlers Big Sioux River Akron flow guidance",
        "url": "https://siouxempirepaddlers.org/river-flow-rates/",
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
      "seasonNotes": "The lower Big Sioux border corridor is most practical with spring water or recent rain, but rain can also worsen water quality, debris, bank mud, road access, and bridge approaches. Confirm county access status and flood closures before driving.",
      "difficulty": "easy",
      "difficultyNotes": "This is a lower Big Sioux segment with generally easy current at ordinary levels. Treat it as easy only after checking the Akron gauge and current conditions; low water can mean scraping and walking, while high or rising water can hide wood, fences, and muddy bank hazards.",
      "confidenceNotes": "Confidence is good for a conservative South Dakota add: South Dakota GFP's Jay Heath access layer marks Ron Wilmot and IA-3 / SD Hwy 50 as parking-supported concrete launches, stores the Ron Wilmot downstream segment as 5.4 miles, and identifies both sites as Jay Heath Canoe and Kayak Trail access points. MyCountyParks independently confirms Ron Wilmot River Access has a boat ramp and parking for Big Sioux River access. Sioux Empire Paddlers publishes Big Sioux River Akron as ideal above 400 cfs, and USGS 06485500 returned current discharge and stage observations just upstream of the selected segment. The app uses minimum-only scoring and route copy carries private-bank, fence, wood, water-quality, nearby-basecamp, no-extension, and no-image caveats."
    },
    "evidenceNotes": [
      {
        "label": "Official water-trail segment",
        "value": "Ron Wilmot to IA-3 / SD Hwy 50; 5.4 mi",
        "note": "South Dakota GFP's Jay Heath Canoe and Kayak Trail access layer marks Ron Wilmot as the upstream concrete launch and stores the downstream segment as 5.4 water miles toward the next launch-supported IA-3 / SD Hwy 50 access.",
        "sourceUrl": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0"
      },
      {
        "label": "Public put-in",
        "value": "Ron Wilmot River Access concrete launch",
        "note": "The GFP Jay Heath access layer marks Ron Wilmot as Parking Yes, Launch Yes, Camping No, concrete launch surface, and Plymouth County Conservation Board-managed. MyCountyParks independently says Ron Wilmot River Access has a boat ramp and parking for Big Sioux River access.",
        "sourceUrl": "https://www.mycountyparks.com/county/plymouth/Park/Ron-Wilmot-River-Access"
      },
      {
        "label": "Public take-out",
        "value": "IA-3 / SD Hwy 50 concrete launch",
        "note": "The GFP Jay Heath access layer marks IA-3 / SD Hwy 50 as Parking Yes, Launch Yes, Camping No, concrete launch surface, and Plymouth County Conservation Board-managed.",
        "sourceUrl": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0"
      },
      {
        "label": "Upstream corridor gauge",
        "value": "USGS 06485500",
        "note": "USGS operates the Big Sioux River at Akron, IA, just upstream of the selected segment. During implementation review, Water Services returned 521 cfs and 4.99 ft at 2026-08-07 18:00 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06485500/"
      },
      {
        "label": "Low-water floor",
        "value": "400 cfs minimum-only",
        "note": "Sioux Empire Paddlers lists Big Sioux River Akron Iowa as ideal above 400 cfs. The app uses that lower-corridor guidance as a minimum-only floor and does not infer an upper cutoff.",
        "sourceUrl": "https://siouxempirepaddlers.org/river-flow-rates/"
      },
      {
        "label": "Camping status",
        "value": "Nearby basecamp only",
        "note": "GFP's access layer marks the selected Ron Wilmot and IA-3 / SD Hwy 50 launch records as Camping No. Nearby River's Bend Wildlife Area and Lazy H Campground support separate basecamp options, but route copy does not infer endpoint, informal, or private-bank camping.",
        "sourceUrl": "https://www.mycountyparks.com/county/plymouth/Park/Rivers-Bend-Wildlife-Area"
      },
      {
        "label": "Access distinction",
        "value": "River's Bend and Lazy H are not route launches",
        "note": "GFP maps River's Bend Wildlife Area and Lazy H Campground as campground records rather than launch-supported Big Sioux river accesses. They are treated only as separate nearby camping support.",
        "sourceUrl": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0"
      },
      {
        "label": "Safety context",
        "value": "Fence, wood, water-quality, wind, private-bank, and non-extension context",
        "note": "GFP warns that fences cross many navigable South Dakota streams, and Friends of the Big Sioux points paddlers toward current river access and water-quality resources. Treat this as a bounded Ron-Wilmot-to-IA-3 / SD-Hwy-50 day segment.",
        "sourceUrl": "https://gfp.sd.gov/paddling/"
      },
      {
        "label": "Gallery image",
        "value": "No image selected",
        "note": "Bounded review of SD GFP, Sioux Empire Paddlers, Plymouth County/MyCountyParks, Wikimedia Commons, and same-route image leads did not find a clearly rights-clean exact-route reusable gallery asset.",
        "sourceUrl": "https://commons.wikimedia.org/wiki/Special:Search?search=Big%20Sioux%20River%20Ron%20Wilmot%20IA-3%20SD%2050%20canoe"
      }
    ],
    "sourceLinks": [
      {
        "label": "South Dakota GFP Jay Heath Trail map PDF",
        "url": "https://gfp.sd.gov/userdocs/JayHeathTrail_85x11.pdf",
        "provider": "local"
      },
      {
        "label": "South Dakota GFP paddling",
        "url": "https://gfp.sd.gov/paddling/",
        "provider": "local"
      },
      {
        "label": "Jay Heath canoe trail launch sites FeatureServer",
        "url": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0",
        "provider": "local"
      },
      {
        "label": "Sioux Empire Paddlers river flow rates",
        "url": "https://siouxempirepaddlers.org/river-flow-rates/",
        "provider": "local"
      },
      {
        "label": "Ron Wilmot River Access",
        "url": "https://www.mycountyparks.com/county/plymouth/Park/Ron-Wilmot-River-Access",
        "provider": "local"
      },
      {
        "label": "River's Bend Wildlife Area",
        "url": "https://www.mycountyparks.com/county/plymouth/Park/Rivers-Bend-Wildlife-Area",
        "provider": "local"
      },
      {
        "label": "USGS 06485500 Big Sioux River at Akron",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06485500/",
        "provider": "usgs"
      },
      {
        "label": "Friends of the Big Sioux maps and resources",
        "url": "https://www.friendsofthebigsiouxriver.org/maps-resources",
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
    "latitude": 43.72150302399171,
    "longitude": -96.50201018523772,
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
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "dam",
        "strainers",
        "whitewater"
      ],
      "safetyNotes": [
        "Launch only from the downstream Garretson Dam-below access; do not launch above or near the dam hydraulic without separate local scouting.",
        "Use the 4.5 ft Corson-gauge floor as a minimum-only screen, then scout ledges, fences, wood, and Palisades landing options before committing.",
        "Wear whitewater-appropriate gear for higher flows. Sioux Empire Paddlers describes larger Class III behavior around high water, and the creek is rain-sensitive."
      ],
      "reviewStatus": "reviewed"
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
      "confidenceNotes": "Confidence is good for a conservative South Dakota reactivation: local route guidance names the exact Split Rock Park to Palisades State Park run, ties it to the direct USGS Corson gauge, and gives a numeric 4.5 ft low-water floor. South Dakota GFP's CanoeTrails FeatureServer now provides directionally consistent, launch-supported Garretson Dam-below and Palisades-Cliffs access anchors, and USGS Water Services returned current 06482610 discharge and stage on 2026-08-07. The app uses minimum-only scoring because the numeric guidance is local-community support rather than an official manager-published paddling band."
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
        "note": "USGS operates Split Rock Creek at Corson, SD, the gauge named by the local route guide for the Split Rock Creek run. Water Services returned current values of 8.24 cfs / 1.72 ft at 2026-08-07 10:45 CDT during reactivation review.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06482610/"
      },
      {
        "label": "Public put-in",
        "value": "Garretson Dam-below / Split Rock Park downstream canoe site",
        "note": "South Dakota GFP's CanoeTrails FeatureServer marks Garretson Dam-below as a Split Rock Kayak Trail canoe site with Parking Yes, Launch Yes, and a rock launch surface. Visit Garretson separately describes the canoe/kayak launch downstream from the dam.",
        "sourceUrl": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0"
      },
      {
        "label": "Public take-out",
        "value": "Palisades-Cliffs canoe site",
        "note": "South Dakota GFP's CanoeTrails FeatureServer marks Palisades-Cliffs as a Split Rock Kayak Trail canoe site with Parking Yes, Launch Yes, and a rock launch surface inside Palisades State Park.",
        "sourceUrl": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0"
      },
      {
        "label": "Camping status",
        "value": "Endpoint campground/basecamp",
        "note": "GFP's access layer lists Split Rock Park Campground and Palisades Campground as campground records. Treat camping as separate reserved campground use, not informal creekside camping.",
        "sourceUrl": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0"
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
        "label": "South Dakota GFP CanoeTrails FeatureServer",
        "url": "https://services.arcgis.com/jWPBXspaQsJStWX8/arcgis/rest/services/CanoeTrails/FeatureServer/0",
        "provider": "local"
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
  },
  {
    "id": "spearfish-creek-city-park-jorgensen",
    "slug": "spearfish-creek-city-park-jorgensen",
    "name": "Spearfish Creek",
    "reach": "Spearfish City Park to Jorgensen Park",
    "state": "South Dakota",
    "region": "Black Hills",
    "routeType": "whitewater",
    "summary": "A short, technical Spearfish Creek town run from the city park access through the creek corridor to Jorgensen Park. Treat the route as a conditional Class II reach with a park waterfall, low-head structures, cold water, and changing access conditions.",
    "statusText": "Use USGS 06431500 at Spearfish. A conservative 50 cfs minimum-only screen is supported by current paddling guidance; below that, expect shallow water and scraping. Scout the park waterfall, ledges, fences, and take-out before committing.",
    "latitude": 44.494,
    "longitude": -103.864,
    "gaugeSource": {
      "id": "usgs-06431500",
      "provider": "usgs",
      "siteId": "06431500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Spearfish Creek at Spearfish, SD",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06431500/",
      "hydrographUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=06431500"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": ["strainers", "urban_water_quality"],
      "safetyNotes": [
        "The City Park waterfall and other ledges require scouting and may require a portage; do not run an unfamiliar drop.",
        "American Whitewater describes this as a Class II town section and reports the Spearfish City Campground to Old US 14 reach as 3.3 miles; local conditions can change the runnable corridor.",
        "Use the 50 cfs minimum-only screen conservatively. Rising water can increase hydraulics and debris; falling water can expose rocks and force walking.",
        "South Dakota GFP warns that fences cross navigable streams. Stop and portage or turn around at any unscouted wire, dam, or private-bank obstruction."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 50,
      "thresholdSource": {
        "label": "RiverScout Spearfish Creek conditions",
        "url": "https://riverscout.app/rivers/south-dakota/spearfish-creek",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [4, 5, 6, 7, 8, 9, 10],
      "seasonNotes": "Spring and rain-driven rises can change this small creek quickly. Shoulder-season water is cold; confirm access, weather, and local conditions before launch.",
      "difficulty": "moderate",
      "difficultyNotes": "American Whitewater rates the town section Class II, but the park waterfall, low-head structures, narrow banks, and limited bailout options make this unsuitable for casual beginners without a competent scouting plan.",
      "confidenceNotes": "This route clears the evidence bar as a conditional addition: American Whitewater names the town reach, endpoints, distance, difficulty, and direct USGS gauge; the City of Spearfish confirms creek access at City Park and Jorgensen Park; Visit Spearfish documents local paddlers putting in through the city park corridor and exiting near Jorgensen Park. The 50 cfs floor is minimum-only community guidance, not an official operating band, so the route keeps conservative language and prominent hazards."
    },
    "putIn": {
      "name": "Spearfish City Park creek access",
      "latitude": 44.4829812,
      "longitude": -103.86117
    },
    "takeOut": {
      "name": "Jorgensen Park creek access",
      "latitude": 44.5048079,
      "longitude": -103.8663964
    },
    "evidenceNotes": [
      {
        "label": "Named route reach",
        "value": "Spearfish City Campground / City Park to Old US Hwy 14 / Jorgensen Park corridor",
        "note": "American Whitewater identifies the Spearfish town section as a 3.3-mile Class II reach; Visit Spearfish describes kayakers putting in by the city park and exiting near Jorgensen Park.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/3959/main"
      },
      {
        "label": "Public put-in",
        "value": "Spearfish City Park creek access",
        "note": "The City of Spearfish lists creek access at City Park, 420 N Canyon Street.",
        "sourceUrl": "https://www.spearfish.gov/798/Spearfish-City-Park"
      },
      {
        "label": "Public take-out",
        "value": "Jorgensen Park creek access",
        "note": "The City of Spearfish lists creek access and a recreation path at Jorgensen Park on North Canyon Street.",
        "sourceUrl": "https://www.spearfish.gov/802/Jorgensen-Park"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 06431500",
        "note": "USGS publishes direct discharge and gage-height observations for Spearfish Creek at Spearfish.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=06431500"
      },
      {
        "label": "Minimum-only flow screen",
        "value": "50 cfs conservative floor",
        "note": "RiverScout reports an optimal 50–300 cfs window. The app uses only the 50 cfs lower bound and does not infer an upper runnable limit.",
        "sourceUrl": "https://riverscout.app/rivers/south-dakota/spearfish-creek"
      },
      {
        "label": "Hazard and route context",
        "value": "Class II town reach with waterfall and ledges",
        "note": "American Whitewater describes the town section, waterfall concerns, and low-head structures; scout all features and portage when needed.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/3959/main"
      },
      {
        "label": "Rights-clean image decision",
        "value": "Use public-domain USGS gage imagery only; no third-party route photo selected",
        "note": "The route package does not copy a commercial or user photo. A public-domain USGS streamgage image is available if a route image is later needed.",
        "sourceUrl": "https://www.usgs.gov/media/images/spearfish-creek-spearfish-sd-usgs-streamgage-06431500"
      }
    ],
    "sourceLinks": [
      {"label": "American Whitewater Spearfish Creek town section", "url": "https://www.americanwhitewater.org/content/River/view/river-detail/3959/main", "provider": "local"},
      {"label": "USGS 06431500 Spearfish Creek at Spearfish", "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06431500/", "provider": "usgs"},
      {"label": "USGS current conditions", "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=06431500", "provider": "usgs"},
      {"label": "City of Spearfish City Park", "url": "https://www.spearfish.gov/798/Spearfish-City-Park", "provider": "local"},
      {"label": "City of Spearfish Jorgensen Park", "url": "https://www.spearfish.gov/802/Jorgensen-Park", "provider": "local"},
      {"label": "Visit Spearfish creek guide", "url": "https://visitspearfish.com/things-to-do/spearfish-creek", "provider": "local"},
      {"label": "South Dakota GFP paddling safety", "url": "https://gfp.sd.gov/paddling/", "provider": "local"}
    ]
  }
];
