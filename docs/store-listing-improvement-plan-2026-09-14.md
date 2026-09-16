# PaddleToday store listing improvement plan

Reviewed September 14, 2026. Scope: US English public Apple App Store and Google Play listings, competitor positioning and visible promotional screenshots, existing repository assets, and relevant mobile implementation. This is a proposed marketing plan; no store metadata or assets were published.

## 1. Positioning recommendation

**Choose where to paddle today.**

Supporting promise: **Compare river conditions, understand the score, and plan the trip.**

Lead with the paddler's decision. The strongest defensible distinction is the combination of route-specific condition scoring, explanations, visible data confidence/freshness, and practical planning. Treat this as a positioning opportunity, not a claim that no other app offers similar functionality.

Primary audience: recreational river kayakers and canoeists choosing a nearby outing or weekend trip. Broader audiences can follow where coverage and route suitability support them.

| App | Public positioning | Implication for PaddleToday |
| --- | --- | --- |
| PaddleWays | Broad discovery, mapping, access, conditions, offline tools, and NRS backing | Maps, weather, and route planning are expected capabilities. Demonstrate how PaddleToday helps make a choice. |
| Paddle Guide | Launch discovery, route scouting, GPS recording, sharing, and premium offline/3D maps | Practical logistics are valuable but shared territory. Lead with condition interpretation, then show logistics. |
| PaddleToday | River scores, confidence, Today, Explore, Weekend, and Saved | Translate product terminology into a clear decision and a useful trip. |

