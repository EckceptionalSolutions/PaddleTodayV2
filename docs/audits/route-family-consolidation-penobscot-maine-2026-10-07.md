# Penobscot River route-family review — October 7, 2026

## Finding

The Penobscot hub has 17 selectable public trip choices spanning north-central Maine, the West Enfield Dam transfer, the Bangor Valley, and the tidal estuary. The route pages describe adjacent or overlapping endpoint pairs, but those trips do not share one condition zone: West Enfield is proxy context for north-central routes, Bangor provides lower-river stage context, and lower-estuary trips also need tide, wind, current, and marine-traffic planning.

In the Search Console Performance report, the route-detail URL filter `https://paddletoday.com/rivers/penobscot-river-` showed zero clicks and zero impressions for April 28–October 5, 2026. A Page indexing report snapshot from September 20 listed eight Penobscot examples as “Discovered – currently not indexed,” with “Last crawled: N/A.” Those reports show poor route-page visibility and low crawl activity; they do not establish that the sitemap is broken or prove why Google has not indexed the pages. The broader issue is that many similar route pages compete to describe one section guide while the choices and their distinct planning details can live together on the hub.

## Decision

Keep all 17 route choices in the picker and consolidate all 17 route-detail URLs to their matching cards on `/rivers/by-river/penobscot-river/`. Four route URLs already pointed to hub cards; this change maps the remaining thirteen:

- `penobscot-river-bangor-hampden`
- `penobscot-river-bangor-verona`
- `penobscot-river-brewer-bangor`
- `penobscot-river-eddington-orrington`
- `penobscot-river-hampden-eddington`
- `penobscot-river-howland-passadumkeag`
- `penobscot-river-lincoln-howland`
- `penobscot-river-milford-bangor`
- `penobscot-river-milford-orono`
- `penobscot-river-orono-brewer`
- `penobscot-river-passadumkeag-milford`
- `penobscot-river-t3r11-medway`
- `penobscot-river-winn-lincoln`

The hub retains each trip’s endpoints, mileage, gauge assignment, access caveats, hazard notes, shuttle or camping details where available, and safety guidance in its route card. A source guide separates the north-central trail, the Merrill Brook–Howland dam transfer, the Bangor Valley, and tidal water below Bangor. It explains that the T3 R11 WELS–Medway corridor has remote access, that the Lower West Branch’s remote whitewater warnings do not describe every mainstem or Bangor Valley mile, and that the Bangor gauge is not a tide forecast or universal launch threshold.

This is a structural cleanup supported by the route pattern and Search Console evidence, not a confirmed explanation for the site-wide traffic decline. No sitemap submission or URL Inspection indexing request was made.

## Sources

- Penobscot River Paddling Trail, [access points and campsites](https://www.penobscotriverpaddlingtrail.org/index.php/campsites-and-access-points/)
- Penobscot River Paddling Trail, [one-day trip descriptions](https://www.penobscotriverpaddlingtrail.org/index.php/elementor-1142/)
- Maine DACF, [Penobscot River Corridor conditions](https://www.maine.gov/dacf/parks/water_activities/prc-river-conditions.shtml)
- Search Console, Performance report for the route-detail URL filter, April 28–October 5, 2026; Page indexing report snapshot, September 20, 2026.
