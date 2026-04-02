# Seed River Calibration

This note records how the seeded river profiles were tightened after the initial MVP scaffold.

## Cannon River: Cannon Falls to Welch

Working thresholds:

- sweet spot: `300` to `700` cfs
- low bound: `220` cfs
- high bound: `1,540` cfs

Evidence used:

- MilesPaddled gives the primary numeric guidance for this exact reach and treats `300` to `700` cfs as ideal while describing `300` to `1,540` cfs as a broader medium band.
- MN DNR recommends the Cannon Falls to Welch route and describes it as a family-friendly, moderate-current trip with few difficult rapids.
- MN DNR weekly stream-flow reports classified Cannon at Welch as `Normal` at `310` cfs on October 18, 2021 and `High` at `1,840` cfs on May 2, 2011.

Interpretation:

- The `300` to `700` cfs band is still the best day-quality signal.
- The old `tooHigh = 900` cutoff was too strict for this reach.
- The broader upper shoulder should stay paddleable longer than the first MVP assumed, but quality and margin drop well before flood conditions.

Remaining gap:

- There is still no clearly published official paddling threshold from MN DNR or USGS for this exact reach.

## Straight River: Krogh's Landing to Faribault

Working thresholds:

- sweet spot: `4.4` to `5.6` ft
- low bound: `3.8` ft
- high bound: `6.0` ft

Evidence used:

- MilesPaddled supplied the initial practical band of `4.6` to `6.0` ft.
- MN DNR says spring and early summer are best and that by July the river is often too low for enjoyable paddling.
- MN DNR also warns about downed trees, snags, and the Clinton Falls Class II-III rapid/portage.
- MN DNR weekly stream-flow reports classified Straight at Faribault as `Normal` at `3.76` ft on October 18, 2021 and `High` at `5.71` ft on May 2, 2011.

Interpretation:

- The first MVP was too permissive on the high end and a little too strict on the low end.
- The refined band keeps the trip-report preference but respects the official DNR signal that the upper `5`s already behave like a high-water condition.

Remaining gap:

- The exact sweet spot is still not officially published for this precise day-trip reach.

## Zumbro River: Green Bridge to Zumbro Falls

Working thresholds:

- sweet spot: `7.0` to `9.0` ft
- low bound: `5.5` ft
- high bound: `11.5` ft

Evidence used:

- MilesPaddled's report for this exact segment says `5.5` ft was the lowest recommended level on November 4, 2023.
- The same report keeps `7` to `9` ft as the preferred band and references `12` ft as high by DNR map interpretation.
- MN DNR officially recommends the same `Green Bridge to Zumbro Falls` day trip.
- MN DNR describes the river as lively even at moderate levels and warns that it can rise dramatically and dangerously after rainstorms.

Interpretation:

- The first MVP was too strict on both ends for this segment.
- The river should stay in play below the preferred band more often than the original seed suggested, but confidence remains capped because the exact numeric cutoffs are still not officially published.

Remaining gap:

- This river still has the weakest threshold evidence of the 3 seed profiles.
- The best next improvement would be a stronger local paddling source or a repeated set of same-segment observations tied to the Zumbro Falls gauge.

## Root River: Lanesboro to Peterson

Working thresholds:

- sweet spot: `325` to `700` cfs
- low bound: `200` cfs
- high bound: `1,200` cfs

Evidence used:

- MilesPaddled gives the key same-segment clue for this exact route and ties a recommended but low-water day to about `2.4 ft / 300 cfs` at the Lanesboro gauge.
- MN DNR officially supports Lanesboro to Peterson as a recommended Root River day trip and documents public water accesses at both ends.
- Other Root River notes in the old repo consistently describe low-water scraping and higher-water debris/current risk, but do not publish a better official numeric band for this exact reach.

Interpretation:

- `300` cfs looks more like the lower edge of a worthwhile day than the center of an ideal window.
- The MVP therefore treats the lower `300s` as a low shoulder instead of calling them perfect.
- The upper side remains conservative because we still do not have a stronger published same-segment high-water cutoff.

Remaining gap:

- There is still no clearly published official paddling threshold from MN DNR or USGS for this exact reach.
- The best next upgrade would be more repeated same-segment observations tied to `05384000` or a stronger local paddling source with a true preferred band.

## Wolf River: Hwy 52 to West Hollister Road

Working thresholds:

- low bound: `250` cfs
- sweet spot: `500` to `1,000` cfs
- high bound: `2,000` cfs

Evidence used:

- American Whitewater publishes gauge guidance for the relevant Wolf section family and treats `250` to `1,000` cfs as the lower-to-moderate boatable range, with `1,000` to `2,000` cfs as more pushy but still runnable.
- MilesPaddled gives exact-route context and says about `250` cfs is the too-low cutoff while `500` cfs is an awesome level for Lily to Hollister.
- Wisconsin DNR boat-access records support both endpoints.

Interpretation:

