# River Gallery Image Sourcing

Last reviewed: 2026-04-14

This document tracks image leads for the river gallery with a rights-first workflow.

## Working rules

- Do not add anything to `src/data/route-gallery.ts` until the image has a recorded rights decision.
- Prefer federal sources first.
- Treat Minnesota DNR pages as discovery sources unless we receive explicit permission.
- For NPS assets, verify the asset-level metadata before use. Page-level placement on `nps.gov` is not enough by itself.

## Rights baseline

- Minnesota DNR says material it created is protected by copyright and permission is required for publication on other websites or in other media: [Disclaimers, Legal Notices and Policies](https://www.dnr.state.mn.us/aboutdnr/disclaimers_and_policies.html)
- NPS says many assets are usable, but you must check each image's `Copyright`, `Photo Credit`, and `Constraints Information` metadata before reuse: [Discover and Explore the National Trails System Digital Assets](https://www.nps.gov/articles/000/discover-and-explore-the-national-trails-system-digital-assets.htm)
- NPS also states that obtaining a copy does not itself grant publication rights when third-party rights apply: [Copyright & Restrictions](https://www.nps.gov/articles/000/copyright-restrictions.htm)

## Ready-to-ingest NPS assets

These three assets are now safe enough to use for `st-croix-river-fox-highway-70` and have been ingested into the app as local files under `public/gallery/st-croix-river-fox-highway-70/`.

| River slug | Asset title | Asset detail | Local file | Credit | Constraints | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `st-croix-river-fox-highway-70` | `Vantage` | [AssetDetail/2bea6311-0076-445b-b825-f9d47afcab97](https://npgallery.nps.gov/AssetDetail/2bea6311-0076-445b-b825-f9d47afcab97) | `public/gallery/st-croix-river-fox-highway-70/vantage.jpg` | `NPS / Pete Wintersteen` | `Public domain: Full Granting Rights` | Description says this is the deep Dalles of the St. Croix River with high cliffs. |
| `st-croix-river-fox-highway-70` | `Bluffs with Branches` | [AssetDetail/b1fe56f8-c83c-4be8-a525-16646169e720](https://npgallery.nps.gov/AssetDetail/b1fe56f8-c83c-4be8-a525-16646169e720) | `public/gallery/st-croix-river-fox-highway-70/bluffs-with-branches.jpg` | `NPS / Pete Wintersteen` | `Public domain: Full Granting Rights` | Description says this is a view of the Osceola Bridge from the Osceola Bluffs on the St. Croix. |
| `st-croix-river-fox-highway-70` | `Lower Lake` | [AssetDetail/233b29bc-ce20-4895-a951-57d9f5cebd8d](https://npgallery.nps.gov/AssetDetail/233b29bc-ce20-4895-a951-57d9f5cebd8d) | `public/gallery/st-croix-river-fox-highway-70/lower-lake.jpg` | `NPS / Pete Wintersteen` | `Public domain: Full Granting Rights` | Scenic St. Croix bend. Less reach-specific than Marshland, but clearly tied to the riverway. |
| `namekagon-river-big-bend-trego` | `Namekagon Mirror` | [AssetDetail/a103fb54-93c2-4db7-bf30-4d141943d8b3](https://npgallery.nps.gov/AssetDetail/a103fb54-93c2-4db7-bf30-4d141943d8b3) | `public/gallery/namekagon-river-big-bend-trego/namekagon-mirror.jpg` | `NPS Photo / Pete Wintersteen` | `Public domain: Full Granting Rights` | Exact river match from the Saint Croix National Scenic Riverway collection. Not exact launch-to-takeout framing, but clearly the correct river and suitable for the route gallery. |
| `mississippi-river-east-river-flats-hidden-falls` | `Mississippi River and Minneapolis skyline` | [FWS media page](https://www.fws.gov/media/mississippi-river-and-minneapolis-skyline) | `public/gallery/mississippi-river-east-river-flats-hidden-falls/minneapolis-skyline.jpg` | `Tom Koerner/USFWS` | `Public Domain` | Good river-and-city match for the East River Flats portion of the route. Stronger river match than Hidden Falls-specific match. |
| `minnesota-river-henderson-belle-plaine` | `Minnesota River at Minnesota Valley Refuge` | [FWS media page](https://www.fws.gov/media/minnesota-river-minnesota-valley-refuge) | `public/gallery/minnesota-river-henderson-belle-plaine/minnesota-valley-refuge.jpg` | `Debbie Koenigs/USFWS` | `Public Domain` | Correct river and lower-valley character, but weaker exact-reach match than the St. Croix and Namekagon assets. Caption should stay broad. |

## Initial queue

| River slug | Reach | Candidate source | Why it matches | Rights status | Recommendation |
| --- | --- | --- | --- | --- | --- |
| `st-croix-river-fox-highway-70` | Fox Landing to Highway 70 | [St. Croix Marshland](https://www.nps.gov/sacn/planyourvisit/marshland.htm) | Exact stretch match. The page explicitly covers the area between Riverside Landing and Highway 70 and references the Kettle River slough and marshland district. | Promising, but asset metadata still must be checked. | Best current target. Pull candidate images from NPS/NPGallery only after metadata review. |
| `st-croix-river-fox-highway-70` | Fox Landing to Highway 70 | [River Road](https://www.nps.gov/sacn/planyourvisit/riverroad.htm) | Same riverway corridor near Highway 70 with river-specific scenic imagery and NPS credit. | Promising, but asset metadata still must be checked. | Secondary St. Croix option. |
| `st-croix-river-fox-highway-70` | Fox Landing to Highway 70 | [Paddling The Riverway](https://www.nps.gov/thingstodo/paddlingtheriverway.htm) | St. Croix-specific paddling page with on-water imagery. Less reach-specific than Marshland, but still on-river and agency-owned. | Promising, but asset metadata still must be checked. | Use only if exact Marshland assets do not fit the composition you need. |
| `cannon-river-welch` | Cannon Falls to Welch | [Cannon River virtual tour](https://www.dnr.state.mn.us/state_water_trail/virtual_tour/cannon_river/snapshot.html) | Exact route coverage. Includes Miesville Ravine County Park to Welch and bluff-lined Welch imagery. | Not free to reuse by default. DNR permission required. | Good discovery source. Do not ingest without permission. |
| `cannon-river-welch` | Cannon Falls to Welch | [Recommended paddling trips: Cannon River](https://www.dnr.state.mn.us/watertrails/recommended/cannon.html) | Exact recommended trip from Cannon Falls with Welch option on the same page. | Not free to reuse by default. DNR permission required. | Good fallback lead if DNR grants reuse. |
| `blue-earth-river-rapidan-county-road-90` | Rapidan Dam Park to County Road 90 | [Blue Earth River segments and maps](https://www.dnr.state.mn.us/watertrails/blueearthriver/segments-maps.html) | Exact route match. The page names Rapidan Dam Park to County Road 90 and includes Blue Earth River paddling photos. | Not free to reuse by default. DNR permission required. | Strong discovery source, but blocked on permission. |
| `kettle-river-lower-kettle-5-to-6` | #5 trailer access to #6 trailer access | [Kettle River segments and maps](https://www.dnr.state.mn.us/watertrails/kettleriver/segments-maps.html) | Exact route match. The page names `#5 trailer access to #6 trailer access` and includes Kettle River imagery. | Not free to reuse by default. DNR permission required. | Strong discovery source, but blocked on permission. |
| `root-river-lanesboro-peterson` | Lanesboro to Peterson | [Root River segments and maps](https://www.dnr.state.mn.us/watertrails/rootriver/segments-maps.html) | Same river corridor, same map segment, and paddling photos tied to the Root River system. | Not free to reuse by default. DNR permission required. | Good discovery source. If used later, favor photos from the upper segment around Lanesboro/Whalan/Peterson. |
| `root-river-rushford-houston` | Rushford to Houston | [Root River segments and maps](https://www.dnr.state.mn.us/watertrails/rootriver/segments-maps.html) | Exact recommended day trip on the page, plus route-specific Root River imagery for the lower segment. | Not free to reuse by default. DNR permission required. | Good discovery source, but blocked on permission. |

## Next 10 slugs

| River slug | Reach | Candidate source | Why it matches | Rights status | Recommendation |
| --- | --- | --- | --- | --- | --- |
| `straight-river-faribault` | Krogh's Landing to Faribault | [Cannon River state water trail](https://www.dnr.state.mn.us/watertrails/cannonriver/index.html) | Minnesota DNR treats the Straight as part of the Cannon water-trail map set around Dundas and Faribault. | Not free to reuse by default. DNR permission required. | Use DNR as a discovery source only until permission is granted. |
| `root-river-parsley-moens` | Parsley Bridge to Moen's Bridge | [Root River segments and maps](https://www.dnr.state.mn.us/watertrails/rootriver/segments-maps.html) | Exact recommended day trip appears on the DNR page. | Not free to reuse by default. DNR permission required. | Strong discovery source if Root permission is granted. |
| `root-river-moens-whalan` | Moen's Bridge to Whalan | [Root River segments and maps](https://www.dnr.state.mn.us/watertrails/rootriver/segments-maps.html) | Exact recommended day trip appears on the DNR page. | Not free to reuse by default. DNR permission required. | Strong discovery source if Root permission is granted. |
| `wolf-river-lily-hollister` | Lily to Hollister | No clean government-image source confirmed yet | I did not find a clearly attributable public-agency image source tied to this exact Wolf River reach in this pass. | Unclear. | Hold for a second research pass focused on Wisconsin public agencies or county parks. |
| `white-river-maple-ridge-highway-112` | Maple Ridge to Highway 112 | No clean government-image source confirmed yet | I did not find a clearly attributable public-agency image source tied to this exact White River reach in this pass. | Unclear. | Hold for a second research pass focused on Wisconsin public agencies or county parks. |
| `red-cedar-river-menomonie-dunnville` | Menomonie to Dunnville | No clean government-image source confirmed yet | I did not find a clearly attributable public-agency image source tied to this exact Red Cedar reach in this pass. | Unclear. | Hold for a second research pass focused on Wisconsin public agencies or county parks. |
| `namekagon-river-big-bend-trego` | Big Bend to Trego | [Namekagon River map set](https://www.nps.gov/sacn/planyourvisit/upload/Map_1_Namekagon_Dam_to_Hayward_2023_Legal_508-2.pdf) and NPGallery park portal [SACN](https://npgallery.nps.gov/SACN) | Federal source. Namekagon is part of Saint Croix National Scenic Riverway and NPGallery includes Namekagon-tagged public-domain imagery. | Cleared for one asset; more review needed for additional coverage. | `Namekagon Mirror` is now ingested. Keep searching for a second scenic river-level asset before expanding this gallery further. |
| `rum-river-martins-north-county-park` | Martin's Landing to North County Park | [Rum River segments and maps](https://www.dnr.state.mn.us/watertrails/rumriver/segments-maps.html) | Minnesota DNR route page covers the Rum River trail system and associated paddling imagery. | Not free to reuse by default. DNR permission required. | Good discovery source, blocked on permission. |
| `rum-river-walbo-cambridge-west` | Walbo to Cambridge West | [Rum River segments and maps](https://www.dnr.state.mn.us/watertrails/rumriver/segments-maps.html) | Same trail system and likely same DNR-managed photo pool. | Not free to reuse by default. DNR permission required. | Good discovery source, blocked on permission. |
| `sauk-river-eagle-miller-landing` | Eagle Park to Miller Landing | [Sauk River segments and maps](https://www.dnr.state.mn.us/watertrails/saukriver/segments-maps.html) | Exact Sauk River trail coverage with route photos. | Not free to reuse by default. DNR permission required. | Good discovery source, blocked on permission. |

## Blocked candidate

| River slug | Candidate source | What I found | Why it is blocked |
| --- | --- | --- | --- |
| `mississippi-river-east-river-flats-hidden-falls` | [Hidden Falls Regional Park](https://www.nps.gov/places/hidden-falls-regional-park.htm), [Navigating Portages, Locks, and Dams](https://www.nps.gov/miss/planyourvisit/navigating-portages-locks-and-dams.htm), and NPGallery park portal [MISS](https://npgallery.nps.gov/MISS) | Exact-route NPS pages exist and use route-relevant imagery, but I did not find a matching `MISS` NPGallery asset record with clean rights metadata tied tightly enough to `East River Flats` or `Hidden Falls`. I did find a separate USFWS public-domain skyline image that is now usable for this route, but Hidden Falls-specific asset-level sourcing is still open. | Route now has one usable public-domain image, but the exact-route NPS asset gap is still unresolved. |

## Recommended next actions

1. Start with `st-croix-river-fox-highway-70` because NPS gives us the cleanest path to publishable imagery.
2. Open the matching NPS asset records in NPGallery and record:
   - asset URL
   - download URL
   - caption
   - credit line
   - copyright field
   - constraints field
3. For Minnesota DNR, send one permission request that lists the specific pages and the intended use on PaddleToday.
4. Only after either NPS metadata clears or DNR permission is granted should we populate `src/data/route-gallery.ts`.

## Proposed intake fields

When we approve an image, record these fields before adding it to the app:

- `riverSlug`
- `sourcePageUrl`
- `sourceAssetUrl`
- `downloadUrl`
- `caption`
- `alt`
- `credit`
- `rightsDecision`
- `rightsNotes`
- `reviewedOn`
