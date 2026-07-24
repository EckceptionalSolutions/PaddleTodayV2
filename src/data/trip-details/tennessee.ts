// State-scoped route data. Keep entries in route-family and downstream order.
import type { RiverTripDetails } from '../../lib/types';

export const tennesseeRiverTripDetails: Record<string, RiverTripDetails> = {
  "big-south-fork-burnt-mill-leatherwood": {
    "putIn": {
      "id": "burnt-mill-bridge",
      "name": "Burnt Mill Bridge access on Clear Fork",
      "latitude": 36.38,
      "longitude": -84.62
    },
    "takeOut": {
      "id": "leatherwood-ford",
      "name": "Leatherwood Ford access / USGS gauge corridor",
      "latitude": 36.477391,
      "longitude": -84.669351
    },
    "logistics": {
      "distanceLabel": "About 11 mi",
      "estimatedPaddleTime": "Full gorge day; allow extra time for scouting, portage decisions, rescue margin, and the flatwater finish",
      "shuttle": "Stage the take-out at Leatherwood Ford, then drive to Burnt Mill Bridge. NPS access roads include rural, steep, or gravel sections; check park alerts, weather, road condition, daylight, and whether every paddler is qualified for Class III-IV gorge water before leaving vehicles.",
      "permits": "No route-specific private paddling permit is known for this normal Big South Fork day run. Follow NPS rules, carry required safety gear, check park closures or access alerts, and obey any posted restrictions at Burnt Mill Bridge, O&W, and Leatherwood Ford.",
      "camping": "Treat this as a committed day run unless the group has a separate NPS backcountry plan. Do not assume easy bailout camping; the gorge has limited access and private or managed boundaries away from documented public corridors.",
      "summary": "Launch at Burnt Mill Bridge on Clear Fork and take out at Leatherwood Ford for the classic Big South Fork gorge extension. Use the Leatherwood Ford USGS gauge, and skip the route when the water is below the rocky floor, above the high cutoff, rising quickly, or outside the group skill set.",
      "accessCaveats": [
        "NPS publishes access directions for Burnt Mill Bridge and Leatherwood Ford, but this is still a remote gorge shuttle with limited exits and steep terrain.",
        "Leatherwood Ford is the planned take-out and has the direct USGS gauge corridor; do not drift past the take-out without a separate downstream plan.",
        "O&W Bridge and Pine Creek are potential intermediate access or emergency reference points, but they should not be treated as easy rescue substitutes.",
        "Check NPS park alerts before launching. Big South Fork access, roads, trailheads, or river corridors can close after storms, floods, maintenance, or emergency conditions."
      ],
      "watchFor": [
        "Class III-IV gorge rapids, undercut sandstone, sieves, hydraulics, pin rocks, ledges, and long pools that can slow the trip.",
        "Very low water below about 500 cfs, when the NPS descriptions call the gorge technical and rocky with pinning potential.",
        "Powerful water above about 3,500 cfs, when rescue gets difficult and waves, boils, whirlpools, and continuous current become much more consequential.",
        "Fast rain rises on Cumberland Plateau streams; NPS documents dramatic rises after heavy precipitation and warns water can rise rapidly with little warning.",
        "Strainers, fresh flood wood, cold-water swims, limited cell service, remote rescue exposure, and steep walk-outs."
      ]
    }
  },
  "pigeon-river-waterville-hartford": {
    "putIn": {
      "id": "waterville-big-creek-bridge",
      "name": "Waterville / Big Creek bridge put-in",
      "latitude": 35.775461,
      "longitude": -83.099988
    },
    "takeOut": {
      "id": "hartford-bridge",
      "name": "Hartford Bridge public take-out",
      "latitude": 35.81309,
      "longitude": -83.144993
    },
    "logistics": {
      "distanceLabel": "About 4.3 mi",
      "estimatedPaddleTime": "About 1 hr to 2 hr for competent whitewater groups during release water, longer with scouting, traffic, or changed post-Helene lines",
      "shuttle": "Stage the take-out at Hartford Bridge, then drive to the current Waterville / Big Creek bridge put-in just off the Waterville exit. American Whitewater says the normal powerhouse-area access remains affected by roadwork, so use current signs, construction limits, and local river-control direction on arrival.",
      "permits": "No route-specific private paddling permit is known, but this is a dam-release whitewater corridor with active construction and commercial outfitter traffic. Confirm Duke Energy release timing, respect any Forest Service, roadwork, outfitter, or river-control restrictions, and carry whitewater safety gear.",
      "camping": "Treat this as a short whitewater day run. Do not camp or stage on construction, outfitter, private, or roadside areas unless clearly posted for public use.",
      "summary": "Launch at the current Waterville / Big Creek bridge put-in and take out at Hartford Bridge for the upper Pigeon Gorge. Use USGS 03460795 and the active release schedule, and treat American Whitewater post-Helene notes as required pre-trip reading.",
      "accessCaveats": [
        "American Whitewater says the 2026 put-in is at the bridge just off the Waterville exit rather than farther upstream near the powerhouse until roadwork is finished and the upper access area is reestablished.",
        "Parking is limited and the corridor has ongoing construction impacts. Do not block work areas, commercial outfitters, emergency access, or narrow road shoulders.",
        "Hartford Bridge is the planned take-out. Confirm the public take-out field/ramp and vehicle plan before launching, especially during busy release windows.",
        "This route starts in North Carolina and ends in Tennessee; make sure every paddler understands the shuttle, release timing, and no-go alternatives before leaving vehicles."
      ],
      "watchFor": [
        "Class II-III+ big-water rapids, holes, ledges, wave trains, changing surf waves, and stronger moves around Lost Guide, Double Reactionary, and Accelerator.",
        "Post-Helene changes: shifted rocks, new holes, changed banks, construction material, metal/debris near banks, strainers, and evolving lines.",
        "Dam-release timing and sudden changes. The gauge can look different before release water reaches the route or after generation changes.",
        "Commercial raft traffic, limited eddies, swimmers, cold water, and difficult rescue in pushy current.",
        "Flows outside American Whitewater's runnable range, rising water, storms, or any current access closure or construction restriction."
      ]
    }
  },
  "pigeon-river-hartford-denton": {
    "putIn": {
      "id": "hartford-bridge",
      "name": "Hartford Bridge put-in",
      "latitude": 35.817671,
      "longitude": -83.144967
    },
    "takeOut": {
      "id": "denton-greasy-cove",
      "name": "Denton / Greasy Cove lower take-out",
      "latitude": 35.844291,
      "longitude": -83.186483
    },
    "logistics": {
      "distanceLabel": "About 4.8 mi",
      "estimatedPaddleTime": "About 1.5 hr to 3 hr depending on release timing, traffic, scouting, and group skill",
      "shuttle": "Stage the lower take-out near Greasy Cove / Denton, then drive back to the Hartford Bridge put-in. American Whitewater notes the put-in is river right just upstream of Hartford Bridge and says release water may take about 1 to 1.5 hours to arrive from the Waterville powerhouse.",
      "permits": "No route-specific private paddling permit is known. Use public access areas, get permission before using outfitter property, follow Tennessee boating rules, and carry appropriate whitewater safety gear.",
      "camping": "Treat this as a short day run. Do not camp or leave vehicles on outfitter, private, or roadside property unless it is clearly permitted.",
      "summary": "Launch at Hartford Bridge and take out near Denton / Greasy Cove for the lower Pigeon. Use the Waterville USGS gauge and current release schedule, with extra caution around ledges and Maytag at higher water.",
      "accessCaveats": [
        "American Whitewater says to make sure you have permission before parking at an outfitter and, at the take-out, to park near the bridge.",
        "The Hartford Bridge access is also the upper-run take-out and can be busy during release windows. Keep staging compact and leave room for commercial traffic and emergency vehicles.",
        "The lower take-out is on river right a few hundred feet after the Greasy Cove bridge. Identify it before launching so the group does not miss the exit.",
        "Release water takes time to reach Hartford. Do not launch on a dry-looking river without confirming the schedule and expected arrival window."
      ],
      "watchFor": [
        "Class I-II ledge drops, Class II+ ledges, fast shoals, holes, rocks, and Maytag at Class II(III).",
        "Higher-water holes around the ledges and Maytag, especially above about 2,000 cfs where American Whitewater notes stronger features.",
        "Bridge supports, commercial rafts, swimmers, mixed-skill private groups, and broad channels where rescue can be harder than the grade suggests.",
        "Dam-release timing mismatches, sudden generation changes, storms, and any access restriction or river-control instruction.",
        "Low water below American Whitewater's runnable range, which can expose ledges and make the route scrape, pin, or strand boats."
      ]
    }
  },
  "south-chickamauga-creek-shallowford-sterchi": {
    "putIn": {
      "id": "shallowford-road",
      "name": "Shallowford Road canoe/kayak launch",
      "latitude": 35.049,
      "longitude": -85.214
    },
    "takeOut": {
      "id": "sterchi-farm-park",
      "name": "Sterchi Farm Park public boat launch",
      "latitude": 35.084,
      "longitude": -85.226
    },
    "logistics": {
      "distanceLabel": "About 6 mi",
      "estimatedPaddleTime": "About 2 hr in normal levels, longer with low-water scraping, wood, or Tennessee River backwater",
      "shuttle": "Stage the take-out at Sterchi Farm Park, then drive back to the Shallowford Road canoe/kayak launch. Use the signed public launches and current greenway/park parking areas, and check same-day access notices because nearby greenway, stormwater, or wastewater work can affect trail sections and approaches.",
      "permits": "No route-specific private paddling permit is known for this public blueway route. Follow City of Chattanooga and Tennessee boating rules, carry required PFDs, obey posted park hours and launch signs, and skip the route if any access is closed or restricted.",
      "camping": "Treat this as a daylight urban day trip. Do not camp on greenway, park, industrial, or private banks, and use only public launch and take-out areas for access.",
      "summary": "Launch at Shallowford Road and take out at Sterchi Farm Park for a short South Chickamauga Creek blueway trip through the Chattanooga greenway corridor. Use the South Chickamauga near Chickamauga USGS gauge as the direct same-day check and keep the decision conservative after rain.",
      "accessCaveats": [
        "Outdoor Chattanooga lists Shallowford Road to Sterchi Farm as a recommended paddle, but this is still an urban creek corridor with bridges, industrial edges, private banks, and changing debris.",
        "Sterchi Farm Park is the planned take-out. Do not drift downstream toward the Tennessee River without a separate plan for backwater, current, river traffic, and a confirmed downstream landing.",
        "The lower creek can be affected by Chickamauga Dam releases and Tennessee River backwater. The gauge is direct for South Chickamauga, but same-day visual judgment at the launch still matters.",
        "Check Chattanooga greenway and park notices before committing to the shuttle, especially during stormwater, sewer-overflow reduction, trail, or access construction work."
      ],
      "watchFor": [
        "Low water below about 180 cfs, when shallow bars and scraping become likely.",
        "Fast rises after rain, stormwater runoff, sewer-overflow/water-quality concerns, floating trash, broken glass, and industrial corridor debris.",
        "Strainers, fresh wood, bridge debris, tight bends, and swift current that can surprise casual paddlers even on a short route.",
        "High or rising water, thunderstorms, poor visibility, cold water, and any posted flooding or sanctuary/access closure upstream or downstream.",
        "Private banks and greenway users near launches; keep staging compact, use public access points only, and leave room for other trail and park users."
      ]
    }
  }
};
