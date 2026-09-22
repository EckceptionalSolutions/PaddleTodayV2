# Access-audit failure triage

Reviewed September 18, 2026 after the full public-route audit flagged four access coordinates as `failure`. This pass separated source-confirmed site anchors from an unsupported route endpoint instead of moving pins toward the nearest hydrography feature.

| Site | Audit finding | Evidence and action |
| --- | --- | --- |
| Sunken Meadow Field 3, Nissequogue River (NY) | 3,176 ft from the named Nissequogue flowline; NYSDEC lists this exact coordinate as a hand launch. | Keep the official access-area anchor. The control says `Nissequogue River / Long Island Sound`; the audit previously compared that composite label as one name and ignored the control. It now matches the exact waterbody component and reports `review`. No coordinate move. |
| Laurel Hill State Park Beach Area (PA) | 2,257 ft from the Laurel Hill Creek flowline; DCNR confirms a canoe/kayak launch in the Beach Area on Laurel Hill Lake and a six-mile water trail to King's Covered Bridge. | Keep the park-area anchor and its access caveat. The control says `Laurel Hill Lake / Laurel Hill Creek`; the audit now matches the exact creek component and reports `review`. The coordinate is not represented as a surveyed shoreline point. |
| Whipple Field (RI) | 1,297 ft from the mapped Woonasquatucket flowline; nearest mapped water is within 300 ft. | WRWC's paddling guide identifies Whipple Field as a put-in or take-out and describes the river's low bank there. Added an authoritative access-area control with 300-ft uncertainty; the audit now reports `review`, retaining the need to verify the exact landing. |
| Center Rutland start (VT) | 2,602 ft from the matched Otter Creek flowline; the stored coordinate did not match an official state fishing-access feature. | Added a route hold. Vermont Fish & Wildlife's access layer lists Otter Creek sites elsewhere, while FERC describes two public informal tailwater trails near the dam. Neither source ties the stored coordinate to a lawful launch. Reopen only after confirming the intended entry, parking/carry and dam boundary, then regenerate and review the long reach. |

## Audit change

`nearestOfficialAccessControl` now splits exact named components in compound waterbody labels separated by `/`, `;`, or `|`. It does not treat the whole composite as a new waterbody name. The Nissequogue and Laurel Hill route-scoped audits confirmed their access controls are recognized, and the Whipple Field route-scoped audit confirmed the new control. These outcomes are `review`, not `ok`: public site evidence explains the access-area pin, but none of these pins is claimed to be a surveyed water-entry toe.

The completed public audit now covers 2,755 routes and 6,068 endpoints, with zero `failure`-severity endpoints. It retains 78 unknown severity outcomes, 74 unknown water-proximity results, and 276 truncated NHD responses; see [validation.json](validation.json) for the complete counts and checks.

## Sources

- [NYSDEC Suffolk County boat-launch directory](https://dec.ny.gov/things-to-do/boating/launch-sites/boat-launch-suffolk) lists the Sunken Meadow State Park Field 3 hand launch and its coordinates.
- [Pennsylvania DCNR Laurel Hill State Park boating accessibility](https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/laurel-hill-state-park/accessibility) identifies the ADA kayak launch in the Beach Area; the [park guide](https://elibrary.dcnr.pa.gov/PDFProvider.ashx?PromptToSave=False&Size=3877924&ViewerMode=2&action=PDFStream&docID=1753189&docName=LAHI_ParkGuide&nativeExt=pdf&overlay=0&revision=0) describes the six-mile water trail.
- [Woonasquatucket River Watershed Council paddling guide](https://wrwc.org/wp/wp-content/uploads/2020/05/completePaddlingGuide.pdf) describes Whipple Field as a put-in/take-out and its low river bank.
- [Vermont Fish & Wildlife fishing-access map](https://anrmaps.vermont.gov/arcgis/rest/services/Open_Data/OPENDATA_ANR_TOURISM_SP_NOCACHE_v2/MapServer/163) is the official feature layer queried for Otter Creek access areas. The [Center Rutland FERC project file list](https://elibrary.ferc.gov/eLibrary/filelist?accession_number=20240424-3019) links the environmental assessment describing the separate informal north- and south-bank tailwater paths.

The Center Rutland route remains in the inventory and is withheld pending a source-backed endpoint. No other route record was deleted, and no deployment was performed.
