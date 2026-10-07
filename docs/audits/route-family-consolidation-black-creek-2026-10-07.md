# Black Creek route-family consolidation

Date: 2026-10-07

## Finding

The Black Creek catalog contains 28 downstream landing combinations across eight landings. This is every possible pair of those landings, so most entries are composite trips that repeat the same gauge, safety, access, and river-context information. The current source model already distinguishes six adjacent reaches documented by Seven Rivers Canoe Club.

The six standalone pages to retain are:

- Churchwell Road to Big Creek (about 6 river miles)
- Big Creek to Old Highway 49 (about 5 miles)
- Old Highway 49 to Moody’s Landing (about 7.2 miles; the club describes this as probably the most popular trip)
- Moody’s Landing to Janice (about 10.5 miles)
- Janice to Cypress Creek (about 6 miles)
- Cypress Creek to Fairley Bridge (about 5.7 miles)

These sections cover distinct landing pairs and are tied to published distances. Longer options remain useful to paddlers who want to combine sections, so the 22 composite pages are consolidated into the Black Creek river hub rather than removed from the trip picker. Their route records, condition calls, access points, and map data remain available.

The Old Highway 49–Ashe Nursery connector is a planning-only choice. Seven Rivers describes Ashe Nursery as an alternative take-out about 1.3 miles downstream, while the stored endpoint coordinates are about 1.5 miles apart in a straight line. The trip stays available on the hub with its uncertainty visible, but it does not need a standalone search landing page.

Source: [Seven Rivers Canoe Club Black Creek landing guide](https://www.sevenriverscanoe.com/black-creek).

## Changes in this worktree

- The six documented adjacent reaches keep standalone route pages.
- The other 22 route paths redirect to their matching trip option on the Black Creek hub. The hub URL carries the selected route so the picker can open the right option.
- The hub retains an anchor for every trip card, including after client-side refresh.
- State pages, route planning links, saved route links, alert links, admin links, the internal search index, and river-hub cards resolve consolidated options to the hub.
- Search Console accepted a resubmission of the existing sitemap index on Oct 7. These source changes have not been deployed, so Google’s submitted URL count will not change until a release is published and Google processes the new sitemap.

## Expected effect and limits

This removes 22 standalone URLs from the Black Creek route family while preserving the six independently documented reaches and all 28 selectable trip choices. It reduces the family’s standalone route-page count from 28 to six (about 79%). The hub still presents the composite options, so this changes the indexable page set and consolidates repeated page content; it does not remove a paddler’s ability to plan a longer trip.

This is a quality and crawl-efficiency improvement, not proof that duplicate content caused the broader traffic decline. Search Console must recrawl the redirects and hub before any indexing or traffic effect can be measured.
