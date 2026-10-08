# Black Creek route-family consolidation

Date: 2026-10-07

## Finding

The Black Creek catalog contains 28 downstream landing combinations across eight landings. This is every possible pair of those landings, so most entries are composite trips that repeat the same gauge, safety, access, and river-context information. The current source model already distinguishes six adjacent reaches documented by Seven Rivers Canoe Club.

The six source-documented reaches to retain as public trip choices are:

- Churchwell Road to Big Creek (about 6 river miles)
- Big Creek to Old Highway 49 (about 5 miles)
- Old Highway 49 to Moody’s Landing (about 7.2 miles; the club describes this as probably the most popular trip)
- Moody’s Landing to Janice (about 10.5 miles)
- Janice to Cypress Creek (about 6 miles)
- Cypress Creek to Fairley Bridge (about 5.7 miles)

These sections cover distinct landing pairs and are tied to published distances. The original consolidation retained the 22 composite options in the hub picker. The October 8 catalog-curation follow-up below supersedes that choice: it keeps the six documented reaches as public options and sends the longer combinations to the landing-sequence guide, while preserving the historical route records for audits and redirects.

The Old Highway 49–Ashe Nursery connector is a planning-only choice. Seven Rivers describes Ashe Nursery as an alternative take-out about 1.3 miles downstream, while the stored endpoint coordinates are about 1.5 miles apart in a straight line. The trip stays available on the hub with its uncertainty visible, but it does not need a standalone search landing page.

Source: [Seven Rivers Canoe Club Black Creek landing guide](https://www.sevenriverscanoe.com/black-creek).

## Changes in this worktree

- The six documented adjacent reaches keep standalone route pages.
- The other 22 route paths initially redirected to matching trip cards; the October 8 curation below updates them to the landing-sequence guide because those cards are no longer public choices.
- The hub keeps stable anchors for the six active trip cards. Legacy composites resolve to the landing-sequence section.
- State pages, route planning links, saved route links, alert links, admin links, the internal search index, and river-hub cards resolve consolidated options to the hub or its guide section.
- Search Console accepted a resubmission of the existing sitemap index on Oct 7. These source changes have not been deployed, so Google’s submitted URL count will not change until a release is published and Google processes the new sitemap.

## Expected effect and limits

The page consolidation removes 22 standalone URLs from the Black Creek route family and reduces the standalone route-page count from 28 to six (about 79%). The October 8 curation also reduces the public trip picker from 28 choices to the six independently documented reaches. Composite route records and their local planning data remain in the source inventory, but paddlers now use the documented landing sequence to plan longer outings. Neither change proves that similar content caused the broader traffic decline.

This is a quality and crawl-efficiency improvement, not proof that duplicate content caused the broader traffic decline. Search Console must recrawl the redirects and hub before any indexing or traffic effect can be measured.

## Public trip-choice curation (2026-10-08)

The Seven Rivers Canoe Club guide lists the adjacent landing sequence from Churchwell Road through Big Creek, Old Highway 49, Moody’s Landing, Janice and Cypress Creek to Fairley Bridge, with reach-specific distances and access notes. The six adjacent routes above map to those documented sections. The other 22 active catalog records combine those same landings into longer endpoint pairs; they repeated much of the same river and gauge context and made the hub’s trip list difficult to scan.

The Black Creek hub now presents the six documented adjacent reaches as its trip choices. The 22 composite route records and their route-specific conditions remain available in the public route/API catalog but are omitted from this hub picker; their old URLs lead to the landing-sequence guide instead of an unavailable trip-card anchor. The Ashe Nursery alternative remains explicitly noted as an access point under endpoint review. This reduces the hub picker from 28 combinations to six source-backed sections without removing composite route data; it does not prove that duplicate content caused the site-wide traffic decline.

## Production verification (2026-10-08)

Frontend workflow [37808755238](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37808755238), API workflow [37808755295](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37808755295), and Snapshot Worker workflow [37808755259](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37808755259) succeeded.

On production, the Black Creek hub returns HTTP 200 and renders six trip cards. The retired Big Creek–Cypress Creek route page returns HTTP 200 with its fallback link targeting the landing-sequence guide. The public route catalog and its detail API both return HTTP 200 and still include that composite route, confirming that picker curation did not remove API availability. The sitemap index and child sitemap return HTTP 200; the child contains 2,521 URLs, includes the Black Creek hub, and omits the retired composite route page.
