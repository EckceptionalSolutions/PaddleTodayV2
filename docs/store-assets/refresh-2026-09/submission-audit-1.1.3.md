# PaddleToday 1.1.3 listing audit

Reviewed September 16, 2026. Recommendations only; this audit did not change store metadata or submit either release.

## Recommendation

Refresh the screenshots before submission. Their sequence is now sensible, but several underlying captures are stale. Keep the new Google Play feature graphic and the existing visual style. Tighten the opening copy and replace generic release notes with verified changes for each platform.

## Screenshot findings

- Apple iPhone: Rice Creek appears with scores of 91, 61, and 84 across images. Capture the same route in one session so the story is coherent; do not alter scores in an image editor.
- Explore shows old refresh ages: 17 days on iPhone and 20 days on Android. Refresh the actual app data before capturing.
- Apple's Weekend capture shows May 23–24. Capture a current, populated weekend.
- Apple's Access capture starts at an awkward scroll position. Show the put-in, take-out, map, and useful logistics clearly in the shipping UI.
- Apple's Saved capture has one river and substantial blank space. Save two or three useful routes before capturing.
- Android Saved emphasizes the older email-alert interface. Capture the actual 1.1.3 experience.
- iPad should get its own fresh captures. The existing Explore map gives little regional context, and Saved leaves most of the screen empty.
- Add populated Android Access and Weekend images if the shipping app supports clean examples. Four images are usable; six would tell the complete story.

Recommended order: Today → Conditions → Explore → Access → Weekend → Saved. The first three should communicate the core promise without requiring the description.

Suggested headings:
1. Find your paddle for today.
2. Understand the river conditions.
3. Explore nearby river routes.
4. Plan your put-in and take-out.
5. Make a plan for the weekend.
6. Keep your favorite rivers close.

Retain genuine cautions and data limitations. Use real captures from the released device UI, legible text, and consistent framing. Do not replace the app UI with generated mockups.

## Proposed metadata

These are proposed replacements, not values already saved in the consoles.

### Both stores: app name

PaddleToday: River Conditions

29 characters. Optional discovery improvement; keeping PaddleToday alone is also a valid brand choice.

### Apple subtitle

Kayak & canoe trip planner

26 characters. Complements the proposed name by identifying the audience and use.

### Apple promotional text

Find the best paddle near you today. Compare river conditions, understand the score, and check access details before choosing your next kayak or canoe trip.

156 characters, within the 170-character limit.

### Apple keywords

paddling,water,level,flow,gauge,forecast,weekend,map,launch,shuttle,camping,outdoor

83 characters. This assumes the proposed name and subtitle are adopted. The current field repeats the brand and includes Midwest; prioritize relevant terms that complement the title and reflect actual coverage. Do not add competitors' names.

### Google Play short description

Find nearby kayak and canoe routes with river conditions and trip planning.

75 characters, within the 80-character limit.

### Shared full description

Find the best paddle near you today. PaddleToday helps kayakers and canoeists choose a river trip by bringing condition scores, the reasons behind them, and practical route details together.

CHOOSE A RIVER FOR TODAY
Browse nearby routes or explore another area on the map. Compare condition scores, route distance, and difficulty to find options that fit your day.

UNDERSTAND THE SCORE
See how water levels, weather, and available data shape the recommendation. Check the explanation behind a score, how current the information is, and where confidence is limited. Live scores and forecasts depend on the data available for each route.

PLAN THE PRACTICAL DETAILS
Review put-ins, take-outs, estimated paddling time, shuttle information, and available access, hazard, and camping notes before heading out.

LOOK AHEAD TO THE WEEKEND
Explore weekend options with forecast context where available. Compare shorter outings and routes with camping information to find a trip that fits your plans.

KEEP YOUR FAVORITES CLOSE
Save rivers for quick condition checks when you are ready to paddle again.

COVERAGE AND CONDITIONS
Browse supported rivers in the app to check coverage for your area. Route information, live scores, and forecasts vary with available sources.

PaddleToday is a planning aid. Conditions, access, and hazards can change. Check official sources, local restrictions, weather, and your group's ability before launching. A condition score is not a safety guarantee.

## Feature graphic and other assets

Keep the new 1024 × 500 feature graphic with the actual tagline. Its hierarchy and contrast are strong. It is already staged on Google Play and marked AI-edited. No additional redesign is needed for this release.

An app preview video is optional and can follow later; fresh screenshots have higher priority. No icon redesign is proposed as part of this pass.

## Release and claim accuracy

- Apple What's New was carried over from 1.1.2; Play's notes are generic. Verify actual changes against each platform's last public build, then write concrete notes. The baselines differ: Apple 1.1.1 is public, while Play 1.1.2 is public.
- Both build workflows point to commit f14b886ac0c036ca1a4e4da26773ff57ed210e45. Claims should follow that build, not newer working-tree changes.
- That commit's offline UI explicitly excludes background maps and current conditions. Do not claim offline maps or offline live conditions. Saving trip details could be highlighted after checking the installed release build.
- Avoid exclusivity claims against Paddle Ways or Paddle Guide without a current feature comparison. The credible positioning is helping paddlers choose where to go through explained conditions and practical trip details.
- Keep coverage qualified rather than implying every river nearby is supported.

## Final submission considerations

- Apple is staged as 1.1.3 (36), Draft Submission / Item Ready to Submit. It has not been sent for review.
- Google Play production 27 (1.1.3) and listing assets are staged with three pending changes. They have not been sent for review.
- Current release settings publish after approval: Apple automatic release, Google managed publishing off. If a coordinated launch is desired, change release controls before submission.
- Apple displayed an updated developer agreement notice for the account holder. Resolve any outstanding agreement before final submission; no final-submit blocker was tested.
- Google's missing deobfuscation file is a crash-diagnostics warning, not a listing-quality issue.

## Official guidance consulted

- [Apple product-page guidance](https://developer.apple.com/app-store/product-page/): metadata limits, first screenshots, descriptions, promotional text, and keywords.
- [Google Play preview-asset guidance](https://support.google.com/googleplay/android-developer/answer/9866151?hl=en): short description, feature graphic, and screenshots.
