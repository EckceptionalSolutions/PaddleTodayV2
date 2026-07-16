# Route Addition Requirements

Use this checklist when deciding whether a new Paddle Today route is ready to add.

## Minimum Standard

A route needs an official live gauge, defensible level thresholds, named and locatable public endpoints, and enough route context to make a trust-first same-day call.

## Required Inputs

### Live Gauge

Each route needs a live gauge source that is direct or a defensible proxy.

Preferred sources:

- USGS live gauge.
- MN DNR river-level gauge.
- Another official public live gauge source with stable current readings.

Best cases:

- Direct USGS gauge with recent samples for trend and charting.
- MN DNR gauge with official paddling interpretation bands.

Acceptable cases:

- Official proxy gauge when the relationship to the route is clear.
- Gauge with current-only data if the UI can explain that recent chart samples are unavailable.

Not enough:

- Endpoint names alone.
- Anecdotal "good after rain" guidance without a numeric gauge relationship.
- A gauge that cannot be tied to the route reach.

### Level Guidance

Each route needs numeric level guidance tied to the selected gauge.

Acceptable threshold support:

- Official MN DNR river-level bands.
- American Whitewater gauge ranges when the route and gauge relationship match the app route.
- Wisconsin Trail Guide suggested river levels when the PDF route and selected gauge align.
- Wisconsin River Trips depth or gauge guidance when it is route-specific and numeric enough to calibrate conservatively.
- MilesPaddled same-route gauge notes when they identify a concrete runnable level or low-water floor.
- Published numeric paddling range from a credible source.
- Clear low-water floor from a credible route source.
- Strong same-gauge local route evidence that supports a conservative range.

Threshold models:

- `two-sided`: preferred range plus low and high bounds. Use this when both low and high sides are defensible.
- `minimum-only`: low-water floor only. Use this when the route is scoreable, but the upper or ideal range is not well supported.

Minimum-only routes must stay conservative:

- Cap upside below a full strong-day call.
- Withhold longer outlooks when the source trail is too thin.
- Ask for paddler reports to improve calibration.

### Endpoints

Each route needs named put-in and take-out points with enough confidence to locate and verify them.

Minimum:

- Named put-in.
- Named take-out.
- Enough map or source context to determine where they are.

Coordinates:

- Required for at least the put-in before a route ships.
- Strongly preferred for both endpoints.
- If official endpoint names are unambiguous, coordinates may be derived during route work, but should not remain missing.

### Access Points

Each new implemented route should include `riverTripDetails[slug].accessPoints` whenever the route has coordinate-backed endpoints.

Minimum:

- Include the default put-in as `mileFromStart: 0`.
- Include the default take-out at the route distance.
- Use the same verified coordinates as `putIn` and `takeOut` unless a better source-backed launch or landing coordinate is available.
- Add intermediate public accesses, bailout points, camps, or split points only when they are source-backed and coordinate-backed.

Why this matters:

- Route detail pages use `accessPoints` for selectable access-planner rows when more than two planner points exist.
- Summary and group maps use `accessPoints` to draw route lines and fit map bounds.
- API clients receive the field for route planner and map behavior.

Do not add speculative points. If a map or PDF only labels a campsite or landing without enough coordinate confidence, keep that context in logistics, access caveats, watch-for notes, evidence notes, or memory instead of inventing an `accessPoints` row.

### Access Legitimacy

Endpoints should be legal and normal to use.

Acceptable support:

- Public water access.
- City, county, state, or federal park access.
- Official water trail access.
- Outfitter-supported access.
- Other clearly documented public or customary access.

Not enough:

- Roadside guesses without access support.
- Private landings unless public use is clearly documented.
- Vague "launch near town" descriptions.

### Safety Blockers

Reject or block a candidate rather than warning around it when a route has a high-consequence failure mode.

Hard blockers:

- Missing a take-out could send paddlers into a dam, low-head dam, diversion, or similar high-consequence hazard.
- A mandatory take-out or portage is dam-adjacent without strong official safety infrastructure, signage, and route-manager guidance.
- Public access legality, parking, or normal private-paddler use is unresolved.
- Endpoint coordinates are inferred from bridge names, river geometry, broad park boundaries, or a single general site coordinate.
- Active closures or flood-damage access uncertainty remain unresolved.

Warnings are appropriate only after the route itself remains defensible. Do not use warning copy to ship a route whose access, take-out, or hazard story is unsafe or ambiguous.

### Route Shape

The route must be specific enough to score.

Needed context:

- Reach name or start/end segment.
- Approximate distance, or enough map support to infer it.
- Region and state.
- Basic route character: easy, moderate, hard.
- Major hazards or operational caveats.

### Camping Classification

Every implemented route should include a `logistics.camping` note that is clear enough to classify conservatively for home and weekend filters. Do not write vague camping copy just to sound helpful; unclear support should stay out of camping filters.

Use these categories as the target vocabulary:

- `none`: no established camping, no route camping, day-use only, or camping is prohibited at relevant access points.
- `nearby_basecamp`: nearby campground, state park, county park, outfitter campground, lodging, or base-camp option that can support a trip but is not part of the paddling route.
- `endpoint_campground`: campground or legal overnight facility directly at the put-in, take-out, or named access site.
- `on_route_campsite`: designated watercraft campsite, paddle-in campsite, canoe camp, float camp, backcountry canoe campsite, or official campsite along the route corridor.
- `sandbar_or_gravel_bar`: sandbar, gravel-bar, island, or similar river-camping option where current rules and water levels explicitly support it.
- `overnight_capable`: route is naturally long enough or source-framed as an overnight/multi-day trip, with legal camping support documented.
- `unknown`: camping context is ambiguous, unverified, or only hinted at. Unknown routes should not qualify for camping filters.

