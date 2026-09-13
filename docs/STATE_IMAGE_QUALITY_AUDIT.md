# Production state image quality audit

Audit date: 2026-09-12

Scope: the featured route cards rendered on every production state page at
[`paddletoday.com/states/`](https://paddletoday.com/states/). The state index
currently exposes 48 states. I inspected the six-card featured set on each
page (Oklahoma has four cards, Tennessee one, and Utah five): 280 card
placements in total.

The card scope follows the current state-page template in
[`src/pages/states/[state].astro`](../src/pages/states/%5Bstate%5D.astro), which
selects up to six `bestRouteCards` and renders each card’s
`getRoutePreviewPhoto` result.

## Method

For each card I recorded the rendered image URL, route title, alt text, and
browser-reported intrinsic dimensions when the image was loaded. I then
grouped cards by exact URL and compared the image description with the route
waterbody. Local Paddle Today assets were checked with image metadata. A
same-river context photo is acceptable when it is explicitly labeled as
context; a photo naming another river, lake, preserve entrance, bridge, or
generic regional scene is an image assignment defect for that card.

The live DOM is authoritative for the coverage and duplicate counts. The
worktree is used only to inspect local asset dimensions and source mappings,
because a deployment can be a small release ahead of or behind the checkout.

The audit found 119 unique image URLs across 280 placements. Fifty-seven URLs
are reused by at least two cards. Seven reuse groups span different named
waterbodies; all seven contain at least one incorrect assignment. The remaining
reuse groups are same-river repetition and are lower priority unless they also
have a quality or composition problem.

## Priority 0: replace incorrect or misleading assignments

These are the first fixes because the visible image or its alt text identifies
another waterbody, or the image is not a river scene at all.

| State page | Affected river / route cards | Current image and evidence | Recommended action |
|---|---|---|---|
| [North Dakota](https://paddletoday.com/states/north-dakota/) | Little Missouri River — `little-missouri-rough-rider-medora-bridge` | `IMG_1243.jpg`; the production alt text identifies the Sheyenne River. It is also reused on five Sheyenne cards. | Replace the Little Missouri card with a verified Little Missouri image. Keep or replace the Sheyenne image separately if route diversity is desired. |
| [West Virginia](https://paddletoday.com/states/west-virginia/) | Elk River — `wv-elk-webster-springs-clifton-ford`; Big Coal River — five `wv-big-coal-*` cards | `Greenbriar river in west Virginia.jpg`; the alt text identifies the Greenbrier River, not Elk or Big Coal. | Replace all six cards with verified Elk and Big Coal imagery; reserve the Greenbrier photo for Greenbrier routes. |
| [Oklahoma](https://paddletoday.com/states/oklahoma/) | Flint Creek — `flint-creek-us412-chewey`; Lower Mountain Fork — `lower-mountain-fork-reregulation-dam-us70`; Blue River — `blue-river-hwy7-cheadle-falls` | `USGS07196320_20200725_131504.jpg`; the image and alt text identify the Illinois River near Moodys. | Keep it only on the Illinois River card and source distinct images for the other three rivers. |
| [Utah](https://paddletoday.com/states/utah/) | Green River — two cards; Ogden River — `ogden-river-lorin-farr-crystal-wave` | `Colorado Recreational River...jpg`; the card description is a generic Colorado-Utah corridor and the source is Colorado River context. | Replace both Green River cards with Green River imagery and the Ogden card with an Ogden River image. Review the Colorado card for reach relevance. |
| [Idaho](https://paddletoday.com/states/idaho/) | Bear River — `bear-river-oneida-narrows` | `Snake River view near Twin Falls, Idaho.jpg`; alt text is generic, while the source is explicitly a Snake River view. | Replace with a Bear River / Oneida Narrows image. |
| [Missouri](https://paddletoday.com/states/missouri/) | Pomme de Terre River — `pomme-de-terre-river-outlet-cross-timbers`; Big River — `big-river-mammoth-merrill-horse`; Beaver Creek — `beaver-creek-brownbranch-bradleyville` | `james-river-springfield.jpg` (800×532); the source file and route gallery identify the James River, not any of these three rivers. | Replace all three with waterbody-specific images. Do not use the James River file as a generic Missouri fallback. |
| [Maine](https://paddletoday.com/states/maine/) | Androscoggin River — `androscoggin-river-canton-turner` | `AWWBroc/Images/7.jpg`; this is a Maine lake shoreline and is shared with the Webb Lake card. | Keep it for Webb Lake and replace the Androscoggin card with a river scene. |
| [Colorado](https://paddletoday.com/states/colorado/) | Roaring Fork River — `roaring-fork-south-gate-north-star` | `North Star Nature Preserve South Gate...jpg`; alt text describes the preserve entrance, not a river view. | Replace with a Roaring Fork river photograph. |
| [Delaware](https://paddletoday.com/states/delaware/) | Broad Creek — `broad-creek-fisher-phillips` | `Nanticoke_River_at_Vienna_MD1.jpg`; the alt text identifies the Nanticoke River in Maryland. | Replace with Broad Creek imagery. |
| [Indiana](https://paddletoday.com/states/indiana/) | Wabash River — four `wabash-river-*` cards | `white-river-kayaking-indianapolis.jpg`; path identifies the White River and alt text is only “Indiana river corridor.” | Replace with a Wabash-specific source or use an explicitly labeled Indiana regional fallback until one is available. |
| [Maryland](https://paddletoday.com/states/maryland/) | Conococheague Creek — `conococheague-creek-kemps-mill-williamsport` | `Town Creek Aqueduct.jpg`; image is a canal aqueduct beside the Potomac River. | Replace with a Conococheague Creek scene. |
| [Maryland](https://paddletoday.com/states/maryland/) | Big Pipe Creek — `big-pipe-creek-hapes-mill-double-pipe-park` | `Monocacy-monotony-Saki.JPG`; alt text identifies paddlers on the Monocacy River. | Replace with Big Pipe Creek imagery or clearly label a verified tributary-context photo. |
| [Maryland](https://paddletoday.com/states/maryland/) | Corker’s Creek Blackwater Canoe Trail — `corkers-creek-blackwater-canoe-trail` | `Pocomoke River at Snow Hill MD2.jpg`; image is identified as the Pocomoke River. | Replace with Corker’s Creek / Blackwater Canoe Trail imagery. |
| [Maryland](https://paddletoday.com/states/maryland/) | Corsica River Water Trails — `corsica-river-mill-stream-trail`, `corsica-river-yellow-bank-stream-trail` | `Blackwater River (MD).jpg`; both cards describe the Blackwater River rather than Corsica River. | Replace both with Corsica River images. |
| [Michigan](https://paddletoday.com/states/michigan/) | Prairie River — `prairie-river-prairie-lake-nottawa` | `clinton-river-macomb-county.jpg`; the source is a Clinton River image and the alt text is generic. | Replace with Prairie River imagery. |
| [Ohio](https://paddletoday.com/states/ohio/) | Cuyahoga River — `cuyahoga-river-lock-29-boston-store` | `little-miami-river-loveland-commons.webp`; the source path identifies the Little Miami River. | Replace with a Cuyahoga River image. |

This list represents 31 featured card placements that should be corrected for
waterbody identity or misleading subject matter before visual polish work.

## Follow-up implementation

The implementation passes add route-specific assignments for the highest-impact
verified sources: Little Missouri, Elk, Big Coal, Lower Mountain Fork, Blue,
Green, Ogden, Bear, Big, Androscoggin, Roaring Fork, Broad, Wabash,
Conococheague, Big Pipe Creek, Corsica, Prairie, Cuyahoga, Susquehanna, and Big
Sioux. They also replace the tiny Black Creek source with a high-resolution U.S.
Forest Service image, replace the Hatchet Creek source with a verified public-
domain Alabama Extension photograph. The second pass also replaces duplicate-
heavy Kansas River and Clinton River route assets with distinct same-river
sources, upgrades the Wisconsin River context to a 3261×2665 CC0 source, and changes the resolver so
an approved route photo takes precedence over a broader Maryland river-context
fallback. All six Skagit River route cards now use distinct 6000×4000
same-river sources. Each replacement keeps a source and context label in the
route gallery metadata.

Pomme de Terre, Beaver Creek, Flint Creek, and Corker’s Creek still need a
stronger exact source search or local replacement. The local checks below verify the completed
assignments; the live production pages will reflect them after the next site
deployment.

## Priority 1: improve source quality

| State page | River / cards | Measured issue | Recommended action |
|---|---|---|---|
| [Alabama](https://paddletoday.com/states/alabama/) | Hatchet Creek — three cards | Production browser reported only 245×184 pixels for `HatchetCreek540.jpg`. | Replaced with a verified 1024×649 public-domain Alabama Extension photograph; continue searching for a source at least 1600 px wide. |
| [Mississippi](https://paddletoday.com/states/mississippi/) | Black Creek — six cards | Production browser reported 338×185 pixels for `Black_Creek_MS.jpg`. | Replaced with a 3968×2132 U.S. Forest Service / USDA public-domain image showing a canoeist on Black Creek. |
| [Missouri](https://paddletoday.com/states/missouri/) | Three cards listed above | Local asset `james-river-springfield.jpg` is only 800×532 and is assigned to the wrong rivers. | Replace the asset as part of the Priority 0 correction; do not upscale it. |
| [Pennsylvania](https://paddletoday.com/states/pennsylvania/) | Susquehanna River — six cards | Local `susquehanna-river-laceyville.jpg` is 1280×407 (3.15:1), so the state-card crop removes much of the scene. | Replaced the audited Laceyville cards with a 3288×2098 public-domain Susquehanna River source. |
| [South Dakota](https://paddletoday.com/states/south-dakota/) | Big Sioux River — six cards | Local `big-sioux-southern-sioux-falls-bridge.jpg` is 2000×603 (3.32:1), another banner-shaped source that will crop heavily in cards. | Replaced the audited cards with 3264×2448 and 7460×5033 Big Sioux River sources. |

## Priority 2: reduce same-river repetition

The exact-URL inventory contains 50 same-river duplicate groups after the
seven cross-waterbody groups above. These are valid context assignments but
make an entire state page repeat one image across many reaches. Start with the
largest groups and then add route-specific crops as they become available.

| State page | River | Cards sharing one URL | Current source |
|---|---|---:|---|
| Arizona | Salt River | 6 | `Salt_River.jpg?width=1600` |
| Arkansas | Bayou DeView | 6 | `bayou-deview-cache-refuge.webp` |
| California | Russian River | 6 | `2019_Russian_River_by_Jenner_village.jpg?width=1600` |
| Connecticut | Farmington River | 6 | `Farmington_River_Trail_bridge...jpg?width=1600` |
| Georgia | Chattahoochee River | 6 | `Chattahoochee.jpg?width=1600` |
| Kentucky | Barren River | 6 | `barren-river-bowling-green-bridges.webp` |
| Louisiana | Bogue Chitto River | 6 | `Bogue_Chitto_River.jpg?width=1600` |
| Montana | Blackfoot River | 6 | `Blackfoot_River_in_Missoula...jpg?width=1600` |
| Nevada | Colorado River | 6 | `Black_Canyon,_Colorado_River...jpg?width=1600` |
| New Hampshire | Contoocook River | 6 | `Contoocook_River,_Antrim,_NH.jpg?width=1600` |
| New Mexico | Rio Grande | 6 | `Rio_Grande_Wild_and_Scenic_River...jpg?width=1600` |
| Oregon | Willamette River | 5 | `Willamette_River_at_Molalla_SP_eb.jpg?width=1600` |
| Wyoming | Green River | 5 | `Green-River-sunrise-fog...jpg` |
| Iowa / Minnesota | Cedar River | 5 | `cedar-river-george-wyth.webp` |
| Washington | Skagit River | 0 (implemented) | All six route cards now use distinct 6000×4000 Commons sources |
| Vermont | Winooski River | 3 | `Montpelier_VT_-_Winooski_River.jpg?width=1600` |
| Wisconsin | Wisconsin River | Multiple route cards | `Wisconsin River below Rhinelander.jpg` (3261×2665, CC0) |

The source inventory also found byte-identical local files under different
route paths for Kansas River (six files), Big Piney River (three), and Clinton
River (three). Consolidating those files and introducing route-specific crops
will prevent future duplicate assignments from being mistaken for distinct
photography.

## Suggested implementation order

1. Fix the 31 incorrect or misleading card assignments, beginning with the
   six-card North Dakota, West Virginia, and Texas fallback patterns.
2. Replace the two demonstrably tiny external images (Hatchet Creek and Black
   Creek) and the 800×532 Missouri fallback while sourcing the Priority 0
   replacements.
3. Add a card-safe image validation check: the route waterbody name must match
   the image metadata, and any fallback must be explicitly marked as regional
   context. Reject sources below 1200 px wide or with a banner ratio above
   2.5:1 unless a dedicated crop exists.
4. Work through the largest same-river duplicate groups, keeping one approved
   river-level fallback only when no route-specific photograph is available.
