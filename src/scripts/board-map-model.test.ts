import { describe, expect, it } from 'vitest';
import { createBoardMapModel, featuredMapCaptionText } from './board-map-model.js';

const route = {
  kind: 'route',
  totalRouteCount: 1,
  cardRoute: {
    score: 84,
    rating: 'Good',
    confidence: { label: 'High' },
    river: {
      slug: 'rum-river-test',
      name: 'Rum River',
      reach: 'Test reach',
    },
  },
};

describe('board map model', () => {
  it('builds stable route marker, accessibility, and route labels', () => {
    const model = createBoardMapModel();

    expect(model.mapMarkerLabel(route)).toBe('84');
    expect(model.visibleMapMarkerLabel(route)).toBe('84');
    expect(model.mapMarkerContext(route)).toBe('Solid option');
    expect(model.mapMarkerAriaLabel(route)).toBe(
      'Rum River: score 84, high data confidence'
    );
    expect(model.routeLabelForItem(route)).toBe('Test reach');
    expect(model.featuredRouteLabelForItem(route)).toBe('Test reach');
  });

  it('supports page-specific group wording without duplicating group policy', () => {
    const grouped = {
      ...route,
      kind: 'group',
      totalRouteCount: 2,
      matchingRouteCount: 2,
      representativeMode: 'setup',
      matchingRoutes: [
        route.cardRoute,
        {
          ...route.cardRoute,
          score: 72,
          rating: 'Fair',
          river: { ...route.cardRoute.river, slug: 'rum-river-two' },
        },
      ],
    };
    const explore = createBoardMapModel({
      groupRouteQualifier: 'shown',
      includeSetupRepresentative: true,
    });
    const home = createBoardMapModel({ groupRouteQualifier: 'matching' });

    expect(explore.mapMarkerContext(grouped)).toContain('2 shown routes');
    expect(home.mapMarkerContext(grouped)).toContain('2 matching routes');
    expect(explore.representativeRouteLabel(grouped)).toBe('Route for your setup: Test reach');
    expect(home.representativeRouteLabel(grouped)).toBe('Best route: Test reach');
    expect(explore.featuredRouteLabelForItem(grouped)).toBe(
      '2 routes on this river / Route for your setup: Test reach'
    );
  });

  it('formats featured access captions consistently', () => {
    expect(featuredMapCaptionText([
      { kind: 'putIn', name: 'River Park' },
      { kind: 'takeOut', name: 'County Landing' },
    ])).toBe('River Park / County Landing');
    expect(featuredMapCaptionText([
      { kind: 'putIn', name: 'River Park' },
    ])).toBe('Put-in: River Park');
    expect(featuredMapCaptionText([])).toBe('');
  });
});
