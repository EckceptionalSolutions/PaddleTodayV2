# Village Creek Paddling Trail route-family review — 2026-10-07

## Decision

Consolidate the eight Village Creek route articles into the existing river hub and keep all eight trip choices there. The family is one officially marked paddling trail with five sequential public access points, one nearby gauge, and four published consecutive sections. The longer endpoint pairs remain useful because they change trip length, shuttle, midpoint access, and whether an overnight plan is appropriate.

Each former route URL selects its matching card on the canonical Village Creek hub. This removes standalone pages that repeat the same trail and gauge context without taking away the endpoint choices.

## Source and content changes

- The access chain runs FM 418 → TX 327 → Baby Galvez Road → US 96 → Village Creek State Park.
- The National Park Service lists the four consecutive sections as 8.6, 2.1, 7.1, and 3.2 miles, totaling 21 miles. It says low water below about 3 feet exposes sandbars and logs, while 10 feet or higher can create hazardous swift current.
- Texas Parks & Wildlife lists the same access chain, but gives TX 327–Baby Galvez as 3.37 miles and says the total trail is about 20.9 miles. Its segment values sum to about 22.27 miles, so its listed middle leg and stated total do not reconcile. The build retains TPWD’s middle-leg value in the trip record while the hub clearly explains the conflict and links both official guides; no unverified correction is presented as settled fact.
- The hub adds source-specific trail distance context, the five access points, USGS 08041500 near Kountze, overnight planning information, variable water quality, and inline trip-specific notes.

## Search and indexability behavior

- `/rivers/by-river/village-creek/` is self-canonical, indexable, and included in `sitemap-0.xml`.
- All eight previous route URLs redirect to their matching hub trip cards and are absent from the sitemap.
- The four published adjacent sections and four longer endpoint combinations remain available on the hub with their own distances, access, time, and safety details.

## Verification

- `npm run build` passed. Astro built 2,727 pages and generated 587 route-consolidation redirects, eight more than the preceding build.
- `npm run seo:indexability:audit` passed with zero errors and warnings. It checked 2,715 public pages, 2,801 public route options, and 587 consolidated redirects. It found no route orphans, missing state/hub inlinks, duplicate route H1s, or duplicate route descriptions.
- A built-output check confirmed the Village Creek hub title, description, self-canonical, eight route options, source-distance note, all eight redirects, and sitemap inclusion of only the hub.
- No automated tests were run.

## Sources

- [Texas Parks & Wildlife Village Creek Paddling Trail](https://tpwd.texas.gov/boating/paddling-trails/pineywoods/village-creek/)
- [National Park Service Big Thicket paddling trails](https://www.nps.gov/bith/planyourvisit/paddling-trails.htm)
- [National Park Service Paddle Village Creek guide](https://home.nps.gov/thingstodo/paddle-village-creek.htm)
- [USGS 08041500 near Kountze](https://waterdata.usgs.gov/monitoring-location/USGS-08041500/)
