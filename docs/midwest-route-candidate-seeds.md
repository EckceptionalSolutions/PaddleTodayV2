# Midwest Route Candidate Seeds

Use this file as the old-repo shortlist for route-addition automation.

The old `PaddleToday` repo is still worth keeping as a source for `MN`, `IA`, and `WI`, but only as a bounded seed list. Do not broadly crawl the whole old repo first. Many old files are already in V2, already rejected, too broad, or no longer match the current trust bar.

Before reviewing any route here:

- Check `src/data/rivers.ts` to confirm it is not already in V2.
- Check `docs/midwest-route-automation-memory.md` to avoid retrying rejected routes unless new evidence directly fixes the blocker.
- Prefer routes with direct `USGS` gauges or highly defensible same-river proxies.
- Prefer routes with official endpoint naming on `DNR`, `NPS`, county, city, or water-trail materials.

## Active Shortlist

These are the best remaining old-repo seeds that still look worth automation time.

### Minnesota

- `Mississippi River - Coon Rapids Dam Regional Park to North Mississippi Regional Park`
  - Old file: `C:\Users\Yerff\source\repos\PaddleToday\src\content\routes\mn\mississippi-river-coon-rapids-dam-east-to-north-mississippi-regional-park.md`
  - Why still worth checking: official route corridor is real and endpoint support is strong.
  - Main gap: current official route wording has endpoint ambiguity versus Anoka County Riverfront, so the exact product route needs reconciliation.

- `Vermilion River - Twomile Creek Access to Eightmile Creek Access`
  - Old file: `C:\Users\Yerff\source\repos\PaddleToday\src\content\routes\mn\vermilion-river-twomile-creek-access-to-eightmile-creek-access-easy-bogland-stre.md`
  - Why still worth checking: uniquely different northern-Minnesota option with old coordinates and gauge references.
  - Main gap: needs a fresh trust pass on public access and threshold quality.

### Iowa

- `Maquoketa River - Dunlap Park to Upper Mon-Maq Access`
  - Old file: `C:\Users\Yerff\source\repos\PaddleToday\src\content\routes\ia\maquoketa-river-dunlap-park-hopkinton-to-upper-mon-maq-access-monticello.md`
  - Why still worth checking: still the best Iowa candidate left from the old repo.
  - Main gap: threshold model is still softer than the current V2 bar.

- `Little Turkey River - U Avenue to Eldorado`
  - Old file: `C:\Users\Yerff\source\repos\PaddleToday\src\content\routes\ia\little-turkey-river-u-avenue-to-eldorado.md`
  - Why still worth checking: old file has coordinates and `USGS` support.
  - Main gap: source quality is still thin and needs better official access/threshold backing.

- `Maquoketa River - Mon-Maq Dam to Pictured Rocks Park`
  - Old file: `C:\Users\Yerff\source\repos\PaddleToday\src\content\routes\ia\maquoketa-river-mon-maq-dam-monticello-to-pictured-rocks-park.md`
  - Why still worth checking: same river family as the best Iowa candidate, so a credible gauge/access story could make it useful.
  - Main gap: needs a full threshold and dam/logistics trust pass.

### Wisconsin

- `Bark River III - Highway 83 to Upper Nemahbin Lake Public Boat Launch`
  - Old file: `C:\Users\Yerff\source\repos\PaddleToday\src\content\routes\wi\bark-river-iii-highway-83-to-upper-nemahbin-lake-public-boat-launch.md`
  - Why still worth checking: direct Bark gauge and old coordinates are already there.
  - Main gap: put-in legitimacy and lake/portage logistics still need tighter proof.

- `Chippewa River - Dunnville to Durand`
  - Old file: `C:\Users\Yerff\source\repos\PaddleToday\src\content\routes\wi\chippewa-river-dunnville-county-y-to-durand-river-street-landing.md`
  - Why still worth checking: direct gauge plus public endpoint story.
  - Main gap: threshold support is still not good enough unless new numeric evidence turns up.

- `Crawfish River - County Road I to County Road G`
  - Old file: `C:\Users\Yerff\source\repos\PaddleToday\src\content\routes\wi\crawfish-river-county-road-i-to-county-road-g.md`
  - Why still worth checking: old file has coordinates and `USGS` support.
  - Main gap: threshold and access quality need a real research pass.

- `Namekagon River - County Road K to Riverside Landing`
  - Old file: `C:\Users\Yerff\source\repos\PaddleToday\src\content\routes\wi\namekagon-river-county-road-k-trego-to-riverside-landing-washburn.md`
  - Why still worth checking: unusually strong NPS ecosystem and source trail.
  - Main gap: route shape is less utility-focused and may need product judgment more than raw research.

