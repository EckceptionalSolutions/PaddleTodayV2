# Massachusetts Housatonic route-family consolidation

Date: 2026-10-07

## Decision

The Berkshire Housatonic family had 15 endpoint combinations sharing three nearby paddling zones and a large amount of repeated river, gauge, water-quality, and access guidance. Six combinations were derived by joining adjacent sections. Their trip choices remain in the river guide, but their separate route pages now resolve to the matching trip card. This leaves nine standalone reach pages while keeping all 15 options available.

Consolidated to `/rivers/by-river/housatonic-river-massachusetts/?route=<slug>#trip-<slug>`:

- `housatonic-river-fred-garner-woods-pond`
- `housatonic-river-decker-lee-athletic`
- `housatonic-river-fred-garner-lee-athletic`
- `housatonic-river-brookside-rannapo`
- `housatonic-river-division-covered-bridge`
- `housatonic-river-east-sheffield-rannapo`

Each card retains its own distance, put-in, take-out, intermediate access, gauge reference, dam boundaries, and trip-specific safety notes. Its redirect selects and anchors that exact card.

## Standalone pages retained

- Upper mainstem source sections: Fred Garner–Decker, Decker–Woods Pond, and Woods Pond–Lee Athletic. The last has a mandatory right-bank portage around Woods Pond Dam and Class II–III water downstream.
- Stockbridge sections: Park Street–Glendale Dam above the dam and the separately accessed Class III trip below Glendale Dam to Rising Pond. A land portage is required between them.
- Great Barrington–Sheffield access options: Division Street–Brookside, Brookside–Covered Bridge, the HVA guide-listed Covered Bridge–Rannapo section, and the separate East Sheffield–Covered Bridge trip with its very steep launch.

The old HVA guide's Bridge Street/Searles endpoint is closed, so current lower options use public Brookside and Covered Bridge accesses. The hub states that these are distinct reaches and does not claim that the three zones form one continuous trip or share identical conditions.

## Gauge and access context

Trip options now select a nearby same-mainstem USGS reference by area:

- Lenoxdale, station 01197145, for the upper chain near Woods Pond.
- Great Barrington, station 01197500, for the Stockbridge and Division Street trips.
- Ashley Falls, station 01198125, for downstream Sheffield trips.

HVA's 150 cfs figure remains a broad community planning cue, not a safe-flow guarantee or a universal local threshold. Users are told to check the selected station, trend, local water, dam boundaries, rain, and access notices.

Great Barrington's bridge page reports the temporary Division Street bridge open after its interim repair, with replacement work planned for fall 2026; it reports Brookside Road Bridge closed to vehicle traffic. East Sheffield's August 20, 2026 road closure notice was a one-day work window and has passed. The hub links the Town's live project page so paddlers can check current road status instead of treating that expired notice as a current closure.

## Evidence reviewed

- Housatonic Valley Association, [Berkshire County paddling guide publication page](https://hvatoday.org/publications/) and [2023 Berkshire guide PDF](https://hvatoday.org/wp-content/uploads/2023/09/PaddleGuideBerkshire_2023UPDATES.pdf).
- Town of Great Barrington, [bridge projects and infrastructure updates](https://www.townofgbma.gov/647/Bridge-Projects-and-Infrastructure-Updat) and [East Sheffield Road temporary closure notice](https://townofgb.org/m/newsflash/home/detail/201).
- USGS, [Lenoxdale station 01197145](https://waterdata.usgs.gov/monitoring-location/USGS-01197145/), [Great Barrington station 01197500](https://waterdata.usgs.gov/monitoring-location/USGS-01197500/), and [Ashley Falls station 01198125](https://waterdata.usgs.gov/monitoring-location/USGS-01198125).
- Massachusetts, [Housatonic restoration and PCB information](https://www.mass.gov/info-details/housatonic-river-natural-resource-restoration) and [fish and waterfowl advisory](https://www.mass.gov/lists/housatonic-river-fish-and-waterfowl-advisory).

## Rollout verification

Pending CI deployment and production checks. Confirm that the six old route paths redirect to the exact selected trip cards, all 15 trip cards and their details remain available, and only the six retired standalone route URLs leave the sitemap.
