// State-scoped route data. Keep entries in route-family and downstream order.
import type { River } from '../../lib/types';

export const iowaRoutes: River[] = [
  {
    "id": "north-raccoon-river-rainbow-bend-richey",
    "slug": "north-raccoon-river-rainbow-bend-richey",
    "name": "North Raccoon River",
    "reach": "Rainbow Bend Access to Richey Access",
    "state": "Iowa",
    "region": "Central Iowa",
    "summary": "Long upper North Raccoon water-trail day from Rainbow Bend to Richey, with public access, oxbow bottomlands, riffles, camping at both ends, and DNR gauge guidance.",
    "statusText": "Use the Lanesboro stage plus Jefferson flow guidance from Iowa DNR. The DNR says this stretch is more pleasant at 11 ft or below at Lanesboro and around 1,000 cfs at Jefferson; high water makes wood avoidance difficult.",
    "latitude": 42.1599,
    "longitude": -94.6928,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "Iowa DNR says this 18-mile stretch has riffles, challenging rock dams, difficult access conditions, and no access signs visible from the river.",
        "At higher water, swift current makes avoiding numerous downed trees more difficult. Scout wood from upstream and portage if a line is not clear.",
        "The North Raccoon is non-meandered. Use public accesses and public areas only; banks and the riverbed outside those areas may be private."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05482430",
      "provider": "usgs",
      "siteId": "05482430",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "North Raccoon River near Lanesboro, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05482430/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 0,
      "idealMax": 11,
      "tooLow": 0,
      "tooHigh": 11,
      "thresholdSource": {
        "label": "Iowa DNR North Raccoon SCC guide Lanesboro/Jefferson guidance",
        "url": "https://www.iowadnr.gov/media/8896/download?inline=",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "DNR guidance is level-based rather than calendar-based. Summer lows can expose riffles and access drops; storms can quickly turn the wooded bends pushy.",
      "difficulty": "moderate",
      "difficultyNotes": "The Iowa DNR guide classifies this as an intermediate stretch because of its 18-mile length, riffles, rock-dam context, wood, and difficult or unsigned accesses.",
      "confidenceNotes": "Confidence is good for a guarded official add: Iowa DNR documents Rainbow Bend-to-Richey as an 18.1-mile water-trail stretch, names the intermediate Hobbs, North Raccoon, and Merritt accesses, describes public access conditions and endpoint camping/toilets, and ties the exact stretch to the Lanesboro stage and Jefferson flow guidance. USGS Water Services returned current data for both gauge sites during this run. Because the app does not support maximum-only scoring, the Lanesboro stage model uses a 0-to-11 ft official ceiling and the copy separately documents the DNR Jefferson flow target around 1,000 cfs."
    },
    "evidenceNotes": [
      {
        "label": "Official route and mileage",
        "value": "Rainbow Bend to Richey, 18.1 mi",
        "note": "Iowa DNR names Rainbow Bend Access to Richey Access, including Hobbs, North Raccoon, and Merritt accesses, as an 18.1-mile North Raccoon water-trail section.",
        "sourceUrl": "https://www.iowadnr.gov/media/8896/download?inline="
      },
      {
        "label": "Official gauge guidance",
        "value": "Lanesboro 11 ft or below; Jefferson around 1,000 cfs",
        "note": "The same DNR section says most paddlers will find the stretch more pleasurable at or below 11 ft on the Lanesboro gauge and around 1,000 cfs at Jefferson.",
        "sourceUrl": "https://www.iowadnr.gov/media/8896/download?inline="
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05482430 7.69 ft; USGS 05482500 238 cfs / 5.16 ft",
        "note": "USGS Water Services returned current North Raccoon values at 2026-07-23 04:15 CDT for Lanesboro and Jefferson during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05482430,05482500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Access and camping",
        "value": "Rainbow Bend and Richey have camping/toilets",
        "note": "DNR says Rainbow Bend is a carry to a sand/silt beach, North Raccoon River Access is excellent, Richey is hard to see from the river, and camping/toilets are available at both endpoint accesses.",
        "sourceUrl": "https://www.iowadnr.gov/media/8896/download?inline="
      }
    ],
    "sourceLinks": [
      {
        "label": "Iowa DNR North Raccoon SCC water-trail guide",
        "url": "https://www.iowadnr.gov/media/8896/download?inline=",
        "provider": "local"
      },
      {
        "label": "Iowa DNR water-trail brochures",
        "url": "https://www.iowadnr.gov/places-go/water-trails/brochures",
        "provider": "local"
      },
      {
        "label": "USGS 05482430 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05482430/",
        "provider": "usgs"
      },
      {
        "label": "USGS 05482500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05482500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "iowa-river-tailwater-east-sturgis-ferry",
    "slug": "iowa-river-tailwater-east-sturgis-ferry",
    "name": "Iowa River",
    "reach": "Tailwater East below Coralville Dam to Sturgis Ferry Park",
    "state": "Iowa",
    "region": "Eastern Iowa",
    "summary": "Short Iowa City-area connector from the Corps Tailwater East ramp below Coralville Dam to Sturgis Ferry Park, using the direct Iowa City gauge and explicit dam-tailwater caveats.",
    "statusText": "Use the Iowa River at Iowa City gauge. CanWePaddle estimates 300 to 6,000 cfs for the Coralville Dam-to-Iowa City reach; avoid high releases, rising water, and any launch above or near dam-restricted water.",
    "latitude": 41.6827,
    "longitude": -91.5322,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "low_head_dam",
        "fast_rise",
        "strainers",
        "cold_water",
        "urban_water_quality"
      ],
      "safetyNotes": [
        "Launch only from the public Tailwater East ramp below Coralville Dam. Do not paddle toward the dam or any restricted tailwater area.",
        "Coralville Dam releases can change the current, temperature, and debris load quickly. Check current USGS data, USACE status, and weather before committing.",
        "Take out at Sturgis Ferry before continuing into the Johnson County water-trail route unless the group has planned the longer downstream day."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05454500",
      "provider": "usgs",
      "siteId": "05454500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Iowa River at Iowa City, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05454500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 300,
      "idealMax": 6000,
      "tooLow": 300,
      "tooHigh": 6000,
      "thresholdSource": {
        "label": "CanWePaddle Iowa River Coralville Dam to Iowa City estimated range",
        "url": "https://canwepaddle.com/rivers/iowa/iowa-river-coralville-dam-to-iowa-city/",
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
      "seasonNotes": "CanWePaddle lists April through October as the normal season for the dam-to-Iowa-City reach. Reservoir releases can matter more than local rain timing.",
      "difficulty": "easy",
      "difficultyNotes": "The mileage is short and mostly flatwater, but the dam-tailwater launch, release changes, urban bridges, and cold or debris-laden water justify a caution profile.",
      "confidenceNotes": "Confidence is moderate-good: CanWePaddle publishes a route-specific 300-6,000 cfs range tied to the direct Iowa City gauge for Coralville Dam to Iowa City; USACE confirms Tailwater East has a boat ramp for the Iowa River below the dam and current recreation status lists the ramp open, with no courtesy dock; Recreation.gov confirms Tailwater East camping and ramp amenities; and the existing Sturgis Ferry source chain supports the public take-out. The main caveat is dam-adjacent exposure, so the route is framed as a below-dam connector only."
    },
    "evidenceNotes": [
      {
        "label": "Threshold range",
        "value": "300-6,000 cfs",
        "note": "CanWePaddle ties the Coralville Dam-to-Iowa City reach to USGS 05454500 and estimates 300 to 6,000 cfs as the runnable range.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/iowa-river-coralville-dam-to-iowa-city/"
      },
      {
        "label": "Current gauge check",
        "value": "2,260 cfs / 11.83 ft at 2026-07-23 04:00 CDT",
        "note": "USGS Water Services returned current Iowa River at Iowa City data during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05454500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Public put-in",
        "value": "Tailwater East public boat ramp below Coralville Dam",
        "note": "USACE says Tailwater East campground has a boat ramp for access to the Iowa River below the dam, and the recreation-status page lists the Tailwater East public boat ramp open with no courtesy dock.",
        "sourceUrl": "https://www.mvr.usace.army.mil/coralvillelake/recreation/boating-swimming/"
      },
      {
        "label": "Camping",
        "value": "Tailwater East campground",
        "note": "Recreation.gov describes 28 campsites at Tailwater East plus restrooms, showers, fish-cleaning station, and a ramp for accessing the Iowa River.",
        "sourceUrl": "https://www.recreation.gov/camping/campgrounds/156340"
      }
    ],
    "sourceLinks": [
      {
        "label": "CanWePaddle Iowa River Coralville Dam to Iowa City",
        "url": "https://canwepaddle.com/rivers/iowa/iowa-river-coralville-dam-to-iowa-city/",
        "provider": "local"
      },
      {
        "label": "USACE Coralville boating and swimming",
        "url": "https://www.mvr.usace.army.mil/coralvillelake/recreation/boating-swimming/",
        "provider": "local"
      },
      {
        "label": "USACE Coralville recreation status",
        "url": "https://www.mvr.usace.army.mil/coralvillelake/recreation-status/",
        "provider": "local"
      },
      {
        "label": "Tailwater East Campground",
        "url": "https://www.recreation.gov/camping/campgrounds/156340",
        "provider": "local"
      },
      {
        "label": "USGS 05454500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05454500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "shell-rock-river-strand-wilkinson",
    "slug": "shell-rock-river-strand-wilkinson",
    "name": "Shell Rock River",
    "reach": "Strand Park to Wilkinson Pioneer Park",
    "state": "Iowa",
    "region": "North-Central Iowa",
    "summary": "Shellrock River Greenbelt day run from Strand Park at Plymouth to Wilkinson Pioneer Park at Rock Falls, with county canoe access, limestone river scenery, and a now-current Shell Rock gauge.",
    "statusText": "Use the Shell Rock River at Shell Rock gauge as a downstream same-river proxy. Prior route guidance puts the better window around 1,000 to 1,500 cfs; below 1,000 cfs expect scraping, and above the range make a conservative wood/current call.",
    "latitude": 43.2229,
    "longitude": -93.0944,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "The Shell Rock River is generally canoeable but low water exposes shallow riffles and may require wading or dragging.",
        "The downstream Shell Rock gauge is a same-river proxy, not an exact access gauge. Confirm depth and local wood at Strand Park before launching.",
        "Use public county park accesses only. Avoid private banks and be alert for strainers, bridge debris, and swift current after rain."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05462000",
      "provider": "usgs",
      "siteId": "05462000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Shell Rock River at Shell Rock, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05462000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 1000,
      "tooLow": 1000,
      "thresholdSource": {
        "label": "Paddling.com Shell Rock River in Iowa flow note",
        "url": "https://paddling.com/paddle/trips/shell-rock-river-in-iowa",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "Summer levels can scrape through the limestone and cobble shallows. Rain can improve depth but may also add wood and pushy current.",
      "difficulty": "easy",
      "difficultyNotes": "This is a day-trip flatwater/moving-water route, but shallow ledges, wading, strainers, and the proxy gauge keep it out of the lowest-risk category.",
      "confidenceNotes": "Confidence is moderate: county and travel sources strongly support Strand Park and Wilkinson Pioneer Park as public canoe/kayak accesses and the Iowa canoe guide maps the Strand-to-Wilkinson corridor. The earlier live-gauge blocker is resolved because USGS Water Services returned current Shell Rock data during this run. Threshold confidence remains community and minimum-only because the route-specific flow note gives a low-water floor and optimum window, while no official manager publishes a complete high-water cutoff for this exact Plymouth-to-Rock-Falls reach."
    },
    "evidenceNotes": [
      {
        "label": "Current gauge check",
        "value": "2,090 cfs / 9.19 ft at 2026-07-23 03:45 CDT",
        "note": "USGS Water Services returned current Shell Rock River at Shell Rock data during this run, resolving the prior no-live-gauge blocker for this candidate.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05462000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold guidance",
        "value": "1,000 cfs low-water floor; 1,000-1,500 cfs optimum note",
        "note": "The route-specific Paddling.com flow note reviewed in the Iowa ledger says below 1,000 cfs involves scraping and 1,000 to 1,500 cfs seems optimum on the Shell Rock gauge.",
        "sourceUrl": "https://paddling.com/paddle/trips/shell-rock-river-in-iowa"
      },
      {
        "label": "Public put-in",
        "value": "Strand Park, 20057 340th St., Plymouth",
        "note": "Iowa DNR county recreation materials list Strand Park, and prior Cerro Gordo County review identified Strand Park as a Shellrock River canoe access.",
        "sourceUrl": "https://www.iowadnr.gov/media/6187/download?inline="
      },
      {
        "label": "Public take-out and camping",
        "value": "Wilkinson Pioneer Park canoe/kayak launch and campground",
        "note": "Cerro Gordo County / Visit Mason City describe Wilkinson Pioneer Park on the Shellrock River with a canoe/kayak launch, river frontage, and modern campground support.",
        "sourceUrl": "https://cerrogordo.gov/conservation/parks/wilkinson_pioneer_park/"
      },
      {
        "label": "Corridor context",
        "value": "Shellrock River Greenbelt",
        "note": "Cerro Gordo County describes a 7.5-mile Shellrock River Greenbelt with canoe-floating, primitive camping, and public access from Wilkinson Park, 295th Street, and Highway 122.",
        "sourceUrl": "https://cerrogordo.gov/conservation/parks/shellrock_river_greenbelt_and_preserve/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Iowa DNR Cerro Gordo recreation map",
        "url": "https://www.iowadnr.gov/media/6187/download?inline=",
        "provider": "local"
      },
      {
        "label": "Cerro Gordo County Wilkinson Pioneer Park",
        "url": "https://cerrogordo.gov/conservation/parks/wilkinson_pioneer_park/",
        "provider": "local"
      },
      {
        "label": "Cerro Gordo County Shellrock River Greenbelt",
        "url": "https://cerrogordo.gov/conservation/parks/shellrock_river_greenbelt_and_preserve/",
        "provider": "local"
      },
      {
        "label": "USGS 05462000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05462000/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "lizard-creek-lentsch-cunningham",
    "slug": "lizard-creek-lentsch-cunningham",
    "name": "Lizard Creek",
    "reach": "Lentsch Access to Cunningham Access",
    "state": "Iowa",
    "region": "North-Central Iowa",
    "summary": "Short upper Lizard Creek water-trail run from Lentsch to Cunningham, with clear fast water, glacial boulders, riffles, and a direct Fort Dodge stage gauge.",
    "statusText": "Use the Lizard Creek near Fort Dodge stage gauge. American Whitewater lists 5 to 8 ft as the optimum paddling window; below 5 ft expect scrape-prone riffles and pinning hazards.",
    "latitude": 42.53987,
    "longitude": -94.34342,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "private_banks",
        "cold_water"
      ],
      "safetyNotes": [
        "Iowa DNR says Lizard Creek is not for beginners; the upper reach has fast water, large rocks, glacial boulders, and significant riffles even at moderate stages.",
        "Lizard Creek rises and falls quickly. At low water, expect portages and pinning risk on shallow boulders; at higher water, rocks can hide just under the surface.",
        "This is a non-meandered stream. Use only public accesses and do not get out, scout, or camp on private banks except for emergencies."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05480080",
      "provider": "usgs",
      "siteId": "05480080",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Lizard Creek near Fort Dodge, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05480080/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 5,
      "idealMax": 8,
      "tooLow": 5,
      "tooHigh": 8,
      "thresholdSource": {
        "label": "American Whitewater Lizard Creek optimum stage guidance",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/4394/main",
        "provider": "american_whitewater"
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
      "seasonNotes": "Spring and post-rain windows are most reliable, but the creek changes quickly. Check the Fort Dodge stage trend and weather upstream before committing.",
      "difficulty": "moderate",
      "difficultyNotes": "Iowa DNR classifies Lentsch-to-Cunningham as intermediate and American Whitewater rates the whole reach Class I-II. The short mileage does not make it beginner water.",
      "confidenceNotes": "Confidence is good for a guarded whitewater-filtered add: the Iowa DNR / Webster County water-trail brochure documents Lentsch-to-Cunningham as a 3-mile intermediate stream reach, American Whitewater documents the exact Lentsch-to-Phinney access chain and 5-8 ft optimum stage range, AW publishes endpoint coordinates, and USGS 05480080 is a direct live gauge at the Rasch / Johnson Avenue corridor downstream."
    },
    "evidenceNotes": [
      {
        "label": "Current gauge check",
        "value": "4.56 ft at 2026-07-23 02:15 CDT",
        "note": "USGS Water Services returned current Lizard Creek stage during this run. The request did not return current discharge, so this card scores stage only.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05480080&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold range",
        "value": "5-8 ft optimum",
        "note": "American Whitewater ties the Lentsch-to-Phinney reach to the USGS Lizard Creek near Fort Dodge gauge and lists 5 to 8 ft as optimum paddling levels.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/4394/main"
      },
      {
        "label": "Route shape",
        "value": "About 3.1 miles",
        "note": "American Whitewater lists Lentsch-to-Cunningham as about 3.1 miles; the Iowa DNR / Webster County brochure lists the stream reach as 3 miles.",
        "sourceUrl": "https://cms7files.revize.com/webstercountyia/Departments/Conservation/wt_lizard.pdf"
      },
      {
        "label": "Access support",
        "value": "Lentsch and Cunningham accesses",
        "note": "The Iowa DNR / Webster County brochure says both accesses are excellent, well marked, have adequate parking, and have graveled trails to the stream.",
        "sourceUrl": "https://cms7files.revize.com/webstercountyia/Departments/Conservation/wt_lizard.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "American Whitewater Lizard Creek",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/4394/main",
        "provider": "american_whitewater"
      },
      {
        "label": "Iowa DNR / Webster County Lizard Creek Water Trail brochure",
        "url": "https://cms7files.revize.com/webstercountyia/Departments/Conservation/wt_lizard.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 05480080 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05480080/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "lizard-creek-cunningham-rasch",
    "slug": "lizard-creek-cunningham-rasch",
    "name": "Lizard Creek",
    "reach": "Cunningham Access to Rasch Access",
    "state": "Iowa",
    "region": "North-Central Iowa",
    "summary": "Middle Lizard Creek water-trail run from Cunningham to Rasch, with swift riffles, private pasture banks, electric-fence hazards, and the direct Fort Dodge stage gauge.",
    "statusText": "Use the Lizard Creek near Fort Dodge stage gauge. American Whitewater lists 5 to 8 ft as the optimum paddling window; the DNR brochure warns this middle reach is not for unskilled paddlers.",
    "latitude": 42.53134,
    "longitude": -94.30474,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "private_banks",
        "cold_water"
      ],
      "safetyNotes": [
        "The Iowa DNR / Webster County brochure calls out electric fences, rocky riffles, a sharp curve, and a railroad bridge with logs against supports below Cunningham.",
        "Avoid this reach after heavy rain or when the stage is rising quickly; bridge debris and cattle-pasture fence hazards become harder to manage.",
        "Stay in the boat between public accesses unless there is an emergency. Lizard Creek is non-meandered and adjacent land and streambed are private outside public areas."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05480080",
      "provider": "usgs",
      "siteId": "05480080",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Lizard Creek near Fort Dodge, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05480080/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 5,
      "idealMax": 8,
      "tooLow": 5,
      "tooHigh": 8,
      "thresholdSource": {
        "label": "American Whitewater Lizard Creek optimum stage guidance",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/4394/main",
        "provider": "american_whitewater"
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
      "seasonNotes": "Spring and timely rain windows are best. Low water exposes bony riffles, while fast rises make fences, bridge piers, logs, and sharp bends more consequential.",
      "difficulty": "hard",
      "difficultyNotes": "Iowa DNR classifies Cunningham-to-Rasch as intermediate but explicitly says the pastured section below Cunningham is particularly difficult. The app treats it as a hard, whitewater-filtered creek run.",
      "confidenceNotes": "Confidence is high enough for a guarded whitewater-filtered add: the Iowa DNR / Webster County brochure documents the exact Cunningham-to-Rasch stream reach, hazards, access quality, and intermediate classification; American Whitewater independently documents the same access chain, 5.2-mile split, coordinates, Class I-II rating, and 5-8 ft stage guidance; and the selected USGS gauge is on the same creek at the downstream Rasch / Johnson Avenue corridor."
    },
    "evidenceNotes": [
      {
        "label": "Current gauge check",
        "value": "4.56 ft at 2026-07-23 02:15 CDT",
        "note": "USGS Water Services returned current Lizard Creek stage during this run. The request did not return current discharge, so this card scores stage only.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05480080&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold range",
        "value": "5-8 ft optimum",
        "note": "American Whitewater ties the Lentsch-to-Phinney reach to the USGS Lizard Creek near Fort Dodge gauge and lists 5 to 8 ft as optimum paddling levels.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/4394/main"
      },
      {
        "label": "Route shape",
        "value": "About 5.2 to 5.5 miles",
        "note": "American Whitewater lists Cunningham-to-Rasch as about 5.2 miles; the Iowa DNR / Webster County brochure lists the stream reach as 5.5 miles.",
        "sourceUrl": "https://cms7files.revize.com/webstercountyia/Departments/Conservation/wt_lizard.pdf"
      },
      {
        "label": "Primary hazards",
        "value": "Electric fences, riffles, railroad bridge logs",
        "note": "The Iowa DNR / Webster County brochure warns of marked and unmarked electric fences, rocky riffles, and brush/logs piled against a railroad bridge in the Cunningham-to-Rasch reach.",
        "sourceUrl": "https://cms7files.revize.com/webstercountyia/Departments/Conservation/wt_lizard.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "American Whitewater Lizard Creek",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/4394/main",
        "provider": "american_whitewater"
      },
      {
        "label": "Iowa DNR / Webster County Lizard Creek Water Trail brochure",
        "url": "https://cms7files.revize.com/webstercountyia/Departments/Conservation/wt_lizard.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 05480080 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05480080/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "lizard-creek-rasch-phinney",
    "slug": "lizard-creek-rasch-phinney",
    "name": "Lizard Creek",
    "reach": "Rasch Access to Phinney Park",
    "state": "Iowa",
    "region": "North-Central Iowa",
    "summary": "Lower Lizard Creek challenge run from Rasch Access to Phinney Park, with at least 25 rocky riffles or rapids, limestone bluffs, and a direct same-corridor stage gauge.",
    "statusText": "Use the Lizard Creek near Fort Dodge stage gauge. American Whitewater lists 5 to 8 ft as optimum; the DNR brochure classifies Rasch-to-Phinney as advanced.",
    "latitude": 42.529,
    "longitude": -94.25635,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "urban_water_quality",
        "private_banks",
        "cold_water"
      ],
      "safetyNotes": [
        "Iowa DNR classifies Rasch-to-Phinney as advanced and says it has at least 25 rocky riffles or rapids with varying difficulty.",
        "American Whitewater notes the final mile before the Des Moines River confluence contains Class 2 rapids. Do not treat Phinney as optional unless your group has a separate lower-river plan.",
        "Expect fallen trees, bridge/industrial-zone debris, fast post-rain rises, and private banks. Scout only from legal public areas."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05480080",
      "provider": "usgs",
      "siteId": "05480080",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Lizard Creek near Fort Dodge, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05480080/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 5,
      "idealMax": 8,
      "tooLow": 5,
      "tooHigh": 8,
      "thresholdSource": {
        "label": "American Whitewater Lizard Creek optimum stage guidance",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/4394/main",
        "provider": "american_whitewater"
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
      "seasonNotes": "Spring and post-rain windows are most reliable, but this lower challenge reach should be avoided when the gauge is below the AW floor, rising quickly, or above the published optimum window.",
      "difficulty": "hard",
      "difficultyNotes": "This is the most challenging Lizard Creek split: DNR rates it advanced and AW flags Class 2 rapids in the final mile near Fort Dodge.",
      "confidenceNotes": "Confidence is good for a whitewater-filtered add: Iowa DNR / Webster County documents the Rasch-to-Phinney stream reach, advanced classification, at least 25 rocky riffles or rapids, and Phinney river-right access just above the Des Moines confluence; American Whitewater documents the same access chain, coordinates, Class I-II rating, and 5-8 ft stage range; and USGS 05480080 is the direct same-creek gauge at the Rasch / Johnson Avenue corridor."
    },
    "evidenceNotes": [
      {
        "label": "Current gauge check",
        "value": "4.56 ft at 2026-07-23 02:15 CDT",
        "note": "USGS Water Services returned current Lizard Creek stage during this run. The request did not return current discharge, so this card scores stage only.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05480080&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold range",
        "value": "5-8 ft optimum",
        "note": "American Whitewater ties the Lentsch-to-Phinney reach to the USGS Lizard Creek near Fort Dodge gauge and lists 5 to 8 ft as optimum paddling levels.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/4394/main"
      },
      {
        "label": "Route shape",
        "value": "About 5.6 to 6 miles",
        "note": "American Whitewater lists Rasch-to-Phinney as about 5.6 miles; the Iowa DNR / Webster County brochure lists the stream reach as 6 miles.",
        "sourceUrl": "https://cms7files.revize.com/webstercountyia/Departments/Conservation/wt_lizard.pdf"
      },
      {
        "label": "Advanced reach",
        "value": "At least 25 rocky riffles or rapids",
        "note": "The Iowa DNR / Webster County brochure says the Rasch-to-Phinney section is the most challenging Lizard Creek segment and rates it advanced.",
        "sourceUrl": "https://cms7files.revize.com/webstercountyia/Departments/Conservation/wt_lizard.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "American Whitewater Lizard Creek",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/4394/main",
        "provider": "american_whitewater"
      },
      {
        "label": "Iowa DNR / Webster County Lizard Creek Water Trail brochure",
        "url": "https://cms7files.revize.com/webstercountyia/Departments/Conservation/wt_lizard.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 05480080 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05480080/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "cedar-river-brookwood-janesville",
    "slug": "cedar-river-brookwood-janesville",
    "name": "Cedar River",
    "reach": "Brookwood Park to Janesville City Park",
    "state": "Iowa",
    "region": "Cedar Valley",
    "summary": "Ten-mile Cedar River day run from Waverly Brookwood Park to Janesville, using the direct Janesville gauge and official local paddling-map access notes.",
    "statusText": "Use the Janesville gauge. CanWePaddle estimates 250 to 3,000 cfs as the runnable window; high or fast-rising water makes this reach pushy around bridges, outside bends, and wood.",
    "latitude": 42.720963,
    "longitude": -92.464754,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks",
        "cold_water"
      ],
      "safetyNotes": [
        "Brookwood Park is downstream of central Waverly dam exposure; launch only from the public non-motorized ramp area and do not paddle upstream toward dam hydraulics.",
        "The Janesville gauge is direct, but it cannot show floating wood, bridge-current changes, or local access closures after storms.",
        "Treat banks outside signed parks and accesses as private unless posted otherwise."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05458500",
      "provider": "usgs",
      "siteId": "05458500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Cedar River at Janesville, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05458500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 250,
      "idealMax": 3000,
      "tooLow": 250,
      "tooHigh": 3000,
      "thresholdSource": {
        "label": "CanWePaddle Waverly to Janesville estimated range",
        "url": "https://canwepaddle.com/rivers/iowa/cedar-river-waverly-to-janesville/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "CanWePaddle identifies May through September as the normal season. Spring rain can push the river above the selected range, while late-summer low water can expose gravel.",
      "difficulty": "easy",
      "difficultyNotes": "CanWePaddle rates the reach Class I. The app keeps a caution profile for bridge current, wood, private banks, and fast rises.",
      "confidenceNotes": "Confidence is good for a day-route add: CanWePaddle ties the exact Waverly-to-Janesville reach to the direct Janesville USGS gauge, Waverly documents Brookwood Park and its non-motorized boat ramp, and the Cedar Valley paddling map identifies Brookwood Park to Janesville City Park as 10.1 miles."
    },
    "evidenceNotes": [
      {
        "label": "Current gauge check",
        "value": "2,540 cfs / 3.23 ft at 2026-07-22 20:45 CDT",
        "note": "USGS Water Services returned current Janesville discharge and stage during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05458500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold range",
        "value": "250-3,000 cfs",
        "note": "CanWePaddle ties the Waverly-to-Janesville section to USGS 05458500 and estimates a 250 to 3,000 cfs runnable window.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/cedar-river-waverly-to-janesville/"
      },
      {
        "label": "Route shape",
        "value": "10.1 miles / about 4 hours",
        "note": "The Cedar Valley paddling map identifies Brookwood Park to Janesville City Park as 10.1 miles; CanWePaddle lists the Waverly-to-Janesville run as 10 miles.",
        "sourceUrl": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf"
      },
      {
        "label": "Put-in support",
        "value": "Brookwood Park, 415 6th Ave SE, Waverly",
        "note": "The City of Waverly describes Brookwood Park as along the Cedar River south of the Green Bridge with a non-motorized boat ramp and parking.",
        "sourceUrl": "https://www.waverlyia.com/leisure-services/departments/parks/park-information.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "CanWePaddle Cedar River Waverly to Janesville",
        "url": "https://canwepaddle.com/rivers/iowa/cedar-river-waverly-to-janesville/",
        "provider": "local"
      },
      {
        "label": "USGS 05458500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05458500/",
        "provider": "usgs"
      },
      {
        "label": "Cedar Valley Brookwood to Janesville paddling map",
        "url": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf",
        "provider": "local"
      },
      {
        "label": "City of Waverly park information",
        "url": "https://www.waverlyia.com/leisure-services/departments/parks/park-information.aspx",
        "provider": "local"
      }
    ]
  },
  {
    "id": "little-sioux-river-linn-grove-peterson",
    "slug": "little-sioux-river-linn-grove-peterson",
    "name": "Little Sioux River",
    "reach": "Linn Grove Dam Area to Riverside Little Sioux Access",
    "state": "Iowa",
    "region": "Northwest Iowa",
    "summary": "Nine-mile Little Sioux River Class I run from the Linn Grove Dam Area downstream to Peterson, with endpoint camping at Linn Grove and a direct Linn Grove gauge.",
    "statusText": "Use the Linn Grove gauge. CanWePaddle estimates 100 to 1,500 cfs as the runnable window; stay well away from the Linn Grove low-head dam and launch below it.",
    "latitude": 42.89630556,
    "longitude": -95.243,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "low_head_dam",
        "mandatory_takeout",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "The Linn Grove Dam Area has a low-head dam. Do not approach the dam from upstream, and use only a confirmed below-dam launch point.",
        "The Little Sioux can rise quickly after rain and snowmelt; avoid fast, cold, or debris-laden water even when the gauge remains within range.",
        "Use the Riverside Little Sioux Access at Peterson as the take-out and respect private banks between public accesses."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-06605850",
      "provider": "usgs",
      "siteId": "06605850",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Little Sioux River at Linn Grove, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06605850/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 100,
      "idealMax": 1500,
      "tooLow": 100,
      "tooHigh": 1500,
      "thresholdSource": {
        "label": "CanWePaddle Linn Grove to Peterson estimated range",
        "url": "https://canwepaddle.com/rivers/iowa/little-sioux-river-linn-grove-to-peterson/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "CanWePaddle identifies May through September as the normal season, with spring high water and late-summer low water as recurring limits.",
      "difficulty": "easy",
      "difficultyNotes": "CanWePaddle rates the reach Class I. The dam-adjacent launch, strainers, private banks, and fast-rising prairie runoff keep this as a caution route.",
      "confidenceNotes": "Confidence is good for a guarded day-route add: CanWePaddle ties the exact Linn-Grove-to-Peterson reach to the direct Linn Grove gauge, Iowa DNR maps the Little Sioux Linn Grove-to-Correctionville corridor, Buena Vista County documents the Linn Grove Dam Area ramp/camping, and Clay County documents Riverside Little Sioux Access at Peterson."
    },
    "evidenceNotes": [
      {
        "label": "Current gauge check",
        "value": "264 cfs / 5.65 ft at 2026-07-22 21:00 CDT",
        "note": "USGS Water Services returned current Linn Grove discharge and stage during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=06605850&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold range",
        "value": "100-1,500 cfs",
        "note": "CanWePaddle ties the Linn Grove-to-Peterson section to USGS 06605850 and estimates a 100 to 1,500 cfs runnable window.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/little-sioux-river-linn-grove-to-peterson/"
      },
      {
        "label": "Public endpoints",
        "value": "Linn Grove Dam Area to Riverside Little Sioux Access",
        "note": "Buena Vista County documents the Linn Grove Dam Area boat ramp and camping; Clay County documents Riverside Little Sioux Access with canoe/kayak access and parking.",
        "sourceUrl": "https://www.mycountyparks.com/county/Clay/Park/Riverside-Little-Sioux-Access"
      }
    ],
    "sourceLinks": [
      {
        "label": "CanWePaddle Little Sioux Linn Grove to Peterson",
        "url": "https://canwepaddle.com/rivers/iowa/little-sioux-river-linn-grove-to-peterson/",
        "provider": "local"
      },
      {
        "label": "USGS 06605850 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06605850/",
        "provider": "usgs"
      },
      {
        "label": "Iowa DNR Little Sioux River map",
        "url": "https://programs.iowadnr.gov/lakemanagement/LakeDocuments/maps/RLS97.pdf",
        "provider": "local"
      },
      {
        "label": "Buena Vista County Linn Grove Dam Area",
        "url": "https://www.mycountyparks.com/county/Buena-Vista/Park/Linn-Grove-Dam-Area",
        "provider": "local"
      },
      {
        "label": "Clay County Riverside Little Sioux Access",
        "url": "https://www.mycountyparks.com/county/Clay/Park/Riverside-Little-Sioux-Access",
        "provider": "local"
      }
    ]
  },
  {
    "id": "winnebago-river-fertile-mason-city",
    "slug": "winnebago-river-fertile-mason-city",
    "name": "Winnebago River",
    "reach": "Fertile to Mason City",
    "state": "Iowa",
    "region": "North Iowa",
    "summary": "Thirteen-mile Winnebago River Class I run from Fertile toward Mason City, using the direct Mason City gauge and local river-park access evidence.",
    "statusText": "Use the Mason City gauge. CanWePaddle estimates 100 to 1,500 cfs as the runnable window; avoid dam hydraulics at Fertile and verify the Mason City take-out before launching.",
    "latitude": 43.266,
    "longitude": -93.424,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "dam",
        "strainers",
        "fast_rise",
        "access_uncertain",
        "private_banks",
        "cold_water"
      ],
      "safetyNotes": [
        "William Rhodes Island Park is by the Fertile Dam. Do not launch above the dam or paddle into dam hydraulics; start only from a confirmed safe below-dam access.",
        "Confirm the Mason City take-out on the day of the trip. The app uses East Park / Mason City as a practical endpoint anchor, but local signage and access status control.",
        "The Mason City gauge is direct for downstream conditions but cannot show wood, shallow gravel, or temporary closures."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05459500",
      "provider": "usgs",
      "siteId": "05459500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Winnebago River at Mason City, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05459500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 100,
      "idealMax": 1500,
      "tooLow": 100,
      "tooHigh": 1500,
      "thresholdSource": {
        "label": "CanWePaddle Fertile to Mason City estimated range",
        "url": "https://canwepaddle.com/rivers/iowa/winnebago-river-fertile-to-mason-city/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "CanWePaddle identifies May through September as the normal season, with spring runoff and late-summer low water as practical limits.",
      "difficulty": "easy",
      "difficultyNotes": "CanWePaddle rates the reach Class I. Dam proximity at Fertile, access verification at Mason City, wood, and private banks justify the caution classification.",
      "confidenceNotes": "Confidence is moderate: CanWePaddle provides an exact Fertile-to-Mason-City route and direct Mason City gauge range; the City of Fertile documents William Rhodes Island Park on the Winnebago River at the Fertile Dam, and regional Winnebago River water-trail pages corroborate public paddling use in the corridor. The card keeps explicit launch-below-dam and take-out-verification caveats."
    },
    "evidenceNotes": [
      {
        "label": "Current gauge check",
        "value": "168 cfs / 5.12 ft at 2026-07-22 21:15 CDT",
        "note": "USGS Water Services returned current Mason City discharge and stage during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05459500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold range",
        "value": "100-1,500 cfs",
        "note": "CanWePaddle ties the Fertile-to-Mason-City section to USGS 05459500 and estimates a 100 to 1,500 cfs runnable window.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/winnebago-river-fertile-to-mason-city/"
      },
      {
        "label": "Access support",
        "value": "William Rhodes Island Park / Fertile Dam and Mason City endpoint",
        "note": "The City of Fertile documents William Rhodes Island Park along the Winnebago River at the Fertile Dam. Mason City endpoint coordinates are a practical East Park / river-corridor anchor and must be verified locally before launch.",
        "sourceUrl": "https://fertileiowa.us/visitors/parks/"
      }
    ],
    "sourceLinks": [
      {
        "label": "CanWePaddle Winnebago River Fertile to Mason City",
        "url": "https://canwepaddle.com/rivers/iowa/winnebago-river-fertile-to-mason-city/",
        "provider": "local"
      },
      {
        "label": "USGS 05459500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05459500/",
        "provider": "usgs"
      },
      {
        "label": "City of Fertile parks",
        "url": "https://fertileiowa.us/visitors/parks/",
        "provider": "local"
      },
      {
        "label": "Winnebago County Winnebago River Water Trail",
        "url": "https://winnebagocountyiowa.gov/conservation/parks/winnebago_river_water_trail/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "iowa-river-sturgis-ferry-hills-access",
    "slug": "iowa-river-sturgis-ferry-hills-access",
    "name": "Iowa River",
    "reach": "Sturgis Ferry Park to Hills Access",
    "state": "Iowa",
    "region": "Iowa City Area",
    "summary": "Straightforward Johnson County water-trail day from Iowa City to Hills. The access story is strong and the Iowa City gauge is direct, but the threshold model stays conservative because there is no published paddling ladder for this reach.",
    "statusText": "Treat roughly 200 cfs at Iowa City as the conservative floor. This route has handled higher official event days too, but there is not a published upper paddling band for this segment.",
    "latitude": 41.640199994977,
    "longitude": -91.538966712124,
    "gaugeSource": {
      "id": "usgs-05454500",
      "provider": "usgs",
      "siteId": "05454500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Iowa River at Iowa City, IA"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Johnson County Iowa River Clean Up history for the Sturgis Ferry to Hills reach",
        "url": "https://www.johnsoncountyiowa.gov/iowa-river-clean"
      },
      "thresholdSourceStrength": "derived",
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
      "seasonNotes": "Spring through fall is the practical window. This is a broader Iowa River float than the tiny creeks in the app, so recent rain, debris, and muddy landings still matter even when the route is not technical.",
      "difficulty": "easy",
      "difficultyNotes": "Usually an approachable downstream day, but nine-plus miles, storm wood, and soft river banks keep it from being a blind beginner yes.",
      "confidenceNotes": "The route is official and the gauge is direct. Confidence is capped mainly by level guidance: Johnson County clearly uses this exact reach at flows from about 200 to 830 cfs, but there is still no published paddling guide for the Iowa City gauge, so the app only claims a conservative low-water floor."
    },
    "evidenceNotes": [
      {
        "label": "Official route",
        "value": "9.25 miles",
        "note": "Johnson County publishes Sturgis Ferry Park to Hills Access as the opening Johnson County segment of the Iowa River Water Trail.",
        "sourceUrl": "https://johnsoncountyiowa.gov/sites/default/files/2021-05/Iowa_River_Water_Trail.pdf"
      },
      {
        "label": "Access support",
        "value": "City launch to county ramp",
        "note": "Iowa City lists Sturgis Ferry Park with a boat ramp, parking, restrooms, and a 2024 renovation, while Johnson County says Hills Access has a boat ramp, parking, water, restrooms, playground, and camping.",
        "sourceUrl": "https://www.icgov.org/Home/Components/FacilityDirectory/FacilityDirectory/82/252?npage=2"
      },
      {
        "label": "Observed working levels",
        "value": "Official events at 200 to 830 cfs",
        "note": "Johnson County cleanup records show this exact Sturgis Ferry to Hills route running at 200, 228, 281, 420, 804, and 830 cfs. The app uses 200 cfs only as a conservative floor, not as a claimed sweet spot.",
        "sourceUrl": "https://www.johnsoncountyiowa.gov/iowa-river-clean"
      },
      {
        "label": "Route character",
        "value": "Urban edge into bottomland forest",
        "note": "Johnson County describes the first half as light industry and cabin-lined banks, with longer forested bottomland miles in the latter half.",
        "sourceUrl": "https://johnsoncountyiowa.gov/sites/default/files/2021-05/Iowa_River_Water_Trail.pdf"
      },
      {
        "label": "Take-out operations",
        "value": "Seasonal campground and ramp support",
        "note": "Johnson County says Hills Access offers a boat ramp, vault toilets, water, playground, and seasonal camping, with the campground typically open from April 15 to October 15.",
        "sourceUrl": "https://www.johnsoncountyiowa.gov/sites/default/files/2025-02/Hills%20Campground%20and%20Access.pdf"
      },
      {
        "label": "Shore-use caveat",
        "value": "Archery / falconry use east of the river",
        "note": "Johnson County notes that the area east of the Iowa River at Hills Access is limited to archery or falconry hunting only, which is useful context if you are exploring around the take-out.",
        "sourceUrl": "https://www.johnsoncountyiowa.gov/conservation/public-use-areas"
      },
      {
        "label": "Decision style",
        "value": "Conservative low-floor only",
        "note": "This route has stronger access support than threshold support. Use the gauge to avoid obvious low-water days, then judge debris, mud, and recent weather the same day."
      }
    ],
    "sourceLinks": [
      {
        "label": "Johnson County Iowa River Water Trail PDF",
        "url": "https://johnsoncountyiowa.gov/sites/default/files/2021-05/Iowa_River_Water_Trail.pdf"
      },
      {
        "label": "Iowa City Sturgis Ferry Park page",
        "url": "https://www.icgov.org/Home/Components/FacilityDirectory/FacilityDirectory/82/252?npage=2"
      },
      {
        "label": "Johnson County camping information",
        "url": "https://johnsoncountyiowa.gov/conservation/camping"
      },
      {
        "label": "Johnson County Hills Access PDF",
        "url": "https://www.johnsoncountyiowa.gov/sites/default/files/2025-02/Hills%20Campground%20and%20Access.pdf"
      },
      {
        "label": "Johnson County public use areas",
        "url": "https://johnsoncountyiowa.gov/conservation/public-use-areas"
      },
      {
        "label": "Johnson County conservation rules and regulations",
        "url": "https://www.johnsoncountyiowa.gov/conservation/rules-and-regulations"
      },
      {
        "label": "Johnson County Iowa River Clean Up",
        "url": "https://www.johnsoncountyiowa.gov/iowa-river-clean"
      },
      {
        "label": "USGS 05454500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05454500/"
      }
    ]
  },
  {
    "id": "des-moines-river-bentonsport-bonaparte",
    "slug": "des-moines-river-bentonsport-bonaparte",
    "name": "Des Moines River",
    "reach": "Bentonsport Boat Ramp to Bonaparte Boat Ramp",
    "state": "Iowa",
    "region": "Southeast Iowa",
    "summary": "Short Lower Des Moines River water-trail segment from historic Bentonsport to Bonaparte, with public riverfront parks, riffles around old lock-and-dam remnants, geode bars, and a nearby Keosauqua gauge.",
    "statusText": "Use the Des Moines River at Keosauqua gauge. Treat roughly 3,500 cfs as the preferred low-water exploring level, expect walking at 700 to 800 cfs or less, and avoid claiming a normal trip above about 6,000 cfs because the rock bars go under.",
    "latitude": 40.72454,
    "longitude": -91.85125,
    "gaugeSource": {
      "id": "usgs-05490500",
      "provider": "usgs",
      "siteId": "05490500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Des Moines River at Keosauqua, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05490500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "dam",
        "strainers"
      ],
      "safetyNotes": [
        "Old lock-and-dam remnants and riffles can expose rock and create confusing current at low water.",
        "Large-river wind, floating debris after rain, motorboats, and muddy landings require extra trip planning.",
        "Use public access areas and legal bars; private property begins above the ordinary high-water mark."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 3000,
      "idealMax": 4500,
      "tooLow": 800,
      "tooHigh": 6000,
      "thresholdSource": {
        "label": "Outdoor Adventures Made Easy Bentonsport-to-Bonaparte level notes",
        "url": "https://outdooradventuresmadeeasy.com/iowa/geode-paddle/",
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
      "seasonNotes": "Late summer and early fall often expose the rock and geode bars that make this route distinctive. Spring flows can still be paddleable, but higher water covers the bars and changes the trip from a slow explore into a broader moving-water float.",
      "difficulty": "easy",
      "difficultyNotes": "The route is short and generally beginner-friendly at lower levels, but old lock-and-dam remnants, riffles, exposed rock bars, and changing sand/gravel landings require attention. Treat very low water as a walking-and-scraping trip, not a clean float.",
      "confidenceNotes": "Confidence is good but not official-threshold high: Van Buren County / MyCountyParks confirms Bentonsport Park has a public boat ramp on the Lower Des Moines River Water Trail, Villages of Van Buren and Iowa DNR sources identify Bentonsport and Bonaparte as water-trail access points, USGS 05490500 is a direct same-river gauge upstream at Keosauqua, and Outdoor Adventures Made Easy publishes route-specific Bentonsport-to-Bonaparte cfs guidance tied to that gauge. The app uses the community range conservatively and keeps the cautions explicit."
    },
    "evidenceNotes": [
      {
        "label": "Official water trail",
        "value": "Bentonsport to Bonaparte",
        "note": "The Iowa DNR lower Des Moines water-trail planning material names Segment 6 as Bentonsport Boat Ramp to Bonaparte Boat Ramp, and local water-trail pages list both as access points.",
        "sourceUrl": "https://www.iowadnr.gov/Portals/idnr/uploads/riverprograms/plans/wtplan_lower_dsm.pdf"
      },
      {
        "label": "Put-in access",
        "value": "Bentonsport Park boat ramp",
        "note": "Van Buren County / MyCountyParks says Bentonsport Park sits along the Des Moines River and has a boat ramp giving access to the Lower Des Moines River Water Trail.",
        "sourceUrl": "https://www.mycountyparks.com/county/Van-Buren/Park/Bentonsport-Park"
      },
      {
        "label": "Take-out access",
        "value": "Bonaparte Riverfront / City Park",
        "note": "Villages of Van Buren lists Bonaparte among the Lower Des Moines River Trail access points, and NPS identifies Bonaparte Riverfront Park as a city-managed riverfront park with auto parking.",
        "sourceUrl": "https://villagesofvanburen.com/explore/des_moines_river_trail/"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 05490500",
        "note": "USGS operates Des Moines River at Keosauqua, IA, upstream on the same lower-river corridor; the Iowa DNR AQuIA record ties the Keosauqua bridge site to USGS NWIS 05490500.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05490500/"
      },
      {
        "label": "Route-specific levels",
        "value": "700-6,000 cfs used; about 3,500 cfs preferred",
        "note": "Outdoor Adventures Made Easy describes the Bentonsport-to-Bonaparte paddle, says 700 to 800 cfs or less can require walking, prefers about 3,500 cfs, and says higher than 6,000 cfs covers many rock bars.",
        "sourceUrl": "https://outdooradventuresmadeeasy.com/iowa/geode-paddle/"
      },
      {
        "label": "Route character",
        "value": "3.6 to 5 miles",
        "note": "The route report gives 3.6 miles for the main Bentonsport-to-Bonaparte paddle, while local water-trail access spacing lists Bentonsport to Bonaparte as about five miles. Plan it as a short day with time to stop at bars and historical features.",
        "sourceUrl": "https://outdooradventuresmadeeasy.com/iowa/geode-paddle/"
      },
      {
        "label": "Access coordinates",
        "value": "Bentonsport 40.72454, -91.85125; Bonaparte 40.69785, -91.80552",
        "note": "Coordinates are anchored to named public park/access map features: Bentonsport Riverside Park / Bentonsport Park and Bonaparte City Park / Riverfront Park. Use posted signs to identify the exact ramp approach.",
        "sourceUrl": "https://mapcarta.com/W410402678"
      }
    ],
    "sourceLinks": [
      {
        "label": "Iowa DNR Lower Des Moines River Water Trail plan",
        "url": "https://www.iowadnr.gov/Portals/idnr/uploads/riverprograms/plans/wtplan_lower_dsm.pdf",
        "provider": "local"
      },
      {
        "label": "Van Buren County Bentonsport Park",
        "url": "https://www.mycountyparks.com/county/Van-Buren/Park/Bentonsport-Park",
        "provider": "local"
      },
      {
        "label": "Villages of Van Buren Des Moines River Trail",
        "url": "https://villagesofvanburen.com/explore/des_moines_river_trail/",
        "provider": "local"
      },
      {
        "label": "Outdoor Adventures Made Easy Geode Paddle",
        "url": "https://outdooradventuresmadeeasy.com/iowa/geode-paddle/",
        "provider": "local"
      },
      {
        "label": "USGS 05490500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05490500/",
        "provider": "usgs"
      },
      {
        "label": "Iowa DNR Fish Iowa Des Moines River Ottumwa Dam to Farmington",
        "url": "https://programs.iowadnr.gov/lakemanagement/FishIowa/RiverStreamDetails/RDM89",
        "provider": "local"
      },
      {
        "label": "NPS Bonaparte Riverfront Park",
        "url": "https://www.nps.gov/places/bonaparte-riverfront-park.htm",
        "provider": "nps"
      },
      {
        "label": "Bonaparte City Park map record",
        "url": "https://mapcarta.com/22043716",
        "provider": "local"
      }
    ]
  },
  {
    "id": "des-moines-river-keosauqua-bentonsport",
    "slug": "des-moines-river-keosauqua-bentonsport",
    "name": "Des Moines River",
    "reach": "Keosauqua Boat Ramp to Bentonsport Boat Ramp",
    "state": "Iowa",
    "region": "Southeast Iowa",
    "summary": "Official Lower Des Moines River water-trail day from Keosauqua around the big horseshoe bend to Bentonsport, with sandstone cliffs, public lower-river access, sandbar-camping rules, and a direct Keosauqua gauge.",
    "statusText": "Use the Des Moines River at Keosauqua gauge. Treat the existing lower-river 800 to 6,000 cfs model conservatively here; above that, releases and big-river speed can make this more than a beginner float.",
    "latitude": 40.7291,
    "longitude": -91.962,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "dam",
        "strainers",
        "fast_rise",
        "private_banks",
        "cold_water"
      ],
      "safetyNotes": [
        "Iowa DNR notes old dam remains and rock obstructions just below Keosauqua; avoid the rough water and scout if levels are low or pushy.",
        "USACE Red Rock releases can make the lower Des Moines unexpectedly low, high, or fast even when local weather is quiet.",
        "The Lower Des Moines is meandered, but private property begins at the ordinary high-water mark. Keep stops to the riverbed, legal sandbars, and public lands."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05490500",
      "provider": "usgs",
      "siteId": "05490500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Des Moines River at Keosauqua, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05490500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 3000,
      "idealMax": 4500,
      "tooLow": 800,
      "tooHigh": 6000,
      "thresholdSource": {
        "label": "Outdoor Adventures Made Easy lower Des Moines Keosauqua-gauge notes",
        "url": "https://outdooradventuresmadeeasy.com/iowa/geode-paddle/",
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
      "seasonNotes": "Spring through fall is the practical season. Red Rock release management can override local rainfall patterns, so use the live Keosauqua gauge and look at the landing before launching.",
      "difficulty": "easy",
      "difficultyNotes": "Iowa DNR calls this 8.6-mile reach appropriate for beginners at normal levels. Rock obstructions below Keosauqua, bridge current, cold water, release-driven speed, and an 8.6-mile committing bend keep it in caution.",
      "confidenceNotes": "Confidence is moderate-good: Iowa DNR documents the exact Keosauqua-to-Bentonsport reach, distance, public water-trail setting, geology, and safety issues; the Keosauqua USGS gauge is direct and at the put-in town; the lower-river cfs model is reused from a same-gauge adjacent Bentonsport-to-Bonaparte source rather than a route-specific official band, so the card stays conservative."
    },
    "evidenceNotes": [
      {
        "label": "Official route",
        "value": "Keosauqua to Bentonsport, 8.6 miles",
        "note": "Iowa DNR Lower Des Moines River water-trail material identifies this exact stream reach and describes the horseshoe bend, sandstone cliffs, and Lower Des Moines access context.",
        "sourceUrl": "https://www.iowadnr.gov/media/8889/download?inline="
      },
      {
        "label": "Current gauge check",
        "value": "7,230 cfs / 12.62 ft at 2026-07-22 23:15 CDT",
        "note": "USGS Water Services returned current discharge and stage for Des Moines River at Keosauqua during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05490500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold model",
        "value": "800 / 3,000-4,500 / 6,000 cfs",
        "note": "Outdoor Adventures Made Easy publishes lower Des Moines Keosauqua-gauge paddling notes for the adjacent Bentonsport-to-Bonaparte geode paddle. This card reuses that model conservatively and flags current high water above the normal recommendation.",
        "sourceUrl": "https://outdooradventuresmadeeasy.com/iowa/geode-paddle/"
      },
      {
        "label": "Safety and camping",
        "value": "Meandered stream with sandbar camping; Red Rock releases matter",
        "note": "Iowa DNR says the riverbed, sandbars, and banks up to the high-water mark are held in public trust, sandbar camping is allowed on meandered streams, and Red Rock releases can make water unexpectedly low, high, or fast.",
        "sourceUrl": "https://www.iowadnr.gov/media/8889/download?inline="
      }
    ],
    "sourceLinks": [
      {
        "label": "Iowa DNR Lower Des Moines River guide",
        "url": "https://www.iowadnr.gov/media/8889/download?inline=",
        "provider": "local"
      },
      {
        "label": "Villages of Van Buren Des Moines River Trail",
        "url": "https://villagesofvanburen.com/explore/des_moines_river_trail/",
        "provider": "local"
      },
      {
        "label": "Outdoor Adventures Made Easy Geode Paddle",
        "url": "https://outdooradventuresmadeeasy.com/iowa/geode-paddle/",
        "provider": "local"
      },
      {
        "label": "USGS 05490500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05490500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "south-skunk-river-lekwa-sopers-mill",
    "slug": "south-skunk-river-lekwa-sopers-mill",
    "name": "South Skunk River",
    "reach": "Lekwa Access to Soper's Mill",
    "state": "Iowa",
    "region": "Central Iowa",
    "summary": "Upper Story County water-trail leg from Lekwa Access near the E-18 bridge to Soper's Mill, with wooded greenbelt banks, rock riffles, recurring wood hazards, and a direct South Skunk gauge downstream in Ames.",
    "statusText": "Treat roughly 125 cfs at the South Skunk near Ames gauge as the practical low-water floor for the above-Ames reach. This upper greenbelt segment is logjam-prone, so avoid high or rising water unless you know the corridor well.",
    "latitude": 42.1819,
    "longitude": -93.5708,
    "gaugeSource": {
      "id": "usgs-05470000",
      "provider": "usgs",
      "siteId": "05470000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "South Skunk River near Ames, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05470000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 125,
      "thresholdSource": {
        "label": "Skunk River Paddlers South Skunk Water Trail flow guidance",
        "url": "https://www.skunkriverpaddlers.org/skunk-river-water-trail"
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
      "seasonNotes": "Spring and post-rain windows usually provide the best depth, but this wooded upper Story County corridor can collect new strainers quickly. The Ames gauge is downstream on the same river, so pair it with same-day hazard reports and visual scouting.",
      "difficulty": "moderate",
      "difficultyNotes": "Story County and MyCountyParks identify this as an official water-trail corridor, but the Story County access guidance warns that log jams are usual between Story City and Soper's Mill. Treat the trip as moving-water problem solving, not a passive float.",
      "confidenceNotes": "Confidence is good for a guarded Iowa minimum-only add: Story County lists Lekwa Access #242 and Soper's Mill Access #235 as public South Skunk River Water Trail access points, MyCountyParks confirms both as canoe/kayak access areas, Skunk River Paddlers ties the above-Ames reach to a roughly 125 cfs minimum, and USGS 05470000 is a direct live same-river gauge downstream in the Ames corridor. The route intentionally stays minimum-only because no trusted source found publishes an ideal or upper band for this logjam-prone segment."
    },
    "evidenceNotes": [
      {
        "label": "Official water trail",
        "value": "Lekwa #242 to Soper's Mill #235",
        "note": "Story County lists Lekwa Access at 56156 130th St. and Soper's Mill Access at 56364 170th St. among the public South Skunk River Water Trail access points.",
        "sourceUrl": "https://www.storycountyiowa.gov/1496/South-Skunk-River-Water-Trail"
      },
      {
        "label": "Put-in access",
        "value": "Lekwa Access",
        "note": "MyCountyParks says Lekwa Access is a Skunk River water-trail access with canoeing and kayaking, and Story County places it just west of the Skunk River bridge on County Highway E-18.",
        "sourceUrl": "https://www.mycountyparks.com/county/story/Park/Lekwa-Access"
      },
      {
        "label": "Take-out access",
        "value": "Soper's Mill",
        "note": "Story County/MyCountyParks says Soper's Mill Access is part of the Skunk River Water Trail and lists the access sequence from Lekwa and Anderson downstream to Soper's Mill.",
        "sourceUrl": "https://www.mycountyparks.com/county/story/Park/Sopers-Mill/Activity/Canoeing-Kayaking"
      },
      {
        "label": "Route distance",
        "value": "About 7.3 river miles",
        "note": "The Story County South Skunk water-trail map places Lekwa Access and Soper's Mill about 7.3 river miles apart.",
        "sourceUrl": "https://portal.mycountyparks.com/Handler.ashx?Item_ID=1E38600B-76CF-4C0A-872C-D89497D0EEE3"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 05470000",
        "note": "USGS operates South Skunk River near Ames downstream on the same river, and Skunk River Paddlers lists it as a relevant local South Skunk water-trail gauge.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05470000/"
      },
      {
        "label": "Minimum flow",
        "value": "About 125 cfs",
        "note": "Skunk River Paddlers says most paddlers consider the minimum recommended flow above Ames and Ioway Creek to be somewhere near 125 cfs, while lower flows may require stepping out in riffles.",
        "sourceUrl": "https://www.skunkriverpaddlers.org/skunk-river-water-trail"
      },
      {
        "label": "Wood and private-bank caveat",
        "value": "Log jams usual between Story City and Soper's Mill",
        "note": "MyCountyParks' canoeing and kayaking guidance for the Skunk River Water Trail says log jams are usual between Story City and Soper's Mill, and Skunk River Paddlers warns that most adjoining land is private even where the public greenbelt borders the river.",
        "sourceUrl": "https://www.mycountyparks.com/county/story/Park/Sopers-Mill/Activity/Canoeing-Kayaking"
      }
    ],
    "sourceLinks": [
      {
        "label": "Story County South Skunk River Water Trail",
        "url": "https://www.storycountyiowa.gov/1496/South-Skunk-River-Water-Trail"
      },
      {
        "label": "Story County South Skunk map PDF",
        "url": "https://portal.mycountyparks.com/Handler.ashx?Item_ID=1E38600B-76CF-4C0A-872C-D89497D0EEE3"
      },
      {
        "label": "Skunk River Paddlers water trail guidance",
        "url": "https://www.skunkriverpaddlers.org/skunk-river-water-trail"
      },
      {
        "label": "Story County Lekwa Access",
        "url": "https://www.mycountyparks.com/county/story/Park/Lekwa-Access"
      },
      {
        "label": "Story County Soper's Mill canoeing and kayaking",
        "url": "https://www.mycountyparks.com/county/story/Park/Sopers-Mill/Activity/Canoeing-Kayaking"
      },
      {
        "label": "USGS 05470000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05470000/"
      }
    ]
  },
  {
    "id": "south-skunk-river-sleepy-hollow-river-valley",
    "slug": "south-skunk-river-sleepy-hollow-river-valley",
    "name": "South Skunk River",
    "reach": "Sleepy Hollow to River Valley Park",
    "state": "Iowa",
    "region": "Central Iowa",
    "summary": "Short Story County water-trail run through the north Ames corridor, starting at the W Riverside Road gauge and finishing at River Valley Park near the 13th Street rock-riffle / mitigated-dam feature.",
    "statusText": "Treat roughly 125 cfs at the South Skunk near Ames gauge as the practical low-water floor for the above-Ames reach. There is no broad-audience upper band, so judge rain, debris, and the River Valley Park riffle same-day.",
    "latitude": 42.06658,
    "longitude": -93.62025,
    "gaugeSource": {
      "id": "usgs-05470000",
      "provider": "usgs",
      "siteId": "05470000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "South Skunk River near Ames, IA"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "low_head_dam",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "The route finishes near the 13th Street mitigated-dam/paddler-passage feature; scout or take out conservatively if levels or skills are uncertain.",
        "Fresh wood, sweepers, muddy banks, and shallow rock riffles can change after storms.",
        "The South Skunk is non-meandered through this corridor; use public accesses and confirmed public parkland rather than assuming banks are public."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 125,
      "thresholdSource": {
        "label": "Skunk River Paddlers South Skunk Water Trail flow guidance",
        "url": "https://www.skunkriverpaddlers.org/skunk-river-water-trail"
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
      "seasonNotes": "Spring and post-rain windows usually give the cleanest depth. The South Skunk rises and drops quickly enough that wood, muddy banks, and recent storm debris can matter more than the gauge number alone.",
      "difficulty": "moderate",
      "difficultyNotes": "The mileage is short, but shallow rock riffles, private-bank constraints, and the River Valley Park mitigated-dam / paddler-passage area make this more than a passive float. Scout the 13th Street feature if levels or skills are uncertain.",
      "confidenceNotes": "Confidence is good for a guarded Iowa minimum-only add: Story County lists Sleepy Hollow and River Valley Park as public South Skunk Water Trail accesses, the USGS South Skunk near Ames gauge is at the W Riverside Road / Sleepy Hollow put-in corridor, and Skunk River Paddlers ties the above-Ames water trail to that gauge family with a roughly 125 cfs minimum. The main caveat is threshold shape: no trusted source found gives a broad recreational upper band for this exact short segment."
    },
    "evidenceNotes": [
      {
        "label": "Official water trail",
        "value": "Sleepy Hollow #230 to River Valley Park #227",
        "note": "Story County lists Sleepy Hollow at river mile 230 and River Valley Park at river mile 227 among the public South Skunk River Water Trail access points.",
        "sourceUrl": "https://www.storycountyiowa.gov/1496/South-Skunk-River-Water-Trail"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 05470000",
        "note": "USGS operates South Skunk River near Ames on the left bank just downstream from the West Riverside Road bridge, matching the Sleepy Hollow access and route put-in corridor.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05470000/"
      },
      {
        "label": "Minimum flow",
        "value": "About 125 cfs",
        "note": "Skunk River Paddlers says most paddlers consider the minimum recommended flow above Ames and Ioway Creek to be somewhere near 125 cfs, while lower flows may require stepping out in riffles.",
        "sourceUrl": "https://www.skunkriverpaddlers.org/skunk-river-water-trail"
      },
      {
        "label": "Route distance",
        "value": "About 2.9 river miles",
        "note": "The Story County South Skunk water-trail map places Sleepy Hollow and River Valley Park three river miles apart in the official access sequence.",
        "sourceUrl": "https://portal.mycountyparks.com/Handler.ashx?Item_ID=1E38600B-76CF-4C0A-872C-D89497D0EEE3"
      },
      {
        "label": "River Valley feature",
        "value": "Mitigated 13th Street dam",
        "note": "American Whitewater documents the 13th Street feature at North River Valley Park and notes that Iowa DNR mitigation converted the former low-head dam into fish and paddler passages.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/11597/main"
      },
      {
        "label": "Access and shore-use caveat",
        "value": "Public water, private banks",
        "note": "Story County and Skunk River Paddlers both warn that the South Skunk is non-meandered and much adjoining land is private, so use only public accesses and confirmed public parkland for stops.",
        "sourceUrl": "https://www.storycountyiowa.gov/1496/South-Skunk-River-Water-Trail"
      }
    ],
    "sourceLinks": [
      {
        "label": "Story County South Skunk River Water Trail",
        "url": "https://www.storycountyiowa.gov/1496/South-Skunk-River-Water-Trail"
      },
      {
        "label": "Skunk River Paddlers water trail guidance",
        "url": "https://www.skunkriverpaddlers.org/skunk-river-water-trail"
      },
      {
        "label": "USGS 05470000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05470000/"
      },
      {
        "label": "City of Ames River Valley Park",
        "url": "https://www.cityofames.org/My-Government/Departments/Parks-and-Recreation/Parks/River-Valley-Park"
      },
      {
        "label": "American Whitewater South Skunk 13th Street",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/11597/main"
      },
      {
        "label": "Story County South Skunk map PDF",
        "url": "https://portal.mycountyparks.com/Handler.ashx?Item_ID=1E38600B-76CF-4C0A-872C-D89497D0EEE3"
      }
    ]
  },
  {
    "id": "south-skunk-river-sopers-mill-peterson-park",
    "slug": "south-skunk-river-sopers-mill-peterson-park",
    "name": "South Skunk River",
    "reach": "Soper's Mill to Peterson Park West",
    "state": "Iowa",
    "region": "Central Iowa",
    "summary": "Short official South Skunk water-trail leg from the renovated Soper's Mill launch to Peterson Park West, with a constructed riffle at the put-in, public county access on both ends, and local gauge guidance for the above-Ames corridor.",
    "statusText": "Treat roughly 125 cfs at the South Skunk near Ames gauge as the practical low-water floor for the above-Ames reach. No trusted source gives a broad upper band, so avoid high or rising water unless you know this wooded corridor well.",
    "latitude": 42.10443,
    "longitude": -93.57549,
    "gaugeSource": {
      "id": "usgs-05470000",
      "provider": "usgs",
      "siteId": "05470000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "South Skunk River near Ames, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05470000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 125,
      "thresholdSource": {
        "label": "Skunk River Paddlers South Skunk Water Trail flow guidance",
        "url": "https://www.skunkriverpaddlers.org/skunk-river-water-trail"
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
      "seasonNotes": "Spring and post-rain windows usually make the upper Story County water trail less scrapey. The local gauge is downstream at W Riverside Road, so use it as a close same-river signal and still expect wood, shallow riffles, and muddy banks to change after storms.",
      "difficulty": "moderate",
      "difficultyNotes": "The mileage is short, but Story County describes the Soper's-to-Peterson stretch as suitable for paddlers with at least intermediate skill because of trees and riffles. Scout the constructed Soper's Mill riffle and be ready for shallow gravel or fresh strainers.",
      "confidenceNotes": "Confidence is good for a guarded Iowa minimum-only add: Story County lists Soper's Mill Access #235 and Peterson Park West Access #233 as public South Skunk River Water Trail access points, Story County/MyCountyParks confirms canoeing and kayaking at Soper's Mill and canoe access at Peterson Park West, USGS 05470000 is a direct same-river live gauge a few miles downstream in the Ames corridor, and Skunk River Paddlers publishes a 125 cfs minimum recommendation for the above-Ames reach. The route intentionally does not claim an ideal or upper band."
    },
    "evidenceNotes": [
      {
        "label": "Official water trail",
        "value": "Soper's Mill #235 to Peterson Park West #233",
        "note": "Story County lists Soper's Mill Access at 56364 170th St. and Peterson Park West Access at 55310 180th St. as public South Skunk River Water Trail access points.",
        "sourceUrl": "https://www.storycountyiowa.gov/1496/South-Skunk-River-Water-Trail"
      },
      {
        "label": "Put-in access",
        "value": "Soper's Mill",
        "note": "Story County/MyCountyParks says Soper's Mill is a 16-acre historic site on the Skunk River with canoeing and kayaking, and the Travel Iowa listing describes the renovated access, parking, and concrete paths for paddle launches above or below the constructed riffle.",
        "sourceUrl": "https://www.mycountyparks.com/county/story/Park/Sopers-Mill"
      },
      {
        "label": "Take-out access",
        "value": "Peterson Park West",
        "note": "Story County lists Peterson Park West with boating, canoeing, kayaking, pond and river fishing, and Skunk River Water Trail Canoe Access.",
        "sourceUrl": "https://www.storycountyiowa.gov/Facilities/Facility/Details/Peterson-Park-West-40"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 05470000",
        "note": "USGS operates South Skunk River near Ames on the same river at W Riverside Road downstream of the route; Skunk River Paddlers lists this gauge as one of the relevant local South Skunk water-trail gauges.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05470000/"
      },
      {
        "label": "Minimum flow",
        "value": "About 125 cfs",
        "note": "Skunk River Paddlers says most paddlers consider the minimum recommended flow above Ames and Ioway Creek to be somewhere near 125 cfs, while lower flows may require stepping out in riffles.",
        "sourceUrl": "https://www.skunkriverpaddlers.org/skunk-river-water-trail"
      },
      {
        "label": "Route distance and skill",
        "value": "About 2.9 river miles",
        "note": "The Story County water-trail map places Soper's Mill and Peterson Park West about 2.9 river miles apart, and the brochure says trees and riffles make this stretch appropriate for paddlers with at least intermediate skill.",
        "sourceUrl": "https://storycountyiowa.gov/DocumentCenter/View/12558/South-Skunk-River-Water-Trail-2021"
      },
      {
        "label": "Access and shore-use caveat",
        "value": "Public water, private banks",
        "note": "Story County and Skunk River Paddlers both warn that the South Skunk is non-meandered and much adjoining land is private, so use only public accesses and confirmed public parkland for stops.",
        "sourceUrl": "https://www.storycountyiowa.gov/1496/South-Skunk-River-Water-Trail"
      }
    ],
    "sourceLinks": [
      {
        "label": "Story County South Skunk River Water Trail",
        "url": "https://www.storycountyiowa.gov/1496/South-Skunk-River-Water-Trail"
      },
      {
        "label": "Story County South Skunk map PDF",
        "url": "https://storycountyiowa.gov/DocumentCenter/View/12558/South-Skunk-River-Water-Trail-2021"
      },
      {
        "label": "Skunk River Paddlers water trail guidance",
        "url": "https://www.skunkriverpaddlers.org/skunk-river-water-trail"
      },
      {
        "label": "Story County Soper's Mill",
        "url": "https://www.mycountyparks.com/county/story/Park/Sopers-Mill"
      },
      {
        "label": "Story County Peterson Park West",
        "url": "https://www.storycountyiowa.gov/Facilities/Facility/Details/Peterson-Park-West-40"
      },
      {
        "label": "USGS 05470000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05470000/"
      }
    ]
  },
  {
    "id": "south-skunk-river-ames-13th-street",
    "slug": "south-skunk-river-ames-13th-street",
    "name": "South Skunk River",
    "reach": "Ames 13th Street Play Feature",
    "state": "Iowa",
    "region": "Central Iowa",
    "summary": "Compact South Skunk play-park session at the 13th Street mitigated low-head dam in North River Valley Park, with public City of Ames access and a direct Ames gauge.",
    "statusText": "Use the South Skunk River near Ames gauge. Treat 400+ cfs as the feature-specific play threshold from American Whitewater, and avoid low, high, or rising water unless you know the shallow rock channel well.",
    "latitude": 42.03535,
    "longitude": -93.59895,
    "routeType": "whitewater",
    "gaugeSource": {
      "id": "usgs-05470000",
      "provider": "usgs",
      "siteId": "05470000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "South Skunk River near Ames, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05470000/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "low_head_dam",
        "whitewater",
        "fast_rise"
      ],
      "safetyNotes": [
        "Mitigated low-head-dam play feature with shallow rocks and paddler-passage hydraulics; this is not a tubing or family-float route.",
        "American Whitewater notes shallow features and reports tubing is not advised; use whitewater skill and protective gear.",
        "High or rising water, muddy water, and debris can make the feature less forgiving."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 400,
      "thresholdSource": {
        "label": "American Whitewater South Skunk 13th Street play-feature guidance",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/11597/main",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "mixed",
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
      "seasonNotes": "The feature works best during high-water events rather than summer base flow. Because the channel is shallow and rock-lined, pair the gauge with same-day visual scouting and avoid tubing or casual floating through the feature.",
      "difficulty": "moderate",
      "difficultyNotes": "American Whitewater rates the reach I-II, but describes shallow play features where rolling carries impact risk. Treat this as a whitewater skills feature for boaters with helmets, PFDs, quick rolls, and good judgment, not as a beginner tubing chute.",
      "confidenceNotes": "Confidence is good for a guarded play-park add: City of Ames lists River Valley Park at 725 E 13th Street with boat access and public park amenities, Story County lists River Valley Park #227 as a South Skunk River Water Trail access with rock-riffle mitigation, American Whitewater documents the exact 13th Street mitigated low-head-dam feature and ties 400+ cfs to the South Skunk gauge, and USGS 05470000 is the direct same-river live gauge just upstream in Ames. The route stays minimum-only because public evidence gives a play threshold but not a broad ideal/high recreational ladder."
    },
    "evidenceNotes": [
      {
        "label": "Public park access",
        "value": "River Valley Park / 725 E 13th Street",
        "note": "The City of Ames lists River Valley Park at 725 E 13th Street with off-street parking, restrooms, and boat access.",
        "sourceUrl": "https://www.cityofames.org/My-Government/Departments/Parks-and-Recreation/Parks/River-Valley-Park"
      },
      {
        "label": "Water-trail access",
        "value": "River Valley Park #227",
        "note": "Story County lists River Valley Park as South Skunk River Water Trail Access #227 and notes rock-riffle construction at River Valley Park.",
        "sourceUrl": "https://www.storycountyiowa.gov/1496/South-Skunk-River-Water-Trail"
      },
      {
        "label": "Feature description",
        "value": "13th Street mitigated low-head dam",
        "note": "American Whitewater says the 2021 Iowa DNR mitigation converted the former dam into fish and paddler passage channels in North River Valley Park off 13th Street.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/11597/main"
      },
      {
        "label": "Play threshold",
        "value": "400+ cfs",
        "note": "American Whitewater says high-water events above 400 cfs on the South Skunk gauge, or river-right wall-gauge levels over 4 ft, produce surf, spin, and cartwheel opportunities.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/11597/main"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 05470000",
        "note": "USGS operates South Skunk River near Ames on the same river at W Riverside Road, upstream of the 13th Street feature in the Ames corridor.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05470000/"
      },
      {
        "label": "Hazard caveat",
        "value": "Shallow rock feature",
        "note": "American Whitewater cautions that the features are shallow and care should be taken when rolling; a user report specifically warns tubing is not advised at any level.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/11597/main"
      }
    ],
    "sourceLinks": [
      {
        "label": "City of Ames River Valley Park",
        "url": "https://www.cityofames.org/My-Government/Departments/Parks-and-Recreation/Parks/River-Valley-Park"
      },
      {
        "label": "Story County South Skunk River Water Trail",
        "url": "https://www.storycountyiowa.gov/1496/South-Skunk-River-Water-Trail"
      },
      {
        "label": "American Whitewater South Skunk 13th Street",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/11597/main",
        "provider": "american_whitewater"
      },
      {
        "label": "USGS 05470000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05470000/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "south-skunk-river-river-valley-cj-shreck",
    "slug": "south-skunk-river-river-valley-cj-shreck",
    "name": "South Skunk River",
    "reach": "River Valley Park to C.J. Shreck Access",
    "state": "Iowa",
    "region": "Central Iowa",
    "summary": "Lower Story County South Skunk water-trail day from Ames to the C.J. Shreck Access near Cambridge, using the direct Ames gauge and official access chain.",
    "statusText": "Use the South Skunk near Ames gauge. CanWePaddle estimates 100 to 1,500 cfs for Ames to Cambridge; scout dams, rock riffles, and fresh wood even when the gauge is inside range.",
    "latitude": 42.03535,
    "longitude": -93.59895,
    "gaugeSource": {
      "id": "usgs-05470000",
      "provider": "usgs",
      "siteId": "05470000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "South Skunk River near Ames, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05470000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "low_head_dam",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "Start below or downstream of the River Valley / 13th Street dam-mitigation feature unless the group has intentionally scouted the feature.",
        "Story County warns that sharp turns and other obstacles occur on many South Skunk sections and that dams in the Ames corridor require portage or careful route choice.",
        "The South Skunk is non-meandered through this corridor; use only signed public accesses and public parkland for stops."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 100,
      "idealMax": 1500,
      "tooLow": 100,
      "tooHigh": 1500,
      "thresholdSource": {
        "label": "CanWePaddle South Skunk Ames to Cambridge estimated range",
        "url": "https://canwepaddle.com/rivers/iowa/south-skunk-river-ames-to-cambridge/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "CanWePaddle identifies May through September as the normal season. Story County hazard notes and the low Ames gauge floor both make same-day wood and dam checks important after storms.",
      "difficulty": "moderate",
      "difficultyNotes": "CanWePaddle rates Ames to Cambridge Class I. The app keeps this as caution/moderate because the route passes the lower Ames access chain, constructed riffles, possible dam-portage decisions, private banks, and storm wood.",
      "confidenceNotes": "Confidence is good for a guarded lower-Story-County add: Story County lists River Valley Park #227, South 16th, 265th Street, Askew Bridge/Cambridge Pond, and C.J. Shreck #212 in order on the state-designated South Skunk River Water Trail; MyCountyParks confirms C.J. Shreck as a public canoe/kayak access; CanWePaddle ties Ames-to-Cambridge to the direct Ames USGS gauge with a 100-1,500 cfs range; and USGS Water Services returned current data during this run."
    },
    "evidenceNotes": [
      {
        "label": "Current gauge check",
        "value": "223 cfs / 3.85 ft at 2026-07-22 22:00 CDT",
        "note": "USGS Water Services returned current South Skunk near Ames discharge and stage during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05470000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold range",
        "value": "100-1,500 cfs",
        "note": "CanWePaddle ties the Ames-to-Cambridge section to USGS 05470000 and estimates a 100 to 1,500 cfs runnable window.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/south-skunk-river-ames-to-cambridge/"
      },
      {
        "label": "Official access chain",
        "value": "River Valley Park #227 to C.J. Shreck #212",
        "note": "Story County lists the lower Ames-to-Cambridge access sequence and identifies the South Skunk as a state-designated water trail with 11 access points.",
        "sourceUrl": "https://www.storycountyiowa.gov/1496/South-Skunk-River-Water-Trail"
      },
      {
        "label": "Take-out support",
        "value": "C.J. Shreck Access, 59627 Highway 210",
        "note": "MyCountyParks describes C.J. Shreck as a three-acre water-trail access on the Skunk River with stream fishing, canoeing, and kayaking.",
        "sourceUrl": "https://www.mycountyparks.com/county/story/Park/C-J-Shreck-Access"
      },
      {
        "label": "Hazards",
        "value": "Dams, sharp turns, obstacles, private banks",
        "note": "Story County and MyCountyParks warn about dam portages, sharp turns, obstacles, and private non-meandered banks on the water trail.",
        "sourceUrl": "https://www.mycountyparks.com/county/Story/Park/C-J-Shreck-Access/Activity/Canoeing-Kayaking"
      }
    ],
    "sourceLinks": [
      {
        "label": "CanWePaddle South Skunk Ames to Cambridge",
        "url": "https://canwepaddle.com/rivers/iowa/south-skunk-river-ames-to-cambridge/",
        "provider": "local"
      },
      {
        "label": "Story County South Skunk River Water Trail",
        "url": "https://www.storycountyiowa.gov/1496/South-Skunk-River-Water-Trail",
        "provider": "local"
      },
      {
        "label": "C.J. Shreck Access",
        "url": "https://www.mycountyparks.com/county/story/Park/C-J-Shreck-Access",
        "provider": "local"
      },
      {
        "label": "C.J. Shreck canoeing and kayaking",
        "url": "https://www.mycountyparks.com/county/Story/Park/C-J-Shreck-Access/Activity/Canoeing-Kayaking",
        "provider": "local"
      },
      {
        "label": "USGS 05470000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05470000/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "north-raccoon-river-squirrel-hollow-adkins",
    "slug": "north-raccoon-river-squirrel-hollow-adkins",
    "name": "North Raccoon River",
    "reach": "Squirrel Hollow Park to Adkins Bridge Access",
    "state": "Iowa",
    "region": "Central Iowa",
    "summary": "Short Greene County North Raccoon water-trail run from Squirrel Hollow to Adkins Bridge, with public county access, bluff-country scenery, and the direct Jefferson gauge.",
    "statusText": "Use the North Raccoon near Jefferson gauge. CanWePaddle estimates 150 to 2,000 cfs for the Jefferson-to-Cooper corridor; wood, rock dams, and private banks still require a same-day visual call.",
    "latitude": 41.9822,
    "longitude": -94.3192,
    "gaugeSource": {
      "id": "usgs-05482500",
      "provider": "usgs",
      "siteId": "05482500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "North Raccoon River near Jefferson, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05482500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks",
        "low_head_dam"
      ],
      "safetyNotes": [
        "Iowa DNR warns the Greene County North Raccoon has downed trees and log piles, especially on sharp bends.",
        "Stay alert for rock dams and fishing riffles in the broader water-trail corridor; portage if a feature is not clearly runnable.",
        "The North Raccoon is non-meandered. Use public accesses and marked public areas only; the banks and bed outside those areas may be private."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 150,
      "idealMax": 2000,
      "tooLow": 150,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "CanWePaddle North Raccoon Jefferson to Cooper estimated range",
        "url": "https://canwepaddle.com/rivers/iowa/north-raccoon-river-jefferson-to-cooper/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "CanWePaddle identifies May through September as the normal season. Spring runoff and summer storms can make the wooded bends pushy or newly obstructed.",
      "difficulty": "easy",
      "difficultyNotes": "This short split is Class I in normal water, but the app keeps a caution profile for wood, private-bank limits, fishing riffles, and the need to confirm Adkins Bridge access before launching.",
      "confidenceNotes": "Confidence is good for a short guarded split: Greene County documents Squirrel Hollow Park on the North Raccoon with canoeing, kayaking, camping, and the Adkins Bridge boat ramp 3.8 miles downstream; Iowa DNR Greene County water-trail materials identify Squirrel Hollow-to-Adkins inside the official bluff-country corridor and warn about private non-meandered banks and wood; CanWePaddle provides the direct Jefferson-gauge corridor range; and USGS Water Services returned current Jefferson data during this run."
    },
    "evidenceNotes": [
      {
        "label": "Current gauge check",
        "value": "243 cfs / 5.17 ft at 2026-07-22 22:15 CDT",
        "note": "USGS Water Services returned current North Raccoon near Jefferson discharge and stage during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05482500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold range",
        "value": "150-2,000 cfs",
        "note": "CanWePaddle ties the Jefferson-to-Cooper North Raccoon corridor to USGS 05482500 and estimates a 150 to 2,000 cfs runnable window.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/north-raccoon-river-jefferson-to-cooper/"
      },
      {
        "label": "Public endpoints",
        "value": "Squirrel Hollow Park to Adkins Bridge Access",
        "note": "Greene County / MyCountyParks says Squirrel Hollow offers canoeing and kayaking and that the Adkins Bridge boat ramp is 3.8 miles downstream.",
        "sourceUrl": "https://www.mycountyparks.com/county/greene/park/squirrel-hollow-park"
      },
      {
        "label": "Official corridor",
        "value": "Greene County North Raccoon bluff-country water trail",
        "note": "Iowa DNR water-trail material identifies the Squirrel Hollow to Adkins Bridge area inside the Greene County North Raccoon water-trail corridor.",
        "sourceUrl": "https://www.iowadnr.gov/media/8895/download?inline="
      },
      {
        "label": "Safety context",
        "value": "Wood, private banks, rock dams",
        "note": "Iowa DNR warns about downed trees and log piles, especially on sharp bends, and explains that land adjacent to and under this non-meandered river is private except at access sites and marked public areas.",
        "sourceUrl": "https://www.iowadnr.gov/media/8895/download?inline="
      }
    ],
    "sourceLinks": [
      {
        "label": "CanWePaddle North Raccoon Jefferson to Cooper",
        "url": "https://canwepaddle.com/rivers/iowa/north-raccoon-river-jefferson-to-cooper/",
        "provider": "local"
      },
      {
        "label": "Greene County Squirrel Hollow Park",
        "url": "https://www.mycountyparks.com/county/greene/park/squirrel-hollow-park",
        "provider": "local"
      },
      {
        "label": "Iowa DNR North Raccoon Greene County guide",
        "url": "https://www.iowadnr.gov/media/8895/download?inline=",
        "provider": "local"
      },
      {
        "label": "USGS 05482500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05482500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "middle-river-forest-park-schildberg",
    "slug": "middle-river-forest-park-schildberg",
    "name": "Middle River",
    "reach": "Middle River Forest Park to Schildberg Access",
    "state": "Iowa",
    "region": "Central Iowa",
    "summary": "Scenic first leg of the Middle River Water Trail from the Adair County trailhead to Schildberg, with limestone outcrops, riffles, chutes, and official access and flow guidance.",
    "statusText": "Use the Middle River near Indianola gauge as the official planning signal. Treat 600 to 900 cfs as the optimum Adair / Madison County window, and be conservative outside that band.",
    "latitude": 41.352351,
    "longitude": -94.281724,
    "gaugeSource": {
      "id": "usgs-05486490",
      "provider": "usgs",
      "siteId": "05486490",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Middle River near Indianola, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05486490/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 600,
      "idealMax": 900,
      "tooLow": 600,
      "tooHigh": 900,
      "thresholdSource": {
        "label": "Iowa DNR / Middle River Water Trail map optimum-flow note",
        "url": "https://www.iowadnr.gov/media/8713/download?inline="
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
      "seasonNotes": "Spring, early summer, and fall are the best planning windows. The route is explicitly sensitive to both low and high water, and storm debris can change bends and riffles quickly.",
      "difficulty": "moderate",
      "difficultyNotes": "County materials describe this as a moderately challenging paddle for experienced canoeists, with numerous bends, riffles, occasional chutes, and ledges. Treat the gauge band as a planning filter, not a substitute for scouting.",
      "confidenceNotes": "Confidence is good for a guarded official-source add: Adair County and Madison County identify Middle River Forest Park Access #89 and Schildberg Access #78 as public water-trail accesses, the Iowa DNR / county map publishes UTM coordinates and access details for both, and the same map directs paddlers to the Middle River Indianola USGS station with a 600-900 cfs optimum range for Adair and Madison counties. The gauge is downstream of this first leg, so the route remains conservative and calls out same-day scouting."
    },
    "evidenceNotes": [
      {
        "label": "Official route",
        "value": "Access #89 to Access #78",
        "note": "Adair County says Middle River Forest Park Access is the trailhead and that Schildberg Access is about 11 miles downstream.",
        "sourceUrl": "https://www.mycountyparks.com/county/Adair/Park/Middle-River-Forest-Area/Activity/Canoeing-Kayaking"
      },
      {
        "label": "Take-out support",
        "value": "Schildberg Access walk-down ramp",
        "note": "Madison County lists Schildberg Access on the north side of Highway 92 at the northeast bridge corner, with a walk-down canoe/kayak ramp near parking.",
        "sourceUrl": "https://www.madisoncountyparks.org/water-trail/"
      },
      {
        "label": "Optimum flow",
        "value": "600 to 900 cfs",
        "note": "The Middle River Water Trail map says optimum flow for Adair / Madison County is 600 to 900 cfs at the Indianola station and points paddlers to USGS real-time Middle River data.",
        "sourceUrl": "https://www.iowadnr.gov/media/8713/download?inline="
      },
      {
        "label": "Direct gauge",
        "value": "USGS 05486490",
        "note": "USGS operates Middle River near Indianola, IA, a downstream same-river station that the official water-trail map uses for the Adair / Madison County optimum-flow note.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05486490/"
      },
      {
        "label": "Endpoint coordinates",
        "value": "UTM access table",
        "note": "The Middle River Water Trail map publishes UTM coordinates and access types for Middle River Forest Park and Schildberg Access. The app stores the converted WGS84 access-area coordinates.",
        "sourceUrl": "https://www.iowadnr.gov/media/8713/download?inline="
      },
      {
        "label": "Hazards",
        "value": "Bends, riffles, chutes, ledges",
        "note": "Adair County describes this water-trail leg as moderately challenging, with numerous bends and riffles; Madison County adds that Middle River is especially challenging at high or low levels.",
        "sourceUrl": "https://www.madisoncountyparks.org/water-trail/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Adair County Middle River Forest Area canoeing",
        "url": "https://www.mycountyparks.com/county/Adair/Park/Middle-River-Forest-Area/Activity/Canoeing-Kayaking"
      },
      {
        "label": "Adair County Middle River Forest Area park page",
        "url": "https://www.mycountyparks.com/COUNTY/Adair/Park/Middle-River-Forest-Area.aspx"
      },
      {
        "label": "Madison County Middle River Water Trail",
        "url": "https://www.madisoncountyparks.org/water-trail/"
      },
      {
        "label": "Middle River Water Trail map PDF",
        "url": "https://www.iowadnr.gov/media/8713/download?inline="
      },
      {
        "label": "USGS 05486490 Middle River near Indianola",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05486490/"
      }
    ]
  },
  {
    "id": "middle-river-schildberg-roseman",
    "slug": "middle-river-schildberg-roseman",
    "name": "Middle River",
    "reach": "Schildberg Access to Roseman Covered Bridge Access",
    "state": "Iowa",
    "region": "Central Iowa",
    "summary": "Official Middle River Water Trail leg from Highway 92 to Roseman Covered Bridge, with timbered valleys, open pasture, scattered riffles, chutes, and a shale ledge above the P53 bridge.",
    "statusText": "Use the Middle River near Indianola gauge as the official planning signal. Treat 600 to 900 cfs as the optimum Adair / Madison County window, and be conservative outside that band.",
    "latitude": 41.31736,
    "longitude": -94.213296,
    "gaugeSource": {
      "id": "usgs-05486490",
      "provider": "usgs",
      "siteId": "05486490",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Middle River near Indianola, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05486490/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 600,
      "idealMax": 900,
      "tooLow": 600,
      "tooHigh": 900,
      "thresholdSource": {
        "label": "Iowa DNR / Middle River Water Trail map optimum-flow note",
        "url": "https://www.iowadnr.gov/media/8713/download?inline="
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
      "seasonNotes": "Spring, early summer, and fall are the best planning windows. The Madison County reach reacts to both rain and drought, so scout landings and riffles even when the downstream gauge is in the preferred band.",
      "difficulty": "moderate",
      "difficultyNotes": "Madison County describes this 7-mile leg as moderately challenging, with timbered valleys, open pasture, scattered chutes and riffles, and a shale ledge drop upstream of the P53 bridge.",
      "confidenceNotes": "Confidence is good for a guarded official-source add: Madison County names Schildberg Access #78 and Roseman Covered Bridge Access #71 as developed Middle River Water Trail accesses, the Iowa DNR / county map publishes UTM coordinates, distance, time, gradient, and access types for both, the same map gives a 600-900 cfs optimum band at the Indianola station, and USGS 05486490 is a direct same-river live gauge downstream."
    },
    "evidenceNotes": [
      {
        "label": "Official route",
        "value": "Access #78 to Access #71",
        "note": "Madison County says Roseman Covered Bridge Access is about 7 river miles downstream from Schildberg Access, through timbered valleys and open pasture.",
        "sourceUrl": "https://www.madisoncountyparks.org/water-trail/"
      },
      {
        "label": "Endpoint support",
        "value": "Schildberg and Roseman accesses",
        "note": "The Middle River Water Trail map lists Schildberg Access #78 and Roseman Access #71 with carry-down canoe access, surface type, distance to next access, gradient, estimated time, and UTM coordinates.",
        "sourceUrl": "https://www.iowadnr.gov/media/8713/download?inline="
      },
      {
        "label": "Optimum flow",
        "value": "600 to 900 cfs",
        "note": "The official map says optimum flow for Adair / Madison County is 600 to 900 cfs at the Indianola station and points paddlers to USGS real-time Middle River data.",
        "sourceUrl": "https://www.iowadnr.gov/media/8713/download?inline="
      },
      {
        "label": "Direct gauge",
        "value": "USGS 05486490",
        "note": "USGS operates Middle River near Indianola, IA, a downstream same-river station that the official water-trail map uses for the Adair / Madison County optimum-flow note.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05486490/"
      },
      {
        "label": "Hazards",
        "value": "Chutes, riffles, shale ledge",
        "note": "Madison County calls out a moderately challenging shale ledge a few hundred yards upstream of the P53 bridge, along with chutes and riffles across this reach.",
        "sourceUrl": "https://www.madisoncountyparks.org/water-trail/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Madison County Middle River Water Trail",
        "url": "https://www.madisoncountyparks.org/water-trail/"
      },
      {
        "label": "Middle River Water Trail map PDF",
        "url": "https://www.iowadnr.gov/media/8713/download?inline="
      },
      {
        "label": "USGS 05486490 Middle River near Indianola",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05486490/"
      }
    ]
  },
  {
    "id": "north-skunk-river-delta-sigourney",
    "slug": "north-skunk-river-delta-sigourney",
    "name": "North Skunk River",
    "reach": "Delta to Sigourney / South Skunk River Access",
    "state": "Iowa",
    "region": "Southeast Iowa",
    "summary": "Ten-mile North Skunk River water-trail run from Delta toward the Sigourney access corridor, using the direct North Skunk gauge near Sigourney and Iowa DNR Skunk River map support.",
    "statusText": "Use the North Skunk near Sigourney gauge. CanWePaddle estimates 100 to 1,500 cfs as the runnable range; expect wood, private banks, and a same-day take-out check near Sigourney.",
    "latitude": 41.323,
    "longitude": -92.329,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "access_uncertain",
        "private_banks",
        "cold_water"
      ],
      "safetyNotes": [
        "The DNR map confirms the North Skunk / Skunk River access corridor but not ramp-survey coordinates; verify the Delta launch and Sigourney take-out signage before committing.",
        "The Sigourney gauge is direct for the route corridor, but it cannot show new logjams, blocked bridge openings, or muddy access conditions.",
        "Use public accesses and road-right-of-way only where clearly signed. Treat rural banks as private unless posted public."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05472500",
      "provider": "usgs",
      "siteId": "05472500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "North Skunk River near Sigourney, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05472500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 100,
      "idealMax": 1500,
      "tooLow": 100,
      "tooHigh": 1500,
      "thresholdSource": {
        "label": "CanWePaddle North Skunk River Delta-to-Sigourney estimated range",
        "url": "https://canwepaddle.com/rivers/iowa/north-skunk-river-delta-to-sigourney/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "May through September is the published season. Spring rain can push the river out of the comfortable range, and late summer can expose shallow riffles or force dragging.",
      "difficulty": "easy",
      "difficultyNotes": "CanWePaddle rates the reach Class I. The app keeps it in caution because of rural access verification, wood, private banks, and limited mid-route bailout support.",
      "confidenceNotes": "Confidence is adequate but guarded: CanWePaddle documents the exact Delta-to-Sigourney reach, direct USGS gauge, distance, class, season, and range; Iowa DNR maps the North Skunk / Skunk River access corridor and named Sigourney access context. Endpoint coordinates are practical access-corridor anchors, so the route requires same-day access confirmation."
    },
    "evidenceNotes": [
      {
        "label": "Exact route and range",
        "value": "Delta to Sigourney, 10 miles, 100-1,500 cfs",
        "note": "CanWePaddle documents the North Skunk River Delta-to-Sigourney reach as a 10-mile Class I run tied to USGS 05472500 with a 100 to 1,500 cfs estimated runnable range.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/north-skunk-river-delta-to-sigourney/"
      },
      {
        "label": "Current gauge check",
        "value": "272 cfs / 5.07 ft at 2026-07-22 23:30 CDT",
        "note": "USGS Water Services returned current discharge and stage for North Skunk River near Sigourney during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05472500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Official access map",
        "value": "Iowa DNR Skunk River map",
        "note": "Iowa DNR maps the South Skunk / North Skunk corridor in Mahaska and Keokuk counties, including Delta, Sigourney, boat-ramp/fishing-access symbols, public recreation land, and dam-danger legend context.",
        "sourceUrl": "https://programs.iowadnr.gov/lakemanagement/LakeDocuments/maps/RSR92.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "CanWePaddle North Skunk Delta to Sigourney",
        "url": "https://canwepaddle.com/rivers/iowa/north-skunk-river-delta-to-sigourney/",
        "provider": "local"
      },
      {
        "label": "Iowa DNR Skunk River map",
        "url": "https://programs.iowadnr.gov/lakemanagement/LakeDocuments/maps/RSR92.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 05472500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05472500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "black-hawk-creek-hudson-waterloo",
    "slug": "black-hawk-creek-hudson-waterloo",
    "name": "Black Hawk Creek",
    "reach": "Franck Park to Ranchero Road",
    "state": "Iowa",
    "region": "Cedar Valley",
    "summary": "Tight, obstructed creek run from Hudson into Waterloo. Gauge range matters, but wood, portages, and technical maneuvering matter just as much.",
    "statusText": "Only consider this when Hudson is inside the published 100 to 500 cfs band. Even then, this is a skilled-creek call, not a casual yes.",
    "latitude": 42.40404,
    "longitude": -92.46443,
    "gaugeSource": {
      "id": "usgs-05463500",
      "provider": "usgs",
      "siteId": "05463500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Black Hawk Creek at Hudson, IA"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "low_head_dam",
        "strainers"
      ],
      "safetyNotes": [
        "Iowa DNR warns this tight creek commonly has strainers, sweepers, treefalls, logjams, and two fords that can behave like low-head dams at certain levels.",
        "Portages are not uncommon; skip the route if the group cannot scout, portage, and maneuver around fresh wood.",
        "Treat storm damage and fresh obstruction reports as more important than a good gauge reading."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 100,
      "idealMax": 500,
      "tooLow": 100,
      "tooHigh": 500,
      "thresholdSource": {
        "label": "Iowa DNR Black Hawk Creek Water Trail brochure",
        "url": "https://www.iowadnr.gov/Portals/idnr/uploads/riverprograms/watertrails/watertrail_blackhawk.pdf"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        4,
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "Warm-season paddling only. Recent storms can add fresh wood and strainers fast on this narrow creek.",
      "difficulty": "hard",
      "difficultyNotes": "The Iowa DNR brochure says this is not the best choice for novice paddlers. Expect strainers, deadfalls, portages, and tight maneuvering.",
      "confidenceNotes": "The 100 to 500 cfs range comes directly from an Iowa DNR brochure. Confidence is still capped by the creek itself, because new wood and obstructions can change the day even when the gauge is in range."
    },
    "evidenceNotes": [
      {
        "label": "Published flow range",
        "value": "100 to 500 cfs",
        "note": "Iowa DNR publishes this as the recommended range for safe and enjoyable paddling at the Hudson gauge.",
        "sourceUrl": "https://www.iowadnr.gov/Portals/idnr/uploads/riverprograms/watertrails/watertrail_blackhawk.pdf"
      },
      {
        "label": "Difficulty",
        "value": "Hard",
        "note": "The brochure explicitly says this is not the best choice for novice paddlers.",
        "sourceUrl": "https://www.iowadnr.gov/Portals/idnr/uploads/riverprograms/watertrails/watertrail_blackhawk.pdf"
      },
      {
        "label": "Primary hazards",
        "value": "Wood, strainers, and portages",
        "note": "The official water-trail brochure calls out frequent deadfalls, strainers, and two fords that can behave like low-head dam hazards.",
        "sourceUrl": "https://www.iowadnr.gov/Portals/idnr/uploads/riverprograms/watertrails/watertrail_blackhawk.pdf"
      },
      {
        "label": "Decision style",
        "value": "Conservative",
        "note": "A good gauge reading does not erase fresh storm damage. If you cannot scout and portage confidently, skip it."
      }
    ],
    "sourceLinks": [
      {
        "label": "Iowa DNR Black Hawk Creek Water Trail brochure",
        "url": "https://www.iowadnr.gov/Portals/idnr/uploads/riverprograms/watertrails/watertrail_blackhawk.pdf"
      },
      {
        "label": "USGS 05463500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05463500/"
      },
      {
        "label": "Cedar Valley Water Trails master plan notes",
        "url": "https://cedarvalleywatertrails.wordpress.com/master-plan/recommendations/hudson/"
      }
    ]
  },
  {
    "id": "shell-rock-river-renning-shell-rock",
    "slug": "shell-rock-river-renning-shell-rock",
    "name": "Shell Rock River",
    "reach": "Renning's Landing to Shell Rock Recreation Area",
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Short Butler County Shell Rock River float from Renning's Landing to Shell Rock Recreation Area, with county-managed boat/canoe access at both ends, a direct Shell Rock gauge, and a dam-aware take-out boundary.",
    "statusText": "Use the Shell Rock River at Shell Rock gauge. Treat 150 to 2,000 cfs as the guarded broader-corridor runnable range; below 150 cfs expect bony shallows, and above 2,000 cfs this short wooded reach is too pushy for a broad recommendation.",
    "latitude": 42.6996,
    "longitude": -92.6487,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "dam",
        "strainers",
        "fast_rise",
        "private_banks",
        "cold_water"
      ],
      "safetyNotes": [
        "Take out at Shell Rock Recreation Area before the in-town Shell Rock dam unless the group has a separate portage plan. Iowa Whitewater describes a river-left boat-ramp portage option but this app route ends at the park.",
        "The Shell Rock gauge sits in the take-out town corridor. High or rising water makes the short route faster and reduces recovery room above the dam boundary.",
        "Use the county-managed access points. Do not treat road shoulders, private banks, or residential yards as backup take-outs."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05462000",
      "provider": "usgs",
      "siteId": "05462000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Shell Rock River at Shell Rock, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05462000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 150,
      "idealMax": 2000,
      "tooLow": 150,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "CanWePaddle Shell Rock River Clarksville-to-Shell-Rock estimated range",
        "url": "https://canwepaddle.com/rivers/iowa/shell-rock-river-clarksville-to-shell-rock/",
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
      "seasonNotes": "May through September is the published core season. Low summer water can expose shallow riffles, while spring and storm runoff can push the gauge above the comfortable range quickly.",
      "difficulty": "easy",
      "difficultyNotes": "Butler County describes Renning's Landing to Shell Rock Recreation Area as a popular 5-mile float, making this easier and shorter than a full Clarksville-to-Shell-Rock day. The dam boundary, high-water current, and wood still require a conservative take-out plan.",
      "confidenceNotes": "Confidence is good for a guarded Iowa add: Butler County/MyCountyParks documents Renning's Landing as a boat ramp/canoe access and Shell Rock Recreation Area as a boat-ramp/canoe-access finish, with the exact 5-mile float between them. USGS 05462000 is a direct live same-river gauge at Shell Rock, while CanWePaddle publishes a route-corridor range for the broader Clarksville-to-Shell-Rock reach. The threshold is route-adjacent rather than exact to the 5-mile county float, so caveats emphasize visual checks and the downstream dam."
    },
    "evidenceNotes": [
      {
        "label": "County route support",
        "value": "Renning's Landing to Shell Rock Recreation Area, 5 river miles",
        "note": "Butler County says Renning's Landing is a good put-in for a 5-mile float to Shell Rock and that the float takes about 1.5 to 3 hours by canoe or kayak.",
        "sourceUrl": "https://www.mycountyparks.com/County/Butler/Park/Renning-Landing/Activity/Canoeing-Kayaking"
      },
      {
        "label": "Put-in support",
        "value": "Renning's Landing boat ramp and canoe access",
        "note": "MyCountyParks identifies Renning's Landing at 30207 205th Street as a two-acre area with limited fishing access, a boat ramp, and canoe access to the Shell Rock River.",
        "sourceUrl": "https://www.mycountyparks.com/county/Butler/Park/Renning-Landing"
      },
      {
        "label": "Take-out support",
        "value": "Shell Rock Recreation Area boat ramp",
        "note": "Butler County says Shell Rock Recreation Area has boat access for putting a canoe or kayak on or off the Shell Rock River, plus camping, restrooms, showers, and a shelter seasonally.",
        "sourceUrl": "https://www.mycountyparks.com/County/Butler/Park/Shell-Rock-Recreation-Area-and-Wildlife-Area/Activity/Canoeing-Kayaking"
      },
      {
        "label": "Published range",
        "value": "150 to 2,000 cfs",
        "note": "CanWePaddle publishes a 150 to 2,000 cfs estimated runnable range for the broader Clarksville-to-Shell-Rock Shell Rock River corridor using USGS 05462000.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/shell-rock-river-clarksville-to-shell-rock/"
      },
      {
        "label": "Current gauge check",
        "value": "2,250 cfs / 9.29 ft",
        "note": "USGS Water Services returned Shell Rock River at Shell Rock values of 2,250 cfs and 9.29 ft at 2026-07-22 18:45 CDT, above the selected broad recommendation ceiling.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05462000/"
      },
      {
        "label": "Dam boundary",
        "value": "Shell Rock dam near take-out town",
        "note": "Iowa Whitewater maps the Shell Rock dam at 42.711884, -92.582209 and says paddlers should take out before or at the boat ramp on river left to portage; this route ends at the park access rather than continuing over the dam.",
        "sourceUrl": "https://www.iowawhitewater.org/lhd/LHDshellrock.html"
      }
    ],
    "sourceLinks": [
      {
        "label": "Butler County Renning's Landing canoeing",
        "url": "https://www.mycountyparks.com/County/Butler/Park/Renning-Landing/Activity/Canoeing-Kayaking",
        "provider": "local"
      },
      {
        "label": "Butler County Shell Rock Recreation Area canoeing",
        "url": "https://www.mycountyparks.com/County/Butler/Park/Shell-Rock-Recreation-Area-and-Wildlife-Area/Activity/Canoeing-Kayaking",
        "provider": "local"
      },
      {
        "label": "CanWePaddle Shell Rock Clarksville to Shell Rock",
        "url": "https://canwepaddle.com/rivers/iowa/shell-rock-river-clarksville-to-shell-rock/",
        "provider": "local"
      },
      {
        "label": "USGS 05462000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05462000/",
        "provider": "usgs"
      },
      {
        "label": "Iowa Whitewater Shell Rock Dam",
        "url": "https://www.iowawhitewater.org/lhd/LHDshellrock.html",
        "provider": "local"
      }
    ]
  },
  {
    "id": "shell-rock-river-heery-woods-renning",
    "slug": "shell-rock-river-heery-woods-renning",
    "name": "Shell Rock River",
    "reach": "Heery Woods State Park to Renning's Landing",
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Missing Butler County Shell Rock connector from Heery Woods below the Clarksville dam corridor to Renning's Landing, using county access pages and the direct Shell Rock gauge.",
    "statusText": "Use the Shell Rock River at Shell Rock gauge. Treat 150 to 2,000 cfs as the guarded corridor range; launch only from a confirmed below-dam line at Heery Woods and avoid high or rising water.",
    "latitude": 42.7718,
    "longitude": -92.6732,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "low_head_dam",
        "strainers",
        "fast_rise",
        "private_banks",
        "cold_water"
      ],
      "safetyNotes": [
        "Heery Woods has a low-head dam and boat-ramp access above the dam. This route requires a confirmed below-dam launch or portage setup; do not launch above the dam and drift toward it.",
        "Renning's Landing is the planned take-out before the already-live Renning-to-Shell-Rock card continues downstream toward the Shell Rock dam corridor.",
        "The Shell Rock gauge is downstream of this connector. Use it for trend and broad flow, then make a visual access and wood check at Heery Woods before launching."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05462000",
      "provider": "usgs",
      "siteId": "05462000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Shell Rock River at Shell Rock, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05462000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 150,
      "idealMax": 2000,
      "tooLow": 150,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "CanWePaddle Shell Rock River Clarksville-to-Shell-Rock estimated range",
        "url": "https://canwepaddle.com/rivers/iowa/shell-rock-river-clarksville-to-shell-rock/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "May through September is the published core season for the broader Clarksville-to-Shell-Rock corridor. Spring runoff and storm rises can quickly make this dam-adjacent connector inappropriate.",
      "difficulty": "easy",
      "difficultyNotes": "The water is generally Class I once below the Heery Woods dam area, but launch discipline, wood, private banks, and downstream gauge distance make this a guarded connector rather than a casual park float.",
      "confidenceNotes": "Confidence is adequate for a conservative connector: Butler County documents Heery Woods North Side boat-ramp/canoe access and campground amenities, Butler County documents Renning's Landing access, CanWePaddle publishes the broader Clarksville-to-Shell-Rock direct-gauge range, and USGS 05462000 is live downstream. The dam-adjacent launch is the limiting factor, so the route explicitly requires a below-dam launch confirmation."
    },
    "evidenceNotes": [
      {
        "label": "Current gauge check",
        "value": "2,180 cfs / 9.25 ft at 2026-07-22 22:45 CDT",
        "note": "USGS Water Services returned current Shell Rock discharge and stage during this run, above the selected 2,000 cfs broad-recommendation ceiling.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05462000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold range",
        "value": "150-2,000 cfs",
        "note": "CanWePaddle ties the broader Clarksville-to-Shell-Rock reach to the direct Shell Rock USGS gauge and estimates a 150 to 2,000 cfs runnable range.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/shell-rock-river-clarksville-to-shell-rock/"
      },
      {
        "label": "Put-in support",
        "value": "Heery Woods State Park North Side boat ramp and canoe access",
        "note": "Butler County says the north side of Heery Woods has a boat ramp and canoe access, campground, restrooms, and showers; other county activity text notes the dam context.",
        "sourceUrl": "https://www.mycountyparks.com/County/Butler/Park/Heery-Woods-State-Park-North-Side"
      },
      {
        "label": "Take-out support",
        "value": "Renning's Landing boat ramp and canoe access",
        "note": "Butler County identifies Renning's Landing as a boat-ramp/canoe-access point on the Shell Rock River.",
        "sourceUrl": "https://www.mycountyparks.com/county/Butler/Park/Renning-Landing"
      }
    ],
    "sourceLinks": [
      {
        "label": "Butler County Heery Woods North Side",
        "url": "https://www.mycountyparks.com/County/Butler/Park/Heery-Woods-State-Park-North-Side",
        "provider": "local"
      },
      {
        "label": "Butler County Renning's Landing",
        "url": "https://www.mycountyparks.com/county/Butler/Park/Renning-Landing",
        "provider": "local"
      },
      {
        "label": "CanWePaddle Shell Rock Clarksville to Shell Rock",
        "url": "https://canwepaddle.com/rivers/iowa/shell-rock-river-clarksville-to-shell-rock/",
        "provider": "local"
      },
      {
        "label": "USGS 05462000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05462000/",
        "provider": "usgs"
      },
      {
        "label": "Iowa DNR Fish Iowa Shell Rock River",
        "url": "https://programs.iowadnr.gov/lakemanagement/FishIowa/RiverStreamDetails/RSR12",
        "provider": "local"
      }
    ]
  },
  {
    "id": "upper-iowa-river-kendallville-bluffton",
    "slug": "upper-iowa-river-kendallville-bluffton",
    "name": "Upper Iowa River",
    "reach": "Kendallville Park to Bluffton Fir Stand Access",
    "aliases": [
      "Upstream short variant of the consolidated Cattle Creek-to-Malanaphy family route",
      "Kendallville to Bluffton shorter day"
    ],
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Long Driftless day from Kendallville Park to the public Bluffton Fir Stand / W20 access, with clear water, bluff scenery, campground staging, and the direct Bluffton gauge at the take-out corridor.",
    "statusText": "Use the Upper Iowa River at Bluffton gauge. CanWePaddle estimates 100 to 1,200 cfs for Kendallville to Bluffton; below that expect scraping, and above it the long bluff-country day gets pushy.",
    "latitude": 43.44202,
    "longitude": -92.03809,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks",
        "cold_water"
      ],
      "safetyNotes": [
        "This is a long 11-to-16-mile planning day depending on source mileage and launch choice; keep daylight, shuttle timing, and group stamina conservative.",
        "The Upper Iowa can rise quickly after rain and carry fresh wood into blind bends and bluff-side current.",
        "Use Kendallville Park and the public Bluffton Fir Stand / W20 access for staging. Do not assume nearby private campground or outfitter landings are public without permission."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05387440",
      "provider": "usgs",
      "siteId": "05387440",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Upper Iowa River at Bluffton, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05387440/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 100,
      "idealMax": 1200,
      "tooLow": 100,
      "tooHigh": 1200,
      "thresholdSource": {
        "label": "CanWePaddle Upper Iowa Kendallville-to-Bluffton estimated range",
        "url": "https://canwepaddle.com/rivers/iowa/upper-iowa-river-kendallville-to-bluffton/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "CanWePaddle identifies May through September as the normal season. Heavy rain can raise current and wood risk quickly on this bluff-country run, and late-summer lows can expose riffles.",
      "difficulty": "moderate",
      "difficultyNotes": "CanWePaddle rates the reach Class I, but PaddleToday keeps it moderate because Kendallville-to-Bluffton is a long moving-water day with riffles, private-bank constraints, wood, cold shoulder-season water, and limited simple exits.",
      "confidenceNotes": "Confidence is good for a reactivated official access-pair card: CanWePaddle publishes a Kendallville-to-Bluffton range tied to the direct Bluffton gauge, the Upper Iowa River Paddler's Guide identifies Kendallville Park and Bluffton Fir Stand / W20 in the public access sequence, Winneshiek County supports Kendallville campground staging, and USGS Water Services returned current Bluffton data during this run. Mileage differs by source and launch convention, so route copy uses a conservative long-day posture."
    },
    "evidenceNotes": [
      {
        "label": "Threshold range",
        "value": "100-1,200 cfs",
        "note": "CanWePaddle ties Kendallville-to-Bluffton to USGS 05387440 at Bluffton and estimates 100 to 1,200 cfs as the runnable range.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/upper-iowa-river-kendallville-to-bluffton/"
      },
      {
        "label": "Route shape",
        "value": "Kendallville to Bluffton, long Driftless day",
        "note": "CanWePaddle describes Kendallville-to-Bluffton as an 11-mile Class I run, while the local access details support treating it as a long day with possible mileage variation by exact launch point.",
        "sourceUrl": "https://www.winneshiekwild.com/park-trail/upper-iowa-river"
      },
      {
        "label": "Kendallville staging",
        "value": "County park access and campground",
        "note": "The Winneshiek County paddlers guide lists Kendallville Park Access and campground support, which strengthens the upstream endpoint as a real staging access rather than just a dropped pin.",
        "sourceUrl": "https://www.winneshiekwild.com/wp-content/uploads/2019/12/Upper-Iowa-River-Paddlers-Guide-Web.pdf"
      },
      {
        "label": "Bluffton take-out support",
        "value": "Paddler guide access shown",
        "note": "The Upper Iowa River Paddler's Guide identifies Bluffton Fir Stand Access as a public access at the downstream end of this segment.",
        "sourceUrl": "https://www.winneshiekwild.com/wp-content/uploads/2019/12/Upper-Iowa-River-Paddlers-Guide-Web.pdf"
      },
      {
        "label": "Current gauge check",
        "value": "702 cfs / 4.42 ft at 2026-07-23 13:45 CDT",
        "note": "USGS Water Services returned current Upper Iowa River at Bluffton discharge and stage during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05387440&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Safety posture",
        "value": "Long day, private banks, fast rises",
        "note": "CanWePaddle and the route sources support a Class I access-pair route, but the app keeps caution copy for long mileage, swift post-rain current, wood, and private or permission-only banks away from public accesses."
      }
    ],
    "sourceLinks": [
      {
        "label": "CanWePaddle Upper Iowa Kendallville to Bluffton",
        "url": "https://canwepaddle.com/rivers/iowa/upper-iowa-river-kendallville-to-bluffton/",
        "provider": "local"
      },
      {
        "label": "USGS 05387440 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/05387440/",
        "provider": "usgs"
      },
      {
        "label": "Winneshiek County Upper Iowa River overview",
        "url": "https://www.winneshiekwild.com/park-trail/upper-iowa-river",
        "provider": "local"
      },
      {
        "label": "Iowa DNR Water Trails",
        "url": "https://www.iowadnr.gov/Places-to-Go/Water-Trails",
        "provider": "local"
      },
      {
        "label": "Winneshiek County Upper Iowa paddlers guide PDF",
        "url": "https://www.winneshiekwild.com/wp-content/uploads/2019/12/Upper-Iowa-River-Paddlers-Guide-Web.pdf",
        "provider": "local"
      }
    ]
  },
  {
    "id": "upper-iowa-river-malanaphy-trout-run",
    "slug": "upper-iowa-river-malanaphy-trout-run",
    "name": "Upper Iowa River",
    "reach": "Malanaphy Springs to Trout Run Park",
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Country-to-Decorah Upper Iowa day from the Malanaphy Springs / Bluffton Road access to Trout Run Park, with riffles, springs, city bluffs, and a direct Bluffton gauge low-water floor.",
    "statusText": "Use the Upper Iowa River at Bluffton gauge. Treat 125 cfs as the minimum to avoid a scrape-heavy day; 75 cfs was too low on the same route, and no trusted upper ceiling is published for this Decorah leg.",
    "latitude": 43.34508,
    "longitude": -91.843,
    "gaugeSource": {
      "id": "usgs-05387440",
      "provider": "usgs",
      "siteId": "05387440",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Upper Iowa River at Bluffton, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05387440/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 125,
      "thresholdSource": {
        "label": "Miles Paddled Upper Iowa River V minimum-flow note",
        "url": "https://milespaddled.com/upper-iowa-river-v/",
        "provider": "miles_paddled"
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
      "seasonNotes": "Spring through fall can work when the Bluffton gauge is above the scrape-prone floor. Summer lows expose riffles, while fresh rain can make the Decorah bends faster and can move new wood into bridge and park approaches.",
      "difficulty": "easy",
      "difficultyNotes": "Mostly easy Class I riffles at sensible levels, but the 11-mile distance, shallow ledges, city bridge approaches, private banks, and cold spring inflows make it more than a lazy park float.",
      "confidenceNotes": "Confidence is good for a guarded Iowa minimum-only add: Miles Paddled documents the exact Malanaphy Springs / Bluffton Road-to-Trout Run Park route, endpoint GPS points, route distance, and direct Bluffton-gauge observation; the Upper Iowa River Paddler's Guide names Malanaphy Springs Access, Chattahoochie Park Access, and Trout Run Park Access in the official Decorah corridor sequence; Travel Iowa confirms Trout Run Park has Upper Iowa River boat access and parking; and USGS 05387440 is a live same-river gauge in the route corridor. The app stays minimum-only because the exact-route source publishes a low-water floor but not a complete high-water ceiling."
    },
    "evidenceNotes": [
      {
        "label": "Published route report",
        "value": "Malanaphy Springs to Trout Run Park",
        "note": "Miles Paddled documents this as an 11-mile Upper Iowa River route from the Bluffton Road bridge / Malanaphy Springs access area to Trout Run Park in Decorah.",
        "sourceUrl": "https://milespaddled.com/upper-iowa-river-v/"
      },
      {
        "label": "Low-water floor",
        "value": "125 cfs",
        "note": "Miles Paddled ran the route at 75 cfs on the Bluffton gauge, called that too low to recommend, and says 125 cfs is the minimum to avoid the worst scraping.",
        "sourceUrl": "https://milespaddled.com/upper-iowa-river-v/"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 05387440",
        "note": "USGS operates Upper Iowa River at Bluffton, IA, a live same-river gauge in the same Bluffton-to-Decorah corridor and the gauge cited by the route report.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05387440/"
      },
      {
        "label": "Official access sequence",
        "value": "Malanaphy, Chattahoochie, Trout Run",
        "note": "The Upper Iowa River Paddler's Guide identifies Malanaphy Springs Access, Chattahoochie Park Access, and Trout Run Park Access in the downstream Decorah water-trail sequence.",
        "sourceUrl": "https://www.winneshiekwild.com/wp-content/uploads/2019/12/Upper-Iowa-River-Paddlers-Guide-Web.pdf"
      },
      {
        "label": "Take-out support",
        "value": "Trout Run Park boat access",
        "note": "Travel Iowa describes Trout Run Park on the east edge of Decorah, where Trout Run enters the Upper Iowa River, and says the park provides boat access and parking.",
        "sourceUrl": "https://www.traveliowa.com/places/trout-run-park/7638/"
      },
      {
        "label": "Access caveat",
        "value": "Limited Malanaphy parking",
        "note": "Miles Paddled describes the Malanaphy Springs / Bluffton Road river access as doable but muddy with limited parking, and suggests using the downstream Pole Line Road bridge if the small lot is full.",
        "sourceUrl": "https://milespaddled.com/upper-iowa-river-v/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Miles Paddled Upper Iowa River V",
        "url": "https://milespaddled.com/upper-iowa-river-v/",
        "provider": "miles_paddled"
      },
      {
        "label": "USGS 05387440 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05387440/",
        "provider": "usgs"
      },
      {
        "label": "Upper Iowa River Paddler's Guide",
        "url": "https://www.winneshiekwild.com/wp-content/uploads/2019/12/Upper-Iowa-River-Paddlers-Guide-Web.pdf",
        "provider": "local"
      },
      {
        "label": "Travel Iowa Trout Run Park",
        "url": "https://www.traveliowa.com/places/trout-run-park/7638/",
        "provider": "local"
      },
      {
        "label": "Visit Decorah Malanaphy Springs",
        "url": "https://visitdecorah.com/trail/malanaphy-springs/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "black-hawk-creek-ranchero-hope-martin",
    "slug": "black-hawk-creek-ranchero-hope-martin",
    "name": "Black Hawk Creek",
    "reach": "Ranchero Road to Hope Martin Park",
    "state": "Iowa",
    "region": "Cedar Valley",
    "summary": "Shorter Waterloo greenbelt reach with the same official Hudson gauge band as the upstream segment. Good flow is necessary, but wood and portages still decide the day.",
    "statusText": "Only consider this when Hudson is inside the official 100 to 500 cfs band. Even in range, expect deadfalls, scoutable bends, and possible portages.",
    "latitude": 42.45749,
    "longitude": -92.41535,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "low_head_dam",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "Iowa DNR describes Black Hawk Creek as a challenging paddle with frequent deadfalls, sweepers, and logjams; be ready to portage instead of forcing blind bends.",
        "The two creek fords can behave like low-head dams at some levels. Scout them from shore and portage if the line is not clearly safe.",
        "Use only mapped public access sites and public areas. Iowa DNR notes adjacent and underlying land outside those places is private on this non-meandered stream."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05463500",
      "provider": "usgs",
      "siteId": "05463500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Black Hawk Creek at Hudson, IA"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 100,
      "idealMax": 500,
      "tooLow": 100,
      "tooHigh": 500,
      "thresholdSource": {
        "label": "Iowa DNR Black Hawk Creek Water Trail brochure",
        "url": "https://www.iowadnr.gov/media/8882/download?inline"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        4,
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "Warm-season paddling only. Storm debris and fresh strainers can change this creek quickly even when the gauge is inside the official range.",
      "difficulty": "hard",
      "difficultyNotes": "Intermediate-to-hard creek style. The Iowa DNR brochure calls out frequent deadfalls, sweepers, and two ford hazards that can behave like low-head dams.",
      "confidenceNotes": "The 100 to 500 cfs band comes directly from Iowa DNR. Confidence is still capped by the creek itself, because new wood and tight bends can make an in-range day a bad decision."
    },
    "evidenceNotes": [
      {
        "label": "Published flow range",
        "value": "100 to 500 cfs",
        "note": "Iowa DNR publishes this as the recommended Hudson-gauge range for Black Hawk Creek paddling.",
        "sourceUrl": "https://www.iowadnr.gov/media/8882/download?inline"
      },
      {
        "label": "Difficulty",
        "value": "Intermediate creek run",
        "note": "The downstream Waterloo reach still carries portages, deadfalls, and wood-hazard decisions even though the mileage is shorter.",
        "sourceUrl": "https://www.iowadnr.gov/media/8882/download?inline"
      },
      {
        "label": "Primary hazards",
        "value": "Deadfalls, sweepers, and ford hazards",
        "note": "Hope Martin is easier to stage than longer creek runs, but the water-trail brochure still treats the reach as obstruction-heavy.",
        "sourceUrl": "https://www.iowadnr.gov/media/8882/download?inline"
      },
      {
        "label": "Decision style",
        "value": "Conservative",
        "note": "A good Hudson reading does not remove the need to scout blind corners and portage around fresh wood."
      }
    ],
    "sourceLinks": [
      {
        "label": "Iowa DNR Black Hawk Creek Water Trail brochure",
        "url": "https://www.iowadnr.gov/media/8882/download?inline"
      },
      {
        "label": "USGS 05463500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05463500/"
      },
      {
        "label": "OpenStreetMap Hope Martin Park reference",
        "url": "https://nominatim.openstreetmap.org/search?format=json&q=Hope%20Martin%20Park%2C%20Waterloo%2C%20IA"
      }
    ]
  },
  {
    "id": "upper-iowa-river-trout-run-lower-dam",
    "slug": "upper-iowa-river-trout-run-lower-dam",
    "name": "Upper Iowa River",
    "reach": "Trout Run Park to Lower Dam",
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Long Decorah-area Upper Iowa day where the main decision is still low water. This stays scenic and approachable above its floor, but the high side of the range is still not well defined.",
    "statusText": "Treat 150 cfs near Decorah as the low-water floor. Above that can work, but there is not yet a clear upper target or high-water cutoff for this reach.",
    "latitude": 43.29095,
    "longitude": -91.75879,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "dam",
        "mandatory_takeout",
        "strainers",
        "cold_water"
      ],
      "safetyNotes": [
        "Take out at Lower Dam access and do not approach the dam face. Miles Paddled warns the Lower Dam signage and take-out are easy to miss.",
        "Use the marked river-right portage around Upper Dam; the Trout Run-to-Lower Dam trip depends on completing this carry safely.",
        "Treat 150 cfs at Decorah as only a low-water floor. Low water can expose scraping and shoals, while no source-backed high-water cutoff exists for this reach."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05387500",
      "provider": "usgs",
      "siteId": "05387500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Upper Iowa River near Decorah, IA"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 150,
      "thresholdSource": {
        "label": "MilesPaddled Upper Iowa River VI minimum-flow note",
        "url": "https://milespaddled.com/upper-iowa-river-vi/"
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
      "seasonNotes": "Late spring through early fall is the normal window. This reach stays scenic through a longer season than tiny creeks, but low water still hurts trip quality first.",
      "difficulty": "easy",
      "difficultyNotes": "Generally beginner-friendly at workable levels, but distance, riffles, and the dam portage still make this a real day rather than a park float.",
      "confidenceNotes": "The only clear numeric threshold here is a low-water floor from paddler reports. The route itself is friendly, but there is still no published upper target or high-water cutoff for this full Decorah reach."
    },
    "evidenceNotes": [
      {
        "label": "Published minimum",
        "value": "150 cfs",
        "note": "MilesPaddled recommends at least about 150 cfs near Decorah to avoid a scrape-heavy day on this reach.",
        "sourceUrl": "https://milespaddled.com/upper-iowa-river-vi/"
      },
      {
        "label": "Trip length",
        "value": "13 miles",
        "note": "This is a long day trip. Even with easy current, low water and a dam portage change the decision more than a score alone might suggest.",
        "sourceUrl": "https://milespaddled.com/upper-iowa-river-vi/"
      },
      {
        "label": "Primary hazard",
        "value": "Upper Dam portage",
        "note": "Treat the Lower Dam finish as a dam-safety route, not just a long scenic float. Never approach the dam face in current.",
        "sourceUrl": "https://milespaddled.com/upper-iowa-river-vi/"
      },
      {
        "label": "Trout Run launch support",
        "value": "Decorah park-system canoe access",
        "note": "Decorah park materials show canoe access in the Trout Run / Ice Cave corridor, which materially improves confidence in the city-side launch.",
        "sourceUrl": "https://parks.decorahia.org/wp-content/uploads/2022/11/Parks-Trail-Guide.pdf"
      },
      {
        "label": "Lower Dam access support",
        "value": "Popular public access below Decorah",
        "note": "Iowa DNR Fish Iowa treats Lower Dam as a popular public access roughly 11 miles northeast of Decorah, which is stronger endpoint support than the old route notes alone.",
        "sourceUrl": "https://programs.iowadnr.gov/lakemanagement/FishIowa/RiverStreamDetails/RUI03"
      },
      {
        "label": "Difficulty",
        "value": "Easy",
        "note": "Comfortable for newer paddlers at workable levels if they are prepared for the mileage and portage."
      }
    ],
    "sourceLinks": [
      {
        "label": "MilesPaddled Upper Iowa River VI",
        "url": "https://milespaddled.com/upper-iowa-river-vi/"
      },
      {
        "label": "USGS 05387500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/05387500/"
      },
      {
        "label": "Iowa DNR Fish Iowa Upper Iowa above Decorah",
        "url": "https://programs.iowadnr.gov/lakemanagement/FishIowa/RiverStreamDetails/RUI96"
      },
      {
        "label": "Iowa DNR Fish Iowa Upper Iowa below Decorah",
        "url": "https://programs.iowadnr.gov/lakemanagement/FishIowa/RiverStreamDetails/RUI03"
      },
      {
        "label": "Decorah parks trail guide PDF",
        "url": "https://parks.decorahia.org/wp-content/uploads/2022/11/Parks-Trail-Guide.pdf"
      }
    ]
  },
  {
    "id": "wapsipinicon-river-independence-quasqueton",
    "slug": "wapsipinicon-river-independence-quasqueton",
    "name": "Wapsipinicon River",
    "reach": "Knott's Landing / Three Elms to Quasqueton Campground",
    "state": "Iowa",
    "region": "Eastern Iowa",
    "summary": "Popular Buchanan County Wapsi day from the Independence launches to Quasqueton, with Iron Bridge as a clean split point, sandbar stops, bluff scenery, and a direct Independence gauge.",
    "statusText": "Use the Wapsipinicon River at Independence gauge. Treat about 150 to 2,000 cfs as the guarded published runnable range; below that expect bony shallows, and above it the Wapsi becomes pushy and hazard-prone.",
    "latitude": 42.4576,
    "longitude": -91.8948,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "dam",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "This route starts below the Independence dam complex; do not launch upstream unless you have a separate portage plan.",
        "The Buchanan County water-trail guide warns that the Wapsi should not be paddled when it is quickly rising or near flood stage.",
        "Watch for rocks, logs, cutbank strainers, powerboats near Independence, and private banks outside public access points and legal sandbars."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05421000",
      "provider": "usgs",
      "siteId": "05421000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Wapsipinicon River at Independence, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05421000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 150,
      "idealMax": 2000,
      "tooLow": 150,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "CanWePaddle Wapsipinicon Independence-to-Quasqueton estimated range",
        "url": "https://canwepaddle.com/rivers/iowa/wapsipinicon-river-independence-to-quasqueton/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "May through September is the normal published season. Summer can be pleasant when the Independence gauge stays above the floor, but fast rises after rain should override the score.",
      "difficulty": "moderate",
      "difficultyNotes": "Class I moving water with long day mileage, sandbars, logs, and dam-adjacent logistics at Independence. Confident beginners can use it at moderate levels, but it is not a no-consequence town float.",
      "confidenceNotes": "Confidence is good for a guarded community-threshold add: Buchanan County / Iowa DNR water-trail material identifies Independence-to-Quasqueton as the most popular canoeing stretch and names the public launch options, Iron Bridge split, Quasqueton finish, hazards, and camping context; CanWePaddle publishes a route-specific Independence-gauge range; and USGS provides live same-river observations at the put-in city."
    },
    "evidenceNotes": [
      {
        "label": "Official route",
        "value": "Independence to Quasqueton",
        "note": "The Buchanan County Wapsipinicon River Water Trail guide calls Independence to Quasqueton the most popular canoeing stretch and says Iron Bridge can be used as a shorter put-in or take-out.",
        "sourceUrl": "https://northeastiowarcd.org/wp-content/uploads/wapsi-river-water-trail.pdf"
      },
      {
        "label": "Access options",
        "value": "Knott's Landing or Three Elms to Quasqueton",
        "note": "Buchanan County water-trail material says paddlers can start below Independence at Knott's Landing or Three Elms, both with parking and concrete ramps, and finish at the Quasqueton campground/river access corridor.",
        "sourceUrl": "https://cms4files1.revize.com/buchanancounty/Conservation/watertrail_wapsi.pdf"
      },
      {
        "label": "Published range",
        "value": "150 to 2,000 cfs",
        "note": "CanWePaddle publishes a route-specific estimated runnable range for Independence to Quasqueton using USGS 05421000.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/wapsipinicon-river-independence-to-quasqueton/"
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05421000 at 1,160 cfs / 5.90 ft",
        "note": "USGS Water Services returned Wapsipinicon River at Independence values of 1,160 cfs and 5.90 ft at 2026-07-22 17:30 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05421000/"
      },
      {
        "label": "Safety",
        "value": "Rising water, dams, rocks, and logs",
        "note": "The water-trail guide warns paddlers away from quickly rising or flood-stage water, stresses dam hazards, and tells paddlers to watch for rocks and logs just below the surface.",
        "sourceUrl": "https://northeastiowarcd.org/wp-content/uploads/wapsi-river-water-trail.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "Buchanan County Wapsipinicon River Water Trail PDF",
        "url": "https://northeastiowarcd.org/wp-content/uploads/wapsi-river-water-trail.pdf",
        "provider": "local"
      },
      {
        "label": "Buchanan County updated Wapsi Water Trail PDF",
        "url": "https://cms4files1.revize.com/buchanancounty/Conservation/watertrail_wapsi.pdf",
        "provider": "local"
      },
      {
        "label": "CanWePaddle Independence to Quasqueton",
        "url": "https://canwepaddle.com/rivers/iowa/wapsipinicon-river-independence-to-quasqueton/",
        "provider": "local"
      },
      {
        "label": "USGS 05421000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05421000/",
        "provider": "usgs"
      },
      {
        "label": "Independence Knott's Landing",
        "url": "https://www.independenceia.gov/facilities/facility/details/Knotts-Landing-20",
        "provider": "local"
      },
      {
        "label": "Quasqueton things to do",
        "url": "https://quasky.com/things-to-do",
        "provider": "local"
      }
    ]
  },
  {
    "id": "raccoon-river-van-meter-walnut-woods",
    "slug": "raccoon-river-van-meter-walnut-woods",
    "name": "Raccoon River",
    "reach": "Van Meter Access to Walnut Woods State Park",
    "state": "Iowa",
    "region": "Central Iowa",
    "summary": "Lower Raccoon greenbelt paddle from Van Meter into Walnut Woods, using the direct Van Meter gauge and keeping the take-out above the more urban Water Works dam corridor.",
    "statusText": "Use the Raccoon River at Van Meter gauge. Treat 300 to 5,000 cfs as the guarded published runnable range; below 300 cfs expect bony shallows, and above 5,000 cfs the lower Raccoon is too pushy for a broad recommendation.",
    "latitude": 41.5355,
    "longitude": -93.9557,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "whitewater",
        "strainers",
        "dam",
        "urban_water_quality",
        "private_banks"
      ],
      "safetyNotes": [
        "Take out at Walnut Woods for this route. Downstream Water Works and Scott Street dam logistics are separate urban-river hazards.",
        "Commerce Ledges at Walnut Woods can form challenging rapids at moderate to high flows; portage river right if the line is not clean.",
        "Expect wood, bridge current, fishing lines, private banks, and fast rises after rain in the metro watershed."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05484500",
      "provider": "usgs",
      "siteId": "05484500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Raccoon River at Van Meter, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05484500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 300,
      "idealMax": 5000,
      "tooLow": 300,
      "tooHigh": 5000,
      "thresholdSource": {
        "label": "CanWePaddle Raccoon River Van-Meter-to-Walnut-Woods estimated range",
        "url": "https://canwepaddle.com/rivers/iowa/raccoon-river-van-meter-to-walnut-woods/",
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
      "seasonNotes": "April through October is the published season. Summer low water can expose bony reaches; spring storms and urban runoff can push the river up quickly.",
      "difficulty": "moderate",
      "difficultyNotes": "Mostly flatwater and Class I current, but Commerce Ledges, high-water current, bridge zones, and the urban downstream dam corridor make take-out discipline important.",
      "confidenceNotes": "Confidence is good for a guarded community-threshold lower-Raccoon card: Iowa DNR / water-trail mapping names the Van Meter and Walnut Woods corridor, CanWePaddle publishes a direct Van Meter gauge range for this exact pair, ICON and Iowa DNR support Walnut Woods access/camping context, and USGS 05484500 sits at the put-in corridor."
    },
    "evidenceNotes": [
      {
        "label": "Official water trail",
        "value": "Van Meter to Walnut Woods corridor",
        "note": "Iowa DNR Raccoon River water-trail mapping names Van Meter and Walnut Woods State Park in the lower Raccoon access chain and calls out Commerce Ledges at Walnut Woods.",
        "sourceUrl": "https://media.rainpos.com/8576/cdo_raccoon_river_north_south_middle.pdf"
      },
      {
        "label": "Published range",
        "value": "300 to 5,000 cfs",
        "note": "CanWePaddle publishes a route-specific estimated runnable range for Van Meter to Walnut Woods using USGS 05484500.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/raccoon-river-van-meter-to-walnut-woods/"
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05484500 at 745 cfs / 3.28 ft",
        "note": "USGS Water Services returned Raccoon River at Van Meter values of 745 cfs and 3.28 ft at 2026-07-22 17:00 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05484500/"
      },
      {
        "label": "Take-out support",
        "value": "Walnut Woods State Park boat ramp and campground",
        "note": "Iowa DNR says visitors can launch from the west-end ramp at Walnut Woods and that canoe float trips are popular on the Raccoon River; ICON lists Walnut Woods as a Raccoon River access with campsites, restrooms, and parking.",
        "sourceUrl": "https://www.iowadnr.gov/places-go/state-parks/all-parks/walnut-woods-state-park"
      },
      {
        "label": "Hazard boundary",
        "value": "Commerce Ledges and downstream dams",
        "note": "The Iowa DNR guide says Commerce Ledges can be challenging at moderate to high flows and can be portaged river right; the same map labels downstream Water Works and Scott Street dams.",
        "sourceUrl": "https://media.rainpos.com/8576/cdo_raccoon_river_north_south_middle.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "Iowa DNR Raccoon River guide PDF",
        "url": "https://media.rainpos.com/8576/cdo_raccoon_river_north_south_middle.pdf",
        "provider": "local"
      },
      {
        "label": "CanWePaddle Van Meter to Walnut Woods",
        "url": "https://canwepaddle.com/rivers/iowa/raccoon-river-van-meter-to-walnut-woods/",
        "provider": "local"
      },
      {
        "label": "USGS 05484500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05484500/",
        "provider": "usgs"
      },
      {
        "label": "ICON Raccoon River access points",
        "url": "https://www.iconwatertrails.com/water-trails/raccoon-river/",
        "provider": "local"
      },
      {
        "label": "Iowa DNR Walnut Woods State Park",
        "url": "https://www.iowadnr.gov/places-go/state-parks/all-parks/walnut-woods-state-park",
        "provider": "local"
      }
    ]
  },
  {
    "id": "south-raccoon-river-redfield-van-meter",
    "slug": "south-raccoon-river-redfield-van-meter",
    "name": "South Raccoon River",
    "reach": "South Raccoon River Access to Van Meter Access",
    "state": "Iowa",
    "region": "Central Iowa",
    "summary": "Dallas County South Raccoon route from the Redfield-area access down through the confluence corridor to Van Meter, with riffles, sweepers, private-bank limits, and a direct Redfield gauge range.",
    "statusText": "Use the South Raccoon River at Redfield gauge. Treat 150 to 2,500 cfs as the guarded runnable range; below 150 cfs expect shallow bony water, and above 2,500 cfs the South Raccoon becomes too pushy for a broad recommendation.",
    "latitude": 41.58944,
    "longitude": -94.15111,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks",
        "dam",
        "urban_water_quality"
      ],
      "safetyNotes": [
        "Start below the Redfield dam influence from the South Raccoon River Access rather than improvising above any low-head-dam feature.",
        "Iowa DNR describes the Redfield-area Raccoon water-trail corridor as intermediate because frequent riffles and occasional sweepers occur even though access spacing is beginner-sized.",
        "The Van Meter finish is also the start of the lower Raccoon card. Do not drift past the planned take-out unless the group has separately planned the downstream Walnut Woods / Commerce Ledges route."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05484000",
      "provider": "usgs",
      "siteId": "05484000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "South Raccoon River at Redfield, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05484000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 150,
      "idealMax": 2500,
      "tooLow": 150,
      "tooHigh": 2500,
      "thresholdSource": {
        "label": "CanWePaddle South Raccoon River Redfield-to-Van-Meter estimated range",
        "url": "https://canwepaddle.com/rivers/iowa/south-raccoon-river-redfield-to-van-meter/",
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
      "seasonNotes": "April through October is the published season. Summer can scrape near the low floor, while spring rain and tiled agricultural runoff can raise the South Raccoon quickly.",
      "difficulty": "moderate",
      "difficultyNotes": "The route is mostly Class I moving water, but Dallas County/Iowa DNR materials call out riffles, sweepers, wood, and non-meandered private-bank constraints. Treat high water as a meaningful safety escalation.",
      "confidenceNotes": "Confidence is good for a guarded Iowa add: Dallas County documents the South Raccoon River Access and downstream water-trail access chain, Iowa DNR documents the Middle/South Raccoon water trail and Redfield-to-Van-Meter corridor, CanWePaddle publishes a route-specific Redfield gauge range, and USGS 05484000 is a direct live gauge at the upstream corridor. The app uses Van Meter as a clean existing public take-out anchor and does not include the downstream Walnut Woods leg."
    },
    "evidenceNotes": [
      {
        "label": "Public put-in support",
        "value": "South Raccoon River Access south of Redfield",
        "note": "Dallas County says the South Raccoon River Access is south of Redfield just off F-60 before the confluence, with a small carry-down gravel-pad access.",
        "sourceUrl": "https://www.dallascountyiowa.gov/332/Middle-South-Raccoon-River-Water-Trail"
      },
      {
        "label": "Official corridor support",
        "value": "Middle/South Raccoon River Water Trail",
        "note": "Travel Iowa describes the Middle/South Raccoon River Water Trail as two water trails in one with routes through Redfield and Van Meter, while the Iowa DNR guide documents the Redfield-area access chain and intermediate-skill riffle/sweeper context.",
        "sourceUrl": "https://www.traveliowa.com/trails/middle-raccoon-river-water-trail/87/"
      },
      {
        "label": "Published range",
        "value": "150 to 2,500 cfs",
        "note": "CanWePaddle publishes a route-specific estimated runnable range of 150 to 2,500 cfs for South Raccoon River Redfield to Van Meter using USGS 05484000.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/south-raccoon-river-redfield-to-van-meter/"
      },
      {
        "label": "Current gauge check",
        "value": "150 cfs / 2.57 ft",
        "note": "USGS Water Services returned South Raccoon River at Redfield values of 150 cfs and 2.57 ft at 2026-07-22 18:45 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05484000/"
      },
      {
        "label": "Take-out support",
        "value": "Van Meter Access",
        "note": "Van Meter is an existing app-vetted public Raccoon access and the start of the downstream Van-Meter-to-Walnut-Woods card; this route ends there rather than extending into the Commerce Ledges and Water Works dam boundary.",
        "sourceUrl": "https://www.iconwatertrails.com/water-trails/raccoon-river/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Dallas County Middle/South Raccoon River Water Trail",
        "url": "https://www.dallascountyiowa.gov/332/Middle-South-Raccoon-River-Water-Trail",
        "provider": "local"
      },
      {
        "label": "Iowa DNR Middle and South Raccoon River guide",
        "url": "https://www.iowadnr.gov/media/8897/download?inline=",
        "provider": "local"
      },
      {
        "label": "CanWePaddle South Raccoon Redfield to Van Meter",
        "url": "https://canwepaddle.com/rivers/iowa/south-raccoon-river-redfield-to-van-meter/",
        "provider": "local"
      },
      {
        "label": "USGS 05484000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05484000/",
        "provider": "usgs"
      },
      {
        "label": "ICON Raccoon River access points",
        "url": "https://www.iconwatertrails.com/water-trails/raccoon-river/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "north-raccoon-river-eureka-henderson",
    "slug": "north-raccoon-river-eureka-henderson",
    "name": "North Raccoon River",
    "reach": "Eureka Bridge Access to Henderson Park Access",
    "state": "Iowa",
    "region": "Central Iowa",
    "summary": "Short Greene County North Raccoon split between two county ramps west and south of Jefferson, with glacial bluffs, bank-swallow habitat, wood, and a direct same-corridor Jefferson gauge.",
    "statusText": "Use the North Raccoon near Jefferson gauge. Treat 150 cfs as a conservative low-water floor from the broader Jefferson-to-Cooper range and about 2,000 cfs as the guarded upper edge; source quality is route-adjacent, so make a visual call at Eureka.",
    "latitude": 42.0156,
    "longitude": -94.4384,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "whitewater",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "The DNR Greene County guide warns of downed trees, log piles, and a rock dam above Henderson Park Access.",
        "This short split is easier to manage than the full McMahon-to-Henderson route, but high or rising water can still turn bends and wood into serious hazards.",
        "Use the county ramps only. Most banks outside public areas should be treated as private."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05482500",
      "provider": "usgs",
      "siteId": "05482500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "North Raccoon River near Jefferson, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05482500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 150,
      "idealMax": 2000,
      "tooLow": 150,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "CanWePaddle North Raccoon Jefferson-to-Cooper estimated range",
        "url": "https://canwepaddle.com/rivers/iowa/north-raccoon-river-jefferson-to-cooper/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "May through September is the published season for the broader Jefferson corridor. This direct-gauge reach can drop into scratchy summer levels and can rise quickly after heavy rain.",
      "difficulty": "moderate",
      "difficultyNotes": "The mileage is short, but DNR describes dead trees, log piles, and rock-dam handling in this exact corridor. Treat it as a moving-water skills route, not a casual tube float.",
      "confidenceNotes": "Confidence is moderate: Greene County and Iowa DNR sources strongly support the Eureka-to-Henderson access pair and route hazards, and the Jefferson USGS gauge is direct and close. Threshold confidence is lower than the access story because the numeric range is published for the broader Jefferson-to-Cooper corridor rather than the exact Eureka-to-Henderson split, so the app copy stays guarded and visual-check oriented."
    },
    "evidenceNotes": [
      {
        "label": "Official route split",
        "value": "Eureka Bridge is the halfway split on McMahon-to-Henderson",
        "note": "The Iowa DNR Greene County North Raccoon guide says McMahon to Eureka to Henderson is 8.6 miles and can be broken into two shorter paddles at Eureka Bridge Access.",
        "sourceUrl": "https://www.iowadnr.gov/media/8895/download?inline="
      },
      {
        "label": "County endpoint support",
        "value": "Eureka Bridge 4.5 miles upstream of Henderson",
        "note": "Greene County MyCountyParks says Eureka Bridge Access provides boating access and is 4.5 miles upstream from Henderson Park; Henderson Park has a boat ramp developed for fishing, canoeing, and kayaking.",
        "sourceUrl": "https://www.mycountyparks.com/county/Greene/Park/Eureka-Bridge-Access"
      },
      {
        "label": "Published corridor range",
        "value": "150 to 2,000 cfs",
        "note": "CanWePaddle publishes an estimated range for the broader North Raccoon Jefferson-to-Cooper corridor using the same Jefferson gauge.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/north-raccoon-river-jefferson-to-cooper/"
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05482500 at 248 cfs / 5.18 ft",
        "note": "USGS Water Services returned North Raccoon River near Jefferson values of 248 cfs and 5.18 ft at 2026-07-22 17:15 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05482500/"
      },
      {
        "label": "Hazards",
        "value": "Downed trees, log piles, and Henderson rock dam",
        "note": "The Iowa DNR guide warns paddlers to use care around downed trees and log piles and when getting out at the rock dam above Henderson Park Access.",
        "sourceUrl": "https://www.iowadnr.gov/media/8895/download?inline="
      }
    ],
    "sourceLinks": [
      {
        "label": "Iowa DNR North Raccoon River Greene County guide",
        "url": "https://www.iowadnr.gov/media/8895/download?inline=",
        "provider": "local"
      },
      {
        "label": "Greene County Eureka Bridge Access",
        "url": "https://www.mycountyparks.com/county/Greene/Park/Eureka-Bridge-Access",
        "provider": "local"
      },
      {
        "label": "Greene County Henderson Park",
        "url": "https://www.mycountyparks.com/county/greene/Park/Henderson-Park",
        "provider": "local"
      },
      {
        "label": "CanWePaddle North Raccoon Jefferson to Cooper",
        "url": "https://canwepaddle.com/rivers/iowa/north-raccoon-river-jefferson-to-cooper/",
        "provider": "local"
      },
      {
        "label": "USGS 05482500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05482500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "wapsipinicon-river-state-park-newport-mills",
    "slug": "wapsipinicon-river-state-park-newport-mills",
    "name": "Wapsipinicon River",
    "reach": "Wapsipinicon State Park to Newport Mills",
    "state": "Iowa",
    "region": "Eastern Iowa",
    "summary": "Scenic Jones County day trip with bluff scenery, some riffles, and a very clear quality question: is the Anamosa gauge safely above the scrape floor?",
    "statusText": "Treat 4.77 ft at Anamosa as the bare low-water floor. Around 5.0 to 5.25 ft looks like the better target, but the app stays conservative above the minimum because a high-water ceiling is not yet well sourced.",
    "latitude": 42.09819,
    "longitude": -91.28755,
    "gaugeSource": {
      "id": "usgs-05421740",
      "provider": "usgs",
      "siteId": "05421740",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Wapsipinicon River at Anamosa, IA"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 4.77,
      "thresholdSource": {
        "label": "MilesPaddled Wapsipinicon River minimum-flow note",
        "url": "https://milespaddled.com/wapsipinicon-river/"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        4,
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "Late spring through early fall is the practical window. This stretch stays pretty through summer, but lower water quickly turns riffles into scraping.",
      "difficulty": "easy",
      "difficultyNotes": "Quietwater with some riffles. The route is friendly for newer paddlers when levels are workable, but it is still a 9-mile moving-water day.",
      "confidenceNotes": "The direct gauge and public access are solid. The best numeric support today is a low-water floor plus an ideal note from one detailed trip report, not a published upper range."
    },
    "evidenceNotes": [
      {
        "label": "Published minimum",
        "value": "4.77 ft",
        "note": "MilesPaddled treats the trip-day Anamosa reading as the lowest recommended level and advises against going below it.",
        "sourceUrl": "https://milespaddled.com/wapsipinicon-river/"
      },
      {
        "label": "Better target",
        "value": "5.0 to 5.25 ft",
        "note": "The same source says 5.0 to 5.25 ft would be the more ideal band for avoiding frequent scraping.",
        "sourceUrl": "https://milespaddled.com/wapsipinicon-river/"
      },
      {
        "label": "Route shape",
        "value": "9 miles with some riffles",
        "note": "This is an easy scenic day trip, not a flat impoundment float. Expect riffles and bluff scenery almost immediately below the park.",
        "sourceUrl": "https://milespaddled.com/wapsipinicon-river/"
      },
      {
        "label": "Public access confirmed",
        "value": "State-park put-in and county access take-out",
        "note": "Jones County maintains a dedicated Newport Mills Access page with hours and directions, and county programming explicitly uses this exact Wapsipinicon State Park to Newport Mills shuttle.",
        "sourceUrl": "https://www.mycountyparks.com/County/Jones/Park/Newport-Mills-Access"
      }
    ],
    "sourceLinks": [
      {
        "label": "Iowa DNR Wapsipinicon State Park",
        "url": "https://www.iowadnr.gov/places-go/state-parks/all-parks/wapsipinicon-state-park"
      },
      {
        "label": "Jones County Newport Mills Access",
        "url": "https://www.mycountyparks.com/County/Jones/Park/Newport-Mills-Access"
      },
      {
        "label": "Jones County Wapsipinicon State Park boat ramp",
        "url": "https://www.mycountyparks.com/County/Jones/Park/Wapsipinicon-State-Park-Anamosa-Boat-Ramp"
      },
      {
        "label": "Jones County Paddling the Wapsi event route note",
        "url": "https://www.mycountyparks.com/county/jones/park/central-park/events/20918/Paddling-the-Wapsi.aspx?DisplayMode=PrinterFriendly"
      },
      {
        "label": "USGS 05421740 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/05421740/"
      },
      {
        "label": "MilesPaddled Wapsipinicon River",
        "url": "https://milespaddled.com/wapsipinicon-river/"
      }
    ]
  },
  {
    "id": "maquoketa-river-canton-royertown",
    "slug": "maquoketa-river-canton-royertown",
    "name": "Maquoketa River",
    "reach": "Canton Bridge Access to Royertown Bridge Access",
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Scenic Jackson County water-trail run from Canton through the Buzzard Ridge bluff corridor to Royertown, with clear gravel shallows, steady current, limestone scenery, and a direct Maquoketa gauge ladder.",
    "statusText": "Use the Maquoketa River near Maquoketa gauge. Treat 701 to 1,000 cfs as the best target, below 500 cfs as too low for enjoyable paddling, and 2,001+ cfs as very high and pushy.",
    "latitude": 42.16279,
    "longitude": -90.891807,
    "gaugeSource": {
      "id": "usgs-05418500",
      "provider": "usgs",
      "siteId": "05418500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Maquoketa River near Maquoketa, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05418500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 701,
      "idealMax": 1000,
      "tooLow": 500,
      "tooHigh": 2001,
      "thresholdSource": {
        "label": "Wisconsin River Trips Maquoketa River Canton-to-Royertown gauge ladder",
        "url": "https://www.wisconsinrivertrips.com/segments/maquoketa-river/buzzard-ridge-wildlife-area",
        "provider": "wisconsin_river_trips"
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
      "seasonNotes": "Spring and post-rain windows are the most reliable for depth and current. WRT found 620 cfs paddleable but low, so dry late-summer periods can mean grounding in gravel shallows.",
      "difficulty": "easy",
      "difficultyNotes": "This is generally a beginner-friendly moving-water trip with steady current and no major rapids or dams on the route, but wind, low-water grounding, and pushier high water still matter.",
      "confidenceNotes": "Confidence is good for an Iowa community-source add: Jackson County/MyCountyParks identifies Canton Bridge Access and Royertown Bridge Access as public Maquoketa River Water Trail accesses, Iowa DNR documents a guided Canton-to-Royertown dedication paddle, Wisconsin River Trips documents the exact Canton County Park-to-50th Ave/Royertown trip and publishes a Maquoketa-gauge ladder, and USGS 05418500 is a direct same-river gauge downstream near Maquoketa. Coordinates are from named topo/monitoring-location context rather than an official county coordinate table, so paddlers should still follow posted access signs at both bridge landings."
    },
    "evidenceNotes": [
      {
        "label": "Official water-trail access",
        "value": "Canton Bridge and Royertown Bridge",
        "note": "Jackson County/MyCountyParks lists Canton Bridge Access at County Road E17 and Royertown Bridge Access at County Road Y34 as South Fork Maquoketa River Water Trail access points with wayfinding signage.",
        "sourceUrl": "https://www.mycountyparks.com/County/Jackson/Park/Maquoketa-River-Water-Trail"
      },
      {
        "label": "DNR-backed route event",
        "value": "Canton to Royertown Access",
        "note": "Iowa DNR announced the Maquoketa and North Fork Maquoketa Water Trail dedication at Canton County Park and described an optional guided paddle from Canton to Royertown Access with Jackson County Conservation shuttle support.",
        "sourceUrl": "https://www.iowadnr.gov/event/2023-05-16/maquoketa-north-fork-maquoketa-water-trail-dedicated-may-31"
      },
      {
        "label": "Published route report",
        "value": "Canton County Park to 50th Ave",
        "note": "Wisconsin River Trips documents the Canton County Park to 50th Ave route, identifying 50th Ave as Royertown Canoe Access / Water Trail Access #45 and describing both endpoints as public accesses.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/maquoketa-river/buzzard-ridge-wildlife-area"
      },
      {
        "label": "Target range",
        "value": "701 to 1,000 cfs",
        "note": "Wisconsin River Trips describes 701 to 1,000 cfs on the Maquoketa near Maquoketa gauge as an average fall depth and good target range.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/maquoketa-river/buzzard-ridge-wildlife-area"
      },
      {
        "label": "Low-water floor",
        "value": "500 cfs",
        "note": "The same WRT ladder treats less than 500 cfs as likely too low for enjoyable paddling and 501 to 700 cfs as mostly okay but with grounding risk.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/maquoketa-river/buzzard-ridge-wildlife-area"
      },
      {
        "label": "High-water ceiling",
        "value": "2,001+ cfs",
        "note": "WRT treats 2,001+ cfs as very high, pushy, dirty water that may be beyond enjoyable paddling on this route.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/maquoketa-river/buzzard-ridge-wildlife-area"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 05418500",
        "note": "USGS operates Maquoketa River near Maquoketa, IA downstream on the same river, and WRT uses this gauge for the Canton-to-Royertown route ladder.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05418500/"
      },
      {
        "label": "Endpoint coordinates",
        "value": "Canton County Park 42.1627901, -90.8918068; Royertown 42.1198989, -90.8283040",
        "note": "Canton coordinates come from the named Canton County Park topo feature. Royertown coordinates come from the Water Quality Portal site named AWARE 13 Royerton Bridge Access Maquoketa River, matching the county-listed Royertown Bridge Access.",
        "sourceUrl": "https://www.waterqualitydata.us/provider/STORET/IOWATER/IOWATER-949023/"
      },
      {
        "label": "Hazards",
        "value": "Low spots, wind, high-water push",
        "note": "WRT reports no major logjams, dams, or rapids on the route, but notes low-water grounding risk, open stretches exposed to wind, and stronger push at very high flows.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/maquoketa-river/buzzard-ridge-wildlife-area"
      }
    ],
    "sourceLinks": [
      {
        "label": "Jackson County Maquoketa River Water Trail",
        "url": "https://www.mycountyparks.com/County/Jackson/Park/Maquoketa-River-Water-Trail",
        "provider": "local"
      },
      {
        "label": "Iowa DNR Maquoketa water-trail dedication",
        "url": "https://www.iowadnr.gov/event/2023-05-16/maquoketa-north-fork-maquoketa-water-trail-dedicated-may-31",
        "provider": "local"
      },
      {
        "label": "Wisconsin River Trips Maquoketa River - Buzzard Ridge",
        "url": "https://www.wisconsinrivertrips.com/segments/maquoketa-river/buzzard-ridge-wildlife-area",
        "provider": "wisconsin_river_trips"
      },
      {
        "label": "USGS 05418500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05418500/",
        "provider": "usgs"
      },
      {
        "label": "Water Quality Portal Royerton Bridge Access",
        "url": "https://www.waterqualitydata.us/provider/STORET/IOWATER/IOWATER-949023/",
        "provider": "local"
      },
      {
        "label": "Canton County Park topo feature",
        "url": "https://www.anyplaceamerica.com/directory/ia/jackson-county-19097/parks/canton-county-park-1825090/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "volga-river-klocks-island-heron-road",
    "slug": "volga-river-klocks-island-heron-road",
    "name": "Volga River",
    "reach": "Klock's Island Park to Heron Road Access",
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Upper-Volga route from Fayette's Klock's Island Park into Volga River State Recreation Area, with clear water, frequent Class I riffles, limestone bluffs, and a guarded Littleport gauge minimum.",
    "statusText": "Use the Volga River at Littleport gauge as the best live same-river signal. Treat about 5.0 ft as the practical floor for this shallow upper route; 5.5 ft had strong same-route support, but no trusted upper band is published.",
    "latitude": 42.84288,
    "longitude": -91.81917,
    "gaugeSource": {
      "id": "usgs-05412400",
      "provider": "usgs",
      "siteId": "05412400",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Volga River at Littleport, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05412400/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 5,
      "thresholdSource": {
        "label": "Miles Paddled Volga River Fayette-to-Heron Road level note",
        "url": "https://milespaddled.com/volga-river/",
        "provider": "miles_paddled"
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
      "seasonNotes": "Spring and timely post-rain windows are best. Miles Paddled calls the upper Volga shallow and hard to catch with enough water, and Iowa DNR says spring trail crossings in the state recreation area can be impassable, so same-day level and weather checks matter.",
      "difficulty": "moderate",
      "difficultyNotes": "Mostly Class I riffles, but this is an intermediate small-river run because the channel is narrow, shallow, swift in spots, and strainer-prone near Heron Road. The last mile can be skipped by using the easier state-park picnic-area access if conditions look messy.",
      "confidenceNotes": "Confidence is good for a guarded Iowa minimum-only add: Klock's Island Park has public kayak/canoe access to the Volga River, Iowa DNR confirms Volga River State Recreation Area river access points and a kayak/canoe float corridor through the park, Miles Paddled documents the exact Klock's Island-to-Heron Road route with endpoint GPS points and a Littleport gauge observation, and USGS 05412400 is a direct same-river live gauge downstream. The app stays minimum-only because the best source gives a low-water floor and one strong observed level, not a complete upper-Volga ideal/high ladder."
    },
    "evidenceNotes": [
      {
        "label": "Public put-in",
        "value": "Klock's Island Park",
        "note": "Klock's Island Park in Fayette lists an access point to the Volga River for kayaks, canoes, and tubes; Miles Paddled uses it as the exact put-in and gives launch coordinates.",
        "sourceUrl": "https://www.camping.org/campgrounds/iowa/fayette/klocks-island-park"
      },
      {
        "label": "Public take-out",
        "value": "Heron Road / Volga River Access",
        "note": "Miles Paddled describes a dedicated but not conspicuous Heron Road landing on river left downstream of the bridge, and the named Volga River Access topo feature sits in the same Heron Road corridor.",
        "sourceUrl": "https://milespaddled.com/volga-river/"
      },
      {
        "label": "State recreation area context",
        "value": "Marked river access points",
        "note": "Iowa DNR says the Volga River meanders through the southern part of Volga River State Recreation Area, provides a kayak/canoe float trip through timber and rock outcrops, and has marked, easily accessible river access points.",
        "sourceUrl": "https://www.iowadnr.gov/media/6641/download?inline="
      },
      {
        "label": "Route-specific level",
        "value": "5.5 ft / 380 cfs observed",
        "note": "Miles Paddled reports the Fayette-to-Heron Road route at 5.5 ft / 380 cfs on the Littleport gauge and recommends that level for this shallow upper-Volga section.",
        "sourceUrl": "https://milespaddled.com/volga-river/"
      },
      {
        "label": "Low-water floor",
        "value": "About 5.0 ft",
        "note": "The same route report says below 5 ft will invite scraping and below 4.5 ft would be a fool's errand, so the app uses 5.0 ft as a conservative minimum-only floor.",
        "sourceUrl": "https://milespaddled.com/volga-river/"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 05412400",
        "note": "USGS operates Volga River at Littleport, IA on the same river downstream of the upper-Volga route, with current discharge and gage-height observations.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05412400/"
      },
      {
        "label": "Endpoint coordinates",
        "value": "Klock's Island 42.84288, -91.81917; Heron Road 42.86453, -91.74071",
        "note": "Miles Paddled publishes GPS points for both endpoints; the Heron Road coordinate is corroborated by the named Volga River Access topo feature at 42.8680364, -91.7418258.",
        "sourceUrl": "https://www.topozone.com/iowa/fayette-ia/locale/volga-river-access/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Miles Paddled Volga River",
        "url": "https://milespaddled.com/volga-river/",
        "provider": "miles_paddled"
      },
      {
        "label": "Klock's Island Park",
        "url": "https://www.camping.org/campgrounds/iowa/fayette/klocks-island-park",
        "provider": "local"
      },
      {
        "label": "Iowa DNR Volga River State Recreation Area",
        "url": "https://www.iowadnr.gov/places-go/state-parks/all-parks/volga-river-state-recreation-area",
        "provider": "local"
      },
      {
        "label": "Iowa DNR Volga River State Recreation Area map",
        "url": "https://www.iowadnr.gov/media/6641/download?inline=",
        "provider": "local"
      },
      {
        "label": "USGS 05412400 Volga River at Littleport",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05412400/",
        "provider": "usgs"
      },
      {
        "label": "Volga River Access topo feature",
        "url": "https://www.topozone.com/iowa/fayette-ia/locale/volga-river-access/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "volga-river-osborne-mederville",
    "slug": "volga-river-osborne-mederville",
    "name": "Volga River",
    "reach": "Osborne Canoe Access to Mederville Canoe Access",
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Short lower-Volga day from Clayton County's Osborne Canoe Access to the hidden Mederville landing, with clear water, gravel bars, easy Class I riffles, and a direct Littleport gauge ladder.",
    "statusText": "Use the Volga River at Littleport gauge. Treat about 4.4 to 4.9 ft as the broad target, below 4.1 ft as too shallow, and 5.4+ ft as high enough for experienced paddlers only.",
    "latitude": 42.7897657,
    "longitude": -91.442417,
    "gaugeSource": {
      "id": "usgs-05412400",
      "provider": "usgs",
      "siteId": "05412400",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Volga River at Littleport, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05412400/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 4.4,
      "idealMax": 4.9,
      "tooLow": 4.1,
      "tooHigh": 5.4,
      "thresholdSource": {
        "label": "Wisconsin River Trips Volga River Osborne gauge-height ladder",
        "url": "https://www.wisconsinrivertrips.com/segments/volga-river/osborne",
        "provider": "wisconsin_river_trips"
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
      "seasonNotes": "Spring and fall give the best mix of clarity and exposed rock. Dry summer spells can make the riffles scrape-prone, while rain can quickly make the Mederville gorge, low branches, and steep take-out more consequential.",
      "difficulty": "easy",
      "difficultyNotes": "At normal levels this is mostly easy moving water with several light Class I riffles. The practical difficulty comes from hidden access roads, steep banks, and the need to identify the Mederville take-out before the downstream gorge continues.",
      "confidenceNotes": "Confidence is good for a guarded Iowa community-source add: Clayton County Conservation lists Osborne Canoe Access as a county-managed area, Wisconsin River Trips documents the Osborne/Hwy 13-to-Mederville route, access details, hazards, and Littleport gauge-height ladder, USGS 05412400 is a direct same-river live gauge downstream at Littleport, and Water Quality Portal/Iowa DNR records support the Mederville access coordinates. The route uses Osborne Canoe Access rather than the rougher Hwy 13 bridge launch because the county-managed landing is cleaner public-access evidence."
    },
    "evidenceNotes": [
      {
        "label": "Published route report",
        "value": "Osborne to Mederville, about 4.8 to 5.3 miles",
        "note": "Wisconsin River Trips documents the lower-Volga route from Hwy 13 / Osborne Park Landing to Mederville Canoe Access, including clear water, gravel bars, several Class I riffles, and a scenic Mederville gorge finish.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/volga-river/osborne"
      },
      {
        "label": "County access support",
        "value": "Osborne Canoe Access",
        "note": "Clayton County Conservation's annual report lists Osborne Canoe Access at 29576 Hwy 13 as a county-managed area with canoe, fishing, and restroom amenities.",
        "sourceUrl": "https://www.claytoncountyconservation.org/_files/ugd/155093_74badccc039042c9b23261221c12324e.pdf"
      },
      {
        "label": "Target range",
        "value": "4.4 to 4.9 ft",
        "note": "The Osborne route ladder treats 4.4 to 4.6 ft as shallow but fine, 4.7 to 4.9 ft as above average but okay, and uses the same Littleport gauge as the downstream Mederville route.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/volga-river/osborne"
      },
      {
        "label": "Low and high cutoffs",
        "value": "<4.1 ft / 5.4+ ft",
        "note": "The route ladder says less than 4.1 ft is likely too shallow, 5.4 to 5.8 ft is high and perhaps experienced-only, and 5.9 ft and higher is very high / expert-only.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/volga-river/osborne"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 05412400",
        "note": "USGS operates Volga River at Littleport, IA on the same river downstream of the route, with current discharge and gage-height observations.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05412400/"
      },
      {
        "label": "Take-out coordinate support",
        "value": "Volga River at Mederville Access",
        "note": "The Water Quality Portal / Iowa DNR site named Volga River at Mederville Access places the access at 42.7637267, -91.4218817, matching the Mederville bridge-area landing described by the route report.",
        "sourceUrl": "https://www.waterqualitydata.us/provider/STORET/21IOWA/21IOWA-11220006/"
      },
      {
        "label": "General Volga paddling context",
        "value": "Good paddling stream with access points",
        "note": "Iowa DNR Fish Iowa describes the Volga River as a good paddling stream for most of the year with put-in and take-out points along much of its length.",
        "sourceUrl": "https://programs.iowadnr.gov/lakemanagement/FishIowa/RiverStreamDetails/RVR22"
      }
    ],
    "sourceLinks": [
      {
        "label": "Wisconsin River Trips Volga River - Osborne",
        "url": "https://www.wisconsinrivertrips.com/segments/volga-river/osborne",
        "provider": "wisconsin_river_trips"
      },
      {
        "label": "USGS 05412400 Volga River at Littleport",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05412400/",
        "provider": "usgs"
      },
      {
        "label": "Clayton County Conservation 2024 annual report",
        "url": "https://www.claytoncountyconservation.org/_files/ugd/155093_74badccc039042c9b23261221c12324e.pdf",
        "provider": "local"
      },
      {
        "label": "Water Quality Portal Volga River at Mederville Access",
        "url": "https://www.waterqualitydata.us/provider/STORET/21IOWA/21IOWA-11220006/",
        "provider": "local"
      },
      {
        "label": "Iowa DNR Fish Iowa Volga River",
        "url": "https://programs.iowadnr.gov/lakemanagement/FishIowa/RiverStreamDetails/RVR22",
        "provider": "local"
      }
    ]
  },
  {
    "id": "maquoketa-river-mon-maq-pictured-rocks",
    "slug": "maquoketa-river-mon-maq-pictured-rocks",
    "name": "Maquoketa River",
    "reach": "Mon-Maq Dam Access to Pictured Rocks Park",
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Classic lower-Maquoketa water-trail run from the Mon-Maq sandbar launch to Pictured Rocks Park, with steady current, limestone bluffs, wooded public land, and a direct Maquoketa gauge ladder.",
    "statusText": "Use the Maquoketa River near Maquoketa gauge. Treat 701 to 1,000 cfs as the best broad target, below 500 cfs as too low for enjoyable paddling, and 2,001+ cfs as very high and pushy.",
    "latitude": 42.24511929,
    "longitude": -91.17077245,
    "gaugeSource": {
      "id": "usgs-05418500",
      "provider": "usgs",
      "siteId": "05418500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Maquoketa River near Maquoketa, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05418500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "dam",
        "private_banks",
        "strainers"
      ],
      "safetyNotes": [
        "Launch from the lower sandbar/access below Mon-Maq Dam; do not launch above the dam or drift into dam hydraulics.",
        "The Jones County/Iowa DNR guide warns dams are not always obvious from upstream and paddlers should exit when directed and portage around.",
        "Eight miles of moving water, private-property boundaries, wood, and pushier current above the preferred band require current verification."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 701,
      "idealMax": 1000,
      "tooLow": 500,
      "tooHigh": 2001,
      "thresholdSource": {
        "label": "Wisconsin River Trips lower Maquoketa gauge ladder",
        "url": "https://www.wisconsinrivertrips.com/segments/maquoketa-river/buzzard-ridge-wildlife-area",
        "provider": "wisconsin_river_trips"
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
      "seasonNotes": "Spring and post-rain windows are the most reliable. The lower Maquoketa can still be paddleable in summer, but dry periods expose gravel shallows and very high water reduces clarity and makes landings more consequential.",
      "difficulty": "easy",
      "difficultyNotes": "The DNR-backed water-trail guide describes this eight-mile section as appropriate for all skill levels, though it is long for beginners. Treat high water, strainers, and the steep Pictured Rocks access road as real planning factors.",
      "confidenceNotes": "Confidence is good for an Iowa community-source add: the Iowa DNR/Jones County water-trail map names the Mon-Maq-to-Pictured-Rocks section and describes the launch/take-out amenities; Jones County confirms Pictured Rocks public paddling access and hard-surface river access; WRT identifies Monticello Dam Lower Access to Pictured Rocks as one of the popular scenic lower-Maquoketa legs and publishes a Maquoketa-gauge ladder for the lower river; USGS 05418500 is a direct same-river live gauge downstream near Maquoketa. Coordinates are from Water Quality Portal named monitoring sites at Mon-Maq Dam and Pictured Rocks Park, so paddlers should still follow posted access signs."
    },
    "evidenceNotes": [
      {
        "label": "Official water-trail route",
        "value": "Mon-Maq Dam to Pictured Rocks Park",
        "note": "The Iowa DNR/Jones County water-trail guide describes the sandbar access below Mon-Maq Dam, the Pictured Rocks stone boat ramp, amenities at both accesses, and the eight-mile route as suitable for all skill levels though long for beginners.",
        "sourceUrl": "https://www.iowadnr.gov/Portals/idnr/uploads/riverprograms/watertrails/watertrail_maquoketa.pdf"
      },
      {
        "label": "County paddling access",
        "value": "Pictured Rocks Park",
        "note": "Jones County describes Pictured Rocks along the Maquoketa River, notes paddling among steep limestone bluffs, and confirms hard-surface river access.",
        "sourceUrl": "https://www.jonescountyiowa.gov/conservation/parks/pictured_rocks/"
      },
      {
        "label": "DNR lower-river access context",
        "value": "Pictured Rocks hard-surface boat ramp",
        "note": "Iowa DNR Fish Iowa lists Pictured Rocks Park among the hard surface boat ramps on the lower Maquoketa and describes the upper part of the below-Monticello segment as more accessible by canoe or small jon boat.",
        "sourceUrl": "https://programs.iowadnr.gov/lakemanagement/FishIowa/RiverStreamDetails/RMR49"
      },
      {
        "label": "Published route context",
        "value": "Monticello Dam Lower Access to Pictured Rocks Boat Ramp",
        "note": "Wisconsin River Trips identifies this 8.1-mile leg as the start of one of the more popular and scenic lower-Maquoketa stretches with elevated limestone outcrops and possible summer-weekend crowds.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/maquoketa-river/buzzard-ridge-wildlife-area"
      },
      {
        "label": "Target range",
        "value": "701 to 1,000 cfs",
        "note": "WRT describes 701 to 1,000 cfs on the Maquoketa near Maquoketa gauge as an average fall depth and good target range for the lower river.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/maquoketa-river/buzzard-ridge-wildlife-area"
      },
      {
        "label": "Low-water floor",
        "value": "500 cfs",
        "note": "The same WRT ladder treats less than 500 cfs as likely too low for enjoyable paddling and 501 to 700 cfs as mostly okay but with grounding risk.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/maquoketa-river/buzzard-ridge-wildlife-area"
      },
      {
        "label": "High-water ceiling",
        "value": "2,001+ cfs",
        "note": "WRT treats 2,001+ cfs as very high, pushy, dirty water that may be beyond enjoyable paddling on the lower Maquoketa.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/maquoketa-river/buzzard-ridge-wildlife-area"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 05418500",
        "note": "USGS operates Maquoketa River near Maquoketa, IA downstream on the same river, and WRT uses this gauge for its lower-Maquoketa ladder.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05418500/"
      },
      {
        "label": "Endpoint coordinates",
        "value": "Mon-Maq 42.24511929, -91.17077245; Pictured Rocks 42.20569962, -91.10253825",
        "note": "Water Quality Portal sites named AWARE 9 Mon-Maq Dam Maquoketa River and AWARE 10 Pictured Rocks Park Maquoketa River provide NAD83 coordinates for the named endpoint corridors.",
        "sourceUrl": "https://www.waterqualitydata.us/provider/STORET/IOWATER_WQX/IOWATER_WQX-953030/"
      },
      {
        "label": "Hazards",
        "value": "Length, crowds, access road, high water",
        "note": "The route is not technical, but eight miles can be long for beginners, Pictured Rocks has a steep seasonal access road, summer weekends can be busy, and very high water makes the lower river pushier and dirtier.",
        "sourceUrl": "https://www.jonescountyiowa.gov/conservation/parks/pictured_rocks/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Iowa DNR Maquoketa River Water Trail",
        "url": "https://www.iowadnr.gov/Portals/idnr/uploads/riverprograms/watertrails/watertrail_maquoketa.pdf",
        "provider": "local"
      },
      {
        "label": "Jones County Pictured Rocks",
        "url": "https://www.jonescountyiowa.gov/conservation/parks/pictured_rocks/",
        "provider": "local"
      },
      {
        "label": "Iowa DNR Fish Iowa Maquoketa below Monticello",
        "url": "https://programs.iowadnr.gov/lakemanagement/FishIowa/RiverStreamDetails/RMR49",
        "provider": "local"
      },
      {
        "label": "Wisconsin River Trips Maquoketa River - Buzzard Ridge",
        "url": "https://www.wisconsinrivertrips.com/segments/maquoketa-river/buzzard-ridge-wildlife-area",
        "provider": "wisconsin_river_trips"
      },
      {
        "label": "USGS 05418500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05418500/",
        "provider": "usgs"
      },
      {
        "label": "Water Quality Portal Mon-Maq Dam",
        "url": "https://www.waterqualitydata.us/provider/STORET/IOWATER_WQX/IOWATER_WQX-953030/",
        "provider": "local"
      },
      {
        "label": "Water Quality Portal Pictured Rocks Park",
        "url": "https://www.waterqualitydata.us/provider/STORET/IOWATER_WQX/IOWATER_WQX-953031/",
        "provider": "local"
      },
      {
        "label": "USGS public-domain Maquoketa River image",
        "url": "https://www.usgs.gov/media/images/maquoketa-river",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "maquoketa-river-dundee-manchester",
    "slug": "maquoketa-river-dundee-manchester",
    "name": "Maquoketa River",
    "reach": "Dundee Access to Manchester Whitewater Park",
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Upper Maquoketa water-trail day from the unimproved Dundee access to downtown Manchester, with riffles, downed-tree exposure, a Quaker Mill dam-breach/portage decision, and a direct Manchester gauge range.",
    "statusText": "Use the Maquoketa River at Manchester gauge. Treat 120 to 1,500 cfs as the guarded runnable range; below 120 cfs expect bony shallows, and above 1,500 cfs the narrow wooded corridor and Manchester finish become too pushy for a broad recommendation.",
    "latitude": 42.5816,
    "longitude": -91.5461,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "dam",
        "whitewater",
        "private_banks",
        "cold_water"
      ],
      "safetyNotes": [
        "Iowa DNR describes the Dundee-to-Manchester reach as most appropriate for paddlers with at least intermediate skill because riffles and downed trees occur in a narrow river corridor.",
        "The Quaker Mill dam site between Lindsey Bridge and Tirrill Park has a breach that may be passable by watercraft, but Delaware County Tourism still describes a short south-bank portage option.",
        "Finish discipline matters in Manchester. The downtown whitewater park is a public feature, but tired day-trip paddlers should decide before launch whether they are taking out above, scouting, or running the course."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05416900",
      "provider": "usgs",
      "siteId": "05416900",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Maquoketa River at Manchester, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05416900/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 120,
      "idealMax": 1500,
      "tooLow": 120,
      "tooHigh": 1500,
      "thresholdSource": {
        "label": "CanWePaddle Maquoketa River Dundee-to-Manchester estimated range",
        "url": "https://canwepaddle.com/rivers/iowa/maquoketa-river-dundee-to-manchester/",
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
      "seasonNotes": "May through September is the published core season, with spring and post-rain windows often best. The route should be treated conservatively after heavy rain because the narrow wooded channel, downed trees, and Manchester features all get less forgiving.",
      "difficulty": "moderate",
      "difficultyNotes": "This is not the rejected Backbone-to-Dundee dam-adjacent card. It starts at the designated Dundee water-trail access and runs the official Dundee-to-Manchester reach, which Iowa DNR frames as intermediate because of riffles and downed trees.",
      "confidenceNotes": "Confidence is good for a guarded Iowa add: Iowa DNR and Delaware County materials document the exact Dundee-to-Manchester water-trail reach and hazards, Delaware County/MyCountyParks supports Dundee Wildlife Area public context, Manchester publishes current whitewater/access information, CanWePaddle publishes a route-specific Manchester-gauge range, and USGS 05416900 is a direct live same-river gauge in the finish corridor. Endpoint coordinates are practical access anchors from mapped public access/park context rather than a county GIS coordinate table, so the route copy keeps same-day signage and scouting caveats."
    },
    "evidenceNotes": [
      {
        "label": "Official route reach",
        "value": "Dundee Access to Manchester Whitewater Park, 11.8 miles",
        "note": "Iowa DNR documents the Dundee Access to Manchester Whitewater Park reach as 11.8 miles and says riffles and downed trees make it most appropriate for at least intermediate paddlers.",
        "sourceUrl": "https://www.iowadnr.gov/media/8890/download?inline="
      },
      {
        "label": "Local access sequence",
        "value": "Dundee to Lindsey Bridge to Tirrill Park to whitewater park",
        "note": "Delaware County Tourism breaks the route into Dundee-to-Lindsey Bridge, Lindsey Bridge-to-Tirrill Park, and Tirrill Park-to-Manchester Whitewater Park segments and notes a Quaker Mill dam breach with possible watercraft passage or south-bank portage.",
        "sourceUrl": "https://delawarecountyiowatourism.com/along-the-maquoketa/"
      },
      {
        "label": "Published range",
        "value": "120 to 1,500 cfs",
        "note": "CanWePaddle publishes a route-specific estimated runnable range of 120 to 1,500 cfs for Dundee to Manchester using the Maquoketa River at Manchester gauge.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/maquoketa-river-dundee-to-manchester/"
      },
      {
        "label": "Current gauge check",
        "value": "463 cfs / 5.35 ft",
        "note": "USGS Water Services returned Maquoketa River at Manchester values of 463 cfs and 5.35 ft at 2026-07-22 19:15 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05416900/"
      },
      {
        "label": "Put-in support",
        "value": "Dundee Access / Dundee Wildlife Area",
        "note": "Iowa DNR describes Dundee Access on the northwest edge of Dundee as the access for this reach, and Delaware County/MyCountyParks identifies Dundee Wildlife Area on the west edge of Dundee as public county conservation land.",
        "sourceUrl": "https://www.mycountyparks.com/county/Delaware/Park/Dundee-Wildlife-Area"
      },
      {
        "label": "Finish support",
        "value": "Manchester Whitewater Park",
        "note": "The City of Manchester says the whitewater park is open year-round, and Delaware County Tourism lists the park at 208 East Main Street with public parking nearby.",
        "sourceUrl": "https://www.manchester-ia.org/vnews/display.v/SEC/Parks%20%26%20Recreation%7CWhitewater%20Park"
      }
    ],
    "sourceLinks": [
      {
        "label": "Iowa DNR Maquoketa River in Delaware County guide",
        "url": "https://www.iowadnr.gov/media/8890/download?inline=",
        "provider": "local"
      },
      {
        "label": "Delaware County Along the Maquoketa",
        "url": "https://delawarecountyiowatourism.com/along-the-maquoketa/",
        "provider": "local"
      },
      {
        "label": "CanWePaddle Dundee to Manchester",
        "url": "https://canwepaddle.com/rivers/iowa/maquoketa-river-dundee-to-manchester/",
        "provider": "local"
      },
      {
        "label": "USGS 05416900 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05416900/",
        "provider": "usgs"
      },
      {
        "label": "Delaware County Dundee Wildlife Area",
        "url": "https://www.mycountyparks.com/county/Delaware/Park/Dundee-Wildlife-Area",
        "provider": "local"
      },
      {
        "label": "City of Manchester Whitewater Park",
        "url": "https://www.manchester-ia.org/vnews/display.v/SEC/Parks%20%26%20Recreation%7CWhitewater%20Park",
        "provider": "local"
      }
    ]
  },
  {
    "id": "volga-river-mederville-littleport",
    "slug": "volga-river-mederville-littleport",
    "name": "Volga River",
    "reach": "Mederville Canoe Access to Littleport Canoe Access",
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Short Driftless Iowa run from the hidden Mederville landing to Littleport, with limestone outcrops, mostly undeveloped banks, quick Class I riffles, and a direct Littleport gauge ladder.",
    "statusText": "Use the Volga River at Littleport gauge. Treat about 4.4 to 4.9 ft as the broad target, below 4.1 ft as too shallow, and 5.4+ ft as high enough for experienced paddlers only.",
    "latitude": 42.7637267,
    "longitude": -91.4218817,
    "gaugeSource": {
      "id": "usgs-05412400",
      "provider": "usgs",
      "siteId": "05412400",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Volga River at Littleport, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05412400/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 4.4,
      "idealMax": 4.9,
      "tooLow": 4.1,
      "tooHigh": 5.4,
      "thresholdSource": {
        "label": "Wisconsin River Trips Volga River Mederville gauge-height ladder",
        "url": "https://www.wisconsinrivertrips.com/segments/volga-river/mederville",
        "provider": "wisconsin_river_trips"
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
      "seasonNotes": "Spring and fall are the best scenery and clarity windows. The Volga can get shallow during dry late-summer periods, while heavy rain quickly makes the Littleport landing, riffles, and low-branch bends more consequential.",
      "difficulty": "easy",
      "difficultyNotes": "Mostly beginner-suitable Class I current at normal levels, but the Mederville launch and Littleport take-out are steep, hidden, and easier with a rope or a second person.",
      "confidenceNotes": "Confidence is good for an Iowa community-source add: Wisconsin River Trips documents the exact Mederville Canoe Access to Littleport Canoe Access route, hazards, and Littleport gauge-height ladder; USGS 05412400 is a direct same-river live gauge at the take-out bridge; Water Quality Portal/Iowa DNR records identify Volga River at Mederville Access and Volga River at Littleport coordinates; and Clayton County map context marks canoe access in the Mederville-to-Littleport corridor. Endpoint confidence is strongest for coordinates and named access records, while access usability is intentionally guarded because both landings are hidden and steep."
    },
    "evidenceNotes": [
      {
        "label": "Published route report",
        "value": "Mederville to Littleport, 5.7 miles",
        "note": "Wisconsin River Trips documents Mederville Canoe Access to Littleport Canoe Access as a 5.7-mile Volga River route with mostly undeveloped banks, outcrops, bluffs, and about 15 Class I pitches.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/volga-river/mederville"
      },
      {
        "label": "Target range",
        "value": "4.4 to 4.9 ft",
        "note": "The route ladder treats 4.4 to 4.6 ft as shallow but fine, 4.7 ft as average and a good target, and 4.8 to 4.9 ft as above average but still okay for paddling.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/volga-river/mederville"
      },
      {
        "label": "Low-water floor",
        "value": "4.1 ft",
        "note": "The same Littleport-gauge ladder says less than 4.1 ft is likely too shallow and 4.2 to 4.3 ft might be too shallow.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/volga-river/mederville"
      },
      {
        "label": "High-water ceiling",
        "value": "5.4+ ft",
        "note": "Wisconsin River Trips describes 5.4 to 5.8 ft as high and perhaps only suitable for experienced paddlers, with 5.9 ft and higher as very high and expert-only.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/volga-river/mederville"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 05412400",
        "note": "USGS operates Volga River at Littleport, IA on the same river at the route take-out bridge, with current discharge and gage-height observations.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05412400/"
      },
      {
        "label": "Put-in coordinate support",
        "value": "Volga River at Mederville Access",
        "note": "The Water Quality Portal / Iowa DNR site named Volga River at Mederville Access places the access at 42.7637267, -91.4218817, matching the Mederville bridge-area launch corridor described by the route report.",
        "sourceUrl": "https://www.waterqualitydata.us/provider/STORET/21IOWA/21IOWA-11220006/"
      },
      {
        "label": "Take-out coordinate support",
        "value": "Volga River at Littleport (32)",
        "note": "The Iowa DNR AQuIA / Water Quality Portal site named Volga River at Littleport (32) places the bridge-area take-out corridor at 42.7536533, -91.3690117, matching the Littleport Canoe Access and USGS gauge location.",
        "sourceUrl": "https://programs.iowadnr.gov/aquia/sites/11220008"
      },
      {
        "label": "Public access context",
        "value": "Clayton County canoe-access map context",
        "note": "Clayton County trout-fishing guide map context marks canoe access symbols around the Mederville, Littleport, and lower Volga corridor, corroborating the named public access pattern used by the route report.",
        "sourceUrl": "https://www.northeastiowarcd.org/wp-content/uploads/2019/08/Clayton-County-Trout-Fishing-Guide.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "Wisconsin River Trips Volga River - Mederville",
        "url": "https://www.wisconsinrivertrips.com/segments/volga-river/mederville",
        "provider": "wisconsin_river_trips"
      },
      {
        "label": "USGS 05412400 Volga River at Littleport",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05412400/",
        "provider": "usgs"
      },
      {
        "label": "Water Quality Portal Volga River at Mederville Access",
        "url": "https://www.waterqualitydata.us/provider/STORET/21IOWA/21IOWA-11220006/",
        "provider": "local"
      },
      {
        "label": "Iowa DNR AQuIA Volga River at Littleport",
        "url": "https://programs.iowadnr.gov/aquia/sites/11220008",
        "provider": "local"
      },
      {
        "label": "Clayton County Trout Fishing Guide",
        "url": "https://www.northeastiowarcd.org/wp-content/uploads/2019/08/Clayton-County-Trout-Fishing-Guide.pdf",
        "provider": "local"
      },
      {
        "label": "Iowa DNR Volga River State Recreation Area",
        "url": "https://www.iowadnr.gov/places-go/state-parks/all-parks/volga-river-state-recreation-area",
        "provider": "local"
      }
    ]
  },
  {
    "id": "turkey-river-big-spring-elkader",
    "slug": "turkey-river-big-spring-elkader",
    "name": "Turkey River",
    "reach": "Big Spring Campground to Elkader Access",
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Short spring-fed Turkey River water-trail leg from Big Spring Campground to the upper Elkader take-out, with riffles, gravel bars, wooded bluffs, and a direct Elkader gauge.",
    "statusText": "Use the Turkey River above French Hollow Creek at Elkader gauge. Treat about 220 cfs / 5.25 ft as very shallow but recommended for Big Spring to Elkader, and prefer roughly 250+ cfs for more margin.",
    "latitude": 42.91229,
    "longitude": -91.483,
    "gaugeSource": {
      "id": "usgs-05412020",
      "provider": "usgs",
      "siteId": "05412020",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Turkey River above French Hollow Cr at Elkader, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05412020/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "dam",
        "mandatory_takeout",
        "strainers"
      ],
      "safetyNotes": [
        "The Elkader take-out/portage is mandatory; the Turkey River guide says not to pass the portages because the dam is just downstream.",
        "Identify Access #39A early, land on the correct side, and do not continue toward the dam unless intentionally portaging with current local guidance.",
        "Wood piles, abandoned debris, strainers, shallow riffles, and high or rising water can make this inappropriate for casual groups."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 220,
      "thresholdSource": {
        "label": "Miles Paddled Turkey River IV Big Spring-to-Elkader level note",
        "url": "https://milespaddled.com/turkey-river-iv/",
        "provider": "miles_paddled"
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
      "seasonNotes": "Big Spring adds reliable coldwater inflow, so this shorter lower leg can hold up better than the shallower Elgin-to-Big-Spring approach. Dry spells can still expose gravel and scrape-prone riffles, while rain can make the Elkader dam approach and landing faster.",
      "difficulty": "easy",
      "difficultyNotes": "Mostly beginner-friendly quietwater and riffles at normal levels, but the Elkader take-out sits upstream of a dam. Identify Access #39A early, land on river left, and never drift past posted portage warnings.",
      "confidenceNotes": "Confidence is good for a narrow Iowa add: the Iowa DNR-backed Turkey River Water Trail names Big Spring Trout Hatchery / Access #47 or nearby Frieden Park #46 to Elkader #39A as the official 7.6-mile section, MyCountyParks confirms Big Spring Campground is right along the Turkey River and includes Canoe/Kayak Water Trail Access #47, Miles Paddled documents the exact Big Spring Campground to Elkader Access 39A trip with GPS points and route-specific Elkader-gauge guidance, and USGS 05412020 is a direct live gauge at Elkader just downstream of the route."
    },
    "evidenceNotes": [
      {
        "label": "Official water-trail section",
        "value": "Big Spring #47 to Elkader #39A",
        "note": "The Turkey River Water Trail describes Big Spring Trout Hatchery or Frieden Park to Elkader as a 7.6-mile section and warns paddlers to take out before the Elkader dam.",
        "sourceUrl": "https://turkeyriver.org/map/"
      },
      {
        "label": "Public put-in",
        "value": "Big Spring Campground / Water Trail Access #47",
        "note": "MyCountyParks says Big Spring Campground is right along the Turkey River, lists canoeing and kayaking, and identifies it as Water Trail Access #47.",
        "sourceUrl": "https://www.mycountyparks.com/county/Clayton/Park/Big-Spring-Campground"
      },
      {
        "label": "Published route report",
        "value": "Big Spring Campground to Access 39A",
        "note": "Miles Paddled documents this exact 7.25-mile trip with Big Spring Campground as the put-in and Elkader Access 39A off Sandpit Road as the take-out.",
        "sourceUrl": "https://milespaddled.com/turkey-river-iv/"
      },
      {
        "label": "Route-specific minimum",
        "value": "5.25 ft / 220 cfs recommended but very shallow",
        "note": "Miles Paddled reports 5.25 ft / 220 cfs on the Elkader gauge and recommends that level for Big Spring to Elkader, while noting the upstream Elgin-to-Big-Spring leg needs more water and 220 cfs is very shallow.",
        "sourceUrl": "https://milespaddled.com/turkey-river-iv/"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 05412020",
        "note": "USGS operates Turkey River above French Hollow Creek at Elkader, IA on the same river at the downstream end of this route corridor.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05412020/"
      },
      {
        "label": "Endpoint coordinates",
        "value": "42.91229, -91.483 to 42.8618, -91.40877",
        "note": "Miles Paddled publishes GPS points for Big Spring Campground and the official Elkader Access 39A take-out; official water-trail and county-park sources corroborate the access names.",
        "sourceUrl": "https://milespaddled.com/turkey-river-iv/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Turkey River Water Trail map and guide",
        "url": "https://turkeyriver.org/map/",
        "provider": "local"
      },
      {
        "label": "MyCountyParks Big Spring Campground",
        "url": "https://www.mycountyparks.com/county/Clayton/Park/Big-Spring-Campground",
        "provider": "local"
      },
      {
        "label": "Miles Paddled Turkey River IV",
        "url": "https://milespaddled.com/turkey-river-iv/",
        "provider": "miles_paddled"
      },
      {
        "label": "USGS 05412020 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05412020/",
        "provider": "usgs"
      },
      {
        "label": "Turkey River Big Spring Trout Hatchery",
        "url": "https://turkeyriver.org/big-spring-trout-hatchery/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "turkey-river-elkader-motor-mill",
    "slug": "turkey-river-elkader-motor-mill",
    "name": "Turkey River",
    "reach": "Elkader Whitewater Park to Motor Mill Access",
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Popular Driftless Iowa water-trail run from downtown Elkader to Motor Mill, with wooded bluffs, frequent riffles, a historic mill finish, and a direct Elkader gauge ladder.",
    "statusText": "Use the Turkey River above French Hollow Creek at Elkader gauge. Treat 251 to 450 cfs as the average target, 100 cfs as the low floor, and 1,501+ cfs as too high for a normal recreational recommendation.",
    "latitude": 42.853356,
    "longitude": -91.402402,
    "gaugeSource": {
      "id": "usgs-05412020",
      "provider": "usgs",
      "siteId": "05412020",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Turkey River above French Hollow Cr at Elkader, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05412020/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 251,
      "idealMax": 450,
      "tooLow": 100,
      "tooHigh": 1501,
      "thresholdSource": {
        "label": "Wisconsin River Trips Turkey River Elkader gauge ladder",
        "url": "https://www.wisconsinrivertrips.com/segments/turkey-river/elkader",
        "provider": "wisconsin_river_trips"
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
      "seasonNotes": "Spring and fall are the most reliable scenic windows. The river is somewhat spring-fed and can hold up better than some nearby streams, but recent rain still changes clarity, riffle speed, and whitewater-park consequences quickly.",
      "difficulty": "moderate",
      "difficultyNotes": "The downstream run is mostly Class I riffles at normal levels, but the optional whitewater-park ledges at the start are more consequential and should be scouted or bypassed by casual paddlers.",
      "confidenceNotes": "Confidence is good for an Iowa community-source add: the Iowa DNR-backed Turkey River Water Trail names Elkader Access #39B to Motor Mill Access #32 as a 6.5-mile section, Wisconsin River Trips documents the same Elkader-to-Motor-Mill corridor and publishes a detailed Elkader-gauge ladder, and USGS 05412020 is a direct live gauge in Elkader. Endpoint confidence is strongest for the Elkader Whitewater Park put-in and good for Motor Mill through the official water-trail access name, Clayton County water-access page, and named map-feature coordinates."
    },
    "evidenceNotes": [
      {
        "label": "Official water-trail section",
        "value": "Elkader #39B to Motor Mill #32",
        "note": "The Turkey River Water Trail map and guide describes the Elkader to Motor Mill section as a scenic 6.5-mile water-trail run with wooded bluffs, riffles, and a left-bank take-out at Motor Mill Access.",
        "sourceUrl": "https://turkeyriver.org/map/"
      },
      {
        "label": "Published route report",
        "value": "Elkader Whitewater Park to Motor Mill Access",
        "note": "Wisconsin River Trips documents the Elkader Whitewater Park to Motor Mill Access route at about 7.0 miles and describes this as one of the better and more popular Turkey River trips.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/turkey-river/elkader"
      },
      {
        "label": "Target range",
        "value": "251 to 450 cfs",
        "note": "Wisconsin River Trips describes 251 to 450 cfs at the Elkader gauge as maybe an average flow rate for this route.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/turkey-river/elkader"
      },
      {
        "label": "Low-water floor",
        "value": "100 cfs",
        "note": "The same route ladder treats less than 100 cfs as maybe too shallow and 101 to 250 cfs as low but generally doable with bumpy riffles.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/turkey-river/elkader"
      },
      {
        "label": "High-water ceiling",
        "value": "1,501+ cfs",
        "note": "WRT treats 1,201 to 1,500 cfs as extremely high and perhaps suitable only for experienced paddlers, and 1,501+ cfs as maybe too high and probably dangerous.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/turkey-river/elkader"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 05412020",
        "note": "USGS operates Turkey River above French Hollow Creek at Elkader, IA with current stream observations on the same river in the route corridor.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05412020/"
      },
      {
        "label": "Put-in support",
        "value": "Elkader Whitewater Park / Elkader Access",
        "note": "Iowa Whitewater Coalition publishes Elkader Whitewater Park coordinates, and the water-trail guide places Elkader Access #39B in the same downtown Elkader launch corridor.",
        "sourceUrl": "https://www.iowawhitewater.org/lhd/LHDelkader2.html"
      },
      {
        "label": "Take-out support",
        "value": "Motor Mill Access",
        "note": "Clayton County Conservation lists water access to the Turkey River at Motor Mill Historic Site, while the Turkey River Water Trail identifies the downstream left-bank Motor Mill Access as Access #32.",
        "sourceUrl": "https://www.claytoncountyconservation.org/motor-mill-park"
      }
    ],
    "sourceLinks": [
      {
        "label": "Turkey River Water Trail map and guide",
        "url": "https://turkeyriver.org/map/",
        "provider": "local"
      },
      {
        "label": "Wisconsin River Trips Turkey River Elkader",
        "url": "https://www.wisconsinrivertrips.com/segments/turkey-river/elkader",
        "provider": "wisconsin_river_trips"
      },
      {
        "label": "USGS 05412020 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05412020/",
        "provider": "usgs"
      },
      {
        "label": "Iowa Whitewater Coalition Elkader Whitewater Park",
        "url": "https://www.iowawhitewater.org/lhd/LHDelkader2.html",
        "provider": "local"
      },
      {
        "label": "Clayton County Conservation Motor Mill Historic Site",
        "url": "https://www.claytoncountyconservation.org/motor-mill-park",
        "provider": "local"
      },
      {
        "label": "Motor Mill Access map record",
        "url": "https://mapcarta.com/W413496370",
        "provider": "local"
      }
    ]
  },
  {
    "id": "turkey-river-gilbertson-big-spring",
    "slug": "turkey-river-gilbertson-big-spring",
    "name": "Turkey River",
    "reach": "Gilbertson Park / Elgin to Big Spring Campground",
    "aliases": [
      "Turkey River - Elgin to Big Spring",
      "Turkey River - Gilbertson Park to Big Spring Campground",
      "Turkey River Water Trail - Gilbertson Access #59 to Big Spring #47"
    ],
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Long upper-middle Turkey River water-trail day from Elgin to Big Spring Campground, with broad valleys, riffles, sandbars, and a campground finish well upstream of the Elkader corridor.",
    "statusText": "Use the Turkey River above French Hollow Creek at Elkader gauge as a downstream same-river proxy. Treat about 250 cfs / 5.5 ft as the conservative low-water floor for Elgin to Big Spring; below that expect scraping and slower progress.",
    "latitude": 42.95817,
    "longitude": -91.62423,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "Treat this as a long rural moving-water day, not a short beginner float. Low water, exposed valley wind, and limited bridge exits can stretch the shuttle window.",
        "Use the named public access points for launching, landing, and longer stops. Bridge pauses or gravel bars do not make adjacent private banks public.",
        "Watch for outside-bend wood, farm debris, and shifting shallow channels after rain because the Elkader gauge is only a downstream same-river proxy for this upper reach."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05412020",
      "provider": "usgs",
      "siteId": "05412020",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Turkey River above French Hollow Cr at Elkader, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05412020/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 250,
      "thresholdSource": {
        "label": "Miles Paddled Turkey River IV Elgin-to-Big-Spring guidance",
        "url": "https://milespaddled.com/turkey-river-iv/",
        "provider": "miles_paddled"
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
      "seasonNotes": "Spring through fall works best. Big Spring adds reliable coldwater flow only at the end of this route, so the upstream Elgin half still gets scrapier first during dry spells and can rise quickly after storms.",
      "difficulty": "easy",
      "difficultyNotes": "This is beginner-friendly moving water at normal levels, but it is a long day with shallow riffles, wide valley wind exposure, and limited bridge exits between Elgin and Big Spring.",
      "confidenceNotes": "Confidence is good for a conservative Iowa add: the Turkey River Water Trail identifies the Elgin / Gilbertson-to-Big-Spring corridor through Access #59, #57, and #47; Miles Paddled documents the exact Elgin-to-Big-Spring trip with GPS points and says to look for roughly 5.5 ft or 250+ cfs on the Elkader gauge; Fayette County supports Gilbertson as a large public campground and trail property on the Turkey River; Clayton County / MyCountyParks confirms Big Spring Campground as Water Trail Access #47 with camping and canoe/kayak use; and same-day USGS Water Services returned 1,580 cfs and 7.10 ft at the downstream Elkader gauge at 2026-07-06 09:45 CDT. The app treats the Elkader gauge as a downstream same-river proxy, not a perfect reach-specific forecast."
    },
    "evidenceNotes": [
      {
        "label": "Official water-trail section",
        "value": "Gilbertson #59 to Big Spring #47, about 11.9 mi",
        "note": "The Turkey River Water Trail describes the Gilbertson Park corridor as an 11.9-mile float to Big Spring Trout Hatchery, with the option to continue another half mile to Frieden Park.",
        "sourceUrl": "https://turkeyriver.org/wp-content/uploads/2025/05/TRWT-Guide_2025_Online.pdf"
      },
      {
        "label": "Published route report",
        "value": "Elgin / Gilbertson to Big Spring Campground",
        "note": "Miles Paddled documents the exact Elgin-to-Big-Spring trip from the Highway B64 / Gilbertson side of Elgin to Big Spring Campground, including GPS points and shuttle notes.",
        "sourceUrl": "https://milespaddled.com/turkey-river-iv/"
      },
      {
        "label": "Proxy gauge floor",
        "value": "5.5 ft / 250 cfs minimum-only",
        "note": "Miles Paddled says to look for 5.5 ft or 250+ cfs on the Elkader gauge for the Elgin-to-Big-Spring half of the route, while 5.25 ft / 220 cfs is very shallow.",
        "sourceUrl": "https://milespaddled.com/turkey-river-iv/"
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05412020 at 1,580 cfs / 7.10 ft",
        "note": "USGS Water Services returned current Turkey River above French Hollow Creek at Elkader values of 1,580 cfs and 7.10 ft at 2026-07-06 09:45 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05412020/"
      },
      {
        "label": "Public put-in",
        "value": "Gilbertson Park / Elgin access corridor",
        "note": "Fayette County says Gilbertson Park is a 1,000-acre public property stretching along the Turkey River near Elgin, with a modern campground and Turkey River recreational corridor access; Miles Paddled identifies the practical launch at the Highway B64 bridge upstream of the pedestrian bridge in Elgin.",
        "sourceUrl": "https://www.fayettecountyconservation.org/gilbertson-conservation-education-a"
      },
      {
        "label": "Public take-out and camping",
        "value": "Big Spring Campground / Water Trail Access #47",
        "note": "Clayton County / MyCountyParks says Big Spring Campground sits right along the Turkey River, offers primitive camping, lists canoe/kayak use, and identifies the site as Water Trail Access #47.",
        "sourceUrl": "https://www.mycountyparks.com/county/Clayton/Park/Big-Spring-Campground"
      }
    ],
    "sourceLinks": [
      {
        "label": "Turkey River Water Trail guide PDF",
        "url": "https://turkeyriver.org/wp-content/uploads/2025/05/TRWT-Guide_2025_Online.pdf",
        "provider": "local"
      },
      {
        "label": "Miles Paddled Turkey River IV",
        "url": "https://milespaddled.com/turkey-river-iv/",
        "provider": "miles_paddled"
      },
      {
        "label": "Fayette County Gilbertson Park",
        "url": "https://www.fayettecountyconservation.org/gilbertson-conservation-education-a",
        "provider": "local"
      },
      {
        "label": "MyCountyParks Big Spring Campground",
        "url": "https://www.mycountyparks.com/county/Clayton/Park/Big-Spring-Campground",
        "provider": "local"
      },
      {
        "label": "USGS 05412020 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05412020/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "turkey-river-gilbertson-elkader",
    "slug": "turkey-river-gilbertson-elkader",
    "name": "Turkey River",
    "reach": "Gilbertson Park / Elgin to Elkader Access",
    "aliases": [
      "Turkey River - Elgin to Elkader",
      "Turkey River - Gilbertson Park to Elkader Access",
      "Turkey River Water Trail - Gilbertson Access #59 to Elkader #39A"
    ],
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Long upper Turkey River water-trail day from Elgin to the mandatory Elkader take-out, with broad valleys, gravel bars, Big Spring coldwater support, and a direct Elkader gauge at the finish.",
    "statusText": "Use the Turkey River above French Hollow Creek at Elkader gauge. Treat about 250 cfs / 5.5 ft as the conservative minimum for the full Elgin-to-Elkader day; 220 cfs / 5.25 ft is very shallow and better limited to the shorter Big-Spring-to-Elkader half.",
    "latitude": 42.95817,
    "longitude": -91.62423,
    "gaugeSource": {
      "id": "usgs-05412020",
      "provider": "usgs",
      "siteId": "05412020",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Turkey River above French Hollow Cr at Elkader, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05412020/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "dam",
        "mandatory_takeout",
        "strainers"
      ],
      "safetyNotes": [
        "The Elkader take-out and portage are mandatory; the official water-trail guide says not to pass the portages because the dam is just downstream.",
        "This is a long day with few clean public exits after Elgin. Do not launch unless the group can comfortably finish before the Elkader dam corridor.",
        "Storm-changed wood, shallow riffles, and the slowing current above the dam pool can turn a simple-looking day into a tiring one for casual groups."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 250,
      "thresholdSource": {
        "label": "Miles Paddled Turkey River IV Elgin-to-Elkader guidance",
        "url": "https://milespaddled.com/turkey-river-iv/",
        "provider": "miles_paddled"
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
      "seasonNotes": "Spring through fall works best. Big Spring adds coldwater support late in the route, but the upper Elgin half still gets shallow first during dry spells and rises quickly after thunderstorms.",
      "difficulty": "moderate",
      "difficultyNotes": "Mostly beginner-friendly moving water at normal levels, but the 19.5-mile commitment, limited exits, and mandatory Elkader take-out above the dam make this more serious than a casual park float.",
      "confidenceNotes": "Confidence is good for a guarded Iowa add: the 2025 Turkey River Water Trail guide still documents the official access chain from Gilbertson #59 through Narrows #57 and Big Spring #47/Frieden #46 to Elkader #39A, Miles Paddled documents the exact Elgin-to-Elkader trip with GPS points and recommends about 5.5 ft / 250+ cfs on the Elkader gauge for the full route, Fayette County supports Gilbertson as a public Turkey River campground property, MyCountyParks confirms Big Spring Campground as Water Trail Access #47, and same-day USGS Water Services returned 1,550 cfs and 7.07 ft at the Elkader gauge at 2026-07-06 10:45 CDT."
    },
    "evidenceNotes": [
      {
        "label": "Official route chain",
        "value": "Gilbertson #59 to Big Spring #47 to Elkader #39A, about 19.5 mi",
        "note": "The 2025 Turkey River Water Trail guide lists Gilbertson to Big Spring at 11.9 miles and Big Spring to Elkader at 7.6 miles, supporting the full Elgin-to-Elkader continuation on the safe side of the dam.",
        "sourceUrl": "https://turkeyriver.org/wp-content/uploads/2025/05/TRWT-Guide_2025_Online.pdf"
      },
      {
        "label": "Published route report",
        "value": "Elgin / Gilbertson to Elkader Access 39A",
        "note": "Miles Paddled documents the exact Elgin-to-Elkader trip with route narrative, GPS points, and a recommendation to look for about 5.5 ft or 250+ cfs on the Elkader gauge.",
        "sourceUrl": "https://milespaddled.com/turkey-river-iv/"
      },
      {
        "label": "Route-specific minimum",
        "value": "5.5 ft / 250 cfs conservative floor",
        "note": "Miles Paddled says the full Elgin-to-Elkader route is best around 5.5 ft or 250+ cfs on the Elkader gauge, while 5.25 ft / 220 cfs is very shallow and better suited only to the lower Big-Spring-to-Elkader half.",
        "sourceUrl": "https://milespaddled.com/turkey-river-iv/"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 05412020 at 1,550 cfs / 7.07 ft",
        "note": "USGS Water Services returned current Turkey River above French Hollow Creek at Elkader values of 1,550 cfs and 7.07 ft at 2026-07-06 10:45 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05412020/"
      },
      {
        "label": "Public put-in",
        "value": "Gilbertson Park / Elgin access corridor",
        "note": "Fayette County says Gilbertson Park is a 1,000-acre public property along the Turkey River near Elgin with campground and paddling access, and Miles Paddled identifies the practical launch near the Highway B64 bridge.",
        "sourceUrl": "https://www.fayettecountyconservation.org/gilbertson-conservation-education-a"
      },
      {
        "label": "Mandatory take-out",
        "value": "Elkader Access #39A / Sandpit Road",
        "note": "The official water-trail guide warns paddlers to take out before the Elkader dam, and Miles Paddled documents Access 39A off Sandpit Road as the practical landing for this exact route.",
        "sourceUrl": "https://milespaddled.com/turkey-river-iv/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Turkey River Water Trail guide PDF",
        "url": "https://turkeyriver.org/wp-content/uploads/2025/05/TRWT-Guide_2025_Online.pdf",
        "provider": "local"
      },
      {
        "label": "Miles Paddled Turkey River IV",
        "url": "https://milespaddled.com/turkey-river-iv/",
        "provider": "miles_paddled"
      },
      {
        "label": "Fayette County Gilbertson Park",
        "url": "https://www.fayettecountyconservation.org/gilbertson-conservation-education-a",
        "provider": "local"
      },
      {
        "label": "MyCountyParks Big Spring Campground",
        "url": "https://www.mycountyparks.com/county/Clayton/Park/Big-Spring-Campground",
        "provider": "local"
      },
      {
        "label": "USGS 05412020 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05412020/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "turkey-river-motor-mill-garber",
    "slug": "turkey-river-motor-mill-garber",
    "name": "Turkey River",
    "reach": "Motor Mill Access to Garber Access",
    "aliases": [
      "Turkey River - Motor Mill to Garber",
      "Turkey River - Motor Mill / Galaxy Road to Garber",
      "Turkey River Water Trail - Access #32 to Access #20"
    ],
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Remote lower Turkey River float from Motor Mill to Garber, with canyon-like wooded ridges, limestone outcrops, the Volga confluence, and a direct Garber gauge at the take-out corridor.",
    "statusText": "Use the Turkey River at Garber gauge. Miles Paddled recommends this exact route at about 550 cfs, so Paddle Today keeps a conservative 550 cfs minimum-only floor rather than claiming a broader published range.",
    "latitude": 42.80692,
    "longitude": -91.35124,
    "gaugeSource": {
      "id": "usgs-05412500",
      "provider": "usgs",
      "siteId": "05412500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Turkey River at Garber, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05412500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 550,
      "thresholdSource": {
        "label": "Miles Paddled Turkey River I Motor-Mill-to-Garber guidance",
        "url": "https://milespaddled.com/turkey-river/",
        "provider": "miles_paddled"
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
      "seasonNotes": "This lower corridor holds water better than many nearby Driftless rivers, but recent rain still pushes the riffles and muddies landings. Low drought windows can still slow the day despite the big watershed.",
      "difficulty": "moderate",
      "difficultyNotes": "Technically friendly for experienced flatwater paddlers, but this is a long, relatively isolated day with few easy exits, many riffles, and private-bank limits along a broad rural corridor.",
      "confidenceNotes": "Confidence is good for a conservative Iowa add: the Turkey River Water Trail names Motor Mill Access #32 to Garber Access #20 as a 12.4-mile official section; Miles Paddled documents the exact Motor-Mill-to-Garber route with GPS points and recommends the same-day 550 cfs Garber gauge reading used on the trip; the Garber USGS station is a direct live gauge at the take-out corridor and returned 2,970 cfs and 9.62 ft at 2026-07-06 09:15 CDT; and the Motor Mill access/campground context is manager-backed by Clayton County Conservation. The app stays minimum-only because the evidence supports a conservative exact-route floor, not a full ideal/high ladder."
    },
    "evidenceNotes": [
      {
        "label": "Official water-trail section",
        "value": "Motor Mill #32 to Garber #20, 12.4 mi",
        "note": "The Turkey River Water Trail guide describes the remote 12.4-mile stretch from Motor Mill to Garber as one of the best scenic sections on the river and identifies the Garber take-out just past the second bridge on river left.",
        "sourceUrl": "https://turkeyriver.org/wp-content/uploads/2025/05/TRWT-Guide_2025_Online.pdf"
      },
      {
        "label": "Published route report",
        "value": "Motor Mill / Galaxy Road to Garber Access #20",
        "note": "Miles Paddled documents Motor Mill / Galaxy Road as Trip 2 put-in and Highway X41 / Jupiter Road in Garber as the exact take-out for this route.",
        "sourceUrl": "https://milespaddled.com/turkey-river/"
      },
      {
        "label": "Exact-route threshold support",
        "value": "550 cfs conservative floor",
        "note": "Miles Paddled paddled the exact Motor-Mill-to-Garber route at 550 cfs on the Garber gauge and says, \"We recommend this level.\" Paddle Today uses that as a conservative minimum-only floor rather than inferring a broader range.",
        "sourceUrl": "https://milespaddled.com/turkey-river/"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 05412500 at 2,970 cfs / 9.62 ft",
        "note": "USGS Water Services returned current Turkey River at Garber values of 2,970 cfs and 9.62 ft at 2026-07-06 09:15 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05412500/"
      },
      {
        "label": "Public put-in and camping",
        "value": "Motor Mill Access and campground",
        "note": "Clayton County Conservation lists water access to the Turkey River at Motor Mill Historic Site, and Miles Paddled describes a secluded campground with potable water, bathrooms, hiking trails, and an excellent boat landing at Motor Mill.",
        "sourceUrl": "https://www.claytoncountyconservation.org/motor-mill-park"
      },
      {
        "label": "Public take-out",
        "value": "Garber Access #20",
        "note": "Miles Paddled identifies the dedicated Garber access at the second bridge on river left, and the official water-trail guide labels Garber Access #20 as the downstream take-out for this section.",
        "sourceUrl": "https://milespaddled.com/turkey-river/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Turkey River Water Trail guide PDF",
        "url": "https://turkeyriver.org/wp-content/uploads/2025/05/TRWT-Guide_2025_Online.pdf",
        "provider": "local"
      },
      {
        "label": "Miles Paddled Turkey River I",
        "url": "https://milespaddled.com/turkey-river/",
        "provider": "miles_paddled"
      },
      {
        "label": "Clayton County Conservation Motor Mill Historic Site",
        "url": "https://www.claytoncountyconservation.org/motor-mill-park",
        "provider": "local"
      },
      {
        "label": "USGS 05412500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05412500/",
        "provider": "usgs"
      },
      {
        "label": "Turkey River river levels",
        "url": "https://turkeyriver.org/river-levels/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "turkey-river-elkader-garber",
    "slug": "turkey-river-elkader-garber",
    "name": "Turkey River",
    "reach": "Elkader Whitewater Park to Garber Access",
    "aliases": [
      "Turkey River - Elkader to Garber",
      "Turkey River - Elkader Whitewater Park to Garber",
      "Turkey River Water Trail - Elkader to Garber full day"
    ],
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Full lower Turkey River day from Elkader to Garber, combining the whitewater-park / Motor Mill section with the long remote canyon run to Garber under one direct lower-river gauge.",
    "statusText": "Use the Turkey River at Garber gauge. Miles Paddled recommends the exact Elkader-to-Garber route at about 550 cfs, so Paddle Today keeps a conservative 550 cfs minimum-only floor and does not claim a fuller paddling band.",
    "latitude": 42.853356,
    "longitude": -91.402402,
    "gaugeSource": {
      "id": "usgs-05412500",
      "provider": "usgs",
      "siteId": "05412500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Turkey River at Garber, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05412500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 550,
      "thresholdSource": {
        "label": "Miles Paddled Turkey River I Elkader-to-Garber guidance",
        "url": "https://milespaddled.com/turkey-river/",
        "provider": "miles_paddled"
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
      "seasonNotes": "Best in spring through fall with stable weather. This full route benefits from the Turkey River watershed size, but wind, muddy water, and faster riffles stack up over a longer day when levels climb.",
      "difficulty": "moderate",
      "difficultyNotes": "Not technically difficult for competent paddlers at normal levels, but it is a committed all-day route with the optional Elkader whitewater ledges at the start, many riffles, long mileage, and limited public exits before Garber.",
      "confidenceNotes": "Confidence is good for a conservative long-route Iowa add: Miles Paddled documents the exact Elkader-to-Garber route as two consecutive legs on the same day with named GPS points and a recommended 550 cfs Garber-gauge level; the Turkey River Water Trail independently supports the same Elkader-to-Motor-Mill and Motor-Mill-to-Garber section chain; USGS 05412500 is a direct live gauge near the Garber take-out and returned 2,970 cfs and 9.62 ft at 2026-07-06 09:15 CDT; and Elkader, Motor Mill, and Garber all have named public access support in the current source stack. The app stays minimum-only because the strongest evidence is an exact-route recommended level, not a broader official ladder."
    },
    "evidenceNotes": [
      {
        "label": "Official route chain",
        "value": "Elkader #39B to Motor Mill #32 to Garber #20, about 18.9 mi",
        "note": "The Turkey River Water Trail lists Elkader to Motor Mill as 6.5 miles and Motor Mill to Garber as 12.4 miles, supporting the full lower-river continuation from Elkader to Garber.",
        "sourceUrl": "https://turkeyriver.org/wp-content/uploads/2025/05/TRWT-Guide_2025_Online.pdf"
      },
      {
        "label": "Published route report",
        "value": "Elkader to Garber exact day route",
        "note": "Miles Paddled documents the Elkader-to-Motor-Mill and Motor-Mill-to-Garber legs together and describes the full lower Turkey River day as a standout 19-mile stretch.",
        "sourceUrl": "https://milespaddled.com/turkey-river/"
      },
      {
        "label": "Exact-route threshold support",
        "value": "550 cfs conservative floor",
        "note": "Miles Paddled paddled the full Elkader-to-Garber route at 550 cfs on the Garber gauge and recommends that level. Paddle Today uses that as a conservative minimum-only floor instead of inferring a wider exact-route band.",
        "sourceUrl": "https://milespaddled.com/turkey-river/"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 05412500 at 2,970 cfs / 9.62 ft",
        "note": "USGS Water Services returned current Turkey River at Garber values of 2,970 cfs and 9.62 ft at 2026-07-06 09:15 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05412500/"
      },
      {
        "label": "Public endpoint support",
        "value": "Elkader Whitewater Park and Garber Access #20",
        "note": "Miles Paddled identifies Main Street / Elkader Whitewater Park as the practical public launch and Garber Access #20 as the dedicated public take-out; the official water-trail guide corroborates the access names and sequence.",
        "sourceUrl": "https://milespaddled.com/turkey-river/"
      },
      {
        "label": "Overnight split option",
        "value": "Motor Mill campground and access",
        "note": "Miles Paddled says Motor Mill has a secluded campground and excellent boat landing that can split the full day into two legal trips, which is useful context for a long-route planner entry.",
        "sourceUrl": "https://milespaddled.com/turkey-river/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Miles Paddled Turkey River I",
        "url": "https://milespaddled.com/turkey-river/",
        "provider": "miles_paddled"
      },
      {
        "label": "Turkey River Water Trail guide PDF",
        "url": "https://turkeyriver.org/wp-content/uploads/2025/05/TRWT-Guide_2025_Online.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 05412500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05412500/",
        "provider": "usgs"
      },
      {
        "label": "Clayton County Conservation Motor Mill Historic Site",
        "url": "https://www.claytoncountyconservation.org/motor-mill-park",
        "provider": "local"
      },
      {
        "label": "Iowa Whitewater Coalition Elkader Whitewater Park",
        "url": "https://www.iowawhitewater.org/lhd/LHDelkader2.html",
        "provider": "local"
      }
    ]
  },
  {
    "id": "little-turkey-river-gouldsburg-eldorado",
    "slug": "little-turkey-river-gouldsburg-eldorado",
    "name": "Little Turkey River",
    "reach": "Gouldsburg Park to Eldorado Bridge Access",
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Official upper Turkey River Water Trail starter section from Gouldsburg Park down the Little Turkey to Eldorado. This is a pretty Driftless riffle run, but seasonal fences, wires, and shallow water keep it guarded.",
    "statusText": "Use USGS 05411850 Turkey River near Eldorado as the best live corridor gauge. Treat 6.0 ft as the conservative scrape-prone floor; around 6.6 ft / 680 cfs was a strong same-route report, but no trusted upper ceiling is published.",
    "latitude": 43.012796,
    "longitude": -91.958595,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "access_uncertain",
        "private_banks"
      ],
      "safetyNotes": [
        "Miles Paddled flags potential wires and fences on this route. Scout from shore and portage around any strand or obstruction instead of ducking under it in current.",
        "Use Gouldsburg Park and the current Eldorado / Highway 150 public access; do not rely on older nearby bridge or private-bank take-out descriptions.",
        "The Eldorado gauge is downstream of the Little Turkey confluence. Confirm local depth, debris, and bridge current before committing after rain."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05411850",
      "provider": "usgs",
      "siteId": "05411850",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Turkey River near Eldorado, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05411850/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 6,
      "thresholdSource": {
        "label": "Miles Paddled Little Turkey River Eldorado gauge guidance",
        "url": "https://milespaddled.com/little-turkey-river/",
        "provider": "miles_paddled"
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
      "seasonNotes": "Spring and after-rain windows are most reliable. The route can get scrapey below the Eldorado 6 ft mark, while fresh rain can quickly raise current around fences, wires, riffles, and bridge landings.",
      "difficulty": "moderate",
      "difficultyNotes": "The paddling is mostly riffles and occasional Class I water, but Miles Paddled and Paddling Iowa warnings about seasonal fences and wires make this an intermediate judgment call rather than a casual beginner float.",
      "confidenceNotes": "Confidence is good for a guarded Iowa add: the Turkey River Water Trail names Gouldsburg Park Access #98 to Eldorado Access #86 as the official 12.2-mile first section, Fayette County confirms Gouldsburg Park has Little Turkey River and Crane Creek canoe/kayak use, Miles Paddled documents the same Little Turkey corridor and Eldorado take-out with route-specific gauge observations, and USGS 05411850 is a direct downstream Turkey River gauge 3.6 miles below the Little Turkey confluence. The route stays minimum-only because current public evidence gives a scrape-prone floor and good observed level, not a full low/ideal/high ladder."
    },
    "evidenceNotes": [
      {
        "label": "Official water-trail section",
        "value": "Gouldsburg #98 to Eldorado #86",
        "note": "The Turkey River Water Trail guide identifies Gouldsburg Park as the official put-in and beginning of the water trail, then describes 12.2 miles down the Little Turkey River before it joins the main Turkey at Eldorado.",
        "sourceUrl": "https://turkeyriver.org/map/"
      },
      {
        "label": "Public park access",
        "value": "Gouldsburg Park",
        "note": "Fayette County/MyCountyParks lists Gouldsburg Park at the confluence of the Little Turkey River and Crane Creek, with kayaking and canoeing among the park uses.",
        "sourceUrl": "https://www.mycountyparks.com/county/fayette/Park/Gouldsburg-Park"
      },
      {
        "label": "Route-specific minimum",
        "value": "6 ft at Eldorado",
        "note": "Miles Paddled recommends the reported 6.6 ft / 680 cfs level and says below 6 ft will invite occasional scraping on this Little Turkey route.",
        "sourceUrl": "https://milespaddled.com/little-turkey-river/"
      },
      {
        "label": "Direct corridor gauge",
        "value": "USGS 05411850",
        "note": "USGS operates Turkey River near Eldorado, IA 3.6 miles downstream from the Little Turkey confluence, with current discharge and gage-height observations.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05411850/"
      },
      {
        "label": "Fence and wire cautions",
        "value": "Seasonal hazards near Gouldsburg and downstream pastures",
        "note": "Miles Paddled reports seasonal fences and wires near Gouldsburg Park and cites Paddling Iowa warnings; scout and portage rather than forcing a line under wire.",
        "sourceUrl": "https://milespaddled.com/little-turkey-river/"
      },
      {
        "label": "Take-out support",
        "value": "Eldorado / Highway 150 bridge access",
        "note": "The official water-trail guide names Eldorado Access #86, and Miles Paddled documents the practical public take-out at Highway 150 / 292nd Street just below the Little Turkey confluence.",
        "sourceUrl": "https://milespaddled.com/little-turkey-river/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Turkey River Water Trail map and guide",
        "url": "https://turkeyriver.org/map/",
        "provider": "local"
      },
      {
        "label": "Fayette County Gouldsburg Park",
        "url": "https://www.mycountyparks.com/county/fayette/Park/Gouldsburg-Park",
        "provider": "local"
      },
      {
        "label": "Miles Paddled Little Turkey River",
        "url": "https://milespaddled.com/little-turkey-river/",
        "provider": "miles_paddled"
      },
      {
        "label": "USGS 05411850 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05411850/",
        "provider": "usgs"
      },
      {
        "label": "Turkey River near Eldorado river levels",
        "url": "https://turkeyriver.org/river-levels/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "north-fork-maquoketa-river-cascade-d61",
    "slug": "north-fork-maquoketa-river-cascade-d61",
    "name": "North Fork Maquoketa River",
    "reach": "Cascade Historic Limestone Silo to D61 Access",
    "aliases": [
      "North Fork Maquoketa River - Cascade to Hwy D61",
      "North Fork Maquoketa River - Cascade Historic Limestone Silo to Whitewater Creek",
      "North Fork Maquoketa River - Cascade Riverfront Park to D61"
    ],
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Scenic Driftless North Fork float from Cascade’s concrete launch below the old falls to the Whitewater Creek D61 access, with bluffs, boulders, riffles, and a direct Fulton gauge ladder.",
    "statusText": "Use the North Fork Maquoketa near Fulton gauge. Treat 231 to 400 cfs as the broad target window, below 150 cfs as likely too shallow, and 701+ cfs as beyond the normal recreational recommendation.",
    "latitude": 42.29902,
    "longitude": -91.01244,
    "gaugeSource": {
      "id": "usgs-05418400",
      "provider": "usgs",
      "siteId": "05418400",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "North Fork Maquoketa River near Fulton, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05418400/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "dam",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "Launch from the public concrete ramp below the Cascade dam zone; do not improvise an above-dam or in-dam-zone start.",
        "The D61 take-out requires identifying Whitewater Creek and paddling or wading a short distance upstream to the public bridge access. Scout that exit before committing with heavy boats.",
        "Rising water makes the riffles, outside-bend boulders, wood, and muddy Whitewater Creek landing more consequential than the easy mileage suggests."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 231,
      "idealMax": 400,
      "tooLow": 150,
      "tooHigh": 701,
      "thresholdSource": {
        "label": "Wisconsin River Trips North Fork Maquoketa Cascade-to-D61 gauge ladder",
        "url": "https://www.wisconsinrivertrips.com/segments/north-fork-maquoketa-river",
        "provider": "wisconsin_river_trips"
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
      "seasonNotes": "Spring and fall are the best scenery windows. Heavy rain can quickly make the North Fork pushy and muddy, while dry late-summer windows expose more gravel and make the D61 take-out creek shallower.",
      "difficulty": "moderate",
      "difficultyNotes": "Mostly Class I moving water at normal levels, but the launch sits just below Cascade’s dam zone, the route has many riffles and outside-bend boulders, and the D61 exit requires attention at the Whitewater Creek mouth.",
      "confidenceNotes": "Confidence is good for a guarded Iowa add: the City of Cascade still says the Riverview Park corridor has a nearby landing and parking area for canoers and kayakers floating south of town, Wisconsin River Trips and Miles Paddled both document the exact Cascade-to-D61 route with GPS points and Fulton-gauge context, Dubuque County now lists D61 Access as a true public canoe/kayak access on Whitewater Creek, and same-day USGS Water Services returned 943 cfs and 5.04 ft at the direct Fulton gauge at 2026-07-06 11:00 CDT."
    },
    "evidenceNotes": [
      {
        "label": "Public launch support",
        "value": "Cascade Historic Limestone Silo / Cascade landing",
        "note": "The City of Cascade says a landing and parking area within walking distance of Riverview Park gives canoers and kayakers the opportunity to float the North Fork to points south of Cascade, and WRT describes a long concrete ramp by the historic limestone silo below the dam.",
        "sourceUrl": "https://www.cityofcascade.org/vnews/display.v/ART/5e94c9f386f55"
      },
      {
        "label": "Published route report",
        "value": "Cascade Historic Limestone Silo to Hwy D61, 7.8 mi",
        "note": "Wisconsin River Trips documents the exact 7.8-mile Cascade-to-D61 route and Miles Paddled documents the same corridor with GPS points and route notes.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/north-fork-maquoketa-river"
      },
      {
        "label": "Public take-out",
        "value": "D61 Access on Whitewater Creek",
        "note": "Dubuque County lists D61 Access as a true public canoe/kayak access on Whitewater Creek, and WRT says the route exits there by paddling a short distance up Whitewater Creek to the bridge access.",
        "sourceUrl": "https://dubuquecountyiowa.gov/767/Paddling"
      },
      {
        "label": "Gauge ladder",
        "value": "231 to 400 cfs broad target",
        "note": "Wisconsin River Trips publishes the route-specific Fulton-gauge ladder used by this corridor, with less than 150 cfs flagged as too shallow and 701+ cfs pushed into the advanced-only range.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/north-fork-maquoketa-river"
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05418400 at 943 cfs / 5.04 ft",
        "note": "USGS Water Services returned current North Fork Maquoketa River near Fulton values of 943 cfs and 5.04 ft at 2026-07-06 11:00 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05418400/"
      },
      {
        "label": "Endpoint coordinates",
        "value": "42.29902, -91.01244 to 42.27778, -90.9371",
        "note": "Miles Paddled publishes GPS points for the Cascade Riverfront Park / Pierce Street launch and the Highway D61 take-out on Whitewater Creek; the city and county pages corroborate the access names and public-use context.",
        "sourceUrl": "https://milespaddled.com/maquoketa-river-north-fork-iii/"
      }
    ],
    "sourceLinks": [
      {
        "label": "City of Cascade Riverview Park",
        "url": "https://www.cityofcascade.org/vnews/display.v/ART/5e94c9f386f55",
        "provider": "local"
      },
      {
        "label": "Silos and Smokestacks Cascade Historic Limestone Silo",
        "url": "https://www.silosandsmokestacks.org/attraction/cascade-limestone-silo/",
        "provider": "local"
      },
      {
        "label": "Wisconsin River Trips North Fork Maquoketa River",
        "url": "https://www.wisconsinrivertrips.com/segments/north-fork-maquoketa-river",
        "provider": "wisconsin_river_trips"
      },
      {
        "label": "Miles Paddled Maquoketa River North Fork III",
        "url": "https://milespaddled.com/maquoketa-river-north-fork-iii/",
        "provider": "miles_paddled"
      },
      {
        "label": "Dubuque County paddling access list",
        "url": "https://dubuquecountyiowa.gov/767/Paddling",
        "provider": "local"
      },
      {
        "label": "USGS 05418400 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05418400/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "north-fork-maquoketa-river-d61-ozark",
    "slug": "north-fork-maquoketa-river-d61-ozark",
    "name": "North Fork Maquoketa River",
    "reach": "D61 Access / Whitewater Creek to Ozark Bridge / 21st Ave",
    "aliases": [
      "North Fork Maquoketa River - D61 to Ozark Bridge",
      "North Fork Maquoketa River - Whitewater Creek mouth to 21st Ave",
      "North Fork Maquoketa River - D61 wilderness stretch to Ozark"
    ],
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Remote Driftless continuation from the Whitewater Creek D61 access to Ozark Bridge, with bluff-lined bends, riffles, and a direct Fulton gauge on a corridor with very few clean exits.",
    "statusText": "Use the North Fork Maquoketa near Fulton gauge. Treat 231 to 400 cfs as the broad target window, below 150 cfs as likely too shallow, and 701+ cfs as beyond the normal recreational recommendation.",
    "latitude": 42.27778,
    "longitude": -90.9371,
    "gaugeSource": {
      "id": "usgs-05418400",
      "provider": "usgs",
      "siteId": "05418400",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "North Fork Maquoketa River near Fulton, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05418400/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "remote",
        "private_banks"
      ],
      "safetyNotes": [
        "This is a committed 12-mile wilderness corridor with very few practical public exits between Whitewater Creek and Ozark Bridge.",
        "Use the Fulton gauge with the trend and recent rain. Wisconsin River Trips pushes 701+ cfs beyond the normal recreational recommendation for this corridor.",
        "Scout the muddy D61 launch and undeveloped Ozark landing before unloading heavy boats, and do not use private banks or campground accesses as fallback exits without permission."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 231,
      "idealMax": 400,
      "tooLow": 150,
      "tooHigh": 701,
      "thresholdSource": {
        "label": "Wisconsin River Trips North Fork Maquoketa Whitewater-to-Ozark gauge ladder",
        "url": "https://www.wisconsinrivertrips.com/segments/north-fork-maquoketa-river",
        "provider": "wisconsin_river_trips"
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
      "seasonNotes": "Spring and fall are the best scenery windows. Heavy rain quickly raises the North Fork and makes this isolated middle corridor faster and muddier, while dry late-summer periods make riffles scrapier and the Whitewater Creek launch shallower.",
      "difficulty": "hard",
      "difficultyNotes": "The rapids are mostly Class I at normal levels, but this is a committed 12-mile wilderness day with very few practical public exits once you leave Whitewater Creek and head toward Ozark Bridge.",
      "confidenceNotes": "Confidence is good for a guarded Iowa add: Dubuque County still lists D61 Access as a true public canoe/kayak access on Whitewater Creek, Wisconsin River Trips still documents the exact Whitewater Creek Mouth to 21st Ave / Ozark Bridge continuation with the Fulton-gauge ladder, Jackson County still lists Ozark Bridge on the North Fork water-trail access table, and same-day USGS Water Services returned 939 cfs and 5.03 ft at the direct Fulton gauge at 2026-07-06 12:00 CDT."
    },
    "evidenceNotes": [
      {
        "label": "Public put-in",
        "value": "D61 Access on Whitewater Creek",
        "note": "Dubuque County lists D61 Access as a true public canoe/kayak access on Whitewater Creek, and Wisconsin River Trips says paddlers use that access by taking out of the North Fork and moving a short distance up Whitewater Creek.",
        "sourceUrl": "https://dubuquecountyiowa.gov/767/Paddling"
      },
      {
        "label": "Published route report",
        "value": "Whitewater Creek Mouth to 21st Ave / Ozark Bridge, 12.1 mi",
        "note": "Wisconsin River Trips documents the exact Whitewater Creek Mouth to 21st Ave continuation through the bluff-heavy wilderness corridor downstream of Cascade.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/north-fork-maquoketa-river"
      },
      {
        "label": "Public take-out",
        "value": "Ozark Bridge / 21st Ave access area",
        "note": "Jackson County Conservation lists Ozark Bridge on the North Fork water-trail access table, and Jones County describes Ozark Bridge as one of the practical Jackson County take-outs below Cascade.",
        "sourceUrl": "https://www.mycountyparks.com/County/Jackson/Park/Maquoketa-River-Water-Trail"
      },
      {
        "label": "Gauge ladder",
        "value": "231 to 400 cfs broad target",
        "note": "Wisconsin River Trips uses the same Fulton-gauge ladder for the upper wilderness corridor, with less than 150 cfs flagged as too shallow and 701+ cfs pushed into the advanced-only range.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/north-fork-maquoketa-river"
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05418400 at 939 cfs / 5.03 ft",
        "note": "USGS Water Services returned current North Fork Maquoketa River near Fulton values of 939 cfs and 5.03 ft at 2026-07-06 12:00 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05418400/"
      },
      {
        "label": "Endpoint coordinates",
        "value": "42.27778, -90.9371 to 42.19, -90.87",
        "note": "The current D61 and Ozark access anchors come from the already-vetted county access pages and route-report corridor used by adjacent live North Fork routes.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/north-fork-maquoketa-river"
      }
    ],
    "sourceLinks": [
      {
        "label": "Dubuque County paddling access list",
        "url": "https://dubuquecountyiowa.gov/767/Paddling",
        "provider": "local"
      },
      {
        "label": "Jones County North Fork Maquoketa River",
        "url": "https://www.jonescountyiowa.gov/conservation/rivers/maquoketa_river_north_fork/",
        "provider": "local"
      },
      {
        "label": "Jackson County Maquoketa River Water Trail",
        "url": "https://www.mycountyparks.com/County/Jackson/Park/Maquoketa-River-Water-Trail",
        "provider": "local"
      },
      {
        "label": "Wisconsin River Trips North Fork Maquoketa River",
        "url": "https://www.wisconsinrivertrips.com/segments/north-fork-maquoketa-river",
        "provider": "wisconsin_river_trips"
      },
      {
        "label": "USGS 05418400 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05418400/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "north-fork-maquoketa-river-cascade-ozark",
    "slug": "north-fork-maquoketa-river-cascade-ozark",
    "name": "North Fork Maquoketa River",
    "reach": "Cascade Historic Limestone Silo to Ozark Bridge / 21st Ave",
    "aliases": [
      "North Fork Maquoketa River - Cascade to Ozark Bridge",
      "North Fork Maquoketa River - Cascade Historic Limestone Silo to 21st Ave",
      "North Fork Maquoketa River - Cascade wilderness stretch to Ozark"
    ],
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Long North Fork Maquoketa wilderness day from Cascade to Ozark Bridge, with remote Driftless bluffs, boulders, light rapids, and a direct Fulton gauge on a corridor that has few intermediate exits.",
    "statusText": "Use the North Fork Maquoketa near Fulton gauge. Treat 231 to 400 cfs as the broad target window, below 150 cfs as likely too shallow, and 701+ cfs as beyond the normal recreational recommendation.",
    "latitude": 42.29902,
    "longitude": -91.01244,
    "gaugeSource": {
      "id": "usgs-05418400",
      "provider": "usgs",
      "siteId": "05418400",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "North Fork Maquoketa River near Fulton, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05418400/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "dam",
        "strainers",
        "fast_rise",
        "remote",
        "private_banks"
      ],
      "safetyNotes": [
        "Launch from the public concrete ramp below the Cascade dam zone; this full-corridor planner route does not include running or scouting the dam or upstream ledges.",
        "There are very few practical public exits between Cascade and the Jackson County bridge accesses. Have a conservative daylight, shuttle, and bail-out plan before launching.",
        "Fast rises, wood, outside-bend boulders, undeveloped landings, and 24-plus miles of exposure make this an advanced planning route even though the normal-level rapids are mostly Class I."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 231,
      "idealMax": 400,
      "tooLow": 150,
      "tooHigh": 701,
      "thresholdSource": {
        "label": "Wisconsin River Trips North Fork Maquoketa Fulton gauge ladder",
        "url": "https://www.wisconsinrivertrips.com/segments/north-fork-maquoketa-river",
        "provider": "wisconsin_river_trips"
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
      "seasonNotes": "Spring and fall are the best scenery windows. Heavy rain quickly raises the North Fork and makes this long no-bailout day more consequential, while dry late-summer periods turn riffles scrapier and slower.",
      "difficulty": "hard",
      "difficultyNotes": "The whitewater is mostly easy at normal levels, but this is a committed near-20-mile day with no reliable intermediate public exit once you pass the Whitewater Creek mouth and enter the long wooded bluff corridor to Ozark.",
      "confidenceNotes": "Confidence is good for a guarded Iowa add: the City of Cascade still points paddlers to the landing-and-parking corridor south of Riverview Park, Jones County still describes roughly 18 miles between Cascade and the Jackson County Ozark/Caven take-outs, Jackson County lists Ozark Bridge on the water-trail access table, Wisconsin River Trips documents both the Cascade-to-D61 route and the Whitewater-Creek-mouth-to-21st-Ave continuation, and same-day USGS Water Services returned 943 cfs and 5.04 ft at the direct Fulton gauge at 2026-07-06 11:00 CDT."
    },
    "evidenceNotes": [
      {
        "label": "Public launch support",
        "value": "Cascade Historic Limestone Silo / Cascade landing",
        "note": "The City of Cascade says the Riverview Park corridor has a nearby landing and parking area for canoers and kayakers floating south of town, and WRT describes the practical concrete-ramp launch by the historic limestone silo below the dam.",
        "sourceUrl": "https://www.cityofcascade.org/vnews/display.v/ART/5e94c9f386f55"
      },
      {
        "label": "Official long-corridor support",
        "value": "Cascade to Ozark / Caven wilderness stretch, about 18 mi",
        "note": "Jones County describes about 18 miles between Cascade and the Jackson County Ozark Bridge or Caven Bridge take-outs through a long, largely inaccessible wilderness corridor.",
        "sourceUrl": "https://www.jonescountyiowa.gov/conservation/rivers/maquoketa_river_north_fork/"
      },
      {
        "label": "Published continuation mileage",
        "value": "Cascade to D61 plus Whitewater Creek mouth to 21st Ave, about 19.9 mi",
        "note": "Wisconsin River Trips documents Cascade Historic Limestone Silo to D61 at 7.8 miles and Whitewater Creek Mouth to 21st Ave / Ozark Bridge at 12.1 miles, supporting the long Cascade-to-Ozark continuation.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/north-fork-maquoketa-river"
      },
      {
        "label": "Public take-out",
        "value": "Ozark Bridge / 21st Ave access area",
        "note": "Jackson County Conservation lists Ozark Bridge on the North Fork water-trail access table, and the existing Ozark-to-Caven route in this corridor uses those published access-area coordinates.",
        "sourceUrl": "https://www.mycountyparks.com/County/Jackson/Park/Maquoketa-River-Water-Trail"
      },
      {
        "label": "Gauge ladder",
        "value": "231 to 400 cfs broad target",
        "note": "Wisconsin River Trips uses the same Fulton gauge ladder for the scenic upper North Fork corridor, with less than 150 cfs flagged as too shallow and 701+ cfs pushed into the advanced-only range.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/north-fork-maquoketa-river"
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05418400 at 943 cfs / 5.04 ft",
        "note": "USGS Water Services returned current North Fork Maquoketa River near Fulton values of 943 cfs and 5.04 ft at 2026-07-06 11:00 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05418400/"
      }
    ],
    "sourceLinks": [
      {
        "label": "City of Cascade Riverview Park",
        "url": "https://www.cityofcascade.org/vnews/display.v/ART/5e94c9f386f55",
        "provider": "local"
      },
      {
        "label": "Jones County North Fork Maquoketa River",
        "url": "https://www.jonescountyiowa.gov/conservation/rivers/maquoketa_river_north_fork/",
        "provider": "local"
      },
      {
        "label": "Jackson County Maquoketa River Water Trail",
        "url": "https://www.mycountyparks.com/County/Jackson/Park/Maquoketa-River-Water-Trail",
        "provider": "local"
      },
      {
        "label": "Wisconsin River Trips North Fork Maquoketa River",
        "url": "https://www.wisconsinrivertrips.com/segments/north-fork-maquoketa-river",
        "provider": "wisconsin_river_trips"
      },
      {
        "label": "USGS 05418400 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05418400/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "north-fork-maquoketa-river-ozark-caven",
    "slug": "north-fork-maquoketa-river-ozark-caven",
    "name": "North Fork Maquoketa River",
    "reach": "Ozark Bridge / 21st Ave to Caven Bridge Access",
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Short Ozark Wildlife Area run on the North Fork Maquoketa, with steep Driftless bluffs, boulders, easy riffles, and a direct Fulton gauge ladder.",
    "statusText": "Use the North Fork Maquoketa near Fulton gauge. Treat 231 to 400 cfs as the best broad target, below 150 cfs as likely too shallow, and 701+ cfs as beyond the normal recreational recommendation.",
    "latitude": 42.19,
    "longitude": -90.87,
    "gaugeSource": {
      "id": "usgs-05418400",
      "provider": "usgs",
      "siteId": "05418400",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "North Fork Maquoketa River near Fulton, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05418400/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 231,
      "idealMax": 400,
      "tooLow": 150,
      "tooHigh": 701,
      "thresholdSource": {
        "label": "Wisconsin River Trips North Fork Maquoketa Ozark gauge ladder",
        "url": "https://www.wisconsinrivertrips.com/segments/north-fork-maquoketa-river/ozark-wildlife-area",
        "provider": "wisconsin_river_trips"
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
      "seasonNotes": "Spring and fall are the best scenery windows because leaf-off conditions expose more cliffs and boulders. Heavy rain can quickly make the North Fork pushy and turbid, while dry late-summer periods can make riffles too shallow.",
      "difficulty": "moderate",
      "difficultyNotes": "The run is short and mostly Class I at normal levels, but the accesses are undeveloped, the current stays swift, and higher water makes the narrow bends and bridge-area landings less forgiving.",
      "confidenceNotes": "Confidence is good for a guarded Iowa add: Jackson County Conservation lists Ozark Bridge and Caven Bridge Access on the North Fork water trail, Jones County describes the Cascade-to-Ozark/Caven corridor as a scenic paddling stretch, Wisconsin River Trips documents the exact 21st Ave-to-60th Ave Ozark Wildlife Area route and publishes Fulton-gauge cfs bands, and USGS 05418400 is a direct same-river live gauge downstream near Fulton. Coordinates are from Jackson County water-trail table coordinates rounded to two decimals, so paddlers should use posted access signs and the route caveats to find the practical east-bank landings."
    },
    "evidenceNotes": [
      {
        "label": "Official access table",
        "value": "Ozark Bridge and Caven Bridge Access",
        "note": "Jackson County Conservation lists Ozark Bridge as an undeveloped North Fork water-trail access near 21st Ave / 187th Street and Caven Bridge Access at 60th Ave, with coordinates published for both access areas.",
        "sourceUrl": "https://content.mycountyparks.com/Production/RelatedItem/Content/abb43783-a1f1-495a-9490-9542bf53fe5d"
      },
      {
        "label": "County river context",
        "value": "Cascade to Ozark / Caven corridor",
        "note": "Jones County describes the North Fork below Cascade as a remote scenic paddling corridor and says paddlers can take out in Jackson County at Ozark Bridge on 21st Ave or Caven Bridge Access on 60th Ave.",
        "sourceUrl": "https://www.jonescountyiowa.gov/conservation/rivers/maquoketa_river_north_fork/"
      },
      {
        "label": "Published route report",
        "value": "21st Ave / 185th Street to 60th Ave",
        "note": "Wisconsin River Trips documents this 4.4-mile Ozark Wildlife Area route with steep bluffs, boulders, swift current, easy Class I riffles, and undeveloped public east-bank access notes.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/north-fork-maquoketa-river/ozark-wildlife-area"
      },
      {
        "label": "Target range",
        "value": "231 to 400 cfs",
        "note": "WRT treats 231 to 300 cfs as average and good for paddling, and 301 to 400 cfs as above average but still good, using the North Fork Maquoketa River near Fulton gauge.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/north-fork-maquoketa-river/ozark-wildlife-area"
      },
      {
        "label": "Low and high cutoffs",
        "value": "<150 cfs / 701+ cfs",
        "note": "The same route ladder says less than 150 cfs may be too shallow and 701 to 1000 cfs is very high, perhaps only suitable for advanced paddlers; the app uses 701+ cfs as the broad recreational high-water cutoff.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/north-fork-maquoketa-river/ozark-wildlife-area"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 05418400",
        "note": "USGS operates North Fork Maquoketa River near Fulton, IA, a live same-river gauge downstream of the Ozark Wildlife Area route and the gauge used by the route report.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05418400/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Jackson County Maquoketa River Water Trail access table",
        "url": "https://content.mycountyparks.com/Production/RelatedItem/Content/abb43783-a1f1-495a-9490-9542bf53fe5d",
        "provider": "local"
      },
      {
        "label": "Jones County North Fork Maquoketa River",
        "url": "https://www.jonescountyiowa.gov/conservation/rivers/maquoketa_river_north_fork/",
        "provider": "local"
      },
      {
        "label": "Wisconsin River Trips North Fork Maquoketa Ozark Wildlife Area",
        "url": "https://www.wisconsinrivertrips.com/segments/north-fork-maquoketa-river/ozark-wildlife-area",
        "provider": "wisconsin_river_trips"
      },
      {
        "label": "USGS 05418400 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05418400/",
        "provider": "usgs"
      },
      {
        "label": "Jackson County Maquoketa River Water Trail overview",
        "url": "https://www.mycountyparks.com/County/Jackson/Park/Maquoketa-River-Water-Trail",
        "provider": "local"
      }
    ]
  },
  {
    "id": "north-fork-maquoketa-river-d61-caven",
    "slug": "north-fork-maquoketa-river-d61-caven",
    "name": "North Fork Maquoketa River",
    "reach": "D61 Access / Whitewater Creek to Caven Bridge Access",
    "aliases": [
      "North Fork Maquoketa River - D61 to Caven Bridge",
      "North Fork Maquoketa River - Whitewater Creek to 60th Ave",
      "North Fork Maquoketa River - D61 full wilderness continuation"
    ],
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Long North Fork continuation from the Whitewater Creek D61 access to Caven Bridge, combining the isolated Ozark wilderness corridor with the short lower Ozark Wildlife Area finish under one direct Fulton gauge.",
    "statusText": "Use the North Fork Maquoketa near Fulton gauge. Treat 231 to 400 cfs as the broad target window, below 150 cfs as likely too shallow, and 701+ cfs as beyond the normal recreational recommendation.",
    "latitude": 42.27778,
    "longitude": -90.9371,
    "gaugeSource": {
      "id": "usgs-05418400",
      "provider": "usgs",
      "siteId": "05418400",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "North Fork Maquoketa River near Fulton, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05418400/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "remote",
        "private_banks"
      ],
      "safetyNotes": [
        "This full D61-to-Caven continuation combines the long no-bailout middle corridor with the undeveloped Ozark Wildlife Area finish.",
        "Use the Fulton gauge with the trend and recent rain. Wisconsin River Trips pushes 701+ cfs beyond the normal recreational recommendation for both component reaches.",
        "Confirm the east-bank Caven take-out and keep a conservative daylight plan; private banks, campground accesses, and the west bank at Caven are not normal public exits."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 231,
      "idealMax": 400,
      "tooLow": 150,
      "tooHigh": 701,
      "thresholdSource": {
        "label": "Wisconsin River Trips North Fork Maquoketa Fulton gauge ladder",
        "url": "https://www.wisconsinrivertrips.com/segments/north-fork-maquoketa-river",
        "provider": "wisconsin_river_trips"
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
      "seasonNotes": "Spring and fall are the best scenery windows. Heavy rain quickly raises the North Fork and makes this isolated corridor more pushy and muddy, while dry late-summer periods expose more gravel and force slower progress.",
      "difficulty": "hard",
      "difficultyNotes": "The whitewater is still mostly Class I at normal levels, but this is a long, remote day with very limited public exits between D61 and the undeveloped Jackson County bridge accesses.",
      "confidenceNotes": "Confidence is good for a guarded Iowa add: Dubuque County still lists D61 Access as a true public canoe/kayak access on Whitewater Creek, Jackson County still lists both Ozark Bridge and Caven Bridge Access on the North Fork water trail, Wisconsin River Trips still publishes the exact Whitewater Creek-to-Ozark and Ozark-to-Caven route geometry with the same Fulton-gauge ladder, and same-day USGS Water Services returned 939 cfs and 5.03 ft at the direct Fulton gauge at 2026-07-06 12:00 CDT."
    },
    "evidenceNotes": [
      {
        "label": "Public put-in",
        "value": "D61 Access on Whitewater Creek",
        "note": "Dubuque County lists D61 Access as a true public canoe/kayak access on Whitewater Creek, which is the practical launch for the Whitewater-to-Ozark continuation described by Wisconsin River Trips.",
        "sourceUrl": "https://dubuquecountyiowa.gov/767/Paddling"
      },
      {
        "label": "Published route chain",
        "value": "Whitewater Creek Mouth to 21st Ave plus Ozark to Caven, about 16.5 mi",
        "note": "Wisconsin River Trips documents the Whitewater Creek Mouth to 21st Ave / Ozark Bridge continuation at 12.1 miles and the Ozark Wildlife Area route from 21st Ave to 60th Ave / Caven at 4.4 miles, supporting the full D61-to-Caven continuation.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/north-fork-maquoketa-river"
      },
      {
        "label": "Public take-out",
        "value": "Caven Bridge Access / 60th Ave",
        "note": "Jackson County Conservation lists Caven Bridge Access on the North Fork water-trail table and warns that the public take-out is on the east bank where the old bridge crossing used to be.",
        "sourceUrl": "https://content.mycountyparks.com/Production/RelatedItem/Content/abb43783-a1f1-495a-9490-9542bf53fe5d"
      },
      {
        "label": "Gauge ladder",
        "value": "231 to 400 cfs broad target",
        "note": "Wisconsin River Trips uses the same Fulton-gauge ladder for both the Whitewater-to-Ozark and Ozark-to-Caven corridor, with less than 150 cfs flagged as too shallow and 701+ cfs as beyond the normal recreational recommendation.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/north-fork-maquoketa-river/ozark-wildlife-area"
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05418400 at 939 cfs / 5.03 ft",
        "note": "USGS Water Services returned current North Fork Maquoketa River near Fulton values of 939 cfs and 5.03 ft at 2026-07-06 12:00 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05418400/"
      },
      {
        "label": "County corridor support",
        "value": "Ozark and Caven as Jackson County finishes below Cascade",
        "note": "Jones County describes the remote lower North Fork below Cascade and specifically names Ozark Bridge and Caven Bridge Access as the practical downstream Jackson County take-outs.",
        "sourceUrl": "https://www.jonescountyiowa.gov/conservation/rivers/maquoketa_river_north_fork/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Dubuque County paddling access list",
        "url": "https://dubuquecountyiowa.gov/767/Paddling",
        "provider": "local"
      },
      {
        "label": "Jones County North Fork Maquoketa River",
        "url": "https://www.jonescountyiowa.gov/conservation/rivers/maquoketa_river_north_fork/",
        "provider": "local"
      },
      {
        "label": "Jackson County access table PDF",
        "url": "https://content.mycountyparks.com/Production/RelatedItem/Content/abb43783-a1f1-495a-9490-9542bf53fe5d",
        "provider": "local"
      },
      {
        "label": "Wisconsin River Trips North Fork Maquoketa River",
        "url": "https://www.wisconsinrivertrips.com/segments/north-fork-maquoketa-river",
        "provider": "wisconsin_river_trips"
      },
      {
        "label": "Wisconsin River Trips North Fork Maquoketa Ozark Wildlife Area",
        "url": "https://www.wisconsinrivertrips.com/segments/north-fork-maquoketa-river/ozark-wildlife-area",
        "provider": "wisconsin_river_trips"
      },
      {
        "label": "USGS 05418400 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05418400/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "north-fork-maquoketa-river-cascade-caven",
    "slug": "north-fork-maquoketa-river-cascade-caven",
    "name": "North Fork Maquoketa River",
    "reach": "Cascade Historic Limestone Silo to Caven Bridge Access",
    "aliases": [
      "North Fork Maquoketa River - Cascade to Caven Bridge",
      "North Fork Maquoketa River - Cascade full wilderness continuation",
      "North Fork Maquoketa River - Cascade Historic Limestone Silo to 60th Ave"
    ],
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Full North Fork Maquoketa wilderness planner from Cascade to Caven Bridge, combining the scenic Cascade opening, the isolated D61-to-Ozark middle, and the short Ozark Wildlife Area finish under one direct Fulton gauge.",
    "statusText": "Use the North Fork Maquoketa near Fulton gauge. Treat 231 to 400 cfs as the broad target window, below 150 cfs as likely too shallow, and 701+ cfs as beyond the normal recreational recommendation.",
    "latitude": 42.29902,
    "longitude": -91.01244,
    "gaugeSource": {
      "id": "usgs-05418400",
      "provider": "usgs",
      "siteId": "05418400",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "North Fork Maquoketa River near Fulton, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05418400/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "dam",
        "strainers",
        "fast_rise",
        "remote",
        "private_banks"
      ],
      "safetyNotes": [
        "Launch from the public concrete ramp below the Cascade dam zone; this full-corridor planner route does not include running or scouting the dam or upstream ledges.",
        "There are very few practical public exits between Cascade and the Jackson County bridge accesses. Have a conservative daylight, shuttle, and bail-out plan before launching.",
        "Fast rises, wood, outside-bend boulders, undeveloped landings, and 24-plus miles of exposure make this an advanced planning route even though the normal-level rapids are mostly Class I."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 231,
      "idealMax": 400,
      "tooLow": 150,
      "tooHigh": 701,
      "thresholdSource": {
        "label": "Wisconsin River Trips North Fork Maquoketa Fulton gauge ladder",
        "url": "https://www.wisconsinrivertrips.com/segments/north-fork-maquoketa-river",
        "provider": "wisconsin_river_trips"
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
      "seasonNotes": "Spring and fall are the best scenery windows. Heavy rain quickly raises the North Fork and makes this full-corridor route far more consequential, while dry late-summer periods can turn the long middle miles into a scrape-heavy grind.",
      "difficulty": "hard",
      "difficultyNotes": "This is a committed full-day or expert-planned long route. The rapids stay mostly Class I at normal levels, but the 24-mile distance, undeveloped exits, and remote middle miles make it far more serious than the shorter North Fork records.",
      "confidenceNotes": "Confidence is good for a guarded planner-style Iowa add: the City of Cascade still supports the concrete launch below the historic limestone silo, Dubuque County still lists D61 Access as the public Whitewater Creek bridge exit, Jackson County still lists Ozark Bridge and Caven Bridge Access on the same water trail, Wisconsin River Trips still documents the component Cascade-to-D61, Whitewater-to-Ozark, and Ozark-to-Caven route geometry with the Fulton-gauge ladder, and same-day USGS Water Services returned 939 cfs and 5.03 ft at the direct Fulton gauge at 2026-07-06 12:00 CDT."
    },
    "evidenceNotes": [
      {
        "label": "Public launch support",
        "value": "Cascade Historic Limestone Silo / Cascade landing",
        "note": "The City of Cascade still says a landing and parking area near Riverview Park lets canoers and kayakers float the North Fork south of town, and the existing live Cascade routes use the same concrete-ramp launch by the historic silo.",
        "sourceUrl": "https://www.cityofcascade.org/vnews/display.v/ART/5e94c9f386f55"
      },
      {
        "label": "Published route chain",
        "value": "Cascade to D61 plus Whitewater-to-Ozark plus Ozark-to-Caven, about 24.3 mi",
        "note": "Wisconsin River Trips documents Cascade to D61 at 7.8 miles, Whitewater Creek Mouth to 21st Ave / Ozark Bridge at 12.1 miles, and the Ozark Wildlife Area route from 21st Ave to 60th Ave / Caven at 4.4 miles, supporting the full Cascade-to-Caven continuation.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/north-fork-maquoketa-river"
      },
      {
        "label": "County corridor support",
        "value": "Cascade to Ozark / Caven wilderness stretch",
        "note": "Jones County describes the lower North Fork below Cascade as a scenic remote corridor and specifically names the Jackson County Ozark Bridge and Caven Bridge Access take-outs.",
        "sourceUrl": "https://www.jonescountyiowa.gov/conservation/rivers/maquoketa_river_north_fork/"
      },
      {
        "label": "Public take-out",
        "value": "Caven Bridge Access / 60th Ave",
        "note": "Jackson County Conservation lists Caven Bridge Access on the North Fork water-trail table and notes that the public take-out is on the east bank at the old bridge corridor.",
        "sourceUrl": "https://content.mycountyparks.com/Production/RelatedItem/Content/abb43783-a1f1-495a-9490-9542bf53fe5d"
      },
      {
        "label": "Gauge ladder",
        "value": "231 to 400 cfs broad target",
        "note": "Wisconsin River Trips uses the same Fulton-gauge ladder across the North Fork Maquoketa corridor, with less than 150 cfs flagged as too shallow and 701+ cfs as beyond the normal recreational recommendation.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/north-fork-maquoketa-river/ozark-wildlife-area"
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05418400 at 939 cfs / 5.03 ft",
        "note": "USGS Water Services returned current North Fork Maquoketa River near Fulton values of 939 cfs and 5.03 ft at 2026-07-06 12:00 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05418400/"
      }
    ],
    "sourceLinks": [
      {
        "label": "City of Cascade Riverview Park",
        "url": "https://www.cityofcascade.org/vnews/display.v/ART/5e94c9f386f55",
        "provider": "local"
      },
      {
        "label": "Dubuque County paddling access list",
        "url": "https://dubuquecountyiowa.gov/767/Paddling",
        "provider": "local"
      },
      {
        "label": "Jones County North Fork Maquoketa River",
        "url": "https://www.jonescountyiowa.gov/conservation/rivers/maquoketa_river_north_fork/",
        "provider": "local"
      },
      {
        "label": "Jackson County access table PDF",
        "url": "https://content.mycountyparks.com/Production/RelatedItem/Content/abb43783-a1f1-495a-9490-9542bf53fe5d",
        "provider": "local"
      },
      {
        "label": "Wisconsin River Trips North Fork Maquoketa River",
        "url": "https://www.wisconsinrivertrips.com/segments/north-fork-maquoketa-river",
        "provider": "wisconsin_river_trips"
      },
      {
        "label": "Wisconsin River Trips North Fork Maquoketa Ozark Wildlife Area",
        "url": "https://www.wisconsinrivertrips.com/segments/north-fork-maquoketa-river/ozark-wildlife-area",
        "provider": "wisconsin_river_trips"
      },
      {
        "label": "USGS 05418400 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05418400/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "boone-river-riverside-albright",
    "slug": "boone-river-riverside-albright",
    "name": "Boone River",
    "reach": "Riverside Park Access to Albright's Canoe Access",
    "state": "Iowa",
    "region": "North Central Iowa",
    "summary": "Webster City water-trail run from Riverside Park through Briggs Woods to Albright's Canoe Access, with wooded banks, riffles, boulders, and a direct Boone River gauge in the corridor.",
    "statusText": "Use the Boone River near Webster City gauge. Treat 200 cfs as the low floor, 200 to 1,100 cfs as the broad recreational window, and 1,500+ cfs as advanced-only high water.",
    "latitude": 42.4677519,
    "longitude": -93.8118872,
    "gaugeSource": {
      "id": "usgs-05481000",
      "provider": "usgs",
      "siteId": "05481000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Boone River near Webster City, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05481000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 200,
      "idealMax": 1100,
      "tooLow": 200,
      "tooHigh": 1500,
      "thresholdSource": {
        "label": "Hamilton County Boone River touring guidance and Paddling.com trip report",
        "url": "https://portal.mycountyparks.com/Handler.ashx?Item_ID=372BE434-1C3F-4D49-9719-43870481A718",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
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
      "seasonNotes": "Spring and early summer usually offer the best depth. Long dry spells can leave the Boone scrapable around riffles and boulder gardens, while high water makes strainers, low dams, and ledges more consequential.",
      "difficulty": "moderate",
      "difficultyNotes": "The first city reach is generally beginner-friendly at normal levels, but the Briggs Woods-to-Albright section has faster gradient, rocks, boulders, and moderate swiftwater. Treat the full eight-mile combination as a guarded novice-to-intermediate day.",
      "confidenceNotes": "Confidence is good for a mixed official/community Iowa add: Hamilton County's Boone River touring guide names Riverside City Park to Briggs Woods and Briggs Woods to Albright's Canoe Access as consecutive water-trail sections, gives mileage/gradient/hazard notes, and publishes cfs safety guidance. Paddling.com documents the same Webster City park-to-Albright trip with 200 cfs minimum and 200-400 cfs normal-level guidance. Webster City and MyCountyParks confirm public canoe-access context, and USGS 05481000 is a direct live Boone River gauge in the route corridor."
    },
    "evidenceNotes": [
      {
        "label": "Route sections",
        "value": "4.5 mi + 3.6 mi",
        "note": "Hamilton County's Boone River touring guide lists Riverside City Park to Briggs Woods Park at 4.5 miles and Briggs Woods Park to Albright's Canoe Access at 3.6 miles.",
        "sourceUrl": "https://portal.mycountyparks.com/Handler.ashx?Item_ID=372BE434-1C3F-4D49-9719-43870481A718"
      },
      {
        "label": "Public city access",
        "value": "Riverside Park Access",
        "note": "Terrain360 records the DNR source name as Riverside Park Access, and Webster City describes the Boone River Trail corridor as having canoe access and parking.",
        "sourceUrl": "https://www.terrain360.com/trail/riverside-park"
      },
      {
        "label": "Public take-out",
        "value": "Albright's Canoe Access",
        "note": "MyCountyParks says Albright's Canoe Access is an Iowa DNR-owned 11-acre area managed by Hamilton County Conservation and is an excellent area to launch canoes or boats.",
        "sourceUrl": "https://www.mycountyparks.com/County/Hamilton/Park/Albrights-Canoe-Access"
      },
      {
        "label": "Gauge and safety ceiling",
        "value": "<=1,100 cfs novice, 1,500+ cfs advanced",
        "note": "The Hamilton County touring guide tells paddlers to check current Boone River conditions and says 1,100 cfs or below is good for inexperienced canoeists, while 1,500 cfs and above is recommended for advanced canoeists only.",
        "sourceUrl": "https://portal.mycountyparks.com/Handler.ashx?Item_ID=372BE434-1C3F-4D49-9719-43870481A718"
      },
      {
        "label": "Low-water floor",
        "value": "200 cfs minimum",
        "note": "The Paddling.com Boone River trip report recommends at least 200 cfs and describes 200-400 cfs as normal enjoyable levels for the Webster City park to Albright route.",
        "sourceUrl": "https://paddling.com/paddle/trips/boone-river-iowa"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 05481000",
        "note": "USGS operates Boone River near Webster City, IA, with surveyed coordinates in the route corridor downstream of Webster City and upstream of Albright Bridge.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05481000/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Hamilton County Boone River touring information",
        "url": "https://portal.mycountyparks.com/Handler.ashx?Item_ID=372BE434-1C3F-4D49-9719-43870481A718",
        "provider": "local"
      },
      {
        "label": "Paddling.com Boone River in Iowa",
        "url": "https://paddling.com/paddle/trips/boone-river-iowa",
        "provider": "local"
      },
      {
        "label": "Webster City Boone River Trail",
        "url": "https://www.webstercity.com/Facilities/Facility/Details/Boone-River-Trail-14",
        "provider": "local"
      },
      {
        "label": "MyCountyParks Albright's Canoe Access",
        "url": "https://www.mycountyparks.com/County/Hamilton/Park/Albrights-Canoe-Access",
        "provider": "local"
      },
      {
        "label": "USGS 05481000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05481000/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "boone-river-albright-tunnel-mill",
    "slug": "boone-river-albright-tunnel-mill",
    "name": "Boone River",
    "reach": "Albright's Canoe Access to Tunnel Mill Canoe Access",
    "state": "Iowa",
    "region": "North Central Iowa",
    "summary": "Remote lower-Boone continuation below Albright through the fastest-gradient part of the water trail, with Class I-II rapids, boulders, a private Bevers Bridge access to avoid, and a direct Webster City gauge.",
    "statusText": "Use the Boone River near Webster City gauge. Treat 120 cfs as the route-specific low floor, 120 to 1,100 cfs as the guarded recreational window, and 1,500+ cfs as advanced-only high water.",
    "latitude": 42.4054,
    "longitude": -93.8099,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "whitewater",
        "strainers",
        "dam",
        "remote",
        "private_banks"
      ],
      "safetyNotes": [
        "This is the least-paddled, highest-gradient Boone River water-trail segment in the county touring guide. Use groups with moving-water judgment, not first-time paddlers.",
        "Do not use Bevers Bridge as a routine access. Hamilton County notes that Bevers Bridge canoe access is on private property.",
        "Expect Class I-II rapids, wood, boulders, and the abrupt shallow drop from the remains of Tunnel Mill Dam before the take-out."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05481000",
      "provider": "usgs",
      "siteId": "05481000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Boone River near Webster City, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05481000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 120,
      "idealMax": 1100,
      "tooLow": 120,
      "tooHigh": 1500,
      "thresholdSource": {
        "label": "CanWePaddle Boone River Webster-City-to-Stratford range and Hamilton County cfs guidance",
        "url": "https://canwepaddle.com/rivers/iowa/boone-river-webster-city-to-stratford/",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
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
      "seasonNotes": "Spring and early summer usually offer the cleanest depth. Long dry spells expose bony riffles and the Tunnel Mill drop, while rain can quickly make the remote bends and wood more consequential.",
      "difficulty": "moderate",
      "difficultyNotes": "Hamilton County calls this one of the most remote Boone sections and says the first two miles below Albright have the highest gradient on the Boone, with Class I-II rapids that require maneuvering.",
      "confidenceNotes": "Confidence is good for a guarded lower-Boone continuation: Hamilton County touring material names Albright-to-Tunnel Mill, mileage, gradient, private Bevers Bridge caveat, Class I-II rapids, and Tunnel Mill Dam remains; CanWePaddle publishes a Webster-City-to-Stratford range using the same direct gauge; MyCountyParks confirms both Albright and Tunnel Mill public-access context; and USGS Water Services returned fresh same-day values during review."
    },
    "evidenceNotes": [
      {
        "label": "Route segment",
        "value": "Albright to Tunnel Mill, 7.5 mi",
        "note": "Hamilton County touring information lists Albright Canoe Access to Tunnel Mill Canoe Access as a 7.5-mile section with average float time around 3.5 hours in normal conditions.",
        "sourceUrl": "https://portal.mycountyparks.com/Handler.ashx?Item_ID=372BE434-1C3F-4D49-9719-43870481A718"
      },
      {
        "label": "Published range",
        "value": "120 to 1,500 cfs",
        "note": "CanWePaddle publishes an estimated runnable range of 120 to 1,500 cfs for the broader Webster City to Stratford Boone River route using USGS 05481000.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/boone-river-webster-city-to-stratford/"
      },
      {
        "label": "County cfs guidance",
        "value": "<=1,100 cfs novice, 1,500+ cfs advanced",
        "note": "Hamilton County says 1,100 cfs or below is good for inexperienced canoeists and 1,500 cfs and above is recommended for advanced canoeists only.",
        "sourceUrl": "https://portal.mycountyparks.com/Handler.ashx?Item_ID=372BE434-1C3F-4D49-9719-43870481A718"
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05481000 at 147 cfs / 2.12 ft",
        "note": "USGS Water Services returned Boone River near Webster City values of 147 cfs and 2.12 ft at 2026-07-22 18:00 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05481000/"
      },
      {
        "label": "Hazards",
        "value": "Class I-II, Bevers private access, Tunnel Mill Dam remains",
        "note": "Hamilton County describes Class I-II rapids, the private-property status of Bevers Bridge access, and an abrupt shallow drop from Tunnel Mill Dam remains about 4.5 miles below Bevers Bridge.",
        "sourceUrl": "https://portal.mycountyparks.com/Handler.ashx?Item_ID=372BE434-1C3F-4D49-9719-43870481A718"
      }
    ],
    "sourceLinks": [
      {
        "label": "Hamilton County Boone River touring information",
        "url": "https://portal.mycountyparks.com/Handler.ashx?Item_ID=372BE434-1C3F-4D49-9719-43870481A718",
        "provider": "local"
      },
      {
        "label": "Iowa DNR Boone River guide PDF",
        "url": "https://www.iowadnr.gov/media/8883/download?inline=",
        "provider": "local"
      },
      {
        "label": "CanWePaddle Boone River Webster City to Stratford",
        "url": "https://canwepaddle.com/rivers/iowa/boone-river-webster-city-to-stratford/",
        "provider": "local"
      },
      {
        "label": "MyCountyParks Albright's Canoe Access",
        "url": "https://www.mycountyparks.com/County/Hamilton/Park/Albrights-Canoe-Access",
        "provider": "local"
      },
      {
        "label": "MyCountyParks Tunnel Mill Canoe Access",
        "url": "https://www.mycountyparks.com/county/hamilton/Park/Tunnel-Mill-Canoe-Access-Wildlife-Mgmt-Area",
        "provider": "local"
      },
      {
        "label": "USGS 05481000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05481000/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "boone-river-tunnel-mill-bells-mill",
    "slug": "boone-river-tunnel-mill-bells-mill",
    "name": "Boone River",
    "reach": "Tunnel Mill Canoe Access to Bell's Mill Park",
    "state": "Iowa",
    "region": "North Central Iowa",
    "summary": "Short remote Boone River section from the Iowa DNR-owned Tunnel Mill access to Bell's Mill Park, with dense hardwood banks, limited exits, campground-backed take-out logistics, and a direct Webster City gauge.",
    "statusText": "Use the Boone River near Webster City gauge. Treat 120 cfs as the route-specific low floor, 120 to 1,100 cfs as the guarded recreational window, and 1,500+ cfs as advanced-only high water.",
    "latitude": 42.3537,
    "longitude": -93.8189,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "remote",
        "private_banks",
        "fast_rise"
      ],
      "safetyNotes": [
        "This is a short but remote wooded reach with limited bailout options. Keep daylight and shuttle plans conservative.",
        "Hamilton County says this section is known for calm water and remoteness, but downed trees can still block bends after high water.",
        "Use Tunnel Mill and Bell's Mill only; the surrounding river corridor is private-bank country outside marked public areas."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05481000",
      "provider": "usgs",
      "siteId": "05481000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Boone River near Webster City, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05481000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 120,
      "idealMax": 1100,
      "tooLow": 120,
      "tooHigh": 1500,
      "thresholdSource": {
        "label": "CanWePaddle Boone River Webster-City-to-Stratford range and Hamilton County cfs guidance",
        "url": "https://canwepaddle.com/rivers/iowa/boone-river-webster-city-to-stratford/",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
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
      "seasonNotes": "Use this as a spring-through-fall wooded day when the Webster City gauge is in range. Low water can slow the shallow bends, and post-rain rises can carry fresh wood into the narrow channel.",
      "difficulty": "easy",
      "difficultyNotes": "Hamilton County describes Tunnel Mill to Bell's Mill as calmer than the Albright-to-Tunnel reach, but remoteness, wood, and limited exits keep it above a casual park float.",
      "confidenceNotes": "Confidence is good: Hamilton County and Iowa DNR materials name the Tunnel Mill-to-Bell's Mill access pair, distance, route character, campground context, private-bank rules, and cfs guidance; CanWePaddle adds a numeric same-gauge Webster-City-to-Stratford range; MyCountyParks confirms Tunnel Mill and Bell's Mill as public Boone River access areas; and USGS 05481000 is a direct live same-river gauge."
    },
    "evidenceNotes": [
      {
        "label": "Route segment",
        "value": "Tunnel Mill to Bell's Mill, 5.1 mi",
        "note": "Hamilton County touring information lists Tunnel Mill Canoe Access to Bell's Mill Park as a 5.1-mile section with average float time around 2.5 hours in normal conditions.",
        "sourceUrl": "https://portal.mycountyparks.com/Handler.ashx?Item_ID=372BE434-1C3F-4D49-9719-43870481A718"
      },
      {
        "label": "Published range",
        "value": "120 to 1,500 cfs",
        "note": "CanWePaddle publishes an estimated runnable range of 120 to 1,500 cfs for the broader Webster City to Stratford Boone River route using USGS 05481000.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/boone-river-webster-city-to-stratford/"
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05481000 at 147 cfs / 2.12 ft",
        "note": "USGS Water Services returned Boone River near Webster City values of 147 cfs and 2.12 ft at 2026-07-22 18:00 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05481000/"
      },
      {
        "label": "Access support",
        "value": "Tunnel Mill and Bell's Mill public areas",
        "note": "MyCountyParks says Tunnel Mill provides river access and parking for vehicles and canoe trailers, while Bell's Mill Park is on the Boone River with a concrete boat ramp, parking, restrooms, and campground context.",
        "sourceUrl": "https://www.mycountyparks.com/county/hamilton/Park/Tunnel-Mill-Canoe-Access-Wildlife-Mgmt-Area"
      },
      {
        "label": "Route character",
        "value": "Remote hardwood corridor",
        "note": "Hamilton County says this section is lined with dense hardwood forest, has a high elevation change, and is probably the most remote Boone section because of limited access.",
        "sourceUrl": "https://portal.mycountyparks.com/Handler.ashx?Item_ID=372BE434-1C3F-4D49-9719-43870481A718"
      }
    ],
    "sourceLinks": [
      {
        "label": "Hamilton County Boone River touring information",
        "url": "https://portal.mycountyparks.com/Handler.ashx?Item_ID=372BE434-1C3F-4D49-9719-43870481A718",
        "provider": "local"
      },
      {
        "label": "Iowa DNR Boone River guide PDF",
        "url": "https://www.iowadnr.gov/media/8883/download?inline=",
        "provider": "local"
      },
      {
        "label": "CanWePaddle Boone River Webster City to Stratford",
        "url": "https://canwepaddle.com/rivers/iowa/boone-river-webster-city-to-stratford/",
        "provider": "local"
      },
      {
        "label": "MyCountyParks Tunnel Mill Canoe Access",
        "url": "https://www.mycountyparks.com/county/hamilton/Park/Tunnel-Mill-Canoe-Access-Wildlife-Mgmt-Area",
        "provider": "local"
      },
      {
        "label": "MyCountyParks Bell's Mill Park",
        "url": "https://www.mycountyparks.com/county/hamilton/park/bells-mill-park",
        "provider": "local"
      },
      {
        "label": "USGS 05481000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05481000/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "boone-river-bells-mill-boone-forks",
    "slug": "boone-river-bells-mill-boone-forks",
    "name": "Boone River",
    "reach": "Bell's Mill Park to Boone Forks Wildlife Area",
    "state": "Iowa",
    "region": "North Central Iowa",
    "summary": "Final Boone River water-trail leg from Bell's Mill Park to the Boone Forks canoe ramp above the Des Moines River confluence, with sandy bottom, strainers, a hidden walk-down take-out, and no downstream bailout.",
    "statusText": "Use the Boone River near Webster City gauge. Treat 120 cfs as the route-specific low floor, 120 to 1,100 cfs as the guarded recreational window, and 1,500+ cfs as advanced-only high water.",
    "latitude": 42.3464,
    "longitude": -93.8847,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "remote",
        "private_banks",
        "fast_rise"
      ],
      "safetyNotes": [
        "Identify Boone Forks before launch. Iowa DNR says the take-out can be hidden by vegetation or flood-deposited wood and there are no take-out opportunities after Boone Forks.",
        "Expect long sandy-bottom stretches with downed trees. Low water can be slow, and high water reduces time to avoid wood.",
        "Boone Forks is the route boundary. Do not drift toward the Des Moines River confluence without a separate big-river plan."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05481000",
      "provider": "usgs",
      "siteId": "05481000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Boone River near Webster City, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05481000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 120,
      "idealMax": 1100,
      "tooLow": 120,
      "tooHigh": 1500,
      "thresholdSource": {
        "label": "CanWePaddle Boone River Webster-City-to-Stratford range and Hamilton County cfs guidance",
        "url": "https://canwepaddle.com/rivers/iowa/boone-river-webster-city-to-stratford/",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
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
      "seasonNotes": "This lower finish is most attractive in normal spring-through-fall flows. Very low water can expose long sandy shallows, and high or rising water can hide the take-out and load the banks with fresh wood.",
      "difficulty": "easy",
      "difficultyNotes": "The water is generally easier than the upstream Albright/Tunnel section, but the hidden take-out, no downstream bailout, strainers, and confluence proximity require disciplined trip planning.",
      "confidenceNotes": "Confidence is good: Hamilton County and Iowa DNR materials name Bell's Mill-to-Boone Forks, distance, sandy-bottom character, strainer risk, endpoint camping/ramp context, and the no-downstream-take-out warning; the Iowa DNR Boone Forks canoe ramp plans publish exact ramp coordinates; CanWePaddle publishes a same-gauge Webster-City-to-Stratford range; and USGS 05481000 is a direct live Boone River gauge."
    },
    "evidenceNotes": [
      {
        "label": "Route segment",
        "value": "Bell's Mill to Boone Forks, 5.1 mi",
        "note": "Hamilton County touring information lists Bell's Mill Park to Boone Forks Wildlife Area as a 5.1-mile section with average float time around 2.5 hours in normal conditions.",
        "sourceUrl": "https://portal.mycountyparks.com/Handler.ashx?Item_ID=372BE434-1C3F-4D49-9719-43870481A718"
      },
      {
        "label": "Published range",
        "value": "120 to 1,500 cfs",
        "note": "CanWePaddle publishes an estimated runnable range of 120 to 1,500 cfs for the broader Webster City to Stratford Boone River route using USGS 05481000.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/boone-river-webster-city-to-stratford/"
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05481000 at 147 cfs / 2.12 ft",
        "note": "USGS Water Services returned Boone River near Webster City values of 147 cfs and 2.12 ft at 2026-07-22 18:00 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05481000/"
      },
      {
        "label": "Take-out warning",
        "value": "No take-out after Boone Forks",
        "note": "Iowa DNR's Boone River guide says Boone Forks is a walk-down access that may be hidden by vegetation or dead wood and warns there are no take-out opportunities after Boone Forks.",
        "sourceUrl": "https://www.iowadnr.gov/media/8883/download?inline="
      },
      {
        "label": "Take-out coordinates",
        "value": "42.312497, -93.933272",
        "note": "Iowa DNR Boone Forks canoe-ramp project plans publish the ramp location as latitude 42°18'44.99\"N and longitude 93°55'59.78\"W.",
        "sourceUrl": "https://programs.iowadnr.gov/engreal/documents/attachments/2018626740580.15.02.94.08%20Boone%20Forks%20Canoe%20Ramp%20Project.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "Hamilton County Boone River touring information",
        "url": "https://portal.mycountyparks.com/Handler.ashx?Item_ID=372BE434-1C3F-4D49-9719-43870481A718",
        "provider": "local"
      },
      {
        "label": "Iowa DNR Boone River guide PDF",
        "url": "https://www.iowadnr.gov/media/8883/download?inline=",
        "provider": "local"
      },
      {
        "label": "Iowa DNR Boone Forks canoe ramp plans",
        "url": "https://programs.iowadnr.gov/engreal/documents/attachments/2018626740580.15.02.94.08%20Boone%20Forks%20Canoe%20Ramp%20Project.pdf",
        "provider": "local"
      },
      {
        "label": "CanWePaddle Boone River Webster City to Stratford",
        "url": "https://canwepaddle.com/rivers/iowa/boone-river-webster-city-to-stratford/",
        "provider": "local"
      },
      {
        "label": "MyCountyParks Bell's Mill Park",
        "url": "https://www.mycountyparks.com/county/hamilton/park/bells-mill-park",
        "provider": "local"
      },
      {
        "label": "USGS 05481000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05481000/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "cedar-river-road-t38-idlewild",
    "slug": "cedar-river-road-t38-idlewild",
    "name": "Cedar River",
    "reach": "Road T38 Access to Idlewild Park Access",
    "state": "Iowa",
    "region": "North Central Iowa",
    "summary": "Middle Cedar River water-trail leg from the Osage-area Road T38 access to Idlewild Park north of Floyd, with a deeper, quicker free-flowing channel, spring-fed tributaries, limestone-country scenery, and a conservative Charles City gauge floor.",
    "statusText": "Use the Cedar River at Charles City gauge as the closest route-ready signal. Treat 200 cfs as the minimum floor and 400 to 600 cfs as the better guide-published range; above that, expect faster current and more consequential wood or bridge landings rather than an inferred ideal/high cutoff.",
    "latitude": 43.253006,
    "longitude": -92.811759,
    "gaugeSource": {
      "id": "usgs-05457700",
      "provider": "usgs",
      "siteId": "05457700",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Cedar River at Charles City, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05457700/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "Use the Charles City gauge as a route-corridor signal, then make a visual call at the launch because local rain and upstream tributaries can change conditions.",
        "Stay with named public accesses. Mitchell County Conservation warns adjacent land is private and sandbar camping or trespassing is not permitted.",
        "High or rising water makes wood, bridge approaches, and landings more consequential even though no full high-water cutoff is published for these flatwater segments."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Cedar River Paddling Trips Charles City gauge guidance",
        "url": "https://media.rainpos.com/8576/cedar_river_flatwater_paddling_trips.pdf",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
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
      "seasonNotes": "Spring, early summer, and post-rain windows usually provide the best depth. The guide says 400 to 600 cfs is the better range, while lower water can scrape and higher water can make the current faster without giving a route-specific high cutoff.",
      "difficulty": "easy",
      "difficultyNotes": "This is a flatwater/moving-water Cedar River day at normal levels. Treat it as caution rather than beginner-default because the gauge is downstream, wood moves after storms, and public exits are limited between named accesses.",
      "confidenceNotes": "Confidence is good for a guarded Iowa minimum-only add: the Cedar River Paddling Trips guide covers this access chain, gives exact coordinates and mileage for Road T38 and Idlewild Park, and publishes a Charles City USGS gauge floor for the broader 50-mile Cedar River trip set. Mitchell County Conservation confirms the Cedar River Water Trail has designated access points and Iowa DNR lists the Cedar as a state water trail. The gauge is downstream at Charles City, so the card stays minimum-only and requires same-day visual judgment upstream of Floyd."
    },
    "evidenceNotes": [
      {
        "label": "Route shape",
        "value": "10.1 miles",
        "note": "The Cedar River Paddling Trips guide lists Road T38 Access as 10.1 miles upstream of Idlewild Park Access and says the river deepens and picks up speed below Road T38.",
        "sourceUrl": "https://media.rainpos.com/8576/cedar_river_flatwater_paddling_trips.pdf"
      },
      {
        "label": "Endpoint coordinates",
        "value": "43.253006, -92.811759 to 43.1633388, -92.7540921",
        "note": "The guide publishes GPS coordinates and address context for Road T38 Access south of Osage and Idlewild Park Access north of Floyd.",
        "sourceUrl": "https://media.rainpos.com/8576/cedar_river_flatwater_paddling_trips.pdf"
      },
      {
        "label": "Gauge floor",
        "value": "200 cfs minimum; 400-600 cfs better",
        "note": "The guide directs paddlers to USGS 05457700 at Charles City and says 200 cfs is preferable for adequate levels, with 400 to 600 cfs a better range.",
        "sourceUrl": "https://media.rainpos.com/8576/cedar_river_flatwater_paddling_trips.pdf"
      },
      {
        "label": "Live gauge check",
        "value": "1,820 cfs / 4.56 ft",
        "note": "USGS Water Services returned current Cedar River at Charles City values of 1,820 cfs and 4.56 ft at 2026-07-22 16:15 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05457700/"
      },
      {
        "label": "Water-trail context",
        "value": "Mitchell County Cedar River Water Trail",
        "note": "Mitchell County Conservation says the Cedar River Water Trail has designated access points and six main reaches, while Iowa DNR lists the Cedar River as a 52.9-mile designated Iowa water trail.",
        "sourceUrl": "https://www.iowadnr.gov/places-go/water-trails"
      },
      {
        "label": "Hazards",
        "value": "Faster water, private banks, low-water rocks",
        "note": "The guide says the channel picks up speed below Road T38; Mitchell County warns adjacent land remains private and camping on sandbars or trespassing is not permitted.",
        "sourceUrl": "https://media.rainpos.com/8576/cedar_river_flatwater_paddling_trips.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "Cedar River Paddling Trips guide",
        "url": "https://media.rainpos.com/8576/cedar_river_flatwater_paddling_trips.pdf",
        "provider": "local"
      },
      {
        "label": "Mitchell County Cedar River Water Trail",
        "url": "https://mitchellcountyconservation.com/cedar-river-water-trail/",
        "provider": "local"
      },
      {
        "label": "Iowa DNR Water Trails",
        "url": "https://www.iowadnr.gov/places-go/water-trails",
        "provider": "local"
      },
      {
        "label": "USGS 05457700 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05457700/",
        "provider": "usgs"
      },
      {
        "label": "City of Nashua Cedar River float access",
        "url": "https://www.cityofnashuaia.com/float",
        "provider": "local"
      }
    ]
  },
  {
    "id": "cedar-river-idlewild-rotary",
    "slug": "cedar-river-idlewild-rotary",
    "name": "Cedar River",
    "reach": "Idlewild Park Access to Rotary Park Access",
    "state": "Iowa",
    "region": "North Central Iowa",
    "summary": "Scenic Floyd County Cedar River run from Idlewild Park toward Charles City, with the guide calling out picturesque fishing water, limestone-country scenery, wildlife, and a direct downstream Charles City gauge floor.",
    "statusText": "Use the Cedar River at Charles City gauge. Treat 200 cfs as the minimum floor and 400 to 600 cfs as the better guide-published range; above that, expect swifter current and fewer forgiving wood/bridge recovery windows.",
    "latitude": 43.1633388,
    "longitude": -92.7540921,
    "gaugeSource": {
      "id": "usgs-05457700",
      "provider": "usgs",
      "siteId": "05457700",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Cedar River at Charles City, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05457700/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "Use the Charles City gauge as a route-corridor signal, then make a visual call at the launch because local rain and upstream tributaries can change conditions.",
        "Stay with named public accesses. Mitchell County Conservation warns adjacent land is private and sandbar camping or trespassing is not permitted.",
        "High or rising water makes wood, bridge approaches, and landings more consequential even though no full high-water cutoff is published for these flatwater segments."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Cedar River Paddling Trips Charles City gauge guidance",
        "url": "https://media.rainpos.com/8576/cedar_river_flatwater_paddling_trips.pdf",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
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
      "seasonNotes": "Spring, early summer, and post-rain windows usually provide the best depth. The guide says 400 to 600 cfs is the better range, while lower water can scrape and higher water can make the current faster without giving a route-specific high cutoff.",
      "difficulty": "easy",
      "difficultyNotes": "This is a flatwater/moving-water Cedar River day at normal levels. Treat it as caution rather than beginner-default because the gauge is downstream, wood moves after storms, and public exits are limited between named accesses.",
      "confidenceNotes": "Confidence is good for a conservative Iowa add: the Cedar River Paddling Trips guide names Idlewild Park and Rotary Park, provides coordinates, mileage, route character, and the Charles City gauge guidance for this same access chain. The route is upstream of the gauge, so no high cutoff or full ideal model is inferred."
    },
    "evidenceNotes": [
      {
        "label": "Route shape",
        "value": "5.6 miles",
        "note": "The Cedar River Paddling Trips guide lists Idlewild Park Access as 5.6 miles upstream of Rotary Park Access.",
        "sourceUrl": "https://media.rainpos.com/8576/cedar_river_flatwater_paddling_trips.pdf"
      },
      {
        "label": "Route character",
        "value": "Picturesque Floyd reach",
        "note": "The guide says the next 3.5 miles downstream to the Highway 218 bridge at Floyd have good fishing water and picturesque scenery before the river enters wider flood plain.",
        "sourceUrl": "https://media.rainpos.com/8576/cedar_river_flatwater_paddling_trips.pdf"
      },
      {
        "label": "Endpoint coordinates",
        "value": "43.1633388, -92.7540921 to 43.1164289, -92.7065420",
        "note": "The guide publishes GPS coordinates and address context for Idlewild Park Access and Rotary Park Access.",
        "sourceUrl": "https://media.rainpos.com/8576/cedar_river_flatwater_paddling_trips.pdf"
      },
      {
        "label": "Gauge floor",
        "value": "200 cfs minimum; 400-600 cfs better",
        "note": "The guide names the Charles City USGS station and gives 200 cfs as preferable for adequate levels, with 400 to 600 cfs a better range.",
        "sourceUrl": "https://media.rainpos.com/8576/cedar_river_flatwater_paddling_trips.pdf"
      },
      {
        "label": "Live gauge check",
        "value": "1,820 cfs / 4.56 ft",
        "note": "USGS Water Services returned current Cedar River at Charles City values of 1,820 cfs and 4.56 ft at 2026-07-22 16:15 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05457700/"
      },
      {
        "label": "Public water-trail context",
        "value": "Designated Iowa water trail",
        "note": "Iowa DNR lists the Cedar River as a designated Iowa water trail, and Mitchell County describes designated access points on the upper Cedar water trail.",
        "sourceUrl": "https://www.iowadnr.gov/places-go/water-trails"
      }
    ],
    "sourceLinks": [
      {
        "label": "Cedar River Paddling Trips guide",
        "url": "https://media.rainpos.com/8576/cedar_river_flatwater_paddling_trips.pdf",
        "provider": "local"
      },
      {
        "label": "Mitchell County Cedar River Water Trail",
        "url": "https://mitchellcountyconservation.com/cedar-river-water-trail/",
        "provider": "local"
      },
      {
        "label": "Iowa DNR Water Trails",
        "url": "https://www.iowadnr.gov/places-go/water-trails",
        "provider": "local"
      },
      {
        "label": "USGS 05457700 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05457700/",
        "provider": "usgs"
      },
      {
        "label": "City of Nashua Cedar River float access",
        "url": "https://www.cityofnashuaia.com/float",
        "provider": "local"
      }
    ]
  },
  {
    "id": "cedar-river-rotary-charles-city-dock",
    "slug": "cedar-river-rotary-charles-city-dock",
    "name": "Cedar River",
    "reach": "Rotary Park Access to Charles City Dock",
    "state": "Iowa",
    "region": "North Central Iowa",
    "summary": "Final flatwater approach into Charles City from Rotary Park to the downtown dock above Main Street Dam, with wildlife water, city services at the finish, and a direct take-out-corridor USGS gauge.",
    "statusText": "Use the Cedar River at Charles City gauge in the take-out corridor. Treat 200 cfs as the minimum floor and 400 to 600 cfs as the better guide-published range; above that, expect pushier current approaching the mandatory downtown dam take-out.",
    "latitude": 43.1164289,
    "longitude": -92.706542,
    "gaugeSource": {
      "id": "usgs-05457700",
      "provider": "usgs",
      "siteId": "05457700",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Cedar River at Charles City, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05457700/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "Use the Charles City gauge as a route-corridor signal, then make a visual call at the launch because local rain and upstream tributaries can change conditions.",
        "Stay with named public accesses. Mitchell County Conservation warns adjacent land is private and sandbar camping or trespassing is not permitted.",
        "High or rising water makes wood, bridge approaches, and landings more consequential even though no full high-water cutoff is published for these flatwater segments."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Cedar River Paddling Trips Charles City gauge guidance",
        "url": "https://media.rainpos.com/8576/cedar_river_flatwater_paddling_trips.pdf",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
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
      "seasonNotes": "Spring, early summer, and post-rain windows usually provide the best depth. The guide says 400 to 600 cfs is the better range, while lower water can scrape and higher water can make the current faster without giving a route-specific high cutoff.",
      "difficulty": "easy",
      "difficultyNotes": "This is a flatwater/moving-water Cedar River day at normal levels. Treat it as caution rather than beginner-default because the gauge is downstream, wood moves after storms, and public exits are limited between named accesses.",
      "confidenceNotes": "Confidence is strong for a minimum-only Iowa flatwater card: the Cedar River Paddling Trips guide documents Rotary Park to Charles City Dock, the downtown take-out above Main Street Dam, route mileage, coordinates, wildlife context, and the exact Charles City USGS gauge. The route has a high-consequence dam immediately below the take-out, so the card emphasizes mandatory take-out discipline and does not route casual paddlers into the existing whitewater/dam portage complex."
    },
    "evidenceNotes": [
      {
        "label": "Route shape",
        "value": "6.6 miles",
        "note": "The Cedar River Paddling Trips guide lists Rotary Park Access as 6.6 miles upstream of Charles City Dock.",
        "sourceUrl": "https://media.rainpos.com/8576/cedar_river_flatwater_paddling_trips.pdf"
      },
      {
        "label": "Mandatory take-out",
        "value": "Above Main Street Dam",
        "note": "The guide says the take-out is on river right above the Main Street Dam in Charles City and notes the dam can be portaged only with a separate downstream plan.",
        "sourceUrl": "https://media.rainpos.com/8576/cedar_river_flatwater_paddling_trips.pdf"
      },
      {
        "label": "Endpoint coordinates",
        "value": "43.1164289, -92.7065420 to 43.0663169, -92.6811147",
        "note": "The guide publishes GPS coordinates for Rotary Park Access and the Charles City Dock.",
        "sourceUrl": "https://media.rainpos.com/8576/cedar_river_flatwater_paddling_trips.pdf"
      },
      {
        "label": "Gauge floor",
        "value": "200 cfs minimum; 400-600 cfs better",
        "note": "The guide directs paddlers to USGS 05457700 at Charles City and gives the Cedar trip-family floor and better range.",
        "sourceUrl": "https://media.rainpos.com/8576/cedar_river_flatwater_paddling_trips.pdf"
      },
      {
        "label": "Live gauge check",
        "value": "1,820 cfs / 4.56 ft",
        "note": "USGS Water Services returned current Cedar River at Charles City values of 1,820 cfs and 4.56 ft at 2026-07-22 16:15 CDT.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05457700/"
      },
      {
        "label": "Public city context",
        "value": "Downtown services and whitewater below",
        "note": "The guide places the dock downtown near services and identifies the whitewater course just downriver, while the City of Nashua independently describes Charles City-to-Nashua access continuity.",
        "sourceUrl": "https://media.rainpos.com/8576/cedar_river_flatwater_paddling_trips.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "Cedar River Paddling Trips guide",
        "url": "https://media.rainpos.com/8576/cedar_river_flatwater_paddling_trips.pdf",
        "provider": "local"
      },
      {
        "label": "Mitchell County Cedar River Water Trail",
        "url": "https://mitchellcountyconservation.com/cedar-river-water-trail/",
        "provider": "local"
      },
      {
        "label": "Iowa DNR Water Trails",
        "url": "https://www.iowadnr.gov/places-go/water-trails",
        "provider": "local"
      },
      {
        "label": "USGS 05457700 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05457700/",
        "provider": "usgs"
      },
      {
        "label": "City of Nashua Cedar River float access",
        "url": "https://www.cityofnashuaia.com/float",
        "provider": "local"
      }
    ]
  },
  {
    "id": "cedar-river-charles-city-whitewater",
    "slug": "cedar-river-charles-city-whitewater",
    "name": "Cedar River",
    "reach": "Charles City Whitewater Park",
    "state": "Iowa",
    "region": "North Central Iowa",
    "summary": "Downtown Charles City play-park run on the Cedar River, with a signed public whitewater/kayak area, three constructed features, large eddies, and a direct USGS gauge.",
    "statusText": "Use the Cedar River at Charles City gauge. Treat 2,000 to 4,000 cfs as the prime all-feature window, 500 cfs as the practical low floor, and 8,000+ cfs as expert-only high water with poor eddy access.",
    "latitude": 43.064968,
    "longitude": -92.677829,
    "routeType": "whitewater",
    "gaugeSource": {
      "id": "usgs-05457700",
      "provider": "usgs",
      "siteId": "05457700",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Cedar River at Charles City, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05457700/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "dam",
        "whitewater",
        "fast_rise"
      ],
      "safetyNotes": [
        "Legitimate whitewater park with published feature guidance, but Iowa Whitewater warns a large dangerous dam upstream should be avoided.",
        "Above 8,000 cfs, eddy access is limited and features become random waves or holes requiring solid whitewater skill.",
        "Scout posted conditions and use whitewater-appropriate PFD, helmet, skill, and rescue margin."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 2000,
      "idealMax": 4000,
      "tooLow": 500,
      "tooHigh": 8000,
      "thresholdSource": {
        "label": "Iowa Whitewater Charles City level guidance",
        "url": "https://www.iowawhitewater.org/featurePage.php?pageId=charlesCity",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
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
      "seasonNotes": "The park is open year-round, but American Whitewater notes the rain-fed course is generally best in spring and early summer, can come back with fall rain, and is commonly lowest in late July through September.",
      "difficulty": "hard",
      "difficultyNotes": "The city lists the 1,200-foot whitewater/kayak area as Class II-III. Large eddies make laps manageable at normal levels, but the constructed features are still whitewater; helmets, PFDs, swimming ability, and feature-specific judgment matter.",
      "confidenceNotes": "Confidence is high for a whitewater-play route: the City of Charles City identifies Riverside Park as a public Cedar River whitewater/kayak area with a canoe/boat launch, Iowa Whitewater publishes the put-in/take-out GPS coordinate, direct USGS 05457700 gauge, usable/prime/high-water bands, and upstream dam warning, and American Whitewater documents the exact 0.3-mile Charles City Whitewater reach with feature-specific flow behavior. The app treats this as a play-park route rather than a downstream float."
    },
    "evidenceNotes": [
      {
        "label": "Public park access",
        "value": "Riverside Park whitewater / kayak area",
        "note": "Charles City lists Riverside Park along the downtown Cedar River and names a 1,200-foot whitewater/kayak area, canoe/boat launch, and other public park amenities.",
        "sourceUrl": "https://www.cityofcharlescity.org/facilities/facility/details/Riverside-Park-8"
      },
      {
        "label": "Access coordinates",
        "value": "43.064968, -92.677829",
        "note": "Iowa Whitewater publishes the put-in and take-out GPS coordinate for Charles City Whitewater Park, matching the downtown Riverfront/Riverside Park course area.",
        "sourceUrl": "https://www.iowawhitewater.org/featurePage.php?pageId=charlesCity"
      },
      {
        "label": "Prime range",
        "value": "2,000 to 4,000 cfs",
        "note": "Iowa Whitewater says the features are usable from 500 to 8,000 cfs and gives 2,000 to 4,000 cfs as the prime river-level range for all three features.",
        "sourceUrl": "https://www.iowawhitewater.org/featurePage.php?pageId=charlesCity"
      },
      {
        "label": "High-water cutoff",
        "value": "8,000+ cfs",
        "note": "Iowa Whitewater warns that above 8,000 cfs there is minimal eddy access and the features become random whitewater waves and holes requiring solid whitewater skills.",
        "sourceUrl": "https://www.iowawhitewater.org/featurePage.php?pageId=charlesCity"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 05457700",
        "note": "USGS operates the Cedar River at Charles City monitoring location, and Iowa Whitewater names USGS 05457700 as the applicable gauge for the whitewater park.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05457700/"
      },
      {
        "label": "AW reach context",
        "value": "0.3 mi Class II(III)",
        "note": "American Whitewater identifies the Charles City Whitewater reach as a 0.3-mile Cedar River run with three features, rain-fed flows, and feature-specific behavior across the Charles City gauge range.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/10267/main"
      }
    ],
    "sourceLinks": [
      {
        "label": "Iowa Whitewater Charles City Whitewater Park",
        "url": "https://www.iowawhitewater.org/featurePage.php?pageId=charlesCity",
        "provider": "local"
      },
      {
        "label": "City of Charles City Riverside Park",
        "url": "https://www.cityofcharlescity.org/facilities/facility/details/Riverside-Park-8",
        "provider": "local"
      },
      {
        "label": "American Whitewater Cedar - Charles City Whitewater",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/10267/main",
        "provider": "american_whitewater"
      },
      {
        "label": "USGS 05457700 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05457700/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "cedar-river-charles-city-nashua",
    "slug": "cedar-river-charles-city-nashua",
    "name": "Cedar River",
    "reach": "Charles City Dock to Nashua Access",
    "state": "Iowa",
    "region": "North Iowa",
    "summary": "Twelve-mile Cedar River continuation from downtown Charles City to Nashua, with official/local access notes, Nashua dam caveats, and the direct Charles City gauge.",
    "statusText": "Use the Cedar River at Charles City gauge. CanWePaddle estimates 200 to 2,500 cfs for Charles City to Nashua; take out above the Nashua dam and avoid high, fast, or debris-laden water.",
    "latitude": 43.064968,
    "longitude": -92.677829,
    "gaugeSource": {
      "id": "usgs-05457700",
      "provider": "usgs",
      "siteId": "05457700",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Cedar River at Charles City, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05457700/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "dam",
        "mandatory_takeout",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "Take out at Nashua Access / Cedar Lake Park above the Nashua dam; do not drift into the dam or assume the below-dam access is part of this route.",
        "The Charles City whitewater course is immediately upstream of the default put-in area. Scout and use the flatwater launch plan unless the group intentionally wants whitewater.",
        "The direct Charles City gauge cannot show floating wood, impoundment wind near Cedar Lake, or temporary access closures."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 200,
      "idealMax": 2500,
      "tooLow": 200,
      "tooHigh": 2500,
      "thresholdSource": {
        "label": "CanWePaddle Charles City to Nashua estimated range",
        "url": "https://canwepaddle.com/rivers/iowa/cedar-river-charles-city-to-nashua/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "CanWePaddle identifies May through September as the normal season. The route can be slow near the Nashua impoundment at low water and pushy after rain.",
      "difficulty": "easy",
      "difficultyNotes": "CanWePaddle rates the reach Class I. The route remains a caution card because it begins below a whitewater/dam corridor and finishes at a mandatory above-dam take-out in Nashua.",
      "confidenceNotes": "Confidence is good: the Cedar River Paddling Trips guide and City of Nashua both identify Charles City-to-Nashua as a normal public float; the guide publishes Nashua Access coordinates, route mileages, the portage-dam warning, and the Charles City gauge context; CanWePaddle ties the exact reach to USGS 05457700 with a 200-2,500 cfs range; and USGS Water Services returned current Charles City data during this run."
    },
    "evidenceNotes": [
      {
        "label": "Current gauge check",
        "value": "1,680 cfs / 4.37 ft at 2026-07-22 22:15 CDT",
        "note": "USGS Water Services returned current Charles City discharge and stage during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05457700&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold range",
        "value": "200-2,500 cfs",
        "note": "CanWePaddle ties Charles City-to-Nashua to USGS 05457700 and estimates a 200 to 2,500 cfs runnable window.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/cedar-river-charles-city-to-nashua/"
      },
      {
        "label": "Route shape",
        "value": "About 12 miles / about 6 hours",
        "note": "The Cedar River Paddling Trips materials map Charles City to Howard Woods as 10 miles and Howard Woods to Nashua Access as 2.5 miles; City of Nashua describes Memorial Park to Veterans Memorial Park as about a 6-hour kayak/canoe trip.",
        "sourceUrl": "https://media.rainpos.com/8576/cedar_river_flatwater_paddling_trips.pdf"
      },
      {
        "label": "Take-out support",
        "value": "Nashua Access / Cedar Lake Park",
        "note": "The paddling guide names Nashua Access at Cedar Lake Park, publishes coordinates, and warns to portage the dam on river left.",
        "sourceUrl": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf"
      },
      {
        "label": "Local access support",
        "value": "Charles City to Nashua public float",
        "note": "City of Nashua says user-friendly Charles City access points lead to Cedar Lake, where paddlers can exit at Cedar View, Lakeshore, or Veterans Memorial Park.",
        "sourceUrl": "https://www.cityofnashuaia.com/float"
      }
    ],
    "sourceLinks": [
      {
        "label": "CanWePaddle Cedar River Charles City to Nashua",
        "url": "https://canwepaddle.com/rivers/iowa/cedar-river-charles-city-to-nashua/",
        "provider": "local"
      },
      {
        "label": "Cedar River flatwater paddling trips guide",
        "url": "https://media.rainpos.com/8576/cedar_river_flatwater_paddling_trips.pdf",
        "provider": "local"
      },
      {
        "label": "Cedar River Otranto to Janesville guide",
        "url": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf",
        "provider": "local"
      },
      {
        "label": "City of Nashua Cedar River float",
        "url": "https://www.cityofnashuaia.com/float",
        "provider": "local"
      },
      {
        "label": "USGS 05457700 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05457700/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "cedar-river-nashua-pearl-rock",
    "slug": "cedar-river-nashua-pearl-rock",
    "name": "Cedar River",
    "reach": "Nashua below-dam access to Pearl Rock",
    "state": "Iowa",
    "region": "North Iowa",
    "summary": "Short Cedar River water-trail leg from the Nashua dam portage corridor to Pearl Rock, using the Waverly gauge as a downstream same-river signal and published Cedar paddling-guide access notes.",
    "statusText": "Use the Cedar River at Waverly gauge as the closest downstream trip signal. Treat 200 cfs as the guide-supported low-water floor and 400 to 600 cfs as the better range; no high cutoff is inferred, so avoid high or rising water.",
    "latitude": 42.95638,
    "longitude": -92.535427,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "dam",
        "mandatory_takeout",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "Launch only below the Nashua dam after using the public portage/access corridor. Do not launch above the dam for this downstream card.",
        "Pearl Rock has only a small parking area according to the paddling guide; confirm the take-out from land and keep the shuttle footprint small.",
        "The Waverly gauge is downstream of the route. Check the gauge trend, weather, and visible current at Nashua before committing."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05458300",
      "provider": "usgs",
      "siteId": "05458300",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Cedar River at Waverly, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05458300/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Cedar River Paddling Trips Waverly/Charles City gauge guidance",
        "url": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
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
      "seasonNotes": "Spring through fall is the practical season. The guide says 400 to 600 cfs is a better range, but the app keeps this minimum-only because no source gives a defended high-water cutoff for this exact split.",
      "difficulty": "easy",
      "difficultyNotes": "This is a short flatwater/moving-water Cedar leg at normal levels, but the below-dam launch, limited Pearl Rock parking, private banks, and downstream proxy gauge keep it in caution.",
      "confidenceNotes": "Confidence is good for a conservative Iowa split: the Cedar River Paddling Trips guide names Nashua Access and Pearl Rock, gives 6.1 miles, endpoint coordinates, the Nashua dam portage context, and a Cedar River gauge floor for the broader Charles City-to-Janesville trip family. The selected Waverly gauge is downstream but explicitly referenced by the same guide as a downstream Cedar planning gauge, so no ideal or upper range is inferred."
    },
    "evidenceNotes": [
      {
        "label": "Route shape",
        "value": "6.1 miles",
        "note": "The Cedar River Paddling Trips guide lists Nashua Access as 6.1 miles upstream of Pearl Rock.",
        "sourceUrl": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf"
      },
      {
        "label": "Endpoint coordinates",
        "value": "42.95638, -92.535427 to 42.910715, -92.543001",
        "note": "The guide publishes GPS coordinates for Nashua Access / Cedar Lake Park and Pearl Rock.",
        "sourceUrl": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf"
      },
      {
        "label": "Gauge floor",
        "value": "200 cfs minimum; 400-600 cfs better",
        "note": "The guide provides Cedar River gauge guidance for the trip family and points users to Charles City plus downstream gauges including Waverly.",
        "sourceUrl": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf"
      },
      {
        "label": "Current gauge check",
        "value": "2,450 cfs / 5.10 ft at 2026-07-23 08:15 CDT",
        "note": "USGS Water Services returned current Cedar River at Waverly discharge and stage during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05458300&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Local route context",
        "value": "Nashua to North Cedar is a public float corridor",
        "note": "The City of Nashua describes the Veterans Memorial Park / dam portage and says the Nashua-to-North-Cedar corridor can be customized using public access points.",
        "sourceUrl": "https://www.cityofnashuaia.com/float"
      }
    ],
    "sourceLinks": [
      {
        "label": "Cedar River Paddling Trips guide",
        "url": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf",
        "provider": "local"
      },
      {
        "label": "City of Nashua Cedar River float",
        "url": "https://www.cityofnashuaia.com/float",
        "provider": "local"
      },
      {
        "label": "Iowa DNR Fish Iowa Cedar River Nashua to La Porte City",
        "url": "https://programs.iowadnr.gov/lakemanagement/FishIowa/RiverStreamDetails/RCR07",
        "provider": "local"
      },
      {
        "label": "USGS 05458300 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05458300/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "cedar-river-pearl-rock-north-cedar",
    "slug": "cedar-river-pearl-rock-north-cedar",
    "name": "Cedar River",
    "reach": "Pearl Rock to North Cedar Park",
    "state": "Iowa",
    "region": "North Iowa",
    "summary": "Cedar River day run from the small Pearl Rock access to North Cedar Park near Plainfield, with endpoint camping support and a downstream Waverly gauge floor.",
    "statusText": "Use the Cedar River at Waverly gauge. Treat 200 cfs as the guide-supported low-water floor and 400 to 600 cfs as the better range; above that, make a conservative wood/current call because no high cutoff is published.",
    "latitude": 42.910715,
    "longitude": -92.543001,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks",
        "cold_water"
      ],
      "safetyNotes": [
        "Pearl Rock has only a small parking lot, so check access capacity and avoid blocking local roads before launching.",
        "Use the North Cedar Park boat ramp / canoe access for the take-out or overnight staging; do not assume private banks or oxbows are legal exits.",
        "The Waverly gauge is downstream of this split. Treat high, rising, cold, or debris-laden water as a no-go even though the scoring model is minimum-only."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05458300",
      "provider": "usgs",
      "siteId": "05458300",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Cedar River at Waverly, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05458300/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Cedar River Paddling Trips Waverly/Charles City gauge guidance",
        "url": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
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
      "seasonNotes": "Spring, early summer, and post-rain windows usually provide the best depth. Late summer can scrape below the floor, while high water increases wood and private-bank consequences.",
      "difficulty": "easy",
      "difficultyNotes": "A moderate-length Class I-style Cedar River float at normal levels. The route remains caution because access is rural, the gauge is downstream, and there are limited public exits.",
      "confidenceNotes": "Confidence is good for a minimum-only add: the paddling guide names Pearl Rock and North Cedar Park, gives 6.5 miles, endpoint coordinates, parking/campground context, and numeric Cedar gauge guidance. MyCountyParks independently confirms North Cedar Park has a Cedar River boat ramp, canoe access, camping, water, restrooms, and showers."
    },
    "evidenceNotes": [
      {
        "label": "Route shape",
        "value": "6.5 miles",
        "note": "The Cedar River Paddling Trips guide lists Pearl Rock as 6.5 miles upstream of North Cedar Park.",
        "sourceUrl": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf"
      },
      {
        "label": "Endpoint coordinates",
        "value": "42.910715, -92.543001 to 42.849516, -92.522648",
        "note": "The guide publishes GPS coordinates for Pearl Rock and North Cedar Park.",
        "sourceUrl": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf"
      },
      {
        "label": "Camping and take-out",
        "value": "North Cedar Park boat ramp, canoe access, and campground",
        "note": "Bremer County / MyCountyParks says North Cedar Park has a Cedar River boat ramp and canoe access, with first-come camping, water, modern restrooms, and showers.",
        "sourceUrl": "https://www.mycountyparks.com/county/bremer/park/north-cedar-park"
      },
      {
        "label": "Gauge floor",
        "value": "200 cfs minimum; 400-600 cfs better",
        "note": "The Cedar River Paddling Trips guide gives a 200 cfs adequate-water floor and 400 to 600 cfs as a better range for the broader trip set.",
        "sourceUrl": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf"
      },
      {
        "label": "Current gauge check",
        "value": "2,450 cfs / 5.10 ft at 2026-07-23 08:15 CDT",
        "note": "USGS Water Services returned current Cedar River at Waverly discharge and stage during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05458300&parameterCd=00060,00065&siteStatus=all"
      }
    ],
    "sourceLinks": [
      {
        "label": "Cedar River Paddling Trips guide",
        "url": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf",
        "provider": "local"
      },
      {
        "label": "Bremer County North Cedar Park",
        "url": "https://www.mycountyparks.com/county/bremer/park/north-cedar-park",
        "provider": "local"
      },
      {
        "label": "Iowa DNR Fish Iowa Cedar River Nashua to La Porte City",
        "url": "https://programs.iowadnr.gov/lakemanagement/FishIowa/RiverStreamDetails/RCR07",
        "provider": "local"
      },
      {
        "label": "USGS 05458300 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05458300/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "cedar-river-north-cedar-cedar-bend",
    "slug": "cedar-river-north-cedar-cedar-bend",
    "name": "Cedar River",
    "reach": "North Cedar Park to Cedar Bend Park",
    "state": "Iowa",
    "region": "Cedar Valley",
    "summary": "Longer Bremer County Cedar River leg from North Cedar Park to Cedar Bend Park, with campgrounds at both ends, wildlife-area context, and a downstream Waverly gauge floor.",
    "statusText": "Use the Cedar River at Waverly gauge. Treat 200 cfs as the guide-supported low-water floor and 400 to 600 cfs as the better range; avoid high, rising, or debris-laden water because no route-specific upper cutoff is published.",
    "latitude": 42.849516,
    "longitude": -92.522648,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "This is the longest of the new Cedar splits and has fewer obvious public exits between the two county parks; plan daylight and shuttle conservatively.",
        "North Cedar Wildlife Area borders the corridor, but routine stops should still use public access areas and posted public lands rather than private banks.",
        "The route ends above the Waverly dam corridor. If continuing beyond Cedar Bend, plan the Three Rivers / Kohlmann / Brookwood dam-portage logistics separately."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05458300",
      "provider": "usgs",
      "siteId": "05458300",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Cedar River at Waverly, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05458300/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Cedar River Paddling Trips Waverly/Charles City gauge guidance",
        "url": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
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
      "seasonNotes": "The guide-published better range is 400 to 600 cfs, but summer lows can expose gravel and high water can speed up wooded bends. Cedar Bend vehicle access is seasonal per county park guidance.",
      "difficulty": "easy",
      "difficultyNotes": "This is a mostly flatwater/moving-water county-park route at normal levels. Longer mileage, rural exposure, possible wood, and the downstream proxy gauge justify caution.",
      "confidenceNotes": "Confidence is good: the Cedar River Paddling Trips guide documents North Cedar Park to Cedar Bend Park as 8.3 miles, gives both coordinates, and describes North Cedar campground and Cedar Bend park amenities. Bremer County / MyCountyParks confirms North Cedar river access and camping, and Cedar Bend campground/seasonal gate support. Threshold confidence remains conservative minimum-only because the guide gives a low-water floor and better range but no upper cutoff."
    },
    "evidenceNotes": [
      {
        "label": "Route shape",
        "value": "8.3 miles",
        "note": "The Cedar River Paddling Trips guide lists North Cedar Park as 8.3 miles upstream of Cedar Bend Park.",
        "sourceUrl": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf"
      },
      {
        "label": "Endpoint coordinates",
        "value": "42.849516, -92.522648 to 42.760425, -92.493585",
        "note": "The guide publishes GPS coordinates for North Cedar Park and Cedar Bend Park.",
        "sourceUrl": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf"
      },
      {
        "label": "Endpoint camping",
        "value": "Campgrounds at North Cedar and Cedar Bend",
        "note": "The guide and Bremer County sources document campground support at North Cedar Park and Cedar Bend Park; Cedar Bend has more than 60 sites and seasonal vehicle-gate limits.",
        "sourceUrl": "https://www.mycountyparks.com/county/bremer/park/cedar-bend-park"
      },
      {
        "label": "Gauge floor",
        "value": "200 cfs minimum; 400-600 cfs better",
        "note": "The Cedar River Paddling Trips guide gives a 200 cfs adequate-water floor and 400 to 600 cfs as a better range for the broader trip set.",
        "sourceUrl": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf"
      },
      {
        "label": "Current gauge check",
        "value": "2,450 cfs / 5.10 ft at 2026-07-23 08:15 CDT",
        "note": "USGS Water Services returned current Cedar River at Waverly discharge and stage during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05458300&parameterCd=00060,00065&siteStatus=all"
      }
    ],
    "sourceLinks": [
      {
        "label": "Cedar River Paddling Trips guide",
        "url": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf",
        "provider": "local"
      },
      {
        "label": "Bremer County North Cedar Park",
        "url": "https://www.mycountyparks.com/county/bremer/park/north-cedar-park",
        "provider": "local"
      },
      {
        "label": "Bremer County Cedar Bend Park",
        "url": "https://www.mycountyparks.com/county/bremer/park/cedar-bend-park",
        "provider": "local"
      },
      {
        "label": "USGS 05458300 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05458300/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "cedar-river-cedar-bend-three-rivers",
    "slug": "cedar-river-cedar-bend-three-rivers",
    "name": "Cedar River",
    "reach": "Cedar Bend Park to Three Rivers Park",
    "state": "Iowa",
    "region": "Cedar Valley",
    "summary": "Short Bremer County Cedar River connector from Cedar Bend Park to Three Rivers Park at Waverly, ending before the Waverly dam portage corridor.",
    "statusText": "Use the Cedar River at Waverly gauge. Treat 200 cfs as the guide-supported low-water floor and 400 to 600 cfs as the better range; no high cutoff is inferred, so avoid high, rising, or debris-heavy water.",
    "latitude": 42.760425,
    "longitude": -92.493585,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "dam",
        "mandatory_takeout",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "Take out at Three Rivers Park and do not drift into the Waverly dam sequence unless your group has separately planned the signed portage and downstream relaunch.",
        "Cedar Bend Park vehicle access can be seasonal. Confirm the county park gate, campground, and ramp approach before staging a shuttle.",
        "The Waverly gauge is at the take-out corridor, but it does not show wood, debris, or dam-portage conditions. Make a visual check at Cedar Bend before launching."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05458300",
      "provider": "usgs",
      "siteId": "05458300",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Cedar River at Waverly, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05458300/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Cedar River Paddling Trips Waverly gauge guidance",
        "url": "https://media.rainpos.com/8576/cedar_river_flatwater_paddling_trips.pdf",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
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
      "seasonNotes": "Spring through fall is the practical season. The guide says 400 to 600 cfs is a better range, but this card stays minimum-only because no source gives a defended high-water cutoff for the Waverly urban split.",
      "difficulty": "easy",
      "difficultyNotes": "This is a short moving-water Cedar leg at normal levels. The downstream dam context, take-out discipline, wood, and private-bank limits keep the route in caution.",
      "confidenceNotes": "Confidence is good for a conservative official-guide add: the Cedar River Paddling Trips guide names Cedar Bend Park to Three Rivers Park as 4.2 miles, publishes both coordinates, documents Three Rivers as a double boat ramp with dock, and gives the Cedar River gauge floor used by the adjacent Waverly route family. Bremer County corroborates Cedar Bend campground support and USGS Water Services returned current Waverly data during this run. The threshold model remains minimum-only because no source publishes a complete upper band for this exact short segment."
    },
    "evidenceNotes": [
      {
        "label": "Route shape",
        "value": "4.2 miles",
        "note": "The Cedar River Paddling Trips guide lists Cedar Bend Park as 4.2 miles upstream of Three Rivers Park and marks the Waverly dam portage context downstream.",
        "sourceUrl": "https://media.rainpos.com/8576/cedar_river_flatwater_paddling_trips.pdf"
      },
      {
        "label": "Endpoint coordinates",
        "value": "42.760425, -92.493585 to 42.73722, -92.469794",
        "note": "The guide publishes GPS coordinates for Cedar Bend Park and Three Rivers Park.",
        "sourceUrl": "https://media.rainpos.com/8576/cedar_river_flatwater_paddling_trips.pdf"
      },
      {
        "label": "Current gauge check",
        "value": "2,400 cfs / 5.08 ft at 2026-07-23 12:15 CDT",
        "note": "USGS Water Services returned current Cedar River at Waverly discharge and stage during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05458300&parameterCd=00060,00065&siteStatus=all"
      }
    ],
    "sourceLinks": [
      {
        "label": "Cedar River Paddling Trips guide",
        "url": "https://media.rainpos.com/8576/cedar_river_flatwater_paddling_trips.pdf",
        "provider": "local"
      },
      {
        "label": "Bremer County Cedar Bend Park",
        "url": "https://www.mycountyparks.com/county/bremer/park/cedar-bend-park",
        "provider": "local"
      },
      {
        "label": "USGS 05458300 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05458300/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "cedar-river-three-rivers-kohlmann",
    "slug": "cedar-river-three-rivers-kohlmann",
    "name": "Cedar River",
    "reach": "Three Rivers Park to Kohlmann Park portage take-out",
    "state": "Iowa",
    "region": "Cedar Valley",
    "summary": "Very short Waverly Cedar River dam-approach connector from Three Rivers Park to the commonly used Kohlmann Park portage take-out.",
    "statusText": "Use the Cedar River at Waverly gauge. Treat 200 cfs as the guide-supported low-water floor; this card is mainly a dam-portage approach, so avoid high or rising water and take out at Kohlmann.",
    "latitude": 42.73722,
    "longitude": -92.469794,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "dam",
        "mandatory_takeout",
        "strainers",
        "fast_rise",
        "urban_water_quality"
      ],
      "safetyNotes": [
        "This route exists only as the upstream approach to the Waverly dam portage. Take out at Kohlmann Park on river right and do not continue toward the dam.",
        "The guide says Kohlmann Park is the most commonly used take-out to portage the dam but does not have an official access. Scout the landing from shore before launching.",
        "Keep this as a fair-weather, normal-level connector. High or rising water shortens the decision window above the dam and increases consequences at the informal portage landing."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05458300",
      "provider": "usgs",
      "siteId": "05458300",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Cedar River at Waverly, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05458300/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Cedar River Paddling Trips Waverly gauge guidance",
        "url": "https://media.rainpos.com/8576/cedar_river_flatwater_paddling_trips.pdf",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
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
      "seasonNotes": "Run this only in normal recreational conditions with a visible, usable Kohlmann landing. The app keeps the guide floor but withholds any high-water recommendation because of the dam-adjacent take-out.",
      "difficulty": "easy",
      "difficultyNotes": "The mileage is easy, but the mandatory informal take-out above the dam makes access discipline more important than distance.",
      "confidenceNotes": "Confidence is good for a guarded connector: the Cedar River Paddling Trips guide documents Three Rivers Park to Kohlmann Park as 1.3 miles, publishes both coordinates, says Three Rivers has a double boat ramp and dock, and identifies Kohlmann as the most commonly used take-out to portage the dam. Confidence is intentionally capped because Kohlmann is not an official access, so the route copy treats it as a mandatory portage landing that must be checked from shore."
    },
    "evidenceNotes": [
      {
        "label": "Route shape",
        "value": "1.3 miles",
        "note": "The Cedar River Paddling Trips guide lists Three Rivers Park as 1.3 miles upstream of Kohlmann Park.",
        "sourceUrl": "https://media.rainpos.com/8576/cedar_river_flatwater_paddling_trips.pdf"
      },
      {
        "label": "Mandatory portage context",
        "value": "Kohlmann Park take-out, portage dam on right",
        "note": "The guide says Kohlmann Park is the most commonly used take-out to portage the dam, while also noting that it does not have an official access.",
        "sourceUrl": "https://media.rainpos.com/8576/cedar_river_flatwater_paddling_trips.pdf"
      },
      {
        "label": "Current gauge check",
        "value": "2,400 cfs / 5.08 ft at 2026-07-23 12:15 CDT",
        "note": "USGS Water Services returned current Cedar River at Waverly discharge and stage during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05458300&parameterCd=00060,00065&siteStatus=all"
      }
    ],
    "sourceLinks": [
      {
        "label": "Cedar River Paddling Trips guide",
        "url": "https://media.rainpos.com/8576/cedar_river_flatwater_paddling_trips.pdf",
        "provider": "local"
      },
      {
        "label": "City of Waverly park information",
        "url": "https://www.waverlyia.com/leisure-services/departments/parks/park-information.aspx",
        "provider": "local"
      },
      {
        "label": "USGS 05458300 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05458300/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "cedar-river-kohlmann-brookwood",
    "slug": "cedar-river-kohlmann-brookwood",
    "name": "Cedar River",
    "reach": "Kohlmann Park below-dam relaunch to Brookwood Park",
    "state": "Iowa",
    "region": "Cedar Valley",
    "summary": "Short below-dam Waverly Cedar River connector from the Kohlmann portage corridor to Brookwood Park, using the Waverly gauge and city park access support.",
    "statusText": "Use the Cedar River at Waverly gauge. Treat 200 cfs as the guide-supported low-water floor; launch only below the dam after portaging and take out at Brookwood Park.",
    "latitude": 42.726601,
    "longitude": -92.47203,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "dam",
        "strainers",
        "fast_rise",
        "urban_water_quality"
      ],
      "safetyNotes": [
        "Relaunch only below the Waverly dam after completing the portage. Do not run the dam or launch in dam hydraulics.",
        "Brookwood Park has a city-documented non-motorized boat ramp; identify it before launching because the route is short and urban.",
        "Avoid high, rising, or debris-laden water below the dam. The short mileage does not remove cold-water, current, and obstruction consequences."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05458300",
      "provider": "usgs",
      "siteId": "05458300",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Cedar River at Waverly, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05458300/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Cedar River Paddling Trips Waverly gauge guidance",
        "url": "https://media.rainpos.com/8576/cedar_river_flatwater_paddling_trips.pdf",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
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
      "seasonNotes": "Use normal-level windows only. High water can affect Waverly city parks and the below-dam current; low water can make the short connector shallow or awkward.",
      "difficulty": "easy",
      "difficultyNotes": "This is a short urban below-dam connector, but the route depends on correct portage/relaunch discipline and a prompt Brookwood take-out.",
      "confidenceNotes": "Confidence is good: the Cedar River Paddling Trips guide documents Kohlmann Park to Brookwood Park as 1.1 miles, publishes both coordinates, and says Brookwood and Kohlmann are downtown Waverly parks near amenities. The City of Waverly independently describes Brookwood Park as a Cedar River park with a non-motorized boat ramp and parking. The app does not infer a high-water band because the route is dam-adjacent and short."
    },
    "evidenceNotes": [
      {
        "label": "Route shape",
        "value": "1.1 miles",
        "note": "The Cedar River Paddling Trips guide lists Kohlmann Park as 1.1 miles upstream of Brookwood Park.",
        "sourceUrl": "https://media.rainpos.com/8576/cedar_river_flatwater_paddling_trips.pdf"
      },
      {
        "label": "Brookwood public access",
        "value": "Non-motorized boat ramp and paved parking",
        "note": "The City of Waverly describes Brookwood Park as a large Cedar River park with a non-motorized boat ramp and paved parking.",
        "sourceUrl": "https://www.waverlyia.com/webres/File/leisure-services/parks/Brookwood%20Park.pdf"
      },
      {
        "label": "Current gauge check",
        "value": "2,400 cfs / 5.08 ft at 2026-07-23 12:15 CDT",
        "note": "USGS Water Services returned current Cedar River at Waverly discharge and stage during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05458300&parameterCd=00060,00065&siteStatus=all"
      }
    ],
    "sourceLinks": [
      {
        "label": "Cedar River Paddling Trips guide",
        "url": "https://media.rainpos.com/8576/cedar_river_flatwater_paddling_trips.pdf",
        "provider": "local"
      },
      {
        "label": "City of Waverly Brookwood Park",
        "url": "https://www.waverlyia.com/webres/File/leisure-services/parks/Brookwood%20Park.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 05458300 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05458300/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "yellow-river-volney-sixteen-bridge",
    "slug": "yellow-river-volney-sixteen-bridge",
    "name": "Yellow River",
    "reach": "Volney Canoe Access to Sixteen Bridge",
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Short Driftless Iowa run with clear water, frequent Class I riffles, limestone outcrops, coldwater-trout character, and a direct Ion gauge ladder from a detailed route report.",
    "statusText": "Use the Yellow River near Ion gauge. Treat 201 to 300 cfs as the best broad target, 100 cfs as the low floor, and 600+ cfs as too high for a normal recreational recommendation because strainers and rapids get more consequential.",
    "latitude": 43.13022,
    "longitude": -91.37586,
    "gaugeSource": {
      "id": "usgs-05389000",
      "provider": "usgs",
      "siteId": "05389000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Yellow River near Ion, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05389000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 201,
      "idealMax": 300,
      "tooLow": 100,
      "tooHigh": 601,
      "thresholdSource": {
        "label": "Wisconsin River Trips Yellow River Iowa gauge ladder",
        "url": "https://www.wisconsinrivertrips.com/segments/yellow-river-iowa/volney",
        "provider": "wisconsin_river_trips"
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
      "seasonNotes": "Spring and fall are best for scenery and stable clarity. Summer is popular but can be lower or more crowded; recent rain can raise the river quickly and reduce clarity.",
      "difficulty": "moderate",
      "difficultyNotes": "Most rapids are Class I and beginner-suitable at normal levels, but this is a fast, coldwater stream with several strainers and high-water escalation toward Class II-style consequences.",
      "confidenceNotes": "Confidence is good for a community-source add: Wisconsin River Trips documents the exact popular Volney-to-Sixteen route, provides a detailed Ion-gauge ladder, and gives access/hazard notes. Iowa DNR confirms public access, picnic facilities, rustic restroom, and carry-down boat launch context at Volney, while independent map sources identify Bridge Sixteen Canoe Access as the take-out."
    },
    "evidenceNotes": [
      {
        "label": "Route support",
        "value": "Volney to Sixteen, about 5 river miles",
        "note": "Wisconsin River Trips documents Volney Canoe Launch to Sixteen Bridge as the popular 4.6-mile Yellow River leg and notes the longer Volney Road bridge start at 5.3 miles.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/yellow-river-iowa/volney"
      },
      {
        "label": "Published route report",
        "value": "Volney Canoe Launch to Sixteen Bridge",
        "note": "Wisconsin River Trips identifies the Volney public canoe launch as the common put-in and Sixteen Bridge as the public take-out for the popular Yellow River leg.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/yellow-river-iowa/volney"
      },
      {
        "label": "Target range",
        "value": "201 to 300 cfs",
        "note": "Wisconsin River Trips describes 201 to 300 cfs at the Ion gauge as average depth and a good target range for a well-padded river.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/yellow-river-iowa/volney"
      },
      {
        "label": "Low-water floor",
        "value": "100 cfs",
        "note": "The same route ladder treats below 50 cfs as likely too low and 51 to 100 cfs as very shallow, maybe only suitable for flat-bottom boats.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/yellow-river-iowa/volney"
      },
      {
        "label": "High-water ceiling",
        "value": "601+ cfs",
        "note": "WRT treats 601 to 1000 cfs as very high and perhaps only suitable for expert paddlers, and 1001+ cfs as maybe too high for kayaking.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/yellow-river-iowa/volney"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 05389000",
        "note": "USGS operates Yellow River near Ion, IA with current discharge and gage-height observations. WRT uses this gauge for the route ladder.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=05389000"
      },
      {
        "label": "Put-in support",
        "value": "Volney Canoe Access",
        "note": "Iowa DNR Fish Iowa says Yellow River has public fishing access, picnic facilities, and a carry-down boat launch at the Volney Canoe Access.",
        "sourceUrl": "https://programs.iowadnr.gov/lakemanagement/FishIowa/TroutStreamDetails/TYR03"
      },
      {
        "label": "Take-out support",
        "value": "Bridge Sixteen Canoe Access",
        "note": "The named Bridge Sixteen Canoe Access is independently mapped at the downstream take-out used by the route report. Volney Park / Yellow River Canoe Access is mapped beside Volney Park and county material confirms canoe access there.",
        "sourceUrl": "https://mapcarta.com/N2520494167"
      }
    ],
    "sourceLinks": [
      {
        "label": "Wisconsin River Trips Yellow River Iowa",
        "url": "https://www.wisconsinrivertrips.com/segments/yellow-river-iowa/volney",
        "provider": "wisconsin_river_trips"
      },
      {
        "label": "USGS 05389000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05389000/",
        "provider": "usgs"
      },
      {
        "label": "Iowa DNR Fish Iowa Yellow River",
        "url": "https://programs.iowadnr.gov/lakemanagement/FishIowa/TroutStreamDetails/TYR03",
        "provider": "local"
      },
      {
        "label": "Allamakee County Volney Park canoe access",
        "url": "https://www.mycountyparks.com/county/allamakee/Park/Volney-Park",
        "provider": "local"
      },
      {
        "label": "Volney Yellow River Canoe Access map record",
        "url": "https://mapcarta.com/N2520494167",
        "provider": "local"
      }
    ]
  },
  {
    "id": "yellow-river-sixteen-bridge-highway-76",
    "slug": "yellow-river-sixteen-bridge-highway-76",
    "name": "Yellow River",
    "reach": "Bridge Sixteen to Highway 76",
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Long lower Yellow River day from the public Bridge Sixteen launch through rugged Driftless bluffs, faster riffles, Yellow River State Forest, and Effigy Mounds bottomlands to the Highway 76 mouth-area access.",
    "statusText": "Use the Yellow River near Ion gauge. Treat 201 to 300 cfs as the best broad target, 100 cfs as the low floor, and 600+ cfs as too high for a normal recreational recommendation because rapids, strainers, and Mississippi backwater debris get more consequential.",
    "latitude": 43.1277592,
    "longitude": -91.3140227,
    "gaugeSource": {
      "id": "usgs-05389000",
      "provider": "usgs",
      "siteId": "05389000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Yellow River near Ion, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05389000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 201,
      "idealMax": 300,
      "tooLow": 100,
      "tooHigh": 601,
      "thresholdSource": {
        "label": "Wisconsin River Trips Yellow River Iowa gauge ladder",
        "url": "https://www.wisconsinrivertrips.com/segments/yellow-river-iowa/volney",
        "provider": "wisconsin_river_trips"
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
      "seasonNotes": "Spring and fall are best for this long Driftless day. Summer can be workable when the Ion gauge stays above the low floor, but the lower river can be affected by recent rain, reduced clarity, and Mississippi backwater near the mouth.",
      "difficulty": "moderate",
      "difficultyNotes": "Miles Paddled rates this reach intermediate with riffles and Class I+ water. Wisconsin River Trips describes the Sixteen-to-Ion leg as faster and more rugged than the popular upstream reach, with bigger Class II-style rapids possible as water rises.",
      "confidenceNotes": "Confidence is good for a community-source Iowa add: Miles Paddled documents the exact Old Sixteen Road-to-Highway-76 route with GPS points, distance, hazards, and an Ion gauge observation; Wisconsin River Trips publishes the same-river Ion gauge ladder and identifies Bridge Sixteen as a public paddler launch; USGS operates the Ion gauge in the route corridor; NPS and Iowa DNR materials confirm public lower-corridor context around Effigy Mounds, Yellow River State Forest, canoe access, parking, and the Highway 76 area."
    },
    "evidenceNotes": [
      {
        "label": "Published route report",
        "value": "Old Sixteen Road to Highway 76, 16.75 miles",
        "note": "Miles Paddled documents the lower Yellow River from Old Sixteen Road to the Highway 76 railroad bridge near the Mississippi mouth, with put-in/take-out GPS points and a five-hour trip time.",
        "sourceUrl": "https://milespaddled.com/yellow-river-ii/"
      },
      {
        "label": "Lower route character",
        "value": "Riffles, Class I+, public-land lower miles",
        "note": "Miles Paddled describes swift riffles, rock outcrops, strainers and sweepers, then public land through Yellow River State Forest and Effigy Mounds in the final lower section.",
        "sourceUrl": "https://milespaddled.com/yellow-river-ii/"
      },
      {
        "label": "Target range",
        "value": "201 to 300 cfs",
        "note": "Wisconsin River Trips describes 201 to 300 cfs at the Ion gauge as average depth and a good target range for a well-padded Yellow River.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/yellow-river-iowa/volney"
      },
      {
        "label": "Low-water floor",
        "value": "100 cfs",
        "note": "The WRT Yellow River ladder treats below 50 cfs as likely too low and 51 to 100 cfs as very shallow; Miles Paddled separately says this lower route needs enough water and gives 80 cfs as a minimum caution.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/yellow-river-iowa/volney"
      },
      {
        "label": "High-water ceiling",
        "value": "601+ cfs",
        "note": "WRT treats 601 to 1000 cfs as very high and perhaps only suitable for expert paddlers, with 1001+ cfs maybe too high for kayaking. The app keeps 601+ cfs outside broad recommendation.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/yellow-river-iowa/volney"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 05389000",
        "note": "USGS operates Yellow River near Ion, IA with current discharge and gage-height observations, and both lower-Yellow route reports tie their conditions to the Ion gauge.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05389000/"
      },
      {
        "label": "Put-in support",
        "value": "Bridge Sixteen public launch",
        "note": "Wisconsin River Trips says paddlers should use the public launch downstream and left of Sixteen Bridge, not the nearby private campground. Existing app research also identifies Bridge Sixteen Canoe Access as a named public access.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/yellow-river-iowa/volney"
      },
      {
        "label": "Take-out support",
        "value": "Highway 76 / Yellow River mouth access context",
        "note": "Miles Paddled used the Highway 76 and railroad bridge area as the safer take-out. NPS describes the Yellow River boardwalk and South Unit highway access area, while Iowa DNR maps canoe access and parking in the Yellow River State Forest lower corridor.",
        "sourceUrl": "https://milespaddled.com/yellow-river-ii/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Miles Paddled Yellow River II",
        "url": "https://milespaddled.com/yellow-river-ii/",
        "provider": "miles_paddled"
      },
      {
        "label": "Wisconsin River Trips Yellow River Iowa",
        "url": "https://www.wisconsinrivertrips.com/segments/yellow-river-iowa/volney",
        "provider": "wisconsin_river_trips"
      },
      {
        "label": "USGS 05389000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05389000/",
        "provider": "usgs"
      },
      {
        "label": "Effigy Mounds Yellow River Boardwalk",
        "url": "https://home.nps.gov/efmo/planyourvisit/accessibility.htm",
        "provider": "nps"
      },
      {
        "label": "Iowa DNR Yellow River State Forest map",
        "url": "https://www.iowadnr.gov/Portals/idnr/uploads/forestry/YRSF/YRSFMap.pdf",
        "provider": "local"
      }
    ]
  },
  {
    "id": "yellow-river-ion-highway-76",
    "slug": "yellow-river-ion-highway-76",
    "name": "Yellow River",
    "reach": "Ion Bridge Access to Highway 76 Access",
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Fast lower Yellow River split from Ion Bridge to Highway 76, using the direct Ion gauge, official water-trail guidance, and Yellow River State Forest canoe-access context.",
    "statusText": "Use the Yellow River near Ion gauge. CanWePaddle lists 80 to 900 cfs for Volney to Ion, and the water-trail guide says flows should be above 80 cfs; this short split still needs rapid, wood, and take-out checks.",
    "latitude": 43.08612,
    "longitude": -91.18213,
    "gaugeSource": {
      "id": "usgs-05389000",
      "provider": "usgs",
      "siteId": "05389000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Yellow River near Ion, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05389000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "private_banks",
        "cold_water"
      ],
      "safetyNotes": [
        "The Yellow River drops quickly through the lower state-forest corridor. At high water, Class I rapids and tight bends become more consequential.",
        "Scout wood and the Ion Bridge take-out from land before launching; missing the take-out commits the group toward the lower forest and Mississippi backwater planning zone.",
        "Yellow River State Forest camping is designated-site camping, not permission to stop on private or unmarked banks."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 80,
      "idealMax": 900,
      "tooLow": 80,
      "tooHigh": 900,
      "thresholdSource": {
        "label": "CanWePaddle Yellow River Volney-to-Ion estimated range and Iowa water-trail 80 cfs floor",
        "url": "https://canwepaddle.com/rivers/iowa/yellow-river-volney-to-ion/",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
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
      "seasonNotes": "Spring and fall often have the best depth and visibility. Summer can scrape below the 80 cfs floor, while storms can rapidly turn the narrow bluff corridor pushy.",
      "difficulty": "moderate",
      "difficultyNotes": "This is a short lower-Yellow split, but the river remains swift, riffly, and wood-sensitive. Treat it as an active moving-water trip rather than casual flatwater.",
      "confidenceNotes": "Confidence is moderate-good: CanWePaddle ties the full Volney-to-Ion route family to USGS 05389000 with an 80-900 cfs range, the Yellow River water-trail guide gives the same 80 cfs canoe/kayak floor, and Iowa DNR Yellow River State Forest materials confirm canoe access and canoe-in camping context near Ion. The split is extracted from a longer represented corridor, so copy emphasizes take-out discipline and direct-gauge visual checks."
    },
    "evidenceNotes": [
      {
        "label": "Threshold range",
        "value": "80-900 cfs",
        "note": "CanWePaddle publishes an 80 to 900 cfs estimated range for the broader Volney-to-Ion route using USGS 05389000.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/yellow-river-volney-to-ion/"
      },
      {
        "label": "Official low-water floor",
        "value": "Above 80 cfs for canoeing or kayaking",
        "note": "The Yellow River water-trail guide says paddlers should check the river gage and that flows should ideally be above 80 cfs for canoeing or kayaking this section.",
        "sourceUrl": "https://www.northeastiowarcd.org/wp-content/uploads/yellowRiverWaterTrail.pdf"
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05389000 125 cfs / 5.78 ft",
        "note": "USGS Water Services returned current Yellow River near Ion data at 2026-07-23 18:45 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05389000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "State-forest access and camping context",
        "value": "Yellow River State Forest canoe access and canoe-in campsite",
        "note": "Iowa DNR Yellow River State Forest materials describe kayaking the Yellow River Water Trail and note a primitive Ridgetop canoe-in campsite; the unit map directs paddlers to canoe access and parking from Highway 76 via Ion Road and Old Mission Road.",
        "sourceUrl": "https://www.iowadnr.gov/places-go/state-forests/yellow-river-state-forest"
      }
    ],
    "sourceLinks": [
      {
        "label": "CanWePaddle Yellow River Volney to Ion",
        "url": "https://canwepaddle.com/rivers/iowa/yellow-river-volney-to-ion/",
        "provider": "local"
      },
      {
        "label": "Yellow River Water Trail guide",
        "url": "https://www.northeastiowarcd.org/wp-content/uploads/yellowRiverWaterTrail.pdf",
        "provider": "local"
      },
      {
        "label": "Iowa DNR Yellow River State Forest",
        "url": "https://www.iowadnr.gov/places-go/state-forests/yellow-river-state-forest",
        "provider": "local"
      },
      {
        "label": "Iowa DNR Yellow River Unit map",
        "url": "https://www.iowadnr.gov/media/1179/download?inline=",
        "provider": "local"
      },
      {
        "label": "USGS 05389000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05389000/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "maquoketa-river-manchester-whitewater",
    "slug": "maquoketa-river-manchester-whitewater",
    "name": "Maquoketa River",
    "reach": "Manchester Whitewater Park",
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Downtown Manchester whitewater-play course on the Maquoketa River, with six constructed drops, public city access, a walk-back trail, and a direct Manchester gauge.",
    "statusText": "Use the Maquoketa River at Manchester gauge. Treat 200 to 1,200 cfs as the best broad play window, below 100 cfs as extremely shallow, and 5,000+ cfs as high-water whitewater only.",
    "latitude": 42.482137,
    "longitude": -91.458424,
    "routeType": "whitewater",
    "gaugeSource": {
      "id": "usgs-05416900",
      "provider": "usgs",
      "siteId": "05416900",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Maquoketa River at Manchester, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05416900/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "fast_rise"
      ],
      "safetyNotes": [
        "This is a constructed whitewater play park with shallow drops and changing hydraulics, not a downstream float or tubing recommendation.",
        "The city advises PFDs, helmets, proper water shoes, and personal judgment about when the river is too much for the paddler.",
        "American Whitewater marks 5,000+ cfs as high Class III water; keep high, rising, muddy, or debris-laden water outside casual use."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 200,
      "idealMax": 1200,
      "tooLow": 100,
      "tooHigh": 5000,
      "thresholdSource": {
        "label": "American Whitewater Manchester Whitewater Park gauge ladder",
        "url": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=10410",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "mixed",
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
      "seasonNotes": "The city says the park is open year-round, but Maquoketa River levels respond quickly to rain. Summer low water can leave features very shallow, while high water changes eddy access and raises consequences.",
      "difficulty": "moderate",
      "difficultyNotes": "American Whitewater rates the park I-II at normal play levels and II+ to III as flows rise. The city stresses that the river is not an amusement park; PFDs, helmets, water shoes, and shore scouting are appropriate even for short laps.",
      "confidenceNotes": "Confidence is high for a whitewater-play route: the City of Manchester confirms public 300 West Main Street parking and access beside the first feature, Iowa Whitewater publishes the whitewater-park coordinates and Maquoketa River location, American Whitewater documents the exact Manchester Whitewater Park reach and flow ladder, and USGS 05416900 is the direct same-river gauge about one mile downstream."
    },
    "evidenceNotes": [
      {
        "label": "Public access",
        "value": "300 West Main Street",
        "note": "The City of Manchester says public parking is available at 300 West Main Street adjacent to the whitewater park access point and first feature.",
        "sourceUrl": "https://www.manchester-ia.org/vnews/display.v/SEC/Parks%20%26%20Recreation%7CWhitewater%20Park"
      },
      {
        "label": "Course design",
        "value": "Six 18-inch drops / 800+ ft",
        "note": "The city describes six 18-inch drops over more than 800 feet, with a paved trail for walking back to the start of the course.",
        "sourceUrl": "https://www.manchester-ia.org/vnews/display.v/SEC/Parks%20%26%20Recreation%7CWhitewater%20Park"
      },
      {
        "label": "Access coordinates",
        "value": "42.482137, -91.458424",
        "note": "Iowa Whitewater identifies Manchester Whitewater Park on the Maquoketa River in Manchester and publishes these latitude/longitude coordinates.",
        "sourceUrl": "https://www.iowawhitewater.org/lhd/LHDmanchester1.html"
      },
      {
        "label": "Target range",
        "value": "200 to 1,200 cfs",
        "note": "American Whitewater describes 200-500 cfs as decent low-level play and 500-1,200 cfs as moderate play, while the city recommends below 250 cfs for tubers and recreational kayakers reducing risk.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=10410"
      },
      {
        "label": "Low and high cutoffs",
        "value": "<100 cfs / 5,000+ cfs",
        "note": "American Whitewater marks 0-100 cfs as extreme low flow with scrapey features and 5,000-20,000 cfs as high Class III whitewater; the app uses 5,000+ cfs as beyond broad recommendation.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=10410"
      },
      {
        "label": "Direct gauge",
        "value": "USGS 05416900",
        "note": "USGS operates Maquoketa River at Manchester, IA, and American Whitewater says the gauge is about one mile downstream and accurately reflects the playpark flow.",
        "sourceUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05416900/"
      }
    ],
    "sourceLinks": [
      {
        "label": "City of Manchester Whitewater Park",
        "url": "https://www.manchester-ia.org/vnews/display.v/SEC/Parks%20%26%20Recreation%7CWhitewater%20Park",
        "provider": "local"
      },
      {
        "label": "Iowa Whitewater Manchester Whitewater Park",
        "url": "https://www.iowawhitewater.org/lhd/LHDmanchester1.html",
        "provider": "local"
      },
      {
        "label": "American Whitewater Manchester Whitewater Park",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/10410/main",
        "provider": "american_whitewater"
      },
      {
        "label": "American Whitewater Manchester gauge ladder",
        "url": "https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=10410",
        "provider": "american_whitewater"
      },
      {
        "label": "USGS 05416900 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05416900/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "des-moines-river-fort-dodge-lehigh",
    "slug": "des-moines-river-fort-dodge-lehigh",
    "name": "Des Moines River",
    "reach": "South River District Access to Lehigh",
    "state": "Iowa",
    "region": "North-Central Iowa",
    "summary": "Webster County Des Moines River water-trail day from Fort Dodge toward Lehigh, with sandstone bluffs, rocky riffles, Dolliver State Park context, and a direct Fort Dodge USGS gauge.",
    "statusText": "Use the Fort Dodge gauge. CanWePaddle estimates 400 to 8,000 cfs as the runnable window; below 400 cfs expect scraping, and above 8,000 cfs the river is too pushy for a general recommendation.",
    "latitude": 42.4892,
    "longitude": -94.1856,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks",
        "cold_water"
      ],
      "safetyNotes": [
        "Iowa DNR rates the South River District to Dolliver reach intermediate and describes rocky riffles, glacial erratic boulders, bridge remains, and wooded banks.",
        "Use only the named water-trail accesses. Private banks, muddy slopes, and wooded bluffs limit casual bailout choices between Fort Dodge and Lehigh.",
        "High or rising water can hide boulders and bridge remnants while adding fast current and floating wood. Treat the upper end of the range as experienced-paddler water."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05480500",
      "provider": "usgs",
      "siteId": "05480500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Des Moines River at Fort Dodge, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05480500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 400,
      "idealMax": 8000,
      "tooLow": 400,
      "tooHigh": 8000,
      "thresholdSource": {
        "label": "CanWePaddle Fort Dodge to Lehigh estimated range",
        "url": "https://canwepaddle.com/rivers/iowa/des-moines-river-fort-dodge-to-lehigh/",
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
      "seasonNotes": "April through October is the practical paddling window. Spring rain can make the Des Moines pushy through Fort Dodge and Dolliver, while late summer can expose riffles and boulders.",
      "difficulty": "moderate",
      "difficultyNotes": "The route is not whitewater under normal conditions, but Iowa DNR labels the South River District to Dolliver reach intermediate because of length, riffles, boulders, bridge remains, and limited public exits.",
      "confidenceNotes": "Confidence is good for a conservative add: Iowa DNR maps and describes the Fort Dodge to Dolliver/Lehigh water-trail corridor with public accesses and hazards, Visit Fort Dodge confirms the 46-mile water trail and access network, CanWePaddle publishes a route-specific Fort Dodge gauge range, and USGS returned current direct-gauge data during this run. Endpoint coordinates are practical anchors for the named access corridors rather than ramp-survey points."
    },
    "evidenceNotes": [
      {
        "label": "Current gauge check",
        "value": "966 cfs / 4.25 ft at 2026-07-22 20:00 CDT",
        "note": "USGS Water Services returned current Fort Dodge discharge and stage during this run, inside the selected CanWePaddle range.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05480500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold range",
        "value": "400-8,000 cfs",
        "note": "CanWePaddle ties the Fort Dodge-to-Lehigh section to USGS 05480500 and estimates a 400 to 8,000 cfs runnable window.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/des-moines-river-fort-dodge-to-lehigh/"
      },
      {
        "label": "Official route character",
        "value": "South River District to Dolliver, 15 miles",
        "note": "Iowa DNR describes this stretch as an excellent intermediate paddle through woodlands, sandstone cliffs, rocky riffles, and high wildlife density.",
        "sourceUrl": "https://www.iowadnr.gov/media/8886/download?inline="
      },
      {
        "label": "Access chain",
        "value": "Fort Dodge, Dolliver, Lehigh",
        "note": "Visit Fort Dodge says the Des Moines River Water Trail has eight public access sites with Fort Dodge, Lehigh, and Dolliver State Park as key destinations.",
        "sourceUrl": "https://www.dodgetheordinary.com/des-moines-river-water-trail"
      },
      {
        "label": "Hazards",
        "value": "Boulders, bridge remnants, riffles, wood",
        "note": "Iowa DNR calls out glacial erratic boulders, old bridge remains, rocky riffles, and wooded banks on this water-trail corridor.",
        "sourceUrl": "https://www.iowadnr.gov/media/8886/download?inline="
      }
    ],
    "sourceLinks": [
      {
        "label": "Iowa DNR Des Moines River Water Trail guide",
        "url": "https://www.iowadnr.gov/media/8886/download?inline=",
        "provider": "local"
      },
      {
        "label": "Visit Fort Dodge Des Moines River Water Trail",
        "url": "https://www.dodgetheordinary.com/des-moines-river-water-trail",
        "provider": "local"
      },
      {
        "label": "CanWePaddle Des Moines River Fort Dodge to Lehigh",
        "url": "https://canwepaddle.com/rivers/iowa/des-moines-river-fort-dodge-to-lehigh/",
        "provider": "local"
      },
      {
        "label": "USGS 05480500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05480500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "iowa-river-marengo-amana",
    "slug": "iowa-river-marengo-amana",
    "name": "Iowa River",
    "reach": "Marengo to Amana",
    "state": "Iowa",
    "region": "Iowa County",
    "summary": "Long Iowa River day from the Marengo public-access corridor toward Amana, using the direct Marengo gauge and a conservative same-route flow range.",
    "statusText": "Use the Marengo gauge. CanWePaddle estimates 300 to 5,000 cfs as the runnable window; below 300 cfs expect scraping, and above 5,000 cfs the river becomes too pushy for a general recommendation.",
    "latitude": 41.813,
    "longitude": -92.065,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "dam",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "This is a long, rural Iowa River day with private banks and limited formal exits. Stage the Amana-area take-out before launching.",
        "Older Iowa River guide material notes that the Amana society dam and canal system affect the corridor downstream of Marengo; do not extend casually into dam or diversion water.",
        "Low water can make the river shallow and slow, while high water covers bars, speeds the current, and reduces recovery time around wood."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05453100",
      "provider": "usgs",
      "siteId": "05453100",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Iowa River at Marengo, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05453100/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 300,
      "idealMax": 5000,
      "tooLow": 300,
      "tooHigh": 5000,
      "thresholdSource": {
        "label": "CanWePaddle Marengo to Amana estimated range",
        "url": "https://canwepaddle.com/rivers/iowa/iowa-river-marengo-to-amana/",
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
      "seasonNotes": "April through October is the normal paddling season. Gauge and recent-rain checks matter more than the calendar because low summer water and post-storm wood both change the trip quickly.",
      "difficulty": "moderate",
      "difficultyNotes": "CanWePaddle classifies this as flatwater, but the 18-mile length, rural access spacing, private banks, and Amana dam/diversion caveat make it a committed day rather than a beginner short float.",
      "confidenceNotes": "Confidence is acceptable for a guarded current-baseline add: CanWePaddle publishes a route-specific Marengo-to-Amana range tied to the direct Marengo USGS gauge, Iowa County Conservation documents river access near Marengo, and older Iowa DNR/Iowa River guide material documents the Iowa River corridor and Amana dam/canal hazard context. The take-out remains an Amana-area public-access anchor, so logistics copy requires same-day take-out confirmation."
    },
    "evidenceNotes": [
      {
        "label": "Current gauge check",
        "value": "2,120 cfs / 8.88 ft at 2026-07-22 20:00 CDT",
        "note": "USGS Water Services returned current Marengo discharge and stage during this run, inside the selected CanWePaddle range.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05453100&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold range",
        "value": "300-5,000 cfs",
        "note": "CanWePaddle ties the Marengo-to-Amana section to USGS 05453100 and estimates a 300 to 5,000 cfs runnable window.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/iowa-river-marengo-to-amana/"
      },
      {
        "label": "Route shape",
        "value": "18 miles / about 7 hours",
        "note": "CanWePaddle identifies Marengo to Amana as an 18-mile Iowa River flatwater route with a typical seven-hour float time.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/iowa-river-marengo-to-amana/"
      },
      {
        "label": "Marengo access support",
        "value": "Gateway and Big Bend river-access corridor",
        "note": "Iowa County Conservation documents Iowa River access at Gateway Park and limited Iowa River access and parking at Big Bend near Marengo, with flooding caveats.",
        "sourceUrl": "https://www.mycountyparks.com/county/iowa/Park/Gateway-Park-and-Preserve"
      },
      {
        "label": "Dam and diversion caveat",
        "value": "Amana society dam and canal system",
        "note": "Iowa River guide material notes a dam roughly five miles below Marengo that diverts water toward the Amana canal system, so this route requires take-out discipline and no casual downstream extension.",
        "sourceUrl": "https://media.rainpos.com/8576/cdo_iowa_river_tama_county_to_the_mississippi_river.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "CanWePaddle Iowa River Marengo to Amana",
        "url": "https://canwepaddle.com/rivers/iowa/iowa-river-marengo-to-amana/",
        "provider": "local"
      },
      {
        "label": "USGS 05453100 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05453100/",
        "provider": "usgs"
      },
      {
        "label": "Iowa County Gateway Park and Preserve",
        "url": "https://www.mycountyparks.com/county/iowa/Park/Gateway-Park-and-Preserve",
        "provider": "local"
      },
      {
        "label": "Iowa County Big Bend Conservation Area",
        "url": "https://iowacountyconservation.org/things-to-do/our-properties/big-bend-conservation-area/",
        "provider": "local"
      },
      {
        "label": "Iowa River guide PDF",
        "url": "https://media.rainpos.com/8576/cdo_iowa_river_tama_county_to_the_mississippi_river.pdf",
        "provider": "local"
      }
    ]
  },
  {
    "id": "cedar-river-chain-lakes-ellis-harbor",
    "slug": "cedar-river-chain-lakes-ellis-harbor",
    "name": "Cedar River",
    "reach": "Chain Lakes / Palo to Ellis Harbor",
    "state": "Iowa",
    "region": "Cedar Rapids Area",
    "summary": "Lower Cedar River day from the Chain Lakes / Palo access corridor into Cedar Rapids, with a direct Cedar Rapids gauge and a mandatory urban take-out before downstream dams.",
    "statusText": "Use the Cedar Rapids gauge. CanWePaddle estimates 500 to 8,000 cfs as the runnable window; current water above that range is high-caution, with pushy current and fewer stopping options.",
    "latitude": 42.074,
    "longitude": -91.803,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "dam",
        "mandatory_takeout",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "Take out at Ellis Harbor or another confirmed Cedar Rapids public ramp before continuing into the downtown dam and flood-control corridor.",
        "The lower Cedar is broad and exposed. Wind, motorboats, high water, floating debris, and bridge current can all matter more than the flatwater label suggests.",
        "City boat ramps can close during high water. Confirm Cedar Rapids ramp status before launching from Chain Lakes."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05464500",
      "provider": "usgs",
      "siteId": "05464500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Cedar River at Cedar Rapids, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05464500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 500,
      "idealMax": 8000,
      "tooLow": 500,
      "tooHigh": 8000,
      "thresholdSource": {
        "label": "CanWePaddle Palo to Cedar Rapids estimated range",
        "url": "https://canwepaddle.com/rivers/iowa/cedar-river-palo-to-cedar-rapids/",
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
      "seasonNotes": "April through October is the normal season. This reach can be too shallow near the floor and too fast through Cedar Rapids after storms or upstream releases.",
      "difficulty": "moderate",
      "difficultyNotes": "CanWePaddle labels the route flatwater, but the long open channel, urban take-out discipline, downstream dam corridor, motorboat wakes, and high-water closures make it a caution route.",
      "confidenceNotes": "Confidence is good for a guarded metro-river add: CanWePaddle publishes the Palo-to-Cedar-Rapids range against the direct Cedar Rapids USGS gauge, Linn County and Iowa DOT support the Chain Lakes / Palo public access and boat-landing context, and Cedar Rapids documents Ellis Harbor as a public boat launch with restrooms. The card uses Ellis Harbor as the conservative upstream Cedar Rapids take-out rather than extending toward downtown dams."
    },
    "evidenceNotes": [
      {
        "label": "Current gauge check",
        "value": "8,400 cfs / 5.87 ft at 2026-07-22 20:00 CDT",
        "note": "USGS Water Services returned current Cedar Rapids discharge and stage during this run, slightly above the selected CanWePaddle range.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05464500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold range",
        "value": "500-8,000 cfs",
        "note": "CanWePaddle ties the Palo-to-Cedar-Rapids section to USGS 05464500 and estimates a 500 to 8,000 cfs runnable window, with high-caution messaging above the comfortable range.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/cedar-river-palo-to-cedar-rapids/"
      },
      {
        "label": "Route shape",
        "value": "14 miles / about 5 hours",
        "note": "CanWePaddle identifies Palo to Cedar Rapids as a 14-mile lower Cedar River flatwater route.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/cedar-river-palo-to-cedar-rapids/"
      },
      {
        "label": "Put-in support",
        "value": "Chain Lakes / Palo boat landing",
        "note": "Linn County documents Chain Lakes Natural Area at Palo, and Iowa DOT describes the Chain Lakes Bridge area as having a picnic area and boat landing near the bridge approach.",
        "sourceUrl": "https://www.mycountyparks.com/county/linn/Park/Chain-Lakes-Natural-Area"
      },
      {
        "label": "Take-out support",
        "value": "Ellis Harbor public boat launch",
        "note": "The City of Cedar Rapids says Ellis Harbor is open to the public and has a public boat launch and restrooms.",
        "sourceUrl": "https://www.cedar-rapids.org/residents/parks_and_recreation/ellis_harbor.php"
      }
    ],
    "sourceLinks": [
      {
        "label": "CanWePaddle Cedar River Palo to Cedar Rapids",
        "url": "https://canwepaddle.com/rivers/iowa/cedar-river-palo-to-cedar-rapids/",
        "provider": "local"
      },
      {
        "label": "USGS 05464500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05464500/",
        "provider": "usgs"
      },
      {
        "label": "Linn County Chain Lakes Natural Area",
        "url": "https://www.mycountyparks.com/county/linn/Park/Chain-Lakes-Natural-Area",
        "provider": "local"
      },
      {
        "label": "Iowa DOT Chain Lakes Bridge",
        "url": "https://iowadot.gov/transportation-development/location-environment/all-historic-bridges/pratt/chain-lakes-bridge",
        "provider": "local"
      },
      {
        "label": "City of Cedar Rapids Ellis Harbor",
        "url": "https://www.cedar-rapids.org/residents/parks_and_recreation/ellis_harbor.php",
        "provider": "local"
      }
    ]
  },
  {
    "id": "turkey-river-clermont-gilbertson",
    "slug": "turkey-river-clermont-gilbertson",
    "name": "Turkey River",
    "reach": "Clermont Canoe Access to Gilbertson Park / Elgin",
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Official Turkey River Water Trail segment from the below-dam Clermont canoe access to the Gilbertson Park / Elgin access corridor, using the direct Eldorado gauge.",
    "statusText": "Use the Turkey River near Eldorado gauge. CanWePaddle estimates 120 to 1,500 cfs as the runnable window; avoid fast-rising water and never run the Clermont dam.",
    "latitude": 42.9969,
    "longitude": -91.6487,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "dam",
        "mandatory_takeout",
        "strainers",
        "fast_rise",
        "private_banks",
        "cold_water"
      ],
      "safetyNotes": [
        "Start below the Clermont dam at the signed Clermont Canoe Access. Do not launch above the dam or treat the upstream portage as part of this route.",
        "The water-trail guide notes some white water on the Clermont-to-Elgin segment; scout blind riffles and wood, especially after storms.",
        "Gilbertson Park is the intended finish. Do not continue into the longer Elgin-to-Big-Spring or Elgin-to-Elkader routes unless daylight, shuttle, and gauge plans are set."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05411850",
      "provider": "usgs",
      "siteId": "05411850",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Turkey River near Eldorado, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05411850/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 120,
      "idealMax": 1500,
      "tooLow": 120,
      "tooHigh": 1500,
      "thresholdSource": {
        "label": "CanWePaddle Clermont to Elgin estimated range",
        "url": "https://canwepaddle.com/rivers/iowa/turkey-river-clermont-to-elgin/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "CanWePaddle identifies May through September as the normal season. The upstream Turkey can rise quickly after storms and can scrape in late-summer low water.",
      "difficulty": "moderate",
      "difficultyNotes": "The segment is listed as Class I, but the dam-adjacent start, swift riffles, wood, and private banks make it more than a casual tubing float.",
      "confidenceNotes": "Confidence is good: the Turkey River Water Trail guide documents Clermont Access #64B to Elgin / Gilbertson Park Access #59A or #59B as an official segment with access numbers, mileage, dam-portage context, and route character. CanWePaddle ties the exact Clermont-to-Elgin reach to the direct Eldorado USGS gauge."
    },
    "evidenceNotes": [
      {
        "label": "Current gauge check",
        "value": "763 cfs / 6.52 ft at 2026-07-22 23:45 CDT",
        "note": "USGS Water Services returned current Eldorado discharge and stage during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05411850&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold range",
        "value": "120-1,500 cfs",
        "note": "CanWePaddle ties Clermont-to-Elgin to USGS 05411850 and estimates a 120 to 1,500 cfs runnable window.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/turkey-river-clermont-to-elgin/"
      },
      {
        "label": "Official segment",
        "value": "Clermont #64B to Elgin/Gilbertson #59A or #59B, about 5 to 8 miles by start choice",
        "note": "The Turkey River Water Trail guide names the official Clermont-to-Elgin/Gilbertson segment and warns users not to run the Clermont dam.",
        "sourceUrl": "https://turkeyriver.org/wp-content/uploads/turkeyRiverWaterTrailGuide.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "CanWePaddle Turkey River Clermont to Elgin",
        "url": "https://canwepaddle.com/rivers/iowa/turkey-river-clermont-to-elgin/",
        "provider": "local"
      },
      {
        "label": "Turkey River Water Trail guide",
        "url": "https://turkeyriver.org/wp-content/uploads/turkeyRiverWaterTrailGuide.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 05411850 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05411850/",
        "provider": "usgs"
      },
      {
        "label": "Fayette County Turkey River Recreational Corridor",
        "url": "https://www.fayettecountyconservation.org/turkey-river-recreational-trail",
        "provider": "local"
      }
    ]
  },
  {
    "id": "maquoketa-river-monmouth-maquoketa",
    "slug": "maquoketa-river-monmouth-maquoketa",
    "name": "Maquoketa River",
    "reach": "Millertown / Monmouth corridor to Bridgeport Access",
    "state": "Iowa",
    "region": "Eastern Iowa",
    "summary": "Lower Maquoketa day from the Monmouth-area Millertown access chain to Bridgeport near Maquoketa, with Jackson County water-trail access support and a direct Maquoketa gauge.",
    "statusText": "Use the Maquoketa near Maquoketa gauge. CanWePaddle estimates 200 to 2,500 cfs as the runnable window; high or rising water makes this lower-river day pushier around bridges, wood, and muddy banks.",
    "latitude": 42.084,
    "longitude": -90.762,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks",
        "cold_water",
        "access_uncertain"
      ],
      "safetyNotes": [
        "Use only the named Jackson County water-trail accesses; do not improvise on private lower-Maquoketa banks.",
        "Confirm the Monmouth-area put-in before staging the shuttle because Jackson County names Millertown Bridge, Joinerville, and Bridgeport as separate public access options in this lower chain.",
        "Bridgeport is upstream of Maquoketa town and the lower gauge corridor. Do not continue downstream without a separate access and flood-stage review."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05418500",
      "provider": "usgs",
      "siteId": "05418500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Maquoketa River near Maquoketa, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05418500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 200,
      "idealMax": 2500,
      "tooLow": 200,
      "tooHigh": 2500,
      "thresholdSource": {
        "label": "CanWePaddle Monmouth to Maquoketa estimated range",
        "url": "https://canwepaddle.com/rivers/iowa/maquoketa-river-monmouth-to-maquoketa/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "CanWePaddle identifies May through September as the normal lower-Maquoketa paddling season. Spring and storm runoff can make the lower river fast and muddy.",
      "difficulty": "easy",
      "difficultyNotes": "Flatwater with ordinary riffles in normal conditions, but the route keeps a caution profile for a lower-river shuttle, private banks, wood, and high-water bridge current.",
      "confidenceNotes": "Confidence is moderate-good: CanWePaddle documents the exact Monmouth-to-Maquoketa route and direct Maquoketa gauge range, while Jackson County documents the lower Maquoketa water-trail access chain including Millertown Bridge, Joinerville Park, and Bridgeport Access. Endpoint coordinates are practical access-corridor anchors that require same-day sign confirmation."
    },
    "evidenceNotes": [
      {
        "label": "Current gauge check",
        "value": "1,890 cfs / 12.63 ft at 2026-07-23 00:15 CDT",
        "note": "USGS Water Services returned current Maquoketa discharge and stage during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05418500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold range",
        "value": "200-2,500 cfs",
        "note": "CanWePaddle ties Monmouth-to-Maquoketa to USGS 05418500 and estimates a 200 to 2,500 cfs runnable window.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/maquoketa-river-monmouth-to-maquoketa/"
      },
      {
        "label": "Access chain",
        "value": "Millertown, Joinerville, Bridgeport, and downstream Jackson County accesses",
        "note": "Jackson County Conservation lists the lower Maquoketa water-trail accesses and says the river is open to the public year round.",
        "sourceUrl": "https://www.mycountyparks.com/county/jackson/Park/Maquoketa-River-Water-Trail"
      }
    ],
    "sourceLinks": [
      {
        "label": "CanWePaddle Maquoketa River Monmouth to Maquoketa",
        "url": "https://canwepaddle.com/rivers/iowa/maquoketa-river-monmouth-to-maquoketa/",
        "provider": "local"
      },
      {
        "label": "Jackson County Maquoketa River Water Trail",
        "url": "https://www.mycountyparks.com/county/jackson/Park/Maquoketa-River-Water-Trail",
        "provider": "local"
      },
      {
        "label": "USGS 05418500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05418500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "west-nishnabotna-river-oakland-macedonia",
    "slug": "west-nishnabotna-river-oakland-macedonia",
    "name": "West Nishnabotna River",
    "reach": "Chautauqua Park / Oakland to Olde Town Park / Macedonia",
    "state": "Iowa",
    "region": "Southwest Iowa",
    "summary": "Prairie water-trail day on southwest Iowa's West Nishnabotna, linking Oakland's Chautauqua Park with Olde Town Park near Macedonia and using the direct Randolph gauge.",
    "statusText": "Use the West Nishnabotna at Randolph gauge. CanWePaddle estimates 120 to 1,800 cfs for the Oakland-to-Randolph corridor; do not paddle when the river is quickly rising or near flood stage.",
    "latitude": 41.30695,
    "longitude": -95.40363,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks",
        "access_uncertain"
      ],
      "safetyNotes": [
        "This is a muddy, meandering prairie stream with wood, sandbars, and limited developed exits between access towns.",
        "Official water-trail guidance warns not to canoe when the West Nishnabotna is quickly rising or near flood stage.",
        "Use only the signed Chautauqua, Carson/Millstone, and Olde Town access areas; most banks between them should be treated as private."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-06808500",
      "provider": "usgs",
      "siteId": "06808500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "West Nishnabotna River at Randolph, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06808500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 120,
      "idealMax": 1800,
      "tooLow": 120,
      "tooHigh": 1800,
      "thresholdSource": {
        "label": "CanWePaddle Oakland to Randolph estimated range",
        "url": "https://canwepaddle.com/rivers/iowa/west-nishnabotna-river-oakland-to-randolph/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "May through September is the normal season. The West Nishnabotna is rain-sensitive, can become too shallow in dry spells, and can become unsafe during rapid rises.",
      "difficulty": "easy",
      "difficultyNotes": "Normally flatwater, but the long rural shuttle, muddy banks, wood, water-quality uncertainty, and sparse exits keep it in the caution tier.",
      "confidenceNotes": "Confidence is good for public access and guarded for thresholds: Iowa DNR lists the West Nishnabotna as a 26.8-mile water trail, Pottawattamie and tourism sources document Chautauqua Park, Carson, and Olde Town Park as access points, and CanWePaddle ties the broader Oakland-to-Randolph corridor to the direct Randolph gauge. This route stops at Olde Town Park, the official downstream water-trail access, rather than assuming an unverified Randolph take-out."
    },
    "evidenceNotes": [
      {
        "label": "Current gauge check",
        "value": "536 cfs / 8.41 ft at 2026-07-23 00:00 CDT",
        "note": "USGS Water Services returned current Randolph discharge and stage during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=06808500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold range",
        "value": "120-1,800 cfs",
        "note": "CanWePaddle ties the Oakland-to-Randolph corridor to USGS 06808500 and estimates a 120 to 1,800 cfs runnable window.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/west-nishnabotna-river-oakland-to-randolph/"
      },
      {
        "label": "Water-trail status",
        "value": "26.8-mile state-designated water trail",
        "note": "Iowa DNR and Travel Iowa identify the West Nishnabotna as a 26.8-mile water trail, with wooded banks and sandbar picnic context.",
        "sourceUrl": "https://www.traveliowa.com/trails/west-nishnabotna-river-water-trail/93/"
      },
      {
        "label": "Public endpoints",
        "value": "Chautauqua Park to Olde Town Park",
        "note": "Local and county sources document Chautauqua Park as West Nishnabotna Water Trail access and Olde Town Park as a West Nishnabotna river access with canoe/tube launching.",
        "sourceUrl": "https://www.pottconservation.com/parks/old_town/"
      }
    ],
    "sourceLinks": [
      {
        "label": "CanWePaddle West Nishnabotna Oakland to Randolph",
        "url": "https://canwepaddle.com/rivers/iowa/west-nishnabotna-river-oakland-to-randolph/",
        "provider": "local"
      },
      {
        "label": "Travel Iowa West Nishnabotna Water Trail",
        "url": "https://www.traveliowa.com/trails/west-nishnabotna-river-water-trail/93/",
        "provider": "local"
      },
      {
        "label": "Chautauqua Park Oakland",
        "url": "https://www.unleashcb.com/play/chautauqua_park/",
        "provider": "local"
      },
      {
        "label": "Pottawattamie Conservation Olde Town Park",
        "url": "https://www.pottconservation.com/parks/old_town/",
        "provider": "local"
      },
      {
        "label": "USGS 06808500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06808500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "east-nishnabotna-river-red-oak-essex",
    "slug": "east-nishnabotna-river-red-oak-essex",
    "name": "East Nishnabotna River",
    "reach": "Coolbaugh Street / Red Oak to Essex Bridge Access",
    "state": "Iowa",
    "region": "Southwest Iowa",
    "summary": "Twelve-mile southwest Iowa day on the East Nishnabotna from the Red Oak gauge bridge corridor to Essex, with Iowa DNR map access support and a direct Red Oak USGS gauge.",
    "statusText": "Use the Red Oak gauge. CanWePaddle estimates 100 to 1,500 cfs as the runnable window; avoid rising or flood-stage water because banks are muddy, wood can move, and exits are sparse.",
    "latitude": 41.0082,
    "longitude": -95.2418,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "The East Nishnabotna is a muddy agricultural river with limited developed exits. Use only the named access corridors and confirm same-day parking and bank condition.",
        "Do not paddle when the Red Oak gauge is rising quickly or approaching flood guidance; muddy banks and wood make rescues harder than the flatwater label suggests.",
        "Treat banks outside public accesses, public conservation land, or clearly legal stops as private."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-06809500",
      "provider": "usgs",
      "siteId": "06809500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "East Nishnabotna River at Red Oak, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-06809500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 100,
      "idealMax": 1500,
      "tooLow": 100,
      "tooHigh": 1500,
      "thresholdSource": {
        "label": "CanWePaddle East Nishnabotna Red-Oak-to-Essex estimated range",
        "url": "https://canwepaddle.com/rivers/iowa/east-nishnabotna-river-red-oak-to-essex/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "CanWePaddle identifies May through September as the normal season. Summer can expose shallow bars near the floor, while thunderstorms can push the river up quickly.",
      "difficulty": "easy",
      "difficultyNotes": "Flatwater in normal conditions, but muddy banks, wood, water-quality uncertainty, private shoreline, and rural spacing keep the app in a caution posture.",
      "confidenceNotes": "Confidence is moderate: CanWePaddle provides an exact Red-Oak-to-Essex route and direct Red Oak USGS gauge range; Iowa DNR maps East Nishnabotna boat-ramp and fishing-access corridors in Montgomery and Page counties; and Iowa Paddle / access-directory records corroborate Coolbaugh Street and Essex Bridge as public access names. Endpoint coordinates are practical access anchors and should be verified on site."
    },
    "evidenceNotes": [
      {
        "label": "Current gauge check",
        "value": "200 cfs / 5.86 ft at 2026-07-23 01:00 CDT",
        "note": "USGS Water Services returned current Red Oak discharge and stage during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=06809500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold range",
        "value": "100-1,500 cfs",
        "note": "CanWePaddle ties the Red Oak-to-Essex section to USGS 06809500 and estimates a 100 to 1,500 cfs runnable window.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/east-nishnabotna-river-red-oak-to-essex/"
      },
      {
        "label": "Official access-map support",
        "value": "East Nishnabotna boat-ramp corridor in Montgomery and Page counties",
        "note": "Iowa DNR Fish Iowa maps the East Nishnabotna River through Montgomery and Page counties with boat-ramp and fishing-access symbols near Red Oak, Essex, and downstream towns.",
        "sourceUrl": "https://programs.iowadnr.gov/lakemanagement/LakeDocuments/maps/REN36.pdf"
      },
      {
        "label": "Flood-stage context",
        "value": "NOAA Red Oak flood guidance",
        "note": "NOAA/NWPS Red Oak guidance identifies bridge and flood behavior for the gauge site; use it as a high-water stand-down context rather than a paddling range.",
        "sourceUrl": "https://water.noaa.gov/gauges/rdoi4"
      }
    ],
    "sourceLinks": [
      {
        "label": "CanWePaddle East Nishnabotna Red Oak to Essex",
        "url": "https://canwepaddle.com/rivers/iowa/east-nishnabotna-river-red-oak-to-essex/",
        "provider": "local"
      },
      {
        "label": "USGS 06809500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-06809500/",
        "provider": "usgs"
      },
      {
        "label": "Iowa DNR East Nishnabotna River map",
        "url": "https://programs.iowadnr.gov/lakemanagement/LakeDocuments/maps/REN36.pdf",
        "provider": "local"
      },
      {
        "label": "Montgomery County Bonds Landing context",
        "url": "https://montgomeryccb.org/parks-wildlife-areas/bonds-landing-canoe-access/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "maquoketa-river-pictured-rocks-ebys-mill",
    "slug": "maquoketa-river-pictured-rocks-ebys-mill",
    "name": "Maquoketa River",
    "reach": "Pictured Rocks Park to Eby's Mill Access",
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Six-plus-mile Jones County Maquoketa section from Pictured Rocks to the improved Eby's Mill ramp, preserving the scenic public-land reach without using the weaker Supples Bridge take-out.",
    "statusText": "Use the Manchester gauge as the upstream same-river check. Miles Paddled found 155 cfs minimally runnable and 200 to 250 cfs better; higher water requires wood and bridge-current judgment.",
    "latitude": 42.17256,
    "longitude": -91.10471,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks",
        "low_head_dam",
        "cold_water"
      ],
      "safetyNotes": [
        "This route starts below the Monticello / Mon-Maq dam corridor and does not include any dam approach or portage.",
        "The Eby's Mill ramp is the planned take-out. Do not continue to Supples Bridge unless the group has separately accepted that muddier, less visible access.",
        "Expect overhanging trees, logjams, bridge abutments, large rocks, and private-bank limits called out by the Iowa DNR/Jones County water-trail guide."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05416900",
      "provider": "usgs",
      "siteId": "05416900",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Maquoketa River at Manchester, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05416900/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 200,
      "idealMax": 250,
      "tooLow": 155,
      "thresholdSource": {
        "label": "Miles Paddled Maquoketa River III Manchester-gauge note",
        "url": "https://milespaddled.com/maquoketa-river-iii/",
        "provider": "miles_paddled"
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
      "seasonNotes": "Spring and fall usually provide better water and more visible bluffs. Summer weekends can be busier around Pictured Rocks, and low water can make the broad Maquoketa scrape on gravel.",
      "difficulty": "easy",
      "difficultyNotes": "Quietwater with scarce riffles, but the route still has moving-water hazards, wind-prone broad sections, strainers, and a take-out that must be identified before continuing downstream.",
      "confidenceNotes": "Confidence is good for a conservative minimum-only add: Jones County / Iowa DNR water-trail materials document Pictured Rocks-to-Highway-136 with Eby's Mill inside the public-land corridor, Jones County documents Eby's Mill as a rebuilt public ramp, Miles Paddled ties the broader Monticello-to-Eby's route to Manchester gauge observations, and USGS provides current Manchester data. No upper cutoff is inferred."
    },
    "evidenceNotes": [
      {
        "label": "Current gauge check",
        "value": "414 cfs / 5.16 ft at 2026-07-23 01:15 CDT",
        "note": "USGS Water Services returned current Manchester discharge and stage during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05416900&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Minimum water guidance",
        "value": "155 cfs minimum; 200-250 cfs better",
        "note": "Miles Paddled recorded 155 cfs / 4.4 ft at Manchester as a minimal recommended level for the Monticello-to-Eby’s route and says 200 to 250 cfs is better to avoid scraping.",
        "sourceUrl": "https://milespaddled.com/maquoketa-river-iii/"
      },
      {
        "label": "Official route shape",
        "value": "Pictured Rocks to Eby’s Mill inside the 11.7-mile Pictured Rocks-to-Highway-136 section",
        "note": "The Iowa DNR/Jones County guide describes six-plus miles between Pictured Rocks Park Access and Eby’s Mill Road along public land with limestone bluffs, then continues to Highway 136.",
        "sourceUrl": "https://www.jonescountyiowa.gov/files/conservation/maquoketa_river_water_trail_jones_county_iowa_dnr_31408.pdf"
      },
      {
        "label": "Take-out support",
        "value": "Eby's Mill rebuilt hard-surface ramp",
        "note": "Jones County says Eby's Mill River Access was redone with a hard-surface ramp, stabilized shoreline, parking, sidewalk, and kiosk support for kayaks, canoes, and tubers.",
        "sourceUrl": "https://www.jonescountyiowa.gov/conservation/parks/eby039s_mill_bridge_access/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Miles Paddled Maquoketa River III",
        "url": "https://milespaddled.com/maquoketa-river-iii/",
        "provider": "miles_paddled"
      },
      {
        "label": "Jones County / Iowa DNR Maquoketa guide",
        "url": "https://www.jonescountyiowa.gov/files/conservation/maquoketa_river_water_trail_jones_county_iowa_dnr_31408.pdf",
        "provider": "local"
      },
      {
        "label": "Jones County Eby's Mill Access",
        "url": "https://www.jonescountyiowa.gov/conservation/parks/eby039s_mill_bridge_access/",
        "provider": "local"
      },
      {
        "label": "USGS 05416900 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05416900/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "upper-iowa-river-lower-dam-iverson-bridge",
    "slug": "upper-iowa-river-lower-dam-iverson-bridge",
    "name": "Upper Iowa River",
    "reach": "Lower Dam Access to Iverson Bridge Access",
    "state": "Iowa",
    "region": "Driftless Area",
    "summary": "Long downstream Upper Iowa continuation from the signed Lower Dam access to Iverson Bridge, with official paddler-guide access timing, dam-boundary discipline, and direct Decorah gauge data.",
    "statusText": "Use the Decorah gauge. Miles Paddled ran this reach at 245 cfs with occasional scraping and suggests 300 to 400 cfs for a smoother ride; no high-water cutoff is inferred.",
    "latitude": 43.33998,
    "longitude": -91.64203,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "dam",
        "strainers",
        "fast_rise",
        "private_banks",
        "remote",
        "cold_water"
      ],
      "safetyNotes": [
        "Launch below the Lower Dam access only. The Upper Iowa River guide and Iowa DNR Fish Iowa identify multiple Decorah-area dams that must be portaged or avoided.",
        "This is a 15.75-mile rural day with limited services. Canoe Creek and Iverson Bottoms are useful source-backed access references, but do not assume every bank is public.",
        "Avoid rising water, fresh wood, and cold-water shoulder-season trips without a capable group and a daylight plan."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05387500",
      "provider": "usgs",
      "siteId": "05387500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Upper Iowa River at Decorah, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05387500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 300,
      "idealMax": 400,
      "tooLow": 245,
      "thresholdSource": {
        "label": "Miles Paddled Upper Iowa River VII Dorchester/Decorah-gauge observation",
        "url": "https://milespaddled.com/upper-iowa-river-vii/",
        "provider": "miles_paddled"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "seasonNotes": "Late spring through fall is the practical season. This downstream continuation is less livery-dense than the Bluffton corridor, so daylight, wind, and water temperature matter more.",
      "difficulty": "moderate",
      "difficultyNotes": "Class I moving water, but 15.75 miles, downstream remoteness, dam-boundary launch discipline, possible scraping, and wood exposure make this more committed than the shorter Decorah cards.",
      "confidenceNotes": "Confidence is good for a prompted downstream continuation: Miles Paddled documents Lower Dam-to-Iverson Bridge with coordinates, mileage, timing, and gauge observation; the Upper Iowa Paddler’s Guide maps Lower Dam, Canoe Creek, Iverson Bottoms, and Iverson Bridge in sequence; Winneshiek County hosts the guide; and USGS provides current direct Decorah data. The model is minimum-only because the source does not publish an upper limit."
    },
    "evidenceNotes": [
      {
        "label": "Current gauge check",
        "value": "981 cfs / 2.80 ft at 2026-07-23 00:45 CDT",
        "note": "USGS Water Services returned current Decorah discharge and stage during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05387500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route-specific water note",
        "value": "245 cfs worked with occasional scraping; 300-400 cfs smoother",
        "note": "Miles Paddled recorded the Lower-Dam-to-Iverson trip at 245 cfs and recommends 300 to 400 cfs for a smoother ride.",
        "sourceUrl": "https://milespaddled.com/upper-iowa-river-vii/"
      },
      {
        "label": "Official access chain",
        "value": "Lower Dam Access, Canoe Creek, Iverson Bottoms, Iverson Bridge",
        "note": "The Upper Iowa River Paddler’s Guide maps Lower Dam Access to Canoe Creek Access, Iverson Bottoms Access, and Iverson Bridge Access with paddle-time context.",
        "sourceUrl": "https://www.winneshiekwild.com/wp-content/uploads/2019/12/Upper-Iowa-River-Paddlers-Guide-Web.pdf"
      },
      {
        "label": "Dam and corridor context",
        "value": "Three upper-corridor dams must be portaged or avoided",
        "note": "Iowa DNR Fish Iowa says the Upper Iowa is a paddlers’ dream but identifies Lidtke Mill, Upper Dam, and Lower Dam as dams in this stretch that must be portaged around.",
        "sourceUrl": "https://programs.iowadnr.gov/lakemanagement/FishIowa/RiverStreamDetails/RUI96"
      }
    ],
    "sourceLinks": [
      {
        "label": "Miles Paddled Upper Iowa River VII",
        "url": "https://milespaddled.com/upper-iowa-river-vii/",
        "provider": "miles_paddled"
      },
      {
        "label": "Upper Iowa River Paddler’s Guide PDF",
        "url": "https://www.winneshiekwild.com/wp-content/uploads/2019/12/Upper-Iowa-River-Paddlers-Guide-Web.pdf",
        "provider": "local"
      },
      {
        "label": "Winneshiek County Upper Iowa River",
        "url": "https://www.winneshiekwild.com/park-trail/upper-iowa-river",
        "provider": "local"
      },
      {
        "label": "USGS 05387500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05387500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "maquoketa-river-ebys-mill-supples-bridge",
    "slug": "maquoketa-river-ebys-mill-supples-bridge",
    "name": "Maquoketa River",
    "reach": "Eby's Mill Access to Supples Bridge Access",
    "aliases": [
      "Maquoketa River - Eby's Mill to Supples Bridge",
      "Maquoketa River IV - Eby's Mill Road to Supples Bridge Access"
    ],
    "state": "Iowa",
    "region": "Eastern Iowa",
    "summary": "Quiet lower-Maquoketa connector from the improved Eby's Mill ramp to Supples Bridge, with exact Miles Paddled level guidance and Jones County water-trail access context.",
    "statusText": "Use the Manchester gauge. Miles Paddled ran this exact reach at 78 cfs / 3.9 ft and called it too low, recommending at least 150 cfs / 4.2 ft; no high-water cutoff is inferred.",
    "latitude": 42.19803,
    "longitude": -91.0566,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "remote",
        "private_banks",
        "cold_water"
      ],
      "safetyNotes": [
        "Start at the rebuilt Eby's Mill public ramp and verify it is open before staging; this route intentionally begins below the stronger Pictured Rocks bluff section.",
        "Miles Paddled describes wide, shallow quietwater with scarce riffles, frequent sand and gravel grounding at low water, wind exposure, and occasional tree-debris obstacle courses.",
        "Supples Bridge / Temple Hill Road is a legitimate but simpler sand access downstream of the bridge. Confirm bank condition and road parking before committing a shuttle."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05416900",
      "provider": "usgs",
      "siteId": "05416900",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Maquoketa River at Manchester, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05416900/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 150,
      "thresholdSource": {
        "label": "Miles Paddled Maquoketa River IV Eby's-Mill-to-Supples guidance",
        "url": "https://milespaddled.com/maquoketa-river-iv/",
        "provider": "miles_paddled"
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
      "seasonNotes": "Spring and fall tend to provide better water and more visible rock. Summer drought can leave the broad channel scrapey, while storm pulses increase wood, bridge current, and bank-exit exposure.",
      "difficulty": "easy",
      "difficultyNotes": "Miles Paddled rates the reach beginner and quietwater with scarce riffles. Paddle Today keeps caution copy because it is an 8.25-mile rural connector with weak bailout options, low-water scraping, wind, and wood.",
      "confidenceNotes": "Confidence is good for a conservative lower-Maquoketa connector: Miles Paddled documents the exact Eby's Mill-to-Supples Bridge route, endpoint coordinates, 8.25-mile distance, beginner/quietwater character, 78 cfs observed low trip, and 150 cfs / 4.2 ft minimum recommendation tied to USGS 05416900; the Iowa DNR/Jones County guide places this access pair inside the official lower Maquoketa water-trail corridor; Jones County documents Eby's Mill Wildlife Area and related river-access context; and USGS 05416900 is the direct upstream Maquoketa gauge Miles Paddled says to use for this section."
    },
    "evidenceNotes": [
      {
        "label": "Current gauge check",
        "value": "399 cfs / 5.10 ft at 2026-07-23 03:15 CDT",
        "note": "USGS Water Services returned current Manchester discharge and stage during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05416900&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Exact route report",
        "value": "Eby's Mill Road to Supples Bridge Access, 8.25 mi",
        "note": "Miles Paddled documents the exact put-in and take-out, GPS coordinates, three-hour trip time, route character, and access notes.",
        "sourceUrl": "https://milespaddled.com/maquoketa-river-iv/"
      },
      {
        "label": "Threshold floor",
        "value": "150 cfs / 4.2 ft minimum-only",
        "note": "Miles Paddled says the 78 cfs / 3.9 ft trip was too low for comfortable paddling and recommends at least 4.2 ft / 150 cfs to avoid scraping.",
        "sourceUrl": "https://milespaddled.com/maquoketa-river-iv/"
      },
      {
        "label": "Official corridor",
        "value": "Lower Maquoketa water trail between Eby's Mill, Highway 136, and Supples/Temple Hill",
        "note": "The Iowa DNR/Jones County paddlers guide maps the lower-Maquoketa access chain below Pictured Rocks and documents dams, public access symbols, private-bank limits, and safety rules for the corridor.",
        "sourceUrl": "https://northeastiowarcd.org/wp-content/uploads/2021/01/Maquoketa-River-Paddlers-Guide.pdf"
      },
      {
        "label": "Public endpoint support",
        "value": "Eby's Mill ramp and Supples Bridge / Temple Hill Road access",
        "note": "Miles Paddled describes the rebuilt Eby's Mill landing as excellent and the Supples Bridge access as legitimate, mostly flat, and sandy; Jones County documents Eby's Mill Wildlife Area public land.",
        "sourceUrl": "https://www.jonescountyiowa.gov/conservation/parks___wildlife_areas/eby_s_mill_wildlife_area/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Miles Paddled Maquoketa River IV",
        "url": "https://milespaddled.com/maquoketa-river-iv/",
        "provider": "miles_paddled"
      },
      {
        "label": "Maquoketa River Paddlers Guide",
        "url": "https://northeastiowarcd.org/wp-content/uploads/2021/01/Maquoketa-River-Paddlers-Guide.pdf",
        "provider": "local"
      },
      {
        "label": "Jones County Eby's Mill Wildlife Area",
        "url": "https://www.jonescountyiowa.gov/conservation/parks___wildlife_areas/eby_s_mill_wildlife_area/",
        "provider": "local"
      },
      {
        "label": "USGS 05416900 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05416900/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "maquoketa-river-backbone-dundee",
    "slug": "maquoketa-river-backbone-dundee",
    "name": "Maquoketa River",
    "reach": "Backbone Lake Dam Landing to Dundee Access",
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Short official upper Maquoketa water-trail section from the Backbone dam corridor to Dundee, with state-park camping nearby, riffles, wood, and a direct Manchester gauge.",
    "statusText": "Use the Maquoketa River at Manchester gauge. Wisconsin River Trips gives a Backbone gauge ladder; Paddle Today keeps this below-dam section conservative with 51 cfs as the floor and 451+ cfs as too high for broad use.",
    "latitude": 42.600692,
    "longitude": -91.536757,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "dam",
        "strainers",
        "fast_rise",
        "private_banks",
        "cold_water"
      ],
      "safetyNotes": [
        "Start below Backbone Lake Dam. Do not include the private-permission upstream reach or casual dam passage in this route.",
        "Wisconsin River Trips says the below-dam channels can be narrow, fast, and congested near 129th Street, with a two-foot ledge and low branches that deserve scouting.",
        "Backbone State Park gates, lake/dam-area access, storm debris, and Dundee landing conditions can change the plan even when the Manchester gauge is in range."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05416900",
      "provider": "usgs",
      "siteId": "05416900",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Maquoketa River at Manchester, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05416900/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 51,
      "idealMax": 250,
      "tooLow": 51,
      "tooHigh": 451,
      "thresholdSource": {
        "label": "Wisconsin River Trips Backbone State Park gauge ladder",
        "url": "https://www.wisconsinrivertrips.com/segments/maquoketa-river/backbone-state-park",
        "provider": "wisconsin_river_trips"
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
      "seasonNotes": "Spring and fall show the Backbone bluffs best. Dry late-summer water can make the route bumpy, and park gate closures or storm cleanup can affect dam-area access outside the main recreation season.",
      "difficulty": "moderate",
      "difficultyNotes": "This is a short route, but the dam-adjacent start, split channels, ledge, low branches, and wood make it a scouting-first moving-water run rather than a beginner float.",
      "confidenceNotes": "Confidence is good for a tightly scoped below-dam add: Delaware County Tourism says the canoe trail begins just below the Backbone dam and lists Backbone-to-Dundee as 1.8 miles; the Iowa DNR Delaware County guide identifies the Backbone area and private-bank limits; Wisconsin River Trips documents Backbone-to-Dundee behavior, Dundee Access, the Manchester gauge relationship, and numeric navigability estimates; and USGS 05416900 is the direct downstream Maquoketa gauge used by the source."
    },
    "evidenceNotes": [
      {
        "label": "Current gauge check",
        "value": "399 cfs / 5.10 ft at 2026-07-23 03:15 CDT",
        "note": "USGS Water Services returned current Manchester discharge and stage during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05416900&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Official route shape",
        "value": "Backbone to Dundee, 1.8 mi",
        "note": "Delaware County Tourism says the canoe trail begins just below the dam in Backbone State Park and lists Backbone to Dundee as a 1.8-mile water-trail section.",
        "sourceUrl": "https://delawarecountyiowatourism.com/along-the-maquoketa/"
      },
      {
        "label": "Gauge ladder",
        "value": "51-250 cfs broad target; 451+ cfs maybe too high",
        "note": "Wisconsin River Trips says 51-100 cfs should leave the rest of the river fine after shallow upstream sections, 101-250 cfs is average to above average, and 451+ cfs may be too high for safe paddling.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/maquoketa-river/backbone-state-park"
      },
      {
        "label": "Below-dam caveat",
        "value": "Fast split channels and ledge",
        "note": "Wisconsin River Trips warns that the dam-to-129th-Street section splits around an island, has narrow congested channels, and should be scouted before running.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/maquoketa-river/backbone-state-park"
      },
      {
        "label": "Camping context",
        "value": "Backbone State Park campground nearby",
        "note": "Delaware County Tourism notes camping, water, and restrooms at the Backbone departure point, and Iowa DNR documents Backbone State Park camping and amenities.",
        "sourceUrl": "https://www.iowadnr.gov/places-go/state-parks/all-parks/backbone-state-park"
      }
    ],
    "sourceLinks": [
      {
        "label": "Delaware County Tourism Along the Maquoketa",
        "url": "https://delawarecountyiowatourism.com/along-the-maquoketa/",
        "provider": "local"
      },
      {
        "label": "Wisconsin River Trips Maquoketa River - Backbone State Park",
        "url": "https://www.wisconsinrivertrips.com/segments/maquoketa-river/backbone-state-park",
        "provider": "wisconsin_river_trips"
      },
      {
        "label": "Iowa DNR Maquoketa River Delaware County guide",
        "url": "https://www.iowadnr.gov/media/8890/download?inline=",
        "provider": "local"
      },
      {
        "label": "Iowa DNR Backbone State Park",
        "url": "https://www.iowadnr.gov/places-go/state-parks/all-parks/backbone-state-park",
        "provider": "local"
      },
      {
        "label": "USGS 05416900 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05416900/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "maquoketa-river-quaker-mill-baileys-ford",
    "slug": "maquoketa-river-quaker-mill-baileys-ford",
    "name": "Maquoketa River",
    "reach": "Quaker Mill Dam to Bailey's Ford Access",
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Manchester-area Maquoketa day from Quaker Mill Dam through the whitewater-park corridor to Bailey's Ford, with exact-route Miles Paddled guidance and the direct Manchester gauge.",
    "statusText": "Use the Manchester gauge. Miles Paddled recommends about 195 cfs as workable and says 250 cfs would be closer to ideal; Paddle Today uses a conservative minimum-only floor and no invented high cutoff.",
    "latitude": 42.50796,
    "longitude": -91.47395,
    "routeType": "whitewater",
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "dam",
        "strainers",
        "fast_rise",
        "private_banks",
        "cold_water"
      ],
      "safetyNotes": [
        "This route begins at Quaker Mill Dam and includes the Manchester Whitewater Park corridor. Paddlers who do not have Class II gear and skills should portage or use lower access choices rather than blindly running the drops.",
        "Delaware County notes the whitewater park requires advanced skills, while Miles Paddled says the rest of the route is quieter with occasional riffles after the Manchester features.",
        "Bailey's Ford is the planned finish before Lake Delhi influence. Do not extend toward Delhi Dam without a separate no-portage dam plan and current local guidance."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05416900",
      "provider": "usgs",
      "siteId": "05416900",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Maquoketa River at Manchester, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05416900/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 195,
      "thresholdSource": {
        "label": "Miles Paddled Maquoketa River I Quaker-Mill-to-Bailey's-Ford guidance",
        "url": "https://milespaddled.com/maquoketa-river-i/",
        "provider": "miles_paddled"
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
      "seasonNotes": "Spring through fall is the useful window. Low water below the source trip level increases scraping, while high or rising water changes whitewater-park hydraulics and makes wood and bridge current less forgiving.",
      "difficulty": "moderate",
      "difficultyNotes": "Miles Paddled calls the route beginner only if the Manchester rapids are not run. Because the normal line includes Class I-II at the put-in and Class II whitewater-park features, the app keeps it whitewater-filtered.",
      "confidenceNotes": "Confidence is good for a conservative whitewater-filtered add: Miles Paddled documents the exact Quaker Mill Dam-to-Bailey's-Ford route, GPS coordinates, mileage, difficulty, and 195 cfs / 4.3 ft workable level with 250 cfs preferred; Delaware County and Iowa DNR guide material document the water-trail access chain, whitewater-park skill warning, Pin Oak/Bailey's Ford downstream sequence, and Delhi Dam boundary; and USGS 05416900 is the direct Manchester gauge."
    },
    "evidenceNotes": [
      {
        "label": "Current gauge check",
        "value": "399 cfs / 5.10 ft at 2026-07-23 03:15 CDT",
        "note": "USGS Water Services returned current Manchester discharge and stage during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05416900&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Exact route report",
        "value": "Quaker Mill Dam to Bailey's Ford Park, 7.75 mi",
        "note": "Miles Paddled documents the exact put-in and take-out, GPS coordinates, trip time, distance, and route character.",
        "sourceUrl": "https://milespaddled.com/maquoketa-river-i/"
      },
      {
        "label": "Threshold floor",
        "value": "195 cfs workable; 250 cfs closer to ideal",
        "note": "Miles Paddled recorded 195 cfs / 4.3 ft at Manchester, recommended that level with scraping caveats, and said ideal levels would be nearer 250 cfs.",
        "sourceUrl": "https://milespaddled.com/maquoketa-river-i/"
      },
      {
        "label": "Whitewater and skill",
        "value": "Class I-II / Class II features",
        "note": "Miles Paddled describes Class I-II rapids at the put-in and Class II at Manchester Whitewater Park; Delaware County says the whitewater park requires no less than advanced skills.",
        "sourceUrl": "https://milespaddled.com/maquoketa-river-i/"
      },
      {
        "label": "Downstream dam boundary",
        "value": "Lake Delhi and Delhi Dam below Bailey's Ford",
        "note": "Delaware County says the river below Bailey's Ford becomes impounded by Delhi Dam and recommends taking out at Bailey's Ford for river-focused paddling.",
        "sourceUrl": "https://delawarecountyiowatourism.com/along-the-maquoketa/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Miles Paddled Maquoketa River I",
        "url": "https://milespaddled.com/maquoketa-river-i/",
        "provider": "miles_paddled"
      },
      {
        "label": "Delaware County Tourism Along the Maquoketa",
        "url": "https://delawarecountyiowatourism.com/along-the-maquoketa/",
        "provider": "local"
      },
      {
        "label": "Iowa DNR Maquoketa River Delaware County guide",
        "url": "https://www.iowadnr.gov/media/8890/download?inline=",
        "provider": "local"
      },
      {
        "label": "USGS 05416900 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05416900/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "middle-raccoon-river-lenon-mill-p28",
    "slug": "middle-raccoon-river-lenon-mill-p28",
    "name": "Middle Raccoon River",
    "reach": "Lenon Mill Park Access to P-28 Access",
    "state": "Iowa",
    "region": "Central Iowa",
    "summary": "Short first split of the protected Middle Raccoon water trail below Panora, with a below-dam launch, clear water, riffles, sweepers, and endpoint camping at Lenon Mill.",
    "statusText": "Use the Middle Raccoon River at Panora gauge. Treat 400 cfs as the conservative floor for a pleasant ride; today the river is well below that, so expect scraping, dragging, and exposed riffles.",
    "latitude": 41.6868,
    "longitude": -94.3693,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "dam",
        "strainers",
        "fast_rise",
        "private_banks",
        "cold_water"
      ],
      "safetyNotes": [
        "Launch from the Lenon Mill Park access below the dam; do not launch above or play near the dam hydraulic.",
        "Iowa DNR says this protected-water-area section has frequent riffles, sweepers, boulders, and rock wing dams that can be hazardous depending on level.",
        "The Middle Raccoon is non-meandered. Use public accesses and marked public areas only; banks and the streambed outside those areas may be private."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05483600",
      "provider": "usgs",
      "siteId": "05483600",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Middle Raccoon River at Panora, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05483600/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 400,
      "tooLow": 400,
      "thresholdSource": {
        "label": "Iowa Parklands Middle Raccoon / Paddling Iowa 400 cfs note",
        "url": "https://www.iowaparklands.com/blog/fall-paddle-on-the-raccoon/",
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
      "seasonNotes": "Spring and post-rain windows are most dependable. Summer can fall well below the 400 cfs pleasant-ride floor, and Lake Panorama releases can change short-term levels.",
      "difficulty": "moderate",
      "difficultyNotes": "The mileage is short, but DNR says the protected Middle Raccoon access chain has frequent riffles, sweepers, and boulders, so it is best for intermediate or experienced paddlers.",
      "confidenceNotes": "Confidence is good for a guarded minimum-only add: Iowa DNR documents Lenon Mill-to-P-28-to-Cowles as the first 9 miles of the state-designated Middle Raccoon water trail, Guthrie County documents Lenon Mill and P-28 as the first two Route A access points, Iowa Parklands quotes Paddling Iowa for a 400 cfs pleasant Middle Raccoon level and describes a 600 cfs P-28-to-Cowles trip as ideal, and USGS 05483600 is a direct live gauge at Panora. No upper cutoff is inferred."
    },
    "evidenceNotes": [
      {
        "label": "Official access chain",
        "value": "Lenon Mill to P-28 inside the 9-mile DNR section",
        "note": "Iowa DNR names Lenon Mill Park Access, P-28 Access, Middle Raccoon River Access, and Cowles Access as the first 9-mile Middle Raccoon section.",
        "sourceUrl": "https://www.iowadnr.gov/media/8897/download?inline="
      },
      {
        "label": "County access support",
        "value": "Lenon Mill first access; P-28 second access",
        "note": "Guthrie County Tourism lists Lenon Mill as the first Middle Raccoon Route A access and P28 as the second access 2.1 miles downstream.",
        "sourceUrl": "https://www.discoverguthriecounty.org/recreation"
      },
      {
        "label": "Threshold floor",
        "value": "400 cfs pleasant-ride note",
        "note": "Iowa Parklands quotes Nate Hoogeveen’s Paddling Iowa book as indicating 400 cfs as a pleasant ride on the Middle Raccoon.",
        "sourceUrl": "https://www.iowaparklands.com/blog/fall-paddle-on-the-raccoon/"
      },
      {
        "label": "Current gauge check",
        "value": "76.1 cfs / 4.24 ft at 2026-07-23 05:15 CDT",
        "note": "USGS Water Services returned current Middle Raccoon at Panora data during this run, far below the selected floor.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05483600&parameterCd=00060,00065&siteStatus=all"
      }
    ],
    "sourceLinks": [
      {
        "label": "Iowa DNR Middle and South Raccoon River guide",
        "url": "https://www.iowadnr.gov/media/8897/download?inline=",
        "provider": "local"
      },
      {
        "label": "Guthrie County Tourism recreation access list",
        "url": "https://www.discoverguthriecounty.org/recreation",
        "provider": "local"
      },
      {
        "label": "Iowa Parklands Fall Paddle on the Raccoon",
        "url": "https://www.iowaparklands.com/blog/fall-paddle-on-the-raccoon/",
        "provider": "local"
      },
      {
        "label": "USGS 05483600 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05483600/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "middle-raccoon-river-p28-cowles",
    "slug": "middle-raccoon-river-p28-cowles",
    "name": "Middle Raccoon River",
    "reach": "P-28 Access to Cowles River Access",
    "state": "Iowa",
    "region": "Central Iowa",
    "summary": "Middle split of the protected Panora-area Middle Raccoon water trail, linking the P-28 bridge ramp to Cowles through riffles, sandstone bluffs, boulders, and public-land bends.",
    "statusText": "Use the Middle Raccoon River at Panora gauge. Treat 400 cfs as the conservative floor and 600 cfs as a documented excellent trip-day level; today is much lower, so expect scraping and slow progress.",
    "latitude": 41.6675,
    "longitude": -94.3569,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks",
        "cold_water"
      ],
      "safetyNotes": [
        "DNR calls out tree sweepers in riffles, constructed rock wing dams below P-28, and boulders or sandstone blocks that can surprise paddlers.",
        "Scout from public areas where possible and portage only where legal or necessary for safety; do not turn private banks into routine rest stops.",
        "Low water below the 400 cfs floor can expose riffles and make this split much slower than the mileage suggests."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05483600",
      "provider": "usgs",
      "siteId": "05483600",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Middle Raccoon River at Panora, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05483600/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 400,
      "tooLow": 400,
      "thresholdSource": {
        "label": "Iowa Parklands Middle Raccoon / Paddling Iowa 400 cfs note",
        "url": "https://www.iowaparklands.com/blog/fall-paddle-on-the-raccoon/",
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
      "seasonNotes": "Best windows are usually spring, early summer, and after moderate rain or release bumps. Check trend and weather because riffles and sweepers get less forgiving when the river rises.",
      "difficulty": "moderate",
      "difficultyNotes": "This is the most attractive short planner split in the DNR 9-mile Panora-to-Cowles section, but the riffle/sweeper density keeps it from being a beginner-only recommendation.",
      "confidenceNotes": "Confidence is good for a guarded minimum-only add: Iowa DNR and Guthrie County document the P-28-to-Cowles access sequence and public-access spacing, Iowa Parklands documents an exact P-28-to-Cowles trip at 600 cfs with minimal scraping and quotes a 400 cfs pleasant Middle Raccoon book note, Paddling Hub / BoatRampMap publish P-28 and Cowles access coordinates, and the Panora USGS gauge is direct and current. No high cutoff is inferred."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "P-28 to Cowles within the first 9 Middle Raccoon miles",
        "note": "Iowa DNR describes the P-28, 248th Street / Middle Raccoon River Access, and Cowles access sequence inside the first 9-mile protected-water-area section.",
        "sourceUrl": "https://www.iowadnr.gov/media/8897/download?inline="
      },
      {
        "label": "Exact trip-day level",
        "value": "P-28 to Cowles at 600 cfs",
        "note": "Iowa Parklands describes launching at the P28 bridge boat ramp and taking out at Cowles after a 600 cfs morning gauge reading, with riffles covered enough to avoid scraping.",
        "sourceUrl": "https://www.iowaparklands.com/blog/fall-paddle-on-the-raccoon/"
      },
      {
        "label": "Access coordinates",
        "value": "P-28 41.6675, -94.3569; Cowles 41.6196, -94.2869",
        "note": "Paddling Hub and BoatRampMap publish public boat-ramp coordinates for P-28 and Cowles, matching the DNR/Guthrie County named access chain.",
        "sourceUrl": "https://thepaddlinghub.com/directory/iowa/p-28-access"
      },
      {
        "label": "Current gauge check",
        "value": "76.1 cfs / 4.24 ft at 2026-07-23 05:15 CDT",
        "note": "USGS Water Services returned current Middle Raccoon at Panora data during this run, far below the selected floor.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05483600&parameterCd=00060,00065&siteStatus=all"
      }
    ],
    "sourceLinks": [
      {
        "label": "Iowa DNR Middle and South Raccoon River guide",
        "url": "https://www.iowadnr.gov/media/8897/download?inline=",
        "provider": "local"
      },
      {
        "label": "Iowa Parklands Fall Paddle on the Raccoon",
        "url": "https://www.iowaparklands.com/blog/fall-paddle-on-the-raccoon/",
        "provider": "local"
      },
      {
        "label": "Paddling Hub P-28 Access",
        "url": "https://thepaddlinghub.com/directory/iowa/p-28-access",
        "provider": "local"
      },
      {
        "label": "Paddling Hub Cowles Access",
        "url": "https://thepaddlinghub.com/directory/iowa/cowles-access",
        "provider": "local"
      },
      {
        "label": "USGS 05483600 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05483600/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "middle-raccoon-river-cowles-redfield-dam",
    "slug": "middle-raccoon-river-cowles-redfield-dam",
    "name": "Middle Raccoon River",
    "reach": "Cowles River Access to Redfield Dam Upper Access",
    "state": "Iowa",
    "region": "Central Iowa",
    "summary": "Lower protected Middle Raccoon day from Cowles toward Redfield Dam Upper Access, with clear water, scenic bluffs, many riffles, and a mandatory above-dam finish.",
    "statusText": "Use the Middle Raccoon River at Panora gauge as a direct upstream gauge. Treat 400 cfs as the conservative floor; below that, expect bony riffles, slow travel, and a harder take-out setup before Redfield Dam.",
    "latitude": 41.6196,
    "longitude": -94.2869,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "low_head_dam",
        "strainers",
        "fast_rise",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "Take out at Redfield Dam Upper Access before the low-head dam. Do not drift into the dam zone or assume the lower Redfield access is a safe substitute without a separate plan.",
        "Iowa DNR says the Cowles-to-Redfield section has numerous rock riffles, occasional sweepers, significant logs on sharp bends, and places where trees may block most of the river.",
        "This is a protected-water-area reach with private-bank constraints. Use only the public Cowles, Shearer, and Redfield access areas for normal landings."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05483600",
      "provider": "usgs",
      "siteId": "05483600",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Middle Raccoon River at Panora, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05483600/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 400,
      "tooLow": 400,
      "thresholdSource": {
        "label": "Iowa Parklands Middle Raccoon / Paddling Iowa 400 cfs note",
        "url": "https://www.iowaparklands.com/blog/fall-paddle-on-the-raccoon/",
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
      "seasonNotes": "Use the gauge trend, dam-release context, and recent rain together. This lower protected section can be scrape-prone when low and pushy around wood when high.",
      "difficulty": "moderate",
      "difficultyNotes": "The DNR says the distance is beginner-sized but the frequent riffles and sweepers require at least intermediate skill. The Redfield Dam boundary adds consequence at the finish.",
      "confidenceNotes": "Confidence is moderate-good for a guarded minimum-only add: Iowa DNR documents Cowles-to-Shearer-to-Redfield Dam Upper Access as a 7.8-mile state-designated Middle Raccoon section with public ramps and hazards, Dallas County confirms Redfield Dam Access below/around the dam context, Paddling Hub provides Cowles and Redfield access coordinates, Iowa Parklands / Paddling Iowa supports the 400 cfs floor for the Middle Raccoon, and USGS 05483600 is live at Panora. The dam-adjacent finish is the main caveat, so the card is framed around a required upper-access take-out."
    },
    "evidenceNotes": [
      {
        "label": "Official lower section",
        "value": "Cowles to Shearer to Redfield Dam Upper Access, 7.8 mi",
        "note": "Iowa DNR names Cowles Access to Shearer Access to Redfield Dam Upper Access as the next 7.8-mile Middle Raccoon section and says all three have cement boat ramps.",
        "sourceUrl": "https://www.iowadnr.gov/media/8897/download?inline="
      },
      {
        "label": "Hazard profile",
        "value": "Numerous riffles, sweepers, logs, and possible partial blockages",
        "note": "The DNR guide warns this section has numerous rock riffles, tree strainers, sharp-bend logs, and possible places where trees block most of the channel.",
        "sourceUrl": "https://www.iowadnr.gov/media/8897/download?inline="
      },
      {
        "label": "Redfield access context",
        "value": "Redfield Dam Access near the low-head dam",
        "note": "Dallas County documents Redfield Dam Access on the Middle Raccoon and explicitly identifies the low-head dam that must be handled with care in the broader water-trail corridor.",
        "sourceUrl": "https://www.dallascountyiowa.gov/332/Middle-South-Raccoon-River-Water-Trail"
      },
      {
        "label": "Current gauge check",
        "value": "76.1 cfs / 4.24 ft at 2026-07-23 05:15 CDT",
        "note": "USGS Water Services returned current Middle Raccoon at Panora data during this run, far below the selected floor.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05483600&parameterCd=00060,00065&siteStatus=all"
      }
    ],
    "sourceLinks": [
      {
        "label": "Iowa DNR Middle and South Raccoon River guide",
        "url": "https://www.iowadnr.gov/media/8897/download?inline=",
        "provider": "local"
      },
      {
        "label": "Dallas County Middle/South Raccoon River Water Trail",
        "url": "https://www.dallascountyiowa.gov/332/Middle-South-Raccoon-River-Water-Trail",
        "provider": "local"
      },
      {
        "label": "Iowa Parklands Fall Paddle on the Raccoon",
        "url": "https://www.iowaparklands.com/blog/fall-paddle-on-the-raccoon/",
        "provider": "local"
      },
      {
        "label": "Paddling Hub Cowles Access",
        "url": "https://thepaddlinghub.com/directory/iowa/cowles-access",
        "provider": "local"
      },
      {
        "label": "Paddling Hub Redfield Dam",
        "url": "https://thepaddlinghub.com/directory/iowa/redfield-dam",
        "provider": "local"
      },
      {
        "label": "USGS 05483600 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05483600/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "des-moines-river-lehigh-deception-hollow",
    "slug": "des-moines-river-lehigh-deception-hollow",
    "name": "Des Moines River",
    "reach": "Lehigh Access to Deception Hollow",
    "state": "Iowa",
    "region": "North-Central Iowa",
    "summary": "Short Webster County Des Moines water-trail split from Lehigh to Deception Hollow, with sandstone valley scenery, beach-camping context, and the direct Stratford gauge downstream.",
    "statusText": "Use the Des Moines River near Stratford gauge as the downstream corridor check. Treat the established Fort Dodge-corridor 400 to 8,000 cfs range conservatively here; below the floor expect riffle scraping, and high or rising water can make wood and beaches unsafe.",
    "latitude": 42.3605,
    "longitude": -94.0478,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks",
        "cold_water"
      ],
      "safetyNotes": [
        "Iowa DNR rates the Lehigh-to-Deception-Hollow reach intermediate and places it on the Webster County Des Moines River Water Trail.",
        "The Des Moines River is meandered in this corridor, but DNR still cautions paddlers not to wander onto nearby private land. Use signed access points and legal beaches only.",
        "High water can cover beaches and hide boulders, bridge debris, and wood. Cancel when the hydrograph is rising quickly or the take-out is not obvious from land."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05481300",
      "provider": "usgs",
      "siteId": "05481300",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Des Moines River near Stratford, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05481300/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 400,
      "idealMax": 8000,
      "tooLow": 400,
      "tooHigh": 8000,
      "thresholdSource": {
        "label": "CanWePaddle Fort Dodge-to-Lehigh estimated range, applied conservatively to the same DNR Webster County corridor",
        "url": "https://canwepaddle.com/rivers/iowa/des-moines-river-fort-dodge-to-lehigh/",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
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
      "seasonNotes": "Spring and early summer usually have the most reliable depth. Late summer can expose riffles; storms can quickly turn the broad meandered river pushy and reduce safe beach stops.",
      "difficulty": "moderate",
      "difficultyNotes": "The mileage is short, but Iowa DNR classifies this water-trail reach as intermediate and the downstream gauge/threshold relationship is corridor-level rather than exact.",
      "confidenceNotes": "Confidence is moderate-good: Iowa DNR documents Lehigh-to-Deception Hollow as a named three-mile Webster County water-trail reach, the DNR map shows both public carry-down accesses, USGS 05481300 returned current same-river data downstream, and the existing Fort Dodge-to-Lehigh threshold model provides conservative same-corridor scoring support. Confidence is capped because no source found publishes a separate numeric range for this exact short split."
    },
    "evidenceNotes": [
      {
        "label": "Official route",
        "value": "Lehigh to Deception Hollow, about 3 miles",
        "note": "Iowa DNR names this Webster County Des Moines River Water Trail reach and rates it intermediate.",
        "sourceUrl": "https://www.iowadnr.gov/media/8886/download?inline="
      },
      {
        "label": "Access map",
        "value": "Lehigh Access and Deception Hollow carry-down access",
        "note": "The Webster County map labels Lehigh Access and Deception Hollow on the designated Des Moines River water-trail corridor.",
        "sourceUrl": "https://cms7files.revize.com/webstercountyia/Departments/Conservation/map_dsm_webster%20%281%29.pdf"
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05481300 at 1,080 cfs / 5.83 ft",
        "note": "USGS Water Services returned current Des Moines River near Stratford data at 2026-07-23 09:00 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05481300&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold posture",
        "value": "400-8,000 cfs corridor range",
        "note": "The existing route-specific Fort Dodge-to-Lehigh CanWePaddle range is applied conservatively to this adjacent DNR water-trail split and disclosed as corridor-level support.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/des-moines-river-fort-dodge-to-lehigh/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Iowa DNR Des Moines River Water Trail guide",
        "url": "https://www.iowadnr.gov/media/8886/download?inline=",
        "provider": "local"
      },
      {
        "label": "Webster County Des Moines River map",
        "url": "https://cms7files.revize.com/webstercountyia/Departments/Conservation/map_dsm_webster%20%281%29.pdf",
        "provider": "local"
      },
      {
        "label": "CanWePaddle Des Moines River Fort Dodge to Lehigh",
        "url": "https://canwepaddle.com/rivers/iowa/des-moines-river-fort-dodge-to-lehigh/",
        "provider": "local"
      },
      {
        "label": "USGS 05481300 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05481300/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "des-moines-river-deception-hollow-skillet",
    "slug": "des-moines-river-deception-hollow-skillet",
    "name": "Des Moines River",
    "reach": "Deception Hollow to Skillet Creek Access",
    "state": "Iowa",
    "region": "North-Central Iowa",
    "summary": "Longer rural Des Moines River water-trail day from Deception Hollow to Skillet Creek Access, with beaches, wooded bends, private-upland caveats, and the direct Stratford gauge.",
    "statusText": "Use the Des Moines River near Stratford gauge. Treat 400 to 8,000 cfs as a guarded corridor range; this long split needs a stable or falling hydrograph, visible landings, and conservative wind and wood checks.",
    "latitude": 42.3273,
    "longitude": -94.0206,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "Iowa DNR rates Deception Hollow to Skillet Creek Access advanced because of its 15.5-mile length, not because it is technical whitewater.",
        "Beaches and sandbars are common on this meandered-river corridor, but adjacent uplands can be private. Keep stops below the ordinary high-water boundary and avoid private banks.",
        "Expect longer rural rescue exposure, few exits, wind on open bends, woody debris, and fast current after rain or upstream releases."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05481300",
      "provider": "usgs",
      "siteId": "05481300",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Des Moines River near Stratford, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05481300/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 400,
      "idealMax": 8000,
      "tooLow": 400,
      "tooHigh": 8000,
      "thresholdSource": {
        "label": "CanWePaddle Fort Dodge-to-Lehigh estimated range, applied conservatively to the same upper Des Moines water-trail corridor",
        "url": "https://canwepaddle.com/rivers/iowa/des-moines-river-fort-dodge-to-lehigh/",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
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
      "seasonNotes": "This long reach is most practical when spring or early-summer depth is steady. Low late-summer water slows the day, while high or rising water can erase beaches and make wood avoidance harder.",
      "difficulty": "hard",
      "difficultyNotes": "The route is mostly flatwater, but Iowa DNR labels the 15.5-mile Deception-to-Skillet reach advanced because length, rural exposure, and hazard management matter.",
      "confidenceNotes": "Confidence is good for access chain and route shape: Iowa DNR names Deception Hollow-to-Skillet Creek Access, gives the 15.5-mile distance, describes the beach and bend character, and the Stratford gauge is direct for the lower end of this reach. Threshold confidence is mixed because no exact split-specific numeric range surfaced, so the route uses the established same-corridor Des Moines River range with explicit caveats."
    },
    "evidenceNotes": [
      {
        "label": "Official route",
        "value": "Deception Hollow to Skillet Creek Access, 15.5 miles",
        "note": "Iowa DNR names this downstream Webster County water-trail reach and rates it advanced due to length.",
        "sourceUrl": "https://www.iowadnr.gov/media/8886/download?inline="
      },
      {
        "label": "Public access map",
        "value": "Deception Hollow and Skillet Access",
        "note": "The Webster County map labels Deception Hollow and Skillet Access as carry-down water-trail accesses on the Des Moines River.",
        "sourceUrl": "https://cms7files.revize.com/webstercountyia/Departments/Conservation/map_dsm_webster%20%281%29.pdf"
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05481300 at 1,080 cfs / 5.83 ft",
        "note": "USGS Water Services returned current Des Moines River near Stratford data at 2026-07-23 09:00 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05481300&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping and stops",
        "value": "Meandered-river beach camping context",
        "note": "Iowa DNR says the river is meandered and the abundance of beaches makes this Webster County water-trail stretch suitable for beach camping, while warning users not to enter nearby private land.",
        "sourceUrl": "https://www.iowadnr.gov/media/8886/download?inline="
      }
    ],
    "sourceLinks": [
      {
        "label": "Iowa DNR Des Moines River Water Trail guide",
        "url": "https://www.iowadnr.gov/media/8886/download?inline=",
        "provider": "local"
      },
      {
        "label": "Webster County Des Moines River map",
        "url": "https://cms7files.revize.com/webstercountyia/Departments/Conservation/map_dsm_webster%20%281%29.pdf",
        "provider": "local"
      },
      {
        "label": "CanWePaddle Des Moines River Fort Dodge to Lehigh",
        "url": "https://canwepaddle.com/rivers/iowa/des-moines-river-fort-dodge-to-lehigh/",
        "provider": "local"
      },
      {
        "label": "USGS 05481300 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05481300/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "des-moines-river-skillet-north-fraser",
    "slug": "des-moines-river-skillet-north-fraser",
    "name": "Des Moines River",
    "reach": "Skillet Creek Access to North Fraser Ramp",
    "state": "Iowa",
    "region": "Central Iowa",
    "summary": "Upper Boone County Des Moines River connector from Skillet Creek Access to North Fraser Ramp, using the direct Stratford gauge and official Boone County water-trail access mapping.",
    "statusText": "Use the Des Moines River near Stratford gauge. The same upper-Des-Moines 400 to 8,000 cfs corridor range is a guarded proxy here; confirm Skillet and North Fraser access conditions before launching.",
    "latitude": 42.2523,
    "longitude": -93.9975,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "This route crosses from Webster County into the Boone County water-trail access chain. Confirm both landings from the road before committing to the shuttle.",
        "The direct Stratford gauge is near the put-in corridor, but it cannot show woody debris, bank condition, or bridge-pinch hazards farther downstream.",
        "Stay off the river during fast rises or flood advisories. Sandbars, gravel bars, and banks can disappear quickly at higher flows."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05481300",
      "provider": "usgs",
      "siteId": "05481300",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Des Moines River near Stratford, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05481300/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 400,
      "idealMax": 8000,
      "tooLow": 400,
      "tooHigh": 8000,
      "thresholdSource": {
        "label": "CanWePaddle Fort Dodge-to-Lehigh estimated range, applied conservatively to the adjacent upper Des Moines corridor",
        "url": "https://canwepaddle.com/rivers/iowa/des-moines-river-fort-dodge-to-lehigh/",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
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
      "seasonNotes": "April through October is the practical window, with spring and early summer usually offering the most reliable depth. Wind, heat, and long rural bends can make moderate summer levels feel slower than the gauge suggests.",
      "difficulty": "moderate",
      "difficultyNotes": "Terrain360 frames Skillet-to-North-Fraser as an intermediate flatwater trip. Distance, rural exposure, private banks, and same-day access checks keep it at caution level.",
      "confidenceNotes": "Confidence is moderate-good: Webster County and Boone County official water-trail maps identify Skillet and North Fraser as public access points, Terrain360 documents the exact Skillet-to-North-Fraser paddling route and ties it to the Stratford gauge, and USGS returned current direct-gauge data. Threshold confidence remains mixed because the numeric range is adapted from the adjacent CanWePaddle Fort Dodge-to-Lehigh corridor rather than published specifically for Skillet-to-North-Fraser."
    },
    "evidenceNotes": [
      {
        "label": "Route and gauge tie",
        "value": "Skillet Creek Access to North Fraser Access, 18.4 km",
        "note": "Terrain360 documents this exact Des Moines River route near Pilot Mound and displays live USGS 05481300 Stratford gauge data for it.",
        "sourceUrl": "https://www.terrain360.com/trail/skillet-creek-access-to-north-fraser-access"
      },
      {
        "label": "Official access maps",
        "value": "Skillet Access and North Fraser Ramp",
        "note": "The Webster County map labels Skillet Access, while the Boone County Des Moines River Water Trail map labels North Fraser Ramp and the downstream dam/portage sequence.",
        "sourceUrl": "https://cms7files.revize.com/webstercountyia/Departments/Conservation/map_dsm_webster%20%281%29.pdf"
      },
      {
        "label": "Boone County water trail",
        "value": "38 river miles and eight ramps",
        "note": "Boone County says its Des Moines River segment is a state water trail with approximately 38 river miles and eight boat ramps.",
        "sourceUrl": "https://www.boonecounty.iowa.gov/conservation/recreational_areas/des_moines_river_water_trail/"
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05481300 at 1,080 cfs / 5.83 ft",
        "note": "USGS Water Services returned current Des Moines River near Stratford data at 2026-07-23 09:00 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05481300&parameterCd=00060,00065&siteStatus=all"
      }
    ],
    "sourceLinks": [
      {
        "label": "Terrain360 Skillet Creek to North Fraser",
        "url": "https://www.terrain360.com/trail/skillet-creek-access-to-north-fraser-access",
        "provider": "local"
      },
      {
        "label": "Webster County Des Moines River map",
        "url": "https://cms7files.revize.com/webstercountyia/Departments/Conservation/map_dsm_webster%20%281%29.pdf",
        "provider": "local"
      },
      {
        "label": "Boone County Des Moines River Water Trail",
        "url": "https://www.boonecounty.iowa.gov/conservation/recreational_areas/des_moines_river_water_trail/",
        "provider": "local"
      },
      {
        "label": "USACE Boone County Des Moines River trail map",
        "url": "https://www.mvr.usace.army.mil/Portals/48/docs/Recreation/ODS/Maps/Boone%20County%20River%20Trail.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 05481300 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05481300/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "des-moines-river-south-fraser-waterworks-upstream",
    "slug": "des-moines-river-south-fraser-waterworks-upstream",
    "name": "Des Moines River",
    "reach": "South Fraser Ramp to Waterworks Upstream Access / E-26",
    "state": "Iowa",
    "region": "Central Iowa",
    "summary": "Official Boone County Des Moines River water-trail float below the Fraser dam portage to the upstream Waterworks/E-26 access, with meandered-stream camping context and a firm stop above the Boone Waterworks rapids.",
    "statusText": "Use the Des Moines River near Stratford gauge as the upstream corridor signal. Treat the established 400 to 8,000 cfs upper-Des-Moines range conservatively here, and do not launch until the Fraser dam portage/relaunch and Waterworks take-out are confirmed from land.",
    "latitude": 42.154,
    "longitude": -93.965,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "low_head_dam",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "This route starts only after the Fraser dam portage at South Fraser. Do not run the Fraser low-head dam.",
        "Waterworks Upstream / E-26 is the planned take-out above the Boone Waterworks rock-arch rapids. Stop there unless a separate rapids or portage plan is staged.",
        "The Stratford gauge is upstream and cannot show wood, silted ramps, or local dam approach hydraulics in Boone County."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05481300",
      "provider": "usgs",
      "siteId": "05481300",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Des Moines River near Stratford, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05481300/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 400,
      "idealMax": 8000,
      "tooLow": 400,
      "tooHigh": 8000,
      "thresholdSource": {
        "label": "CanWePaddle Fort Dodge-to-Lehigh estimated range, applied conservatively to the upper Des Moines corridor",
        "url": "https://canwepaddle.com/rivers/iowa/des-moines-river-fort-dodge-to-lehigh/",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
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
      "seasonNotes": "April through October is the practical window. Boone County is influenced by upstream reservoir operations and storms; use a stable or falling hydrograph and local visual checks.",
      "difficulty": "moderate",
      "difficultyNotes": "The float is short and DNR frames the section as suitable for all skill levels, but the nearby Fraser dam, downstream Waterworks rapids boundary, private uplands, and proxy gauge justify caution.",
      "confidenceNotes": "Confidence is moderate-good: Iowa DNR and USACE maps identify South Fraser and the Waterworks upstream/E-26 access chain, DNR text describes the Fraser dam portage and Waterworks rapids avoidance options, Boone County confirms the state water-trail ramp system and dam warning, and USGS Water Services returned current data for the selected corridor gauge. Threshold confidence is mixed because the numeric range is adapted from the accepted Fort Dodge-to-Lehigh upper-Des-Moines model rather than published for this exact Boone County split."
    },
    "evidenceNotes": [
      {
        "label": "Official route and mileage",
        "value": "South Fraser to Waterworks Upstream/E-26, about 5 mi",
        "note": "The Iowa DNR Boone County map labels South Fraser at river mile 249 and E-26/Waterworks access near river mile 244.",
        "sourceUrl": "https://www.iowadnr.gov/media/8885/download?inline="
      },
      {
        "label": "Dam and portage boundary",
        "value": "Fraser dam portage; Waterworks rapids ahead",
        "note": "Iowa DNR says the Fraser low-head dam is not recommended and is bypassed by North and South Fraser plus the portage trail; it also identifies Waterworks upstream/downstream accesses for avoiding the rock-arch rapids.",
        "sourceUrl": "https://www.iowadnr.gov/media/8885/download?inline="
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05481300 1,020 cfs / 5.76 ft",
        "note": "USGS Water Services returned current Des Moines River near Stratford data at 2026-07-23 20:00 CDT during this run; downstream Saylorville also returned 1,530 cfs / 3.65 ft.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05481300,05481650&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Boone County water trail",
        "value": "38 river miles and 8 ramps",
        "note": "Boone County says this state water trail has signs, informational kiosks, approximately 38 river miles, and eight boat ramps, while warning users about the Fraser and Boone Waterworks dams.",
        "sourceUrl": "https://www.boonecounty.iowa.gov/conservation/recreational_areas/des_moines_river_water_trail/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Iowa DNR Des Moines River Water Trail, Boone County",
        "url": "https://www.iowadnr.gov/media/8885/download?inline=",
        "provider": "local"
      },
      {
        "label": "Boone County Des Moines River Water Trail",
        "url": "https://www.boonecounty.iowa.gov/conservation/recreational_areas/des_moines_river_water_trail/",
        "provider": "local"
      },
      {
        "label": "USACE Boone County Des Moines River trail map",
        "url": "https://www.mvr.usace.army.mil/Portals/48/docs/Recreation/ODS/Maps/Boone%20County%20River%20Trail.pdf",
        "provider": "local"
      },
      {
        "label": "CanWePaddle Des Moines River Fort Dodge to Lehigh",
        "url": "https://canwepaddle.com/rivers/iowa/des-moines-river-fort-dodge-to-lehigh/",
        "provider": "local"
      },
      {
        "label": "USGS 05481300 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05481300/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "des-moines-river-highway-30-dogwood",
    "slug": "des-moines-river-highway-30-dogwood",
    "name": "Des Moines River",
    "reach": "Highway 30 Access to Dogwood Ramp / E-57",
    "state": "Iowa",
    "region": "Central Iowa",
    "summary": "Scenic Boone County Des Moines River water-trail section from Highway 30 toward the Dogwood/E-57 ramp, passing the Ledges State Park bluff corridor with official access mapping.",
    "statusText": "Use the Des Moines River near Stratford gauge as the upstream corridor signal. Treat 400 to 8,000 cfs as a guarded Boone County range, then verify the Highway 30 and Dogwood ramps because silt, wind, and releases can change the day.",
    "latitude": 42.047,
    "longitude": -93.931,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "Launch at Highway 30 only after confirming the Boone Waterworks rapids are upstream of the route plan; do not drift into or out of the rapids without a separate plan.",
        "Iowa DNR notes bridge piers and other in-water hazards in this Boone County reach. Give piers, wood, and bank debris space.",
        "The river is meandered, but private property begins at the high-water mark. Keep routine stops to public areas or legal bars."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05481300",
      "provider": "usgs",
      "siteId": "05481300",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Des Moines River near Stratford, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05481300/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 400,
      "idealMax": 8000,
      "tooLow": 400,
      "tooHigh": 8000,
      "thresholdSource": {
        "label": "CanWePaddle Fort Dodge-to-Lehigh estimated range, applied conservatively to the upper Des Moines corridor",
        "url": "https://canwepaddle.com/rivers/iowa/des-moines-river-fort-dodge-to-lehigh/",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
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
      "seasonNotes": "Spring and early summer normally have the most dependable depth. Late-summer lows can expose bars and old bridge remnants; storm rises can make the wide bends pushy.",
      "difficulty": "easy",
      "difficultyNotes": "DNR says this section is appropriate for paddlers of all skill levels and both endpoints are well developed, but the seven-mile distance, bridge hazards, proxy gauge, and Ledges-area exposure warrant a caution profile.",
      "confidenceNotes": "Confidence is moderate-good: the Iowa DNR Boone County guide identifies Highway 30 Access to E-57/Dogwood as a water-trail section, describes the Ledges State Park bluff corridor, marks Highway 30 and Dogwood/E-57 ramps, and Boone County confirms the state water-trail ramp system. Threshold confidence is mixed because the 400-8,000 cfs model is the accepted upstream Des Moines River corridor range rather than an exact Boone County publication."
    },
    "evidenceNotes": [
      {
        "label": "Official route and mileage",
        "value": "Highway 30 Access to E-57/Dogwood, about 7 mi",
        "note": "The Iowa DNR Boone County map places Highway 30 Access near river mile 237 and Dogwood/E-57 near river mile 230.",
        "sourceUrl": "https://www.iowadnr.gov/media/8885/download?inline="
      },
      {
        "label": "Route character",
        "value": "Ledges State Park bluff corridor",
        "note": "DNR says this section has some of the most beautiful scenery on the river, including dramatic sandstone bluffs near Ledges State Park.",
        "sourceUrl": "https://www.iowadnr.gov/media/8885/download?inline="
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05481300 1,020 cfs / 5.76 ft",
        "note": "USGS Water Services returned current upstream corridor data at 2026-07-23 20:00 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05481300,05481650&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Safety guidance",
        "value": "Check levels, weather, PFDs, strainers, dams, and private property",
        "note": "The DNR Boone County guide includes general safety guidance to check river levels, know weather, wear PFDs, portage obstacles and low-head dams, and use public lands/access points respectfully.",
        "sourceUrl": "https://www.iowadnr.gov/media/8885/download?inline="
      }
    ],
    "sourceLinks": [
      {
        "label": "Iowa DNR Des Moines River Water Trail, Boone County",
        "url": "https://www.iowadnr.gov/media/8885/download?inline=",
        "provider": "local"
      },
      {
        "label": "Boone County Des Moines River Water Trail",
        "url": "https://www.boonecounty.iowa.gov/conservation/recreational_areas/des_moines_river_water_trail/",
        "provider": "local"
      },
      {
        "label": "USACE Boone County Des Moines River trail map",
        "url": "https://www.mvr.usace.army.mil/Portals/48/docs/Recreation/ODS/Maps/Boone%20County%20River%20Trail.pdf",
        "provider": "local"
      },
      {
        "label": "CanWePaddle Des Moines River Fort Dodge to Lehigh",
        "url": "https://canwepaddle.com/rivers/iowa/des-moines-river-fort-dodge-to-lehigh/",
        "provider": "local"
      },
      {
        "label": "USGS 05481300 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05481300/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "des-moines-river-dogwood-sportsman",
    "slug": "des-moines-river-dogwood-sportsman",
    "name": "Des Moines River",
    "reach": "Dogwood Ramp / E-57 to Sportsman Ramp",
    "state": "Iowa",
    "region": "Central Iowa",
    "summary": "Short lower Boone County Des Moines River water-trail section from Dogwood/E-57 to Sportsman Ramp, with maintained ramps, sandbar bends, and Saylorville-influenced flow caveats.",
    "statusText": "Use the Des Moines River near Stratford gauge as the upstream signal and compare it with Saylorville. The 400 to 8,000 cfs corridor range is guarded here; low water exposes bridge remnants and high water can flood bars and ramps.",
    "latitude": 42.005,
    "longitude": -93.878,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "DNR says both ramps are maintained and accessible, but silt may cover them. Walk both landings before launching.",
        "Very low water can expose old wooden bridge supports near Sportsman / Old Hubby Bridge; give any remnants wide clearance.",
        "The river starts feeling the downstream Saylorville system in this area. Watch for fishing boats, wind, release effects, and floodplain inundation."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05481300",
      "provider": "usgs",
      "siteId": "05481300",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Des Moines River near Stratford, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05481300/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 400,
      "idealMax": 8000,
      "tooLow": 400,
      "tooHigh": 8000,
      "thresholdSource": {
        "label": "CanWePaddle Fort Dodge-to-Lehigh estimated range, applied conservatively to the upper Des Moines corridor",
        "url": "https://canwepaddle.com/rivers/iowa/des-moines-river-fort-dodge-to-lehigh/",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
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
      "seasonNotes": "This short lower-Boone section depends on both upstream Des Moines River flow and downstream Saylorville conditions. Low water can be slow and silted; high releases or floods can cover bars and speed up the current.",
      "difficulty": "easy",
      "difficultyNotes": "DNR frames the reach as suitable for all skill levels and the mileage is short, but the proxy gauge, silted ramps, bridge-remnant possibility, wind, and motorboat mix require caution.",
      "confidenceNotes": "Confidence is moderate-good: Iowa DNR identifies E-57/Dogwood to Sportsman as a short water-trail section with maintained ramps, long sandbars, and Saylorville influence; USACE mapping labels Dogwood and Sportsman ramps; Boone County confirms the state water-trail ramp network. Threshold confidence is mixed because the numeric model is adapted from the upper Des Moines CanWePaddle corridor range and cross-checked with current Stratford/Saylorville values rather than an exact local publication."
    },
    "evidenceNotes": [
      {
        "label": "Official route and mileage",
        "value": "E-57/Dogwood to Sportsman, about 4 mi",
        "note": "The Iowa DNR guide describes E-57 Access to Sportsman Ramp as a short section; the map places Dogwood/E-57 near river mile 230 and Sportsman near river mile 226.",
        "sourceUrl": "https://www.iowadnr.gov/media/8885/download?inline="
      },
      {
        "label": "Access condition",
        "value": "Maintained ramps, sometimes silt-covered",
        "note": "DNR says both ramps are maintained and accessible, though silt may sometimes cover them, and notes Sportsman is also known as Old Hubby Bridge Access.",
        "sourceUrl": "https://www.iowadnr.gov/media/8885/download?inline="
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05481300 1,020 cfs / 5.76 ft; USGS 05481650 1,530 cfs / 3.65 ft",
        "note": "USGS Water Services returned current upstream Stratford and downstream Saylorville values at 2026-07-23 20:00 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05481300,05481650&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Saylorville influence",
        "value": "Fishing boats and flood-tolerant floodplain downstream",
        "note": "DNR says the next Sportsman-to-Highway-210 reach is strongly influenced by Saylorville Dam, and that fishing boats become more common approaching public recreation areas.",
        "sourceUrl": "https://www.iowadnr.gov/media/8885/download?inline="
      }
    ],
    "sourceLinks": [
      {
        "label": "Iowa DNR Des Moines River Water Trail, Boone County",
        "url": "https://www.iowadnr.gov/media/8885/download?inline=",
        "provider": "local"
      },
      {
        "label": "Boone County Des Moines River Water Trail",
        "url": "https://www.boonecounty.iowa.gov/conservation/recreational_areas/des_moines_river_water_trail/",
        "provider": "local"
      },
      {
        "label": "USACE Boone County Des Moines River trail map",
        "url": "https://www.mvr.usace.army.mil/Portals/48/docs/Recreation/ODS/Maps/Boone%20County%20River%20Trail.pdf",
        "provider": "local"
      },
      {
        "label": "CanWePaddle Des Moines River Fort Dodge to Lehigh",
        "url": "https://canwepaddle.com/rivers/iowa/des-moines-river-fort-dodge-to-lehigh/",
        "provider": "local"
      },
      {
        "label": "USGS 05481300 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05481300/",
        "provider": "usgs"
      },
      {
        "label": "USGS 05481650 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05481650/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "des-moines-river-eldon-shidepoke",
    "slug": "des-moines-river-eldon-shidepoke",
    "name": "Des Moines River",
    "reach": "Eldon Ramp to Shidepoke Access / Selma",
    "state": "Iowa",
    "region": "Southeast Iowa",
    "summary": "Short official Lower Des Moines River water-trail starter from Eldon to Shidepoke Access at Selma, with public concrete ramps, Red Rock release caveats, sandbar rules, and the direct Keosauqua gauge.",
    "statusText": "Use the Des Moines River at Keosauqua gauge. Treat the accepted lower-river 800 to 6,000 cfs model conservatively; Red Rock releases can make even this short beginner reach unexpectedly fast or low.",
    "latitude": 40.92085,
    "longitude": -92.2299,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks",
        "cold_water"
      ],
      "safetyNotes": [
        "Iowa DNR says this short reach is often appropriate for beginners, but Red Rock releases determine the actual level and swiftness.",
        "Steep banks, bridge current, wood, and silver carp can still create problems on a short trip.",
        "The Lower Des Moines is meandered; keep stops below the ordinary high-water mark or on public access land."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05490500",
      "provider": "usgs",
      "siteId": "05490500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Des Moines River at Keosauqua, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05490500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 3000,
      "idealMax": 4500,
      "tooLow": 800,
      "tooHigh": 6000,
      "thresholdSource": {
        "label": "Outdoor Adventures Made Easy lower Des Moines Keosauqua-gauge notes",
        "url": "https://outdooradventuresmadeeasy.com/iowa/geode-paddle/",
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
      "seasonNotes": "Spring through fall is the practical season, but Lake Red Rock release management can matter more than local rainfall. Check the Keosauqua gauge trend and the ramp current before committing.",
      "difficulty": "easy",
      "difficultyNotes": "Iowa DNR frames Eldon-to-Shidepoke as short and often beginner-appropriate, but release-driven speed, steep banks, bridge hazards, silver carp, and cold water justify a caution profile.",
      "confidenceNotes": "Confidence is moderate-good: Iowa DNR documents the exact Eldon-to-Shidepoke reach, labels it 4.5 miles, and describes public concrete ramps, protected Shidepoke eddy, Red Rock release caveat, and silver-carp hazard; Iowa DNR Fish Iowa corroborates the broader Ottumwa-to-Farmington ramp corridor; USGS Water Services returned current Keosauqua data. The app uses a conservative 5.2-mile planning label because the source-backed access coordinates put the endpoints about 5.1 miles apart straight-line. Threshold confidence is capped because the 800 / 3,000-4,500 / 6,000 cfs model comes from an adjacent lower-river Keosauqua-gauge route report rather than an official band for this exact upper Van Buren split."
    },
    "evidenceNotes": [
      {
        "label": "Official route",
        "value": "Eldon to Shidepoke Access, DNR-labeled 4.5 mi; app planning label 5.2 mi",
        "note": "Iowa DNR Lower Des Moines River water-trail material says this paddle starts at the cement boat ramp on Water Street in Eldon and finishes at the well-marked Shidepoke Access at Selma. Source-backed access coordinates place the endpoints farther apart than the DNR mileage, so the app stores a conservative 5.2-mile planning label.",
        "sourceUrl": "https://www.iowadnr.gov/media/8889/download?inline="
      },
      {
        "label": "Access support",
        "value": "Concrete Eldon ramp and Shidepoke ramp",
        "note": "Iowa DNR describes Shidepoke as signed, with a cement boat ramp and protected eddy; Fish Iowa separately lists ramp maintenance for Eldon and Shidepoke in the Ottumwa Dam-to-Farmington corridor.",
        "sourceUrl": "https://programs.iowadnr.gov/lakemanagement/FishIowa/RiverStreamDetails/RDM89"
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05490500 5,060 cfs / 11.84 ft at 2026-07-23 10:00 CDT",
        "note": "USGS Water Services returned current Des Moines River at Keosauqua data during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05490500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold model",
        "value": "800 / 3,000-4,500 / 6,000 cfs",
        "note": "The app reuses the accepted lower Des Moines Keosauqua-gauge community model from the adjacent Bentonsport-to-Bonaparte source and flags the proxy/route-family limitation.",
        "sourceUrl": "https://outdooradventuresmadeeasy.com/iowa/geode-paddle/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Iowa DNR Lower Des Moines River guide",
        "url": "https://www.iowadnr.gov/media/8889/download?inline=",
        "provider": "local"
      },
      {
        "label": "Iowa DNR Fish Iowa Ottumwa Dam to Farmington",
        "url": "https://programs.iowadnr.gov/lakemanagement/FishIowa/RiverStreamDetails/RDM89",
        "provider": "local"
      },
      {
        "label": "Meet Ottumwa Lower Des Moines River Water Trail",
        "url": "https://www.meetottumwa.org/explore/lower_des_moines_river_water_trail_/",
        "provider": "local"
      },
      {
        "label": "Outdoor Adventures Made Easy Geode Paddle",
        "url": "https://outdooradventuresmadeeasy.com/iowa/geode-paddle/",
        "provider": "local"
      },
      {
        "label": "USGS 05490500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05490500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "des-moines-river-shidepoke-douds",
    "slug": "des-moines-river-shidepoke-douds",
    "name": "Des Moines River",
    "reach": "Shidepoke Access / Selma to Douds Access",
    "state": "Iowa",
    "region": "Southeast Iowa",
    "summary": "Official Lower Des Moines River connector from Shidepoke Access near Selma to Douds, with public ramps, bridge-piling hazards, narrow agricultural banks, and lower-river Keosauqua gauge scoring.",
    "statusText": "Use the Des Moines River at Keosauqua gauge as a lower-river proxy. The accepted 800 to 6,000 cfs model is conservative here; avoid rising releases, bridge debris, and pushy current.",
    "latitude": 40.86891,
    "longitude": -92.15889,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks",
        "cold_water"
      ],
      "safetyNotes": [
        "Iowa DNR warns paddlers to stay away from bridge pilings, especially in swift water, because pilings collect logs and create disruptive currents.",
        "A gas pipeline crosses below the river in this reach; obey warning signs and do not dock there.",
        "Use the public Shidepoke and Douds accesses only, and keep any legal sandbar stops below the high-water mark."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05490500",
      "provider": "usgs",
      "siteId": "05490500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Des Moines River at Keosauqua, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05490500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 3000,
      "idealMax": 4500,
      "tooLow": 800,
      "tooHigh": 6000,
      "thresholdSource": {
        "label": "Outdoor Adventures Made Easy lower Des Moines Keosauqua-gauge notes",
        "url": "https://outdooradventuresmadeeasy.com/iowa/geode-paddle/",
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
      "seasonNotes": "Spring through fall is the practical season. Red Rock releases, upstream rain, and bridge debris should override a simple gauge score.",
      "difficulty": "easy",
      "difficultyNotes": "This is a short official water-trail segment, but bridge-piling current, log accumulation, pipeline signage, silver carp, and release-driven speed make it a watchful beginner route rather than an automatic yes.",
      "confidenceNotes": "Confidence is moderate-good: Iowa DNR documents Shidepoke-to-Douds as an official Lower Des Moines River water-trail segment with reach character and specific hazards, Villages of Van Buren lists Douds as a public river access with camping support, Fish Iowa corroborates Douds ramp construction and Shidepoke ramp maintenance, and USGS Keosauqua is current. Threshold confidence is capped because the model is a lower-river Keosauqua-gauge route-family model rather than a segment-specific official band."
    },
    "evidenceNotes": [
      {
        "label": "Official route",
        "value": "Shidepoke to Douds, 4.6 mi",
        "note": "Iowa DNR Lower Des Moines River water-trail material names Shidepoke to Douds and describes the straight agricultural corridor, bridge-piling hazard, and gas-pipeline no-docking warning.",
        "sourceUrl": "https://www.iowadnr.gov/media/8889/download?inline="
      },
      {
        "label": "Douds public access",
        "value": "Douds County Park & Des Moines River Access",
        "note": "Villages of Van Buren describes the Douds river access as a boat ramp with shelter and two gravel campsites, and Fish Iowa lists 2021 ramp construction for Douds Access.",
        "sourceUrl": "https://villagesofvanburen.com/explore/douds_county_park_des_moines_river_access/"
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05490500 5,060 cfs / 11.84 ft at 2026-07-23 10:00 CDT",
        "note": "USGS Water Services returned current Des Moines River at Keosauqua data during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05490500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold model",
        "value": "800 / 3,000-4,500 / 6,000 cfs",
        "note": "The app reuses the accepted lower Des Moines Keosauqua-gauge community model from the adjacent Bentonsport-to-Bonaparte source and keeps proxy caveats explicit.",
        "sourceUrl": "https://outdooradventuresmadeeasy.com/iowa/geode-paddle/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Iowa DNR Lower Des Moines River guide",
        "url": "https://www.iowadnr.gov/media/8889/download?inline=",
        "provider": "local"
      },
      {
        "label": "Villages of Van Buren Douds river access",
        "url": "https://villagesofvanburen.com/explore/douds_county_park_des_moines_river_access/",
        "provider": "local"
      },
      {
        "label": "Iowa DNR Fish Iowa Ottumwa Dam to Farmington",
        "url": "https://programs.iowadnr.gov/lakemanagement/FishIowa/RiverStreamDetails/RDM89",
        "provider": "local"
      },
      {
        "label": "Outdoor Adventures Made Easy Geode Paddle",
        "url": "https://outdooradventuresmadeeasy.com/iowa/geode-paddle/",
        "provider": "local"
      },
      {
        "label": "USGS 05490500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05490500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "des-moines-river-douds-austin-park",
    "slug": "des-moines-river-douds-austin-park",
    "name": "Des Moines River",
    "reach": "Douds Access to Austin Park",
    "state": "Iowa",
    "region": "Southeast Iowa",
    "summary": "Longer official Lower Des Moines River day from Douds to Austin Park, shifting from straight agricultural banks into wooded bends and old southern-Iowa bluffs, with endpoint camping support.",
    "statusText": "Use the Des Moines River at Keosauqua gauge as a lower-river proxy. The accepted 800 to 6,000 cfs model is conservative; this longer reach gets more committing when releases are high or wind builds.",
    "latitude": 40.83613,
    "longitude": -92.08879,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks",
        "remote",
        "cold_water"
      ],
      "safetyNotes": [
        "Iowa DNR says this nearly 10-mile reach may be long for beginning paddlers even though it has few in-river hazards.",
        "The lower half bends through steeper wooded terrain; plan fewer easy exits and more rescue exposure than the short Shidepoke/Douds split.",
        "Red Rock releases, wind, silver carp, bridge debris, and private uplands should all factor into the same-day decision."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05490500",
      "provider": "usgs",
      "siteId": "05490500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Des Moines River at Keosauqua, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05490500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 3000,
      "idealMax": 4500,
      "tooLow": 800,
      "tooHigh": 6000,
      "thresholdSource": {
        "label": "Outdoor Adventures Made Easy lower Des Moines Keosauqua-gauge notes",
        "url": "https://outdooradventuresmadeeasy.com/iowa/geode-paddle/",
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
      "seasonNotes": "Spring through fall is the practical season. Summer lows can slow the longer reach, while release-driven high water can make wooded bends and bridge approaches pushy.",
      "difficulty": "moderate",
      "difficultyNotes": "The Douds-to-Austin distance is close to 10 miles and the DNR says that may be a bit long for beginners. The route is mostly flatwater, but length, exposure, release-driven current, wind, and fewer easy exits justify moderate difficulty.",
      "confidenceNotes": "Confidence is moderate-good: Iowa DNR documents the exact Douds-to-Austin Park reach, mileage, route character, and suitability caveat; county/tourism sources corroborate Douds and Austin as public lower-river access/camping sites; Fish Iowa confirms ramp infrastructure along the Ottumwa-to-Farmington corridor; and USGS Keosauqua is current. Threshold confidence is capped because the cfs model is reused from a same-gauge lower-river source instead of a manager-published Douds-to-Austin band."
    },
    "evidenceNotes": [
      {
        "label": "Official route",
        "value": "Douds to Austin Park, 9.75 mi",
        "note": "Iowa DNR Lower Des Moines River water-trail material names this reach and says the first half is similar to the straighter upstream reaches before the river bends through wooded hills and valleys.",
        "sourceUrl": "https://www.iowadnr.gov/media/8889/download?inline="
      },
      {
        "label": "Public access and camping",
        "value": "Douds ramp; Austin Park camping/boat access",
        "note": "Villages of Van Buren describes Douds as a boat-ramp access with two campsites, and county guide material lists Austin Park on the Des Moines River with camping, shelter, water, primitive toilets, and boat access.",
        "sourceUrl": "https://villagesofvanburen.com/files/des_moines_river_trail_brochure_35283.pdf"
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05490500 5,060 cfs / 11.84 ft at 2026-07-23 10:00 CDT",
        "note": "USGS Water Services returned current Des Moines River at Keosauqua data during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05490500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold model",
        "value": "800 / 3,000-4,500 / 6,000 cfs",
        "note": "The app reuses the accepted lower Des Moines Keosauqua-gauge community model from the adjacent Bentonsport-to-Bonaparte source and documents the proxy limitation.",
        "sourceUrl": "https://outdooradventuresmadeeasy.com/iowa/geode-paddle/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Iowa DNR Lower Des Moines River guide",
        "url": "https://www.iowadnr.gov/media/8889/download?inline=",
        "provider": "local"
      },
      {
        "label": "Villages of Van Buren Des Moines River Trail",
        "url": "https://villagesofvanburen.com/explore/des_moines_river_trail/",
        "provider": "local"
      },
      {
        "label": "Villages of Van Buren river trail brochure",
        "url": "https://villagesofvanburen.com/files/des_moines_river_trail_brochure_35283.pdf",
        "provider": "local"
      },
      {
        "label": "Iowa DNR Fish Iowa Ottumwa Dam to Farmington",
        "url": "https://programs.iowadnr.gov/lakemanagement/FishIowa/RiverStreamDetails/RDM89",
        "provider": "local"
      },
      {
        "label": "Outdoor Adventures Made Easy Geode Paddle",
        "url": "https://outdooradventuresmadeeasy.com/iowa/geode-paddle/",
        "provider": "local"
      },
      {
        "label": "USGS 05490500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05490500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "des-moines-river-austin-park-keosauqua",
    "slug": "des-moines-river-austin-park-keosauqua",
    "name": "Des Moines River",
    "reach": "Austin Park to Keosauqua Boat Ramp",
    "state": "Iowa",
    "region": "Southeast Iowa",
    "summary": "Official Lower Des Moines River water-trail reach from Austin Park around the Lacey-Keosauqua bend to Keosauqua, with state-park bluff scenery, endpoint camping support, and a direct Keosauqua gauge.",
    "statusText": "Use the Des Moines River at Keosauqua gauge. Treat the accepted lower-river 800 to 6,000 cfs model conservatively; the DNR says this reach is beginner-appropriate only when water levels are normal.",
    "latitude": 40.7715,
    "longitude": -91.976,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks",
        "cold_water"
      ],
      "safetyNotes": [
        "Iowa DNR says the Pittsburg and Keosauqua bridge pilings are hazards to avoid, especially when current is pushy.",
        "Red Rock releases can make this reach unexpectedly low, high, or fast even when local weather is quiet.",
        "The Lower Des Moines is meandered, but private property begins at the high-water mark. Keep stops to legal bars and public lands."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05490500",
      "provider": "usgs",
      "siteId": "05490500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Des Moines River at Keosauqua, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05490500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 3000,
      "idealMax": 4500,
      "tooLow": 800,
      "tooHigh": 6000,
      "thresholdSource": {
        "label": "Outdoor Adventures Made Easy lower Des Moines Keosauqua-gauge notes",
        "url": "https://outdooradventuresmadeeasy.com/iowa/geode-paddle/",
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
      "seasonNotes": "Spring through fall is the practical season. Summer lows can expose bars and slow the trip; release-driven high water can make bridge approaches and wooded bends less beginner-friendly.",
      "difficulty": "easy",
      "difficultyNotes": "Iowa DNR calls this 5.8-mile reach appropriate for beginners at normal water levels. Bridge pilings, release-driven current, wind, cold water, and private-bank limits still require a normal same-day river check.",
      "confidenceNotes": "Confidence is moderate-good: Iowa DNR documents Austin Park to Keosauqua as a 5.8-mile Lower Des Moines water-trail reach, describes the Pittsburg bridge, Lacey-Keosauqua State Park bend, endpoint camping context, and hazards, while USGS 05490500 is direct at Keosauqua. Threshold confidence is capped because the app reuses the accepted lower-river Keosauqua-gauge community model from the nearby Bentonsport-to-Bonaparte route rather than an official segment-specific band."
    },
    "evidenceNotes": [
      {
        "label": "Official route",
        "value": "Austin Park to Keosauqua, 5.8 mi",
        "note": "Iowa DNR names this exact Lower Des Moines water-trail reach and describes the nearly two miles to Pittsburg plus the remaining bend around Lacey-Keosauqua State Park.",
        "sourceUrl": "https://www.iowadnr.gov/media/8889/download?inline="
      },
      {
        "label": "Public access and camping",
        "value": "Austin Park and Keosauqua access/camping context",
        "note": "Villages of Van Buren lists Austin Park with boat access, camping, restroom, water, kiosk, and shelter, and Keosauqua with boat access, restroom, water, food, kiosk, camping, lodging, cabins, and B&B options.",
        "sourceUrl": "https://villagesofvanburen.com/files/des_moines_river_trail_brochure_35283.pdf"
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05490500 8,110 cfs / 12.87 ft at 2026-07-23 13:15 CDT",
        "note": "USGS Water Services returned current Des Moines River at Keosauqua data during this run, above the conservative high-water ceiling.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05490500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Threshold model",
        "value": "800 / 3,000-4,500 / 6,000 cfs",
        "note": "The app reuses the accepted lower Des Moines Keosauqua-gauge model from the adjacent Bentonsport-to-Bonaparte source, with no new segment-specific cutoff invented.",
        "sourceUrl": "https://outdooradventuresmadeeasy.com/iowa/geode-paddle/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Iowa DNR Lower Des Moines River guide",
        "url": "https://www.iowadnr.gov/media/8889/download?inline=",
        "provider": "local"
      },
      {
        "label": "Villages of Van Buren river trail brochure",
        "url": "https://villagesofvanburen.com/files/des_moines_river_trail_brochure_35283.pdf",
        "provider": "local"
      },
      {
        "label": "Villages of Van Buren Des Moines River Trail",
        "url": "https://villagesofvanburen.com/explore/des_moines_river_trail/",
        "provider": "local"
      },
      {
        "label": "Outdoor Adventures Made Easy Geode Paddle",
        "url": "https://outdooradventuresmadeeasy.com/iowa/geode-paddle/",
        "provider": "local"
      },
      {
        "label": "USGS 05490500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05490500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "des-moines-river-bonaparte-des-moines-access",
    "slug": "des-moines-river-bonaparte-des-moines-access",
    "name": "Des Moines River",
    "reach": "Bonaparte Boat Ramp to Des Moines River Access",
    "state": "Iowa",
    "region": "Southeast Iowa",
    "summary": "Short Lower Des Moines River continuation from Bonaparte to the county Des Moines River Access, with old-dam remains immediately below the put-in and a primitive campground at the take-out.",
    "statusText": "Use the Des Moines River at Keosauqua gauge as an upstream same-corridor screen. The accepted 800 to 6,000 cfs model is conservative; old dam remains below Bonaparte make low-water and high-current starts more consequential.",
    "latitude": 40.69785,
    "longitude": -91.80552,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "dam",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "Iowa DNR warns that old dam remains immediately below Bonaparte may be hazardous, especially in low water.",
        "After launching, DNR says paddlers must move quickly toward the opposite side of the river, so beginners need normal levels and a clean line.",
        "Use the public Bonaparte ramp and county Des Moines River Access only; do not rely on private cabins, pasture banks, or informal exits."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05490500",
      "provider": "usgs",
      "siteId": "05490500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Des Moines River at Keosauqua, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05490500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 3000,
      "idealMax": 4500,
      "tooLow": 800,
      "tooHigh": 6000,
      "thresholdSource": {
        "label": "Outdoor Adventures Made Easy lower Des Moines Keosauqua-gauge notes",
        "url": "https://outdooradventuresmadeeasy.com/iowa/geode-paddle/",
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
      "seasonNotes": "Late summer and fall often expose more rock and geode-bar context, but very low water can require dragging or careful walking. Spring or release-driven high water can bury bars and make the Bonaparte start pushy.",
      "difficulty": "moderate",
      "difficultyNotes": "The mileage is short, but the old dam remnants directly below Bonaparte, the required cross-river move, private banks, and release-driven current justify more caution than a simple three-mile float.",
      "confidenceNotes": "Confidence is moderate-good: Iowa DNR documents Bonaparte to Des Moines River Access as a 3.4-mile Lower Des Moines reach, identifies the take-out as a cement ramp maintained by Van Buren County Conservation Board, and flags the old-dam start hazard. Villages of Van Buren corroborates access/camping context. Threshold confidence is capped because the direct gauge is upstream at Keosauqua and the cfs bands come from the adjacent same-lower-river Bentonsport/Bonaparte source."
    },
    "evidenceNotes": [
      {
        "label": "Official route",
        "value": "Bonaparte to Des Moines River Access, 3.4 mi",
        "note": "Iowa DNR names the Bonaparte-to-Des-Moines-River-Access reach and describes the access as a cement boat ramp maintained by the Van Buren County Conservation Board.",
        "sourceUrl": "https://www.iowadnr.gov/media/8889/download?inline="
      },
      {
        "label": "Key hazard",
        "value": "Old dam remains below Bonaparte",
        "note": "Iowa DNR says old dam remains immediately below Bonaparte may cause a hazard, especially in low water, and that paddlers must move quickly to the opposite side after putting in.",
        "sourceUrl": "https://www.iowadnr.gov/media/8889/download?inline="
      },
      {
        "label": "Access and camping",
        "value": "Des Moines River Access primitive camping and boat ramp",
        "note": "Villages of Van Buren lists Des Moines River Access four miles southeast of Bonaparte on the south side, with primitive camping and a boat ramp.",
        "sourceUrl": "https://villagesofvanburen.com/files/des_moines_river_trail_brochure_35283.pdf"
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05490500 8,110 cfs / 12.87 ft at 2026-07-23 13:15 CDT",
        "note": "USGS Water Services returned current Keosauqua data during this run; the route is currently above the selected conservative high-water ceiling.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05490500&parameterCd=00060,00065&siteStatus=all"
      }
    ],
    "sourceLinks": [
      {
        "label": "Iowa DNR Lower Des Moines River guide",
        "url": "https://www.iowadnr.gov/media/8889/download?inline=",
        "provider": "local"
      },
      {
        "label": "Villages of Van Buren river trail brochure",
        "url": "https://villagesofvanburen.com/files/des_moines_river_trail_brochure_35283.pdf",
        "provider": "local"
      },
      {
        "label": "Villages of Van Buren Des Moines River Trail",
        "url": "https://villagesofvanburen.com/explore/des_moines_river_trail/",
        "provider": "local"
      },
      {
        "label": "Outdoor Adventures Made Easy Geode Paddle",
        "url": "https://outdooradventuresmadeeasy.com/iowa/geode-paddle/",
        "provider": "local"
      },
      {
        "label": "Snoflo Des Moines River Access launch record",
        "url": "https://snoflo.org/boat-launches/iowa/des-moines-river-access",
        "provider": "local"
      },
      {
        "label": "USGS 05490500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05490500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "des-moines-river-access-farmington",
    "slug": "des-moines-river-access-farmington",
    "name": "Des Moines River",
    "reach": "Des Moines River Access to Farmington Access",
    "state": "Iowa",
    "region": "Southeast Iowa",
    "summary": "Final Iowa-side Lower Des Moines water-trail segment from the county Des Moines River Access to Farmington, a short residential-and-farm corridor with primitive put-in camping and a signed town take-out below Highway 2.",
    "statusText": "Use the Des Moines River at Keosauqua gauge as an upstream lower-river screen. Treat 800 to 6,000 cfs as the conservative accepted range; above that, even this short finish can become fast and debris-prone.",
    "latitude": 40.6713,
    "longitude": -91.758,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks",
        "cold_water"
      ],
      "safetyNotes": [
        "Iowa DNR describes this as an easy short reach, but the lower Des Moines still carries Red Rock release effects, debris, and silver-carp risk.",
        "Take out at Farmington Access below the Highway 2 bridge on river left/east side; do not drift past the intended town access without a separate downstream plan.",
        "Use public access land and legal bars only. Adjacent residential, agricultural, and wooded banks should be treated as private unless clearly posted public."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05490500",
      "provider": "usgs",
      "siteId": "05490500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Des Moines River at Keosauqua, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05490500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 3000,
      "idealMax": 4500,
      "tooLow": 800,
      "tooHigh": 6000,
      "thresholdSource": {
        "label": "Outdoor Adventures Made Easy lower Des Moines Keosauqua-gauge notes",
        "url": "https://outdooradventuresmadeeasy.com/iowa/geode-paddle/",
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
      "seasonNotes": "Spring through fall is typical. This last short reach can be a straightforward finish at normal levels, but release-driven high water, cold water, wind, or debris can make the take-out timing more important.",
      "difficulty": "easy",
      "difficultyNotes": "Iowa DNR calls this straight three-mile reach easy. The caution rating reflects the large-river setting, upstream-release control, private banks, debris, and the need to identify the Farmington take-out below Highway 2.",
      "confidenceNotes": "Confidence is moderate-good: Iowa DNR documents Des Moines River Access to Farmington as a three-mile reach and names Farmington Access below the Highway 2 bridge; Villages of Van Buren corroborates both access points and camping at Farmington and the upstream county access; Snoflo provides practical launch coordinates. Threshold confidence is capped because the selected gauge is an upstream lower-river proxy and the cfs model comes from the nearby same-corridor community source."
    },
    "evidenceNotes": [
      {
        "label": "Official route",
        "value": "Des Moines River Access to Farmington, 3 mi",
        "note": "Iowa DNR names this exact reach, describes it as a straight short section, and places Farmington Access on the east side below the Highway 2 bridge.",
        "sourceUrl": "https://www.iowadnr.gov/media/8889/download?inline="
      },
      {
        "label": "Access and camping",
        "value": "County access primitive camping; Farmington access/camping",
        "note": "Villages of Van Buren lists Des Moines River Access with primitive camping and boat ramp, and Farmington with boat access, restroom, water, food, kiosk, camping, cabins, and shelter.",
        "sourceUrl": "https://villagesofvanburen.com/files/des_moines_river_trail_brochure_35283.pdf"
      },
      {
        "label": "Access coordinates",
        "value": "Des Moines River Access 40.67130, -91.75801; Farmington 40.63880, -91.74389",
        "note": "Snoflo launch records publish practical coordinates for the named Des Moines River Access and Farmington Access boat launches; confirm exact ramp approach from posted signs.",
        "sourceUrl": "https://snoflo.org/boat-launches/iowa/farmington-access"
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05490500 8,110 cfs / 12.87 ft at 2026-07-23 13:15 CDT",
        "note": "USGS Water Services returned current Keosauqua data during this run, above the selected conservative high-water ceiling.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05490500&parameterCd=00060,00065&siteStatus=all"
      }
    ],
    "sourceLinks": [
      {
        "label": "Iowa DNR Lower Des Moines River guide",
        "url": "https://www.iowadnr.gov/media/8889/download?inline=",
        "provider": "local"
      },
      {
        "label": "Villages of Van Buren river trail brochure",
        "url": "https://villagesofvanburen.com/files/des_moines_river_trail_brochure_35283.pdf",
        "provider": "local"
      },
      {
        "label": "Villages of Van Buren Des Moines River Trail",
        "url": "https://villagesofvanburen.com/explore/des_moines_river_trail/",
        "provider": "local"
      },
      {
        "label": "Iowa DNR Fish Iowa Ottumwa Dam to Farmington",
        "url": "https://programs.iowadnr.gov/lakemanagement/FishIowa/RiverStreamDetails/RDM89",
        "provider": "local"
      },
      {
        "label": "Snoflo Des Moines River Access launch record",
        "url": "https://snoflo.org/boat-launches/iowa/des-moines-river-access",
        "provider": "local"
      },
      {
        "label": "Snoflo Farmington Access launch record",
        "url": "https://snoflo.org/boat-launches/iowa/farmington-access",
        "provider": "local"
      },
      {
        "label": "USGS 05490500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05490500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "upper-iowa-river-cattle-creek-malanaphy",
    "slug": "upper-iowa-river-cattle-creek-malanaphy",
    "name": "Upper Iowa River",
    "reach": "Cattle Creek Road to Malanaphy Springs",
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Consolidated Upper Iowa family route from Cattle Creek through Chimney Rock and Bluffton to Malanaphy Springs. The three intermediate accesses preserve shorter bailout and shuttle options without publishing overlapping cards.",
    "statusText": "Use the Bluffton USGS gauge as the direct corridor check: about 150 cfs is the scrape-prone floor, 200 to 500 cfs is the broad target, and 700+ cfs is too pushy for a normal recreational recommendation. Make a same-day visual call for wood, bridge approaches, and rising water before committing to this long day.",
    "latitude": 43.4149,
    "longitude": -91.95874,
    "gaugeSource": {
      "id": "usgs-05387440",
      "provider": "usgs",
      "siteId": "05387440",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Upper Iowa River at Bluffton, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05387440/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 200,
      "idealMax": 500,
      "tooLow": 150,
      "tooHigh": 700,
      "thresholdSource": {
        "label": "Wisconsin River Trips Upper Iowa River Bluffton gauge guidance",
        "url": "https://www.wisconsinrivertrips.com/segments/upper-iowa-river",
        "provider": "wisconsin_river_trips"
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
      "seasonNotes": "Late spring through early fall is the practical window. This is a long, commitment-heavy family route; low water can make riffles slow and high water can make current, wood, and bridge approaches too consequential for a general recreational recommendation.",
      "difficulty": "moderate",
      "difficultyNotes": "Mostly Class I moving water with scenic bluffs and multiple named accesses, but the 18.2-mile commitment, limited bailouts between access points, cold spring inflows, private banks, and uncertain high-water ceiling warrant a moderate caution posture.",
      "confidenceNotes": "Confidence is good for the access chain and route shape: the source cards document Cattle Creek, Chimney Rock, Bluffton Fir Stand, and Malanaphy Springs in sequence against the Bluffton USGS gauge. The same-river corridor guidance supports a conservative 150 cfs floor, 200 to 500 cfs target, and 700+ cfs high-water cutoff for normal recreational use; paddlers should still inspect rising-water and wood conditions locally."
    },
    "evidenceNotes": [
      {
        "label": "Official access sequence",
        "value": "Cattle Creek Road to Chimney Rock Park Access",
        "note": "The Upper Iowa River Paddler's Guide lists Cattle Creek Road at river mile 83.2, Chimney Rock at 79.4, and Chimney Rock Park Access at 78.7.",
        "sourceUrl": "https://www.winneshiekwild.com/wp-content/uploads/2019/12/Upper-Iowa-River-Paddlers-Guide-Web.pdf"
      },
      {
        "label": "Published route split",
        "value": "4.5 miles",
        "note": "Wisconsin River Trips lists Cattle Creek Road to Chimney Rock Access as a 4.5-mile section with several bluffs and Chimney Rock as the highlight.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/upper-iowa-river"
      },
      {
        "label": "Gauge ladder",
        "value": "150 / 200-500 / 700 cfs",
        "note": "Wisconsin River Trips reports 305 cfs at Bluffton as more than plenty, treats 200 cfs as low, 150 cfs as scrape-prone, and estimates 700 cfs and up as too pushy.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/upper-iowa-river"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 05387440",
        "note": "USGS Water Services returned 871 cfs and 4.69 ft at 2026-07-22 14:45 CDT for Upper Iowa River at Bluffton, IA, which is above the normal recreational ceiling used here.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05387440&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Access caveat",
        "value": "Changed Cattle Creek bridge area",
        "note": "Older route reports describe the Cattle Creek bridge/access area as changed, so paddlers should confirm current parking and the launch path before unloading.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/upper-iowa-river"
      },
      {
        "label": "Consolidated access chain",
        "value": "Cattle Creek 0.0 / Chimney Rock 4.5 / Bluffton 9.8 / Malanaphy 18.2 mi",
        "note": "The three retired split cards documented a continuous public-access chain. The family card keeps those access points as intermediate bailouts and avoids overlapping route cards.",
        "sourceUrl": "https://www.winneshiekwild.com/wp-content/uploads/2019/12/Upper-Iowa-River-Paddlers-Guide-Web.pdf"
      },
      {
        "label": "Full-route water model",
        "value": "150 cfs floor; 200-500 cfs target; 700+ cfs too pushy",
        "note": "Wisconsin River Trips ties the same Bluffton corridor to 150 cfs as scrape-prone, 200 to 500 cfs as the broad recreational target, and 700+ cfs as too pushy for a normal recreational recommendation. Apply the upper cutoff conservatively and confirm wood/current conditions on the full route.",
        "sourceUrl": "https://www.wisconsinrivertrips.com/segments/upper-iowa-river"
      }
    ],
    "sourceLinks": [
      {
        "label": "Upper Iowa River Paddler's Guide",
        "url": "https://www.winneshiekwild.com/wp-content/uploads/2019/12/Upper-Iowa-River-Paddlers-Guide-Web.pdf",
        "provider": "local"
      },
      {
        "label": "Wisconsin River Trips Upper Iowa River",
        "url": "https://www.wisconsinrivertrips.com/segments/upper-iowa-river",
        "provider": "wisconsin_river_trips"
      },
      {
        "label": "USGS 05387440 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05387440/",
        "provider": "usgs"
      }
    ],
    "aliases": [
      "Upper Iowa scenic family route",
      "Cattle Creek to Malanaphy via Chimney Rock and Bluffton"
    ],
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "cold_water",
        "private_banks",
        "access_uncertain"
      ],
      "safetyNotes": [
        "This is an approximately 18.2-mile full-day route. Treat Chimney Rock, Bluffton Fir Stand, and Malanaphy Springs as planned intermediate access or bailout points, not automatic public camping sites.",
        "Storm wood, strainers, bridge approaches, shallow riffles, and pushy rising water can change the route quickly. Scout each major access and portage or cancel when the channel is obstructed.",
        "Malanaphy Springs and some Upper Iowa landings have limited or permission-sensitive parking and banks. Use named public access only and confirm the downstream shuttle before launch.",
        "The direct Bluffton gauge supports a low-water floor but not a complete high-water ladder for this full family route. Pair the reading with a same-day visual check and local outfitter guidance when water is rising."
      ],
      "reviewStatus": "reviewed"
    },
    "putIn": {
      "name": "Cattle Creek Road / Daley Bridge canoe access area",
      "latitude": 43.4149,
      "longitude": -91.95874
    },
    "takeOut": {
      "name": "Malanaphy Springs / Bluffton Road bridge access",
      "latitude": 43.34508,
      "longitude": -91.843
    },
    "accessPoints": [
      {
        "id": "cattle-creek-road-daley-bridge",
        "name": "Cattle Creek Road / Daley Bridge canoe access area",
        "latitude": 43.4149,
        "longitude": -91.95874,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in for the consolidated Upper Iowa family route."
      },
      {
        "id": "chimney-rock-park-access",
        "name": "Chimney Rock Road bridge / Chimney Rock Park access",
        "latitude": 43.42156,
        "longitude": -91.93467,
        "mileFromStart": 4.5,
        "segmentKind": "creek",
        "note": "Intermediate access and bailout after the first scenic bluff reach."
      },
      {
        "id": "bluffton-fir-stand-access",
        "name": "Bluffton Fir Stand Access / Bluffton Road-W20 canoe ramp",
        "latitude": 43.3996,
        "longitude": -91.8884,
        "mileFromStart": 9.8,
        "segmentKind": "creek",
        "note": "Intermediate public access and bailout before the downstream spring corridor."
      },
      {
        "id": "malanaphy-springs-access",
        "name": "Malanaphy Springs / Bluffton Road bridge access",
        "latitude": 43.34508,
        "longitude": -91.843,
        "mileFromStart": 18.2,
        "segmentKind": "creek",
        "note": "Default take-out; inspect parking and landing conditions before committing to the full route."
      }
    ]
  },
  {
    "id": "iowa-river-hills-river-junction",
    "slug": "iowa-river-hills-river-junction",
    "name": "Iowa River",
    "reach": "Hills Access to River Junction Access",
    "state": "Iowa",
    "region": "Iowa City Area",
    "summary": "Official Johnson County Iowa River Water Trail segment from Hills Access and Campground to River Junction Access and Campground, with sinuous bottomland forest, endpoint camping, and a direct Iowa City gauge floor.",
    "statusText": "Use the Iowa River at Iowa City gauge. Treat 200 cfs as the conservative low-water floor from Johnson County cleanup history; avoid high or rising water, muddy landings, and any River Junction closure notice.",
    "latitude": 41.5544618,
    "longitude": -91.5257829,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "Johnson County closed River Junction to vehicle traffic during June 2026 high water, so check current county notices before staging the take-out.",
        "This segment is highly sinuous and runs through bottomland forest. Expect fresh wood, soft banks, and fewer simple exits after rain.",
        "Use Hills Access and River Junction Access as the public endpoints; do not assume private banks or farmland edges are legal stops."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05454500",
      "provider": "usgs",
      "siteId": "05454500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Iowa River at Iowa City, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05454500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 200,
      "thresholdSource": {
        "label": "Johnson County Iowa River Clean Up history for the Sturgis-to-Hills reach",
        "url": "https://www.johnsoncountyiowa.gov/iowa-river-clean",
        "provider": "local"
      },
      "thresholdSourceStrength": "derived",
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
      "seasonNotes": "Spring through fall is the practical window. This lower Johnson County segment can be pleasant at moderate levels, but floodplain access closures, recent rain, and debris can override a simple low-water floor.",
      "difficulty": "easy",
      "difficultyNotes": "Johnson County presents the segment as a normal water-trail paddle, but the 9.8-mile distance, sinuous wooded channel, soft landings, and closure-prone River Junction floodplain justify a caution profile.",
      "confidenceNotes": "Confidence is good for access and route shape: Johnson County documents Hills-to-River-Junction as a 9.8-mile Iowa River Water Trail segment, identifies both endpoints as JCC access/campground properties, and publishes River Junction coordinates and boat-ramp/camping support. Gauge confidence is moderate: the Iowa City gauge is direct upstream on the same river and existing county cleanup records support only a conservative 200 cfs floor, not a full high-water band."
    },
    "evidenceNotes": [
      {
        "label": "Official route",
        "value": "Hills Access to River Junction Access, 9.8 mi",
        "note": "Johnson County lists Hills Access to River Junction Access as the second Johnson County Iowa River Water Trail segment and describes a highly sinuous reach with bottomland forest and Pechman Creek Delta context.",
        "sourceUrl": "https://johnsoncountyiowa.gov/sites/default/files/2021-05/Iowa_River_Water_Trail.pdf"
      },
      {
        "label": "Endpoint access and camping",
        "value": "Boat ramps and campgrounds at both ends",
        "note": "Johnson County park guides describe Hills as a popular launch/end point with ramp, latrine, playground, and electric/non-electric camping; River Junction has a ramp, parking, non-electric camping, and restrooms.",
        "sourceUrl": "https://www.johnsoncountyiowa.gov/sites/default/files/2024-02/Park%20Guides%20%28All%20in%20One%20File%29_reduced%20size.pdf"
      },
      {
        "label": "River Junction coordinate",
        "value": "41.4912969, -91.5017984",
        "note": "Johnson County camping information publishes River Junction map coordinates and notes boat-ramp access to the Iowa River.",
        "sourceUrl": "https://www.johnsoncountyiowa.gov/conservation/camping"
      },
      {
        "label": "Current gauge check",
        "value": "2,200 cfs / 11.77 ft at 2026-07-23 14:00 CDT",
        "note": "USGS Water Services returned current Iowa River at Iowa City discharge and stage during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05454500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Closure caveat",
        "value": "River Junction closed during June 2026 rising water",
        "note": "Johnson County announced a River Junction vehicle closure on June 17, 2026 because rising Iowa and English River levels were expected to put the area out of bank.",
        "sourceUrl": "https://www.johnsoncountyiowa.gov/news/conservation/flooding/2026-06-17/river-junction-access-closed"
      }
    ],
    "sourceLinks": [
      {
        "label": "Johnson County Iowa River Water Trail PDF",
        "url": "https://johnsoncountyiowa.gov/sites/default/files/2021-05/Iowa_River_Water_Trail.pdf",
        "provider": "local"
      },
      {
        "label": "Johnson County park guides",
        "url": "https://www.johnsoncountyiowa.gov/sites/default/files/2024-02/Park%20Guides%20%28All%20in%20One%20File%29_reduced%20size.pdf",
        "provider": "local"
      },
      {
        "label": "Johnson County camping information",
        "url": "https://www.johnsoncountyiowa.gov/conservation/camping",
        "provider": "local"
      },
      {
        "label": "River Junction high-water closure notice",
        "url": "https://www.johnsoncountyiowa.gov/news/conservation/flooding/2026-06-17/river-junction-access-closed",
        "provider": "local"
      },
      {
        "label": "USGS 05454500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05454500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "south-skunk-river-peterson-park-sleepy-hollow",
    "slug": "south-skunk-river-peterson-park-sleepy-hollow",
    "name": "South Skunk River",
    "reach": "Peterson Park West to Sleepy Hollow",
    "state": "Iowa",
    "region": "Central Iowa",
    "summary": "Missing above-Ames South Skunk water-trail connector from Peterson Park West to Sleepy Hollow, with public Story County access, wooded bends, riffles, and the direct Ames gauge downstream.",
    "statusText": "Use the South Skunk near Ames gauge. CanWePaddle estimates 100 to 1,500 cfs for the Ames-to-Cambridge family; Story County / Skunk River Paddlers support a 125 cfs local low-water floor above Ames.",
    "latitude": 42.0847077,
    "longitude": -93.5974389,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "Story County warns that trees and riffles make nearby Soper-to-Peterson an intermediate-skill stretch; carry that same wood-and-riffle caution into this downstream connector.",
        "The South Skunk is non-meandered. Stop only at public access areas or confirmed public parkland, and avoid private banks except in emergencies.",
        "The Ames gauge is downstream at Sleepy Hollow / W Riverside Road, so inspect the put-in visually for depth, wood, and storm debris."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05470000",
      "provider": "usgs",
      "siteId": "05470000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "South Skunk River near Ames, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05470000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 100,
      "idealMax": 1500,
      "tooLow": 100,
      "tooHigh": 1500,
      "thresholdSource": {
        "label": "CanWePaddle South Skunk Ames-to-Cambridge estimated range",
        "url": "https://canwepaddle.com/rivers/iowa/south-skunk-river-ames-to-cambridge/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "CanWePaddle identifies May through September as the normal season for the Ames-to-Cambridge family. Spring or post-rain water can help depth but also moves wood and mud into the channel.",
      "difficulty": "moderate",
      "difficultyNotes": "This is a short official-access connector, but shallow riffles, sweepers, private-bank limits, and a direct gauge at the take-out corridor make same-day judgment important.",
      "confidenceNotes": "Confidence is good for a targeted gap card: Peterson Park West and Sleepy Hollow are official Story County South Skunk River Water Trail accesses, existing V2 records already source both endpoint coordinates, CanWePaddle publishes an Ames-to-Cambridge range tied to direct USGS 05470000, and USGS Water Services returned current Ames data during this run. The route is distinct because the current exported South Skunk set jumps from Soper-to-Peterson and Sleepy-to-River-Valley without this public access pair."
    },
    "evidenceNotes": [
      {
        "label": "Official access pair",
        "value": "Peterson Park West #233 to Sleepy Hollow #230",
        "note": "Story County lists Peterson Park West and Sleepy Hollow in sequence among South Skunk River Water Trail access points.",
        "sourceUrl": "https://www.storycountyiowa.gov/1496/South-Skunk-River-Water-Trail"
      },
      {
        "label": "Threshold range",
        "value": "100-1,500 cfs",
        "note": "CanWePaddle ties the Ames-to-Cambridge South Skunk route family to USGS 05470000 and estimates a 100 to 1,500 cfs runnable window.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/south-skunk-river-ames-to-cambridge/"
      },
      {
        "label": "Local low-water floor",
        "value": "About 125 cfs above Ames",
        "note": "Skunk River Paddlers says most paddlers consider the minimum recommended flow above Ames and Ioway Creek to be around 125 cfs, with lower flows requiring stepping out in riffles.",
        "sourceUrl": "https://www.skunkriverpaddlers.org/skunk-river-water-trail"
      },
      {
        "label": "Current gauge check",
        "value": "204 cfs / 3.77 ft at 2026-07-23 14:00 CDT",
        "note": "USGS Water Services returned current South Skunk near Ames discharge and stage during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05470000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Access and shore-use caveat",
        "value": "Public water, private banks",
        "note": "Story County and Skunk River Paddlers warn that the South Skunk is non-meandered and much adjoining land is private, so public accesses and confirmed public parkland should anchor stops.",
        "sourceUrl": "https://www.storycountyiowa.gov/1496/South-Skunk-River-Water-Trail"
      }
    ],
    "sourceLinks": [
      {
        "label": "Story County South Skunk River Water Trail",
        "url": "https://www.storycountyiowa.gov/1496/South-Skunk-River-Water-Trail",
        "provider": "local"
      },
      {
        "label": "Story County South Skunk map PDF",
        "url": "https://storycountyiowa.gov/DocumentCenter/View/12558/South-Skunk-River-Water-Trail-2021",
        "provider": "local"
      },
      {
        "label": "CanWePaddle South Skunk Ames to Cambridge",
        "url": "https://canwepaddle.com/rivers/iowa/south-skunk-river-ames-to-cambridge/",
        "provider": "local"
      },
      {
        "label": "Skunk River Paddlers water trail guidance",
        "url": "https://www.skunkriverpaddlers.org/skunk-river-water-trail",
        "provider": "local"
      },
      {
        "label": "USGS 05470000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05470000/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "north-raccoon-river-richey-hyde-park",
    "slug": "north-raccoon-river-richey-hyde-park",
    "name": "North Raccoon River",
    "reach": "Richey Access to Hyde Park Access",
    "state": "Iowa",
    "region": "Central Iowa",
    "summary": "Greene County North Raccoon water-trail split from Richey through Wright Access to Hyde Park, with DNR mileage, campground endpoints, rock-dam boundary, and Jefferson gauge context.",
    "statusText": "Use the North Raccoon near Jefferson gauge as a downstream same-corridor proxy. CanWePaddle estimates 150 to 2,000 cfs for Jefferson-to-Cooper; DNR says take out at Hyde Park to avoid the rock dam and watch dead trees.",
    "latitude": 42.09136,
    "longitude": -94.62949,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks",
        "low_head_dam"
      ],
      "safetyNotes": [
        "DNR says Richey-to-Hyde is appropriate for all skill levels, but beginners should avoid downed trees and take out at Hyde before the rock dam.",
        "The North Raccoon is non-meandered, so banks and bed outside public areas may be private."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05482500",
      "provider": "usgs",
      "siteId": "05482500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "North Raccoon River near Jefferson, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05482500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 150,
      "idealMax": 2000,
      "tooLow": 150,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "CanWePaddle North Raccoon Jefferson to Cooper estimated range",
        "url": "https://canwepaddle.com/rivers/iowa/north-raccoon-river-jefferson-to-cooper/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "Late spring through early fall is the normal planning window. Low summer water can expose rock-dam and riffle hazards, while storm rises make wood avoidance harder on this non-meandered river.",
      "difficulty": "easy",
      "difficultyNotes": "DNR describes this Richey-to-Hyde segment as appropriate for all skill levels, but downed trees, private-bank limits, and the Hyde Park rock-dam boundary still require active scouting.",
      "confidenceNotes": "Confidence is good: Iowa DNR documents Richey to Hyde as 7.3 miles with public endpoints, campground context, a rock-dam take-out boundary, and non-meandered safety guidance. CanWePaddle ties the Jefferson corridor to USGS 05482500 with a 150-2,000 cfs range; USGS returned current Jefferson data during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official route and mileage",
        "value": "Richey to Hyde Park, 7.3 mi",
        "note": "Iowa DNR names Richey Access to Wright Access to Hyde Park Access as a 7.3-mile section.",
        "sourceUrl": "https://www.iowadnr.gov/media/8895/download?inline="
      },
      {
        "label": "Threshold range",
        "value": "150-2,000 cfs",
        "note": "CanWePaddle ties the Jefferson-to-Cooper corridor to USGS 05482500.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/north-raccoon-river-jefferson-to-cooper/"
      },
      {
        "label": "Current gauge check",
        "value": "228 cfs / 5.14 ft at 2026-07-23 15:15 CDT",
        "note": "USGS Water Services returned current North Raccoon near Jefferson data during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05482500&parameterCd=00060,00065&siteStatus=all"
      }
    ],
    "sourceLinks": [
      {
        "label": "Iowa DNR North Raccoon Greene County guide",
        "url": "https://www.iowadnr.gov/media/8895/download?inline=",
        "provider": "local"
      },
      {
        "label": "CanWePaddle North Raccoon Jefferson to Cooper",
        "url": "https://canwepaddle.com/rivers/iowa/north-raccoon-river-jefferson-to-cooper/",
        "provider": "local"
      },
      {
        "label": "USGS 05482500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05482500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "north-raccoon-river-hyde-park-mcmahon",
    "slug": "north-raccoon-river-hyde-park-mcmahon",
    "name": "North Raccoon River",
    "reach": "Hyde Park Access to McMahon Access",
    "state": "Iowa",
    "region": "Central Iowa",
    "summary": "Intermediate Greene County North Raccoon segment from Hyde Park through Brown Bridge to McMahon, with DNR rock-dam, wood, ramp, and Jefferson gauge context.",
    "statusText": "Use the North Raccoon near Jefferson gauge as a same-corridor proxy. CanWePaddle estimates 150 to 2,000 cfs for Jefferson-to-Cooper; DNR flags rock dams at Hyde, Brown Bridge, and near McMahon plus frequent wood.",
    "latitude": 42.1112,
    "longitude": -94.5758,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "low_head_dam",
        "strainers",
        "fast_rise",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "DNR recommends Hyde-to-McMahon for intermediate paddlers because of length, downed trees, and rock dams.",
        "Use public accesses only; non-meandered banks and bed outside public areas may be private."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05482500",
      "provider": "usgs",
      "siteId": "05482500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "North Raccoon River near Jefferson, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05482500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 150,
      "idealMax": 2000,
      "tooLow": 150,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "CanWePaddle North Raccoon Jefferson to Cooper estimated range",
        "url": "https://canwepaddle.com/rivers/iowa/north-raccoon-river-jefferson-to-cooper/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "Late spring through early fall is the normal planning window. Rain can quickly turn the wooded bends and rock-dam approaches pushy, and summer lows can make riffles and access drops scrapey.",
      "difficulty": "moderate",
      "difficultyNotes": "DNR recommends this Hyde-to-McMahon segment for intermediate paddlers because of its length, frequent downed trees, and multiple rock-dam hazards.",
      "confidenceNotes": "Confidence is good: Iowa DNR documents Hyde Park to Brown Bridge to McMahon as 13.5 miles with cement ramps, rock dams, and intermediate safety classification. MyCountyParks supports McMahon as a public ramp. CanWePaddle provides the Jefferson-gauge corridor range; USGS returned current data during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official route and mileage",
        "value": "Hyde Park to McMahon, 13.5 mi",
        "note": "Iowa DNR names Hyde Park Access to Brown Bridge to McMahon Access as a 13.5-mile section.",
        "sourceUrl": "https://www.iowadnr.gov/media/8895/download?inline="
      },
      {
        "label": "Public McMahon endpoint",
        "value": "Concrete boat ramp and parking",
        "note": "Greene County / MyCountyParks describes McMahon Access as a concrete boat ramp with parking and fishing riffle.",
        "sourceUrl": "https://www.mycountyparks.com/county/greene/Park/McMahon-Access"
      },
      {
        "label": "Threshold range",
        "value": "150-2,000 cfs",
        "note": "CanWePaddle ties the Jefferson-to-Cooper corridor to USGS 05482500.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/north-raccoon-river-jefferson-to-cooper/"
      },
      {
        "label": "Current gauge check",
        "value": "228 cfs / 5.14 ft at 2026-07-23 15:15 CDT",
        "note": "USGS Water Services returned current North Raccoon near Jefferson data during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05482500&parameterCd=00060,00065&siteStatus=all"
      }
    ],
    "sourceLinks": [
      {
        "label": "Iowa DNR North Raccoon Greene County guide",
        "url": "https://www.iowadnr.gov/media/8895/download?inline=",
        "provider": "local"
      },
      {
        "label": "Greene County McMahon Access",
        "url": "https://www.mycountyparks.com/county/greene/Park/McMahon-Access",
        "provider": "local"
      },
      {
        "label": "CanWePaddle North Raccoon Jefferson to Cooper",
        "url": "https://canwepaddle.com/rivers/iowa/north-raccoon-river-jefferson-to-cooper/",
        "provider": "local"
      },
      {
        "label": "USGS 05482500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05482500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "north-raccoon-river-henderson-squirrel-hollow",
    "slug": "north-raccoon-river-henderson-squirrel-hollow",
    "name": "North Raccoon River",
    "reach": "Henderson Park Access to Squirrel Hollow Park",
    "state": "Iowa",
    "region": "Central Iowa",
    "summary": "Wild Greene County North Raccoon connector from Henderson Park to Squirrel Hollow, filling the access gap before the existing Squirrel-to-Adkins card with DNR portage and wood caveats.",
    "statusText": "Use the North Raccoon near Jefferson gauge. CanWePaddle estimates 150 to 2,000 cfs for Jefferson-to-Cooper; DNR warns accesses are unsigned from the river and a rock dam above Squirrel Hollow has a signed river-left portage.",
    "latitude": 41.9698,
    "longitude": -94.3766,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "low_head_dam",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "DNR says no access signs are visible from the river; confirm Squirrel Hollow from land.",
        "A rock dam above Squirrel Hollow has a signed river-left portage.",
        "Use public accesses only on this non-meandered river."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05482500",
      "provider": "usgs",
      "siteId": "05482500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "North Raccoon River near Jefferson, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05482500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 150,
      "idealMax": 2000,
      "tooLow": 150,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "CanWePaddle North Raccoon Jefferson to Cooper estimated range",
        "url": "https://canwepaddle.com/rivers/iowa/north-raccoon-river-jefferson-to-cooper/",
        "provider": "local"
      },
      "thresholdSourceStrength": "community",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        5,
        6,
        7,
        8,
        9
      ],
      "seasonNotes": "Late spring through early fall is the normal planning window. Use extra caution after rain because wood, unsigned accesses, and the Squirrel Hollow rock-dam portage become more consequential.",
      "difficulty": "moderate",
      "difficultyNotes": "The selected split is moderate because DNR documents unsigned access visibility, a rock-dam portage above Squirrel Hollow, wood, and private-bank limits despite otherwise manageable gradient.",
      "confidenceNotes": "Confidence is good: Iowa DNR documents Henderson to Squirrel Hollow to Adkins as 12 miles, describes public ramps, and identifies the Squirrel Hollow rock dam and signed portage. Existing Squirrel-to-Adkins support makes Henderson-to-Squirrel about 8.2 miles. CanWePaddle provides the direct Jefferson-gauge corridor range."
    },
    "evidenceNotes": [
      {
        "label": "Official route context",
        "value": "Henderson to Squirrel Hollow to Adkins, 12 mi",
        "note": "Iowa DNR names Henderson Park Access to Squirrel Hollow Park Access to Adkins Bridge Access as a 12-mile section.",
        "sourceUrl": "https://www.iowadnr.gov/media/8895/download?inline="
      },
      {
        "label": "Selected split mileage",
        "value": "About 8.2 mi to Squirrel Hollow",
        "note": "DNR gives the through section as 12 miles and Greene County documents Squirrel Hollow to Adkins as 3.8 miles.",
        "sourceUrl": "https://www.mycountyparks.com/county/greene/park/squirrel-hollow-park"
      },
      {
        "label": "Threshold range",
        "value": "150-2,000 cfs",
        "note": "CanWePaddle ties the Jefferson-to-Cooper corridor to USGS 05482500.",
        "sourceUrl": "https://canwepaddle.com/rivers/iowa/north-raccoon-river-jefferson-to-cooper/"
      },
      {
        "label": "Current gauge check",
        "value": "228 cfs / 5.14 ft at 2026-07-23 15:15 CDT",
        "note": "USGS Water Services returned current North Raccoon near Jefferson data during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05482500&parameterCd=00060,00065&siteStatus=all"
      }
    ],
    "sourceLinks": [
      {
        "label": "Iowa DNR North Raccoon Greene County guide",
        "url": "https://www.iowadnr.gov/media/8895/download?inline=",
        "provider": "local"
      },
      {
        "label": "Greene County Squirrel Hollow Park",
        "url": "https://www.mycountyparks.com/county/greene/park/squirrel-hollow-park",
        "provider": "local"
      },
      {
        "label": "CanWePaddle North Raccoon Jefferson to Cooper",
        "url": "https://canwepaddle.com/rivers/iowa/north-raccoon-river-jefferson-to-cooper/",
        "provider": "local"
      },
      {
        "label": "USGS 05482500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05482500/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "cedar-river-otranto-acorn",
    "slug": "cedar-river-otranto-acorn",
    "name": "Cedar River",
    "reach": "Otranto Park below dam to Acorn Park",
    "state": "Iowa",
    "region": "North Central Iowa",
    "summary": "Upper Cedar River water-trail leg from Otranto Park below the dam to Acorn Park near St. Ansgar, with official guide coordinates, a broken-dam finish, riffles, and conservative Charles City gauge screening.",
    "statusText": "Use the Cedar River at Charles City gauge as the route-ready downstream signal. The guide says 200 cfs is preferable for adequate water and 400 to 600 cfs is better; scout Acorn Park because the broken dam has little margin for error.",
    "latitude": 43.458242,
    "longitude": -92.97915,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "dam",
        "low_head_dam",
        "strainers",
        "fast_rise",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "Launch from Otranto Park below the dam; do not launch above or near the dam boil.",
        "The guide says the broken Acorn Park Dam is fast water with little margin for error. Scout from land and portage or take out rather than running it blindly.",
        "The official Osage gauge is stale in USGS Water Services, so this card uses the downstream Charles City gauge as a conservative corridor signal plus a required same-day visual check."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05457700",
      "provider": "usgs",
      "siteId": "05457700",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Cedar River at Charles City, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05457700/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 200,
      "tooLow": 200,
      "thresholdSource": {
        "label": "Cedar River Paddling Trips Otranto-to-Janesville guide",
        "url": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
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
      "seasonNotes": "Spring through fall is the practical planning window. Low water exposes metal and rock near the broken Acorn dam; high or rising water makes the dam, wood, and rural landings more consequential.",
      "difficulty": "hard",
      "difficultyNotes": "The mileage is moderate, but the Acorn broken-dam finish, upstream dam discipline, riffles, private banks, and proxy gauge push this into an advanced planning category.",
      "confidenceNotes": "Confidence is moderate-good: the Cedar River Paddling Trips guide publishes the exact Otranto-to-Acorn mileage, endpoint coordinates, dam and broken-dam cautions, and the 200 cfs floor / 400-600 cfs better range for the Otranto-to-Janesville route family. USGS 05457700 returned current Charles City data during this run; USGS 05457505 at Osage returned stale 2017 data and is documented as not selected."
    },
    "evidenceNotes": [
      {
        "label": "Official route and mileage",
        "value": "Otranto Park to Acorn Park, 6.6 mi",
        "note": "The Cedar River Paddling Trips guide lists Otranto Park below the dam to Acorn Park as 6.6 miles and publishes coordinates for both access sites.",
        "sourceUrl": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf"
      },
      {
        "label": "Threshold floor",
        "value": "200 cfs minimum; 400-600 cfs better",
        "note": "The guide says 200 cfs is preferable for adequate water levels and 400 to 600 cfs is a better range for the Otranto-to-Janesville Cedar River trip family.",
        "sourceUrl": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf"
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05457700 at 1,270 cfs / 3.86 ft",
        "note": "USGS Water Services returned current Cedar River at Charles City data at 2026-07-23 16:30 CDT during this run; the Osage gauge returned stale 2017 values and was not selected.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05457700&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Broken-dam caution",
        "value": "Acorn Park Dam",
        "note": "The guide says experienced paddlers may be able to run the broken dam after scouting, but warns it is fast water with little margin for error and exposed old metal at low water.",
        "sourceUrl": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "Cedar River Paddling Trips guide",
        "url": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf",
        "provider": "local"
      },
      {
        "label": "Mitchell County Cedar River Water Trail",
        "url": "https://mitchellcountyconservation.com/cedar-river-water-trail/",
        "provider": "local"
      },
      {
        "label": "Iowa DNR Cedar River Water Trail dedication",
        "url": "https://www.iowadnr.gov/event/2023-06-27/cedar-river-water-trail-mitchell-county-dedicated-june-29",
        "provider": "local"
      },
      {
        "label": "USGS 05457700 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05457700/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "cedar-river-acorn-halvorson",
    "slug": "cedar-river-acorn-halvorson",
    "name": "Cedar River",
    "reach": "Acorn Park to Halvorson Park",
    "state": "Iowa",
    "region": "North Central Iowa",
    "summary": "Short St. Ansgar-area Cedar River connector from Acorn Park to Halvorson Park, ending above the St. Ansgar dam with official guide coordinates, camping support, and conservative gauge caveats.",
    "statusText": "Use the Cedar River at Charles City gauge as a downstream corridor signal. The guide gives a 200 cfs adequate-water floor and a 400 to 600 cfs better band; take out and portage on river right above the St. Ansgar dam.",
    "latitude": 43.388574,
    "longitude": -92.938811,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "low_head_dam",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "Identify the St. Ansgar dam portage before launching. The guide says the best carry is on river right about 50 yards above the dam.",
        "Use the Charles City gauge as a corridor screen only and make a visual call at Acorn because the stale Osage gauge is not a product-ready live source.",
        "Do not continue below Halvorson unless the dam portage and downstream Interstate/Bennett plan are staged."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05457700",
      "provider": "usgs",
      "siteId": "05457700",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Cedar River at Charles City, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05457700/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 200,
      "tooLow": 200,
      "thresholdSource": {
        "label": "Cedar River Paddling Trips Otranto-to-Janesville guide",
        "url": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
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
      "seasonNotes": "This short leg is most useful in normal spring-through-fall flows. Low water can scrape through riffles, while higher water shortens the approach time to the St. Ansgar dam take-out.",
      "difficulty": "moderate",
      "difficultyNotes": "The reach is short, but the dam-adjacent finish, private banks, and proxy gauge require more discipline than a casual float.",
      "confidenceNotes": "Confidence is moderate-good: the Cedar River Paddling Trips guide publishes the Acorn-to-Halvorson mileage, endpoint coordinates, Halvorson camping/ramp context, the St. Ansgar dam portage, and the route-family 200 cfs floor. USGS 05457700 was current during this run and is selected as the live downstream route-family gauge."
    },
    "evidenceNotes": [
      {
        "label": "Official route and mileage",
        "value": "Acorn Park to Halvorson Park, 2.8 mi",
        "note": "The guide lists Acorn Park to Halvorson Park as 2.8 miles and publishes coordinates for both access sites.",
        "sourceUrl": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf"
      },
      {
        "label": "Dam portage",
        "value": "St. Ansgar dam, river-right carry",
        "note": "The guide says it is necessary to carry around the St. Ansgar dam and identifies the best portage on river right about 50 yards above the dam.",
        "sourceUrl": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf"
      },
      {
        "label": "Camping and ramp",
        "value": "Halvorson County Park",
        "note": "The guide says Halvorson County Park has camping, a boat ramp, and swimming facilities.",
        "sourceUrl": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf"
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05457700 at 1,270 cfs / 3.86 ft",
        "note": "USGS Water Services returned current Cedar River at Charles City data at 2026-07-23 16:30 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05457700&parameterCd=00060,00065&siteStatus=all"
      }
    ],
    "sourceLinks": [
      {
        "label": "Cedar River Paddling Trips guide",
        "url": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf",
        "provider": "local"
      },
      {
        "label": "Mitchell County Cedar River Water Trail",
        "url": "https://mitchellcountyconservation.com/cedar-river-water-trail/",
        "provider": "local"
      },
      {
        "label": "USGS 05457700 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05457700/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "cedar-river-halvorson-interstate",
    "slug": "cedar-river-halvorson-interstate",
    "name": "Cedar River",
    "reach": "Halvorson Park to Interstate Park / Mitchell",
    "state": "Iowa",
    "region": "North Central Iowa",
    "summary": "Mitchell County Cedar River leg from Halvorson Park to Interstate Park at Mitchell, with impounded-river character, endpoint camping support, and a mandatory left-bank dam portage at Mitchell.",
    "statusText": "Use the Cedar River at Charles City gauge as the downstream route-family signal. The guide says 200 cfs is preferable and 400 to 600 cfs is better; stop at Interstate Park and portage left around the Mitchell power dam.",
    "latitude": 43.356685,
    "longitude": -92.925215,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "dam",
        "low_head_dam",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "Interstate Park is the route boundary above the Mitchell power dam. The guide describes a left-bank portage that starts near the powerhouse and ends above the Mitchell Bridge.",
        "The reach has more impounded, lake-like character above Mitchell; wind and dam proximity matter even when the flow number looks benign.",
        "Use public park areas for landing and camping. Banks outside public accesses should be treated as private unless clearly posted otherwise."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05457700",
      "provider": "usgs",
      "siteId": "05457700",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Cedar River at Charles City, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05457700/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 200,
      "tooLow": 200,
      "thresholdSource": {
        "label": "Cedar River Paddling Trips Otranto-to-Janesville guide",
        "url": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
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
      "seasonNotes": "Normal spring-through-fall flows are the best fit. Low water can expose approach shallows, while high or rising water increases dam-approach consequence and shoreline debris.",
      "difficulty": "moderate",
      "difficultyNotes": "This is a short-to-moderate water-trail leg, but the Mitchell dam boundary, lake-like wind exposure, private-bank limits, and proxy gauge keep it at caution level.",
      "confidenceNotes": "Confidence is moderate-good: the Cedar River Paddling Trips guide publishes Halvorson-to-Interstate mileage, coordinates, endpoint camping/picnic context, impoundment character, and Mitchell dam portage detail. USGS 05457700 is live and current for the broader route family; the stale Osage gauge is intentionally not used."
    },
    "evidenceNotes": [
      {
        "label": "Official route and mileage",
        "value": "Halvorson Park to Interstate Park, 4.7 mi",
        "note": "The guide lists Halvorson Park to Interstate Park at Mitchell as 4.7 miles and publishes endpoint coordinates.",
        "sourceUrl": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf"
      },
      {
        "label": "Mitchell dam portage",
        "value": "Left-bank portage about 100 yards",
        "note": "The guide says the Interstate Power dam at Mitchell impounds this section and the portage around the dam is about 100 yards on the left bank.",
        "sourceUrl": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf"
      },
      {
        "label": "Endpoint camping",
        "value": "Halvorson and Interstate park context",
        "note": "The guide says Halvorson County Park has camping and that Interstate Park is a county conservation area with camping and picnic tables.",
        "sourceUrl": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf"
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05457700 at 1,270 cfs / 3.86 ft",
        "note": "USGS Water Services returned current Cedar River at Charles City data at 2026-07-23 16:30 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05457700&parameterCd=00060,00065&siteStatus=all"
      }
    ],
    "sourceLinks": [
      {
        "label": "Cedar River Paddling Trips guide",
        "url": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf",
        "provider": "local"
      },
      {
        "label": "Mitchell County Cedar River Water Trail",
        "url": "https://mitchellcountyconservation.com/cedar-river-water-trail/",
        "provider": "local"
      },
      {
        "label": "USGS 05457700 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05457700/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "cedar-river-interstate-bennett",
    "slug": "cedar-river-interstate-bennett",
    "name": "Cedar River",
    "reach": "Interstate Park / Mitchell to Bennett Access",
    "state": "Iowa",
    "region": "North Central Iowa",
    "summary": "Short Mitchell County Cedar River connector below the Mitchell power-dam portage, finishing at Bennett Access before the Iron Springs riffles and Falk Wildlife Area corridor.",
    "statusText": "Use the Cedar River at Charles City gauge as the downstream route-family signal. The guide says 200 cfs is preferable and 400 to 600 cfs is better; launch only below the Mitchell dam after confirming the portage/relaunch area.",
    "latitude": 43.319134,
    "longitude": -92.879648,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "dam",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "Start only after the Mitchell dam portage/relaunch. Do not treat this card as permission to run the dam or launch in restricted water.",
        "The Charles City gauge is a downstream route-family proxy. Make a same-day visual check below Mitchell because depth, debris, and current can vary on this short upper leg.",
        "Keep routine landings to Interstate Park, Bennett Access, or other clearly public areas; banks outside public accesses may be private."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05457700",
      "provider": "usgs",
      "siteId": "05457700",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Cedar River at Charles City, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05457700/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 200,
      "tooLow": 200,
      "thresholdSource": {
        "label": "Cedar River Paddling Trips Otranto-to-Janesville guide",
        "url": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
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
      "seasonNotes": "Normal spring-through-fall flows are the best fit. Low water can expose shallow riffles; higher or rising water reduces decision time below the dam and around wood.",
      "difficulty": "easy",
      "difficultyNotes": "Mileage is short and the reach is not technical, but the below-dam start, private-bank limits, and proxy gauge justify a caution profile.",
      "confidenceNotes": "Confidence is moderate-good: the Cedar River Paddling Trips guide publishes the Interstate-to-Bennett one-mile access pair, coordinates for both endpoints, Mitchell dam portage context, Bennett address, and the route-family 200 cfs floor. USGS 05457700 returned current data during this run; the Osage gauge remains rejected as stale."
    },
    "evidenceNotes": [
      {
        "label": "Official route and mileage",
        "value": "Interstate Park to Bennett Access, 1 mi",
        "note": "The Cedar River Paddling Trips guide lists Interstate Park to Bennett Access as a one-mile Mitchell County Cedar River section and publishes coordinates for both endpoints.",
        "sourceUrl": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf"
      },
      {
        "label": "Put-in discipline",
        "value": "Below Mitchell dam portage",
        "note": "The same guide places Interstate Park at the Mitchell dam and describes the left-bank portage around the powerhouse area; this route begins only after that dam boundary is handled from land.",
        "sourceUrl": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf"
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05457700 at 1,260 cfs / 3.85 ft",
        "note": "USGS Water Services returned current Cedar River at Charles City data at 2026-07-23 17:30 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05457700&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Water-trail context",
        "value": "Mitchell County Cedar River Water Trail",
        "note": "Mitchell County describes this Cedar River water trail as about 30 miles with calm stretches and quicker current through the county.",
        "sourceUrl": "https://mitchellcountyconservation.com/cedar-river-water-trail/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Cedar River Paddling Trips guide",
        "url": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf",
        "provider": "local"
      },
      {
        "label": "Mitchell County Cedar River Water Trail",
        "url": "https://mitchellcountyconservation.com/cedar-river-water-trail/",
        "provider": "local"
      },
      {
        "label": "USGS 05457700 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05457700/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "cedar-river-bennett-highway-9",
    "slug": "cedar-river-bennett-highway-9",
    "name": "Cedar River",
    "reach": "Bennett Access to Highway 9 Bridge",
    "state": "Iowa",
    "region": "North Central Iowa",
    "summary": "Upper Cedar River riffle run from Bennett Access to the Highway 9 Bridge west of Osage, passing Iron Springs, Falk Wildlife Area, timbered bluffs, and frequent shallow riffles.",
    "statusText": "Use the Cedar River at Charles City gauge as the downstream route-family signal. The guide says 200 cfs is preferable and 400 to 600 cfs is better; expect more scraping below the floor and more push around riffles when rising.",
    "latitude": 43.30228,
    "longitude": -92.871666,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "The guide says this short Bennett-to-Highway-9 section has a lot of riffles. Low water can mean scraping or short carries.",
        "Highway 9 is the planned take-out. Confirm parking and the bridge access from land because the route is short and missing it compresses the Osage Spring plan.",
        "Watch for wood, bridge debris, fast rises after rain, and private banks along the upper Cedar corridor."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05457700",
      "provider": "usgs",
      "siteId": "05457700",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Cedar River at Charles City, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05457700/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 200,
      "tooLow": 200,
      "thresholdSource": {
        "label": "Cedar River Paddling Trips Otranto-to-Janesville guide",
        "url": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
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
      "seasonNotes": "Spring and early-summer water are usually more forgiving. Late-summer lows can make the riffles scrape-prone, while storm runoff can make the short wooded reach pushy.",
      "difficulty": "moderate",
      "difficultyNotes": "The distance is short, but frequent riffles, bluff bends, private banks, and proxy-gauge limits require active moving-water judgment.",
      "confidenceNotes": "Confidence is moderate-good: the Cedar River Paddling Trips guide publishes Bennett-to-Highway-9 mileage, endpoint coordinates, Bennett address, Iron Springs/Falk Wildlife Area context, riffle notes, and the route-family 200 cfs floor. USGS 05457700 returned current downstream route-family data during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official route and mileage",
        "value": "Bennett Access to Highway 9 Bridge, 2.7 mi",
        "note": "The guide lists Bennett Access to Highway 9 Bridge as 2.7 miles and publishes coordinates for both access points.",
        "sourceUrl": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf"
      },
      {
        "label": "Route character",
        "value": "Iron Springs, Falk Wildlife Area, and riffles",
        "note": "The guide says Iron Springs is about a mile below Bennett on river left, Falk Wildlife Area rises on river right, and the river has a lot of riffles until Highway 9.",
        "sourceUrl": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf"
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05457700 at 1,260 cfs / 3.85 ft",
        "note": "USGS Water Services returned current Cedar River at Charles City data at 2026-07-23 17:30 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05457700&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Access corroboration",
        "value": "Bennett and Highway 9 named by guide and water-trail context",
        "note": "The Cedar River guide identifies Bennett Access by address and Highway 9 Bridge west of Osage as official access-pair anchors inside the Mitchell County Cedar River water-trail corridor.",
        "sourceUrl": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "Cedar River Paddling Trips guide",
        "url": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf",
        "provider": "local"
      },
      {
        "label": "Mitchell County Cedar River Water Trail",
        "url": "https://mitchellcountyconservation.com/cedar-river-water-trail/",
        "provider": "local"
      },
      {
        "label": "USGS 05457700 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05457700/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "cedar-river-highway-9-osage-spring",
    "slug": "cedar-river-highway-9-osage-spring",
    "name": "Cedar River",
    "reach": "Highway 9 Bridge to Osage Spring Park",
    "state": "Iowa",
    "region": "North Central Iowa",
    "summary": "Short Osage-area Cedar River water-trail leg from the Highway 9 Bridge to Osage Spring Park, with limestone outcrops and a fish-riffle crossing just before the take-out.",
    "statusText": "Use the Cedar River at Charles City gauge as the downstream route-family signal. The guide says 200 cfs is preferable and 400 to 600 cfs is better; approach the Osage Spring Park fish riffle on the extreme right as described by the guide.",
    "latitude": 43.28395372212963,
    "longitude": -92.85249710083008,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "The guide identifies a fish riffle across the river just before Osage Spring Park and says it can be crossed at the extreme right bank.",
        "Scout or walk the riffle if the line is unclear, especially at low water or with beginners. Do not assume the Charles City gauge captures every shallow spot upstream of Osage.",
        "Confirm the Osage Spring Park take-out before launching and avoid informal landings on private banks."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05457700",
      "provider": "usgs",
      "siteId": "05457700",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Cedar River at Charles City, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05457700/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 200,
      "tooLow": 200,
      "thresholdSource": {
        "label": "Cedar River Paddling Trips Otranto-to-Janesville guide",
        "url": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
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
      "seasonNotes": "This short reach is most practical when the upper Cedar has enough water over riffles. Dry spells can expose the fish riffle; storms can add wood and faster current.",
      "difficulty": "moderate",
      "difficultyNotes": "The mileage is easy, but the named fish riffle, shallow-rock exposure, private banks, and proxy gauge make it more than a casual tube float.",
      "confidenceNotes": "Confidence is moderate-good: the Cedar River Paddling Trips guide publishes Highway-9-to-Osage-Spring mileage, endpoint coordinates, Osage Spring Park address, limestone-outcrop and fish-riffle notes, and the route-family 200 cfs floor. USGS 05457700 returned current data during this run and is used as a downstream same-guide-corridor proxy."
    },
    "evidenceNotes": [
      {
        "label": "Official route and mileage",
        "value": "Highway 9 Bridge to Osage Spring Park, 1.9 mi",
        "note": "The Cedar River Paddling Trips guide lists Highway 9 Bridge to Osage Spring Park as 1.9 miles and publishes coordinates for both access points.",
        "sourceUrl": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf"
      },
      {
        "label": "Fish-riffle hazard",
        "value": "Cross at extreme right bank",
        "note": "The guide says a fish riffle crosses the river just before the Osage Spring Park take-out and can be crossed at the extreme right bank.",
        "sourceUrl": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf"
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05457700 at 1,260 cfs / 3.85 ft",
        "note": "USGS Water Services returned current Cedar River at Charles City data at 2026-07-23 17:30 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05457700&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Access and park context",
        "value": "Osage Spring Park, 3540 Spring Park Rd",
        "note": "The guide names Osage Spring Park as the downstream access and publishes its address and coordinates.",
        "sourceUrl": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "Cedar River Paddling Trips guide",
        "url": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf",
        "provider": "local"
      },
      {
        "label": "Mitchell County Cedar River Water Trail",
        "url": "https://mitchellcountyconservation.com/cedar-river-water-trail/",
        "provider": "local"
      },
      {
        "label": "USGS 05457700 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05457700/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "cedar-river-osage-spring-road-t38",
    "slug": "cedar-river-osage-spring-road-t38",
    "name": "Cedar River",
    "reach": "Osage Spring Park to Road T38 Access",
    "state": "Iowa",
    "region": "North Central Iowa",
    "summary": "Osage-area upper Cedar connector from Osage Spring Park to Road T38, with frequent shallow riffles, a low pontoon footbridge sweeper hazard, and a downstream Charles City gauge floor.",
    "statusText": "Use the Cedar River at Charles City gauge as the downstream route-family signal. The guide says 200 cfs is preferable and 400 to 600 cfs is better; scout the low Sunny Brae pontoon footbridge and carry if needed.",
    "latitude": 43.275409,
    "longitude": -92.849622,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "The guide warns that a low pontoon footbridge at Sunny Brae Country Club can require a short carry and is a sweeper hazard.",
        "The route starts with shallow rock riffles. Low water can mean scraping or walking, while rising water reduces time to deal with wood and the footbridge.",
        "Stop at Road T38 unless the downstream Idlewild shuttle is also staged; do not rely on private banks or golf-course property for routine exits."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05457700",
      "provider": "usgs",
      "siteId": "05457700",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Cedar River at Charles City, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05457700/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 200,
      "tooLow": 200,
      "thresholdSource": {
        "label": "Cedar River Paddling Trips Otranto-to-Janesville guide",
        "url": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf",
        "provider": "local"
      },
      "thresholdSourceStrength": "mixed",
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
      "seasonNotes": "Spring through fall is the normal window. The guide's 400 to 600 cfs better range is documented, but this card stays minimum-only because no source publishes a high cutoff for the footbridge reach.",
      "difficulty": "moderate",
      "difficultyNotes": "Mileage is short, but shallow rock, the low pontoon footbridge, private-bank limits, and proxy-gauge limitations make this a caution route.",
      "confidenceNotes": "Confidence is moderate-good: the Cedar River Paddling Trips guide publishes the Osage-Spring-to-Road-T38 mileage, endpoint coordinates, shallow-riffle description, low-pontoon-footbridge hazard, and route-family 200 cfs floor. USGS 05457700 returned current downstream same-guide-corridor data during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official route and mileage",
        "value": "Osage Spring Park to Road T38 Access, 2.9 mi",
        "note": "The Cedar River Paddling Trips guide lists Osage Spring Park to Road T38 Access as 2.9 miles and publishes coordinates for both endpoints.",
        "sourceUrl": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf"
      },
      {
        "label": "Footbridge hazard",
        "value": "Low pontoon footbridge at Sunny Brae",
        "note": "The guide says the low pontoon footbridge may require a short carry depending on level and explicitly calls it a sweeper hazard.",
        "sourceUrl": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf"
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05457700 1,270 cfs / 3.87 ft",
        "note": "USGS Water Services returned current Cedar River at Charles City data at 2026-07-23 19:30 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05457700&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Water-trail context",
        "value": "Mitchell County Cedar River Water Trail",
        "note": "Mitchell County identifies Road T38/255 as a Cedar River Water Trail access point south of Osage.",
        "sourceUrl": "https://mitchellcountyconservation.com/t-38-access/"
      }
    ],
    "sourceLinks": [
      {
        "label": "Cedar River Paddling Trips guide",
        "url": "https://media.rainpos.com/8576/cdo_otranto_janesville_ccccv2.pdf",
        "provider": "local"
      },
      {
        "label": "Mitchell County T-38 Access",
        "url": "https://mitchellcountyconservation.com/t-38-access/",
        "provider": "local"
      },
      {
        "label": "USGS 05457700 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05457700/",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "upper-iowa-river-iverson-bridge-kumpf",
    "slug": "upper-iowa-river-iverson-bridge-kumpf",
    "name": "Upper Iowa River",
    "reach": "Iverson Bridge Access to Kumpf Access",
    "state": "Iowa",
    "region": "Northeast Iowa",
    "summary": "Lower Upper Iowa continuation from Iverson Bridge to Kumpf Access, using the direct Dorchester gauge, source-backed access coordinates, and riffle/bluff corridor guidance.",
    "statusText": "Use the Upper Iowa near Dorchester gauge. Miles Paddled recommends 300 to 350 cfs for a smooth Iverson-to-Kumpf ride; the route can scrape below that and becomes pushier around wood as the gauge rises.",
    "latitude": 43.41256,
    "longitude": -91.5769,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks",
        "cold_water",
        "remote"
      ],
      "safetyNotes": [
        "The Dorchester gauge is direct and downstream in the same lower-Upper-Iowa corridor, but same-day wood and shallow riffles still decide the trip.",
        "Kumpf is the planned take-out above the final lower-river corridor. Scout the landing and do not assume private banks or bridge shoulders are acceptable backups.",
        "The Upper Iowa is scenic but private-bank-sensitive. Use guide-listed accesses and public areas only unless you have permission."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-05388250",
      "provider": "usgs",
      "siteId": "05388250",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Upper Iowa River near Dorchester, IA",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-05388250/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "idealMin": 300,
      "tooLow": 300,
      "thresholdSource": {
        "label": "Miles Paddled Upper Iowa River VIII Dorchester-gauge recommendation",
        "url": "https://milespaddled.com/upper-iowa-river-viii/",
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
      "seasonNotes": "Spring through fall is the practical season. Low water can scrape in riffles; rain can improve depth but add wood and faster current on tight bends.",
      "difficulty": "easy",
      "difficultyNotes": "Miles Paddled rates the reach beginner / Class I, but distance, rural exposure, riffles, private banks, and cold-water springs justify caution.",
      "confidenceNotes": "Confidence is moderate-good: Miles Paddled documents Iverson Bridge Road Access to Kumpf Access with GPS coordinates and a Dorchester-gauge recommendation of roughly 300-350 cfs, while the Upper Iowa Paddler's Guide names Iverson Bridge and Kumpf in the lower access chain. The app uses minimum-only at 300 cfs because the source does not publish a defended high cutoff."
    },
    "evidenceNotes": [
      {
        "label": "Route and coordinates",
        "value": "Iverson Bridge to Kumpf Access",
        "note": "Miles Paddled Upper Iowa VIII identifies Iverson Bridge Road Access as the put-in and Kumpf Access as the take-out, with GPS coordinates.",
        "sourceUrl": "https://milespaddled.com/upper-iowa-river-viii/"
      },
      {
        "label": "Threshold guidance",
        "value": "300-350 cfs for a smooth ride",
        "note": "Miles Paddled says roughly 300 to 350 cfs at the Dorchester gauge is the preferred smooth-water target for this reach.",
        "sourceUrl": "https://milespaddled.com/upper-iowa-river-viii/"
      },
      {
        "label": "Current gauge check",
        "value": "USGS 05388250 1,140 cfs / 8.25 ft",
        "note": "USGS Water Services returned current Upper Iowa River near Dorchester data at 2026-07-23 19:00 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=05388250&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Official access-chain context",
        "value": "Iverson Bridge and Kumpf named in Upper Iowa guide",
        "note": "The Upper Iowa River Paddler's Guide lists Iverson Bridge Access and Kumpf Access in the lower-river landmark/access chain.",
        "sourceUrl": "https://northeastiowarcd.org/wp-content/uploads/2016/12/Upper-Iowa-River-Paddlers-Guide-Web.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "Miles Paddled Upper Iowa River VIII",
        "url": "https://milespaddled.com/upper-iowa-river-viii/",
        "provider": "local"
      },
      {
        "label": "Upper Iowa River Paddler's Guide",
        "url": "https://northeastiowarcd.org/wp-content/uploads/2016/12/Upper-Iowa-River-Paddlers-Guide-Web.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 05388250 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-05388250/",
        "provider": "usgs"
      }
    ]
  }
];
