# Batch 63 — Tailwater East Boat Ramp

Reviewed 2026-09-18. The suspicious put-in was stored at the Tailwater East campground-area coordinate, about 642 feet from the named Iowa River flowline and 437 feet from mapped water. USACE's public recreation GIS has a specifically named Tailwater East Boat Ramp point with one concrete launch lane. USACE boating guidance and Recreation.gov both confirm the campground ramp accesses the Iowa River below Coralville Dam.

Moved the route put-in and its intermediate access point 1,677 feet to the USACE ramp feature at `41.720904434727316,-91.52874403208878`. Refreshed hydrography places the new point 19 feet from mapped water and 133 feet from the named river flowline, with no source issues in the targeted check. It now audits as review because the mapped ramp point is not a surveyed wet toe.

Evidence: [USACE public recreation GIS feature 3079](https://services7.arcgis.com/zs4WYlTH7ZX0t6Fs/ArcGIS/rest/services/USACE_Final_Data/FeatureServer/0/query?objectIds=3079&outFields=*&returnGeometry=true&outSR=4326&f=pjson), [USACE Coralville boating guidance](https://www.mvr.usace.army.mil/coralvillelake/recreation/boating-swimming/), and [Recreation.gov Tailwater East description](https://www.recreation.gov/camping/campgrounds/156340).

The public audit now has 61 suspicious endpoints (down from 62); the full inventory has 115 (down from 116). Public endpoints within 100 feet of mapped water rose by one to 4,714, and endpoints over 300 feet away fell by one to 184. See `review.json`, `source-metadata.json`, and before/after reports for the complete decision record.
