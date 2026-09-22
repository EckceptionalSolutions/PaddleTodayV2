# George D. Syas WMA launch correction

This follow-up applies the [access point remediation runbook](../../access-point-remediation-runbook.md) to the George D. Syas WMA point already identified at rank 276 in the earlier cached audit. It is supplemental, not a new ten-site public-route batch: all three dependent routes were already withheld when reviewed.

## Decision

Fix the put-in from the WMA property representative point to NGPC's mapped Paddlecraft Launch feature for George D. Syas WMA: **41.42442894, -97.6963078**. The feature identifies the Loup River, marks `ShoreLaunch=Yes`, and records the launch as open. It also warns that this is a non-designated, unmaintained ramp with a long walking path, so the route notes preserve those limits and tell paddlers to verify current conditions on site.

The old coordinate remains documented as the WMA property area anchor. Fresh geometry review found one safe route to release: Syas–Monroe is a single continuous network trace with a 193-foot maximum endpoint snap. Syas–Columbus and Syas–ADM produced disconnected named-flowline fallback pieces with a 55,652-foot maximum snap, so both remain withheld. The review files in `geometry-review/` preserve all three generated traces; only the validated Monroe geometry is served.

## Process

1. Checked the official Nebraskaland trail account, the City of Columbus trail announcement, NGPC's current Water Trails and Public Access Atlas material, and the NGPC trip-planner PDF. The City/PDF directions locate Monroe, while Nebraskaland says the WMA uses an existing fishing access rather than a newly built trail facility.
2. Followed the official Water Trails page into NGPC's interactive trails map, read its operational web-map layer configuration, and queried the `Paddlecraft Launch` FeatureServer for `Paddle_AreaName LIKE '%Syas%'`.
3. Verified feature OBJECTID 97 / GlobalID `b88540d4-96d4-4d74-9fed-473304b6e2f7`: `Paddle_Waterbody=Loup River`, `ShoreLaunch=Yes`, `Paddle_Lat=41.42442894`, `Paddle_Long=-97.6963078`, `Ramp_Status=Open`, `AccessType=Non-designated Ramp (not maintained)`, and a site note about a long walking path. Its mapped status was last edited November 19, 2025.
4. Compared the new launch feature with the former point in the official WMA polygon. They are about 4,539 feet apart; the former point remains an area anchor and was not used to infer the new launch.
5. Corrected all three shared put-in records and trip notes, added the feature as an authoritative water-entry control, then generated and inspected all three route traces. Released only Syas–Monroe and retained manual holds for Syas–Columbus and Syas–ADM.

See [selection.json](selection.json), [review.json](review.json), [source-metadata.json](source-metadata.json), and [validation.json](validation.json).
