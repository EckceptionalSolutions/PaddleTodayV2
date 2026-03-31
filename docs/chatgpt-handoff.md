# ChatGPT Handoff

Use this handoff prompt in the other ChatGPT account:

```md
You are taking over product + engineering copilot work for a paddling product reset.

Workspace and repo context:
- Main old repo: `C:\Users\Yerff\source\repos\PaddleToday`
- New app repo created inside it for now: `C:\Users\Yerff\source\repos\PaddleToday\canoe-adventures-v2`
- The new app will likely be moved into its own repo later.
- Local preview target has been `http://127.0.0.1:4323/`

Core product direction:
- This is not a generic route catalog or adventure portal.
- The product should answer: “Can I paddle this river today, and how good will it be?”
- Focus:
  - score
  - confidence
  - concise explanation
  - key factors
- Product framing:
  - weather app for paddlers
  - river conditions decision engine
  - not AllTrails
  - not a route-content farm
- Core thesis:
  - ingest messy real-world data
  - normalize it
  - apply understandable heuristics
  - present an actionable river decision

What was audited in the old PaddleToday repo:
- Old PaddleToday was found to be a broad Astro route catalog with lots of route discovery/content surface area.
- Reusable parts:
  - USGS fetch patterns
  - weather fetch patterns
  - some route metadata
  - some access/logistics content
  - a few map and utility components
- Not reused / intentionally avoided:
  - route-catalog IA
  - community/review/content-farm behavior
  - browse-first route discovery
  - guides, affiliate content, social surfaces

Planning docs already created in the new app:
- `C:\Users\Yerff\source\repos\PaddleToday\canoe-adventures-v2\docs\canoe-adventures-v2-plan.md`
- `C:\Users\Yerff\source\repos\PaddleToday\canoe-adventures-v2\docs\paddletoday-reuse-audit.md`
- plus follow-up docs like:
  - `seed-river-calibration.md`
  - `initial-action-list.md`
  - `deployment-readiness.md`

Current tech architecture:
- Astro static frontend
- thin Node/TSX backend server for `/api`
- local preview serves one-origin app + API on `4323`
- live upstream data:
  - USGS for gauges
  - Open-Meteo for weather
- in-memory caching on server
- explainable scoring engine, not black-box

Important current scripts:
- preview/local server script in `package.json`:
  - `npm run serve:local`
- tests:
  - `npm test`
- build:
  - `npm run build`

Current product/features already implemented:
- homepage summary board
- per-river detail pages
- live scoring + confidence + explanation
- degraded/offline handling
- summary map with midpoint markers
- score map markers with confidence ring
- nearest-to-me sorting using browser geolocation
- distance labels on cards when nearest sorting is active
- About page
- Request a river page
- report-a-change links from river pages
- directions links in access plan
- copy coordinates for put-in and take-out
- compact gauge trend chart with `24h / 72h / 7d`
- weather visual tiles
- short-range outlooks
- sticky/detail page launch-call rail
- access plan + logistics section
- Rice Creek access planner prototype for alternate access points within a single scored route

Important branding/copy decisions:
- Site name is `Paddle Today`
- Header uses the transparent full wordmark
- Favicon uses the simple mark
- Copy was cleaned up to sound less robotic/internal
- Rating language was changed from:
  - `Great / Good / Marginal / No-go`
  to:
  - `Strong / Good / Borderline / No-go`
- This was done because `Strong` is descriptive without sounding overly directive like `Good to go`

Current rating semantics:
- `Strong`
- `Good`
- `Borderline`
- `No-go`

Current data-model direction:
- moving toward:
  - `River`
  - `Route`
  - `AccessPoint`
  - optional `SegmentOption`
- current scored unit is still basically route/reach-level
- preparation work has started for `river > route` organization:
  - routes now have `riverId`
  - Rice Creek has `accessPoints`
  - there is an `Access planner` prototype on the Rice Creek route page

Important recent implementation details:
- `riverId` added to route data and API contracts
- Rice Creek has multiple alternate access points modeled
- Access planner prototype changes segment length/time/shape/logistics without changing the route’s live score
- The next likely architectural step is a river hub page that groups multiple reaches under one river while keeping route pages as direct links

