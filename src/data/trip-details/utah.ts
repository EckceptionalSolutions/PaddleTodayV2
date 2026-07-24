// State-scoped route data. Keep entries in route-family and downstream order.
import type { RiverTripDetails } from '../../lib/types';

export const utahRiverTripDetails: Record<string, RiverTripDetails> = {
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