- `Namekagon River - Earl Park Landing to Trego Town Park`
  - Old file: `C:\Users\Yerff\source\repos\PaddleToday\src\content\routes\wi\namekagon-river-earl-park-landing-to-trego-town-park-landing.md`
  - Why still worth checking: same high-quality river family as the existing Big Bend route.
  - Main gap: still needs a clean reach-specific threshold/access pass before shipping.

- `St. Croix River - Osceola Landing to Somerset Landing`
  - Old file: `C:\Users\Yerff\source\repos\PaddleToday\src\content\routes\wi\st-croix-river-osceola-landing-to-somerset-landing.md`
  - Why still worth checking: official lower-St.-Croix corridor and clear named landings.
  - Main gap: threshold support is still weaker than the currently shipped lower St. Croix routes.

## Do Not Seed From Old Repo Unless New Evidence Appears

These are already covered in V2 or already rejected in automation memory.

- Already in V2:
  - `Cannon River - Faribault to Dundas`
  - `Cloquet River - Island Lake Dam to Bachelor Road`
  - `Crow Wing River - Little White Dog to Cottingham County Park`
  - `Blue Earth River - Rapidan Dam Park to County Road 90`
  - `Root River - Lanesboro to Peterson`
  - `Root River - Rushford to Houston`
  - `Root River - Parsley Bridge to Moen's Bridge`
  - `Root River - Moen's Bridge to Whalan`
  - `Rum River - Martin's Landing to North County Park`
  - `Rum River - Walbo Access to Cambridge West Park`
  - `Snake River - Canary Road to Cross Lake / Pine City`
  - `Snake River - County Road 3 to Canoe Park (Mora)`
  - `St. Croix River - Highway 8 / Interstate to Osceola`
  - `St. Croix River - Osceola to William O'Brien`
  - `Straight River - Krogh's Landing to Faribault`
  - `Sauk River - Spring Hill County Park to St. Martin`
  - `Kettle River - Lower Kettle #5 to #6`
  - `Whitewater River - Elba to Highway 74`
  - `Rice Creek - Peltier Lake to Long Lake`
  - `Mississippi River - East River Flats to Hidden Falls`
  - `Minnesota River - Judson to Land of Memories`
  - `Minnesota River - Henderson Station to Belle Plaine`
  - `South Fork Zumbro - 90th Street NW to Lake Zumbro`
  - `Zumbro River - Green Bridge to Zumbro Falls`
  - `Zumbro River - Theilman to Kruger`
  - `Zumbro River - Kruger to West Newton`
  - `Upper Iowa - Kendallville to Decorah`
  - `Upper Iowa - Trout Run to Lower Dam`
  - `Black Hawk Creek` routes
  - `Iowa River - Sturgis Ferry Park to Hills Access`
  - `Wapsipinicon State Park to Newport Mills`
  - `Bark River - Highway 164 to Merton Millpond`
  - `Kickapoo River - Ontario to Rockton`
  - `Kinnickinnic River - Glen Park to Kinnickinnic State Park`
  - `Milwaukee River - Fireman's Park to Waubedonia Park`
  - `Milwaukee River - Lime Kiln Park to Village Park`
  - `Milwaukee River - Waubedonia Park to Veterans Memorial Park`
  - `Namekagon River - Big Bend Landing to Trego Town Park`
  - `White River - Maple Ridge Road to Highway 112 Dam`
  - `Wolf River - Hwy 52 to West Hollister Road`

- Already rejected or blocked:
  - `Cannon River - Cannon Falls to Miesville Ravine County Park`
  - `Rum River - Wayside Landing to Milaca City Park`
  - `Sauk River - Spring Hill County Park to Rockville County Park`
  - `Minnesota River - Kinney Access to Skalbekken County Park`
  - `Snake River - Rush City Public Access to Bridgeview Park`
  - `Apple River - County Highway E to Apple River County Park`
  - `Chippewa River - Dunnville to Durand` unless new threshold evidence appears
  - Any old duplicate or alternate draft of a route already shipped in V2

## Recommendation

Keep the old repo in automation instructions, but narrow the language.

Good:

- `Use the old PaddleToday repo only as a secondary seed source, starting with docs/midwest-route-candidate-seeds.md and skipping anything already in docs/midwest-route-automation-memory.md.`

Avoid:

- `Mine the old repo broadly for candidates.`