Evidence expectations:

- Cite the source that supports the camping category when available: official water-trail map, park/campground page, NPS/USFS/state rules, county conservation page, or route-manager guidance.
- Distinguish on-route overnight support from nearby base-camp support. A campground near town is not the same as a route that can be split overnight.
- For sandbar, gravel-bar, or island camping, include legality, private-bank limits, flow/high-water dependency, and any trash, fire, permit, or stay-limit rules surfaced by the source.
- If camping is prohibited, day-use only, private, unconfirmed, or depends on separate permission, say that plainly.
- If the route can work as a day trip but has a separate camping option, write the note so it does not imply camping is included in the normal route plan.

## Provider-Specific Notes

### USGS

USGS is the best fit when the route needs full trend/chart behavior.

USGS usually supports:

- Current reading.
- Timestamp.
- Unit.
- Recent samples.
- 24h delta.
- Trend.
- Chart rendering.

### MN DNR

MN DNR is first-class for Minnesota routes when it has an official river-level site for the route gauge.

MN DNR supports:

- Current reading.
- Timestamp/freshness.
- Unit.
- Official paddling interpretation: Scrapable, Low, Medium, High, Very High.
- Official level bands.

MN DNR does not currently provide chart-quality recent samples through the public JSON feed used by the app. Do not fake chart samples. For DNR current-only routes, show the current-level panel and link to DNR gauge detail.

### Wisconsin Sources

Wisconsin routes usually still use USGS for the live gauge. The Wisconsin-specific sources we have added are primarily threshold, route-character, and access sources. Treat them as adapters for scoring evidence, not as live gauge feeds, unless a future source exposes a stable official current-reading API.

Use this split:

- Live gauge: USGS, preferably direct and same-reach.
- Threshold source: Wisconsin Trail Guide, Wisconsin River Trips, American Whitewater, MilesPaddled, or another credible source with numeric guidance tied to the selected gauge.
- Supplemental route source: Wisconsin DNR, NPS, city/county park pages, water trails, local access pages, or wastewater/overflow agencies when they clarify access, hazards, seasonality, or water-quality caveats.

Wisconsin DNR is valuable for:

- Official water trail or state forest context.
- Public access and landing confirmation.
- Route character, seasonality, and safety language.
- River-specific cautions such as fast rises, strainers, cold water, or regulated sections.

Wisconsin DNR is not enough by itself when it does not provide numeric gauge thresholds. Pair it with USGS live data and a numeric threshold source before adding the route.

Current Wisconsin threshold-source adapters:

- `american_whitewater`: best for whitewater or swiftwater reaches with published gauge ranges. Use only when the AW reach matches the app reach closely enough.
- `wisconsin_trail_guide`: good for PDF guide segments with suggested river levels and route-mile detail.
- `wisconsin_river_trips`: good for route-specific depth guidance, access notes, hazards, and water-quality caveats.
- `miles_paddled`: useful when it gives a same-route gauge note, concrete minimum, or observed level. Use conservatively if it only gives one trip-day level.

When Wisconsin evidence is mixed, prefer a conservative scoring posture:

- Use `two-sided` only when both the low and high sides are defensible.
- Use `minimum-only` when the source only supports a low-water floor.
- Cap confidence when the source gives one observed trip level rather than a full published range.
- Add route messaging for swiftwater, whitewater, urban water quality, dams, strainers, informal access, or take-out uncertainty.

### Whitewater And Swiftwater Routes

Routes that are whitewater or advanced moving water should be explicitly marked in route data with `routeType: 'whitewater'`.

Tag a route this way when it has any of the following:

- American Whitewater as a primary threshold source.
- Class II or higher features that are central to the route decision.
- Continuous swiftwater where casual paddlers could reasonably misunderstand the risk.
- Urban swiftwater, ledges, dam-adjacent hazards, boulder gardens, or fast post-rain rises that make the route unsuitable for casual Explore discovery.

Do not rely on `difficulty: 'hard'` as the whitewater filter. Some hard routes are not whitewater, and some whitewater-ish routes can still be moderate. `difficulty` describes route effort and consequence; `routeType` controls default discovery.

Whitewater route behavior:

- Default map and Explore views should hide `routeType: 'whitewater'`.
- Users must explicitly select whitewater or all route types to see those routes.
- When shown, cards should visibly label the route as whitewater.
- Route copy should include skill and hazard messaging, not just a score.

## Route Readiness Decision

Ready to add:

- Live official gauge is configured.
- Thresholds are numeric and tied to that gauge.
- Endpoints are named and locatable.
- Access appears public or otherwise legitimate.
- Route difficulty, seasonality, and hazards are documented.
- High-consequence hazards have either been ruled out or are documented with route-manager support and explicit user-facing safety notes.

Ready, but conservative:

- Live gauge exists.
- Low-water floor is defensible.
- Upper range or ideal band is not defensible yet.
- Use `minimum-only` and clearly ask for paddler reports.

Not ready:

- No live gauge.
- Gauge cannot be tied to the route.
- No numeric level guidance.
- Endpoints cannot be located.
- Access appears private or uncertain.
- Route is too vague to score as a specific reach.
