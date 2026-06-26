# Mobile Route Preview Consistency

## Audit Summary

PaddleToday currently uses several route preview shapes:

- Today hero: one recommended route with score, rating/verdict, reach, and a short reason.
- Today carousel and compact rows: image-led or row previews with score, condition, reach, drive/location context, route count, and trip facts.
- Explore drawer: selected route preview with pinned actions, map-specific drive/gauge context, and scrollable route details.
- Weekend: planning card with photo, weekend score, forecast risk, travel context, and trip facts.
- Saved: full route cards grouped by ready/watch/skip, plus alert setup rows.
- River hub: comparison cards for multiple reaches on the same river.

The useful pattern is not one identical card everywhere. The screens have different jobs. The inconsistency to avoid is each surface choosing a different order for the same core facts.

## Shared Preview Rules

Use the same route-fact priority when a preview needs compact trip context:

1. Drive time when the screen is location-aware.
2. Route distance.
3. Estimated paddle time.
4. Difficulty.
5. Camping context when useful for planning.
6. Drive distance when distinct from route distance.

Use a decision line when a preview needs a plain-language call:

`Condition: short explanation`

Examples:

- `Good: Gauge is in range and weather is mild.`
- `Fair: Runnable, but recheck levels before launching.`

## Surface Guidance

- Today should optimize for fast scanning and nearby decision-making. Keep only one primary reason plus compact facts.
- Explore should optimize for compare-and-act. Keep `Open route` and `Directions` pinned, then put route details, gauge, drive, and compare actions in the scrollable drawer body.
- Weekend should optimize for planning. Keep travel context and route facts prominent, with forecast/risk explanation separated from ordinary facts.
- Saved should optimize for monitoring. Full cards are acceptable because the user has already chosen these routes, but they should use the same fact order as Today.
- River hub should optimize for route comparison. Use the same distance/time/difficulty order as other previews.

## Implementation Notes

The shared formatting lives in `apps/mobile/src/lib/route-facts.ts`:

- `routePreviewFactItems`
- `routePreviewFactLine`
- `routeDecisionLine`

Screens should keep their visual layout local, but use these helpers for facts and decision copy unless a screen has a specific reason to diverge.
