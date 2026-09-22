# Erie Canal discovery and scoring review — September 20, 2026

## Changes

- Mobile Explore and Home route search now request the full public Explore catalog. Home recommendations retain the scored summary feed.
- A missing score snapshot does not hide planning routes or create a current-condition call. Home search has explicit loading and retry states.
- Web search indexes individual public planning routes as well as river groups.
- Web and mobile river hubs describe planning-only groups without promising live scores. Web counts distinguish scored and planning routes.
- Mobile browser fixtures support both catalog and summary requests; a dedicated regression serves Erie Canal only through the catalog.

## Scoring decision

No Erie Canal route was promoted. This review found gauge candidates, but no documented numerical paddling range tied to the specific catalog reaches. A nearby station or a station's historical flow distribution does not supply that missing evidence.

| Area | Gauge candidate | Remaining evidence gap |
| --- | --- | --- |
| Rochester / western canal | USGS 04218700, Erie Canal west of Genesee River at Rochester | Reach and managed-pool applicability; published paddling thresholds for Fairport/Brockport routes |
| Seneca River / central canal | USGS 04237496, Seneca River near Baldwinsville | Threshold source and applicability across the individual lock-controlled reaches |
| Little Falls / Mohawk | USGS 01347000, Mohawk River near Little Falls | Station is below Fivemile Dam; no defensible transfer of a runnable range to the catalog's canal routes |

USGS describes the Little Falls station as 1,800 feet below Fivemile Dam, with daily fluctuations from powerplants, locks and dams, and regulation by Delta and Hinckley reservoirs. Its readings are useful context, but do not by themselves establish canal reach suitability.

Official Erie Canalway safety guidance distinguishes the protected dug canal from river/lake segments and directs paddlers to navigation notices for closures and water-level changes. Those operational checks remain necessary alongside any future flow-based scoring.

Promotion requires a cited reach-specific range with units and station identity, confirmation that the gauge represents that reach, and appropriate navigation/closure handling. Obtain that evidence from Canal Corporation, a reach operator/outfitter, or a documented paddling guide before changing eligibility; do not derive thresholds from flood stage or unrelated whitewater reaches.

Sources reviewed:

- [USGS Little Falls station and regulation remarks](https://waterdata.usgs.gov/nwis/uv?agency_cd=USGS&legacy=1&site_no=01347000)
- [USGS Rochester canal station](https://waterdata.usgs.gov/nwis/uv/?referred_module=sw&site_no=04218700)
- [USGS Seneca River station](https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=04237496)
- [Erie Canalway paddling safety](https://eriecanalway.org/explore/watertrail/safety)
- [Erie Canalway day trips](https://eriecanalway.org/explore/watertrail/paddling-trips)
- [Canal Corporation operations](https://www.canals.ny.gov/Operations-and-Public-Projects)

These are eligibility findings, not a statement of current water conditions or current navigation status. Changes are local and have not been deployed.

## Validation

- Mobile TypeScript check passed; 15 mobile query/freshness unit tests and the web search-index regression passed.
- Three existing Home/Explore browser tests passed. The new planning-discovery regression passed after explicitly selecting “Show all matching calls”: the default Paddle filter correctly excludes planning routes and now reports the catalog match instead of treating it as missing coverage.
- Public script sync, JavaScript syntax, token/style checks and shared-behavior invariants passed.
- Full repository and runtime typechecks remain blocked by existing `accessPointRole` errors in New York and unsupported source-provider values in Wisconsin, outside these discovery changes.
