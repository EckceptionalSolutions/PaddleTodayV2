# Ten-site access review — September 17, 2026

The frozen ten public-route sites are all documented in [selection.json](selection.json) and [review.json](review.json). Two existing access-area anchors were kept. Four optional/intermediate access records were removed because the evidence did not establish a lawful public water entry at the stored point. Four selected terminal sites were rejected or left unverified and their dependent routes are held. A separate related review also holds the Boysen route until its Fremont Bay ramp is located. No coordinate in the frozen ten was changed.

While reviewing the same Logan Creek route, the current Nebraska Game and Parks public-launch layer supplied source points for Bancroft and Oakland. Those two access records were corrected in the [Logan Creek follow-up](logan-follow-up/README.md); Pender remains unresolved, so the route stays held.

| Site | Decision | Publication action |
| --- | --- | --- |
| Boundary Creek / Saddle Pass | Reject: unverified | Hold Boundary Creek route |
| Fremont Bay / Lakeside shoreline turnaround | Reject: unverified optional access | Remove waypoint; hold Boysen route on its unresolved ramp endpoint |
| Glendo Sandy Beach | Reject: invalid town gateway | Hold Glendo route; no replacement guessed |
| South Hill / High Tor | Reject: not a verified boat entry | Remove optional access record; retain turnaround prose |
| MD 136 / Priestford | Reject: invalid stored coordinate, replacement unresolved | Hold Deer Creek route |
| County Road 4 / St. Louis River | Keep | Preserve official bridge/carry anchor |
| Pender / Logan Creek | Reject: unverified exact entry | Hold Logan Creek route |
| Orchard Creek / Cedar River | Keep | Preserve DNR map-derived access-area anchor |
| York Road / Gunpowder Falls | Reject: unverified water entry | Remove optional record; route remains independently valid |
| Highway 39 / Mineral Point Branch | Reject: unverified public approach | Remove optional record; route remains independently valid |

The review retained source records and earlier holds. It did not clear every endpoint on routes that remain public. No deployment or catalog-wide publication clearance is claimed.

The source links, retrieval notes, before-file hashes, and cache evidence hashes are in [source-metadata.json](source-metadata.json) and [before-file-hashes.json](before-file-hashes.json). Run the Logan source/occurrence check with `node logan-follow-up/verify.mjs`. Follow the [step-by-step runbook](../../access-point-remediation-runbook.md) for the repeatable process. Validation results and the current dependency blocker are recorded in [validation.json](validation.json).
