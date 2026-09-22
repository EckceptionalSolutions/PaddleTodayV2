# Batch 64 — Lindley Road Tioga River hand launch

Reviewed 2026-09-18. The suspicious route start was about 429 feet from matched and mapped water, with NHD's nearest named line identified as Morgan Creek. The NYSDEC Boat Launch Sites GIS feature 636 identifies the hand launch on the Tioga River at `42.02862938890519,-77.13218453514816`; the state directory independently describes the Lindley Road hand launch near the Village of Lindley and lists parking for 15 cars.

Moved the put-in 2,040 feet to the NYSDEC feature point. Refreshed hydrography now matches the named Tioga River, places the point 41 feet from mapped water and 125 feet from the flowline, and reports no source issues. The endpoint now audits as review because the GIS site point is not a survey of the exact wet toe.

Evidence: [NYSDEC Boat Launch Sites feature 636](https://services6.arcgis.com/DZHaqZm9cxOD4CWM/arcgis/rest/services/Boat_Launch_Sites/FeatureServer/4/query?objectIds=636&outFields=*&returnGeometry=true&outSR=4326&f=pjson), [New York State boating launch directory](https://parks.ny.gov/documents/recreation/boating/2018NYSBoatLaunchingSitesBooklet.pdf), and [USGS Tioga River at Lindley](https://waterdata.usgs.gov/monitoring-location/01520500/).

The public audit now has 60 suspicious endpoints (down from 61), and the full inventory has 114 (down from 115). Public endpoints within 100 feet of mapped water rose by one to 4,715, and endpoints over 300 feet away fell by one to 183. See `review.json`, `source-metadata.json`, and before/after reports for the complete decision record.
