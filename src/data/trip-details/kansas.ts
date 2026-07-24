// State-scoped route data. Keep entries in route-family and downstream order.
import type { RiverTripDetails } from '../../lib/types';

export const kansasRiverTripDetails: Record<string, RiverTripDetails> = {
  "kansas-river-lecompton-lawrence-riverfront": {
    "putIn": {
      "name": "Lecompton / Rising Sun Access Ramp",
      "latitude": 39.05057,
      "longitude": -95.38764
    },
    "takeOut": {
      "name": "Lawrence Riverfront Park Access Ramp",
      "latitude": 38.97474,
      "longitude": -95.23522
    },
    "logistics": {
      "distanceLabel": "About 10.2 mi",
      "estimatedPaddleTime": "About 3.5 hr to 5 hr, longer with low water, wind, or sandbar stops",
      "shuttle": "Stage the take-out at Lawrence Riverfront Park above Bowersock Dam, then drive back to the Lecompton / Rising Sun access. Inspect Lawrence first because this is the required exit before the dam; do not assume you can continue downstream through Lawrence.",
      "permits": "No special paddling permit is known for private boats on the Kansas River. Use public ramps, follow posted city and county access rules, check Kansas boating/PFD requirements, and respect fishing-license rules if fishing.",
      "camping": "Treat this as a day trip. Sandbars can be legal public river stops under current Kansas Riverkeeper guidance, but banks above the river are private; do not camp, picnic, or portage onto adjacent private land without permission.",
      "summary": "Launch at Lecompton / Rising Sun and take out at Lawrence Riverfront Park above Bowersock Dam for a 10.2-mile lower-Kaw day. The app uses the downstream De Soto USGS gauge as a proxy because the Lecompton route-corridor station did not have current visible instantaneous data during review.",
      "accessCaveats": [
        "Lawrence Riverfront Park is above Bowersock Dam. Take out here before the dam unless your group has a separate expert plan with current local guide support.",
        "Friends of the Kaw says only highly skilled paddlers with Kaw River Guides should consider continuing through the Bowersock chute; this route does not include that chute or the downstream 8th Street access.",
        "Lecompton / Rising Sun has a dirt or gravel parking area, no restrooms or lighting, and a ramp that can collect mud after rain or during summer low-water periods.",
        "The De Soto gauge is downstream of this reach and downstream of Lawrence. Treat it as a broad lower-Kaw proxy and make a same-day visual call at Lecompton before committing.",
        "All access and parking are subject to same-day city, county, and ramp conditions. Mud, silt, events, high-water cleanup, and shifted sand can change ramp usability."
      ],
      "watchFor": [
        "Low flows below about 1,000 cfs can make the channel narrow and sandbar navigation slow or technical.",
        "Flows above 5,000 cfs are outside the novice band, and above 8,000 cfs Friends of the Kaw says sandbar rest stops become scarce.",
        "Wind across open bends, storms, rising water, floating wood, strainers, bank hooks and fishing lines, and changing sandbars.",
        "The Lawrence take-out is mandatory for this route. Do not drift past Riverfront Park toward Bowersock Dam.",
        "Private banks along the Kaw; stay with public ramps and legal sandbar stops rather than climbing banks or using private land."
      ]
    }
  },
  "kansas-river-junction-city-ogden": {
    "putIn": {
      "name": "Junction City Access Ramp / Grant Park",
      "latitude": 39.06029,
      "longitude": -96.80341
    },
    "takeOut": {
      "name": "Ogden Access Ramp",
      "latitude": 39.10503,
      "longitude": -96.69633
    },
    "logistics": {
      "distanceLabel": "A little over 9 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr, longer with low water, wind, or confluence scouting",
      "shuttle": "Stage the take-out at Ogden, then drive back to Grant Park in Junction City. Inspect both ramps before launching because the Junction City ramp is on the Republican River and the Ogden ramp can be affected by sand, mud, high-water cleanup, or local parking conditions.",
      "permits": "No special paddling permit is known for private boats on the Kansas River. Use public ramps, follow posted city and county access rules, check Kansas boating/PFD requirements, and respect fishing-license rules if fishing.",
      "camping": "Treat this as a day trip. Sandbars can be legal public river stops under current Kansas Riverkeeper guidance, but banks above the river are private; do not camp, picnic, or portage onto adjacent private land without permission.",
      "summary": "Launch at the Junction City ramp on the Republican River, paddle about one-third mile to the Smoky Hill confluence where the Kansas River begins, and take out at Ogden. The Wamego USGS gauge is downstream of the route, so use it as a broad upper-Kaw proxy and make a same-day visual call at the launch.",
      "accessCaveats": [
        "The Junction City ramp is in Grant Park on the Republican River, not directly on the Kansas River. The Kansas River begins about one-third mile downstream where the Republican and Smoky Hill rivers meet.",
        "Friends of the Kaw warns of unusual currents where the clearer Republican outflow meets the sediment-loaded Smoky Hill; identify the confluence line before relaxing into the downstream Kaw channel.",
        "The Junction City ramp has no restroom or lighting, though overnight parking is allowed; do not assume nearby services at the launch.",
        "Ogden has a wide concrete river-left ramp, trailer-capable gravel parking, restrooms, a picnic shelter, trash can, and an informational kiosk, but same-day mud, sand, local parking, and high-water cleanup still control."
      ],
      "watchFor": [
        "Low flows below about 1,000 cfs can make the channel narrow and sandbar navigation slow or technical, especially near the upper-river confluence.",
        "Flows above 5,000 cfs are outside the novice band, and above 8,000 cfs Friends of the Kaw says sandbar rest stops become scarce.",
        "Wind across open bends, storms, rising water, floating wood, strainers, bank hooks and fishing lines, and changing sandbars.",
        "Private banks along the Republican, Smoky Hill, and Kaw; stay with public ramps and legal sandbar stops rather than climbing banks or using private land.",
        "The Wamego gauge is downstream of this reach. Treat it as a broad same-river proxy and make a same-day visual call at Junction City before committing."
      ]
    }
  },
  "kansas-river-lawrence-8th-eudora": {
    "putIn": {
      "name": "Lawrence Riverfront Park East / 8th Street Access Ramp",
      "latitude": 38.972,
      "longitude": -95.21639
    },
    "takeOut": {
      "name": "Eudora Access Ramp",
      "latitude": 38.94999,
      "longitude": -95.09963
    },
    "logistics": {
      "distanceLabel": "About 9 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr, longer with low water, wind, stops, or the Wakarusa turn",
      "shuttle": "Stage the take-out at the Eudora Public Works / Main Street ramp, then drive back to the Lawrence 8th Street access. Inspect the Eudora take-out first because it requires an upstream paddle on the Wakarusa River from the Kansas River confluence.",
      "permits": "No special paddling permit is known for private boats on the Kansas River. Use public ramps, follow posted city and county access rules, check Kansas boating/PFD requirements, and respect fishing-license rules if fishing.",
      "camping": "Treat this as a day trip. Sandbars can be legal public river stops under current Kansas Riverkeeper guidance, but banks above the river are private; do not camp, picnic, or portage onto adjacent private land without permission.",
      "summary": "Launch below the Lawrence dam complex at the Riverfront Park East / 8th Street ramp and take out at Eudora. This is a public Kansas River Water Trail segment with a downstream De Soto gauge proxy and special attention needed for Wakarusa releases at the take-out.",
      "accessCaveats": [
        "The 8th Street ramp is below Bowersock Dam; do not start from the upstream Lawrence Riverfront Park ramp unless you have a separate dam-portage plan.",
        "The Eudora ramp is on the Wakarusa River. From the Kansas River, turn hard right upstream into the Wakarusa and paddle about three-quarters of a mile to the ramp.",
        "Friends of the Kaw warns that Clinton Reservoir releases into the Wakarusa at 250 cfs and above can make the Eudora upstream take-out paddle difficult to impossible.",
        "All access and parking are subject to same-day city, county, and ramp conditions. Mud, silt, event closures, and shifted sand can change ramp usability."
      ],
      "watchFor": [
        "Low flows below about 1,000 cfs can make the channel narrow and sandbar navigation slow or technical.",
        "Flows above 5,000 cfs are outside the novice band, and above 8,000 cfs Friends of the Kaw says sandbar rest stops become scarce.",
        "Wind across open bends, storms, rising water, floating wood, strainers, bank hooks and fishing lines, and changing sandbars.",
        "Private banks along the Kaw and Wakarusa; stay with public ramps and legal sandbar stops rather than climbing banks or using private land."
      ]
    }
  },
  "kansas-river-eudora-de-soto": {
    "putIn": {
      "name": "Eudora Access Ramp",
      "latitude": 38.94999,
      "longitude": -95.09963
    },
    "takeOut": {
      "name": "De Soto Access Ramp / Riverfest Park",
      "latitude": 38.98496,
      "longitude": -94.9746
    },
    "logistics": {
      "distanceLabel": "About 10.7 mi",
      "estimatedPaddleTime": "About 3.5 hr to 5 hr, longer with low water, wind, or sandbar stops",
      "shuttle": "Stage the take-out at De Soto Riverfest Park, then drive back to the Eudora ramp at the Public Works / Main Street access. Inspect De Soto first because Friends of the Kaw notes city-event closures and a recurring sandbar at the toe of the ramp.",
      "permits": "No special paddling permit is known for private boats on the Kansas River. Use public ramps, follow posted city and county access rules, check Kansas boating/PFD requirements, and respect fishing-license rules if fishing.",
      "camping": "Treat this as a day trip. Sandbars can be legal public river stops under current Kansas Riverkeeper guidance, but banks above the river are private; do not camp, picnic, or portage onto adjacent private land without permission.",
      "summary": "Launch from the Eudora ramp on the Wakarusa River, paddle downstream to the Kansas River, and take out at De Soto. The De Soto USGS gauge is in the take-out corridor, and both endpoints are Friends of the Kaw public access ramps.",
      "accessCaveats": [
        "The Eudora ramp is on the Wakarusa River about three-quarters of a mile upstream from the Kansas River. This route launches there and paddles downstream to the Kaw rather than requiring the harder upstream take-out turn.",
        "Check Clinton Reservoir releases before launching because Wakarusa current, debris, and confluence conditions can still affect the first part of the trip.",
        "Friends of the Kaw notes that the De Soto ramp can close for city events and that a sandbar regularly forms at the toe of the ramp, sometimes requiring portage or a different landing angle.",
        "All access and parking are subject to same-day city, county, and ramp conditions. Mud, silt, event closures, and shifted sand can change ramp usability."
      ],
      "watchFor": [
        "Low flows below about 1,000 cfs can make the channel narrow and sandbar navigation slow or technical.",
        "Flows above 5,000 cfs are outside the novice band, and above 8,000 cfs Friends of the Kaw says sandbar rest stops become scarce.",
        "Wind across open bends, storms, rising water, floating wood, strainers, bank hooks and fishing lines, and changing sandbars.",
        "Private banks along the Wakarusa and Kaw; stay with public ramps and legal sandbar stops rather than climbing banks or using private land."
      ]
    }
  },
  "kansas-river-eudora-turner-bridge": {
    "putIn": {
      "name": "Eudora Access Ramp",
      "latitude": 38.94999,
      "longitude": -95.09963
    },
    "takeOut": {
      "name": "Turner Bridge Access Ramp",
      "latitude": 39.09396,
      "longitude": -94.71176
    },
    "logistics": {
      "distanceLabel": "About 32.8 mi",
      "estimatedPaddleTime": "Best planned as a very long day; roughly 10 hr to 13 hr including the WaterOne portage, wind delays, and lower-river logistics",
      "shuttle": "Stage the take-out at Turner Bridge first, then drive back to Eudora. Inspect De Soto, Edwardsville, and the WaterOne portage plan before launching because they are the only clean public contingency points before the final lower-Kaw finish.",
      "permits": "No special paddling permit is known for private boats on the Kansas River. Use public ramps, follow posted city and county access rules, check Kansas boating/PFD requirements, and respect fishing-license rules if fishing.",
      "camping": "Treat this as a committed through-route, not an overnight corridor. Friends of the Kaw notes the lower controlled reach has almost no sandbars, and the WaterOne portage plus private lower banks make improvised camping a bad assumption.",
      "campingClassification": "none",
      "summary": "Launch from Eudora and take out at Turner Bridge for a full lower-Kaw continuation that includes De Soto, Edwardsville, and the mandatory WaterOne low-head-dam portage. The app uses the De Soto gauge as the cleanest same-river discharge proxy for this longer route.",
      "accessCaveats": [
        "The Eudora ramp is on the Wakarusa River about three-quarters of a mile upstream from the Kansas River. Launch there and expect a short downstream Wakarusa lead-in before the mainstem.",
        "De Soto and Edwardsville are the last simple public access points before and after the WaterOne portage. Inspect that contingency before launch rather than assuming you can improvise on private banks.",
        "The WaterOne portage is a rough 100+ yard carry over large loose rocks. Wheels and carts are not useful, and high water can require an earlier landing on slick mud upstream.",
        "Turner Bridge has no amenities and a small gravel lot that can be muddy or rough after recent high water."
      ],
      "watchFor": [
        "WaterOne low-head dam at river mile 14.8. Land river left well above the structure, avoid the river-right low-water notch, and do not enter the dam hydraulic.",
        "Low flows below about 1,000 cfs can expose mud, slow the lower channel, and make landings or the portage more awkward.",
        "Flows above 5,000 cfs are outside the novice band, and above 8,000 cfs Friends of the Kaw says sandbar rest stops become scarce.",
        "This lower reach has well-defined banks and almost no sandbars, so do not count on easy mid-route stops beyond the named public accesses.",
        "Wind in the open lower valley, storms, rising water, floating wood, strainers, bridge current, bank hooks and fishing lines, and industrial riverfront traffic.",
        "Private banks along the Kaw; stay with public ramps, the documented portage, and legal stops rather than climbing banks or using private land."
      ]
    }
  },
  "kansas-river-junction-city-manhattan": {
    "putIn": {
      "name": "Junction City Access Ramp / Grant Park",
      "latitude": 39.06029,
      "longitude": -96.80341
    },
    "takeOut": {
      "name": "Manhattan K-177 / Fairmont Access Ramp",
      "latitude": 39.17428,
      "longitude": -96.55318
    },
    "logistics": {
      "distanceLabel": "About 23 mi",
      "estimatedPaddleTime": "About 7 hr to 10 hr, longer with low water, wind, sandbar stops, or time spent regrouping at the confluences",
      "shuttle": "Stage the take-out at the Manhattan K-177 / Fairmont ramp first, then drive back to Grant Park in Junction City. Inspect both ramps before launching because this is a long committed day and the Manhattan landing can have a sandbar at the toe.",
      "permits": "No special paddling permit is known for private boats on the Kansas River. Use public ramps, follow posted city and county access rules, check Kansas boating/PFD requirements, and respect fishing-license rules if fishing.",
      "camping": "This route is long enough that conservative overnight use may make more sense than a single push. Friends of the Kaw says you can camp on public sandbars between the high-water marks without a special permit, but private banks above that line are off-limits and sandbars become scarce above about 8,000 cfs.",
      "campingClassification": "sandbar_or_gravel_bar",
      "summary": "Launch at Grant Park in Junction City and take out at the Manhattan K-177 / Fairmont ramp for a long upper-Kaw continuation. The app uses the downstream Wamego gauge as a same-river proxy and expects the current route score to stay conservative when the proxy sits above the broad Kansas comfort band.",
      "accessCaveats": [
        "The Junction City ramp is on the Republican River, not directly on the Kansas River. The Kansas River begins about one-third mile downstream where the Republican and Smoky Hill meet.",
        "The Manhattan K-177 / Fairmont ramp has limited parking and can have a sandbar at the toe, so inspect the landing angle before leaving the shuttle vehicle.",
        "Stay with public ramps and legal sandbar stops between the high-water marks. The banks above the river are private property.",
        "All access and parking are subject to same-day city, county, mud, silt, high-water cleanup, and event conditions."
      ],
      "watchFor": [
        "Unusual currents at the Republican and Smoky Hill confluence near the start.",
        "Low flows below about 1,000 cfs can make the channel narrow and sandbar navigation slow or technical.",
        "Flows above 5,000 cfs are outside the novice band, and above 8,000 cfs Friends of the Kaw says sandbar rest stops become scarce.",
        "Wind across open bends, storms, rising water, floating wood, strainers, and bank hooks or fishing lines left in shoreline trees.",
        "Private banks along the Kaw; do not plan on using them for rest, camping, or bailout access."
      ]
    }
  },
  "kansas-river-junction-city-st-george": {
    "putIn": {
      "name": "Junction City Access Ramp / Grant Park",
      "latitude": 39.06029,
      "longitude": -96.80341
    },
    "takeOut": {
      "name": "St. George / Boggs Landing Access Ramp",
      "latitude": 39.18726,
      "longitude": -96.42202
    },
    "logistics": {
      "distanceLabel": "About 35 mi",
      "estimatedPaddleTime": "Best planned as an overnight or a very long endurance day; roughly 11 hr to 14 hr of moving time before wind, sandbar stops, or channel scouting",
      "shuttle": "Stage the take-out at St. George / Boggs Landing first, then drive back to Grant Park in Junction City. This is too long to treat like a normal day float, so confirm both ramps, weather, and the overnight or emergency plan before launching.",
      "permits": "No special paddling permit is known for private boats on the Kansas River. Use public ramps, follow posted city and county access rules, check Kansas boating/PFD requirements, and respect fishing-license rules if fishing.",
      "camping": "This route is long enough that conservative sandbar camping is the honest plan for most paddlers. Friends of the Kaw says you can camp on public sandbars between the high-water marks without a special permit, but private banks above that line are off-limits and sandbars become scarce above about 8,000 cfs.",
      "campingClassification": "sandbar_or_gravel_bar",
      "summary": "Launch at Grant Park in Junction City and take out at St. George / Boggs Landing for a full upper-Kaw continuation through Ogden and Manhattan. The app uses the downstream Wamego gauge as a same-river proxy and treats this as overnight-capable distance content rather than a casual day route.",
      "accessCaveats": [
        "The Junction City ramp is on the Republican River, not directly on the Kansas River. The Kansas River begins about one-third mile downstream where the Republican and Smoky Hill meet.",
        "The Manhattan K-177 / Fairmont ramp mid-corridor often has a sandbar at the toe, and nearby Blue River current can change when Tuttle Creek releases rise.",
        "Stay with public ramps and legal sandbar stops between the high-water marks. The banks above the river are private property.",
        "All access and parking are subject to same-day city, county, mud, silt, high-water cleanup, and event conditions."
      ],
      "watchFor": [
        "Unusual currents at the Republican and Smoky Hill confluence near the start.",
        "Low flows below about 1,000 cfs can make the channel narrow and sandbar navigation slow or technical.",
        "Flows above 5,000 cfs are outside the novice band, and above 8,000 cfs Friends of the Kaw says sandbar rest stops become scarce.",
        "Wind across open bends, storms, rising water, floating wood, strainers, and bank hooks or fishing lines left in shoreline trees.",
        "Mid-route fatigue and heat on an exposed prairie river where the mileage keeps adding up after Ogden and Manhattan.",
        "Private banks along the Kaw; do not plan on using them for rest, camping, or bailout access."
      ]
    }
  },
  "kansas-river-ogden-manhattan": {
    "putIn": {
      "name": "Ogden Access Ramp",
      "latitude": 39.10503,
      "longitude": -96.69633
    },
    "takeOut": {
      "name": "Manhattan K-177 / Fairmont Access Ramp",
      "latitude": 39.17428,
      "longitude": -96.55318
    },
    "logistics": {
      "distanceLabel": "About 14 mi",
      "estimatedPaddleTime": "About 4.5 hr to 6 hr, longer with low water, wind, stops, or ramp sand",
      "shuttle": "Stage the take-out at the Manhattan K-177 / Fairmont ramp below the K-177 bridge, then drive back to the Ogden ramp. Inspect Manhattan first because Friends of the Kaw notes a sandbar often forms at the toe of the ramp as paddlers approach from the west.",
      "permits": "No special paddling permit is known for private boats on the Kansas River. Use public ramps, follow posted city and county access rules, check Kansas boating/PFD requirements, and respect fishing-license rules if fishing.",
      "camping": "Treat this as a long day trip. Sandbars can be legal public river stops under current Kansas Riverkeeper guidance, but banks above the river are private; do not camp, picnic, or portage onto adjacent private land without permission.",
      "summary": "Launch at Ogden and take out at the Manhattan K-177 / Fairmont ramp for a 14-mile upper-Kaw day. Friends of the Kaw describes this as a beautiful, relatively untouched section near Manhattan, while the app uses the downstream Wamego USGS gauge as a proxy rather than a precise Ogden-stage reading.",
      "accessCaveats": [
        "Ogden has a wide concrete river-left ramp, trailer-capable gravel parking, restrooms, a picnic shelter, trash can, and an informational kiosk, but same-day mud, sand, local parking, and high-water cleanup still control.",
        "The Manhattan K-177 / Fairmont ramp has limited parking and no restroom; do not block the packed gravel approach under the bridge.",
        "Friends of the Kaw notes that there is often a sandbar at the toe of the Manhattan ramp as paddlers approach from the west, so inspect the landing angle before launching from Ogden.",
        "All access and parking are subject to same-day city, county, and ramp conditions. Mud, silt, event closures, high-water cleanup, and shifted sand can change ramp usability."
      ],
      "watchFor": [
        "Low flows below about 1,000 cfs can make the channel narrow and sandbar navigation slow or technical.",
        "Flows above 5,000 cfs are outside the novice band, and above 8,000 cfs Friends of the Kaw says sandbar rest stops become scarce.",
        "Wind across open bends, storms, rising water, floating wood, strainers, bank hooks and fishing lines, and changing sandbars.",
        "Private banks along the Kaw; stay with public ramps and legal sandbar stops rather than climbing banks or using private land.",
        "The Wamego gauge is downstream of this reach. Treat it as a broad same-river proxy and make a same-day visual call at Ogden before committing to the full 14 miles."
      ]
    }
  },
  "kansas-river-ogden-st-george": {
    "putIn": {
      "name": "Ogden Access Ramp",
      "latitude": 39.10503,
      "longitude": -96.69633
    },
    "takeOut": {
      "name": "St. George / Boggs Landing Access Ramp",
      "latitude": 39.18726,
      "longitude": -96.42202
    },
    "logistics": {
      "distanceLabel": "About 26 mi",
      "estimatedPaddleTime": "About 8 hr to 11 hr, longer with low water, wind, sandbar stops, or slow progress through the Manhattan corridor",
      "shuttle": "Stage the take-out at St. George / Boggs Landing first, then drive back to Ogden. Inspect both ramps before launching because this is a long commitment and the Manhattan corridor in the middle can add fatigue before the final miles.",
      "permits": "No special paddling permit is known for private boats on the Kansas River. Use public ramps, follow posted city and county access rules, check Kansas boating/PFD requirements, and respect fishing-license rules if fishing.",
      "camping": "This route is naturally long enough that conservative sandbar camping may make more sense than a single push. Friends of the Kaw says you can camp on public sandbars between the high-water marks without a special permit, but private banks above that line are off-limits and sandbars become scarce above about 8,000 cfs.",
      "campingClassification": "sandbar_or_gravel_bar",
      "summary": "Launch at Ogden and take out at St. George / Boggs Landing for a full upper-Kaw continuation past Manhattan. The app uses the downstream Wamego gauge as a same-river proxy and treats this as a committed distance route rather than a casual day float.",
      "accessCaveats": [
        "The Ogden ramp is straightforward, but same-day mud, sand, and trailer traffic still affect launch conditions.",
        "The Manhattan K-177 / Fairmont ramp mid-corridor often has a sandbar at the toe, and nearby Blue River current can change when Tuttle Creek releases rise.",
        "Stay with public ramps and legal sandbar stops between the high-water marks. The banks above the river are private property.",
        "All access and parking are subject to same-day city, county, mud, silt, high-water cleanup, and event conditions."
      ],
      "watchFor": [
        "Low flows below about 1,000 cfs can make the channel narrow and sandbar navigation slow or technical.",
        "Flows above 5,000 cfs are outside the novice band, and above 8,000 cfs Friends of the Kaw says sandbar rest stops become scarce.",
        "Wind across open bends, storms, rising water, floating wood, strainers, and bank hooks or fishing lines left in shoreline trees.",
        "Mid-route fatigue on an exposed prairie river where the mileage keeps adding up after Manhattan.",
        "Private banks along the Kaw; do not plan on using them for rest, camping, or bailout access."
      ]
    }
  },
  "kansas-river-ogden-wamego": {
    "putIn": {
      "name": "Ogden Access Ramp",
      "latitude": 39.10503,
      "longitude": -96.69633
    },
    "takeOut": {
      "name": "Wamego Access Ramp",
      "latitude": 39.19828,
      "longitude": -96.30537
    },
    "logistics": {
      "distanceLabel": "About 34.5 mi",
      "estimatedPaddleTime": "Best planned as an overnight or a very long endurance day; roughly 11 hr to 14 hr of moving time before wind, sandbar stops, or the Wamego bridge turn",
      "shuttle": "Stage the take-out at the Wamego ramp beneath the K-99 bridge first, then drive back to Ogden. Inspect Wamego before launching because the approach often involves passing under the bridge and turning upstream next to the bank after a very long day.",
      "permits": "No special paddling permit is known for private boats on the Kansas River. Use public ramps, follow posted city and county access rules, check Kansas boating/PFD requirements, and respect fishing-license rules if fishing.",
      "camping": "This route is long enough that conservative sandbar camping is the honest plan for most paddlers. Friends of the Kaw says you can camp on public sandbars between the high-water marks without a special permit, but private banks above that line are off-limits and sandbars become scarce above about 8,000 cfs.",
      "campingClassification": "sandbar_or_gravel_bar",
      "summary": "Launch at Ogden and take out at Wamego for a full upper-Kaw continuation through Manhattan and St. George. The Wamego USGS gauge is direct for the take-out corridor, but the app still treats the broad Kansas River thresholds conservatively because the route is long and exposed.",
      "accessCaveats": [
        "The Ogden ramp is straightforward, but same-day mud, sand, and trailer traffic still affect launch conditions.",
        "The Manhattan K-177 / Fairmont ramp mid-corridor often has a sandbar at the toe, and nearby Blue River current can change when Tuttle Creek releases rise.",
        "At Wamego, Friends of the Kaw says it is often advisable to pass under the K-99 bridge and turn upstream next to the bank to reach the ramp.",
        "Stay with public ramps and legal sandbar stops between the high-water marks. The banks above the river are private property."
      ],
      "watchFor": [
        "Low flows below about 1,000 cfs can make the channel narrow and sandbar navigation slow or technical.",
        "Flows above 5,000 cfs are outside the novice band, and above 8,000 cfs Friends of the Kaw says sandbar rest stops become scarce.",
        "Wind across open bends, storms, rising water, floating wood, strainers, and bank hooks or fishing lines left in shoreline trees.",
        "Mid-route fatigue on an exposed prairie river where the mileage keeps adding up after Manhattan and St. George.",
        "The final bridge-area approach into Wamego, where the safest line may include passing under K-99 and turning upstream along the bank.",
        "Private banks along the Kaw; do not plan on using them for rest, camping, or bailout access."
      ]
    }
  },
  "kansas-river-topeka-water-plant-seward": {
    "putIn": {
      "name": "Topeka Water Plant downstream access ramp",
      "latitude": 39.07421,
      "longitude": -95.71637
    },
    "takeOut": {
      "name": "Seward Avenue / Fool's Landing Access Ramp",
      "latitude": 39.06036,
      "longitude": -95.59468
    },
    "logistics": {
      "distanceLabel": "About 10.6 mi",
      "estimatedPaddleTime": "About 3.5 hr to 5 hr, longer with low water, wind, dredge traffic, or bridge scouting",
      "shuttle": "Stage the take-out at Seward Avenue / Fool's Landing before launching below the Topeka Water Plant low-head dam. Do not start from Kaw River State Park unless your group has a separate Topeka dam portage or paddler-chute plan.",
      "permits": "No special paddling permit is known for private boats on the Kansas River. Use public ramps, follow posted city and county access rules, check Kansas boating/PFD requirements, and respect fishing-license rules if fishing.",
      "camping": "Treat this as a day trip. Sandbars can be legal public river stops under current Kansas Riverkeeper guidance, but banks above the river are private; do not camp, picnic, or portage onto adjacent private land without permission.",
      "summary": "Launch from the downstream ramp at the Topeka Water Plant access and take out at Seward Avenue / Fool's Landing for a guarded Topeka-area Kaw trip. The route uses the direct USGS Topeka Weir gauge but is not a novice float because of old railroad bridge debris and nearby low-head-dam hazards.",
      "accessCaveats": [
        "The Topeka Water Plant access has ramps above and below the low-head dam. Launch below the dam for this route; do not go over the dam in any vessel.",
        "The upstream Kaw River State Park ramp is only two miles above the Topeka Water Plant dam and requires portage or use of the paddler chute; that is a separate, more technical plan.",
        "Seward Avenue / Fool's Landing has a gate that Friends of the Kaw says is locked from dusk to dawn and is not a good overnight parking location.",
        "End the trip at Seward. The Tecumseh low-head dam is about one mile downstream and has no nearby public road access for an easy portage.",
        "All access and parking are subject to same-day city, county, and ramp conditions. Mud, silt, high-water closures, gates, and shifted sand can change ramp usability."
      ],
      "watchFor": [
        "Old railroad bridge remains at river miles 85.3 and 84.5. Friends of the Kaw says exposed steel is especially hazardous at low water and boaters should pass close to river right.",
        "Low flows below about 1,000 cfs can make the channel narrow, expose debris, and make sandbar navigation slow or technical.",
        "Flows above 5,000 cfs are outside the novice band, and above 8,000 cfs Friends of the Kaw says sandbar rest stops become scarce.",
        "Active sand dredging near Seward, downtown bridge current, wind across open bends, storms, rising water, floating wood, strainers, bank hooks and fishing lines, and changing sandbars.",
        "Private banks along the Kaw; stay with public ramps and legal sandbar stops rather than climbing banks or using private land."
      ]
    }
  }
};
