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

### Route Shape

The route must be specific enough to score.

Needed context:

- Reach name or start/end segment.
- Approximate distance, or enough map support to infer it.
- Region and state.
- Basic route character: easy, moderate, hard.
- Major hazards or operational caveats.

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

## Route Readiness Decision

Ready to add:

- Live official gauge is configured.
- Thresholds are numeric and tied to that gauge.
- Endpoints are named and locatable.
- Access appears public or otherwise legitimate.
- Route difficulty, seasonality, and hazards are documented.

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