Competitor evidence: [PaddleWays Apple listing](https://apps.apple.com/us/app/paddle-ways-lets-go-paddling/id1673590983), [PaddleWays Google Play listing](https://play.google.com/store/apps/details?id=com.mobileappnrs), [Paddle Guide Apple listing](https://apps.apple.com/app/id6760765002), [Paddle Guide Google Play listing](https://play.google.com/store/apps/details?id=com.paddleguide.mobile). These are listing claims, not a hands-on comparative performance test.

## 2. What the current listings miss

### Description

Both listings use essentially the same opening and feature list. The opening question is relevant, but the next paragraph switches to internal terminology and navigation instructions. Terms such as confidence, forecast support, route commitment, and structured summaries require interpretation. Explain the benefit and give concrete examples instead.

Apple's subtitle is currently `River routes and live scores`. The Google short description is `Find the best river paddle near you with scored routes based on local conditions`. Neither clearly names kayaking or canoeing. Introduce those terms naturally in metadata and the opening paragraph.

The September Google release notes mention comparisons, nearby alerts, trip drafts, calendar events, and GPX exports. The main description omits these. Confirm availability in each shipping platform before promoting them; source code alone is not proof of a shipped feature.

Sources: [PaddleToday Apple listing](https://apps.apple.com/us/app/paddletoday/id6769542734), [PaddleToday Google Play listing](https://play.google.com/store/apps/details?id=com.paddletoday.mobile). Live browser inspection took precedence over older search extracts; for example, Play showed a September 9 update while the search extract still showed July.

### Promotional images

- Both live listings use raw app screenshots without a separate benefit headline. At carousel size, a shopper has to read dense UI to infer value.
- Apple's first visible sequence is Today, Explore, Weekend, and route detail. Move the score explanation ahead of the map/weekend screens so the opening images establish the distinction.
- Apple's Today image shows Rice Creek at 91; the detail image shows the same reach at 61. These may be valid captures from different times, but the sequence does not explain that. Capture linked screens in one session with consistent data.
- Android's visible sequence starts Today, Explore, route detail, and Weekend; its first Today screenshot shows only four ready routes. Avoid letting an incidental daily count become the apparent size of the catalog.
- The visible Weekend images contain May dates. Recapture the current release and give scheduled dates a maintenance check with future listing updates.
- Paddle Guide uses large benefit captions and a consistent yellow/blue design. PaddleWays combines an outdoor hero with captioned UI. Both communicate purpose faster at thumbnail size.
- The local Google feature graphic already has a clear hierarchy and recognizable colors. Its message is broad and the bottom line lists features. Replace that line with clearer evidence of condition interpretation. The local file's current publication status was not confirmed on the public desktop listing.

Local assets reviewed include `docs/store-screenshots/app-store/ios-iphone-01-today.png`, `docs/store-screenshots/google-play/android-phone-01-today.png`, and `docs/store-assets/google-play/feature-graphic-store-v2-1024x500.png`.

## 3. Proposed metadata

| Field | Proposed copy | Characters |
| --- | --- | ---: |
| Store display name, both platforms | PaddleToday: River Conditions | 29 |
| Apple subtitle | Kayak & canoe trip planner | 26 |
| Google short description | Choose where to paddle with river scores, weather, and route planning | 69 |
| Apple promotional text | Find your next river trip with condition scores, clear explanations, and practical route details. Compare today's options and plan for the weekend. | 147 |

This proposes expanding the store display name while preserving PaddleToday as the brand. It revisits the earlier name decision in `docs/mobile-store-metadata-decisions.md`; keeping the existing name is also viable if brand consistency is preferred. Keyword demand has not been measured, so this is a relevance hypothesis, not a search-ranking forecast.

Apple keyword candidate (83 characters):

```text
paddling,water,level,flow,gauge,forecast,weekend,map,launch,shuttle,camping,outdoor
```

This candidate assumes the proposed title/subtitle. Rebalance it if those fields change. Keep competitor names out of metadata.

Apple permits 30-character names/subtitles, 170-character promotional text, and 100-character keywords. Promotional text does not affect search ranking. [Apple product-page guidance](https://developer.apple.com/app-store/product-page/)

### Proposed shared full description

Choose your next river paddle with current conditions in view. PaddleToday helps kayakers and canoeists compare routes for today or the weekend, understand condition scores, and check the details before heading out.

FIND A RIVER THAT FITS YOUR DAY

Browse nearby routes or explore another area on the map. Compare condition scores, route distance, and difficulty to build your shortlist.

UNDERSTAND THE CONDITIONS

See how water levels, weather, and available data shape the recommendation. Review the explanation behind a score, check how current the information is, and see where confidence is limited. Live scores and forecasts depend on the data available for each route.

CHECK THE PRACTICAL DETAILS

Review put-ins, take-outs, estimated paddling time, shuttle information, and available access, hazard, and camping notes. Bring the questions that matter for your trip into one place.

LOOK AHEAD TO THE WEEKEND

Explore weekend options with forecast context where available. Compare shorter outings and routes with camping information to find a trip that fits your plans.

KEEP YOUR FAVORITES CLOSE

Save rivers for quick condition checks when you are ready to paddle again.

COVERAGE AND CONDITIONS

Browse supported rivers in the app to check coverage for your area. Route information, live scores, and forecasts vary with available sources.

PaddleToday is a planning aid. Conditions, access, and hazards can change. Check official sources, local restrictions, weather, and your group's ability before launching. A condition score is not a safety guarantee.

### Add after confirming the shipping feature on each platform

- **Alerts:** Choose nearby Today and Weekend alerts for your planning location. Verify delivery behavior and prerequisites before stronger claims such as automatic alerts when a favorite river improves.
- **Trip preparation:** Save a trip draft, open directions, add the outing to your calendar, and export a GPX route or share a float plan. GPX export should not be presented as in-app turn-by-turn navigation or offline maps.
- **Comparisons:** Compare selected routes side by side. Capture the comparison UI and verify whether the advertised flow operates within one river or across saved rivers.

These features appear in current mobile source; Google's current release notes also describe them. The Apple listing's latest notes only say bug fixes and performance improvements, so the public listing alone does not establish parity.

## 4. Screenshot production brief

Use six core panels, with up to two optional panels. The first three must make sense together and individually.

| Order | Benefit headline | Actual UI to capture | Purpose |
| --- | --- | --- | --- |
| 1 | Choose where to paddle today | Today recommendations showing a route, condition score, and concise reason | Establish the core job immediately |
| 2 | Understand the river conditions | Same route's Today detail with score explanation, water/weather context, and freshness/confidence | Explain what a score means and why it is useful |
| 3 | Find a trip that fits | Route comparison if verified; otherwise a route list with length and difficulty visible | Show a practical choice between outings |
| 4 | Know your put-in and take-out | Access map with paired access points and concise logistics | Make the trip tangible |
| 5 | Make a plan for the weekend | Current Weekend screen with available forecast context | Extend value beyond today's conditions |
| 6 | Keep your next paddle close | Populated Saved screen with recognizable rivers | Establish repeat usefulness |
| 7, optional | Explore rivers near you | Regional map with meaningful route density and one selected route | Prove geographic discovery without an overwhelming national pin map |
| 8, optional | Take your plan with you | Shipping trip-preparation flow, or verified nearby-alert settings | Show a useful finishing step; pick one feature per panel |

### Visual direction

- Retain forest green, warm cream, and restrained sun-yellow accents from the existing identity.
- Use one large headline and one main screenshot per panel. Reserve roughly 15–20% of phone-panel height for the headline; give the rest to recognizable app UI.
- Prefer a direct screen presentation over ornate device frames. Keep essential confidence and freshness context visible beside the score.
- Make the first headline readable at approximately 250px panel width. This is a design QA target, not a platform requirement.
- Capture real current app screens. Do not invent scores, alter UI values, or use generated UI as evidence of a feature.
- Keep scores and route names consistent when following the same trip across panels. Select real states that clearly demonstrate the feature; do not manufacture ideal conditions.
- Use a representative regional mix over the full set while retaining one coherent route for the Today/detail/access sequence.
- Distinguish total route coverage from the subset with current live scoring. Avoid unverified route/state counts in evergreen images.

Apple's first one to three screenshots can appear in search results. Make each image show actual UI and a main benefit. Capture separate iPhone and iPad layouts for supported devices. [Apple guidance](https://developer.apple.com/app-store/product-page/)

For Google phone images, prioritize UI in the first three and keep added taglines within 20% of the image. Use at least four 1080×1920 portrait images for recommendation-format eligibility; six to eight would tell this story. Google advises omitting extra text from large-screen captures, so supply separate tablet images. Include concise alt text and clean notification bars. The existing screenshot-plan instruction against all overlays is broader than Google's phone guidance. [Google preview-asset guidance](https://support.google.com/googleplay/android-developer/answer/9866151)

### Google feature graphic

Proposed headline: **Find your next river day**

Supporting line: **Conditions explained. Trips made easier.**

Use a recognizable river photograph, the existing green/cream/yellow palette, and one large genuine crop of the condition explanation as product evidence. Keep branding modest and place key content toward the center. Omit the current three-feature footer. Make this graphic complement the short description rather than repeat it verbatim.

Export at 1024×500, JPEG or 24-bit PNG without alpha. Avoid tiny detail, device imagery, store badges, price language, and ranking claims. [Google feature-graphic guidance](https://support.google.com/googleplay/android-developer/answer/9866151)

## 5. Priorities and validation

1. **First pass:** finalize the condition-led promise, replace the opening copy, and produce panels 1–3. These establish the reason to install.
2. **Second pass:** finish panels 4–6, adapt for each platform/device, and revise the Google feature graphic. Confirm newer features in shipping builds before adding optional copy/panels.
3. **Release check:** verify UI, data consistency, field lengths, capture sizes, geographic wording, and miniature readability. Current source contains both scored and planning-only routes; do not imply every catalog route receives a live score.
4. **Measure:** record store visits and conversion by platform, country, and traffic source. Use first route opened/saved or trip prepared as downstream activation measures where analytics support them.
5. **Test one hypothesis:** compare first-image headline A, `Choose where to paddle today`, with B, `Understand the river conditions`, holding the other images steady. Use [Apple Product Page Optimization](https://developer.apple.com/app-store/product-page-optimization/) for creative tests and [Google Store Listing Experiments](https://support.google.com/googleplay/android-developer/answer/12053285) for eligible text/graphic tests. Apple PPO does not test the description/subtitle.
6. **Avoid premature conclusions:** no private conversion analytics were reviewed. Set experiment duration from actual traffic and the platform's uncertainty estimates; a fixed one-week deadline or a handful of installs will not establish a reliable lift. If traffic is low, first use a five-second comprehension check with several target paddlers, then monitor results directionally.

Success criterion for the comprehension check: users can explain that PaddleToday helps them choose a river based on current conditions, identify why a route is recommended, and find the practical planning details.
