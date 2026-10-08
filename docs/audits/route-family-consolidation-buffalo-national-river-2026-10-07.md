# Buffalo National River route-family review — October 7, 2026

## Finding

The shared `buffalo-river` identity had grouped 12 Arkansas Buffalo National River trips with two urban Buffalo River trips in New York. The group hub title included both states. The New York routes now use `buffalo-river-new-york`, leaving the Arkansas hub focused on the National River.

The Arkansas family has 13 public endpoint choices: 11 in the Upper District from Ponca through Hasty, and two distinct Middle District routes from Tyler Bend to Grinder’s Ferry and Gilbert. The routes use Ponca, Pruitt, or St. Joe gauge context depending on the selected reach; a single averaged threshold would be misleading.

## Decision

Keep four focused route pages:

- **Ponca to Steel Creek** — a named Upper District paddle described by the National Park Service.
- **Pruitt to Hasty** — the NPS-described 7-mile trip, which is a popular alternative when water levels farther upstream are too low.
- **Tyler Bend to Gilbert** — NPS describes this 5.5-mile Middle District float as its most popular section. It has a verified Gilbert access-area anchor in the NPS primary-river-access GIS layer and meaningful search demand; it is materially longer than the separate short float below.
- **Tyler Bend to Grinder’s Ferry** — a separate Middle District reach with its own St. Joe gauge context.

Consolidate the nine overlapping or composite route pages to their exact trip cards on `/rivers/by-river/buffalo-river/`:

- `buffalo-river-ponca-kyles-landing`
- `buffalo-river-ponca-erbie`
- `buffalo-river-kyles-landing-pruitt`
- `buffalo-river-erbie-pruitt`
- `buffalo-river-steel-creek-erbie`
- `buffalo-river-steel-creek-pruitt`
- `buffalo-river-ponca-hasty`
- `buffalo-river-kyles-landing-hasty`
- `buffalo-river-erbie-hasty`

All 12 endpoint choices and their route-specific mileage, access notes, gauge assignments, and hazards remain available in the selector. The hub now explains the Upper and Middle Districts before the trip choices and links to NPS paddling, access, and mileage guidance.

## Search Console sample

The available chart covered April 28–October 5, 2026; it is not a full-year comparison. Page-filtered results showed:

| Page | Clicks | Impressions | Average position |
| --- | ---: | ---: | ---: |
| Ponca to Steel Creek | 1 | 25 | 6.9 |
| Pruitt to Hasty | 0 | 37 | 9.6 |
| Ponca to Kyle’s Landing | 0 | 28 | 20.1 |
| Ponca to Hasty | 0 | 14 | 11.1 |

The report supports retaining the named Ponca–Steel and Pruitt–Hasty guides while moving long combinations to the hub. The Middle District route stays separate because it covers a different stretch and gauge area, not because the short report showed demand.

## Endpoint correction and traffic check — October 8, 2026

Search Console's July 6–October 5 page-filtered report showed 6 clicks and 137 impressions for Tyler Bend–Gilbert, the strongest route in the Buffalo family (8 clicks / 437 impressions total). URL Inspection still reported a September 25 404, and the live URL was sending visitors to the Buffalo hub while the route was withheld. The old take-out pin matched the NPS horse-trailhead coordinate; the NPS BUFF_River_Accesses GIS layer supplies a distinct Gilbert primary-river-access point. The corrected take-out is within 99 feet of the named Buffalo River flowline and 63 feet of mapped water. A regenerated network trace connects the two route endpoints with a 140-foot maximum endpoint snap. The route is restored as a focused page instead of being grouped with the shorter Grinder’s Ferry float.

## Sources

- [NPS Upper District paddling guidance](https://www.nps.gov/buff/planyourvisit/upper-district-paddling.htm)
- [NPS river access and mileage chart](https://home.nps.gov/buff/planyourvisit/put-ins.htm)
- [NPS Buffalo River paddling conditions](https://www.nps.gov/buff/planyourvisit/paddling.htm)

No URL indexing request was submitted. Automated build and indexability checks run through CI after the direct push.
