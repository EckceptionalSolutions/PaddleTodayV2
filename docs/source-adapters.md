# Source Adapter Components

PaddleToday now separates live readings from threshold/range evidence. That matters for Wisconsin because American Whitewater can provide runnable ranges while USGS still provides the live gauge value.

## Adapter Responsibilities

1. **Live gauge adapter**
   - Fetches the current reading and recent samples when the source supports them.
   - Owns freshness expectations and source labels.
   - Current providers: `usgs`, `mn_dnr`.

2. **Threshold source adapter**
   - Identifies where the runnable range came from.
   - Drives summary badges and future source-specific confidence rules.
   - Current providers include `mn_dnr`, `american_whitewater`, `miles_paddled`, `wisconsin_river_trips`, `wisconsin_trail_guide`, `nps`, `local`, and `manual`.

3. **Gauge display adapter**
   - Tells the detail page whether to render a recent-sample chart or a current-reading panel.
   - Supplies provider labels, primary/secondary metric labels, hydrograph support, and interpretation labels.
   - Lives in the API payload at `river.gaugeSource.display`.

4. **Route/access evidence**
   - Still lives in route data through `evidenceNotes`, `sourceLinks`, and trip logistics.
   - This is intentionally separate from gauge scoring so an official route source can be paired with community or AW threshold evidence.

## Wisconsin Pattern

For Wisconsin routes sourced from American Whitewater:

- `gaugeSource.provider`: usually `usgs`
- `gaugeSource.siteId`: the USGS station ID from AW
- `profile.thresholdSource.provider`: `american_whitewater`
- `profile.thresholdSourceStrength`: usually `community` unless the range is agency-published or independently corroborated
- `sourceLinks`: include AW reach/gauge page plus USGS monitoring location and any DNR/county/NPS route/access source

This lets the app show live USGS trend charts while labeling the runnable range as American Whitewater evidence.

Wisconsin River Trips follows the same split when it is the best route-specific range source: USGS remains the live reading source, while `thresholdSource.provider` should be `wisconsin_river_trips`.

Wisconsin Trail Guide follows the same split when its segment PDFs provide the cleanest route-specific minimums or range ladders: USGS remains the live reading source, while `thresholdSource.provider` should be `wisconsin_trail_guide`.
