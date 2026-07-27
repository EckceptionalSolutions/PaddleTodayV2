import { describe, expect, it } from 'vitest';
import {
  breakdownValueToneClass,
  cardLinkLabel,
  cardSummary,
  coldWeatherDrivenCall,
  confidenceLabel,
  distanceBucketLabel,
  exploreSortSummaryLabel,
  favoriteRecordForItem,
  formatBoardRefreshCopy,
  formatGeneratedFreshness,
  formatTravelLabel,
  friendlyCapReason,
  liveReadWarning,
  metaLineText,
  parseRawSignalLine,
  parseTemperature,
  rawSignalLine,
  ratingToneKey,
  recommendationSlotLabel,
  recommendationSummaryText,
  recommendationTagLabels,
  recommendationVerdict,
  regionStateText,
  routeDifficultyLabel,
  routeEstimatedTimeLabel,
  routeLengthLabel,
  routeTypeLabel,
  shortRouteLengthLabel,
  signedPoints,
  summaryMentionsFlowShift,
  summaryMentionsWeather,
  summaryParts,
  weatherVisualLabel,
  weatherVisualState,
} from './board-presenters.js';

describe('board presenters', () => {
  it('maps ratings to stable semantic tone keys', () => {
    expect(ratingToneKey('Strong')).toBe('great');
    expect(ratingToneKey('Fair')).toBe('marginal');
    expect(ratingToneKey('No-go')).toBe('no-go');
    expect(ratingToneKey(null)).toBe('pending');
  });

  it('formats travel durations and buckets', () => {
    expect(formatTravelLabel(45)).toBe('45 min drive');
    expect(formatTravelLabel(60)).toBe('1h drive');
    expect(formatTravelLabel(95)).toBe('1h 35m drive');
    expect(formatTravelLabel(Number.POSITIVE_INFINITY)).toBe('');
    expect(distanceBucketLabel(30)).toBe('Within 30 minutes');
    expect(distanceBucketLabel(90)).toBe('Within 90 minutes');
    expect(distanceBucketLabel(95)).toBe('Day trip');
  });

  it('builds reusable favorite and recommendation presentation', () => {
    const item = {
      kind: 'route',
      cardRoute: {
        rating: 'Strong',
        score: 92,
        gaugeBand: 'ideal',
        liveData: { overall: 'live' },
        weather: {
          temperatureF: 38,
          next12hWindMphMax: 12,
          next12hPrecipProbabilityMax: 20,
        },
        river: {
          slug: 'rum-river-test',
          name: 'Rum River',
          reach: 'Test reach',
          state: 'MN',
          region: 'Central Minnesota',
        },
      },
    };

    expect(favoriteRecordForItem(item)).toEqual({
      slug: 'rum-river-test',
      name: 'Rum River',
      reach: 'Test reach',
      state: 'MN',
      region: 'Central Minnesota',
      url: '/rivers/rum-river-test/',
    });
    expect(favoriteRecordForItem({ ...item, kind: 'group', totalRouteCount: 2 })).toBeNull();
    expect(recommendationVerdict(item)).toBe('Great today');
    expect(coldWeatherDrivenCall(item)).toBe(true);
    expect(coldWeatherDrivenCall({
      ...item,
      cardRoute: {
        ...item.cardRoute,
        weather: { temperatureF: 55 },
      },
    })).toBe(false);
  });

  it('builds shared recommendation card copy from board context', () => {
    const fairItem = {
      travelMinutes: 25,
      selectedSegment: { distanceMiles: 4.25 },
      cardRoute: {
        rating: 'Fair',
        score: 60,
        gaugeBand: 'ideal',
        weather: { temperatureF: 70 },
        river: { riverId: 'fair', slug: 'fair-a' },
        confidence: { label: 'High' },
        liveData: { overall: 'live' },
        summary: { shortExplanation: 'Ideal level • Stable • Mostly dry' },
      },
    };
    const stronger = {
      score: 85,
      rating: 'Strong',
      river: { riverId: 'stronger', slug: 'stronger-a' },
      confidence: { label: 'High' },
      liveData: { overall: 'live' },
    };

    expect(recommendationSlotLabel(1, true)).toBe('Runner up');
    expect(recommendationSlotLabel(1, false)).toBe('Steady pick');
    expect(recommendationTagLabels(fairItem, true)).toEqual([
      'Selected segment: 4.3 mi',
      'High data confidence',
    ]);
    expect(recommendationSummaryText(fairItem, true, [stronger])).toBe(
      'Paddleable today, but stronger routes are available.'
    );
    expect(recommendationSummaryText(fairItem, true, [fairItem.cardRoute])).toBe(
      'This is the highest-ranked route on the board, but it still has tradeoffs.'
    );
    expect(recommendationSummaryText({
      ...fairItem,
      cardRoute: {
        ...fairItem.cardRoute,
        rating: 'No-go',
        gaugeBand: 'too-low',
        summary: { shortExplanation: 'Too low • Stable • Rain later' },
      },
    }, false)).toBe('Water is too low today, and weather only makes the call worse.');
  });

  it('labels every shared board sort mode', () => {
    expect(exploreSortSummaryLabel('near-you')).toBe('best by drive time');
    expect(exploreSortSummaryLabel('nearest')).toBe('closest first');
    expect(exploreSortSummaryLabel('highest-confidence')).toBe('highest data confidence');
    expect(exploreSortSummaryLabel('lowest-risk')).toBe('lowest-risk routes');
    expect(exploreSortSummaryLabel('a-z')).toBe('A-Z');
    expect(exploreSortSummaryLabel('best-now')).toBe('top picks today');
  });

  it('formats score breakdown values and tones', () => {
    expect(signedPoints(4)).toBe('+4');
    expect(signedPoints(-3)).toBe('-3');
    expect(signedPoints(Number.NaN)).toBe('Unavailable');
    expect(breakdownValueToneClass(1)).toContain('positive');
    expect(breakdownValueToneClass(-1)).toContain('negative');
    expect(breakdownValueToneClass(0)).toContain('neutral');
  });

  it('normalizes known score-cap explanations', () => {
    expect(friendlyCapReason('Cold air limits today\'s score to 70 or lower.')).toContain('Cold air');
    expect(friendlyCapReason('Strong wind limits today\'s score to 75 or lower.')).toContain('Strong wind');
    expect(friendlyCapReason('Minimum-only guidance caps the trip score at 74.')).toContain('low-water floor');
    expect(friendlyCapReason('Custom explanation')).toBe('Custom explanation');
  });

  it('builds route fact labels from a board item', () => {
    const item = {
      cardRoute: {
        river: {
          distanceLabel: '7.4 miles',
          distanceMiles: 7.37,
          difficulty: 'moderate',
          estimatedPaddleTime: '3-4 hours',
          routeType: 'whitewater',
        },
        confidence: { label: 'High' },
      },
      travelMinutes: 45,
    };

    expect(routeLengthLabel(item)).toBe('7.4 miles on-water');
    expect(shortRouteLengthLabel(item)).toBe('7.4 mi route');
    expect(routeDifficultyLabel(item)).toBe('Moderate difficulty');
    expect(routeEstimatedTimeLabel(item)).toBe('3-4 hours');
    expect(routeTypeLabel(item)).toBe('Whitewater');
    expect(metaLineText(item, true, { includeRouteType: true })).toBe(
      '45 min drive • 7.4 miles on-water • Whitewater • Moderate difficulty • 3-4 hours • High data confidence'
    );
    expect(routeLengthLabel({})).toBe('');
  });

  it('builds shared card actions and live-read warnings', () => {
    expect(cardLinkLabel({ kind: 'route', totalRouteCount: 1 })).toBe('View route');
    expect(cardLinkLabel({ kind: 'group', totalRouteCount: 2 })).toBe('Compare routes');
    expect(liveReadWarning({ liveData: { overall: 'live' } })).toBeNull();
    expect(liveReadWarning({
      liveData: { overall: 'offline', summary: 'Gauge unavailable.' },
    })).toEqual({
      short: 'Feed issue',
      detail: 'Gauge unavailable.',
    });
  });

  it('parses raw condition signals and temperature', () => {
    const item = {
      cardRoute: {
        summary: {
          rawSignalLine: 'Gauge: 4.2 ft • Wind: 12 mph • Temp: 38°F • Ignored: value',
        },
      },
    };

    expect(rawSignalLine(item)).toContain('Gauge: 4.2 ft');
    expect(parseRawSignalLine(rawSignalLine(item))).toEqual([
      { kind: 'gauge', value: '4.2 ft' },
      { kind: 'wind', value: '12 mph' },
      { kind: 'temp', value: '38°F' },
    ]);
    expect(parseTemperature(rawSignalLine(item))).toBe(38);
    expect(parseTemperature('Temp: unknown')).toBeNull();
  });

  it('derives stable summary and weather presentation', () => {
    const item = {
      cardRoute: {
        explanation: 'Fallback',
        summary: {
          shortExplanation: 'Stable flow • Good level • Rain later',
          rawSignalLine: 'Temp: 45°F',
        },
      },
    };

    expect(cardSummary(item)).toBe('Stable flow • Good level • Rain later');
    expect(summaryParts(cardSummary(item))).toEqual({
      main: 'Stable flow / Good level',
      weather: 'Rain later',
    });
    expect(weatherVisualState(item)).toBe('rain');
    expect(weatherVisualLabel('rain')).toBe('Rain later');
    expect(weatherVisualState({
      cardRoute: {
        explanation: 'Calm',
        summary: { rawSignalLine: 'Temp: 34°F' },
      },
    })).toBe('cold');
  });

  it('formats shared board context and analysis labels', () => {
    const item = {
      cardRoute: {
        river: { state: 'MN', region: 'North Shore' },
        confidence: { label: 'Medium' },
      },
    };

    expect(regionStateText(item)).toBe('MN / NORTH SHORE');
    expect(confidenceLabel(item)).toBe('Some uncertainty');
    expect(summaryMentionsWeather('Wind and rain later')).toBe(true);
    expect(summaryMentionsFlowShift('Flow is rising')).toBe(true);
    expect(summaryMentionsFlowShift('Stable flow')).toBe(false);
  });

  it('formats generated and scheduled freshness consistently', () => {
    const now = Date.now();
    expect(formatGeneratedFreshness(new Date(now).toISOString())).toBe('Updated just now.');
    expect(formatGeneratedFreshness('not-a-date')).toBe('Checking latest refresh...');
    expect(formatBoardRefreshCopy(now)).toBe('Snapshot refreshes every 30 minutes. Updated just now.');
    expect(formatBoardRefreshCopy(Number.NaN)).toBe('Snapshot refreshes every 30 minutes.');
  });
});
