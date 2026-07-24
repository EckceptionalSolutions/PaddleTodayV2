// State-scoped route data. Keep entries in route-family and downstream order.
import type { RiverTripDetails } from '../../lib/types';

export const arkansasRiverTripDetails: Record<string, RiverTripDetails> = {
  "bayou-deview-benson-creek-bank-of-brinkley": {
    "putIn": {
      "id": "benson-creek-access",
      "name": "Benson Creek Access",
      "latitude": 34.93569,
      "longitude": -91.24092
    },
    "takeOut": {
      "id": "bank-of-brinkley-access",
      "name": "Bank of Brinkley Access",
      "latitude": 34.810583,
      "longitude": -91.297333
    },
    "logistics": {
      "distanceLabel": "About 15.2 mi",
      "estimatedPaddleTime": "About 8 hr to 12 hr, potentially longer if route-finding, wind, wood, or a primitive overnight stop breaks up the full trail",
      "shuttle": "Stage the take-out at Bank of Brinkley Access, then drive back to Benson Creek Access. Carry the AGFC georeferenced map before launching because this full-trail route uses the entire access chain and leaves no room for casual navigation mistakes.",
      "permits": "No route-specific paddling permit is known. Use the named public AGFC accesses, follow Arkansas boating and PFD rules, and respect any WMA, refuge, gate, or road postings.",
      "camping": "Free first-come campsites marked by blue paint are available on Dagmar WMA, making this full 15.2-mile trail the clearest Bayou DeView route for a conservative primitive overnight split. The sites have no amenities, and camping is not allowed on Cache River National Wildlife Refuge.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Benson Creek Access and take out at Bank of Brinkley Access for the full Bayou DeView Water Trail. The water stays flat, but this is a serious floodplain-navigation route: use the Brinkley gauge, carry the AGFC map offline, and treat the day length and campsite plan as part of the safety decision.",
      "accessCaveats": [
        "Benson Creek and Bank of Brinkley are named public AGFC Bayou DeView Water Trail accesses reached by rural WMA or refuge roads rather than by developed park marinas.",
        "AGFC says the trail needs about 14 ft or higher to paddle and that the Dagmar Road gate closes at 17 ft, so verify both gauge freshness and road access before launching.",
        "The main channel is not always distinct. Carry the georeferenced map or equivalent offline navigation before leaving cell coverage.",
        "Stay with the named public accesses and avoid private banks, fences, signs, and purple-painted property."
      ],
      "watchFor": [
        "Water below about 14 ft, when disconnected channels and shallow obstructions can turn the full trail into a very slow route-finding problem.",
        "Water approaching or above 17 ft, when AGFC says the access roads can close and high-water timber travel becomes dangerous.",
        "Floating logs, strainers, wind exposure in open pockets, and losing the marked route through indistinct floodplain channels.",
        "Very long-day fatigue, heat, insects, limited bailout options late in the route, and the need to keep any primitive camp plan inside Dagmar WMA rather than on Cache River NWR."
      ]
    },
    "accessPoints": [
      {
        "id": "benson-creek-access",
        "name": "Benson Creek Access",
        "latitude": 34.93569,
        "longitude": -91.24092,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream access for the full Bayou DeView Water Trail."
      },
      {
        "id": "dark-corner-access",
        "name": "Dark Corner Access",
        "latitude": 34.91998,
        "longitude": -91.25798,
        "mileFromStart": 2.1,
        "segmentKind": "creek",
        "note": "Intermediate public access and bailout in the upper half of the trail."
      },
      {
        "id": "hickson-lake-access",
        "name": "Hickson Lake Access",
        "latitude": 34.89039,
        "longitude": -91.29826,
        "mileFromStart": 6.5,
        "segmentKind": "creek",
        "note": "Main mid-route access where the trail enters the lower Dagmar half."
      },
      {
        "id": "rock-island-road-access",
        "name": "Rock Island Road Access",
        "latitude": 34.85911,
        "longitude": -91.29025,
        "mileFromStart": 9.4,
        "segmentKind": "creek",
        "note": "Lower-middle public access and practical shorter-route finish if the full trail needs to be cut short."
      },
      {
        "id": "apple-lake-access",
        "name": "Apple Lake Access",
        "latitude": 34.84159,
        "longitude": -91.282,
        "mileFromStart": 10.9,
        "segmentKind": "creek",
        "note": "Intermediate lower access with seasonal closure from Nov. 1 through Feb. 15."
      },
      {
        "id": "bank-of-brinkley-access",
        "name": "Bank of Brinkley Access",
        "latitude": 34.810583,
        "longitude": -91.297333,
        "mileFromStart": 15.2,
        "segmentKind": "creek",
        "note": "Default downstream access for the full trail."
      }
    ]
  },
  "bayou-deview-benson-creek-rock-island-road": {
    "putIn": {
      "id": "benson-creek-access",
      "name": "Benson Creek Access",
      "latitude": 34.93569,
      "longitude": -91.24092
    },
    "takeOut": {
      "id": "rock-island-road-access",
      "name": "Rock Island Road Access",
      "latitude": 34.85911,
      "longitude": -91.29025
    },
    "logistics": {
      "distanceLabel": "About 9.4 mi",
      "estimatedPaddleTime": "About 5 hr to 7 hr, longer if route-finding, wood, or low water slows the floodplain travel",
      "shuttle": "Stage the take-out at Rock Island Road Access, then drive back to Benson Creek Access. Carry the AGFC georeferenced map before launching because this longer continuation crosses multiple indistinct floodplain turns and side-channel decisions.",
      "permits": "No route-specific paddling permit is known. Use the named public AGFC accesses, follow Arkansas boating and PFD rules, and respect any WMA, refuge, gate, or road postings.",
      "camping": "AGFC still treats nearby Dagmar WMA camping as the legal overnight support, but this continuation is still most defensible as a long day float unless the group separately confirms a primitive camp plan. Camping is not allowed on Cache River National Wildlife Refuge.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Benson Creek Access and take out at Rock Island Road Access for a longer upper-to-middle Bayou DeView day. This is still flatwater, but it is not a casual paddle: use the Brinkley gauge, carry the AGFC map, and expect a real route-finding commitment.",
      "accessCaveats": [
        "Benson Creek and Rock Island Road are named public AGFC Bayou DeView Water Trail accesses reached by rural WMA roads rather than by developed park marinas.",
        "AGFC says the trail needs about 14 ft or higher to paddle and that the Dagmar Road gate closes at 17 ft, so verify both gauge freshness and road access before launching.",
        "The main channel is not always distinct. Carry the georeferenced map or equivalent offline navigation before leaving cell coverage.",
        "Stay with the named public accesses and avoid private banks, fences, signs, and purple-painted property."
      ],
      "watchFor": [
        "Water below about 14 ft, when shallow obstructions and disconnected lower channels become more likely.",
        "Water approaching or above 17 ft, when AGFC says the access roads can close and high-water timber travel becomes more dangerous.",
        "Floating logs, strainers, wind exposure in open reaches, and missing the marked route through the lower cypress-tupelo corridor."
      ]
    },
    "accessPoints": [
      {
        "id": "benson-creek-access",
        "name": "Benson Creek Access",
        "latitude": 34.93569,
        "longitude": -91.24092,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream access for this longer upper-to-middle continuation."
      },
      {
        "id": "dark-corner-access",
        "name": "Dark Corner Access",
        "latitude": 34.91998,
        "longitude": -91.25798,
        "mileFromStart": 2.1,
        "segmentKind": "creek",
        "note": "Intermediate public access and bailout before the Hickson Lake half of the route."
      },
      {
        "id": "hickson-lake-access",
        "name": "Hickson Lake Access",
        "latitude": 34.89039,
        "longitude": -91.29826,
        "mileFromStart": 6.5,
        "segmentKind": "creek",
        "note": "Mid-route public access where the corridor transitions into the lower Dagmar half."
      },
      {
        "id": "rock-island-road-access",
        "name": "Rock Island Road Access",
        "latitude": 34.85911,
        "longitude": -91.29025,
        "mileFromStart": 9.4,
        "segmentKind": "creek",
        "note": "Default downstream access for this longer upper-to-middle continuation."
      }
    ]
  },
  "bayou-deview-hickson-lake-rock-island-road": {
    "putIn": {
      "id": "hickson-lake-access",
      "name": "Hickson Lake Access",
      "latitude": 34.89039,
      "longitude": -91.29826
    },
    "takeOut": {
      "id": "rock-island-road-access",
      "name": "Rock Island Road Access",
      "latitude": 34.85911,
      "longitude": -91.29025
    },
    "logistics": {
      "distanceLabel": "About 2.9 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr, longer if route-finding or wood slows the day",
      "shuttle": "Stage the take-out at Rock Island Road Access, then drive back to Hickson Lake Access. Carry the AGFC georeferenced map before launching because the trail markers do not remove the need for active floodplain navigation.",
      "permits": "No route-specific paddling permit is known. Use the named public AGFC accesses, follow Arkansas boating and PFD rules, and respect any WMA, refuge, gate, or road postings.",
      "camping": "Free first-come campsites marked by blue paint are available on Dagmar WMA, but this route is short enough to treat camping as a separate basecamp plan rather than part of the float. Camping is not allowed on Cache River National Wildlife Refuge.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Hickson Lake Access and take out at Rock Island Road Access for a shorter middle Bayou DeView day. Even on this short split, use the Brinkley gauge and the georeferenced trail map rather than assuming a simple one-channel bayou.",
      "accessCaveats": [
        "Hickson Lake and Rock Island Road are named public AGFC Bayou DeView Water Trail accesses reached by WMA roads rather than by developed park marinas.",
        "AGFC says the trail needs about 14 ft or higher to paddle and that the Dagmar Road gate closes at 17 ft, so verify both gauge freshness and road access before launching.",
        "The main channel is not always distinct. Carry the georeferenced map or equivalent offline navigation before leaving cell coverage.",
        "Stay with the named public accesses and avoid private banks, fences, signs, and purple-painted property."
      ],
      "watchFor": [
        "Water below about 14 ft, when disconnected channels and shallow obstructions become more likely.",
        "Water approaching or above 17 ft, when AGFC says the gate on Dagmar Road closes and high-water timber travel becomes more dangerous.",
        "Floating logs, strainers, and losing the marked route through indistinct floodplain channels."
      ]
    },
    "accessPoints": [
      {
        "id": "hickson-lake-access",
        "name": "Hickson Lake Access",
        "latitude": 34.89039,
        "longitude": -91.29826,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream access for this middle Bayou DeView split."
      },
      {
        "id": "rock-island-road-access",
        "name": "Rock Island Road Access",
        "latitude": 34.85911,
        "longitude": -91.29025,
        "mileFromStart": 2.9,
        "segmentKind": "creek",
        "note": "Default downstream access for this middle Bayou DeView split."
      }
    ]
  },
  "bayou-deview-rock-island-road-apple-lake": {
    "putIn": {
      "id": "rock-island-road-access",
      "name": "Rock Island Road Access",
      "latitude": 34.85911,
      "longitude": -91.29025
    },
    "takeOut": {
      "id": "apple-lake-access",
      "name": "Apple Lake Access",
      "latitude": 34.84159,
      "longitude": -91.282
    },
    "logistics": {
      "distanceLabel": "About 1.5 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr, longer if low water, wood, or navigation checks slow the route",
      "shuttle": "Stage the take-out at Apple Lake Access, then drive back to Rock Island Road Access. Carry the AGFC georeferenced map even on this short segment because the floodplain channels are not always obvious.",
      "permits": "No route-specific paddling permit is known. Use the named public AGFC accesses, follow Arkansas boating and PFD rules, and respect any WMA, refuge, gate, or road postings.",
      "camping": "Treat this as a short day float. Free first-come campsites marked by blue paint are available elsewhere on Dagmar WMA, but Apple Lake access is closed from Nov. 1 through Feb. 15 and camping is not allowed on Cache River National Wildlife Refuge.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Rock Island Road Access and take out at Apple Lake Access for the shortest Bayou DeView option in the family. This still needs the Brinkley gauge, WMA access check, and an offline map before launch.",
      "accessCaveats": [
        "Rock Island Road and Apple Lake are named public AGFC Bayou DeView Water Trail accesses on WMA roads rather than full-service launch parks.",
        "AGFC says the trail needs about 14 ft or higher to paddle and that the Dagmar Road gate closes at 17 ft, so verify both gauge freshness and road access before launching.",
        "Apple Lake Waterfowl Rest Area is closed to access from Nov. 1 through Feb. 15.",
        "Stay with the named public accesses and avoid private banks, fences, signs, and purple-painted property."
      ],
      "watchFor": [
        "Water below about 14 ft, when shallow obstructions and disconnected side channels become more likely.",
        "Water approaching or above 17 ft, when AGFC says the gate on Dagmar Road closes and high-water timber travel becomes more dangerous.",
        "Floating logs, strainers, and missing the marked route in indistinct cypress-tupelo channels."
      ]
    },
    "accessPoints": [
      {
        "id": "rock-island-road-access",
        "name": "Rock Island Road Access",
        "latitude": 34.85911,
        "longitude": -91.29025,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream access for this short lower-middle Bayou DeView split."
      },
      {
        "id": "apple-lake-access",
        "name": "Apple Lake Access",
        "latitude": 34.84159,
        "longitude": -91.282,
        "mileFromStart": 1.5,
        "segmentKind": "creek",
        "note": "Default downstream access for this short lower-middle Bayou DeView split."
      }
    ]
  },
  "bayou-deview-apple-lake-bank-of-brinkley": {
    "putIn": {
      "id": "apple-lake-access",
      "name": "Apple Lake Access",
      "latitude": 34.84159,
      "longitude": -91.282
    },
    "takeOut": {
      "id": "bank-of-brinkley-access",
      "name": "Bank of Brinkley Access",
      "latitude": 34.810583,
      "longitude": -91.297333
    },
    "logistics": {
      "distanceLabel": "About 4.3 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, longer if route-finding, wind, or wood slows the lower floodplain channels",
      "shuttle": "Stage the take-out at Bank of Brinkley Access, then drive back to Apple Lake Access. Carry the AGFC georeferenced map before launching because the lower bayou still requires active navigation.",
      "permits": "No route-specific paddling permit is known. Use the named public AGFC accesses, follow Arkansas boating and PFD rules, and respect any WMA, refuge, gate, or road postings.",
      "camping": "Free first-come campsites marked by blue paint are available on Dagmar WMA upstream of the route, but this lower segment is usually a day trip and camping is not allowed on Cache River National Wildlife Refuge near the Brinkley end.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Apple Lake Access and take out at Bank of Brinkley Access for the lower Bayou DeView segment. Use the Brinkley gauge, verify Apple Lake seasonal access, and carry the AGFC map because the lower channel is still not obvious at every turn.",
      "accessCaveats": [
        "Apple Lake and Bank of Brinkley are named public AGFC Bayou DeView Water Trail accesses reached by refuge or WMA roads rather than full-service launch facilities.",
        "AGFC says the trail needs about 14 ft or higher to paddle and that the Dagmar Road gate closes at 17 ft, so verify both gauge freshness and road access before launching.",
        "Apple Lake Waterfowl Rest Area is closed to access from Nov. 1 through Feb. 15.",
        "Stay with the named public accesses and avoid private banks, fences, signs, and purple-painted property."
      ],
      "watchFor": [
        "Water below about 14 ft, when shallow obstructions and disconnected lower channels become more likely.",
        "Water approaching or above 17 ft, when AGFC says the access roads can close and high-water timber travel becomes more dangerous.",
        "Floating logs, strainers, wind exposure in open reaches, and missing the marked route through the lower cypress-tupelo corridor."
      ]
    },
    "accessPoints": [
      {
        "id": "apple-lake-access",
        "name": "Apple Lake Access",
        "latitude": 34.84159,
        "longitude": -91.282,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream access for this lower Bayou DeView split."
      },
      {
        "id": "bank-of-brinkley-access",
        "name": "Bank of Brinkley Access",
        "latitude": 34.810583,
        "longitude": -91.297333,
        "mileFromStart": 4.3,
        "segmentKind": "creek",
        "note": "Default downstream access for this lower Bayou DeView split."
      }
    ]
  },
  "bayou-deview-hickson-lake-bank-of-brinkley": {
    "putIn": {
      "id": "hickson-lake-access",
      "name": "Hickson Lake Access",
      "latitude": 34.89039,
      "longitude": -91.29826
    },
    "takeOut": {
      "id": "bank-of-brinkley-access",
      "name": "Bank of Brinkley Access",
      "latitude": 34.810583,
      "longitude": -91.297333
    },
    "logistics": {
      "distanceLabel": "About 8.7 mi",
      "estimatedPaddleTime": "About 5 hr to 7 hr, longer if route-finding, wind, or wood slows the lower floodplain channels",
      "shuttle": "Stage the take-out at Bank of Brinkley Access, then drive back to Hickson Lake Access. Carry the AGFC georeferenced map before launching because this lower-half continuation still requires active navigation through multiple access-to-access decisions.",
      "permits": "No route-specific paddling permit is known. Use the named public AGFC accesses, follow Arkansas boating and PFD rules, and respect any WMA, refuge, gate, or road postings.",
      "camping": "AGFC still treats nearby Dagmar WMA camping as the legal overnight support, but this lower-half continuation is still usually handled as a long day float unless the group separately confirms a primitive camp plan. Camping is not allowed on Cache River National Wildlife Refuge.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Hickson Lake Access and take out at Bank of Brinkley Access for a longer lower-half Bayou DeView route. Use the Brinkley gauge, verify Apple Lake seasonal access, and carry the AGFC map because the lower channel remains indistinct and wood-prone even on an in-range day.",
      "accessCaveats": [
        "Hickson Lake and Bank of Brinkley are named public AGFC Bayou DeView Water Trail accesses reached by WMA or refuge roads rather than by full-service launch parks.",
        "AGFC says the trail needs about 14 ft or higher to paddle and that the Dagmar Road gate closes at 17 ft, so verify both gauge freshness and road access before launching.",
        "Apple Lake Waterfowl Rest Area is closed to access from Nov. 1 through Feb. 15, so a mid-route bailout or staged vehicle there is not always available.",
        "Stay with the named public accesses and avoid private banks, fences, signs, and purple-painted property."
      ],
      "watchFor": [
        "Water below about 14 ft, when shallow obstructions and disconnected lower channels become more likely.",
        "Water approaching or above 17 ft, when AGFC says the access roads can close and high-water timber travel becomes more dangerous.",
        "Floating logs, strainers, wind exposure in open reaches, and missing the marked route through the lower cypress-tupelo corridor.",
        "Lower-day fatigue, limited bailout options after Apple Lake, and the transition toward Cache River NWR where camping remains prohibited."
      ]
    },
    "accessPoints": [
      {
        "id": "hickson-lake-access",
        "name": "Hickson Lake Access",
        "latitude": 34.89039,
        "longitude": -91.29826,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream access for this lower-half Bayou DeView continuation."
      },
      {
        "id": "rock-island-road-access",
        "name": "Rock Island Road Access",
        "latitude": 34.85911,
        "longitude": -91.29025,
        "mileFromStart": 2.9,
        "segmentKind": "creek",
        "note": "Intermediate public access and bailout before the Apple Lake leg."
      },
      {
        "id": "apple-lake-access",
        "name": "Apple Lake Access",
        "latitude": 34.84159,
        "longitude": -91.282,
        "mileFromStart": 4.4,
        "segmentKind": "creek",
        "note": "Intermediate lower access with seasonal closure from Nov. 1 through Feb. 15."
      },
      {
        "id": "bank-of-brinkley-access",
        "name": "Bank of Brinkley Access",
        "latitude": 34.810583,
        "longitude": -91.297333,
        "mileFromStart": 8.7,
        "segmentKind": "creek",
        "note": "Default downstream access for this longer lower-half continuation."
      }
    ]
  },
  "bayou-deview-hickson-lake-apple-lake": {
    "putIn": {
      "id": "hickson-lake-access",
      "name": "Hickson Lake Access",
      "latitude": 34.89039,
      "longitude": -91.29826
    },
    "takeOut": {
      "id": "apple-lake-access",
      "name": "Apple Lake Access",
      "latitude": 34.84159,
      "longitude": -91.282
    },
    "logistics": {
      "distanceLabel": "About 4.4 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr, longer if route-finding, wood, or low water slows the floodplain travel",
      "shuttle": "Stage the take-out at Apple Lake Access, then drive back to Hickson Lake Access. Carry the AGFC georeferenced map before launching because even this middle continuation still crosses multiple indistinct floodplain turns and side-channel decisions.",
      "permits": "No route-specific paddling permit is known. Use the named public AGFC accesses, follow Arkansas boating and PFD rules, and respect any WMA, refuge, gate, or road postings.",
      "camping": "Free first-come campsites marked by blue paint are available on Dagmar WMA near the corridor, but this route is still most defensible as a day float rather than an overnight plan. Camping is not allowed on Cache River National Wildlife Refuge.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Hickson Lake Access and take out at Apple Lake Access for a mid-length Bayou DeView continuation. This is still flatwater, but it is not a casual paddle: use the Brinkley gauge, verify the Apple Lake seasonal rule, and carry the AGFC map.",
      "accessCaveats": [
        "Hickson Lake and Apple Lake are named public AGFC Bayou DeView Water Trail accesses reached by rural WMA roads rather than by developed park marinas.",
        "AGFC says the trail needs about 14 ft or higher to paddle and that the Dagmar Road gate closes at 17 ft, so verify both gauge freshness and road access before launching.",
        "Apple Lake Waterfowl Rest Area is closed to access from Nov. 1 through Feb. 15, so this route is not year-round even when the gauge looks fine.",
        "The main channel is not always distinct. Carry the georeferenced map or equivalent offline navigation before leaving cell coverage."
      ],
      "watchFor": [
        "Water below about 14 ft, when disconnected channels and shallow obstructions become more likely.",
        "Water approaching or above 17 ft, when AGFC says the access roads can close and high-water timber travel becomes more dangerous.",
        "Floating logs, strainers, wind exposure in open pockets, and losing the marked route through indistinct floodplain channels.",
        "Missing the Apple Lake finish because the launch sits behind the WRA entrance and seasonal-gate context rather than a large obvious downstream park."
      ]
    },
    "accessPoints": [
      {
        "id": "hickson-lake-access",
        "name": "Hickson Lake Access",
        "latitude": 34.89039,
        "longitude": -91.29826,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream access for this middle Bayou DeView continuation."
      },
      {
        "id": "rock-island-road-access",
        "name": "Rock Island Road Access",
        "latitude": 34.85911,
        "longitude": -91.29025,
        "mileFromStart": 2.9,
        "segmentKind": "creek",
        "note": "Intermediate public access and bailout before the Apple Lake leg."
      },
      {
        "id": "apple-lake-access",
        "name": "Apple Lake Access",
        "latitude": 34.84159,
        "longitude": -91.282,
        "mileFromStart": 4.4,
        "segmentKind": "creek",
        "note": "Default downstream access with seasonal closure from Nov. 1 through Feb. 15."
      }
    ]
  },
  "bayou-deview-rock-island-road-bank-of-brinkley": {
    "putIn": {
      "id": "rock-island-road-access",
      "name": "Rock Island Road Access",
      "latitude": 34.85911,
      "longitude": -91.29025
    },
    "takeOut": {
      "id": "bank-of-brinkley-access",
      "name": "Bank of Brinkley Access",
      "latitude": 34.810583,
      "longitude": -91.297333
    },
    "logistics": {
      "distanceLabel": "About 5.8 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr, longer if route-finding, wood, or wind slows the lower floodplain travel",
      "shuttle": "Stage the take-out at Bank of Brinkley Access, then drive back to Rock Island Road Access. Carry the AGFC georeferenced map before launching because this lower continuation still requires active navigation through Apple Lake and the lower cypress corridor.",
      "permits": "No route-specific paddling permit is known. Use the named public AGFC accesses, follow Arkansas boating and PFD rules, and respect any WMA, refuge, gate, or road postings.",
      "camping": "Free first-come campsites marked by blue paint are available on Dagmar WMA upstream, but this lower continuation is still usually handled as a day float. Camping is not allowed on Cache River National Wildlife Refuge.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Rock Island Road Access and take out at Bank of Brinkley Access for a lower Bayou DeView continuation. Use the Brinkley gauge, verify Apple Lake seasonal access, and carry the AGFC map because the lower channel remains indistinct and wood-prone even on an in-range day.",
      "accessCaveats": [
        "Rock Island Road and Bank of Brinkley are named public AGFC Bayou DeView Water Trail accesses reached by WMA or refuge roads rather than by full-service launch parks.",
        "AGFC says the trail needs about 14 ft or higher to paddle and that the Dagmar Road gate closes at 17 ft, so verify both gauge freshness and road access before launching.",
        "Apple Lake Waterfowl Rest Area is closed to access from Nov. 1 through Feb. 15, so a mid-route bailout or staged vehicle there is not always available.",
        "Stay with the named public accesses and avoid private banks, fences, signs, and purple-painted property."
      ],
      "watchFor": [
        "Water below about 14 ft, when shallow obstructions and disconnected lower channels become more likely.",
        "Water approaching or above 17 ft, when AGFC says the access roads can close and high-water timber travel becomes more dangerous.",
        "Floating logs, strainers, wind exposure in open reaches, and missing the marked route through the lower cypress-tupelo corridor.",
        "Lower-day fatigue, limited bailout options after Apple Lake, and the transition toward Cache River NWR where camping remains prohibited."
      ]
    },
    "accessPoints": [
      {
        "id": "rock-island-road-access",
        "name": "Rock Island Road Access",
        "latitude": 34.85911,
        "longitude": -91.29025,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream access for this lower Bayou DeView continuation."
      },
      {
        "id": "apple-lake-access",
        "name": "Apple Lake Access",
        "latitude": 34.84159,
        "longitude": -91.282,
        "mileFromStart": 1.5,
        "segmentKind": "creek",
        "note": "Intermediate public access with seasonal closure from Nov. 1 through Feb. 15."
      },
      {
        "id": "bank-of-brinkley-access",
        "name": "Bank of Brinkley Access",
        "latitude": 34.810583,
        "longitude": -91.297333,
        "mileFromStart": 5.8,
        "segmentKind": "creek",
        "note": "Default downstream access for this lower continuation."
      }
    ]
  },
  "bayou-deview-benson-creek-apple-lake": {
    "putIn": {
      "id": "benson-creek-access",
      "name": "Benson Creek Access",
      "latitude": 34.93569,
      "longitude": -91.24092
    },
    "takeOut": {
      "id": "apple-lake-access",
      "name": "Apple Lake Access",
      "latitude": 34.84159,
      "longitude": -91.282
    },
    "logistics": {
      "distanceLabel": "About 10.9 mi",
      "estimatedPaddleTime": "About 5.5 hr to 8 hr, longer if route-finding, wood, or low water slows the floodplain travel",
      "shuttle": "Stage the take-out at Apple Lake Access, then drive back to Benson Creek Access. Carry the AGFC georeferenced map before launching because this upper-to-lower continuation crosses multiple indistinct floodplain turns and side-channel decisions.",
      "permits": "No route-specific paddling permit is known. Use the named public AGFC accesses, follow Arkansas boating and PFD rules, and respect any WMA, refuge, gate, or road postings.",
      "camping": "Free first-come campsites marked by blue paint are available on Dagmar WMA near the lower half of the trail, but this continuation is still most defensible as a long day float unless the group separately confirms a primitive camp plan. Camping is not allowed on Cache River National Wildlife Refuge.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Benson Creek Access and take out at Apple Lake Access for a longer upper-to-lower Bayou DeView day. This is still flatwater, but it is not a casual paddle: use the Brinkley gauge, verify the Apple Lake seasonal rule, and expect a real route-finding commitment.",
      "accessCaveats": [
        "Benson Creek and Apple Lake are named public AGFC Bayou DeView Water Trail accesses reached by rural WMA roads rather than by developed park marinas.",
        "AGFC says the trail needs about 14 ft or higher to paddle and that the Dagmar Road gate closes at 17 ft, so verify both gauge freshness and road access before launching.",
        "Apple Lake Waterfowl Rest Area is closed to access from Nov. 1 through Feb. 15, so this route is not year-round even when the gauge looks fine.",
        "The main channel is not always distinct. Carry the georeferenced map or equivalent offline navigation before leaving cell coverage."
      ],
      "watchFor": [
        "Water below about 14 ft, when disconnected channels and shallow obstructions become more likely.",
        "Water approaching or above 17 ft, when AGFC says the access roads can close and high-water timber travel becomes more dangerous.",
        "Floating logs, strainers, wind exposure in open pockets, and losing the marked route through indistinct floodplain channels.",
        "Long-day fatigue, heat, insects, and limited bailout options once the group commits below Hickson Lake toward the Apple Lake finish."
      ]
    },
    "accessPoints": [
      {
        "id": "benson-creek-access",
        "name": "Benson Creek Access",
        "latitude": 34.93569,
        "longitude": -91.24092,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream access for this longer upper-to-lower Bayou DeView continuation."
      },
      {
        "id": "dark-corner-access",
        "name": "Dark Corner Access",
        "latitude": 34.91998,
        "longitude": -91.25798,
        "mileFromStart": 2.1,
        "segmentKind": "creek",
        "note": "Intermediate public access and bailout before the Hickson Lake half of the route."
      },
      {
        "id": "hickson-lake-access",
        "name": "Hickson Lake Access",
        "latitude": 34.89039,
        "longitude": -91.29826,
        "mileFromStart": 6.5,
        "segmentKind": "creek",
        "note": "Mid-route public access where the corridor transitions into the lower Dagmar half."
      },
      {
        "id": "rock-island-road-access",
        "name": "Rock Island Road Access",
        "latitude": 34.85911,
        "longitude": -91.29025,
        "mileFromStart": 9.4,
        "segmentKind": "creek",
        "note": "Intermediate public access and bailout before the Apple Lake leg."
      },
      {
        "id": "apple-lake-access",
        "name": "Apple Lake Access",
        "latitude": 34.84159,
        "longitude": -91.282,
        "mileFromStart": 10.9,
        "segmentKind": "creek",
        "note": "Default downstream access with seasonal closure from Nov. 1 through Feb. 15."
      }
    ]
  },
  "buffalo-river-ponca-kyles-landing": {
    "putIn": {
      "id": "ponca-access",
      "name": "Ponca access / Buffalo River at Ponca gauge corridor",
      "latitude": 36.0225,
      "longitude": -93.354722
    },
    "takeOut": {
      "id": "kyles-landing",
      "name": "Kyle's Landing campground / river access",
      "latitude": 36.055756,
      "longitude": -93.2813
    },
    "logistics": {
      "distanceLabel": "About 10.7 mi",
      "estimatedPaddleTime": "About 5 hr to 7 hr, longer with low water, scouting, wood, or a side hike",
      "shuttle": "Stage the take-out at Kyle's Landing, then drive back to Ponca. Roads in the Buffalo corridor can be steep, rough, or slow, and NPS warns that GPS can send visitors onto bad dirt roads. Check NPS access status, weather, and road conditions before leaving vehicles.",
      "permits": "No route-specific private paddling permit is known for a normal Buffalo National River day trip. Follow NPS river rules, carry required PFDs, obey campground and parking rules, and check whether any access, road, fire, or high-water closures are posted before launching.",
      "camping": "Treat this as a committed day trip unless the group has a separate Buffalo backcountry plan. NPS allows backcountry camping on the river without a permit, but camps must still respect park rules, gravel-bar conditions, weather, and private/scenic-easement boundaries.",
      "summary": "Launch at Ponca and take out at Kyle's Landing for the classic 10.7-mile upper Buffalo day through the Ponca Wilderness. Use the direct Ponca USGS gauge as a low-water check, and skip the route when the river is rising fast or above the NPS unsafe level.",
      "accessCaveats": [
        "Ponca is a busy upper-district access area and the gauge is in the launch corridor. Make a visual low-water and wood check before committing.",
        "Kyle's Landing is down a rural park road and can be slow to reach. Inspect the landing before launching and keep the shuttle conservative.",
        "NPS says no road follows the river, access roads may be unpaved or rocky, and GPS can be unreliable in the park. Carry a real map and do not assume cell service.",
        "This route uses a community-calibrated minimum-only threshold. It is not a full ideal-range recommendation."
      ],
      "watchFor": [
        "Class II shoals, sharp bends, swift current, wave trains, and cold-water swims on the upper Buffalo.",
        "Fast rain rises, falling water after short rain windows, strainers, sweepers, fresh flood wood, and blind side channels.",
        "Low water below about 130 cfs at Ponca, when dragging and missed lines become likely.",
        "High water above the NPS 1,600 cfs Ponca unsafe level; do not treat that as appropriate private-boater water.",
        "Limited or no cell service, remote rescue exposure, rough-road shuttle delays, and late-day darkness if the group adds side hikes."
      ]
    }
  },
  "buffalo-river-ponca-steel-creek": {
    "putIn": {
      "id": "ponca-access",
      "name": "Ponca access / Buffalo River at Ponca gauge corridor",
      "latitude": 36.0225,
      "longitude": -93.354722
    },
    "takeOut": {
      "id": "steel-creek-access",
      "name": "Steel Creek campground / river access",
      "latitude": 36.040776,
      "longitude": -93.344048
    },
    "logistics": {
      "distanceLabel": "About 2.5 to 2.7 mi",
      "estimatedPaddleTime": "About 1 hr to 3 hr at moderate water, longer with low water, scouting, or wood",
      "shuttle": "Stage the take-out at Steel Creek, then drive back to Ponca. NPS says the shuttle is about 10 minutes and almost entirely on paved roads, but inspect both access areas before launching because congestion, weather, and flood cleanup can still change the plan.",
      "permits": "No route-specific private paddling permit is known for a normal Buffalo National River day trip. Follow NPS river rules, carry required PFDs, obey access and parking signs, and check current river level, weather, and park alerts before launching.",
      "camping": "Steel Creek Campground is a formal NPS endpoint campground with reservations in the main season and primitive winter camping, so this short route can work well as a campground-based half day. Do not depend on unplanned private-bank stops away from legal public areas.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Ponca and take out at Steel Creek for a short upper Buffalo introduction beneath Roark Bluff. Use the direct Ponca gauge as the decision point, and skip the route when the river is very low, rising fast, or above the NPS unsafe level.",
      "accessCaveats": [
        "Ponca is a busy upper-district access and the gauge sits in the launch corridor. Make a visual low-water and wood check before committing.",
        "Steel Creek is a developed campground access, but the area can be crowded and flood-softened. Confirm the exact landing and vehicle parking before leaving the shuttle.",
        "NPS says no road follows the river, access roads can still be rocky or slow in the Buffalo corridor, and GPS can be unreliable in the park.",
        "This route uses the same conservative minimum-only Ponca threshold as the adjoining upper-Buffalo family. It is not a full ideal-range recommendation."
      ],
      "watchFor": [
        "Small rapids, chutes, sharp bends, swift current, and cold-water swims on the upper Buffalo.",
        "Fresh flood wood, strainers, sweepers, and fast rises after local rain.",
        "Low water below about 130 cfs at Ponca, when dragging and missed lines become likely.",
        "High water above the NPS 1,600 cfs Ponca unsafe level.",
        "Crowds at Ponca and Steel Creek, limited cell service, and late-day weather shifts in the bluff corridor."
      ]
    }
  },
  "buffalo-river-pruitt-hasty": {
    "putIn": {
      "id": "pruitt-launch",
      "name": "Pruitt Landing / Highway 7 access",
      "latitude": 36.057666,
      "longitude": -93.135032
    },
    "takeOut": {
      "id": "hasty-access",
      "name": "Hasty river access / Chimney Rock Bluff take-out",
      "latitude": 36.008993,
      "longitude": -93.08242
    },
    "logistics": {
      "distanceLabel": "About 6.8 to 7 mi",
      "estimatedPaddleTime": "About 3 hr to 5 hr at moderate water, longer with low water, wood, or stops",
      "shuttle": "Stage the take-out at Hasty, then drive back to Pruitt Landing. NPS says shuttle time is about 25 minutes, but Buffalo access roads and parking can change with floods, rough gravel, congestion, or posted park direction. Inspect both accesses before launching.",
      "permits": "No route-specific private paddling permit is known for a normal Buffalo National River day trip. Follow NPS river rules, carry required PFDs, obey access and parking signs, and check park alerts, weather, and river level before launching.",
      "camping": "Treat this as a day trip unless the group has a separate Buffalo backcountry plan. NPS allows backcountry camping on the river without a permit, but camps must still respect park rules, gravel-bar conditions, weather, and private/scenic-easement boundaries.",
      "summary": "Launch at Pruitt Landing and take out at Hasty across from Chimney Rock Bluff for a 7-mile Buffalo National River day. Use the direct Pruitt USGS gauge as a low-water check, and skip the route when the river is rising fast, very low, or above the NPS unsafe level.",
      "accessCaveats": [
        "Pruitt is a busy Highway 7 access and NPS concession rules reference special handling when the Pruitt gauge is very low. Make a visual low-water and wood check before committing.",
        "Hasty is the sandy river-right take-out across from Chimney Rock Bluff. It is a rural access with limited services; do not assume cell coverage or quick rescue response.",
        "NPS says no road follows the river, access roads may be unpaved or rocky, and GPS can be unreliable in the park. Carry a real map and do not assume cell service.",
        "This route uses a guarded minimum-only threshold from the NPS Float Guide bands. It is not a full ideal-range recommendation."
      ],
      "watchFor": [
        "Swift water, sharp bends, occasional obstacles, strainers, sweepers, and fresh flood wood.",
        "The Little Buffalo River enters about halfway through the route and NPS says the river typically gains velocity from there.",
        "Low water below about 100 cfs at Pruitt, when the Float Guide marks Pruitt very low and dragging or portage-like sections become likely.",
        "High water above the NPS 2,000 cfs Pruitt unsafe level; do not treat flood or rising water as suitable private-boater conditions.",
        "Cold-water swims, remote rescue exposure, limited/no cell service, rough-road shuttle delays, and late-day darkness."
      ]
    }
  },
  "buffalo-river-steel-creek-kyles-landing": {
    "putIn": {
      "id": "steel-creek-access",
      "name": "Steel Creek campground / river access",
      "latitude": 36.040776,
      "longitude": -93.344048
    },
    "takeOut": {
      "id": "kyles-landing",
      "name": "Kyle's Landing campground / river access",
      "latitude": 36.055756,
      "longitude": -93.2813
    },
    "logistics": {
      "distanceLabel": "About 8 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr at moderate water, longer with low water, wood, or crowds",
      "shuttle": "Stage the take-out at Kyle's Landing, then drive back to Steel Creek. NPS says the shuttle is about 40 minutes each way and recommends high clearance plus four-wheel drive for Kyle's Landing Road. Inspect both accesses before launching.",
      "permits": "No route-specific private paddling permit is known for a normal Buffalo National River day trip. Follow NPS river rules, carry required PFDs, obey access and parking signs, and check current river level, weather, and park alerts before launching.",
      "camping": "Both Steel Creek and Kyle's Landing are formal NPS campgrounds, so this route works as an upper-Buffalo campground-to-campground day. Reservations or seasonal campground rules may apply, and no-camping or no-parking signs around Kyle's Landing need to be respected.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Steel Creek and take out at Kyle's Landing for one of the classic upper Buffalo days through the Ponca Wilderness. Use the Ponca gauge as the nearest official corridor check, and skip the route when the river is very low, rising fast, or above the NPS unsafe level.",
      "accessCaveats": [
        "Kyle's Landing Road is steep, rough, and parking-constrained. NPS warns against roadside parking and recommends high clearance with four-wheel drive.",
        "Steel Creek is a developed access, but the launch and campground area can fill quickly during good water windows.",
        "NPS says no road follows the river, access roads may be unpaved or rocky, and GPS can be unreliable in the park. Carry a real map and do not assume cell service.",
        "This route uses the upstream Ponca gauge as a corridor check with minimum-only scoring. It is not a full ideal-range recommendation."
      ],
      "watchFor": [
        "Tumbling rapids, long pools, swift current, sharp bends, and cold-water swims.",
        "Wood, strainers, blind side channels, and harder lines in landmarks like Hell's Half Acre when the river rises.",
        "Low water below about 130 cfs at Ponca, when dragging and route pace can collapse.",
        "High water above the NPS 1,600 cfs Ponca unsafe level.",
        "Crowded access points, rough-road shuttle delays, limited cell service, and late-day darkness on a longer upper-district float."
      ]
    }
  },
  "buffalo-river-ponca-erbie": {
    "putIn": {
      "id": "ponca-access",
      "name": "Ponca access / Buffalo River at Ponca gauge corridor",
      "latitude": 36.0225,
      "longitude": -93.354722
    },
    "takeOut": {
      "id": "erbie-access",
      "name": "Erbie Campground / river access",
      "latitude": 36.070346,
      "longitude": -93.211886
    },
    "logistics": {
      "distanceLabel": "About 16.2 to 16.3 mi",
      "estimatedPaddleTime": "About 7 hr to 9 hr, longer with low water, wood, scouting, or stops",
      "shuttle": "Stage the take-out at Erbie, then drive back to Ponca. NPS component shuttles add up to roughly 70 minutes between Ponca, Steel Creek, Kyle's Landing, and Erbie, and upper-district roads can still be rough, muddy, or slow after storms. Inspect both accesses before launching.",
      "permits": "No route-specific private paddling permit is known for a normal Buffalo National River day trip. Follow NPS river rules, carry required PFDs, obey access and parking signs, and check current river level, weather, and park alerts before launching.",
      "camping": "Erbie is a formal NPS campground and the route passes Steel Creek and Kyle's Landing campground support upstream, so this longer upper-Buffalo day can be staged around legal campground infrastructure instead of private-bank improvisation.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Ponca and take out at Erbie for a long upper Buffalo day that links Steel Creek and Kyle's Landing before the Erbie finish. Use the direct Ponca USGS gauge as the low-water check, and skip the route when the river is very low, rising fast, or above the NPS unsafe level.",
      "accessCaveats": [
        "Ponca is a busy upper-district access and the gauge sits in the launch corridor. Make a visual low-water and wood check before committing.",
        "Erbie is a signed NPS campground access, but the road, parking, and the river-right take-out downstream from Erbie Ford can still be confusing or crowded on good-water weekends.",
        "NPS says no road follows the river, access roads may be unpaved or rocky, and GPS can be unreliable in the park. Carry a real map and do not assume cell service.",
        "This route uses the direct Ponca gauge with minimum-only scoring. It is not a full ideal-range recommendation."
      ],
      "watchFor": [
        "Small rapids, chutes, long pools, swift current, sharp bends, and cold-water swims across a full upper-district day.",
        "Fast rain rises, falling water after short rain windows, strainers, sweepers, fresh flood wood, and blind side channels.",
        "Low water below about 130 cfs at Ponca, when dragging and missed lines become likely well before Erbie.",
        "High water above the NPS 1,600 cfs Ponca unsafe level.",
        "Long day mileage, rough-road shuttle delays, limited or no cell service, remote rescue exposure, and late-day darkness."
      ]
    }
  },
  "buffalo-river-ponca-pruitt": {
    "putIn": {
      "id": "ponca-access",
      "name": "Ponca access / Buffalo River at Ponca gauge corridor",
      "latitude": 36.0225,
      "longitude": -93.354722
    },
    "takeOut": {
      "id": "pruitt-launch",
      "name": "Pruitt Landing / Highway 7 access",
      "latitude": 36.057666,
      "longitude": -93.135032
    },
    "logistics": {
      "distanceLabel": "About 23.9 mi",
      "estimatedPaddleTime": "About 10 hr to 12 hr, longer with low water, wood, scouting, or slow upper-district shuttles",
      "shuttle": "Stage the take-out at Pruitt Landing, then drive back to Ponca. NPS component shuttles add up to roughly 2 hours between Ponca, Steel Creek, Kyle's Landing, Erbie, Ozark, and Pruitt, and upper-district roads can still be rough, muddy, or slow after storms. Inspect both accesses before launching.",
      "permits": "No route-specific private paddling permit is known for a normal Buffalo National River day trip. Follow NPS river rules, carry required PFDs, obey access and parking signs, and check park alerts, weather, and river level before launching.",
      "camping": "Ponca, Steel Creek, Kyle's Landing, Erbie, and Ozark still anchor this corridor with legal NPS camping support, so this route is best staged around developed campground infrastructure rather than private-bank improvisation.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Ponca and take out at Pruitt for a full upper Buffalo continuation through Steel Creek, Kyle's Landing, Erbie, and Ozark. Use the direct Pruitt gauge as the downstream low-water check, and skip the route when the river is rising fast, very low, or above the NPS unsafe level.",
      "accessCaveats": [
        "Ponca is a busy upper-district access and the gauge sits in the launch corridor. Make a visual low-water and wood check before committing.",
        "Pruitt is the signed Highway 7 finish, but NPS says to continue about half a mile past the bridge to the landing on river left. Do not mistake the bridge area for the take-out.",
        "NPS says no road follows the river, access roads may be unpaved or rocky, and GPS can be unreliable in the park. Carry a real map and do not assume cell service.",
        "This route uses the direct Pruitt gauge with minimum-only scoring. It is not a full ideal-range recommendation."
      ],
      "watchFor": [
        "Swift Class I-II current, wave trains, side channels, sharp bends, bluff eddies, fresh flood wood, and cold-water swims.",
        "Low water below about 100 cfs at Pruitt, when the Float Guide marks the lower corridor very low and the long mileage compounds dragging and slow route pace.",
        "High water above the NPS 2,000 cfs Pruitt unsafe level; do not treat flood or rising water as suitable private-boater conditions.",
        "Long day fatigue, rough-road shuttle delays, limited or no cell service, remote rescue exposure, and late-day darkness if the launch is delayed."
      ]
    },
    "accessPoints": [
      {
        "id": "ponca-access",
        "name": "Ponca access / Buffalo River at Ponca gauge corridor",
        "latitude": 36.0225,
        "longitude": -93.354722,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream access for the full Ponca-to-Pruitt continuation."
      },
      {
        "id": "steel-creek-access",
        "name": "Steel Creek campground / river access",
        "latitude": 36.040776,
        "longitude": -93.344048,
        "mileFromStart": 2.7,
        "segmentKind": "creek",
        "note": "First major public bailout and campground stop below Ponca."
      },
      {
        "id": "kyles-landing",
        "name": "Kyle's Landing campground / river access",
        "latitude": 36.055756,
        "longitude": -93.2813,
        "mileFromStart": 10.7,
        "segmentKind": "creek",
        "note": "Remote intermediate access with the roughest shuttle road in the corridor."
      },
      {
        "id": "erbie-access",
        "name": "Erbie Campground / river access",
        "latitude": 36.070346,
        "longitude": -93.211886,
        "mileFromStart": 16.3,
        "segmentKind": "creek",
        "note": "Major middle-corridor campground access and practical split point."
      },
      {
        "id": "ozark-access",
        "name": "Ozark Campground / river access",
        "latitude": 36.062132,
        "longitude": -93.159724,
        "mileFromStart": 21.8,
        "segmentKind": "creek",
        "note": "Lower-corridor public campground and the last obvious developed stop before Pruitt."
      },
      {
        "id": "pruitt-launch",
        "name": "Pruitt Landing / Highway 7 access",
        "latitude": 36.057666,
        "longitude": -93.135032,
        "mileFromStart": 23.9,
        "segmentKind": "creek",
        "note": "Default downstream take-out below Highway 7 on river left."
      }
    ]
  },
  "buffalo-river-ponca-ozark": {
    "putIn": {
      "id": "ponca-access",
      "name": "Ponca access / Buffalo River at Ponca gauge corridor",
      "latitude": 36.0225,
      "longitude": -93.354722
    },
    "takeOut": {
      "id": "ozark-access",
      "name": "Ozark Campground / river access",
      "latitude": 36.062132,
      "longitude": -93.159724
    },
    "logistics": {
      "distanceLabel": "About 21.8 mi",
      "estimatedPaddleTime": "About 9 hr to 11 hr, longer with low water, wood, scouting, or stops",
      "shuttle": "Stage the take-out at Ozark, then drive back to Ponca. NPS component shuttles add up to roughly 100 minutes between Ponca, Steel Creek, Kyle's Landing, Erbie, and Ozark, and upper-district roads can still be rough, muddy, or slow after storms. Inspect both accesses before launching.",
      "permits": "No route-specific private paddling permit is known for a normal Buffalo National River day trip. Follow NPS river rules, carry required PFDs, obey access and parking signs, and check park alerts, weather, and river level before launching.",
      "camping": "Ozark is a formal NPS campground and the route passes Steel Creek, Kyle's Landing, and Erbie campground support upstream, so this long upper-Buffalo day can be staged around legal campground infrastructure instead of private-bank improvisation.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Ponca and take out at Ozark for a long upper Buffalo day through Steel Creek, Kyle's Landing, and Erbie. Use the direct Pruitt USGS gauge as the lower-corridor low-water check, and skip the route when the river is rising fast, very low, or above the NPS unsafe level.",
      "accessCaveats": [
        "Ponca is a busy upper-district access and the gauge sits in the launch corridor. Make a visual low-water and wood check before committing.",
        "Ozark is a signed NPS campground access, but the gravel road, parking, and beach-like take-out can still be muddy, crowded, or slow after storms and busy weekends.",
        "NPS says no road follows the river, access roads may be unpaved or rocky, and GPS can be unreliable in the park. Carry a real map and do not assume cell service.",
        "This route uses the direct Pruitt gauge with minimum-only scoring. It is not a full ideal-range recommendation."
      ],
      "watchFor": [
        "Swift Class I-II current, wave trains, side channels, sharp bends, bluff eddies, fresh flood wood, and cold-water swims.",
        "Low water below about 100 cfs at Pruitt, when the Float Guide marks the lower corridor very low and the long mileage compounds dragging and slow route pace.",
        "High water above the NPS 2,000 cfs Pruitt unsafe level; do not treat flood or rising water as suitable private-boater conditions.",
        "Long day fatigue, rough-road shuttle delays, limited or no cell service, remote rescue exposure, and late-day darkness."
      ]
    }
  },
  "buffalo-river-kyles-landing-pruitt": {
    "putIn": {
      "id": "kyles-landing",
      "name": "Kyle's Landing campground / river access",
      "latitude": 36.055756,
      "longitude": -93.2813
    },
    "takeOut": {
      "id": "pruitt-launch",
      "name": "Pruitt Landing / Highway 7 access",
      "latitude": 36.057666,
      "longitude": -93.135032
    },
    "logistics": {
      "distanceLabel": "About 13.2 mi",
      "estimatedPaddleTime": "About 6 hr to 8 hr, longer with low water, wood, scouting, or slow shuttle roads",
      "shuttle": "Stage the take-out at Pruitt Landing, then drive back to Kyle's Landing. NPS access roads can be unpaved, rocky, slow, or unreliable for GPS navigation, and Kyle's Landing Road is a practical shuttle constraint. Inspect both accesses before launching.",
      "permits": "No route-specific private paddling permit is known for a normal Buffalo National River day trip. Follow NPS river rules, carry required PFDs, obey access and parking signs, and check park alerts, weather, and river level before launching.",
      "camping": "Treat this as a committed day trip unless the group has a separate Buffalo backcountry plan. NPS allows backcountry camping on the river without a permit, but camps must still respect park rules, gravel-bar conditions, weather, and private/scenic-easement boundaries.",
      "summary": "Launch at Kyle's Landing and take out at Pruitt for a long upper Buffalo day past Erbie and Ozark. Use the Pruitt USGS gauge as a downstream low-water check, and skip the route when the river is rising fast, very low, or above the NPS unsafe level.",
      "accessCaveats": [
        "Kyle's Landing is a remote upper-district access reached by rough park road. Confirm road, parking, and landing conditions before committing to the shuttle.",
        "Pruitt is a busy Highway 7 access with posted park and concession operations. Leave room for loading, trailers, and local traffic.",
        "NPS says no road follows the river, access roads may be unpaved or rocky, and GPS can be unreliable in the park. Carry a real map and do not assume cell service.",
        "This route uses the Pruitt gauge as a downstream corridor check with minimum-only scoring. It is not a full ideal-range recommendation."
      ],
      "watchFor": [
        "Swift Class I-II current, shoals, wave trains, sharp bends, side channels, and cold-water swims.",
        "Fast rain rises, falling water after short rain windows, strainers, sweepers, fresh flood wood, and blind side channels.",
        "Low water below about 100 cfs at Pruitt, when the Float Guide marks Pruitt very low and dragging or portage-like sections become likely.",
        "High water above the NPS 2,000 cfs Pruitt unsafe level; do not treat flood or rising water as suitable private-boater conditions.",
        "Long day mileage, limited/no cell service, remote rescue exposure, rough-road shuttle delays, and late-day darkness."
      ]
    }
  },
  "buffalo-river-kyles-landing-erbie": {
    "putIn": {
      "id": "kyles-landing",
      "name": "Kyle's Landing campground / river access",
      "latitude": 36.055756,
      "longitude": -93.2813
    },
    "takeOut": {
      "id": "erbie-access",
      "name": "Erbie Campground / river access",
      "latitude": 36.070346,
      "longitude": -93.211886
    },
    "logistics": {
      "distanceLabel": "About 5.6 to 5.7 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr, longer with low water, wood, scouting, or shuttle delays",
      "shuttle": "Stage the take-out at Erbie, then drive back to Kyle's Landing. NPS says shuttle time is about 20 minutes, but upper Buffalo access roads can be unpaved, rocky, and slow, and NPS specifically recommends high clearance and four-wheel drive for Kyle's Landing Road. Inspect both accesses before launching.",
      "permits": "No route-specific private paddling permit is known for a normal Buffalo National River day trip. Follow NPS river rules, carry required PFDs, obey access and parking signs, and check park alerts, weather, and river level before launching.",
      "camping": "Kyle's Landing and Erbie are both formal NPS camping areas, so this can work as a short campground-to-campground upper Buffalo day if the group wants to stage overnight nearby rather than rush the shuttle.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Kyle's Landing and take out at Erbie for a short upper Buffalo day with swift current and bluff-lined bends. Use the Pruitt USGS gauge as the nearest downstream low-water check, and skip the route when the river is rising fast, very low, or above the NPS unsafe level.",
      "accessCaveats": [
        "Kyle's Landing is a remote upper-district access reached by rough park road. NPS recommends high clearance and four-wheel drive for Kyle's Landing Road.",
        "NPS says the Erbie take-out is about a mile downstream from Erbie Ford on river right. Do not confuse the river take-out with ford or campground traffic patterns.",
        "NPS says no road follows the river, access roads may be unpaved or rocky, and GPS can be unreliable in the park. Carry a real map and do not assume cell service.",
        "This route uses the Pruitt gauge as a downstream corridor check with minimum-only scoring. It is not a full ideal-range recommendation."
      ],
      "watchFor": [
        "Swift current, sharp bends, occasional obstacles, strainers, sweepers, fresh flood wood, and cold-water swims.",
        "Low water below about 100 cfs at Pruitt, when the Float Guide marks Pruitt very low and dragging or portage-like sections become likely.",
        "High water above the NPS 2,000 cfs Pruitt unsafe level; do not treat flood or rising water as suitable private-boater conditions.",
        "Upper-district remoteness, limited or no cell service, rough-road shuttle delays, and the route's explicit NPS not-for-beginners posture."
      ]
    }
  },
  "buffalo-river-steel-creek-erbie": {
    "putIn": {
      "id": "steel-creek-access",
      "name": "Steel Creek campground / river access",
      "latitude": 36.040776,
      "longitude": -93.344048
    },
    "takeOut": {
      "id": "erbie-access",
      "name": "Erbie Campground / river access",
      "latitude": 36.070346,
      "longitude": -93.211886
    },
    "logistics": {
      "distanceLabel": "About 13.6 mi",
      "estimatedPaddleTime": "About 6 hr to 8 hr, longer with low water, wood, scouting, or stops",
      "shuttle": "Stage the take-out at Erbie, then drive back to Steel Creek. NPS component shuttles add up to roughly 65 minutes between Steel Creek, Kyle's Landing, and Erbie, and upper-district roads can still be rough, muddy, or slow after storms. Inspect both accesses before launching.",
      "permits": "No route-specific private paddling permit is known for a normal Buffalo National River day trip. Follow NPS river rules, carry required PFDs, obey access and parking signs, and check park alerts, weather, and river level before launching.",
      "camping": "Steel Creek and Erbie are both formal NPS campgrounds, so this route works well as a campground-backed day float without implying overnight use on private banks.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Steel Creek and take out at Erbie for a long upper Buffalo day through Kyle's Landing. Use the direct Pruitt USGS gauge as the nearest downstream low-water check, and skip the route when the river is rising fast, very low, or above the NPS unsafe level.",
      "accessCaveats": [
        "Steel Creek can fill quickly during good water windows, and Erbie can be confusing because the river access sits downstream from Erbie Ford on river right.",
        "This route inherits the rough-road practical constraints from Kyle's Landing even though that access is only a bailout and shuttle landmark on this trip.",
        "NPS says no road follows the river, access roads may be unpaved or rocky, and GPS can be unreliable in the park. Carry a real map and do not assume cell service.",
        "This route uses the direct Pruitt gauge with minimum-only scoring. It is not a full ideal-range recommendation."
      ],
      "watchFor": [
        "Swift current, rapids, long pools, strainers, sweepers, fresh flood wood, and cold-water swims.",
        "Low water below about 100 cfs at Pruitt, when the lower-corridor Float Guide marks the river very low and the upper miles can turn into repeated dragging and missed lines.",
        "High water above the NPS 2,000 cfs Pruitt unsafe level; do not treat flood or rising water as suitable private-boater conditions.",
        "Rough-road shuttle delays, limited or no cell service, and upper-district remoteness if an injury or gear failure forces an early stop."
      ]
    }
  },
  "buffalo-river-erbie-ozark": {
    "putIn": {
      "id": "erbie-access",
      "name": "Erbie Campground / river access",
      "latitude": 36.070346,
      "longitude": -93.211886
    },
    "takeOut": {
      "id": "ozark-access",
      "name": "Ozark Campground / river access",
      "latitude": 36.062132,
      "longitude": -93.159724
    },
    "logistics": {
      "distanceLabel": "About 5.4 to 5.5 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr, longer with low water, wood, or gravel-bar stops",
      "shuttle": "Stage the take-out at Ozark, then drive back to Erbie. NPS says shuttle time is about 30 minutes, but both accesses rely on park roads that can be slow, rough, dusty, or confusing in wet weather. Inspect both accesses before launching.",
      "permits": "No route-specific private paddling permit is known for a normal Buffalo National River day trip. Follow NPS river rules, carry required PFDs, obey access and parking signs, and check park alerts, weather, and river level before launching.",
      "camping": "Erbie and Ozark are both formal NPS campgrounds, so this reach works well as a campground-backed day float or a short link inside a larger Buffalo camping itinerary.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Erbie and take out at Ozark for a compact upper Buffalo day below Porch Bluff and Briar Bluff. Use the Pruitt USGS gauge as the nearest downstream low-water check, and skip the route when the river is rising fast, very low, or above the NPS unsafe level.",
      "accessCaveats": [
        "Erbie and Ozark are signed NPS campground accesses, but the roads and parking lots can still be muddy, crowded, or slow after storms and during summer weekends.",
        "NPS describes a sandy beach at the Ozark take-out, which can shift with water level and gravel movement. Make a same-day visual landing check.",
        "NPS says no road follows the river, access roads may be unpaved or rocky, and GPS can be unreliable in the park. Carry a real map and do not assume cell service.",
        "This route uses the Pruitt gauge as a downstream corridor check with minimum-only scoring. It is not a full ideal-range recommendation."
      ],
      "watchFor": [
        "Bouncy riffles, bluff eddies, strainers, sweepers, fresh flood wood, and cold-water swims.",
        "Low water below about 100 cfs at Pruitt, when the Float Guide marks Pruitt very low and dragging or shallow braid-finding become likely.",
        "High water above the NPS 2,000 cfs Pruitt unsafe level; do not treat flood or rising water as suitable private-boater conditions.",
        "Limited or no cell service, upper-district weather swings, and crowding around developed campgrounds or swimming beaches."
      ]
    }
  },
  "buffalo-river-kyles-landing-ozark": {
    "putIn": {
      "id": "kyles-landing",
      "name": "Kyle's Landing campground / river access",
      "latitude": 36.055756,
      "longitude": -93.2813
    },
    "takeOut": {
      "id": "ozark-access",
      "name": "Ozark Campground / river access",
      "latitude": 36.062132,
      "longitude": -93.159724
    },
    "logistics": {
      "distanceLabel": "About 11.1 mi",
      "estimatedPaddleTime": "About 6 hr to 7 hr, longer with low water, wood, or stops",
      "shuttle": "Stage the take-out at Ozark, then drive back to Kyle's Landing. NPS says the component shuttles are about 1 hour from Kyle's Landing to Erbie and 30 minutes from Erbie to Ozark, so expect a longer upper-district shuttle on gravel roads and inspect both landings before launching.",
      "permits": "No route-specific private paddling permit is known for a normal Buffalo National River day trip. Follow NPS river rules, carry required PFDs, obey access and parking signs, and check park alerts, weather, and river level before launching.",
      "camping": "Kyle's Landing and Ozark are both formal NPS campgrounds, so this continuation works well as a campground-to-campground Buffalo day if the group wants overnight support at either end instead of forcing a same-morning shuttle.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Kyle's Landing and take out at Ozark for a longer upper Buffalo continuation through the Erbie corridor. Use the Pruitt USGS gauge as the nearest downstream low-water check, and skip the route when the river is rising fast, very low, or above the NPS unsafe level.",
      "accessCaveats": [
        "Kyle's Landing is a remote upper-district access reached by rough park road. NPS recommends high clearance and four-wheel drive for Kyle's Landing Road.",
        "Ozark is a developed campground access, but the sandy beach and parking rhythm can shift with water, gravel movement, and summer crowding.",
        "NPS says no road follows the river, access roads may be unpaved or rocky, and GPS can be unreliable in the park. Carry a real map and do not assume cell service.",
        "This route uses the Pruitt gauge as a downstream corridor check with minimum-only scoring. It is not a full ideal-range recommendation."
      ],
      "watchFor": [
        "Swift current, sharp bends, occasional obstacles, strainers, sweepers, fresh flood wood, and cold-water swims.",
        "Low water below about 100 cfs at Pruitt, when the Float Guide marks Pruitt very low and dragging or shallow braid-finding become likely.",
        "High water above the NPS 2,000 cfs Pruitt unsafe level; do not treat flood or rising water as suitable private-boater conditions.",
        "Upper-district remoteness, rough-road shuttle delays, limited or no cell service, and a longer day than the shorter Kyles or Erbie splits."
      ]
    }
  },
  "buffalo-river-steel-creek-ozark": {
    "putIn": {
      "id": "steel-creek-access",
      "name": "Steel Creek campground / river access",
      "latitude": 36.040776,
      "longitude": -93.344048
    },
    "takeOut": {
      "id": "ozark-access",
      "name": "Ozark Campground / river access",
      "latitude": 36.062132,
      "longitude": -93.159724
    },
    "logistics": {
      "distanceLabel": "About 19.1 mi",
      "estimatedPaddleTime": "About 8 hr to 10 hr, longer with low water, wood, or sightseeing stops",
      "shuttle": "Stage the take-out at Ozark, then drive back to Steel Creek. NPS component shuttles add up to about 90 minutes between Steel Creek, Kyle's Landing, Erbie, and Ozark, and upper-district roads can still be rough, dusty, or slow after storms. Inspect both accesses before launching.",
      "permits": "No route-specific private paddling permit is known for a normal Buffalo National River day trip. Follow NPS river rules, carry required PFDs, obey access and parking signs, and check park alerts, weather, and river level before launching.",
      "camping": "Steel Creek and Ozark are both formal NPS campgrounds, so this longer continuation can be staged around legal campground infrastructure at either end instead of assuming private-bank camping on a same-day run.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Steel Creek and take out at Ozark for a long upper Buffalo continuation through Kyle's Landing and Erbie. Use the Pruitt USGS gauge as the nearest downstream low-water check, and skip the route when the river is rising fast, very low, or above the NPS unsafe level.",
      "accessCaveats": [
        "Steel Creek can fill quickly during good water windows, and Ozark can attract swimmers and beach users. Confirm both landings and parking before leaving the shuttle.",
        "This route inherits the rough-road practical constraints from Kyle's Landing and the longer gravel-road shuttle to Ozark.",
        "NPS says no road follows the river, access roads may be unpaved or rocky, and GPS can be unreliable in the park. Carry a real map and do not assume cell service.",
        "This route uses the Pruitt gauge as a downstream corridor check with minimum-only scoring. It is not a full ideal-range recommendation."
      ],
      "watchFor": [
        "Swift current, sharp bends, riffles, strainers, sweepers, fresh flood wood, and cold-water swims over a long upper-district day.",
        "Low water below about 100 cfs at Pruitt, when the Float Guide marks Pruitt very low and the longer upstream corridor can collapse into dragging and shallow braid-finding.",
        "High water above the NPS 2,000 cfs Pruitt unsafe level; do not treat flood or rising water as suitable private-boater conditions.",
        "Upper-district remoteness, rough-road shuttle delays, limited or no cell service, and late-day darkness."
      ]
    }
  },
  "buffalo-river-ponca-hasty": {
    "putIn": {
      "id": "ponca-access",
      "name": "Ponca access / Buffalo River at Ponca gauge corridor",
      "latitude": 36.0225,
      "longitude": -93.354722
    },
    "takeOut": {
      "id": "hasty-access",
      "name": "Hasty river access / Chimney Rock Bluff take-out",
      "latitude": 36.008993,
      "longitude": -93.08242
    },
    "logistics": {
      "distanceLabel": "About 30.7 mi",
      "estimatedPaddleTime": "About 12 hr to 14 hr as a push, or split with legal camping support",
      "shuttle": "Stage the take-out at Hasty, then drive back to Ponca. NPS component shuttles add up to roughly 140 minutes between Ponca, Steel Creek, Kyle's Landing, Erbie, Ozark, Pruitt, and Hasty, and upper-district roads can still be rough, muddy, or slow after storms. Inspect both accesses before launching.",
      "permits": "No route-specific private paddling permit is known for a normal Buffalo National River trip. Follow NPS river rules, carry required PFDs, obey access and parking signs, and check park alerts, weather, and river level before launching.",
      "camping": "At 30.7 miles this route is more naturally an overnight-capable Buffalo corridor than a casual day float. Current NPS campground pages still document legal overnight support at Steel Creek, Kyle's Landing, Erbie, and Ozark, so stage any split around developed campground infrastructure instead of improvised private-bank camping.",
      "campingClassification": "overnight_capable",
      "summary": "Launch at Ponca and take out at Hasty for the full upper Buffalo continuation through Steel Creek, Kyles Landing, Erbie, Ozark, and Pruitt. Use the direct Pruitt USGS gauge as the lower-corridor low-water check, and skip the route when the river is rising fast, very low, or above the NPS unsafe level.",
      "accessCaveats": [
        "Ponca is a busy upper-district access and the gauge sits in the launch corridor. Make a visual low-water and wood check before committing to the full day.",
        "Hasty is the sandy river-right take-out across from Chimney Rock Bluff. It is a rural access with limited services; do not assume cell coverage or quick rescue response after a late finish.",
        "NPS says no road follows the river, access roads may be unpaved or rocky, and GPS can be unreliable in the park. Carry a real map and do not assume cell service.",
        "This route uses the direct Pruitt gauge with minimum-only scoring. It is not a full ideal-range recommendation."
      ],
      "watchFor": [
        "Swift Class I-II current, repeated riffles, bluff bends, side channels, strainers, sweepers, fresh flood wood, and cold-water swims across an extremely long day.",
        "The Little Buffalo River enters in the lower half of the day and NPS says the river typically gains velocity from there.",
        "Low water below about 100 cfs at Pruitt, when the Float Guide marks the lower corridor very low and the full upstream mileage can turn into repeated dragging and missed lines.",
        "High water above the NPS 2,000 cfs Pruitt unsafe level; do not treat flood or rising water as suitable private-boater conditions.",
        "Long day fatigue, rough-road shuttle delays, limited or no cell service, remote rescue exposure, and the need to convert to an overnight plan if pace collapses."
      ]
    }
  },
  "buffalo-river-erbie-pruitt": {
    "putIn": {
      "id": "erbie-access",
      "name": "Erbie Campground / river access",
      "latitude": 36.070346,
      "longitude": -93.211886
    },
    "takeOut": {
      "id": "pruitt-launch",
      "name": "Pruitt Landing / Highway 7 access",
      "latitude": 36.057666,
      "longitude": -93.135032
    },
    "logistics": {
      "distanceLabel": "About 7.6 mi",
      "estimatedPaddleTime": "About 4 hr to 5 hr, longer with low water, wood, or gravel-bar stops",
      "shuttle": "Stage the take-out at Pruitt Landing, then drive back to Erbie. NPS says the component shuttles are about 30 minutes from Erbie to Ozark and 15 minutes from Ozark to Pruitt, but upper Buffalo park roads can still be slow, rough, or muddy after storms. Inspect both accesses before launching.",
      "permits": "No route-specific private paddling permit is known for a normal Buffalo National River day trip. Follow NPS river rules, carry required PFDs, obey access and parking signs, and check park alerts, weather, and river level before launching.",
      "camping": "Erbie is a formal NPS campground and Pruitt is a major developed access, so this route works well as a campground-backed day float without implying an overnight on private banks.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Erbie and take out at Pruitt for a compact upper Buffalo continuation below Ozark. Use the direct Pruitt USGS gauge as the low-water check, and skip the route when the river is rising fast, very low, or above the NPS unsafe level.",
      "accessCaveats": [
        "Erbie and Pruitt are signed NPS accesses, but the roads and parking can still be muddy, crowded, or slow after storms and during summer weekends.",
        "NPS says to continue about half a mile past the Highway 7 bridge to reach Pruitt Landing on river left. Do not mistake the bridge area for the signed take-out.",
        "NPS says no road follows the river, access roads may be unpaved or rocky, and GPS can be unreliable in the park. Carry a real map and do not assume cell service.",
        "This route uses the direct Pruitt gauge with minimum-only scoring. It is not a full ideal-range recommendation."
      ],
      "watchFor": [
        "Bouncy riffles, bluff eddies, strainers, sweepers, fresh flood wood, and cold-water swims.",
        "Low water below about 100 cfs at Pruitt, when the Float Guide marks Pruitt very low and dragging or rocky shallows become likely.",
        "High water above the NPS 2,000 cfs Pruitt unsafe level; do not treat flood or rising water as suitable private-boater conditions.",
        "Limited or no cell service, upper-district weather swings, and campground or Highway 7 congestion around busy weekends."
      ]
    }
  },
  "buffalo-river-steel-creek-pruitt": {
    "putIn": {
      "id": "steel-creek-access",
      "name": "Steel Creek campground / river access",
      "latitude": 36.040776,
      "longitude": -93.344048
    },
    "takeOut": {
      "id": "pruitt-launch",
      "name": "Pruitt Landing / Highway 7 access",
      "latitude": 36.057666,
      "longitude": -93.135032
    },
    "logistics": {
      "distanceLabel": "About 21.1 mi",
      "estimatedPaddleTime": "About 9 hr to 11 hr, longer with low water, wood, scouting, or stops",
      "shuttle": "Stage the take-out at Pruitt Landing, then drive back to Steel Creek. NPS component shuttles add up to roughly 105 minutes between Steel Creek, Kyle's Landing, Erbie, Ozark, and Pruitt, and upper-district roads can still be rough, muddy, or slow after storms. Inspect both accesses before launching.",
      "permits": "No route-specific private paddling permit is known for a normal Buffalo National River day trip. Follow NPS river rules, carry required PFDs, obey access and parking signs, and check park alerts, weather, and river level before launching.",
      "camping": "Steel Creek is a formal NPS campground and Pruitt is a major developed access, so this full-corridor route works best as a very committed day float anchored by legal staging rather than private-bank improvisation.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Steel Creek and take out at Pruitt for a full upper Buffalo continuation through Kyle's Landing, Erbie, and Ozark. Use the direct Pruitt USGS gauge as the low-water check, and skip the route when the river is rising fast, very low, or above the NPS unsafe level.",
      "accessCaveats": [
        "Steel Creek can be crowded during good water windows, and Pruitt is a busy Highway 7 access with loading traffic and posted park operations.",
        "This route inherits the rough-road practical constraints from Kyle's Landing and the long upper-district shuttle across several access roads.",
        "NPS says no road follows the river, access roads may be unpaved or rocky, and GPS can be unreliable in the park. Carry a real map and do not assume cell service.",
        "This route uses the direct Pruitt gauge with minimum-only scoring. It is not a full ideal-range recommendation."
      ],
      "watchFor": [
        "Swift Class I-II current, shoals, wave trains, sharp bends, side channels, strainers, sweepers, and cold-water swims over a very long day.",
        "Fast rain rises, falling water after short rain windows, fresh flood wood, and blind side channels.",
        "Low water below about 100 cfs at Pruitt, when the Float Guide marks Pruitt very low and the full upstream corridor can turn into repeated dragging and missed lines.",
        "High water above the NPS 2,000 cfs Pruitt unsafe level; do not treat flood or rising water as suitable private-boater conditions.",
        "Long day mileage, limited or no cell service, remote rescue exposure, rough-road shuttle delays, and late-day darkness."
      ]
    }
  },
  "buffalo-river-steel-creek-hasty": {
    "putIn": {
      "id": "steel-creek-access",
      "name": "Steel Creek campground / river access",
      "latitude": 36.040776,
      "longitude": -93.344048
    },
    "takeOut": {
      "id": "hasty-access",
      "name": "Hasty river access / Chimney Rock Bluff take-out",
      "latitude": 36.008993,
      "longitude": -93.08242
    },
    "logistics": {
      "distanceLabel": "About 27.9 to 28.0 mi",
      "estimatedPaddleTime": "About 11 hr to 13 hr, longer with low water, wood, scouting, or stops",
      "shuttle": "Stage the take-out at Hasty, then drive back to Steel Creek. NPS component shuttles add up to roughly 130 minutes between Steel Creek, Kyle's Landing, Erbie, Ozark, Pruitt, and Hasty, and upper-district roads can still be rough, muddy, or slow after storms. Inspect both accesses before launching.",
      "permits": "No route-specific private paddling permit is known for a normal Buffalo National River day trip. Follow NPS river rules, carry required PFDs, obey access and parking signs, and check park alerts, weather, and river level before launching.",
      "camping": "Steel Creek is a formal NPS campground, so this very long continuation works best as a committed campground-staged day float rather than private-bank improvisation near the finish at Hasty.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Steel Creek and take out at Hasty for a full upper Buffalo continuation through Kyles Landing, Erbie, Ozark, and Pruitt. Use the direct Pruitt USGS gauge as the low-water check, and skip the route when the river is rising fast, very low, or above the NPS unsafe level.",
      "accessCaveats": [
        "Steel Creek can fill quickly during good water windows, and Hasty is a simple rural take-out with limited services and slower response if problems develop late in the day.",
        "This route inherits the rough-road practical constraints from Kyle's Landing plus the longer upper-district shuttle across several park accesses.",
        "NPS says no road follows the river, access roads may be unpaved or rocky, and GPS can be unreliable in the park. Carry a real map and do not assume cell service.",
        "This route uses the direct Pruitt gauge with minimum-only scoring. It is not a full ideal-range recommendation."
      ],
      "watchFor": [
        "Swift Class I-II current, shoals, wave trains, sharp bends, side channels, strainers, sweepers, and cold-water swims over a very long day.",
        "Fast rain rises, falling water after short rain windows, fresh flood wood, and blind side channels.",
        "The Little Buffalo River enters in the lower half of the day and NPS says the river typically gains velocity from there.",
        "Low water below about 100 cfs at Pruitt, when the Float Guide marks Pruitt very low and the full upstream corridor can turn into repeated dragging and missed lines.",
        "High water above the NPS 2,000 cfs Pruitt unsafe level; do not treat flood or rising water as suitable private-boater conditions."
      ]
    }
  },
  "buffalo-river-kyles-landing-hasty": {
    "putIn": {
      "id": "kyles-landing",
      "name": "Kyle's Landing campground / river access",
      "latitude": 36.055756,
      "longitude": -93.2813
    },
    "takeOut": {
      "id": "hasty-access",
      "name": "Hasty river access / Chimney Rock Bluff take-out",
      "latitude": 36.008993,
      "longitude": -93.08242
    },
    "logistics": {
      "distanceLabel": "About 19.9 to 20.0 mi",
      "estimatedPaddleTime": "About 9 hr to 11 hr, longer with low water, wood, or stops",
      "shuttle": "Stage the take-out at Hasty, then drive back to Kyle's Landing. NPS component shuttles add up to about 90 minutes between Kyle's Landing, Erbie, Ozark, Pruitt, and Hasty, and upper Buffalo roads can still be rough, dusty, or slow after storms. Inspect both accesses before launching.",
      "permits": "No route-specific private paddling permit is known for a normal Buffalo National River day trip. Follow NPS river rules, carry required PFDs, obey access and parking signs, and check park alerts, weather, and river level before launching.",
      "camping": "Kyle's Landing is a formal NPS campground, so this continuation can work as a campground-staged Buffalo day even though Hasty itself is a simpler rural take-out.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Kyle's Landing and take out at Hasty for a longer upper Buffalo continuation through Erbie, Ozark, and Pruitt. Use the direct Pruitt USGS gauge as the low-water check, and skip the route when the river is rising fast, very low, or above the NPS unsafe level.",
      "accessCaveats": [
        "Kyle's Landing is a remote upper-district access reached by rough park road. NPS recommends high clearance and four-wheel drive for Kyle's Landing Road.",
        "Hasty is the sandy river-right take-out across from Chimney Rock Bluff. It is a rural access with limited services; do not assume cell coverage or quick rescue response.",
        "NPS says no road follows the river, access roads may be unpaved or rocky, and GPS can be unreliable in the park. Carry a real map and do not assume cell service.",
        "This route uses the direct Pruitt gauge with minimum-only scoring. It is not a full ideal-range recommendation."
      ],
      "watchFor": [
        "Swift current, sharp bends, occasional obstacles, strainers, sweepers, fresh flood wood, and cold-water swims across a long day.",
        "The Little Buffalo River enters in the lower half of the day and NPS says the river typically gains velocity from there.",
        "Low water below about 100 cfs at Pruitt, when the Float Guide marks Pruitt very low and dragging or shallow braid-finding become likely.",
        "High water above the NPS 2,000 cfs Pruitt unsafe level; do not treat flood or rising water as suitable private-boater conditions.",
        "Upper-district remoteness, rough-road shuttle delays, limited or no cell service, and late-day darkness."
      ]
    }
  },
  "buffalo-river-erbie-hasty": {
    "putIn": {
      "id": "erbie-access",
      "name": "Erbie Campground / river access",
      "latitude": 36.070346,
      "longitude": -93.211886
    },
    "takeOut": {
      "id": "hasty-access",
      "name": "Hasty river access / Chimney Rock Bluff take-out",
      "latitude": 36.008993,
      "longitude": -93.08242
    },
    "logistics": {
      "distanceLabel": "About 14.4 to 14.5 mi",
      "estimatedPaddleTime": "About 7 hr to 9 hr, longer with low water, wood, or gravel-bar stops",
      "shuttle": "Stage the take-out at Hasty, then drive back to Erbie. NPS component shuttles are about 30 minutes from Erbie to Ozark, 15 minutes from Ozark to Pruitt, and 25 minutes from Pruitt to Hasty, but upper Buffalo park roads can still be slow, rough, or muddy after storms. Inspect both accesses before launching.",
      "permits": "No route-specific private paddling permit is known for a normal Buffalo National River day trip. Follow NPS river rules, carry required PFDs, obey access and parking signs, and check park alerts, weather, and river level before launching.",
      "camping": "Erbie is a formal NPS campground, so this route works well as a campground-backed day float even though Hasty itself is a simpler rural take-out.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Erbie and take out at Hasty for a longer Buffalo continuation below Ozark and Pruitt. Use the direct Pruitt USGS gauge as the low-water check, and skip the route when the river is rising fast, very low, or above the NPS unsafe level.",
      "accessCaveats": [
        "Erbie is a signed NPS campground access, but the road, parking, and river-right landing downstream from Erbie Ford can still be confusing or crowded on good-water weekends.",
        "Hasty is the sandy river-right take-out across from Chimney Rock Bluff. It is a rural access with limited services; do not assume cell coverage or quick rescue response.",
        "NPS says no road follows the river, access roads may be unpaved or rocky, and GPS can be unreliable in the park. Carry a real map and do not assume cell service.",
        "This route uses the direct Pruitt gauge with minimum-only scoring. It is not a full ideal-range recommendation."
      ],
      "watchFor": [
        "Bouncy riffles, bluff eddies, strainers, sweepers, fresh flood wood, and cold-water swims.",
        "The Little Buffalo River enters in the lower half of the day and NPS says the river typically gains velocity from there.",
        "Low water below about 100 cfs at Pruitt, when the Float Guide marks Pruitt very low and dragging or rocky shallows become likely.",
        "High water above the NPS 2,000 cfs Pruitt unsafe level; do not treat flood or rising water as suitable private-boater conditions.",
        "Limited or no cell service, upper-district weather swings, and crowding around developed campgrounds or Highway 7 on busy weekends."
      ]
    }
  },
  "buffalo-river-ozark-hasty": {
    "putIn": {
      "id": "ozark-access",
      "name": "Ozark Campground / river access",
      "latitude": 36.062132,
      "longitude": -93.159724
    },
    "takeOut": {
      "id": "hasty-access",
      "name": "Hasty river access / Chimney Rock Bluff take-out",
      "latitude": 36.008993,
      "longitude": -93.08242
    },
    "logistics": {
      "distanceLabel": "About 8.9 to 9.1 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr at moderate water, longer with low water, wood, or stops",
      "shuttle": "Stage the take-out at Hasty, then drive back to Ozark. NPS says the component shuttles are about 15 minutes from Ozark to Pruitt and about 25 minutes from Pruitt to Hasty, but river roads and loading traffic can still slow the day. Inspect both accesses before launching.",
      "permits": "No route-specific private paddling permit is known for a normal Buffalo National River day trip. Follow NPS river rules, carry required PFDs, obey access and parking signs, and check park alerts, weather, and river level before launching.",
      "camping": "Ozark is a formal NPS campground, so this continuation can work as a campground-based day float even though Hasty itself is a simpler rural take-out.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Ozark and take out at Hasty for a longer Buffalo continuation that drops through Pruitt into the popular lower-water fallback section. Use the direct Pruitt USGS gauge as the low-water check, and skip the route when the river is rising fast, very low, or above the NPS unsafe level.",
      "accessCaveats": [
        "Ozark can attract swimmers and beach users, so loading space and parking rhythm may be different from quieter Buffalo accesses.",
        "Hasty is the sandy river-right take-out across from Chimney Rock Bluff. It is a rural access with limited services; do not assume cell coverage or quick rescue response.",
        "NPS says no road follows the river, access roads may be unpaved or rocky, and GPS can be unreliable in the park. Carry a real map and do not assume cell service.",
        "This route uses the direct Pruitt gauge with minimum-only scoring. It is not a full ideal-range recommendation."
      ],
      "watchFor": [
        "Swift water, sharp bends, occasional obstacles, strainers, sweepers, and fresh flood wood.",
        "The Little Buffalo River enters about halfway through the Pruitt-to-Hasty half and NPS says the river typically gains velocity from there.",
        "Low water below about 100 cfs at Pruitt, when the Float Guide marks Pruitt very low and dragging or portage-like sections become likely.",
        "High water above the NPS 2,000 cfs Pruitt unsafe level; do not treat flood or rising water as suitable private-boater conditions."
      ]
    }
  },
  "buffalo-river-ozark-pruitt": {
    "putIn": {
      "id": "ozark-access",
      "name": "Ozark Campground / river access",
      "latitude": 36.062132,
      "longitude": -93.159724
    },
    "takeOut": {
      "id": "pruitt-launch",
      "name": "Pruitt Landing / Highway 7 access",
      "latitude": 36.057666,
      "longitude": -93.135032
    },
    "logistics": {
      "distanceLabel": "About 2.1 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr, usually around 1.5 hr at moderate water",
      "shuttle": "Stage the take-out at Pruitt Landing, then drive back to Ozark. NPS says shuttle time is about 15 minutes, but both accesses can still be slowed by gravel roads, congestion, mud, or river users loading boats. Inspect both accesses before launching.",
      "permits": "No route-specific private paddling permit is known for a normal Buffalo National River day trip. Follow NPS river rules, carry required PFDs, obey access and parking signs, and check park alerts, weather, and river level before launching.",
      "camping": "Ozark is a formal NPS campground and Pruitt is a major developed access, so this short reach works well as an endpoint-campground day float when the group wants a low-mileage Buffalo option near camp.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Ozark and take out at Pruitt for a short upper Buffalo run past riffles, pools, and the natural tunnel corridor. Use the direct Pruitt USGS gauge as the low-water check, and skip the route when the river is rising fast, very low, or above the NPS unsafe level.",
      "accessCaveats": [
        "NPS says to continue about half a mile past the Highway 7 bridge to reach Pruitt Landing on river left. Do not mistake the bridge area for the signed take-out.",
        "Ozark can attract swimmers and beach users, so loading space and parking rhythm may be different from quieter Buffalo accesses.",
        "NPS says no road follows the river, access roads may be unpaved or rocky, and GPS can be unreliable in the park. Carry a real map and do not assume cell service.",
        "This route uses the direct Pruitt gauge with minimum-only scoring. It is not a full ideal-range recommendation."
      ],
      "watchFor": [
        "Bouncy riffles, long pools, strainers, sweepers, fresh flood wood, and cold-water swims.",
        "Low water below about 100 cfs at Pruitt, when the Float Guide marks Pruitt very low and dragging or rocky shallows become likely.",
        "High water above the NPS 2,000 cfs Pruitt unsafe level; do not treat flood or rising water as suitable private-boater conditions.",
        "Crowding around Ozark and Pruitt, limited or no cell service, and fast weather-driven level changes on the upper Buffalo."
      ]
    }
  },
  "kings-river-rockhouse-trigger-gap": {
    "putIn": {
      "id": "rockhouse-access",
      "name": "Rockhouse Access",
      "latitude": 36.269833,
      "longitude": -93.664
    },
    "takeOut": {
      "id": "trigger-gap-private-access",
      "name": "Trigger Gap / Kings River Outfitters private fee access",
      "latitude": 36.314833,
      "longitude": -93.6635
    },
    "logistics": {
      "distanceLabel": "About 7.7 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr, longer with low water, stops, or the bridge portage",
      "shuttle": "Stage the take-out only after confirming Trigger Gap fee-access terms with the outfitter, then drive back to Rockhouse Access. Rockhouse is reached by gravel county-road access, and Trigger Gap sits off Highway 221 / CR 509; verify both landings, parking, and shuttle timing before launching.",
      "permits": "No route-specific public paddling permit is known, but the take-out is private fee access. Pay posted access or parking fees, make arrangements before leaving a vehicle, follow Arkansas boating and PFD rules, and respect smallmouth bass regulations if fishing.",
      "camping": "Treat this as a day trip. Gravel bars may look inviting, but AGFC and TNC emphasize private-property boundaries along the Kings corridor; do not camp or climb banks away from legal public or arranged access unless there is an emergency.",
      "summary": "Launch at AGFC-owned Rockhouse Access and take out at the private Trigger Gap access for a 7.7-mile Kings River day through the preserve corridor. Use the Berryville USGS gauge as a conservative low-water stage check, then make a same-day visual call at Rockhouse.",
      "accessCaveats": [
        "Rockhouse is public AGFC access just upstream from the Kings River Preserve, but the road is mostly gravel and same-day parking or launch conditions can change.",
        "Trigger Gap is a private fee access associated with Kings River Outfitters / Trigger Gap-area outfitters. Do not assume unpaid parking, after-hours access, or public-bank use.",
        "Much of the Kings River flows through private property. Stay on the water, gravel bars, and arranged access corridors; avoid posted, fenced, purple-painted, or developed private banks.",
        "The 3.2 ft threshold is a local route-guide minimum, not an official AGFC paddling band. The app does not claim an ideal range or high-water cutoff."
      ],
      "watchFor": [
        "Shallow gravel riffles and dragging when the Berryville gauge is near or below about 3.2 ft.",
        "A low-water bridge near the end of the route; local guidance recommends portaging on river left for safety.",
        "Fast rises after Ozark storms, rising water, fresh wood, strainers, and pushy bends against bluffs or gravel bars.",
        "Private-bank limits, fee-access rules at Trigger Gap, limited cell coverage, rural shuttle roads, and seasonal hunting activity near AGFC lands.",
        "Long pools, hot-weather slowdowns, afternoon storms, and late-day darkness if the group spends too long swimming or fishing."
      ]
    }
  },
  "buffalo-river-tyler-bend-gilbert": {
    "putIn": {
      "id": "tyler-bend-river-access",
      "name": "Tyler Bend river access",
      "latitude": 35.986715,
      "longitude": -92.763903
    },
    "takeOut": {
      "id": "gilbert-access",
      "name": "Gilbert river access",
      "latitude": 35.987738,
      "longitude": -92.715563
    },
    "logistics": {
      "distanceLabel": "About 5.4 to 5.5 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr at moderate water, longer with low water, crowds, or stops",
      "shuttle": "Stage the take-out at Gilbert, then drive back to Tyler Bend. Grinder's Ferry is an optional short take-out about a mile downstream of Tyler Bend, but this route assumes the full middle-district day to Gilbert. Check NPS access status, parking, and posted launch restrictions before leaving vehicles.",
      "permits": "No route-specific private paddling permit is known for a normal Buffalo National River day trip. Follow NPS river rules, carry required PFDs, obey access and parking signs, and check park alerts, weather, and river level before launching.",
      "camping": "Treat this as a day trip unless the group has a separate Buffalo backcountry plan. NPS allows sandbar or gravel-bar camping on the Buffalo under park rules, but this short middle-district reach is normally planned as a daylight float with vehicles staged at established accesses.",
      "summary": "Launch at Tyler Bend and take out at Gilbert for the popular 5.5-mile middle Buffalo float. Use the St. Joe USGS gauge as a conservative low-water check, and skip the route when water is rising fast or already in high/flood-stage bands for casual groups.",
      "accessCaveats": [
        "NPS says Tyler Bend has two launch areas. The upper launch may be reserved for concession operations during busy-season hours, and the lower launch is loading/unloading only with parking up at the picnic area.",
        "Gilbert is a rural river access on a gravel bar. Inspect the take-out before launching and avoid blocking local traffic, outfitter operations, or posted areas.",
        "NPS says access roads may be unpaved, rocky, or unreliable for GPS navigation, and no road follows the river. Carry a real map and do not assume cell service.",
        "This route uses a community-calibrated minimum-only threshold from MOHERP, supported by NPS route/access evidence and AW reach matching. It is not a full ideal-range recommendation."
      ],
      "watchFor": [
        "Swift Class I-II current, wave trains, sharp bends, and pushier water when the St. Joe gauge is high or rising.",
        "Strainers, sweepers, fresh flood wood, undercut banks, and blind side channels after Ozark storms.",
        "Low water below about 120 cfs at St. Joe, when dragging and shortened plans become likely.",
        "High water around and above 2,000 cfs at St. Joe; MOHERP labels this potentially dangerous for young or inexperienced paddlers, and flood-stage water should be avoided for casual trips.",
        "Crowded peak-season access, tubing traffic near Tyler Bend / Grinder's Ferry, limited cell coverage, cold-water swims, and late-day darkness if the group lingers on gravel bars."
      ]
    }
  },
  "buffalo-river-tyler-bend-grinders-ferry": {
    "putIn": {
      "id": "tyler-bend-river-access",
      "name": "Tyler Bend river access",
      "latitude": 35.986715,
      "longitude": -92.763903
    },
    "takeOut": {
      "id": "grinders-ferry-access",
      "name": "Grinder's Ferry access / gravel bar",
      "latitude": 35.986017,
      "longitude": -92.743686
    },
    "logistics": {
      "distanceLabel": "About 1.1 mi",
      "estimatedPaddleTime": "About 1 hr at moderate water, longer if the group floats, swims, or hikes the shuttle",
      "shuttle": "Stage the take-out at Grinder's Ferry, then drive back to Tyler Bend. NPS says the shuttle is about 10 minutes and roughly 3 miles, but confirm the exact launch and parking setup because Tyler Bend has separate upper and lower launch rules.",
      "permits": "No route-specific private paddling permit is known for a normal Buffalo National River day trip. Follow NPS river rules, carry required PFDs, obey posted launch and parking signs, and check current river level and weather before launching.",
      "camping": "Treat this as a short day float, but Tyler Bend Campground and Grinder's Ferry primitive camping both make it easy to stage an overnight before or after the run. Grinders is a gravel-bar primitive camping area with no potable water and periodic flood-softened vehicle access.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Tyler Bend and take out at Grinder's Ferry for a short middle-Buffalo float often used for tubing. Use the direct St. Joe gauge as the decision point, and avoid the route when water is too low to carry or already pushing into unsafe flood conditions.",
      "accessCaveats": [
        "NPS says Tyler Bend has two launches. The upper launch may be reserved for concession operations during busy hours, while the lower launch is loading/unloading only with parking up at the picnic area.",
        "Grinder's Ferry is a primitive gravel-bar access that can flood and soften. Confirm that the vehicle approach, turnaround, and take-out path are workable before launching.",
        "Even on this short reach, Buffalo access roads and GPS routing can be unreliable. Carry a real park map and do not assume cell service.",
        "This route uses a community-calibrated St. Joe minimum-only threshold paired with official NPS route and safety evidence. It is not a full ideal-range recommendation."
      ],
      "watchFor": [
        "Swift current, wood, strainers, and pushier water when the St. Joe gauge rises.",
        "Low water below about 120 cfs at St. Joe, when dragging and shallow lines become likely.",
        "Very high water approaching or above the NPS 8,000 cfs Grinder's Ferry unsafe level.",
        "Crowded tubing traffic, swimmers, and concession traffic near Tyler Bend and the short-access middle corridor.",
        "Soft gravel bars, hot-weather complacency, afternoon storms, and cold-water swims when rain refreshes the reach."
      ]
    }
  },
  "cossatot-river-ed-banks-highway-278": {
    "putIn": {
      "id": "ed-banks-access",
      "name": "Ed Banks Access / low-water bridge",
      "latitude": 34.33975,
      "longitude": -94.25069
    },
    "takeOut": {
      "id": "highway-278-cossatot-access",
      "name": "Highway 278 Access / Cossatot State Park corridor",
      "latitude": 34.29388,
      "longitude": -94.17704
    },
    "logistics": {
      "distanceLabel": "About 6 to 6.4 mi",
      "estimatedPaddleTime": "Expert whitewater run; allow extra time for scouting, portages, rescue margin, and rough-road shuttle delays",
      "shuttle": "Stage the take-out at the Highway 278 access corridor, then drive rough park/forest roads back to Ed Banks Access. Arkansas State Parks says Weyerhaeuser roads are used for timber hauling and signs guide visitors to interior river access points; inspect road, bridge, and parking conditions before leaving vehicles.",
      "permits": "No private paddling permit is known for a normal day run, but this is managed park-natural-area land. Follow Arkansas State Parks rules, carry required whitewater safety gear, wear PFDs, use helmets, obey glass/container and bridge-parking rules, and check current stage, weather, and park guidance before launching.",
      "camping": "Treat this as a committed day run unless the group has a separate park camping plan. Arkansas State Parks lists primitive camping at Ed Banks, Sandbar, Cossatot Falls, and U.S. 278 access areas, but this route should not depend on unplanned overnight stops or private-bank exits.",
      "summary": "Launch at Ed Banks Access and take out at the Highway 278 access for the Cossatot Falls Section. This is not a casual float: use the USGS Vandervoort / Hwy 246 stage as a same-day decision point and skip the run when the river is below the rocky floor, above the expert cutoff, rising fast, or outside the group skill set.",
      "accessCaveats": [
        "Ed Banks and the interior access roads are rough, remote, and subject to rain, flood, low-water-bridge, and timber-hauling conditions. Do not assume low-clearance vehicles can reach the launch after wet weather.",
        "The Highway 278 take-out is the required exit for this route. Confirm the landing, parking, and route back to the vehicle before launching.",
        "Arkansas State Parks warns not to drive across low-water bridges during high water and prohibits parking on bridges.",
        "Endpoint coordinates are practical access-area anchors from public map and park/natural-area records, not survey-grade launch points. Make a same-day visual access check."
      ],
      "watchFor": [
        "Class III-IV+ rapids, ledge holes, steep drops, pin rocks, sieves, undercuts, hydraulics, and the six-drop Cossatot Falls sequence.",
        "The Esses, Cossatot Falls, Deer Camp Rapid, Devil Hollow Rapid, Devil Hollow Falls, and Sandbar Bridge low-clearance/hydraulic hazards.",
        "Low water below about 3.3 ft at the Hwy 246 / Vandervoort gauge, when the route becomes rocky, technical, and boat-damaging.",
        "High water around 5.4 ft and above, when Arkansas State Parks describes high/expert conditions and American Whitewater notes large holes and merged drops.",
        "Fast rain rises, tributary inflow below the gauge, fresh wood, cold-water swims, limited cell service, remote rescue exposure, and no-solo consequences."
      ]
    }
  },
  "mulberry-river-redding-turner-bend": {
    "putIn": {
      "id": "redding-recreation-area",
      "name": "Redding Recreation Area canoe launch",
      "latitude": 35.68282778,
      "longitude": -93.78651111
    },
    "takeOut": {
      "id": "turner-bend-landing",
      "name": "Turner Bend landing / Highway 23 bridge",
      "latitude": 35.671667,
      "longitude": -93.829444
    },
    "logistics": {
      "distanceLabel": "About 3.6 to 4 mi",
      "estimatedPaddleTime": "Short whitewater run; allow extra time for scouting, wood, access fees, and shuttle coordination",
      "shuttle": "Stage the take-out only after confirming Turner Bend access, parking, wristband, and shuttle terms, then drive back to Redding Recreation Area. Inspect both landings before launching because high water, crowds, private-access rules, and rough forest roads can change the plan.",
      "permits": "No route-specific private paddling permit is known, but both endpoints have access terms. Pay Forest Service day-use fees at Redding when required, buy Turner Bend access or parking permissions before using its landing, follow Arkansas boating and PFD rules, and check current weather, stage, and trend before launching.",
      "camping": "Treat this as a short day run unless the group has a separate legal camping plan. Redding has Forest Service campground facilities and Turner Bend has private campground options, but do not depend on unplanned riverbank camping or private-bank exits.",
      "summary": "Launch at the Forest Service Redding Recreation Area and take out at the private-fee Turner Bend landing for a short Mulberry River whitewater run. Use the downstream USGS Mulberry gauge as the Paddle Today scoring source, then make a same-day visual call at Redding and Turner Bend.",
      "accessCaveats": [
        "Redding Recreation Area is an official Forest Service river access with a rock canoe launch and day-use fees, but road, parking, and flood cleanup conditions can still vary.",
        "Turner Bend is a private-fee landing. Private boaters need current access wristbands, parking permits, or shuttle arrangements; do not assume unpaid or after-hours landing use.",
        "The route uses the USGS Mulberry River near Mulberry stage range published by American Whitewater. Turner Bend also publishes a local staff-gauge ladder, but Paddle Today does not treat that as the live product gauge.",
        "The take-out coordinate is a practical Highway 23 / Turner Bend bridge corridor anchor. Confirm the signed Turner Bend landing and loading rules before launching."
      ],
      "watchFor": [
        "Class I-III rapids, wave trains, sharp bends, rocks, ledges, and pushy current when the river is up.",
        "Low water below about 1.55 ft at the USGS gauge, when scraping, dragging, and pinning risk increase.",
        "High water around and above 6.0 ft at the USGS gauge, outside the American Whitewater runnable envelope used by Paddle Today.",
        "Fast rises after Ozark storms, fresh wood, strainers, muddy water, cold swims, and limited cell service in the forest corridor.",
        "Private-access limits at Turner Bend, busy spring weekends, rural shuttle delays, and late-day darkness if the group waits on access logistics."
      ]
    }
  },
  "ouachita-river-remmel-whitewater-park": {
    "putIn": {
      "id": "remmel-dam-tailrace-access",
      "name": "Remmel Dam tailrace / below-dam river access",
      "latitude": 34.426111,
      "longitude": -92.890833
    },
    "takeOut": {
      "id": "ouachita-river-whitewater-park",
      "name": "Ouachita River Whitewater Park / Rockport",
      "latitude": 34.39427,
      "longitude": -92.84158
    },
    "logistics": {
      "distanceLabel": "About 5.9 to 6 mi",
      "estimatedPaddleTime": "About 3 hr to 4 hr during normal recreation releases, longer at low scrape-through flows or with take-out congestion",
      "shuttle": "Stage the take-out at Ouachita River Whitewater Park, 904 Riverview Drive in Malvern, then drive back toward the Remmel Dam access. Entergy says the floating entrance is a boat ramp near the dam through the gate just past the operations entrance at 170 Remmel Dam Road, and its safety page also lists Ouachita River Access Below Remmel Dam at 489 McGuire Road. Follow current signs, gates, parking marks, and any Entergy access changes on arrival.",
      "permits": "No route-specific private paddling permit is known for normal private use, but this is a dam-release corridor with posted access rules. Follow Entergy signs, Arkansas boating and PFD rules, no-glass and litter rules, park rules at the Whitewater Park, and any current release or closure notices.",
      "camping": "Treat this as a daylight day trip. Entergy closes the Remmel Dam tailrace gate nightly and has specifically acted against unauthorized camping below the dam because water can rise rapidly during storms or operations.",
      "summary": "Launch below Remmel Dam and take out at Ouachita River Whitewater Park for the standard Rockport / Malvern float. Use the Remmel Dam USGS gauge, Entergy release guidance, and same-day weather before launching, and make an active left-bank take-out plan before Rockport Ledge and the I-30 bridge.",
      "accessCaveats": [
        "The put-in coordinate is a practical Remmel Dam gauge/access-area anchor, not a survey-grade boat-ramp point. Use Entergy signs and the posted gate/parking layout to find the active launch.",
        "The Remmel Dam gate closes nightly at 10 p.m.; retrieve vehicles before the gate closes and do not depend on overnight access.",
        "Entergy says some navigation apps may misroute users near Remmel Dam. From I-30, use Exit 98B / Highway 270 toward Hot Springs and confirm the signed dam access in daylight.",
        "At the take-out, Entergy says to move to the left bank when the I-30 bridge comes into view. The boat ramp is on the left after the rapid but before the bridge; missing it can leave paddlers fighting current back upstream."
      ],
      "watchFor": [
        "Rockport Ledge at the take-out, including chutes that can flip, pin, or swamp canoes and the far-right Lion's Den / Tiger hazard.",
        "Dam-release changes, strong current, undertows, cold tailwater, sirens or warning signs, and fast water-level changes from weather or power operations.",
        "Flows near 200-500 cfs may be kayakable but scrape-through and slow. Entergy says lower than about 3,200 cfs can be too low for an enjoyable tube float.",
        "Flows above 4,000 cfs are outside Entergy's floating recommendation; skip the route if water is above the group skill set, rising quickly, or affected by storm runoff.",
        "Crowded summer release windows, tubers tied together, swimmers at the Whitewater Park, rocks, slippery exits, limited rescue margin at the ledge, and late-day darkness."
      ]
    }
  },
  "saline-river-tony-kelly-lyle-park": {
    "putIn": {
      "id": "tony-kelly-ford-access",
      "name": "Tony Kelly Ford Access",
      "latitude": 34.5844,
      "longitude": -92.6938
    },
    "takeOut": {
      "id": "lyle-park-access",
      "name": "Lyle Park Access",
      "latitude": 34.5873,
      "longitude": -92.6051
    },
    "logistics": {
      "distanceLabel": "About 8.2 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr, longer with low water, swimming, or fishing stops",
      "shuttle": "Stage the take-out at Lyle Park in Benton, then drive back to Tony Kelly Ford Access. Inspect both launches before leaving vehicles because gravel, mud, and recent rain can change the approach and footing.",
      "permits": "No route-specific paddling permit is known. Use the named public Arkansas Water Trails accesses, follow Arkansas boating and PFD rules, and respect any same-day city, county, or wildlife-agency parking signs.",
      "camping": "Treat this as a day trip. The reviewed AGFC route materials did not identify route camping at Tony Kelly Ford or Lyle Park, and adjacent banks outside the public access sites should be treated as private.",
      "campingClassification": "none",
      "summary": "Launch at Tony Kelly Ford Access and take out at Lyle Park for the upper Benton Saline River water-trail segment. The direct Benton gauge works well here because the route finishes before the downstream spillway and low-water-bridge hazard that complicate lower segments.",
      "accessCaveats": [
        "Tony Kelly Ford is a simple public river access with no developed campground support in the reviewed source set.",
        "Lyle Park is the clean public take-out before the lower-river spillway and low-water-bridge hazards downstream of Benton.",
        "The current Benton gauge reading during this run sat near the low end of the general paddle band, so expect more scraping and slower shoals than on stronger flow days.",
        "Stay with the named public access points and avoid private banks, fences, signs, and purple-painted property lines along the corridor."
      ],
      "watchFor": [
        "Low water around and below 3.5 ft, when dragging across shoals and slower pools becomes more likely.",
        "Higher water above about 5.0 ft, when AGFC says the river becomes experienced-only with faster current and less forgiving eddies.",
        "Fast chutes, riffles, strainers, fresh flood wood, muddy exits, and pushier current after thunderstorms.",
        "Private banks, anglers, swimmers near town, and late-day headwinds or heat on the longer pools."
      ]
    }
  },
  "upper-illinois-river-chamber-springs-siloam-kayak-park": {
    "putIn": {
      "id": "chamber-springs-access",
      "name": "Chamber Springs Access",
      "latitude": 36.166937,
      "longitude": -94.434458
    },
    "takeOut": {
      "id": "siloam-springs-kayak-park",
      "name": "Siloam Springs Kayak Park",
      "latitude": 36.12361,
      "longitude": -94.51751
    },
    "logistics": {
      "distanceLabel": "About 8.1 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr, longer with lower water, private-bank caution, or feature scouting at the finish",
      "shuttle": "Stage the take-out at Siloam Springs Kayak Park, then drive back to Chamber Springs Access. Inspect the kayak-park take-out in person before launching so the group knows where to exit or carry around the feature at the end of the run.",
      "permits": "No route-specific private paddling permit is known. Follow Arkansas boating and PFD rules, use the named public accesses only, and respect posted city, county, and state-line regulations if your group also plans to continue into Oklahoma.",
      "camping": "Nearby basecamp options exist rather than route camping. AGFC lists Gypsy Camp and Canoe plus Illinois River RV and Campground as nearby trip-support options, but this 8.1-mile segment is normally paddled as a day trip between public accesses.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Chamber Springs Access and take out at Siloam Springs Kayak Park for the upstream Arkansas segment of the Upper Illinois River Water Trail. The direct Siloam Springs gauge gives the corridor decision point, but the current reading during this run was far above the broad audience flow band.",
      "accessCaveats": [
        "Much of the Illinois River corridor passes private land marked by fences, signs, or purple paint. Stay on the water and use only the named public accesses.",
        "The Siloam Springs Kayak Park take-out includes Class II+ features; less-experienced paddlers should scout the finish and carry around if needed.",
        "The current gauge reading during this run was above the experienced-only threshold, so treat the source package as route evidence rather than as a same-day go recommendation.",
        "Nearby campgrounds and outfitters can support a weekend, but they are not on-route campsites and should not be implied as mid-float camping."
      ],
      "watchFor": [
        "Low water below about 200 cfs, when AGFC says the river may be too low to float well.",
        "Water above 1,000 cfs, which AGFC reserves for experienced floaters only.",
        "Fast rain rises, strainers, wood after storms, slippery banks, and confusion around private land or informal stop points.",
        "Class II+ take-out features at the kayak park, especially if the group waits too long to set up the exit."
      ]
    }
  },
  "upper-illinois-river-siloam-kayak-park-woka": {
    "putIn": {
      "id": "siloam-springs-kayak-park",
      "name": "Siloam Springs Kayak Park",
      "latitude": 36.12361,
      "longitude": -94.51751
    },
    "takeOut": {
      "id": "woka-whitewater-park",
      "name": "WOKA Whitewater Park",
      "latitude": 36.13388,
      "longitude": -94.5661
    },
    "logistics": {
      "distanceLabel": "About 7.4 mi",
      "estimatedPaddleTime": "About 3.5 hr to 5.5 hr, longer with feature carries, lower water, or shuttle delays",
      "shuttle": "Stage the take-out at WOKA Whitewater Park in Oklahoma, then drive back to Siloam Springs Kayak Park. Scout both whitewater parks before launching so the group has a clear carry-around plan at the start and finish if anyone does not want to run the features.",
      "permits": "No route-specific paddling permit is known, but this is a two-state corridor. Follow Arkansas and Oklahoma boating and PFD rules, note that Oklahoma bars glass and Styrofoam on the Illinois River, and use the named public parks only.",
      "camping": "Nearby basecamp options exist rather than route camping. AGFC lists Gypsy Camp and Canoe, Illinois River RV and Campground, and the two whitewater parks as nearby trip-support resources, but this segment is normally handled as a day float.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch from Siloam Springs Kayak Park and take out at WOKA Whitewater Park for the lower Upper Illinois Water Trail segment. This is a guarded route because both endpoints include whitewater-park features even though most of the in-between mileage is gentler current.",
      "accessCaveats": [
        "Both endpoints are public parks, but both also include Class II+ features that paddlers may need to carry around.",
        "The current Siloam gauge reading during this run was far above the broad audience flow band, so the route should be treated as source-backed inventory work rather than a same-day casual recommendation.",
        "Much of the river corridor remains private land. Do not assume casual bank stops, parking pull-offs, or emergency exits are legal outside the named accesses.",
        "This route crosses into Oklahoma at the take-out. Verify same-day rules, event closures, and park operations before launching."
      ],
      "watchFor": [
        "Low water below about 200 cfs, when AGFC says the river may be too low to float well.",
        "Water above 1,000 cfs, which AGFC reserves for experienced floaters only and which raises consequence at both whitewater parks.",
        "Class II+ features at Siloam Springs Kayak Park and WOKA Whitewater Park; scout and carry around anything outside the group skill set.",
        "Fast rain rises, wood, strainers, slippery concrete or rock around the parks, private-bank issues, and interstate shuttle delays."
      ]
    }
  },
  "ouachita-river-dragover-west-east": {
    "putIn": {
      "id": "dragover-day-use-west-access",
      "name": "Dragover Day Use upstream / west access",
      "latitude": 34.6375007629395,
      "longitude": -93.6297988891602
    },
    "takeOut": {
      "id": "dragover-day-use-east-access",
      "name": "Dragover Day Use downstream / east access",
      "latitude": 34.6383018493652,
      "longitude": -93.6266021728516
    },
    "logistics": {
      "distanceLabel": "About 2.9 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr, longer with scouting, repeat laps, low-water scraping, or slower groups",
      "shuttle": "Both landings sit inside Dragover Day Use. Many groups handle this as a short same-site shuttle or walkback, but inspect the current site road, parking, and access paths before launching and stage the downstream/east vehicle first if you want the cleanest finish.",
      "permits": "No route-specific private paddling permit is known. USFS lists Dragover as a no-fee public day-use river access with canoe launching; follow current forest, boating, parking, and PFD rules and skip the route if the site is signed closed or the water is outside the group skill set.",
      "camping": "Treat this as a short day-use run. The reviewed USFS page is for day use and notes no potable water, so do not assume overnight staging or camping rights at the access.",
      "summary": "Launch at the upstream/west Dragover landing and take out at the downstream/east landing for a short Upper Ouachita whitewater lap. Use the Mount Ida stage gauge, keep the low-water floor conservative at 3.0 ft, and read the access and hazard features before committing to repeat runs.",
      "accessCaveats": [
        "USFS publishes one Dragover Day Use site coordinate, while the distinct west and east landing coordinates come from American Whitewater feature data. Use current on-site signs and parking layout rather than a saved pin alone.",
        "American Whitewater describes steep stairs, rollers, and rocky access at the upstream landing. Scout the carry and make sure every paddler can manage the launch and exit safely.",
        "Both landings are in the same day-use area, but the route still needs an exit plan. Confirm the downstream/east landing before putting on so the group does not drift past the intended take-out.",
        "USFS says Dragover Day Use has no potable water. Bring water and do not rely on services at the site."
      ],
      "watchFor": [
        "Class I-II rapids, shallow rock gardens, and faster current around Hungry Hole, Big Rock, and other short features on the reach.",
        "Low water below about 3.0 ft, where scraping, pinning on rocks, and awkward launches become more likely.",
        "Higher water around and above 5.0 ft, where American Whitewater says the route is still runnable but noticeably pushier than this conservative route recommendation.",
        "Fresh wood, strainers, slippery rocks, thunderstorms, and fast rain-driven rises on this short upper Ouachita reach.",
        "Crowding or staging conflicts inside the small day-use access area, especially if multiple groups are lapping the reach."
      ]
    }
  },
  "saline-river-peeler-bend-lyle-park": {
    "putIn": {
      "id": "peeler-bend",
      "name": "Peeler Bend",
      "latitude": 34.5852,
      "longitude": -92.6467
    },
    "takeOut": {
      "id": "lyle-park-access",
      "name": "Lyle Park Access",
      "latitude": 34.5873,
      "longitude": -92.6051
    },
    "logistics": {
      "distanceLabel": "About 3.8 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr, longer with low water, swimming, or fishing stops",
      "shuttle": "Stage the take-out at Lyle Park in Benton, then drive back to Peeler Bend. Inspect both launches before leaving vehicles because gravel, mud, and recent rain can change the approach and footing.",
      "permits": "No route-specific paddling permit is known. Use the named public Arkansas Water Trails accesses, follow Arkansas boating and PFD rules, and respect any same-day city, county, or wildlife-agency parking signs.",
      "camping": "Treat this as a day trip. The reviewed AGFC route materials did not identify route camping at Peeler Bend or Lyle Park, and adjacent banks outside the public access sites should be treated as private.",
      "campingClassification": "none",
      "summary": "Launch at Peeler Bend and take out at Lyle Park for the short middle Benton Saline River split. The direct Benton gauge works well here because the route finishes before the downstream spillway and low-water-bridge hazard package.",
      "accessCaveats": [
        "Peeler Bend is a simple public access with limited developed support in the reviewed source set.",
        "Lyle Park is the clean public take-out before the lower-river spillway and low-water-bridge hazards downstream of Benton.",
        "The current Benton gauge reading during this run sat below the broad paddle band, so expect more scraping and slower shoals than on stronger flow days.",
        "Stay with the named public access points and avoid private banks, fences, signs, and purple-painted property lines along the corridor."
      ],
      "watchFor": [
        "Low water around and below 3.5 ft, when dragging across shoals and slower pools becomes more likely.",
        "Higher water above about 5.0 ft, when AGFC says the river becomes experienced-only with faster current and less forgiving eddies.",
        "Fast chutes, riffles, strainers, fresh flood wood, muddy exits, and pushier current after thunderstorms.",
        "Private banks, anglers, swimmers near town, and short-notice thunderstorms on this more urban split."
      ]
    }
  },
  "saline-river-lyle-park-saline-crossing": {
    "putIn": {
      "id": "lyle-park-access",
      "name": "Lyle Park Access",
      "latitude": 34.5873,
      "longitude": -92.6051
    },
    "takeOut": {
      "id": "saline-crossing-access",
      "name": "Saline Crossing Access",
      "latitude": 34.54106,
      "longitude": -92.60718
    },
    "logistics": {
      "distanceLabel": "About 4.2 mi",
      "estimatedPaddleTime": "About 2 hr to 3 hr, longer with scouting, low-water dragging, or the spillway portage",
      "shuttle": "Stage the take-out at Saline Crossing, then drive back to Lyle Park. Inspect both ends before launching and decide in advance how the group will handle the spillway / low-dam portage below Lyle Park.",
      "permits": "No route-specific paddling permit is known. Use the named public Arkansas Water Trails accesses, follow Arkansas boating and PFD rules, and respect any same-day city, county, or wildlife-agency parking signs.",
      "camping": "Treat this as a day trip. The reviewed AGFC route materials did not identify route camping at Lyle Park or Saline Crossing, and adjacent banks outside the public access sites should be treated as private.",
      "campingClassification": "none",
      "summary": "Launch at Lyle Park and take out at Saline Crossing for the lower Benton Saline split. This route includes the Benton spillway / low-dam and low-water-bridge hazard package, so scout, portage conservatively, and do not treat it like a casual downstream float.",
      "accessCaveats": [
        "Cherry Demuth Access is currently closed, so do not depend on it as a planned mid-route bailout or shuttle point.",
        "AGFC says the Benton Water Purification Plant spillway or low dam about 1.6 miles below Lyle Park can be hazardous and should be portaged when the river is below 4 ft.",
        "AGFC also warns the downstream low-water bridge loses clearance as the river rises; at 6 ft there is not enough air space to pass under it and portage becomes mandatory.",
        "Stay with the named public access points and avoid private banks, fences, signs, and purple-painted property lines along the corridor."
      ],
      "watchFor": [
        "Low water around and below 3.5 ft, when dragging, slower shoals, and a more awkward spillway portage become more likely.",
        "Higher water above about 5.0 ft, when AGFC says the lower route becomes experienced-only and bridge / current consequences increase.",
        "Fast chutes, riffles, strainers, fresh flood wood, muddy exits, and pushier current after thunderstorms.",
        "The spillway / low-dam portage, downstream bridge clearance, private banks, and late-day decision fatigue on a short but hazard-heavy lower segment."
      ]
    }
  },
  "saline-river-peeler-bend-saline-crossing": {
    "putIn": {
      "id": "peeler-bend",
      "name": "Peeler Bend",
      "latitude": 34.5852,
      "longitude": -92.6467
    },
    "takeOut": {
      "id": "saline-crossing-access",
      "name": "Saline Crossing Access",
      "latitude": 34.54106,
      "longitude": -92.60718
    },
    "logistics": {
      "distanceLabel": "About 8 mi",
      "estimatedPaddleTime": "About 4 hr to 6 hr, longer with scouting, low-water dragging, or the spillway portage",
      "shuttle": "Stage the take-out at Saline Crossing, then drive back to Peeler Bend. Inspect Peeler, Lyle, and the Saline Crossing finish before launch so the group already knows the lower-hazard plan and any same-day parking issues.",
      "permits": "No route-specific paddling permit is known. Use the named public Arkansas Water Trails accesses, follow Arkansas boating and PFD rules, and respect any same-day city, county, or wildlife-agency parking signs.",
      "camping": "Treat this as a day trip. The reviewed AGFC route materials did not identify legal route camping at Peeler Bend, Lyle Park, or Saline Crossing, and adjacent banks outside the public access sites should be treated as private.",
      "campingClassification": "none",
      "summary": "Launch at Peeler Bend and take out at Saline Crossing for an 8-mile lower Benton Saline day. The route extends the simple Peeler-to-Lyle split into the lower spillway / bridge hazard zone, so paddlers should plan the portage and final hazard sequence before leaving the put-in.",
      "accessCaveats": [
        "Peeler Bend is a straightforward public access, but parking and launch conditions can change quickly with rain and runoff.",
        "Lyle Park is the last clean developed public access before the lower spillway / low-dam and low-water-bridge hazard package.",
        "Cherry Demuth Access is currently closed, so do not treat it as a dependable bailout or alternate shuttle point on this route.",
        "AGFC says the Benton Water Purification Plant spillway or low dam below Lyle Park should be portaged when the river is below 4 ft, and the downstream low-water bridge loses clearance as the river rises."
      ],
      "watchFor": [
        "Low water around and below 3.5 ft, when dragging across shoals and a slower portage sequence become more likely.",
        "Higher water above about 5.0 ft, when AGFC says the lower route becomes experienced-only with faster current and tighter bridge clearance.",
        "Fast chutes, riffles, strainers, fresh flood wood, muddy exits, and pushier current after thunderstorms.",
        "Private banks, anglers, swimmers near town, and the risk of arriving at the lower hazard package late in the day or tired."
      ]
    }
  },
  "saline-river-tony-kelly-saline-crossing": {
    "putIn": {
      "id": "tony-kelly-ford-access",
      "name": "Tony Kelly Ford Access",
      "latitude": 34.5844,
      "longitude": -92.6938
    },
    "takeOut": {
      "id": "saline-crossing-access",
      "name": "Saline Crossing Access",
      "latitude": 34.54106,
      "longitude": -92.60718
    },
    "logistics": {
      "distanceLabel": "About 12.4 mi",
      "estimatedPaddleTime": "About 5.5 hr to 8 hr, longer with scouting, low-water dragging, swimming stops, or the lower spillway portage",
      "shuttle": "Stage the take-out at Saline Crossing, then drive back to Tony Kelly Ford Access. Inspect Tony Kelly, Lyle Park, and Saline Crossing before launch so the group has a firm lower-hazard plan and realistic daylight pace.",
      "permits": "No route-specific paddling permit is known. Use the named public Arkansas Water Trails accesses, follow Arkansas boating and PFD rules, and respect any same-day city, county, or wildlife-agency parking signs.",
      "camping": "Treat this as a long day trip. The reviewed AGFC route materials did not identify legal route camping at Tony Kelly Ford or Saline Crossing, and adjacent banks outside the public access sites should be treated as private.",
      "campingClassification": "none",
      "summary": "Launch at Tony Kelly Ford and take out at Saline Crossing for the longest current lower-Benton Saline day that still uses fully public named accesses. The route combines the upper Tony-Kelly segment with the downstream spillway / bridge hazard package, so mileage and hazard management both matter.",
      "accessCaveats": [
        "Tony Kelly Ford is a simple public river access with limited parking and no developed campground support in the reviewed source set.",
        "Lyle Park is the key intermediate public access before the lower spillway / low-dam and low-water-bridge hazards downstream of Benton.",
        "Cherry Demuth Access is currently closed, so do not treat it as a dependable bailout or shuttle point on this route.",
        "AGFC says the Benton Water Purification Plant spillway or low dam below Lyle Park should be portaged when the river is below 4 ft, and the downstream low-water bridge loses clearance as the river rises."
      ],
      "watchFor": [
        "Low water around and below 3.5 ft, when dragging across shoals, slower pools, and the lower portage sequence can turn this into a long day.",
        "Higher water above about 5.0 ft, when AGFC says the lower route becomes experienced-only and the long commitment becomes less forgiving.",
        "Fast chutes, riffles, strainers, fresh flood wood, muddy exits, and pushier current after thunderstorms.",
        "Private banks, anglers, swimmers near town, and the risk of reaching the lower-hazard package tired, late, or with limited daylight left."
      ]
    }
  },
  "upper-illinois-river-chamber-springs-woka": {
    "putIn": {
      "id": "chamber-springs-access",
      "name": "Chamber Springs Access",
      "latitude": 36.166937,
      "longitude": -94.434458
    },
    "takeOut": {
      "id": "woka-whitewater-park",
      "name": "WOKA Whitewater Park",
      "latitude": 36.13388,
      "longitude": -94.5661
    },
    "logistics": {
      "distanceLabel": "About 15.5 mi",
      "estimatedPaddleTime": "About 7 hr to 10 hr, longer with feature carries, lower water, or shuttle delays",
      "shuttle": "Stage the take-out at WOKA Whitewater Park in Oklahoma, then drive back to Chamber Springs Access. Scout Siloam Springs Kayak Park and WOKA before launching so the group has a clear carry-around plan at both park features if needed.",
      "permits": "No route-specific paddling permit is known, but this is a two-state corridor. Follow Arkansas and Oklahoma boating and PFD rules, note that Oklahoma bars glass and Styrofoam on the Illinois River, and use the named public parks and accesses only.",
      "camping": "Nearby basecamp options exist rather than route camping. AGFC lists Gypsy Camp and Canoe, Illinois River RV and Campground, and the two whitewater parks as nearby trip-support resources, but this full route is normally handled as a long day float.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Chamber Springs Access and take out at WOKA Whitewater Park for the full Upper Illinois Water Trail route. This is a guarded long route because it passes one Class II+ kayak park mid-route and finishes at another in Oklahoma.",
      "accessCaveats": [
        "The route is source-backed and public at both ends, but it is long enough that the group should inspect the midpoint kayak park and final WOKA take-out before committing.",
        "The current Siloam gauge reading during this run was far above the broad audience flow band, so the route should be treated as source-backed inventory work rather than a same-day casual recommendation.",
        "Much of the river corridor remains private land. Do not assume casual bank stops, parking pull-offs, or emergency exits are legal outside the named accesses.",
        "This route crosses into Oklahoma at the take-out. Verify same-day rules, event closures, and park operations before launching."
      ],
      "watchFor": [
        "Low water below about 200 cfs, when AGFC says the river may be too low to float well.",
        "Water above 1,000 cfs, which AGFC reserves for experienced floaters only and which raises consequence at both whitewater parks.",
        "Class II+ features at Siloam Springs Kayak Park and WOKA Whitewater Park; scout and carry around anything outside the group skill set.",
        "Fast rain rises, wood, strainers, slippery concrete or rock around the parks, private-bank issues, and interstate shuttle delays."
      ]
    }
  },
  "crooked-creek-lower-pyatt-kelleys-slab": {
    "putIn": {
      "id": "lower-pyatt-access",
      "name": "Lower Pyatt Access",
      "latitude": 36.24665,
      "longitude": -92.83494
    },
    "takeOut": {
      "id": "kelleys-slab-access",
      "name": "Kelley's Slab Access",
      "latitude": 36.22921,
      "longitude": -92.71045
    },
    "logistics": {
      "distanceLabel": "About 18.5 mi for the full corridor; choose a shorter segment in the access planner",
      "estimatedPaddleTime": "About 7 hr to 10 hr for the full corridor, longer with low water, fishing stops, shoal scouting, or a careful Kelley's Slab finish",
      "shuttle": "Stage the take-out at Kelley's Slab Access, then drive back to Lower Pyatt Access. Snow and Mark Oliver are the clean intermediate public split points if the full corridor is too long for the day.",
      "permits": "No route-specific paddling permit is known. Use the named public AGFC access points, follow Arkansas boating and PFD rules, and respect posted parking signs at each access.",
      "camping": "Snow Access, Brooksher Crooked Creek Preserve, and Fred Berry Crooked Creek Nature Center give this corridor real designated-campsite support, but AGFC limits camping and private banks remain off-limits.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Lower Pyatt Access and use Snow, Mark Oliver, or Kelley's Slab as the selected take-out for the Crooked Creek access-planner corridor. This is a rain-sensitive Ozark creek float keyed to the Kelly Crossing gauge rather than to a broad flatwater assumption.",
      "accessCaveats": [
        "Lower Pyatt, Snow, Mark Oliver, and Kelley's Slab are named public AGFC Crooked Creek Water Trail accesses with simple rural launches rather than full-service park ramps.",
        "The current Kelly Crossing gauge reading during this run was inside AGFC's moderate band, but the creek can rise or muddy quickly after storms.",
        "Stay with the named public access points and avoid private banks, fences, signs, and purple-painted property along the creek.",
        "Scout Kelley's Slab before committing to the full downstream finish when the creek is up, dirty, or unfamiliar."
      ],
      "watchFor": [
        "Water below about 12 ft, when scraping and slower riffles become more likely.",
        "Fast post-rain rises, fresh wood, strainers, muddy exits, and stronger current than the clear-water appearance suggests.",
        "Shoals, riffles, small waves, rural self-rescue conditions, and the Kelley's Slab finish hazard AGFC flags under some conditions."
      ]
    },
    "accessPoints": [
      {
        "id": "lower-pyatt-access",
        "name": "Lower Pyatt Access",
        "latitude": 36.24665,
        "longitude": -92.83494,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default full-corridor put-in."
      },
      {
        "id": "snow-access",
        "name": "Snow Access",
        "latitude": 36.24352,
        "longitude": -92.79995,
        "mileFromStart": 6.7,
        "segmentKind": "creek",
        "note": "Intermediate public access with primitive campsites."
      },
      {
        "id": "mark-oliver-access",
        "name": "Mark Oliver Access",
        "latitude": 36.24973,
        "longitude": -92.7486,
        "mileFromStart": 11.9,
        "segmentKind": "creek",
        "note": "Intermediate public access for shorter middle-corridor trips."
      },
      {
        "id": "kelleys-slab-access",
        "name": "Kelley's Slab Access",
        "latitude": 36.22921,
        "longitude": -92.71045,
        "mileFromStart": 18.5,
        "segmentKind": "creek",
        "note": "Default full-corridor take-out; scout when water is up or dirty."
      }
    ]
  },
  "crooked-creek-lower-pyatt-snow": {
    "putIn": {
      "id": "lower-pyatt-access",
      "name": "Lower Pyatt Access",
      "latitude": 36.24665,
      "longitude": -92.83494
    },
    "takeOut": {
      "id": "snow-access",
      "name": "Snow Access",
      "latitude": 36.24352,
      "longitude": -92.79995
    },
    "logistics": {
      "distanceLabel": "6.7 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr depending on level, fishing stops, and how much dragging the shoals require",
      "shuttle": "Stage the take-out at Snow Access, then drive back to Lower Pyatt Access. Snow is the first clean public split on the Crooked Creek trail and works well when the longer corridor feels too ambitious for current conditions.",
      "permits": "No route-specific paddling permit is known. Use the named public AGFC access points, follow Arkansas boating and PFD rules, and respect posted parking signs at each access.",
      "camping": "Primitive campsites at Snow Access can support a legal endpoint overnight, but AGFC limits camping to one night per campsite and private banks remain off-limits.",
      "campingClassification": "endpoint_campground",
      "summary": "Launch at Lower Pyatt Access and take out at Snow Access for the first official Crooked Creek segment. This is a rain-sensitive Ozark creek float keyed to the Kelly Crossing gauge rather than to a broad flatwater assumption.",
      "accessCaveats": [
        "Lower Pyatt and Snow are named public AGFC Crooked Creek Water Trail accesses with simple rural launches rather than full-service park ramps.",
        "The current Kelly Crossing gauge reading during this run was below AGFC's moderate band, so expect more scraping and slower riffles than the best Crooked Creek days.",
        "Stay with the named public access points and avoid private banks, fences, signs, and purple-painted property along the creek."
      ],
      "watchFor": [
        "Water below about 12 ft, when scraping and slower riffles become more likely.",
        "Fast post-rain rises, fresh wood, strainers, muddy exits, and stronger current than the clear-water appearance suggests.",
        "Shoals, riffles, small waves, rural self-rescue conditions, and limited services at both accesses."
      ]
    }
  },
  "crooked-creek-lower-pyatt-mark-oliver": {
    "putIn": {
      "id": "lower-pyatt-access",
      "name": "Lower Pyatt Access",
      "latitude": 36.24665,
      "longitude": -92.83494
    },
    "takeOut": {
      "id": "mark-oliver-access",
      "name": "Mark Oliver Access",
      "latitude": 36.24973,
      "longitude": -92.7486
    },
    "logistics": {
      "distanceLabel": "About 11.9 mi",
      "estimatedPaddleTime": "About 5 hr to 7 hr depending on level, fishing stops, and how much dragging the shoals require",
      "shuttle": "Stage the take-out at Mark Oliver Access, then drive back to Lower Pyatt Access. Snow is the clean public split point if the full upper-middle continuation feels too long for the day.",
      "permits": "No route-specific paddling permit is known. Use the named public AGFC access points, follow Arkansas boating and PFD rules, and respect posted parking signs at each access.",
      "camping": "Snow Access campsites and Brooksher Crooked Creek Preserve give this reach real designated-campsite support, but private banks remain off-limits and Brooksher has no road access.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Lower Pyatt Access and take out at Mark Oliver Access for a longer upper-middle Crooked Creek continuation. This is a rain-sensitive Ozark creek float keyed to the Kelly Crossing gauge rather than to a broad flatwater assumption.",
      "accessCaveats": [
        "Lower Pyatt, Snow, and Mark Oliver are named public AGFC Crooked Creek Water Trail accesses with simple rural launches rather than full-service park ramps.",
        "The current Kelly Crossing gauge reading during this run was below AGFC's moderate band, so expect more scraping and slower riffles than the best Crooked Creek days.",
        "Stay with the named public access points and avoid private banks, fences, signs, and purple-painted property along the creek."
      ],
      "watchFor": [
        "Water below about 12 ft, when scraping and slower riffles become more likely.",
        "Fast post-rain rises, fresh wood, strainers, muddy exits, and stronger current than the clear-water appearance suggests.",
        "Shoals, riffles, small waves, rural self-rescue conditions, and the lack of road access at Brooksher if a camping stop is part of a longer plan."
      ]
    },
    "accessPoints": [
      {
        "id": "lower-pyatt-access",
        "name": "Lower Pyatt Access",
        "latitude": 36.24665,
        "longitude": -92.83494,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream put-in for the upper-middle continuation."
      },
      {
        "id": "snow-access",
        "name": "Snow Access",
        "latitude": 36.24352,
        "longitude": -92.79995,
        "mileFromStart": 6.7,
        "segmentKind": "creek",
        "note": "Intermediate public split point with primitive campsites."
      },
      {
        "id": "mark-oliver-access",
        "name": "Mark Oliver Access",
        "latitude": 36.24973,
        "longitude": -92.7486,
        "mileFromStart": 11.9,
        "segmentKind": "creek",
        "note": "Default take-out for the upper-middle continuation."
      }
    ]
  },
  "crooked-creek-snow-mark-oliver": {
    "putIn": {
      "id": "snow-access",
      "name": "Snow Access",
      "latitude": 36.24352,
      "longitude": -92.79995
    },
    "takeOut": {
      "id": "mark-oliver-access",
      "name": "Mark Oliver Access",
      "latitude": 36.24973,
      "longitude": -92.7486
    },
    "logistics": {
      "distanceLabel": "5.2 mi",
      "estimatedPaddleTime": "About 2.5 hr to 4 hr depending on level, wood scouting, and how much time you spend at the camps or shoals",
      "shuttle": "Stage the take-out at Mark Oliver Access, then drive back to Snow Access. This is the shortest Crooked Creek day that still keeps the named Snow camps and Brooksher preserve support in play.",
      "permits": "No route-specific paddling permit is known. Use the named public AGFC access points, follow Arkansas boating and PFD rules, and respect posted parking signs at each access.",
      "camping": "Snow Access campsites and Brooksher Crooked Creek Preserve give this reach real designated-campsite support, but private banks remain off-limits and Brooksher has no road access.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Snow Access and take out at Mark Oliver Access for the middle official Crooked Creek segment. This is a rain-sensitive Ozark creek float keyed to the Kelly Crossing gauge rather than to a broad flatwater assumption.",
      "accessCaveats": [
        "Snow and Mark Oliver are named public AGFC Crooked Creek Water Trail accesses with simple rural launches rather than full-service park ramps.",
        "The current Kelly Crossing gauge reading during this run was below AGFC's moderate band, so expect more scraping and slower riffles than the best Crooked Creek days.",
        "Stay with the named public access points and avoid private banks, fences, signs, and purple-painted property along the creek."
      ],
      "watchFor": [
        "Water below about 12 ft, when scraping and slower riffles become more likely.",
        "Fast post-rain rises, fresh wood, strainers, muddy exits, and stronger current than the clear-water appearance suggests.",
        "Shoals, riffles, small waves, rural self-rescue conditions, and the lack of road access at Brooksher if a camping stop is part of a longer plan."
      ]
    }
  },
  "crooked-creek-mark-oliver-kelleys-slab": {
    "putIn": {
      "id": "mark-oliver-access",
      "name": "Mark Oliver Access",
      "latitude": 36.24973,
      "longitude": -92.7486
    },
    "takeOut": {
      "id": "kelleys-slab-access",
      "name": "Kelley's Slab Access",
      "latitude": 36.22921,
      "longitude": -92.71045
    },
    "logistics": {
      "distanceLabel": "6.6 mi",
      "estimatedPaddleTime": "About 3 hr to 4.5 hr depending on level, wood scouting, and whether you pause to inspect Kelley's Slab before finishing",
      "shuttle": "Stage the take-out at Kelley's Slab Access, then drive back to Mark Oliver Access. This lower middle Crooked Creek segment is a practical day float, but the Kelley finish deserves a scout when the creek is up or dirty.",
      "permits": "No route-specific paddling permit is known. Use the named public AGFC access points, follow Arkansas boating and PFD rules, and respect posted parking signs at each access.",
      "camping": "Fred Berry Crooked Creek Nature Center can support a nearby basecamp with manager permission and a one-night limit, but no campsite is documented directly at Mark Oliver or Kelley's Slab.",
      "campingClassification": "nearby_basecamp",
      "summary": "Launch at Mark Oliver Access and take out at Kelley's Slab for the lower middle official Crooked Creek segment. This is a rain-sensitive Ozark creek float keyed to the Kelly Crossing gauge rather than to a broad flatwater assumption.",
      "accessCaveats": [
        "Mark Oliver and Kelley's Slab are named public AGFC Crooked Creek Water Trail accesses with simple rural launches rather than full-service park ramps.",
        "The current Kelly Crossing gauge reading during this run was below AGFC's moderate band, so expect more scraping and slower riffles than the best Crooked Creek days.",
        "Stay with the named public access points and avoid private banks, fences, signs, and purple-painted property along the creek.",
        "Scout Kelley's Slab before committing to the final take-out when the creek is up, dirty, or unfamiliar."
      ],
      "watchFor": [
        "Water below about 12 ft, when scraping and slower riffles become more likely.",
        "Fast post-rain rises, fresh wood, strainers, muddy exits, and stronger current than the clear-water appearance suggests.",
        "Shoals, riffles, small waves, rural self-rescue conditions, and the Kelley’s Slab finish hazard AGFC flags under some conditions."
      ]
    }
  },
  "crooked-creek-snow-kelleys-slab": {
    "putIn": {
      "id": "snow-access",
      "name": "Snow Access",
      "latitude": 36.24352,
      "longitude": -92.79995
    },
    "takeOut": {
      "id": "kelleys-slab-access",
      "name": "Kelley's Slab Access",
      "latitude": 36.22921,
      "longitude": -92.71045
    },
    "logistics": {
      "distanceLabel": "About 11.8 mi",
      "estimatedPaddleTime": "About 5 hr to 7.5 hr depending on level, wood scouting, fishing stops, and whether you pause to inspect Kelley's Slab before finishing",
      "shuttle": "Stage the take-out at Kelley's Slab Access, then drive back to Snow Access. Mark Oliver is the clean public split point if the full lower-middle corridor feels too long for the day's level or pace.",
      "permits": "No route-specific paddling permit is known. Use the named public AGFC access points, follow Arkansas boating and PFD rules, and respect posted parking signs at each access.",
      "camping": "Snow Access campsites and Brooksher Crooked Creek Preserve give this reach real designated-campsite support, but private banks remain off-limits and Kelley's Slab should not be treated as a campsite.",
      "campingClassification": "on_route_campsite",
      "summary": "Launch at Snow Access and take out at Kelley's Slab Access for a longer lower-middle Crooked Creek continuation. This is a rain-sensitive Ozark creek float keyed to the Kelly Crossing gauge rather than to a broad flatwater assumption.",
      "accessCaveats": [
        "Snow, Mark Oliver, and Kelley's Slab are named public AGFC Crooked Creek Water Trail accesses with simple rural launches rather than full-service park ramps.",
        "The current Kelly Crossing gauge reading during this run was below AGFC's moderate band, so expect more scraping and slower riffles than the best Crooked Creek days.",
        "Stay with the named public access points and avoid private banks, fences, signs, and purple-painted property along the creek.",
        "Scout Kelley's Slab before committing to the final take-out when the creek is up, dirty, or unfamiliar."
      ],
      "watchFor": [
        "Water below about 12 ft, when scraping and slower riffles become more likely.",
        "Fast post-rain rises, fresh wood, strainers, muddy exits, and stronger current than the clear-water appearance suggests.",
        "Shoals, riffles, small waves, rural self-rescue conditions, and the Kelley's Slab finish hazard AGFC flags under some conditions."
      ]
    }
  }
};
