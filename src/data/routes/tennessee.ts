// State-scoped route data. Keep entries in route-family and downstream order.
import type { River } from '../../lib/types';

export const tennesseeRoutes: River[] = [
  {
    "id": "big-south-fork-burnt-mill-leatherwood",
    "slug": "big-south-fork-burnt-mill-leatherwood",
    "name": "Big South Fork",
    "reach": "Burnt Mill Bridge to Leatherwood Ford",
    "aliases": [
      "Clear Fork / Big South Fork Gorge - Burnt Mill to Leatherwood",
      "Big South Fork gorge run",
      "Burnt Mill Bridge to Leatherwood Ford Bridge"
    ],
    "state": "Tennessee",
    "region": "Cumberland Plateau",
    "routeType": "whitewater",
    "summary": "Advanced Big South Fork gorge day that links the Clear Fork put-in at Burnt Mill Bridge with the Leatherwood Ford take-out. NPS documents the route and level descriptions, and the direct Leatherwood Ford USGS gauge gives a live same-day check.",
    "statusText": "Use the Leatherwood Ford gauge. Around 1,000 to 2,500 cfs is the guarded target window for skilled whitewater groups; below 500 cfs the gorge gets very rocky and technical, and above about 3,500 cfs the run is too powerful for a Paddle Today recommendation.",
    "latitude": 36.38,
    "longitude": -84.62,
    "gaugeSource": {
      "id": "usgs-03410210",
      "provider": "usgs",
      "siteId": "03410210",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "South FK Cumberland River at Leatherwood Ford, TN",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03410210/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1000,
      "idealMax": 2500,
      "tooLow": 500,
      "tooHigh": 3500,
      "thresholdSource": {
        "label": "NPS Big South Fork river-level descriptions for the Leatherwood Ford gauge",
        "url": "https://www.nps.gov/biso/planyourvisit/riverlevels.htm",
        "provider": "nps"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        10,
        11,
        12
      ],
      "seasonNotes": "NPS lists the Burnt Mill to Leatherwood gorge run as fall, winter, and spring water, and the park warns that Cumberland Plateau streams can rise very quickly after rain. Early summer can work only when the same-day gauge, weather, and group skill all line up.",
      "difficulty": "hard",
      "difficultyNotes": "This is not a recreational float. NPS rates Burnt Mill Bridge to Leatherwood Ford as Class III-IV, and American Whitewater describes the downstream Big South Fork gorge as a wilderness whitewater adventure with undercuts, sieves, Class III-IV rapids, long pools, and limited exits.",
      "confidenceNotes": "Confidence is high for a protected whitewater add, not for casual discovery. NPS names the exact Burnt Mill Bridge to Leatherwood Ford run, publishes access directions, and hosts numeric Leatherwood Ford level descriptions. USGS 03410210 is a direct live gauge at the take-out and showed same-day May 31, 2026 discharge and gage-height data during review. Endpoint coordinates are anchored to USGS-topo-derived Burnt Mill Bridge coordinates and the Leatherwood Ford USGS gauge/access corridor. The threshold source is marked mixed because the numeric descriptions are NPS-hosted but originally provided by whitewater clubs and are broad gorge guidance rather than a modern manager-issued go/no-go table."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Burnt Mill Bridge to Leatherwood Ford, 11 miles",
        "note": "NPS lists Burnt Mill Bridge to Leatherwood Ford as an 11-mile Big South Fork gorge run with Class III-IV difficulty, 20 feet per mile average drop, and fall/winter/spring use season.",
        "sourceUrl": "https://www.nps.gov/biso/planyourvisit/riverrundescriptions.htm"
      },
      {
        "label": "Level model",
        "value": "500 / 1,000-2,500 / 3,500 cfs",
        "note": "NPS-hosted Leatherwood Ford descriptions call 500 cfs very low and technical, 1,000 cfs optimum for open canoes, 1,800 to 2,500 cfs increasingly big Class III-IV water, and 3,500 cfs powerful with difficult rescue. The app uses a guarded whitewater target range and high cutoff from those descriptions.",
        "sourceUrl": "https://www.nps.gov/biso/planyourvisit/riverlevels.htm"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 03410210",
        "note": "USGS South FK Cumberland River at Leatherwood Ford showed current May 31, 2026 discharge and gage-height observations during review, including 3,860 cfs and 9.80 ft at 14:30 EDT.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=03410210"
      },
      {
        "label": "Access support",
        "value": "NPS Burnt Mill Bridge and Leatherwood Ford access directions",
        "note": "NPS publishes driving directions for both Burnt Mill Bridge and Leatherwood Ford, and separately lists Leatherwood Ford as the most accessible take-out for the Big South Fork gorge run.",
        "sourceUrl": "https://www.nps.gov/biso/planyourvisit/riveraccesspoints.htm"
      },
      {
        "label": "Whitewater hazards",
        "value": "Undercuts, sieves, Class III-IV drops, limited exits",
        "note": "American Whitewater identifies the Confluence-to-Leatherwood reach as Class II-IV wilderness whitewater with deep undercuts, sieves, major rapids, long pools, and limited access. NPS safety material also warns about strainers, hydraulics, fast-water foot entrapment, and difficult rescue.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/1719/main"
      },
      {
        "label": "Coordinate anchors",
        "value": "36.3800, -84.6200 to 36.4710, -84.6730",
        "note": "Burnt Mill Bridge is anchored to USGS-topo-derived public bridge coordinates. The take-out is anchored to the Leatherwood Ford access/gauge corridor, where the USGS gauge and NPS access are at the planned finish.",
        "sourceUrl": "https://www.yellowmaps.com/usgs/topo.cfm?map=tn-1279100-burnt-mill-bridge"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Big South Fork river run descriptions",
        "url": "https://www.nps.gov/biso/planyourvisit/riverrundescriptions.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Big South Fork river levels",
        "url": "https://www.nps.gov/biso/planyourvisit/riverlevels.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Big South Fork river gauges",
        "url": "https://home.nps.gov/biso/planyourvisit/rivergauges.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Big South Fork river access points",
        "url": "https://www.nps.gov/biso/planyourvisit/riveraccesspoints.htm",
        "provider": "nps"
      },
      {
        "label": "USGS 03410210 Leatherwood Ford monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03410210/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03410210 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=03410210",
        "provider": "usgs"
      },
      {
        "label": "American Whitewater Big South Fork gorge",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/1719/main",
        "provider": "american_whitewater"
      },
      {
        "label": "American Whitewater Clear Fork Burnt Mill to Confluence",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/4786/main",
        "provider": "american_whitewater"
      }
    ]
  },
  {
    "id": "pigeon-river-waterville-hartford",
    "slug": "pigeon-river-waterville-hartford",
    "name": "Pigeon River",
    "reach": "Waterville / Big Creek Bridge to Hartford Bridge",
    "aliases": [
      "Pigeon Gorge - Waterville to Hartford",
      "Pigeon River - Walters Power Plant to Hartford",
      "Upper Pigeon River",
      "The Dirty Bird"
    ],
    "state": "Tennessee",
    "region": "East Tennessee",
    "routeType": "whitewater",
    "summary": "Dam-release Pigeon Gorge whitewater run from the current Waterville / Big Creek bridge put-in to the Hartford Bridge take-out. American Whitewater documents the exact 4.3-mile Class II-III+ route and live USGS gauge, while the Forest Service confirms the upper Pigeon route to Hartford.",
    "statusText": "Use the Pigeon River below Power Plant near Waterville gauge. American Whitewater marks about 300 to 4,500 cfs as the runnable range; current release timing, post-Helene channel changes, construction access, and group skill matter as much as the number.",
    "latitude": 35.775461,
    "longitude": -83.099988,
    "gaugeSource": {
      "id": "usgs-03460795",
      "provider": "usgs",
      "siteId": "03460795",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Pigeon River below Power Plant near Waterville, NC",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03460795/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 300,
      "idealMax": 4500,
      "tooLow": 300,
      "tooHigh": 4500,
      "thresholdSource": {
        "label": "American Whitewater Pigeon Gorge runnable range",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/1782/main",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The Pigeon is dam controlled. American Whitewater says scheduled recreational releases normally run Memorial Day through Labor Day on Tuesday, Wednesday, Thursday, and Saturday afternoons, with occasional winter and spring releases. Always confirm the current release schedule before driving.",
      "difficulty": "hard",
      "difficultyNotes": "American Whitewater rates the upper Pigeon as Class II-III+ and describes several big-water Class III to III+ rapids. Hurricane Helene reshaped the gorge, construction access can change, and this route should stay in competent whitewater hands rather than casual discovery.",
      "confidenceNotes": "Confidence is good for a guarded whitewater add: American Whitewater identifies the exact Waterville/Big Creek-to-Hartford Bridge route, publishes Class II-III+ difficulty, route length, a direct USGS gauge, and a 300-4,500 cfs runnable range; the Forest Service confirms the upper dam-controlled Pigeon section from below Walters Power Plant to Hartford; and USGS Water Services returned same-day June 1, 2026 discharge and gage-height observations for 03460795. The app carries unusually strong caveats because AW says Hurricane Helene severely changed rapids and access, with the 2026 put-in at the bridge just off the Waterville exit while roadwork continues."
    },
    "evidenceNotes": [
      {
        "label": "Exact whitewater route",
        "value": "Waterville / Big Creek to Hartford Bridge, 4.3 mi",
        "note": "American Whitewater lists the Pigeon Gorge route as Walters Power Plant at Waterville / Big Creek to Hartford Bridge, 4.3 miles, Class II-III+.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/1782/main"
      },
      {
        "label": "Manager route context",
        "value": "Upper Pigeon to Hartford",
        "note": "The Forest Service describes the dam-controlled upper Pigeon as running from just below Walters Power Plant at Waterville through Class III and III+ rapids to the Hartford, Tennessee take-out.",
        "sourceUrl": "https://www.fs.usda.gov/r08/cherokee/recreation/pigeon-river"
      },
      {
        "label": "AW runnable range",
        "value": "300-4,500 cfs",
        "note": "American Whitewater exposes the USGS 03460795 gauge correlation for this reach with begin-low-runnable 300 cfs and end-high-runnable 4,500 cfs.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/1782/main"
      },
      {
        "label": "Live direct gauge",
        "value": "USGS 03460795 at 1,450 cfs / 9.04 ft",
        "note": "USGS Water Services returned same-day discharge and gage height at 10:30 EDT on June 1, 2026 for Pigeon River below Power Plant near Waterville.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03460795&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Post-Helene access and hazard caveat",
        "value": "2026 bridge put-in, construction and changed rapids",
        "note": "American Whitewater says Hurricane Helene dramatically changed rapids and access, that roadwork may continue into 2027 or 2028, and that the 2026 put-in is at the bridge just off the Waterville exit rather than farther upstream near the powerhouse.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/1782/main"
      },
      {
        "label": "Coordinate anchors",
        "value": "35.7755, -83.1000 to 35.8131, -83.1450",
        "note": "American Whitewater route geometry anchors the current Waterville / Big Creek bridge put-in corridor and Hartford Bridge take-out.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/1782/map"
      }
    ],
    "sourceLinks": [
      {
        "label": "American Whitewater Pigeon Gorge",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/1782/main",
        "provider": "american_whitewater"
      },
      {
        "label": "Forest Service Pigeon River",
        "url": "https://www.fs.usda.gov/r08/cherokee/recreation/pigeon-river",
        "provider": "local"
      },
      {
        "label": "USGS 03460795 Pigeon River below Power Plant near Waterville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03460795/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03460795 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03460795&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "pigeon-river-hartford-denton",
    "slug": "pigeon-river-hartford-denton",
    "name": "Pigeon River",
    "reach": "Hartford Bridge to Denton",
    "aliases": [
      "Lower Pigeon River",
      "Pigeon River - Hartford to Denton",
      "Pigeon River - Hartford Bridge to Greasy Cove"
    ],
    "state": "Tennessee",
    "region": "East Tennessee",
    "routeType": "whitewater",
    "summary": "Lower Pigeon whitewater day from Hartford Bridge toward Denton. American Whitewater documents the 4.8-mile Class II(III) route, a direct Waterville USGS gauge, and a tighter 1,200-2,500 cfs runnable range; the Forest Service confirms the lower Pigeon section below Hartford.",
    "statusText": "Use the Pigeon River below Power Plant near Waterville gauge and allow release water to travel downstream. American Whitewater marks about 1,200 to 2,500 cfs as runnable for the lower run; above that, holes and ledges get stronger, especially around Maytag.",
    "latitude": 35.817671,
    "longitude": -83.144967,
    "gaugeSource": {
      "id": "usgs-03460795",
      "provider": "usgs",
      "siteId": "03460795",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Pigeon River below Power Plant near Waterville, NC",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03460795/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1200,
      "idealMax": 2500,
      "tooLow": 1200,
      "tooHigh": 2500,
      "thresholdSource": {
        "label": "American Whitewater Lower Pigeon runnable range",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/4398/main",
        "provider": "american_whitewater"
      },
      "thresholdSourceStrength": "mixed",
      "rainfallSensitivity": "medium",
      "seasonMonths": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "seasonNotes": "The lower Pigeon depends on upstream release timing. American Whitewater trip notes say to allow about 1 to 1.5 hours for release water to arrive from the Waterville powerhouse; verify current release schedules, gauge trend, and access conditions before launching.",
      "difficulty": "moderate",
      "difficultyNotes": "American Whitewater rates the lower Pigeon as Class II(III). It is easier than the upper gorge but still has ledges, holes, fast current, commercial traffic, and the Maytag rapid, where lines and bridge supports matter at higher water.",
      "confidenceNotes": "Confidence is good for a guarded Tennessee add: American Whitewater identifies the exact Hartford Bridge-to-Denton lower Pigeon route, publishes length, Class II(III) difficulty, a direct USGS gauge correlation, and a 1,200-2,500 cfs runnable range; the Forest Service confirms the lower Pigeon starts in Hartford and runs nearly five miles through Class II and III rapids toward Denton; and USGS Water Services returned same-day June 1, 2026 discharge and gage-height observations for 03460795. Access notes remain guarded because AW says to secure parking permission where needed and use the public take-out near Greasy Cove / the bridge."
    },
    "evidenceNotes": [
      {
        "label": "Exact whitewater route",
        "value": "Hartford Bridge to Denton, 4.8 mi",
        "note": "American Whitewater lists the lower Pigeon as Bridge at Hartford to Denton, 4.8 miles, Class II(III), using the Pigeon River below Power Plant near Waterville gauge.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/4398/main"
      },
      {
        "label": "Manager route context",
        "value": "Lower Pigeon below Hartford",
        "note": "The Forest Service describes the lower Pigeon as starting in Hartford and running almost five miles through Class II and III rapids to the lower take-out before Denton.",
        "sourceUrl": "https://www.fs.usda.gov/r08/cherokee/recreation/pigeon-river"
      },
      {
        "label": "AW runnable range",
        "value": "1,200-2,500 cfs",
        "note": "American Whitewater exposes the USGS 03460795 gauge correlation for this reach with begin-low-runnable 1,200 cfs and end-high-runnable 2,500 cfs.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/4398/main"
      },
      {
        "label": "Live direct gauge",
        "value": "USGS 03460795 at 1,450 cfs / 9.04 ft",
        "note": "USGS Water Services returned same-day discharge and gage height at 10:30 EDT on June 1, 2026 for Pigeon River below Power Plant near Waterville.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03460795&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Access and timing",
        "value": "Hartford bridge put-in, Greasy Cove / lower public take-out",
        "note": "American Whitewater describes putting in on river right just upstream of Hartford Bridge, taking out on river right a few hundred feet after the Greasy Cove bridge, and allowing 1 to 1.5 hours for release water to arrive from the Waterville powerhouse.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/4398/main"
      },
      {
        "label": "Coordinate anchors",
        "value": "35.8177, -83.1450 to 35.8443, -83.1865",
        "note": "American Whitewater route geometry anchors the Hartford Bridge put-in and Denton / Greasy Cove lower take-out corridor.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/4398/map"
      }
    ],
    "sourceLinks": [
      {
        "label": "American Whitewater Lower Pigeon",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/4398/main",
        "provider": "american_whitewater"
      },
      {
        "label": "Forest Service Pigeon River",
        "url": "https://www.fs.usda.gov/r08/cherokee/recreation/pigeon-river",
        "provider": "local"
      },
      {
        "label": "USGS 03460795 Pigeon River below Power Plant near Waterville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03460795/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03460795 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03460795&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "south-chickamauga-creek-shallowford-sterchi",
    "slug": "south-chickamauga-creek-shallowford-sterchi",
    "name": "South Chickamauga Creek",
    "reach": "Shallowford Road to Sterchi Farm Park",
    "aliases": [
      "South Chickamauga Creek - Shallowford Road to Sterchi Farm",
      "S. Chick Creek - Shallowford to Sterchi",
      "Tennessee River Blueway South Chickamauga Creek"
    ],
    "state": "Tennessee",
    "region": "Chattanooga",
    "summary": "Urban greenway paddle on the Tennessee River Blueway from the Shallowford Road launch to Sterchi Farm Park. Outdoor Chattanooga lists the exact two-hour trip, the direct South Chickamauga USGS gauge is live, and the level model stays minimum-only from guidebook support.",
    "statusText": "Use the South Chickamauga Creek near Chickamauga gauge. Around 180 cfs is the conservative low-water floor; below that, expect scraping and shallow bars. Do not treat high, rising, stormwater, sewer-overflow, or Tennessee River backwater conditions as casual.",
    "latitude": 35.049,
    "longitude": -85.214,
    "gaugeSource": {
      "id": "usgs-03567500",
      "provider": "usgs",
      "siteId": "03567500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "South Chickamauga Creek Near Chickamauga, TN",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03567500/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 180,
      "thresholdSource": {
        "label": "Canoeing & Kayaking Georgia South Chickamauga Creek minimum level",
        "url": "https://adventurewithkeen.com/wp-content/uploads/2023/08/canoeing_kayaking_georgia_3e_9781634043366.pdf",
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
        10,
        11
      ],
      "seasonNotes": "Spring through fall is the normal paddle window, but this urban creek is highly rain-sensitive. Heavy rain can add stormwater, sewer-overflow concerns, floating debris, strainers, and stronger current; Chickamauga Dam and Tennessee River backwater can also affect the lower creek.",
      "difficulty": "easy",
      "difficultyNotes": "Outdoor Chattanooga frames the Shallowford-to-Sterchi trip as a two-hour South Chickamauga paddle and says the Sterchi Farm area is beginner-friendly. The route is still moving urban water, so low-water scraping, wood, debris, private banks, water quality, and fast post-rain changes matter.",
      "confidenceNotes": "Confidence is good for a conservative Tennessee add: Outdoor Chattanooga lists Shallowford Road to Sterchi Farm as a recommended two-hour paddle and confirms public canoe/kayak launches at both ends; Chattanooga Audubon points paddlers to the same USGS South Chick gauge and warns water levels can change rapidly; the guidebook access page provides coordinates for Shallowford and Sterchi plus a 180 cfs minimum; and USGS 03567500 showed same-day June 1, 2026 discharge and gage-height observations. The app uses minimum-only scoring because the numeric floor is guidebook/community support rather than an official paddling band, and no ideal range or high cutoff is inferred."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Shallowford Road to Sterchi Farm, 2-hour paddle",
        "note": "Outdoor Chattanooga lists Shallowford Road to Sterchi Farm as a recommended South Chickamauga Creek paddle and identifies canoe/kayak launches at Riverpoint, Sterchi Farm Park, Camp Jordan, and Shallowford Road.",
        "sourceUrl": "https://outdoorchattanooga.com/south-chickamauga-creek/"
      },
      {
        "label": "City paddle-program support",
        "value": "About 6 miles",
        "note": "A City of Chattanooga Parks & Outdoors Blueway Paddle Trails listing describes the Shallowford Road to Sterchi Farm Park route as a scenic six-mile kayak trip with gentle current and a Sterchi take-out.",
        "sourceUrl": "https://chattanooga.perfectmind.com/32731/Classes/BookMe4LandingPages/CoursesLandingPage?courseId=beb90b70-f9ff-4e6e-96a8-c29a484b4201"
      },
      {
        "label": "Live direct gauge",
        "value": "USGS 03567500 at 385 cfs / 5.20 ft",
        "note": "USGS Water Services and the legacy current-conditions page showed same-day discharge and gage height at 09:15 EDT on June 1, 2026 for South Chickamauga Creek near Chickamauga.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=03567500"
      },
      {
        "label": "Low-water floor",
        "value": "180 cfs minimum-only",
        "note": "Canoeing & Kayaking Georgia source material ties South Chickamauga Creek downstream at Chickamauga to a 180 cfs minimum runnable level. Paddle Today uses that as a conservative floor and does not infer an ideal range or high-water cutoff.",
        "sourceUrl": "https://adventurewithkeen.com/wp-content/uploads/2023/08/canoeing_kayaking_georgia_3e_9781634043366.pdf"
      },
      {
        "label": "Rapid-change and access cautions",
        "value": "Urban creek, dam/backwater influence, debris, and swift current",
        "note": "Outdoor Chattanooga warns creek levels and current can fluctuate due to Chickamauga Dam releases, while Chattanooga Audubon says levels can change rapidly and notes debris, swift current, flooding closures, and PFD requirements.",
        "sourceUrl": "https://www.chattanoogaaudubon.org/paddle-south-chickamauga-creek.html"
      },
      {
        "label": "Endpoint coordinates",
        "value": "35.049, -85.214 to 35.084, -85.226",
        "note": "The Canoeing & Kayaking Georgia access page lists Shallowford Road at river mile 8 and Sterchi Farm Park at river mile 3 with these coordinates; Outdoor Chattanooga corroborates the public launch/take-out context.",
        "sourceUrl": "https://adventurewithkeen.com/wp-content/uploads/2023/08/canoeing_kayaking_georgia_3e_9781634043366.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "Outdoor Chattanooga South Chickamauga Creek",
        "url": "https://outdoorchattanooga.com/south-chickamauga-creek/",
        "provider": "local"
      },
      {
        "label": "Chattanooga Audubon Paddle South Chickamauga Creek",
        "url": "https://www.chattanoogaaudubon.org/paddle-south-chickamauga-creek.html",
        "provider": "local"
      },
      {
        "label": "City of Chattanooga Blueway Paddle Trails listing",
        "url": "https://chattanooga.perfectmind.com/32731/Classes/BookMe4LandingPages/CoursesLandingPage?courseId=beb90b70-f9ff-4e6e-96a8-c29a484b4201",
        "provider": "local"
      },
      {
        "label": "Canoeing & Kayaking Georgia South Chickamauga source",
        "url": "https://adventurewithkeen.com/wp-content/uploads/2023/08/canoeing_kayaking_georgia_3e_9781634043366.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 03567500 South Chickamauga Creek monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03567500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03567500 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=03567500",
        "provider": "usgs"
      }
    ]
  }
];
