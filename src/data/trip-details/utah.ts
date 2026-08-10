// State-scoped route data. Keep entries in route-family and downstream order.
import type { RiverTripDetails } from '../../lib/types';

export const utahRiverTripDetails: Record<string, RiverTripDetails> = {
  "ogden-river-lorin-farr-crystal-wave": {
    "putIn": {
      "id": "lorin-farr-park-ogden-river",
      "name": "Lorin Farr Park / Ogden River put-in",
      "latitude": 41.236,
      "longitude": -111.96
    },
    "takeOut": {
      "id": "crystal-wave-kayak-park",
      "name": "Crystal Wave Kayak Park take-out",
      "latitude": 41.233,
      "longitude": -111.982
    },
    "logistics": {
      "distanceLabel": "About 1.3 mi",
      "estimatedPaddleTime": "About 30 min to 1 hr 15 min for a prepared group, longer with scouting, surf laps, or low-water scraping",
      "shuttle": "Stage the take-out at Crystal Wave / the 20th Street pond area first, then drive back to Lorin Farr Park. Walk the take-out and any bridge/wood concerns before launching because this is a short urban run with limited margin for drifting past the planned finish.",
      "permits": "No route-specific private paddling permit is known. Use the public parkway access points, obey Ogden City park/trail hours and signs, wear PFDs, and do not block park, trail, or business parking while staging.",
      "camping": "No route camping. Ogden City code prohibits camping on public property outside approved campgrounds, and this short urban parkway section should be planned as a same-day lap only.",
      "campingClassification": "none",
      "summary": "Launch at Lorin Farr Park and take out at Crystal Wave for the short Ogden River town section. Use the Gibson Avenue gauge, favor 150-520 cfs, and scout bridges, wood, surf features, and the finish before committing.",
      "accessCaveats": [
        "American Whitewater provides the implementation coordinates for the put-in and take-out, while Ogden City and Weber State corroborate the public Lorin Farr-to-Crystal-Wave corridor.",
        "The put-in coordinate is an AW river/access anchor for the Lorin Farr town-section start, not a surveyed ramp edge. Use the obvious legal parkway/river access path and current signs on arrival.",
        "The take-out coordinate is an AW Crystal Wave access anchor near the 20th Street / Wall Avenue corridor. Identify the actual landing and carry path before launching so the group does not drift into the woodier downstream reach.",
        "AW says driving is no longer allowed along the river near the area just below Crystal Wave. Plan the carry to the legal parking area instead of trying to drive to the water.",
        "Private and business-adjacent land, parkway users, anglers, and city maintenance can all affect practical access on a given day."
      ],
      "watchFor": [
        "Class II+ waves and ledges, including the Crystal Wave feature and other urban surf spots.",
        "Lincoln Avenue bridge clearance. AW says levels over about 520 cfs make Lincoln a portage issue and notes about two feet of clearance around 550 cfs.",
        "Fishhooks, bushes, bridge debris, strainers, and the riverwide wood AW reports a few hundred yards below Crystal Wave.",
        "The normal route ends at Crystal Wave. Continuing downstream requires separate scouting for brushy meanders, sweepers, the Weber confluence, and a large diversion dam farther downstream.",
        "Urban runoff/water-quality concerns, thunderstorms, fast changes after rain or dam/irrigation operations, and busy trail/park users around both endpoints."
      ]
    },
    "accessPoints": [
      {
        "id": "lorin-farr-park-ogden-river",
        "name": "Lorin Farr Park / Ogden River put-in",
        "latitude": 41.236,
        "longitude": -111.96,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; AW coordinate is an access/river anchor, with the actual legal entry path verified on arrival."
      },
      {
        "id": "crystal-wave-kayak-park",
        "name": "Crystal Wave Kayak Park take-out",
        "latitude": 41.233,
        "longitude": -111.982,
        "mileFromStart": 1.3,
        "segmentKind": "creek",
        "note": "Default take-out at the Crystal Wave finish; scout the carry path and avoid drifting into downstream wood."
      }
    ]
  },
  "colorado-river-hittle-bottom-takeout-beach": {
    "putIn": {
      "id": "hittle-bottom-recreation-site",
      "name": "Hittle Bottom Recreation Site boat ramp",
      "latitude": 38.7607,
      "longitude": -109.326
    },
    "takeOut": {
      "id": "takeout-beach-landing",
      "name": "Takeout Beach Landing",
      "latitude": 38.66174,
      "longitude": -109.50074
    },
    "logistics": {
      "distanceLabel": "About 13.0 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr for a day run; longer with low water, wind, groups, or an overnight plan",
      "shuttle": "Stage the take-out at Takeout Beach, then drive Highway 128 back to Hittle Bottom. The corridor is popular with outfitters and private boaters, but groups should verify BLM ramp conditions, parking, and river traffic before committing.",
      "permits": "No normal day-use river permit is listed for the Moab Daily, but BLM fee sites, campground fees, group-site reservations, and downstream permit boundaries can apply. Confirm current Moab Field Office rules before any overnight or extended trip.",
      "camping": "Camping is allowed only within the BLM rules shown on the Moab Daily map: on river right, use designated sites and sandbars; on river left, use developed campgrounds. Overnight trips need firepans and a washable reusable toilet system or approved disposable bags in a leakproof container.",
      "campingClassification": "sandbar_or_gravel_bar",
      "summary": "Launch at Hittle Bottom and take out at Takeout Beach for the classic 13-mile Moab Daily / Fisher Towers section of the Colorado River. Expect scenic desert canyon paddling with named rapids that change from Class I to Class III as levels rise.",
      "accessCaveats": [
        "BLM maintains access facilities along the Daily stretch, including Hittle Bottom, Rocky Rapid / Ida Gulch, Sandy Beach, and Takeout Beach.",
        "Hittle Bottom is also a campground and fee-area access; do not block the boat ramp or campground traffic while rigging.",
        "Takeout Beach is the default finish before the slackwater toward Moab. The stored coordinate is an AW access-area/waterbody anchor that audited 111 ft from the matched flowline and within 50 ft of the NHD waterbody, so identify the actual landing/ramp on arrival.",
        "Use legal public river stops and BLM-managed camps only. Private land on the corridor is marked no camping on the BLM map."
      ],
      "watchFor": [
        "Rocky Rapid, Professor Creek Rapid, New Rapid, Onion Creek Rapid, White's Rapid, and Salt Wash Rapid.",
        "Class I-III behavior depending on season and flow; low water exposes rocks and higher water makes wave trains and holes stronger.",
        "PFD-wear requirement on the BLM map, spare propulsion, throwable PFD for boats over 16 feet, repair/bailing gear, and group first aid.",
        "Commercial rafts, private groups, roadside users, wind, heat, thunderstorms, and sparse services between managed access points.",
        "Overnight waste, firepan, trash pack-out, and 14-day river-trip limit rules."
      ]
    },
    "accessPoints": [
      {
        "id": "hittle-bottom-recreation-site",
        "name": "Hittle Bottom Recreation Site boat ramp",
        "latitude": 38.7607,
        "longitude": -109.326,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default put-in; BLM identifies Hittle Bottom as a landing, fee area, campground, and maintained Daily access."
      },
      {
        "id": "takeout-beach-landing",
        "name": "Takeout Beach Landing",
        "latitude": 38.66174,
        "longitude": -109.50074,
        "mileFromStart": 13,
        "segmentKind": "creek",
        "note": "Default take-out before the slackwater that continues toward Moab."
      }
    ]
  },
  "green-river-flaming-gorge-dam-little-hole": {
    "putIn": {
      "id": "spillway-boat-launch-area",
      "name": "Spillway Boat Launch Area below Flaming Gorge Dam",
      "latitude": 40.90885,
      "longitude": -109.422256
    },
    "takeOut": {
      "id": "little-hole-boat-launch-area",
      "name": "Little Hole Boat Launch Area",
      "latitude": 40.910719,
      "longitude": -109.315144
    },
    "logistics": {
      "distanceLabel": "About 7.0 mi",
      "estimatedPaddleTime": "About 2 hr to 3.5 hr, longer with fishing traffic, wind, or low release",
      "shuttle": "Stage the take-out at Little Hole, then drive back to the Spillway Boat Launch below Flaming Gorge Dam. Local outfitters commonly support shuttles, but private groups should still verify ramp access, pass requirements, and vehicle logistics before launching.",
      "permits": "Private boaters do not need a route-specific river permit for Section A, but a Flaming Gorge recreation use pass is required at Spillway and Little Hole. Commercial outfitters have separate permit requirements.",
      "camping": "No on-route camping is allowed on Section A between Spillway and Little Hole. Treat this as a day trip and use only designated downstream camps if you intentionally continue into Section B with the proper plan and required toilet system.",
      "summary": "Launch at Spillway Boat Launch below Flaming Gorge Dam and take out seven miles downstream at Little Hole for the Green River A Section. This is a cold, dam-release tailwater with Class I-II rapids, clear water, heavy fishing traffic, and federal fee-area rules.",
      "accessCaveats": [
        "Both endpoints are Ashley National Forest / Flaming Gorge National Recreation Area boat-launch facilities with published coordinates and fee/pass requirements.",
        "Spillway can be very busy with commercial drift boats and has a long, steep stair/carry between parking and the launch area. Do not block the ramp while rigging.",
        "Little Hole has multiple ramps, restrooms, picnic areas, and potable water seasonally, but busy fishing days can make landing and loading slow.",
        "Utah DWR stream-access guidance was rechecked for this run. Stay with the public launches, trail corridor, and legal public stops; do not assume private-bank access away from the managed corridor."
      ],
      "watchFor": [
        "Cold tailwater and release changes from Flaming Gorge Dam; the river can rise quickly and push harder even near shore.",
        "Required river-running safety gear: wearable PFD where required, no inflatable PFDs in those required-wear sections, bailer, throw rope, and spare oar or paddle.",
        "Class I-II wave trains and swift current that are friendly for prepared paddlers but not a lazy tube float.",
        "Commercial dory and guide traffic, anglers wading from shore, and congestion at both ramps.",
        "No camping, fires, or horse use on Section A; mountain biking on the Little Hole trail is seasonally restricted.",
        "New Zealand mudsnail decontamination guidance applies to boats, wading boots, and river gear."
      ]
    }
  }
};
