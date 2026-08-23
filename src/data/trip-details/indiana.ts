// State-scoped route data. Keep entries in route-family and downstream order.
import type { RiverTripDetails } from '../../lib/types';

export const indianaRiverTripDetails: Record<string, RiverTripDetails> = {
  "west-fork-white-river-henderson-ford-paragon": {
    "putIn": {"id": "white-river-henderson-ford-access", "name": "Henderson Ford Public Access", "latitude": 39.49870436, "longitude": -86.35706695},
    "takeOut": {"id": "white-river-burnett-landing-paragon", "name": "Burnett Landing at Paragon", "latitude": 39.434075, "longitude": -86.44855},
    "logistics": {
      "distanceLabel": "About 23.5 miles",
      "estimatedPaddleTime": "About 10–12 hours; plan a full day and conservative portage time",
      "shuttle": "Stage Burnett Landing first, then drive to Henderson Ford. Verify access, parking, signage, and the current condition of the dam-portage line before launching.",
      "permits": "No route-specific permit is identified. Follow Indiana boating/PFD rules, DNR access rules, and posted site restrictions.",
      "camping": "Day trip only. No legal on-route camping was verified between Henderson Ford and Paragon.",
      "campingClassification": "nearby_basecamp",
      "summary": "Long downstream moving-water route with one mandatory dam portage. Use the named public endpoints and make a same-day flow, wood, weather, and access call.",
      "accessCaveats": ["Henderson Ford is a DNR-managed public access; verify current ramp and parking condition.", "Burnett Landing is a DNR Paragon access; do not substitute the former Martinsville SR-39 access or private shoreline.", "Indiana Outfitters notes that older access descriptions can change; verify current public signage before travel."],
      "watchFor": ["Centerton stage below 4.7 ft, rising water, muddy current, flood conditions, and floating wood.", "Dam hydraulics, strainers, bridge current, cold water, private banks, thunderstorms, and a missed Paragon take-out."]
    }
  },
  "west-fork-white-river-gosport-spencer": {
    "putIn": {"id": "white-river-gosport-public-access", "name": "Gosport Public Access Site", "latitude": 39.35047, "longitude": -86.65877},
    "takeOut": {"id": "white-river-spencer-public-fishing", "name": "Spencer Public Fishing Site", "latitude": 39.26096, "longitude": -86.798301},
    "logistics": {
      "distanceLabel": "About 11 miles",
      "estimatedPaddleTime": "About 5 to 5.5 hours; local low-water report was 2 hours 45 minutes",
      "shuttle": "Stage the Spencer Public Fishing Site vehicle first, then drive to Gosport. Verify both ramps, parking, and current access notices from land before launching.",
      "permits": "No route-specific permit was identified. Follow Indiana boating/PFD rules, DNR access rules, and posted site restrictions.",
      "camping": "Day trip only. McCormick's Creek State Park is nearby, but no legal on-route camping or overnight landing was verified between Gosport and Spencer.",
      "campingClassification": "nearby_basecamp",
      "summary": "Use the named Gosport and Spencer public sites for an 11-mile downstream trip; treat this as a full-day moving-water route and make a same-day wood, flow, and access call.",
      "accessCaveats": ["Indiana DNR documents both endpoints with boat-ramp access; verify current condition and parking on arrival.", "The reach has limited confirmed intermediate exits; do not rely on private banks for planned landings.", "Do not substitute the former Martinsville SR-39 access or informal shoreline entries without separate verification."],
      "watchFor": ["Spencer stage below 3.2 ft or above 3.5 ft, rising water, muddy current, flood conditions, and floating wood.", "Down trees, strainers, bridge current, cold water, private banks, thunderstorms, and a missed Spencer take-out."]
    }
  },
  "west-fork-white-river-mounds-perkinsville": {
    "putIn": {"id": "white-river-mounds-state-park-canoe", "name": "Mounds State Park Canoe Launch", "latitude": 40.106063, "longitude": -85.624296},
    "takeOut": {"id": "white-river-perkinsville-public-access", "name": "IDNR Perkinsville Public Access Site", "latitude": 40.142819, "longitude": -85.858558},
    "logistics": {
      "distanceLabel": "About 13 miles",
      "estimatedPaddleTime": "About 3–5 hours, depending on flow, stops, and scouting",
      "shuttle": "Stage the Perkinsville vehicle only after Madison County/IDNR confirms that the 2026 construction closure has ended and the access is open. Do not substitute a private bank or the SR-13 bridge.",
      "permits": "No route-specific permit was identified. Follow Indiana DNR boating and PFD rules, Mounds State Park rules, and all posted construction/access notices.",
      "camping": "Mounds State Park has campground facilities near the canoe launch; no legal on-route camping was verified at Perkinsville. Treat this as a daylight trip.",
      "campingClassification": "nearby_basecamp",
      "summary": "Public Mounds State Park launch to the IDNR Perkinsville access on the White River. Confirm the take-out reopening and field-verify the endpoint before launching.",
      "accessCaveats": ["Mounds lists a canoe launch and campground; confirm seasonal gate hours, parking, and the carry to the river.", "Perkinsville is an official public access at 9509 W 280 N, but the site was closed for improvements during 2026 construction. Confirm current status before travel.", "Indiana DNR warns that riverbanks are generally private; use only named public access and do not trespass.", "The Perkinsville coordinate is a nearby documented river/access point pending field verification after reopening."],
      "watchFor": ["Discharge below 250 or above 400 cfs, stage above 10 ft, rising water, muddy current, and floating wood.", "Strainers, bridge current, private banks, cold water, thunderstorms, and an unavailable or unfinished Perkinsville landing."]
    }
  },
  "maumee-river-kreager-moser": {
    "putIn": {"id": "maumee-kreager-park-ramp", "name": "Kreager Park / North River Road Boat Ramp", "latitude": 41.0892, "longitude": -85.0407},
    "takeOut": {"id": "maumee-moser-park-canoe-launch", "name": "Moser Park Canoe Launch", "latitude": 41.07339, "longitude": -85.021895},
    "logistics": {
      "distanceLabel": "About 5 river miles",
      "estimatedPaddleTime": "About 2 hr to 3 hr 30 min",
      "shuttle": "Stage the Moser Park take-out, then drive back to the Kreager Park / North River Road ramp. Inspect the Moser canoe-launch area and current parking before leaving a vehicle.",
      "permits": "No route-specific permit is identified. Follow Indiana boating and PFD rules, New Haven and Fort Wayne park rules, and posted access restrictions.",
      "camping": "Day trip only. Moser and Kreager provide park amenities, but no legal on-route camping was verified for this reach.",
      "campingClassification": "none",
      "summary": "Launch at Kreager Park and finish at New Haven's Moser Park canoe launch. Use USGS 04183000, a conservative 950-2,800 cfs community window, and same-day checks for flooding, debris, landing conditions, and urban advisories.",
      "accessCaveats": ["Moser is documented as a city-managed canoe launch, but the landing should be checked from land before launch.", "The corridor has limited confirmed intermediate exits; plan the full shuttle and do not use private banks.", "Maumee Pathway flooding or closures are a warning to reassess river access and footing."],
      "watchFor": ["Discharge below 950 or above 2,800 cfs, rising water, muddy current, floating wood, and flood conditions.", "Private banks, cold water, thunderstorms, limited exits, and a missed Moser take-out."]
    }
  },
  "maumee-river-niagara-kreager": {
    "putIn": {"id": "maumee-niagara-drive-access", "name": "Anthony Boulevard / Niagara Drive Access", "latitude": 41.0821, "longitude": -85.1128},
    "takeOut": {"id": "maumee-kreager-park-ramp", "name": "Kreager Park / North River Road Boat Ramp", "latitude": 41.0892, "longitude": -85.0407},
    "logistics": {
      "distanceLabel": "Nearly 4 river miles",
      "estimatedPaddleTime": "About 1 hr 30 min to 2 hr",
      "shuttle": "Stage the Kreager Park / North River Road take-out, then drive to the Anthony Boulevard / Niagara Drive access. Confirm the steep gravel put-in and current parking/signage before unloading.",
      "permits": "No route-specific permit is identified in the published Fort Wayne water-trail guidance. Follow Indiana boating and PFD rules, city park rules, and posted access restrictions.",
      "camping": "Day trip only. No overnight stop is part of this urban reach; use the named public ramps and arrange any camping separately.",
      "campingClassification": "none",
      "summary": "Put in below Hosey Dam at the Anthony Boulevard / Niagara Drive access and paddle nearly four miles downstream to the public Kreager Park / North River Road ramp. Use USGS 04182950, the conservative 950-2,800 cfs community window, and a same-day check for ramp footing, current, debris, and urban advisories.",
      "accessCaveats": [
        "Hosey Dam is upstream of the named put-in; never attempt to run the dam or approach its boil/current line.",
        "The Niagara Drive gravel ramp is steep. Carry boats with care and do not substitute an unverified shoreline entry.",
        "Kreager Park is across North River Road from the public boat ramp. Use the signed ramp and do not assume every Rivergreenway bank is a legal take-out.",
        "Urban stormwater and combined-sewer concerns make current advisories relevant after heavy rain."
      ],
      "watchFor": [
        "Discharge below about 950 cfs, above about 2,800 cfs, rapidly rising or muddy water, and floating debris.",
        "The Hosey Dam hazard, steep carry-down, slick ramp footing, bridge traffic, and limited intermediate exits.",
        "Thunderstorms, cold water, private shoreline, and current city or water-quality advisories."
      ]
    }
  },
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
  },
  "west-fork-white-river-barlow-mcculloch": {
    "putIn": {
      "id": "barlow-landing",
      "name": "Barlow Landing",
      "latitude": 40.190296,
      "longitude": -85.360578
    },
    "takeOut": {
      "id": "mcculloch-park-launch",
      "name": "McCulloch Park launch",
      "latitude": 40.19768,
      "longitude": -85.37617
    },
    "logistics": {
      "distanceLabel": "About 1.3 mi",
      "estimatedPaddleTime": "About 45 min to 1 hr 30 min depending on stage, shallow riffles, wood, and time spent exploring the short city reach",
      "shuttle": "Stage the take-out at McCulloch Park near the Martin Luther King Jr. Boulevard river crossing, then return to Barlow Landing in the 600 block of South Luick Avenue. Inspect both new city launches before leaving a vehicle.",
      "permits": "No route-specific paddling permit is known. Use the designated public launches, follow Indiana boating and PFD rules, and obey current City of Muncie park and parking signs.",
      "camping": "Treat this as a short daylight city float. Neither launch is presented as a route campground, and no riverside camping is assumed.",
      "campingClassification": "none",
      "summary": "Use Muncie's two current public launches for a short, gentle introduction to the West Fork White River. Take out at McCulloch and do not extend the itinerary toward the remaining west-side dam/fish-ladder structure.",
      "accessCaveats": [
        "Barlow Landing is a dedicated canoe/kayak launch with parking in the 600 block of South Luick Avenue.",
        "McCulloch Park is a current public launch in Destination Muncie's June 2026 guidance; follow the park path and current signs to the river access near Martin Luther King Jr. Boulevard.",
        "The approximately 1.3-mile distance is derived from mapped river geometry rather than a published city mileage table.",
        "Take out at McCulloch. The remaining Muncie Sanitary District dam farther west was modified as a fish ladder, but no manager-backed through-route or portage is claimed here.",
        "Banks outside public park and greenway property may be private; use the designated endpoints."
      ],
      "watchFor": [
        "Stage below 4.00 ft, when shallow riffles and scraping become more likely, or 5.50 ft and higher, when Canoe Country closes its White River trips.",
        "Fresh trees, strainers, bridge debris, submerged objects, and muddy or rapidly rising water after storms.",
        "Urban runoff and water-quality concerns after heavy rain; avoid swallowing water and wash hands and gear after the trip.",
        "Missing the short McCulloch finish and unintentionally continuing toward downstream city structures."
      ]
    },
    "accessPoints": [
      {
        "id": "barlow-landing",
        "name": "Barlow Landing",
        "latitude": 40.190296,
        "longitude": -85.360578,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Dedicated public canoe/kayak launch and upstream route start."
      },
      {
        "id": "mcculloch-park-launch",
        "name": "McCulloch Park launch",
        "latitude": 40.19768,
        "longitude": -85.37617,
        "mileFromStart": 1.3,
        "segmentKind": "creek",
        "note": "Public park take-out; end this route here."
      }
    ]
  },
  "west-fork-white-river-morrows-meadow-canoe-country": {
    "putIn": {
      "id": "morrows-meadow-canoe-launch",
      "name": "Morrow's Meadow canoe launch",
      "latitude": 40.178559,
      "longitude": -85.49512
    },
    "takeOut": {
      "id": "canoe-country-landing",
      "name": "Canoe Country landing",
      "latitude": 40.132438,
      "longitude": -85.55517
    },
    "logistics": {
      "distanceLabel": "About 7 mi",
      "estimatedPaddleTime": "About 3 hr at ordinary levels, longer with low-water dragging, wood scouting, or a relaxed scenic pace",
      "shuttle": "Arrange the private Canoe Country landing and shuttle first, then launch from the public canoe access at Morrow's Meadow Park in Yorktown. Do not leave a vehicle at or rely on the outfitter landing without current permission.",
      "permits": "No public-river paddling permit is known, but Canoe Country is private property. Call ahead to confirm fees, hours, shuttle availability, and whether private boats may use the landing.",
      "camping": "Treat this as a daylight day trip. Canoe Country advertises primitive camping only by special arrangement, so camping is a separate private reservation rather than part of the normal route.",
      "campingClassification": "nearby_basecamp",
      "summary": "Follow Canoe Country's published Trip #3 from public Morrow's Meadow Park to its private Daleville landing. The outfitter describes the seven-mile, three-hour reach as its most scenic trip.",
      "accessCaveats": [
        "Morrow's Meadow is the named public Yorktown start used by Canoe Country; use the designated canoe-launch area and current park signs.",
        "Canoe Country is a private landing with seasonal hours. Confirm arrangements before launching even if you own the boat and handle your own shuttle.",
        "The Muncie gauge is upstream of this route. Local thunderstorms can affect the Yorktown-to-Daleville reach before the gauge captures the change.",
        "Banks between the named endpoints are commonly private. Do not plan casual stops or intermediate take-outs without clear permission.",
        "The route and mileage are outfitter-published, but same-day obstructions and access conditions can change."
      ],
      "watchFor": [
        "Stage below 4.00 ft, when shallow riffles and dragging become more likely, or 5.50 ft and higher, when Canoe Country closes.",
        "Strainers, fresh log jams, bridge debris, shallow gravel, and sharper current on outside bends.",
        "Thunderstorms or runoff downstream of the upstream proxy gauge.",
        "Private banks and arriving outside the confirmed hours or terms for the Canoe Country take-out."
      ]
    },
    "accessPoints": [
      {
        "id": "morrows-meadow-canoe-launch",
        "name": "Morrow's Meadow canoe launch",
        "latitude": 40.178559,
        "longitude": -85.49512,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Public Yorktown park launch used for Canoe Country Trip #3."
      },
      {
        "id": "canoe-country-landing",
        "name": "Canoe Country landing",
        "latitude": 40.132438,
        "longitude": -85.55517,
        "mileFromStart": 7,
        "segmentKind": "creek",
        "note": "Private outfitter take-out; advance confirmation is required."
      }
    ]
  },
  "west-fork-white-river-canoe-country-edgewater": {
    "putIn": {
      "id": "canoe-country-launch",
      "name": "Canoe Country launch",
      "latitude": 40.132438,
      "longitude": -85.55517
    },
    "takeOut": {
      "id": "edgewater-park-boat-ramp",
      "name": "Edgewater Park Boat Ramp",
      "latitude": 40.1039725,
      "longitude": -85.6683267
    },
    "logistics": {
      "distanceLabel": "About 11 mi",
      "estimatedPaddleTime": "About 4 hr at ordinary levels, longer with low water, scouting, headwind, or a slower group",
      "shuttle": "Stage the take-out at Edgewater Park's public boat-ramp area in Anderson, then return to Canoe Country after confirming permission, hours, fees, and shuttle terms for the private launch.",
      "permits": "No public-river paddling permit is known, but the put-in is private. Confirm Canoe Country arrangements and follow current City of Anderson park and parking rules at Edgewater.",
      "camping": "Treat this as a committed daylight day trip. Timberline Ranch and Canoe Country offer nearby private camping context, but neither is assumed to be an on-route landing or included overnight stop without advance arrangements.",
      "campingClassification": "nearby_basecamp",
      "summary": "Take Canoe Country's published Trip #4 from its Daleville launch to Edgewater Park in Anderson. The 11-mile route passes the Timberline Ranch and Mounds State Park corridor and includes many small rapids.",
      "accessCaveats": [
        "Canoe Country is a private launch with seasonal hours. Confirm private-boat access, fees, parking, and shuttle details directly.",
        "Edgewater Park is a city park with White River frontage, and Indiana STORET identifies the finish specifically as Edgewater Park Boat Ramp near the old waterworks dam site.",
        "Do not assume Timberline Ranch, Mounds State Park banks, or other private/property-manager frontage is an ordinary bailout or rest stop.",
        "The Muncie gauge is upstream of the full route. Check local radar and visually reassess at launch because downstream storms can alter conditions first.",
        "The outing is long enough that food, water, daylight, and a reliable vehicle shuttle should be settled before launching."
      ],
      "watchFor": [
        "The many small rapids noted by Canoe Country, especially where waves, rocks, and bridge current strengthen at higher stages.",
        "Stage below 4.00 ft, when scraping and slow progress become more likely, or 5.50 ft and higher, when Canoe Country closes.",
        "Fresh wood, strainers, bridge debris, outside-bend current, thunderstorms, and fast-rising muddy water.",
        "Fatigue, private banks, limited confirmed bailout options, and missing the Edgewater Park boat-ramp finish."
      ]
    },
    "accessPoints": [
      {
        "id": "canoe-country-launch",
        "name": "Canoe Country launch",
        "latitude": 40.132438,
        "longitude": -85.55517,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Private outfitter launch; advance confirmation is required."
      },
      {
        "id": "edgewater-park-boat-ramp",
        "name": "Edgewater Park Boat Ramp",
        "latitude": 40.1039725,
        "longitude": -85.6683267,
        "mileFromStart": 11,
        "segmentKind": "creek",
        "note": "Public City of Anderson park finish at the named boat-ramp area."
      }
    ]
  },
  "east-fork-white-river-columbus-azalia": {
    "putIn": {
      "id": "columbus-dnr-east-fork-ramp",
      "name": "Columbus DNR boat ramp",
      "latitude": 39.1987,
      "longitude": -85.9255
    },
    "takeOut": {
      "id": "azalia-dnr-county-road-800-south",
      "name": "Azalia DNR Public Access Site / County Road 800 South",
      "latitude": 39.0850524,
      "longitude": -85.8602589
    },
    "logistics": {
      "distanceLabel": "About 11.5 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr depending on flow, stops, and channel conditions",
      "shuttle": "Stage the Azalia take-out first, then drive to the Columbus DNR ramp. The Hoosier Canoe & Kayak Club describes an approximately 20-mile road shuttle.",
      "permits": "No route-specific permit was identified. Follow current Indiana DNR access rules, boating regulations, and PFD requirements.",
      "camping": "Treat this as a daylight day trip. No route camping package was verified and private-bank camping is not supported.",
      "campingClassification": "none",
      "summary": "Launch at the Columbus DNR ramp and finish at the Azalia DNR access beside County Road 800 South. Use the direct Columbus gauge and the conservative 320 cfs minimum-only reference, then make a same-day call on rising water, debris, and traffic.",
      "accessCaveats": [
        "The club places the Columbus ramp 500 feet downstream of the SR 46 bridge; confirm current DNR signage, parking, and ramp before launching.",
        "The Azalia access is beside the County Road 800 South bridge; confirm current access and parking before leaving a vehicle.",
        "Do not treat informal sandbars or private banks as legal take-outs."
      ],
      "watchFor": [
        "Rapidly rising or muddy water",
        "Floating debris and strainers after storms",
        "Airboats and motorboats",
        "Shallow split channels and sandbars",
        "Cut banks and riprap"
      ]
    },
    "accessPoints": [
      {
        "id": "columbus-dnr-east-fork-ramp",
        "name": "Columbus DNR boat ramp",
        "latitude": 39.1987,
        "longitude": -85.9255,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Map anchor based on USGS station location and club directions placing the ramp 500 feet downstream of SR 46; field-verify."
      },
      {
        "id": "azalia-dnr-county-road-800-south",
        "name": "Azalia DNR Public Access Site / County Road 800 South",
        "latitude": 39.0850524,
        "longitude": -85.8602589,
        "mileFromStart": 11.5,
        "segmentKind": "creek",
        "note": "Coordinate anchored by the USGS County Road 800 South site."
      }
    ]
  },
  "iroquois-river-lairds-landing-newton-fairgrounds": {
    "putIn": {"id": "lairds-landing-iroquois", "name": "Laird's Landing", "latitude": 40.934255, "longitude": -87.127682},
    "takeOut": {"id": "newton-county-fairgrounds-iroquois", "name": "Newton County Fairgrounds bridge access", "latitude": 40.820833, "longitude": -87.464333},
    "logistics": {
      "distanceLabel": "About 32 mi",
      "estimatedPaddleTime": "About 8 to 13 hours at the published slow-to-fast pace; plan a full daylight window and conservative turnaround policy",
      "shuttle": "Stage the Newton County Fairgrounds finish first, then return to Laird's Landing. Confirm both access points, parking, fairgrounds operations, and a current vehicle shuttle because the route has no assumed public intermediate take-outs.",
      "permits": "No route-specific permit was identified. Follow Indiana boating/PFD rules, current county access signs, and the named public-access boundaries; do not use private highlighted take-outs without permission.",
      "camping": "The Newton County Fairgrounds has nearby camping context, but confirm current fairgrounds availability and launch/parking terms before relying on it. Treat the river route itself as a daylight trip with no on-water camping.",
      "campingClassification": "nearby_basecamp",
      "summary": "Long one-way Upper Iroquois run using the only designated public endpoints listed by the watershed canoe chart.",
      "accessCaveats": [
        "The canoe chart identifies Laird's Landing and Newton Fairgrounds as the only designated public access points; other chart entries are private/permission-only or mile markers.",
        "The fairgrounds bridge is a committed finish near Kentland. Confirm current boat-launch, parking, and event-season restrictions before leaving a vehicle.",
        "Local watershed materials warn of E. coli/nutrient concerns and limited access; do not swim or drink from the river and check current advisories.",
        "The guide warns of rapid rises, logjams, and changing conditions. A 32-mile run should not be launched late or without a reliable bailout/emergency plan."
      ],
      "watchFor": [
        "USGS stage below 3.75 ft (low-water gray), 6–12 ft (yellow experienced-only), or above 12 ft (red danger)",
        "Rapid storm rises, fresh logjams, bridge debris, muddy water, and cold water",
        "Private banks and missing the designated public finish",
        "Water-quality advisories and insufficient daylight for the full one-way distance"
      ]
    },
    "accessPoints": [
      {"id": "lairds-landing-iroquois", "name": "Laird's Landing", "latitude": 40.934255, "longitude": -87.127682, "mileFromStart": 0, "segmentKind": "creek", "note": "Designated public upstream access."},
      {"id": "newton-county-fairgrounds-iroquois", "name": "Newton County Fairgrounds bridge access", "latitude": 40.820833, "longitude": -87.464333, "mileFromStart": 32, "segmentKind": "creek", "note": "Designated public finish per the canoe chart; confirm current fairgrounds access."}
    ]
  }
};
