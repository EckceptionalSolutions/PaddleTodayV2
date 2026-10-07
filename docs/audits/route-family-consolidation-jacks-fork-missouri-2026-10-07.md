# Jacks Fork River route-family review — 2026-10-07

## Decision

Consolidate the 15 public Jacks Fork route articles into the existing river hub while keeping all 15 endpoint choices available there. The route pages share the same access corridor, and the hub can make the upper, middle, and lower sections easier to compare while retaining the trip-specific gauges, access details, shuttle plans, camping notes, rules, and hazards.

Each former public route URL selects its matching trip card on the canonical Jacks Fork hub. The hub adds a section guide anchored by NPS's adjacent float segments and explains that the upper corridor is seasonal.

## Source and content changes

- NPS says 35 miles of the Jacks Fork lie within Ozark National Scenic Riverways and that portions are navigable only at certain times because of low water. Its 2024 table lists Highway 17–Blue Spring (2.6 mi / 1 hr), Blue Spring–Rymers (6.6 mi / 3 hr), Rymers–Bay Creek (9 mi / 4 hr), Bay Creek–Alley Spring (5.8 mi / 2 hr), and Alley Spring–Eminence (6.3 mi / 3 hr).
- NPS's park brochure places Rymers and Bay Creek at river miles 82 and 74, implying about 8 miles between them. The float-time table lists 9 miles, so the trip card now communicates an 8-to-9-mile source range.
- NPS's 2021 Jacks Fork paddling page gives 4 hours for the popular Alley Spring–Eminence trip, while the newer 2024 table gives 3 hours and 6.3 miles. The trip card reports 3–4 hours and identifies the difference.
- The hub groups the 15 trips into upper seasonal reaches, the middle corridor to Alley Spring, and the popular lower Alley Spring–Eminence float. It identifies the three gauge contexts used by the cards: Mountain View, Alley Spring, and Eminence. The 100/200 cfs floors are described as conservative community planning cues, not official NPS safety limits.
- The trip cards retain their individual access, shuttle, camping, rules, flow, and safety details. Lower-route notes keep the Joshua T. Chilton Memorial Landing plan and caution against assuming private riverbank access near Eminence.

## Search and indexability behavior

- `/rivers/by-river/jacks-fork-river/` is the canonical hub and remains indexable in the sitemap.
- All 15 former public route URLs redirect to their matching hub trip cards and are absent from the sitemap.
- All 15 endpoint choices remain selectable on the hub with their route-specific planning details.

## Verification

- `npm run build` passed. Astro built 2,693 pages and generated 621 route-consolidation redirect pages: 15 fewer route pages and 15 more redirects than the preceding build.
- `npm run seo:indexability:audit` passed with zero errors and warnings. It checked 2,681 public pages, 2,801 public route options, 2,621 route links, and 621 consolidated redirect pages. It found no route orphans, missing state or river-hub inlinks, duplicate route H1s, or duplicate route descriptions.
- A built-output check confirmed the Jacks Fork hub is in the sitemap, all 15 former route URLs are absent from it, each redirect selects its matching trip card, and all 15 matching card anchors exist.
- No automated tests were run.

## Sources

- [NPS estimated float times](https://www.nps.gov/ozar/planyourvisit/floattimes.htm)
- [NPS: Paddle Jacks Fork River](https://www.nps.gov/thingstodo/paddle-jacks-fork-river.htm)
- [Ozark National Scenic Riverways park brochure](https://www.nps.gov/ozar/planyourvisit/park-brochure.htm)
