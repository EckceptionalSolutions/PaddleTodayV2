# Animas River route-family consolidation — New Mexico

Date: 2026-10-07  
Scope: Animas River route family in Aztec and Farmington, New Mexico  
Decision: retain five source-backed standalone pages; consolidate five overlapping endpoint combinations to their exact selectable trip cards on the Animas River hub.

## Why this family

The refreshed route-overlap audit found 71 high-priority overlap findings across ten Animas route options. Several options are composites of the same public access chain. Farmington publishes three adjacent city paddle legs, while the Aztec guide maps Cedar Hill, Riverside Park, Penny Lane, Animas Park, Boyd Park, and reach hazards. American Whitewater separately documents the long Cedar Hill–Farmington run.

The route family is registered as a `condition-family` with no segment edges. This groups the options for route discovery without asserting one route-wide condition threshold: the upstream Cedar Hill reach and downstream Farmington choices use different USGS stations and trip-specific planning cues.

## Keep standalone pages

- `animas-river-cedar-hill-aztec-riverside` — Cedar Hill 550 Bridge County Boat Ramp to Aztec Riverside Park, about 12.5 miles by Aztec guide mile markers. It has a distinct upstream gauge at USGS 09364010.
- `animas-river-aztec-riverside-penny-lane` — 7.3 miles, named by Farmington.
- `animas-river-penny-lane-animas-park` — 5.5 miles, named by Farmington.
- `animas-river-animas-park-boyd` — 5.5 miles, named by Farmington as Animas Park to Boyd Park / Hicks Landing.
- `animas-river-cedar-hill-boyd-park` — the full, roughly 28-mile Cedar Hill–Farmington run documented by American Whitewater, with Riverside Park, Penny Lane, and Animas Park preserved as named intermediate exits.

## Consolidate to exact hub trip cards

Each of these routes remains in the ten-option hub picker with its own endpoints, mileage, access, gauge, bailouts, and hazards. Its former standalone route URL redirects to `/rivers/by-river/animas-river-new-mexico/?route=<same-slug>#trip-<same-slug>`.

- `animas-river-cedar-hill-penny-lane`
- `animas-river-cedar-hill-animas-park`
- `animas-river-aztec-riverside-animas-park`
- `animas-river-aztec-riverside-boyd`
- `animas-river-penny-lane-boyd`

The hub summarizes the five retained trips and links to them. For all ten options, the trip cards expose the selected route’s access, flow, and safety notes inline; no endpoint choice or route record is deleted.

## Source review

- [Farmington Paddle Trails](https://farmingtonnm.org/listings/paddle-trails) lists Riverside Park–Penny Lane (7.3 miles), Penny Lane–Animas Park (5.5 miles), and Animas Park–Boyd Park / Hicks Landing (5.5 miles). It says the Animas is too low for rafting below 600 cfs; that statement is not a universal safety threshold for every craft or reach.
- [City of Aztec Animas River guide](https://www.aztecnm.com/recreation/animasriver.html) marks Cedar Hill Old 550 Bridge at guide mile 26.9, Aztec Riverside Park at mile 39.4, Penny Lane at mile 46.7, Animas Park at mile 51.6, and Boyd Park at mile 55.0. It identifies potential rebar at the Animas Ditch diversion near mile 28.6 and scraping below 1,000 cfs at Farmers Ditch near mile 34.6. It also states that banks and beaches are private and that fires are not allowed.
- [American Whitewater Cedar Hill–Farmington reach](https://www.americanwhitewater.org/content/River/view/river-detail/1203/main) describes a Class I–II, 28.4-mile run and a community trip report. Aztec’s guide-mile difference from Cedar Hill to Boyd Park is about 28.1 miles; the hub uses the local mapped endpoints for the trip and preserves the source’s approximate longer-reach context.
- USGS direct gauges are kept per trip: [09364010 below Aztec](https://waterdata.usgs.gov/monitoring-location/USGS-09364010/), [09364200 at Penny Lane](https://waterdata.usgs.gov/monitoring-location/USGS-09364200/), and [09364500 at Farmington](https://waterdata.usgs.gov/monitoring-location/USGS-09364500/). The source-backed full-run planning cue remains community-derived and is not presented as a safety guarantee.

## Verification

Candidate-build, route data, corridor, deprecation, typecheck, sitemap, and live-origin results will be recorded here after implementation validation and deployment. Search Console recrawl and indexing remain separate follow-up signals.
