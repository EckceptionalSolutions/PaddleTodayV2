import { describe, expect, it } from 'vitest';
import {
  featuredWeatherViewModel,
  featuredConditionMarkup,
  recommendationCardViewModel,
  riverCardViewModel,
  scoreBreakdownDisclosureViewModel,
  renderSourceBadges,
  renderTagMarkup,
  signalRowMarkup,
  weatherBadgeMarkup,
  weatherVisualMarkup,
} from './board-card-markup.js';

describe('board card markup', () => {
  it('renders signal rows and their shared empty state', () => {
    expect(signalRowMarkup({})).toContain('Conditions loading');
    const markup = signalRowMarkup({
      cardRoute: {
        summary: {
          rawSignalLine: 'Gauge: 4.2 ft • Wind: 8 mph • Temp: 72°F',
        },
      },
    });
    expect(markup).toContain('river-card__signal-icon--gauge');
    expect(markup).toContain('4.2 ft');
    expect(markup).toContain('72°F');
  });

  it('renders semantic weather icons and badges', () => {
    expect(weatherVisualMarkup('rain')).toContain('aria-label="Rain later"');
    const badge = weatherBadgeMarkup({
      cardRoute: {
        summary: {
          shortExplanation: 'Ideal level • Stable • Rain later',
          rawSignalLine: 'Temp: 65°F',
        },
      },
    }, 'card-weather-badge--compact');
    expect(badge).toContain('card-weather-badge--rain');
    expect(badge).toContain('card-weather-badge--compact');
    expect(featuredWeatherViewModel(null)).toEqual({
      hidden: true,
      iconClassName: 'home-featured__weather-icon',
      iconMarkup: '',
      label: 'Forecast pending',
    });
    expect(featuredWeatherViewModel({
      cardRoute: {
        summary: {
          shortExplanation: 'Ideal level â€¢ Stable â€¢ Rain later',
          rawSignalLine: 'Temp: 65Â°F',
        },
      },
    })).toMatchObject({
      hidden: false,
      iconClassName: expect.stringContaining('weather-indicator--rain'),
      label: 'Rain later',
    });
  });

  it('renders shared condition, tag, and source markup safely', () => {
    const item = {
      cardRoute: {
        summary: { shortExplanation: 'Ideal level • Stable • Mostly dry' },
        sources: [{ label: 'Official & verified', tone: 'official' }],
      },
    };
    expect(featuredConditionMarkup(item)).toContain('Ideal level / Stable / Mostly dry');
    expect(renderTagMarkup(['High <confidence>'])).toContain('High &lt;confidence&gt;');
    expect(renderSourceBadges(item)).toContain('Official &amp; verified');
  });

  it('builds the shared score-breakdown disclosure model', () => {
    expect(scoreBreakdownDisclosureViewModel(null)).toBeNull();
    expect(scoreBreakdownDisclosureViewModel({
      riverQuality: 82,
      finalScore: 76,
      windAdjustment: -4,
      temperatureAdjustment: 0,
      rainAdjustment: -2,
      comfortAdjustment: 1,
      capReasons: ['No live gauge'],
    })).toEqual({
      summary: 'River conditions started this at 82. Weather moved it to 76 today.',
      rows: [
        { label: 'River quality', value: 82 },
        { label: 'Wind', value: -4 },
        { label: 'Temperature', value: 0 },
        { label: 'Rain timing', value: -2 },
        { label: 'Other', value: 1 },
      ],
      capReasons: ['No live gauge'],
    });
  });

  it('builds recommendation card copy with configurable route-type detail', () => {
    const item = {
      kind: 'route',
      travelMinutes: 25,
      cardRoute: {
        rating: 'Strong',
        score: 87,
        confidence: { label: 'High' },
        liveData: { overall: 'live' },
        summary: { shortExplanation: 'Ideal level â€¢ Stable â€¢ Mostly dry' },
        river: {
          name: 'Rum River',
          state: 'Minnesota',
          region: 'Central Minnesota',
          distanceLabel: '8 mi',
          routeType: 'whitewater',
          difficulty: 'easy',
          estimatedPaddleTime: '3â€“4 hours',
        },
      },
    };
    const base = {
      latestResults: [item],
      featuredRouteLabelForItem: () => 'Wayside to Milaca',
    };

    expect(recommendationCardViewModel(item, 0, true, {
      ...base,
      includeRouteType: true,
    })).toMatchObject({
      ratingKey: 'great',
      slot: "Today's Best",
      kind: 'Route score',
      state: 'MINNESOTA / CENTRAL MINNESOTA',
      route: 'Wayside to Milaca',
      score: '87',
      liveLabel: 'Live conditions right now',
    });
    expect(recommendationCardViewModel(item, 1, true, {
      ...base,
      includeRouteType: true,
    }).meta).toContain('Whitewater');
    expect(recommendationCardViewModel(item, 1, true, base).meta).not.toContain(
      'Whitewater',
    );

    expect(riverCardViewModel(item, true, {
      latestResults: [item],
      routeLabelForItem: () => 'Wayside to Milaca',
      segmentLabelForItem: () => 'Selected 4.2 mi segment',
      metaLine: () => 'Custom meta',
    })).toMatchObject({
      ratingKey: 'great',
      kind: 'Route score',
      route: 'Wayside to Milaca',
      segment: 'Selected 4.2 mi segment',
      score: '87',
      meta: 'Custom meta',
    });
  });
});
