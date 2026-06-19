# Route Safety Policy

PaddleToday route data is a planning aid, not safety advice. The safest product behavior is to reject or block high-consequence routes before they reach users, then make remaining hazards visible.

## Hard Rejection Or Block Rules

Do not add or promote a route when any of these are unresolved:

- A missed take-out could send paddlers into a dam, low-head dam, diversion, or other high-consequence hazard.
- A mandatory take-out or portage is dam-adjacent and lacks strong official safety infrastructure, signage, and source-backed guidance.
- Public access legitimacy is unclear, including uncertain launch rights, parking, private-bank conflicts, or closed facilities.
- The route depends on an active closure being resolved.
- The selected live gauge is unsupported, stale, or too indirect for the current product.
- Numeric gauge thresholds are missing or not tied to the selected gauge.
- Endpoint coordinates are inferred from river geometry, bridge names, or broad park boundaries instead of source-backed access points.

Prefer rejection or `blocked_until_date` over warning copy when the route failure mode is severe.

## Warning Taxonomy

Use `safetyProfile` for routes that remain useful but need visible safety context.

- `standard`: normal paddling checks still apply.
- `caution`: the route has hazards or access considerations that require extra verification.
- `advanced`: the route has hazards that can create serious consequences if missed or misjudged.

Hazard tags:

- `dam`
- `low_head_dam`
- `mandatory_takeout`
- `strainers`
- `whitewater`
- `fast_rise`
- `cold_water`
- `remote`
- `urban_water_quality`
- `dam_release`
- `access_uncertain`
- `private_banks`

## Review Expectations

For every reviewed caution or advanced route, record:

- The hazard tags that explain why the warning exists.
- Plain-language safety notes that a paddler can act on before launching.
- Source support in route evidence, source links, or the candidate ledger.

Do not use `safetyProfile` to make an unacceptable route acceptable. If a route requires a precise safety maneuver, such as a mandatory take-out above a dam, only include it when official route managers clearly document the access, signage, portage/take-out behavior, and public-use status.

## Legal Review Note

The product terms and warnings should be reviewed by an attorney familiar with outdoor recreation, consumer apps, and the states where PaddleToday operates. This policy is an engineering and product safety standard, not legal advice.
