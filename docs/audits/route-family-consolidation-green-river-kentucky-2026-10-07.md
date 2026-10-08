# Green River, Kentucky route-family consolidation

**Review date:** October 7, 2026
**Scope:** the 32 Green River Pool 6 endpoint combinations in Kentucky’s route catalog.

## Finding

The 32 options span three distinct paddling areas and multiple condition references. The catalog had treated most access-to-access combinations as separate pages and applied a score band inherited from one gauge/source to some long composites. That makes page content repetitive and risks presenting a local reading as if it described an entire multi-zone trip.

The initial source-reviewed hub kept all 32 choices in its picker, while retaining eight named trips as standalone pages:

- Upper Green: Tailwater–Roachville and Tailwater–Greensburg.
- Hart County: Lynn Camp Creek–Rio Carrydown, Rio Carrydown–H.H. Wilson, and H.H. Wilson–Stovall Park.
- Mammoth Cave: Dennison Ferry–Green River Ferry, Green River Ferry–Houchin Ferry, and Houchin Ferry–Brownsville.

That left 24 overlapping composite choices in the picker. The October 8 curation removes those combinations from the public route catalog while keeping all eight named trips selectable.

## Condition zones and source scope

### Upper Green

Kentucky Fish and Wildlife describes a 23.5-mile trail from Green River Lake Dam to Greensburg. It names Tailwater–Roachville as a 12.5-mile, full-day float and describes later shorter sections. Its paddling-specific casual-float guidance uses Green River Lake dam release: 150–500 cfs, with faster water above 500 cfs and local outfitters discouraging floats above 1,000 cfs. The Pool 6 page separately lists a Greensburg gauge stage range in feet. Dam release and Greensburg stage are readings at different locations and must not be treated as interchangeable.

### Hart County

KDFWR names Rio Carrydown–H.H. Wilson (8 miles) and H.H. Wilson–Stovall Park (4 miles). It also lists the Lynn Camp Creek–Rio float through Three Hundred Springs as an outfitter trip and notes the springs can dwindle during dry periods. Pool 6 separately publishes a Munfordville discharge recommendation of 300–600 cfs. These local boating/fishing recommendations are planning cues, not safety limits.

### Mammoth Cave

NPS documents Dennison–Green River Ferry (7.6 miles), Green River Ferry–Houchin Ferry (12.4 miles), and Houchin Ferry–Brownsville (3.6 miles). NPS describes the Green River as swift and dynamic, warns about submerged wood, debris, ferry operations, and rapidly rising water, and identifies Class II rapids at the former Lock and Dam 6 site before Brownsville. The final segment passes out of the park into private-bank territory.

NPS recommends 9–15 ft for beginner paddlers and 9–18 ft for intermediate paddlers at its park gauge. NPS rules prohibit river use at or above 20 ft. This stage guidance is a separate system from KDFWR’s Greensburg stage and Munfordville discharge readings.

The existing score boundary treated a reading exactly equal to `tooHigh` as a high-water shoulder, even where the official source closes the river at that exact reading. Green River’s NPS profiles now use an inclusive hard cutoff, so 20.00 ft is shown as prohibited rather than as a caution band.

## Scoring change

Eleven composite choices that cross the documented guidance zones are planning-only. Their local gauge readings remain context; no single numeric band is applied to the whole trip. That includes six Upper Green combinations extending beyond the named trail/gauge scope and five Hart County combinations continuing into Mammoth Cave.

The source-backed named runs retain their existing route-specific score models, with the Mammoth Cave closure boundary corrected at exactly 20 ft. The hub explains each gauge, metric, and source area separately, and warns against comparing stage feet and discharge cfs as though they were equivalent.

## Sources

- [KDFWR Upper Green River Blue Water Trail](https://fw.ky.gov/Education/Pages/Upper-Green-River.aspx)
- [KDFWR Green River Pool 6 access, mileage, and recommended levels](https://fw.ky.gov/Fish/Pages/Pool-6-%E2%80%93-Green-River.aspx)
- [KDFWR Green River Hart County Blue Water Trail](https://fw.ky.gov/Education/Pages/Green-River---Hart-County.aspx)
- [NPS Mammoth Cave canoeing, kayaking, boating, access, and named trips](https://www.nps.gov/maca/planyourvisit/canoeing-kayaking-and-boating.htm)
- [NPS Mammoth Cave river safety, skill ranges, ferry rules, and closure](https://www.nps.gov/maca/planyourvisit/river-safety-and-regulations.htm)
- [USGS Green River at Mammoth Cave, site 03309000](https://waterdata.usgs.gov/monitoring-location/USGS-03309000/)

## Prior validation, before the 2026-10-08 curation

The candidate build contained 2,988 sitemap URLs and 2,548 standalone route pages. The 24 retired Green River URLs had generated redirect pages that preserved their selected hub options; all 32 choices were available on the hub at that time. The indexability audit checked 2,926 route links, found no orphaned public pages or missing state/hub links, found unique standalone route H1s and descriptions, and returned no errors or warnings. The compact Azure configuration was 5,395 bytes. Production and Search Console were unchanged. See [redirect delivery notes](route-consolidation-redirect-delivery-2026-10-07.md) for why these are generated instant meta refresh pages rather than per-route Azure 301 rules.

## Search Console follow-up

On October 7, Search Console's stale 404 sample still included the retired `/rivers/by-river/green-river/` hub URL. Commit `242c61d1e636b63d254e37ec46c58919580da42b` adds an Azure Static Web Apps 301 from the old hub path to the current hub, which then listed 32 trips. Production returned that 301 for both slash and non-slash forms; the old URL was not in the sitemap.

## Curation follow-up (2026-10-08)

- The public Green River catalog now exposes the eight KDFWR and NPS named trips above. Those routes preserve the Upper Green, Hart County, and Mammoth Cave condition zones and their separate flow guidance.
- The 24 former composite URLs remain covered by exact-path redirects, now directly to the Green River hub root; they are no longer trip-picker or map choices.
- The hub’s descriptive copy now reflects the eight-route catalog and its three distinct condition zones.
- All 32 source records remain available in the internal route inventory for audits; the public route index exposes only the eight selected trips.

## Production verification (2026-10-08)

- Frontend workflow [37800689276](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37800689276) passed tests, build, both search-indexability audits, and deployed-origin checks. API workflow [37800689587](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37800689587) passed tests, build, deployment readiness, and smoke checks; Snapshot Worker [37800689263](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37800689263) succeeded.
- The live sitemap index returns HTTP 200 with a current child `<lastmod>`. The child sitemap returns HTTP 200 with 2,522 URLs, includes the Green River hub, and excludes the sampled retired Green River route URL.
- The sampled retired route uses the live Azure 301 rule to the Green River hub root. The frontend indexability audit covers all route consolidation mappings.
- No Search Console submission or indexing request was made; Google must recrawl the updated catalog.
