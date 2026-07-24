// State-scoped route data. Keep entries in route-family and downstream order.
import type { River } from '../../lib/types';

export const kentuckyRoutes: River[] = [
  {
    "id": "green-river-dennison-green-river-ferry",
    "slug": "green-river-dennison-green-river-ferry",
    "name": "Green River",
    "reach": "Dennison Ferry to Green River Ferry",
    "aliases": [
      "Green River - Dennison Ferry to Green River Ferry",
      "Mammoth Cave Green River popular day trip",
      "NPS Dennison to Green River Ferry"
    ],
    "state": "Kentucky",
    "region": "Mammoth Cave",
    "summary": "Popular Mammoth Cave Green River day from Dennison Ferry to Green River Ferry. NPS and KDFWR still document the public 7.5 to 7.6-mile segment, exact access coordinates, and a direct in-park USGS gauge with conservative NPS stage guidance.",
    "statusText": "Use the Green River at Mammoth Cave gauge. NPS treats roughly 9 to 15 ft as beginner-friendly park conditions, 15 to 20 ft as more consequential experienced water, and prohibits launching in the park at or above 20 ft.",
    "latitude": 37.2174,
    "longitude": -86.0493,
    "gaugeSource": {
      "id": "usgs-03309000",
      "provider": "usgs",
      "siteId": "03309000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Green River at Mammoth Cave, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03309000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 9,
      "idealMax": 15,
      "tooLow": 9,
      "tooHigh": 20,
      "thresholdSource": {
        "label": "Mammoth Cave NPS Green River skill-level stage guidance",
        "url": "https://www.nps.gov/maca/planyourvisit/river-safety-and-regulations.htm",
        "provider": "nps"
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
      "seasonNotes": "Late spring through fall is the clearest fit for this park segment. NPS warns that Green River can rise very quickly after rain, so same-day weather, gauge trend, and ferry status matter as much as the number itself.",
      "difficulty": "moderate",
      "difficultyNotes": "The route is flatwater by whitewater standards, but NPS still says prior paddling experience is recommended because the river is wide, current can be swift, and ferry traffic, logjams, mud, and steep carry-downs raise the consequence over a casual pond float.",
      "confidenceNotes": "Confidence is high for a conservative park restore: KDFWR still lists Dennison Ferry to Green River Ferry as a 7.5-mile Pool 6 segment and publishes coordinates plus public-use details for both endpoints, while NPS separately still publishes the same trip as 7.6 miles with 2.5 to 4 hours of travel time, scenic flatwater character, and explicit safety guidance. The park still maintains direct USGS site 03309000 at Mammoth Cave, and same-day USGS Water Services returned 3950 cfs and 16.15 ft at 2026-07-14 08:00 CDT. That stage is below the NPS 20-foot launch closure but above the park's broad beginner-friendly 9 to 15-foot band, so the route should ship with explicit above-band caution rather than comfort framing."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Dennison Ferry to Green River Ferry, about 7.5-7.6 mi",
        "note": "KDFWR lists Dennison Ferry to Green River Ferry as a 7.5-mile Pool 6 segment, and NPS separately publishes the same Mammoth Cave trip as 7.6 miles with an estimated 2.5 to 4 hours of travel time.",
        "sourceUrl": "https://www.nps.gov/thingstodo/dennison-ferry-to-green-river-ferry.htm"
      },
      {
        "label": "Official stage model",
        "value": "9-15 ft broad audience, >=20 ft closed",
        "note": "NPS says beginner Green River conditions in the park are about 9 to 15 ft, experienced paddlers may continue higher, and launching in the park is prohibited at or above 20 ft. Paddle Today uses that as a conservative public-facing stage model.",
        "sourceUrl": "https://www.nps.gov/maca/planyourvisit/river-safety-and-regulations.htm"
      },
      {
        "label": "Put-in access",
        "value": "Dennison Ferry, 37.2174, -86.0493",
        "note": "KDFWR identifies Dennison Ferry as a free carry-down access inside Mammoth Cave National Park with gravel parking and day-use-only rules.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Dennison-Ferry-.aspx"
      },
      {
        "label": "Take-out access",
        "value": "Green River Ferry, 37.1795, -86.1123",
        "note": "NPS notes canoe and kayak users should use the access just upstream on the south side of the ferry, and KDFWR still identifies Green River Ferry as a public paved park ramp with year-round availability.",
        "sourceUrl": "https://www.nps.gov/places/green-river-ferry.htm"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03309000 at 3950 cfs / 16.15 ft",
        "note": "USGS Water Services returned same-day July 14, 2026 values of 3950 cfs and 16.15 ft for Green River at Mammoth Cave. That keeps the route below the NPS launch closure but above the park's broad beginner-friendly target band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03309000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Scenic flatwater, gravel bars, islands, back channels",
        "note": "NPS describes this as a popular scenic flatwater Green River trip with gravel bars, islands, back channels, riverside caves at lower water, and abundant wildlife.",
        "sourceUrl": "https://www.nps.gov/thingstodo/dennison-ferry-to-green-river-ferry.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Pool 6 Green River",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Dennison Ferry",
        "url": "https://fw.ky.gov/Fish/Pages/Dennison-Ferry-.aspx",
        "provider": "local"
      },
      {
        "label": "NPS Dennison Ferry to Green River Ferry",
        "url": "https://www.nps.gov/thingstodo/dennison-ferry-to-green-river-ferry.htm",
        "provider": "nps"
      },
      {
        "label": "NPS River Safety and Regulations",
        "url": "https://www.nps.gov/maca/planyourvisit/river-safety-and-regulations.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Green River Ferry place",
        "url": "https://www.nps.gov/places/green-river-ferry.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Current Conditions",
        "url": "https://www.nps.gov/maca/planyourvisit/conditions.htm",
        "provider": "nps"
      },
      {
        "label": "USGS 03309000 Green River at Mammoth Cave",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03309000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03309000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03309000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "green-river-green-river-ferry-brownsville-city-park",
    "slug": "green-river-green-river-ferry-brownsville-city-park",
    "name": "Green River",
    "reach": "Green River Ferry to Brownsville City Park",
    "aliases": [
      "Green River - Green River Ferry to Brownsville City Park",
      "Mammoth Cave Green River Ferry to Brownsville",
      "NPS Green River Ferry to Brownsville via Houchin Ferry"
    ],
    "state": "Kentucky",
    "region": "Mammoth Cave / Edmonson County",
    "summary": "Full lower Mammoth Cave Green River continuation from Green River Ferry to Brownsville City Park. NPS still publishes the two downstream route cards, KDFWR still supports the public endpoints, and the direct Mammoth Cave gauge still provides a conservative park-stage model.",
    "statusText": "Use the Green River at Mammoth Cave gauge. NPS treats roughly 9 to 15 ft as the broad beginner-friendly park window, 15 to 20 ft as more consequential experienced water, and prohibits launching in the park at or above 20 ft.",
    "latitude": 37.1795,
    "longitude": -86.1123,
    "gaugeSource": {
      "id": "usgs-03309000",
      "provider": "usgs",
      "siteId": "03309000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Green River at Mammoth Cave, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03309000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 9,
      "idealMax": 15,
      "tooLow": 9,
      "tooHigh": 20,
      "thresholdSource": {
        "label": "Mammoth Cave NPS Green River skill-level stage guidance",
        "url": "https://www.nps.gov/maca/planyourvisit/river-safety-and-regulations.htm",
        "provider": "nps"
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
      "seasonNotes": "This longer lower-park continuation is most practical in the normal warm-season paddling window. NPS still warns that Green River can rise quickly after rain and that channels, gravel bars, and wood change over time.",
      "difficulty": "moderate",
      "difficultyNotes": "This is a real lower-Green day, not a casual ferry shuttle. The route combines the quieter Green River Ferry-to-Houchins stretch with the swift final miles toward Brownsville and the former lock-and-dam rapid near the finish.",
      "confidenceNotes": "Confidence is high for a conservative continuation add: NPS still publishes Green River Ferry to Houchin Ferry as 12.4 miles and Houchin Ferry to Brownsville as 3.6 miles, KDFWR still supports Green River Ferry, Houchins Ferry, and Brownsville City Park as public access anchors, and same-day USGS Water Services returned 3460 cfs and 15.39 ft for Green River at Mammoth Cave on July 14, 2026. That stage sits just above the park's broad beginner-friendly 9 to 15-foot band but below the hard 20-foot launch closure, so the route should ship with explicit above-band caution."
    },
    "evidenceNotes": [
      {
        "label": "Official route shape",
        "value": "Green River Ferry to Brownsville, about 16.0 mi",
        "note": "NPS publishes Green River Ferry to Houchin Ferry as 12.4 miles and Houchin Ferry to Brownsville as 3.6 miles, supporting a combined lower-park continuation of about 16.0 miles.",
        "sourceUrl": "https://www.nps.gov/thingstodo/green-river-ferry-to-houchin-ferry.htm"
      },
      {
        "label": "Official stage model",
        "value": "9-15 ft broad audience, >=20 ft closed",
        "note": "NPS says beginner Green River conditions in the park are about 9 to 15 ft and launching in the park is prohibited at or above 20 ft. Paddle Today uses that as a conservative public-facing stage model.",
        "sourceUrl": "https://www.nps.gov/maca/planyourvisit/river-safety-and-regulations.htm"
      },
      {
        "label": "Public access chain",
        "value": "Green River Ferry, Houchins Ferry, Brownsville City Park",
        "note": "KDFWR still documents Green River Ferry, Houchins Ferry, and Brownsville City Park as public downstream access anchors for the same Mammoth Cave corridor.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Green-River-Ferry-%28Mammoth-Cave-National-Park%29.aspx"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03309000 at 3460 cfs / 15.39 ft",
        "note": "USGS Water Services returned same-day July 14, 2026 values of 3460 cfs and 15.39 ft for Green River at Mammoth Cave, just above the park's broad 9 to 15-foot comfort band but below the 20-foot launch closure.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03309000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping and hazard context",
        "value": "Permit camping upstream, rapid and private-land caution downstream",
        "note": "NPS says the Green River Ferry to Houchin stretch can support gravel-bar or low-bank camping with a valid riverside permit, while the Brownsville card warns of swift current and private land after the park boundary and the boating page notes the former Lock and Dam 6 rapid near the finish.",
        "sourceUrl": "https://www.nps.gov/thingstodo/houchin-ferry-to-brownsville.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Green River Ferry to Houchin Ferry",
        "url": "https://www.nps.gov/thingstodo/green-river-ferry-to-houchin-ferry.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Houchin Ferry to Brownsville",
        "url": "https://www.nps.gov/thingstodo/houchin-ferry-to-brownsville.htm",
        "provider": "nps"
      },
      {
        "label": "NPS River Safety and Regulations",
        "url": "https://www.nps.gov/maca/planyourvisit/river-safety-and-regulations.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Canoeing, Kayaking and Boating",
        "url": "https://www.nps.gov/maca/planyourvisit/canoeing-kayaking-and-boating.htm",
        "provider": "nps"
      },
      {
        "label": "KDFWR Green River Ferry",
        "url": "https://fw.ky.gov/Fish/Pages/Green-River-Ferry-%28Mammoth-Cave-National-Park%29.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Houchins Ferry access detail",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=156",
        "provider": "local"
      },
      {
        "label": "KDFWR Brownsville City Park access detail",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=153",
        "provider": "local"
      },
      {
        "label": "USGS 03309000 Green River at Mammoth Cave",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03309000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03309000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03309000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "green-river-green-river-ferry-houchins",
    "slug": "green-river-green-river-ferry-houchins",
    "name": "Green River",
    "reach": "Green River Ferry to Houchins Ferry",
    "aliases": [
      "Green River - Green River Ferry to Houchins Ferry",
      "Mammoth Cave lower Green River day trip",
      "NPS Green River Ferry to Houchin Ferry"
    ],
    "state": "Kentucky",
    "region": "Mammoth Cave",
    "summary": "Longer Mammoth Cave Green River stretch from Green River Ferry to Houchins Ferry. NPS and KDFWR still document the public 12.3 to 12.4-mile segment, exact access coordinates, and a direct in-park USGS gauge with conservative NPS stage guidance.",
    "statusText": "Use the Green River at Mammoth Cave gauge. NPS treats roughly 9 to 15 ft as the broad beginner-friendly park window, 15 to 20 ft as more consequential experienced water, and prohibits launching in the park at or above 20 ft.",
    "latitude": 37.1795,
    "longitude": -86.1123,
    "gaugeSource": {
      "id": "usgs-03309000",
      "provider": "usgs",
      "siteId": "03309000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Green River at Mammoth Cave, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03309000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 9,
      "idealMax": 15,
      "tooLow": 9,
      "tooHigh": 20,
      "thresholdSource": {
        "label": "Mammoth Cave NPS Green River skill-level stage guidance",
        "url": "https://www.nps.gov/maca/planyourvisit/river-safety-and-regulations.htm",
        "provider": "nps"
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
      "seasonNotes": "This longer park segment is best treated as a warm-season trip unless the group is comfortable with colder water and faster current. NPS warns the Green can rise quickly after rain and that river channels and gravel bars shift over time.",
      "difficulty": "moderate",
      "difficultyNotes": "NPS calls this a longer, less-traveled flatwater section with swift current, ferry interaction at the launch area, changing gravel bars, and logjams. The route is accessible to experienced casual paddlers when the gauge is in range, but it is not a lazy float.",
      "confidenceNotes": "Confidence is high for a conservative park restore: KDFWR still lists Green River Ferry to Houchins Ferry as a 12.3-mile Pool 6 segment and publishes coordinates plus access details for both park endpoints, while NPS separately still publishes the same route as 12.4 miles with a 4 to 6 hour travel time plus explicit camping, hazard, and wildlife context. The park-maintained direct USGS gauge at Mammoth Cave returned same-day July 14, 2026 values of 3950 cfs and 16.15 ft. That stage is below the NPS 20-foot launch closure but above the park's broad beginner-friendly 9 to 15-foot band, so the route should ship with explicit above-band caution."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Green River Ferry to Houchins Ferry, about 12.3-12.4 mi",
        "note": "KDFWR lists Green River Ferry to Houchins Ferry as a 12.3-mile Pool 6 segment, and NPS separately publishes the same park trip as 12.4 miles with an estimated 4 to 6 hours of travel time.",
        "sourceUrl": "https://www.nps.gov/thingstodo/green-river-ferry-to-houchin-ferry.htm"
      },
      {
        "label": "Official stage model",
        "value": "9-15 ft broad audience, >=20 ft closed",
        "note": "NPS says beginner Green River conditions in the park are about 9 to 15 ft and park launching is prohibited at or above 20 ft. Paddle Today uses that as a conservative public-facing stage model.",
        "sourceUrl": "https://www.nps.gov/maca/planyourvisit/river-safety-and-regulations.htm"
      },
      {
        "label": "Put-in access",
        "value": "Green River Ferry, 37.1795, -86.1123",
        "note": "KDFWR identifies Green River Ferry as a free single-lane paved park ramp with year-round availability, picnic tables, and access near Mammoth Cave Campground.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Green-River-Ferry-%28Mammoth-Cave-National-Park%29.aspx"
      },
      {
        "label": "Take-out access",
        "value": "Houchins Ferry, 37.2024, -86.2376",
        "note": "KDFWR identifies Houchins Ferry as a free paved park ramp with year-round camping, restrooms, picnic facilities, and ferry-side access support.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=156"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03309000 at 3950 cfs / 16.15 ft",
        "note": "USGS Water Services returned same-day July 14, 2026 values of 3950 cfs and 16.15 ft for Green River at Mammoth Cave, above the broad beginner-friendly 9 to 15-foot band but below the NPS 20-foot launch closure.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03309000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping context",
        "value": "Permitted riverside camping plus Houchins campground",
        "note": "NPS says this route can support gravel-bar or low-bank camping at lower water with a valid riverside camping permit, and Houchin Ferry Campground itself offers developed endpoint camping.",
        "sourceUrl": "https://www.nps.gov/thingstodo/green-river-ferry-to-houchin-ferry.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Pool 6 Green River",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Green River Ferry",
        "url": "https://fw.ky.gov/Fish/Pages/Green-River-Ferry-%28Mammoth-Cave-National-Park%29.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Houchins Ferry access detail",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=156",
        "provider": "local"
      },
      {
        "label": "NPS Green River Ferry to Houchin Ferry",
        "url": "https://www.nps.gov/thingstodo/green-river-ferry-to-houchin-ferry.htm",
        "provider": "nps"
      },
      {
        "label": "NPS River Safety and Regulations",
        "url": "https://www.nps.gov/maca/planyourvisit/river-safety-and-regulations.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Houchin Ferry Campground",
        "url": "https://www.nps.gov/maca/planyourvisit/houchinferrycg.htm",
        "provider": "nps"
      },
      {
        "label": "USGS 03309000 Green River at Mammoth Cave",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03309000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03309000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03309000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "russell-creek-hatcher-todd-ford-milltown",
    "slug": "russell-creek-hatcher-todd-ford-milltown",
    "name": "Russell Creek",
    "reach": "Hatcher Road / Todd Ford Road Access to Milltown Road Bridge Access",
    "aliases": [
      "Russell Creek - Hatcher Road to Milltown",
      "Russell Creek - Todd Ford to Milltown",
      "KDFWR Russell Creek Blue Water Trail"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Remote Russell Creek day from the Hatcher Road / Todd Ford Road ford access to Milltown Road Bridge. KDFWR documents the 7.8-mile public-access segment, official Columbia gauge bands, and both endpoint coordinates.",
    "statusText": "Use the Russell Creek near Columbia gauge. KDFWR rates 100 to 350 cfs, or 3.5 to 4.5 ft, as good for boating and fishing. Below that, expect shallow riffles, dragging, and a harder day; above that, this narrow creek gets pushier around wood, fords, and bends.",
    "latitude": 37.1242,
    "longitude": -85.3395,
    "gaugeSource": {
      "id": "usgs-03307000",
      "provider": "usgs",
      "siteId": "03307000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Russell Creek near Columbia, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03307000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 100,
      "idealMax": 350,
      "tooLow": 100,
      "tooHigh": 350,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Russell Creek near Columbia",
        "url": "https://fw.ky.gov/Fish/Pages/Russell_Creek.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "Russell Creek is rain-responsive and can be too shallow outside wet periods. Spring and wetter fall windows are most reliable; summer can work after rain, but low water exposes riffles, gravel bars, and ford approaches quickly.",
      "difficulty": "moderate",
      "difficultyNotes": "KDFWR describes Russell Creek as narrow, fairly remote, and access points as far apart. The route is not technical whitewater, but 7.8 miles of riffle/run habitat, limited amenities, private-adjacent banks, wood, fords, and low-water dragging make it more committed than an easy park float.",
      "confidenceNotes": "Confidence is high for a conservative Kentucky add: KDFWR lists Hatcher Road / Todd Ford Road Access to Milltown Access as a 7.8-mile Russell Creek segment, publishes coordinates and access details for both endpoints, links the river to USGS 03307000, and gives official Low/Good/High cfs and stage bands for the Columbia gauge. USGS Water Services showed same-day June 1, 2026 discharge and gage-height observations during this retry, clearing the previous live-gauge blocker. Current review flow was below the good band, but that affects today's score rather than route readiness."
    },
    "evidenceNotes": [
      {
        "label": "KDFWR bands",
        "value": "100-350 cfs / 3.5-4.5 ft good",
        "note": "KDFWR rates Russell Creek near Columbia as Low below 100 cfs or 3.5 ft, Good from 100 to 350 cfs or 3.5 to 4.5 ft, and High above 350 cfs or 4.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Russell_Creek.aspx"
      },
      {
        "label": "Public route shape",
        "value": "Hatcher Road / Todd Ford Road to Milltown, 7.8 mi",
        "note": "KDFWR lists Hatcher Road / Todd Ford Road Access to Milltown Access as a 7.8-mile Russell Creek public-access segment.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Russell_Creek.aspx"
      },
      {
        "label": "Access character",
        "value": "Carry-down ford and bridge accesses",
        "note": "KDFWR says both endpoints provide canoe/kayak access with limited parking and no amenities; bank fishing is limited near each access because adjacent property is private. Hatcher/Todd Ford users should not block the ford.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Russell_Creek.aspx"
      },
      {
        "label": "Live direct gauge",
        "value": "USGS 03307000 at 68.6 cfs / 2.72 ft",
        "note": "USGS Water Services returned same-day discharge and gage height at 08:30 CDT on June 1, 2026 for Russell Creek near Columbia. That value is below KDFWR's good band, so the route should score low today.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03307000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Endpoint coordinates",
        "value": "37.1242, -85.3395 to 37.1237, -85.4049",
        "note": "KDFWR access-detail records provide coordinates for Hatcher Road / Todd Ford Road Access and Milltown Road Bridge Access.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/waterbodydetail.aspx?wid=499"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Russell Creek",
        "url": "https://fw.ky.gov/Fish/Pages/Russell_Creek.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Russell Creek access records",
        "url": "https://app.fw.ky.gov/fisheries/waterbodydetail.aspx?wid=499",
        "provider": "local"
      },
      {
        "label": "USGS 03307000 Russell Creek near Columbia",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03307000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03307000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03307000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "russell-creek-milltown-russell-creek-road",
    "slug": "russell-creek-milltown-russell-creek-road",
    "name": "Russell Creek",
    "reach": "Milltown Road Bridge Access to Russell Creek Road Access",
    "aliases": [
      "Russell Creek - Milltown to Russell Creek Road",
      "KDFWR Russell Creek middle segment",
      "Russell Creek - Milltown to slab crossing"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Longer Russell Creek day from Milltown Road Bridge to the Russell Creek Road slab crossing. KDFWR documents this 13.2-mile public segment, official Columbia gauge bands, and endpoint coordinates.",
    "statusText": "Use the Russell Creek near Columbia gauge. KDFWR rates 100 to 350 cfs, or 3.5 to 4.5 ft, as good for boating and fishing. Below that, expect shallow riffles, dragging, and a slower day; above that, this narrow creek gets pushier around wood, bends, and the slab take-out.",
    "latitude": 37.1237,
    "longitude": -85.4049,
    "gaugeSource": {
      "id": "usgs-03307000",
      "provider": "usgs",
      "siteId": "03307000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Russell Creek near Columbia, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03307000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 100,
      "idealMax": 350,
      "tooLow": 100,
      "tooHigh": 350,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Russell Creek near Columbia",
        "url": "https://fw.ky.gov/Fish/Pages/Russell_Creek.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "Russell Creek is rain-responsive and gets scrapy outside wet periods. Spring and wetter fall windows are the safest bets; summer can work after rain, but shallow riffles and gravel bars show up quickly.",
      "difficulty": "moderate",
      "difficultyNotes": "This is a longer version of the same narrow, remote Russell Creek character KDFWR describes upstream. The 13.2-mile length, limited amenities, private-adjacent banks, wood, and slab-crossing take-out make it a committed moving-water day rather than an easy float.",
      "confidenceNotes": "Confidence is high for a conservative Kentucky add: KDFWR lists Milltown Access to Russell Creek Road Access as a 13.2-mile Russell Creek segment, publishes coordinates and access details for both endpoints, links the river to USGS 03307000, and gives official Low/Good/High cfs and stage bands for the Columbia gauge. USGS Water Services showed same-day July 14, 2026 discharge and gage-height observations during this run. Current review flow was below the good band, but that affects today's score rather than route readiness."
    },
    "evidenceNotes": [
      {
        "label": "KDFWR bands",
        "value": "100-350 cfs / 3.5-4.5 ft good",
        "note": "KDFWR rates Russell Creek near Columbia as Low below 100 cfs or 3.5 ft, Good from 100 to 350 cfs or 3.5 to 4.5 ft, and High above 350 cfs or 4.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Russell_Creek.aspx"
      },
      {
        "label": "Public route shape",
        "value": "Milltown to Russell Creek Road, 13.2 mi",
        "note": "KDFWR lists Milltown Access to Russell Creek Road Access as a 13.2-mile Russell Creek public-access segment.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Russell_Creek.aspx"
      },
      {
        "label": "Access character",
        "value": "Carry-down bridge access to slab crossing",
        "note": "KDFWR says Milltown has limited parking and no amenities, while Russell Creek Road has a gravel-bar/slab crossing take-out with parking pull-offs and no other amenities.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Russell_Creek.aspx"
      },
      {
        "label": "Live direct gauge",
        "value": "USGS 03307000 at 73.4 cfs / 2.48 ft",
        "note": "USGS Water Services returned same-day discharge and gage height at 15:30 CDT on July 14, 2026 for Russell Creek near Columbia. That value is below KDFWR's good band, so the route should score low today.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03307000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Endpoint coordinates",
        "value": "37.1237, -85.4049 to 37.1701, -85.4354",
        "note": "KDFWR access-detail records provide coordinates for Milltown Road Bridge Access and Russell Creek Road Access.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/waterbodydetail.aspx?wid=499"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Russell Creek",
        "url": "https://fw.ky.gov/Fish/Pages/Russell_Creek.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Russell Creek access records",
        "url": "https://app.fw.ky.gov/fisheries/waterbodydetail.aspx?wid=499",
        "provider": "local"
      },
      {
        "label": "USGS 03307000 Russell Creek near Columbia",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03307000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03307000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03307000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "russell-creek-hatcher-todd-ford-russell-creek-road",
    "slug": "russell-creek-hatcher-todd-ford-russell-creek-road",
    "name": "Russell Creek",
    "reach": "Hatcher Road / Todd Ford Road Access to Russell Creek Road Access",
    "aliases": [
      "Russell Creek - Hatcher Road to Russell Creek Road",
      "Russell Creek - Todd Ford to Russell Creek Road",
      "Russell Creek - upper to lower public access chain"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Big Russell Creek commitment from the Hatcher Road / Todd Ford ford access to the Russell Creek Road slab crossing. KDFWR supports the public access chain and gauge bands, and the combined official mileage reaches about 21 miles.",
    "statusText": "Use the Russell Creek near Columbia gauge. KDFWR rates 100 to 350 cfs, or 3.5 to 4.5 ft, as good for boating and fishing. Below that, this long narrow-creek day turns into repeated scraping and delay; above that, current and wood stack consequences quickly on a 21-mile commitment.",
    "latitude": 37.1242,
    "longitude": -85.3395,
    "gaugeSource": {
      "id": "usgs-03307000",
      "provider": "usgs",
      "siteId": "03307000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Russell Creek near Columbia, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03307000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 100,
      "idealMax": 350,
      "tooLow": 100,
      "tooHigh": 350,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Russell Creek near Columbia",
        "url": "https://fw.ky.gov/Fish/Pages/Russell_Creek.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "Russell Creek is best after dependable rain windows. Spring and wetter fall periods give the best odds of enough depth for a 21-mile day; summer lows expose riffles and bars fast, making this route much harder than the mileage alone suggests.",
      "difficulty": "hard",
      "difficultyNotes": "The creek itself is not technical whitewater, but KDFWR describes it as narrow and remote with access points far apart. Combining the first two official public segments into a 21-mile run creates a dawn-to-dusk commitment with long stretches of riffle/run current, low-water dragging risk, wood, limited legal stops, and few bailout conveniences.",
      "confidenceNotes": "Confidence is good for a guarded Kentucky add: KDFWR publishes the Hatcher Road / Todd Ford Road to Milltown segment at 7.8 miles and Milltown to Russell Creek Road at 13.2 miles, for about 21 miles across a continuous public-access chain on the same creek. KDFWR also publishes endpoint coordinates, access details, and official Low/Good/High cfs and stage bands tied to USGS 03307000, and USGS Water Services returned same-day July 14, 2026 values during this run. The route is product-ready but should present as a long, expert-judgment daylight commitment, not a casual float."
    },
    "evidenceNotes": [
      {
        "label": "KDFWR bands",
        "value": "100-350 cfs / 3.5-4.5 ft good",
        "note": "KDFWR rates Russell Creek near Columbia as Low below 100 cfs or 3.5 ft, Good from 100 to 350 cfs or 3.5 to 4.5 ft, and High above 350 cfs or 4.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Russell_Creek.aspx"
      },
      {
        "label": "Public route shape",
        "value": "Hatcher Road / Todd Ford to Russell Creek Road, about 21 mi",
        "note": "KDFWR lists Hatcher Road / Todd Ford Road Access to Milltown Access at 7.8 miles and Milltown Access to Russell Creek Road Access at 13.2 miles, which combine into about 21 miles on the same public creek corridor.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Russell_Creek.aspx"
      },
      {
        "label": "Access character",
        "value": "Ford put-in, bridge midpoint, slab-crossing take-out",
        "note": "KDFWR says Hatcher/Todd Ford should not be blocked, Milltown has limited parking and private-adjacent banks, and Russell Creek Road uses gravel pull-offs and a slab crossing with no other amenities.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Russell_Creek.aspx"
      },
      {
        "label": "Live direct gauge",
        "value": "USGS 03307000 at 73.4 cfs / 2.48 ft",
        "note": "USGS Water Services returned same-day discharge and gage height at 15:30 CDT on July 14, 2026 for Russell Creek near Columbia. That value is below KDFWR's good band, so the route should score low today.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03307000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Endpoint coordinates",
        "value": "37.1242, -85.3395 to 37.1701, -85.4354",
        "note": "KDFWR access-detail records provide coordinates for Hatcher Road / Todd Ford Road Access and Russell Creek Road Access.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/waterbodydetail.aspx?wid=499"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Russell Creek",
        "url": "https://fw.ky.gov/Fish/Pages/Russell_Creek.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Russell Creek access records",
        "url": "https://app.fw.ky.gov/fisheries/waterbodydetail.aspx?wid=499",
        "provider": "local"
      },
      {
        "label": "USGS 03307000 Russell Creek near Columbia",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03307000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03307000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03307000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "russell-creek-russell-creek-road-green-river-russell-creek-vpa",
    "slug": "russell-creek-russell-creek-road-green-river-russell-creek-vpa",
    "name": "Russell Creek",
    "reach": "Russell Creek Road Access to Green River-Russell Creek VPA",
    "aliases": [
      "Russell Creek - Russell Creek Road to Green River mouth",
      "Russell Creek - slab crossing to VPA",
      "KDFWR Russell Creek lower segment"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Lower Russell Creek from the Russell Creek Road slab crossing to the Green River-Russell Creek VPA at the mouth. KDFWR documents the 12.6-mile lower public segment and the Columbia gauge bands; the VPA detail adds daylight-only and no-camping rules.",
    "statusText": "Use the Russell Creek near Columbia gauge. KDFWR rates 100 to 350 cfs, or 3.5 to 4.5 ft, as good for boating and fishing. Below that, expect shallow riffles and gravel bars; above that, current and wood get pushier, and the VPA take-out remains a low-amenity bank access.",
    "latitude": 37.1701,
    "longitude": -85.4354,
    "gaugeSource": {
      "id": "usgs-03307000",
      "provider": "usgs",
      "siteId": "03307000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Russell Creek near Columbia, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03307000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 100,
      "idealMax": 350,
      "tooLow": 100,
      "tooHigh": 350,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Russell Creek near Columbia",
        "url": "https://fw.ky.gov/Fish/Pages/Russell_Creek.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "Russell Creek responds quickly to rain, and this lower segment still wants water. Spring and wetter fall periods are most reliable; in summer, low water can expose bars and slow the day dramatically before the gauge fully fails.",
      "difficulty": "moderate",
      "difficultyNotes": "This lower reach stays on the same narrow, remote creek character, but the 12.6-mile length and VPA take-out mean the route still demands planning. Wood, limited amenities, private-adjacent banks, and a low-amenity mouth access make it more committing than a short local float.",
      "confidenceNotes": "Confidence is high for a conservative Kentucky add: KDFWR lists Russell Creek Road Access to Green River-Russell Creek VPA as a 12.6-mile Russell Creek segment, publishes the official Low/Good/High cfs and stage bands tied to USGS 03307000, and provides access details and coordinates for Russell Creek Road. The Green River-Russell Creek VPA detail page confirms the mouth take-out coordinates and daylight-only, no-camping VPA rules. USGS Water Services returned same-day July 14, 2026 values during this run. Current review flow was below the good band, but that affects today's score rather than route readiness."
    },
    "evidenceNotes": [
      {
        "label": "KDFWR bands",
        "value": "100-350 cfs / 3.5-4.5 ft good",
        "note": "KDFWR rates Russell Creek near Columbia as Low below 100 cfs or 3.5 ft, Good from 100 to 350 cfs or 3.5 to 4.5 ft, and High above 350 cfs or 4.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Russell_Creek.aspx"
      },
      {
        "label": "Public route shape",
        "value": "Russell Creek Road to Green River-Russell Creek VPA, 12.6 mi",
        "note": "KDFWR lists Russell Creek Road Access to Green River-Russell Creek VPA as a 12.6-mile Russell Creek public-access segment.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Russell_Creek.aspx"
      },
      {
        "label": "Access character",
        "value": "Slab-crossing put-in to daylight-only VPA bank access",
        "note": "KDFWR says Russell Creek Road has parking pull-offs and a large gravel bar, while the Green River-Russell Creek VPA is a walk-in VPA site at the mouth with limited parking, no amenities, no camping, and daylight-hours-only rules.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=995"
      },
      {
        "label": "Live direct gauge",
        "value": "USGS 03307000 at 73.4 cfs / 2.48 ft",
        "note": "USGS Water Services returned same-day discharge and gage height at 15:30 CDT on July 14, 2026 for Russell Creek near Columbia. That value is below KDFWR's good band, so the route should score low today.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03307000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Endpoint coordinates",
        "value": "37.1701, -85.4354 to 37.2283, -85.5096",
        "note": "KDFWR access-detail records provide coordinates for Russell Creek Road Access and the Green River-Russell Creek VPA mouth access.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=995"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Russell Creek",
        "url": "https://fw.ky.gov/Fish/Pages/Russell_Creek.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Russell Creek access records",
        "url": "https://app.fw.ky.gov/fisheries/waterbodydetail.aspx?wid=499",
        "provider": "local"
      },
      {
        "label": "KDFWR Green River-Russell Creek VPA detail",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=995",
        "provider": "local"
      },
      {
        "label": "USGS 03307000 Russell Creek near Columbia",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03307000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03307000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03307000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "tygarts-creek-olive-hill-carter-caves",
    "slug": "tygarts-creek-olive-hill-carter-caves",
    "name": "Tygarts Creek",
    "reach": "Olive Hill Depot Trailhead and Campground Access to Carter Caves State Park",
    "aliases": [
      "Tygarts Creek - Olive Hill to Carter Caves",
      "Tygarts Creek Gorge float",
      "KDFWR Tygarts Creek Blue Water Trail"
    ],
    "state": "Kentucky",
    "region": "Eastern Kentucky",
    "summary": "Scenic Tygarts Creek Gorge day from downtown Olive Hill to the KY 182 bridge at Carter Caves State Resort Park. KDFWR documents the 12.5-mile Blue Water Trail, both public carry-down accesses, endpoint coordinates, and practical flow cutoffs.",
    "statusText": "Use the Tygarts Creek near Greenup gauge as the same-creek flow check. KDFWR says flows below 150 cfs make this long reach hard to finish in a day, while flows above 300 cfs add borderline Class II rapids, strong bluff current, and more demanding boat control.",
    "latitude": 38.2993,
    "longitude": -83.1745,
    "gaugeSource": {
      "id": "usgs-03217000",
      "provider": "usgs",
      "siteId": "03217000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Tygarts Creek near Greenup, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03217000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 150,
      "idealMax": 300,
      "tooLow": 150,
      "tooHigh": 300,
      "thresholdSource": {
        "label": "KDFWR Tygarts Creek Blue Water Trail level guidance",
        "url": "https://fw.ky.gov/Education/Pages/Tygarts-Creek.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "seasonMonths": [
        3,
        4,
        5,
        6,
        9,
        10,
        11
      ],
      "seasonNotes": "Tygarts Creek is often low and skinny in summer. KDFWR points to mid-September through November as a better floating window once water cools, while spring and wetter shoulder-season periods can also provide enough flow.",
      "difficulty": "moderate",
      "difficultyNotes": "At normal levels KDFWR describes the float as beginner- and family-suitable, but the 12.5-mile length, shallow riffles, remote gorge, tight bluff turns, wood, and borderline Class II behavior above 300 cfs make it a guarded moving-water route rather than a casual park float.",
      "confidenceNotes": "Confidence is good for a conservative Kentucky add: KDFWR documents Olive Hill Depot Trailhead and Campground Access to Carter Caves State Park as a 12.5-mile Tygarts Creek Gorge float, publishes the 150 cfs low-water floor and 300 cfs higher-water caution, identifies the left-bank wooden-step take-out cue above the KY 182 bridge, and lists both public carry-down accesses with coordinates. USGS Water Services returned same-day June 1, 2026 discharge and gage-height observations for the same-creek Greenup gauge, clearing the prior live-gauge blocker."
    },
    "evidenceNotes": [
      {
        "label": "KDFWR level guidance",
        "value": "150-300 cfs guarded window",
        "note": "KDFWR says less than 150 cfs makes this reach hard to finish in a day and more than 300 cfs increases difficulty with borderline Class II rapids and strong current against overhanging bluffs.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Tygarts-Creek.aspx"
      },
      {
        "label": "Public route shape",
        "value": "Olive Hill Depot to Carter Caves, 12.5 mi",
        "note": "KDFWR describes a 12.5-mile Blue Water Trail float from Olive Hill Depot Trailhead and Campground Access to the KY 182 bridge at Carter Caves State Resort Park.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Tygarts-Creek.aspx"
      },
      {
        "label": "Endpoint coordinates",
        "value": "38.2993, -83.1745 to 38.3676, -83.1089",
        "note": "KDFWR access-detail records list Olive Hill Carrydown and Carter Caves State Park as public carry-down-only Tygarts Creek accesses with coordinates and parking information.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/WaterbodyDetail.aspx?wid=170"
      },
      {
        "label": "Live direct gauge",
        "value": "USGS 03217000 at 222 cfs / 3.68 ft",
        "note": "USGS Water Services returned same-day discharge and gage height at 09:45 EDT on June 1, 2026 for Tygarts Creek near Greenup.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03217000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Take-out cue",
        "value": "Wooden steps on river left before KY 182",
        "note": "KDFWR says to look for wooden steps cut into the left bank about 150 yards upstream of the KY 182 bridge after the Devil's Backbone turns and Smoky Creek confluence.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Tygarts-Creek.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Tygarts Creek",
        "url": "https://fw.ky.gov/Education/Pages/Tygarts-Creek.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Tygarts Creek map PDF",
        "url": "https://fw.ky.gov/Education/Documents/bluewatertrailtygartscreek.pdf",
        "provider": "local"
      },
      {
        "label": "KDFWR Tygarts Creek access records",
        "url": "https://app.fw.ky.gov/fisheries/WaterbodyDetail.aspx?wid=170",
        "provider": "local"
      },
      {
        "label": "USGS 03217000 Tygarts Creek near Greenup",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03217000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03217000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03217000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "floyds-fork-fisherville-cane-run",
    "slug": "floyds-fork-fisherville-cane-run",
    "name": "Floyds Fork",
    "reach": "Fisherville Canoe Access to Cane Run Canoe Access",
    "aliases": [
      "Floyds Fork - Fisherville to Cane Run",
      "Floyds Fork Parklands Fisherville to Cane Run",
      "KDFWR Floyds Fork Blue Water Trail"
    ],
    "state": "Kentucky",
    "region": "Louisville Metro",
    "summary": "Short Parklands-area Floyds Fork day from Fisherville to Cane Run. KDFWR documents both public carry-down accesses, the 4.2-mile segment, and official Fisherville gauge bands; The Parklands adds practical moving-water and strainer cautions.",
    "statusText": "Use the Floyds Fork at Fisherville gauge. KDFWR rates 50 to 300 cfs, or 1.3 to 2.5 ft, as good for boating and fishing. Below that is low and draggy; above that is high, faster, and better left to experienced moving-water paddlers.",
    "latitude": 38.1887,
    "longitude": -85.4779,
    "gaugeSource": {
      "id": "usgs-03298000",
      "provider": "usgs",
      "siteId": "03298000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Floyds Fork at Fisherville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 50,
      "idealMax": 300,
      "tooLow": 50,
      "tooHigh": 300,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Floyds Fork near Fisherville",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "Floyds Fork is rain-sensitive and The Parklands warns that levels rise and fall quickly. Spring and post-rain windows are more reliable, while summer lows can turn shallow shoals and chutes into a creek walk.",
      "difficulty": "moderate",
      "difficultyNotes": "KDFWR presents this as a public canoe/kayak access chain, but The Parklands classifies Floyds Fork as Class I+ moving water with small rapids, waves, obstructions, strainers, sharp turns, and overhanging brush. Treat it as moderate for boat-control requirements, not as a flatwater park float.",
      "confidenceNotes": "Confidence is high for a guarded Kentucky add: KDFWR lists Fisherville Canoe Access to Cane Run Canoe Access as a 4.2-mile public-access segment, publishes official coordinates and carry-down access records for both endpoints, links Floyds Fork to USGS 03298000, and gives official Low/Good/High cfs and stage bands for the Fisherville gauge. The official USGS legacy current-conditions page showed same-day May 31, 2026 discharge and gage-height observations during this run, clearing the prior live-gauge blocker. The Parklands route guide adds segment-specific hazards and the broader public-park paddling context."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "50-300 cfs / 1.3-2.5 ft",
        "note": "KDFWR rates Floyds Fork near Fisherville as Low below 50 cfs or 1.3 ft, Good from 50 to 300 cfs or 1.3 to 2.5 ft, and High above 300 cfs or 2.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx"
      },
      {
        "label": "Official route segment",
        "value": "Fisherville Canoe Access to Cane Run Canoe Access, 4.2 miles",
        "note": "KDFWR lists Fisherville Canoe Access to Cane Run Canoe Access as a public-access Floyds Fork segment in its site-to-site mileage table.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx"
      },
      {
        "label": "Blue Water Trail map",
        "value": "Fisherville to Cane Run mapped as about 4.5 miles",
        "note": "The KDFWR Blue Water Trail map identifies Fisherville Access and Cane Run Access in the public Floyds Fork access chain and labels Fisherville-to-Cane Run as a ramp-to-ramp route.",
        "sourceUrl": "https://fw.ky.gov/Education/Documents/BlueWaterTrailFloydsFork.pdf"
      },
      {
        "label": "Put-in access",
        "value": "Fisherville Canoe Access, 38.1887, -85.4779",
        "note": "KDFWR identifies Fisherville Canoe Access as a free carry-down site off Old Taylorsville Road with unpaved parking and year-round 24-hour boat-ramp and shoreline availability.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=877"
      },
      {
        "label": "Take-out access",
        "value": "Cane Run Canoe Access, 38.1519, -85.5026",
        "note": "KDFWR identifies Cane Run Canoe Access as a free carry-down site off Echo Trail with unpaved parking and Floyds Fork access.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1092"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03298000",
        "note": "The official USGS legacy current-conditions page showed 108 cfs and 1.52 ft at 2026-05-31 11:20 EDT for Floyds Fork at Fisherville during this run.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=03298000"
      },
      {
        "label": "Route hazards",
        "value": "Class I+ moving water, chutes, waves, strainers",
        "note": "The Parklands warns that Floyds Fork is Class I+ moving water with small rapids, waves, obstructions, sharp turns, overhanging brush, strainers, and quickly changing water levels.",
        "sourceUrl": "https://theparklands.org/app/uploads/2020/11/PaddlingTheFork_Final-11.11.16.pdf"
      },
      {
        "label": "Segment notes",
        "value": "Pool-and-drop channel to Cane Run",
        "note": "The Parklands Fisherville-to-Cane Run guide describes islands, narrow chutes, a six-inch ledge, a remote pool-and-drop stretch, wave features near the end, and a signed take-out up the Cane Run side channel.",
        "sourceUrl": "https://theparklands.org/app/uploads/2020/11/Creek-Guide-and-Description_1.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Floyds Fork",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Blue Water Trail Floyds Fork map",
        "url": "https://fw.ky.gov/Education/Documents/BlueWaterTrailFloydsFork.pdf",
        "provider": "local"
      },
      {
        "label": "KDFWR Fisherville Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=877",
        "provider": "local"
      },
      {
        "label": "KDFWR Cane Run Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1092",
        "provider": "local"
      },
      {
        "label": "USGS 03298000 Floyds Fork at Fisherville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03298000 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=03298000",
        "provider": "usgs"
      },
      {
        "label": "The Parklands Paddling the Fork safety sheet",
        "url": "https://theparklands.org/app/uploads/2020/11/PaddlingTheFork_Final-11.11.16.pdf",
        "provider": "local"
      },
      {
        "label": "The Parklands Floyds Fork route descriptions",
        "url": "https://theparklands.org/app/uploads/2020/11/Creek-Guide-and-Description_1.pdf",
        "provider": "local"
      }
    ]
  },
  {
    "id": "floyds-fork-fisherville-seaton-valley",
    "slug": "floyds-fork-fisherville-seaton-valley",
    "name": "Floyds Fork",
    "reach": "Fisherville Canoe Access to Seaton Valley Paddling Access",
    "aliases": [
      "Floyds Fork - Fisherville to Seaton Valley",
      "Floyds Fork Parklands Fisherville to Seaton Valley",
      "Floyd's Fork mid-to-lower Parklands float"
    ],
    "state": "Kentucky",
    "region": "Louisville Metro",
    "summary": "Longer middle-to-lower Parklands Floyds Fork float linking Fisherville to Seaton Valley. KDFWR documents both public endpoint accesses and the Fisherville-to-Cane-Run plus Cane-Run-to-Seaton route pieces, while The Parklands supplies the marked-landings-only and moving-water safety posture for the corridor.",
    "statusText": "Use the Floyds Fork at Fisherville gauge. KDFWR lists 50 to 300 cfs, or 1.3 to 2.5 ft, as the corridor good band, while older KDFWR route guidance treats 35 to 500 cfs as the wider recreation range. Low water means shoal walking; high water means faster current and fewer easy eddies.",
    "latitude": 38.1887,
    "longitude": -85.4779,
    "gaugeSource": {
      "id": "usgs-03298000",
      "provider": "usgs",
      "siteId": "03298000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Floyds Fork at Fisherville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 50,
      "idealMax": 300,
      "tooLow": 35,
      "tooHigh": 500,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Floyds Fork near Fisherville",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "The corridor is most reliable in spring through fall. Low summer flows can turn multiple shoals into a creek walk, while heavy rain can quickly move this entrenched section into swifter, more pushy current.",
      "difficulty": "moderate",
      "difficultyNotes": "This is moving-water paddling with route-reading responsibility, not a pond or lake float. The Parklands and KDFWR describe shoals, bends, root wads, waves, and changing current that justify a moderate rating even though the route stays within a managed park corridor.",
      "confidenceNotes": "Confidence is high for a guarded add: KDFWR names the exact Fisherville Canoe Access to Cane Run Canoe Access segment at 4.2 miles and the Cane Run Canoe Access to Seaton Valley Paddling Access segment at 3.1 miles, which support a 7.3-mile public Fisherville-to-Seaton float. KDFWR gives official coordinates for both endpoints and publishes official Fisherville gauge bands on the same corridor, while same-day USGS Water Services values were available during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "50-300 cfs / 1.3-2.5 ft",
        "note": "KDFWR rates Floyds Fork near Fisherville as Low below 50 cfs or 1.3 ft, Good from 50 to 300 cfs or 1.3 to 2.5 ft, and High above 300 cfs or 2.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx"
      },
      {
        "label": "Broader recreation band",
        "value": "35-500 cfs",
        "note": "A KDFWR Floyds Fork feature says the best floating levels for fishing and recreation are 35 to 500 cfs, with higher levels suited only to experienced paddlers.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx"
      },
      {
        "label": "Chained public route segment",
        "value": "Fisherville Canoe Access to Seaton Valley Paddling Access, 7.3 miles",
        "note": "KDFWR lists Fisherville Canoe Access to Cane Run Canoe Access as 4.2 miles and Cane Run Canoe Access to Seaton Valley Paddling Access as 3.1 miles, supporting a 7.3-mile public Fisherville-to-Seaton-Valley float.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Fisherville Canoe Access, 38.1887, -85.4779",
        "note": "KDFWR identifies Fisherville Canoe Access as a free carry-down site off Old Taylorsville Road with unpaved parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=877"
      },
      {
        "label": "Take-out access",
        "value": "Seaton Valley Paddling Access, 38.1323, -85.5191",
        "note": "KDFWR identifies Seaton Valley Paddling Access as a free carry-down site in Turkey Run Park with shoreline access and no camping listed.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1141"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03298000 at 50.8 cfs / 1.09 ft",
        "note": "USGS Water Services returned same-day values of 50.8 cfs and 1.09 ft at 2026-07-05 20:20 EDT for Floyds Fork at Fisherville during this run, just above the discharge floor but below the official stage floor.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route hazards",
        "value": "Class I+ moving water, shoals, waves, strainers, marked-landings-only access",
        "note": "The Parklands says Floyds Fork is Class I+ moving water with small rapids, waves, obstructions, strainers, and quickly changing levels, and its paddling page says to use marked landings only and not to take out on private property.",
        "sourceUrl": "https://theparklands.org/find-an-activity/paddling/"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Floyds Fork",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Floyd's Fork route feature",
        "url": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Fisherville Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=877",
        "provider": "local"
      },
      {
        "label": "KDFWR Seaton Valley Paddling Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1141",
        "provider": "local"
      },
      {
        "label": "USGS 03298000 Floyds Fork at Fisherville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03298000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "The Parklands paddling guidance",
        "url": "https://theparklands.org/find-an-activity/paddling/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "floyds-fork-north-beckley-creekside",
    "slug": "floyds-fork-north-beckley-creekside",
    "name": "Floyds Fork",
    "reach": "North Beckley Canoe Access to Creekside Canoe Access",
    "aliases": [
      "Floyds Fork - North Beckley to Creekside",
      "Floyds Fork Parklands North Beckley to Creekside",
      "Floyd's Fork first float"
    ],
    "state": "Kentucky",
    "region": "Louisville Metro",
    "summary": "Short after-work Floyds Fork float through Beckley Creek Park. KDFWR documents the public carry-down pair and site-to-site mileage, while the older KDFWR route feature and Parklands safety guidance add reach character, braid-channel cautions, and the current gauge relationship.",
    "statusText": "Use the Floyds Fork at Fisherville gauge. KDFWR lists 50 to 300 cfs, or 1.3 to 2.5 ft, as the corridor good band, and an older KDFWR feature frames 35 to 500 cfs as the broader recreation range. Below that expect dragging; above that expect faster current and fewer recovery spots.",
    "latitude": 38.2308,
    "longitude": -85.4682,
    "gaugeSource": {
      "id": "usgs-03298000",
      "provider": "usgs",
      "siteId": "03298000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Floyds Fork at Fisherville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 50,
      "idealMax": 300,
      "tooLow": 35,
      "tooHigh": 500,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Floyds Fork near Fisherville",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "The Parklands and KDFWR both treat Floyds Fork as rain-sensitive moving water. Spring through fall is the practical season, but low summer flows can expose gravel bars and braided chutes while storm runoff can push the creek well above the comfortable band.",
      "difficulty": "moderate",
      "difficultyNotes": "This is still a Class I+ Parklands moving-water float, not flatwater. The route is short and accessible, but KDFWR and The Parklands both warn about strainers, braided current choices, and quicker post-rain current than casual urban paddlers may expect.",
      "confidenceNotes": "Confidence is high for a conservative add: KDFWR names the exact North Beckley-to-Creekside access pair, gives official coordinates for both carry-down sites, and ties Floyds Fork to the direct USGS 03298000 Fisherville gauge with official Low/Good/High bands. The older KDFWR Floyds Fork feature describes this exact first float and its route-specific braid and take-out cues, while same-day USGS Water Services values were available during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "50-300 cfs / 1.3-2.5 ft",
        "note": "KDFWR rates Floyds Fork near Fisherville as Low below 50 cfs or 1.3 ft, Good from 50 to 300 cfs or 1.3 to 2.5 ft, and High above 300 cfs or 2.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx"
      },
      {
        "label": "Broader recreation band",
        "value": "35-500 cfs",
        "note": "A KDFWR Floyds Fork feature says the best floating levels for fishing and recreation are 35 to 500 cfs, with higher levels suited only to experienced paddlers.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx"
      },
      {
        "label": "Official route segment",
        "value": "North Beckley Canoe Access to Creekside Canoe Access, 2.1 miles",
        "note": "KDFWR lists North Beckley Canoe Access to Creekside Canoe Access in the Floyds Fork site-to-site mileage table.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx"
      },
      {
        "label": "Put-in access",
        "value": "North Beckley Canoe Access, 38.2308, -85.4682",
        "note": "KDFWR identifies North Beckley Canoe Access as a free carry-down site in Beckley Creek Park with limited-hours shoreline access and unpaved parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=876"
      },
      {
        "label": "Take-out access",
        "value": "Creekside Canoe Access, 38.2158, -85.4778",
        "note": "KDFWR identifies Creekside Canoe Access as a free carry-down access at The Parklands with unpaved parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1091"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03298000",
        "note": "USGS Water Services returned same-day values of 1620 cfs and 4.78 ft at 2026-06-22 13:20 EDT for Floyds Fork at Fisherville during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route hazards",
        "value": "Class I+ moving water, braid choices, wood, quick rises",
        "note": "The Parklands says Floyds Fork is Class I+ moving water with small rapids, waves, obstructions, strainers, and quickly changing water levels, and KDFWR says to stay in the main current around The Oxbow and expect dragging through braided chutes in summer.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Floyds Fork",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Floyd's Fork route feature",
        "url": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR North Beckley Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=876",
        "provider": "local"
      },
      {
        "label": "KDFWR Creekside Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1091",
        "provider": "local"
      },
      {
        "label": "USGS 03298000 Floyds Fork at Fisherville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03298000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "The Parklands paddling page",
        "url": "https://theparklands.org/find-an-activity/paddling/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "floyds-fork-creekside-fisherville",
    "slug": "floyds-fork-creekside-fisherville",
    "name": "Floyds Fork",
    "reach": "Creekside Canoe Access to Fisherville Canoe Access",
    "aliases": [
      "Floyds Fork - Creekside to Fisherville",
      "Floyds Fork Parklands Creekside to Fisherville",
      "Floyd's Fork middle float"
    ],
    "state": "Kentucky",
    "region": "Louisville Metro",
    "summary": "Middle Parklands Floyds Fork float with bluff-lined bends, gravel shoals, and multiple bridge landmarks. KDFWR documents the public access pair and mileage, and its route feature adds low-water, Distillery Bend, and take-out context.",
    "statusText": "Use the Floyds Fork at Fisherville gauge. KDFWR lists 50 to 300 cfs, or 1.3 to 2.5 ft, as the corridor good band, while the older route feature treats 35 to 500 cfs as the wider recreation range. Low water means shoal walking; high water means faster current and fewer eddies.",
    "latitude": 38.2158,
    "longitude": -85.4778,
    "gaugeSource": {
      "id": "usgs-03298000",
      "provider": "usgs",
      "siteId": "03298000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Floyds Fork at Fisherville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 50,
      "idealMax": 300,
      "tooLow": 35,
      "tooHigh": 500,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Floyds Fork near Fisherville",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "The corridor is most reliable in spring through fall. Low summer flows can turn the shoals into a creek walk, while heavy rain can quickly move this entrenched section into swifter, more pushy current.",
      "difficulty": "moderate",
      "difficultyNotes": "This is moving-water paddling with route-reading responsibility, not a pond or lake float. The Parklands and KDFWR describe shoals, bends, root wads, and bluff-side current that justify a moderate rating even though the route stays within a managed park corridor.",
      "confidenceNotes": "Confidence is high for a guarded add: KDFWR names the exact Creekside-to-Fisherville access pair, gives official coordinates for both endpoints, and publishes official Fisherville gauge bands on the same corridor. The KDFWR Floyds Fork feature adds route-specific details for shoals, Distillery Bend, Long Run, the trestle, and the KY 155 take-out, and same-day USGS Water Services values were available during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "50-300 cfs / 1.3-2.5 ft",
        "note": "KDFWR rates Floyds Fork near Fisherville as Low below 50 cfs or 1.3 ft, Good from 50 to 300 cfs or 1.3 to 2.5 ft, and High above 300 cfs or 2.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx"
      },
      {
        "label": "Broader recreation band",
        "value": "35-500 cfs",
        "note": "A KDFWR Floyds Fork feature says the best floating levels for fishing and recreation are 35 to 500 cfs, with higher levels suited only to experienced paddlers.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx"
      },
      {
        "label": "Official route segment",
        "value": "Creekside Canoe Access to Fisherville Canoe Access, 4.3 miles",
        "note": "KDFWR lists Creekside Canoe Access to Fisherville Canoe Access in the Floyds Fork site-to-site mileage table.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Creekside Canoe Access, 38.2158, -85.4778",
        "note": "KDFWR identifies Creekside Canoe Access as a free carry-down access at The Parklands with unpaved parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1091"
      },
      {
        "label": "Take-out access",
        "value": "Fisherville Canoe Access, 38.1887, -85.4779",
        "note": "KDFWR identifies Fisherville Canoe Access as a free carry-down site off Old Taylorsville Road with unpaved parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=877"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03298000",
        "note": "USGS Water Services returned same-day values of 1620 cfs and 4.78 ft at 2026-06-22 13:20 EDT for Floyds Fork at Fisherville during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route hazards",
        "value": "Class I+ moving water, shoals, bluffs, root wads, bridge landmarks",
        "note": "The KDFWR route feature describes shoals that often require walking at low water, a more entrenched and bluff-lined section around Distillery Bend, Long Run entering on the left, and the right-bank Fisherville take-out just after KY 155.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Floyds Fork",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Floyd's Fork route feature",
        "url": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Creekside Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1091",
        "provider": "local"
      },
      {
        "label": "KDFWR Fisherville Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=877",
        "provider": "local"
      },
      {
        "label": "USGS 03298000 Floyds Fork at Fisherville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03298000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "The Parklands paddling page",
        "url": "https://theparklands.org/find-an-activity/paddling/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "floyds-fork-creekside-cane-run",
    "slug": "floyds-fork-creekside-cane-run",
    "name": "Floyds Fork",
    "reach": "Creekside Canoe Access to Cane Run Canoe Access",
    "aliases": [
      "Floyds Fork - Creekside to Cane Run",
      "Floyds Fork Parklands Creekside to Cane Run",
      "Floyd's Fork middle corridor float"
    ],
    "state": "Kentucky",
    "region": "Louisville Metro",
    "summary": "Middle-corridor Parklands Floyds Fork float linking Creekside to Cane Run. KDFWR documents both endpoint accesses and the Creekside-to-Fisherville plus Fisherville-to-Cane route pieces, while route guidance adds bluff-lined bends, bridge landmarks, and the Cane Run side-channel finish.",
    "statusText": "Use the Floyds Fork at Fisherville gauge. KDFWR lists 50 to 300 cfs, or 1.3 to 2.5 ft, as the corridor good band, while the older route feature treats 35 to 500 cfs as the wider recreation range. Low water means shoal walking; high water means faster current and fewer eddies.",
    "latitude": 38.2158,
    "longitude": -85.4778,
    "gaugeSource": {
      "id": "usgs-03298000",
      "provider": "usgs",
      "siteId": "03298000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Floyds Fork at Fisherville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 50,
      "idealMax": 300,
      "tooLow": 35,
      "tooHigh": 500,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Floyds Fork near Fisherville",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "The corridor is most reliable in spring through fall. Low summer flows can turn several shoals into a creek walk, while heavy rain can quickly move this entrenched middle corridor into swifter, more pushy current.",
      "difficulty": "moderate",
      "difficultyNotes": "This is moving-water paddling with route-reading responsibility, not a pond or lake float. The Parklands and KDFWR describe shoals, bends, root wads, bridge constrictions, and the Cane Run side-channel finish that justify a moderate rating.",
      "confidenceNotes": "Confidence is high for a guarded add: KDFWR names the exact Creekside Canoe Access to Fisherville Canoe Access segment at 4.3 miles and the Fisherville Canoe Access to Cane Run Canoe Access segment at 4.2 miles, which support an 8.5-mile public Creekside-to-Cane-Run float. KDFWR gives official coordinates for both endpoints and publishes official Fisherville gauge bands on the same corridor, while same-day USGS Water Services values were available during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "50-300 cfs / 1.3-2.5 ft",
        "note": "KDFWR rates Floyds Fork near Fisherville as Low below 50 cfs or 1.3 ft, Good from 50 to 300 cfs or 1.3 to 2.5 ft, and High above 300 cfs or 2.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx"
      },
      {
        "label": "Broader recreation band",
        "value": "35-500 cfs",
        "note": "A KDFWR Floyds Fork feature says the best floating levels for fishing and recreation are 35 to 500 cfs, with higher levels suited only to experienced paddlers.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx"
      },
      {
        "label": "Chained public route segment",
        "value": "Creekside Canoe Access to Cane Run Canoe Access, 8.5 miles",
        "note": "KDFWR lists Creekside Canoe Access to Fisherville Canoe Access as 4.3 miles and Fisherville Canoe Access to Cane Run Canoe Access as 4.2 miles, supporting an 8.5-mile public Creekside-to-Cane-Run float.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Creekside Canoe Access, 38.2158, -85.4778",
        "note": "KDFWR identifies Creekside Canoe Access as a free carry-down access at The Parklands with unpaved parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1091"
      },
      {
        "label": "Take-out access",
        "value": "Cane Run Canoe Access, 38.1519, -85.5026",
        "note": "KDFWR identifies Cane Run Canoe Access as a free carry-down site off Echo Trail with unpaved parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1092"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03298000 at 50.8 cfs / 1.09 ft",
        "note": "USGS Water Services returned same-day values of 50.8 cfs and 1.09 ft at 2026-07-05 20:20 EDT for Floyds Fork at Fisherville during this run, just above the discharge floor but below the official stage floor.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route hazards",
        "value": "Class I+ moving water, shoals, bluffs, root wads, side-channel take-out",
        "note": "The KDFWR route feature describes shoals that often require walking at low water, bluff-lined current around Distillery Bend, multiple bridge landmarks, and the signed Cane Run side-channel take-out.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Floyds Fork",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Floyd's Fork route feature",
        "url": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Creekside Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1091",
        "provider": "local"
      },
      {
        "label": "KDFWR Cane Run Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1092",
        "provider": "local"
      },
      {
        "label": "USGS 03298000 Floyds Fork at Fisherville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03298000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "The Parklands Paddling the Fork safety sheet",
        "url": "https://theparklands.org/app/uploads/2020/11/PaddlingTheFork_Final-11.11.16.pdf",
        "provider": "local"
      }
    ]
  },
  {
    "id": "floyds-fork-creekside-seaton-valley",
    "slug": "floyds-fork-creekside-seaton-valley",
    "name": "Floyds Fork",
    "reach": "Creekside Canoe Access to Seaton Valley Paddling Access",
    "aliases": [
      "Floyds Fork - Creekside to Seaton Valley",
      "Floyds Fork Parklands Creekside to Seaton Valley",
      "Floyd's Fork middle-to-lower Parklands float"
    ],
    "state": "Kentucky",
    "region": "Louisville Metro",
    "summary": "Extended Parklands Floyds Fork float from Creekside into Turkey Run. KDFWR documents the public route pieces, access records, and Fisherville gauge ladder, while the route guidance keeps low-water shoals, moving-water bends, and the marked-landings-only posture explicit.",
    "statusText": "Use the Floyds Fork at Fisherville gauge. KDFWR lists 50 to 300 cfs, or 1.3 to 2.5 ft, as the corridor good band, while the older route feature treats 35 to 500 cfs as the wider recreation range. Low water means shoal walking and a slower day; high water means swifter bends and fewer easy recoveries.",
    "latitude": 38.2158,
    "longitude": -85.4778,
    "gaugeSource": {
      "id": "usgs-03298000",
      "provider": "usgs",
      "siteId": "03298000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Floyds Fork at Fisherville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 50,
      "idealMax": 300,
      "tooLow": 35,
      "tooHigh": 500,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Floyds Fork near Fisherville",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "The corridor is most practical in spring through fall. Low summer flows can turn several shoals into a creek walk, while heavy rain quickly makes the middle and lower bends more pushy and less forgiving.",
      "difficulty": "moderate",
      "difficultyNotes": "This is moving-water paddling with route-reading responsibility, not a casual flatwater greenway drift. The Parklands and KDFWR still describe shoals, bends, wood, and quick level changes that justify a moderate rating.",
      "confidenceNotes": "Confidence is high for a guarded add: KDFWR names Creekside to Fisherville at 4.3 miles, Fisherville to Cane Run at 4.2 miles, and Cane Run to Seaton Valley at 3.1 miles, supporting an 11.6-mile public Creekside-to-Seaton float. KDFWR gives official coordinates for both endpoints, publishes official Fisherville gauge bands on the same corridor, and same-day USGS Water Services values were available during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "50-300 cfs / 1.3-2.5 ft",
        "note": "KDFWR rates Floyds Fork near Fisherville as Low below 50 cfs or 1.3 ft, Good from 50 to 300 cfs or 1.3 to 2.5 ft, and High above 300 cfs or 2.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx"
      },
      {
        "label": "Broader recreation band",
        "value": "35-500 cfs",
        "note": "A KDFWR Floyds Fork feature says the best floating levels for fishing and recreation are 35 to 500 cfs, with higher levels suited only to experienced paddlers.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx"
      },
      {
        "label": "Chained public route segment",
        "value": "Creekside Canoe Access to Seaton Valley Paddling Access, 11.6 miles",
        "note": "KDFWR lists Creekside Canoe Access to Fisherville Canoe Access as 4.3 miles, Fisherville Canoe Access to Cane Run Canoe Access as 4.2 miles, and Cane Run Canoe Access to Seaton Valley Paddling Access as 3.1 miles, supporting an 11.6-mile public Creekside-to-Seaton float.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Creekside Canoe Access, 38.2158, -85.4778",
        "note": "KDFWR identifies Creekside Canoe Access as a free carry-down access at The Parklands with unpaved parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1091"
      },
      {
        "label": "Take-out access",
        "value": "Seaton Valley Paddling Access, 38.1323, -85.5191",
        "note": "KDFWR identifies Seaton Valley Paddling Access as a free carry-down site in Turkey Run Park with shoreline access and no camping listed.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1141"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03298000 at 41.4 cfs / 1.00 ft",
        "note": "USGS Water Services returned same-day values of 41.4 cfs and 1.00 ft at 2026-07-06 09:20 EDT for Floyds Fork at Fisherville during this run, below the official good-band floor.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route hazards",
        "value": "Class I+ moving water, shoals, wood, marked landings only",
        "note": "The KDFWR route feature and Parklands paddling guidance describe shoals that often require walking at low water, moving-water bends, strainers, and a use-marked-landings-only rule through the Parklands corridor.",
        "sourceUrl": "https://theparklands.org/find-an-activity/paddling/"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Floyds Fork",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Floyd's Fork route feature",
        "url": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Creekside Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1091",
        "provider": "local"
      },
      {
        "label": "KDFWR Seaton Valley Paddling Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1141",
        "provider": "local"
      },
      {
        "label": "USGS 03298000 Floyds Fork at Fisherville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03298000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "The Parklands paddling guidance",
        "url": "https://theparklands.org/find-an-activity/paddling/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "floyds-fork-creekside-broad-run-valley",
    "slug": "floyds-fork-creekside-broad-run-valley",
    "name": "Floyds Fork",
    "reach": "Creekside Canoe Access to Broad Run Valley Paddling Access",
    "aliases": [
      "Floyds Fork - Creekside to Broad Run Valley",
      "Floyds Fork Parklands Creekside to Broad Run Valley",
      "Floyd's Fork long Parklands float"
    ],
    "state": "Kentucky",
    "region": "Louisville Metro",
    "summary": "Long Parklands Floyds Fork route linking Creekside to Broad Run Valley. KDFWR documents the public route pieces and endpoint access records, while the lower-corridor PDF keeps Marys Island, wood, and marked-landings-only discipline explicit.",
    "statusText": "Use the Floyds Fork at Fisherville gauge. KDFWR lists 50 to 300 cfs, or 1.3 to 2.5 ft, as the corridor good band, and older Parklands/KDFWR guidance treats 35 to 500 cfs as the broader recreation range. Below that expect scraping and a slower day; above it expect faster bends and fewer easy recoveries.",
    "latitude": 38.2158,
    "longitude": -85.4778,
    "gaugeSource": {
      "id": "usgs-03298000",
      "provider": "usgs",
      "siteId": "03298000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Floyds Fork at Fisherville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 50,
      "idealMax": 300,
      "tooLow": 35,
      "tooHigh": 500,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Floyds Fork near Fisherville",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This longer Parklands route is most realistic in spring through fall. Low summer flows extend the day with shoal scraping, while storm runoff quickly makes the lower bends and chutes more forceful.",
      "difficulty": "moderate",
      "difficultyNotes": "This remains Class I+ moving water with route-reading responsibility, not a casual flatwater greenway float. The lower PDF and Parklands guidance keep shoals, braid choices, wood, and quick water-level changes explicit enough for a moderate rating.",
      "confidenceNotes": "Confidence is high for a conservative add: KDFWR names Creekside to Fisherville at 4.3 miles, Fisherville to Cane Run at 4.2 miles, and Cane Run to Seaton Valley at 3.1 miles, while the lower Floyds Fork PDF names Seaton Valley to Broad Run Valley at 3.5 miles, supporting a 15.1-mile public Creekside-to-Broad-Run-Valley float. KDFWR gives source-backed coordinates for both endpoints, publishes official Fisherville low/good/high bands on the same corridor, and same-day USGS Water Services values were available during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "50-300 cfs / 1.3-2.5 ft",
        "note": "KDFWR rates Floyds Fork near Fisherville as Low below 50 cfs or 1.3 ft, Good from 50 to 300 cfs or 1.3 to 2.5 ft, and High above 300 cfs or 2.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx"
      },
      {
        "label": "Broader recreation band",
        "value": "35-500 cfs",
        "note": "A KDFWR Floyds Fork feature says the best floating levels for fishing and recreation are 35 to 500 cfs, with higher levels suited only to experienced paddlers.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx"
      },
      {
        "label": "Chained public route segment",
        "value": "Creekside Canoe Access to Broad Run Valley Paddling Access, 15.1 miles",
        "note": "KDFWR lists Creekside Canoe Access to Fisherville Canoe Access as 4.3 miles, Fisherville Canoe Access to Cane Run Canoe Access as 4.2 miles, and Cane Run Canoe Access to Seaton Valley Paddling Access as 3.1 miles, while the lower Floyds Fork PDF lists Seaton Valley Paddling Access to Broad Run Valley Paddling Access as 3.5 miles, supporting a 15.1-mile public Creekside-to-Broad-Run-Valley float.",
        "sourceUrl": "https://fw.ky.gov/More/Documents/KAsummer16floydsfork.pdf"
      },
      {
        "label": "Put-in access",
        "value": "Creekside Canoe Access, 38.2158, -85.4778",
        "note": "KDFWR identifies Creekside Canoe Access as a free carry-down access at The Parklands with unpaved parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1091"
      },
      {
        "label": "Take-out access",
        "value": "Broad Run Valley Paddling Access, 38.1039, -85.5455",
        "note": "KDFWR identifies Broad Run Valley Paddling Access as a free carry-down site with year-round limited-hours shoreline access and no camping listed.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1142"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03298000 at 187 cfs / 1.93 ft",
        "note": "USGS Water Services returned same-day values of 187 cfs and 1.93 ft at 2026-07-09 14:20 EDT for Floyds Fork at Fisherville during this run, inside the official good band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route hazards",
        "value": "Class I+ moving water, Mary's Island split, bedrock shelves, wood",
        "note": "The lower Floyds Fork PDF says paddlers may encounter strainers, should veer left at Mary's Island, and should expect shallow bedrock rapids, braided chutes, undercut banks, and changing current through the lower Parklands section.",
        "sourceUrl": "https://fw.ky.gov/More/Documents/KAsummer16floydsfork.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Floyds Fork",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Floyd's Fork route feature",
        "url": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Creekside Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1091",
        "provider": "local"
      },
      {
        "label": "KDFWR Broad Run Valley Paddling Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1142",
        "provider": "local"
      },
      {
        "label": "KDFWR Floyds Fork lower-section PDF",
        "url": "https://fw.ky.gov/More/Documents/KAsummer16floydsfork.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 03298000 Floyds Fork at Fisherville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03298000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "The Parklands paddling guidance",
        "url": "https://theparklands.org/find-an-activity/paddling/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "floyds-fork-cane-run-seaton-valley",
    "slug": "floyds-fork-cane-run-seaton-valley",
    "name": "Floyds Fork",
    "reach": "Cane Run Canoe Access to Seaton Valley Paddling Access",
    "aliases": [
      "Floyds Fork - Cane Run to Seaton Valley",
      "Floyds Fork Parklands Cane Run to Seaton Valley",
      "Floyd's Fork lower Parklands float"
    ],
    "state": "Kentucky",
    "region": "Louisville Metro",
    "summary": "Short lower-Parklands Floyds Fork float from Pope Lick Park into Turkey Run. KDFWR documents the public access pair and mileage, and the Parklands supplies the marked-landings-only and moving-water safety posture for this managed urban corridor.",
    "statusText": "Use the Floyds Fork at Fisherville gauge. KDFWR lists 50 to 300 cfs, or 1.3 to 2.5 ft, as the corridor good band, and an older KDFWR route feature frames 35 to 500 cfs as the broader recreation range. Below that expect more scraping; above that expect a swifter, less forgiving runout into bends.",
    "latitude": 38.1519,
    "longitude": -85.5026,
    "gaugeSource": {
      "id": "usgs-03298000",
      "provider": "usgs",
      "siteId": "03298000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Floyds Fork at Fisherville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 50,
      "idealMax": 300,
      "tooLow": 35,
      "tooHigh": 500,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Floyds Fork near Fisherville",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This lower Parklands corridor is still rain-sensitive. Spring through fall is the practical season, but the route can turn pushy and fast after storms and scrape badly when summer flows sag below the corridor floor.",
      "difficulty": "moderate",
      "difficultyNotes": "The route stays within an accessible park system, but The Parklands still classifies Floyds Fork as Class I+ moving water with wood, waves, and quickly changing levels. Treat it as a moderate moving-water trip rather than a casual flatwater float.",
      "confidenceNotes": "Confidence is solid for a conservative add: KDFWR names the exact Cane Run-to-Seaton Valley access pair, gives official coordinates for both endpoints, and publishes official Fisherville gauge bands for the corridor. The Parklands paddling guidance confirms seven designated access points, marked-landings-only use, and Class I+ moving-water hazards, and same-day USGS Water Services values were available during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "50-300 cfs / 1.3-2.5 ft",
        "note": "KDFWR rates Floyds Fork near Fisherville as Low below 50 cfs or 1.3 ft, Good from 50 to 300 cfs or 1.3 to 2.5 ft, and High above 300 cfs or 2.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx"
      },
      {
        "label": "Broader recreation band",
        "value": "35-500 cfs",
        "note": "A KDFWR Floyds Fork feature says the best floating levels for fishing and recreation are 35 to 500 cfs, with higher levels suited only to experienced paddlers.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx"
      },
      {
        "label": "Official route segment",
        "value": "Cane Run Canoe Access to Seaton Valley Paddling Access, 3.1 miles",
        "note": "KDFWR lists Cane Run Canoe Access to Seaton Valley Paddling Access in the Floyds Fork site-to-site mileage table.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Cane Run Canoe Access, 38.1519, -85.5026",
        "note": "KDFWR identifies Cane Run Canoe Access as a free carry-down site off Echo Trail with unpaved parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1092"
      },
      {
        "label": "Take-out access",
        "value": "Seaton Valley Paddling Access, 38.1323, -85.5191",
        "note": "KDFWR identifies Seaton Valley Paddling Access as a free carry-down site in Turkey Run Park with shoreline access and no camping listed.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1141"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03298000",
        "note": "USGS Water Services returned same-day values of 1620 cfs and 4.78 ft at 2026-06-22 13:20 EDT for Floyds Fork at Fisherville during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route hazards",
        "value": "Class I+ moving water, strainers, quick rises, marked-landings-only access",
        "note": "The Parklands says Floyds Fork is Class I+ moving water with small rapids, waves, obstructions, strainers, and quickly changing levels, and its paddling page says to use marked landings only and not to take out on private property.",
        "sourceUrl": "https://theparklands.org/find-an-activity/paddling/"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Floyds Fork",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Floyd's Fork route feature",
        "url": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Cane Run Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1092",
        "provider": "local"
      },
      {
        "label": "KDFWR Seaton Valley Paddling Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1141",
        "provider": "local"
      },
      {
        "label": "USGS 03298000 Floyds Fork at Fisherville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03298000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "The Parklands paddling page",
        "url": "https://theparklands.org/find-an-activity/paddling/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "floyds-fork-cane-run-broad-run-valley",
    "slug": "floyds-fork-cane-run-broad-run-valley",
    "name": "Floyds Fork",
    "reach": "Cane Run Canoe Access to Broad Run Valley Paddling Access",
    "aliases": [
      "Floyds Fork - Cane Run to Broad Run Valley",
      "Floyds Fork Parklands Cane Run to Broad Run Valley",
      "Floyd's Fork lower corridor float"
    ],
    "state": "Kentucky",
    "region": "Louisville Metro",
    "summary": "Longer lower-Parklands Floyds Fork float from Cane Run into Broad Run Valley. KDFWR documents the Cane-Run-to-Seaton and Seaton-to-Broad-Run route pieces, while the lower-corridor PDF adds Mary's Island, bluff, and strainer cautions for the downstream half.",
    "statusText": "Use the Floyds Fork at Fisherville gauge. KDFWR lists 50 to 300 cfs, or 1.3 to 2.5 ft, as the corridor good band, and older Parklands/KDFWR guidance treats 35 to 500 cfs as the wider recreation window. Lower water stretches the trip; higher water makes the bends, braids, and island splits pushier.",
    "latitude": 38.1519,
    "longitude": -85.5026,
    "gaugeSource": {
      "id": "usgs-03298000",
      "provider": "usgs",
      "siteId": "03298000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Floyds Fork at Fisherville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 50,
      "idealMax": 300,
      "tooLow": 35,
      "tooHigh": 500,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Floyds Fork near Fisherville",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "Spring through fall remains the practical season. This reach reacts quickly to rain, and lower summer flows can slow progress around shoals, boulder runs, and island splits.",
      "difficulty": "moderate",
      "difficultyNotes": "This is not flatwater despite the park setting. The Parklands and KDFWR guidance call out Class I+ moving water, strainers, braid decisions, shallow rapids, undercut banks, and a longer managed-corridor shuttle that justify a moderate rating.",
      "confidenceNotes": "Confidence is high for a conservative add: KDFWR names the exact Cane Run Canoe Access to Seaton Valley Paddling Access segment at 3.1 miles and the Seaton Valley Paddling Access to Broad Run Valley Paddling Access segment at 3.5 miles, which support a 6.6-mile public Cane-Run-to-Broad-Run-Valley float. KDFWR provides source-backed coordinates and public-use notes for both endpoints, and the same corridor uses the direct USGS 03298000 Fisherville gauge with official low/good/high bands. Same-day USGS Water Services values were available during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "50-300 cfs / 1.3-2.5 ft",
        "note": "KDFWR rates Floyds Fork near Fisherville as Low below 50 cfs or 1.3 ft, Good from 50 to 300 cfs or 1.3 to 2.5 ft, and High above 300 cfs or 2.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx"
      },
      {
        "label": "Broader recreation band",
        "value": "35-500 cfs",
        "note": "A KDFWR Floyds Fork feature says the best floating levels for fishing and recreation are 35 to 500 cfs, with higher levels suited only to experienced paddlers.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx"
      },
      {
        "label": "Chained public route segment",
        "value": "Cane Run Canoe Access to Broad Run Valley Paddling Access, 6.6 miles",
        "note": "KDFWR lists Cane Run Canoe Access to Seaton Valley Paddling Access as 3.1 miles, and the KDFWR lower Floyds Fork PDF lists Seaton Valley Paddling Access to Broad Run Valley Paddling Access as 3.5 miles, supporting a 6.6-mile public Cane-Run-to-Broad-Run-Valley float.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Cane Run Canoe Access, 38.1519, -85.5026",
        "note": "KDFWR identifies Cane Run Canoe Access as a free carry-down site off Echo Trail with unpaved parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1092"
      },
      {
        "label": "Take-out access",
        "value": "Broad Run Valley Paddling Access, 38.1039, -85.5455",
        "note": "KDFWR identifies Broad Run Valley Paddling Access as a free carry-down site with year-round limited-hours shoreline access and no camping listed.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1142"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03298000 at 50.8 cfs / 1.09 ft",
        "note": "USGS Water Services returned same-day values of 50.8 cfs and 1.09 ft at 2026-07-05 20:20 EDT for Floyds Fork at Fisherville during this run, just above the discharge floor but below the official stage floor.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route hazards",
        "value": "Class I+ moving water, strainers, shallow rapids, Mary's Island split",
        "note": "The KDFWR lower Floyds Fork PDF says paddlers may encounter strainers, should veer left at Mary's Island, and should expect shallow bedrock rapids, braided chutes, undercut banks, and changing current through this lower Parklands section.",
        "sourceUrl": "https://fw.ky.gov/More/Documents/KAsummer16floydsfork.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Floyds Fork",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Floyd's Fork route feature",
        "url": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Floyds Fork lower-section PDF",
        "url": "https://fw.ky.gov/More/Documents/KAsummer16floydsfork.pdf",
        "provider": "local"
      },
      {
        "label": "KDFWR Cane Run Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1092",
        "provider": "local"
      },
      {
        "label": "KDFWR Broad Run Valley Paddling Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1142",
        "provider": "local"
      },
      {
        "label": "USGS 03298000 Floyds Fork at Fisherville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03298000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "The Parklands paddling guidance",
        "url": "https://theparklands.org/find-an-activity/paddling/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "floyds-fork-north-beckley-cane-run",
    "slug": "floyds-fork-north-beckley-cane-run",
    "name": "Floyds Fork",
    "reach": "North Beckley Canoe Access to Cane Run Canoe Access",
    "aliases": [
      "Floyds Fork - North Beckley to Cane Run",
      "Floyds Fork Parklands North Beckley to Cane Run",
      "Floyd's Fork full upper Parklands float"
    ],
    "state": "Kentucky",
    "region": "Louisville Metro",
    "summary": "Longer Parklands Floyds Fork day from Beckley Creek Park to Pope Lick Park. The KDFWR Blue Water Trail map names this exact 10.7-mile public route, and Parklands/KDFWR guidance adds moving-water, shoal, and signed take-out cautions.",
    "statusText": "Use the Floyds Fork at Fisherville gauge. KDFWR lists 50 to 300 cfs, or 1.3 to 2.5 ft, as the corridor good band, and the older route feature frames 35 to 500 cfs as the broader recreation range. Below that expect dragging and shoal walking; above that expect swifter current and fewer forgiving recovery spots.",
    "latitude": 38.2308,
    "longitude": -85.4682,
    "gaugeSource": {
      "id": "usgs-03298000",
      "provider": "usgs",
      "siteId": "03298000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Floyds Fork at Fisherville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 50,
      "idealMax": 300,
      "tooLow": 35,
      "tooHigh": 500,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Floyds Fork near Fisherville",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "Floyds Fork remains a rain-sensitive moving-water corridor. Spring through fall is the practical season, but lower summer flows can turn long shoals into a creek walk while storms can push the full 10.7-mile commitment into faster current.",
      "difficulty": "moderate",
      "difficultyNotes": "This is still a Class I+ Parklands moving-water trip rather than a casual urban float. The longer length adds fatigue and route-finding pressure on top of shoals, braided current choices, wood, and the signed Cane Run side-channel finish.",
      "confidenceNotes": "Confidence is high for a guarded add: the KDFWR Blue Water Trail map names North Beckley to Cane Run as an exact 10.7-mile public route, KDFWR access-detail pages provide source-backed coordinates and public-use notes for both carry-down endpoints, and the same corridor uses the direct USGS 03298000 Fisherville gauge with official low/good/high bands. The KDFWR route feature and Parklands safety sheet add route-specific braid, shoal, moving-water, and take-out context."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "50-300 cfs / 1.3-2.5 ft",
        "note": "KDFWR rates Floyds Fork near Fisherville as Low below 50 cfs or 1.3 ft, Good from 50 to 300 cfs or 1.3 to 2.5 ft, and High above 300 cfs or 2.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx"
      },
      {
        "label": "Broader recreation band",
        "value": "35-500 cfs",
        "note": "The older KDFWR Floyds Fork feature says the best floating levels for fishing and recreation are 35 to 500 cfs, with higher levels suited only to experienced paddlers.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx"
      },
      {
        "label": "Official route segment",
        "value": "North Beckley Canoe Access to Cane Run Canoe Access, 10.7 miles",
        "note": "The KDFWR Blue Water Trail map lists North Beckley to Cane Run as an exact public Floyds Fork route with an estimated trip time of about 5.25 hours.",
        "sourceUrl": "https://fw.ky.gov/Education/Documents/BlueWaterTrailFloydsFork.pdf"
      },
      {
        "label": "Put-in access",
        "value": "North Beckley Canoe Access, 38.2308, -85.4682",
        "note": "KDFWR identifies North Beckley Canoe Access as a free carry-down site in Beckley Creek Park with limited-hours shoreline access and unpaved parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=876"
      },
      {
        "label": "Take-out access",
        "value": "Cane Run Canoe Access, 38.1519, -85.5026",
        "note": "KDFWR identifies Cane Run Canoe Access as a free carry-down site off Echo Trail with unpaved parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1092"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03298000",
        "note": "USGS Water Services returned same-day values of 67.4 cfs and 1.23 ft at 2026-07-03 20:20 EDT for Floyds Fork at Fisherville during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route hazards",
        "value": "Class I+ moving water, shoals, strainers, side-channel take-out",
        "note": "KDFWR and The Parklands describe Floyds Fork as Class I+ moving water with sharp turns, overhanging brush, strainers, low-water shoals, and a signed Cane Run side-channel take-out that is easy to miss if you drift past it.",
        "sourceUrl": "https://theparklands.org/app/uploads/2020/11/PaddlingTheFork_Final-11.11.16.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Floyds Fork",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Floyd's Fork route feature",
        "url": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Blue Water Trail Floyds Fork map",
        "url": "https://fw.ky.gov/Education/Documents/BlueWaterTrailFloydsFork.pdf",
        "provider": "local"
      },
      {
        "label": "KDFWR North Beckley Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=876",
        "provider": "local"
      },
      {
        "label": "KDFWR Cane Run Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1092",
        "provider": "local"
      },
      {
        "label": "USGS 03298000 Floyds Fork at Fisherville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03298000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "The Parklands Paddling the Fork safety sheet",
        "url": "https://theparklands.org/app/uploads/2020/11/PaddlingTheFork_Final-11.11.16.pdf",
        "provider": "local"
      }
    ]
  },
  {
    "id": "floyds-fork-north-beckley-seaton-valley",
    "slug": "floyds-fork-north-beckley-seaton-valley",
    "name": "Floyds Fork",
    "reach": "North Beckley Canoe Access to Seaton Valley Paddling Access",
    "aliases": [
      "Floyds Fork - North Beckley to Seaton Valley",
      "Floyds Fork Parklands North Beckley to Seaton Valley",
      "Floyd's Fork upper-to-lower Parklands float"
    ],
    "state": "Kentucky",
    "region": "Louisville Metro",
    "summary": "Long Parklands Floyds Fork float linking North Beckley to Turkey Run. KDFWR publishes the exact 13.7-mile route, official Fisherville gauge bands, and public access records, while route guidance keeps The Oxbow, bridge landmarks, and take-out discipline explicit.",
    "statusText": "Use the Floyds Fork at Fisherville gauge. KDFWR lists 50 to 300 cfs, or 1.3 to 2.5 ft, as the corridor good band, while older Parklands and KDFWR guidance treat 35 to 500 cfs as the broader recreation range. Below that expect scraping and a slow day; above that expect stronger current and fewer easy recoveries.",
    "latitude": 38.2308,
    "longitude": -85.4682,
    "gaugeSource": {
      "id": "usgs-03298000",
      "provider": "usgs",
      "siteId": "03298000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Floyds Fork at Fisherville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 50,
      "idealMax": 300,
      "tooLow": 35,
      "tooHigh": 500,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Floyds Fork near Fisherville",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This long Parklands corridor is most realistic in spring through fall. Low summer flows can turn the mileage into a scrape-heavy day, while storm runoff quickly makes the upper braid choices and middle bends more forceful.",
      "difficulty": "moderate",
      "difficultyNotes": "This remains Class I+ moving water, but the route length and decision count justify a moderate rating. KDFWR and The Parklands keep the braid choices, wood, quick level changes, and marked-landings-only discipline explicit enough that this should not be treated like a casual greenway drift.",
      "confidenceNotes": "Confidence is high for a conservative add: the KDFWR lower Floyds Fork PDF publishes North Beckley to Seaton Valley as a 13.7-mile route, KDFWR access-detail pages provide source-backed coordinates for both endpoints, and the corridor uses direct USGS 03298000 with official Fisherville low/good/high bands. Same-day USGS Water Services values were available during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "50-300 cfs / 1.3-2.5 ft",
        "note": "KDFWR rates Floyds Fork near Fisherville as Low below 50 cfs or 1.3 ft, Good from 50 to 300 cfs or 1.3 to 2.5 ft, and High above 300 cfs or 2.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx"
      },
      {
        "label": "Broader recreation band",
        "value": "35-500 cfs",
        "note": "A KDFWR Floyds Fork feature says the best floating levels for fishing and recreation are 35 to 500 cfs, with higher levels suited only to experienced paddlers.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx"
      },
      {
        "label": "Official route segment",
        "value": "North Beckley Canoe Access to Seaton Valley Paddling Access, 13.7 miles",
        "note": "The KDFWR lower Floyds Fork PDF lists North Beckley to Seaton Valley as a 13.7-mile recommended route through the Parklands corridor.",
        "sourceUrl": "https://fw.ky.gov/More/Documents/KAsummer16floydsfork.pdf"
      },
      {
        "label": "Put-in access",
        "value": "North Beckley Canoe Access, 38.2308, -85.4682",
        "note": "KDFWR identifies North Beckley Canoe Access as a free carry-down site in Beckley Creek Park with limited-hours shoreline access and unpaved parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=876"
      },
      {
        "label": "Take-out access",
        "value": "Seaton Valley Paddling Access, 38.1323, -85.5191",
        "note": "KDFWR identifies Seaton Valley Paddling Access as a free carry-down site in Turkey Run Park with shoreline access and no camping listed.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1141"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03298000 at 41.4 cfs / 1.00 ft",
        "note": "USGS Water Services returned same-day values of 41.4 cfs and 1.00 ft at 2026-07-06 09:20 EDT for Floyds Fork at Fisherville during this run, below the official good-band floor.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route hazards",
        "value": "Class I+ moving water, Oxbow braid choice, wood, bridge landmarks",
        "note": "KDFWR's route feature says to stay in the main current around The Oxbow and expect dragging through braided summer chutes, while the broader corridor still includes wood, bluff-side current, and multiple bridge landmarks before the Turkey Run finish.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Floyds Fork",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Floyd's Fork route feature",
        "url": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR North Beckley Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=876",
        "provider": "local"
      },
      {
        "label": "KDFWR Seaton Valley Paddling Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1141",
        "provider": "local"
      },
      {
        "label": "KDFWR Floyds Fork lower-section PDF",
        "url": "https://fw.ky.gov/More/Documents/KAsummer16floydsfork.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 03298000 Floyds Fork at Fisherville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03298000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "The Parklands paddling guidance",
        "url": "https://theparklands.org/find-an-activity/paddling/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "floyds-fork-seaton-valley-broad-run-valley",
    "slug": "floyds-fork-seaton-valley-broad-run-valley",
    "name": "Floyds Fork",
    "reach": "Seaton Valley Paddling Access to Broad Run Valley Paddling Access",
    "aliases": [
      "Floyds Fork - Seaton Valley to Broad Run Valley",
      "Floyds Fork Parklands Seaton Valley to Broad Run Valley",
      "Floyd's Fork Turkey Run to Broad Run float"
    ],
    "state": "Kentucky",
    "region": "Louisville Metro",
    "summary": "Scenic lower-Parklands Floyds Fork float from Turkey Run into Broad Run Valley. The KDFWR Floyds Fork PDF names this exact 3.5-mile route and adds Mary’s Island, bluff, and strainer cautions.",
    "statusText": "Use the Floyds Fork at Fisherville gauge. KDFWR lists 50 to 300 cfs, or 1.3 to 2.5 ft, as the corridor good band, and older Parklands/KDFWR guidance treats 35 to 500 cfs as the wider recreation window. Lower water stretches the trip; higher water makes the braid and island bends pushier.",
    "latitude": 38.1323,
    "longitude": -85.5191,
    "gaugeSource": {
      "id": "usgs-03298000",
      "provider": "usgs",
      "siteId": "03298000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Floyds Fork at Fisherville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 50,
      "idealMax": 300,
      "tooLow": 35,
      "tooHigh": 500,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Floyds Fork near Fisherville",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "Spring through fall remains the practical season. This reach still reacts quickly to rain, and lower summer flows can slow progress around shoals, boulder runs, and island splits.",
      "difficulty": "moderate",
      "difficultyNotes": "This is not flatwater despite the park setting. The KDFWR PDF calls out strainers, braid decisions, shallow rapids, undercut banks, and a mile-long island loop that justify a moderate moving-water rating.",
      "confidenceNotes": "Confidence is high for a conservative add: the KDFWR Floyds Fork PDF names Seaton Valley to Broad Run Valley as an exact 3.5-mile public route, KDFWR access-detail pages provide source-backed coordinates and public-use notes for both endpoints, and the same corridor uses the direct USGS 03298000 Fisherville gauge with official low/good/high bands. The Parklands safety sheet and the route PDF add specific downstream hazard context."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "50-300 cfs / 1.3-2.5 ft",
        "note": "KDFWR rates Floyds Fork near Fisherville as Low below 50 cfs or 1.3 ft, Good from 50 to 300 cfs or 1.3 to 2.5 ft, and High above 300 cfs or 2.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx"
      },
      {
        "label": "Official route segment",
        "value": "Seaton Valley Paddling Access to Broad Run Valley Paddling Access, 3.5 miles",
        "note": "The KDFWR Floyds Fork PDF lists Seaton Valley to Broad Run Valley as a public route with an estimated trip time of about 1.5 hours.",
        "sourceUrl": "https://fw.ky.gov/More/Documents/KAsummer16floydsfork.pdf"
      },
      {
        "label": "Put-in access",
        "value": "Seaton Valley Paddling Access, 38.1323, -85.5191",
        "note": "KDFWR identifies Seaton Valley Paddling Access as a free carry-down site in Turkey Run Park with year-round limited-hours shoreline access and no camping listed.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1141"
      },
      {
        "label": "Take-out access",
        "value": "Broad Run Valley Paddling Access, 38.1039, -85.5455",
        "note": "KDFWR identifies Broad Run Valley Paddling Access as a free carry-down site with year-round limited-hours shoreline access and no camping listed.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1142"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03298000",
        "note": "USGS Water Services returned same-day values of 67.4 cfs and 1.23 ft at 2026-07-03 20:20 EDT for Floyds Fork at Fisherville during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route hazards",
        "value": "Mary’s Island split, strainers, shallow rapids, bluff and bedrock sections",
        "note": "The KDFWR PDF says paddlers may encounter strainers, should veer left at Mary’s Island, and should expect shallow bedrock rapids, braided chutes, undercut banks, and changing current through this lower Parklands section.",
        "sourceUrl": "https://fw.ky.gov/More/Documents/KAsummer16floydsfork.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Floyds Fork",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Floyds Fork lower-section PDF",
        "url": "https://fw.ky.gov/More/Documents/KAsummer16floydsfork.pdf",
        "provider": "local"
      },
      {
        "label": "KDFWR Seaton Valley Paddling Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1141",
        "provider": "local"
      },
      {
        "label": "KDFWR Broad Run Valley Paddling Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1142",
        "provider": "local"
      },
      {
        "label": "USGS 03298000 Floyds Fork at Fisherville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03298000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "The Parklands Paddling the Fork safety sheet",
        "url": "https://theparklands.org/app/uploads/2020/11/PaddlingTheFork_Final-11.11.16.pdf",
        "provider": "local"
      }
    ]
  },
  {
    "id": "floyds-fork-seaton-valley-cliffside",
    "slug": "floyds-fork-seaton-valley-cliffside",
    "name": "Floyds Fork",
    "reach": "Seaton Valley Paddling Access to Cliffside Paddling Access",
    "aliases": [
      "Floyds Fork - Seaton Valley to Cliffside",
      "Floyds Fork Parklands Seaton Valley to Cliffside",
      "Floyd's Fork lower Parklands continuation"
    ],
    "state": "Kentucky",
    "region": "Louisville Metro",
    "summary": "Lower-Parklands Floyds Fork float linking Turkey Run to Broad Run Park. KDFWR documents the public lower-corridor route pieces and access records, while the lower PDF keeps Mary's Island, bedrock shelves, and marked-landings-only cautions explicit.",
    "statusText": "Use the Floyds Fork at Fisherville gauge. KDFWR lists 50 to 300 cfs, or 1.3 to 2.5 ft, as the corridor good band, and older Parklands and KDFWR guidance treat 35 to 500 cfs as the broader recreation range. Below that expect scraping and slower braid choices; above that expect swifter current and fewer easy recoveries.",
    "latitude": 38.1323,
    "longitude": -85.5191,
    "gaugeSource": {
      "id": "usgs-03298000",
      "provider": "usgs",
      "siteId": "03298000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Floyds Fork at Fisherville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 50,
      "idealMax": 300,
      "tooLow": 35,
      "tooHigh": 500,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Floyds Fork near Fisherville",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This lower Parklands route is most practical in spring through fall. Low summer flows can expose bedrock shelves and slow the island braids, while storm runoff quickly makes the lower bends, chutes, and recovery zones less forgiving.",
      "difficulty": "moderate",
      "difficultyNotes": "This remains Class I+ moving water with route-reading responsibility, not a flatwater park drift. The lower PDF and Parklands guidance keep the braid choices, strainers, wood, and quickly changing levels explicit enough for a moderate rating.",
      "confidenceNotes": "Confidence is high for a conservative add: the lower Floyds Fork PDF lists Seaton Valley to Broad Run Valley at 3.5 miles and Broad Run Valley to Cliffside at 2.5 miles, supporting a 6.0-mile public Seaton-to-Cliffside float. KDFWR access-detail pages provide source-backed coordinates for both endpoints, and the corridor uses direct USGS 03298000 with official Fisherville low/good/high bands. Same-day USGS Water Services values were available during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "50-300 cfs / 1.3-2.5 ft",
        "note": "KDFWR rates Floyds Fork near Fisherville as Low below 50 cfs or 1.3 ft, Good from 50 to 300 cfs or 1.3 to 2.5 ft, and High above 300 cfs or 2.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx"
      },
      {
        "label": "Broader recreation band",
        "value": "35-500 cfs",
        "note": "A KDFWR Floyds Fork feature says the best floating levels for fishing and recreation are 35 to 500 cfs, with higher levels suited only to experienced paddlers.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx"
      },
      {
        "label": "Chained public route segment",
        "value": "Seaton Valley Paddling Access to Cliffside Paddling Access, 6.0 miles",
        "note": "The lower Floyds Fork PDF lists Seaton Valley Paddling Access to Broad Run Valley Paddling Access as 3.5 miles and Broad Run Valley Paddling Access to Cliffside Paddling Access as 2.5 miles, supporting a 6.0-mile public Seaton-to-Cliffside float.",
        "sourceUrl": "https://fw.ky.gov/More/Documents/KAsummer16floydsfork.pdf"
      },
      {
        "label": "Put-in access",
        "value": "Seaton Valley Paddling Access, 38.1323, -85.5191",
        "note": "KDFWR identifies Seaton Valley Paddling Access as a free carry-down site in Turkey Run Park with shoreline access and no camping listed.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1141"
      },
      {
        "label": "Take-out access",
        "value": "Cliffside Paddling Access, 38.0864, -85.5520",
        "note": "KDFWR identifies Cliffside Paddling Access as a free carry-down site in Broad Run Park with year-round limited-hours shoreline access and no camping listed.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1143"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03298000 at 41.4 cfs / 1.00 ft",
        "note": "USGS Water Services returned same-day values of 41.4 cfs and 1.00 ft at 2026-07-06 09:20 EDT for Floyds Fork at Fisherville during this run, below the official good-band floor.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route hazards",
        "value": "Class I+ moving water, Mary's Island split, bedrock rapids, wood",
        "note": "The lower Floyds Fork PDF says paddlers may encounter strainers, should veer left at Mary's Island, and should expect shallow bedrock rapids, braided chutes, undercut banks, and changing current through the lower Parklands section.",
        "sourceUrl": "https://fw.ky.gov/More/Documents/KAsummer16floydsfork.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Floyds Fork",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Floyd's Fork route feature",
        "url": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Seaton Valley Paddling Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1141",
        "provider": "local"
      },
      {
        "label": "KDFWR Cliffside Paddling Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1143",
        "provider": "local"
      },
      {
        "label": "KDFWR Floyds Fork lower-section PDF",
        "url": "https://fw.ky.gov/More/Documents/KAsummer16floydsfork.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 03298000 Floyds Fork at Fisherville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03298000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "The Parklands paddling guidance",
        "url": "https://theparklands.org/find-an-activity/paddling/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "floyds-fork-broad-run-valley-cliffside",
    "slug": "floyds-fork-broad-run-valley-cliffside",
    "name": "Floyds Fork",
    "reach": "Broad Run Valley Paddling Access to Cliffside Paddling Access",
    "aliases": [
      "Floyds Fork - Broad Run Valley to Cliffside",
      "Floyds Fork Parklands Broad Run Valley to Cliffside",
      "Floyd's Fork Broad Run to Cliffside float"
    ],
    "state": "Kentucky",
    "region": "Louisville Metro",
    "summary": "Short lower-Floyds Fork Parklands float into Broad Run Park. The KDFWR Floyds Fork PDF names this exact 2.5-mile public route, and the Parklands safety sheet keeps the moving-water, wood, and private-bank cautions explicit.",
    "statusText": "Use the Floyds Fork at Fisherville gauge. KDFWR lists 50 to 300 cfs, or 1.3 to 2.5 ft, as the corridor good band, with older KDFWR/Parklands guidance broadening the recreation window to 35 to 500 cfs. Below that expect scrape-prone shallows; above that expect faster current and fewer easy landing spots.",
    "latitude": 38.1039,
    "longitude": -85.5455,
    "gaugeSource": {
      "id": "usgs-03298000",
      "provider": "usgs",
      "siteId": "03298000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Floyds Fork at Fisherville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 50,
      "idealMax": 300,
      "tooLow": 35,
      "tooHigh": 500,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Floyds Fork near Fisherville",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This lower corridor remains rain-sensitive despite its short length. Spring through fall is the practical window, but fresh rain can make the run quicker and pushier while lower summer flows expose more shoals and wood.",
      "difficulty": "moderate",
      "difficultyNotes": "The mileage is short, but the route remains Class I+ moving water with limited landing choices, wood, and changing current. Treat it as a moderate creek run instead of a flatwater park shuttle.",
      "confidenceNotes": "Confidence is solid for a conservative add: the KDFWR Floyds Fork PDF names Broad Run Valley to Cliffside as an exact 2.5-mile public route, KDFWR access-detail pages provide source-backed coordinates and public-use notes for both endpoints, and the same corridor uses the direct USGS 03298000 Fisherville gauge with official low/good/high bands. The Parklands safety sheet preserves the corridor-wide moving-water and access discipline."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "50-300 cfs / 1.3-2.5 ft",
        "note": "KDFWR rates Floyds Fork near Fisherville as Low below 50 cfs or 1.3 ft, Good from 50 to 300 cfs or 1.3 to 2.5 ft, and High above 300 cfs or 2.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx"
      },
      {
        "label": "Official route segment",
        "value": "Broad Run Valley Paddling Access to Cliffside Paddling Access, 2.5 miles",
        "note": "The KDFWR Floyds Fork PDF lists Broad Run Valley to Cliffside as a public route with an estimated trip time of about 1.25 hours.",
        "sourceUrl": "https://fw.ky.gov/More/Documents/KAsummer16floydsfork.pdf"
      },
      {
        "label": "Put-in access",
        "value": "Broad Run Valley Paddling Access, 38.1039, -85.5455",
        "note": "KDFWR identifies Broad Run Valley Paddling Access as a free carry-down site with year-round limited-hours shoreline access and no camping listed.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1142"
      },
      {
        "label": "Take-out access",
        "value": "Cliffside Paddling Access, 38.0864, -85.5520",
        "note": "KDFWR identifies Cliffside Paddling Access as a free carry-down site in Broad Run Park with year-round limited-hours shoreline access and no camping listed.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1143"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03298000",
        "note": "USGS Water Services returned same-day values of 67.4 cfs and 1.23 ft at 2026-07-03 20:20 EDT for Floyds Fork at Fisherville during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route hazards",
        "value": "Class I+ moving water, strainers, quick rises, marked-landings-only access",
        "note": "The Parklands says Floyds Fork is Class I+ moving water with small rapids, waves, obstructions, strainers, and quickly changing levels, and it tells paddlers to use marked landings only and not to take out on private property.",
        "sourceUrl": "https://theparklands.org/find-an-activity/paddling/"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Floyds Fork",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Floyds Fork lower-section PDF",
        "url": "https://fw.ky.gov/More/Documents/KAsummer16floydsfork.pdf",
        "provider": "local"
      },
      {
        "label": "KDFWR Broad Run Valley Paddling Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1142",
        "provider": "local"
      },
      {
        "label": "KDFWR Cliffside Paddling Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1143",
        "provider": "local"
      },
      {
        "label": "USGS 03298000 Floyds Fork at Fisherville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03298000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "The Parklands paddling page",
        "url": "https://theparklands.org/find-an-activity/paddling/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "floyds-fork-north-beckley-fisherville",
    "slug": "floyds-fork-north-beckley-fisherville",
    "name": "Floyds Fork",
    "reach": "North Beckley Canoe Access to Fisherville Canoe Access",
    "aliases": [
      "Floyds Fork - North Beckley to Fisherville",
      "Floyds Fork Parklands North Beckley to Fisherville",
      "Floyd's Fork upper-to-middle Parklands float"
    ],
    "state": "Kentucky",
    "region": "Louisville Metro",
    "summary": "Mid-length Parklands Floyds Fork day linking North Beckley to Fisherville. KDFWR documents the two public route pieces and both endpoint access records, while the older route feature adds Oxbow, Distillery Bend, and bridge context.",
    "statusText": "Use the Floyds Fork at Fisherville gauge. KDFWR lists 50 to 300 cfs, or 1.3 to 2.5 ft, as the corridor good band, and the older KDFWR feature frames 35 to 500 cfs as the broader recreation range. Below that expect braided dragging; above that expect faster current and fewer recovery spots.",
    "latitude": 38.2308,
    "longitude": -85.4682,
    "gaugeSource": {
      "id": "usgs-03298000",
      "provider": "usgs",
      "siteId": "03298000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Floyds Fork at Fisherville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 50,
      "idealMax": 300,
      "tooLow": 35,
      "tooHigh": 500,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Floyds Fork near Fisherville",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "The Parklands and KDFWR both treat Floyds Fork as rain-sensitive moving water. Spring through fall is the practical season, but low summer flows can expose gravel bars and braided chutes while storm runoff can push the creek well above the comfortable band.",
      "difficulty": "moderate",
      "difficultyNotes": "This is still a Class I+ Parklands moving-water float, not flatwater. The route is approachable for experienced casual paddlers, but KDFWR and The Parklands both warn about strainers, braid choices, and quicker post-rain current than many urban greenway users expect.",
      "confidenceNotes": "Confidence is high for a conservative add: KDFWR names North Beckley to Creekside at 2.1 miles and Creekside to Fisherville at 4.3 miles, which support a 6.4-mile public North-Beckley-to-Fisherville route. KDFWR provides source-backed coordinates for both endpoints, ties the corridor to direct USGS 03298000, and publishes official Fisherville low/good/high bands. Same-day USGS Water Services values were available during this run, and the older KDFWR route feature adds route-specific context for The Oxbow, Distillery Bend, and the KY 155 take-out."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "50-300 cfs / 1.3-2.5 ft",
        "note": "KDFWR rates Floyds Fork near Fisherville as Low below 50 cfs or 1.3 ft, Good from 50 to 300 cfs or 1.3 to 2.5 ft, and High above 300 cfs or 2.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx"
      },
      {
        "label": "Broader recreation band",
        "value": "35-500 cfs",
        "note": "A KDFWR Floyds Fork feature says the best floating levels for fishing and recreation are 35 to 500 cfs, with higher levels suited only to experienced paddlers.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx"
      },
      {
        "label": "Chained public route segment",
        "value": "North Beckley Canoe Access to Fisherville Canoe Access, 6.4 miles",
        "note": "KDFWR lists North Beckley Canoe Access to Creekside Canoe Access as 2.1 miles and Creekside Canoe Access to Fisherville Canoe Access as 4.3 miles, supporting a 6.4-mile public North-Beckley-to-Fisherville float.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx"
      },
      {
        "label": "Put-in access",
        "value": "North Beckley Canoe Access, 38.2308, -85.4682",
        "note": "KDFWR identifies North Beckley Canoe Access as a free carry-down site in Beckley Creek Park with limited-hours shoreline access and unpaved parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=876"
      },
      {
        "label": "Take-out access",
        "value": "Fisherville Canoe Access, 38.1887, -85.4779",
        "note": "KDFWR identifies Fisherville Canoe Access as a free carry-down site off Old Taylorsville Road with unpaved parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=877"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03298000 at 48.7 cfs / 1.07 ft",
        "note": "USGS Water Services returned same-day values of 48.7 cfs and 1.07 ft at 2026-07-06 00:20 EDT for Floyds Fork at Fisherville during this run, just below the official cfs and stage good-band floors.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route hazards",
        "value": "Class I+ moving water, braid choices, wood, bridge pinch points",
        "note": "The Parklands says Floyds Fork is Class I+ moving water with small rapids, waves, obstructions, strainers, and quickly changing levels, and the KDFWR route feature says to stay in the main current around The Oxbow and expect dragging through braided chutes in summer.",
        "sourceUrl": "https://theparklands.org/find-an-activity/paddling/"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Floyds Fork",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Floyd's Fork route feature",
        "url": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR North Beckley Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=876",
        "provider": "local"
      },
      {
        "label": "KDFWR Fisherville Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=877",
        "provider": "local"
      },
      {
        "label": "USGS 03298000 Floyds Fork at Fisherville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03298000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "The Parklands paddling guidance",
        "url": "https://theparklands.org/find-an-activity/paddling/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "floyds-fork-north-beckley-broad-run-valley",
    "slug": "floyds-fork-north-beckley-broad-run-valley",
    "name": "Floyds Fork",
    "reach": "North Beckley Canoe Access to Broad Run Valley Paddling Access",
    "aliases": [
      "Floyds Fork - North Beckley to Broad Run Valley",
      "Floyds Fork Parklands North Beckley to Broad Run Valley",
      "Floyd's Fork near-full Parklands float"
    ],
    "state": "Kentucky",
    "region": "Louisville Metro",
    "summary": "Near-full Parklands Floyds Fork float linking North Beckley to Broad Run Valley. KDFWR's lower-corridor PDF publishes the exact 17.2-mile route, while the access-detail records and route feature keep the upper Oxbow and lower Mary's Island hazard context explicit.",
    "statusText": "Use the Floyds Fork at Fisherville gauge. KDFWR lists 50 to 300 cfs, or 1.3 to 2.5 ft, as the corridor good band, and older Parklands/KDFWR guidance treats 35 to 500 cfs as the broader recreation range. Below that expect scraping and long shoal walks; above that expect quicker current, fewer easy recoveries, and a much bigger commitment.",
    "latitude": 38.2308,
    "longitude": -85.4682,
    "gaugeSource": {
      "id": "usgs-03298000",
      "provider": "usgs",
      "siteId": "03298000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Floyds Fork at Fisherville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 50,
      "idealMax": 300,
      "tooLow": 35,
      "tooHigh": 500,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Floyds Fork near Fisherville",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This long Parklands route is most realistic in spring through fall. Low summer flows can turn the full corridor into a drawn-out scrape-and-walk day, while storm runoff quickly makes the bends, bridge approaches, and lower chutes less forgiving.",
      "difficulty": "moderate",
      "difficultyNotes": "This remains Class I+ moving water, but the route is long enough that fatigue and missed route-reading matter. The Parklands and KDFWR keep braid choices, wood, quick level changes, and marked-landings-only discipline explicit enough for a moderate rating.",
      "confidenceNotes": "Confidence is high for a conservative add: the lower Floyds Fork PDF publishes North Beckley to Broad Run Valley as a 17.2-mile recommended route, KDFWR access-detail pages provide source-backed coordinates for both endpoints, and the corridor uses direct USGS 03298000 with official Fisherville low/good/high bands. Same-day USGS Water Services values were available during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "50-300 cfs / 1.3-2.5 ft",
        "note": "KDFWR rates Floyds Fork near Fisherville as Low below 50 cfs or 1.3 ft, Good from 50 to 300 cfs or 1.3 to 2.5 ft, and High above 300 cfs or 2.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx"
      },
      {
        "label": "Broader recreation band",
        "value": "35-500 cfs",
        "note": "A KDFWR Floyds Fork feature says the best floating levels for fishing and recreation are 35 to 500 cfs, with higher levels suited only to experienced paddlers.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx"
      },
      {
        "label": "Chained public route segment",
        "value": "North Beckley Canoe Access to Broad Run Valley Paddling Access, 17.2 miles",
        "note": "The KDFWR lower Floyds Fork PDF lists North Beckley to Broad Run Valley as a 17.2-mile recommended route and also publishes the shorter public route pieces that make up the same corridor.",
        "sourceUrl": "https://fw.ky.gov/More/Documents/KAsummer16floydsfork.pdf"
      },
      {
        "label": "Put-in access",
        "value": "North Beckley Canoe Access, 38.2308, -85.4682",
        "note": "KDFWR identifies North Beckley Canoe Access as a free carry-down site in Beckley Creek Park with limited-hours shoreline access and unpaved parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=876"
      },
      {
        "label": "Take-out access",
        "value": "Broad Run Valley Paddling Access, 38.1039, -85.5455",
        "note": "KDFWR identifies Broad Run Valley Paddling Access as a free carry-down site with year-round limited-hours shoreline access and no camping listed.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1142"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03298000 at 43.6 cfs / 1.02 ft",
        "note": "USGS current conditions showed same-day values of 43.6 cfs and 1.02 ft at 2026-07-06 07:20 EDT for Floyds Fork at Fisherville during this run, below the official good-band floor.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route hazards",
        "value": "Class I+ moving water, Oxbow and Mary's Island braid choices, wood",
        "note": "KDFWR's route feature says to stay in the main current around The Oxbow and expect dragging through braided summer chutes, while the lower Floyds Fork PDF says to veer left at Mary's Island and expect shallow bedrock rapids, undercut banks, strainers, and changing current through the lower Parklands corridor.",
        "sourceUrl": "https://fw.ky.gov/More/Documents/KAsummer16floydsfork.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Floyds Fork",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Floyd's Fork route feature",
        "url": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR North Beckley Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=876",
        "provider": "local"
      },
      {
        "label": "KDFWR Broad Run Valley Paddling Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1142",
        "provider": "local"
      },
      {
        "label": "KDFWR Floyds Fork lower-section PDF",
        "url": "https://fw.ky.gov/More/Documents/KAsummer16floydsfork.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 03298000 Floyds Fork at Fisherville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03298000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "The Parklands paddling guidance",
        "url": "https://theparklands.org/find-an-activity/paddling/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "floyds-fork-fisherville-broad-run-valley",
    "slug": "floyds-fork-fisherville-broad-run-valley",
    "name": "Floyds Fork",
    "reach": "Fisherville Canoe Access to Broad Run Valley Paddling Access",
    "aliases": [
      "Floyds Fork - Fisherville to Broad Run Valley",
      "Floyds Fork Parklands Fisherville to Broad Run Valley",
      "Floyd's Fork long lower Parklands float"
    ],
    "state": "Kentucky",
    "region": "Louisville Metro",
    "summary": "Longer lower-Parklands Floyds Fork float linking Fisherville to Broad Run Valley. KDFWR documents the upstream route pieces and both endpoint access records, while the lower-corridor PDF adds Mary's Island, bluff, and strainer context.",
    "statusText": "Use the Floyds Fork at Fisherville gauge. KDFWR lists 50 to 300 cfs, or 1.3 to 2.5 ft, as the corridor good band, and older Parklands/KDFWR guidance treats 35 to 500 cfs as the broader recreation range. Below that expect scraping and longer shoal walks; above that expect faster current and fewer forgiving eddies.",
    "latitude": 38.1887,
    "longitude": -85.4779,
    "gaugeSource": {
      "id": "usgs-03298000",
      "provider": "usgs",
      "siteId": "03298000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Floyds Fork at Fisherville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 50,
      "idealMax": 300,
      "tooLow": 35,
      "tooHigh": 500,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Floyds Fork near Fisherville",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This longer Parklands route is most reliable in spring through fall. Low summer flows stretch the trip with scraping and shoal walking, while heavy rain can quickly push the lower bends and bedrock shelves into a more forceful current.",
      "difficulty": "moderate",
      "difficultyNotes": "This remains Class I+ moving water with route-reading responsibility, not a casual greenway drift. The Parklands and KDFWR note quick level changes, moving current around wood and bends, and lower-corridor braid choices that justify a moderate rating.",
      "confidenceNotes": "Confidence is high for a conservative add: KDFWR names Fisherville to Cane Run at 4.2 miles and Cane Run to Seaton Valley at 3.1 miles, while the lower Floyds Fork PDF names Seaton Valley to Broad Run Valley at 3.5 miles, supporting a 10.8-mile public Fisherville-to-Broad-Run-Valley route. KDFWR provides source-backed coordinates for both endpoints, ties the corridor to direct USGS 03298000, and publishes official Fisherville low/good/high bands. Same-day USGS Water Services values were available during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "50-300 cfs / 1.3-2.5 ft",
        "note": "KDFWR rates Floyds Fork near Fisherville as Low below 50 cfs or 1.3 ft, Good from 50 to 300 cfs or 1.3 to 2.5 ft, and High above 300 cfs or 2.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx"
      },
      {
        "label": "Broader recreation band",
        "value": "35-500 cfs",
        "note": "A KDFWR Floyds Fork feature says the best floating levels for fishing and recreation are 35 to 500 cfs, with higher levels suited only to experienced paddlers.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx"
      },
      {
        "label": "Chained public route segment",
        "value": "Fisherville Canoe Access to Broad Run Valley Paddling Access, 10.8 miles",
        "note": "KDFWR lists Fisherville Canoe Access to Cane Run Canoe Access as 4.2 miles and Cane Run Canoe Access to Seaton Valley Paddling Access as 3.1 miles, while the KDFWR lower Floyds Fork PDF lists Seaton Valley Paddling Access to Broad Run Valley Paddling Access as 3.5 miles, supporting a 10.8-mile public Fisherville-to-Broad-Run-Valley float.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Fisherville Canoe Access, 38.1887, -85.4779",
        "note": "KDFWR identifies Fisherville Canoe Access as a free carry-down site off Old Taylorsville Road with unpaved parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=877"
      },
      {
        "label": "Take-out access",
        "value": "Broad Run Valley Paddling Access, 38.1039, -85.5455",
        "note": "KDFWR identifies Broad Run Valley Paddling Access as a free carry-down site with year-round limited-hours shoreline access and no camping listed.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1142"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03298000 at 48.7 cfs / 1.07 ft",
        "note": "USGS Water Services returned same-day values of 48.7 cfs and 1.07 ft at 2026-07-06 00:20 EDT for Floyds Fork at Fisherville during this run, just below the official cfs and stage good-band floors.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route hazards",
        "value": "Class I+ moving water, Cane Run finish zone, Mary's Island split, wood",
        "note": "The lower Floyds Fork PDF says paddlers may encounter strainers, should veer left at Mary's Island, and should expect shallow bedrock rapids, braided chutes, undercut banks, and changing current through the lower Parklands section.",
        "sourceUrl": "https://fw.ky.gov/More/Documents/KAsummer16floydsfork.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Floyds Fork",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Floyd's Fork route feature",
        "url": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Fisherville Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=877",
        "provider": "local"
      },
      {
        "label": "KDFWR Broad Run Valley Paddling Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1142",
        "provider": "local"
      },
      {
        "label": "KDFWR Floyds Fork lower-section PDF",
        "url": "https://fw.ky.gov/More/Documents/KAsummer16floydsfork.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 03298000 Floyds Fork at Fisherville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03298000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "The Parklands paddling guidance",
        "url": "https://theparklands.org/find-an-activity/paddling/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "floyds-fork-fisherville-cliffside",
    "slug": "floyds-fork-fisherville-cliffside",
    "name": "Floyds Fork",
    "reach": "Fisherville Canoe Access to Cliffside Paddling Access",
    "aliases": [
      "Floyds Fork - Fisherville to Cliffside",
      "Floyds Fork Parklands Fisherville to Cliffside",
      "Floyd's Fork extended lower Parklands float"
    ],
    "state": "Kentucky",
    "region": "Louisville Metro",
    "summary": "Extended lower-Parklands Floyds Fork float linking Fisherville to Cliffside. KDFWR documents the lower public route pieces and both endpoint access records, while the lower-corridor PDF keeps Mary's Island, bluff, and strainer context explicit.",
    "statusText": "Use the Floyds Fork at Fisherville gauge. KDFWR lists 50 to 300 cfs, or 1.3 to 2.5 ft, as the corridor good band, and older Parklands/KDFWR guidance treats 35 to 500 cfs as the broader recreation range. Below that expect scraping and slow braid choices; above that expect faster current and fewer forgiving recovery spots.",
    "latitude": 38.1887,
    "longitude": -85.4779,
    "gaugeSource": {
      "id": "usgs-03298000",
      "provider": "usgs",
      "siteId": "03298000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Floyds Fork at Fisherville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 50,
      "idealMax": 300,
      "tooLow": 35,
      "tooHigh": 500,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Floyds Fork near Fisherville",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This longer lower-Parklands route is most realistic in spring through fall. Low summer flows extend the day with shoal scraping and bedrock drag points, while storm runoff can quickly make the lower bends and chutes more forceful.",
      "difficulty": "moderate",
      "difficultyNotes": "This remains Class I+ moving water with route-reading responsibility, not a casual urban float. The lower PDF and Parklands guidance keep the braid choices, strainers, wood, and quick water-level changes explicit enough for a moderate rating.",
      "confidenceNotes": "Confidence is high for a conservative add: KDFWR names Fisherville to Cane Run at 4.2 miles and Cane Run to Seaton Valley at 3.1 miles, while the lower Floyds Fork PDF names Seaton Valley to Broad Run Valley at 3.5 miles and Broad Run Valley to Cliffside at 2.5 miles, supporting a 13.3-mile public Fisherville-to-Cliffside route. KDFWR provides source-backed coordinates for both endpoints, ties the corridor to direct USGS 03298000, and publishes official Fisherville low/good/high bands. Same-day USGS Water Services values were available during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "50-300 cfs / 1.3-2.5 ft",
        "note": "KDFWR rates Floyds Fork near Fisherville as Low below 50 cfs or 1.3 ft, Good from 50 to 300 cfs or 1.3 to 2.5 ft, and High above 300 cfs or 2.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx"
      },
      {
        "label": "Broader recreation band",
        "value": "35-500 cfs",
        "note": "A KDFWR Floyds Fork feature says the best floating levels for fishing and recreation are 35 to 500 cfs, with higher levels suited only to experienced paddlers.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx"
      },
      {
        "label": "Chained public route segment",
        "value": "Fisherville Canoe Access to Cliffside Paddling Access, 13.3 miles",
        "note": "KDFWR lists Fisherville Canoe Access to Cane Run Canoe Access as 4.2 miles and Cane Run Canoe Access to Seaton Valley Paddling Access as 3.1 miles, while the lower Floyds Fork PDF lists Seaton Valley Paddling Access to Broad Run Valley Paddling Access as 3.5 miles and Broad Run Valley Paddling Access to Cliffside Paddling Access as 2.5 miles, supporting a 13.3-mile public Fisherville-to-Cliffside float.",
        "sourceUrl": "https://fw.ky.gov/More/Documents/KAsummer16floydsfork.pdf"
      },
      {
        "label": "Put-in access",
        "value": "Fisherville Canoe Access, 38.1887, -85.4779",
        "note": "KDFWR identifies Fisherville Canoe Access as a free carry-down site off Old Taylorsville Road with unpaved parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=877"
      },
      {
        "label": "Take-out access",
        "value": "Cliffside Paddling Access, 38.0864, -85.5520",
        "note": "KDFWR identifies Cliffside Paddling Access as a free carry-down site in Broad Run Park with year-round limited-hours shoreline access and no camping listed.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1143"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03298000 at 43.6 cfs / 1.02 ft",
        "note": "USGS current conditions showed same-day values of 43.6 cfs and 1.02 ft at 2026-07-06 07:20 EDT for Floyds Fork at Fisherville during this run, below the official good-band floor.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route hazards",
        "value": "Class I+ moving water, Mary's Island split, bedrock rapids, wood",
        "note": "The lower Floyds Fork PDF says paddlers may encounter strainers, should veer left at Mary's Island, and should expect shallow bedrock rapids, braided chutes, undercut banks, and changing current through the lower Parklands section.",
        "sourceUrl": "https://fw.ky.gov/More/Documents/KAsummer16floydsfork.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Floyds Fork",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Floyd's Fork route feature",
        "url": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Fisherville Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=877",
        "provider": "local"
      },
      {
        "label": "KDFWR Cliffside Paddling Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1143",
        "provider": "local"
      },
      {
        "label": "KDFWR Floyds Fork lower-section PDF",
        "url": "https://fw.ky.gov/More/Documents/KAsummer16floydsfork.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 03298000 Floyds Fork at Fisherville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03298000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "The Parklands paddling guidance",
        "url": "https://theparklands.org/find-an-activity/paddling/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "floyds-fork-creekside-cliffside",
    "slug": "floyds-fork-creekside-cliffside",
    "name": "Floyds Fork",
    "reach": "Creekside Canoe Access to Cliffside Paddling Access",
    "aliases": [
      "Floyds Fork - Creekside to Cliffside",
      "Floyds Fork Parklands Creekside to Cliffside",
      "Floyd's Fork near-full Parklands float"
    ],
    "state": "Kentucky",
    "region": "Louisville Metro",
    "summary": "Near-full Parklands Floyds Fork route from Creekside to Cliffside. KDFWR documents the public route pieces and endpoint access records, while the lower-corridor PDF keeps Marys Island, bedrock shelves, wood, and marked-landings-only discipline explicit.",
    "statusText": "Use the Floyds Fork at Fisherville gauge. KDFWR lists 50 to 300 cfs, or 1.3 to 2.5 ft, as the corridor good band, and older Parklands/KDFWR guidance treats 35 to 500 cfs as the broader recreation range. Below that expect scraping and a longer day; above it expect faster current and fewer forgiving recovery spots.",
    "latitude": 38.2158,
    "longitude": -85.4778,
    "gaugeSource": {
      "id": "usgs-03298000",
      "provider": "usgs",
      "siteId": "03298000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Floyds Fork at Fisherville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 50,
      "idealMax": 300,
      "tooLow": 35,
      "tooHigh": 500,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Floyds Fork near Fisherville",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This near-full Parklands route is most realistic in spring through fall. Low summer flows extend the day with shoal scraping and drag points, while storm runoff quickly makes the lower bends and chutes more forceful.",
      "difficulty": "moderate",
      "difficultyNotes": "This remains Class I+ moving water with route-reading responsibility, not a casual greenway float. The long mileage, braid choices, wood, and quick water-level changes justify a moderate rating.",
      "confidenceNotes": "Confidence is high for a conservative add: KDFWR names Creekside to Fisherville at 4.3 miles, Fisherville to Cane Run at 4.2 miles, and Cane Run to Seaton Valley at 3.1 miles, while the lower Floyds Fork PDF names Seaton Valley to Broad Run Valley at 3.5 miles and Broad Run Valley to Cliffside at 2.5 miles, supporting a 17.6-mile public Creekside-to-Cliffside float. KDFWR gives source-backed coordinates for both endpoints, publishes official Fisherville low/good/high bands on the same corridor, and same-day USGS Water Services values were available during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "50-300 cfs / 1.3-2.5 ft",
        "note": "KDFWR rates Floyds Fork near Fisherville as Low below 50 cfs or 1.3 ft, Good from 50 to 300 cfs or 1.3 to 2.5 ft, and High above 300 cfs or 2.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx"
      },
      {
        "label": "Broader recreation band",
        "value": "35-500 cfs",
        "note": "A KDFWR Floyds Fork feature says the best floating levels for fishing and recreation are 35 to 500 cfs, with higher levels suited only to experienced paddlers.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx"
      },
      {
        "label": "Chained public route segment",
        "value": "Creekside Canoe Access to Cliffside Paddling Access, 17.6 miles",
        "note": "KDFWR lists Creekside Canoe Access to Fisherville Canoe Access as 4.3 miles, Fisherville Canoe Access to Cane Run Canoe Access as 4.2 miles, and Cane Run Canoe Access to Seaton Valley Paddling Access as 3.1 miles, while the lower Floyds Fork PDF lists Seaton Valley Paddling Access to Broad Run Valley Paddling Access as 3.5 miles and Broad Run Valley Paddling Access to Cliffside Paddling Access as 2.5 miles, supporting a 17.6-mile public Creekside-to-Cliffside float.",
        "sourceUrl": "https://fw.ky.gov/More/Documents/KAsummer16floydsfork.pdf"
      },
      {
        "label": "Put-in access",
        "value": "Creekside Canoe Access, 38.2158, -85.4778",
        "note": "KDFWR identifies Creekside Canoe Access as a free carry-down access at The Parklands with unpaved parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1091"
      },
      {
        "label": "Take-out access",
        "value": "Cliffside Paddling Access, 38.0864, -85.5520",
        "note": "KDFWR identifies Cliffside Paddling Access as a free carry-down site in Broad Run Park with year-round limited-hours shoreline access and no camping listed.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1143"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03298000 at 187 cfs / 1.93 ft",
        "note": "USGS Water Services returned same-day values of 187 cfs and 1.93 ft at 2026-07-09 14:20 EDT for Floyds Fork at Fisherville during this run, inside the official good band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route hazards",
        "value": "Class I+ moving water, Mary's Island split, bedrock shelves, wood",
        "note": "The lower Floyds Fork PDF says paddlers may encounter strainers, should veer left at Mary's Island, and should expect shallow bedrock rapids, braided chutes, undercut banks, and changing current through the lower Parklands section.",
        "sourceUrl": "https://fw.ky.gov/More/Documents/KAsummer16floydsfork.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Floyds Fork",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Floyd's Fork route feature",
        "url": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Creekside Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1091",
        "provider": "local"
      },
      {
        "label": "KDFWR Cliffside Paddling Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1143",
        "provider": "local"
      },
      {
        "label": "KDFWR Floyds Fork lower-section PDF",
        "url": "https://fw.ky.gov/More/Documents/KAsummer16floydsfork.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 03298000 Floyds Fork at Fisherville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03298000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "The Parklands paddling guidance",
        "url": "https://theparklands.org/find-an-activity/paddling/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "floyds-fork-cane-run-cliffside",
    "slug": "floyds-fork-cane-run-cliffside",
    "name": "Floyds Fork",
    "reach": "Cane Run Canoe Access to Cliffside Paddling Access",
    "aliases": [
      "Floyds Fork - Cane Run to Cliffside",
      "Floyds Fork Parklands Cane Run to Cliffside",
      "Floyd's Fork full lower Parklands float"
    ],
    "state": "Kentucky",
    "region": "Louisville Metro",
    "summary": "Longer lower-Parklands Floyds Fork day linking Cane Run to Cliffside. KDFWR documents the public route pieces and access records, while the lower-corridor PDF and Parklands guidance add Mary's Island, wood, and marked-landings-only cautions.",
    "statusText": "Use the Floyds Fork at Fisherville gauge. KDFWR lists 50 to 300 cfs, or 1.3 to 2.5 ft, as the corridor good band, and older Parklands/KDFWR guidance treats 35 to 500 cfs as the broader recreation range. Below that expect scraping and slow braid choices; above that expect faster current and fewer easy landings.",
    "latitude": 38.1519,
    "longitude": -85.5026,
    "gaugeSource": {
      "id": "usgs-03298000",
      "provider": "usgs",
      "siteId": "03298000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Floyds Fork at Fisherville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 50,
      "idealMax": 300,
      "tooLow": 35,
      "tooHigh": 500,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Floyds Fork near Fisherville",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This lower Parklands route is most reliable in spring through fall. Low summer flows can turn multiple shoals and bedrock steps into scrape points, while storm runoff quickly makes the lower bends, chutes, and recovery zones less forgiving.",
      "difficulty": "moderate",
      "difficultyNotes": "This remains Class I+ moving water with route-reading responsibility, not a flatwater greenway drift. The lower PDF and Parklands guidance keep the braid choices, strainers, wood, and quick water-level changes explicit enough for a moderate rating.",
      "confidenceNotes": "Confidence is high for a conservative add: KDFWR names Cane Run to Seaton Valley at 3.1 miles, the lower Floyds Fork PDF names Seaton Valley to Broad Run Valley at 3.5 miles and Broad Run Valley to Cliffside at 2.5 miles, and KDFWR access-detail pages provide source-backed coordinates for the Cane Run and Cliffside endpoints. The corridor uses direct USGS 03298000 with official Fisherville low/good/high bands, and same-day USGS Water Services values were available during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "50-300 cfs / 1.3-2.5 ft",
        "note": "KDFWR rates Floyds Fork near Fisherville as Low below 50 cfs or 1.3 ft, Good from 50 to 300 cfs or 1.3 to 2.5 ft, and High above 300 cfs or 2.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx"
      },
      {
        "label": "Broader recreation band",
        "value": "35-500 cfs",
        "note": "A KDFWR Floyds Fork feature says the best floating levels for fishing and recreation are 35 to 500 cfs, with higher levels suited only to experienced paddlers.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx"
      },
      {
        "label": "Chained public route segment",
        "value": "Cane Run Canoe Access to Cliffside Paddling Access, 9.1 miles",
        "note": "KDFWR lists Cane Run Canoe Access to Seaton Valley Paddling Access as 3.1 miles, while the lower Floyds Fork PDF lists Seaton Valley Paddling Access to Broad Run Valley Paddling Access as 3.5 miles and Broad Run Valley Paddling Access to Cliffside Paddling Access as 2.5 miles, supporting a 9.1-mile public Cane-Run-to-Cliffside float.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Cane Run Canoe Access, 38.1519, -85.5026",
        "note": "KDFWR identifies Cane Run Canoe Access as a free carry-down site off Echo Trail with unpaved parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1092"
      },
      {
        "label": "Take-out access",
        "value": "Cliffside Paddling Access, 38.0864, -85.5520",
        "note": "KDFWR identifies Cliffside Paddling Access as a free carry-down site in Broad Run Park with year-round limited-hours shoreline access and no camping listed.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1143"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03298000 at 48.7 cfs / 1.07 ft",
        "note": "USGS Water Services returned same-day values of 48.7 cfs and 1.07 ft at 2026-07-06 00:20 EDT for Floyds Fork at Fisherville during this run, just below the official cfs and stage good-band floors.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route hazards",
        "value": "Class I+ moving water, Mary's Island split, bedrock rapids, wood",
        "note": "The lower Floyds Fork PDF says paddlers may encounter strainers, should veer left at Mary's Island, and should expect shallow bedrock rapids, braided chutes, undercut banks, and changing current through the lower Parklands section.",
        "sourceUrl": "https://fw.ky.gov/More/Documents/KAsummer16floydsfork.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Floyds Fork",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Floyd's Fork route feature",
        "url": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Cane Run Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1092",
        "provider": "local"
      },
      {
        "label": "KDFWR Cliffside Paddling Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1143",
        "provider": "local"
      },
      {
        "label": "KDFWR Floyds Fork lower-section PDF",
        "url": "https://fw.ky.gov/More/Documents/KAsummer16floydsfork.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 03298000 Floyds Fork at Fisherville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03298000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "The Parklands paddling guidance",
        "url": "https://theparklands.org/find-an-activity/paddling/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "floyds-fork-north-beckley-cliffside",
    "slug": "floyds-fork-north-beckley-cliffside",
    "name": "Floyds Fork",
    "reach": "North Beckley Canoe Access to Cliffside Paddling Access",
    "aliases": [
      "Floyds Fork - North Beckley to Cliffside",
      "Floyds Fork Parklands North Beckley to Cliffside",
      "Floyd's Fork full Parklands corridor"
    ],
    "state": "Kentucky",
    "region": "Louisville Metro",
    "summary": "Full Parklands Floyds Fork corridor linking North Beckley to Cliffside. KDFWR's lower-corridor PDF publishes the exact 19.7-mile route, while the route feature and Parklands guidance keep the upper Oxbow and lower Mary's Island hazard story explicit.",
    "statusText": "Use the Floyds Fork at Fisherville gauge. KDFWR lists 50 to 300 cfs, or 1.3 to 2.5 ft, as the corridor good band, and older Parklands/KDFWR guidance treats 35 to 500 cfs as the broader recreation range. Below that expect long scraping sections and a very slow day; above that expect stronger current, fewer easy recoveries, and a committing full-corridor float.",
    "latitude": 38.2308,
    "longitude": -85.4682,
    "gaugeSource": {
      "id": "usgs-03298000",
      "provider": "usgs",
      "siteId": "03298000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Floyds Fork at Fisherville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 50,
      "idealMax": 300,
      "tooLow": 35,
      "tooHigh": 500,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Floyds Fork near Fisherville",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This full-corridor Parklands route is most realistic in spring through fall. Low summer flows can turn the mileage into an all-day scrape, while storm runoff quickly makes the upper braid choices, middle bends, and lower chutes more forceful.",
      "difficulty": "moderate",
      "difficultyNotes": "This remains Class I+ moving water, but the route length and moving-water decision count justify a moderate rating. KDFWR and The Parklands keep the braid choices, wood, quick level changes, and marked-landings-only discipline explicit enough that this should not be treated like a casual greenway drift.",
      "confidenceNotes": "Confidence is high for a conservative add: the lower Floyds Fork PDF publishes North Beckley to Cliffside as a 19.7-mile recommended route, KDFWR access-detail pages provide source-backed coordinates for both endpoints, and the corridor uses direct USGS 03298000 with official Fisherville low/good/high bands. Same-day USGS Water Services values were available during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "50-300 cfs / 1.3-2.5 ft",
        "note": "KDFWR rates Floyds Fork near Fisherville as Low below 50 cfs or 1.3 ft, Good from 50 to 300 cfs or 1.3 to 2.5 ft, and High above 300 cfs or 2.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx"
      },
      {
        "label": "Broader recreation band",
        "value": "35-500 cfs",
        "note": "A KDFWR Floyds Fork feature says the best floating levels for fishing and recreation are 35 to 500 cfs, with higher levels suited only to experienced paddlers.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx"
      },
      {
        "label": "Chained public route segment",
        "value": "North Beckley Canoe Access to Cliffside Paddling Access, 19.7 miles",
        "note": "The KDFWR lower Floyds Fork PDF lists North Beckley to Cliffside as a 19.7-mile recommended route and also publishes the shorter public route pieces that make up the same corridor.",
        "sourceUrl": "https://fw.ky.gov/More/Documents/KAsummer16floydsfork.pdf"
      },
      {
        "label": "Put-in access",
        "value": "North Beckley Canoe Access, 38.2308, -85.4682",
        "note": "KDFWR identifies North Beckley Canoe Access as a free carry-down site in Beckley Creek Park with limited-hours shoreline access and unpaved parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=876"
      },
      {
        "label": "Take-out access",
        "value": "Cliffside Paddling Access, 38.0864, -85.5520",
        "note": "KDFWR identifies Cliffside Paddling Access as a free carry-down site in Broad Run Park with year-round limited-hours shoreline access and no camping listed.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1143"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03298000 at 43.6 cfs / 1.02 ft",
        "note": "USGS current conditions showed same-day values of 43.6 cfs and 1.02 ft at 2026-07-06 07:20 EDT for Floyds Fork at Fisherville during this run, below the official good-band floor.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route hazards",
        "value": "Class I+ moving water, Oxbow and Mary's Island braid choices, wood",
        "note": "KDFWR's route feature says to stay in the main current around The Oxbow and expect dragging through braided summer chutes, while the lower Floyds Fork PDF says to veer left at Mary's Island and expect shallow bedrock rapids, undercut banks, strainers, and changing current through the lower Parklands corridor.",
        "sourceUrl": "https://fw.ky.gov/More/Documents/KAsummer16floydsfork.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Floyds Fork",
        "url": "https://fw.ky.gov/Fish/Pages/floyds-fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Floyd's Fork route feature",
        "url": "https://fw.ky.gov/Education/Pages/Floyd%27s-Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR North Beckley Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=876",
        "provider": "local"
      },
      {
        "label": "KDFWR Cliffside Paddling Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1143",
        "provider": "local"
      },
      {
        "label": "KDFWR Floyds Fork lower-section PDF",
        "url": "https://fw.ky.gov/More/Documents/KAsummer16floydsfork.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 03298000 Floyds Fork at Fisherville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03298000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03298000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03298000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "The Parklands paddling guidance",
        "url": "https://theparklands.org/find-an-activity/paddling/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "slate-creek-lions-club-old-slate-furnace",
    "slug": "slate-creek-lions-club-old-slate-furnace",
    "name": "Slate Creek",
    "reach": "Lions Club Park to Old Slate Furnace Park",
    "aliases": [
      "Slate Creek - Lions Club Park to Old Slate Furnace Park",
      "Slate Creek - Owingsville to Bourbon Furnace",
      "KDFWR Slate Creek Blue Water Trail"
    ],
    "state": "Kentucky",
    "region": "Northeastern Kentucky",
    "summary": "Short Bath County half-day float from the Owingsville Lions Club access to Old Slate Furnace Park. KDFWR documents the public carry-down endpoints, 3.7-mile mileage, and official Slate Creek flow band, but this shallow creek needs enough water and a conservative low-head-dam check at the start.",
    "statusText": "Use the Slate Creek at Highway 713 near Mt. Sterling gauge. KDFWR rates 100 to 200 cfs as good for boating and fishing from Howards Mill downstream to the Licking River. Below 100 cfs, expect shallow rock bars and dragging; above 200 cfs, treat the creek as high and more pushy.",
    "latitude": 38.1305,
    "longitude": -83.7665,
    "gaugeSource": {
      "id": "usgs-03250190",
      "provider": "usgs",
      "siteId": "03250190",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Slate Creek at Highway 713 near Mt. Sterling, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03250190/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "low_head_dam",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Use the KDFWR-listed carry-down access below the Lions Club Park low-head dam; do not launch above the dam for this route.",
        "Stay away from low-head-dam hydraulics and boils near Lions Club Park, especially at high or stained water.",
        "Small-creek wood, strainers, quick rain response, and private-bank limits require current access and flow checks."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 100,
      "idealMax": 200,
      "tooLow": 100,
      "tooHigh": 200,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Slate Creek downstream of Howards Mill",
        "url": "https://fw.ky.gov/Fish/pages/slate-creek.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "KDFWR describes Slate Creek as shallow with abundant rock bars, so spring rain and recent storms matter. The creek can drag below the official good band and can rise into fast, woody, dam-influenced water after heavy rain.",
      "difficulty": "easy",
      "difficultyNotes": "This is a short half-day Blue Water Trail segment at normal levels, but the put-in sits near a low-head dam and the creek has shallow rock bars, wood, and private-bank limits. Treat it as easy only when the gauge is in range and stable.",
      "confidenceNotes": "Confidence is high for a conservative Kentucky add: KDFWR lists Lions Club Park to Old Slate Furnace Park as a 3.7-mile Slate Creek segment, publishes carry-down access records and coordinates for both endpoints, links the corridor to USGS 03250190, and gives official Low/Good/High cfs bands for Howards Mill downstream to the Licking River. Official USGS legacy evidence showed May 31, 2026 instantaneous discharge and gage-height values during this run, clearing the live-gauge blocker that previously held this candidate back."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "100-200 cfs",
        "note": "KDFWR rates Slate Creek from Howards Mill downstream to the Licking River as Low below 100 cfs, Good from 100 to 200 cfs, and High above 200 cfs.",
        "sourceUrl": "https://fw.ky.gov/Fish/pages/slate-creek.aspx"
      },
      {
        "label": "Official route segment",
        "value": "Lions Club Park to Old Slate Furnace Park, 3.7 miles",
        "note": "KDFWR lists Lions Club Park to Old Slate Furnace Park as a 3.7-mile public-access segment on Slate Creek.",
        "sourceUrl": "https://fw.ky.gov/Fish/pages/slate-creek.aspx"
      },
      {
        "label": "Blue Water Trail context",
        "value": "Excellent half-day float",
        "note": "KDFWR Blue Water Trails describes the Lions Club access-to-Old Slate Furnace Park float as nearly four miles with a quick shuttle, ending at the park on river right just below Mill Creek.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Slate-Creek.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Lions Club Park, 38.1305, -83.7665",
        "note": "KDFWR identifies Slate Creek - Lions Club as a free carry-down site with unpaved parking, year-round 24-hour boat-ramp availability, and a dam note for the creek here.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=39"
      },
      {
        "label": "Take-out access",
        "value": "Old Slate Furnace Park, 38.1148, -83.7475",
        "note": "KDFWR identifies Slate Creek - Old Slate Furnace as a free carry-down site with unpaved parking, picnic-area availability, and a canoe/kayak launch suitable for carry-down use.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=38"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03250190",
        "note": "The official USGS legacy current-conditions page showed May 31, 2026 instantaneous discharge and gage-height values for Slate Creek at Highway 713 near Mt. Sterling during this run.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=03250190"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Slate Creek",
        "url": "https://fw.ky.gov/Fish/pages/slate-creek.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Blue Water Trails Slate Creek",
        "url": "https://fw.ky.gov/Education/Pages/Slate-Creek.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Lions Club access detail",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=39",
        "provider": "local"
      },
      {
        "label": "KDFWR Old Slate Furnace access detail",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=38",
        "provider": "local"
      },
      {
        "label": "USGS 03250190 Slate Creek at Highway 713 near Mt. Sterling",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03250190/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03250190 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=03250190",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "levisa-fork-jubilee-island-creek",
    "slug": "levisa-fork-jubilee-island-creek",
    "name": "Levisa Fork",
    "reach": "Jubilee Christian Church Ramp to Island Creek Ramp",
    "aliases": [
      "Levisa Fork - Jubilee to Island Creek",
      "Hatfield-McCoy River Trail upper float",
      "KDFWR Levisa Fork Blue Water Trail"
    ],
    "state": "Kentucky",
    "region": "Eastern Kentucky",
    "summary": "Short Pikeville half-day float from Jubilee Christian Church Ramp to Island Creek Ramp. KDFWR documents the public access pair, 3.8-mile Blue Water Trail split, and official Pikeville gauge bands, while the education page frames this upper Hatfield-McCoy River Trail reach as family-friendly moving water.",
    "statusText": "Use the Levisa Fork at Pikeville gauge. KDFWR rates 800 to 1,400 cfs, or 7.4 to 8.5 ft, as good for boating and fishing. Below that is low; above that is high and swift current or woody debris can make the river inappropriate for casual paddling.",
    "latitude": 37.4445,
    "longitude": -82.5057,
    "gaugeSource": {
      "id": "usgs-03209500",
      "provider": "usgs",
      "siteId": "03209500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Levisa Fork at Pikeville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03209500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 800,
      "idealMax": 1400,
      "tooLow": 800,
      "tooHigh": 1400,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Levisa Fork at Pikeville",
        "url": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "KDFWR says the Levisa Fork near Pikeville benefits from Russell Fork inflow and Fishtrap Lake releases, which support more dependable summer flow than many eastern Kentucky streams. Storms and release changes can still raise current and move fresh wood into the channel.",
      "difficulty": "easy",
      "difficultyNotes": "KDFWR describes the Levisa Fork as gentle riffles and flowing shoals that are suitable for families and beginners at normal levels. This remains moving water rather than flatwater, especially when the river approaches or exceeds the high band.",
      "confidenceNotes": "Confidence is high for a conservative Kentucky restore: KDFWR still publishes the official Pikeville gauge bands on the Fish page, provides exact access coordinates for Jubilee Christian Church Ramp and Island Creek Ramp on the access-detail pages, and the Blue Water Trail map plus education article identify Jubilee-to-Island Creek as a 3.8-mile half-day float. Current USGS Water Services returned same-day discharge and stage of 615 cfs at 2026-07-14 13:30 EDT and 7.42 ft at 2026-07-14 14:00 EDT, which keeps the route below the official good discharge band but right at the stage floor for a low-water caution framing."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "800-1,400 cfs / 7.4-8.5 ft",
        "note": "KDFWR rates Levisa Fork at Pikeville as Low below 800 cfs or 7.4 ft, Good from 800 to 1,400 cfs or 7.4 to 8.5 ft, and High above 1,400 cfs or 8.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx"
      },
      {
        "label": "Official route segment",
        "value": "Jubilee Christian Church Ramp to Island Creek Ramp, 3.8 miles",
        "note": "The KDFWR Blue Water Trail map lists Jubilee Christian Church Ramp to Island Creek Ramp as a 3.8-mile ramp-to-ramp split, and the Levisa Fork education page describes it as a leisurely half-day float.",
        "sourceUrl": "https://fw.ky.gov/Education/Documents/bluewatertraillevisafork.pdf"
      },
      {
        "label": "Put-in access",
        "value": "Jubilee Christian Church Canoe Access, 37.4445, -82.5057",
        "note": "KDFWR identifies Jubilee Christian Church Canoe Access as a carry-down site with paved parking nearby and notes that paddlers should ask permission before using the church lot.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1013"
      },
      {
        "label": "Take-out access",
        "value": "Island Creek Canoe Access, 37.4646, -82.5284",
        "note": "KDFWR identifies Island Creek Canoe Access as a carry-down site behind the South Mayo Trail commercial corridor with unpaved parking and no amenities.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1012"
      },
      {
        "label": "Route character",
        "value": "Gentle riffles, deep pools, flowing shoals",
        "note": "The Levisa Fork education page says the first float from Jubilee Christian Church to Island Creek moves through an intimate gorge with gentle riffles, deep pools, and flowing shoals, making it suitable for families and beginners at normal levels.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Levisa-Fork.aspx"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03209500 at 615 cfs / 7.42 ft",
        "note": "USGS Water Services returned same-day values of 615 cfs at 2026-07-14 13:30 EDT and 7.42 ft at 2026-07-14 14:00 EDT for Levisa Fork at Pikeville during this run, below the official good discharge band but just above the official stage floor.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03209500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping posture",
        "value": "No public camping documented at either endpoint",
        "note": "Current KDFWR access-detail pages list Camping as None for both Jubilee Christian Church Canoe Access and Island Creek Canoe Access.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1013"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Levisa Fork",
        "url": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Levisa Fork education page",
        "url": "https://fw.ky.gov/Education/Pages/Levisa-Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Levisa Fork detailed map",
        "url": "https://fw.ky.gov/Education/Documents/bluewatertraillevisafork.pdf",
        "provider": "local"
      },
      {
        "label": "KDFWR Jubilee Christian Church Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1013",
        "provider": "local"
      },
      {
        "label": "KDFWR Island Creek Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1012",
        "provider": "local"
      },
      {
        "label": "USGS 03209500 Levisa Fork at Pikeville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03209500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03209500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03209500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "levisa-fork-island-creek-cedar-creek",
    "slug": "levisa-fork-island-creek-cedar-creek",
    "name": "Levisa Fork",
    "reach": "Island Creek Ramp to Cedar Creek Canoe Access",
    "aliases": [
      "Levisa Fork - Island Creek to Cedar Creek",
      "Hatfield-McCoy River Trail - Island Creek to Cedar Creek",
      "Pikeville Levisa continuation float"
    ],
    "state": "Kentucky",
    "region": "Eastern Kentucky",
    "summary": "Very short Pikeville Levisa Fork float from Island Creek Ramp to Cedar Creek Canoe Access. Current KDFWR Levisa Fork materials still support the Island Creek-to-Cedar access pair with official Pikeville gauge bands tied to direct USGS data.",
    "statusText": "Use the Levisa Fork at Pikeville gauge. KDFWR rates 800 to 1,400 cfs, or 7.4 to 8.5 ft, as good for boating and fishing. Below that is low and likely shallow; above that is high and faster around wood, bridge current, and busy urban banks.",
    "latitude": 37.4646,
    "longitude": -82.5284,
    "gaugeSource": {
      "id": "usgs-03209500",
      "provider": "usgs",
      "siteId": "03209500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Levisa Fork at Pikeville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03209500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 800,
      "idealMax": 1400,
      "tooLow": 800,
      "tooHigh": 1400,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Levisa Fork at Pikeville",
        "url": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "KDFWR treats the Pikeville gauge as the planning reference for this corridor. Spring through fall is practical, but low summer water can expose shoals while rain, releases, and tributary inflow can raise current quickly.",
      "difficulty": "easy",
      "difficultyNotes": "KDFWR describes this Pikeville corridor as a warmwater public-access float, but it is still moving water with shoals, bridge current, wood, and urban corridor distractions. Treat it as easy only when the Pikeville gauge is stable in range.",
      "confidenceNotes": "Confidence is high for a conservative Kentucky restore: current KDFWR Levisa Fork materials still support the Island Creek Ramp to Cedar Creek Canoe Access corridor, provide exact endpoint coordinates and public-access descriptions, and tie the reach to direct USGS gauge 03209500 with official Pikeville Low/Good/High bands. USGS Water Services returned same-day discharge and stage during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "800-1400 cfs / 7.4-8.5 ft",
        "note": "KDFWR rates Levisa Fork at Pikeville as Low below 800 cfs or 7.4 ft, Good from 800 to 1400 cfs or 7.4 to 8.5 ft, and High above 1400 cfs or 8.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx"
      },
      {
        "label": "Official route chain",
        "value": "Island Creek Ramp to Cedar Creek Canoe Access, about 1.5 miles",
        "note": "The current KDFWR Levisa Fork map and access chain still place Island Creek just upstream of Cedar Creek, supporting the short public Pikeville continuation.",
        "sourceUrl": "https://fw.ky.gov/Education/Documents/bluewatertraillevisafork.pdf"
      },
      {
        "label": "Put-in access",
        "value": "Island Creek Ramp, 37.4646, -82.5284",
        "note": "KDFWR identifies Island Creek Ramp as a free carry-down access behind the South Mayo Trail corridor with unpaved parking and no amenities.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1012"
      },
      {
        "label": "Take-out access",
        "value": "Cedar Creek Canoe Access, 37.4802, -82.5446",
        "note": "KDFWR identifies Cedar Creek Canoe Access as a free carry-down access under the KY 1384 bridge with unpaved parking and no amenities.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1011"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03209500",
        "note": "USGS Water Services returned same-day values of 628 cfs at 2026-07-14 10:30 EDT and 7.46 ft at 2026-07-14 11:00 EDT for Levisa Fork at Pikeville, still below the official good discharge band but just inside the official stage band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03209500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Urban warmwater corridor with shoals",
        "note": "KDFWR frames the Pikeville Levisa Fork as a public-access paddling and fishing corridor where gauge timing, shoals, and urban-side access behavior matter.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Levisa Fork",
        "url": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Levisa Fork detailed map",
        "url": "https://fw.ky.gov/Education/Documents/bluewatertraillevisafork.pdf",
        "provider": "local"
      },
      {
        "label": "KDFWR Island Creek Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1012",
        "provider": "local"
      },
      {
        "label": "KDFWR Cedar Creek Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1011",
        "provider": "local"
      },
      {
        "label": "USGS 03209500 Levisa Fork at Pikeville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03209500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03209500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03209500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "levisa-fork-cedar-creek-thompson-road",
    "slug": "levisa-fork-cedar-creek-thompson-road",
    "name": "Levisa Fork",
    "reach": "Cedar Creek Ramp to Thompson Road Ramp",
    "aliases": [
      "Levisa Fork - Cedar Creek to Thompson Road",
      "Hatfield-McCoy River Trail - Cedar Creek to Thompson Road",
      "Pikeville Cut-Through float"
    ],
    "state": "Kentucky",
    "region": "Eastern Kentucky",
    "summary": "Short Pikeville day float through the Hatfield-McCoy River Trail corridor. KDFWR documents both public access ramps, the 3-mile segment, and official Pikeville gauge bands, but the route still needs same-day judgment around woody debris and dam-release changes.",
    "statusText": "Use the Levisa Fork at Pikeville gauge. KDFWR rates 800 to 1,400 cfs, or 7.4 to 8.5 ft, as good for boating and fishing. Below that is low; above that is high and swift current or woody debris can make the river inappropriate for casual paddling.",
    "latitude": 37.4802,
    "longitude": -82.5446,
    "gaugeSource": {
      "id": "usgs-03209500",
      "provider": "usgs",
      "siteId": "03209500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Levisa Fork at Pikeville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03209500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 800,
      "idealMax": 1400,
      "tooLow": 800,
      "tooHigh": 1400,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Levisa Fork at Pikeville",
        "url": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "KDFWR says the Pikeville reach has dependable flow from Fishtrap Lake releases and Russell Fork inflow, but high water, releases, and storms can still add swift current, fresh wood, and harder landings.",
      "difficulty": "easy",
      "difficultyNotes": "KDFWR and Visit Pikeville frame the Hatfield-McCoy River Trail as gentle Class I water suitable for beginners at normal levels. It becomes a more serious moving-water route above the KDFWR good band or after rain.",
      "confidenceNotes": "Confidence is high for this short segment: KDFWR publishes the Cedar Creek-to-Thompson Road mileage, official access descriptions and coordinates for both endpoints, and a two-sided Pikeville gauge band. Same-day live confirmation is slightly indirect because the USGS inventory page is stale, but RiverApp showed May 31 values and states that this station imports from USGS Water Services, the same product path used by the app."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "800-1,400 cfs / 7.4-8.5 ft",
        "note": "KDFWR rates Levisa Fork at Pikeville as Low below 800 cfs or 7.4 ft, Good from 800 to 1,400 cfs or 7.4 to 8.5 ft, and High above 1,400 cfs or 8.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx"
      },
      {
        "label": "Official route segment",
        "value": "Cedar Creek Ramp to Thompson Road Ramp, 3.0 miles",
        "note": "KDFWR lists Cedar Creek Ramp to Thompson Road Ramp as a 3.0-mile public-access segment on the Levisa Fork access mileage table.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Cedar Creek Canoe Access, 37.4802, -82.5446",
        "note": "KDFWR identifies Cedar Creek Canoe Access under the KY-1384 bridge in Pikeville as a free carry-down site with unpaved parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1011"
      },
      {
        "label": "Take-out access",
        "value": "Thompson Road Canoe Access, 37.5096, -82.5435",
        "note": "KDFWR identifies Thompson Road Canoe Access as a free single-lane ramp with year-round 24-hour boat-ramp availability and published coordinates.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1010"
      },
      {
        "label": "Route character",
        "value": "Class I beginner-friendly at normal levels",
        "note": "Visit Pikeville describes the Hatfield-McCoy River Trail trip through the Pikeville Cut-Through as Class I water suitable for beginners and families.",
        "sourceUrl": "https://visitpikeville.com/packages/hatfield-mccoy-river-trail/"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03209500",
        "note": "RiverApp showed same-day May 31, 2026 Pikeville readings and says values for this station are imported from USGS Water Services. The official USGS inventory page remains stale, so this route keeps that caveat visible.",
        "sourceUrl": "https://www.riverapp.net/en/station/5452aa01e4b07179033c7664"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Levisa Fork",
        "url": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Cedar Creek Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1011",
        "provider": "local"
      },
      {
        "label": "KDFWR Thompson Road Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1010",
        "provider": "local"
      },
      {
        "label": "USGS 03209500 Levisa Fork at Pikeville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03209500/",
        "provider": "usgs"
      },
      {
        "label": "RiverApp Levisa Fork at Pikeville",
        "url": "https://www.riverapp.net/en/station/5452aa01e4b07179033c7664",
        "provider": "local"
      },
      {
        "label": "Visit Pikeville Hatfield-McCoy River Trail",
        "url": "https://visitpikeville.com/packages/hatfield-mccoy-river-trail/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "levisa-fork-jubilee-cedar-creek",
    "slug": "levisa-fork-jubilee-cedar-creek",
    "name": "Levisa Fork",
    "reach": "Jubilee Christian Church Ramp to Cedar Creek Canoe Access",
    "aliases": [
      "Levisa Fork - Jubilee to Cedar Creek",
      "Hatfield-McCoy River Trail - Jubilee to Cedar Creek",
      "Pikeville upper-to-cut-through float"
    ],
    "state": "Kentucky",
    "region": "Eastern Kentucky",
    "summary": "Moderate Pikeville Levisa Fork float from Jubilee Christian Church Ramp to Cedar Creek Canoe Access. KDFWR still lists this public 5.5-mile access pair directly, with official Pikeville gauge bands and source-backed endpoint coordinates at both ramps.",
    "statusText": "Use the Levisa Fork at Pikeville gauge. KDFWR rates 800 to 1,400 cfs, or 7.4 to 8.5 ft, as good for boating and fishing. Below that is low and slower with more exposed shoals; above that is high and faster around wood, bridges, and urban banks.",
    "latitude": 37.4445,
    "longitude": -82.5057,
    "gaugeSource": {
      "id": "usgs-03209500",
      "provider": "usgs",
      "siteId": "03209500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Levisa Fork at Pikeville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03209500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 800,
      "idealMax": 1400,
      "tooLow": 800,
      "tooHigh": 1400,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Levisa Fork at Pikeville",
        "url": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "KDFWR says the Levisa Fork through Pikeville benefits from Russell Fork inflow and Fishtrap Lake releases, which can help summer flow but also change current after rain or release shifts.",
      "difficulty": "easy",
      "difficultyNotes": "KDFWR frames the Pikeville Levisa Fork as a family-friendly moving-water corridor with gentle riffles, shoals, and deep pools at normal levels. The longer Jubilee-to-Cedar combination still deserves moving-water judgment around wood and bridge current.",
      "confidenceNotes": "Confidence is high for a conservative Kentucky restore: KDFWR still publishes the direct Jubilee-to-Cedar 5.5-mile route, official Pikeville Low/Good/High bands, and current public-access descriptions for both endpoints. USGS Water Services returned same-day discharge and stage during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "800-1,400 cfs / 7.4-8.5 ft",
        "note": "KDFWR rates Levisa Fork at Pikeville as Low below 800 cfs or 7.4 ft, Good from 800 to 1,400 cfs or 7.4 to 8.5 ft, and High above 1,400 cfs or 8.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx"
      },
      {
        "label": "Official route segment",
        "value": "Jubilee Christian Church Ramp to Cedar Creek Ramp, 5.5 miles",
        "note": "The current KDFWR Levisa Fork mileage table lists Jubilee Christian Church Ramp to Cedar Creek Ramp directly as a 5.5-mile public route.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Jubilee Christian Church Canoe Access, 37.4445, -82.5057",
        "note": "KDFWR identifies Jubilee Christian Church Canoe Access as a free carry-down site with limited parking and notes that paddlers should ask permission before using the church paved lot.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1013"
      },
      {
        "label": "Take-out access",
        "value": "Cedar Creek Canoe Access, 37.4802, -82.5446",
        "note": "KDFWR identifies Cedar Creek Canoe Access as a free carry-down site under the KY 1384 bridge with unpaved parking and no amenities.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1011"
      },
      {
        "label": "Route character",
        "value": "Gentle riffles, deep pools, flowing shoals",
        "note": "The KDFWR Levisa Fork education page describes the Pikeville corridor as an intimate gorge with gentle riffles, deep pools, and flowing shoals that can be extended downstream toward Cedar Creek.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Levisa-Fork.aspx"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03209500",
        "note": "USGS Water Services returned 628 cfs at 2026-07-14 10:30 EDT and 7.46 ft at 2026-07-14 11:00 EDT for Levisa Fork at Pikeville, still below the official good discharge band but just inside the official stage band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03209500&parameterCd=00060,00065&siteStatus=all"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Levisa Fork",
        "url": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Levisa Fork education page",
        "url": "https://fw.ky.gov/Education/Pages/Levisa-Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Levisa Fork detailed map",
        "url": "https://fw.ky.gov/Education/Documents/bluewatertraillevisafork.pdf",
        "provider": "local"
      },
      {
        "label": "KDFWR Jubilee Christian Church Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1013",
        "provider": "local"
      },
      {
        "label": "KDFWR Cedar Creek Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1011",
        "provider": "local"
      },
      {
        "label": "USGS 03209500 Levisa Fork at Pikeville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03209500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03209500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03209500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "levisa-fork-island-creek-thompson-road",
    "slug": "levisa-fork-island-creek-thompson-road",
    "name": "Levisa Fork",
    "reach": "Island Creek Ramp to Thompson Road Ramp",
    "aliases": [
      "Levisa Fork - Island Creek to Thompson Road",
      "Hatfield-McCoy River Trail - Island Creek to Thompson Road",
      "Pikeville Cut-Through extended float"
    ],
    "state": "Kentucky",
    "region": "Eastern Kentucky",
    "summary": "Short-to-moderate Pikeville Levisa Fork float from Island Creek Ramp to Thompson Road Ramp. Current KDFWR Levisa Fork materials still support the Island Creek-to-Cedar and Cedar-to-Thompson access chain on the same direct Pikeville gauge.",
    "statusText": "Use the Levisa Fork at Pikeville gauge. KDFWR rates 800 to 1,400 cfs, or 7.4 to 8.5 ft, as good for boating and fishing. Below that expect slower shoals and more dragging; above that expect faster current around wood, bridges, and busy urban banks.",
    "latitude": 37.4646,
    "longitude": -82.5284,
    "gaugeSource": {
      "id": "usgs-03209500",
      "provider": "usgs",
      "siteId": "03209500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Levisa Fork at Pikeville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03209500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 800,
      "idealMax": 1400,
      "tooLow": 800,
      "tooHigh": 1400,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Levisa Fork at Pikeville",
        "url": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "The Pikeville gauge remains the planning reference through this Hatfield-McCoy River Trail corridor. Fishtrap Lake releases, Russell Fork inflow, and storms can change current faster than the easy mileage suggests.",
      "difficulty": "easy",
      "difficultyNotes": "KDFWR and Pikeville route materials frame this corridor as beginner-friendly at normal levels, but the longer Island-to-Thompson combination still includes bridge current, woody debris, and a more committed urban finish.",
      "confidenceNotes": "Confidence is high for a conservative Kentucky restore: current KDFWR Levisa Fork materials still support the Island Creek-to-Cedar segment and the Cedar-to-Thompson segment, exact endpoint coordinates, and the official Pikeville gauge ladder. USGS Water Services returned same-day discharge and stage during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "800-1,400 cfs / 7.4-8.5 ft",
        "note": "KDFWR rates Levisa Fork at Pikeville as Low below 800 cfs or 7.4 ft, Good from 800 to 1,400 cfs or 7.4 to 8.5 ft, and High above 1,400 cfs or 8.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx"
      },
      {
        "label": "Official route chain",
        "value": "Island Creek Ramp to Cedar Creek Ramp about 1.5 miles plus Cedar Creek Ramp to Thompson Road Ramp 3.0 miles",
        "note": "Current KDFWR Levisa Fork materials still support both linked public segments, supporting an about 4.5-mile Island Creek to Thompson Road continuation on the same river and gauge.",
        "sourceUrl": "https://fw.ky.gov/Education/Documents/bluewatertraillevisafork.pdf"
      },
      {
        "label": "Put-in access",
        "value": "Island Creek Ramp, 37.4646, -82.5284",
        "note": "KDFWR identifies Island Creek Ramp as a free carry-down access behind the South Mayo Trail corridor with unpaved parking and no amenities.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1012"
      },
      {
        "label": "Take-out access",
        "value": "Thompson Road Canoe Access, 37.5096, -82.5435",
        "note": "KDFWR identifies Thompson Road Canoe Access as a free single-lane ramp with year-round 24-hour availability and published coordinates.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1010"
      },
      {
        "label": "Route character",
        "value": "Pikeville Cut-Through public float",
        "note": "The KDFWR education page says paddlers can extend past Cedar Creek to the lower Thompson Road take-out after passing through the Pikeville Cut-Through section.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Levisa-Fork.aspx"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03209500",
        "note": "USGS Water Services returned 628 cfs at 2026-07-14 10:30 EDT and 7.46 ft at 2026-07-14 11:00 EDT for Levisa Fork at Pikeville, still below the official good discharge band but just inside the official stage band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03209500&parameterCd=00060,00065&siteStatus=all"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Levisa Fork",
        "url": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Levisa Fork education page",
        "url": "https://fw.ky.gov/Education/Pages/Levisa-Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Levisa Fork detailed map",
        "url": "https://fw.ky.gov/Education/Documents/bluewatertraillevisafork.pdf",
        "provider": "local"
      },
      {
        "label": "KDFWR Island Creek Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1012",
        "provider": "local"
      },
      {
        "label": "KDFWR Cedar Creek Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1011",
        "provider": "local"
      },
      {
        "label": "KDFWR Thompson Road Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1010",
        "provider": "local"
      },
      {
        "label": "USGS 03209500 Levisa Fork at Pikeville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03209500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03209500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03209500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "levisa-fork-jubilee-thompson-road",
    "slug": "levisa-fork-jubilee-thompson-road",
    "name": "Levisa Fork",
    "reach": "Jubilee Christian Church Ramp to Thompson Road Ramp",
    "aliases": [
      "Levisa Fork - Jubilee to Thompson Road",
      "Hatfield-McCoy River Trail Pikeville access-planner corridor",
      "Pikeville Jubilee to Thompson planner route"
    ],
    "state": "Kentucky",
    "region": "Eastern Kentucky",
    "summary": "Canonical longer Pikeville Levisa Fork day from Jubilee Christian Church Ramp to Thompson Road Ramp. KDFWR now lists Jubilee-to-Cedar as 5.5 miles and Cedar-to-Thompson as 3.0 miles, and this slug keeps the intermediate public access planner on the direct Pikeville gauge instead of shipping every in-between permutation as its own route.",
    "statusText": "Use the Levisa Fork at Pikeville gauge. KDFWR rates 800 to 1,400 cfs, or 7.4 to 8.5 ft, as good for boating and fishing. Below that expect a slower, shoalier all-day float; above that swift current, wood, and the longer mileage become much less forgiving.",
    "latitude": 37.4445,
    "longitude": -82.5057,
    "gaugeSource": {
      "id": "usgs-03209500",
      "provider": "usgs",
      "siteId": "03209500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Levisa Fork at Pikeville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03209500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 800,
      "idealMax": 1400,
      "tooLow": 800,
      "tooHigh": 1400,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Levisa Fork at Pikeville",
        "url": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "KDFWR says the Pikeville Levisa corridor gets more dependable summer water from Russell Fork inflow and Fishtrap Lake releases, but the longer Jubilee-to-Thompson plan still deserves a same-day check for rain, release changes, and fresh wood.",
      "difficulty": "easy",
      "difficultyNotes": "The current KDFWR Levisa pages still frame this as a beginner-friendly moving-water corridor at normal levels, but the full Jubilee-to-Thompson combination is a longer commitment with more cumulative shoals, bridge current, and fatigue than the shorter Pikeville slugs.",
      "confidenceNotes": "Confidence is high for a conservative Kentucky add: KDFWR publishes the direct Jubilee-to-Cedar 5.5-mile route plus the Cedar-to-Thompson 3.0-mile continuation, exact endpoint coordinates, and the official Pikeville gauge ladder. USGS Water Services returned same-day discharge and stage during this run, both below the official good band."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "800-1,400 cfs / 7.4-8.5 ft",
        "note": "KDFWR rates Levisa Fork at Pikeville as Low below 800 cfs or 7.4 ft, Good from 800 to 1,400 cfs or 7.4 to 8.5 ft, and High above 1,400 cfs or 8.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx"
      },
      {
        "label": "Official route chain",
        "value": "Jubilee Christian Church Ramp to Cedar Creek Ramp 5.5 miles plus Cedar Creek Ramp to Thompson Road Ramp 3.0 miles",
        "note": "The current KDFWR Levisa Fork mileage table publishes both linked public segments, supporting an about 8.5-mile Jubilee to Thompson Road route on the same corridor and gauge.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx"
      },
      {
        "label": "Planner model",
        "value": "Canonical Pikeville corridor with intermediate public accesses",
        "note": "This slug keeps Jubilee as the upstream launch and Thompson Road as the downstream finish while the trip details preserve Island Creek and Cedar Creek as named public mid-route options, avoiding redundant one-gauge Pikeville permutations.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Jubilee Christian Church Canoe Access, 37.4445, -82.5057",
        "note": "KDFWR identifies Jubilee Christian Church Canoe Access as a free carry-down site with limited parking and notes that paddlers should ask permission before using the church paved lot.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1013"
      },
      {
        "label": "Take-out access",
        "value": "Thompson Road Canoe Access, 37.5096, -82.5435",
        "note": "KDFWR identifies Thompson Road Canoe Access as a free single-lane ramp with year-round 24-hour availability, published coordinates, and a larger parking area.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1010"
      },
      {
        "label": "Route character",
        "value": "Longer Pikeville gorge and Cut-Through float",
        "note": "The KDFWR education page describes the upper Pikeville float as gentle riffles, deep pools, and flowing shoals and says paddlers may continue beyond Cedar Creek to the lower Thompson Road take-out.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Levisa-Fork.aspx"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03209500",
        "note": "USGS Water Services returned 279 cfs at 2026-07-02 23:30 EDT and 6.32 ft at 2026-07-03 00:00 EDT for Levisa Fork at Pikeville, below the official good band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03209500&parameterCd=00060,00065&siteStatus=all"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Levisa Fork",
        "url": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Levisa Fork education page",
        "url": "https://fw.ky.gov/Education/Pages/Levisa-Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Levisa Fork detailed map",
        "url": "https://fw.ky.gov/Education/Documents/bluewatertraillevisafork.pdf",
        "provider": "local"
      },
      {
        "label": "KDFWR Jubilee Christian Church Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1013",
        "provider": "local"
      },
      {
        "label": "KDFWR Thompson Road Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1010",
        "provider": "local"
      },
      {
        "label": "USGS 03209500 Levisa Fork at Pikeville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03209500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03209500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03209500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "levisa-fork-prestonsburg-airport",
    "slug": "levisa-fork-prestonsburg-airport",
    "name": "Levisa Fork",
    "reach": "Prestonsburg Ramp to Airport Ramp",
    "aliases": [
      "Levisa Fork - Prestonsburg to Airport Ramp",
      "Lower Levisa Fork - Prestonsburg to Airport",
      "KDFWR Levisa Fork lower section one"
    ],
    "state": "Kentucky",
    "region": "Eastern Kentucky",
    "summary": "Broad lower-Levisa day float from Prestonsburg Ramp to Airport Ramp. KDFWR still lists the public 8.2-mile segment directly, publishes a separate Prestonsburg gauge band for this downstream corridor, and keeps both endpoints on source-backed public ramps.",
    "statusText": "Use the Levisa Fork at Prestonsburg gauge. KDFWR rates 800 to 1,500 cfs, or 3.5 to 5.0 ft, as good for boating and fishing. Below that is low and slower over shoals; above that is high and the larger mainstem current gets pushier around wood, bridge piers, and outside bends.",
    "latitude": 37.6663,
    "longitude": -82.7759,
    "gaugeSource": {
      "id": "usgs-03209800",
      "provider": "usgs",
      "siteId": "03209800",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Levisa Fork at Prestonsburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03209800/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 800,
      "idealMax": 1500,
      "tooLow": 800,
      "tooHigh": 1500,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Levisa Fork at Prestonsburg",
        "url": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "KDFWR treats this lower Levisa corridor as a warm-season boating and fishing river with a dedicated Prestonsburg gauge ladder. Rain, upstream releases, and fresh wood can still change the river quickly despite the broader mainstem character.",
      "difficulty": "easy",
      "difficultyNotes": "At normal levels this is a straightforward warmwater mainstem float between developed ramps, but it is still a moving river with long pools, bridge current, fishing traffic, and faster water once the Prestonsburg gauge climbs out of band.",
      "confidenceNotes": "Confidence is high for a conservative Kentucky add: KDFWR still lists Prestonsburg Ramp to Airport Ramp as an 8.2-mile public segment, still publishes a dedicated Prestonsburg gauge ladder, and still provides exact endpoint coordinates on the access-detail pages. USGS Water Services returned same-day values of 793 cfs and 2.80 ft at 2026-07-15 16:45 EDT for direct gauge 03209800, which keeps the route below the official good band for an explicit low-water framing."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "800-1,500 cfs / 3.5-5.0 ft",
        "note": "KDFWR rates Levisa Fork at Prestonsburg as Low below 800 cfs or 3.5 ft, Good from 800 to 1,500 cfs or 3.5 to 5.0 ft, and High above 1,500 cfs or 5.0 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx"
      },
      {
        "label": "Official route segment",
        "value": "Prestonsburg Ramp to Airport Ramp, 8.2 miles",
        "note": "The current KDFWR Levisa Fork mileage table lists Prestonsburg Ramp to Airport Ramp directly as an 8.2-mile public route.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Prestonsburg Ramp, 37.6663, -82.7759",
        "note": "KDFWR identifies Prestonsburg Ramp at River Park as a paved public single-lane ramp with year-round 24-hour boat-ramp access and no camping listed.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=175"
      },
      {
        "label": "Take-out access",
        "value": "Airport Ramp, 37.7427, -82.7702",
        "note": "KDFWR identifies Airport Ramp as a paved public single-lane ramp near the Paintsville-Prestonsburg-Combs Air Field with year-round 24-hour boat-ramp access and no camping listed.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1182"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03209800 at 793 cfs / 2.80 ft",
        "note": "USGS Water Services returned same-day values of 793 cfs and 2.80 ft at 2026-07-15 16:45 EDT for Levisa Fork at Prestonsburg during this run, below the official good band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03209800&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping posture",
        "value": "No verified route camping on this lower corridor",
        "note": "Current KDFWR access-detail pages list Camping as None for Airport Ramp and do not document a campground-based overnight plan at Prestonsburg Ramp. Treat the route as a day float rather than implying a supported overnight.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1182"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Levisa Fork",
        "url": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Prestonsburg Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=175",
        "provider": "local"
      },
      {
        "label": "KDFWR Airport Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1182",
        "provider": "local"
      },
      {
        "label": "USGS 03209800 Levisa Fork at Prestonsburg",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03209800/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03209800 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03209800&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "levisa-fork-airport-boat-ramp",
    "slug": "levisa-fork-airport-boat-ramp",
    "name": "Levisa Fork",
    "reach": "Airport Ramp to Levisa Fork Boat Ramp",
    "aliases": [
      "Levisa Fork - Airport to Levisa Fork Boat Ramp",
      "Lower Levisa Fork - Airport to Paintsville",
      "KDFWR Levisa Fork lower section two"
    ],
    "state": "Kentucky",
    "region": "Eastern Kentucky",
    "summary": "Lower Levisa float from Airport Ramp to Levisa Fork Boat Ramp near Paintsville. KDFWR still lists the public 8.1-mile segment directly, keeps both ramps active, and uses the same official Prestonsburg gauge ladder for this downstream reach.",
    "statusText": "Use the Levisa Fork at Prestonsburg gauge. KDFWR rates 800 to 1,500 cfs, or 3.5 to 5.0 ft, as good for boating and fishing. Below that is low and slower with more exposed shoals; above that is high and the broader river can push harder around wood, banks, and bridge current.",
    "latitude": 37.7427,
    "longitude": -82.7702,
    "gaugeSource": {
      "id": "usgs-03209800",
      "provider": "usgs",
      "siteId": "03209800",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Levisa Fork at Prestonsburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03209800/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 800,
      "idealMax": 1500,
      "tooLow": 800,
      "tooHigh": 1500,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Levisa Fork at Prestonsburg",
        "url": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "KDFWR uses the Prestonsburg gauge for this lower Levisa chain as well. Broad pools can make low-water days feel slower, while rain and upstream releases can still push the mainstem out of comfort range quickly.",
      "difficulty": "easy",
      "difficultyNotes": "At normal levels this is a straightforward developed-ramp float on a larger warmwater river. The main complications are distance, low-water pacing, wood, and a more exposed lower-river feel when flows are outside the KDFWR band.",
      "confidenceNotes": "Confidence is high for a conservative Kentucky add: KDFWR still lists Airport Ramp to Levisa Fork Boat Ramp as an 8.1-mile public segment, still publishes the official Prestonsburg Low/Good/High gauge ladder, and still provides exact coordinates and public-use details for both endpoints. USGS Water Services returned same-day values at the direct Prestonsburg gauge during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "800-1,500 cfs / 3.5-5.0 ft",
        "note": "KDFWR rates Levisa Fork at Prestonsburg as Low below 800 cfs or 3.5 ft, Good from 800 to 1,500 cfs or 3.5 to 5.0 ft, and High above 1,500 cfs or 5.0 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx"
      },
      {
        "label": "Official route segment",
        "value": "Airport Ramp to Levisa Fork Boat Ramp, 8.1 miles",
        "note": "The current KDFWR Levisa Fork mileage table lists Airport Ramp to Levisa Fork Boat Ramp directly as an 8.1-mile public route.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Airport Ramp, 37.7427, -82.7702",
        "note": "KDFWR identifies Airport Ramp as a paved public single-lane ramp with unpaved parking, year-round 24-hour boat-ramp access, and no camping listed.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1182"
      },
      {
        "label": "Take-out access",
        "value": "Levisa Fork Boat Ramp, 37.8141, -82.7913",
        "note": "KDFWR identifies Levisa Fork Boat Ramp near Paintsville as a paved public single-lane ramp with year-round 24-hour access and nearby town services, but no documented campground support.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=282"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03209800 at 793 cfs / 2.80 ft",
        "note": "USGS Water Services returned same-day values of 793 cfs and 2.80 ft at 2026-07-15 16:45 EDT for Levisa Fork at Prestonsburg during this run, below the official good band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03209800&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping posture",
        "value": "No verified route camping on this lower corridor",
        "note": "Current KDFWR access-detail pages list Camping as None for Airport Ramp and do not document campground support at Levisa Fork Boat Ramp. Treat this as a day float rather than a supported overnight route.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1182"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Levisa Fork",
        "url": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Airport Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1182",
        "provider": "local"
      },
      {
        "label": "KDFWR Levisa Fork Boat Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=282",
        "provider": "local"
      },
      {
        "label": "USGS 03209800 Levisa Fork at Prestonsburg",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03209800/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03209800 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03209800&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "levisa-fork-prestonsburg-boat-ramp",
    "slug": "levisa-fork-prestonsburg-boat-ramp",
    "name": "Levisa Fork",
    "reach": "Prestonsburg Ramp to Levisa Fork Boat Ramp",
    "aliases": [
      "Levisa Fork - Prestonsburg to Levisa Fork Boat Ramp",
      "Lower Levisa Fork - Prestonsburg to Paintsville",
      "KDFWR Levisa Fork long lower continuation"
    ],
    "state": "Kentucky",
    "region": "Eastern Kentucky",
    "summary": "Longer lower-Levisa float from Prestonsburg Ramp to Levisa Fork Boat Ramp. KDFWR still supports the route by chaining the direct 8.2-mile Prestonsburg-to-Airport segment and the 8.1-mile Airport-to-Levisa Fork Boat Ramp segment under the same official Prestonsburg gauge ladder.",
    "statusText": "Use the Levisa Fork at Prestonsburg gauge. KDFWR rates 800 to 1,500 cfs, or 3.5 to 5.0 ft, as good for boating and fishing. Below that this longer route can feel slow and shoaly; above that the mainstem current, wood, and fatigue make the full downstream commitment much less forgiving.",
    "latitude": 37.6663,
    "longitude": -82.7759,
    "gaugeSource": {
      "id": "usgs-03209800",
      "provider": "usgs",
      "siteId": "03209800",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Levisa Fork at Prestonsburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03209800/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 800,
      "idealMax": 1500,
      "tooLow": 800,
      "tooHigh": 1500,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Levisa Fork at Prestonsburg",
        "url": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "KDFWR treats the lower Levisa as a reliable warm-season mainstem float, but the full Prestonsburg-to-Paintsville combination is still best when the river is comfortably inside band and stable. Low-water days stretch out, while rain and releases can push the whole corridor out of range quickly.",
      "difficulty": "moderate",
      "difficultyNotes": "The water is not technical at normal levels, but the full 16.3-mile lower-Levisa commitment is a longer day with more cumulative wind, heat, wood, and fatigue than the shorter downstream splits. Treat it as moderate because of length and commitment, not whitewater.",
      "confidenceNotes": "Confidence is high for a conservative Kentucky add: KDFWR still publishes the direct Prestonsburg-to-Airport 8.2-mile segment and Airport-to-Levisa Fork Boat Ramp 8.1-mile segment, still uses the same Prestonsburg gauge ladder for the lower corridor, and still provides exact coordinates for all three public ramps. USGS Water Services returned same-day direct values during this run, below the official good band, so the route ships with explicit low-water caution instead of comfort framing."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "800-1,500 cfs / 3.5-5.0 ft",
        "note": "KDFWR rates Levisa Fork at Prestonsburg as Low below 800 cfs or 3.5 ft, Good from 800 to 1,500 cfs or 3.5 to 5.0 ft, and High above 1,500 cfs or 5.0 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx"
      },
      {
        "label": "Official route chain",
        "value": "Prestonsburg Ramp to Airport Ramp 8.2 miles plus Airport Ramp to Levisa Fork Boat Ramp 8.1 miles",
        "note": "Current KDFWR Levisa Fork materials still support both linked public lower-river segments, which combine into about 16.3 miles on the same river and gauge corridor.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Prestonsburg Ramp, 37.6663, -82.7759",
        "note": "KDFWR identifies Prestonsburg Ramp at River Park as a paved public single-lane ramp with year-round 24-hour boat-ramp access and no camping listed.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=175"
      },
      {
        "label": "Take-out access",
        "value": "Levisa Fork Boat Ramp, 37.8141, -82.7913",
        "note": "KDFWR identifies Levisa Fork Boat Ramp near Paintsville as a paved public single-lane ramp with year-round 24-hour access and nearby town services, but no documented campground support.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=282"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03209800 at 793 cfs / 2.80 ft",
        "note": "USGS Water Services returned same-day values of 793 cfs and 2.80 ft at 2026-07-15 16:45 EDT for Levisa Fork at Prestonsburg during this run, below the official good band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03209800&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping posture",
        "value": "No verified route camping on this lower corridor",
        "note": "Current KDFWR access-detail pages do not document campground support for Prestonsburg Ramp, Airport Ramp, or Levisa Fork Boat Ramp. Treat the route as a committed day float rather than implying an overnight plan.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=175"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Levisa Fork",
        "url": "https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Prestonsburg Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=175",
        "provider": "local"
      },
      {
        "label": "KDFWR Airport Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1182",
        "provider": "local"
      },
      {
        "label": "KDFWR Levisa Fork Boat Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=282",
        "provider": "local"
      },
      {
        "label": "USGS 03209800 Levisa Fork at Prestonsburg",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03209800/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03209800 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03209800&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "elkhorn-creek-vpa-3-aw-access",
    "slug": "elkhorn-creek-vpa-3-aw-access",
    "name": "Elkhorn Creek",
    "reach": "Elkhorn Creek VPA #3 to American Whitewater Access",
    "aliases": [
      "Elkhorn Creek - VPA #3 to American Whitewater Access",
      "Elkhorn Creek - Peaks Mill VPA to Elkhorn Acres",
      "Elkhorn Creek Gorge short run"
    ],
    "state": "Kentucky",
    "region": "Bluegrass Region",
    "routeType": "whitewater",
    "summary": "Short central-Kentucky Elkhorn run between two KDFWR-listed public-use access sites. KDFWR gives an official level band for the Frankfort gauge, but this is swift Class II water with private-property rules at the accesses.",
    "statusText": "Use the Elkhorn Creek near Frankfort gauge. KDFWR rates 100 to 600 cfs, or 2.5 to 4.0 ft, as good for boating and fishing. Below that is low; above that is high and this route deserves whitewater judgment.",
    "latitude": 38.2517,
    "longitude": -84.8158,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "American Whitewater describes the Elkhorn Gorge as Class II with occasional Class III features. Treat this short segment as whitewater, not a casual float.",
        "Use only the named KDFWR VPA #3 put-in and American Whitewater / Elkhorn Acres take-out. VPA #3 is private land under KDFWR rules, and the take-out is boating access only.",
        "KDFWR rates 100 to 600 cfs, or 2.5 to 4.0 ft, as the good band. Stand down below the low line, above the high line, or when rain is pushing the creek up."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03289500",
      "provider": "usgs",
      "siteId": "03289500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Elkhorn Creek near Frankfort, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03289500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 100,
      "idealMax": 600,
      "tooLow": 100,
      "tooHigh": 600,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Elkhorn Creek near Frankfort",
        "url": "https://fw.ky.gov/Fish/pages/elkhorn-creek.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "Elkhorn Creek can be scratchy below the KDFWR low-water line and pushy after rain. Check the same-day hydrograph trend, recent storms, and access rules before committing.",
      "difficulty": "moderate",
      "difficultyNotes": "American Whitewater describes the Elkhorn Gorge as Class II with occasional Class III features. Treat this as a short whitewater practice run, not a casual tube float.",
      "confidenceNotes": "Confidence is high for the narrow route package: KDFWR lists the exact VPA #3-to-American Whitewater Access mileage, publishes coordinates and access rules for both endpoints, and gives official cfs and stage bands tied to the Elkhorn Creek near Frankfort USGS gauge. The main caveat is practical and legal: VPA #3 is private land open through KDFWR rules, the American Whitewater access is boating-only, and the route should be hidden from casual discovery because the gorge has swift Class II water."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "100-600 cfs / 2.5-4.0 ft",
        "note": "KDFWR rates Elkhorn Creek near Frankfort as Low below 100 cfs or 2.5 ft, Good from 100 to 600 cfs or 2.5 to 4.0 ft, and High above 600 cfs or 4.0 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/pages/elkhorn-creek.aspx"
      },
      {
        "label": "Official route segment",
        "value": "VPA #3 to American Whitewater Access, 2.6 miles",
        "note": "KDFWR lists Elkhorn Creek VPA #3 to American Whitewater Access as a 2.6-mile access-to-access segment on the main Elkhorn Creek access table.",
        "sourceUrl": "https://fw.ky.gov/Fish/pages/elkhorn-creek.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Elkhorn Creek VPA #3, 38.2517, -84.8158",
        "note": "KDFWR identifies VPA #3 as a Voluntary Public Access site on private property with daylight-hours-only rules, unpaved limited parking, bank access, and canoe/kayak access.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=996"
      },
      {
        "label": "Take-out access",
        "value": "American Whitewater / Elkhorn Acres Access, 38.2676, -84.8155",
        "note": "KDFWR lists the American Whitewater / Elkhorn Acres site as a free carry-down boating access just downstream of Knight's Bridge, with unpaved parking and no bank or wade fishing.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1105"
      },
      {
        "label": "Whitewater character",
        "value": "Class II(III)",
        "note": "American Whitewater identifies the Elkhorn Gorge reach as Class II with occasional Class III rapids and ties it to the same Frankfort gauge.",
        "sourceUrl": "https://www.americanwhitewater.org/content/River/view/river-detail/661/main"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03289500",
        "note": "USGS lists Elkhorn Creek near Frankfort with discharge and gage-height availability through May 26, 2026 in the search-visible legacy page, and RiverApp showed same-day May 31 values imported from USGS Water Services during this run. Workspace direct fetches to Water Services were blocked by network restrictions.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?agency_cd=USGS&legacy=1&site_no=03289500"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Elkhorn Creek",
        "url": "https://fw.ky.gov/Fish/pages/elkhorn-creek.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Elkhorn Creek VPA #3 access detail",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=996",
        "provider": "local"
      },
      {
        "label": "KDFWR American Whitewater / Elkhorn Acres access detail",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1105",
        "provider": "local"
      },
      {
        "label": "USGS 03289500 Elkhorn Creek near Frankfort",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03289500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03289500 legacy current conditions",
        "url": "https://waterdata.usgs.gov/nwis/uv?agency_cd=USGS&legacy=1&site_no=03289500",
        "provider": "usgs"
      },
      {
        "label": "American Whitewater Elkhorn Gorge",
        "url": "https://www.americanwhitewater.org/content/River/view/river-detail/661/main",
        "provider": "american_whitewater"
      },
      {
        "label": "RiverApp Elkhorn Creek near Frankfort",
        "url": "https://www.riverapp.net/en/station/5452aa02e4b07179033c77c0",
        "provider": "local"
      }
    ]
  },
  {
    "id": "drakes-creek-romanza-johnson-phil-moore",
    "slug": "drakes-creek-romanza-johnson-phil-moore",
    "name": "Drakes Creek",
    "reach": "Romanza Johnson Park to Phil Moore Park",
    "aliases": [
      "Trammel Fork / Drakes Creek - Romanza Johnson to Phil Moore",
      "Drakes Creek - Johnson County Park to Phil Moore Park",
      "Warren County Blueways Drakes Creek"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Popular Warren County Blueways trip from Romanza Johnson Park on Trammel Fork into Drakes Creek and down to Phil Moore Park. Warren County and KDFWR support the public accesses, and the Drakes Creek USGS gauge is now product-live.",
    "statusText": "Use the Drakes Creek near Alvaton gauge. Treat about 100 cfs as the low-water floor for Trammel Fork and Drakes Creek; below that, expect dragging. Avoid high or rising water, the Romanza ford hydraulic, strainers, and any red-flag or posted park/access closure.",
    "latitude": 36.873116,
    "longitude": -86.372368,
    "gaugeSource": {
      "id": "usgs-03314000",
      "provider": "usgs",
      "siteId": "03314000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Drakes Creek near Alvaton, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03314000/"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "KDFWR Drakes Creek Blue Water Trails minimum-flow guidance",
        "url": "https://fw.ky.gov/Education/Documents/bluewatertrailtrammelforkdrakescreek.pdf",
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
      "seasonNotes": "Spring through fall can work when the creek has enough water, but this route responds quickly to storms. Summer lows can expose shoals, while fresh rain can add swift current, strainers, hydraulics, debris, and water-quality concerns.",
      "difficulty": "easy",
      "difficultyNotes": "Warren County and local blueway material frame Romanza Johnson Park to Phil Moore Park as a common six-mile recreational float. It is generally approachable at ordinary levels, but the Romanza ford hydraulic, strainers, low-water dragging, and quick rises require more judgment than a flatwater park paddle.",
      "confidenceNotes": "Confidence is good for a minimum-only Kentucky add: Warren County identifies Romanza Johnson Park to Phil Moore Park as a common canoe/kayak trip and publishes safety guidance for Drakes Creek users; KDFWR and Warren County records confirm public carry-down access at Phil Moore Park and creek access at Romanza Johnson Park; KDFWR Blue Water Trail material gives a 100 cfs low-water floor for Trammel Fork and Drakes Creek; and USGS 03314000 showed same-day June 1, 2026 discharge and gage-height observations. The app does not infer an ideal range or high cutoff because the strongest numeric support is a minimum rather than a full route band."
    },
    "evidenceNotes": [
      {
        "label": "Route shape",
        "value": "Romanza Johnson Park to Phil Moore Park, about 6 mi",
        "note": "Warren County Parks says Romanza Johnson Park is popular with canoe and kayak users for a 3-4 hour trip ending at Phil Moore Park, and Warren County Blueways material lists the route at about six miles.",
        "sourceUrl": "https://www.warrencountyky.gov/departments/parks-and-recreation/romanza-johnson-park/"
      },
      {
        "label": "Minimum-flow guidance",
        "value": "100 cfs minimum-only",
        "note": "KDFWR Drakes Creek Blue Water Trail material says at least 100 cfs is best for minimal dragging on Trammel Fork and Drakes Creek. Paddle Today uses that as a conservative low-water floor.",
        "sourceUrl": "https://fw.ky.gov/Education/Documents/bluewatertrailtrammelforkdrakescreek.pdf"
      },
      {
        "label": "Live direct gauge",
        "value": "USGS 03314000 at 279 cfs / 5.28 ft",
        "note": "USGS Water Services returned same-day discharge and gage height at 08:45 CDT on June 1, 2026 for Drakes Creek near Alvaton.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03314000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "County safety system",
        "value": "Flags, park closures at dark, ford hydraulic, strainers",
        "note": "Warren County tells paddlers to check the USGS Drakes Creek gauge, warns that Romanza Johnson and Phil Moore close at dark, and calls out the Romanza ford hydraulic as very dangerous when water flows over the ford.",
        "sourceUrl": "https://www.warrencountyky.gov/departments/parks-and-recreation/river-access/"
      },
      {
        "label": "Endpoint coordinates",
        "value": "36.873116, -86.372368 to 36.8954, -86.3807",
        "note": "Warren County Blueways map text lists the Romanza/Johnson County Park coordinate, and the KDFWR Phil Moore Park access record lists Phil Moore Park at 36.8954, -86.3807.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=879"
      }
    ],
    "sourceLinks": [
      {
        "label": "Warren County river access and Drakes Creek safety",
        "url": "https://www.warrencountyky.gov/departments/parks-and-recreation/river-access/",
        "provider": "local"
      },
      {
        "label": "Warren County Romanza Johnson Park",
        "url": "https://www.warrencountyky.gov/departments/parks-and-recreation/romanza-johnson-park/",
        "provider": "local"
      },
      {
        "label": "KDFWR Drakes Creek access records",
        "url": "https://app.fw.ky.gov/fisheries/WaterbodyDetail.aspx?wid=427",
        "provider": "local"
      },
      {
        "label": "KDFWR Phil Moore Park access record",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=879",
        "provider": "local"
      },
      {
        "label": "KDFWR Drakes Creek Blue Water Trail PDF",
        "url": "https://fw.ky.gov/Education/Documents/bluewatertrailtrammelforkdrakescreek.pdf",
        "provider": "local"
      },
      {
        "label": "USGS 03314000 Drakes Creek near Alvaton",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03314000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03314000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03314000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "big-south-fork-blue-heron-yamacraw",
    "slug": "big-south-fork-blue-heron-yamacraw",
    "name": "Big South Fork",
    "reach": "Blue Heron Canoe Ramp to Yamacraw",
    "aliases": [
      "Big South Fork - Blue Heron to Yamacraw",
      "Blue Heron Mine to Yamacraw Bridge",
      "Big South Fork Kentucky day float"
    ],
    "state": "Kentucky",
    "region": "Cumberland Plateau",
    "summary": "Scenic Big South Fork day float from Blue Heron to Yamacraw with KDFWR public access at both ends, direct Stearns USGS live data, and official Kentucky flow guidance for a family-friendly gorge run below Devil's Jump.",
    "statusText": "Use the South Fork Cumberland near Stearns gauge. KDFWR rates 100 to 500 cfs as the best casual-floating band, 500 to 1,500 cfs as faster water for more experienced open-boat paddlers, and anything above 1,500 cfs as expert-only conditions.",
    "latitude": 36.6683,
    "longitude": -84.5474,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "remote",
        "strainers"
      ],
      "safetyNotes": [
        "Blue Heron starts below the Devil's Jump rapid; do not paddle upstream into that wilderness section unless you have a separate advanced plan.",
        "KDFWR calls the river extremely flashy, and storms in the Clear Fork or New River headwaters can turn a gentle float into pushy brown water quickly.",
        "Wood, boulders, and remote gorge conditions still matter even though this segment is the easier Big South Fork option."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03410500",
      "provider": "usgs",
      "siteId": "03410500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "South Fork Cumberland River near Stearns, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03410500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 100,
      "idealMax": 500,
      "tooLow": 100,
      "tooHigh": 1500,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Big South Fork at Stearns",
        "url": "https://fw.ky.gov/Education/Pages/Big-South-Fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "KDFWR presents Blue Heron to Yamacraw as a warm-season family float when the Stearns gauge stays in the lower bands, but the plateau headwaters can raise the river fast after rain. Treat storms and gauge trend as more important than the average season.",
      "difficulty": "easy",
      "difficultyNotes": "This is the gentler Big South Fork option below the wilderness rapids. At normal levels it suits ordinary moving-water paddlers, but above the 500 cfs family band the current gets faster and more consequential.",
      "confidenceNotes": "Confidence is high for this Kentucky add: KDFWR names Blue Heron to Yamacraw as a 5-mile float, publishes official Stearns-gauge cfs bands, and provides access detail pages with source-backed coordinates for both endpoints. USGS 03410500 now returns same-day June 22, 2026 discharge and gage-height values through Water Services, clearing the long-standing live-data blocker. The route stays conservative by treating 100 to 500 cfs as the target band and pushing faster or flood-prone water into user-facing caution."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Blue Heron to Yamacraw, 5 mi",
        "note": "KDFWR names Blue Heron to Yamacraw as a 5-mile float and separately says families can make this a half-day Big South Fork trip.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Big-South-Fork.aspx"
      },
      {
        "label": "Official level band",
        "value": "100-500 cfs best casual band",
        "note": "KDFWR says expect dragging below 100 cfs at the Stearns gauge, rates 100 to 500 cfs as the best flow for casual floating, 500 to 1,500 cfs as faster water for more experienced open boats, and above 1,500 cfs as experienced closed-boat water. Flow above 3,000 cfs is described as extremely dangerous.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Big-South-Fork.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Blue Heron Canoe Ramp, 36.6683, -84.5474",
        "note": "KDFWR lists Blue Heron Canoe Ramp as a carry-down public access with paved parking, restrooms, and published coordinates inside the Big South Fork corridor.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=366"
      },
      {
        "label": "Take-out access",
        "value": "Yamacraw, 36.7255, -84.5446",
        "note": "KDFWR lists Yamacraw as the downstream public access with year-round availability, an unpaved ramp, and published coordinates beside the KY 92 bridge corridor.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=367"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 03410500 at 147 cfs / 1.87 ft",
        "note": "USGS Water Services returned same-day South Fork Cumberland River near Stearns discharge and gage-height values at 11:30 EDT on June 22, 2026.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03410500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping support",
        "value": "Blue Heron and Alum Ford campgrounds in the park corridor",
        "note": "KDFWR says paddlers can use the campgrounds at Blue Heron and Alum Ford in the Big South Fork National River and Recreation Area, which supports endpoint camping rather than assuming a mid-route overnight float.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Big-South-Fork.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Big South Fork",
        "url": "https://fw.ky.gov/Education/Pages/Big-South-Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Blue Heron Canoe Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=366",
        "provider": "local"
      },
      {
        "label": "KDFWR Yamacraw access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=367",
        "provider": "local"
      },
      {
        "label": "USGS 03410500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03410500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03410500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03410500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "NPS Big South Fork",
        "url": "https://www.nps.gov/biso/index.htm",
        "provider": "nps"
      }
    ]
  },
  {
    "id": "big-south-fork-blue-heron-worley",
    "slug": "big-south-fork-blue-heron-worley",
    "name": "Big South Fork",
    "reach": "Blue Heron Canoe Ramp to Worley Canoe Access",
    "aliases": [
      "Big South Fork - Blue Heron to Worley",
      "Blue Heron Mine to Worley",
      "Big South Fork short family float"
    ],
    "state": "Kentucky",
    "region": "Cumberland Plateau",
    "summary": "Shortest KDFWR-documented Big South Fork family float from Blue Heron to Worley with public access at both ends, direct Stearns USGS live data, and the same official Kentucky gauge ladder used on the rest of the lower corridor below Devil's Jump.",
    "statusText": "Use the South Fork Cumberland near Stearns gauge. KDFWR rates 100 to 500 cfs as the best casual-floating band, 500 to 1,500 cfs as faster water for more experienced open-boat paddlers, and anything above 1,500 cfs as expert-only conditions.",
    "latitude": 36.6683,
    "longitude": -84.5474,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "remote",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Blue Heron starts below the Devil's Jump rapid; do not paddle upstream into that wilderness section unless you have a separate advanced plan.",
        "KDFWR calls the river extremely flashy, and storms in the Clear Fork or New River headwaters can turn a short scenic float into pushy brown water quickly.",
        "Worley is a carry-down finish on a rougher road spur. Wood, boulders, and steep private banks still limit easy mid-route exits."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03410500",
      "provider": "usgs",
      "siteId": "03410500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "South Fork Cumberland River near Stearns, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03410500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 100,
      "idealMax": 500,
      "tooLow": 100,
      "tooHigh": 1500,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Big South Fork at Stearns",
        "url": "https://fw.ky.gov/Education/Pages/Big-South-Fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "KDFWR frames Blue Heron as the start of the easier family-float corridor. Treat same-day rain and gauge trend as more important than the calendar because plateau headwaters can raise the river quickly.",
      "difficulty": "easy",
      "difficultyNotes": "This is the shortest lower Big South Fork family split. It suits ordinary moving-water paddlers at normal levels, but the river still gets faster and more consequential above the 500 cfs family band.",
      "confidenceNotes": "Confidence is high for this short Kentucky add: KDFWR explicitly names Blue Heron to Worley as a 2.5-mile float, publishes official Stearns-gauge cfs bands, and provides source-backed access-detail coordinates for both endpoints. USGS 03410500 returned same-day June 26, 2026 discharge and gage-height values through Water Services during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Blue Heron to Worley, 2.5 mi",
        "note": "KDFWR says a family can make a half-day 2.5-mile float from Blue Heron to Worley.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Big-South-Fork.aspx"
      },
      {
        "label": "Official level band",
        "value": "100-500 cfs best casual band",
        "note": "KDFWR says expect dragging below 100 cfs at the Stearns gauge, rates 100 to 500 cfs as the best flow for casual floating, 500 to 1,500 cfs as faster water for more experienced open boats, and above 1,500 cfs as experienced closed-boat water. Flow above 3,000 cfs is described as extremely dangerous.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Big-South-Fork.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Blue Heron Canoe Ramp, 36.6683, -84.5474",
        "note": "KDFWR lists Blue Heron Canoe Ramp as a carry-down public access with paved parking, restrooms, and published coordinates inside the Big South Fork corridor.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=366"
      },
      {
        "label": "Take-out access",
        "value": "Worley Canoe Access, 36.6982, -84.5374",
        "note": "KDFWR lists Worley as a public carry-down shoreline access with unpaved parking and published coordinates.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=921"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 03410500 at 199 cfs / 2.11 ft",
        "note": "USGS Water Services returned same-day South Fork Cumberland River near Stearns discharge and gage-height values at 03:30 EDT on June 26, 2026.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03410500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping support",
        "value": "Blue Heron campground at the put-in",
        "note": "Blue Heron Campground is a developed NPS campground in the Kentucky portion of Big South Fork and works as an endpoint campground for this short float.",
        "sourceUrl": "https://www.nps.gov/biso/planyourvisit/blueheroncampground.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Big South Fork",
        "url": "https://fw.ky.gov/Education/Pages/Big-South-Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Blue Heron Canoe Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=366",
        "provider": "local"
      },
      {
        "label": "KDFWR Worley Canoe Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=921",
        "provider": "local"
      },
      {
        "label": "USGS 03410500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03410500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03410500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03410500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "NPS Big South Fork access points",
        "url": "https://www.nps.gov/biso/planyourvisit/riveraccesspoints.htm",
        "provider": "nps"
      }
    ]
  },
  {
    "id": "big-south-fork-yamacraw-alum-ford",
    "slug": "big-south-fork-yamacraw-alum-ford",
    "name": "Big South Fork",
    "reach": "Yamacraw to Alum Ford",
    "aliases": [
      "Big South Fork - Yamacraw to Alum Ford",
      "Yamacraw Bridge to Alum Ford Boat Ramp",
      "Big South Fork flatwater lower float"
    ],
    "state": "Kentucky",
    "region": "Cumberland Plateau",
    "summary": "Gentler lower Big South Fork float from Yamacraw to Alum Ford with public access at both ends, direct Stearns USGS live data, and official Kentucky flow guidance for the lower family-friendly lake-headwater section.",
    "statusText": "Use the South Fork Cumberland near Stearns gauge. KDFWR rates 100 to 500 cfs as the best casual-floating band, 500 to 1,500 cfs as faster water for more experienced open-boat paddlers, and anything above 1,500 cfs as expert-only conditions.",
    "latitude": 36.7255,
    "longitude": -84.5446,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "KDFWR still calls the Big South Fork extremely flashy, so headwater rain can raise or muddy the river faster than this gentle lower mileage suggests.",
        "NPS and KDFWR describe this as the flatter headwaters-of-Lake-Cumberland section, which means motorboats can appear and lake level can change the feel of the route.",
        "The corridor stays in a managed public river park, but banks outside the named accesses should still be treated as private or unsuitable for casual exit points."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03410500",
      "provider": "usgs",
      "siteId": "03410500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "South Fork Cumberland River near Stearns, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03410500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 100,
      "idealMax": 500,
      "tooLow": 100,
      "tooHigh": 1500,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Big South Fork at Stearns",
        "url": "https://fw.ky.gov/Education/Pages/Big-South-Fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "KDFWR presents Yamacraw to Alum Ford as the beginner-friendlier lower section during the broader warm season, but storms and lake influence still make same-day judgment more important than the month.",
      "difficulty": "easy",
      "difficultyNotes": "This is the easiest Big South Fork split added so far. Most of the consequence comes from low-water scraping, motorboat interaction, and sudden weather-driven rises rather than technical rapids.",
      "confidenceNotes": "Confidence is high for this Kentucky add: KDFWR explicitly names Yamacraw to Alum Ford as an 8-mile family-and-beginners float, publishes official Stearns-gauge cfs bands, and provides source-backed access-detail coordinates for both endpoints. USGS 03410500 returned same-day June 26, 2026 discharge and gage-height values through Water Services during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Yamacraw to Alum Ford, 8 mi",
        "note": "KDFWR says families and beginners should try the 8-mile stretch from Yamacraw to Alum Ford Boat Ramp.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Big-South-Fork.aspx"
      },
      {
        "label": "Official level band",
        "value": "100-500 cfs best casual band",
        "note": "KDFWR says expect dragging below 100 cfs at the Stearns gauge, rates 100 to 500 cfs as the best flow for casual floating, 500 to 1,500 cfs as faster water for more experienced open boats, and above 1,500 cfs as experienced closed-boat water. Flow above 3,000 cfs is described as extremely dangerous.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Big-South-Fork.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Yamacraw, 36.7255, -84.5446",
        "note": "KDFWR lists Yamacraw as the upstream public access with year-round availability, an unpaved ramp, and published coordinates beside the KY 92 bridge corridor.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=367"
      },
      {
        "label": "Take-out access",
        "value": "Alum Ford, 36.7639, -84.5471",
        "note": "KDFWR lists Alum Ford as the downstream public access with a paved ramp, paved parking, and published coordinates.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=368"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 03410500 at 199 cfs / 2.11 ft",
        "note": "USGS Water Services returned same-day South Fork Cumberland River near Stearns discharge and gage-height values at 03:30 EDT on June 26, 2026.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03410500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping support",
        "value": "Alum Ford campground at the take-out",
        "note": "Alum Ford Campground sits adjacent to the Alum Ford boat launch and supports a developed endpoint campground finish for this lower float.",
        "sourceUrl": "https://www.nps.gov/biso/planyourvisit/alumfordcampground.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Big South Fork",
        "url": "https://fw.ky.gov/Education/Pages/Big-South-Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Yamacraw access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=367",
        "provider": "local"
      },
      {
        "label": "KDFWR Alum Ford access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=368",
        "provider": "local"
      },
      {
        "label": "USGS 03410500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03410500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03410500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03410500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "NPS Alum Ford Campground",
        "url": "https://www.nps.gov/biso/planyourvisit/alumfordcampground.htm",
        "provider": "nps"
      }
    ]
  },
  {
    "id": "big-south-fork-blue-heron-alum-ford",
    "slug": "big-south-fork-blue-heron-alum-ford",
    "name": "Big South Fork",
    "reach": "Blue Heron Canoe Ramp to Alum Ford",
    "aliases": [
      "Big South Fork - Blue Heron to Alum Ford",
      "Blue Heron Mine to Alum Ford Boat Ramp",
      "Big South Fork full lower day float"
    ],
    "state": "Kentucky",
    "region": "Cumberland Plateau",
    "summary": "Longer lower Big South Fork day from Blue Heron to Alum Ford that combines the easier gorge exit below Devil's Jump with the lake-headwater finish. KDFWR and NPS support the route shape, while the direct Stearns gauge keeps the lower-corridor go/no-go decision grounded in same-day data.",
    "statusText": "Use the South Fork Cumberland near Stearns gauge. KDFWR rates 100 to 500 cfs as the best casual-floating band, 500 to 1,500 cfs as faster water for more experienced open-boat paddlers, and anything above 1,500 cfs as expert-only conditions.",
    "latitude": 36.6683,
    "longitude": -84.5474,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "remote",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Blue Heron starts below the Devil's Jump rapid; do not paddle upstream into that wilderness section unless you have a separate advanced plan.",
        "This longer route combines the pushier upper family section with the flatter lake-headwater lower miles, so storms, fatigue, and changing current deserve more respect than on the shorter splits.",
        "Motorboats may appear on the lower half near Alum Ford, and the river still rises quickly after headwater rain."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03410500",
      "provider": "usgs",
      "siteId": "03410500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "South Fork Cumberland River near Stearns, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03410500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 100,
      "idealMax": 500,
      "tooLow": 100,
      "tooHigh": 1500,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Big South Fork at Stearns",
        "url": "https://fw.ky.gov/Education/Pages/Big-South-Fork.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This full lower-day option works best in the same broad warm-season window as the shorter Blue Heron and Yamacraw splits, but same-day weather, gauge trend, and group pace still decide whether the combined route is smart.",
      "difficulty": "easy",
      "difficultyNotes": "Technically this stays in the easier Big South Fork family, but the full length makes it a more committed day than Blue Heron-to-Yamacraw or Yamacraw-to-Alum Ford. The risk is pace, weather, and remoteness more than rapids.",
      "confidenceNotes": "Confidence is high for this combined Kentucky add: KDFWR still frames Blue Heron as the start and Alum Ford as the end of the easier lower corridor, while NPS lists Blue Heron Mine to Alum Ford as a 12.2-mile route. KDFWR access-detail pages provide source-backed coordinates at both ends, and USGS 03410500 returned same-day June 26, 2026 discharge and gage-height values through Water Services during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Blue Heron to Alum Ford, 12.2 mi",
        "note": "NPS lists Blue Heron Mine to Alum Ford as a 12.2-mile route, and KDFWR describes Blue Heron as the start and Alum Ford as the end of the easier lower Big South Fork section.",
        "sourceUrl": "https://www.nps.gov/biso/planyourvisit/riverrundescriptions.htm"
      },
      {
        "label": "Official level band",
        "value": "100-500 cfs best casual band",
        "note": "KDFWR says expect dragging below 100 cfs at the Stearns gauge, rates 100 to 500 cfs as the best flow for casual floating, 500 to 1,500 cfs as faster water for more experienced open boats, and above 1,500 cfs as experienced closed-boat water. Flow above 3,000 cfs is described as extremely dangerous.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Big-South-Fork.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Blue Heron Canoe Ramp, 36.6683, -84.5474",
        "note": "KDFWR lists Blue Heron Canoe Ramp as a carry-down public access with paved parking, restrooms, and published coordinates inside the Big South Fork corridor.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=366"
      },
      {
        "label": "Take-out access",
        "value": "Alum Ford, 36.7639, -84.5471",
        "note": "KDFWR lists Alum Ford as the downstream public access with a paved ramp, paved parking, and published coordinates.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=368"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 03410500 at 199 cfs / 2.11 ft",
        "note": "USGS Water Services returned same-day South Fork Cumberland River near Stearns discharge and gage-height values at 03:30 EDT on June 26, 2026.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03410500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping support",
        "value": "Blue Heron and Alum Ford campgrounds at the endpoints",
        "note": "Blue Heron and Alum Ford both have developed NPS campground support, so this longer day can start or finish from an endpoint campground without implying a required overnight river camp.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Big-South-Fork.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Big South Fork",
        "url": "https://fw.ky.gov/Education/Pages/Big-South-Fork.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Blue Heron Canoe Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=366",
        "provider": "local"
      },
      {
        "label": "KDFWR Alum Ford access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=368",
        "provider": "local"
      },
      {
        "label": "USGS 03410500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03410500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03410500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03410500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "NPS Big South Fork river run descriptions",
        "url": "https://www.nps.gov/biso/planyourvisit/riverrundescriptions.htm",
        "provider": "nps"
      }
    ]
  },
  {
    "id": "north-fork-kentucky-river-watts-hazard-city-ramp",
    "slug": "north-fork-kentucky-river-watts-hazard-city-ramp",
    "name": "North Fork Kentucky River",
    "reach": "Watts Ramp to Hazard City Ramp and Fishing Pier",
    "aliases": [
      "North Fork Kentucky River - Watts to Hazard",
      "North Fork Kentucky River Ulvah to downtown Hazard",
      "North Fork Kentucky River upper Hazard day float"
    ],
    "state": "Kentucky",
    "region": "Eastern Kentucky",
    "summary": "Longer upper Hazard float from Watts Ramp in Ulvah to the public city ramp behind Hazard City Hall. KDFWR publishes the exact 22.2-mile segment, official Hazard gauge bands, and source-backed coordinates for both endpoints.",
    "statusText": "Use the North Fork Kentucky River at Hazard gauge. KDFWR rates the route low below 4.25 ft, good from 4.25 to 5.0 ft, and high above 5.0 ft.",
    "latitude": 37.1283,
    "longitude": -83.0519,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "low_head_dam",
        "fast_rise",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "This is a long eastern Kentucky day that finishes at the Hazard City ramp directly upstream from a low-head dam. Identify the finish before launch and do not drift past it.",
        "KDFWR says the Watts reach is relatively shallow with numerous riffles, and mountain rain can raise the North Fork quickly while pushing new wood into current lines.",
        "Most banks away from the named accesses should be treated as private, steep, or muddy rather than casual stop points."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03277500",
      "provider": "usgs",
      "siteId": "03277500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "North Fork Kentucky River at Hazard, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03277500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 4.25,
      "idealMax": 5,
      "tooLow": 4.25,
      "tooHigh": 5,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for North Fork Kentucky River at Hazard",
        "url": "https://fw.ky.gov/Fish/Pages/NF-Kentucky-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This longer upper-Hazard route can work across the warmer season when the Hazard gauge stays in shape, but the North Fork remains flashy and wood-prone after rain.",
      "difficulty": "moderate",
      "difficultyNotes": "The current is broad-audience friendly at normal levels, but 22.2 miles with riffles, few developed exits, and a mandatory city-ramp finish above a low-head dam make this a committed day rather than a casual family float.",
      "confidenceNotes": "Confidence is good for a conservative add: KDFWR publishes the exact Watts-to-Hazard 22.2-mile route, the official Hazard stage bands, and source-backed access-detail coordinates for both ramps. Direct USGS 03277500 returned a same-day stage reading of 4.10 ft during this run, which keeps the live path current while honestly flagging a slightly below-band day."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Watts Ramp to Hazard City Ramp, 22.2 mi",
        "note": "KDFWR lists Watts Ramp to Hazard City Ramp as a 22.2-mile North Fork Kentucky River segment in the access-mileage table.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/NF-Kentucky-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "4.25-5.0 ft",
        "note": "KDFWR rates the North Fork Kentucky River at Hazard as Low below 4.25 ft, Good from 4.25 to 5.0 ft, and High above 5.0 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/NF-Kentucky-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Watts Ramp, 37.1283, -83.0519",
        "note": "KDFWR lists Watts Ramp as a paved public launch under the Watts Drive bridge in Ulvah with published coordinates and unpaved parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1126"
      },
      {
        "label": "Take-out access",
        "value": "Hazard City Ramp, 37.2513, -83.1962",
        "note": "KDFWR lists the Hazard City Ramp and Fishing Pier as a paved public launch behind city hall with published coordinates, restrooms, parking, and a low-head-dam warning.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=952"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 03277500 at 4.10 ft",
        "note": "USGS Water Services returned a same-day stage of 4.10 ft at 19:45 EDT on July 3, 2026 for the North Fork Kentucky River at Hazard.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03277500&parameterCd=00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Shallow riffles, long rural day, mandatory Hazard finish",
        "note": "KDFWR says the Watts reach is relatively shallow with numerous riffles, while the Hazard finish sits directly upstream from a low-head dam and needs a clean take-out.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/NF-Kentucky-River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR North Fork Kentucky River",
        "url": "https://fw.ky.gov/Fish/Pages/NF-Kentucky-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Watts Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1126",
        "provider": "local"
      },
      {
        "label": "KDFWR Hazard City Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=952",
        "provider": "local"
      },
      {
        "label": "USGS 03277500 North Fork Kentucky River at Hazard",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03277500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03277500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03277500&parameterCd=00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "north-fork-kentucky-river-hazard-city-ramp-perry-county-park",
    "slug": "north-fork-kentucky-river-hazard-city-ramp-perry-county-park",
    "name": "North Fork Kentucky River",
    "reach": "Hazard City Ramp and Fishing Pier to Perry County Park Ramp",
    "aliases": [
      "North Fork Kentucky River - Hazard to Perry County Park",
      "North Fork River Trail Hazard",
      "North Fork Kentucky River downtown Hazard float"
    ],
    "state": "Kentucky",
    "region": "Eastern Kentucky",
    "summary": "Short public North Fork Kentucky River float through Hazard from the city ramp to Perry County Park. KDFWR documents the 4.8-mile segment and both public launches, while Perry County markets the same reach as the easy North Fork River Trail.",
    "statusText": "Use the North Fork Kentucky River at Hazard gauge. KDFWR rates the route low below 4.25 ft, good from 4.25 to 5.0 ft, and high above 5.0 ft.",
    "latitude": 37.2513,
    "longitude": -83.1962,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "low_head_dam",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "The Hazard City launch sits directly upstream from a low-head dam; stay in control at the ramp, launch cleanly, and do not linger in boil-affected water.",
        "Eastern Kentucky rain can raise the North Fork quickly and push wood into current lines even on this short in-town float.",
        "Steep or private banks limit easy informal exits outside the named public access points."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03277500",
      "provider": "usgs",
      "siteId": "03277500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "North Fork Kentucky River at Hazard, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03277500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 4.25,
      "idealMax": 5,
      "tooLow": 4.25,
      "tooHigh": 5,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for North Fork Kentucky River at Hazard",
        "url": "https://fw.ky.gov/Fish/Pages/NF-Kentucky-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This short Hazard float can work much of the warmer season, but the North Fork is still a flashy Appalachian river. Treat same-day rain, wood, and gauge trend as more important than the month.",
      "difficulty": "easy",
      "difficultyNotes": "Perry County presents this as an easy family float, and KDFWR says both accesses suit canoes, kayaks, and small john boats. The main consequence comes from the low-head-dam launch context and fast-rising muddy water, not from technical rapids.",
      "confidenceNotes": "Confidence is high for a conservative add: KDFWR publishes the exact 4.8-mile Hazard-to-Perry segment, official Hazard stage bands, and access-detail coordinates for both endpoints. Perry County separately markets the same reach as the North Fork River Trail, and direct USGS 03277500 returned same-day stage during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Hazard City Ramp to Perry County Park Ramp, 4.8 mi",
        "note": "KDFWR lists Hazard City Ramp to Perry County Park Ramp as a 4.8-mile North Fork Kentucky River segment in the access-mileage table.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/NF-Kentucky-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "4.25-5.0 ft",
        "note": "KDFWR rates the North Fork Kentucky River at Hazard as Low below 4.25 ft, Good from 4.25 to 5.0 ft, and High above 5.0 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/NF-Kentucky-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Hazard City Ramp, 37.2513, -83.1962",
        "note": "KDFWR lists the downtown Hazard City Ramp and Fishing Pier as a paved public launch behind city hall with published coordinates, restrooms, and parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=952"
      },
      {
        "label": "Take-out access",
        "value": "Perry County Park Ramp, 37.2783, -83.2088",
        "note": "KDFWR lists Perry County Park Ramp as the downstream public take-out with published coordinates and park amenities around the landing.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=491"
      },
      {
        "label": "Trail manager context",
        "value": "North Fork River Trail, easy, 2-3 hr",
        "note": "Perry County describes the same Hazard City Hall to Perry County Park reach as an easy approximately 5-mile North Fork River Trail and says to allow 2 to 3 hours.",
        "sourceUrl": "https://perrycounty.ky.gov/Pages/The-North-Fork-River-Trail.aspx"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 03277500 at 4.17 ft",
        "note": "USGS Water Services returned a same-day stage of 4.17 ft at 19:45 EDT on June 25, 2026 for the North Fork Kentucky River at Hazard.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03277500&parameterCd=00065&siteStatus=all"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR North Fork Kentucky River",
        "url": "https://fw.ky.gov/Fish/Pages/NF-Kentucky-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Hazard City Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=952",
        "provider": "local"
      },
      {
        "label": "KDFWR Perry County Park Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=491",
        "provider": "local"
      },
      {
        "label": "Perry County North Fork River Trail",
        "url": "https://perrycounty.ky.gov/Pages/The-North-Fork-River-Trail.aspx",
        "provider": "local"
      },
      {
        "label": "USGS 03277500 North Fork Kentucky River at Hazard",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03277500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03277500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03277500&parameterCd=00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "north-fork-kentucky-river-douthitt-park-roy-spencer",
    "slug": "north-fork-kentucky-river-douthitt-park-roy-spencer",
    "name": "North Fork Kentucky River",
    "reach": "Douthitt Park Ramp to Roy Spencer Ramp",
    "aliases": [
      "North Fork Kentucky River - Douthitt Park to Roy Spencer",
      "North Fork Kentucky River Jackson day float",
      "North Fork Kentucky River Jackson to KY 541"
    ],
    "state": "Kentucky",
    "region": "Eastern Kentucky",
    "summary": "Longer North Fork Kentucky River day from Jackson to the Roy Spencer access below KY 541. KDFWR publishes the exact 10.4-mile segment, official Jackson gauge bands, and source-backed coordinates for both public endpoints.",
    "statusText": "Use the North Fork Kentucky River at Jackson gauge. KDFWR rates the route low below 200 cfs or 1.6 ft, good from 200 to 500 cfs or 1.6 to 2.5 ft, and high above 500 cfs or 2.5 ft.",
    "latitude": 37.5598,
    "longitude": -83.4004,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "KDFWR warns that the Douthitt ramp does not reach the water at low summer and fall flows, so low-water launches can be muddy and awkward.",
        "A large rapid or waterfall sits 0.9 miles upstream of Douthitt Park; stay on the documented downstream day route and do not treat the launch as an upstream scouting base for that feature.",
        "This eastern Kentucky corridor can rise quickly after rain, and steep banks limit casual exits between the named access points."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03280000",
      "provider": "usgs",
      "siteId": "03280000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "North Fork Kentucky River at Jackson, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03280000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 200,
      "idealMax": 500,
      "tooLow": 200,
      "tooHigh": 500,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for North Fork Kentucky River at Jackson",
        "url": "https://fw.ky.gov/Fish/Pages/NF-Kentucky-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "Spring through fall are the practical seasons, but the North Fork still reacts quickly to mountain rain. Stable water matters more than calendar optimism on this longer Jackson-area day.",
      "difficulty": "moderate",
      "difficultyNotes": "The route is not technical whitewater, but 10.4 miles with few developed mid-route exits makes it more committed than the short Hazard float. Low water can leave shallow riffles and a dry launch lip; high water makes the broad river faster and muddier.",
      "confidenceNotes": "Confidence is good for a conservative add: KDFWR publishes the exact Douthitt-to-Roy mileage, official Jackson cfs and stage bands, and source-backed coordinates for both endpoints. Direct USGS 03280000 returned same-day discharge and stage during this run. Confidence stays slightly below the shorter Hazard route because the day is longer and the Douthitt ramp has explicit low-water limitations."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Douthitt Park Ramp to Roy Spencer Ramp, 10.4 mi",
        "note": "KDFWR lists Douthitt Park Ramp to Roy Spencer Ramp as a 10.4-mile North Fork Kentucky River segment in the access-mileage table.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/NF-Kentucky-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "200-500 cfs / 1.6-2.5 ft",
        "note": "KDFWR rates the North Fork Kentucky River at Jackson as Low below 200 cfs or 1.6 ft, Good from 200 to 500 cfs or 1.6 to 2.5 ft, and High above 500 cfs or 2.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/NF-Kentucky-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Douthitt Park Ramp, 37.5598, -83.4004",
        "note": "KDFWR lists Douthitt Park Ramp in Jackson as a paved public launch with published coordinates and notes that the ramp can stop short of the water at low flow.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=885"
      },
      {
        "label": "Take-out access",
        "value": "Roy Spencer Ramp, 37.6016, -83.4476",
        "note": "KDFWR lists Roy Spencer Ramp as the downstream public access below the KY 541 bridge with published coordinates and a small parking area.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=884"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 03280000 at 291 cfs / 1.66 ft",
        "note": "USGS Water Services returned same-day values at Jackson on June 25, 2026: discharge 291 cfs at 18:30 EDT and stage 1.66 ft at 19:00 EDT.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03280000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping support",
        "value": "Carr Creek Campground nearby",
        "note": "Carr Creek Campground lists utility-hookup campsites, grills, a beach, playground, showers, restrooms, and laundry as a separate drive-to basecamp for eastern Kentucky trips rather than on-route camping.",
        "sourceUrl": "https://parks.ky.gov/explore/carr-creek-campground-7869"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR North Fork Kentucky River",
        "url": "https://fw.ky.gov/Fish/Pages/NF-Kentucky-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Douthitt Park Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=885",
        "provider": "local"
      },
      {
        "label": "KDFWR Roy Spencer Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=884",
        "provider": "local"
      },
      {
        "label": "USGS 03280000 North Fork Kentucky River at Jackson",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03280000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03280000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03280000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "Carr Creek Campground",
        "url": "https://parks.ky.gov/explore/carr-creek-campground-7869",
        "provider": "local"
      }
    ]
  },
  {
    "id": "north-fork-kentucky-river-roy-spencer-beattyville",
    "slug": "north-fork-kentucky-river-roy-spencer-beattyville",
    "name": "North Fork Kentucky River",
    "reach": "Roy Spencer Ramp to Beattyville Ramp",
    "aliases": [
      "North Fork Kentucky River - Roy Spencer to Beattyville",
      "North Fork Kentucky River lower Jackson to Beattyville",
      "North Fork Kentucky River KY 541 to Beattyville"
    ],
    "state": "Kentucky",
    "region": "Eastern Kentucky",
    "summary": "Long lower-North-Fork route from Roy Spencer Ramp to Beattyville. KDFWR publishes the exact 34.0-mile segment, official Jackson gauge bands, and source-backed coordinates for both public endpoints.",
    "statusText": "Use the North Fork Kentucky River at Jackson gauge. KDFWR rates the route low below 200 cfs or 1.6 ft, good from 200 to 500 cfs or 1.6 to 2.5 ft, and high above 500 cfs or 2.5 ft.",
    "latitude": 37.6016,
    "longitude": -83.4476,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "This is a long remote-feeling eastern Kentucky float with few developed exits between the bridge launch and Beattyville.",
        "The North Fork can rise quickly after rain, and long muddy banks plus fresh wood make self-rescue or improvised stops less attractive than the mileage alone suggests.",
        "Beattyville is the planned finish. Do not continue downstream toward the confluence unless you have a separate route plan and lock-and-dam review."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03280000",
      "provider": "usgs",
      "siteId": "03280000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "North Fork Kentucky River at Jackson, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03280000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 200,
      "idealMax": 500,
      "tooLow": 200,
      "tooHigh": 500,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for North Fork Kentucky River at Jackson",
        "url": "https://fw.ky.gov/Fish/Pages/NF-Kentucky-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This lower North Fork route is best when the Jackson gauge is stable inside the KDFWR band. Rain and mountain runoff matter more than the calendar because the route is long and sparsely serviced.",
      "difficulty": "moderate",
      "difficultyNotes": "The water is not technical whitewater, but 34 miles with broad current, limited exits, and a downstream confluence approach make this a serious long-day route that casual paddlers should not underestimate.",
      "confidenceNotes": "Confidence is good for a guarded add: KDFWR publishes the exact Roy-Spencer-to-Beattyville 34.0-mile route, the official Jackson cfs and stage bands, and source-backed access-detail coordinates for both ramps. Direct USGS 03280000 returned same-day discharge and stage during this run, with 291 cfs / 1.66 ft comfortably inside the official band."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Roy Spencer Ramp to Beattyville Ramp, 34.0 mi",
        "note": "KDFWR lists Roy Spencer Ramp to Beattyville Ramp as a 34.0-mile North Fork Kentucky River segment in the access-mileage table.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/NF-Kentucky-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "200-500 cfs / 1.6-2.5 ft",
        "note": "KDFWR rates the North Fork Kentucky River at Jackson as Low below 200 cfs or 1.6 ft, Good from 200 to 500 cfs or 1.6 to 2.5 ft, and High above 500 cfs or 2.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/NF-Kentucky-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Roy Spencer Ramp, 37.6016, -83.4476",
        "note": "KDFWR lists Roy Spencer Ramp as the bridge-side public launch below KY 541 with published coordinates, a small paved lot, and a picnic shelter.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=884"
      },
      {
        "label": "Take-out access",
        "value": "Beattyville Ramp, 37.5707, -83.7027",
        "note": "KDFWR lists Beattyville Ramp as a two-lane public launch off Water Street with published coordinates, large paved parking, and a fishing pier near the North and South Fork confluence area.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=311"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 03280000 at 291 cfs / 1.66 ft",
        "note": "USGS Water Services returned same-day Jackson values on July 3, 2026: 291 cfs at 18:30 EDT and 1.66 ft at 19:00 EDT.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03280000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Long rural lower-river day into Beattyville",
        "note": "KDFWR says the Beattyville finish is a fully developed public ramp near the confluence while the Roy Spencer put-in is a simpler bridge access, making this a long committed rural float with few developed mid-route exits.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/NF-Kentucky-River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR North Fork Kentucky River",
        "url": "https://fw.ky.gov/Fish/Pages/NF-Kentucky-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Roy Spencer Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=884",
        "provider": "local"
      },
      {
        "label": "KDFWR Beattyville Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=311",
        "provider": "local"
      },
      {
        "label": "USGS 03280000 North Fork Kentucky River at Jackson",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03280000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03280000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03280000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "north-fork-kentucky-river-watts-perry-county-park",
    "slug": "north-fork-kentucky-river-watts-perry-county-park",
    "name": "North Fork Kentucky River",
    "reach": "Watts Ramp to Perry County Park Ramp",
    "aliases": [
      "North Fork Kentucky River - Watts to Perry County Park",
      "North Fork Kentucky River Ulvah to Perry County Park",
      "North Fork Kentucky River extended Hazard corridor"
    ],
    "state": "Kentucky",
    "region": "Eastern Kentucky",
    "summary": "Extended upper Hazard corridor from Watts Ramp to Perry County Park. KDFWR supports the route by chaining its exact Watts-to-Hazard and Hazard-to-Perry County mileage table against the official Hazard gauge bands.",
    "statusText": "Use the North Fork Kentucky River at Hazard gauge. KDFWR rates the route low below 4.25 ft, good from 4.25 to 5.0 ft, and high above 5.0 ft.",
    "latitude": 37.1283,
    "longitude": -83.0519,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "This is a long upper-North-Fork route with only one developed midpoint at Hazard and a quieter public finish at Perry County Park.",
        "KDFWR describes the Watts reach as relatively shallow with numerous riffles, and the drainage can rise quickly after rain while carrying fresh wood into the channel.",
        "Most banks away from the named accesses should be treated as private, muddy, or too steep for casual emergency stops."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03277500",
      "provider": "usgs",
      "siteId": "03277500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "North Fork Kentucky River at Hazard, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03277500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 4.25,
      "idealMax": 5,
      "tooLow": 4.25,
      "tooHigh": 5,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for North Fork Kentucky River at Hazard",
        "url": "https://fw.ky.gov/Fish/Pages/NF-Kentucky-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This longer upper-Hazard continuation can work across the warmer season when the Hazard gauge stays in shape, but runoff and wood matter more than the month.",
      "difficulty": "moderate",
      "difficultyNotes": "The water is not technical, but 27 miles with riffles, limited exits, and a below-band slowdown risk make this a committed all-day route rather than a casual float.",
      "confidenceNotes": "Confidence is good for a conservative add: KDFWR publishes Watts Ramp to Hazard City Ramp at 22.2 miles and Hazard City Ramp to Perry County Park at 4.8 miles, which support this 27.0-mile continuation on one official Hazard gauge model. Direct USGS 03277500 returned a same-day stage of 4.10 ft during this run, which keeps the live path current while honestly flagging a slightly below-band day."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Watts Ramp to Perry County Park Ramp, about 27.0 mi",
        "note": "KDFWR lists Watts Ramp to Hazard City Ramp at 22.2 miles and Hazard City Ramp to Perry County Park at 4.8 miles, supporting this longer upper-North-Fork continuation of about 27.0 miles.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/NF-Kentucky-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "4.25-5.0 ft",
        "note": "KDFWR rates the North Fork Kentucky River at Hazard as Low below 4.25 ft, Good from 4.25 to 5.0 ft, and High above 5.0 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/NF-Kentucky-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Watts Ramp, 37.1283, -83.0519",
        "note": "KDFWR lists Watts Ramp as a paved public launch under the Watts Drive bridge in Ulvah with published coordinates and unpaved parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1126"
      },
      {
        "label": "Take-out access",
        "value": "Perry County Park Ramp, 37.2783, -83.2088",
        "note": "KDFWR lists Perry County Park Ramp as a paved public launch with published coordinates, restrooms, parking, and other developed park amenities.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=491"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 03277500 at 4.10 ft",
        "note": "USGS Water Services returned a same-day stage of 4.10 ft at 19:45 EDT on July 3, 2026 for the North Fork Kentucky River at Hazard.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03277500&parameterCd=00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Long shallow-riffle upper-river day into Perry County Park",
        "note": "KDFWR describes the Watts reach as relatively shallow with numerous riffles and documents Perry County Park as the next developed downstream public finish after Hazard.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/NF-Kentucky-River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR North Fork Kentucky River",
        "url": "https://fw.ky.gov/Fish/Pages/NF-Kentucky-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Watts Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1126",
        "provider": "local"
      },
      {
        "label": "KDFWR Perry County Park Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=491",
        "provider": "local"
      },
      {
        "label": "USGS 03277500 North Fork Kentucky River at Hazard",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03277500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03277500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03277500&parameterCd=00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "south-fork-licking-river-lair-ramp-terry-dam",
    "slug": "south-fork-licking-river-lair-ramp-terry-dam",
    "name": "South Fork Licking River",
    "reach": "Lair Ramp to Terry Dam Ramp",
    "aliases": [
      "South Fork Licking River - Lair to Terry Dam",
      "South Fork Licking River Airport Ramp float",
      "South Fork Licking River Blue Water Trail"
    ],
    "state": "Kentucky",
    "region": "Northern Kentucky",
    "summary": "Gentle South Fork Licking River float from Lair to Terry Dam near Cynthiana. KDFWR names the exact 5-mile route on the Blue Water Trails page, supports both public endpoints with source-backed coordinates, and publishes official Cynthiana and Hayes gauge bands.",
    "statusText": "Use the South Fork Licking River at Cynthiana gauge. KDFWR rates the route low below 4.0 ft, good from 4.0 to 5.0 ft, and high above 5.0 ft.",
    "latitude": 38.3412,
    "longitude": -84.3014,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "low_head_dam",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "The float finishes in the pool above Terry Dam, and KDFWR says a low-head dam sits 2.5 miles downstream of the Terry take-out. Stay alert for the left-bank take-out and do not drift past it.",
        "The Blue Water Trails article describes braided shallow sections near the start that can require dragging at low water and collect fresh wood.",
        "Most banks outside the named accesses should be treated as private or muddy rather than casual stop points."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03252500",
      "provider": "usgs",
      "siteId": "03252500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "South Fork Licking River at Cynthiana, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03252500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 4,
      "idealMax": 5,
      "tooLow": 4,
      "tooHigh": 5,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for South Fork Licking River at Cynthiana",
        "url": "https://fw.ky.gov/Fish/Pages/South-Fork-Licking-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "KDFWR frames this as a gentle fall-friendly family float, but the braided headwater stretches still respond to rain and can get scrappy in lower water. Stable levels matter more than the season label.",
      "difficulty": "easy",
      "difficultyNotes": "KDFWR presents Lair to Terry Dam as a beginner-friendly family float with gentle current, long pools, and no technical rapids. The main challenge is low-water dragging through braided shallows and making the Terry take-out cleanly above the downstream dam pool.",
      "confidenceNotes": "Confidence is good for a guarded add: KDFWR's Blue Water Trails page names this exact 5-mile Lair-to-Terry route, the fish page publishes official Cynthiana and Hayes threshold bands, and access-detail pages provide source-backed coordinates for both ramps. Direct USGS 03252500 and 03253000 returned same-day stage and flow during this run, clearing the long-standing live-data blocker."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Lair Ramp to Terry Dam Ramp, 5 mi",
        "note": "The KDFWR South Fork Licking River Blue Water Trails page names Lair Ramp to Terry Dam Ramp as a 5-mile float and describes the route character in detail.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/South-Fork-Licking-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "4.0-5.0 ft at Cynthiana; 150-400 cfs at Hayes",
        "note": "KDFWR rates South Fork Licking at Cynthiana as Low below 4.0 ft, Good from 4.0 to 5.0 ft, High above 5.0 ft, and separately rates Hayes flow Low below 150 cfs, Good from 150 to 400 cfs, and High above 400 cfs.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/South-Fork-Licking-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Lair Ramp, 38.3412, -84.3014",
        "note": "KDFWR lists Lair Ramp as a public paved launch beside the bridge on Old Lair Road with published coordinates and small gravel parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1069"
      },
      {
        "label": "Take-out access",
        "value": "Terry Dam Ramp, 38.3693, -84.2919",
        "note": "KDFWR lists Terry Dam Ramp, also called the Airport Ramp on the Blue Water Trails page, as the downstream public take-out with published coordinates and warns about the low-head dam 2.5 miles farther downstream.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=238"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 03252500 at 5.52 ft; USGS 03253000 at 1,110 cfs / 5.16 ft",
        "note": "USGS Water Services returned same-day values on June 25, 2026: the Cynthiana gauge showed 5.52 ft at 19:30 EDT, and the Hayes gauge showed 1,110 cfs and 5.16 ft at 19:15 EDT, both above the KDFWR good band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03252500,03253000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping support",
        "value": "Kincaid Lake Campground nearby",
        "note": "Kincaid Lake Campground lists open-woodland campsites with electric and water hookups, a grocery, playground, and central showers/restrooms as a nearby basecamp option rather than on-route camping.",
        "sourceUrl": "https://parks.ky.gov/explore/kincaid-lake-campground-8054"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR South Fork Licking River",
        "url": "https://fw.ky.gov/Fish/Pages/South-Fork-Licking-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR South Fork Licking River Blue Water Trails page",
        "url": "https://fw.ky.gov/Education/Pages/South-Fork-Licking-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Lair Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1069",
        "provider": "local"
      },
      {
        "label": "KDFWR Terry Dam Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=238",
        "provider": "local"
      },
      {
        "label": "USGS 03252500 South Fork Licking River at Cynthiana",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03252500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03253000 South Fork Licking River at Hayes",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03253000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03252500 and 03253000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03252500,03253000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "Kincaid Lake Campground",
        "url": "https://parks.ky.gov/explore/kincaid-lake-campground-8054",
        "provider": "local"
      }
    ]
  },
  {
    "id": "tradewater-river-bellville-montezuma",
    "slug": "tradewater-river-bellville-montezuma",
    "name": "Tradewater River",
    "reach": "Bellville Road Access to Montezuma Bridge Ramp",
    "aliases": [
      "Tradewater River - Bellville Road to Montezuma Bridge",
      "Tradewater River - Bellville to Montezuma",
      "Tradewater Providence segment"
    ],
    "state": "Kentucky",
    "region": "Western Kentucky",
    "summary": "Rural western-Kentucky Tradewater float from Bellville Road Access to Montezuma Bridge Ramp with KDFWR public accesses, official Providence-gauge bands, and a same-day USGS live path that finally clears the old gauge blocker.",
    "statusText": "Use the Tradewater River at Providence gauge. KDFWR rates 5 to 50 cfs, or 10 to 15 ft, as good. Below that is low; above that is high, woody, and flashy enough that casual paddlers should stand down.",
    "latitude": 37.381,
    "longitude": -87.8001,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "KDFWR describes the Tradewater as extremely flashy, with rain events capable of raising the river very fast.",
        "Woody debris, braided channels, and strainers are ordinary hazards on this corridor even when the official gauge is in range.",
        "Both public accesses border private property; use the signed ramps and legal public landings rather than treating banks as open stops."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03384100",
      "provider": "usgs",
      "siteId": "03384100",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Tradewater River at Providence, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03384100/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 5,
      "idealMax": 50,
      "tooLow": 5,
      "tooHigh": 50,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Tradewater River at Providence",
        "url": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "KDFWR positions the Tradewater as a warm-season small-river float, but the river is flashy enough that recent and forecast rain matter more than a rough seasonal assumption. Expect changing wood and muddy landings after storms.",
      "difficulty": "easy",
      "difficultyNotes": "At normal levels this is a gentle western-Kentucky river float, but the combination of long rural mileage, wood, braided current lines, and limited bailout options makes it more serious than a park pond paddle.",
      "confidenceNotes": "Confidence is good for this exact public segment: KDFWR publishes the Bellville-to-Montezuma mileage, official Providence gauge bands, route character notes, and access detail pages with coordinates for both endpoints. USGS 03384100 now returns same-day June 22, 2026 discharge and gage-height values through Water Services, clearing the previous no-live-gauge blocker. The route still ships with strong flashy-water warnings because the same-day Providence reading was far above the KDFWR good band."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Bellville Road Access to Montezuma Bridge Ramp, 9.2 mi",
        "note": "KDFWR lists Bellville Road Access to Montezuma Bridge Ramp as a 9.2-mile Tradewater segment in the official access-mileage table.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx"
      },
      {
        "label": "Official level band",
        "value": "5-50 cfs / 10-15 ft",
        "note": "KDFWR rates the Providence gauge low below 5 cfs or 10.0 ft, good from 5.0 to 50.0 cfs or 10.0 to 15.0 ft, and high above 50.0 cfs or 15.0 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Bellville Road Access, 37.3810, -87.8001",
        "note": "KDFWR lists Bellville Road Access as a free carry-down launch with unpaved parking and published coordinates.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1202"
      },
      {
        "label": "Take-out access",
        "value": "Montezuma Bridge Ramp, 37.3967, -87.8446",
        "note": "KDFWR lists Montezuma Bridge Ramp as a free year-round carry-down access with a few parking spots and published coordinates.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=660"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 03384100 at 1090 cfs / 20.36 ft",
        "note": "USGS Water Services returned same-day Tradewater River at Providence discharge and gage-height values at 10:45 CDT on June 22, 2026.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03384100&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping support",
        "value": "No endpoint campground support",
        "note": "KDFWR treats Bellville and Montezuma as simple access sites rather than campgrounds, so this route ships as a day-trip float without endpoint camping assumptions.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Tradewater River",
        "url": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Bellville Road Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1202",
        "provider": "local"
      },
      {
        "label": "KDFWR Montezuma Bridge Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=660",
        "provider": "local"
      },
      {
        "label": "USGS 03384100 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03384100/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03384100 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03384100&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "Wikimedia Commons Tradewater River image source",
        "url": "https://commons.wikimedia.org/wiki/File:Tradewater_River_4899.JPG",
        "provider": "local"
      }
    ]
  },
  {
    "id": "tradewater-river-bellville-fishtrap",
    "slug": "tradewater-river-bellville-fishtrap",
    "name": "Tradewater River",
    "reach": "Bellville Road Access to Fishtrap Bridge Ramp",
    "aliases": [
      "Tradewater River - Bellville Road to Fishtrap Bridge",
      "Tradewater River - Bellville to Fishtrap",
      "Tradewater extended Providence segment"
    ],
    "state": "Kentucky",
    "region": "Western Kentucky",
    "summary": "Longer Providence-area Tradewater float from Bellville Road Access to Fishtrap Bridge Ramp. KDFWR supports the chained 15.9-mile public route with official access-to-access mileage, public endpoint coordinates, and the Providence gauge sitting in the upstream corridor.",
    "statusText": "Use the Tradewater River at Providence gauge. KDFWR rates 5 to 50 cfs, or 10 to 15 ft, as good. Recent rain can leave the stage inside band while the discharge still runs high, so treat flashy weather and fresh wood as deciding factors before committing to this longer day.",
    "latitude": 37.381,
    "longitude": -87.8001,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "KDFWR describes the Tradewater as extremely flashy, with rain events capable of raising the river very fast.",
        "Woody debris, braided channels, and strainers are ordinary hazards on this corridor even when the official gauge is near the recommended band.",
        "All three public landings sit in rural private-bank country. Use the signed accesses and do not treat mid-route banks as open public stops."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03384100",
      "provider": "usgs",
      "siteId": "03384100",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Tradewater River near Providence, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03384100/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 5,
      "idealMax": 50,
      "tooLow": 5,
      "tooHigh": 50,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Tradewater River at Providence",
        "url": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "KDFWR positions the Tradewater as a warm-season small-river float, but same-day and forecast rain matter more than a rough seasonal assumption because this drainage responds quickly and can move wood after every storm.",
      "difficulty": "moderate",
      "difficultyNotes": "This remains a gentle western-Kentucky river at ordinary levels, but 15.9 miles of rural mileage, sparse bailout options, wood, braided current lines, and flashy runoff make it a committed moderate day rather than a casual float.",
      "confidenceNotes": "Confidence is good for a conservative Kentucky add: KDFWR still lists Bellville-to-Montezuma at 9.2 miles and Montezuma-to-Fishtrap at 6.7 miles, supporting this 15.9-mile public chain. Current KDFWR access-detail pages still expose endpoint coordinates and public-use notes for Bellville and Fishtrap, and direct USGS Water Services returned same-day Providence values of 741 cfs and 17.68 ft on July 10, 2026. The route still ships with strong flashy-water caution because both the discharge and stage sat above the KDFWR good band."
    },
    "evidenceNotes": [
      {
        "label": "Official route chain",
        "value": "Bellville Road Access to Fishtrap Bridge Ramp, about 15.9 mi",
        "note": "KDFWR lists Bellville to Montezuma as 9.2 miles and Montezuma to Fishtrap as 6.7 miles, supporting a combined public Tradewater route of about 15.9 miles.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx"
      },
      {
        "label": "Official level band",
        "value": "5-50 cfs / 10-15 ft at Providence",
        "note": "KDFWR rates the Providence gauge low below 5 cfs or 10.0 ft, good from 5.0 to 50.0 cfs or 10.0 to 15.0 ft, and high above 50.0 cfs or 15.0 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Bellville Road Access, 37.3810, -87.8001",
        "note": "KDFWR lists Bellville Road Access as a free carry-down launch with unpaved parking and published coordinates.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1202"
      },
      {
        "label": "Take-out access",
        "value": "Fishtrap Bridge Ramp, 37.3988, -87.9049",
        "note": "KDFWR lists Fishtrap Bridge Ramp as a free carry-down access with published coordinates at the bridge landing.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1203"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 03384100 at 741 cfs / 17.68 ft",
        "note": "USGS Water Services returned same-day July 10, 2026 discharge and gage-height values for Tradewater River near Providence at 08:45 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03384100&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping support",
        "value": "No endpoint campground support",
        "note": "KDFWR treats Bellville and Fishtrap as simple access sites rather than campgrounds, so this route ships as a day-trip float without camping assumptions.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Tradewater River",
        "url": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Bellville Road Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1202",
        "provider": "local"
      },
      {
        "label": "KDFWR Fishtrap Bridge Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1203",
        "provider": "local"
      },
      {
        "label": "USGS 03384100 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03384100/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03384100 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03384100&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "Wikimedia Commons Tradewater River image source",
        "url": "https://commons.wikimedia.org/wiki/File:Tradewater_River_4899.JPG",
        "provider": "local"
      }
    ]
  },
  {
    "id": "tradewater-river-bellville-vfw-bridge",
    "slug": "tradewater-river-bellville-vfw-bridge",
    "name": "Tradewater River",
    "reach": "Bellville Road Access to VFW Bridge Ramp",
    "aliases": [
      "Tradewater River - Bellville Road to VFW Bridge",
      "Tradewater River - Bellville to VFW",
      "Tradewater long Providence combination segment"
    ],
    "state": "Kentucky",
    "region": "Western Kentucky",
    "summary": "Very long lower Tradewater float from Bellville Road Access to VFW Bridge Ramp. KDFWR supports the chained 25.4-mile public route with official access-to-access mileage, public endpoint coordinates, and the Providence gauge sitting directly on the upper corridor.",
    "statusText": "Use the Tradewater River at Providence gauge. KDFWR rates 5 to 50 cfs, or 10 to 15 ft, as good, but this 25.4-mile day should stay conservative because rain can leave the discharge high, wood fresh, and the lower river more committed than the stage alone suggests.",
    "latitude": 37.381,
    "longitude": -87.8001,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "KDFWR describes the Tradewater as extremely flashy, with rain events capable of raising the river very fast.",
        "Woody debris, braided channels, and strainers are ordinary hazards on this corridor even when the official gauge is near the recommended band.",
        "This long route stays in private-bank country for most of the day. Use the signed public accesses and do not treat mid-route banks or bars as assumed public support."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03384100",
      "provider": "usgs",
      "siteId": "03384100",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Tradewater River near Providence, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03384100/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 5,
      "idealMax": 50,
      "tooLow": 5,
      "tooHigh": 50,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Tradewater River at Providence",
        "url": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "Warm-season weather helps with daylight on a 25.4-mile day, but recent rain, forecast rain, and fresh wood matter more than a rough seasonal assumption on a river this flashy.",
      "difficulty": "moderate",
      "difficultyNotes": "The current is still a gentle western-Kentucky river at ordinary levels, but 25.4 miles of rural mileage, sparse bailout options, wood, braided current lines, and private-bank limits make this a serious all-day commitment.",
      "confidenceNotes": "Confidence is good for a conservative Kentucky add: KDFWR still lists Bellville-to-Montezuma at 9.2 miles, Montezuma-to-Fishtrap at 6.7 miles, and Fishtrap-to-VFW at 9.5 miles, supporting this 25.4-mile public chain. Current KDFWR access-detail pages still expose coordinates and public-use notes for Bellville and VFW, and direct USGS Water Services returned same-day Providence values of 741 cfs and 17.68 ft on July 10, 2026. The route still ships with strong flashy-water caution because both the discharge and stage sat above the KDFWR good band."
    },
    "evidenceNotes": [
      {
        "label": "Official route chain",
        "value": "Bellville Road Access to VFW Bridge Ramp, about 25.4 mi",
        "note": "KDFWR lists Bellville to Montezuma as 9.2 miles, Montezuma to Fishtrap as 6.7 miles, and Fishtrap to VFW as 9.5 miles, supporting a combined public Tradewater route of about 25.4 miles.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx"
      },
      {
        "label": "Official level band",
        "value": "5-50 cfs / 10-15 ft at Providence",
        "note": "KDFWR rates the Providence gauge low below 5 cfs or 10.0 ft, good from 5.0 to 50.0 cfs or 10.0 to 15.0 ft, and high above 50.0 cfs or 15.0 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Bellville Road Access, 37.3810, -87.8001",
        "note": "KDFWR lists Bellville Road Access as a free carry-down launch with unpaved parking and published coordinates.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1202"
      },
      {
        "label": "Take-out access",
        "value": "VFW Bridge Ramp, 37.4794, -87.9539",
        "note": "KDFWR lists VFW Bridge Ramp as a free paved public ramp with published coordinates and a large gravel-and-grass parking area.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=619"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 03384100 at 741 cfs / 17.68 ft",
        "note": "USGS Water Services returned same-day July 10, 2026 discharge and gage-height values for Tradewater River near Providence at 08:45 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03384100&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping support",
        "value": "No endpoint campground support",
        "note": "KDFWR treats Bellville and VFW as simple access sites rather than campgrounds, so this route ships as a day-trip float without camping assumptions.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Tradewater River",
        "url": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Bellville Road Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1202",
        "provider": "local"
      },
      {
        "label": "KDFWR VFW Bridge Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=619",
        "provider": "local"
      },
      {
        "label": "USGS 03384100 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03384100/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03384100 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03384100&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "Wikimedia Commons Tradewater River image source",
        "url": "https://commons.wikimedia.org/wiki/File:Tradewater_River_4899.JPG",
        "provider": "local"
      }
    ]
  },
  {
    "id": "tradewater-river-montezuma-fishtrap",
    "slug": "tradewater-river-montezuma-fishtrap",
    "name": "Tradewater River",
    "reach": "Montezuma Bridge Ramp to Fishtrap Bridge Ramp",
    "aliases": [
      "Tradewater River - Montezuma Bridge to Fishtrap Bridge",
      "Tradewater River - Montezuma to Fishtrap",
      "Tradewater lower Providence segment"
    ],
    "state": "Kentucky",
    "region": "Western Kentucky",
    "summary": "Downstream Tradewater continuation from Montezuma Bridge Ramp to Fishtrap Bridge Ramp with KDFWR public accesses, official Providence-gauge bands, and the Providence gauge sitting directly at the put-in corridor.",
    "statusText": "Use the Tradewater River at Providence gauge. KDFWR rates 5 to 50 cfs, or 10 to 15 ft, as good. Below that is low; above that is high, woody, and flashy enough that casual paddlers should stand down.",
    "latitude": 37.3967,
    "longitude": -87.8446,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "KDFWR describes the Tradewater as extremely flashy, with rain events capable of raising the river very fast.",
        "Woody debris, braided channels, and strainers are ordinary hazards on this corridor even when the official gauge is in range.",
        "Both public accesses border private property; use the signed ramps and legal public landings rather than treating banks as open stops."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03384100",
      "provider": "usgs",
      "siteId": "03384100",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Tradewater River near Providence, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03384100/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 5,
      "idealMax": 50,
      "tooLow": 5,
      "tooHigh": 50,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Tradewater River at Providence",
        "url": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "KDFWR positions the Tradewater as a warm-season small-river float, but the river is flashy enough that recent and forecast rain matter more than a rough seasonal assumption. Expect changing wood and muddy landings after storms.",
      "difficulty": "easy",
      "difficultyNotes": "At normal levels this is a gentle western-Kentucky river float, but the combination of rural mileage, wood, braided current lines, and limited bailout options makes it more serious than a park pond paddle.",
      "confidenceNotes": "Confidence is good for this exact public segment: KDFWR publishes the Montezuma-to-Fishtrap mileage, official Providence gauge bands, route character notes, and access detail pages with coordinates for both endpoints. USGS 03384100 returned same-day June 26, 2026 discharge and gage-height values through Water Services, and the gauge is essentially at the Montezuma put-in. The route still ships with strong flashy-water warnings because the same-day Providence reading was above the KDFWR discharge band."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Montezuma Bridge Ramp to Fishtrap Bridge Ramp, 6.7 mi",
        "note": "KDFWR lists Montezuma Bridge Ramp to Fishtrap Bridge Ramp as a 6.7-mile Tradewater segment in the official access-mileage table.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx"
      },
      {
        "label": "Official level band",
        "value": "5-50 cfs / 10-15 ft",
        "note": "KDFWR rates the Providence gauge low below 5 cfs or 10.0 ft, good from 5.0 to 50.0 cfs or 10.0 to 15.0 ft, and high above 50.0 cfs or 15.0 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Montezuma Bridge Ramp, 37.3967, -87.8446",
        "note": "KDFWR lists Montezuma Bridge Ramp as a free year-round carry-down access with published coordinates.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=660"
      },
      {
        "label": "Take-out access",
        "value": "Fishtrap Bridge Ramp, 37.3988, -87.9049",
        "note": "KDFWR lists Fishtrap Bridge Ramp as a free carry-down access with published coordinates at the bridge landing.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1203"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 03384100 at 211 cfs / 12.66 ft",
        "note": "USGS current conditions returned same-day Tradewater River near Providence discharge and gage-height values at 12:45 AM CDT on June 26, 2026.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03384100&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping support",
        "value": "No endpoint campground support",
        "note": "KDFWR treats Montezuma and Fishtrap as simple access sites rather than campgrounds, so this route ships as a day-trip float without camping assumptions.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Tradewater River",
        "url": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Montezuma Bridge Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=660",
        "provider": "local"
      },
      {
        "label": "KDFWR Fishtrap Bridge Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1203",
        "provider": "local"
      },
      {
        "label": "USGS 03384100 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03384100/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03384100 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03384100&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "Wikimedia Commons Tradewater River image source",
        "url": "https://commons.wikimedia.org/wiki/File:Tradewater_River_4899.JPG",
        "provider": "local"
      }
    ]
  },
  {
    "id": "tradewater-river-fishtrap-vfw-bridge",
    "slug": "tradewater-river-fishtrap-vfw-bridge",
    "name": "Tradewater River",
    "reach": "Fishtrap Bridge Ramp to VFW Bridge Ramp",
    "aliases": [
      "Tradewater River - Fishtrap Bridge to VFW Bridge",
      "Tradewater River - Fishtrap to VFW",
      "Tradewater lower western Kentucky segment"
    ],
    "state": "Kentucky",
    "region": "Western Kentucky",
    "summary": "Longer lower Tradewater float from Fishtrap Bridge Ramp to VFW Bridge Ramp with KDFWR public accesses, official Providence-gauge bands, and a conservative upstream same-river gauge proxy.",
    "statusText": "There is not a gauge on this exact lower stretch, so Paddle Today uses the upstream Tradewater River at Providence gauge as a conservative same-river proxy. KDFWR rates 5 to 50 cfs, or 10 to 15 ft, as good at Providence; below that is low, and above that expect flashy, woody current downstream.",
    "latitude": 37.3988,
    "longitude": -87.9049,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "KDFWR describes the Tradewater as extremely flashy, with rain events capable of raising the river very fast.",
        "Woody debris, braided channels, and strainers are ordinary hazards on this corridor even when the upstream gauge is in range.",
        "Both public accesses border private property; use the signed ramps and legal public landings rather than treating banks as open stops."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03384100",
      "provider": "usgs",
      "siteId": "03384100",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Tradewater River near Providence, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03384100/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 5,
      "idealMax": 50,
      "tooLow": 5,
      "tooHigh": 50,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Tradewater River at Providence used as an upstream proxy",
        "url": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "KDFWR positions the Tradewater as a warm-season small-river float, but the river is flashy enough that recent and forecast rain matter more than a rough seasonal assumption. Expect changing wood and muddy landings after storms.",
      "difficulty": "easy",
      "difficultyNotes": "At normal levels this is a gentle western-Kentucky river float, but the combination of longer rural mileage, wood, braided current lines, and sparse services makes it more serious than a park pond paddle.",
      "confidenceNotes": "Route and access confidence is good: KDFWR publishes the Fishtrap-to-VFW mileage, route character notes, and access detail pages with coordinates for both endpoints. Threshold confidence is intentionally lower than the Montezuma route because the selected Providence gauge is upstream, not on the exact VFW corridor. The app still uses the official KDFWR two-sided Providence model because KDFWR applies that gauge family to this lower Tradewater access chain and no cleaner downstream live gauge surfaced."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Fishtrap Bridge Ramp to VFW Bridge Ramp, 9.5 mi",
        "note": "KDFWR lists Fishtrap Bridge Ramp to VFW Bridge Ramp as a 9.5-mile Tradewater segment in the official access-mileage table.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx"
      },
      {
        "label": "Official level band",
        "value": "5-50 cfs / 10-15 ft at Providence",
        "note": "KDFWR rates the Providence gauge low below 5 cfs or 10.0 ft, good from 5.0 to 50.0 cfs or 10.0 to 15.0 ft, and high above 50.0 cfs or 15.0 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Fishtrap Bridge Ramp, 37.3988, -87.9049",
        "note": "KDFWR lists Fishtrap Bridge Ramp as a free carry-down access with published coordinates at the bridge landing.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1203"
      },
      {
        "label": "Take-out access",
        "value": "VFW Bridge Ramp, 37.4794, -87.9539",
        "note": "KDFWR lists VFW Bridge Ramp as a free paved public ramp with published coordinates and a large gravel-and-grass parking area.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=619"
      },
      {
        "label": "Proxy live gauge",
        "value": "USGS 03384100 at 211 cfs / 12.66 ft",
        "note": "USGS current conditions returned same-day Tradewater River near Providence discharge and gage-height values at 12:45 AM CDT on June 26, 2026. The gauge is upstream of this lower route and is used conservatively as the closest official same-river signal surfaced in KDFWR guidance.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03384100&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping support",
        "value": "No endpoint campground support",
        "note": "KDFWR treats Fishtrap and VFW as simple access sites rather than campgrounds, so this route ships as a day-trip float without camping assumptions.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Tradewater River",
        "url": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Fishtrap Bridge Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1203",
        "provider": "local"
      },
      {
        "label": "KDFWR VFW Bridge Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=619",
        "provider": "local"
      },
      {
        "label": "USGS 03384100 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03384100/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03384100 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03384100&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "Wikimedia Commons Tradewater River image source",
        "url": "https://commons.wikimedia.org/wiki/File:Tradewater_River_4899.JPG",
        "provider": "local"
      }
    ]
  },
  {
    "id": "tradewater-river-vfw-bridge-granger-landing",
    "slug": "tradewater-river-vfw-bridge-granger-landing",
    "name": "Tradewater River",
    "reach": "VFW Bridge Ramp to Granger Landing Ramp",
    "aliases": [
      "Tradewater River - VFW Bridge to Granger Landing",
      "Tradewater River - VFW to Granger",
      "Tradewater Sturgis segment"
    ],
    "state": "Kentucky",
    "region": "Western Kentucky",
    "summary": "Lower Tradewater finish from VFW Bridge Ramp to Granger Landing Ramp with KDFWR public accesses, official Providence-gauge bands, and a conservative upstream same-river gauge proxy for the Sturgis corridor.",
    "statusText": "There is not a gauge on this exact lower stretch, so Paddle Today uses the upstream Tradewater River at Providence gauge as a conservative same-river proxy. KDFWR rates 5 to 50 cfs, or 10 to 15 ft, as good at Providence; below that is low, and above that expect flashy, woody current downstream.",
    "latitude": 37.4794,
    "longitude": -87.9539,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "KDFWR describes the Tradewater as extremely flashy, with rain events capable of raising the river very fast.",
        "Woody debris, braided channels, and strainers are ordinary hazards on this corridor even when the upstream gauge is in range.",
        "Both public accesses border private property or limited public shoreline; use the signed ramps and legal public landings rather than treating banks as open stops."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03384100",
      "provider": "usgs",
      "siteId": "03384100",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Tradewater River near Providence, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03384100/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 5,
      "idealMax": 50,
      "tooLow": 5,
      "tooHigh": 50,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Tradewater River at Providence used as an upstream proxy",
        "url": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "KDFWR positions the Tradewater as a warm-season small-river float, but the river is flashy enough that recent and forecast rain matter more than a rough seasonal assumption. Expect changing wood and muddy landings after storms.",
      "difficulty": "easy",
      "difficultyNotes": "At normal levels this is a gentle western-Kentucky river float, but the combination of rural mileage, wood, limited services, and a fully committed shuttle still makes it more serious than a casual park float.",
      "confidenceNotes": "Route and access confidence is good: KDFWR publishes the VFW-to-Granger mileage, route character notes, and access detail pages with coordinates for both endpoints. Threshold confidence is intentionally lower because the selected Providence gauge is upstream, not on the exact Sturgis corridor. The app still uses the official KDFWR two-sided Providence model because KDFWR applies that gauge family to this lower Tradewater access chain and no cleaner downstream live gauge surfaced."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "VFW Bridge Ramp to Granger Landing Ramp, 10.6 mi",
        "note": "KDFWR lists VFW Bridge Ramp to Granger Landing Ramp as a 10.6-mile Tradewater segment in the official access-mileage table.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx"
      },
      {
        "label": "Official level band",
        "value": "5-50 cfs / 10-15 ft at Providence",
        "note": "KDFWR rates the Providence gauge low below 5 cfs or 10.0 ft, good from 5.0 to 50.0 cfs or 10.0 to 15.0 ft, and high above 50.0 cfs or 15.0 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "VFW Bridge Ramp, 37.4794, -87.9539",
        "note": "KDFWR lists VFW Bridge Ramp as a free paved public ramp with published coordinates and a large gravel-and-grass parking area.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=619"
      },
      {
        "label": "Take-out access",
        "value": "Granger Landing Ramp, 37.5463, -88.0189",
        "note": "KDFWR lists Granger Landing Ramp as a free paved public ramp with published coordinates near Sturgis.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=618"
      },
      {
        "label": "Proxy live gauge",
        "value": "USGS 03384100 at 211 cfs / 12.66 ft",
        "note": "USGS current conditions returned same-day Tradewater River near Providence discharge and gage-height values at 12:45 AM CDT on June 26, 2026. The gauge is upstream of this lower route and is used conservatively as the closest official same-river signal surfaced in KDFWR guidance.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03384100&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping support",
        "value": "No endpoint campground support",
        "note": "KDFWR treats VFW and Granger as simple access sites rather than campgrounds, so this route ships as a day-trip float without camping assumptions.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Tradewater River",
        "url": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR VFW Bridge Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=619",
        "provider": "local"
      },
      {
        "label": "KDFWR Granger Landing Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=618",
        "provider": "local"
      },
      {
        "label": "USGS 03384100 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03384100/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03384100 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03384100&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "Wikimedia Commons Tradewater River image source",
        "url": "https://commons.wikimedia.org/wiki/File:Tradewater_River_4899.JPG",
        "provider": "local"
      }
    ]
  },
  {
    "id": "tradewater-river-montezuma-vfw-bridge",
    "slug": "tradewater-river-montezuma-vfw-bridge",
    "name": "Tradewater River",
    "reach": "Montezuma Bridge Ramp to VFW Bridge Ramp",
    "aliases": [
      "Tradewater River - Montezuma Bridge to VFW Bridge",
      "Tradewater River - Montezuma to VFW",
      "Tradewater lower Providence combination segment"
    ],
    "state": "Kentucky",
    "region": "Western Kentucky",
    "summary": "Longer lower Tradewater float from Montezuma Bridge Ramp to VFW Bridge Ramp. KDFWR supports the chained 16.2-mile public route with official access-to-access mileage, public endpoint coordinates, and the Providence gauge sitting directly at the put-in corridor.",
    "statusText": "Use the Tradewater River at Providence gauge. KDFWR rates 5 to 50 cfs, or 10 to 15 ft, as good. Recent rain can leave the stage inside band while the discharge still runs high, so treat flashy weather and fresh wood as deciding factors before committing to this longer day.",
    "latitude": 37.3967,
    "longitude": -87.8446,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "KDFWR describes the Tradewater as extremely flashy, with rain events capable of raising the river very fast.",
        "Woody debris, braided channels, and strainers are ordinary hazards on this corridor even when the official gauge is near the recommended band.",
        "All three public landings sit in rural private-bank country. Use the signed accesses and do not treat mid-route banks as open public stops."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03384100",
      "provider": "usgs",
      "siteId": "03384100",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Tradewater River near Providence, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03384100/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 5,
      "idealMax": 50,
      "tooLow": 5,
      "tooHigh": 50,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Tradewater River at Providence",
        "url": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "KDFWR positions the Tradewater as a warm-season small-river float, but same-day and forecast rain matter more than a rough seasonal assumption because this drainage responds quickly and can move wood after every storm.",
      "difficulty": "moderate",
      "difficultyNotes": "This remains a gentle western-Kentucky river at ordinary levels, but 16.2 miles of rural mileage, sparse bailout options, wood, braided current lines, and flashy runoff make it a committed moderate day rather than a casual float.",
      "confidenceNotes": "Confidence is good for a conservative Kentucky add: KDFWR still lists Montezuma-to-Fishtrap at 6.7 miles and Fishtrap-to-VFW at 9.5 miles, supporting this 16.2-mile public chain. Current KDFWR access-detail pages still expose endpoint coordinates and public-use notes for Montezuma and VFW, and direct USGS Water Services returned same-day Providence values of 195 cfs and 12.50 ft on June 26, 2026. The route still ships with strong flashy-water caution because the discharge sat above KDFWRs cfs good band even while stage remained inside the stage band."
    },
    "evidenceNotes": [
      {
        "label": "Official route chain",
        "value": "Montezuma Bridge Ramp to VFW Bridge Ramp, about 16.2 mi",
        "note": "KDFWR lists Montezuma to Fishtrap as 6.7 miles and Fishtrap to VFW as 9.5 miles, supporting a combined public Tradewater route of about 16.2 miles.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx"
      },
      {
        "label": "Official level band",
        "value": "5-50 cfs / 10-15 ft at Providence",
        "note": "KDFWR rates the Providence gauge low below 5 cfs or 10.0 ft, good from 5.0 to 50.0 cfs or 10.0 to 15.0 ft, and high above 50.0 cfs or 15.0 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Montezuma Bridge Ramp, 37.3967, -87.8446",
        "note": "KDFWR lists Montezuma Bridge Ramp as a free year-round carry-down access with published coordinates and limited parking at the bridge.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=660"
      },
      {
        "label": "Take-out access",
        "value": "VFW Bridge Ramp, 37.4794, -87.9539",
        "note": "KDFWR lists VFW Bridge Ramp as a free paved public ramp with published coordinates and a larger gravel-and-grass parking area.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=619"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 03384100 at 195 cfs / 12.50 ft",
        "note": "USGS Water Services returned same-day June 26, 2026 discharge and gage-height values for Tradewater River near Providence during this run. The stage sits inside the KDFWR stage band, while the discharge remains above the cfs good band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03384100&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Flashy rural river with wood and braided channels",
        "note": "KDFWR describes the Tradewater as a gentle but extremely flashy river with woody debris, braided channels, riffles, runs, and deeper pools along this corridor.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Tradewater River",
        "url": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Montezuma Bridge Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=660",
        "provider": "local"
      },
      {
        "label": "KDFWR VFW Bridge Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=619",
        "provider": "local"
      },
      {
        "label": "USGS 03384100 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03384100/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03384100 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03384100&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "tradewater-river-fishtrap-granger-landing",
    "slug": "tradewater-river-fishtrap-granger-landing",
    "name": "Tradewater River",
    "reach": "Fishtrap Bridge Ramp to Granger Landing Ramp",
    "aliases": [
      "Tradewater River - Fishtrap Bridge to Granger Landing",
      "Tradewater River - Fishtrap to Granger",
      "Tradewater lower Sturgis combination segment"
    ],
    "state": "Kentucky",
    "region": "Western Kentucky",
    "summary": "Long lower Tradewater float from Fishtrap Bridge Ramp to Granger Landing Ramp. KDFWR supports the chained 20.1-mile public route with official access-to-access mileage, public endpoint coordinates, and the Providence gauge as the closest same-river route signal.",
    "statusText": "There is not a gauge on this exact lower reach, so Paddle Today uses the upstream Tradewater River at Providence gauge as a conservative same-river proxy. KDFWR rates 5 to 50 cfs, or 10 to 15 ft, as good at Providence; recent rain can still make the lower river woody and pushy before the gauge numbers look friendly downstream.",
    "latitude": 37.3988,
    "longitude": -87.9049,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "KDFWR describes the Tradewater as extremely flashy, with rain events capable of raising the river very fast.",
        "Woody debris, braided channels, and strainers are ordinary hazards on this corridor even when the upstream gauge is near the recommended band.",
        "Both public accesses border private property or limited public shoreline; use the signed ramps and legal public landings rather than treating banks as open stops."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03384100",
      "provider": "usgs",
      "siteId": "03384100",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "proxy",
      "siteName": "Tradewater River near Providence, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03384100/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 5,
      "idealMax": 50,
      "tooLow": 5,
      "tooHigh": 50,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Tradewater River at Providence used as an upstream proxy",
        "url": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "KDFWR positions the Tradewater as a warm-season small-river float, but recent and forecast rain matter more than a rough seasonal assumption because wood, mud, and current can change quickly on this lower reach.",
      "difficulty": "moderate",
      "difficultyNotes": "At ordinary levels this is still a gentle western-Kentucky river, but 20.1 miles of rural mileage, sparse services, wood, braided current lines, and a proxy-gauge decision make it a committed moderate outing.",
      "confidenceNotes": "Route and access confidence is good: KDFWR still lists Fishtrap-to-VFW at 9.5 miles and VFW-to-Granger at 10.6 miles, supporting this 20.1-mile public chain, and current KDFWR access-detail pages still expose coordinates and public-use notes for Fishtrap and Granger. Threshold confidence is intentionally lower because the selected Providence gauge is upstream, not on the exact Granger corridor. The route still uses the official KDFWR Providence model because KDFWR applies that gauge family to the lower access chain and no cleaner downstream live gauge surfaced."
    },
    "evidenceNotes": [
      {
        "label": "Official route chain",
        "value": "Fishtrap Bridge Ramp to Granger Landing Ramp, about 20.1 mi",
        "note": "KDFWR lists Fishtrap to VFW as 9.5 miles and VFW to Granger as 10.6 miles, supporting a combined public Tradewater route of about 20.1 miles.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx"
      },
      {
        "label": "Official level band",
        "value": "5-50 cfs / 10-15 ft at Providence",
        "note": "KDFWR rates the Providence gauge low below 5 cfs or 10.0 ft, good from 5.0 to 50.0 cfs or 10.0 to 15.0 ft, and high above 50.0 cfs or 15.0 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Fishtrap Bridge Ramp, 37.3988, -87.9049",
        "note": "KDFWR lists Fishtrap Bridge Ramp as a free carry-down access with published coordinates at the bridge landing.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1203"
      },
      {
        "label": "Take-out access",
        "value": "Granger Landing Ramp, 37.5463, -88.0189",
        "note": "KDFWR lists Granger Landing Ramp as a free paved public ramp with published coordinates near Sturgis.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=618"
      },
      {
        "label": "Proxy live gauge",
        "value": "USGS 03384100 at 195 cfs / 12.50 ft",
        "note": "USGS Water Services returned same-day June 26, 2026 discharge and gage-height values for Tradewater River near Providence during this run. The gauge is upstream of this route and is used conservatively as the closest official same-river signal in KDFWR guidance.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03384100&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Flashy rural river with wood and braided channels",
        "note": "KDFWR describes the Tradewater as a gentle but extremely flashy river with woody debris, braided channels, riffles, runs, and deeper pools along this lower corridor.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Tradewater River",
        "url": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Fishtrap Bridge Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1203",
        "provider": "local"
      },
      {
        "label": "KDFWR Granger Landing Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=618",
        "provider": "local"
      },
      {
        "label": "USGS 03384100 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03384100/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03384100 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03384100&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "tradewater-river-montezuma-granger-landing",
    "slug": "tradewater-river-montezuma-granger-landing",
    "name": "Tradewater River",
    "reach": "Montezuma Bridge Ramp to Granger Landing Ramp",
    "aliases": [
      "Tradewater River - Montezuma Bridge to Granger Landing",
      "Tradewater River - Montezuma to Granger",
      "Tradewater long lower combination segment"
    ],
    "state": "Kentucky",
    "region": "Western Kentucky",
    "summary": "Very long lower Tradewater float from Montezuma Bridge Ramp to Granger Landing Ramp. KDFWR supports the chained 26.8-mile public route with official access-to-access mileage, public endpoint coordinates, and the Providence gauge sitting directly at the put-in corridor.",
    "statusText": "Use the Tradewater River at Providence gauge. KDFWR rates 5 to 50 cfs, or 10 to 15 ft, as good, but this 26.8-mile day should stay conservative because rain can leave the discharge high, wood fresh, and the lower river more committed than the stage alone suggests.",
    "latitude": 37.3967,
    "longitude": -87.8446,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "KDFWR describes the Tradewater as extremely flashy, with rain events capable of raising the river very fast.",
        "Woody debris, braided channels, and strainers are ordinary hazards on this corridor even when the official gauge is near the recommended band.",
        "This long route stays in private-bank country for most of the day. Use the signed public accesses and do not treat mid-route banks or bars as assumed public support."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03384100",
      "provider": "usgs",
      "siteId": "03384100",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Tradewater River near Providence, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03384100/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 5,
      "idealMax": 50,
      "tooLow": 5,
      "tooHigh": 50,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Tradewater River at Providence",
        "url": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "Warm-season weather helps with daylight on a 26.8-mile day, but recent rain, forecast rain, and fresh wood matter more than a rough seasonal assumption on a river this flashy.",
      "difficulty": "moderate",
      "difficultyNotes": "The current is still a gentle western-Kentucky river at ordinary levels, but 26.8 miles of rural mileage, sparse bailout options, wood, braided current lines, and private-bank limits make this a serious all-day commitment.",
      "confidenceNotes": "Confidence is good for a conservative Kentucky add: KDFWR still lists Montezuma-to-Fishtrap at 6.7 miles, Fishtrap-to-VFW at 9.5 miles, and VFW-to-Granger at 10.6 miles, supporting this 26.8-mile public chain. Current KDFWR access-detail pages still expose coordinates and public-use notes for Montezuma and Granger, and direct USGS Water Services returned same-day Providence values of 195 cfs and 12.50 ft on June 26, 2026. The route still ships with strong flashy-water caution because the discharge sat above KDFWRs cfs good band even while stage remained inside the stage band."
    },
    "evidenceNotes": [
      {
        "label": "Official route chain",
        "value": "Montezuma Bridge Ramp to Granger Landing Ramp, about 26.8 mi",
        "note": "KDFWR lists Montezuma to Fishtrap as 6.7 miles, Fishtrap to VFW as 9.5 miles, and VFW to Granger as 10.6 miles, supporting a combined public Tradewater route of about 26.8 miles.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx"
      },
      {
        "label": "Official level band",
        "value": "5-50 cfs / 10-15 ft at Providence",
        "note": "KDFWR rates the Providence gauge low below 5 cfs or 10.0 ft, good from 5.0 to 50.0 cfs or 10.0 to 15.0 ft, and high above 50.0 cfs or 15.0 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Montezuma Bridge Ramp, 37.3967, -87.8446",
        "note": "KDFWR lists Montezuma Bridge Ramp as a free year-round carry-down access with published coordinates and limited parking at the bridge.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=660"
      },
      {
        "label": "Take-out access",
        "value": "Granger Landing Ramp, 37.5463, -88.0189",
        "note": "KDFWR lists Granger Landing Ramp as a free paved public ramp with published coordinates near Sturgis.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=618"
      },
      {
        "label": "Direct live gauge",
        "value": "USGS 03384100 at 195 cfs / 12.50 ft",
        "note": "USGS Water Services returned same-day June 26, 2026 discharge and gage-height values for Tradewater River near Providence during this run. The stage sits inside the KDFWR stage band, while the discharge remains above the cfs good band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03384100&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Flashy rural river with wood and braided channels",
        "note": "KDFWR describes the Tradewater as a gentle but extremely flashy river with woody debris, braided channels, riffles, runs, and deeper pools along this lower corridor.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Tradewater River",
        "url": "https://fw.ky.gov/Fish/Pages/Tradewater_River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Montezuma Bridge Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=660",
        "provider": "local"
      },
      {
        "label": "KDFWR Granger Landing Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=618",
        "provider": "local"
      },
      {
        "label": "USGS 03384100 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03384100/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03384100 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03384100&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "green-river-dennison-ferry-houchins-ferry",
    "slug": "green-river-dennison-ferry-houchins-ferry",
    "name": "Green River",
    "reach": "Dennison Ferry to Houchins Ferry",
    "aliases": [
      "Green River - Dennison Ferry to Houchins Ferry",
      "Mammoth Cave Green River long day",
      "KDFWR Pool 6 Dennison Ferry to Houchins Ferry chain"
    ],
    "state": "Kentucky",
    "region": "Mammoth Cave",
    "summary": "Long Mammoth Cave Green River combination from Dennison Ferry to Houchins Ferry. KDFWR's official Pool 6 mileage table supports this 19.8-mile public route by chaining the park's Dennison-to-Green River Ferry and Green River Ferry-to-Houchins segments against the direct Mammoth Cave USGS gauge and current NPS park safety rules.",
    "statusText": "Use the Green River at Mammoth Cave gauge. NPS treats roughly 9 to 15 ft as the broad beginner-friendly park window, 15 to 20 ft as more consequential experienced water, and prohibits launching in the park at or above 20 ft.",
    "latitude": 37.2174,
    "longitude": -86.0493,
    "gaugeSource": {
      "id": "usgs-03309000",
      "provider": "usgs",
      "siteId": "03309000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Green River at Mammoth Cave, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03309000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 9,
      "idealMax": 15,
      "tooLow": 9,
      "tooHigh": 20,
      "thresholdSource": {
        "label": "Mammoth Cave NPS Green River skill-level stage guidance",
        "url": "https://www.nps.gov/maca/planyourvisit/river-safety-and-regulations.htm",
        "provider": "nps"
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
      "seasonNotes": "This long park route is best treated as a warm-season trip with stable weather, enough daylight, and a group that is comfortable with a full-day flatwater commitment. NPS warns that Green River can rise quickly after rain and that channels and gravel bars shift over time.",
      "difficulty": "hard",
      "difficultyNotes": "The water remains flatwater by whitewater standards, but 19.8 miles, ferry interaction, changing gravel bars, shifting channels, limited rescue access, and a near-closure high-water ceiling make this a committed Mammoth Cave route rather than a casual float.",
      "confidenceNotes": "Confidence is good for a conservative Kentucky add: KDFWR's Pool 6 page still lists Dennison Ferry to Green River Ferry as 7.5 miles and Green River Ferry to Houchins Ferry as 12.3 miles, which together support this 19.8-mile public route. KDFWR still publishes endpoint coordinates and access details for Dennison and Houchins, NPS still requires paddlers to respect the ferry crossing and prohibits launching in the park at or above 20 ft, and USGS Water Services returned same-day July 1, 2026 Mammoth Cave values of 6100 cfs and 19.16 ft from direct gauge 03309000 during this run. That stage is below the closure but above the park's beginner-friendly band, so the route should ship with explicit high-water caution."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Dennison Ferry to Houchins Ferry, about 19.8-20.0 mi",
        "note": "KDFWR lists Dennison Ferry to Green River Ferry as 7.5 miles and Green River Ferry to Houchins Ferry as 12.3 miles, supporting a combined public route of about 19.8 miles. NPS separately publishes the lower leg as 12.4 miles.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Official stage model",
        "value": "9-15 ft broad audience, >=20 ft closed",
        "note": "NPS says park launching is prohibited when river levels are at or exceed 20 feet and keeps 9 to 15 feet as the broad beginner-friendly Green River window.",
        "sourceUrl": "https://www.nps.gov/maca/planyourvisit/river-safety-and-regulations.htm"
      },
      {
        "label": "Put-in access",
        "value": "Dennison Ferry, 37.2174, -86.0493",
        "note": "KDFWR identifies Dennison Ferry as a free day-use-only carry-down access with steps to the water, gravel parking, and no camping.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Dennison-Ferry-.aspx"
      },
      {
        "label": "Take-out access",
        "value": "Houchins Ferry, 37.2024, -86.2376",
        "note": "KDFWR identifies Houchins Ferry as a free paved park ramp with year-round camping, restrooms, picnic facilities, and ferry-side launch rules.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Houchins-Ferry-%28Mammoth-Cave-National-Park%29.aspx"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03309000 at 6100 cfs / 19.16 ft",
        "note": "USGS Water Services returned same-day July 1, 2026 discharge and stage values for Green River at Mammoth Cave during this run. That stage is below the NPS 20-foot closure but well above the park's broad beginner-friendly 9 to 15-foot band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03309000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Current park access posture",
        "value": "Ferry reopened March 5, 2026; check hotline for same-day status",
        "note": "Mammoth Cave says Green River Ferry resumed daily operation on March 5, 2026 after repairs, but current conditions still say road and ferry status can change without advance notice and should be checked before shuttling.",
        "sourceUrl": "https://www.nps.gov/maca/learn/news/green-river-ferry-reopens.htm"
      },
      {
        "label": "Camping context",
        "value": "Permitted riverside camping plus Houchins campground",
        "note": "NPS says lower-water gravel bars and low riverbanks can support paddler camping with a valid riverside permit on the Green River Ferry-to-Houchin leg, and KDFWR says Houchins Ferry has a riverside campground.",
        "sourceUrl": "https://www.nps.gov/thingstodo/green-river-ferry-to-houchin-ferry.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Pool 6 Green River",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Dennison Ferry",
        "url": "https://fw.ky.gov/Fish/Pages/Dennison-Ferry-.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Houchins Ferry",
        "url": "https://fw.ky.gov/Fish/Pages/Houchins-Ferry-%28Mammoth-Cave-National-Park%29.aspx",
        "provider": "local"
      },
      {
        "label": "NPS River Safety and Regulations",
        "url": "https://www.nps.gov/maca/planyourvisit/river-safety-and-regulations.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Current Conditions",
        "url": "https://www.nps.gov/maca/planyourvisit/conditions.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Green River Ferry reopens",
        "url": "https://www.nps.gov/maca/learn/news/green-river-ferry-reopens.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Green River Ferry to Houchin Ferry",
        "url": "https://www.nps.gov/thingstodo/green-river-ferry-to-houchin-ferry.htm",
        "provider": "nps"
      },
      {
        "label": "USGS 03309000 Green River at Mammoth Cave",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03309000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03309000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03309000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "barren-river-vpa-3-martinsville",
    "slug": "barren-river-vpa-3-martinsville",
    "name": "Barren River",
    "reach": "Barren River VPA #3 to Martinsville Ford / Claypool Ramp",
    "aliases": [
      "Barren River - Highway 101 VPA to Martinsville Ford",
      "Lower Barren River VPA segment",
      "Barren River VPA #3 to Claypool"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Shorter lower-Barren follow-on from the Highway 101 voluntary public access site to Martinsville Ford / Claypool Ramp. KDFWR documents the exact 3.9-mile segment, both public endpoints, and the official Finney stage bands used for this upper lower-Barren corridor.",
    "statusText": "Use the Barren River near Finney gauge. KDFWR rates 78.0 to 78.5 ft as good for boating and fishing. Below that is low and can slow the day over shoals; above that is high and deserves extra current and landing caution.",
    "latitude": 36.9333,
    "longitude": -86.2043,
    "gaugeSource": {
      "id": "usgs-03313000",
      "provider": "usgs",
      "siteId": "03313000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Barren River near Finney, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03313000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 78,
      "idealMax": 78.5,
      "tooLow": 78,
      "tooHigh": 78.5,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Barren River near Finney",
        "url": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "This short upper-lower-Barren segment works best in normal spring and fall water. Summer lows can turn the route scrape-prone, while storms and release changes can raise current quickly even on a short float.",
      "difficulty": "easy",
      "difficultyNotes": "This is a straightforward broad-river day segment with simple route-finding, but it still has shoals, private banks, a private-land VPA launch, and changing current that deserve more respect than the mileage alone suggests.",
      "confidenceNotes": "Confidence is high for a conservative Kentucky add: KDFWR lists Barren River VPA #3 to Martinsville Ford / Claypool Ramp as a 3.9-mile access-to-access segment, publishes endpoint coordinates and public-use details for both sites, and uses the official Barren River near Finney stage bands for this corridor. USGS Water Services returned a same-day June 22, 2026 stage reading of 77.99 ft at USGS 03313000 during this run, keeping the live-gauge path current even though the river is presently a touch below KDFWR's good band."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Barren River VPA #3 to Martinsville Ford, 3.9 mi",
        "note": "KDFWR lists Highway 101 / Barren River VPA #3 to Martinsville Ford / Claypool Ramp as a 3.9-mile lower-Barren access-to-access segment.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "78.0-78.5 ft good",
        "note": "KDFWR rates the Barren River near Finney gauge as Low below 78.0 ft, Good from 78.0 to 78.5 ft, and High above 78.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Barren River VPA #3, 36.9333, -86.2043",
        "note": "KDFWR identifies Barren River VPA #3 as a private-property voluntary public access carry-in site with no camping, no fires, and year-round limited-hours shoreline access.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=993"
      },
      {
        "label": "Take-out access",
        "value": "Martinsville Ford / Claypool Ramp, 36.9134, -86.2293",
        "note": "KDFWR identifies Martinsville Ford as a free paved single-lane public ramp with year-round 24-hour access and no listed amenities or camping.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=624"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03313000 at 77.99 ft",
        "note": "USGS Water Services returned a same-day June 22, 2026 gage-height reading for Barren River near Finney during this route-add run. That stage sits just below the KDFWR good band, so the route should score low today.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03313000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Short broad-river run with shoals and rocky pools",
        "note": "KDFWR says Martinsville Ford boaters should expect a variety of shallow shoals and deep rocky pools, with the private-land VPA acting as the simpler upstream carry-in.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Lower Barren River",
        "url": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Barren River VPA #3",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=993",
        "provider": "local"
      },
      {
        "label": "KDFWR Martinsville Ford / Claypool Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=624",
        "provider": "local"
      },
      {
        "label": "USGS 03313000 Barren River near Finney",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03313000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03313000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03313000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "barren-river-vpa-3-potter-combs",
    "slug": "barren-river-vpa-3-potter-combs",
    "name": "Barren River",
    "reach": "Barren River VPA #3 to Potter/Combs Ramp",
    "aliases": [
      "Barren River - Highway 101 VPA to Potter/Combs",
      "Lower Barren River upper-middle continuation",
      "Barren River VPA #3 to Weldon Pete Park"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Long lower-Barren continuation from the Highway 101 voluntary public access site to Potter/Combs Ramp at Weldon Pete Park. KDFWR's current mileage table supports this 27.9-mile route by chaining the official VPA-to-Martinsville and Martinsville-to-Potter/Combs segments against the direct Finney stage gauge.",
    "statusText": "Use the Barren River near Finney gauge. KDFWR rates 78.0 to 78.5 ft as good for boating and fishing. Below that expect a slower scrape-prone day; above that open bends, shoals, and the park take-out deserve more caution.",
    "latitude": 36.9333,
    "longitude": -86.2043,
    "gaugeSource": {
      "id": "usgs-03313000",
      "provider": "usgs",
      "siteId": "03313000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Barren River near Finney, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03313000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "This is a long lower-Barren day that starts from a private-land voluntary public access site, so treat the launch as a narrow access footprint rather than a general-purpose staging area.",
        "KDFWR says Martinsville carries shallow shoals and Potter/Combs sits above a dam-influenced pooled section, which makes low water slower and the finish less casual than the mileage first suggests.",
        "Private banks dominate most of the corridor, and the route is too long to assume easy roadside recovery if weather or fatigue goes sideways mid-day."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 78,
      "idealMax": 78.5,
      "tooLow": 78,
      "tooHigh": 78.5,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Barren River near Finney",
        "url": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "This upper-middle lower-Barren continuation is most practical in spring and wetter fall periods when the Finney stage is inside or near the official good band. Summer lows can drag out the shoal miles, while storms or release changes can add more push than the broad river appearance suggests.",
      "difficulty": "moderate",
      "difficultyNotes": "The route is straightforward to read at normal water, but 27.9 miles from a simple VPA launch to the pooled park finish makes this a real endurance day with little room for sloppy timing.",
      "confidenceNotes": "Confidence is good for a conservative Kentucky add: KDFWR still lists Barren River VPA #3 to Martinsville Ford / Claypool Ramp as 3.9 miles and Martinsville Ford / Claypool Ramp to Potter/Combs Ramp as 24.0 miles, which support this 27.9-mile chained public route against the same official Barren River near Finney low/good/high stage ladder. KDFWR access-detail pages still provide source-backed coordinates and public-use notes for both endpoints, and USGS Water Services returned a same-day stage of 78.02 ft at 2026-07-09 07:00 CDT for direct gauge 03313000, just inside the official good band."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "78.0-78.5 ft good",
        "note": "KDFWR rates the Barren River near Finney gauge as Low below 78.0 ft, Good from 78.0 to 78.5 ft, and High above 78.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx"
      },
      {
        "label": "Chained public route segment",
        "value": "Barren River VPA #3 to Potter/Combs Ramp, 27.9 miles",
        "note": "KDFWR lists Barren River VPA #3 to Martinsville Ford / Claypool Ramp as 3.9 miles and Martinsville Ford / Claypool Ramp to Potter/Combs Ramp as 24.0 miles, supporting a 27.9-mile public VPA-to-Potter/Combs continuation.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Barren River VPA #3, 36.9333, -86.2043",
        "note": "KDFWR identifies Barren River VPA #3 as a private-property voluntary public access carry-in site with no camping, no fires, and year-round limited-hours shoreline access.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=993"
      },
      {
        "label": "Take-out access",
        "value": "Potter/Combs Ramp, 37.0027, -86.4184",
        "note": "KDFWR identifies Potter/Combs Ramp at Weldon Pete Park as a public year-round ramp with gravel parking and park amenities but no campground support.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=628"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03313000 at 78.02 ft",
        "note": "USGS Water Services returned a same-day gage-height reading for Barren River near Finney at 2026-07-09 07:00 CDT during this run, which sits just inside the KDFWR good band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03313000&parameterCd=00065&siteStatus=all"
      },
      {
        "label": "Camping posture",
        "value": "No public camping documented at either endpoint",
        "note": "KDFWR lists no camping or fires at the VPA launch, and Potter/Combs is documented as a park ramp rather than a public overnight facility.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=993"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Lower Barren River",
        "url": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Barren River VPA #3",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=993",
        "provider": "local"
      },
      {
        "label": "KDFWR Potter/Combs Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=628",
        "provider": "local"
      },
      {
        "label": "USGS 03313000 Barren River near Finney",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03313000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03313000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03313000&parameterCd=00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "buck-creek-rainey-road-stab-road",
    "slug": "buck-creek-rainey-road-stab-road",
    "name": "Buck Creek",
    "reach": "Rainey Road Fishing Access to KY-1675 Fishing Access",
    "aliases": [
      "Buck Creek - Rainey Road to Stab Road",
      "Buck Creek - Dahl Road to Stab",
      "Upper Buck Creek first float"
    ],
    "state": "Kentucky",
    "region": "Pulaski County",
    "summary": "Short first Buck Creek float from Rainey Road to the Stab / KY-1675 bridge. KDFWR still presents this as the opening official Buck Creek segment, and the direct near-Shopville USGS gauge plus same-gauge local paddling floor support a conservative minimum-only add.",
    "statusText": "Use the Buck Creek near Shopville gauge. Same-gauge local Buck Creek paddling guidance says about 100 cfs and 2.0 ft or better is the minimum for a fun float. Below that expect dragging; higher water pushes faster through the bluff-lined bends.",
    "latitude": 37.1792,
    "longitude": -84.4564,
    "gaugeSource": {
      "id": "usgs-03407500",
      "provider": "usgs",
      "siteId": "03407500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Buck Creek near Shopville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03407500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "KDFWR describes this as a family-friendly low-water Buck Creek segment, but shallow shoals still mean boat dragging and quick storms can add push fast.",
        "Both accesses are simple carry-down sites with unpaved parking and no amenities.",
        "Most shoreline between the named accesses is private, so stay inside the public access footprints."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "Buck Creek Outfitters same-gauge minimum for Buck Creek near Shopville",
        "url": "https://www.facebook.com/BuckCreekOutfittersLLC/photos/d41d8cd9/733125648816278/",
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
      "seasonNotes": "Buck Creek is often scraped out in dry spells and rises quickly after rain. The route is most believable after enough water has returned to clear the 100 cfs / 2.0 ft local floor.",
      "difficulty": "easy",
      "difficultyNotes": "This is the shortest and broadest-audience Buck Creek add, but it is still a moving stream with shoals, bluff turns, and enough private-bank pressure that paddlers should not treat it like flatwater.",
      "confidenceNotes": "Confidence is reasonable but intentionally conservative: KDFWR still names Rainey Road to the Stab / KY-1675 bridge as the first official Buck Creek float, current KDFWR access-detail pages provide source-backed coordinates for both carry-downs, and same-day USGS Water Services returned 63.5 cfs and 1.91 ft at 2026-07-09 11:30 EDT from the direct Shopville gauge. The weak point is thresholds, so the route stays minimum-only off repeated same-gauge local guidance that about 100 cfs and 2.0 ft is the floor for a fun float."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Rainey Road to KY-1675 / Stab, 4.2 mi",
        "note": "The current KDFWR Buck Creek article and detailed map still present this as the first official float on the creek.",
        "sourceUrl": "https://fw.ky.gov/Education/Documents/Buck-Creek.pdf"
      },
      {
        "label": "Minimum-flow support",
        "value": "About 100 cfs and 2.0 ft minimum",
        "note": "Buck Creek Outfitters continues to tell paddlers that Buck Creek needs to be above about 100 cfs and 2.0 ft at the Shopville gauge to avoid a frustrating scrape-heavy float.",
        "sourceUrl": "https://www.facebook.com/BuckCreekOutfittersLLC/posts/if-you-are-kayaking-buck-creek-from-rainey-road-to-the-stab-fire-department-brid/866964780672912/"
      },
      {
        "label": "Put-in access",
        "value": "Rainey Road Fishing Access, 37.1792, -84.4564",
        "note": "KDFWR identifies Rainey Road as a public carry-down access with unpaved parking and no amenities.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=521"
      },
      {
        "label": "Take-out access",
        "value": "KY-1675 Fishing Access, 37.1516, -84.4392",
        "note": "KDFWR identifies the Stab / KY-1675 bridge as a public carry-down access with unpaved parking and no amenities.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1219"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03407500 at 63.5 cfs / 1.91 ft",
        "note": "USGS Water Services returned same-day values for Buck Creek near Shopville, KY at 2026-07-09 11:30 EDT during this run, which keeps the live path current while honestly flagging a below-floor day.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03407500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Bluff turns and karst side trip at Stab",
        "note": "KDFWR says the route runs past sandstone-and-limestone bluffs and finishes near the Short Creek karst-window side trip east of Stab.",
        "sourceUrl": "https://fw.ky.gov/Education/Documents/Buck-Creek.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Buck Creek",
        "url": "https://fw.ky.gov/Education/Pages/Buck-Creek.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Floating Buck Creek article",
        "url": "https://fw.ky.gov/Education/Documents/Buck-Creek.pdf",
        "provider": "local"
      },
      {
        "label": "KDFWR Rainey Road Fishing Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=521",
        "provider": "local"
      },
      {
        "label": "KDFWR KY-1675 Fishing Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1219",
        "provider": "local"
      },
      {
        "label": "USGS 03407500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03407500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03407500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03407500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "Buck Creek Outfitters same-gauge level guidance",
        "url": "https://www.facebook.com/BuckCreekOutfittersLLC/posts/if-you-are-kayaking-buck-creek-from-rainey-road-to-the-stab-fire-department-brid/866964780672912/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "buck-creek-stab-road-bent-road",
    "slug": "buck-creek-stab-road-bent-road",
    "name": "Buck Creek",
    "reach": "KY-1675 Fishing Access to Bent Road Fishing Access",
    "aliases": [
      "Buck Creek - Stab Road to Bent Road",
      "Buck Creek - Stab to The Bent",
      "Buck Creek middle gorge float"
    ],
    "state": "Kentucky",
    "region": "Pulaski County",
    "summary": "Longer middle Buck Creek float from the Stab / KY-1675 bridge to Bent Road. KDFWR still treats this as the scenic The Bent segment, and the direct Shopville gauge plus same-gauge local floor support a guarded minimum-only route.",
    "statusText": "Use the Buck Creek near Shopville gauge. Same-gauge local Buck Creek paddling guidance says about 100 cfs and 2.0 ft or better is the minimum for a worthwhile trip. Below that expect dragging; higher water pushes harder against bluffs and makes the Bent Road carry-out less forgiving.",
    "latitude": 37.1516,
    "longitude": -84.4392,
    "gaugeSource": {
      "id": "usgs-03407500",
      "provider": "usgs",
      "siteId": "03407500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Buck Creek near Shopville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03407500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "KDFWR warns that higher flows on this bluff-walled section can push boats into strainers and tight cliff bases.",
        "Bent Road is a real public take-out, but KDFWR says the carry-out is steep enough that many paddlers will park at the top and walk boats up.",
        "Treat the corridor as a day float between named public accesses only. The banks and woods away from those accesses are not general public staging areas."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "Buck Creek Outfitters same-gauge minimum for Buck Creek near Shopville",
        "url": "https://www.facebook.com/BuckCreekOutfittersLLC/photos/d41d8cd9/733125648816278/",
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
      "seasonNotes": "This The Bent segment becomes scrapy during dry spells and materially pushier after rain. The route stays minimum-only because the source trail supports a floor, not a clean ideal or high cutoff.",
      "difficulty": "moderate",
      "difficultyNotes": "The mileage, the square-shaped Bent gorge turns, and the steep Bent Road finish make this more committed than the short upstream float even though it is still broad-audience moving water at ordinary levels.",
      "confidenceNotes": "Confidence is reasonable and intentionally cautious: KDFWR still names KY-1675 to Bent Road as a 7.5-mile official Buck Creek float, the current KDFWR access-detail pages still provide coordinates and public-use notes for both carry-downs, and same-day USGS Water Services returned 63.5 cfs and 1.91 ft at 2026-07-09 11:30 EDT from the direct Shopville gauge. Numeric threshold support remains community-grade, so the route stays minimum-only on the repeated same-gauge 100 cfs / 2.0 ft floor."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "KY-1675 / Stab to Bent Road, 7.5 mi",
        "note": "The current KDFWR Buck Creek article and map still identify this exact middle segment as the next official float below Stab.",
        "sourceUrl": "https://fw.ky.gov/Education/Documents/Buck-Creek.pdf"
      },
      {
        "label": "Minimum-flow support",
        "value": "About 100 cfs and 2.0 ft minimum",
        "note": "Buck Creek Outfitters continues to use the Shopville gauge and says the creek needs to be above about 100 cfs and 2.0 ft for a fun float.",
        "sourceUrl": "https://www.facebook.com/BuckCreekOutfittersLLC/posts/if-you-are-kayaking-buck-creek-from-rainey-road-to-the-stab-fire-department-brid/866964780672912/"
      },
      {
        "label": "Put-in access",
        "value": "KY-1675 Fishing Access, 37.1516, -84.4392",
        "note": "KDFWR identifies the Stab bridge as a public carry-down access with year-round shoreline availability.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1219"
      },
      {
        "label": "Take-out access",
        "value": "Bent Road Fishing Access, 37.1038, -84.4350",
        "note": "KDFWR identifies Bent Road as a public carry-down access and the Buck Creek article warns the carry-out can be steep and rough.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=522"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03407500 at 63.5 cfs / 1.91 ft",
        "note": "USGS Water Services returned same-day values for Buck Creek near Shopville, KY at 2026-07-09 11:30 EDT during this run, which keeps the gauge live while honestly flagging a below-floor day.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03407500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Hazard and route character",
        "value": "The Bent gorge and steep Bent carry-out",
        "note": "KDFWR says this section enters the square-shaped Bent, warns about strainers at higher flows, and notes the Bent Road carry-out is steep and rocky.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Buck-Creek.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Buck Creek",
        "url": "https://fw.ky.gov/Education/Pages/Buck-Creek.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Floating Buck Creek article",
        "url": "https://fw.ky.gov/Education/Documents/Buck-Creek.pdf",
        "provider": "local"
      },
      {
        "label": "KDFWR KY-1675 Fishing Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1219",
        "provider": "local"
      },
      {
        "label": "KDFWR Bent Road Fishing Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=522",
        "provider": "local"
      },
      {
        "label": "USGS 03407500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03407500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03407500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03407500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "Buck Creek Outfitters same-gauge level guidance",
        "url": "https://www.facebook.com/BuckCreekOutfittersLLC/posts/if-you-are-kayaking-buck-creek-from-rainey-road-to-the-stab-fire-department-brid/866964780672912/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "buck-creek-bent-road-poplarville-road",
    "slug": "buck-creek-bent-road-poplarville-road",
    "name": "Buck Creek",
    "reach": "Bent Road Fishing Access to Poplarville Road Fishing Access",
    "aliases": [
      "Buck Creek - Bent Road to Poplarville Road",
      "Buck Creek - Bent to Poplarville",
      "Buck Creek lower gorge float"
    ],
    "state": "Kentucky",
    "region": "Pulaski County",
    "summary": "Lower Buck Creek gorge float from Bent Road to the easier Poplarville take-out. KDFWR still treats this as one of the signature Buck Creek paddles, and the direct Shopville gauge plus same-gauge local floor support a guarded minimum-only route.",
    "statusText": "Use the Buck Creek near Shopville gauge. Same-gauge local Buck Creek paddling guidance says about 100 cfs and 2.0 ft or better is the minimum for a worthwhile trip. Below that expect more walking through shallow drops; higher water makes the small waterfalls and island lines much less forgiving.",
    "latitude": 37.1038,
    "longitude": -84.435,
    "gaugeSource": {
      "id": "usgs-03407500",
      "provider": "usgs",
      "siteId": "03407500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Buck Creek near Shopville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03407500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "KDFWR says several lower-route drops include small waterfalls that can be dicey at higher flows and are sometimes best walked even in low fall water.",
        "KDFWR also says the safer island line is left because the right chute may stay blocked by a fallen tree.",
        "Poplarville is the easier public finish; KDFWR says the steeper Dykes Bridge carry-out a mile upstream is more strenuous and should not be the default take-out for general users."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "Buck Creek Outfitters same-gauge minimum for Buck Creek near Shopville",
        "url": "https://www.facebook.com/BuckCreekOutfittersLLC/photos/d41d8cd9/733125648816278/",
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
      "seasonNotes": "This lower gorge section gets especially scratchy in normal fall lows and more serious after rain. The route stays minimum-only because the source trail supports a same-gauge floor, not a defensible ideal or high-side band.",
      "difficulty": "moderate",
      "difficultyNotes": "This is still a family-scale creek trip at the right level, but the six-mile length, multiple drops, island line choice, and shallow low-water exits make it more technical than the short upstream float.",
      "confidenceNotes": "Confidence is reasonable but conservative: KDFWR still names Bent Road to Poplarville as an official nearly 6-mile Buck Creek float, current KDFWR access-detail pages still provide coordinates and public-use notes for both carry-downs, and same-day USGS Water Services returned 63.5 cfs and 1.91 ft at 2026-07-09 11:30 EDT from the direct Shopville gauge. Threshold support stays community-grade, so the route remains minimum-only on the repeated same-gauge 100 cfs / 2.0 ft floor."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Bent Road to Poplarville Road, about 6.0 mi",
        "note": "The current KDFWR Buck Creek article and map still present this as the lower official float, choosing Poplarville as the easier finish instead of the steep Dykes carry-out.",
        "sourceUrl": "https://fw.ky.gov/Education/Documents/Buck-Creek.pdf"
      },
      {
        "label": "Minimum-flow support",
        "value": "About 100 cfs and 2.0 ft minimum",
        "note": "Buck Creek Outfitters continues to use the Shopville gauge and says the creek needs to be above about 100 cfs and 2.0 ft for a fun float.",
        "sourceUrl": "https://www.facebook.com/BuckCreekOutfittersLLC/posts/if-you-are-kayaking-buck-creek-from-rainey-road-to-the-stab-fire-department-brid/866964780672912/"
      },
      {
        "label": "Put-in access",
        "value": "Bent Road Fishing Access, 37.1038, -84.4350",
        "note": "KDFWR identifies Bent Road as a public carry-down access with unpaved parking and no amenities.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=522"
      },
      {
        "label": "Take-out access",
        "value": "Poplarville Road Fishing Access, 37.0469, -84.4314",
        "note": "KDFWR identifies Poplarville Road as a public carry-down access with unpaved parking and no amenities.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=520"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03407500 at 63.5 cfs / 1.91 ft",
        "note": "USGS Water Services returned same-day values for Buck Creek near Shopville, KY at 2026-07-09 11:30 EDT during this run, which keeps the gauge live while honestly flagging a below-floor day.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03407500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Hazard and route character",
        "value": "Small waterfalls, island left line, Dykes Cave corridor",
        "note": "KDFWR says this lower gorge includes several drops that can be dicey at higher flows, recommends the left island line because the right chute may be blocked, and notes the Dykes Bridge carry-out is steep compared with the easier Poplarville finish.",
        "sourceUrl": "https://fw.ky.gov/Education/Documents/Buck-Creek.pdf"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Buck Creek",
        "url": "https://fw.ky.gov/Education/Pages/Buck-Creek.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Floating Buck Creek article",
        "url": "https://fw.ky.gov/Education/Documents/Buck-Creek.pdf",
        "provider": "local"
      },
      {
        "label": "KDFWR Bent Road Fishing Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=522",
        "provider": "local"
      },
      {
        "label": "KDFWR Poplarville Road Fishing Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=520",
        "provider": "local"
      },
      {
        "label": "USGS 03407500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03407500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03407500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03407500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "Buck Creek Outfitters same-gauge level guidance",
        "url": "https://www.facebook.com/BuckCreekOutfittersLLC/posts/if-you-are-kayaking-buck-creek-from-rainey-road-to-the-stab-fire-department-brid/866964780672912/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "buck-creek-rainey-road-bent-road",
    "slug": "buck-creek-rainey-road-bent-road",
    "name": "Buck Creek",
    "reach": "Rainey Road Fishing Access to Bent Road Fishing Access",
    "aliases": [
      "Buck Creek - Rainey Road to Bent Road",
      "Buck Creek - Rainey to The Bent",
      "Buck Creek upper-to-middle gorge float"
    ],
    "state": "Kentucky",
    "region": "Pulaski County",
    "summary": "Longer Buck Creek day from Rainey Road to Bent Road. KDFWR still documents the official Rainey-to-Stab and Stab-to-Bent floats, and together they support this 11.7-mile chained public route against the direct Shopville gauge.",
    "statusText": "Use the Buck Creek near Shopville gauge. Same-gauge local Buck Creek paddling guidance says about 100 cfs and 2.0 ft or better is the minimum for a fun float. Below that expect dragging; higher water pushes harder through the bluff turns and makes the Bent Road carry-out less forgiving.",
    "latitude": 37.1792,
    "longitude": -84.4564,
    "gaugeSource": {
      "id": "usgs-03407500",
      "provider": "usgs",
      "siteId": "03407500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Buck Creek near Shopville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03407500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "This chained route starts as the friendlier upper Buck Creek float and then commits you into the bluff-walled Bent section, where higher water pushes harder against rock walls and wood.",
        "Bent Road is the legal public finish, but KDFWR says the carry-out can be steep and rough enough that many paddlers park at the top and walk boats up.",
        "Use only the named public accesses at Rainey, Stab, and Bent. Most banks between them are private."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "Buck Creek Outfitters same-gauge minimum for Buck Creek near Shopville",
        "url": "https://www.facebook.com/BuckCreekOutfittersLLC/photos/d41d8cd9/733125648816278/",
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
      "seasonNotes": "This longer Buck Creek combination still needs enough water to clear the same-gauge 100 cfs / 2.0 ft floor, but once rain bumps the creek higher the bluff turns and Bent carry-out become more consequential.",
      "difficulty": "moderate",
      "difficultyNotes": "The individual rapids remain broad-audience creek water, but 11.7 miles, private-bank limits, and the steep Bent finish make this a more committed day than either shorter Buck Creek split alone.",
      "confidenceNotes": "Confidence is reasonable and intentionally conservative: KDFWR still presents Rainey Road to the Stab / KY-1675 bridge as 4.2 miles and KY-1675 to Bent Road as 7.5 miles, supporting this 11.7-mile public chain. Current KDFWR access-detail pages still provide source-backed coordinates and public-use notes for Rainey and Bent, and same-day USGS Water Services returned 556 cfs and 3.49 ft at 2026-07-13 19:30 EDT from the direct Shopville gauge. Threshold support remains community-grade, so the route stays minimum-only on the repeated same-gauge 100 cfs / 2.0 ft floor."
    },
    "evidenceNotes": [
      {
        "label": "Official route chain",
        "value": "Rainey Road to Stab 4.2 mi plus Stab to Bent Road 7.5 mi",
        "note": "The current KDFWR Buck Creek article and map still present these as consecutive official public floats, supporting this 11.7-mile combined route.",
        "sourceUrl": "https://fw.ky.gov/Education/Documents/Buck-Creek.pdf"
      },
      {
        "label": "Minimum-flow support",
        "value": "About 100 cfs and 2.0 ft minimum",
        "note": "Buck Creek Outfitters continues to use the Shopville gauge and says the creek needs to be above about 100 cfs and 2.0 ft for a fun float.",
        "sourceUrl": "https://www.facebook.com/BuckCreekOutfittersLLC/posts/if-you-are-kayaking-buck-creek-from-rainey-road-to-the-stab-fire-department-brid/866964780672912/"
      },
      {
        "label": "Put-in access",
        "value": "Rainey Road Fishing Access, 37.1792, -84.4564",
        "note": "KDFWR identifies Rainey Road as a public carry-down access with unpaved parking and no amenities.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=521"
      },
      {
        "label": "Take-out access",
        "value": "Bent Road Fishing Access, 37.1038, -84.4350",
        "note": "KDFWR identifies Bent Road as a public carry-down access and the Buck Creek article warns the carry-out can be steep and rough.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=522"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03407500 at 556 cfs / 3.49 ft",
        "note": "USGS Water Services returned same-day values for Buck Creek near Shopville, KY at 2026-07-13 19:30 EDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03407500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Hazard and route character",
        "value": "Bluff turns, The Bent gorge, and steep Bent carry-out",
        "note": "KDFWR describes the bluff-lined upper float into the square-shaped Bent and warns about strainers and the steep Bent Road finish at higher flows.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Buck-Creek.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Buck Creek",
        "url": "https://fw.ky.gov/Education/Pages/Buck-Creek.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Floating Buck Creek article",
        "url": "https://fw.ky.gov/Education/Documents/Buck-Creek.pdf",
        "provider": "local"
      },
      {
        "label": "KDFWR Rainey Road Fishing Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=521",
        "provider": "local"
      },
      {
        "label": "KDFWR Bent Road Fishing Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=522",
        "provider": "local"
      },
      {
        "label": "USGS 03407500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03407500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03407500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03407500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "Buck Creek Outfitters same-gauge level guidance",
        "url": "https://www.facebook.com/BuckCreekOutfittersLLC/posts/if-you-are-kayaking-buck-creek-from-rainey-road-to-the-stab-fire-department-brid/866964780672912/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "buck-creek-stab-road-poplarville-road",
    "slug": "buck-creek-stab-road-poplarville-road",
    "name": "Buck Creek",
    "reach": "KY-1675 Fishing Access to Poplarville Road Fishing Access",
    "aliases": [
      "Buck Creek - Stab Road to Poplarville Road",
      "Buck Creek - Stab to Poplarville",
      "Buck Creek middle-to-lower gorge float"
    ],
    "state": "Kentucky",
    "region": "Pulaski County",
    "summary": "Long Buck Creek gorge run from the Stab / KY-1675 bridge to Poplarville Road. KDFWR still documents the official Stab-to-Bent and Bent-to-Poplarville floats, supporting this 13.5-mile chained public route against the direct Shopville gauge.",
    "statusText": "Use the Buck Creek near Shopville gauge. Same-gauge local Buck Creek paddling guidance says about 100 cfs and 2.0 ft or better is the minimum for a worthwhile trip. Below that expect dragging; higher water makes the Bent walls, lower drops, and Poplarville finish more consequential.",
    "latitude": 37.1516,
    "longitude": -84.4392,
    "gaugeSource": {
      "id": "usgs-03407500",
      "provider": "usgs",
      "siteId": "03407500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Buck Creek near Shopville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03407500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "This route stacks the Bent gorge onto the lower Buck Creek drop sequence, so high water means both tighter wall pressure upstream and more serious moves later in the run.",
        "KDFWR says the lower section includes several drops that can be dicey at higher flows and recommends the left island line because the right chute may remain blocked by a fallen tree.",
        "Poplarville is the easier public finish; KDFWR says the steeper Dykes Bridge carry-out upstream should not be the default take-out for general users."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "Buck Creek Outfitters same-gauge minimum for Buck Creek near Shopville",
        "url": "https://www.facebook.com/BuckCreekOutfittersLLC/photos/d41d8cd9/733125648816278/",
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
      "seasonNotes": "This longer Stab-to-Poplarville combination still needs enough water to clear the same-gauge 100 cfs / 2.0 ft floor, but storm runoff quickly makes the narrow gorge and lower drops less forgiving.",
      "difficulty": "moderate",
      "difficultyNotes": "The route is still a recreational creek float at the right level, but 13.5 miles, multiple hazard zones, and private-bank limits make it a full-day commitment rather than a casual half-day paddle.",
      "confidenceNotes": "Confidence is reasonable but conservative: KDFWR still presents KY-1675 to Bent Road as 7.5 miles and Bent Road to Poplarville as about 6.0 miles, supporting this 13.5-mile public chain. Current KDFWR access-detail pages still provide coordinates and public-use notes for the Stab and Poplarville accesses, and same-day USGS Water Services returned 556 cfs and 3.49 ft at 2026-07-13 19:30 EDT from the direct Shopville gauge. Threshold support stays community-grade, so the route remains minimum-only on the repeated same-gauge 100 cfs / 2.0 ft floor."
    },
    "evidenceNotes": [
      {
        "label": "Official route chain",
        "value": "KY-1675 / Stab to Bent Road 7.5 mi plus Bent Road to Poplarville 6.0 mi",
        "note": "The current KDFWR Buck Creek article and map still present these as consecutive official public floats, supporting this 13.5-mile combined route.",
        "sourceUrl": "https://fw.ky.gov/Education/Documents/Buck-Creek.pdf"
      },
      {
        "label": "Minimum-flow support",
        "value": "About 100 cfs and 2.0 ft minimum",
        "note": "Buck Creek Outfitters continues to use the Shopville gauge and says the creek needs to be above about 100 cfs and 2.0 ft for a fun float.",
        "sourceUrl": "https://www.facebook.com/BuckCreekOutfittersLLC/posts/if-you-are-kayaking-buck-creek-from-rainey-road-to-the-stab-fire-department-brid/866964780672912/"
      },
      {
        "label": "Put-in access",
        "value": "KY-1675 Fishing Access, 37.1516, -84.4392",
        "note": "KDFWR identifies the Stab bridge as a public carry-down access with year-round shoreline availability.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1219"
      },
      {
        "label": "Take-out access",
        "value": "Poplarville Road Fishing Access, 37.0469, -84.4314",
        "note": "KDFWR identifies Poplarville Road as a public carry-down access with unpaved parking and no amenities.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=520"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03407500 at 556 cfs / 3.49 ft",
        "note": "USGS Water Services returned same-day values for Buck Creek near Shopville, KY at 2026-07-13 19:30 EDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03407500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Hazard and route character",
        "value": "The Bent gorge, small waterfalls, and left-island line",
        "note": "KDFWR warns about strainers and cliff pressure through the Bent, then says the lower route includes several drops, a preferred left island line, and a steeper Dykes Bridge alternative to Poplarville.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Buck-Creek.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Buck Creek",
        "url": "https://fw.ky.gov/Education/Pages/Buck-Creek.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Floating Buck Creek article",
        "url": "https://fw.ky.gov/Education/Documents/Buck-Creek.pdf",
        "provider": "local"
      },
      {
        "label": "KDFWR KY-1675 Fishing Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1219",
        "provider": "local"
      },
      {
        "label": "KDFWR Poplarville Road Fishing Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=520",
        "provider": "local"
      },
      {
        "label": "USGS 03407500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03407500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03407500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03407500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "Buck Creek Outfitters same-gauge level guidance",
        "url": "https://www.facebook.com/BuckCreekOutfittersLLC/posts/if-you-are-kayaking-buck-creek-from-rainey-road-to-the-stab-fire-department-brid/866964780672912/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "buck-creek-rainey-road-poplarville-road",
    "slug": "buck-creek-rainey-road-poplarville-road",
    "name": "Buck Creek",
    "reach": "Rainey Road Fishing Access to Poplarville Road Fishing Access",
    "aliases": [
      "Buck Creek - Rainey Road to Poplarville Road",
      "Buck Creek - full lower chain to Poplarville",
      "Buck Creek all-day public chain"
    ],
    "state": "Kentucky",
    "region": "Pulaski County",
    "summary": "Full public Buck Creek chain from Rainey Road to Poplarville Road. KDFWR still documents the official Rainey-to-Stab, Stab-to-Bent, and Bent-to-Poplarville segments, supporting this 17.7-mile combined route on the direct Shopville gauge.",
    "statusText": "Use the Buck Creek near Shopville gauge. Same-gauge local Buck Creek paddling guidance says about 100 cfs and 2.0 ft or better is the minimum for a fun float. Below that expect a long scrape-prone day; higher water makes the Bent walls, lower drops, and full-route commitment much less forgiving.",
    "latitude": 37.1792,
    "longitude": -84.4564,
    "gaugeSource": {
      "id": "usgs-03407500",
      "provider": "usgs",
      "siteId": "03407500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Buck Creek near Shopville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03407500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "This all-day chain combines the friendlier upper float, the bluff-walled Bent section, and the lower drop sequence, so the route gets materially more consequential as mileage accumulates.",
        "KDFWR says higher flows can push boats against cliff bases and into strainers upstream, while the lower route includes several drops and a preferred left island line because the right chute may stay blocked.",
        "Use only the named public accesses at Rainey, Stab, Bent, and Poplarville. Most banks along the corridor are private, and Poplarville is the intended easier public finish."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "minimum-only",
      "tooLow": 100,
      "thresholdSource": {
        "label": "Buck Creek Outfitters same-gauge minimum for Buck Creek near Shopville",
        "url": "https://www.facebook.com/BuckCreekOutfittersLLC/photos/d41d8cd9/733125648816278/",
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
      "seasonNotes": "This full Buck Creek chain needs enough water to clear the same-gauge 100 cfs / 2.0 ft floor, but fresh rain quickly turns the long gorge day into a much faster and less forgiving commitment.",
      "difficulty": "moderate",
      "difficultyNotes": "The whitewater is still modest at the right level, but 17.7 miles, cumulative fatigue, private-bank limits, and the lower-route hazard stack make this a committed full-day creek route.",
      "confidenceNotes": "Confidence is reasonable but intentionally conservative: KDFWR still presents Rainey Road to the Stab / KY-1675 bridge as 4.2 miles, KY-1675 to Bent Road as 7.5 miles, and Bent Road to Poplarville as about 6.0 miles, supporting this 17.7-mile public chain. Current KDFWR access-detail pages still provide source-backed coordinates and public-use notes for Rainey and Poplarville, and same-day USGS Water Services returned 556 cfs and 3.49 ft at 2026-07-13 19:30 EDT from the direct Shopville gauge. Threshold support remains community-grade, so the route stays minimum-only on the repeated same-gauge 100 cfs / 2.0 ft floor."
    },
    "evidenceNotes": [
      {
        "label": "Official route chain",
        "value": "Rainey Road to Stab 4.2 mi plus Stab to Bent Road 7.5 mi plus Bent Road to Poplarville 6.0 mi",
        "note": "The current KDFWR Buck Creek article and map still present these as consecutive official public floats, supporting this 17.7-mile combined route.",
        "sourceUrl": "https://fw.ky.gov/Education/Documents/Buck-Creek.pdf"
      },
      {
        "label": "Minimum-flow support",
        "value": "About 100 cfs and 2.0 ft minimum",
        "note": "Buck Creek Outfitters continues to use the Shopville gauge and says the creek needs to be above about 100 cfs and 2.0 ft for a fun float.",
        "sourceUrl": "https://www.facebook.com/BuckCreekOutfittersLLC/posts/if-you-are-kayaking-buck-creek-from-rainey-road-to-the-stab-fire-department-brid/866964780672912/"
      },
      {
        "label": "Put-in access",
        "value": "Rainey Road Fishing Access, 37.1792, -84.4564",
        "note": "KDFWR identifies Rainey Road as a public carry-down access with unpaved parking and no amenities.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=521"
      },
      {
        "label": "Take-out access",
        "value": "Poplarville Road Fishing Access, 37.0469, -84.4314",
        "note": "KDFWR identifies Poplarville Road as a public carry-down access with unpaved parking and no amenities.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=520"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03407500 at 556 cfs / 3.49 ft",
        "note": "USGS Water Services returned same-day values for Buck Creek near Shopville, KY at 2026-07-13 19:30 EDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03407500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Hazard and route character",
        "value": "Upper bluffs, The Bent gorge, lower drops, and Poplarville finish",
        "note": "KDFWR describes the upper bluff corridor into the Bent, then warns that the lower route includes several dicey-at-high-water drops and a preferred left island line before the easier Poplarville take-out.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Buck-Creek.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Buck Creek",
        "url": "https://fw.ky.gov/Education/Pages/Buck-Creek.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Floating Buck Creek article",
        "url": "https://fw.ky.gov/Education/Documents/Buck-Creek.pdf",
        "provider": "local"
      },
      {
        "label": "KDFWR Rainey Road Fishing Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=521",
        "provider": "local"
      },
      {
        "label": "KDFWR Poplarville Road Fishing Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=520",
        "provider": "local"
      },
      {
        "label": "USGS 03407500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03407500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03407500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03407500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      },
      {
        "label": "Buck Creek Outfitters same-gauge level guidance",
        "url": "https://www.facebook.com/BuckCreekOutfittersLLC/posts/if-you-are-kayaking-buck-creek-from-rainey-road-to-the-stab-fire-department-brid/866964780672912/",
        "provider": "local"
      }
    ]
  },
  {
    "id": "upper-salt-river-dry-branch-road-salt-river-ramp-3",
    "slug": "upper-salt-river-dry-branch-road-salt-river-ramp-3",
    "name": "Upper Salt River",
    "reach": "Dry Branch Road Access to Salt River Ramp 3 Access",
    "aliases": [
      "Upper Salt River - Dry Branch to Ramp 3",
      "Salt River - Dry Branch Road to Salt River Park",
      "Upper Salt River Harrodsburg segment"
    ],
    "state": "Kentucky",
    "region": "Mercer County",
    "summary": "Short Upper Salt River float from Dry Branch Road Access to Salt River Ramp 3 in Harrodsburg. KDFWR lists this exact 3.1-mile segment and ties it to the direct Glensboro gauge with official cfs and stage bands.",
    "statusText": "Use the Salt River at Glensboro gauge. KDFWR rates 130 to 400 cfs or 3.7 to 4.5 ft as good. Below that expect scrape-prone riffles; above that the narrow channel and the mandatory take-out at Ramp 3 deserve more caution.",
    "latitude": 37.7348,
    "longitude": -84.8637,
    "gaugeSource": {
      "id": "usgs-03295400",
      "provider": "usgs",
      "siteId": "03295400",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Salt River at Glensboro, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/03295400/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "low_head_dam",
        "mandatory_takeout",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "KDFWR says a low-head dam sits directly downstream of Salt River Ramp 3, so Ramp 3 is the mandatory finish rather than an optional stop.",
        "The Upper Salt is narrow enough that rain can add push quickly even when the mileage is short.",
        "Both accesses are simple carry-down style sites with private property close to the corridor, so stay inside the named access footprints."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 130,
      "idealMax": 400,
      "tooLow": 130,
      "tooHigh": 400,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Salt River at Glensboro",
        "url": "https://fw.ky.gov/Fish/Pages/Upper_Salt_River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "windSensitivity": 0.3,
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
      "seasonNotes": "This short Upper Salt segment works best when the Glensboro gauge is inside KDFWR's good band. Dry spells expose more riffles and scrape lines, while storms quickly add current in the narrow channel.",
      "difficulty": "easy",
      "difficultyNotes": "The mileage is short and the route is broad-audience friendly at normal flows, but the direct-downstream low-head dam means the take-out cannot be missed and higher water removes some of the margin.",
      "confidenceNotes": "Confidence is good for a guarded Kentucky add: KDFWR lists Dry Branch Road Access to Salt River Ramp 3 Access as an exact 3.1-mile route, publishes official 130 to 400 cfs and 3.7 to 4.5 ft good bands for the Glensboro gauge, and current access-detail pages provide source-backed coordinates and public-use notes for both endpoints. Same-day USGS Water Services returned 134 cfs and 3.56 ft at 2026-07-03 17:00 EDT for Salt River at Glensboro, which keeps the live path current while honestly flagging a slightly below-band day."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Dry Branch Road Access to Salt River Ramp 3 Access, 3.1 mi",
        "note": "KDFWR lists this exact Upper Salt River site-to-site mileage on the current river page.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Upper_Salt_River.aspx"
      },
      {
        "label": "Official level band",
        "value": "130-400 cfs or 3.7-4.5 ft good",
        "note": "KDFWR rates the Salt River at Glensboro gauge as Low below 130 cfs or 3.7 ft, Good from 130 to 400 cfs or 3.7 to 4.5 ft, and High above those marks.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Upper_Salt_River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Dry Branch Road Access, 37.7348, -84.8637",
        "note": "KDFWR identifies Dry Branch Road Access as a public carry-down site for canoes and kayaks with limited parking and no amenities.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1256"
      },
      {
        "label": "Take-out access",
        "value": "Salt River Ramp 3 Access, 37.7562, -84.8723",
        "note": "KDFWR identifies Salt River Ramp 3 in Salt River Park as a public carry-down launch with parking and park seating, and warns that a low-head dam sits directly downstream.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=434"
      },
      {
        "label": "Mandatory take-out hazard",
        "value": "Low-head dam directly downstream of Ramp 3",
        "note": "KDFWR explicitly warns that a low-head dam is directly downstream of Salt River Ramp 3, making the access the required finish for this route.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Upper_Salt_River.aspx"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03295400 at 134 cfs / 3.56 ft",
        "note": "USGS Water Services returned same-day July 3, 2026 discharge and stage values for Salt River at Glensboro during this run. The cfs reading is barely inside the official runnable band, while stage still sits just below the 3.7 ft good floor.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03295400&parameterCd=00060,00065&siteStatus=all"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Upper Salt River",
        "url": "https://fw.ky.gov/Fish/Pages/Upper_Salt_River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Dry Branch Road Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1256",
        "provider": "local"
      },
      {
        "label": "KDFWR Salt River Ramp 3 Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=434",
        "provider": "local"
      },
      {
        "label": "USGS 03295400 Salt River at Glensboro",
        "url": "https://waterdata.usgs.gov/monitoring-location/03295400/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03295400 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03295400&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "upper-salt-river-rice-road-ford-drydock-road",
    "slug": "upper-salt-river-rice-road-ford-drydock-road",
    "name": "Upper Salt River",
    "reach": "Rice Road Ford Access to Drydock Road Access",
    "aliases": [
      "Upper Salt River - Rice Road Ford to Drydock Road",
      "Salt River - Rice Road to Drydock",
      "Upper Salt River Lawrenceburg west segment"
    ],
    "state": "Kentucky",
    "region": "Anderson County",
    "summary": "Mid-length Upper Salt River float from Rice Road Ford Access to Drydock Road Access west of Lawrenceburg. KDFWR lists this exact 7.5-mile segment and ties it to the direct Glensboro gauge with official cfs and stage bands.",
    "statusText": "Use the Salt River at Glensboro gauge. KDFWR rates 130 to 400 cfs or 3.7 to 4.5 ft as good. Below that expect more scraping and slower riffles; above that the narrow bends, wood, and simple carry-down accesses deserve more respect.",
    "latitude": 37.9904,
    "longitude": -84.9194,
    "gaugeSource": {
      "id": "usgs-03295400",
      "provider": "usgs",
      "siteId": "03295400",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Salt River at Glensboro, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/03295400/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "This Upper Salt segment is simple at normal flow, but it is still a narrow runoff-sensitive river where fresh wood and tight bends matter.",
        "Rice Road and Drydock are both basic carry-down or ford-style public accesses with limited parking and no amenities.",
        "Most of the shoreline between the named accesses is private, so do not treat bars or banks as casual public stops."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 130,
      "idealMax": 400,
      "tooLow": 130,
      "tooHigh": 400,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Salt River at Glensboro",
        "url": "https://fw.ky.gov/Fish/Pages/Upper_Salt_River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "high",
      "windSensitivity": 0.3,
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
      "seasonNotes": "This Upper Salt segment is most straightforward when the Glensboro gauge is inside the KDFWR good band. Drier periods expose more scrape-prone riffles, while fresh rain quickly adds current and muddier footing.",
      "difficulty": "easy",
      "difficultyNotes": "The route is a manageable broad-audience river day in ordinary flow, but the simple carry-down accesses, wood, and runoff sensitivity keep it from being a no-thought flatwater shuttle.",
      "confidenceNotes": "Confidence is good for a conservative Kentucky add: KDFWR lists Rice Road Ford Access to Drydock Road Access as an exact 7.5-mile route, publishes official 130 to 400 cfs and 3.7 to 4.5 ft good bands for the Glensboro gauge, and current access-detail pages provide source-backed coordinates and public-use notes for both endpoints. Same-day USGS Water Services returned 134 cfs and 3.56 ft at 2026-07-03 17:00 EDT for Salt River at Glensboro, which keeps the live path current while honestly flagging a scratchier below-stage day."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Rice Road Ford Access to Drydock Road Access, 7.5 mi",
        "note": "KDFWR lists this exact Upper Salt River site-to-site mileage on the current river page.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Upper_Salt_River.aspx"
      },
      {
        "label": "Official level band",
        "value": "130-400 cfs or 3.7-4.5 ft good",
        "note": "KDFWR rates the Salt River at Glensboro gauge as Low below 130 cfs or 3.7 ft, Good from 130 to 400 cfs or 3.7 to 4.5 ft, and High above those marks.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Upper_Salt_River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Rice Road Ford Access, 37.9904, -84.9194",
        "note": "KDFWR identifies Rice Road Ford as a public kayak and canoe access with limited parking at the ford and no amenities.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1258"
      },
      {
        "label": "Take-out access",
        "value": "Drydock Road Access, 38.0070, -84.9813",
        "note": "KDFWR identifies Drydock Road Access as a public carry-down site with limited parking and no amenities.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1259"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03295400 at 134 cfs / 3.56 ft",
        "note": "USGS Water Services returned same-day July 3, 2026 discharge and stage values for Salt River at Glensboro during this run. The cfs reading barely clears the official floor, while stage still sits slightly below the 3.7 ft good band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03295400&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Narrow riffle-run river with simple roadside carries",
        "note": "KDFWR describes the Upper Salt as a semi-remote narrow river with riffle and run habitat, while both selected accesses stay minimal and private-property-adjacent.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Upper_Salt_River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Upper Salt River",
        "url": "https://fw.ky.gov/Fish/Pages/Upper_Salt_River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Rice Road Ford Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1258",
        "provider": "local"
      },
      {
        "label": "KDFWR Drydock Road Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1259",
        "provider": "local"
      },
      {
        "label": "USGS 03295400 Salt River at Glensboro",
        "url": "https://waterdata.usgs.gov/monitoring-location/03295400/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03295400 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03295400&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "barren-river-tailwater-martinsville",
    "slug": "barren-river-tailwater-martinsville",
    "name": "Barren River",
    "reach": "Barren River Lake Tailwater to Martinsville Ford / Claypool Ramp",
    "aliases": [
      "Barren River - Tailwater to Martinsville Ford",
      "Lower Barren River tailwater continuation",
      "Barren River Lake Tailwater to Claypool"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Longer lower-Barren continuation from the public Barren River Lake Tailwater ramp to Martinsville Ford / Claypool Ramp. KDFWR's current mileage table supports this 17.2-mile route by chaining the official Tailwater-to-VPA and VPA-to-Martinsville segments against the direct Finney stage gauge.",
    "statusText": "Use the Barren River near Finney gauge. KDFWR rates 78.0 to 78.5 ft as good for boating and fishing. Below that expect a longer scrape-prone day; above that open bends, release changes, and the broad downstream finish deserve more caution.",
    "latitude": 36.8947,
    "longitude": -86.1348,
    "gaugeSource": {
      "id": "usgs-03313000",
      "provider": "usgs",
      "siteId": "03313000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Barren River near Finney, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03313000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "This longer lower-Barren continuation is still an easy river at normal water, but release changes and fresh rain can add more current over a full-day commitment.",
        "The route starts at a campground-style public tailwater launch and ends at a more basic ford-style ramp, so groups should not overestimate downstream amenities.",
        "Much of the shoreline is private, and the VPA midpoint is a legal access point rather than a general-purpose rest or camping area."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 78,
      "idealMax": 78.5,
      "tooLow": 78,
      "tooHigh": 78.5,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Barren River near Finney",
        "url": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "This longer lower-Barren route works best in normal spring and fall water. Summer lows lengthen the day through shoals and slower pools, while storms and release changes can add push over a route that already needs a full-day plan.",
      "difficulty": "easy",
      "difficultyNotes": "The current is broad-audience friendly in ordinary conditions, but 17-plus miles of open river, wind, and private-bank limits make this more than a casual half-day float.",
      "confidenceNotes": "Confidence is high for a conservative Kentucky add: KDFWR lists Barren River Lake Tailwater to Barren River VPA #3 as 13.3 miles and Barren River VPA #3 to Martinsville Ford / Claypool Ramp as 3.9 miles, which support this 17.2-mile chained route. The same page still publishes official low/good/high stage bands for Barren River near Finney, KDFWR access-detail pages still expose source-backed coordinates and public-use notes for both endpoints, and USGS Water Services returned a same-day July 3, 2026 stage reading of 77.99 ft at USGS 03313000. That keeps the live path current while honestly flagging a slightly below-band day."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Tailwater to Martinsville Ford, about 17.2 mi",
        "note": "KDFWR lists Tailwater to Barren River VPA #3 at 13.3 miles and Barren River VPA #3 to Martinsville Ford / Claypool Ramp at 3.9 miles, supporting this longer lower-Barren continuation of about 17.2 miles.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "78.0-78.5 ft good",
        "note": "KDFWR rates the Barren River near Finney gauge as Low below 78.0 ft, Good from 78.0 to 78.5 ft, and High above 78.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Barren River Lake Tailwater, 36.8947, -86.1348",
        "note": "KDFWR identifies the tailwater access as a free public ramp with campground amenities, restrooms, and year-round availability.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=6"
      },
      {
        "label": "Take-out access",
        "value": "Martinsville Ford / Claypool Ramp, 36.9134, -86.2293",
        "note": "KDFWR identifies Martinsville Ford as a free public ramp and bank-fishing access with plenty of parking along the ford crossing and no camping.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=624"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03313000 at 77.99 ft",
        "note": "USGS Water Services returned a same-day July 3, 2026 gage-height reading for Barren River near Finney during this run. That stage sits just below KDFWR's good band, so expect a slower low-water day.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03313000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Tailwater launch, broad pools, shoals, and a ford-style finish",
        "note": "KDFWR describes the lower Barren corridor as a mix of shoals and deeper rocky pools, with the tailwater launch offering campground amenities and Martinsville providing a simpler ford-side public finish.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Lower Barren River",
        "url": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Barren River Lake Tailwater",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=6",
        "provider": "local"
      },
      {
        "label": "KDFWR Martinsville Ford / Claypool Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=624",
        "provider": "local"
      },
      {
        "label": "USGS 03313000 Barren River near Finney",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03313000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03313000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03313000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "goose-creek-jacks-tobacco-road",
    "slug": "goose-creek-jacks-tobacco-road",
    "name": "Goose Creek",
    "reach": "Jacks / Bowling Branch Bridge Access to Tobacco Road Bridge Ramp",
    "aliases": [
      "Goose Creek - Jacks to Tobacco Road",
      "Goose Creek upper lower-Manchester split",
      "Goose Creek - Bowling Branch to Tobacco Road"
    ],
    "state": "Kentucky",
    "region": "Eastern Kentucky",
    "summary": "Short Goose Creek split from Jacks / Bowling Branch Bridge Access to Tobacco Road Bridge Ramp. KDFWR documents the exact 2.2-mile public segment, both carry-down bridge accesses, and the official Manchester gauge bands.",
    "statusText": "Use the Goose Creek at Manchester gauge. KDFWR rates 175 to 514 cfs as good for boating and fishing. Below that is low and scrape-prone; above that is high and pushier than this narrow bridge-to-bridge creek segment should be sold for.",
    "latitude": 37.2052,
    "longitude": -83.7372,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "low_head_dam",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "This split starts at Jacks / Bowling Branch below the Rawlings / Stinson low-head-dam warning; do not move the put-in upstream or treat the Manchester access as interchangeable.",
        "Use KDFWR's Manchester bands the same day: below 175 cfs or 7.4 ft expect scraping, while above 514 cfs or 8.5 ft the narrow creek and bridge access get less forgiving.",
        "Use only the KDFWR-listed Jacks and Tobacco Road carry-down accesses, keep vehicles fully off the road edge, and do not rely on private banks for stops or bailouts."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03281100",
      "provider": "usgs",
      "siteId": "03281100",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Goose Creek at Manchester, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03281100/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 175,
      "idealMax": 514,
      "tooLow": 175,
      "tooHigh": 514,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Goose Creek at Manchester",
        "url": "https://fw.ky.gov/Fish/Pages/Goose_Creek.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "Goose Creek is a flashy small eastern-Kentucky stream. The short length makes this split tempting, but same-day rain and wood matter more than calendar season.",
      "difficulty": "easy",
      "difficultyNotes": "At normal levels this is a straightforward bridge-to-bridge creek float, but it is still narrow, shallow, and sensitive to low water, wood, and quick rises.",
      "confidenceNotes": "Confidence is high for a conservative split add: KDFWR publishes this exact 2.2-mile Jacks-to-Tobacco segment, gives official Manchester cfs and stage bands, and exposes source-backed coordinates for both endpoints. USGS Water Services returned same-day values of 19.9 cfs and 6.02 ft on July 11, 2026, which keeps the live path current while honestly flagging a below-band low-water day."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Jacks/Bowling Branch Bridge Access to Tobacco Road Bridge Ramp, 2.2 mi",
        "note": "KDFWR lists Jacks/Bowling Branch Bridge Access to Tobacco Road Bridge Ramp as a 2.2-mile Goose Creek segment in the access-mileage table.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Goose_Creek.aspx"
      },
      {
        "label": "Official level band",
        "value": "175-514 cfs / 7.4-8.5 ft good",
        "note": "KDFWR rates Goose Creek at Manchester as Low below 175 cfs or 7.4 ft, Good from 175 to 514 cfs or 7.4 to 8.5 ft, and High above 514 cfs or 8.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Goose_Creek.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Jacks/Bowling Branch Bridge Access, 37.2052, -83.7372",
        "note": "KDFWR identifies Jacks/Bowling Branch as a year-round carry-down access with unpaved parking and no amenities.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1195"
      },
      {
        "label": "Take-out access",
        "value": "Tobacco Road Bridge Ramp, 37.2163, -83.7175",
        "note": "KDFWR identifies Tobacco Road Bridge Access as a year-round carry-down access under the bridge with unpaved parking and no amenities.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1196"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03281100 at 19.9 cfs / 6.02 ft",
        "note": "USGS Water Services returned same-day Goose Creek at Manchester values at 22:45 EDT on July 11, 2026. Both values remain below KDFWR's good band, so the route should score low today.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03281100&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Short shallow creek split below the upstream dam warning",
        "note": "KDFWR's Goose Creek page describes a relatively shallow stream with riffles, pools, and rock bars. Starting at Jacks keeps this split below the Rawlings/Stinson low-head-dam warning attached to the upstream access.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Goose_Creek.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Goose Creek",
        "url": "https://fw.ky.gov/Fish/Pages/Goose_Creek.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Jacks/Bowling Branch Bridge Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1195",
        "provider": "local"
      },
      {
        "label": "KDFWR Tobacco Road Bridge Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1196",
        "provider": "local"
      },
      {
        "label": "USGS 03281100 Goose Creek at Manchester",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03281100/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03281100 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03281100&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "goose-creek-jacks-dump-hollow",
    "slug": "goose-creek-jacks-dump-hollow",
    "name": "Goose Creek",
    "reach": "Jacks / Bowling Branch Bridge Access to Dump Hollow Ford",
    "aliases": [
      "Goose Creek - Jacks to Dump Hollow",
      "Goose Creek short lower-Manchester connector",
      "Goose Creek - Bowling Branch to Dump Hollow"
    ],
    "state": "Kentucky",
    "region": "Eastern Kentucky",
    "summary": "Short lower-Manchester Goose Creek connector from Jacks / Bowling Branch Bridge Access to Dump Hollow Ford. KDFWR's access-mileage table supports this 3.0-mile public route by combining the exact Jacks-to-Tobacco and Tobacco-to-Dump segments against the direct Manchester gauge.",
    "statusText": "Use the Goose Creek at Manchester gauge. KDFWR rates 175 to 514 cfs, or 7.4 to 8.5 ft, as good for boating and fishing. The gauge was 191 cfs and 7.32 ft at 2026-07-14 00:45 EDT, so flow is barely in-band while stage is still slightly low; treat this as a marginal low-water day.",
    "latitude": 37.2052,
    "longitude": -83.7372,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "low_head_dam",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "This connector starts at Jacks / Bowling Branch below the Rawlings / Stinson low-head-dam warning; do not move the put-in upstream or treat the Manchester access as interchangeable.",
        "Use KDFWR's Manchester bands the same day: below 175 cfs or 7.4 ft expect scraping, while above 514 cfs or 8.5 ft the narrow creek and ford-side finish get less forgiving.",
        "Dump Hollow is a ford-style take-out that KDFWR warns can be difficult or dangerous at high water; inspect the landing, road edge, and turnaround before launching."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03281100",
      "provider": "usgs",
      "siteId": "03281100",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Goose Creek at Manchester, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03281100/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 175,
      "idealMax": 514,
      "tooLow": 175,
      "tooHigh": 514,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Goose Creek at Manchester",
        "url": "https://fw.ky.gov/Fish/Pages/Goose_Creek.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "Goose Creek is a flashy small eastern-Kentucky stream. The short length makes this connector tempting, but same-day rain and wood matter more than calendar season.",
      "difficulty": "easy",
      "difficultyNotes": "At normal levels this is a straightforward bridge-to-ford creek float, but it is still narrow, shallow, and sensitive to low water, wood, and quick rises.",
      "confidenceNotes": "Confidence is high for a conservative split add: KDFWR documents the Jacks/Bowling Branch to Tobacco Road segment at 2.2 miles and Tobacco Road to Dump Hollow at 0.8 miles, which combine cleanly into a 3.0-mile downstream route below the Rawlings / Stinson low-head-dam warning. KDFWR also publishes official Manchester cfs and stage bands and source-backed endpoint coordinates. Same-day USGS Water Services returned 191 cfs and 7.32 ft at 2026-07-14 00:45 EDT for USGS 03281100, so the creek is just barely inside the discharge band while still a touch low on stage."
    },
    "evidenceNotes": [
      {
        "label": "Official route chain",
        "value": "Jacks/Bowling Branch Bridge Access to Dump Hollow Ford, about 3.0 mi",
        "note": "KDFWR lists Jacks/Bowling Branch Bridge Access to Tobacco Road Bridge Ramp as 2.2 miles and Tobacco Road Bridge Ramp to Dump Hollow Ford as 0.8 miles, supporting a combined public route of about 3.0 miles.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Goose_Creek.aspx"
      },
      {
        "label": "Official level band",
        "value": "175-514 cfs / 7.4-8.5 ft good",
        "note": "KDFWR rates Goose Creek at Manchester as Low below 175 cfs or 7.4 ft, Good from 175 to 514 cfs or 7.4 to 8.5 ft, and High above 514 cfs or 8.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Goose_Creek.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Jacks/Bowling Branch Bridge Access, 37.2052, -83.7372",
        "note": "KDFWR identifies Jacks/Bowling Branch as a year-round carry-down access with unpaved parking and no amenities.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1195"
      },
      {
        "label": "Take-out access",
        "value": "Dump Hollow Ford, 37.2127, -83.7040",
        "note": "KDFWR identifies Dump Hollow Ford Road as a year-round carry-down access with unpaved parking and no amenities, while warning it can be difficult or dangerous at high water.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1197"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03281100 at 191 cfs / 7.32 ft",
        "note": "USGS Water Services returned same-day Goose Creek at Manchester values at 00:45 EDT on July 14, 2026. The discharge is barely inside KDFWR's good band while stage is still slightly below it, so the route should stay cautious and low-end today.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03281100&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Short shallow creek connector below the upstream dam warning",
        "note": "KDFWR's Goose Creek page describes a relatively shallow stream with riffles, pools, and rock bars. Starting at Jacks keeps this route below the Rawlings / Stinson low-head-dam warning attached to the upstream Manchester ramp.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Goose_Creek.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Goose Creek",
        "url": "https://fw.ky.gov/Fish/Pages/Goose_Creek.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Jacks/Bowling Branch Bridge Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1195",
        "provider": "local"
      },
      {
        "label": "KDFWR Dump Hollow Ford Road",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1197",
        "provider": "local"
      },
      {
        "label": "USGS 03281100 Goose Creek at Manchester",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03281100/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03281100 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03281100&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "goose-creek-tobacco-road-dump-hollow",
    "slug": "goose-creek-tobacco-road-dump-hollow",
    "name": "Goose Creek",
    "reach": "Tobacco Road Bridge Ramp to Dump Hollow Ford",
    "aliases": [
      "Goose Creek - Tobacco Road to Dump Hollow",
      "Goose Creek middle lower-Manchester split",
      "Goose Creek bridge-to-ford segment"
    ],
    "state": "Kentucky",
    "region": "Eastern Kentucky",
    "summary": "Very short Goose Creek split from Tobacco Road Bridge Ramp to Dump Hollow Ford. KDFWR documents the exact 0.8-mile public segment, both carry-down accesses, and the official Manchester gauge bands.",
    "statusText": "Use the Goose Creek at Manchester gauge. KDFWR rates 175 to 514 cfs as good for boating and fishing. Below that is low and scrape-prone; above that is high and especially awkward at the ford-style take-out.",
    "latitude": 37.2163,
    "longitude": -83.7175,
    "gaugeSource": {
      "id": "usgs-03281100",
      "provider": "usgs",
      "siteId": "03281100",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Goose Creek at Manchester, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03281100/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 175,
      "idealMax": 514,
      "tooLow": 175,
      "tooHigh": 514,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Goose Creek at Manchester",
        "url": "https://fw.ky.gov/Fish/Pages/Goose_Creek.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This tiny split still needs a same-day weather and wood check because Goose Creek can rise quickly and change character in a few hours.",
      "difficulty": "easy",
      "difficultyNotes": "This is the simplest Goose Creek split by mileage, but it still uses narrow roadside carry-down accesses and a ford-style finish that gets less forgiving as water rises.",
      "confidenceNotes": "Confidence is high for a conservative split add: KDFWR publishes this exact 0.8-mile Tobacco-Road-to-Dump-Hollow segment, the direct Manchester gauge bands, and source-backed endpoint coordinates. USGS Water Services returned same-day values of 19.9 cfs and 6.02 ft on July 11, 2026, confirming the creek is currently below the official good band."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Tobacco Road Bridge Ramp to Dump Hollow Ford, 0.8 mi",
        "note": "KDFWR lists Tobacco Road Bridge Ramp to Dump Hollow Ford as a 0.8-mile Goose Creek segment in the access-mileage table.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Goose_Creek.aspx"
      },
      {
        "label": "Official level band",
        "value": "175-514 cfs / 7.4-8.5 ft good",
        "note": "KDFWR rates Goose Creek at Manchester as Low below 175 cfs or 7.4 ft, Good from 175 to 514 cfs or 7.4 to 8.5 ft, and High above 514 cfs or 8.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Goose_Creek.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Tobacco Road Bridge Ramp, 37.2163, -83.7175",
        "note": "KDFWR identifies Tobacco Road Bridge Access as a year-round carry-down access under the bridge with unpaved parking and no amenities.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1196"
      },
      {
        "label": "Take-out access",
        "value": "Dump Hollow Ford, 37.2127, -83.7040",
        "note": "KDFWR identifies Dump Hollow Ford Road as a year-round carry-down access with unpaved parking and no amenities.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1197"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03281100 at 19.9 cfs / 6.02 ft",
        "note": "USGS Water Services returned same-day Goose Creek at Manchester values at 22:45 EDT on July 11, 2026. Both values remain below KDFWR's good band, so the route should score low today.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03281100&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Tiny creek split with ford-style finish",
        "note": "KDFWR's Goose Creek page describes a shallow creek with riffles, pools, and rock bars, while the Dump Hollow access note keeps the downstream ford caution explicit.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Goose_Creek.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Goose Creek",
        "url": "https://fw.ky.gov/Fish/Pages/Goose_Creek.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Tobacco Road Bridge Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1196",
        "provider": "local"
      },
      {
        "label": "KDFWR Dump Hollow Ford Road",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1197",
        "provider": "local"
      },
      {
        "label": "USGS 03281100 Goose Creek at Manchester",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03281100/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03281100 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03281100&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "goose-creek-dump-hollow-laurel-branch",
    "slug": "goose-creek-dump-hollow-laurel-branch",
    "name": "Goose Creek",
    "reach": "Dump Hollow Ford to Laurel Branch Road Access",
    "aliases": [
      "Goose Creek - Dump Hollow to Laurel Branch",
      "Goose Creek lower lower-Manchester split",
      "Goose Creek ford-to-laurel segment"
    ],
    "state": "Kentucky",
    "region": "Eastern Kentucky",
    "summary": "Lower Goose Creek split from Dump Hollow Ford to Laurel Branch Road Access. KDFWR documents the exact 4.8-mile public segment, both roadside accesses, and the official Manchester gauge bands.",
    "statusText": "Use the Goose Creek at Manchester gauge. KDFWR rates 175 to 514 cfs as good for boating and fishing. Below that is low and likely to mean scraping; above that is high and makes the ford-style put-in and narrow creek bends less forgiving.",
    "latitude": 37.2127,
    "longitude": -83.704,
    "gaugeSource": {
      "id": "usgs-03281100",
      "provider": "usgs",
      "siteId": "03281100",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Goose Creek at Manchester, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03281100/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 175,
      "idealMax": 514,
      "tooLow": 175,
      "tooHigh": 514,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Goose Creek at Manchester",
        "url": "https://fw.ky.gov/Fish/Pages/Goose_Creek.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This lower split is the cleanest medium-length Goose Creek option, but it still reacts quickly to eastern-Kentucky rain and changing wood.",
      "difficulty": "easy",
      "difficultyNotes": "At normal levels this is a manageable shallow-creek float, but the ford-style launch, wood, and narrow outside bends mean conditions outside the official band should be treated cautiously.",
      "confidenceNotes": "Confidence is high for a conservative split add: KDFWR publishes this exact 4.8-mile Dump-Hollow-to-Laurel segment, the direct Manchester gauge bands, and source-backed coordinates for both endpoints. USGS Water Services returned same-day values of 19.9 cfs and 6.02 ft on July 11, 2026, confirming a current low-water day below the official good band."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Dump Hollow Ford to Laurel Branch Road Access, 4.8 mi",
        "note": "KDFWR lists Dump Hollow Ford to Laurel Branch Road Access as a 4.8-mile Goose Creek segment in the access-mileage table.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Goose_Creek.aspx"
      },
      {
        "label": "Official level band",
        "value": "175-514 cfs / 7.4-8.5 ft good",
        "note": "KDFWR rates Goose Creek at Manchester as Low below 175 cfs or 7.4 ft, Good from 175 to 514 cfs or 7.4 to 8.5 ft, and High above 514 cfs or 8.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Goose_Creek.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Dump Hollow Ford, 37.2127, -83.7040",
        "note": "KDFWR identifies Dump Hollow Ford Road as a year-round carry-down access with unpaved parking and no amenities.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1197"
      },
      {
        "label": "Take-out access",
        "value": "Laurel Branch Road Access, 37.2370, -83.6703",
        "note": "KDFWR identifies Laurel Branch Road as a year-round carry-down access with limited parking, no amenities, and private banks outside the immediate launch area.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1198"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03281100 at 19.9 cfs / 6.02 ft",
        "note": "USGS Water Services returned same-day Goose Creek at Manchester values at 22:45 EDT on July 11, 2026. Both values remain below KDFWR's good band, so the route should score low today.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03281100&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Lower Goose Creek day split with ford launch and roadside finish",
        "note": "KDFWR's Goose Creek page describes a relatively shallow stream with riffles, pools, and rock bars, while the access pages keep the simple roadside nature of both endpoints explicit.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Goose_Creek.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Goose Creek",
        "url": "https://fw.ky.gov/Fish/Pages/Goose_Creek.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Dump Hollow Ford Road",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1197",
        "provider": "local"
      },
      {
        "label": "KDFWR Laurel Branch Road Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1198",
        "provider": "local"
      },
      {
        "label": "USGS 03281100 Goose Creek at Manchester",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03281100/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03281100 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03281100&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "goose-creek-jacks-laurel-branch",
    "slug": "goose-creek-jacks-laurel-branch",
    "name": "Goose Creek",
    "reach": "Jacks / Bowling Branch Bridge Access to Laurel Branch Road Access",
    "aliases": [
      "Goose Creek - Jacks to Laurel Branch",
      "Goose Creek lower Manchester segment",
      "Goose Creek - Bowling Branch to Laurel Branch"
    ],
    "state": "Kentucky",
    "region": "Eastern Kentucky",
    "summary": "Narrow Clay County Goose Creek float from Jacks / Bowling Branch Bridge to Laurel Branch Road. KDFWR documents the consecutive 2.2-mile, 0.8-mile, and 4.8-mile access pairs that combine into this 7.8-mile lower-Goose route, and the Manchester gauge provides official cfs and stage bands.",
    "statusText": "Use the Goose Creek at Manchester gauge. KDFWR rates 175 to 514 cfs as good for boating and fishing. Below that is low and likely to mean scraping or dragging; above that is high and deserves extra narrow-creek caution.",
    "latitude": 37.2052,
    "longitude": -83.7372,
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "low_head_dam",
        "strainers",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "This combined route starts at Jacks / Bowling Branch below the Rawlings / Stinson low-head-dam warning; do not move the put-in upstream or treat the Manchester access as interchangeable.",
        "Use KDFWR's Manchester bands the same day: below 175 cfs or 7.4 ft expect scraping, while above 514 cfs or 8.5 ft the narrow creek and roadside landings get less forgiving.",
        "Stay with the KDFWR-listed Jacks, Tobacco Road, Dump Hollow, and Laurel Branch accesses; outside those small public sites, private banks are not planned stops or bailouts."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03281100",
      "provider": "usgs",
      "siteId": "03281100",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Goose Creek at Manchester, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03281100/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 175,
      "idealMax": 514,
      "tooLow": 175,
      "tooHigh": 514,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Goose Creek at Manchester",
        "url": "https://fw.ky.gov/Fish/Pages/Goose_Creek.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "Goose Creek is a smaller eastern Kentucky stream that changes quickly after rain. Spring and rainy fall windows are the most reliable; warm dry stretches can leave it scrape-prone even when the gauge still looks close.",
      "difficulty": "easy",
      "difficultyNotes": "This lower-Goose segment avoids the Manchester low-head-dam problem upstream, but it is still a narrow shallow creek with rock bars, ford access, wood, and limited parking. Treat it as an easy moving-water creek only in the official good band.",
      "confidenceNotes": "Confidence is good for a conservative Kentucky add: KDFWR documents the Jacks/Bowling Branch to Tobacco Road, Tobacco Road to Dump Hollow, and Dump Hollow to Laurel Branch access-to-access segments, which combine cleanly into a 7.8-mile downstream route that avoids the low-head-dam warning attached to Rawlings and Stinson Park. KDFWR publishes official low/good/high stage and cfs bands for USGS 03281100 Goose Creek at Manchester, and USGS Water Services returned same-day June 22, 2026 values of 16.4 cfs and 5.96 ft during this run. The creek is therefore well below the good band today, so the app should score it low and preserve scraping caution."
    },
    "evidenceNotes": [
      {
        "label": "Official route chain",
        "value": "Jacks to Laurel Branch, 7.8 mi combined",
        "note": "KDFWR lists Jacks/Bowling Branch to Tobacco Road as 2.2 miles, Tobacco Road to Dump Hollow as 0.8 miles, and Dump Hollow to Laurel Branch as 4.8 miles. Combined, they create a clean 7.8-mile downstream Goose Creek route.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Goose_Creek.aspx"
      },
      {
        "label": "Official level band",
        "value": "175-514 cfs good",
        "note": "KDFWR rates Goose Creek at Manchester as Low below 175 cfs, Good from 175 to 514 cfs, and High above 514 cfs; the same page also publishes matching stage bands of Low below 7.4 ft, Good from 7.4 to 8.5 ft, and High above 8.5 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Goose_Creek.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Jacks/Bowling Branch Bridge Access, 37.2052, -83.7372",
        "note": "KDFWR identifies Jacks/Bowling Branch as a year-round carry-down access beside the Phil Young Road bridge with limited roadside parking and no amenities.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1195"
      },
      {
        "label": "Take-out access",
        "value": "Laurel Branch Road Access, 37.2370, -83.6703",
        "note": "KDFWR identifies Laurel Branch Road as a year-round carry-down access with limited parking, no amenities, and private banks outside the immediate launch area.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1198"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03281100 at 16.4 cfs / 5.96 ft",
        "note": "USGS Water Services returned same-day June 22, 2026 discharge and gage-height readings for Goose Creek at Manchester during this route-add run. Both values sit below KDFWR's good bands, so the route should score low today.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03281100&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Rock bars, shallow pools, ford bailout, private banks",
        "note": "KDFWR describes Goose Creek as a relatively shallow stream with riffles, pools, and rock bars. The route passes Tobacco Road and Dump Hollow, which remain usable bailout points but have limited parking and no amenities.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Goose_Creek.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Goose Creek",
        "url": "https://fw.ky.gov/Fish/Pages/Goose_Creek.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Jacks/Bowling Branch Bridge Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1195",
        "provider": "local"
      },
      {
        "label": "KDFWR Laurel Branch Road Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1198",
        "provider": "local"
      },
      {
        "label": "KDFWR Dump Hollow Ford Road",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1197",
        "provider": "local"
      },
      {
        "label": "KDFWR Tobacco Road Bridge Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1196",
        "provider": "local"
      },
      {
        "label": "USGS 03281100 Goose Creek at Manchester",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03281100/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03281100 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03281100&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "south-fork-kentucky-river-rocky-branch-fish-creek",
    "slug": "south-fork-kentucky-river-rocky-branch-fish-creek",
    "name": "South Fork Kentucky River",
    "reach": "Rocky Branch Road Access to Fish Creek Boat Ramp",
    "aliases": [
      "South Fork Kentucky River - Rocky Branch to Fish Creek",
      "South Fork Kentucky River lower full continuation",
      "KDFWR South Fork Kentucky River access chain"
    ],
    "state": "Kentucky",
    "region": "Eastern Kentucky",
    "summary": "Long lower South Fork Kentucky River continuation from Rocky Branch Road Access to Fish Creek Boat Ramp. Current KDFWR guidance still supports this chained public reach with the Booneville gauge and a paved downstream finish north of Booneville.",
    "statusText": "Use the South Fork Kentucky River at Booneville gauge. KDFWR rates 350 to 900 cfs, or 4.8 to 6.0 ft, as good for boating and fishing. Same-day USGS values during this run were 994 cfs and 6.15 ft, above the official good band, so expect faster current and less forgiving muddy landings over a long downstream commitment.",
    "latitude": 37.3206,
    "longitude": -83.6648,
    "gaugeSource": {
      "id": "usgs-03281500",
      "provider": "usgs",
      "siteId": "03281500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "South Fork Kentucky River at Booneville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03281500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 350,
      "idealMax": 900,
      "tooLow": 350,
      "tooHigh": 900,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for South Fork Kentucky River at Booneville",
        "url": "https://fw.ky.gov/Fish/Pages/SFKY_River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This long lower-corridor South Fork route is most practical from spring through fall when the Booneville gauge trend is stable. Lower summer flows expose more shoals and dragging, while rain can quickly raise the broad lower current and muddy the simple landings.",
      "difficulty": "easy",
      "difficultyNotes": "KDFWR describes the South Fork as relatively broad with shallow to medium depths, mud banks, rock bars, and occasional riffles. The water stays approachable, but 26.9 miles makes this a true full-day downstream commitment.",
      "confidenceNotes": "Confidence is high for a conservative Kentucky restoration: current KDFWR guidance still documents Rocky Branch Road Access to Cedar Valley Road Access at 2.5 miles, Cedar Valley Road Access to Bishop Bend School Road Access at 4.7 miles, Bishop Bend School Road Access to Hacker Branch Road Access at 3.3 miles, Hacker Branch Road Access to Upper Wolf Creek Ramp at 2.9 miles, Upper Wolf Creek Ramp to Kay Wood Road Access at 5.6 miles, and Kay Wood Road Access to Fish Creek Boat Ramp at 7.9 miles, supporting a 26.9-mile public float. KDFWR still publishes exact public endpoint coordinates and official Booneville low/good/high bands tied to direct USGS gauge 03281500, and USGS Water Services returned same-day July 13, 2026 discharge and stage during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "350-900 cfs / 4.8-6.0 ft",
        "note": "KDFWR rates South Fork Kentucky River at Booneville as Low below 350 cfs or 4.8 ft, Good from 350 to 900 cfs or 4.8 to 6.0 ft, and High above 900 cfs or 6.0 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/SFKY_River.aspx"
      },
      {
        "label": "Chained public route segment",
        "value": "Rocky Branch Road Access to Fish Creek Boat Ramp, 26.9 miles",
        "note": "KDFWR lists Rocky Branch Road Access to Cedar Valley Road Access as 2.5 miles, Cedar Valley Road Access to Bishop Bend School Road Access as 4.7 miles, Bishop Bend School Road Access to Hacker Branch Road Access as 3.3 miles, Hacker Branch Road Access to Upper Wolf Creek Ramp as 2.9 miles, Upper Wolf Creek Ramp to Kay Wood Road Access as 5.6 miles, and Kay Wood Road Access to Fish Creek Boat Ramp as 7.9 miles, supporting a 26.9-mile public Rocky-Branch-to-Fish-Creek float on the same access chain.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/SFKY_River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Rocky Branch Road Access, 37.3206, -83.6648",
        "note": "KDFWR identifies Rocky Branch Road Access as a free carry-down-only access with unpaved parking and no camping.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1124"
      },
      {
        "label": "Take-out access",
        "value": "Fish Creek Boat Ramp, 37.4906, -83.6894",
        "note": "KDFWR identifies Fish Creek Boat Ramp as a free single-lane paved ramp with gravel parking and no listed camping or amenities.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=994"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03281500 at 994 cfs / 6.15 ft",
        "note": "USGS Water Services returned same-day values of 994 cfs and 6.15 ft at 2026-07-13 10:30 EDT for South Fork Kentucky River at Booneville during this run, above the official good band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03281500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Broad river, rock bars, occasional riffles",
        "note": "KDFWR describes the South Fork Kentucky River as relatively broad with shallow to medium depths, mud banks, rock bars, and occasional riffles.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/SFKY_River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR South Fork Kentucky River",
        "url": "https://fw.ky.gov/Fish/Pages/SFKY_River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR South Fork Kentucky River access guide",
        "url": "https://fw.ky.gov/Fish/Documents/South%20Fork%20of%20Kentucky%20River.pdf",
        "provider": "local"
      },
      {
        "label": "KDFWR Rocky Branch Road Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1124",
        "provider": "local"
      },
      {
        "label": "KDFWR Fish Creek Boat Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=994",
        "provider": "local"
      },
      {
        "label": "USGS 03281500 South Fork Kentucky River at Booneville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03281500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03281500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03281500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "south-fork-kentucky-river-rocky-branch-kay-wood",
    "slug": "south-fork-kentucky-river-rocky-branch-kay-wood",
    "name": "South Fork Kentucky River",
    "reach": "Rocky Branch Road Access to Kay Wood Road Access",
    "aliases": [
      "South Fork Kentucky River - Rocky Branch to Kay Wood",
      "South Fork Kentucky River middle-to-lower chain",
      "KDFWR South Fork Kentucky River access chain"
    ],
    "state": "Kentucky",
    "region": "Eastern Kentucky",
    "summary": "Long middle-to-lower South Fork continuation from Rocky Branch Road Access to Kay Wood Road Access. Current KDFWR guidance still supports this exact chained public float, but the Booneville gauge sat above the official good band during this run.",
    "statusText": "Use the South Fork Kentucky River at Booneville gauge. KDFWR rates 350 to 900 cfs, or 4.8 to 6.0 ft, as good for boating and fishing. Same-day USGS values during this run were 1050 cfs and 6.24 ft, above the official good band, so expect faster current and less forgiving muddy landings.",
    "latitude": 37.3206,
    "longitude": -83.6648,
    "gaugeSource": {
      "id": "usgs-03281500",
      "provider": "usgs",
      "siteId": "03281500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "South Fork Kentucky River at Booneville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03281500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 350,
      "idealMax": 900,
      "tooLow": 350,
      "tooHigh": 900,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for South Fork Kentucky River at Booneville",
        "url": "https://fw.ky.gov/Fish/Pages/SFKY_River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This middle-to-lower South Fork chain is most practical from spring through fall when the Booneville gauge trend is stable. Lower summer flows expose more rock bars and dragging, while rain can quickly raise current and muddy the carry-down landings.",
      "difficulty": "easy",
      "difficultyNotes": "KDFWR describes the South Fork as relatively broad with shallow to medium depths, mud banks, rock bars, and occasional riffles. At nineteen miles, this route is a full moving-water commitment with more fatigue and line-picking than the shorter lower corridor.",
      "confidenceNotes": "Confidence is high for a conservative Kentucky add: current KDFWR guidance still documents Rocky Branch Road Access to Cedar Valley Road Access at 2.5 miles, Cedar Valley Road Access to Bishop Bend School Road Access at 4.7 miles, Bishop Bend School Road Access to Hacker Branch Road Access at 3.3 miles, Hacker Branch Road Access to Upper Wolf Creek Ramp at 2.9 miles, and Upper Wolf Creek Ramp to Kay Wood Road Access at 5.6 miles, supporting a 19.0-mile public float. KDFWR still publishes exact public endpoint coordinates and official Booneville low/good/high bands tied to direct USGS gauge 03281500, and USGS Water Services returned same-day values of 1050 cfs and 6.24 ft at 2026-07-13 08:30 EDT during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "350-900 cfs / 4.8-6.0 ft",
        "note": "KDFWR rates South Fork Kentucky River at Booneville as Low below 350 cfs or 4.8 ft, Good from 350 to 900 cfs or 4.8 to 6.0 ft, and High above 900 cfs or 6.0 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/SFKY_River.aspx"
      },
      {
        "label": "Chained public route segment",
        "value": "Rocky Branch Road Access to Kay Wood Road Access, 19.0 miles",
        "note": "KDFWR lists Rocky Branch Road Access to Cedar Valley Road Access as 2.5 miles, Cedar Valley Road Access to Bishop Bend School Road Access as 4.7 miles, Bishop Bend School Road Access to Hacker Branch Road Access as 3.3 miles, Hacker Branch Road Access to Upper Wolf Creek Ramp as 2.9 miles, and Upper Wolf Creek Ramp to Kay Wood Road Access as 5.6 miles, supporting a 19.0-mile public Rocky-Branch-to-Kay-Wood float on the same access chain.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/SFKY_River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Rocky Branch Road Access, 37.3206, -83.6648",
        "note": "KDFWR identifies Rocky Branch Road Access as a gravel-and-dirt canoe and kayak access with limited parking and no camping.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1124"
      },
      {
        "label": "Take-out access",
        "value": "Kay Wood Road Access, 37.4594, -83.6509",
        "note": "KDFWR identifies Kay Wood Road Access as a carry-down-only access with unpaved parking and no camping.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1121"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03281500 at 1050 cfs / 6.24 ft",
        "note": "USGS Water Services returned same-day values of 1050 cfs and 6.24 ft at 2026-07-13 08:30 EDT for South Fork Kentucky River at Booneville during this run, above the official good band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03281500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Broad river, rock bars, occasional riffles",
        "note": "KDFWR describes the South Fork Kentucky River as relatively broad with shallow to medium depths, mud banks, rock bars, and occasional riffles.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/SFKY_River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR South Fork Kentucky River",
        "url": "https://fw.ky.gov/Fish/Pages/SFKY_River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR South Fork Kentucky River access guide",
        "url": "https://fw.ky.gov/Fish/Documents/South%20Fork%20of%20Kentucky%20River.pdf",
        "provider": "local"
      },
      {
        "label": "KDFWR Rocky Branch Road Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1124",
        "provider": "local"
      },
      {
        "label": "KDFWR Kay Wood Road Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1121",
        "provider": "local"
      },
      {
        "label": "USGS 03281500 South Fork Kentucky River at Booneville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03281500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03281500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03281500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "green-river-tailwater-roachville-ford",
    "slug": "green-river-tailwater-roachville-ford",
    "name": "Green River",
    "reach": "Green River Lake Tailwater to Roachville Ford",
    "aliases": [
      "Green River - Tailwater to Roachville",
      "Upper Green River tailwater opener",
      "KDFWR Upper Green Tailwater to Roachville Ford"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Upper Green opener from the public Green River Lake Tailwater ramp to Roachville Ford. KDFWR still lists this exact 12.5-mile public segment, keeps the endpoint access details current, and ties the corridor to the direct Greensburg stage gauge.",
    "statusText": "Use the Green River at Greensburg gauge. KDFWR rates 1.0 to 1.75 ft as good for boating and fishing. Below that expect slower shoals, more scraping, and a muddier ford finish; above that the broad current and bends deserve more caution.",
    "latitude": 37.2416,
    "longitude": -85.3441,
    "gaugeSource": {
      "id": "usgs-03306500",
      "provider": "usgs",
      "siteId": "03306500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Green River at Greensburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "private_banks",
        "strainers"
      ],
      "safetyNotes": [
        "KDFWR says boats are not permitted upstream of the tailwater ramp and that the first shoal sits about a quarter mile below the Highway 55 bridge.",
        "Roachville Ford is a low-water gravel ford that may require portaging or dragging during lower-flow periods.",
        "Most shoreline between the named accesses is private, so stay with the public endpoints and avoid improvised bank exits."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1,
      "idealMax": 1.75,
      "tooLow": 1,
      "tooHigh": 1.75,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Green River at Greensburg",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "This upper-Green day is most practical in spring through fall when the Greensburg stage is stable. Summer lows can turn the shoals and ford finish into a slower scrape-fest, while storms or release changes can make the broad current pushier than it first looks.",
      "difficulty": "easy",
      "difficultyNotes": "This is still a broad-audience Green River float, but the tailwater launch, first shoal, private banks, and low-water ford finish mean it is more than a lazy pond-style outing.",
      "confidenceNotes": "Confidence is high for a conservative Kentucky add: KDFWR's Pool 6 Green River page still lists Green River Lake Tailwater Ramp to Roachville Ford as an exact 12.5-mile public segment, still publishes the official Greensburg gauge ladder of Low below 1.0 ft, Good from 1.0 to 1.75 ft, and High above 1.75 ft, and current KDFWR access-detail pages still expose source-backed coordinates and public-use notes for both endpoints. USGS Water Services returned a same-day July 10, 2026 stage of 1.58 ft from direct gauge 03306500 during this run, inside the official good band."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Green River Lake Tailwater to Roachville Ford, 12.5 mi",
        "note": "KDFWR's Pool 6 Green River page still lists this exact public float at 12.5 miles.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "1.0-1.75 ft good",
        "note": "KDFWR rates the Green River gauge at Greensburg as Low below 1.0 ft, Good from 1.0 to 1.75 ft, and High above 1.75 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Green River Lake Tailwater, 37.2416, -85.3441",
        "note": "KDFWR identifies the tailwater ramp as a free public paved launch with security-lit parking, restroom facilities, and a no-upstream-boating rule above the ramp.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=588"
      },
      {
        "label": "Take-out access",
        "value": "Roachville Ford, 37.2353, -85.4241",
        "note": "KDFWR identifies Roachville Ford as a free public low-water ford access with limited roadside parking and no amenities.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=221"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03306500 at 1.58 ft",
        "note": "USGS Water Services returned a same-day July 10, 2026 06:15 CDT gage-height reading for Green River at Greensburg during this run. That stage sits inside KDFWR's good band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Tailwater opener, first shoal below Highway 55, and low-water ford finish",
        "note": "KDFWR says the first shoal is a quarter mile below the Highway 55 bridge at the launch and describes Roachville as a low-water ford with shallow riffles, pools, and water willow beds where portaging may be needed in lower flows.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Pool 6 Green River",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Green River Lake Tailwater",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=588",
        "provider": "local"
      },
      {
        "label": "KDFWR Roachville Ford",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=221",
        "provider": "local"
      },
      {
        "label": "USGS 03306500 Green River at Greensburg",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03306500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "green-river-tailwater-american-legion",
    "slug": "green-river-tailwater-american-legion",
    "name": "Green River",
    "reach": "Green River Lake Tailwater to American Legion Park Ramp",
    "aliases": [
      "Green River - Tailwater to American Legion",
      "Upper Green tailwater to American Legion",
      "KDFWR Upper Green Tailwater to American Legion"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Long Upper Green River route from the public Green River Lake Tailwater ramp to American Legion Park Ramp. KDFWR supports this 21.4-mile public route by chaining the exact 12.5-mile Tailwater-to-Roachville, 6.6-mile Roachville-to-Russell, and 2.3-mile Russell-to-American-Legion segments on the same Greensburg stage model.",
    "statusText": "Use the Green River at Greensburg gauge. KDFWR rates 1.0 to 1.75 ft as good for boating and fishing. Below that expect a long scrape-prone day; above that the broader current, islands, and the park-ramp finish deserve more caution.",
    "latitude": 37.2416,
    "longitude": -85.3441,
    "gaugeSource": {
      "id": "usgs-03306500",
      "provider": "usgs",
      "siteId": "03306500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Green River at Greensburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "private_banks",
        "strainers",
        "remote"
      ],
      "safetyNotes": [
        "KDFWR says boats are not permitted upstream of the tailwater ramp and that the first shoal sits below Highway 55 shortly after launch.",
        "This longer route passes the islands and chutes above Russell Ford before finishing at American Legion Park, so low water, woody debris, and fatigue matter more than on the shorter upper-Green splits.",
        "Most banks are private, and the clean legal landings are the named accesses at Roachville, Russell Ford, and American Legion Park."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1,
      "idealMax": 1.75,
      "tooLow": 1,
      "tooHigh": 1.75,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Green River at Greensburg",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "This upper-Green continuation is best in spring through fall when the Greensburg stage is stable. Summer lows expose more shoals and mud through a very long day, while storms or release changes can turn the islands and wider current into a more sustained push.",
      "difficulty": "moderate",
      "difficultyNotes": "The current is still broad-audience friendly at normal levels, but more than twenty miles of private-bank river, shoals, islands, and a longer shuttle make this a committed full-day float rather than a casual family run.",
      "confidenceNotes": "Confidence is high for a conservative Kentucky add: KDFWR's Pool 6 Green River page still lists Green River Lake Tailwater to Roachville Ford as 12.5 miles, Roachville Ford to Russell Ford as 6.6 miles, and Russell Ford to American Legion Park Ramp as 2.3 miles, supporting this 21.4-mile public route. The same page still publishes the official Greensburg gauge ladder of Low below 1.0 ft, Good from 1.0 to 1.75 ft, and High above 1.75 ft, current KDFWR access-detail pages still expose source-backed coordinates and public-use notes for the Tailwater and American Legion endpoints, and USGS Water Services returned a same-day July 11, 2026 stage of 1.68 ft at 20:15 CDT from direct gauge 03306500 during this run, inside the official good band."
    },
    "evidenceNotes": [
      {
        "label": "Official route chain",
        "value": "12.5 + 6.6 + 2.3 mi",
        "note": "KDFWR lists Tailwater to Roachville at 12.5 miles, Roachville to Russell at 6.6, and Russell to American Legion at 2.3, supporting a combined public route of about 21.4 miles.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "1.0-1.75 ft good",
        "note": "KDFWR rates the Green River gauge at Greensburg as Low below 1.0 ft, Good from 1.0 to 1.75 ft, and High above 1.75 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Green River Lake Tailwater, 37.2416, -85.3441",
        "note": "KDFWR identifies the tailwater ramp as a free public paved launch with security-lit parking, restroom facilities, and a no-upstream-boating rule above the ramp.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=588"
      },
      {
        "label": "Take-out access",
        "value": "American Legion Park Ramp, 37.2441, -85.4795",
        "note": "KDFWR identifies American Legion Park as a free public upper-Green ramp with unpaved parking, year-round availability, and no camping.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=954"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03306500 at 1.68 ft",
        "note": "USGS Water Services returned a same-day July 11, 2026 20:15 CDT gage-height reading for Green River at Greensburg during this run. That stage sits inside KDFWR's good band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Tailwater launch, islands and chutes, and a park-ramp finish",
        "note": "KDFWR says the route begins below the Tailwater shoal, describes the Roachville-to-Russell section as islands and chutes through water willow beds, and notes that the Russell-to-Greensburg corridor can be cut in half at American Legion Park.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Upper-Green-River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Pool 6 Green River",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Upper Green River",
        "url": "https://fw.ky.gov/Education/Pages/Upper-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Green River Lake Tailwater",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=588",
        "provider": "local"
      },
      {
        "label": "KDFWR American Legion Park Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=954",
        "provider": "local"
      },
      {
        "label": "USGS 03306500 Green River at Greensburg",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03306500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "green-river-tailwater-russell-ford",
    "slug": "green-river-tailwater-russell-ford",
    "name": "Green River",
    "reach": "Green River Lake Tailwater to Russell Ford Access",
    "aliases": [
      "Green River - Tailwater to Russell Ford",
      "Upper Green River long tailwater split",
      "KDFWR Upper Green Tailwater to Russell"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Longer upper Green route from the public Green River Lake Tailwater ramp to Russell Ford Access. KDFWR supports this 19.1-mile public route by combining the exact 12.5-mile Tailwater-to-Roachville segment with the exact 6.6-mile Roachville-to-Russell segment on the same Greensburg stage model.",
    "statusText": "Use the Green River at Greensburg gauge. KDFWR rates 1.0 to 1.75 ft as good for boating and fishing. Below that expect a longer scrape-prone day; above that the broader current, islands, and easy-to-miss Russell landing deserve more caution.",
    "latitude": 37.2416,
    "longitude": -85.3441,
    "gaugeSource": {
      "id": "usgs-03306500",
      "provider": "usgs",
      "siteId": "03306500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Green River at Greensburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "private_banks",
        "strainers",
        "remote"
      ],
      "safetyNotes": [
        "KDFWR says boats are not permitted upstream of the tailwater ramp and that the first shoal sits below Highway 55 shortly after launch.",
        "This longer route passes Roachville, then continues into the islands and chutes above Russell Ford, where paddlers unfamiliar with the route can drift past the left-side take-out.",
        "Most banks are private and services are sparse, so treat this as a full point-to-point day rather than a route with casual public stopovers."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1,
      "idealMax": 1.75,
      "tooLow": 1,
      "tooHigh": 1.75,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Green River at Greensburg",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "This upper-Green combination is best in spring through fall when the Greensburg stage is stable. Summer lows expose more shoals and mud through a longer day, while storms or release changes can turn the islands and wider current into a more sustained push.",
      "difficulty": "moderate",
      "difficultyNotes": "The current is still broad-audience friendly at normal levels, but nearly twenty miles of private-bank river, shoals, and a subtle take-out make this more committed than the shorter Upper Green splits.",
      "confidenceNotes": "Confidence is high for a conservative Kentucky add: KDFWR's Pool 6 Green River page still lists Green River Lake Tailwater to Roachville Ford as 12.5 miles and Roachville Ford to Russell Ford as 6.6 miles, supporting this 19.1-mile public route. The same page still publishes the official Greensburg gauge ladder of Low below 1.0 ft, Good from 1.0 to 1.75 ft, and High above 1.75 ft, current KDFWR access-detail pages still expose source-backed coordinates and public-use notes for the Tailwater and Russell endpoints, and USGS Water Services returned a same-day July 10, 2026 stage of 1.58 ft from direct gauge 03306500 during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official route chain",
        "value": "Tailwater -> Roachville 12.5 mi plus Roachville -> Russell 6.6 mi",
        "note": "KDFWR lists both public site-to-site mileages on the Pool 6 Green River page, supporting this combined 19.1-mile route.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "1.0-1.75 ft good",
        "note": "KDFWR rates the Green River gauge at Greensburg as Low below 1.0 ft, Good from 1.0 to 1.75 ft, and High above 1.75 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Green River Lake Tailwater, 37.2416, -85.3441",
        "note": "KDFWR identifies the tailwater ramp as a free public paved launch with security-lit parking, restroom facilities, and a no-upstream-boating rule above the ramp.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=588"
      },
      {
        "label": "Take-out access",
        "value": "Russell Ford Access, 37.2738, -85.4784",
        "note": "KDFWR identifies Russell Ford as a free public carry-down access with unpaved parking and year-round 24-hour availability.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=955"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03306500 at 1.58 ft",
        "note": "USGS Water Services returned a same-day July 10, 2026 06:15 CDT gage-height reading for Green River at Greensburg during this run. That stage sits inside KDFWR's good band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Tailwater launch, islands and chutes, and a subtle left-bank take-out",
        "note": "KDFWR says the route begins below the Tailwater shoal and describes the Roachville-to-Russell section as islands and chutes through water willow beds where paddlers can drift past the Russell Ford landing if they are not watching the left bank.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Upper-Green-River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Pool 6 Green River",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Upper Green River",
        "url": "https://fw.ky.gov/Education/Pages/Upper-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Green River Lake Tailwater",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=588",
        "provider": "local"
      },
      {
        "label": "KDFWR Russell Ford Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=955",
        "provider": "local"
      },
      {
        "label": "USGS 03306500 Green River at Greensburg",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03306500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "green-river-roachville-russell-ford",
    "slug": "green-river-roachville-russell-ford",
    "name": "Green River",
    "reach": "Roachville Ford to Russell Ford Access",
    "aliases": [
      "Green River - Roachville Ford to Russell Ford",
      "Upper Green River manageable float",
      "KDFWR Upper Green Roachville to Russell"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Manageable upper Green float from Roachville Ford to Russell Ford Access. KDFWR still publishes this exact 6.6-mile public segment, keeps both endpoint coordinates current, and ties the corridor to the direct Greensburg stage gauge.",
    "statusText": "Use the Green River at Greensburg gauge. KDFWR rates 1.0 to 1.75 ft as good for boating and fishing. Below that expect slower shoals, more dragging, and muddier landings; above that the islands and chutes get pushier and deserve more caution.",
    "latitude": 37.2353,
    "longitude": -85.4241,
    "gaugeSource": {
      "id": "usgs-03306500",
      "provider": "usgs",
      "siteId": "03306500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Green River at Greensburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1,
      "idealMax": 1.75,
      "tooLow": 1,
      "tooHigh": 1.75,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Green River at Greensburg",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "This short upper-Green day is most practical from spring through fall when the Greensburg stage is stable. Summer lows can turn the riffles and shoals into a slower scrape-fest, while storms or releases can make the channels around the islands pushier than they first look.",
      "difficulty": "easy",
      "difficultyNotes": "This is still a manageable Green River float, but the islands, chutes, shallow shoals, and easy-to-miss Russell Ford landing reward active line choice rather than sleepy drifting.",
      "confidenceNotes": "Confidence is high for a conservative Kentucky add: KDFWR's Upper Green article still lists Roachville Ford to Russell Ford as an exact 6.6-mile public segment, while the Pool 6 page preserves the official Greensburg gauge ladder of Low below 1.0 ft, Good from 1.0 to 1.75 ft, and High above 1.75 ft. Current KDFWR access-detail pages still expose coordinates and public availability for both endpoints, and USGS Water Services returned a same-day July 10, 2026 stage of 1.58 ft from direct gauge 03306500 during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Roachville Ford to Russell Ford, 6.6 mi",
        "note": "KDFWR's Upper Green article still lists this exact public float at 6.6 miles.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Upper-Green-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "1.0-1.75 ft good",
        "note": "KDFWR rates the Green River gauge at Greensburg as Low below 1.0 ft, Good from 1.0 to 1.75 ft, and High above 1.75 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Roachville Ford, 37.2353, -85.4241",
        "note": "KDFWR identifies Roachville Ford as a free public low-water ford access with limited roadside parking and no camping.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=221"
      },
      {
        "label": "Take-out access",
        "value": "Russell Ford Access, 37.2738, -85.4784",
        "note": "KDFWR identifies Russell Ford as a free public carry-down access with unpaved parking and year-round 24-hour availability.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=955"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03306500 at 1.58 ft",
        "note": "USGS Water Services returned a same-day July 10, 2026 06:15 CDT gage-height reading for Green River at Greensburg during this run. That stage sits inside KDFWR's good band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Islands, chutes, shoals, and an easy-to-miss take-out",
        "note": "KDFWR describes this upper section as islands and chutes through water willow beds and warns that paddlers new to the route can float past Russell Ford if they are not looking for the left-side take-out.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Upper-Green-River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Upper Green River",
        "url": "https://fw.ky.gov/Education/Pages/Upper-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Pool 6 Green River",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Roachville Ford",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=221",
        "provider": "local"
      },
      {
        "label": "KDFWR Russell Ford Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=955",
        "provider": "local"
      },
      {
        "label": "USGS 03306500 Green River at Greensburg",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03306500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "green-river-roachville-american-legion",
    "slug": "green-river-roachville-american-legion",
    "name": "Green River",
    "reach": "Roachville Ford to American Legion Park Ramp",
    "aliases": [
      "Green River - Roachville to American Legion",
      "Upper Green Roachville Ford to American Legion Park",
      "KDFWR Upper Green Roachville to Greensburg park split"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Upper Green continuation from Roachville Ford to American Legion Park Ramp. KDFWR supports this 8.9-mile public route by combining the official 6.6-mile Roachville-to-Russell segment with the official 2.3-mile Russell-to-American-Legion split, plus direct Greensburg stage guidance.",
    "statusText": "Use the Green River at Greensburg gauge. KDFWR rates 1.0 to 1.75 ft as good for boating and fishing. Today the gauge is in-band at 1.64 ft; below that expect more scraping around shoals and islands, while above that the chutes, bends, and park landing deserve more caution.",
    "latitude": 37.2353,
    "longitude": -85.4241,
    "gaugeSource": {
      "id": "usgs-03306500",
      "provider": "usgs",
      "siteId": "03306500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Green River at Greensburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1,
      "idealMax": 1.75,
      "tooLow": 1,
      "tooHigh": 1.75,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Green River at Greensburg",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "This upper Green combination is best from spring through fall when the Greensburg stage is stable. Summer lows expose more shoals and sticky mud around the islands, while storms or release changes can make the chutes and bends pushier than the mileage suggests.",
      "difficulty": "easy",
      "difficultyNotes": "This remains an approachable Green River float, but it is longer than the short split routes and still rewards active line choice around islands, shallow shoals, and the park approach into Greensburg.",
      "confidenceNotes": "Confidence is high for a conservative Kentucky add: KDFWR's Upper Green article still lists Roachville Ford to Russell Ford as 6.6 miles, while the Pool 6 page still lists Russell Ford to American Legion Park Ramp as 2.3 miles, supporting this 8.9-mile public route. Current KDFWR access-detail pages still expose coordinates and public availability for Roachville Ford and American Legion Park Ramp, the direct Greensburg gauge still carries the official 1.0 to 1.75 ft good band, and USGS Water Services returned a same-day July 10, 2026 stage of 1.64 ft from direct gauge 03306500 during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Roachville Ford to American Legion Park Ramp, about 8.9 mi",
        "note": "KDFWR lists Roachville Ford to Russell Ford as 6.6 miles and Russell Ford to American Legion Park Ramp as 2.3 miles, supporting a combined public route of about 8.9 miles.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Upper-Green-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "1.0-1.75 ft good",
        "note": "KDFWR rates the Green River gauge at Greensburg as Low below 1.0 ft, Good from 1.0 to 1.75 ft, and High above 1.75 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Roachville Ford, 37.2353, -85.4241",
        "note": "KDFWR identifies Roachville Ford as a free public low-water ford access with limited roadside parking and no camping.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=221"
      },
      {
        "label": "Take-out access",
        "value": "American Legion Park Ramp, 37.2441, -85.4795",
        "note": "KDFWR identifies American Legion Park Ramp as a free public carry-down launch with unpaved parking, no camping, and year-round availability.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=954"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03306500 at 1.64 ft",
        "note": "USGS Water Services returned a same-day July 10, 2026 gage-height reading for Green River at Greensburg during this run. That stage sits inside KDFWR's good band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Islands, chutes, shoals, and a muddy park finish",
        "note": "KDFWR describes the Roachville upper section as islands and chutes through water willow beds, then American Legion Park as the halfway public park access on the Greensburg corridor with gravel shoals and deep rocky banks.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Upper-Green-River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Upper Green River",
        "url": "https://fw.ky.gov/Education/Pages/Upper-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Pool 6 Green River",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Roachville Ford",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=221",
        "provider": "local"
      },
      {
        "label": "KDFWR American Legion Park Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=954",
        "provider": "local"
      },
      {
        "label": "USGS 03306500 Green River at Greensburg",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03306500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "green-river-roachville-greensburg-city-ramp",
    "slug": "green-river-roachville-greensburg-city-ramp",
    "name": "Green River",
    "reach": "Roachville Ford to Greensburg City Ramp",
    "aliases": [
      "Green River - Roachville to Greensburg",
      "Upper Green Roachville to Greensburg",
      "KDFWR Upper Green Roachville Ford to Greensburg City Ramp"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Upper Green continuation from Roachville Ford to Greensburg City Ramp. KDFWR still supports this about 11.1-mile public float by pairing the exact 6.6-mile Roachville-to-Russell segment with the same corridor's roughly 4.5-mile Russell-to-Greensburg public continuation on the direct Greensburg gauge ladder.",
    "statusText": "Use the Green River at Greensburg gauge. KDFWR rates 1.0 to 1.75 ft as good for boating and fishing. Below that expect more scraping around shoals and muddier edges; above that the broad current through town deserves more caution at bends and landings.",
    "latitude": 37.2353,
    "longitude": -85.4241,
    "gaugeSource": {
      "id": "usgs-03306500",
      "provider": "usgs",
      "siteId": "03306500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Green River at Greensburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "private_banks",
        "strainers"
      ],
      "safetyNotes": [
        "Roachville starts as a shallow low-water ford reach, and the full continuation to town is long enough that low-water dragging and fresh wood matter.",
        "Russell Ford and American Legion Park are the only clear intermediate public bailouts before Greensburg.",
        "Private banks line most of the route, so use the named public accesses only."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1,
      "idealMax": 1.75,
      "tooLow": 1,
      "tooHigh": 1.75,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Green River at Greensburg",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "This route is most practical from spring through fall when the direct Greensburg stage is stable. Summer lows expose more shoals and mud edges, while storms can make the broad town finish feel faster than the mileage suggests.",
      "difficulty": "moderate",
      "difficultyNotes": "The current stays recreational, but 11.1 miles, low-water ford starts, and limited legal stops away from the named access chain make this more than a casual float.",
      "confidenceNotes": "Confidence is good for a conservative Kentucky add: KDFWR's Upper Green article still lists Roachville Ford to Russell Ford as 6.6 miles and still frames Russell Ford to Greensburg as about 4.5 miles, which supports this about 11.1-mile public route. The current KDFWR access pages still expose coordinates and public-use details for Roachville and Greensburg, the official Greensburg gauge ladder remains Low below 1.0 ft, Good from 1.0 to 1.75 ft, and High above 1.75 ft, and same-day USGS Water Services returned 1.40 ft at 2026-07-09 16:15 CDT for direct gauge 03306500, inside the official good band."
    },
    "evidenceNotes": [
      {
        "label": "Official route chain",
        "value": "Roachville -> Russell 6.6 mi plus Russell -> Greensburg about 4.5 mi",
        "note": "KDFWR lists Roachville Ford to Russell Ford as 6.6 miles, and the same Upper Green guidance still frames Russell Ford to Greensburg as about 4.5 miles, supporting this about 11.1-mile public continuation.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Upper-Green-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "1.0-1.75 ft good",
        "note": "KDFWR rates the Green River gauge at Greensburg as Low below 1.0 ft, Good from 1.0 to 1.75 ft, and High above 1.75 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Roachville Ford, 37.2353, -85.4241",
        "note": "KDFWR identifies Roachville Ford as a free public low-water ford access with limited roadside parking and no camping.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Roachville-Ford.aspx"
      },
      {
        "label": "Take-out access",
        "value": "Greensburg City Ramp, 37.2581, -85.5057",
        "note": "KDFWR identifies Greensburg City Ramp as a free paved city-ramp launch with paved parking and nearby lodging support.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=220"
      },
      {
        "label": "Camping support",
        "value": "Greensburg city-park endpoint support",
        "note": "KDFWR says the Greensburg City Ramp sits in a park with cabins, nearby RV hookups, and shuttle help, so the route uses endpoint campground support rather than on-route camping.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03306500 at 1.40 ft",
        "note": "USGS Water Services returned a same-day July 9, 2026 gage-height reading for Green River at Greensburg during this run. That stage sits inside KDFWR's good band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Upper Green River",
        "url": "https://fw.ky.gov/Education/Pages/Upper-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Pool 6 Green River",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Roachville Ford",
        "url": "https://fw.ky.gov/Fish/Pages/Roachville-Ford.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Greensburg City Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=220",
        "provider": "local"
      },
      {
        "label": "USGS 03306500 Green River at Greensburg",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03306500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ],
    "accessPoints": [
      {
        "id": "roachville-ford",
        "name": "Roachville Ford",
        "latitude": 37.2353,
        "longitude": -85.4241,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default upstream low-water ford put-in."
      },
      {
        "id": "russell-ford-access",
        "name": "Russell Ford Access",
        "latitude": 37.2738,
        "longitude": -85.4784,
        "mileFromStart": 6.6,
        "segmentKind": "creek",
        "note": "Primary intermediate bailout if the upper miles run slower than planned."
      },
      {
        "id": "american-legion-park-ramp",
        "name": "American Legion Park Ramp",
        "latitude": 37.2441,
        "longitude": -85.4795,
        "mileFromStart": 8.9,
        "segmentKind": "creek",
        "note": "Secondary intermediate public stop before the city-ramp finish."
      },
      {
        "id": "greensburg-city-ramp",
        "name": "Greensburg City Ramp",
        "latitude": 37.2581,
        "longitude": -85.5057,
        "mileFromStart": 11.1,
        "segmentKind": "creek",
        "note": "Default downstream finish at the serviced city ramp."
      }
    ]
  },
  {
    "id": "green-river-russell-ford-american-legion",
    "slug": "green-river-russell-ford-american-legion",
    "name": "Green River",
    "reach": "Russell Ford Access to American Legion Park Ramp",
    "aliases": [
      "Green River - Russell Ford to American Legion Park",
      "Green River Upper Greensburg segment",
      "KDFWR Upper Green Russell Ford to American Legion"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Short Green County Green River segment from Russell Ford back to Greensburg. KDFWR documents the 2.3-mile public-access route, exact endpoint coordinates, and official Greensburg stage bands tied to the local USGS gauge.",
    "statusText": "Use the Green River at Greensburg gauge. KDFWR rates 1.0 to 1.75 ft as good for boating and fishing. Today the gauge is in-band at 1.63 ft; below that expect exposed shoals and muddier landings, while above that the current and park approach deserve more caution.",
    "latitude": 37.2738,
    "longitude": -85.4784,
    "gaugeSource": {
      "id": "usgs-03306500",
      "provider": "usgs",
      "siteId": "03306500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Green River at Greensburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1,
      "idealMax": 1.75,
      "tooLow": 1,
      "tooHigh": 1.75,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Green River at Greensburg",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "This upper Pool 6 segment is more reliable in spring and wetter fall periods. Summer can still work, but low stages expose shoals and muddy landings quickly, while storms can raise current and broad-river wind effects.",
      "difficulty": "easy",
      "difficultyNotes": "This is a short public-ramp Green River segment with easy route-finding, but it is still a broad moving river with shoals, muddy edges, private banks, and current that becomes less forgiving above the KDFWR good band.",
      "confidenceNotes": "Confidence is high for a conservative Kentucky restore: KDFWR still lists Russell Ford to American Legion Park Ramp as a 2.3-mile Green River segment, publishes coordinates and access-detail pages for both public endpoints, and gives official Greensburg gauge stage bands of Low below 1.0 ft, Good from 1.0 to 1.75 ft, and High above 1.75 ft. USGS Water Services returned a same-day July 11, 2026 Greensburg stage value of 1.63 ft at 11:15 CDT from the direct route gauge during this run, keeping the live-gauge support current and in band."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Russell Ford to American Legion Park, 2.3 mi",
        "note": "KDFWR lists Russell Ford to American Legion Park Ramp as a 2.3-mile Green River access-to-access segment.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "1.0-1.75 ft good",
        "note": "KDFWR rates the Green River gauge at Greensburg as Low below 1.0 ft, Good from 1.0 to 1.75 ft, and High above 1.75 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Russell Ford Access, 37.2738, -85.4784",
        "note": "KDFWR identifies Russell Ford as a free carry-down access with unpaved parking and year-round 24-hour availability.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=955"
      },
      {
        "label": "Take-out access",
        "value": "American Legion Park Ramp, 37.2441, -85.4795",
        "note": "KDFWR identifies American Legion Park as a free single-lane unpaved ramp with year-round 24-hour boat-ramp availability and ample unpaved parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=954"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03306500 at 1.63 ft",
        "note": "USGS Water Services returned a same-day July 11, 2026 11:15 CDT gage-height reading for Green River at Greensburg during this run. That stage sits inside the KDFWR good band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Shoals, deep rocky pools, muddy park landing",
        "note": "KDFWR describes the Russell Ford to American Legion reach as having good shoals with several deep rocky pools and a graded muddy/gravel park landing at the take-out.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Pool 6 Green River",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Russell Ford Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=955",
        "provider": "local"
      },
      {
        "label": "KDFWR American Legion Park Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=954",
        "provider": "local"
      },
      {
        "label": "USGS 03306500 Green River at Greensburg",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03306500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "green-river-russell-ford-greensburg-city-ramp",
    "slug": "green-river-russell-ford-greensburg-city-ramp",
    "name": "Green River",
    "reach": "Russell Ford Access to Greensburg City Ramp",
    "aliases": [
      "Green River - Russell Ford to Greensburg",
      "Upper Green Russell Ford to Greensburg",
      "KDFWR Upper Green Russell Ford Access to Greensburg City Ramp"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Upper Green float from Russell Ford Access to Greensburg City Ramp. KDFWR still frames this public continuation at about 4.5 miles and ties it to the direct Greensburg gauge with official stage bands.",
    "statusText": "Use the Green River at Greensburg gauge. KDFWR rates 1.0 to 1.75 ft as good for boating and fishing. Below that expect more scraping around shoals and muddier edges; above that the broad current through town deserves more caution at bends and landings.",
    "latitude": 37.2738,
    "longitude": -85.4784,
    "gaugeSource": {
      "id": "usgs-03306500",
      "provider": "usgs",
      "siteId": "03306500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Green River at Greensburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "private_banks",
        "strainers"
      ],
      "safetyNotes": [
        "Russell Ford is a simple gravel-bar carry-down, and low water can expose shallow shoals quickly on this reach.",
        "American Legion Park is the clear mid-route bailout before the city-ramp finish.",
        "Private banks line the route outside the named public accesses."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1,
      "idealMax": 1.75,
      "tooLow": 1,
      "tooHigh": 1.75,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Green River at Greensburg",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "This short-to-medium town continuation is most straightforward from spring through fall when the Greensburg stage is stable. Low summer stages expose more shoals and mud edges, while storms can make the broad final bends less forgiving.",
      "difficulty": "easy",
      "difficultyNotes": "The mileage is approachable for a normal day float, but the route still runs on moving water with low-water shoals, anglers, and town-ramp traffic.",
      "confidenceNotes": "Confidence is good for a conservative Kentucky add: KDFWR's Upper Green article still frames Russell Ford to Greensburg as about 4.5 miles, while the Pool 6 page preserves the official Greensburg gauge ladder of Low below 1.0 ft, Good from 1.0 to 1.75 ft, and High above 1.75 ft. Current KDFWR access pages still expose coordinates and public-use details for Russell Ford and Greensburg City Ramp, and same-day USGS Water Services returned 1.40 ft at 2026-07-09 16:15 CDT for direct gauge 03306500, inside the official good band."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Russell Ford Access to Greensburg City Ramp, about 4.5 mi",
        "note": "KDFWR's Upper Green article still frames Russell Ford to Greensburg as about a 4.5-mile public float.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Upper-Green-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "1.0-1.75 ft good",
        "note": "KDFWR rates the Green River gauge at Greensburg as Low below 1.0 ft, Good from 1.0 to 1.75 ft, and High above 1.75 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Russell Ford Access, 37.2738, -85.4784",
        "note": "KDFWR identifies Russell Ford Access as a free carry-down gravel-bar launch with unpaved parking and no camping.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=955"
      },
      {
        "label": "Take-out access",
        "value": "Greensburg City Ramp, 37.2581, -85.5057",
        "note": "KDFWR identifies Greensburg City Ramp as a free paved city-ramp launch with paved parking and nearby lodging support.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=220"
      },
      {
        "label": "Camping support",
        "value": "Greensburg city-park endpoint support",
        "note": "KDFWR says the Greensburg City Ramp sits in a park with cabins, nearby RV hookups, and shuttle help, so the route uses endpoint campground support rather than on-route camping.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03306500 at 1.40 ft",
        "note": "USGS Water Services returned a same-day July 9, 2026 gage-height reading for Green River at Greensburg during this run. That stage sits inside KDFWR's good band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Upper Green River",
        "url": "https://fw.ky.gov/Education/Pages/Upper-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Pool 6 Green River",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Russell Ford Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=955",
        "provider": "local"
      },
      {
        "label": "KDFWR Greensburg City Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=220",
        "provider": "local"
      },
      {
        "label": "USGS 03306500 Green River at Greensburg",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03306500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ],
    "accessPoints": [
      {
        "id": "russell-ford-access",
        "name": "Russell Ford Access",
        "latitude": 37.2738,
        "longitude": -85.4784,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default gravel-bar carry-down put-in."
      },
      {
        "id": "american-legion-park-ramp",
        "name": "American Legion Park Ramp",
        "latitude": 37.2441,
        "longitude": -85.4795,
        "mileFromStart": 2.3,
        "segmentKind": "creek",
        "note": "Intermediate public bailout before the final city-ramp finish."
      },
      {
        "id": "greensburg-city-ramp",
        "name": "Greensburg City Ramp",
        "latitude": 37.2581,
        "longitude": -85.5057,
        "mileFromStart": 4.5,
        "segmentKind": "creek",
        "note": "Default downstream finish at the serviced city ramp."
      }
    ]
  },
  {
    "id": "green-river-russell-ford-glenview-road",
    "slug": "green-river-russell-ford-glenview-road",
    "name": "Green River",
    "reach": "Russell Ford Access to Glenview Road Carrydown",
    "aliases": [
      "Green River - Russell Ford to Glenview",
      "Upper Green Russell Ford to Glenview",
      "KDFWR Pool 6 Russell Ford to Glenview Ford chain"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Longer Upper Green River float from Russell Ford Access to Glenview Road Carrydown. KDFWR's official Pool 6 mileage table supports this 18-mile public route by chaining the Russell Ford, American Legion, Greensburg, and Glenview access sequence against the direct Greensburg USGS gauge.",
    "statusText": "Use the Green River at Greensburg gauge. KDFWR rates 1.0 to 1.75 ft as good for boating and fishing. Today the gauge is in-band at 1.63 ft; below that expect slower shoals and more dragging, while above that the broader current and private-bank corridor deserve more caution.",
    "latitude": 37.2738,
    "longitude": -85.4784,
    "gaugeSource": {
      "id": "usgs-03306500",
      "provider": "usgs",
      "siteId": "03306500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Green River at Greensburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1,
      "idealMax": 1.75,
      "tooLow": 1,
      "tooHigh": 1.75,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Green River at Greensburg",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "This 18-mile Upper Green route is most practical in spring through fall when the Greensburg stage is stable. Summer can still work, but lower water, slower pools, and exposed wind become more noticeable over a near-full-day float.",
      "difficulty": "moderate",
      "difficultyNotes": "The river itself remains recreational, but 18 miles, limited public bailout options away from the named access chain, and the no-amenity Glenview finish make this a more committed day than the shorter Greensburg family runs.",
      "confidenceNotes": "Confidence is good for a conservative Kentucky restore: KDFWR's Pool 6 page still lists Russell Ford to American Legion Park Ramp as 2.3 miles, American Legion Park Ramp to Greensburg City Ramp as 2.0 miles, and Greensburg City Ramp to Glenview Ford as 13.7 miles, which together support this 18-mile public route. Current KDFWR access pages still expose coordinates and public-use details for Russell Ford and Glenview, the corridor still includes the official Greensburg city-ramp bailout and cabin context, the direct Greensburg gauge still carries the official 1.0 to 1.75 ft good band, and USGS Water Services returned a same-day July 11, 2026 stage of 1.63 ft at 11:15 CDT from direct gauge 03306500 during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Russell Ford to Glenview Ford, about 18.0 mi",
        "note": "KDFWR lists Russell Ford to American Legion Park Ramp as 2.3 miles, American Legion Park Ramp to Greensburg City Ramp as 2.0 miles, and Greensburg City Ramp to Glenview Ford as 13.7 miles, supporting a combined public route of about 18 miles.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "1.0-1.75 ft good",
        "note": "KDFWR rates the Green River gauge at Greensburg as Low below 1.0 ft, Good from 1.0 to 1.75 ft, and High above 1.75 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Russell Ford Access, 37.2738, -85.4784",
        "note": "KDFWR identifies Russell Ford as a free carry-down access with limited unpaved parking and year-round 24-hour availability.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Russell-Ford-Access.aspx"
      },
      {
        "label": "Take-out access",
        "value": "Glenview Road Carrydown, 37.291, -85.5913",
        "note": "KDFWR identifies Glenview Ford as a public road-end carry-down with unpaved parking, no amenities, and private land surrounding the access.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Glenview-Ford-Access.aspx"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03306500 at 1.63 ft",
        "note": "USGS Water Services returned a same-day July 11, 2026 11:15 CDT gage-height reading for Green River at Greensburg during this run. That stage sits inside the KDFWR good band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Shoals, deep pools, city-ramp bailout, private-bank finish",
        "note": "KDFWR describes Russell Ford as a shoal-and-pool access, American Legion as the halfway park access, Greensburg as the city-park stop with cabins, and Glenview as the private-bank road-end finish.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Pool 6 Green River",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Russell Ford Access",
        "url": "https://fw.ky.gov/Fish/Pages/Russell-Ford-Access.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR American Legion Park Access",
        "url": "https://fw.ky.gov/Fish/Pages/American-Legion-Park-Access.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Greensburg City Ramp",
        "url": "https://fw.ky.gov/Fish/Pages/Greensburg-City-Ramp.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Glenview Ford Access",
        "url": "https://fw.ky.gov/Fish/Pages/Glenview-Ford-Access.aspx",
        "provider": "local"
      },
      {
        "label": "USGS 03306500 Green River at Greensburg",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03306500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "green-river-greensburg-city-ramp-glenview-road",
    "slug": "green-river-greensburg-city-ramp-glenview-road",
    "name": "Green River",
    "reach": "Greensburg City Ramp to Glenview Road Carrydown",
    "aliases": [
      "Green River - Greensburg to Glenview",
      "Upper Green Greensburg to Glenview",
      "KDFWR Pool 6 Greensburg City Ramp to Glenview Road Carrydown"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Upper Green continuation from Greensburg City Ramp to Glenview Road Carrydown. KDFWR still publishes this exact 13.7-mile public segment and ties it to the direct Greensburg stage gauge.",
    "statusText": "Use the Green River at Greensburg gauge. KDFWR rates 1.0 to 1.75 ft as good for boating and fishing. Below that expect a lower, scrape-prone day; above that the broader current and private-bank Glenview finish deserve more caution.",
    "latitude": 37.2581,
    "longitude": -85.5057,
    "gaugeSource": {
      "id": "usgs-03306500",
      "provider": "usgs",
      "siteId": "03306500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Green River at Greensburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "private_banks",
        "strainers"
      ],
      "safetyNotes": [
        "This route leaves the serviced city ramp and finishes at a no-amenity road-end carrydown surrounded by private land.",
        "Low water can expose longer shoals and muddy edges, while high water makes the Glenview landing less forgiving.",
        "Treat the named public endpoints as the legal access plan rather than improvising on private banks."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1,
      "idealMax": 1.75,
      "tooLow": 1,
      "tooHigh": 1.75,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Green River at Greensburg",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "This lower Pool 6 segment is most practical from spring through fall when the direct Greensburg stage is stable. Summer lows can make it slower than the mileage suggests, while storms can make the final bends and private-bank finish pushier.",
      "difficulty": "moderate",
      "difficultyNotes": "The current stays recreational, but the route is long enough to require planning and ends at a no-amenity private-bank road-end carrydown.",
      "confidenceNotes": "Confidence is good for a conservative Kentucky add: KDFWR's Pool 6 page still lists Greensburg City Ramp to Glenview Ford as an exact 13.7-mile public segment, preserves the official Greensburg gauge ladder of Low below 1.0 ft, Good from 1.0 to 1.75 ft, and High above 1.75 ft, and current KDFWR access pages still expose coordinates and public-use details for both endpoints. Same-day USGS Water Services returned 1.40 ft at 2026-07-09 16:15 CDT for direct gauge 03306500, inside the official good band."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Greensburg City Ramp to Glenview Ford, 13.7 mi",
        "note": "KDFWR's Pool 6 Green River page still lists this exact public segment at 13.7 miles.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "1.0-1.75 ft good",
        "note": "KDFWR rates the Green River gauge at Greensburg as Low below 1.0 ft, Good from 1.0 to 1.75 ft, and High above 1.75 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Greensburg City Ramp, 37.2581, -85.5057",
        "note": "KDFWR identifies Greensburg City Ramp as a free paved city-ramp launch with paved parking and nearby lodging support.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=220"
      },
      {
        "label": "Take-out access",
        "value": "Glenview Road Carrydown, 37.2910, -85.5913",
        "note": "KDFWR identifies Glenview Ford as a public road-end carry-down with unpaved parking, no amenities, and private land surrounding the access.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1080"
      },
      {
        "label": "Camping posture",
        "value": "Nearby Greensburg basecamp support, no endpoint campground at Glenview",
        "note": "KDFWR lists no camping at either endpoint, so the route uses nearby Greensburg lodging and park support rather than on-route camping or an endpoint campground.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=220"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03306500 at 1.40 ft",
        "note": "USGS Water Services returned a same-day July 9, 2026 gage-height reading for Green River at Greensburg during this run. That stage sits inside KDFWR's good band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Pool 6 Green River",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Greensburg City Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=220",
        "provider": "local"
      },
      {
        "label": "KDFWR Glenview Road Carrydown",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1080",
        "provider": "local"
      },
      {
        "label": "USGS 03306500 Green River at Greensburg",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03306500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ],
    "accessPoints": [
      {
        "id": "greensburg-city-ramp",
        "name": "Greensburg City Ramp",
        "latitude": 37.2581,
        "longitude": -85.5057,
        "mileFromStart": 0,
        "segmentKind": "creek",
        "note": "Default city-park put-in with the best services on this segment."
      },
      {
        "id": "glenview-road-carrydown",
        "name": "Glenview Road Carrydown",
        "latitude": 37.291,
        "longitude": -85.5913,
        "mileFromStart": 13.7,
        "segmentKind": "creek",
        "note": "Default downstream finish at the no-amenity private-bank road-end carrydown."
      }
    ]
  },
  {
    "id": "green-river-american-legion-greensburg",
    "slug": "green-river-american-legion-greensburg",
    "name": "Green River",
    "reach": "American Legion Park Ramp to Greensburg City Ramp",
    "aliases": [
      "Green River - American Legion Park to Greensburg",
      "Upper Green American Legion to Greensburg",
      "KDFWR Upper Green American Legion Park Ramp to Greensburg City Ramp"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Short in-town Upper Green float from American Legion Park Ramp to Greensburg City Ramp. KDFWR still publishes this exact 2-mile public segment, the direct endpoint coordinates, and the official Greensburg stage bands tied to the local USGS gauge.",
    "statusText": "Use the Green River at Greensburg gauge. KDFWR rates 1.0 to 1.75 ft as good for boating and fishing. Below that expect more scraping around shoals and muddier edges; above that the broad current through town deserves more caution at bends and landings.",
    "latitude": 37.2441,
    "longitude": -85.4795,
    "gaugeSource": {
      "id": "usgs-03306500",
      "provider": "usgs",
      "siteId": "03306500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Green River at Greensburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1,
      "idealMax": 1.75,
      "tooLow": 1,
      "tooHigh": 1.75,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Green River at Greensburg",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "This short Greensburg segment is most practical from spring through fall when the direct stage is stable. Summer lows expose more shoals and mud edges, while storms or release changes can make the broad in-town current feel faster than the mileage suggests.",
      "difficulty": "easy",
      "difficultyNotes": "This is one of the easiest Upper Green splits, but it is still moving water with shoals, anglers, and city-ramp traffic rather than a flat pond lap.",
      "confidenceNotes": "Confidence is high for a conservative Kentucky add: KDFWR's Upper Green article still lists American Legion Park Ramp to Greensburg City Ramp as an exact 2-mile public segment, while the Pool 6 page preserves the official Greensburg gauge ladder of Low below 1.0 ft, Good from 1.0 to 1.75 ft, and High above 1.75 ft. Current KDFWR access-detail pages still expose coordinates and public availability for both endpoints, and USGS Water Services returned a same-day July 5, 2026 stage of 1.08 ft from direct gauge 03306500 during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "American Legion Park Ramp to Greensburg City Ramp, 2.0 mi",
        "note": "KDFWR's Upper Green article still lists this exact public segment as a 2-mile float.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Upper-Green-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "1.0-1.75 ft good",
        "note": "KDFWR rates the Green River gauge at Greensburg as Low below 1.0 ft, Good from 1.0 to 1.75 ft, and High above 1.75 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "American Legion Park Ramp, 37.2441, -85.4795",
        "note": "KDFWR identifies American Legion Ramp as a free public launch with unpaved parking and year-round 24-hour availability.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=954"
      },
      {
        "label": "Take-out access",
        "value": "Greensburg City Ramp, 37.2581, -85.5057",
        "note": "KDFWR identifies Greensburg City Ramp as a free paved city-ramp launch with paved parking, nearby lodging support, and year-round 24-hour availability.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=220"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03306500 at 1.08 ft",
        "note": "USGS Water Services returned a same-day July 5, 2026 gage-height reading for Green River at Greensburg during this run. That stage sits just inside KDFWR's good band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Short broad-river city float with shoals",
        "note": "KDFWR describes American Legion as a park access with gravel shoals and deep rocky banks, then Greensburg as the city-ramp finish with cabins and local services nearby.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Upper Green River",
        "url": "https://fw.ky.gov/Education/Pages/Upper-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Pool 6 Green River",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR American Legion Park Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=954",
        "provider": "local"
      },
      {
        "label": "KDFWR Greensburg City Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=220",
        "provider": "local"
      },
      {
        "label": "USGS 03306500 Green River at Greensburg",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03306500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "green-river-greensburg-city-ramp-lynn-camp-creek",
    "slug": "green-river-greensburg-city-ramp-lynn-camp-creek",
    "name": "Green River",
    "reach": "Greensburg City Ramp to Lynn Camp Creek Ramp",
    "aliases": [
      "Green River - Greensburg to Lynn Camp",
      "Upper Green Greensburg to Lynn Camp",
      "KDFWR Pool 6 Greensburg City Ramp to Lynn Camp Creek chain"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Long upper Green River continuation from Greensburg City Ramp to Lynn Camp Creek Ramp. KDFWR supports this 32.9-mile public route by combining the official Greensburg-to-Glenview and Glenview-to-Lynn-Camp segments against the direct Greensburg USGS gauge.",
    "statusText": "Use the Green River at Greensburg gauge. KDFWR rates 1.0 to 1.75 ft as good for boating and fishing. Today the gauge is in-band at 1.63 ft; below that expect a slower all-day grind, while above that the broad current, private banks, and steep Lynn Camp finish deserve more caution.",
    "latitude": 37.2581,
    "longitude": -85.5057,
    "gaugeSource": {
      "id": "usgs-03306500",
      "provider": "usgs",
      "siteId": "03306500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Green River at Greensburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1,
      "idealMax": 1.75,
      "tooLow": 1,
      "tooHigh": 1.75,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Green River at Greensburg",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
      "windSensitivity": 0.75,
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
      "seasonNotes": "This long Greensburg-to-Lynn-Camp continuation is most practical in spring through fall when the stage is stable and the group has full daylight. Lower summer water can turn the long pools below Glenview into a real endurance day.",
      "difficulty": "hard",
      "difficultyNotes": "The current stays recreational, but 32.9 miles, broad-river wind, sparse legal stops below Glenview, private-bank limits, and the steep Lynn Camp finish make this a hard planning route.",
      "confidenceNotes": "Confidence is good for a conservative Kentucky restore: KDFWR's Pool 6 page still lists Greensburg City Ramp to Glenview Ford as 13.7 miles and Glenview Ford to Lynn Camp Creek Ramp as 19.2 miles, which together support this 32.9-mile public route. Current KDFWR access-detail pages still expose coordinates and public-use rules for Greensburg, Glenview, and Lynn Camp, the direct Greensburg gauge still carries the official 1.0 to 1.75 ft good band, and USGS Water Services returned a same-day July 11, 2026 stage of 1.63 ft at 11:15 CDT from direct gauge 03306500 during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Greensburg City Ramp to Lynn Camp Creek Ramp, about 32.9 mi",
        "note": "KDFWR lists Greensburg City Ramp to Glenview Ford as 13.7 miles and Glenview Ford to Lynn Camp Creek Ramp as 19.2 miles, supporting a combined public route of about 32.9 miles.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "1.0-1.75 ft good",
        "note": "KDFWR rates the Green River gauge at Greensburg as Low below 1.0 ft, Good from 1.0 to 1.75 ft, and High above 1.75 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Greensburg City Ramp, 37.2581, -85.5057",
        "note": "KDFWR identifies Greensburg City Ramp as a free paved single-lane public launch in city park with restrooms, paved parking, and no camping.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=220"
      },
      {
        "label": "Take-out access",
        "value": "Lynn Camp Creek Ramp, 37.3533, -85.7098",
        "note": "KDFWR identifies Lynn Camp Creek VPA #1 as a publicly open private site with unpaved parking, day-use-only rules, no camping, and a steep ramp better treated as a carry-down.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=968"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03306500 at 1.63 ft",
        "note": "USGS Water Services returned a same-day July 11, 2026 11:15 CDT gage-height reading for Green River at Greensburg during this run. That stage sits inside the KDFWR good band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "City park start, private-bank Glenview midpoint, steep Lynn finish",
        "note": "KDFWR describes Greensburg as the last serviced stop on the upper trail, Glenview as a private-land-surrounded road-end carrydown, and Lynn Camp as a steep publicly open private access with limited amenities.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Pool 6 Green River",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Greensburg City Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=220",
        "provider": "local"
      },
      {
        "label": "KDFWR Glenview Road Carrydown",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1080",
        "provider": "local"
      },
      {
        "label": "KDFWR Lynn Camp Creek VPA #1",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=968",
        "provider": "local"
      },
      {
        "label": "USGS 03306500 Green River at Greensburg",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03306500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "green-river-american-legion-glenview-road",
    "slug": "green-river-american-legion-glenview-road",
    "name": "Green River",
    "reach": "American Legion Park Ramp to Glenview Road Carrydown",
    "aliases": [
      "Green River - American Legion to Glenview",
      "Upper Green American Legion to Glenview",
      "KDFWR Pool 6 American Legion Park to Glenview Ford chain"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Upper Green continuation from American Legion Park Ramp to Glenview Road Carrydown. KDFWR's Pool 6 mileage table supports this 15.7-mile public route by chaining the exact American Legion-to-Greensburg and Greensburg-to-Glenview segments against the direct Greensburg USGS gauge.",
    "statusText": "Use the Green River at Greensburg gauge. KDFWR rates 1.0 to 1.75 ft as good for boating and fishing. Today the gauge is in-band at 1.64 ft; below that expect slower shoals and more dragging, while above that the broad current and private-bank Glenview finish deserve more caution.",
    "latitude": 37.2441,
    "longitude": -85.4795,
    "gaugeSource": {
      "id": "usgs-03306500",
      "provider": "usgs",
      "siteId": "03306500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Green River at Greensburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1,
      "idealMax": 1.75,
      "tooLow": 1,
      "tooHigh": 1.75,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Green River at Greensburg",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
      "windSensitivity": 0.55,
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
      "seasonNotes": "This longer Upper Green route is most practical in spring through fall when the Greensburg stage is stable. Summer can still work, but lower water, slower pools, and exposed wind make the Glenview finish feel more consequential than the mileage first suggests.",
      "difficulty": "moderate",
      "difficultyNotes": "The river itself remains recreational, but 15.7 miles, the private-bank Glenview finish, and fewer comfortable legal stops after Greensburg make this more committed than the short park and city split routes.",
      "confidenceNotes": "Confidence is good for a conservative Kentucky add: KDFWR's Pool 6 page still lists American Legion Park Ramp to Greensburg City Ramp as 2.0 miles and Greensburg City Ramp to Glenview Ford as 13.7 miles, supporting this 15.7-mile public route. Current KDFWR access-detail pages still expose coordinates and public-use details for American Legion Park Ramp and Glenview Road Carrydown, the corridor still includes Greensburg City Ramp as the clearest midpoint bailout, the direct Greensburg gauge still carries the official 1.0 to 1.75 ft good band, and USGS Water Services returned a same-day July 10, 2026 stage of 1.64 ft from direct gauge 03306500 during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "American Legion Park Ramp to Glenview Ford, about 15.7 mi",
        "note": "KDFWR lists American Legion Park Ramp to Greensburg City Ramp as 2.0 miles and Greensburg City Ramp to Glenview Ford as 13.7 miles, supporting a combined public route of about 15.7 miles.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "1.0-1.75 ft good",
        "note": "KDFWR rates the Green River gauge at Greensburg as Low below 1.0 ft, Good from 1.0 to 1.75 ft, and High above 1.75 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "American Legion Park Ramp, 37.2441, -85.4795",
        "note": "KDFWR identifies American Legion Park Ramp as a free public carry-down launch with unpaved parking, no camping, and year-round availability.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=954"
      },
      {
        "label": "Take-out access",
        "value": "Glenview Road Carrydown, 37.291, -85.5913",
        "note": "KDFWR identifies Glenview Ford as a public road-end carry-down with unpaved parking, no amenities, and private land surrounding the access.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1080"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03306500 at 1.64 ft",
        "note": "USGS Water Services returned a same-day July 10, 2026 gage-height reading for Green River at Greensburg during this run. That stage sits inside KDFWR's good band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Muddy park launch, city bailout, broad pools, and private-bank finish",
        "note": "KDFWR describes American Legion as a graded muddy and gravel park access below Highway 417, Greensburg as the last serviced city-park stop, and Glenview as the downstream private-bank road-end carrydown.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Pool 6 Green River",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR American Legion Park Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=954",
        "provider": "local"
      },
      {
        "label": "KDFWR Greensburg City Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=220",
        "provider": "local"
      },
      {
        "label": "KDFWR Glenview Road Carrydown",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1080",
        "provider": "local"
      },
      {
        "label": "USGS 03306500 Green River at Greensburg",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03306500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "green-river-american-legion-lynn-camp-creek",
    "slug": "green-river-american-legion-lynn-camp-creek",
    "name": "Green River",
    "reach": "American Legion Park Ramp to Lynn Camp Creek Ramp",
    "aliases": [
      "Green River - American Legion to Lynn Camp",
      "Upper Green American Legion to Lynn Camp",
      "KDFWR Pool 6 American Legion Park to Lynn Camp Creek chain"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Very long Upper Green continuation from American Legion Park Ramp to Lynn Camp Creek Ramp. KDFWR's official Pool 6 mileage table supports this 34.9-mile public route by chaining the American Legion, Greensburg, Glenview, and Lynn Camp access sequence against the direct Greensburg USGS gauge.",
    "statusText": "Use the Green River at Greensburg gauge. KDFWR rates 1.0 to 1.75 ft as good for boating and fishing. Below that expect a scrape-prone all-day commitment; above that the broader current, private-bank corridor, and steep Lynn Camp finish deserve more caution.",
    "latitude": 37.2441,
    "longitude": -85.4795,
    "gaugeSource": {
      "id": "usgs-03306500",
      "provider": "usgs",
      "siteId": "03306500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Green River at Greensburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1,
      "idealMax": 1.75,
      "tooLow": 1,
      "tooHigh": 1.75,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Green River at Greensburg",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
      "windSensitivity": 0.8,
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
      "seasonNotes": "This very long American-Legion-to-Lynn-Camp route is most practical in spring through fall when the Greensburg stage is stable and the group has full daylight. Summer can still work, but lower water, slower pools, and exposed wind turn this into a sunrise-to-finish commitment.",
      "difficulty": "hard",
      "difficultyNotes": "The current stays recreational, but 34.9 miles, sparse legal exits after Glenview, private-bank limits, and the steep Lynn Camp finish make this a hard planning route rather than a casual Green River float.",
      "confidenceNotes": "Confidence is good for a conservative Kentucky add: KDFWR's Pool 6 page still lists American Legion Park Ramp to Greensburg City Ramp as 2.0 miles, Greensburg City Ramp to Glenview Ford as 13.7 miles, and Glenview Ford to Lynn Camp Creek Ramp as 19.2 miles, which together support this 34.9-mile public route. Current KDFWR access pages still expose coordinates and public-use details for American Legion and Lynn Camp, the corridor still includes the official Greensburg city-ramp bailout and Glenview midpoint exit, the direct Greensburg gauge still carries the official 1.0 to 1.75 ft good band, and USGS Water Services returned a same-day July 3, 2026 stage of 0.95 ft from direct gauge 03306500 during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "American Legion Park Ramp to Lynn Camp Creek Ramp, about 34.9 mi",
        "note": "KDFWR lists American Legion Park Ramp to Greensburg City Ramp as 2.0 miles, Greensburg City Ramp to Glenview Ford as 13.7 miles, and Glenview Ford to Lynn Camp Creek Ramp as 19.2 miles, supporting a combined public route of about 34.9 miles.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "1.0-1.75 ft good",
        "note": "KDFWR rates the Green River gauge at Greensburg as Low below 1.0 ft, Good from 1.0 to 1.75 ft, and High above 1.75 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "American Legion Park Ramp, 37.2441, -85.4795",
        "note": "KDFWR identifies American Legion Park as a free public access with an unpaved single-lane launch, unpaved parking, year-round availability, and no camping.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=954"
      },
      {
        "label": "Take-out access",
        "value": "Lynn Camp Creek Ramp, 37.3533, -85.7098",
        "note": "KDFWR identifies Lynn Camp Creek VPA #1 as a free publicly open private launch with unpaved parking, year-round availability, and no camping.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=968"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03306500 at 0.95 ft",
        "note": "USGS Water Services returned a same-day July 3, 2026 gage-height reading for Green River at Greensburg during this run. That stage sits just below KDFWR's good band, so expect a lower, scrape-prone day.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Muddy park launch, city bailout, private-bank corridor, steep Lynn finish",
        "note": "KDFWR describes American Legion as a graded muddy and gravel park access below Highway 417, Greensburg as the city-park stop with cabins, Glenview as a private-bank road-end carrydown, and Lynn Camp as a steep publicly open private ramp at the mouth of the creek.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Pool 6 Green River",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR American Legion Park access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=954",
        "provider": "local"
      },
      {
        "label": "KDFWR Greensburg City Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=220",
        "provider": "local"
      },
      {
        "label": "KDFWR Glenview Road Carrydown",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1080",
        "provider": "local"
      },
      {
        "label": "KDFWR Lynn Camp Creek VPA #1",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=968",
        "provider": "local"
      },
      {
        "label": "USGS 03306500 Green River at Greensburg",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03306500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "green-river-roachville-glenview-road",
    "slug": "green-river-roachville-glenview-road",
    "name": "Green River",
    "reach": "Roachville Ford to Glenview Road Carrydown",
    "aliases": [
      "Green River - Roachville to Glenview",
      "Upper Green Roachville to Glenview",
      "KDFWR Upper Green and Pool 6 Roachville to Glenview chain"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Long upper Green River continuation from Roachville Ford to Glenview Road Carrydown. KDFWR supports this 24.8-mile public route by chaining the official Roachville, Russell, American Legion, Greensburg, and Glenview access sequence against the direct Greensburg USGS gauge.",
    "statusText": "Use the Green River at Greensburg gauge. KDFWR rates 1.0 to 1.75 ft as good for boating and fishing. Below that expect more shoal dragging and a long day; above that the broader current, private banks, and no-amenity Glenview finish deserve more caution.",
    "latitude": 37.2353,
    "longitude": -85.4241,
    "gaugeSource": {
      "id": "usgs-03306500",
      "provider": "usgs",
      "siteId": "03306500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Green River at Greensburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1,
      "idealMax": 1.75,
      "tooLow": 1,
      "tooHigh": 1.75,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Green River at Greensburg",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
      "windSensitivity": 0.65,
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
      "seasonNotes": "This long Upper Green route is most practical in spring through fall when the Greensburg stage is stable. Summer can still work, but lower water, slower pools, and exposed wind make the full Roachville-to-Glenview chain a genuine all-day commitment.",
      "difficulty": "moderate",
      "difficultyNotes": "The current is still recreational Green River water, but 24.8 miles, limited legal stops away from the named access chain, the muddy Roachville start, and the private-bank Glenview finish make this a committed day route.",
      "confidenceNotes": "Confidence is good for a conservative Kentucky add: KDFWR's Upper Green article still lists Roachville Ford to Russell Ford as 6.6 miles, while the Pool 6 page still lists Russell Ford to American Legion Park Ramp as 2.3 miles, American Legion Park Ramp to Greensburg City Ramp as 2.0 miles, and Greensburg City Ramp to Glenview Ford as 13.7 miles, which together support this 24.8-mile public route. Current KDFWR access pages still expose coordinates and public-use details for Roachville and Glenview, the direct Greensburg gauge still carries the official 1.0 to 1.75 ft good band, and USGS Water Services returned a same-day July 2, 2026 stage of 0.97 ft from direct gauge 03306500 during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Roachville Ford to Glenview Ford, about 24.8 mi",
        "note": "KDFWR lists Roachville Ford to Russell Ford as 6.6 miles, Russell Ford to American Legion Park Ramp as 2.3 miles, American Legion Park Ramp to Greensburg City Ramp as 2.0 miles, and Greensburg City Ramp to Glenview Ford as 13.7 miles, supporting a combined public route of about 24.8 miles.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Upper-Green-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "1.0-1.75 ft good",
        "note": "KDFWR rates the Green River gauge at Greensburg as Low below 1.0 ft, Good from 1.0 to 1.75 ft, and High above 1.75 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Roachville Ford, 37.2353, -85.4241",
        "note": "KDFWR identifies Roachville Ford as a free public low-water ford access with limited roadside parking and no camping.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Roachville-Ford.aspx"
      },
      {
        "label": "Take-out access",
        "value": "Glenview Road Carrydown, 37.291, -85.5913",
        "note": "KDFWR identifies Glenview Ford as a public road-end carry-down with unpaved parking, no amenities, and private land surrounding the access.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1080"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03306500 at 0.97 ft",
        "note": "USGS Water Services returned a same-day July 2, 2026 gage-height reading for Green River at Greensburg during this run. That stage sits just below KDFWR's good band, so expect a lower, scrape-prone day.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Islands, chutes, shoals, city bailout, private-bank finish",
        "note": "KDFWR describes the Roachville upper section as shallow water with riffles, pools, islands, and chutes, then the Greensburg corridor as shoals and deep pools before the private-bank Glenview finish.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Upper-Green-River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Upper Green River",
        "url": "https://fw.ky.gov/Education/Pages/Upper-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Pool 6 Green River",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Roachville Ford",
        "url": "https://fw.ky.gov/Fish/Pages/Roachville-Ford.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Glenview Road Carrydown",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1080",
        "provider": "local"
      },
      {
        "label": "USGS 03306500 Green River at Greensburg",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03306500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "green-river-tailwater-greensburg-city-ramp",
    "slug": "green-river-tailwater-greensburg-city-ramp",
    "name": "Green River",
    "reach": "Green River Lake Tailwater to Greensburg City Ramp",
    "aliases": [
      "Green River - Tailwater to Greensburg",
      "Upper Green full tailwater route",
      "KDFWR Upper Green Tailwater to Greensburg City Ramp"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Full Upper Green River route from the public Green River Lake Tailwater ramp to Greensburg City Ramp. KDFWR supports this 23.4-mile public route by chaining the exact Tailwater-to-Roachville, Roachville-to-Russell, Russell-to-American-Legion, and American-Legion-to-Greensburg segments against the same direct Greensburg stage gauge.",
    "statusText": "Use the Green River at Greensburg gauge. KDFWR rates 1.0 to 1.75 ft as good for boating and fishing. Below that expect a long scrape-prone day; above that the broader current, islands, and city-ramp finish deserve more caution.",
    "latitude": 37.2416,
    "longitude": -85.3441,
    "gaugeSource": {
      "id": "usgs-03306500",
      "provider": "usgs",
      "siteId": "03306500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Green River at Greensburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "private_banks",
        "strainers",
        "remote"
      ],
      "safetyNotes": [
        "KDFWR says boats are not permitted upstream of the tailwater ramp and that the first shoal sits below Highway 55 shortly after launch.",
        "This long route continues through the islands and chutes above Russell Ford before broadening toward Greensburg, so low water, woody debris, and fatigue matter more than on the shorter splits.",
        "Most banks are private, and the clean legal landings are the named accesses at Roachville, Russell Ford, American Legion Park, and Greensburg City Ramp."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1,
      "idealMax": 1.75,
      "tooLow": 1,
      "tooHigh": 1.75,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Green River at Greensburg",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "This full upper-Green route is best in spring through fall when the Greensburg stage is stable. Summer lows can add dragging and muddy landings across a very long day, while storms or release changes can make the route feel much pushier than the easy label suggests.",
      "difficulty": "moderate",
      "difficultyNotes": "The current is still recreational at normal stages, but 23-plus miles of shoals, islands, private banks, and limited legal stops make this a full-day commitment rather than a casual float.",
      "confidenceNotes": "Confidence is high for a conservative Kentucky add: KDFWR's Pool 6 Green River page still lists Green River Lake Tailwater to Roachville Ford as 12.5 miles, Roachville Ford to Russell Ford as 6.6 miles, Russell Ford to American Legion Park Ramp as 2.3 miles, and American Legion Park Ramp to Greensburg City Ramp as 2.0 miles, supporting this 23.4-mile public route. The same page still publishes the official Greensburg gauge ladder of Low below 1.0 ft, Good from 1.0 to 1.75 ft, and High above 1.75 ft, current KDFWR access-detail pages still expose source-backed coordinates and public-use notes for the Tailwater and Greensburg endpoints, and USGS Water Services returned a same-day July 6, 2026 stage of 0.93 ft from direct gauge 03306500 during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official route chain",
        "value": "12.5 + 6.6 + 2.3 + 2.0 mi",
        "note": "KDFWR lists Tailwater to Roachville at 12.5 miles, Roachville to Russell at 6.6, Russell to American Legion at 2.3, and American Legion to Greensburg at 2.0, supporting a combined public route of about 23.4 miles.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "1.0-1.75 ft good",
        "note": "KDFWR rates the Green River gauge at Greensburg as Low below 1.0 ft, Good from 1.0 to 1.75 ft, and High above 1.75 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Green River Lake Tailwater, 37.2416, -85.3441",
        "note": "KDFWR identifies the tailwater ramp as a free public paved launch with security-lit parking, restroom facilities, and a no-upstream-boating rule above the ramp.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=588"
      },
      {
        "label": "Take-out access",
        "value": "Greensburg City Ramp, 37.2581, -85.5057",
        "note": "KDFWR identifies Greensburg City Ramp as a free paved city ramp with paved parking and nearby cabins and RV hookups at the park.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=220"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03306500 at 0.93 ft",
        "note": "USGS Water Services returned a same-day July 6, 2026 gage-height reading for Green River at Greensburg during this run. That stage sits just below KDFWR's good band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Tailwater launch, islands and chutes, then a paved city-ramp finish",
        "note": "KDFWR describes the route as starting below the Tailwater shoal, continuing through the islands and chutes above Russell Ford, and finishing at Greensburg City Park with the cleanest public landing and nearby overnight support on the corridor.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Upper-Green-River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Pool 6 Green River",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Upper Green River",
        "url": "https://fw.ky.gov/Education/Pages/Upper-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Green River Lake Tailwater",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=588",
        "provider": "local"
      },
      {
        "label": "KDFWR Greensburg City Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=220",
        "provider": "local"
      },
      {
        "label": "USGS 03306500 Green River at Greensburg",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03306500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "green-river-glenview-road-lynn-camp-creek",
    "slug": "green-river-glenview-road-lynn-camp-creek",
    "name": "Green River",
    "reach": "Glenview Road Carrydown to Lynn Camp Creek Ramp",
    "aliases": [
      "Green River - Glenview to Lynn Camp",
      "Upper Green Glenview to Lynn Camp",
      "KDFWR Pool 6 Glenview Ford to Lynn Camp Creek Ramp"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Long upper-to-mid Pool 6 Green River float from Glenview Road Carrydown to Lynn Camp Creek Ramp. KDFWR documents the 19.2-mile public route, exact endpoint coordinates, and official Greensburg stage bands tied to the local USGS gauge.",
    "statusText": "Use the Green River at Greensburg gauge. KDFWR rates 1.0 to 1.75 ft as good for boating and fishing. Below that expect a slower, scrape-prone all-day float; above that the broader current, private-bank corridor, and longer shuttle deserve more caution.",
    "latitude": 37.291,
    "longitude": -85.5913,
    "gaugeSource": {
      "id": "usgs-03306500",
      "provider": "usgs",
      "siteId": "03306500",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Green River at Greensburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 1,
      "idealMax": 1.75,
      "tooLow": 1,
      "tooHigh": 1.75,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Green River at Greensburg",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "This longer Pool 6 link is most practical in spring through fall when the Greensburg stage is stable. Summer can still work, but lower water, exposed shoals, and slow pools matter more across a 19-mile day.",
      "difficulty": "moderate",
      "difficultyNotes": "The current is still recreational Green River water, but this 19.2-mile day adds commitment. Low water, broad-river wind, private-bank limits, and a steep Lynn Camp finish make it more demanding than the shorter Upper Green segments.",
      "confidenceNotes": "Confidence is good for a conservative Kentucky restore: KDFWR's Pool 6 page still lists Glenview Ford to Lynn Camp Creek Ramp as a 19.2-mile public segment, preserves the official Greensburg gauge ladder of Low below 1.0 ft, Good from 1.0 to 1.75 ft, and High above 1.75 ft, and current KDFWR access-detail pages still expose coordinates and availability for both endpoints. USGS Water Services returned a same-day July 11, 2026 stage of 1.69 ft at 15:15 CDT from direct gauge 03306500 during this run, inside the official good band."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Glenview Ford to Lynn Camp Creek Ramp, 19.2 mi",
        "note": "KDFWR lists Glenview Ford to Lynn Camp Creek Ramp as a 19.2-mile Green River Pool 6 access-to-access segment.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "1.0-1.75 ft good",
        "note": "KDFWR rates the Green River gauge at Greensburg as Low below 1.0 ft, Good from 1.0 to 1.75 ft, and High above 1.75 ft.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Glenview Road Carrydown, 37.291, -85.5913",
        "note": "KDFWR identifies Glenview Road Carrydown as a free public carry-down/ramp access with unpaved parking, year-round availability, and no camping.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1080"
      },
      {
        "label": "Take-out access",
        "value": "Lynn Camp Creek Ramp, 37.3533, -85.7098",
        "note": "KDFWR identifies Lynn Camp Creek VPA #1 as a free publicly open private launch with unpaved parking, year-round availability, and no camping.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=968"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03306500 at 1.69 ft",
        "note": "USGS Water Services returned a same-day July 11, 2026 15:15 CDT gage-height reading for Green River at Greensburg during this run. That stage sits inside the KDFWR good band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Private-bank corridor, broad pools, steep Lynn ramp",
        "note": "KDFWR describes Glenview as a private-bank road-end carrydown and Lynn Camp as a steep ramp at the mouth of the creek on privately owned land open to the public, shaping this as a long broad-river float with a careful finish.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Pool 6 Green River",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Glenview Road Carrydown",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1080",
        "provider": "local"
      },
      {
        "label": "KDFWR Lynn Camp Creek VPA #1",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=968",
        "provider": "local"
      },
      {
        "label": "USGS 03306500 Green River at Greensburg",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03306500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03306500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03306500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "green-river-hh-wilson-stovall",
    "slug": "green-river-hh-wilson-stovall",
    "name": "Green River",
    "reach": "H.H. Wilson Park Ramp to Stovall Park Ramp",
    "aliases": [
      "Green River - HH Wilson to Stovall Park",
      "Green River Hart County Blue Water Trail",
      "Green River Pool 6 Munfordville"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Short Hart County Green River day from KDFWR H.H. Wilson Park Ramp to Munfordville-Stovall Park Ramp. KDFWR documents the 3.6-mile public-access segment, both endpoint coordinates, and official Munfordville gauge cfs bands.",
    "statusText": "Use the Green River at Munfordville gauge. KDFWR rates 300 to 600 cfs as good for boating and fishing. Below that is low and may expose shoals or ramp edges; above that is high and deserves extra broad-river caution around current, wood, and landings.",
    "latitude": 37.2979,
    "longitude": -85.8506,
    "gaugeSource": {
      "id": "usgs-03308500",
      "provider": "usgs",
      "siteId": "03308500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Green River at Munfordville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03308500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 300,
      "idealMax": 600,
      "tooLow": 300,
      "tooHigh": 600,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Green River at Munfordville",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "Pool 6 is regulated by Green River Lake upstream, but storms, dam releases, and broad-river wind can still change the practical day. Spring and wetter fall windows are more reliable; summer trips should be checked against the Munfordville gauge and local weather.",
      "difficulty": "easy",
      "difficultyNotes": "This is a short KDFWR public-ramp segment on a broad Class I river corridor. Treat it as easy only when the Munfordville gauge is stable in the KDFWR good band; high water, wind, boat traffic, ramp drops, and private banks can make landings less forgiving.",
      "confidenceNotes": "Confidence is high for a conservative Kentucky restore: KDFWR lists H.H. Wilson Park Ramp to Stovall Park Ramp as a 3.6-mile Green River Pool 6 segment, publishes coordinates and access details for both public ramps, links the route corridor to the Green River at Munfordville gauge, and gives official Low/Good/High cfs bands for USGS 03308500. USGS Water Services returned same-day July 11, 2026 values of 2660 cfs and 6.55 ft at 20:00 CDT from the direct gauge during this run, which is well above the official good band and requires honest higher-water caution today."
    },
    "evidenceNotes": [
      {
        "label": "Official level band",
        "value": "300-600 cfs good",
        "note": "KDFWR rates the Green River gauge at Munfordville as Low below 300 cfs, Good from 300 to 600 cfs, and High above 600 cfs.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Official route segment",
        "value": "H.H. Wilson Park Ramp to Stovall Park Ramp, 3.6 mi",
        "note": "KDFWR lists H.H. Wilson Park Ramp to Stovall Park Ramp as a 3.6-mile Green River Pool 6 access-to-access segment.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "H.H. Wilson Park Ramp, 37.2979, -85.8506",
        "note": "KDFWR identifies H.H. Wilson Park as a free single-lane paved ramp with unpaved parking and year-round 24-hour boat-ramp availability.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=240"
      },
      {
        "label": "Take-out access",
        "value": "Munfordville-Stovall Park Ramp, 37.2663, -85.8892",
        "note": "KDFWR identifies Stovall Park as a city-owned free single-lane paved ramp with paved parking, restrooms, picnic area, and seasonal camping.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=241"
      },
      {
        "label": "Route character",
        "value": "Broad river, shoals, long runs, rocky banks",
        "note": "KDFWR describes nearby Pool 6 access reaches as shallow riffle and pool habitat with shoals, long runs, deep rocky banks, and a ramp drop at H.H. Wilson.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03308500 at 2660 cfs / 6.55 ft",
        "note": "USGS Water Services returned same-day July 11, 2026 discharge and gage-height values at 20:00 CDT for Green River at Munfordville during this run. That is far above KDFWR's 300-600 cfs good band, so this short segment still needs explicit high-water caution today.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03308500&parameterCd=00060,00065&siteStatus=all"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Pool 6 Green River",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR H.H. Wilson Park Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=240",
        "provider": "local"
      },
      {
        "label": "KDFWR Munfordville-Stovall Park Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=241",
        "provider": "local"
      },
      {
        "label": "USGS 03308500 Green River at Munfordville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03308500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03308500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03308500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "green-river-hh-wilson-park-dennison-ferry",
    "slug": "green-river-hh-wilson-park-dennison-ferry",
    "name": "Green River",
    "reach": "H.H. Wilson Park Ramp to Dennison Ferry Carrydown",
    "aliases": [
      "Green River - H.H. Wilson to Dennison Ferry",
      "Hart County to Mammoth Cave from H.H. Wilson",
      "KDFWR Pool 6 H.H. Wilson to Dennison Ferry"
    ],
    "state": "Kentucky",
    "region": "Hart County / Mammoth Cave",
    "summary": "Long Green River float from H.H. Wilson Park Ramp into Mammoth Cave at Dennison Ferry. KDFWR supports this public route by chaining the official 3.6-mile Wilson-to-Stovall segment with the 21.0-mile Stovall-to-Dennison run, plus direct Munfordville gauge guidance and endpoint coordinates.",
    "statusText": "Use the Green River at Munfordville gauge. KDFWR rates 300 to 600 cfs as good for boating and fishing. Below that expect a slower, more consequential all-day trip; above that the broad current, wood, and park carry-down finish deserve more caution.",
    "latitude": 37.2979,
    "longitude": -85.8506,
    "gaugeSource": {
      "id": "usgs-03308500",
      "provider": "usgs",
      "siteId": "03308500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Green River at Munfordville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03308500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 300,
      "idealMax": 600,
      "tooLow": 300,
      "tooHigh": 600,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Green River at Munfordville",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "This long Hart County to Mammoth Cave route is most practical in spring through fall when the Munfordville gauge is stable and the group has full daylight. Lower water slows the day substantially, while storms or releases can raise debris before the park finish.",
      "difficulty": "moderate",
      "difficultyNotes": "This is a flatwater-style Green River route, but 24.6 miles, limited bailout options, private banks, open-river wind, and a day-use-only park finish make it a committed moderate outing rather than a casual family float.",
      "confidenceNotes": "Confidence is good for a conservative Kentucky restore: KDFWR's Pool 6 page still lists H.H. Wilson Ramp to Stovall Park Ramp as 3.6 miles and Stovall Park Ramp to Dennison Ferry as 21.0 miles, which together support this 24.6-mile public chain. Current KDFWR access-detail pages still expose coordinates and public availability for H.H. Wilson and Dennison Ferry, the Pool 6 page preserves the official Munfordville discharge ladder of Low below 300 cfs, Good from 300 to 600 cfs, and High above 600 cfs, and USGS Water Services returned same-day July 11, 2026 values of 2960 cfs and 6.98 ft at 15:00 CDT from direct gauge 03308500 during this run. That discharge is well above the official good band, so the route needs honest high-water caution today."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "H.H. Wilson Ramp to Dennison Ferry, about 24.6 mi",
        "note": "KDFWR lists H.H. Wilson Ramp to Stovall Park Ramp as 3.6 miles and Stovall Park Ramp to Dennison Ferry as 21.0 miles, supporting a combined public float of about 24.6 miles.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "300-600 cfs good",
        "note": "KDFWR rates the Green River gauge at Munfordville as Low below 300 cfs, Good from 300 to 600 cfs, and High above 600 cfs.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "H.H. Wilson Park Ramp, 37.2979, -85.8506",
        "note": "KDFWR identifies H.H. Wilson Park as a free paved single-lane ramp with unpaved parking, year-round availability, and no camping.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=240"
      },
      {
        "label": "Take-out access",
        "value": "Dennison Ferry Carrydown, 37.2174, -86.0493",
        "note": "KDFWR identifies Dennison Ferry as a free day-use-only carry-down access inside Mammoth Cave National Park with unpaved parking and no camping.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1015"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03308500 at 2960 cfs / 6.98 ft",
        "note": "USGS Water Services returned same-day July 11, 2026 discharge and stage values for Green River at Munfordville during this run. The discharge is far above the KDFWR good band, so this route needs honest higher-water caution today.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03308500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Broad pools, springs and caves corridor, park carry-down finish",
        "note": "KDFWR describes Pool 6 as a scenic section with numerous springs, caves, and wildlife, while Dennison finishes inside Mammoth Cave National Park at a day-use-only carry-down with high muddy banks and park infrastructure.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Pool 6 Green River",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR H.H. Wilson Park Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=240",
        "provider": "local"
      },
      {
        "label": "KDFWR Dennison Ferry Carrydown",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1015",
        "provider": "local"
      },
      {
        "label": "NPS Canoeing, Kayaking and Boating",
        "url": "https://www.nps.gov/maca/planyourvisit/canoeing-kayaking-and-boating.htm",
        "provider": "nps"
      },
      {
        "label": "USGS 03308500 Green River at Munfordville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03308500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03308500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03308500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "green-river-rio-carrydown-hh-wilson-park",
    "slug": "green-river-rio-carrydown-hh-wilson-park",
    "name": "Green River",
    "reach": "Rio Carrydown Access to H.H. Wilson Park Ramp",
    "aliases": [
      "Green River - Rio to H.H. Wilson",
      "Green River Hart County Rio to Wilson",
      "KDFWR Hart County Blue Water Trail upper segment"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Hart County Green River float from Rio Carrydown Access to H.H. Wilson Park Ramp. KDFWR's Hart County Blue Water Trail supports the 8-mile public segment, endpoint coordinates, and official Munfordville discharge bands tied to the local USGS gauge.",
    "statusText": "Use the Green River at Munfordville gauge. KDFWR rates 300 to 600 cfs as good for boating and fishing. Below that expect shallower riffles and more dragging; above that the broad river, bends, and landings deserve extra current and debris caution.",
    "latitude": 37.3183,
    "longitude": -85.7692,
    "gaugeSource": {
      "id": "usgs-03308500",
      "provider": "usgs",
      "siteId": "03308500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Green River at Munfordville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03308500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 300,
      "idealMax": 600,
      "tooLow": 300,
      "tooHigh": 600,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Green River at Munfordville",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "This Hart County segment is most practical in spring through fall when the Munfordville gauge is stable. Summer still works when enough water is present, but lower levels expose more gravel and riffles, while storms can raise debris and current quickly.",
      "difficulty": "easy",
      "difficultyNotes": "This is a family-friendly Class I float only when the Munfordville discharge is stable near KDFWR's good band. High water, fresh wood, private banks, and the H.H. Wilson ramp drop can make the finish less forgiving than a casual park paddle.",
      "confidenceNotes": "Confidence is high for a conservative Kentucky restore: KDFWR's Hart County Green River article still lists Rio Carrydown Access to H.H. Wilson Park as an 8-mile public float, current KDFWR access-detail pages still expose endpoint coordinates and year-round availability, and the Pool 6 page preserves the official Munfordville discharge ladder of Low below 300 cfs, Good from 300 to 600 cfs, and High above 600 cfs. USGS Water Services returned same-day July 11, 2026 direct-gauge values of 2960 cfs and 6.98 ft at 15:00 CDT from 03308500 during this run, currently far above the good band."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Rio Carrydown to H.H. Wilson, 8 mi",
        "note": "KDFWR's Hart County Green River article describes Rio Carrydown Access to H.H. Wilson Park as an 8-mile float.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Green-River---Hart-County.aspx"
      },
      {
        "label": "Official level band",
        "value": "300-600 cfs good",
        "note": "KDFWR rates the Green River gauge at Munfordville as Low below 300 cfs, Good from 300 to 600 cfs, and High above 600 cfs.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Rio Carrydown Access, 37.3183, -85.7692",
        "note": "KDFWR identifies Rio as a free carry-down access with unpaved parking, year-round availability, and no camping.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1171"
      },
      {
        "label": "Take-out access",
        "value": "H.H. Wilson Park Ramp, 37.2979, -85.8506",
        "note": "KDFWR identifies H.H. Wilson Park as a free paved single-lane ramp with unpaved parking and year-round 24-hour availability.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=240"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03308500 at 2960 cfs / 6.98 ft",
        "note": "USGS Water Services returned same-day July 11, 2026 discharge and stage values for Green River at Munfordville during this run. The discharge is far above the KDFWR good band, so this route needs honest higher-water caution today.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03308500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Bluffs, islands, chutes, sandbars, mild riffles",
        "note": "KDFWR describes the Hart County Blue Water Trail as scenic and family-friendly with river bluffs, islands, chutes, mild riffles, long deep holes, and sandbars along the Rio-to-Wilson part of the float.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Green-River---Hart-County.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Pool 6 Green River",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Green River Hart County",
        "url": "https://fw.ky.gov/Education/Pages/Green-River---Hart-County.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Rio Carrydown Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1171",
        "provider": "local"
      },
      {
        "label": "KDFWR H.H. Wilson Park Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=240",
        "provider": "local"
      },
      {
        "label": "USGS 03308500 Green River at Munfordville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03308500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03308500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03308500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "green-river-rio-carrydown-dennison-ferry",
    "slug": "green-river-rio-carrydown-dennison-ferry",
    "name": "Green River",
    "reach": "Rio Carrydown Access to Dennison Ferry Carrydown",
    "aliases": [
      "Green River - Rio to Dennison Ferry",
      "Hart County to Mammoth Cave from Rio",
      "KDFWR Hart County and Pool 6 Rio to Dennison Ferry"
    ],
    "state": "Kentucky",
    "region": "Hart County / Mammoth Cave",
    "summary": "Very long Green River combination from Rio Carrydown Access to Dennison Ferry in Mammoth Cave National Park. KDFWR supports this public route by combining the official Rio-to-Wilson and Wilson-to-Stovall Hart County segments with the official 21-mile Stovall-to-Dennison Pool 6 run, plus direct Munfordville gauge guidance.",
    "statusText": "Use the Green River at Munfordville gauge. KDFWR rates 300 to 600 cfs as good for boating and fishing. Below that expect a slower, more consequential all-day trip; above that the broad current, wood, and park carry-down finish deserve extra caution.",
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "strainers",
        "fast_rise",
        "remote",
        "private_banks"
      ],
      "safetyNotes": [
        "Treat the full Rio-to-Dennison chain as a committed 33-mile route, not a casual same-day float; use shorter Green River family routes unless the group has the daylight, pace, and bailout plan for the distance.",
        "Use KDFWR's Munfordville band conservatively: below 300 cfs this route can become unreasonably slow, while above 600 cfs broad current, fresh wood, and the Mammoth Cave carry-down finish leave less margin.",
        "Keep stops and any overnight plan tied to verified public or legal support. Dennison Ferry is day-use only, and private banks downstream of Hart County access points should not be treated as general bailout or camping areas."
      ],
      "reviewStatus": "reviewed"
    },
    "latitude": 37.3183,
    "longitude": -85.7692,
    "gaugeSource": {
      "id": "usgs-03308500",
      "provider": "usgs",
      "siteId": "03308500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Green River at Munfordville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03308500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 300,
      "idealMax": 600,
      "tooLow": 300,
      "tooHigh": 600,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Green River at Munfordville",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "This very long Hart County to Mammoth Cave route is most practical in spring through fall when the Munfordville gauge is stable, weather is settled, and the group has either full daylight or an intentional overnight plan.",
      "difficulty": "hard",
      "difficultyNotes": "This is still flatwater-style Green River paddling, but 33 miles, broad-river wind, private-bank limits, limited bailout options, and a day-use-only park finish make it a genuinely committed route rather than a casual day float.",
      "confidenceNotes": "Confidence is good for a conservative Kentucky restore: KDFWR's Hart County Green River article still lists Rio Carrydown Access to H.H. Wilson Park as 8 miles and H.H. Wilson Park to Stovall Park as 4 miles, while the Pool 6 page still lists Stovall Park Ramp to Dennison Ferry as 21.0 miles, which together support this roughly 33-mile public chain. Current KDFWR access-detail pages still expose coordinates and public availability for Rio, Stovall, and Dennison Ferry, the Pool 6 page preserves the official Munfordville discharge ladder of Low below 300 cfs, Good from 300 to 600 cfs, and High above 600 cfs, and USGS Water Services returned same-day July 11, 2026 values of 2690 cfs and 6.60 ft at 18:00 CDT from direct gauge 03308500 during this run. That discharge is well above the official good band, so the route needs honest high-water caution today."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Rio to Dennison Ferry, about 33 mi",
        "note": "KDFWR's Hart County page lists Rio Carrydown Access to H.H. Wilson Park as 8 miles and H.H. Wilson Park to Stovall Park as 4 miles, while the Pool 6 page lists Stovall Park Ramp to Dennison Ferry as 21.0 miles, supporting a combined public float of about 33 miles.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Green-River---Hart-County.aspx"
      },
      {
        "label": "Official level band",
        "value": "300-600 cfs good",
        "note": "KDFWR rates the Green River gauge at Munfordville as Low below 300 cfs, Good from 300 to 600 cfs, and High above 600 cfs.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Rio Carrydown Access, 37.3183, -85.7692",
        "note": "KDFWR identifies Rio as a free paved single-lane public access with unpaved parking, year-round availability, and no camping.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1171"
      },
      {
        "label": "Take-out access",
        "value": "Dennison Ferry Carrydown, 37.2174, -86.0493",
        "note": "KDFWR identifies Dennison Ferry as a free day-use-only carry-down access inside Mammoth Cave National Park with unpaved parking and no camping.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1015"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03308500 at 2690 cfs / 6.60 ft",
        "note": "USGS Water Services returned same-day July 11, 2026 discharge and stage values for Green River at Munfordville during this run. The discharge is far above the KDFWR good band, so this route needs honest higher-water caution today.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03308500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping support",
        "value": "Stovall primitive camping on the corridor",
        "note": "KDFWR identifies Stovall Park as having seasonal camping, restrooms, and park amenities, making it the clearest legal overnight support on this otherwise private-bank corridor.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=241"
      },
      {
        "label": "Route character",
        "value": "Bluffs, sandbars, broad pools, and park finish",
        "note": "KDFWR describes the Hart County Green River corridor as scenic and family-friendly with bluffs, islands, chutes, mild riffles, long deep holes, and sandbars, while Pool 6 adds the springs, caves, and Mammoth Cave park finish farther downstream.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Green-River---Hart-County.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Pool 6 Green River",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Green River Hart County",
        "url": "https://fw.ky.gov/Education/Pages/Green-River---Hart-County.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Rio Carrydown Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1171",
        "provider": "local"
      },
      {
        "label": "KDFWR Stovall Park Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=241",
        "provider": "local"
      },
      {
        "label": "KDFWR Dennison Ferry Carrydown",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1015",
        "provider": "local"
      },
      {
        "label": "NPS Canoeing, Kayaking and Boating",
        "url": "https://www.nps.gov/maca/planyourvisit/canoeing-kayaking-and-boating.htm",
        "provider": "nps"
      },
      {
        "label": "USGS 03308500 Green River at Munfordville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03308500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03308500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03308500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "green-river-rio-carrydown-stovall-park",
    "slug": "green-river-rio-carrydown-stovall-park",
    "name": "Green River",
    "reach": "Rio Carrydown Access to Munfordville-Stovall Park Ramp",
    "aliases": [
      "Green River - Rio to Stovall",
      "Hart County Rio to Munfordville",
      "KDFWR Hart County Rio Carrydown to Stovall Park chain"
    ],
    "state": "Kentucky",
    "region": "Hart County",
    "summary": "Hart County Green River continuation from Rio Carrydown Access to Munfordville-Stovall Park Ramp. KDFWR supports this 12-mile public route by combining the official Rio-to-H.H.-Wilson and H.H.-Wilson-to-Stovall segments against the direct Munfordville USGS gauge.",
    "statusText": "Use the Green River at Munfordville gauge. KDFWR rates 300 to 600 cfs as good for boating and fishing. Below that expect a slower shoal-filled day; above that the broader current, wood, and Stovall ramp drop deserve more caution.",
    "latitude": 37.3183,
    "longitude": -85.7692,
    "gaugeSource": {
      "id": "usgs-03308500",
      "provider": "usgs",
      "siteId": "03308500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Green River at Munfordville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03308500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 300,
      "idealMax": 600,
      "tooLow": 300,
      "tooHigh": 600,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Green River at Munfordville",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
      "windSensitivity": 0.6,
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
      "seasonNotes": "This Hart County continuation works from spring through fall when the Munfordville gauge is stable. Lower water slows the sandbars and shoals, while fresh rain can make the final miles into Stovall feel pushier than the mileage suggests.",
      "difficulty": "moderate",
      "difficultyNotes": "The route remains recreational Green River water, but 12 miles, broad bends, private-bank limits, and a developed park finish with a ramp drop make it more than a casual beginner float.",
      "confidenceNotes": "Confidence is good for a conservative Kentucky restore: KDFWR's Hart County Green River article still lists Rio Carrydown Access to H.H. Wilson Park as 8 miles and H.H. Wilson Park to Stovall Park as 4 miles, which together support this 12-mile public route. Current KDFWR access-detail pages still expose coordinates and public-use rules for Rio and Stovall, the Pool 6 page still publishes the official Munfordville discharge ladder of Low below 300 cfs, Good from 300 to 600 cfs, and High above 600 cfs, and USGS Water Services returned same-day July 11, 2026 values of 2690 cfs and 6.60 ft at 18:00 CDT from direct gauge 03308500 during this run. That discharge is well above KDFWR's good band, so the route should ship with explicit high-water caution."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Rio Carrydown Access to Stovall Park, about 12.0 mi",
        "note": "KDFWR's Hart County page lists Rio Carrydown Access to H.H. Wilson Park as 8 miles and H.H. Wilson Park to Stovall Park as 4 miles, supporting a combined public route of about 12 miles.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Green-River---Hart-County.aspx"
      },
      {
        "label": "Official level band",
        "value": "300-600 cfs good",
        "note": "KDFWR rates the Green River gauge at Munfordville as Low below 300 cfs, Good from 300 to 600 cfs, and High above 600 cfs.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Rio Carrydown Access, 37.3183, -85.7692",
        "note": "KDFWR identifies Rio as a free paved single-lane public access with unpaved parking, year-round availability, no camping, and ownership maintained by Hart County Fiscal Court.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1171"
      },
      {
        "label": "Take-out access",
        "value": "Munfordville-Stovall Park Ramp, 37.2663, -85.8892",
        "note": "KDFWR identifies Stovall Park as a free paved single-lane public ramp with paved parking, restrooms, year-round park access, and seasonal camping.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=241"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03308500 at 2690 cfs / 6.60 ft",
        "note": "USGS Water Services returned same-day July 11, 2026 discharge and stage values for Green River at Munfordville during this run. The discharge is well above KDFWR's 300 to 600 cfs good band, so expect a high-water day with faster current and less margin.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03308500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Sandbars, shoals, broad bends, developed park finish",
        "note": "KDFWR describes the Hart County corridor as scenic with bluffs, islands, chutes, mild riffles, and long deep holes, while the Pool 6 page says Stovall Park has the final developed ramp, seasonal camping, and a concrete-ramp drop to watch at the finish.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Green River Hart County",
        "url": "https://fw.ky.gov/Education/Pages/Green-River---Hart-County.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Pool 6 Green River",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Rio Carrydown Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1171",
        "provider": "local"
      },
      {
        "label": "KDFWR Stovall Park Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=241",
        "provider": "local"
      },
      {
        "label": "USGS 03308500 Green River at Munfordville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03308500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03308500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03308500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "green-river-lynn-camp-creek-rio-carrydown",
    "slug": "green-river-lynn-camp-creek-rio-carrydown",
    "name": "Green River",
    "reach": "Lynn Camp Creek Ramp to Rio Carrydown Access",
    "aliases": [
      "Green River - Lynn Camp Creek to Rio",
      "Hart County upper Green River Lynn Camp to Rio",
      "KDFWR Hart County Lynn Camp Creek to Rio Carrydown"
    ],
    "state": "Kentucky",
    "region": "Hart County",
    "summary": "Shorter upper Hart County Green River split from Lynn Camp Creek Ramp to Rio Carrydown Access. KDFWR's Hart County mileage table supports this public route by combining the official Lynn Camp to H.H. Wilson and Rio to H.H. Wilson distances against the direct Munfordville gauge.",
    "statusText": "Use the Green River at Munfordville gauge. KDFWR rates 300 to 600 cfs as good for boating and fishing. Below that expect a slower shoal-filled day; above that the steep Lynn Camp carry-down, wood, and faster current deserve more caution.",
    "latitude": 37.3533,
    "longitude": -85.7098,
    "gaugeSource": {
      "id": "usgs-03308500",
      "provider": "usgs",
      "siteId": "03308500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Green River at Munfordville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03308500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 300,
      "idealMax": 600,
      "tooLow": 300,
      "tooHigh": 600,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Green River at Munfordville",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
      "windSensitivity": 0.6,
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
      "seasonNotes": "This shorter Hart County split is practical through spring, summer, and fall when the Munfordville gauge is stable. Lower water slows the shoals, while fresh rain and higher levels make Lynn Camp and Rio less forgiving.",
      "difficulty": "moderate",
      "difficultyNotes": "This is a shorter moving-water Green River route rather than an all-day Mammoth Cave chain, but the steep Lynn Camp ramp, private-bank limits, and changing shoals keep it above true beginner level.",
      "confidenceNotes": "Confidence is good for a conservative Kentucky restore: KDFWR's Hart County Green River article still lists Lynn Camp Creek to H.H. Wilson Park as 18.2 miles and Rio Carrydown Access to H.H. Wilson Park as 8 miles, which supports a Lynn Camp to Rio split of about 10.2 miles. Current KDFWR access-detail pages still expose coordinates and public-use rules for Lynn Camp and Rio, the direct Munfordville gauge still carries the official 300 to 600 cfs good band, and USGS Water Services returned same-day July 11, 2026 values of 2690 cfs and 6.60 ft at 18:00 CDT from direct gauge 03308500 during this run. That discharge is well above KDFWR's good band, so the route should ship with explicit high-water caution."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Lynn Camp Creek to Rio, about 10.2 mi",
        "note": "KDFWR's Hart County page lists Lynn Camp Creek to H.H. Wilson Park as 18.2 miles and Rio Carrydown Access to H.H. Wilson Park as 8 miles, supporting a shorter Lynn Camp to Rio public split of about 10.2 miles.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Green-River---Hart-County.aspx"
      },
      {
        "label": "Official level band",
        "value": "300-600 cfs good",
        "note": "KDFWR rates the Green River gauge at Munfordville as Low below 300 cfs, Good from 300 to 600 cfs, and High above 600 cfs.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Lynn Camp Creek Ramp, 37.3533, -85.7098",
        "note": "KDFWR identifies Lynn Camp Creek VPA #1 as a free carry-down ramp on private property opened for public use, with steep access, unpaved parking, and no camping.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=968"
      },
      {
        "label": "Take-out access",
        "value": "Rio Carrydown Access, 37.3183, -85.7692",
        "note": "KDFWR identifies Rio as a free paved single-lane public access with unpaved parking, year-round availability, and no camping.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1171"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03308500 at 2690 cfs / 6.60 ft",
        "note": "USGS Water Services returned same-day July 11, 2026 discharge and stage values for Green River at Munfordville during this run. The discharge is well above KDFWR's 300 to 600 cfs good band, so expect a high-water day with faster current and less margin.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03308500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping support",
        "value": "Day-trip corridor, no official campsite on this short split",
        "note": "KDFWR marks both Lynn Camp Creek and Rio as no-camping accesses; Stovall seasonal camping exists farther downstream but is not part of this shorter route.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1171"
      },
      {
        "label": "Route character",
        "value": "Steep carry-down, shoals, bluffs, and private-bank limits",
        "note": "KDFWR describes the Hart County Green River corridor as scenic with shoals, bluffs, rocky banks, islands, and sandbars, while Lynn Camp remains the steeper publicly open private access in the cluster.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Green-River---Hart-County.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Green River Hart County",
        "url": "https://fw.ky.gov/Education/Pages/Green-River---Hart-County.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Pool 6 Green River",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Lynn Camp Creek Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=968",
        "provider": "local"
      },
      {
        "label": "KDFWR Rio Carrydown Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1171",
        "provider": "local"
      },
      {
        "label": "USGS 03308500 Green River at Munfordville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03308500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03308500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03308500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "green-river-hh-wilson-park-green-river-ferry",
    "slug": "green-river-hh-wilson-park-green-river-ferry",
    "name": "Green River",
    "reach": "H.H. Wilson Park Ramp to Green River Ferry",
    "aliases": [
      "Green River - H.H. Wilson to Green River Ferry",
      "Hart County to Mammoth Cave from H.H. Wilson",
      "KDFWR Hart County and Pool 6 H.H. Wilson to Green River Ferry"
    ],
    "state": "Kentucky",
    "region": "Hart County / Mammoth Cave",
    "summary": "Long Green River combination from H.H. Wilson Park Ramp to Green River Ferry in Mammoth Cave. KDFWR supports this 32.1-mile public route by combining the official H.H. Wilson to Stovall and Stovall to Green River Ferry chains against the direct Munfordville USGS gauge.",
    "statusText": "Use the Green River at Munfordville gauge. KDFWR rates 300 to 600 cfs as good for boating and fishing. Below that expect a slower all-day route; above that the broad current, wood, and park ferry finish deserve extra caution.",
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "strainers",
        "fast_rise",
        "remote",
        "private_banks"
      ],
      "safetyNotes": [
        "Treat the H.H. Wilson-to-Green-River-Ferry chain as a hard 32.1-mile route for strong all-day paddlers; Stovall and Dennison are the clearest ways to shorten the commitment.",
        "Use KDFWR's Munfordville band conservatively: below 300 cfs the route slows substantially, while above 600 cfs broad current, floating debris, and the ferry-side park finish become less forgiving.",
        "Confirm Mammoth Cave access and ferry status before launch, use the paddling access upstream of the ferry, and avoid improvised stops on private or unmanaged banks."
      ],
      "reviewStatus": "reviewed"
    },
    "latitude": 37.2979,
    "longitude": -85.8506,
    "gaugeSource": {
      "id": "usgs-03308500",
      "provider": "usgs",
      "siteId": "03308500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Green River at Munfordville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03308500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 300,
      "idealMax": 600,
      "tooLow": 300,
      "tooHigh": 600,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Green River at Munfordville",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
      "windSensitivity": 0.75,
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
      "seasonNotes": "This 32.1-mile H.H. Wilson to Green River Ferry chain is most practical in spring through fall with stable weather and a full-day plan. Lower water slows the day substantially, while fresh rain or release-driven rises can stack debris and current before the Mammoth Cave ferry finish.",
      "difficulty": "hard",
      "difficultyNotes": "The water is still flatwater by whitewater standards, but 32.1 miles, limited bailout options after Stovall, broad-river wind, and a managed park ferry finish make this a hard route for strong all-day paddlers rather than a casual day float.",
      "confidenceNotes": "Confidence is good for a conservative Kentucky add: KDFWR's Hart County Green River article still lists H.H. Wilson Park to Stovall Park as 4 miles, while the Pool 6 page still lists Stovall Park Ramp to Dennison Ferry as 21.0 miles and Dennison Ferry to Green River Ferry as 7.5 miles, which together support this 32.1-mile public route. Current KDFWR access-detail pages still expose coordinates and public-use rules for H.H. Wilson and Green River Ferry, Mammoth Cave still documents boating and ferry-operations guidance for the finish, the direct Munfordville gauge still carries the official 300 to 600 cfs good band, and USGS Water Services returned same-day July 3, 2026 values of 2040 cfs and 5.62 ft from direct gauge 03308500 during this run. That discharge is well above KDFWR's good band, so the route should ship with explicit high-water caution."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "H.H. Wilson Park Ramp to Green River Ferry, about 32.1 mi",
        "note": "KDFWR lists H.H. Wilson Park to Stovall Park as 4 miles, Stovall Park Ramp to Dennison Ferry as 21.0 miles, and Dennison Ferry to Green River Ferry as 7.5 miles, supporting a combined public route of about 32.1 miles.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Green-River---Hart-County.aspx"
      },
      {
        "label": "Official level band",
        "value": "300-600 cfs good",
        "note": "KDFWR rates the Green River gauge at Munfordville as Low below 300 cfs, Good from 300 to 600 cfs, and High above 600 cfs.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "H.H. Wilson Park Ramp, 37.2979, -85.8506",
        "note": "KDFWR identifies H.H. Wilson Park as a free paved access with a short concrete ramp, gravel parking, year-round availability, and no camping.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=969"
      },
      {
        "label": "Take-out access",
        "value": "Green River Ferry, 37.1795, -86.1123",
        "note": "KDFWR identifies Green River Ferry as a free single-lane paved park ramp with year-round availability, picnic tables, and endpoint campground support near Mammoth Cave Campground.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Green-River-Ferry-%28Mammoth-Cave-National-Park%29.aspx"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03308500 at 2040 cfs / 5.62 ft",
        "note": "USGS Water Services returned same-day July 3, 2026 discharge and stage values for Green River at Munfordville during this run. The discharge is well above KDFWR's 300 to 600 cfs good band, so expect a high-water day with faster current and less margin.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03308500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Broad pools, springs/caves corridor, ferry finish",
        "note": "KDFWR describes the H.H. Wilson corridor as broad Green River water with shoals and rocky banks, while Pool 6 adds the springs, caves, wildlife, and Mammoth Cave ferry finish farther downstream.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Green-River---Hart-County.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Green River Hart County",
        "url": "https://fw.ky.gov/Education/Pages/Green-River---Hart-County.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Pool 6 Green River",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR H.H. Wilson Park Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=969",
        "provider": "local"
      },
      {
        "label": "KDFWR Stovall Park Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=241",
        "provider": "local"
      },
      {
        "label": "KDFWR Green River Ferry",
        "url": "https://fw.ky.gov/Fish/Pages/Green-River-Ferry-%28Mammoth-Cave-National-Park%29.aspx",
        "provider": "local"
      },
      {
        "label": "NPS Canoeing, Kayaking and Boating",
        "url": "https://www.nps.gov/maca/planyourvisit/canoeing-kayaking-and-boating.htm",
        "provider": "nps"
      },
      {
        "label": "USGS 03308500 Green River at Munfordville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03308500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03308500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03308500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "green-river-houchins-ferry-brownsville-city-park",
    "slug": "green-river-houchins-ferry-brownsville-city-park",
    "name": "Green River",
    "reach": "Houchins Ferry to Brownsville City Park",
    "aliases": [
      "Green River - Houchins Ferry to Brownsville City Park",
      "Mammoth Cave Green River lower exit",
      "NPS Houchin Ferry to Brownsville"
    ],
    "state": "Kentucky",
    "region": "Mammoth Cave / Edmonson County",
    "summary": "Short lower Mammoth Cave Green River continuation from Houchins Ferry to Brownsville City Park. NPS still documents the 3.6-mile public segment, KDFWR still publishes both endpoint accesses, and the direct Mammoth Cave gauge still supports a conservative park-stage model.",
    "statusText": "Use the Green River at Mammoth Cave gauge. NPS treats roughly 9 to 15 ft as the broad beginner-friendly park window, 15 to 20 ft as more consequential experienced water, and prohibits launching in the park at or above 20 ft.",
    "latitude": 37.2024,
    "longitude": -86.2376,
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "dam",
        "whitewater",
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "This short route still has consequential lower-end current. NPS notes swift current on the segment and a class 2 rapid left from former Lock and Dam 6 before Brownsville.",
        "Use Brownsville City Park as the planned public finish and do not extend past the park boundary without fresh access research; NPS notes private land after the park boundary.",
        "Follow the NPS Mammoth Cave stage model closely: above about 15 ft is more consequential experienced water, and park launching is prohibited at or above 20 ft."
      ],
      "reviewStatus": "reviewed"
    },
    "gaugeSource": {
      "id": "usgs-03309000",
      "provider": "usgs",
      "siteId": "03309000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "direct",
      "siteName": "Green River at Mammoth Cave, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03309000/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 9,
      "idealMax": 15,
      "tooLow": 9,
      "tooHigh": 20,
      "thresholdSource": {
        "label": "Mammoth Cave NPS Green River skill-level stage guidance",
        "url": "https://www.nps.gov/maca/planyourvisit/river-safety-and-regulations.htm",
        "provider": "nps"
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
      "seasonNotes": "This short finish works best in the park's normal warm-season paddling window, but NPS still warns that Green River can rise quickly after rain and that the downstream current and shoal lines can change with shifting gravel bars.",
      "difficulty": "moderate",
      "difficultyNotes": "Mileage is short, but this is not a throwaway float. Swift current, ferry-side launch logistics, the class 2 rapid left from former Lock and Dam 6 near Brownsville, and private land after the park boundary make it a cautious finish segment rather than a novice pond shuttle.",
      "confidenceNotes": "Confidence is good for a conservative new add: NPS still publishes Houchin Ferry to Brownsville as a 3.6-mile trip with 1.5 to 2 hours of travel time and explicit notes about swift current and private land after the park boundary, while KDFWR still publishes source-backed access details for Houchins Ferry and Brownsville City Park. The park's direct USGS gauge at Mammoth Cave returned same-day July 14, 2026 values of 3950 cfs and 16.15 ft. That stage is below the NPS 20-foot launch closure but above the park's broad beginner-friendly 9 to 15-foot band, so the route should ship with explicit above-band caution and a strong downstream-hazard note at Brownsville."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Houchins Ferry to Brownsville, about 3.6 mi",
        "note": "NPS publishes Houchin Ferry to Brownsville as a 3.6-mile Green River trip with an estimated 1.5 to 2 hours of travel time.",
        "sourceUrl": "https://www.nps.gov/thingstodo/houchin-ferry-to-brownsville.htm"
      },
      {
        "label": "Official stage model",
        "value": "9-15 ft broad audience, >=20 ft closed",
        "note": "NPS says beginner Green River conditions in the park are about 9 to 15 ft and launching in the park is prohibited at or above 20 ft. Paddle Today uses that as a conservative public-facing stage model.",
        "sourceUrl": "https://www.nps.gov/maca/planyourvisit/river-safety-and-regulations.htm"
      },
      {
        "label": "Put-in access",
        "value": "Houchins Ferry, 37.2024, -86.2376",
        "note": "KDFWR identifies Houchins Ferry as a public paved access with camping, restrooms, and ferry-side launch support.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=156"
      },
      {
        "label": "Take-out access",
        "value": "Brownsville City Park, 37.1964, -86.2757",
        "note": "KDFWR identifies Brownsville City Park as a public paved ramp with parking, toilets, and no camping at the finish.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=153"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03309000 at 3950 cfs / 16.15 ft",
        "note": "USGS Water Services returned same-day July 14, 2026 values of 3950 cfs and 16.15 ft for Green River at Mammoth Cave, above the broad beginner-friendly 9 to 15-foot band but below the NPS 20-foot launch closure.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03309000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Brownsville hazard context",
        "value": "Current can be swift; former Lock and Dam 6 rapid near finish",
        "note": "NPS says current can be swift on this segment and its boating guidance notes that a class 2 rapid remains from former Lock and Dam 6 shortly before the Brownsville Boat Ramp.",
        "sourceUrl": "https://www.nps.gov/maca/planyourvisit/canoeing-kayaking-and-boating.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "NPS Houchin Ferry to Brownsville",
        "url": "https://www.nps.gov/thingstodo/houchin-ferry-to-brownsville.htm",
        "provider": "nps"
      },
      {
        "label": "NPS Canoeing, Kayaking and Boating",
        "url": "https://www.nps.gov/maca/planyourvisit/canoeing-kayaking-and-boating.htm",
        "provider": "nps"
      },
      {
        "label": "NPS River Safety and Regulations",
        "url": "https://www.nps.gov/maca/planyourvisit/river-safety-and-regulations.htm",
        "provider": "nps"
      },
      {
        "label": "KDFWR Houchins Ferry access detail",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=156",
        "provider": "local"
      },
      {
        "label": "KDFWR Brownsville City Park access detail",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=153",
        "provider": "local"
      },
      {
        "label": "KDFWR Lock and Dam 6 Carrydown access detail",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1166",
        "provider": "local"
      },
      {
        "label": "USGS 03309000 Green River at Mammoth Cave",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03309000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03309000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03309000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "green-river-stovall-park-green-river-ferry",
    "slug": "green-river-stovall-park-green-river-ferry",
    "name": "Green River",
    "reach": "Munfordville-Stovall Park Ramp to Green River Ferry",
    "aliases": [
      "Green River - Stovall to Green River Ferry",
      "Hart County to Mammoth Cave Green River ferry finish",
      "KDFWR Pool 6 Stovall Park to Green River Ferry chain"
    ],
    "state": "Kentucky",
    "region": "Hart County / Mammoth Cave",
    "summary": "Long Green River continuation from Munfordville-Stovall Park Ramp to Green River Ferry in Mammoth Cave. KDFWR's official Pool 6 mileage table supports this 28.5-mile public route by chaining the Stovall, Dennison, and Green River Ferry access sequence against the direct Munfordville USGS gauge.",
    "statusText": "Use the Green River at Munfordville gauge. KDFWR rates 300 to 600 cfs as good for boating and fishing. Below that expect a slower all-day route; above that the broad current, wood, and park ferry finish deserve extra caution.",
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "strainers",
        "fast_rise",
        "remote",
        "private_banks"
      ],
      "safetyNotes": [
        "Treat Stovall-to-Green-River-Ferry as a hard 28.5-mile route despite the flatwater character; Dennison is the main public midpoint bailout before the managed ferry finish.",
        "Use KDFWR's Munfordville band conservatively: below 300 cfs the day gets slower, while above 600 cfs current, fresh wood, and ferry-area launch etiquette require more margin.",
        "Keep camping and stops tied to Stovall, Mammoth Cave campground support, or other verified public access. Do not turn private banks or park-adjacent shorelines into unplanned exits."
      ],
      "reviewStatus": "reviewed"
    },
    "latitude": 37.2663,
    "longitude": -85.8892,
    "gaugeSource": {
      "id": "usgs-03308500",
      "provider": "usgs",
      "siteId": "03308500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Green River at Munfordville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03308500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 300,
      "idealMax": 600,
      "tooLow": 300,
      "tooHigh": 600,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Green River at Munfordville",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
      "windSensitivity": 0.7,
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
      "seasonNotes": "This long Stovall-to-Green-River-Ferry route is most reasonable in spring through fall with full daylight and stable weather. Lower water slows the day substantially, while fresh rain or release-driven rises can stack debris and current before the Mammoth Cave ferry finish.",
      "difficulty": "hard",
      "difficultyNotes": "The water is still flatwater by whitewater standards, but 28.5 miles, limited bailout options after Stovall, broad-river wind, and a managed park ferry finish make this a hard route for all but strong all-day paddlers.",
      "confidenceNotes": "Confidence is good for a conservative Kentucky add: KDFWR's Pool 6 page still lists Stovall Park Ramp to Dennison Ferry as 21.0 miles and Dennison Ferry to Green River Ferry as 7.5 miles, which together support this 28.5-mile public route. Current KDFWR access-detail pages still expose coordinates and public-use rules for Stovall and Green River Ferry, Mammoth Cave still documents boating and ferry-operations guidance for the finish, the direct Munfordville gauge still carries the official 300 to 600 cfs good band, and USGS Water Services returned same-day July 3, 2026 values of 2040 cfs and 5.62 ft from direct gauge 03308500 during this run. That discharge is well above KDFWR's good band, so the route should ship with explicit high-water caution."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Stovall Park Ramp to Green River Ferry, about 28.5 mi",
        "note": "KDFWR lists Stovall Park Ramp to Dennison Ferry as 21.0 miles and Dennison Ferry to Green River Ferry as 7.5 miles, supporting a combined public route of about 28.5 miles.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "300-600 cfs good",
        "note": "KDFWR rates the Green River gauge at Munfordville as Low below 300 cfs, Good from 300 to 600 cfs, and High above 600 cfs.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Munfordville-Stovall Park Ramp, 37.2663, -85.8892",
        "note": "KDFWR identifies Stovall Park as a free paved city-ramp access with paved parking, primitive camping, restrooms, and seasonal 24-hour camping availability.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=241"
      },
      {
        "label": "Take-out access",
        "value": "Green River Ferry, 37.1795, -86.1123",
        "note": "KDFWR identifies Green River Ferry as a free single-lane paved park ramp with year-round availability, picnic tables, and endpoint campground support near Mammoth Cave Campground.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Green-River-Ferry-%28Mammoth-Cave-National-Park%29.aspx"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03308500 at 2040 cfs / 5.62 ft",
        "note": "USGS Water Services returned same-day July 3, 2026 discharge and stage values for Green River at Munfordville during this run. The discharge is well above KDFWR's 300 to 600 cfs good band, so expect a high-water day with faster current and less margin.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03308500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Broad pools, springs/caves corridor, ferry finish",
        "note": "KDFWR describes Pool 6 as a scenic section with numerous springs, caves, and wildlife, Stovall as a park ramp with primitive camping and amenities, and Green River Ferry as a managed Mammoth Cave launch where paddlers must avoid interfering with ferry operations.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Pool 6 Green River",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Stovall Park Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=241",
        "provider": "local"
      },
      {
        "label": "KDFWR Dennison Ferry Carrydown",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1015",
        "provider": "local"
      },
      {
        "label": "KDFWR Green River Ferry",
        "url": "https://fw.ky.gov/Fish/Pages/Green-River-Ferry-%28Mammoth-Cave-National-Park%29.aspx",
        "provider": "local"
      },
      {
        "label": "NPS Canoeing, Kayaking and Boating",
        "url": "https://www.nps.gov/maca/planyourvisit/canoeing-kayaking-and-boating.htm",
        "provider": "nps"
      },
      {
        "label": "USGS 03308500 Green River at Munfordville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03308500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03308500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03308500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "green-river-stovall-park-dennison-ferry",
    "slug": "green-river-stovall-park-dennison-ferry",
    "name": "Green River",
    "reach": "Munfordville-Stovall Park Ramp to Dennison Ferry Carrydown",
    "aliases": [
      "Green River - Stovall Park to Dennison Ferry",
      "Hart County to Mammoth Cave from Stovall",
      "KDFWR Pool 6 Stovall Park to Dennison Ferry"
    ],
    "state": "Kentucky",
    "region": "Hart County / Mammoth Cave",
    "summary": "Long Green River float from Munfordville-Stovall Park Ramp into Mammoth Cave at Dennison Ferry. KDFWR still publishes this exact 21-mile public segment, keeps the endpoint access rules current, and ties the corridor to the direct Munfordville USGS gauge.",
    "statusText": "Use the Green River at Munfordville gauge. KDFWR rates 300 to 600 cfs as good for boating and fishing. Today the river is well above band at 1670 cfs, so expect a faster, more consequential broad-river day with extra caution at the park carry-down finish.",
    "latitude": 37.2663,
    "longitude": -85.8892,
    "gaugeSource": {
      "id": "usgs-03308500",
      "provider": "usgs",
      "siteId": "03308500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Green River at Munfordville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03308500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 300,
      "idealMax": 600,
      "tooLow": 300,
      "tooHigh": 600,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Green River at Munfordville",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
      "windSensitivity": 0.7,
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
      "seasonNotes": "This Stovall-to-Dennison route is most practical from spring through fall with full daylight and stable weather. Lower water slows the day, while fresh rain or release-driven rises can stack debris and current before the Mammoth Cave finish.",
      "difficulty": "moderate",
      "difficultyNotes": "The water is still flatwater by whitewater standards, but 21 miles, broad-river wind, limited bailout options, and a day-use-only park finish make this a committed moderate outing rather than a casual family float.",
      "confidenceNotes": "Confidence is good for a conservative Kentucky add: KDFWR's Pool 6 page still lists Stovall Park Ramp to Dennison Ferry as an exact 21.0-mile public segment, current KDFWR access-detail pages still expose coordinates and access rules for both endpoints, the Pool 6 page still publishes the official Munfordville discharge ladder of Low below 300 cfs, Good from 300 to 600 cfs, and High above 600 cfs, and USGS Water Services returned same-day July 10, 2026 values of 1670 cfs and 5.04 ft from direct gauge 03308500 during this run. That discharge is above the official good band, so the route ships with explicit higher-water caution rather than comfort framing."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Stovall Park Ramp to Dennison Ferry, 21.0 mi",
        "note": "KDFWR's Pool 6 page still lists this exact public segment at 21.0 miles.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "300-600 cfs good",
        "note": "KDFWR rates the Green River gauge at Munfordville as Low below 300 cfs, Good from 300 to 600 cfs, and High above 600 cfs.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Munfordville-Stovall Park Ramp, 37.2663, -85.8892",
        "note": "KDFWR identifies Stovall Park as a free paved single-lane public ramp with paved parking, restrooms, primitive camping, and park amenities.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=241"
      },
      {
        "label": "Take-out access",
        "value": "Dennison Ferry Carrydown, 37.2174, -86.0493",
        "note": "KDFWR identifies Dennison Ferry as a free day-use-only carry-down access inside Mammoth Cave National Park with unpaved parking and no camping, while NPS describes a wooden canoe and kayak ramp with a series of concrete stairs to the water.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1015"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03308500 at 1670 cfs / 5.04 ft",
        "note": "USGS Water Services returned same-day July 10, 2026 discharge and stage values for Green River at Munfordville during this run. The discharge is above the KDFWR good band, so this route needs honest higher-water caution today.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03308500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Broad pools, springs/caves corridor, and park carry-down finish",
        "note": "KDFWR describes Pool 6 as a scenic section with numerous springs, caves, bluffs, and wildlife, while NPS says Dennison Ferry is one of the park's car-access river points and consists of a wooden canoe-and-kayak ramp with stairs to the water.",
        "sourceUrl": "https://www.nps.gov/maca/planyourvisit/canoeing-kayaking-and-boating.htm"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Pool 6 Green River",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Stovall Park Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=241",
        "provider": "local"
      },
      {
        "label": "KDFWR Dennison Ferry Carrydown",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1015",
        "provider": "local"
      },
      {
        "label": "NPS Canoeing, Kayaking and Boating",
        "url": "https://www.nps.gov/maca/planyourvisit/canoeing-kayaking-and-boating.htm",
        "provider": "nps"
      },
      {
        "label": "USGS 03308500 Green River at Munfordville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03308500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03308500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03308500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "green-river-lynn-camp-creek-hh-wilson-park",
    "slug": "green-river-lynn-camp-creek-hh-wilson-park",
    "name": "Green River",
    "reach": "Lynn Camp Creek Ramp to H.H. Wilson Park Ramp",
    "aliases": [
      "Green River - Lynn Camp to H.H. Wilson",
      "Green River Hart County upper full segment",
      "KDFWR Pool 6 Lynn Camp Creek to H.H. Wilson"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Long Hart County Green River float from Lynn Camp Creek Ramp to H.H. Wilson Park Ramp. KDFWR documents the 18.2-mile public route, exact endpoint coordinates, and official Munfordville discharge bands tied to the local USGS gauge.",
    "statusText": "Use the Green River at Munfordville gauge. KDFWR rates 300 to 600 cfs as good for boating and fishing. Below that expect a slower, shallower day with more dragging; above that the broad river, fresh wood, and the H.H. Wilson landing deserve extra caution.",
    "latitude": 37.3533,
    "longitude": -85.7098,
    "gaugeSource": {
      "id": "usgs-03308500",
      "provider": "usgs",
      "siteId": "03308500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Green River at Munfordville, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03308500/"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 300,
      "idealMax": 600,
      "tooLow": 300,
      "tooHigh": 600,
      "thresholdSource": {
        "label": "KDFWR recommended river levels for Green River at Munfordville",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "This longer Hart County segment is best in spring through fall when the Munfordville gauge is stable. Summer can still work in the good band, but lower water, heat, and slower pool sections matter more across a nearly full-day float.",
      "difficulty": "moderate",
      "difficultyNotes": "This is still a recreational Green River corridor, but 18.2 miles, limited public bailout options, private-bank limits, and the broad-river wind and debris story make it a more committed day than the shorter Hart County runs.",
      "confidenceNotes": "Confidence is good for a conservative Kentucky restore: KDFWR's Pool 6 page still lists Lynn Camp Creek Ramp to H.H. Wilson Ramp as an 18.2-mile public segment and preserves the official Munfordville discharge ladder of Low below 300 cfs, Good from 300 to 600 cfs, and High above 600 cfs. The Lynn Camp and H.H. Wilson access-detail pages still expose coordinates and availability, and USGS Water Services returned same-day July 11, 2026 values of 2660 cfs and 6.55 ft at 20:00 CDT from direct gauge 03308500 during this run. That discharge is well above the official good band, so this route ships with explicit above-band caution today."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Lynn Camp Creek Ramp to H.H. Wilson Ramp, 18.2 mi",
        "note": "KDFWR lists Lynn Camp Creek Ramp to H.H. Wilson Ramp as an 18.2-mile Green River Pool 6 access-to-access segment.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "300-600 cfs good",
        "note": "KDFWR rates the Green River gauge at Munfordville as Low below 300 cfs, Good from 300 to 600 cfs, and High above 600 cfs.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Lynn Camp Creek Ramp, 37.3533, -85.7098",
        "note": "KDFWR identifies Lynn Camp Creek VPA #1 as a free public carry-down and ramp access with unpaved parking, year-round availability, no camping, and a privately owned but publicly open launch area.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=968"
      },
      {
        "label": "Take-out access",
        "value": "H.H. Wilson Park Ramp, 37.2979, -85.8506",
        "note": "KDFWR identifies H.H. Wilson Park as a free paved single-lane ramp with unpaved parking, year-round 24-hour availability, and no camping.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=240"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03308500 at 2660 cfs / 6.55 ft",
        "note": "USGS Water Services returned same-day July 11, 2026 discharge and stage values at 20:00 CDT for Green River at Munfordville during this run. The discharge is far above the KDFWR good band, so the route needs explicit higher-water caution today.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03308500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Route character",
        "value": "Private-bank corridor, sandbars, mild riffles, long pools",
        "note": "KDFWR marks Lynn Camp as the start of the Hart County Blue Water Trail, describes the downstream Hart County corridor as scenic and family-friendly with bluffs, islands, chutes, mild riffles, long deep holes, and sandbars, and notes H.H. Wilson's shoals, long runs, and deep rocky banks at the finish.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Green-River---Hart-County.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Pool 6 Green River",
        "url": "https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Green River Hart County",
        "url": "https://fw.ky.gov/Education/Pages/Green-River---Hart-County.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Lynn Camp Creek VPA #1",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=968",
        "provider": "local"
      },
      {
        "label": "KDFWR H.H. Wilson Park Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=240",
        "provider": "local"
      },
      {
        "label": "USGS 03308500 Green River at Munfordville",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03308500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03308500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03308500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "cumberland-river-redbird-thunderstruck",
    "slug": "cumberland-river-redbird-thunderstruck",
    "name": "Cumberland River",
    "reach": "Redbird Ramp to Thunderstruck Ramp",
    "aliases": [
      "Cumberland River - Redbird to Thunderstruck",
      "Upper Cumberland above the falls",
      "North Fork Cumberland River upper float"
    ],
    "state": "Kentucky",
    "region": "Daniel Boone Country",
    "routeType": "whitewater",
    "summary": "Remote upper Cumberland run from Redbird Ramp to Thunderstruck Ramp above Cumberland Falls. Current KDFWR route and map pages still support this as the first official upstream-of-the-falls float and tie it to the direct Williamsburg gauge with a 500 to 1,100 cfs preferred band.",
    "statusText": "Use the Cumberland River at Williamsburg gauge. KDFWR says 500 to 1,100 cfs is best, lower water can mean dragging, and flows up to 2,000 cfs are challenging for skilled paddlers only.",
    "latitude": 36.7621,
    "longitude": -84.2216,
    "gaugeSource": {
      "id": "usgs-03404000",
      "provider": "usgs",
      "siteId": "03404000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Cumberland River at Williamsburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03404000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "whitewater",
        "fast_rise",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "This is a remote moving-water gorge float with shoals and mild whitewater rapids, not a casual flatwater cruise.",
        "KDFWR says water above 1,100 cfs becomes more challenging and up to 2,000 cfs is for skilled paddlers only.",
        "Long Bottom and Mouth of Indian Creek are not dependable normal exits because KDFWR describes those roads as extremely rough."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 500,
      "idealMax": 1100,
      "tooLow": 500,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "KDFWR Cumberland River recommended Williamsburg flow band",
        "url": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This forested Cumberland run is best when the Williamsburg gauge is inside the KDFWR band. Dry spells can expose shoals, while storms can push the gorge into a more technical day quickly.",
      "difficulty": "moderate",
      "difficultyNotes": "The route has mild whitewater, broad shoals, and a remote finish. It is manageable for competent moving-water paddlers at normal levels but should not be treated like an easy family float.",
      "confidenceNotes": "Confidence is good for a guarded restore: KDFWR explicitly names Redbird and Thunderstruck as the upstream official float endpoints, publishes the 500 to 1,100 cfs Williamsburg band with higher-water caution up to 2,000 cfs, and KDFWR access-detail pages provide source-backed coordinates for both ramps. Same-day USGS Water Services returned 1,200 cfs and 4.48 ft at 2026-07-10 04:00 EDT, which is above the preferred band but still below the official skilled-paddler challenge ceiling."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Redbird Ramp to Thunderstruck Ramp, about 11 mi",
        "note": "KDFWR presents this as the first of the two official upstream Cumberland Falls floats, and the current route map still supports the chained Redbird to Longbottom and Longbottom to Thunderstruck distances.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "500-1100 cfs best; up to 2000 cfs challenging",
        "note": "KDFWR says lower water may require dragging and higher water up to 2,000 cfs is challenging for skilled paddlers only.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Redbird Ramp, 36.7621, -84.2216",
        "note": "KDFWR access detail lists Redbird as a paved public ramp with year-round availability.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=904"
      },
      {
        "label": "Take-out access",
        "value": "Thunderstruck Ramp, 36.8077, -84.3546",
        "note": "KDFWR access detail lists Thunderstruck as a year-round public ramp with unpaved parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=893"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03404000 at 1200 cfs / 4.48 ft",
        "note": "USGS Water Services returned same-day values for Cumberland River at Williamsburg, KY at 2026-07-10 04:00 EDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03404000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping support",
        "value": "Float-camping banks downstream of Bee Shoals",
        "note": "KDFWR says float campers use the banks downstream of Bee Shoals as camping sites on this route.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Cumberland River",
        "url": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Cumberland River detailed map",
        "url": "https://fw.ky.gov/Education/Documents/bluewatertrailcumberlandriver-1.pdf",
        "provider": "local"
      },
      {
        "label": "KDFWR Redbird Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=904",
        "provider": "local"
      },
      {
        "label": "KDFWR Thunderstruck Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=893",
        "provider": "local"
      },
      {
        "label": "USGS 03404000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03404000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03404000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03404000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "cumberland-river-thunderstruck-cumberland-falls",
    "slug": "cumberland-river-thunderstruck-cumberland-falls",
    "name": "Cumberland River",
    "reach": "Thunderstruck Ramp to Cumberland Falls Carrydown",
    "aliases": [
      "Cumberland River - Thunderstruck to Cumberland Falls",
      "Upper Cumberland gorge to the falls",
      "North Fork Cumberland River lower float above the falls"
    ],
    "state": "Kentucky",
    "region": "Daniel Boone Country",
    "routeType": "whitewater",
    "summary": "Shorter but more consequential upstream-of-the-falls Cumberland run from Thunderstruck Ramp to Cumberland Falls Carrydown. Current KDFWR guidance still uses the direct Williamsburg gauge and explicitly warns paddlers to work right and take out before the falls.",
    "statusText": "Use the Cumberland River at Williamsburg gauge. KDFWR says 500 to 1,100 cfs is best, lower water can mean dragging, and higher water up to 2,000 cfs is challenging for skilled paddlers only. Missing the take-out is not acceptable because the falls are immediately downstream.",
    "latitude": 36.8077,
    "longitude": -84.3546,
    "gaugeSource": {
      "id": "usgs-03404000",
      "provider": "usgs",
      "siteId": "03404000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Cumberland River at Williamsburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03404000/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "mandatory_takeout",
        "fast_rise",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "KDFWR says several drops lead toward Cumberland Falls and paddlers must work to the right of the river before the KY 90 bridge.",
        "Any upset or missed line near the finish can create a treacherous situation because the current leads directly toward the 68-foot falls.",
        "Treat this as an advanced moving-water route even when the gauge is inside the preferred band."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 500,
      "idealMax": 1100,
      "tooLow": 500,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "KDFWR Cumberland River recommended Williamsburg flow band",
        "url": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This gorge route is most defensible when the Williamsburg gauge stays in or near the KDFWR band and weather is stable. Rain can make the rapid sequence and final take-out substantially more serious.",
      "difficulty": "hard",
      "difficultyNotes": "The route includes Class II-style rapid features at higher water, a fast gorge finish, and a mandatory take-out above Cumberland Falls.",
      "confidenceNotes": "Confidence is good for a guarded restore because KDFWR explicitly names Thunderstruck as the put-in, the Cumberland Falls carrydown as the take-out, and the right-bank take-out behavior above the falls. The direct Williamsburg gauge and official flow band are the same as the upstream segment. Same-day USGS Water Services returned 1,200 cfs and 4.48 ft at 2026-07-10 04:00 EDT, above the preferred band but still below the official skilled-paddler challenge ceiling."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Thunderstruck to Cumberland Falls, about 5 mi",
        "note": "KDFWR presents this as the second of the two official upstream Cumberland Falls floats, and the current route map still publishes Thunderstruck to Cumberland Falls as 5.1 miles.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx"
      },
      {
        "label": "Mandatory take-out warning",
        "value": "Work right and take out below the KY 90 bridge",
        "note": "KDFWR says paddlers must work to the right and take out at the parking lot for viewing Cumberland Falls because the rapids otherwise lead toward the falls.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Thunderstruck Ramp, 36.8077, -84.3546",
        "note": "KDFWR access detail lists Thunderstruck as a public year-round ramp.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=893"
      },
      {
        "label": "Take-out access",
        "value": "Cumberland Falls Carrydown, 36.8421, -84.3435",
        "note": "KDFWR access detail lists Cumberland Falls as a public seasonal carrydown with paved parking, seasonal camping, and year-round lodging at the state resort park.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=987"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03404000 at 1200 cfs / 4.48 ft",
        "note": "USGS Water Services returned same-day values for Cumberland River at Williamsburg, KY at 2026-07-10 04:00 EDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03404000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping support",
        "value": "Cumberland Falls campground and lodging at the take-out",
        "note": "KDFWR access detail for Cumberland Falls says camping is seasonal and lodging is year-round at the state resort park.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=987"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Cumberland River",
        "url": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Cumberland River detailed map",
        "url": "https://fw.ky.gov/Education/Documents/bluewatertrailcumberlandriver-1.pdf",
        "provider": "local"
      },
      {
        "label": "KDFWR Thunderstruck Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=893",
        "provider": "local"
      },
      {
        "label": "KDFWR Cumberland Falls Carrydown",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=987",
        "provider": "local"
      },
      {
        "label": "USGS 03404000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03404000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03404000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03404000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "cumberland-river-redbird-longbottom",
    "slug": "cumberland-river-redbird-longbottom",
    "name": "Cumberland River",
    "reach": "Redbird Ramp to Long Bottom Access",
    "aliases": [
      "Cumberland River - Redbird to Long Bottom",
      "Upper Cumberland Bee Shoals split",
      "North Fork Cumberland River upper half above the falls"
    ],
    "state": "Kentucky",
    "region": "Daniel Boone Country",
    "routeType": "whitewater",
    "summary": "Remote upper Cumberland split from Redbird Ramp to Long Bottom Access above Cumberland Falls. Current KDFWR route and map pages tie the segment to the direct Williamsburg gauge and the same official 500 to 1,100 cfs preferred band used on the rest of the upstream-of-the-falls corridor.",
    "statusText": "Use the Cumberland River at Williamsburg gauge. KDFWR says 500 to 1,100 cfs is best, lower water can mean dragging, and flows up to 2,000 cfs are challenging for skilled paddlers only. Scout the Long Bottom road and carry before committing because the take-out is rougher than the main Redbird and Thunderstruck ramps.",
    "latitude": 36.7621,
    "longitude": -84.2216,
    "gaugeSource": {
      "id": "usgs-03404000",
      "provider": "usgs",
      "siteId": "03404000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Cumberland River at Williamsburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03404000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "whitewater",
        "fast_rise",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "This is a remote moving-water gorge float with shoals and mild whitewater, not a casual flatwater trip.",
        "KDFWR says lower water may require dragging and flows above 1,100 cfs become more technical, with up to 2,000 cfs for skilled paddlers only.",
        "KDFWR says the last section of Forest Service Road 536 to Long Bottom is extremely rugged and best suited to high-clearance four-wheel-drive vehicles."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 500,
      "idealMax": 1100,
      "tooLow": 500,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "KDFWR Cumberland River recommended Williamsburg flow band",
        "url": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This upper Cumberland split is best when the Williamsburg gauge is in the KDFWR band. Dry spells expose shoals, while storms quickly make the gorge pushier and the Long Bottom exit muddier and less forgiving.",
      "difficulty": "moderate",
      "difficultyNotes": "The route is shorter than the full Redbird-to-Thunderstruck run but still includes remote shoals, mild whitewater, and a rough carry-down finish.",
      "confidenceNotes": "Confidence is good for a guarded add: the current KDFWR page and 2023 route map name Redbird and Long Bottom as public accesses, publish the Williamsburg 500 to 1,100 cfs preferred band with skilled-paddler caution up to 2,000 cfs, and KDFWR access-detail pages provide source-backed coordinates for both named endpoints. Same-day USGS Water Services returned 1,190 cfs and 4.46 ft at 2026-07-10 03:00 EDT, which is slightly above the preferred band but still below the official skilled-paddler challenge ceiling."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Redbird Ramp to Long Bottom Access, 9 mi",
        "note": "The current KDFWR route map publishes Redbird to Longbottom as a 9-mile ramp-to-ramp distance.",
        "sourceUrl": "https://fw.ky.gov/Education/Documents/bluewatertrailcumberlandriver-1.pdf"
      },
      {
        "label": "Official level band",
        "value": "500-1100 cfs best; up to 2000 cfs challenging",
        "note": "KDFWR says lower water may require dragging and higher water up to 2,000 cfs is challenging for skilled paddlers only.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Redbird Ramp, 36.7621, -84.2216",
        "note": "KDFWR access detail lists Redbird as a paved public ramp with year-round availability.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=904"
      },
      {
        "label": "Take-out access",
        "value": "Long Bottom Access, 36.7772, -84.3455",
        "note": "KDFWR access detail lists Long Bottom as a year-round public carry-down access and the route page warns the final road approach is extremely rugged.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=665"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03404000 at 1190 cfs / 4.46 ft",
        "note": "USGS Water Services returned same-day values for Cumberland River at Williamsburg, KY at 2026-07-10 03:00 EDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03404000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping support",
        "value": "Primitive float-camping banks downstream of Bee Shoals",
        "note": "KDFWR says float campers use the banks downstream of Bee Shoals on this upper corridor.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Cumberland River",
        "url": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Cumberland River detailed map",
        "url": "https://fw.ky.gov/Education/Documents/bluewatertrailcumberlandriver-1.pdf",
        "provider": "local"
      },
      {
        "label": "KDFWR Redbird Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=904",
        "provider": "local"
      },
      {
        "label": "KDFWR Long Bottom Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=665",
        "provider": "local"
      },
      {
        "label": "USGS 03404000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03404000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03404000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03404000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "cumberland-river-longbottom-thunderstruck",
    "slug": "cumberland-river-longbottom-thunderstruck",
    "name": "Cumberland River",
    "reach": "Long Bottom Access to Thunderstruck Ramp",
    "aliases": [
      "Cumberland River - Long Bottom to Thunderstruck",
      "Upper Cumberland middle split",
      "North Fork Cumberland River Long Bottom connector"
    ],
    "state": "Kentucky",
    "region": "Daniel Boone Country",
    "routeType": "whitewater",
    "summary": "Short middle-gorge Cumberland split from Long Bottom Access to Thunderstruck Ramp above Cumberland Falls. The current KDFWR route map gives the exact 2.5-mile ramp-to-ramp distance and uses the same direct Williamsburg gauge with the official 500 to 1,100 cfs preferred band.",
    "statusText": "Use the Cumberland River at Williamsburg gauge. KDFWR says 500 to 1,100 cfs is best, lower water can mean dragging, and flows up to 2,000 cfs are challenging for skilled paddlers only. Long Bottom is a rough carry-down and Thunderstruck is easy to miss if you drift past the left-bank access.",
    "latitude": 36.7772,
    "longitude": -84.3455,
    "gaugeSource": {
      "id": "usgs-03404000",
      "provider": "usgs",
      "siteId": "03404000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Cumberland River at Williamsburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03404000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "whitewater",
        "fast_rise",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "Even though it is short, this segment still includes shoals and moving-water decision points in a remote gorge corridor.",
        "KDFWR describes Long Bottom road access as extremely rugged and says Thunderstruck is easy to miss without paying attention to the left-bank exit.",
        "Treat flows above 1,100 cfs as a stronger-water skilled-paddler day, with 2,000 cfs as KDFWR's upper challenge line."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 500,
      "idealMax": 1100,
      "tooLow": 500,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "KDFWR Cumberland River recommended Williamsburg flow band",
        "url": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "The short mileage keeps this segment practical, but it still relies on the same rain-sensitive Cumberland gorge band as the adjacent official floats. Low water can scrape, and storms quickly sharpen the shoals and make the rough Long Bottom access harder to manage.",
      "difficulty": "moderate",
      "difficultyNotes": "This is the shortest upstream-of-the-falls split, but the rough carry-down, shoals, and remote setting make it a moving-water route rather than a casual beginner shuttle.",
      "confidenceNotes": "Confidence is good for a guarded add because the current KDFWR map names Long Bottom and Thunderstruck as public ramp-to-ramp endpoints at 2.5 miles, KDFWR access-detail pages provide coordinates for both, and the direct Williamsburg gauge plus official 500 to 1,100 cfs band apply to the whole corridor. Same-day USGS Water Services returned 1,190 cfs and 4.46 ft at 2026-07-10 03:00 EDT, which is above the preferred band but still below the official challenge ceiling."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Long Bottom Access to Thunderstruck Ramp, 2.5 mi",
        "note": "The current KDFWR route map publishes Longbottom to Thunderstruck as a 2.5-mile ramp-to-ramp distance.",
        "sourceUrl": "https://fw.ky.gov/Education/Documents/bluewatertrailcumberlandriver-1.pdf"
      },
      {
        "label": "Official level band",
        "value": "500-1100 cfs best; up to 2000 cfs challenging",
        "note": "KDFWR says lower water may require dragging and higher water up to 2,000 cfs is challenging for skilled paddlers only.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Long Bottom Access, 36.7772, -84.3455",
        "note": "KDFWR access detail lists Long Bottom as a year-round public carry-down access with unpaved parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=665"
      },
      {
        "label": "Take-out access",
        "value": "Thunderstruck Ramp, 36.8077, -84.3546",
        "note": "KDFWR access detail lists Thunderstruck as a year-round public ramp, and the route page warns the access is easy to miss unless paddlers pay attention to the left-bank take-out.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=893"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03404000 at 1190 cfs / 4.46 ft",
        "note": "USGS Water Services returned same-day values for Cumberland River at Williamsburg, KY at 2026-07-10 03:00 EDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03404000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Access caveat",
        "value": "Long Bottom road is extremely rugged",
        "note": "KDFWR says the last section of Forest Service Road 536 down to Long Bottom is extremely rugged and recommends high-clearance four-wheel drive vehicles.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Cumberland River",
        "url": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Cumberland River detailed map",
        "url": "https://fw.ky.gov/Education/Documents/bluewatertrailcumberlandriver-1.pdf",
        "provider": "local"
      },
      {
        "label": "KDFWR Long Bottom Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=665",
        "provider": "local"
      },
      {
        "label": "KDFWR Thunderstruck Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=893",
        "provider": "local"
      },
      {
        "label": "USGS 03404000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03404000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03404000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03404000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "cumberland-river-longbottom-cumberland-falls",
    "slug": "cumberland-river-longbottom-cumberland-falls",
    "name": "Cumberland River",
    "reach": "Long Bottom Access to Cumberland Falls Carrydown",
    "aliases": [
      "Cumberland River - Long Bottom to Cumberland Falls",
      "Upper Cumberland lower gorge combination",
      "North Fork Cumberland River Long Bottom to falls"
    ],
    "state": "Kentucky",
    "region": "Daniel Boone Country",
    "routeType": "whitewater",
    "summary": "Lower upstream-of-the-falls Cumberland combination from Long Bottom Access to the public Cumberland Falls carrydown. The current KDFWR route map supports the exact 7.6-mile distance by combining Longbottom to Thunderstruck and Thunderstruck to Cumberland Falls under one direct Williamsburg gauge and one official 500 to 1,100 cfs preferred band.",
    "statusText": "Use the Cumberland River at Williamsburg gauge. KDFWR says 500 to 1,100 cfs is best, lower water can mean dragging, and flows up to 2,000 cfs are challenging for skilled paddlers only. Missing the right-bank take-out above Cumberland Falls is not acceptable.",
    "latitude": 36.7772,
    "longitude": -84.3455,
    "gaugeSource": {
      "id": "usgs-03404000",
      "provider": "usgs",
      "siteId": "03404000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Cumberland River at Williamsburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03404000/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "mandatory_takeout",
        "fast_rise",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "This route combines the rough Long Bottom access with the downstream gorge section that ends at a mandatory take-out above Cumberland Falls.",
        "KDFWR says paddlers must work right before the KY 90 bridge and take out at the falls parking area because missing the finish leads toward the 68-foot falls.",
        "The Long Bottom road approach is extremely rugged, so do not treat this as a quick roadside rescue-friendly route."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 500,
      "idealMax": 1100,
      "tooLow": 500,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "KDFWR Cumberland River recommended Williamsburg flow band",
        "url": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This longer lower-gorge combination is most defensible when the Williamsburg gauge stays in or near the KDFWR band and weather is stable. Rain can quickly turn the gorge, rapid sequence, and final mandatory take-out into a much more serious day.",
      "difficulty": "hard",
      "difficultyNotes": "The route includes gorge shoals, the Pitch Rapids and lower drop sequence, a rough upstream access road, and a mandatory take-out above Cumberland Falls.",
      "confidenceNotes": "Confidence is good for a guarded add because the current KDFWR page and 2023 route map name Long Bottom, Thunderstruck, and Cumberland Falls as public access points, publish the official Williamsburg 500 to 1,100 cfs preferred band with skilled-paddler caution up to 2,000 cfs, and KDFWR access-detail pages provide source-backed coordinates for Long Bottom and Cumberland Falls. Same-day USGS Water Services returned 1,190 cfs and 4.46 ft at 2026-07-10 03:00 EDT, which is above the preferred band but still below the official challenge ceiling."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Long Bottom Access to Cumberland Falls, 7.6 mi",
        "note": "The current KDFWR route map publishes Longbottom to Thunderstruck as 2.5 miles and Thunderstruck to Cumberland Falls as 5.1 miles, which support this 7.6-mile combination.",
        "sourceUrl": "https://fw.ky.gov/Education/Documents/bluewatertrailcumberlandriver-1.pdf"
      },
      {
        "label": "Mandatory take-out warning",
        "value": "Work right and take out below the KY 90 bridge",
        "note": "KDFWR says paddlers must work to the right and take out at the public falls parking/carrydown area because the current otherwise leads toward Cumberland Falls.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Long Bottom Access, 36.7772, -84.3455",
        "note": "KDFWR access detail lists Long Bottom as a year-round public carry-down access and the route page warns the final road approach is extremely rugged.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=665"
      },
      {
        "label": "Take-out access",
        "value": "Cumberland Falls Carrydown, 36.8421, -84.3435",
        "note": "KDFWR access detail lists Cumberland Falls as a public year-round carrydown with paved parking, seasonal camping, and year-round lodging at the state resort park.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=987"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03404000 at 1190 cfs / 4.46 ft",
        "note": "USGS Water Services returned same-day values for Cumberland River at Williamsburg, KY at 2026-07-10 03:00 EDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03404000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping support",
        "value": "Cumberland Falls campground and lodging at the take-out",
        "note": "KDFWR access detail for Cumberland Falls says camping is seasonal and lodging is year-round at the state resort park.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=987"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Cumberland River",
        "url": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Cumberland River detailed map",
        "url": "https://fw.ky.gov/Education/Documents/bluewatertrailcumberlandriver-1.pdf",
        "provider": "local"
      },
      {
        "label": "KDFWR Long Bottom Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=665",
        "provider": "local"
      },
      {
        "label": "KDFWR Cumberland Falls Carrydown",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=987",
        "provider": "local"
      },
      {
        "label": "USGS 03404000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03404000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03404000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03404000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "cumberland-river-redbird-cumberland-falls",
    "slug": "cumberland-river-redbird-cumberland-falls",
    "name": "Cumberland River",
    "reach": "Redbird Ramp to Cumberland Falls Carrydown",
    "aliases": [
      "Cumberland River - Redbird to Cumberland Falls",
      "Upper Cumberland upstream-of-the-falls access-planner corridor",
      "North Fork Cumberland River gorge planner combination"
    ],
    "state": "Kentucky",
    "region": "Daniel Boone Country",
    "routeType": "whitewater",
    "summary": "Canonical full upstream-of-the-falls Cumberland combination from Redbird Ramp to the public Cumberland Falls carrydown. Current KDFWR guidance and the current route map support the exact 16.6-mile distance by chaining Redbird to Long Bottom, Long Bottom to Thunderstruck, and Thunderstruck to Cumberland Falls under one direct Williamsburg gauge, and this slug now carries the intermediate public access planner instead of preserving every chain permutation.",
    "statusText": "Use the Cumberland River at Williamsburg gauge. KDFWR says 500 to 1,100 cfs is best, lower water can mean dragging, and flows up to 2,000 cfs are challenging for skilled paddlers only. Missing the right-bank take-out above Cumberland Falls is not acceptable.",
    "latitude": 36.7621,
    "longitude": -84.2216,
    "gaugeSource": {
      "id": "usgs-03404000",
      "provider": "usgs",
      "siteId": "03404000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Cumberland River at Williamsburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03404000/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "mandatory_takeout",
        "fast_rise",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "This route combines the full upper remote gorge with the downstream rapid sequence that ends at a mandatory take-out above Cumberland Falls.",
        "KDFWR says paddlers must work right before the KY 90 bridge and take out at the falls parking area because missing the finish leads toward the 68-foot falls.",
        "Long Bottom remains a rough mid-route bailout rather than a normal easy exit because KDFWR says the final road approach is extremely rugged."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 500,
      "idealMax": 1100,
      "tooLow": 500,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "KDFWR Cumberland River recommended Williamsburg flow band",
        "url": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This full upstream Cumberland combination is most defensible when the Williamsburg gauge stays in or near the KDFWR band and weather is stable. Rain can quickly turn the gorge, rapid sequence, and final mandatory take-out into a much more serious day.",
      "difficulty": "hard",
      "difficultyNotes": "The route includes remote shoals, mild whitewater, the rough Long Bottom corridor, Pitch Rapids, the lower gorge drop sequence, and a mandatory take-out above Cumberland Falls.",
      "confidenceNotes": "Confidence is good for a guarded add because the current KDFWR page and 2023 route map name Redbird, Longbottom, Thunderstruck, and Cumberland Falls as public access points, publish the official Williamsburg 500 to 1,100 cfs preferred band with skilled-paddler caution up to 2,000 cfs, and KDFWR access-detail pages provide source-backed coordinates for Redbird and Cumberland Falls. Same-day USGS Water Services returned 1,100 cfs and 4.33 ft at 2026-07-03 06:00 EDT, exactly at the top of the preferred band."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Redbird Ramp to Cumberland Falls, 16.6 mi",
        "note": "The current KDFWR route map publishes Redbird to Longbottom as 9.0 miles, Longbottom to Thunderstruck as 2.5 miles, and Thunderstruck to Cumberland Falls as 5.1 miles, which support this 16.6-mile combination.",
        "sourceUrl": "https://fw.ky.gov/Education/Documents/bluewatertrailcumberlandriver-1.pdf"
      },
      {
        "label": "Planner model",
        "value": "Canonical Cumberland gorge corridor with intermediate public accesses",
        "note": "This slug keeps Redbird as the upstream launch and Cumberland Falls as the mandatory downstream finish while the trip details preserve Long Bottom and Thunderstruck as named public mid-route options for bailout or shorter planning.",
        "sourceUrl": "https://fw.ky.gov/Education/Documents/bluewatertrailcumberlandriver-1.pdf"
      },
      {
        "label": "Mandatory take-out warning",
        "value": "Work right and take out below the KY 90 bridge",
        "note": "KDFWR says paddlers must work to the right and take out at the public falls parking/carrydown area because the current otherwise leads toward Cumberland Falls.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Redbird Ramp, 36.7621, -84.2216",
        "note": "KDFWR access detail lists Redbird as a paved public ramp with year-round availability.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=904"
      },
      {
        "label": "Take-out access",
        "value": "Cumberland Falls Carrydown, 36.8421, -84.3435",
        "note": "KDFWR access detail lists Cumberland Falls as a public year-round carrydown with paved parking, seasonal camping, and year-round lodging at the state resort park.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=987"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03404000 at 1100 cfs / 4.33 ft",
        "note": "USGS Water Services returned same-day values for Cumberland River at Williamsburg, KY at 2026-07-03 06:00 EDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03404000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping support",
        "value": "Primitive float-camping banks downstream of Bee Shoals plus falls campground/lodging finish",
        "note": "KDFWR says float campers use the banks downstream of Bee Shoals on this corridor, and the Cumberland Falls access detail lists seasonal camping and year-round lodging at the take-out.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Cumberland River",
        "url": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Cumberland River detailed map",
        "url": "https://fw.ky.gov/Education/Documents/bluewatertrailcumberlandriver-1.pdf",
        "provider": "local"
      },
      {
        "label": "KDFWR Redbird Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=904",
        "provider": "local"
      },
      {
        "label": "KDFWR Cumberland Falls Carrydown",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=987",
        "provider": "local"
      },
      {
        "label": "USGS 03404000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03404000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03404000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03404000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "kinniconick-creek-leatherwood-branch-mcdowells-creek",
    "slug": "kinniconick-creek-leatherwood-branch-mcdowells-creek",
    "name": "Kinniconick Creek",
    "reach": "Leatherwood Branch Park Access to McDowells Creek Park Access",
    "aliases": [
      "Kinniconick Creek - Leatherwood Branch to McDowells Creek",
      "Kinniconick Creek upper public chain",
      "KDFWR Kinniconick Creek access chain"
    ],
    "state": "Kentucky",
    "region": "Eastern Kentucky",
    "summary": "Long upper Kinniconick Creek day from Leatherwood Branch Park Access to McDowells Creek Park Access. KDFWR documents the chained public route mileage and explicitly tells paddlers to use the Tygarts Creek gauge as the best current proxy for Kinniconick levels.",
    "statusText": "Use the Tygarts Creek near Greenup gauge as the official Kinniconick proxy. KDFWR rates Kinniconick low below 2.5 ft or 50 cfs, good from 2.5 to 3.5 ft or 50 to 130 cfs, and high above that.",
    "latitude": 38.5105,
    "longitude": -83.3274,
    "gaugeSource": {
      "id": "usgs-03217000",
      "provider": "usgs",
      "siteId": "03217000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "proxy",
      "siteName": "Tygarts Creek near Greenup, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/03217000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "KDFWR describes Kinniconick as rain-sensitive and uses a proxy gauge because there is no current direct stream gage on the creek.",
        "This is a long headwaters-to-mid-corridor route with simple park accesses but limited easy bailout comfort between the named public sites.",
        "Wood, mud banks, and private banks matter more when the route is scraping near the low end of the official band."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 2.5,
      "idealMax": 3.5,
      "tooLow": 2.5,
      "tooHigh": 3.5,
      "thresholdSource": {
        "label": "KDFWR Kinniconick Creek proxy gauge guidance",
        "url": "https://fw.ky.gov/Fish/Pages/Kinniconick_Creek.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "Spring through fall is the practical window. KDFWR treats Kinniconick as a rain-responsive creek, so low summer flows can scrape while fresh rain can push the broad good band toward a much faster, woodier run.",
      "difficulty": "moderate",
      "difficultyNotes": "Kinniconick is not technical whitewater, but this long route is still a committed moving-water day with shallow riffles at the low end, muddy accesses, and limited public stops away from the named landings.",
      "confidenceNotes": "Confidence is good for a conservative Kentucky add: current KDFWR guidance still lists Leatherwood Branch Park Access to Puncheon / Pipe Lick at 13.1 miles and Puncheon / Pipe Lick to McDowells Creek Park Access at 14.1 miles, supporting a 27.2-mile chained public route. KDFWR explicitly says that no current stream gage exists on Kinniconick Creek and that Tygarts Creek is used in lieu of Kinniconick because it closely mimics levels there, while the same page publishes official low/good/high stage and discharge bands. Current KDFWR access-detail pages still provide source-backed coordinates and public-use notes for Leatherwood Branch and McDowells Creek, and the official USGS legacy current page for 03217000 showed same-day values of 38.5 cfs and 2.80 ft at 2026-07-09 06:45 EDT during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official proxy level band",
        "value": "2.5-3.5 ft or 50-130 cfs good",
        "note": "KDFWR says no current stream gage is available for Kinniconick Creek and that Tygarts Creek should be used in lieu of Kinniconick because it closely mimics levels there. The same page rates Kinniconick low below 2.5 ft or 50 cfs, good from 2.5 to 3.5 ft or 50 to 130 cfs, and high above that.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Kinniconick_Creek.aspx"
      },
      {
        "label": "Chained public route segment",
        "value": "Leatherwood Branch Park Access to McDowells Creek Park Access, 27.2 miles",
        "note": "KDFWR lists Leatherwood Branch Park Access to Puncheon / Pipe Lick at 13.1 miles and Puncheon / Pipe Lick to McDowells Creek Park Access at 14.1 miles, supporting a 27.2-mile public chained route.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Kinniconick_Creek.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Leatherwood Branch Park Access, 38.5105, -83.3274",
        "note": "KDFWR access detail identifies Leatherwood Branch Park Access as a public ramp with no listed camping support.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1130"
      },
      {
        "label": "Take-out access",
        "value": "McDowells Creek Park Access, 38.5746, -83.1896",
        "note": "KDFWR access detail identifies McDowells Creek Park Access as a public ramp with no listed camping support.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1129"
      },
      {
        "label": "Live proxy-gauge support",
        "value": "USGS 03217000 at 38.5 cfs / 2.80 ft",
        "note": "The official USGS legacy current page for Tygarts Creek near Greenup showed same-day values at 2026-07-09 06:45 EDT during this run, and the stage sits inside KDFWRs published Kinniconick good band even though discharge was below the cfs floor.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=03217000"
      },
      {
        "label": "Camping posture",
        "value": "No public camping documented at either endpoint",
        "note": "Current KDFWR access-detail pages list Camping as None for both Leatherwood Branch Park Access and McDowells Creek Park Access.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1130"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Kinniconick Creek",
        "url": "https://fw.ky.gov/Fish/Pages/Kinniconick_Creek.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Leatherwood Branch Park Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1130",
        "provider": "local"
      },
      {
        "label": "KDFWR McDowells Creek Park Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1129",
        "provider": "local"
      },
      {
        "label": "USGS 03217000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/03217000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03217000 legacy current page",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=03217000",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "kinniconick-creek-leatherwood-branch-mill-pond-creek",
    "slug": "kinniconick-creek-leatherwood-branch-mill-pond-creek",
    "name": "Kinniconick Creek",
    "reach": "Leatherwood Branch Park Access to Mill Pond Creek Access",
    "aliases": [
      "Kinniconick Creek - Leatherwood Branch to Mill Pond Creek",
      "Kinniconick Creek upper-to-lower chain",
      "KDFWR Kinniconick Creek access chain"
    ],
    "state": "Kentucky",
    "region": "Eastern Kentucky",
    "summary": "Very long Kinniconick Creek route from Leatherwood Branch Park Access to Mill Pond Creek Access. KDFWR documents the exact chained public mileage and applies the same official Tygarts Creek proxy ladder to the whole Kinniconick access chain.",
    "statusText": "Use the Tygarts Creek near Greenup gauge as the official Kinniconick proxy. KDFWR rates Kinniconick low below 2.5 ft or 50 cfs, good from 2.5 to 3.5 ft or 50 to 130 cfs, and high above that.",
    "latitude": 38.5105,
    "longitude": -83.3274,
    "gaugeSource": {
      "id": "usgs-03217000",
      "provider": "usgs",
      "siteId": "03217000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "proxy",
      "siteName": "Tygarts Creek near Greenup, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/03217000/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "This is one of the longest public Kinniconick combinations and should be treated as an all-day shuttle with limited public bailout comfort.",
        "KDFWRs proxy ladder still applies, but a broad good band does not remove the fatigue and route-management consequences of a nearly 29-mile creek day.",
        "Low-water scraping, mud banks, fresh wood, and private banks remain the practical problems even when the gauge looks usable."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 2.5,
      "idealMax": 3.5,
      "tooLow": 2.5,
      "tooHigh": 3.5,
      "thresholdSource": {
        "label": "KDFWR Kinniconick Creek proxy gauge guidance",
        "url": "https://fw.ky.gov/Fish/Pages/Kinniconick_Creek.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "Spring through fall is the practical window. Longer Kinniconick combinations are most forgiving when the proxy gauge trend is steady rather than rising hard after rain or sliding toward the low floor during summer dryness.",
      "difficulty": "moderate",
      "difficultyNotes": "The water itself is generally easier than whitewater, but the route length, creek wood, muddy landings, and sparse public stop options make this a stronger commitment than a casual beginner float.",
      "confidenceNotes": "Confidence is good for a conservative Kentucky add: current KDFWR guidance still lists Leatherwood Branch Park Access to Puncheon / Pipe Lick at 13.1 miles, Puncheon / Pipe Lick to McDowells Creek Park Access at 14.1 miles, and McDowells Creek Park Access to Mill Pond Creek Access at 1.6 miles, supporting a 28.8-mile public chained route. KDFWR explicitly applies the Tygarts Creek proxy to Kinniconick and publishes official low/good/high stage and discharge bands on the same page. Current KDFWR access-detail pages still provide source-backed coordinates and public-use notes for Leatherwood Branch and Mill Pond Creek, and the official USGS legacy current page for 03217000 showed same-day values of 38.5 cfs and 2.80 ft at 2026-07-09 06:45 EDT during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official proxy level band",
        "value": "2.5-3.5 ft or 50-130 cfs good",
        "note": "KDFWR says no current stream gage is available for Kinniconick Creek and that Tygarts Creek should be used in lieu of Kinniconick because it closely mimics levels there. The same page rates Kinniconick low below 2.5 ft or 50 cfs, good from 2.5 to 3.5 ft or 50 to 130 cfs, and high above that.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Kinniconick_Creek.aspx"
      },
      {
        "label": "Chained public route segment",
        "value": "Leatherwood Branch Park Access to Mill Pond Creek Access, 28.8 miles",
        "note": "KDFWR lists Leatherwood Branch Park Access to Puncheon / Pipe Lick at 13.1 miles, Puncheon / Pipe Lick to McDowells Creek Park Access at 14.1 miles, and McDowells Creek Park Access to Mill Pond Creek Access at 1.6 miles, supporting a 28.8-mile public chained route.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Kinniconick_Creek.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Leatherwood Branch Park Access, 38.5105, -83.3274",
        "note": "KDFWR access detail identifies Leatherwood Branch Park Access as a public ramp with no listed camping support.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1130"
      },
      {
        "label": "Take-out access",
        "value": "Mill Pond Creek Access, 38.5882, -83.1919",
        "note": "KDFWR access detail identifies Mill Pond Creek Access as a public ramp with no listed camping support.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1128"
      },
      {
        "label": "Live proxy-gauge support",
        "value": "USGS 03217000 at 38.5 cfs / 2.80 ft",
        "note": "The official USGS legacy current page for Tygarts Creek near Greenup showed same-day values at 2026-07-09 06:45 EDT during this run, and the stage sits inside KDFWRs published Kinniconick good band even though discharge was below the cfs floor.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=03217000"
      },
      {
        "label": "Camping posture",
        "value": "No public camping documented at either endpoint",
        "note": "Current KDFWR access-detail pages list Camping as None for both Leatherwood Branch Park Access and Mill Pond Creek Access.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1128"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Kinniconick Creek",
        "url": "https://fw.ky.gov/Fish/Pages/Kinniconick_Creek.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Leatherwood Branch Park Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1130",
        "provider": "local"
      },
      {
        "label": "KDFWR Mill Pond Creek Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1128",
        "provider": "local"
      },
      {
        "label": "USGS 03217000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/03217000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03217000 legacy current page",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=03217000",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "kinniconick-creek-mcdowells-creek-mill-pond-creek",
    "slug": "kinniconick-creek-mcdowells-creek-mill-pond-creek",
    "name": "Kinniconick Creek",
    "reach": "McDowells Creek Park Access to Mill Pond Creek Access",
    "aliases": [
      "Kinniconick Creek - McDowells Creek to Mill Pond Creek",
      "Kinniconick Creek middle split",
      "KDFWR Kinniconick Creek access chain"
    ],
    "state": "Kentucky",
    "region": "Eastern Kentucky",
    "summary": "Short middle Kinniconick Creek split from McDowells Creek Park Access to Mill Pond Creek Access. KDFWR documents the exact 1.6-mile route segment and applies the same official Tygarts Creek proxy ladder to Kinniconick Creek.",
    "statusText": "Use the Tygarts Creek near Greenup gauge as the official Kinniconick proxy. KDFWR rates Kinniconick low below 2.5 ft or 50 cfs, good from 2.5 to 3.5 ft or 50 to 130 cfs, and high above that.",
    "latitude": 38.5746,
    "longitude": -83.1896,
    "gaugeSource": {
      "id": "usgs-03217000",
      "provider": "usgs",
      "siteId": "03217000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "proxy",
      "siteName": "Tygarts Creek near Greenup, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/03217000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "This is the shortest Kinniconick split now in the tree, but KDFWR still requires the same Tygarts Creek proxy because Kinniconick has no current direct stream gage.",
        "Short mileage does not remove creek hazards such as fresh wood, muddy landings, and quick rain response outside the official good band.",
        "McDowells Creek and Mill Pond are the intended public endpoints; do not treat nearby banks as general stopping or parking ground."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 2.5,
      "idealMax": 3.5,
      "tooLow": 2.5,
      "tooHigh": 3.5,
      "thresholdSource": {
        "label": "KDFWR Kinniconick Creek proxy gauge guidance",
        "url": "https://fw.ky.gov/Fish/Pages/Kinniconick_Creek.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "Spring through fall is the practical window. This short middle split is easiest to fit into a half day when the proxy gauge is steady, but even light rain can change the feel of a small Kentucky creek quickly.",
      "difficulty": "easy",
      "difficultyNotes": "This is an easier public Kinniconick segment than the longer chained options, but it still involves moving current, shoals, wood, muddy ramps, and private-bank discipline.",
      "confidenceNotes": "Confidence is good for a conservative Kentucky add: current KDFWR guidance still lists McDowells Creek Park Access to Mill Pond Creek Access at 1.6 miles, explicitly says no current stream gage exists on Kinniconick Creek, and directs paddlers to use Tygarts Creek because it closely mimics creek levels there. Current KDFWR access-detail pages still provide source-backed coordinates and public-use notes for McDowells Creek and Mill Pond Creek, and current USGS Water Services returned same-day proxy values of 128 cfs and 3.27 ft at 2026-07-14 13:45 EDT, both inside the official good band."
    },
    "evidenceNotes": [
      {
        "label": "Official proxy level band",
        "value": "2.5-3.5 ft or 50-130 cfs good",
        "note": "KDFWR says no current stream gage is available for Kinniconick Creek and that Tygarts Creek should be used in lieu of Kinniconick because it closely mimics levels there. The same page rates Kinniconick low below 2.5 ft or 50 cfs, good from 2.5 to 3.5 ft or 50 to 130 cfs, and high above that.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Kinniconick_Creek.aspx"
      },
      {
        "label": "Official route segment",
        "value": "McDowells Creek Park Access to Mill Pond Creek Access, 1.6 miles",
        "note": "KDFWR lists McDowells Creek Park Access to Mill Pond Creek Access as a 1.6-mile public route segment on the Kinniconick mileage table.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Kinniconick_Creek.aspx"
      },
      {
        "label": "Put-in access",
        "value": "McDowells Creek Park Access, 38.5746, -83.1896",
        "note": "KDFWR access detail identifies McDowells Creek Park Access as a public ramp with no listed camping support.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1129"
      },
      {
        "label": "Take-out access",
        "value": "Mill Pond Creek Access, 38.5882, -83.1919",
        "note": "KDFWR access detail identifies Mill Pond Creek Access as a public ramp with no listed camping support.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1128"
      },
      {
        "label": "Live proxy-gauge support",
        "value": "USGS 03217000 at 128 cfs / 3.27 ft",
        "note": "Current USGS Water Services returned same-day values at 2026-07-14 13:45 EDT for Tygarts Creek near Greenup, and both discharge and stage sit inside KDFWRs published Kinniconick good band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03217000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping posture",
        "value": "No public camping documented at either endpoint",
        "note": "Current KDFWR access-detail pages list Camping as None for both McDowells Creek Park Access and Mill Pond Creek Access.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1128"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Kinniconick Creek",
        "url": "https://fw.ky.gov/Fish/Pages/Kinniconick_Creek.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR McDowells Creek Park Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1129",
        "provider": "local"
      },
      {
        "label": "KDFWR Mill Pond Creek Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1128",
        "provider": "local"
      },
      {
        "label": "USGS 03217000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/03217000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03217000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03217000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "kinniconick-creek-mill-pond-creek-garrison",
    "slug": "kinniconick-creek-mill-pond-creek-garrison",
    "name": "Kinniconick Creek",
    "reach": "Mill Pond Creek Access to Garrison Ramp",
    "aliases": [
      "Kinniconick Creek - Mill Pond Creek to Garrison",
      "Kinniconick Creek lower split",
      "KDFWR Kinniconick Creek access chain"
    ],
    "state": "Kentucky",
    "region": "Eastern Kentucky",
    "summary": "Short lower Kinniconick Creek split from Mill Pond Creek Access to Garrison Ramp. KDFWR documents the exact 2.7-mile downstream public segment and applies the same official Tygarts Creek proxy ladder to the corridor.",
    "statusText": "Use the Tygarts Creek near Greenup gauge as the official Kinniconick proxy. KDFWR rates Kinniconick low below 2.5 ft or 50 cfs, good from 2.5 to 3.5 ft or 50 to 130 cfs, and high above that.",
    "latitude": 38.5882,
    "longitude": -83.1919,
    "gaugeSource": {
      "id": "usgs-03217000",
      "provider": "usgs",
      "siteId": "03217000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "proxy",
      "siteName": "Tygarts Creek near Greenup, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/03217000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "This short lower route still uses the same official proxy gauge because KDFWR says Kinniconick has no current direct stream gage.",
        "Fresh wood, muddy landings, and shoals still matter here even though the mileage is easier than the longer public combinations.",
        "Garrison is the intended public finish; do not drift below town looking for alternate informal exits."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 2.5,
      "idealMax": 3.5,
      "tooLow": 2.5,
      "tooHigh": 3.5,
      "thresholdSource": {
        "label": "KDFWR Kinniconick Creek proxy gauge guidance",
        "url": "https://fw.ky.gov/Fish/Pages/Kinniconick_Creek.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "Spring through fall is the practical window. This lower split is easier to squeeze into a short day than the long chained routes, but a small rain rise can still make the creek feel faster and woodier in a hurry.",
      "difficulty": "easy",
      "difficultyNotes": "This lower Kinniconick split is short and approachable compared with the longer public chains, but it still involves moving water, shoals, wood, muddy ramps, and private-bank limits.",
      "confidenceNotes": "Confidence is good for a conservative Kentucky add: current KDFWR guidance still lists Mill Pond Creek Access to Garrison Ramp at 2.7 miles, explicitly says no current stream gage exists on Kinniconick Creek, and directs paddlers to use Tygarts Creek because it closely mimics creek levels there. Current KDFWR access-detail pages still provide source-backed coordinates and public-use notes for Mill Pond Creek and Garrison, and current USGS Water Services returned same-day proxy values of 128 cfs and 3.27 ft at 2026-07-14 13:45 EDT, both inside the official good band."
    },
    "evidenceNotes": [
      {
        "label": "Official proxy level band",
        "value": "2.5-3.5 ft or 50-130 cfs good",
        "note": "KDFWR says no current stream gage is available for Kinniconick Creek and that Tygarts Creek should be used in lieu of Kinniconick because it closely mimics levels there. The same page rates Kinniconick low below 2.5 ft or 50 cfs, good from 2.5 to 3.5 ft or 50 to 130 cfs, and high above that.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Kinniconick_Creek.aspx"
      },
      {
        "label": "Official route segment",
        "value": "Mill Pond Creek Access to Garrison Ramp, 2.7 miles",
        "note": "KDFWR lists Mill Pond Creek Access to Garrison Ramp as a 2.7-mile public route segment on the Kinniconick mileage table.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Kinniconick_Creek.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Mill Pond Creek Access, 38.5882, -83.1919",
        "note": "KDFWR access detail identifies Mill Pond Creek Access as a public ramp with no listed camping support.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1128"
      },
      {
        "label": "Take-out access",
        "value": "Garrison Ramp, 38.6083, -83.1637",
        "note": "KDFWR access detail identifies Garrison Ramp as a public ramp with no listed camping support.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=318"
      },
      {
        "label": "Live proxy-gauge support",
        "value": "USGS 03217000 at 128 cfs / 3.27 ft",
        "note": "Current USGS Water Services returned same-day values at 2026-07-14 13:45 EDT for Tygarts Creek near Greenup, and both discharge and stage sit inside KDFWRs published Kinniconick good band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03217000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping posture",
        "value": "No public camping documented at either endpoint",
        "note": "Current KDFWR access-detail pages list Camping as None for both Mill Pond Creek Access and Garrison Ramp.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=318"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Kinniconick Creek",
        "url": "https://fw.ky.gov/Fish/Pages/Kinniconick_Creek.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Mill Pond Creek Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1128",
        "provider": "local"
      },
      {
        "label": "KDFWR Garrison Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=318",
        "provider": "local"
      },
      {
        "label": "USGS 03217000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/03217000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03217000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03217000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "kinniconick-creek-mcdowells-creek-garrison",
    "slug": "kinniconick-creek-mcdowells-creek-garrison",
    "name": "Kinniconick Creek",
    "reach": "McDowells Creek Park Access to Garrison Ramp",
    "aliases": [
      "Kinniconick Creek - McDowells Creek to Garrison",
      "Kinniconick Creek lower public chain",
      "KDFWR Kinniconick Creek access chain"
    ],
    "state": "Kentucky",
    "region": "Eastern Kentucky",
    "summary": "Shorter lower Kinniconick Creek run from McDowells Creek Park Access to Garrison Ramp. KDFWR documents the downstream public chain and applies the same official Tygarts Creek proxy ladder to Kinniconick Creek.",
    "statusText": "Use the Tygarts Creek near Greenup gauge as the official Kinniconick proxy. KDFWR rates Kinniconick low below 2.5 ft or 50 cfs, good from 2.5 to 3.5 ft or 50 to 130 cfs, and high above that.",
    "latitude": 38.5746,
    "longitude": -83.1896,
    "gaugeSource": {
      "id": "usgs-03217000",
      "provider": "usgs",
      "siteId": "03217000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "proxy",
      "siteName": "Tygarts Creek near Greenup, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/03217000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "Even this shorter lower route still uses the same official proxy gauge because KDFWR says Kinniconick has no current direct stream gage.",
        "The downstream mileage is shorter, but fresh wood, muddy landings, and private banks still matter when the creek is near the low floor or rising after rain.",
        "Garrison is the intended public finish; do not drift past the named take-out expecting better public access below town."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 2.5,
      "idealMax": 3.5,
      "tooLow": 2.5,
      "tooHigh": 3.5,
      "thresholdSource": {
        "label": "KDFWR Kinniconick Creek proxy gauge guidance",
        "url": "https://fw.ky.gov/Fish/Pages/Kinniconick_Creek.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "Spring through fall is the practical window. This shorter lower route is easier to finish in marginal water than the long chained options, but low water still exposes shoals and rain can quickly speed up the creek.",
      "difficulty": "easy",
      "difficultyNotes": "This lower Kinniconick segment is shorter and easier to manage than the long upstream combinations, but it still involves moving current, creek wood, muddy ramps, and private-bank discipline.",
      "confidenceNotes": "Confidence is good for a conservative Kentucky add: current KDFWR guidance still lists McDowells Creek Park Access to Mill Pond Creek Access at 1.6 miles and Mill Pond Creek Access to Garrison Ramp at 2.7 miles, supporting a 4.3-mile lower public route. KDFWR explicitly applies the Tygarts Creek proxy to Kinniconick and publishes official low/good/high stage and discharge bands on the same page. Current KDFWR access-detail pages still provide source-backed coordinates and public-use notes for McDowells Creek Park Access, Mill Pond Creek Access, and Garrison Ramp, and the official USGS legacy current page for 03217000 showed same-day values of 38.5 cfs and 2.80 ft at 2026-07-09 06:45 EDT during this run."
    },
    "evidenceNotes": [
      {
        "label": "Official proxy level band",
        "value": "2.5-3.5 ft or 50-130 cfs good",
        "note": "KDFWR says no current stream gage is available for Kinniconick Creek and that Tygarts Creek should be used in lieu of Kinniconick because it closely mimics levels there. The same page rates Kinniconick low below 2.5 ft or 50 cfs, good from 2.5 to 3.5 ft or 50 to 130 cfs, and high above that.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Kinniconick_Creek.aspx"
      },
      {
        "label": "Official route segment",
        "value": "McDowells Creek Park Access to Garrison Ramp, 4.3 miles",
        "note": "KDFWR lists McDowells Creek Park Access to Mill Pond Creek Access at 1.6 miles and Mill Pond Creek Access to Garrison Ramp at 2.7 miles, supporting a 4.3-mile lower public route.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Kinniconick_Creek.aspx"
      },
      {
        "label": "Put-in access",
        "value": "McDowells Creek Park Access, 38.5746, -83.1896",
        "note": "KDFWR access detail identifies McDowells Creek Park Access as a public ramp with no listed camping support.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1129"
      },
      {
        "label": "Take-out access",
        "value": "Garrison Ramp, 38.6083, -83.1637",
        "note": "KDFWR access detail identifies Garrison Ramp as a public ramp with no listed camping support.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=318"
      },
      {
        "label": "Live proxy-gauge support",
        "value": "USGS 03217000 at 38.5 cfs / 2.80 ft",
        "note": "The official USGS legacy current page for Tygarts Creek near Greenup showed same-day values at 2026-07-09 06:45 EDT during this run, and the stage sits inside KDFWRs published Kinniconick good band even though discharge was below the cfs floor.",
        "sourceUrl": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=03217000"
      },
      {
        "label": "Camping posture",
        "value": "No public camping documented at either endpoint",
        "note": "Current KDFWR access-detail pages list Camping as None for both McDowells Creek Park Access and Garrison Ramp.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=318"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Kinniconick Creek",
        "url": "https://fw.ky.gov/Fish/Pages/Kinniconick_Creek.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR McDowells Creek Park Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1129",
        "provider": "local"
      },
      {
        "label": "KDFWR Mill Pond Creek Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1128",
        "provider": "local"
      },
      {
        "label": "KDFWR Garrison Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=318",
        "provider": "local"
      },
      {
        "label": "USGS 03217000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/03217000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03217000 legacy current page",
        "url": "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=03217000",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "kinniconick-creek-leatherwood-branch-garrison",
    "slug": "kinniconick-creek-leatherwood-branch-garrison",
    "name": "Kinniconick Creek",
    "reach": "Leatherwood Branch Park Access to Garrison Ramp",
    "aliases": [
      "Kinniconick Creek - Leatherwood Branch to Garrison",
      "Kinniconick Creek full public chain",
      "KDFWR Kinniconick Creek access chain"
    ],
    "state": "Kentucky",
    "region": "Eastern Kentucky",
    "summary": "Full public Kinniconick Creek route from Leatherwood Branch Park Access to Garrison Ramp. KDFWR documents the exact chained public mileage and explicitly tells paddlers to use the Tygarts Creek gauge as the best current proxy for Kinniconick levels.",
    "statusText": "Use the Tygarts Creek near Greenup gauge as the official Kinniconick proxy. KDFWR rates Kinniconick low below 2.5 ft or 50 cfs, good from 2.5 to 3.5 ft or 50 to 130 cfs, and high above that.",
    "latitude": 38.5105,
    "longitude": -83.3274,
    "gaugeSource": {
      "id": "usgs-03217000",
      "provider": "usgs",
      "siteId": "03217000",
      "metric": "gage_height_ft",
      "unit": "ft",
      "kind": "proxy",
      "siteName": "Tygarts Creek near Greenup, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/03217000/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "This is the full public Kinniconick chain, so the main risk is commitment rather than technical whitewater: it is a very long creek day with limited public bailout comfort away from the named accesses.",
        "KDFWR still uses Tygarts Creek as a proxy because Kinniconick has no current direct stream gage, so treat any rising weather as a cue to re-check conditions rather than trusting the broad band blindly.",
        "Low-water scraping, muddy landings, fresh wood, and private banks become more consequential over thirty-plus miles than they do on the shorter downstream splits."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 2.5,
      "idealMax": 3.5,
      "tooLow": 2.5,
      "tooHigh": 3.5,
      "thresholdSource": {
        "label": "KDFWR Kinniconick Creek proxy gauge guidance",
        "url": "https://fw.ky.gov/Fish/Pages/Kinniconick_Creek.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "Spring through fall is the practical window. This full Kinniconick chain is most forgiving when the proxy gauge trend is steady. Summer dryness extends the day with more scraping, while fresh rain can quickly turn the creek into a faster woodier commitment.",
      "difficulty": "moderate",
      "difficultyNotes": "Kinniconick is not technical whitewater, but 31.5 miles of moving water with muddy accesses, shoals, wood, and sparse public stopping options makes this a serious endurance route.",
      "confidenceNotes": "Confidence is good for a conservative Kentucky add: current KDFWR guidance still lists Leatherwood Branch Park Access to Puncheon / Pipe Lick at 13.1 miles, Puncheon / Pipe Lick to McDowells Creek Park Access at 14.1 miles, McDowells Creek Park Access to Mill Pond Creek Access at 1.6 miles, and Mill Pond Creek Access to Garrison Ramp at 2.7 miles, supporting a 31.5-mile public chained route. KDFWR explicitly says no current stream gage exists on Kinniconick Creek and that Tygarts Creek should be used in lieu of Kinniconick because it closely mimics levels there, while the same page publishes official low/good/high stage and discharge bands. Current KDFWR access-detail pages still provide source-backed coordinates and public-use notes for Leatherwood Branch Park Access and Garrison Ramp, and USGS Water Services returned same-day values of 42.6 cfs and 2.83 ft at 2026-07-09 07:45 EDT for direct gauge 03217000."
    },
    "evidenceNotes": [
      {
        "label": "Official proxy level band",
        "value": "2.5-3.5 ft or 50-130 cfs good",
        "note": "KDFWR says no current stream gage is available for Kinniconick Creek and that Tygarts Creek should be used in lieu of Kinniconick because it closely mimics levels there. The same page rates Kinniconick low below 2.5 ft or 50 cfs, good from 2.5 to 3.5 ft or 50 to 130 cfs, and high above that.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Kinniconick_Creek.aspx"
      },
      {
        "label": "Chained public route segment",
        "value": "Leatherwood Branch Park Access to Garrison Ramp, 31.5 miles",
        "note": "KDFWR lists Leatherwood Branch Park Access to Puncheon / Pipe Lick at 13.1 miles, Puncheon / Pipe Lick to McDowells Creek Park Access at 14.1 miles, McDowells Creek Park Access to Mill Pond Creek Access at 1.6 miles, and Mill Pond Creek Access to Garrison Ramp at 2.7 miles, supporting a 31.5-mile public full-chain float.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Kinniconick_Creek.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Leatherwood Branch Park Access, 38.5105, -83.3274",
        "note": "KDFWR access detail identifies Leatherwood Branch Park Access as a public park launch with a paved parking area and no listed camping support.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1130"
      },
      {
        "label": "Take-out access",
        "value": "Garrison Ramp, 38.6083, -83.1637",
        "note": "KDFWR access detail identifies Garrison Ramp as a public paved ramp with parking and no listed camping support.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=318"
      },
      {
        "label": "Live proxy-gauge support",
        "value": "USGS 03217000 at 42.6 cfs / 2.83 ft",
        "note": "USGS Water Services returned same-day values at 2026-07-09 07:45 EDT for Tygarts Creek near Greenup during this run. The stage sits inside KDFWRs published Kinniconick good band even though discharge remains below the cfs floor.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03217000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping posture",
        "value": "No public camping documented at either endpoint",
        "note": "Current KDFWR access-detail pages list Camping as None for both Leatherwood Branch Park Access and Garrison Ramp.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1130"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Kinniconick Creek",
        "url": "https://fw.ky.gov/Fish/Pages/Kinniconick_Creek.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Leatherwood Branch Park Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1130",
        "provider": "local"
      },
      {
        "label": "KDFWR Garrison Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=318",
        "provider": "local"
      },
      {
        "label": "USGS 03217000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/03217000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03217000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03217000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "upper-cumberland-river-varilla-4-mile",
    "slug": "upper-cumberland-river-varilla-4-mile",
    "name": "Upper Cumberland River",
    "reach": "Varilla Ramp to 4 Mile Ramp",
    "aliases": [
      "Upper Cumberland River - Varilla to 4 Mile",
      "Upper Cumberland River above Pineville",
      "Cumberland River - Varilla Ramp to 4 Mile Ramp"
    ],
    "state": "Kentucky",
    "region": "Daniel Boone Country",
    "summary": "Upper-Cumberland riffle-and-run float from Varilla Ramp to 4 Mile Ramp above Pineville. KDFWR lists this exact 13.8-mile segment and uses the Williamsburg gauge for the full Upper Cumberland corridor.",
    "statusText": "Use the Cumberland River at Williamsburg gauge. KDFWR rates the corridor low below 300 cfs or 3.0 ft, good from 300 to 700 cfs or 3.0 to 3.8 ft, and high above that.",
    "latitude": 36.7447,
    "longitude": -83.6103,
    "gaugeSource": {
      "id": "usgs-03404000",
      "provider": "usgs",
      "siteId": "03404000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Cumberland River at Williamsburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03404000/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "low_head_dam",
        "mandatory_takeout",
        "fast_rise",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "KDFWR says a low-head dam sits about three-quarters of a mile downstream of 4 Mile Ramp, so the public ramp is a mandatory take-out rather than an optional stop.",
        "This upper corridor has riffles and shallow push even at normal flows, and fresh rain can raise the river quickly.",
        "Services are sparse away from the named ramps, so treat it like a committed point-to-point float rather than a roadside creek lap."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 300,
      "idealMax": 700,
      "tooLow": 300,
      "tooHigh": 700,
      "thresholdSource": {
        "label": "KDFWR Upper Cumberland recommended Williamsburg flow band",
        "url": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This upper Cumberland segment is most straightforward when the Williamsburg gauge sits inside the official KDFWR good band. Dry spells expose more riffles, while storms can turn the route into a fast push well before the finish ramp.",
      "difficulty": "moderate",
      "difficultyNotes": "The route is mostly moving Class I-style current, but it is long enough to require planning and the low-head-dam hard stop below 4 Mile means paddlers cannot drift casually past the official take-out.",
      "confidenceNotes": "Confidence is good for a guarded add: KDFWR lists Varilla Ramp to 4 Mile Ramp as an exact 13.8-mile Upper Cumberland segment, publishes the official Williamsburg low/good/high ladder, and KDFWR access-detail pages provide source-backed coordinates for both ramps. Same-day USGS Water Services returned 1,130 cfs and 4.38 ft at 2026-07-03 02:00 EDT for the direct Williamsburg gauge, which keeps the live path current while honestly marking a high-water day."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Varilla Ramp to 4 Mile Ramp, 13.8 mi",
        "note": "KDFWR lists this exact upstream Upper Cumberland site-to-site mileage.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx"
      },
      {
        "label": "Official level band",
        "value": "300-700 cfs or 3.0-3.8 ft good",
        "note": "KDFWR rates the Williamsburg gauge as Low below 300 cfs or 3.0 ft, Good from 300 to 700 cfs or 3.0 to 3.8 ft, and High above that.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Varilla Ramp, 36.7447, -83.6103",
        "note": "KDFWR access detail confirms a public concrete ramp with small gravel parking east of Pineville.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=895"
      },
      {
        "label": "Take-out access",
        "value": "4 Mile Ramp, 36.7930, -83.7534",
        "note": "KDFWR access detail confirms a public ramp under the US-25E bridge north of Pineville.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=891"
      },
      {
        "label": "Mandatory take-out hazard",
        "value": "Low-head dam about 0.75 mi below 4 Mile Ramp",
        "note": "KDFWR explicitly warns that a low-head dam sits downstream of 4 Mile Ramp, making the ramp the required finish for this route.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03404000 at 1130 cfs / 4.38 ft",
        "note": "USGS Water Services returned same-day values for Cumberland River at Williamsburg, KY at 2026-07-03 02:00 EDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03404000&parameterCd=00060,00065&siteStatus=all"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Upper Cumberland River",
        "url": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Varilla Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=895",
        "provider": "local"
      },
      {
        "label": "KDFWR 4 Mile Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=891",
        "provider": "local"
      },
      {
        "label": "USGS 03404000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03404000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03404000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03404000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "upper-cumberland-river-4-mile-artemus",
    "slug": "upper-cumberland-river-4-mile-artemus",
    "name": "Upper Cumberland River",
    "reach": "4 Mile Ramp to Artemus Rock Access",
    "aliases": [
      "Upper Cumberland River - 4 Mile to Artemus",
      "Cumberland River - 4 Mile Ramp to Artemus Rock Access",
      "Upper Cumberland River Pineville to Artemus float"
    ],
    "state": "Kentucky",
    "region": "Daniel Boone Country",
    "summary": "Upper Cumberland day float from 4 Mile Ramp to Artemus Rock Access north of Pineville. KDFWR lists this exact 9.8-mile segment and uses the Williamsburg gauge for the full corridor.",
    "statusText": "Use the Cumberland River at Williamsburg gauge. KDFWR rates the corridor low below 300 cfs or 3.0 ft, good from 300 to 700 cfs or 3.0 to 3.8 ft, and high above that.",
    "latitude": 36.793,
    "longitude": -83.7534,
    "gaugeSource": {
      "id": "usgs-03404000",
      "provider": "usgs",
      "siteId": "03404000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Cumberland River at Williamsburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03404000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "KDFWR describes mild rapids through the Upper Cumberland corridor, and this reach gets noticeably pushier after rain.",
        "Artemus is a rough gravel-bar access that may be muddy or unsuitable for some vehicles, so scout the take-out before committing the shuttle.",
        "Most banks between the named accesses are private, so plan breaks around the official endpoints rather than improvised stops."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 300,
      "idealMax": 700,
      "tooLow": 300,
      "tooHigh": 700,
      "thresholdSource": {
        "label": "KDFWR Upper Cumberland recommended Williamsburg flow band",
        "url": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This mid-corridor Upper Cumberland segment is easiest when the official Williamsburg gauge stays inside the KDFWR good band. Low water exposes more shallow riffles, while rain can turn the run into a faster push than the mileage suggests.",
      "difficulty": "easy",
      "difficultyNotes": "The route is short enough for a normal day float, but moving current, wood after storms, and the rough Artemus landing keep it above flatwater-touring difficulty.",
      "confidenceNotes": "Confidence is good for a conservative add: KDFWR lists 4 Mile Ramp to Artemus Rock Access as an exact 9.8-mile Upper Cumberland segment, publishes the official Williamsburg low/good/high ladder on the same corridor page, and KDFWR access-detail pages provide source-backed coordinates and access notes for both endpoints. Same-day USGS Water Services returned 1,010 cfs and 4.20 ft at 2026-07-03 18:00 EDT for the direct Williamsburg gauge, which keeps the live path current while honestly marking a high-water day."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "4 Mile Ramp to Artemus Rock Access, 9.8 mi",
        "note": "KDFWR lists this exact Upper Cumberland site-to-site mileage.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx"
      },
      {
        "label": "Official level band",
        "value": "300-700 cfs or 3.0-3.8 ft good",
        "note": "KDFWR rates the Williamsburg gauge as Low below 300 cfs or 3.0 ft, Good from 300 to 700 cfs or 3.0 to 3.8 ft, and High above that.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx"
      },
      {
        "label": "Put-in access",
        "value": "4 Mile Ramp, 36.7930, -83.7534",
        "note": "KDFWR access detail confirms the public ramp under the US-25E bridge north of Pineville.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=891"
      },
      {
        "label": "Take-out access",
        "value": "Artemus Rock Access, 36.8240, -83.8440",
        "note": "KDFWR access detail confirms the public gravel-bar take-out south of Artemus and warns that it can be rough and muddy.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1184"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03404000 at 1010 cfs / 4.20 ft",
        "note": "USGS Water Services returned same-day values for Cumberland River at Williamsburg, KY at 2026-07-03 18:00 EDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03404000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping posture",
        "value": "No documented public camping at either endpoint",
        "note": "KDFWR access detail for 4 Mile lists camping as None, and Artemus is documented as a rough access rather than an overnight facility.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=891"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Upper Cumberland River",
        "url": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR 4 Mile Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=891",
        "provider": "local"
      },
      {
        "label": "KDFWR Artemus Rock Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1184",
        "provider": "local"
      },
      {
        "label": "USGS 03404000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03404000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03404000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03404000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "upper-cumberland-river-varilla-artemus",
    "slug": "upper-cumberland-river-varilla-artemus",
    "name": "Upper Cumberland River",
    "reach": "Varilla Ramp to Artemus Rock Access",
    "aliases": [
      "Upper Cumberland River - Varilla to Artemus",
      "Cumberland River - Varilla Ramp to Artemus Rock Access",
      "Upper Cumberland River long upper corridor"
    ],
    "state": "Kentucky",
    "region": "Daniel Boone Country",
    "summary": "Long Upper Cumberland corridor from Varilla Ramp to Artemus Rock Access above Barbourville. KDFWR lists the public chain as Varilla to 4 Mile at 13.8 miles plus 4 Mile to Artemus at 9.8 miles, supporting this about 23.6-mile combination on the official Williamsburg gauge ladder.",
    "statusText": "Use the Cumberland River at Williamsburg gauge. KDFWR rates the corridor low below 300 cfs or 3.0 ft, good from 300 to 700 cfs or 3.0 to 3.8 ft, and high above that.",
    "latitude": 36.7447,
    "longitude": -83.6103,
    "gaugeSource": {
      "id": "usgs-03404000",
      "provider": "usgs",
      "siteId": "03404000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Cumberland River at Williamsburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03404000/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "This is a long committed upper-river day, and KDFWR says the corridor carries mild rapids that get pushier quickly after rain.",
        "Artemus is a rough gravel-bar finish that may be muddy or unsuitable for some vehicles, so shuttle scouting matters before you launch at Varilla.",
        "Services are sparse and most banks are private, so treat this as a genuine point-to-point commitment rather than a route with casual midstream exits."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 300,
      "idealMax": 700,
      "tooLow": 300,
      "tooHigh": 700,
      "thresholdSource": {
        "label": "KDFWR Upper Cumberland recommended Williamsburg flow band",
        "url": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This longer Upper Cumberland combination is most straightforward when the official Williamsburg gauge stays inside the KDFWR good band. Low water extends the day with more scraping on riffles, while rain can turn the route into a long fast push with few comfortable recovery options.",
      "difficulty": "moderate",
      "difficultyNotes": "The individual rapids are mild, but the long mileage, private-bank corridor, and rough Artemus take-out make this a more serious commitment than the shorter Upper Cumberland splits.",
      "confidenceNotes": "Confidence is good for a guarded add: KDFWR lists Varilla Ramp to 4 Mile Ramp as 13.8 miles and 4 Mile Ramp to Artemus Rock Access as 9.8 miles on the same official Upper Cumberland corridor page, which supports this about 23.6-mile public combination against the same Williamsburg low/good/high ladder. KDFWR access-detail pages provide source-backed coordinates and access notes for Varilla, 4 Mile, and Artemus, and same-day USGS Water Services returned 1,010 cfs and 4.20 ft at 2026-07-03 18:00 EDT for the direct Williamsburg gauge, honestly placing the route above the official good band today."
    },
    "evidenceNotes": [
      {
        "label": "Official route chain",
        "value": "Varilla -> 4 Mile 13.8 mi plus 4 Mile -> Artemus 9.8 mi",
        "note": "KDFWR lists both public site-to-site mileages on the Upper Cumberland corridor page, supporting this about 23.6-mile combination.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx"
      },
      {
        "label": "Official level band",
        "value": "300-700 cfs or 3.0-3.8 ft good",
        "note": "KDFWR rates the Williamsburg gauge as Low below 300 cfs or 3.0 ft, Good from 300 to 700 cfs or 3.0 to 3.8 ft, and High above that.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Varilla Ramp, 36.7447, -83.6103",
        "note": "KDFWR access detail confirms a public concrete ramp with small gravel parking east of Pineville.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=895"
      },
      {
        "label": "Take-out access",
        "value": "Artemus Rock Access, 36.8240, -83.8440",
        "note": "KDFWR access detail confirms the rough gravel-bar access south of Artemus and warns that muddy conditions can affect launch or recovery.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1184"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03404000 at 1010 cfs / 4.20 ft",
        "note": "USGS Water Services returned same-day values for Cumberland River at Williamsburg, KY at 2026-07-03 18:00 EDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03404000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping posture",
        "value": "No documented public camping at Varilla, 4 Mile, or Artemus",
        "note": "KDFWR access detail lists camping as None at Varilla and 4 Mile, and Artemus is documented as a rough access rather than an overnight facility.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=895"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Upper Cumberland River",
        "url": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Varilla Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=895",
        "provider": "local"
      },
      {
        "label": "KDFWR Artemus Rock Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1184",
        "provider": "local"
      },
      {
        "label": "USGS 03404000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03404000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03404000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03404000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "upper-cumberland-river-varilla-barbourville",
    "slug": "upper-cumberland-river-varilla-barbourville",
    "name": "Upper Cumberland River",
    "reach": "Varilla Ramp to Barbourville Ramp",
    "aliases": [
      "Upper Cumberland River - Varilla to Barbourville",
      "Cumberland River - Varilla Ramp to Barbourville Ramp",
      "Upper Cumberland River full upper corridor"
    ],
    "state": "Kentucky",
    "region": "Daniel Boone Country",
    "summary": "Full upper-corridor Upper Cumberland route from Varilla Ramp to Barbourville Ramp at Thompson Park. KDFWR lists the public chain as Varilla to 4 Mile at 13.8 miles, 4 Mile to Artemus at 9.8 miles, and Artemus to Barbourville at 5.1 miles, supporting this 28.7-mile combination on the official Williamsburg gauge ladder.",
    "statusText": "Use the Cumberland River at Williamsburg gauge. KDFWR rates the corridor low below 300 cfs or 3.0 ft, good from 300 to 700 cfs or 3.0 to 3.8 ft, and high above that.",
    "latitude": 36.7447,
    "longitude": -83.6103,
    "gaugeSource": {
      "id": "usgs-03404000",
      "provider": "usgs",
      "siteId": "03404000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Cumberland River at Williamsburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03404000/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "This is a long committed Upper Cumberland day, and KDFWR says the corridor carries mild rapids that get pushier quickly after rain.",
        "Artemus sits mid-corridor as a rough gravel-bar access that may be muddy or awkward, so it is not a casual bailout if conditions deteriorate.",
        "Most banks outside the named accesses are private and services are sparse, so treat this as a genuine point-to-point commitment rather than a casual float with easy exits."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 300,
      "idealMax": 700,
      "tooLow": 300,
      "tooHigh": 700,
      "thresholdSource": {
        "label": "KDFWR Upper Cumberland recommended Williamsburg flow band",
        "url": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This full upper-corridor combination is most straightforward when the official Williamsburg gauge stays inside the KDFWR good band. Low water extends the day with more scraping on riffles, while rain can turn the route into a long fast push with few comfortable recovery options.",
      "difficulty": "moderate",
      "difficultyNotes": "The individual rapids are mild, but the long mileage, private-bank corridor, and rough mid-corridor Artemus landing make this a serious day rather than a casual float.",
      "confidenceNotes": "Confidence is good for a guarded add: KDFWR lists Varilla Ramp to 4 Mile Ramp as 13.8 miles, 4 Mile Ramp to Artemus Rock Access as 9.8 miles, and Artemus Rock Access to Barbourville Ramp as 5.1 miles on the same official Upper Cumberland corridor page, which supports this 28.7-mile public combination against the same Williamsburg low/good/high ladder. KDFWR access-detail pages provide source-backed coordinates and access notes for Varilla, Artemus, and Barbourville, and same-day USGS Water Services returned 1,070 cfs and 4.29 ft at 2026-07-09 14:00 EDT for the direct Williamsburg gauge, honestly placing the route above the official good band today."
    },
    "evidenceNotes": [
      {
        "label": "Official route chain",
        "value": "Varilla -> 4 Mile 13.8 mi plus 4 Mile -> Artemus 9.8 mi plus Artemus -> Barbourville 5.1 mi",
        "note": "KDFWR lists all three public site-to-site mileages on the Upper Cumberland corridor page, supporting this 28.7-mile combination.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx"
      },
      {
        "label": "Official level band",
        "value": "300-700 cfs or 3.0-3.8 ft good",
        "note": "KDFWR rates the Williamsburg gauge as Low below 300 cfs or 3.0 ft, Good from 300 to 700 cfs or 3.0 to 3.8 ft, and High above that.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Varilla Ramp, 36.7447, -83.6103",
        "note": "KDFWR access detail confirms a public concrete ramp with small gravel parking east of Pineville.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=895"
      },
      {
        "label": "Take-out access",
        "value": "Barbourville Ramp, 36.8603, -83.8893",
        "note": "KDFWR access detail confirms the public Thompson Park ramp with paved parking and park amenities.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1067"
      },
      {
        "label": "Camping support",
        "value": "Thompson Park RV campground with full hookups",
        "note": "KDFWR says the Barbourville ramp sits in Thompson Park, which includes an RV campground with full hookups.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03404000 at 1070 cfs / 4.29 ft",
        "note": "USGS Water Services returned same-day values for Cumberland River at Williamsburg, KY at 2026-07-09 14:00 EDT during this run, above the official good band.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03404000&parameterCd=00060,00065&siteStatus=all"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Upper Cumberland River",
        "url": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Varilla Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=895",
        "provider": "local"
      },
      {
        "label": "KDFWR Barbourville Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1067",
        "provider": "local"
      },
      {
        "label": "USGS 03404000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03404000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03404000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03404000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "upper-cumberland-river-artemus-barbourville",
    "slug": "upper-cumberland-river-artemus-barbourville",
    "name": "Upper Cumberland River",
    "reach": "Artemus Rock Access to Barbourville Ramp",
    "aliases": [
      "Upper Cumberland River - Artemus to Barbourville",
      "Cumberland River - Artemus Rock Access to Barbourville Ramp",
      "Upper Cumberland River Knox County short float"
    ],
    "state": "Kentucky",
    "region": "Daniel Boone Country",
    "summary": "Short Upper Cumberland day from Artemus Rock Access to Barbourville Ramp at Thompson Park. KDFWR lists this exact 5.1-mile segment and ties it to the same official Williamsburg gauge ladder used for the broader corridor.",
    "statusText": "Use the Cumberland River at Williamsburg gauge. KDFWR rates the corridor low below 300 cfs or 3.0 ft, good from 300 to 700 cfs or 3.0 to 3.8 ft, and high above that.",
    "latitude": 36.824,
    "longitude": -83.844,
    "gaugeSource": {
      "id": "usgs-03404000",
      "provider": "usgs",
      "siteId": "03404000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Cumberland River at Williamsburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03404000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "KDFWR says the Barbourville reach can form several small rapids during low flow, and rain can quickly add push even though the mileage is short.",
        "Artemus is a rough gravel-bar access that may be muddy or unsuitable for some vehicles, so scout shuttle logistics before committing the run.",
        "Most banks between the named accesses are private, so plan breaks around the official endpoints rather than improvised bars."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 300,
      "idealMax": 700,
      "tooLow": 300,
      "tooHigh": 700,
      "thresholdSource": {
        "label": "KDFWR Upper Cumberland recommended Williamsburg flow band",
        "url": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This short Knox County segment is easiest when the official Williamsburg gauge stays inside the KDFWR good band. Low water exposes more riffles, while rain can make the route noticeably quicker and less forgiving.",
      "difficulty": "easy",
      "difficultyNotes": "The route is short and public-access backed, but the gravel-bar launch, shallow rapids at lower levels, and moving current after rain mean it is still a real river float rather than flatwater touring.",
      "confidenceNotes": "Confidence is good for a conservative add: KDFWR lists Artemus Rock Access to Barbourville Ramp as an exact 5.1-mile Upper Cumberland segment, uses the official Williamsburg gauge ladder for the corridor, and the current KDFWR access-detail pages provide source-backed coordinates for both endpoints. Same-day USGS Water Services returned 1,130 cfs and 4.38 ft at 2026-07-03 02:00 EDT for Cumberland River at Williamsburg, KY, which keeps the live path current while honestly marking a higher-than-good day."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Artemus Rock Access to Barbourville Ramp, 5.1 mi",
        "note": "KDFWR lists this exact Upper Cumberland site-to-site mileage.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx"
      },
      {
        "label": "Official level band",
        "value": "300-700 cfs or 3.0-3.8 ft good",
        "note": "KDFWR rates the Williamsburg gauge as Low below 300 cfs or 3.0 ft, Good from 300 to 700 cfs or 3.0 to 3.8 ft, and High above that.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Artemus Rock Access, 36.8240, -83.8440",
        "note": "KDFWR access detail confirms the public gravel-bar access south of Artemus and warns that the path can be rough and muddy.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1184"
      },
      {
        "label": "Take-out access",
        "value": "Barbourville Ramp, 36.8603, -83.8893",
        "note": "KDFWR access detail confirms the public Thompson Park ramp with paved parking and other park amenities.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1067"
      },
      {
        "label": "Camping support",
        "value": "Thompson Park RV campground with full hookups",
        "note": "KDFWR says the Barbourville ramp sits in Thompson Park, which includes an RV campground with full hookups.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03404000 at 1130 cfs / 4.38 ft",
        "note": "USGS Water Services returned same-day values for Cumberland River at Williamsburg, KY at 2026-07-03 02:00 EDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03404000&parameterCd=00060,00065&siteStatus=all"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Upper Cumberland River",
        "url": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Artemus Rock Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1184",
        "provider": "local"
      },
      {
        "label": "KDFWR Barbourville Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1067",
        "provider": "local"
      },
      {
        "label": "USGS 03404000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03404000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03404000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03404000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "upper-cumberland-river-4-mile-barbourville",
    "slug": "upper-cumberland-river-4-mile-barbourville",
    "name": "Upper Cumberland River",
    "reach": "4 Mile Ramp to Barbourville Ramp",
    "aliases": [
      "Upper Cumberland River - 4 Mile to Barbourville",
      "Cumberland River - 4 Mile Ramp to Barbourville Ramp",
      "Upper Cumberland River Pineville to Thompson Park"
    ],
    "state": "Kentucky",
    "region": "Daniel Boone Country",
    "summary": "Mid-length Upper Cumberland float from 4 Mile Ramp to Barbourville Ramp at Thompson Park. KDFWR lists the public chain as 4 Mile to Artemus at 9.8 miles plus Artemus to Barbourville at 5.1 miles, supporting this about 14.9-mile combination on the official Williamsburg gauge ladder.",
    "statusText": "Use the Cumberland River at Williamsburg gauge. KDFWR rates the corridor low below 300 cfs or 3.0 ft, good from 300 to 700 cfs or 3.0 to 3.8 ft, and high above that.",
    "latitude": 36.793,
    "longitude": -83.7534,
    "gaugeSource": {
      "id": "usgs-03404000",
      "provider": "usgs",
      "siteId": "03404000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Cumberland River at Williamsburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03404000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "strainers",
        "private_banks"
      ],
      "safetyNotes": [
        "KDFWR says the Barbourville reach can form small rapids at lower water, and the whole Upper Cumberland corridor rises quickly after rain.",
        "The route passes the rough Artemus access mid-corridor, but paddlers should not treat it as an effortless bailout because the landing can be muddy and awkward.",
        "Most banks outside the named accesses are private, so the clean public finish remains Thompson Park in Barbourville."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 300,
      "idealMax": 700,
      "tooLow": 300,
      "tooHigh": 700,
      "thresholdSource": {
        "label": "KDFWR Upper Cumberland recommended Williamsburg flow band",
        "url": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This combined Upper Cumberland segment is easiest when the official Williamsburg gauge stays inside the KDFWR good band. Below that, shallow riffles and shoals lengthen the day; above it, the run becomes a quicker downstream push into Barbourville.",
      "difficulty": "moderate",
      "difficultyNotes": "The route is longer than the short Artemus split and still includes moving current, possible wood, and a rough mid-corridor access, so it deserves more planning than a simple in-town float.",
      "confidenceNotes": "Confidence is good for a conservative add: KDFWR lists 4 Mile Ramp to Artemus Rock Access as 9.8 miles and Artemus Rock Access to Barbourville Ramp as 5.1 miles on the same official Upper Cumberland corridor page, which supports this about 14.9-mile public combination on the published Williamsburg low/good/high ladder. KDFWR access-detail pages provide source-backed coordinates and access notes for 4 Mile, Artemus, and Barbourville, and same-day USGS Water Services returned 1,010 cfs and 4.20 ft at 2026-07-03 18:00 EDT for the direct Williamsburg gauge, honestly indicating a high-water day."
    },
    "evidenceNotes": [
      {
        "label": "Official route chain",
        "value": "4 Mile -> Artemus 9.8 mi plus Artemus -> Barbourville 5.1 mi",
        "note": "KDFWR lists both public site-to-site mileages on the Upper Cumberland corridor page, supporting this about 14.9-mile combination.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx"
      },
      {
        "label": "Official level band",
        "value": "300-700 cfs or 3.0-3.8 ft good",
        "note": "KDFWR rates the Williamsburg gauge as Low below 300 cfs or 3.0 ft, Good from 300 to 700 cfs or 3.0 to 3.8 ft, and High above that.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx"
      },
      {
        "label": "Put-in access",
        "value": "4 Mile Ramp, 36.7930, -83.7534",
        "note": "KDFWR access detail confirms the public ramp under the US-25E bridge north of Pineville.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=891"
      },
      {
        "label": "Take-out access",
        "value": "Barbourville Ramp, 36.8603, -83.8893",
        "note": "KDFWR access detail confirms the public Thompson Park ramp with paved parking and park amenities.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1067"
      },
      {
        "label": "Camping support",
        "value": "Thompson Park RV campground with full hookups",
        "note": "KDFWR says the Barbourville ramp sits in Thompson Park, which includes an RV campground with full hookups.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03404000 at 1010 cfs / 4.20 ft",
        "note": "USGS Water Services returned same-day values for Cumberland River at Williamsburg, KY at 2026-07-03 18:00 EDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03404000&parameterCd=00060,00065&siteStatus=all"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Upper Cumberland River",
        "url": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR 4 Mile Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=891",
        "provider": "local"
      },
      {
        "label": "KDFWR Barbourville Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1067",
        "provider": "local"
      },
      {
        "label": "USGS 03404000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03404000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03404000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03404000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "upper-cumberland-river-williamsburg-redbird",
    "slug": "upper-cumberland-river-williamsburg-redbird",
    "name": "Upper Cumberland River",
    "reach": "Williamsburg Ramp to Redbird Ramp",
    "aliases": [
      "Upper Cumberland River - Williamsburg to Redbird",
      "Cumberland River - Williamsburg Ramp to Redbird Ramp",
      "Upper Cumberland River Whitley County float"
    ],
    "state": "Kentucky",
    "region": "Daniel Boone Country",
    "summary": "Mid-length Upper Cumberland float from Williamsburg Ramp to Redbird Ramp west of town. KDFWR lists this exact 11.5-mile segment and uses the Williamsburg gauge as the official corridor reference.",
    "statusText": "Use the Cumberland River at Williamsburg gauge. KDFWR rates the corridor low below 300 cfs or 3.0 ft, good from 300 to 700 cfs or 3.0 to 3.8 ft, and high above that.",
    "latitude": 36.7452,
    "longitude": -84.158,
    "gaugeSource": {
      "id": "usgs-03404000",
      "provider": "usgs",
      "siteId": "03404000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Cumberland River at Williamsburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03404000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "KDFWR describes mild rapids throughout the Upper Cumberland corridor, and this downstream Williamsburg reach can become pushy quickly after rain.",
        "The run is simple enough at normal water, but it still passes through a more isolated river corridor than the town launch suggests at the start.",
        "Use Redbird Ramp as the planned finish and do not assume bridge approaches or private banks farther downstream are normal public exits."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 300,
      "idealMax": 700,
      "tooLow": 300,
      "tooHigh": 700,
      "thresholdSource": {
        "label": "KDFWR Upper Cumberland recommended Williamsburg flow band",
        "url": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This route is most approachable when the official Williamsburg gauge is inside the KDFWR good band. At lower water, shoals and riffles get scratchier; at higher water, the long downstream push gets quicker and less forgiving.",
      "difficulty": "moderate",
      "difficultyNotes": "The mileage is manageable for a day float, but the current is still lively enough that weather, wood, and group self-rescue matter more than on a flatwater reservoir paddle.",
      "confidenceNotes": "Confidence is good for a conservative add: KDFWR lists Williamsburg Ramp to Redbird Ramp as an exact 11.5-mile Upper Cumberland segment, publishes the official Williamsburg low/good/high ladder on the same corridor page, and KDFWR access-detail pages provide source-backed coordinates for both ramps. Same-day USGS Water Services returned 1,130 cfs and 4.38 ft at 2026-07-03 02:00 EDT for the direct gauge at Williamsburg, which keeps the live path current while honestly indicating a high-water day relative to the official band."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Williamsburg Ramp to Redbird Ramp, 11.5 mi",
        "note": "KDFWR lists this exact downstream Upper Cumberland site-to-site mileage.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx"
      },
      {
        "label": "Official level band",
        "value": "300-700 cfs or 3.0-3.8 ft good",
        "note": "KDFWR rates the Williamsburg gauge as Low below 300 cfs or 3.0 ft, Good from 300 to 700 cfs or 3.0 to 3.8 ft, and High above that.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Williamsburg Ramp, 36.7452, -84.1580",
        "note": "KDFWR access detail confirms the public concrete ramp by the Main Street Bridge and Cumberland Falls Highway in Williamsburg.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=664"
      },
      {
        "label": "Take-out access",
        "value": "Redbird Ramp, 36.7621, -84.2216",
        "note": "KDFWR access detail confirms the public Redbird concrete ramp northwest of Williamsburg with paved parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=904"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03404000 at 1130 cfs / 4.38 ft",
        "note": "USGS Water Services returned same-day values for Cumberland River at Williamsburg, KY at 2026-07-03 02:00 EDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03404000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Access character",
        "value": "Concrete public ramps at both endpoints",
        "note": "KDFWR describes Williamsburg and Redbird as public concrete ramps with parking, which keeps the shuttle straightforward even though the river corridor feels more isolated once downstream of town.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Upper Cumberland River",
        "url": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Williamsburg Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=664",
        "provider": "local"
      },
      {
        "label": "KDFWR Redbird Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=904",
        "provider": "local"
      },
      {
        "label": "USGS 03404000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03404000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03404000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03404000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "upper-cumberland-river-williamsburg-longbottom",
    "slug": "upper-cumberland-river-williamsburg-longbottom",
    "name": "Upper Cumberland River",
    "reach": "Williamsburg Ramp to Long Bottom Access",
    "aliases": [
      "Upper Cumberland River - Williamsburg to Long Bottom",
      "Cumberland River - Williamsburg Ramp to Long Bottom Access",
      "Upper Cumberland River gorge continuation"
    ],
    "state": "Kentucky",
    "region": "Daniel Boone Country",
    "routeType": "whitewater",
    "summary": "Longer Williamsburg-start Upper Cumberland continuation that finishes at Long Bottom Access above Cumberland Falls. The route uses the same direct Williamsburg gauge as the shorter town-to-Redbird card, but the Long Bottom gorge finish makes the stricter upstream Cumberland Falls flow band the better overall scoring model.",
    "statusText": "Use the Cumberland River at Williamsburg gauge. KDFWR says 500 to 1,100 cfs is best for the upstream gorge, lower water can mean dragging, and flows up to 2,000 cfs are challenging for skilled paddlers only.",
    "latitude": 36.7452,
    "longitude": -84.158,
    "gaugeSource": {
      "id": "usgs-03404000",
      "provider": "usgs",
      "siteId": "03404000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Cumberland River at Williamsburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03404000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "whitewater",
        "fast_rise",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "This route adds the remote gorge miles below Redbird, so it is not just a longer version of the easier Williamsburg float.",
        "KDFWR says the final road approach to Long Bottom is extremely rugged and best suited to high-clearance four-wheel-drive vehicles.",
        "The current same-day gauge on this run is above the official 2,000 cfs skilled-paddler ceiling, so treat present conditions as too high rather than merely sporty."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 500,
      "idealMax": 1100,
      "tooLow": 500,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "KDFWR Cumberland River recommended Williamsburg flow band",
        "url": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This longer Williamsburg-start gorge route is most defensible when the official Williamsburg gauge is in or near the upstream Cumberland Falls band. Dry spells expose shoals, while storms can quickly turn the Long Bottom finish into a much more committed day.",
      "difficulty": "moderate",
      "difficultyNotes": "The route begins with the easier Williamsburg miles, but the downstream half adds gorge shoals, remote character, and a rough carry-down finish that make it a moving-water commitment rather than a casual day float.",
      "confidenceNotes": "Confidence is good for a guarded add: KDFWR lists Williamsburg Ramp to Redbird Ramp as 11.5 miles on the Upper Cumberland page, and the current Cumberland River route map adds Redbird to Long Bottom at 9.0 miles, supporting this 20.5-mile public continuation. KDFWR access-detail pages provide source-backed coordinates for Williamsburg and Long Bottom, and USGS Water Services returned 3,150 cfs and 6.86 ft at 2026-07-14 17:00 EDT for the direct Williamsburg gauge, which keeps the live path fresh while clearly showing a too-high day relative to the official gorge band."
    },
    "evidenceNotes": [
      {
        "label": "Official route segments",
        "value": "Williamsburg to Redbird 11.5 mi plus Redbird to Long Bottom 9.0 mi",
        "note": "KDFWR lists Williamsburg Ramp to Redbird Ramp on the Upper Cumberland page, and the current Cumberland River route map publishes Redbird to Long Bottom as 9.0 miles.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx"
      },
      {
        "label": "Official level band",
        "value": "500-1100 cfs best; up to 2000 cfs challenging",
        "note": "KDFWR says the upstream Cumberland Falls corridor is best from 500 to 1,100 cfs, with higher water up to 2,000 cfs for skilled paddlers only.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Williamsburg Ramp, 36.7452, -84.1580",
        "note": "KDFWR access detail confirms the public concrete Williamsburg launch beside the Main Street Bridge.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=664"
      },
      {
        "label": "Take-out access",
        "value": "Long Bottom Access, 36.7772, -84.3455",
        "note": "KDFWR access detail confirms Long Bottom as a public carry-down access and the route page warns the final road approach is extremely rugged.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=665"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03404000 at 3150 cfs / 6.86 ft",
        "note": "USGS Water Services returned same-day values for Cumberland River at Williamsburg, KY at 2026-07-14 17:00 EDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03404000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping support",
        "value": "Primitive float-camping banks downstream of Bee Shoals",
        "note": "KDFWR says float campers use the banks downstream of Bee Shoals on this corridor.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Upper Cumberland River",
        "url": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Cumberland River",
        "url": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Cumberland River detailed map",
        "url": "https://fw.ky.gov/Education/Documents/bluewatertrailcumberlandriver-1.pdf",
        "provider": "local"
      },
      {
        "label": "KDFWR Williamsburg Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=664",
        "provider": "local"
      },
      {
        "label": "KDFWR Long Bottom Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=665",
        "provider": "local"
      },
      {
        "label": "USGS 03404000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03404000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03404000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03404000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "upper-cumberland-river-williamsburg-thunderstruck",
    "slug": "upper-cumberland-river-williamsburg-thunderstruck",
    "name": "Upper Cumberland River",
    "reach": "Williamsburg Ramp to Thunderstruck Ramp",
    "aliases": [
      "Upper Cumberland River - Williamsburg to Thunderstruck",
      "Cumberland River - Williamsburg Ramp to Thunderstruck Ramp",
      "Upper Cumberland River full first gorge section"
    ],
    "state": "Kentucky",
    "region": "Daniel Boone Country",
    "routeType": "whitewater",
    "summary": "Williamsburg-start continuation that runs through Redbird and the first full upstream Cumberland Falls float to Thunderstruck Ramp. The direct gauge remains the same Williamsburg station, but this full gorge section should be scored on the stricter KDFWR upstream Cumberland Falls band rather than the easier town-only segment.",
    "statusText": "Use the Cumberland River at Williamsburg gauge. KDFWR says 500 to 1,100 cfs is best for the upstream gorge, lower water can mean dragging, and flows up to 2,000 cfs are challenging for skilled paddlers only.",
    "latitude": 36.7452,
    "longitude": -84.158,
    "gaugeSource": {
      "id": "usgs-03404000",
      "provider": "usgs",
      "siteId": "03404000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Cumberland River at Williamsburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03404000/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "whitewater",
        "fast_rise",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "This route keeps the easier Williamsburg launch but finishes in the same remote mild-whitewater gorge used by the Redbird to Thunderstruck run.",
        "KDFWR says Long Bottom and Mouth of Indian Creek are not dependable normal exits because those roads are extremely rough.",
        "The current same-day gauge on this run is above the official 2,000 cfs skilled-paddler ceiling, so present conditions are well outside the band used for a normal recommendation."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 500,
      "idealMax": 1100,
      "tooLow": 500,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "KDFWR Cumberland River recommended Williamsburg flow band",
        "url": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This longer Williamsburg-start gorge route is best when the Williamsburg gauge is inside the KDFWR upstream-of-the-falls band. Dry spells expose more shoals, while storms can turn the Redbird-to-Thunderstruck half into a much firmer-water day quickly.",
      "difficulty": "moderate",
      "difficultyNotes": "The upper town miles are straightforward, but the gorge half adds shoals, mild whitewater, remoteness, and limited bailout comfort that make this a serious moving-water route.",
      "confidenceNotes": "Confidence is good for a guarded add: KDFWR lists Williamsburg Ramp to Redbird Ramp as 11.5 miles on the Upper Cumberland page, and the current Cumberland River route page still supports Redbird to Thunderstruck at about 11 miles. KDFWR access-detail pages provide source-backed coordinates for Williamsburg and Thunderstruck, and USGS Water Services returned 3,150 cfs and 6.86 ft at 2026-07-14 17:00 EDT for the direct Williamsburg gauge, which keeps the live path fresh while clearly showing a too-high day relative to the official gorge band."
    },
    "evidenceNotes": [
      {
        "label": "Official route segments",
        "value": "Williamsburg to Redbird 11.5 mi plus Redbird to Thunderstruck about 11 mi",
        "note": "KDFWR lists Williamsburg Ramp to Redbird Ramp on the Upper Cumberland page, and the current Cumberland River route page and map support Redbird to Thunderstruck as the first official upstream Cumberland Falls float.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx"
      },
      {
        "label": "Official level band",
        "value": "500-1100 cfs best; up to 2000 cfs challenging",
        "note": "KDFWR says the upstream Cumberland Falls corridor is best from 500 to 1,100 cfs, with higher water up to 2,000 cfs for skilled paddlers only.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Williamsburg Ramp, 36.7452, -84.1580",
        "note": "KDFWR access detail confirms the public concrete Williamsburg launch beside the Main Street Bridge.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=664"
      },
      {
        "label": "Take-out access",
        "value": "Thunderstruck Ramp, 36.8077, -84.3546",
        "note": "KDFWR access detail confirms Thunderstruck as a public ramp with unpaved parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=893"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03404000 at 3150 cfs / 6.86 ft",
        "note": "USGS Water Services returned same-day values for Cumberland River at Williamsburg, KY at 2026-07-14 17:00 EDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03404000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping support",
        "value": "Primitive float-camping banks downstream of Bee Shoals",
        "note": "KDFWR says float campers use the banks downstream of Bee Shoals on this route.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Upper Cumberland River",
        "url": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Cumberland River",
        "url": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Cumberland River detailed map",
        "url": "https://fw.ky.gov/Education/Documents/bluewatertrailcumberlandriver-1.pdf",
        "provider": "local"
      },
      {
        "label": "KDFWR Williamsburg Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=664",
        "provider": "local"
      },
      {
        "label": "KDFWR Thunderstruck Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=893",
        "provider": "local"
      },
      {
        "label": "USGS 03404000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03404000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03404000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03404000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "upper-cumberland-river-williamsburg-cumberland-falls",
    "slug": "upper-cumberland-river-williamsburg-cumberland-falls",
    "name": "Upper Cumberland River",
    "reach": "Williamsburg Ramp to Cumberland Falls Carrydown",
    "aliases": [
      "Upper Cumberland River - Williamsburg to Cumberland Falls",
      "Cumberland River - Williamsburg Ramp to Cumberland Falls Carrydown",
      "Upper Cumberland River full gorge planner"
    ],
    "state": "Kentucky",
    "region": "Daniel Boone Country",
    "routeType": "whitewater",
    "summary": "Full Williamsburg-start Upper Cumberland planner route to Cumberland Falls Carrydown. It combines the easier town launch, the remote Redbird and Thunderstruck gorge sections, and the mandatory take-out above the falls under one direct Williamsburg gauge and one clearly advanced safety story.",
    "statusText": "Use the Cumberland River at Williamsburg gauge. KDFWR says 500 to 1,100 cfs is best for the upstream gorge, lower water can mean dragging, and flows up to 2,000 cfs are challenging for skilled paddlers only. Missing the right-bank take-out above Cumberland Falls is not acceptable.",
    "latitude": 36.7452,
    "longitude": -84.158,
    "gaugeSource": {
      "id": "usgs-03404000",
      "provider": "usgs",
      "siteId": "03404000",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Cumberland River at Williamsburg, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/USGS-03404000/"
    },
    "safetyProfile": {
      "riskLevel": "advanced",
      "hazards": [
        "whitewater",
        "mandatory_takeout",
        "fast_rise",
        "private_banks",
        "remote"
      ],
      "safetyNotes": [
        "This route combines the full Redbird and Thunderstruck gorge sections and ends at the mandatory right-bank take-out above Cumberland Falls.",
        "KDFWR says paddlers must work right before the KY 90 bridge and take out at the falls parking/carrydown area because missing the finish leads toward the 68-foot falls.",
        "The current same-day gauge on this run is above the official 2,000 cfs skilled-paddler ceiling, so present conditions are too high for a normal recommendation."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 500,
      "idealMax": 1100,
      "tooLow": 500,
      "tooHigh": 2000,
      "thresholdSource": {
        "label": "KDFWR Cumberland River recommended Williamsburg flow band",
        "url": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
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
      "seasonNotes": "This full Williamsburg-start gorge route is most defensible when the Williamsburg gauge is in or near the upstream Cumberland Falls band and weather is stable. Rain can quickly raise the difficulty and make the final mandatory take-out far less forgiving.",
      "difficulty": "hard",
      "difficultyNotes": "The route combines a long moving-water day, remote gorge shoals, mild whitewater, the downstream rapid sequence, and a mandatory take-out above Cumberland Falls.",
      "confidenceNotes": "Confidence is good for a guarded add: KDFWR lists Williamsburg Ramp to Redbird Ramp as 11.5 miles on the Upper Cumberland page, and the current Cumberland River route map publishes Redbird to Long Bottom at 9.0 miles, Long Bottom to Thunderstruck at 2.5 miles, and Thunderstruck to Cumberland Falls at 5.1 miles, supporting this 28.1-mile public continuation. KDFWR access-detail pages provide source-backed coordinates for Williamsburg and Cumberland Falls, and USGS Water Services returned 3,150 cfs and 6.86 ft at 2026-07-14 17:00 EDT for the direct Williamsburg gauge, which keeps the live path fresh while clearly showing a too-high day relative to the official gorge band."
    },
    "evidenceNotes": [
      {
        "label": "Official route segments",
        "value": "Williamsburg to Redbird 11.5 mi plus Redbird to Cumberland Falls 16.6 mi",
        "note": "KDFWR lists Williamsburg Ramp to Redbird Ramp on the Upper Cumberland page, and the current Cumberland River route map supports Redbird to Cumberland Falls as 16.6 miles by chaining the named public accesses.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx"
      },
      {
        "label": "Mandatory take-out warning",
        "value": "Work right and take out below the KY 90 bridge",
        "note": "KDFWR says paddlers must work to the right and take out at the public falls parking/carrydown area because the current otherwise leads toward Cumberland Falls.",
        "sourceUrl": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Williamsburg Ramp, 36.7452, -84.1580",
        "note": "KDFWR access detail confirms the public concrete Williamsburg launch beside the Main Street Bridge.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=664"
      },
      {
        "label": "Take-out access",
        "value": "Cumberland Falls Carrydown, 36.8421, -84.3435",
        "note": "KDFWR access detail confirms Cumberland Falls as a public carrydown with paved parking, seasonal camping, and year-round lodging at the state resort park.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=987"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03404000 at 3150 cfs / 6.86 ft",
        "note": "USGS Water Services returned same-day values for Cumberland River at Williamsburg, KY at 2026-07-14 17:00 EDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03404000&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Camping support",
        "value": "Primitive Bee Shoals float-camping plus Cumberland Falls campground/lodging",
        "note": "KDFWR says float campers use the banks downstream of Bee Shoals on this corridor, and the Cumberland Falls access detail lists seasonal camping and year-round lodging at the state resort park.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=987"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Upper Cumberland River",
        "url": "https://fw.ky.gov/Fish/Pages/Upper_Cumberland.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Cumberland River",
        "url": "https://fw.ky.gov/Education/Pages/Cumberland-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Cumberland River detailed map",
        "url": "https://fw.ky.gov/Education/Documents/bluewatertrailcumberlandriver-1.pdf",
        "provider": "local"
      },
      {
        "label": "KDFWR Williamsburg Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=664",
        "provider": "local"
      },
      {
        "label": "KDFWR Cumberland Falls Carrydown",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=987",
        "provider": "local"
      },
      {
        "label": "USGS 03404000 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/USGS-03404000/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03404000 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03404000&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "barren-river-martinsville-potter-combs",
    "slug": "barren-river-martinsville-potter-combs",
    "name": "Barren River",
    "reach": "Martinsville Ford / Claypool Ramp to Potter/Combs Ramp",
    "aliases": [
      "Barren River - Martinsville Ford to Potter/Combs",
      "Lower Barren River long middle float",
      "Barren River Claypool to Weldon Pete Park"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Long lower-Barren route from Martinsville Ford / Claypool Ramp to Potter/Combs Ramp at Weldon Pete Park. KDFWR lists this exact 24-mile segment and ties it to the direct Bowling Green gauge with official 350 to 700 cfs good-flow guidance.",
    "statusText": "Use the Barren River at Bowling Green gauge. KDFWR rates 350 to 700 cfs as good, below that as low, and above that as high for boating and fishing on this downstream lower-Barren corridor.",
    "latitude": 36.9134,
    "longitude": -86.2293,
    "gaugeSource": {
      "id": "usgs-03314500",
      "provider": "usgs",
      "siteId": "03314500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Barren River at Bowling Green, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/03314500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "This is a long broad-river day with limited legal stopping options away from the named accesses.",
        "KDFWR says Potter/Combs sits above a dam-influenced pooled section, so stay with the named take-out and do not drift downstream assuming the route stays casual.",
        "Low water can turn a 24-mile day into a much longer commitment."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 350,
      "idealMax": 700,
      "tooLow": 350,
      "tooHigh": 700,
      "thresholdSource": {
        "label": "KDFWR recommended Bowling Green flow band",
        "url": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "This long lower-Barren segment is best in spring and wetter fall periods when the Bowling Green gauge is in or near the official good band. Summer lows can slow the route dramatically.",
      "difficulty": "moderate",
      "difficultyNotes": "The current is usually straightforward, but the 24-mile length, mixed shoals and pools, and downstream park take-out make this a serious endurance day rather than a casual after-work float.",
      "confidenceNotes": "Confidence is good for a conservative add: KDFWR lists Martinsville Ford / Claypool Ramp to Potter/Combs Ramp as an exact 24.0-mile lower-Barren segment, publishes both endpoint coordinates, and gives official Bowling Green flow guidance of Low below 350 cfs, Good from 350 to 700 cfs, and High above 700 cfs. Same-day USGS Water Services returned 185 cfs at 2026-06-25 20:45 CDT, which keeps the live path current while honestly indicating a low-water day."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Martinsville Ford / Claypool Ramp to Potter/Combs Ramp, 24.0 mi",
        "note": "KDFWR lists this exact downstream lower-Barren site-to-site mileage.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "350-700 cfs good",
        "note": "KDFWR rates the Barren River at Bowling Green gauge as Low below 350 cfs, Good from 350 to 700 cfs, and High above 700 cfs.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Martinsville Ford / Claypool Ramp, 36.9134, -86.2293",
        "note": "KDFWR access detail confirms a public ramp with year-round availability and parking along the ford crossing.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=624"
      },
      {
        "label": "Take-out access",
        "value": "Potter/Combs Ramp, 37.0027, -86.4184",
        "note": "KDFWR access detail confirms Potter/Combs Ramp at Weldon Pete Park as a public ramp with year-round availability.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=628"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03314500 at 185 cfs / 3.81 ft",
        "note": "USGS Water Services returned same-day values for Barren River at Bowling Green, KY at 2026-06-25 20:45 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03314500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Downstream take-out character",
        "value": "Weldon Pete Park ramp above pooled dam section",
        "note": "KDFWR says Potter/Combs is a concrete ramp in Weldon Pete Park and notes a dam 0.6 miles downstream that deepens the river near the take-out.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Lower Barren River",
        "url": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Martinsville Ford / Claypool Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=624",
        "provider": "local"
      },
      {
        "label": "KDFWR Potter/Combs Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=628",
        "provider": "local"
      },
      {
        "label": "USGS 03314500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/03314500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03314500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03314500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "barren-river-state-street-beech-bend",
    "slug": "barren-river-state-street-beech-bend",
    "name": "Barren River",
    "reach": "State Street Bridge Access to Beech Bend Campground Ramp",
    "aliases": [
      "Barren River - State Street to Beech Bend",
      "Lower Barren River camper segment",
      "Barren River pedestrian bridge to campground ramp"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Short lower-Barren route from State Street Bridge Access to Beech Bend Campground Ramp. KDFWR lists this exact 3.1-mile segment and ties it to the direct Bowling Green gauge, but the downstream campground ramp is only for registered campers.",
    "statusText": "Use the Barren River at Bowling Green gauge. KDFWR rates 350 to 700 cfs as good, below that as low, and above that as high for boating and fishing on this downstream lower-Barren corridor.",
    "latitude": 37.0017,
    "longitude": -86.4296,
    "gaugeSource": {
      "id": "usgs-03314500",
      "provider": "usgs",
      "siteId": "03314500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Barren River at Bowling Green, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/03314500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "This route only works if your group can legally use the Beech Bend campground ramp. KDFWR says the ramp and bank access are for registered campers only.",
        "State Street sits below the pedestrian bridge in a broad city reach. Stay with the named downstream landing rather than assuming informal banks are public.",
        "High water can quicken the otherwise easy corridor and make the campground landing less forgiving."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 350,
      "idealMax": 700,
      "tooLow": 350,
      "tooHigh": 700,
      "thresholdSource": {
        "label": "KDFWR recommended Bowling Green flow band",
        "url": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "This short lower-Barren segment is most straightforward when the Bowling Green gauge is in or near the official good band. Low summer water can slow the shoals, while storm pulses make the broad city reach pushier than it first appears.",
      "difficulty": "easy",
      "difficultyNotes": "The route is short and mostly flatwater, but it still requires a legal Beech Bend campground landing plan and basic judgment around changing current.",
      "confidenceNotes": "Confidence is good for a conservative add with an explicit access restriction: KDFWR lists State Street Bridge Access to Beech Bend Park as an exact 3.1-mile lower-Barren segment, publishes the official Bowling Green low/good/high flow ladder, and the Beech Bend access-detail page still documents the campground ramp coordinates plus the registered-campers-only rule. Same-day USGS Water Services returned 732 cfs and 5.23 ft at 2026-07-15 17:45 CDT for direct gauge 03314500, which keeps the live path current while honestly putting the river just above the official good band."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "State Street Bridge Access to Beech Bend Park, 3.1 mi",
        "note": "KDFWR lists this exact site-to-site mileage on the Lower Barren River page.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "350-700 cfs good",
        "note": "KDFWR rates the Barren River at Bowling Green gauge as Low below 350 cfs, Good from 350 to 700 cfs, and High above 700 cfs.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "State Street Bridge Access, 37.0017, -86.4296",
        "note": "KDFWR access detail confirms a public gravel ramp below the pedestrian bridge suitable for canoes and kayaks.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1071"
      },
      {
        "label": "Take-out access",
        "value": "Beech Bend Campground Ramp, 37.0192, -86.3933",
        "note": "KDFWR access detail confirms the paved campground ramp coordinates and says fishing access and the ramp are for registered campers only.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=627"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03314500 at 732 cfs / 5.23 ft",
        "note": "USGS Water Services returned same-day values for Barren River at Bowling Green, KY at 2026-07-15 17:45 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03314500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Access restriction",
        "value": "Beech Bend ramp is registered-campers-only",
        "note": "KDFWR repeats that the Beech Bend boat ramps and bank access are only available to registered campers.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Lower Barren River",
        "url": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR State Street Bridge Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1071",
        "provider": "local"
      },
      {
        "label": "KDFWR Beech Bend Campground Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=627",
        "provider": "local"
      },
      {
        "label": "USGS 03314500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/03314500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03314500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03314500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "barren-river-beech-bend-james-r-hines",
    "slug": "barren-river-beech-bend-james-r-hines",
    "name": "Barren River",
    "reach": "Beech Bend Campground Ramp to James R. Hines Boat Landing Ramp",
    "aliases": [
      "Barren River - Beech Bend to James R. Hines",
      "Lower Barren River campground-to-landing segment",
      "Barren River Beech Bend to Boat Landing Road"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Lower-Barren route from Beech Bend Campground Ramp to James R. Hines Boat Landing Ramp. KDFWR lists this exact 4.6-mile segment and ties it to the direct Bowling Green gauge, but the put-in is restricted to registered campers.",
    "statusText": "Use the Barren River at Bowling Green gauge. KDFWR rates 350 to 700 cfs as good, below that as low, and above that as high for boating and fishing on this downstream lower-Barren corridor.",
    "latitude": 37.0192,
    "longitude": -86.3933,
    "gaugeSource": {
      "id": "usgs-03314500",
      "provider": "usgs",
      "siteId": "03314500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Barren River at Bowling Green, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/03314500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "This route only works if you have legal Beech Bend campground access. KDFWR says the ramp and bank fishing area are for registered campers only.",
        "The river is usually straightforward here, but broad current and private banks still make mid-route exits unreliable.",
        "Above-band flows deserve more caution at the campground launch and downstream landing than the short mileage suggests."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 350,
      "idealMax": 700,
      "tooLow": 350,
      "tooHigh": 700,
      "thresholdSource": {
        "label": "KDFWR recommended Bowling Green flow band",
        "url": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "This campground-start lower-Barren segment is best when the Bowling Green gauge is in or near the official good band. Higher water can speed up the broad pools, while low summer water can still slow the day around shoals.",
      "difficulty": "easy",
      "difficultyNotes": "The route is short and mostly forgiving, but it assumes legal campground access at the put-in and basic moving-water judgment when the river rises.",
      "confidenceNotes": "Confidence is good for a conservative add with an explicit access caveat: KDFWR lists Beech Bend Park to James R. Hines Boat Landing Ramp as an exact 4.6-mile lower-Barren segment, publishes the official Bowling Green flow ladder, and still documents both endpoint coordinates. The Beech Bend access-detail page continues to state that the ramp is for registered campers only. Same-day USGS Water Services returned 732 cfs and 5.23 ft at 2026-07-15 17:45 CDT for direct gauge 03314500, which keeps the live path current while placing the river slightly above the official good band."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Beech Bend Park to James R. Hines Boat Landing Ramp, 4.6 mi",
        "note": "KDFWR lists this exact downstream lower-Barren site-to-site mileage.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "350-700 cfs good",
        "note": "KDFWR rates the Barren River at Bowling Green gauge as Low below 350 cfs, Good from 350 to 700 cfs, and High above 700 cfs.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Beech Bend Campground Ramp, 37.0192, -86.3933",
        "note": "KDFWR access detail confirms the paved campground ramp coordinates and says fishing access and the ramp are for registered campers only.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=627"
      },
      {
        "label": "Take-out access",
        "value": "James R. Hines Boat Landing Ramp, 37.0161, -86.4449",
        "note": "KDFWR access detail for Boat Landing Road Ramp confirms a public paved ramp with parking at the downstream landing.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=625"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03314500 at 732 cfs / 5.23 ft",
        "note": "USGS Water Services returned same-day values for Barren River at Bowling Green, KY at 2026-07-15 17:45 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03314500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Access restriction",
        "value": "Beech Bend ramp is registered-campers-only",
        "note": "KDFWR says the Beech Bend ramp and bank fishing area are only available to registered campers.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=627"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Lower Barren River",
        "url": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Beech Bend Campground Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=627",
        "provider": "local"
      },
      {
        "label": "KDFWR James R. Hines / Boat Landing Road Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=625",
        "provider": "local"
      },
      {
        "label": "USGS 03314500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/03314500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03314500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03314500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "barren-river-beech-bend-lonnie-white",
    "slug": "barren-river-beech-bend-lonnie-white",
    "name": "Barren River",
    "reach": "Beech Bend Campground Ramp to Lonnie White Boat Ramp",
    "aliases": [
      "Barren River - Beech Bend to Lonnie White",
      "Lower Barren River camper continuation",
      "Barren River campground ramp to Thomas Landing"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Longer lower-Barren route from Beech Bend Campground Ramp to Lonnie White Boat Ramp at Thomas Landing. KDFWR lists the exact Beech Bend-to-James R. Hines and James R. Hines-to-Lonnie White mileages, which combine into an 11.3-mile downstream route tied to the direct Bowling Green gauge, with the same registered-campers-only restriction at Beech Bend.",
    "statusText": "Use the Barren River at Bowling Green gauge. KDFWR rates 350 to 700 cfs as good, below that as low, and above that as high for boating and fishing on this downstream lower-Barren corridor.",
    "latitude": 37.0192,
    "longitude": -86.3933,
    "gaugeSource": {
      "id": "usgs-03314500",
      "provider": "usgs",
      "siteId": "03314500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Barren River at Bowling Green, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/03314500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "This route requires legal Beech Bend campground use at the put-in. KDFWR says the ramp and bank access there are for registered campers only.",
        "The downstream Thomas Landing finish is pooled by Lock and Dam 1 influence, so the final miles can feel slower and more wind-exposed than the distance first suggests.",
        "Most shoreline between the named ramps is private. Plan on a full point-to-point day without informal bailout assumptions."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 350,
      "idealMax": 700,
      "tooLow": 350,
      "tooHigh": 700,
      "thresholdSource": {
        "label": "KDFWR recommended Bowling Green flow band",
        "url": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "This campground-start lower-Barren continuation is most defensible when the Bowling Green gauge is in or near the official good band. Above-band days quicken the route, while summer lows can still make the pooled finish drag.",
      "difficulty": "moderate",
      "difficultyNotes": "The current is usually uncomplicated, but the 11.3-mile length, campground-access restriction, and slower pooled Thomas Landing finish make this a full planned day rather than a casual short float.",
      "confidenceNotes": "Confidence is good for a conservative add with a documented access restriction: KDFWR lists Beech Bend Park to James R. Hines Boat Landing Ramp as 4.6 miles and James R. Hines Boat Landing Ramp to Lonnie White Ramp as 6.7 miles, supporting this 11.3-mile downstream route. KDFWR still documents the Beech Bend campground ramp coordinates and registered-campers-only rule, Lonnie White remains an official public ramp, and same-day USGS Water Services returned 732 cfs and 5.23 ft at 2026-07-15 17:45 CDT for direct gauge 03314500, which keeps the live path current while placing the river above the official good band."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "Beech Bend Park to Lonnie White Ramp, about 11.3 mi",
        "note": "KDFWR lists Beech Bend to James R. Hines as 4.6 miles and James R. Hines to Lonnie White as 6.7 miles, which combine into this downstream route.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "350-700 cfs good",
        "note": "KDFWR rates the Barren River at Bowling Green gauge as Low below 350 cfs, Good from 350 to 700 cfs, and High above 700 cfs.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "Beech Bend Campground Ramp, 37.0192, -86.3933",
        "note": "KDFWR access detail confirms the paved campground ramp coordinates and says fishing access and the ramp are for registered campers only.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=627"
      },
      {
        "label": "Take-out access",
        "value": "Lonnie White Boat Ramp, 37.0348, -86.4984",
        "note": "KDFWR access detail confirms Lonnie White / Thomas Landing as a public ramp with gravel parking and dusk-close park context.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=729"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03314500 at 732 cfs / 5.23 ft",
        "note": "USGS Water Services returned same-day values for Barren River at Bowling Green, KY at 2026-07-15 17:45 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03314500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Access restriction",
        "value": "Beech Bend ramp is registered-campers-only",
        "note": "KDFWR says the Beech Bend ramp and bank fishing area are only available to registered campers.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=627"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Lower Barren River",
        "url": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR Beech Bend Campground Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=627",
        "provider": "local"
      },
      {
        "label": "KDFWR Lonnie White Boat Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=729",
        "provider": "local"
      },
      {
        "label": "USGS 03314500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/03314500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03314500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03314500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "barren-river-state-street-james-r-hines",
    "slug": "barren-river-state-street-james-r-hines",
    "name": "Barren River",
    "reach": "State Street Bridge Access to James R. Hines Boat Landing Ramp",
    "aliases": [
      "Barren River - State Street to James R. Hines",
      "Lower Barren River downtown combo",
      "Barren River pedestrian bridge to Boat Landing Road"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Mid-length lower-Barren city route from State Street Bridge Access to James R. Hines Boat Landing Ramp. KDFWR lists the exact State Street-to-Beech Bend and Beech Bend-to-James R. Hines mileages, which combine into a defensible 7.7-mile public route tied to the direct Bowling Green gauge.",
    "statusText": "Use the Barren River at Bowling Green gauge. KDFWR rates 350 to 700 cfs as good, below that as low, and above that as high for boating and fishing on this downstream lower-Barren corridor.",
    "latitude": 37.0017,
    "longitude": -86.4296,
    "gaugeSource": {
      "id": "usgs-03314500",
      "provider": "usgs",
      "siteId": "03314500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Barren River at Bowling Green, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/03314500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "KDFWR treats Beech Bend as a midpoint park access for registered campers only, not a normal public shuttle endpoint for this route.",
        "This urban-edge corridor still has broad current, bridge areas, and limited legal stopping options away from the named accesses.",
        "Low water can expose shoals and slow the day more than the mileage suggests."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 350,
      "idealMax": 700,
      "tooLow": 350,
      "tooHigh": 700,
      "thresholdSource": {
        "label": "KDFWR recommended Bowling Green flow band",
        "url": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "This lower-Barren city-edge segment is best when the Bowling Green gauge is in or near the official good band. Summer low water can slow the route, while storms can make the broad bends and landings pushier than they first appear.",
      "difficulty": "easy",
      "difficultyNotes": "The route is mostly straightforward moving flatwater, but the 7.7-mile length, bridge current, broad pools, and private-bank limits make it more than a casual park drift.",
      "confidenceNotes": "Confidence is good for a conservative add: KDFWR lists State Street Bridge Access to Beech Bend Park as 3.1 miles and Beech Bend Park to James R. Hines Boat Landing Ramp as 4.6 miles, publishes the official Bowling Green low/good/high flow ladder for the corridor, and provides public endpoint coordinates for both State Street and James R. Hines / Boat Landing Road. Same-day USGS Water Services returned 198 cfs and 3.85 ft at 2026-07-03 00:45 CDT for direct gauge 03314500, which keeps the live path current while honestly indicating a low-water day."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "State Street Bridge Access to James R. Hines Boat Landing Ramp, about 7.7 mi",
        "note": "KDFWR lists State Street to Beech Bend as 3.1 miles and Beech Bend to James R. Hines as 4.6 miles, which combine into this public downstream route.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "350-700 cfs good",
        "note": "KDFWR rates the Barren River at Bowling Green gauge as Low below 350 cfs, Good from 350 to 700 cfs, and High above 700 cfs.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "State Street Bridge Access, 37.0017, -86.4296",
        "note": "KDFWR access detail confirms a public gravel ramp below the pedestrian bridge suitable for canoes and kayaks.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1071"
      },
      {
        "label": "Take-out access",
        "value": "James R. Hines Boat Landing Ramp, 37.0161, -86.4449",
        "note": "KDFWR access detail for Boat Landing Road Ramp matches the James R. Hines Boat Landing Park endpoint named on the Lower Barren page and confirms a public paved ramp with parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=625"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03314500 at 198 cfs / 3.85 ft",
        "note": "USGS Water Services returned same-day values for Barren River at Bowling Green, KY at 2026-07-03 00:45 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03314500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Mid-route access rule",
        "value": "Beech Bend access is registered-campers-only",
        "note": "KDFWR says the Beech Bend boat ramps and bank access are only available to registered campers, so this route should rely on State Street and James R. Hines as the normal public endpoints.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Lower Barren River",
        "url": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR State Street Bridge Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1071",
        "provider": "local"
      },
      {
        "label": "KDFWR James R. Hines / Boat Landing Road Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=625",
        "provider": "local"
      },
      {
        "label": "USGS 03314500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/03314500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03314500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03314500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "barren-river-james-r-hines-lonnie-white",
    "slug": "barren-river-james-r-hines-lonnie-white",
    "name": "Barren River",
    "reach": "James R. Hines Boat Landing Ramp to Lonnie White Boat Ramp",
    "aliases": [
      "Barren River - James R. Hines to Lonnie White",
      "Lower Barren River Thomas Landing segment",
      "Barren River Boat Landing Road to Thomas Landing"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Lower-Barren route from James R. Hines Boat Landing Ramp to Lonnie White Boat Ramp at Thomas Landing. KDFWR lists this exact 6.7-mile segment and ties it to the direct Bowling Green gauge with official 350 to 700 cfs good-flow guidance.",
    "statusText": "Use the Barren River at Bowling Green gauge. KDFWR rates 350 to 700 cfs as good, below that as low, and above that as high for boating and fishing on this downstream lower-Barren corridor.",
    "latitude": 37.0161,
    "longitude": -86.4449,
    "gaugeSource": {
      "id": "usgs-03314500",
      "provider": "usgs",
      "siteId": "03314500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Barren River at Bowling Green, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/03314500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "KDFWR says the Lonnie White section is pooled by the influence of Lock and Dam 1 near Greencastle, so expect slower water and stay with the named take-out.",
        "The Thomas Landing park closes at dusk, which matters if low water or upstream wind slows the route.",
        "Private banks and sparse services still make this feel more committed than a city park lap."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 350,
      "idealMax": 700,
      "tooLow": 350,
      "tooHigh": 700,
      "thresholdSource": {
        "label": "KDFWR recommended Bowling Green flow band",
        "url": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "This lower corridor is most predictable in spring and wetter fall periods when the Bowling Green gauge stays in or near the official good band. Summer low water and pooled reaches can still turn it into a slower grind than expected.",
      "difficulty": "easy",
      "difficultyNotes": "The current is usually straightforward, but the broad water, pooled finish, and limited public exits between the named ramps make this a real point-to-point float rather than a casual drift.",
      "confidenceNotes": "Confidence is good for a conservative add: KDFWR lists James R. Hines Boat Landing Ramp to Lonnie White Ramp as an exact 6.7-mile lower-Barren segment, publishes public endpoint details for both sites, and gives the official Bowling Green flow ladder of Low below 350 cfs, Good from 350 to 700 cfs, and High above 700 cfs. Same-day USGS Water Services returned 198 cfs and 3.85 ft at 2026-07-03 00:45 CDT for direct gauge 03314500, keeping the live path current while honestly showing a low-water day."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "James R. Hines Boat Landing Ramp to Lonnie White Ramp, 6.7 mi",
        "note": "KDFWR lists this exact downstream lower-Barren site-to-site mileage.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "350-700 cfs good",
        "note": "KDFWR rates the Barren River at Bowling Green gauge as Low below 350 cfs, Good from 350 to 700 cfs, and High above 700 cfs.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "James R. Hines Boat Landing Ramp, 37.0161, -86.4449",
        "note": "KDFWR access detail for Boat Landing Road Ramp matches the James R. Hines Boat Landing Park endpoint named on the Lower Barren page and confirms a public paved ramp with parking.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=625"
      },
      {
        "label": "Take-out access",
        "value": "Lonnie White Boat Ramp, 37.0348, -86.4984",
        "note": "KDFWR access detail confirms Lonnie White / Thomas Landing as a public ramp with gravel parking and dusk-close park context.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=729"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03314500 at 198 cfs / 3.85 ft",
        "note": "USGS Water Services returned same-day values for Barren River at Bowling Green, KY at 2026-07-03 00:45 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03314500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Finish character",
        "value": "Pooled Thomas Landing finish above Lock and Dam 1 influence",
        "note": "KDFWR says this section is pooled from the influence of Lock and Dam 1 near Greencastle and that the Thomas Landing park closes at dusk.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Lower Barren River",
        "url": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR James R. Hines / Boat Landing Road Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=625",
        "provider": "local"
      },
      {
        "label": "KDFWR Lonnie White Boat Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=729",
        "provider": "local"
      },
      {
        "label": "USGS 03314500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/03314500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03314500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03314500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  },
  {
    "id": "barren-river-state-street-lonnie-white",
    "slug": "barren-river-state-street-lonnie-white",
    "name": "Barren River",
    "reach": "State Street Bridge Access to Lonnie White Boat Ramp",
    "aliases": [
      "Barren River - State Street to Lonnie White",
      "Lower Barren River full downstream city segment",
      "Barren River pedestrian bridge to Thomas Landing"
    ],
    "state": "Kentucky",
    "region": "South-Central Kentucky",
    "summary": "Longer lower-Barren route from State Street Bridge Access to Lonnie White Boat Ramp at Thomas Landing. KDFWR lists the exact State Street-to-Beech Bend, Beech Bend-to-James R. Hines, and James R. Hines-to-Lonnie White mileages, which combine into a defensible 14.4-mile public route tied to the direct Bowling Green gauge.",
    "statusText": "Use the Barren River at Bowling Green gauge. KDFWR rates 350 to 700 cfs as good, below that as low, and above that as high for boating and fishing on this downstream lower-Barren corridor.",
    "latitude": 37.0017,
    "longitude": -86.4296,
    "gaugeSource": {
      "id": "usgs-03314500",
      "provider": "usgs",
      "siteId": "03314500",
      "metric": "discharge_cfs",
      "unit": "cfs",
      "kind": "direct",
      "siteName": "Barren River at Bowling Green, KY",
      "detailUrl": "https://waterdata.usgs.gov/monitoring-location/03314500/"
    },
    "safetyProfile": {
      "riskLevel": "caution",
      "hazards": [
        "fast_rise",
        "private_banks"
      ],
      "safetyNotes": [
        "This is a long lower-Barren day that passes Beech Bend, but KDFWR says that access is for registered campers only and should not be treated as a normal public shuttle endpoint.",
        "The downstream Lonnie White finish is pooled by Lock and Dam 1 influence, so stay with the named take-out instead of expecting a faster-moving finish.",
        "Low water, upstream wind, and broad pools can turn this into a substantially longer day than the mileage suggests."
      ],
      "reviewStatus": "reviewed"
    },
    "profile": {
      "thresholdModel": "two-sided",
      "idealMin": 350,
      "idealMax": 700,
      "tooLow": 350,
      "tooHigh": 700,
      "thresholdSource": {
        "label": "KDFWR recommended Bowling Green flow band",
        "url": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx",
        "provider": "local"
      },
      "thresholdSourceStrength": "official",
      "rainfallSensitivity": "medium",
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
      "seasonNotes": "This full downstream city-edge segment is most defensible when the Bowling Green gauge is in or near the official good band. Low summer water can make the longer pooled miles drag, while storms can raise current quickly across the entire corridor.",
      "difficulty": "moderate",
      "difficultyNotes": "The current is usually uncomplicated, but the 14.4-mile length, bridge and broad-pool wind exposure, pooled Thomas Landing finish, and limited legal stopping options make this a full-day route.",
      "confidenceNotes": "Confidence is good for a conservative add: KDFWR lists State Street to Beech Bend as 3.1 miles, Beech Bend to James R. Hines as 4.6 miles, and James R. Hines to Lonnie White as 6.7 miles, which combine into this 14.4-mile downstream route. KDFWR access-detail pages still provide public endpoint coordinates for State Street and Lonnie White, and same-day USGS Water Services returned 198 cfs and 3.85 ft at 2026-07-03 00:45 CDT for direct gauge 03314500, keeping the live path current while honestly showing a low-water day below the official good band."
    },
    "evidenceNotes": [
      {
        "label": "Official route segment",
        "value": "State Street Bridge Access to Lonnie White Ramp, about 14.4 mi",
        "note": "KDFWR lists State Street to Beech Bend as 3.1 miles, Beech Bend to James R. Hines as 4.6 miles, and James R. Hines to Lonnie White as 6.7 miles, which combine into this public route.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx"
      },
      {
        "label": "Official level band",
        "value": "350-700 cfs good",
        "note": "KDFWR rates the Barren River at Bowling Green gauge as Low below 350 cfs, Good from 350 to 700 cfs, and High above 700 cfs.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx"
      },
      {
        "label": "Put-in access",
        "value": "State Street Bridge Access, 37.0017, -86.4296",
        "note": "KDFWR access detail confirms a public gravel ramp below the pedestrian bridge suitable for canoes and kayaks.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1071"
      },
      {
        "label": "Take-out access",
        "value": "Lonnie White Boat Ramp, 37.0348, -86.4984",
        "note": "KDFWR access detail confirms Lonnie White / Thomas Landing as a public ramp with gravel parking and a dusk-close park boundary.",
        "sourceUrl": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=729"
      },
      {
        "label": "Live-gauge support",
        "value": "USGS 03314500 at 198 cfs / 3.85 ft",
        "note": "USGS Water Services returned same-day values for Barren River at Bowling Green, KY at 2026-07-03 00:45 CDT during this run.",
        "sourceUrl": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03314500&parameterCd=00060,00065&siteStatus=all"
      },
      {
        "label": "Mid-route access rule",
        "value": "Beech Bend access is registered-campers-only",
        "note": "KDFWR says the Beech Bend boat ramps and bank access are only available to registered campers, so this route should be planned as a State Street to Lonnie White public float rather than a campground-to-ramp chain.",
        "sourceUrl": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx"
      }
    ],
    "sourceLinks": [
      {
        "label": "KDFWR Lower Barren River",
        "url": "https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx",
        "provider": "local"
      },
      {
        "label": "KDFWR State Street Bridge Access",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=1071",
        "provider": "local"
      },
      {
        "label": "KDFWR Lonnie White Boat Ramp",
        "url": "https://app.fw.ky.gov/fisheries/accesssitedetail.aspx?asid=729",
        "provider": "local"
      },
      {
        "label": "USGS 03314500 monitoring location",
        "url": "https://waterdata.usgs.gov/monitoring-location/03314500/",
        "provider": "usgs"
      },
      {
        "label": "USGS 03314500 Water Services current values",
        "url": "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03314500&parameterCd=00060,00065&siteStatus=all",
        "provider": "usgs"
      }
    ]
  }
];
