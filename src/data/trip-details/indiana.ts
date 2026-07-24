// State-scoped route data. Keep entries in route-family and downstream order.
import type { RiverTripDetails } from '../../lib/types';

export const indianaRiverTripDetails: Record<string, RiverTripDetails> = {
  "big-pine-creek-450-harrison-twin-bridges": {
    "putIn": {
      "id": "450-harrison-bridge-access-point",
      "name": "450 \"Harrison\" Bridge Access Point",
      "latitude": 40.382053,
      "longitude": -87.332652
    },
    "takeOut": {
      "id": "twin-bridges-access-point",
      "name": "Twin Bridges Access Point",
      "latitude": 40.339953,
      "longitude": -87.314311
    },
    "logistics": {
      "distanceLabel": "About 5 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr 30 min for a prepared group, longer near the floor with scouting, surf laps, or a slower shuttle day",
      "shuttle": "Stage the Twin Bridges take-out first, then drive back to the 450 Harrison access. Confirm both bridge-access pull-offs before launching because this route uses current NICHES manager pages and the Warren County lease rather than a polished park-ramp access page.",
      "permits": "No route-specific private paddling permit is known. Use the named public access sites, follow Indiana boating and PFD rules, and do not treat the 450N access as overnight parking or camping.",
      "camping": "Treat this as a daylight day trip. Warren County's access lease supports single-day public use and no overnight parking at 450N, and banks away from the named access points may be private.",
      "campingClassification": "none",
      "summary": "Launch at 450 Harrison and take out at Twin Bridges for the lower public Big Pine pair. Use USGS 033356848 at Pine Village and a conservative 200 cfs floor, then make a same-day visual call on current, wood, and take-out footing.",
      "accessCaveats": [
        "This route is the public 450 Harrison to Twin Bridges pair supported by current NICHES pages, not the blocked Rainsville / Rocky Ford launch.",
        "NICHES names both endpoints and Warren County's lease supports boat-access parking at 450N, but the access story is still simpler than a managed park ramp. Follow current signs and obvious public pull-off boundaries on arrival.",
        "Warren County's current lease allows only single-day public use at the 450N access and says no overnight parking is permitted.",
        "NICHES does not publish a mileage table for this pair. Distance and paddle-time estimates are approximate and should not replace a same-day shuttle check.",
        "Private banks and preserve land outside the named access points still require restraint. Do not plan casual mid-route stops unless they are clearly public or needed for safety."
      ],
      "watchFor": [
        "Low water near or below 200 cfs, when ledges, shoals, and partial walk-on-rock lines become more common.",
        "Fast rises after rain, muddy pushy current, bedrock ledges, surf waves, and the lower-section whitewater features that make this a filtered route rather than a casual float.",
        "Fresh wood, strainers, bridge-area footing issues, slick rocks, cold shoulder-season water, and limited rescue margin if the group is not comfortable in moving current.",
        "Private banks, simple roadside-style access, and missing the Twin Bridges take-out."
      ]
    }
  },
  "sugar-creek-deers-mill-cox-ford": {
    "putIn": {
      "id": "deers-mill-public-access-point",
      "name": "Deer's Mill Public Access",
      "latitude": 39.946497,
      "longitude": -87.059065
    },
    "takeOut": {
      "id": "cox-ford-public-access-point",
      "name": "Cox Ford Public Access",
      "latitude": 39.885608,
      "longitude": -87.223917
    },
    "logistics": {
      "distanceLabel": "About 14 mi",
      "estimatedPaddleTime": "About 3 hr 30 min to 5 hr 30 min at ordinary levels, longer near the floor, in heavy summer traffic, or with a slow shuttle day",
      "shuttle": "Stage the Cox Ford take-out first, then drive back to Deer's Mill on SR 234. Confirm the exact parking setup before leaving vehicles because the current Turkey Run public access still uses permit parking rather than a wide open unregulated lot.",
      "permits": "No route-specific private paddling permit is known. Follow Indiana boating and PFD rules, obey posted Shades / Pine Hills / Turkey Run access signs, and secure any currently required long-term parking permit at Cox Ford before leaving a vehicle there.",
      "camping": "Treat the standard Deer's Mill to Cox Ford run as a day route. Nearby campgrounds and outfitter lodging exist in the corridor, but no overnight stop is needed for the normal shuttle.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Deer's Mill Public Access and take out at Cox Ford Public Access for the classic scenic Sugar Creek corridor through Shades and Turkey Run. Use USGS 03339500 at Crawfordsville with a conservative 75 cfs floor, and make a same-day call on current, wood, crowds, and Cox Ford parking rules before committing.",
      "accessCaveats": [
        "The current Shades map keeps Deer's Mill as an official Sugar Creek canoe access, but the landing itself has limited loading space. IndianaOutfitters says longer parking is away from the immediate access area rather than right at the bank.",
        "The current Turkey Run map labels Cox Ford as Public Access and says a parking permit is required there. Handle the permit/parking plan before launching instead of assuming open all-day parking.",
        "The endpoint coordinates come from the named public-access placemarks in IndianaOutfitters' public Sugar Creek KML. Follow current on-site signs and the obvious public landing path instead of driving or carrying beyond posted access areas.",
        "This is a very popular Sugar Creek shuttle in warm weather. Loading zones, crowding, and foot traffic can all slow the start or finish even when the river itself is friendly.",
        "Banks between the two accesses may be private or unsuitable for casual stopping. Plan the route around the named public endpoints."
      ],
      "watchFor": [
        "Flows near or below about 75 cfs, when riffles get scrapier and the 14-mile day takes longer than the normal Sugar Creek expectation.",
        "Fast rises after rain, muddy pushy current, floating wood, strainers on bends, and stronger water than the pleasant scenic look at the access may suggest.",
        "Slippery footing, shallow carry-downs, crowding at the landings, and the risk of missing the signed Cox Ford finish when the corridor is busy.",
        "Private banks, thunderstorms, summer heat, cold shoulder-season water, and limited legal places to leave the river outside the named public accesses."
      ]
    }
  },
  "wildcat-creek-knop-lake-mis-so-lah": {
    "putIn": {
      "id": "knop-lake-public-fishing-site-access",
      "name": "Knop Lake Public Fishing Site access",
      "latitude": 40.4595504,
      "longitude": -86.66416152
    },
    "takeOut": {
      "id": "mis-so-lah-access-site",
      "name": "Mis-So-Lah access site",
      "latitude": 40.44428906,
      "longitude": -86.76371068
    },
    "logistics": {
      "distanceLabel": "About 9.3 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr in ordinary conditions, longer near the floor, with shallow riffles, wood cleanup, or a slower shuttle day",
      "shuttle": "Stage the Mis-So-Lah take-out first, then drive back upstream to Knop Lake Public Fishing Site. The Knop entrance can be easy to miss, and the Wildcat Creek access page says to take the second road to the right by the Knop Lake Access sign rather than the straight private road. Inspect both endpoints before launching because Mis-So-Lah is a small grass-parking carry-down instead of a formal ramp complex.",
      "permits": "No route-specific private paddling permit is known. Follow Indiana boating and PFD rules, use only the named public access sites, and obey any current DNR, NICHES, or Wildcat Foundation signs, closures, or seasonal site notices.",
      "camping": "Treat this as a daylight day trip. The Knop Lake Public Fishing Site says there is no camping, Mis-So-Lah is a small public access point rather than a campground, and banks away from the named accesses may be private.",
      "campingClassification": "none",
      "summary": "Launch at Knop Lake Public Fishing Site access and take out at Mis-So-Lah for the 9.3-mile lower North Fork Wildcat run. Use USGS 03334000 at Owasco and a conservative 180 cfs floor, then make a same-day call on wood, the Pyrmont bypass channel, and take-out footing.",
      "accessCaveats": [
        "Indiana DNR's current access layer names Knop Lake Wildcat Creek Access as a carry-down Wildcat Creek launch with parking-lot access and Division of Fish & Wildlife management.",
        "The current Knop Lake access page says to stay left at the first split, then take the second road right by the Knop Lake Access sign; the straight road is private property.",
        "NICHES says Mis-So-Lah is a public put-in/take-out, while the current Wildcat Creek access page says it is just downstream of the CR 725 E bridge on the left bank with room for 5 to 10 vehicles and a 35-yard easy dirt path.",
        "The downstream coordinate is a current NICHES embed-centered public-access anchor, not a surveyed government ramp point. Follow current bridge-side signs and the obvious public landing path on arrival.",
        "This route uses a conservative community minimum-only threshold. The best published low-water support is a 180 to 200 cfs comfortable minimum, not a full preferred-range ladder."
      ],
      "watchFor": [
        "Flows near or below about 180 cfs at Owasco, when short riffles get shallower and low-water channel hunting or dragging become more likely.",
        "The old Pyrmont Dam about one-half mile below Knop Lake. Wildcat Creek says to take the right-hand bypass channel, which is narrow, has a few sharp turns, and tends to funnel water.",
        "Fresh wood, sharp bends, muddy footing, cold shoulder-season water, and faster current than expected through the Pyrmont bypass or at the small Mis-So-Lah landing.",
        "Private banks between the named accesses and the risk of missing the Mis-So-Lah finish just downstream of the CR 725 E bridge on the left bank.",
        "Thunderstorms, rising water, and any same-day closure or maintenance note at Knop Lake or Mis-So-Lah."
      ]
    }
  },
  "wabash-river-linn-grove-white-bridge": {
    "putIn": {
      "id": "linn-grove-park",
      "name": "Linn Grove Park",
      "latitude": 40.645752,
      "longitude": -85.031219
    },
    "takeOut": {
      "id": "white-bridge-picnic-area",
      "name": "White Bridge Picnic Area",
      "latitude": 40.728082,
      "longitude": -85.136707
    },
    "logistics": {
      "distanceLabel": "About 9.5 mi",
      "estimatedPaddleTime": "About 4.5 hr to 7.5 hr depending on stage, current, wind, shallow dragging, and debris",
      "shuttle": "Stage the take-out at White Bridge Picnic Area, then drive back to Linn Grove Park. Inspect both public launches before starting because the longer distance makes a last-minute access surprise more expensive than on the short Wells County links.",
      "permits": "No route-specific private paddling permit is known. Use the public launch areas, follow Indiana boating and PFD requirements, obey posted Wells County or local rules, and skip the route during Action or Flood Stage.",
      "camping": "Treat this as a long daylight day trip. Banks outside the named public launches may be private, so do not camp, picnic, scout, or take out on adjacent land unless it is clearly public or you have permission.",
      "campingClassification": "none",
      "summary": "Launch at Linn Grove Park and take out at White Bridge Picnic Area for a longer Wells County Wabash day between public launches. Use USGS 03323000 at Bluffton as the direct stage check and stay conservative outside the local 1.5 to 3 ft kayaking band.",
      "accessCaveats": [
        "Wells County Trails supports the route by linking the public 5.3-mile Linn Grove-to-Vera Cruz leg with the public 4.2-mile Vera Cruz-to-White Bridge leg.",
        "Northeast Indiana Water Trails map coordinates are used for both endpoint anchors. Follow current signs and local conditions on arrival rather than relying on bridge shoulders or informal pull-offs.",
        "Wells County Trails links the Wabash river-level check to the Bluffton gauge and warns never to enter during Action or Flood Stages.",
        "The route is still broad-audience at ordinary levels, but it is long enough that food, water, sun, and shuttle discipline matter more than on the shorter Wells County links.",
        "Use only public access points. Indiana river-rights context still requires caution around private banks and land above the ordinary high-water mark."
      ],
      "watchFor": [
        "Stage below 1.5 ft, when Wells County Trails says low water can require getting out of the kayak to pass shallow sections.",
        "Stage above 3 ft, rising water, Action Stage, Flood Stage, or recent heavy rain, when stronger flow, debris, and obstacle hazards increase.",
        "Floating wood, log jams, bridge debris, strainers, submerged snags, and shallow gravel or sand bars.",
        "Wind on open bends, thunderstorms, cold water, and fatigue over a longer day with limited legal bailout access.",
        "Private banks between launches; do not assume legal intermediate take-outs between Linn Grove and White Bridge."
      ]
    }
  },
  "wabash-river-vera-cruz-kehoe-park": {
    "putIn": {
      "id": "vera-cruz-paddlesports-launch",
      "name": "Vera Cruz Paddlesports Launch",
      "latitude": 40.69890779,
      "longitude": -85.0828222
    },
    "takeOut": {
      "id": "kehoe-park",
      "name": "Kehoe Park",
      "latitude": 40.74237,
      "longitude": -85.171271
    },
    "logistics": {
      "distanceLabel": "About 6 mi",
      "estimatedPaddleTime": "About 3 hr to 6 hr depending on stage, current, shallow dragging, wind, debris, and how efficiently the group reaches the in-town Kehoe finish",
      "shuttle": "Stage the take-out at Kehoe Park, then drive back to Vera Cruz Paddlesports Launch. Inspect both accesses before launching because the finish is a public town park rather than an isolated ramp, and same-day events or maintenance can affect parking or landing space.",
      "permits": "No route-specific private paddling permit is known. Use the public launch areas, follow Indiana boating and PFD requirements, obey posted Wells County or local rules, and skip the route during Action or Flood Stage.",
      "camping": "Treat this as a daylight day route into Bluffton. Banks outside the named public launches may be private, so do not camp, picnic, scout, or take out on adjacent land unless it is clearly public or you have permission.",
      "campingClassification": "none",
      "summary": "Launch at Vera Cruz Paddlesports Launch and take out at Kehoe Park for a medium-length Wells County Wabash route into Bluffton. Use USGS 03323000 at Bluffton as the direct stage check and stay conservative outside the local 1.5 to 3 ft kayaking band.",
      "accessCaveats": [
        "The NEI Water Trails Wabash River Challenge page explicitly lists Vera Cruz to Kehoe Park as a 6-mile route, and the NEI map exposes both endpoint coordinates.",
        "Wells County Trails confirms Vera Cruz as a public improved concrete launch. Bluffton describes Kehoe Park as a public riverfront park with direct access to the River Greenway trail system, matching the NEI Wabash access marker.",
        "Wells County Trails links the Wabash river-level check to the Bluffton gauge and warns never to enter during Action or Flood Stages.",
        "Follow current signs and local conditions on arrival rather than assuming the mapped park edge is the exact best carry path on every day.",
        "Use only public access points. Indiana river-rights context still requires caution around private banks and land above the ordinary high-water mark."
      ],
      "watchFor": [
        "Stage below 1.5 ft, when Wells County Trails says low water can require getting out of the kayak to pass shallow sections.",
        "Stage above 3 ft, rising water, Action Stage, Flood Stage, or recent heavy rain, when stronger flow, debris, and obstacle hazards increase.",
        "Floating wood, log jams, bridge debris, strainers, submerged snags, and shallow gravel or sand bars.",
        "Wind, thunderstorms, cold water, poor visibility, and town-side take-out activity near Kehoe Park.",
        "Private banks between launches; plan the 6-mile trip without assuming legal intermediate take-outs."
      ]
    }
  },
  "wabash-river-vera-cruz-hale-street": {
    "putIn": {
      "id": "vera-cruz-paddlesports-launch",
      "name": "Vera Cruz Paddlesports Launch",
      "latitude": 40.69890779,
      "longitude": -85.0828222
    },
    "takeOut": {
      "id": "hale-street-access",
      "name": "Hale Street access",
      "latitude": 40.7448153,
      "longitude": -85.1745966
    },
    "logistics": {
      "distanceLabel": "About 6.6 mi",
      "estimatedPaddleTime": "About 3.5 hr to 6 hr depending on stage, current, shallow dragging, bridge debris, and the simple Hale finish",
      "shuttle": "Stage the take-out at the east end of Hale Street, then drive back to Vera Cruz Paddlesports Launch. Inspect both public access points before launching because the Hale finish is a simple earthen east-end street access rather than an improved concrete ramp.",
      "permits": "No route-specific private paddling permit is known. Use the public launch areas, follow Indiana boating and PFD requirements, obey posted Wells County or local rules, and skip the route during Action or Flood Stage.",
      "camping": "Treat this as a daylight day trip. Banks outside the named public accesses may be private, so do not camp, picnic, scout, or take out on adjacent land unless it is clearly public or you have permission.",
      "campingClassification": "none",
      "summary": "Launch at Vera Cruz Paddlesports Launch and take out at the east-end Hale Street access for a mid-length Wells County Wabash link into Bluffton. Use USGS 03323000 at Bluffton as the direct stage check and stay conservative outside the local 1.5 to 3 ft kayaking band.",
      "accessCaveats": [
        "Wells County Trails supports the route by linking the public 4.2-mile Vera Cruz-to-White Bridge leg with the public 2.4-mile White Bridge-to-Hale connector.",
        "The Hale Street coordinate is a practical access anchor at the mapped no-exit east end of West Hale Street, matching the Wells County Trails public-access wording rather than a surveyed ramp pin.",
        "Wells County Trails links the Wabash river-level check to the Bluffton gauge and warns never to enter during Action or Flood Stages.",
        "Indiana DNR removed the old canoe-guide material as outdated and points users to current regional water-trail resources. This route relies on Wells County Trails and NEI Water Trails, not legacy canoe-guide text.",
        "Use only public access points. Indiana river-rights context still requires caution around private banks and land above the ordinary high-water mark."
      ],
      "watchFor": [
        "Stage below 1.5 ft, when Wells County Trails says low water can require getting out of the kayak to pass shallow sections.",
        "Stage above 3 ft, rising water, Action Stage, Flood Stage, or recent heavy rain, when stronger flow, debris, and obstacle hazards increase.",
        "Floating wood, log jams, bridge debris, strainers, submerged snags, and shallow gravel or sand bars.",
        "Wind on open bends, thunderstorms, cold water, and the simpler earthen Hale finish once you reach Bluffton.",
        "Private banks between launches; plan the 6.6-mile trip without assuming legal intermediate take-outs."
      ]
    }
  },
  "wabash-river-linn-grove-hale-street": {
    "putIn": {
      "id": "linn-grove-park",
      "name": "Linn Grove Park",
      "latitude": 40.645752,
      "longitude": -85.031219
    },
    "takeOut": {
      "id": "hale-street-access",
      "name": "Hale Street access",
      "latitude": 40.7448153,
      "longitude": -85.1745966
    },
    "logistics": {
      "distanceLabel": "About 11.9 mi",
      "estimatedPaddleTime": "About 5.25 hr to 9 hr depending on stage, current, wind, shallow dragging, woody debris, and how quickly the group reaches the east-end Hale finish",
      "shuttle": "Stage the take-out at the east end of Hale Street, then drive back to Linn Grove Park. Inspect both public access points before launching because this is the longest current Wells County Wabash route and the Hale finish is a simple earthen access rather than an improved park ramp.",
      "permits": "No route-specific private paddling permit is known. Use the public launch areas, follow Indiana boating and PFD requirements, obey posted Wells County or local rules, and skip the route during Action or Flood Stage.",
      "camping": "Treat this as a long daylight day route rather than an overnight. Banks outside the named public accesses may be private, so do not camp, picnic, scout, or take out on adjacent land unless it is clearly public or you have permission.",
      "campingClassification": "none",
      "summary": "Launch at Linn Grove Park and take out at the east-end Hale Street access for the longest currently supported Wells County Wabash day. Use USGS 03323000 at Bluffton as the direct stage check and stay conservative outside the local 1.5 to 3 ft kayaking band.",
      "accessCaveats": [
        "Wells County Trails lists Linn Grove Park, Vera Cruz Paddlesports Launch, White Bridge Picnic Area, and Hale Street as public Wabash access points, with the full route supported by the official 5.3-mile, 4.2-mile, and 2.4-mile linked public legs.",
        "The combined 11.9-mile distance comes from the public Linn Grove-to-Vera Cruz, Vera Cruz-to-White Bridge, and White Bridge-to-Hale legs. Plan food, water, daylight, and group pace around the longer commitment.",
        "The Hale Street coordinate is a practical public-access anchor at the mapped no-exit east end of West Hale Street, matching Wells County Trails launch wording rather than a surveyed ramp pin.",
        "Wells County Trails links the Wabash river-level check to the Bluffton gauge and warns never to enter during Action or Flood Stages.",
        "Use only public access points. Indiana river-rights context still requires caution around private banks and land above the ordinary high-water mark."
      ],
      "watchFor": [
        "Stage below 1.5 ft, when Wells County Trails says low water can require getting out of the kayak to pass shallow sections.",
        "Stage above 3 ft, rising water, Action Stage, Flood Stage, or recent heavy rain, when stronger flow, debris, and obstacle hazards increase.",
        "Fatigue, sun, wind, thunderstorms, cold water, and the risk of committing to nearly 12 miles without enough daylight or shuttle discipline.",
        "Floating wood, log jams, bridge debris, strainers, submerged snags, and shallow gravel or sand bars.",
        "Private banks between launches and the simpler earthen Hale finish; do not assume easy legal bailout access once you are downstream of Vera Cruz."
      ]
    },
    "accessPoints": [
      {
        "id": "linn-grove-park",
        "name": "Linn Grove Park",
        "latitude": 40.645752,
        "longitude": -85.031219,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Full upstream start at the public park launch."
      },
      {
        "id": "vera-cruz-paddlesports-launch",
        "name": "Vera Cruz Paddlesports Launch",
        "latitude": 40.69890779,
        "longitude": -85.0828222,
        "mileFromStart": 5.3,
        "segmentKind": "creek",
        "note": "Official public split point for the short upstream leg and the longer Bluffton-bound segments."
      },
      {
        "id": "white-bridge-picnic-area",
        "name": "White Bridge Picnic Area",
        "latitude": 40.728082,
        "longitude": -85.136707,
        "mileFromStart": 9.5,
        "segmentKind": "creek",
        "note": "Improved public launch that supports the middle and short downstream Wells County segments."
      },
      {
        "id": "kehoe-park",
        "name": "Kehoe Park",
        "latitude": 40.74237,
        "longitude": -85.171271,
        "mileFromStart": 11.3,
        "segmentKind": "creek",
        "note": "Public Bluffton riverfront park landing before the final short connector to Hale Street."
      },
      {
        "id": "hale-street-access",
        "name": "Hale Street access",
        "latitude": 40.7448153,
        "longitude": -85.1745966,
        "mileFromStart": 11.9,
        "segmentKind": "creek",
        "note": "Full downstream finish at the public east-end Hale Street access."
      }
    ]
  }
};