- This is one of the clearer old-repo candidates for a cautious two-sided band.
- The app still keeps the route conservative because boulder gardens and rapids make the consequences steeper than the score alone suggests.

Remaining gap:

- The upper bound is still more whitewater-source-derived than manager-published.
- The route would benefit from more repeated same-section observations at higher flows.

## White River: Maple Ridge Road to Highway 112 Dam

Working thresholds:

- sweet spot: `1.35` to `1.75` ft
- low bound: `1.1` ft
- high bound: `2.6` ft

Evidence used:

- MilesPaddled gives the key same-route clue for this exact White River segment and describes about `1.47 ft / 200 cfs` as a recommended level.
- The same route notes describe nearly continuous class I-II current, boulder gardens, and a dam finish, which justifies a more conservative read than a flatwater route with the same certainty.
- USGS remarks for `04027500` mention diurnal fluctuation from hydroelectric operations, which means the gauge can be a little less stable in feel than a free-flowing scenic river.

Interpretation:

- `1.47` ft looks like the center of the best exact-route evidence we have today.
- The app treats this as a cautious two-sided band rather than minimum-only guidance, because the same-route recommendation is stronger than a bare low-water floor.
- The upper side still stays conservative because hydro-related fluctuation and access uncertainty both lower trust before the raw number alone looks extreme.

Remaining gap:

- This is still mostly community-sourced calibration, not an official manager-published paddling threshold.
- Official landing and parking authority is weaker than on the strongest seeded routes.

## St. Croix River: Fox Landing to Highway 70

Working thresholds:

- published floor: `1,000` cfs

Evidence used:

- MilesPaddled gives the clearest usable numeric signal for this exact segment:
  - `720` cfs was too low
  - wait for at least `~1,000` cfs
- Wisconsin DNR access records support both endpoints, and the Danbury gauge is direct and relevant.

Interpretation:

- The route is scoreable today, but only as a `minimum-only` river.
- Wind and broad-channel effort matter enough that the product should avoid overclaiming a precise sweet spot above the low-water floor.

Remaining gap:

- No stronger preferred band or high-water cutoff was found for this exact route.
- The best next upgrade would be more repeated same-segment observations or a stronger local paddling source that distinguishes merely runnable water from truly good conditions.

## Black Hawk Creek: Franck Park to Ranchero Road

Working thresholds:

- published band: `100` to `500` cfs

Evidence used:

- The Iowa DNR Black Hawk Creek Water Trail brochure publishes `100` to `500` cfs at Hudson as the recommended flow for safe and enjoyable paddling.
- The same brochure explicitly says this creek is not the best choice for novice paddlers.
- The brochure also warns about deadfalls, strainers, portages, and two fords that can behave like low-head-dam hazards.

Interpretation:

- This is one of the clearest official numeric ranges in the current seed set.
- The app treats the official `100` to `500` cfs band as the target window, but still scores the reach a little more cautiously because technical difficulty remains high even on a good-water day.

Remaining gap:

- The gauge band is clear, but obstacle freshness is not. A perfect gauge cannot rule out new wood after storms.

## Rice Creek: Peltier Lake to Long Lake

Working thresholds:

- published band: `6.30` to `7.90` ft

Evidence used:

- Rice Creek Watershed District publishes `6.30` to `7.90` ft as the passable water-level recommendation for the water trail.
- The Anoka County trail map shows the Peltier Lake to Long Lake corridor and notes that high water can require a portage at County Road I.
- The same trail material also notes the downstream fish-barrier portage near Long Lake.

Interpretation:

- This is an official water-level band, so the confidence in the numeric guidance is strong.
- The main uncertainty is not the gauge itself. It is wind on the lake crossings plus whether crossings and barriers add extra portages on the day.

Remaining gap:

- The weather model is still route-level, not segment-level. On Rice Creek, wind exposure across the lake chain can matter more than the gauge once the level is inside the published band.

## Kettle River: #5 trailer access to #6 trailer access

Working thresholds:

- working band: `6.0` to `10.0` ft

Evidence used:

- American Whitewater lists `6.0` to `10.0` ft at the Sandstone gauge as the Lower Kettle range for this reach family.
- MN DNR Map 2 uses the same `#5 trailer access` to `#6 trailer access` day trip and describes it as mostly flat water with one Class I rapid around river mile 11.
- PaddleToday route notes already treated this reach as runoff-sensitive and oriented around the same USGS `05336700` Sandstone gauge.

Interpretation:

- The numeric range is good enough to seed the river, but it is not an official manager-published paddling threshold.
- Because a stronger official shoulder zone is missing, the MVP currently treats `6.0` to `10.0` ft as the whole workable band rather than inventing extra low or high shoulders.

Remaining gap:

- The best next upgrade would be repeated local observations or a stronger published source for what still works just below `6.0` ft or just above `10.0` ft.

## South Fork Zumbro: 90th Street NW to Lake Zumbro

