# Current River route-family consolidation — Missouri — 2026-10-07

## Decision

Keep the Upper and Lower Current River as separate planning zones on the river hub. Consolidate five no-click composite route pages into their exact trip cards while retaining all 16 endpoint choices. Keep the seven route pages with Search Console clicks in the latest three-month view, plus the NPS-named direct sections, as standalone guides.

The Upper Current choices run from Cedar Grove through Akers, Pulltite, and Round Spring. The Lower Current choices run from Waymeyer through Van Buren, Big Spring, Cataract, and Gooseneck / Hawes. The hub does not combine these sections into one condition profile: upper routes use the Akers gauge context; lower routes use Van Buren.

## Search Console evidence

The user-authorized Search Console property report was filtered to Current River route URLs for July 5–October 4, 2026. It showed 15 clicks, 687 impressions, 2.2% CTR, and average position 7.6. Keep these seven click-bearing pages standalone:

| Route | Clicks | Impressions |
| --- | ---: | ---: |
| Cedar Grove–Akers | 4 | 219 |
| Akers–Pulltite | 4 | 66 |
| Pulltite–Round Spring | 2 | 40 |
| Waymeyer–Big Spring | 2 | 29 |
| Cedar Grove–Pulltite | 1 | 56 |
| Waymeyer–Cataract | 1 | 8 |
| Big Spring–Gooseneck | 1 | 6 |

These rows account for all 15 clicks reported in the filtered view. Four more direct guides remain standalone because NPS lists those individual float sections: Waymeyer–Van Buren, Van Buren–Big Spring, Big Spring–Cataract, and Cataract–Gooseneck.

## Consolidated routes

Each of these five URLs now selects the matching trip card on `/rivers/by-river/current-river/`:

- Akers Ferry–Round Spring
- Cedar Grove–Round Spring
- Van Buren–Cataract
- Van Buren–Gooseneck
- Waymeyer–Gooseneck

These remain selectable with their existing endpoints, distance, gauge, shuttle, camping, and safety details. The 11 retained standalone routes remain self-canonical and in the sitemap.

## Source and trip-time corrections

- The NPS 2024 float-time table lists Upper Current sections: Cedar Grove–Akers (7.7 mi / 3 hr), Akers–Pulltite (9.6 mi / 4 hr), and Pulltite–Round Spring (8.9 mi / 4 hr). The older NPS upper-river page estimates Akers–Pulltite at 5 hours, so the trip card carries a 4-to-5-hour range.
- NPS's newer Lower Current table lists Van Buren–Big Spring (4.3 mi / 2 hr), Big Spring–Cataract (8.8 mi / 4 hr), and Cataract–Gooseneck (6.2 mi / 3 hr). The older paddling page gives six hours for Big Spring–Gooseneck and eight hours for Van Buren–Gooseneck; the newer component totals are seven and nine hours. Those cards now communicate both published estimates.
- The older NPS lower-river page estimates Waymeyer–Van Buren at 3 hours. The 2024 table splits it at Raftyard into 1.7 miles / 0.5 hour and 4.8 miles / 2 hours, totaling 6.5 miles / 2.5 hours, while the route trace is about 7.2 miles. The card now reports those source ranges.
- NPS says float times are averages and vary with flow, breaks, paddling speed, vessel, and wind. The hub links to its current river-level and closure information. The route-card 230/300 cfs upper and 700 cfs lower floors remain community planning cues; NPS gauge-height closure stages are a separate check.

## Search and indexability behavior

- `/rivers/by-river/current-river/` is self-canonical, indexable, and included in the sitemap.
- The five consolidated route URLs are absent from the sitemap and each points to its matching trip card.
- The 11 retained guide pages stay indexable with self-canonicals and hub inlinks.
- All 16 route choices remain on the hub, grouped in the guide by upper and lower reach.

## Verification

- `npm run build` passed. Astro built 2,688 pages and generated 626 route-consolidation redirects, five fewer static route pages and five more redirects than the preceding build.
- `npm run seo:indexability:audit` passed with zero errors and warnings. It checked 2,676 public pages, 2,801 public route options, 2,616 route links, and 626 consolidated redirect pages. It found no route orphans, missing state or river-hub inlinks, duplicate route H1s, or duplicate route descriptions.
- A built-output check confirmed the hub's self-canonical and sitemap entry, all five exact matching-card redirects outside the sitemap, all 11 retained guides in the sitemap with self-canonicals, and all 16 trip-card anchors.
- No automated tests were run.

## Sources

- [NPS estimated float times](https://www.nps.gov/ozar/planyourvisit/floattimes.htm)
- [NPS: Paddle the Upper Current River](https://www.nps.gov/thingstodo/paddle-the-upper-current-river.htm)
- [NPS: Paddle the Lower Current River](https://www.nps.gov/thingstodo/paddle-the-lower-current-river.htm)
- [NPS river levels and closures](https://www.nps.gov/ozar/planyourvisit/levels.htm)
