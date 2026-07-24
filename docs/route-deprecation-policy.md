# Route deprecation policy

Corridor grouping is not route deletion. Existing trip options remain addressable until the replacement corridor has demonstrated safe, understandable behavior.

## Staged process

1. **Observe** — group cards and retain all route URLs; collect corridor and trip-option events.
2. **Recommend** — mark redundant records as candidates with a canonical corridor and preserve redirects/links.
3. **Deprecate** — only after two review cycles show no safety/access regressions and trip-option selection remains healthy. Keep the record in the API snapshot for compatibility.
4. **Archive** — remove from discovery only after ownership, analytics, SEO, favorites, and inbound-link checks pass. Never remove the underlying trip option without an explicit replacement.

## Required gates

- continuity status is `verified` or the product copy clearly says `partial`/`condition-family`;
- all access points and hazards have a current review owner;
- corridor-to-trip click-through and route-detail opens do not materially regress against the pre-group baseline;
- no unresolved favorite, share, guide, or search-index references point only to the deprecated record.