Working thresholds:

- working band: `3.0` to `4.0` ft

Evidence used:

- MilesPaddled treats `3.0` to `4.0` ft at the Rochester gauge as the good beginner range for this exact South Fork reach.
- MN DNR warns that the Zumbro system can rise dramatically and dangerously after rainstorms.
- Olmsted County documents the Lake Zumbro Park canoe and kayak launch, which supports the downstream route shape and the reservoir-finish context.

Interpretation:

- This is a narrow, conservative band anchored by trip-report guidance rather than an official numeric threshold.
- The MVP intentionally keeps the band strict because the route is marketed as beginner-friendly only when the river is behaving well and not rising quickly.

Remaining gap:

- The numeric band still needs stronger repeated same-reach evidence.
- The upstream put-in is less official than the Lake Zumbro take-out, so route-confidence and gauge-confidence are not equally strong.

## Upper Iowa River: Kendallville Park to Decorah

Working thresholds:

- published minimum: `200` cfs
- upper target: not calibrated yet

Evidence used:

- MilesPaddled gives the clearest current numeric guidance for this reach and says to avoid it below `200` cfs.
- Winneshiek County Conservation supports the segment as a marquee Upper Iowa paddle and reinforces that this is a long scenic Driftless float rather than a tiny local run.
- Iowa DNR Water Trails materials support the river as a paddling corridor, but do not publish a reach-specific upper target band.

Interpretation:

- The only defendable numeric threshold today is the low-water floor.
- The app now treats this as a `minimum-only` river instead of pretending a full sweet spot exists.
- Above `200` cfs, the river can score as workable, but never as a fully calibrated "great" two-sided-gauge day.

Remaining gap:

- The reach still lacks a defendable high-water cutoff or preferred upper band tied to the Decorah gauge.
- The next upgrade would be repeated same-segment observations or a stronger local paddling source that distinguishes merely runnable water from truly good conditions.

## Sugar River: Belleville Community Park to County Road X

Working thresholds:

- published minimum: `60` cfs
- upper target: not calibrated yet

Evidence used:

- MilesPaddled gives the only usable numeric guidance for this reach and recommends about `60` cfs minimum at Verona to avoid a shallow, frustrating day.
- The same route notes describe the stretch as mellow and scenic rather than technical, which supports a low-water-first scoring model.
- The USGS Verona gauge is a practical upstream reference, but no stronger reach-specific high-water band was found in PaddleToday's existing sources.

Interpretation:

- The app treats this as another `minimum-only` river.
- Above `60` cfs, the product can say the route is in play, but not that it is sitting in a defendable sweet spot.
- Because the route itself is easy, the primary risk is over-claiming certainty, not underestimating technical hazard.

Remaining gap:

- The current model does not know where "pleasant moderate flow" becomes "too pushy" for this reach.
- A better source for high-side guidance would let this river move from minimum-only status into a real two-sided band.

## Kickapoo River: Ontario to Rockton

Working thresholds:

- published minimum: `60` cfs
- upper target: not calibrated yet

Evidence used:

- MilesPaddled gives the clearest current numeric guidance for this reach family and treats about `60` cfs at Ontario as the low-water floor.
- The same route notes describe roughly `70` to `100` cfs as a pleasant working range, but still as community guidance rather than an official manager-published threshold.
- Wisconsin DNR boat-access inventory records support that both Ontario and Landing 12 are real public access points, even though they do not publish a paddling flow band.

Interpretation:

- The only defendable numeric threshold today is the low-water floor.
- The app treats this as a `minimum-only` river instead of inventing a high-water cutoff from thin evidence.
- Above `60` cfs, the route can score as workable, but rising water and flash-flood context still deserve manual caution.

Remaining gap:

- The reach still lacks a defendable high-water cutoff or an official preferred band.
- The next upgrade would be stronger repeated same-reach observations or a published local paddling source that distinguishes merely runnable water from truly good conditions.

## Upper Iowa River: Trout Run Park to Lower Dam

Working thresholds:

- published minimum: `150` cfs
- upper target: not calibrated yet

Evidence used:

- MilesPaddled gives the clearest current numeric guidance for this Decorah reach and recommends about `150` cfs minimum to avoid a scrape-heavy day.
- The same route notes confirm the full reach length, shuttle reality, and the Upper Dam portage, which all matter to the trip-day decision.
- USGS `05387500` provides direct gauge coverage for current-condition checks near Decorah.

Interpretation:

- This is another `minimum-only` river rather than a two-sided sweet-spot call.
- Above `150` cfs, the route can be considered in play, but the app should not overclaim precision on the high side.
- The route is beginner-friendly at workable levels, but the dam portage and full-day mileage still justify a conservative decision style.

Remaining gap:

- No defendable high-water cutoff or preferred upper band was found in the old repo.
- The best next upgrade would be repeated same-segment observations tied to the Decorah gauge or a stronger local paddling source with upper-band guidance.