Current river/route coverage:
- around 15 route pages/reaches are in the new app
- includes multiple Zumbro reaches and other selective direct-gauge rivers
- only rivers/reaches with reasonably defensible gauge/threshold guidance were added

Files that matter most right now:
- `C:\Users\Yerff\source\repos\PaddleToday\canoe-adventures-v2\src\data\rivers.ts`
- `C:\Users\Yerff\source\repos\PaddleToday\canoe-adventures-v2\src\data\river-trip-details.ts`
- `C:\Users\Yerff\source\repos\PaddleToday\canoe-adventures-v2\src\lib\types.ts`
- `C:\Users\Yerff\source\repos\PaddleToday\canoe-adventures-v2\src\lib\scoring.ts`
- `C:\Users\Yerff\source\repos\PaddleToday\canoe-adventures-v2\src\lib\api-contract.ts`
- `C:\Users\Yerff\source\repos\PaddleToday\canoe-adventures-v2\src\lib\rivers.ts`
- `C:\Users\Yerff\source\repos\PaddleToday\canoe-adventures-v2\src\server\api-server.ts`
- `C:\Users\Yerff\source\repos\PaddleToday\canoe-adventures-v2\src\pages\index.astro`
- `C:\Users\Yerff\source\repos\PaddleToday\canoe-adventures-v2\src\pages\rivers\[slug].astro`
- `C:\Users\Yerff\source\repos\PaddleToday\canoe-adventures-v2\src\pages\about.astro`
- `C:\Users\Yerff\source\repos\PaddleToday\canoe-adventures-v2\src\pages\request-river.astro`
- `C:\Users\Yerff\source\repos\PaddleToday\canoe-adventures-v2\src\scripts\index-page.js`
- `C:\Users\Yerff\source\repos\PaddleToday\canoe-adventures-v2\src\scripts\river-detail-page.js`
- `C:\Users\Yerff\source\repos\PaddleToday\canoe-adventures-v2\src\scripts\request-page.js`
- `C:\Users\Yerff\source\repos\PaddleToday\canoe-adventures-v2\public\global.css`
- `C:\Users\Yerff\source\repos\PaddleToday\canoe-adventures-v2\public\scripts\map-runtime.js`

Request/intake feature context:
- The old `request a route` flow was repurposed into the new app
- There is now a `Request a river` page
- River pages also include a `Report a change` path that prefills the request/update flow
- The form is designed to write to Azure blob storage if configured
- If storage is not configured, there is fallback behavior in the app/server flow
- Relevant env vars were documented in README

UX decisions already made:
- map should stay secondary to the decision board, but still present
- map on homepage is always shown now
- low-confidence legend and map markers were aligned
- detail page was heavily simplified to feel more like a trip-day briefing and less like a cluttered dashboard
- homepage also had a copy tightening + density pass
- About content was moved off homepage into its own page

Important unresolved product/design direction:
- need to decide how to fully organize multiple routes on the same river
- recommended direction is:
  - keep route-level pages and route-level scoring
  - add a river-level hub page above them
  - river page should allow route switching
  - when sorting by nearby, use the nearest route on that river
- this has not been fully implemented yet

Recent user concern and resolution:
- user asked whether `Great` should become something else
- we rejected `Good to go` because it sounded too advisory
- settled on `Strong`
- map key and visible call labels should align with:
  - `Strong`
  - `Good`
  - `Borderline`
  - `No-go`

Current known next best step:
- build the first real `river > route` layer:
  1. group current routes by `riverId`
  2. build one river hub page, probably for `Zumbro River`
  3. keep route pages working as direct links
  4. let river page switch between routes
- secondary next step:
  - improve access-point planning for routes with many alternate in/out points like Rice Creek

Current status at handoff:
- rating terminology pass to `Strong / Good / Borderline / No-go` has been implemented
- tests and build passed
- preview server was restarted on `4323`

Please continue from here without trying to reintroduce generic route-catalog behavior.
```

Short version of the next recommendation for the new chat:
- keep route-level scoring
- add river hub pages
- use `riverId` to group reaches
- prototype the first hub on Zumbro
- keep improving access-point planning on routes like Rice Creek
