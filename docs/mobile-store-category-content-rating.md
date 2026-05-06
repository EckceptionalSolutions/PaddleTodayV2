# Mobile Store Category and Content Rating Notes

Goal: make the App Store Connect and Google Play Console category/audience choices predictable before the first submission.

Official references:

- Apple category overview: https://developer.apple.com/app-store/categories/
- Apple age rating reference: https://developer.apple.com/help/app-store-connect/reference/age-ratings-values-and-definitions/
- Google Play content ratings: https://support.google.com/googleplay/android-developer/answer/9859655
- Google Play target audience and content: https://support.google.com/googleplay/android-developer/answer/9867159

## Recommended Categories

### Apple App Store

Recommended primary category: `Sports`.

Recommended secondary category: `Navigation`.

Reasoning: PaddleToday is primarily an outdoor paddling recreation app. The map is central, but the app does not provide turn-by-turn navigation, marine navigation, emergency navigation, or official access/closure authority. `Sports` better matches the user's intent: finding and evaluating paddle routes.

Avoid `Travel` as the primary category for MVP unless the listing is repositioned around destination discovery rather than paddling conditions.

### Google Play

Recommended category: `Sports`.

Alternative if Play Console category fit feels too narrow: `Travel & Local`.

Reasoning: `Sports` is the cleanest match for paddling trip planning. `Maps & Navigation` may overpromise navigation behavior that the app does not provide. `Travel & Local` is reasonable if the store listing emphasizes route discovery, local places, and weekend planning more than scoring and river conditions.

## Recommended Audience Position

PaddleToday should not be listed as a kids app.

Recommended Play Console target audience: `13-15`, `16-17`, and `18 and over`, or `16-17` and `18 and over` if we want the most conservative launch posture.

Reasoning: the app is about outdoor water recreation, location-aware recommendations, route logistics, hazards, and conditions that can change quickly. It is appropriate for families to use, but it is not designed specifically for children.

Do not opt into Apple `Made for Kids`.

## Content Rating Questionnaire Notes

Expected answers for MVP, subject to owner/legal review:

- Violence: none.
- Sexual content or nudity: none.
- Profanity or crude humor: none.
- Alcohol, tobacco, or drug references: none.
- Gambling or contests: none.
- Medical or treatment information: none.
- Horror or fear themes: none.
- User interaction: limited to support/contact, alert signup, route requests, route reports, and optional route-report photos submitted to PaddleToday.
- User-generated content: answer based on actual store build behavior. If route reports/photos are only submitted privately for staff review and are not immediately published in-app, document that as private feedback/report submission rather than an open social feed.
- Location: optional, used to highlight nearby paddling options and distance-aware recommendations.
- Purchases: none for MVP.
- Ads: none for MVP.
- Web access: no general-purpose browser; outbound links only for support, directions, policy, and related PaddleToday surfaces.

## Store Copy Alignment

The listing should avoid implying:

- official river safety certification,
- emergency navigation,
- guaranteed real-time accuracy,
- access or closure authority,
- suitability for unsupervised children,
- professional guide service behavior.

Preferred phrasing:

- "planning aid"
- "conditions can change quickly"
- "check official sources and local rules"
- "location is optional"
- "route reports are reviewed before publication or use"

## Decisions to Confirm Before Submission

- Final Apple category: `Sports` primary, `Navigation` secondary.
- Final Google category: `Sports` unless the console/category preview makes `Travel & Local` a clearer fit.
- Final Play target audience: choose either `13+` posture or stricter `16+` posture.
- Confirm route reports/photos are not published without review in the submitted MVP.
- Confirm there are no ads, purchases, broad social features, or unmoderated public user content in the submitted MVP.
